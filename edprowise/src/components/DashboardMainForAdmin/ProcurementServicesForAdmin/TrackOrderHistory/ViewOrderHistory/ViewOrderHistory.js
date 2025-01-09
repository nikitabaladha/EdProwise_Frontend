import React from "react";
import { useLocation } from "react-router-dom";

const ViewOrderHistory = () => {
  const location = useLocation();
  const order = location.state?.order;

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
                    <label htmlFor="nameOfSupplier" className="form-label">
                      Name Of Supplier
                    </label>
                    <p className="form-control">{order.nameOfSupplier}</p>
                  </div>
                </div>
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
                    <label htmlFor="commentFromBuyer" className="form-label">
                      Comment From Buyer
                    </label>
                    <p className="form-control">{order.commentFromBuyer}</p>
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
              </div>
              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="actualDeliveryDate" className="form-label">
                      Actual Delivery Date
                    </label>
                    <p className="form-control">{order.actualDeliveryDate}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="taxInvoiceForBuyer" className="form-label">
                      Tax Invoice For Buyer
                    </label>
                    <p className="form-control">{order.taxInvoiceForBuyer}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="invoiceAmtToBuyer" className="form-label">
                      Invoice Amount To Buyer
                    </label>
                    <p className="form-control">{order.invoiceAmtToBuyer}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="taxableValue" className="form-label">
                      Taxable Value
                    </label>
                    <p className="form-control">{order.taxableValue}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="gstAmount" className="form-label">
                      GST Amount
                    </label>
                    <p className="form-control">{order.gstAmount}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="totalInvoiceAmt" className="form-label">
                      Total Invoice Amount
                    </label>
                    <p className="form-control">{order.totalInvoiceAmt}</p>
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
                    <label htmlFor="otherCharges" className="form-label">
                      Other Charges
                    </label>
                    <p className="form-control">{order.OtherCharges}</p>
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
                >
                  Pay Online
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
