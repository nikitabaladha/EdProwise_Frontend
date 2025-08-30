import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';
import { fetchSchoolData } from '../../../PdfUtlisReport';
import { exportToExcel, exportToPDF } from './ExportRefundReport';

const FeesRefundReportStudentWise = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Academic Year');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [school, setSchool] = useState(null);
  const [logoSrc, setLogoSrc] = useState('');
  const [refundData, setRefundData] = useState([]);
  const [refundTypes, setRefundTypes] = useState([]);
  const [refundTypeOptions, setRefundTypeOptions] = useState([]);
  const [selectedRefundTypes, setSelectedRefundTypes] = useState([]);
  const [classSectionMap, setClassSectionMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [selectedYears, setSelectedYears] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState('all');
  const dropdownRef = useRef(null);

  const tabs = ['Date', 'Academic Year', 'Class & Section', 'Fees Type'];

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

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
    if (Object.keys(classSectionMap).length === 0) {
      const sections = new Set(refundData.map(record => record.sectionName).filter(sec => sec && sec !== '-'));
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
  }, [selectedClasses, classSectionMap, refundData]);

  const fetchRefundData = async (years, startDate, endDate) => {
    setIsLoading(true);
    try {
      const classSectionMapping = {};
      const queryParams = new URLSearchParams({
        schoolId,
        academicYear: years.join(','),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      });
      const response = await getAPI(`/get-all-fees-refund-report?${queryParams}`);
      if (response.hasError || !response.data?.data) {
        console.warn(`No data found for years ${years.join(', ')}`);
        setRefundData([]);
        setClassSectionMap({});
        setRefundTypes([]);
        setRefundTypeOptions([]);
        setClassOptions([]);
        setSectionOptions([]);
        return;
      }

      const unifiedData = response.data.data;
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

      const refundTypes = [...new Set(unifiedData.map(record => record.refundType).filter(Boolean))].sort();
      const classes = [...new Set(unifiedData.map((request) => request.className))]
        .filter(Boolean)
        .sort()
        .map((name) => ({ value: name, label: name }));
      const sections = [...new Set(unifiedData.map((request) => request.sectionName))]
        .filter(Boolean)
        .sort()
        .map((name) => ({ value: name, label: name }));

      setClassSectionMap(classSectionMapping);
      setRefundTypes(refundTypes);
      setRefundTypeOptions(refundTypes.map((type) => ({ value: type, label: type })));
      setClassOptions(classes);
      setSectionOptions(sections);
      setRefundData(unifiedData);

      if (rowsPerPage === 'all' && unifiedData.length > 0) {
        setRowsPerPage(unifiedData.length);
      }
      console.log('Fetched Refund Data:', unifiedData);
    } catch (error) {
      toast.error('Error fetching refund data: ' + error.message);
      console.error('Error fetching refund data:', error);
      setRefundData([]);
      setClassSectionMap({});
      setRefundTypes([]);
      setRefundTypeOptions([]);
      setClassOptions([]);
      setSectionOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!schoolId || !selectedAcademicYear) return;
    const yearsToFetch = selectedYears.length > 0
      ? selectedYears.map((year) => year.value)
      : [selectedAcademicYear];
    fetchRefundData(yearsToFetch, startDate, endDate);
  }, [schoolId, selectedAcademicYear, selectedYears, startDate, endDate]);

  const handleSelectChange = (selectedOptions, { name }) => {
    const selected = selectedOptions || [];
    if (name === 'academicYear') {
      setSelectedYears(selected);
      setCurrentPage(1);
    } else if (name === 'refundType') {
      setSelectedRefundTypes(selected);
      setCurrentPage(1);
    } else if (name === 'class') {
      setSelectedClasses(selected);
      setCurrentPage(1);
    } else if (name === 'section') {
      setSelectedSections(selected);
      setCurrentPage(1);
    } else if (name === 'rowsPerPage') {
      if (selectedOptions?.value === 'all') {
        setRowsPerPage(refundData.length || 'all');
      } else {
        setRowsPerPage(selectedOptions ? selectedOptions.value : 10);
      }
      setCurrentPage(1);
    }
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
    setCurrentPage(1);
    const yearsToFetch = selectedYears.length > 0
      ? selectedYears.map((year) => year.value)
      : [selectedAcademicYear];
    fetchRefundData(yearsToFetch, startDate, endDate);
  };

  const resetFilters = () => {
    setSelectedYears([]);
    setSelectedRefundTypes([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
    setRowsPerPage('all');
    setShowFilterPanel(false);
    fetchRefundData([selectedAcademicYear]);
  };

  const toggleFilter = () => {
    setShowFilterPanel(!showFilterPanel);
    setShowExportDropdown(false);
  };

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
    setShowFilterPanel(false);
  };

  const filteredData = refundData.filter((request) => {
    const matchesSearchTerm = searchTerm
      ? (request.admissionNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.className?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.sectionName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.refundType?.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;

    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.some((year) => request.academicYear === year.value);

    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => request.className === cls.value);

    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((sec) => request.sectionName === sec.value);

    const matchesRefundType =
      selectedRefundTypes.length === 0 ||
      selectedRefundTypes.some((refundType) => request.refundType === refundType.value);

    const matchesDateRange =
      (!startDate || new Date(request.paymentDate) >= new Date(startDate)) &&
      (!endDate || new Date(request.paymentDate) <= new Date(endDate));

    return matchesSearchTerm && matchesYear && matchesClass && matchesSection && matchesRefundType && matchesDateRange;
  });

  const totalRecords = filteredData.length;
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

  const tableFields = [
    { id: 'paymentDate', label: 'Date' },
    { id: 'admRegNumber', label: 'Adm/Reg No.' },
    { id: 'studentName', label: 'Name' },
    { id: 'className', label: 'Class' },
    { id: 'sectionName', label: 'Section' },
    { id: 'refundType', label: 'Refund Type' },
    { id: 'refundAmount', label: 'Refund Amount' },
    { id: 'paidAmount', label: 'Paid Amount' },
    { id: 'balance', label: 'Balance' },
  ];

  const getFieldValue = (request, field) => {
    const fieldId = field.id;
    if (fieldId === 'academicYear') return formatAcademicYear(request.academicYear);
    if (fieldId === 'paymentDate') return formatDate(request.paymentDate);
    if (fieldId === 'admRegNumber') return `${request.admissionNumber || ''}${request.registrationNumber || ''}`;
    if (fieldId === 'studentName') return request.studentName || '-';
    if (fieldId === 'className') return request.className || '-';
    if (fieldId === 'sectionName') return request.sectionName || '-';
    if (fieldId === 'refundType') return request.refundType || '-';
    if (fieldId === 'refundAmount') return request.refundAmount || 0;
    if (fieldId === 'paidAmount') return request.paidAmount || 0;
    if (fieldId === 'balance') return request.balance || 0;
    return request[fieldId] !== undefined && request[fieldId] !== 0 ? request[fieldId] : '-';
  };

  const totals = filteredData.reduce(
    (acc, request) => {
      const refund = parseFloat(request.refundAmount || 0);
      const paid = parseFloat(request.paidAmount || 0);
      const balance = parseFloat(request.balance || 0);
      return {
        ...acc,
        refundAmount: acc.refundAmount + refund,
        paidAmount: acc.paidAmount + paid,
        balance: acc.balance + balance,
      };
    },
    { refundAmount: 0, paidAmount: 0, balance: 0 }
  );

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
                      value={pageShowOptions.find((option) => option.value === rowsPerPage || (option.value === 'all' && rowsPerPage === refundData.length))}
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
                              if (filteredData.length === 0) {
                                toast.error('No data to export');
                                return;
                              }
                              setIsExporting(true);
                              try {
                                await exportToExcel(filteredData, tableFields, {}, getFieldValue, school);
                                toast.success('Exported to Excel successfully');
                              } catch (err) {
                                console.error('Excel export failed:', err);
                                toast.error('Export to Excel failed: ' + err.message);
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
                                await exportToPDF(filteredData, tableFields, {}, getFieldValue, school, logoSrc);
                                toast.success('Exported to PDF successfully');
                              } catch (err) {
                                console.error('PDF export failed:', err);
                                toast.error('Export to PDF failed: ' + err.message);
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

                        {activeTab === 'Refund Type' && (
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="refundType"
                                options={refundTypeOptions}
                                value={selectedRefundTypes}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Refund Types"
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

                        {activeTab === 'Date' && (
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                              <input
                                type="date"
                                className="form-control mt-2"
                                value={startDate}
                                onChange={(e) => {
                                  setStartDate(e.target.value);
                                  setCurrentPage(1);
                                }}
                                placeholder="Start Date"
                              />
                            </div>
                            <div className="col-md-4">
                              <input
                                type="date"
                                className="form-control mt-2"
                                value={endDate}
                                onChange={(e) => {
                                  setEndDate(e.target.value);
                                  setCurrentPage(1);
                                }}
                                placeholder="End Date"
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Refund Report</h2>
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
                          {tableFields.map((field) => (
                            <th key={field.id} className="text-center align-middle border border-secondary text-nowrap p-2">
                              {field.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData().map((request, index) => (
                          <tr key={`request_${index}`}>
                            {tableFields.map((field) => (
                              <td
                                key={field.id}
                                className="text-center align-middle border border-secondary text-nowrap p-2"
                              >
                                {getFieldValue(request, field)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="payroll-table-footer">
                          <td colSpan={6} className="text-right border border-secondary p-2">
                            <strong>Total</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.refundAmount}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.paidAmount}</strong>
                          </td>
                          <td className="text-center border border-secondary p-2">
                            <strong>{totals.balance}</strong>
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
                  <p>
                    No refunds match the selected filters for{' '}
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

export default FeesRefundReportStudentWise;