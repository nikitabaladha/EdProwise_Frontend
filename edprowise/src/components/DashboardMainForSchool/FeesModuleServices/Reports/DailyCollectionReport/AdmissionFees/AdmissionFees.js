// import React, { useState, useEffect } from 'react';
// import { FaFilter, FaDownload } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import CreatableSelect from 'react-select/creatable';
// import getAPI from '../../../../../../api/getAPI';
// import { Link } from 'react-router-dom';
// import ExportModal from './ExportModal';

// const AdmissionFees = () => {
//   const headerMapping = {
//     admFeesDate: 'Date',
//     academicYear: 'Academic Year',
//     admNo: 'Adm No.',
//     studentName: 'Name',
//     class: 'Class',
//     section: 'Section',
//     admFeesPaymentMode: 'Payment Mode',
//     admFeesTransactionNo: 'Cheque No./Transaction No.',
//     admFeesReceiptNo: 'Receipts No.',
//     admFeesDue: 'Fees Due',
//     admFeesPaid: 'Fees Paid',
//     admFeesConcession: 'Concession',
//   };

//   const [showFilterPanel, setShowFilterPanel] = useState(false);
//     const [showExportModal, setShowExportModal] = useState(false);
//   const [activeTab, setActiveTab] = useState('Date');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [schoolId, setSchoolId] = useState('');
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
//   const tabs = ['Date', 'Payment Mode', 'Class & Section', 'Section', 'Academic Year'];

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
//     const fetchAdmissionData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await getAPI(`/get-all-data-admission?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
//         if (!response?.data?.data) {
//           throw new Error('No admission data found');
//         }

//         const data = response.data.data;
//         data.sort((a, b) => (a.student.admissionNo || '-').localeCompare(b.student.admissionNo || '-'));
//         setFeeData(data);

//         const modes = new Set(data.map(record => record.student?.admFeesPaymentMode).filter(mode => mode && mode !== '-'));
//         setPaymentModes(Array.from(modes).map(mode => ({ value: mode, label: mode })));

//         const classes = new Set(data.map(record => record.className).filter(cls => cls && cls !== '-'));
//         setClassOptions(Array.from(classes).map(cls => ({ value: cls, label: cls })));

//         const sections = new Set(data.map(record => record.sectionName).filter(sec => sec && sec !== '-'));
//         setSectionOptions(Array.from(sections).map(sec => ({ value: sec, label: sec })));
//       } catch (error) {
//         toast.error('Error fetching admission data: ' + error.message);
//         setFeeData([]);
//         setPaymentModes([]);
//         setClassOptions([]);
//         setSectionOptions([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchAdmissionData();
//   }, [schoolId, selectedAcademicYear]);

//   const handleSelectChange = (selectedOptions, { name }) => {
//     if (name === 'academicYear') {
//       const selectedYear = selectedOptions?.value || '';
//       setSelectedAcademicYear(selectedYear);
//     } else if (name === 'paymentMode') {
//       setSelectedPaymentModes(selectedOptions || []);
//     } else if (name === 'class') {
//       setSelectedClasses(selectedOptions || []);
//     } else if (name === 'section') {
//       setSelectedSections(selectedOptions || []);
//     }
//   };

//   const resetFilters = () => {
//     setSelectedPaymentModes([]);
//     setSelectedClasses([]);
//     setSelectedSections([]);
//     setStartDate('');
//     setEndDate('');
//     setSearchTerm('');
//    const storedYear = localStorage.getItem('selectedAcademicYear');
//   if (storedYear) {
//     setSelectedAcademicYear(storedYear);
//   }
//   };

//   const toggleFilterPanel = () => {
//     setShowFilterPanel(!showFilterPanel);
//   };

//    const toggleExportModal = () => {
//     setShowExportModal(!showExportModal);
//   };


//   const getFieldValue = (record, field) => {
//     const fieldId = field.id;
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
//     } else {
//       return record.student?.[fieldId] || record[fieldId] || '-';
//     }
//   };

//   const calculateBalance = (record) => {
//     const due = parseFloat(record.student?.admFeesDue || 0);
//     const concession = parseFloat(record.student?.admFeesConcession || 0);
//     const paid = parseFloat(record.student?.admFeesPaid || 0);
//     return (due - concession - paid);
//   };

//   const filteredData = feeData.filter((record) => {
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
//       selectedPaymentModes.some((mode) => record.student?.admFeesPaymentMode === mode.value);
//     const matchesClass =
//       selectedClasses.length === 0 ||
//       selectedClasses.some((cls) => record.className === cls.value);
//     const matchesSection =
//       selectedSections.length === 0 ||
//       selectedSections.some((sec) => record.sectionName === sec.value);
//     const matchesDate =
//       (!startDate && !endDate) ||
//       (record.student?.admFeesDate !== '-' &&
//         (() => {
//           const recordDate = new Date(record.student.admFeesDate.split('-').reverse().join('-'));
//           const start = startDate ? new Date(startDate) : null;
//           const end = endDate ? new Date(endDate) : null;
//           return (!start || recordDate >= start) && (!end || recordDate <= end);
//         })());
//     return matchesSearchTerm && matchesPaymentMode && matchesClass && matchesSection && matchesDate;
//   });

//   const totals = filteredData.reduce(
//     (acc, record) => {
//       const due = parseFloat(record.student?.admFeesDue || 0);
//       const paid = parseFloat(record.student?.admFeesPaid || 0);
//       const concession = parseFloat(record.student?.admFeesConcession || 0);
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
//                       className="py-1 px-2 mr-2 border border-dark finance-filter-icon"
//                       style={{ cursor: 'pointer' }}
//                       onClick={toggleFilterPanel}
//                     >
//                       <FaFilter />
//                     </div>

//                       <div
//                       className="py-1 px-2 mr-2 border border-dark finance-filter-icon"
//                       style={{ cursor: 'pointer' }}
//                       onClick={toggleExportModal}
//                       title="Download"
//                     >
//                             <FaDownload />
//                     </div>
//                   </div>
//                    <ExportModal
//               isOpen={showExportModal}
//               onClose={toggleExportModal}
//               filteredData={filteredData}
//               tableFields={tableFields}
//               headerMapping={headerMapping}
//               getFieldValue={getFieldValue}
//               calculateBalance={calculateBalance}
//               totals={totals}
//               formatAcademicYear={formatAcademicYear}
//               selectedAcademicYear={selectedAcademicYear}
//               schoolId={schoolId}
//             />
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
//                         {/* {activeTab === 'Section' && (
//                           <div className="row d-lg-flex justify-content-center">
//                             <div className="col-md-8">
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
//                         )} */}
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
//                   <h2 className="payroll-title text-center mb-0 flex-grow-1">Admission Fees Report</h2>
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
//                           <th key={field.id} className="text-center align-middle border border-secondary text-nowrap p-2">
//                             {headerMapping[field.id] || field.label}
//                           </th>
//                         ))}
//                         <th className="text-center align-middle border border-secondary text-nowrap p-2">Balance</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredData.length > 0 ? (
//                         filteredData.map((record, index) => (
//                           <tr key={`${record.student.admissionNo}_${index}`} className="payroll-table-row">
//                             {tableFields.map((field) => (
//                               <td key={field.id} className="text-center align-middle border border-secondary text-nowrap p-2">
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
//                         <td colSpan={tableFields.length - 3} className="text-right border border-secondary p-2"><strong>Total</strong></td>
//                         <td className="text-center border border-secondary p-2"><strong>{totals.feesDue}</strong></td>
//                         <td className="text-center border border-secondary p-2"><strong>{totals.feesPaid}</strong></td>
//                         <td className="text-center border border-secondary p-2"><strong>{totals.concession}</strong></td>
//                         <td className="text-center border border-secondary p-2"><strong>{totals.balance}</strong></td>
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

// export default AdmissionFees;


import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import getAPI from '../../../../../../api/getAPI';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from './ExportModal';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const AdmissionFees = () => {
  const headerMapping = {
    admFeesDate: 'Date',
    academicYear: 'Academic Year',
    admNo: 'Adm No.',
    studentName: 'Name',
    class: 'Class',
    section: 'Section',
    admFeesPaymentMode: 'Payment Mode',
    admFeesTransactionNo: 'Cheque No./Transaction No.',
    admFeesReceiptNo: 'Receipts No.',
    admFeesDue: 'Fees Due',
    admFeesPaid: 'Fees Paid',
    admFeesConcession: 'Concession',
  };

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Date');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [school, setSchool] = useState(null);
  const [logoSrc, setLogoSrc] = useState('');
  const [paymentModes, setPaymentModes] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [tableFields] = useState(
    Object.keys(headerMapping).map((key) => ({
      id: key,
      label: headerMapping[key],
    }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dropdownRef = useRef(null);
  const tabs = ['Date', 'Payment Mode', 'Class & Section', 'Section', 'Academic Year'];

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
    const fetchAdmissionData = async () => {
      setIsLoading(true);
      try {
        const response = await getAPI(`/get-all-data-admission?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
        if (!response?.data?.data) {
          throw new Error('No admission data found');
        }

        const data = response.data.data;
        data.sort((a, b) => (a.student.admissionNo || '-').localeCompare(b.student.admissionNo || '-'));
        setFeeData(data);

        const modes = new Set(data.map(record => record.student?.admFeesPaymentMode).filter(mode => mode && mode !== '-'));
        setPaymentModes(Array.from(modes).map(mode => ({ value: mode, label: mode })));

        const classes = new Set(data.map(record => record.className).filter(cls => cls && cls !== '-'));
        setClassOptions(Array.from(classes).map(cls => ({ value: cls, label: cls })));

        const sections = new Set(data.map(record => record.sectionName).filter(sec => sec && sec !== '-'));
        setSectionOptions(Array.from(sections).map(sec => ({ value: sec, label: sec })));
      } catch (error) {
        toast.error('Error fetching admission data: ' + error.message);
        setFeeData([]);
        setPaymentModes([]);
        setClassOptions([]);
        setSectionOptions([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdmissionData();
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
    } else if (name === 'paymentMode') {
      setSelectedPaymentModes(selectedOptions || []);
    } else if (name === 'class') {
      setSelectedClasses(selectedOptions || []);
    } else if (name === 'section') {
      setSelectedSections(selectedOptions || []);
    }
  };

  const resetFilters = () => {
    setSelectedPaymentModes([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
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
      return record.student?.studentName || '-';
    } else if (fieldId === 'admNo') {
      return record.student?.admissionNo || '-';
    } else if (fieldId === 'class') {
      return record.className || '-';
    } else if (fieldId === 'section') {
      return record.sectionName || '-';
    } else {
      return record.student?.[fieldId] || record[fieldId] || '-';
    }
  };

  const calculateBalance = (record) => {
    const due = parseFloat(record.student?.admFeesDue || 0);
    const concession = parseFloat(record.student?.admFeesConcession || 0);
    const paid = parseFloat(record.student?.admFeesPaid || 0);
    return (due - concession - paid);
  };

  const filteredData = feeData.filter((record) => {
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
      selectedPaymentModes.some((mode) => record.student?.admFeesPaymentMode === mode.value);
    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => record.className === cls.value);
    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((sec) => record.sectionName === sec.value);
    const matchesDate =
      (!startDate && !endDate) ||
      (record.student?.admFeesDate !== '-' &&
        (() => {
          const recordDate = new Date(record.student.admFeesDate.split('-').reverse().join('-'));
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;
          return (!start || recordDate >= start) && (!end || recordDate <= end);
        })());
    return matchesSearchTerm && matchesPaymentMode && matchesClass && matchesSection && matchesDate;
  });

  const totals = filteredData.reduce(
    (acc, record) => {
      const due = parseFloat(record.student?.admFeesDue || 0);
      const paid = parseFloat(record.student?.admFeesPaid || 0);
      const concession = parseFloat(record.student?.admFeesConcession || 0);
      const balance = due - concession - paid;
      return {
        feesDue: acc.feesDue + due,
        feesPaid: acc.feesPaid + paid,
        concession: acc.concession + concession,
        balance: acc.balance + balance,
      };
    },
    { feesDue: 0, feesPaid: 0, concession: 0, balance: 0 }
  );

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
                                toast.error("Export to Excel failed");
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
                                toast.error("Export to PDF failed");
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
                        {activeTab === 'Section' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Admission Fees Report</h2>
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
                <div className="table-responsive pb-4 mt-3">
                  <table className="table text-dark border border-secondary mb-1">
                    <thead>
                      <tr className="payroll-table-header">
                        {tableFields.map((field) => (
                          <th key={field.id} className="text-center align-middle border border-secondary text-nowrap p-2">
                            {headerMapping[field.id] || field.label}
                          </th>
                        ))}
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((record, index) => (
                          <tr key={`${record.student.admissionNo}_${index}`} className="payroll-table-row">
                            {tableFields.map((field) => (
                              <td key={field.id} className="text-center align-middle border border-secondary text-nowrap p-2">
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
                        <td colSpan={tableFields.length - 3} className="text-right border border-secondary p-2"><strong>Total</strong></td>
                        <td className="text-center border border-secondary p-2"><strong>{totals.feesDue}</strong></td>
                        <td className="text-center border border-secondary p-2"><strong>{totals.feesPaid}</strong></td>
                        <td className="text-center border border-secondary p-2"><strong>{totals.concession}</strong></td>
                        <td className="text-center border border-secondary p-2"><strong>{totals.balance}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
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

export default AdmissionFees;