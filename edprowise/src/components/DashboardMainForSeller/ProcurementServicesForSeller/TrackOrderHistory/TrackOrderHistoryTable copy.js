import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";

const TrackOrderHistoryTable = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/seller-dashboard/procurement-services/pay-to-edprowise");
  };

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD12345678",
      orderDate: "2023-12-01",
      status: "Order Placed",
      commentFromBuyer: "This is a test comment",
      expectedDeliveryDate: "2023-12-05",
      actualDeliveryDate: "2023-12-06",
      taxInvoiceForBuyer: "INV12345678",
      taxInvoiceForEdProwise: "EDP12345678",
      invoiceAmountToBuyer: "1500",
      taxableValue: "1300",
      gstAmount: "200",
      totalInvoiceAmount: "1700",
      advanceAdjustment: "100",
      otherCharges: "50",
      finalReceivableFromEdProwise: "165",
    },
    {
      id: 2,
      orderNumber: "ORD12345679",
      orderDate: "2023-12-01",
      status: "Order Placed",
      commentFromBuyer: "This is a test comment",
      expectedDeliveryDate: "2023-12-05",
      actualDeliveryDate: "2023-12-06",
      taxInvoiceForBuyer: "INV12345678",
      taxInvoiceForEdProwise: "EDP12345678",
      invoiceAmountToBuyer: "1500",
      taxableValue: "1300",
      gstAmount: "200",
      totalInvoiceAmount: "1700",
      advanceAdjustment: "100",
      otherCharges: "50",
      finalReceivableFromEdProwise: "165",
    },
    {
      id: 3,
      orderNumber: "ORD12345680",
      orderDate: "2023-12-01",
      status: "Order Placed",
      commentFromBuyer: "This is a test comment",
      expectedDeliveryDate: "2023-12-05",
      actualDeliveryDate: "2023-12-06",
      taxInvoiceForBuyer: "INV12345678",
      taxInvoiceForEdProwise: "EDP12345678",
      invoiceAmountToBuyer: "1500",
      taxableValue: "1300",
      gstAmount: "200",
      totalInvoiceAmount: "1700",
      advanceAdjustment: "100",
      otherCharges: "50",
      finalReceivableFromEdProwise: "165",
    },
  ]);

  const navigateToViewOrder = (event, order) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/view-order-history`, {
      state: { order },
    });
  };

  const handleExport = () => {
    const filteredData = orders.map((order) => ({
      OrderNumber: order.orderNumber,
      OrderDate: order.orderDate,
      Status: order.status,
      CommentFromBuyer: order.commentFromBuyer,
      ExpectedDeliveryDate: order.expectedDeliveryDate,
      ActualDeliveryDate: order.actualDeliveryDate || "N/A",
      TaxInvoiceForBuyer: order.taxInvoiceForBuyer || "N/A",
      TaxInvoiceForEdProwise: order.taxInvoiceForEdProwise || "N/A",
      InvoiceAmountToBuyer: order.invoiceAmountToBuyer,
      TaxableValue: order.taxableValue,
      GstAmount: order.gstAmount,
      TotalInvoiceAmount: order.totalInvoiceAmount,
      AdvanceAdjustment: order.advanceAdjustment,
      OtherCharges: order.otherCharges,
      FinalReceivableFromEdProwise: order.finalReceivableFromEdProwise,
    }));

    exportToExcel(filteredData, "Track Order History", "Order History Data");
  };

  if (!orders || orders.length === 0) {
    return <div>No orders available</div>;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">View All Orders List</h4>
                {/* <Link className="btn btn-sm btn-primary" to="/request-order">
                  Request Order
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
                        <th>Order Number</th>
                        {/* <th>Order Date</th> */}
                        <th>Status</th>
                        {/* <th>Comment From Buyer</th> */}
                        <th>Expected Delivery Date</th>
                        {/* <th>Actual Delivery Date</th> */}
                        {/* <th>Tax Invoice for Buyer</th> */}
                        {/* <th>Tax Invoice for EdProwise</th> */}
                        <th>Invoice Amount to Buyer</th>
                        {/* <th>Taxable Value</th> */}
                        {/* <th>GST Amount</th> */}
                        {/* <th>Total Invoice Amount</th> */}
                        {/* <th>Advance Adjustment</th> */}
                        {/* <th>Other Charges</th> */}
                        <th>Invoice Amount</th>
                        <th>Tax Invoice</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`customCheck${order.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${order.id}`}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{order.orderNumber}</td>
                          {/* <td>{order.orderDate}</td> */}
                          <td>{order.status}</td>
                          {/* <td>{order.commentFromBuyer}</td> */}
                          <td>{order.expectedDeliveryDate}</td>
                          {/* <td>{order.actualDeliveryDate || "N/A"}</td> */}
                          {/* <td>{order.taxInvoiceForBuyer || "N/A"}</td> */}
                          {/* <td>{order.taxInvoiceForEdProwise || "N/A"}</td> */}
                          <td>{order.invoiceAmountToBuyer}</td>
                          {/* <td>{order.taxableValue}</td> */}
                          {/* <td>{order.gstAmount}</td> */}
                          {/* <td>{order.totalInvoiceAmount}</td> */}
                          {/* <td>{order.advanceAdjustment}</td> */}
                          {/* <td>{order.otherCharges}</td> */}
                          <td>{order.invoiceAmountToBuyer}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary custom-submit-button"
                              // onClick={handleNavigation}
                            >
                              Prepare Invoice
                            </button>{" "}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(event) =>
                                  navigateToViewOrder(event, order)
                                }
                                className="btn btn-light btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              {/* <button
                                type="button"
                                className="btn btn-primary custom-submit-button"
                                onClick={handleNavigation}
                              >
                                Pay To EdProwise
                              </button> */}
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
            {/* end card */}
          </div>
          {/* end col */}
        </div>
        {/* end row */}
      </div>
    </>
  );
};

export default TrackOrderHistoryTable;
