import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';
import { exportToExcel, exportToPDF } from './OpeningandClosingAdvancedReportExport';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const AdvancedFeesReport = () => {
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
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [paymentModeOptions, setPaymentModeOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [paymentAcademicYear, setPaymentAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const dropdownRef = useRef(null);

  const tabs = ['Date', 'Payment Mode', 'Class & Section', 'Installment', 'Type of Fees', 'Academic Year'];

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
          if (!paymentAcademicYear && years.length > 0) {
            const latestYear = years[years.length - 1];
            setPaymentAcademicYear(latestYear);
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
    if (!schoolId || !years.length) return;
    setIsLoading(true);
    try {
      const promises = years.map((year) =>
        getAPI(`/get-opening-and-closing-advanced?schoolId=${schoolId}&academicYear=${year}`)
      );
      const responses = await Promise.all(promises);
      const unifiedData = responses.flatMap((res, index) => {
        if (!res?.data?.data) {
          console.warn(`No data found for year ${years[index]}`);
          return [];
        }
        return res.data.data;
      });
      const usedFeeTypes = [...new Set(unifiedData.flatMap(item => Object.keys(item.feeTypes)))];
      const allFeeTypes = [...new Set(responses
        .flatMap((res) => res?.data?.feeTypes || [])
        .filter(type => !['Admission Fee', 'Admission Fees', 'Registration Fees', 'TC Fees'].includes(type))
        .filter(type => usedFeeTypes.includes(type))
      )].sort();

      setFeeData(unifiedData);
      setFeeTypes(allFeeTypes);
      setClassOptions([...new Set(unifiedData.map(item => item.className))].map(cls => ({ value: cls, label: cls })));
      setSectionOptions([...new Set(unifiedData.map(item => item.sectionName))].map(sec => ({ value: sec, label: sec })));
      setInstallmentOptions([...new Set(unifiedData.map(item => item.installmentName))].map(inst => ({ value: inst, label: inst })));
      setPaymentModeOptions([...new Set(unifiedData.map(item => item.paymentMode))].map(mode => ({ value: mode, label: mode })));
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
    if (!schoolId || !paymentAcademicYear) return;
    const yearsToFetch = selectedYears.length > 0
      ? selectedYears.map((year) => year.value)
      : [paymentAcademicYear];
    fetchFeeData(yearsToFetch);
  }, [schoolId, paymentAcademicYear, selectedYears]);

  const handleSelectChange = (selectedOptions, { name }) => {
    const selected = selectedOptions || [];
    if (name === 'paymentMode') {
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
    } else if (name === 'academicYear') {
      setSelectedYears(selected);
      setCurrentPage(1);
    } else if (name === 'rowsPerPage') {
      setRowsPerPage(selectedOptions ? selectedOptions.value : 10);
      setCurrentPage(1);
    }
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
    const yearsToFetch = selectedYears.length > 0
      ? selectedYears.map((year) => year.value)
      : [paymentAcademicYear];
    fetchFeeData(yearsToFetch);
  };

  const resetFilters = () => {
    setSelectedPaymentModes([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setSelectedFeeTypes([]);
    setSelectedInstallments([]);
    setSelectedYears([]);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setShowFilterPanel(false);
    setCurrentPage(1);
    fetchFeeData([paymentAcademicYear]);
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
      ? String(row.paymentDate || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        String(row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        String(row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        String(row.paymentMode || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        String(row.className || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        String(row.sectionName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        String(row.installmentName || '').toLowerCase().includes(String(searchTerm).toLowerCase())
      : true;

    const matchesPaymentMode =
      selectedPaymentModes.length === 0 ||
      selectedPaymentModes.some((mode) => row.paymentMode === mode.value);

    const matchesDate =
      (!startDate && !endDate) ||
      (() => {
        if (!row.paymentDate || row.paymentDate === '-') return false;
        const recordDate = new Date(row.paymentDate.split('-').reverse().join('-'));
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || recordDate >= start) && (!end || recordDate <= end);
      })();

    const matchesFeeType =
      selectedFeeTypes.length === 0 ||
      selectedFeeTypes.some((type) => (row.feeTypes[type.value]?.totalPaid || 0) > 0);

    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => row.className === cls.value);

    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((sec) => row.sectionName === sec.value);

    const matchesInstallment =
      selectedInstallments.length === 0 ||
      selectedInstallments.some((inst) => row.installmentName === inst.value);

    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.some((year) => row.academicYear === year.value);

    return (
      matchesSearchTerm &&
      matchesPaymentMode &&
      matchesDate &&
      matchesFeeType &&
      matchesClass &&
      matchesSection &&
      matchesInstallment &&
      matchesYear
    );
  });

  const totals = filteredData.reduce(
    (acc, row) => {
      feeTypes.forEach((type) => {
        if (row.feeTypes[type]) {
          acc[type] = {
            openingAdvance: (acc[type]?.openingAdvance || 0) + (row.feeTypes[type].openingAdvance || 0),
            received: (acc[type]?.received || 0) + (row.feeTypes[type].received || 0),
            adjusted: (acc[type]?.adjusted || 0) + (row.feeTypes[type].adjusted || 0),
            closingBalance: (acc[type]?.closingBalance || 0) + (row.feeTypes[type].closingBalance || 0),
          };
        }
      });
      acc.totalReceived = (acc.totalReceived || 0) + (row.totalReceived || 0);
      return acc;
    },
    { totalReceived: 0 }
  );

  const tableFields = [
    { id: 'academicYear', label: 'Academic Year' },
    { id: 'admissionNumber', label: 'Adm No.' },
    { id: 'studentName', label: 'Name' },
    { id: 'className', label: 'Class' },
    { id: 'sectionName', label: 'Section' },
    { id: 'installmentName', label: 'Installment' },
    ...feeTypes.map((type) => ({
      id: type,
      label: type,
      subColumns: [
        { id: `${type}_openingAdvance`, label: 'Opening Advance', prop: 'openingAdvance' },
        { id: `${type}_received`, label: 'Received', prop: 'received' },
        { id: `${type}_adjusted`, label: 'Adjusted', prop: 'adjusted' },
        { id: `${type}_closingBalance`, label: 'Closing Balance', prop: 'closingBalance' },
      ],
    })),
    { id: 'totalReceived', label: 'Total Received' },
  ];

  const getFieldValue = (record, field, subColumn = null) => {
    if (field.id === 'academicYear') {
      return formatAcademicYear(record[field.id]) || '-';
    }
    if (field.id === 'totalReceived') {
      return record[field.id] || 0;
    }
    if (subColumn) {
      const feeType = field.id;
      return record.feeTypes[feeType]?.[subColumn.prop] || 0;
    }
    return record[field.id] || '-';
  };

  const totalRecords = filteredData.length;
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
    return filteredData.slice(startIndex, endIndex);
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
                  <div className="col-md-7 col-12">
                    <input
                      type="text"
                      className="form-control border border-dark"
                      placeholder="Search by any field"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
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
                          className="position-absolute bg-white mx-2 border mr-2 mt-2 border-dark rounded shadow"
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
                                  tableFields.reduce((acc, field) => ({
                                    ...acc,
                                    ...(field.subColumns
                                      ? field.subColumns.reduce((subAcc, subCol) => ({
                                          ...subAcc,
                                          [subCol.id]: `${field.label} ${subCol.label}`,
                                        }), {})
                                      : { [field.id]: field.label }
                                    ),
                                  }), {}),
                                  getFieldValue,
                                  totals,
                                  formatAcademicYear,
                                  selectedYears.length > 0
                                    ? selectedYears.map((y) => y.value).join(',')
                                    : paymentAcademicYear
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
                                  tableFields.reduce((acc, field) => ({
                                    ...acc,
                                    ...(field.subColumns
                                      ? field.subColumns.reduce((subAcc, subCol) => ({
                                          ...subAcc,
                                          [subCol.id]: `${field.label} ${subCol.label}`,
                                        }), {})
                                      : { [field.id]: field.label }
                                    ),
                                  }), {}),
                                  getFieldValue,
                                  totals,
                                  formatAcademicYear,
                                  selectedYears.length > 0
                                    ? selectedYears.map((y) => y.value).join(',')
                                    : paymentAcademicYear,
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
                                isLoading={loadingYears}
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">
                    Opening and Closing Advanced Report
                  </h2>
                </div>
              </div>

              {isLoading || loadingYears ? (
                <div className="text-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Loading data...</p>
                </div>
              ) : feeData.length > 0 && feeTypes.length > 0 ? (
                <>
                  <div className="table-responsive pb-4 mt-3">
                    <table className="table text-dark border border-secondary mb-1">
                      <thead>
                        <tr className="payroll-table-header">
                          {tableFields.map((field) =>
                            field.subColumns ? (
                              <th
                                key={field.id}
                                colSpan={field.subColumns.length}
                                className="text-center align-middle border border-secondary text-nowrap p-2"
                              >
                                {field.label}
                              </th>
                            ) : (
                              <th
                                key={field.id}
                                className="text-center align-middle border border-secondary text-nowrap p-2"
                              >
                                {field.label}
                              </th>
                            )
                          )}
                        </tr>
                        <tr className="payroll-table-header">
                          {tableFields.map((field) =>
                            field.subColumns ? (
                              field.subColumns.map((subCol) => (
                                <th
                                  key={subCol.id}
                                  className="text-center align-middle border border-secondary text-nowrap p-2"
                                >
                                  {subCol.label}
                                </th>
                              ))
                            ) : (
                              <th
                                key={field.id}
                                className="text-center align-middle border border-secondary text-nowrap p-2"
                              ></th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData().length > 0 ? (
                          paginatedData().map((record, index) => (
                            <tr key={`${record.admissionNumber}_${record.installmentName}_${record.academicYear}_${index}`}>
                              {tableFields.map((field) =>
                                field.subColumns ? (
                                  field.subColumns.map((subCol) => (
                                    <td
                                      key={subCol.id}
                                      className="text-center align-middle border border-secondary text-nowrap p-2"
                                    >
                                      {getFieldValue(record, field, subCol)}
                                    </td>
                                  ))
                                ) : (
                                  <td
                                    key={field.id}
                                    className="text-center align-middle border border-secondary text-nowrap p-2"
                                  >
                                    {getFieldValue(record, field)}
                                  </td>
                                )
                              )}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={tableFields.reduce((acc, field) => acc + (field.subColumns ? field.subColumns.length : 1), 0)} className="text-center">
                              No data matches the selected filters for{' '}
                              {selectedYears.length > 0
                                ? selectedYears.map((y) => formatAcademicYear(y.value)).join(', ')
                                : formatAcademicYear(paymentAcademicYear)}.
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr className="payroll-table-footer">
                          <td colSpan={6} className="text-right border border-secondary p-2">
                            <strong>Total</strong>
                          </td>
                          {feeTypes.flatMap((type) => [
                            <td key={`${type}_openingAdvance`} className="text-center border border-secondary p-2">
                              <strong>{totals[type]?.openingAdvance || 0}</strong>
                            </td>,
                            <td key={`${type}_received`} className="text-center border border-secondary p-2">
                              <strong>{totals[type]?.received || 0}</strong>
                            </td>,
                            <td key={`${type}_adjusted`} className="text-center border border-secondary p-2">
                              <strong>{totals[type]?.adjusted || 0}</strong>
                            </td>,
                            <td key={`${type}_closingBalance`} className="text-center border border-secondary p-2">
                              <strong>{totals[type]?.closingBalance || 0}</strong>
                            </td>,
                          ])}
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.totalReceived || 0}</strong>
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
                  <p>No data or fee types available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFeesReport;