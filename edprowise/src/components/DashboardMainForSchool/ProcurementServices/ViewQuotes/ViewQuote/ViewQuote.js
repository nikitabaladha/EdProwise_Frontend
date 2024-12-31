import React from "react";
import { useLocation } from "react-router-dom";

const ViewQuote = () => {
  const location = useLocation();
  const quote = location.state?.quote;

  if (!quote) {
    return <div>No quote details available.</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Quote Details
                  </h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="supplierName" className="form-label">
                      Supplier Name
                    </label>
                    <p className="form-control">{quote.nameOfSupplier}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfQuoteSubmitted"
                      className="form-label"
                    >
                      Date of Quote Submitted
                    </label>
                    <p className="form-control">{quote.dateOfQuoteSubmitted}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label
                      htmlFor="expectedDeliveryDate"
                      className="form-label"
                    >
                      Expected Delivery Date
                    </label>
                    <p className="form-control">{quote.expectedDeliveryDate}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="quotedAmount" className="form-label">
                      Quoted Amount
                    </label>
                    <p className="form-control">{quote.quotedAmount}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label
                      htmlFor="advancesRequiredAmount"
                      className="form-label"
                    >
                      Advances Required Amount
                    </label>
                    <p className="form-control">
                      {quote.advancesRequiredAmount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="commentFromBuyer" className="form-label">
                      Comment from Buyer
                    </label>
                    <p className="form-control">{quote.commentFromBuyer}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="remarksFromSupplier" className="form-label">
                      Remarks from Supplier
                    </label>
                    <p className="form-control">{quote.remarksFromSupplier}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <p className="form-control">{quote.description}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="paymentTerms" className="form-label">
                      Payment Terms
                    </label>
                    <p className="form-control">{quote.paymentTerms}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="placeOrder" className="form-label">
                      Place Order Status
                    </label>
                    <p className="form-control">{quote.placeOrder}</p>
                  </div>
                </div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuote;
