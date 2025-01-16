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

  const [products, setProducts] = useState([
    {
      id: 1,
      enquiryNo: "ENQ1234567890",
      nameOfBuyer: "ABC School",
      quoteRequestedDate: "2023-12-01",
      category: "Office Furniture",
      subCategory: "Office Chair",
      productDescription: "We want chair",
      qty: 8,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-05",
      imageUrl: "assets/images/product/p-1.png",
      status: "Quote Requested",
    },
    {
      id: 2,
      enquiryNo: "ENQ1234567890",
      nameOfBuyer: "ABC School",
      quoteRequestedDate: "2023-12-01",
      category: "Office Furniture",
      subCategory: "Office Chair",
      productDescription: "Need 10 wooden desks.",
      qty: 10,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-10",
      imageUrl: "assets/images/product/p-2.png",
      status: "Quote Requested",
    },
    {
      id: 3,
      enquiryNo: "ENQ1234567890",
      nameOfBuyer: "ABC School",
      quoteRequestedDate: "2023-12-01",
      category: "Office Furniture",
      subCategory: "Office Chair",
      productDescription: "Request for 5 whiteboards.",
      qty: 5,
      unit: "Pieces",
      deliveryExpectedDate: "2023-12-12",
      imageUrl: "assets/images/product/p-3.png",
      status: "Quote Requested",
    },
  ]);

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
      placeOrderStatus: "Pending",
      commentFromBuyer: "Check quality before accepting",
      status: "Quote Received",
    },
  ]);

  const [isQuoteTableVisible, setIsQuoteTableVisible] = useState(false);
  const navigateToViewQuote = (event, quote) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/view-quote`, {
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

    navigate("/admin-dashboard/procurement-services/view-requested-quote", {
      state: { products },
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

    navigate("/admin-dashboard/procurement-services/view-requested-quote", {
      state: { products },
    });
  };

  const showSuccessMessage = (event) => {
    event.preventDefault();
    toast.success("Order Placed Successfully!");
    navigate("/admin-dashboard/procurement-services/view-requested-quote", {
      state: { products },
    });
  };

  const showErrorMessage = (event) => {
    event.preventDefault();
    toast.error("Quote Rejected!");
    navigate("/admin-dashboard/procurement-services/view-requested-quote", {
      state: { products },
    });
  };

  if (!quotes || quotes.length === 0) {
    return <div>No quotes available</div>;
  }

  if (!products) {
    return <div>No product details available.</div>;
  }

  console.log("Product view", products);

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
                      <th>Name Of Buyer</th>
                      <th>Quote Requested Date</th>
                      <th>Product Description</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Status</th>
                      <th>DeliveryExpectedDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
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
                        <td>{product.enquiryNo}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                              <img
                                src={product.imageUrl}
                                alt={product.subCategory}
                                className="avatar-md"
                              />
                            </div>
                            <div>
                              <Link className="text-dark fw-medium fs-15">
                                {product.subCategory}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td>{product.nameOfBuyer}</td>
                        <td>{product.quoteRequestedDate}</td>
                        <td>{product.productDescription}</td>
                        <td>{product.qty}</td>
                        <td>{product.unit}</td>
                        <td>{product.status}</td>
                        <td>{product.deliveryExpectedDate}</td>
                        <td>{product.placeOrderStatus}</td>
                      </tr>
                    ))}
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
                        <th>Expected Delivery Date (Mentioned By Seller)</th>
                        <th>Payment Terms</th>
                        <th>Advances Required Amount</th>
                        <th>Status</th>
                        <th>Download Quote</th>
                        <th>Vender Selection</th>
                        {/* <th>Action</th> */}
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
                          <td>{quote.dateOfQuoteSubmitted}</td>
                          <td>{quote.quotedAmount}</td>
                          <td>{quote.description}</td>
                          <td>{quote.remarksFromSupplier}</td>
                          <td>{quote.expectedDeliveryDate}</td>
                          <td>{quote.paymentTerms}</td>
                          <td>{quote.advancesRequiredAmount}</td>
                          <td>{quote.placeOrderStatus}</td>
                          <td>
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
                          </td>
                          <td>
                            <div className="d-flex gap-2">
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
