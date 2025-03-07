import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";
import getAPI from "../../../../api/getAPI";
import putAPI from "../../../../api/putAPI";

import { toast } from "react-toastify";

import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const TrackOrderHistoryTable = () => {
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState([]);

  const fetchOrderData = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    if (!schoolId) {
      console.error("School ID is missing");
      return;
    }

    try {
      const response = await getAPI(
        `/order-details-by-school-id/${schoolId}`,
        {},
        true
      );
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setOrderDetails(response.data.data);

        console.log("Order Details", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Order details:", err);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const navigateToViewOrder = (event, order, enquiryNumber) => {
    console.log("Navigating to view order", event, order, enquiryNumber);
    event.preventDefault();
    navigate(`/school-dashboard/procurement-services/view-order-history`, {
      state: { order, enquiryNumber },
    });
  };

  const handleNavigation = () => {
    navigate("/school-dashboard/procurement-services/pay-to-edprowise");
  };

  const handleExport = () => {
    if (!orderDetails.length) {
      toast.error("No data available to export");
      return;
    }

    const formattedData = orderDetails.map((order) => ({
      Order_Number: order.orderNumber || "N/A",
      Enquiry_Number: order.enquiryNumber || "N/A",
      Quote_Number: order.quoteNumber || "N/A",
      Company_Name: order.companyName || "N/A",
      Seller_ID: order.sellerId || "N/A",
      School_ID: order.schoolId || "N/A",
      Actual_Delivery_Date: formatDate(order.actualDeliveryDate),
      Expected_Delivery_Date: formatDate(order.expectedDeliveryDate),
      Supplier_Status: order.supplierStatus || "N/A",
      Buyer_Status: order.buyerStatus || "N/A",
      Edprowise_Status: order.edprowiseStatus || "N/A",
      Other_Charges: order.otherCharges || 0,
      Total_Amount_Before_GST: order.totalAmountBeforeGstAndDiscount || 0,
      Total_Amount: order.totalAmount || 0,
      Total_Taxable_Value: order.totalTaxableValue || 0,
      Total_GST_Amount: order.totalGstAmount || 0,
      Final_Payable_Amount_Without_TDS: order.finalPayableAmountWithoutTDS || 0,
      Final_Payable_Amount_With_TDS: order.finalPayableAmountWithTDS || 0,
      TDS_Amount: order.tDSAmount || 0,
      Advance_Adjustment: order.advanceAdjustment || 0,
    }));

    exportToExcel(formattedData, "Ordered Products", "Ordered_Products");
  };

  const handleUpdateTDSStatus = async (
    enquiryNumber,
    quoteNumber,
    sellerId,
    newtDSAmount
  ) => {
    try {
      const response = await putAPI(
        `/update-tds?enquiryNumber=${enquiryNumber}&quoteNumber=${quoteNumber}&sellerId=${sellerId}`,
        { tDSAmount: Number(newtDSAmount) },
        true
      );

      if (!response.hasError) {
        toast.success(`TDS updated to "${newtDSAmount}" successfully!`);
        fetchOrderData();
      } else {
        toast.error(response.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(10);

  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentOrderDetails = orderDetails.slice(
    indexOfFirstSchool,
    indexOfLastSchool
  );

  const totalPages = Math.ceil(orderDetails.length / schoolsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageRange = 1;

  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">View All Orders List</h4>
                <div className="text-end">
                  <Link onClick={handleExport} class="text-primary">
                    Export
                    <i class="bx bx-export ms-1"></i>
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
                        <th>Select TDS</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrderDetails.map((order) => (
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
                          <td>{order.companyName}</td>
                          <td>{formatDate(order.expectedDeliveryDate)}</td>
                          <td>
                            {order.actualDeliveryDate
                              ? formatDate(order.actualDeliveryDate)
                              : "Null"}
                          </td>
                          <td>{order.totalAmountBeforeGstAndDiscount}</td>
                          <td>{order.buyerStatus}</td>
                          <td>
                            <select
                              id="tdsAmount"
                              name="tdsAmount"
                              className="form-control"
                              value={
                                order.tDSAmount !== null &&
                                order.tDSAmount !== undefined
                                  ? order.tDSAmount.toString()
                                  : ""
                              }
                              onChange={(e) =>
                                handleUpdateTDSStatus(
                                  order.enquiryNumber,
                                  order.quoteNumber,
                                  order.sellerId,
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="">Select TDS</option>
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="10">10</option>
                              <option value="20.8">20.8</option>
                            </select>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(event) =>
                                  navigateToViewOrder(
                                    event,
                                    order,
                                    order.enquiryNumber
                                  )
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
                      <button
                        className="page-link"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {pagesToShow.map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className={`page-link pagination-button ${
                            currentPage === page ? "active" : ""
                          }`}
                          onClick={() => handlePageClick(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
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
