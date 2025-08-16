// import React, { useState, useEffect } from 'react';
// import { toast } from "react-toastify";
// import getAPI from "../../../../../api/getAPI";
// import putAPI from "../../../../../api/putAPI";
// import { Link } from 'react-router-dom';
// import CreatableSelect from "react-select/creatable";

// const EmploerUpdateEmployeeDetails = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [experiences, setExperiences] = useState([{ id: 1 }]);
//     const [nominees, setNominees] = useState([{ id: 1 }]);
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [errors, setErrors] = useState({});
//     const [academicYear, setAcademicYear] = useState('2025-26');
//     const [isLoading, setIsLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         schoolId: '',
//         employeeId: '',
//         password: '',
//         employeeName: '',
//         emailId: '',
//         contactNumber: '',
//         dateOfBirth: '',
//         gender: '',
//         categoryOfEmployees: '',
//         grade: '',
//         jobDesignation: '',
//         joiningDate: '',
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
//         voluntaryPFContribution: '',
//         taxRegime: 'new',
//         status: 'On Payroll',
//         lastWorkingDate: '',
//         reasonForLeaving: '',
//         reasonType: '',
//         pfCode: '',
//         esiCode: '',
//     });

//     const [dropdowns, setDropdowns] = useState({
//         grades: [],
//         categories: [],
//         designations: [],
//     });


//     const [existingFiles, setExistingFiles] = useState({
//         aadharPassportFile: null,
//         panFile: null,
//         class12Certificate: null,
//         degreeCertificate: null,
//         resume: null,
//         experienceLetter: null,
//         relievingLetter: null,
//         nominationDetails: []
//     });

//     const reasonOptions = [
//         { label: "Absconding", value: "Absconding", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Better opportunity & Remuneration", value: "Better opportunity & Remuneration", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "End of Contract", value: "End of Contract", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Family reason", value: "Family reason", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Health Issues", value: "Health Issues", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Higher Studies", value: "Higher Studies", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Marriage", value: "Marriage", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Performance below expectation", value: "Performance below expectation", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Relocation", value: "Relocation", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Role clarity", value: "Role clarity", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Starting own Venture", value: "Starting own Venture", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Worklife Balance", value: "Worklife Balance", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
//         { label: "Retirement", value: "Retirement", data: { type2: "Retirement", pfCode: "R", esiCode: "3" } },
//         { label: "Death", value: "Death", data: { type2: "Death", pfCode: "D", esiCode: "5" } },
//         { label: "Retrenchment", value: "Retrenchment", data: { type2: "Retrenchment", pfCode: "C", esiCode: "10" } },
//         { label: "Permanent Disability", value: "Permanent Disability", data: { type2: "Permanent Disability", pfCode: "P", esiCode: "2" } }
//     ];

//     useEffect(() => {
//         const fetchEmployeeDetails = async () => {
//             const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//             const id = userDetails?.schoolId;
//             // const academicYear = userDetails?.academicYear;
//             if (!id) {
//                 toast.error("School Id not found, please login again");
//                 return;
//             }
//             setSchoolId(id);
//             // setAcademicYear(academicYear);
//         };
//         fetchEmployeeDetails();
//         fetchSettings();
//     }, []);


//     const fetchSettings = async () => {
//         try {
//             const [grades, categories, designations,] = await Promise.all([
//                 getAPI(`/getall-employee-grade/${schoolId}?academicYear=${academicYear}`, {}, true),
//                 getAPI(`/getall-employee-category/${schoolId}?academicYear=${academicYear}`, {}, true),
//                 getAPI(`/getall-employee-job-designation/${schoolId}?academicYear=${academicYear}`, {}, true),
//             ]);

//             if (!grades) {
//                 toast.error("Grade Not founds");
//             }
//             if (!categories) {
//                 toast.error("Grade Not founds");
//             }
//             if (!designations) {
//                 toast.error("Grade Not founds");
//             }

//             setDropdowns({
//                 grades: grades.data.grade || [],
//                 categories: categories.data.categories || [],
//                 designations: designations.data.designation || [],
//             });
//             console.log("grades", grades);
//             console.log("category", categories);
//             console.log("designation", designations);

//         } catch (err) {
//             toast.error("Error fetching data");
//         }
//     };

//     const handleProceed = async () => {
//         if (!employeeId.trim()) {
//             toast.warning("Please enter a valid Employee ID.");
//             return;
//         }

//         try {
//             setIsLoading(true);

//             const response = await getAPI(`/get-employee-self-details/${schoolId}/${employeeId}?academicYear=${academicYear}`);
//             console.log("Get res details", response);

//             if (!response.hasError && response.data?.data) {
//                 setShowForm(true)
//                 fetchSettings();
//                 const { data } = response.data;
//                 const academicYearData = data.currentAcademicYearData || {};

//                 const formatDate = (dateString) => {
//                     if (!dateString) return '';
//                     const date = new Date(dateString);
//                     return date.toISOString().split('T')[0];
//                 };

//                 const mergedData = {
//                     ...data,
//                     ...academicYearData,
//                     dateOfBirth: formatDate(data.dateOfBirth),
//                     joiningDate: formatDate(data.joiningDate),

//                     nominationDetails: data.nominationDetails?.map((nominee) => ({
//                         ...nominee,
//                         nomineeShearPercentage: String(nominee.nomineeShearPercentage),
//                     })) || [{ nomineeName: '', nomineeRelation: '', nomineeAadharNumber: '', nomineeAadharCardOrPassportFile: null, nomineeShearPercentage: '' }],
//                     experienceDetails: data.experienceDetails?.map((exp) => ({
//                         ...exp,
//                         previousSchoolJoiningDate: formatDate(exp.previousSchoolJoiningDate),
//                         previousSchoolLastDate: formatDate(exp.previousSchoolLastDate),
//                     })) || [{ previousSchoolName: '', previousSchoolAddress: '', previousSchoolJoiningDate: '', previousSchoolLastDate: '', previousJobDesignation: '', numberOfExperience: '' }],
//                 };

//                 console.log('Merged Data:', mergedData);

//                 setFormData((prev) => ({
//                     ...prev,
//                     ...mergedData,
//                 }));

//                 setNominees(mergedData.nominationDetails.length > 0
//                     ? mergedData.nominationDetails.map((_, i) => ({ id: i + 1 }))
//                     : [{ id: 1 }]);

//                 setExperiences(mergedData.experienceDetails.length > 0
//                     ? mergedData.experienceDetails.map((_, i) => ({ id: i + 1 }))
//                     : [{ id: 1 }]);

//                 if (response.data.isCloned) {
//                     toast.info(`Data for ${academicYear} initialized from previous academic year`);
//                 }
//             } else {
//                 toast.error(response.message || 'Failed to load employee detailss');
//             }

//         } catch (error) {
//             console.error("Fetch error:", error);
//             toast.error(error.response.data.message || "Failed to load employee details");
//             setShowForm(false)
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleChange = (e, section, index) => {
//         const { name, value } = e.target;

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

//         if (section === 'nominationDetails') {
//             setFormData(prev => ({
//                 ...prev,
//                 nominationDetails: prev.nominationDetails.map((item, i) =>
//                     i === index ? { ...item, [name]: files[0] } : item
//                 )
//             }));
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: files[0]
//             }));
//         }
//     };

//     const handleReasonChange = (selectedOption) => {
//         const reason = selectedOption ? selectedOption.value : '';
//         const reasonData = selectedOption?.data || { type2: '', pfCode: '', esiCode: '' };

//         setFormData(prev => ({
//             ...prev,
//             reasonForLeaving: reason,
//             reasonType: reasonData.type2,
//             pfCode: reasonData.pfCode,
//             esiCode: reasonData.esiCode
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);


//     };

//     const handleSelectChange = (selectedOption, actionMeta) => {
//         const { name } = actionMeta;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: selectedOption ? selectedOption.value : '',
//         }));
//     };
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2">
//                                     <h4 className="payroll-title text-center">
//                                         Employee Details
//                                     </h4>
//                                 </div>
//                             </div>
//                             <form onSubmit="">
//                                 <div className="row mb-3">
//                                     <div className="col-md-6">
//                                         <div className="mb-6">
//                                             <label htmlFor="employeeID" className="form-label">
//                                                 Employee ID <span className="text-danger">*</span>
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 id="employeeID"
//                                                 name="employeeID"
//                                                 className="form-control"
//                                                 value={employeeId}
//                                                 onChange={(e) => setEmployeeId(e.target.value)}
//                                                 required
//                                                 placeholder="Enter Employee ID"
//                                                 disabled={showForm}
//                                                 readOnly={showForm}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className={`col-md-2 ${showForm ? 'd-none' : ''}`} style={{ alignContent: "end", textAlign: "center" }}>
//                                         <button
//                                             type="button"
//                                             className="btn btn-primary custom-submit-button"
//                                             onClick={handleProceed}
//                                         >
//                                             Proceed
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {showForm && (
//                                     <>
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="employeeName" className="form-label">
//                                                         Name of Employee <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="employeeName"
//                                                         name="employeeName"
//                                                         className={`form-control ${errors.employeeName ? 'is-invalid' : ''}`}
//                                                         value={formData.employeeName}
//                                                         required
//                                                         placeholder="Enter Employee Name"
//                                                     />
//                                                     {errors.employeeName && <div className="invalid-feedback">{errors.employeeName}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="joiningDate" className="form-label">
//                                                         Joining Date <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="date"
//                                                         id="joiningDate"
//                                                         name="joiningDate"
//                                                         className="form-control"
//                                                         value={formData.joiningDate}
//                                                         onChange={handleChange}
//                                                         required
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="categoryOfEmployees" className="form-label">
//                                                         Category of Employees <span className="text-danger">*</span>
//                                                     </label>
//                                                     <CreatableSelect
//                                                         isClearable
//                                                         name="categoryOfEmployees"
//                                                         options={dropdowns.categories.map(item => ({
//                                                             value: item.categoryName,
//                                                             label: item.categoryName
//                                                         }))}
//                                                         onChange={handleSelectChange}
//                                                         value={
//                                                             formData.categoryOfEmployees
//                                                                 ? { value: formData.categoryOfEmployees, label: formData.categoryOfEmployees }
//                                                                 : null
//                                                         }
//                                                         placeholder="Select Category"
//                                                         className="email-select"
//                                                     />

//                                                     {errors.categoryOfEmployees && <div className="invalid-feedback">{errors.categoryOfEmployees}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="grade" className="form-label">
//                                                         Grade <span className="text-danger">*</span>
//                                                     </label>

//                                                     <CreatableSelect
//                                                         isClearable
//                                                         name="grade"
//                                                         options={dropdowns.grades.map(item => ({
//                                                             value: item.gradeName,
//                                                             label: item.gradeName
//                                                         }))}
//                                                         onChange={handleSelectChange}
//                                                         value={
//                                                             formData.grade
//                                                                 ? { value: formData.grade, label: formData.grade }
//                                                                 : null
//                                                         }
//                                                         placeholder="Select Grade"
//                                                         className="email-select"
//                                                     />
//                                                     {errors.grade && <div className="invalid-feedback">{errors.grade}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="jobDesignation" className="form-label">
//                                                         Job Designation <span className="text-danger">*</span>
//                                                     </label>
//                                                     <CreatableSelect
//                                                         isClearable
//                                                         name="jobDesignation"
//                                                         options={dropdowns.designations.map(item => ({
//                                                             value: item.designationName,
//                                                             label: item.designationName
//                                                         }))}
//                                                         onChange={handleSelectChange}
//                                                         value={
//                                                             formData.jobDesignation
//                                                                 ? { value: formData.jobDesignation, label: formData.jobDesignation }
//                                                                 : null
//                                                         }
//                                                         placeholder="Select Designation"
//                                                         className="email-select"
//                                                     />

//                                                     {errors.jobDesignation && <div className="invalid-feedback">{errors.jobDesignation}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="dateOfBirth" className="form-label">
//                                                         Date of Birth <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="date"
//                                                         id="dateOfBirth"
//                                                         name="dateOfBirth"
//                                                         className="form-control"
//                                                         value={formData.dateOfBirth}

//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="fatherName" className="form-label">
//                                                         Father Name
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="fatherName"
//                                                         name="fatherName"
//                                                         className={`form-control ${errors.fatherName ? 'is-invalid' : ''}`}
//                                                         value={formData.fatherName}
//                                                         placeholder="Enter Father Name"
//                                                     />
//                                                     {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="spouseName" className="form-label">
//                                                         Spouse Name
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="spouseName"
//                                                         name="spouseName"
//                                                         className="form-control"
//                                                         value={formData.spouseName}
//                                                         placeholder="Enter Spouse Name"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-12">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="currentAddress" className="form-label">
//                                                         Current Address <span className="text-danger">*</span>
//                                                     </label>
//                                                     <textarea
//                                                         className={`form-control ${errors.currentAddress ? 'is-invalid' : ''}`}
//                                                         id="currentAddress"
//                                                         name="currentAddress"
//                                                         rows={3}
//                                                         value={formData.currentAddress}
//                                                     // onChange={handleChange}
//                                                     // required
//                                                     />
//                                                     {errors.currentAddress && <div className="invalid-feedback">{errors.currentAddress}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="contactNumber" className="form-label">
//                                                         Contact Number <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="tel"
//                                                         id="contactNumber"
//                                                         name="contactNumber"
//                                                         className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
//                                                         value={formData.contactNumber}
//                                                         placeholder="Enter 10-digit number"
//                                                     />
//                                                     {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="emergencyContactNumber" className="form-label">
//                                                         Emergency Contact Number <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="tel"
//                                                         id="emergencyContactNumber"
//                                                         name="emergencyContactNumber"
//                                                         className={`form-control ${errors.emergencyContactNumber ? 'is-invalid' : ''}`}
//                                                         value={formData.emergencyContactNumber}
//                                                         placeholder="Enter 10-digit number"
//                                                     />
//                                                     {errors.emergencyContactNumber && <div className="invalid-feedback">{errors.emergencyContactNumber}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="emailId" className="form-label">
//                                                         Email ID <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="email"
//                                                         id="emailId"
//                                                         name="emailId"
//                                                         className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
//                                                         value={formData.emailId}
//                                                         placeholder="example@gmail.com"
//                                                     />
//                                                     {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="nationality" className="form-label">
//                                                         Nationality <span className="text-danger">*</span>
//                                                     </label>

//                                                     <select
//                                                         id="nationality"
//                                                         name="nationality"
//                                                         className={`form-control ${errors.nationality ? 'is-invalid' : ''}`}
//                                                         value={formData.nationality}
//                                                         onChange={handleChange}
//                                                         required
//                                                     >
//                                                         <option value="">Select Nationality</option>
//                                                         <option value="Indian">Indian</option>
//                                                         <option value="Nepalese">Nepalese</option>
//                                                         <option value="Bhutanese">Bhutanese</option>
//                                                         <option value="Other">Other</option>
//                                                     </select>
//                                                     {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="religion" className="form-label">
//                                                         Religion <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="religion"
//                                                         name="religion"
//                                                         className={`form-control ${errors.religion ? 'is-invalid' : ''}`}
//                                                         value={formData.religion}
//                                                         // onChange={handleChange}
//                                                         // required
//                                                         placeholder="Enter Religion"
//                                                     />
//                                                     {errors.religion && <div className="invalid-feedback">{errors.religion}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="gender" className="form-label">
//                                                         Gender <span className="text-danger">*</span>
//                                                     </label>
//                                                     <select
//                                                         id="gender"
//                                                         name="gender"
//                                                         className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
//                                                         value={formData.gender}
//                                                     // onChange={handleChange}
//                                                     // required
//                                                     >
//                                                         <option value="">Select Gender</option>
//                                                         <option value="Male">Male</option>
//                                                         <option value="Female">Female</option>
//                                                         <option value="Transgender">Transgender</option>
//                                                     </select>
//                                                     {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="maritalStatus" className="form-label">
//                                                         Marital Status <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="maritalStatus"
//                                                         name="maritalStatus"
//                                                         className={`form-control ${errors.maritalStatus ? 'is-invalid' : ''}`}
//                                                         value={formData.maritalStatus}
//                                                         // onChange={handleChange}
//                                                         // required
//                                                         placeholder="Enter Religion"
//                                                     />
//                                                     {/* <select
//                                                     id="maritalStatus"
//                                                     name="maritalStatus"
//                                                     className={`form-control ${errors.maritalStatus ? 'is-invalid' : ''}`}
//                                                     value={formData.maritalStatus}
//                                                     // onChange={handleChange}
//                                                     // required
//                                                 >
//                                                     <option value="">Select Status</option>
//                                                     <option value="Married">Married</option>
//                                                     <option value="Un-Married">Un-Married</option>
//                                                     <option value="Widower">Widower</option>
//                                                     <option value="Divorcee">Divorcee</option>
//                                                 </select> */}
//                                                     {errors.maritalStatus && <div className="invalid-feedback">{errors.maritalStatus}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="higherQualification" className="form-label">
//                                                         Higher Qualification <span className="text-danger">*</span>
//                                                     </label>
//                                                     <select
//                                                         id="higherQualification"
//                                                         name="higherQualification"
//                                                         className={`form-control ${errors.higherQualification ? 'is-invalid' : ''}`}
//                                                         value={formData.higherQualification}
//                                                     // onChange={handleChange}
//                                                     // required
//                                                     >
//                                                         <option value="">Select Qualification</option>
//                                                         <option value="Below Class 12">Below Class 12</option>
//                                                         <option value="Upto Class 12">Upto Class 12</option>
//                                                         <option value="Graduate">Graduate</option>
//                                                         <option value="Post Graduate">Post Graduate</option>
//                                                     </select>
//                                                     {errors.higherQualification && <div className="invalid-feedback">{errors.higherQualification}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="physicalHandicap" className="form-label">
//                                                         Physical Handicap <span className="text-danger">*</span>
//                                                     </label>
//                                                     <select
//                                                         id="physicalHandicap"
//                                                         name="physicalHandicap"
//                                                         className={`form-control ${errors.physicalHandicap ? 'is-invalid' : ''}`}
//                                                         value={formData.physicalHandicap}
//                                                     // onChange={handleChange}
//                                                     // required
//                                                     >
//                                                         <option value="">Select Status</option>
//                                                         <option value="Yes">Yes</option>
//                                                         <option value="No">No</option>
//                                                     </select>
//                                                     {errors.physicalHandicap && <div className="invalid-feedback">{errors.physicalHandicap}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="aadharPassportNumber" className="form-label">
//                                                         Aadhar Number <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="aadharPassportNumber"
//                                                         name="aadharPassportNumber"
//                                                         className={`form-control ${errors.aadharPassportNumber ? 'is-invalid' : ''}`}
//                                                         value={formData.aadharPassportNumber}
//                                                         // onChange={handleChange}
//                                                         // required
//                                                         placeholder="Enter 12-digit Aadhar Number"
//                                                     />
//                                                     {errors.aadharPassportNumber && <div className="invalid-feedback">{errors.aadharPassportNumber}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="aadharPassportFile" className="form-label">
//                                                         Aadhar Upload
//                                                     </label>
//                                                     {formData.aadharPassportFile && typeof formData.aadharPassportFile === 'string' && (
//                                                         <small className='ms-2'>Current: {formData.aadharPassportFile.split('/').pop()}</small>
//                                                     )}
//                                                     <input
//                                                         type="file"
//                                                         id="aadharPassportFile"
//                                                         name="aadharPassportFile"
//                                                         className={`form-control ${errors.aadharPassportFile ? 'is-invalid' : ''}`}
//                                                         accept=".jpg,.jpeg,.png,.pdf"
//                                                     // onChange={(e) => handleFileChange(e)}
//                                                     />
//                                                     {errors.aadharPassportFile && <div className="invalid-feedback">{errors.aadharPassportFile}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="panNumber" className="form-label">
//                                                         PAN Number <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="panNumber"
//                                                         name="panNumber"
//                                                         className={`form-control ${errors.panNumber ? 'is-invalid' : ''}`}
//                                                         value={formData.panNumber}
//                                                         placeholder="Enter PAN Number"
//                                                     />
//                                                     {errors.panNumber && <div className="invalid-feedback">{errors.panNumber}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="panFile" className="form-label">
//                                                         PAN Upload
//                                                     </label>
//                                                     {formData.panFile && typeof formData.panFile === 'string' && (
//                                                         <small className='ms-2'>Current: {formData.panFile.split('/').pop()}</small>
//                                                     )}
//                                                     <input
//                                                         type="file"
//                                                         id="panFile"
//                                                         name="panFile"
//                                                         className={`form-control ${errors.panFile ? 'is-invalid' : ''}`}
//                                                         accept=".jpg,.jpeg,.png,.pdf"
//                                                     // onChange={(e) => handleFileChange(e)}
//                                                     />
//                                                     {errors.panFile && <div className="invalid-feedback">{errors.panFile}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="uanNumber" className="form-label">
//                                                         UAN Number
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="uanNumber"
//                                                         name="uanNumber"
//                                                         className="form-control"
//                                                         value={formData.uanNumber}
//                                                         onChange={handleChange}
//                                                         placeholder="Enter UAN Number"
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="esicNumber" className="form-label">
//                                                         ESIC Number
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="esicNumber"
//                                                         name="esicNumber"
//                                                         className="form-control"
//                                                         value={formData.esicNumber}
//                                                         onChange={handleChange}
//                                                         placeholder="Enter ESIC Number"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="card-header mb-2">
//                                             <h4 className="card-title text-center custom-heading-font">
//                                                 Bank Account Information
//                                             </h4>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="accountHolderName" className="form-label">
//                                                         Account Holder Name <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="accountHolderName"
//                                                         name="accountHolderName"
//                                                         className={`form-control ${errors.accountHolderName ? 'is-invalid' : ''}`}
//                                                         value={formData.accountHolderName}
//                                                         placeholder="Enter Account Holder Name"
//                                                     />
//                                                     {errors.accountHolderName && <div className="invalid-feedback">{errors.accountHolderName}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="bankName" className="form-label">
//                                                         Bank Name <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="bankName"
//                                                         name="bankName"
//                                                         className={`form-control ${errors.bankName ? 'is-invalid' : ''}`}
//                                                         value={formData.bankName}
//                                                         placeholder="Enter Bank Name"
//                                                     />
//                                                     {errors.bankName && <div className="invalid-feedback">{errors.bankName}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="ifscCode" className="form-label">
//                                                         IFSC Code <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="ifscCode"
//                                                         name="ifscCode"
//                                                         className={`form-control ${errors.ifscCode ? 'is-invalid' : ''}`}
//                                                         value={formData.ifscCode}
//                                                         placeholder="Enter IFSC Code"
//                                                     />
//                                                     {errors.ifscCode && <div className="invalid-feedback">{errors.ifscCode}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="accountNumber" className="form-label">
//                                                         Account Number <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         id="accountNumber"
//                                                         name="accountNumber"
//                                                         className={`form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
//                                                         value={formData.accountNumber}
//                                                         placeholder="Enter Account Number"
//                                                     />
//                                                     {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="accountType" className="form-label">
//                                                         Account Type <span className="text-danger">*</span>
//                                                     </label>
//                                                     <select
//                                                         id="accountType"
//                                                         name="accountType"
//                                                         className={`form-control ${errors.accountType ? 'is-invalid' : ''}`}
//                                                         value={formData.accountType}
//                                                     >
//                                                         <option value="">Select Account Type</option>
//                                                         <option value="Savings">Savings</option>
//                                                         <option value="Current">Current</option>
//                                                         <option value="Salary">Salary</option>
//                                                     </select>
//                                                     {errors.accountType && <div className="invalid-feedback">{errors.accountType}</div>}
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="card-header mb-2">
//                                             <h4 className="card-title text-center custom-heading-font">
//                                                 Document Upload
//                                             </h4>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="class12Certificate" className="form-label">
//                                                         Class 12 Certificate
//                                                     </label>
//                                                     {formData.class12Certificate && typeof formData.class12Certificate === 'string' && (
//                                                         <small className='ms-2'>Current: {formData.class12Certificate.split('/').pop()}</small>
//                                                     )}
//                                                     <input
//                                                         type="file"
//                                                         id="class12Certificate"
//                                                         name="class12Certificate"
//                                                         className={`form-control ${errors.class12Certificate ? 'is-invalid' : ''}`}
//                                                         accept=".jpg,.jpeg,.png,.pdf"

//                                                     />
//                                                     {errors.class12Certificate && <div className="invalid-feedback">{errors.class12Certificate}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="degreeCertificate" className="form-label">
//                                                         Degree Certificate
//                                                     </label>
//                                                     {formData.degreeCertificate && typeof formData.degreeCertificate === 'string' && (
//                                                         <small className='ms-2'>Current: {formData.degreeCertificate.split('/').pop()}</small>
//                                                     )}
//                                                     <input
//                                                         type="file"
//                                                         id="degreeCertificate"
//                                                         name="degreeCertificate"
//                                                         className={`form-control ${errors.degreeCertificate ? 'is-invalid' : ''}`}
//                                                         accept=".jpg,.jpeg,.png,.pdf"
//                                                     // onChange={(e) => handleFileChange(e)}
//                                                     />
//                                                     {errors.degreeCertificate && <div className="invalid-feedback">{errors.degreeCertificate}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="resume" className="form-label">
//                                                         Resume
//                                                     </label>
//                                                     {formData.resume && typeof formData.resume === 'string' && (
//                                                         <small className='ms-2'>Current: {formData.resume.split('/').pop()}</small>
//                                                     )}
//                                                     <input
//                                                         type="file"
//                                                         id="resume"
//                                                         name="resume"
//                                                         className={`form-control ${errors.resume ? 'is-invalid' : ''}`}
//                                                         accept=".jpg,.jpeg,.png,.pdf"
//                                                     // onChange={(e) => handleFileChange(e)}
//                                                     />
//                                                     {errors.resume && <div className="invalid-feedback">{errors.resume}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="experienceLetter" className="form-label">
//                                                         Experience Letter
//                                                     </label>
//                                                     {formData.experienceLetter && typeof formData.experienceLetter === 'string' && (
//                                                         <small className='ms-2'>Current: {formData.experienceLetter.split('/').pop()}</small>
//                                                     )}
//                                                     <input
//                                                         type="file"
//                                                         id="experienceLetter"
//                                                         name="experienceLetter"
//                                                         className={`form-control ${errors.experienceLetter ? 'is-invalid' : ''}`}
//                                                         accept=".jpg,.jpeg,.png,.pdf"
//                                                     // onChange={(e) => handleFileChange(e)}
//                                                     />
//                                                     {errors.experienceLetter && <div className="invalid-feedback">{errors.experienceLetter}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="relievingLetter" className="form-label">
//                                                         Relieving Letter
//                                                     </label>
//                                                     {formData.relievingLetter && typeof formData.relievingLetter === 'string' && (
//                                                         <small className='ms-2'>Current: {formData.relievingLetter.split('/').pop()}</small>
//                                                     )}
//                                                     <input
//                                                         type="file"
//                                                         id="relievingLetter"
//                                                         name="relievingLetter"
//                                                         className={`form-control ${errors.relievingLetter ? 'is-invalid' : ''}`}
//                                                         accept=".jpg,.jpeg,.png,.pdf"
//                                                     // onChange={(e) => handleFileChange(e)}
//                                                     />
//                                                     {errors.relievingLetter && <div className="invalid-feedback">{errors.relievingLetter}</div>}
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="card-header mb-2">
//                                             <h4 className="card-title text-center custom-heading-font">
//                                                 Nomination For Gratuity & Others
//                                             </h4>
//                                         </div>
//                                         {nominees.map((nominee, index) => (
//                                             <div key={nominee.id} className="row">
//                                                 <div className="d-flex justify-content-between" style={{ padding: '0' }}>
//                                                     <div className="card-header mt-0" style={{ padding: '0.50rem', borderBottom: 'none' }}>
//                                                         <h4 className="card-title text-center">
//                                                             Nominee {index + 1}
//                                                         </h4>
//                                                     </div>

//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`nomineeName-${nominee.id}`} className="form-label">
//                                                             Nominee Name <span className="text-danger">*</span>
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             id={`nomineeName-${nominee.id}`}
//                                                             name="nomineeName"
//                                                             className={`form-control ${errors[`nominationDetails[${index}][nomineeName]`] ? 'is-invalid' : ''}`}
//                                                             value={formData.nominationDetails[index]?.nomineeName || ''}
//                                                             // onChange={(e) => handleChange(e, 'nominationDetails', index)}
//                                                             // required
//                                                             placeholder="Enter Nominee Name"
//                                                         />
//                                                         {errors[`nominationDetails[${index}][nomineeName]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeName]`]}</div>}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`nomineeRelation-${nominee.id}`} className="form-label">
//                                                             Relation <span className="text-danger">*</span>
//                                                         </label>
//                                                         <select
//                                                             id={`nomineeRelation-${nominee.id}`}
//                                                             name="nomineeRelation"
//                                                             className={`form-control ${errors[`nominationDetails[${index}][nomineeRelation]`] ? 'is-invalid' : ''}`}
//                                                             value={formData.nominationDetails[index]?.nomineeRelation || ''}
//                                                         // onChange={(e) => handleChange(e, 'nominationDetails', index)}
//                                                         // required
//                                                         >
//                                                             <option value="">Select Relation</option>
//                                                             <option value="Spouse">Spouse</option>
//                                                             <option value="Child">Child</option>
//                                                             <option value="Father">Father</option>
//                                                             <option value="Mother">Mother</option>
//                                                             <option value="Sibling">Sibling</option>
//                                                             <option value="Other">Other</option>
//                                                         </select>
//                                                         {errors[`nominationDetails[${index}][nomineeRelation]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeRelation]`]}</div>}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`nomineeAadharNumber-${nominee.id}`} className="form-label">
//                                                             Aadhar Number <span className="text-danger">*</span>
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             id={`nomineeAadharNumber-${nominee.id}`}
//                                                             name="nomineeAadharNumber"
//                                                             className={`form-control ${errors[`nominationDetails[${index}][nomineeAadharNumber]`] ? 'is-invalid' : ''}`}
//                                                             value={formData.nominationDetails[index]?.nomineeAadharNumber || ''}
//                                                             // onChange={(e) => handleChange(e, 'nominationDetails', index)}
//                                                             placeholder="Enter Nominee Aadhar Number"
//                                                         />
//                                                         {errors[`nominationDetails[${index}][nomineeAadharNumber]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeAadharNumber]`]}</div>}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`nomineeAadharCardOrPassportFile-${nominee.id}`} className="form-label">
//                                                             Aadhar Card/Passport Upload <span className="text-danger">*</span>
//                                                         </label>
//                                                         {formData.nominationDetails[index]?.nomineeAadharCardOrPassportFile && typeof formData.nominationDetails[index].nomineeAadharCardOrPassportFile === 'string' && (
//                                                             <small className='ms-2'>Current: {formData.nominationDetails[index].nomineeAadharCardOrPassportFile.split('/').pop()}</small>
//                                                         )}
//                                                         <input
//                                                             type="file"
//                                                             id={`nomineeAadharCardOrPassportFile-${nominee.id}`}
//                                                             name="nomineeAadharCardOrPassportFile"
//                                                             className={`form-control ${errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`] ? 'is-invalid' : ''}`}
//                                                             accept=".jpg,.jpeg,.png,.pdf"
//                                                         // onChange={(e) => handleFileChange(e, 'nominationDetails', index)}
//                                                         />
//                                                         {errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`]}</div>}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`nomineeShearPercentage-${nominee.id}`} className="form-label">
//                                                             Share Percentage (%) <span className="text-danger">*</span>
//                                                         </label>
//                                                         <input
//                                                             type="number"
//                                                             id={`nomineeShearPercentage-${nominee.id}`}
//                                                             name="nomineeShearPercentage"
//                                                             className={`form-control ${errors.nomineeShearPercentage || errors[`nominationDetails[${index}][nomineeShearPercentage]`] ? 'is-invalid' : ''}`}
//                                                             value={formData.nominationDetails[index]?.nomineeShearPercentage || ''}
//                                                             // onChange={(e) => handleChange(e, 'nominationDetails', index)}
//                                                             required
//                                                             placeholder="Enter Nominee Share Percentage"
//                                                             min="0"
//                                                             max="100"
//                                                         />
//                                                         {errors.nomineeShearPercentage && <div className="invalid-feedback">{errors.nomineeShearPercentage}</div>}
//                                                         {errors[`nominationDetails[${index}][nomineeShearPercentage]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeShearPercentage]`]}</div>}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}

//                                         <div className="card-header mt-1">
//                                             <h4 className="card-title text-center custom-heading-font">
//                                                 Previous Employment
//                                             </h4>
//                                         </div>
//                                         {experiences.map((exp, index) => (
//                                             <div key={exp.id} className="row">
//                                                 <div className="d-flex justify-content-between" style={{ padding: '0' }}>
//                                                     <div className="card-header mt-0" style={{ padding: '0.50rem', borderBottom: 'none' }}>
//                                                         <h4 className="card-title text-center">
//                                                             Experience {index + 1}
//                                                         </h4>
//                                                     </div>

//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`previousSchoolName-${exp.id}`} className="form-label">
//                                                             Name of School/Others <span className="text-danger">*</span>
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             id={`previousSchoolName-${exp.id}`}
//                                                             name="previousSchoolName"
//                                                             className={`form-control ${errors[`experienceDetails[${index}][previousSchoolName]`] ? 'is-invalid' : ''}`}
//                                                             value={formData.experienceDetails[index]?.previousSchoolName || ''}
//                                                             // onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                             // required
//                                                             placeholder="Enter Previous School Name"
//                                                         />
//                                                         {errors[`experienceDetails[${index}][previousSchoolName]`] && (
//                                                             <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolName]`]}</div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`previousSchoolAddress-${exp.id}`} className="form-label">
//                                                             Address <span className="text-danger">*</span>
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             id={`previousSchoolAddress-${exp.id}`}
//                                                             name="previousSchoolAddress"
//                                                             className={`form-control ${errors[`experienceDetails[${index}][previousSchoolAddress]`] ? 'is-invalid' : ''}`}
//                                                             value={formData.experienceDetails[index]?.previousSchoolAddress || ''}
//                                                             // onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                             // required
//                                                             placeholder="Enter Previous School Address"
//                                                         />
//                                                         {errors[`experienceDetails[${index}][previousSchoolAddress]`] && (
//                                                             <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolAddress]`]}</div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`previousSchoolJoiningDate-${exp.id}`} className="form-label">
//                                                             From <span className="text-danger">*</span>
//                                                         </label>
//                                                         <input
//                                                             type="date"
//                                                             id={`previousSchoolJoiningDate-${exp.id}`}
//                                                             name="previousSchoolJoiningDate"
//                                                             className={`form-control ${errors[`experienceDetails[${index}][previousSchoolJoiningDate]`] ? 'is-invalid' : ''}`}
//                                                             value={formData.experienceDetails[index]?.previousSchoolJoiningDate || ''}
//                                                         // onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                         // required
//                                                         />
//                                                         {errors[`experienceDetails[${index}][previousSchoolJoiningDate]`] && (
//                                                             <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolJoiningDate]`]}</div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`previousSchoolLastDate-${exp.id}`} className="form-label">
//                                                             To <span className="text-danger">*</span>
//                                                         </label>
//                                                         <input
//                                                             type="date"
//                                                             id={`previousSchoolLastDate-${exp.id}`}
//                                                             name="previousSchoolLastDate"
//                                                             className={`form-control ${errors[`experienceDetails[${index}][previousSchoolLastDate]`] ? 'is-invalid' : ''}`}
//                                                             value={formData.experienceDetails[index]?.previousSchoolLastDate || ''}
//                                                         // onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                         // required
//                                                         />
//                                                         {errors[`experienceDetails[${index}][previousSchoolLastDate]`] && (
//                                                             <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolLastDate]`]}</div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`previousJobDesignation-${exp.id}`} className="form-label">
//                                                             Job Designation <span className="text-danger">*</span>
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             id={`previousJobDesignation-${exp.id}`}
//                                                             name="previousJobDesignation"
//                                                             className={`form-control ${errors[`experienceDetails[${index}][previousJobDesignation]`] ? 'is-invalid' : ''}`}
//                                                             value={formData.experienceDetails[index]?.previousJobDesignation || ''}
//                                                             // onChange={(e) => handleChange(e, 'experienceDetails', index)}
//                                                             // required
//                                                             placeholder="Enter Previous Job Designation"
//                                                         />
//                                                         {errors[`experienceDetails[${index}][previousJobDesignation]`] && (
//                                                             <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousJobDesignation]`]}</div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3">
//                                                         <label htmlFor={`numberOfExperience-${exp.id}`} className="form-label">
//                                                             Years of Experience <span className="text-danger">*</span>
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             id={`numberOfExperience-${exp.id}`}
//                                                             name="numberOfExperience"
//                                                             className={`form-control ${errors[`experienceDetails[${index}][numberOfExperience]`] ? 'is-invalid' : ''}`}
//                                                             value={formData.experienceDetails[index]?.numberOfExperience || ''}
//                                                             // readOnly // Prevents manual edits; remove if you want to allow overrides
//                                                             // required
//                                                             placeholder="Auto-calculated from dates"
//                                                         />
//                                                         {errors[`experienceDetails[${index}][numberOfExperience]`] && (
//                                                             <div className="invalid-feedback">{errors[`experienceDetails[${index}][numberOfExperience]`]}</div>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}

//                                         <div className="card-header mb-2">
//                                             <h4 className="card-title text-center custom-heading-font">
//                                                 Others
//                                             </h4>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="securityDepositAmount" className="form-label">
//                                                         Security Deposit Amount <span className="text-danger">*</span>
//                                                     </label>
//                                                     <input
//                                                         type="number"
//                                                         id="securityDepositAmount"
//                                                         name="securityDepositAmount"
//                                                         className={`form-control ${errors.securityDepositAmount ? 'is-invalid' : ''}`}
//                                                         value={formData.securityDepositAmount}
//                                                         onChange={handleChange}
//                                                         required
//                                                         placeholder="Enter Amount"
//                                                         min="0"
//                                                     />
//                                                     {errors.securityDepositAmount && <div className="invalid-feedback">{errors.securityDepositAmount}</div>}
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label htmlFor="taxRegime" className="form-label">
//                                                         Tax Regime <span className="text-danger">*</span>
//                                                     </label>
//                                                     <select
//                                                         id="taxRegime"
//                                                         name="taxRegime"
//                                                         className={`form-control ${errors.taxRegime ? 'is-invalid' : ''}`}
//                                                         value={formData.taxRegime}
//                                                         onChange={handleChange}
//                                                         required
//                                                     >
//                                                         <option value="">Select Tax Regime</option>
//                                                         <option value="old">Old</option>
//                                                         <option value="new">New</option>
//                                                     </select>
//                                                     {errors.taxRegime && <div className="invalid-feedback">{errors.taxRegime}</div>}
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="card-header mb-2">
//                                             <h4 className="card-title text-center custom-heading-font">
//                                                 Status
//                                             </h4>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-md-4">
//                                                 <div className="mb-3">
//                                                     <label
//                                                         htmlFor="status"
//                                                         className="form-label"
//                                                     >
//                                                         Status <span className="text-danger">*</span>
//                                                     </label>
//                                                     <select
//                                                         id="status"
//                                                         name="status"
//                                                         className="form-control"
//                                                         value={formData.status || ''}
//                                                         onChange={handleChange}
//                                                         required
//                                                     >
//                                                         <option value="">Select Status</option>
//                                                         <option value="Left">Left</option>
//                                                         <option value="On Payroll">On Payroll</option>
//                                                     </select>
//                                                 </div>
//                                             </div>

//                                             {formData.status === "Left" && (
//                                                 <>
//                                                     <div className="col-md-4">
//                                                         <div className="mb-3">
//                                                             <label htmlFor="lastWorkingDate" className="form-label">
//                                                                 Last Working Date <span className="text-danger">*</span>
//                                                             </label>
//                                                             <input
//                                                                 type="date"
//                                                                 id="lastWorkingDate"
//                                                                 name="lastWorkingDate"
//                                                                 className="form-control"
//                                                                 value={formData.lastWorkingDate}
//                                                                 onChange={handleChange}
//                                                                 required
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                     <div className="col-md-4">
//                                                         <div className="mb-3">
//                                                             <label htmlFor="reasonForLeaving" className="form-label">
//                                                                 Reason for Leaving <span className="text-danger">*</span>
//                                                             </label>
//                                                             <CreatableSelect
//                                                                 id="reasonForLeaving"
//                                                                 isClearable
//                                                                 placeholder="Select or type reason"
//                                                                 options={reasonOptions}
//                                                                 onChange={handleReasonChange}
//                                                                 value={formData.reasonForLeaving ? { label: formData.reasonForLeaving, value: formData.reasonForLeaving } : null}
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                     <div className="col-md-4">
//                                                         <div className="mb-3">
//                                                             <label htmlFor="reasonType" className="form-label">
//                                                                 Reason Type <span className="text-danger">*</span>
//                                                             </label>
//                                                             <input
//                                                                 type="text"
//                                                                 id="reasonType"
//                                                                 name="reasonType"
//                                                                 className="form-control"
//                                                                 value={formData.reasonType}
//                                                                 readOnly
//                                                                 required
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                     <div className="col-md-4">
//                                                         <div className="mb-3">
//                                                             <label htmlFor="pfCode" className="form-label">
//                                                                 PF Code <span className="text-danger">*</span>
//                                                             </label>
//                                                             <input
//                                                                 type="text"
//                                                                 id="pfCode"
//                                                                 name="pfCode"
//                                                                 className="form-control"
//                                                                 value={formData.pfCode}
//                                                                 readOnly
//                                                                 required
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                     <div className="col-md-4">
//                                                         <div className="mb-3">
//                                                             <label htmlFor="esiCode" className="form-label">
//                                                                 ESI Code <span className="text-danger">*</span>
//                                                             </label>
//                                                             <input
//                                                                 type="text"
//                                                                 id="esiCode"
//                                                                 name="esiCode"
//                                                                 className="form-control"
//                                                                 value={formData.esiCode}
//                                                                 readOnly
//                                                                 required
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )}
//                                         </div>
//                                         <div className="text-end">
//                                             <button
//                                                 type="submit"
//                                                 className="btn btn-primary custom-submit-button"
//                                                 disabled={isLoading}
//                                                 onClick={handleSubmit}
//                                             >
//                                                 {isLoading ? (
//                                                     <>
//                                                         <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                                         Updating...
//                                                     </>
//                                                 ) : 'Update'}
//                                             </button>
//                                         </div>
//                                     </>
//                                 )}
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default EmploerUpdateEmployeeDetails

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import putAPI from '../../../../../api/putAPI';
import { Link } from 'react-router-dom';
import Select from 'react-select'; // Use Select instead of CreatableSelect

const EmploerUpdateEmployeeDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [experiences, setExperiences] = useState([{ id: 1 }]);
  const [nominees, setNominees] = useState([{ id: 1 }]);
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [errors, setErrors] = useState({});
  const [academicYear, setAcademicYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    schoolId: '',
    employeeId: '',
    password: '',
    employeeName: '',
    emailId: '',
    contactNumber: '',
    dateOfBirth: '',
    gender: '',
    categoryOfEmployees: '',
    grade: '',
    jobDesignation: '',
    joiningDate: '',
    fatherName: '',
    spouseName: '',
    currentAddress: '',
    emergencyContactNumber: '',
    nationality: 'Indian',
    religion: '',
    maritalStatus: '',
    higherQualification: '',
    physicalHandicap: 'No',
    aadharPassportNumber: '',
    aadharPassportFile: null,
    panNumber: '',
    panFile: null,
    uanNumber: '',
    esicNumber: '',
    accountHolderName: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    accountType: '',
    class12Certificate: null,
    degreeCertificate: null,
    resume: null,
    experienceLetter: null,
    relievingLetter: null,
    nominationDetails: [{
      nomineeName: '',
      nomineeRelation: '',
      nomineeAadharNumber: '',
      nomineeAadharCardOrPassportFile: null,
      nomineeShearPercentage: '',
    }],
    experienceDetails: [{
      previousSchoolName: '',
      previousSchoolAddress: '',
      previousSchoolJoiningDate: '',
      previousSchoolLastDate: '',
      previousJobDesignation: '',
      numberOfExperience: '',
    }],
    securityDepositAmount: '',
    voluntaryPFContribution: '',
    taxRegime: 'new',
    status: 'On Payroll',
    lastWorkingDate: '',
    reasonForLeaving: '',
    reasonType: '',
    pfCode: '',
    esiCode: '',
  });

  const [dropdowns, setDropdowns] = useState({
    grades: [],
    categories: [],
    designations: [],
  });

  const reasonOptions = [
    { label: 'Absconding', value: 'Absconding', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Better opportunity & Remuneration', value: 'Better opportunity & Remuneration', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'End of Contract', value: 'End of Contract', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Family reason', value: 'Family reason', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Health Issues', value: 'Health Issues', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Higher Studies', value: 'Higher Studies', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Marriage', value: 'Marriage', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Performance below expectation', value: 'Performance below expectation', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Relocation', value: 'Relocation', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Role clarity', value: 'Role clarity', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Starting own Venture', value: 'Starting own Venture', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Worklife Balance', value: 'Worklife Balance', data: { type2: 'Left Services', pfCode: 'C', esiCode: '2' } },
    { label: 'Retirement', value: 'Retirement', data: { type2: 'Retirement', pfCode: 'R', esiCode: '3' } },
    { label: 'Death', value: 'Death', data: { type2: 'Death', pfCode: 'D', esiCode: '5' } },
    { label: 'Retrenchment', value: 'Retrenchment', data: { type2: 'Retrenchment', pfCode: 'C', esiCode: '10' } },
    { label: 'Permanent Disability', value: 'Permanent Disability', data: { type2: 'Permanent Disability', pfCode: 'P', esiCode: '2' } },
  ];

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      const id = userDetails?.schoolId;
      const academicYear = localStorage.getItem("selectedAcademicYear");
      if (!id) {
        toast.error('School ID not found, please login again');
        return;
      }
      setSchoolId(id);
      setAcademicYear(academicYear);
    };
    fetchEmployeeDetails();
  }, []);

  const fetchSettings = async () => {
    if (!schoolId) return;
    setIsLoading(true);
    try {
      const [grades, categories, designations] = await Promise.all([
        getAPI(`/getall-employee-grade/${schoolId}?academicYear=${academicYear}`, {}, true),
        getAPI(`/getall-employee-category/${schoolId}?academicYear=${academicYear}`, {}, true),
        getAPI(`/getall-employee-job-designation/${schoolId}?academicYear=${academicYear}`, {}, true),
      ]);
      
      if (!grades.data?.grade || grades.data.grade.length === 0) {
        toast.error(`Grades not found for ${academicYear}`);
      }

      if (!categories.data?.categories || categories.data.categories.length === 0) {
        toast.error(`Categories not found ${academicYear}`);
      }

      if (!designations.data?.designation || designations.data.designation.length === 0) {
        toast.error(`Designations not found ${academicYear}`);
      }

      setDropdowns({
        grades: grades.data?.grade || [],
        categories: categories.data?.categories || [],
        designations: designations.data?.designation || [],
      });
    } catch (err) {
      toast.error('Error fetching grades, categories, designations dropdown data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = async () => {
    if (!employeeId.trim()) {
      toast.warning('Please enter a valid Employee ID.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await getAPI(`/get-employee-self-details/${schoolId}/${employeeId}?academicYear=${academicYear}`);
      console.log("get-employee-self-details", response);

      if (!response.hasError && response.data?.data) {
        setShowForm(true);
        await fetchSettings();
        const { data } = response.data;
        const academicYearData = data.currentAcademicYearData || {};

        const formatDate = (dateString) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toISOString().split('T')[0];
        };

        const mergedData = {
          ...data,
          ...academicYearData,
          dateOfBirth: formatDate(data.dateOfBirth),
          joiningDate: formatDate(data.joiningDate),
          lastWorkingDate: formatDate(data.lastWorkingDate),
          nominationDetails: data.nominationDetails?.map((nominee) => ({
            ...nominee,
            nomineeShearPercentage: String(nominee.nomineeShearPercentage || ''),
          })) || [{ nomineeName: '', nomineeRelation: '', nomineeAadharNumber: '', nomineeAadharCardOrPassportFile: null, nomineeShearPercentage: '' }],
          experienceDetails: data.experienceDetails?.map((exp) => ({
            ...exp,
            previousSchoolJoiningDate: formatDate(exp.previousSchoolJoiningDate),
            previousSchoolLastDate: formatDate(exp.previousSchoolLastDate),
            numberOfExperience: String(exp.numberOfExperience || ''),
          })) || [{ previousSchoolName: '', previousSchoolAddress: '', previousSchoolJoiningDate: '', previousSchoolLastDate: '', previousJobDesignation: '', numberOfExperience: '' }],
        };

        setFormData((prev) => ({
          ...prev,
          ...mergedData,
        }));

        setNominees(mergedData.nominationDetails.length > 0
          ? mergedData.nominationDetails.map((_, i) => ({ id: i + 1 }))
          : [{ id: 1 }]);

        setExperiences(mergedData.experienceDetails.length > 0
          ? mergedData.experienceDetails.map((_, i) => ({ id: i + 1 }))
          : [{ id: 1 }]);

        if (response.data.isCloned) {
          toast.info(`Data for ${academicYear} initialized from previous academic year`);
        }
      } else {
        toast.error(response.message || 'Failed to load employee details');
        setShowForm(false);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error(error.response?.data?.message || 'Failed to load employee details');
      setShowForm(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;

    if (section === 'nominationDetails') {
      setFormData((prev) => ({
        ...prev,
        nominationDetails: prev.nominationDetails.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    } else if (section === 'experienceDetails') {
      setFormData((prev) => ({
        ...prev,
        experienceDetails: prev.experienceDetails.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e, section, index) => {
    const { name, files } = e.target;

    if (section === 'nominationDetails') {
      setFormData((prev) => ({
        ...prev,
        nominationDetails: prev.nominationDetails.map((item, i) =>
          i === index ? { ...item, [name]: files[0] } : item
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleReasonChange = (selectedOption) => {
    const reason = selectedOption ? selectedOption.value : '';
    const reasonData = selectedOption?.data || { type2: '', pfCode: '', esiCode: '' };

    setFormData((prev) => ({
      ...prev,
      reasonForLeaving: reason,
      reasonType: reasonData.type2,
      pfCode: reasonData.pfCode,
      esiCode: reasonData.esiCode,
    }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : '',
    }));
  };

  const addNominee = () => {
    const newNominee = { id: nominees.length + 1 };
    setNominees([...nominees, newNominee]);
    setFormData((prev) => ({
      ...prev,
      nominationDetails: [...prev.nominationDetails, {
        nomineeName: '',
        nomineeRelation: '',
        nomineeAadharNumber: '',
        nomineeAadharCardOrPassportFile: null,
        nomineeShearPercentage: '',
      }],
    }));
  };

  const removeNominee = (id) => {
    if (id !== 1) {
      setNominees(nominees.filter((nom) => nom.id !== id));
      setFormData((prev) => ({
        ...prev,
        nominationDetails: prev.nominationDetails.filter((_, index) => nominees[index].id !== id),
      }));
    }
  };

  const addExperience = () => {
    const newExperience = { id: experiences.length + 1 };
    setExperiences([...experiences, newExperience]);
    setFormData((prev) => ({
      ...prev,
      experienceDetails: [...prev.experienceDetails, {
        previousSchoolName: '',
        previousSchoolAddress: '',
        previousSchoolJoiningDate: '',
        previousSchoolLastDate: '',
        previousJobDesignation: '',
        numberOfExperience: '',
      }],
    }));
  };

  const removeExperience = (id) => {
    if (id !== 1) {
      setExperiences(experiences.filter((exp) => exp.id !== id));
      setFormData((prev) => ({
        ...prev,
        experienceDetails: prev.experienceDetails.filter((_, index) => experiences[index].id !== id),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const validateAadhar = (value) => !value || /^\d{12}$/.test(value);
    const validatePAN = (value) => !value || /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value);
    const validatePhone = (value) => !value || /^\d{10}$/.test(value);
    const validateNomineeShares = () => {
      const total = formData.nominationDetails.reduce((sum, nominee) => sum + Number(nominee.nomineeShearPercentage || 0), 0);
      return total === 100;
    };

    if (formData.categoryOfEmployees && !dropdowns.categories.some(cat => cat.categoryName === formData.categoryOfEmployees)) {
      newErrors.categoryOfEmployees = 'Selected category is not valid for this academic year';
    }
    if (formData.grade && !dropdowns.grades.some(grade => grade.gradeName === formData.grade)) {
      newErrors.grade = 'Selected grade is not valid for this academic year';
    }
    if (formData.jobDesignation && !dropdowns.designations.some(des => des.designationName === formData.jobDesignation)) {
      newErrors.jobDesignation = 'Selected designation is not valid for this academic year';
    }

    if (!formData.employeeName) newErrors.employeeName = 'Employee name is required';
    if (!formData.emailId) newErrors.emailId = 'Email is required';
    if (!validatePhone(formData.contactNumber)) newErrors.contactNumber = 'Must be a valid 10-digit number';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.categoryOfEmployees) newErrors.categoryOfEmployees = 'Category is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.jobDesignation) newErrors.jobDesignation = 'Job designation is required';
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';
    if (!formData.currentAddress) newErrors.currentAddress = 'Current address is required';
    if (!validatePhone(formData.emergencyContactNumber)) newErrors.emergencyContactNumber = 'Must be a valid 10-digit number';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.religion) newErrors.religion = 'Religion is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
    if (!formData.higherQualification) newErrors.higherQualification = 'Higher qualification is required';
    if (!formData.physicalHandicap) newErrors.physicalHandicap = 'Physical handicap status is required';
    if (!validateAadhar(formData.aadharPassportNumber)) newErrors.aadharPassportNumber = 'Aadhar must be 12 digits';
    if (!validatePAN(formData.panNumber)) newErrors.panNumber = 'Invalid PAN format';
    if (!formData.accountHolderName) newErrors.accountHolderName = 'Account holder name is required';
    if (!formData.bankName) newErrors.bankName = 'Bank name is required';
    if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!formData.accountType) newErrors.accountType = 'Account type is required';
    if (!formData.securityDepositAmount && formData.securityDepositAmount !== 0) newErrors.securityDepositAmount = 'Security deposit amount is required';
    if (!formData.taxRegime) newErrors.taxRegime = 'Tax regime is required';
    if (!formData.status) newErrors.status = 'Status is required';

    if (formData.status === 'Left') {
      if (!formData.lastWorkingDate) newErrors.lastWorkingDate = 'Last working date is required';
      if (!formData.reasonForLeaving) newErrors.reasonForLeaving = 'Reason for leaving is required';
      if (!formData.reasonType) newErrors.reasonType = 'Reason type is required';
      if (!formData.pfCode) newErrors.pfCode = 'PF code is required';
      if (!formData.esiCode) newErrors.esiCode = 'ESI code is required';
    }

    formData.nominationDetails.forEach((nominee, index) => {
      if (nominee.nomineeName && !nominee.nomineeRelation) newErrors[`nominationDetails[${index}][nomineeRelation]`] = 'Relation is required';
      if (nominee.nomineeName && !validateAadhar(nominee.nomineeAadharNumber)) newErrors[`nominationDetails[${index}][nomineeAadharNumber]`] = 'Aadhar must be 12 digits';
      if (nominee.nomineeName && !nominee.nomineeShearPercentage) newErrors[`nominationDetails[${index}][nomineeShearPercentage]`] = 'Share percentage is required';
    });
    if (formData.nominationDetails.some((nominee) => nominee.nomineeName) && !validateNomineeShares()) {
      newErrors.nomineeShearPercentage = 'Nominee shares must sum to 100%';
    }

    formData.experienceDetails.forEach((exp, index) => {
      if (exp.previousSchoolName) {
        if (!exp.previousSchoolAddress) newErrors[`experienceDetails[${index}][previousSchoolAddress]`] = 'Address is required';
        if (!exp.previousSchoolJoiningDate) newErrors[`experienceDetails[${index}][previousSchoolJoiningDate]`] = 'Joining date is required';
        if (!exp.previousSchoolLastDate) newErrors[`experienceDetails[${index}][previousSchoolLastDate]`] = 'Last date is required';
        if (exp.previousSchoolJoiningDate && exp.previousSchoolLastDate && new Date(exp.previousSchoolJoiningDate) >= new Date(exp.previousSchoolLastDate)) {
          newErrors[`experienceDetails[${index}][previousSchoolLastDate]`] = 'End date must be after start date';
        }
        if (!exp.previousJobDesignation) newErrors[`experienceDetails[${index}][previousJobDesignation]`] = 'Job designation is required';
        if (!exp.numberOfExperience) newErrors[`experienceDetails[${index}][numberOfExperience]`] = 'Years of experience is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      toast.error('Please fix all validation errors before submitting');
      setIsLoading(false);
      return;
    }

    try {
      const submissionData = new FormData();
      submissionData.append('schoolId', schoolId);
      submissionData.append('employeeId', employeeId);
      submissionData.append('academicYear', academicYear);

      const fields = [
        'employeeName', 'emailId', 'contactNumber', 'dateOfBirth', 'gender', 'categoryOfEmployees',
        'grade', 'jobDesignation', 'joiningDate', 'fatherName', 'spouseName', 'currentAddress',
        'emergencyContactNumber', 'nationality', 'religion', 'maritalStatus', 'higherQualification',
        'physicalHandicap', 'aadharPassportNumber', 'panNumber', 'uanNumber', 'esicNumber',
        'accountHolderName', 'bankName', 'ifscCode', 'accountNumber', 'accountType',
        'securityDepositAmount', 'taxRegime', 'status', 'lastWorkingDate', 'reasonForLeaving',
        'reasonType', 'pfCode', 'esiCode', 'voluntaryPFContribution',
      ];

      fields.forEach((field) => {
        if (formData[field] !== null && formData[field] !== undefined) {
          submissionData.append(field, formData[field]);
        }
      });

      const fileFields = [
        'aadharPassportFile', 'panFile', 'class12Certificate', 'degreeCertificate',
        'resume', 'experienceLetter', 'relievingLetter',
      ];

      fileFields.forEach((field) => {
        if (formData[field] instanceof File) {
          submissionData.append(field, formData[field]);
        }
      });

      formData.nominationDetails.forEach((nominee, index) => {
        if (nominee.nomineeName) {
          Object.keys(nominee).forEach((key) => {
            if (key !== 'nomineeAadharCardOrPassportFile' && nominee[key]) {
              submissionData.append(`nominationDetails[${index}][${key}]`, nominee[key]);
            }
          });
          if (nominee.nomineeAadharCardOrPassportFile instanceof File) {
            submissionData.append(
              `nominationDetails[${index}][nomineeAadharCardOrPassportFile]`,
              nominee.nomineeAadharCardOrPassportFile
            );
          }
        }
      });

      formData.experienceDetails.forEach((exp, index) => {
        if (exp.previousSchoolName) {
          Object.keys(exp).forEach((key) => {
            if (exp[key]) {
              submissionData.append(`experienceDetails[${index}][${key}]`, exp[key]);
            }
          });
        }
      });

      const response = await putAPI(
        `/update-employee-details/${schoolId}/${employeeId}?academicYear=${academicYear}`,
        submissionData,
        { 'Content-Type': 'multipart/form-data' },
        true
      );

      if (!response.hasError) {
        toast.success('Employee details updated successfully');
        setShowForm(false);
        setEmployeeId('');
        setFormData((prev) => ({
          ...prev,
          ...Object.fromEntries(fields.map((field) => [field, ''])),
          nominationDetails: [{ nomineeName: '', nomineeRelation: '', nomineeAadharNumber: '', nomineeAadharCardOrPassportFile: null, nomineeShearPercentage: '' }],
          experienceDetails: [{ previousSchoolName: '', previousSchoolAddress: '', previousSchoolJoiningDate: '', previousSchoolLastDate: '', previousJobDesignation: '', numberOfExperience: '' }],
        }));
        setNominees([{ id: 1 }]);
        setExperiences([{ id: 1 }]);
      } else {
        toast.error(response.message || 'Failed to update employee details');
        if (response.data?.errors) {
          setErrors(response.data.errors);
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to update employee details');
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
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
                  <h4 className="payroll-title text-center">Employee Details</h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="employeeID" className="form-label">
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeID"
                        name="employeeID"
                        className="form-control"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                        placeholder="Enter Employee ID"
                        disabled={showForm}
                        readOnly={showForm}
                      />
                    </div>
                  </div>
                  <div className={`mt-4 col-md-2 ${showForm ? 'd-none' : ''}`} style={{ alignContent: 'center', textAlign: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleProceed}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Loading...
                        </>
                      ) : 'Proceed'}
                    </button>
                  </div>
                </div>

                {showForm && (
                  <>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="employeeName" className="form-label">
                            Name of Employee <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="employeeName"
                            name="employeeName"
                            className={`form-control ${errors.employeeName ? 'is-invalid' : ''}`}
                            value={formData.employeeName}
                            // onChange={handleChange}
                            // required

                            placeholder="Enter Employee Name"
                          />
                          {errors.employeeName && <div className="invalid-feedback">{errors.employeeName}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="joiningDate" className="form-label">
                            Joining Date <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            id="joiningDate"
                            name="joiningDate"
                            className={`form-control ${errors.joiningDate ? 'is-invalid' : ''}`}
                            value={formData.joiningDate}
                          // onChange={handleChange}
                          // required
                          />
                          {errors.joiningDate && <div className="invalid-feedback">{errors.joiningDate}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="categoryOfEmployees" className="form-label">
                            Category of Employees <span className="text-danger">*</span>
                          </label>
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
                          {errors.categoryOfEmployees && <div className="invalid-feedback d-block">{errors.categoryOfEmployees}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="grade" className="form-label">
                            Grade <span className="text-danger">*</span>
                          </label>
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
                          {errors.grade && <div className="invalid-feedback d-block">{errors.grade}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="jobDesignation" className="form-label">
                            Job Designation <span className="text-danger">*</span>
                          </label>
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
                          {errors.jobDesignation && <div className="invalid-feedback d-block">{errors.jobDesignation}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="dateOfBirth" className="form-label">
                            Date of Birth <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                            value={formData.dateOfBirth}
                            // onChange={handleChange}
                            required
                          />
                          {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="fatherName" className="form-label">
                            Father Name
                          </label>
                          <input
                            type="text"
                            id="fatherName"
                            name="fatherName"
                            className={`form-control ${errors.fatherName ? 'is-invalid' : ''}`}
                            value={formData.fatherName}
                            // onChange={handleChange}
                            placeholder="Enter Father Name"
                          />
                          {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="spouseName" className="form-label">
                            Spouse Name
                          </label>
                          <input
                            type="text"
                            id="spouseName"
                            name="spouseName"
                            className={`form-control ${errors.spouseName ? 'is-invalid' : ''}`}
                            value={formData.spouseName}
                            // onChange={handleChange}
                            placeholder="Enter Spouse Name"
                          />
                          {errors.spouseName && <div className="invalid-feedback">{errors.spouseName}</div>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="currentAddress" className="form-label">
                            Current Address <span className="text-danger">*</span>
                          </label>
                          <textarea
                            className={`form-control ${errors.currentAddress ? 'is-invalid' : ''}`}
                            id="currentAddress"
                            name="currentAddress"
                            rows={3}
                            value={formData.currentAddress}
                          // onChange={handleChange}
                          // required
                          />
                          {errors.currentAddress && <div className="invalid-feedback">{errors.currentAddress}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="contactNumber" className="form-label">
                            Contact Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                            value={formData.contactNumber}
                            // onChange={handleChange}
                            placeholder="Enter 10-digit number"
                          // required
                          />
                          {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="emergencyContactNumber" className="form-label">
                            Emergency Contact Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="tel"
                            id="emergencyContactNumber"
                            name="emergencyContactNumber"
                            className={`form-control ${errors.emergencyContactNumber ? 'is-invalid' : ''}`}
                            value={formData.emergencyContactNumber}
                            // onChange={handleChange}
                            placeholder="Enter 10-digit number"
                          // required
                          />
                          {errors.emergencyContactNumber && <div className="invalid-feedback">{errors.emergencyContactNumber}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="emailId" className="form-label">
                            Email ID <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            id="emailId"
                            name="emailId"
                            className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                            value={formData.emailId}
                            // onChange={handleChange}
                            placeholder="example@gmail.com"
                          // required
                          />
                          {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="nationality" className="form-label">
                            Nationality <span className="text-danger">*</span>
                          </label>
                          <select
                            id="nationality"
                            name="nationality"
                            className={`form-control ${errors.nationality ? 'is-invalid' : ''}`}
                            value={formData.nationality}
                          // onChange={handleChange}
                          // required
                          >
                            <option value="">Select Nationality</option>
                            <option value="Indian">Indian</option>
                            <option value="Nepalese">Nepalese</option>
                            <option value="Bhutanese">Bhutanese</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="religion" className="form-label">
                            Religion <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="religion"
                            name="religion"
                            className={`form-control ${errors.religion ? 'is-invalid' : ''}`}
                            value={formData.religion}
                            // onChange={handleChange}
                            // required
                            placeholder="Enter Religion"
                          />
                          {errors.religion && <div className="invalid-feedback">{errors.religion}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="gender" className="form-label">
                            Gender <span className="text-danger">*</span>
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                            value={formData.gender}
                          // onChange={handleChange}
                          // required
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                          </select>
                          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="maritalStatus" className="form-label">
                            Marital Status <span className="text-danger">*</span>
                          </label>
                          {/* <select
                            id="maritalStatus"
                            name="maritalStatus"
                            className={`form-control ${errors.maritalStatus ? 'is-invalid' : ''}`}
                            value={formData.maritalStatus}
                            // onChange={handleChange}
                            // required
                          >
                            <option value="">Select Status</option>
                            <option value="Married">Married</option>
                            <option value="Un-Married">Un-Married</option>
                            <option value="Widower">Widower</option>
                            <option value="Divorcee">Divorcee</option>
                          </select> */}
                          <input
                            type="text"
                            id="maritalStatus"
                            name="maritalStatus"
                            className={`form-control ${errors.maritalStatus ? 'is-invalid' : ''}`}
                            value={formData.maritalStatus}
                          // onChange={handleChange}
                          // required

                          />
                          {errors.maritalStatus && <div className="invalid-feedback">{errors.maritalStatus}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="higherQualification" className="form-label">
                            Higher Qualification <span className="text-danger">*</span>
                          </label>
                          {/* <select
                            id="higherQualification"
                            name="higherQualification"
                            className={`form-control ${errors.higherQualification ? 'is-invalid' : ''}`}
                            value={formData.higherQualification}
                            // onChange={handleChange}
                            // required
                          >
                            <option value="">Select Qualification</option>
                            <option value="Below Class 12">Below Class 12</option>
                            <option value="Upto Class 12">Upto Class 12</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Post Graduate">Post Graduate</option>
                          </select> */}
                          <input
                            type="text"
                            id="higherQualification"
                            name="higherQualification"
                            className={`form-control ${errors.higherQualification ? 'is-invalid' : ''}`}
                            value={formData.higherQualification}
                          // onChange={handleChange}
                          // required

                          />
                          {errors.higherQualification && <div className="invalid-feedback">{errors.higherQualification}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="physicalHandicap" className="form-label">
                            Physical Handicap <span className="text-danger">*</span>
                          </label>
                          {/* <select
                            id="physicalHandicap"
                            name="physicalHandicap"
                            className={`form-control ${errors.physicalHandicap ? 'is-invalid' : ''}`}
                            value={formData.physicalHandicap}
                            // onChange={handleChange}
                            // required
                          >
                            <option value="">Select Status</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select> */}
                          <input
                            type="text"
                            id="physicalHandicap"
                            name="physicalHandicap"
                            className={`form-control ${errors.physicalHandicap ? 'is-invalid' : ''}`}
                            value={formData.physicalHandicap}
                          // onChange={handleChange}
                          // required
                          // placeholder="Enter 12-digit Aadhar Number"
                          />
                          {errors.physicalHandicap && <div className="invalid-feedback">{errors.physicalHandicap}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="aadharPassportNumber" className="form-label">
                            Aadhar Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="aadharPassportNumber"
                            name="aadharPassportNumber"
                            className={`form-control ${errors.aadharPassportNumber ? 'is-invalid' : ''}`}
                            value={formData.aadharPassportNumber}
                            // onChange={handleChange}
                            // required
                            placeholder="Enter 12-digit Aadhar Number"
                          />
                          {errors.aadharPassportNumber && <div className="invalid-feedback">{errors.aadharPassportNumber}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="aadharPassportFile" className="form-label">
                            Aadhar Upload
                          </label>
                          {formData.aadharPassportFile && typeof formData.aadharPassportFile === 'string' && (
                            <small className="ms-2">Current: {formData.aadharPassportFile.split('/').pop()}</small>
                          )}
                          <input
                            type="file"
                            id="aadharPassportFile"
                            name="aadharPassportFile"
                            className={`form-control ${errors.aadharPassportFile ? 'is-invalid' : ''}`}
                            accept=".jpg,.jpeg,.png,.pdf"
                          // onChange={(e) => handleFileChange(e)}
                          />
                          {errors.aadharPassportFile && <div className="invalid-feedback">{errors.aadharPassportFile}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="panNumber" className="form-label">
                            PAN Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="panNumber"
                            name="panNumber"
                            className={`form-control ${errors.panNumber ? 'is-invalid' : ''}`}
                            value={formData.panNumber}
                            // onChange={handleChange}
                            // required
                            placeholder="Enter PAN Number"
                          />
                          {errors.panNumber && <div className="invalid-feedback">{errors.panNumber}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="panFile" className="form-label">
                            PAN Upload
                          </label>
                          {formData.panFile && typeof formData.panFile === 'string' && (
                            <small className="ms-2">Current: {formData.panFile.split('/').pop()}</small>
                          )}
                          <input
                            type="file"
                            id="panFile"
                            name="panFile"
                            className={`form-control ${errors.panFile ? 'is-invalid' : ''}`}
                            accept=".jpg,.jpeg,.png,.pdf"
                          // onChange={(e) => handleFileChange(e)}
                          />
                          {errors.panFile && <div className="invalid-feedback">{errors.panFile}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="uanNumber" className="form-label">
                            UAN Number
                          </label>
                          <input
                            type="text"
                            id="uanNumber"
                            name="uanNumber"
                            className={`form-control ${errors.uanNumber ? 'is-invalid' : ''}`}
                            value={formData.uanNumber}
                            // onChange={handleChange}
                            placeholder="Enter UAN Number"
                          />
                          {errors.uanNumber && <div className="invalid-feedback">{errors.uanNumber}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="esicNumber" className="form-label">
                            ESIC Number
                          </label>
                          <input
                            type="text"
                            id="esicNumber"
                            name="esicNumber"
                            className={`form-control ${errors.esicNumber ? 'is-invalid' : ''}`}
                            value={formData.esicNumber}
                            // onChange={handleChange}
                            placeholder="Enter ESIC Number"
                          />
                          {errors.esicNumber && <div className="invalid-feedback">{errors.esicNumber}</div>}
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">Bank Account Information</h4>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="accountHolderName" className="form-label">
                            Account Holder Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="accountHolderName"
                            name="accountHolderName"
                            className={`form-control ${errors.accountHolderName ? 'is-invalid' : ''}`}
                            value={formData.accountHolderName}
                            // onChange={handleChange}
                            // required
                            placeholder="Enter Account Holder Name"
                          />
                          {errors.accountHolderName && <div className="invalid-feedback">{errors.accountHolderName}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="bankName" className="form-label">
                            Bank Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="bankName"
                            name="bankName"
                            className={`form-control ${errors.bankName ? 'is-invalid' : ''}`}
                            value={formData.bankName}
                            // onChange={handleChange}
                            // required
                            placeholder="Enter Bank Name"
                          />
                          {errors.bankName && <div className="invalid-feedback">{errors.bankName}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="ifscCode" className="form-label">
                            IFSC Code <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="ifscCode"
                            name="ifscCode"
                            className={`form-control ${errors.ifscCode ? 'is-invalid' : ''}`}
                            value={formData.ifscCode}
                            // onChange={handleChange}
                            // required
                            placeholder="Enter IFSC Code"
                          />
                          {errors.ifscCode && <div className="invalid-feedback">{errors.ifscCode}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="accountNumber" className="form-label">
                            Account Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="accountNumber"
                            name="accountNumber"
                            className={`form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
                            value={formData.accountNumber}
                            // onChange={handleChange}
                            // required
                            placeholder="Enter Account Number"
                          />
                          {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="accountType" className="form-label">
                            Account Type <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="accountType"
                            name="accountType"
                            className={`form-control ${errors.accountType ? 'is-invalid' : ''}`}
                            value={formData.accountType}
                          // onChange={handleChange}
                          // required
                          // placeholder="Enter Account Number"
                          />
                          {/* <select
                            id="accountType"
                            name="accountType"
                            className={`form-control ${errors.accountType ? 'is-invalid' : ''}`}
                            value={formData.accountType}
                            readOnly
                            // onChange={handleChange}
                            // required
                          >
                            <option value="">Select Account Type</option>
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                            <option value="Salary">Salary</option>
                          </select> */}
                          {errors.accountType && <div className="invalid-feedback">{errors.accountType}</div>}
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">Document Upload</h4>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="class12Certificate" className="form-label">Class 12 Certificate</label>
                          {formData.class12Certificate && typeof formData.class12Certificate === 'string' && (
                            <small className="ms-2">Current: {formData.class12Certificate.split('/').pop()}</small>
                          )}
                          <input
                            type="file"
                            id="class12Certificate"
                            name="class12Certificate"
                            className={`form-control ${errors.class12Certificate ? 'is-invalid' : ''}`}
                            accept=".jpg,.jpeg,.png,.pdf"
                          // onChange={(e) => handleFileChange(e)}
                          />
                          {errors.class12Certificate && <div className="invalid-feedback">{errors.class12Certificate}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="degreeCertificate" className="form-label">Degree Certificate</label>
                          {formData.degreeCertificate && typeof formData.degreeCertificate === 'string' && (
                            <small className="ms-2">Current: {formData.degreeCertificate.split('/').pop()}</small>
                          )}
                          <input
                            type="file"
                            id="degreeCertificate"
                            name="degreeCertificate"
                            className={`form-control ${errors.degreeCertificate ? 'is-invalid' : ''}`}
                            accept=".jpg,.jpeg,.png,.pdf"
                          // onChange={(e) => handleFileChange(e)}
                          />
                          {errors.degreeCertificate && <div className="invalid-feedback">{errors.degreeCertificate}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="resume" className="form-label">Resume</label>
                          {formData.resume && typeof formData.resume === 'string' && (
                            <small className="ms-2">Current: {formData.resume.split('/').pop()}</small>
                          )}
                          <input
                            type="file"
                            id="resume"
                            name="resume"
                            className={`form-control ${errors.resume ? 'is-invalid' : ''}`}
                            accept=".jpg,.jpeg,.png,.pdf"
                          // onChange={(e) => handleFileChange(e)}
                          />
                          {errors.resume && <div className="invalid-feedback">{errors.resume}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="experienceLetter" className="form-label">Experience Letter</label>
                          {formData.experienceLetter && typeof formData.experienceLetter === 'string' && (
                            <small className="ms-2">Current: {formData.experienceLetter.split('/').pop()}</small>
                          )}
                          <input
                            type="file"
                            id="experienceLetter"
                            name="experienceLetter"
                            className={`form-control ${errors.experienceLetter ? 'is-invalid' : ''}`}
                            accept=".jpg,.jpeg,.png,.pdf"
                          // onChange={(e) => handleFileChange(e)}
                          />
                          {errors.experienceLetter && <div className="invalid-feedback">{errors.experienceLetter}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="relievingLetter" className="form-label">Relieving Letter</label>
                          {formData.relievingLetter && typeof formData.relievingLetter === 'string' && (
                            <small className="ms-2">Current: {formData.relievingLetter.split('/').pop()}</small>
                          )}
                          <input
                            type="file"
                            id="relievingLetter"
                            name="relievingLetter"
                            className={`form-control ${errors.relievingLetter ? 'is-invalid' : ''}`}
                            accept=".jpg,.jpeg,.png,.pdf"
                          // onChange={(e) => handleFileChange(e)}
                          />
                          {errors.relievingLetter && <div className="invalid-feedback">{errors.relievingLetter}</div>}
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">Nomination For Gratuity & Others</h4>
                      {/* <button
                        type="button"
                        className="btn btn-primary custom-submit-button"
                        onClick={addNominee}
                      >
                        Add Nominee
                      </button> */}
                    </div>
                    {nominees.map((nominee, index) => (
                      <div key={nominee.id} className="row">
                        <div className="d-flex justify-content-between" style={{ padding: '0' }}>
                          <div className="card-header mt-0" style={{ padding: '0.50rem', borderBottom: 'none' }}>
                            <h4 className="card-title text-center">Nominee {index + 1}</h4>
                          </div>
                          {/* {nominee.id !== 1 && (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => removeNominee(nominee.id)}
                            >
                              Remove
                            </button>
                          )} */}
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor={`nomineeName-${nominee.id}`} className="form-label">
                              Nominee Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id={`nomineeName-${nominee.id}`}
                              name="nomineeName"
                              className={`form-control ${errors[`nominationDetails[${index}][nomineeName]`] ? 'is-invalid' : ''}`}
                              value={formData.nominationDetails[index]?.nomineeName || ''}
                              //   onChange={(e) => handleChange(e, 'nominationDetails', index)}
                              placeholder="Enter Nominee Name"
                            />
                            {errors[`nominationDetails[${index}][nomineeName]`] && (
                              <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeName]`]}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor={`nomineeRelation-${nominee.id}`} className="form-label">
                              Relation <span className="text-danger">*</span>
                            </label>
                            <select
                              id={`nomineeRelation-${nominee.id}`}
                              name="nomineeRelation"
                              className={`form-control ${errors[`nominationDetails[${index}][nomineeRelation]`] ? 'is-invalid' : ''}`}
                              value={formData.nominationDetails[index]?.nomineeRelation || ''}
                            //   onChange={(e) => handleChange(e, 'nominationDetails', index)}
                            >
                              <option value="">Select Relation</option>
                              <option value="Spouse">Spouse</option>
                              <option value="Child">Child</option>
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Sibling">Sibling</option>
                              <option value="Other">Other</option>
                            </select>
                            {errors[`nominationDetails[${index}][nomineeRelation]`] && (
                              <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeRelation]`]}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor={`nomineeAadharNumber-${nominee.id}`} className="form-label">
                              Aadhar Number <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id={`nomineeAadharNumber-${nominee.id}`}
                              name="nomineeAadharNumber"
                              className={`form-control ${errors[`nominationDetails[${index}][nomineeAadharNumber]`] ? 'is-invalid' : ''}`}
                              value={formData.nominationDetails[index]?.nomineeAadharNumber || ''}
                              //   onChange={(e) => handleChange(e, 'nominationDetails', index)}
                              placeholder="Enter Nominee Aadhar Number"
                            />
                            {errors[`nominationDetails[${index}][nomineeAadharNumber]`] && (
                              <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeAadharNumber]`]}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor={`nomineeAadharCardOrPassportFile-${nominee.id}`} className="form-label">
                              Aadhar Card/Passport Upload
                            </label>
                            {formData.nominationDetails[index]?.nomineeAadharCardOrPassportFile &&
                              typeof formData.nominationDetails[index].nomineeAadharCardOrPassportFile === 'string' && (
                                <small className="ms-2">
                                  Current: {formData.nominationDetails[index].nomineeAadharCardOrPassportFile.split('/').pop()}
                                </small>
                              )}
                            <input
                              type="file"
                              id={`nomineeAadharCardOrPassportFile-${nominee.id}`}
                              name="nomineeAadharCardOrPassportFile"
                              className={`form-control ${errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`] ? 'is-invalid' : ''}`}
                              accept=".jpg,.jpeg,.png,.pdf"
                            //   onChange={(e) => handleFileChange(e, 'nominationDetails', index)}
                            />
                            {errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`] && (
                              <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`]}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor={`nomineeShearPercentage-${nominee.id}`} className="form-label">
                              Share Percentage (%) <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              id={`nomineeShearPercentage-${nominee.id}`}
                              name="nomineeShearPercentage"
                              className={`form-control ${errors.nomineeShearPercentage || errors[`nominationDetails[${index}][nomineeShearPercentage]`] ? 'is-invalid' : ''}`}
                              value={formData.nominationDetails[index]?.nomineeShearPercentage || ''}
                              //   onChange={(e) => handleChange(e, 'nominationDetails', index)}
                              placeholder="Enter Nominee Share Percentage"
                              min="0"
                              max="100"
                            />
                            {errors.nomineeShearPercentage && <div className="invalid-feedback">{errors.nomineeShearPercentage}</div>}
                            {errors[`nominationDetails[${index}][nomineeShearPercentage]`] && (
                              <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeShearPercentage]`]}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">Previous Employment</h4>
                      {/* <button
                        type="button"
                        className="btn btn-primary custom-submit-button"
                        onClick={addExperience}
                      >
                        Add Employment
                      </button> */}
                    </div>
                    {experiences.map((exp, index) => (
                      <div key={exp.id} className="row">
                        <div className="d-flex justify-content-between" style={{ padding: '0' }}>
                          <div className="card-header mt-0" style={{ padding: '0.50rem', borderBottom: 'none' }}>
                            <h4 className="card-title text-center">Experience {index + 1}</h4>
                          </div>
                          {/* {exp.id !== 1 && (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => removeExperience(exp.id)}
                            >
                              Remove
                            </button>
                          )} */}
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor={`previousSchoolName-${exp.id}`} className="form-label">
                              Name of School/Others <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id={`previousSchoolName-${exp.id}`}
                              name="previousSchoolName"
                              className={`form-control ${errors[`experienceDetails[${index}][previousSchoolName]`] ? 'is-invalid' : ''}`}
                              value={formData.experienceDetails[index]?.previousSchoolName || ''}
                              //   onChange={(e) => handleChange(e, 'experienceDetails', index)}
                              placeholder="Enter Previous School Name"
                            />
                            {errors[`experienceDetails[${index}][previousSchoolName]`] && (
                              <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolName]`]}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor={`previousSchoolAddress-${exp.id}`} className="form-label">
                              Address <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id={`previousSchoolAddress-${exp.id}`}
                              name="previousSchoolAddress"
                              className={`form-control ${errors[`experienceDetails[${index}][previousSchoolAddress]`] ? 'is-invalid' : ''}`}
                              value={formData.experienceDetails[index]?.previousSchoolAddress || ''}
                              //   onChange={(e) => handleChange(e, 'experienceDetails', index)}
                              placeholder="Enter Previous School Address"
                            />
                            {errors[`experienceDetails[${index}][previousSchoolAddress]`] && (
                              <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolAddress]`]}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor={`previousSchoolJoiningDate-${exp.id}`} className="form-label">
                              From <span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              id={`previousSchoolJoiningDate-${exp.id}`}
                              name="previousSchoolJoiningDate"
                              className={`form-control ${errors[`experienceDetails[${index}][previousSchoolJoiningDate]`] ? 'is-invalid' : ''}`}
                              value={formData.experienceDetails[index]?.previousSchoolJoiningDate || ''}
                            //   onChange={(e) => handleChange(e, 'experienceDetails', index)}
                            />
                            {errors[`experienceDetails[${index}][previousSchoolJoiningDate]`] && (
                              <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolJoiningDate]`]}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor={`previousSchoolLastDate-${exp.id}`} className="form-label">
                              To <span className="text-danger">*</span>
                            </label>
                            <input
                              type="date"
                              id={`previousSchoolLastDate-${exp.id}`}
                              name="previousSchoolLastDate"
                              className={`form-control ${errors[`experienceDetails[${index}][previousSchoolLastDate]`] ? 'is-invalid' : ''}`}
                              value={formData.experienceDetails[index]?.previousSchoolLastDate || ''}
                            //   onChange={(e) => handleChange(e, 'experienceDetails', index)}
                            />
                            {errors[`experienceDetails[${index}][previousSchoolLastDate]`] && (
                              <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolLastDate]`]}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor={`previousJobDesignation-${exp.id}`} className="form-label">
                              Job Designation <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id={`previousJobDesignation-${exp.id}`}
                              name="previousJobDesignation"
                              className={`form-control ${errors[`experienceDetails[${index}][previousJobDesignation]`] ? 'is-invalid' : ''}`}
                              value={formData.experienceDetails[index]?.previousJobDesignation || ''}
                              //   onChange={(e) => handleChange(e, 'experienceDetails', index)}
                              placeholder="Enter Previous Job Designation"
                            />
                            {errors[`experienceDetails[${index}][previousJobDesignation]`] && (
                              <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousJobDesignation]`]}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor={`numberOfExperience-${exp.id}`} className="form-label">
                              Years of Experience <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id={`numberOfExperience-${exp.id}`}
                              name="numberOfExperience"
                              className={`form-control ${errors[`experienceDetails[${index}][numberOfExperience]`] ? 'is-invalid' : ''}`}
                              value={formData.experienceDetails[index]?.numberOfExperience || ''}
                              //   onChange={(e) => handleChange(e, 'experienceDetails', index)}
                              placeholder="Enter Years of Experience"
                            />
                            {errors[`experienceDetails[${index}][numberOfExperience]`] && (
                              <div className="invalid-feedback">{errors[`experienceDetails[${index}][numberOfExperience]`]}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">Others</h4>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="securityDepositAmount" className="form-label">
                            Security Deposit Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            id="securityDepositAmount"
                            name="securityDepositAmount"
                            className={`form-control ${errors.securityDepositAmount ? 'is-invalid' : ''}`}
                            value={formData.securityDepositAmount}
                            onChange={handleChange}
                            required
                            placeholder="Enter Amount"
                            min="0"
                          />
                          {errors.securityDepositAmount && <div className="invalid-feedback">{errors.securityDepositAmount}</div>}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="taxRegime" className="form-label">
                            Tax Regime <span className="text-danger">*</span>
                          </label>
                          <select
                            id="taxRegime"
                            name="taxRegime"
                            className={`form-control ${errors.taxRegime ? 'is-invalid' : ''}`}
                            value={formData.taxRegime}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Tax Regime</option>
                            <option value="old">Old</option>
                            <option value="new">New</option>
                          </select>
                          {errors.taxRegime && <div className="invalid-feedback">{errors.taxRegime}</div>}
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">Status</h4>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="status" className="form-label">
                            Status <span className="text-danger">*</span>
                          </label>
                          <select
                            id="status"
                            name="status"
                            className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                            value={formData.status}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Status</option>
                            <option value="On Payroll">On Payroll</option>
                            <option value="Left">Left</option>
                          </select>
                          {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                        </div>
                      </div>
                      {formData.status === 'Left' && (
                        <>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label htmlFor="lastWorkingDate" className="form-label">
                                Last Working Date <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                id="lastWorkingDate"
                                name="lastWorkingDate"
                                className={`form-control ${errors.lastWorkingDate ? 'is-invalid' : ''}`}
                                value={formData.lastWorkingDate}
                                onChange={handleChange}
                                required
                              />
                              {errors.lastWorkingDate && <div className="invalid-feedback">{errors.lastWorkingDate}</div>}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label htmlFor="reasonForLeaving" className="form-label">
                                Reason for Leaving <span className="text-danger">*</span>
                              </label>
                              <Select
                                id="reasonForLeaving"
                                isClearable
                                placeholder="Select reason"
                                options={reasonOptions}
                                onChange={handleReasonChange}
                                value={
                                  formData.reasonForLeaving
                                    ? { label: formData.reasonForLeaving, value: formData.reasonForLeaving }
                                    : null
                                }
                              />
                              {errors.reasonForLeaving && <div className="invalid-feedback d-block">{errors.reasonForLeaving}</div>}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label htmlFor="reasonType" className="form-label">
                                Reason Type <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="reasonType"
                                name="reasonType"
                                className={`form-control ${errors.reasonType ? 'is-invalid' : ''}`}
                                value={formData.reasonType}
                                readOnly
                                required
                              />
                              {errors.reasonType && <div className="invalid-feedback">{errors.reasonType}</div>}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label htmlFor="pfCode" className="form-label">
                                PF Code <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="pfCode"
                                name="pfCode"
                                className={`form-control ${errors.pfCode ? 'is-invalid' : ''}`}
                                value={formData.pfCode}
                                readOnly
                                required
                              />
                              {errors.pfCode && <div className="invalid-feedback">{errors.pfCode}</div>}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="mb-3">
                              <label htmlFor="esiCode" className="form-label">
                                ESI Code <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                id="esiCode"
                                name="esiCode"
                                className={`form-control ${errors.esiCode ? 'is-invalid' : ''}`}
                                value={formData.esiCode}
                                readOnly
                                required
                              />
                              {errors.esiCode && <div className="invalid-feedback">{errors.esiCode}</div>}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Updating...
                          </>
                        ) : 'Update'}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmploerUpdateEmployeeDetails;