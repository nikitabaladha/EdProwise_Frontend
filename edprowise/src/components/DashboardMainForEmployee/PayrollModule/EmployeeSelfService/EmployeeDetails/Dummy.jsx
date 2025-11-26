// // import React, { useState, useEffect } from 'react';
// // import { toast } from "react-toastify";
// // import getAPI from "../../../../../api/getAPI";
// // import putAPI from "../../../../../api/putAPI"; // Import putAPI
// // import { Link } from 'react-router-dom';

// // const UpdatePayrollEmployeeDetails = () => {
// //     const [showForm, setShowForm] = useState(false);
// //     const [experiences, setExperiences] = useState([{ id: 1 }]);
// //     const [nominees, setNominees] = useState([{ id: 1 }]);
// //     const [schoolId, setSchoolId] = useState(null);
// //     const [employeeId, setEmployeeId] = useState(null);
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [formData, setFormData] = useState({
// //         schoolId: '',
// //         employeeId: '',
// //         password: '',
// //         emailId: '',
// //         dateOfBirth: '',
// //         employeeName: '',
// //         contactNumber: '',
// //         gender: '',
// //         categoryOfEmployees: '',
// //         grade: '',
// //         jobDesignation: '',
// //         joiningDate: '',
// //         fatherName: '',
// //         spouseName: '',
// //         currentAddress: '',
// //         emergencyContactNumber: '',
// //         nationality: 'Indian',
// //         religion: '',
// //         maritalStatus: '',
// //         higherQualification: '',
// //         physicalHandicap: 'No',
// //         aadharPassportNumber: '',
// //         aadharPassportFile: null,
// //         panNumber: '',
// //         panFile: null,
// //         uanNumber: '',
// //         esicNumber: '',
// //         accountHolderName: '',
// //         bankName: '',
// //         ifscCode: '',
// //         accountNumber: '',
// //         accountType: '',
// //         class12Certificate: null,
// //         degreeCertificate: null,
// //         resume: null,
// //         experienceLetter: null,
// //         relievingLetter: null,
// //         nominationDetails: [{
// //             nomineeName: '',
// //             nomineeRelation: '',
// //             nomineeAadharNumber: '',
// //             nomineeAadharCardOrPassportFile: null,
// //             nomineeShearPercentage: ''
// //         }],
// //         experienceDetails: [{
// //             previousSchoolName: '',
// //             previousSchoolAddress: '',
// //             previousSchoolJoiningDate: '',
// //             previousSchoolLastDate: '',
// //             previousJobDesignation: '',
// //             numberOfExperience: ''
// //         }],
// //         securityDepositAmount: '',
// //         mandatoryPFContribution:"",
// //         voluntaryPFContribution: '',
// //         taxRegime: 'new',
// //         status: 'On Payroll'
// //     });

// //     useEffect(() => {
// //         const fetchEmployeeDetails = async () => {
// //             const userDetails = JSON.parse(localStorage.getItem("userDetails"));
// //             const id = userDetails?.schoolId;
// //             const empId = userDetails?.userId;

// //             if (!id || !empId) {
// //                 toast.error("Authentication details missing");
// //                 return;
// //             }

// //             setSchoolId(id);
// //             setEmployeeId(empId);

// //             try {
// //                 setIsLoading(true);
// //                 const response = await getAPI(`/get-employee-self-details/${id}/${empId}`);

// //                 if (!response.hasError && response.data?.data) {
// //                     const employeeData = response.data.data;
// //                     setFormData({
// //                         ...employeeData,
// //                         dateOfBirth: employeeData.dateOfBirth ? new Date(employeeData.dateOfBirth).toISOString().split('T')[0] : '',
// //                         joiningDate: employeeData.joiningDate ? new Date(employeeData.joiningDate).toISOString().split('T')[0] : '',
// //                         nominationDetails: employeeData.nominationDetails?.length > 0 ? employeeData.nominationDetails : [{
// //                             nomineeName: '',
// //                             nomineeRelation: '',
// //                             nomineeAadharNumber: '',
// //                             nomineeAadharCardOrPassportFile: null,
// //                             nomineeShearPercentage: ''
// //                         }],
// //                         experienceDetails: employeeData.experienceDetails?.length > 0 ? employeeData.experienceDetails.map(exp => ({
// //                             ...exp,
// //                             previousSchoolJoiningDate: exp.previousSchoolJoiningDate ? new Date(exp.previousSchoolJoiningDate).toISOString().split('T')[0] : '',
// //                             previousSchoolLastDate: exp.previousSchoolLastDate ? new Date(exp.previousSchoolLastDate).toISOString().split('T')[0] : ''
// //                         })) : [{
// //                             previousSchoolName: '',
// //                             previousSchoolAddress: '',
// //                             previousSchoolJoiningDate: '',
// //                             previousSchoolLastDate: '',
// //                             previousJobDesignation: '',
// //                             numberOfExperience: ''
// //                         }],
// //                     });
// //                     setNominees(employeeData.nominationDetails?.length > 0 ?
// //                         employeeData.nominationDetails.map((_, index) => ({ id: index + 1 })) :
// //                         [{ id: 1 }]);
// //                     setExperiences(employeeData.experienceDetails?.length > 0 ?
// //                         employeeData.experienceDetails.map((_, index) => ({ id: index + 1 })) :
// //                         [{ id: 1 }]);
// //                 } else {
// //                     toast.error(response.message || "No employee data found");
// //                 }
// //             } catch (error) {
// //                 console.error("Fetch error:", error);
// //                 toast.error("Failed to load employee details");
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         fetchEmployeeDetails();
// //     }, []);

// //     const handleChange = (e, section, index) => {
// //         const { name, value } = e.target;

// //         if (section === 'nominationDetails') {
// //             setFormData(prev => ({
// //                 ...prev,
// //                 nominationDetails: prev.nominationDetails.map((item, i) =>
// //                     i === index ? { ...item, [name]: value } : item
// //                 )
// //             }));
// //         } else if (section === 'experienceDetails') {
// //             setFormData(prev => ({
// //                 ...prev,
// //                 experienceDetails: prev.experienceDetails.map((item, i) =>
// //                     i === index ? { ...item, [name]: value } : item
// //                 )
// //             }));
// //         } else {
// //             setFormData(prev => ({
// //                 ...prev,
// //                 [name]: value
// //             }));
// //         }
// //     };

// //     const handleFileChange = (e, section, index) => {
// //         const { name, files } = e.target;

// //         if (section === 'nominationDetails') {
// //             setFormData(prev => ({
// //                 ...prev,
// //                 nominationDetails: prev.nominationDetails.map((item, i) =>
// //                     i === index ? { ...item, [name]: files[0] } : item
// //                 )
// //             }));
// //         } else {
// //             setFormData(prev => ({
// //                 ...prev,
// //                 [name]: files[0]
// //             }));
// //         }
// //     };

// //     const addExperience = () => {
// //         const newExperience = { id: experiences.length + 1 };
// //         setExperiences([...experiences, newExperience]);
// //         setFormData(prev => ({
// //             ...prev,
// //             experienceDetails: [...prev.experienceDetails, {
// //                 previousSchoolName: '',
// //                 previousSchoolAddress: '',
// //                 previousSchoolJoiningDate: '',
// //                 previousSchoolLastDate: '',
// //                 previousJobDesignation: '',
// //                 numberOfExperience: ''
// //             }]
// //         }));
// //     };

// //     const removeExperience = (id) => {
// //         if (id !== 1) {
// //             setExperiences(experiences.filter(exp => exp.id !== id));
// //             setFormData(prev => ({
// //                 ...prev,
// //                 experienceDetails: prev.experienceDetails.filter((_, index) => experiences[index].id !== id)
// //             }));
// //         }
// //     };

// //     const addNominee = () => {
// //         const newNominee = { id: nominees.length + 1 };
// //         setNominees([...nominees, newNominee]);
// //         setFormData(prev => ({
// //             ...prev,
// //             nominationDetails: [...prev.nominationDetails, {
// //                 nomineeName: '',
// //                 nomineeRelation: '',
// //                 nomineeAadharNumber: '',
// //                 nomineeAadharCardOrPassportFile: null,
// //                 nomineeShearPercentage: ''
// //             }]
// //         }));
// //     };

// //     const removeNominee = (id) => {
// //         if (id !== 1) {
// //             setNominees(nominees.filter(nom => nom.id !== id));
// //             setFormData(prev => ({
// //                 ...prev,
// //                 nominationDetails: prev.nominationDetails.filter((_, index) => nominees[index].id !== id)
// //             }));
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setIsLoading(true);

// //         try {
// //             const submissionData = new FormData();
// //             // Append non-file fields
// //             Object.keys(formData).forEach(key => {
// //                 if (key === 'nominationDetails' || key === 'experienceDetails') {
// //                     submissionData.append(key, JSON.stringify(formData[key]));
// //                 } else if (formData[key] instanceof File) {
// //                     submissionData.append(key, formData[key]);
// //                 } else if (formData[key] !== null && formData[key] !== undefined) {
// //                     submissionData.append(key, formData[key]);
// //                 }
// //             });

// //             formData.nominationDetails.forEach((nominee, index) => {
// //                 if (nominee.nomineeAadharCardOrPassportFile instanceof File) {
// //                     submissionData.append('nomineeAadharCardOrPassportFile', nominee.nomineeAadharCardOrPassportFile);
// //                 }
// //             });

// //             const response = await putAPI(`/update-employee-details/${schoolId}/${employeeId}`, submissionData,
// //                 { "Content-Type": "multipart/form-data" }
// //                 , true);

// //             if (!response.hasError) {
// //                 toast.success("Employee details updated successfully");
// //             } else {
// //                 toast.error(response.message || "Failed to update employee details");
// //             }
// //         } catch (error) {
// //             console.error("Submission error:", error);
// //             toast.error("Failed to update employee details");
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="container">
// //             <div className="row">
// //                 <div className="col-xl-12">
// //                     <div className="card m-2">
// //                         <div className="card-body custom-heading-padding">
// //                             <div className="container">
// //                                 <div className="card-header mb-2">
// //                                     <h4 className="payroll-title text-center mb-0">
// //                                         Employee Details
// //                                     </h4>
// //                                 </div>
// //                             </div>
// //                             <div class="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
// //                                 <div className="d-flex flex-wrap align-items-center gap-3">
// //                                     <label for="yearSelect" className="mb-0 fw-bold">Year :</label>
// //                                     <select id="yearSelect" className="custom-select" aria-label="Select Year">
// //                                         <option selected>2025</option>
// //                                         <option>2026</option>
// //                                         <option>2027</option>
// //                                         <option>2028</option>
// //                                         <option>2029</option>
// //                                     </select>

// //                                     <label for="monthSelect" className="mb-0 fw-bold">Month :</label>
// //                                     <select id="monthSelect" className="custom-select" aria-label="Select Month">
// //                                         <option selected>January</option>
// //                                         <option>February</option>
// //                                         <option>March</option>
// //                                         <option>April</option>
// //                                         <option>May</option>
// //                                         <option>June</option>
// //                                         <option>July</option>
// //                                         <option>August</option>
// //                                         <option>September</option>
// //                                         <option>October</option>
// //                                         <option>November</option>
// //                                         <option>December.</option>
// //                                     </select>
// //                                 </div>
// //                             </div>
// //                             <form onSubmit={handleSubmit}>
// //                                 <div className="row ">
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="employeeId" className="form-label">
// //                                                 Employee ID <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="employeeId"
// //                                                 name="employeeId"
// //                                                 className="form-control"
// //                                                 value={formData.employeeId}
// //                                                 readOnly
// //                                                 placeholder="Employee ID"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="employeeName" className="form-label">
// //                                                 Name of Employee <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="employeeName"
// //                                                 name="employeeName"
// //                                                 className="form-control"
// //                                                 value={formData.employeeName}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter Employee Name"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div className="row">
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="joiningDate" className="form-label">
// //                                                 Joining Date <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="date"
// //                                                 id="joiningDate"
// //                                                 name="joiningDate"
// //                                                 className="form-control"
// //                                                 value={formData.joiningDate}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="categoryOfEmployees" className="form-label">
// //                                                 Category of Employees <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="categoryOfEmployees"
// //                                                 name="categoryOfEmployees"
// //                                                 className="form-control"
// //                                                 value={formData.categoryOfEmployees}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter Category"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="grade" className="form-label">
// //                                                 Grade <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="grade"
// //                                                 name="grade"
// //                                                 className="form-control"
// //                                                 value={formData.grade}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter Grade"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="jobDesignation" className="form-label">
// //                                                 Job Designation <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="jobDesignation"
// //                                                 name="jobDesignation"
// //                                                 className="form-control"
// //                                                 value={formData.jobDesignation}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter Job Designation"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="dateOfBirth" className="form-label">
// //                                                 Date of Birth <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="date"
// //                                                 id="dateOfBirth"
// //                                                 name="dateOfBirth"
// //                                                 className="form-control"
// //                                                 value={formData.dateOfBirth}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="fatherName" className="form-label">
// //                                                 Father Name <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="fatherName"
// //                                                 name="fatherName"
// //                                                 className="form-control"
// //                                                 value={formData.fatherName}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter Father Name"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="spouseName" className="form-label">
// //                                                 Spouse Name
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="spouseName"
// //                                                 name="spouseName"
// //                                                 className="form-control"
// //                                                 value={formData.spouseName}
// //                                                 onChange={handleChange}
// //                                                 placeholder="Enter Spouse Name"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-12">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="currentAddress" className="form-label">
// //                                                 Current Address <span className="text-danger">*</span>
// //                                             </label>
// //                                             <textarea
// //                                                 className="form-control"
// //                                                 id="currentAddress"
// //                                                 name="currentAddress"
// //                                                 rows={3}
// //                                                 value={formData.currentAddress}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="contactNumber" className="form-label">
// //                                                 Contact Number <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="tel"
// //                                                 id="contactNumber"
// //                                                 name="contactNumber"
// //                                                 className="form-control"
// //                                                 value={formData.contactNumber}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter 10-digit number"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="emergencyContactNumber" className="form-label">
// //                                                 Emergency Contact Number <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="tel"
// //                                                 id="emergencyContactNumber"
// //                                                 name="emergencyContactNumber"
// //                                                 className="form-control"
// //                                                 value={formData.emergencyContactNumber}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter 10-digit number"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="emailId" className="form-label">
// //                                                 Email ID <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="email"
// //                                                 id="emailId"
// //                                                 name="emailId"
// //                                                 className="form-control"
// //                                                 value={formData.emailId}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="example@gmail.com"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="nationality" className="form-label">
// //                                                 Nationality <span className="text-danger">*</span>
// //                                             </label>
// //                                             <select
// //                                                 id="nationality"
// //                                                 name="nationality"
// //                                                 className="form-control"
// //                                                 value={formData.nationality}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                             >
// //                                                 <option value="">Select Nationality</option>
// //                                                 <option value="Indian">Indian</option>
// //                                                 <option value="Nepalese">Nepalese</option>
// //                                                 <option value="Bhutanese">Bhutanese</option>
// //                                                 <option value="Other">Other</option>
// //                                             </select>
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="religion" className="form-label">
// //                                                 Religion <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="religion"
// //                                                 name="religion"
// //                                                 className="form-control"
// //                                                 value={formData.religion}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter Religion"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="gender" className="form-label">
// //                                                 Gender <span className="text-danger">*</span>
// //                                             </label>
// //                                             <select
// //                                                 id="gender"
// //                                                 name="gender"
// //                                                 className="form-control"
// //                                                 value={formData.gender}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                             >
// //                                                 <option value="">Select Gender</option>
// //                                                 <option value="Male">Male</option>
// //                                                 <option value="Female">Female</option>
// //                                                 <option value="Transgender">Transgender</option>
// //                                             </select>
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="maritalStatus" className="form-label">
// //                                                 Marital Status <span className="text-danger">*</span>
// //                                             </label>
// //                                             <select
// //                                                 id="maritalStatus"
// //                                                 name="maritalStatus"
// //                                                 className="form-control"
// //                                                 value={formData.maritalStatus}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                             >
// //                                                 <option value="">Select Status</option>
// //                                                 <option value="Married">Married</option>
// //                                                 <option value="Un-Married">Un-Married</option>
// //                                                 <option value="Widower">Widower</option>
// //                                                 <option value="Divorcee">Divorcee</option>
// //                                             </select>
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="higherQualification" className="form-label">
// //                                                 Higher Qualification <span className="text-danger">*</span>
// //                                             </label>
// //                                             <select
// //                                                 id="higherQualification"
// //                                                 name="higherQualification"
// //                                                 className="form-control"
// //                                                 value={formData.higherQualification}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                             >
// //                                                 <option value="">Select Qualification</option>
// //                                                 <option value="Below Class 12">Below Class 12</option>
// //                                                 <option value="Upto Class 12">Upto Class 12</option>
// //                                                 <option value="Graduate">Graduate</option>
// //                                                 <option value="Post Graduate">Post Graduate</option>
// //                                             </select>
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="physicalHandicap" className="form-label">
// //                                                 Physical Handicap <span className="text-danger">*</span>
// //                                             </label>
// //                                             <select
// //                                                 id="physicalHandicap"
// //                                                 name="physicalHandicap"
// //                                                 className="form-control"
// //                                                 value={formData.physicalHandicap}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                             >
// //                                                 <option value="">Select Status</option>
// //                                                 <option value="Yes">Yes</option>
// //                                                 <option value="No">No</option>
// //                                             </select>
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="aadharPassportNumber" className="form-label">
// //                                                 Aadhar Number <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="aadharPassportNumber"
// //                                                 name="aadharPassportNumber"
// //                                                 className="form-control"
// //                                                 value={formData.aadharPassportNumber}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter 12-digit Aadhar Number"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="aadharPassportFile" className="form-label">
// //                                                 Aadhar Upload <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="file"
// //                                                 id="aadharPassportFile"
// //                                                 name="aadharPassportFile"
// //                                                 className="form-control"
// //                                                 accept=".jpg,.jpeg,.png,.pdf"
// //                                                 onChange={(e) => handleFileChange(e)}
// //                                                 required
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="panNumber" className="form-label">
// //                                                 PAN Number <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="panNumber"
// //                                                 name="panNumber"
// //                                                 className="form-control"
// //                                                 value={formData.panNumber}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter PAN Number"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="panFile" className="form-label">
// //                                                 PAN Upload <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="file"
// //                                                 id="panFile"
// //                                                 name="panFile"
// //                                                 className="form-control"
// //                                                 accept=".jpg,.jpeg,.png,.pdf"
// //                                                 onChange={(e) => handleFileChange(e)}
// //                                                 required
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="uanNumber" className="form-label">
// //                                                 UAN Number <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="uanNumber"
// //                                                 name="uanNumber"
// //                                                 className="form-control"
// //                                                 value={formData.uanNumber}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter UAN Number"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="esicNumber" className="form-label">
// //                                                 ESIC Number <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="esicNumber"
// //                                                 name="esicNumber"
// //                                                 className="form-control"
// //                                                 value={formData.esicNumber}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter ESIC Number"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div className="card-header mb-2">
// //                                     <h4 className="card-title text-center custom-heading-font">
// //                                         Bank Account Information
// //                                     </h4>
// //                                 </div>
// //                                 <div className="row">
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="accountHolderName" className="form-label">
// //                                                 Account Holder Name <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="accountHolderName"
// //                                                 name="accountHolderName"
// //                                                 className="form-control"
// //                                                 value={formData.accountHolderName}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter Account Holder Name"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="bankName" className="form-label">
// //                                                 Bank Name <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="bankName"
// //                                                 name="bankName"
// //                                                 className="form-control"
// //                                                 value={formData.bankName}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter Bank Name"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="ifscCode" className="form-label">
// //                                                 IFSC Code <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="ifscCode"
// //                                                 name="ifscCode"
// //                                                 className="form-control"
// //                                                 value={formData.ifscCode}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter IFSC Code"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="accountNumber" className="form-label">
// //                                                 Account Number <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="text"
// //                                                 id="accountNumber"
// //                                                 name="accountNumber"
// //                                                 className="form-control"
// //                                                 value={formData.accountNumber}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter Account Number"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="accountType" className="form-label">
// //                                                 Account Type <span className="text-danger">*</span>
// //                                             </label>
// //                                             <select
// //                                                 id="accountType"
// //                                                 name="accountType"
// //                                                 className="form-control"
// //                                                 value={formData.accountType}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                             >
// //                                                 <option value="">Select Account Type</option>
// //                                                 <option value="Savings">Savings</option>
// //                                                 <option value="Current">Current</option>
// //                                                 <option value="Salary">Salary</option>
// //                                             </select>
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div className="card-header mb-2">
// //                                     <h4 className="card-title text-center custom-heading-font">
// //                                         Document Upload
// //                                     </h4>
// //                                 </div>
// //                                 <div className="row">
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="class12Certificate" className="form-label">
// //                                                 Class 12 Certificate <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="file"
// //                                                 id="class12Certificate"
// //                                                 name="class12Certificate"
// //                                                 className="form-control"
// //                                                 accept=".jpg,.jpeg,.png,.pdf"
// //                                                 onChange={(e) => handleFileChange(e)}
// //                                                 required
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="degreeCertificate" className="form-label">
// //                                                 Degree Certificate <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="file"
// //                                                 id="degreeCertificate"
// //                                                 name="degreeCertificate"
// //                                                 className="form-control"
// //                                                 accept=".jpg,.jpeg,.png,.pdf"
// //                                                 onChange={(e) => handleFileChange(e)}
// //                                                 required
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="resume" className="form-label">
// //                                                 Resume <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="file"
// //                                                 id="resume"
// //                                                 name="resume"
// //                                                 className="form-control"
// //                                                 accept=".jpg,.jpeg,.png,.pdf"
// //                                                 onChange={(e) => handleFileChange(e)}
// //                                                 required
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="experienceLetter" className="form-label">
// //                                                 Experience Letter
// //                                             </label>
// //                                             <input
// //                                                 type="file"
// //                                                 id="experienceLetter"
// //                                                 name="experienceLetter"
// //                                                 className="form-control"
// //                                                 accept=".jpg,.jpeg,.png,.pdf"
// //                                                 onChange={(e) => handleFileChange(e)}
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="relievingLetter" className="form-label">
// //                                                 Relieving Letter
// //                                             </label>
// //                                             <input
// //                                                 type="file"
// //                                                 id="relievingLetter"
// //                                                 name="relievingLetter"
// //                                                 className="form-control"
// //                                                 accept=".jpg,.jpeg,.png,.pdf"
// //                                                 onChange={(e) => handleFileChange(e)}
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div className="card-header mb-2">
// //                                     <h4 className="card-title text-center custom-heading-font">
// //                                         Nomination For Gratuity & Others
// //                                     </h4>
// //                                 </div>

// //                                 {nominees.map((nominee, index) => (
// //                                     <div key={nominee.id} className='row'>
// //                                         <div className='d-flex justify-content-between' style={{ padding: "0" }}>
// //                                             <div className="card-header mt-0" style={{ padding: "0.50rem", borderBottom: "none" }}>
// //                                                 <h4 className="card-title text-center">
// //                                                     Nominee {index + 1}
// //                                                 </h4>
// //                                             </div>
// //                                             {nominee.id !== 1 && (
// //                                                 <div className="card-header p-0">
// //                                                     <Link className="btn btn-soft-danger btn-sm"
// //                                                         onClick={() => removeNominee(nominee.id)}>
// //                                                         <iconify-icon
// //                                                             icon="solar:trash-bin-minimalistic-2-broken"
// //                                                             className="align-middle fs-18"
// //                                                         />
// //                                                     </Link>
// //                                                 </div>
// //                                             )}
// //                                         </div>
// //                                         <div className="col-md-6">
// //                                             <div className="mb-3">
// //                                                 <label htmlFor={`nomineeName-${nominee.id}`} className="form-label">
// //                                                     Nominee Name <span className="text-danger">*</span>
// //                                                 </label>
// //                                                 <input
// //                                                     type="text"
// //                                                     id={`nomineeName-${nominee.id}`}
// //                                                     name="nomineeName"
// //                                                     className="form-control"
// //                                                     value={formData.nominationDetails[index]?.nomineeName || ''}
// //                                                     onChange={(e) => handleChange(e, 'nominationDetails', index)}
// //                                                     required
// //                                                     placeholder='Enter Nominee Name'
// //                                                 />
// //                                             </div>
// //                                         </div>

// //                                         <div className="col-md-6">
// //                                             <div className="mb-3">
// //                                                 <label htmlFor={`nomineeRelation-${nominee.id}`} className="form-label">
// //                                                     Relation <span className="text-danger">*</span>
// //                                                 </label>
// //                                                 <select
// //                                                     id={`nomineeRelation-${nominee.id}`}
// //                                                     name="nomineeRelation"
// //                                                     className="form-control"
// //                                                     value={formData.nominationDetails[index]?.nomineeRelation || ''}
// //                                                     onChange={(e) => handleChange(e, 'nominationDetails', index)}
// //                                                     required
// //                                                 >
// //                                                     <option value="">Select Relation</option>
// //                                                     <option value="Spouse">Spouse</option>
// //                                                     <option value="Child">Child</option>
// //                                                     <option value="Father">Father</option>
// //                                                     <option value="Mother">Mother</option>
// //                                                     <option value="Sibling">Sibling</option>
// //                                                     <option value="Other">Other</option>
// //                                                 </select>
// //                                             </div>
// //                                         </div>

// //                                         <div className="col-md-4">
// //                                             <div className="mb-3">
// //                                                 <label htmlFor={`nomineeAadharNumber-${nominee.id}`} className="form-label">
// //                                                     Aadhar Number <span className="text-danger">*</span>
// //                                                 </label>
// //                                                 <input
// //                                                     type="text"
// //                                                     id={`nomineeAadharNumber-${nominee.id}`}
// //                                                     name="nomineeAadharNumber"
// //                                                     className="form-control"
// //                                                     value={formData.nominationDetails[index]?.nomineeAadharNumber || ''}
// //                                                     onChange={(e) => handleChange(e, 'nominationDetails', index)}
// //                                                     required
// //                                                     placeholder='Enter Nominee Aadhar Number'
// //                                                 />
// //                                             </div>
// //                                         </div>

// //                                         <div className="col-md-4">
// //                                             <div className="mb-3">
// //                                                 <label
// //                                                     htmlFor={`nomineeAadharCardOrPassportFile-${nominee.id}`}
// //                                                     className="form-label"
// //                                                 >
// //                                                     Aadhar Card/Passport Upload <span className="text-danger">*</span>
// //                                                 </label>
// //                                                 <input
// //                                                     type="file"
// //                                                     id={`nomineeAadharCardOrPassportFile-${nominee.id}`}
// //                                                     name="nomineeAadharCardOrPassportFile"
// //                                                     className="form-control"
// //                                                     accept=".jpg,.jpeg,.png,.pdf"
// //                                                     onChange={(e) => handleFileChange(e, 'nominationDetails', index)}
// //                                                     required
// //                                                 />
// //                                             </div>
// //                                         </div>

// //                                         <div className="col-md-4">
// //                                             <div className="mb-3">
// //                                                 <label htmlFor={`nomineeShearPercentage-${nominee.id}`} className="form-label">
// //                                                     Share Percentage (%) <span className="text-danger">*</span>
// //                                                 </label>
// //                                                 <input
// //                                                     type="number"
// //                                                     id={`nomineeShearPercentage-${nominee.id}`}
// //                                                     name="nomineeShearPercentage"
// //                                                     className="form-control"
// //                                                     value={formData.nominationDetails[index]?.nomineeShearPercentage || ''}
// //                                                     onChange={(e) => handleChange(e, 'nominationDetails', index)}
// //                                                     required
// //                                                     placeholder='Enter Nominee Share Percentage'
// //                                                     min="0"
// //                                                     max="100"
// //                                                 />
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                                 <div className="text-end card-header">
// //                                     <button
// //                                         type="button"
// //                                         className="btn btn-primary custom-submit-button"
// //                                         onClick={addNominee}
// //                                     >
// //                                         Add Nominee
// //                                     </button>
// //                                 </div>

// //                                 <div className="card-header mt-1">
// //                                     <h4 className="card-title text-center custom-heading-font">
// //                                         Previous Employment
// //                                     </h4>
// //                                 </div>

// //                                 {experiences.map((exp, index) => (
// //                                     <div key={exp.id} className='row'>
// //                                         <div className='d-flex justify-content-between' style={{ padding: "0" }}>
// //                                             <div className="card-header mt-0" style={{ padding: "0.50rem", borderBottom: "none" }}>
// //                                                 <h4 className="card-title text-center">
// //                                                     Experience {index + 1}
// //                                                 </h4>
// //                                             </div>
// //                                             {exp.id !== 1 && (
// //                                                 <div className="card-header p-0">
// //                                                     <Link className="btn btn-soft-danger btn-sm"
// //                                                         onClick={() => removeExperience(exp.id)}>
// //                                                         <iconify-icon
// //                                                             icon="solar:trash-bin-minimalistic-2-broken"
// //                                                             className="align-middle fs-18"
// //                                                         />
// //                                                     </Link>
// //                                                 </div>
// //                                             )}
// //                                         </div>
// //                                         <div className="col-md-6">
// //                                             <div className="mb-3">
// //                                                 <label htmlFor={`previousSchoolName-${exp.id}`} className="form-label">
// //                                                     Name of School/Others <span className="text-danger">*</span>
// //                                                 </label>
// //                                                 <input
// //                                                     type="text"
// //                                                     id={`previousSchoolName-${exp.id}`}
// //                                                     name="previousSchoolName"
// //                                                     className="form-control"
// //                                                     value={formData.experienceDetails[index]?.previousSchoolName || ''}
// //                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
// //                                                     required
// //                                                     placeholder='Enter Previous School Name'
// //                                                 />
// //                                             </div>
// //                                         </div>

// //                                         <div className="col-md-6">
// //                                             <div className="mb-3">
// //                                                 <label htmlFor={`previousSchoolAddress-${exp.id}`} className="form-label">
// //                                                     Address <span className="text-danger">*</span>
// //                                                 </label>
// //                                                 <input
// //                                                     type="text"
// //                                                     id={`previousSchoolAddress-${exp.id}`}
// //                                                     name="previousSchoolAddress"
// //                                                     className="form-control"
// //                                                     value={formData.experienceDetails[index]?.previousSchoolAddress || ''}
// //                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
// //                                                     required
// //                                                     placeholder='Enter Previous School Address'
// //                                                 />
// //                                             </div>
// //                                         </div>

// //                                         <div className="col-md-6">
// //                                             <div className="mb-3">
// //                                                 <label htmlFor={`previousSchoolJoiningDate-${exp.id}`} className="form-label">
// //                                                     From <span className="text-danger">*</span>
// //                                                 </label>
// //                                                 <input
// //                                                     type="date"
// //                                                     id={`previousSchoolJoiningDate-${exp.id}`}
// //                                                     name="previousSchoolJoiningDate"
// //                                                     className="form-control"
// //                                                     value={formData.experienceDetails[index]?.previousSchoolJoiningDate || ''}
// //                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
// //                                                     required
// //                                                 />
// //                                             </div>
// //                                         </div>

// //                                         <div className="col-md-6">
// //                                             <div className="mb-3">
// //                                                 <label htmlFor={`previousSchoolLastDate-${exp.id}`} className="form-label">
// //                                                     To <span className="text-danger">*</span>
// //                                                 </label>
// //                                                 <input
// //                                                     type="date"
// //                                                     id={`previousSchoolLastDate-${exp.id}`}
// //                                                     name="previousSchoolLastDate"
// //                                                     className="form-control"
// //                                                     value={formData.experienceDetails[index]?.previousSchoolLastDate || ''}
// //                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
// //                                                     required
// //                                                 />
// //                                             </div>
// //                                         </div>

// //                                         <div className="col-md-6">
// //                                             <div className="mb-3">
// //                                                 <label htmlFor={`previousJobDesignation-${exp.id}`} className="form-label">
// //                                                     Job Designation <span Grammarly="true" className="text-danger">*</span>
// //                                                 </label>
// //                                                 <input
// //                                                     type="text"
// //                                                     id={`previousJobDesignation-${exp.id}`}
// //                                                     name="previousJobDesignation"
// //                                                     className="form-control"
// //                                                     value={formData.experienceDetails[index]?.previousJobDesignation || ''}
// //                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
// //                                                     required
// //                                                     placeholder='Enter Previous Job Designation'
// //                                                 />
// //                                             </div>
// //                                         </div>

// //                                         <div className="col-md-6">
// //                                             <div className="mb-3">
// //                                                 <label htmlFor={`numberOfExperience-${exp.id}`} className="form-label">
// //                                                     Year. of Experience <span className="text-danger">*</span>
// //                                                 </label>
// //                                                 <input
// //                                                     type="text"
// //                                                     id={`numberOfExperience-${exp.id}`}
// //                                                     name="numberOfExperience"
// //                                                     className="form-control"
// //                                                     value={formData.experienceDetails[index]?.numberOfExperience || ''}
// //                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
// //                                                     required
// //                                                     placeholder='Enter Number of Experience'
// //                                                 />
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                                 <div className="text-end card-header">
// //                                     <button
// //                                         type="button"
// //                                         className="btn btn-primary custom-submit-button"
// //                                         onClick={addExperience}
// //                                     >
// //                                         Add Employment
// //                                     </button>
// //                                 </div>

// //                                 <div className="card-header mb-2">
// //                                     <h4 className="card-title text-center custom-heading-font">
// //                                         Others
// //                                     </h4>
// //                                 </div>
// //                                 <div className="row">
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="securityDepositAmount" className="form-label">
// //                                                 Security Deposit Amount <span className="text-danger">*</span>
// //                                             </label>
// //                                             <input
// //                                                 type="number"
// //                                                 id="securityDepositAmount"
// //                                                 name="securityDepositAmount"
// //                                                 className="form-control"
// //                                                 value={formData.securityDepositAmount}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="Enter Amount"
// //                                                 min="0"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="mandatoryPFContribution" className="form-label">
// //                                                 Mandatory PF Contribution <span className="text-danger">*</span>
// //                                             </label>
// //                                             <select
// //                                                 id="mandatoryPFContribution"
// //                                                 name="mandatoryPFContribution"
// //                                                 className="form-control"

// //                                                 required
// //                                             >
// //                                                 <option value="">Select PF Contribution</option>
// //                                                 <option value="PF Salary (Max 15,000)">PF Salary (Max 15,000)</option>
// //                                                 <option value="PF Salary (More Than 15,000)">PF Salary (More Than 15,000)</option>
// //                                             </select>
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="voluntaryPFContribution" className="form-label">
// //                                                 Voluntary PF Contribution
// //                                             </label>
// //                                             <input
// //                                                 type="number"
// //                                                 id="voluntaryPFContribution"
// //                                                 name="voluntaryPFContribution"
// //                                                 className="form-control"
// //                                                 value={formData.voluntaryPFContribution}
// //                                                 onChange={handleChange}
// //                                                 placeholder="Enter Amount"
// //                                                 min="0"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-4">
// //                                         <div className="mb-3">
// //                                             <label htmlFor="taxRegime" className="form-label">
// //                                                 Tax Regime <span className="text-danger">*</span>
// //                                             </label>
// //                                             <select
// //                                                 id="taxRegime"
// //                                                 name="taxRegime"
// //                                                 className="form-control"
// //                                                 value={formData.taxRegime}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                             >
// //                                                 <option value="">Select Tax Regime</option>
// //                                                 <option value="old">Old</option>
// //                                                 <option value="new">New</option>
// //                                             </select>
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 <div className="text-end">
// //                                     <button
// //                                         type="submit"
// //                                         className="btn btn-primary custom-submit-button"
// //                                         disabled={isLoading}
// //                                     >
// //                                         {isLoading ? (
// //                                             <>
// //                                                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
// //                                                 Updating...
// //                                             </>
// //                                         ) : 'Update'}
// //                                     </button>
// //                                 </div>
// //                             </form>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );

// // };

// // export default UpdatePayrollEmployeeDetails;


// // export default UpdatePayrollEmployeeDetails;


// // By MOnth Frontend 

// import React, { useState, useEffect } from 'react';
// import { toast } from "react-toastify";
// import getAPI from "../../../../../api/getAPI";
// import putAPI from "../../../../../api/putAPI";
// import { Link } from 'react-router-dom';
// import moment from 'moment';

// const UpdatePayrollEmployeeDetailss = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [experiences, setExperiences] = useState([{ id: 1 }]);
//     const [nominees, setNominees] = useState([{ id: 1 }]);
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [year, setYear] = useState(moment().format('YYYY'));
//     const [month, setMonth] = useState(moment().format('MMMM'));
//     const [errors, setErrors] = useState({});
//     const [formData, setFormData] = useState({
//         schoolId: '',
//         employeeId: '',
//         password: '',
//         emailId: '',
//         dateOfBirth: '',
//         joiningDate: '',
//         employeeName: '',
//         contactNumber: '',
//         gender: '',
//         categoryOfEmployees: '',
//         grade: '',
//         jobDesignation: '',
//         fatherName: '',
//         spouseName: '',
//         currentAddress: '',
//         emergencyContactNumber: '',
//         nationality: 'Indian',
//         religion: '',
//         maritalStatus: '',
//         higherQualification: '',
//         physicalHandicap: 'No',
//         aadharPassportNumber: '',
//         aadharPassportFile: null,
//         panNumber: '',
//         panFile: null,
//         uanNumber: '',
//         esicNumber: '',
//         accountHolderName: '',
//         bankName: '',
//         ifscCode: '',
//         accountNumber: '',
//         accountType: '',
//         class12Certificate: null,
//         degreeCertificate: null,
//         resume: null,
//         experienceLetter: null,
//         relievingLetter: null,
//         nominationDetails: [{
//             nomineeName: '',
//             nomineeRelation: '',
//             nomineeAadharNumber: '',
//             nomineeAadharCardOrPassportFile: null,
//             nomineeShearPercentage: ''
//         }],
//         experienceDetails: [{
//             previousSchoolName: '',
//             previousSchoolAddress: '',
//             previousSchoolJoiningDate: '',
//             previousSchoolLastDate: '',
//             previousJobDesignation: '',
//             numberOfExperience: ''
//         }],
//         securityDepositAmount: '',
//         mandatoryPFContribution: '',
//         voluntaryPFContribution: '',
//         taxRegime: '',
//         status: 'On Payroll'
//     });


//     const currentYear = moment().year();
//     const years = Array.from({ length: currentYear - 2024 + 1 }, (_, i) => 2024 + i);
//     const months = moment.months();
//     const currentMonthIndex = moment().month();
//     const availableMonths = year === currentYear.toString() ? months.slice(0, currentMonthIndex + 1) : months;

//     const validateAadhar = (value) => /^\d{12}$/.test(value);
//     const validatePAN = (value) => /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value);
//     const validatePhone = (value) => /^\d{10}$/.test(value);
//     const validateNomineeShares = (nominationDetails) => {
//         const total = nominationDetails.reduce((sum, nominee) => sum + Number(nominee.nomineeShearPercentage || 0), 0);
//         return total === 100;
//     };
//     const validateDates = (experienceDetails) => {
//         return experienceDetails.every(exp => !exp.previousSchoolJoiningDate || !exp.previousSchoolLastDate || new Date(exp.previousSchoolJoiningDate) < new Date(exp.previousSchoolLastDate));
//     };
//     const validateFile = (file) => !file || (file.size <= 2 * 1024 * 1024 && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type));

//     useEffect(() => {
//         const fetchEmployeeDetails = async () => {
//             const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//             const id = userDetails?.schoolId;
//             const empId = userDetails?.userId;

//             if (!id || !empId) {
//                 toast.error("Authentication details missing");
//                 return;
//             }

//             setSchoolId(id);
//             setEmployeeId(empId);

//             try {
//                 setIsLoading(true);
//                 const monthKey = moment(`${year}-${month}`, 'YYYY-MMMM').format('YYYY-MM');
//                 const response = await getAPI(`/get-employee-self-details/${id}/${empId}/${monthKey}`);
//                 console.log("Get res details", response);

//                 if (!response.hasError && response.data?.data) {
//                     const employeeBasicDetail = response.data.data || {};
//                     const employeeData = response.data.data.employeeDetails || {};

//                     const updatedFormData = {
//                         ...formData,
//                         employeeId: employeeBasicDetail.employeeId || '',
//                         schoolId: employeeBasicDetail.schoolId || '',
//                         password: employeeBasicDetail.password || '',
//                         emailId: employeeBasicDetail.emailId || '',
//                         dateOfBirth: employeeBasicDetail.dateOfBirth ? new Date(employeeBasicDetail.dateOfBirth).toISOString().split('T')[0] : '',
//                         joiningDate: employeeBasicDetail.joiningDate ? new Date(employeeBasicDetail.joiningDate).toISOString().split('T')[0] : '',
//                         employeeName: employeeData.employeeName || '',
//                         contactNumber: employeeData.contactNumber || '',
//                         gender: employeeData.gender || '',
//                         categoryOfEmployees: employeeData.categoryOfEmployees || '',
//                         grade: employeeData.grade || '',
//                         jobDesignation: employeeData.jobDesignation || '',
//                         fatherName: employeeData.fatherName || '',
//                         spouseName: employeeData.spouseName || '',
//                         currentAddress: employeeData.currentAddress || '',
//                         emergencyContactNumber: employeeData.emergencyContactNumber || '',
//                         nationality: employeeData.nationality || 'Indian',
//                         religion: employeeData.religion || '',
//                         maritalStatus: employeeData.maritalStatus || '',
//                         higherQualification: employeeData.higherQualification || '',
//                         physicalHandicap: employeeData.physicalHandicap || 'No',
//                         aadharPassportNumber: employeeData.aadharPassportNumber || '',
//                         aadharPassportFile: employeeData.aadharPassportFile || null,
//                         panNumber: employeeData.panNumber || '',
//                         panFile: employeeData.panFile || null,
//                         uanNumber: employeeData.uanNumber || '',
//                         esicNumber: employeeData.esicNumber || '',
//                         accountHolderName: employeeData.accountHolderName || '',
//                         bankName: employeeData.bankName || '',
//                         ifscCode: employeeData.ifscCode || '',
//                         accountNumber: employeeData.accountNumber || '',
//                         accountType: employeeData.accountType || '',
//                         class12Certificate: employeeData.class12Certificate || null,
//                         degreeCertificate: employeeData.degreeCertificate || null,
//                         resume: employeeData.resume || null,
//                         experienceLetter: employeeData.experienceLetter || null,
//                         relievingLetter: employeeData.relievingLetter || null,
//                         securityDepositAmount: employeeData.securityDepositAmount || '',
//                         mandatoryPFContribution: employeeData.mandatoryPFContribution || '',
//                         voluntaryPFContribution: employeeData.voluntaryPFContribution || '',
//                         taxRegime: employeeData.taxRegime || 'new',
//                         status: employeeData.status || 'On Payroll',
//                         nominationDetails: employeeData.nominationDetails?.length > 0 ? employeeData.nominationDetails : [{
//                             nomineeName: '',
//                             nomineeRelation: '',
//                             nomineeAadharNumber: '',
//                             nomineeAadharCardOrPassportFile: null,
//                             nomineeShearPercentage: ''
//                         }],
//                         experienceDetails: employeeData.experienceDetails?.length > 0 ? employeeData.experienceDetails.map(exp => ({
//                             ...exp,
//                             previousSchoolJoiningDate: exp.previousSchoolJoiningDate ? new Date(exp.previousSchoolJoiningDate).toISOString().split('T')[0] : '',
//                             previousSchoolLastDate: exp.previousSchoolLastDate ? new Date(exp.previousSchoolLastDate).toISOString().split('T')[0] : ''
//                         })) : [{
//                             previousSchoolName: '',
//                             previousSchoolAddress: '',
//                             previousSchoolJoiningDate: '',
//                             previousSchoolLastDate: '',
//                             previousJobDesignation: '',
//                             numberOfExperience: ''
//                         }],
//                     };

//                     setFormData(updatedFormData);
//                     setNominees(employeeData.nominationDetails?.length > 0 ?
//                         employeeData.nominationDetails.map((_, index) => ({ id: index + 1 })) :
//                         [{ id: 1 }]);
//                     setExperiences(employeeData.experienceDetails?.length > 0 ?
//                         employeeData.experienceDetails.map((_, index) => ({ id: index + 1 })) :
//                         [{ id: 1 }]);
//                 } else {
//                     toast.error(response.message || "No employee data found for this month");
//                 }
//             } catch (error) {
//                 console.error("Fetch error:", error);
//                 toast.error("Failed to load employee details");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchEmployeeDetails();
//     }, [year, month]);

//     const handleChange = (e, section, index) => {
//         const { name, value } = e.target;
//         let newErrors = { ...errors };

//         if (name === 'aadharPassportNumber' || (section === 'nominationDetails' && name === 'nomineeAadharNumber')) {
//             if (!validateAadhar(value)) newErrors[name] = 'Must be 12 digits';
//             else delete newErrors[name];
//         } else if (name === 'panNumber') {
//             if (!validatePAN(value)) newErrors[name] = 'Invalid PAN format';
//             else delete newErrors[name];
//         } else if (name === 'contactNumber' || name === 'emergencyContactNumber') {
//             if (!validatePhone(value)) newErrors[name] = 'Must be 10 digits';
//             else delete newErrors[name];
//         } else if (section === 'nominationDetails' && name === 'nomineeShearPercentage') {
//             const updatedNominees = formData.nominationDetails.map((item, i) =>
//                 i === index ? { ...item, [name]: value } : item
//             );
//             if (!validateNomineeShares(updatedNominees)) newErrors.nomineeShearPercentage = 'Nominee shares must sum to 100%';
//             else delete newErrors.nomineeShearPercentage;
//         }

//         setErrors(newErrors);

//         if (section === 'nominationDetails') {
//             setFormData(prev => ({
//                 ...prev,
//                 nominationDetails: prev.nominationDetails.map((item, i) =>
//                     i === index ? { ...item, [name]: value } : item
//                 )
//             }));
//         } else if (section === 'experienceDetails') {
//             setFormData(prev => ({
//                 ...prev,
//                 experienceDetails: prev.experienceDetails.map((item, i) =>
//                     i === index ? { ...item, [name]: value } : item
//                 )
//             }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleFileChange = (e, section, index) => {
//         const { name, files } = e.target;
//         let newErrors = { ...errors };

//         if (files[0] && !validateFile(files[0])) {
//             newErrors[name] = 'File must be JPEG, PNG, or PDF and less than 2MB';
//         } else {
//             delete newErrors[name];
//         }
//         setErrors(newErrors);

//         if (section === 'nominationDetails') {
//             setFormData(prev => ({
//                 ...prev,
//                 nominationDetails: prev.nominationDetails.map((item, i) =>
//                     i === index ? { ...item, [name]: files[0] } : item
//                 )
//             }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: files[0] }));
//         }
//     };

//     const addExperience = () => {
//         const newExperience = { id: experiences.length + 1 };
//         setExperiences([...experiences, newExperience]);
//         setFormData(prev => ({
//             ...prev,
//             experienceDetails: [...prev.experienceDetails, {
//                 previousSchoolName: '',
//                 previousSchoolAddress: '',
//                 previousSchoolJoiningDate: '',
//                 previousSchoolLastDate: '',
//                 previousJobDesignation: '',
//                 numberOfExperience: ''
//             }]
//         }));
//     };

//     const removeExperience = (id) => {
//         if (id !== 1) {
//             setExperiences(experiences.filter(exp => exp.id !== id));
//             setFormData(prev => ({
//                 ...prev,
//                 experienceDetails: prev.experienceDetails.filter((_, index) => experiences[index].id !== id)
//             }));
//         }
//     };

//     const addNominee = () => {
//         const newNominee = { id: nominees.length + 1 };
//         setNominees([...nominees, newNominee]);
//         setFormData(prev => ({
//             ...prev,
//             nominationDetails: [...prev.nominationDetails, {
//                 nomineeName: '',
//                 nomineeRelation: '',
//                 nomineeAadharNumber: '',
//                 nomineeAadharCardOrPassportFile: null,
//                 nomineeShearPercentage: ''
//             }]
//         }));
//     };

//     const removeNominee = (id) => {
//         if (id !== 1) {
//             setNominees(nominees.filter(nom => nom.id !== id));
//             setFormData(prev => ({
//                 ...prev,
//                 nominationDetails: prev.nominationDetails.filter((_, index) => nominees[index].id !== id)
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Validate nominee shares sum to 100%
//     const totalShares = formData.nominationDetails.reduce(
//         (sum, nominee) => sum + Number(nominee.nomineeShearPercentage || 0), 0);
//     if (totalShares !== 100) {
//         setErrors(prev => ({
//             ...prev,
//             nomineeShearPercentage: 'Nominee shares must sum to 100%'
//         }));
//         setIsLoading(false);
//         toast.error('Nominee shares must sum to 100%');
//         return;
//     }

//     // Validate experience dates
//     const hasInvalidDates = formData.experienceDetails.some(exp => {
//         if (exp.previousSchoolJoiningDate && exp.previousSchoolLastDate) {
//             return new Date(exp.previousSchoolJoiningDate) >= new Date(exp.previousSchoolLastDate);
//         }
//         return false;
//     });

//     if (hasInvalidDates) {
//         setErrors(prev => ({
//             ...prev,
//             experienceDates: 'End date must be after start date for all experiences'
//         }));
//         setIsLoading(false);
//         toast.error('End date must be after start date for all experiences');
//         return;
//     }

//     try {
//         const submissionData = new FormData();

//         // Append basic employee info
//         submissionData.append('emailId', formData.emailId);
//         submissionData.append('dateOfBirth', formData.dateOfBirth);
//         submissionData.append('joiningDate', formData.joiningDate);

//         // Append monthly employee details
//         submissionData.append('employeeName', formData.employeeName);
//         submissionData.append('contactNumber', formData.contactNumber);
//         submissionData.append('gender', formData.gender);
//         submissionData.append('categoryOfEmployees', formData.categoryOfEmployees);
//         submissionData.append('grade', formData.grade);
//         submissionData.append('jobDesignation', formData.jobDesignation);
//         submissionData.append('fatherName', formData.fatherName);
//         submissionData.append('spouseName', formData.spouseName);
//         submissionData.append('currentAddress', formData.currentAddress);
//         submissionData.append('emergencyContactNumber', formData.emergencyContactNumber);
//         submissionData.append('nationality', formData.nationality);
//         submissionData.append('religion', formData.religion);
//         submissionData.append('maritalStatus', formData.maritalStatus);
//         submissionData.append('higherQualification', formData.higherQualification);
//         submissionData.append('physicalHandicap', formData.physicalHandicap);
//         submissionData.append('aadharPassportNumber', formData.aadharPassportNumber);
//         submissionData.append('panNumber', formData.panNumber);
//         submissionData.append('uanNumber', formData.uanNumber);
//         submissionData.append('esicNumber', formData.esicNumber);
//         submissionData.append('accountHolderName', formData.accountHolderName);
//         submissionData.append('bankName', formData.bankName);
//         submissionData.append('ifscCode', formData.ifscCode);
//         submissionData.append('accountNumber', formData.accountNumber);
//         submissionData.append('accountType', formData.accountType);
//         submissionData.append('securityDepositAmount', formData.securityDepositAmount);
//         submissionData.append('mandatoryPFContribution', formData.mandatoryPFContribution);
//         submissionData.append('voluntaryPFContribution', formData.voluntaryPFContribution);
//         submissionData.append('taxRegime', formData.taxRegime);
//         submissionData.append('status', formData.status);

//         // Append files if they exist
//         if (formData.aadharPassportFile instanceof File) {
//             submissionData.append('aadharPassportFile', formData.aadharPassportFile);
//         }
//         if (formData.panFile instanceof File) {
//             submissionData.append('panFile', formData.panFile);
//         }
//         if (formData.class12Certificate instanceof File) {
//             submissionData.append('class12Certificate', formData.class12Certificate);
//         }
//         if (formData.degreeCertificate instanceof File) {
//             submissionData.append('degreeCertificate', formData.degreeCertificate);
//         }
//         if (formData.resume instanceof File) {
//             submissionData.append('resume', formData.resume);
//         }
//         if (formData.experienceLetter instanceof File) {
//             submissionData.append('experienceLetter', formData.experienceLetter);
//         }
//         if (formData.relievingLetter instanceof File) {
//             submissionData.append('relievingLetter', formData.relievingLetter);
//         }

//         // Append nomination details
//         submissionData.append('nominationDetails', JSON.stringify(formData.nominationDetails));

//         // Append nominee files
//         formData.nominationDetails.forEach((nominee, index) => {
//             if (nominee.nomineeAadharCardOrPassportFile instanceof File) {
//                 submissionData.append(
//                     'nomineeAadharCardOrPassportFile', 
//                     nominee.nomineeAadharCardOrPassportFile
//                 );
//             }
//         });

        
//         submissionData.append('experienceDetails', JSON.stringify(formData.experienceDetails));

       
//         const response = await putAPI(
//             `/update-employee-details/${schoolId}/${employeeId}?year=${year}&month=${month}`,
//             submissionData,
//             { "Content-Type": "multipart/form-data" },
//             true
//         );

//         if (!response.hasError) {
//             toast.success("Employee details updated successfully");
            
            
//             if (response.data?.data) {
//                 const updatedData = response.data.data;
                
//             }
//         } else {
//             toast.error(response.message || "Failed to update employee details");
//         }
//     } catch (error) {
//         console.error("Submission error:", error);
//         toast.error("Failed to update employee details");
        
       
//         if (error.response) {
//             if (error.response.status === 413) {
//                 toast.error("File size too large (max 2MB)");
//             } else if (error.response.data?.errors) {
               
//                 setErrors(error.response.data.errors);
//             }
//         }
//     } finally {
//         setIsLoading(false);
//     }
// };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2">
//                                     <h4 className="payroll-title text-center mb-0">
//                                         Employee Details
//                                     </h4>
//                                 </div>
//                             </div>
//                             <div className="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
//                                 <div className="d-flex flex-wrap align-items-center gap-3">
//                                     <label htmlFor="yearSelect" className="mb-0 fw-bold">Year:</label>
//                                     <select id="yearSelect" className="custom-select" value={year} onChange={(e) => setYear(e.target.value)}>
//                                         {years.map(y => (
//                                             <option key={y} value={y}>{y}</option>
//                                         ))}
//                                     </select>
//                                     <label htmlFor="monthSelect" className="mb-0 fw-bold">Month:</label>
//                                     <select id="monthSelect" className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
//                                         {availableMonths.map(m => (
//                                             <option key={m} value={m}>{m}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="employeeId" className="form-label">
//                                                 Employee ID <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="employeeId"
//                                                 name="employeeId"
//                                                 className="form-control"
//                                                 value={employeeId || ''}
//                                                 readOnly
//                                                 placeholder="Employee ID"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="employeeName" className="form-label">
//                                                 Name of Employee <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="employeeName"
//                                                 name="employeeName"
//                                                 className={`form-control ${errors.employeeName ? 'is-invalid' : ''}`}
//                                                 value={formData.employeeName}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter Employee Name"
//                                             />
//                                             {errors.employeeName && <div className="invalid-feedback">{errors.employeeName}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="joiningDate" className="form-label">
//                                                 Joining Date <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="date"
//                                                 id="joiningDate"
//                                                 name="joiningDate"
//                                                 className="form-control"
//                                                 value={formData.joiningDate}
                                                
//                                                 required
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="categoryOfEmployees" className="form-label">
//                                                 Category of Employees <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="categoryOfEmployees"
//                                                 name="categoryOfEmployees"
//                                                 className={`form-control ${errors.categoryOfEmployees ? 'is-invalid' : ''}`}
//                                                 value={formData.categoryOfEmployees}
                                                
//                                                 required
//                                                 placeholder="Enter Category"
//                                             />
//                                             {errors.categoryOfEmployees && <div className="invalid-feedback">{errors.categoryOfEmployees}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="grade" className="form-label">
//                                                 Grade <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="grade"
//                                                 name="grade"
//                                                 className={`form-control ${errors.grade ? 'is-invalid' : ''}`}
//                                                 value={formData.grade}
                                                
//                                                 required
//                                                 placeholder="Enter Grade"
//                                             />
//                                             {errors.grade && <div className="invalid-feedback">{errors.grade}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="jobDesignation" className="form-label">
//                                                 Job Designation <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="jobDesignation"
//                                                 name="jobDesignation"
//                                                 className={`form-control ${errors.jobDesignation ? 'is-invalid' : ''}`}
//                                                 value={formData.jobDesignation}

//                                                 required
//                                                 placeholder="Enter Job Designation"
//                                             />
//                                             {errors.jobDesignation && <div className="invalid-feedback">{errors.jobDesignation}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="dateOfBirth" className="form-label">
//                                                 Date of Birth <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="date"
//                                                 id="dateOfBirth"
//                                                 name="dateOfBirth"
//                                                 className="form-control"
//                                                 value={formData.dateOfBirth}
//                                                 onChange={handleChange}
//                                                 required
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="fatherName" className="form-label">
//                                                 Father Name <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="fatherName"
//                                                 name="fatherName"
//                                                 className={`form-control ${errors.fatherName ? 'is-invalid' : ''}`}
//                                                 value={formData.fatherName}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter Father Name"
//                                             />
//                                             {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="spouseName" className="form-label">
//                                                 Spouse Name
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="spouseName"
//                                                 name="spouseName"
//                                                 className="form-control"
//                                                 value={formData.spouseName}
//                                                 onChange={handleChange}
//                                                 placeholder="Enter Spouse Name"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="col-md-12">
//                                         <div className="mb-3">
//                                             <label htmlFor="currentAddress" className="form-label">
//                                                 Current Address <span className="text-danger">*</span>
//                                             </label>
//                                             <textarea
//                                                 className={`form-control ${errors.currentAddress ? 'is-invalid' : ''}`}
//                                                 id="currentAddress"
//                                                 name="currentAddress"
//                                                 rows={3}
//                                                 value={formData.currentAddress}
//                                                 onChange={handleChange}
//                                                 required
//                                             />
//                                             {errors.currentAddress && <div className="invalid-feedback">{errors.currentAddress}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="contactNumber" className="form-label">
//                                                 Contact Number <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="tel"
//                                                 id="contactNumber"
//                                                 name="contactNumber"
//                                                 className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
//                                                 value={formData.contactNumber}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter 10-digit number"
//                                             />
//                                             {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="emergencyContactNumber" className="form-label">
//                                                 Emergency Contact Number <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="tel"
//                                                 id="emergencyContactNumber"
//                                                 name="emergencyContactNumber"
//                                                 className={`form-control ${errors.emergencyContactNumber ? 'is-invalid' : ''}`}
//                                                 value={formData.emergencyContactNumber}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter 10-digit number"
//                                             />
//                                             {errors.emergencyContactNumber && <div className="invalid-feedback">{errors.emergencyContactNumber}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="emailId" className="form-label">
//                                                 Email ID <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="email"
//                                                 id="emailId"
//                                                 name="emailId"
//                                                 className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
//                                                 value={formData.emailId}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="example@gmail.com"
//                                             />
//                                             {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="nationality" className="form-label">
//                                                 Nationality <span className="text-danger">*</span>
//                                             </label>
//                                             <select
//                                                 id="nationality"
//                                                 name="nationality"
//                                                 className={`form-control ${errors.nationality ? 'is-invalid' : ''}`}
//                                                 value={formData.nationality}
//                                                 onChange={handleChange}
//                                                 required
//                                             >
//                                                 <option value="">Select Nationality</option>
//                                                 <option value="Indian">Indian</option>
//                                                 <option value="Nepalese">Nepalese</option>
//                                                 <option value="Bhutanese">Bhutanese</option>
//                                                 <option value="Other">Other</option>
//                                             </select>
//                                             {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="religion" className="form-label">
//                                                 Religion <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="religion"
//                                                 name="religion"
//                                                 className={`form-control ${errors.religion ? 'is-invalid' : ''}`}
//                                                 value={formData.religion}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter Religion"
//                                             />
//                                             {errors.religion && <div className="invalid-feedback">{errors.religion}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="gender" className="form-label">
//                                                 Gender <span className="text-danger">*</span>
//                                             </label>
//                                             <select
//                                                 id="gender"
//                                                 name="gender"
//                                                 className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
//                                                 value={formData.gender}
//                                                 onChange={handleChange}
//                                                 required
//                                             >
//                                                 <option value="">Select Gender</option>
//                                                 <option value="Male">Male</option>
//                                                 <option value="Female">Female</option>
//                                                 <option value="Transgender">Transgender</option>
//                                             </select>
//                                             {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="maritalStatus" className="form-label">
//                                                 Marital Status <span className="text-danger">*</span>
//                                             </label>
//                                             <select
//                                                 id="maritalStatus"
//                                                 name="maritalStatus"
//                                                 className={`form-control ${errors.maritalStatus ? 'is-invalid' : ''}`}
//                                                 value={formData.maritalStatus}
//                                                 onChange={handleChange}
//                                                 required
//                                             >
//                                                 <option value="">Select Status</option>
//                                                 <option value="Married">Married</option>
//                                                 <option value="Un-Married">Un-Married</option>
//                                                 <option value="Widower">Widower</option>
//                                                 <option value="Divorcee">Divorcee</option>
//                                             </select>
//                                             {errors.maritalStatus && <div className="invalid-feedback">{errors.maritalStatus}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="higherQualification" className="form-label">
//                                                 Higher Qualification <span className="text-danger">*</span>
//                                             </label>
//                                             <select
//                                                 id="higherQualification"
//                                                 name="higherQualification"
//                                                 className={`form-control ${errors.higherQualification ? 'is-invalid' : ''}`}
//                                                 value={formData.higherQualification}
//                                                 onChange={handleChange}
//                                                 required
//                                             >
//                                                 <option value="">Select Qualification</option>
//                                                 <option value="Below Class 12">Below Class 12</option>
//                                                 <option value="Upto Class 12">Upto Class 12</option>
//                                                 <option value="Graduate">Graduate</option>
//                                                 <option value="Post Graduate">Post Graduate</option>
//                                             </select>
//                                             {errors.higherQualification && <div className="invalid-feedback">{errors.higherQualification}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="physicalHandicap" className="form-label">
//                                                 Physical Handicap <span className="text-danger">*</span>
//                                             </label>
//                                             <select
//                                                 id="physicalHandicap"
//                                                 name="physicalHandicap"
//                                                 className={`form-control ${errors.physicalHandicap ? 'is-invalid' : ''}`}
//                                                 value={formData.physicalHandicap}
//                                                 onChange={handleChange}
//                                                 required
//                                             >
//                                                 <option value="">Select Status</option>
//                                                 <option value="Yes">Yes</option>
//                                                 <option value="No">No</option>
//                                             </select>
//                                             {errors.physicalHandicap && <div className="invalid-feedback">{errors.physicalHandicap}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="aadharPassportNumber" className="form-label">
//                                                 Aadhar Number <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="aadharPassportNumber"
//                                                 name="aadharPassportNumber"
//                                                 className={`form-control ${errors.aadharPassportNumber ? 'is-invalid' : ''}`}
//                                                 value={formData.aadharPassportNumber}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter 12-digit Aadhar Number"
//                                             />
//                                             {errors.aadharPassportNumber && <div className="invalid-feedback">{errors.aadharPassportNumber}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="aadharPassportFile" className="form-label">
//                                                 Aadhar Upload
//                                             </label>
//                                             {formData.aadharPassportFile && typeof formData.aadharPassportFile === 'string' && (
//                                                 <small className='ms-2'>Current: {formData.aadharPassportFile.split('/').pop()}</small>
//                                             )}
//                                             <input
//                                                 type="file"
//                                                 id="aadharPassportFile"
//                                                 name="aadharPassportFile"
//                                                 className={`form-control ${errors.aadharPassportFile ? 'is-invalid' : ''}`}
//                                                 accept=".jpg,.jpeg,.png,.pdf"
//                                                 onChange={(e) => handleFileChange(e)}
//                                             />
//                                             {errors.aadharPassportFile && <div className="invalid-feedback">{errors.aadharPassportFile}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="panNumber" className="form-label">
//                                                 PAN Number <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="panNumber"
//                                                 name="panNumber"
//                                                 className={`form-control ${errors.panNumber ? 'is-invalid' : ''}`}
//                                                 value={formData.panNumber}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter PAN Number"
//                                             />
//                                             {errors.panNumber && <div className="invalid-feedback">{errors.panNumber}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="panFile" className="form-label">
//                                                 PAN Upload
//                                             </label>
//                                             {formData.panFile && typeof formData.panFile === 'string' && (
//                                                 <small className='ms-2'>Current:{formData.panFile.split('/').pop()}</small>
//                                             )}
//                                             <input
//                                                 type="file"
//                                                 id="panFile"
//                                                 name="panFile"
//                                                 className={`form-control ${errors.panFile ? 'is-invalid' : ''}`}
//                                                 accept=".jpg,.jpeg,.png,.pdf"
//                                                 onChange={(e) => handleFileChange(e)}
//                                             />
//                                             {errors.panFile && <div className="invalid-feedback">{errors.panFile}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="uanNumber" className="form-label">
//                                                 UAN Number
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="uanNumber"
//                                                 name="uanNumber"
//                                                 className="form-control"
//                                                 value={formData.uanNumber}
//                                                 onChange={handleChange}
//                                                 placeholder="Enter UAN Number"
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="esicNumber" className="form-label">
//                                                 ESIC Number
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="esicNumber"
//                                                 name="esicNumber"
//                                                 className="form-control"
//                                                 value={formData.esicNumber}
//                                                 onChange={handleChange}
//                                                 placeholder="Enter ESIC Number"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="card-header mb-2">
//                                     <h4 className="card-title text-center custom-heading-font">
//                                         Bank Account Information
//                                     </h4>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="accountHolderName" className="form-label">
//                                                 Account Holder Name <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="accountHolderName"
//                                                 name="accountHolderName"
//                                                 className={`form-control ${errors.accountHolderName ? 'is-invalid' : ''}`}
//                                                 value={formData.accountHolderName}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter Account Holder Name"
//                                             />
//                                             {errors.accountHolderName && <div className="invalid-feedback">{errors.accountHolderName}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="bankName" className="form-label">
//                                                 Bank Name <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="bankName"
//                                                 name="bankName"
//                                                 className={`form-control ${errors.bankName ? 'is-invalid' : ''}`}
//                                                 value={formData.bankName}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter Bank Name"
//                                             />
//                                             {errors.bankName && <div className="invalid-feedback">{errors.bankName}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="ifscCode" className="form-label">
//                                                 IFSC Code <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="ifscCode"
//                                                 name="ifscCode"
//                                                 className={`form-control ${errors.ifscCode ? 'is-invalid' : ''}`}
//                                                 value={formData.ifscCode}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter IFSC Code"
//                                             />
//                                             {errors.ifscCode && <div className="invalid-feedback">{errors.ifscCode}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="accountNumber" className="form-label">
//                                                 Account Number <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="accountNumber"
//                                                 name="accountNumber"
//                                                 className={`form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
//                                                 value={formData.accountNumber}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter Account Number"
//                                             />
//                                             {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="accountType" className="form-label">
//                                                 Account Type <span className="text-danger">*</span>
//                                             </label>
//                                             <select
//                                                 id="accountType"
//                                                 name="accountType"
//                                                 className={`form-control ${errors.accountType ? 'is-invalid' : ''}`}
//                                                 value={formData.accountType}
//                                                 onChange={handleChange}
//                                                 required
//                                             >
//                                                 <option value="">Select Account Type</option>
//                                                 <option value="Savings">Savings</option>
//                                                 <option value="Current">Current</option>
//                                                 <option value="Salary">Salary</option>
//                                             </select>
//                                             {errors.accountType && <div className="invalid-feedback">{errors.accountType}</div>}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="card-header mb-2">
//                                     <h4 className="card-title text-center custom-heading-font">
//                                         Document Upload
//                                     </h4>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="class12Certificate" className="form-label">
//                                                 Class 12 Certificate
//                                             </label>
//                                             {formData.class12Certificate && typeof formData.class12Certificate === 'string' && (
//                                                 <small className='ms-2'>Current: {formData.class12Certificate.split('/').pop()}</small>
//                                             )}
//                                             <input
//                                                 type="file"
//                                                 id="class12Certificate"
//                                                 name="class12Certificate"
//                                                 className={`form-control ${errors.class12Certificate ? 'is-invalid' : ''}`}
//                                                 accept=".jpg,.jpeg,.png,.pdf"
//                                                 onChange={(e) => handleFileChange(e)}
//                                             />
//                                             {errors.class12Certificate && <div className="invalid-feedback">{errors.class12Certificate}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="mb-3">
//                                             <label htmlFor="degreeCertificate" className="form-label">
//                                                 Degree Certificate
//                                             </label>
//                                             {formData.degreeCertificate && typeof formData.degreeCertificate === 'string' && (
//                                                 <small className='ms-2'>Current: {formData.degreeCertificate.split('/').pop()}</small>
//                                             )}
//                                             <input
//                                                 type="file"
//                                                 id="degreeCertificate"
//                                                 name="degreeCertificate"
//                                                 className={`form-control ${errors.degreeCertificate ? 'is-invalid' : ''}`}
//                                                 accept=".jpg,.jpeg,.png,.pdf"
//                                                 onChange={(e) => handleFileChange(e)}
//                                             />
//                                             {errors.degreeCertificate && <div className="invalid-feedback">{errors.degreeCertificate}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="resume" className="form-label">
//                                                 Resume
//                                             </label>
//                                             {formData.resume && typeof formData.resume === 'string' && (
//                                                 <small className='ms-2'>Current: {formData.resume.split('/').pop()}</small>
//                                             )}
//                                             <input
//                                                 type="file"
//                                                 id="resume"
//                                                 name="resume"
//                                                 className={`form-control ${errors.resume ? 'is-invalid' : ''}`}
//                                                 accept=".jpg,.jpeg,.png,.pdf"
//                                                 onChange={(e) => handleFileChange(e)}
//                                             />
//                                             {errors.resume && <div className="invalid-feedback">{errors.resume}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="experienceLetter" className="form-label">
//                                                 Experience Letter
//                                             </label>
//                                             {formData.experienceLetter && typeof formData.experienceLetter === 'string' && (
//                                                 <small className='ms-2'>Current: {formData.experienceLetter.split('/').pop()}</small>
//                                             )}
//                                             <input
//                                                 type="file"
//                                                 id="experienceLetter"
//                                                 name="experienceLetter"
//                                                 className={`form-control ${errors.experienceLetter ? 'is-invalid' : ''}`}
//                                                 accept=".jpg,.jpeg,.png,.pdf"
//                                                 onChange={(e) => handleFileChange(e)}
//                                             />
//                                             {errors.experienceLetter && <div className="invalid-feedback">{errors.experienceLetter}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="relievingLetter" className="form-label">
//                                                 Relieving Letter
//                                             </label>
//                                             {formData.relievingLetter && typeof formData.relievingLetter === 'string' && (
//                                                 <small className='ms-2'>Current: {formData.relievingLetter.split('/').pop()}</small>
//                                             )}
//                                             <input
//                                                 type="file"
//                                                 id="relievingLetter"
//                                                 name="relievingLetter"
//                                                 className={`form-control ${errors.relievingLetter ? 'is-invalid' : ''}`}
//                                                 accept=".jpg,.jpeg,.png,.pdf"
//                                                 onChange={(e) => handleFileChange(e)}
//                                             />
//                                             {errors.relievingLetter && <div className="invalid-feedback">{errors.relievingLetter}</div>}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="card-header mb-2">
//                                     <h4 className="card-title text-center custom-heading-font">
//                                         Nomination For Gratuity & Others
//                                     </h4>
//                                 </div>
//                                 {nominees.map((nominee, index) => (
//                                     <div key={nominee.id} className="row">
//                                         <div className="d-flex justify-content-between" style={{ padding: "0" }}>
//                                             <div className="card-header mt-0" style={{ padding: "0.50rem", borderBottom: "none" }}>
//                                                 <h4 className="card-title text-center">
//                                                     Nominee {index + 1}
//                                                 </h4>
//                                             </div>
//                                             {nominee.id !== 1 && (
//                                                 <div className="card-header p-0">
//                                                     <Link className="btn btn-soft-danger btn-sm" onClick={() => removeNominee(nominee.id)}>
//                                                         <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
//                                                     </Link>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`nomineeName-${nominee.id}`} className="form-label">
//                                                     Nominee Name <span className="text-danger">*</span>
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     id={`nomineeName-${nominee.id}`}
//                                                     name="nomineeName"
//                                                     className={`form-control ${errors.nomineeName ? 'is-invalid' : ''}`}
//                                                     value={formData.nominationDetails[index]?.nomineeName || ''}
//                                                     onChange={(e) => handleChange(e, 'nominationDetails', index)}
//                                                     required
//                                                     placeholder="Enter Nominee Name"
//                                                 />
//                                                 {errors.nomineeName && <div className="invalid-feedback">{errors.nomineeName}</div>}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`nomineeRelation-${nominee.id}`} className="form-label">
//                                                     Relation <span className="text-danger">*</span>
//                                                 </label>
//                                                 <select
//                                                     id={`nomineeRelation-${nominee.id}`}
//                                                     name="nomineeRelation"
//                                                     className={`form-control ${errors.nomineeRelation ? 'is-invalid' : ''}`}
//                                                     value={formData.nominationDetails[index]?.nomineeRelation || ''}
//                                                     onChange={(e) => handleChange(e, 'nominationDetails', index)}
//                                                     required
//                                                 >
//                                                     <option value="">Select Relation</option>
//                                                     <option value="Spouse">Spouse</option>
//                                                     <option value="Child">Child</option>
//                                                     <option value="Father">Father</option>
//                                                     <option value="Mother">Mother</option>
//                                                     <option value="Sibling">Sibling</option>
//                                                     <option value="Other">Other</option>
//                                                 </select>
//                                                 {errors.nomineeRelation && <div className="invalid-feedback">{errors.nomineeRelation}</div>}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-4">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`nomineeAadharNumber-${nominee.id}`} className="form-label">
//                                                     Aadhar Number <span className="text-danger">*</span>
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     id={`nomineeAadharNumber-${nominee.id}`}
//                                                     name="nomineeAadharNumber"
//                                                     className={`form-control ${errors.nomineeAadharNumber ? 'is-invalid' : ''}`}
//                                                     value={formData.nominationDetails[index]?.nomineeAadharNumber || ''}
//                                                     onChange={(e) => handleChange(e, 'nominationDetails', index)}
//                                                     required
//                                                     placeholder="Enter Nominee Aadhar Number"
//                                                 />
//                                                 {errors.nomineeAadharNumber && <div className="invalid-feedback">{errors.nomineeAadharNumber}</div>}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-4">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`nomineeAadharCardOrPassportFile-${nominee.id}`} className="form-label">
//                                                     Aadhar Card/Passport Upload
//                                                 </label>
//                                                 {formData.nominationDetails[index]?.nomineeAadharCardOrPassportFile && typeof formData.nominationDetails[index].nomineeAadharCardOrPassportFile === 'string' && (
//                                                     <small className='ms-2'>Current: {formData.nominationDetails[index].nomineeAadharCardOrPassportFile.split('/').pop()}</small>
//                                                 )}
//                                                 <input
//                                                     type="file"
//                                                     id={`nomineeAadharCardOrPassportFile-${nominee.id}`}
//                                                     name="nomineeAadharCardOrPassportFile"
//                                                     className={`form-control ${errors.nomineeAadharCardOrPassportFile ? 'is-invalid' : ''}`}
//                                                     accept=".jpg,.jpeg,.png,.pdf"
//                                                     onChange={(e) => handleFileChange(e, 'nominationDetails', index)}
//                                                 />
//                                                 {errors.nomineeAadharCardOrPassportFile && <div className="invalid-feedback">{errors.nomineeAadharCardOrPassportFile}</div>}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-4">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`nomineeShearPercentage-${nominee.id}`} className="form-label">
//                                                     Share Percentage (%) <span className="text-danger">*</span>
//                                                 </label>
//                                                 <input
//                                                     type="number"
//                                                     id={`nomineeShearPercentage-${nominee.id}`}
//                                                     name="nomineeShearPercentage"
//                                                     className={`form-control ${errors.nomineeShearPercentage ? 'is-invalid' : ''}`}
//                                                     value={formData.nominationDetails[index]?.nomineeShearPercentage || ''}
//                                                     onChange={(e) => handleChange(e, 'nominationDetails', index)}
//                                                     required
//                                                     placeholder="Enter Nominee Share Percentage"
//                                                     min="0"
//                                                     max="100"
//                                                 />
//                                                 {errors.nomineeShearPercentage && <div className="invalid-feedback">{errors.nomineeShearPercentage}</div>}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 <div className="text-end card-header">
//                                     <button
//                                         type="button"
//                                         className="btn btn-primary custom-submit-button"
//                                         onClick={addNominee}
//                                     >
//                                         Add Nominee
//                                     </button>
//                                 </div>

//                                 <div className="card-header mt-1">
//                                     <h4 className="card-title text-center custom-heading-font">
//                                         Previous Employment
//                                     </h4>
//                                 </div>
//                                 {experiences.map((exp, index) => (
//                                     <div key={exp.id} className="row">
//                                         <div className="d-flex justify-content-between" style={{ padding: "0" }}>
//                                             <div className="card-header mt-0" style={{ padding: "0.50rem", borderBottom: "none" }}>
//                                                 <h4 className="card-title text-center">
//                                                     Experience {index + 1}
//                                                 </h4>
//                                             </div>
//                                             {exp.id !== 1 && (
//                                                 <div className="card-header p-0">
//                                                     <Link className="btn btn-soft-danger btn-sm" onClick={() => removeExperience(exp.id)}>
//                                                         <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
//                                                     </Link>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`previousSchoolName-${exp.id}`} className="form-label">
//                                                     Name of School/Others <span className="text-danger">*</span>
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     id={`previousSchoolName-${exp.id}`}
//                                                     name="previousSchoolName"
//                                                     className={`form-control ${errors.previousSchoolName ? 'is-invalid' : ''}`}
//                                                     value={formData.experienceDetails[index]?.previousSchoolName || ''}
//                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                     required
//                                                     placeholder="Enter Previous School Name"
//                                                 />
//                                                 {errors.previousSchoolName && <div className="invalid-feedback">{errors.previousSchoolName}</div>}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`previousSchoolAddress-${exp.id}`} className="form-label">
//                                                     Address <span className="text-danger">*</span>
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     id={`previousSchoolAddress-${exp.id}`}
//                                                     name="previousSchoolAddress"
//                                                     className={`form-control ${errors.previousSchoolAddress ? 'is-invalid' : ''}`}
//                                                     value={formData.experienceDetails[index]?.previousSchoolAddress || ''}
//                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                     required
//                                                     placeholder="Enter Previous School Address"
//                                                 />
//                                                 {errors.previousSchoolAddress && <div className="invalid-feedback">{errors.previousSchoolAddress}</div>}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`previousSchoolJoiningDate-${exp.id}`} className="form-label">
//                                                     From <span className="text-danger">*</span>
//                                                 </label>
//                                                 <input
//                                                     type="date"
//                                                     id={`previousSchoolJoiningDate-${exp.id}`}
//                                                     name="previousSchoolJoiningDate"
//                                                     className={`form-control ${errors.previousSchoolJoiningDate ? 'is-invalid' : ''}`}
//                                                     value={formData.experienceDetails[index]?.previousSchoolJoiningDate || ''}
//                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                     required
//                                                 />
//                                                 {errors.previousSchoolJoiningDate && <div className="invalid-feedback">{errors.previousSchoolJoiningDate}</div>}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`previousSchoolLastDate-${exp.id}`} className="form-label">
//                                                     To <span className="text-danger">*</span>
//                                                 </label>
//                                                 <input
//                                                     type="date"
//                                                     id={`previousSchoolLastDate-${exp.id}`}
//                                                     name="previousSchoolLastDate"
//                                                     className={`form-control ${errors.previousSchoolLastDate ? 'is-invalid' : ''}`}
//                                                     value={formData.experienceDetails[index]?.previousSchoolLastDate || ''}
//                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                     required
//                                                 />
//                                                 {errors.previousSchoolLastDate && <div className="invalid-feedback">{errors.previousSchoolLastDate}</div>}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`previousJobDesignation-${exp.id}`} className="form-label">
//                                                     Job Designation <span className="text-danger">*</span>
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     id={`previousJobDesignation-${exp.id}`}
//                                                     name="previousJobDesignation"
//                                                     className={`form-control ${errors.previousJobDesignation ? 'is-invalid' : ''}`}
//                                                     value={formData.experienceDetails[index]?.previousJobDesignation || ''}
//                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                     required
//                                                     placeholder="Enter Previous Job Designation"
//                                                 />
//                                                 {errors.previousJobDesignation && <div className="invalid-feedback">{errors.previousJobDesignation}</div>}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="mb-3">
//                                                 <label htmlFor={`numberOfExperience-${exp.id}`} className="form-label">
//                                                     Years of Experience <span className="text-danger">*</span>
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     id={`numberOfExperience-${exp.id}`}
//                                                     name="numberOfExperience"
//                                                     className={`form-control ${errors.numberOfExperience ? 'is-invalid' : ''}`}
//                                                     value={formData.experienceDetails[index]?.numberOfExperience || ''}
//                                                     onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                     required
//                                                     placeholder="Enter Number of Experience"
//                                                 />
//                                                 {errors.numberOfExperience && <div className="invalid-feedback">{errors.numberOfExperience}</div>}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 <div className="text-end card-header">
//                                     <button
//                                         type="button"
//                                         className="btn btn-primary custom-submit-button"
//                                         onClick={addExperience}
//                                     >
//                                         Add Employment
//                                     </button>
//                                 </div>

//                                 <div className="card-header mb-2">
//                                     <h4 className="card-title text-center custom-heading-font">
//                                         Others
//                                     </h4>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="securityDepositAmount" className="form-label">
//                                                 Security Deposit Amount <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="number"
//                                                 id="securityDepositAmount"
//                                                 name="securityDepositAmount"
//                                                 className={`form-control ${errors.securityDepositAmount ? 'is-invalid' : ''}`}
//                                                 value={formData.securityDepositAmount}
//                                                 onChange={handleChange}
//                                                 required
//                                                 placeholder="Enter Amount"
//                                                 min="0"
//                                             />
//                                             {errors.securityDepositAmount && <div className="invalid-feedback">{errors.securityDepositAmount}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="mandatoryPFContribution" className="form-label">
//                                                 Mandatory PF Contribution <span className="text-danger">*</span>
//                                             </label>
//                                             <select
//                                                 id="mandatoryPFContribution"
//                                                 name="mandatoryPFContribution"
//                                                 className={`form-control ${errors.mandatoryPFContribution ? 'is-invalid' : ''}`}
//                                                 value={formData.mandatoryPFContribution}
//                                                 onChange={handleChange}
//                                                 required
//                                             >
//                                                 <option value="">Select PF Contribution</option>
//                                                 <option value="PF Salary (Max 15,000)">PF Salary (Max 15,000)</option>
//                                                 <option value="PF Salary (More Than 15,000)">PF Salary (More Than 15,000)</option>
//                                             </select>
//                                             {errors.mandatoryPFContribution && <div className="invalid-feedback">{errors.mandatoryPFContribution}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="voluntaryPFContribution" className="form-label">
//                                                 Voluntary PF Contribution
//                                             </label>
//                                             <input
//                                                 type="number"
//                                                 id="voluntaryPFContribution"
//                                                 name="voluntaryPFContribution"
//                                                 className={`form-control ${errors.voluntaryPFContribution ? 'is-invalid' : ''}`}
//                                                 value={formData.voluntaryPFContribution}
//                                                 onChange={handleChange}
//                                                 placeholder="Enter Amount"
//                                                 min="0"
//                                             />
//                                             {errors.voluntaryPFContribution && <div className="invalid-feedback">{errors.voluntaryPFContribution}</div>}
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="mb-3">
//                                             <label htmlFor="taxRegime" className="form-label">
//                                                 Tax Regime <span className="text-danger">*</span>
//                                             </label>
//                                             <select
//                                                 id="taxRegime"
//                                                 name="taxRegime"
//                                                 className={`form-control ${errors.taxRegime ? 'is-invalid' : ''}`}
//                                                 value={formData.taxRegime}
//                                                 onChange={handleChange}
//                                                 required
//                                             >
//                                                 <option value="">Select Tax Regime</option>
//                                                 <option value="old">Old</option>
//                                                 <option value="new">New</option>
//                                             </select>
//                                             {errors.taxRegime && <div className="invalid-feedback">{errors.taxRegime}</div>}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="text-end">
//                                     <button
//                                         type="submit"
//                                         className="btn btn-primary custom-submit-button"
//                                         disabled={isLoading || Object.keys(errors).length > 0}
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                                 Updating...
//                                             </>
//                                         ) : 'Update'}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Validate form data...

//     try {
//         const formDataToSend = new FormData();

//         // Append all basic fields
//         Object.keys(formData).forEach(key => {
//             if (key !== 'nominationDetails' && key !== 'experienceDetails' && 
//                 typeof formData[key] !== 'object') {
//                 formDataToSend.append(key, formData[key]);
//             }
//         });

//         // Handle nomination details
//         formData.nominationDetails.forEach((nominee, index) => {
//             Object.keys(nominee).forEach(key => {
//                 if (key !== 'nomineeAadharCardOrPassportFile') {
//                     formDataToSend.append(`nominationDetails[${index}][${key}]`, nominee[key]);
//                 }
//             });
            
//             if (nominee.nomineeAadharCardOrPassportFile instanceof File) {
//                 formDataToSend.append(
//                     `nominationDetails[${index}][nomineeAadharCardOrPassportFile]`,
//                     nominee.nomineeAadharCardOrPassportFile
//                 );
//             }
//         });

//         // Handle experience details
//         formData.experienceDetails.forEach((exp, index) => {
//             Object.keys(exp).forEach(key => {
//                 formDataToSend.append(`experienceDetails[${index}][${key}]`, exp[key]);
//             });
//         });

//         // Append files
//         const fileFields = [
//             'aadharPassportFile', 'panFile', 'class12Certificate',
//             'degreeCertificate', 'resume', 'experienceLetter', 'relievingLetter'
//         ];

//         fileFields.forEach(field => {
//             if (formData[field] instanceof File) {
//                 formDataToSend.append(field, formData[field]);
//             }
//         });

//         // Append academic year
//         formDataToSend.append('academicYear', academicYear);

//         // Submit to backend
//         const response = await putAPI(
//             `/update-employee-details/${schoolId}/${employeeId}`,
//             formDataToSend,
//             { "Content-Type": "multipart/form-data" },
//             true
//         );

//         // Handle response...
//     } catch (error) {
//         // Handle error...
//     } finally {
//         setIsLoading(false);
//     }
// };

// export default UpdatePayrollEmployeeDetailss;

// import React, { useState, useEffect } from 'react';
// import { toast } from "react-toastify";
// import getAPI from "../../../../../api/getAPI";
// import putAPI from "../../../../../api/putAPI";
// import { Link } from 'react-router-dom';

// const UpdatePayrollEmployeeDetails = () => {
//     const [experiences, setExperiences] = useState([{ id: 1 }]);
//     const [nominees, setNominees] = useState([{ id: 1 }]);
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [academicYear, setAcademicYear] = useState("2025-26");
//     const [errors, setErrors] = useState({});
//     const [formData, setFormData] = useState({
//         schoolId: '',
//         employeeId: '',
//         password: '',
//         emailId: '',
//         dateOfBirth: '',
//         joiningDate: '',
//         employeeName: '',
//         contactNumber: '',
//         gender: '',
//         categoryOfEmployees: '',
//         grade: '',
//         jobDesignation: '',
//         fatherName: '',
//         spouseName: '',
//         currentAddress: '',
//         emergencyContactNumber: '',
//         nationality: 'Indian',
//         religion: '',
//         maritalStatus: '',
//         higherQualification: '',
//         physicalHandicap: 'No',
//         aadharPassportNumber: '',
//         aadharPassportFile: null,
//         panNumber: '',
//         panFile: null,
//         uanNumber: '',
//         esicNumber: '',
//         accountHolderName: '',
//         bankName: '',
//         ifscCode: '',
//         accountNumber: '',
//         accountType: '',
//         class12Certificate: null,
//         degreeCertificate: null,
//         resume: null,
//         experienceLetter: null,
//         relievingLetter: null,
//         nominationDetails: [{
//             nomineeName: '',
//             nomineeRelation: '',
//             nomineeAadharNumber: '',
//             nomineeAadharCardOrPassportFile: null,
//             nomineeShearPercentage: ''
//         }],
//         experienceDetails: [{
//             previousSchoolName: '',
//             previousSchoolAddress: '',
//             previousSchoolJoiningDate: '',
//             previousSchoolLastDate: '',
//             previousJobDesignation: '',
//             numberOfExperience: ''
//         }],
//         securityDepositAmount: '',
//         taxRegime: '',
//         status: 'On Payroll'
//     });

//     const validateAadhar = (value) => /^\d{12}$/.test(value);
//     const validatePAN = (value) => /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value);
//     const validatePhone = (value) => /^\d{10}$/.test(value);
//     const validateNomineeShares = (nominationDetails) => {
//         const total = nominationDetails.reduce((sum, nominee) => sum + Number(nominee.nomineeShearPercentage || 0), 0);
//         return total === 100;
//     };
//     const validateDates = (experienceDetails) => {
//         return experienceDetails.every(exp => !exp.previousSchoolJoiningDate || !exp.previousSchoolLastDate || new Date(exp.previousSchoolJoiningDate) < new Date(exp.previousSchoolLastDate));
//     };
//     const validateFile = (file) => !file || (file.size <= 2 * 1024 * 1024 && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type));

//     useEffect(() => {
//         const fetchEmployeeDetails = async () => {
//             const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//             const id = userDetails?.schoolId;
//             const empId = userDetails?.userId;

//             if (!id || !empId) {
//                 toast.error("Authentication details missing");
//                 return;
//             }

//             setSchoolId(id);
//             setEmployeeId(empId);

//             try {
//                 setIsLoading(true);
//                 const response = await getAPI(`/employee-details/${id}/${empId}?academicYear=${academicYear}`);
//                 console.log("Get employee details response", response);

//                 if (!response.hasError && response.data) {
//                     const { data } = response;
                    
//                     // Merge basic employee data with academic year specific data
//                     const mergedData = {
//                         ...data,
//                         ...data.currentAcademicYearData,
//                         aadharPassportFile: data.currentAcademicYearData?.aadharPassportFile || null,
//                         panFile: data.currentAcademicYearData?.panFile || null,
//                         class12Certificate: data.currentAcademicYearData?.class12Certificate || null,
//                         degreeCertificate: data.currentAcademicYearData?.degreeCertificate || null,
//                         resume: data.currentAcademicYearData?.resume || null,
//                         experienceLetter: data.currentAcademicYearData?.experienceLetter || null,
//                         relievingLetter: data.currentAcademicYearData?.relievingLetter || null
//                     };

//                     setFormData(prev => ({
//                         ...prev,
//                         ...mergedData,
//                         nominationDetails: data.nominationDetails || [],
//                         experienceDetails: data.experienceDetails || []
//                     }));

//                     // Initialize nominees and experiences arrays
//                     if (data.nominationDetails?.length > 0) {
//                         setNominees(data.nominationDetails.map((_, i) => ({ id: i + 1 })));
//                     }
//                     if (data.experienceDetails?.length > 0) {
//                         setExperiences(data.experienceDetails.map((_, i) => ({ id: i + 1 })));
//                     }

//                     if (response.isCloned) {
//                         toast.info(`Data for ${academicYear} initialized from previous academic year`);
//                     }
//                 } else {
//                     toast.error(response.message || "Failed to load employee details");
//                 }
//             } catch (error) {
//                 console.error("Fetch error:", error);
//                 toast.error("Failed to load employee details");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchEmployeeDetails();
//     }, [academicYear]);

//     const handleChange = (e, section, index) => {
//         const { name, value } = e.target;
//         let newErrors = { ...errors };

//         if (name === 'aadharPassportNumber' || (section === 'nominationDetails' && name === 'nomineeAadharNumber')) {
//             if (!validateAadhar(value)) newErrors[name] = 'Must be 12 digits';
//             else delete newErrors[name];
//         } else if (name === 'panNumber') {
//             if (!validatePAN(value)) newErrors[name] = 'Invalid PAN format';
//             else delete newErrors[name];
//         } else if (name === 'contactNumber' || name === 'emergencyContactNumber') {
//             if (!validatePhone(value)) newErrors[name] = 'Must be 10 digits';
//             else delete newErrors[name];
//         } else if (section === 'nominationDetails' && name === 'nomineeShearPercentage') {
//             const updatedNominees = formData.nominationDetails.map((item, i) =>
//                 i === index ? { ...item, [name]: value } : item
//             );
//             if (!validateNomineeShares(updatedNominees)) newErrors.nomineeShearPercentage = 'Nominee shares must sum to 100%';
//             else delete newErrors.nomineeShearPercentage;
//         }

//         setErrors(newErrors);

//         if (section === 'nominationDetails') {
//             setFormData(prev => ({
//                 ...prev,
//                 nominationDetails: prev.nominationDetails.map((item, i) =>
//                     i === index ? { ...item, [name]: value } : item
//                 )
//             }));
//         } else if (section === 'experienceDetails') {
//             setFormData(prev => ({
//                 ...prev,
//                 experienceDetails: prev.experienceDetails.map((item, i) =>
//                     i === index ? { ...item, [name]: value } : item
//                 )
//             }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleFileChange = (e, section, index) => {
//         const { name, files } = e.target;
//         let newErrors = { ...errors };

//         if (files[0] && !validateFile(files[0])) {
//             newErrors[name] = 'File must be JPEG, PNG, or PDF and less than 2MB';
//         } else {
//             delete newErrors[name];
//         }
//         setErrors(newErrors);

//         if (section === 'nominationDetails') {
//             setFormData(prev => ({
//                 ...prev,
//                 nominationDetails: prev.nominationDetails.map((item, i) =>
//                     i === index ? { ...item, [name]: files[0] } : item
//                 )
//             }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: files[0] }));
//         }
//     };

//     const addExperience = () => {
//         const newExperience = { id: experiences.length + 1 };
//         setExperiences([...experiences, newExperience]);
//         setFormData(prev => ({
//             ...prev,
//             experienceDetails: [...prev.experienceDetails, {
//                 previousSchoolName: '',
//                 previousSchoolAddress: '',
//                 previousSchoolJoiningDate: '',
//                 previousSchoolLastDate: '',
//                 previousJobDesignation: '',
//                 numberOfExperience: ''
//             }]
//         }));
//     };

//     const removeExperience = (id) => {
//         if (id !== 1) {
//             setExperiences(experiences.filter(exp => exp.id !== id));
//             setFormData(prev => ({
//                 ...prev,
//                 experienceDetails: prev.experienceDetails.filter((_, index) => experiences[index].id !== id)
//             }));
//         }
//     };

//     const addNominee = () => {
//         const newNominee = { id: nominees.length + 1 };
//         setNominees([...nominees, newNominee]);
//         setFormData(prev => ({
//             ...prev,
//             nominationDetails: [...prev.nominationDetails, {
//                 nomineeName: '',
//                 nomineeRelation: '',
//                 nomineeAadharNumber: '',
//                 nomineeAadharCardOrPassportFile: null,
//                 nomineeShearPercentage: ''
//             }]
//         }));
//     };

//     const removeNominee = (id) => {
//         if (id !== 1) {
//             setNominees(nominees.filter(nom => nom.id !== id));
//             setFormData(prev => ({
//                 ...prev,
//                 nominationDetails: prev.nominationDetails.filter((_, index) => nominees[index].id !== id)
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         // Validate nominee shares sum to 100%
//         const totalShares = formData.nominationDetails.reduce(
//             (sum, nominee) => sum + Number(nominee.nomineeShearPercentage || 0), 0);
//         if (totalShares !== 100) {
//             setErrors(prev => ({
//                 ...prev,
//                 nomineeShearPercentage: 'Nominee shares must sum to 100%'
//             }));
//             setIsLoading(false);
//             toast.error('Nominee shares must sum to 100%');
//             return;
//         }

//         // Validate experience dates
//         const hasInvalidDates = formData.experienceDetails.some(exp => {
//             if (exp.previousSchoolJoiningDate && exp.previousSchoolLastDate) {
//                 return new Date(exp.previousSchoolJoiningDate) >= new Date(exp.previousSchoolLastDate);
//             }
//             return false;
//         });

//         if (hasInvalidDates) {
//             setErrors(prev => ({
//                 ...prev,
//                 experienceDates: 'End date must be after start date for all experiences'
//             }));
//             setIsLoading(false);
//             toast.error('End date must be after start date for all experiences');
//             return;
//         }

//         try {
//             const formDataToSend = new FormData();
            
//             // Append all form data except files
//             Object.keys(formData).forEach(key => {
//                 if (key === 'nominationDetails' || key === 'experienceDetails') {
//                     formDataToSend.append(key, JSON.stringify(formData[key]));
//                 } else if (typeof formData[key] !== 'object' || formData[key] === null) {
//                     formDataToSend.append(key, formData[key]);
//                 }
//             });

//             // Append files if they exist
//             if (formData.aadharPassportFile instanceof File) {
//                 formDataToSend.append('aadharPassportFile', formData.aadharPassportFile);
//             }
//             if (formData.panFile instanceof File) {
//                 formDataToSend.append('panFile', formData.panFile);
//             }
//             if (formData.class12Certificate instanceof File) {
//                 formDataToSend.append('class12Certificate', formData.class12Certificate);
//             }
//             if (formData.degreeCertificate instanceof File) {
//                 formDataToSend.append('degreeCertificate', formData.degreeCertificate);
//             }
//             if (formData.resume instanceof File) {
//                 formDataToSend.append('resume', formData.resume);
//             }
//             if (formData.experienceLetter instanceof File) {
//                 formDataToSend.append('experienceLetter', formData.experienceLetter);
//             }
//             if (formData.relievingLetter instanceof File) {
//                 formDataToSend.append('relievingLetter', formData.relievingLetter);
//             }

//             // Append nominee files
//             formData.nominationDetails.forEach((nominee, index) => {
//                 if (nominee.nomineeAadharCardOrPassportFile instanceof File) {
//                     formDataToSend.append(`nomineeAadharCardOrPassportFile`, nominee.nomineeAadharCardOrPassportFile);
//                 }
//             });

//             // Add academic year to the form data
//             formDataToSend.append('academicYear', academicYear);

//             const response = await putAPI(
//                 `/employee-details/${schoolId}/${employeeId}`,
//                 formDataToSend,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             );

//             if (!response.hasError) {
//                 toast.success("Employee details updated successfully");
//                 // Refresh the data
//                 fetchEmployeeDetails();
//             } else {
//                 toast.error(response.message || "Failed to update employee details");
//                 if (response.errors) {
//                     setErrors(response.errors);
//                 }
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             toast.error("Failed to update employee details");
//             if (error.response?.data?.errors) {
//                 setErrors(error.response.data.errors);
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Render your form JSX here (same as before)
//     // ... [Keep all your existing form JSX code] ...

//     return (
//         <div className="container">
//             {/* Your existing form JSX */}
//             {/* ... */}
//         </div>
//     );
// };

// // export default UpdatePayrollEmployeeDetails;  // try {
//         //     const formDataToSend = new FormData();

//         //     // Append all basic fields
//         //     Object.keys(formData).forEach(key => {
//         //     if (key !== 'nominationDetails' && key !== 'experienceDetails' && 
//         //         typeof formData[key] !== 'object') {
//         //         formDataToSend.append(key, formData[key]);
//         //     }
//         // });
            

//         //     // Append academic year specific fields
//         //     const academicYearFields = [
//         //         'categoryOfEmployees', 'grade', 'jobDesignation'
//         //     ];

//         //     academicYearFields.forEach(field => {
//         //         if (formData[field] !== undefined && formData[field] !== null) {
//         //             formDataToSend.append(field, formData[field]);
//         //         }
//         //     });

//         //     // Append files
//         //     const fileFields = [
//         //         'aadharPassportFile', 'panFile', 'class12Certificate',
//         //         'degreeCertificate', 'resume', 'experienceLetter', 'relievingLetter'
//         //     ];

//         //     fileFields.forEach(field => {
//         //         if (formData[field] instanceof File) {
//         //             formDataToSend.append(field, formData[field]);
//         //         }
//         //     });

//         //     // Append arrays as JSON strings
//         //     formDataToSend.append('nominationDetails', JSON.stringify(formData.nominationDetails));
//         //     formDataToSend.append('experienceDetails', JSON.stringify(formData.experienceDetails));

//         //     // Append academic year
//         //     formDataToSend.append('academicYear', academicYear);

//         //     // Append nominee files
//         //     formData.nominationDetails.forEach((nominee, index) => {
//         //         if (nominee.nomineeAadharCardOrPassportFile instanceof File) {
//         //             formDataToSend.append(`nomineeAadharCardOrPassportFile`, nominee.nomineeAadharCardOrPassportFile);
//         //         }
//         //     });

//         //     const response = await putAPI(
//         //         `/update-employee-details/${schoolId}/${employeeId}`,
//         //         formDataToSend,
//         //         { "Content-Type": "multipart/form-data" },
//         //         true
//         //     );

//         //     if (!response.hasError) {
//         //         toast.success("Employee details updated successfully");
//         //         // Refresh data
//         //         // fetchEmployeeDetails();
//         //     } else {
//         //         toast.error(response.message || "Failed to update employee details");
//         //         if (response.errors) {
//         //             setErrors(response.errors);
//         //         }
//         //     }
//         // } 

//         const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   // Validate form data...

//   try {
//     const formDataToSend = new FormData();

//     // Append all basic fields
//     Object.keys(formData).forEach(key => {
//       if (key !== 'nominationDetails' && key !== 'experienceDetails' && 
//           typeof formData[key] !== 'object') {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     // Handle nomination details
//     formData.nominationDetails.forEach((nominee, index) => {
//       Object.keys(nominee).forEach(key => {
//         if (key !== 'nomineeAadharCardOrPassportFile') {
//           formDataToSend.append(`nominationDetails[${index}][${key}]`, nominee[key]);
//         }
//       });
      
//       if (nominee.nomineeAadharCardOrPassportFile instanceof File) {
//         formDataToSend.append(`nomineeFiles`, nominee.nomineeAadharCardOrPassportFile);
//       }
//     });

//     // Handle experience details
//     formData.experienceDetails.forEach((exp, index) => {
//       Object.keys(exp).forEach(key => {
//         formDataToSend.append(`experienceDetails[${index}][${key}]`, exp[key]);
//       });
//     });

//     // Append other files
//     const fileFields = [
//       'aadharPassportFile', 'panFile', 'class12Certificate',
//       'degreeCertificate', 'resume', 'experienceLetter', 'relievingLetter'
//     ];

//     fileFields.forEach(field => {
//       if (formData[field] instanceof File) {
//         formDataToSend.append(field, formData[field]);
//       }
//     });

//     // Submit to backend
//     const response = await putAPI(
//       `/update-employee-details/${schoolId}/${employeeId}?academicYear=${academicYear}`,
//       formDataToSend,
//       { "Content-Type": "multipart/form-data" },
//       true
//     );

//     // Handle response...
//   } catch (error) {
//     // Handle error...
//   } finally {
//     setIsLoading(false);
//   }
// };


 schoolId: SID760211
 employeeId: JNV00001
 password: jack9630
 emailId: usjadhav2911@gmail.com
 dateOfBirth: 2001-10-08
 joiningDate: 2020-04-10
 employeeName: Jack Tony Smith
 contactNumber: 7412589630
 gender: Male
 categoryOfEmployees: Teaching
 grade: A
 jobDesignation: Trainee Teacher
 fatherName: Tony
 spouseName: 
 currentAddress: Pune
 emergencyContactNumber: 1478523690
 nationality: Indian
 religion: Hindu
 maritalStatus: Un-Married
 higherQualification: Upto Class 12
 physicalHandicap: No
 aadharPassportNumber: 147852369225
 panNumber: CPKPJ4556P
 uanNumber: 12345
 esicNumber: 123
 accountHolderName: Jack
 bankName: SBI
 ifscCode: SBI0001
 accountNumber: 14785236
 accountType: Salary
 securityDepositAmount: 500
 taxRegime: old
 status: On Payroll
 _id: 68993d3e6062336044f86dcb
 academicYearDetails: [object Object]
 createdAt: 2025-08-11T00:45:51.001Z
 updatedAt: 2025-08-12T04:29:37.847Z
 currentAcademicYearData: [object Object]
 academicYear: 2025-26
 nominationDetails[0][nomineeName]: pop
 nominationDetails[0][nomineeRelation]: Child
 nominationDetails[0][nomineeAadharNumber]: 147852369012
 nominationDetails[0][nomineeShearPercentage]: 50
 nominationDetails[0][_id]: 689ac3312a8ec68267dff2ef
 nominationDetails[0][nomineeAadharCardOrPassportFile]: [object File]
 nominationDetails[1][nomineeName]: lol
 nominationDetails[1][nomineeRelation]: Child
 nominationDetails[1][nomineeAadharNumber]: 147852369874
 nominationDetails[1][nomineeShearPercentage]: 50
 nominationDetails[1][nomineeAadharCardOrPassportFile]: [object File]
 experienceDetails[0][previousSchoolName]: School A
 experienceDetails[0][previousSchoolAddress]: Pune
 experienceDetails[0][previousSchoolJoiningDate]: 2024-06-01
 experienceDetails[0][previousSchoolLastDate]: 2025-06-01
 experienceDetails[0][previousJobDesignation]: Trainee
 experienceDetails[0][numberOfExperience]: 1
 experienceDetails[0][_id]: 689ac3312a8ec68267dff2ee
 experienceDetails[1][previousSchoolName]: school B
 experienceDetails[1][previousSchoolAddress]: Nashik
 experienceDetails[1][previousSchoolJoiningDate]: 2023-06-01
 experienceDetails[1][previousSchoolLastDate]: 2024-06-01
 experienceDetails[1][previousJobDesignation]: Trainee
 experienceDetails[1][numberOfExperience]: 1

//  <div className="col-md-4">
//                       <div className="mb-3">
//                         <label htmlFor={`nomineeAadharCardOrPassportFile-${nominee.id}`} className="form-label">
//                           Aadhar Card/Passport Upload
//                         </label>
//                         {formData.nominationDetails[index]?.nomineeAadharCardOrPassportFile && typeof formData.nominationDetails[index].nomineeAadharCardOrPassportFile === 'string' && (
//                           <small className='ms-2'>Current: {formData.nominationDetails[index].nomineeAadharCardOrPassportFile.split('/').pop()}</small>
//                         )}
//                         <input
//                           type="file"
//                           id={`nomineeAadharCardOrPassportFile-${nominee.id}`}
//                           name="nomineeAadharCardOrPassportFile"
//                           className={`form-control ${errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`] ? 'is-invalid' : ''}`}
//                           accept=".jpg,.jpeg,.png,.pdf"
//                           onChange={(e) => handleFileChange(e, 'nominationDetails', index)}
//                         />
//                         {errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`]}</div>}
//                       </div>
//                     </div>