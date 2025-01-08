// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { exportToExcel } from "../../../export-excel";

// const TrackOrderHistoryTable = () => {
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([
//     {
//       id: 1,
//       orderNumber: "ORD12345678",
//       orderDate: "2023-12-01",
//       status: "Order Placed",
//       commentFromBuyer: "This is a test comment",
//       expectedDeliveryDate: "2023-12-05",
//       actualDeliveryDate: "2023-12-06",
//       taxInvoiceForBuyer: "INV12345678",
//       taxInvoiceForEdProwise: "EDP12345678",
//       invoiceAmountToBuyer: "₹1,500.00",
//       taxableValue: "₹1,300.00",
//       gstAmount: "₹200.00",
//       totalInvoiceAmount: "₹1,700.00",
//       advanceAdjustment: "₹100.00",
//       otherCharges: "₹50.00",
//       finalReceivableFromEdProwise: "₹1,650.00",
//     },
//     {
//       id: 2,
//       orderNumber: "ORD12345679",
//       orderDate: "2023-12-02",
//       status: "Order Delivered",
//       commentFromBuyer: "Delivery was on time.",
//       expectedDeliveryDate: "2023-12-07",
//       actualDeliveryDate: "2023-12-07",
//       taxInvoiceForBuyer: "INV12345679",
//       taxInvoiceForEdProwise: "EDP12345679",
//       invoiceAmountToBuyer: "₹2,000.00",
//       taxableValue: "₹1,800.00",
//       gstAmount: "₹200.00",
//       totalInvoiceAmount: "₹2,200.00",
//       advanceAdjustment: "₹200.00",
//       otherCharges: "₹0.00",
//       finalReceivableFromEdProwise: "₹2,000.00",
//     },
//     {
//       id: 3,
//       orderNumber: "ORD12345680",
//       orderDate: "2023-12-03",
//       status: "Order Cancelled",
//       commentFromBuyer: "Cancelled due to change of plans.",
//       expectedDeliveryDate: "2023-12-10",
//       actualDeliveryDate: "",
//       taxInvoiceForBuyer: "",
//       taxInvoiceForEdProwise: "",
//       invoiceAmountToBuyer: "₹750.00",
//       taxableValue: "₹650.00",
//       gstAmount: "₹100.00",
//       totalInvoiceAmount: "₹850.00",
//       advanceAdjustment: "₹50.00",
//       otherCharges: "₹0.00",
//       finalReceivableFromEdProwise: "₹700.00",
//     },
//   ]);

//   const navigateToViewOrder = (event, order) => {
//     event.preventDefault();
//     navigate(`/seller-dashboard/procurement-services/view-order-history`, {
//       state: { order },
//     });
//   };

//   const handleExport = () => {
//     const filteredData = orders.map((order) => ({}));

//     exportToExcel(filteredData, "Track Order History", "Order History Data");
//   };

//   if (!orders || orders.length === 0) {
//     return <div>No orders available</div>;
//   }

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card">
//               <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                 <h4 className="card-title flex-grow-1">View All Orders List</h4>
//                 <Link className="btn btn-sm btn-primary" to="/request-order">
//                   {/* Request Order */}
//                 </Link>
//                 <div className="text-end">
//                   <Link
//                     onClick={handleExport}
//                     className="btn btn-sm btn-outline-light"
//                   >
//                     Export
//                   </Link>
//                 </div>
//               </div>
//               <div>
//                 <div className="table-responsive">
//                   <table className="table align-middle mb-0 table-hover table-centered">
//                     <thead className="bg-light-subtle">
//                       <tr>
//                         <th style={{ width: 20 }}>
//                           <div className="form-check ms-1">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               id="customCheck1"
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor="customCheck1"
//                             />
//                           </div>
//                         </th>
//                         <th>Order Number</th>
//                         <th>Order Date</th>
//                         <th>Status</th>
//                         <th>Expected Delivery Date</th>
//                         <th>Actual Delivery Date</th>
//                         <th>Final Payable Amount</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.map((order) => (
//                         <tr key={order.id}>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id={`customCheck${order.id}`}
//                               />
//                               <label
//                                 className="form-check-label"
//                                 htmlFor={`customCheck${order.id}`}
//                               >
//                                 &nbsp;
//                               </label>
//                             </div>
//                           </td>
//                           <td>{order.orderNumber}</td>
//                           <td>{order.nameOfSupplier}</td>
//                           <td>{order.expectedDeliveryDate}</td>
//                           <td>{order.actualDeliveryDate || "N/A"}</td>
//                           <td>{order.finalPayableAmount}</td>
//                           <td>
//                             <div className="d-flex gap-2">
//                               <Link
//                                 onClick={(event) =>
//                                   navigateToViewOrder(event, order)
//                                 }
//                                 className="btn btn-light btn-sm"
//                               >
//                                 <iconify-icon
//                                   icon="solar:eye-broken"
//                                   className="align-middle fs-18"
//                                 />
//                               </Link>
//                               <Link
//                                 href="#!"
//                                 className="btn btn-soft-primary btn-sm"
//                               >
//                                 <iconify-icon
//                                   icon="solar:pen-2-broken"
//                                   className="align-middle fs-18"
//                                 />
//                               </Link>
//                               <Link
//                                 href="#!"
//                                 className="btn btn-soft-danger btn-sm"
//                               >
//                                 <iconify-icon
//                                   icon="solar:trash-bin-minimalistic-2-broken"
//                                   className="align-middle fs-18"
//                                 />
//                               </Link>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 {/* end table-responsive */}
//               </div>
//               <div className="card-footer border-top">
//                 <nav aria-label="Page navigation example">
//                   <ul className="pagination justify-content-end mb-0">
//                     <li className="page-item">
//                       <Link className="page-link">Previous</Link>
//                     </li>
//                     <li className="page-item active">
//                       <Link className="page-link">1</Link>
//                     </li>
//                     <li className="page-item">
//                       <Link className="page-link">2</Link>
//                     </li>
//                     <li className="page-item">
//                       <Link className="page-link">3</Link>
//                     </li>
//                     <li className="page-item">
//                       <Link className="page-link">Next</Link>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TrackOrderHistoryTable;

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
                <Link className="btn btn-sm btn-primary" to="/request-order">
                  {/* Request Order */}
                </Link>
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
                        <th>Order Number</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Comment From Buyer</th>
                        <th>Expected Delivery Date</th>
                        <th>Actual Delivery Date</th>
                        <th>Tax Invoice for Buyer</th>
                        <th>Tax Invoice for EdProwise</th>
                        <th>Invoice Amount to Buyer</th>
                        <th>Taxable Value</th>
                        <th>GST Amount</th>
                        <th>Total Invoice Amount</th>
                        <th>Advance Adjustment</th>
                        <th>Other Charges</th>
                        <th>Final Receivable from EdProwise</th>
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
                          <td>{order.orderDate}</td>
                          <td>{order.status}</td>
                          <td>{order.commentFromBuyer}</td>
                          <td>{order.expectedDeliveryDate}</td>
                          <td>{order.actualDeliveryDate || "N/A"}</td>
                          <td>{order.taxInvoiceForBuyer || "N/A"}</td>
                          <td>{order.taxInvoiceForEdProwise || "N/A"}</td>
                          <td>{order.invoiceAmountToBuyer}</td>
                          <td>{order.taxableValue}</td>
                          <td>{order.gstAmount}</td>
                          <td>{order.totalInvoiceAmount}</td>
                          <td>{order.advanceAdjustment}</td>
                          <td>{order.otherCharges}</td>
                          <td>{order.finalReceivableFromEdProwise}</td>
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
                              {/* <Link
                                href="#!"
                                className="btn btn-soft-primary btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                href="#!"
                                className="btn btn-soft-danger btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link> */}
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
