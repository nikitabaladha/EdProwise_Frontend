import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';

const StudentWiseFeesDueReport = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('Date');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const tabs = ['Date', 'Payment Mode', 'Class & Section', 'Academic Year', 'Installment', 'Type of Fees'];

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

  // Fetch academic years
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
        getAPI(`/get-all-data-school-fees?schoolId=${schoolId}&academicYear=${year}`)
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
    } else if (name === 'paymentMode') {
      setSelectedPaymentModes(selected);
    } else if (name === 'class') {
      setSelectedClasses(selected);
    } else if (name === 'section') {
      setSelectedSections(selected);
    } else if (name === 'feeType') {
      setSelectedFeeTypes(selected);
    } else if (name === 'installment') {
      setSelectedInstallments(selected);
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
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setShowFilterPanel(false);
    fetchFeeData([selectedAcademicYear]);
  };

  const toggleFilter = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  // Flatten and filter data
  const filteredData = feeData
    .flatMap((student) =>
      student.installments.map((installment) => ({
        ...installment,
        admissionNumber: student.admissionNumber,
        studentName: student.studentName,
        className: student.className,
        sectionName: student.sectionName,
        academicYear: student.academicYear,
      }))
    )
    .filter((row) => {
      const matchesSearchTerm = searchTerm
        ? (row.paymentDate || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
          (row.admissionNumber || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
          (row.studentName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
          (row.className || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
          (row.sectionName || '').toLowerCase().includes(String(searchTerm).toLowerCase()) ||
          (row.installmentName || '').toLowerCase().includes(String(searchTerm).toLowerCase())
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
          if (!row.paymentDate || row.paymentDate === '-') return false;
          const recordDate = new Date(row.paymentDate.split('/').reverse().join('-'));
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;
          return (!start || recordDate >= start) && (!end || recordDate <= end);
        })();

      const matchesFeeType =
        selectedFeeTypes.length === 0 ||
        selectedFeeTypes.some((type) => (row.feeTypes[type.value] || 0) > 0);

      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => row.className === cls.value);

      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => row.sectionName === sec.value);

      const matchesInstallment =
        selectedInstallments.length === 0 ||
        selectedInstallments.some((inst) => row.installmentName === inst.value);

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

  // Group data by paymentDate
  const groupedData = filteredData.reduce((acc, row) => {
    const date = row.paymentDate || '-';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(row);
    return acc;
  }, {});

  // Convert grouped data to array and sort by paymentDate
  const groupedDataArray = Object.keys(groupedData)
    .map((date) => ({
      paymentDate: date,
      rows: groupedData[date].sort((a, b) =>
        a.admissionNumber.localeCompare(b.admissionNumber) ||
        a.installmentName.localeCompare(b.installmentName)
      ),
    }))
    .sort((a, b) => {
      if (a.paymentDate === '-' || b.paymentDate === '-') return 0;
      return new Date(a.paymentDate.split('/').reverse().join('-')) -
             new Date(b.paymentDate.split('/').reverse().join('-'));
    });

  // Calculate totals
  const totals = filteredData.reduce(
    (acc, row) => {
      acc.totalFeesDue += row.feesDue || 0;
      acc.totalFeesPaid += row.feesPaid || 0;
      acc.totalConcession += row.concession || 0;
      acc.totalBalance += row.balance || 0;
      return acc;
    },
    { totalFeesDue: 0, totalFeesPaid: 0, totalConcession: 0, totalBalance: 0 }
  );

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
                      placeholder="Search by date, admission no., name, class, section, or installment"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-5 px-0 d-flex align-items-center justify-content-end">
                    <div
                      className="py-1 px-2 mr-2 border border-dark finance-filter-icon"
                      style={{ cursor: 'pointer' }}
                      onClick={toggleFilter}
                    >
                      <FaFilter />
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
                          <div className="row d-lg-flex justify-content-center">
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Student-Wise Fees Due Report</h2>
                </div>
              </div>

              {isLoading || loadingYears ? (
                <div className="text-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Loading data...</p>
                </div>
              ) : groupedDataArray.length > 0 ? (
                <div className="table-responsive pb-4 mt-3">
                  <table className="table text-dark border border-secondary mb-1">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Date</th>
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Academic Year</th>
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Admission No.</th>
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Name</th>
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Class</th>
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Section</th>
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Installment</th>
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Fees Due</th>
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Fees Paid</th>
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Concession</th>
                        <th className="text-center align-middle border border-secondary text-nowrap p-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedDataArray.map((group, groupIndex) =>
                        group.rows.map((record, rowIndex) => (
                          <tr key={`${record.admissionNumber}_${record.installmentName}_${groupIndex}_${rowIndex}`}>
                            {rowIndex === 0 && (
                              <td
                                className="text-center align-middle border border-secondary text-nowrap p-2"
                                rowSpan={group.rows.length}
                              >
                                {record.paymentDate || '-'}
                              </td>
                            )}
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
                              {record.feesDue || 0}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.feesPaid || 0}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.concession || 0}
                            </td>
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {record.balance || 0}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="payroll-table-footer">
                        <td colSpan={7} className="text-right border border-secondary p-2">
                          <strong>Total</strong>
                        </td>
                        <td className="text-center border border-secondary p-2">
                          <strong>{totals.totalFeesDue || 0}</strong>
                        </td>
                        <td className="text-center border border-secondary p-2">
                          <strong>{totals.totalFeesPaid || 0}</strong>
                        </td>
                        <td className="text-center border border-secondary p-2">
                          <strong>{totals.totalConcession || 0}</strong>
                        </td>
                        <td className="text-center border border-secondary p-2">
                          <strong>{totals.totalBalance || 0}</strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="text-center mt-3">
                  <p>No paid installments match the selected filters for{' '}
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

export default StudentWiseFeesDueReport;