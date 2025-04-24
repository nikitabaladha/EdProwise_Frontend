import React from "react";
import useSchoolFeesReceipts from "./SchoolFeesReceiptsdata";

const SchoolFeesReceipts = () => {
  const {
    formData,
    handleChange,
    handleAdmissionSubmit,
    existingStudents,
    classes,
    sections,
    feeData,
    selectedAcademicYear,
    selectAll,
    setSelectAll,
    setCurrentInstallment,
    totalInstallments,
    selectedInstallments,
    handleAcademicYearSelect,
    getFeeTypeName,
    getInstallmentData,
    calculatePayFees,
    handleInstallmentSelection,
    handleFeeTypeSelection,
    handleFinalSubmit,
    isGenerating,
    showFullForm,
    setShowSecondTable,
    showSecondTable,
    showProcessedData,
    setShowProcessedData,
    selectedFeeTypesByInstallment,
    handlePaidAmountChange,
  } = useSchoolFeesReceipts();

  if (!showFullForm) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      School Fees
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleAdmissionSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="AdmissionNumber" className="form-label">
                          Admission No
                        </label>
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
                        <datalist id="AdmissionNumbers">
                          {existingStudents.map((student, index) => (
                            <option key={index} value={student.AdmissionNumber}>
                              {student.AdmissionNumber} - {student.firstName}{" "}
                              {student.lastName}
                            </option>
                          ))}
                        </datalist>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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
                        <p className="form-control">
                          {formData.AdmissionNumber}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Student Name</label>
                        <p className="form-control">
                          {formData.firstName} {formData.lastName}
                        </p>
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
                    <hr></hr>
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                      <thead className="bg-light-subtle">
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={selectAll}
                              onChange={() => setSelectAll(!selectAll)}
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
                        {feeData?.concession?.applicableAcademicYear ? (
                          <tr
                            className={
                              selectedAcademicYear ===
                              feeData.concession.applicableAcademicYear
                                ? "table-primary"
                                : ""
                            }
                            onClick={() =>
                              handleAcademicYearSelect(
                                feeData.concession.applicableAcademicYear
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <td>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={
                                  selectedAcademicYear ===
                                    feeData.concession.applicableAcademicYear ||
                                  selectAll
                                }
                                onChange={() =>
                                  handleAcademicYearSelect(
                                    feeData.concession.applicableAcademicYear
                                  )
                                }
                              />
                            </td>
                            <td>{feeData.concession.applicableAcademicYear}</td>
                            <td>{totalInstallments.length}</td>
                            <td>{feeData.totals.totalFeesAmount}</td>
                            <td>{feeData.totals.totalConcession}</td>
                            <td>{feeData.totals.totalFine}</td>
                            <td>{parseInt(calculatePayFees())}</td>
                            <td>{feeData.totals.totalFeesPayable}</td>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan="8">No academic year data available</td>
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
                        disabled={!selectedAcademicYear && !selectAll}
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
                        Installments
                      </h4>
                    </div>
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                      <thead className="bg-light-subtle">
                        <tr>
                          <th>Select</th>
                          <th>Installment</th>
                          <th>Type Of Fees</th>
                          <th>Due Date</th>
                          <th>Fees Amount</th>
                          <th>Fine</th>
                          <th>Concession</th>
                          <th>Fees Payable</th>
                          <th>Paid Amount</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {totalInstallments.length === 0 && (
                          <tr>
                            <td colSpan="10" className="text-center">
                              No fee data found for any installments
                            </td>
                          </tr>
                        )}
                        {totalInstallments.map((installmentNum) => {
                          const installmentData =
                            getInstallmentData(installmentNum);

                          if (!installmentData.length) return null;

                          return (
                            <React.Fragment key={installmentNum}>
                              {installmentData.map((item, index) => {
                                const concessionItem =
                                  feeData.concession?.concessionDetails?.find(
                                    (cd) =>
                                      cd.installmentName ===
                                        item.installmentName &&
                                      cd.feesType === item.feesTypeId._id
                                  );

                                const concessionAmount =
                                  concessionItem?.concessionAmount || 0;
                                const payableAmount =
                                  item.amount - concessionAmount;
                                const fineAmount = item.fineAmount || 0;
                                const totalPayable = payableAmount + fineAmount;
                                const paidAmount = item.paidAmount || 0;
                                const balance = totalPayable - paidAmount;

                                return (
                                  <tr key={`${installmentNum}-${index}`}>
                                    {index === 0 && (
                                      <>
                                        <td rowSpan={installmentData.length}>
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={selectedInstallments.includes(
                                              installmentNum
                                            )}
                                            onChange={() =>
                                              handleInstallmentSelection(
                                                installmentNum
                                              )
                                            }
                                          />
                                        </td>
                                        <td rowSpan={installmentData.length}>
                                          Installment {installmentNum}
                                        </td>
                                      </>
                                    )}
                                    <td
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={(
                                          selectedFeeTypesByInstallment[
                                            installmentNum
                                          ] || []
                                        ).includes(item.feesTypeId._id)}
                                        onChange={() =>
                                          handleFeeTypeSelection(
                                            installmentNum,
                                            item.feesTypeId._id
                                          )
                                        }
                                      />
                                      <span style={{ marginLeft: "10px" }}>
                                        {getFeeTypeName(item.feesTypeId._id) ||
                                          "Fee Type Not Found"}
                                      </span>
                                    </td>
                                    <td>
                                      {new Date(
                                        item.dueDate
                                      ).toLocaleDateString()}
                                    </td>
                                    <td>{item.amount}</td>
                                    <td>{fineAmount}</td>
                                    <td>{concessionAmount}</td>
                                    <td>{totalPayable}</td>
                                    <td>
                                      <input
                                        // type="number"
                                        className="form-control form-control-sm"
                                        value={paidAmount}
                                        onChange={(e) =>
                                          handlePaidAmountChange(
                                            installmentNum,
                                            item.feesTypeId._id,
                                            parseFloat(e.target.value)
                                          )
                                        }
                                        min="0"
                                        max={totalPayable}
                                      />
                                    </td>
                                    <td>{balance}</td>
                                  </tr>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="text-end my-3">
                      {!showProcessedData && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            setShowProcessedData(!showProcessedData)
                          }
                          disabled={selectedInstallments.length === 0}
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
                            <option value="Online Transfer">
                              Online Transfer
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Collector Name{" "}
                            <span className="text-danger">*</span>
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

                    {formData.paymentMode === "Cheque" && (
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="chequeNumber"
                              className="form-label"
                            >
                              Cheque Number{" "}
                              <span className="text-danger">*</span>
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
                        {isGenerating ? "Generating..." : "Generate Receipt"}
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
