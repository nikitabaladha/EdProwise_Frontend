import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewOrderHistory = () => {
  const location = useLocation();
  const order = location.state?.order;

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/seller-dashboard/procurement-services/pay-to-edprowise");
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
                    <label htmlFor="orderDate" className="form-label">
                      Order Date
                    </label>
                    <p className="form-control">
                      {formatDate(order.createdAt)}
                    </p>
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

                    <p className="form-control">
                      {formatDate(order.expectedDeliveryDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="actualDeliveryDate" className="form-label">
                      Actual Delivery Date
                    </label>
                    <p className="form-control">
                      {order.actualDeliveryDate
                        ? formatDate(order.actualDeliveryDate)
                        : "Null"}
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mb-3">
                    <label
                      htmlFor="invoiceAmountToBuyer"
                      className="form-label"
                    >
                      Invoice Amount to Buyer
                    </label>
                    <p className="form-control">
                      {order.totalAmountBeforeGstAndDiscount}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="taxableValue" className="form-label">
                      Taxable Value
                    </label>
                    <p className="form-control">{order.totalTaxableValue}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="gstAmount" className="form-label">
                      GST Amount
                    </label>
                    <p className="form-control">{order.totalGstAmount}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="totalInvoiceAmount" className="form-label">
                      Total Invoice Amount
                    </label>
                    <p className="form-control">{order.totalAmount}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="advanceAdjustment" className="form-label">
                      Advance Adjustment
                    </label>
                    <p className="form-control">{order.advanceAdjustment}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="otherCharges" className="form-label">
                      Other Charges
                    </label>
                    <p className="form-control">{order.otherCharges}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label
                      htmlFor="finalReceivableFromEdProwise"
                      className="form-label"
                    >
                      Final Receivable from EdProwise
                    </label>
                    <p className="form-control">
                      {order.finalReceivableFromEdprowise}
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <p className="form-control">{order.supplierStatus}</p>
                  </div>
                </div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={handleNavigation}
                >
                  Pay To EdProwise
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
