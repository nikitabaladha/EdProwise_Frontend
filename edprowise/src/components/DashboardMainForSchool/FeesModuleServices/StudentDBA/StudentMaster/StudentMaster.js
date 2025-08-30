import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import getAPI from '../../../../../api/getAPI';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from './StudentMasterExport';
import { fetchSchoolData } from '../../PdfUtlisReport';

const StudentMaster = () => {
  const headerMapping = {
    applicationDate: 'Admission Date',
    registrationNumber: 'Registration Number',
    AdmissionNumber: 'Admission Number',
    studentName: 'Student Name',
    dateOfBirth: 'Date of Birth',
    age: 'Age',
    nationality: 'Nationality',
    gender: 'Gender',
    bloodGroup: 'Blood Group',
    motherTongue: 'Mother Tongue',
    masterDefineClass: 'Class',
    section: 'Section',
    masterDefineShift: 'Shift',
    currentAddress: 'Current Address',
    country: 'Country',
    state: 'State',
    city: 'City',
    pincode: 'Pincode',
    aadharPassportNumber: 'Aadhar/Passport Number',
    studentCategory: 'Student Category',
    relationType: 'Relation Type',
    siblingName: 'Sibling Name',
    parentalStatus: 'Parental Status',
    parentContactNumber: 'Parent Contact Number',
    fatherName: 'Father Name',
    fatherContactNo: 'Father Contact No',
    fatherQualification: 'Father Qualification',
    fatherProfession: 'Father Profession',
    motherName: 'Mother Name',
    motherContactNo: 'Mother Contact No',
    motherQualification: 'Mother Qualification',
    motherProfession: 'Mother Profession',
      TCStatusDate:'Left Date',
    TCStatus: 'Status',
  
  };

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Academic Year');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [school, setSchool] = useState(null);
  const [logoSrc, setLogoSrc] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [classList, setClassList] = useState([]);
  const [classSectionMap, setClassSectionMap] = useState({});
  const [shifts, setShifts] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [tableFields] = useState(
    Object.keys(headerMapping).map((key) => ({
      id: key,
      label: headerMapping[key],
    }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState('all');
  const dropdownRef = useRef(null);
  const tabs = ['Academic Year', 'Class & Section', 'Shift', 'Status'];
  const pageShowOptions = [
    { value: 'all', label: 'All' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
  ];

  const formatAcademicYear = (year) => {
    if (!year) return 'Unknown';
    const [startYear, endYear] = year.split('-');
    return `${startYear}-${endYear?.slice(2) || 'Unknown'}`;
  };

  const formatDate = (dateString) => {
    if (!dateString || !/^\d{4}-\d{2}-\d{2}T/.test(dateString)) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
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
        console.error('Academic Years Error:', err);
      } finally {
        setLoadingYears(false);
      }
    };
    if (schoolId) {
      fetchAcademicYears();
    }
  }, [schoolId]);

  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        const { school, logoSrc } = await fetchSchoolData(schoolId);
        setSchool(school);
        setLogoSrc(logoSrc);
        console.log('School Data:', { school, logoSrc });
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
    if (Object.keys(classSectionMap).length === 0) {
      const sections = new Set(studentData.map(record => getSectionNameById(record.section)).filter(sec => sec && sec !== 'N/A'));
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
  }, [selectedClasses, classSectionMap, studentData]);

  const getClassNameById = (id) => {
    const found = classList.find((cls) => cls._id === id);
    return found ? found.className : 'N/A';
  };

  const getSectionNameById = (sectionId) => {
    if (!sectionId) return 'N/A';
    const found = classList.find((cls) => cls.sections?.some((sec) => sec._id === sectionId));
    const section = found?.sections?.find((sec) => sec._id === sectionId);
    return section ? section.name : 'N/A';
  };

  const getShiftName = (shiftId) => {
    const shift = shifts.find((s) => s._id === shiftId);
    return shift ? shift.masterDefineShiftName : 'N/A';
  };

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await getAPI(`/get-admission-form-by-acadmichistoryyear-schoolId/${schoolId}/${selectedAcademicYear}`);
      const classRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
      const shiftResponse = await getAPI(`/master-define-shift/${schoolId}`);

      let processedData = [];
      if (!response.hasError && Array.isArray(response.data.data)) {
        processedData = response.data.data.map(student => ({
          ...student,
          studentName: `${student.firstName} ${student.lastName || ''}`.trim(),
          applicationDate: formatDate(student.applicationDate),
          dateOfBirth: formatDate(student.dateOfBirth),
          TCStatusDate: formatDate(student.TCStatusDate),
        })).sort((a, b) => a.AdmissionNumber.localeCompare(b.AdmissionNumber));
        console.log('Processed Data:', processedData);
      } else {
        toast.error(response.message || 'Failed to fetch student list.');
      }

      if (!classRes.hasError && classRes.data.data) {
        setClassList(classRes.data.data);
        const classes = new Set(classRes.data.data.map(cls => cls.className).filter(cls => cls));
        setClassOptions(Array.from(classes).map(cls => ({ value: cls, label: cls })));

        const classSectionMapping = {};
        classRes.data.data.forEach(cls => {
          const className = cls.className;
          const sections = cls.sections?.map(sec => sec.name).filter(sec => sec) || [];
          if (className && sections.length > 0) {
            classSectionMapping[className] = new Set(sections);
          }
        });
        setClassSectionMap(classSectionMapping);
      } else {
        toast.error(classRes.message || 'Failed to fetch classes.');
      }

      if (!shiftResponse.hasError && Array.isArray(shiftResponse.data?.data)) {
        setShifts(shiftResponse.data.data);
        setShiftOptions(shiftResponse.data.data.map(shift => ({ value: shift.masterDefineShiftName, label: shift.masterDefineShiftName })));
      } else {
        toast.error(shiftResponse.message || 'Failed to fetch shifts.');
        setShifts([]);
      }

      const statuses = new Set(processedData.map(student => student.TCStatus).filter(status => status));
      setStatusOptions(Array.from(statuses).map(status => ({ value: status, label: status })));

      setStudentData(processedData);

      if (rowsPerPage === 'all' && processedData.length > 0) {
        setRowsPerPage(processedData.length);
      }
    } catch (err) {
      toast.error('Error fetching student data.');
      console.error('Student Fetch Error:', err);
      setStudentData([]);
      setClassOptions([]);
      setSectionOptions([]);
      setShiftOptions([]);
      setStatusOptions([]);
      setClassSectionMap({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!schoolId || !selectedAcademicYear) return;
    fetchStudents();
  }, [schoolId, selectedAcademicYear]);

  const handleSelectChange = (selectedOptions, { name }) => {
    const selected = selectedOptions || [];
    if (name === 'academicYear') {
      const selectedYear = selectedOptions?.value || '';
      setSelectedAcademicYear(selectedYear);
      localStorage.setItem('selectedAcademicYear', selectedYear);
      setCurrentPage(1);
    } else if (name === 'class') {
      setSelectedClasses(selected);
      setCurrentPage(1);
    } else if (name === 'section') {
      setSelectedSections(selected);
      setCurrentPage(1);
    } else if (name === 'shift') {
      setSelectedShifts(selected);
      setCurrentPage(1);
    } else if (name === 'status') {
      setSelectedStatuses(selected);
      setCurrentPage(1);
    } else if (name === 'rowsPerPage') {
      if (selectedOptions?.value === 'all') {
        setRowsPerPage(studentData.length || 'all');
      } else {
        setRowsPerPage(selectedOptions ? selectedOptions.value : 10);
      }
      setCurrentPage(1);
    }
  };

  const resetFilters = () => {
    setSelectedClasses([]);
    setSelectedSections([]);
    setSelectedShifts([]);
    setSelectedStatuses([]);
    setSearchTerm('');
    setCurrentPage(1);
    setRowsPerPage('all');
    const storedYear = localStorage.getItem('selectedAcademicYear');
    if (storedYear) {
      setSelectedAcademicYear(storedYear);
    }
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
    setShowExportDropdown(false);
  };

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
    setShowFilterPanel(false);
  };

  const getFieldValue = (record, field) => {
    const fieldId = field.id;
    if (fieldId === 'studentName') {
      return record.studentName || '-';
    } else if (fieldId === 'masterDefineClass') {
      return getClassNameById(record[fieldId]) || '-';
    } else if (fieldId === 'section') {
      return getSectionNameById(record[fieldId]) || '-';
    } else if (fieldId === 'masterDefineShift') {
      return getShiftName(record[fieldId]) || '-';
    } else if (fieldId === 'applicationDate' || fieldId === 'dateOfBirth') {
      return record[fieldId] || '-';
    } else {
      return record[fieldId] || '-';
    }
  };

  const filteredData = studentData.filter((record) => {
    const matchesSearchTerm = searchTerm
      ? Object.values(record).some((value) =>
          value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;
    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => getClassNameById(record.masterDefineClass) === cls.value);
    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((sec) => getSectionNameById(record.section) === sec.value);
    const matchesShift =
      selectedShifts.length === 0 ||
      selectedShifts.some((shift) => getShiftName(record.masterDefineShift) === shift.value);
    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.some((status) => record.TCStatus === status.value);
    return matchesSearchTerm && matchesClass && matchesSection && matchesShift && matchesStatus;
  });

  console.log('Filtered Data:', filteredData);

  const studentDataArray = filteredData.sort((a, b) => a.AdmissionNumber.localeCompare(b.AdmissionNumber));

  console.log('Student Data Array:', studentDataArray);

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

  return (
    <div className="container">
      <style>
        {`
          .payroll-table-header {
            font-weight: 700;
            background-color: #f0f0f0;
          }
        `}
      </style>
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
                  <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
                    <Select
                      isClearable
                      name="rowsPerPage"
                      placeholder="Show"
                      options={pageShowOptions}
                      value={pageShowOptions.find((option) => option.value === rowsPerPage || (option.value === 'all' && rowsPerPage === studentDataArray.length))}
                      onChange={(selected, action) => handleSelectChange(selected, action)}
                      className="email-select border border-dark me-lg-2"
                    />
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
                              if (filteredData.length === 0) {
                                toast.error('No data to export');
                                return;
                              }
                              setIsExporting(true);
                              try {
                                console.log('Exporting to Excel with:', { filteredData, tableFields, selectedAcademicYear, school, logoSrc });
                                await exportToExcel(
                                  filteredData,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  null,
                                  null,
                                  formatAcademicYear,
                                  selectedAcademicYear
                                );
                                toast.success('Exported to Excel successfully');
                              } catch (err) {
                                console.error('Excel Export Error:', err);
                                toast.error(`Export to Excel failed: ${err.message || 'Unknown error'}`);
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
                                console.log('Exporting to PDF with:', { filteredData, tableFields, selectedAcademicYear, school, logoSrc });
                                await exportToPDF(
                                  filteredData,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  null,
                                  null,
                                  formatAcademicYear,
                                  selectedAcademicYear,
                                  school,
                                  logoSrc
                                );
                                toast.success('Exported to PDF successfully');
                              } catch (err) {
                                console.error('PDF Export Error:', err);
                                toast.error(`Export to PDF failed: ${err.message || 'Unknown error'}`);
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
                        {activeTab === 'Shift' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="shift"
                                options={shiftOptions}
                                value={selectedShifts}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Shifts"
                                className="mt-2"
                              />
                            </div>
                          </div>
                        )}
                        {activeTab === 'Status' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                isMulti
                                name="status"
                                options={statusOptions}
                                value={selectedStatuses}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Statuses"
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
                        <button className="btn btn-primary" onClick={() => setShowFilterPanel(false)}>
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Student Master Report</h2>
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
                <>
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
                        {paginatedData().length > 0 ? (
                          paginatedData().map((record, index) => (
                            <tr
                              key={`${record.AdmissionNumber}_${record.academicYear}_${index}`}
                              className="payroll-table-row"
                            >
                              {tableFields.map((field) => (
                                <td
                                  key={field.id}
                                  className="text-center align-middle border border-secondary text-nowrap p-2"
                                >
                                  {getFieldValue(record, field)}
                                </td>
                              ))}
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

export default StudentMaster;