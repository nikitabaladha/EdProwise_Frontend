import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { exportToExcel } from "../../../../export-excel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

import postAPI from "../../../../../api/postAPI";

import getAPI from "../../../../../api/getAPI";

import ViewAllQuoteTable from "../ViewAllQuoteTable/ViewAllQuoteTable";

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
        <ViewAllQuoteTable />
      ) : (
        <div className="row"></div>
      )}
    </div>
  );
};

export default ViewRequestedQuote;
