


// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import getAPI from '../../../../../api/getAPI';
// // import postAPI from '../../../../../api/postAPI';
// // import { toast } from 'react-toastify';

// // const CreateFeesRefund = () => {
// //   const navigate = useNavigate();
// //   const [selectedRefundType, setSelectedRefundType] = useState('');
// //   const [selectedRegistration, setSelectedRegistration] = useState('');
// //   const [selectedAdmission, setSelectedAdmission] = useState('');
// //   const [refundAmount, setRefundAmount] = useState('');
// //   const [refundAmountError, setRefundAmountError] = useState('');
// //   const [feeTypeRefundAmounts, setFeeTypeRefundAmounts] = useState({});
// //   const [selectedStudent, setSelectedStudent] = useState(null);
// //   const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
// //   const [academicYears, setAcademicYears] = useState([]);
// //   const [schoolId, setSchoolId] = useState('');
// //   const [loadingYears, setLoadingYears] = useState(false);
// //   const [feeData, setFeeData] = useState([]);
// //   const [feesTypes, setFeesTypes] = useState([]);
// //   const [loadingFees, setLoadingFees] = useState(false);
// //   const [classData, setClassData] = useState([]);
// //   const [sectionData, setSectionData] = useState([]);
// //   const [showPaymentFields, setShowPaymentFields] = useState(false);
// //   const [loadingProceed, setLoadingProceed] = useState(false);
// //   const [loadingSubmit, setLoadingSubmit] = useState(false);
// //   const [formData, setFormData] = useState({
// //     paymentMode: '',
// //     chequeNumber: '',
// //     bankName: '',
// //   });

// //   useEffect(() => {
// //     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
// //     const id = userDetails?.schoolId;

// //     if (!id) {
// //       toast.error('School ID not found. Please log in again.');
// //       return;
// //     }
// //     setSchoolId(id);
// //   }, []);

// //   useEffect(() => {
// //     const fetchAcademicYears = async () => {
// //       try {
// //         setLoadingYears(true);
// //         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
// //         const schoolId = userDetails?.schoolId;
// //         if (schoolId) {
// //           const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
// //           const years = response.data.data || [];
// //           setAcademicYears(years.map(item => item.academicYear));

// //           const storedYear = localStorage.getItem('currentAcademicYear');
// //           if (storedYear && years.some(item => item.academicYear === storedYear)) {
// //             setSelectedAcademicYear(storedYear);
// //           } else if (years.length > 0) {
// //             setSelectedAcademicYear(years[0].academicYear);
// //           }
// //         }
// //       } catch (err) {
// //         console.error('Error fetching academic years:', err);
// //         toast.error('Failed to fetch academic years.');
// //       } finally {
// //         setLoadingYears(false);
// //       }
// //     };

// //     fetchAcademicYears();
// //   }, []);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!schoolId || !selectedAcademicYear) return;

// //       try {
// //         setLoadingFees(true);
// //         const feeResponse = await getAPI(`/get-all-fees/${schoolId}/${selectedAcademicYear}`);
// //         if (feeResponse.data.hasError) {
// //           throw new Error(feeResponse.data.message);
// //         }
// //         setFeeData(feeResponse.data.data || []);

// //         const classSectionResponse = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedAcademicYear}`, {}, true);
// //         const classSectionData = classSectionResponse?.data?.data || [];
// //         setClassData(classSectionData);

// //         const allSections = classSectionData.flatMap(cls => cls.sections.map(section => ({
// //           _id: section._id,
// //           sectionName: section.name
// //         })));
// //         setSectionData(allSections);

// //         const feesTypeResponse = await getAPI(`/getall-fess-type-year/${schoolId}/year/${selectedAcademicYear}`);
// //         if (!feesTypeResponse.data.hasError && Array.isArray(feesTypeResponse.data.data)) {
// //           setFeesTypes(feesTypeResponse.data.data);
// //         } else {
// //           toast.error(feesTypeResponse.data.message || 'Error fetching fee types.');
// //         }
// //       } catch (err) {
// //         console.error('Error fetching data:', err);
// //         toast.error('Failed to fetch data.');
// //       } finally {
// //         setLoadingFees(false);
// //       }
// //     };

// //     fetchData();
// //   }, [schoolId, selectedAcademicYear]);

// //   const getClassName = (classId) => {
// //     const classItem = classData.find((c) => c._id === classId);
// //     return classItem ? classItem.className : 'N/A';
// //   };

// //   const getSectionName = (sectionId) => {
// //     if (sectionId === 'N/A') return 'N/A';
// //     const sectionItem = sectionData.find((s) => s._id === sectionId);
// //     try {
// //       return sectionItem ? sectionItem.sectionName : 'N/A';
// //     } catch (err) {
// //       console.error('Error getting section name:', err);
// //       return 'N/A';
// //     }
// //   };

// //   const getFeeTypeName = (feeTypeId) => {
// //     const feeType = feesTypes.find((type) => type._id === feeTypeId);
// //     return feeType ? feeType.feesTypeName : 'N/A';
// //   };

// //   const handleRefundTypeChange = (e) => {
// //     setSelectedRefundType(e.target.value);
// //     setSelectedRegistration('');
// //     setSelectedAdmission('');
// //     setSelectedStudent(null);
// //     setRefundAmount('');
// //     setRefundAmountError('');
// //     setFeeTypeRefundAmounts({});
// //     setShowPaymentFields(false);
// //     setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
// //   };

// //   const handleRegistrationChange = (e) => {
// //     const value = e.target.value.trim();
// //     setSelectedRegistration(value);
// //     const student = filteredStudents.find(
// //       (s) => s.registrationNumber?.toString().toLowerCase() === value.toLowerCase()
// //     );
// //     setSelectedStudent(student || null);
// //     setRefundAmount('');
// //     setRefundAmountError('');
// //     setFeeTypeRefundAmounts({});
// //     setShowPaymentFields(false);
// //     setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
// //   };

// //   const handleAdmissionChange = (e) => {
// //     const value = e.target.value.trim();
// //     setSelectedAdmission(value);
// //     const studentRecords = filteredStudents.filter(
// //       (s) => s.admissionNumber?.toString().toLowerCase() === value.toLowerCase()
// //     );

// //     if (studentRecords.length > 0) {
// //       const aggregatedStudent = {
// //         admissionNumber: studentRecords[0].admissionNumber,
// //         firstName: studentRecords[0].firstName,
// //         lastName: studentRecords[0].lastName,
// //         classId: studentRecords[0].classId,
// //         sectionId: studentRecords[0].sectionId,
// //         paidAmount: studentRecords.reduce((sum, s) => sum + (s.paidAmount || 0), 0),
// //         balance: studentRecords.reduce((sum, s) => sum + (s.balance || 0), 0),
// //         feeRecords: studentRecords.map((s) => ({
// //           feetype: s.feetype,
// //           paidAmount: s.paidAmount || 0,
// //           balance: s.balance || 0,
// //         })),
// //       };
// //       setSelectedStudent(aggregatedStudent);
// //       setFeeTypeRefundAmounts(
// //         studentRecords.reduce((acc, s) => ({
// //           ...acc,
// //           [s.feetype]: '',
// //         }), {})
// //       );
// //     } else {
// //       setSelectedStudent(null);
// //       setFeeTypeRefundAmounts({});
// //     }
// //     setRefundAmount('');
// //     setRefundAmountError('');
// //     setShowPaymentFields(false);
// //     setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
// //   };

// //   const handleFeeTypeRefundChange = (feetype, value) => {
// //     const parsedValue = value.trim() === '' ? '' : parseFloat(value);
// //     if (parsedValue !== '' && (isNaN(parsedValue) || parsedValue < 0)) {
// //       setRefundAmountError('Please enter a valid refund amount greater than or equal to 0.');
// //       return;
// //     }

// //     setFeeTypeRefundAmounts((prev) => ({
// //       ...prev,
// //       [feetype]: parsedValue === '' ? '' : parsedValue.toString(),
// //     }));

// //     const updatedFeeTypeRefundAmounts = {
// //       ...feeTypeRefundAmounts,
// //       [feetype]: parsedValue === '' ? '' : parsedValue.toString(),
// //     };
// //     const totalFeeTypeRefund = Object.values(updatedFeeTypeRefundAmounts)
// //       .reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

// //     setRefundAmount(totalFeeTypeRefund > 0 ? totalFeeTypeRefund.toString() : '');

// //     if (selectedStudent) {
// //       const invalidFeeType = selectedStudent.feeRecords.find(
// //         (record) => {
// //           const amount = parseFloat(updatedFeeTypeRefundAmounts[record.feetype] || 0);
// //           return amount > 0 && amount > (record.balance || 0);
// //         }
// //       );

// //       if (totalFeeTypeRefund > selectedStudent.balance) {
// //         setRefundAmountError(`Total refund amount cannot exceed total balance (${selectedStudent.balance}).`);
// //       } else if (invalidFeeType) {
// //         setRefundAmountError(
// //           `Refund amount for ${getFeeTypeName(invalidFeeType.feetype)} exceeds its balance (${invalidFeeType.balance}).`
// //         );
// //       } else if (totalFeeTypeRefund <= 0) {
// //         setRefundAmountError('Total refund amount must be greater than 0.');
// //       } else {
// //         setRefundAmountError('');
// //       }
// //     } else {
// //       setRefundAmountError('');
// //     }
// //   };

// //   const handleRefundAmountChange = (e) => {
// //     const value = e.target.value.trim();
// //     const parsedValue = value === '' ? '' : parseFloat(value);
// //     setRefundAmount(value);

// //     if (selectedStudent && value) {
// //       if (isNaN(parsedValue) || parsedValue <= 0) {
// //         setRefundAmountError('Please enter a valid refund amount greater than 0.');
// //       } else if (parsedValue > selectedStudent.balance) {
// //         setRefundAmountError(`Refund amount cannot exceed balance (${selectedStudent.balance}).`);
// //       } else {
// //         setRefundAmountError('');
// //       }
// //     } else {
// //       setRefundAmountError('');
// //     }
// //     setShowPaymentFields(false);
// //     setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
// //   };

// //   const handleAcademicYearChange = (e) => {
// //     const year = e.target.value;
// //     setSelectedAcademicYear(year);
// //     setSelectedRegistration('');
// //     setSelectedAdmission('');
// //     setSelectedStudent(null);
// //     setRefundAmount('');
// //     setRefundAmountError('');
// //     setFeeTypeRefundAmounts({});
// //     setShowPaymentFields(false);
// //     setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
// //   };

// //   const handleFormDataChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleProceed = () => {
// //     setLoadingProceed(true);
// //     setTimeout(() => {
// //       if (!selectedStudent) {
// //         toast.error('Please select a valid student.');
// //         setLoadingProceed(false);
// //         return;
// //       }

// //       const totalRefund = selectedRefundType === 'School Fees'
// //         ? Object.values(feeTypeRefundAmounts).reduce(
// //           (sum, val) => sum + (parseFloat(val) || 0),
// //           0
// //         )
// //         : parseFloat(refundAmount);

// //       if (selectedRefundType === 'School Fees') {
// //         const invalidFeeType = selectedStudent.feeRecords.find(
// //           (record) => {
// //             const amount = parseFloat(feeTypeRefundAmounts[record.feetype] || 0);
// //             return amount > 0 && amount > (record.balance || 0);
// //           }
// //         );

// //         if (invalidFeeType) {
// //           toast.error(
// //             `Refund amount for ${getFeeTypeName(invalidFeeType.feetype)} exceeds its balance (${invalidFeeType.balance}).`
// //           );
// //           setLoadingProceed(false);
// //           return;
// //         }
// //       }

// //       if (
// //         totalRefund > 0 &&
// //         totalRefund <= selectedStudent.balance &&
// //         !refundAmountError
// //       ) {
// //         setShowPaymentFields(true);
// //       } else {
// //         toast.error('Please enter a valid refund amount within the balance.');
// //       }
// //       setLoadingProceed(false);
// //     }, 500);
// //   };

// //   const refundTypeToFeeType = {
// //     'Registration Fees': 'Registration Fees',
// //     'Admission Fees': 'Admission Fees',
// //     'School Fees': 'School Fees',
// //     'Board Registration Fees': 'Board Registration Fees',
// //     'Board Exam Fees': 'Board Exam Fees',
// //   };

// //   const filteredStudents = selectedAcademicYear && selectedRefundType
// //     ? feeData.filter(
// //       (student) =>
// //         student.academicYear === selectedAcademicYear &&
// //         student.feeType.trim() === refundTypeToFeeType[selectedRefundType].trim()
// //     )
// //     : feeData;

// //   const getSchoolFeesSummary = () => {
// //     if (!selectedStudent || selectedRefundType !== 'School Fees') return [];

// //     const schoolFees = filteredStudents.filter(
// //       (fee) =>
// //         fee.feeType.trim() === 'School Fees' &&
// //         fee.admissionNumber === selectedStudent.admissionNumber
// //     );

// //     const summary = schoolFees.map((fee) => ({
// //       feeTypeId: fee.feetype,
// //       feeTypeName: getFeeTypeName(fee.feetype),
// //       paidAmount: fee.paidAmount || 0,
// //       balance: fee.balance || 0,
// //       refundAmount: feeTypeRefundAmounts[fee.feetype] || '',
// //     }));

// //     const total = summary.reduce(
// //       (acc, curr) => ({
// //         paidAmount: acc.paidAmount + curr.paidAmount,
// //         balance: acc.balance + curr.balance,
// //         refundAmount: acc.refundAmount + (parseFloat(curr.refundAmount) || 0),
// //       }),
// //       { paidAmount: 0, balance: 0, refundAmount: 0 }
// //     );

// //     return [...summary, { feeTypeName: 'Total', paidAmount: total.paidAmount, balance: total.balance, refundAmount: total.refundAmount }];
// //   };

// //  const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   setLoadingSubmit(true);

// //   try {
// //     if (!selectedStudent || !refundAmount || !formData.paymentMode || refundAmountError) {
// //       toast.error('Please complete all required fields and ensure refund amount is valid.');
// //       setLoadingSubmit(false);
// //       return;
// //     }

// //     if (formData.paymentMode === 'Cheque' && (!formData.chequeNumber || !formData.bankName)) {
// //       toast.error('Please enter cheque number and bank name.');
// //       setLoadingSubmit(false);
// //       return;
// //     }

// //     // Prepare refundData for the database (using feetype IDs)
// //     const refundData = {
// //       schoolId,
// //       academicYear: selectedAcademicYear,
// //       refundType: selectedRefundType,
// //       registrationNumber: selectedRefundType === 'Registration Fees' ? selectedRegistration : null,
// //       admissionNumber: selectedRefundType !== 'Registration Fees' ? selectedAdmission : null,
// //       firstName: selectedStudent.firstName,
// //       lastName: selectedStudent.lastName,
// //       classId: selectedStudent.classId,
// //       sectionId: selectedRefundType !== 'Registration Fees' ? selectedStudent.sectionId : null,
// //       paidAmount: selectedStudent.paidAmount || 0,
// //       refundAmount: parseFloat(refundAmount),
// //       balance: selectedStudent.paidAmount - parseFloat(refundAmount),
// //       paymentMode: formData.paymentMode,
// //       chequeNumber: formData.paymentMode === 'Cheque' ? formData.chequeNumber : null,
// //       bankName: formData.paymentMode === 'Cheque' ? formData.bankName : null,
// //       feeTypeRefunds: selectedRefundType === 'School Fees'
// //         ? Object.entries(feeTypeRefundAmounts)
// //             .filter(([_, amount]) => parseFloat(amount) > 0)
// //             .map(([feetype, amount]) => {
// //               const feeRecord = selectedStudent.feeRecords.find(
// //                 (record) => record.feetype === feetype
// //               );
// //               return {
// //                 feetype, // Store feetype ID in the database
// //                 refundAmount: parseFloat(amount),
// //                 paidAmount: feeRecord.paidAmount || 0,
// //                 balance: (feeRecord.balance || 0) - parseFloat(amount),
// //               };
// //             })
// //         : [],
// //     };

// //     const response = await postAPI('/create-refund', refundData);

// //     if (response.data.hasError) {
// //       toast.error(response.data.message);
// //     } else {
// //       toast.success('Refund request submitted successfully!');

// //       // Prepare feeTypeRefundsWithNames for the receipt (including feeTypeName)
// //       const feeTypeRefundsWithNames = selectedRefundType === 'School Fees'
// //         ? Object.entries(feeTypeRefundAmounts)
// //             .filter(([_, amount]) => parseFloat(amount) > 0)
// //             .map(([feetype, amount]) => {
// //               const feeRecord = selectedStudent.feeRecords.find(
// //                 (record) => record.feetype === feetype
// //               );
// //               return {
// //                 feetype, // Include feetype ID for reference
// //                 feeTypeName: getFeeTypeName(feetype), // Include feeTypeName for display
// //                 refundAmount: parseFloat(amount),
// //                 paidAmount: feeRecord.paidAmount || 0,
// //                 balance: (feeRecord.balance || 0) - parseFloat(amount),
// //               };
// //             })
// //         : [];

// //       navigate('/school-dashboard/fees-module/fees-receipts/fees-refund/refund-receipt', {
// //         state: {
// //           refund: {
// //             ...refundData,
// //             receiptNumber: response.data.data.receiptNumber,
// //             refundDate: response.data.data.refundDate || new Date().toISOString(),
// //             transactionNumber: response.data.data.transactionNumber || null,
// //             feeTypeRefunds: feeTypeRefundsWithNames, 
// //           },
// //           className: getClassName(selectedStudent.classId),
// //           sectionName: getSectionName(selectedStudent.sectionId),
// //           refundTypeName: selectedRefundType,
// //         },
// //       });

// //       setSelectedRefundType('');
// //       setSelectedRegistration('');
// //       setSelectedAdmission('');
// //       setSelectedStudent(null);
// //       setRefundAmount('');
// //       setRefundAmountError('');
// //       setFeeTypeRefundAmounts({});
// //       setShowPaymentFields(false);
// //       setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
// //     }
// //   } catch (error) {
// //     console.error('Error submitting refund request:', error);
// //     toast.error('Failed to submit refund request.');
// //   } finally {
// //     setLoadingSubmit(false);
// //   }
// // };

// //   return (
// //     <div className="container">
// //       <div className="row">
// //         <div className="col-xl-12">
// //           <div className="card m-2">
// //             <div className="card-body custom-heading-padding">
// //               <div className="container">
// //                 <div className="card-header mb-2 d-flex justify-content-between align-items-center">
// //                   <h4 className="card-title custom-heading-font">Refund Request Form</h4>
// //                   <div className="col-md-2">
// //                     <select
// //                       id="academicYear"
// //                       name="academicYear"
// //                       className="form-control"
// //                       value={selectedAcademicYear}
// //                       onChange={handleAcademicYearChange}
// //                       required
// //                       disabled={loadingYears}
// //                     >
// //                       <option value="">Select Academic Year</option>
// //                       {academicYears.map((year) => (
// //                         <option key={year} value={year}>
// //                           {year}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     {loadingYears && <p>Loading academic years...</p>}
// //                   </div>
// //                 </div>
// //               </div>
// //               <form onSubmit={handleSubmit}>
// //                 <div className="row mb-3">
// //                   <div className="col-md-4">
// //                     <label htmlFor="refundType" className="form-label">Select Refund Type</label>
// //                     <select
// //                       id="refundType"
// //                       name="refundType"
// //                       className="form-control"
// //                       value={selectedRefundType}
// //                       onChange={handleRefundTypeChange}
// //                       required
// //                     >
// //                       <option value="">Select Refund Type</option>
// //                       {[
// //                         'Registration Fees',
// //                         'Admission Fees',
// //                         'School Fees',
// //                         'Board Registration Fees',
// //                         'Board Exam Fees',
// //                       ].map((type) => (
// //                         <option key={type} value={type}>
// //                           {type}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   {selectedRefundType === 'Registration Fees' && (
// //                     <div className="col-md-4">
// //                       <label htmlFor="registrationNumber" className="form-label">Registration Number</label>
// //                       <input
// //                         type="text"
// //                         id="registrationNumber"
// //                         name="registrationNumber"
// //                         className="form-control"
// //                         list="registrationNumbers"
// //                         value={selectedRegistration}
// //                         onChange={handleRegistrationChange}
// //                         placeholder="Search or select registration number"
// //                         disabled={loadingFees}
// //                         required
// //                       />
// //                       <datalist id="registrationNumbers">
// //                         {filteredStudents
// //                           .filter((student) => student.registrationNumber)
// //                           .map((student, index) => (
// //                             <option key={index} value={student.registrationNumber}>
// //                               {student.registrationNumber} - {student.firstName} {student.lastName}
// //                             </option>
// //                           ))}
// //                       </datalist>
// //                       {loadingFees && <p>Loading fee data...</p>}
// //                     </div>
// //                   )}

// //                   {selectedRefundType && selectedRefundType !== 'Registration Fees' && (
// //                     <div className="col-md-4">
// //                       <label htmlFor="admissionNumber" className="form-label">Admission Number</label>
// //                       <input
// //                         type="text"
// //                         id="admissionNumber"
// //                         name="admissionNumber"
// //                         className="form-control"
// //                         list="admissionNumbers"
// //                         value={selectedAdmission}
// //                         onChange={handleAdmissionChange}
// //                         placeholder="Search or select admission number"
// //                         disabled={loadingFees}
// //                         required
// //                       />
// //                       <datalist id="admissionNumbers">
// //                         {[...new Set(filteredStudents
// //                           .filter((student) => student.admissionNumber)
// //                           .map((student) => student.admissionNumber))]
// //                           .map((admissionNumber, index) => {
// //                             const student = filteredStudents.find((s) => s.admissionNumber === admissionNumber);
// //                             return (
// //                               <option key={index} value={admissionNumber}>
// //                                 {admissionNumber} - {student.firstName} {student.lastName}
// //                               </option>
// //                             );
// //                           })}
// //                       </datalist>
// //                       {loadingFees && <p>Loading fee data...</p>}
// //                     </div>
// //                   )}
// //                 </div>

// //                 {selectedStudent ? (
// //                   <div className="row mb-3">
// //                     {selectedRefundType === 'Registration Fees' ? (
// //                       <div className="col-md-3">
// //                         <label className="form-label">Registration No.</label>
// //                         <input
// //                           type="text"
// //                           className="form-control"
// //                           value={selectedStudent.registrationNumber || 'N/A'}
// //                           disabled
// //                         />
// //                       </div>
// //                     ) : (
// //                       <div className="col-md-3">
// //                         <label className="form-label">Admission No.</label>
// //                         <input
// //                           type="text"
// //                           className="form-control"
// //                           value={selectedStudent.admissionNumber || 'N/A'}
// //                           disabled
// //                         />
// //                       </div>
// //                     )}
// //                     <div className="col-md-3">
// //                       <label className="form-label">Student Name</label>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         value={`${selectedStudent.firstName || ''} ${selectedStudent.lastName || ''}`}
// //                         disabled
// //                       />
// //                     </div>
// //                     <div className="col-md-3">
// //                       <label className="form-label">Class</label>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         value={getClassName(selectedStudent.classId)}
// //                         disabled
// //                       />
// //                     </div>
// //                     {selectedRefundType !== 'Registration Fees' && (
// //                       <div className="col-md-3">
// //                         <label className="form-label">Section</label>
// //                         <input
// //                           type="text"
// //                           className="form-control"
// //                           value={getSectionName(selectedStudent.sectionId)}
// //                           disabled
// //                         />
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : selectedRefundType && (selectedRegistration || selectedAdmission) ? (
// //                   <div className="row mb-3">
// //                     <div className="col-md-12">
// //                       <p className="text-danger">Student not found. Please select a valid number.</p>
// //                     </div>
// //                   </div>
// //                 ) : null}

// //                 {selectedStudent && selectedRefundType === 'School Fees' && (
// //                   <div className="row mb-3">
// //                     <div className="col-md-12">
// //                       <table className="table table-bordered">
// //                         <thead>
// //                           <tr>
// //                             <th>Fee Type</th>
// //                             <th>Paid Amount</th>
// //                             <th>Balance</th>
// //                             <th>Refund Amount</th>
// //                           </tr>
// //                         </thead>
// //                         <tbody>
// //                           {getSchoolFeesSummary().map((item, index) => (
// //                             <tr key={index}>
// //                               <td>{item.feeTypeName}</td>
// //                               <td>{item.paidAmount}</td>
// //                               <td>{item.balance}</td>
// //                               <td>
// //                                 {item.feeTypeName === 'Total' ? (
// //                                   item.refundAmount
// //                                 ) : item.balance === 0 ? (
// //                                   <span className="text-success">All amount is refunded</span>
// //                                 ) : (
// //                                   <input
// //                                     className="form-control"
// //                                     value={feeTypeRefundAmounts[item.feeTypeId] || ''}
// //                                     onChange={(e) => handleFeeTypeRefundChange(item.feeTypeId, e.target.value)}
// //                                     placeholder="Enter refund amount"
// //                                     min="0"
// //                                     max={item.balance}
// //                                   />
// //                                 )}
// //                               </td>
// //                             </tr>
// //                           ))}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {selectedStudent && (
// //                   <div className="row mb-3">
// //                     <div className="col-md-4">
// //                       <label htmlFor="paidAmount" className="form-label">Paid Amount</label>
// //                       <input
// //                         type="number"
// //                         id="paidAmount"
// //                         name="paidAmount"
// //                         className="form-control"
// //                         value={selectedStudent.paidAmount || 0}
// //                         disabled
// //                       />
// //                     </div>
// //                     <div className="col-md-4">
// //                       <label htmlFor="balance" className="form-label">Balance</label>
// //                       <input
// //                         type="number"
// //                         id="balance"
// //                         name="balance"
// //                         className="form-control"
// //                         value={selectedStudent.balance || 0}
// //                         disabled
// //                       />
// //                     </div>
// //                     <div className="col-md-4">
// //                       {selectedRefundType !== 'School Fees' && (
// //                         <>
// //                           <label htmlFor="refundAmountInput" className="form-label">Refund Amount</label>
// //                           <input
// //                             id="refundAmountInput"
// //                             name="refundAmountInput"
// //                             className="form-control"
// //                             value={refundAmount}
// //                             onChange={handleRefundAmountChange}
// //                             placeholder="Enter refund amount"
// //                             min="0"
// //                             max={selectedStudent.balance}
// //                           />
// //                         </>
// //                       )}
// //                       {refundAmountError && (
// //                         <p className="text-danger mt-1">{refundAmountError}</p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 )}

// //                 {showPaymentFields && (
// //                   <div className="row mb-3">
// //                     <div className="col-md-6">
// //                       <div className="mb-3">
// //                         <label htmlFor="paymentMode" className="form-label">
// //                           Payment Option <span className="text-danger">*</span>
// //                         </label>
// //                         <select
// //                           id="paymentMode"
// //                           name="paymentMode"
// //                           className="form-control"
// //                           value={formData.paymentMode}
// //                           onChange={handleFormDataChange}
// //                           required
// //                         >
// //                           <option value="">Select</option>
// //                           <option value="Cash">Cash</option>
// //                           <option value="Cheque">Cheque</option>
// //                           <option value="Online">Online</option>
// //                         </select>
// //                       </div>
// //                     </div>

// //                     {formData.paymentMode === 'Cheque' && (
// //                       <>
// //                         <div className="col-md-6">
// //                           <div className="mb-3">
// //                             <label htmlFor="chequeNumber" className="form-label">
// //                               Cheque Number <span className="text-danger">*</span>
// //                             </label>
// //                             <input
// //                               type="text"
// //                               id="chequeNumber"
// //                               name="chequeNumber"
// //                               className="form-control"
// //                               value={formData.chequeNumber}
// //                               onChange={handleFormDataChange}
// //                               required
// //                             />
// //                           </div>
// //                         </div>
// //                         <div className="col-md-6">
// //                           <div className="mb-3">
// //                             <label htmlFor="bankName" className="form-label">
// //                               Bank Name <span className="text-danger">*</span>
// //                             </label>
// //                             <input
// //                               type="text"
// //                               id="bankName"
// //                               name="bankName"
// //                               className="form-control"
// //                               value={formData.bankName}
// //                               onChange={handleFormDataChange}
// //                               required
// //                             />
// //                           </div>
// //                         </div>
// //                       </>
// //                     )}
// //                   </div>
// //                 )}

// //                 {selectedRefundType && !showPaymentFields && selectedStudent && selectedStudent.balance > 0 && (
// //                   <div className="mt-3 d-flex justify-content-end">
// //                     <button
// //                       type="button"
// //                       className="btn btn-primary custom-heading-font"
// //                       onClick={handleProceed}
// //                       disabled={
// //                         loadingProceed ||
// //                         !refundAmount ||
// //                         parseFloat(refundAmount) <= 0 ||
// //                         refundAmountError
// //                       }
// //                     >
// //                       {loadingProceed ? 'Processing...' : 'Proceed'}
// //                     </button>
// //                   </div>
// //                 )}

// //                 {showPaymentFields && (
// //                   <div className="mt-3 d-flex justify-content-end">
// //                     <button
// //                       type="submit"
// //                       className="btn btn-primary custom-heading-font"
// //                       disabled={
// //                         loadingSubmit ||
// //                         !formData.paymentMode ||
// //                         (formData.paymentMode === 'Cheque' && (!formData.chequeNumber || !formData.bankName))
// //                       }
// //                     >
// //                       {loadingSubmit ? 'Processing...' : 'Submit'}
// //                     </button>
// //                   </div>
// //                 )}
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateFeesRefund;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';
// import { toast } from 'react-toastify';

// const CreateFeesRefund = () => {
//   const navigate = useNavigate();
//   const [selectedRefundType, setSelectedRefundType] = useState('');
//   const [selectedRegistration, setSelectedRegistration] = useState('');
//   const [selectedAdmission, setSelectedAdmission] = useState('');
//   const [refundAmount, setRefundAmount] = useState('');
//   const [refundAmountError, setRefundAmountError] = useState('');
//   const [feeTypeRefundAmounts, setFeeTypeRefundAmounts] = useState({});
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
//   const [academicYears, setAcademicYears] = useState([]);
//   const [schoolId, setSchoolId] = useState('');
//   const [loadingYears, setLoadingYears] = useState(false);
//   const [feeData, setFeeData] = useState([]);
//   const [feesTypes, setFeesTypes] = useState([]);
//   const [loadingFees, setLoadingFees] = useState(false);
//   const [classData, setClassData] = useState([]);
//   const [sectionData, setSectionData] = useState([]);
//   const [showPaymentFields, setShowPaymentFields] = useState(false);
//   const [loadingProceed, setLoadingProceed] = useState(false);
//   const [loadingSubmit, setLoadingSubmit] = useState(false);
//   const [formData, setFormData] = useState({
//     paymentMode: '',
//     chequeNumber: '',
//     bankName: '',
//   });

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     const id = userDetails?.schoolId;

//     if (!id) {
//       toast.error('School ID not found. Please log in again.');
//       return;
//     }
//     setSchoolId(id);
//   }, []);

//   useEffect(() => {
//     const fetchAcademicYears = async () => {
//       try {
//         setLoadingYears(true);
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         const schoolId = userDetails?.schoolId;
//         if (schoolId) {
//           const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
//           const years = response.data.data || [];
//           setAcademicYears(years.map(item => item.academicYear));

//           const storedYear = localStorage.getItem('currentAcademicYear');
//           if (storedYear && years.some(item => item.academicYear === storedYear)) {
//             setSelectedAcademicYear(storedYear);
//           } else if (years.length > 0) {
//             setSelectedAcademicYear(years[0].academicYear);
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching academic years:', err);
//         toast.error('Failed to fetch academic years.');
//       } finally {
//         setLoadingYears(false);
//       }
//     };

//     fetchAcademicYears();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!schoolId || !selectedAcademicYear) return;

//       try {
//         setLoadingFees(true);
//         const feeResponse = await getAPI(`/get-all-fees/${schoolId}/${selectedAcademicYear}`);
//         if (feeResponse.data.hasError) {
//           throw new Error(feeResponse.data.message);
//         }
//         setFeeData(feeResponse.data.data || []);

//         const classSectionResponse = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedAcademicYear}`, {}, true);
//         const classSectionData = classSectionResponse?.data?.data || [];
//         setClassData(classSectionData);

//         const allSections = classSectionData.flatMap(cls => cls.sections.map(section => ({
//           _id: section._id,
//           sectionName: section.name
//         })));
//         setSectionData(allSections);

//         const feesTypeResponse = await getAPI(`/getall-fess-type-year/${schoolId}/year/${selectedAcademicYear}`);
//         if (!feesTypeResponse.data.hasError && Array.isArray(feesTypeResponse.data.data)) {
//           setFeesTypes(feesTypeResponse.data.data);
//         } else {
//           toast.error(feesTypeResponse.data.message || 'Error fetching fee types.');
//         }
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         toast.error('Failed to fetch data.');
//       } finally {
//         setLoadingFees(false);
//       }
//     };

//     fetchData();
//   }, [schoolId, selectedAcademicYear]);

//   const getClassName = (classId) => {
//     const classItem = classData.find((c) => c._id === classId);
//     return classItem ? classItem.className : 'N/A';
//   };

//   const getSectionName = (sectionId) => {
//     if (sectionId === 'N/A') return 'N/A';
//     const sectionItem = sectionData.find((s) => s._id === sectionId);
//     try {
//       return sectionItem ? sectionItem.sectionName : 'N/A';
//     } catch (err) {
//       console.error('Error getting section name:', err);
//       return 'N/A';
//     }
//   };

//   const getFeeTypeName = (feeTypeId) => {
//     const feeType = feesTypes.find((type) => type._id === feeTypeId);
//     return feeType ? feeType.feesTypeName : 'N/A';
//   };

//   const handleRefundTypeChange = (e) => {
//     setSelectedRefundType(e.target.value);
//     setSelectedRegistration('');
//     setSelectedAdmission('');
//     setSelectedStudent(null);
//     setRefundAmount('');
//     setRefundAmountError('');
//     setFeeTypeRefundAmounts({});
//     setShowPaymentFields(false);
//     setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
//   };

//   const handleRegistrationChange = (e) => {
//     const value = e.target.value.trim();
//     setSelectedRegistration(value);
//     const student = filteredStudents.find(
//       (s) => s.registrationNumber?.toString().toLowerCase() === value.toLowerCase()
//     );
//     setSelectedStudent(student || null);
//     setRefundAmount('');
//     setRefundAmountError('');
//     setFeeTypeRefundAmounts({});
//     setShowPaymentFields(false);
//     setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
//   };

//   const handleAdmissionChange = (e) => {
//     const value = e.target.value.trim();
//     setSelectedAdmission(value);
//     const studentRecords = filteredStudents.filter(
//       (s) => s.admissionNumber?.toString().toLowerCase() === value.toLowerCase()
//     );


//     if (studentRecords.length > 0) {
//       const aggregatedStudent = {
//         admissionNumber: studentRecords[0].admissionNumber,
//         firstName: studentRecords[0].firstName,
//         lastName: studentRecords[0].lastName,
//         classId: studentRecords[0].classId,
//         sectionId: studentRecords[0].sectionId,
//         paidAmount: studentRecords.reduce((sum, s) => sum + (s.paidAmount || 0), 0),
//         balance: studentRecords.reduce((sum, s) => sum + (s.balance || 0), 0),
//         feeRecords: studentRecords.map((s) => ({
//           feetype: s.feetype,
//           paidAmount: s.paidAmount || 0,
//           balance: s.balance || 0,
//         })),
//       };
//       setSelectedStudent(aggregatedStudent);
//       setFeeTypeRefundAmounts(
//         studentRecords.reduce((acc, s) => ({
//           ...acc,
//           [s.feetype]: '',
//         }), {})
//       );
//     } else {
//       setSelectedStudent(null);
//       setFeeTypeRefundAmounts({});
//     }
//     setRefundAmount('');
//     setRefundAmountError('');
//     setShowPaymentFields(false);
//     setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
//   };

//   const handleFeeTypeRefundChange = (feetype, value) => {
//     const parsedValue = value.trim() === '' ? '' : parseFloat(value);
//     if (parsedValue !== '' && (isNaN(parsedValue) || parsedValue < 0)) {
//       setRefundAmountError('Please enter a valid refund amount greater than or equal to 0.');
//       return;
//     }

//     setFeeTypeRefundAmounts((prev) => ({
//       ...prev,
//       [feetype]: parsedValue === '' ? '' : parsedValue.toString(),
//     }));

//     const updatedFeeTypeRefundAmounts = {
//       ...feeTypeRefundAmounts,
//       [feetype]: parsedValue === '' ? '' : parsedValue.toString(),
//     };
//     const totalFeeTypeRefund = Object.values(updatedFeeTypeRefundAmounts)
//       .reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

//     setRefundAmount(totalFeeTypeRefund > 0 ? totalFeeTypeRefund.toString() : '');

//     if (selectedStudent) {
//       const invalidFeeType = selectedStudent.feeRecords.find(
//         (record) => {
//           const amount = parseFloat(updatedFeeTypeRefundAmounts[record.feetype] || 0);
//           return amount > 0 && amount > (record.balance || 0);
//         }
//       );

//       if (totalFeeTypeRefund > selectedStudent.balance) {
//         setRefundAmountError(`Total refund amount cannot exceed total balance (${selectedStudent.balance}).`);
//       } else if (invalidFeeType) {
//         setRefundAmountError(
//           `Refund amount for ${getFeeTypeName(invalidFeeType.feetype)} exceeds its balance (${invalidFeeType.balance}).`
//         );
//       } else if (totalFeeTypeRefund <= 0) {
//         setRefundAmountError('Total refund amount must be greater than 0.');
//       } else {
//         setRefundAmountError('');
//       }
//     } else {
//       setRefundAmountError('');
//     }
//   };

//   const handleRefundAmountChange = (e) => {
//     const value = e.target.value.trim();
//     const parsedValue = value === '' ? '' : parseFloat(value);
//     setRefundAmount(value);

//     if (selectedStudent && value) {
//       if (isNaN(parsedValue) || parsedValue <= 0) {
//         setRefundAmountError('Please enter a valid refund amount greater than 0.');
//       } else if (parsedValue > selectedStudent.balance) {
//         setRefundAmountError(`Refund amount cannot exceed balance (${selectedStudent.balance}).`);
//       } else {
//         setRefundAmountError('');
//       }
//     } else {
//       setRefundAmountError('');
//     }
//     setShowPaymentFields(false);
//     setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
//   };

//   const handleAcademicYearChange = (e) => {
//     const year = e.target.value;
//     setSelectedAcademicYear(year);
//     setSelectedRegistration('');
//     setSelectedAdmission('');
//     setSelectedStudent(null);
//     setRefundAmount('');
//     setRefundAmountError('');
//     setFeeTypeRefundAmounts({});
//     setShowPaymentFields(false);
//     setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
//   };

//   const handleFormDataChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProceed = () => {
//     setLoadingProceed(true);
//     setTimeout(() => {
//       if (!selectedStudent) {
//         toast.error('Please select a valid student.');
//         setLoadingProceed(false);
//         return;
//       }

//       const totalRefund = selectedRefundType === 'School Fees'
//         ? Object.values(feeTypeRefundAmounts).reduce(
//           (sum, val) => sum + (parseFloat(val) || 0),
//           0
//         )
//         : parseFloat(refundAmount);

//       if (selectedRefundType === 'School Fees') {
//         const invalidFeeType = selectedStudent.feeRecords.find(
//           (record) => {
//             const amount = parseFloat(feeTypeRefundAmounts[record.feetype] || 0);
//             return amount > 0 && amount > (record.balance || 0);
//           }
//         );

//         if (invalidFeeType) {
//           setRefundAmountError(
//             `Refund amount for ${getFeeTypeName(invalidFeeType.feetype)} exceeds its balance (${invalidFeeType.balance}).`
//           );
//           toast.error(
//             `Refund amount for ${getFeeTypeName(invalidFeeType.feetype)} exceeds its balance (${invalidFeeType.balance}).`
//           );
//           setLoadingProceed(false);
//           return;
//         }

//         if (totalRefund <= 0) {
//           setRefundAmountError('Total refund amount must be greater than 0.');
//           toast.error('Total refund amount must be greater than 0.');
//           setLoadingProceed(false);
//           return;
//         }
//       }

//       if (
//         totalRefund > 0 &&
//         totalRefund <= selectedStudent.balance &&
//         !refundAmountError
//       ) {
//         setShowPaymentFields(true);
//       } else {
//         toast.error('Please enter a valid refund amount within the balance.');
//       }
//       setLoadingProceed(false);
//     }, 500);
//   };

//   const refundTypeToFeeType = {
//     'Registration Fees': 'Registration Fees',
//     'Admission Fees': 'Admission Fees',
//     'School Fees': 'School Fees',
//     'Board Registration Fees': 'Board Registration Fees',
//     'Board Exam Fees': 'Board Exam Fees',
//   };

//   const filteredStudents = selectedAcademicYear && selectedRefundType
//     ? feeData.filter(
//       (student) =>
//         student.academicYear === selectedAcademicYear &&
//         student.feeType.trim() === refundTypeToFeeType[selectedRefundType].trim()
//     )
//     : feeData;

//   const getSchoolFeesSummary = () => {
//     if (!selectedStudent || selectedRefundType !== 'School Fees') return [];

//     const schoolFees = filteredStudents.filter(
//       (fee) =>
//         fee.feeType.trim() === 'School Fees' &&
//         fee.admissionNumber === selectedStudent.admissionNumber
//     );

//     const summary = schoolFees.map((fee) => ({
//       feeTypeId: fee.feetype,
//       feeTypeName: getFeeTypeName(fee.feetype),
//       paidAmount: fee.paidAmount || 0,
//       balance: fee.balance || 0,
//       refundAmount: feeTypeRefundAmounts[fee.feetype] || '',
//     }));

//     const total = summary.reduce(
//       (acc, curr) => ({
//         paidAmount: acc.paidAmount + curr.paidAmount,
//         balance: acc.balance + curr.balance,
//         refundAmount: acc.refundAmount + (parseFloat(curr.refundAmount) || 0),
//       }),
//       { paidAmount: 0, balance: 0, refundAmount: 0 }
//     );

//     return [...summary, { feeTypeName: 'Total', paidAmount: total.paidAmount, balance: total.balance, refundAmount: total.refundAmount }];
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoadingSubmit(true);

//     try {
//       if (!selectedStudent || !refundAmount || !formData.paymentMode || refundAmountError) {
//         toast.error('Please complete all required fields and ensure refund amount is valid.');
//         setLoadingSubmit(false);
//         return;
//       }

//       if (formData.paymentMode === 'Cheque' && (!formData.chequeNumber || !formData.bankName)) {
//         toast.error('Please enter cheque number and bank name.');
//         setLoadingSubmit(false);
//         return;
//       }

//       const refundData = {
//         schoolId,
//         academicYear: selectedAcademicYear,
//         refundType: selectedRefundType,
//         registrationNumber: selectedRefundType === 'Registration Fees' ? selectedRegistration : null,
//         admissionNumber: selectedRefundType !== 'Registration Fees' ? selectedAdmission : null,
//         firstName: selectedStudent.firstName,
//         lastName: selectedStudent.lastName,
//         classId: selectedStudent.classId,
//         sectionId: selectedRefundType !== 'Registration Fees' ? selectedStudent.sectionId : null,
//         paidAmount: selectedStudent.paidAmount || 0,
//         refundAmount: parseFloat(refundAmount),
//         balance: selectedStudent.paidAmount - parseFloat(refundAmount),
//         paymentMode: formData.paymentMode,
//         chequeNumber: formData.paymentMode === 'Cheque' ? formData.chequeNumber : null,
//         bankName: formData.paymentMode === 'Cheque' ? formData.bankName : null,
//         feeTypeRefunds: selectedRefundType === 'School Fees'
//           ? Object.entries(feeTypeRefundAmounts)
//               .filter(([_, amount]) => parseFloat(amount) > 0)
//               .map(([feetype, amount]) => {
//                 const feeRecord = selectedStudent.feeRecords.find(
//                   (record) => record.feetype === feetype
//                 );
//                 return {
//                   feetype,
//                   refundAmount: parseFloat(amount),
//                   paidAmount: feeRecord.paidAmount || 0,
//                   balance: (feeRecord.balance || 0) - parseFloat(amount),
//                 };
//               })
//           : [],
//       };

//       const response = await postAPI('/create-refund', refundData);

//       if (response.data.hasError) {
//         toast.error(response.data.message);
//       } else {
//         toast.success('Refund request submitted successfully!');

//         const feeTypeRefundsWithNames = selectedRefundType === 'School Fees'
//           ? Object.entries(feeTypeRefundAmounts)
//               .filter(([_, amount]) => parseFloat(amount) > 0)
//               .map(([feetype, amount]) => {
//                 const feeRecord = selectedStudent.feeRecords.find(
//                   (record) => record.feetype === feetype
//                 );
//                 return {
//                   feetype,
//                   feeTypeName: getFeeTypeName(feetype),
//                   refundAmount: parseFloat(amount),
//                   paidAmount: feeRecord.paidAmount || 0,
//                   balance: (feeRecord.balance || 0) - parseFloat(amount),
//                 };
//               })
//           : [];

//         navigate('/school-dashboard/fees-module/fees-receipts/fees-refund/refund-receipt', {
//           state: {
//             refund: {
//               ...refundData,
//               receiptNumber: response.data.data.receiptNumber,
//               refundDate: response.data.data.refundDate || new Date().toISOString(),
//               transactionNumber: response.data.data.transactionNumber || null,
//               feeTypeRefunds: feeTypeRefundsWithNames,
//             },
//             className: getClassName(selectedStudent.classId),
//             sectionName: getSectionName(selectedStudent.sectionId),
//             refundTypeName: selectedRefundType,
//           },
//         });

//         setSelectedRefundType('');
//         setSelectedRegistration('');
//         setSelectedAdmission('');
//         setSelectedStudent(null);
//         setRefundAmount('');
//         setRefundAmountError('');
//         setFeeTypeRefundAmounts({});
//         setShowPaymentFields(false);
//         setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
//       }
//     } catch (error) {
//       console.error('Error submitting refund request:', error);
//       toast.error('Failed to submit refund request.');
//     } finally {
//       setLoadingSubmit(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2 d-flex justify-content-between align-items-center">
//                   <h4 className="card-title custom-heading-font">Refund Request Form</h4>
//                   <div className="col-md-2">
//                     <select
//                       id="academicYear"
//                       name="academicYear"
//                       className="form-control"
//                       value={selectedAcademicYear}
//                       onChange={handleAcademicYearChange}
//                       required
//                       disabled={loadingYears}
//                     >
//                       <option value="">Select Academic Year</option>
//                       {academicYears.map((year) => (
//                         <option key={year} value={year}>
//                           {year}
//                         </option>
//                       ))}
//                     </select>
//                     {loadingYears && <p>Loading academic years...</p>}
//                   </div>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <label htmlFor="refundType" className="form-label">Select Refund Type</label>
//                     <select
//                       id="refundType"
//                       name="refundType"
//                       className="form-control"
//                       value={selectedRefundType}
//                       onChange={handleRefundTypeChange}
//                       required
//                     >
//                       <option value="">Select Refund Type</option>
//                       {[
//                         'Registration Fees',
//                         'Admission Fees',
//                         'School Fees',
//                         'Board Registration Fees',
//                         'Board Exam Fees',
//                       ].map((type) => (
//                         <option key={type} value={type}>
//                           {type}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {selectedRefundType === 'Registration Fees' && (
//                     <div className="col-md-4">
//                       <label htmlFor="registrationNumber" className="form-label">Registration Number</label>
//                       <input
//                         type="text"
//                         id="registrationNumber"
//                         name="registrationNumber"
//                         className="form-control"
//                         list="registrationNumbers"
//                         value={selectedRegistration}
//                         onChange={handleRegistrationChange}
//                         placeholder="Search or select registration number"
//                         disabled={loadingFees}
//                         required
//                       />
//                       <datalist id="registrationNumbers">
//                         {filteredStudents
//                           .filter((student) => student.registrationNumber)
//                           .map((student, index) => (
//                             <option key={index} value={student.registrationNumber}>
//                               {student.registrationNumber} - {student.firstName} {student.lastName}
//                             </option>
//                           ))}
//                       </datalist>
//                       {loadingFees && <p>Loading fee data...</p>}
//                     </div>
//                   )}

//                   {selectedRefundType && selectedRefundType !== 'Registration Fees' && (
//                     <div className="col-md-4">
//                       <label htmlFor="admissionNumber" className="form-label">Admission Number</label>
//                       <input
//                         type="text"
//                         id="admissionNumber"
//                         name="admissionNumber"
//                         className="form-control"
//                         list="admissionNumbers"
//                         value={selectedAdmission}
//                         onChange={handleAdmissionChange}
//                         placeholder="Search or select admission number"
//                         disabled={loadingFees}
//                         required
//                       />
//                       <datalist id="admissionNumbers">
//                         {[...new Set(filteredStudents
//                           .filter((student) => student.admissionNumber)
//                           .map((student) => student.admissionNumber))]
//                           .map((admissionNumber, index) => {
//                             const student = filteredStudents.find((s) => s.admissionNumber === admissionNumber);
//                             return (
//                               <option key={index} value={admissionNumber}>
//                                 {admissionNumber} - {student.firstName} {student.lastName}
//                               </option>
//                             );
//                           })}
//                       </datalist>
//                       {loadingFees && <p>Loading fee data...</p>}
//                     </div>
//                   )}
//                 </div>

//                 {selectedStudent ? (
//                   <div className="row mb-3">
//                     {selectedRefundType === 'Registration Fees' ? (
//                       <div className="col-md-3">
//                         <label className="form-label">Registration No.</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={selectedStudent.registrationNumber || 'N/A'}
//                           disabled
//                         />
//                       </div>
//                     ) : (
//                       <div className="col-md-3">
//                         <label className="form-label">Admission No.</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={selectedStudent.admissionNumber || 'N/A'}
//                           disabled
//                         />
//                       </div>
//                     )}
//                     <div className="col-md-3">
//                       <label className="form-label">Student Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={`${selectedStudent.firstName || ''} ${selectedStudent.lastName || ''}`}
//                         disabled
//                       />
//                     </div>
//                     <div className="col-md-3">
//                       <label className="form-label">Class</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={getClassName(selectedStudent.classId)}
//                         disabled
//                       />
//                     </div>
//                     {selectedRefundType !== 'Registration Fees' && (
//                       <div className="col-md-3">
//                         <label className="form-label">Section</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           value={getSectionName(selectedStudent.sectionId)}
//                           disabled
//                         />
//                       </div>
//                     )}
//                   </div>
//                 ) : selectedRefundType && (selectedRegistration || selectedAdmission) ? (
//                   <div className="row mb-3">
//                     <div className="col-md-12">
//                       <p className="text-danger">Student not found. Please select a valid number.</p>
//                     </div>
//                   </div>
//                 ) : null}

//                 {selectedStudent && selectedRefundType === 'School Fees' && (
//                   <div className="row mb-3">
//                     <div className="col-md-12">
//                       <table className="table table-bordered">
//                         <thead>
//                           <tr>
//                             <th>Fee Type</th>
//                             <th>Paid Amount</th>
//                             <th>Balance</th>
//                             <th>Refund Amount</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {getSchoolFeesSummary().map((item, index) => (
//                             <tr key={index}>
//                               <td>{item.feeTypeName}</td>
//                               <td>{item.paidAmount}</td>
//                               <td>{item.balance}</td>
//                               <td>
//                                 {item.feeTypeName === 'Total' ? (
//                                   item.refundAmount
//                                 ) : item.balance === 0 ? (
//                                   <span className="text-success">All amount is refunded</span>
//                                 ) : (
//                                   <div className="position-relative">
//                                     <input
//                                       className={`form-control ${refundAmountError && item.feeTypeId ? 'is-invalid' : ''}`}
//                                       value={feeTypeRefundAmounts[item.feeTypeId] || ''}
//                                       onChange={(e) => handleFeeTypeRefundChange(item.feeTypeId, e.target.value)}
//                                       placeholder="Enter refund amount"
//                                       min="0"
//                                       max={item.balance}
//                                     />
//                                     {refundAmountError && item.feeTypeId && (
//                                       <div className="invalid-feedback">
//                                         {refundAmountError}
//                                       </div>
//                                     )}
//                                   </div>
//                                 )}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}

//                 {selectedStudent && selectedRefundType !== 'School Fees' && (
//                   <div className="row mb-3">
//                     <div className="col-md-4">
//                       <label htmlFor="paidAmount" className="form-label">Paid Amount</label>
//                       <input
//                         type="number"
//                         id="paidAmount"
//                         name="paidAmount"
//                         className="form-control"
//                         value={selectedStudent.paidAmount || 0}
//                         disabled
//                       />
//                     </div>
//                     <div className="col-md-4">
//                       <label htmlFor="balance" className="form-label">Balance</label>
//                       <input
//                         type="number"
//                         id="balance"
//                         name="balance"
//                         className="form-control"
//                         value={selectedStudent.balance || 0}
//                         disabled
//                       />
//                     </div>
//                     <div className="col-md-4">
//                       <label htmlFor="refundAmountInput" className="form-label">Refund Amount</label>
//                       <input
//                         id="refundAmountInput"
//                         name="refundAmountInput"
//                         className={`form-control ${refundAmountError ? 'is-invalid' : ''}`}
//                         value={refundAmount}
//                         onChange={handleRefundAmountChange}
//                         placeholder="Enter refund amount"
//                         min="0"
//                         max={selectedStudent.balance}
//                       />
//                       {refundAmountError && (
//                         <div className="invalid-feedback">
//                           {refundAmountError}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {showPaymentFields && (
//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="paymentMode" className="form-label">
//                           Payment Option <span className="text-danger">*</span>
//                         </label>
//                         <select
//                           id="paymentMode"
//                           name="paymentMode"
//                           className="form-control"
//                           value={formData.paymentMode}
//                           onChange={handleFormDataChange}
//                           required
//                         >
//                           <option value="">Select</option>
//                           <option value="Cash">Cash</option>
//                           <option value="Cheque">Cheque</option>
//                           <option value="Online">Online</option>
//                         </select>
//                       </div>
//                     </div>

//                     {formData.paymentMode === 'Cheque' && (
//                       <>
//                         <div className="col-md-6">
//                           <div className="mb-3">
//                             <label htmlFor="chequeNumber" className="form-label">
//                               Cheque Number <span className="text-danger">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               id="chequeNumber"
//                               name="chequeNumber"
//                               className="form-control"
//                               value={formData.chequeNumber}
//                               onChange={handleFormDataChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className="mb-3">
//                             <label htmlFor="bankName" className="form-label">
//                               Bank Name <span className="text-danger">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               id="bankName"
//                               name="bankName"
//                               className="form-control"
//                               value={formData.bankName}
//                               onChange={handleFormDataChange}
//                               required
//                             />
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 )}

//                 {selectedRefundType && !showPaymentFields && selectedStudent && selectedStudent.balance > 0 && (
//                   <div className="mt-3 d-flex justify-content-end">
//                     <button
//                       type="button"
//                       className="btn btn-primary custom-heading-font"
//                       onClick={handleProceed}
//                       disabled={
//                         loadingProceed ||
//                         !refundAmount ||
//                         parseFloat(refundAmount) <= 0 ||
//                         refundAmountError
//                       }
//                     >
//                       {loadingProceed ? 'Processing...' : 'Proceed'}
//                     </button>
//                   </div>
//                 )}

//                 {showPaymentFields && (
//                   <div className="mt-3 d-flex justify-content-end">
//                     <button
//                       type="submit"
//                       className="btn btn-primary custom-heading-font"
//                       disabled={
//                         loadingSubmit ||
//                         !formData.paymentMode ||
//                         (formData.paymentMode === 'Cheque' && (!formData.chequeNumber || !formData.bankName))
//                       }
//                     >
//                       {loadingSubmit ? 'Processing...' : 'Submit'}
//                     </button>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateFeesRefund;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import { toast } from 'react-toastify';

const CreateFeesRefund = () => {
  const navigate = useNavigate();
  const [selectedRefundType, setSelectedRefundType] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [refundAmountError, setRefundAmountError] = useState('');
  const [errorFeeType, setErrorFeeType] = useState(null); // Track the specific fee type with error
  const [feeTypeRefundAmounts, setFeeTypeRefundAmounts] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [academicYears, setAcademicYears] = useState([]);
  const [schoolId, setSchoolId] = useState('');
  const [loadingYears, setLoadingYears] = useState(false);
  const [feeData, setFeeData] = useState([]);
  const [feesTypes, setFeesTypes] = useState([]);
  const [loadingFees, setLoadingFees] = useState(false);
  const [classData, setClassData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [showPaymentFields, setShowPaymentFields] = useState(false);
  const [loadingProceed, setLoadingProceed] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formData, setFormData] = useState({
    paymentMode: '',
    chequeNumber: '',
    bankName: '',
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error('School ID not found. Please log in again.');
      return;
    }
    setSchoolId(id);
  }, []);

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        setLoadingYears(true);
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const schoolId = userDetails?.schoolId;
        if (schoolId) {
          const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
          const years = response.data.data || [];
          setAcademicYears(years.map(item => item.academicYear));

          const storedYear = localStorage.getItem('currentAcademicYear');
          if (storedYear && years.some(item => item.academicYear === storedYear)) {
            setSelectedAcademicYear(storedYear);
          } else if (years.length > 0) {
            setSelectedAcademicYear(years[0].academicYear);
          }
        }
      } catch (err) {
        console.error('Error fetching academic years:', err);
        toast.error('Failed to fetch academic years.');
      } finally {
        setLoadingYears(false);
      }
    };

    fetchAcademicYears();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!schoolId || !selectedAcademicYear) return;

      try {
        setLoadingFees(true);
        const feeResponse = await getAPI(`/get-all-fees/${schoolId}/${selectedAcademicYear}`);
        if (feeResponse.data.hasError) {
          throw new Error(feeResponse.data.message);
        }
        setFeeData(feeResponse.data.data || []);

        const classSectionResponse = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedAcademicYear}`, {}, true);
        const classSectionData = classSectionResponse?.data?.data || [];
        setClassData(classSectionData);

        const allSections = classSectionData.flatMap(cls => cls.sections.map(section => ({
          _id: section._id,
          sectionName: section.name
        })));
        setSectionData(allSections);

        const feesTypeResponse = await getAPI(`/getall-fess-type-year/${schoolId}/year/${selectedAcademicYear}`);
        if (!feesTypeResponse.data.hasError && Array.isArray(feesTypeResponse.data.data)) {
          setFeesTypes(feesTypeResponse.data.data);
        } else {
          toast.error(feesTypeResponse.data.message || 'Error fetching fee types.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Failed to fetch data.');
      } finally {
        setLoadingFees(false);
      }
    };

    fetchData();
  }, [schoolId, selectedAcademicYear]);

  const getClassName = (classId) => {
    const classItem = classData.find((c) => c._id === classId);
    return classItem ? classItem.className : 'N/A';
  };

  const getSectionName = (sectionId) => {
    if (sectionId === 'N/A') return 'N/A';
    const sectionItem = sectionData.find((s) => s._id === sectionId);
    try {
      return sectionItem ? sectionItem.sectionName : 'N/A';
    } catch (err) {
      console.error('Error getting section name:', err);
      return 'N/A';
    }
  };

  const getFeeTypeName = (feeTypeId) => {
    const feeType = feesTypes.find((type) => type._id === feeTypeId);
   return feeType ? feeType.feesTypeName : 'N/A';
  };

  const handleRefundTypeChange = (e) => {
    setSelectedRefundType(e.target.value);
    setSelectedRegistration('');
    setSelectedAdmission('');
    setSelectedStudent(null);
    setRefundAmount('');
    setRefundAmountError('');
    setErrorFeeType(null);
    setFeeTypeRefundAmounts({});
    setShowPaymentFields(false);
    setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
  };

  const handleRegistrationChange = (e) => {
    const value = e.target.value.trim();
    setSelectedRegistration(value);
    const student = filteredStudents.find(
      (s) => s.registrationNumber?.toString().toLowerCase() === value.toLowerCase()
    );
    setSelectedStudent(student || null);
    setRefundAmount('');
    setRefundAmountError('');
    setErrorFeeType(null);
    setFeeTypeRefundAmounts({});
    setShowPaymentFields(false);
    setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
  };

  const handleAdmissionChange = (e) => {
    const value = e.target.value.trim();
    setSelectedAdmission(value);
    const studentRecords = filteredStudents.filter(
      (s) => s.admissionNumber?.toString().toLowerCase() === value.toLowerCase()
    );

    if (studentRecords.length > 0) {
      const aggregatedStudent = {
        admissionNumber: studentRecords[0].admissionNumber,
        firstName: studentRecords[0].firstName,
        lastName: studentRecords[0].lastName,
        classId: studentRecords[0].classId,
        sectionId: studentRecords[0].sectionId,
        paidAmount: studentRecords.reduce((sum, s) => sum + (s.paidAmount || 0), 0),
        balance: studentRecords.reduce((sum, s) => sum + (s.balance || 0), 0),
        feeRecords: studentRecords.map((s) => ({
          feetype: s.feetype,
          paidAmount: s.paidAmount || 0,
          balance: s.balance || 0,
        })),
      };
      setSelectedStudent(aggregatedStudent);
      setFeeTypeRefundAmounts(
        studentRecords.reduce((acc, s) => ({
          ...acc,
          [s.feetype]: '',
        }), {})
      );
    } else {
      setSelectedStudent(null);
      setFeeTypeRefundAmounts({});
    }
    setRefundAmount('');
    setRefundAmountError('');
    setErrorFeeType(null);
    setShowPaymentFields(false);
    setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
  };

  const handleFeeTypeRefundChange = (feetype, value) => {
    const parsedValue = value.trim() === '' ? '' : parseFloat(value);
    if (parsedValue !== '' && (isNaN(parsedValue) || parsedValue < 0)) {
      setRefundAmountError('Please enter a valid refund amount greater than or equal to 0.');
      setErrorFeeType(feetype);
      return;
    }

    setFeeTypeRefundAmounts((prev) => ({
      ...prev,
      [feetype]: parsedValue === '' ? '' : parsedValue.toString(),
    }));

    const updatedFeeTypeRefundAmounts = {
      ...feeTypeRefundAmounts,
      [feetype]: parsedValue === '' ? '' : parsedValue.toString(),
    };
    const totalFeeTypeRefund = Object.values(updatedFeeTypeRefundAmounts)
      .reduce((sum, val) => sum + (parseFloat(val) || 0), 0);

    setRefundAmount(totalFeeTypeRefund > 0 ? totalFeeTypeRefund.toString() : '');

    if (selectedStudent) {
      const invalidFeeType = selectedStudent.feeRecords.find(
        (record) => {
          const amount = parseFloat(updatedFeeTypeRefundAmounts[record.feetype] || 0);
          return amount > 0 && amount > (record.balance || 0);
        }
      );

      if (totalFeeTypeRefund > selectedStudent.balance) {
        setRefundAmountError(`Total refund amount cannot exceed total balance (${selectedStudent.balance}).`);
        setErrorFeeType(feetype); // Set error for the current fee type being edited
      } else if (invalidFeeType) {
        setRefundAmountError(
          `Refund amount for ${getFeeTypeName(invalidFeeType.feetype)} exceeds its balance (${invalidFeeType.balance}).`
        );
        setErrorFeeType(invalidFeeType.feetype); // Set error for the specific invalid fee type
      } else if (totalFeeTypeRefund <= 0) {
        setRefundAmountError('Total refund amount must be greater than 0.');
        setErrorFeeType(feetype); // Set error for the current fee type being edited
      } else {
        setRefundAmountError('');
        setErrorFeeType(null);
      }
    } else {
      setRefundAmountError('');
      setErrorFeeType(null);
    }
  };

  const handleRefundAmountChange = (e) => {
    const value = e.target.value.trim();
    const parsedValue = value === '' ? '' : parseFloat(value);
    setRefundAmount(value);

    if (selectedStudent && value) {
      if (isNaN(parsedValue) || parsedValue <= 0) {
        setRefundAmountError('Please enter a valid refund amount greater than 0.');
      } else if (parsedValue > selectedStudent.balance) {
        setRefundAmountError(`Refund amount cannot exceed balance (${selectedStudent.balance}).`);
      } else {
        setRefundAmountError('');
      }
    } else {
      setRefundAmountError('');
    }
    setErrorFeeType(null);
    setShowPaymentFields(false);
    setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
  };

  const handleAcademicYearChange = (e) => {
    const year = e.target.value;
    setSelectedAcademicYear(year);
    setSelectedRegistration('');
    setSelectedAdmission('');
    setSelectedStudent(null);
    setRefundAmount('');
    setRefundAmountError('');
    setErrorFeeType(null);
    setFeeTypeRefundAmounts({});
    setShowPaymentFields(false);
    setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceed = () => {
    setLoadingProceed(true);
    setTimeout(() => {
      if (!selectedStudent) {
        toast.error('Please select a valid student.');
        setLoadingProceed(false);
        return;
      }

      const totalRefund = selectedRefundType === 'School Fees'
        ? Object.values(feeTypeRefundAmounts).reduce(
            (sum, val) => sum + (parseFloat(val) || 0),
            0
          )
        : parseFloat(refundAmount);

      if (selectedRefundType === 'School Fees') {
        const invalidFeeType = selectedStudent.feeRecords.find(
          (record) => {
            const amount = parseFloat(feeTypeRefundAmounts[record.feetype] || 0);
            return amount > 0 && amount > (record.balance || 0);
          }
        );

        if (invalidFeeType) {
          setRefundAmountError(
            `Refund amount for ${getFeeTypeName(invalidFeeType.feetype)} exceeds its balance (${invalidFeeType.balance}).`
          );
          setErrorFeeType(invalidFeeType.feetype);
          toast.error(
            `Refund amount for ${getFeeTypeName(invalidFeeType.feetype)} exceeds its balance (${invalidFeeType.balance}).`
          );
          setLoadingProceed(false);
          return;
        }

        if (totalRefund <= 0) {
          setRefundAmountError('Total refund amount must be greater than 0.');
          setErrorFeeType(Object.keys(feeTypeRefundAmounts)[0] || null); // Set error for first fee type
          toast.error('Total refund amount must be greater than 0.');
          setLoadingProceed(false);
          return;
        }
      }

      if (
        totalRefund > 0 &&
        totalRefund <= selectedStudent.balance &&
        !refundAmountError
      ) {
        setShowPaymentFields(true);
      } else {
        toast.error('Please enter a valid refund amount within the balance.');
      }
      setLoadingProceed(false);
    }, 500);
  };

  const refundTypeToFeeType = {
    'Registration Fees': 'Registration Fees',
    'Admission Fees': 'Admission Fees',
    'School Fees': 'School Fees',
    'Board Registration Fees': 'Board Registration Fees',
    'Board Exam Fees': 'Board Exam Fees',
  };

  const filteredStudents = selectedAcademicYear && selectedRefundType
    ? feeData.filter(
        (student) =>
          student.academicYear === selectedAcademicYear &&
          student.feeType.trim() === refundTypeToFeeType[selectedRefundType].trim()
      )
    : feeData;

  const getSchoolFeesSummary = () => {
    if (!selectedStudent || selectedRefundType !== 'School Fees') return [];

    const schoolFees = filteredStudents.filter(
      (fee) =>
        fee.feeType.trim() === 'School Fees' &&
        fee.admissionNumber === selectedStudent.admissionNumber
    );

    const summary = schoolFees.map((fee) => ({
      feeTypeId: fee.feetype,
      feeTypeName: getFeeTypeName(fee.feetype),
      paidAmount: fee.paidAmount || 0,
      balance: fee.balance || 0,
      refundAmount: feeTypeRefundAmounts[fee.feetype] || '',
    }));

    const total = summary.reduce(
      (acc, curr) => ({
        paidAmount: acc.paidAmount + curr.paidAmount,
        balance: acc.balance + curr.balance,
        refundAmount: acc.refundAmount + (parseFloat(curr.refundAmount) || 0),
      }),
      { paidAmount: 0, balance: 0, refundAmount: 0 }
    );

    return [...summary, { feeTypeName: 'Total', paidAmount: total.paidAmount, balance: total.balance, refundAmount: total.refundAmount }];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      if (!selectedStudent || !refundAmount || !formData.paymentMode || refundAmountError) {
        toast.error('Please complete all required fields and ensure refund amount is valid.');
        setLoadingSubmit(false);
        return;
      }

      if (formData.paymentMode === 'Cheque' && (!formData.chequeNumber || !formData.bankName)) {
        toast.error('Please enter cheque number and bank name.');
        setLoadingSubmit(false);
        return;
      }

      const refundData = {
        schoolId,
        academicYear: selectedAcademicYear,
        refundType: selectedRefundType,
        registrationNumber: selectedRefundType === 'Registration Fees' ? selectedRegistration : null,
        admissionNumber: selectedRefundType !== 'Registration Fees' ? selectedAdmission : null,
        firstName: selectedStudent.firstName,
        lastName: selectedStudent.lastName,
        classId: selectedStudent.classId,
        sectionId: selectedRefundType !== 'Registration Fees' ? selectedStudent.sectionId : null,
        paidAmount: selectedStudent.paidAmount || 0,
        refundAmount: parseFloat(refundAmount),
        balance: selectedStudent.paidAmount - parseFloat(refundAmount),
        paymentMode: formData.paymentMode,
        chequeNumber: formData.paymentMode === 'Cheque' ? formData.chequeNumber : null,
        bankName: formData.paymentMode === 'Cheque' ? formData.bankName : null,
        feeTypeRefunds: selectedRefundType === 'School Fees'
          ? Object.entries(feeTypeRefundAmounts)
              .filter(([_, amount]) => parseFloat(amount) > 0)
              .map(([feetype, amount]) => {
                const feeRecord = selectedStudent.feeRecords.find(
                  (record) => record.feetype === feetype
                );
                return {
                  feetype,
                  refundAmount: parseFloat(amount),
                  paidAmount: feeRecord.paidAmount || 0,
                  balance: (feeRecord.balance || 0) - parseFloat(amount),
                };
              })
          : [],
      };

      const response = await postAPI('/create-refund', refundData);

      if (response.data.hasError) {
        toast.error(response.data.message);
      } else {
        toast.success('Refund request submitted successfully!');

        const feeTypeRefundsWithNames = selectedRefundType === 'School Fees'
          ? Object.entries(feeTypeRefundAmounts)
              .filter(([_, amount]) => parseFloat(amount) > 0)
              .map(([feetype, amount]) => {
                const feeRecord = selectedStudent.feeRecords.find(
                  (record) => record.feetype === feetype
                );
                return {
                  feetype,
                  feeTypeName: getFeeTypeName(feetype),
                  refundAmount: parseFloat(amount),
                  paidAmount: feeRecord.paidAmount || 0,
                  balance: (feeRecord.balance || 0) - parseFloat(amount),
                };
              })
          : [];

        navigate('/school-dashboard/fees-module/fees-receipts/fees-refund/refund-receipt', {
          state: {
            refund: {
              ...refundData,
              receiptNumber: response.data.data.receiptNumber,
              refundDate: response.data.data.refundDate || new Date().toISOString(),
              transactionNumber: response.data.data.transactionNumber || null,
              feeTypeRefunds: feeTypeRefundsWithNames,
            },
            className: getClassName(selectedStudent.classId),
            sectionName: getSectionName(selectedStudent.sectionId),
            refundTypeName: selectedRefundType,
          },
        });

        setSelectedRefundType('');
        setSelectedRegistration('');
        setSelectedAdmission('');
        setSelectedStudent(null);
        setRefundAmount('');
        setRefundAmountError('');
        setErrorFeeType(null);
        setFeeTypeRefundAmounts({});
        setShowPaymentFields(false);
        setFormData({ paymentMode: '', chequeNumber: '', bankName: '' });
      }
    } catch (error) {
      console.error('Error submitting refund request:', error);
      toast.error('Failed to submit refund request.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex justify-content-between align-items-center">
                  <h4 className="card-title custom-heading-font">Refund Request Form</h4>
                  <div className="col-md-2">
                    <select
                      id="academicYear"
                      name="academicYear"
                      className="form-control"
                      value={selectedAcademicYear}
                      onChange={handleAcademicYearChange}
                      required
                      disabled={loadingYears}
                    >
                      <option value="">Select Academic Year</option>
                      {academicYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {loadingYears && <p>Loading academic years...</p>}
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="refundType" className="form-label">Select Refund Type</label>
                    <select
                      id="refundType"
                      name="refundType"
                      className="form-control"
                      value={selectedRefundType}
                      onChange={handleRefundTypeChange}
                      required
                    >
                      <option value="">Select Refund Type</option>
                      {[
                        'Registration Fees',
                        'Admission Fees',
                        'School Fees',
                        'Board Registration Fees',
                        'Board Exam Fees',
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedRefundType === 'Registration Fees' && (
                    <div className="col-md-4">
                      <label htmlFor="registrationNumber" className="form-label">Registration Number</label>
                      <input
                        type="text"
                        id="registrationNumber"
                        name="registrationNumber"
                        className="form-control"
                        list="registrationNumbers"
                        value={selectedRegistration}
                        onChange={handleRegistrationChange}
                        placeholder="Search or select registration number"
                        disabled={loadingFees}
                        required
                      />
                      <datalist id="registrationNumbers">
                        {filteredStudents
                          .filter((student) => student.registrationNumber)
                          .map((student, index) => (
                            <option key={index} value={student.registrationNumber}>
                              {student.registrationNumber} - {student.firstName} {student.lastName}
                            </option>
                          ))}
                      </datalist>
                      {loadingFees && <p>Loading fee data...</p>}
                    </div>
                  )}

                  {selectedRefundType && selectedRefundType !== 'Registration Fees' && (
                    <div className="col-md-4">
                      <label htmlFor="admissionNumber" className="form-label">Admission Number</label>
                      <input
                        type="text"
                        id="admissionNumber"
                        name="admissionNumber"
                        className="form-control"
                        list="admissionNumbers"
                        value={selectedAdmission}
                        onChange={handleAdmissionChange}
                        placeholder="Search or select admission number"
                        disabled={loadingFees}
                        required
                      />
                      <datalist id="admissionNumbers">
                        {[...new Set(filteredStudents
                          .filter((student) => student.admissionNumber)
                          .map((student) => student.admissionNumber))]
                          .map((admissionNumber, index) => {
                            const student = filteredStudents.find((s) => s.admissionNumber === admissionNumber);
                            return (
                              <option key={index} value={admissionNumber}>
                                {admissionNumber} - {student.firstName} {student.lastName}
                              </option>
                            );
                          })}
                      </datalist>
                      {loadingFees && <p>Loading fee data...</p>}
                    </div>
                  )}
                </div>

                {selectedStudent ? (
                  <div className="row mb-3">
                    {selectedRefundType === 'Registration Fees' ? (
                      <div className="col-md-3">
                        <label className="form-label">Registration No.</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedStudent.registrationNumber || 'N/A'}
                          disabled
                        />
                      </div>
                    ) : (
                      <div className="col-md-3">
                        <label className="form-label">Admission No.</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedStudent.admissionNumber || 'N/A'}
                          disabled
                        />
                      </div>
                    )}
                    <div className="col-md-3">
                      <label className="form-label">Student Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={`${selectedStudent.firstName || ''} ${selectedStudent.lastName || ''}`}
                        disabled
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Class</label>
                      <input
                        type="text"
                        className="form-control"
                        value={getClassName(selectedStudent.classId)}
                        disabled
                      />
                    </div>
                    {selectedRefundType !== 'Registration Fees' && (
                      <div className="col-md-3">
                        <label className="form-label">Section</label>
                        <input
                          type="text"
                          className="form-control"
                          value={getSectionName(selectedStudent.sectionId)}
                          disabled
                        />
                      </div>
                    )}
                  </div>
                ) : selectedRefundType && (selectedRegistration || selectedAdmission) ? (
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <p className="text-danger">Student not found. Please select a valid number.</p>
                    </div>
                  </div>
                ) : null}

                {selectedStudent && selectedRefundType === 'School Fees' && (
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Fee Type</th>
                            <th>Paid Amount</th>
                            <th>Balance</th>
                            <th>Refund Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getSchoolFeesSummary().map((item, index) => (
                            <tr key={index}>
                              <td>{item.feeTypeName}</td>
                              <td>{item.paidAmount}</td>
                              <td>{item.balance}</td>
                              <td>
                                {item.feeTypeName === 'Total' ? (
                                  item.refundAmount
                                ) : item.balance === 0 ? (
                                  <span className="text-success">All amount is refunded</span>
                                ) : (
                                  <div className="position-relative">
                                    <input
                                      className={`form-control ${refundAmountError && item.feeTypeId === errorFeeType ? 'is-invalid' : ''}`}
                                      value={feeTypeRefundAmounts[item.feeTypeId] || ''}
                                      onChange={(e) => handleFeeTypeRefundChange(item.feeTypeId, e.target.value)}
                                      placeholder="Enter refund amount"
                                      min="0"
                                      max={item.balance}
                                    />
                                    {refundAmountError && item.feeTypeId === errorFeeType && (
                                      <div className="invalid-feedback">
                                        {refundAmountError}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {selectedStudent && selectedRefundType !== 'School Fees' && (
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label htmlFor="paidAmount" className="form-label">Paid Amount</label>
                      <input
                        type="number"
                        id="paidAmount"
                        name="paidAmount"
                        className="form-control"
                        value={selectedStudent.paidAmount || 0}
                        disabled
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="balance" className="form-label">Balance</label>
                      <input
                        type="number"
                        id="balance"
                        name="balance"
                        className="form-control"
                        value={selectedStudent.balance || 0}
                        disabled
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="refundAmountInput" className="form-label">Refund Amount</label>
                      <input
                        id="refundAmountInput"
                        name="refundAmountInput"
                        className={`form-control ${refundAmountError ? 'is-invalid' : ''}`}
                        value={refundAmount}
                        onChange={handleRefundAmountChange}
                        placeholder="Enter refund amount"
                        min="0"
                        max={selectedStudent.balance}
                      />
                      {refundAmountError && (
                        <div className="invalid-feedback">
                          {refundAmountError}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {showPaymentFields && (
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="paymentMode" className="form-label">
                          Payment Option <span className="text-danger">*</span>
                        </label>
                        <select
                          id="paymentMode"
                          name="paymentMode"
                          className="form-control"
                          value={formData.paymentMode}
                          onChange={handleFormDataChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Cash">Cash</option>
                          <option value="Cheque">Cheque</option>
                          <option value="Online">Online</option>
                        </select>
                      </div>
                    </div>

                    {formData.paymentMode === 'Cheque' && (
                      <>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="chequeNumber" className="form-label">
                              Cheque Number <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="chequeNumber"
                              name="chequeNumber"
                              className="form-control"
                              value={formData.chequeNumber}
                              onChange={handleFormDataChange}
                              required
                            />
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
                              className="form-control"
                              value={formData.bankName}
                              onChange={handleFormDataChange}
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {selectedRefundType && !showPaymentFields && selectedStudent && selectedStudent.balance > 0 && (
                  <div className="mt-3 d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-primary custom-heading-font"
                      onClick={handleProceed}
                      disabled={
                        loadingProceed ||
                        !refundAmount ||
                        parseFloat(refundAmount) <= 0 ||
                        refundAmountError
                      }
                    >
                      {loadingProceed ? 'Processing...' : 'Proceed'}
                    </button>
                  </div>
                )}

                {showPaymentFields && (
                  <div className="mt-3 d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-heading-font"
                      disabled={
                        loadingSubmit ||
                        !formData.paymentMode ||
                        (formData.paymentMode === 'Cheque' && (!formData.chequeNumber || !formData.bankName))
                      }
                    >
                      {loadingSubmit ? 'Processing...' : 'Submit'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeesRefund;