// // import React, { useState, useEffect } from 'react';
// // import { FaFilter } from 'react-icons/fa';
// // import { toast } from 'react-toastify';
// // import CreatableSelect from 'react-select/creatable';
// // import { Link } from 'react-router-dom';
// // import getAPI from '../../../../../../api/getAPI';


// // const formatDate = (dateStr) => {
// //   if (!dateStr || dateStr === '-') return '-';
// //   const date = new Date(dateStr);
// //   if (isNaN(date)) return dateStr; 
// //   return date.toLocaleDateString('en-GB').split('/').join('/');
// // };

// // const LateandExcessFee = () => {
// //   const [showFilterPanel, setShowFilterPanel] = useState(false);
// //   const [activeTab, setActiveTab] = useState('Date');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [schoolId, setSchoolId] = useState('');
// //   const [feeData, setFeeData] = useState([]);
// //   const [feeTypes, setFeeTypes] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [loadingYears, setLoadingYears] = useState(false);
// //   const [classOptions, setClassOptions] = useState([]);
// //   const [sectionOptions, setSectionOptions] = useState([]);
// //   const [academicYearOptions, setAcademicYearOptions] = useState([]);
// //   const [installmentOptions, setInstallmentOptions] = useState([]);
// //   const [paymentModeOptions, setPaymentModeOptions] = useState([]);
// //   const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
// //   const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
// //   const [selectedClasses, setSelectedClasses] = useState([]);
// //   const [selectedSections, setSelectedSections] = useState([]);
// //   const [selectedYears, setSelectedYears] = useState([]);
// //   const [selectedInstallments, setSelectedInstallments] = useState([]);
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');

// //   const tabs = ['Date', 'Payment Mode', 'Class & Section', 'Academic Year', 'Installment'];

// //   const formatAcademicYear = (year) => {
// //     if (!year) return '-';
// //     const [startYear, endYear] = year.split('-');
// //     return `${startYear}-${endYear?.slice(-2) || ''}`;
// //   };

// //   useEffect(() => {
// //     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
// //     if (!userDetails?.schoolId) {
// //       toast.error('School ID not found. Please log in again.');
// //       return;
// //     }
// //     setSchoolId(userDetails.schoolId);
// //   }, []);

// //   useEffect(() => {
// //     const fetchAcademicYears = async () => {
// //       try {
// //         setLoadingYears(true);
// //         const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
// //         if (!response.hasError && response.data?.data) {
// //           const years = response.data.data
// //             .map((item) => item.academicYear)
// //             .filter(Boolean)
// //             .sort((a, b) => a.localeCompare(b));
// //           setAcademicYearOptions(
// //             years.map((year) => ({
// //               value: year,
// //               label: formatAcademicYear(year),
// //             }))
// //           );
// //           if (!selectedAcademicYear && years.length > 0) {
// //             const latestYear = years[years.length - 1];
// //             setSelectedAcademicYear(latestYear);
// //             localStorage.setItem('selectedAcademicYear', latestYear);
// //             setSelectedYears([{ value: latestYear, label: formatAcademicYear(latestYear) }]);
// //           }
// //         } else {
// //           toast.error('No academic years found.');
// //         }
// //       } catch (err) {
// //         toast.error('Error fetching academic years.');
// //         console.error(err);
// //       } finally {
// //         setLoadingYears(false);
// //       }
// //     };
// //     if (schoolId) {
// //       fetchAcademicYears();
// //     }
// //   }, [schoolId]);

// //   const fetchFeeData = async (years) => {
// //     setIsLoading(true);
// //     try {
// //       const promises = years.map((year) =>
// //         getAPI(`/get-all-students-fees-with-late-fees?schoolId=${schoolId}&academicYear=${year}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`)
// //       );
// //       const responses = await Promise.all(promises);
// //       const unifiedData = responses.flatMap((res, index) => {
// //         if (!res?.data?.data) {
// //           console.warn(`No data found for year ${years[index]}`);
// //           return [];
// //         }
// //         return res.data.data;
// //       });

// //       const filteredData = unifiedData.filter(
// //         (record) => record.lateFees > 0 || record.paidFine > 0 || record.excessFees > 0
// //       );

// //       const allFeeTypes = responses
// //         .flatMap((res) => res?.data?.feeTypes || [])
// //         .filter((type, index, self) => self.indexOf(type) === index)
// //         .sort();

// //       setFeeTypes(allFeeTypes);
// //       setFeeData(filteredData);

// //       const filterOptions = responses[0]?.data?.filterOptions || {};
// //       setClassOptions(filterOptions.classOptions || []);
// //       setSectionOptions(filterOptions.sectionOptions || []);
// //       setInstallmentOptions(filterOptions.installmentOptions || []);
// //       setPaymentModeOptions(filterOptions.paymentModeOptions || []);
// //     } catch (error) {
// //       toast.error('Error fetching data: ' + error.message);
// //       setFeeData([]);
// //       setFeeTypes([]);
// //       setClassOptions([]);
// //       setSectionOptions([]);
// //       setInstallmentOptions([]);
// //       setPaymentModeOptions([]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (!schoolId || !selectedAcademicYear) return;
// //     const yearsToFetch = selectedYears.length > 0
// //       ? selectedYears.map((year) => year.value)
// //       : [selectedAcademicYear];
// //     fetchFeeData(yearsToFetch);
// //   }, [schoolId, selectedAcademicYear, selectedYears]);

// //   const handleSelectChange = (selectedOptions, { name }) => {
// //     const selected = selectedOptions || [];
// //     if (name === 'academicYear') {
// //       setSelectedYears(selected);
// //     } else if (name === 'paymentMode') {
// //       setSelectedPaymentModes(selected);
// //     } else if (name === 'class') {
// //       setSelectedClasses(selected);
// //     } else if (name === 'section') {
// //       setSelectedSections(selected);
// //     } else if (name === 'installment') {
// //       setSelectedInstallments(selected);
// //     }
// //   };

// //   const applyFilters = () => {
// //     setShowFilterPanel(false);
// //     const yearsToFetch = selectedYears.length > 0
// //       ? selectedYears.map((year) => year.value)
// //       : [selectedAcademicYear];
// //     fetchFeeData(yearsToFetch);
// //   };

// //   const resetFilters = () => {
// //     setSelectedYears([]);
// //     setSelectedPaymentModes([]);
// //     setSelectedClasses([]);
// //     setSelectedSections([]);
// //     setSelectedInstallments([]);
// //     setStartDate('');
// //     setEndDate('');
// //     setSearchTerm('');
// //     setShowFilterPanel(false);
// //     fetchFeeData([selectedAcademicYear]);
// //   };

// //   const toggleFilter = () => {
// //     setShowFilterPanel(!showFilterPanel);
// //   };

// //   // Filter data
// //   const filteredData = feeData.filter((row) => {
// //     const matchesSearchTerm = searchTerm
// //       ? formatDate(row.paymentDate).toLowerCase().includes(String(searchTerm).toLowerCase()) ||
// //         (row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
// //         (row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
// //         (row.className || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
// //         (row.sectionName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
// //         (row.installmentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
// //         (row.paymentMode || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
// //         (row.chequeNoOrTransactionNo || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
// //         (row.receiptNo || '').toLowerCase().includes(String(searchTerm).toLowerCase())
// //       : true;

// //     const matchesPaymentMode =
// //       selectedPaymentModes.length === 0 ||
// //       selectedPaymentModes.some((mode) => row.paymentMode === mode.value);

// //     const matchesYear =
// //       selectedYears.length === 0 ||
// //       selectedYears.some((year) => row.academicYear === year.value);

// //     const matchesDate =
// //       (!startDate && !endDate) ||
// //       (() => {
// //         if (!row.paymentDate || row.paymentDate === '-') return false;
// //         const recordDate = new Date(row.paymentDate.split('/').reverse().join('-'));
// //         const start = startDate ? new Date(startDate) : null;
// //         const end = endDate ? new Date(endDate) : null;
// //         return (!start || recordDate >= start) && (!end || recordDate <= end);
// //       })();

// //     const matchesClass =
// //       selectedClasses.length === 0 ||
// //       selectedClasses.some((cls) => row.className === cls.value);

// //     const matchesSection =
// //       selectedSections.length === 0 ||
// //       selectedSections.some((section) => row.sectionName === section.value);

// //     const matchesInstallment =
// //       selectedInstallments.length === 0 ||
// //       selectedInstallments.some((inst) => row.installmentName === inst.value);

// //     return (
// //       matchesSearchTerm &&
// //       matchesPaymentMode &&
// //       matchesYear &&
// //       matchesDate &&
// //       matchesClass &&
// //       matchesSection &&
// //       matchesInstallment
// //     );
// //   });

// //   // Group data by paymentDate
// //   const groupedData = filteredData.reduce((acc, row) => {
// //     const date = formatDate(row.paymentDate);
// //     if (!acc[date]) {
// //       acc[date] = [];
// //     }
// //     acc[date].push(row);
// //     return acc;
// //   }, {});

// //   // Convert grouped data to array and sort by paymentDate
// //   const groupedDataArray = Object.keys(groupedData)
// //     .map((date) => ({
// //       paymentDate: date,
// //       rows: groupedData[date].sort((a, b) =>
// //         a.admissionNumber.localeCompare(b.admissionNumber) ||
// //         a.installmentName.localeCompare(b.installmentName)
// //       ),
// //     }))
// //     .sort((a, b) => {
// //       if (a.paymentDate === '-' || b.paymentDate === '-') return 0;
// //       return (
// //         new Date(a.paymentDate.split('/').reverse().join('-')).getTime() -
// //         new Date(b.paymentDate.split('/').reverse().join('-')).getTime()
// //       );
// //     });

// //   // Calculate totals
// //   const totals = filteredData.reduce(
// //     (acc, row) => {
// //       acc.totalLateFees += row.lateFees || 0;
// //       acc.totalPaidFine += row.paidFine || 0;
// //       acc.totalExcessFees += row.excessFees || 0;
// //       acc.total += (row.lateFees || 0) + (row.paidFine || 0) + (row.excessFees || 0);
// //       return acc;
// //     },
// //     { totalLateFees: 0, totalPaidFine: 0, totalExcessFees: 0, total: 0 }
// //   );

// //   return (
// //     <div className="container">
// //       <div className="row">
// //         <div className="col-md-12">
// //           <div className="card m-2">
// //             <div className="card-body p-2">
// //               <div className="container">
// //                 <div className="row p-1 border border-dark rounded" style={{ background: '#bfbfbf' }}>
// //                   <div className="col-md-5 col-12">
// //                     <input
// //                       type="text"
// //                       className="form-control border-dark"
// //                       placeholder="Search by date, adm no., name, class, section, installment, payment mode, cheque no., or receipt no."
// //                       value={searchTerm}
// //                       onChange={(e) => setSearchTerm(e.target.value)}
// //                     />
// //                   </div>
// //                   <div className="col-md-2"></div>
// //                   <div className="col-md-5 px-0 d-flex align-items-center justify-content-end">
// //                     <div
// //                       className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
// //                       style={{ cursor: 'pointer' }}
// //                       onClick={toggleFilter}
// //                     >
// //                       <FaFilter />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {showFilterPanel && (
// //                   <div className="row mt-2 border mt-1 border-light rounded px-md-3 p-3">
// //                     <div className="col-12 p-2">
// //                       <ul className="nav nav-tabs mb-0 justify-content-center">
// //                         {tabs.map((tab) => (
// //                           <li className="nav-item" key={tab}>
// //                             <Link
// //                               className={`nav-link fw-bold ${activeTab === tab ? 'active' : ''}`}
// //                               onClick={() => setActiveTab(tab)}
// //                             >
// //                               {tab}
// //                             </Link>
// //                           </li>
// //                         ))}
// //                       </ul>

// //                       <div className="tab-content mt-2">
// //                         {activeTab === 'Date' && (
// //                           <div className="row d-flex justify-content-center">
// //                             <div className="col-md-4">
// //                               <label className="form-label">Start Date</label>
// //                               <div className="input-group">
// //                                 <input
// //                                   type="date"
// //                                   className="form-control"
// //                                   value={startDate}
// //                                   onChange={(e) => setStartDate(e.target.value)}
// //                                 />
// //                               </div>
// //                             </div>
// //                             <div className="col-md-4">
// //                               <label className="form-label">End Date</label>
// //                               <div className="input-group">
// //                                 <input
// //                                   type="date"
// //                                   className="form-control"
// //                                   value={endDate}
// //                                   onChange={(e) => setEndDate(e.target.value)}
// //                                 />
// //                               </div>
// //                             </div>
// //                           </div>
// //                         )}

// //                         {activeTab === 'Payment Mode' && (
// //                           <div className="row d-flex justify-content-center">
// //                             <div className="col-md-8">
// //                               <CreatableSelect
// //                                 isMulti
// //                                 name="paymentMode"
// //                                 options={paymentModeOptions}
// //                                 value={selectedPaymentModes}
// //                                 onChange={(selected, action) => handleSelectChange(selected, action)}
// //                                 placeholder="Select Payment Modes"
// //                                 className="mt-2"
// //                               />
// //                             </div>
// //                           </div>
// //                         )}

// //                         {activeTab === 'Class & Section' && (
// //                           <div className="row d-flex justify-content-center">
// //                             <div className="col-md-4">
// //                               <CreatableSelect
// //                                 isMulti
// //                                 name="class"
// //                                 options={classOptions}
// //                                 value={selectedClasses}
// //                                 onChange={(selected, action) => handleSelectChange(selected, action)}
// //                                 placeholder="Select Classes"
// //                                 className="mt-2"
// //                               />
// //                             </div>
// //                             <div className="col-md-4">
// //                               <CreatableSelect
// //                                 isMulti
// //                                 name="section"
// //                                 options={sectionOptions}
// //                                 value={selectedSections}
// //                                 onChange={(selected, action) => handleSelectChange(selected, action)}
// //                                 placeholder="Select Sections"
// //                                 className="mt-2"
// //                               />
// //                             </div>
// //                           </div>
// //                         )}

// //                         {activeTab === 'Academic Year' && (
// //                           <div className="row d-flex justify-content-center">
// //                             <div className="col-md-8">
// //                               <CreatableSelect
// //                                 isMulti
// //                                 name="academicYear"
// //                                 options={academicYearOptions}
// //                                 value={selectedYears}
// //                                 onChange={(selected, action) => handleSelectChange(selected, action)}
// //                                 placeholder="Select Academic Years"
// //                                 className="mt-2"
// //                                 isLoading={loadingYears}
// //                               />
// //                             </div>
// //                           </div>
// //                         )}

// //                         {activeTab === 'Installment' && (
// //                           <div className="row d-flex justify-content-center">
// //                             <div className="col-md-6">
// //                               <CreatableSelect
// //                                 isMulti
// //                                 name="installment"
// //                                 options={installmentOptions}
// //                                 value={selectedInstallments}
// //                                 onChange={(selected, action) => handleSelectChange(selected, action)}
// //                                 placeholder="Select Installments"
// //                                 className="mt-2"
// //                               />
// //                             </div>
// //                           </div>
// //                         )}
// //                       </div>

// //                       <div className="text-end mt-3">
// //                         <button className="btn btn-secondary me-2" onClick={resetFilters}>
// //                           Reset
// //                         </button>
// //                         <button className="ms-2 btn btn-primary" onClick={applyFilters}>
// //                           Apply
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="container">
// //                 <div className="card-header d-flex justify-content-between align-items-center gap-1">
// //                   <h2 className="payroll-title text-center mb-0 flex-grow-1">Late Fees and Excess Fees Report</h2>
// //                 </div>
// //               </div>

// //               {isLoading || loadingYears ? (
// //                 <div className="text-center mt-3">
// //                   <div className="spinner-border" role="status">
// //                     <span className="visually-hidden">Loading...</span>
// //                   </div>
// //                   <p>Loading...</p>
// //                 </div>
// //               ) : groupedDataArray.length > 0 ? (
// //                 <div className="table-responsive pb-4 mt-3">
// //                   <table className="table text-dark border border-secondary mb-1">
// //                     <thead>
// //                       <tr className="payroll-table-header">
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Date</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Academic Year</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Adm No.</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Name</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Class</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Section</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Installment</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Payment Mode</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Cheque No./Transaction No.</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Receipt No.</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Late Fees</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Excess Fees</th>
// //                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Total</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {groupedDataArray.map((group, groupIndex) =>
// //                         group.rows.map((record, rowIndex) => (
// //                           <tr key={`${record.admissionNumber}_${record.installmentName}_${groupIndex}_${rowIndex}`}>
// //                               <td
// //                                 className="text-center align-middle border border-secondary text-nowrap p-2"
// //                                 rowSpan={group.rows.length}
// //                               >
// //                                 {formatDate(record.paymentDate)}
// //                               </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {formatAcademicYear(record.academicYear) || '-'}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {record.admissionNumber || '-'}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {record.studentName || '-'}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {record.className || '-'}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {record.sectionName || '-'}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {record.installmentName || '-'}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {record.paymentMode || '-'}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {record.chequeNoOrTransactionNo || '-'}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {record.receiptNo || '-'}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {record.paidFine || 0}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {record.excessFees || 0}
// //                             </td>
// //                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               { (record.paidFine || 0) + (record.excessFees || 0)}
// //                             </td>
// //                           </tr>
// //                         ))
// //                       )}
// //                     </tbody>
// //                     <tfoot>
// //                       <tr className="payroll-table-footer">
// //                         <td colSpan={10} className="text-right border border-secondary p-2">
// //                           <strong>Total</strong>
// //                         </td>
// //                         <td className="text-center border border-secondary p-2">
// //                           <strong>{totals.totalPaidFine || 0}</strong>
// //                         </td>
// //                         <td className="text-center border border-secondary p-2">
// //                           <strong>{totals.totalExcessFees || 0}</strong>
// //                         </td>
// //                         <td className="text-center border border-secondary p-2">
// //                           <strong>{totals.total || 0}</strong>
// //                         </td>
// //                       </tr>
// //                     </tfoot>
// //                   </table>
// //                 </div>
// //               ) : (
// //                 <div className="text-center mt-3">
// //                   <p>
// //                     No paid installments match the selected filters for{' '}
// //                     {selectedYears.map((y) => formatAcademicYear(y.value)).join(', ') ||
// //                       formatAcademicYear(selectedAcademicYear)}.
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LateandExcessFee ;

// import React, { useState, useEffect, useRef } from 'react';
// import { FaFilter, FaDownload } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import CreatableSelect from 'react-select/creatable';
// import { Link } from 'react-router-dom';
// import getAPI from '../../../../../../api/getAPI';
// import { exportToExcel, exportToPDF } from './ExportModalLateandExcessFee';
// import { fetchSchoolData } from '../../../PdfUtlisReport';

// const formatDate = (dateStr) => {
//   if (!dateStr || dateStr === '-') return '-';
//   const date = new Date(dateStr);
//   if (isNaN(date)) return dateStr;
//   return date.toLocaleDateString('en-GB').split('/').join('/');
// };

// const LateandExcessFee = () => {
//   const [showFilterPanel, setShowFilterPanel] = useState(false);
//   const [showExportDropdown, setShowExportDropdown] = useState(false);
//   const [activeTab, setActiveTab] = useState('Date');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [schoolId, setSchoolId] = useState('');
//   const [school, setSchool] = useState(null);
//   const [logoSrc, setLogoSrc] = useState('');
//   const [feeData, setFeeData] = useState([]);
//   const [feeTypes, setFeeTypes] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingYears, setLoadingYears] = useState(false);
//   const [classOptions, setClassOptions] = useState([]);
//   const [sectionOptions, setSectionOptions] = useState([]);
//   const [academicYearOptions, setAcademicYearOptions] = useState([]);
//   const [installmentOptions, setInstallmentOptions] = useState([]);
//   const [paymentModeOptions, setPaymentModeOptions] = useState([]);
//   const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
//   const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [selectedSections, setSelectedSections] = useState([]);
//   const [selectedYears, setSelectedYears] = useState([]);
//   const [selectedInstallments, setSelectedInstallments] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [isExporting, setIsExporting] = useState(false);
//   const dropdownRef = useRef(null);

//   const tabs = ['Date', 'Payment Mode', 'Class & Section', 'Academic Year', 'Installment'];

//   const formatAcademicYear = (year) => {
//     if (!year) return '-';
//     const [startYear, endYear] = year.split('-');
//     return `${startYear}-${endYear?.slice(-2) || ''}`;
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
//           const years = response.data.data
//             .map((item) => item.academicYear)
//             .filter(Boolean)
//             .sort((a, b) => a.localeCompare(b));
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

//   const fetchFeeData = async (years) => {
//     setIsLoading(true);
//     try {
//       const promises = years.map((year) =>
//         getAPI(`/get-all-students-fees-with-late-fees?schoolId=${schoolId}&academicYear=${year}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`)
//       );
//       const responses = await Promise.all(promises);
//       const unifiedData = responses.flatMap((res, index) => {
//         if (!res?.data?.data) {
//           console.warn(`No data found for year ${years[index]}`);
//           return [];
//         }
//         return res.data.data;
//       });

//       const filteredData = unifiedData.filter(
//         (record) => record.lateFees > 0 || record.paidFine > 0 || record.excessFees > 0
//       );

//       const allFeeTypes = responses
//         .flatMap((res) => res?.data?.feeTypes || [])
//         .filter((type, index, self) => self.indexOf(type) === index)
//         .sort();

//       setFeeTypes(allFeeTypes);
//       setFeeData(filteredData);

//       const filterOptions = responses[0]?.data?.filterOptions || {};
//       setClassOptions(filterOptions.classOptions || []);
//       setSectionOptions(filterOptions.sectionOptions || []);
//       setInstallmentOptions(filterOptions.installmentOptions || []);
//       setPaymentModeOptions(filterOptions.paymentModeOptions || []);
//     } catch (error) {
//       toast.error('Error fetching data: ' + error.message);
//       setFeeData([]);
//       setFeeTypes([]);
//       setClassOptions([]);
//       setSectionOptions([]);
//       setInstallmentOptions([]);
//       setPaymentModeOptions([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!schoolId || !selectedAcademicYear) return;
//     const yearsToFetch = selectedYears.length > 0
//       ? selectedYears.map((year) => year.value)
//       : [selectedAcademicYear];
//     fetchFeeData(yearsToFetch);
//   }, [schoolId, selectedAcademicYear, selectedYears]);

//   const handleSelectChange = (selectedOptions, { name }) => {
//     const selected = selectedOptions || [];
//     if (name === 'academicYear') {
//       setSelectedYears(selected);
//     } else if (name === 'paymentMode') {
//       setSelectedPaymentModes(selected);
//     } else if (name === 'class') {
//       setSelectedClasses(selected);
//     } else if (name === 'section') {
//       setSelectedSections(selected);
//     } else if (name === 'installment') {
//       setSelectedInstallments(selected);
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
//     setSelectedInstallments([]);
//     setStartDate('');
//     setEndDate('');
//     setSearchTerm('');
//     setShowFilterPanel(false);
//     fetchFeeData([selectedAcademicYear]);
//   };

//   const toggleFilter = () => {
//     setShowFilterPanel(!showFilterPanel);
//     setShowExportDropdown(false);
//   };

//   const toggleExportDropdown = () => {
//     setShowExportDropdown(!showExportDropdown);
//     setShowFilterPanel(false);
//   };

//   const filteredData = feeData.filter((row) => {
//     const matchesSearchTerm = searchTerm
//       ? formatDate(row.paymentDate).toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//       (row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//       (row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//       (row.className || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//       (row.sectionName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//       (row.installmentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//       (row.paymentMode || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//       (row.chequeNoOrTransactionNo || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//       (row.receiptNo || '').toLowerCase().includes(String(searchTerm).toLowerCase())
//       : true;

//     const matchesPaymentMode =
//       selectedPaymentModes.length === 0 ||
//       selectedPaymentModes.some((mode) => row.paymentMode === mode.value);

//     const matchesYear =
//       selectedYears.length === 0 ||
//       selectedYears.some((year) => row.academicYear === year.value);

//     const matchesDate =
//       (!startDate && !endDate) ||
//       (() => {
//         if (!row.paymentDate || row.paymentDate === '-') return false;
//         const recordDate = new Date(row.paymentDate.split('/').reverse().join('-'));
//         const start = startDate ? new Date(startDate) : null;
//         const end = endDate ? new Date(endDate) : null;
//         return (!start || recordDate >= start) && (!end || recordDate <= end);
//       })();

//     const matchesClass =
//       selectedClasses.length === 0 ||
//       selectedClasses.some((cls) => row.className === cls.value);

//     const matchesSection =
//       selectedSections.length === 0 ||
//       selectedSections.some((section) => row.sectionName === section.value);

//     const matchesInstallment =
//       selectedInstallments.length === 0 ||
//       selectedInstallments.some((inst) => row.installmentName === inst.value);

//     return (
//       matchesSearchTerm &&
//       matchesPaymentMode &&
//       matchesYear &&
//       matchesDate &&
//       matchesClass &&
//       matchesSection &&
//       matchesInstallment
//     );
//   });

//   const groupedData = filteredData.reduce((acc, row) => {
//     const date = formatDate(row.paymentDate);
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(row);
//     return acc;
//   }, {});

//   const groupedDataArray = Object.keys(groupedData)
//     .map((date) => ({
//       paymentDate: date,
//       rows: groupedData[date].sort((a, b) =>
//         a.admissionNumber.localeCompare(b.admissionNumber) ||
//         a.installmentName.localeCompare(b.installmentName)
//       ),
//     }))
//     .sort((a, b) => {
//       if (a.paymentDate === '-' || b.paymentDate === '-') return 0;
//       return (
//         new Date(a.paymentDate.split('/').reverse().join('-')).getTime() -
//         new Date(b.paymentDate.split('/').reverse().join('-')).getTime()
//       );
//     });

//   const totals = filteredData.reduce(
//     (acc, row) => {
//       acc.totalLateFees += row.lateFees || 0;
//       acc.totalPaidFine += row.paidFine || 0;
//       acc.totalExcessFees += row.excessFees || 0;
//       acc.total += (row.lateFees || 0) + (row.paidFine || 0) + (row.excessFees || 0);
//       return acc;
//     },
//     { totalLateFees: 0, totalPaidFine: 0, totalExcessFees: 0, total: 0 }
//   );

//   const headerMapping = {
//     paymentDate: 'Date',
//     academicYear: 'Academic Year',
//     admissionNumber: 'Adm No.',
//     studentName: 'Name',
//     className: 'Class',
//     sectionName: 'Section',
//     installmentName: 'Installment',
//     paymentMode: 'Payment Mode',
//     chequeNoOrTransactionNo: 'Cheque No./Transaction No.',
//     receiptNo: 'Receipt No.',
//     paidFine: 'Late Fees',
//     excessFees: 'Excess Fees',
//     total: 'Total',
//   };

//   const tableFields = Object.keys(headerMapping).map((key) => ({
//     id: key,
//     label: headerMapping[key],
//   }));

//   const getFieldValue = (record, field) => {
//     const fieldId = field.id;
//     if (fieldId === 'paymentDate') {
//       return formatDate(record[fieldId]) || '-';
//     } else if (fieldId === 'academicYear') {
//       return formatAcademicYear(record[fieldId]) || '-';
//     } else if (fieldId === 'total') {
//       return ((record.lateFees || 0) + (record.paidFine || 0) + (record.excessFees || 0));
//     } else {
//       return record[fieldId] || '-';
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12">
//           <div className="card m-2">
//             <div className="card-body p-2">
//               <div className="container">
//                 <div className="row p-1 border border-dark rounded" style={{ background: '#bfbfbf' }}>
//                   <div className="col-md-5 col-12">
//                     <input
//                       type="text"
//                       className="form-control border-dark"
//                       placeholder="Search.."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                   </div>
//                   <div className="col-md-2"></div>
//                   <div className="col-md-5 px-0 d-flex align-items-center justify-content-end">
//                     <div
//                       className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
//                       style={{ cursor: 'pointer' }}
//                       onClick={toggleFilter}
//                     >
//                       <FaFilter />
//                     </div>
//                     <div className="position-relative" ref={dropdownRef}>
//                       <div
//                         className="p-1 px-2 border mr-2 border-dark finance-filter-icon"
//                         style={{ cursor: 'pointer' }}
//                         onClick={toggleExportDropdown}
//                         title="Download"
//                       >
//                         <FaDownload />
//                       </div>
//                       {showExportDropdown && (
//                         <div
//                           className="position-absolute bg-white mx-2 border mr-2 mt-2 border-dark rounded shadow"
//                           style={{
//                             top: '100%',
//                             right: 0,
//                             zIndex: 1000,
//                             minWidth: '150px',
//                           }}
//                         >
//                           <button
//                             className="btn btn-light w-100 text-left py-2 px-3 "
//                             disabled={isExporting}
//                             onClick={async () => {
//                               setIsExporting(true);
//                               try {
//                                 await exportToExcel(
//                                   filteredData,
//                                   tableFields,
//                                   headerMapping,
//                                   getFieldValue,
//                                   totals,
//                                   formatAcademicYear,
//                                   selectedYears.length > 0
//                                     ? selectedYears.map((y) => y.value).join(',')
//                                     : selectedAcademicYear
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
//                             className="btn btn-light w-100 text-left py-2 px-3 mx-2"
//                             disabled={isExporting}
//                             onClick={async () => {
//                               setIsExporting(true);
//                               try {
//                                 await exportToPDF(
//                                   filteredData,
//                                   tableFields,
//                                   headerMapping,
//                                   getFieldValue,
//                                   totals,
//                                   formatAcademicYear,
//                                   selectedYears.length > 0
//                                     ? selectedYears.map((y) => y.value).join(',')
//                                     : selectedAcademicYear,
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
//                   <div className="row mt-2 border mt-1 border-light rounded px-md-3 p-3">
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
//                           <div className="row d-flex justify-content-center">
//                             <div className="col-md-4">
//                               <label className="form-label">Start Date</label>
//                               <div className="input-group">
//                                 <input
//                                   type="date"
//                                   className="form-control"
//                                   value={startDate}
//                                   onChange={(e) => setStartDate(e.target.value)}
//                                 />
//                               </div>
//                             </div>
//                             <div className="col-md-4">
//                               <label className="form-label">End Date</label>
//                               <div className="input-group">
//                                 <input
//                                   type="date"
//                                   className="form-control"
//                                   value={endDate}
//                                   onChange={(e) => setEndDate(e.target.value)}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         {activeTab === 'Payment Mode' && (
//                           <div className="row d-flex justify-content-center">
//                             <div className="col-md-8">
//                               <CreatableSelect
//                                 isMulti
//                                 name="paymentMode"
//                                 options={paymentModeOptions}
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
//                           <div className="row d-flex justify-content-center">
//                             <div className="col-md-8">
//                               <CreatableSelect
//                                 isMulti
//                                 name="academicYear"
//                                 options={academicYearOptions}
//                                 value={selectedYears}
//                                 onChange={(selected, action) => handleSelectChange(selected, action)}
//                                 placeholder="Select Academic Years"
//                                 className="mt-2"
//                                 isLoading={loadingYears}
//                               />
//                             </div>
//                           </div>
//                         )}

//                         {activeTab === 'Installment' && (
//                           <div className="row d-flex justify-content-center">
//                             <div className="col-md-6">
//                               <CreatableSelect
//                                 isMulti
//                                 name="installment"
//                                 options={installmentOptions}
//                                 value={selectedInstallments}
//                                 onChange={(selected, action) => handleSelectChange(selected, action)}
//                                 placeholder="Select Installments"
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
//                         <button className="ms-2 btn btn-primary" onClick={applyFilters}>
//                           Apply
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="container">
//                 <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                   <h2 className="payroll-title text-center mb-0 flex-grow-1">Late Fees and Excess Fees Report</h2>
//                 </div>
//               </div>

//               {isLoading || loadingYears ? (
//                 <div className="text-center mt-3">
//                   <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <p>Loading...</p>
//                 </div>
//               ) : groupedDataArray.length > 0 ? (
//                 <div className="table-responsive pb-4 mt-3">
//                   <table className="table text-dark border border-secondary mb-1">
//                     <thead>
//                       <tr className="payroll-table-header">
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Date</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Academic Year</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Adm No.</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Name</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Class</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Section</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Installment</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Payment Mode</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Cheque No./Transaction No.</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Receipt No.</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Late Fees</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Excess Fees</th>
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {groupedDataArray.map((group, groupIndex) =>
//                         group.rows.map((record, rowIndex) => (
//                           <tr key={`${record.admissionNumber}_${record.installmentName}_${groupIndex}_${rowIndex}`}>
//                             {/* {rowIndex === 0 && ( */}
//                             <td
//                               className="text-center align-middle border border-secondary text-nowrap p-2"
//                             // rowSpan={group.rows.length}
//                             >
//                               {formatDate(record.paymentDate)}
//                             </td>
//                             {/* )} */}
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {formatAcademicYear(record.academicYear) || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {record.admissionNumber || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {record.studentName || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {record.className || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {record.sectionName || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {record.installmentName || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {record.paymentMode || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {record.chequeNoOrTransactionNo || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {record.receiptNo || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {(record.paidFine || 0)}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {(record.excessFees || 0)}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {((record.paidFine || 0) + (record.excessFees || 0))}
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                     <tfoot>
//                       <tr className="payroll-table-footer">
//                         <td colSpan={10} className="text-right border border-secondary p-2">
//                           <strong>Total</strong>
//                         </td>
//                         <td className="text-center border border-secondary p-2">
//                           <strong>{totals.totalPaidFine}</strong>
//                         </td>
//                         <td className="text-center border border-secondary p-2">
//                           <strong>{totals.totalExcessFees}</strong>
//                         </td>
//                         <td className="text-center border border-secondary p-2">
//                           <strong>{totals.total}</strong>
//                         </td>
//                       </tr>
//                     </tfoot>
//                   </table>
//                 </div>
//               ) : (
//                 <div className="text-center mt-3">
//                   <p>
//                     No paid installments match the selected filters for{' '}
//                     {selectedYears.map((y) => formatAcademicYear(y.value)).join(', ') ||
//                       formatAcademicYear(selectedAcademicYear)}.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LateandExcessFee;

import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';
import { exportToExcel, exportToPDF } from './ExportModalLateandExcessFee';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const formatDate = (dateStr) => {
  if (!dateStr || dateStr === '-') return '-';
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString('en-GB').split('/').join('/');
};

const LateandExcessFee = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Date');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [school, setSchool] = useState(null);
  const [logoSrc, setLogoSrc] = useState('');
  const [feeData, setFeeData] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [paymentModeOptions, setPaymentModeOptions] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dropdownRef = useRef(null);

  const tabs = ['Date', 'Payment Mode', 'Class & Section', 'Academic Year', 'Installment'];

  const pageShowOptions = [
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
  ];

  const formatAcademicYear = (year) => {
    if (!year) return '-';
    const [startYear, endYear] = year.split('-');
    return `${startYear}-${endYear?.slice(-2) || ''}`;
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
          const years = response.data.data
            .map((item) => item.academicYear)
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));
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
            setSelectedYears([{ value: latestYear, label: formatAcademicYear(latestYear) }]);
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

  const fetchFeeData = async (years) => {
    setIsLoading(true);
    try {
      const promises = years.map((year) =>
        getAPI(`/get-all-students-fees-with-late-fees?schoolId=${schoolId}&academicYear=${year}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`)
      );
      const responses = await Promise.all(promises);
      const unifiedData = responses.flatMap((res, index) => {
        if (!res?.data?.data) {
          console.warn(`No data found for year ${years[index]}`);
          return [];
        }
        return res.data.data;
      });

      const processedData = unifiedData.flatMap((record) =>
        (record.reportStatus || ['Paid']).map((status) => ({
          ...record,
          status,
          displayDate: status === 'Paid' ? record.paymentDate : record.cancelledDate,
          lateFees: (status === 'Cancelled' || status === 'Cheque Return') ? -(record.lateFees || 0) : (record.lateFees || 0),
          paidFine: (status === 'Cancelled' || status === 'Cheque Return') ? -(record.paidFine || 0) : (record.paidFine || 0),
          excessFees: (status === 'Cancelled' || status === 'Cheque Return') ? -(record.excessFees || 0) : (record.excessFees || 0),
        }))
      ).filter(
        (record) => Math.abs(record.lateFees) > 0 || Math.abs(record.paidFine) > 0 || Math.abs(record.excessFees) > 0
      );

      const allFeeTypes = responses
        .flatMap((res) => res?.data?.feeTypes || [])
        .filter((type, index, self) => type && self.indexOf(type) === index)
        .sort();

      setFeeTypes(allFeeTypes);
      setFeeData(processedData);

      const filterOptions = responses[0]?.data?.filterOptions || {};
      setClassOptions(filterOptions.classOptions || []);
      setSectionOptions(filterOptions.sectionOptions || []);
      setInstallmentOptions(filterOptions.installmentOptions || []);
      setPaymentModeOptions(filterOptions.paymentModeOptions || []);
    } catch (error) {
      toast.error('Error fetching data: ' + error.message);
      setFeeData([]);
      setFeeTypes([]);
      setClassOptions([]);
      setSectionOptions([]);
      setInstallmentOptions([]);
      setPaymentModeOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!schoolId || !selectedAcademicYear) return;
    const yearsToFetch = selectedYears.length > 0
      ? selectedYears.map((year) => year.value)
      : [selectedAcademicYear];
    fetchFeeData(yearsToFetch);
  }, [schoolId, selectedAcademicYear, selectedYears]);

  const handleSelectChange = (selectedOptions, { name }) => {
    const selected = selectedOptions || [];
    if (name === 'academicYear') {
      setSelectedYears(selected);
      setCurrentPage(1);
    } else if (name === 'paymentMode') {
      setSelectedPaymentModes(selected);
      setCurrentPage(1);
    } else if (name === 'class') {
      setSelectedClasses(selected);
      setCurrentPage(1);
    } else if (name === 'section') {
      setSelectedSections(selected);
      setCurrentPage(1);
    } else if (name === 'installment') {
      setSelectedInstallments(selected);
      setCurrentPage(1);
    } else if (name === 'rowsPerPage') {
      setRowsPerPage(selected ? selected.value : 10);
      setCurrentPage(1);
    }
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
    setCurrentPage(1);
    const yearsToFetch = selectedYears.length > 0
      ? selectedYears.map((year) => year.value)
      : [selectedAcademicYear];
    fetchFeeData(yearsToFetch);
  };

  const resetFilters = () => {
    setSelectedYears([]);
    setSelectedPaymentModes([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setSelectedInstallments([]);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setCurrentPage(1);
    setShowFilterPanel(false);
    fetchFeeData([selectedAcademicYear]);
  };

  const toggleFilter = () => {
    setShowFilterPanel(!showFilterPanel);
    setShowExportDropdown(false);
  };

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
    setShowFilterPanel(false);
  };

  const filteredData = feeData.filter((row) => {
    const matchesSearchTerm = searchTerm
      ? formatDate(row.displayDate).toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.className || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.sectionName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.installmentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.paymentMode || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.chequeNoOrTransactionNo || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.receiptNo || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.status || '').toLowerCase().includes(String(searchTerm).toLowerCase())
      : true;

    const matchesPaymentMode =
      selectedPaymentModes.length === 0 ||
      selectedPaymentModes.some((mode) => row.paymentMode === mode.value);

    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.some((year) => row.academicYear === year.value);

    const matchesDate =
      (!startDate && !endDate) ||
      (() => {
        if (!row.displayDate || row.displayDate === '-') return false;
        const recordDate = new Date(row.displayDate.split('/').reverse().join('-'));
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || recordDate >= start) && (!end || recordDate <= end);
      })();

    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => row.className === cls.value);

    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((section) => row.sectionName === section.value);

    const matchesInstallment =
      selectedInstallments.length === 0 ||
      selectedInstallments.some((inst) => row.installmentName === inst.value);

    return (
      matchesSearchTerm &&
      matchesPaymentMode &&
      matchesYear &&
      matchesDate &&
      matchesClass &&
      matchesSection &&
      matchesInstallment
    );
  });

  const groupedData = filteredData.reduce((acc, row) => {
    const date = formatDate(row.displayDate);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(row);
    return acc;
  }, {});

  const groupedDataArray = Object.keys(groupedData)
    .map((date) => ({
      paymentDate: date,
      rows: groupedData[date].sort((a, b) =>
        a.admissionNumber.localeCompare(b.admissionNumber) ||
        a.installmentName.localeCompare(b.installmentName) ||
        a.status.localeCompare(b.status)
      ),
    }))
    .sort((a, b) => {
      if (a.paymentDate === '-' || b.paymentDate === '-') return 0;
      return (
        new Date(a.paymentDate.split('/').reverse().join('-')).getTime() -
        new Date(b.paymentDate.split('/').reverse().join('-')).getTime()
      );
    });

  const totals = filteredData.reduce(
    (acc, row) => {
      acc.totalLateFees += row.lateFees || 0;
      acc.totalPaidFine += row.paidFine || 0;
      acc.totalExcessFees += row.excessFees || 0;
      acc.total += (row.lateFees || 0) + (row.paidFine || 0) + (row.excessFees || 0);
      return acc;
    },
    { totalLateFees: 0, totalPaidFine: 0, totalExcessFees: 0, total: 0 }
  );

  const totalRecords = groupedDataArray.reduce((sum, group) => sum + group.rows.length, 0);
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const maxPagesToShow = 5;
  const pagesToShow = [];
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  const paginatedData = () => {
    const sortedGroups = groupedDataArray;
    let currentCount = 0;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginated = [];

    for (const group of sortedGroups) {
      for (const record of group.rows) {
        if (currentCount >= startIndex && currentCount < endIndex) {
          paginated.push({ paymentDate: group.paymentDate, record });
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

  const headerMapping = {
    displayDate: 'Date',
    academicYear: 'Academic Year',
    admissionNumber: 'Adm No.',
    status: 'Status',
    studentName: 'Name',
    className: 'Class',
    sectionName: 'Section',
    installmentName: 'Installment',
    paymentMode: 'Payment Mode',
    chequeNoOrTransactionNo: 'Cheque No./Transaction No.',
    receiptNo: 'Receipt No.',
    paidFine: 'Late Fees',
    excessFees: 'Excess Fees',
    total: 'Total',
  };

  const tableFields = Object.keys(headerMapping).map((key) => ({
    id: key,
    label: headerMapping[key],
  }));

  const getFieldValue = (record, field) => {
    const fieldId = field.id;
    if (fieldId === 'displayDate') {
      return formatDate(record[fieldId]) || '-';
    } else if (fieldId === 'academicYear') {
      return formatAcademicYear(record[fieldId]) || '-';
    } else if (fieldId === 'total') {
      return (record.lateFees || 0) + (record.paidFine || 0) + (record.excessFees || 0);
    } else {
      return record[fieldId] !== undefined ? record[fieldId] : '-';
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card m-2">
            <div className="card-body p-2">
              <div className="container">
                <div className="row p-1 border border-dark rounded" style={{ background: '#bfbfbf' }}>
                  <div className="col-md-5 col-12">
                    <input
                      type="text"
                      className="form-control border-dark"
                      placeholder="Search by any field"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-5 px-0 d-flex align-items-center justify-content-end">
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
                      className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
                      style={{ cursor: 'pointer' }}
                      onClick={toggleFilter}
                    >
                      <FaFilter />
                    </div>
                    <div className="position-relative" ref={dropdownRef}>
                      <div
                        className="p-1 px-2 border mr-2 border-dark finance-filter-icon"
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
                                  totals,
                                  formatAcademicYear,
                                  selectedYears.length > 0
                                    ? selectedYears.map((y) => y.value).join(',')
                                    : selectedAcademicYear
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
                              setIsExporting(true);
                              try {
                                await exportToPDF(
                                  filteredData,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  totals,
                                  formatAcademicYear,
                                  selectedYears.length > 0
                                    ? selectedYears.map((y) => y.value).join(',')
                                    : selectedAcademicYear,
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
                  <div className="row mt-2 border mt-1 border-light rounded px-md-3 p-3">
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
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                              <label className="form-label">Start Date</label>
                              <div className="input-group">
                                <input
                                  type="date"
                                  className="form-control"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">End Date</label>
                              <div className="input-group">
                                <input
                                  type="date"
                                  className="form-control"
                                  value={endDate}
                                  onChange={(e) => setEndDate(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'Payment Mode' && (
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="paymentMode"
                                options={paymentModeOptions}
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

                        {activeTab === 'Academic Year' && (
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="academicYear"
                                options={academicYearOptions}
                                value={selectedYears}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Academic Years"
                                className="mt-2"
                                isLoading={loadingYears}
                              />
                            </div>
                          </div>
                        )}

                        {activeTab === 'Installment' && (
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                              <CreatableSelect
                                isMulti
                                name="installment"
                                options={installmentOptions}
                                value={selectedInstallments}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Installments"
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
                        <button className="ms-2 btn btn-primary" onClick={applyFilters}>
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Late Fees and Excess Fees Report</h2>
                </div>
              </div>

              {isLoading || loadingYears ? (
                <div className="text-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Loading...</p>
                </div>
              ) : paginatedData().length > 0 ? (
                <>
                  <div className="table-responsive pb-4 mt-3">
                    <table className="table text-dark border border-secondary mb-1">
                      <thead>
                        <tr className="payroll-table-header">
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Date</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Academic Year</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Adm No.</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Status</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Name</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Class</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Section</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Installment</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Payment Mode</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Cheque No./Transaction No.</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Receipt No.</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Late Fees</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Excess Fees</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData().map(({ paymentDate, record }, index) => (
                          <tr key={`${record.admissionNumber}_${record.installmentName}_${record.status}_${index}`}>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {formatDate(record.displayDate)}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {formatAcademicYear(record.academicYear) || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.admissionNumber || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.status || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.studentName || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.className || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.sectionName || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.installmentName || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.paymentMode || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.chequeNoOrTransactionNo || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.receiptNo || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.paidFine || 0}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.excessFees || 0}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {(record.lateFees || 0) + (record.paidFine || 0) + (record.excessFees || 0)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="payroll-table-footer">
                          <td colSpan={11} className="text-right border border-secondary p-2">
                            <strong>Total</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.totalPaidFine}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.totalExcessFees}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.total}</strong>
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
                  <p>
                    No paid installments match the selected filters for{' '}
                    {selectedYears.map((y) => formatAcademicYear(y.value)).join(', ') ||
                      formatAcademicYear(selectedAcademicYear)}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LateandExcessFee;