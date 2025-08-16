// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MdOutlineAutorenew } from "react-icons/md";
// import { toast } from 'react-toastify';
// import postAPI from '../../../../../api/postAPI';

// const EmployeeRentDetails = () => {
//   const months = [
//     'April', 'May', 'June', 'July', 'August', 'September',
//     'October', 'November', 'December', 'January', 'February', 'March'
//   ];
 
//   const navigate = useNavigate();
//   const [rentData, setRentData] = useState(
//     months.reduce((acc, month) => {
//       acc[month] = {
//         rent: '',
//         city: '',
//         landlordName: '',
//         landlordPan: '',
//         landlordAddress: '',
//         receipt: null
//       };
//       return acc;
//     }, {})
//   );
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Check userDetails on component mount
//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId || !userDetails?.userId) {
//       toast.error('Please log in to submit rent details');
//       navigate('/login'); 
//     }
//   }, [navigate]);

//   const handleChange = (month, field, value) => {
//     setRentData(prev => ({
//       ...prev,
//       [month]: {
//         ...prev[month],
//         [field]: value
//       }
//     }));
//   };

//   const handleFileChange = (month, file) => {
//     setRentData(prev => ({
//       ...prev,
//       [month]: {
//         ...prev[month],
//         receipt: file
//       }
//     }));
//   };

//   const validateForm = () => {
//     for (const month of months) {
//       const data = rentData[month];
//       const rentValue = parseFloat(data.rent.replace(/,/g, '')) || 0;
//       if (rentValue > 0) {
//         if (!data.city || !['Metro', 'Non-Metro'].includes(data.city)) {
//           toast.error(`Please select a valid city (Metro or Non-Metro) for ${month}`);
//           return false;
//         }
//         if (!data.landlordName) {
//           toast.error(`Please enter landlord name for ${month}`);
//           return false;
//         }
//         if (!data.landlordPan) {
//           toast.error(`Please enter landlord PAN for ${month}`);
//           return false;
//         }
//         if (!data.landlordAddress) {
//           toast.error(`Please enter landlord address for ${month}`);
//           return false;
//         }
//         if (!data.receipt) {
//           toast.error(`Please upload rent receipt for ${month}`);
//           return false;
//         }
//       }
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//       const schoolId = userDetails?.schoolId;
//       const employeeId = userDetails?.userId;
//       const academicYear = '2025-26';

//       if (!schoolId || !employeeId) {
//         toast.error('Authentication details missing');
//         navigate('/login'); // Adjust to your login route
//         setIsSubmitting(false);
//         return;
//       }

//       const formData = new FormData();
//       formData.append('schoolId', schoolId);
//       formData.append('employeeId', employeeId);
//       formData.append('academicYear', academicYear);

//       let hasValidData = false;
//       months.forEach((month, index) => {
//         const data = rentData[month];
//         const rentValue = parseFloat(data.rent.replace(/,/g, '')) || 0;
//         if (rentValue > 0) {
//           hasValidData = true;
//           formData.append(`rentDetails[${index}][month]`, month);
//           formData.append(`rentDetails[${index}][declaredRent]`, rentValue);
//           formData.append(`rentDetails[${index}][cityType]`, data.city);
//           formData.append(`rentDetails[${index}][landlordName]`, data.landlordName);
//           formData.append(`rentDetails[${index}][landlordPanNumber]`, data.landlordPan);
//           formData.append(`rentDetails[${index}][landlordAddress]`, data.landlordAddress);
//           if (data.receipt) {
//             formData.append(`rentReceipts[${index}]`, data.receipt);
//           }
//         }
//       });

//       if (!hasValidData) {
//         toast.error('Please provide rent details for at least one month');
//         setIsSubmitting(false);
//         return;
//       }

//       const response = await postAPI(
//         `/rent-details/${schoolId}/${employeeId}`,
//         formData,
//         { 'Content-Type': 'multipart/form-data' },
//         true
//       );

//       if (!response.hasError) {
//         toast.success("Rent details submitted successfully!");

//       } else {
//         toast.error(response.message || "Failed to submit rent details");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error("An error occurred while submitting rent details");
//     } finally {
//       setIsSubmitting(false);
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
//                   <h4 className="card-title flex-grow-1 text-center">House Rent Details</h4>
//                   <button
//                     type="button"
//                     className="btn btn-primary ms-2 custom-submit-button"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="table-responsive mb-2">
//                   <table className="table text-dark border border-dark mb-4">
//                     <thead>
//                       <tr className="payroll-table-header">
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2">Month</th>
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2">Declared Rent</th>
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ minWidth: "9rem" }}>City</th>
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2">Name of Landlord</th>
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2">PAN of Landlord</th>
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2">Address of Landlord</th>
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2">Upload Rent Receipt</th>
//                         <th className="text-center align-content-center border border-dark text-nowrap p-2">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {months.map((month, index) => (
//                         <tr key={month} className="payroll-table-body">
//                           <td className="text-center align-content-center border border-dark p-2">{month}</td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={rentData[month].rent}
//                               onChange={(e) => handleChange(month, 'rent', e.target.value)}
//                             />
//                           </td>
//                           <td className="text-end border border-dark p-2" style={{ minWidth: "9rem" }}>
//                             <select
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={rentData[month].city}
//                               onChange={(e) => handleChange(month, 'city', e.target.value)}
//                             >
//                               <option value="">Select City</option>
//                               <option value="Metro">Metro</option>
//                               <option value="Non-Metro">Non-Metro</option>
//                             </select>
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={rentData[month].landlordName}
//                               onChange={(e) => handleChange(month, 'landlordName', e.target.value)}
//                             />
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={rentData[month].landlordPan}
//                               onChange={(e) => handleChange(month, 'landlordPan', e.target.value)}
//                             />
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={rentData[month].landlordAddress}
//                               onChange={(e) => handleChange(month, 'landlordAddress', e.target.value)}
//                             />
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="file"
//                               className="form-control payroll-input-border"
//                               accept="image/*,application/pdf"
//                               onChange={(e) => handleFileChange(month, e.target.files[0])}
//                             />
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {index > 0 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary fs-4 custom-submit-button"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-placement="left"
//                                 title="Auto fill same previous month's data"
//                                 onClick={() => {
//                                   const prevMonth = months[index - 1];
//                                   const prevData = rentData[prevMonth];
//                                   setRentData(prev => ({
//                                     ...prev,
//                                     [month]: {
//                                       ...prevData,
//                                       receipt: null
//                                     }
//                                   }));
//                                 }}
//                               >
//                                 <MdOutlineAutorenew />
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="text-end">
//                   <button
//                     type="submit"
//                     className="btn btn-primary custom-submit-button"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Submitting...' : 'Save'}
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

// export default EmployeeRentDetails;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';

// const EmployeeRentDetails = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);
//   const [employeeDetails, setEmployeeDetails] = useState({});
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [rentDetails, setRentDetails] = useState([
//     {
//       month: 'April',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'May',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'June',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'July',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'August',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'September',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'October',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'November',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'December',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'January',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'February',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'March',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     }
//   ]);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId || !userDetails?.userId) {
//       toast.error('Authentication details missing');
//       navigate('/login');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);
//     setEmployeeId(userDetails.userId);

//     fetchEmployeeData(userDetails.schoolId, userDetails.userId);
//     fetchRentDetails(userDetails.schoolId, userDetails.userId);
//   }, [navigate]);

//   const fetchEmployeeData = async (schoolId, empId) => {
//     try {
//       const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//       if (!employeeRes.hasError && employeeRes.data?.data) {
//         setEmployeeDetails(employeeRes.data.data);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch employee details");
//     }
//   };

//   const fetchRentDetails = async (schoolId, empId) => {
//     try {
//       const rentRes = await getAPI(`/rent-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//       if (!rentRes.hasError && rentRes.data?.data) {
//         setRentDetails(rentRes.data.data.rentDetails);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch rent details");
//     }
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedRentDetails = [...rentDetails];
//     updatedRentDetails[index] = {
//       ...updatedRentDetails[index],
//       [field]: field === 'declaredRent' || field === 'actualHRAReceived' || field === 'actualRentPaid' || field === 'basicSalaryCity' || field === 'hraExemption'
//         ? Number(value.replace(/,/g, '')) || 0
//         : value
//     };
//     setRentDetails(updatedRentDetails);
//   };

//   const handleFileUpload = (index, file) => {
//     if (!file) {
//       const updatedRentDetails = [...rentDetails];
//       updatedRentDetails[index] = { ...updatedRentDetails[index], rentReceipt: null };
//       setRentDetails(updatedRentDetails);
//       return;
//     }

//     const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//     if (!validTypes.includes(file.type)) {
//       toast.error('Only JPEG, PNG, or PDF files are allowed');
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('File size must be less than 2MB');
//       return;
//     }

//     const updatedRentDetails = [...rentDetails];
//     updatedRentDetails[index] = { ...updatedRentDetails[index], rentReceipt: file };
//     setRentDetails(updatedRentDetails);
//   };

//   const validateSubmission = () => {
//     const invalidRentDetails = rentDetails.some(
//       item => (item.declaredRent > 0 || item.actualRentPaid > 0 || item.hraExemption > 0) &&
//               (!item.rentReceipt || !item.landlordName || !item.landlordAddress || 
//                (item.declaredRent > 100000 && !item.landlordPanNumber))
//     );

//     if (invalidRentDetails) {
//       toast.error('Please provide all required fields (rent receipt, landlord name, address, and PAN if rent > ₹1,00,000) for non-zero rent entries');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!validateSubmission()) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('schoolId', schoolId);
//       formData.append('employeeId', employeeId);
//       formData.append('academicYear', academicYear);

//       rentDetails.forEach((item, index) => {
//         formData.append(`rentDetails[${index}][month]`, item.month);
//         formData.append(`rentDetails[${index}][declaredRent]`, item.declaredRent);
//         formData.append(`rentDetails[${index}][cityType]`, item.cityType || '');
//         formData.append(`rentDetails[${index}][landlordName]`, item.landlordName || '');
//         formData.append(`rentDetails[${index}][landlordPanNumber]`, item.landlordPanNumber || '');
//         formData.append(`rentDetails[${index}][landlordAddress]`, item.landlordAddress || '');
//         formData.append(`rentDetails[${index}][actualHRAReceived]`, item.actualHRAReceived);
//         formData.append(`rentDetails[${index}][actualRentPaid]`, item.actualRentPaid);
//         formData.append(`rentDetails[${index}][basicSalaryCity]`, item.basicSalaryCity);
//         formData.append(`rentDetails[${index}][hraExemption]`, item.hraExemption);
//         if (item.rentReceipt) {
//           formData.append(`rentReceipts[${index}]`, item.rentReceipt);
//         }
//       });

//       const response = await postAPI(
//         `/rent-details/${schoolId}/${employeeId}`,
//         formData,
//         { 'Content-Type': 'multipart/form-data' },
//         true
//       );

//       if (!response.hasError) {
//         toast.success("Rent details submitted successfully!");
//         fetchRentDetails(schoolId, employeeId); // Refresh data after submission
//       } else {
//         toast.error(response.message || "Failed to submit rent details");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error("An error occurred while submitting the rent details");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN').format(amount);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2">
//                   <h4 className="payroll-title text-center mb-0">
//                     Employee Rent Details
//                   </h4>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                   <div className="col-md-8">
//                     <p className='text-dark payroll-box-text'>
//                       <strong>Employee Name: </strong> {employeeDetails.employeeName || 'N/A'}
//                     </p>
//                   </div>
//                   <div className="col-md-4">
//                     <p className='text-dark payroll-box-text'>
//                       <strong>Employee ID: </strong>{employeeDetails.employeeId || 'N/A'}
//                     </p>
//                   </div>
//                   <div className="col-md-4">
//                     <p className='text-dark'>
//                       <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year: </label>
//                       <select
//                         id="yearSelect"
//                         className="custom-select"
//                         aria-label="Select Year"
//                         style={{ marginLeft: "5px" }}
//                         value={academicYear}
//                         onChange={(e) => setAcademicYear(e.target.value)}
//                       >
//                         <option value="2025-26">2025-26</option>
//                         <option value="2026-27">2026-27</option>
//                         <option value="2027-28">2027-28</option>
//                         <option value="2028-29">2028-29</option>
//                         <option value="2029-30">2029-30</option>
//                       </select>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="table-responsive mb-4">
//                   <table className="border border-dark mb-4 table table-hover">
//                     <thead className="bg-light-subtle">
//                       <tr className="payroll-table-header">
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Month</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Declared Rent</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">City Type</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord Name</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord PAN</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord Address</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Rent Receipt</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Actual HRA Received</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Actual Rent Paid</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Basic Salary + City</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">HRA Exemption</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rentDetails.map((item, index) => (
//                         <tr key={index} className='payroll-table-body'>
//                           <td className="align-content-center border border-dark p-2">{item.month}</td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={formatCurrency(item.declaredRent)}
//                               onChange={(e) => handleInputChange(index, 'declaredRent', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <select
//                               className="form-control payroll-input-border"
//                               value={item.cityType}
//                               onChange={(e) => handleInputChange(index, 'cityType', e.target.value)}
//                               required={item.declaredRent > 0}
//                             >
//                               <option value="">Select City Type</option>
//                               <option value="Metro">Metro</option>
//                               <option value="Non-Metro">Non-Metro</option>
//                             </select>
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={item.landlordName}
//                               onChange={(e) => handleInputChange(index, 'landlordName', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={item.landlordPanNumber}
//                               onChange={(e) => handleInputChange(index, 'landlordPanNumber', e.target.value)}
//                               required={item.declaredRent > 100000}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={item.landlordAddress}
//                               onChange={(e) => handleInputChange(index, 'landlordAddress', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="file"
//                               className="form-control payroll-input-border"
//                               accept="image/*,application/pdf"
//                               onChange={(e) => handleFileUpload(index, e.target.files[0])}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={formatCurrency(item.actualHRAReceived)}
//                               onChange={(e) => handleInputChange(index, 'actualHRAReceived', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={formatCurrency(item.actualRentPaid)}
//                               onChange={(e) => handleInputChange(index, 'actualRentPaid', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={formatCurrency(item.basicSalaryCity)}
//                               onChange={(e) => handleInputChange(index, 'basicSalaryCity', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={formatCurrency(item.hraExemption)}
//                               onChange={(e) => handleInputChange(index, 'hraExemption', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="row m-0">
//                   <div className="col-md-12 text-center">
//                     <button
//                       type="submit"
//                       className="btn btn-primary"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? 'Submitting...' : 'Submit Rent Details'}
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-secondary ms-2"
//                       onClick={() => navigate('/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration')}
//                     >
//                       Back to IT Declaration
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeRentDetails;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';

// const EmployeeRentDetails = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);
//   const [employeeDetails, setEmployeeDetails] = useState({});
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [totals, setTotals] = useState({
//     declaredRent: 0,
//     monthActualHRAReceived: 0,
//     monthActualRentPaid: 0,
//     monthBasicSalaryCity: 0,

//   });
//   const [rentDetails, setRentDetails] = useState([
//     {
//       month: 'April',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'May',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'June',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'July',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'August',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'September',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'October',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'November',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'December',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'January',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'February',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     },
//     {
//       month: 'March',
//       declaredRent: 0,
//       cityType: '',
//       landlordName: '',
//       landlordPanNumber: '',
//       landlordAddress: '',
//       rentReceipt: null,
//       existingRentReceipt: null,
//       actualHRAReceived: 0,
//       actualRentPaid: 0,
//       basicSalaryCity: 0,
//       hraExemption: 0
//     }
//   ]);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId || !userDetails?.userId) {
//       toast.error('Authentication details missing');
//       navigate('/login');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);
//     setEmployeeId(userDetails.userId);

//     fetchEmployeeData(userDetails.schoolId, userDetails.userId);
//     fetchRentDetails(userDetails.schoolId, userDetails.userId);
//   }, [navigate]);

//   const fetchEmployeeData = async (schoolId, empId) => {
//     try {
//       const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//       if (!employeeRes.hasError && employeeRes.data?.data) {
//         setEmployeeDetails(employeeRes.data.data);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch employee details");
//     }
//   };

//   const fetchRentDetails = async (schoolId, empId) => {
//     try {
//       const rentRes = await getAPI(`/rent-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//       if (!rentRes.hasError && rentRes.data?.data) {
//         setRentDetails(rentRes.data.data.rentDetails.map(item => ({
//           ...item,
//           rentReceipt: null, // Reset for new uploads
//           existingRentReceipt: item.rentReceipt // Store existing file path
//         })));
//         calculateTotals(rentRes.data.data.rentDetails)
//       }
//     } catch (error) {
//       toast.error("Failed to fetch rent details");
//     }
//   };
//   let totalDeclare;
//   const calculateTotals = (details) => {
//     const totalData = {
//       declaredRent: 0,
//     monthActualHRAReceived: 0,
//     monthActualRentPaid: 0,
//     monthBasicSalaryCity: 0,

//     };

//     details.forEach(item => {
//       totalData.declaredRent += item.declaredRent || 0;
//       totalData.monthActualHRAReceived += item.monthActualHRAReceived || 0;
//       totalData.monthActualRentPaid += item.monthActualRentPaid || 0;
//       totalData.monthBasicSalaryCity += item.monthBasicSalaryCity || 0;

//     });

//     setTotals(totalData);
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedRentDetails = [...rentDetails];
//     updatedRentDetails[index] = {
//       ...updatedRentDetails[index],
//       [field]: field === 'declaredRent' ? Number(value.replace(/,/g, '')) || 0 : value
//     };
//     setRentDetails(updatedRentDetails);
//     //  totalDeclare = updatedRentDetails.reduce((acc,curr) => acc + (curr.declaredRent || 0), 0);
//     calculateTotals(updatedRentDetails);
//   };

//   const handleFileUpload = (index, file) => {
//     const updatedRentDetails = [...rentDetails];
//     if (!file) {
//       updatedRentDetails[index] = { ...updatedRentDetails[index], rentReceipt: null };
//       setRentDetails(updatedRentDetails);
//       return;
//     }

//     const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//     if (!validTypes.includes(file.type)) {
//       toast.error('Only JPEG, PNG, or PDF files are allowed');
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('File size must be less than 2MB');
//       return;
//     }

//     updatedRentDetails[index] = { ...updatedRentDetails[index], rentReceipt: file };
//     setRentDetails(updatedRentDetails);
//   };

//   const validateSubmission = () => {
//     const invalidRentDetails = rentDetails.some(
//       item => item.declaredRent > 0 && (
//         !item.cityType ||
//         !item.landlordName ||
//         !item.landlordAddress ||
//         (item.declaredRent > 100000 && !item.landlordPanNumber) ||
//         (!item.rentReceipt && !item.existingRentReceipt)
//       )
//     );

//     if (invalidRentDetails) {
//       toast.error('Please provide all required fields (city type, landlord name, address, PAN if rent > ₹1,00,000, and rent receipt) for non-zero rent entries');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!validateSubmission()) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('schoolId', schoolId);
//       formData.append('employeeId', employeeId);
//       formData.append('academicYear', academicYear);

//       rentDetails.forEach((item, index) => {
//         formData.append(`rentDetails[${index}][month]`, item.month);
//         formData.append(`rentDetails[${index}][declaredRent]`, item.declaredRent);
//         formData.append(`rentDetails[${index}][cityType]`, item.cityType || '');
//         formData.append(`rentDetails[${index}][landlordName]`, item.landlordName || '');
//         formData.append(`rentDetails[${index}][landlordPanNumber]`, item.landlordPanNumber || '');
//         formData.append(`rentDetails[${index}][landlordAddress]`, item.landlordAddress || '');
//         if (item.existingRentReceipt) {
//           formData.append(`rentDetails[${index}][existingRentReceipt]`, item.existingRentReceipt);
//         }
//         if (item.rentReceipt instanceof File) {
//           formData.append(`rentReceipts[${index}]`, item.rentReceipt);
//         }
//       });

//       const response = await postAPI(
//         `/rent-details/${schoolId}/${employeeId}`,
//         formData,
//         { 'Content-Type': 'multipart/form-data' },
//         true
//       );

//       if (!response.hasError) {
//         toast.success("Rent details submitted successfully!");
//         fetchRentDetails(schoolId, employeeId);
//       } else {
//         toast.error(response.message || "Failed to submit rent details");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error("An error occurred while submitting the rent details");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN').format(amount);
//   };

//   const getFileName = (rentReceipt, existingRentReceipt) => {
//     if (rentReceipt instanceof File) {
//       return rentReceipt.name.length > 25 ? rentReceipt.name.slice(0, 25) + '...' : rentReceipt.name;
//     }
//     if (existingRentReceipt) {
//       const fullName = existingRentReceipt.split('\\').pop().split('/').pop() || 'Existing file';
//       return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
//     }
//     return 'No file';
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Employee Rent Details
//                   </h4>
//                   <button
//                     type="button"
//                     className="btn btn-primary ms-2 custom-submit-button"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="table-responsive mb-4">
//                   <table className="border border-dark mb-4 table table-hover">
//                     <thead className="bg-light-subtle">
//                       <tr className="payroll-table-header">
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Month</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Declared Rent</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">City Type</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord Name</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord PAN</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord Address</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Rent Receipt</th>
//                         <th className="text-center align-content-center border border-dark p-2 ">Actual HRA Received</th>
//                         <th className="text-center align-content-center border border-dark p-2 ">Actual Rent Paid</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Basic Salary </th>
//                         {/* <th className="text-center align-content-center border border-dark p-2 text-nowrap">HRA Exemption</th> */}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rentDetails.map((item, index) => (
//                         <tr key={index} className='payroll-table-body'>
//                           <td className="align-content-center border border-dark p-2">{item.month}</td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={formatCurrency(item.declaredRent)}
//                               onChange={(e) => handleInputChange(index, 'declaredRent', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <select
//                               className="form-control payroll-input-border"
//                               value={item.cityType}
//                               onChange={(e) => handleInputChange(index, 'cityType', e.target.value)}
//                               required={item.declaredRent > 0}
//                             >
//                               <option value="">Select City Type</option>
//                               <option value="Metro">Metro</option>
//                               <option value="Non-Metro">Non-Metro</option>
//                             </select>
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={item.landlordName}
//                               onChange={(e) => handleInputChange(index, 'landlordName', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={item.landlordPanNumber}
//                               onChange={(e) => handleInputChange(index, 'landlordPanNumber', e.target.value)}
//                               required={item.declaredRent > 100000}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={item.landlordAddress}
//                               onChange={(e) => handleInputChange(index, 'landlordAddress', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <div className="d-flex align-items-center">
//                               <input
//                                 type="file"
//                                 className="form-control payroll-input-border me-2"
//                                 accept="image/*,application/pdf"
//                                 onChange={(e) => handleFileUpload(index, e.target.files[0])}
//                                 required={item.declaredRent > 0 && !item.rentReceipt && !item.existingRentReceipt}
//                               />
//                               {/* {(item.rentReceipt || item.existingRentReceipt) && (
//                                 <button
//                                   type="button"
//                                   className="btn btn-sm btn-danger"
//                                   onClick={() => handleFileUpload(index, null)}
//                                 >
//                                   Remove
//                                 </button>
//                               )} */}
//                             </div>
//                             {(item.rentReceipt || item.existingRentReceipt) && (
//                               <div className="mt-2">
//                                 <small>{getFileName(item.rentReceipt, item.existingRentReceipt)}</small>
//                               </div>
//                             )}
//                           </td>
//                           <td className="align-content-center border border-dark p-2 text-end">
//                             {formatCurrency(item.actualHRAReceived)}
//                           </td>
//                           <td className="align-content-center border border-dark p-2 text-end">
//                             {formatCurrency(item.actualRentPaid)}
//                           </td>
//                           <td className="align-content-center border border-dark p-2 text-end">
//                             {formatCurrency(item.basicSalaryCity)}
//                           </td>
//                           {/* <td className="align-content-center border border-dark p-2 text-end">
//                             {formatCurrency(item.hraExemption)}
//                           </td> */}
//                         </tr>
//                       ))}
//                       <tr className='payroll-table-body it-declaration-section-bg'>
//                         <td className="align-content-center border fw-bold border-dark p-2">Total</td>
//                         <td className="align-content-center border fw-bold border-dark p-2">
//                           {totals.declaredRent}
//                         </td>
//                         <td className="align-content-center border fw-bold border-dark p-2">

//                         </td>
//                         <td className="align-content-center fw-bold border border-dark p-2">

//                         </td>
//                         <td className="align-content-center fw-bold border border-dark p-2">

//                         </td>
//                         <td className="align-content-center fw-bold border border-dark p-2">

//                         </td>
//                         <td className="align-content-center fw-bold border border-dark p-2">


//                         </td>
//                         <td className="align-content-center fw-bold border border-dark p-2 text-end">
//                           {totals.actualHRAReceived}
//                         </td>
//                         <td className="align-content-center fw-bold border border-dark p-2 text-end">
//                           {totals.actualRentPaid}
//                         </td>
//                         <td className="align-content-center fw-bold border border-dark p-2 text-end">
//                           {totals.basicSalaryCity}
//                         </td>

//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="card-footer border-top" style={{ overflowX: "auto" }}>
//                   <div className="d-flex justify-content-end mt-3">
//                     <div className="text-end">
//                       <button
//                         type="submit"
//                         className="btn btn-primary custom-submit-button"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? 'Submitting...' : 'Save'}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//               <div className="table-responsive mb-4">
//                   <table className="border border-dark mb-4 table table-hover">
//                     <thead className="bg-light-subtle">
//                       <tr className="payroll-table-header">
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Particulars</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>

//                       <tr className='payroll-table-body'>
//                         <td className="align-content-center border border-dark p-2">HRA Received</td>
//                         <td className="align-content-center border border-dark p-2">
//                          {totals.actualHRAReceived}
//                         </td> 
//                       </tr>
//                       <tr className='payroll-table-body'>
//                         <td className="align-content-center border border-dark p-2">Rent Paid - 10% of basic Salary</td>
//                         <td className="align-content-center border border-dark p-2">
//                          {{totals.actualRentPaid}- {{totals.basicSalaryCity* 0.1}}}
//                         </td> 
//                       </tr>
//                       <tr className='payroll-table-body'>
//                         <td className="align-content-center border border-dark p-2">Rent Paid </td>
//                         <td className="align-content-center border border-dark p-2">
//                          {totals.actualRentPaid}
//                         </td> 
//                       </tr>
//                       <tr className='payroll-table-body'>
//                         <td className="align-content-center border border-dark p-2">10% of basic Salary</td>
//                         <td className="align-content-center border border-dark p-2">
//                          {{totals.basicSalaryCity* 0.1}}
//                         </td> 
//                       </tr>
//                       <tr className='payroll-table-body'>
//                         <td className="align-content-center border border-dark p-2">50% of Basic Salary</td>
//                         <td className="align-content-center border border-dark p-2">

//                         </td> 
//                       </tr>
//                       <tr className='payroll-table-body'>
//                         <td className="align-content-center border border-dark p-2">40% of Basic Salary</td>
//                         <td className="align-content-center border border-dark p-2">

//                         </td> 
//                       </tr>
//                       <tr className='payroll-table-body'>
//                         <td className="align-content-center border border-dark p-2">HRA Exemption</td>
//                         <td className="align-content-center border border-dark p-2">

//                         </td> 
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeRentDetails;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';
// import { MdOutlineAutorenew } from "react-icons/md";
// const EmployeeRentDetails = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);
//   const [employeeDetails, setEmployeeDetails] = useState({});
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [totals, setTotals] = useState({
//     declaredRent: 0,
//     monthActualHRAReceived: 0,
//     monthActualRentPaid: 0,
//     monthBasicSalaryCity: 0,
//     actualHRAReceived: 0,
//     actualRentPaid: 0,
//     basicSalaryCity: 0,
//     hraExemption: 0
//   });

//   const [rentDetails, setRentDetails] = useState([
//     { month: 'April', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'May', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'June', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'July', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'August', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'September', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'October', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'November', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'December', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'January', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'February', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
//     { month: 'March', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 }
//   ]);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId || !userDetails?.userId) {
//       toast.error('Authentication details missing');
//       navigate('/login');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);
//     setEmployeeId(userDetails.userId);

//     fetchEmployeeData(userDetails.schoolId, userDetails.userId);
//     fetchRentDetails(userDetails.schoolId, userDetails.userId);
//   }, [navigate]);

//   const fetchEmployeeData = async (schoolId, empId) => {
//     try {
//       const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//       if (!employeeRes.hasError && employeeRes.data?.data) {
//         setEmployeeDetails(employeeRes.data.data);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch employee details");
//     }
//   };

//   const fetchRentDetails = async (schoolId, empId) => {
//     try {
//       const rentRes = await getAPI(`/rent-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//       if (!rentRes.hasError && rentRes.data?.data) {
//         setRentDetails(rentRes.data.data.rentDetails.map(item => ({
//           ...item,
//           rentReceipt: null,
//           existingRentReceipt: item.rentReceipt
//         })));
//         console.log("Get Rent Res", rentRes);
//         setTotals({
//           declaredRent: rentRes.data.data.rentDetails.reduce((acc, curr) => acc + (curr.declaredRent || 0), 0),
//           monthActualHRAReceived: rentRes.data.data.rentDetails.reduce((acc, curr) => acc + (curr.monthActualHRAReceived || 0), 0),
//           monthActualRentPaid: rentRes.data.data.rentDetails.reduce((acc, curr) => acc + (curr.monthActualRentPaid || 0), 0),
//           monthBasicSalaryCity: rentRes.data.data.rentDetails.reduce((acc, curr) => acc + (curr.monthBasicSalaryCity || 0), 0),
//           actualHRAReceived: rentRes.data.data.actualHRAReceived || 0,
//           actualRentPaid: rentRes.data.data.actualRentPaid || 0,
//           basicSalaryCity: rentRes.data.data.basicSalaryCity || 0,
//           hraExemption: rentRes.data.data.hraExemption || 0
//         });
//       }
//     } catch (error) {
//       toast.error("Failed to fetch rent details");
//       console.error("Fetch rent details error:", error);
//     }
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedRentDetails = [...rentDetails];
//     updatedRentDetails[index] = {
//       ...updatedRentDetails[index],
//       [field]: field === 'declaredRent' ? Number(value.replace(/,/g, '')) || 0 : value
//     };
//     setRentDetails(updatedRentDetails);
//     calculateTotals(updatedRentDetails);
//   };

//   const calculateTotals = (details) => {
//     const totalData = {
//       ...totals,
//       declaredRent: details.reduce((acc, curr) => acc + (curr.declaredRent || 0), 0),
//       monthActualHRAReceived: details.reduce((acc, curr) => acc + (curr.monthActualHRAReceived || 0), 0),
//       monthActualRentPaid: details.reduce((acc, curr) => acc + (curr.monthActualRentPaid || 0), 0),
//       monthBasicSalaryCity: details.reduce((acc, curr) => acc + (curr.monthBasicSalaryCity || 0), 0)
//     };
//     setTotals(totalData);
//   };

//   const handleFileUpload = (index, file) => {
//     const updatedRentDetails = [...rentDetails];
//     if (!file) {
//       updatedRentDetails[index] = { ...updatedRentDetails[index], rentReceipt: null };
//       setRentDetails(updatedRentDetails);
//       return;
//     }

//     const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//     if (!validTypes.includes(file.type)) {
//       toast.error('Only JPEG, PNG, or PDF files are allowed');
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('File size must be less than 2MB');
//       return;
//     }

//     updatedRentDetails[index] = { ...updatedRentDetails[index], rentReceipt: file };
//     setRentDetails(updatedRentDetails);
//   };

//   const validateSubmission = () => {
//     const invalidRentDetails = rentDetails.some(
//       item => item.declaredRent > 0 && (
//         !item.cityType ||
//         !item.landlordName ||
//         !item.landlordAddress ||
//         (item.declaredRent > 100000 && !item.landlordPanNumber) ||
//         (!item.rentReceipt && !item.existingRentReceipt)
//       )
//     );

//     if (invalidRentDetails) {
//       toast.error('Please provide all required fields (city type, landlord name, address, PAN if rent > ₹1,00,000, and rent receipt) for non-zero rent entries');
//       return false;
//     }

//     const cityTypes = rentDetails.filter(item => item.declaredRent > 0).map(item => item.cityType);
//     // if (cityTypes.length > 0 && new Set(cityTypes).size > 1) {
//     //   toast.error('All non-zero rent entries must have the same city type (Metro or Non-Metro)');
//     //   return false;
//     // }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!validateSubmission()) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('schoolId', schoolId);
//       formData.append('employeeId', employeeId);
//       formData.append('academicYear', academicYear);

//       rentDetails.forEach((item, index) => {
//         formData.append(`rentDetails[${index}][month]`, item.month);
//         formData.append(`rentDetails[${index}][declaredRent]`, item.declaredRent);
//         formData.append(`rentDetails[${index}][cityType]`, item.cityType || '');
//         formData.append(`rentDetails[${index}][landlordName]`, item.landlordName || '');
//         formData.append(`rentDetails[${index}][landlordPanNumber]`, item.landlordPanNumber || '');
//         formData.append(`rentDetails[${index}][landlordAddress]`, item.landlordAddress || '');
//         if (item.existingRentReceipt) {
//           formData.append(`rentDetails[${index}][existingRentReceipt]`, item.existingRentReceipt);
//         }
//         if (item.rentReceipt instanceof File) {
//           formData.append(`rentReceipts[${index}]`, item.rentReceipt);
//         }
//       });

//       const response = await postAPI(
//         `/post-rent-details/${schoolId}/${employeeId}`,
//         formData,
//         { 'Content-Type': 'multipart/form-data' },
//         true
//       );

//       if (!response.hasError) {
//         toast.success("Rent details submitted successfully!");
//         fetchRentDetails(schoolId, employeeId);
//       } else {
//         toast.error(response.message || "Failed to submit rent details");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error("An error occurred while submitting the rent details");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN').format(amount);
//   };

//   const getFileName = (rentReceipt, existingRentReceipt) => {
//     if (rentReceipt instanceof File) {
//       return rentReceipt.name.length > 25 ? rentReceipt.name.slice(0, 25) + '...' : rentReceipt.name;
//     }
//     if (existingRentReceipt) {
//       const fullName = existingRentReceipt.split('\\').pop().split('/').pop() || 'Existing file';
//       return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
//     }
//     return 'No file';
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Employee Rent Details
//                   </h4>
//                   <button
//                     type="button"
//                     className="btn btn-primary ms-2 custom-submit-button"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="table-responsive mb-4">
//                   <table className="border border-dark mb-4 table table-hover">
//                     <thead className="bg-light-subtle">
//                       <tr className="payroll-table-header">
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>Month</th>
//                         <th className="text-center align-content-center border border-dark p-2 " style={{ width: "120px" }}>Declared Rent</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "130px" }}>City Type</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "200px" }}>Landlord Name</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "180px" }}>Landlord PAN</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "200px" }}>Landlord Address</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "200px" }}>Rent Receipt</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Action</th>
//                         <th className="text-center align-content-center border border-dark p-2 ">Actual HRA Received</th>
//                         <th className="text-center align-content-center border border-dark p-2 ">Actual Rent Paid</th>
//                         <th className="text-center align-content-center border border-dark p-2 text-nowrap">Basic Salary</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rentDetails.map((item, index) => (
//                         <tr key={index} className='payroll-table-body'>
//                           <td className="text-center align-content-center border border-dark p-2">{item.month}</td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               value={formatCurrency(item.declaredRent)}
//                               onChange={(e) => handleInputChange(index, 'declaredRent', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <select
//                               className="form-control payroll-input-border"
//                               value={item.cityType}
//                               onChange={(e) => handleInputChange(index, 'cityType', e.target.value)}
//                               required={item.declaredRent > 0}
//                             >
//                               <option value="">Select City Type</option>
//                               <option value="Metro">Metro</option>
//                               <option value="Non-Metro">Non-Metro</option>
//                             </select>
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={item.landlordName}
//                               onChange={(e) => handleInputChange(index, 'landlordName', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={item.landlordPanNumber}
//                               onChange={(e) => handleInputChange(index, 'landlordPanNumber', e.target.value)}
//                               required={item.declaredRent > 100000}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={item.landlordAddress}
//                               onChange={(e) => handleInputChange(index, 'landlordAddress', e.target.value)}
//                               required={item.declaredRent > 0}
//                             />
//                           </td>
//                           <td className="align-content-center border border-dark p-2">
//                             <div className="d-flex align-items-center">
//                               <input
//                                 type="file"
//                                 className="form-control payroll-input-border me-2"
//                                 accept="image/*,application/pdf"
//                                 onChange={(e) => handleFileUpload(index, e.target.files[0])}
//                                 required={item.declaredRent > 0 && !item.rentReceipt && !item.existingRentReceipt}
//                               />
//                             </div>
//                             {(item.rentReceipt || item.existingRentReceipt) && (
//                               <div className="mt-2">
//                                 <small>{getFileName(item.rentReceipt, item.existingRentReceipt)}</small>
//                               </div>
//                             )}
//                           </td>
//                           <td className="text-end align-content-center border border-dark p-2">
//                             {index > 0 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-primary fs-4 custom-submit-button"
//                                 data-bs-toggle="tooltip"
//                                 data-bs-placement="left"
//                                 title="Auto fill same previous month's data"
//                                 onClick={() => {
//                                   const updatedRentDetails = [...rentDetails];
//                                   updatedRentDetails[index] = {
//                                     ...updatedRentDetails[index - 1],
//                                     month: updatedRentDetails[index].month,
//                                     rentReceipt: null,
//                                     existingRentReceipt: updatedRentDetails[index].existingRentReceipt
//                                   };
//                                   setRentDetails(updatedRentDetails);
//                                   calculateTotals(updatedRentDetails);
//                                 }}
//                               >
//                                 <MdOutlineAutorenew />
//                               </button>
//                             )}
//                           </td>
//                           <td className="align-content-center border border-dark p-2 text-end">
//                             {formatCurrency(item.monthActualHRAReceived)}
//                           </td>
//                           <td className="align-content-center border border-dark p-2 text-end">
//                             {formatCurrency(item.monthActualRentPaid)}
//                           </td>
//                           <td className="align-content-center border border-dark p-2 text-end">
//                             {formatCurrency(item.monthBasicSalaryCity)}
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className='payroll-table-body it-declaration-section-bg'>
//                         <td className="align-content-center border fw-bold border-dark p-2">Total</td>
//                         <td className="align-content-center border fw-bold border-dark p-2">{formatCurrency(totals.declaredRent)}</td>
//                         <td className="align-content-center border fw-bold border-dark p-2"></td>
//                         <td className="align-content-center border fw-bold border-dark p-2"></td>

//                         <td className="align-content-center fw-bold border border-dark p-2"></td>
//                         <td className="align-content-center fw-bold border border-dark p-2"></td>
//                         <td className="align-content-center fw-bold border border-dark p-2"></td>
//                         <td className="align-content-center fw-bold border border-dark p-2"></td>
//                         <td className="align-content-center fw-bold border border-dark p-2 text-end">{formatCurrency(totals.monthActualHRAReceived)}</td>
//                         <td className="align-content-center fw-bold border border-dark p-2 text-end">{formatCurrency(totals.monthActualRentPaid)}</td>
//                         <td className="align-content-center fw-bold border border-dark p-2 text-end">{formatCurrency(totals.monthBasicSalaryCity)}</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="card-footer border-top" style={{ overflowX: "auto" }}>
//                   <div className="d-flex justify-content-end mt-3">
//                     <div className="text-end">
//                       <button
//                         type="submit"
//                         className="btn btn-primary custom-submit-button"
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? 'Submitting...' : 'Save'}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//               <div className="container">
//                 <div className="card-header d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Metro calculation Table
//                   </h4>
//                 </div>
//               </div>
//               <div className="table-responsive mb-4">
//                 <table className="border border-dark mb-4 table table-hover">
//                   <thead className="bg-light-subtle">
//                     <tr className="payroll-table-header">
//                       <th className="text-center align-content-center border border-dark p-2 text-nowrap">Particulars</th>
//                       <th className="text-center align-content-center border border-dark p-2 text-nowrap">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className='payroll-table-body'>
//                       <td className="align-content-center border border-dark p-2">HRA Received</td>
//                       <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualHRAReceived)}</td>
//                     </tr>
//                     <tr className='payroll-table-body'>
//                       <td className="align-content-center border border-dark p-2">Rent Paid - 10% of Basic Salary</td>
//                       <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualRentPaid)}</td>
//                     </tr>
//                     <tr className='payroll-table-body'>
//                       <td className="align-content-center border border-dark p-2">Rent Paid</td>
//                       <td className="align-content-center border border-dark p-2">{formatCurrency(totals.monthActualRentPaid)}</td>
//                     </tr>
//                     <tr className='payroll-table-body'>
//                       <td className="align-content-center border border-dark p-2">10% of Basic Salary</td>
//                       <td className="align-content-center border border-dark p-2">{formatCurrency(totals.monthBasicSalaryCity * 0.1)}</td>
//                     </tr>
//                     {(() => {
//                       const cityTypes = rentDetails
//                         .filter(item => item.declaredRent > 0)
//                         .map(item => item.cityType);

//                       const allSameCityType = cityTypes.length > 0 && new Set(cityTypes).size === 1;
//                       const cityType = allSameCityType ? cityTypes[0] : null;

//                       const basicCity = totals.basicSalaryCity;

//                       return (
//                         <>
//                           <tr className='payroll-table-body'>
//                             <td className="align-content-center border border-dark p-2">50% of Basic Salary</td>
//                             <td className="align-content-center border border-dark p-2">
//                               {cityType === 'Metro' ? formatCurrency(basicCity) : formatCurrency(0)}
//                             </td>
//                           </tr>
//                           <tr className='payroll-table-body'>
//                             <td className="align-content-center border border-dark p-2">40% of Basic Salary</td>
//                             <td className="align-content-center border border-dark p-2">
//                               {cityType === 'Non-Metro' ? formatCurrency(basicCity) : formatCurrency(0)}
//                             </td>
//                           </tr>
//                         </>
//                       );
//                     })()}


//                     <tr className='payroll-table-body'>
//                       <td className="align-content-center border border-dark p-2">HRA Exemption</td>
//                       <td className="align-content-center border border-dark p-2">
//                         {formatCurrency(totals.hraExemption)}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               <div className="container">
//                 <div className="card-header d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Non-Metro calculation Table
//                   </h4>
//                 </div>
//               </div>
//               <div className="table-responsive mb-4">
//                 <table className="border border-dark mb-4 table table-hover">
//                   <thead className="bg-light-subtle">
//                     <tr className="payroll-table-header">
//                       <th className="text-center align-content-center border border-dark p-2 text-nowrap">Particulars</th>
//                       <th className="text-center align-content-center border border-dark p-2 text-nowrap">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className='payroll-table-body'>
//                       <td className="align-content-center border border-dark p-2">HRA Received</td>
//                       <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualHRAReceived)}</td>
//                     </tr>
//                     <tr className='payroll-table-body'>
//                       <td className="align-content-center border border-dark p-2">Rent Paid - 10% of Basic Salary</td>
//                       <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualRentPaid)}</td>
//                     </tr>
//                     <tr className='payroll-table-body'>
//                       <td className="align-content-center border border-dark p-2">Rent Paid</td>
//                       <td className="align-content-center border border-dark p-2">{formatCurrency(totals.monthActualRentPaid)}</td>
//                     </tr>
//                     <tr className='payroll-table-body'>
//                       <td className="align-content-center border border-dark p-2">10% of Basic Salary</td>
//                       <td className="align-content-center border border-dark p-2">{formatCurrency(totals.monthBasicSalaryCity * 0.1)}</td>
//                     </tr>
//                     {(() => {
//                       const cityTypes = rentDetails
//                         .filter(item => item.declaredRent > 0)
//                         .map(item => item.cityType);

//                       const allSameCityType = cityTypes.length > 0 && new Set(cityTypes).size === 1;
//                       const cityType = allSameCityType ? cityTypes[0] : null;

//                       const basicCity = totals.basicSalaryCity;

//                       return (
//                         <>
//                           <tr className='payroll-table-body'>
//                             <td className="align-content-center border border-dark p-2">50% of Basic Salary</td>
//                             <td className="align-content-center border border-dark p-2">
//                               {cityType === 'Metro' ? formatCurrency(basicCity) : formatCurrency(0)}
//                             </td>
//                           </tr>
//                           <tr className='payroll-table-body'>
//                             <td className="align-content-center border border-dark p-2">40% of Basic Salary</td>
//                             <td className="align-content-center border border-dark p-2">
//                               {cityType === 'Non-Metro' ? formatCurrency(basicCity) : formatCurrency(0)}
//                             </td>
//                           </tr>
//                         </>
//                       );
//                     })()}


//                     <tr className='payroll-table-body'>
//                       <td className="align-content-center border border-dark p-2">HRA Exemption</td>
//                       <td className="align-content-center border border-dark p-2">
//                         {formatCurrency(totals.hraExemption)}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeRentDetails;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import { MdOutlineAutorenew } from "react-icons/md";
const EmployeeRentDetails = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] =useState("Pending")
  const [totals, setTotals] = useState({
    declaredRent: 0,
    // Metro
    totalMonthActualHRAReceivedMetro:0,
    totalMonthActualRentPaidMetro:0,
    totalMonthBasicSalaryMetro: 0,

    actualHRAReceivedMetro: 0,
    actualRentPaidMetro: 0,
    basicSalaryMetro: 0,
    hraExemptionMetro: 0,


    // Non-Metro
    totalMonthActualHRAReceivedNonMetro: 0,
    totalMonthActualRentPaidNonMetro: 0, 
    totalMonthBasicSalaryNonMetro: 0,


    actualHRAReceivedNonMetro: 0,
    actualRentPaidNonMetro: 0,
    basicSalaryNonMetro: 0,
    hraExemptionNonMetro: 0,

    // Total
    actualHRAReceived: 0,
    actualRentPaid: 0,
    basicSalaryCity: 0,
    hraExemption: 0,

    
  });

  const [rentDetails, setRentDetails] = useState([
    { month: 'April', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'May', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'June', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'July', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'August', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'September', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'October', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'November', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'December', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'January', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'February', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'March', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 }
  ]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId || !userDetails?.userId) {
      toast.error('Authentication details missing');
      navigate('/login');
      return;
    }
    setSchoolId(userDetails.schoolId);
    setEmployeeId(userDetails.userId);

    fetchEmployeeData(userDetails.schoolId, userDetails.userId);
    fetchRentDetails(userDetails.schoolId, userDetails.userId);
  }, [navigate]);

  const fetchEmployeeData = async (schoolId, empId) => {
    try {
      const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
      if (!employeeRes.hasError && employeeRes.data?.data) {
        setEmployeeDetails(employeeRes.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch employee details");
      console.error("Fetch employee error:", error);
    }
  };

  const fetchRentDetails = async (schoolId, empId) => {
    try {
      const rentRes = await getAPI(`/rent-details/${schoolId}/${empId}?academicYear=${academicYear}`);
      if (!rentRes.hasError && rentRes.data?.data) {
        const fetchedRentDetails = rentRes.data.data.rentDetails.map(item => ({
          ...item,
          rentReceipt: null,
          existingRentReceipt: item.rentReceipt,
          monthActualHRAReceived: item.monthActualHRAReceived, 
          monthActualRentPaid: item.declaredRent, 
          monthBasicSalaryCity: item.monthBasicSalaryCity,
          monthStatus: item.monthStatus || 'Pending' 
        }));
        setRentDetails(fetchedRentDetails);
        setStatus(rentRes.data?.data.status || "Pending")
        console.log("Get Rent Res", rentRes);
        calculateTotals(fetchedRentDetails);
      }
    } catch (error) {
      toast.error("Failed to fetch rent details");
      console.error("Fetch rent details error:", error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedRentDetails = [...rentDetails];
    updatedRentDetails[index] = {
      ...updatedRentDetails[index],
      [field]: field === 'declaredRent' ? Number(value.replace(/,/g, '')) || 0 : value,
      monthActualRentPaid: field === 'declaredRent' ? Number(value.replace(/,/g, '')) || 0 : updatedRentDetails[index].monthActualRentPaid
    };
    setRentDetails(updatedRentDetails);
    calculateTotals(updatedRentDetails);
  };

  const calculateTotals = (details) => {
    let totalDeclaredRent = 0;

    // Metro
    let totalMonthActualHRAReceivedMetro = 0;
    let totalMonthActualRentPaidMetro = 0;
    let totalMonthBasicSalaryMetro = 0;

    // Non-metro
    let totalMonthActualHRAReceivedNonMetro = 0;
    let totalMonthActualRentPaidNonMetro = 0;
    let totalMonthBasicSalaryNonMetro = 0;

    details.forEach(item => {
      totalDeclaredRent += item.declaredRent || 0;
      if (item.cityType === 'Metro') {
        totalMonthActualHRAReceivedMetro += item.monthActualHRAReceived || 0;
        totalMonthActualRentPaidMetro += item.monthActualRentPaid || 0;
        totalMonthBasicSalaryMetro += item.monthBasicSalaryCity || 0;
      } else if (item.cityType === 'Non-Metro') {
        totalMonthActualHRAReceivedNonMetro += item.monthActualHRAReceived || 0;
        totalMonthActualRentPaidNonMetro += item.monthActualRentPaid || 0;
        totalMonthBasicSalaryNonMetro += item.monthBasicSalaryCity || 0;
      }
    });

    const actualHRAReceivedMetro = totalMonthActualHRAReceivedMetro;
    const basicSalaryMetroCity = totalMonthBasicSalaryMetro * 0.5;
    const actualRentPaidMetro = totalMonthActualRentPaidMetro - (totalMonthBasicSalaryMetro * 0.1);
    const hraExemptionMetro = Math.min(
      actualHRAReceivedMetro,
      actualRentPaidMetro,
      basicSalaryMetroCity
    );

    const actualHRAReceivedNonMetro = totalMonthActualHRAReceivedNonMetro;
    const basicSalaryNonMetroCity = totalMonthBasicSalaryNonMetro * 0.4;
    const actualRentPaidNonMetro = totalMonthActualRentPaidNonMetro - (totalMonthBasicSalaryNonMetro * 0.1);
    const hraExemptionNonMetro = Math.min(
      actualHRAReceivedNonMetro,
      actualRentPaidNonMetro,
      basicSalaryNonMetroCity
    );

    const actualHRAReceived = actualHRAReceivedMetro + actualHRAReceivedNonMetro;
    const actualRentPaid = actualRentPaidMetro + actualRentPaidNonMetro;
    const basicSalaryCity = basicSalaryMetroCity + basicSalaryNonMetroCity;
    const hraExemption = hraExemptionMetro + hraExemptionNonMetro;

    setTotals({
      declaredRent: totalDeclaredRent,

      totalMonthActualHRAReceivedMetro,
      totalMonthActualRentPaidMetro,
      totalMonthBasicSalaryMetro,

      actualHRAReceivedMetro,
      actualRentPaidMetro,
      basicSalaryMetro : basicSalaryMetroCity,
      hraExemptionMetro,

      totalMonthActualHRAReceivedNonMetro,
      totalMonthActualRentPaidNonMetro, 
      totalMonthBasicSalaryNonMetro,

      actualHRAReceivedNonMetro,
      actualRentPaidNonMetro,
      basicSalaryNonMetro: basicSalaryNonMetroCity,
      hraExemptionNonMetro,

      actualHRAReceived,
      actualRentPaid,
      basicSalaryCity,
      hraExemption
    });
  };

  const handleFileUpload = (index, file) => {
    const updatedRentDetails = [...rentDetails];
    if (!file) {
      updatedRentDetails[index] = { ...updatedRentDetails[index], rentReceipt: null };
      setRentDetails(updatedRentDetails);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, or PDF files are allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size must be less than 2MB');
      return;
    }

    updatedRentDetails[index] = { ...updatedRentDetails[index], rentReceipt: file };
    setRentDetails(updatedRentDetails);
  };

  const validateSubmission = () => {
    const invalidRentDetails = rentDetails.some(
      item => item.declaredRent > 0 && (
        !item.cityType ||
        !item.landlordName ||
        !item.landlordAddress ||
        (item.declaredRent > 100000 && !item.landlordPanNumber) ||
        (!item.rentReceipt && !item.existingRentReceipt)
      )
    );

    if (invalidRentDetails) {
      toast.error('Please provide all required fields (city type, landlord name, address, PAN if rent > ₹1,00,000, and rent receipt) for non-zero rent entries');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateSubmission()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('schoolId', schoolId);
      formData.append('employeeId', employeeId);
      formData.append('academicYear', academicYear);
      formData.append('status', status);

      rentDetails.forEach((item, index) => {
        formData.append(`rentDetails[${index}][month]`, item.month);
        formData.append(`rentDetails[${index}][declaredRent]`, item.declaredRent);
        formData.append(`rentDetails[${index}][cityType]`, item.cityType || '');
        formData.append(`rentDetails[${index}][landlordName]`, item.landlordName || '');
        formData.append(`rentDetails[${index}][landlordPanNumber]`, item.landlordPanNumber || '');
        formData.append(`rentDetails[${index}][landlordAddress]`, item.landlordAddress || '');
        formData.append(`rentDetails[${index}][monthStatus]`, item.monthStatus || 'Pending'); // Include monthStatus
        if (item.existingRentReceipt) {
          formData.append(`rentDetails[${index}][existingRentReceipt]`, item.existingRentReceipt);
        }
        if (item.rentReceipt instanceof File) {
          formData.append(`rentReceipts[${index}]`, item.rentReceipt);
        }
      });

      const response = await postAPI(
        `/post-rent-details/${schoolId}/${employeeId}`,
        formData,
        { 'Content-Type': 'multipart/form-data' },
        true
      );

      if (!response.hasError) {
        toast.success("Rent details submitted successfully!");
        fetchRentDetails(schoolId, employeeId);
      } else {
        toast.error(response.message || "Failed to submit rent details");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred while submitting the rent details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  const getFileName = (rentReceipt, existingRentReceipt) => {
    if (rentReceipt instanceof File) {
      return rentReceipt.name.length > 25 ? rentReceipt.name.slice(0, 25) + '...' : rentReceipt.name;
    }
    if (existingRentReceipt) {
      const fullName = existingRentReceipt.split('\\').pop().split('/').pop() || 'Existing file';
      return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
    }
    return 'No file';
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Employee Rent Details
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary ms-2 custom-submit-button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="table-responsive mb-4">
                  <table className="border border-dark mb-4 table table-hover">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Month</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Declared Rent</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">City Type</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord Name</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord PAN</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord Address</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Rent Receipt</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Action</th>
                        <th className="text-center align-content-center border border-dark p-2 ">Actual HRA Received</th>
                        <th className="text-center align-content-center border border-dark p-2 ">Actual Rent Paid</th>
                        <th className="text-center align-content-center border border-dark p-2 ">Basic Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rentDetails.map((item, index) => (
                        <tr key={index} className='payroll-table-body'>
                          <td className="text-center align-content-center border border-dark p-2">{item.month}</td>
                          <td className="align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={formatCurrency(item.declaredRent)}
                              onChange={(e) => handleInputChange(index, 'declaredRent', e.target.value)}
                              required={item.declaredRent > 0}
                            />
                          </td>
                          <td className="align-content-center border border-dark p-2">
                            <select
                              className="form-control payroll-input-border"
                              value={item.cityType}
                              onChange={(e) => handleInputChange(index, 'cityType', e.target.value)}
                              required={item.declaredRent > 0}
                            >
                              <option value="">Select City Type</option>
                              <option value="Metro">Metro</option>
                              <option value="Non-Metro">Non-Metro</option>
                            </select>
                          </td>
                          <td className="align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border"
                              value={item.landlordName}
                              onChange={(e) => handleInputChange(index, 'landlordName', e.target.value)}
                              required={item.declaredRent > 0}
                            />
                          </td>
                          <td className="align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border"
                              value={item.landlordPanNumber}
                              onChange={(e) => handleInputChange(index, 'landlordPanNumber', e.target.value)}
                              required={item.declaredRent > 100000}
                            />
                          </td>
                          <td className="align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border"
                              value={item.landlordAddress}
                              onChange={(e) => handleInputChange(index, 'landlordAddress', e.target.value)}
                              required={item.declaredRent > 0}
                            />
                          </td>
                          <td className="align-content-center border border-dark p-2">
                            <div className="d-flex align-items-center">
                              <input
                                type="file"
                                className="form-control payroll-input-border me-2"
                                accept="image/*,application/pdf"
                                onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                required={item.declaredRent > 0 && !item.rentReceipt && !item.existingRentReceipt}
                              />
                            </div>
                            {(item.rentReceipt || item.existingRentReceipt) && (
                              <div className="mt-2">
                                <small>{getFileName(item.rentReceipt, item.existingRentReceipt)}</small>
                              </div>
                            )}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                             {index > 0 && (
                               <button
                                 type="button"
                                 className="btn btn-primary fs-4 custom-submit-button"
                                 data-bs-toggle="tooltip"
                                 data-bs-placement="left"
                                 title="Auto fill same previous month's data"
                                 onClick={() => {
                                   const updatedRentDetails = [...rentDetails];
                                   updatedRentDetails[index] = {
                                     ...updatedRentDetails[index - 1],
                                     month: updatedRentDetails[index].month,
                                     rentReceipt: null,
                                     existingRentReceipt: updatedRentDetails[index].existingRentReceipt
                                   };
                                   setRentDetails(updatedRentDetails);
                                   calculateTotals(updatedRentDetails);
                                 }}
                               >
                                 <MdOutlineAutorenew />
                               </button>
                             )}
                           </td>
                          <td className="align-content-center border border-dark p-2 text-end">
                            {formatCurrency(item.monthActualHRAReceived)}
                          </td>
                          <td className="align-content-center border border-dark p-2 text-end">
                            {formatCurrency(item.monthActualRentPaid)}
                          </td>
                          <td className="align-content-center border border-dark p-2 text-end">
                            {formatCurrency((item.monthBasicSalaryCity))} 
                            {/* //.toFixed(0) */}
                          </td>
                        </tr>
                      ))}
                      <tr className='payroll-table-body it-declaration-section-bg'>
                        <td className="text-center align-content-center border fw-bold border-dark p-2">Total</td>
                        <td className="text-end align-content-center border fw-bold border-dark p-2">{formatCurrency(totals.declaredRent)}</td>
                        <td className="align-content-center border fw-bold border-dark p-2"></td>
                        <td className="align-content-center fw-bold border border-dark p-2"></td>
                        <td className="align-content-center fw-bold border border-dark p-2"></td>
                        <td className="align-content-center fw-bold border border-dark p-2"></td>
                        <td className="align-content-center fw-bold border border-dark p-2"></td>
                        <td className="align-content-center fw-bold border border-dark p-2"></td>
                        <td className="text-end align-content-center fw-bold border border-dark p-2">{formatCurrency(totals.actualHRAReceived)}</td>
                        <td className="text-end align-content-center fw-bold border border-dark p-2">{formatCurrency(totals.declaredRent)}</td>
                        <td className="text-end align-content-center fw-bold border border-dark p-2">{formatCurrency((totals.totalMonthBasicSalaryMetro + totals.totalMonthBasicSalaryNonMetro).toFixed(0))}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer border-top" style={{ overflowX: "auto" }}>
                  <div className="d-flex justify-content-end mt-3">
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
     
               <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Calculation of Metro
                  </h4>
                </div>
              </div>

              <div className="table-responsive mb-4">
                <table className="border border-dark mb-4 table table-hover">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="text-center align-content-center border border-dark p-2 text-nowrap">Particulars</th>
                      <th className="text-center align-content-center border border-dark p-2 text-nowrap">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">HRA Received (A)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualHRAReceivedMetro)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">Rent Paid - 10% of Basic Salary (B)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.actualRentPaidMetro).toFixed(0))}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">Rent Paid</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.totalMonthActualRentPaidMetro)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2"> 10% of Basic Salary (Metro)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.totalMonthBasicSalaryMetro * 0.1).toFixed(0))}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">50% of Basic Salary (C)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.basicSalaryMetro).toFixed(0))}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">HRA Exemption (Lower of A,B,C)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.hraExemptionMetro).toFixed(0))}</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>

               <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Calculation of Non-Metro
                  </h4>
                </div>
              </div>

              <div className="table-responsive mb-4">
                <table className="border border-dark mb-4 table table-hover">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="text-center align-content-center border border-dark p-2 text-nowrap">Particulars</th>
                      <th className="text-center align-content-center border border-dark p-2 text-nowrap">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">HRA Received (A) </td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualHRAReceivedNonMetro)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">Rent Paid - 10% of Basic Salary (B) </td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.actualRentPaidNonMetro).toFixed(0))}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">Rent Paid</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.totalMonthActualRentPaidNonMetro).toFixed(0))}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">10% of Basic Salary</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.totalMonthBasicSalaryNonMetro * 0.1).toFixed(0))}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">40% of Basic Salary (C)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.basicSalaryNonMetro).toFixed(0))}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">HRA Exemption (Lower of A,B,C)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.hraExemptionNonMetro).toFixed(0))}</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>

              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                   Total Calculation 
                  </h4>
                </div>
              </div>

              <div className="table-responsive mb-4">
                <table className="border border-dark mb-4 table table-hover">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="text-center align-content-center fw-bold border border-dark p-2 text-nowrap">Particulars</th>
                      <th className="text-center align-content-center border border-dark p-2 text-nowrap">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border fw-bold border-dark p-2">Total HRA Received</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.actualHRAReceived).toFixed(0))}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center fw-bold border border-dark p-2">Total Rent Paid</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.actualRentPaid).toFixed(0))}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center fw-bold border border-dark p-2">Total Basic Salary</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.basicSalaryCity).toFixed(0))}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center fw-bold border border-dark p-2">Total HRA Exemption</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency((totals.hraExemption).toFixed(0))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeRentDetails;