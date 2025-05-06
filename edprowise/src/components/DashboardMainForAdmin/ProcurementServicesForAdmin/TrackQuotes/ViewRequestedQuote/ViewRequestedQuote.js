import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { Modal } from "react-bootstrap";

import getAPI from "../../../../../api/getAPI";
import ViewAllQuoteTable from "../ViewAllQuoteTable/ViewAllQuoteTable";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewRequestedQuote = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const enquiryNumber =
    location.state?.enquiryNumber || location.state?.searchEnquiryNumber;
  const schoolId = location.state?.schoolId;

  const [quotes, setQuotes] = useState([]);
  const [isQuoteTableVisible, setIsQuoteTableVisible] = useState(false);
  const [submittedQuotes, setSubmittedQuotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchRequestedQuoteData();
  }, [enquiryNumber]);

  const fetchRequestedQuoteData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
      const response = await getAPI(
        `/get-quote/${encodedEnquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data.data.products) {
        setQuotes(response.data.data.products);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  useEffect(() => {
    if (!quotes.length) return;
    quotes.forEach((quote) => {
      if (quote.enquiryNumber) {
        fetchAllQuoteData(quote.enquiryNumber);
      }
    });
  }, [quotes]);

  const fetchAllQuoteData = async (enquiryNumber) => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
      const response = await getAPI(
        `/submit-quote/${encodedEnquiryNumber}`,
        {},
        true
      );

      if (
        !response.hasError &&
        response.data &&
        response.data.data.length > 0
      ) {
        setSubmittedQuotes((prev) => ({
          ...prev,
          [enquiryNumber]: response.data.data,
        }));
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching submitted-quote:", err);
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
                      {quotes.length > 0 ? (
                        quotes.map((quote) => (
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
                                )}
                                <Link className="text-dark fw-medium">
                                  {quote.subCategoryName}
                                </Link>
                              </div>
                            </td>
                            <td>{quote.categoryName}</td>
                            <td>{quote.quantity}</td>
                            <td>{quote.unit}</td>
                            <td>{quote.description}</td>
                            <td>{formatDate(quote.createdAt)}</td>
                            <td>{formatDate(quote.expectedDeliveryDate)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  {Object.values(submittedQuotes).some(
                    (quotes) => quotes.length > 0
                  ) && (
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={() =>
                        setIsQuoteTableVisible(!isQuoteTableVisible)
                      }
                    >
                      {isQuoteTableVisible ? "Hide Quote" : "View Quote"}
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isQuoteTableVisible && quotes.length > 0 ? (
          <ViewAllQuoteTable />
        ) : (
          <div className="row"></div>
        )}
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

export default ViewRequestedQuote;
