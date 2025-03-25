import { useLocation, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../../../api/getAPI";
import putAPI from "../../../../../api/putAPI";
import { Modal } from "react-bootstrap";
import { formatCost } from "../../../../CommonFunction";

const ViewPrepareQuoteListFromSeller = ({ onQuoteUpdated }) => {
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
        onQuoteUpdated();
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

  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(5);

  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentPreparedQuotes = preparedQuotes.slice(
    indexOfFirstSchool,
    indexOfLastSchool
  );

  const totalPages = Math.ceil(preparedQuotes.length / schoolsPerPage);

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
                        <th>
                          {preparedQuotes.length > 0 &&
                          preparedQuotes[0].updateCountBySeller === 0 &&
                          (preparedQuotes[0].supplierStatus ===
                            "Quote Requested" ||
                            preparedQuotes[0].supplierStatus ===
                              "Quote Submitted")
                            ? "Action"
                            : null}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {preparedQuotes.length > 0 ? (
                        currentPreparedQuotes.map((quote) => (
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
                                {editedQuote[quote._id] ? (
                                  <input
                                    type="text"
                                    name="subcategoryName"
                                    value={
                                      editedQuote[quote._id].subcategoryName
                                    }
                                    onChange={(e) =>
                                      handleInputChange(quote._id, e)
                                    }
                                    className="form-control"
                                  />
                                ) : (
                                  <>
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
                                  </>
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
                                formatCost(quote.listingRate)
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
                            <td>{formatCost(quote.finalRateBeforeDiscount)}</td>
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
                            <td>{formatCost(quote.finalRate)}</td>
                            <td>{formatCost(quote.taxableValue)}</td>
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
                            <td>{formatCost(quote.cgstAmount)}</td>
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
                            <td>{formatCost(quote.sgstAmount)}</td>
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
                            <td>{formatCost(quote.igstAmount)}</td>
                            <td>
                              {formatCost(quote.amountBeforeGstAndDiscount)}
                            </td>
                            <td>{formatCost(quote.discountAmount)}</td>
                            <td>{formatCost(quote.gstAmount)}</td>
                            <td>{formatCost(quote.totalAmount)}</td>

                            <td>
                              {quote.supplierStatus === "Quote Requested" ||
                              quote.supplierStatus === "Quote Submitted" ? (
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    if (editedQuote[quote._id]) {
                                      handleUpdate(quote._id);
                                    } else {
                                      setEditedQuote((prev) => ({
                                        ...prev,
                                        [quote._id]: {
                                          subcategoryName:
                                            quote.subcategoryName,
                                          hsnSacc: quote.hsnSacc,
                                          listingRate: quote.listingRate,
                                          edprowiseMargin:
                                            quote.edprowiseMargin,
                                          quantity: quote.quantity,
                                          discount: quote.discount,
                                          cgstRate: quote.cgstRate,
                                          sgstRate: quote.sgstRate,
                                          igstRate: quote.igstRate,
                                        },
                                      }));
                                    }
                                  }}
                                >
                                  {editedQuote[quote._id] ? "Save" : "Edit"}
                                </button>
                              ) : null}
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
