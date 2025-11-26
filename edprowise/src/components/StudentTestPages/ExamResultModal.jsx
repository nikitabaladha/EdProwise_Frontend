import React, { useRef } from "react";

const ExamResultModal = ({ show, onClose, resultData }) => {
   const modalRef = useRef();
  if (!show || !resultData) return null;

 const handleBackdropClick = (e) => {
   // Close modal only if clicked outside the modal content
   if (modalRef.current && !modalRef.current.contains(e.target)) {
     onClose();
   }
 };
  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Test Result</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Total Questions:</strong> {resultData.totalQuestions}
            </p>
            <p>
              <strong>Attempted Questions:</strong>{" "}
              {resultData.attemptedQuestions}
            </p>
            <p>
              <strong>Obtained Marks:</strong> {resultData.obtainedMarks} /{" "}
              {resultData.totalMarks}
            </p>
            <p>
              <strong>Result Status:</strong>{" "}
              <span
                className={
                  resultData.resultStatus === "Pass"
                    ? "text-success"
                    : "text-danger"
                }
              >
                {resultData.resultStatus}
              </span>
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResultModal;
