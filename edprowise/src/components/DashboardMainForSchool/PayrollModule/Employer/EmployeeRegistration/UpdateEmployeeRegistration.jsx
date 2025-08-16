// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import putAPI from "../../../../../api/putAPI";
// import { toast } from "react-toastify";

// const UpdateEmployeeRegistration = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const employee = state?.employee;

//   const [formData, setFormData] = useState({
//     employeeName: '',
//     contactNumber: '',
//     emailId: '',
//     categoryOfEmployees: '',
//     grade: '',
//     gender: '',
//     jobDesignation: '',
//     securityDepositAmount: '',
//     joiningDate: '',
//     dateOfBirth: '',
//   });
// const [editMonth, setEditMonth] = useState(() => new Date().toISOString().slice(0, 7));
//   useEffect(() => {
//     if (employee) {
//       const latestMonth = Object.keys(employee.employeeDetails || {}).sort().reverse()[0];
//       const detail = employee.employeeDetails?.[latestMonth] || {};

//       setEditMonth(latestMonth);

//       setFormData({
//         employeeName: detail.employeeName || '',
//         contactNumber: detail.contactNumber || '',
//         emailId: detail.emailId || '',
//         categoryOfEmployees: detail.categoryOfEmployees || '',
//         grade: detail.grade || '',
//         gender: detail.gender || '',
//         jobDesignation: detail.jobDesignation || '',
//         securityDepositAmount: detail.securityDepositAmount || '',
//         joiningDate: detail.joiningDate ? detail.joiningDate.slice(0, 10) : '',
//         dateOfBirth: detail.dateOfBirth ? detail.dateOfBirth.slice(0, 10) : '',
//       });
//     }
//   }, [employee]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!employee || !employee._id) {
//       alert('Employee ID not found');
//       return;
//     }

//     try {
//       // const response = await putAPI(`/update-employee-registration/${employee._id}`, formData);
// const response = await putAPI(`/update-employee/${employee._id}?month=${editMonth}`, formData);

//       if (!response.hasError) {
//         toast.success( "Employee update registered successfully");
//         navigate(-1);
//       } else {
//          toast.success( "Employee update registered successfully");
//       }
//     } catch (error) {
//       console.error('Error updating employee:', error);
//        toast.success( "Employee update registered successfully");
//       // alert('An error occurred while updating the employee.');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2 d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">Update Registration Form</h4>
//                   <button
//                     type="button"
//                     className="btn btn-primary custom-submit-button"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="row mb-3">

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor="employeeName" className="form-label">
//                         Name of Teacher (As per Aadhar) <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="employeeName"
//                         name="employeeName"
//                         className="form-control"
//                         value={formData.employeeName}
//                         onChange={handleChange}
//                         required
//                         placeholder="Enter Employee Name"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor="emailId" className="form-label">
//                         Email ID <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="email"
//                         id="emailId"
//                         name="emailId"
//                         className="form-control"
//                         value={formData.emailId}
//                         onChange={handleChange}
//                         required
//                         placeholder="Example: xyz@gmail.com"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="contactNumber" className="form-label">
//                         Contact Number <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         id="contactNumber"
//                         name="contactNumber"
//                         className="form-control"
//                         value={formData.contactNumber}
//                         onChange={handleChange}
//                         required
//                         placeholder="Example: 9876543210"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="dateOfBirth" className="form-label">
//                         Date of Birth <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         id="dateOfBirth"
//                         name="dateOfBirth"
//                         className="form-control"
//                         value={formData.dateOfBirth}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="gender" className="form-label">
//                         Gender <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         id="gender"
//                         name="gender"
//                         className="form-control"
//                         value={formData.gender}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Transgender">Transgender</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor="categoryOfEmployees" className="form-label">
//                         Category of Employees <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         id="categoryOfEmployees"
//                         name="categoryOfEmployees"
//                         className="form-control"
//                         value={formData.categoryOfEmployees}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         <option value="Teaching Staff">Teaching Staff</option>
//                         <option value="Non Teaching Staff">Non Teaching Staff</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor="grade" className="form-label">
//                         Grade <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="grade"
//                         name="grade"
//                         className="form-control"
//                         value={formData.grade}
//                         onChange={handleChange}
//                         required
//                         placeholder="Grade"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="jobDesignation" className="form-label">
//                         Job Designation <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="jobDesignation"
//                         name="jobDesignation"
//                         className="form-control"
//                         value={formData.jobDesignation}
//                         onChange={handleChange}
//                         required
//                         placeholder="Designation"
//                       />
//                     </div>
//                   </div>

// <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="securityDepositAmount" className="form-label">
//                         Security Deposit Amount <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         id="securityDepositAmount"
//                         name="securityDepositAmount"
//                         className="form-control"
//                         value={formData.securityDepositAmount}
//                         onChange={handleChange}
//                         required
//                         placeholder="Enter Amount"
//                         min="0"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="joiningDate" className="form-label">
//                         Joining Date <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         id="joiningDate"
//                         name="joiningDate"
//                         className="form-control"
//                         value={formData.joiningDate}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-end">
//                   <button type="submit" className="btn btn-primary custom-submit-button">
//                     Update
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateEmployeeRegistration;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import putAPI from "../../../../../api/putAPI";
import getAPI from '../../../../../api/getAPI';
import { toast } from "react-toastify";
import Select from 'react-select';

const UpdateEmployeeRegistration = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [academicYear, setAcademicYear] = useState("");
    const [schoolId, setSchoolId] = useState(null);
    const employee = state?.employee;
    const [dropdowns, setDropdowns] = useState({
        grades: [],
        categories: [],
        designations: [],
    });
    const [formData, setFormData] = useState({
        employeeName: '',
        contactNumber: '',
        emailId: '',
        categoryOfEmployees: '',
        grade: '',
        gender: '',
        jobDesignation: '',
        securityDepositAmount: '',
        joiningDate: '',
        dateOfBirth: '',
        academicYear: "",
    });


    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const id = userDetails?.schoolId;
        const academicYear = localStorage.getItem("selectedAcademicYear");
        if (!id) {
            toast.error("School ID not found. Please log in again.");
            return;
        }
        setSchoolId(id);
        setAcademicYear(academicYear);

        if (employee) {
            setFormData({
                employeeName: employee.employeeName || '',
                contactNumber: employee.contactNumber || '',
                emailId: employee.emailId || '',
                categoryOfEmployees: employee.categoryOfEmployees || '',
                grade: employee.grade || '',
                gender: employee.gender || '',
                jobDesignation: employee.jobDesignation || '',
                securityDepositAmount: employee.securityDepositAmount || '',
                joiningDate: employee.joiningDate ? employee.joiningDate.slice(0, 10) : '',
                dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.slice(0, 10) : '',
                academicYear: employee.academicYear,
                securityDepositAmount: employee.securityDepositAmount || '',
            });

            fetchSettings(id,academicYear);
        }
    }, [employee]);

    const fetchSettings = async (schoolId,academicYear) => {
        try {
            const [grades, categories, designations,] = await Promise.all([
                getAPI(`/getall-employee-grade/${schoolId}?academicYear=${academicYear}`, {}, true),
                getAPI(`/getall-employee-category/${schoolId}?academicYear=${academicYear}`, {}, true),
                getAPI(`/getall-employee-job-designation/${schoolId}?academicYear=${academicYear}`, {}, true),
            ]);

            if (!grades) {
                toast.error("Grade Not founds");
            }
            if (!categories) {
                toast.error("Grade Not founds");
            }
            if (!designations) {
                toast.error("Grade Not founds");
            }

            setDropdowns({
                grades: grades.data.grade || [],
                categories: categories.data.categories || [],
                designations: designations.data.designation || [],
            });
            console.log("grades", grades);
            console.log("category", categories);
            console.log("designation", designations);

        } catch (err) {
            toast.error(err.response.data.message || "Error fetching data");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleSelectChange = (selectedOption, actionMeta) => {
        const { name } = actionMeta;
        setFormData({ ...formData, [name]: selectedOption?.value || '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employee || !employee._id) {
            toast.error('Employee ID not found');
            return;
        }

        try {
            const response = await putAPI(`/update-employee-registration/${employee._id}?academicYear=${academicYear}`, formData, {}, true);


            if (!response.hasError) {
                toast.success("Employee updated successfully");
                navigate(-1);
            } else {
                toast.error(response.message || "Update failed");
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            toast.error("Something went wrong during update");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header mb-2 d-flex align-items-center">
                                    <h4 className="card-title flex-grow-1 text-center">Update Registration Form</h4>
                                    <button
                                        type="button"
                                        className="btn btn-primary custom-submit-button"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className='mb-3'>
                                            <label htmlFor="employeeName" className="form-label">Name <span className="text-danger">*</span></label>
                                            <input type="text" name="employeeName" className="form-control" value={formData.employeeName} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className='mb-3'>
                                            <label htmlFor="emailId" className="form-label">Email <span className="text-danger">*</span></label>
                                            <input type="email" name="emailId" className="form-control" value={formData.emailId} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className='mb-3'>
                                            <label htmlFor="contactNumber" className="form-label">Contact Number <span className="text-danger">*</span></label>
                                            <input type="tel" name="contactNumber" className="form-control" value={formData.contactNumber} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className='mb-3'>
                                            <label htmlFor="dateOfBirth" className="form-label">Date of Birth <span className="text-danger">*</span></label>
                                            <input type="date" name="dateOfBirth" className="form-control" value={formData.dateOfBirth} onChange={handleChange} required />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className='mb-3'>
                                            <label htmlFor="gender" className="form-label">Gender <span className="text-danger">*</span></label>
                                            <select name="gender" className="form-control" value={formData.gender} onChange={handleChange} required>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Transgender">Transgender</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className='mb-3'>
                                            <label htmlFor="categoryOfEmployees" className="form-label">Category <span className="text-danger">*</span></label>
                                            <Select
                                                isClearable
                                                name="categoryOfEmployees"
                                                options={dropdowns.categories.map((item) => ({
                                                    value: item.categoryName,
                                                    label: item.categoryName,
                                                }))}
                                                onChange={handleSelectChange}
                                                value={
                                                    formData.categoryOfEmployees
                                                        ? { value: formData.categoryOfEmployees, label: formData.categoryOfEmployees }
                                                        : null
                                                }
                                                placeholder="Select Category"
                                                className="email-select"
                                            />

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className='mb-3'>
                                            <label htmlFor="grade" className="form-label">Grade <span className="text-danger">*</span></label>
                                            <Select
                                                isClearable
                                                name="grade"
                                                options={dropdowns.grades.map((item) => ({
                                                    value: item.gradeName,
                                                    label: item.gradeName,
                                                }))}
                                                onChange={handleSelectChange}
                                                value={
                                                    formData.grade
                                                        ? { value: formData.grade, label: formData.grade }
                                                        : null
                                                }
                                                placeholder="Select Grade"
                                                className="email-select"
                                            />
                                            {/* <input type="text" name="grade" className="form-control" value={formData.grade} onChange={handleChange} required /> */}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className='mb-3'>
                                            <label htmlFor="jobDesignation" className="form-label">Designation <span className="text-danger">*</span></label>
                                            <Select
                                                isClearable
                                                name="jobDesignation"
                                                options={dropdowns.designations.map((item) => ({
                                                    value: item.designationName,
                                                    label: item.designationName,
                                                }))}
                                                onChange={handleSelectChange}
                                                value={
                                                    formData.jobDesignation
                                                        ? { value: formData.jobDesignation, label: formData.jobDesignation }
                                                        : null
                                                }
                                                placeholder="Select Designation"
                                                className="email-select"
                                            />
                                            {/* <input type="text" name="jobDesignation" className="form-control" value={formData.jobDesignation} onChange={handleChange} required /> */}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className='mb-3'>
                                            <label htmlFor="securityDepositAmount" className="form-label">Security Deposit <span className="text-danger">*</span></label>
                                            <input type="number" name="securityDepositAmount" className="form-control" value={formData.securityDepositAmount} onChange={handleChange} required min="0" />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className='mb-3'>
                                            <label htmlFor="joiningDate" className="form-label">Joining Date <span className="text-danger">*</span></label>
                                            <input type="date" name="joiningDate" className="form-control" value={formData.joiningDate} onChange={handleChange} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="btn btn-primary custom-submit-button">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployeeRegistration;
