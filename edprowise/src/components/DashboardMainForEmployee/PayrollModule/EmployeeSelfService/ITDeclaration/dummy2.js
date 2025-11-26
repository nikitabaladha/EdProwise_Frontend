// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';
// import putAPI from '../../../../../api/putAPI';

// const EmployeeItDeclaration = () => {
//     const navigate = useNavigate();
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [employeeDetails, setEmployeeDetails] = useState({});
//     const [academicYear] = useState('2025-26');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const [section80C, setSection80C] = useState({
//         items: [
//             {
//                 section: "80C",
//                 category: "Life Insurance Premium including Bima Nivesh( only Self , Spouse and children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Provident Fund",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Tuition Fees",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Term Deposits(Bank tax saving FD)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Sukanya Samriddhi Account",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Housing Loan Principal/Stamp Duty & Registration",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Unit Link Insurance Plan / Infrastructure Bond / National Saving Certificate / Accrued Interest on NSC",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Subscription To Notified Central Government Security (NSS) / Mutual Funds/ELSS and Others / Pension Fund",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },

//         ],
//         sectionLimit: 150000,
//         finalDeduction: 0
//     });

//     const [section80D, setSection80D] = useState({
//         items: [
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self,Spouse and Dependent Children (Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self,Spouse and Dependent Children (60 Years or Above )",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For parents(Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Parents (60 Years or Above)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Expenditure for Self (60 Years or Above) (If No Insurance Premium)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Expenditure for Parents ( 60 Years or Above) (If No Insurance Premium)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Preventive Health Checkup (Self, Family or Parents)",
//                 categoryLimit: 5000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },

//         ],
//         finalDeduction: 0
//     });


//     const [isBuyer, setIsBuyer] = useState(true);
//     const [isYes, setIsYes] = useState(true);
//     const [isYes1, setIsYes1] = useState(true);
//     const [isYes2, setIsYes2] = useState(true);


//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         if (!userDetails?.schoolId || !userDetails?.userId) {
//             toast.error('Authentication details missing');
//             return;
//         }
//         setSchoolId(userDetails.schoolId);
//         setEmployeeId(userDetails.userId);

//         fetchEmployeeData(userDetails.schoolId, userDetails.userId);
//     }, [academicYear]);

//     const fetchEmployeeData = async (schoolId, empId) => {
//         try {
//             const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//             if (!employeeRes.hasError && employeeRes.data?.data) {
//                 setEmployeeDetails(employeeRes.data.data);
//             }
//         } catch (error) {
//             toast.error("Failed to fetch leave details");
//         }
//     };

//     const handleToggle = () => {
//         setIsBuyer(!isBuyer);
//     };

//     const handleToggleYes = () => {
//         setIsYes(!isYes);
//     };

//     const handleToggleYes1 = () => {
//         setIsYes1(!isYes1);
//     };

//     const handleToggleYes2 = () => {
//         setIsYes2(!isYes2);
//     };

//     // Section 80C handle change
//    const handle80CInputChange = (index, field, value) => {
//         const updatedItems = [...section80C.items];
//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: field === 'proofSubmitted' 
//                 ? Number(value.replace(/,/g, '')) || 0
//                 : value
//         };

//         setSection80C({
//             ...section80C,
//             items: updatedItems
//         });
//     };

//      // Updated handle80CFileUpload with better validation
//     const handle80CFileUpload = (index, file) => {
//         if (!file) {
//             const updatedItems = [...section80C.items];
//             updatedItems[index] = {
//                 ...updatedItems[index],
//                 proofDocument: null
//             };
//             setSection80C({ ...section80C, items: updatedItems });
//             return;
//         }

//         const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//         if (!validTypes.includes(file.type)) {
//             toast.error('Only JPEG, PNG, or PDF files are allowed');
//             return;
//         }

//         if (file.size > 2 * 1024 * 1024) {
//             toast.error('File size must be less than 2MB');
//             return;
//         }

//         const updatedItems = [...section80C.items];
//         updatedItems[index] = {
//             ...updatedItems[index],
//             proofDocument: file
//         };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     // Section 80D input change handler
//     const handle80DInputChange = (index, field, value) => {
//         const updatedItems = [...section80D.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         // Update the item
//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: numericValue
//         };

//         // Apply mutual exclusion rules
//         // Group 1: Indexes 0, 1, 4 (Self/Spouse/Children)
//         if ([0, 1, 4].includes(index)) {
//             if (numericValue > 0) {
//                 // Disable other fields in this group
//                 [0, 1, 4].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         // Clear value if disabling
//                         updatedItems[i].proofSubmitted = 0;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 // Enable all fields in this group when value is cleared
//                 [0, 1, 4].forEach(i => {
//                     updatedItems[i].disabled = false;
//                 });
//             }
//         }

//         // Group 2: Indexes 2, 3, 5 (Parents)
//         if ([2, 3, 5].includes(index)) {
//             if (numericValue > 0) {
//                 // Disable other fields in this group
//                 [2, 3, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         // Clear value if disabling
//                         updatedItems[i].proofSubmitted = 0;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 // Enable all fields in this group when value is cleared
//                 [2, 3, 5].forEach(i => {
//                     updatedItems[i].disabled = false;
//                 });
//             }
//         }

//         // Calculate new totals
//         const { updatedItems: calculatedItems, finalDeduction } = calculate80DTotals(updatedItems);

//         setSection80D({
//             ...section80D,
//             items: calculatedItems,
//             finalDeduction
//         });
//     };

//     const handle80DFileUpload = (index, file) => {
//         if (!file) {
//             const updatedItems = [...section80D.items];
//             updatedItems[index] = {
//                 ...updatedItems[index],
//                 proofDocument: null
//             };
//             setSection80D({ ...section80D, items: updatedItems });
//             return;
//         }

//         const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//         if (!validTypes.includes(file.type)) {
//             toast.error('Only JPEG, PNG, or PDF files are allowed');
//             return;
//         }

//         if (file.size > 2 * 1024 * 1024) {
//             toast.error('File size must be less than 2MB');
//             return;
//         }

//         const updatedItems = [...section80D.items];
//         updatedItems[index] = {
//             ...updatedItems[index],
//             proofDocument: file
//         };
//         setSection80D({ ...section80D, items: updatedItems });
//     };
//     //  For section 80C
//     const calculate80CTotals = () => {
//         const totalProofSubmitted = section80C.items.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = Math.min(totalProofSubmitted, section80C.sectionLimit);

//         return {
//             totalProofSubmitted, // Total user entered (can exceed limit)
//             finalDeduction      // Capped at limit (for tax calculation)
//         };
//     };

//     // For Section 80D
//     const calculate80DTotals = (items) => {
//         const updatedItems = items.map(item => ({
//             ...item,
//             categoryFinalDeduction: Math.min(item.proofSubmitted, item.categoryLimit)
//         }));

//         const totalProofSubmitted = updatedItems.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = updatedItems.reduce(
//             (sum, item) => sum + (item.categoryFinalDeduction || 0),
//             0
//         );

//         return {
//             updatedItems,
//             totalProofSubmitted, // Total user entered
//             finalDeduction      // Total after applying limits
//         };
//     };
//    const validateSubmission = () => {
//         const invalid80C = section80C.items.some(item => 
//             item.proofSubmitted > 0 && !item.proofDocument
//         );
        
//         const invalid80D = section80D.items.some(item => 
//             item.proofSubmitted > 0 && !item.proofDocument
//         );

//         if (invalid80C || invalid80D) {
//             toast.error('Please upload documents for all submitted proofs');
//             return false;
//         }

//         return true;
//     };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);

//   if (!validateSubmission()) {
//     setIsSubmitting(false);
//     return;
//   }

//   try {
//     const formData = new FormData();
    
//     // Basic info
//     formData.append('schoolId', schoolId);
//     formData.append('employeeId', employeeId);
//     formData.append('academicYear', academicYear);
//     formData.append('taxRegime', employeeDetails.taxRegime);
//     formData.append('panNumber', employeeDetails.panNumber);

//     // Section 80C data
//     section80C.items.forEach((item, index) => {
//       formData.append(`section80C[${index}][section]`, item.section);
//       formData.append(`section80C[${index}][category]`, item.category);
//       formData.append(`section80C[${index}][proofSubmitted]`, item.proofSubmitted);
//       formData.append(`section80C[${index}][status]`, item.status);
//       formData.append(`section80C[${index}][adminRemarks]`, item.adminRemarks || '');
//       if (item.proofDocument) {
//         formData.append(`section80CProofs[${index}]`, item.proofDocument);
//       }
//     });
//     formData.append('section80C[sectionLimit]', section80C.sectionLimit);

//     // Section 80D data
//     section80D.items.forEach((item, index) => {
//       formData.append(`section80D[${index}][section]`, item.section);
//       formData.append(`section80D[${index}][category]`, item.category);
//       formData.append(`section80D[${index}][categoryLimit]`, item.categoryLimit);
//       formData.append(`section80D[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction);
//       formData.append(`section80D[${index}][proofSubmitted]`, item.proofSubmitted);
//       formData.append(`section80D[${index}][status]`, item.status);
//       formData.append(`section80D[${index}][adminRemarks]`, item.adminRemarks || '');
//       if (item.proofDocument) {
//         formData.append(`section80DProofs[${index}]`, item.proofDocument);
//       }
//     });

//     // Log FormData for debugging
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value instanceof File ? value.name : value}`);
//     }

//     const response = await postAPI(
//       `/it-declaration/${schoolId}/${employeeId}`,
//       formData,
//       { 'Content-Type': 'multipart/form-data' },
//       true
//     );

//     if (!response.hasError) {
//       toast.success("IT Declaration submitted successfully!");
//     } else {
//       toast.error(response.message || "Failed to submit declaration");
//     }
//   } catch (error) {
//     console.error("Submission error:", error);
//     toast.error("An error occurred while submitting the declaration");
//   } finally {
//     setIsSubmitting(false);
//   }
// };
// const { totalProofSubmitted: total80C, finalDeduction: final80C } = calculate80CTotals();
//     const { totalProofSubmitted: total80D, finalDeduction: final80D } = calculate80DTotals(section80D.items);


//     const handleNavigateToRentDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/rent-details");
//     };

//     // Format currency for display
//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN').format(amount);
//     };


//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-xl-12">
//                         <div className="card m-2">
//                             <div className="card-body custom-heading-padding">
//                                 <div className="container">
//                                     <div className="card-header mb-2">
//                                         <h4 className="payroll-title text-center mb-0">
//                                             Income Tax (IT) Declaration
//                                         </h4>
//                                     </div>
//                                 </div>
//                                 <form onSubmit={handleSubmit}>
//                                     {/* <div className='d-flex'> */}
//                                     <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                                         <div className="col-md-8">
//                                             <p className='text-dark payroll-box-text'>
//                                                 <strong>Employee Name : </strong> {employeeDetails.employeeName || 'N/A'}
//                                             </p>

//                                         </div>

//                                         <div className="col-md-4">
//                                             <p className='text-dark payroll-box-text' >
//                                                 <strong>Employee ID : </strong>{employeeDetails.employeeId || 'N/A'}
//                                             </p>
//                                         </div>

//                                         <div className="col-md-4">

//                                             <p className='text-dark payroll-box-text'>
//                                                 <strong>Tax Regime :</strong> {employeeDetails.taxRegime === "new" ? "New" : "Old" || 'N/A'}
//                                             </p>
//                                         </div>

//                                         <div className="col-md-4">
//                                             <p className='text-dark payroll-box-text' >
//                                                 <strong> PAN No :</strong> {employeeDetails.panNumber || 'N/A'}
//                                             </p>
//                                         </div>

//                                         <div className="col-md-4">
//                                             <p className='text-dark' >
//                                                 <label for="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year : </label>
//                                                 <select id="yearSelect" className="custom-select" aria-label="Select Year" style={{ marginLeft: "5px" }}>
//                                                     <option selected>2025-26</option>
//                                                     <option>2026-27</option>
//                                                     <option>2027-28</option>
//                                                     <option>2028-29</option>
//                                                     <option>2029-30</option>
//                                                 </select>
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="table-responsive mb-4">
//                                         <table className="border border-dark mb-4 table table-hover " >
//                                             <thead className="bg-light-subtle">
//                                                 <tr className="payroll-table-header">
//                                                     <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "300px" }}>
//                                                         Investment
//                                                     </th>
//                                                     <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>
//                                                         Limit
//                                                     </th>
//                                                     {/* <th className="text-center align-content-center border border-dark p-2 text-nowrap">
//                                                         Declared
//                                                     </th> */}
//                                                     <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "130px" }}>
//                                                         Proof Sub.
//                                                     </th>
//                                                     <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
//                                                         Final Ded.
//                                                     </th>

//                                                     <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "200px" }}>
//                                                         Upload Document
//                                                     </th>
//                                                     <th className="text-center align-content-center border text-nowrap border-dark p-2" style={{ width: "120px" }}>
//                                                         Status
//                                                     </th>
//                                                     <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "200px" }}>
//                                                         Admin Remarks
//                                                     </th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 <tr className='it-declaration-section-bg payroll-box-text fw-bold'  >
//                                                     <td className="align-content-center border border-dark fw-bold p-2">
//                                                         Section 80C
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         1,50,000
//                                                     </td>

//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         {formatCurrency(total80C)}
//                                                     </td>

//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         {formatCurrency(final80C)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 {section80C.items.map((item, index) => (
//                                                     <tr key={index} className='payroll-table-body'>
//                                                         <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                         <td className="text-end align-content-center border border-dark p-2"></td>
//                                                         <td className="text-end align-content-center border border-dark p-2">
//                                                             <input
//                                                                 type="text"
//                                                                 className="form-control payroll-table-body payroll-input-border text-end"
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 onChange={(e) => handle80CInputChange(index, 'proofSubmitted', e.target.value)}
//                                                                 required
//                                                             />
//                                                         </td>
//                                                         <td className="text-end align-content-center border border-dark p-2"></td>
//                                                         <td className="text-center align-content-center border border-dark p-2">
//                                                             <input
//                                                                 type="file"
//                                                                 className="form-control payroll-input-border"
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0}
//                                                             />
//                                                         </td>
//                                                         <td className="text-end align-content-center border border-dark p-2">
//                                                             <input
//                                                                 type="text"
//                                                                 className="form-control payroll-table-body payroll-input-border text-end"
//                                                                 value={item.status}
//                                                                 readOnly
//                                                             />
//                                                         </td>
//                                                         <td className="text-end align-content-center border border-dark p-2">
//                                                             {item.adminRemarks}
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                                 <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                     <td className="align-content-center border border-dark fw-bold p-2">
//                                                         Section 80D
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                         {/* Total limit can be shown here if needed */}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                         {formatCurrency(total80D)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                         {formatCurrency(final80D)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 </tr>
//                                                 {section80D.items.map((item, index) => (
//                                                     <tr key={index} className='payroll-table-body'>
//                                                         <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                         <td className="text-end align-content-center border border-dark p-2">
//                                                             {formatCurrency(item.categoryLimit)}
//                                                         </td>
//                                                         <td className="text-end align-content-center border border-dark p-2">
//                                                             {/* <input
//                                                                 type="text"
//                                                                 className="form-control payroll-table-body payroll-input-border text-end"
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
//                                                                 required
//                                                             /> */}

//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         </td>
//                                                         <td className="text-end align-content-center border border-dark p-2">
//                                                             {formatCurrency(item.categoryFinalDeduction)}
//                                                         </td>
//                                                         <td className="text-center align-content-center border border-dark p-2">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border  ${item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         </td>
//                                                         <td className="text-end align-content-center border border-dark p-2">
//                                                             <input
//                                                                 type="text"
//                                                                 className="form-control payroll-table-body payroll-input-border text-end"
//                                                                 value={item.status}
//                                                                 readOnly
//                                                             />
//                                                         </td>
//                                                         <td className="text-end align-content-center border border-dark p-2">
//                                                             {item.adminRemarks}
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                                 <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
//                                                     <td className="align-content-center border border-dark fw-bold p-2" >
//                                                         Other Section
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     {/* <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td> */}
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>

//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>

//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Deduction For Dependent With Disability( Form 10-I) (Flat Dedcution of INR 75000) (Yes/No)
//                                                         <div
//                                                             className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                                             style={{
//                                                                 maxWidth: "fit-content"
//                                                             }}
//                                                         >
//                                                             <button
//                                                                 className={`btn ${isBuyer ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                 type='button'
//                                                                 style={{
//                                                                     backgroundColor: isBuyer ? 'white' : 'black',
//                                                                     borderColor: isBuyer ? 'black' : '',
//                                                                     color: isBuyer ? 'black' : 'white',
//                                                                     maxWidth: "fit-content",
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none"
//                                                                 }}
//                                                                 onClick={handleToggle}
//                                                             >
//                                                                 Yes
//                                                             </button>
//                                                             <button
//                                                                 type='button'
//                                                                 className={`btn ${!isBuyer ? 'btn-primary' : 'btn-dark'}  rounded-pill`}
//                                                                 style={{
//                                                                     backgroundColor: !isBuyer ? 'white' : 'black',
//                                                                     borderColor: !isBuyer ? 'black' : ' ',
//                                                                     color: !isBuyer ? 'black' : 'white',
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none",
//                                                                     maxWidth: "fit-content"
//                                                                 }}
//                                                                 onClick={handleToggle}
//                                                             >
//                                                                 No
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         75,000
//                                                     </td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
                                                            
//                                                         />
//                                                     </td> */}
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         // value={"50,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="file"
//                                                             className="form-control payroll-input-border"
//                                                             accept="image/*,application/pdf"
//                                                         // onChange={handleChange}

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Deduction For Dependent With Severe Disability( Form 10-I) (Flat dedcution of INR 125000) (Yes/No)
//                                                         <div
//                                                             className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                                             style={{
//                                                                 maxWidth: "fit-content"
//                                                             }}
//                                                         >
//                                                             <button
//                                                                 className={`btn ${isYes ? 'btn-primary' : 'btn-dark'}  rounded-pill`}
//                                                                 type='button'
//                                                                 style={{
//                                                                     backgroundColor: isYes ? 'white' : 'black',
//                                                                     borderColor: isYes ? 'black' : '',
//                                                                     color: isYes ? 'black' : 'white',
//                                                                     // color: 'black',
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none",
//                                                                     maxWidth: "fit-content"
//                                                                 }}
//                                                                 onClick={handleToggleYes}
//                                                             >
//                                                                 Yes
//                                                             </button>
//                                                             <button
//                                                                 type='button'
//                                                                 className={`btn ${!isYes ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                 style={{
//                                                                     backgroundColor: !isYes ? 'white' : 'black',
//                                                                     borderColor: !isYes ? 'black' : ' ',
//                                                                     color: !isYes ? 'black' : 'white',
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none",
//                                                                     maxWidth: "fit-content"
//                                                                 }}
//                                                                 onClick={handleToggleYes}
//                                                             >
//                                                                 No
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         1,25,000
//                                                     </td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
                                                            
//                                                         />
//                                                     </td> */}
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         // value={"50,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="file"
//                                                             className="form-control payroll-input-border"
//                                                             accept="image/*,application/pdf"
//                                                         // onChange={handleChange}

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body' >
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Deduction For Self Disability (Flat dedcution of INR 75000) (Yes/No)
//                                                         <div
//                                                             className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                                             style={{
//                                                                 maxWidth: "fit-content"
//                                                             }}
//                                                         >
//                                                             <button
//                                                                 className={`btn ${isYes1 ? 'btn-primary' : 'btn-dark'}  rounded-pill`}
//                                                                 type='button'
//                                                                 style={{
//                                                                     backgroundColor: isYes1 ? 'white' : 'black',
//                                                                     borderColor: isYes1 ? 'black' : '',
//                                                                     color: isYes1 ? 'black' : 'white',
//                                                                     maxWidth: "fit-content",
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none"
//                                                                 }}
//                                                                 onClick={handleToggleYes1}
//                                                             >
//                                                                 Yes
//                                                             </button>
//                                                             <button
//                                                                 type='button'
//                                                                 className={`btn ${!isYes1 ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                 style={{
//                                                                     backgroundColor: !isYes1 ? 'white' : 'black',
//                                                                     borderColor: !isYes1 ? 'black' : ' ',
//                                                                     color: !isYes1 ? 'black' : 'white',
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none",
//                                                                     maxWidth: "fit-content"
//                                                                 }}
//                                                                 onClick={handleToggleYes1}
//                                                             >
//                                                                 No
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         75,000
//                                                     </td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
                                                            
//                                                         />
//                                                     </td> */}
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         // value={"50,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="file"
//                                                             className="form-control payroll-input-border"
//                                                             accept="image/*,application/pdf"
//                                                         // onChange={handleChange}

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Deduction For Self Severe Disability (Flat dedcution of INR 125000) (Yes/No)
//                                                         <div
//                                                             className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                                             style={{
//                                                                 maxWidth: "fit-content"
//                                                             }}
//                                                         >
//                                                             <button
//                                                                 className={`btn ${isYes2 ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                 type='button'
//                                                                 style={{
//                                                                     backgroundColor: isYes2 ? 'white' : 'black',
//                                                                     borderColor: isYes2 ? 'black' : '',
//                                                                     color: isYes2 ? 'black' : 'white',
//                                                                     maxWidth: "fit-content",
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none"
//                                                                 }}
//                                                                 onClick={handleToggleYes2}
//                                                             >
//                                                                 Yes
//                                                             </button>
//                                                             <button
//                                                                 type='button'
//                                                                 className={`btn ${!isYes2 ? 'btn-primary' : 'btn-dark'}  rounded-pill`}
//                                                                 style={{
//                                                                     backgroundColor: !isYes2 ? 'white' : 'black',
//                                                                     borderColor: !isYes2 ? 'black' : ' ',
//                                                                     color: !isYes2 ? 'black' : 'white',
//                                                                     transition: 'all 0.4s ease-in-out',
//                                                                     boxShadow: "none",
//                                                                     maxWidth: "fit-content"
//                                                                 }}
//                                                                 onClick={handleToggleYes2}
//                                                             >
//                                                                 No
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         1,25,000
//                                                     </td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
                                                            
//                                                         />
//                                                     </td> */}
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         // value={"50,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="file"
//                                                             className="form-control payroll-input-border"
//                                                             accept="image/*,application/pdf"
//                                                         // onChange={handleChange}

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred , Maximum of INR 40000)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         40,000
//                                                     </td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
                                                            
//                                                         />
//                                                     </td> */}
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                             value={"10,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="file"
//                                                             className="form-control payroll-input-border"
//                                                             accept="image/*,application/pdf"
//                                                         // onChange={handleChange}

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body' >
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred , Maximum of INR 100000)
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         20,000
//                                                     </td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
                                                            
//                                                         />
//                                                     </td> */}
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                             value={"25,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="file"
//                                                             className="form-control payroll-input-border"
//                                                             accept="image/*,application/pdf"
//                                                         // onChange={handleChange}

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 p-2" >
//                                                         Interest On Educational Loan For Higher Studies (u/s 80E) - Self
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
                                                            
//                                                         />
//                                                     </td> */}
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                             value={"10,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>

//                                                     <td className="text-center align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="file"
//                                                             className="form-control payroll-input-border"
//                                                             accept="image/*,application/pdf"
//                                                         // onChange={handleChange}

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>

//                                                 <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                     <td className="align-content-center fw-bold border border-dark p-2" >
//                                                         HRA Exemption
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >

//                                                     </td>
//                                                     {/* <td className="text-center align-content-center border border-dark fw-bold p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
                                                            
//                                                             value={"10,000"}
//                                                         />
//                                                     </td> */}
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2" >
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end "

//                                                             value={"10,000"}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark fw-bold p-2" >
//                                                         <button
//                                                             type="button"
//                                                             className="btn btn-link p-0"
//                                                             onClick={handleNavigateToRentDetails}
//                                                             style={{
//                                                                 color: "red",
//                                                                 // textDecoration: "underline",
//                                                                 fontWeight: "bold",
//                                                                 fontSize: "1rem"
//                                                             }}
//                                                         >
//                                                             Enter Rent Details
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark fw-bold p-2" >
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>
//                                                 <tr className='payroll-table-body' >
//                                                     <td className="align-content-center border border-dark px-3 p-2" >

//                                                     </td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td> */}
//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2" >

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2" >

//                                                     </td>
//                                                 </tr>

//                                                 <tr >
//                                                     <td colSpan={8} className="align-content-center border border-dark fw-bold p-2" >
//                                                         I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
//                                                     </td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                     <div className="text-end">
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary custom-submit-button"
//                                             disabled={isSubmitting}
//                                         >
//                                             {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
//                                         </button>
//                                     </div>


//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default EmployeeItDeclaration;

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import putAPI from '../../../../../api/putAPI';

const EmployeeItDeclaration = () => {
    const navigate = useNavigate();
    const [schoolId, setSchoolId] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [academicYear] = useState('2025-26');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [section80C, setSection80C] = useState({
        items: [
            {
                section: "80C",
                category: "Life Insurance Premium including Bima Nivesh( only Self , Spouse and children)",
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Employee Provident Fund (EPF)",
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Public Provident Fund (PPF)",
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Tuition Fees ( For 2 Children)",
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "5 Year Bank Fixed Deposit",
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "5 Year Post office Time Deposit",
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Sukanya Samriddhi Account",
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Housing Loan Payment of Principal/Stamp Duty & Registration",
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Unit Link Insurance Plan / Infrastructure Bond / National Saving Certificate / Accrued Interest on NSC",
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Subscription to notified Central Government security (NSS) / Mutual Funds/ELSS and others / Pension Fund",
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },

        ],
        sectionLimit: 150000,
        finalDeduction: 0
    });

    const [section80D, setSection80D] = useState({
        items: [
            {
                section: "80D",
                category: "Medical Insurance Premium For Self,Spouse and Dependent Children (Age Below 60 Years)",
                categoryLimit: 25000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Medical Insurance Premium For Self,Spouse and Dependent Children (60 Years or Above )",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Medical Insurance Premium For parents(Age Below 60 Years)",
                categoryLimit: 25000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Medical Insurance Premium For Parents (60 Years or Above)",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Medical Expenditure for Self (60 Years or Above) (If No Insurance Premium)",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Medical Expenditure for Parents ( 60 Years or Above) (If No Insurance Premium)",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Preventive Health Checkup (Self, Family or Parents)",
                categoryLimit: 5000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },

        ],
        finalDeduction: 0
    });

    const [otherSections, setOtherSections] = useState({
        items: [
            {
                section: "Other",
                category: "Deduction For Dependent With Disability (Form 10-I) (Flat Dedcution of INR 75000) (Yes/No)",
                categoryLimit: 75000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
            {
                section: "Other",
                category: "Deduction For Dependent With Severe Disability (Form 10-I)",
                categoryLimit: 125000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
            {
                section: "Other",
                category: "Deduction For Self Disability",
                categoryLimit: 75000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
            {
                section: "Other",
                category: "Deduction For Self Severe Disability",
                categoryLimit: 125000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
            {
                section: "Other",
                category: "Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred , Maximum of INR 40000)",
                categoryLimit: 40000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "Other",
                category: "Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred , Maximum of INR 100000)",
                categoryLimit: 100000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "Other",
                category: "Interest on Educational Loan for Higher studies (u/s 80E) - Self, Spouse & Children [Allowed for 8 Years from repayment starts]",
                categoryLimit: 0,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: ""
            },

            {
                section: "Other",
                category: "Interest on Home Loan (u/s 80EE) ( Loan Sanctioned between April 2016 to Mar 2017)",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
            {
                section: "Section80EEA",
                category: "Interest on Home Loan (u/s 80EEA) ( Loan Sanctioned between April 2019 to Mar 2022) (Cost of House Less than 45 Lakh)",
                categoryLimit: 150000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },

        ]
    });

    const [section80EE, setSection80EE] = useState({
        items: [
            {
                section: "Section80EE",
                category: "Interest on Home Loan (u/s 80EE) ( Loan Sanctioned between April 2016 to Mar 2017)",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
        ]
    });

    const [section80EEA, setSection80EEA] = useState({
        items: [
            {
                section: "Section80EEA",
                category: "Interest on Home Loan ( Loan Sanctioned between April 2019 to Mar 2022) (Cost of House Less than 45 Lakh)",
                categoryLimit: 150000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
        ]
    });


    const [isBuyer, setIsBuyer] = useState(false);
    const [isYes, setIsYes] = useState(false);
    const [isYes1, setIsYes1] = useState(false);
    const [isYes2, setIsYes2] = useState(false);


    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (!userDetails?.schoolId || !userDetails?.userId) {
            toast.error('Authentication details missing');
            return;
        }
        setSchoolId(userDetails.schoolId);
        setEmployeeId(userDetails.userId);

        fetchEmployeeData(userDetails.schoolId, userDetails.userId);
    }, [academicYear]);

    const fetchEmployeeData = async (schoolId, empId) => {
        try {
            const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
            if (!employeeRes.hasError && employeeRes.data?.data) {
                setEmployeeDetails(employeeRes.data.data);
            }
        } catch (error) {
            toast.error("Failed to fetch leave details");
        }
    };

    const handleToggle = (index) => {
        const updatedItems = [...otherSections.items];
        const enabled = !updatedItems[index].enabled;
        updatedItems[index] = {
            ...updatedItems[index],
            enabled,
            proofSubmitted: enabled ? updatedItems[index].categoryLimit : 0,
            proofDocument: enabled ? updatedItems[index].proofDocument : null,
            // categoryFinalDeduction: item.categoryLimit > 0 ? Math.min(item.proofSubmitted, item.categoryLimit) : item.proofSubmitted
        };

        setOtherSections({ ...otherSections, items: updatedItems });

        if (index === 0) setIsBuyer(enabled);
        if (index === 1) setIsYes(enabled);
        if (index === 2) setIsYes1(enabled);
        if (index === 3) setIsYes2(enabled);
    };

    // Section 80C handle change
    const handle80CInputChange = (index, field, value) => {
        const updatedItems = [...section80C.items];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: field === 'proofSubmitted'
                ? Number(value.replace(/,/g, '')) || 0
                : value
        };

        setSection80C({
            ...section80C,
            items: updatedItems
        });
    };

    // Updated handle80CFileUpload with better validation
    const handle80CFileUpload = (index, file) => {
        if (!file) {
            const updatedItems = [...section80C.items];
            updatedItems[index] = {
                ...updatedItems[index],
                proofDocument: null
            };
            setSection80C({ ...section80C, items: updatedItems });
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

        const updatedItems = [...section80C.items];
        updatedItems[index] = {
            ...updatedItems[index],
            proofDocument: file
        };
        setSection80C({ ...section80C, items: updatedItems });
    };

    // Section 80D input change handler
    const handle80DInputChange = (index, field, value) => {
        const updatedItems = [...section80D.items];
        const numericValue = Number(value.replace(/,/g, '')) || 0;

        // Update the item
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: numericValue
        };

        // Apply mutual exclusion rules
        // Group 1: Indexes 0, 1, 4 (Self/Spouse/Children)
        if ([0, 1, 4].includes(index)) {
            if (numericValue > 0) {
                // Disable other fields in this group
                [0, 1, 4].forEach(i => {
                    if (i !== index) {
                        updatedItems[i].disabled = true;
                        // Clear value if disabling
                        updatedItems[i].proofSubmitted = 0;
                    } else {
                        updatedItems[i].disabled = false;
                    }
                });
            } else {
                // Enable all fields in this group when value is cleared
                [0, 1, 4].forEach(i => {
                    updatedItems[i].disabled = false;
                });
            }
        }

        // Group 2: Indexes 2, 3, 5 (Parents)
        if ([2, 3, 5].includes(index)) {
            if (numericValue > 0) {
                // Disable other fields in this group
                [2, 3, 5].forEach(i => {
                    if (i !== index) {
                        updatedItems[i].disabled = true;
                        // Clear value if disabling
                        updatedItems[i].proofSubmitted = 0;
                    } else {
                        updatedItems[i].disabled = false;
                    }
                });
            } else {
                // Enable all fields in this group when value is cleared
                [2, 3, 5].forEach(i => {
                    updatedItems[i].disabled = false;
                });
            }
        }

        // Calculate new totals
        const { updatedItems: calculatedItems, finalDeduction } = calculate80DTotals(updatedItems);

        setSection80D({
            ...section80D,
            items: calculatedItems,
            finalDeduction
        });
    };

    const handle80DFileUpload = (index, file) => {
        if (!file) {
            const updatedItems = [...section80D.items];
            updatedItems[index] = {
                ...updatedItems[index],
                proofDocument: null
            };
            setSection80D({ ...section80D, items: updatedItems });
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

        const updatedItems = [...section80D.items];
        updatedItems[index] = {
            ...updatedItems[index],
            proofDocument: file
        };
        setSection80D({ ...section80D, items: updatedItems });
    };

    const handleOtherSectionsInputChange = (index, field, value) => {
        const updatedItems = [...otherSections.items];
        const numericValue = Number(value.replace(/,/g, '')) || 0;


        updatedItems[index] = {
            ...updatedItems[index],
            [field]: numericValue
        };

        const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);

        setOtherSections({
            ...otherSections,
            items: calculatedItems,
            finalDeduction
        });
    };

    const handleOtherSectionsFileUpload = (index, file) => {
        if (!file) {
            const updatedItems = [...otherSections.items];
            updatedItems[index] = {
                ...updatedItems[index],
                proofDocument: null
            };
            setOtherSections({ ...otherSections, items: updatedItems });
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

        const updatedItems = [...otherSections.items];
        updatedItems[index] = {
            ...updatedItems[index],
            proofDocument: file
        };
        setOtherSections({ ...otherSections, items: updatedItems });
    };

    //  For section 80C
    const calculate80CTotals = () => {
        const totalProofSubmitted = section80C.items.reduce(
            (sum, item) => sum + (item.proofSubmitted || 0),
            0
        );
        const finalDeduction = Math.min(totalProofSubmitted, section80C.sectionLimit);

        return {
            totalProofSubmitted, // Total user entered (can exceed limit)
            finalDeduction      // Capped at limit (for tax calculation)
        };
    };

    // For Section 80D
    const calculate80DTotals = (items) => {
        const updatedItems = items.map(item => ({
            ...item,
            categoryFinalDeduction: Math.min(item.proofSubmitted, item.categoryLimit)
        }));

        const totalProofSubmitted = updatedItems.reduce(
            (sum, item) => sum + (item.proofSubmitted || 0),
            0
        );
        const finalDeduction = updatedItems.reduce(
            (sum, item) => sum + (item.categoryFinalDeduction || 0),
            0
        );

        return {
            updatedItems,
            totalProofSubmitted, // Total user entered
            finalDeduction      // Total after applying limits
        };
    };

    const calculateOtherSectionsTotals = (items) => {
        const updatedItems = items.map(item => ({
            ...item,
            categoryFinalDeduction: item.categoryLimit > 0 ? Math.min(item.proofSubmitted, item.categoryLimit) : item.proofSubmitted
        }));

        const totalProofSubmitted = updatedItems.reduce(
            (sum, item) => sum + (item.proofSubmitted || 0),
            0
        );
        const finalDeduction = updatedItems.reduce(
            (sum, item) => sum + (item.categoryFinalDeduction || 0),
            0
        );

        return {
            updatedItems,
            totalProofSubmitted,
            finalDeduction
        };
    };

    const validateSubmission = () => {
        const invalid80C = section80C.items.some(item =>
            item.proofSubmitted > 0 && !item.proofDocument
        );

        const invalid80D = section80D.items.some(item =>
            item.proofSubmitted > 0 && !item.proofDocument
        );

        const invalidOther = otherSections.items.some(item =>
            item.proofSubmitted > 0 && !item.proofDocument
        );

        if (invalid80C || invalid80D || invalidOther) {
            toast.error('Please upload documents for all submitted proofs');
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
            formData.append('taxRegime', employeeDetails.taxRegime);
            formData.append('panNumber', employeeDetails.panNumber);

            section80C.items.forEach((item, index) => {
                formData.append(`section80C[${index}][section]`, item.section);
                formData.append(`section80C[${index}][category]`, item.category);
                formData.append(`section80C[${index}][proofSubmitted]`, item.proofSubmitted);
                formData.append(`section80C[${index}][status]`, item.status);
                formData.append(`section80C[${index}][adminRemarks]`, item.adminRemarks || '');
                if (item.proofDocument) {
                    formData.append(`section80CProofs[${index}]`, item.proofDocument);
                }
            });
            formData.append('section80C[sectionLimit]', section80C.sectionLimit);

            section80D.items.forEach((item, index) => {
                formData.append(`section80D[${index}][section]`, item.section);
                formData.append(`section80D[${index}][category]`, item.category);
                formData.append(`section80D[${index}][categoryLimit]`, item.categoryLimit);
                formData.append(`section80D[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction);
                formData.append(`section80D[${index}][proofSubmitted]`, item.proofSubmitted);
                formData.append(`section80D[${index}][status]`, item.status);
                formData.append(`section80D[${index}][adminRemarks]`, item.adminRemarks || '');
                if (item.proofDocument) {
                    formData.append(`section80DProofs[${index}]`, item.proofDocument);
                }
            });

            otherSections.items.forEach((item, index) => {
                formData.append(`otherSections[${index}][section]`, item.section);
                formData.append(`otherSections[${index}][category]`, item.category);
                formData.append(`otherSections[${index}][categoryLimit]`, item.categoryLimit || 0);
                formData.append(`otherSections[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction || 0);
                formData.append(`otherSections[${index}][proofSubmitted]`, item.proofSubmitted);
                formData.append(`otherSections[${index}][status]`, item.status);
                formData.append(`otherSections[${index}][adminRemarks]`, item.adminRemarks || '');
                if (item.proofDocument) {
                    formData.append(`otherSectionsProofs[${index}]`, item.proofDocument);
                }
            });

            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value instanceof File ? value.name : value}`);
            // }

            const response = await postAPI(
                `/it-declaration/${schoolId}/${employeeId}`,
                formData,
                { 'Content-Type': 'multipart/form-data' },
                true
            );

            if (!response.hasError) {
                toast.success("IT Declaration submitted successfully!");
            } else {
                toast.error(response.message || "Failed to submit declaration");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An error occurred while submitting the declaration");
        } finally {
            setIsSubmitting(false);
        }
    };

    const { totalProofSubmitted: total80C, finalDeduction: final80C } = calculate80CTotals();
    const { totalProofSubmitted: total80D, finalDeduction: final80D } = calculate80DTotals(section80D.items);
    const { totalProofSubmitted: totalOther, finalDeduction: finalOther } = calculateOtherSectionsTotals(otherSections.items);


    const handleNavigateToRentDetails = () => {
        navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/rent-details");
    };

    // Format currency for display
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN').format(amount);
    };


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card m-2">
                            <div className="card-body custom-heading-padding">
                                <div className="container">
                                    <div className="card-header mb-2">
                                        <h4 className="payroll-title text-center mb-0">
                                            Income Tax (IT) Declaration
                                        </h4>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    {/* <div className='d-flex'> */}
                                    <div className="row m-0 mb-2 pt-2 salary-slip-box">
                                        <div className="col-md-8">
                                            <p className='text-dark payroll-box-text'>
                                                <strong>Employee Name : </strong> {employeeDetails.employeeName || 'N/A'}
                                            </p>

                                        </div>

                                        <div className="col-md-4">
                                            <p className='text-dark payroll-box-text' >
                                                <strong>Employee ID : </strong>{employeeDetails.employeeId || 'N/A'}
                                            </p>
                                        </div>

                                        <div className="col-md-4">

                                            <p className='text-dark payroll-box-text'>
                                                <strong>Tax Regime :</strong> {employeeDetails.taxRegime === "new" ? "New" : "Old" || 'N/A'}
                                            </p>
                                        </div>

                                        <div className="col-md-4">
                                            <p className='text-dark payroll-box-text' >
                                                <strong> PAN No :</strong> {employeeDetails.panNumber || 'N/A'}
                                            </p>
                                        </div>

                                        <div className="col-md-4">
                                            <p className='text-dark' >
                                                <label for="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year : </label>
                                                <select id="yearSelect" className="custom-select" aria-label="Select Year" style={{ marginLeft: "5px" }}>
                                                    <option selected>2025-26</option>
                                                    <option>2026-27</option>
                                                    <option>2027-28</option>
                                                    <option>2028-29</option>
                                                    <option>2029-30</option>
                                                </select>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="table-responsive mb-4">
                                        <table className="border border-dark mb-4 table table-hover " >
                                            <thead className="bg-light-subtle">
                                                <tr className="payroll-table-header">
                                                    <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "300px" }}>
                                                        Investment
                                                    </th>
                                                    <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>
                                                        Limit
                                                    </th>
                                                    {/* <th className="text-center align-content-center border border-dark p-2 text-nowrap">
                                                        Declared
                                                    </th> */}
                                                    <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "130px" }}>
                                                        Proof Sub.
                                                    </th>
                                                    <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
                                                        Final Ded.
                                                    </th>

                                                    <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "200px" }}>
                                                        Upload Document
                                                    </th>
                                                    <th className="text-center align-content-center border text-nowrap border-dark p-2" style={{ width: "120px" }}>
                                                        Status
                                                    </th>
                                                    <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "200px" }}>
                                                        Admin Remarks
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='it-declaration-section-bg payroll-box-text fw-bold'  >
                                                    <td className="align-content-center border border-dark fw-bold p-2">
                                                        Section 80C
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2" >
                                                        1,50,000
                                                    </td>

                                                    <td className="text-end align-content-center border border-dark fw-bold p-2" >
                                                        {formatCurrency(total80C)}
                                                    </td>

                                                    <td className="text-end align-content-center border border-dark fw-bold p-2" >
                                                        {formatCurrency(final80C)}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2" >

                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2" >

                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2" >

                                                    </td>
                                                </tr>
                                                {section80C.items.map((item, index) => (
                                                    <tr key={index} className='payroll-table-body'>
                                                        <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                                                        <td className="text-end align-content-center border border-dark p-2"></td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            <input
                                                                type="text"
                                                                className="form-control payroll-table-body payroll-input-border text-end"
                                                                value={formatCurrency(item.proofSubmitted)}
                                                                onChange={(e) => handle80CInputChange(index, 'proofSubmitted', e.target.value)}
                                                                required
                                                            />
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2"></td>
                                                        <td className="text-center align-content-center border border-dark p-2">
                                                            <input
                                                                type="file"
                                                                className="form-control payroll-input-border"
                                                                accept="image/*,application/pdf"
                                                                onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
                                                                required={item.proofSubmitted > 0}
                                                            />
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            <input
                                                                type="text"
                                                                className="form-control payroll-table-body payroll-input-border text-end"
                                                                value={item.status}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            {item.adminRemarks}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                    <td className="align-content-center border border-dark fw-bold p-2">
                                                        Section 80D
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2">
                                                        {/* Total limit can be shown here if needed */}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2">
                                                        {formatCurrency(total80D)}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2">
                                                        {formatCurrency(final80D)}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                </tr>
                                                {section80D.items.map((item, index) => (
                                                    <tr key={index} className='payroll-table-body'>
                                                        <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            {formatCurrency(item.categoryLimit)}
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">


                                                            <input
                                                                type="text"
                                                                className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
                                                                value={formatCurrency(item.proofSubmitted)}
                                                                onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
                                                                disabled={item.disabled}
                                                            />
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            {formatCurrency(item.categoryFinalDeduction)}
                                                        </td>
                                                        <td className="text-center align-content-center border border-dark p-2">
                                                            <input
                                                                type="file"
                                                                className={`form-control payroll-input-border  ${item.disabled ? 'bg-light' : ''}`}
                                                                accept="image/*,application/pdf"
                                                                onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
                                                                required={item.proofSubmitted > 0}
                                                                disabled={item.disabled}
                                                            />
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            <input
                                                                type="text"
                                                                className="form-control payroll-table-body payroll-input-border text-end"
                                                                value={item.status}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            {item.adminRemarks}
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                    <td className="align-content-center border border-dark fw-bold p-2">
                                                        Other Section
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2">
                                                        {formatCurrency(totalOther)}

                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2">
                                                        {formatCurrency(finalOther)}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                </tr>
                                                {otherSections.items.map((item, index) => (
                                                    <tr key={index} className='payroll-table-body'>
                                                        <td className="align-content-center border border-dark px-3 py-2">
                                                            {item.category}
                                                            {index < 4 && (
                                                                <div
                                                                    className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                                                                    style={{ maxWidth: "fit-content" }}
                                                                >
                                                                    <button
                                                                        className={`btn ${item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                                                                        type='button'
                                                                        style={{
                                                                            backgroundColor: item.enabled ? 'white' : 'black',
                                                                            borderColor: item.enabled ? 'black' : '',
                                                                            color: item.enabled ? 'black' : 'white',
                                                                            maxWidth: "fit-content",
                                                                            transition: 'all 0.4s ease-in-out',
                                                                            boxShadow: "none"
                                                                        }}
                                                                        onClick={() => handleToggle(index)}
                                                                    >
                                                                        Yes
                                                                    </button>
                                                                    <button
                                                                        type='button'
                                                                        className={`btn ${!item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                                                                        style={{
                                                                            backgroundColor: !item.enabled ? 'white' : 'black',
                                                                            borderColor: !item.enabled ? 'black' : '',
                                                                            color: !item.enabled ? 'black' : 'white',
                                                                            transition: 'all 0.4s ease-in-out',
                                                                            boxShadow: "none",
                                                                            maxWidth: "fit-content"
                                                                        }}
                                                                        onClick={() => handleToggle(index)}
                                                                    >
                                                                        No
                                                                    </button>
                                                                </div>
                                                            )}
                                                            {/* {index === 7 && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-link p-0 mt-1"
                                                                    onClick={handleNavigateToRentDetails}
                                                                    style={{
                                                                        color: "red",
                                                                        fontWeight: "bold",
                                                                        fontSize: "1rem"
                                                                    }}
                                                                >
                                                                    Enter Rent Details
                                                                </button>
                                                            )} */}
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            {formatCurrency(item.categoryLimit)}
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            {index < 4 ? (
                                                                <input
                                                                    type="text"
                                                                    className={`form-control payroll-table-body payroll-input-border text-end ${!item.enabled ? 'bg-light' : ''}`}
                                                                    value={formatCurrency(item.proofSubmitted)}
                                                                    readOnly
                                                                />
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    className="form-control payroll-table-body payroll-input-border text-end"
                                                                    value={formatCurrency(item.proofSubmitted)}
                                                                    onChange={(e) => handleOtherSectionsInputChange(index, 'proofSubmitted', e.target.value)}
                                                                    required={item.proofSubmitted > 0}
                                                                />
                                                            )}
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            {formatCurrency(item.categoryFinalDeduction)}
                                                        </td>
                                                        <td className="text-center align-content-center border border-dark p-2">
                                                            <input
                                                                type="file"
                                                                className={`form-control payroll-input-border ${index < 4 && !item.enabled ? 'bg-light' : ''}`}
                                                                accept="image/*,application/pdf"
                                                                onChange={(e) => handleOtherSectionsFileUpload(index, e.target.files[0])}
                                                                required={item.proofSubmitted > 0}
                                                                disabled={index < 4 && !item.enabled}
                                                            />
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            <input
                                                                type="text"
                                                                className="form-control payroll-table-body payroll-input-border text-end"
                                                                value={item.status}
                                                                readOnly
                                                            />
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2">
                                                            {item.adminRemarks}
                                                        </td>
                                                    </tr>
                                                ))}



                                                <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                    <td className="align-content-center fw-bold border border-dark p-2" >
                                                        HRA Exemption
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2" >

                                                    </td>

                                                    <td className="text-end align-content-center border border-dark fw-bold p-2" >
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end "
                                                            value={"10,000"}
                                                        />
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2" >

                                                    </td>
                                                    <td className="text-center align-content-center border border-dark fw-bold p-2" >
                                                        <button
                                                            type="button"
                                                            className="btn btn-link p-0"
                                                            onClick={handleNavigateToRentDetails}
                                                            style={{
                                                                color: "red",
                                                                // textDecoration: "underline",
                                                                fontWeight: "bold",
                                                                fontSize: "1rem"
                                                            }}
                                                        >
                                                            Enter Rent Details
                                                        </button>
                                                    </td>
                                                    <td className="text-center align-content-center border border-dark fw-bold p-2" >
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2" >

                                                    </td>
                                                </tr>
                                                <tr className='payroll-table-body' >
                                                    <td className="align-content-center border border-dark px-3 p-2" >

                                                    </td>
                                                    {/* <td className="text-center align-content-center border border-dark p-2" >

                                                    </td> */}
                                                    <td className="text-center align-content-center border border-dark p-2" >

                                                    </td>
                                                    <td className="text-center align-content-center border border-dark p-2" >

                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2" >

                                                    </td>
                                                    <td className="text-center align-content-center border border-dark p-2" >

                                                    </td>
                                                    <td className="text-center align-content-center border border-dark p-2" >

                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2" >

                                                    </td>
                                                </tr>

                                                <tr >
                                                    <td colSpan={8} className="border border-dark fw-bold p-2" >
                                                        {/* I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax. */}
                                                    
                                                    <div className="d-flex align-items-center gap-1">
                                                        <p className="form-check ms-1">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input mt-0"
                                                                id="acceptTermsAndConditions"
                                                                name="acceptTermsAndConditions"
                                                                // checked={formData.acceptTermsAndConditions}
                                                                // onChange={handleChange}
                                                            />{" "}

                                                        </p>
                                                        <p className="mb-0 fw-bold text-dark">I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.</p>
                                                    </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary custom-submit-button"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                                        </button>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EmployeeItDeclaration;