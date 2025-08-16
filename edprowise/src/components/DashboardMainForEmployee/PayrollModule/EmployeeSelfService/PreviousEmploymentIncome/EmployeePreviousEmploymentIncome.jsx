import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import { toast } from "react-toastify";
const incomeComponents = [
    "Basic Salary",
    "HRA", 
    "Leave Travel Allowance",
    "Education Allowance",
    "Lunch Allowance",
    "Conveyance Allowance",
    "Other Allowance (Balance)",
    "Professional Tax",
    
];
const EmployeePreviousEmploymentIncome = () => {
    const [schoolId, setSchoolId] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [academicYear] = useState("2025-26");
    const [employeeDetail, setEmployeeDetail] = useState(null);
    const [incomeDetails, setIncomeDetails] = useState({});
    const [totalIncome, setTotalIncome] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (!userDetails?.schoolId || !userDetails?.userId) {
            toast.error("Authentication details missing");
            return;
        }

        setSchoolId(userDetails.schoolId);
        setEmployeeId(userDetails.userId);

        fetchEmployeeDetails(userDetails.schoolId, userDetails.userId);
        fetchPreviousEmploymentIncome(userDetails.schoolId, userDetails.userId);
    }, [academicYear]);

    const fetchEmployeeDetails = async (schoolId, empId) => {
        try {
            const res = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
            if (!res.hasError && res.data?.data) {
                setEmployeeDetail(res.data.data);
            } else {
                toast.error("Employee detail not found");
            }
        } catch (err) {
            toast.error("Error fetching employee detail");
        }
    };

    const fetchPreviousEmploymentIncome = async (schoolId, employeeId) => {
        try {
            const res = await getAPI(`/get-previous-employment-income/${schoolId}/${employeeId}?academicYear=${academicYear}`);
            console.log("fetch get previous res", res);

            if (!res.hasError && res.data.data.data?.incomeDetails) {
                // const incomeData = Object.fromEntries(res.data.data.incomeDetails);
                const incomeData = res.data.data.data.incomeDetails;
                setIncomeDetails(incomeData);
                calculateTotalIncome(incomeData);
            } else {
                const initialIncomeDetails = incomeComponents.reduce((acc, component) => {
                    acc[component] = "";
                    return acc;
                }, {});
                setIncomeDetails(initialIncomeDetails);
            }
        } catch (err) {
            toast.error("Error fetching previous employment income");
        }
    };

    const handleInputChange = (component, value) => {
        const updatedIncomeDetails = { ...incomeDetails, [component]: value };
        setIncomeDetails(updatedIncomeDetails);
        calculateTotalIncome(updatedIncomeDetails);
    };

    const calculateTotalIncome = (incomeData) => {
        const incomeFields = incomeComponents.filter(
            (component) => !["Professional Tax", "Employee PF Contribution"].includes(component)
        );

        const total = incomeFields.reduce((sum, component) => {
            const amount = parseFloat(incomeData[component]) || 0;
            return sum + amount;
        }, 0);
        setTotalIncome(total);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Filter out empty or invalid fields, but allow submission
            const payload = {
                schoolId,
                employeeId,
                academicYear,
                incomeDetails: Object.fromEntries(
                    Object.entries(incomeDetails).filter(
                        ([_, value]) => value !== "" && !isNaN(parseFloat(value))
                    )
                ),
            };

            const res = await postAPI("/save-previous-employment-income", payload, {}, true);
            if (!res.hasError) {
                toast.success("Previous employment income saved successfully");
                fetchPreviousEmploymentIncome(schoolId, employeeId);
            } else {
                toast.error(res.message || "Error saving income details");
            }
        } catch (err) {
            toast.error("Error saving income details");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="payroll-title text-center mb-0">
                                        Previous Employment Income for Current Year
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="table-responsive px-lg-6 px-md-4 mb-2">
                                    <table className="table border border-dark text-dark mb-2">
                                        <thead>
                                            <tr className="payroll-table-header">
                                                <th className="text-center align-content-center w-75 border border-dark p-2">
                                                    Particulars
                                                </th>
                                                <th className="text-center align-content-center w-25 border border-dark p-2">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {incomeComponents.map((component, index) => (
                                                <React.Fragment key={component}>
                                                    {component === "Professional Tax" && (
                                                        <tr className="payroll-table-body">
                                                            <td className="align-content-center p-2 border border-dark"></td>
                                                            <td className="text-end align-content-center p-2 border border-dark"></td>
                                                        </tr>
                                                    )}
                                                    {component === "Professional Tax" && (
                                                        <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                                                            <td className="align-content-center fw-bold p-2 border border-dark">
                                                                Income from Salary
                                                            </td>
                                                            <td className="text-end align-content-center fw-bold p-2 border border-dark">
                                                                {totalIncome.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {component === "Professional Tax" && (
                                                        <tr className="payroll-table-body">
                                                            <td className="align-content-center p-2 border border-dark"></td>
                                                            <td className="text-end align-content-center p-2 border border-dark"></td>
                                                        </tr>
                                                    )}
                                                    <tr className="payroll-table-body">
                                                        <td className="align-content-center p-2 border border-dark">{component}</td>
                                                        <td className="text-end align-content-center p-2 border border-dark">
                                                            <input
                                                                type="text"
                                                                className="form-control payroll-table-body payroll-input-border text-end"
                                                                value={incomeDetails[component] || ""}
                                                                onChange={(e) => handleInputChange(component, e.target.value)}
                                                                placeholder="0"
                                                            />
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-end">
                                    {/* <button type="submit" className="btn btn-primary custom-submit-button">
                                        Submit
                                    </button> */}
                                    <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
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
export default EmployeePreviousEmploymentIncome;