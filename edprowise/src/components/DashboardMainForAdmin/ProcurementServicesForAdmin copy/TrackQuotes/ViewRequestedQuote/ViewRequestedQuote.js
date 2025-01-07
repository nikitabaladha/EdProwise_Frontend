import React from "react";
import { useLocation } from "react-router-dom";

const ViewRequestedQuote = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <div>No product details available.</div>;
  }

  console.log("Product view", product);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Requested Quote Details
                  </h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">
                      Product Image
                    </label>
                    <div>
                      <img
                        src={product.imageUrl}
                        alt="Product"
                        className="img-fluid"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="enquiryNo" className="form-label">
                      Enquiry Number
                    </label>
                    <p className="form-control">{product.enquiryNo}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="enquiryNo" className="form-label">
                      Name Of Buyer
                    </label>
                    <p className="form-control">{product.nameOfBuyer}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label">
                      Product Name
                    </label>
                    <p className="form-control">{product.subCategory}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">
                      Product Description
                    </label>
                    <p className="form-control">{product.productDescription}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="unit" className="form-label">
                      Unit
                    </label>
                    <p className="form-control">{product.unit}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="qty" className="form-label">
                      Quantity
                    </label>
                    <p className="form-control">{product.qty}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="quoteRequestedDate" className="form-label">
                      Quote Requested Date
                    </label>
                    <p className="form-control">{product.quoteRequestedDate}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label
                      htmlFor="deliveryExpectedDate"
                      className="form-label"
                    >
                      Delivery Expected Date
                    </label>
                    <p className="form-control">
                      {product.deliveryExpectedDate}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <p className="form-control">{product.status}</p>
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

export default ViewRequestedQuote;
