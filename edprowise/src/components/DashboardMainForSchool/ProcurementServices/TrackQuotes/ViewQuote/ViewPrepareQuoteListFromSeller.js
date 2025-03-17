import { useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../../../api/getAPI";

import { Modal } from "react-bootstrap";

const ViewPrepareQuoteListFromSeller = () => {
  const location = useLocation();
  const { sellerId, enquiryNumber } = location.state || {};

  const [preparedQuotes, setPreparedQuotes] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!sellerId || !enquiryNumber) return;

    fetchQuoteData();
  }, [sellerId, enquiryNumber]);

  const fetchQuoteData = async () => {
    try {
      const response = await getAPI(
        `prepare-quote?sellerId=${sellerId}&enquiryNumber=${enquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data.data) {
        setPreparedQuotes(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching prepared-quote:", err);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">Prepared Quote List</h4>
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
                        <th>Product Subcategory</th>
                        <th>HSN/SACC</th>
                        <th>Listing Rate</th>
                        <th>Quantity</th>
                        <th>Final Rate Before Discount</th>
                        <th>Discount %</th>
                        <th>Final Rate</th>
                        <th>Taxable Value</th>
                        <th>CGST Rate</th>
                        <th>CGST Amount</th>
                        <th>SGST Rate</th>
                        <th>SGST Amount</th>
                        <th>IGST Rate</th>
                        <th>IGST Amount</th>
                        <th>Amount Before GST & Discount</th>
                        <th>Discount Amount</th>
                        <th>GST Amount</th>
                        <th>Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preparedQuotes.length > 0 ? (
                        preparedQuotes.map((quote) => (
                          <tr key={quote._id}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`customCheck${quote._id}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`customCheck${quote._id}`}
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>

                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {quote.prepareQuoteImage && (
                                  <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                    <img
                                      className="avatar-md"
                                      alt={quote.subcategoryName}
                                      src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${quote.prepareQuoteImage}`}
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleImageClick(
                                          `${process.env.REACT_APP_API_URL_FOR_IMAGE}${quote.prepareQuoteImage}`
                                        )
                                      }
                                    />
                                  </div>
                                )}
                                <span>{quote.subcategoryName}</span>
                              </div>
                            </td>
                            <td>{quote.hsnSacc}</td>
                            <td>{quote.listingRate}</td>

                            <td>{quote.quantity}</td>
                            <td>{quote.finalRateBeforeDiscount}</td>
                            <td>{quote.discount}</td>
                            <td>{quote.finalRate}</td>
                            <td>{quote.taxableValue}</td>
                            <td>{quote.cgstRate}</td>
                            <td>{quote.cgstAmount}</td>
                            <td>{quote.sgstRate}</td>
                            <td>{quote.sgstAmount}</td>
                            <td>{quote.igstRate}</td>
                            <td>{quote.igstAmount}</td>
                            <td>{quote.amountBeforeGstAndDiscount}</td>
                            <td>{quote.discountAmount}</td>
                            <td>{quote.gstAmount}</td>
                            <td>{quote.totalAmount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">No quotes available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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

export default ViewPrepareQuoteListFromSeller;
