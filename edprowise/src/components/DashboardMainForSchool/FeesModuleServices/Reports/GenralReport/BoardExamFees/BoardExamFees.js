// import React, { useState, useEffect, useRef } from 'react';
// import { FaFilter, FaDownload } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import CreatableSelect from 'react-select/creatable';
// import Select from 'react-select';
// import getAPI from '../../../../../../api/getAPI';
// import { Link } from 'react-router-dom';
// import { exportToExcel, exportToPDF } from './ExportModalBoardExam';
// import { fetchSchoolData } from '../../../PdfUtlisReport';

// const BoardExamFees = () => {
//   const headerMapping = {
//     boardExamFeesDate: 'Date',
//     academicYear: 'Academic Year',
//     admNo: 'Adm No.',
//     studentName: 'Name',
//     class: 'Class',
//     section: 'Section',
//     boardExamFeesFeesStatus: 'Status',
//     boardExamFeesPaymentMode: 'Payment Mode',
//     boardExamFeesTransactionNo: 'Cheque No./Transaction No.',
//     boardExamFeesReceiptNo: 'Receipts No.',
//     boardExamFeesDue: 'Fees Due',
//     boardExamFeesPaid: 'Fees Paid',
//     boardExamFeesConcession: 'Concession',
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
//   const [classSectionMap, setClassSectionMap] = useState({});
//   const [tableFields] = useState(
//     Object.keys(headerMapping).map((key) => ({
//       id: key,
//       label: headerMapping[key],
//     }))
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingYears, setLoadingYears] = useState(false);
//   const [isExporting, setIsExporting] = useState(false);
//   const [classOptions, setClassOptions] = useState([]);
//   const [sectionOptions, setSectionOptions] = useState([]);
//   const [academicYearOptions, setAcademicYearOptions] = useState([]);
//   const [academicYears, setAcademicYears] = useState([]);
//   const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
//   const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [selectedSections, setSelectedSections] = useState([]);
//   const [selectedStatuses, setSelectedStatuses] = useState([]);
//   const [selectedYears, setSelectedYears] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState('all');
//   const dropdownRef = useRef(null);

//   const tabs = ['Date', 'Academic Year', 'Class & Section', 'Payment Mode', 'Status'];
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
//     return `${startYear}-${endYear.slice(-2)}`;
//   };

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId) {
//       console.error('School ID not found. Please log in again.');
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
//             const latestYear = years[years.length - 1];
//             setSelectedAcademicYear(latestYear);
//             localStorage.setItem('selectedAcademicYear', latestYear);
//             setSelectedYears([{ value: latestYear, label: formatAcademicYear(latestYear) }]);
//           }
//         } else {
//           console.error('No academic years found.');
//         }
//       } catch (err) {
//         console.error('Error fetching academic years.');
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
//     if (!schoolId) return;
//     const yearsToFetch = selectedYears.length > 0
//       ? selectedYears.map((year) => year.value)
//       : [selectedAcademicYear];
//     if (yearsToFetch[0]) {
//       fetchFeeData(yearsToFetch);
//     }
//   }, [schoolId, selectedAcademicYear, selectedYears, academicYears]);

//   useEffect(() => {
//     if (Object.keys(classSectionMap).length === 0) {
//       const sections = new Set(feeData.map(record => record.sectionName).filter(sec => sec && sec !== '-'));
//       setSectionOptions(Array.from(sections).map(sec => ({ value: sec, label: sec })));
//       if (selectedClasses.length === 0) {
//         setSelectedSections([]);
//       }
//       return;
//     }

//     let validSections = new Set();
//     if (selectedClasses.length === 0) {
//       Object.values(classSectionMap).forEach(sectionSet => {
//         sectionSet.forEach(section => validSections.add(section));
//       });
//       setSelectedSections([]);
//     } else {
//       selectedClasses.forEach(cls => {
//         const sectionsForClass = classSectionMap[cls.value] || new Set();
//         sectionsForClass.forEach(section => validSections.add(section));
//       });
//     }

//     const newSectionOptions = Array.from(validSections).map(sec => ({ value: sec, label: sec }));
//     setSectionOptions(newSectionOptions);

//     const validSectionValues = new Set(newSectionOptions.map(opt => opt.value));
//     const updatedSelectedSections = selectedSections.filter(sec => validSectionValues.has(sec.value));
//     if (updatedSelectedSections.length !== selectedSections.length) {
//       setSelectedSections(updatedSelectedSections);
//     }
//   }, [selectedClasses, classSectionMap, feeData]);

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

//   const fetchFeeData = async (years) => {
//     setIsLoading(true);
//     try {
//       const classSectionMapping = {};
//       const promises = years.map((year) =>
//         getAPI(`/get-all-data-board-exam?schoolId=${schoolId}&academicYear=${year}`)
//       );
//       const responses = await Promise.all(promises);
//       const unifiedData = responses.flatMap((res, index) => {
//         if (!res?.data?.data?.[years[index]]) {
//           console.warn(`No data found for year ${years[index]}`);
//           return [];
//         }
//         return res.data.data[years[index]].flatMap((record) => {
//           const className = record.className || '-';
//           const sectionName = record.sectionName || '-';
//           if (className !== '-' && sectionName !== '-') {
//             if (!classSectionMapping[className]) {
//               classSectionMapping[className] = new Set();
//             }
//             classSectionMapping[className].add(sectionName);
//           }
//           const statuses = record.student?.boardExamFeesFeesStatus && record.student.boardExamFeesFeesStatus !== '-'
//             ? record.student.boardExamFeesFeesStatus
//             : ['Paid'];
//           return statuses.map((status) => ({
//             ...record,
//             academicYear: years[index],
//             className: record.className || '-',
//             sectionName: record.sectionName || '-',
//             student: {
//               ...record.student,
//               boardExamFeesFeesStatus: [status],
//             },
//           }));
//         });
//       });

//       unifiedData.sort((a, b) => {
//         const admNoA = a.student?.admissionNo || '-';
//         const admNoB = b.student?.admissionNo || '-';
//         const dateA = a.student?.boardExamFeesFeesStatus.includes('Cancelled') || a.student?.boardExamFeesFeesStatus.includes('Cheque Return')
//           ? a.student.boardExamFeesCancelledDate
//           : a.student.boardExamFeesDate || '-';
//         const dateB = b.student?.boardExamFeesFeesStatus.includes('Cancelled') || b.student?.boardExamFeesFeesStatus.includes('Cheque Return')
//           ? b.student.boardExamFeesCancelledDate
//           : b.student.boardExamFeesDate || '-';
//         const statusA = a.student.boardExamFeesFeesStatus[0];
//         const statusB = b.student.boardExamFeesFeesStatus[0];

//         if (dateA !== dateB) return dateA.localeCompare(dateB);
//         if (statusA === 'Paid' && statusB !== 'Paid') return -1;
//         if (statusB === 'Paid' && statusA !== 'Paid') return 1;
//         return admNoA.localeCompare(admNoB);
//       });

//       setFeeData(unifiedData);
//       setClassSectionMap(classSectionMapping);

//       const modes = new Set();
//       const statuses = new Set();
//       unifiedData.forEach((record) => {
//         if (record.student?.boardExamFeesPaymentMode) modes.add(record.student.boardExamFeesPaymentMode);
//         if (record.student?.boardExamFeesFeesStatus) {
//           record.student.boardExamFeesFeesStatus.forEach((status) => statuses.add(status));
//         }
//       });
//       setPaymentModes(
//         Array.from(modes)
//           .filter((mode) => mode && mode !== '-')
//           .map((mode) => ({ value: mode, label: mode }))
//       );
//       setStatusOptions(
//         Array.from(statuses)
//           .filter((status) => status && status !== '-')
//           .map((status) => ({ value: status, label: status }))
//       );

//       const classes = new Set(unifiedData.map((record) => record.className).filter((cls) => cls && cls !== '-'));
//       setClassOptions(
//         Array.from(classes).map((cls) => ({ value: cls, label: cls }))
//       );

//       const sections = new Set(unifiedData.map((record) => record.sectionName).filter((sec) => sec && sec !== '-'));
//       setSectionOptions(
//         Array.from(sections).map((sec) => ({ value: sec, label: sec }))
//       );

//       if (rowsPerPage === 'all' && unifiedData.length > 0) {
//         setRowsPerPage(unifiedData.length);
//       }
//     } catch (error) {
//       console.error('Error initializing data: ' + error.message);
//       setFeeData([]);
//       setClassSectionMap({});
//       setPaymentModes([]);
//       setStatusOptions([]);
//       setClassOptions([]);
//       setSectionOptions([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSelectChange = (selectedOptions, { name }) => {
//     if (name === 'academicYear') {
//       setSelectedYears(selectedOptions || []);
//       setCurrentPage(1);
//     } else if (name === 'paymentMode') {
//       setSelectedPaymentModes(selectedOptions || []);
//       setCurrentPage(1);
//     } else if (name === 'class') {
//       setSelectedClasses(selectedOptions || []);
//       setCurrentPage(1);
//     } else if (name === 'section') {
//       setSelectedSections(selectedOptions || []);
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

//   const applyFilters = () => {
//     setShowFilterPanel(false);
//     const yearsToFetch = selectedYears.length > 0
//       ? selectedYears.map((year) => year.value)
//       : [selectedAcademicYear];
//     fetchFeeData(yearsToFetch);
//   };

//   const resetFilters = () => {
//     setSelectedYears([]);
//     setSelectedPaymentModes([]);
//     setSelectedClasses([]);
//     setSelectedSections([]);
//     setSelectedStatuses([]);
//     setStartDate('');
//     setEndDate('');
//     setSearchTerm('');
//     setCurrentPage(1);
//     setRowsPerPage('all');
//     fetchFeeData([selectedAcademicYear]);
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
//     const isCancelledOrChequeReturn = record.student?.boardExamFeesFeesStatus.includes('Cancelled') || record.student?.boardExamFeesFeesStatus.includes('Cheque Return');
//     if (fieldId === 'academicYear') {
//       return formatAcademicYear(record[fieldId]) || '-';
//     } else if (fieldId === 'studentName') {
//       return record.student?.studentName || '-';
//     } else if (fieldId === 'admNo') {
//       return record.student?.admissionNo || '-';
//     } else if (fieldId === 'class') {
//       return record.className || '-';
//     } else if (fieldId === 'section') {
//       return record.sectionName || '-';
//     } else if (fieldId === 'boardExamFeesDate') {
//       if (isCancelledOrChequeReturn) {
//         const cancelledDate = record.student?.boardExamFeesCancelledDate;
//         if (cancelledDate && /^\d{2}-\d{2}-\d{4}$/.test(cancelledDate)) {
//           return cancelledDate;
//         }
//         return '-';
//       }
//       return record.student?.boardExamFeesDate || '-';
//     } else if (fieldId === 'boardExamFeesFeesStatus') {
//       return record.student?.boardExamFeesFeesStatus.join(', ') || '-';
//     } else if (['boardExamFeesDue', 'boardExamFeesPaid', 'boardExamFeesConcession'].includes(fieldId)) {
//       const value = parseFloat(record.student?.[fieldId] || 0);
//       if (value === 0) return '0.00';
//       return isCancelledOrChequeReturn ? `-${value.toFixed(2)}` : value.toFixed(2);
//     } else {
//       return record.student?.[fieldId] || record[fieldId] || '-';
//     }
//   };

//   const calculateBalance = (record) => {
//     const due = parseFloat(record.student?.boardExamFeesDue || 0);
//     const concession = parseFloat(record.student?.boardExamFeesConcession || 0);
//     const paid = parseFloat(record.student?.boardExamFeesPaid || 0);
//     const balance = due - concession - paid;
//     const isCancelledOrChequeReturn = record.student?.boardExamFeesFeesStatus.includes('Cancelled') || record.student?.boardExamFeesFeesStatus.includes('Cheque Return');
//     if (balance === 0) return '0.00';
//     return isCancelledOrChequeReturn ? `-${balance.toFixed(2)}` : balance.toFixed(2);
//   };

//   const filteredData = feeData.filter((record) => {
//     const hasValidAdmissionNo = record.student?.admissionNo && record.student.admissionNo !== '-';
//     const hasFeesDue = parseFloat(record.student?.boardExamFeesDue || 0) > 0;
//     if (!hasValidAdmissionNo || !hasFeesDue) return false;

//     const matchesSearchTerm = searchTerm
//       ? Object.values(record).some((value) =>
//           value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
//         ) ||
//         Object.values(record.student || {}).some((value) =>
//           value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       : true;

//     const matchesPaymentMode =
//       selectedPaymentModes.length === 0 ||
//       selectedPaymentModes.some((mode) => record.student?.boardExamFeesPaymentMode === mode.value);

//     const matchesClass =
//       selectedClasses.length === 0 ||
//       selectedClasses.some((cls) => record.className === cls.value);

//     const matchesSection =
//       selectedSections.length === 0 ||
//       selectedSections.some((sec) => record.sectionName === sec.value);

//     const matchesYear =
//       selectedYears.length === 0 ||
//       selectedYears.some((year) => record.academicYear === year.value);

//     const matchesStatus =
//       selectedStatuses.length === 0 ||
//       selectedStatuses.some((status) => record.student?.boardExamFeesFeesStatus.includes(status.value));

//     const matchesDate =
//       (!startDate && !endDate) ||
//       ((record.student?.boardExamFeesDate !== '-' || record.student?.boardExamFeesCancelledDate !== '-') &&
//         (() => {
//           const dateString = record.student?.boardExamFeesFeesStatus.includes('Cancelled') || record.student?.boardExamFeesFeesStatus.includes('Cheque Return')
//             ? record.student.boardExamFeesCancelledDate
//             : record.student.boardExamFeesDate;
//           if (!dateString || !/^\d{2}-\d{2}-\d{4}$/.test(dateString)) return false;
//           const [day, month, year] = dateString.split('-');
//           const recordDate = new Date(`${year}-${month}-${day}`);
//           if (isNaN(recordDate.getTime())) return false;
//           const start = startDate ? new Date(startDate) : null;
//           const end = endDate ? new Date(endDate) : null;
//           return (!start || recordDate >= start) && (!end || recordDate <= end);
//         })());

//     return (
//       matchesSearchTerm &&
//       matchesPaymentMode &&
//       matchesClass &&
//       matchesSection &&
//       matchesYear &&
//       matchesStatus &&
//       matchesDate
//     );
//   });

//   const groupedByDate = filteredData.reduce((acc, record) => {
//     const date = record.student?.boardExamFeesFeesStatus.includes('Cancelled') || record.student?.boardExamFeesFeesStatus.includes('Cheque Return')
//       ? record.student.boardExamFeesCancelledDate
//       : record.student.boardExamFeesDate;
//     if (!acc[date]) acc[date] = [];
//     acc[date].push(record);
//     return acc;
//   }, {});

//   const totals = filteredData.reduce(
//     (acc, record) => {
//       const due = parseFloat(record.student?.boardExamFeesDue || 0);
//       const paid = parseFloat(record.student?.boardExamFeesPaid || 0);
//       const concession = parseFloat(record.student?.boardExamFeesConcession || 0);
//       const balance = due - concession - paid;
//       const isCancelledOrChequeReturn = record.student?.boardExamFeesFeesStatus.includes('Cancelled') || record.student?.boardExamFeesFeesStatus.includes('Cheque Return');
//       const multiplier = isCancelledOrChequeReturn ? -1 : 1;
//       return {
//         feesDue: acc.feesDue + (due !== 0 ? due * multiplier : due),
//         feesPaid: acc.feesPaid + (paid !== 0 ? paid * multiplier : paid),
//         concession: acc.concession + (concession !== 0 ? concession * multiplier : concession),
//         balance: acc.balance + (balance !== 0 ? balance * multiplier : balance),
//       };
//     },
//     { feesDue: 0, feesPaid: 0, concession: 0, balance: 0 }
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
//                         className="py-1 px-2 mr-2 border border-dark finance-filter-icon"
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
//                                     balance: totals.balance.toFixed(2),
//                                   },
//                                   formatAcademicYear,
//                                   selectedYears.length > 0
//                                     ? selectedYears.map((y) => y.value).join(',')
//                                     : selectedAcademicYear
//                                 );
//                               } catch (err) {
//                                 console.error("Export to Excel failed.");
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
//                                     balance: totals.balance.toFixed(2),
//                                   },
//                                   formatAcademicYear,
//                                   selectedYears.length > 0
//                                     ? selectedYears.map((y) => y.value).join(',')
//                                     : selectedAcademicYear,
//                                   school,
//                                   logoSrc
//                                 );
//                               } catch (err) {
//                                 console.error("Export to PDF failed.");
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
//                               <label className="form-label">Start Date</label>
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
//                               <label className="form-label">End Date</label>
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

//                         {activeTab === 'Class & Section' && (
//                           <div className="row d-flex justify-content-center">
//                             <div className="col-md-4">
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
//                             <div className="col-md-4">
//                               <CreatableSelect
//                                 isMulti
//                                 name="section"
//                                 options={sectionOptions}
//                                 value={selectedSections}
//                                 onChange={(selected, action) => handleSelectChange(selected, action)}
//                                 placeholder="Select Sections"
//                                 className="mt-2"
//                                 isDisabled={selectedClasses.length === 0}
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

//                         {activeTab === 'Academic Year' && (
//                           <div className="row d-lg-flex justify-content-center">
//                             <div className="col-md-8">
//                               <CreatableSelect
//                                 isMulti
//                                 name="academicYear"
//                                 options={academicYearOptions}
//                                 value={selectedYears}
//                                 onChange={(selected, action) => handleSelectChange(selected, action)}
//                                 placeholder="Select Academic Years"
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
//                         <button className="btn btn-primary" onClick={applyFilters}>
//                           Close Filters
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="container">
//                 <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                   <h2 className="payroll-title text-center mb-0 flex-grow-1">Board Exam Fees Report</h2>
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
//                             <th
//                               key={field.id}
//                               className="text-center align-content-center border border-secondary text-nowrap p-2"
//                             >
//                               {headerMapping[field.id] || field.label}
//                             </th>
//                           ))}
//                           <th className="text-center align-content-center border border-secondary text-nowrap p-2">
//                             Balance
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {paginatedData().length > 0 ? (
//                           paginatedData().map(({ date, record }, index) => (
//                             <tr
//                               key={`${record.student?.admissionNo}_${record.student?.regNo}_${record.academicYear}_${record.student.boardExamFeesFeesStatus[0]}_${index}`}
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
//                               No data matches the selected filters for {selectedYears.map((y) => formatAcademicYear(y.value)).join(', ') || formatAcademicYear(selectedAcademicYear)}.
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                       <tfoot>
//                         <tr className="payroll-table-footer">
//                           <td
//                             colSpan={tableFields.length - 3}
//                             className="text-right border border-secondary p-2"
//                           >
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
//                   <p>No table fields available.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoardExamFees;


import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import getAPI from '../../../../../../api/getAPI';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from './ExportModalBoardExam';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const BoardExamFees = () => {
  const headerMapping = {
    boardExamFeesDate: 'Date',
    academicYear: 'Academic Year',
    admissionNumber: 'Adm No.',
    studentName: 'Name',
    className: 'Class',
    sectionName: 'Section',
    boardExamFeesStatus: 'Status',
    boardExamFeesPaymentMode: 'Payment Mode',
    boardExamFeesTransactionNo: 'Cheque No./Transaction No.',
    boardExamFeesReceiptNo: 'Receipts No.',
    boardExamFeesPaid: 'Fees Paid',
    boardExamFeesRefundAmount: 'Refund/Cancelled',
    boardExamFeesConcession: 'Concession',
  };

  const [tableFields] = useState([
    { id: 'boardExamFeesDate', label: 'Date' },
    { id: 'academicYear', label: 'Academic Year' },
    { id: 'admissionNumber', label: 'Adm No.' },
    { id: 'studentName', label: 'Name' },
    { id: 'className', label: 'Class' },
    { id: 'sectionName', label: 'Section' },
    { id: 'boardExamFeesStatus', label: 'Status' },
    { id: 'boardExamFeesPaymentMode', label: 'Payment Mode' },
    { id: 'boardExamFeesTransactionNo', label: 'Cheq/Tran No.' },
    { id: 'boardExamFeesReceiptNo', label: 'Receipts No.' },
    { id: 'boardExamFeesPaid', label: 'Fees Paid' },
    { id: 'boardExamFeesRefundAmount', label: 'CRN' },
    { id: 'netFees', label: 'Net Fees' },
    { id: 'boardExamFeesConcession', label: 'Concession' },
    { id: 'balance', label: 'Balance' },
  ]);

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
  const [classSectionMap, setClassSectionMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const dropdownRef = useRef(null);

  const tabs = ['Date', 'Academic Year', 'Class & Section', 'Payment Mode', 'Status'];
  const pageShowOptions = [
    // { value: 'all', label: 'All' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
  ];

  const formatAcademicYear = (year) => {
    if (!year) return '-';
    const [startYear, endYear] = year.split('-');
    return `${startYear}-${endYear.slice(-2)}`;
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      console.error('School ID not found. Please log in again.');
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
        } else {
          console.error('No academic years found.');
        }
      } catch (err) {
        console.error('Error fetching academic years.');
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

  // useEffect(() => {
  //   if (!schoolId) return;
  //   const yearsToFetch = selectedYears.length > 0
  //     ? selectedYears.map((year) => year.value)
  //     : [selectedAcademicYear];
  //   if (yearsToFetch[0]) {
  //     fetchFeeData(yearsToFetch);
  //   }
  // }, [schoolId, selectedAcademicYear, selectedYears]);

  useEffect(() => {
    if (Object.keys(classSectionMap).length === 0) {
      const sections = new Set(feeData.map(record => record.sectionName).filter(sec => sec && sec !== '-'));
      setSectionOptions(Array.from(sections).map(sec => ({ value: sec, label: sec })));
      if (selectedClasses.length === 0) {
        setSelectedSections([]);
      }
      return;
    }

    let validSections = new Set();
    if (selectedClasses.length === 0) {
      Object.values(classSectionMap).forEach(sectionSet => {
        sectionSet.forEach(section => validSections.add(section));
      });
      setSelectedSections([]);
    } else {
      selectedClasses.forEach(cls => {
        const sectionsForClass = classSectionMap[cls.value] || new Set();
        sectionsForClass.forEach(section => validSections.add(section));
      });
    }

    const newSectionOptions = Array.from(validSections).map(sec => ({ value: sec, label: sec }));
    setSectionOptions(newSectionOptions);

    const validSectionValues = new Set(newSectionOptions.map(opt => opt.value));
    const updatedSelectedSections = selectedSections.filter(sec => validSectionValues.has(sec.value));
    if (updatedSelectedSections.length !== selectedSections.length) {
      setSelectedSections(updatedSelectedSections);
    }
  }, [selectedClasses, classSectionMap, feeData]);

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

  // const fetchFeeData = async (years) => {
  //   setIsLoading(true);
  //   try {
  //     const classSectionMapping = {};
  //     const promises = years.map((year) =>
  //       getAPI(`/get-all-data-board-exam?schoolId=${schoolId}&academicYear=${year}`)
  //     );
  //     const responses = await Promise.all(promises);
  //     const unifiedData = responses.flatMap((res, index) => {
  //       if (!res?.data?.data?.[years[index]]) {
  //         console.warn(`No data found for year ${years[index]}`);
  //         return [];
  //       }
  //       return res.data.data[years[index]].map((record) => {
  //         const className = record.className || '-';
  //         const sectionName = record.sectionName || '-';
  //         if (className !== '-' && sectionName !== '-') {
  //           if (!classSectionMapping[className]) {
  //             classSectionMapping[className] = new Set();
  //           }
  //           classSectionMapping[className].add(sectionName);
  //         }
  //         return {
  //           recordType: record.recordType || 'Board Exam Fee',
  //           academicYear: years[index],
  //           admissionNumber: record.admissionNumber || '-',
  //           studentName: `${record.firstName || '-'} ${record.lastName || '-'}`.trim() || '-',
  //           className,
  //           sectionName,
  //           boardExamFeesDate: record.boardExamFeesDate || '-',
  //           boardExamFeesCancelledDate: record.boardExamFeesCancelledDate || '-',
  //           boardExamFeesPaymentMode: record.boardExamFeesPaymentMode || '-',
  //           boardExamFeesTransactionNo: record.boardExamFeesTransactionNo || '-',
  //           boardExamFeesReceiptNo: record.boardExamFeesReceiptNo || '-',
  //           boardExamFeesStatus: Array.isArray(record.boardExamFeesStatus) ? record.boardExamFeesStatus : (record.boardExamFeesStatus || 'Paid').split(',').map(s => s.trim()).filter(s => s),
  //           boardExamFeesDue: record.boardExamFeesDue || '0',
  //           boardExamFeesPaid: record.boardExamFeesPaid || '0',
  //           boardExamFeesConcession: record.boardExamFeesConcession || '0',
  //           boardExamFeesRefundAmount: record.boardExamFeesRefundAmount || '0',
  //           boardExamFeesCancelledAmount: record.boardExamFeesCancelledAmount || '0',
  //         };
  //       });
  //     });

  //     unifiedData.sort((a, b) => {
  //       const dateA = a.boardExamFeesStatus.includes('Cancelled') || a.boardExamFeesStatus.includes('Cheque Return')
  //         ? (a.boardExamFeesCancelledDate !== '-' ? a.boardExamFeesCancelledDate : a.boardExamFeesDate)
  //         : a.boardExamFeesDate || '-';
  //       const dateB = b.boardExamFeesStatus.includes('Cancelled') || b.boardExamFeesStatus.includes('Cheque Return')
  //         ? (b.boardExamFeesCancelledDate !== '-' ? b.boardExamFeesCancelledDate : b.boardExamFeesDate)
  //         : b.boardExamFeesDate || '-';
  //       const admNoA = a.admissionNumber || '-';
  //       const admNoB = b.admissionNumber || '-';
  //       const statusA = a.boardExamFeesStatus[0];
  //       const statusB = b.boardExamFeesStatus[0];

  //       if (dateA !== dateB) return dateA.localeCompare(dateB);
  //       if (statusA === 'Paid' && statusB !== 'Paid') return -1;
  //       if (statusB === 'Paid' && statusA !== 'Paid') return 1;
  //       return admNoA.localeCompare(admNoB);
  //     });

  //     setFeeData(unifiedData);
  //     setClassSectionMap(classSectionMapping);

  //     const modes = new Set();
  //     const statuses = new Set();
  //     unifiedData.forEach((record) => {
  //       if (record.boardExamFeesPaymentMode) modes.add(record.boardExamFeesPaymentMode);
  //       if (record.boardExamFeesStatus) {
  //         record.boardExamFeesStatus.forEach((status) => statuses.add(status));
  //       }
  //     });
  //     setPaymentModes(
  //       Array.from(modes)
  //         .filter((mode) => mode && mode !== '-')
  //         .map((mode) => ({ value: mode, label: mode }))
  //     );
  //     setStatusOptions(
  //       Array.from(statuses)
  //         .filter((status) => status && status !== '-')
  //         .map((status) => ({ value: status, label: status }))
  //     );

  //     const classes = new Set(unifiedData.map((record) => record.className).filter((cls) => cls && cls !== '-'));
  //     setClassOptions(
  //       Array.from(classes).map((cls) => ({ value: cls, label: cls }))
  //     );

  //     const sections = new Set(unifiedData.map((record) => record.sectionName).filter((sec) => sec && sec !== '-'));
  //     setSectionOptions(
  //       Array.from(sections).map((sec) => ({ value: sec, label: sec }))
  //     );

  //     if (rowsPerPage === 'all' && unifiedData.length > 0) {
  //       setRowsPerPage(unifiedData.length);
  //     }
  //   } catch (error) {
  //     console.error('Error initializing data: ' + error.message);
  //     setFeeData([]);
  //     setClassSectionMap({});
  //     setPaymentModes([]);
  //     setStatusOptions([]);
  //     setClassOptions([]);
  //     setSectionOptions([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

useEffect(() => {
  if (!schoolId) return;

  const academicYear = startDate
    ? selectedAcademicYear
    : (selectedAcademicYear || localStorage.getItem('selectedAcademicYear'));

  const fetchFeeData = async () => {
    setIsLoading(true);
    try {
      const classSectionMapping = {};

 
      let apiUrl = `/get-all-data-board-exam?schoolId=${schoolId}`;

      if (startDate && endDate) {
        apiUrl += `&startdate=${startDate}&enddate=${endDate}`;
      }

      if (academicYear) {
        apiUrl += `&academicYear=${academicYear}`;
      }

   
      const response = await getAPI(apiUrl);

      const data = response?.data?.data;
      if (!data || !data[academicYear]) {
        console.warn(`No data found for academic year ${academicYear}`);
        setFeeData([]);
        setClassSectionMap({});
        setPaymentModes([]);
        setStatusOptions([]);
        setClassOptions([]);
        setSectionOptions([]);
        return;
      }

      const unifiedData = data[academicYear].map((record) => {
        const className = record.className || '-';
        const sectionName = record.sectionName || '-';

        if (className !== '-' && sectionName !== '-') {
          if (!classSectionMapping[className]) {
            classSectionMapping[className] = new Set();
          }
          classSectionMapping[className].add(sectionName);
        }

        return {
          recordType: record.recordType || 'Board Exam Fee',
          academicYear,
          admissionNumber: record.admissionNumber || '-',
          studentName: `${record.firstName || '-'} ${record.lastName || '-'}`.trim() || '-',
          className,
          sectionName,
          boardExamFeesDate: record.boardExamFeesDate || '-',
          boardExamFeesCancelledDate: record.boardExamFeesCancelledDate || '-',
          boardExamFeesPaymentMode: record.boardExamFeesPaymentMode || '-',
          boardExamFeesTransactionNo: record.boardExamFeesTransactionNo || '-',
          boardExamFeesReceiptNo: record.boardExamFeesReceiptNo || '-',
          boardExamFeesStatus: Array.isArray(record.boardExamFeesStatus)
            ? record.boardExamFeesStatus
            : (record.boardExamFeesStatus || 'Paid')
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s),
          boardExamFeesDue: record.boardExamFeesDue || '0',
          boardExamFeesPaid: record.boardExamFeesPaid || '0',
          boardExamFeesConcession: record.boardExamFeesConcession || '0',
          boardExamFeesRefundAmount: record.boardExamFeesRefundAmount || '0',
          boardExamFeesCancelledAmount: record.boardExamFeesCancelledAmount || '0',
        };
      });

   
      unifiedData.sort((a, b) => {
        const dateA =
          a.boardExamFeesStatus.includes('Cancelled') || a.boardExamFeesStatus.includes('Cheque Return')
            ? (a.boardExamFeesCancelledDate !== '-' ? a.boardExamFeesCancelledDate : a.boardExamFeesDate)
            : a.boardExamFeesDate || '-';
        const dateB =
          b.boardExamFeesStatus.includes('Cancelled') || b.boardExamFeesStatus.includes('Cheque Return')
            ? (b.boardExamFeesCancelledDate !== '-' ? b.boardExamFeesCancelledDate : b.boardExamFeesDate)
            : b.boardExamFeesDate || '-';

        const admNoA = a.admissionNumber || '-';
        const admNoB = b.admissionNumber || '-';
        const statusA = a.boardExamFeesStatus[0];
        const statusB = b.boardExamFeesStatus[0];

        if (dateA !== dateB) return dateA.localeCompare(dateB);
        if (statusA === 'Paid' && statusB !== 'Paid') return -1;
        if (statusB === 'Paid' && statusA !== 'Paid') return 1;
        return admNoA.localeCompare(admNoB);
      });

 
      setFeeData(unifiedData);
      setClassSectionMap(classSectionMapping);

 
      const modes = new Set();
      const statuses = new Set();
      unifiedData.forEach((record) => {
        if (record.boardExamFeesPaymentMode) modes.add(record.boardExamFeesPaymentMode);
        if (record.boardExamFeesStatus) {
          record.boardExamFeesStatus.forEach((status) => statuses.add(status));
        }
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

      const classes = new Set(unifiedData.map((r) => r.className).filter((cls) => cls && cls !== '-'));
      setClassOptions(Array.from(classes).map((cls) => ({ value: cls, label: cls })));

      const sections = new Set(unifiedData.map((r) => r.sectionName).filter((sec) => sec && sec !== '-'));
      setSectionOptions(Array.from(sections).map((sec) => ({ value: sec, label: sec })));

      if (rowsPerPage === 'all' && unifiedData.length > 0) {
        setRowsPerPage(unifiedData.length);
      }
    } catch (error) {
      console.error('Error initializing Board Exam data:', error.message);
      setFeeData([]);
      setClassSectionMap({});
      setPaymentModes([]);
      setStatusOptions([]);
      setClassOptions([]);
      setSectionOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  fetchFeeData();
}, [schoolId, selectedAcademicYear, startDate, endDate]);


  const handleSelectChange = (selectedOptions, { name }) => {
     if (name === 'academicYear') {
      const selectedYear = selectedOptions?.value || '';
      setSelectedAcademicYear(selectedYear);
      setCurrentPage(1);
    } else if (name === 'paymentMode') {
      setSelectedPaymentModes(selectedOptions || []);
      setCurrentPage(1);
    } else if (name === 'class') {
      setSelectedClasses(selectedOptions || []);
      setCurrentPage(1);
    } else if (name === 'section') {
      setSelectedSections(selectedOptions || []);
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

  // const applyFilters = () => {
  //   setShowFilterPanel(false);
  //   const yearsToFetch = selectedYears.length > 0
  //     ? selectedYears.map((year) => year.value)
  //     : [selectedAcademicYear];
  //   fetchFeeData(yearsToFetch);
  // };

  const resetFilters = () => {
    setSelectedYears([]);
    setSelectedPaymentModes([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setSelectedStatuses([]);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setCurrentPage(1);
    setRowsPerPage('all');
       setSelectedAcademicYear(localStorage.getItem('selectedAcademicYear'));
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
    setCurrentPage(1);
  };
  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
    setShowExportDropdown(false);
  };

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
    setShowFilterPanel(false);
  };

  const calculateNetFees = (record) => {
    const paid = parseFloat(record.boardExamFeesPaid || 0);
    const refund = parseFloat(record.boardExamFeesRefundAmount || 0);
    const cancelled = parseFloat(record.boardExamFeesCancelledAmount || 0);
    const refundOrCancelled = refund > 0 ? refund : cancelled;
    const netFees = paid + refundOrCancelled;
    return netFees === 0 ? '0.00' : netFees.toFixed(2);
  };

  const getFieldValue = (record, field) => {
    const fieldId = field.id;
    const isCancelledOrChequeReturn = record.boardExamFeesStatus.includes('Cancelled') || record.boardExamFeesStatus.includes('Cheque Return');
    if (fieldId === 'academicYear') {
      return formatAcademicYear(record[fieldId]) || '-';
    } else if (fieldId === 'studentName') {
      return record.studentName || '-';
    } else if (fieldId === 'admissionNumber') {
      return record.admissionNumber || '-';
    } else if (fieldId === 'className') {
      return record.className || '-';
    } else if (fieldId === 'sectionName') {
      return record.sectionName || '-';
    } else if (fieldId === 'boardExamFeesDate') {
      if (isCancelledOrChequeReturn) {
        const cancelledDate = record.boardExamFeesCancelledDate;
        if (cancelledDate && /^\d{2}-\d{2}-\d{4}$/.test(cancelledDate)) {
          return cancelledDate;
        }
        return record.boardExamFeesDate || '-';
      }
      return record.boardExamFeesDate || '-';
    } else if (fieldId === 'boardExamFeesStatus') {
      return record.boardExamFeesStatus.join(', ') || '-';
    } else if (fieldId === 'boardExamFeesRefundAmount') {
      const refund = parseFloat(record.boardExamFeesRefundAmount || 0);
      const cancelled = parseFloat(record.boardExamFeesCancelledAmount || 0);
      const total = refund > 0 ? refund : cancelled;
      return total === 0 ? '0.00' : total.toFixed(2);
    } else if (fieldId === 'netFees') {
      return calculateNetFees(record);
    } else if (fieldId === 'balance') {
      return calculateBalance(record);
    } else if (['boardExamFeesDue', 'boardExamFeesPaid', 'boardExamFeesConcession'].includes(fieldId)) {
      const value = parseFloat(record[fieldId] || 0);
      return value === 0 ? '0.00' : value.toFixed(2);
    } else {
      return record[fieldId] || '-';
    }
  };

  const calculateBalance = (record) => {
    const due = parseFloat(record.boardExamFeesDue || 0);
    const concession = parseFloat(record.boardExamFeesConcession || 0);
    const paid = parseFloat(record.boardExamFeesPaid || 0);
    const refund = parseFloat(record.boardExamFeesRefundAmount || 0);
    const cancelled = parseFloat(record.boardExamFeesCancelledAmount || 0);
    const refundOrCancelled = refund > 0 ? refund : cancelled;
    const balance = concession + paid  + refundOrCancelled;
    return balance === 0 ? '0.00' : balance.toFixed(2);
  };

  const filteredData = feeData.filter((record) => {
    const hasValidAdmissionNo = record.admissionNumber && record.admissionNumber !== '-';
    const hasFeesDue = parseFloat(record.boardExamFeesDue || 0) > 0;
    if (!hasValidAdmissionNo || !hasFeesDue) return false;

    const matchesSearchTerm = searchTerm
      ? Object.values(record).some((value) =>
          value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    const matchesPaymentMode =
      selectedPaymentModes.length === 0 ||
      selectedPaymentModes.some((mode) => record.boardExamFeesPaymentMode === mode.value);

    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => record.className === cls.value);

    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((sec) => record.sectionName === sec.value);

    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.some((status) => record.boardExamFeesStatus.includes(status.value));

    const matchesDate =
      (!startDate && !endDate) ||
      ((record.boardExamFeesDate !== '-' || record.boardExamFeesCancelledDate !== '-') &&
        (() => {
          const dateString = record.boardExamFeesStatus.includes('Cancelled') || record.boardExamFeesStatus.includes('Cheque Return')
            ? (record.boardExamFeesCancelledDate !== '-' ? record.boardExamFeesCancelledDate : record.boardExamFeesDate)
            : record.boardExamFeesDate;
          if (!dateString || !/^\d{2}-\d{2}-\d{4}$/.test(dateString)) return false;
          const [day, month, year] = dateString.split('-');
          const recordDate = new Date(`${year}-${month}-${day}`);
          if (isNaN(recordDate.getTime())) return false;
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;
          return (!start || recordDate >= start) && (!end || recordDate <= end);
        })());

    return (
      matchesSearchTerm &&
      matchesPaymentMode &&
      matchesClass &&
      matchesSection &&
      matchesStatus &&
      matchesDate
    );
  });

  const groupedByDate = filteredData.reduce((acc, record) => {
    const date = record.boardExamFeesStatus.includes('Cancelled') || record.boardExamFeesStatus.includes('Cheque Return')
      ? (record.boardExamFeesCancelledDate !== '-' ? record.boardExamFeesCancelledDate : record.boardExamFeesDate)
      : record.boardExamFeesDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(record);
    return acc;
  }, {});

  const totals = filteredData.reduce(
    (acc, record) => {
      const due = parseFloat(record.boardExamFeesDue || 0);
      const paid = parseFloat(record.boardExamFeesPaid || 0);
      const concession = parseFloat(record.boardExamFeesConcession || 0);
      const refund = parseFloat(record.boardExamFeesRefundAmount || 0);
      const cancelled = parseFloat(record.boardExamFeesCancelledAmount || 0);
      const refundOrCancelled = refund > 0 ? refund : cancelled;
      const netFees = paid + refundOrCancelled;
      return {
        feesDue: acc.feesDue + due,
        feesPaid: acc.feesPaid + paid,
        refund: acc.refund + refundOrCancelled,
        netFees: acc.netFees + netFees,
        concession: acc.concession + concession,
        balance: acc.balance + (concession + paid  + refundOrCancelled),
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
                              <label className="form-label">Start Date</label>
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
                              <label className="form-label">End Date</label>
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

                        {activeTab === 'Class & Section' && (
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
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
                            <div className="col-md-4">
                              <CreatableSelect
                                isMulti
                                name="section"
                                options={sectionOptions}
                                value={selectedSections}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Sections"
                                className="mt-2"
                                isDisabled={selectedClasses.length === 0}
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

                        {activeTab === 'Academic Year' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                // isMulti
                                name="academicYear"
                                options={academicYearOptions}
                                  value={academicYearOptions.find((option) => option.value === selectedAcademicYear)}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Academic Years"
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
                        <button className="btn btn-primary" onClick={applyFilters}>
                          Close Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Board Exam Fees Report</h2>
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
                            <th
                              key={field.id}
                              className="text-center align-middle border border-secondary text-nowrap p-2"
                            >
                              {field.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData().length > 0 ? (
                          paginatedData().map(({ date, record }, index) => (
                            <tr
                              key={`${record.admissionNumber}_${record.academicYear}_${record.boardExamFeesStatus[0]}_${index}`}
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
                              No data matches the selected filters for { formatAcademicYear(selectedAcademicYear)}.
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="payroll-table-footer">
                          <td
                            colSpan={tableFields.length - 6}
                            className="text-right border border-secondary p-2"
                          >
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
                  <p>No table fields available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardExamFees;