import React, { useState } from "react";

const PayToEdProwise = () => {
  const [bankDetails] = useState({
    accountNo: "1234567890",
    bankName: "ABC Bank",
    ifscCode: "ABCDO12345",
    accountType: "Current",
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Details of EdProwise Bank Account
                  </h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="accountNo" className="form-label">
                      Account No.
                    </label>
                    <p className="form-control">{bankDetails.accountNo}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="bankName" className="form-label">
                      Bank Name
                    </label>
                    <p className="form-control">{bankDetails.bankName}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="ifscCode" className="form-label">
                      IFSC Code
                    </label>
                    <p className="form-control">{bankDetails.ifscCode}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="accountType" className="form-label">
                      Type of Account
                    </label>
                    <p className="form-control">{bankDetails.accountType}</p>
                  </div>
                </div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                >
                  Pay Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayToEdProwise;
