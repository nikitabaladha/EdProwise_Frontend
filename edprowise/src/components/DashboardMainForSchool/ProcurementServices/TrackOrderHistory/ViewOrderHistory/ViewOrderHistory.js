import { format } from "date-fns";

import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { formatCost } from "../../../../CommonFunction";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewOrderHistory = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const order = location.state?.order;
  const orderNumber = order?.orderNumber;
  const sellerId = order?.sellerId;

  const enquiryNumber = location.state?.enquiryNumber;

  const handleNavigation = () => {
    navigate("/school-dashboard/procurement-services/pay-to-edprowise");
  };

  const [quote, setQuote] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!enquiryNumber) return;

    fetchRequestedQuoteData();
    fetchOrderDetails();
  }, [enquiryNumber]);

  const fetchRequestedQuoteData = async () => {
    try {
      const response = await getAPI(`/get-quote/${enquiryNumber}`, {}, true);

      if (!response.hasError && response.data.data.products) {
        setQuote(response.data.data.products);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await getAPI(
        `/order-from-buyer/${orderNumber}/${sellerId}`,
        {},
        true
      );

      if (!response.hasError && response.data.data) {
        setOrders(response.data.data);
        console.log(
          "order data from function from school order history",
          response.data.data
        );
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  const fetchInvoiceDataForBuyer = async (enquiryNumber, sellerId) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

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
        `/quote-proposal-pdf-required-data/${schoolId}/${enquiryNumber}/${sellerId}`
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

        navigate(`/school-dashboard/procurement-services/invoice-for-buyer`, {
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
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  if (!order) {
    return <div>No order details available.</div>;
  }

  return (
    <>
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
                      <p className="form-control">{order?.companyName}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="orderNumber" className="form-label">
                        Order Number
                      </label>
                      <p className="form-control">{order?.orderNumber}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="orderDate" className="form-label">
                        Order Date
                      </label>
                      <p className="form-control">
                        {formatDate(order?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="expectedDeliveryDate"
                        className="form-label"
                      >
                        Expected Delivery Date
                      </label>

                      <p className="form-control">
                        {formatDate(order?.expectedDeliveryDate)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="actualDeliveryDate"
                        className="form-label"
                      >
                        Actual Delivery Date
                      </label>
                      <p className="form-control">
                        {order?.actualDeliveryDate
                          ? formatDate(order?.actualDeliveryDate)
                          : "Null"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="advanceAdjustment" className="form-label">
                        Advance Adjustment
                      </label>
                      <p className="form-control">
                        {formatCost(order?.advanceAdjustment)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="otherCharges" className="form-label">
                        Other Charges
                      </label>
                      <p className="form-control">
                        {formatCost(order?.otherCharges)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="taxableValue" className="form-label">
                        Taxable Value
                      </label>
                      <p className="form-control">
                        {formatCost(order?.totalTaxableValue)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gstAmount" className="form-label">
                        GST Amount
                      </label>
                      <p className="form-control">
                        {formatCost(order?.totalGstAmount)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="totalInvoiceAmount"
                        className="form-label"
                      >
                        Total Invoice Amount
                      </label>
                      <p className="form-control">
                        {formatCost(order?.totalAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="tdsValue" className="form-label">
                        TDS Value
                      </label>
                      <p className="form-control">
                        {formatCost(order?.tdsValue)}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="finalPayableAmountWithTDS"
                        className="form-label"
                      >
                        Balance Amount
                      </label>
                      <p className="form-control">
                        {formatCost(order?.finalPayableAmountWithTDS)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <Link>
                    {["Ready For Transit", "In-Transit", "Delivered"].includes(
                      order.supplierStatus
                    ) && (
                      <Link
                        onClick={() =>
                          fetchInvoiceDataForBuyer(
                            order?.enquiryNumber,
                            order?.sellerId
                          )
                        }
                        className="btn btn-soft-info btn-sm"
                        title="Download PDF Invoice For Buyer"
                        data-bs-toggle="popover"
                        data-bs-trigger="hover"
                      >
                        Download Invoice {}
                        <iconify-icon
                          icon="solar:download-broken"
                          className="align-middle fs-18"
                        />{" "}
                      </Link>
                    )}
                  </Link>

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
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Product Description</th>
                        <th>Quote Requested Date</th>
                        <th>Delivery Expected Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quote.length > 0 ? (
                        quote.map((product) => (
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
                            <td>{product.enquiryNumber}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {product.productImage && (
                                  <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                    <img
                                      className="avatar-md"
                                      alt={product.subCategoryName}
                                      src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${product?.productImage}`}
                                      onClick={() =>
                                        handleImageClick(
                                          `${process.env.REACT_APP_API_URL_FOR_IMAGE}${product.productImage}`
                                        )
                                      }
                                    />
                                  </div>
                                )}
                                <div>
                                  <Link className="text-dark fw-medium">
                                    {product.subCategoryName}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>{product.categoryName}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unit}</td>
                            <td>{product.description}</td>
                            <td>{formatDate(product.createdAt)}</td>
                            <td>{formatDate(product.expectedDeliveryDate)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* end table-responsive */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Order From Buyer
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
                        <th>Order Number</th>
                        <th>Product Required Image & Name</th>
                        <th>Quantity</th>
                        <th>Listing Rate</th>
                        <th>Discount</th>
                        <th>Final Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <tr key={order._id}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`customCheck${order._id}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`customCheck${order._id}`}
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>{order.orderNumber}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {order.cartImage && (
                                  <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                    <img
                                      className="avatar-md"
                                      alt={order.subCategoryName}
                                      src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${order.cartImage}`}
                                      onClick={() =>
                                        handleImageClick(
                                          `${process.env.REACT_APP_API_URL_FOR_IMAGE}${order.cartImage}`
                                        )
                                      }
                                    />
                                  </div>
                                )}
                                <div>
                                  <Link className="text-dark fw-medium">
                                    {order.subcategoryName}
                                  </Link>
                                </div>
                              </div>
                            </td>

                            <td>{order.quantity}</td>
                            <td>{formatCost(order.listingRate)}</td>
                            <td>{order.discount}</td>
                            <td>{formatCost(order.finalRate)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* end table-responsive */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <img
            src={selectedImage}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewOrderHistory;
