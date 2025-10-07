// // import React, { useState, useEffect } from "react";
// // import { toast } from "react-toastify";
// // import postAPI from "../../../../../api/postAPI";
// // import getAPI from "../../../../../api/getAPI";

// // const CancelReceiptModal = ({ show, onClose, student, feeTypeName, classId, schoolId, setIsCancelled, action }) => {
// //   const [cancelReason, setCancelReason] = useState("");
// //   const [chequeSpecificReason, setChequeSpecificReason] = useState("");
// //   const [additionalComment, setAdditionalComment] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [paymentMode, setPaymentMode] = useState("");
// //   const [chequeNumber, setChequeNumber] = useState("");
// //   const [bankName, setBankName] = useState("");
// //   const [refundData, setRefundData] = useState([
// //     {
// //       feeType: feeTypeName || "Registration Fee",
// //       paidAmount: student?.finalAmount || 0,
// //       refundAmount: 0,
// //       balance: student?.finalAmount || 0,
// //     },
// //   ]);

// //   const cancelOptions = student?.paymentMode === "Cheque"
// //     ? [
// //       { value: "Cheque Bounced", label: "Cheque Bounced" },
// //       { value: "Invalid Cheque", label: "Invalid Cheque" },
// //       { value: "Incorrect Details", label: "Incorrect Details" },
// //       { value: "Other", label: "Other" },
// //     ]
// //     : [
// //       { value: "Student Request", label: "Student Request" },
// //       { value: "Administrative Decision", label: "Administrative Decision" },
// //       { value: "Payment Issue", label: "Payment Issue" },
// //       { value: "Other", label: "Other" },
// //     ];

// //   const chequeSpecificOptions = [
// //     { value: "Cancelled", label: "Cancelled" },
// //     { value: "Cheque Return", label: "Cheque Return" },
// //   ];

// //   const paymentModes = ["Cash", "Cheque", "Online"];

// //   useEffect(() => {
// //     console.log("useEffect triggered with props:", { schoolId, receiptNumber: student?.receiptNumber, action, student });

// //     const fetchExistingRefund = async () => {
// //       if (!schoolId || !student?.receiptNumber) {
// //         console.warn("Missing schoolId or receiptNumber, using default refundData.");
// //         setRefundData([
// //           {
// //             feeType: feeTypeName || "Registration Fee",
// //             paidAmount: student?.finalAmount || 0,
// //             refundAmount: 0,
// //             balance: student?.finalAmount || 0,
// //           },
// //         ]);
// //         return;
// //       }

// //       try {
// //         const response = await getAPI(`/get-all-cancelled-refund/${schoolId}/${student.receiptNumber}`);
// //         console.log("API Response:", JSON.stringify(response, null, 2));

// //         if (!response.hasError && response.data && response.data.data && response.data.data.refunds && response.data.data.refunds.length > 0) {
// //           const totalRefundAmount = response.data.data.refunds.reduce(
// //             (sum, refund) => sum + (Number(refund.refundAmount) || 0),
// //             0
// //           );
// //           const paidAmount = Number(response.data.data.refunds[0]?.paidAmount) || Number(student?.finalAmount) || 0;
// //           const totalBalance = paidAmount - totalRefundAmount;

// //           console.log("Calculated refundData:", { totalRefundAmount, paidAmount, totalBalance });

// //           setRefundData([
// //             {
// //               feeType: feeTypeName || "Registration Fee",
// //               paidAmount,
// //               refundAmount: totalRefundAmount,
// //               balance: totalBalance >= 0 ? totalBalance : 0,
// //             },
// //           ]);
// //         } else {
// //           console.log("No valid refund data found, using default values.");
// //           setRefundData([
// //             {
// //               feeType: feeTypeName || "Registration Fee",
// //               paidAmount: student?.finalAmount || 0,
// //               refundAmount: 0,
// //               balance: student?.finalAmount || 0,
// //             },
// //           ]);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching refund data:", error);
  
// //         setRefundData([
// //           {
// //             feeType: feeTypeName || "Registration Fee",
// //             paidAmount: student?.finalAmount || 0,
// //             refundAmount: 0,
// //             balance: student?.finalAmount || 0,
// //           },
// //         ]);
// //       }
// //     };

// //     fetchExistingRefund();
// //   }, [schoolId, student?.receiptNumber, feeTypeName, student?.finalAmount, action]);

// //   const handleRefundAmountChange = (index, value) => {
// //     const newRefundData = [...refundData];
// //     const refundAmount = parseFloat(value) || 0;


// //     // if (refundAmount > newRefundData[index].balance) {
// //     //   toast.error(`Refund amount (${refundAmount}) cannot exceed remaining balance (${newRefundData[index].balance.toFixed(2)}).`);
// //     //   return;
// //     // }

// //     if (refundAmount > newRefundData[index].paidAmount) {
// //       toast.error("Refund amount cannot exceed paid amount.");
// //       return;
// //     }

// //     newRefundData[index].refundAmount = refundAmount;
// //     newRefundData[index].balance = newRefundData[index].paidAmount - refundAmount;
// //     setRefundData(newRefundData);
// //     console.log("Updated refundData after change:", newRefundData);
// //   };
// //   const handleSubmit = async () => {
// //     setIsLoading(true);
// //     try {
// //       if (!cancelReason && action === "Cancelled/Cheque Return") {
// //         toast.error("Please select a cancel reason.");
// //         setIsLoading(false);
// //         return;
// //       }

// //       if (action === "Refund") {
// //         if (!paymentMode) {
// //           toast.error("Please select a payment mode.");
// //           setIsLoading(false);
// //           return;
// //         }

// //         if (paymentMode === "Cheque" && (!chequeNumber || !bankName)) {
// //           toast.error("Cheque number and bank name are required for Cheque payment mode.");
// //           setIsLoading(false);
// //           return;
// //         }

// //         const totalRefundAmount = refundData.reduce((sum, item) => sum + item.refundAmount, 0);
// //         if (totalRefundAmount <= 0) {
// //           toast.error("Refund amount must be greater than zero.");
// //           setIsLoading(false);
// //           return;
// //         }

// //         // if (totalRefundAmount > refundData[0].balance) {
// //         //   toast.error(`Refund amount (${totalRefundAmount}) cannot exceed remaining balance (${refundData[0].balance.toFixed(2)}).`);
// //         //   setIsLoading(false);
// //         //   return;
// //         // }
// //       }

// //       const payload = {
// //         schoolId,
// //         academicYear: student?.academicYear || "",
// //         refundType: student?.refundType || "Registration Fees",
// //         registrationNumber: student?.registrationNumber || null,
// //         admissionNumber: student?.admissionNumber || null,
// //         firstName: student?.firstName || "",
// //         lastName: student?.lastName || "",
// //         classId: classId || "",
// //         sectionId: student?.sectionId || null,
// //         paidAmount: student?.finalAmount || 0,
// //         refundAmount: action === "Refund" ? refundData.reduce((sum, item) => sum + item.refundAmount, 0) : 0,
// //         cancelledAmount: action === "Cancelled/Cheque Return" ? refundData[0].balance : 0,
// //         balance: refundData[0].balance,
// //         paymentMode: action === "Refund" ? paymentMode : student?.paymentMode || "",
// //         chequeNumber: paymentMode === "Cheque" ? chequeNumber : student?.chequeNumber,
// //         bankName: paymentMode === "Cheque" ? bankName : student?.bankName,
// //         paymentDate: action === "Refund" ? new Date() : student?.paymentDate || null,
// //         refundDate: action === "Refund" ? new Date() : null,
// //         cancelledDate: action === "Cancelled/Cheque Return" ? new Date() : null,
// //         feeTypeRefunds: action === "Refund" ? refundData.map(item => ({
// //           feetype: feeTypeName,
// //           refundAmount: item.refundAmount,
// //           paidAmount: item.paidAmount,
// //           balance: item.balance,
// //         })) : refundData.map(item => ({
// //           feetype: feeTypeName,
// //           refundAmount: 0,
// //           cancelledAmount: item.balance,
// //           paidAmount: item.paidAmount,
// //           balance: item.balance,
// //         })),
// //         installmentName: student?.installmentName || null,
// //         existancereceiptNumber: student?.receiptNumber,
// //         status: action === "Refund" ? "Refund" : student?.paymentMode === "Cheque" ? "Cheque Return" : "Cancelled",
// //         cancelReason: action === "Cancelled/Cheque Return" ? cancelReason : undefined,
// //         chequeSpecificReason: action === "Cancelled/Cheque Return" && student?.paymentMode === "Cheque" ? chequeSpecificReason : undefined,
// //         additionalComment,
// //       };

// //       const response = await postAPI("/create-cancelled-refund", payload);
// //       console.log("Post API Response:", JSON.stringify(response, null, 2));

// //       if (response.hasError) {
// //         const errorMessage = response.message || "Failed to process action.";
// //         toast.error(errorMessage);
// //         setIsLoading(false);
// //         return;
// //       }

// //       toast.success("Receipt action completed successfully.");
// //       setIsCancelled(true);

// //       const updatedRefund = await getAPI(`/get-all-cancelled-refund/${schoolId}/${student?.receiptNumber}`);


// //       if (!updatedRefund.hasError && updatedRefund.data && updatedRefund.data.data && updatedRefund.data.data.refunds && updatedRefund.data.data.refunds.length > 0) {
// //         const totalRefundAmount = updatedRefund.data.data.refunds.reduce(
// //           (sum, refund) => sum + (Number(refund.refundAmount) || 0),
// //           0
// //         );
// //         const totalCancelledAmount = updatedRefund.data.data.refunds.reduce(
// //           (sum, refund) => sum + (Number(refund.cancelledAmount) || 0),
// //           0
// //         );
// //         const paidAmount = Number(updatedRefund.data.data.refunds[0]?.paidAmount) || Number(student?.finalAmount) || 0;
// //         const totalBalance = paidAmount - totalRefundAmount - totalCancelledAmount;



// //         setRefundData([
// //           {
// //             feeType: feeTypeName || "Registration Fee",
// //             paidAmount,
// //             refundAmount: totalRefundAmount,
// //             balance: totalBalance >= 0 ? totalBalance : 0,
// //           },
// //         ]);
// //       } else {
// //         console.log("No updated refund data, keeping current refundData.");
// //       }
// //       onClose();
// //     } catch (error) {
// //       console.error("Error processing action:", error);
// //       const errorMessage =
// //         error.response?.data?.message ||
// //         error.message ||
// //         "Failed to process action.";
// //       toast.error(errorMessage);
// //       setIsLoading(false);
// //     }
// //   };

// //   if (!show) return null;

// //   return (
// //     <div
// //       className="modal"
// //       style={{
// //         display: "block",
// //         backgroundColor: "rgba(0,0,0,0.5)",
// //         position: "fixed",
// //         top: 0,
// //         left: 0,
// //         right: 0,
// //         bottom: 0,
// //         zIndex: 1050,
// //       }}
// //     >
// //       <div
// //         className="modal-dialog modal-dialog-centered"
// //         style={{ maxWidth: "900px" }}
// //       >
// //         <div className="modal-content">
// //           <div className="modal-header">
// //             <h5 className="modal-title">{action === "Refund" ? "Process Refund" : "Cancel Receipt"}</h5>
// //             <button
// //               type="button"
// //               className="btn-close"
// //               onClick={onClose}
// //               aria-label="Close"
// //             />
// //           </div>
// //           <div
// //             className="modal-body"
// //             style={{
// //               maxHeight: "60vh",
// //               overflowY: "auto",
// //               padding: "1rem",
// //             }}
// //           >
// //             {action === "Cancelled/Cheque Return" && student?.paymentMode === "Cheque" && (
// //               <div className="mb-3">
// //                 <label htmlFor="chequeSpecificReason" className="form-label">
// //                   Cheque-Specific Reason
// //                 </label>
// //                 <select
// //                   id="chequeSpecificReason"
// //                   className="form-select"
// //                   value={chequeSpecificReason}
// //                   onChange={(e) => setChequeSpecificReason(e.target.value)}
// //                   disabled={isLoading}
// //                 >
// //                   <option value="">Select a cheque-specific reason...</option>
// //                   {chequeSpecificOptions.map((option) => (
// //                     <option key={option.value} value={option.value}>
// //                       {option.label}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             )}
// //             {action === "Cancelled/Cheque Return" && (
// //               <div className="mb-3">
// //                 <label htmlFor="cancelReason" className="form-label">
// //                   Cancel Reason
// //                 </label>
// //                 <select
// //                   id="cancelReason"
// //                   className="form-select"
// //                   value={cancelReason}
// //                   onChange={(e) => setCancelReason(e.target.value)}
// //                   disabled={isLoading}
// //                 >
// //                   <option value="">Select a reason...</option>
// //                   {cancelOptions.map((option) => (
// //                     <option key={option.value} value={option.value}>
// //                       {option.label}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             )}
// //             {(action === "Refund" || action === "Cancelled/Cheque Return") && (
// //               <div className="table-responsive mb-4 text-nowrap ">
// //                 <table className="table table-bordered ">
// //                   <thead className="table-primary">
// //                     <tr>
// //                       <th>Fee Type</th>
// //                       <th>Paid Amount (₹)</th>
// //                       <th>Amount to be Adjustable/Refunded (₹)</th>
// //                       <th>Balance (₹)</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {refundData.map((item, index) => (
// //                       <tr key={index}>
// //                         <td>{item.feeType}</td>
// //                         <td>{item.paidAmount.toFixed(2)}</td>
// //                         <td>
// //                           {action === "Refund" ? (
// //                             <input
// //                               // type="number"
// //                               className="form-control"
// //                               value={item.refundAmount}
// //                               onChange={(e) => handleRefundAmountChange(index, e.target.value)}
// //                               min="0"
// //                               max={item.balance}
// //                               disabled={isLoading}
// //                             />
// //                           ) : (
// //                             item.refundAmount.toFixed(2)
// //                           )}
// //                         </td>
// //                         <td>{item.balance.toFixed(2)}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                   <tfoot>
// //                     <tr>
// //                       <th>Total</th>
// //                       <th>
// //                         {refundData
// //                           .reduce((sum, item) => sum + Number(item.paidAmount), 0)
// //                           .toFixed(2)}
// //                       </th>
// //                       <th>
// //                         {refundData
// //                           .reduce((sum, item) => sum + Number(item.refundAmount), 0)
// //                           .toFixed(2)}
// //                       </th>
// //                       <th>
// //                         {refundData
// //                           .reduce((sum, item) => sum + Number(item.balance), 0)
// //                           .toFixed(2)}
// //                       </th>
// //                     </tr>
// //                   </tfoot>
// //                 </table>
// //               </div>
// //             )}
// //             {action === "Refund" && (
// //               <>
// //                 <div className="mb-3">
// //                   <label htmlFor="paymentMode" className="form-label">
// //                     Payment Mode
// //                   </label>
// //                   <select
// //                     id="paymentMode"
// //                     className="form-select"
// //                     value={paymentMode}
// //                     onChange={(e) => setPaymentMode(e.target.value)}
// //                     disabled={isLoading}
// //                   >
// //                     <option value="">Select payment mode...</option>
// //                     {paymentModes.map((mode) => (
// //                       <option key={mode} value={mode}>
// //                         {mode}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //                 {paymentMode === "Cheque" && (
// //                   <>
// //                     <div className="mb-3">
// //                       <label htmlFor="chequeNumber" className="form-label">
// //                         Cheque Number
// //                       </label>
// //                       <input
// //                         id="chequeNumber"
// //                         className="form-control"
// //                         value={chequeNumber}
// //                         onChange={(e) => setChequeNumber(e.target.value)}
// //                         disabled={isLoading}
// //                         placeholder="Enter cheque number"
// //                       />
// //                     </div>
// //                     <div className="mb-3">
// //                       <label htmlFor="bankName" className="form-label">
// //                         Bank Name
// //                       </label>
// //                       <input
// //                         id="bankName"
// //                         className="form-control"
// //                         value={bankName}
// //                         onChange={(e) => setBankName(e.target.value)}
// //                         disabled={isLoading}
// //                         placeholder="Enter bank name"
// //                       />
// //                     </div>
// //                   </>
// //                 )}
// //               </>
// //             )}
// //             <div className="mb-3">
// //               <label htmlFor="additionalComment" className="form-label">
// //                 Additional Comment
// //               </label>
// //               <textarea
// //                 id="additionalComment"
// //                 className="form-control"
// //                 value={additionalComment}
// //                 onChange={(e) => setAdditionalComment(e.target.value)}
// //                 rows="4"
// //                 placeholder="Enter any additional comments..."
// //                 style={{ width: "100%", boxSizing: "border-box" }}
// //                 disabled={isLoading}
// //               />
// //             </div>
// //           </div>
// //           <div className="modal-footer">
// //             <button
// //               type="button"
// //               className="btn btn-secondary"
// //               onClick={onClose}
// //               disabled={isLoading}
// //             >
// //               Close
// //             </button>
// //             <button
// //               type="button"
// //               className="btn btn-danger d-flex align-items-center"
// //               onClick={handleSubmit}
// //               disabled={isLoading}
// //             >
// //               {isLoading ? (
// //                 <>
// //                   <span
// //                     className="spinner-border spinner-border-sm me-2"
// //                     role="status"
// //                     aria-hidden="true"
// //                   ></span>
// //                   Submitting...
// //                 </>
// //               ) : (
// //                 "Submit"
// //               )}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CancelReceiptModal;

// import React, { useState, useEffect } from "react";
// import { Modal, Button, Table, Form, Spinner } from "react-bootstrap";
// import { toast } from "react-toastify";
// import postAPI from "../../../../../api/postAPI";
// import getAPI from "../../../../../api/getAPI";

// const CancelReceiptModal = ({ show, onClose, student, feeTypeName, classId, schoolId, setIsCancelled, action,sectionId }) => {

//   const [cancelReason, setCancelReason] = useState("");
//   const [chequeSpecificReason, setChequeSpecificReason] = useState("");
//   const [additionalComment, setAdditionalComment] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentMode, setPaymentMode] = useState("");
//   const [chequeNumber, setChequeNumber] = useState("");
//   const [bankName, setBankName] = useState("");

//   const [refundData, setRefundData] = useState([
//     {
//       feeType: feeTypeName || "Registration Fee",
//       paidAmount: student?.finalAmount || 0,
//       refundAmount: 0,
//       balance: student?.finalAmount || 0,
//     },
//   ]);

  

//   const cancelOptions = student?.paymentMode === "Cheque"
//     ? [
//         { value: "Cheque Bounced", label: "Cheque Bounced" },
//         { value: "Invalid Cheque", label: "Invalid Cheque" },
//         { value: "Incorrect Details", label: "Incorrect Details" },
//         { value: "Other", label: "Other" },
//       ]
//     : [
//         { value: "Student Request", label: "Student Request" },
//         { value: "Administrative Decision", label: "Administrative Decision" },
//         { value: "Payment Issue", label: "Payment Issue" },
//         { value: "Other", label: "Other" },
//       ];

//   const chequeSpecificOptions = [
//     { value: "Cancelled", label: "Cancelled" },
//     { value: "Cheque Return", label: "Cheque Return" },
//   ];

//   const paymentModes = ["Cash", "Cheque", "Online"];

//   useEffect(() => {
//     console.log("useEffect triggered with props:", { schoolId, receiptNumber: student?.receiptNumber, action, student });

//     const fetchExistingRefund = async () => {
//       if (!schoolId || !student?.receiptNumber) {
//         console.warn("Missing schoolId or receiptNumber, using default refundData.");
//         setRefundData([
//           {
//             feeType: feeTypeName || "Registration Fee",
//             paidAmount: student?.finalAmount || 0,
//             refundAmount: 0,
//             balance: student?.finalAmount || 0,
//           },
//         ]);
//         return;
//       }

//       try {
//         const response = await getAPI(`/get-all-cancelled-refund/${schoolId}/${student.receiptNumber||student?.receiptNumberBrf}`);
//         console.log("API Response:", JSON.stringify(response, null, 2));

//         if (!response.hasError && response.data && response.data.data && response.data.data.refunds && response.data.data.refunds.length > 0) {
//           const totalRefundAmount = response.data.data.refunds.reduce(
//             (sum, refund) => sum + (Number(refund.refundAmount) || 0),
//             0
//           );
//           const paidAmount = Number(response.data.data.refunds[0]?.paidAmount) || Number(student?.finalAmount) || 0;
//           const totalBalance = paidAmount - totalRefundAmount;

//           console.log("Calculated refundData:", { totalRefundAmount, paidAmount, totalBalance });

//           setRefundData([
//             {
//               feeType: feeTypeName || "Registration Fee",
//               paidAmount,
//               refundAmount: totalRefundAmount,
//               balance: totalBalance >= 0 ? totalBalance : 0,
//             },
//           ]);
//         } else {
//           console.log("No valid refund data found, using default values.");
//           setRefundData([
//             {
//               feeType: feeTypeName || "Registration Fee",
//               paidAmount: student?.finalAmount || 0,
//               refundAmount: 0,
//               balance: student?.finalAmount || 0,
//             },
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching refund data:", error);
//         setRefundData([
//           {
//             feeType: feeTypeName || "Registration Fee",
//             paidAmount: student?.finalAmount || 0,
//             refundAmount: 0,
//             balance: student?.finalAmount || 0,
//           },
//         ]);
//       }
//     };

//     fetchExistingRefund();
//   }, [schoolId, student?.receiptNumber, feeTypeName, student?.finalAmount, action]);

//   const handleRefundAmountChange = (index, value) => {
//     const newRefundData = [...refundData];
//     const refundAmount = parseFloat(value) || 0;

//     if (refundAmount > newRefundData[index].paidAmount) {
//       toast.error("Refund amount cannot exceed paid amount.");
//       return;
//     }

//     newRefundData[index].refundAmount = refundAmount;
//     newRefundData[index].balance = newRefundData[index].paidAmount - refundAmount;
//     setRefundData(newRefundData);
//     console.log("Updated refundData after change:", newRefundData);
//   };

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     try {
//       if (!cancelReason && action === "Cancelled/Cheque Return") {
//         toast.error("Please select a cancel reason.");
//         setIsLoading(false);
//         return;
//       }

//       if (action === "Refund") {
//         if (!paymentMode) {
//           toast.error("Please select a payment mode.");
//           setIsLoading(false);
//           return;
//         }

//         if (paymentMode === "Cheque" && (!chequeNumber || !bankName)) {
//           toast.error("Cheque number and bank name are required for Cheque payment mode.");
//           setIsLoading(false);
//           return;
//         }

//         const totalRefundAmount = refundData.reduce((sum, item) => sum + item.refundAmount, 0);
//         if (totalRefundAmount <= 0) {
//           toast.error("Refund amount must be greater than zero.");
//           setIsLoading(false);
//           return;
//         }
//       }

//       const payload = {
//         schoolId,
//         academicYear: student?.academicYear || "",
//         refundType: student?.refundType || "Registration Fees",
//         registrationNumber: student?.registrationNumber || null,
//         admissionNumber: student?.admissionNumber || null,
//         firstName: student?.firstName || "",
//         lastName: student?.lastName || "",
//         classId: classId || "",
//         sectionId: sectionId|| null,
//         paidAmount: student?.finalAmount || 0,
//         refundAmount: action === "Refund" ? refundData.reduce((sum, item) => sum + item.refundAmount, 0) : 0,
//         cancelledAmount: action === "Cancelled/Cheque Return" ? refundData[0].balance : 0,
//         balance: refundData[0].balance,
//         paymentMode: action === "Refund" ? paymentMode : student?.paymentMode || "",
//         chequeNumber: paymentMode === "Cheque" ? chequeNumber : student?.chequeNumber,
//         bankName: paymentMode === "Cheque" ? bankName : student?.bankName,
//         paymentDate: action === "Refund" ? new Date() : student?.paymentDate || null,
//         refundDate: action === "Refund" ? new Date() : null,
//         cancelledDate: action === "Cancelled/Cheque Return" ? new Date() : null,
//         feeTypeRefunds: action === "Refund" ? refundData.map(item => ({
//           feetype: feeTypeName,
//           refundAmount: item.refundAmount,
//           paidAmount: item.paidAmount,
//           balance: item.balance,
//         })) : refundData.map(item => ({
//           feetype: feeTypeName,
//           refundAmount: 0,
//           cancelledAmount: item.balance,
//           paidAmount: item.paidAmount,
//           balance: item.balance,
//         })),
//         installmentName: student?.installmentName || null,
//         existancereceiptNumber: student?.receiptNumber|| student?.receiptNumberBrf,
//         status: action === "Refund" ? "Refund" : student?.paymentMode === "Cheque" ? "Cheque Return" : "Cancelled",
//         cancelReason: action === "Cancelled/Cheque Return" ? cancelReason : undefined,
//         chequeSpecificReason: action === "Cancelled/Cheque Return" && student?.paymentMode === "Cheque" ? chequeSpecificReason : undefined,
//         additionalComment,
//       };

//       const response = await postAPI("/create-cancelled-refund", payload);
//       console.log("Post API Response:", JSON.stringify(response, null, 2));

//       if (response.hasError) {
//         const errorMessage = response.message || "Failed to process action.";
//         toast.error(errorMessage);
//         setIsLoading(false);
//         return;
//       }

//       toast.success("Receipt action completed successfully.");
//       setIsCancelled(true);

//       const updatedRefund = await getAPI(`/get-all-cancelled-refund/${schoolId}/${student?.receiptNumber||student?.receiptNumberBrf}`);

//       if (!updatedRefund.hasError && updatedRefund.data && updatedRefund.data.data && updatedRefund.data.data.refunds && updatedRefund.data.data.refunds.length > 0) {
//         const totalRefundAmount = updatedRefund.data.data.refunds.reduce(
//           (sum, refund) => sum + (Number(refund.refundAmount) || 0),
//           0
//         );
//         const totalCancelledAmount = updatedRefund.data.data.refunds.reduce(
//           (sum, refund) => sum + (Number(refund.cancelledAmount) || 0),
//           0
//         );
//         const paidAmount = Number(updatedRefund.data.data.refunds[0]?.paidAmount) || Number(student?.finalAmount) || 0;
//         const totalBalance = paidAmount - totalRefundAmount - totalCancelledAmount;

//         setRefundData([
//           {
//             feeType: feeTypeName || "Registration Fee",
//             paidAmount,
//             refundAmount: totalRefundAmount,
//             balance: totalBalance >= 0 ? totalBalance : 0,
//           },
//         ]);
//       } else {
//         console.log("No updated refund data, keeping current refundData.");
//       }
//       onClose();
//     } catch (error) {
//       console.error("Error processing action:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to process action.";
//       toast.error(errorMessage);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <style jsx>{`
//         .custom-modal .modal-dialog {
//           max-width: 95vw;
//           margin: auto;
//         }
//         .custom-modal .modal-content {
//           border-radius: 8px;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//         }
//         .custom-modal .modal-header {
//           background-color: #f8f9fa;
//           border-bottom: 1px solid #dee2e6;
//         }
//         .custom-modal .modal-body {
//           max-height: 70vh;
//           overflow-y: auto;
//           padding: 1.5rem;
//         }
//         .custom-modal .table-responsive {
//           max-height: 60vh;
//           overflow-y: auto;
//           overflow-x: auto;
         
//           border-radius: 4px;
//         }
//         .custom-modal .table {
//           margin-bottom: 0;
//           white-space: nowrap;
//           font-size: 0.9rem;
//         }
//         .custom-modal .table thead th {
//           position: sticky;
//           top: 0;
      
//           z-index: 1;
//           padding: 8px;
//           font-weight: 600;
//           text-align: center;
//           vertical-align: middle;
       
//           min-width: 100px;
//         }
//         .custom-modal .table tbody td {
//           padding: 8px;
//           text-align: center;
//           vertical-align: middle;
       
//         }
//         .custom-modal .table tbody tr:hover {
      
//         }
//         .custom-modal .form-control,
//         .custom-modal .form-select {
//           font-size: 0.9rem;
//         }
//         @media (max-width: 576px) {
//           .custom-modal .modal-dialog {
//             max-width: 98vw;
//           }
//           .custom-modal .modal-body {
//             max-height: 80vh;
//             padding: 1rem;
//           }
//           .custom-modal .table-responsive {
//             max-height: 70vh;
//           }
//           .custom-modal .table thead th,
//           .custom-modal .table tbody td {
//             font-size: 0.8rem;
//             padding: 6px;
//             min-width: 80px;
//           }
//           .custom-modal .form-control,
//           .custom-modal .form-select {
//             font-size: 0.8rem;
//           }
//         }
//       `}</style>
//       <Modal
//         show={show}
//         onHide={onClose}
//         size="lg"
//         centered
//         dialogClassName="custom-modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>{action === "Refund" ? "Process Refund" : "Cancel Receipt"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {action === "Cancelled/Cheque Return" && student?.paymentMode === "Cheque" && (
//             <Form.Group className="mb-3">
//               <Form.Label>Cheque-Specific Reason</Form.Label>
//               <Form.Select
//                 id="chequeSpecificReason"
//                 value={chequeSpecificReason}
//                 onChange={(e) => setChequeSpecificReason(e.target.value)}
//                 disabled={isLoading}
//               >
//                 <option value="">Select a cheque-specific reason...</option>
//                 {chequeSpecificOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           )}
//           {action === "Cancelled/Cheque Return" && (
//             <Form.Group className="mb-3">
//               <Form.Label>Cancel Reason</Form.Label>
//               <Form.Select
//                 id="cancelReason"
//                 value={cancelReason}
//                 onChange={(e) => setCancelReason(e.target.value)}
//                 disabled={isLoading}
//               >
//                 <option value="">Select a reason...</option>
//                 {cancelOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           )}
//           {(action === "Refund" || action === "Cancelled/Cheque Return") && (
//             <div className="table-responsive mb-4">
//               <Table bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Fee Type</th>
//                     <th>Paid Amount (₹)</th>
//                     <th>Amount to be Adjustable/Refunded (₹)</th>
//                     <th>Balance (₹)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {refundData.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.feeType}</td>
//                       <td>{item.paidAmount.toFixed(2)}</td>
//                       <td>
//                         {action === "Refund" ? (
//                           <Form.Control
//                             type="number"
//                             value={item.refundAmount}
//                             onChange={(e) => handleRefundAmountChange(index, e.target.value)}
//                             min="0"
//                             max={item.paidAmount}
//                             disabled={isLoading}
//                           />
//                         ) : (
//                           item.refundAmount.toFixed(2)
//                         )}
//                       </td>
//                       <td>{item.balance.toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <th>Total</th>
//                     <th>
//                       {refundData
//                         .reduce((sum, item) => sum + Number(item.paidAmount), 0)
//                         .toFixed(2)}
//                     </th>
//                     <th>
//                       {refundData
//                         .reduce((sum, item) => sum + Number(item.refundAmount), 0)
//                         .toFixed(2)}
//                     </th>
//                     <th>
//                       {refundData
//                         .reduce((sum, item) => sum + Number(item.balance), 0)
//                         .toFixed(2)}
//                     </th>
//                   </tr>
//                 </tfoot>
//               </Table>
//             </div>
//           )}
//           {action === "Refund" && (
//             <>
//               <Form.Group className="mb-3">
//                 <Form.Label>Payment Mode</Form.Label>
//                 <Form.Select
//                   id="paymentMode"
//                   value={paymentMode}
//                   onChange={(e) => setPaymentMode(e.target.value)}
//                   disabled={isLoading}
//                 >
//                   <option value="">Select payment mode...</option>
//                   {paymentModes.map((mode) => (
//                     <option key={mode} value={mode}>
//                       {mode}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//               {paymentMode === "Cheque" && (
//                 <>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Cheque Number</Form.Label>
//                     <Form.Control
//                       id="chequeNumber"
//                       value={chequeNumber}
//                       onChange={(e) => setChequeNumber(e.target.value)}
//                       disabled={isLoading}
//                       placeholder="Enter cheque number"
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Bank Name</Form.Label>
//                     <Form.Control
//                       id="bankName"
//                       value={bankName}
//                       onChange={(e) => setBankName(e.target.value)}
//                       disabled={isLoading}
//                       placeholder="Enter bank name"
//                     />
//                   </Form.Group>
//                 </>
//               )}
//             </>
//           )}
//           <Form.Group className="mb-3">
//             <Form.Label>Additional Comment</Form.Label>
//             <Form.Control
//               as="textarea"
//               id="additionalComment"
//               value={additionalComment}
//               onChange={(e) => setAdditionalComment(e.target.value)}
//               rows={4}
//               placeholder="Enter any additional comments..."
//               disabled={isLoading}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose} disabled={isLoading}>
//             Close
//           </Button>
//           <Button
//             variant="danger"
//             onClick={handleSubmit}
//             disabled={isLoading}
//             className="d-flex align-items-center"
//           >
//             {isLoading ? (
//               <>
//                 <Spinner
//                   as="span"
//                   animation="border"
//                   size="sm"
//                   role="status"
//                   aria-hidden="true"
//                   className="me-2"
//                 />
//                 Submitting...
//               </>
//             ) : (
//               "Submit"
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default CancelReceiptModal;

import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import postAPI from "../../../../../api/postAPI";
import getAPI from "../../../../../api/getAPI";

const CancelReceiptModal = ({ show, onClose, student, feeTypeName, classId, schoolId, setIsCancelled, action, sectionId }) => {
  const [cancelReason, setCancelReason] = useState("");
  const [chequeSpecificReason, setChequeSpecificReason] = useState("");
  const [additionalComment, setAdditionalComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [refundData, setRefundData] = useState([]);

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

  const paymentModes = ["Cash", "Cheque", "Online"];

  useEffect(() => {
    console.log("CancelReceiptModal props:", {
      schoolId,
      receiptNumber: student?.receiptNumber,
      action,
      student,
      feeTypeName,
      classId,
      sectionId,
    });

    const initializeRefundData = () => {
      const feeItems = student?.installments?.[0]?.feeItems || [];
      console.log("Fee Items:", feeItems);

      if (feeItems.length === 0) {
        console.warn("No feeItems found in student.installments[0]. Using fallback data.");
        setRefundData([{
          feeType: "Unknown Fee",
          paidAmount: student?.finalAmount || 0,
          refundAmount: 0,
          cancelledAmount: 0,
          balance: student?.finalAmount || 0,
        }]);
        return;
      }

      const initialRefundData = feeItems.map(item => ({
        feeType: item.type || "Unknown Fee", // Use item.type directly since feeTypeName is undefined
        paidAmount: Number(item.paid) || 0,
        refundAmount: 0,
        cancelledAmount: 0,
        balance: Number(item.paid) || 0,
      }));

      console.log("Initialized refundData:", initialRefundData);
      setRefundData(initialRefundData);
    };

    const fetchExistingRefund = async () => {
      if (!schoolId || !student?.receiptNumber) {
        console.warn("Missing schoolId or receiptNumber. Initializing default refundData.");
        initializeRefundData();
        return;
      }

      try {
        const response = await getAPI(`/get-all-cancelled-refund/${schoolId}/${student.receiptNumber}`);
        console.log("API Response for refund data:", response);

        if (!response.hasError && response.data?.data?.refunds?.length > 0) {
          const refundDataFromAPI = response.data.data.refunds.flatMap(refund =>
            refund.feeTypeRefunds.map(item => ({
              feeType: item.feeType ? item.feeType : "Unknown Fee", // Fallback if feeType is not resolved
              paidAmount: Number(item.paidAmount) || 0,
              refundAmount: Number(item.refundAmount) || 0,
              cancelledAmount: Number(item.cancelledAmount) || 0,
              balance: Number(item.balance) || 0,
            }))
          );
          console.log("Set refundData from API:", refundDataFromAPI);
          setRefundData(refundDataFromAPI);
        } else {
          console.log("No refund data found. Initializing from feeItems.");
          initializeRefundData();
        }
      } catch (error) {
        console.error("Error fetching refund data:", error);
        initializeRefundData();
      }
    };

    fetchExistingRefund();
  }, [schoolId, student, feeTypeName, action, classId, sectionId]);

  const handleAmountChange = (index, value, field) => {
    const newRefundData = [...refundData];
    const amount = parseFloat(value) || 0;

    if (amount > newRefundData[index].paidAmount) {
      toast.error(`${field === "refundAmount" ? "Refund" : "Cancelled"} amount cannot exceed paid amount.`);
      return;
    }

    newRefundData[index][field] = amount;
    newRefundData[index].balance = newRefundData[index].paidAmount - (newRefundData[index].refundAmount + newRefundData[index].cancelledAmount);
    setRefundData(newRefundData);
    console.log(`Updated refundData after ${field} change:`, newRefundData);
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

        const totalRefundAmount = refundData.reduce((sum, item) => sum + item.refundAmount, 0);
        if (totalRefundAmount <= 0) {
          toast.error("Refund amount must be greater than zero.");
          setIsLoading(false);
          return;
        }
      }

      const payload = {
        schoolId,
        academicYear: student?.academicYear || "",
        refundType: "School Fee",
        registrationNumber: student?.registrationNumber || null,
        admissionNumber: student?.studentAdmissionNumber || null,
        firstName: student?.studentName?.split(" ")[0] || "",
        lastName: student?.studentName?.split(" ").slice(1).join(" ") || "",
        classId: classId || "",
        sectionId: sectionId || null,
        paidAmount: refundData.reduce((sum, item) => sum + item.paidAmount, 0),
        refundAmount: action === "Refund" ? refundData.reduce((sum, item) => sum + item.refundAmount, 0) : 0,
        cancelledAmount: action === "Cancelled/Cheque Return" ? refundData.reduce((sum, item) => sum + item.cancelledAmount, 0) : 0,
        balance: refundData.reduce((sum, item) => sum + item.balance, 0),
        paymentMode: action === "Refund" ? paymentMode : student?.paymentMode || "",
        chequeNumber: paymentMode === "Cheque" ? chequeNumber : student?.transactionNumber || null,
        bankName: paymentMode === "Cheque" ? bankName : student?.bankName || null,
        paymentDate: action === "Refund" ? new Date() : student?.paymentDate || null,
        refundDate: action === "Refund" ? new Date() : null,
        cancelledDate: action === "Cancelled/Cheque Return" ? new Date() : null,
        feeTypeRefunds: refundData.map(item => ({
          feeType: item.feeType, // Note: This assumes feeType is a string; adjust if ObjectId is required
          refundAmount: action === "Refund" ? item.refundAmount : 0,
          cancelledAmount: action === "Cancelled/Cheque Return" ? item.cancelledAmount : 0,
          paidAmount: item.paidAmount,
          balance: item.balance,
        })),
        installmentName: student?.installments?.[0]?.installmentName || null,
        existancereceiptNumber: student?.receiptNumber,
        status: action === "Refund" ? "Refund" : student?.paymentMode === "Cheque" ? "Cheque Return" : "Cancelled",
        cancelReason: action === "Cancelled/Cheque Return" ? cancelReason : undefined,
        chequeSpecificReason: action === "Cancelled/Cheque Return" && student?.paymentMode === "Cheque" ? chequeSpecificReason : undefined,
        additionalComment,
      };

      console.log("Submitting payload:", JSON.stringify(payload, null, 2));

      const response = await postAPI("/create-cancelled-refund", payload);
      console.log("API Response:", response);

      if (response.hasError) {
        toast.error(response.message || "Failed to process action.");
        setIsLoading(false);
        return;
      }

      toast.success("Receipt action completed successfully.");
      setIsCancelled(true);

      const updatedRefund = await getAPI(`/get-all-cancelled-refund/${schoolId}/${student?.receiptNumber}`);
      if (!updatedRefund.hasError && updatedRefund.data?.data?.refunds?.length > 0) {
        const refundDataFromAPI = updatedRefund.data.data.refunds.flatMap(refund =>
          refund.feeTypeRefunds.map(item => ({
            feeType: item.feeType || "Unknown Fee",
            paidAmount: Number(item.paidAmount) || 0,
            refundAmount: Number(item.refundAmount) || 0,
            cancelledAmount: Number(item.cancelledAmount) || 0,
            balance: Number(item.balance) || 0,
          }))
        );
        setRefundData(refundDataFromAPI);
        console.log("Updated refundData from API:", refundDataFromAPI);
      }

      onClose({
        ...student,
        status: action === "Refund" ? "Refund" : student?.paymentMode === "Cheque" ? "Cheque Return" : "Cancelled",
        cancelReason: action === "Cancelled/Cheque Return" ? cancelReason : student?.cancelReason,
      });
    } catch (error) {
      console.error("Error processing action:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to process action.");
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
          min-width: 150px;
        }
        .custom-modal .table td {
          padding: 8px;
          vertical-align: middle;
        }
        .custom-modal .form-control,
        .custom-modal .form-select {
          font-size: 0.9rem;
        }
        .custom-modal .btn {
          font-size: 0.9rem;
          padding: 6px 12px;
        }
        .custom-modal .form-label {
          font-weight: 500;
          margin-bottom: 4px;
        }
      `}</style>

      <Modal
        show={show}
        onHide={() => onClose(null)}
        centered
        className="custom-modal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{action === "Refund" ? "Refund Receipt" : "Cancel/Cheque Return Receipt"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {refundData.length === 0 ? (
            <div className="text-center text-muted">No fee data available</div>
          ) : (
            <div className="table-responsive">
              <Table bordered hover>
                <thead className="table-primary">
                  <tr>
                    <th>Fee Type</th>
                    <th>Paid Amount (₹)</th>
                    <th>Amount to be Adjustable/Refunded (₹)</th>
                    <th>Balance (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {refundData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.feeType}</td>
                      <td>{item.paidAmount.toFixed(2)}</td>
                      <td>
                        {action === "Refund" ? (
                          <Form.Control
                            type="number"
                            min="0"
                            max={item.paidAmount}
                            value={item.refundAmount}
                            onChange={(e) => handleAmountChange(index, e.target.value, "refundAmount")}
                            disabled={isLoading}
                          />
                        ) : (
                          <Form.Control
                            type="number"
                            min="0"
                            max={item.paidAmount}
                            value={item.cancelledAmount}
                            onChange={(e) => handleAmountChange(index, e.target.value, "cancelledAmount")}
                            disabled={isLoading}
                          />
                        )}
                      </td>
                      <td>{item.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Cancel Reason</Form.Label>
            <Form.Select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              disabled={isLoading || action === "Refund"}
            >
              <option value="">Select a reason...</option>
              {cancelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {student?.paymentMode === "Cheque" && action === "Cancelled/Cheque Return" && (
            <Form.Group className="mb-3">
              <Form.Label>Cheque Specific Reason</Form.Label>
              <Form.Select
                value={chequeSpecificReason}
                onChange={(e) => setChequeSpecificReason(e.target.value)}
                disabled={isLoading}
              >
                <option value="">Select a reason...</option>
                {[
                  { value: "Cancelled", label: "Cancelled" },
                  { value: "Cheque Return", label: "Cheque Return" },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {action === "Refund" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Payment Mode</Form.Label>
                <Form.Select
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
                      type="text"
                      value={chequeNumber}
                      onChange={(e) => setChequeNumber(e.target.value)}
                      disabled={isLoading}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      disabled={isLoading}
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
              rows={3}
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
              disabled={isLoading}
              placeholder="Enter any additional comments..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => onClose(null)}
            disabled={isLoading}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Processing...
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