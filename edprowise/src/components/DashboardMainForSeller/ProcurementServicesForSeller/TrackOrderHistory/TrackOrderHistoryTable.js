import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";
import getAPI from "../../../../api/getAPI";
import UpdateOrderDetailsModal from "./UpdateOrderDetailsModal";
import putAPI from "../../../../api/putAPI";

import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const TrackOrderHistoryTable = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/seller-dashboard/procurement-services/pay-to-edprowise");
  };

  const [orderDetails, setOrderDetails] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);

  const fetchOrderData = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const sellerId = userDetails?.id;

    if (!sellerId) {
      console.error("Seller ID is missing");
      return;
    }

    try {
      const response = await getAPI(
        `/order-details-by-seller-id/${sellerId}`,
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

  const handleOrderDetailsUpdated = () => {
    fetchOrderData();
    closeUpdateOrderDetailsModal();
  };

  const navigateToViewOrder = (event, order, enquiryNumber) => {
    event.preventDefault();
    navigate(`/seller-dashboard/procurement-services/view-order-history`, {
      state: { order, enquiryNumber },
    });
  };

  const openUpdateOrderDetailsModal = (event, orderNumber) => {
    event.preventDefault();
    setSelectedOrderNumber(orderNumber);
    setIsModalOpen(true);
  };

  const closeUpdateOrderDetailsModal = () => {
    setIsModalOpen(false);
  };

  const handleExport = () => {};

  const handleUpdateOrderStatus = async (enquiryNumber, newStatus) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const sellerId = userDetails?.id;

    if (!sellerId) {
      console.error("Seller ID is missing");
      return;
    }

    try {
      const response = await putAPI(
        `/order-progress-status?enquiryNumber=${enquiryNumber}&&sellerId=${sellerId}`,
        { supplierStatus: newStatus },
        true
      );

      if (!response.hasError) {
        toast.success(`Order status updated to "${newStatus}" successfully!`);
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

  const fetchInvoiceDataForEdprowise = async (enquiryNumber, schoolId) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const sellerId = userDetails?.id;

    if (!sellerId || !enquiryNumber || !schoolId) {
      console.error("Seller ID, Enquiry Number, or School ID is missing");
      return;
    }

    try {
      // Fetch Prepare Quote data
      const prepareQuoteResponse = await getAPI(
        `/prepare-quote?sellerId=${sellerId}&enquiryNumber=${enquiryNumber}`
      );

      // Fetch Quote Proposal data
      const quoteProposalResponse = await getAPI(
        `/quote-proposal?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`
      );

      // Fetch Profile data based on the schoolId
      const profileResponse = await getAPI(
        `/quote-proposal-pdf-required-data/${schoolId}`
      );

      if (
        !prepareQuoteResponse.hasError &&
        prepareQuoteResponse.data &&
        !quoteProposalResponse.hasError &&
        quoteProposalResponse.data &&
        !profileResponse.hasError &&
        profileResponse.data
      ) {
        const prepareQuoteData = prepareQuoteResponse.data.data;
        const quoteProposalData = quoteProposalResponse.data.data;
        const profileData = profileResponse.data.data;

        navigate(
          `/seller-dashboard/procurement-services/invoice-for-edprowise`,
          {
            state: { prepareQuoteData, quoteProposalData, profileData },
          }
        );
      } else {
        console.error(
          "Error fetching Prepare Quote, Quote Proposal, or School Profile data"
        );
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchInvoiceDataForBuyer = async (enquiryNumber, schoolId) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const sellerId = userDetails?.id;

    if (!sellerId || !enquiryNumber || !schoolId) {
      console.error("Seller ID, Enquiry Number, or School ID is missing");
      return;
    }

    try {
      // Fetch Prepare Quote data
      const prepareQuoteResponse = await getAPI(
        `/prepare-quote?sellerId=${sellerId}&enquiryNumber=${enquiryNumber}`
      );

      // Fetch Quote Proposal data
      const quoteProposalResponse = await getAPI(
        `/quote-proposal?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`
      );

      // Fetch Profile data based on the schoolId
      const profileResponse = await getAPI(
        `/quote-proposal-pdf-required-data/${schoolId}`
      );

      if (
        !prepareQuoteResponse.hasError &&
        prepareQuoteResponse.data &&
        !quoteProposalResponse.hasError &&
        quoteProposalResponse.data &&
        !profileResponse.hasError &&
        profileResponse.data
      ) {
        const prepareQuoteData = prepareQuoteResponse.data.data;
        const quoteProposalData = quoteProposalResponse.data.data;
        const profileData = profileResponse.data.data;

        navigate(`/seller-dashboard/procurement-services/invoice-for-buyer`, {
          state: { prepareQuoteData, quoteProposalData, profileData },
        });
      } else {
        console.error(
          "Error fetching Prepare Quote, Quote Proposal, or School Profile data"
        );
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All Orders List</h4>
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
                        <th>Status</th>
                        <th>Expected Delivery Date</th>
                        <th>Total Invoice Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.map((order) => (
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
                          <td>{order.supplierStatus}</td>

                          <td>{formatDate(order.expectedDeliveryDate)}</td>
                          <td>{order.totalAmount}</td>

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
                              <Link
                                onClick={(event) =>
                                  openUpdateOrderDetailsModal(
                                    event,
                                    order.orderNumber
                                  )
                                }
                                className="btn btn-soft-primary btn-sm"
                                title="Edit"
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <select
                                id="supplierStatus"
                                name="supplierStatus"
                                className="form-control"
                                value={order.supplierStatus}
                                onChange={(e) =>
                                  handleUpdateOrderStatus(
                                    order.enquiryNumber,
                                    e.target.value
                                  )
                                }
                                required
                              >
                                <option value="">Select Status</option>
                                <option value="Work In Progress">
                                  Work In Progress
                                </option>
                                <option value="Ready For Transit">
                                  Ready For Transit
                                </option>
                                <option value="In-Transit">In-Transit</option>
                                <option value="Delivered">Delivered</option>
                              </select>

                              <Link>
                                {[
                                  "Ready For Transit",
                                  "In-Transit",
                                  "Delivered",
                                ].includes(order.supplierStatus) && (
                                  <Link
                                    onClick={() =>
                                      fetchInvoiceDataForEdprowise(
                                        order.enquiryNumber,
                                        order.schoolId
                                      )
                                    }
                                    className="btn btn-soft-info btn-sm"
                                    title="Download PDF Invoice For Edprowise"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                  >
                                    <iconify-icon
                                      icon="solar:download-broken"
                                      className="align-middle fs-18"
                                    />
                                  </Link>
                                )}
                              </Link>

                              <Link>
                                {[
                                  "Ready For Transit",
                                  "In-Transit",
                                  "Delivered",
                                ].includes(order.supplierStatus) && (
                                  <Link
                                    onClick={() =>
                                      fetchInvoiceDataForBuyer(
                                        order.enquiryNumber,
                                        order.schoolId
                                      )
                                    }
                                    className="btn btn-soft-info btn-sm"
                                    title="Download PDF Invoice For Buyer"
                                    data-bs-toggle="popover"
                                    data-bs-trigger="hover"
                                  >
                                    <iconify-icon
                                      icon="solar:download-broken"
                                      className="align-middle fs-18"
                                    />
                                  </Link>
                                )}
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
      <UpdateOrderDetailsModal
        isOpen={isModalOpen}
        onClose={closeUpdateOrderDetailsModal}
        orderNumber={selectedOrderNumber} // Fix: Pass selected order number
        onOrderDetailsUpdated={handleOrderDetailsUpdated}
      />
    </>
  );
};

export default TrackOrderHistoryTable;
