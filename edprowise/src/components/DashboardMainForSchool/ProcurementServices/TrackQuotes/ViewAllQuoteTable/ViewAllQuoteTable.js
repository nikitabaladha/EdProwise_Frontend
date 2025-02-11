import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../../export-excel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import autoTable from "jspdf-autotable";
import { useLocation } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";

import jsPDF from "jspdf";
import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewAllQuoteTable = () => {
  const location = useLocation();
  const enquiryNumber = location.state?.enquiryNumber;

  const navigate = useNavigate();

  const [submittedQuotes, setSubmittedQuotes] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchAllQuoteData();
    fetchCartData();
  }, [enquiryNumber]);

  const fetchAllQuoteData = async () => {
    try {
      const response = await getAPI(
        `/submit-quote-by-status/${enquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data) {
        setSubmittedQuotes(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching submitted-quote:", err);
    }
  };

  const handleSubmit = async (e, quote) => {
    e.preventDefault();

    try {
      const preparedQuote = await getAPI(
        `prepare-quote?sellerId=${quote.sellerId}&enquiryNumber=${enquiryNumber}`,
        {},
        true
      );

      if (preparedQuote.hasError || !preparedQuote.data.data) {
        toast.error("Failed to fetch prepared quotes");
        return;
      }

      const cartData = preparedQuote.data.data.map((pq) => ({
        prepareQuoteId: pq._id,
      }));

      const response = await postAPI(
        "/cart",
        { enquiryNumber, products: cartData },
        true
      );

      if (!response.hasError) {
        toast.success("Cart data submitted successfully!");

        fetchCartData();
      } else {
        toast.error(response.message || "Failed to add data to cart");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await getAPI(
        `cart?enquiryNumber=${enquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data.data) {
        const cartData = response.data.data;

        const totalCount = Object.keys(cartData).length;

        setCartCount(totalCount);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };

  const navigateToViewQuote = (event, quote) => {
    event.preventDefault();

    navigate(`/school-dashboard/procurement-services/view-quote`, {
      state: {
        sellerId: quote.sellerId,
        enquiryNumber: quote.enquiryNumber,
        quote: quote,
      },
    });
  };

  const navigateToViewCart = (event, quote) => {
    event.preventDefault();

    navigate(`/school-dashboard/procurement-services/view-cart`, {
      state: {
        enquiryNumber: quote.enquiryNumber,
      },
    });
  };

  const handleExport = () => {};

  const handleDownloadPDF = (quote) => {};

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">View All Quote List</h4>
                <div className="text-end">
                  <Link
                    onClick={handleExport}
                    className="btn btn-sm btn-outline-light"
                  >
                    Export
                  </Link>

                  <Link
                    className="btn btn-light btn-sm"
                    onClick={(event) => {
                      if (submittedQuotes.length > 0) {
                        navigateToViewCart(event, submittedQuotes[0]);
                      } else {
                        toast.error("No quotes available to view cart.");
                      }
                    }}
                  >
                    <iconify-icon
                      icon="solar:cart-large-minimalistic-broken"
                      className="align-middle fs-18"
                    />
                    <span
                      className="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill"
                      style={{ top: "20px" }}
                    >
                      {cartCount}
                      <span className="visually-hidden">unread messages</span>
                    </span>
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
                              />
                              <label className="form-check-label">&nbsp;</label>
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
                                className="btn btn-light btn-sm"
                                onClick={(event) => {
                                  event.preventDefault();
                                  handleSubmit(event, quote);
                                }}
                              >
                                <iconify-icon
                                  icon="solar:cart-plus-outline"
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
      </div>
    </>
  );
};

export default ViewAllQuoteTable;
