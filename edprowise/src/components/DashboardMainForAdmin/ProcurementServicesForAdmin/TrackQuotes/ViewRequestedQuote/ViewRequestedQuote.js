import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { exportToExcel } from "../../../../export-excel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

import getAPI from "../../../../../api/getAPI";

import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  //Otherwise, format the date string using the format function and return the formatted date string
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewRequestedQuote = () => {
  const location = useLocation();
  const enquiryNumber = location.state?.enquiryNumber;

  const navigate = useNavigate();

  const [quote, setQuote] = useState([]);

  useEffect(() => {
    if (!enquiryNumber) return;
    const fetchQuoteData = async () => {
      try {
        const response = await getAPI(`/get-quote/${enquiryNumber}`, {}, true);

        if (!response.hasError && response.data.data.products) {
          setQuote(response.data.data.products);
          console.log(
            "product data from function",
            response.data.data.products
          );
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchQuoteData();
  }, [enquiryNumber]);

  const [isQuoteTableVisible, setIsQuoteTableVisible] = useState(false);

  const navigateToViewQuote = (event, quote) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/view-quote`, {
      state: { quote },
    });
  };

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
                                <img
                                  className="avatar-md"
                                  alt={product.subCategoryName}
                                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${product?.productImage}`}
                                />
                              )}
                              <Link className="text-dark fw-medium">
                                {product.subCategoryName}
                              </Link>
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

              <div className="d-flex justify-content-between mt-2">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={() => setIsQuoteTableVisible(!isQuoteTableVisible)}
                >
                  {isQuoteTableVisible ? "Hide Quote" : "View Quote"}
                </button>
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

      {isQuoteTableVisible && quote.length > 0 ? (
        <div className="row p-2">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1"> All Quote List</h4>
                <div className="text-end">
                  <Link
                    // onClick={(event) => handleExport(event)}
                    className="btn btn-sm btn-outline-light"
                  >
                    Export
                  </Link>
                </div>
              </div>
              <div>
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
                        <th>Name of Supplier</th>
                        <th>Date Of QuoteSubmitted</th>
                        <th>Quoted Amount</th>
                        <th>Description</th>
                        <th>Remarks From Supplier</th>
                        <th>Expected Delivery Date</th>
                        <th>Payment Terms</th>
                        <th>Advances Required Amount</th>
                        <th>Status</th>
                        <th>Place Order Status</th>
                        <th>Comment From Buyer</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {quotes.map((quote) => (
                        <tr key={quote.id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`customCheck${quote.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${quote.id}`}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{quote.nameOfSupplier}</td>
                          <td>{quote.dateOfQuoteSubmitted}</td>
                          <td>{quote.quotedAmount}</td>
                          <td>{quote.description}</td>
                          <td>{quote.remarksFromSupplier}</td>
                          <td>{quote.expectedDeliveryDate}</td>
                          <td>{quote.paymentTerms}</td>
                          <td>{quote.advancesRequiredAmount}</td>
                          <td>{quote.status}</td>
                          <td>{quote.placeOrderStatus}</td>
                          <td>{quote.commentFromBuyer}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(event) =>
                                  handleDownloadPDF(event, quote)
                                }
                                className="btn btn-soft-info btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:download-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>

                              <Link
                                className="btn btn-success btn-sm"
                                onClick={(event) => showSuccessMessage(event)}
                              >
                                Accept
                              </Link>
                              <Link
                                className="btn btn-danger btn-sm"
                                onClick={(event) => showErrorMessage(event)}
                              >
                                Reject
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row"></div>
      )}
    </div>
  );
};

export default ViewRequestedQuote;
