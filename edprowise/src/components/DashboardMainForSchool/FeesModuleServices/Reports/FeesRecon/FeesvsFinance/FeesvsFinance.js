import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';
import { exportToExcel, exportToPDF } from './ExportModal';
import { fetchSchoolData } from '../../../PdfUtlisReport';


const FeesRecon = () => {
  const headerMapping = {
    feesTypeName: 'Particulars',
    feesModuleAmount: 'As per Fees Module',
    financeModuleAmount: 'As per Finance Module',
    difference: 'Difference',
  };

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Academic Year');
  const [schoolId, setSchoolId] = useState('');
  const [feeData, setFeeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [school, setSchool] = useState(null);
  const [logoSrc, setLogoSrc] = useState('');
  const [tableFields] = useState(
    Object.keys(headerMapping).map((key) => ({
      id: key,
      label: headerMapping[key],
    }))
  );
  const dropdownRef = useRef(null);
  const tabs = ['Academic Year'];

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
    const fetchFeesData = async () => {
      setIsLoading(true);
      try {
        const response = await getAPI(`/get-fees-vs-finance/${schoolId}/${selectedAcademicYear}`);
        if (!response?.data?.data) {
          throw new Error('No fees structure data found');
        }

        const structures = response.data.data;
        const feeTypeTotals = {};

        structures.forEach((structure) => {
          structure.installments.forEach((installment) => {
            installment.fees.forEach((fee) => {
              const feeTypeName = fee.feesTypeId?.feesTypeName || 'Unknown';
              if (!feeTypeTotals[feeTypeName]) {
                feeTypeTotals[feeTypeName] = {
                  feesModuleAmount: 0,
                  financeModuleAmount: 0,
                };
              }
              feeTypeTotals[feeTypeName].feesModuleAmount += fee.amount || 0;
            });
          });
        });

        const unifiedData = Object.keys(feeTypeTotals).map((feesTypeName) => ({
          feesTypeName,
          feesModuleAmount: feeTypeTotals[feesTypeName].feesModuleAmount,
          financeModuleAmount: 0,
          difference: feeTypeTotals[feesTypeName].feesModuleAmount - 0,
        }));

        unifiedData.sort((a, b) => a.feesTypeName.localeCompare(b.feesTypeName));

        setFeeData(unifiedData);
        setFilteredData(unifiedData); 
      } catch (error) {
        toast.error('Error fetching fees data: ' + error.message);
        setFeeData([]);
        setFilteredData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeesData();
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
    const filtered = feeData.filter((record) =>
      searchTerm
        ? record.feesTypeName.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );
    setFilteredData(filtered);
  }, [searchTerm, feeData]);

  const totals = filteredData.reduce(
    (acc, record) => ({
      feesModuleAmount: acc.feesModuleAmount + record.feesModuleAmount,
      financeModuleAmount: acc.financeModuleAmount + record.financeModuleAmount,
      difference: acc.difference + record.difference,
    }),
    { feesModuleAmount: 0, financeModuleAmount: 0, difference: 0 }
  );

  const handleSelectChange = (selectedOptions, { name }) => {
    if (name === 'academicYear') {
      const selectedYear = selectedOptions?.value || '';
      setSelectedAcademicYear(selectedYear);
      localStorage.setItem('selectedAcademicYear', selectedYear);
      setSearchTerm(''); // Reset search term when academic year changes
    }
  };

  const resetFilters = () => {
    const storedYear = localStorage.getItem('selectedAcademicYear');
    if (storedYear) {
      setSelectedAcademicYear(storedYear);
    } else {
      setSelectedAcademicYear(academicYears[academicYears.length - 1] || '');
    }
    setSearchTerm('');
    setFilteredData(feeData);
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
    setShowExportDropdown(false);
  };

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
    setShowFilterPanel(false);
  };

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
                      placeholder="Search by Particulars"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
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
                        className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
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
                                await exportToExcel(filteredData, tableFields, headerMapping, totals, formatAcademicYear, selectedAcademicYear,school,logoSrc);
                              } catch (err) {
                                toast.error('Export to Excel failed');
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
                                await exportToPDF(filteredData, tableFields, headerMapping, totals, formatAcademicYear, selectedAcademicYear, school,logoSrc);
                              } catch (err) {
                                toast.error('Export to PDF failed');
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Fees vs Finance Reconciliation Report</h2>
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
                            {headerMapping[field.id]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((record, index) => (
                          <tr key={`${record.feesTypeName}_${index}`} className="payroll-table-row">
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.feesTypeName}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.feesModuleAmount.toFixed(2)}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.financeModuleAmount.toFixed(2)}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.difference.toFixed(2)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={tableFields.length} className="text-center">
                            No data matches the selected filters for {formatAcademicYear(selectedAcademicYear)}.
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="payroll-table-footer">
                        <td className="text-right border border-secondary p-2">
                          <strong>Total</strong>
                        </td>
                        <td className="text-center border border-secondary p-2">
                          <strong>{totals.feesModuleAmount.toFixed(2)}</strong>
                        </td>
                        <td className="text-center border border-secondary p-2">
                          <strong>{totals.financeModuleAmount.toFixed(2)}</strong>
                        </td>
                        <td className="text-center border border-secondary p-2">
                          <strong>{totals.difference.toFixed(2)}</strong>
                        </td>
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

export default FeesRecon;