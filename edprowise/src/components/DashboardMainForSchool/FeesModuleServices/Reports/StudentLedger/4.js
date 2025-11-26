import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import CreatableSelect from 'react-select/creatable';
import getAPI from '../../../../../../api/getAPI';
import { toast } from 'react-toastify';
import SettingsModal from './SettingsModal';

const StudentFeeLedger = () => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [schoolId, setSchoolId] = useState('');
  const [searchStudents, setSearchStudents] = useState([]); 
  const [students, setStudents] = useState([]); 
  const [classes, setClasses] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [tableFields, setTableFields] = useState([]);

  const academicYear = localStorage.getItem('selectedAcademicYear');
  const currentDate = new Date();

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  const handleSaveFields = (newFields) => {
    setTableFields(newFields);
  };

  const pageShowOptions = [
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 25, label: '25' },
    { value: 30, label: '30' },
  ];

  useEffect(() => {
    try {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (!userDetails?.schoolId) {
        toast.error('School ID not found. Please log in again.');
        return;
      }
      setSchoolId(userDetails.schoolId);
    } catch (error) {
      toast.error('Invalid user details. Please log in again.');
    }
  }, []);

  useEffect(() => {
    if (!schoolId) return;

    const fetchInitialData = async () => {
      try {
        const fieldsRes = await getAPI(`/get-tab/${schoolId}/student-ledger`, {}, true);
        if (fieldsRes.hasError) {
          throw new Error(fieldsRes.message || 'API error');
        }
        const fetchedFields = fieldsRes.data?.data?.inFields || [];
        setTableFields(fetchedFields);

        const classesRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
        setClasses(classesRes?.data?.data || []);

        const feeTypesRes = await getAPI(`/getall-fess-type/${schoolId}`);
        if (!feeTypesRes.hasError) {
          setFeeTypes(feeTypesRes.data.data || []);
        }

        const studentsRes = await getAPI(`/get-admission-form/${schoolId}`);
        if (!studentsRes.hasError) {
          setSearchStudents(studentsRes.data.data || []);
        } else {
          throw new Error(studentsRes.message || 'Failed to fetch students');
        }
      } catch (error) {
        toast.error('Error initializing data: ' + error.message);
        setTableFields([]);
        setSearchStudents([]);
      }
    };

    fetchInitialData();
  }, [schoolId]);

  useEffect(() => {
    if (!schoolId || !searchQuery) return;

    const fetchFeeData = async () => {
      try {
        const admissionNumber = searchQuery.value;
        const response = await getAPI(
          `/get-all-data?schoolId=${schoolId}&admissionNumber=${admissionNumber}&academicYear=${academicYear}`
        );

        console.log('StudentFeeLedger: Fee data API response:', response);
        if (!response?.data || !Array.isArray(response.data.data)) {
          throw new Error('No fee data found');
        }

        const admissionDetails = response.data.admissionDetails || {};
        const student = {
          AdmissionNumber: admissionDetails.AdmissionNumber || 'N/A',
          firstName: admissionDetails.firstName || '',
          lastName: admissionDetails.lastName || '',
          academicHistory: response.data.data.map((year) => ({
            academicYear: year.academicYear,
            masterDefineClass: year.classId,
            section: year.sectionId,
          })),
          ...response.data.data[0]?.student, 
        };

        setStudents([student]); 
        setFeeData(response.data.data); 
      } catch (error) {
        toast.error(error.message || 'Failed to fetch fee data');
        setFeeData([]);
        setStudents([]);
      }
    };

    fetchFeeData();
  }, [schoolId, searchQuery]);

  const processedStudentData = students.map((student) => {
    const academicHistory = student.academicHistory || [];
    const transactions = [];

    const yearData = feeData.find((year) => year.academicYear === academicYear) || {};
    const yearHistory = academicHistory.find((h) => h.academicYear === academicYear) || {};
    const classInfo =
      classes.find((c) => c._id === yearHistory?.masterDefineClass) || { className: 'N/A' };
    const sectionInfo = classInfo?.sections?.find((s) => s._id === yearHistory?.section) || {
      name: 'N/A',
    };

    const installmentGroups = {};

    feeData.forEach((year) => {
      const installmentNameMapping = {};
      year.installmentsPresent.forEach((name, index) => {
        installmentNameMapping[index + 1] = name;
        installmentNameMapping[name] = name;
      });

      if (!installmentGroups[year.academicYear]) {
        installmentGroups[year.academicYear] = {};
      }

      const feeAggregates = {};
      year.feeInstallments.forEach((installment) => {
        if (!installment.feesTypeId?._id) {
          console.warn('StudentFeeLedger: Skipping installment with missing feesTypeId:', installment);
          return;
        }

        const dueDate = new Date(installment.dueDate);
        const dueMonthStart = new Date(dueDate.getFullYear(), dueDate.getMonth(), 1);
        if (dueMonthStart > currentDate) return;

        const installmentName = installment.installmentName;
        if (!feeAggregates[installmentName]) {
          feeAggregates[installmentName] = {
            totalAmount: 0,
            totalFine: 0,
            totalExcess: 0,
            dueDate: dueDate,
          };
        }

        feeAggregates[installmentName].totalAmount += Number(installment.amount || 0);
        feeAggregates[installmentName].totalFine += Number(installment.fineAmount || 0);
      });

      Object.keys(feeAggregates).forEach((installmentName) => {
        const { totalAmount, totalFine, dueDate } = feeAggregates[installmentName];
        const formattedDate = dueDate
          .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          .replace(/\//g, '-');

        if (!installmentGroups[year.academicYear][installmentName]) {
          installmentGroups[year.academicYear][installmentName] = {
            transactions: [],
            balance: 0,
          };
        }

        const group = installmentGroups[year.academicYear][installmentName];

        if (totalAmount > 0) {
          group.balance += totalAmount;
          group.transactions.push({
            academicYear: year.academicYear,
            date: formattedDate,
            particulars: `Fees Due - ${installmentName}`,
            receiptNo: '',
            paymentMode: '',
            debit: totalAmount.toFixed(0),
            credit: '',
            balance: group.balance.toFixed(0),
            paymentDateRaw: dueDate,
            dueDate: formattedDate,
            installment: installmentName,
            tuitionFeesDue: totalAmount.toFixed(0),
            examFeesDue: '0',
            totalFeesDue: totalAmount.toFixed(0),
          });
        }
      });

      const paymentMap = new Map();
      year.paidInstallments?.forEach((pi) => {
        if (!pi.feesTypeId?._id) {
          console.warn('StudentFeeLedger: Skipping paid installment with missing feesTypeId:', pi);
          return;
        }

        const installmentName = installmentNameMapping[pi.installmentNumber] || pi.installmentNumber;
        const key = `${installmentName}-${pi.receiptNumber}-${pi.paymentDate}`;

        if (!paymentMap.has(key)) {
          const totalPayable = year.feeInstallments
            .filter((fi) => fi.installmentName === installmentName)
            .reduce((sum, fi) => sum + (Number(fi.amount) || 0) + (Number(fi.fineAmount) || 0), 0);

          paymentMap.set(key, {
            installmentName,
            receiptNumber: pi.receiptNumber,
            paymentDate: pi.paymentDate,
            paymentMode: pi.paymentMode,
            totalPayable: totalPayable || 0,
            totalPaid: 0,
            totalFinePaid: 0,
            totalExcessPaid: 0,
          });
        }

        const payment = paymentMap.get(key);
        payment.totalPaid += Number(pi.paidAmount || 0);
        payment.totalFinePaid += Number(pi.paidFine || 0);
        payment.totalExcessPaid += Number(pi.excessAmount || 0);
      });

      paymentMap.forEach((payment) => {
        const installmentName = payment.installmentName;
        if (!installmentGroups[year.academicYear][installmentName]) {
          installmentGroups[year.academicYear][installmentName] = {
            transactions: [],
            balance: 0,
          };
        }

        const group = installmentGroups[year.academicYear][installmentName];
        const paymentDate = new Date(payment.paymentDate);
        const formattedDate = paymentDate
          .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          .replace(/\//g, '-');

        if (payment.totalFinePaid > 0) {
          group.balance += Number(payment.totalFinePaid);
          group.transactions.push({
            academicYear: year.academicYear,
            date: formattedDate,
            particulars: 'Fine',
            receiptNo: payment.receiptNumber,
            paymentMode: payment.paymentMode,
            debit: payment.totalFinePaid.toFixed(0),
            credit: '',
            balance: group.balance.toFixed(0),
            paymentDateRaw: paymentDate,
            finePaid: payment.totalFinePaid.toFixed(0),
          });
        }

        if (payment.totalExcessPaid > 0) {
          group.balance += Number(payment.totalExcessPaid);
          group.transactions.push({
            academicYear: year.academicYear,
            date: formattedDate,
            particulars: 'Excess Amount',
            receiptNo: payment.receiptNumber,
            paymentMode: payment.paymentMode,
            debit: payment.totalExcessPaid.toFixed(0),
            credit: '',
            balance: group.balance.toFixed(0),
            paymentDateRaw: paymentDate,
            excessAmtPaid: payment.totalExcessPaid.toFixed(0),
          });
        }

        if (payment.totalPaid > 0 || payment.totalFinePaid > 0 || payment.totalExcessPaid > 0) {
          const totalCredit =
            Number(payment.totalPaid) + Number(payment.totalFinePaid) + Number(payment.totalExcessPaid);
          group.balance -= totalCredit;
          group.transactions.push({
            academicYear: year.academicYear,
            date: formattedDate,
            particulars: `Fees Received - ${installmentName}`,
            receiptNo: payment.receiptNumber,
            paymentMode: payment.paymentMode,
            debit: '',
            credit: totalCredit.toFixed(0),
            balance: group.balance.toFixed(0),
            paymentDateRaw: paymentDate,
            tuitionFeesPaid: payment.totalPaid.toFixed(0),
            examFeesPaid: '0',
            totalFeesPaid: totalCredit.toFixed(0),
            schoolFeesDate: formattedDate,
            schoolFeesReceiptNo: payment.receiptNumber,
            schoolFeesPaymentMode: payment.paymentMode,
          });
        }
      });
    });

    Object.keys(installmentGroups).forEach((academicYear) => {
      Object.keys(installmentGroups[academicYear])
        .sort((a, b) => {
          const dueDateA = feeData
            .find((y) => y.academicYear === academicYear)
            ?.feeInstallments.find((fi) => fi.installmentName === a)?.dueDate;
          const dueDateB = feeData
            .find((y) => y.academicYear === academicYear)
            ?.feeInstallments.find((fi) => fi.installmentName === b)?.dueDate;
          return new Date(dueDateA || 0) - new Date(dueDateB || 0);
        })
        .forEach((installmentName) => {
          const group = installmentGroups[academicYear][installmentName];
          group.transactions.sort((a, b) => {
            const typeOrder = {
              'Fees Due': 1,
              Fine: 2,
              'Excess Amount': 3,
              'Fees Received': 4,
            };
            const typeA = a.particulars.includes('Fees Due')
              ? 'Fees Due'
              : a.particulars.includes('Fine')
                ? 'Fine'
                : a.particulars.includes('Excess Amount')
                  ? 'Excess Amount'
                  : 'Fees Received';
            const typeB = b.particulars.includes('Fees Due')
              ? 'Fees Due'
              : b.particulars.includes('Fine')
                ? 'Fine'
                : b.particulars.includes('Excess Amount')
                  ? 'Excess Amount'
                  : 'Fees Received';
            if (typeA !== typeB) return typeOrder[typeA] - typeOrder[typeB];
            return (a.paymentDateRaw || new Date(0)) - (b.paymentDateRaw || new Date(0));
          });
          transactions.push(...group.transactions);
        });
    });

    return {
      admissionNo: student.AdmissionNumber || 'N/A',
      studentName: `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'N/A',
      class: classInfo.className || 'N/A',
      section: sectionInfo.name || 'N/A',
      regNo: student.regNo || 'N/A',
      dateOfBirth: student.dateOfBirth
        ? new Date(student.dateOfBirth).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).replace(/\//g, '-')
        : 'N/A',
      age: student.age || 'N/A',
      nationality: student.nationality || 'N/A',
      gender: student.gender || 'N/A',
      bloodGroup: student.bloodGroup || 'N/A',
      shift: yearData.shiftName || 'N/A',
      address: student.currentAddress || 'N/A',
      state: student.state || 'N/A',
      pincode: student.pincode || 'N/A',
      parentContactNo: student.parentContactNo || 'N/A',
      motherTongue: student.motherTongue || 'N/A',
      previousSchool: student.previousSchool || 'N/A',
      previousSchoolBoard: student.previousSchoolBoard || 'N/A',
      aadharPassportNo: student.aadharPassportNo || 'N/A',
      category: student.category || 'N/A',
      relationTypeWithSibling: student.relationTypeWithSibling || 'N/A',
      siblingName: student.siblingName || 'N/A',
      parentalStatus: student.parentalStatus || 'N/A',
      fatherName: student.fatherName || 'N/A',
      fatherMobileNo: student.fatherMobileNo || 'N/A',
      fatherQualification: student.fatherQualification || 'N/A',
      motherName: student.motherName || 'N/A',
      motherMobileNo: student.motherMobileNo || 'N/A',
      motherQualification: student.motherQualification || 'N/A',
      fatherProfession: student.fatherProfession || 'N/A',
      motherProfession: student.motherProfession || 'N/A',
      status: student.status || 'N/A',
      tcNo: student.tcNo || 'N/A',
      regFeesDate: student.regFeesDate || 'N/A',
      regFeesReceiptNo: student.regFeesReceiptNo || 'N/A',
      regFeesPaymentMode: student.regFeesPaymentMode || 'N/A',
      regFeesTransactionNo: student.regFeesTransactionNo || 'N/A',
      regFeesDue: student.regFeesDue || '0',
      regFeesConcession: student.regFeesConcession || '0',
      regFeesPaid: student.regFeesPaid || '0',
      admFeesDate: student.admFeesDate || 'N/A',
      admFeesReceiptNo: student.admFeesReceiptNo || 'N/A',
      admFeesPaymentMode: student.admFeesPaymentMode || 'N/A',
      admFeesTransactionNo: student.admFeesTransactionNo || 'N/A',
      admFeesDue: student.admFeesDue || '0',
      admFeesConcession: student.admFeesConcession || '0',
      admFeesPaid: student.admFeesPaid || '0',
      tcFeesDate: student.tcFeesDate 
         ? new Date(student.tcFeesDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).replace(/\//g, '-')
        : 'N/A',
      tcFeesReceiptNo: student.tcFeesReceiptNo || 'N/A',
      tcFeesPaymentMode: student.tcFeesPaymentMode || 'N/A',
      tcFeesTransactionNo: student.tcFeesTransactionNo || 'N/A',
      tcFeesDue: student.tcFeesDue || '0',
      tcFeesConcession: student.tcFeesConcession || '0',
      tcFeesPaid: student.tcFeesPaid || '0',
      boardExamFeesDate: student.boardExamFeesDate || 'N/A',
      boardExamFeesReceiptNo: student.boardExamFeesReceiptNo || 'N/A',
      boardExamFeesPaymentMode: student.boardExamFeesPaymentMode || 'N/A',
      boardExamFeesTransactionNo: student.boardExamFeesTransactionNo || 'N/A',
      boardExamFeesDue: student.boardExamFeesDue || '0',
      boardExamFeesConcession: student.boardExamFeesConcession || '0',
      boardExamFeesPaid: student.boardExamFeesPaid || '0',
      boardRegFeesDate: student.boardRegFeesDate || 'N/A',
      boardRegFeesReceiptNo: student.boardRegFeesReceiptNo || 'N/A',
      boardRegFeesPaymentMode: student.boardRegFeesPaymentMode || 'N/A',
      boardRegFeesTransactionNo: student.boardRegFeesTransactionNo || 'N/A',
      boardRegFeesDue: student.boardRegFeesDue || '0',
      boardRegFeesConcession: student.boardRegFeesConcession || '0',
      boardRegFeesPaid: student.boardRegFeesPaid || '0',
      transactions,
    };
  });

  const searchOptions = searchStudents.map((student) => ({
    value: student.AdmissionNumber,
    label: `${student.firstName || ''} ${student.lastName || ''} (${student.AdmissionNumber})`.trim(),
  }));

  const filteredStudents = processedStudentData
    .filter((student) => {
      if (!searchQuery) return false;
      return (
        student.admissionNo === searchQuery.value ||
        student.studentName === searchQuery.label.split(' (')[0]
      );
    })
    .map((student) => ({
      ...student,
      transactions: student.transactions.filter((transaction) => {
        if (!startDate && !endDate) return true;
        if (!transaction.paymentDateRaw) return false;
        const transactionDate = transaction.paymentDateRaw;
        const start = startDate ? new Date(startDate) : new Date(0);
        const end = endDate ? new Date(endDate) : new Date();
        return transactionDate >= start && transactionDate <= end;
      }),
    }));

  const shouldDisplayTable = !!searchQuery;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="row p-1 border border-dark" style={{ background: '#bfbfbf' }}>
                  <div className="col-md-5 col-12">
                    <CreatableSelect
                      isClearable
                      placeholder="Search by Name or Admission No."
                      options={searchOptions}
                      value={searchQuery}
                      onChange={setSearchQuery}
                      className="border border-dark"
                    />
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
                    <CreatableSelect
                      isClearable
                      placeholder="Show"
                      options={pageShowOptions}
                      onChange={(option) => setRowsPerPage(option ? option.value : 10)}
                      className="email-select border border-dark me-lg-2"
                    />
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
                      <div className="row">
                        <div className="col-md-6">
                          <label>Start Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label>End Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="text-end mt-3">
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => {
                            setStartDate('');
                            setEndDate('');
                            setSearchQuery(null);
                          }}
                        >
                          Reset
                        </button>
                        <button className="btn btn-primary">Apply Filters</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <SettingsModal
                show={showSettingsModal}
                onHide={() => setShowSettingsModal(false)}
                onSave={handleSaveFields}
                initialInFields={tableFields}
              />

              {shouldDisplayTable ? (
                filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <div key={index}>
                      <div className="container mt-3">
                        <div className="row">
                          <div className="col-md-3">
                            <strong>Admission No.:</strong> {student.admissionNo}
                          </div>
                          <div className="col-md-3">
                            <strong>Student Name:</strong> {student.studentName}
                          </div>
                          <div className="col-md-3">
                            <strong>Class:</strong> {student.class}
                          </div>
                          <div className="col-md-3">
                            <strong>Section:</strong> {student.section}
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive pb-4 mt-3">
                        <table className="table text-dark border border-secondary mb-1">
                          <thead>
                            <tr className="payroll-table-header">
                              {tableFields.length > 0 ? (
                                tableFields.map((field) => (
                                  <th
                                    key={field.id}
                                    className="text-center align-content-center border border-secondary text-nowrap p-2"
                                  >
                                    {field.label}
                                  </th>
                                ))
                              ) : (
                                <th className="text-center">No columns available. Please configure in settings.</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {student.transactions.length > 0 ? (
                              student.transactions.slice(0, rowsPerPage).map((transaction, tIndex) => (
                                <tr key={tIndex} className="payroll-table-row">
                                  {tableFields.length > 0 ? (
                                    tableFields.map((field) => (
                                      <td
                                        key={field.id}
                                        className={`text-${['debit', 'credit', 'balance'].includes(field.id)
                                            ? 'end'
                                            : 'center'
                                          } align-middle border border-secondary text-nowrap p-2`}
                                      >
                                        {transaction[field.id] || student[field.id]}
                                      </td>
                                    ))
                                  ) : (
                                    <td className="text-center"></td>
                                  )}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={tableFields.length || 1}
                                  className="text-center"
                                >
                                  No transactions available.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center mt-3">
                    <p>No student data matches the selected search.</p>
                  </div>
                )
              ) : (
                <div className="text-center mt-3">
                  <p>Please select a student to display the fee ledger.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeeLedger;
