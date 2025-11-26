// import React, { useState, useEffect } from "react";
// import postAPI from "../../../../../api/postAPI";
// import getAPI from "../../../../../api/getAPI";
// import { toast } from "react-toastify";

// const DefineAcadmicYear = () => {
//     const [sending, setSending] = useState(false);
//     const [schoolId, setSchoolId] = useState(null);
//     const [academicYear, setAcademicYear] = useState(null);
//     const [formData, setFormData] = useState({
//         schoolId: "",
//         academicYear: "",
//         startDate: "",
//         endDate: "",
//     }); 


//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//         const id = userDetails?.schoolId;
//         const academicYear = userDetails?.academicYear;
//         if (!id && !academicYear) {
//             toast.error("School ID, academic Year not found. Please log in again.");
//             return;
//         }
//         setSchoolId(id);
//         setAcademicYear(academicYear)
//         setFormData((prev) => ({ ...prev, schoolId: id, academicYear: academicYear }));
//         console.log("SchoolId", id);


//         const fetchSettings = async () => {
//             try {
//                 const response = await getAPI(`/get-payroll-academic-year/${id}/${academicYear}`, {}, true);

//                 if (!response.hasError) {
//                     setFormData({
//                         startDate: response.data.data.startDate || "",
//                         endDate: response.data.data.endDate || "",

//                     });
//                 }
//             } catch (err) {
//                 toast.error("Error fetching payroll : " + err.message);
//             }
//         };

//         fetchSettings();
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await postAPI(
//                 "/post-payroll-academic-year",
//                 formData,
//                 true
//             );
//             console.log("res", response);

//             if (!response.hasError) {
//                 toast.success("Academic year updated successfully!");
//             } else {
//                 toast.error("Failed to update academic year. Please try again.");
//             }
//         } catch (error) {
//             toast.error("Error updating academic year: " + error.message);
//         }
//     };



//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header d-flex align-items-center">
//                                     <h4 className="card-title flex-grow-1 text-center">
//                                         Define Academic Year
//                                     </h4>
//                                     <div>
//                                         <select
//                                             id="yearSelect"
//                                             className="custom-select border border-dark"
//                                             aria-label="Select Year"
//                                             value={academicYear}
//                                             onChange={(e) => setAcademicYear(e.target.value)}
//                                         >
//                                             <option>2025-26</option>
//                                             <option>2026-27</option>
//                                             <option>2027-28</option>
//                                             <option>2028-29</option>
//                                             <option>2029-30</option>
//                                         </select>
//                                     </div>                                                     
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="startDate" className="form-label">
//                                                 Start Date <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="date"
//                                                 id="startDate"
//                                                 name="startDate"
//                                                 className="form-control"
//                                                 value={formData.startDate}
//                                                 onChange={handleChange}
//                                                 required

//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="col-md-6">
//                                         {" "}
//                                         <div className="mb-3">
//                                             <label htmlFor="endDate" className="form-label">
//                                                 End Date <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="date"
//                                                 id="endDate"
//                                                 name="endDate"
//                                                 className="form-control"
//                                                 value={formData.endDate}
//                                                 onChange={handleChange}
//                                                 required

//                                             />
//                                         </div>
//                                     </div>
//                                 </div>


//                                 <div className="d-flex justify-content-end">

//                                     <div className="text" style={{ marginLeft: "1rem" }}>
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary custom-submit-button"
//                                         >
//                                             Update
//                                         </button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default DefineAcadmicYear;

import React, { useState, useEffect } from "react";
import postAPI from "../../../../../api/postAPI";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";

const DefineAcademicYear = () => {
    const [sending, setSending] = useState(false);
    const [schoolId, setSchoolId] = useState(null);
    const [academicYear, setAcademicYear] = useState("");
    const [academicYearList, setAcademicYearList] = useState([]);
    const [formData, setFormData] = useState({
        schoolId: "",
        academicYear: "",
        startDate: "",
        endDate: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchAcademicYears = async (schoolId) => {
        try {
            const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
            setAcademicYearList(response.data.data || []);
        } catch (err) {
            toast.error('Failed to fetch academic years.');
        }
    };

    const fetchSettings = async (schoolIdVal, academicYearVal) => {
        try {
            const response = await getAPI(`/get-school-payroll-academic-year/${schoolIdVal}/${academicYearVal}`, {}, true);
            if (!response.hasError) {
                setFormData((prev) => ({
                    ...prev,
                    startDate: response.data.data?.startDate || "",
                    endDate: response.data.data?.endDate || "",
                }));
            } else {
                toast.error(response.message || "Error fetching academic year");
            }
        } catch (err) {
            toast.error("Error fetching academic year: " + err.message);
        }
    };

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const id = userDetails?.schoolId;
         const fetchAcademicYears = async (schoolId) => {
        try {
            const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
            setAcademicYearList(response.data.data || []);
        } catch (err) {
            toast.error('Failed to fetch academic years.');
        }
    };
        if (!id) {
            toast.error("School ID not found. Please log in again.");
            return;
        }

        setSchoolId(id);
        setAcademicYear(academicYear);
        setFormData((prev) => ({ ...prev, schoolId: id, academicYear: academicYear }));
        fetchAcademicYears(id);
        if (academicYear) {
            fetchSettings(id, academicYear);
        }
    }, []);

    useEffect(() => {
        if (schoolId && academicYear) {
            setFormData((prev) => ({
                ...prev,
                academicYear,
                schoolId,
            }));
            fetchSettings(schoolId, academicYear);
        }
    }, [academicYear, schoolId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.startDate || !formData.endDate) {
            toast.error("Please select start and end dates.");
            return;
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(formData.startDate) || !dateRegex.test(formData.endDate)) {
            toast.error("Invalid date format. Use YYYY-MM-DD.");
            return;
        }

        if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            toast.error("End date must be after start date.");
            return;
        }

        try {
            setSending(true);
            const response = await postAPI("/post-payroll-academic-year", formData, true);
            if (!response.hasError) {
                toast.success("Academic year updated successfully!");
                fetchAcademicYears(schoolId); // Refresh the list
            } else {
                toast.error(response.message || "Failed to update academic year.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating academic year.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="card-header d-flex align-items-center">
                                <h4 className="card-title flex-grow-1 text-center">
                                    Define Academic Year
                                </h4>
                                <select
                                    className="form-select form-select-sm w-auto"
                                    value={academicYear}
                                    onChange={(e) => setAcademicYear(e.target.value)}
                                >
                                    <option value="">Select Year</option>
                                    {academicYearList.map((yearObj, index) => (
                                        <option key={index} value={yearObj.academicYear}>
                                            {yearObj.academicYear}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label htmlFor="startDate" className="form-label">
                                            Start Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            className="form-control"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="endDate" className="form-label">
                                            End Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            className="form-control"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={sending}
                                    >
                                        {sending ? "Updating..." : "Update"}
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

export default DefineAcademicYear;