import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';
import { fetchSchoolData } from '../../../PdfUtlisReport';
import { exportToExcel, exportToPDF } from './ExportConcessionReport';

const ConcessionReport = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Date');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [school, setSchool] = useState(null);
  const [logoSrc, setLogoSrc] = useState('');
  const [feeData, setFeeData] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [feeTypeOptions, setFeeTypeOptions] = useState([]);
  const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [selectedYears, setSelectedYears] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const dropdownRef = useRef(null);

  const tabs = ['Date', 'Fee Type', 'Academic Year'];

  const formatAcademicYear = (year) => {
    if (!year) return '-';
    const [startYear, endYear] = year.split('-');
    return `${startYear}-${endYear?.slice(-2) || ''}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === '-') return '-';
    const [day, month, year] = dateStr.split('/');
    return `${day}-${month}-${year}`;
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
        getAPI(`/get-all-Ddatewise-concession-report?schoolId=${schoolId}&academicYear=${year}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`)
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
      setFeeTypeOptions(
        allFeeTypes.map((type) => ({
          value: type,
          label: type,
        }))
      );
      setFeeData(unifiedData);
    } catch (error) {
      toast.error('Error fetching concession data: ' + error.message);
      setFeeData([]);
      setFeeTypes([]);
      setFeeTypeOptions([]);
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
  }, [schoolId, selectedAcademicYear, selectedYears, startDate, endDate]);

  const handleSelectChange = (selectedOptions, { name }) => {
    const selected = selectedOptions || [];
    if (name === 'academicYear') {
      setSelectedYears(selected);
    } else if (name === 'feeType') {
      setSelectedFeeTypes(selected);
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
    setSelectedFeeTypes([]);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
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

  const nonZeroFeeTypes = feeTypes.filter((type) =>
    feeData.some((row) => {
      const key = type.replace(/\s+/g, '');
      return row[key] && row[key] !== 0;
    })
  );

  const filteredData = feeData.filter((row) => {
    const matchesSearchTerm = searchTerm
      ? (row.date || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        (row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase())
      : true;

    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.some((year) => row.academicYear === year.value);

    const matchesDate =
      (!startDate && !endDate) ||
      (() => {
        if (!row.date || row.date === '-') return false;
        const recordDate = new Date(row.date.split('/').reverse().join('-'));
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || recordDate >= start) && (!end || recordDate <= end);
      })();

    const matchesFeeType =
      selectedFeeTypes.length === 0 ||
      selectedFeeTypes.some((feeType) => {
        const key = feeType.value.replace(/\s+/g, '');
        return row[key] && row[key] !== 0;
      });

    return matchesSearchTerm && matchesYear && matchesDate && matchesFeeType;
  });

  const groupedByStudent = filteredData.reduce((acc, row) => {
    const admissionNumber = row.admissionNumber;
    if (!acc[admissionNumber]) {
      acc[admissionNumber] = {
        studentName: row.studentName,
        admissionNumber: row.admissionNumber,
        className: row.className,
        sectionName: row.sectionName,
        academicYear: row.academicYear,
        transactions: [],
      };
    }
    acc[admissionNumber].transactions.push(row);
    return acc;
  }, {});

  const studentDataArray = Object.keys(groupedByStudent)
    .map((admissionNumber) => ({
      admissionNumber,
      ...groupedByStudent[admissionNumber],
      transactions: groupedByStudent[admissionNumber].transactions.sort((a, b) => {
        if (a.date === '-' || b.date === '-') return 0;
        return (
          new Date(a.date.split('/').reverse().join('-')).getTime() -
          new Date(b.date.split('/').reverse().join('-')).getTime()
        );
      }),
    }))
    .sort((a, b) => a.admissionNumber.localeCompare(b.admissionNumber));

  const displayedFeeTypes = selectedFeeTypes.length > 0
    ? selectedFeeTypes.map((ft) => ft.value).filter((type) => nonZeroFeeTypes.includes(type))
    : nonZeroFeeTypes;

  const headerMapping = displayedFeeTypes.reduce((acc, type) => {
    const key = type.replace(/\s+/g, '');
    acc[key] = type.endsWith('Fee') ? `${type}s` : type;
    return acc;
  }, { date: 'Date', Total: 'Total' });

  const tableFields = [
    { id: 'date', label: 'Date' },
    ...displayedFeeTypes.map((type) => ({
      id: type.replace(/\s+/g, ''),
      label: headerMapping[type.replace(/\s+/g, '')] || type,
    })),
    { id: 'Total', label: 'Total' },
  ];

  const getFieldValue = (record, field) => {
    const fieldId = field.id;
    if (fieldId === 'date') {
      return formatDate(record[fieldId]) || '-';
    }
    return record[fieldId] || 0;
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
                      placeholder="Search by date, admission no., or name"
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
                              if (studentDataArray.length === 0) {
                                toast.error('No data to export');
                                return;
                              }
                              setIsExporting(true);
                              try {
                                await exportToExcel(studentDataArray, tableFields, headerMapping, getFieldValue, school);
                                toast.success('Exported to Excel successfully');
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
                              if (studentDataArray.length === 0) {
                                toast.error('No data to export');
                                return;
                              }
                              setIsExporting(true);
                              try {
                                await exportToPDF(studentDataArray, tableFields, headerMapping, getFieldValue, school, logoSrc);
                                toast.success('Exported to PDF successfully');
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Concession Report</h2>
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
                <div className="table-responsive pb-4 mt-3">
                  {studentDataArray.map((student, studentIndex) => {
                    const totals = tableFields.reduce((acc, field) => {
                      if (field.id === 'date') {
                        acc[field.id] = 'Total';
                      } else {
                        acc[field.id] = student.transactions.reduce((sum, record) => sum + (Number(record[field.id]) || 0), 0);
                      }
                      return acc;
                    }, {});
                    return (
                      <React.Fragment key={studentIndex}>
                        <table className="table text-dark border border-secondary mb-4">
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
                            {student.transactions.map((record, index) => (
                              <tr key={`record_${studentIndex}_${index}`}>
                                {tableFields.map((field) => (
                                  <td key={field.id} className="text-center align-middle border border-secondary text-nowrap p-2">
                                    {getFieldValue(record, field)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                            <tr className="payroll-table-row">
                              {tableFields.map((field) => (
                                <td
                                  key={field.id}
                                  className="text-center align-middle border border-secondary text-nowrap p-2"
                                  style={{ fontWeight: '700' }}
                                >
                                  {totals[field.id]}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </React.Fragment>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center mt-3">
                  <p>
                    No concessions match the selected filters for{' '}
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

export default ConcessionReport;