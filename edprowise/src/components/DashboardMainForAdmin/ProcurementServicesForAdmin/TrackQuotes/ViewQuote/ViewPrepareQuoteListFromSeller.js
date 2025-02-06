import { useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../../../api/getAPI";
import putAPI from "../../../../../api/putAPI";
import { Modal } from "react-bootstrap";

const ViewPrepareQuoteListFromSeller = () => {
  const location = useLocation();
  const { sellerId, enquiryNumber } = location.state || {};

  const [preparedQuotes, setPreparedQuotes] = useState([]);
  const [editedQuote, setEditedQuote] = useState({});
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

  const handleInputChange = (id, e) => {
    const { name, value } = e.target;
    setEditedQuote((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));
  };

  const handleUpdate = async (id) => {
    const formDataToSend = new FormData();

    for (const key in editedQuote[id]) {
      formDataToSend.append(key, editedQuote[id][key]);
    }

    try {
      const response = await putAPI(
        `/prepare-quote?sellerId=${sellerId}&enquiryNumber=${enquiryNumber}&id=${id}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
        toast.success("Quote updated successfully!");
        setEditedQuote((prev) => ({ ...prev, [id]: null }));
        fetchQuoteData();
      } else {
        toast.error("Failed to update quote.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
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
                        <th>Subcategory Name</th>
                        <th>Prepare Quote Image</th>
                        <th>HSN/SACC</th>
                        <th>Listing Rate</th>
                        <th>EdProwise Margin %</th>
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
                        <th>Action</th>
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
                              {editedQuote[quote._id] ? (
                                <input
                                  type="text"
                                  name="subcategoryName"
                                  value={editedQuote[quote._id].subcategoryName}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.subcategoryName
                              )}
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
                              </div>
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="text"
                                  name="hsnSacc"
                                  value={editedQuote[quote._id].hsnSacc}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.hsnSacc
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="listingRate"
                                  value={editedQuote[quote._id].listingRate}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.listingRate
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="edprowiseMargin"
                                  value={editedQuote[quote._id].edprowiseMargin}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.edprowiseMargin
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="quantity"
                                  value={editedQuote[quote._id].quantity}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.quantity
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="finalRateBeforeDiscount"
                                  value={
                                    editedQuote[quote._id]
                                      .finalRateBeforeDiscount
                                  }
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.finalRateBeforeDiscount
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="discount"
                                  value={editedQuote[quote._id].discount}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.discount
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="finalRate"
                                  value={editedQuote[quote._id].finalRate}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.finalRate
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="taxableValue"
                                  value={editedQuote[quote._id].taxableValue}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.taxableValue
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="cgstRate"
                                  value={editedQuote[quote._id].cgstRate}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.cgstRate
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="cgstAmount"
                                  value={editedQuote[quote._id].cgstAmount}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.cgstAmount
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="sgstRate"
                                  value={editedQuote[quote._id].sgstRate}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.sgstRate
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="sgstAmount"
                                  value={editedQuote[quote._id].sgstAmount}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.sgstAmount
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="igstRate"
                                  value={editedQuote[quote._id].igstRate}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.igstRate
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="igstAmount"
                                  value={editedQuote[quote._id].igstAmount}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.igstAmount
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="amountBeforeGstAndDiscount"
                                  value={
                                    editedQuote[quote._id]
                                      .amountBeforeGstAndDiscount
                                  }
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.amountBeforeGstAndDiscount
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="discountAmount"
                                  value={editedQuote[quote._id].discountAmount}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.discountAmount
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="gstAmount"
                                  value={editedQuote[quote._id].gstAmount}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.gstAmount
                              )}
                            </td>
                            <td>
                              {editedQuote[quote._id] ? (
                                <input
                                  type="number"
                                  name="totalAmount"
                                  value={editedQuote[quote._id].totalAmount}
                                  onChange={(e) =>
                                    handleInputChange(quote._id, e)
                                  }
                                  className="form-control"
                                />
                              ) : (
                                quote.totalAmount
                              )}
                            </td>

                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  if (editedQuote[quote._id]) {
                                    handleUpdate(quote._id);
                                  } else {
                                    setEditedQuote((prev) => ({
                                      ...prev,
                                      [quote._id]: {
                                        subcategoryName: quote.subcategoryName,
                                        hsnSacc: quote.hsnSacc,
                                        listingRate: quote.listingRate,
                                        edprowiseMargin: quote.edprowiseMargin,
                                        quantity: quote.quantity,
                                        finalRateBeforeDiscount:
                                          quote.finalRateBeforeDiscount,
                                        discount: quote.discount,
                                        finalRate: quote.finalRate,
                                        taxableValue: quote.taxableValue,
                                        cgstRate: quote.cgstRate,
                                        cgstAmount: quote.cgstAmount,
                                        sgstRate: quote.sgstRate,
                                        sgstAmount: quote.sgstAmount,
                                        igstRate: quote.igstRate,
                                        igstAmount: quote.igstAmount,
                                        amountBeforeGstAndDiscount:
                                          quote.amountBeforeGstAndDiscount,
                                        discountAmount: quote.discountAmount,
                                        gstAmount: quote.gstAmount,
                                        totalAmount: quote.totalAmount,
                                      },
                                    }));
                                  }
                                }}
                              >
                                {editedQuote[quote._id] ? "Save" : "Edit"}
                              </button>
                            </td>
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
              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        Previous
                      </Link>
                    </li>
                    <li className="page-item active">
                      <Link className="page-link" to="#">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#">
                        Next
                      </Link>
                    </li>
                  </ul>
                </nav>
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
