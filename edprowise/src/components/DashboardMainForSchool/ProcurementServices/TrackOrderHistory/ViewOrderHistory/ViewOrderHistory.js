import { format } from "date-fns";

import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewOrderHistory = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const order = location.state?.order;
  const enquiryNumber = location.state?.enquiryNumber;

  console.log("enquiry number from view order history", enquiryNumber);

  const handleNavigation = () => {
    navigate("/school-dashboard/procurement-services/pay-to-edprowise");
  };

  const [quote, setQuote] = useState([]);

  useEffect(() => {
    if (!enquiryNumber) return;

    fetchRequestedQuoteData();
  }, [enquiryNumber]);

  const fetchRequestedQuoteData = async () => {
    try {
      const response = await getAPI(`/get-quote/${enquiryNumber}`, {}, true);

      if (!response.hasError && response.data.data.products) {
        setQuote(response.data.data.products);
        console.log("product data from function", response.data.data.products);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  if (!order) {
    return <div>No order details available.</div>;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Order Details
                    </h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="orderNumber" className="form-label">
                        Order Number
                      </label>
                      <p className="form-control">{order.orderNumber}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="nameOfSupplier" className="form-label">
                        Name Of Supplier
                      </label>
                      <p className="form-control">{order.companyName}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="dateOfQuoteSubmitted"
                        className="form-label"
                      >
                        Order Date
                      </label>
                      <p className="form-control">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="finalPayableAmount"
                        className="form-label"
                      >
                        Status
                      </label>
                      <p className="form-control">{order.supplierStatus}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="expectedDeliveryDate"
                        className="form-label"
                      >
                        Expected Delivery Date
                      </label>
                      <p className="form-control">
                        {formatDate(order.expectedDeliveryDate)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="actualDeliveryDate"
                        className="form-label"
                      >
                        Actual Delivery Date
                      </label>
                      <p className="form-control">
                        {order.actualDeliveryDate
                          ? formatDate(order.actualDeliveryDate)
                          : "Null"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="invoice" className="form-label">
                    Download Invoice
                  </label>
                  <div className="form-control p-0">
                    <a
                      href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                      download="Invoice.pdf"
                      className="btn btn-link"
                    >
                      <i className="bi bi-download"></i> Download Invoice
                    </a>
                  </div>
                </div>
              </div> */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="invoiceAmountToBuyer"
                        className="form-label"
                      >
                        Invoice Amount
                      </label>
                      <p className="form-control">
                        {order.totalAmountBeforeGstAndDiscount}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="advanceAdjustment" className="form-label">
                        Advance Adjustment
                      </label>
                      <p className="form-control">{order.advanceAdjustment}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="commentFromBuyer" className="form-label">
                        TDS/Any Other Deduction
                      </label>
                      <p className="form-control">{order.tdsDeduction}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="finalPayableAmount"
                        className="form-label"
                      >
                        Final Payable Amt
                      </label>
                      <p className="form-control">{order.finalPayableAmount}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="text-end">
              <button
                type="button"
                className="btn btn-primary custom-submit-button"
                onClick={handleNavigation}
              >
                Pay to EdProwise
              </button>
              <button
                type="button"
                className="btn btn-primary custom-submit-button"
                onClick={handleNavigation}
              >
                Download Invoice
              </button>
            </div> */}

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                  >
                    Download Invoice
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={handleNavigation}
                  >
                    Pay to EdProwise
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
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
                        <th>Enquiry No.</th>
                        <th>Product Required Image & Name</th>
                        <th>Product Required (Category)</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Status</th>
                        <th>Product Description</th>
                        <th>Quote Requested Date</th>
                        <th>Delivery Expected Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quote.length > 0 ? (
                        quote.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`customCheck${product.id}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`customCheck${product.id}`}
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>{product.enquiryNumber}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {product.productImage && (
                                  <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                    <img
                                      className="avatar-md"
                                      alt={product.subCategoryName}
                                      src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${product?.productImage}`}
                                    />
                                  </div>
                                )}
                                <div>
                                  <Link className="text-dark fw-medium">
                                    {product.subCategoryName}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>{product.categoryName}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unit}</td>
                            <td>{product.buyerStatus}</td>
                            <td>{product.description}</td>
                            <td>{formatDate(product.createdAt)}</td>
                            <td>{formatDate(product.expectedDeliveryDate)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* end table-responsive */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrderHistory;
