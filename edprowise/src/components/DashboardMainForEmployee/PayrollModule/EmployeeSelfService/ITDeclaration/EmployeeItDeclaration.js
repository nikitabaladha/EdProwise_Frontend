// import React, { useState, useEffect } from 'react';
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
//     // const [academicYear] = useState('2025-26');
//     const [isSubmitting, setIsSubmitting] = useState(false);
// const [academicYear, setAcademicYear] = useState('2025-26');
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
//                 category: "Employee Provident Fund (EPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Public Provident Fund (PPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Tuition Fees ( For 2 Children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Bank Fixed Deposit",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Post office Time Deposit",
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
//                 category: "Housing Loan Payment of Principal/Stamp Duty & Registration",
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
//                 category: "Subscription to notified Central Government security (NSS) / Mutual Funds/ELSS and others / Pension Fund",
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

//     const [otherSections, setOtherSections] = useState({
//         items: [
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Disability (Form 10-I) (Flat Dedcution of INR 75000) (Yes/No)",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Severe Disability (Form 10-I)",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Disability",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Severe Disability",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred , Maximum of INR 40000)",
//                 categoryLimit: 40000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 disabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred , Maximum of INR 100000)",
//                 categoryLimit: 100000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 disabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Interest on Educational Loan for Higher studies (u/s 80E) - Self, Spouse & Children [Allowed for 8 Years from repayment starts]",
//                 categoryLimit: 0,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Section80EE",
//                 category: "Interest on Home Loan (u/s 80EE) ( Loan Sanctioned between April 2016 to Mar 2017)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Section80EEA",
//                 category: "Interest on Home Loan (u/s 80EEA) ( Loan Sanctioned between April 2019 to Mar 2022) (Cost of House Less than 45 Lakh)",
//                 categoryLimit: 150000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//         ]
//     });

//     const [hraExemption, setHraExemption] = useState({
//     proofSubmitted: 0
//   });
//     const [isBuyer, setIsBuyer] = useState(false);
//     const [isYes, setIsYes] = useState(false);
//     const [isYes1, setIsYes1] = useState(false);
//     const [isYes2, setIsYes2] = useState(false);

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         if (!userDetails?.schoolId || !userDetails?.userId) {
//             toast.error('Authentication details missing');
//             return;
//         }
//         setSchoolId(userDetails.schoolId);
//         setEmployeeId(userDetails.userId);

//         fetchEmployeeData(userDetails.schoolId, userDetails.userId);
//         fetchItDeclaration(userDetails.schoolId, userDetails.userId);
//     }, [academicYear,navigate]);

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

//     const fetchItDeclaration = async (schoolId, empId) => {
//     try {
//       const declarationRes = await getAPI(`/it-declaration/${schoolId}/${empId}?academicYear=${academicYear}`);
//       if (!declarationRes.hasError && declarationRes.data?.data) {
//         const data = declarationRes.data.data;
//         setSection80C(data.section80C);
//         setSection80D(data.section80D);
//         setOtherSections({
//           ...data.otherSections,
//           items: data.otherSections.items.map(item => ({
//             ...item,
//             enabled: item.proofSubmitted > 0 && [0, 1, 2, 3, 7, 8].includes(data.otherSections.items.indexOf(item))
//           }))
//         });
//         setHraExemption(data.hraExemption);
//         setEmployeeDetails(prev => ({
//           ...prev,
//           taxRegime: data.taxRegime,
//           panNumber: data.panNumber
//         }));
//         setIsBuyer(data.otherSections.items[0].enabled);
//         setIsYes(data.otherSections.items[1].enabled);
//         setIsYes1(data.otherSections.items[2].enabled);
//         setIsYes2(data.otherSections.items[3].enabled);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch IT declaration");
//     }
//   };

//     const handleToggle = (index) => {
//         const updatedItems = [...otherSections.items];
//         const enabled = !updatedItems[index].enabled;
//         updatedItems[index] = {
//             ...updatedItems[index],
//             enabled,
//             proofSubmitted: enabled ? updatedItems[index].categoryLimit : 0,
//             proofDocument: enabled ? updatedItems[index].proofDocument : null,
//             categoryFinalDeduction: enabled ? updatedItems[index].categoryLimit : 0
//         };

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });

//         if (index === 0) setIsBuyer(enabled);
//         if (index === 1) setIsYes(enabled);
//         if (index === 2) setIsYes1(enabled);
//         if (index === 3) setIsYes2(enabled);
//     };

//     const handle80CInputChange = (index, field, value) => {
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

//     const handle80DInputChange = (index, field, value) => {
//         const updatedItems = [...section80D.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: numericValue
//         };

//         if ([0, 1, 4].includes(index)) {
//             if (numericValue > 0) {
//                 [0, 1, 4].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [0, 1, 4].forEach(i => {
//                     updatedItems[i].disabled = false;
//                 });
//             }
//         }

//         if ([2, 3, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [2, 3, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [2, 3, 5].forEach(i => {
//                     updatedItems[i].disabled = false;
//                 });
//             }
//         }

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

//     const handleOtherSectionsInputChange = (index, field, value) => {
//         const updatedItems = [...otherSections.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: numericValue,
//             categoryFinalDeduction: numericValue > 0 ? Math.min(numericValue, updatedItems[index].categoryLimit) : 0
//         };

//         if ([4, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [4, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [4, 5].forEach(i => {
//                     updatedItems[i].disabled = false;
//                 });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({
//             ...otherSections,
//             items: calculatedItems,
//             finalDeduction
//         });
//     };

//     const handleOtherSectionsFileUpload = (index, file) => {
//         if (!file) {
//             const updatedItems = [...otherSections.items];
//             updatedItems[index] = {
//                 ...updatedItems[index],
//                 proofDocument: null
//             };
//             setOtherSections({ ...otherSections, items: updatedItems });
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

//         const updatedItems = [...otherSections.items];
//         updatedItems[index] = {
//             ...updatedItems[index],
//             proofDocument: file
//         };
//         setOtherSections({ ...otherSections, items: updatedItems });
//     };

//     const calculate80CTotals = () => {
//         const totalProofSubmitted = section80C.items.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = Math.min(totalProofSubmitted, section80C.sectionLimit);

//         return {
//             totalProofSubmitted,
//             finalDeduction
//         };
//     };

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
//             totalProofSubmitted,
//             finalDeduction
//         };
//     };

//     const calculateOtherSectionsTotals = (items) => {
//         const updatedItems = items.map(item => ({
//             ...item,
//             categoryFinalDeduction: item.categoryLimit > 0 ? Math.min(item.proofSubmitted, item.categoryLimit) : item.proofSubmitted
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
//             totalProofSubmitted,
//             finalDeduction
//         };
//     };

//     const validateSubmission = () => {
//         const invalid80C = section80C.items.some(item =>
//             item.proofSubmitted > 0 && !item.proofDocument
//         );

//         const invalid80D = section80D.items.some(item =>
//             item.proofSubmitted > 0 && !item.proofDocument
//         );

//         const invalidOther = otherSections.items.some(item =>
//             item.proofSubmitted > 0 && !item.proofDocument
//         );

//         if (invalid80C || invalid80D || invalidOther) {
//             toast.error('Please upload documents for all submitted proofs');
//             return false;
//         }

//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         if (!validateSubmission()) {
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             const formData = new FormData();

//             formData.append('schoolId', schoolId);
//             formData.append('employeeId', employeeId);
//             formData.append('academicYear', academicYear);
//             formData.append('taxRegime', employeeDetails.taxRegime);
//             formData.append('panNumber', employeeDetails.panNumber);

//             section80C.items.forEach((item, index) => {
//                 formData.append(`section80C[${index}][section]`, item.section);
//                 formData.append(`section80C[${index}][category]`, item.category);
//                 formData.append(`section80C[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80C[${index}][status]`, item.status);
//                 formData.append(`section80C[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.proofDocument) {
//                     formData.append(`section80CProofs[${index}]`, item.proofDocument);
//                 }
//             });
//             formData.append('section80C[sectionLimit]', section80C.sectionLimit);

//             section80D.items.forEach((item, index) => {
//                 formData.append(`section80D[${index}][section]`, item.section);
//                 formData.append(`section80D[${index}][category]`, item.category);
//                 formData.append(`section80D[${index}][categoryLimit]`, item.categoryLimit);
//                 formData.append(`section80D[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction);
//                 formData.append(`section80D[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80D[${index}][status]`, item.status);
//                 formData.append(`section80D[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.proofDocument) {
//                     formData.append(`section80DProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             otherSections.items.forEach((item, index) => {
//                 formData.append(`otherSections[${index}][section]`, item.section);
//                 formData.append(`otherSections[${index}][category]`, item.category);
//                 formData.append(`otherSections[${index}][categoryLimit]`, item.categoryLimit || 0);
//                 formData.append(`otherSections[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction || 0);
//                 formData.append(`otherSections[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`otherSections[${index}][status]`, item.status);
//                 formData.append(`otherSections[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.proofDocument) {
//                     formData.append(`otherSectionsProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             const response = await postAPI(
//                 `/it-declaration/${schoolId}/${employeeId}`,
//                 formData,
//                 { 'Content-Type': 'multipart/form-data' },
//                 true
//             );

//             if (!response.hasError) {
//                 toast.success("IT Declaration submitted successfully!");
//             } else {
//                 toast.error(response.message || "Failed to submit declaration");
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             toast.error("An error occurred while submitting the declaration");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const { totalProofSubmitted: total80C, finalDeduction: final80C } = calculate80CTotals();
//     const { totalProofSubmitted: total80D, finalDeduction: final80D } = calculate80DTotals(section80D.items);
//     const { totalProofSubmitted: totalOther, finalDeduction: finalOther } = calculateOtherSectionsTotals(otherSections.items);

//     const handleNavigateToRentDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/rent-details");
//     };

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN').format(amount);
//     };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2">
//                                     <h4 className="payroll-title text-center mb-0">
//                                         Income Tax (IT) Declaration
//                                     </h4>
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                                     <div className="col-md-8">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee Name : </strong> {employeeDetails.employeeName || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee ID : </strong>{employeeDetails.employeeId || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Tax Regime :</strong> {employeeDetails.taxRegime === "new" ? "New" : "Old" || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong> PAN No :</strong> {employeeDetails.panNumber || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark'>
//                                             <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year : </label>
//                                             <select
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
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive mb-4">
//                                     <table className="border border-dark mb-4 table table-hover">
//                                         <thead className="bg-light-subtle">
//                                             <tr className="payroll-table-header">
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Investment
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>
//                                                     Limit
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "130px" }}>
//                                                     Proof Sub.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
//                                                     Final Ded.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "200px" }}>
//                                                     Upload Document
//                                                 </th>
//                                                 <th className="text-center align-content-center border text-nowrap border-dark p-2" style={{ width: "120px" }}>
//                                                     Status
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Admin Remarks
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">
//                                                     Section 80C
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     1,50,000
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(total80C)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(final80C)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80C.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80CInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="file"
//                                                             className="form-control payroll-input-border"
//                                                             accept="image/*,application/pdf"
//                                                             onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {item.adminRemarks}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">
//                                                     Section 80D
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(total80D)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(final80D)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80D.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.categoryLimit)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             disabled={item.disabled}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.categoryFinalDeduction)}
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="file"
//                                                             className={`form-control payroll-input-border ${item.disabled ? 'bg-light' : ''}`}
//                                                             accept="image/*,application/pdf"
//                                                             onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
//                                                             required={item.proofSubmitted > 0}
//                                                             disabled={item.disabled}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {item.adminRemarks}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">
//                                                     Other Section
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(totalOther)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {formatCurrency(finalOther)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {otherSections.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">
//                                                         {item.category}
//                                                         {index < 4 && (
//                                                             <div
//                                                                 className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                                                 style={{ maxWidth: "fit-content" }}
//                                                             >
//                                                                 <button
//                                                                     className={`btn ${item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     type='button'
//                                                                     style={{
//                                                                         backgroundColor: item.enabled ? 'white' : 'black',
//                                                                         borderColor: item.enabled ? 'black' : '',
//                                                                         color: item.enabled ? 'black' : 'white',
//                                                                         maxWidth: "fit-content",
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     Yes
//                                                                 </button>
//                                                                 <button
//                                                                     type='button'
//                                                                     className={`btn ${!item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     style={{
//                                                                         backgroundColor: !item.enabled ? 'white' : 'black',
//                                                                         borderColor: !item.enabled ? 'black' : '',
//                                                                         color: !item.enabled ? 'black' : 'white',
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none",
//                                                                         maxWidth: "fit-content"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     No
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.categoryLimit)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {index < 4 ? (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${!item.enabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 readOnly
//                                                             />
//                                                         ) : (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 onChange={(e) => handleOtherSectionsInputChange(index, 'proofSubmitted', e.target.value)}
//                                                                 required={item.proofSubmitted > 0}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(item.categoryFinalDeduction)}
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="file"
//                                                             className={`form-control payroll-input-border ${index < 4 && !item.enabled || item.disabled ? 'bg-light' : ''}`}
//                                                             accept="image/*,application/pdf"
//                                                             onChange={(e) => handleOtherSectionsFileUpload(index, e.target.files[0])}
//                                                             required={item.proofSubmitted > 0}
//                                                             disabled={index < 4 && !item.enabled || item.disabled}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {item.adminRemarks}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center fw-bold border border-dark p-2">
//                                                     HRA Exemption
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"

//                                                     />
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2"></td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={handleNavigateToRentDetails}
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         Enter Rent Details
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark p-2"></td>
//                                             </tr>
//                                             <tr>
//                                                 <td colSpan={7} className="border border-dark fw-bold p-2">
//                                                     <div className="d-flex align-items-center gap-1">
//                                                         <p className="form-check ms-1">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="form-check-input mt-0"
//                                                                 id="acceptTermsAndConditions"
//                                                                 name="acceptTermsAndConditions"
//                                                             />
//                                                         </p>
//                                                         <p className="mb-0 fw-bold text-dark">
//                                                             I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
//                                                         </p>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 <div className="text-end">
//                                     <button
//                                         type="submit"
//                                         className="btn btn-primary custom-submit-button"
//                                         disabled={isSubmitting}
//                                     >
//                                         {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
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

// export default EmployeeItDeclaration;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';

// const EmployeeItDeclaration = () => {
//     const navigate = useNavigate();
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [employeeDetails, setEmployeeDetails] = useState({});
//     const [academicYear, setAcademicYear] = useState('2025-26');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const [section80C, setSection80C] = useState({
//         items: [
//             {
//                 section: "80C",
//                 category: "Life Insurance Premium including Bima Nivesh (only Self, Spouse and children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Employee Provident Fund (EPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Public Provident Fund (PPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Tuition Fees (For 2 Children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Bank Fixed Deposit",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Post Office Time Deposit",
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
//                 category: "Housing Loan Payment of Principal/Stamp Duty & Registration",
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
//                 category: "Subscription to notified Central Government security (NSS) / Mutual Funds/ELSS and others / Pension Fund",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             }
//         ],
//         sectionLimit: 150000,
//         finalDeduction: 0
//     });

//     const [section80D, setSection80D] = useState({
//         items: [
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self, Spouse and Dependent Children (Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self, Spouse and Dependent Children (60 Years or Above)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Parents (Age Below 60 Years)",
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
//                 category: "Medical Expenditure for Parents (60 Years or Above) (If No Insurance Premium)",
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
//             }
//         ],
//         finalDeduction: 0
//     });

//     const [otherSections, setOtherSections] = useState({
//         items: [
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Disability (Form 10-I) (Flat Deduction of INR 75000) (Yes/No)",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Severe Disability (Form 10-I)",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Disability",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Severe Disability",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred, Maximum of INR 40000)",
//                 categoryLimit: 40000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred, Maximum of INR 100000)",
//                 categoryLimit: 100000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Other",
//                 category: "Interest on Educational Loan for Higher Studies (u/s 80E) - Self, Spouse & Children [Allowed for 8 Years from repayment starts]",
//                 categoryLimit: 0,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Section80EE",
//                 category: "Interest on Home Loan (u/s 80EE) (Loan Sanctioned between April 2016 to Mar 2017)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Section80EEA",
//                 category: "Interest on Home Loan (u/s 80EEA) (Loan Sanctioned between April 2019 to Mar 2022) (Cost of House Less than 45 Lakh)",
//                 categoryLimit: 150000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             }
//         ],
//         finalDeduction: 0
//     });

//     const [hraExemption, setHraExemption] = useState({
//         proofSubmitted: 0
//     });

//     const [isBuyer, setIsBuyer] = useState(false);
//     const [isYes, setIsYes] = useState(false);
//     const [isYes1, setIsYes1] = useState(false);
//     const [isYes2, setIsYes2] = useState(false);

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         if (!userDetails?.schoolId || !userDetails?.userId) {
//             toast.error('Authentication details missing');
//             navigate('/login');
//             return;
//         }
//         setSchoolId(userDetails.schoolId);
//         setEmployeeId(userDetails.userId);

//         fetchEmployeeData(userDetails.schoolId, userDetails.userId);
//         fetchItDeclaration(userDetails.schoolId, userDetails.userId);
//     }, [navigate]);

//     const fetchEmployeeData = async (schoolId, empId) => {
//         try {
//             const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//             if (!employeeRes.hasError && employeeRes.data?.data) {
//                 setEmployeeDetails(employeeRes.data.data);
//             }
//         } catch (error) {
//             toast.error("Failed to fetch employee details");
//         }
//     };

//     // const fetchItDeclaration = async (schoolId, empId) => {
//     //     try {
//     //         const declarationRes = await getAPI(`/it-declaration/${schoolId}/${empId}?academicYear=${academicYear}`);
//     //         if (!declarationRes.hasError && declarationRes.data?.data) {
//     //             const data = declarationRes.data.data;
//     //             setSection80C(data.section80C);
//     //             setSection80D(data.section80D);
//     //             setOtherSections({
//     //                 ...data.otherSections,
//     //                 items: data.otherSections.items.map(item => ({
//     //                     ...item,
//     //                     enabled: item.proofSubmitted > 0 && [0, 1, 2, 3, 7, 8].includes(data.otherSections.items.indexOf(item))
//     //                 }))
//     //             });
//     //             setHraExemption(data.hraExemption);
//     //             setEmployeeDetails(prev => ({
//     //                 ...prev,
//     //                 taxRegime: data.taxRegime,
//     //                 panNumber: data.panNumber
//     //             }));
//     //             setIsBuyer(data.otherSections.items[0].enabled);
//     //             setIsYes(data.otherSections.items[1].enabled);
//     //             setIsYes1(data.otherSections.items[2].enabled);
//     //             setIsYes2(data.otherSections.items[3].enabled);
//     //         }
//     //     } catch (error) {
//     //         toast.error("Failed to fetch IT declaration");
//     //     }
//     // };

//     const fetchItDeclaration = async (schoolId, empId) => {
//         try {
//             const declarationRes = await getAPI(`/it-declaration/${schoolId}/${empId}?academicYear=${academicYear}`);
//             if (!declarationRes.hasError && declarationRes.data?.data) {
//                 const data = declarationRes.data.data;
//                 setSection80C({
//                     ...data.section80C,
//                     items: data.section80C.items.map(item => ({
//                         ...item,
//                         proofDocument: item.proofDocument // String path from backend
//                     }))
//                 });
//                 setSection80D({
//                     ...data.section80D,
//                     items: data.section80D.items.map(item => ({
//                         ...item,
//                         proofDocument: item.proofDocument
//                     }))
//                 });
//                 setOtherSections({
//                     ...data.otherSections,
//                     items: data.otherSections.items.map(item => ({
//                         ...item,
//                         proofDocument: item.proofDocument,
//                         enabled: item.proofSubmitted > 0 && [0, 1, 2, 3, 7, 8].includes(data.otherSections.items.indexOf(item))
//                     }))
//                 });
//                 setHraExemption(data.hraExemption);
//                 setEmployeeDetails(prev => ({
//                     ...prev,
//                     taxRegime: data.taxRegime,
//                     panNumber: data.panNumber
//                 }));
//                 setIsBuyer(data.otherSections.items[0].enabled);
//                 setIsYes(data.otherSections.items[1].enabled);
//                 setIsYes1(data.otherSections.items[2].enabled);
//                 setIsYes2(data.otherSections.items[3].enabled);
//             }
//         } catch (error) {
//             toast.error("Failed to fetch IT declaration");
//         }
//     };
//     const handleToggle = (index) => {
//         const updatedItems = [...otherSections.items];
//         const enabled = !updatedItems[index].enabled;
//         updatedItems[index] = {
//             ...updatedItems[index],
//             enabled,
//             proofSubmitted: enabled ? updatedItems[index].categoryLimit : 0,
//             proofDocument: enabled ? updatedItems[index].proofDocument : null,
//             categoryFinalDeduction: enabled ? updatedItems[index].categoryLimit : 0
//         };

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });

//         if (index === 0) setIsBuyer(enabled);
//         if (index === 1) setIsYes(enabled);
//         if (index === 2) setIsYes1(enabled);
//         if (index === 3) setIsYes2(enabled);
//     };

//     const handle80CInputChange = (index, field, value) => {
//         const updatedItems = [...section80C.items];
//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: field === 'proofSubmitted' ? Number(value.replace(/,/g, '')) || 0 : value
//         };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     const handle80CFileUpload = (index, file) => {
//         if (!file) {
//             const updatedItems = [...section80C.items];
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
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
//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     const handle80DInputChange = (index, field, value) => {
//         const updatedItems = [...section80D.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = { ...updatedItems[index], [field]: numericValue };

//         if ([0, 1, 4].includes(index)) {
//             if (numericValue > 0) {
//                 [0, 1, 4].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [0, 1, 4].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         if ([2, 3, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [2, 3, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [2, 3, 5].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculate80DTotals(updatedItems);
//         setSection80D({ ...section80D, items: calculatedItems, finalDeduction });
//     };

//     const handle80DFileUpload = (index, file) => {
//         if (!file) {
//             const updatedItems = [...section80D.items];
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
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
//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setSection80D({ ...section80D, items: updatedItems });
//     };

//     const handleOtherSectionsInputChange = (index, field, value) => {
//         const updatedItems = [...otherSections.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: numericValue,
//             categoryFinalDeduction: numericValue > 0 ? Math.min(numericValue, updatedItems[index].categoryLimit) : 0
//         };

//         if ([4, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [4, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [4, 5].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });
//     };

//     const handleOtherSectionsFileUpload = (index, file) => {
//         if (!file) {
//             const updatedItems = [...otherSections.items];
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
//             setOtherSections({ ...otherSections, items: updatedItems });
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

//         const updatedItems = [...otherSections.items];
//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setOtherSections({ ...otherSections, items: updatedItems });
//     };

//     const calculate80CTotals = () => {
//         const totalProofSubmitted = section80C.items.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = Math.min(totalProofSubmitted, section80C.sectionLimit);
//         return { totalProofSubmitted, finalDeduction };
//     };

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
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const calculateOtherSectionsTotals = (items) => {
//         const updatedItems = items.map(item => ({
//             ...item,
//             categoryFinalDeduction: item.categoryLimit > 0 ? Math.min(item.proofSubmitted, item.categoryLimit) : item.proofSubmitted
//         }));
//         const totalProofSubmitted = updatedItems.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = updatedItems.reduce(
//             (sum, item) => sum + (item.categoryFinalDeduction || 0),
//             0
//         );
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const validateSubmission = () => {
//         const invalid80C = section80C.items.some(item => item.proofSubmitted > 0 && !item.proofDocument);
//         const invalid80D = section80D.items.some(item => item.proofSubmitted > 0 && !item.proofDocument);
//         const invalidOther = otherSections.items.some(item => item.proofSubmitted > 0 && !item.proofDocument);

//         if (invalid80C || invalid80D || invalidOther) {
//             toast.error('Please upload documents for all submitted proofs');
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         if (!validateSubmission()) {
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append('schoolId', schoolId);
//             formData.append('employeeId', employeeId);
//             formData.append('academicYear', academicYear);
//             formData.append('taxRegime', employeeDetails.taxRegime || 'old');
//             formData.append('panNumber', employeeDetails.panNumber || '');

//             section80C.items.forEach((item, index) => {
//                 formData.append(`section80C[${index}][section]`, item.section);
//                 formData.append(`section80C[${index}][category]`, item.category);
//                 formData.append(`section80C[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80C[${index}][status]`, item.status);
//                 formData.append(`section80C[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.proofDocument) {
//                     formData.append(`section80CProofs[${index}]`, item.proofDocument);
//                 }
//             });
//             formData.append('section80C[sectionLimit]', section80C.sectionLimit);

//             section80D.items.forEach((item, index) => {
//                 formData.append(`section80D[${index}][section]`, item.section);
//                 formData.append(`section80D[${index}][category]`, item.category);
//                 formData.append(`section80D[${index}][categoryLimit]`, item.categoryLimit);
//                 formData.append(`section80D[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction);
//                 formData.append(`section80D[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80D[${index}][status]`, item.status);
//                 formData.append(`section80D[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.proofDocument) {
//                     formData.append(`section80DProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             otherSections.items.forEach((item, index) => {
//                 formData.append(`otherSections[${index}][section]`, item.section);
//                 formData.append(`otherSections[${index}][category]`, item.category);
//                 formData.append(`otherSections[${index}][categoryLimit]`, item.categoryLimit || 0);
//                 formData.append(`otherSections[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction || 0);
//                 formData.append(`otherSections[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`otherSections[${index}][status]`, item.status);
//                 formData.append(`otherSections[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.proofDocument) {
//                     formData.append(`otherSectionsProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             const response = await postAPI(
//                 `/it-declaration/${schoolId}/${employeeId}`,
//                 formData,
//                 { 'Content-Type': 'multipart/form-data' },
//                 true
//             );

//             if (!response.hasError) {
//                 toast.success("IT Declaration submitted successfully!");
//                 fetchItDeclaration(schoolId, employeeId); // Refresh data after submission
//             } else {
//                 toast.error(response.message || "Failed to submit declaration");
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             toast.error("An error occurred while submitting the declaration");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const { totalProofSubmitted: total80C, finalDeduction: final80C } = calculate80CTotals();
//     const { totalProofSubmitted: total80D, finalDeduction: final80D } = calculate80DTotals(section80D.items);
//     const { totalProofSubmitted: totalOther, finalDeduction: finalOther } = calculateOtherSectionsTotals(otherSections.items);

//     const handleNavigateToRentDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/rent-details");
//     };

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN').format(amount);
//     };

//     const getFileName = (proofDocument) => {
//         if (!proofDocument) return 'No file';
//         if (typeof proofDocument === 'string') {
//             // return proofDocument.split('/').pop() || 'Existing file';
//             const fullName = proofDocument.split('\\').pop().split('/').pop() || 'Existing file';
//   return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
//             //  return proofDocument.split('\\').pop().split('/').pop() || "Existing File";
//         }
//         return proofDocument.name || 'Selected file';
//     };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2">
//                                     <h4 className="payroll-title text-center mb-0">
//                                         Income Tax (IT) Declaration
//                                     </h4>
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                                     <div className="col-md-8">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee Name: </strong> {employeeDetails.employeeName || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee ID: </strong>{employeeDetails.employeeId || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Tax Regime: </strong>{employeeDetails.taxRegime === "new" ? "New" : "Old" || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>PAN No: </strong>{employeeDetails.panNumber || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark'>
//                                             <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year: </label>
//                                             <select
//                                                 id="yearSelect"
//                                                 className="custom-select"
//                                                 aria-label="Select Year"
//                                                 style={{ marginLeft: "5px" }}
//                                                 value={academicYear}
//                                                 onChange={(e) => setAcademicYear(e.target.value)}
//                                             >
//                                                 <option value="2025-26">2025-26</option>
//                                                 <option value="2026-27">2026-27</option>
//                                                 <option value="2027-28">2027-28</option>
//                                                 <option value="2028-29">2028-29</option>
//                                                 <option value="2029-30">2029-30</option>
//                                             </select>
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive mb-4">
//                                     <table className="border border-dark mb-4 table table-hover">
//                                         <thead className="bg-light-subtle">
//                                             <tr className="payroll-table-header">
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Investment
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>
//                                                     Limit
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "130px" }}>
//                                                     Proof Sub.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
//                                                     Final Ded.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "200px" }}>
//                                                     Upload Document
//                                                 </th>
//                                                 <th className="text-center align-content-center border text-nowrap border-dark p-2" style={{ width: "120px" }}>
//                                                     Status
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Admin Remarks
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(section80C.sectionLimit)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80C)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80C)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80C.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80CInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="file"
//                                                             className="form-control payroll-input-border"
//                                                             accept="image/*,application/pdf"
//                                                             onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td> */}
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className="form-control payroll-input-border me-2"
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument}
//                                                             />

//                                                         </div>
//                                                         {item.proofDocument && (
//                                                                 <div className="d-flex mt-2 align-items-center">
//                                                                     <small className="me-2">{getFileName(item.proofDocument)}</small>
//                                                                     {/* <button
//                                                                         type="button"
//                                                                         className="btn btn-sm btn-danger"
//                                                                         onClick={() => handle80CFileUpload(index, null)}
//                                                                     >
//                                                                         Remove
//                                                                     </button> */}
//                                                                 </div>
//                                                             )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80D)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80D)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80D.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             disabled={item.disabled}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="file"
//                                                             className={`form-control payroll-input-border ${item.disabled ? 'bg-light' : ''}`}
//                                                             accept="image/*,application/pdf"
//                                                             onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
//                                                             required={item.proofSubmitted > 0}
//                                                             disabled={item.disabled}
//                                                         />
//                                                     </td> */}

//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border me-2 ${item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument}
//                                                                 disabled={item.disabled}
//                                                             />

//                                                         </div>
//                                                         {item.proofDocument && (
//                                                                 <div className="d-flex mt-2 align-items-center">
//                                                                     <small className="me-2">{getFileName(item.proofDocument)}</small>
//                                                                     {/* <button
//                                                                         type="button"
//                                                                         className="btn btn-sm btn-danger"
//                                                                         onClick={() => handle80DFileUpload(index, null)}
//                                                                         disabled={item.disabled}
//                                                                     >
//                                                                         Remove
//                                                                     </button> */}
//                                                                 </div>
//                                                             )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(totalOther)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(finalOther)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {otherSections.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">
//                                                         {item.category}
//                                                         {index < 4 && (
//                                                             <div className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1" style={{ maxWidth: "fit-content" }}>
//                                                                 <button
//                                                                     className={`btn ${item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     type='button'
//                                                                     style={{
//                                                                         backgroundColor: item.enabled ? 'white' : 'black',
//                                                                         borderColor: item.enabled ? 'black' : '',
//                                                                         color: item.enabled ? 'black' : 'white',
//                                                                         maxWidth: "fit-content",
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     Yes
//                                                                 </button>
//                                                                 <button
//                                                                     type='button'
//                                                                     className={`btn ${!item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     style={{
//                                                                         backgroundColor: !item.enabled ? 'white' : 'black',
//                                                                         borderColor: !item.enabled ? 'black' : '',
//                                                                         color: !item.enabled ? 'black' : 'white',
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none",
//                                                                         maxWidth: "fit-content"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     No
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {index < 4 ? (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${!item.enabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 readOnly
//                                                             />
//                                                         ) : (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 onChange={(e) => handleOtherSectionsInputChange(index, 'proofSubmitted', e.target.value)}
//                                                                 required={item.proofSubmitted > 0}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
//                                                     {/* <td className="text-center align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="file"
//                                                             className={`form-control payroll-input-border ${index < 4 && !item.enabled || item.disabled ? 'bg-light' : ''}`}
//                                                             accept="image/*,application/pdf"
//                                                             onChange={(e) => handleOtherSectionsFileUpload(index, e.target.files[0])}
//                                                             required={item.proofSubmitted > 0}
//                                                             disabled={index < 4 && !item.enabled || item.disabled}
//                                                         />
//                                                     </td> */}
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border me-2 ${index < 4 && !item.enabled || item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handleOtherSectionsFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument}
//                                                                 disabled={index < 4 && !item.enabled || item.disabled}
//                                                             />

//                                                         </div>
//                                                         {item.proofDocument && (
//                                                                 <div className="d-flex align-items-center">
//                                                                     <small className="me-2">{getFileName(item.proofDocument)}</small>
//                                                                     {/* <button
//                                                                         type="button"
//                                                                         className="btn mt-2 btn-sm btn-danger"
//                                                                         onClick={() => handleOtherSectionsFileUpload(index, null)}
//                                                                         disabled={index < 4 && !item.enabled || item.disabled}
//                                                                     >
//                                                                         Remove
//                                                                     </button> */}
//                                                                 </div>
//                                                             )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(hraExemption.proofSubmitted)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={handleNavigateToRentDetails}
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         Enter Rent Details
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             <tr>
//                                                 <td colSpan={7} className="border border-dark fw-bold p-2">
//                                                     <div className="d-flex align-items-center gap-1">
//                                                         <p className="form-check ms-1">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="form-check-input mt-0"
//                                                                 id="acceptTermsAndConditions"
//                                                                 name="acceptTermsAndConditions"
//                                                             />
//                                                         </p>
//                                                         <p className="mb-0 fw-bold text-dark">
//                                                             I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
//                                                         </p>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 <div className="row m-0">
//                                     <div className="col-md-12 text-center">
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary"
//                                             disabled={isSubmitting}
//                                         >
//                                             {isSubmitting ? 'Submitting...' : 'Submit'}
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

// export default EmployeeItDeclaration;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';
// const EmployeeItDeclaration = () => {
//     const navigate = useNavigate();
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [employeeDetails, setEmployeeDetails] = useState({});
//     const [academicYear, setAcademicYear] = useState('2025-26');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const [section80C, setSection80C] = useState({
//         items: [
//             {
//                 section: "80C",
//                 category: "Life Insurance Premium including Bima Nivesh (only Self, Spouse and children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Employee Provident Fund (EPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "Public Provident Fund (PPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "Tuition Fees (For 2 Children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Bank Fixed Deposit",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Post Office Time Deposit",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Sukanya Samriddhi Account",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Housing Loan Payment of Principal/Stamp Duty & Registration",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Unit Link Insurance Plan / Infrastructure Bond / National Saving Certificate / Accrued Interest on NSC",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Subscription to notified Central Government security (NSS) / Mutual Funds/ELSS and others / Pension Fund",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             }
//         ],
//         sectionLimit: 150000,
//         finalDeduction: 0
//     });

//     const [section80D, setSection80D] = useState({
//         items: [
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self, Spouse and Dependent Children (Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             // ... (other section80D items remain the same)
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self, Spouse and Dependent Children (60 Years or Above)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Parents (Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
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
//                 existingDocument: null,
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
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Expenditure for Parents (60 Years or Above) (If No Insurance Premium)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
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
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             }
//         ],
//         finalDeduction: 0
//     });

//     const [otherSections, setOtherSections] = useState({
//         items: [
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Disability (Form 10-I) (Flat Deduction of INR 75000) (Yes/No)",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             // ... (other otherSections items remain the same)
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Severe Disability (Form 10-I)",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Disability",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Severe Disability",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred, Maximum of INR 40000)",
//                 categoryLimit: 40000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred, Maximum of INR 100000)",
//                 categoryLimit: 100000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Other",
//                 category: "Interest on Educational Loan for Higher Studies (u/s 80E) - Self, Spouse & Children [Allowed for 8 Years from repayment starts]",
//                 categoryLimit: 0,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Section80EE",
//                 category: "Interest on Home Loan (u/s 80EE) (Loan Sanctioned between April 2016 to Mar 2017)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Section80EEA",
//                 category: "Interest on Home Loan (u/s 80EEA) (Loan Sanctioned between April 2019 to Mar 2022) (Cost of House Less than 45 Lakh)",
//                 categoryLimit: 150000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             }
//         ],
//         finalDeduction: 0
//     });

//     const [hraExemption, setHraExemption] = useState({
//         proofSubmitted: 0
//     });

//     const [otherExamption, setOtherExamption] = useState({
//         items: [
//             {
//                 section: "OtherExamption",
//                 category: "LTA Examption",
//                 // categoryLimit: 0,
//                 // categoryFinalDeduction: 0,
//                 // proofSubmitted: 0,
//                 // proofDocument: null,
//                 // existingDocument: null,
//                 // status: "Pending",
//                 // adminRemarks: "",
//                 // enabled: false
//             },
//             {
//                 section: "OtherExamption",
//                 category: "Less: Telephone Allowance",
//                 // categoryLimit: 0,
//                 // categoryFinalDeduction: 0,
//                 // proofSubmitted: 0,
//                 // proofDocument: null,
//                 // existingDocument: null,
//                 // status: "Pending",
//                 // adminRemarks: "",
//                 // enabled: false
//             },
//             {
//                 section: "OtherExamption",
//                 category: "Less: Internet Allowance",
//                 // categoryLimit: 0,
//                 // categoryFinalDeduction: 0,
//                 // proofSubmitted: 0,
//                 // proofDocument: null,
//                 // existingDocument: null,
//                 // status: "Pending",
//                 // adminRemarks: "",
//                 // enabled: false
//             },

//         ],
//         finalDeduction: 0
//     });

//     const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false);

//     const handleTermsChange = (e) => {
//         setAcceptTermsAndConditions(e.target.checked);
//     };

//     const [isBuyer, setIsBuyer] = useState(false);
//     const [isYes, setIsYes] = useState(false);
//     const [isYes1, setIsYes1] = useState(false);
//     const [isYes2, setIsYes2] = useState(false);

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         if (!userDetails?.schoolId || !userDetails?.userId) {
//             toast.error('Authentication details missing');
//             navigate('/login');
//             return;
//         }
//         setSchoolId(userDetails.schoolId);
//         setEmployeeId(userDetails.userId);

//         fetchEmployeeData(userDetails.schoolId, userDetails.userId);
//         fetchItDeclaration(userDetails.schoolId, userDetails.userId);
//     }, [navigate]);

//     const fetchEmployeeData = async (schoolId, empId) => {
//         try {
//             const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//             if (!employeeRes.hasError && employeeRes.data?.data) {
//                 setEmployeeDetails(employeeRes.data.data);
//             }
//         } catch (error) {
//             toast.error("Failed to fetch employee details");
//         }
//     };

//     const fetchItDeclaration = async (schoolId, empId) => {
//         try {
//             const declarationRes = await getAPI(`/it-declaration/${schoolId}/${empId}?academicYear=${academicYear}`);
//             if (!declarationRes.hasError && declarationRes.data?.data) {
//                 const data = declarationRes.data.data;
//                 setSection80C({
//                     ...data.section80C,
//                     items: data.section80C.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument
//                     }))
//                 });
//                 setSection80D({
//                     ...data.section80D,
//                     items: data.section80D.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument
//                     }))
//                 });
//                 setOtherSections({
//                     ...data.otherSections,
//                     items: data.otherSections.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument,
//                         enabled: item.proofSubmitted > 0 && [0, 1, 2, 3, 7, 8].includes(data.otherSections.items.indexOf(item))
//                     }))
//                 });
//                 setHraExemption(data.hraExemption);
//                 setEmployeeDetails(prev => ({
//                     ...prev,
//                     taxRegime: data.taxRegime,
//                     panNumber: data.panNumber
//                 }));
//                 setAcceptTermsAndConditions(data.acceptTermsAndConditions);
//                 setIsBuyer(data.otherSections.items[0].enabled);
//                 setIsYes(data.otherSections.items[1].enabled);
//                 setIsYes1(data.otherSections.items[2].enabled);
//                 setIsYes2(data.otherSections.items[3].enabled);
//             }
//         } catch (error) {
//             toast.error("Failed to fetch IT declaration");
//         }
//     };

//     const handleToggle = (index) => {
//         const updatedItems = [...otherSections.items];
//         const enabled = !updatedItems[index].enabled;
//         updatedItems[index] = {
//             ...updatedItems[index],
//             enabled,
//             proofSubmitted: enabled ? updatedItems[index].categoryLimit : 0,
//             proofDocument: enabled ? updatedItems[index].proofDocument : null,
//             existingDocument: enabled ? updatedItems[index].existingDocument : null,
//             categoryFinalDeduction: enabled ? updatedItems[index].categoryLimit : 0
//         };

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });

//         if (index === 0) setIsBuyer(enabled);
//         if (index === 1) setIsYes(enabled);
//         if (index === 2) setIsYes1(enabled);
//         if (index === 3) setIsYes2(enabled);
//     };

//     const handle80CInputChange = (index, field, value) => {
//         const updatedItems = [...section80C.items];
//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: field === 'proofSubmitted' ? Number(value.replace(/,/g, '')) || 0 : value
//         };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     const handle80CFileUpload = (index, file) => {
//         const updatedItems = [...section80C.items];
//         if (!file) {
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     const handle80DInputChange = (index, field, value) => {
//         const updatedItems = [...section80D.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = { ...updatedItems[index], [field]: numericValue };

//         if ([0, 1, 4].includes(index)) {
//             if (numericValue > 0) {
//                 [0, 1, 4].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [0, 1, 4].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         if ([2, 3, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [2, 3, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [2, 3, 5].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculate80DTotals(updatedItems);
//         setSection80D({ ...section80D, items: calculatedItems, finalDeduction });
//     };

//     const handle80DFileUpload = (index, file) => {
//         const updatedItems = [...section80D.items];
//         if (!file) {
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setSection80D({ ...section80D, items: updatedItems });
//     };

//     const handleOtherSectionsInputChange = (index, field, value) => {
//         const updatedItems = [...otherSections.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: numericValue,
//             categoryFinalDeduction: numericValue > 0 ? Math.min(numericValue, updatedItems[index].categoryLimit) : 0
//         };

//         if ([4, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [4, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [4, 5].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });
//     };

//     const handleOtherSectionsFileUpload = (index, file) => {
//         const updatedItems = [...otherSections.items];
//         if (!file) {
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
//             setOtherSections({ ...otherSections, items: updatedItems });
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setOtherSections({ ...otherSections, items: updatedItems });
//     };

//     const calculate80CTotals = () => {
//         const totalProofSubmitted = section80C.items.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = Math.min(totalProofSubmitted, section80C.sectionLimit);
//         return { totalProofSubmitted, finalDeduction };
//     };

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
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const calculateOtherSectionsTotals = (items) => {
//         const updatedItems = items.map(item => ({
//             ...item,
//             categoryFinalDeduction: item.categoryLimit > 0 ? Math.min(item.proofSubmitted, item.categoryLimit) : item.proofSubmitted
//         }));
//         const totalProofSubmitted = updatedItems.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = updatedItems.reduce(
//             (sum, item) => sum + (item.categoryFinalDeduction || 0),
//             0
//         );
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const validateSubmission = () => {
//         if (!acceptTermsAndConditions) {
//             toast.error('You must accept the terms and conditions');
//             return false;
//         }
//         const invalid80C = section80C.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
//         const invalid80D = section80D.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
//         const invalidOther = otherSections.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);

//         if (invalid80C || invalid80D || invalidOther) {
//             toast.error('Please upload documents for all submitted proofs');
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         if (!validateSubmission()) {
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append('schoolId', schoolId);
//             formData.append('employeeId', employeeId);
//             formData.append('academicYear', academicYear);
//             formData.append('taxRegime', employeeDetails.taxRegime || 'old');
//             formData.append('panNumber', employeeDetails.panNumber || '');

//             formData.append('acceptTermsAndConditions', acceptTermsAndConditions);

//             section80C.items.forEach((item, index) => {
//                 formData.append(`section80C[${index}][section]`, item.section);
//                 formData.append(`section80C[${index}][category]`, item.category);
//                 formData.append(`section80C[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80C[${index}][status]`, item.status);
//                 formData.append(`section80C[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`section80C[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`section80CProofs[${index}]`, item.proofDocument);
//                 }
//             });
//             formData.append('section80C[sectionLimit]', section80C.sectionLimit);

//             section80D.items.forEach((item, index) => {
//                 formData.append(`section80D[${index}][section]`, item.section);
//                 formData.append(`section80D[${index}][category]`, item.category);
//                 formData.append(`section80D[${index}][categoryLimit]`, item.categoryLimit);
//                 formData.append(`section80D[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction);
//                 formData.append(`section80D[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80D[${index}][status]`, item.status);
//                 formData.append(`section80D[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`section80D[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`section80DProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             otherSections.items.forEach((item, index) => {
//                 formData.append(`otherSections[${index}][section]`, item.section);
//                 formData.append(`otherSections[${index}][category]`, item.category);
//                 formData.append(`otherSections[${index}][categoryLimit]`, item.categoryLimit || 0);
//                 formData.append(`otherSections[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction || 0);
//                 formData.append(`otherSections[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`otherSections[${index}][status]`, item.status);
//                 formData.append(`otherSections[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`otherSections[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`otherSectionsProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             const response = await postAPI(
//                 `/it-declaration/${schoolId}/${employeeId}`,
//                 formData,
//                 { 'Content-Type': 'multipart/form-data' },
//                 true
//             );

//             if (!response.hasError) {
//                 toast.success("IT Declaration submitted successfully!");
//                 fetchItDeclaration(schoolId, employeeId); // Refresh data after submission
//             } else {
//                 toast.error(response.message || "Failed to submit declaration");
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             toast.error("An error occurred while submitting the declaration");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const { totalProofSubmitted: total80C, finalDeduction: final80C } = calculate80CTotals();
//     const { totalProofSubmitted: total80D, finalDeduction: final80D } = calculate80DTotals(section80D.items);
//     const { totalProofSubmitted: totalOther, finalDeduction: finalOther } = calculateOtherSectionsTotals(otherSections.items);

//     const handleNavigateToRentDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/rent-details");
//     };

// const handleNavigateToLtaDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/lta-details");
//     };
//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN').format(amount);
//     };

//     const getFileName = (proofDocument, existingDocument) => {
//         if (proofDocument instanceof File) {
//             return proofDocument.name.length > 25 ? proofDocument.name.slice(0, 25) + '...' : proofDocument.name;
//         }
//         if (existingDocument) {
//             const fullName = existingDocument.split('\\').pop().split('/').pop() || 'Existing file';
//             return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
//         }
//         return 'No file';
//     };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2">
//                                     <h4 className="payroll-title text-center mb-0">
//                                         Income Tax (IT) Declaration
//                                     </h4>
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                                     <div className="col-md-8">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee Name: </strong> {employeeDetails.employeeName || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee ID: </strong>{employeeDetails.employeeId || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Tax Regime: </strong>{employeeDetails.taxRegime === "new" ? "New" : "Old" || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>PAN No: </strong>{employeeDetails.panNumber || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark'>
//                                             <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year: </label>
//                                             <select
//                                                 id="yearSelect"
//                                                 className="custom-select"
//                                                 aria-label="Select Year"
//                                                 style={{ marginLeft: "5px" }}
//                                                 value={academicYear}
//                                                 onChange={(e) => setAcademicYear(e.target.value)}
//                                             >
//                                                 <option value="2025-26">2025-26</option>
//                                                 <option value="2026-27">2026-27</option>
//                                                 <option value="2027-28">2027-28</option>
//                                                 <option value="2028-29">2028-29</option>
//                                                 <option value="2029-30">2029-30</option>
//                                             </select>
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive mb-4">
//                                     <table className="border border-dark mb-4 table table-hover">
//                                         <thead className="bg-light-subtle">
//                                             <tr className="payroll-table-header">
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Investment
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>
//                                                     Limit
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "130px" }}>
//                                                     Proof Sub.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
//                                                     Final Ded.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "200px" }}>
//                                                     Upload Document
//                                                 </th>
//                                                 <th className="text-center align-content-center border text-nowrap border-dark p-2" style={{ width: "120px" }}>
//                                                     Status
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Admin Remarks
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(section80C.sectionLimit)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80C)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80C)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80C.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80CInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className="form-control payroll-input-border me-2"
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                             />

//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80D)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80D)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80D.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             disabled={item.disabled}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border me-2 ${item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                                 disabled={item.disabled}
//                                                             />

//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(totalOther)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(finalOther)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {otherSections.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">
//                                                         {item.category}
//                                                         {index < 4 && (
//                                                             <div className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1" style={{ maxWidth: "fit-content" }}>
//                                                                 <button
//                                                                     className={`btn ${item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     type='button'
//                                                                     style={{
//                                                                         backgroundColor: item.enabled ? 'white' : 'black',
//                                                                         borderColor: item.enabled ? 'black' : '',
//                                                                         color: item.enabled ? 'black' : 'white',
//                                                                         maxWidth: "fit-content",
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     Yes
//                                                                 </button>
//                                                                 <button
//                                                                     type='button'
//                                                                     className={`btn ${!item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     style={{
//                                                                         backgroundColor: !item.enabled ? 'white' : 'black',
//                                                                         borderColor: !item.enabled ? 'black' : '',
//                                                                         color: !item.enabled ? 'black' : 'white',
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none",
//                                                                         maxWidth: "fit-content"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     No
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {index < 4 ? (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${!item.enabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 readOnly
//                                                             />
//                                                         ) : (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 onChange={(e) => handleOtherSectionsInputChange(index, 'proofSubmitted', e.target.value)}
//                                                                 required={item.proofSubmitted > 0}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border me-2 ${index < 4 && !item.enabled || item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handleOtherSectionsFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                                 disabled={index < 4 && !item.enabled || item.disabled}
//                                                             />

//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(hraExemption.proofSubmitted)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={handleNavigateToRentDetails}
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         Enter Rent Details
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"
//                                                         value={hraExemption.status}
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Other Exemption</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2">

//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">

//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {otherExamption.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark p-2">

//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={handleNavigateToLtaDetails}
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         Enter LTA Details
//                                                     </button>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr>
//                                                 <td colSpan={7} className="border border-dark fw-bold p-2">
//                                                     <div className="d-flex align-items-center gap-1">
//                                                         <p className="form-check ms-1">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="form-check-input mt-0 me-2"
//                                                                 id="acceptTermsAndConditions"
//                                                                 name="acceptTermsAndConditions"
//                                                                 checked={acceptTermsAndConditions}
//                                                                 onChange={handleTermsChange}
//                                                                 required
//                                                             />
//                                                         </p>
//                                                         <p className="mb-0 fw-bold text-dark">
//                                                             I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
//                                                         </p>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 <div className="row m-0">
//                                     <div className="col-md-12 text-center">
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary"
//                                             disabled={isSubmitting}
//                                         >
//                                             {isSubmitting ? 'Submitting...' : 'Submit'}
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

// export default EmployeeItDeclaration;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';

// const EmployeeItDeclaration = () => {
//     const navigate = useNavigate();
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [employeeDetails, setEmployeeDetails] = useState({});
//     const [academicYear, setAcademicYear] = useState("2025-26");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [employeeCtc, setEmployeeCtcDetails] = useState(null)
//     const [section80C, setSection80C] = useState({
//         items: [
//             {
//                 section: "80C",
//                 category: "Life Insurance Premium including Bima Nivesh (only Self, Spouse and children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Employee Provident Fund (EPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "Public Provident Fund (PPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "Tuition Fees (For 2 Children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Bank Fixed Deposit",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Post Office Time Deposit",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Sukanya Samriddhi Account",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Housing Loan Payment of Principal/Stamp Duty & Registration",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Unit Link Insurance Plan / Infrastructure Bond / National Saving Certificate / Accrued Interest on NSC",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Subscription to notified Central Government security (NSS) / Mutual Funds/ELSS and others / Pension Fund",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             }
//         ],
//         sectionLimit: 150000,
//         finalDeduction: 0
//     });

//     const [section80D, setSection80D] = useState({
//         items: [
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self, Spouse and Dependent Children (Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self, Spouse and Dependent Children (60 Years or Above)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Parents (Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
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
//                 existingDocument: null,
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
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Expenditure for Parents (60 Years or Above) (If No Insurance Premium)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
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
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             }
//         ],
//         finalDeduction: 0
//     });

//     const [otherSections, setOtherSections] = useState({
//         items: [
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Disability (Form 10-I) (Flat Deduction of INR 75000) (Yes/No)",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Severe Disability (Form 10-I)",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Disability",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Severe Disability",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred, Maximum of INR 40000)",
//                 categoryLimit: 40000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred, Maximum of INR 100000)",
//                 categoryLimit: 100000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Other",
//                 category: "Interest on Educational Loan for Higher Studies (u/s 80E) - Self, Spouse & Children [Allowed for 8 Years from repayment starts]",
//                 categoryLimit: 0,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Section80EE",
//                 category: "Interest on Home Loan (u/s 80EE) (Loan Sanctioned between April 2016 to Mar 2017)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Section80EEA",
//                 category: "Interest on Home Loan (u/s 80EEA) (Loan Sanctioned between April 2019 to Mar 2022) (Cost of House Less than 45 Lakh)",
//                 categoryLimit: 150000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             }
//         ],
//         finalDeduction: 0
//     });

//     const [hraExemption, setHraExemption] = useState({
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [ltaExemption, setLTAExemption] = useState({
//         categoryLimit: 0,
//         categoryFinalDeduction: 0,
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [telephoneAllowance, setTelephoneAllowance] = useState({
//         categoryLimit: 0,
//         categoryFinalDeduction: 0,
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [internetAllowance, setInternetAllowance] = useState({
//         categoryLimit: 0,
//         categoryFinalDeduction: 0,
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     // const [otherExamption, setOtherExamption] = useState({
//     //     items: [
//     //         {
//     //             section: "OtherExemption",
//     //             category: "LTA Exemption",
//     //             categoryLimit: 50000,
//     //             categoryFinalDeduction: 0,
//     //             proofSubmitted: 0,
//     //             proofDocument: null,
//     //             existingDocument: null,
//     //             status: "Pending",
//     //             adminRemarks: ""
//     //         },

//     //         {
//     //             section: "OtherExemption",
//     //             category: "Telephone Allowance",
//     //             categoryLimit: 5000,
//     //             categoryFinalDeduction: 0,
//     //             proofSubmitted: 0,
//     //             proofDocument: null,
//     //             existingDocument: null,
//     //             status: "Pending",
//     //             adminRemarks: ""
//     //         },

//     //         {
//     //             section: "OtherExemption",
//     //             category: "Internet Allowance",
//     //             categoryLimit: 5000,
//     //             categoryFinalDeduction: 0,
//     //             proofSubmitted: 0,
//     //             proofDocument: null,
//     //             existingDocument: null,
//     //             status: "Pending",
//     //             adminRemarks: ""
//     //         }
//     //     ],
//     // });

//     const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false);
//     const handleTermsChange = (e) => {
//         setAcceptTermsAndConditions(e.target.checked);
//     };

//     const [isBuyer, setIsBuyer] = useState(false);
//     const [isYes, setIsYes] = useState(false);
//     const [isYes1, setIsYes1] = useState(false);
//     const [isYes2, setIsYes2] = useState(false);

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         if (!userDetails?.schoolId || !userDetails?.userId) {
//             toast.error('Authentication details missing');
//             navigate('/login');
//             return;
//         }
//         setSchoolId(userDetails.schoolId);
//         setEmployeeId(userDetails.userId);
//         setAcademicYear(userDetails.acadmicYear);

//         fetchEmployeeData(userDetails.schoolId, userDetails.userId);
//         feachEmployeeCtc(userDetails.schoolId, userDetails.userId, userDetails.acadmicYear);
//         fetchItDeclaration(userDetails.schoolId, userDetails.userId);
//     }, [navigate]);

//     const fetchEmployeeData = async (schoolId, empId) => {
//         try {
//             const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//             if (!employeeRes.hasError && employeeRes.data?.data) {
//                 setEmployeeDetails(employeeRes.data.data);
//                 // feachEmployeeCtc(schoolId,empId,academicYear);
//             }
//         } catch (error) {
//             toast.error("Failed to fetch employee details");
//         }
//     };

//     const fetchItDeclaration = async (schoolId, empId) => {
//         try {
//             const declarationRes = await getAPI(`/it-declaration/${schoolId}/${empId}?academicYear=${academicYear}`);
//             if (!declarationRes.hasError && declarationRes.data?.data) {
//                 const data = declarationRes.data.data;
//                 setSection80C({
//                     ...data.section80C,
//                     items: data.section80C.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument
//                     }))
//                 });
//                 setSection80D({
//                     ...data.section80D,
//                     items: data.section80D.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument
//                     }))
//                 });
//                 setOtherSections({
//                     ...data.otherSections,
//                     items: data.otherSections.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument,
//                         enabled: item.proofSubmitted > 0 && [0, 1, 2, 3, 7, 8].includes(data.otherSections.items.indexOf(item))
//                     }))
//                 });
//                 setHraExemption({
//                     ...data.hraExemption,
//                     proofDocument: null,
//                     existingDocument: data.hraExemption.proofDocument
//                 });
//                 // setOtherExamption({
//                 //     ...data.otherExamption,
//                 //     items: data.otherExamption?.items?.map(item => ({
//                 //         ...item,
//                 //         proofDocument: null,
//                 //         existingDocument: item.proofDocument
//                 //     })) || otherExamption.items
//                 // });
//                 setEmployeeDetails(prev => ({
//                     ...prev,
//                     taxRegime: data.taxRegime,
//                     panNumber: data.panNumber
//                 }));
//                 setAcceptTermsAndConditions(data.acceptTermsAndConditions);
//                 setIsBuyer(data.otherSections.items[0].enabled);
//                 setIsYes(data.otherSections.items[1].enabled);
//                 setIsYes1(data.otherSections.items[2].enabled);
//                 setIsYes2(data.otherSections.items[3].enabled);
//             }
//         } catch (error) {
//             toast.error("Failed to fetch IT declaration");
//         }
//     };

//     const handleToggle = (index) => {
//         const updatedItems = [...otherSections.items];
//         const enabled = !updatedItems[index].enabled;
//         updatedItems[index] = {
//             ...updatedItems[index],
//             enabled,
//             proofSubmitted: enabled ? updatedItems[index].categoryLimit : 0,
//             proofDocument: enabled ? updatedItems[index].proofDocument : null,
//             existingDocument: enabled ? updatedItems[index].existingDocument : null,
//             categoryFinalDeduction: enabled ? updatedItems[index].categoryLimit : 0
//         };

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });

//         if (index === 0) setIsBuyer(enabled);
//         if (index === 1) setIsYes(enabled);
//         if (index === 2) setIsYes1(enabled);
//         if (index === 3) setIsYes2(enabled);
//     };

//     const handle80CInputChange = (index, field, value) => {
//         const updatedItems = [...section80C.items];
//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: field === 'proofSubmitted' ? Number(value.replace(/,/g, '')) || 0 : value
//         };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     const handle80CFileUpload = (index, file) => {
//         const updatedItems = [...section80C.items];
//         if (!file) {
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     const handle80DInputChange = (index, field, value) => {
//         const updatedItems = [...section80D.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = { ...updatedItems[index], [field]: numericValue };

//         if ([0, 1, 4].includes(index)) {
//             if (numericValue > 0) {
//                 [0, 1, 4].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [0, 1, 4].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         if ([2, 3, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [2, 3, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [2, 3, 5].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculate80DTotals(updatedItems);
//         setSection80D({ ...section80D, items: calculatedItems, finalDeduction });
//     };

//     const handle80DFileUpload = (index, file) => {
//         const updatedItems = [...section80D.items];
//         if (!file) {
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setSection80D({ ...section80D, items: updatedItems });
//     };

//     const handleOtherSectionsInputChange = (index, field, value) => {
//         const updatedItems = [...otherSections.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: numericValue,
//             categoryFinalDeduction: numericValue > 0 ? Math.min(numericValue, updatedItems[index].categoryLimit) : 0
//         };

//         if ([4, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [4, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [4, 5].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });
//     };

//     const handleOtherSectionsFileUpload = (index, file) => {
//         const updatedItems = [...otherSections.items];
//         if (!file) {
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
//             setOtherSections({ ...otherSections, items: updatedItems });
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setOtherSections({ ...otherSections, items: updatedItems });
//     };

//     const calculate80CTotals = () => {
//         const totalProofSubmitted = section80C.items.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = Math.min(totalProofSubmitted, section80C.sectionLimit);
//         return { totalProofSubmitted, finalDeduction };
//     };

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
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const calculateOtherSectionsTotals = (items) => {
//         const updatedItems = items.map(item => ({
//             ...item,
//             categoryFinalDeduction: item.categoryLimit > 0 ? Math.min(item.proofSubmitted, item.categoryLimit) : item.proofSubmitted
//         }));
//         const totalProofSubmitted = updatedItems.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = updatedItems.reduce(
//             (sum, item) => sum + (item.categoryFinalDeduction || 0),
//             0
//         );
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const calculateOtherExemptionTotals = (items) => {
//         const updatedItems = items.map(item => ({
//             ...item,
//             categoryFinalDeduction: item.categoryLimit > 0 ? Math.min(item.proofSubmitted, item.categoryLimit) : item.proofSubmitted
//         }));
//         const totalProofSubmitted = updatedItems.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = updatedItems.reduce(
//             (sum, item) => sum + (item.categoryFinalDeduction || 0),
//             0
//         );
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const validateSubmission = () => {
//         if (!acceptTermsAndConditions) {
//             toast.error('You must accept the terms and conditions');
//             return false;
//         }
//         const invalid80C = section80C.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
//         const invalid80D = section80D.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
//         const invalidOther = otherSections.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
//         // const invalidOtherExemption = otherExamption.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);

//         if (invalid80C || invalid80D || invalidOther ) {
//             toast.error('Please upload documents for all submitted proofs');
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         if (!validateSubmission()) {
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append('schoolId', schoolId);
//             formData.append('employeeId', employeeId);
//             formData.append('academicYear', academicYear);
//             formData.append('taxRegime', employeeDetails.taxRegime || 'old');
//             formData.append('panNumber', employeeDetails.panNumber || '');
//             formData.append('acceptTermsAndConditions', acceptTermsAndConditions);

//             section80C.items.forEach((item, index) => {
//                 formData.append(`section80C[${index}][section]`, item.section);
//                 formData.append(`section80C[${index}][category]`, item.category);
//                 formData.append(`section80C[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80C[${index}][status]`, item.status);
//                 formData.append(`section80C[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`section80C[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`section80CProofs[${index}]`, item.proofDocument);
//                 }
//             });
//             formData.append('section80C[sectionLimit]', section80C.sectionLimit);

//             section80D.items.forEach((item, index) => {
//                 formData.append(`section80D[${index}][section]`, item.section);
//                 formData.append(`section80D[${index}][category]`, item.category);
//                 formData.append(`section80D[${index}][categoryLimit]`, item.categoryLimit);
//                 formData.append(`section80D[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction);
//                 formData.append(`section80D[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80D[${index}][status]`, item.status);
//                 formData.append(`section80D[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`section80D[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`section80DProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             otherSections.items.forEach((item, index) => {
//                 formData.append(`otherSections[${index}][section]`, item.section);
//                 formData.append(`otherSections[${index}][category]`, item.category);
//                 formData.append(`otherSections[${index}][categoryLimit]`, item.categoryLimit || 0);
//                 formData.append(`otherSections[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction || 0);
//                 formData.append(`otherSections[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`otherSections[${index}][status]`, item.status);
//                 formData.append(`otherSections[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`otherSections[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`otherSectionsProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             // otherExamption.items.forEach((item, index) => {
//             //     formData.append(`otherExamption[${index}][section]`, item.section);
//             //     formData.append(`otherExamption[${index}][category]`, item.category);
//             //     formData.append(`otherExamption[${index}][categoryLimit]`, item.categoryLimit || 0);
//             //     formData.append(`otherExamption[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction || 0);
//             //     formData.append(`otherExamption[${index}][proofSubmitted]`, item.proofSubmitted);
//             //     formData.append(`otherExamption[${index}][status]`, item.status);
//             //     formData.append(`otherExamption[${index}][adminRemarks]`, item.adminRemarks || '');
//             //     if (item.existingDocument) {
//             //         formData.append(`otherExamption[${index}][existingDocument]`, item.existingDocument);
//             //     }
//             //     if (item.proofDocument instanceof File) {
//             //         formData.append(`otherExamptionProofs[${index}]`, item.proofDocument);
//             //     }
//             // });

//             const response = await postAPI(
//                 `/it-declaration/${schoolId}/${employeeId}`,
//                 formData,
//                 { 'Content-Type': 'multipart/form-data' },
//                 true
//             );

//             if (!response.hasError) {
//                 toast.success("IT Declaration submitted successfully!");
//                 fetchItDeclaration(schoolId, employeeId);
//             } else {
//                 toast.error(response.message || "Failed to submit declaration");
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             toast.error("An error occurred while submitting the declaration");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const { totalProofSubmitted: total80C, finalDeduction: final80C } = calculate80CTotals();
//     const { totalProofSubmitted: total80D, finalDeduction: final80D } = calculate80DTotals(section80D.items);
//     const { totalProofSubmitted: totalOther, finalDeduction: finalOther } = calculateOtherSectionsTotals(otherSections.items);
//     // const { totalProofSubmitted: totalOtherExemption, finalDeduction: finalOtherExemption } = calculateOtherExemptionTotals(otherExamption.items);

//     const handleNavigateToRentDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/rent-details");
//     };

//     const handleNavigateToLtaDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/lta-details");
//     };

//     const handleNavigateToTelephoneDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/telephone-allowance-details");
//     };

//     const handleNavigateToInternetDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/internet-allowance-details");
//     };

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN').format(amount);
//     };

//     const getFileName = (proofDocument, existingDocument) => {
//         if (proofDocument instanceof File) {
//             return proofDocument.name.length > 25 ? proofDocument.name.slice(0, 25) + '...' : proofDocument.name;
//         }
//         if (existingDocument) {
//             const fullName = existingDocument.split('\\').pop().split('/').pop() || 'Existing file';
//             return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
//         }
//         return 'No file';
//     };

//     const feachEmployeeCtc = async (schoolId,employeeId,academicYear) => {

//         try {
//           const response = await getAPI(`/get-employee-ctc-details/${schoolId}/${employeeId}/${academicYear}`);
//           console.log("ctc res",response);

//           if (!response.hasError && response.data?.data) {

//           } else {
//             toast.error("No employee CTC data found.");
//           }
//         } catch (error) {
//           toast.error(error.response?.data?.message || "Error occurred.");
//         }
//       };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2">
//                                     <h4 className="payroll-title text-center mb-0">
//                                         Income Tax (IT) Declaration
//                                     </h4>
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                                     <div className="col-md-8">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee Name: </strong> {employeeDetails.employeeName || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee ID: </strong>{employeeDetails.employeeId || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Tax Regime: </strong>{employeeDetails.taxRegime === "new" ? "New" : "Old" || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>PAN No: </strong>{employeeDetails.panNumber || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark'>
//                                             <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year: </label>
//                                             <select
//                                                 id="yearSelect"
//                                                 className="custom-select"
//                                                 aria-label="Select Year"
//                                                 style={{ marginLeft: "5px" }}
//                                                 value={academicYear}
//                                                 onChange={(e) => setAcademicYear(e.target.value)}
//                                             >
//                                                 <option value="2025-26">2025-26</option>
//                                                 <option value="2026-27">2026-27</option>
//                                                 <option value="2027-28">2027-28</option>
//                                                 <option value="2028-29">2028-29</option>
//                                                 <option value="2029-30">2029-30</option>
//                                             </select>
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive mb-4">
//                                     <table className="border border-dark mb-4 table table-hover">
//                                         <thead className="bg-light-subtle">
//                                             <tr className="payroll-table-header">
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Investment
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>
//                                                     Limit
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "130px" }}>
//                                                     Proof Sub.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
//                                                     Final Ded.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "200px" }}>
//                                                     Upload Document
//                                                 </th>
//                                                 <th className="text-center align-content-center border text-nowrap border-dark p-2" style={{ width: "120px" }}>
//                                                     Status
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Admin Remarks
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(section80C.sectionLimit)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80C)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80C)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80C.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80CInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className="form-control payroll-input-border me-2"
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                             />
//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80D)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80D)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80D.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             disabled={item.disabled}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border me-2 ${item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(totalOther)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(finalOther)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {otherSections.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">
//                                                         {item.category}
//                                                         {index < 4 && (
//                                                             <div className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1" style={{ maxWidth: "fit-content" }}>
//                                                                 <button
//                                                                     className={`btn ${item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     type='button'
//                                                                     style={{
//                                                                         backgroundColor: item.enabled ? 'white' : 'black',
//                                                                         borderColor: item.enabled ? 'black' : '',
//                                                                         color: item.enabled ? 'black' : 'white',
//                                                                         maxWidth: "fit-content",
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     Yes
//                                                                 </button>
//                                                                 <button
//                                                                     type='button'
//                                                                     className={`btn ${!item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     style={{
//                                                                         backgroundColor: !item.enabled ? 'white' : 'black',
//                                                                         borderColor: !item.enabled ? 'black' : '',
//                                                                         color: !item.enabled ? 'black' : 'white',
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none",
//                                                                         maxWidth: "fit-content"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     No
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {index < 4 ? (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${!item.enabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 readOnly
//                                                             />
//                                                         ) : (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 onChange={(e) => handleOtherSectionsInputChange(index, 'proofSubmitted', e.target.value)}
//                                                                 required={item.proofSubmitted > 0}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border me-2 ${index < 4 && !item.enabled || item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handleOtherSectionsFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                                 disabled={index < 4 && !item.enabled || item.disabled}
//                                                             />
//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(hraExemption.proofSubmitted)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={handleNavigateToRentDetails}
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         Enter Rent Details
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"
//                                                         value={hraExemption.status}
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{hraExemption.adminRemarks}</td>
//                                             </tr>
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Other Exemption</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {/* {formatCurrency(totalOtherExemption)} */}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     {/* {formatCurrency(finalOtherExemption)} */}
//                                                 </td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {/* {otherExamption.items.map((item, index) => ( */}
//                                             <tr className='payroll-table-body'>
//                                                 <td className="align-content-center border border-dark px-3 py-2">LTA Examption</td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(ltaExemption.categoryLimit)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(ltaExemption.proofSubmitted)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(ltaExemption.categoryFinalDeduction)}
//                                                 </td>
//                                                 <td className="text-center align-content-center border border-dark p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={
//                                                             handleNavigateToLtaDetails
//                                                             // index === 1 ? handleNavigateToTelephoneDetails :
//                                                             //     handleNavigateToInternetDetails
//                                                         }
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         "Enter LTA Details"
//                                                         {/* index === 1 ? "Enter Telephone Details" :
//                                                                     "Enter Internet Details"} */}
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"
//                                                         value={ltaExemption.status}
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td className="text-start align-content-center border border-dark p-2">{ltaExemption.adminRemarks}</td>
//                                             </tr>
//                                             <tr className='payroll-table-body'>
//                                                 <td className="align-content-center border border-dark px-3 py-2">Telephone Allowance</td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(telephoneAllowance.categoryLimit)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(telephoneAllowance.proofSubmitted)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(telephoneAllowance.categoryFinalDeduction)}
//                                                 </td>
//                                                 <td className="text-center align-content-center border border-dark p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={
//                                                             handleNavigateToTelephoneDetails
//                                                             }
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         "Enter Telephone Details"
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"
//                                                         value={telephoneAllowance.status}
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td className="text-start align-content-center border border-dark p-2">{telephoneAllowance.adminRemarks}</td>
//                                             </tr>
//                                             <tr className='payroll-table-body'>
//                                                 <td className="align-content-center border border-dark px-3 py-2">Internet Allowance</td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(internetAllowance.categoryLimit)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(internetAllowance.proofSubmitted)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(internetAllowance.categoryFinalDeduction)}
//                                                 </td>
//                                                 <td className="text-center align-content-center border border-dark p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={
//                                                             handleNavigateToInternetDetails
//                                                             // index === 1 ? handleNavigateToTelephoneDetails :
//                                                             //     handleNavigateToInternetDetails
//                                                         }
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         "Enter Internet Details"
//                                                         {/* index === 1 ? "Enter Telephone Details" :
//                                                                     "Enter Internet Details"} */}
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"
//                                                         value={internetAllowance.status}
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td className="text-start align-content-center border border-dark p-2">{ltaExemption.adminRemarks}</td>
//                                             </tr>
//                                             {/* ))} */}
//                                             <tr>
//                                                 <td colSpan={7} className="border border-dark fw-bold p-2">
//                                                     <div className="d-flex align-items-center gap-1">
//                                                         <p className="form-check ms-1">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="form-check-input mt-0 me-2"
//                                                                 id="acceptTermsAndConditions"
//                                                                 name="acceptTermsAndConditions"
//                                                                 checked={acceptTermsAndConditions}
//                                                                 onChange={handleTermsChange}
//                                                                 required
//                                                             />
//                                                         </p>
//                                                         <p className="mb-0 fw-bold text-dark">
//                                                             I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
//                                                         </p>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 <div className="row m-0">
//                                     <div className="col-md-12 text-center">
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary"
//                                             disabled={isSubmitting}
//                                         >
//                                             {isSubmitting ? 'Submitting...' : 'Submit'}
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

// export default EmployeeItDeclaration;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';
// const EmployeeItDeclaration = () => {
//     const navigate = useNavigate();
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [employeeDetails, setEmployeeDetails] = useState({});
//     const [empPanNumber, setEmpPanNumber] = useState(null);
//     const [academicYear, setAcademicYear] = useState("2025-26");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [employeeCtc, setEmployeeCtcDetails] = useState(null);
//     const [ltaCategoryLimit, setLtaCategoryLimit] = useState(0);
//     const [telCategoryLimit, setTelCategoryLimit] = useState(0);
//     const [internetCategoryLimit, setInternetCategoryLimit] = useState(0);
//     const [section80C, setSection80C] = useState({
//         items: [
//             {
//                 section: "80C",
//                 category: "Life Insurance Premium including Bima Nivesh (only Self, Spouse and children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Employee Provident Fund (EPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "Public Provident Fund (PPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "Tuition Fees (For 2 Children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Bank Fixed Deposit",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Post Office Time Deposit",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Sukanya Samriddhi Account",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Housing Loan Payment of Principal/Stamp Duty & Registration",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Unit Link Insurance Plan / Infrastructure Bond / National Saving Certificate / Accrued Interest on NSC",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Subscription to notified Central Government security (NSS) / Mutual Funds/ELSS and others / Pension Fund",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             }
//         ],
//         sectionLimit: 150000,
//         finalDeduction: 0
//     });

//     const [section80D, setSection80D] = useState({
//         items: [
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self, Spouse and Dependent Children (Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self, Spouse and Dependent Children (60 Years or Above)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Parents (Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
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
//                 existingDocument: null,
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
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Expenditure for Parents (60 Years or Above) (If No Insurance Premium)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
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
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             }
//         ],
//         finalDeduction: 0
//     });

//     const [otherSections, setOtherSections] = useState({
//         items: [
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Disability (Form 10-I) (Flat Deduction of INR 75000) (Yes/No)",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Severe Disability (Form 10-I)",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Disability",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Severe Disability",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred, Maximum of INR 40000)",
//                 categoryLimit: 40000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred, Maximum of INR 100000)",
//                 categoryLimit: 100000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Other",
//                 category: "Interest on Educational Loan for Higher Studies (u/s 80E) - Self, Spouse & Children [Allowed for 8 Years from repayment starts]",
//                 categoryLimit: 0,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Section80EE",
//                 category: "Interest on Home Loan (u/s 80EE) (Loan Sanctioned between April 2016 to Mar 2017)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Section80EEA",
//                 category: "Interest on Home Loan (u/s 80EEA) (Loan Sanctioned between April 2019 to Mar 2022) (Cost of House Less than 45 Lakh)",
//                 categoryLimit: 150000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             }
//         ],
//         finalDeduction: 0
//     });

//     const [hraExemption, setHraExemption] = useState({
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [ltaExemption, setLTAExemption] = useState({
//         categoryLimit: 0,
//         categoryFinalDeduction: 0,
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [telephoneAllowance, setTelephoneAllowance] = useState({
//         categoryLimit: 0,
//         categoryFinalDeduction: 0,
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [internetAllowance, setInternetAllowance] = useState({
//         categoryLimit: 0,
//         categoryFinalDeduction: 0,
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false);
//     const handleTermsChange = (e) => {
//         setAcceptTermsAndConditions(e.target.checked);
//     };

//     const [isBuyer, setIsBuyer] = useState(false);
//     const [isYes, setIsYes] = useState(false);
//     const [isYes1, setIsYes1] = useState(false);
//     const [isYes2, setIsYes2] = useState(false);

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         if (!userDetails?.schoolId || !userDetails?.userId) {
//             toast.error('Authentication details missing');
//             navigate('/login');
//             return;
//         }
//         setSchoolId(userDetails.schoolId);
//         setEmployeeId(userDetails.userId);
//         setAcademicYear(userDetails.academicYear);

//         fetchEmployeeData(userDetails.schoolId, userDetails.userId,userDetails.academicYear);
//         feachEmployeeCtc(userDetails.schoolId, userDetails.userId, userDetails.academicYear);
//         fetchItDeclaration(userDetails.schoolId, userDetails.userId,userDetails.academicYear );
//     }, []);

//     const fetchEmployeeData = async (schoolId, empId, academicYear) => {
//         try {
//             const employeeRes = await getAPI(`/get-employee-details/${schoolId}/${empId}/${academicYear}`);
//             console.log(employeeRes);

//             // const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
//             if (!employeeRes.hasError && employeeRes.data?.data?.employeeInfo) {
//                 setEmployeeDetails(employeeRes.data.data.employeeInfo);
//                 setEmpPanNumber(employeeRes.data.data.employeeInfo.panNumber)
//             }
//         } catch (error) {
//             toast.error("Failed to fetch employee details");
//         }
//     };

//     const fetchItDeclaration = async (schoolId, empId, academicYear) => {
//         try {
//             const declarationRes = await getAPI(`/it-declaration/${schoolId}/${empId}?academicYear=${academicYear}`);
//             console.log("declarationRes",declarationRes);

//             if (!declarationRes.hasError && declarationRes.data?.data) {
//                 const data = declarationRes.data.data;
//                 setSection80C({
//                     ...data.section80C,
//                     items: data.section80C.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument
//                     }))
//                 });
//                 setSection80D({
//                     ...data.section80D,
//                     items: data.section80D.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument
//                     }))
//                 });
//                 setOtherSections({
//                     ...data.otherSections,
//                     items: data.otherSections.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument,
//                         enabled: item.proofSubmitted > 0 && [0, 1, 2, 3, 7, 8].includes(data.otherSections.items.indexOf(item))
//                     }))
//                 });
//                 setHraExemption({
//                     ...data.hraExemption,
//                     proofDocument: null,
//                     existingDocument: data.hraExemption.proofDocument
//                 });
//                 setEmployeeDetails(prev => ({
//                     ...prev,
//                     taxRegime: data.taxRegime,
//                     panNumber: data.panNumber
//                 }));
//                 setAcceptTermsAndConditions(data.acceptTermsAndConditions);
//                 setIsBuyer(data.otherSections.items[0].enabled);
//                 setIsYes(data.otherSections.items[1].enabled);
//                 setIsYes1(data.otherSections.items[2].enabled);
//                 setIsYes2(data.otherSections.items[3].enabled);

//                 // New lta details 
//                 setLTAExemption(prev => ({
//                     ...prev,
//                     status: data.otherExemption?.ltaExemption?.status || "Pending",
//                     adminRemarks: data.otherExemption?.ltaExemption?.adminRemarks || "",
//                     categoryFinalDeduction: data.otherExemption?.ltaExemption?.categoryFinalDeduction || 0,
//                     categoryLimit : data.otherExemption?.ltaExemption?.categoryLimit || ltaCategoryLimit,
//                     proofSubmitted:data.otherExemption.ltaExemption?.proofSubmitted || 0,
//                 }));
//                 setInternetAllowance(prev => ({
//                     ...prev,
//                     status: data.otherExemption?.internetAllowance?.status || "Pending",
//                     adminRemarks: data.otherExemption?.internetAllowance?.adminRemarks || "",
//                     categoryFinalDeduction: data.otherExemption?.internetAllowance?.categoryFinalDeduction || 0,
//                     categoryLimit : data.otherExemption?.internetAllowance?.categoryLimit || internetCategoryLimit,
//                     proofSubmitted:data.otherExemption.internetAllowance?.proofSubmitted || 0,
//                 }));
//                 setTelephoneAllowance(prev => ({
//                     ...prev,
//                     status: data.otherExemption?.telephoneAllowance?.status || "Pending",
//                     adminRemarks: data.otherExemption?.telephoneAllowance?.adminRemarks || "",
//                     categoryFinalDeduction: data.otherExemption?.telephoneAllowance?.categoryFinalDeduction || 0,
//                     categoryLimit : data.otherExemption?.telephoneAllowance?.categoryLimit || telCategoryLimit,
//                     proofSubmitted:data.otherExemption.telephoneAllowance?.proofSubmitted || 0,}));
//             }
//         } catch (error) {
//             toast.error("Failed to fetch IT declaration");
//         }
//     };

//     const feachEmployeeCtc = async (schoolId, employeeId, academicYear) => {
//         try {
//             const response = await getAPI(`/get-employee-ctc-details/${schoolId}/${employeeId}/${academicYear}`);
//             console.log("response ctc",response);

//             if (!response.hasError && response.data?.data) {
//                 setEmployeeCtcDetails(response.data.data);
//                 const components = response.data.data.components;
//                 components.forEach(component => {
//                     if (component.ctcComponentName === 'LTA') {
//                         setLTAExemption(prev => ({
//                             ...prev,
//                             categoryLimit: component.annualAmount
//                         }));
//                          setLtaCategoryLimit(component.annualAmount)

//                     } else if (component.ctcComponentName === 'Internet Allowance') {
//                         setInternetAllowance(prev => ({  
//                             ...prev,
//                             categoryLimit: component.annualAmount
//                         }));
//                         setInternetCategoryLimit(component.annualAmount);

//                     } else if (component.ctcComponentName === 'Telephone Allowance') {
//                         setTelephoneAllowance(prev => ({
//                             ...prev,
//                             categoryLimit: component.annualAmount
//                         }));
//                         setTelCategoryLimit(component.annualAmount);
//                     }
//                 });
//             } else {
//                 toast.error("No employee CTC data found.");
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Error occurred.");
//         }
//     };

//     const handleToggle = (index) => {
//         const updatedItems = [...otherSections.items];
//         const enabled = !updatedItems[index].enabled;
//         updatedItems[index] = {
//             ...updatedItems[index],
//             enabled,
//             proofSubmitted: enabled ? updatedItems[index].categoryLimit : 0,
//             proofDocument: enabled ? updatedItems[index].proofDocument : null,
//             existingDocument: enabled ? updatedItems[index].existingDocument : null,
//             categoryFinalDeduction: enabled ? updatedItems[index].categoryLimit : 0
//         };

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });

//         if (index === 0) setIsBuyer(enabled);
//         if (index === 1) setIsYes(enabled);
//         if (index === 2) setIsYes1(enabled);
//         if (index === 3) setIsYes2(enabled);
//     };

//     const handle80CInputChange = (index, field, value) => {
//         const updatedItems = [...section80C.items];
//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: field === 'proofSubmitted' ? Number(value.replace(/,/g, '')) || 0 : value
//         };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     const handle80CFileUpload = (index, file) => {
//         const updatedItems = [...section80C.items];
//         if (!file) {
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     const handle80DInputChange = (index, field, value) => {
//         const updatedItems = [...section80D.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = { ...updatedItems[index], [field]: numericValue };

//         if ([0, 1, 4].includes(index)) {
//             if (numericValue > 0) {
//                 [0, 1, 4].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [0, 1, 4].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         if ([2, 3, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [2, 3, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [2, 3, 5].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculate80DTotals(updatedItems);
//         setSection80D({ ...section80D, items: calculatedItems, finalDeduction });
//     };

//     const handle80DFileUpload = (index, file) => {
//         const updatedItems = [...section80D.items];
//         if (!file) {
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setSection80D({ ...section80D, items: updatedItems });
//     };

//     const handleOtherSectionsInputChange = (index, field, value) => {
//         const updatedItems = [...otherSections.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: numericValue,
//             categoryFinalDeduction: numericValue > 0 ? Math.min(numericValue, updatedItems[index].categoryLimit) : 0
//         };

//         if ([4, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [4, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [4, 5].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });
//     };

//     const handleOtherSectionsFileUpload = (index, file) => {
//         const updatedItems = [...otherSections.items];
//         if (!file) {
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
//             setOtherSections({ ...otherSections, items: updatedItems });
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setOtherSections({ ...otherSections, items: updatedItems });
//     };

//     const calculate80CTotals = () => {
//         const totalProofSubmitted = section80C.items.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = Math.min(totalProofSubmitted, section80C.sectionLimit);
//         return { totalProofSubmitted, finalDeduction };
//     };

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
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const calculateOtherSectionsTotals = (items) => {
//         const updatedItems = items.map(item => ({
//             ...item,
//             categoryFinalDeduction: item.categoryLimit > 0 ? Math.min(item.proofSubmitted, item.categoryLimit) : item.proofSubmitted
//         }));
//         const totalProofSubmitted = updatedItems.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = updatedItems.reduce(
//             (sum, item) => sum + (item.categoryFinalDeduction || 0),
//             0
//         );
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const validateSubmission = () => {
//         if (!acceptTermsAndConditions) {
//             toast.error('You must accept the terms and conditions');
//             return false;
//         }
//         const invalid80C = section80C.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
//         const invalid80D = section80D.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
//         const invalidOther = otherSections.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);

//         if (invalid80C || invalid80D || invalidOther) {
//             toast.error('Please upload documents for all submitted proofs');
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         if (!validateSubmission()) {
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append('schoolId', schoolId);
//             formData.append('employeeId', employeeId);
//             formData.append('academicYear', academicYear);
//             formData.append('taxRegime', employeeDetails.taxRegime || 'old');
//             formData.append('panNumber', employeeDetails.panNumber || '');
//             formData.append('acceptTermsAndConditions', acceptTermsAndConditions);

//             section80C.items.forEach((item, index) => {
//                 formData.append(`section80C[${index}][section]`, item.section);
//                 formData.append(`section80C[${index}][category]`, item.category);
//                 formData.append(`section80C[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80C[${index}][status]`, item.status);
//                 formData.append(`section80C[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`section80C[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`section80CProofs[${index}]`, item.proofDocument);
//                 }
//             });
//             formData.append('section80C[sectionLimit]', section80C.sectionLimit);

//             section80D.items.forEach((item, index) => {
//                 formData.append(`section80D[${index}][section]`, item.section);
//                 formData.append(`section80D[${index}][category]`, item.category);
//                 formData.append(`section80D[${index}][categoryLimit]`, item.categoryLimit);
//                 formData.append(`section80D[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction);
//                 formData.append(`section80D[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80D[${index}][status]`, item.status);
//                 formData.append(`section80D[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`section80D[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`section80DProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             otherSections.items.forEach((item, index) => {
//                 formData.append(`otherSections[${index}][section]`, item.section);
//                 formData.append(`otherSections[${index}][category]`, item.category);
//                 formData.append(`otherSections[${index}][categoryLimit]`, item.categoryLimit || 0);
//                 formData.append(`otherSections[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction || 0);
//                 formData.append(`otherSections[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`otherSections[${index}][status]`, item.status);
//                 formData.append(`otherSections[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`otherSections[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`otherSectionsProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             const response = await postAPI(
//                 `/it-declaration/${schoolId}/${employeeId}`,
//                 formData,
//                 { 'Content-Type': 'multipart/form-data' },
//                 true
//             );

//             if (!response.hasError) {
//                 toast.success("IT Declaration submitted successfully!");
//                 fetchItDeclaration(schoolId, employeeId);
//             } else {
//                 toast.error(response.message || "Failed to submit declaration");
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             toast.error("An error occurred while submitting the declaration");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const { totalProofSubmitted: total80C, finalDeduction: final80C } = calculate80CTotals();
//     const { totalProofSubmitted: total80D, finalDeduction: final80D } = calculate80DTotals(section80D.items);
//     const { totalProofSubmitted: totalOther, finalDeduction: finalOther } = calculateOtherSectionsTotals(otherSections.items);

//     const handleNavigateToRentDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/rent-details");
//     };

//     const handleNavigateToLtaDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/lta-details");
//     };

//     const handleNavigateToTelephoneDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/telephone-allowance-details");
//     };

//     const handleNavigateToInternetDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/internet-allowance-details");
//     };

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN').format(amount);
//     };

//     const getFileName = (proofDocument, existingDocument) => {
//         if (proofDocument instanceof File) {
//             return proofDocument.name.length > 25 ? proofDocument.name.slice(0, 25) + '...' : proofDocument.name;
//         }
//         if (existingDocument) {
//             const fullName = existingDocument.split('\\').pop().split('/').pop() || 'Existing file';
//             return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
//         }
//         return 'No file';
//     };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2">
//                                     <h4 className="payroll-title text-center mb-0">
//                                         Income Tax (IT) Declaration
//                                     </h4>
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                                     <div className="col-md-8">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee Name: </strong> {employeeDetails.employeeName || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee ID: </strong>{employeeId || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Tax Regime: </strong>{employeeDetails.taxRegime === "new" ? "New" : "Old" || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>PAN No: </strong>{empPanNumber || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark'>
//                                             <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year: </label>
//                                             <select
//                                                 id="yearSelect"
//                                                 className="custom-select"
//                                                 aria-label="Select Year"
//                                                 style={{ marginLeft: "5px" }}
//                                                 value={academicYear}
//                                                 onChange={(e) => setAcademicYear(e.target.value)}
//                                             >
//                                                 <option value="2025-26">2025-26</option>
//                                                 <option value="2026-27">2026-27</option>
//                                                 <option value="2027-28">2027-28</option>
//                                                 <option value="2028-29">2028-29</option>
//                                                 <option value="2029-30">2029-30</option>
//                                             </select>
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive mb-4">
//                                     <table className="border border-dark mb-4 table table-hover">
//                                         <thead className="bg-light-subtle">
//                                             <tr className="payroll-table-header">
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Investment
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>
//                                                     Limit
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "130px" }}>
//                                                     Proof Sub.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
//                                                     Final Ded.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "200px" }}>
//                                                     Upload Document
//                                                 </th>
//                                                 <th className="text-center align-content-center border text-nowrap border-dark p-2" style={{ width: "120px" }}>
//                                                     Status
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Admin Remarks
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(section80C.sectionLimit)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80C)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80C)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80C.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80CInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className="form-control payroll-input-border me-2"
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                             />
//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80D)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80D)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80D.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             disabled={item.disabled}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border me-2 ${item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(totalOther)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(finalOther)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {otherSections.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">
//                                                         {item.category}
//                                                         {index < 4 && (
//                                                             <div className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1" style={{ maxWidth: "fit-content" }}>
//                                                                 <button
//                                                                     className={`btn ${item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     type='button'
//                                                                     style={{
//                                                                         backgroundColor: item.enabled ? 'white' : 'black',
//                                                                         borderColor: item.enabled ? 'black' : '',
//                                                                         color: item.enabled ? 'black' : 'white',
//                                                                         maxWidth: "fit-content",
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     Yes
//                                                                 </button>
//                                                                 <button
//                                                                     type='button'
//                                                                     className={`btn ${!item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     style={{
//                                                                         backgroundColor: !item.enabled ? 'white' : 'black',
//                                                                         borderColor: !item.enabled ? 'black' : '',
//                                                                         color: !item.enabled ? 'black' : 'white',
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none",
//                                                                         maxWidth: "fit-content"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     No
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {index < 4 ? (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${!item.enabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 readOnly
//                                                             />
//                                                         ) : (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 onChange={(e) => handleOtherSectionsInputChange(index, 'proofSubmitted', e.target.value)}
//                                                                 required={item.proofSubmitted > 0}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border me-2 ${index < 4 && !item.enabled || item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handleOtherSectionsFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                                 disabled={index < 4 && !item.enabled || item.disabled}
//                                                             />
//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(hraExemption.proofSubmitted)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={handleNavigateToRentDetails}
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         Enter Rent Details
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"
//                                                         value={hraExemption.status}
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{hraExemption.adminRemarks}</td>
//                                             </tr>
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Other Exemption</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             <tr className='payroll-table-body'>
//                                                 <td className="align-content-center border border-dark px-3 py-2">LTA Exemption</td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(ltaExemption.categoryLimit)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(ltaExemption.proofSubmitted)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(ltaExemption.categoryFinalDeduction)}
//                                                 </td>
//                                                 <td className="text-center align-content-center border border-dark p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={handleNavigateToLtaDetails}
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         Enter LTA Details
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"
//                                                         value={ltaExemption.status}
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td className="text-start align-content-center border border-dark p-2">{ltaExemption.adminRemarks}</td>
//                                             </tr>
//                                             <tr className='payroll-table-body'>
//                                                 <td className="align-content-center border border-dark px-3 py-2">Telephone Allowance</td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(telephoneAllowance.categoryLimit)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(telephoneAllowance.proofSubmitted)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(telephoneAllowance.categoryFinalDeduction)}
//                                                 </td>
//                                                 <td className="text-center align-content-center border border-dark p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={handleNavigateToTelephoneDetails}
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         Enter Telephone Details
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"
//                                                         value={telephoneAllowance.status}
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td className="text-start align-content-center border border-dark p-2">{telephoneAllowance.adminRemarks}</td>
//                                             </tr>
//                                             <tr className='payroll-table-body'>
//                                                 <td className="align-content-center border border-dark px-3 py-2">Internet Allowance</td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(internetAllowance.categoryLimit)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(internetAllowance.proofSubmitted)}
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     {formatCurrency(internetAllowance.categoryFinalDeduction)}
//                                                 </td>
//                                                 <td className="text-center align-content-center border border-dark p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={handleNavigateToInternetDetails}
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         Enter Internet Details
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"
//                                                         value={internetAllowance.status}
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td className="text-start align-content-center border border-dark p-2">{internetAllowance.adminRemarks}</td>
//                                             </tr>
//                                             <tr>
//                                                 <td colSpan={7} className="border border-dark fw-bold p-2">
//                                                     <div className="d-flex align-items-center gap-1">
//                                                         <p className="form-check ms-1">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="form-check-input mt-0 me-2"
//                                                                 id="acceptTermsAndConditions"
//                                                                 name="acceptTermsAndConditions"
//                                                                 checked={acceptTermsAndConditions}
//                                                                 onChange={handleTermsChange}
//                                                                 required
//                                                             />
//                                                         </p>
//                                                         <p className="mb-0 fw-bold text-dark">
//                                                             I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
//                                                         </p>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 <div className="row m-0">
//                                     <div className="col-md-12 text-center">
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary"
//                                             disabled={isSubmitting}
//                                         >
//                                             {isSubmitting ? 'Submitting...' : 'Submit'}
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
// export default EmployeeItDeclaration;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';

// const EmployeeItDeclaration = () => {
//     const navigate = useNavigate();
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [employeeDetails, setEmployeeDetails] = useState({});
//     const [empPanNumber, setEmpPanNumber] = useState(null);
//     const [academicYear, setAcademicYear] = useState("2025-26");
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [employeeCtc, setEmployeeCtcDetails] = useState(null);
//     const [ltaCategoryLimit, setLtaCategoryLimit] = useState(0);
//     const [telCategoryLimit, setTelCategoryLimit] = useState(0);
//     const [internetCategoryLimit, setInternetCategoryLimit] = useState(0);
//     const [showLtaExemption, setShowLtaExemption] = useState(false);
//     const [showTelephoneAllowance, setShowTelephoneAllowance] = useState(false);
//     const [showInternetAllowance, setShowInternetAllowance] = useState(false);

//     const [section80C, setSection80C] = useState({
//         items: [
//             {
//                 section: "80C",
//                 category: "Life Insurance Premium including Bima Nivesh (only Self, Spouse and children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Employee Provident Fund (EPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "Public Provident Fund (PPF)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "Tuition Fees (For 2 Children)",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Bank Fixed Deposit",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//             },
//             {
//                 section: "80C",
//                 category: "5 Year Post Office Time Deposit",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Sukanya Samriddhi Account",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Housing Loan Payment of Principal/Stamp Duty & Registration",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Unit Link Insurance Plan / Infrastructure Bond / National Saving Certificate / Accrued Interest on NSC",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80C",
//                 category: "Subscription to notified Central Government security (NSS) / Mutual Funds/ELSS and others / Pension Fund",
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             }
//         ],
//         sectionLimit: 150000,
//         finalDeduction: 0
//     });

//     const [section80D, setSection80D] = useState({
//         items: [
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self, Spouse and Dependent Children (Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Self, Spouse and Dependent Children (60 Years or Above)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Insurance Premium For Parents (Age Below 60 Years)",
//                 categoryLimit: 25000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
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
//                 existingDocument: null,
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
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "80D",
//                 category: "Medical Expenditure for Parents (60 Years or Above) (If No Insurance Premium)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
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
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             }
//         ],
//         finalDeduction: 0
//     });

//     const [otherSections, setOtherSections] = useState({
//         items: [
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Disability (Form 10-I) (Flat Deduction of INR 75000) (Yes/No)",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Dependent With Severe Disability (Form 10-I)",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Disability",
//                 categoryLimit: 75000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Deduction For Self Severe Disability",
//                 categoryLimit: 125000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred, Maximum of INR 40000)",
//                 categoryLimit: 40000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Other",
//                 category: "Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred, Maximum of INR 100000)",
//                 categoryLimit: 100000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Other",
//                 category: "Interest on Educational Loan for Higher Studies (u/s 80E) - Self, Spouse & Children [Allowed for 8 Years from repayment starts]",
//                 categoryLimit: 0,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: ""
//             },
//             {
//                 section: "Section80EE",
//                 category: "Interest on Home Loan (u/s 80EE) (Loan Sanctioned between April 2016 to Mar 2017)",
//                 categoryLimit: 50000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             },
//             {
//                 section: "Section80EEA",
//                 category: "Interest on Home Loan (u/s 80EEA) (Loan Sanctioned between April 2019 to Mar 2022) (Cost of House Less than 45 Lakh)",
//                 categoryLimit: 150000,
//                 categoryFinalDeduction: 0,
//                 proofSubmitted: 0,
//                 proofDocument: null,
//                 existingDocument: null,
//                 status: "Pending",
//                 adminRemarks: "",
//                 enabled: false
//             }
//         ],
//         finalDeduction: 0
//     });

//     const [hraExemption, setHraExemption] = useState({
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [ltaExemption, setLTAExemption] = useState({
//         categoryLimit: 0,
//         categoryFinalDeduction: 0,
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [telephoneAllowance, setTelephoneAllowance] = useState({
//         categoryLimit: 0,
//         categoryFinalDeduction: 0,
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [internetAllowance, setInternetAllowance] = useState({
//         categoryLimit: 0,
//         categoryFinalDeduction: 0,
//         proofSubmitted: 0,
//         proofDocument: null,
//         existingDocument: null,
//         status: "Pending",
//         adminRemarks: ""
//     });

//     const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false);
//     const handleTermsChange = (e) => {
//         setAcceptTermsAndConditions(e.target.checked);
//     };

//     const [isBuyer, setIsBuyer] = useState(false);
//     const [isYes, setIsYes] = useState(false);
//     const [isYes1, setIsYes1] = useState(false);
//     const [isYes2, setIsYes2] = useState(false);

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         if (!userDetails?.schoolId || !userDetails?.userId) {
//             toast.error('Authentication details missing');
//             navigate('/login');
//             return;
//         }
//         setSchoolId(userDetails.schoolId);
//         setEmployeeId(userDetails.userId);
//         setAcademicYear(userDetails.academicYear || "2025-26");

//         fetchEmployeeData(userDetails.schoolId, userDetails.userId, userDetails.academicYear || "2025-26");
//         fetchEmployeeCtc(userDetails.schoolId, userDetails.userId, userDetails.academicYear || "2025-26");
//         fetchItDeclaration(userDetails.schoolId, userDetails.userId, userDetails.academicYear || "2025-26");
//     }, []);

//     const fetchEmployeeData = async (schoolId, empId, academicYear) => {
//         try {
//             const employeeRes = await getAPI(`/get-employee-details/${schoolId}/${empId}/${academicYear}`);
//             if (!employeeRes.hasError && employeeRes.data?.data?.employeeInfo) {
//                 setEmployeeDetails(employeeRes.data.data.employeeInfo);
//                 setEmpPanNumber(employeeRes.data.data.employeeInfo.panNumber);
//             }
//         } catch (error) {
//             toast.error("Failed to fetch employee details");
//         }
//     };

//     const fetchEmployeeCtc = async (schoolId, employeeId, academicYear) => {
//         try {
//             const response = await getAPI(`/get-employee-ctc-details/${schoolId}/${employeeId}/${academicYear}`);
//             if (!response.hasError && response.data?.data) {
//                 setEmployeeCtcDetails(response.data.data);
//                 const components = response.data.data.components || [];
//                 setShowLtaExemption(components.some(comp => comp.ctcComponentName === 'LTA'));
//                 setShowTelephoneAllowance(components.some(comp => comp.ctcComponentName === 'Telephone Allowance'));
//                 setShowInternetAllowance(components.some(comp => comp.ctcComponentName === 'Internet Allowance'));

//                 components.forEach(component => {
//                     if (component.ctcComponentName === 'LTA') {
//                         setLtaCategoryLimit(component.annualAmount);
//                         setLTAExemption(prev => ({
//                             ...prev,
//                             categoryLimit: component.annualAmount
//                         }));
//                     } else if (component.ctcComponentName === 'Internet Allowance') {
//                         setInternetCategoryLimit(component.annualAmount);
//                         setInternetAllowance(prev => ({
//                             ...prev,
//                             categoryLimit: component.annualAmount
//                         }));
//                     } else if (component.ctcComponentName === 'Telephone Allowance') {
//                         setTelCategoryLimit(component.annualAmount);
//                         setTelephoneAllowance(prev => ({
//                             ...prev,
//                             categoryLimit: component.annualAmount
//                         }));
//                     }
//                 });
//             } else {
//                 toast.error("No employee CTC data found.");
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Error occurred.");
//         }
//     };

//     const fetchItDeclaration = async (schoolId, empId, academicYear) => {
//         try {
//             const declarationRes = await getAPI(`/it-declaration/${schoolId}/${empId}?academicYear=${academicYear}`);
//             console.log("it declaration", declarationRes);

//             if (!declarationRes.hasError && declarationRes.data?.data) {
//                 const data = declarationRes.data.data;
//                 setSection80C({
//                     ...data.section80C,
//                     items: data.section80C.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument
//                     }))
//                 });
//                 setSection80D({
//                     ...data.section80D,
//                     items: data.section80D.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument
//                     }))
//                 });
//                 setOtherSections({
//                     ...data.otherSections,
//                     items: data.otherSections.items.map(item => ({
//                         ...item,
//                         proofDocument: null,
//                         existingDocument: item.proofDocument,
//                         enabled: item.proofSubmitted > 0 && [0, 1, 2, 3, 7, 8].includes(data.otherSections.items.indexOf(item))
//                     }))
//                 });
//                 setHraExemption({
//                     ...data.hraExemption,
//                     proofDocument: null,
//                     existingDocument: data.hraExemption.proofDocument
//                 });
//                 setEmployeeDetails(prev => ({
//                     ...prev,
//                     taxRegime: data.taxRegime,
//                     panNumber: data.panNumber
//                 }));
//                 setAcceptTermsAndConditions(data.acceptTermsAndConditions);
//                 setIsBuyer(data.otherSections.items[0].enabled);
//                 setIsYes(data.otherSections.items[1].enabled);
//                 setIsYes1(data.otherSections.items[2].enabled);
//                 setIsYes2(data.otherSections.items[3].enabled);

//                 setLTAExemption(prev => ({
//                     ...prev,
//                     status: data.otherExemption?.ltaExemption?.status || "Pending",
//                     adminRemarks: data.otherExemption?.ltaExemption?.adminRemarks || "",
//                     categoryFinalDeduction: data.otherExemption?.ltaExemption?.categoryFinalDeduction || 0,
//                     proofSubmitted: data.otherExemption?.ltaExemption?.proofSubmitted || 0,
//                     proofDocument: null,
//                     existingDocument: data.otherExemption?.ltaExemption?.proofDocument
//                 }));
//                 setInternetAllowance(prev => ({
//                     ...prev,
//                     status: data.otherExemption?.internetAllowance?.status || "Pending",
//                     adminRemarks: data.otherExemption?.internetAllowance?.adminRemarks || "",
//                     categoryFinalDeduction: data.otherExemption?.internetAllowance?.categoryFinalDeduction || 0,
//                     proofSubmitted: data.otherExemption?.internetAllowance?.proofSubmitted || 0,
//                     proofDocument: null,
//                     existingDocument: data.otherExemption?.internetAllowance?.proofDocument
//                 }));
//                 setTelephoneAllowance(prev => ({
//                     ...prev,
//                     status: data.otherExemption?.telephoneAllowance?.status || "Pending",
//                     adminRemarks: data.otherExemption?.telephoneAllowance?.adminRemarks || "",
//                     categoryFinalDeduction: data.otherExemption?.telephoneAllowance?.categoryFinalDeduction || 0,
//                     proofSubmitted: data.otherExemption?.telephoneAllowance?.proofSubmitted || 0,
//                     proofDocument: null,
//                     existingDocument: data.otherExemption?.telephoneAllowance?.proofDocument
//                 }));
//             }
//         } catch (error) {
//             toast.error("Failed to fetch IT declaration");
//         }
//     };

//     const handleToggle = (index) => {
//         const updatedItems = [...otherSections.items];
//         const enabled = !updatedItems[index].enabled;
//         updatedItems[index] = {
//             ...updatedItems[index],
//             enabled,
//             proofSubmitted: enabled ? updatedItems[index].categoryLimit : 0,
//             proofDocument: enabled ? updatedItems[index].proofDocument : null,
//             existingDocument: enabled ? updatedItems[index].existingDocument : null,
//             categoryFinalDeduction: enabled ? updatedItems[index].categoryLimit : 0
//         };

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });

//         if (index === 0) setIsBuyer(enabled);
//         if (index === 1) setIsYes(enabled);
//         if (index === 2) setIsYes1(enabled);
//         if (index === 3) setIsYes2(enabled);
//     };

//     const handle80CInputChange = (index, field, value) => {
//         const updatedItems = [...section80C.items];
//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: field === 'proofSubmitted' ? Number(value.replace(/,/g, '')) || 0 : value
//         };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     const handle80CFileUpload = (index, file) => {
//         const updatedItems = [...section80C.items];
//         if (!file) {
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setSection80C({ ...section80C, items: updatedItems });
//     };

//     const handle80DInputChange = (index, field, value) => {
//         const updatedItems = [...section80D.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = { ...updatedItems[index], [field]: numericValue };

//         if ([0, 1, 4].includes(index)) {
//             if (numericValue > 0) {
//                 [0, 1, 4].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [0, 1, 4].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         if ([2, 3, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [2, 3, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [2, 3, 5].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculate80DTotals(updatedItems);
//         setSection80D({ ...section80D, items: calculatedItems, finalDeduction });
//     };

//     const handle80DFileUpload = (index, file) => {
//         const updatedItems = [...section80D.items];
//         if (!file) {
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setSection80D({ ...section80D, items: updatedItems });
//     };

//     const handleOtherSectionsInputChange = (index, field, value) => {
//         const updatedItems = [...otherSections.items];
//         const numericValue = Number(value.replace(/,/g, '')) || 0;

//         updatedItems[index] = {
//             ...updatedItems[index],
//             [field]: numericValue,
//             categoryFinalDeduction: numericValue > 0 ? Math.min(numericValue, updatedItems[index].categoryLimit) : 0
//         };

//         if ([4, 5].includes(index)) {
//             if (numericValue > 0) {
//                 [4, 5].forEach(i => {
//                     if (i !== index) {
//                         updatedItems[i].disabled = true;
//                         updatedItems[i].proofSubmitted = 0;
//                         updatedItems[i].categoryFinalDeduction = 0;
//                         updatedItems[i].proofDocument = null;
//                     } else {
//                         updatedItems[i].disabled = false;
//                     }
//                 });
//             } else {
//                 [4, 5].forEach(i => { updatedItems[i].disabled = false; });
//             }
//         }

//         const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
//         setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });
//     };

//     const handleOtherSectionsFileUpload = (index, file) => {
//         const updatedItems = [...otherSections.items];
//         if (!file) {
//             updatedItems[index] = { ...updatedItems[index], proofDocument: null };
//             setOtherSections({ ...otherSections, items: updatedItems });
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

//         updatedItems[index] = { ...updatedItems[index], proofDocument: file };
//         setOtherSections({ ...otherSections, items: updatedItems });
//     };

//     const calculate80CTotals = () => {
//         const totalProofSubmitted = section80C.items.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = Math.min(totalProofSubmitted, section80C.sectionLimit);
//         return { totalProofSubmitted, finalDeduction };
//     };

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
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const calculateOtherSectionsTotals = (items) => {
//         const updatedItems = items.map(item => ({
//             ...item,
//             categoryFinalDeduction: item.categoryLimit > 0 ? Math.min(item.proofSubmitted, item.categoryLimit) : item.proofSubmitted
//         }));
//         const totalProofSubmitted = updatedItems.reduce(
//             (sum, item) => sum + (item.proofSubmitted || 0),
//             0
//         );
//         const finalDeduction = updatedItems.reduce(
//             (sum, item) => sum + (item.categoryFinalDeduction || 0),
//             0
//         );
//         return { updatedItems, totalProofSubmitted, finalDeduction };
//     };

//     const validateSubmission = () => {
//         if (!acceptTermsAndConditions) {
//             toast.error('You must accept the terms and conditions');
//             return false;
//         }
//         const invalid80C = section80C.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
//         const invalid80D = section80D.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
//         const invalidOther = otherSections.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);

//         if (invalid80C || invalid80D || invalidOther) {
//             toast.error('Please upload documents for all submitted proofs');
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         if (!validateSubmission()) {
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append('schoolId', schoolId);
//             formData.append('employeeId', employeeId);
//             formData.append('academicYear', academicYear);
//             formData.append('taxRegime', employeeDetails.taxRegime || 'old');
//             formData.append('panNumber', employeeDetails.panNumber || '');
//             formData.append('acceptTermsAndConditions', acceptTermsAndConditions);

//             section80C.items.forEach((item, index) => {
//                 formData.append(`section80C[${index}][section]`, item.section);
//                 formData.append(`section80C[${index}][category]`, item.category);
//                 formData.append(`section80C[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80C[${index}][status]`, item.status);
//                 formData.append(`section80C[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`section80C[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`section80CProofs[${index}]`, item.proofDocument);
//                 }
//             });
//             formData.append('section80C[sectionLimit]', section80C.sectionLimit);

//             section80D.items.forEach((item, index) => {
//                 formData.append(`section80D[${index}][section]`, item.section);
//                 formData.append(`section80D[${index}][category]`, item.category);
//                 formData.append(`section80D[${index}][categoryLimit]`, item.categoryLimit);
//                 formData.append(`section80D[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction);
//                 formData.append(`section80D[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`section80D[${index}][status]`, item.status);
//                 formData.append(`section80D[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`section80D[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`section80DProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             otherSections.items.forEach((item, index) => {
//                 formData.append(`otherSections[${index}][section]`, item.section);
//                 formData.append(`otherSections[${index}][category]`, item.category);
//                 formData.append(`otherSections[${index}][categoryLimit]`, item.categoryLimit || 0);
//                 formData.append(`otherSections[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction || 0);
//                 formData.append(`otherSections[${index}][proofSubmitted]`, item.proofSubmitted);
//                 formData.append(`otherSections[${index}][status]`, item.status);
//                 formData.append(`otherSections[${index}][adminRemarks]`, item.adminRemarks || '');
//                 if (item.existingDocument) {
//                     formData.append(`otherSections[${index}][existingDocument]`, item.existingDocument);
//                 }
//                 if (item.proofDocument instanceof File) {
//                     formData.append(`otherSectionsProofs[${index}]`, item.proofDocument);
//                 }
//             });

//             const response = await postAPI(
//                 `/it-declaration/${schoolId}/${employeeId}`,
//                 formData,
//                 { 'Content-Type': 'multipart/form-data' },
//                 true
//             );

//             if (!response.hasError) {
//                 toast.success("IT Declaration submitted successfully!");
//                 fetchItDeclaration(schoolId, employeeId, academicYear);
//             } else {
//                 toast.error(response.message || "Failed to submit declaration");
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             toast.error("An error occurred while submitting the declaration");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const { totalProofSubmitted: total80C, finalDeduction: final80C } = calculate80CTotals();
//     const { totalProofSubmitted: total80D, finalDeduction: final80D } = calculate80DTotals(section80D.items);
//     const { totalProofSubmitted: totalOther, finalDeduction: finalOther } = calculateOtherSectionsTotals(otherSections.items);

//     const handleNavigateToRentDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/rent-details");
//     };

//     const handleNavigateToLtaDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/lta-details");
//     };

//     const handleNavigateToTelephoneDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/telephone-allowance-details");
//     };

//     const handleNavigateToInternetDetails = () => {
//         navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/internet-allowance-details");
//     };

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-IN').format(amount);
//     };

//     const getFileName = (proofDocument, existingDocument) => {
//         if (proofDocument instanceof File) {
//             return proofDocument.name.length > 25 ? proofDocument.name.slice(0, 25) + '...' : proofDocument.name;
//         }
//         if (existingDocument) {
//             const fullName = existingDocument.split('\\').pop().split('/').pop() || 'Existing file';
//             return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
//         }
//         return 'No file';
//     };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2">
//                                     <h4 className="payroll-title text-center mb-0">
//                                         Income Tax (IT) Declaration
//                                     </h4>
//                                 </div>
//                             </div>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="row m-0 mb-2 pt-2 salary-slip-box">
//                                     <div className="col-md-8">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee Name: </strong> {employeeDetails.employeeName || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Employee ID: </strong>{employeeId || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>Tax Regime: </strong>{employeeDetails.taxRegime === "new" ? "New" : "Old" || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark payroll-box-text'>
//                                             <strong>PAN No: </strong>{empPanNumber || 'N/A'}
//                                         </p>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <p className='text-dark'>
//                                             <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year: </label>
//                                             <select
//                                                 id="yearSelect"
//                                                 className="custom-select"
//                                                 aria-label="Select Year"
//                                                 style={{ marginLeft: "5px" }}
//                                                 value={academicYear}
//                                                 onChange={(e) => setAcademicYear(e.target.value)}
//                                             >
//                                                 <option value="2025-26">2025-26</option>
//                                                 <option value="2026-27">2026-27</option>
//                                                 <option value="2027-28">2027-28</option>
//                                                 <option value="2028-29">2028-29</option>
//                                                 <option value="2029-30">2029-30</option>
//                                             </select>
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="table-responsive mb-4">
//                                     <table className="border border-dark mb-4 table table-hover">
//                                         <thead className="bg-light-subtle">
//                                             <tr className="payroll-table-header">
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Investment
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>
//                                                     Limit
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "130px" }}>
//                                                     Proof Sub.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
//                                                     Final Ded.
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "200px" }}>
//                                                     Upload Document
//                                                 </th>
//                                                 <th className="text-center align-content-center border text-nowrap border-dark p-2" style={{ width: "120px" }}>
//                                                     Status
//                                                 </th>
//                                                 <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
//                                                     Admin Remarks
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(section80C.sectionLimit)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80C)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80C)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80C.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80CInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2"></td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className="form-control payroll-input-border me-2"
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                             />
//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80D)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80D)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {section80D.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                             value={formatCurrency(item.proofSubmitted)}
//                                                             onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
//                                                             disabled={item.disabled}
//                                                             required={item.proofSubmitted > 0}
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border me-2 ${item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(totalOther)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(finalOther)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                             </tr>
//                                             {otherSections.items.map((item, index) => (
//                                                 <tr key={index} className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">
//                                                         {item.category}
//                                                         {index < 4 && (
//                                                             <div className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1" style={{ maxWidth: "fit-content" }}>
//                                                                 <button
//                                                                     className={`btn ${item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     type='button'
//                                                                     style={{
//                                                                         backgroundColor: item.enabled ? 'white' : 'black',
//                                                                         borderColor: item.enabled ? 'black' : '',
//                                                                         color: item.enabled ? 'black' : 'white',
//                                                                         maxWidth: "fit-content",
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     Yes
//                                                                 </button>
//                                                                 <button
//                                                                     type='button'
//                                                                     className={`btn ${!item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                                                     style={{
//                                                                         backgroundColor: !item.enabled ? 'white' : 'black',
//                                                                         borderColor: !item.enabled ? 'black' : '',
//                                                                         color: !item.enabled ? 'black' : 'white',
//                                                                         transition: 'all 0.4s ease-in-out',
//                                                                         boxShadow: "none",
//                                                                         maxWidth: "fit-content"
//                                                                     }}
//                                                                     onClick={() => handleToggle(index)}
//                                                                 >
//                                                                     No
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {index < 4 ? (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${!item.enabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 readOnly
//                                                             />
//                                                         ) : (
//                                                             <input
//                                                                 type="text"
//                                                                 className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
//                                                                 value={formatCurrency(item.proofSubmitted)}
//                                                                 onChange={(e) => handleOtherSectionsInputChange(index, 'proofSubmitted', e.target.value)}
//                                                                 required={item.proofSubmitted > 0}
//                                                                 disabled={item.disabled}
//                                                             />
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
//                                                     <td className="align-content-center border border-dark p-2">
//                                                         <div className="d-flex align-items-center">
//                                                             <input
//                                                                 type="file"
//                                                                 className={`form-control payroll-input-border me-2 ${index < 4 && !item.enabled || item.disabled ? 'bg-light' : ''}`}
//                                                                 accept="image/*,application/pdf"
//                                                                 onChange={(e) => handleOtherSectionsFileUpload(index, e.target.files[0])}
//                                                                 required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
//                                                                 disabled={index < 4 && !item.enabled || item.disabled}
//                                                             />
//                                                         </div>
//                                                         {(item.proofDocument || item.existingDocument) && (
//                                                             <div className="mt-2">
//                                                                 <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
//                                                             </div>
//                                                         )}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={item.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
//                                                 </tr>
//                                             ))}
//                                             <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                 <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(hraExemption.proofSubmitted)}</td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 <td className="text-center align-content-center border border-dark fw-bold p-2">
//                                                     <button
//                                                         type="button"
//                                                         className="btn btn-link p-0"
//                                                         onClick={handleNavigateToRentDetails}
//                                                         style={{
//                                                             color: "red",
//                                                             fontWeight: "bold",
//                                                             fontSize: "1rem"
//                                                         }}
//                                                     >
//                                                         Enter Rent Details
//                                                     </button>
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control payroll-table-body payroll-input-border text-end"
//                                                         value={hraExemption.status}
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td className="text-end align-content-center border border-dark fw-bold p-2">{hraExemption.adminRemarks}</td>
//                                             </tr>
//                                             {(showLtaExemption || showTelephoneAllowance || showInternetAllowance) && (
//                                                 <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
//                                                     <td className="align-content-center border border-dark fw-bold p-2">Other Exemption</td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                     <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                     <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
//                                                 </tr>
//                                             )}
//                                             {showLtaExemption && (
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">LTA Exemption</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(ltaExemption.categoryLimit)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(ltaExemption.proofSubmitted)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(ltaExemption.categoryFinalDeduction)}
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <button
//                                                             type="button"
//                                                             className="btn btn-link p-0"
//                                                             onClick={handleNavigateToLtaDetails}
//                                                             style={{
//                                                                 color: "red",
//                                                                 fontWeight: "bold",
//                                                                 fontSize: "1rem"
//                                                             }}
//                                                         >
//                                                             Enter LTA Details
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={ltaExemption.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{ltaExemption.adminRemarks}</td>
//                                                 </tr>
//                                             )}
//                                             {showTelephoneAllowance && (
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">Telephone Allowance</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(telephoneAllowance.categoryLimit)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(telephoneAllowance.proofSubmitted)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(telephoneAllowance.categoryFinalDeduction)}
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <button
//                                                             type="button"
//                                                             className="btn btn-link p-0"
//                                                             onClick={handleNavigateToTelephoneDetails}
//                                                             style={{
//                                                                 color: "red",
//                                                                 fontWeight: "bold",
//                                                                 fontSize: "1rem"
//                                                             }}
//                                                         >
//                                                             Enter Telephone Details
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={telephoneAllowance.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{telephoneAllowance.adminRemarks}</td>
//                                                 </tr>
//                                             )}
//                                             {showInternetAllowance && (
//                                                 <tr className='payroll-table-body'>
//                                                     <td className="align-content-center border border-dark px-3 py-2">Internet Allowance</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(internetAllowance.categoryLimit)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(internetAllowance.proofSubmitted)}
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         {formatCurrency(internetAllowance.categoryFinalDeduction)}
//                                                     </td>
//                                                     <td className="text-center align-content-center border border-dark p-2">
//                                                         <button
//                                                             type="button"
//                                                             className="btn btn-link p-0"
//                                                             onClick={handleNavigateToInternetDetails}
//                                                             style={{
//                                                                 color: "red",
//                                                                 fontWeight: "bold",
//                                                                 fontSize: "1rem"
//                                                             }}
//                                                         >
//                                                             Enter Internet Details
//                                                         </button>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             value={internetAllowance.status}
//                                                             readOnly
//                                                         />
//                                                     </td>
//                                                     <td className="text-start align-content-center border border-dark p-2">{internetAllowance.adminRemarks}</td>
//                                                 </tr>
//                                             )}
//                                             <tr>
//                                                 <td colSpan={7} className="border border-dark fw-bold p-2">
//                                                     <div className="d-flex align-items-center gap-1">
//                                                         <p className="form-check ms-1">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="form-check-input mt-0 me-2"
//                                                                 id="acceptTermsAndConditions"
//                                                                 name="acceptTermsAndConditions"
//                                                                 checked={acceptTermsAndConditions}
//                                                                 onChange={handleTermsChange}
//                                                                 required
//                                                             />
//                                                         </p>
//                                                         <p className="mb-0 fw-bold text-dark">
//                                                             I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
//                                                         </p>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 <div className="row m-0">
//                                     <div className="col-md-12 text-center">
//                                         <button
//                                             type="submit"
//                                             className="btn btn-primary"
//                                             disabled={isSubmitting}
//                                         >
//                                             {isSubmitting ? 'Submitting...' : 'Submit'}
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

// export default EmployeeItDeclaration;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';

const EmployeeItDeclaration = () => {
    const navigate = useNavigate();
    const [schoolId, setSchoolId] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [empPanNumber, setEmpPanNumber] = useState(null);
    const [academicYear, setAcademicYear] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [employeeCtc, setEmployeeCtcDetails] = useState(null);
    const [ltaCategoryLimit, setLtaCategoryLimit] = useState(0);
    const [telCategoryLimit, setTelCategoryLimit] = useState(0);
    const [internetCategoryLimit, setInternetCategoryLimit] = useState(0);
    const [showLtaExemption, setShowLtaExemption] = useState(false);
    const [showTelephoneAllowance, setShowTelephoneAllowance] = useState(false);
    const [showInternetAllowance, setShowInternetAllowance] = useState(false);
    const [academicYearList, setAcademicYearList] = useState([]);

    const defaultSection80CItems = [
        {
            section: "80C",
            category: "Life Insurance Premium including Bima Nivesh (only Self, Spouse and children)",
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80C",
            category: "Employee Provident Fund (EPF)",
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80C",
            category: "Public Provident Fund (PPF)",
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80C",
            category: "Tuition Fees (For 2 Children)",
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80C",
            category: "5 Year Bank Fixed Deposit",
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80C",
            category: "5 Year Post Office Time Deposit",
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80C",
            category: "Sukanya Samriddhi Account",
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80C",
            category: "Housing Loan Payment of Principal/Stamp Duty & Registration",
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80C",
            category: "Unit Link Insurance Plan / Infrastructure Bond / National Saving Certificate / Accrued Interest on NSC",
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80C",
            category: "Subscription to notified Central Government security (NSS) / Mutual Funds/ELSS and others / Pension Fund",
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        }
    ];

    const defaultSection80DItems = [
        {
            section: "80D",
            category: "Medical Insurance Premium For Self, Spouse and Dependent Children (Age Below 60 Years)",
            categoryLimit: 25000,
            categoryFinalDeduction: 0,
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80D",
            category: "Medical Insurance Premium For Self, Spouse and Dependent Children (60 Years or Above)",
            categoryLimit: 50000,
            categoryFinalDeduction: 0,
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80D",
            category: "Medical Insurance Premium For Parents (Age Below 60 Years)",
            categoryLimit: 25000,
            categoryFinalDeduction: 0,
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
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
            existingDocument: null,
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
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "80D",
            category: "Medical Expenditure for Parents (60 Years or Above) (If No Insurance Premium)",
            categoryLimit: 50000,
            categoryFinalDeduction: 0,
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
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
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        }
    ];

    const defaultOtherSectionsItems = [
        {
            section: "Other",
            category: "Deduction For Dependent With Disability (Form 10-I) (Flat Deduction of INR 75000) (Yes/No)",
            categoryLimit: 75000,
            categoryFinalDeduction: 0,
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
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
            existingDocument: null,
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
            existingDocument: null,
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
            existingDocument: null,
            status: "Pending",
            adminRemarks: "",
            enabled: false
        },
        {
            section: "Other",
            category: "Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred, Maximum of INR 40000)",
            categoryLimit: 40000,
            categoryFinalDeduction: 0,
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "Other",
            category: "Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred, Maximum of INR 100000)",
            categoryLimit: 100000,
            categoryFinalDeduction: 0,
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "Other",
            category: "Interest on Educational Loan for Higher Studies (u/s 80E) - Self, Spouse & Children [Allowed for 8 Years from repayment starts]",
            categoryLimit: 0,
            categoryFinalDeduction: 0,
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: ""
        },
        {
            section: "Section80EE",
            category: "Interest on Home Loan (u/s 80EE) (Loan Sanctioned between April 2016 to Mar 2017)",
            categoryLimit: 50000,
            categoryFinalDeduction: 0,
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: "",
            enabled: false
        },
        {
            section: "Section80EEA",
            category: "Interest on Home Loan (u/s 80EEA) (Loan Sanctioned between April 2019 to Mar 2022) (Cost of House Less than 45 Lakh)",
            categoryLimit: 150000,
            categoryFinalDeduction: 0,
            proofSubmitted: 0,
            proofDocument: null,
            existingDocument: null,
            status: "Pending",
            adminRemarks: "",
            enabled: false
        }
    ];

    const [section80C, setSection80C] = useState({
        items: defaultSection80CItems,
        sectionLimit: 150000,
        finalDeduction: 0
    });

    const [section80D, setSection80D] = useState({
        items: defaultSection80DItems,
        finalDeduction: 0
    });

    const [otherSections, setOtherSections] = useState({
        items: defaultOtherSectionsItems,
        finalDeduction: 0
    });

    const [hraExemption, setHraExemption] = useState({
        proofSubmitted: 0,
        proofDocument: null,
        existingDocument: null,
        status: "Pending",
        adminRemarks: ""
    });

    const [ltaExemption, setLTAExemption] = useState({
        categoryLimit: 0,
        categoryFinalDeduction: 0,
        proofSubmitted: 0,
        proofDocument: null,
        existingDocument: null,
        status: "Pending",
        adminRemarks: ""
    });

    const [telephoneAllowance, setTelephoneAllowance] = useState({
        categoryLimit: 0,
        categoryFinalDeduction: 0,
        proofSubmitted: 0,
        proofDocument: null,
        existingDocument: null,
        status: "Pending",
        adminRemarks: ""
    });

    const [internetAllowance, setInternetAllowance] = useState({
        categoryLimit: 0,
        categoryFinalDeduction: 0,
        proofSubmitted: 0,
        proofDocument: null,
        existingDocument: null,
        status: "Pending",
        adminRemarks: ""
    });

    const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false);
    const [isBuyer, setIsBuyer] = useState(false);
    const [isYes, setIsYes] = useState(false);
    const [isYes1, setIsYes1] = useState(false);
    const [isYes2, setIsYes2] = useState(false);

    // Event Handlers
    const handleTermsChange = (e) => {
        setAcceptTermsAndConditions(e.target.checked);
    };

    

    const handleToggle = (index) => {
        const updatedItems = [...otherSections.items];
        const enabled = !updatedItems[index].enabled;
        updatedItems[index] = {
            ...updatedItems[index],
            enabled,
            proofSubmitted: enabled ? updatedItems[index].categoryLimit : 0,
            proofDocument: enabled ? updatedItems[index].proofDocument : null,
            existingDocument: enabled ? updatedItems[index].existingDocument : null,
            categoryFinalDeduction: enabled ? updatedItems[index].categoryLimit : 0
        };

        const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
        setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });

        if (index === 0) setIsBuyer(enabled);
        if (index === 1) setIsYes(enabled);
        if (index === 2) setIsYes1(enabled);
        if (index === 3) setIsYes2(enabled);
    };

    const handle80CInputChange = (index, field, value) => {
        const updatedItems = [...section80C.items];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: field === 'proofSubmitted' ? Number(value.replace(/,/g, '')) || 0 : value
        };
        setSection80C({ ...section80C, items: updatedItems });
    };

    const handle80CFileUpload = (index, file) => {
        const updatedItems = [...section80C.items];
        if (!file) {
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

        updatedItems[index] = { ...updatedItems[index], proofDocument: file };
        setSection80C({ ...section80C, items: updatedItems });
    };

    const handle80DInputChange = (index, field, value) => {
        const updatedItems = [...section80D.items];
        const numericValue = Number(value.replace(/,/g, '')) || 0;

        updatedItems[index] = { ...updatedItems[index], [field]: numericValue };

        if ([0, 1, 4].includes(index)) {
            if (numericValue > 0) {
                [0, 1, 4].forEach(i => {
                    if (i !== index) {
                        updatedItems[i].disabled = true;
                        updatedItems[i].proofSubmitted = 0;
                        updatedItems[i].categoryFinalDeduction = 0;
                        updatedItems[i].proofDocument = null;
                    } else {
                        updatedItems[i].disabled = false;
                    }
                });
            } else {
                [0, 1, 4].forEach(i => { updatedItems[i].disabled = false; });
            }
        }

        if ([2, 3, 5].includes(index)) {
            if (numericValue > 0) {
                [2, 3, 5].forEach(i => {
                    if (i !== index) {
                        updatedItems[i].disabled = true;
                        updatedItems[i].proofSubmitted = 0;
                        updatedItems[i].categoryFinalDeduction = 0;
                        updatedItems[i].proofDocument = null;
                    } else {
                        updatedItems[i].disabled = false;
                    }
                });
            } else {
                [2, 3, 5].forEach(i => { updatedItems[i].disabled = false; });
            }
        }

        const { updatedItems: calculatedItems, finalDeduction } = calculate80DTotals(updatedItems);
        setSection80D({ ...section80D, items: calculatedItems, finalDeduction });
    };

    const handle80DFileUpload = (index, file) => {
        const updatedItems = [...section80D.items];
        if (!file) {
            updatedItems[index] = { ...updatedItems[index], proofDocument: null };
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

        updatedItems[index] = { ...updatedItems[index], proofDocument: file };
        setSection80D({ ...section80D, items: updatedItems });
    };

    const handleOtherSectionsInputChange = (index, field, value) => {
        const updatedItems = [...otherSections.items];
        const numericValue = Number(value.replace(/,/g, '')) || 0;

        updatedItems[index] = {
            ...updatedItems[index],
            [field]: numericValue,
            categoryFinalDeduction: numericValue > 0 ? Math.min(numericValue, updatedItems[index].categoryLimit) : 0
        };

        if ([4, 5].includes(index)) {
            if (numericValue > 0) {
                [4, 5].forEach(i => {
                    if (i !== index) {
                        updatedItems[i].disabled = true;
                        updatedItems[i].proofSubmitted = 0;
                        updatedItems[i].categoryFinalDeduction = 0;
                        updatedItems[i].proofDocument = null;
                    } else {
                        updatedItems[i].disabled = false;
                    }
                });
            } else {
                [4, 5].forEach(i => { updatedItems[i].disabled = false; });
            }
        }

        const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
        setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });
    };

    const handleOtherSectionsFileUpload = (index, file) => {
        const updatedItems = [...otherSections.items];
        if (!file) {
            updatedItems[index] = { ...updatedItems[index], proofDocument: null };
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

        updatedItems[index] = { ...updatedItems[index], proofDocument: file };
        setOtherSections({ ...otherSections, items: updatedItems });
    };

    // Data Fetching
    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (!userDetails?.schoolId || !userDetails?.userId) {
            toast.error('Authentication details missing');
            navigate('/login');
            return;
        }

        const academicYear = localStorage.getItem("selectedAcademicYear");
        setSchoolId(userDetails.schoolId);
        setEmployeeId(userDetails.userId);
        setAcademicYear(academicYear);
        
        fetchEmployeeData(userDetails.schoolId, userDetails.userId, academicYear);
        fetchAcademicYears(userDetails.schoolId);
        fetchEmployeeCtc(userDetails.schoolId, userDetails.userId, academicYear);
        fetchItDeclaration(userDetails.schoolId, userDetails.userId, academicYear);
    }, []);

    useEffect(() => {
    if (schoolId && academicYear) {
        console.log("setAcademic year as i change", academicYear);
        
      fetchEmployeeData(schoolId, employeeId, academicYear);
      fetchEmployeeCtc(schoolId, employeeId, academicYear);
      fetchItDeclaration(schoolId, employeeId, academicYear);
    }
  }, [academicYear, schoolId, employeeId]);

  const fetchAcademicYears = async (schoolId) => {
    try {
      const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
      setAcademicYearList(response.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch academic years.");
    }
  };

    const fetchEmployeeData = async (schoolId, empId, academicYear) => {
        try {
            const employeeRes = await getAPI(`/get-employee-details/${schoolId}/${empId}/${academicYear}`);
            console.log("employeeRes",employeeRes);
            
            if (!employeeRes.hasError && employeeRes.data?.data?.employeeInfo) {
                setEmployeeDetails(employeeRes.data.data.employeeInfo);
                setEmpPanNumber(employeeRes.data.data.employeeInfo.panNumber);
            }
        } catch (error) {
            toast.error("Failed to fetch employee details");
        }
    };

    const fetchEmployeeCtc = async (schoolId, employeeId, academicYear) => {
        try {
            const response = await getAPI(`/get-employee-ctc-details/${schoolId}/${employeeId}/${academicYear}`);
            if (!response.hasError && response.data?.data) {
                setEmployeeCtcDetails(response.data.data);
                const components = response.data.data.components || [];
                setShowLtaExemption(components.some(comp => comp.ctcComponentName === 'LTA'));
                setShowTelephoneAllowance(components.some(comp => comp.ctcComponentName === 'Telephone Allowance'));
                setShowInternetAllowance(components.some(comp => comp.ctcComponentName === 'Internet Allowance'));

                components.forEach(component => {
                    if (component.ctcComponentName === 'LTA') {
                        setLtaCategoryLimit(component.annualAmount);
                        setLTAExemption(prev => ({
                            ...prev,
                            categoryLimit: component.annualAmount
                        }));
                    } else if (component.ctcComponentName === 'Internet Allowance') {
                        setInternetCategoryLimit(component.annualAmount);
                        setInternetAllowance(prev => ({
                            ...prev,
                            categoryLimit: component.annualAmount
                        }));
                    } else if (component.ctcComponentName === 'Telephone Allowance') {
                        setTelCategoryLimit(component.annualAmount);
                        setTelephoneAllowance(prev => ({
                            ...prev,
                            categoryLimit: component.annualAmount
                        }));
                    }
                });
            } else {
                toast.error("No employee CTC data found.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred.");
            setShowLtaExemption(false);
            setShowTelephoneAllowance(false);
            setShowInternetAllowance(false);
        }
    };

    const fetchItDeclaration = async (schoolId, empId, academicYear) => {
        try {
            const declarationRes = await getAPI(`/it-declaration/${schoolId}/${empId}?academicYear=${academicYear}`);
            console.log("it declaration", declarationRes);

            if (!declarationRes.hasError && declarationRes.data?.data) {
                const data = declarationRes.data.data;

                // Handle Section 80C
                const section80CData = data.section80C || { items: [], finalDeduction: 0 };
                setSection80C({
                    sectionLimit: section80C.sectionLimit,
                    finalDeduction: section80CData.finalDeduction || 0,
                    items: section80CData.items.length > 0
                        ? section80CData.items.map(item => ({
                            ...item,
                            proofDocument: null,
                            existingDocument: item.proofDocument
                        }))
                        : defaultSection80CItems
                });

                // Handle Section 80D
                const section80DData = data.section80D || { items: [], finalDeduction: 0 };
                setSection80D({
                    finalDeduction: section80DData.finalDeduction || 0,
                    items: section80DData.items.length > 0
                        ? section80DData.items.map(item => ({
                            ...item,
                            proofDocument: null,
                            existingDocument: item.proofDocument
                        }))
                        : defaultSection80DItems
                });

                // Handle Other Sections
                const otherSectionsData = data.otherSections || { items: [], finalDeduction: 0 };
                setOtherSections({
                    finalDeduction: otherSectionsData.finalDeduction || 0,
                    items: otherSectionsData.items.length > 0
                        ? otherSectionsData.items.map((item, index) => ({
                            ...item,
                            proofDocument: null,
                            existingDocument: item.proofDocument,
                            enabled: item.proofSubmitted > 0 && [0, 1, 2, 3, 7, 8].includes(index)
                        }))
                        : defaultOtherSectionsItems
                });

                // Handle HRA Exemption
                setHraExemption({
                    ...data.hraExemption,
                    proofDocument: null,
                    existingDocument: data.hraExemption.proofDocument
                });

                // Update Employee Details
                setEmployeeDetails(prev => ({
                    ...prev,
                    taxRegime: data.taxRegime,
                    panNumber: data.panNumber
                }));

                // Update Terms and Conditions
                setAcceptTermsAndConditions(data.acceptTermsAndConditions || false);

                // Update Toggle States
                setIsBuyer(otherSectionsData.items[0]?.enabled || false);
                setIsYes(otherSectionsData.items[1]?.enabled || false);
                setIsYes1(otherSectionsData.items[2]?.enabled || false);
                setIsYes2(otherSectionsData.items[3]?.enabled || false);

                // Handle LTA Exemption
                setLTAExemption(prev => ({
                    ...prev,
                    status: data.otherExemption?.ltaExemption?.status || "Pending",
                    adminRemarks: data.otherExemption?.ltaExemption?.adminRemarks || "",
                    categoryFinalDeduction: data.otherExemption?.ltaExemption?.categoryFinalDeduction || 0,
                    proofSubmitted: data.otherExemption?.ltaExemption?.proofSubmitted || 0,
                    proofDocument: null,
                    existingDocument: data.otherExemption?.ltaExemption?.proofDocument
                }));

                // Handle Internet Allowance
                setInternetAllowance(prev => ({
                    ...prev,
                    status: data.otherExemption?.internetAllowance?.status || "Pending",
                    adminRemarks: data.otherExemption?.internetAllowance?.adminRemarks || "",
                    categoryFinalDeduction: data.otherExemption?.internetAllowance?.categoryFinalDeduction || 0,
                    proofSubmitted: data.otherExemption?.internetAllowance?.proofSubmitted || 0,
                    proofDocument: null,
                    existingDocument: data.otherExemption?.internetAllowance?.proofDocument
                }));

                // Handle Telephone Allowance
                setTelephoneAllowance(prev => ({
                    ...prev,
                    status: data.otherExemption?.telephoneAllowance?.status || "Pending",
                    adminRemarks: data.otherExemption?.telephoneAllowance?.adminRemarks || "",
                    categoryFinalDeduction: data.otherExemption?.telephoneAllowance?.categoryFinalDeduction || 0,
                    proofSubmitted: data.otherExemption?.telephoneAllowance?.proofSubmitted || 0,
                    proofDocument: null,
                    existingDocument: data.otherExemption?.telephoneAllowance?.proofDocument
                }));
            } else {
                toast.info("No previous declaration found, using defaults.");
            }
        } catch (error) {
            toast.error("Failed to fetch IT declaration");
        }
    };

    const calculate80CTotals = () => {
        const totalProofSubmitted = section80C.items.reduce(
            (sum, item) => sum + (item.proofSubmitted || 0),
            0
        );
        const finalDeduction = Math.min(totalProofSubmitted, section80C.sectionLimit);
        return { totalProofSubmitted, finalDeduction };
    };

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
        return { updatedItems, totalProofSubmitted, finalDeduction };
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
        return { updatedItems, totalProofSubmitted, finalDeduction };
    };

    const validateSubmission = () => {
        if (!acceptTermsAndConditions) {
            toast.error('You must accept the terms and conditions');
            return false;
        }
        const invalid80C = section80C.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
        const invalid80D = section80D.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
        const invalidOther = otherSections.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);

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
            formData.append('taxRegime', employeeDetails.taxRegime || 'old');
            formData.append('panNumber', employeeDetails.panNumber || empPanNumber);
            formData.append('acceptTermsAndConditions', acceptTermsAndConditions);

            section80C.items.forEach((item, index) => {
                formData.append(`section80C[${index}][section]`, item.section);
                formData.append(`section80C[${index}][category]`, item.category);
                formData.append(`section80C[${index}][proofSubmitted]`, item.proofSubmitted);
                formData.append(`section80C[${index}][status]`, item.status);
                formData.append(`section80C[${index}][adminRemarks]`, item.adminRemarks || '');
                if (item.existingDocument) {
                    formData.append(`section80C[${index}][existingDocument]`, item.existingDocument);
                }
                if (item.proofDocument instanceof File) {
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
                if (item.existingDocument) {
                    formData.append(`section80D[${index}][existingDocument]`, item.existingDocument);
                }
                if (item.proofDocument instanceof File) {
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
                if (item.existingDocument) {
                    formData.append(`otherSections[${index}][existingDocument]`, item.existingDocument);
                }
                if (item.proofDocument instanceof File) {
                    formData.append(`otherSectionsProofs[${index}]`, item.proofDocument);
                }
            });

            const response = await postAPI(
                `/it-declaration/${schoolId}/${employeeId}`,
                formData,
                { 'Content-Type': 'multipart/form-data' },
                true
            );

            if (!response.hasError) {
                toast.success("IT Declaration submitted successfully!");
                fetchItDeclaration(schoolId, employeeId, academicYear);
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

    const handleNavigateToRentDetails = () => {
        navigate(`/employee-dashboard/payroll-module/employee/income-tax/it-declaration/rent-details`, {
      state: { academicYear },
    });
    };

    const handleNavigateToLtaDetails = () => {
        navigate(`/employee-dashboard/payroll-module/employee/income-tax/it-declaration/lta-details`, {
      state: { academicYear },
    });
    };

    const handleNavigateToTelephoneDetails = () => {
        navigate(`/employee-dashboard/payroll-module/employee/income-tax/it-declaration/telephone-allowance-details`, {
      state: { academicYear },
    });
    };

    const handleNavigateToInternetDetails = () => {
        navigate(`/employee-dashboard/payroll-module/employee/income-tax/it-declaration/internet-allowance-details`, {
      state: { academicYear },
    });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN').format(amount);
    };

    const getFileName = (proofDocument, existingDocument) => {
        if (proofDocument instanceof File) {
            return proofDocument.name.length > 25 ? proofDocument.name.slice(0, 25) + '...' : proofDocument.name;
        }
        if (existingDocument) {
            const fullName = existingDocument.split('\\').pop().split('/').pop() || 'Existing file';
            return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
        }
        return 'No file';
    };

    const { totalProofSubmitted: total80C, finalDeduction: final80C } = calculate80CTotals();
    const { totalProofSubmitted: total80D, finalDeduction: final80D } = calculate80DTotals(section80D.items);
    const { totalProofSubmitted: totalOther, finalDeduction: finalOther } = calculateOtherSectionsTotals(otherSections.items);
 
    return (
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
                                <div className="row m-0 mb-2 pt-2 salary-slip-box">
                                    <div className="col-md-8">
                                        <p className='text-dark payroll-box-text'>
                                            <strong>Employee Name: </strong> {employeeDetails.employeeName || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className='text-dark payroll-box-text'>
                                            <strong>Employee ID: </strong>{employeeId || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className='text-dark payroll-box-text'>
                                            <strong>Tax Regime: </strong>{employeeDetails.taxRegime === "new" ? "New" : "Old" || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className='text-dark payroll-box-text'>
                                            <strong>PAN No: </strong>{empPanNumber || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className='text-dark payroll-box-text'>
                                            <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year: </label> 
                                             <select
                                                id="yearSelect"
                                                className=" form-select-sm w-auto"
                                                aria-label="Select Year"
                                                style={{ marginLeft: "5px" }}
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
                                            {/* <strong>Financial Year: </strong>{academicYear || 'N/A'} */}
                                        </p>
                                    </div>
                                </div>

                                <div className="table-responsive mb-4">
                                    <table className="border border-dark mb-4 table table-hover">
                                        <thead className="bg-light-subtle">
                                            <tr className="payroll-table-header">
                                                <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
                                                    Investment
                                                </th>
                                                <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>
                                                    Limit
                                                </th>
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
                                                <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
                                                    Admin Remarks
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(section80C.sectionLimit)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80C)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80C)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
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
                                                            required={item.proofSubmitted > 0}
                                                        />
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2"></td>
                                                    <td className="align-content-center border border-dark p-2">
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="file"
                                                                className="form-control payroll-input-border me-2"
                                                                accept="image/*,application/pdf"
                                                                onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
                                                                required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
                                                            />
                                                        </div>
                                                        {(item.proofDocument || item.existingDocument) && (
                                                            <div className="mt-2">
                                                                <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            value={item.status}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
                                                </tr>
                                            ))}
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80D)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80D)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                            </tr>
                                            {section80D.items.map((item, index) => (
                                                <tr key={index} className='payroll-table-body'>
                                                    <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                                                    <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
                                                            value={formatCurrency(item.proofSubmitted)}
                                                            onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
                                                            disabled={item.disabled}
                                                            required={item.proofSubmitted > 0}
                                                        />
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
                                                    <td className="align-content-center border border-dark p-2">
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="file"
                                                                className={`form-control payroll-input-border me-2 ${item.disabled ? 'bg-light' : ''}`}
                                                                accept="image/*,application/pdf"
                                                                onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
                                                                required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
                                                                disabled={item.disabled}
                                                            />
                                                        </div>
                                                        {(item.proofDocument || item.existingDocument) && (
                                                            <div className="mt-2">
                                                                <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            value={item.status}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
                                                </tr>
                                            ))}
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(totalOther)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(finalOther)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                            </tr>
                                            {otherSections.items.map((item, index) => (
                                                <tr key={index} className='payroll-table-body'>
                                                    <td className="align-content-center border border-dark px-3 py-2">
                                                        {item.category}
                                                        {index < 4 && (
                                                            <div className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1" style={{ maxWidth: "fit-content" }}>
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
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
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
                                                                className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
                                                                value={formatCurrency(item.proofSubmitted)}
                                                                onChange={(e) => handleOtherSectionsInputChange(index, 'proofSubmitted', e.target.value)}
                                                                required={item.proofSubmitted > 0}
                                                                disabled={item.disabled}
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
                                                    <td className="align-content-center border border-dark p-2">
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="file"
                                                                className={`form-control payroll-input-border me-2 ${index < 4 && !item.enabled || item.disabled ? 'bg-light' : ''}`}
                                                                accept="image/*,application/pdf"
                                                                onChange={(e) => handleOtherSectionsFileUpload(index, e.target.files[0])}
                                                                required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
                                                                disabled={index < 4 && !item.enabled || item.disabled}
                                                            />
                                                        </div>
                                                        {(item.proofDocument || item.existingDocument) && (
                                                            <div className="mt-2">
                                                                <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            value={item.status}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
                                                </tr>
                                            ))}
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(hraExemption.proofSubmitted)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-center align-content-center border border-dark fw-bold p-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-link p-0"
                                                        onClick={handleNavigateToRentDetails}
                                                        style={{
                                                            color: "red",
                                                            fontWeight: "bold",
                                                            fontSize: "1rem"
                                                        }}
                                                    >
                                                        Enter Rent Details
                                                    </button>
                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-end"
                                                        value={hraExemption.status}
                                                        readOnly
                                                    />
                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{hraExemption.adminRemarks}</td>
                                            </tr>
                                            {(showLtaExemption || showTelephoneAllowance || showInternetAllowance) && (
                                                <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                    <td className="align-content-center border border-dark fw-bold p-2">Other Exemption</td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                    <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                    <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                </tr>
                                            )}
                                            {showLtaExemption && (
                                                <tr className='payroll-table-body'>
                                                    <td className="align-content-center border border-dark px-3 py-2">LTA Exemption</td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        {formatCurrency(ltaExemption.categoryLimit)}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        {formatCurrency(ltaExemption.proofSubmitted)}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        {formatCurrency(ltaExemption.categoryFinalDeduction)}
                                                    </td>
                                                    <td className="text-center align-content-center border border-dark p-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link p-0"
                                                            onClick={handleNavigateToLtaDetails}
                                                            style={{
                                                                color: "red",
                                                                fontWeight: "bold",
                                                                fontSize: "1rem"
                                                            }}
                                                        >
                                                            Enter LTA Details
                                                        </button>
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            value={ltaExemption.status}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="text-start align-content-center border border-dark p-2">{ltaExemption.adminRemarks}</td>
                                                </tr>
                                            )}
                                            {showTelephoneAllowance && (
                                                <tr className='payroll-table-body'>
                                                    <td className="align-content-center border border-dark px-3 py-2">Telephone Allowance</td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        {formatCurrency(telephoneAllowance.categoryLimit)}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        {formatCurrency(telephoneAllowance.proofSubmitted)}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        {formatCurrency(telephoneAllowance.categoryFinalDeduction)}
                                                    </td>
                                                    <td className="text-center align-content-center border border-dark p-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link p-0"
                                                            onClick={handleNavigateToTelephoneDetails}
                                                            style={{
                                                                color: "red",
                                                                fontWeight: "bold",
                                                                fontSize: "1rem"
                                                            }}
                                                        >
                                                            Enter Telephone Details
                                                        </button>
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            value={telephoneAllowance.status}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="text-start align-content-center border border-dark p-2">{telephoneAllowance.adminRemarks}</td>
                                                </tr>
                                            )}
                                            {showInternetAllowance && (
                                                <tr className='payroll-table-body'>
                                                    <td className="align-content-center border border-dark px-3 py-2">Internet Allowance</td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        {formatCurrency(internetAllowance.categoryLimit)}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        {formatCurrency(internetAllowance.proofSubmitted)}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        {formatCurrency(internetAllowance.categoryFinalDeduction)}
                                                    </td>
                                                    <td className="text-center align-content-center border border-dark p-2">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link p-0"
                                                            onClick={handleNavigateToInternetDetails}
                                                            style={{
                                                                color: "red",
                                                                fontWeight: "bold",
                                                                fontSize: "1rem"
                                                            }}
                                                        >
                                                            Enter Internet Details
                                                        </button>
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            value={internetAllowance.status}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="text-start align-content-center border border-dark p-2">{internetAllowance.adminRemarks}</td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td colSpan={7} className="border border-dark fw-bold p-2">
                                                    <div className="d-flex align-items-center gap-1">
                                                        <p className="form-check ms-1">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input mt-0 me-2"
                                                                id="acceptTermsAndConditions"
                                                                name="acceptTermsAndConditions"
                                                                checked={acceptTermsAndConditions}
                                                                onChange={handleTermsChange}
                                                                required
                                                            />
                                                        </p>
                                                        <p className="mb-0 fw-bold text-dark">
                                                            I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="row m-0">
                                    <div className="col-md-12 text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeItDeclaration;