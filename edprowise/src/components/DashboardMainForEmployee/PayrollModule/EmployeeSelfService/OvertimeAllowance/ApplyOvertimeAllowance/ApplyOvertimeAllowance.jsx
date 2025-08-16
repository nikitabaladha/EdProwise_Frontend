import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import postAPI from "../../../../../../api/postAPI";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";

const ApplyOvertimeAllowance = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [academicYear,setAcademicYear] = useState("2025-26");

    const passedEmployee = location.state?.employee;
    const academicYear = location.state.academicYear;
    const schoolId = location.state.schoolId;
    const employeeId = location.state.employeeId;
    const [formData, setFormData] = useState({
        schoolId: "",
        employeeId: "",
        academicYear: "",
        category: "",
        grade: "",
        overtimeDate: "",
        fromTime: "",
        toTime: "",
        totalHours: 0,
        rate: 0,
        calculatedAmount: 0,
        status: "pending", 
    });

    useEffect(() => {
        if (passedEmployee) {
            const { categoryOfEmployees, grade } = passedEmployee;
             console.log("passedEmployee emloyeeId", employeeId);
             
            setFormData((prev) => ({
                ...prev,
                schoolId,
                employeeId : employeeId,
                academicYear,
                category: categoryOfEmployees,
                grade,
            }));

            fetchOvertimeRate(schoolId, academicYear, categoryOfEmployees, grade);
        } else {
            toast.error("Employee data not found.");
            navigate(-1);
        }
    }, [ passedEmployee, schoolId, academicYear, employeeId]);

    const fetchOvertimeRate = async (schoolId, academicYear, category, grade) => {
        console.log("schoolid", schoolId);
        console.log("academicYear:", academicYear);
        console.log("category", category);
        console.log("grade", grade);
        try {
            const res = await getAPI(
                `/get-overtime-rate?schoolId=${schoolId}&academicYear=${academicYear}&category=${category}&grade=${grade}`
            );
            console.log("Get rate :", res);

            if (res?.data?.rate) {
                setFormData((prev) => ({
                    ...prev,
                    rate: res.data.rate,
                }));
            } else {
                toast.error("No overtime rate defined for this category and grade");
            }
        } catch (err) {
            toast.error("Error fetching rate");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updated = {
            ...formData,
            [name]: value,
        };

        if (name === "fromTime" || name === "toTime" || name === "overtimeDate") {
            if (updated.fromTime && updated.toTime && updated.overtimeDate) {
                const start = new Date(`${updated.overtimeDate}T${updated.fromTime}`);
                const end = new Date(`${updated.overtimeDate}T${updated.toTime}`);
                const diffInHours = (end - start) / (1000 * 60 * 60);
                updated.totalHours = Math.max(diffInHours, 0);
                updated.calculatedAmount = Math.round(updated.totalHours * updated.rate);
            }
        }

        setFormData(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit data ", formData);
        
        try {
            await postAPI("/apply-overtime", formData,{},true);
            toast.success("Overtime application submitted!");
            navigate(-1);
        } catch (err) {
            toast.error( err.response?.data?.message ||"Failed to submit application");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="card-header mb-2 d-flex align-items-center">
                                <h4 className="card-title flex-grow-1 text-center">Overtime Allowance</h4>
                                <button
                                    type="button"
                                    className="btn btn-primary custom-submit-button"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Date <span className="text-danger">*</span></label>
                                            <input
                                                type="date"
                                                name="overtimeDate"
                                                className="form-control"
                                                value={formData.overtimeDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">From Time <span className="text-danger">*</span></label>
                                            <input
                                                type="time"
                                                name="fromTime"
                                                className="form-control"
                                                value={formData.fromTime}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">To Time <span className="text-danger">*</span></label>
                                            <input
                                                type="time"
                                                name="toTime"
                                                className="form-control"
                                                value={formData.toTime}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Total Hours</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.totalHours.toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>


                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Rate (per hour)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.rate.toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Total Amount</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={formData.calculatedAmount.toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary custom-submit-button">
                                        Submit
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyOvertimeAllowance;
