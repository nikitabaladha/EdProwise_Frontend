import React, { useState } from 'react';
import useSchoolFeesReceipts from '../SchoolFees/SchoolFeesReceiptsdata';
import SchoolFeesExcelSheetModal from './SchoolFeesExcelSheetModal';
import FeeTypeModal from './FeeTypeModal';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

const SchoolFeesReceipts = () => {
  const {
    formData,
    handleChange,
    handleAdmissionSubmit,
    existingStudents,
    classes,
    sections,
    feeData,
    initialFeeData,
    selectedAcademicYears,
    selectAllYears,
    selectAllInstallments,
    setCurrentInstallment,
    selectedInstallments,
    getFeeTypeName,
    handleInstallmentSelection,
    handleSelectAllInstallments,
    handleFinalSubmit,
    isGenerating,
    showFullForm,
    showSecondTable,
    setShowSecondTable,
    showProcessedData,
    setShowProcessedData,
    selectedFeeTypesByInstallment,
    paidAmounts,
    handleAcademicYearSelect,
    handleSelectAllYears,
    schoolId,
    feeTypes,
    actionSelections,
    handleActionSelection,
    modalData,
    openFeeTypeModal,
    handleModalPaidAmountChange,
    closeFeeTypeModal,
    handleFineAmountChange,
  } = useSchoolFeesReceipts();
  const navigate = useNavigate();
  const [showImportModal, setShowImportModal] = useState(false);
  const [visibleReceipts, setVisibleReceipts] = useState({});

  const handleViewReceipt = (receipt) => {
    navigate('/school-dashboard/fees-module/fees-receipts/school-fees/fees-receipts-view', {
      state: [receipt],
    });
  };

  const toggleReceiptsTable = (academicYear, installmentName) => {
    const key = `${academicYear}-${installmentName}`;
    setVisibleReceipts((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  const handleInstallmentCheckbox = (installmentName, academicYear) => {
    handleInstallmentSelection(installmentName, academicYear);
  };

  const formatAcademicYear = (year) => {
    const [start, end] = year.split("-");
    return `${start}-${end.slice(2)}`;
  };

 const renderReceiptsTable = () => {
  const receiptsToShow = feeData
    .filter((year) => selectAllYears || selectedAcademicYears.includes(year.academicYear))
    .flatMap((year) => {
      if (!Array.isArray(year.installmentsPresent) || !Array.isArray(year.paidInstallments)) return [];

      return year.installmentsPresent
        .filter((installmentName) => {
          const key = `${year.academicYear}-${installmentName}`;
          return visibleReceipts[key];
        })
        .map((installmentName) => {
          const filteredInstallments = year.paidInstallments.filter(
            (item) => item.installmentName === installmentName
          );

          if (filteredInstallments.length === 0) {
            return {
              academicYear: year.academicYear,
              installmentName,
              rows: [
                {
                  isEmpty: true,
                  message: `No receipts available for ${installmentName}`,
                },
              ],
            };
          }

          let totalFeesAmount = 0;
          let totalConcession = 0;
          let totalPayable = 0;
          let totalPaid = 0;
          let totalBalance = 0;
          let totalFine = 0;
          let totalExcess = 0;

          const groupedByReceipt = filteredInstallments.reduce((acc, item) => {
            const receiptNumber = item.receiptNumber?.toString() || '';
            if (!receiptNumber) return acc;

            if (!acc[receiptNumber]) {
              acc[receiptNumber] = {
                items: [],
                paymentDate: item.paymentDate,
                collectorName: item.collectorName,
                paymentMode: item.paymentMode,
                transactionNumber: item.transactionNumber || '',
                bankName: item.bankName || '',
                chequeNumber: item.chequeNumber || '',
                fineAmount: 0,
                excessAmount: 0,
                  installmentId: item._id,
              };
            }

            const concessionAmount = item.concession || 0;
            const fineAmount = item.paidFine || 0;
            const excessAmount = item.excessAmount || 0;
            const feesAmount = item.amount || 0;
            const payableAmount = feesAmount - concessionAmount;
            const paidAmount = item.paidAmount || 0;
            const balance = item.balance || 0;

            totalFeesAmount += feesAmount;
            totalConcession += concessionAmount;
            totalPayable += payableAmount;
            totalPaid += paidAmount;
            totalBalance += balance;
            totalFine += fineAmount;
            totalExcess += excessAmount;
            acc[receiptNumber].fineAmount = fineAmount;
            acc[receiptNumber].excessAmount = excessAmount;

            const existingItem = acc[receiptNumber].items.find(
              (i) => i.feesType === getFeeTypeName(item.feesTypeId?._id)
            );
            if (!existingItem) {
              acc[receiptNumber].items.push({
                feesType: getFeeTypeName(item.feesTypeId?._id) || 'Unknown Fee Type',
                feesAmount,
                fineAmount,
                excessAmount,
                concessionAmount,
                payableAmount,
                paidAmount,
                balance,
              });
            }

            return acc;
          }, {});

          const sortedReceiptNumbers = Object.keys(groupedByReceipt).sort((a, b) => {
            const numA = parseFloat(a.replace('REC-', ''));
            const numB = parseFloat(b.replace('REC-', ''));
            if (!isNaN(numA) && !isNaN(numB)) {
              return numA - numB;
            }
            return a.localeCompare(b);
          });

          const receiptData = (receiptNumber, group) => ({
            receiptNumber,
            studentName: `${formData.firstName} ${formData.lastName}`,
            studentAdmissionNumber: formData.AdmissionNumber,
            date: group.paymentDate ? new Date(group.paymentDate).toLocaleDateString() : '',
            academicYear: year.academicYear,
            className: formData.masterDefineClass,
            section: formData.section,
            paymentMode: group.paymentMode || '',
            transactionNumber: group.transactionNumber || '',
            bankName: group.bankName || '',
            chequeNumber: group.chequeNumber || '',
            paymentDate: group.paymentDate ? new Date(group.paymentDate).toLocaleDateString() : '',
            collectorName: group.collectorName || '',
            fineAmount: group.fineAmount,
            excessAmount: group.excessAmount,
                installmentId: group.installmentId,
            installments: [
              {
                installmentName, // Use installmentName directly
                feeItems: group.items.map((item) => ({
                  type: item.feesType,
                  amount: item.feesAmount,
                  concession: item.concessionAmount,
                  payable: item.payableAmount,
                  paid: item.paidAmount,
                  balance: item.balance,
                })),
              },
            ],
          });

          const rows = sortedReceiptNumbers.map((receiptNumber) => {
            const group = groupedByReceipt[receiptNumber];
            if (!group || !group.items) return null;

            return {
              receiptNumber,
              paymentDate: group.paymentDate ? new Date(group.paymentDate).toLocaleDateString() : '',
              collectorName: group.collectorName || '',
              paymentMode: group.paymentMode || '',
              receiptData: receiptData(receiptNumber, group),
            };
          }).filter(Boolean);

          return {
            academicYear: year.academicYear,
            installmentName,
            rows,
            totals: {
              totalFeesAmount,
              totalConcession,
              totalPayable,
              totalPaid,
              totalBalance,
            },
          };
        }).filter(Boolean);
    });

  if (receiptsToShow.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className="card-title text-start">Receipts for Installments</h4>
      {receiptsToShow.map(({ academicYear, installmentName, rows, totals }, index) => (
        <div key={`${academicYear}-${installmentName}-${index}`} className="mt-3">
          <h4 className="text-start">
            Paid Fee Types for {installmentName} ({formatAcademicYear(academicYear)})
          </h4>
          <table className="table table-bordered table-sm">
            <thead className="bg-light">
              <tr>
                <th>Receipt Number</th>
                <th>Payment Date</th>
                <th>Collector Name</th>
                <th>Payment Mode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 && !rows[0].isEmpty ? (
                rows.map((row, rowIndex) => (
                  <tr key={`${academicYear}-${installmentName}-paid-${row.receiptNumber}-${rowIndex}`}>
                    <td>{row.receiptNumber}</td>
                    <td>{row.paymentDate}</td>
                    <td>{row.collectorName}</td>
                    <td>{row.paymentMode}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-info ms-2"
                        onClick={() => handleViewReceipt(row.receiptData)}
                        aria-label={`View details for receipt ${row.receiptNumber}`}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    {rows[0]?.message || 'No receipt data available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

  if (!showFullForm) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-4"></div>
                      <div className="col-4 text-center">
                        <h4 className="card-title custom-heading-font mb-0">School Fees</h4>
                      </div>
                      <div className="col-4 d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setShowImportModal(true)}
                        >
                          Import
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary custom-submit-button"
                          onClick={() => navigate('/school-dashboard/fees-module/fees-receipts/school-fees/fees-receipts')}
                        >
                          Fee Receipts
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleAdmissionSubmit}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="AdmissionNumber" className="form-label">
                          Enter Admission Number
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            id="AdmissionNumber"
                            name="AdmissionNumber"
                            className="form-control"
                            list="AdmissionNumbers"
                            value={formData.AdmissionNumber}
                            onChange={handleChange}
                            required
                            placeholder="Search or select admission number"
                          />
                        </div>
                        <datalist id="AdmissionNumbers">
                          {existingStudents.map((student, index) => (
                            <option key={index} value={student.AdmissionNumber}>
                              {student.AdmissionNumber} - {student.firstName} {student.lastName}
                            </option>
                          ))}
                        </datalist>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mt-3 d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary custom-submit-button">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <SchoolFeesExcelSheetModal
          show={showImportModal}
          onClose={() => setShowImportModal(false)}
          schoolId={schoolId}
          existingStudents={existingStudents}
          classes={classes}
          feeTypes={feeTypes}
          handleFinalSubmit={handleFinalSubmit}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <h4 className="card-title text-center">School Fees Receipts</h4>
              <form>
                <>
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <label className="form-label">Admission No.</label>
                      <p className="form-control">{formData.AdmissionNumber}</p>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Student Name</label>
                      <p className="form-control">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Class</label>
                      <select
                        id="masterDefineClass"
                        name="masterDefineClass"
                        className="form-control"
                        value={formData.masterDefineClass}
                        required
                        disabled
                      >
                        <option value="">Select Class</option>
                        {classes.map((classItem) => (
                          <option key={classItem._id} value={classItem._id}>
                            {classItem.className}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Section</label>
                      <select
                        id="section"
                        name="section"
                        className="form-control"
                        value={formData.section}
                        onChange={handleChange}
                        required
                        disabled
                      >
                        <option value="">Select Section</option>
                        {sections.map((section) => (
                          <option key={section._id} value={section._id}>
                            {section.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <hr />
                  <div className="table-responsive mt-3">
                    <table className="table align-middle mb-0 table-centered text-center text-nowrap">
                      <thead>
                        <tr style={{ backgroundColor: '#a8fffe' }}>
                          <th>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={selectAllYears}
                              onChange={handleSelectAllYears}
                            />
                          </th>
                          <th>Academic Year</th>
                          <th>Remaining Installments</th>
                          <th>Fees Amount</th>
                          <th>Concession</th>
                          <th>Paid Fees</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(initialFeeData) && initialFeeData.length > 0 ? (
                          initialFeeData.map((yearData, index) => {
                            const isYearSelected = selectedAcademicYears.includes(yearData.academicYear);

                            return (
                              <tr
                                key={index}
                                className={isYearSelected ? 'table-primary' : ''}
                                style={{ cursor: 'pointer' }}
                              >
                                <td style={{ backgroundColor: "white" }}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectAllYears || isYearSelected}
                                    onChange={() => handleAcademicYearSelect(yearData.academicYear)}
                                  />
                                </td>
                                <td style={{ backgroundColor: "white" }}>{formatAcademicYear(yearData.academicYear)}</td>
                                <td style={{ backgroundColor: "white" }}>
                                  {yearData.installmentsPresent?.filter((instName) => {
                                    const installmentData = yearData.feeInstallments?.filter(
                                      (item) => item.installmentName === instName
                                    );
                                    return installmentData?.some((item) => item.balanceAmount > 0);
                                  }).length || 0}
                                </td>
                                <td style={{ backgroundColor: "white" }}>{yearData.totals.totalFeesAmount}</td>
                                <td style={{ backgroundColor: "white" }}>{yearData.totals.totalConcession}</td>
                                <td style={{ backgroundColor: "white" }}>{yearData.totals.totalPaidAmount}</td>
                                <td style={{ backgroundColor: "white" }}>{yearData.totals.totalRemainingAmount}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              {initialFeeData?.message || 'No outstanding fees found for any academic year'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="text-end mt-3">
                    {!showSecondTable && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setShowSecondTable(true);
                          setCurrentInstallment('Installment 1');
                        }}
                        disabled={!selectAllYears && selectedAcademicYears.length === 0}
                      >
                        Proceed
                      </button>
                    )}
                  </div>
                </>
                {showSecondTable && (
                  <>
                    <h4 className="card-title text-start mt-3">
                      Installments {selectAllYears
                        ? '(All Years)'
                        : selectedAcademicYears.length > 0
                          ? `(${selectedAcademicYears.map(yearStr => {
                            const [start, end] = yearStr.split('-');
                            return `${start}-${end.slice(-2)}`;
                          }).join(', ')})`
                          : ''
                      }
                    </h4>
                    <div className="table-responsive mt-2" style={{ position: 'relative', overflowX: 'auto' }}>
                      <table className="table align-middle mb-0 table-centered text-center text-nowrap">
                        <thead>
                          <tr style={{ backgroundColor: '#a8fffe' }}>
                            <th style={{ position: 'sticky', left: 0, zIndex: 2 }}>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={selectAllInstallments}
                                onChange={handleSelectAllInstallments}
                              />
                            </th>
                            <th style={{ position: 'sticky', left: '60px', zIndex: 2 }}>Academic Year</th>
                            <th style={{ position: 'sticky', left: '210px', zIndex: 2 }}>Installment</th>
                            <th style={{ position: 'sticky', left: '330px', zIndex: 2 }}>Due Date</th>
                            <th>Fees</th>
                            <th>Concession</th>
                            <th>Total Payable</th>
                            <th>Amount Paid</th>
                            <th>Balance Payable</th>
                            <th>Amount</th>
                            <th>Action</th>
                            <th>Fees Type</th>
                            <th>Receipts</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(feeData) && feeData.length > 0 ? (
                            feeData
                              .filter(
                                (year) =>
                                  selectAllYears || selectedAcademicYears.includes(year.academicYear)
                              )
                              .flatMap((year) => {
                                if (!Array.isArray(year.installmentsPresent)) return [];

                                return year.installmentsPresent.map((installmentName) => {
                                  const installmentData = year.feeInstallments?.filter(
                                    (item) => item.installmentName === installmentName
                                  );

                                  const totals = installmentData.reduce(
                                    (acc, item, index) => {
                                      const concessionItem = year.concession?.concessionDetails?.find(
                                        (cd) =>
                                          cd.installmentName === item.installmentName &&
                                          cd.feesType === item.feesTypeId._id
                                      );
                                      const concessionAmount = concessionItem?.concessionAmount || 0;
                                      const fineAmount = index === 0 ? item.fineAmount || 0 : 0;
                                      const payableAmount = item.amount - concessionAmount;
                                      const paidKey = `${year.academicYear}-${installmentName}-${item.feesTypeId._id}`;
                                      const finePaidKey = `${year.academicYear}-${installmentName}-fine`;
                                      const excessPaidKey = `${year.academicYear}-${installmentName}-excess`;
                                      const action = actionSelections[`${year.academicYear}-${installmentName}`];
                                      let currentPaidAmount;
                                      if (action === 'Full Fees') {
                                        currentPaidAmount = item.balanceAmount || 0;
                                      } else {
                                        currentPaidAmount = paidAmounts[paidKey] !== undefined ? Number(paidAmounts[paidKey] || 0) : 0;
                                      }
                                      const finePaidAmount = index === 0 && paidAmounts[finePaidKey] !== undefined ? Number(paidAmounts[finePaidKey] || 0) : 0;
                                      const excessPaidAmount = index === 0 && paidAmounts[excessPaidKey] !== undefined ? Number(paidAmounts[excessPaidKey] || 0) : 0;
                                      const balance = item.balanceAmount;
                                      const amountPaid = item.amount - concessionAmount - item.balanceAmount;

                                      return {
                                        totalFeesAmount: acc.totalFeesAmount + item.amount,
                                        totalFine: acc.totalFine + fineAmount,
                                        totalConcession: acc.totalConcession + concessionAmount,
                                        totalPayable: acc.totalPayable + payableAmount,
                                        totalPaid: acc.totalPaid + currentPaidAmount + finePaidAmount + excessPaidAmount,
                                        totalBalance: acc.totalBalance + balance,
                                        totalPaidAmount: acc.totalPaidAmount + amountPaid,
                                        excessPaidAmount: acc.excessPaidAmount + excessPaidAmount,
                                      };
                                    },
                                    {
                                      totalFeesAmount: 0,
                                      totalFine: 0,
                                      totalConcession: 0,
                                      totalPayable: 0,
                                      totalPaid: 0,
                                      totalBalance: 0,
                                      totalPaidAmount: 0,
                                      excessPaidAmount: 0,
                                    }
                                  );

                                  const isInstallmentSelected = selectedInstallments[year.academicYear]?.includes(installmentName);

                                  return (
                                    <tr key={`${year.academicYear}-${installmentName}`}>
                                      <td style={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: 'white' }}>
                                        {totals.totalBalance > 0 ? (
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={isInstallmentSelected}
                                            onChange={() => handleInstallmentCheckbox(installmentName, year.academicYear)}
                                          />
                                        ) : (
                                          <span className="badge bg-success"></span>
                                        )}
                                      </td>
                                      <td style={{ position: 'sticky', left: '60px', zIndex: 1, backgroundColor: 'white' }}>{formatAcademicYear(year.academicYear)}</td>
                                      <td style={{ position: 'sticky', left: '210px', zIndex: 1, backgroundColor: 'white' }}>{installmentName}</td>
                                      <td style={{ position: 'sticky', left: '330px', zIndex: 1, backgroundColor: 'white' }}>{new Date(installmentData[0].dueDate).toLocaleDateString()}</td>
                                      <td>{totals.totalFeesAmount}</td>
                                      <td>{totals.totalConcession}</td>
                                      <td>{totals.totalPayable}</td>
                                      <td>{totals.totalPaidAmount}</td>
                                      <td>{totals.totalBalance}</td>
                                      <td>{totals.totalPaid}</td>
                                      {totals.totalBalance > 0 ? (
                                        <td>
                                          <select
                                            style={{ width: '120px', border: '1px solid #f2be00', fontSize: '1.0rem' }}
                                            className="form-select form-control-sm"
                                            value={actionSelections[`${year.academicYear}-${installmentName}`] || ''}
                                            onChange={(e) =>
                                              handleActionSelection(installmentName, year.academicYear, e.target.value)
                                            }
                                          >
                                            <option value="">Select Fees</option>
                                            <option value="Part Fees">Part Fees</option>
                                            <option value="Full Fees">Full Fees</option>
                                          </select>
                                        </td>
                                      ) : (
                                        <td>-</td>
                                      )}
                                      {totals.totalBalance > 0 ? (
                                        <td>
                                          <button
                                            type="button"
                                            className="btn btn-sm btn-primary"
                                            onClick={() => openFeeTypeModal(installmentName, year.academicYear)}
                                          >
                                            <FaEye />
                                          </button>
                                        </td>
                                      ) : (
                                        <td>
                                          <span className="badge bg-success">Fully Paid</span>
                                        </td>
                                      )}
                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-primary"
                                          onClick={() => toggleReceiptsTable(year.academicYear, installmentName)}
                                          aria-label={visibleReceipts[`${year.academicYear}-${installmentName}`] ? `Hide receipts for ${installmentName}` : `View receipts for ${installmentName}`}
                                        >
                                          <FaEye />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                }).filter(Boolean);
                              })
                          ) : (
                            <tr>
                              <td colSpan="13" className="text-center">
                                No unpaid installments found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {renderReceiptsTable()}
                  </>
                )}
                {showSecondTable && (
                  <div className="text-end my-3">
                    {!showProcessedData ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setShowProcessedData(!showProcessedData)}
                        disabled={
                          Object.values(selectedInstallments).flat().length === 0 &&
                          Object.keys(selectedFeeTypesByInstallment).length === 0
                        }
                      >
                        Proceed
                      </button>
                    ) : (
                      <>
                        <div className="mt-4">
                          <h6 className="card-title text-start">Payment Details</h6>
                          <div className="row">
                            <div className="col-md-6">
                              <label className="form-label text-start">Payment Mode</label>
                              <select
                                name="paymentMode"
                                className="form-select"
                                value={formData.paymentMode}
                                onChange={handleChange}
                                required
                              >
                                <option value="">Select Payment Mode</option>
                                <option value="Cash">Cash</option>
                                <option value="Cheque">Cheque</option>
                                <option value="Online Transfer">Online Transfer</option>
                              </select>
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Collector Name</label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter Collector Name"
                                required
                              />
                            </div>
                            {formData.paymentMode === 'Cheque' && (
                              <>
                                <div className="col-md-6">
                                  <label className="form-label">Cheque Number</label>
                                  <input
                                    type="text"
                                    name="chequeNumber"
                                    className="form-control"
                                    value={formData.chequeNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Cheque Number"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Bank Name</label>
                                  <input
                                    type="text"
                                    name="bankName"
                                    className="form-control"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    placeholder="Enter Bank Name"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-end mt-3">
                          <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={() => setShowProcessedData(false)}
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleFinalSubmit}
                            disabled={isGenerating}
                          >
                            {isGenerating ? 'Generating...' : 'Generate Receipt'}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <FeeTypeModal
        show={!!modalData}
        onClose={closeFeeTypeModal}
        modalData={modalData}
        handleModalPaidAmountChange={handleModalPaidAmountChange}
        feeTypes={feeTypes}
        getFeeTypeName={getFeeTypeName}
        actionSelections={actionSelections}
        handleFineAmountChange={handleFineAmountChange}
      />
      <SchoolFeesExcelSheetModal
        show={showImportModal}
        onClose={() => setShowImportModal(false)}
        schoolId={schoolId}
        existingStudents={existingStudents}
        classes={classes}
        feeTypes={feeTypes}
        handleFinalSubmit={handleFinalSubmit}
      />
    </div>
  );
};

export default SchoolFeesReceipts;