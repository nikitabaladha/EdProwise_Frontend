import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";
import getAPI from "../../../../api/getAPI";
import { Modal } from "react-bootstrap";

const TrackQuoteTable = ({}) => {
  const [quotes, setQuotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await getAPI(`/get-quote-list-for-school`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setQuotes(response.data.data);

          console.log("Quotes fetched successfully:", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchQuoteData(); // Call the function to fetch data
  }, []);

  const navigate = useNavigate();

  const navigateToRequestQuote = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/procurement-services/request-quote`);
  };

  const navigateToViewRequestedQuote = (event, enquiryNumber) => {
    event.preventDefault();
    navigate(`/school-dashboard/procurement-services/view-requested-quote`, {
      state: { enquiryNumber },
    });
  };

  const navigateToViewQuoteTable = (event, enquiryNumber) => {
    event.preventDefault();

    console.log("viewQuoteTable navigation function", enquiryNumber);

    navigate(`/school-dashboard/procurement-services/view-quote-table`, {
      state: { enquiryNumber },
    });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleExport = () => {
    const filteredData = quotes.map((quote) => ({}));

    exportToExcel(filteredData, "Products", "Products Data");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(5);

  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentQuotes = quotes.slice(indexOfFirstSchool, indexOfLastSchool);

  const totalPages = Math.ceil(quotes.length / schoolsPerPage);

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
                <h4 className="card-title flex-grow-1">
                  All Request Quote List
                </h4>
                <Link
                  onClick={(event) => navigateToRequestQuote(event)}
                  className="btn btn-sm btn-primary"
                >
                  Request Quote
                </Link>
                <div className="text-end">
                  <Link className="btn btn-sm btn-outline-light">Export</Link>
                </div>
              </div>
              <div>
                {quotes.length > 0 ? (
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
                          <th className="text-start">
                            Product Required Image & Name
                          </th>
                          <th>Product Required (Category)</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentQuotes.map((quote) => (
                          <tr key={quote.id}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`customCheck${quote.id}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`customCheck${quote.id}`}
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>{quote.enquiryNumber}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {quote.productImage && (
                                  <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                    <img
                                      className="avatar-md"
                                      alt={quote.subCategoryName}
                                      src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${quote?.productImage}`}
                                      onClick={() =>
                                        handleImageClick(
                                          `${process.env.REACT_APP_API_URL_FOR_IMAGE}${quote.productImage}`
                                        )
                                      }
                                    />
                                  </div>
                                )}
                                <div>
                                  <Link className="text-dark fw-medium">
                                    {quote.subCategoryName}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>{quote.categoryName}</td>
                            <td>{quote.quantity}</td>
                            <td>{quote.unit}</td>
                            <td>{quote.buyerStatus}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <Link
                                  className="btn btn-light btn-sm"
                                  onClick={(event) =>
                                    navigateToViewRequestedQuote(
                                      event,
                                      quote?.enquiryNumber
                                    )
                                  }
                                >
                                  <iconify-icon
                                    icon="solar:eye-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                <button
                                  type="button"
                                  className="btn btn-primary custom-submit-button"
                                  onClick={(event) =>
                                    navigateToViewQuoteTable(
                                      event,
                                      quote?.enquiryNumber
                                    )
                                  }
                                >
                                  View Quote
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <tr></tr>
                )}
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

export default TrackQuoteTable;
