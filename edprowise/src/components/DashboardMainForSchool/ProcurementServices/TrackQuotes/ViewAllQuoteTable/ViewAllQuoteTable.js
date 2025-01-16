import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../../export-excel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import autoTable from "jspdf-autotable";

import jsPDF from "jspdf";

const ViewAllQuoteTable = () => {
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState([
    {
      id: 1,
      nameOfSupplier: "Supplier A",
      dateOfQuoteSubmitted: "2023-12-01",
      quotedAmount: "₹500.00",
      description: "This is a test description for the quote from Supplier A.",
      remarksFromSupplier: "Ready for delivery",
      expectedDeliveryDate: "2023-12-05",
      paymentTerms: "50% upfront, 50% on delivery",
      advancesRequiredAmount: "₹100.00",
      placeOrder: "Quote Accepted",
      commentFromBuyer: "Check quality before accepting",
      status: "Quote Received",
    },
    {
      id: 2,
      nameOfSupplier: "Supplier B",
      dateOfQuoteSubmitted: "2023-12-02",
      quotedAmount: "₹750.00",
      description: "This is a test description for the quote from Supplier B.",
      remarksFromSupplier: "Pending confirmation",
      expectedDeliveryDate: "2023-12-10",
      paymentTerms: "Full payment upon delivery",
      advancesRequiredAmount: "₹150.00",
      placeOrder: "Quote Pending",
      commentFromBuyer: "Need to negotiate price",
      status: "Quote Received",
    },
    {
      id: 3,
      nameOfSupplier: "Supplier C",
      dateOfQuoteSubmitted: "2023-12-03",
      quotedAmount: "₹300.00",
      description: "This is a test description for the quote from Supplier C.",
      remarksFromSupplier: "Available stock",
      expectedDeliveryDate: "2023-12-15",
      paymentTerms: "30% upfront, 70% on delivery",
      advancesRequiredAmount: "₹50.00",
      placeOrder: "Quote Accepted",
      commentFromBuyer: "Confirm delivery date",
      status: "Quote Received",
    },
    {
      id: 4,
      nameOfSupplier: "Supplier D",
      dateOfQuoteSubmitted: "2023-12-04",
      quotedAmount: "₹1,200.00",
      description: "This is a test description for the quote from Supplier D.",
      remarksFromSupplier: "In production",
      expectedDeliveryDate: "2023-12-20",
      paymentTerms: "50% upfront, 50% after inspection",
      advancesRequiredAmount: "₹200.00",
      placeOrder: "Quote Accepted",
      commentFromBuyer: "Ensure timely delivery",
      status: "Quote Received",
    },
    {
      id: 5,
      nameOfSupplier: "Supplier E",
      dateOfQuoteSubmitted: "2023-12-05",
      quotedAmount: "₹1,000.00",
      description: "This is a test description for the quote from Supplier E.",
      remarksFromSupplier: "Ready for shipment",
      expectedDeliveryDate: "2023-12-25",
      paymentTerms: "Full payment before shipment",
      advancesRequiredAmount: "₹250.00",
      placeOrder: "Quote Pending",
      commentFromBuyer: "Review terms before acceptance",
      status: "Quote Received",
    },
  ]);

  const navigateToViewQuote = (event, quote) => {
    event.preventDefault();
    navigate(`/school-dashboard/procurement-services/view-quote`, {
      state: { quote },
    });
  };

  const handleExport = () => {
    const filteredData = quotes.map((quote) => ({
      "Supplier Name": quote.nameOfSupplier,
      "Date of Quote Submitted": quote.dateOfQuoteSubmitted,
      "Expected Delivery Date": quote.expectedDeliveryDate,
      "Quoted Amount": quote.quotedAmount,
      Description: quote.description,
      "Remarks from Supplier": quote.remarksFromSupplier,
      "Payment Terms": quote.paymentTerms,
      "Advances Required Amount": quote.advancesRequiredAmount,
      "Place Order Status": quote.placeOrder,
      "Comment from Buyer": quote.commentFromBuyer,
    }));

    exportToExcel(filteredData, "Quotes", "Quotes Data");
  };

  const handleDownloadPDF = (quote) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Quote Details", 14, 20);

    // Add quote details to the PDF
    autoTable(doc, {
      head: [["Field", "Value"]],
      body: [
        ["Name Of Supplier", quote.nameOfSupplier],
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

  if (!quotes || quotes.length === 0) {
    return <div>No quotes available</div>;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">View All Quote List</h4>
                {/* <Link className="btn btn-sm btn-primary">
                  Request Quote
                </Link> */}
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
                        <th> Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((quote) => (
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
                          <td>{quote.expectedDeliveryDate}</td>
                          <td>{quote.quotedAmount}</td>
                          <td>{quote.remarksFromSupplier}</td>
                          <td>{quote.status}</td>
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
