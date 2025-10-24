// import React, { useState, useEffect, useRef } from 'react';
// import { FaFilter, FaDownload } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import CreatableSelect from 'react-select/creatable';
// import Select from 'react-select';
// import getAPI from '../../../../../../api/getAPI';
// import { Link } from 'react-router-dom';
// import { exportToExcel, exportToPDF } from './ExportModal';
// import { fetchSchoolData } from '../../../PdfUtlisReport';

// const RegistrationFees = () => {
//   const headerMapping = {
//     regFeesDate: 'Date',
//     academicYear: 'Academic Year',
//     registrationNumber: 'Reg No.',
//     studentName: 'Name',
//     className: 'Class',
//     regFeesStatus: 'Status',
//     regFeesPaymentMode: 'Payment Mode',
//     regFeesTransactionNo: 'Cheque No./Transaction No.',
//     regFeesReceiptNo: 'Receipts No.',
//     regFeesDue: 'Fees Due',
//     regFeesPaid: 'Fees Paid',
//     regFeesConcession: 'Concession',
//     regFeesrefundAmount: 'Refund/Cancelled',
//   };

//   const [showFilterPanel, setShowFilterPanel] = useState(false);
//   const [showExportDropdown, setShowExportDropdown] = useState(false);
//   const [activeTab, setActiveTab] = useState('Date');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [schoolId, setSchoolId] = useState('');
//   const [school, setSchool] = useState(null);
//   const [logoSrc, setLogoSrc] = useState('');
//   const [paymentModes, setPaymentModes] = useState([]);
//   const [statusOptions, setStatusOptions] = useState([]);
//   const [feeData, setFeeData] = useState([]);
//   const [tableFields] = useState(
//     Object.keys(headerMapping).map((key) => ({
//       id: key,
//       label: headerMapping[key],
//     }))
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingYears, setLoadingYears] = useState(false);
//   const [classOptions, setClassOptions] = useState([]);
//   const [academicYearOptions, setAcademicYearOptions] = useState([]);
//   const [academicYears, setAcademicYears] = useState([]);
//   const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
//   const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [selectedStatuses, setSelectedStatuses] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [isExporting, setIsExporting] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState('all');
//   const dropdownRef = useRef(null);
//   const tabs = ['Date', 'Academic Year', 'Class', 'Payment Mode', 'Status'];

//   const pageShowOptions = [
//     { value: 'all', label: 'All' },
//     { value: 10, label: '10' },
//     { value: 15, label: '15' },
//     { value: 20, label: '20' },
//     { value: 30, label: '30' },
//   ];

//   const formatAcademicYear = (year) => {
//     if (!year) return '-';
//     const [startYear, endYear] = year.split('-');
//     return `${startYear}-${endYear.slice(2)}`;
//   };

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId) {
//       toast.error('School ID not found. Please log in again.');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);
//   }, []);

//   useEffect(() => {
//     const fetchAcademicYears = async () => {
//       try {
//         setLoadingYears(true);
//         const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
//         if (!response.hasError && response.data?.data) {
//           const years = response.data.data.map((item) => item.academicYear).sort((a, b) => a.localeCompare(b));
//           setAcademicYears(years);
//           setAcademicYearOptions(
//             years.map((year) => ({
//               value: year,
//               label: formatAcademicYear(year),
//             }))
//           );
//           if (!selectedAcademicYear && years.length > 0) {
//             setSelectedAcademicYear(years[years.length - 1]);
//             localStorage.setItem('selectedAcademicYear', years[years.length - 1]);
//           }
//         } else {
//           toast.error('No academic years found.');
//         }
//       } catch (err) {
//         toast.error('Error fetching academic years.');
//         console.error(err);
//       } finally {
//         setLoadingYears(false);
//       }
//     };
//     if (schoolId) {
//       fetchAcademicYears();
//     }
//   }, [schoolId]);

//   useEffect(() => {
//     if (!schoolId || !selectedAcademicYear) return;

//     const fetchInitialData = async () => {
//       setIsLoading(true);
//       try {
//         const feeDataRes = await getAPI(`/get-all-data-Registration?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
//         const unifiedData = [];
//         const processedKeys = new Set();

//         if (feeDataRes.data.combinedDetails) {
//           feeDataRes.data.combinedDetails.forEach((record) => {
//             const key = `${record.paymentId}_${record.registrationNumber}_${record.academicYear}_${record.regFeesStatus}`;
//             if (!processedKeys.has(key)) {
//               unifiedData.push({
//                 ...record,
//                 studentName: `${record.firstName} ${record.lastName}`.trim() || '-',
//                 reportStatus: record.regFeesStatus || 'Paid',
//               });
//               processedKeys.add(key);
//             }
//           });
//         }

//         unifiedData.sort((a, b) => {
//           const regNoA = a.registrationNumber || '-';
//           const regNoB = b.registrationNumber || '-';
//           const dateA = a.regFeesDate || '-';
//           const dateB = b.regFeesDate || '-';
//           return dateA.localeCompare(dateB) || regNoA.localeCompare(regNoB);
//         });

//         setFeeData(unifiedData);

//         const modes = new Set();
//         const statuses = new Set();
//         const classes = new Set();
//         unifiedData.forEach((record) => {
//           if (record.regFeesPaymentMode) modes.add(record.regFeesPaymentMode);
//           if (record.regFeesStatus) statuses.add(record.regFeesStatus);
//           if (record.className) classes.add(record.className);
//         });
//         setPaymentModes(
//           Array.from(modes)
//             .filter((mode) => mode && mode !== '-')
//             .map((mode) => ({ value: mode, label: mode }))
//         );
//         setStatusOptions(
//           Array.from(statuses)
//             .filter((status) => status && status !== '-')
//             .map((status) => ({ value: status, label: status }))
//         );
//         setClassOptions(
//           Array.from(classes)
//             .filter((cls) => cls && cls !== '-')
//             .map((cls) => ({ value: cls, label: cls }))
//         );
//         if (rowsPerPage === 'all' && unifiedData.length > 0) {
//           setRowsPerPage(unifiedData.length);
//         }
//       } catch (error) {
//         toast.error('Error initializing data: ' + error.message);
//         setFeeData([]);
//         setPaymentModes([]);
//         setStatusOptions([]);
//         setClassOptions([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [schoolId, selectedAcademicYear]);

//   useEffect(() => {
//     const loadSchoolData = async () => {
//       try {
//         const { school, logoSrc } = await fetchSchoolData(schoolId);
//         setSchool(school);
//         setLogoSrc(logoSrc);
//       } catch (error) {
//         console.error('Failed to fetch school data:', error);
//       }
//     };
//     if (schoolId) {
//       loadSchoolData();
//     }
//   }, [schoolId]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowExportDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSelectChange = (selectedOptions, { name }) => {
//     if (name === 'academicYear') {
//       const selectedYear = selectedOptions?.value || '';
//       setSelectedAcademicYear(selectedYear);
//       setFeeData([]);
//       setCurrentPage(1);
//     } else if (name === 'paymentMode') {
//       setSelectedPaymentModes(selectedOptions || []);
//       setCurrentPage(1);
//     } else if (name === 'class') {
//       setSelectedClasses(selectedOptions || []);
//       setCurrentPage(1);
//     } else if (name === 'status') {
//       setSelectedStatuses(selectedOptions || []);
//       setCurrentPage(1);
//     } else if (name === 'rowsPerPage') {
//       if (selectedOptions?.value === 'all') {
//         setRowsPerPage(feeData.length || 'all');
//       } else {
//         setRowsPerPage(selectedOptions ? selectedOptions.value : 10);
//       }
//       setCurrentPage(1);
//     }
//   };

//   const resetFilters = () => {
//     setSelectedAcademicYear('');
//     setSelectedPaymentModes([]);
//     setSelectedClasses([]);
//     setSelectedStatuses([]);
//     setStartDate('');
//     setEndDate('');
//     setSearchTerm('');
//     setCurrentPage(1);
//     setRowsPerPage('all');
//     const storedYear = localStorage.getItem('selectedAcademicYear');
//     if (storedYear) {
//       setSelectedAcademicYear(storedYear);
//     }
//   };

//   const toggleFilterPanel = () => {
//     setShowFilterPanel(!showFilterPanel);
//     setShowExportDropdown(false);
//   };

//   const toggleExportDropdown = () => {
//     setShowExportDropdown(!showExportDropdown);
//     setShowFilterPanel(false);
//   };

//   const getFieldValue = (record, field) => {
//     const fieldId = field.id;

//     if (fieldId === 'academicYear') {
//       return formatAcademicYear(record[fieldId]) || '-';
//     } else if (fieldId === 'studentName') {
//       return record.studentName || '-';
//     } else if (fieldId === 'registrationNumber') {
//       return record.registrationNumber || '-';
//     } else if (['regFeesDue', 'regFeesPaid', 'regFeesConcession', 'regFeesrefundAmount'].includes(fieldId)) {
//       const value = parseFloat(record[fieldId] || 0);
//       return value === 0 ? '0.00' : value.toFixed(2);
//     } else {
//       return record[fieldId] || '-';
//     }
//   };

//   const calculateBalance = (record) => {
//     const due = parseFloat(record.regFeesDue || 0);
//     const concession = parseFloat(record.regFeesConcession || 0);
//     const paid = parseFloat(record.regFeesPaid || 0);
//     const refund = parseFloat(record.regFeesrefundAmount || 0);
//     const balance = due - concession - paid + refund;
//     return balance === 0 ? '0.00' : balance.toFixed(2);
//   };

//   const filteredData = feeData.filter((record) => {
//     const matchesAcademicYear = selectedAcademicYear ? record.academicYear === selectedAcademicYear : true;
//     const matchesSearchTerm = searchTerm
//       ? Object.values(record).some((value) =>
//           value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       : true;
//     const matchesPaymentMode =
//       selectedPaymentModes.length === 0 ||
//       selectedPaymentModes.some((mode) => record.regFeesPaymentMode === mode.value);
//     const matchesClass =
//       selectedClasses.length === 0 ||
//       selectedClasses.some((cls) => record.className === cls.value);
//     const matchesStatus =
//       selectedStatuses.length === 0 ||
//       selectedStatuses.some((status) => record.regFeesStatus === status.value);
//     const matchesDate =
//       (!startDate && !endDate) ||
//       (record.regFeesDate !== '-' &&
//         (() => {
//           const dateString = record.regFeesDate;
//           if (!dateString || !/^\d{2}-\d{2}-\d{4}$/.test(dateString)) return false;
//           const [day, month, year] = dateString.split('-');
//           const recordDate = new Date(`${year}-${month}-${day}`);
//           if (isNaN(recordDate.getTime())) return false;
//           const start = startDate ? new Date(startDate) : null;
//           const end = endDate ? new Date(endDate) : null;
//           return (!start || recordDate >= start) && (!end || recordDate <= end);
//         })());

//     return matchesAcademicYear && matchesSearchTerm && matchesPaymentMode && matchesClass && matchesStatus && matchesDate;
//   });

//   const groupedByDate = filteredData.reduce((acc, record) => {
//     const date = record.regFeesDate;
//     if (!acc[date]) acc[date] = [];
//     acc[date].push(record);
//     return acc;
//   }, {});

//   const totals = filteredData.reduce(
//     (acc, record) => {
//       const due = parseFloat(record.regFeesDue || 0);
//       const paid = parseFloat(record.regFeesPaid || 0);
//       const concession = parseFloat(record.regFeesConcession || 0);
//       const refund = parseFloat(record.regFeesrefundAmount || 0);
//       const balance = due - concession - paid + refund;
//       return {
//         feesDue: acc.feesDue + due,
//         feesPaid: acc.feesPaid + paid,
//         concession: acc.concession + concession,
//         refund: acc.refund + refund,
//         balance: acc.balance + balance,
//       };
//     },
//     { feesDue: 0, feesPaid: 0, concession: 0, refund: 0, balance: 0 }
//   );

//   const totalRecords = Object.keys(groupedByDate).reduce((sum, date) => sum + groupedByDate[date].length, 0);
//   const totalPages = rowsPerPage === 'all' ? 1 : Math.ceil(totalRecords / rowsPerPage);

//   const maxPagesToShow = 5;
//   const pagesToShow = [];
//   const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//   const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//   for (let i = startPage; i <= endPage; i++) {
//     pagesToShow.push(i);
//   }

//   const paginatedData = () => {
//     const sortedDates = Object.keys(groupedByDate).sort();
//     let currentCount = 0;
//     const startIndex = rowsPerPage === 'all' ? 0 : (currentPage - 1) * rowsPerPage;
//     const endIndex = rowsPerPage === 'all' ? totalRecords : startIndex + rowsPerPage;
//     const paginated = [];

//     for (const date of sortedDates) {
//       const records = groupedByDate[date];
//       for (const record of records) {
//         if (currentCount >= startIndex && currentCount < endIndex) {
//           paginated.push({ date, record });
//         }
//         currentCount++;
//         if (currentCount >= endIndex) break;
//       }
//       if (currentCount >= endIndex) break;
//     }

//     return paginated;
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12">
//           <div className="card m-2">
//             <div className="card-body">
//               <div className="container">
//                 <div className="row p-1 border border-dark" style={{ background: '#bfbfbf' }}>
//                   <div className="col-md-5 col-12">
//                     <input
//                       type="text"
//                       className="form-control border border-dark"
//                       placeholder="Search by any field"
//                       value={searchTerm}
//                       onChange={(e) => {
//                         setSearchTerm(e.target.value);
//                         setCurrentPage(1);
//                       }}
//                     />
//                   </div>
//                   <div className="col-md-2"></div>
//                   <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
//                     <Select
//                       isClearable
//                       name="rowsPerPage"
//                       placeholder="Show"
//                       options={pageShowOptions}
//                       value={pageShowOptions.find((option) => option.value === rowsPerPage || (option.value === 'all' && rowsPerPage === feeData.length))}
//                       onChange={(selected, action) => handleSelectChange(selected, action)}
//                       className="email-select border border-dark me-lg-2"
//                     />
//                     <div
//                       className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
//                       style={{ cursor: 'pointer' }}
//                       onClick={toggleFilterPanel}
//                     >
//                       <FaFilter />
//                     </div>
//                     <div className="position-relative" ref={dropdownRef}>
//                       <div
//                         className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
//                         style={{ cursor: 'pointer' }}
//                         onClick={toggleExportDropdown}
//                         title="Download"
//                       >
//                         <FaDownload />
//                       </div>
//                       {showExportDropdown && (
//                         <div
//                           className="position-absolute bg-white border mr-2 mt-2 border-dark rounded shadow"
//                           style={{
//                             top: '100%',
//                             right: 0,
//                             zIndex: 1000,
//                             minWidth: '150px',
//                           }}
//                         >
//                           <button
//                             className="btn btn-light w-100 text-left py-2 px-3"
//                             disabled={isExporting}
//                             onClick={async () => {
//                               setIsExporting(true);
//                               try {
//                                 await exportToExcel(
//                                   filteredData,
//                                   tableFields,
//                                   headerMapping,
//                                   getFieldValue,
//                                   calculateBalance,
//                                   {
//                                     feesDue: totals.feesDue.toFixed(2),
//                                     feesPaid: totals.feesPaid.toFixed(2),
//                                     concession: totals.concession.toFixed(2),
//                                     refund: totals.refund.toFixed(2),
//                                     balance: totals.balance.toFixed(2),
//                                   },
//                                   formatAcademicYear,
//                                   selectedAcademicYear
//                                 );
//                               } catch (err) {
//                                 toast.error("Export to Excel failed.");
//                               } finally {
//                                 setIsExporting(false);
//                                 setShowExportDropdown(false);
//                               }
//                             }}
//                           >
//                             {isExporting ? 'Exporting...' : 'Export to Excel'}
//                           </button>
//                           <button
//                             className="btn btn-light w-100 text-left py-2 px-3"
//                             disabled={isExporting}
//                             onClick={async () => {
//                               setIsExporting(true);
//                               try {
//                                 await exportToPDF(
//                                   filteredData,
//                                   tableFields,
//                                   headerMapping,
//                                   getFieldValue,
//                                   calculateBalance,
//                                   {
//                                     feesDue: totals.feesDue.toFixed(2),
//                                     feesPaid: totals.feesPaid.toFixed(2),
//                                     concession: totals.concession.toFixed(2),
//                                     refund: totals.refund.toFixed(2),
//                                     balance: totals.balance.toFixed(2),
//                                   },
//                                   formatAcademicYear,
//                                   selectedAcademicYear,
//                                   school,
//                                   logoSrc
//                                 );
//                               } catch (err) {
//                                 toast.error("Export to PDF failed.");
//                               } finally {
//                                 setIsExporting(false);
//                                 setShowExportDropdown(false);
//                               }
//                             }}
//                           >
//                             {isExporting ? 'Exporting...' : 'Export to PDF'}
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 {showFilterPanel && (
//                   <div className="row mt-1 border border-light rounded px-md-3 py-1">
//                     <div className="col-12 p-2">
//                       <ul className="nav nav-tabs mb-0 justify-content-center">
//                         {tabs.map((tab) => (
//                           <li className="nav-item" key={tab}>
//                             <Link
//                               className={`nav-link fw-bold ${activeTab === tab ? 'active' : ''}`}
//                               onClick={() => setActiveTab(tab)}
//                             >
//                               {tab}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                       <div className="tab-content mt-2">
//                         {activeTab === 'Date' && (
//                           <div className="row d-lg-flex justify-content-center">
//                             <div className="col-md-4">
//                               <label className="form-label">Start Date </label>
//                               <input
//                                 type="date"
//                                 className="form-control"
//                                 value={startDate}
//                                 onChange={(e) => {
//                                   setStartDate(e.target.value);
//                                   setCurrentPage(1);
//                                 }}
//                               />
//                             </div>
//                             <div className="col-md-4">
//                               <label className="form-label">End Date </label>
//                               <input
//                                 type="date"
//                                 className="form-control"
//                                 value={endDate}
//                                 onChange={(e) => {
//                                   setEndDate(e.target.value);
//                                   setCurrentPage(1);
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         )}
//                         {activeTab === 'Payment Mode' && (
//                           <div className="row d-lg-flex justify-content-center">
//                             <div className="col-md-8">
//                               <CreatableSelect
//                                 isMulti
//                                 name="paymentMode"
//                                 options={paymentModes}
//                                 value={selectedPaymentModes}
//                                 onChange={(selected, action) => handleSelectChange(selected, action)}
//                                 placeholder="Select Payment Modes"
//                                 className="mt-2"
//                               />
//                             </div>
//                           </div>
//                         )}
//                         {activeTab === 'Class' && (
//                           <div className="row d-lg-flex justify-content-center">
//                             <div className="col-md-8">
//                               <CreatableSelect
//                                 isMulti
//                                 name="class"
//                                 options={classOptions}
//                                 value={selectedClasses}
//                                 onChange={(selected, action) => handleSelectChange(selected, action)}
//                                 placeholder="Select Classes"
//                                 className="mt-2"
//                               />
//                             </div>
//                           </div>
//                         )}
//                         {activeTab === 'Academic Year' && (
//                           <div className="row d-lg-flex justify-content-center">
//                             <div className="col-md-8">
//                               <CreatableSelect
//                                 name="academicYear"
//                                 options={academicYearOptions}
//                                 value={academicYearOptions.find((option) => option.value === selectedAcademicYear)}
//                                 onChange={(selected, action) => handleSelectChange(selected, action)}
//                                 placeholder="Select Academic Year"
//                                 className="mt-2"
//                               />
//                             </div>
//                           </div>
//                         )}
//                         {activeTab === 'Status' && (
//                           <div className="row d-lg-flex justify-content-center">
//                             <div className="col-md-8">
//                               <CreatableSelect
//                                 isMulti
//                                 name="status"
//                                 options={statusOptions}
//                                 value={selectedStatuses}
//                                 onChange={(selected, action) => handleSelectChange(selected, action)}
//                                 placeholder="Select Statuses"
//                                 className="mt-2"
//                               />
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                       <div className="text-end mt-3">
//                         <button className="btn btn-secondary me-2" onClick={resetFilters}>
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
//                   <h2 className="payroll-title text-center mb-0 flex-grow-1">Registration Fees Report</h2>
//                 </div>
//               </div>
//               {isLoading || loadingYears ? (
//                 <div className="text-center mt-3">
//                   <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <p>Loading data...</p>
//                 </div>
//               ) : tableFields.length > 0 ? (
//                 <>
//                   <div className="table-responsive pb-4 mt-3">
//                     <table className="table text-dark border border-secondary mb-1">
//                       <thead>
//                         <tr className="payroll-table-header">
//                           {tableFields.map((field) => (
//                             <th key={field.id} className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {headerMapping[field.id] || field.label}
//                             </th>
//                           ))}
//                           <th className="text-center align-middle border border-secondary text-nowrap p-2">Balance</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {paginatedData().length > 0 ? (
//                           paginatedData().map(({ date, record }, index) => (
//                             <tr
//                               key={`${record.registrationNumber}_${record.academicYear}_${record.regFeesStatus}_${index}`}
//                               className="payroll-table-row"
//                             >
//                               {tableFields.map((field) => (
//                                 <td
//                                   key={field.id}
//                                   className="text-center align-middle border border-secondary text-nowrap p-2"
//                                 >
//                                   {getFieldValue(record, field)}
//                                 </td>
//                               ))}
//                               <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                                 {calculateBalance(record)}
//                               </td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan={tableFields.length + 1} className="text-center">
//                               No data matches the selected filters for {formatAcademicYear(selectedAcademicYear)}.
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                       <tfoot>
//                         <tr className="payroll-table-footer">
//                           <td colSpan={tableFields.length - 4} className="text-right border border-secondary p-2">
//                             <strong>Total</strong>
//                           </td>
//                           <td className="text-center border border-secondary p-2">
//                             <strong>{totals.feesDue.toFixed(2)}</strong>
//                           </td>
//                           <td className="text-center border border-secondary p-2">
//                             <strong>{totals.feesPaid.toFixed(2)}</strong>
//                           </td>
//                           <td className="text-center border border-secondary p-2">
//                             <strong>{totals.concession.toFixed(2)}</strong>
//                           </td>
//                           <td className="text-center border border-secondary p-2">
//                             <strong>{totals.refund.toFixed(2)}</strong>
//                           </td>
//                           <td className="text-center border border-secondary p-2">
//                             <strong>{totals.balance.toFixed(2)}</strong>
//                           </td>
//                         </tr>
//                       </tfoot>
//                     </table>
//                   </div>
//                   {totalRecords > 0 && rowsPerPage !== 'all' && (
//                     <div className="card-footer border-top">
//                       <nav aria-label="Page navigation example">
//                         <ul className="pagination justify-content-end mb-0">
//                           <li className="page-item">
//                             <button
//                               className="page-link"
//                               onClick={handlePreviousPage}
//                               disabled={currentPage === 1}
//                             >
//                               Previous
//                             </button>
//                           </li>
//                           {pagesToShow.map((page) => (
//                             <li
//                               key={page}
//                               className={`page-item ${currentPage === page ? 'active' : ''}`}
//                             >
//                               <button
//                                 className={`page-link pagination-button ${currentPage === page ? 'active' : ''}`}
//                                 onClick={() => handlePageClick(page)}
//                               >
//                                 {page}
//                               </button>
//                             </li>
//                           ))}
//                           <li className="page-item">
//                             <button
//                               className="page-link"
//                               onClick={handleNextPage}
//                               disabled={currentPage === totalPages}
//                             >
//                               Next
//                             </button>
//                           </li>
//                         </ul>
//                       </nav>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="text-center mt-3">
//                   <p>No table fields available. Please configure in settings.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationFees;


import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import getAPI from '../../../../../../api/getAPI';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from './ExportModal';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const RegistrationFees = () => {
  const headerMapping = {
    regFeesDate: 'Date',
    academicYear: 'Academic Year',
    registrationNumber: 'Reg No.',
    studentName: 'Name',
    className: 'Class',
    regFeesStatus: 'Status',
    regFeesPaymentMode: 'Payment Mode',
    regFeesTransactionNo: 'Cheque No./Transaction No.',
    regFeesReceiptNo: 'Receipts No.',
    // regFeesDue: 'Fees Due',
    regFeesPaid: 'Fees Paid',
    regFeesrefundAmount: 'Refund/Cancelled',
    regFeesConcession: 'Concession',
  };

  // Define table fields with explicit order, including Net Fees
  const tableFields = [
    { id: 'regFeesDate', label: 'Date' },
    { id: 'academicYear', label: 'Academic Year' },
    { id: 'registrationNumber', label: 'Reg No.' },
    { id: 'studentName', label: 'Name' },
    { id: 'className', label: 'Class' },
    { id: 'regFeesStatus', label: 'Status' },
    { id: 'regFeesPaymentMode', label: 'Payment Mode' },
    { id: 'regFeesTransactionNo', label: 'Cheq./Tran No.' },
    { id: 'regFeesReceiptNo', label: 'Receipts No.' },
    // { id: 'regFeesDue', label: 'Fees Due' },
    { id: 'regFeesPaid', label: 'Fees Paid' },
    { id: 'regFeesrefundAmount', label: 'CRN' },
    { id: 'netFees', label: 'Net Fees' }, 
    { id: 'regFeesConcession', label: 'Concession' },
    { id: 'balance', label: 'Total' }, 
  ];

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Date');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [school, setSchool] = useState(null);
  const [logoSrc, setLogoSrc] = useState('');
  const [paymentModes, setPaymentModes] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState('all');
  const dropdownRef = useRef(null);
  const tabs = ['Date', 'Academic Year', 'Class', 'Payment Mode', 'Status'];

  const pageShowOptions = [
    { value: 'all', label: 'All' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
  ];

  const formatAcademicYear = (year) => {
    if (!year) return '-';
    const [startYear, endYear] = year.split('-');
    return `${startYear}-${endYear.slice(2)}`;
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
    const fetchAcademicYears = async () => {
      try {
        setLoadingYears(true);
        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        if (!response.hasError && response.data?.data) {
          const years = response.data.data.map((item) => item.academicYear).sort((a, b) => a.localeCompare(b));
          setAcademicYears(years);
          setAcademicYearOptions(
            years.map((year) => ({
              value: year,
              label: formatAcademicYear(year),
            }))
          );
          if (!selectedAcademicYear && years.length > 0) {
            setSelectedAcademicYear(years[years.length - 1]);
            localStorage.setItem('selectedAcademicYear', years[years.length - 1]);
          }
        } else {
          toast.error('No academic years found.');
        }
      } catch (err) {
        toast.error('Error fetching academic years.');
        console.error(err);
      } finally {
        setLoadingYears(false);
      }
    };
    if (schoolId) {
      fetchAcademicYears();
    }
  }, [schoolId]);

  useEffect(() => {
    if (!schoolId || !selectedAcademicYear) return;

    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const feeDataRes = await getAPI(`/get-all-data-Registration?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
        const unifiedData = [];
        const processedKeys = new Set();

        if (feeDataRes.data.combinedDetails) {
          feeDataRes.data.combinedDetails.forEach((record) => {
            const key = `${record.paymentId}_${record.registrationNumber}_${record.academicYear}_${record.regFeesStatus}`;
            if (!processedKeys.has(key)) {
              unifiedData.push({
                ...record,
                studentName: `${record.firstName} ${record.lastName}`.trim() || '-',
                reportStatus: record.regFeesStatus || 'Paid',
              });
              processedKeys.add(key);
            }
          });
        }

        unifiedData.sort((a, b) => {
          const regNoA = a.registrationNumber || '-';
          const regNoB = b.registrationNumber || '-';
          const dateA = a.regFeesDate || '-';
          const dateB = b.regFeesDate || '-';
          return dateA.localeCompare(dateB) || regNoA.localeCompare(regNoB);
        });

        setFeeData(unifiedData);

        const modes = new Set();
        const statuses = new Set();
        const classes = new Set();
        unifiedData.forEach((record) => {
          if (record.regFeesPaymentMode) modes.add(record.regFeesPaymentMode);
          if (record.regFeesStatus) statuses.add(record.regFeesStatus);
          if (record.className) classes.add(record.className);
        });
        setPaymentModes(
          Array.from(modes)
            .filter((mode) => mode && mode !== '-')
            .map((mode) => ({ value: mode, label: mode }))
        );
        setStatusOptions(
          Array.from(statuses)
            .filter((status) => status && status !== '-')
            .map((status) => ({ value: status, label: status }))
        );
        setClassOptions(
          Array.from(classes)
            .filter((cls) => cls && cls !== '-')
            .map((cls) => ({ value: cls, label: cls }))
        );
        if (rowsPerPage === 'all' && unifiedData.length > 0) {
          setRowsPerPage(unifiedData.length);
        }
      } catch (error) {
        toast.error('Error initializing data: ' + error.message);
        setFeeData([]);
        setPaymentModes([]);
        setStatusOptions([]);
        setClassOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [schoolId, selectedAcademicYear]);

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

  const handleSelectChange = (selectedOptions, { name }) => {
    if (name === 'academicYear') {
      const selectedYear = selectedOptions?.value || '';
      setSelectedAcademicYear(selectedYear);
      setFeeData([]);
      setCurrentPage(1);
    } else if (name === 'paymentMode') {
      setSelectedPaymentModes(selectedOptions || []);
      setCurrentPage(1);
    } else if (name === 'class') {
      setSelectedClasses(selectedOptions || []);
      setCurrentPage(1);
    } else if (name === 'status') {
      setSelectedStatuses(selectedOptions || []);
      setCurrentPage(1);
    } else if (name === 'rowsPerPage') {
      if (selectedOptions?.value === 'all') {
        setRowsPerPage(feeData.length || 'all');
      } else {
        setRowsPerPage(selectedOptions ? selectedOptions.value : 10);
      }
      setCurrentPage(1);
    }
  };

  const resetFilters = () => {
    setSelectedAcademicYear('');
    setSelectedPaymentModes([]);
    setSelectedClasses([]);
    setSelectedStatuses([]);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setCurrentPage(1);
    setRowsPerPage('all');
    const storedYear = localStorage.getItem('selectedAcademicYear');
    if (storedYear) {
      setSelectedAcademicYear(storedYear);
    }
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
    setShowExportDropdown(false);
  };

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
    setShowFilterPanel(false);
  };

  const getFieldValue = (record, field) => {
    const fieldId = field.id;

    if (fieldId === 'academicYear') {
      return formatAcademicYear(record[fieldId]) || '-';
    } else if (fieldId === 'studentName') {
      return record.studentName || '-';
    } else if (fieldId === 'registrationNumber') {
      return record.registrationNumber || '-';
    } else if (['regFeesDue', 'regFeesPaid', 'regFeesConcession', 'regFeesrefundAmount'].includes(fieldId)) {
      const value = parseFloat(record[fieldId] || 0);
      return value === 0 ? '0.00' : value.toFixed(2);
    } else if (fieldId === 'netFees') {
      return calculateNetFees(record);
    } else if (fieldId === 'balance') {
      return calculateBalance(record);
    } else {
      return record[fieldId] || '-';
    }
  };

  const calculateNetFees = (record) => {
    const paid = parseFloat(record.regFeesPaid || 0);
    const refund = parseFloat(record.regFeesrefundAmount || 0);
    const netFees = paid + refund;
    return netFees === 0 ? '0.00' : netFees.toFixed(2);
  };

  const calculateBalance = (record) => {
    const due = parseFloat(record.regFeesDue || 0);
    const concession = parseFloat(record.regFeesConcession || 0);
    const paid = parseFloat(record.regFeesPaid || 0);
    const refund = parseFloat(record.regFeesrefundAmount || 0);
    const balance =  concession + paid + refund;
    return balance === 0 ? '0.00' : balance.toFixed(2);
  };

  const filteredData = feeData.filter((record) => {
    // const matchesAcademicYear = selectedAcademicYear ? record.academicYear === selectedAcademicYear : true;
    const matchesSearchTerm = searchTerm
      ? Object.values(record).some((value) =>
          value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;
    const matchesPaymentMode =
      selectedPaymentModes.length === 0 ||
      selectedPaymentModes.some((mode) => record.regFeesPaymentMode === mode.value);
    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => record.className === cls.value);
    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.some((status) => record.regFeesStatus === status.value);
    const matchesDate =
      (!startDate && !endDate) ||
      (record.regFeesDate !== '-' &&
        (() => {
          const dateString = record.regFeesDate;
          if (!dateString || !/^\d{2}-\d{2}-\d{4}$/.test(dateString)) return false;
          const [day, month, year] = dateString.split('-');
          const recordDate = new Date(`${year}-${month}-${day}`);
          if (isNaN(recordDate.getTime())) return false;
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;
          return (!start || recordDate >= start) && (!end || recordDate <= end);
        })());

    return  matchesSearchTerm && matchesPaymentMode && matchesClass && matchesStatus && matchesDate;
  });

  const groupedByDate = filteredData.reduce((acc, record) => {
    const date = record.regFeesDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(record);
    return acc;
  }, {});

  const totals = filteredData.reduce(
    (acc, record) => {
      const due = parseFloat(record.regFeesDue || 0);
      const paid = parseFloat(record.regFeesPaid || 0);
      const concession = parseFloat(record.regFeesConcession || 0);
      const refund = parseFloat(record.regFeesrefundAmount || 0);
      const netFees = paid + refund;
      const balance = concession + paid + refund;
      return {
        feesDue: acc.feesDue + due,
        feesPaid: acc.feesPaid + paid,
        refund: acc.refund + refund,
        netFees: acc.netFees + netFees,
        concession: acc.concession + concession,
        balance: acc.balance + balance,
      };
    },
    { feesDue: 0, feesPaid: 0, refund: 0, netFees: 0, concession: 0, balance: 0 }
  );

  const totalRecords = Object.keys(groupedByDate).reduce((sum, date) => sum + groupedByDate[date].length, 0);
  const totalPages = rowsPerPage === 'all' ? 1 : Math.ceil(totalRecords / rowsPerPage);

  const maxPagesToShow = 5;
  const pagesToShow = [];
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  const paginatedData = () => {
    const sortedDates = Object.keys(groupedByDate).sort();
    let currentCount = 0;
    const startIndex = rowsPerPage === 'all' ? 0 : (currentPage - 1) * rowsPerPage;
    const endIndex = rowsPerPage === 'all' ? totalRecords : startIndex + rowsPerPage;
    const paginated = [];

    for (const date of sortedDates) {
      const records = groupedByDate[date];
      for (const record of records) {
        if (currentCount >= startIndex && currentCount < endIndex) {
          paginated.push({ date, record });
        }
        currentCount++;
        if (currentCount >= endIndex) break;
      }
      if (currentCount >= endIndex) break;
    }

    return paginated;
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
                    <input
                      type="text"
                      className="form-control border border-dark"
                      placeholder="Search by any field"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
                    <Select
                      isClearable
                      name="rowsPerPage"
                      placeholder="Show"
                      options={pageShowOptions}
                      value={pageShowOptions.find((option) => option.value === rowsPerPage || (option.value === 'all' && rowsPerPage === feeData.length))}
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
                        className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
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
                              setIsExporting(true);
                              try {
                                await exportToExcel(
                                  filteredData,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  calculateBalance,
                                  {
                                    feesDue: totals.feesDue.toFixed(2),
                                    feesPaid: totals.feesPaid.toFixed(2),
                                    refund: totals.refund.toFixed(2),
                                    netFees: totals.netFees.toFixed(2),
                                    concession: totals.concession.toFixed(2),
                                    balance: totals.balance.toFixed(2),
                                  },
                                  formatAcademicYear,
                                  selectedAcademicYear
                                );
                              } catch (err) {
                                toast.error("Export to Excel failed.");
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
                              setIsExporting(true);
                              try {
                                await exportToPDF(
                                  filteredData,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  calculateBalance,
                                  {
                                    feesDue: totals.feesDue.toFixed(2),
                                    feesPaid: totals.feesPaid.toFixed(2),
                                    refund: totals.refund.toFixed(2),
                                    netFees: totals.netFees.toFixed(2),
                                    concession: totals.concession.toFixed(2),
                                    balance: totals.balance.toFixed(2),
                                  },
                                  formatAcademicYear,
                                  selectedAcademicYear,
                                  school,
                                  logoSrc
                                );
                              } catch (err) {
                                toast.error("Export to PDF failed.");
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
                      <ul className="nav nav-tabs mb-0 justify-content-center">
                        {tabs.map((tab) => (
                          <li className="nav-item" key={tab}>
                            <Link
                              className={`nav-link fw-bold ${activeTab === tab ? 'active' : ''}`}
                              onClick={() => setActiveTab(tab)}
                            >
                              {tab}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="tab-content mt-2">
                        {activeTab === 'Date' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-4">
                              <label className="form-label">Start Date </label>
                              <input
                                type="date"
                                className="form-control"
                                value={startDate}
                                onChange={(e) => {
                                  setStartDate(e.target.value);
                                  setCurrentPage(1);
                                }}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">End Date </label>
                              <input
                                type="date"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => {
                                  setEndDate(e.target.value);
                                  setCurrentPage(1);
                                }}
                              />
                            </div>
                          </div>
                        )}
                        {activeTab === 'Payment Mode' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="paymentMode"
                                options={paymentModes}
                                value={selectedPaymentModes}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Payment Modes"
                                className="mt-2"
                              />
                            </div>
                          </div>
                        )}
                        {activeTab === 'Class' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="class"
                                options={classOptions}
                                value={selectedClasses}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Classes"
                                className="mt-2"
                              />
                            </div>
                          </div>
                        )}
                        {activeTab === 'Academic Year' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                name="academicYear"
                                options={academicYearOptions}
                                value={academicYearOptions.find((option) => option.value === selectedAcademicYear)}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Academic Year"
                                className="mt-2"
                              />
                            </div>
                          </div>
                        )}
                        {activeTab === 'Status' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="status"
                                options={statusOptions}
                                value={selectedStatuses}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Statuses"
                                className="mt-2"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-end mt-3">
                        <button className="btn btn-secondary me-2" onClick={resetFilters}>
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Registration Fees Report</h2>
                </div>
              </div>
              {isLoading || loadingYears ? (
                <div className="text-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Loading data...</p>
                </div>
              ) : tableFields.length > 0 ? (
                <>
                  <div className="table-responsive pb-4 mt-3">
                    <table className="table text-dark border border-secondary mb-1">
                      <thead>
                        <tr className="payroll-table-header">
                          {tableFields.map((field) => (
                            <th key={field.id} className="text-center align-middle border border-secondary text-nowrap p-2">
                              {field.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData().length > 0 ? (
                          paginatedData().map(({ date, record }, index) => (
                            <tr
                              key={`${record.registrationNumber}_${record.academicYear}_${record.regFeesStatus}_${index}`}
                              className="payroll-table-row"
                            >
                              {tableFields.map((field) => (
                                <td
                                  key={field.id}
                                  className="text-center align-middle border border-secondary text-nowrap p-2"
                                >
                                  {getFieldValue(record, field)}
                                </td>
                              ))}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={tableFields.length} className="text-center">
                              No data matches the selected filters for {formatAcademicYear(selectedAcademicYear)}.
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="payroll-table-footer">
                          <td colSpan={tableFields.length - 6} className="text-right border border-secondary p-2">
                            <strong>Total</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.feesDue.toFixed(2)}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.feesPaid.toFixed(2)}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.refund.toFixed(2)}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.netFees.toFixed(2)}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.concession.toFixed(2)}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.balance.toFixed(2)}</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  {totalRecords > 0 && rowsPerPage !== 'all' && (
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
                </>
              ) : (
                <div className="text-center mt-3">
                  <p>No table fields available. Please configure in settings.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFees;