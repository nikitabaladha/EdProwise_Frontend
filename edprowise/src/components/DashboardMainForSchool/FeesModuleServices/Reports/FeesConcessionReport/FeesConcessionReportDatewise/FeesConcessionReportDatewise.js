// // import React, { useState, useEffect, useRef } from 'react';
// // import { FaFilter, FaDownload } from 'react-icons/fa';
// // import { toast } from 'react-toastify';
// // import CreatableSelect from 'react-select/creatable';
// // import Select from 'react-select';
// // import { Link } from 'react-router-dom';
// // import getAPI from '../../../../../../api/getAPI';
// // import { fetchSchoolData } from '../../../PdfUtlisReport';
// // import { exportToExcel, exportToPDF } from './ExportConcessionReport';

// // const ConcessionReport = () => {
// //   const [showFilterPanel, setShowFilterPanel] = useState(false);
// //   const [showExportDropdown, setShowExportDropdown] = useState(false);
// //   const [activeTab, setActiveTab] = useState('Date');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [schoolId, setSchoolId] = useState('');
// //   const [school, setSchool] = useState(null);
// //   const [logoSrc, setLogoSrc] = useState('');
// //   const [feeData, setFeeData] = useState([]);
// //   const [feeTypes, setFeeTypes] = useState([]);
// //   const [feeTypeOptions, setFeeTypeOptions] = useState([]);
// //   const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isExporting, setIsExporting] = useState(false);
// //   const [loadingYears, setLoadingYears] = useState(false);
// //   const [academicYearOptions, setAcademicYearOptions] = useState([]);
// //   const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
// //   const [selectedYears, setSelectedYears] = useState([]);
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');
// //   const [classOptions, setClassOptions] = useState([]);
// //   const [selectedClasses, setSelectedClasses] = useState([]);
// //   const [sectionOptions, setSectionOptions] = useState([]);
// //   const [selectedSections, setSelectedSections] = useState([]);
// //   const [classSectionMap, setClassSectionMap] = useState({});
// //   const [installmentOptions, setInstallmentOptions] = useState([]);
// //   const [selectedInstallments, setSelectedInstallments] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [rowsPerPage, setRowsPerPage] = useState('all');
// //   const dropdownRef = useRef(null);

// //   const tabs = ['Date', 'Academic Year', 'Class & Section', 'Fee Type', 'Installment'];
// //   const pageShowOptions = [
// //     { value: 'all', label: 'All' },
// //     { value: 10, label: '10' },
// //     { value: 15, label: '15' },
// //     { value: 20, label: '20' },
// //     { value: 30, label: '30' },
// //   ];

// //   const formatAcademicYear = (year) => {
// //     if (!year) return '-';
// //     const [startYear, endYear] = year.split('-');
// //     return `${startYear}-${endYear?.slice(-2) || ''}`;
// //   };

// //   const formatDate = (dateStr) => {
// //     if (!dateStr || dateStr === '-') return '-';
// //     const [day, month, year] = dateStr.split('/');
// //     return `${day}-${month}-${year}`;
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
// //     const loadSchoolData = async () => {
// //       try {
// //         const { school, logoSrc } = await fetchSchoolData(schoolId);
// //         console.log('School data:', school, 'LogoSrc:', logoSrc);
// //         setSchool(school);
// //         setLogoSrc(logoSrc);
// //       } catch (error) {
// //         console.error('Failed to fetch school data:', error);
// //         toast.error('Failed to fetch school data.');
// //       }
// //     };
// //     if (schoolId) {
// //       loadSchoolData();
// //     }
// //   }, [schoolId]);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setShowExportDropdown(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     const fetchAcademicYears = async () => {
// //       try {
// //         setLoadingYears(true);
// //         const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
// //         console.log('Academic years API response:', response);
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
// //         toast.error('Error fetching academic years: ' + err.message);
// //         console.error('Error fetching academic years:', err);
// //       } finally {
// //         setLoadingYears(false);
// //       }
// //     };
// //     if (schoolId) {
// //       fetchAcademicYears();
// //     }
// //   }, [schoolId]);

// //   useEffect(() => {
// //     if (Object.keys(classSectionMap).length === 0) {
// //       const sections = new Set(feeData.map(row => row.sectionName).filter(sec => sec && sec !== '-'));
// //       setSectionOptions(Array.from(sections).map(sec => ({ value: sec, label: sec })));
// //       if (selectedClasses.length === 0) {
// //         setSelectedSections([]);
// //       }
// //       return;
// //     }

// //     let validSections = new Set();
// //     if (selectedClasses.length === 0) {
// //       Object.values(classSectionMap).forEach(sectionSet => {
// //         sectionSet.forEach(section => validSections.add(section));
// //       });
// //       setSelectedSections([]);
// //     } else {
// //       selectedClasses.forEach(cls => {
// //         const sectionsForClass = classSectionMap[cls.value] || new Set();
// //         sectionsForClass.forEach(section => validSections.add(section));
// //       });
// //     }

// //     const newSectionOptions = Array.from(validSections).map(sec => ({ value: sec, label: sec }));
// //     setSectionOptions(newSectionOptions);

// //     const validSectionValues = new Set(newSectionOptions.map(opt => opt.value));
// //     const updatedSelectedSections = selectedSections.filter(sec => validSectionValues.has(sec.value));
// //     if (updatedSelectedSections.length !== selectedSections.length) {
// //       setSelectedSections(updatedSelectedSections);
// //     }
// //   }, [selectedClasses, classSectionMap, feeData]);

// //   const fetchFeeData = async (years) => {
// //     setIsLoading(true);
// //     try {
// //       const promises = years.map((year) =>
// //         getAPI(`/get-all-Ddatewise-concession-report?schoolId=${schoolId}&academicYear=${year}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`)
// //       );
// //       const responses = await Promise.all(promises);
// //       const unifiedData = responses.flatMap((res, index) => {
// //         if (!res?.data?.data) {
// //           console.warn(`No data found for year ${years[index]}`);
// //           return [];
// //         }
// //         return res.data.data;
// //       });

// //       console.log('Processed Data (unifiedData):', unifiedData);

// //       const allFeeTypes = responses
// //         .flatMap((res) => res?.data?.feeTypes || [])
// //         .filter((type, index, self) => self.indexOf(type) === index)
// //         .sort();

// //       const classes = unifiedData
// //         .map((row) => row.className)
// //         .filter((name, index, self) => name && name !== '-' && self.indexOf(name) === index)
// //         .sort()
// //         .map((name) => ({ value: name, label: name }));

// //       const sections = unifiedData
// //         .map((row) => row.sectionName)
// //         .filter((name, index, self) => name && name !== '-' && self.indexOf(name) === index)
// //         .sort()
// //         .map((name) => ({ value: name, label: name }));

// //       const installments = unifiedData
// //         .map((row) => row.installmentName)
// //         .filter((name, index, self) => name && name !== '-' && self.indexOf(name) === index)
// //         .sort()
// //         .map((name) => ({ value: name, label: name }));

// //       const classSectionMapping = {};
// //       unifiedData.forEach(row => {
// //         const className = row.className;
// //         const sectionName = row.sectionName;
// //         if (className && className !== '-' && sectionName && sectionName !== '-') {
// //           if (!classSectionMapping[className]) {
// //             classSectionMapping[className] = new Set();
// //           }
// //           classSectionMapping[className].add(sectionName);
// //         }
// //       });
// //       setClassSectionMap(classSectionMapping);

// //       setFeeTypes(allFeeTypes);
// //       setFeeTypeOptions(
// //         allFeeTypes.map((type) => ({
// //           value: type,
// //           label: type,
// //         }))
// //       );
// //       setClassOptions(classes);
// //       setSectionOptions(sections);
// //       setInstallmentOptions(installments);
// //       setFeeData(unifiedData);

// //       console.log('Unified Data:', unifiedData);

// //       if (rowsPerPage === 'all' && unifiedData.length > 0) {
// //         setRowsPerPage(unifiedData.length);
// //       }
// //     } catch (error) {
// //       toast.error('Error fetching concession data: ' + error.message);
// //       console.error('Error fetching concession data:', error);
// //       setFeeData([]);
// //       setFeeTypes([]);
// //       setFeeTypeOptions([]);
// //       setClassOptions([]);
// //       setSectionOptions([]);
// //       setInstallmentOptions([]);
// //       setClassSectionMap({});
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
// //   }, [schoolId, selectedAcademicYear, selectedYears, startDate, endDate]);

// //   const handleSelectChange = (selectedOptions, { name }) => {
// //     const selected = selectedOptions || [];
// //     if (name === 'academicYear') {
// //       setSelectedYears(selected);
// //       setCurrentPage(1);
// //     } else if (name === 'feeType') {
// //       setSelectedFeeTypes(selected);
// //       setCurrentPage(1);
// //     } else if (name === 'class') {
// //       setSelectedClasses(selected);
// //       setCurrentPage(1);
// //     } else if (name === 'section') {
// //       setSelectedSections(selected);
// //       setCurrentPage(1);
// //     } else if (name === 'installment') {
// //       setSelectedInstallments(selected);
// //       setCurrentPage(1);
// //     } else if (name === 'rowsPerPage') {
// //       if (selectedOptions?.value === 'all') {
// //         setRowsPerPage(filteredData.length || 'all');
// //       } else {
// //         setRowsPerPage(selectedOptions ? selectedOptions.value : 10);
// //       }
// //       setCurrentPage(1);
// //     }
// //   };

// //   const applyFilters = () => {
// //     setShowFilterPanel(false);
// //     setCurrentPage(1);
// //     const yearsToFetch = selectedYears.length > 0
// //       ? selectedYears.map((year) => year.value)
// //       : [selectedAcademicYear];
// //     fetchFeeData(yearsToFetch);
// //   };

// //   const resetFilters = () => {
// //     setSelectedYears([]);
// //     setSelectedFeeTypes([]);
// //     setStartDate('');
// //     setEndDate('');
// //     setSelectedClasses([]);
// //     setSelectedSections([]);
// //     setSelectedInstallments([]);
// //     setSearchTerm('');
// //     setCurrentPage(1);
// //     setRowsPerPage('all');
// //     setShowFilterPanel(false);
// //     fetchFeeData([selectedAcademicYear]);
// //   };

// //   const toggleFilter = () => {
// //     setShowFilterPanel(!showFilterPanel);
// //     setShowExportDropdown(false);
// //   };

// //   const toggleExportDropdown = () => {
// //     setShowExportDropdown(!showExportDropdown);
// //     setShowFilterPanel(false);
// //   };

// //   const nonZeroFeeTypes = feeTypes.filter((type) =>
// //     feeData.some((row) => {
// //       const key = type.replace(/\s+/g, '');
// //       return row[key] && row[key] !== 0;
// //     })
// //   );

// //   const filteredData = feeData.filter((row) => {
// //     const matchesSearchTerm = searchTerm
// //       ? (row.date || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
// //         (row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
// //         (row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase())
// //       : true;

// //     const matchesYear =
// //       selectedYears.length === 0 ||
// //       selectedYears.some((year) => row.academicYear === year.value);

// //     const matchesDate =
// //       (!startDate && !endDate) ||
// //       (() => {
// //         if (!row.date || row.date === '-') return false;
// //         const recordDate = new Date(row.date.split('/').reverse().join('-'));
// //         const start = startDate ? new Date(startDate) : null;
// //         const end = endDate ? new Date(endDate) : null;
// //         return (!start || recordDate >= start) && (!end || recordDate <= end);
// //       })();

// //     const matchesFeeType =
// //       selectedFeeTypes.length === 0 ||
// //       selectedFeeTypes.some((feeType) => {
// //         const key = feeType.value.replace(/\s+/g, '');
// //         return row[key] && row[key] !== 0;
// //       });

// //     const matchesClass =
// //       selectedClasses.length === 0 ||
// //       selectedClasses.some((cls) => row.className === cls.value);

// //     const matchesSection =
// //       selectedSections.length === 0 ||
// //       selectedSections.some((sec) => row.sectionName === sec.value);

// //     const matchesInstallment =
// //       selectedInstallments.length === 0 ||
// //       selectedInstallments.some((inst) => row.installmentName === inst.value);

// //     return matchesSearchTerm && matchesYear && matchesDate && matchesFeeType && matchesClass && matchesSection && matchesInstallment;
// //   });

// //   console.log('Filtered Data:', filteredData);

// //   const displayedFeeTypes = selectedFeeTypes.length > 0
// //     ? selectedFeeTypes.map((ft) => ft.value).filter((type) => nonZeroFeeTypes.includes(type))
// //     : nonZeroFeeTypes;

// //   const headerMapping = displayedFeeTypes.reduce((acc, type) => {
// //     const key = type.replace(/\s+/g, '');
// //     acc[key] = type.endsWith('Fee') ? `${type}s` : type;
// //     return acc;
// //   }, { academicYear: 'Academic Year', date: 'Date', Total: 'Total' });

// //   const tableFields = [
// //     { id: 'academicYear', label: 'Academic Year' },
// //     { id: 'date', label: 'Date' },
// //     ...displayedFeeTypes.map((type) => ({
// //       id: type.replace(/\s+/g, ''),
// //       label: headerMapping[type.replace(/\s+/g, '')] || type,
// //     })),
// //     { id: 'Total', label: 'Total' },
// //   ];

// //   const getFieldValue = (record, field) => {
// //     const fieldId = field.id;
// //     if (fieldId === 'academicYear') {
// //       return formatAcademicYear(record[fieldId]) || '-';
// //     }
// //     if (fieldId === 'date') {
// //       return formatDate(record[fieldId]) || '-';
// //     }
// //     if (fieldId === 'Total' || displayedFeeTypes.includes(fieldId.replace(/\s+/g, ''))) {
// //       return record[fieldId] !== undefined && record[fieldId] !== 0 ? Number(record[fieldId]).toFixed(2) : '-';
// //     }
// //     return record[fieldId] !== undefined && record[fieldId] !== 0 ? Number(record[fieldId]).toFixed(2) : '-';
// //   };

// //   const totalRecords = filteredData.length;
// //   const totalPages = rowsPerPage === 'all' ? 1 : Math.ceil(totalRecords / rowsPerPage);

// //   const maxPagesToShow = 5;
// //   const pagesToShow = [];
// //   const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
// //   const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

// //   for (let i = startPage; i <= endPage; i++) {
// //     pagesToShow.push(i);
// //   }

// //   const paginatedData = () => {
// //     const sortedData = filteredData.sort((a, b) => {
// //       if (a.date === '-' || b.date === '-') return 0;
// //       return (
// //         new Date(a.date.split('/').reverse().join('-')).getTime() -
// //         new Date(b.date.split('/').reverse().join('-')).getTime()
// //       );
// //     });
// //     if (rowsPerPage === 'all') return sortedData;
// //     const startIndex = (currentPage - 1) * rowsPerPage;
// //     const endIndex = startIndex + rowsPerPage;
// //     return sortedData.slice(startIndex, endIndex);
// //   };

// //   const studentDataArray = paginatedData();
// //   console.log('Student Data Array:', studentDataArray);

// //   const totals = tableFields.reduce((acc, field) => {
// //     if (field.id === 'academicYear' || field.id === 'date') {
// //       acc[field.id] = 'Total';
// //     } else {
// //       acc[field.id] = filteredData.reduce((sum, record) => sum + (Number(record[field.id]) || 0), 0).toFixed(2);
// //     }
// //     return acc;
// //   }, {});

// //   const handlePageClick = (page) => {
// //     setCurrentPage(page);
// //   };

// //   const handlePreviousPage = () => {
// //     if (currentPage > 1) {
// //       setCurrentPage(currentPage - 1);
// //     }
// //   };

// //   const handleNextPage = () => {
// //     if (currentPage < totalPages) {
// //       setCurrentPage(currentPage + 1);
// //     }
// //   };

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
// //                       placeholder="Search by date, admission no., or name"
// //                       value={searchTerm}
// //                       onChange={(e) => {
// //                         setSearchTerm(e.target.value);
// //                         setCurrentPage(1);
// //                       }}
// //                     />
// //                   </div>
// //                   <div className="col-md-2"></div>
// //                   <div className="col-md-5 px-0 d-flex align-items-center justify-content-end">
// //                     <Select
// //                       isClearable
// //                       name="rowsPerPage"
// //                       placeholder="Show"
// //                       options={pageShowOptions}
// //                       value={pageShowOptions.find((option) => option.value === rowsPerPage || (option.value === 'all' && rowsPerPage === totalRecords))}
// //                       onChange={(selected, action) => handleSelectChange(selected, action)}
// //                       className="email-select border border-dark me-lg-2"
// //                     />
// //                     <div
// //                       className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
// //                       style={{ cursor: 'pointer' }}
// //                       onClick={toggleFilter}
// //                     >
// //                       <FaFilter />
// //                     </div>
// //                     <div className="position-relative" ref={dropdownRef}>
// //                       <div
// //                         className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
// //                         style={{ cursor: 'pointer' }}
// //                         onClick={toggleExportDropdown}
// //                         title="Download"
// //                       >
// //                         <FaDownload />
// //                       </div>
// //                       {showExportDropdown && (
// //                         <div
// //                           className="position-absolute bg-white border mr-2 mt-2 border-dark rounded shadow"
// //                           style={{
// //                             top: '100%',
// //                             right: 0,
// //                             zIndex: 1000,
// //                             minWidth: '150px',
// //                           }}
// //                         >
// //                           <button
// //                             className="btn btn-light w-100 text-left py-2 px-3"
// //                             disabled={isExporting}
// //                             onClick={async () => {
// //                               if (filteredData.length === 0) {
// //                                 toast.error('No data to export');
// //                                 return;
// //                               }
// //                               setIsExporting(true);
// //                               try {
// //                                 console.log('Starting Excel export with filteredData:', filteredData);
// //                                 await exportToExcel(filteredData, tableFields, headerMapping, getFieldValue, school);
// //                                 toast.success('Exported to Excel successfully');
// //                               } catch (err) {
// //                                 console.error('Excel export failed:', err);
// //                                 toast.error('Export to Excel failed: ' + err.message);
// //                               } finally {
// //                                 setIsExporting(false);
// //                                 setShowExportDropdown(false);
// //                               }
// //                             }}
// //                           >
// //                             {isExporting ? 'Exporting...' : 'Export to Excel'}
// //                           </button>
// //                           <button
// //                             className="btn btn-light w-100 text-left py-2 px-3"
// //                             disabled={isExporting}
// //                             onClick={async () => {
// //                               if (filteredData.length === 0) {
// //                                 toast.error('No data to export');
// //                                 return;
// //                               }
// //                               setIsExporting(true);
// //                               try {
// //                                 console.log('Starting PDF export with filteredData:', filteredData);
// //                                 await exportToPDF(filteredData, tableFields, headerMapping, getFieldValue, school, logoSrc);
// //                                 toast.success('Exported to PDF successfully');
// //                               } catch (err) {
// //                                 console.error('PDF export failed:', err);
// //                                 toast.error('Export to PDF failed: ' + err.message);
// //                               } finally {
// //                                 setIsExporting(false);
// //                                 setShowExportDropdown(false);
// //                               }
// //                             }}
// //                           >
// //                             {isExporting ? 'Exporting...' : 'Export to PDF'}
// //                           </button>
// //                         </div>
// //                       )}
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
// //                                   onChange={(e) => {
// //                                     setStartDate(e.target.value);
// //                                     setCurrentPage(1);
// //                                   }}
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
// //                                   onChange={(e) => {
// //                                     setEndDate(e.target.value);
// //                                     setCurrentPage(1);
// //                                   }}
// //                                 />
// //                               </div>
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

// //                         {activeTab === 'Fee Type' && (
// //                           <div className="row d-flex justify-content-center">
// //                             <div className="col-md-8">
// //                               <CreatableSelect
// //                                 isMulti
// //                                 name="feeType"
// //                                 options={feeTypeOptions}
// //                                 value={selectedFeeTypes}
// //                                 onChange={(selected, action) => handleSelectChange(selected, action)}
// //                                 placeholder="Select Fee Types"
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
// //                                 isDisabled={selectedClasses.length === 0}
// //                               />
// //                             </div>
// //                           </div>
// //                         )}

// //                         {activeTab === 'Installment' && (
// //                           <div className="row d-flex justify-content-center">
// //                             <div className="col-md-8">
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
// //                   <h2 className="payroll-title text-center mb-0 flex-grow-1">Concession Report</h2>
// //                 </div>
// //               </div>

// //               {isLoading || loadingYears ? (
// //                 <div className="text-center mt-3">
// //                   <div className="spinner-border" role="status">
// //                     <span className="visually-hidden">Loading...</span>
// //                   </div>
// //                   <p>Loading...</p>
// //                 </div>
// //               ) : studentDataArray.length > 0 ? (
// //                 <>
// //                   <div className="table-responsive pb-4 mt-3">
// //                     <table className="table text-dark border border-secondary mb-4">
// //                       <thead>
// //                         <tr className="payroll-table-header">
// //                           {tableFields.map((field) => (
// //                             <th key={field.id} className="text-center align-middle border border-secondary text-nowrap p-2">
// //                               {field.label}
// //                             </th>
// //                           ))}
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {studentDataArray.map((record, index) => (
// //                           <tr key={`record_${index}`} className="payroll-table-row">
// //                             {tableFields.map((field) => (
// //                               <td
// //                                 key={field.id}
// //                                 className="text-center align-middle border border-secondary text-nowrap p-2"
// //                               >
// //                                 {getFieldValue(record, field)}
// //                               </td>
// //                             ))}
// //                           </tr>
// //                         ))}
// //                         <tr className="payroll-table-footer">
// //                           {tableFields.map((field) => (
// //                             <td
// //                               key={field.id}
// //                               className="text-center align-middle border border-secondary text-nowrap p-2"
// //                             >
// //                               <strong>{totals[field.id]}</strong>
// //                             </td>
// //                           ))}
// //                         </tr>
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                   {totalRecords > 0 && rowsPerPage !== 'all' && (
// //                     <div className="card-footer border-top">
// //                       <nav aria-label="Page navigation example">
// //                         <ul className="pagination justify-content-end mb-0">
// //                           <li className="page-item">
// //                             <button
// //                               className="page-link"
// //                               onClick={handlePreviousPage}
// //                               disabled={currentPage === 1}
// //                             >
// //                               Previous
// //                             </button>
// //                           </li>
// //                           {pagesToShow.map((page) => (
// //                             <li
// //                               key={page}
// //                               className={`page-item ${currentPage === page ? 'active' : ''}`}
// //                             >
// //                               <button
// //                                 className={`page-link pagination-button ${currentPage === page ? 'active' : ''}`}
// //                                 onClick={() => handlePageClick(page)}
// //                               >
// //                                 {page}
// //                               </button>
// //                             </li>
// //                           ))}
// //                           <li className="page-item">
// //                             <button
// //                               className="page-link"
// //                               onClick={handleNextPage}
// //                               disabled={currentPage === totalPages}
// //                             >
// //                               Next
// //                             </button>
// //                           </li>
// //                         </ul>
// //                       </nav>
// //                     </div>
// //                   )}
// //                 </>
// //               ) : (
// //                 <div className="text-center mt-3">
// //                   <p>
// //                     No concessions match the selected filters for{' '}
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

// // export default ConcessionReport;
// import React, { useState, useEffect, useRef } from 'react';
// import { FaFilter, FaDownload } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import CreatableSelect from 'react-select/creatable';
// import Select from 'react-select';
// import { Link } from 'react-router-dom';
// import getAPI from '../../../../../../api/getAPI';
// import { fetchSchoolData } from '../../../PdfUtlisReport';
// import { exportToExcel, exportToPDF } from './ExportConcessionReport';

// const ConcessionReport = () => {
//   const [showFilterPanel, setShowFilterPanel] = useState(false);
//   const [showExportDropdown, setShowExportDropdown] = useState(false);
//   const [activeTab, setActiveTab] = useState('Date');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [schoolId, setSchoolId] = useState('');
//   const [school, setSchool] = useState(null);
//   const [logoSrc, setLogoSrc] = useState('');
//   const [feeData, setFeeData] = useState([]);
//   const [feeTypes, setFeeTypes] = useState([]);
//   const [feeTypeOptions, setFeeTypeOptions] = useState([]);
//   const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isExporting, setIsExporting] = useState(false);
//   const [loadingYears, setLoadingYears] = useState(false);
//   const [academicYearOptions, setAcademicYearOptions] = useState([]);
//   const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
//   const [selectedYears, setSelectedYears] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [classOptions, setClassOptions] = useState([]);
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [sectionOptions, setSectionOptions] = useState([]);
//   const [selectedSections, setSelectedSections] = useState([]);
//   const [classSectionMap, setClassSectionMap] = useState({});
//   const [installmentOptions, setInstallmentOptions] = useState([]);
//   const [selectedInstallments, setSelectedInstallments] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState('all');
//   const dropdownRef = useRef(null);

//   const tabs = ['Date', 'Academic Year', 'Class & Section', 'Fee Type', 'Installment'];
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
//     return `${startYear}-${endYear?.slice(-2) || ''}`;
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr || dateStr === '-') return '-';
//     const [day, month, year] = dateStr.split('/');
//     return `${day}-${month}-${year}`;
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
//     const loadSchoolData = async () => {
//       try {
//         const { school, logoSrc } = await fetchSchoolData(schoolId);
//         setSchool(school);
//         setLogoSrc(logoSrc);
//       } catch (error) {
//         console.error('Failed to fetch school data:', error);
//         toast.error('Failed to fetch school data.');
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
//         toast.error('Error fetching academic years: ' + err.message);
//         console.error('Error fetching academic years:', err);
//       } finally {
//         setLoadingYears(false);
//       }
//     };
//     if (schoolId) {
//       fetchAcademicYears();
//     }
//   }, [schoolId]);

//   useEffect(() => {
//     if (Object.keys(classSectionMap).length === 0) {
//       const sections = new Set(feeData.map(row => row.sectionName).filter(sec => sec && sec !== '-'));
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

//   const fetchFeeData = async (years) => {
//     setIsLoading(true);
//     try {
//       const promises = years.map((year) =>
//         getAPI(`/get-all-Ddatewise-concession-report?schoolId=${schoolId}&academicYear=${year}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`)
//       );
//       const responses = await Promise.all(promises);
//       const unifiedData = responses.flatMap((res, index) => {
//         if (!res?.data?.data) {
//           console.warn(`No data found for year ${years[index]}`);
//           return [];
//         }
//         return res.data.data;
//       });

//       const allFeeTypes = responses
//         .flatMap((res) => res?.data?.feeTypes || [])
//         .filter((type, index, self) => self.indexOf(type) === index)
//         .sort();

//       const classes = unifiedData
//         .map((row) => row.className)
//         .filter((name, index, self) => name && name !== '-' && self.indexOf(name) === index)
//         .sort()
//         .map((name) => ({ value: name, label: name }));

//       const sections = unifiedData
//         .map((row) => row.sectionName)
//         .filter((name, index, self) => name && name !== '-' && self.indexOf(name) === index)
//         .sort()
//         .map((name) => ({ value: name, label: name }));

//       const installments = unifiedData
//         .map((row) => row.installmentName)
//         .filter((name, index, self) => name && name !== '-' && self.indexOf(name) === index)
//         .sort()
//         .map((name) => ({ value: name, label: name }));

//       const classSectionMapping = {};
//       unifiedData.forEach(row => {
//         const className = row.className;
//         const sectionName = row.sectionName;
//         if (className && className !== '-' && sectionName && sectionName !== '-') {
//           if (!classSectionMapping[className]) {
//             classSectionMapping[className] = new Set();
//           }
//           classSectionMapping[className].add(sectionName);
//         }
//       });
//       setClassSectionMap(classSectionMapping);

//       setFeeTypes(allFeeTypes);
//       setFeeTypeOptions(
//         allFeeTypes.map((type) => ({
//           value: type,
//           label: type,
//         }))
//       );
//       setClassOptions(classes);
//       setSectionOptions(sections);
//       setInstallmentOptions(installments);
//       setFeeData(unifiedData);

//       if (rowsPerPage === 'all' && unifiedData.length > 0) {
//         setRowsPerPage(unifiedData.length);
//       }
//     } catch (error) {
//       toast.error('Error fetching concession data: ' + error.message);
//       console.error('Error fetching concession data:', error);
//       setFeeData([]);
//       setFeeTypes([]);
//       setFeeTypeOptions([]);
//       setClassOptions([]);
//       setSectionOptions([]);
//       setInstallmentOptions([]);
//       setClassSectionMap({});
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
//   }, [schoolId, selectedAcademicYear, selectedYears, startDate, endDate]);

//   const handleSelectChange = (selectedOptions, { name }) => {
//     const selected = selectedOptions || [];
//     if (name === 'academicYear') {
//       setSelectedYears(selected);
//       setCurrentPage(1);
//     } else if (name === 'feeType') {
//       setSelectedFeeTypes(selected);
//       setCurrentPage(1);
//     } else if (name === 'class') {
//       setSelectedClasses(selected);
//       setCurrentPage(1);
//     } else if (name === 'section') {
//       setSelectedSections(selected);
//       setCurrentPage(1);
//     } else if (name === 'installment') {
//       setSelectedInstallments(selected);
//       setCurrentPage(1);
//     } else if (name === 'rowsPerPage') {
//       if (selectedOptions?.value === 'all') {
//         setRowsPerPage(filteredData.length || 'all');
//       } else {
//         setRowsPerPage(selectedOptions ? selectedOptions.value : 10);
//       }
//       setCurrentPage(1);
//     }
//   };

//   const applyFilters = () => {
//     setShowFilterPanel(false);
//     setCurrentPage(1);
//     const yearsToFetch = selectedYears.length > 0
//       ? selectedYears.map((year) => year.value)
//       : [selectedAcademicYear];
//     fetchFeeData(yearsToFetch);
//   };

//   const resetFilters = () => {
//     setSelectedYears([]);
//     setSelectedFeeTypes([]);
//     setStartDate('');
//     setEndDate('');
//     setSelectedClasses([]);
//     setSelectedSections([]);
//     setSelectedInstallments([]);
//     setSearchTerm('');
//     setCurrentPage(1);
//     setRowsPerPage('all');
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

//   const nonZeroFeeTypes = feeTypes.filter((type) =>
//     feeData.some((row) => {
//       const key = type.replace(/\s+/g, '');
//       return row[key] && row[key] !== 0;
//     })
//   );

//   const filteredData = feeData.filter((row) => {
//     const matchesSearchTerm = searchTerm
//       ? (row.date || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//         (row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//         (row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase())
//       : true;

//     const matchesYear =
//       selectedYears.length === 0 ||
//       selectedYears.some((year) => row.academicYear === year.value);

//     const matchesDate =
//       (!startDate && !endDate) ||
//       (() => {
//         if (!row.date || row.date === '-') return false;
//         const recordDate = new Date(row.date.split('/').reverse().join('-'));
//         const start = startDate ? new Date(startDate) : null;
//         const end = endDate ? new Date(endDate) : null;
//         return (!start || recordDate >= start) && (!end || recordDate <= end);
//       })();

//     const matchesFeeType =
//       selectedFeeTypes.length === 0 ||
//       selectedFeeTypes.some((feeType) => {
//         const key = feeType.value.replace(/\s+/g, '');
//         return row[key] && row[key] !== 0;
//       });

//     const matchesClass =
//       selectedClasses.length === 0 ||
//       selectedClasses.some((cls) => row.className === cls.value);

//     const matchesSection =
//       selectedSections.length === 0 ||
//       selectedSections.some((sec) => row.sectionName === sec.value);

//     const matchesInstallment =
//       selectedInstallments.length === 0 ||
//       selectedInstallments.some((inst) => row.installmentName === inst.value);

//     return matchesSearchTerm && matchesYear && matchesDate && matchesFeeType && matchesClass && matchesSection && matchesInstallment;
//   });

//   const displayedFeeTypes = selectedFeeTypes.length > 0
//     ? selectedFeeTypes.map((ft) => ft.value).filter((type) => nonZeroFeeTypes.includes(type))
//     : nonZeroFeeTypes;

//   const headerMapping = displayedFeeTypes.reduce((acc, type) => {
//     const key = type.replace(/\s+/g, '');
//     acc[key] = type.endsWith('Fee') ? `${type}s` : type;
//     return acc;
//   }, { academicYear: 'Academic Year', date: 'Date', Total: 'Total' });

//   const tableFields = [
//     { id: 'academicYear', label: 'Academic Year', colSpan: 2 },
//     { id: 'date', label: 'Date', colSpan: 2 },
//     ...displayedFeeTypes.map((type) => ({
//       id: type.replace(/\s+/g, ''),
//       label: headerMapping[type.replace(/\s+/g, '')] || type,
//       colSpan: 1,
//     })),
//     { id: 'Total', label: 'Total', colSpan: 1 },
//   ];

//   const getFieldValue = (record, field) => {
//     const fieldId = field.id;
//     if (fieldId === 'academicYear') {
//       return formatAcademicYear(record[fieldId]) || '-';
//     }
//     if (fieldId === 'date') {
//       return formatDate(record[fieldId]) || '-';
//     }
//     if (fieldId === 'Total' || displayedFeeTypes.includes(fieldId.replace(/\s+/g, ''))) {
//       return record[fieldId] !== undefined && record[fieldId] !== 0 ? Number(record[fieldId]).toFixed(2) : '-';
//     }
//     return record[fieldId] !== undefined && record[fieldId] !== 0 ? Number(record[fieldId]).toFixed(2) : '-';
//   };

//   const mergedData = () => {
//     const groupedByDate = filteredData.reduce((acc, row) => {
//       const key = row.date || '-';
//       if (!acc[key]) {
//         acc[key] = {
//           date: row.date,
//           academicYear: row.academicYear,
//           Total: 0,
//         };
//         displayedFeeTypes.forEach((type) => {
//           const feeKey = type.replace(/\s+/g, '');
//           acc[key][feeKey] = 0;
//         });
//       }
//       displayedFeeTypes.forEach((type) => {
//         const feeKey = type.replace(/\s+/g, '');
//         acc[key][feeKey] += Number(row[feeKey]) || 0;
//       });
//       acc[key].Total += Number(row.Total) || 0;
//       return acc;
//     }, {});

//     return Object.values(groupedByDate).sort((a, b) => {
//       if (a.date === '-' || b.date === '-') return 0;
//       return (
//         new Date(a.date.split('/').reverse().join('-')).getTime() -
//         new Date(b.date.split('/').reverse().join('-')).getTime()
//       );
//     });
//   };

//   const totals = tableFields.reduce((acc, field) => {
//     if (field.id !== 'academicYear' && field.id !== 'date') {
//       acc[field.id] = mergedData().reduce((sum, record) => sum + (Number(record[field.id]) || 0), 0).toFixed(2);
//     }
//     return acc;
//   }, {});

//   const totalRecords = mergedData().length;
//   const totalPages = rowsPerPage === 'all' ? 1 : Math.ceil(totalRecords / rowsPerPage);

//   const maxPagesToShow = 5;
//   const pagesToShow = [];
//   const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//   const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//   for (let i = startPage; i <= endPage; i++) {
//     pagesToShow.push(i);
//   }

//   const paginatedData = () => {
//     const sortedData = mergedData();
//     if (rowsPerPage === 'all') return sortedData;
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     const endIndex = startIndex + rowsPerPage;
//     return sortedData.slice(startIndex, endIndex);
//   };

//   const studentDataArray = paginatedData();

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

//   const handleExport = async (format) => {
//     if (mergedData().length === 0) {
//       toast.error('No data to export');
//       return;
//     }
//     setIsExporting(true);
//     try {
//       if (format === 'excel') {
//         await exportToExcel(mergedData(), tableFields, headerMapping, getFieldValue, school);
//         toast.success('Exported to Excel successfully');
//       } else if (format === 'pdf') {
//         await exportToPDF(mergedData(), tableFields, headerMapping, getFieldValue, school, logoSrc);
//         toast.success('Exported to PDF successfully');
//       }
//     } catch (err) {
//       console.error(`${format.toUpperCase()} export failed:`, err);
//       toast.error(`Export to ${format.toUpperCase()} failed: ${err.message}`);
//     } finally {
//       setIsExporting(false);
//       setShowExportDropdown(false);
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
//                       placeholder="Search by date, admission no., or name"
//                       value={searchTerm}
//                       onChange={(e) => {
//                         setSearchTerm(e.target.value);
//                         setCurrentPage(1);
//                       }}
//                     />
//                   </div>
//                   <div className="col-md-2"></div>
//                   <div className="col-md-5 px-0 d-flex align-items-center justify-content-end">
//                     <Select
//                       isClearable
//                       name="rowsPerPage"
//                       placeholder="Show"
//                       options={pageShowOptions}
//                       value={pageShowOptions.find((option) => option.value === rowsPerPage || (option.value === 'all' && rowsPerPage === totalRecords))}
//                       onChange={(selected, action) => handleSelectChange(selected, action)}
//                       className="email-select border border-dark me-lg-2"
//                     />
//                     <div
//                       className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
//                       style={{ cursor: 'pointer' }}
//                       onClick={toggleFilter}
//                     >
//                       <FaFilter />
//                     </div>
//                     <div className="position-relative" ref={dropdownRef}>
//                       <div
//                         className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
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
//                             onClick={() => handleExport('excel')}
//                           >
//                             {isExporting ? 'Exporting...' : 'Export to Excel'}
//                           </button>
//                           <button
//                             className="btn btn-light w-100 text-left py-2 px-3"
//                             disabled={isExporting}
//                             onClick={() => handleExport('pdf')}
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
//                                   onChange={(e) => {
//                                     setStartDate(e.target.value);
//                                     setCurrentPage(1);
//                                   }}
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
//                                   onChange={(e) => {
//                                     setEndDate(e.target.value);
//                                     setCurrentPage(1);
//                                   }}
//                                 />
//                               </div>
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

//                         {activeTab === 'Fee Type' && (
//                           <div className="row d-flex justify-content-center">
//                             <div className="col-md-8">
//                               <CreatableSelect
//                                 isMulti
//                                 name="feeType"
//                                 options={feeTypeOptions}
//                                 value={selectedFeeTypes}
//                                 onChange={(selected, action) => handleSelectChange(selected, action)}
//                                 placeholder="Select Fee Types"
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

//                         {activeTab === 'Installment' && (
//                           <div className="row d-flex justify-content-center">
//                             <div className="col-md-8">
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
//                   <h2 className="payroll-title text-center mb-0 flex-grow-1">Concession Report</h2>
//                 </div>
//               </div>

//               {isLoading || loadingYears ? (
//                 <div className="text-center mt-3">
//                   <div className="spinner-border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <p>Loading...</p>
//                 </div>
//               ) : studentDataArray.length > 0 ? (
//                 <>
//                   <div className="table-responsive pb-4 mt-3">
//                     <table className="table text-dark border border-secondary mb-4">
//                       <thead>
//                         <tr className="payroll-table-header">
//                           {tableFields.map((field) => (
//                             <th
//                               key={field.id}
//                               className="text-center align-middle border border-secondary text-nowrap p-2"
//                               colSpan={field.colSpan}
//                             >
//                               {field.label}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {studentDataArray.map((record, index) => (
//                           <tr key={`record_${index}`} className="payroll-table-row">
//                             {tableFields.map((field) => (
//                               <td
//                                 key={field.id}
//                                 className="text-center align-middle border border-secondary text-nowrap p-2"
//                                 colSpan={field.colSpan}
//                               >
//                                 {getFieldValue(record, field)}
//                               </td>
//                             ))}
//                           </tr>
//                         ))}
//                       </tbody>
//                       <tfoot>
//                         <tr className="payroll-table-footer">
//                           <td
//                             colSpan={4} 
//                             className="text-right border border-secondary p-2"
//                           >
//                             <strong>Total</strong>
//                           </td>
//                           {tableFields.slice(2).map((field) => (
//                             <td
//                               key={field.id}
//                               className="text-center border border-secondary p-2"
//                               colSpan={field.colSpan}
//                             >
//                               <strong>{totals[field.id] || '0.00'}</strong>
//                             </td>
//                           ))}
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
//                   <p>
//                     No concessions match the selected filters for{' '}
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

// export default ConcessionReport;




import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import getAPI from '../../../../../../api/getAPI';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from './ExportConcessionReport';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const DateWiseConcession = () => {
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
  const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState('all');
  const [viewMode, setViewMode] = useState('net');
  const dropdownRef = useRef(null);

  const tabs = ['Date', 'Academic Year', 'Type of Fees', 'Installment', 'Payment Mode'];

  const pageShowOptions = [
    { value: 'all', label: 'All' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
  ];

  const viewModeOptions = [
    { value: 'net', label: 'Net' },
    { value: 'gross', label: 'Gross' },
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
    const loadSchoolData = async () => {
      try {
        const { school, logoSrc } = await fetchSchoolData(schoolId);
        setSchool(school);
        setLogoSrc(logoSrc);
      } catch (error) {
        console.error('Failed to fetch school data:', error);
        toast.error('Failed to fetch school data.');
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
        getAPI(`/get-all-Ddatewise-concession-report?schoolId=${schoolId}&academicYear=${year}`)
      );
      const responses = await Promise.all(promises);
      const unifiedData = responses.flatMap((res, index) => {
        if (!res?.data?.data) {
          console.warn(`No data found for year ${years[index]}`);
          return [];
        }
        const records = res.data.data.map((record) => {
          const totalPaidFee = Object.values(record.feeTypes || {}).reduce(
            (sum, amount) => sum + (Number(amount) || 0),
            0
          );
          return {
            ...record,
            academicYear: record.academicYear,
            feesBreakdown: record.feeTypes || {},
            totalPaidFee,
          };
        });

        const cancellationRecords = records
          .filter((record) => record.cancelledDate)
          .map((record) => {
            const negativeFeesBreakdown = {};
            Object.keys(record.feesBreakdown).forEach((key) => {
              negativeFeesBreakdown[key] = -(Number(record.feesBreakdown[key]) || 0);
            });
            return {
              ...record,
              paymentDate: record.cancelledDate,
              feesBreakdown: negativeFeesBreakdown,
              totalPaidFee: -Math.abs(record.totalPaidFee || 0),
              status: 'Cancelled',
            };
          });

        const nonCancelledRecords = records.map((record) => ({
          ...record,
          cancelledDate: null,
        }));

        return [...nonCancelledRecords, ...cancellationRecords];
      });

      unifiedData.sort((a, b) => {
        const dateA = new Date(a.paymentDate.split('-').reverse().join('-'));
        const dateB = new Date(b.paymentDate.split('-').reverse().join('-'));
        if (dateA !== dateB) return dateA - dateB;
        if (a.academicYear !== b.academicYear) return a.academicYear.localeCompare(b.academicYear);
        if (a.paymentMode !== b.paymentMode) return a.paymentMode.localeCompare(b.paymentMode);
        const isACancellation = a.cancelledDate || Object.values(a.feesBreakdown).some(amount => Number(amount) < 0);
        const isBCancellation = b.cancelledDate || Object.values(b.feesBreakdown).some(amount => Number(amount) < 0);
        if (isACancellation !== isBCancellation) return isACancellation ? 1 : -1;
        return 0;
      });

      setFeeData(unifiedData);
      const allFeeTypes = responses
        .flatMap((res) => res?.data?.feeTypes || [])
        .filter((type) => type && typeof type === 'string')
        .filter((type, index, self) => self.indexOf(type) === index)
        .sort();

      setFeeTypes(allFeeTypes);
      if (rowsPerPage === 'all' && unifiedData.length > 0) {
        setRowsPerPage(unifiedData.length);
      }

      const filterOptions = responses[0]?.data?.filterOptions || {};
      setClassOptions(filterOptions.classOptions || []);
      setSectionOptions(filterOptions.sectionOptions || []);
      setInstallmentOptions(filterOptions.installmentOptions || []);
      setPaymentModeOptions(filterOptions.paymentModeOptions || []);
      setAcademicYearOptions(
        filterOptions.academicYearOptions?.length > 0
          ? filterOptions.academicYearOptions.filter((opt) => opt && opt.value && opt.label)
          : years.map((year) => ({ value: year, label: formatAcademicYear(year) }))
      );

      if (!selectedAcademicYear && filterOptions.academicYearOptions?.length > 0) {
        const latestYear = filterOptions.academicYearOptions[filterOptions.academicYearOptions.length - 1].value;
        setSelectedAcademicYear(latestYear);
        setSelectedYears([{ value: latestYear, label: formatAcademicYear(latestYear) }]);
      }
    } catch (error) {
      toast.error('Error fetching data: ' + error.message);
      setFeeData([]);
      setFeeTypes([]);
      setClassOptions([]);
      setSectionOptions([]);
      setInstallmentOptions([]);
      setPaymentModeOptions([]);
      setAcademicYearOptions([]);
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
    } else if (name === 'feeType') {
      setSelectedFeeTypes(selected);
      setCurrentPage(1);
    } else if (name === 'installment') {
      setSelectedInstallments(selected);
      setCurrentPage(1);
    } else if (name === 'rowsPerPage') {
      if (selectedOptions?.value === 'all') {
        setRowsPerPage(feeData.length || 'all');
      } else {
        setRowsPerPage(selectedOptions ? selectedOptions.value : 'all');
      }
      setCurrentPage(1);
    } else if (name === 'viewMode') {
      setViewMode(selectedOptions ? selectedOptions.value : 'net');
      setCurrentPage(1);
    }
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
    const yearsToFetch = selectedYears.length > 0
      ? selectedYears.map((year) => year.value)
      : [selectedAcademicYear];
    fetchFeeData(yearsToFetch);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedYears([]);
    setSelectedPaymentModes([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setSelectedFeeTypes([]);
    setSelectedInstallments([]);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setCurrentPage(1);
    setViewMode('net');
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
      ? row.paymentDate.toLowerCase().includes(String(searchTerm).toLowerCase()) ||
      row.paymentMode?.toLowerCase().includes(String(searchTerm).toLowerCase()) ||
      row.academicYear?.toLowerCase().includes(String(searchTerm).toLowerCase())
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
        const [day, month, year] = row.paymentDate.split('-');
        const recordDate = new Date(`${year}-${month}-${day}`);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || recordDate >= start) && (!end || recordDate <= end);
      })();

    const matchesFeeType =
      selectedFeeTypes.length === 0 ||
      selectedFeeTypes.some((type) => (row.feesBreakdown[type.value] || 0));

    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => row.className === cls.value || row.className === null);

    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((sec) => row.sectionName === sec.value || row.sectionName === null);

    const matchesInstallment =
      selectedInstallments.length === 0 ||
      selectedInstallments.some((inst) => row.installmentName === inst.value);

    const matchesViewMode =
      viewMode === 'net' ||
      (viewMode === 'gross' && !row.cancelledDate && !Object.values(row.feesBreakdown).some(amount => Number(amount) < 0));

    // Check if the row has non-zero values for any fee type or totalPaidFee
    const hasNonZeroValues =
      Object.values(row.feesBreakdown).some(amount => Number(amount) !== 0) ||
      Number(row.totalPaidFee) !== 0;

    return (
      matchesSearchTerm &&
      matchesPaymentMode &&
      matchesYear &&
      matchesDate &&
      matchesFeeType &&
      matchesClass &&
      matchesSection &&
      matchesInstallment &&
      matchesViewMode &&
      hasNonZeroValues // Only include rows with non-zero values
    );
  });

  const groupedData = filteredData.reduce((acc, record, index) => {
    const isCancellation = record.cancelledDate || Object.values(record.feesBreakdown).some(amount => Number(amount) < 0);
    const groupKey = viewMode === 'net' 
      ? `${record.paymentDate}_${record.academicYear}_${record.paymentMode}` 
      : `${record.paymentDate}_${record.academicYear}_${record.paymentMode}_${isCancellation ? 'cancel' : 'regular'}`; 
    
    if (!acc[groupKey]) {
      acc[groupKey] = {
        aggregated: {
          paymentDate: record.paymentDate,
          academicYear: record.academicYear,
          paymentMode: record.paymentMode,
          feesBreakdown: {},
          totalPaidFee: 0,
          status: viewMode === 'net' ? 'Net' : (isCancellation ? 'Cancelled' : 'Regular'),
          hasCancellation: false,
        },
        count: 0,
      };
    }

    if (isCancellation) {
      acc[groupKey].aggregated.hasCancellation = true;
    }

    Object.keys(record.feesBreakdown).forEach((type) => {
      acc[groupKey].aggregated.feesBreakdown[type] =
        (acc[groupKey].aggregated.feesBreakdown[type] || 0) + (Number(record.feesBreakdown[type]) || 0);
    });

    acc[groupKey].aggregated.totalPaidFee += Number(record.totalPaidFee) || 0;
    acc[groupKey].count += 1;
    
    return acc;
  }, {});

  // Calculate date-wise totals
  const dateWiseTotals = filteredData.reduce((acc, record) => {
    const dateKey = record.paymentDate;
    if (!acc[dateKey]) {
      acc[dateKey] = {
        paymentDate: record.paymentDate,
        feesBreakdown: {},
        totalPaidFee: 0,
      };
    }
    Object.keys(record.feesBreakdown).forEach((type) => {
      acc[dateKey].feesBreakdown[type] =
        (acc[dateKey].feesBreakdown[type] || 0) + (Number(record.feesBreakdown[type]) || 0);
    });
    acc[dateKey].totalPaidFee += Number(record.totalPaidFee) || 0;
    return acc;
  }, {});

  // Filter out date-wise totals with all zero values
  const filteredDateWiseTotals = Object.fromEntries(
    Object.entries(dateWiseTotals).filter(([_, total]) => {
      return (
        Object.values(total.feesBreakdown).some(amount => Number(amount) !== 0) ||
        Number(total.totalPaidFee) !== 0
      );
    })
  );

  const groupedDataArray = [
    ...Object.entries(groupedData).map(([key, { aggregated, count }], idx) => ({
      record: aggregated,
      index: idx,
      isFirstInGroup: true,
      rowspan: 1,
      isTotalRow: false,
    })),
    ...Object.entries(filteredDateWiseTotals).map(([date, total], idx) => ({
      record: {
        ...total,
        paymentDate: `${total.paymentDate}-Total`,
        academicYear: '',
        paymentMode: '',
      },
      index: idx + Object.keys(groupedData).length,
      isFirstInGroup: true,
      rowspan: 1,
      isTotalRow: true,
    })),
  ].sort((a, b) => {
    const dateA = a.record.paymentDate.includes('-Total')
      ? a.record.paymentDate.replace('-Total', '')
      : a.record.paymentDate;
    const dateB = b.record.paymentDate.includes('-Total')
      ? b.record.paymentDate.replace('-Total', '')
      : b.record.paymentDate;
    const dateComparison = new Date(dateA.split('-').reverse().join('-')) - new Date(dateB.split('-').reverse().join('-'));
    if (dateComparison !== 0) return dateComparison;
    if (a.isTotalRow !== b.isTotalRow) return a.isTotalRow ? 1 : -1;
    return a.index - b.index;
  });

  const totals = filteredData.reduce(
    (acc, row) => {
      acc.totalPaidFee = (acc.totalPaidFee || 0) + (row.totalPaidFee || 0);
      const displayTypes = selectedFeeTypes.length > 0
        ? selectedFeeTypes.map((type) => type.value)
        : feeTypes;
      displayTypes.forEach((type) => {
        acc[type] = (acc[type] || 0) + (row.feesBreakdown[type] || 0);
      });
      return acc;
    },
    { totalPaidFee: 0 }
  );

  const displayedFeeTypes = selectedFeeTypes.length > 0
    ? selectedFeeTypes.map((type) => type.value)
    : feeTypes;

  const headerMapping = {
    paymentDate: 'Date',
    academicYear: 'Academic Year',
    paymentMode: 'Payment Mode',
    ...Object.fromEntries(displayedFeeTypes.map((type) => [type, type])),
    totalPaidFee: 'Total',
  };

  const tableFields = Object.keys(headerMapping).map((key) => ({
    id: key,
    label: headerMapping[key],
  }));

  const getFieldValue = (record, field) => {
    const fieldId = field.id;
    if (fieldId === 'paymentDate') {
      return record[fieldId] || '-';
    } else if (fieldId === 'academicYear') {
      return formatAcademicYear(record[fieldId]) || '-';
    } else if (fieldId === 'paymentMode') {
      return record[fieldId] || '-';
    } else if (fieldId === 'totalPaidFee') {
      return (record[fieldId] || 0).toFixed(2);
    } else {
      return (record.feesBreakdown[fieldId] || 0).toFixed(2);
    }
  };

  const totalRecords = groupedDataArray.length;
  const totalPages = Math.ceil(totalRecords / (rowsPerPage === 'all' ? totalRecords : rowsPerPage));

  const maxPagesToShow = 5;
  const pagesToShow = [];
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  const paginatedData = () => {
    const startIndex = (currentPage - 1) * (rowsPerPage === 'all' ? totalRecords : rowsPerPage);
    const endIndex = startIndex + (rowsPerPage === 'all' ? totalRecords : rowsPerPage);
    return groupedDataArray.slice(startIndex, endIndex);
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
                  <div className="col-md-5 px-0 d-flex align-items-center justify-content-end">
                    <Select
                      isClearable
                      name="rowsPerPage"
                      placeholder="Show"
                      options={pageShowOptions}
                      value={pageShowOptions.find((option) => option.value === rowsPerPage || (option.value === 'all' && rowsPerPage === feeData.length))}
                      onChange={(selected, action) => handleSelectChange(selected, action)}
                      className="email-select border border-dark me-lg-2"
                    />
                    {/* <Select
                      name="viewMode"
                      placeholder="View Mode"
                      options={viewModeOptions}
                      value={viewModeOptions.find((option) => option.value === viewMode)}
                      onChange={(selected, action) => handleSelectChange(selected, action)}
                      className="email-select border border-dark me-lg-2"
                    /> */}
                    <div
                      className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
                      style={{ cursor: 'pointer' }}
                      onClick={toggleFilter}
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
                          className="position-absolute bg-white border mx-2 mr-2 mt-2 border-dark rounded shadow"
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
                                    : selectedAcademicYear,
                                  viewMode
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
                                  logoSrc,
                                  viewMode
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
                                options={paymentModeOptions}
                                value={selectedPaymentModes}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Payment Modes"
                                className="mt-2"
                              />
                            </div>
                          </div>
                        )}
                        {activeTab === 'Academic Year' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="academicYear"
                                options={academicYearOptions}
                                value={selectedYears}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Academic Years"
                                className="mt-2"
                              />
                            </div>
                          </div>
                        )}
                        {activeTab === 'Installment' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
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
                        {activeTab === 'Type of Fees' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="feeType"
                                options={feeTypes.map((type) => ({ value: type, label: type }))}
                                value={selectedFeeTypes}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Fee Types"
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
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Datewise Concession</h2>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Loading data...</p>
                </div>
              ) : displayedFeeTypes.length > 0 ? (
                <>
                  <div className="table-responsive pb-4 mt-3">
                    <table className="table text-dark border border-secondary mb-1">
                      <thead>
                        <tr className="payroll-table-header">
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Date</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Academic Year</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Payment Mode</th>
                          {displayedFeeTypes.map((type) => (
                            <th key={type} className="text-center align-middle border border-secondary text-nowrap p-2">
                              {type}
                            </th>
                          ))}
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData().length > 0 ? (
                          paginatedData().map(({ record, index, isFirstInGroup, rowspan, isTotalRow }, idx) => (
                            <tr
                              key={`${record.paymentDate}_${record.academicYear}_${record.paymentMode}_${index}_${idx}`}
                              className={`payroll-table-row ${isTotalRow ? 'fw-bold' : ''}`}
                            >
                              {isTotalRow ? (
                                <>
                                  <td
                                    className="text-right align-middle border border-secondary text-nowrap p-2 fw-bold"
                                    colSpan={3}
                                  >
                                    {record.paymentDate}
                                  </td>
                                  {displayedFeeTypes.map((type) => (
                                    <td
                                      key={type}
                                      className="text-center align-middle border border-secondary text-nowrap p-2 fw-bold"
                                    >
                                      {(record.feesBreakdown[type] || 0).toFixed(2)}
                                    </td>
                                  ))}
                                  <td className="text-center align-middle border border-secondary text-nowrap p-2 fw-bold">
                                    {(record.totalPaidFee || 0).toFixed(2)}
                                  </td>
                                </>
                              ) : isFirstInGroup ? (
                                <>
                                  <td
                                    className="text-center align-middle border border-secondary text-nowrap p-2"
                                    rowSpan={rowspan}
                                  >
                                    {record.paymentDate || '-'}
                                  </td>
                                  <td
                                    className="text-center align-middle border border-secondary text-nowrap p-2"
                                    rowSpan={rowspan}
                                  >
                                    {formatAcademicYear(record.academicYear) || '-'}
                                  </td>
                                  <td
                                    className="text-center align-middle border border-secondary text-nowrap p-2"
                                    rowSpan={rowspan}
                                  >
                                    {record.paymentMode || '-'}
                                  </td>
                                  {displayedFeeTypes.map((type) => (
                                    <td
                                      key={type}
                                      className="text-center align-middle border border-secondary text-nowrap p-2"
                                    >
                                      {(record.feesBreakdown[type] || 0).toFixed(2)}
                                    </td>
                                  ))}
                                  <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                    {(record.totalPaidFee || 0).toFixed(2)}
                                  </td>
                                </>
                              ) : (
                                <>
                                  {displayedFeeTypes.map((type) => (
                                    <td
                                      key={type}
                                      className="text-center align-middle border border-secondary text-nowrap p-2"
                                    >
                                      {(record.feesBreakdown[type] || 0).toFixed(2)}
                                    </td>
                                  ))}
                                  <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                    {(record.totalPaidFee || 0).toFixed(2)}
                                  </td>
                                </>
                              )}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={displayedFeeTypes.length + 3} className="text-center">
                              No data matches the selected filters for{' '}
                              {selectedYears.map((y) => formatAcademicYear(y.value)).join(', ') ||
                                formatAcademicYear(selectedAcademicYear)}.
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="payroll-table-footer">
                          <td colSpan={3} className="text-right border border-secondary p-2">
                            <strong>Grand Total</strong>
                          </td>
                          {displayedFeeTypes.map((type) => (
                            <td key={type} className="text-center border border-secondary p-2">
                              <strong>{(totals[type] || 0).toFixed(2)}</strong>
                            </td>
                          ))}
                          <td className="text-center border border-secondary p-2">
                            <strong>{(totals.totalPaidFee || 0).toFixed(2)}</strong>
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
                  <p>No fee types available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateWiseConcession;