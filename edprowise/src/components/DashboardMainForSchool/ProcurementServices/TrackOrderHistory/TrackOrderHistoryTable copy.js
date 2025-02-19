import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";

const TrackOrderHistoryTable = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD12345678",
      nameOfSupplier: "Supplier A",
      orderDate: "2023-12-01",
      status: "Order Placed",
      expectedDeliveryDate: "2023-12-05",
      actualDeliveryDate: "2023-12-10",
      invoiceNo: "INV-001",
      invoiceAmount: "₹500.00",
      advanceAdjustment: "₹100.00",
      tdsDeduction: "₹10.00",
      finalPayableAmount: "₹390.00",
    },
    {
      id: 2,
      orderNumber: "ORD12345678",
      nameOfSupplier: "Supplier B",
      orderDate: "2023-12-02",
      status: "Order Placed",
      expectedDeliveryDate: "2023-12-10",
      actualDeliveryDate: "2023-12-09",
      invoiceNo: "INV-002",
      invoiceAmount: "₹750.00",
      advanceAdjustment: "₹150.00",
      tdsDeduction: "₹15.00",
      finalPayableAmount: "₹585.00",
    },
    {
      id: 3,
      orderNumber: "ORD12345678",
      nameOfSupplier: "Supplier C",
      orderDate: "2023-12-03",
      status: "Order Placed",
      expectedDeliveryDate: "2023-12-15",
      actualDeliveryDate: "2023-12-09",
      invoiceNo: "INV-003",
      invoiceAmount: "₹300.00",
      advanceAdjustment: "₹50.00",
      tdsDeduction: "₹5.00",
      finalPayableAmount: "₹245.00",
      payOnline: "",
    },
    {
      id: 4,
      orderNumber: "ORD12345678",
      nameOfSupplier: "Supplier D",
      orderDate: "2023-12-04",
      status: "Order Placed",
      expectedDeliveryDate: "2023-12-20",
      actualDeliveryDate: "2023-12-09",
      invoiceNo: "INV-004",
      invoiceAmount: "₹1,200.00",
      advanceAdjustment: "₹200.00",
      tdsDeduction: "₹20.00",
      finalPayableAmount: "₹980.00",
      payOnline: "",
    },
    {
      id: 5,
      orderNumber: "ORD12345678",
      nameOfSupplier: "Supplier E",
      orderDate: "2023-12-05",
      status: "Order Placed",
      expectedDeliveryDate: "2023-12-25",
      actualDeliveryDate: "2023-12-24",
      invoiceNo: "INV-005",
      invoiceAmount: "₹1,000.00",
      advanceAdjustment: "₹250.00",
      tdsDeduction: "₹25.00",
      finalPayableAmount: "₹725.00",
      payOnline: "",
    },
  ]);

  const navigateToViewOrder = (event, order) => {
    event.preventDefault();
    navigate(`/school-dashboard/procurement-services/view-order-history`, {
      state: { order },
    });
  };

  const handleNavigation = () => {
    navigate("/school-dashboard/procurement-services/pay-to-edprowise");
  };

  const handleExport = () => {
    const filteredData = orders.map((order) => ({
      "Order Number": order.orderNumber,
      "Name of Supplier": order.nameOfSupplier,
      "Order Date": order.orderDate,
      Status: order.status,
      "Expected Delivery Date": order.expectedDeliveryDate,
      "Actual Delivery Date": order.actualDeliveryDate,
      Invoice: order.invoice,
      "Invoice Amount": order.invoiceAmount,
      "Advance Adjustment": order.advanceAdjustment,
      "TDS Deduction": order.tdsDeduction,
      "Final Payable Amount": order.finalPayableAmount,
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
                        <th>Name of Supplier</th>
                        <th>Expected Delivery Date</th>
                        <th>Actual Delivery Date</th>
                        <th>Invoice Amount</th>
                        <th>Status</th>
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
                          <td>{order.nameOfSupplier}</td>
                          <td>{order.expectedDeliveryDate}</td>
                          <td>{order.actualDeliveryDate}</td>
                          <td>{order.invoiceAmount}</td>
                          <td>{order.status}</td>
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
                                className="btn btn-success btn-sm"
                                title="Pay"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                                onClick={handleNavigation}
                              >
                                Pay
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
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrderHistoryTable;
