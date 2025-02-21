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
  const [preparedQuotes, setPreparedQuotes] = useState([]);
  const [selectedQuotes, setSelectedQuotes] = useState([]);

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchAllQuoteData();
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

  const fetchAllPreparedQuoteData = async (sellerId) => {
    try {
      const response = await getAPI(
        `prepare-quote?sellerId=${sellerId}&enquiryNumber=${enquiryNumber}`,
        {},
        true
      );
      if (!response.hasError && response.data.data) {
        setPreparedQuotes((prev) => [...prev, ...response.data.data]);
      } else {
        console.error("Error fetching prepared quotes");
      }
    } catch (err) {
      console.error("Error fetching prepared-quote:", err);
    }
  };

  const handleCheckboxChange = (quote) => {
    const isChecked = selectedQuotes.some((q) => q.sellerId === quote.sellerId);
    if (isChecked) {
      setSelectedQuotes(
        selectedQuotes.filter((q) => q.sellerId !== quote.sellerId)
      );
    } else {
      setSelectedQuotes([...selectedQuotes, quote]);
      fetchAllPreparedQuoteData(quote.sellerId);
    }
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit clicked");
    e.preventDefault();

    if (selectedQuotes.length === 0) {
      toast.error("No quotes selected!");
      return;
    }

    try {
      const cartData = [];

      for (const quote of selectedQuotes) {
        const preparedQuote = preparedQuotes.filter(
          (pq) => pq.sellerId === quote.sellerId
        );

        preparedQuote.forEach((pq) => {
          cartData.push({
            prepareQuoteId: pq._id,
          });
        });
      }

      const uniqueCartData = Array.from(
        new Map(cartData.map((item) => [item.prepareQuoteId, item])).values()
      );

      const enquiryNumber = selectedQuotes[0].enquiryNumber;

      const response = await postAPI(
        "/cart",
        { enquiryNumber, products: uniqueCartData },
        true
      );

      if (!response.hasError) {
        toast.success("Cart data submitted successfully!");
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to add data to cart");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred."
      );
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

  const handleExport = () => {};

  const handleDownloadPDF = (quote) => {};

  return (
    <>
      <div className="container-fluid">
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
                      event.preventDefault();
                      handleSubmit(event);
                    }}
                  >
                    <iconify-icon
                      icon="solar:cart-check-broken"
                      className="align-middle fs-18"
                    />
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
                                checked={selectedQuotes.some(
                                  (q) => q.sellerId === quote.sellerId
                                )}
                                onChange={() => handleCheckboxChange(quote)}
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
                              {/* {quote.venderStatus === "Pending" && (
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
                              )} */}
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
