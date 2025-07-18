
// import React, { useState, useEffect, useRef } from 'react';
// import { FaFilter, FaDownload } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import CreatableSelect from 'react-select/creatable';
// import getAPI from '../../../../../../api/getAPI';
// import { Link } from 'react-router-dom';
// import { exportToExcel, exportToPDF } from './ExportModalTC';
// import { fetchSchoolData } from '../../../PdfUtlisReport';

// const TCFees = () => {
//   const headerMapping = {
//     tcFeesDate: 'Date',
//     academicYear: 'Academic Year',
//     tcNo: 'TC No.',
//     studentName: 'Name',
//     class: 'Class',
//     section: 'Section',
//     tcFeesPaymentMode: 'Payment Mode',
//     tcFeesTransactionNo: 'Cheque No./Transaction No.',
//     tcFeesReceiptNo: 'Receipts No.',
//     tcFeesDue: 'Fees Due',
//     tcFeesPaid: 'Fees Paid',
//     tcFeesConcession: 'Concession',
//   };

//   const [showFilterPanel, setShowFilterPanel] = useState(false);
//   const [showExportDropdown, setShowExportDropdown] = useState(false);
//   const [activeTab, setActiveTab] = useState('Date');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [schoolId, setSchoolId] = useState('');
//   const [school, setSchool] = useState(null);
//   const [logoSrc, setLogoSrc] = useState('');
//   const [paymentModes, setPaymentModes] = useState([]);
//   const [feeData, setFeeData] = useState([]);
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
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const dropdownRef = useRef(null);

//   const tabs = ['Date', 'Payment Mode', 'Class & Section', 'Academic Year'];

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
//             const latestYear = years[years.length - 1];
//             setSelectedAcademicYear(latestYear);
//             localStorage.setItem('selectedAcademicYear', latestYear);
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
//         const feeDataRes = await getAPI(`/get-all-data-tc?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
//         if (!feeDataRes?.data) {
//           throw new Error('No TC fee data found');
//         }

//         const unifiedData = [];
//         const processedKeys = new Set();

//         const validYears = academicYears.filter((year) => {
//           const [startYear] = year.split('-').map(Number);
//           const [selectedStartYear] = selectedAcademicYear.split('-').map(Number);
//           return startYear <= selectedStartYear;
//         });

//         Object.keys(feeDataRes.data.data || {}).forEach((year) => {
//           if (!validYears.includes(year)) return;
//           feeDataRes.data.data[year].forEach((record) => {
//             const regNo = record.student.regNo;
//             const key = `${record.student.admissionNo}_${regNo}_${year}`;

//             if (!processedKeys.has(key)) {
//               unifiedData.push({
//                 ...record,
//                 academicYear: year,
//                 className: record.className || '-',
//                 sectionName: record.sectionName || '-',
//                 shiftName: record.shiftName || '-',
//               });
//               processedKeys.add(key);
//             }
//           });
//         });

//         feeDataRes.data.tcDetails.forEach((tc) => {
//           const regNo = tc.registrationNumber;
//           const admissionNo = tc.AdmissionNumber || '-';
//           const studentName = `${tc.firstName} ${tc.lastName}`.trim();
//           const tcAcademicYear = tc.academicYear || selectedAcademicYear;
//           const key = `${admissionNo}_${regNo}_${tcAcademicYear}`;

//           if (tcAcademicYear === selectedAcademicYear && !processedKeys.has(key)) {
//             unifiedData.push({
//               academicYear: tcAcademicYear,
//               className: '-',
//               sectionName: '-',
//               shiftName: '-',
//               student: {
//                 admissionNo,
//                 regNo,
//                 studentName,
//                 tcNo: tc.tcNo || '-',
//                 tcFeesDate: tc.tcFeesDate || '-',
//                 tcFeesReceiptNo: tc.tcFeesReceiptNo || '-',
//                 tcFeesPaymentMode: tc.tcFeesPaymentMode || '-',
//                 tcFeesTransactionNo: tc.tcFeesTransactionNo || '-',
//                 tcFeesDue: tc.tcFeesDue || '0',
//                 tcFeesConcession: tc.tcFeesConcession || '0',
//                 tcFeesPaid: tc.tcFeesPaid || '0',
//               },
//             });
//             processedKeys.add(key);
//           }
//         });

//         unifiedData.sort((a, b) => {
//           const admNoA = a.student.admissionNo || '-';
//           const admNoB = b.student.admissionNo || '-';
//           if (admNoA === admNoB) {
//             return a.academicYear.localeCompare(b.academicYear);
//           }
//           return admNoA.localeCompare(admNoB);
//         });

//         setFeeData(unifiedData);

//         const modes = new Set();
//         unifiedData.forEach((record) => {
//           if (record.student?.tcFeesPaymentMode) modes.add(record.student.tcFeesPaymentMode);
//         });
//         setPaymentModes(
//           Array.from(modes)
//             .filter((mode) => mode && mode !== '-')
//             .map((mode) => ({ value: mode, label: mode }))
//         );

//         const classes = new Set(unifiedData.map((record) => record.className).filter((cls) => cls && cls !== '-'));
//         setClassOptions(
//           Array.from(classes).map((cls) => ({ value: cls, label: cls }))
//         );

//         const sections = new Set(unifiedData.map((record) => record.sectionName).filter((sec) => sec && sec !== '-'));
//         setSectionOptions(
//           Array.from(sections).map((sec) => ({ value: sec, label: sec }))
//         );
//       } catch (error) {
//         toast.error('Error initializing data: ' + error.message);
//         setFeeData([]);
//         setPaymentModes([]);
//         setClassOptions([]);
//         setSectionOptions([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [schoolId, selectedAcademicYear, academicYears]);

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

//   const handleSelectChange = (selectedOption, { name }) => {
//     if (name === 'academicYear') {
//       const selectedYear = selectedOption?.value || '';
//       setSelectedAcademicYear(selectedYear);
//       setFeeData([]);
//     } else if (name === 'paymentMode') {
//       setSelectedPaymentModes(selectedOption || []);
//     } else if (name === 'class') {
//       setSelectedClasses(selectedOption || []);
//     } else if (name === 'section') {
//       setSelectedSections(selectedOption || []);
//     }
//   };

//   const resetFilters = () => {
//     setSelectedAcademicYear('');
//     setSelectedPaymentModes([]);
//     setSelectedClasses([]);
//     setSelectedSections([]);
//     setStartDate('');
//     setEndDate('');
//     setSearchTerm('');
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
//       return record.student?.studentName || '-';
//     } else if (fieldId === 'tcNo') {
//       return record.student?.tcNo || '-';
//     } else if (fieldId === 'class') {
//       return record.className || '-';
//     } else if (fieldId === 'section') {
//       return record.sectionName || '-';
//     } else {
//       return record.student?.[fieldId] || record[fieldId] || '-';
//     }
//   };

//   const calculateBalance = (record) => {
//     const due = parseFloat(record.student?.tcFeesDue || 0);
//     const concession = parseFloat(record.student?.tcFeesConcession || 0);
//     const paid = parseFloat(record.student?.tcFeesPaid || 0);
//     return due - concession - paid;
//   };

//   const filteredData = feeData.filter((record) => {
//     const hasValidTCNo = record.student?.tcNo && record.student.tcNo !== '-';
//     if (!hasValidTCNo) return false;

//     const matchesAcademicYear = record.academicYear === selectedAcademicYear;
//     if (!matchesAcademicYear) return false;

//     const matchesSearchTerm = searchTerm
//       ? Object.values(record).some((value) =>
//         value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
//       ) ||
//       Object.values(record.student || {}).some((value) =>
//         value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//       : true;

//     const matchesPaymentMode =
//       selectedPaymentModes.length === 0 ||
//       selectedPaymentModes.some((mode) => record.student?.tcFeesPaymentMode === mode.value);

//     const matchesClass =
//       selectedClasses.length === 0 ||
//       selectedClasses.some((cls) => record.className === cls.value);

//     const matchesSection =
//       selectedSections.length === 0 ||
//       selectedSections.some((sec) => record.sectionName === sec.value);

//     const matchesDate =
//       (!startDate && !endDate) ||
//       (record.student?.tcFeesDate !== '-' &&
//         (() => {
//           const recordDate = new Date(record.student.tcFeesDate.split('-').reverse().join('-'));
//           const start = startDate ? new Date(startDate) : null;
//           const end = endDate ? new Date(endDate) : null;
//           return (!start || recordDate >= start) && (!end || recordDate <= end);
//         })());

//     return (
//       matchesAcademicYear &&
//       matchesSearchTerm &&
//       matchesPaymentMode &&
//       matchesClass &&
//       matchesSection &&
//       matchesDate
//     );
//   });

//   const totals = filteredData.reduce(
//     (acc, record) => {
//       const due = parseFloat(record.student?.tcFeesDue || 0);
//       const paid = parseFloat(record.student?.tcFeesPaid || 0);
//       const concession = parseFloat(record.student?.tcFeesConcession || 0);
//       const balance = due - concession - paid;

//       return {
//         feesDue: acc.feesDue + due,
//         feesPaid: acc.feesPaid + paid,
//         concession: acc.concession + concession,
//         balance: acc.balance + balance,
//       };
//     },
//     { feesDue: 0, feesPaid: 0, concession: 0, balance: 0 }
//   );

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
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <div className="col-md-2"></div>
//                   <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
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
//                                   totals,
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
//                                   totals,
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
//                               <label className="form-label">Start Date</label>
//                               <input
//                                 type="date"
//                                 className="form-control"
//                                 value={startDate}
//                                 onChange={(e) => setStartDate(e.target.value)}
//                               />
//                             </div>
//                             <div className="col-md-4">
//                               <label className="form-label">End Date</label>
//                               <input
//                                 type="date"
//                                 className="form-control"
//                                 value={endDate}
//                                 onChange={(e) => setEndDate(e.target.value)}
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
//                   <h2 className="payroll-title text-center mb-0 flex-grow-1">TC Fees Report</h2>
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
//                 <div className="table-responsive pb-4 mt-3">
//                   <table className="table text-dark border border-secondary mb-1">
//                     <thead>
//                       <tr className="payroll-table-header">
//                         {tableFields.map((field) => (
//                           <th
//                             key={field.id}
//                             className="text-center align-content-center border border-secondary text-nowrap p-2"
//                           >
//                             {headerMapping[field.id] || field.label}
//                           </th>
//                         ))}
//                         <th className="text-center align-content-center border border-secondary text-nowrap p-2">
//                           Balance
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.length > 0 ? (
//                         filteredData.map((record, index) => (
//                           <tr
//                             key={`${record.student.admissionNo}_${record.student.regNo}_${record.academicYear}_${index}`}
//                             className="payroll-table-row"
//                           >
//                             {tableFields.map((field) => (
//                               <td
//                                 key={field.id}
//                                 className="text-center align-middle border border-secondary text-nowrap p-2"
//                               >
//                                 {getFieldValue(record, field)}
//                               </td>
//                             ))}
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {calculateBalance(record)}
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan={tableFields.length + 1} className="text-center">
//                             No data matches the selected filters for {formatAcademicYear(selectedAcademicYear)}.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                     <tfoot>
//                       <tr className="payroll-table-footer">
//                         <td
//                           colSpan={tableFields.length - 3}
//                           className="text-right border border-secondary p-2"
//                         >
//                           <strong>Total</strong>
//                         </td>
//                         <td className="text-center border border-secondary p-2">
//                           <strong>{totals.feesDue}</strong>
//                         </td>
//                         <td className="text-center border border-secondary p-2">
//                           <strong>{totals.feesPaid}</strong>
//                         </td>
//                         <td className="text-center border border-secondary p-2">
//                           <strong>{totals.concession}</strong>
//                         </td>
//                         <td className="text-center border border-secondary p-2">
//                           <strong>{totals.balance}</strong>
//                         </td>
//                       </tr>
//                     </tfoot>
//                   </table>
//                 </div>
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

// export default TCFees;

import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import getAPI from '../../../../../../api/getAPI';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from './ExportModalTC';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const TCFees = () => {
  const headerMapping = {
    tcFeesDate: 'Date',
    academicYear: 'Academic Year',
    tcNo: 'TC No.',
    studentName: 'Name',
    class: 'Class',
    section: 'Section',
    tcFeesStatus: 'Status',
    tcFeesPaymentMode: 'Payment Mode',
    tcFeesTransactionNo: 'Cheque No./Transaction No.',
    tcFeesReceiptNo: 'Receipts No.',
    tcFeesDue: 'Fees Due',
    tcFeesPaid: 'Fees Paid',
    tcFeesConcession: 'Concession',
  };

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
  const [tableFields] = useState(
    Object.keys(headerMapping).map((key) => ({
      id: key,
      label: headerMapping[key],
    }))
  );
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dropdownRef = useRef(null);

  const tabs = ['Date', 'Payment Mode', 'Class & Section', 'Status', 'Academic Year'];
  const pageShowOptions = [
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
            const latestYear = years[years.length - 1];
            setSelectedAcademicYear(latestYear);
            localStorage.setItem('selectedAcademicYear', latestYear);
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
        const feeDataRes = await getAPI(`/get-all-data-tc?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
        if (!feeDataRes?.data) {
          throw new Error('No TC fee data found');
        }

        const unifiedData = [];
        const processedKeys = new Set();

        const validYears = academicYears.filter((year) => {
          const [startYear] = year.split('-').map(Number);
          const [selectedStartYear] = selectedAcademicYear.split('-').map(Number);
          return startYear <= selectedStartYear;
        });

        Object.keys(feeDataRes.data.data || {}).forEach((year) => {
          if (!validYears.includes(year)) return;
          feeDataRes.data.data[year].forEach((record) => {
            const regNo = record.student.regNo;
            const key = `${record.student.admissionNo}_${regNo}_${year}`;

            if (!processedKeys.has(key)) {
              (record.student.tcFeesStatus || ['Paid']).forEach((status) => {
                unifiedData.push({
                  ...record,
                  academicYear: year,
                  className: record.className || '-',
                  sectionName: record.sectionName || '-',
                  shiftName: record.shiftName || '-',
                  student: {
                    ...record.student,
                    tcFeesStatus: [status],
                  },
                });
              });
              processedKeys.add(key);
            }
          });
        });

        feeDataRes.data.tcDetails.forEach((tc) => {
          const regNo = tc.registrationNumber;
          const admissionNo = tc.AdmissionNumber || '-';
          const studentName = `${tc.firstName} ${tc.lastName}`.trim();
          const tcAcademicYear = tc.academicYear || selectedAcademicYear;
          const key = `${admissionNo}_${regNo}_${tcAcademicYear}`;

          if (tcAcademicYear === selectedAcademicYear && !processedKeys.has(key)) {
            (tc.tcFeesStatus || ['Paid']).forEach((status) => {
              unifiedData.push({
                academicYear: tcAcademicYear,
                className: '-',
                sectionName: '-',
                shiftName: '-',
                student: {
                  admissionNo,
                  regNo,
                  studentName,
                  tcNo: tc.tcNo || '-',
                  tcFeesDate: tc.tcFeesDate || '-',
                  tcFeesCancelledDate: tc.tcFeesCancelledDate || '-',
                  tcFeesPaymentMode: tc.tcFeesPaymentMode || '-',
                  tcFeesTransactionNo: tc.tcFeesTransactionNo || '-',
                  tcFeesDue: tc.tcFeesDue || '0',
                  tcFeesConcession: tc.tcFeesConcession || '0',
                  tcFeesPaid: tc.tcFeesPaid || '0',
                  tcFeesStatus: [status],
                },
              });
            });
            processedKeys.add(key);
          }
        });

        unifiedData.sort((a, b) => {
          const admNoA = a.student.admissionNo || '-';
          const admNoB = b.student.admissionNo || '-';
          const dateA = a.student.tcFeesStatus.includes('Cheque Return') ? a.student.tcFeesCancelledDate : a.student.tcFeesDate || '-';
          const dateB = b.student.tcFeesStatus.includes('Cheque Return') ? b.student.tcFeesCancelledDate : b.student.tcFeesDate || '-';
          const statusA = a.student.tcFeesStatus[0];
          const statusB = b.student.tcFeesStatus[0];

          if (dateA !== dateB) return dateA.localeCompare(dateB);
          if (statusA === 'Paid' && statusB !== 'Paid') return -1;
          if (statusB === 'Paid' && statusA !== 'Paid') return 1;
          return admNoA.localeCompare(admNoB);
        });

        setFeeData(unifiedData);

        const modes = new Set();
        const statuses = new Set();
        unifiedData.forEach((record) => {
          if (record.student?.tcFeesPaymentMode) modes.add(record.student.tcFeesPaymentMode);
          if (record.student?.tcFeesStatus) {
            record.student.tcFeesStatus.forEach((status) => statuses.add(status));
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

        const classes = new Set(unifiedData.map((record) => record.className).filter((cls) => cls && cls !== '-'));
        setClassOptions(
          Array.from(classes).map((cls) => ({ value: cls, label: cls }))
        );

        const sections = new Set(unifiedData.map((record) => record.sectionName).filter((sec) => sec && sec !== '-'));
        setSectionOptions(
          Array.from(sections).map((sec) => ({ value: sec, label: sec }))
        );
      } catch (error) {
        toast.error('Error initializing data: ' + error.message);
        setFeeData([]);
        setPaymentModes([]);
        setStatusOptions([]);
        setClassOptions([]);
        setSectionOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [schoolId, selectedAcademicYear, academicYears]);

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

  const handleSelectChange = (selectedOption, { name }) => {
    if (name === 'academicYear') {
      const selectedYear = selectedOption?.value || '';
      setSelectedAcademicYear(selectedYear);
      setCurrentPage(1);
    } else if (name === 'paymentMode') {
      setSelectedPaymentModes(selectedOption || []);
      setCurrentPage(1);
    } else if (name === 'class') {
      setSelectedClasses(selectedOption || []);
      setCurrentPage(1);
    } else if (name === 'section') {
      setSelectedSections(selectedOption || []);
      setCurrentPage(1);
    } else if (name === 'status') {
      setSelectedStatuses(selectedOption || []);
      setCurrentPage(1);
    } else if (name === 'rowsPerPage') {
      setRowsPerPage(selectedOption ? selectedOption.value : 10);
      setCurrentPage(1);
    }
  };

  const resetFilters = () => {
    setSelectedAcademicYear('');
    setSelectedPaymentModes([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setSelectedStatuses([]);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setCurrentPage(1);
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
    const isCancelledOrChequeReturn = record.student?.tcFeesStatus.includes('Cheque Return') || record.student?.tcFeesStatus.includes('Cancelled');
    if (fieldId === 'academicYear') {
      return formatAcademicYear(record[fieldId]) || '-';
    } else if (fieldId === 'studentName') {
      return record.student?.studentName || '-';
    } else if (fieldId === 'tcNo') {
      return record.student?.tcNo || '-';
    } else if (fieldId === 'class') {
      return record.className || '-';
    } else if (fieldId === 'section') {
      return record.sectionName || '-';
    } else if (fieldId === 'tcFeesDate') {
      if (isCancelledOrChequeReturn) {
        const cancelledDate = record.student?.tcFeesCancelledDate;
        if (cancelledDate && /^\d{2}-\d{2}-\d{4}$/.test(cancelledDate)) {
          return cancelledDate;
        }
        return '-';
      }
      return record.student?.tcFeesDate || '-';
    } else if (fieldId === 'tcFeesStatus') {
      return record.student?.tcFeesStatus.join(', ') || '-';
    } else if (['tcFeesDue', 'tcFeesPaid', 'tcFeesConcession'].includes(fieldId)) {
      const value = parseFloat(record.student?.[fieldId] || 0);
      if (value === 0) return '0';
      return isCancelledOrChequeReturn ? `-${value}` : value.toString();
    } else {
      return record.student?.[fieldId] || record[fieldId] || '-';
    }
  };

  const calculateBalance = (record) => {
    const due = parseFloat(record.student?.tcFeesDue || 0);
    const concession = parseFloat(record.student?.tcFeesConcession || 0);
    const paid = parseFloat(record.student?.tcFeesPaid || 0);
    const balance = due - concession - paid;
    const isCancelledOrChequeReturn = record.student?.tcFeesStatus.includes('Cheque Return') || record.student?.tcFeesStatus.includes('Cancelled');
    if (balance === 0) return '0';
    return isCancelledOrChequeReturn ? `-${balance}` : balance.toString();
  };

  const filteredData = feeData.filter((record) => {
    const hasValidTCNo = record.student?.tcNo && record.student.tcNo !== '-';
    if (!hasValidTCNo) return false;

    const matchesAcademicYear = record.academicYear === selectedAcademicYear;
    if (!matchesAcademicYear) return false;

    const matchesSearchTerm = searchTerm
      ? Object.values(record).some((value) =>
          value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        Object.values(record.student || {}).some((value) =>
          value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    const matchesPaymentMode =
      selectedPaymentModes.length === 0 ||
      selectedPaymentModes.some((mode) => record.student?.tcFeesPaymentMode === mode.value);

    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => record.className === cls.value);

    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((sec) => record.sectionName === sec.value);

    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.some((status) => record.student?.tcFeesStatus.includes(status.value));

    const matchesDate =
      (!startDate && !endDate) ||
      ((record.student?.tcFeesDate !== '-' || record.student?.tcFeesCancelledDate !== '-') &&
        (() => {
          const dateString = record.student?.tcFeesStatus.includes('Cheque Return') || record.student?.tcFeesStatus.includes('Cancelled')
            ? record.student.tcFeesCancelledDate
            : record.student.tcFeesDate;
          if (!dateString || !/^\d{2}-\d{2}-\d{4}$/.test(dateString)) return false;
          const [day, month, year] = dateString.split('-');
          const recordDate = new Date(`${year}-${month}-${day}`);
          if (isNaN(recordDate.getTime())) return false;
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;
          return (!start || recordDate >= start) && (!end || recordDate <= end);
        })());

    return (
      matchesAcademicYear &&
      matchesSearchTerm &&
      matchesPaymentMode &&
      matchesClass &&
      matchesSection &&
      matchesStatus &&
      matchesDate
    );
  });

  const groupedByDate = filteredData.reduce((acc, record) => {
    const date = record.student?.tcFeesStatus.includes('Cheque Return') || record.student?.tcFeesStatus.includes('Cancelled')
      ? record.student.tcFeesCancelledDate
      : record.student.tcFeesDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(record);
    return acc;
  }, {});

  const totals = filteredData.reduce(
    (acc, record) => {
      const due = parseFloat(record.student?.tcFeesDue || 0);
      const paid = parseFloat(record.student?.tcFeesPaid || 0);
      const concession = parseFloat(record.student?.tcFeesConcession || 0);
      const balance = due - concession - paid;
      const isCancelledOrChequeReturn = record.student?.tcFeesStatus.includes('Cheque Return') || record.student?.tcFeesStatus.includes('Cancelled');
      const multiplier = isCancelledOrChequeReturn ? -1 : 1;
      return {
        feesDue: acc.feesDue + (due !== 0 ? due * multiplier : due),
        feesPaid: acc.feesPaid + (paid !== 0 ? paid * multiplier : paid),
        concession: acc.concession + (concession !== 0 ? concession * multiplier : concession),
        balance: acc.balance + (balance !== 0 ? balance * multiplier : balance),
      };
    },
    { feesDue: 0, feesPaid: 0, concession: 0, balance: 0 }
  );

  const totalRecords = Object.keys(groupedByDate).reduce((sum, date) => sum + groupedByDate[date].length, 0);
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

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
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
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
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                              setIsExporting(true);
                              try {
                                await exportToExcel(
                                  filteredData,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  calculateBalance,
                                  totals,
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
                                  totals,
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
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">End Date</label>
                              <input
                                type="date"
                                className="form-control"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">TC Fees Report</h2>
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
                              className="text-center align-content-center border border-secondary text-nowrap p-2"
                            >
                              {headerMapping[field.id] || field.label}
                            </th>
                          ))}
                          <th className="text-center align-content-center border border-secondary text-nowrap p-2">
                            Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData().length > 0 ? (
                          paginatedData().map(({ date, record }, index) => (
                            <tr
                              key={`${record.student.admissionNo}_${record.student.regNo}_${record.academicYear}_${record.student.tcFeesStatus[0]}_${index}`}
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
                              <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                {calculateBalance(record)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={tableFields.length + 1} className="text-center">
                              No data matches the selected filters for {formatAcademicYear(selectedAcademicYear)}.
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="payroll-table-footer">
                          <td
                            colSpan={tableFields.length - 3}
                            className="text-right border border-secondary p-2"
                          >
                            <strong>Total</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.feesDue}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.feesPaid}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.concession}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.balance}</strong>
                          </td>
                        </tr>
                      </tfoot>
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

export default TCFees;