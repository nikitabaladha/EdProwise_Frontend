import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../../export-excel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import autoTable from "jspdf-autotable";
import { useLocation } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import putAPI from "../../../../../api/putAPI";
import jsPDF from "jspdf";
import { format } from "date-fns";
import { formatCost } from "../../../../CommonFunction";
import { Modal, Button } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewAllQuoteTable = () => {
  const location = useLocation();
  const enquiryNumber = location.state?.enquiryNumber;
  const schoolId = location.state?.schoolId;

  const navigate = useNavigate();

  const [submittedQuotes, setSubmittedQuotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rejectComment, setRejectComment] = useState("");

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchAllQuoteData();
  }, [enquiryNumber]);

  const fetchAllQuoteData = async () => {
    try {
      const response = await getAPI(`/submit-quote/${enquiryNumber}`, {}, true);

      if (!response.hasError && response.data) {
        setSubmittedQuotes(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching submitted-quote:", err);
    }
  };

  const handleVenderStatusUpdate = async (sellerId, newStatus) => {
    try {
      const response = await putAPI(
        `/update-vender-status?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`,
        { venderStatus: newStatus },
        true
      );

      if (!response.hasError) {
        toast.success(`Quote status updated to "${newStatus}" successfully!`);
        fetchAllQuoteData();
      } else {
        toast.error(response.message || "Failed to update vender status");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const navigateToViewQuote = (event, quote) => {
    event.preventDefault();

    navigate(`/admin-dashboard/procurement-services/view-quote`, {
      state: {
        sellerId: quote.sellerId,
        enquiryNumber: quote.enquiryNumber,
        quote: quote,
        schoolId,
      },
    });
  };

  const handleExport = () => {};

  const fetchPrepareQuoteAndProposalData = async (
    enquiryNumber,
    sellerId,
    schoolId
  ) => {
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

        navigate(`/admin-dashboard/procurement-services/quote-proposal`, {
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

  const openRejectCommentModal = (comment) => {
    setRejectComment(comment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRejectComment("");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">View All Quote List</h4>
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
                        <th>Name of Supplier</th>
                        <th>Expected Delivery Date (Mention by Seller)</th>
                        <th>Quoted Amount</th>
                        <th>Remarks from Supplier</th>
                        <th>Status From Buyer</th>
                        {/* {submittedQuotes?.venderStatusFromBuyer ===
                          "Quote Not Accepted" && <th>Status From Buyer</th>} */}

                        {submittedQuotes.some(
                          (quote) =>
                            quote.venderStatusFromBuyer === "Quote Not Accepted"
                        ) && <th>Status From Buyer</th>}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submittedQuotes.map((quote) => (
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
                          <td>{quote.companyName}</td>
                          <td>
                            {formatDate(quote.expectedDeliveryDateBySeller)}
                          </td>
                          <td>{formatCost(quote.quotedAmount)}</td>
                          <td>{quote.remarksFromSupplier || "Not Provided"}</td>
                          <td>{quote.venderStatusFromBuyer}</td>

                          <td>
                            <div className="d-flex gap-2">
                              {quote.venderStatusFromBuyer ===
                                "Quote Not Accepted" && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    openRejectCommentModal(
                                      quote.rejectCommentFromBuyer
                                    )
                                  }
                                >
                                  Comment From Buyer
                                </button>
                              )}

                              <Link
                                onClick={(event) =>
                                  navigateToViewQuote(event, quote)
                                }
                                className="btn btn-light btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>

                              <Link
                                onClick={() =>
                                  fetchPrepareQuoteAndProposalData(
                                    quote?.enquiryNumber,
                                    quote?.sellerId,
                                    schoolId
                                  )
                                }
                                className="btn btn-soft-info btn-sm"
                                title="Download PDF"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                              >
                                <iconify-icon
                                  icon="solar:download-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>

                              {["Quote Requested", "Quote Received"].includes(
                                quote?.edprowiseStatus
                              ) && (
                                <>
                                  {quote.venderStatus === "Pending" && (
                                    <>
                                      <button
                                        className="btn btn-success btn-sm"
                                        onClick={() =>
                                          handleVenderStatusUpdate(
                                            quote.sellerId,
                                            "Quote Accepted"
                                          )
                                        }
                                      >
                                        Accept
                                      </button>
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                          handleVenderStatusUpdate(
                                            quote.sellerId,
                                            "Quote Not Accepted"
                                          )
                                        }
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  {quote.venderStatus === "Quote Accepted" && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        handleVenderStatusUpdate(
                                          quote.sellerId,
                                          "Quote Not Accepted"
                                        )
                                      }
                                    >
                                      Reject
                                    </button>
                                  )}
                                  {quote.venderStatus ===
                                    "Quote Not Accepted" && (
                                    <button
                                      className="btn btn-success btn-sm"
                                      onClick={() =>
                                        handleVenderStatusUpdate(
                                          quote.sellerId,
                                          "Quote Accepted"
                                        )
                                      }
                                    >
                                      Accept
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* end table-responsive */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Reject Comment From Buyer */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Body className="modal-body-scrollable">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body custom-heading-padding">
                    <div className="row">
                      <div className="text-end">
                        <RxCross1 onClick={closeModal} className="ms-2" />
                      </div>
                      <div className="col-md-12">
                        <div className="mb-2">
                          <label
                            htmlFor="rejectCommentFromBuyer"
                            className="form-label"
                          >
                            Reject Comment From Buyer
                          </label>
                          <input
                            type="text"
                            name="rejectCommentFromBuyer"
                            value={rejectComment}
                            readOnly
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewAllQuoteTable;
