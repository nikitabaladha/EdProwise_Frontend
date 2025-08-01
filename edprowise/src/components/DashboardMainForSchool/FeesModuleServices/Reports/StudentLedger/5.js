// import React, { useState, useEffect } from 'react';
// import { FaFilter } from 'react-icons/fa';
// import { MdSettings } from 'react-icons/md';
// import CreatableSelect from 'react-select/creatable';
// import getAPI from '../../../../../api/getAPI';
// import { toast } from 'react-toastify';

// const StudentFeeLedger = () => {
//   const [showFilterPanel, setShowFilterPanel] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(null);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [schoolId, setSchoolId] = useState('');
//   const [students, setStudents] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [feeTypes, setFeeTypes] = useState([]);
//   const [feeData, setFeeData] = useState([]);
//   const academicYear = localStorage.getItem('selectedAcademicYear') || '2026-2027';
//   const currentDate = new Date();


//   const toggleFilterPanel = () => {
//     setShowFilterPanel(!showFilterPanel);
//   };


//   const pageShowOptions = [
//     { value: 10, label: '10' },
//     { value: 15, label: '15' },
//     { value: 20, label: '20' },
//     { value: 25, label: '25' },
//     { value: 30, label: '30' },
//   ];


//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId) {
//       toast.error('School ID not found. Please log in again.');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);
//   }, []);


//   useEffect(() => {
//     if (!schoolId) return;

//     const fetchInitialData = async () => {
//       try {
//         const classesRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
//         setClasses(classesRes?.data?.data || []);

//         const feeTypesRes = await getAPI(`/getall-fess-type/${schoolId}`);
//         if (!feeTypesRes.hasError) {
//           setFeeTypes(feeTypesRes.data.data || []);
//         }

//         const studentsRes = await getAPI(`/get-admission-form/${schoolId}`);
//         if (!studentsRes.hasError) {
//           setStudents(studentsRes.data.data || []);
//         }
//       } catch (error) {
//         console.error('Error initializing data:', error);
//         toast.error('Error initializing data');
//       }
//     };

//     fetchInitialData();
//   }, [schoolId]);


//   useEffect(() => {
//     if (!schoolId || !searchQuery) return;

//     const fetchFeeData = async () => {
//       try {
//         const admissionNumber = searchQuery.value;
//         console.log('Fetching fee data for:', { admissionNumber, schoolId });

//         const student = students.find(s => s.AdmissionNumber === admissionNumber);
//         if (!student) {
//           console.log('Student not found:', admissionNumber);
//           toast.error('Student not found');
//           return;
//         }

//         const academicHistory = student.academicHistory?.[0] || null;
//         if (!academicHistory) {
//           console.log('Academic history not found:', student);
//           toast.error('Academic history not found');
//           return;
//         }

//         const response = await getAPI(
//           `/get-concession-formbyADMID?classId=${academicHistory.masterDefineClass || ''}&sectionIds=${academicHistory.section || ''}&schoolId=${schoolId}&admissionNumber=${admissionNumber}`
//         );
//         console.log('API response:', response);

//         if (!response?.data || !Array.isArray(response.data.data)) {
//           console.log('Invalid response structure:', response);
//           throw new Error('No fee data found');
//         }

//         setFeeData(response.data.data);
//         console.log('Fee data set:', response.data.data);
//       } catch (error) {
//         console.error('Error fetching fee data:', error);
//         toast.error(error.message || 'Failed to fetch fee data');
//         setFeeData([]);
//       }
//     };

//     fetchFeeData();
//   }, [schoolId, searchQuery, students]);


//   const processedStudentData = students.map(student => {
//     const academicHistory = student.academicHistory || [];
//     const transactions = [];


//     const yearHistory = academicHistory.find(h => h.academicYear === academicYear) || {};
//     const classInfo = classes.find(c => c._id === yearHistory?.masterDefineClass) || { className: 'N/A' };
//     const sectionInfo = classInfo?.sections?.find(s => s._id === yearHistory?.section) || { name: 'N/A' };


//     const installmentGroups = {};

//     feeData.forEach(year => {
//       const installmentNameMapping = {};
//       year.installmentsPresent.forEach((name, index) => {
//         installmentNameMapping[index + 1] = name;
//         installmentNameMapping[name] = name;
//       });


//       if (!installmentGroups[year.academicYear]) {
//         installmentGroups[year.academicYear] = {};
//       }


//       const feeAggregates = {};
//       year.feeInstallments.forEach(installment => {
//         if (!installment.feesTypeId?._id) {
//           console.warn('Skipping installment with missing feesTypeId:', installment);
//           return;
//         }

//         const dueDate = new Date(installment.dueDate);
//         const dueMonthStart = new Date(dueDate.getFullYear(), dueDate.getMonth(), 1);
//         if (dueMonthStart > currentDate) return; 

//         const installmentName = installment.installmentName;
//         if (!feeAggregates[installmentName]) {
//           feeAggregates[installmentName] = {
//             totalAmount: 0,
//             totalFine: 0,
//             totalExcess: 0,
//             dueDate: dueDate,
//           };
//         }

//         feeAggregates[installmentName].totalAmount += Number(installment.amount || 0);
//         feeAggregates[installmentName].totalFine += Number(installment.fineAmount || 0);
//       });


//       Object.keys(feeAggregates).forEach(installmentName => {
//         const { totalAmount, totalFine, dueDate } = feeAggregates[installmentName];
//         const formattedDate = dueDate.toLocaleDateString('en-GB', {
//           day: '2-digit',
//           month: '2-digit',
//           year: 'numeric',
//         }).replace(/\//g, '-');

//         if (!installmentGroups[year.academicYear][installmentName]) {
//           installmentGroups[year.academicYear][installmentName] = {
//             transactions: [],
//             balance: 0,
//           };
//         }

//         const group = installmentGroups[year.academicYear][installmentName];


//         if (totalAmount > 0) {
//           group.balance += totalAmount;
//           group.transactions.push({
//             academicYear: year.academicYear,
//             date: formattedDate,
//             particulars: `Fees Due - ${installmentName}`,
//             receiptNo: '',
//             paymentMode: '',
//             debit: totalAmount.toFixed(0),
//             credit: '', 
//             balance: group.balance.toFixed(0),
//             paymentDateRaw: dueDate,
//           });
//         }
//       });


//       const paymentMap = new Map();
//       year.paidInstallments?.forEach(pi => {
//         if (!pi.feesTypeId?._id) {
//           console.warn('Skipping paid installment with missing feesTypeId:', pi);
//           return;
//         }

//         const installmentName = installmentNameMapping[pi.installmentNumber] || pi.installmentNumber;
//         const key = `${installmentName}-${pi.receiptNumber}-${pi.paymentDate}`;

//         if (!paymentMap.has(key)) {
//           const totalPayable = year.feeInstallments
//             .filter(fi => fi.installmentName === installmentName)
//             .reduce((sum, fi) => sum + (Number(fi.amount) || 0) + (Number(fi.fineAmount) || 0), 0);

//           paymentMap.set(key, {
//             installmentName,
//             receiptNumber: pi.receiptNumber,
//             paymentDate: pi.paymentDate,
//             paymentMode: pi.paymentMode,
//             totalPayable: totalPayable || 0,
//             totalPaid: 0,
//             totalFinePaid: 0,
//             totalExcessPaid: 0,
//           });
//         }

//         const payment = paymentMap.get(key);
//         payment.totalPaid += Number(pi.paidAmount || 0);
//         payment.totalFinePaid += Number(pi.paidFine || 0);
//         payment.totalExcessPaid += Number(pi.excessAmount || 0);
//       });


//       paymentMap.forEach(payment => {
//         const installmentName = payment.installmentName;
//         if (!installmentGroups[year.academicYear][installmentName]) {
//           installmentGroups[year.academicYear][installmentName] = {
//             transactions: [],
//             balance: 0,
//           };
//         }

//         const group = installmentGroups[year.academicYear][installmentName];
//         const paymentDate = new Date(payment.paymentDate);
//         const formattedDate = paymentDate.toLocaleDateString('en-GB', {
//           day: '2-digit',
//           month: '2-digit',
//           year: 'numeric',
//         }).replace(/\//g, '-');


//         if (payment.totalFinePaid > 0) {
//           group.balance += Number(payment.totalFinePaid);
//           group.transactions.push({
//             academicYear: year.academicYear,
//             date: formattedDate,
//             particulars: 'Fine',
//             receiptNo: payment.receiptNumber,
//             paymentMode: payment.paymentMode,
//             debit: payment.totalFinePaid.toFixed(0),
//             credit: '', 
//             balance: group.balance.toFixed(0),
//             paymentDateRaw: paymentDate,
//           });
//         }


//         if (payment.totalExcessPaid > 0) {
//           group.balance += Number(payment.totalExcessPaid);
//           group.transactions.push({
//             academicYear: year.academicYear,
//             date: formattedDate,
//             particulars: 'Excess Amount',
//             receiptNo: payment.receiptNumber,
//             paymentMode: payment.paymentMode,
//             debit: payment.totalExcessPaid.toFixed(0),
//             credit: '',
//             balance: group.balance.toFixed(0),
//             paymentDateRaw: paymentDate,
//           });
//         }


//         if (payment.totalPaid > 0 || payment.totalFinePaid > 0 || payment.totalExcessPaid > 0) {
//           const totalCredit = Number(payment.totalPaid) + Number(payment.totalFinePaid) + Number(payment.totalExcessPaid);
//           group.balance -= totalCredit;
//           group.transactions.push({
//             academicYear: year.academicYear,
//             date: formattedDate,
//             particulars: `Fees Received - ${installmentName}`,
//             receiptNo: payment.receiptNumber,
//             paymentMode: payment.paymentMode,
//             debit: '', 
//             credit: totalCredit.toFixed(0),
//             balance: group.balance.toFixed(0),
//             paymentDateRaw: paymentDate,
//           });
//         }
//       });
//     });


//     Object.keys(installmentGroups).forEach(academicYear => {
//       Object.keys(installmentGroups[academicYear])
//         .sort((a, b) => {
//           const dueDateA = feeData
//             .find(y => y.academicYear === academicYear)
//             ?.feeInstallments.find(fi => fi.installmentName === a)?.dueDate;
//           const dueDateB = feeData
//             .find(y => y.academicYear === academicYear)
//             ?.feeInstallments.find(fi => fi.installmentName === b)?.dueDate;
//           return new Date(dueDateA || 0) - new Date(dueDateB || 0);
//         })
//         .forEach(installmentName => {
//           const group = installmentGroups[academicYear][installmentName];
//           group.transactions.sort((a, b) => {
//             const typeOrder = { 'Fees Due': 1, 'Fine': 2, 'Excess Amount': 3, 'Fees Received': 4 };
//             const typeA = a.particulars.includes('Fees Due') ? 'Fees Due' : 
//                          a.particulars.includes('Fine') ? 'Fine' : 
//                          a.particulars.includes('Excess Amount') ? 'Excess Amount' : 'Fees Received';
//             const typeB = b.particulars.includes('Fees Due') ? 'Fees Due' : 
//                          b.particulars.includes('Fine') ? 'Fine' : 
//                          b.particulars.includes('Excess Amount') ? 'Excess Amount' : 'Fees Received';
//             if (typeA !== typeB) return typeOrder[typeA] - typeOrder[typeB];
//             return (a.paymentDateRaw || new Date(0)) - (b.paymentDateRaw || new Date(0));
//           });
//           transactions.push(...group.transactions);
//         });
//     });

//     return {
//       admissionNo: student.AdmissionNumber,
//       studentName: `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'N/A',
//       class: classInfo.className || 'N/A',
//       section: sectionInfo.name || 'N/A',
//       transactions,
//     };
//   });


//   const searchOptions = students.map(student => ({
//     value: student.AdmissionNumber,
//     label: `${student.firstName || ''} ${student.lastName || ''} (${student.AdmissionNumber})`.trim(),
//   }));


//   const filteredStudents = processedStudentData
//     .filter(student => {
//       if (!searchQuery) return false;
//       return (
//         student.admissionNo === searchQuery.value ||
//         student.studentName === searchQuery.label.split(' (')[0]
//       );
//     })
//     .map(student => ({
//       ...student,
//       transactions: student.transactions.filter(transaction => {
//         if (!startDate && !endDate) return true;
//         if (!transaction.paymentDateRaw) return false;
//         const transactionDate = transaction.paymentDateRaw;
//         const start = startDate ? new Date(startDate) : new Date(0);
//         const end = endDate ? new Date(endDate) : new Date();
//         return transactionDate >= start && transactionDate <= end;
//       }),
//     }));

//   const shouldDisplayTable = !!searchQuery;

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12">
//           <div className="card m-2">
//             <div className="card-body">
//               <div className="container">
//                 <div className="row p-1 border border-dark" style={{ background: '#bfbfbf' }}>
//                   <div className="col-md-5 col-12">
//                     <CreatableSelect
//                       isClearable
//                       placeholder="Search by Name or Admission No."
//                       options={searchOptions}
//                       value={searchQuery}
//                       onChange={setSearchQuery}
//                       className="border border-dark"
//                     />
//                   </div>
//                   <div className="col-md-2"></div>
//                   <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
//                     <CreatableSelect
//                       isClearable
//                       placeholder="Show"
//                       options={pageShowOptions}
//                       onChange={option => setRowsPerPage(option ? option.value : 10)}
//                       className="email-select border border-dark me-lg-2"
//                     />
//                     <div
//                       className="py-1 px-2 mr-2 border border-dark finance-filter-icon"
//                       style={{ cursor: 'pointer' }}
//                       onClick={toggleFilterPanel}
//                     >
//                       <FaFilter />
//                     </div>
//                     <div className="py-1 px-2 finance-setting-icon">
//                       <MdSettings />
//                     </div>
//                   </div>
//                 </div>

//                 {showFilterPanel && (
//                   <div className="row mt-1 border border-light rounded px-md-3 py-1">
//                     <div className="col-12 p-2">
//                       <div className="row">
//                         <div className="col-md-6">
//                           <label>Start Date</label>
//                           <input
//                             type="date"
//                             className="form-control"
//                             value={startDate}
//                             onChange={e => setStartDate(e.target.value)}
//                           />
//                         </div>
//                         <div className="col-md-6">
//                           <label>End Date</label>
//                           <input
//                             type="date"
//                             className="form-control"
//                             value={endDate}
//                             onChange={e => setEndDate(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className="text-end mt-3">
//                         <button
//                           className="btn btn-secondary me-2"
//                           onClick={() => {
//                             setStartDate('');
//                             setEndDate('');
//                             setSearchQuery(null);
//                           }}
//                         >
//                           Reset
//                         </button>
//                         <button className="btn btn-primary">Apply Filters</button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="container">
//                 <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                   <h4 className="payroll-title text-center mb-0 flex-grow-1">Student Fee Ledger</h4>
//                 </div>
//               </div>

//               {shouldDisplayTable && filteredStudents.length > 0 ? (
//                 filteredStudents.map((student, index) => (
//                   <div key={index}>
//                     <div className="container mt-3">
//                       <div className="row">
//                         <div className="col-md-4">
//                           <strong>Admission No.:</strong> {student.admissionNo}
//                         </div>
//                         <div className="col-md-4">
//                           <strong>Student Name:</strong> {student.studentName}
//                         </div>
//                         <div className="col-md-4">
//                           <strong>Class:</strong> {student.class}
//                         </div>
//                       </div>
//                       <div className="row mt-2">
//                         <div className="col-md-4">
//                           <strong>Section:</strong> {student.section}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="table-responsive pb-4 mt-3">
//                       <table className="table text-dark border border-secondary mb-1">
//                         <thead>
//                           <tr className="payroll-table-header">
//                             <th className="text-center align-content-center border border-secondary text-nowrap p-2">Academic Year</th>
//                             <th className="text-center align-content-center border border-secondary text-nowrap p-2">Date</th>
//                             <th className="text-center align-content-center border border-secondary text-nowrap p-2">Particulars</th>
//                             <th className="text-center align-content-center border border-secondary text-nowrap p-2">Receipts No.</th>
//                             <th className="text-center align-content-center border border-secondary text-nowrap p-2">Payment Mode</th>
//                             <th className="text-center align-content-center border border-secondary text-nowrap p-2">Debit</th>
//                             <th className="text-center align-content-center border border-secondary text-nowrap p-2">Credit</th>
//                             <th className="text-center align-content-center border border-secondary text-nowrap p-2">Balance</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {student.transactions.slice(0, rowsPerPage).map((transaction, tIndex) => (
//                             <tr key={tIndex} className="payroll-table-row">
//                               <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                                 {transaction.academicYear}
//                               </td>
//                               <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                                 {transaction.date}
//                               </td>
//                               <td className="text-start align-middle border border-secondary text-nowrap p-2">
//                                 {transaction.particulars}
//                               </td>
//                               <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                                 {transaction.receiptNo}
//                               </td>
//                               <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                                 {transaction.paymentMode}
//                               </td>
//                               <td className="text-end align-middle border border-secondary text-nowrap p-2">
//                                 {transaction.debit}
//                               </td>
//                               <td className="text-end align-middle border border-secondary text-nowrap p-2">
//                                 {transaction.credit}
//                               </td>
//                               <td className="text-end align-middle border border-secondary text-nowrap p-2">
//                                 {transaction.balance}
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 ))
//               ) : shouldDisplayTable ? (
//                 <div className="text-center mt-3">
//                   <p>No student data matches the selected search.</p>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentFeeLedger;

import { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import getAPI from '../../../../../api/getAPI';
import { toast } from 'react-toastify';
import { exportToExcel, exportToPDF } from './ExportModalStudentFeeLedger';
import { fetchSchoolData } from '../../PdfUtlisReport';

const StudentFeeLedger = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [schoolId, setSchoolId] = useState('');
  const [school, setSchool] = useState(null);
  const [logoSrc, setLogoSrc] = useState('');
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [feeData, setFeeData] = useState([]);
  const academicYear = localStorage.getItem('selectedAcademicYear');
  const currentDate = new Date();
  const dropdownRef = useRef(null);

  const pageShowOptions = [
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 25, label: '25' },
    { value: 30, label: '30' },
  ];

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
    setShowExportDropdown(false);
  };

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
    setShowFilterPanel(false);
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('School ID not found. Please log in again.');
      return;
    }
    setSchoolId(userDetails.schoolId);
  }, []);

  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        const { school, logoSrc } = await fetchSchoolData(schoolId);
        setSchool(school);
        setLogoSrc(logoSrc);
      } catch (error) {
        console.error('Failed to fetch school data:', error);
      }
    };
    if (schoolId) {
      loadSchoolData();
    }
  }, [schoolId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowExportDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!schoolId) return;

    const fetchInitialData = async () => {
      try {
        const classesRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
        setClasses(classesRes?.data?.data || []);

        const feeTypesRes = await getAPI(`/getall-fess-type/${schoolId}`);
        if (!feeTypesRes.hasError) {
          setFeeTypes(feeTypesRes.data.data || []);
        }

        const studentsRes = await getAPI(`/get-admission-form/${schoolId}`);
        if (!studentsRes.hasError) {
          setStudents(studentsRes.data.data || []);
        }
      } catch (error) {
        console.error('Error initializing data:', error);
        toast.error('Error initializing data');
      }
    };

    fetchInitialData();
  }, [schoolId]);

  useEffect(() => {
    if (!schoolId || !searchQuery) return;

    const fetchFeeData = async () => {
      try {
        const admissionNumber = searchQuery.value;
        console.log('Fetching fee data for:', { admissionNumber, schoolId });

        const student = students.find((s) => s.AdmissionNumber === admissionNumber);
        if (!student) {
          console.log('Student not found:', admissionNumber);
          toast.error('Student not found');
          return;
        }

        const academicHistory = student.academicHistory?.[0] || null;
        if (!academicHistory) {
          console.log('Academic history not found:', student);
          toast.error('Academic history not found');
          return;
        }

        const response = await getAPI(
          `/get-concession-formbyADMID?classId=${academicHistory.masterDefineClass || ''}&sectionIds=${academicHistory.section || ''}&schoolId=${schoolId}&admissionNumber=${admissionNumber}`
        );
        console.log('API response:', response);

        if (!response?.data || !Array.isArray(response.data.data)) {
          console.log('Invalid response structure:', response);
          throw new Error('No fee data found');
        }

        setFeeData(response.data.data);
        console.log('Fee data set:', response.data.data);
      } catch (error) {
        console.error('Error fetching fee data:', error);
        toast.error(error.message || 'Failed to fetch fee data');
        setFeeData([]);
      }
    };

    fetchFeeData();
  }, [schoolId, searchQuery, students]);

  const processedStudentData = students.map((student) => {
    const academicHistory = student.academicHistory || [];
    const transactions = [];

    const yearHistory = academicHistory.find((h) => h.academicYear === academicYear) || {};
    const classInfo = classes.find((c) => c._id === yearHistory?.masterDefineClass) || { className: 'N/A' };
    const sectionInfo = classInfo?.sections?.find((s) => s._id === yearHistory?.section) || { name: 'N/A' };

    const installmentGroups = {};
    let runningBalance = 0;

    if (student.admissionFees && student.paymentDate && student.academicYear === academicYear) {
      const admissionDue = Number(student.admissionFees) || 0;
      const concession = Number(student.concessionAmount) || 0;
      const finalAmount = Number(student.finalAmount) || 0;
      const paymentDate = new Date(student.paymentDate);
      const formattedDate = paymentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).replace(/\//g, '-');

      runningBalance += (admissionDue - concession);
      transactions.push({
        academicYear: student.academicYear,
        date: formattedDate,
        particulars: `Fees Due - Admission Fees`,
        receiptNo: '',
        paymentMode: '',
        due: (admissionDue - concession).toFixed(0),
        receipt: '',
        balance: runningBalance.toFixed(0),
        paymentDateRaw: paymentDate,
      });

      if (student.status === 'Paid') {
        runningBalance -= finalAmount;
        transactions.push({
          academicYear: student.academicYear,
          date: formattedDate,
          particulars: `Fees Received - Admission Fees`,
          receiptNo: student.receiptNumber || '',
          paymentMode: student.paymentMode || '',
          due: '',
          receipt: finalAmount.toFixed(0),
          balance: runningBalance.toFixed(0),
          paymentDateRaw: paymentDate,
        });
      }
    }

    feeData.forEach((year) => {
      const installmentNameMapping = {};
      year.installmentsPresent.forEach((name, index) => {
        installmentNameMapping[index + 1] = name;
        installmentNameMapping[name] = name;
      });

      if (!installmentGroups[year.academicYear]) {
        installmentGroups[year.academicYear] = {};
      }

      const feeAggregates = {};
      year.feeInstallments.forEach((installment) => {
        if (!installment.feesTypeId?._id) {
          console.warn('Skipping installment with missing feesTypeId:', installment);
          return;
        }

        const dueDate = new Date(installment.dueDate);
        const dueMonthStart = new Date(dueDate.getFullYear(), dueDate.getMonth(), 1);
        if (dueMonthStart > currentDate) return;

        const installmentName = installment.installmentName;
        if (!feeAggregates[installmentName]) {
          feeAggregates[installmentName] = {
            totalAmount: 0,
            totalFine: 0,
            totalExcess: 0,
            dueDate: dueDate,
          };
        }

        feeAggregates[installmentName].totalAmount += Number(installment.amount || 0);
        feeAggregates[installmentName].totalFine += Number(installment.fineAmount || 0);
      });

      Object.keys(feeAggregates).forEach((installmentName) => {
        const { totalAmount, totalFine, dueDate } = feeAggregates[installmentName];
        const formattedDate = dueDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).replace(/\//g, '-');

        if (!installmentGroups[year.academicYear][installmentName]) {
          installmentGroups[year.academicYear][installmentName] = {
            transactions: [],
            balance: runningBalance,
          };
        }

        const group = installmentGroups[year.academicYear][installmentName];

        if (totalAmount > 0) {
          group.balance += totalAmount;
          group.transactions.push({
            academicYear: year.academicYear,
            date: formattedDate,
            particulars: `Fees Due - ${installmentName}`,
            receiptNo: '',
            paymentMode: '',
            due: totalAmount.toFixed(0),
            receipt: '',
            balance: group.balance.toFixed(0),
            paymentDateRaw: dueDate,
          });
        }
      });

      const paymentMap = new Map();
      year.paidInstallments?.forEach((pi) => {
        if (!pi.feesTypeId?._id) {
          console.warn('Skipping paid installment with missing feesTypeId:', pi);
          return;
        }

        const installmentName = pi.installmentName || 'Unknown Installment';
        const key = `${installmentName}-${pi.receiptNumber}-${pi.paymentDate}`;

        if (!paymentMap.has(key)) {
          const totalPayable = year.feeInstallments
            .filter((fi) => fi.installmentName === installmentName)
            .reduce((sum, fi) => sum + (Number(fi.amount) || 0) + (Number(fi.fineAmount) || 0), 0);

          paymentMap.set(key, {
            installmentName,
            receiptNumber: pi.receiptNumber,
            paymentMode: pi.paymentMode,
            totalPayable: totalPayable || 0,
            totalPaid: 0,
            totalFinePaid: 0,
            totalExcessPaid: 0,
            transactionNumber: pi.transactionNumber || '',
            paymentDate: pi.paymentDate,
          });
        }

        const payment = paymentMap.get(key);
        payment.totalPaid += Number(pi.paidAmount || 0);
        payment.totalFinePaid += Number(pi.paidFine || 0);
        payment.totalExcessPaid += Number(pi.excessAmount || 0);
      });

      paymentMap.forEach((payment) => {
        const installmentName = payment.installmentName;
        if (!installmentGroups[year.academicYear][installmentName]) {
          installmentGroups[year.academicYear][installmentName] = {
            transactions: [],
            balance: runningBalance,
          };
        }

        const group = installmentGroups[year.academicYear][installmentName];
        const paymentDate = new Date(payment.paymentDate);
        const formattedDate = paymentDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).replace(/\//g, '-');

        if (payment.totalFinePaid > 0) {
          group.balance += Number(payment.totalFinePaid);
          group.transactions.push({
            academicYear: year.academicYear,
            date: formattedDate,
            particulars: 'Fine',
            receiptNo: '',
            paymentMode:'',
            due: payment.totalFinePaid.toFixed(0),
            receipt: '',
            balance: group.balance.toFixed(0),
            paymentDateRaw: paymentDate,
          });
        }

        if (payment.totalExcessPaid > 0) {
          group.balance += Number(payment.totalExcessPaid);
          group.transactions.push({
            academicYear: year.academicYear,
            date: formattedDate,
            particulars: 'Excess Amount',
            receiptNo: '',
            paymentMode:'',
            due: payment.totalExcessPaid.toFixed(0),
            receipt: '',
            balance: group.balance.toFixed(0),
            paymentDateRaw: paymentDate,
          });
        }

        if (payment.totalPaid > 0 || payment.totalFinePaid > 0 || payment.totalExcessPaid > 0) {
          const totalReceipt = Number(payment.totalPaid) + Number(payment.totalFinePaid) + Number(payment.totalExcessPaid);
          group.balance -= totalReceipt;
          group.transactions.push({
            academicYear: year.academicYear,
            date: formattedDate,
            particulars: `Fees Received - ${installmentName}`,
            receiptNo: payment.receiptNumber,
            paymentMode: payment.paymentMode,
            due: '',
            receipt: totalReceipt.toFixed(0),
            balance: group.balance.toFixed(0),
            paymentDateRaw: paymentDate,
          });
        }
      });
    });

    Object.keys(installmentGroups).forEach((academicYear) => {
      Object.keys(installmentGroups[academicYear]).forEach((installmentName) => {
        const group = installmentGroups[academicYear][installmentName];
        transactions.push(...group.transactions);
        runningBalance = group.balance;
      });
    });

    transactions.sort((a, b) => {
      return (a.paymentDateRaw || new Date(0)) - (b.paymentDateRaw || new Date(0));
    });

    return {
      admissionNo: student.AdmissionNumber,
      studentName: `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'N/A',
      class: classInfo.className || 'N/A',
      section: sectionInfo.name || 'N/A',
      transactions,
    };
  });

  const searchOptions = students.map((student) => ({
    value: student.AdmissionNumber,
    label: `${student.firstName || ''} ${student.lastName || ''} (${student.AdmissionNumber})`.trim(),
  }));

  const filteredStudents = processedStudentData
    .filter((student) => {
      if (!searchQuery) return false;
      return (
        student.admissionNo === searchQuery.value ||
        student.studentName === searchQuery.label.split(' (')[0]
      );
    })
    .map((student) => ({
      ...student,
      transactions: student.transactions.filter((transaction) => {
        if (!startDate && !endDate) return true;
        if (!transaction.paymentDateRaw) return false;
        const transactionDate = transaction.paymentDateRaw;
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();
        return transactionDate >= start && transactionDate <= end;
      }),
    }));

  const shouldDisplayTable = !!searchQuery;

  const headerMapping = {
    academicYear: 'Academic Year',
    date: 'Date',
    particulars: 'Particulars',
    receiptNo: 'Receipts No.',
    paymentMode: 'Payment Mode',
    due: 'Due',
    receipt: 'Receipt',
    balance: 'Balance',
  };

  const tableFields = Object.keys(headerMapping).map((key) => ({
    id: key,
    label: headerMapping[key],
  }));

  const getFieldValue = (record, field) => {
    const fieldId = field.id;
    if (fieldId === 'academicYear' || fieldId === 'date' || fieldId === 'particulars' || fieldId === 'receiptNo' || fieldId === 'paymentMode') {
      return record[fieldId] || '-';
    }
    return record[fieldId] || '';
  };

  const handleSelectChange = (selectedOptions, { name }) => {
    if (name === 'rowsPerPage') {
      setRowsPerPage(selectedOptions ? selectedOptions.value : 10);
      setCurrentPage(1);
    }
  };

  const totalRecords = filteredStudents.length > 0 ? filteredStudents[0].transactions.length : 0;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const maxPagesToShow = 5;
  const pagesToShow = [];
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  const paginatedTransactions = () => {
    if (filteredStudents.length === 0) return [];
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredStudents[0].transactions.slice(startIndex, endIndex);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="row p-1 border border-dark" style={{ background: '#bfbfbf' }}>
                  <div className="col-md-5 col-12">
                    <CreatableSelect
                      isClearable
                      placeholder="Search by Name or Admission No."
                      options={searchOptions}
                      value={searchQuery}
                      onChange={setSearchQuery}
                      className="border border-dark"
                    />
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
                    <Select
                      isClearable
                      name="rowsPerPage"
                      placeholder="Show"
                      options={pageShowOptions}
                      value={pageShowOptions.find((option) => option.value === rowsPerPage)}
                      onChange={(selected, action) => handleSelectChange(selected, action)}
                      className="email-select border border-dark me-lg-2"
                    />
                    <div
                      className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
                      style={{ cursor: 'pointer' }}
                      onClick={toggleFilterPanel}
                    >
                      <FaFilter />
                    </div>
                    <div className="position-relative" ref={dropdownRef}>
                      <div
                        className="py-1 px-2 mr-2 border border-dark finance-filter-icon"
                        style={{ cursor: 'pointer' }}
                        onClick={toggleExportDropdown}
                        title="Download"
                      >
                        <FaDownload />
                      </div>
                      {showExportDropdown && (
                        <div
                          className="position-absolute bg-white border mr-2 mt-2 border-dark rounded shadow"
                          style={{
                            top: '100%',
                            right: 0,
                            zIndex: 1000,
                            minWidth: '150px',
                          }}
                        >
                          <button
                            className="btn btn-light w-100 text-left py-2 px-3"
                            disabled={isExporting}
                            onClick={async () => {
                              if (filteredStudents.length === 0) {
                                toast.error('No student data to export');
                                return;
                              }
                              setIsExporting(true);
                              try {
                                await exportToExcel(
                                  filteredStudents[0].transactions,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  filteredStudents[0]
                                );
                              } catch (err) {
                                toast.error('Export to Excel failed.');
                              } finally {
                                setIsExporting(false);
                                setShowExportDropdown(false);
                              }
                            }}
                          >
                            {isExporting ? 'Exporting...' : 'Export to Excel'}
                          </button>
                          <button
                            className="btn btn-light w-100 text-left py-2 px-3"
                            disabled={isExporting}
                            onClick={async () => {
                              if (filteredStudents.length === 0) {
                                toast.error('No student data to export');
                                return;
                              }
                              setIsExporting(true);
                              try {
                                await exportToPDF(
                                  filteredStudents[0].transactions,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  filteredStudents[0],
                                  school,
                                  logoSrc
                                );
                              } catch (err) {
                                toast.error('Export to PDF failed.');
                              } finally {
                                setIsExporting(false);
                                setShowExportDropdown(false);
                              }
                            }}
                          >
                            {isExporting ? 'Exporting...' : 'Export to PDF'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {showFilterPanel && (
                  <div className="row mt-1 border border-light rounded px-md-3 py-1">
                    <div className="col-12 p-2">
                      <div className="row">
                        <div className="col-md-6">
                          <label>Start Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label>End Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="text-end mt-3">
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => {
                            setStartDate('');
                            setEndDate('');
                            setSearchQuery(null);
                            setCurrentPage(1);
                          }}
                        >
                          Reset
                        </button>
                        <button className="btn btn-primary">Apply Filters</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className="payroll-title text-center mb-0 flex-grow-1">Student Fee Ledger</h4>
                </div>
              </div>

              {shouldDisplayTable && filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <div key={index}>
                    <div className="container mt-3">
                      <div className="row">
                        <div className="col-md-4">
                          <strong>Admission No.:</strong> {student.admissionNo}
                        </div>
                        <div className="col-md-4">
                          <strong>Student Name:</strong> {student.studentName}
                        </div>
                        <div className="col-md-4">
                          <strong>Class:</strong> {student.class}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-4">
                          <strong>Section:</strong> {student.section}
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive pb-4 mt-3">
                      <table className="table text-dark border border-secondary mb-1">
                        <thead>
                          <tr className="payroll-table-header">
                            <th className="text-center align-content-center border border-secondary text-nowrap p-2">Academic Year</th>
                            <th className="text-center align-content-center border border-secondary text-nowrap p-2">Date</th>
                            <th className="text-center align-content-center border border-secondary text-nowrap p-2">Particulars</th>
                            <th className="text-center align-content-center border border-secondary text-nowrap p-2">Receipts No.</th>
                            <th className="text-center align-content-center border border-secondary text-nowrap p-2">Payment Mode</th>
                            <th className="text-center align-content-center border border-secondary text-nowrap p-2">Due</th>
                            <th className="text-center align-content-center border border-secondary text-nowrap p-2">Receipt</th>
                            <th className="text-center align-content-center border border-secondary text-nowrap p-2">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedTransactions().map((transaction, tIndex) => (
                            <tr key={tIndex} className="payroll-table-row">
                              <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                {transaction.academicYear}
                              </td>
                              <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                {transaction.date}
                              </td>
                              <td className="text-start align-middle border border-secondary text-nowrap p-2">
                                {transaction.particulars}
                              </td>
                              <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                {transaction.receiptNo}
                              </td>
                              <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                {transaction.paymentMode}
                              </td>
                              <td className="text-end align-middle border border-secondary text-nowrap p-2">
                                {transaction.due}
                              </td>
                              <td className="text-end align-middle border border-secondary text-nowrap p-2">
                                {transaction.receipt}
                              </td>
                              <td className="text-end align-middle border border-secondary text-nowrap p-2">
                                {transaction.balance}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {totalRecords > 0 && (
                      <div className="card-footer border-top">
                        <nav aria-label="Page navigation example">
                          <ul className="pagination justify-content-end mb-0">
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                              >
                                Previous
                              </button>
                            </li>
                            {pagesToShow.map((page) => (
                              <li
                                key={page}
                                className={`page-item ${currentPage === page ? 'active' : ''}`}
                              >
                                <button
                                  className={`page-link pagination-button ${currentPage === page ? 'active' : ''}`}
                                  onClick={() => handlePageClick(page)}
                                >
                                  {page}
                                </button>
                              </li>
                            ))}
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
                  </div>
                ))
              ) : shouldDisplayTable ? (
                <div className="text-center mt-3">
                  <p>No student data matches the selected search.</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeLedger;