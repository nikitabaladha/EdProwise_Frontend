import React from "react";
import { useLocation } from "react-router-dom";

const ViewPreparedQuote = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <div>No Prepared details available.</div>;
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
                    View Prepared Quote
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="slNo" className="form-label">
                      Serial Number
                    </label>
                    <p className="form-control">{product.slNo}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <p className="form-control">{product.description}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="hsnSaac" className="form-label">
                      HSN/SAC Code
                    </label>
                    <p className="form-control">{product.hsnSaac}</p>
                  </div>
                </div>
              </div>

              {/* Additional Fields */}
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="listingRate" className="form-label">
                      Listing Rate
                    </label>
                    <p className="form-control">{product.listingRate}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="edProwiseMargin" className="form-label">
                      ED Prowise Margin
                    </label>
                    <p className="form-control">{product.edProwiseMargin}</p>
                  </div>
                </div>
                <div className="col-md-4">
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
                    <label htmlFor="unitPrice" className="form-label">
                      Final Rate Before Discount{" "}
                    </label>
                    <p className="form-control">
                      {product.finalRateBeforeDiscount}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="discount" className="form-label">
                      Discount Percentage
                    </label>
                    <p className="form-control">{product.discountPercentage}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="gst" className="form-label">
                      Final Rate
                    </label>
                    <p className="form-control">{product.finalRate}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="netAmount" className="form-label">
                      Taxable Value
                    </label>
                    <p className="form-control">{product.taxableValue}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="validity" className="form-label">
                      CGST Rate
                    </label>
                    <p className="form-control">{product.cgstRate}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="deliveryTimeline" className="form-label">
                      CGST Amount
                    </label>
                    <p className="form-control">{product.cgstAmount}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      SGST Rate
                    </label>
                    <p className="form-control">{product.sgstRate}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      SGST Amount
                    </label>
                    <p className="form-control">{product.sgstAmount}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      IGST Rate
                    </label>
                    <p className="form-control">{product.igstRate}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      IGST Amount
                    </label>
                    <p className="form-control">{product.igstAmount}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      Discount Amount
                    </label>
                    <p className="form-control">{product.discountAmount}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      GST Amount
                    </label>
                    <p className="form-control">{product.gstAmount}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      Amount Before GST and Discount{" "}
                    </label>
                    <p className="form-control">
                      {product.amountBeforeGSTAndDiscount}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      Total Amount
                    </label>
                    <p className="form-control">{product.totalAmount}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">
                      Product Images
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPreparedQuote;
