import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import getAPI from '../../../../../../api/getAPI';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from './ExportModalDateWiseFeesCollection';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const DateWiseFeesCollectionExcConcession = () => {
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
  const dropdownRef = useRef(null);

  const tabs = ['Date', 'Academic Year', 'Type of Fees', 'Installment', 'Payment Mode'];

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
        getAPI(`/get-all-data-datewise-Withconcession-fees?schoolId=${schoolId}&academicYear=${year}`)
      );
      const responses = await Promise.all(promises);
      const unifiedData = responses.flatMap((res, index) => {
        if (!res?.data?.data) {
          console.warn(`No data found for year ${years[index]}`);
          return [];
        }
        return res.data.data.map((record) => {
          const totalPaidFee = Object.values(record.feeTypes || {}).reduce(
            (sum, fee) => sum + (Number(fee.totalPaid) - Number(fee.concession) || 0),
            0
          ) + (Number(record.fineAmount) || 0) + (Number(record.excessAmount) || 0);
          return {
            ...record,
            academicYear: record.academicYear,
            feesBreakdown: record.feeTypes || {},
            totalPaidFee,
          };
        });
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
        localStorage.setItem('selectedAcademicYear', latestYear);
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
      selectedFeeTypes.some((type) => (row.feesBreakdown[type.value]?.totalPaid || 0) > 0);

    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => row.className === cls.value || row.className === null);

    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((sec) => row.sectionName === sec.value || row.sectionName === null);

    const matchesInstallment =
      selectedInstallments.length === 0 ||
      selectedInstallments.some((inst) => row.installmentName === inst.value || row.installmentName === null);

    return (
      matchesSearchTerm &&
      matchesPaymentMode &&
      matchesYear &&
      matchesDate &&
      matchesFeeType &&
      matchesClass &&
      matchesSection &&
      matchesInstallment
    );
  });

  const groupedByDate = filteredData.reduce((acc, row) => {
    const date = row.paymentDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(row);
    return acc;
  }, {});

  const groupedDataArray = Object.entries(groupedByDate).map(([date, records]) => ({
    date,
    records,
  }));

  const totals = filteredData.reduce(
    (acc, row) => {
      acc.totalPaidFee = (acc.totalPaidFee || 0) + (row.totalPaidFee || 0);
      acc.fineAmount = (acc.fineAmount || 0) + (row.fineAmount || 0);
      acc.excessAmount = (acc.excessAmount || 0) + (row.excessAmount || 0);
      const displayTypes = selectedFeeTypes.length > 0
        ? selectedFeeTypes.map((type) => type.value)
        : feeTypes;
      displayTypes.forEach((type) => {
        acc[type] = (acc[type] || 0) + ((row.feesBreakdown[type]?.totalPaid || 0) - (row.feesBreakdown[type]?.concession || 0));
      });
      return acc;
    },
    { totalPaidFee: 0, fineAmount: 0, excessAmount: 0 }
  );

  const displayedFeeTypes = selectedFeeTypes.length > 0
    ? selectedFeeTypes.map((type) => type.value)
    : feeTypes;

  const headerMapping = {
    paymentDate: 'Date',
    academicYear: 'Academic Year',
    paymentMode: 'Payment Mode',
    ...Object.fromEntries(displayedFeeTypes.map((type) => [type, type])),
    fineAmount: 'Fine Amount',
    excessAmount: 'Excess Amount',
    totalPaidFee: 'Fees Paid',
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
    } else if (fieldId === 'fineAmount') {
      return (record[fieldId] || 0).toFixed(2);
    } else if (fieldId === 'excessAmount') {
      return (record[fieldId] || 0).toFixed(2);
    } else {
      return ((record.feesBreakdown[fieldId]?.totalPaid || 0) - (record.feesBreakdown[fieldId]?.concession || 0)).toFixed(2);
    }
  };

  const totalRecords = filteredData.length;
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
    return groupedDataArray
      .flatMap(({ date, records }) => records.map((record, index) => ({ date, record, groupIndex: index })))
      .slice(startIndex, endIndex);
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Datewise Collection EXC Concession</h2>
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
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Fine Amount</th>
                          <th className="text-center align-middle border border-secondary text-nowrap p-2">Excess Amount</th>
                          {selectedFeeTypes.length === 0 && (
                            <th className="text-center align-middle border border-secondary text-nowrap p-2">Fees Paid</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData().length > 0 ? (
                          paginatedData().map(({ record, groupIndex, date }, index) => (
                            <tr
                              key={`${record.paymentDate}_${record.paymentMode}_${groupIndex}_${index}`}
                              className="payroll-table-row"
                            >
                              <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                {record.paymentDate || '-'}
                              </td>
                              <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                {formatAcademicYear(record.academicYear) || '-'}
                              </td>
                              <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                {record.paymentMode || '-'}
                              </td>
                              {displayedFeeTypes.map((type) => (
                                <td
                                  key={type}
                                  className="text-center align-middle border border-secondary text-nowrap p-2"
                                >
                                  {((record.feesBreakdown[type]?.totalPaid || 0) - (record.feesBreakdown[type]?.concession || 0)).toFixed(2)}
                                </td>
                              ))}
                              <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                {(record.fineAmount || 0).toFixed(2)}
                              </td>
                              <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                {(record.excessAmount || 0).toFixed(2)}
                              </td>
                              {selectedFeeTypes.length === 0 && (
                                <td className="text-center align-middle border border-secondary text-nowrap p-2">
                                  {(record.totalPaidFee || 0).toFixed(2)}
                                </td>
                              )}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={displayedFeeTypes.length + 5} className="text-center">
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
                            <strong>Total</strong>
                          </td>
                          {displayedFeeTypes.map((type) => (
                            <td key={type} className="text-center border border-secondary p-2">
                              <strong>{(totals[type] || 0).toFixed(2)}</strong>
                            </td>
                          ))}
                          <td className="text-center border border-secondary p-2">
                            <strong>{(totals.fineAmount || 0).toFixed(2)}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{(totals.excessAmount || 0).toFixed(2)}</strong>
                          </td>
                          {selectedFeeTypes.length === 0 && (
                            <td className="text-center border border-secondary p-2">
                              <strong>{(totals.totalPaidFee || 0).toFixed(2)}</strong>
                            </td>
                          )}
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

export default DateWiseFeesCollectionExcConcession;