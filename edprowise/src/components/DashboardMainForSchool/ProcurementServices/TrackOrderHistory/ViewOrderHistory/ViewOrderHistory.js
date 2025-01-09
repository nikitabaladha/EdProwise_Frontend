import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ViewOrderHistory = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const order = location.state?.order;

  const handleNavigation = () => {
    navigate("/school-dashboard/procurement-services/pay-to-edprowise");
  };

  if (!order) {
    return <div>No order details available.</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Order Details
                  </h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="orderNumber" className="form-label">
                      Order Number
                    </label>
                    <p className="form-control">{order.orderNumber}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="nameOfSupplier" className="form-label">
                      Name Of Supplier
                    </label>
                    <p className="form-control">{order.nameOfSupplier}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfQuoteSubmitted"
                      className="form-label"
                    >
                      Order Date
                    </label>
                    <p className="form-control">{order.orderDate}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="finalPayableAmount" className="form-label">
                      Status
                    </label>
                    <p className="form-control">{order.status}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label
                      htmlFor="expectedDeliveryDate"
                      className="form-label"
                    >
                      Expected Delivery Date
                    </label>
                    <p className="form-control">{order.expectedDeliveryDate}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="actualDeliveryDate" className="form-label">
                      Actual Delivery Date
                    </label>
                    <p className="form-control">{order.actualDeliveryDate}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="invoice" className="form-label">
                      Invoice Number
                    </label>
                    <p className="form-control">{order.invoiceNo}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="invoice" className="form-label">
                      Download Invoice
                    </label>
                    <div className="form-control p-0">
                      <a
                        href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                        download="Invoice.pdf"
                        className="btn btn-link"
                      >
                        <i className="bi bi-download"></i> Download Invoice
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="quotedAmount" className="form-label">
                      Invoice Amount
                    </label>
                    <p className="form-control">{order.invoiceAmount}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label
                      htmlFor="advancesRequiredAmount"
                      className="form-label"
                    >
                      Advance Adjustment
                    </label>
                    <p className="form-control">{order.advanceAdjustment}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="commentFromBuyer" className="form-label">
                      TDS/Any Other Deduction
                    </label>
                    <p className="form-control">{order.tdsDeduction}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="finalPayableAmount" className="form-label">
                      Final Payable Amt
                    </label>
                    <p className="form-control">{order.finalPayableAmount}</p>
                  </div>
                </div>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={handleNavigation}
                >
                  Pay to EdProwise
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderHistory;
