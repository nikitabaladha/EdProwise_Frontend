// import React, { useState, useEffect, useRef } from 'react';
// import { FaFilter, FaDownload } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import CreatableSelect from 'react-select/creatable';
// import Select from 'react-select';
// import { Link } from 'react-router-dom';
// import getAPI from '../../../../../../api/getAPI';
// import { exportToExcel, exportToPDF } from './OpeningAndClosingArrearReportExport';
// import { fetchSchoolData } from '../../../PdfUtlisReport';

// const OpeningAndClosingArrearFeesReport = () => {
//   const [showFilterPanel, setShowFilterPanel] = useState(false);
//   const [showExportDropdown, setShowExportDropdown] = useState(false);
//   const [activeTab, setActiveTab] = useState('Payment Mode');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [schoolId, setSchoolId] = useState('');
//   const [school, setSchool] = useState(null);
//   const [logoSrc, setLogoSrc] = useState('');
//   const [feeData, setFeeData] = useState([]);
//   const [archiveData, setArchiveData] = useState([]);
//   const [ArrearFeesData, setArrearFeeData]= useState([]);
//   const [feeTypes, setFeeTypes] = useState([]);
//   const [classSectionMap, setClassSectionMap] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadingYears, setLoadingYears] = useState(false);
//   const [classOptions, setClassOptions] = useState([]);
//   const [sectionOptions, setSectionOptions] = useState([]);
//   const [academicYearOptions, setAcademicYearOptions] = useState([]);
//   const [installmentOptions, setInstallmentOptions] = useState([]);
//   const [paymentModeOptions, setPaymentModeOptions] = useState([]);
//   const [tcStatusOptions, setTCStatusOptions] = useState([]);
//   const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
//   const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [selectedSections, setSelectedSections] = useState([]);
//   const [selectedYears, setSelectedYears] = useState([]);
//   const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
//   const [selectedInstallments, setSelectedInstallments] = useState([]);
//   const [selectedTCStatus, setSelectedTCStatus] = useState(null);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [isExporting, setIsExporting] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState('all');
//   const dropdownRef = useRef(null);

//   const tabs = [ 'Academic Year'];

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


//   const fetchDefaulterData = async () => {
//     setIsLoading(true);
//     try {
//       const defaulterResponse = await getAPI(`/Defaulter-Fees?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
//       const unifiedData = !defaulterResponse?.hasError && defaulterResponse?.data?.data ? defaulterResponse.data.data : [];
      
//       if (!defaulterResponse?.data?.data && !defaulterResponse?.hasError) {
//         console.warn(`No defaulter data found for year ${selectedAcademicYear}: ${defaulterResponse?.data?.message || 'Unknown error'}`);
//       }

//       console.log('Fetched unifiedData:', unifiedData);

 
//       const classSectionMapping = {};
//       unifiedData.forEach(record => {
//         const className = record.className || '-';
//         const sectionName = record.sectionName || '-';
//         if (className !== '-' && sectionName !== '-') {
//           if (!classSectionMapping[className]) {
//             classSectionMapping[className] = new Set();
//           }
//           classSectionMapping[className].add(sectionName);
//         }
//       });

//       setClassSectionMap(prev => ({ ...prev, ...classSectionMapping }));
//       setFeeData(unifiedData);

//       // Update filter options
//       const filterOptions = defaulterResponse?.hasError ? {} : defaulterResponse?.data?.filterOptions || {};
//       setClassOptions(filterOptions.classOptions || []);
//       setSectionOptions(filterOptions.sectionOptions || []);
//       setInstallmentOptions(filterOptions.installmentOptions || []);
//       setPaymentModeOptions(filterOptions.paymentModeOptions || []);
//       setTCStatusOptions(filterOptions.tcStatusOptions || []);

//       if (rowsPerPage === 'all' && unifiedData.length > 0) {
//         setRowsPerPage(unifiedData.length);
//       }
//     } catch (error) {
//       toast.error('Error fetching defaulter data: ' + error.message);
//       console.error('Error fetching defaulter data:', error);
//       setFeeData([]);
//       setClassSectionMap({});
//       setClassOptions([]);
//       setSectionOptions([]);
//       setInstallmentOptions([]);
//       setPaymentModeOptions([]);
//       setTCStatusOptions([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//  const fetchArchiveData = async () => {
//   setIsLoading(true);
//   try {
//     const archiveResponse = await getAPI(`/get-arrear-fees-ArrearFeesArchive?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
//     const previousAcademicYear = archiveResponse?.data?.data?.previousAcademicYear;
//     console.log("privous acdmicyear",previousAcademicYear)
//     const unifiedArchiveData = !archiveResponse?.hasError && archiveResponse?.data?.data?.defaulters
//       ? archiveResponse.data.data.defaulters.map(defaulter => ({
//           admissionNumber: defaulter.admissionNumber,
//           studentName: defaulter.studentName || '-',
//           className: defaulter.className || '-',
//           sectionName: defaulter.sectionName || '-',
//           parentContactNumber: defaulter.parentContactNumber || '-',
//           tcStatus: defaulter.tcStatus || 'Active',
//           academicYear: previousAcademicYear,
//           totalFeesDue: defaulter.totals?.totalFeesDue || 0,
//         }))
//       : [];

//     if (!archiveResponse?.data?.data?.defaulters && !archiveResponse?.hasError) {
//       console.warn(`No archive data found for year ${selectedAcademicYear}: ${archiveResponse?.data?.message || 'Unknown error'}`);
//     }

//     console.log('Fetched unifiedArchiveData:', JSON.stringify(unifiedArchiveData, null, 2)); // Debug log

//     const classSectionMapping = {};
//     unifiedArchiveData.forEach(record => {
//       const className = record.className || '-';
//       const sectionName = record.sectionName || '-';
//       if (className !== '-' && sectionName !== '-') {
//         if (!classSectionMapping[className]) {
//           classSectionMapping[className] = new Set();
//         }
//         classSectionMapping[className].add(sectionName);
//       }
//     });

//     setClassSectionMap(prev => ({ ...prev, ...classSectionMapping }));
//     setArchiveData(unifiedArchiveData);

//     if (rowsPerPage === 'all' && unifiedArchiveData.length > 0) {
//       setRowsPerPage(unifiedArchiveData.length);
//     }
//   } catch (error) {
//     toast.error('Error fetching archive data: ' + error.message);
//     console.error('Error fetching archive data:', error);
//     setArchiveData([]);
//     setClassSectionMap({});
//   } finally {
//     setIsLoading(false);
//   }
// };

// const fetchArrearFeesData = async (years) => {
//     if (!schoolId || !years.length) return;
//     setIsLoading(true);
//     try {
//       const promises = years.map((year) =>
//         getAPI(`/get-arrear-fees?schoolId=${schoolId}&academicYear=${year}`)
//       );
//       const responses = await Promise.all(promises);
//       const unifiedData = responses.flatMap((res, index) => {
//         if (!res?.data?.data) {
//           console.warn(`No data found for year ${years[index]}`);
//           return [];
//         }
//         const feeRecords = res.data.data.map(item => ({
//           ...item,
//           totalDue: Number(item.totalDue || 0).toFixed(2),
//           totalPaid: Number(item.totalPaid || 0).toFixed(2),
//           totalConcession: Number(item.totalConcession || 0).toFixed(2),
//           fineAmount: Number(item.fineAmount || 0).toFixed(2),
//           totalBalance: Number(item.totalBalance || 0).toFixed(2),
//           openingBalance: Number(item.openingBalance || 0).toFixed(2), 
//           feeTypes: Object.fromEntries(
//             Object.entries(item.feeTypes || {}).map(([type, value]) => [
//               type,
//               { ...value, totalPaid: Number(value.totalPaid || 0).toFixed(2) }
//             ])
//           ),
//           isRefund: false,
//         }));

//         const refundRecords = res.data.data.flatMap(item =>
//           (item.refundData || []).map(refund => {
//             const feeTypeRefunds = refund.feeTypeRefunds || [];
//             const totalRefundAmount = feeTypeRefunds.reduce(
//               (sum, feeType) => sum + Number(feeType.refundAmountandcancelledAmount || 0),
//               0
//             );
//             const totalConcession = feeTypeRefunds.reduce(
//               (sum, feeType) => sum + Number(feeType.concessionAmount || 0),
//               0
//             );
//             return {
//               paymentDate: refund.refundDate || '-',
//               academicYear: item.academicYear || '-',
//               admissionNumber: item.admissionNumber || '-',
//               studentName: item.studentName || '-',
//               className: item.className || '-',
//               sectionName: item.sectionName || '-',
//               installmentName: item.installmentName || '-',
//               paymentMode: refund.paymentMode || '-',
//               transactionNumber: refund.transactionNumber || '-',
//               receiptNumber: refund.receiptNumber || '-',
//               feeTypes: Object.fromEntries(
//                 feeTypeRefunds.map(feeType => [
//                   feeType.feeType,
//                   {
//                     totalPaid: Number(feeType.refundAmountandcancelledAmount || 0).toFixed(2),
//                   }
//                 ])
//               ),
//               totalDue: Number(totalRefundAmount).toFixed(2),
//               totalPaid: Number(totalRefundAmount - totalConcession).toFixed(2),
//               totalConcession: Number(totalConcession).toFixed(2),
//               fineAmount: '0.00',
//               totalBalance: '0.00',
//               isRefund: true,
//             };
//           })
//         );

//         return [...feeRecords, ...refundRecords];
//       });

//       const classSectionMapping = {};
//       unifiedData.forEach((record) => {
//         const className = record.className || '-';
//         const sectionName = record.sectionName || '-';
//         if (className !== '-' && sectionName !== '-') {
//           if (!classSectionMapping[className]) {
//             classSectionMapping[className] = new Set();
//           }
//           classSectionMapping[className].add(sectionName);
//         }
//       });
//       setClassSectionMap(prev => ({ ...prev, ...classSectionMapping }));

//       const allFeeTypes = responses
//         .flatMap((res) => res?.data?.feeTypes || [])
//         .filter((type, index, self) => self.indexOf(type) === index)
//         .sort();

//       setArrearFeeData(unifiedData);
//       setFeeTypes(allFeeTypes);
//       const filterOptions = responses[0]?.data?.filterOptions || {};
//       setClassOptions(filterOptions.classOptions || []);
//       setSectionOptions(filterOptions.sectionOptions || []);
//       setInstallmentOptions(filterOptions.installmentOptions || []);
//       setPaymentModeOptions(filterOptions.paymentModeOptions || []);

//       if (rowsPerPage === 'all' && unifiedData.length > 0) {
//         setRowsPerPage(unifiedData.length);
//       }
//     } catch (error) {
//       toast.error('Error fetching arrear fees data: ' + error.message);
//       setFeeData([]);
//       setFeeTypes([]);
//       setClassOptions([]);
//       setSectionOptions([]);
//       setInstallmentOptions([]);
//       setPaymentModeOptions([]);
//       setClassSectionMap({});
//     } finally {
//       setIsLoading(false);
//     }
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

// useEffect(() => {
//   if (!schoolId || !selectedAcademicYear) return;
//   Promise.all([
//     fetchDefaulterData(),
//     fetchArchiveData(),
//     fetchArrearFeesData([selectedAcademicYear])
//   ])
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//       toast.error('Error fetching data: ' + error.message);
//     });
// }, [schoolId, selectedAcademicYear]);

//   useEffect(() => {
//     if (Object.keys(classSectionMap).length === 0) {
//       const sections = new Set([...feeData, ...archiveData].map(record => record.sectionName).filter(sec => sec && sec !== '-'));
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
//   }, [selectedClasses, classSectionMap, feeData, archiveData]);

//  const handleSelectChange = (selectedOptions, { name }) => {
//     const selected = selectedOptions || [];
//     if (name === 'academicYear') {
//       setSelectedYears(selected);
//       setCurrentPage(1);
//       if (selected.length > 0) {
//        fetchArrearFeesData(selected.map(year => year.value)); 
//       }
//     } else if (name === 'paymentMode') {
//       setSelectedPaymentModes(selected);
//       setCurrentPage(1);
//     } else if (name === 'class') {
//       setSelectedClasses(selected);
//       setCurrentPage(1);
//     } else if (name === 'section') {
//       setSelectedSections(selected);
//       setCurrentPage(1);
//     } else if (name === 'feeType') {
//       setSelectedFeeTypes(selected);
//       setCurrentPage(1);
//     } else if (name === 'installment') {
//       setSelectedInstallments(selected);
//       setCurrentPage(1);
//     } else if (name === 'rowsPerPage') {
//       if (selectedOptions?.value === 'all') {
//         setRowsPerPage(feeData.length + archiveData.length || 'all');
//       } else {
//         setRowsPerPage(selectedOptions ? selectedOptions.value : 10);
//       }
//       setCurrentPage(1);
//     } else if (name === 'tcStatus') {
//       setSelectedTCStatus(selectedOptions);
//       setCurrentPage(1);
//     }
//   };

//   const applyFilters = () => {
//     setShowFilterPanel(false);
//     setCurrentPage(1);
//     Promise.all([
//       fetchDefaulterData(),
//       fetchArchiveData(),
//        fetchArrearFeesData(selectedYears.length > 0 ? selectedYears.map(year => year.value) : [selectedAcademicYear])
//     ])
//       .catch((error) => {
//         console.error('Error applying filters:', error);
//         toast.error('Error applying filters: ' + error.message);
//       });
//   };

//   const resetFilters = () => {
//     setSelectedYears([]);
//     setSelectedPaymentModes([]);
//     setSelectedClasses([]);
//     setSelectedSections([]);
//     setSelectedFeeTypes([]);
//     setSelectedInstallments([]);
//     setSelectedTCStatus(null);
//     setStartDate('');
//     setEndDate('');
//     setSearchTerm('');
//     setCurrentPage(1);
//     setRowsPerPage('all');
//     setShowFilterPanel(false);
//     Promise.all([
//       fetchDefaulterData(),
//       fetchArchiveData(),
//        fetchArrearFeesData([selectedAcademicYear || academicYearOptions[0]?.value])
//     ])
//       .catch((error) => {
//         console.error('Error resetting filters:', error);
//         toast.error('Error resetting filters: ' + error.message);
//       });
//   };

//  const processedData = () => {
//   const defaulterRows = feeData.map((student) => {
//     const archiveStudent = archiveData.find(
//       (archive) => archive.admissionNumber === student.admissionNumber && archive.academicYear === selectedAcademicYear
//     );
//     const openingArrear = archiveStudent ? Number(archiveStudent.totalFeesDue).toFixed(2) : '0.00';
//     const closingBalance = archiveStudent ? Number(archiveStudent.totalFeesDue).toFixed(2) : Number(student.totalBalance || student.totals?.totalBalance || 0).toFixed(2);

//     return {
//       academicYear: student.academicYear,
//       studentName: student.studentName,
//       admissionNumber: student.admissionNumber,
//       className: student.className,
//       sectionName: student.sectionName,
//       parentContactNumber: student.parentContactNumber || '-',
//       tcStatus: student.tcStatus || 'Active',
//       openingArrear,
//       feesReceived: '0.00',
//       defaulterFeesTransferred: Number(student.totalBalance || student.totals?.totalBalance || 0).toFixed(2),
//       closingBalance,
//       source: 'defaulter',
//     };
//   });

// const archiveRows = archiveData
//   .filter((archive) => {
//     const exists = feeData.some(
//       (student) => student.admissionNumber === archive.admissionNumber
//     );
//     return !exists;
//   })
//   .map((archive) => {
//     // Find corresponding records
//     const arrearRecord = ArrearFeesData.find(
//       (arrear) => arrear.admissionNumber === archive.admissionNumber
//     );

//     const feeRecord = feeData.find(
//       (fee) => fee.admissionNumber === archive.admissionNumber
//     );

//     const openingArrear = Number(archive.totalFeesDue || 0).toFixed(2);;
//   const feesReceived = arrearRecord
//          ? Number(arrearRecord.openingBalance || 0).toFixed(2)
//       : "0.00";
//  const closingBalance = (openingArrear - feesReceived).toFixed(2);
  

//     return {
//       academicYear: archive.academicYear,
//       studentName: archive.studentName,
//       admissionNumber: archive.admissionNumber,
//       className: archive.className,
//       sectionName: archive.sectionName,
//       parentContactNumber: archive.parentContactNumber || "-",
//       tcStatus: archive.tcStatus || "Active",
//       openingArrear,
//       feesReceived,
//       defaulterFeesTransferred: "0.00",
//       closingBalance,
//       source: "archive",
//     };
//   });



//   const result = [...defaulterRows, ...archiveRows];
//   console.log('processedData:', JSON.stringify(result, null, 2)); 
//   return result;
// };

//   const filteredData = processedData().filter((row) => {
//     const matchesSearchTerm = searchTerm
//       ? (row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
//         (row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase())
//       : true;

//     const matchesPaymentMode =
//       selectedPaymentModes.length === 0 ||
//       (row.source === 'defaulter' &&
//         feeData
//           .find((student) => student.admissionNumber === row.admissionNumber)
//           ?.installments?.some((inst) => selectedPaymentModes.some((mode) => inst.paymentMode === mode.value))) ||
//       row.source === 'archive';

//     const matchesYear =
//       selectedYears.length === 0 ||
//       selectedYears.some((year) => row.academicYear === year.value);

//     const matchesFeeType =
//       selectedFeeTypes.length === 0 ||
//       (row.source === 'defaulter' &&
//         feeData
//           .find((student) => student.admissionNumber === row.admissionNumber)
//           ?.installments?.some((inst) =>
//             selectedFeeTypes.some((type) => (inst.feeTypes?.[type.value] || 0) > 0)
//           )) ||
//       row.source === 'archive';

//     const matchesClass =
//       selectedClasses.length === 0 ||
//       selectedClasses.some((cls) => row.className === cls.value);

//     const matchesSection =
//       selectedSections.length === 0 ||
//       selectedSections.some((section) => row.sectionName === section.value);

//     const matchesInstallment =
//       selectedInstallments.length === 0 ||
//       (row.source === 'defaulter' &&
//         feeData
//           .find((student) => student.admissionNumber === row.admissionNumber)
//           ?.installments?.some((inst) => selectedInstallments.some((instOpt) => inst.installmentName === instOpt.value))) ||
//       row.source === 'archive';

//     const matchesTCStatus =
//       !selectedTCStatus || row.tcStatus === selectedTCStatus.value;

//     const matchesDate = true;

//     return (
//       matchesSearchTerm &&
//       matchesPaymentMode &&
//       matchesYear &&
//       matchesFeeType &&
//       matchesClass &&
//       matchesSection &&
//       matchesInstallment &&
//       matchesTCStatus &&
//       (Number(row.closingBalance) > 0 || Number(row.openingArrear) > 0)
//     );
//   });

//   const studentDataArray = filteredData.sort((a, b) => a.admissionNumber.localeCompare(b.admissionNumber));

//   const grandTotals = studentDataArray.reduce(
//     (acc, student) => {
//       acc.totalOpeningArrear += Number(student.openingArrear) || 0;
//       acc.totalFeesReceived += Number(student.feesReceived) || 0;
//       acc.totalDefaulterFeesTransferred += Number(student.defaulterFeesTransferred) || 0;
//       acc.totalClosingBalance += Number(student.closingBalance) || 0;
//       return acc;
//     },
//     {
//       totalOpeningArrear: 0,
//       totalFeesReceived: 0,
//       totalDefaulterFeesTransferred: 0,
//       totalClosingBalance: 0,
//     }
//   );

//   grandTotals.totalOpeningArrear = Number(grandTotals.totalOpeningArrear).toFixed(2);
//   grandTotals.totalFeesReceived = Number(grandTotals.totalFeesReceived).toFixed(2);
//   grandTotals.totalDefaulterFeesTransferred = Number(grandTotals.totalDefaulterFeesTransferred).toFixed(2);
//   grandTotals.totalClosingBalance = Number(grandTotals.totalClosingBalance).toFixed(2);

//   const totalRecords = studentDataArray.length;
//   const totalPages = rowsPerPage === 'all' ? 1 : Math.ceil(totalRecords / rowsPerPage);

//   const maxPagesToShow = 5;
//   const pagesToShow = [];
//   const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//   const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

//   for (let i = startPage; i <= endPage; i++) {
//     pagesToShow.push(i);
//   }

//   const paginatedData = () => {
//     const startIndex = rowsPerPage === 'all' ? 0 : (currentPage - 1) * rowsPerPage;
//     const endIndex = rowsPerPage === 'all' ? totalRecords : startIndex + rowsPerPage;
//     return studentDataArray.slice(startIndex, endIndex);
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

//   const headerMapping = {
//     academicYear: 'Academic Year',
//     studentName: 'Name',
//     openingArrear: 'Opening Arrear',
//     feesReceived: 'Fees Received',
//     defaulterFeesTransferred: 'Defaulter Fees Transferred',
//     closingBalance: 'Closing Balance',
//   };

//   const tableFields = Object.keys(headerMapping).map((key) => ({
//     id: key,
//     label: headerMapping[key],
//   }));

//   const getFieldValue = (record, field) => {
//     const fieldId = field.id;
//     if (fieldId === 'academicYear') {
//       return formatAcademicYear(record[fieldId]) || '-';
//     } else if (fieldId === 'studentName') {
//       return record[fieldId] || '-';
//     } else {
//       return record[fieldId] !== undefined ? record[fieldId] : '0.00';
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
//                       placeholder="Search by field..."
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
//                       value={pageShowOptions.find((option) => option.value === rowsPerPage || (option.value === 'all' && rowsPerPage === (feeData.length + archiveData.length)))}
//                       onChange={(selected, action) => handleSelectChange(selected, action)}
//                       className="email-select border border-dark me-lg-2"
//                     />
//                     <Select
//                       isClearable
//                       name="tcStatus"
//                       placeholder="Select Status"
//                       options={tcStatusOptions}
//                       value={selectedTCStatus}
//                       onChange={(selected, action) => handleSelectChange(selected, action)}
//                       className="email-select border border-dark me-lg-2"
//                     />
//                     <div
//                       className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
//                       style={{ cursor: 'pointer' }}
//                       onClick={() => setShowFilterPanel(!showFilterPanel)}
//                     >
//                       <FaFilter />
//                     </div>
//                     <div className="position-relative" ref={dropdownRef}>
//                       <div
//                         className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
//                         style={{ cursor: 'pointer' }}
//                         onClick={() => setShowExportDropdown(!showExportDropdown)}
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
//                               if (filteredData.length === 0) {
//                                 toast.error('No data to export');
//                                 return;
//                               }
//                               setIsExporting(true);
//                               try {
//                                 await exportToExcel(
//                                   filteredData,
//                                   tableFields,
//                                   headerMapping,
//                                   getFieldValue,
//                                   grandTotals,
//                                   formatAcademicYear,
//                                   selectedYears.length > 0
//                                     ? selectedYears.map((y) => y.value).join(',')
//                                     : selectedAcademicYear
//                                 );
//                                 toast.success('Exported to Excel successfully');
//                               } catch (err) {
//                                 toast.error('Export to Excel failed: ' + err.message);
//                                 console.error('Excel export failed:', err);
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
//                               if (filteredData.length === 0) {
//                                 toast.error('No data to export');
//                                 return;
//                               }
//                               setIsExporting(true);
//                               try {
//                                 await exportToPDF(
//                                   filteredData,
//                                   tableFields,
//                                   headerMapping,
//                                   getFieldValue,
//                                   grandTotals,
//                                   formatAcademicYear,
//                                   selectedYears.length > 0
//                                     ? selectedYears.map((y) => y.value).join(',')
//                                     : selectedAcademicYear,
//                                   school,
//                                   logoSrc
//                                 );
//                                 toast.success('Exported to PDF successfully');
//                               } catch (err) {
//                                 toast.error('Export to PDF failed: ' + err.message);
//                                 console.error('PDF export failed:', err);
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
//                                 isDisabled={selectedClasses.length === 0}
//                               />
//                             </div>
//                           </div>
//                         )}

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
//                   <h2 className="payroll-title text-center mb-0 flex-grow-1">Opening And Closing Arrear Report</h2>
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
//                     <table className="table text-dark border border-secondary mb-1">
//                       <thead>
//                         <tr className="payroll-table-header">
//                           <th className="text-center align-middle border border-secondary text-nowrap p-2">Academic Year</th>
//                           <th className="text-center align-middle border border-secondary text-nowrap p-2">Name</th>
//                           <th className="text-center align-middle border border-secondary text-nowrap p-2">Opening Arrear</th>
//                           <th className="text-center align-middle border border-secondary text-nowrap p-2">Fees Received</th>
//                           <th className="text-center align-middle border border-secondary text-nowrap p-2">Defaulter Fees Transferred</th>
//                           <th className="text-center align-middle border border-secondary text-nowrap p-2">Closing Balance</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {paginatedData().map((student, index) => (
//                           <tr key={`${student.admissionNumber}_${index}`}>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {formatAcademicYear(student.academicYear) || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {student.studentName || '-'}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {student.openingArrear}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {student.feesReceived}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {student.defaulterFeesTransferred}
//                             </td>
//                             <td className="text-center align-middle border border-secondary text-nowrap p-2">
//                               {student.closingBalance}
//                             </td>
//                           </tr>
//                         ))}
//                         <tr className="payroll-table-footer">
//                           <td colSpan={2} className="text-right border border-secondary p-2">
//                             <strong>Total</strong>
//                           </td>
//                           <td className="text-center border border-secondary p-2">
//                             <strong>{grandTotals.totalOpeningArrear}</strong>
//                           </td>
//                           <td className="text-center border border-secondary p-2">
//                             <strong>{grandTotals.totalFeesReceived}</strong>
//                           </td>
//                           <td className="text-center border border-secondary p-2">
//                             <strong>{grandTotals.totalDefaulterFeesTransferred}</strong>
//                           </td>
//                           <td className="text-center border border-secondary p-2">
//                             <strong>{grandTotals.totalClosingBalance}</strong>
//                           </td>
//                         </tr>
//                       </tbody>
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
//                     No data matches the selected filters for{' '}
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

// export default OpeningAndClosingArrearFeesReport;




import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';
import { exportToExcel, exportToPDF } from './OpeningAndClosingArrearReportExport';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const OpeningAndClosingArrearFeesReport = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Payment Mode');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [school, setSchool] = useState(null);
  const [logoSrc, setLogoSrc] = useState('');
  const [feeData, setFeeData] = useState([]);
  const [archiveData, setArchiveData] = useState([]);
  const [ArrearFeesData, setArrearFeeData] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [classSectionMap, setClassSectionMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [paymentModeOptions, setPaymentModeOptions] = useState([]);
  const [tcStatusOptions, setTCStatusOptions] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const [selectedTCStatus, setSelectedTCStatus] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState('all');
  const dropdownRef = useRef(null);

  const tabs = ['Academic Year'];

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
    return `${startYear}-${endYear?.slice(-2) || ''}`;
  };

  const fetchDefaulterData = async () => {
    setIsLoading(true);
    try {
      const defaulterResponse = await getAPI(`/Defaulter-Fees?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
      const unifiedData = !defaulterResponse?.hasError && defaulterResponse?.data?.data ? defaulterResponse.data.data : [];
      
      if (!defaulterResponse?.data?.data && !defaulterResponse?.hasError) {
        console.warn(`No defaulter data found for year ${selectedAcademicYear}: ${defaulterResponse?.data?.message || 'Unknown error'}`);
      }

      console.log('Fetched unifiedData:', unifiedData);

      const classSectionMapping = {};
      unifiedData.forEach(record => {
        const className = record.className || '-';
        const sectionName = record.sectionName || '-';
        if (className !== '-' && sectionName !== '-') {
          if (!classSectionMapping[className]) {
            classSectionMapping[className] = new Set();
          }
          classSectionMapping[className].add(sectionName);
        }
      });

      setClassSectionMap(prev => ({ ...prev, ...classSectionMapping }));
      setFeeData(unifiedData);

      const filterOptions = defaulterResponse?.hasError ? {} : defaulterResponse?.data?.filterOptions || {};
      setClassOptions(filterOptions.classOptions || []);
      setSectionOptions(filterOptions.sectionOptions || []);
      setInstallmentOptions(filterOptions.installmentOptions || []);
      setPaymentModeOptions(filterOptions.paymentModeOptions || []);
      setTCStatusOptions(filterOptions.tcStatusOptions || []);

      if (rowsPerPage === 'all' && unifiedData.length > 0) {
        setRowsPerPage(unifiedData.length);
      }
    } catch (error) {
      console.error('Error fetching defaulter data:', error);
      setFeeData([]);
      setClassSectionMap({});
      setClassOptions([]);
      setSectionOptions([]);
      setInstallmentOptions([]);
      setPaymentModeOptions([]);
      setTCStatusOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArchiveData = async () => {
    setIsLoading(true);
    try {
      const archiveResponse = await getAPI(`/get-arrear-fees-ArrearFeesArchive?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
      const previousAcademicYear = archiveResponse?.data?.data?.previousAcademicYear;
      console.log("previous academicYear:", previousAcademicYear);
      const unifiedArchiveData = !archiveResponse?.hasError && archiveResponse?.data?.data?.defaulters
        ? archiveResponse.data.data.defaulters.map(defaulter => ({
            admissionNumber: defaulter.admissionNumber,
            studentName: defaulter.studentName || '-',
            className: defaulter.className || '-',
            sectionName: defaulter.sectionName || '-',
            parentContactNumber: defaulter.parentContactNumber || '-',
            tcStatus: defaulter.tcStatus || 'Active',
            academicYear: previousAcademicYear,
            totalFeesDue: defaulter.totals?.totalFeesDue || 0,
          }))
        : [];

      if (!archiveResponse?.data?.data?.defaulters && !archiveResponse?.hasError) {
        console.warn(`No archive data found for year ${selectedAcademicYear}: ${archiveResponse?.data?.message || 'Unknown error'}`);
      }

      console.log('Fetched unifiedArchiveData:', JSON.stringify(unifiedArchiveData, null, 2));

      const classSectionMapping = {};
      unifiedArchiveData.forEach(record => {
        const className = record.className || '-';
        const sectionName = record.sectionName || '-';
        if (className !== '-' && sectionName !== '-') {
          if (!classSectionMapping[className]) {
            classSectionMapping[className] = new Set();
          }
          classSectionMapping[className].add(sectionName);
        }
      });

      setClassSectionMap(prev => ({ ...prev, ...classSectionMapping }));
      setArchiveData(unifiedArchiveData);

      if (rowsPerPage === 'all' && unifiedArchiveData.length > 0) {
        setRowsPerPage(unifiedArchiveData.length);
      }
    } catch (error) {
      toast.error('Error fetching archive data: ' + error.message);
      console.error('Error fetching archive data:', error);
      setArchiveData([]);
      setClassSectionMap({});
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArrearFeesData = async (years) => {
    if (!schoolId || !years.length) return;
    setIsLoading(true);
    try {
      const promises = years.map((year) =>
        getAPI(`/get-arrear-fees?schoolId=${schoolId}&academicYear=${year}`)
      );
      const responses = await Promise.all(promises);
      const unifiedData = responses.flatMap((res, index) => {
        if (!res?.data?.data) {
          console.warn(`No data found for year ${years[index]}`);
          return [];
        }
        const feeRecords = res.data.data.map(item => ({
          ...item,
          totalDue: Number(item.totalDue || 0).toFixed(2),
          totalPaid: Number(item.totalPaid || 0).toFixed(2),
          totalConcession: Number(item.totalConcession || 0).toFixed(2),
          fineAmount: Number(item.fineAmount || 0).toFixed(2),
          totalBalance: Number(item.totalBalance || 0).toFixed(2),
          openingBalance: Number(item.openingBalance || 0).toFixed(2),
          feeTypes: Object.fromEntries(
            Object.entries(item.feeTypes || {}).map(([type, value]) => [
              type,
              { ...value, totalPaid: Number(value.totalPaid || 0).toFixed(2) }
            ])
          ),
          isRefund: false,
        }));

        const refundRecords = res.data.data.flatMap(item =>
          (item.refundData || []).map(refund => {
            const feeTypeRefunds = refund.feeTypeRefunds || [];
            const totalRefundAmount = feeTypeRefunds.reduce(
              (sum, feeType) => sum + Number(feeType.refundAmountandcancelledAmount || 0),
              0
            );
            const totalConcession = feeTypeRefunds.reduce(
              (sum, feeType) => sum + Number(feeType.concessionAmount || 0),
              0
            );
            return {
              paymentDate: refund.refundDate || '-',
              academicYear: item.academicYear || '-',
              admissionNumber: item.admissionNumber || '-',
              studentName: item.studentName || '-',
              className: item.className || '-',
              sectionName: item.sectionName || '-',
              installmentName: item.installmentName || '-',
              paymentMode: refund.paymentMode || '-',
              transactionNumber: refund.transactionNumber || '-',
              receiptNumber: refund.receiptNumber || '-',
              feeTypes: Object.fromEntries(
                feeTypeRefunds.map(feeType => [
                  feeType.feeType,
                  {
                    totalPaid: Number(feeType.refundAmountandcancelledAmount || 0).toFixed(2),
                  }
                ])
              ),
              totalDue: Number(totalRefundAmount).toFixed(2),
              totalPaid: Number(totalRefundAmount - totalConcession).toFixed(2),
              totalConcession: Number(totalConcession).toFixed(2),
              fineAmount: '0.00',
              totalBalance: '0.00',
              isRefund: true,
            };
          })
        );

        return [...feeRecords, ...refundRecords];
      });

      const classSectionMapping = {};
      unifiedData.forEach((record) => {
        const className = record.className || '-';
        const sectionName = record.sectionName || '-';
        if (className !== '-' && sectionName !== '-') {
          if (!classSectionMapping[className]) {
            classSectionMapping[className] = new Set();
          }
          classSectionMapping[className].add(sectionName);
        }
      });
      setClassSectionMap(prev => ({ ...prev, ...classSectionMapping }));

      const allFeeTypes = responses
        .flatMap((res) => res?.data?.feeTypes || [])
        .filter((type, index, self) => self.indexOf(type) === index)
        .sort();

      setArrearFeeData(unifiedData);
      setFeeTypes(allFeeTypes);
      const filterOptions = responses[0]?.data?.filterOptions || {};
      setClassOptions(filterOptions.classOptions || []);
      setSectionOptions(filterOptions.sectionOptions || []);
      setInstallmentOptions(filterOptions.installmentOptions || []);
      setPaymentModeOptions(filterOptions.paymentModeOptions || []);

      if (rowsPerPage === 'all' && unifiedData.length > 0) {
        setRowsPerPage(unifiedData.length);
      }
    } catch (error) {
      toast.error('Error fetching arrear fees data: ' + error.message);
      console.error('Error fetching arrear fees data:', error);
      setArrearFeeData([]);
      setFeeTypes([]);
      setClassOptions([]);
      setSectionOptions([]);
      setInstallmentOptions([]);
      setPaymentModeOptions([]);
      setClassSectionMap({});
    } finally {
      setIsLoading(false);
    }
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
        toast.error('Error fetching academic years: ' + err.message);
        console.error('Error fetching academic years:', err);
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
    Promise.all([
      fetchDefaulterData(),
      fetchArchiveData(),
      fetchArrearFeesData([selectedAcademicYear])
    ])
      .catch((error) => {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data: ' + error.message);
      });
  }, [schoolId, selectedAcademicYear]);

  useEffect(() => {
    if (Object.keys(classSectionMap).length === 0) {
      const sections = new Set([...feeData, ...archiveData].map(record => record.sectionName).filter(sec => sec && sec !== '-'));
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
  }, [selectedClasses, classSectionMap, feeData, archiveData]);

  const handleSelectChange = (selectedOptions, { name }) => {
    const selected = selectedOptions || [];
    if (name === 'academicYear') {
      setSelectedYears(selected);
      setCurrentPage(1);
      if (selected.length > 0) {
        fetchArrearFeesData(selected.map(year => year.value));
      }
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
        setRowsPerPage(feeData.length + archiveData.length || 'all');
      } else {
        setRowsPerPage(selectedOptions ? selectedOptions.value : 10);
      }
      setCurrentPage(1);
    } else if (name === 'tcStatus') {
      setSelectedTCStatus(selectedOptions);
      setCurrentPage(1);
    }
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
    setCurrentPage(1);
    Promise.all([
      fetchDefaulterData(),
      fetchArchiveData(),
      fetchArrearFeesData(selectedYears.length > 0 ? selectedYears.map(year => year.value) : [selectedAcademicYear])
    ])
      .catch((error) => {
        console.error('Error applying filters:', error);
        toast.error('Error applying filters: ' + error.message);
      });
  };

  const resetFilters = () => {
    setSelectedYears([]);
    setSelectedPaymentModes([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setSelectedFeeTypes([]);
    setSelectedInstallments([]);
    setSelectedTCStatus(null);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setCurrentPage(1);
    setRowsPerPage('all');
    setShowFilterPanel(false);
    Promise.all([
      fetchDefaulterData(),
      fetchArchiveData(),
      fetchArrearFeesData([selectedAcademicYear || academicYearOptions[0]?.value])
    ])
      .catch((error) => {
        console.error('Error resetting filters:', error);
        toast.error('Error resetting filters: ' + error.message);
      });
  };

  const processedData = () => {
    const defaulterRows = feeData.map((student) => {
      const archiveStudent = archiveData.find(
        (archive) => archive.admissionNumber === student.admissionNumber && archive.academicYear === selectedAcademicYear
      );
      const openingArrear = archiveStudent ? Number(archiveStudent.totalFeesDue).toFixed(2) : '0.00';
      const closingBalance = Number(student.totalBalance || student.totals?.totalBalance || 0).toFixed(2);

      return {
        academicYear: student.academicYear,
        studentName: student.studentName,
        admissionNumber: student.admissionNumber,
        className: student.className,
        sectionName: student.sectionName,
        parentContactNumber: student.parentContactNumber || '-',
        tcStatus: student.tcStatus || 'Active',
        openingArrear,
        feesReceived: '0.00',
        defaulterFeesTransferred: Number(student.totalBalance || student.totals?.totalBalance || 0).toFixed(2),
        closingBalance,
        source: 'defaulter',
      };
    });

    const archiveRows = archiveData
      .filter((archive) => {
        const exists = feeData.some(
          (student) => student.admissionNumber === archive.admissionNumber
        );
        return !exists;
      })
      .map((archive) => {
        const arrearRecord = ArrearFeesData.find(
          (arrear) => arrear.admissionNumber === archive.admissionNumber
        );

        const openingArrear = Number(archive.totalFeesDue || 0).toFixed(2);
        const feesReceived = arrearRecord ? Number(arrearRecord.totalPaid || 0).toFixed(2) : '0.00';
        const closingBalance = Number((Number(openingArrear) - Number(feesReceived)).toFixed(2)).toFixed(2);

        return {
          academicYear: archive.academicYear,
          studentName: archive.studentName,
          admissionNumber: archive.admissionNumber,
          className: archive.className,
          sectionName: archive.sectionName,
          parentContactNumber: archive.parentContactNumber || '-',
          tcStatus: archive.tcStatus || 'Active',
          openingArrear,
          feesReceived,
          defaulterFeesTransferred: '0.00',
          closingBalance,
          source: 'archive',
        };
      });

    const result = [...defaulterRows, ...archiveRows];
    console.log('processedData:', JSON.stringify(result, null, 2));
    return result;
  };

  const filteredData = processedData().filter((row) => {
    const matchesSearchTerm = searchTerm
      ? (row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase())
      : true;

    const matchesPaymentMode =
      selectedPaymentModes.length === 0 ||
      (row.source === 'defaulter' &&
        feeData
          .find((student) => student.admissionNumber === row.admissionNumber)
          ?.installments?.some((inst) => selectedPaymentModes.some((mode) => inst.paymentMode === mode.value))) ||
      row.source === 'archive';

    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.some((year) => row.academicYear === year.value);

    const matchesFeeType =
      selectedFeeTypes.length === 0 ||
      (row.source === 'defaulter' &&
        feeData
          .find((student) => student.admissionNumber === row.admissionNumber)
          ?.installments?.some((inst) =>
            selectedFeeTypes.some((type) => (inst.feeTypes?.[type.value] || 0) > 0)
          )) ||
      row.source === 'archive';

    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => row.className === cls.value);

    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((section) => row.sectionName === section.value);

    const matchesInstallment =
      selectedInstallments.length === 0 ||
      (row.source === 'defaulter' &&
        feeData
          .find((student) => student.admissionNumber === row.admissionNumber)
          ?.installments?.some((inst) => selectedInstallments.some((instOpt) => inst.installmentName === instOpt.value))) ||
      row.source === 'archive';

    const matchesTCStatus =
      !selectedTCStatus || row.tcStatus === selectedTCStatus.value;

    const matchesDate = true;

    return (
      matchesSearchTerm &&
      matchesPaymentMode &&
      matchesYear &&
      matchesFeeType &&
      matchesClass &&
      matchesSection &&
      matchesInstallment &&
      matchesTCStatus &&
      (Number(row.closingBalance) > 0 || Number(row.openingArrear) > 0)
    );
  });

  const studentDataArray = filteredData.sort((a, b) => a.admissionNumber.localeCompare(b.admissionNumber));

  const grandTotals = studentDataArray.reduce(
    (acc, student) => {
      acc.totalOpeningArrear += Number(student.openingArrear) || 0;
      acc.totalFeesReceived += Number(student.feesReceived) || 0;
      acc.totalDefaulterFeesTransferred += Number(student.defaulterFeesTransferred) || 0;
      acc.totalClosingBalance += Number(student.closingBalance) || 0;
      return acc;
    },
    {
      totalOpeningArrear: 0,
      totalFeesReceived: 0,
      totalDefaulterFeesTransferred: 0,
      totalClosingBalance: 0,
    }
  );

  grandTotals.totalOpeningArrear = Number(grandTotals.totalOpeningArrear).toFixed(2);
  grandTotals.totalFeesReceived = Number(grandTotals.totalFeesReceived).toFixed(2);
  grandTotals.totalDefaulterFeesTransferred = Number(grandTotals.totalDefaulterFeesTransferred).toFixed(2);
  grandTotals.totalClosingBalance = Number(grandTotals.totalClosingBalance).toFixed(2);

  console.log('grandTotals:', grandTotals); // Debug log for grandTotals

  const totalRecords = studentDataArray.length;
  const totalPages = rowsPerPage === 'all' ? 1 : Math.ceil(totalRecords / rowsPerPage);

  const maxPagesToShow = 5;
  const pagesToShow = [];
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  const paginatedData = () => {
    const startIndex = rowsPerPage === 'all' ? 0 : (currentPage - 1) * rowsPerPage;
    const endIndex = rowsPerPage === 'all' ? totalRecords : startIndex + rowsPerPage;
    return studentDataArray.slice(startIndex, endIndex);
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
    academicYear: 'Academic Year',
    studentName: 'Name',
    openingArrear: 'Opening Arrear',
    feesReceived: 'Fees Received',
    defaulterFeesTransferred: 'Defaulter Fees Transferred',
    closingBalance: 'Closing Balance',
  };

  const tableFields = Object.keys(headerMapping).map((key) => ({
    id: key,
    label: headerMapping[key],
  }));

  const getFieldValue = (record, field) => {
    const fieldId = field.id;
    if (fieldId === 'academicYear') {
      return formatAcademicYear(record[fieldId]) || '-';
    } else if (fieldId === 'studentName') {
      return record[fieldId] || '-';
    } else {
      return record[fieldId] !== undefined ? Number(record[fieldId]).toFixed(2) : '0.00';
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
                      placeholder="Search by field..."
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
                      value={pageShowOptions.find((option) => option.value === rowsPerPage || (option.value === 'all' && rowsPerPage === (feeData.length + archiveData.length)))}
                      onChange={(selected, action) => handleSelectChange(selected, action)}
                      className="email-select border border-dark me-lg-2"
                    />
                    {/* <Select
                      isClearable
                      name="tcStatus"
                      placeholder="Select Status"
                      options={tcStatusOptions}
                      value={selectedTCStatus}
                      onChange={(selected, action) => handleSelectChange(selected, action)}
                      className="email-select border border-dark me-lg-2"
                    /> */}
                    <div
                      className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowFilterPanel(!showFilterPanel)}
                    >
                      <FaFilter />
                    </div>
                    <div className="position-relative" ref={dropdownRef}>
                      <div
                        className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowExportDropdown(!showExportDropdown)}
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
                              if (filteredData.length === 0) {
                                toast.error('No data to export');
                                return;
                              }
                              setIsExporting(true);
                              try {
                                console.log('Exporting to Excel with grandTotals:', grandTotals); // Debug log
                                await exportToExcel(
                                  filteredData,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  grandTotals,
                                  formatAcademicYear,
                                  selectedYears.length > 0
                                    ? selectedYears.map((y) => y.value).join(',')
                                    : selectedAcademicYear
                                );
                                toast.success('Exported to Excel successfully');
                              } catch (err) {
                                toast.error('Export to Excel failed: ' + err.message);
                                console.error('Excel export failed:', err);
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
                              if (filteredData.length === 0) {
                                toast.error('No data to export');
                                return;
                              }
                              setIsExporting(true);
                              try {
                                console.log('Exporting to PDF with grandTotals:', grandTotals); // Debug log
                                await exportToPDF(
                                  filteredData,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  grandTotals,
                                  formatAcademicYear,
                                  selectedYears.length > 0
                                    ? selectedYears.map((y) => y.value).join(',')
                                    : selectedAcademicYear,
                                  school,
                                  logoSrc
                                );
                                toast.success('Exported to PDF successfully');
                              } catch (err) {
                                toast.error('Export to PDF failed: ' + err.message);
                                console.error('PDF export failed:', err);
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
                        {/* {activeTab === 'Payment Mode' && (
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
                        )} */}

                        {/* {activeTab === 'Class & Section' && (
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
                        )} */}

                        {/* {activeTab === 'Date' && (
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
                        )} */}

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

                        {/* {activeTab === 'Installment' && (
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
                        )} */}
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Opening And Closing Arrear Report</h2>
                </div>
              </div>

              {isLoading || loadingYears ? (
                <div className="text-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Loading...</p>
                </div>
              ) : studentDataArray.length > 0 ? (
                <>
                  <div className="table-responsive pb-4 mt-3">
                    <table className="table text-dark border border-secondary mb-1">
                      <thead>
                        <tr className="payroll-table-header">
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Academic Year</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Name</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Opening Arrear</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Fees Received</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Defaulter Fees Transferred</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Closing Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData().map((student, index) => (
                          <tr key={`${student.admissionNumber}_${index}`}>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {formatAcademicYear(student.academicYear) || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {student.studentName || '-'}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {Number(student.openingArrear).toFixed(2)}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {Number(student.feesReceived).toFixed(2)}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {Number(student.defaulterFeesTransferred).toFixed(2)}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {Number(student.closingBalance).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                        <tr className="payroll-table-footer">
                          <td colSpan={2} className="text-right border border-secondary p-2">
                            <strong>Total</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{Number(grandTotals.totalOpeningArrear).toFixed(2)}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{Number(grandTotals.totalFeesReceived).toFixed(2)}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{Number(grandTotals.totalDefaulterFeesTransferred).toFixed(2)}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{Number(grandTotals.totalClosingBalance).toFixed(2)}</strong>
                          </td>
                        </tr>
                      </tbody>
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
                  <p>
                    No data matches the selected filters for{' '}
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

export default OpeningAndClosingArrearFeesReport;