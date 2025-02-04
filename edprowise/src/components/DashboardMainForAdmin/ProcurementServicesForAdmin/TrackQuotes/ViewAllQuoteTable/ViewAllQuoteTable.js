import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../../export-excel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import autoTable from "jspdf-autotable";
import { useLocation } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";

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

  useEffect(() => {
    if (!enquiryNumber) return;
    const fetchQuoteData = async () => {
      try {
        const response = await getAPI(
          `/submit-quote/${enquiryNumber}`,
          {},
          true
        );

        if (!response.hasError && response.data) {
          setSubmittedQuotes(response.data.data);

          console.log("submitted quote data 123456", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching submitted-quote:", err);
      }
    };

    fetchQuoteData();
  }, [enquiryNumber]);

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

  const handleExport = () => {};

  const handleDownloadPDF = (quote) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Quote Details", 14, 20);

    // Add quote details to the PDF
    autoTable(doc, {
      head: [["Field", "Value"]],
      body: [
        ["Supplier Name", quote.nameOfSupplier],
        ["Date of Quote Submitted", quote.dateOfQuoteSubmitted],
        ["Expected Delivery Date", quote.expectedDeliveryDate],
        ["Quoted Amount", quote.quotedAmount],
        ["Description", quote.description],
        ["Remarks from Supplier", quote.remarksFromSupplier],
        ["Payment Terms", quote.paymentTerms],
        ["Advances Required Amount", quote.advancesRequiredAmount],
        ["Place Order Status", quote.placeOrder],
        ["Comment from Buyer", quote.commentFromBuyer],
        ["Status", quote.status],
      ],
    });

    doc.save(`Quote_${quote.id}.pdf`);
  };

  const showSuccessMessage = () => {
    toast.success("Order Placed Successfully!");
  };

  const showErrorMessage = () => {
    toast.error("Quote Rejected!");
  };

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
