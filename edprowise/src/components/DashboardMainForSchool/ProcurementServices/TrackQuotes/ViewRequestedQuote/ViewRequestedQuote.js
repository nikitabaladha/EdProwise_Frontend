import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { exportToExcel } from "../../../../export-excel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

const ViewRequestedQuote = () => {
  const location = useLocation();
  const product = location.state?.product;

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
  ]);

  const [isQuoteTableVisible, setIsQuoteTableVisible] = useState(false);
  const navigateToViewQuote = (event, quote) => {
    event.preventDefault();
    navigate(`/school-dashboard/procurement-services/view-quote`, {
      state: { quote },
    });
  };

  const handleExport = (event) => {
    event.preventDefault();

    if (!quotes || quotes.length === 0) {
      toast.error("No quotes available to export.");
      return;
    }

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

    navigate("/school-dashboard/procurement-services/view-requested-quote", {
      state: { product },
    });
  };

  const handleDownloadPDF = (event, quote) => {
    event.preventDefault();

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Quote Details", 14, 20);

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

    navigate("/school-dashboard/procurement-services/view-requested-quote", {
      state: { product },
    });
  };

  const showSuccessMessage = (event) => {
    event.preventDefault();
    toast.success("Order Placed Successfully!");
    navigate("/school-dashboard/procurement-services/view-requested-quote", {
      state: { product },
    });
  };

  const showErrorMessage = (event) => {
    event.preventDefault();
    toast.error("Quote Rejected!");
    navigate("/school-dashboard/procurement-services/view-requested-quote", {
      state: { product },
    });
  };

  if (!quotes || quotes.length === 0) {
    return <div>No quotes available</div>;
  }

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
                    <label htmlFor="productName" className="form-label">
                      Product Name
                    </label>
                    <p className="form-control">{product.subCategory}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">
                      Product Description
                    </label>
                    <p className="form-control">{product.productDescription}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label htmlFor="unit" className="form-label">
                      Unit
                    </label>
                    <p className="form-control">{product.unit}</p>
                  </div>
                </div>
                <div className="col-md-3">
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

              <div className="d-flex justify-content-between">
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

      {isQuoteTableVisible && quotes.length > 0 ? (
        <div className="row p-2">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1"> All Quote List</h4>
                <div className="text-end">
                  <Link
                    onClick={(event) => handleExport(event)}
                    className="btn btn-sm btn-outline-light"
                  >
                    Export
                  </Link>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered">
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
                        <th>Quoted Amount</th>
                        <th>Expected Delivery Date</th>
                        <th>Status</th>
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
                          <td>{quote.quotedAmount}</td>
                          <td>{quote.expectedDeliveryDate}</td>
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
