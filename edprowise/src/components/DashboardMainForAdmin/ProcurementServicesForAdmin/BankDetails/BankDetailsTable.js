import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";

const BankDetailsTable = () => {
  const navigate = useNavigate();

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
    {
      id: 4,
      accountNo: "2233445566",
      bankName: "Axis Bank",
      ifscCode: "UTIB0006543",
      typeOfAccount: "Current",
    },
    {
      id: 5,
      accountNo: "5566778899",
      bankName: "Bank of Baroda",
      ifscCode: "BARB0IND123",
      typeOfAccount: "Savings",
    },
  ]);

  const handleExport = () => {
    const filteredData = bankDetails.map((bankDetail) => ({
      AccountNo: bankDetail.accountNo,
      BankName: bankDetail.bankName,
      IFSCCode: bankDetail.ifscCode,
      TypeOfAccount: bankDetail.typeOfAccount,
    }));

    exportToExcel(filteredData, "BankDetails", "Bank Detail Data");
  };

  const navigateToAddNewBankDetail = (event) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/add-bank-detail`);
  };

  const navigateToUpdateBankDetail = (event, bankDetail) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/update-bank-detail`, {
      state: { bankDetail },
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All Bank Details</h4>
                <Link
                  onClick={(event) => navigateToAddNewBankDetail(event)}
                  className="btn btn-sm btn-primary"
                >
                  Add New Bank Detail
                </Link>

                <div className="text-end">
                  <Link
                    onClick={handleExport}
                    className="btn btn-sm btn-outline-light"
                  >
                    Export
                  </Link>
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
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            />
                          </div>
                        </th>
                        <th>Account No.</th>
                        <th>Bank Name</th>
                        <th>IFSC Code</th>
                        <th>Type of Account</th>
                        <th className="text-start">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bankDetails.map((bankDetail) => (
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
                          <td>{bankDetail.accountNo}</td>
                          <td>{bankDetail.bankName}</td>
                          <td>{bankDetail.ifscCode}</td>
                          <td>{bankDetail.typeOfAccount}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(event) =>
                                  navigateToUpdateBankDetail(event, bankDetail)
                                }
                                className="btn btn-soft-primary btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link className="btn btn-soft-danger btn-sm">
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <Link className="page-link">Previous</Link>
                    </li>
                    <li className="page-item active">
                      <Link
                        className="page-link"
                        style={{ backgroundColor: "red", borderColor: "red" }}
                      >
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link">2</Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link">3</Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link">Next</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankDetailsTable;
