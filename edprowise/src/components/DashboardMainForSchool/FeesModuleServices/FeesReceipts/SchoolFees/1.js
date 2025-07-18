// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { FaPrint, FaDownload } from "react-icons/fa";
// import html2pdf from "html2pdf.js";
// import { toast } from "react-toastify";
// import getAPI from "../../../../../api/getAPI";

// const FeesReceipt = () => {
//   const location = useLocation();
//   const receiptDetails = location?.state;
//   const [schoolId, setSchoolId] = useState(null);
//   const [classes, setClasses] = useState([]);
//   const [className, setClassName] = useState("Unknown Class");
//   const [sectionName, setSectionName] = useState("Unknown Section");
//   const [feeInstallments, setFeeInstallments] = useState([]);
//   const [feeTypes, setFeeTypes] = useState([]);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     if (!userDetails?.schoolId) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }
//     setSchoolId(userDetails.schoolId);
//   }, []);

//   useEffect(() => {
//     if (!schoolId) return;

//     const fetchInitialData = async () => {
//       try {
//         const classesRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
//         if (!classesRes.hasError) {
//           setClasses(classesRes?.data?.data || []);
//         } else {
//           throw new Error("Failed to fetch class and section data");
//         }

//         const feeTypesRes = await getAPI(`/getall-fess-type/${schoolId}`);
//         if (!feeTypesRes.hasError) {
//           setFeeTypes(feeTypesRes.data.data || []);
//         } else {
//           throw new Error("Failed to fetch fee types data");
//         }
//       } catch (error) {
//         toast.error("Error fetching initial data");
//         console.error("Initialization error:", error);
//       }
//     };

//     fetchInitialData();
//   }, [schoolId]);

//   console.log("Receipts Details", receiptDetails)

//   useEffect(() => {
//     if (
//       !schoolId ||
//       !receiptDetails ||
//       !Array.isArray(receiptDetails) ||
//       receiptDetails.length === 0 ||
//       !receiptDetails[0]?.studentAdmissionNumber ||
//       !receiptDetails[0]?.className ||
//       !receiptDetails[0]?.section ||
//       !receiptDetails[0]?.installments?.[0]?.installmentName ||
//       !receiptDetails[0]?.academicYear
//     ) {
//       return;
//     }

//     const fetchFeeInstallments = async () => {
//       try {
//         const response = await getAPI(
//           `/get-schoolfees?classId=${receiptDetails[0].className}&sectionIds=${receiptDetails[0].section
//           }&schoolId=${schoolId}&admissionNumber=${receiptDetails[0].studentAdmissionNumber
//           }&academicYear=${receiptDetails[0].academicYear}`
//         );
//         console.log("API Response for feeInstallments:", response);
//         if (!response?.data?.data || !Array.isArray(response.data.data) || !response.data.data[0]?.feeInstallments) {
//           toast.error("Failed to fetch concession data");
//           return;
//         }
//         setFeeInstallments(response.data.data[0].feeInstallments);
//         console.log("Set feeInstallments:", response.data.data[0].feeInstallments);
//       } catch (error) {
//         toast.error("Error fetching fee installments data");
//         console.error("Fee installments fetch error:", error);
//       }
//     };

//     fetchFeeInstallments();
//   }, [schoolId, receiptDetails]);

//   useEffect(() => {
//     if (
//       receiptDetails &&
//       Array.isArray(receiptDetails) &&
//       receiptDetails.length > 0 &&
//       classes.length > 0
//     ) {
//       const classData = classes.find(
//         (cls) => cls._id === receiptDetails[0].className
//       );
//       if (classData) {
//         setClassName(classData.className || "Unknown Class");
//         const sectionData = classData.sections?.find(
//           (sec) => sec._id === receiptDetails[0].section
//         );
//         setSectionName(sectionData?.name || "Unknown Section");
//       }
//     }
//   }, [receiptDetails, classes]);

//   const computeTotals = (installmentName) => {
//     const filteredInstallments = feeInstallments.filter(
//       (fee) => fee.installmentName === installmentName
//     );
//     return filteredInstallments.reduce(
//       (acc, fee) => ({
//         totalFeesAmount: acc.totalFeesAmount + (Number(fee.amount) || 0),
//         totalConcession: acc.totalConcession + (Number(fee.concessionAmount) || 0),
//         totalFeesPayable:
//           acc.totalFeesPayable + (Number(fee.amount) - Number(fee.concessionAmount) || 0),
//         totalPaidAmount: acc.totalPaidAmount + (Number(fee.paidAmount) || 0),
//         totalRemainingAmount: acc.totalRemainingAmount + (Number(fee.balanceAmount) || 0),
//       }),
//       {
//         totalFeesAmount: 0,
//         totalConcession: 0,
//         totalFeesPayable: 0,
//         totalPaidAmount: 0,
//         totalRemainingAmount: 0,
//       }
//     );
//   };

//   if (!receiptDetails || !Array.isArray(receiptDetails) || receiptDetails.length === 0) {
//     return <div className="container my-4">No receipt data found</div>;
//   }

//   const printReceipt = () => {
//     window.print();
//   };

//   const downloadReceiptAsPDF = () => {
//     const element = document.getElementById("receipt-content");
//     const options = {
//       filename: `fees_receipt_${receiptDetails[0].receiptNumber || "unknown"}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       pagebreak: { mode: ['css', 'legacy'] }
//     };
//     html2pdf().from(element).set(options).save();
//   };

//   return (
//     <div className="container my-4" style={{ maxWidth: "800px" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="text-primary">
//           <strong>Fees Receipt</strong>
//         </h4>
//         <div>
//           <button
//             onClick={printReceipt}
//             className="btn btn-outline-primary me-2"
//             style={{ borderRadius: "20px" }}
//           >
//             <FaPrint className="me-1" /> Print
//           </button>
//           <button
//             onClick={downloadReceiptAsPDF}
//             className="btn btn-primary"
//             style={{ borderRadius: "20px" }}
//           >
//             <FaDownload className="me-1" /> Download PDF
//           </button>
//         </div>
//       </div>

//       <div id="receipt-content">
//         {receiptDetails.map((receipt, receiptIndex) =>
//           receipt.installments.map((installment, instIndex) => {
//             const totalFineAmount = Number(installment.fineAmount || 0);
//             const finePaid = Number(installment.fineAmount || 0);
//             const excessAmount = Number(installment.excessAmount || 0);
//             const regularFeeItems = installment.feeItems.filter(
//               (item) => item.feeTypeId !== "fine"
//             );


//             const totals = receipt.totals || computeTotals(installment.installmentName);

//             return (
//               <div
//                 key={`${receiptIndex}-${instIndex}`}
//                 className="p-4 shadow-sm mb-5"
//                 style={{
//                   backgroundColor: "#fff",
//                   pageBreakAfter: "always",
//                   pageBreakInside: "avoid",
//                   breakInside: "avoid",
//                 }}
//               >
//                 {/* First page content */}
//                 <div style={{ pageBreakAfter: "avoid", pageBreakInside: "avoid" }}>
//                   <div className="text-center mb-2 text-sm">
//                     <h2 className="text-primary mb-1">ABC International School</h2>
//                     <p className="mb-1">123 Education Street, Knowledge City</p>
//                     <p>Phone: (123) 456-7890 | Email: info@abcschool.edu</p>
//                     <div className="d-flex justify-content-center">
//                       <div
//                         style={{
//                           borderTop: "2px solid #0d6efd",
//                           width: "100%",
//                           margin: "0 10px",
//                         }}
//                       ></div>
//                     </div>
//                   </div>

//                   <h3
//                     className="text-center text-uppercase mb-3"
//                     style={{ color: "#0d6efd" }}
//                   >
//                     <strong>Fees Receipt</strong>
//                   </h3>

//                   <div className="row mb-2 text-black">
//                     <div className="col-md-6">
//                       <div className="d-flex mb-2">
//                         <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                           Receipt No:
//                         </span>
//                         <span>{receipt.receiptNumber || "N/A"}</span>
//                       </div>
//                       <div className="d-flex mb-2">
//                         <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                           Student Name:
//                         </span>
//                         <span>{receipt.studentName || "N/A"}</span>
//                       </div>
//                       <div className="d-flex mb-2">
//                         <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                           Admission No:
//                         </span>
//                         <span>{receipt.studentAdmissionNumber || "N/A"}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="d-flex mb-2">
//                         <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                           Date:
//                         </span>
//                         <span>{receipt.paymentDate?.split("T")[0] || "N/A"}</span>
//                       </div>
//                       <div className="d-flex mb-2">
//                         <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                           Academic Year:
//                         </span>
//                         <span>{receipt.academicYear || "N/A"}</span>
//                       </div>
//                       <div className="d-flex mb-2">
//                         <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                           Class/Section:
//                         </span>
//                         <span>
//                           {className}/{sectionName}
//                         </span>
//                       </div>
//                       <div className="d-flex mb-2">
//                         <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                           Installment:
//                         </span>
//                         <span>{installment.installmentName || "N/A"}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="table-responsive mb-3">
//                     <table className="table table-bordered">
//                       <thead className="table-primary">
//                         <tr>
//                           <th className="text-center">Fee Type</th>
//                           <th className="text-center">Amount</th>
//                           <th className="text-center">Fee Type</th>
//                           <th className="text-center">Amount</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {(() => {
//                           const allFees = [...regularFeeItems];
//                           if (totalFineAmount > 0) allFees.push({ type: "Fine", paid: finePaid });
//                           if (excessAmount > 0) allFees.push({ type: "Excess Amount", paid: excessAmount });

//                           const splitIndex = Math.ceil(allFees.length / 2);
//                           const leftItems = allFees.slice(0, splitIndex);
//                           const rightItems = allFees.slice(splitIndex);

//                           const rowCount = Math.max(leftItems.length, rightItems.length);

//                           return Array.from({ length: rowCount }).map((_, i) => (
//                             <tr key={i}>
//                               <td className="text-center">{leftItems[i]?.type || ""}</td>
//                               <td className="text-center">{leftItems[i]?.paid || ""}</td>
//                               <td className="text-center">{rightItems[i]?.type || ""}</td>
//                               <td className="text-center">{rightItems[i]?.paid || ""}</td>
//                             </tr>
//                           ));
//                         })()}

//                         <tr className="fw-bold">
//                           <td className="text-center"><strong>Total</strong></td>
//                           <td className="text-center"><strong>
//                             {[...regularFeeItems,
//                             ...(totalFineAmount > 0 ? [{ paid: finePaid }] : []),
//                             ...(excessAmount > 0 ? [{ paid: excessAmount }] : [])]
//                               .slice(0, Math.ceil((regularFeeItems.length +
//                                 (totalFineAmount > 0 ? 1 : 0) +
//                                 (excessAmount > 0 ? 1 : 0)) / 2))
//                               .reduce((sum, item) => sum + (item.paid || 0), 0)}
//                               </strong>
//                           </td>
//                           <td className="text-center"><strong>Total</strong></td>
//                           <td className="text-center"><strong>
//                             {[...regularFeeItems,
//                             ...(totalFineAmount > 0 ? [{ paid: finePaid }] : []),
//                             ...(excessAmount > 0 ? [{ paid: excessAmount }] : [])]
//                               .slice(Math.ceil((regularFeeItems.length +
//                                 (totalFineAmount > 0 ? 1 : 0) +
//                                 (excessAmount > 0 ? 1 : 0)) / 2))
//                               .reduce((sum, item) => sum + (item.paid || 0), 0)}
//                               </strong>
//                           </td>
//                         </tr>

//                         <tr className="table-secondary fw-bold">
//                           <td className="text-center" colSpan={3}><strong> Grand Total</strong></td>
//                           <td className="text-center"><strong>
//                             {regularFeeItems.reduce((sum, item) => sum + (item.paid || 0), 0) +
//                               (totalFineAmount > 0 ? finePaid : 0) +
//                               (excessAmount > 0 ? excessAmount : 0)}
//                               </strong>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>


//                 <div
//                   style={{
//                     pageBreakBefore: "always",
//                     pageBreakInside: "avoid",
//                     marginTop: "20px"
//                   }}
//                 >
//                   <div className="table-responsive mb-3">
//                     <table className="table table-bordered">
//                       <thead className="table-primary">
//                         <tr>
//                           <th className="text-center">Type of Fees</th>
//                           <th className="text-center">Fees</th>
//                           <th className="text-center">Concession</th>
//                           <th className="text-center">Total Payable</th>
//                           <th className="text-center">Amount Paid</th>
//                           <th className="text-center">Balance Payable</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {feeInstallments.length > 0 ? (
//                           feeInstallments
//                             .filter((fee) => fee.installmentName === installment.installmentName)
//                             .map((fee, itemIndex) => (
//                               <tr key={itemIndex}>
//                                 <td className="text-center">
//                                   {feeTypes.find((type) => type._id === fee.feesTypeId?._id)?.feesTypeName || `Fee ID ${fee.feesTypeId?._id || "Unknown"}`}
//                                 </td>
//                                 <td className="text-center">{fee.amount || 0}</td>
//                                 <td className="text-center">{fee.concessionAmount || 0}</td>
//                                 <td className="text-center">
//                                   {(fee.amount || 0) - (fee.concessionAmount || 0)}
//                                 </td>
//                                 <td className="text-center">{fee.paidAmount || 0}</td>
//                                 <td className="text-center">{fee.balanceAmount || 0}</td>
//                               </tr>
//                             ))
//                         ) : (
//                           <tr>
//                             <td colSpan={6} className="text-center text-muted">
//                               {feeInstallments === null
//                                 ? "Loading fee installment data..."
//                                 : "No fee installment data available for this installment"}
//                             </td>
//                           </tr>
//                         )}
//                         <tr className="table-secondary fw-bold">
//                           <td className="text-center">Total</td>
//                           <td className="text-center">{totals.totalFeesAmount || 0}</td>
//                           <td className="text-center">{totals.totalConcession || 0}</td>
//                           <td className="text-center">{totals.totalFeesPayable || 0}</td>
//                           <td className="text-center">{totals.totalPaidAmount || 0}</td>
//                           <td className="text-center">{totals.totalRemainingAmount || 0}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div
//                     className="row mb-2 text-black"
//                     style={{ pageBreakInside: "avoid", breakInside: "avoid" }}
//                   >
//                     <div className="col-md-6">
//                       <div className="d-flex mb-2">
//                         <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
//                           Payment Mode:
//                         </span>
//                         <span className="text-capitalize">{receipt.paymentMode || "N/A"}</span>
//                       </div>
//                       {!(["cash", "cheque"].includes(receipt.paymentMode?.toLowerCase())) && (
//                         <div className="d-flex mb-2">
//                           <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
//                             Transaction ID:
//                           </span>
//                           <span>{receipt.transactionNumber || "N/A"}</span>
//                         </div>
//                       )}
//                       {receipt.paymentMode?.toLowerCase() === "cheque" && (
//                         <>
//                           <div className="d-flex mb-2">
//                             <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
//                               Cheque No:
//                             </span>
//                             <span>{receipt.transactionNumber || "N/A"}</span>
//                           </div>
//                           <div className="d-flex mb-2">
//                             <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
//                               Bank Name:
//                             </span>
//                             <span>{receipt.bankName || "N/A"}</span>
//                           </div>
//                         </>
//                       )}
//                       <div className="d-flex mb-2">
//                         <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
//                           Date of Payment:
//                         </span>
//                         <span>{receipt.paymentDate?.split("T")[0] || "N/A"}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="p-3 text-center" style={{ height: "100%" }}>
//                         <p className="mb-4">Authorized Signature</p>
//                         <div className="mt-4 pt-3" style={{ borderTop: "1px solid #dee2e6" }}>
//                           <p className="mb-0 fw-bold">
//                             {receipt.collectorName || "School Administrator"}
//                           </p>
//                           <p className="mb-0 small text-muted">Receipt Collector</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     className="text-center mt-2 pt-3 mb-1"
//                     style={{
//                       borderTop: "2px solid #0d6efd",
//                       pageBreakInside: "avoid",
//                       breakInside: "avoid",
//                     }}
//                   >
//                     <p className="small text-muted mb-1">
//                       This is a computer-generated receipt and does not require a physical signature.
//                     </p>
//                     <p className="small text-muted">
//                       For any queries, please contact accounts@abcschool.edu or call +1234567890
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeesReceipt;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";
import { fetchSchoolData, generateHeader, generateFooter } from "../../PdfUtlis";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const FeesReceipt = () => {
  const location = useLocation();
  const receiptDetails = location?.state;
  const [schoolId, setSchoolId] = useState(null);
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("Unknown Class");
  const [sectionName, setSectionName] = useState("Unknown Section");
  const [feeInstallments, setFeeInstallments] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [schoolData, setSchoolData] = useState({ school: null, logoSrc: "" });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails?.schoolId) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(userDetails.schoolId);
  }, []);

  useEffect(() => {
    if (!schoolId) return;

    const fetchInitialData = async () => {
      try {
        const schoolInfo = await fetchSchoolData(schoolId);
        setSchoolData(schoolInfo);

        const classesRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
        if (!classesRes.hasError) {
          setClasses(classesRes?.data?.data || []);
        } else {
          throw new Error("Failed to fetch class and section data");
        }

        const feeTypesRes = await getAPI(`/getall-fess-type/${schoolId}`);
        if (!feeTypesRes.hasError) {
          setFeeTypes(feeTypesRes.data.data || []);
        } else {
          throw new Error("Failed to fetch fee types data");
        }
      } catch (error) {
        toast.error("Error fetching initial data");
        console.error("Initialization error:", error);
      }
    };

    fetchInitialData();
  }, [schoolId]);

  useEffect(() => {
    if (
      !schoolId ||
      !receiptDetails ||
      !Array.isArray(receiptDetails) ||
      receiptDetails.length === 0 ||
      !receiptDetails[0]?.studentAdmissionNumber ||
      !receiptDetails[0]?.className ||
      !receiptDetails[0]?.section ||
      !receiptDetails[0]?.installments?.[0]?.installmentName ||
      !receiptDetails[0]?.academicYear
    ) {
      return;
    }

    const fetchFeeInstallments = async () => {
      try {
        const response = await getAPI(
          `/get-schoolfees?classId=${receiptDetails[0].className}&sectionIds=${receiptDetails[0].section}&schoolId=${schoolId}&admissionNumber=${receiptDetails[0].studentAdmissionNumber}&academicYear=${receiptDetails[0].academicYear}`
        );
        if (!response?.data?.data || !Array.isArray(response.data.data) || !response.data.data[0]?.feeInstallments) {
          toast.error("Failed to fetch concession data");
          return;
        }
        setFeeInstallments(response.data.data[0].feeInstallments);
      } catch (error) {
        toast.error("Error fetching fee installments data");
        console.error("Fee installments fetch error:", error);
      }
    };

    fetchFeeInstallments();
  }, [schoolId, receiptDetails]);

  useEffect(() => {
    if (
      receiptDetails &&
      Array.isArray(receiptDetails) &&
      receiptDetails.length > 0 &&
      classes.length > 0
    ) {
      const classData = classes.find(
        (cls) => cls._id === receiptDetails[0].className
      );
      if (classData) {
        setClassName(classData.className || "Unknown Class");
        const sectionData = classData.sections?.find(
          (sec) => sec._id === receiptDetails[0].section
        );
        setSectionName(sectionData?.name || "Unknown Section");
      }
    }
  }, [receiptDetails, classes]);

  const computeTotals = (installmentName) => {
    const filteredInstallments = feeInstallments.filter(
      (fee) => fee.installmentName === installmentName
    );
    return filteredInstallments.reduce(
      (acc, fee) => ({
        totalFeesAmount: acc.totalFeesAmount + (Number(fee.amount) || 0),
        totalConcession: acc.totalConcession + (Number(fee.concessionAmount) || 0),
        totalFeesPayable:
          acc.totalFeesPayable + (Number(fee.amount) - Number(fee.concessionAmount) || 0),
        totalPaidAmount: acc.totalPaidAmount + (Number(fee.paidAmount) || 0),
        totalRemainingAmount: acc.totalRemainingAmount + (Number(fee.balanceAmount) || 0),
      }),
      {
        totalFeesAmount: 0,
        totalConcession: 0,
        totalFeesPayable: 0,
        totalPaidAmount: 0,
        totalRemainingAmount: 0,
      }
    );
  };

  const printReceipt = () => {
    window.print();
  };

  const ensureImageLoaded = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  };

  const createReceiptContent = (receipt, installment, totals, index) => {
    const totalFineAmount = Number(installment.fineAmount || 0);
    const finePaid = Number(installment.fineAmount || 0);
    const excessAmount = Number(installment.excessAmount || 0);
    const regularFeeItems = installment.feeItems.filter(
      (item) => item.feeTypeId !== "fine"
    );

    return `
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .pdf-container {
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.4;
          color: #000000;
        }
        .pdf-heading {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
          text-align: center;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .pdf-row {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 15px;
          gap: 15px;
        }
        .pdf-col-6 {
          flex: 0 0 calc(50% - 8px);
          min-width: 200px;
        }
        .pdf-field {
          margin-bottom: 12px;
          display: flex;
        }
        .pdf-label {
          font-weight: bold;
          color: #000000;
          min-width: 120px;
          font-size: 13px;
          text-transform: capitalize;
        }
        .pdf-value {
          color: #000000;
          text-transform: capitalize;
        }
        .pdf-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        .pdf-table th, .pdf-table td {
          border: 1px solid #d1d5db;
          padding: 8px;
          text-align: center;
          font-size: 12px;
        }
        .pdf-table th {
          background:rgb(255, 255, 255);
          font-weight: bold;
        }
        .pdf-table td {
          background:rgb(255, 255, 255);
        }
        .pdf-table-secondary th, .pdf-table-secondary td {
          background:rgb(255, 255, 255);
        }
        .pdf-signature {
          text-align: center;
          padding: 20px;
        }
      </style>
      <div class="pdf-container">
        <div class="pdf-heading">Fees Receipt</div>
        <div class="pdf-row">
          <div class="pdf-col-6">
            <div class="pdf-field"><span class="pdf-label">Receipt No:</span><span class="pdf-value">${receipt.receiptNumber || "N/A"}</span></div>
            <div class="pdf-field"><span class="pdf-label">Student Name:</span><span class="pdf-value">${receipt.studentName || "N/A"}</span></div>
            <div class="pdf-field"><span class="pdf-label">Admission No:</span><span class="pdf-value">${receipt.studentAdmissionNumber || "N/A"}</span></div>
          </div>
          <div class="pdf-col-6">
            <div class="pdf-field"><span class="pdf-label">Date:</span><span class="pdf-value">${receipt.paymentDate?.split("T")[0] || "N/A"}</span></div>
            <div class="pdf-field"><span class="pdf-label">Academic Year:</span><span class="pdf-value">${receipt.academicYear || "N/A"}</span></div>
            <div class="pdf-field"><span class="pdf-label">Class/Section:</span><span class="pdf-value">${className}/${sectionName}</span></div>
            <div class="pdf-field"><span class="pdf-label">Installment:</span><span class="pdf-value">${installment.installmentName || "N/A"}</span></div>
          </div>
        </div>
        <table class="pdf-table">
          <thead>
            <tr>
              <th>Fee Type</th>
              <th>Amount</th>
              <th>Fee Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${(() => {
        const allFees = [...regularFeeItems];
        if (totalFineAmount > 0) allFees.push({ type: "Fine", paid: finePaid });
        if (excessAmount > 0) allFees.push({ type: "Excess Amount", paid: excessAmount });

        const splitIndex = Math.ceil(allFees.length / 2);
        const leftItems = allFees.slice(0, splitIndex);
        const rightItems = allFees.slice(splitIndex);
        const rowCount = Math.max(leftItems.length, rightItems.length);

        return Array.from({ length: rowCount })
          .map(
            (_, i) => `
                    <tr>
                      <td>${leftItems[i]?.type || ""}</td>
                      <td>${leftItems[i]?.paid || ""}</td>
                      <td>${rightItems[i]?.type || ""}</td>
                      <td>${rightItems[i]?.paid || ""}</td>
                    </tr>
                  `
          )
          .join("");
      })()}
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>
                ${[...regularFeeItems, ...(totalFineAmount > 0 ? [{ paid: finePaid }] : []), ...(excessAmount > 0 ? [{ paid: excessAmount }] : [])]
        .slice(0, Math.ceil((regularFeeItems.length + (totalFineAmount > 0 ? 1 : 0) + (excessAmount > 0 ? 1 : 0)) / 2))
        .reduce((sum, item) => sum + (item.paid || 0), 0)}
              </strong></td>
              <td><strong>Total</strong></td>
              <td><strong>
                ${[...regularFeeItems, ...(totalFineAmount > 0 ? [{ paid: finePaid }] : []), ...(excessAmount > 0 ? [{ paid: excessAmount }] : [])]
        .slice(Math.ceil((regularFeeItems.length + (totalFineAmount > 0 ? 1 : 0) + (excessAmount > 0 ? 1 : 0)) / 2))
        .reduce((sum, item) => sum + (item.paid || 0), 0)}
              </strong></td>
            </tr>
            <tr class="pdf-table-secondary">
              <td colspan="3"><strong>Grand Total</strong></td>
              <td><strong>
                ${regularFeeItems.reduce((sum, item) => sum + (item.paid || 0), 0) + (totalFineAmount > 0 ? finePaid : 0) + (excessAmount > 0 ? excessAmount : 0)}
              </strong></td>
            </tr>
          </tbody>
        </table>
        <table class="pdf-table">
          <thead>
            <tr>
              <th>Type of Fees</th>
              <th>Fees</th>
              <th>Concession</th>
              <th>Total Payable</th>
              <th>Amount Paid</th>
              <th>Balance Payable</th>
            </tr>
          </thead>
          <tbody>
            ${feeInstallments.length > 0
        ? feeInstallments
          .filter((fee) => fee.installmentName === installment.installmentName)
          .map(
            (fee) => `
                      <tr>
                        <td>${feeTypes.find((type) => type._id === fee.feesTypeId?._id)?.feesTypeName || `Fee ID ${fee.feesTypeId?._id || "Unknown"}`}</td>
                        <td>${fee.amount || 0}</td>
                        <td>${fee.concessionAmount || 0}</td>
                        <td>${(fee.amount || 0) - (fee.concessionAmount || 0)}</td>
                        <td>${fee.paidAmount || 0}</td>
                        <td>${fee.balanceAmount || 0}</td>
                      </tr>
                    `
          )
          .join("")
        : `<tr><td colspan="6" style="text-align: center; color: #6b7280;">${feeInstallments === null ? "Loading fee installment data..." : "No fee installment data available"
        }</td></tr>`}
            <tr class="pdf-table-secondary">
              <td>Total</td>
              <td>${totals.totalFeesAmount || 0}</td>
              <td>${totals.totalConcession || 0}</td>
              <td>${totals.totalFeesPayable || 0}</td>
              <td>${totals.totalPaidAmount || 0}</td>
              <td>${totals.totalRemainingAmount || 0}</td>
            </tr>
          </tbody>
        </table>
        <div class="pdf-row">
          <div class="pdf-col-6">
            <div class="pdf-field"><span class="pdf-label">Payment Mode:</span><span class="pdf-value">${receipt.paymentMode || "N/A"}</span></div>
            ${!(["cash", "cheque"].includes(receipt.paymentMode?.toLowerCase()))
        ? `<div class="pdf-field"><span class="pdf-label">Transaction ID:</span><span class="pdf-value">${receipt.transactionNumber || "N/A"}</span></div>`
        : ""}
            ${receipt.paymentMode?.toLowerCase() === "cheque"
        ? `
                <div class="pdf-field"><span class="pdf-label">Cheque No:</span><span class="pdf-value">${receipt.transactionNumber || "N/A"}</span></div>
                <div class="pdf-field"><span class="pdf-label">Bank Name:</span><span class="pdf-value">${receipt.bankName || "N/A"}</span></div>
              `
        : ""}
            <div class="pdf-field"><span class="pdf-label">Date of Payment:</span><span class="pdf-value">${receipt.paymentDate?.split("T")[0] || "N/A"}</span></div>
          </div>
          <div class="pdf-col-6">
            <div class="pdf-signature">
              <p style="margin-bottom: 20px;">Authorized Signature</p>
              <div style="border-top: 1px solid #d1d5db; padding-top: 10px;">
                <p style="font-weight: bold; margin-bottom: 0;">${receipt.collectorName || "School Administrator"}</p>
                <p style="font-size: 12px; color: #6b7280; margin-bottom: 0;">Receipt Collector</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const downloadReceiptAsPDF = async () => {
    try {
      if (!schoolData.logoSrc) {
        await ensureImageLoaded(schoolData.logoSrc || "/path/to/placeholder-image.jpg");
      }

      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });

      const PAGE_HEIGHT = 297;


      const pageContainer = document.createElement("div");
      pageContainer.style.cssText = `
        width: 210mm;
        min-height: 297mm;
        padding: 10mm 20mm 22mm 20mm;
        background: white;
        font-family: 'Arial', sans-serif;
        position: absolute;
        left: -9999px;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 1.4;
      `;

      let pageIndex = 0;
      for (const [receiptIndex, receipt] of receiptDetails.entries()) {
        for (const [instIndex, installment] of receipt.installments.entries()) {
          const totals = receipt.totals || computeTotals(installment.installmentName);
          const pageContent =
            generateHeader(schoolData.school, schoolData.logoSrc) +
            createReceiptContent(receipt, installment, totals, `${receiptIndex}-${instIndex}`) +
            generateFooter(schoolData.school);

          pageContainer.innerHTML = pageContent;
          document.body.appendChild(pageContainer);

          await new Promise((resolve) => setTimeout(resolve, 500));

          const canvas = await html2canvas(pageContainer, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            windowWidth: 794,
            windowHeight: 1123,
          });

          const imgWidth = 210;
          const canvasHeight = Math.min((canvas.height * imgWidth) / canvas.width, PAGE_HEIGHT);
          if (pageIndex > 0) {
            pdf.addPage();
          }
          pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, imgWidth, canvasHeight);

          document.body.removeChild(pageContainer);
          pageIndex++;
        }
      }

      pdf.save(`fees_receipt_${receiptDetails[0].receiptNumber || "unknown"}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF");
    }
  };

  if (!receiptDetails || !Array.isArray(receiptDetails) || receiptDetails.length === 0) {
    return <div className="container my-4">No receipt data found</div>;
  }

  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
    <div className="d-flex justify-content-between align-items-center mb-4" style={{ flexDirection: 'row' }}>
  <h4 className="text-primary">
    <strong>Fees Receipt</strong>
  </h4>
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <button
      onClick={cancelReceipt}
      className="btn btn-outline-danger me-2"
      style={{ borderRadius: "20px" }}
      disabled={isCancelled}
      aria-label="Cancel Receipt"
    >
      <FaTimes className="me-1" /> Cancel
    </button>
    <button
      onClick={printReceipt}
      className="btn btn-outline-primary me-2"
      style={{ borderRadius: "20px" }}
    >
      <FaPrint className="me-1" /> Print
    </button>
    <button
      onClick={downloadReceiptAsPDF}
      className="btn btn-primary"
      style={{ borderRadius: "20px" }}
    >
      <FaDownload className="me-1" /> Download PDF
    </button>
  </div>
</div>

      <div id="receipt-content">
        {receiptDetails.map((receipt, receiptIndex) =>
          receipt.installments.map((installment, instIndex) => {
            const totalFineAmount = Number(installment.fineAmount || 0);
            const finePaid = Number(installment.fineAmount || 0);
            const excessAmount = Number(installment.excessAmount || 0);
            const regularFeeItems = installment.feeItems.filter(
              (item) => item.feeTypeId !== "fine"
            );
            const totals = receipt.totals || computeTotals(installment.installmentName);

            return (
              <div
                key={`${receiptIndex}-${instIndex}`}
                className="p-4 shadow-sm mb-5"
                style={{
                  backgroundColor: "#fff",
                  pageBreakAfter: "always",
                  pageBreakInside: "avoid",
                  breakInside: "avoid",
                }}
              >
                <div style={{ pageBreakAfter: "avoid", pageBreakInside: "avoid" }}>
                  <div dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />
                  <h3 className="text-center text-uppercase mb-3" style={{ color: "#0d6efd" }}>
                    <strong>Fees Receipt</strong>
                  </h3>
                  <div className="row mb-2 text-black">
                    <div className="col-md-6">
                      <div className="d-flex mb-2">
                        <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                          Receipt No:
                        </span>
                        <span>{receipt.receiptNumber || "N/A"}</span>
                      </div>                       <div className="d-flex mb-2">
                        <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                          Student Name:
                        </span>
                        <span>{receipt.studentName || "N/A"}</span>
                      </div>
                      <div className="d-flex mb-2">
                        <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                          Admission No:
                        </span>
                        <span>{receipt.studentAdmissionNumber || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex mb-2">
                        <span className="fw-bold me-2" style={{ minWidth: "120px" }}>  Date:
                        </span>
                        <span>{receipt.paymentDate?.split("T")[0] || "N/A"}</span>
                      </div>
                      <div className="d-flex mb-2">
                        <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                          Academic Year:                         </span>
                        <span>{receipt.academicYear || "N/A"}</span>
                      </div>
                      <div className="d-flex mb-2">
                        <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                          Class/Section:
                        </span>
                        <span>
                          {className}/{sectionName}
                        </span>
                      </div>
                      <div className="d-flex mb-2">
                        <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                          Installment:
                        </span>                         <span>{installment.installmentName || "N/A"}</span>
                      </div>
                    </div>                   </div>

                  <div className="table-responsive mb-3">
                    <table className="table table-bordered">
                      <thead className="table-primary">
                        <tr>                          <th className="text-center">Fee Type</th>                          <th className="text-center">Amount</th>                          <th className="text-center">Fee Type</th>                          <th className="text-center">Amount</th>
                        </tr>
                      </thead>                    <tbody>
                        {(() => {
                          const allFees = [...regularFeeItems];
                          if (totalFineAmount > 0) allFees.push({ type: "Fine", paid: finePaid });
                          if (excessAmount > 0) allFees.push({ type: "Excess Amount", paid: excessAmount });

                          const splitIndex = Math.ceil(allFees.length / 2);
                          const leftItems = allFees.slice(0, splitIndex);
                          const rightItems = allFees.slice(splitIndex);

                          const rowCount = Math.max(leftItems.length, rightItems.length);

                          return Array.from({ length: rowCount }).map((_, i) => (
                            <tr key={i}>
                              <td className="text-center">{leftItems[i]?.type || ""}</td>
                              <td className="text-center">{leftItems[i]?.paid || ""}</td>
                              <td className="text-center">{rightItems[i]?.type || ""}</td>
                              <td className="text-center">{rightItems[i]?.paid || ""}</td>
                            </tr>
                          ));
                        })()}

                        <tr className="fw-bold">
                          <td className="text-center"><strong>Total</strong></td>
                          <td className="text-center"><strong>
                            {[...regularFeeItems,
                            ...(totalFineAmount > 0 ? [{ paid: finePaid }] : []),
                            ...(excessAmount > 0 ? [{ paid: excessAmount }] : [])]
                              .slice(0, Math.ceil((regularFeeItems.length +
                                (totalFineAmount > 0 ? 1 : 0) +
                                (excessAmount > 0 ? 1 : 0)) / 2))
                              .reduce((sum, item) => sum + (item.paid || 0), 0)}
                          </strong>
                          </td>
                          <td className="text-center"><strong>Total</strong></td>
                          <td className="text-center"><strong>
                            {[...regularFeeItems,
                            ...(totalFineAmount > 0 ? [{ paid: finePaid }] : []),
                            ...(excessAmount > 0 ? [{ paid: excessAmount }] : [])]
                              .slice(Math.ceil((regularFeeItems.length +
                                (totalFineAmount > 0 ? 1 : 0) +
                                (excessAmount > 0 ? 1 : 0)) / 2))
                              .reduce((sum, item) => sum + (item.paid || 0), 0)}
                          </strong>
                          </td>
                        </tr>

                        <tr className="table-secondary fw-bold">
                          <td className="text-center" colSpan={3}><strong> Grand Total</strong></td>
                          <td className="text-center"><strong>
                            {regularFeeItems.reduce((sum, item) => sum + (item.paid || 0), 0) +
                              (totalFineAmount > 0 ? finePaid : 0) +
                              (excessAmount > 0 ? excessAmount : 0)}
                          </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>


                <div
                  style={{
                    pageBreakBefore: "always",
                    pageBreakInside: "avoid",
                    marginTop: "20px"
                  }}
                >
                  <div className="table-responsive mb-3">
                    <table className="table table-bordered">
                      <thead className="table-primary">
                        <tr>
                          <th className="text-center">Type of Fees</th>
                          <th className="text-center">Fees</th>
                          <th className="text-center">Concession</th>
                          <th className="text-center">Total Payable</th>
                          <th className="text-center">Amount Paid</th>
                          <th className="text-center">Balance Payable</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeInstallments.length > 0 ? (
                          feeInstallments
                            .filter((fee) => fee.installmentName === installment.installmentName)
                            .map((fee, itemIndex) => (
                              <tr key={itemIndex}>
                                <td className="text-center">
                                  {feeTypes.find((type) => type._id === fee.feesTypeId?._id)?.feesTypeName || `Fee ID ${fee.feesTypeId?._id || "Unknown"}`}
                                </td>
                                <td className="text-center">{fee.amount || 0}</td>
                                <td className="text-center">{fee.concessionAmount || 0}</td>
                                <td className="text-center">
                                  {(fee.amount || 0) - (fee.concessionAmount || 0)}
                                </td>
                                <td className="text-center">{fee.paidAmount || 0}</td>
                                <td className="text-center">{fee.balanceAmount || 0}</td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center text-muted">
                              {feeInstallments === null
                                ? "Loading fee installment data..."
                                : "No fee installment data available for this installment"}
                            </td>
                          </tr>
                        )}
                        <tr className="table-secondary fw-bold">
                          <td className="text-center">Total</td>
                          <td className="text-center">{totals.totalFeesAmount || 0}</td>
                          <td className="text-center">{totals.totalConcession || 0}</td>
                          <td className="text-center">{totals.totalFeesPayable || 0}</td>
                          <td className="text-center">{totals.totalPaidAmount || 0}</td>
                          <td className="text-center">{totals.totalRemainingAmount || 0}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div
                    className="row mb-2 text-black"
                    style={{ pageBreakInside: "avoid", breakInside: "avoid" }}
                  >
                    <div className="col-md-6">
                      <div className="d-flex mb-2">
                        <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                          Payment Mode:
                        </span>
                        <span className="text-capitalize">{receipt.paymentMode || "N/A"}</span>
                      </div>
                      {!(["cash", "cheque"].includes(receipt.paymentMode?.toLowerCase())) && (
                        <div className="d-flex mb-2">
                          <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                            Transaction ID:
                          </span>
                          <span>{receipt.transactionNumber || "N/A"}</span>
                        </div>
                      )}
                      {receipt.paymentMode?.toLowerCase() === "cheque" && (
                        <>
                          <div className="d-flex mb-2">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                              Cheque No:
                            </span>
                            <span>{receipt.transactionNumber || "N/A"}</span>
                          </div>
                          <div className="d-flex mb-2">
                            <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                              Bank Name:
                            </span>
                            <span>{receipt.bankName || "N/A"}</span>
                          </div>
                        </>
                      )}
                      <div className="d-flex mb-2">
                        <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                          Date of Payment:
                        </span>
                        <span>{receipt.paymentDate?.split("T")[0] || "N/A"}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 text-center" style={{ height: "100%" }}>
                        <p className="mb-4">Authorized Signature</p>
                        <div className="mt-4 pt-3" style={{ borderTop: "1px solid #dee2e6" }}>
                          <p className="mb-0 fw-bold">
                            {receipt.collectorName || "School Administrator"}
                          </p>
                          <p className="mb-0 small text-muted">Receipt Collector</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="text-center mt-2 pt-3 mb-1"
                    style={{
                      borderTop: "2px solid #0d6efd",
                      pageBreakInside: "avoid",
                      breakInside: "avoid",
                    }}
                  >
                    <p className="small text-muted mb-1">
                      This is a computer-generated receipt and does not require a physical signature.
                    </p>
                    <p className="small text-muted">
                      For any queries, please contact {schoolData.school?.schoolEmail || "N/A"} or call {schoolData.school?.schoolMobileNo || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FeesReceipt;