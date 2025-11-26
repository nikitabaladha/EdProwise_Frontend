import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';
import { exportToExcel, exportToPDF } from './DefaulterFeesReport';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const DefaulterFees = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Payment Mode');
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
  const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dropdownRef = useRef(null);

  const tabs = ['Payment Mode', 'Class & Section', 'Academic Year', 'Installment'];

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

  const fetchFeeData = async (years) => {
    setIsLoading(true);
    try {
      const promises = years.map((year) =>
        getAPI(`/Defaulter-Fees?schoolId=${schoolId}&academicYear=${year}`)
      );
      const responses = await Promise.all(promises);
      const unifiedData = responses.flatMap((res, index) => {
        if (!res?.data?.data) {
          console.warn(`No data found for year ${years[index]}`);
          return [];
        }
        return res.data.data;
      });

      const allFeeTypes = responses
        .flatMap((res) => res?.data?.feeTypes || [])
        .filter((type, index, self) => self.indexOf(type) === index)
        .sort();

      setFeeTypes(allFeeTypes);
      setFeeData(unifiedData);

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
    } else if (name === 'feeType') {
      setSelectedFeeTypes(selected);
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
    setSelectedFeeTypes([]);
    setSelectedInstallments([]);
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

  const processedData = feeData.flatMap((student) =>
    student.installments.map((installment) => ({
      ...installment,
      admissionNumber: student.admissionNumber,
      studentName: student.studentName,
      className: student.className,
      sectionName: student.sectionName,
      academicYear: student.academicYear,
      parentContactNumber: student.parentContactNumber || '-',
      daysOverdue: installment.daysOverdue || 0,
      feesDue: installment.feesDue || 0,
      feesPaid: installment.feesPaid || 0,
      concession: installment.concession || 0,
      balance: installment.balance || 0,
    }))
  );

  const filteredData = processedData.filter((row) => {
    const matchesSearchTerm = searchTerm
      ? (row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.className || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.sectionName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.installmentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.parentContactNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase())
      : true;

    const matchesPaymentMode =
      selectedPaymentModes.length === 0 ||
      selectedPaymentModes.some((mode) => row.paymentMode === mode.value);

    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.some((year) => row.academicYear === year.value);

    const matchesFeeType =
      selectedFeeTypes.length === 0 ||
      selectedFeeTypes.some((type) => (row.feeTypes[type.value] || 0) > 0);

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
      matchesFeeType &&
      matchesClass &&
      matchesSection &&
      matchesInstallment
    );
  });

  const groupedByStudent = filteredData.reduce((acc, row) => {
    const admissionNumber = row.admissionNumber;
    if (!acc[admissionNumber]) {
      acc[admissionNumber] = {
        studentName: row.studentName,
        className: row.className,
        sectionName: row.sectionName,
        academicYear: row.academicYear,
        parentContactNumber: row.parentContactNumber,
        rows: [],
      };
    }
    acc[admissionNumber].rows.push(row);
    return acc;
  }, {});

  const studentDataArray = Object.keys(groupedByStudent)
    .map((admissionNumber) => ({
      admissionNumber,
      ...groupedByStudent[admissionNumber],
      rows: groupedByStudent[admissionNumber].rows.sort((a, b) => a.installmentName.localeCompare(b.installmentName)),
    }))
    .sort((a, b) => a.admissionNumber.localeCompare(b.admissionNumber));

  const grandTotals = studentDataArray.reduce((acc, student) => {
    const studentTotals = student.rows.reduce((acc, row) => {
      acc.totalFeesDue += row.feesDue || 0;
      acc.totalFeesPaid += row.feesPaid || 0;
      acc.totalConcession += row.concession || 0;
      acc.totalBalance += row.balance || 0;
      return acc;
    }, { totalFeesDue: 0, totalFeesPaid: 0, totalConcession: 0, totalBalance: 0 });
    acc.totalFeesDue += studentTotals.totalFeesDue;
    acc.totalFeesPaid += studentTotals.totalFeesPaid;
    acc.totalConcession += studentTotals.totalConcession;
    acc.totalBalance += studentTotals.totalBalance;
    return acc;
  }, { totalFeesDue: 0, totalFeesPaid: 0, totalConcession: 0, totalBalance: 0 });

  const totalRecords = studentDataArray.length;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const maxPagesToShow = 5;
  const pagesToShow = [];
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  const paginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
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
    admissionNumber: 'Adm No.',
    studentName: 'Name',
    className: 'Class',
    sectionName: 'Section',
    installmentName: 'Installement',
    parentContactNumber: 'Parent Contact No.',
    daysOverdue: 'No. of Days O/s',
    feesDue: 'Fees Due',
    feesPaid: 'Fees Paid',
    concession: 'Concession',
    balance: 'Balance',
  };

  const tableFields = Object.keys(headerMapping).map((key) => ({
    id: key,
    label: headerMapping[key],
  }));

  const getFieldValue = (record, field) => {
    const fieldId = field.id;
    if (fieldId === 'academicYear') {
      return formatAcademicYear(record[fieldId]) || '-';
    } else if (
      fieldId === 'admissionNumber' ||
      fieldId === 'studentName' ||
      fieldId === 'className' ||
      fieldId === 'sectionName' ||
      fieldId === 'installmentName' ||
      fieldId === 'parentContactNumber'
    ) {
      return record[fieldId] || '-';
    } else {
      return record[fieldId] !== undefined ? record[fieldId] : 0;
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
                        className="ms-2 p-1 px-2 border mr-2 border-dark finance-filter-icon"
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
                                  grandTotals,
                                  formatAcademicYear,
                                  selectedYears.length > 0
                                    ? selectedYears.map((y) => y.value).join(',')
                                    : selectedAcademicYear
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
                                  grandTotals,
                                  formatAcademicYear,
                                  selectedYears.length > 0
                                    ? selectedYears.map((y) => y.value).join(',')
                                    : selectedAcademicYear,
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Defaulter Fees</h2>
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
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Adm No.</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Name</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Class</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Section</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Installement</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Parent Contact No.</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">No. of Days O/s</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Fees Due</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Fees Paid</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Concession</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData().map((student, studentIndex) => (
                          <React.Fragment key={student.admissionNumber}>
                            {student.rows.map((record, rowIndex) => (
                              <tr key={`${record.admissionNumber}_${record.installmentName}_${studentIndex}_${rowIndex}`}>
                                <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                  {formatAcademicYear(record.academicYear) || '-'}
                                </td>
                                <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                  {record.admissionNumber || '-'}
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
                                  {record.parentContactNumber || '-'}
                                </td>
                                <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                  {record.daysOverdue || 0}
                                </td>
                                <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                  {record.feesDue}
                                </td>
                                <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                  {record.feesPaid}
                                </td>
                                <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                  {record.concession}
                                </td>
                                <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                  {record.balance}
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                        <tr className="payroll-table-footer">
                          <td colSpan={8} className="text-right border border-secondary p-2">
                            <strong>Total</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{grandTotals.totalFeesDue}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{grandTotals.totalFeesPaid}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{grandTotals.totalConcession}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{grandTotals.totalBalance}</strong>
                          </td>
                        </tr>
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
                </>
              ) : (
                <div className="text-center mt-3">
                  <p>
                    No installments match the selected filters for{' '}
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

export default DefaulterFees;