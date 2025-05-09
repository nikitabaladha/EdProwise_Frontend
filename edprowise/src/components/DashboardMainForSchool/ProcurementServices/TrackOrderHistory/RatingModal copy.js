import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Modal, Button } from "react-bootstrap";
import putAPI from "../../../../api/putAPI";

const RatingModal = ({ onClose, sellerId, schoolId, enquiryNumber }) => {
  const [feedbackComment, setFeedbackComment] = useState("");

  const handleInputChange = (e) => {
    setFeedbackComment(e.target.value);
  };

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      setFeedbackComment,
    };

    setSending(true);

    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

      const response = await putAPI(
        `/feedback-for-order?sellerId=${sellerId}&enquiryNumber=${encodedEnquiryNumber}&schoolId=${schoolId}`,
        formDataToSend,
        true
      );

      if (!response.hasError) {
        toast.success("Order Feedback Send Successfully.");
        onClose();
      } else {
        toast.error(response.message || "Failed Sending Feedback");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Body className="modal-body-scrollable">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Give Rating
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <ul className="d-flex text-warning m-0 fs-20  list-unstyled">
                        <li>
                          <i className="bx bxs-star" />
                        </li>
                        <li>
                          <i className="bx bxs-star" />
                        </li>
                        <li>
                          <i className="bx bxs-star" />
                        </li>
                        <li>
                          <i className="bx bxs-star" />
                        </li>
                        <li>
                          <i className="bx bxs-star-half" />
                        </li>
                      </ul>

                      <div className="col-md-12">
                        <div className="mb-2">
                          <label
                            htmlFor="feedbackComment"
                            className="form-label"
                          >
                            Give Your Feedback
                          </label>
                          <input
                            type="text"
                            name="feedbackComment"
                            value={feedbackComment}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-end">
                      <Button
                        type="submit"
                        variant="success"
                        onClick={handleSubmit}
                        disabled={sending}
                        aria-busy={sending}
                      >
                        {sending ? "Submitting..." : "Submit"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={onClose}
                        className="ms-2"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RatingModal;
