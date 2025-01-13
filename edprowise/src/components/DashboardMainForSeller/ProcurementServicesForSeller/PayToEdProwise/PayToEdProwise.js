import React, { useState } from "react";
import { Link } from "react-router-dom";

const PayToEdProwise = () => {
  const [bankDetails] = useState([
    {
      id: 1,
      accountNo: "1234567890",
      bankName: "State Bank of India",
      ifscCode: "SBIN0001234",
      typeOfAccount: "Savings",
    },
    {
      id: 2,
      accountNo: "9876543210",
      bankName: "HDFC Bank",
      ifscCode: "HDFC0005678",
      typeOfAccount: "Current",
    },
    {
      id: 3,
      accountNo: "1122334455",
      bankName: "ICICI Bank",
      ifscCode: "ICIC0009876",
      typeOfAccount: "Savings",
    },
  ]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center gap-1">
              <h4 className="card-title flex-grow-1">EdProwise Bank List</h4>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                >
                  Pay Online
                </button>
              </div>
            </div>
            <div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th style={{ width: 20 }}>
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="selectAll"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="selectAll"
                          />
                        </div>
                      </th>
                      <th>Sr No</th>
                      <th>Account Number</th>
                      <th>Bank Name</th>
                      <th>IFSC Code</th>
                      <th>Type of Account</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankDetails.map((bankDetail, index) => (
                      <tr key={bankDetail.id}>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`customCheck${bankDetail.id}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`customCheck${bankDetail.id}`}
                            >
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>{index + 1}</td>
                        <td>{bankDetail.accountNo}</td>
                        <td>{bankDetail.bankName}</td>
                        <td>{bankDetail.ifscCode}</td>
                        <td>{bankDetail.typeOfAccount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* end table-responsive */}
            </div>
          </div>
          {/* end card */}
        </div>
        {/* end col */}
      </div>
      {/* end row */}
    </div>
  );
};

export default PayToEdProwise;
