import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../api/getAPI';
import { fetchSchoolData } from '../../PdfUtlisReport';
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
  const [feeTypes, setFeeTypes] = useState([]);
  const [feeTypeOptions, setFeeTypeOptions] = useState([]);
  const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
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
  const dropdownRef = useRef(null);

  const tabs = ['Date', 'Fee Type', 'Class & Section', 'Academic Year'];

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

  const fetchRefundData = async (years, startDate, endDate) => {
    setIsLoading(true);
    try {
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
        setFeeTypes([]);
        setFeeTypeOptions([]);
        setClassOptions([]);
        setSectionOptions([]);
        return;
      }

      const unifiedData = response.data.data;
      const feeTypes = response.data.feeTypes || [];
      const classes = [...new Set(unifiedData.map((request) => request.className))]
        .filter(Boolean)
        .sort()
        .map((name) => ({ value: name, label: name }));
      const sections = [...new Set(unifiedData.map((request) => request.sectionName))]
        .filter(Boolean)
        .sort()
        .map((name) => ({ value: name, label: name }));

      setFeeTypes(feeTypes);
      setFeeTypeOptions(feeTypes.map((type) => ({ value: type, label: type })));
      setClassOptions(classes);
      setSectionOptions(sections);
      setRefundData(unifiedData);
      console.log('Fetched Refund Data:', unifiedData);
    } catch (error) {
      toast.error('Error fetching refund data: ' + error.message);
      console.error('Error fetching refund data:', error);
      setRefundData([]);
      setFeeTypes([]);
      setFeeTypeOptions([]);
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
    } else if (name === 'feeType') {
      setSelectedFeeTypes(selected);
    } else if (name === 'class') {
      setSelectedClasses(selected);
    } else if (name === 'section') {
      setSelectedSections(selected);
    }
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
    const yearsToFetch = selectedYears.length > 0
      ? selectedYears.map((year) => year.value)
      : [selectedAcademicYear];
    fetchRefundData(yearsToFetch, startDate, endDate);
  };

  const resetFilters = () => {
    setSelectedYears([]);
    setSelectedFeeTypes([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
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

  const nonZeroFeeTypes = feeTypes.filter((type) =>
    refundData.some((request) => {
      const key = type.replace(/\s+/g, '');
      return request[key] && request[key] !== 0;
    })
  );

  const filteredData = refundData.filter((request) => {
    const matchesSearchTerm = searchTerm
      ? (request.admissionNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.className?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         request.sectionName?.toLowerCase().includes(searchTerm.toLowerCase()))
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

    const matchesFeeType =
      selectedFeeTypes.length === 0 ||
      selectedFeeTypes.some((feeType) => {
        const key = feeType.value.replace(/\s+/g, '');
        return request[key] && request[key] !== 0;
      });

    const matchesDateRange =
      (!startDate || new Date(request.paymentDate) >= new Date(startDate)) &&
      (!endDate || new Date(request.paymentDate) <= new Date(endDate));

    return matchesSearchTerm && matchesYear && matchesClass && matchesSection && matchesFeeType && matchesDateRange;
  });

  console.log('Filtered Data:', filteredData);

  const displayedFeeTypes = selectedFeeTypes.length > 0
    ? selectedFeeTypes.map((ft) => ft.value).filter((type) => nonZeroFeeTypes.includes(type))
    : nonZeroFeeTypes;

  const tableFields = [
    { id: 'paymentDate', label: 'Date' },
    { id: 'admRegNumber', label: 'Adm/Reg No.' },
    { id: 'studentName', label: 'Name' },
    { id: 'className', label: 'Class' },
    { id: 'sectionName', label: 'Section' },
    { id: 'refundType', label: 'Refund Type' },
    ...displayedFeeTypes.map((type) => ({
      id: type.replace(/\s+/g, ''),
      label: type.endsWith('Fee') ? `${type}s` : type,
    })),
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

  // Calculate totals for fee types, refundAmount, paidAmount, and balance
  const totals = filteredData.reduce(
    (acc, request) => {
      const refund = parseFloat(request.refundAmount || 0);
      const paid = parseFloat(request.paidAmount || 0);
      const balance = parseFloat(request.balance || 0);
      const feeTypeTotals = {};
      displayedFeeTypes.forEach((type) => {
        const key = type.replace(/\s+/g, '');
        feeTypeTotals[key] = (acc[key] || 0) + (parseFloat(request[key] || 0));
      });
      return {
        ...acc,
        ...feeTypeTotals,
        refundAmount: acc.refundAmount + refund,
        paidAmount: acc.paidAmount + paid,
        balance: acc.balance + balance,
      };
    },
    { ...displayedFeeTypes.reduce((acc, type) => ({ ...acc, [type.replace(/\s+/g, '')]: 0 }), {}), refundAmount: 0, paidAmount: 0, balance: 0 }
  );

  return (
    <div className="container">
      <style>
        {`
          .total-row {
            font-weight: 700 !important;
            background-color: #f0f0f0;
          }
          .total-row td {
            font-weight: 700 !important;
          }
          .payroll-table-footer {
            font-weight: 700 !important;
            background-color: #f0f0f0;
          }
          .payroll-table-footer td {
            font-weight: 700 !important;
          }
        `}
      </style>
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

                        {activeTab === 'Fee Type' && (
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="feeType"
                                options={feeTypeOptions}
                                value={selectedFeeTypes}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Fee Types"
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

                        {activeTab === 'Date' && (
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                              <input
                                type="date"
                                className="form-control mt-2"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="Start Date"
                              />
                            </div>
                            <div className="col-md-4">
                              <input
                                type="date"
                                className="form-control mt-2"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
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
              ) : filteredData.length > 0 ? (
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
                      {filteredData.map((request, index) => (
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
                        {displayedFeeTypes.map((type) => (
                          <td key={type.replace(/\s+/g, '')} className="text-center border border-secondary p-2">
                            <strong>{totals[type.replace(/\s+/g, '')] || 0}</strong>
                          </td>
                        ))}
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