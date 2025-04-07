import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import OrderPlaceModal from "./OrderPlaceModal";

import { formatCost } from "../../../../CommonFunction";

const ViewCart = () => {
  const location = useLocation();
  const { enquiryNumber } = location.state || {};
  const buyerStaus = location?.state?.buyerStatus;

  const [carts, setCarts] = useState({});
  const [items, setItems] = useState({});
  const [selectedCart, setSelectedCart] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [modalEnquiryNumber, setModalEnquiryNumber] = useState(null);

  const [latestDeliveryDate, setLatestDeliveryDate] = useState("");

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchCartData();
  }, [enquiryNumber]);

  const fetchCartData = async () => {
    try {
      const response = await getAPI(
        `cart?enquiryNumber=${enquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data.data) {
        setCarts(response.data.data.groupedData || {});
        setLatestDeliveryDate(response.data.data.latestDeliveryDate);
        console.log(
          "carts from view cart",
          response.data.data.latestDeliveryDate
        );
      } else {
        console.error("Invalid response format or error in response");
        setCarts({});
      }
    } catch (err) {
      console.error("Error fetching cart data:", err);
      setCarts({});
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");

  const openBulkDeleteDialog = (enquiryNumber, sellerId) => {
    setSelectedCart({ enquiryNumber, sellerId });
    setIsBulkDeleteDialogOpen(true);
    setDeleteType("cart");
  };

  const handleBulkDeleteCancel = () => {
    setIsBulkDeleteDialogOpen(false);
    setSelectedCart(null);
  };

  const handleBulkDeleteConfirmed = ({ enquiryNumber, sellerId }) => {
    setCarts((prevCarts) => {
      const updatedCarts = { ...prevCarts };
      Object.keys(updatedCarts).forEach((companyName) => {
        updatedCarts[companyName] = updatedCarts[companyName].filter(
          (item) =>
            !(
              item.enquiryNumber === enquiryNumber && item.sellerId === sellerId
            )
        );
        if (updatedCarts[companyName].length === 0) {
          delete updatedCarts[companyName];
        }
      });
      return updatedCarts;
    });
  };

  const openDeleteDialog = (cart) => {
    console.log("cartid: ", cart._id);

    setSelectedCart({ cart });
    setIsDeleteDialogOpen(true);
    setDeleteType("singleCart");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCart(null);
  };

  const handleSingleDeleteConfirmed = (_id) => {
    console.log("cartid from delete confirmed: " + _id);
    setCarts((prevCarts) => {
      const updatedCarts = { ...prevCarts };
      Object.keys(updatedCarts).forEach((companyName) => {
        updatedCarts[companyName] = updatedCarts[companyName].filter(
          (item) => item._id !== _id
        );
        if (updatedCarts[companyName].length === 0) {
          delete updatedCarts[companyName];
        }
      });
      return updatedCarts;
    });
  };

  const handleOpenOrderPlaceModal = () => {
    if (!enquiryNumber) {
      console.error("Enquiry number is missing!");
      return;
    }
    setModalEnquiryNumber(enquiryNumber);

    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container">
        <div className="card-header d-flex justify-content-between align-items-center gap-1 mb-3 ps-3 pe-3">
          <h3 className="card-title flex-grow-1">Cart List</h3>
          <button
            className="btn btn-soft-danger btn-sm d-flex align-items-center gap-2"
            onClick={handleOpenOrderPlaceModal}
          >
            <iconify-icon
              icon="solar:cart-check-broken"
              className="align-middle fs-18"
            />
            <span>Place Order</span>
          </button>
        </div>

        {carts && Object.keys(carts).length === 0 ? (
          <p>No cart data available.</p>
        ) : (
          Object.entries(carts).map(([companyName, items]) => (
            <div className="row">
              <div className="col-xl-12">
                <div key={companyName} className="card">
                  <div className="card-header d-flex justify-content-between align-items-center gap-1">
                    <h4 className="card-title flex-grow-1">{companyName}</h4>
                    {(buyerStaus === "Quote Requested" ||
                      buyerStaus === "Quote Received") && (
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          openBulkDeleteDialog(
                            enquiryNumber,
                            items[0]?.sellerId
                          );
                        }}
                        className="btn btn-soft-danger btn-sm"
                      >
                        <iconify-icon
                          icon="solar:trash-bin-minimalistic-2-broken"
                          className="align-middle fs-18"
                        />
                      </Link>
                    )}
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
                            <th>Sr</th>
                            <th>Product Subcategory</th>
                            <th>HSN/SACC</th>
                            {/* <th>Listing Rate</th> */}
                            <th>Quantity</th>
                            <th>Final Rate Before Discount</th>
                            <th>Discount %</th>
                            <th>Final Rate</th>
                            <th>Taxable Value</th>
                            {items.some((item) => item?.cgstRate !== 0) ? (
                              <th>CGST Rate</th>
                            ) : (
                              <></>
                            )}

                            {items.some((item) => item?.cgstAmount !== 0) ? (
                              <th>CGST Amount</th>
                            ) : (
                              <></>
                            )}

                            {items.some((item) => item?.sgstRate !== 0) ? (
                              <th>SGST Rate</th>
                            ) : (
                              <></>
                            )}

                            {items.some((item) => item?.sgstAmount !== 0) ? (
                              <th>SGST Amount</th>
                            ) : (
                              <></>
                            )}

                            {items.some((item) => item.igstRate !== 0) ? (
                              <th>IGST Rate</th>
                            ) : (
                              <></>
                            )}

                            {items.some((item) => item?.igstAmount !== 0) ? (
                              <th>IGST Amount</th>
                            ) : (
                              <></>
                            )}
                            <th>Amount Before GST & Discount</th>
                            <th>Discount Amount</th>
                            <th>GST Amount</th>
                            <th>Total Amount</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, index) => (
                            <tr key={item._id}>
                              <td style={{ width: 20 }}>
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
                              </td>
                              <td>{index + 1}</td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  {item.cartImage && (
                                    <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                      <img
                                        className="avatar-md"
                                        alt={item.subcategoryName}
                                        src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${item.cartImage}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          handleImageClick(
                                            `${process.env.REACT_APP_API_URL_FOR_IMAGE}${item.cartImage}`
                                          )
                                        }
                                      />
                                    </div>
                                  )}
                                  <span>{item.subcategoryName}</span>
                                </div>
                              </td>
                              <td>{item.hsnSacc}</td>
                              {/* <td>{item.listingRate}</td> */}
                              <td>{item.quantity}</td>
                              <td>{item.finalRateBeforeDiscount}</td>
                              <td>{item.discount}</td>
                              <td>{item.finalRate}</td>
                              <td>{item.taxableValue}</td>
                              {item?.cgstRate !== 0 ? (
                                <td>{item?.cgstRate}</td>
                              ) : null}

                              {item.cgstAmount !== 0 ? (
                                <td>{formatCost(item.cgstAmount)}</td>
                              ) : (
                                <></>
                              )}

                              {item?.sgstRate !== 0 ? (
                                <td>{item?.sgstRate}</td>
                              ) : null}

                              {item.sgstAmount !== 0 ? (
                                <td>{formatCost(item.sgstAmount)}</td>
                              ) : (
                                <></>
                              )}

                              {item?.igstRate !== 0 ? (
                                <td>{item?.igstRate}</td>
                              ) : null}

                              {item.igstAmount !== 0 ? (
                                <td>{formatCost(item.igstAmount)}</td>
                              ) : (
                                <></>
                              )}
                              <td>{item.amountBeforeGstAndDiscount}</td>
                              <td>{item.discountAmount}</td>
                              <td>{item.gstAmount}</td>
                              <td>{item.totalAmount}</td>

                              {/* <td>
                                <Link
                                  className="btn btn-soft-danger btn-sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openDeleteDialog(item);
                                  }}
                                >
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Image Modal */}
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

      {/* it will open delete dialoge  */}
      {isBulkDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleBulkDeleteCancel}
          deleteType={deleteType}
          id={selectedCart}
          onDeleted={handleBulkDeleteConfirmed}
        />
      )}

      {/* {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedCart.cart._id}
          onDeleted={handleSingleDeleteConfirmed}
        />
      )} */}

      {isModalOpen && (
        <OrderPlaceModal
          onClose={handleCloseModal}
          enquiryNumber={modalEnquiryNumber}
          carts={carts}
          fetchCartData={fetchCartData}
          latestDeliveryDate={latestDeliveryDate}
        />
      )}
    </>
  );
};

export default ViewCart;
