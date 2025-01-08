import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ViewSubmittedQuote = () => {
  const location = useLocation();
  const product = location.state?.product;
  console.log("Product from view submitted quote", product);

  //   {
  //     "id": 1,
  //     "dateOfQuoteSubmitted": "2023-12-01",
  //     "quotedAmount": "1000",
  //     "remarksFromSupplier": "XYZ",
  //     "expectedDeliveryDateMentionedBySeller": "2023-12-01",
  //     "paymentTerms": "XYZ",
  //     "advancesRequiredAmount": "500"
  // }

  const navigate = useNavigate();

  const navigateToPrepareQuote = (event) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/prepare-quote`);
  };

  if (!product) {
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
                    Submitted Quote Details
                  </h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfQuoteSubmitted"
                      className="form-label"
                    >
                      Date of Quote Submitted
                    </label>
                    <p className="form-control">
                      {product.dateOfQuoteSubmitted}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="expectedDeliveryDate"
                      className="form-label"
                    >
                      Quoted Amount
                    </label>
                    <p className="form-control">{product.quotedAmount}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="supplierName" className="form-label">
                      Remarks From Supplier
                    </label>
                    <p className="form-control">
                      {product.remarksFromSupplier}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfQuoteSubmitted"
                      className="form-label"
                    >
                      Expected Delivery Date (Mentioned By Seller)
                    </label>
                    <p className="form-control">
                      {product.expectedDeliveryDateMentionedBySeller}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="supplierName" className="form-label">
                      Payment Terms
                    </label>
                    <p className="form-control">{product.paymentTerms}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfQuoteSubmitted"
                      className="form-label"
                    >
                      Advance RequiredAmount
                    </label>
                    <p className="form-control">
                      {product.advancesRequiredAmount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={(event) => navigateToPrepareQuote(event)}
                  title="Submit"
                  data-bs-toggle="popover"
                  data-bs-trigger="hover"
                >
                  Prepare Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubmittedQuote;
