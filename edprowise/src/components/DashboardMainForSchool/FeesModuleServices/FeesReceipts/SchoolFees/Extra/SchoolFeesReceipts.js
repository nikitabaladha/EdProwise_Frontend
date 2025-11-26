import React, { useState } from 'react';
import useSchoolFeesReceipts from "../SchoolFees/SchoolFeesReceiptsdata";
import SchoolFeesExcelSheetModal from './SchoolFeesExcelSheetModal';
import { useNavigate } from "react-router-dom";

const SchoolFeesReceipts = () => {
  const {
    formData,
    handleChange,
    handleAdmissionSubmit,
    existingStudents,
    classes,
    sections,
    feeData,
    selectedAcademicYears,
    selectAllYears,
    setCurrentInstallment,
    selectedInstallments,
    getFeeTypeName,
    handleInstallmentSelection,
    handleFeeTypeSelection,
    handleFinalSubmit,
    isGenerating,
    showFullForm,
    showSecondTable,
    setShowSecondTable,
    showProcessedData,
    setShowProcessedData,
    selectedFeeTypesByInstallment,
    handlePaidAmountChange,
    paidAmounts,
    handleAcademicYearSelect,
    handleSelectAllYears,
    schoolId,
    feeTypes,
    handleFineAmountChange
  } = useSchoolFeesReceipts();
  const navigate = useNavigate();
  const [showImportModal, setShowImportModal] = useState(false);

  const handleViewReceipt = (receipt) => {
    console.log("view clicked")
    navigate("/school-dashboard/fees-module/fees-receipts/school-fees/student-receipts", {
      state: [receipt],
    });
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
                          onClick={() => navigate("/school-dashboard/fees-module/fees-receipts/school-fees/fees-receipts")}
                        >
                          Fee Receipts
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleAdmissionSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="AdmissionNumber" className="form-label">
                          Admission No
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
                  <div className="table-responsive mt-3">
                    <h4 className="card-title text-start">Dashboard</h4>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label className="form-label">Admission No.</label>
                        <p className="form-control">{formData.AdmissionNumber}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Student Name</label>
                        <p className="form-control">{formData.firstName} {formData.lastName}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Class</label>
                        <select
                          id="masterDefineClass"
                          name="masterDefineClass"
                          className="form-control"
                          value={formData.masterDefineClass}
                          onChange={handleChange}
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
                      <div className="col-md-6">
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
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                      <thead className="bg-light-subtle">
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={selectAllYears}
                              onChange={handleSelectAllYears}
                            />
                          </th>
                          <th>Academic Year</th>
                          <th>Remaining installments</th>
                          <th>Total Fees Amount</th>
                          <th>Total Concession</th>
                          <th>Total Fine</th>
                          <th>Pay Fees</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(feeData) && feeData.length > 0 ? (
                          feeData.map((yearData, index) => {
                            const hasUnpaidInstallments = yearData.feeInstallments?.some(
                              item => item.balanceAmount > 0
                            );

                            if (!hasUnpaidInstallments) return null;

                            const isYearSelected = selectedAcademicYears.includes(yearData.academicYear);

                            return (
                              <tr
                                key={index}
                                className={isYearSelected ? 'table-primary' : ''}
                                style={{ cursor: 'pointer' }}
                              >
                                <td>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={selectAllYears || isYearSelected}
                                    onChange={(e) => {
                                      if (selectAllYears) {
                                        handleSelectAllYears();
                                      }
                                      handleAcademicYearSelect(yearData.academicYear);
                                    }}
                                  />
                                </td>
                                <td>{yearData.academicYear}</td>
                                <td>
                                  {yearData.installmentsPresent?.filter(instNum => {
                                    const installmentData = yearData.feeInstallments?.filter(
                                      item => item.installmentName.includes(`Installment ${instNum}`)
                                    );
                                    return installmentData?.some(item => item.balanceAmount > 0);
                                  }).length || 0}
                                </td>
                                <td>{yearData.totals.totalFeesAmount}</td>
                                <td>{yearData.totals.totalConcession}</td>
                                <td>{yearData.totals.totalFine}</td>
                                <td>{yearData.totals.totalPaidAmount}</td>
                                <td>{yearData.totals.totalRemainingAmount}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              {feeData?.message || 'No outstanding fees found for any academic year'}
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
                          setCurrentInstallment(1);
                        }}
                        disabled={!selectAllYears && selectedAcademicYears.length === 0}
                      >
                        Proceed
                      </button>
                    )}
                  </div>
                </>
                {showSecondTable && (
                  <div className="table-responsive mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="card-title text-start m-0">
                        Installments {selectAllYears ? "(All Years)" : selectedAcademicYears.length > 0 ? `(${selectedAcademicYears.join(', ')})` : ""}
                      </h4>
                    </div>
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                      <thead className="bg-light-subtle">
                        <tr>
                          <th>Select</th>
                          <th>Academic Year</th>
                          <th>Installment</th>
                          <th>Type Of Fees</th>
                          <th>Due Date</th>
                          <th>Fees Amount</th>
                          <th>Fine</th>
                          <th>Concession</th>
                          <th>Total Fees Payable</th>
                          <th>Balance Fees Payable</th>
                          <th>Amount Paid</th>
                         
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

                              return year.installmentsPresent.map((installmentNum) => {
                                const installmentData = year.feeInstallments
                                  ?.filter((item) =>
                                    item.installmentName.includes(`Installment ${installmentNum}`)
                                  )
                                  ?.filter((item) => item.balanceAmount > 0);

                                if (!installmentData?.length) return null;

                                const totals = installmentData.reduce(
                                  (acc, item) => {
                                    const concessionItem =
                                      year.concession?.concessionDetails?.find(
                                        (cd) =>
                                          cd.installmentName === item.installmentName &&
                                          cd.feesType === item.feesTypeId._id
                                      );
                                    const concessionAmount = concessionItem?.concessionAmount || 0;
                                    const fineAmount = item.fineAmount || 0;
                                    const payableAmount = item.amount - concessionAmount + fineAmount;
                                    const paidKey = `${year.academicYear}-${installmentNum}-${item.feesTypeId._id}`;
                                    const currentPaidAmount =
                                      paidAmounts[paidKey] !== undefined
                                        ? paidAmounts[paidKey]
                                        : item.paidAmount || 0;
                                    const balance = item.balanceAmount;

                                    return {
                                      totalFeesAmount: acc.totalFeesAmount + item.amount,
                                      totalFine: acc.totalFine + fineAmount,
                                      totalConcession: acc.totalConcession + concessionAmount,
                                      totalPayable: acc.totalPayable + payableAmount,
                                      totalPaid: acc.totalPaid + currentPaidAmount,
                                      totalBalance: acc.totalBalance + balance,
                                    };
                                  },
                                  {
                                    totalFeesAmount: 0,
                                    totalFine: 0,
                                    totalConcession: 0,
                                    totalPayable: 0,
                                    totalPaid: 0,
                                    totalBalance: 0,
                                  }
                                );

                                return (
                                  <React.Fragment key={`${year.academicYear}-${installmentNum}`}>
                                    {installmentData.map((item, index) => {
                                      const concessionItem =
                                        year.concession?.concessionDetails?.find(
                                          (cd) =>
                                            cd.installmentName === item.installmentName &&
                                            cd.feesType === item.feesTypeId._id
                                        );
                                      const concessionAmount = concessionItem?.concessionAmount || 0;
                                      const fineAmount = item.fineAmount || 0;
                                      const payableAmount =
                                        item.amount - concessionAmount + fineAmount;
                                      const paidKey = `${year.academicYear}-${installmentNum}-${item.feesTypeId._id}`;
                                      const currentPaidAmount =
                                        paidAmounts[paidKey] !== undefined
                                          ? paidAmounts[paidKey]
                                          : item.paidAmount || 0;

                                      return (
                                        <tr key={`${year.academicYear}-${installmentNum}-${index}`}>
                                          {index === 0 && (
                                            <>
                                              <td rowSpan={installmentData.length}>
                                                <input
                                                  type="checkbox"
                                                  className="form-check-input"
                                                  checked={
                                                    (selectedInstallments[year.academicYear] || []).includes(
                                                      installmentNum
                                                    )
                                                  }
                                                  onChange={() =>
                                                    handleInstallmentSelection(
                                                      installmentNum,
                                                      year.academicYear
                                                    )
                                                  }
                                                />
                                              </td>
                                              <td rowSpan={installmentData.length}>{year.academicYear}</td>
                                              <td rowSpan={installmentData.length}>
                                                Installment {installmentNum}
                                              </td>
                                            </>
                                          )}
                                          <td
                                            style={{
                                              verticalAlign: "middle",
                                              textAlign: "left",
                                              whiteSpace: "nowrap",
                                            }}
                                          >
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              checked={
                                                (
                                                  selectedFeeTypesByInstallment[year.academicYear]?.[
                                                  installmentNum
                                                  ] || []
                                                ).includes(item.feesTypeId._id)
                                              }
                                              onChange={() =>
                                                handleFeeTypeSelection(
                                                  installmentNum,
                                                  item.feesTypeId._id,
                                                  year.academicYear
                                                )
                                              }
                                            />
                                            <span style={{ marginLeft: "10px" }}>
                                              {getFeeTypeName(item.feesTypeId._id) || "Fee Type Not Found"}
                                            </span>
                                          </td>
                                          <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                                          <td>{item.amount}</td>
                                          <td>
                                            <input
                                              type="number"
                                              className="form-control form-control-sm"
                                              value={fineAmount}
                                              onChange={(e) =>
                                                handleFineAmountChange(
                                                  installmentNum,
                                                  item.feesTypeId._id,
                                                  e.target.value,
                                                  year.academicYear
                                                )
                                              }
                                              min="0"
                                              style={{ width: "100px", margin: "0 auto" }}
                                            />
                                          </td>
                                          <td>{concessionAmount}</td>
                                          <td>{payableAmount}</td>
                                           <td>{item.balanceAmount}</td>
                                          <td>
                                            <input
                                              type="number"
                                              className="form-control form-control-sm"
                                              value={currentPaidAmount}
                                              onChange={(e) =>
                                                handlePaidAmountChange(
                                                  installmentNum,
                                                  item.feesTypeId._id,
                                                  Math.max(
                                                    0,
                                                    Math.min(payableAmount, Number(e.target.value))
                                                  ),
                                                  year.academicYear
                                                )
                                              }
                                              min="0"
                                              max={payableAmount}
                                              style={{ width: "100px", margin: "0 auto" }}
                                            />
                                          </td>
                                         
                                        </tr>
                                      );
                                    })}
                                    <tr className="table-info">
                                      <td colSpan={3}></td>
                                      <td>
                                        <strong>Total</strong>
                                      </td>
                                      <td></td>
                                      <td>
                                        <strong>{totals.totalFeesAmount}</strong>
                                      </td>
                                      <td>
                                        <strong>{totals.totalFine}</strong>
                                      </td>
                                      <td>
                                        <strong>{totals.totalConcession}</strong>
                                      </td>
                                      <td>
                                        <strong>{totals.totalPayable}</strong>
                                      </td>
                                      <td>
                                         <strong>{totals.totalBalance}</strong>
                                       
                                      </td>
                                      <td>
                                        <strong>{totals.totalPaid}</strong>
                                      </td>
                                    </tr>

   {year.paidInstallments && year.paidInstallments.length > 0 && (() => {
  const filteredInstallments = year.paidInstallments.filter(
    (item) => item.installmentNumber === installmentNum
  );

  if (filteredInstallments.length === 0) return null;

  // Calculate totals for all paid installments for this installmentNum
  let totalFeesAmount = 0;
  let totalFine = 0;
  let totalConcession = 0;
  let totalPayable = 0;
  let totalPaid = 0;
  let totalBalance = 0;

  // Group installments by receiptNumber
  const groupedByReceipt = filteredInstallments.reduce((acc, item) => {
    const receiptNumber = item.receiptNumber?.toString() || ''; // Convert to string and handle null/undefined
    if (!receiptNumber) return acc; // Skip invalid receipt numbers

    if (!acc[receiptNumber]) {
      acc[receiptNumber] = {
        items: [],
        paymentDate: item.paymentDate,
        collectorName: item.collectorName,
        paymentMode: item.paymentMode,
        transactionNumber: item.transactionNumber || '',
        bankName: item.bankName || '',
      };
    }

    const concessionItem = year.concession?.concessionDetails?.find(
      (cd) =>
        cd.installmentName === `Installment ${item.installmentNumber}` &&
        cd.feesType === item.feesTypeId?._id
    );
    const concessionAmount = concessionItem?.concessionAmount || 0;
    const fineAmount = item.fineAmount || 0;
    const feesAmount = item.amount || 0;
    const payableAmount = feesAmount - concessionAmount + fineAmount;
    const paidAmount = item.paidAmount || 0;
    const balance = item.balance || 0;

    // Update overall totals
    totalFeesAmount += feesAmount;
    totalFine += fineAmount;
    totalConcession += concessionAmount;
    totalPayable += payableAmount;
    totalPaid += paidAmount;
    totalBalance += balance;

    acc[receiptNumber].items.push({
      feesType: getFeeTypeName(item.feesTypeId?._id) || 'Unknown Fee Type',
      feesAmount,
      fineAmount,
      concessionAmount,
      payableAmount,
      paidAmount,
      balance,
    });

    return acc;
  }, {});

  // Sort receipt numbers, handling both numeric and non-numeric cases
  const sortedReceiptNumbers = Object.keys(groupedByReceipt).sort((a, b) => {
    // Try numeric comparison if possible
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB; // Numeric sort for valid numbers
    }
    // Fallback to string comparison for non-numeric receipt numbers
    return a.localeCompare(b);
  });

  const receiptData = (receiptNumber, group) => ({
    receiptNumber,
    studentName: `${formData.firstName} ${formData.lastName}`,
    studentAdmissionNumber: formData.AdmissionNumber,
    date: group.paymentDate ? new Date(group.paymentDate).toLocaleDateString() : '',
    academicYear: year.academicYear,
    className: classes.find(c => c._id === formData.masterDefineClass)?.className || '',
    section: sections.find(s => s._id === formData.section)?.name || '',
    paymentMode: group.paymentMode || '',
    transactionNumber: group.transactionNumber || '',
    bankName: group.bankName || '',
    paymentDate: group.paymentDate ? new Date(group.paymentDate).toLocaleDateString() : '',
    collectorName: group.collectorName || '',
    installments: [
      {
        number: `Installment ${installmentNum}`,
        feeItems: group.items.map(item => ({
          type: item.feesType,
          amount: item.feesAmount,
          concession: item.concessionAmount,
          fineAmount: item.fineAmount,
          payable: item.payableAmount,
          paid: item.paidAmount,
          balance: item.balance,
        })),
      },
    ],
  });

  return (
    <tr>
      <td colSpan="12">
        <div className="mt-2">
          <h6 className="text-start">
            Paid Fee Types for Installment {installmentNum}
          </h6>
          <table className="table table-bordered table-sm">
            <thead className="bg-light">
              <tr>
                <th>Receipt Number</th>
                <th>Type of Fees</th>
                <th>Fees Amount</th>
                <th>Fine</th>
                <th>Concession</th>
                <th>Fees Payable</th>
                <th>Paid Amount</th>
                <th>Balance</th>
                <th>Payment Date</th>
                <th>Collector Name</th>
                <th>Payment Mode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedReceiptNumbers.map((receiptNumber, index) => {
                const group = groupedByReceipt[receiptNumber];
                if (!group || !group.items) return null; // Skip if group or items is undefined

                return (
                  <React.Fragment key={`${year.academicYear}-${installmentNum}-paid-${receiptNumber}`}>
                    {group.items.map((item, itemIndex) => (
                      <tr key={`${year.academicYear}-${installmentNum}-paid-${receiptNumber}-${itemIndex}`}>
                        {itemIndex === 0 && (
                          <td rowSpan={group.items.length}>{receiptNumber}</td>
                        )}
                        <td>{item.feesType}</td>
                        <td>{item.feesAmount}</td>
                        <td>{item.fineAmount}</td>
                        <td>{item.concessionAmount}</td>
                        <td>{item.payableAmount}</td>
                        <td>{item.paidAmount}</td>
                        <td>{item.balance}</td>
                        {itemIndex === 0 && (
                          <>
                            <td rowSpan={group.items.length}>
                              {group.paymentDate ? new Date(group.paymentDate).toLocaleDateString() : ''}
                            </td>
                            <td rowSpan={group.items.length}>{group.collectorName || ''}</td>
                            <td rowSpan={group.items.length}>{group.paymentMode || ''}</td>
                            <td rowSpan={group.items.length}>
                              <button
                                type="button"
                                className="btn btn-sm btn-primary"
                                onClick={() => handleViewReceipt(receiptData(receiptNumber, group))}
                              >
                                View
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
              {sortedReceiptNumbers.length > 0 && (
                <tr className="fw-bold bg-light">
                  <td colSpan="1" className="text-end">Total</td>
                  <td></td>
                  <td>{totalFeesAmount}</td>
                  <td>{totalFine}</td>
                  <td>{totalConcession}</td>
                  <td>{totalPayable}</td>
                  <td>{totalPaid}</td>
                  <td>{totalBalance}</td>
                  <td colSpan="4"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
})()}
                                  </React.Fragment>
                                );
                              });
                            })
                        ) : (
                          <tr>
                            <td colSpan="11" className="text-center">
                              No unpaid installments found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="text-end my-3">
                      {!showProcessedData && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setShowProcessedData(!showProcessedData)}
                          disabled={
                            Object.values(selectedInstallments).flat().length === 0 &&
                            Object.keys(selectedFeeTypesByInstallment).length === 0
                          }
                        >
                          Processed Data
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {showProcessedData && (
                  <>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="paymentMode" className="form-label">
                            Payment Mode <span className="text-danger">*</span>
                          </label>
                          <select
                            id="paymentMode"
                            name="paymentMode"
                            className="form-control"
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
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Collector Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {formData.paymentMode === 'Cheque' && (
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="chequeNumber" className="form-label">
                              Cheque Number <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="chequeNumber"
                              name="chequeNumber"
                              className="form-control"
                              value={formData.chequeNumber}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="bankName" className="form-label">
                              Bank Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="bankName"
                              name="bankName"
                              className="form-control"
                              value={formData.bankName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-end">
                      <button
                        type="button"
                        className="btn btn-primary custom-submit-button"
                        onClick={handleFinalSubmit}
                        disabled={isGenerating}
                      >
                        {isGenerating ? 'Generating...' : 'Generate Receipt'}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolFeesReceipts;