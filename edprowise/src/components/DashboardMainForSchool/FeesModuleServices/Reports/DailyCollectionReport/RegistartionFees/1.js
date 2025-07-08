import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import getAPI from '../../../../../../api/getAPI';
import SettingsModal from './Settings';
import { Link } from 'react-router-dom';

const RegistartionFees = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('Date');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [paymentModes, setPaymentModes] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [tableFields, setTableFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [selectedPaymentModes, setSelectedPaymentModes] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const tabs = ['Date', 'Payment Mode', 'Class', 'Section', 'Academic Year'];

  const headerMapping = {
    regFeesDate: 'Date',
    academicYear: 'Academic Year',
    regNo: 'Reg No.',
    studentName: 'Name',
    class: 'Class',
    section: 'Section',
    regFeesPaymentMode: 'Payment Mode',
    regFeesTransactionNo: 'Cheque No./Transaction No.',
    regFeesReceiptNo: 'Receipts No.',
    regFeesDue: 'Fees Due',
    regFeesPaid: 'Fees Paid',
    regFeesConcession: 'Concession',
  };

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
  }, [schoolId, selectedAcademicYear]);

  useEffect(() => {
    if (!schoolId || !selectedAcademicYear) return;

    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const fieldsRes = await getAPI(`/get-tab/${schoolId}/DailyCollectionRegistartionFees`, {}, true);
        if (!fieldsRes.hasError && fieldsRes.data?.data?.inFields) {
          setTableFields(fieldsRes.data?.data?.inFields || []);
        } else {
          toast.warn('No table fields received from API. Please configure in settings.');
          setTableFields([]);
        }

        const feeDataRes = await getAPI(`/get-all-data?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`);
        if (!feeDataRes?.data) {
          throw new Error('No fee data found');
        }

        const unifiedData = [];
        const processedKeys = new Set();

        const validYears = academicYears.filter((year) => {
          const [startYear] = year.split('-').map(Number);
          const [selectedStartYear] = selectedAcademicYear.split('-').map(Number);
          return startYear <= selectedStartYear;
        });

        Object.keys(feeDataRes.data.data || {}).forEach((year) => {
          if (!validYears.includes(year)) return;
          feeDataRes.data.data[year].forEach((record) => {
            const regNo = record.student.regNo;
            const key = `${record.student.admissionNo}_${regNo}_${year}`;

            if (!processedKeys.has(key)) {
              unifiedData.push({
                ...record,
                academicYear: year,
                className: record.className || '-',
                sectionName: record.sectionName || '-',
                shiftName: record.shiftName || '-',
              });
              processedKeys.add(key);
            }
          });
        });

        feeDataRes.data.admissionDetails.forEach((adm) => {
          const regNo = adm.registrationNumber;
          const admissionNo = adm.AdmissionNumber || '-';
          const studentName = `${adm.firstName} ${adm.lastName}`.trim();
          const defaultAcademicYear = selectedAcademicYear;
          const key = `${admissionNo}_${regNo}_${defaultAcademicYear}`;

          if (!processedKeys.has(key) && parseFloat(adm.regFeesDue || 0) === 0) {
            unifiedData.push({
              academicYear: defaultAcademicYear,
              className: '-',
              sectionName: '-',
              shiftName: '-',
              feeInstallments: [],
              finePolicy: null,
              concession: null,
              paidInstallments: [],
              totals: {
                totalFeesAmount: 0,
                totalConcession: 0,
                totalFine: 0,
                totalFeesPayable: 0,
                totalPaidAmount: 0,
                totalRemainingAmount: 0,
              },
              installmentsPresent: [],
              student: {
                admissionNo,
                regNo,
                studentName,
                dateOfBirth: '-',
                age: '-',
                nationality: '-',
                gender: '-',
                bloodGroup: '-',
                currentAddress: '-',
                state: '-',
                pincode: '-',
                parentContactNo: '-',
                motherTongue: '-',
                previousSchool: '-',
                previousSchoolBoard: '-',
                aadharPassportNo: '-',
                category: '-',
                relationTypeWithSibling: '-',
                siblingName: '-',
                parentalStatus: '-',
                fatherName: '-',
                fatherMobileNo: '-',
                fatherQualification: '-',
                motherName: '-',
                motherMobileNo: '-',
                motherQualification: '-',
                fatherProfession: '-',
                motherProfession: '-',
                status: '-',
                admFeesDate: adm.regFeesDate || '-',
                admFeesReceiptNo: adm.regFeesReceiptNo || '-',
                admFeesPaymentMode: adm.regFeesPaymentMode || '-',
                admFeesTransactionNo: adm.regFeesTransactionNo || '-',
                admFeesDue: adm.regFeesDue || '0',
                admFeesConcession: adm.regFeesConcession || '0',
                admFeesPaid: adm.regFeesPaid || '0',
                regFeesDate: adm.regFeesDate || '-',
                regFeesPaymentMode: adm.regFeesPaymentMode || '-',
                regFeesDue: adm.regFeesDue || '0',
                regFeesConcession: adm.regFeesConcession || '0',
                regFeesPaid: adm.regFeesPaid || '0',
                regFeesChequeNumber: '-',
                regFeesBankName: '-',
                regFeesTransactionNo: adm.regFeesTransactionNo || '-',
                regFeesReceiptNo: adm.regFeesReceiptNo || '-',
                tcNo: '-',
                tcFeesDate: '-',
                tcFeesReceiptNo: '-',
                tcFeesPaymentMode: '-',
                tcFeesTransactionNo: '-',
                tcFeesDue: '0',
                tcFeesConcession: '0',
                tcFeesPaid: '0',
                boardExamFeesDue: '0',
                boardExamFeesDate: '-',
                boardExamFeesReceiptNo: '-',
                boardExamFeesPaymentMode: '-',
                boardExamFeesTransactionNo: '-',
                boardExamFeesConcession: '0',
                boardExamFeesPaid: '0',
                boardRegFeesDue: '0',
                boardRegFeesDate: '-',
                boardRegFeesReceiptNo: '-',
                boardRegFeesPaymentMode: '-',
                boardRegFeesTransactionNo: '-',
                boardRegFeesConcession: '0',
                boardRegFeesPaid: '0',
              },
            });
            processedKeys.add(key);
          }
        });

        unifiedData.sort((a, b) => {
          const admNoA = a.student.admissionNo || '-';
          const admNoB = b.student.admissionNo || '-';
          if (admNoA === admNoB) {
            return a.academicYear.localeCompare(b.academicYear);
          }
          return admNoA.localeCompare(admNoB);
        });

        setFeeData(unifiedData);

        const modes = new Set();
        unifiedData.forEach((record) => {
          record.paidInstallments?.forEach((pi) => pi.paymentMode && modes.add(pi.paymentMode));
          if (record.student?.regFeesPaymentMode) modes.add(record.student.regFeesPaymentMode);
          if (record.student?.tcFeesPaymentMode) modes.add(record.student.tcFeesPaymentMode);
          if (record.student?.boardExamFeesPaymentMode) modes.add(record.student.boardExamFeesPaymentMode);
          if (record.student?.boardRegFeesPaymentMode) modes.add(record.student.boardRegFeesPaymentMode);
        });
        setPaymentModes(
          Array.from(modes)
            .filter((mode) => mode && mode !== '-')
            .map((mode) => ({ value: mode, label: mode }))
        );

        const classes = new Set(unifiedData.map((record) => record.className).filter((cls) => cls && cls !== '-'));
        setClassOptions(
          Array.from(classes).map((cls) => ({ value: cls, label: cls }))
        );

        const sections = new Set(unifiedData.map((record) => record.sectionName).filter((sec) => sec && sec !== '-'));
        setSectionOptions(
          Array.from(sections).map((sec) => ({ value: sec, label: sec }))
        );
      } catch (error) {
        toast.error('Error initializing data: ' + error.message);
        setFeeData([]);
        setPaymentModes([]);
        setClassOptions([]);
        setSectionOptions([]);
        setTableFields([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [schoolId, selectedAcademicYear, academicYears]);

  const handleSelectChange = (selectedOptions, { name }) => {
    if (name === 'academicYear') {
      setSelectedYears(selectedOptions || []);
    } else if (name === 'paymentMode') {
      setSelectedPaymentModes(selectedOptions || []);
    } else if (name === 'class') {
      setSelectedClasses(selectedOptions || []);
    } else if (name === 'section') {
      setSelectedSections(selectedOptions || []);
    }
  };

  const resetFilters = () => {
    setSelectedYears([]);
    setSelectedPaymentModes([]);
    setSelectedClasses([]);
    setSelectedSections([]);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  const getFieldValue = (record, field) => {
    const fieldId = field.id;
    if (fieldId === 'academicYear') {
      return formatAcademicYear(record[fieldId]) || '-';
    } else if (fieldId === 'studentName') {
      return record.student?.studentName || '-';
    } else if (fieldId === 'admissionNo' || fieldId === 'admNo') {
      return record.student?.admissionNo || '-';
    } else if (fieldId === 'class') {
      return record.className || '-';
    } else if (fieldId === 'section') {
      return record.sectionName || '-';
    } else if (fieldId === 'shift') {
      return record.shiftName || '-';
    } else {
      return record.student?.[fieldId] || record[fieldId] || '-';
    }
  };

  const calculateBalance = (record) => {
    const due = parseFloat(record.student?.regFeesDue || 0);
    const concession = parseFloat(record.student?.regFeesConcession || 0);
    const paid = parseFloat(record.student?.regFeesPaid || 0);
    return (due - concession - paid);
  };

const filteredData = feeData.filter((record) => {
  const [selectedStartYear] = selectedAcademicYear.split('-').map(Number);
  const [recordStartYear] = record.academicYear.split('-').map(Number);
  if (recordStartYear > selectedStartYear) {
    return false;
  }

  const matchesSearchTerm = searchTerm
    ? Object.values(record).some((value) =>
        value &&
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      Object.values(record.student || {}).some((value) =>
        value &&
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : true;

  const matchesPaymentMode =
    selectedPaymentModes.length === 0 ||
    selectedPaymentModes.some((mode) => record.student?.regFeesPaymentMode === mode.value);

  const matchesClass =
    selectedClasses.length === 0 ||
    selectedClasses.some((cls) => record.className === cls.value);

  const matchesSection =
    selectedSections.length === 0 ||
    selectedSections.some((sec) => record.sectionName === sec.value);

  const matchesYear =
    selectedYears.length === 0 ||
    selectedYears.some((year) => record.academicYear === year.value);

  const matchesDate =
    (!startDate && !endDate) ||
    (record.student?.regFeesDate !== '-' &&
      (() => {
        const recordDate = new Date(record.student.regFeesDate.split('-').reverse().join('-'));
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || recordDate >= start) && (!end || recordDate <= end);
      })());

  return (
    matchesSearchTerm &&
    matchesPaymentMode &&
    matchesClass &&
    matchesSection &&
    matchesYear &&
    matchesDate
  );
});

  const totals = filteredData.reduce(
    (acc, record) => {
      const due = parseFloat(record.student?.regFeesDue || 0);
      const paid = parseFloat(record.student?.regFeesPaid || 0);
      const concession = parseFloat(record.student?.regFeesConcession || 0);
      const balance = due - concession - paid;

      return {
        feesDue: acc.feesDue + due,
        feesPaid: acc.feesPaid + paid,
        concession: acc.concession + concession,
        balance: acc.balance + balance,
      };
    },
    { feesDue: 0, feesPaid: 0, concession: 0, balance: 0 }
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
                      placeholder="Search by any field"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
                    <div
                      className="py-1 px-2 mr-2 border border-dark finance-filter-icon"
                      style={{ cursor: 'pointer' }}
                      onClick={toggleFilterPanel}
                    >
                      <FaFilter />
                    </div>
                    <div
                      className="py-1 px-2 finance-setting-icon"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowSettingsModal(true)}
                    >
                      <MdSettings />
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
                              <label className="form-label">Start Date </label>
                              <input
                                type="date"
                                className="form-control"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label">End Date </label>
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
                                options={paymentModes}
                                value={selectedPaymentModes}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Payment Modes"
                                className="mt-2"
                              />
                            </div>
                          </div>
                        )}

                        {activeTab === 'Class' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
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
                          </div>
                        )}

                        {activeTab === 'Section' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
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
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="text-end mt-3">
                        <button className="btn btn-secondary me-2" onClick={resetFilters}>
                          Reset
                        </button>
                        <button className="btn btn-primary">Apply Filters</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Registration Fees Report</h2>
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
                          <th key={field.id} className="text-center align-content-center border border-secondary text-nowrap p-2">
                            {headerMapping[field.id] || field.label}
                          </th>
                        ))}
                        <th className="text-center align-content-center border border-secondary text-nowrap p-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((record, index) => (
                          <tr key={`${record.student.admissionNo}_${record.student.regNo}_${record.academicYear}_${index}`} className="payroll-table-row">
                            {tableFields.map((field) => (
                              <td key={field.id} className="text-center align-middle border border-secondary text-nowrap p-2">
                                {getFieldValue(record, field)}
                              </td>
                            ))}
                            <td className="text-center align-middle border border-secondary text-nowrap p-2">
                              {calculateBalance(record)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={tableFields.length + 1} className="text-center">
                            No data matches the selected filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="payroll-table-footer">
                        <td colSpan={tableFields.length - 3} className="text-right border border-secondary p-2"><strong>Total</strong></td>
                        <td className="text-center border border-secondary p-2"><strong>{totals.feesDue}</strong></td>
                        <td className="text-center border border-secondary p-2"><strong>{totals.feesPaid}</strong></td>
                        <td className="text-center border border-secondary p-2"><strong>{totals.concession}</strong></td>
                        <td className="text-center border border-secondary p-2"><strong>{totals.balance}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="text-center mt-3">
                  <p>No table fields available. Please configure in settings.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <SettingsModal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
        onSave={(newInFields) => setTableFields(newInFields)}
        initialInFields={tableFields}
      />
    </div>
  );
};

export default RegistartionFees;