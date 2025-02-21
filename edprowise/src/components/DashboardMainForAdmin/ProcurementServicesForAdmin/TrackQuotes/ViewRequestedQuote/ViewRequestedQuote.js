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
import putAPI from "../../../../../api/putAPI";

import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewRequestedQuote = () => {
  const location = useLocation();
  const enquiryNumber = location.state?.enquiryNumber;

  const navigate = useNavigate();

  const [quote, setQuote] = useState([]);

  const [isQuoteTableVisible, setIsQuoteTableVisible] = useState(false);

  const [submittedQuotes, setSubmittedQuotes] = useState([]);

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchRequestedQuoteData();
    fetchAllQuoteData();
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

  const fetchAllQuoteData = async () => {
    try {
      const response = await getAPI(`/submit-quote/${enquiryNumber}`, {}, true);

      if (!response.hasError && response.data) {
        setSubmittedQuotes(response.data.data);
        console.log("submitted quote data", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching submitted-quote:", err);
    }
  };

  const handleVenderStatusUpdate = async (sellerId, newStatus) => {
    console.log("New Status:", newStatus);

    try {
      const response = await putAPI(
        `/update-vender-status?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`,
        { venderStatus: newStatus },
        true
      );

      if (!response.hasError) {
        toast.success(`Quote status updated to "${newStatus}" successfully!`);
        fetchAllQuoteData();
      } else {
        toast.error(response.message || "Failed to update vender status");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const navigateToViewQuote = (event, quote) => {
    event.preventDefault();

    navigate(`/admin-dashboard/procurement-services/view-quote`, {
      state: {
        sellerId: quote.sellerId,
        enquiryNumber: quote.enquiryNumber,
        quote: quote,
      },
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
                        <th>Expected Delivery Date (Mention by Seller)</th>
                        <th>Quoted Amount</th>
                        <th>Remarks from Supplier</th>
                        <th>Vender Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submittedQuotes.map((quote) => (
                        <tr key={quote._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`customCheck${quote._id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${quote._id}`}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{quote.companyName}</td>
                          <td>
                            {formatDate(quote.expectedDeliveryDateBySeller)}
                          </td>
                          <td>{quote.quotedAmount}</td>
                          <td>{quote.remarksFromSupplier}</td>
                          <td>{quote.venderStatus}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(event) =>
                                  navigateToViewQuote(event, quote)
                                }
                                className="btn btn-light btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                // onClick={(event) =>
                                //   handleDownloadPDF(event, quote)
                                // }
                                className="btn btn-soft-info btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:download-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              {quote.venderStatus === "Pending" && (
                                <>
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() =>
                                      handleVenderStatusUpdate(
                                        quote.sellerId,
                                        "Quote Accepted"
                                      )
                                    }
                                  >
                                    Accept
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      handleVenderStatusUpdate(
                                        quote.sellerId,
                                        "Quote Not Accepted"
                                      )
                                    }
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {quote.venderStatus === "Quote Accepted" && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    handleVenderStatusUpdate(
                                      quote.sellerId,
                                      "Quote Not Accepted"
                                    )
                                  }
                                >
                                  Reject
                                </button>
                              )}
                              {quote.venderStatus === "Quote Not Accepted" && (
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() =>
                                    handleVenderStatusUpdate(
                                      quote.sellerId,
                                      "Quote Accepted"
                                    )
                                  }
                                >
                                  Accept
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* end table-responsive */}
              </div>
              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <Link className="page-link">Previous</Link>
                    </li>
                    <li className="page-item active">
                      <Link className="page-link">1</Link>
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
      ) : (
        <div className="row"></div>
      )}
    </div>
  );
};

export default ViewRequestedQuote;
