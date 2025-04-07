import { useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../../../api/getAPI";
import { formatCost } from "../../../../CommonFunction";

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
                        {/* <th>Listing Rate</th> */}
                        <th>Quantity</th>
                        <th>Final Rate Before Discount</th>
                        <th>Discount %</th>
                        <th>Final Rate</th>
                        <th>Taxable Value</th>
                        {preparedQuotes.some(
                          (quote) => quote.cgstRate !== 0
                        ) ? (
                          <th>CGST Rate</th>
                        ) : (
                          <></>
                        )}

                        {preparedQuotes.some(
                          (quote) => quote.cgstAmount !== 0
                        ) ? (
                          <th>CGST Amount</th>
                        ) : (
                          <></>
                        )}

                        {preparedQuotes.some(
                          (quote) => quote.sgstRate !== 0
                        ) ? (
                          <th>SGST Rate</th>
                        ) : (
                          <></>
                        )}

                        {preparedQuotes.some(
                          (quote) => quote.sgstAmount !== 0
                        ) ? (
                          <th>SGST Amount</th>
                        ) : (
                          <></>
                        )}

                        {preparedQuotes.some(
                          (quote) => quote.igstRate !== 0
                        ) ? (
                          <th>IGST Rate</th>
                        ) : (
                          <></>
                        )}

                        {preparedQuotes.some(
                          (quote) => quote.igstAmount !== 0
                        ) ? (
                          <th>IGST Amount</th>
                        ) : (
                          <></>
                        )}
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
                            {/* <td>{formatCost(quote.listingRate)}</td> */}

                            <td>{quote.quantity}</td>
                            <td>{formatCost(quote.finalRateBeforeDiscount)}</td>
                            <td>{quote.discount}</td>
                            <td>{formatCost(quote.finalRate)}</td>
                            <td>{formatCost(quote.taxableValue)}</td>
                            {quote?.cgstRate !== 0 ? (
                              <td>{quote?.cgstRate}</td>
                            ) : null}

                            {quote.cgstAmount !== 0 ? (
                              <td>{formatCost(quote.cgstAmount)}</td>
                            ) : (
                              <></>
                            )}

                            {quote?.sgstRate !== 0 ? (
                              <td>{quote?.sgstRate}</td>
                            ) : null}

                            {quote.sgstAmount !== 0 ? (
                              <td>{formatCost(quote.sgstAmount)}</td>
                            ) : (
                              <></>
                            )}

                            {quote?.igstRate !== 0 ? (
                              <td>{quote?.igstRate}</td>
                            ) : null}

                            {quote.igstAmount !== 0 ? (
                              <td>{formatCost(quote.igstAmount)}</td>
                            ) : (
                              <></>
                            )}
                            <td>
                              {formatCost(quote.amountBeforeGstAndDiscount)}
                            </td>
                            <td>{formatCost(quote.discountAmount)}</td>
                            <td>{formatCost(quote.gstAmount)}</td>
                            <td>{formatCost(quote.totalAmount)}</td>
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
