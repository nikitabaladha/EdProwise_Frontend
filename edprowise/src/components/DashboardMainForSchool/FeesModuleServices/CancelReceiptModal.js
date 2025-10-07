import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import postAPI from "../../../api/postAPI";
import getAPI from "../../../api/getAPI";

const CancelReceiptModal = ({ show, onClose, student, feeTypeName, classId,sectionId, schoolId, setIsCancelled, action, }) => {
  const [cancelReason, setCancelReason] = useState("");
  const [chequeSpecificReason, setChequeSpecificReason] = useState("");
  const [additionalComment, setAdditionalComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [hasPreviousRefund, setHasPreviousRefund] = useState(false);

  useEffect(() => {
    console.log("CancelReceiptModal Props:", {
      show,
      onClose,
      student,
      feeTypeName,
      classId,
      schoolId,
      setIsCancelled,
      action,
      sectionId
    });
  }, [show, onClose, student, feeTypeName, classId, schoolId, setIsCancelled, action]);

  const [refundData, setRefundData] = useState([
    {
      feeType: feeTypeName,
      paidAmount: student?.finalAmount || 0,
      refundAmount: 0,
      balance: student?.finalAmount || 0,
    },
  ]);

  const cancelOptions = student?.paymentMode === "Cheque"
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

  const paymentModes = ["Cash", "Cheque", "Online"];

  // useEffect(() => {
  //   console.log("useEffect triggered with props:", { schoolId, receiptNumber: student?.receiptNumber, action, student });

  //   const fetchExistingRefund = async () => {
  //     if (!schoolId || !student?.receiptNumber) {
  //       console.warn("Missing schoolId or receiptNumber, using default refundData.");
  //       setRefundData([
  //         {
  //           feeType: feeTypeName,
  //           paidAmount: student?.finalAmount || 0,
  //           refundAmount: 0,
  //           balance: student?.finalAmount || 0,
  //         },
  //       ]);
  //       setHasPreviousRefund(false);
  //       return;
  //     }

  //     try {
  //       const response = await getAPI(`/get-all-cancelled-refund/${schoolId}/${student.receiptNumber}`);
  //       console.log("API Response:", JSON.stringify(response, null, 2));

  //       if (!response.hasError && response.data && response.data.data && response.data.data.refunds && response.data.data.refunds.length > 0) {
  //         const refunds = response.data.data.refunds;
  //         const totalRefundAmount = refunds.reduce(
  //           (sum, refund) => sum + (Number(refund.refundAmount) || 0),
  //           0
  //         );
  //         const paidAmount = Number(refunds[0]?.paidAmount) || Number(student?.finalAmount) || 0;
  //         const totalBalance = paidAmount - totalRefundAmount;

  //         console.log("Calculated refundData:", { totalRefundAmount, paidAmount, totalBalance });

  //         setRefundData([
  //           {
  //             feeType: feeTypeName,
  //             paidAmount,
  //             refundAmount: totalRefundAmount,
  //             balance: totalBalance >= 0 ? totalBalance : 0,
  //           },
  //           {
  //             feeType: feeTypeName,
  //             paidAmount: totalBalance >= 0 ? totalBalance : 0,
  //             refundAmount: 0,
  //             balance: totalBalance >= 0 ? totalBalance : 0,
  //           },
  //         ]);
  //         setHasPreviousRefund(true);
  //       } else {
  //         console.log("No valid refund data found, using default values.");
  //         setRefundData([
  //           {
  //             feeType: feeTypeName,
  //             paidAmount: student?.finalAmount || 0,
  //             refundAmount: 0,
  //             balance: student?.finalAmount || 0,
  //           },
  //         ]);
  //         setHasPreviousRefund(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching refund data:", error);
  //       setRefundData([
  //         {
  //           feeType: feeTypeName,
  //           paidAmount: student?.finalAmount || 0,
  //           refundAmount: 0,
  //           balance: student?.finalAmount || 0,
  //         },
  //       ]);
  //       setHasPreviousRefund(false);
  //     }
  //   };

  //   fetchExistingRefund();
  // }, [schoolId, student?.receiptNumber, feeTypeName, student?.finalAmount, action]);

useEffect(() => {
  console.log("useEffect triggered with props:", { schoolId, receiptNumber: student?.receiptNumber, receiptNumberBrf: student?.receiptNumberBrf, action, student });

  const fetchExistingRefund = async () => {
   
    const receiptIdentifier = student?.receiptNumber || student?.receiptNumberBrf || student?.receiptNumberBef;

    if (!schoolId || !receiptIdentifier) {
      console.warn("Missing schoolId or both receiptNumber and receiptNumberBrf, using default refundData.");
      setRefundData([
        {
          feeType: feeTypeName,
          paidAmount: student?.finalAmount || 0,
          refundAmount: 0,
          balance: student?.finalAmount || 0,
        },
      ]);
      setHasPreviousRefund(false);
      return;
    }

    try {
      const response = await getAPI(`/get-all-cancelled-refund/${schoolId}/${receiptIdentifier}`);
      console.log("API Response:", JSON.stringify(response, null, 2));

      if (!response.hasError && response.data && response.data.data && response.data.data.refunds && response.data.data.refunds.length > 0) {
        const refunds = response.data.data.refunds;
        const totalRefundAmount = refunds.reduce(
          (sum, refund) => sum + (Number(refund.refundAmount) || 0),
          0
        );
        const paidAmount = Number(refunds[0]?.paidAmount) || Number(student?.finalAmount) || 0;
        const totalBalance = paidAmount - totalRefundAmount;

        console.log("Calculated refundData:", { totalRefundAmount, paidAmount, totalBalance });

        setRefundData([
          {
            feeType: feeTypeName,
            paidAmount,
            refundAmount: totalRefundAmount,
            balance: totalBalance >= 0 ? totalBalance : 0,
          },
          {
            feeType: feeTypeName,
            paidAmount: totalBalance >= 0 ? totalBalance : 0,
            refundAmount: 0,
            balance: totalBalance >= 0 ? totalBalance : 0,
          },
        ]);
        setHasPreviousRefund(true);
      } else {
        console.log("No valid refund data found, using default values.");
        setRefundData([
          {
            feeType: feeTypeName,
            paidAmount: student?.finalAmount || 0,
            refundAmount: 0,
            balance: student?.finalAmount || 0,
          },
        ]);
        setHasPreviousRefund(false);
      }
    } catch (error) {
      console.error("Error fetching refund data:", error);
      setRefundData([
        {
          feeType: feeTypeName,
          paidAmount: student?.finalAmount || 0,
          refundAmount: 0,
          balance: student?.finalAmount || 0,
        },
      ]);
      setHasPreviousRefund(false);
    }
  };

  fetchExistingRefund();
}, [schoolId, student?.receiptNumber, student?.receiptNumberBrf, feeTypeName, student?.finalAmount, action]);

  const handleRefundAmountChange = (index, value) => {
    const newRefundData = [...refundData];
    const refundAmount = parseFloat(value) || 0;

    if (refundAmount > newRefundData[index].paidAmount) {
      toast.error("Refund amount cannot exceed paid amount.");
      return;
    }

    newRefundData[index].refundAmount = refundAmount;
    newRefundData[index].balance = newRefundData[index].paidAmount - refundAmount;
    setRefundData(newRefundData);
    console.log("Updated refundData after change:", newRefundData);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!cancelReason && action === "Cancelled/Cheque Return") {
        toast.error("Please select a cancel reason.");
        setIsLoading(false);
        return;
      }

      if (action === "Refund") {
        if (!paymentMode) {
          toast.error("Please select a payment mode.");
          setIsLoading(false);
          return;
        }

        if (paymentMode === "Cheque" && (!chequeNumber || !bankName)) {
          toast.error("Cheque number and bank name are required for Cheque payment mode.");
          setIsLoading(false);
          return;
        }

        const totalNewRefundAmount = refundData[refundData.length - 1].refundAmount;
        if (totalNewRefundAmount <= 0) {
          toast.error("Refund amount must be greater than zero.");
          setIsLoading(false);
          return;
        }
      }

      const payload = {
        schoolId,
        academicYear: student?.academicYear || "",
        refundType: feeTypeName || "",
        registrationNumber: student?.registrationNumber || null,
        admissionNumber: student?.admissionNumber || student?.AdmissionNumber || null,
        firstName: student?.firstName || "",
        lastName: student?.lastName || "",
        classId: classId || "",
        sectionId: sectionId || null,
        paidAmount: refundData[refundData.length - 1].paidAmount,
        refundAmount: action === "Refund" ? refundData[refundData.length - 1].refundAmount : 0,
        cancelledAmount: action === "Cancelled/Cheque Return" ? refundData[0].balance : 0,
        balance: refundData[refundData.length - 1].paidAmount - refundData[refundData.length - 1].refundAmount,
        paymentMode: action === "Refund" ? paymentMode : student?.paymentMode || "",
        chequeNumber: paymentMode === "Cheque" ? chequeNumber : student?.chequeNumber,
        bankName: paymentMode === "Cheque" ? bankName : student?.bankName,
        paymentDate: action === "Refund" ? new Date() : student?.paymentDate || null,
        refundDate: action === "Refund" ? new Date() : null,
        cancelledDate: action === "Cancelled/Cheque Return" ? new Date() : null,
        feeTypeRefunds: action === "Refund" ? [{
          feetype: feeTypeName,
          refundAmount: refundData[refundData.length - 1].refundAmount,
          paidAmount: refundData[refundData.length - 1].paidAmount,
          balance: refundData[refundData.length - 1].paidAmount - refundData[refundData.length - 1].refundAmount,
        }] : refundData.map(item => ({
          feetype: item.feeType || feeTypeName,
          refundAmount: 0,
          cancelledAmount: item.balance,
          paidAmount: item.paidAmount,
          balance: item.paidAmount - item.refundAmount,
        })),
        installmentName: student?.installmentName || null,
        existancereceiptNumber: student?.receiptNumber || student?.receiptNumberBrf || student?.receiptNumberBef,
        status: action === "Refund" ? "Refund" : student?.paymentMode === "Cheque" ? "Cheque Return" : "Cancelled",
        cancelReason: action === "Cancelled/Cheque Return" ? cancelReason : undefined,
        chequeSpecificReason: action === "Cancelled/Cheque Return" && student?.paymentMode === "Cheque" ? chequeSpecificReason : undefined,
        additionalComment,
      };

      console.log("Submitting payload:", JSON.stringify(payload, null, 2));

      const response = await postAPI("/create-cancelled-refund", payload);
      console.log("Post API Response:", JSON.stringify(response, null, 2));

      if (response.hasError) {
        const errorMessage = response.message || "Failed to process action.";
        toast.error(errorMessage);
        setIsLoading(false);
        return;
      }

      toast.success("Receipt action completed successfully.");
      setIsCancelled(true);
      setHasPreviousRefund(true);

   const receiptIdentifier = student?.receiptNumber || student?.receiptNumberBrf || student?.receiptNumberBef;
    const updatedRefund = await getAPI(`/get-all-cancelled-refund/${schoolId}/${receiptIdentifier}`);

      if (!updatedRefund.hasError && updatedRefund.data && updatedRefund.data.data && updatedRefund.data.data.refunds && updatedRefund.data.data.refunds.length > 0) {
        const refunds = updatedRefund.data.data.refunds;
        const totalRefundAmount = refunds.reduce(
          (sum, refund) => sum + (Number(refund.refundAmount) || 0),
          0
        );
        const totalCancelledAmount = refunds.reduce(
          (sum, refund) => sum + (Number(refund.cancelledAmount) || 0),
          0
        );
        const paidAmount = Number(refunds[0]?.paidAmount) || Number(student?.finalAmount) || 0;
        const totalBalance = paidAmount - totalRefundAmount - totalCancelledAmount;

        setRefundData([
          {
            feeType: feeTypeName,
            paidAmount,
            refundAmount: totalRefundAmount,
            balance: totalBalance >= 0 ? totalBalance : 0,
          },
          {
            feeType: "",
            paidAmount: totalBalance >= 0 ? totalBalance : 0,
            refundAmount: 0,
            balance: totalBalance >= 0 ? totalBalance : 0,
          },
        ]);
        setHasPreviousRefund(true);
      } else {
        console.log("No updated refund data, keeping current refundData.");
        setRefundData([
          {
            feeType: feeTypeName,
            paidAmount: student?.finalAmount || 0,
            refundAmount: 0,
            balance: student?.finalAmount || 0,
          },
        ]);
        setHasPreviousRefund(false);
      }
      onClose();
    } catch (error) {
      console.error("Error processing action:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to process action.";
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        .custom-modal .modal-dialog {
          max-width: 95vw;
          margin: auto;
        }
        .custom-modal .modal-content {
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .custom-modal .modal-header {
          background-color: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }
        .custom-modal .modal-body {
          max-height: 70vh;
          overflow-y: auto;
          padding: 1.5rem;
        }
        .custom-modal .table-responsive {
          max-height: 60vh;
          overflow-y: auto;
          overflow-x: auto;
          border-radius: 4px;
        }
        .custom-modal .table {
          margin-bottom: 0;
          white-space: nowrap;
          font-size: 0.9rem;
        }
        .custom-modal .table thead th {
          position: sticky;
          top: 0;
          z-index: 1;
          padding: 8px;
          font-weight: 600;
          text-align: center;
          vertical-align: middle;
          min-width: 100px;
        }
        .custom-modal .table tbody td {
          padding: 8px;
          text-align: center;
          vertical-align: middle;
        }
        .custom-modal .table tbody tr:hover {
          background-color: #f8f9fa;
        }
        .custom-modal .form-control,
        .custom-modal .form-select {
          font-size: 0.9rem;
        }
        .custom-modal .form-control:disabled {
          background-color: #e9ecef;
          opacity: 1;
        }
        @media (max-width: 576px) {
          .custom-modal .modal-dialog {
            max-width: 98vw;
          }
          .custom-modal .modal-body {
            max-height: 80vh;
            padding: 1rem;
          }
          .custom-modal .table-responsive {
            max-height: 70vh;
          }
          .custom-modal .table thead th,
          .custom-modal .table tbody td {
            font-size: 0.8rem;
            padding: 6px;
            min-width: 80px;
          }
          .custom-modal .form-control,
          .custom-modal .form-select {
            font-size: 0.8rem;
          }
        }
      `}</style>
      <Modal
        show={show}
        onHide={onClose}
        size="lg"
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{action === "Refund" ? "Process Refund" : "Cancel Receipt"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {action === "Cancelled/Cheque Return" && student?.paymentMode === "Cheque" && (
            <Form.Group className="mb-3">
              <Form.Label>Cheque-Specific Reason</Form.Label>
              <Form.Select
                id="chequeSpecificReason"
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
              </Form.Select>
            </Form.Group>
          )}
          {action === "Cancelled/Cheque Return" && (
            <Form.Group className="mb-3">
              <Form.Label>Cancel Reason</Form.Label>
              <Form.Select
                id="cancelReason"
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
              </Form.Select>
            </Form.Group>
          )}
          {(action === "Refund" || action === "Cancelled/Cheque Return") && (
            <div className="table-responsive mb-4">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Paid Amount (₹)</th>
                    <th>Amount to be Adjustable/Refunded (₹)</th>
                    <th>Balance (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {refundData
                    .filter((_, index) => action === "Cancelled/Cheque Return" ? index === 0 : true)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.feeType}</td>
                        <td>{item.paidAmount.toFixed(2)}</td>
                        <td>
                          {action === "Refund" ? (
                            <Form.Control
                              type="number"
                              value={item.refundAmount}
                              onChange={(e) => handleRefundAmountChange(index, e.target.value)}
                              min="0"
                              max={item.paidAmount}
                              disabled={isLoading || (index === 0 && hasPreviousRefund)}
                              placeholder={index === 1 ? "Enter refund amount" : "Enter refund amount"}
                            />
                          ) : (
                            item.refundAmount.toFixed(2)
                          )}
                        </td>
                        <td>{item.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          )}
          {action === "Refund" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Payment Mode</Form.Label>
                <Form.Select
                  id="paymentMode"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">Select payment mode...</option>
                  {paymentModes.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              {paymentMode === "Cheque" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Cheque Number</Form.Label>
                    <Form.Control
                      id="chequeNumber"
                      value={chequeNumber}
                      onChange={(e) => setChequeNumber(e.target.value)}
                      disabled={isLoading}
                      placeholder="Enter cheque number"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      id="bankName"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      disabled={isLoading}
                      placeholder="Enter bank name"
                    />
                  </Form.Group>
                </>
              )}
            </>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Additional Comment</Form.Label>
            <Form.Control
              as="textarea"
              id="additionalComment"
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
              rows={4}
              placeholder="Enter any additional comments..."
              disabled={isLoading}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={handleSubmit}
            disabled={isLoading}
            className="d-flex align-items-center"
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CancelReceiptModal;