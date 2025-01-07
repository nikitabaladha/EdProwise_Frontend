import { useLocation } from "react-router-dom";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../../export-excel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

const ViewQuote = () => {
  const location = useLocation();
  const quote = location.state?.quote;

  const navigate = useNavigate();

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

    navigate("/admin-dashboard/procurement-services/view-quote", {
      state: { quote },
    });
  };

  const showSuccessMessage = (event) => {
    event.preventDefault();
    toast.success("Order Placed Successfully!");
    navigate("/admin-dashboard/procurement-services/view-quote", {
      state: { quote },
    });
  };

  const showErrorMessage = (event) => {
    event.preventDefault();
    toast.error("Quote Rejected!");
    navigate("/admin-dashboard/procurement-services/view-quote", {
      state: { quote },
    });
  };

  if (!quote) {
    return <div>No quote details available.</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title text-center custom-heading-font align-content-center">
                      Quote Details
                    </h4>
                    <div className="">
                      <Link
                        onClick={(event) => handleDownloadPDF(event, quote)}
                        className="btn btn-soft-info btn-sm"
                        title="Download PDF"
                        data-bs-toggle="popover"
                        data-bs-trigger="hover"
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
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="supplierName" className="form-label">
                      Supplier Name
                    </label>
                    <p className="form-control">{quote.nameOfSupplier}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfQuoteSubmitted"
                      className="form-label"
                    >
                      Date of Quote Submitted
                    </label>
                    <p className="form-control">{quote.dateOfQuoteSubmitted}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label
                      htmlFor="expectedDeliveryDate"
                      className="form-label"
                    >
                      Expected Delivery Date
                    </label>
                    <p className="form-control">{quote.expectedDeliveryDate}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="quotedAmount" className="form-label">
                      Quoted Amount
                    </label>
                    <p className="form-control">{quote.quotedAmount}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label
                      htmlFor="advancesRequiredAmount"
                      className="form-label"
                    >
                      Advances Required Amount
                    </label>
                    <p className="form-control">
                      {quote.advancesRequiredAmount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="commentFromBuyer" className="form-label">
                      Comment from Buyer
                    </label>
                    <p className="form-control">{quote.commentFromBuyer}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="remarksFromSupplier" className="form-label">
                      Remarks from Supplier
                    </label>
                    <p className="form-control">{quote.remarksFromSupplier}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <p className="form-control">{quote.description}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="paymentTerms" className="form-label">
                      Payment Terms
                    </label>
                    <p className="form-control">{quote.paymentTerms}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="placeOrder" className="form-label">
                      Place Order Status
                    </label>
                    <p className="form-control">{quote.placeOrder}</p>
                  </div>
                </div>
              </div>

              <div className="text-end">
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
    </div>
  );
};

export default ViewQuote;
