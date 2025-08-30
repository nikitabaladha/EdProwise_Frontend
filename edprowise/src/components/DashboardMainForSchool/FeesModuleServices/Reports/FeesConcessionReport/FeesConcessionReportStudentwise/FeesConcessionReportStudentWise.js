import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';
import { fetchSchoolData } from '../../../PdfUtlisReport';
import { exportToExcel, exportToPDF } from './ExportConcessionReport';

const FeesConcessionReportStudentWise = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Academic Year');
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
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [classSectionMap, setClassSectionMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState('all');
  const dropdownRef = useRef(null);

  const tabs = ['Academic Year', 'Class & Section', 'Installment','Fee Type' ];
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
        console.log('School data:', school, 'LogoSrc:', logoSrc);
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
        console.log('Academic years API response:', response);
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
      const sections = new Set(feeData.map(student => student.sectionName).filter(sec => sec && sec !== '-'));
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
  }, [selectedClasses, classSectionMap, feeData]);

  const fetchFeeData = async (years) => {
    setIsLoading(true);
    try {
      const promises = years.map((year) =>
        getAPI(`/get-all-studentwise-concession-report?schoolId=${schoolId}&academicYear=${year}`)
      );
      const responses = await Promise.all(promises);
      const unifiedData = responses.flatMap((res, index) => {
        if (!res?.data?.data) {
          console.warn(`No data found for year ${years[index]}`);
          return [];
        }
        return res.data.data;
      });

      console.log('Processed Data (unifiedData):', unifiedData);

      const feeTypes = responses
        .flatMap((res) => res?.data?.feeTypes || [])
        .filter((type, index, self) => self.indexOf(type) === index)
        .sort();

      const installments = unifiedData
        .flatMap((student) => student.transactions.map((t) => t.installmentName))
        .filter((name, index, self) => name && name !== 'Total' && self.indexOf(name) === index)
        .sort()
        .map((name) => ({ value: name, label: name }));

      const classes = unifiedData
        .map((student) => student.className)
        .filter((name, index, self) => name && self.indexOf(name) === index)
        .sort()
        .map((name) => ({ value: name, label: name }));

      const sections = unifiedData
        .map((student) => student.sectionName)
        .filter((name, index, self) => name && self.indexOf(name) === index)
        .sort()
        .map((name) => ({ value: name, label: name }));

      const classSectionMapping = {};
      unifiedData.forEach(student => {
        const className = student.className;
        const sectionName = student.sectionName;
        if (className && className !== '-' && sectionName && sectionName !== '-') {
          if (!classSectionMapping[className]) {
            classSectionMapping[className] = new Set();
          }
          classSectionMapping[className].add(sectionName);
        }
      });
      setClassSectionMap(classSectionMapping);

      setFeeTypes(feeTypes);
      setFeeTypeOptions(
        feeTypes.map((type) => ({
          value: type,
          label: type,
        }))
      );
      setInstallmentOptions(installments);
      setClassOptions(classes);
      setSectionOptions(sections);
      setFeeData(unifiedData);

      console.log('Unified Data:', unifiedData);

      if (rowsPerPage === 'all' && unifiedData.length > 0) {
        const totalRows = unifiedData.reduce((sum, student) => sum + student.transactions.filter(t => t.installmentName !== 'Total').length, 0);
        setRowsPerPage(totalRows);
      }
    } catch (error) {
      toast.error('Error fetching concession data: ' + error.message);
      console.error('Error fetching concession data:', error);
      setFeeData([]);
      setFeeTypes([]);
      setFeeTypeOptions([]);
      setInstallmentOptions([]);
      setClassOptions([]);
      setSectionOptions([]);
      setClassSectionMap({});
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
    } else if (name === 'feeType') {
      setSelectedFeeTypes(selected);
      setCurrentPage(1);
    } else if (name === 'installment') {
      setSelectedInstallments(selected);
      setCurrentPage(1);
    } else if (name === 'class') {
      setSelectedClasses(selected);
      setCurrentPage(1);
    } else if (name === 'section') {
      setSelectedSections(selected);
      setCurrentPage(1);
    } else if (name === 'rowsPerPage') {
      if (selectedOptions?.value === 'all') {
        const totalRows = filteredData.reduce((sum, student) => sum + student.transactions.filter(t => t.installmentName !== 'Total').length, 0);
        setRowsPerPage(totalRows || 'all');
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
    fetchFeeData(yearsToFetch);
  };

  const resetFilters = () => {
    setSelectedYears([]);
    setSelectedFeeTypes([]);
    setSelectedInstallments([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setSearchTerm('');
    setCurrentPage(1);
    setRowsPerPage('all');
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
    feeData.some((student) =>
      student.transactions.some((transaction) => {
        const key = type.replace(/\s+/g, '');
        return transaction[key] && transaction[key] !== 0;
      })
    )
  );

  const filteredData = feeData.filter((student) => {
    const matchesSearchTerm = searchTerm
      ? student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.sectionName.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.some((year) => student.academicYear === year.value);

    const matchesInstallment =
      selectedInstallments.length === 0 ||
      student.transactions.some((transaction) =>
        selectedInstallments.some((inst) => transaction.installmentName === inst.value)
      );

    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => student.className === cls.value);

    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((sec) => student.sectionName === sec.value);

    const matchesFeeType =
      selectedFeeTypes.length === 0 ||
      selectedFeeTypes.some((feeType) =>
        student.transactions.some((transaction) => {
          const key = feeType.value.replace(/\s+/g, '');
          return transaction[key] && transaction[key] !== 0;
        })
      );

    return matchesSearchTerm && matchesYear && matchesInstallment && matchesClass && matchesSection && matchesFeeType;
  });

  console.log('Filtered Data:', filteredData);

  const displayedFeeTypes = selectedFeeTypes.length > 0
    ? selectedFeeTypes.map((ft) => ft.value).filter((type) => nonZeroFeeTypes.includes(type))
    : nonZeroFeeTypes;

  const tableFields = [
    { id: 'academicYear', label: 'Academic Year' },
    { id: 'admissionNumber', label: 'Adm No.' },
    { id: 'studentName', label: 'Name' },
    { id: 'className', label: 'Class' },
    { id: 'sectionName', label: 'Section' },
    { id: 'installmentName', label: 'Installment' },
    { id: 'concessionType', label: 'Concession Type' },
    ...displayedFeeTypes.map((type) => ({
      id: type.replace(/\s+/g, ''),
      label: type.endsWith('Fee') ? `${type}s` : type,
    })),
    { id: 'Total', label: 'Total' },
  ];

  const getFieldValue = (record, field, student) => {
    const fieldId = field.id;
    if (fieldId === 'academicYear') return formatAcademicYear(student.academicYear);
    if (fieldId === 'admissionNumber') return student.admissionNumber || '-';
    if (fieldId === 'studentName') return student.studentName || '-';
    if (fieldId === 'className') return student.className || '-';
    if (fieldId === 'sectionName') return student.sectionName || '-';
    if (fieldId === 'installmentName') return record.installmentName || '-';
    if (fieldId === 'concessionType') return student.concessionType || '-';
    if (fieldId === 'Total') return record.Total || 0;
    return record[fieldId] !== undefined && record[fieldId] !== 0 ? record[fieldId] : '-';
  };

  const totalRecords = filteredData.reduce((sum, student) => sum + student.transactions.filter(t => t.installmentName !== 'Total').length, 0);
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
    let currentCount = 0;
    const result = [];
    for (const student of filteredData) {
      const transactions = student.transactions.filter((t) => t.installmentName !== 'Total');
      for (const transaction of transactions) {
        if (currentCount >= startIndex && currentCount < endIndex) {
          result.push({ student, transaction });
        }
        currentCount++;
        if (currentCount >= endIndex) break;
      }
      if (currentCount >= endIndex) break;
    }
    return result;
  };

  const studentDataArray = paginatedData();
  console.log('Student Data Array:', studentDataArray);

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
            <div className="card-body p-2">
              <div className="container">
                <div className="row p-1 border border-dark rounded" style={{ background: '#bfbfbf' }}>
                  <div className="col-md-5 col-12">
                    <input
                      type="text"
                      className="form-control border-dark"
                      placeholder="Search by admission no., name, class, or section"
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
                      value={pageShowOptions.find((option) => option.value === rowsPerPage || (option.value === 'all' && rowsPerPage === totalRecords))}
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
                                console.log('Starting Excel export with filteredData:', filteredData);
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
                                console.log('Starting PDF export with filteredData:', filteredData);
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

                        {activeTab === 'Installment' && (
                          <div className="row d-flex justify-content-center">
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
              ) : filteredData.length > 0 ? (
                <>
                  <div className="table-responsive pb-4 mt-3">
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
                        {studentDataArray.length > 0 ? (
                          studentDataArray.map(({ student, transaction }, index) => (
                            <tr key={`record_${index}`} className="payroll-table-row">
                              {tableFields.map((field) => (
                                <td
                                  key={field.id}
                                  className="text-center align-middle border border-secondary text-nowrap p-2"
                                >
                                  {getFieldValue(transaction, field, student)}
                                </td>
                              ))}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={tableFields.length} className="text-center">
                              No concessions match the selected filters for{' '}
                              {selectedYears.map((y) => formatAcademicYear(y.value)).join(', ') ||
                                formatAcademicYear(selectedAcademicYear)}.
                            </td>
                          </tr>
                        )}
                        <tr className="payroll-table-footer">
                          {tableFields.map((field) => (
                            <td
                              key={field.id}
                              className="text-center align-middle border border-secondary text-nowrap p-2"
                            >
                              {field.id === 'installmentName' ? (
                                <strong>Total</strong>
                              ) : field.id === 'academicYear' ||
                                field.id === 'admissionNumber' ||
                                field.id === 'studentName' ||
                                field.id === 'className' ||
                                field.id === 'sectionName' ||
                                field.id === 'concessionType' ? (
                                ''
                              ) : (
                                <strong>
                                  {filteredData
                                    .flatMap((student) => student.transactions)
                                    .filter((record) => record.installmentName !== 'Total')
                                    .reduce((sum, record) => {
                                      const value = record[field.id] || 0;
                                      return sum + (typeof value === 'number' ? value : 0);
                                    }, 0) || 0}
                                </strong>
                              )}
                            </td>
                          ))}
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

export default FeesConcessionReportStudentWise;