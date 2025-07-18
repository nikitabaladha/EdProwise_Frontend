import React, { useState } from "react";
import { toast } from "react-toastify";
import putAPI from "../../../../../api/putAPI";

const CancelReceiptModalSchoolFees = ({ show, onClose, student, schoolId, setIsCancelled }) => {
  const [cancelReason, setCancelReason] = useState("");
  const [chequeSpecificReason, setChequeSpecificReason] = useState("");
  const [additionalComment, setAdditionalComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const cancelOptions = student[0]?.paymentMode === "Cheque"
    ? [
        { value: "Cheque Bounced", label: "Cheque Bounced" },
        { value: "Invalid Cheque", label: "Invalid Cheque" },
        { value: "Incorrect Details", label: "Incorrect Details" },
        { value: "Other", label: "Other" },
      ]
    : [
        { value: "Student Request", label: "Student Request" },
        { value: "Administrative Decision", label: "Administrative Decision" },
        { value: "Payment Issue", label: "Payment Issue" },
        { value: "Other", label: "Other" },
      ];

  const chequeSpecificOptions = [
    { value: "Cancelled", label: "Cancelled" },
    { value: "Cheque Return", label: "Cheque Return" },
  ];

  const handleSubmit = async () => {
    // Validate inputs
    if (!cancelReason) {
      toast.error("Please select a cancel reason.");
      return;
    }
    if (student[0]?.paymentMode === "Cheque" && !chequeSpecificReason) {
      toast.error("Please select a cheque-specific reason.");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare payload
      const payload = {
        status: chequeSpecificReason === "Cheque Return" ? "Cheque Return" : "Cancelled",
        cancelReason,
        additionalComment,
      };
      if (student[0]?.paymentMode === "Cheque") {
        payload.chequeSpecificReason = chequeSpecificReason;
      }

   
      const result = await putAPI(
        `/update-school-fees-statusbyadm/${schoolId}/${student[0]?.studentAdmissionNumber}`,
        payload,
        true
      );

      console.log("API Response:", result);

      if (!result.hasError) {
        setIsCancelled(true);
        toast.success("Receipt status updated successfully.");
        onClose({
          ...student[0],
          status: payload.status,
          cancelReason,
          chequeSpecificReason: payload.chequeSpecificReason || null,
        });
      } else {
        console.error("API Error:", result.message, result);
        toast.error(result.message || "Failed to update receipt status.");
      }
    } catch (error) {
      console.error("Error in cancelReceipt:", error);
      toast.error("Error cancelling receipt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1050,
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "400px" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cancel Receipt</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => onClose(null)} 
              aria-label="Close"
              disabled={isLoading}
            />
          </div>
          <div className="modal-body">
            {student[0]?.paymentMode === "Cheque" && (
              <div className="mb-3">
                <label htmlFor="chequeSpecificReason" className="form-label">
                  Cheque-Specific Reason
                </label>
                <select
                  id="chequeSpecificReason"
                  className="form-select"
                  value={chequeSpecificReason}
                  onChange={(e) => setChequeSpecificReason(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">Select a cheque-specific reason...</option>
                  {chequeSpecificOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="cancelReason" className="form-label">
                Cancel Reason
              </label>
              <select
                id="cancelReason"
                className="form-select"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                disabled={isLoading}
              >
                <option value="">Select a reason...</option>
                {cancelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="additionalComment" className="form-label">
                Additional Comment
              </label>
              <textarea
                id="additionalComment"
                className="form-control"
                value={additionalComment}
                onChange={(e) => setAdditionalComment(e.target.value)}
                rows="4"
                placeholder="Enter any additional comments..."
                style={{ width: "100%", boxSizing: "border-box" }}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onClose(null)} 
              disabled={isLoading}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelReceiptModalSchoolFees;