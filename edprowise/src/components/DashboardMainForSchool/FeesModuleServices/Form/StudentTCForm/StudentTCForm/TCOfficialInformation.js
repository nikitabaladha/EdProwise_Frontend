// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { FaPrint, FaDownload } from "react-icons/fa";
// import html2pdf from "html2pdf.js";

// const FeesReceipt = () => {
//   const location = useLocation();
//   const { data, feeTypeName, className } = location.state || {};


//   const student = data?.form || {};

//   const printReceipt = () => {
//     window.print();
//   };

//   const downloadReceiptAsPDF = () => {
//     const element = document.getElementById("receipt-content");

//     const options = {
//       filename: "fees_receipt.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//     };

//     html2pdf().from(element).set(options).save();
//   };

//   return (
//     <div className="container my-4 text-dark" style={{ padding: 16 }}>
//       <h6>
//         <strong>Fees Receipts</strong>
//       </h6>
//       <div className="text-end mb-3">
//         <button onClick={printReceipt} className="btn btn-light me-2">
//           <FaPrint /> Print
//         </button>
//         <button onClick={downloadReceiptAsPDF} className="btn btn-light">
//           <FaDownload /> Download PDF
//         </button>
//       </div>

//       <div id="receipt-content" className="border border-dark p-3">
//         <div className="text-center mb-3">
//           <h6>
//             <strong>[From Letter Head]</strong>
//           </h6>
//         </div>
//         <h6 className="text-center bg-light py-1">
//           <strong>Admission Fees Receipts</strong>
//         </h6>
//         <div className="row mb-2">
//           <div className="col-4">
//             <p style={{ color: 'black' }}>
//               <strong>Receipts No :</strong> {student.receiptNumber}
//             </p>
//             <p style={{ color: 'black' }}>
//               <strong>Student Name :</strong>{student.firstName}{student.lastName}
//             </p>
//             <p style={{ color: 'black' }}>
//               <strong>Admission No :</strong> {student.AdmissionNumber}
//             </p>
//           </div>
//           <div className="col-4">
//             <p style={{ color: 'black' }}>&nbsp;</p>
//             <p style={{ color: 'black' }}>
//               <strong>Class :</strong> {className}
//             </p>
//           </div>
//           <div className="col-4">
//             <p style={{ color: 'black' }}>
//               <strong>Date :</strong>{' '}
//               {new Date(student.ApplicationReceivedOn).toLocaleDateString('en-GB')}
//             </p>
//             <p style={{ color: 'black' }}>
//               <strong>Academic Year :</strong>{' '}
//               {(() => {
//                 const year = new Date(student.dateOfAdmission).getFullYear();
//                 return `${year}-${year + 1}`;
//               })()}

//             </p>
//           </div>
//         </div>

//         <div className="row pt-3 mb-2" style={{ borderTop: "2px solid black" }} />

//         <div className="mb-4">
//           <table className="table mb-4" style={{ border: "1px solid black", color: "black" }}>
//             <thead>
//               <tr>
//                 <th className="text-center p-2" style={{ border: "1px solid black" }}>
//                   Type of Fees
//                 </th>
//                 <th className="text-center p-2" style={{ border: "1px solid black" }}>
//                   TC Fees
//                 </th>
//                 <th className="text-center p-2" style={{ border: "1px solid black" }}>
//                   Concession
//                 </th>
//                 <th className="text-center p-2" style={{ border: "1px solid black" }}>
//                   Final Amount
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="text-center p-2" style={{ border: "1px solid black" }}>
//                   {feeTypeName}
//                 </td>
//                 <td className="text-center p-2" style={{ border: "1px solid black" }}>
//                   {student.TCfees}
//                 </td>
//                 <td className="text-center p-2" style={{ border: "1px solid black" }}>
//                   {student.concessionAmount}
//                 </td>
//                 <td className="text-center p-2" style={{ border: "1px solid black" }}>
//                   {student.finalAmount}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>


//         <div className="row text-dark">
//           <div className="col-6">
//             <p style={{ color: 'black' }}>
//               <strong>Payment Mode:</strong> {student.paymentMode}
//             </p>
//             <p style={{ color: 'black' }}>
//               <strong>Date of Payment:</strong>{new Date(student.paymentDate).toLocaleDateString('en-GB')}
//             </p>
//             <p style={{ color: 'black' }}>
//               <strong>Transaction No./Cheque No.:</strong> {student?.chequeNumber ? student.chequeNumber : student?.transactionNumber || ''}
//             </p>
//           </div>
//           <div className="col-4 text-end">
//             <p>
//               &nbsp;&nbsp;&nbsp;
//             </p>

//             <p style={{ color: 'black' }}>
//               <strong>Signature of Collector</strong>
//             </p>
//             <p style={{ color: 'black' }}>
//               <strong>Name:</strong> {student.name}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeesReceipt;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { fetchSchoolData, generateHeader, generateFooter } from "../../../PdfUtlis";

const FeesReceipt = () => {
  const location = useLocation();
  const { data, feeTypeName, className } = location.state || {};
  const student = data?.form || {};
  const [schoolData, setSchoolData] = useState({ school: null, logoSrc: '' });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    const loadSchoolData = async () => {
      try {
        const data = await fetchSchoolData(id);
        setSchoolData(data);
      } catch (error) {
        toast.error("Failed to fetch school data. Please try again.");
        console.error("Error in loadSchoolData:", error);
      }
    };

    if (id) {
      loadSchoolData();
    }
  }, []);

  const printReceipt = () => {
    window.print();
  };

  const downloadReceiptAsPDF = async () => {
    const element = document.getElementById("receipt-content");
    if (!element) {
      toast.error("Receipt content not found. Please try again.");
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 10mm 15mm 22mm 15mm;
      background: white;
      font-family: 'Arial', sans-serif;
      position: absolute;
      left: -9999px;
      box-sizing: border-box;
      font-size: 18px;
      line-height: 1.4;
    `;

    const contentWithoutHeaderFooter = element.cloneNode(true);
    const headerElement = contentWithoutHeaderFooter.querySelector(".header-class");
    const footerElement = contentWithoutHeaderFooter.querySelector(".footer-class");
    if (headerElement) headerElement.remove();
    if (footerElement) footerElement.remove();

    wrapper.innerHTML = `
      ${generateHeader(schoolData.school, schoolData.logoSrc)}
      ${contentWithoutHeaderFooter.outerHTML}
      ${generateFooter(schoolData.school)}
    `;

    const footer = wrapper.querySelector(".footer-class");
    if (footer) {
      footer.style.position = "absolute";
      footer.style.bottom = "10mm";
      footer.style.textAlign = "center";
    }

    document.body.appendChild(wrapper);

    const images = wrapper.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) =>
        new Promise((resolve) => {
          img.crossOrigin = "anonymous";
          if (img.complete) resolve();
          else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        })
      )
    );

    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 794,
      windowHeight: 1123,
    });

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const canvasHeight = Math.min((canvas.height * imgWidth) / canvas.width, pageHeight);

    pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, imgWidth, canvasHeight);
    pdf.save(`tc_fees_receipt_${student?.receiptNumber || "unknown"}.pdf`);

    document.body.removeChild(wrapper);
  };

  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <strong>TC Fees Receipt</strong>
        </h4>
        <div>
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

      <div
        id="receipt-content"
        className="p-4 shadow-sm"
        style={{ backgroundColor: "#ffffff", position: "relative", minHeight: "297mm" }}
      >
        <div className="header-class" dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />

        <h3 className="text-center text-uppercase mb-3" style={{ color: "#0d6efd" }}>
          <strong>TC Fees Receipt</strong>
        </h3>

        <div className="row mb-4 text-black">
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Receipt No:
              </span>
              <span>{student?.receiptNumber || "N/A"}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Student Name:
              </span>
              <span>
                {student?.firstName && student?.lastName
                  ? `${student.firstName} ${student.lastName}`
                  : "N/A"}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Admission No:
              </span>
              <span>{student?.AdmissionNumber || "N/A"}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Date:
              </span>
              <span>
                {student?.ApplicationReceivedOn
                  ? new Date(student.ApplicationReceivedOn).toLocaleDateString("en-GB")
                  : "N/A"}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Academic Year:
              </span>
              <span>
                {student?.dateOfAdmission
                  ? (() => {
                      const year = new Date(student.dateOfAdmission).getFullYear();
                      return `${year}-${year + 1}`;
                    })()
                  : "N/A"}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Class:
              </span>
              <span>{className || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="table-responsive mb-4">
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th className="text-center">Fee Type</th>
                <th className="text-center">Amount (₹)</th>
                <th className="text-center">Concession (₹)</th>
                <th className="text-center">Final Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{feeTypeName || "N/A"}</td>
                <td className="text-center">{student?.TCfees || "0"}</td>
                <td className="text-center text-danger">{student?.concessionAmount || "0"}</td>
                <td className="text-center fw-bold">{student?.finalAmount || "0"}</td>
              </tr>
              <tr className="table-active">
                <td colSpan="3" className="text-end fw-bold">Total Paid:</td>
                <td className="text-center fw-bold">{student?.finalAmount || "0"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row mb-4 text-black">
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                Payment Mode:
              </span>
              <span className="text-capitalize">{student?.paymentMode || "N/A"}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                Date of Payment:
              </span>
              <span>
                {student?.paymentDate
                  ? new Date(student.paymentDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </span>
            </div>
            {student?.paymentMode?.toLowerCase() !== "cash" && (
              <div className="d-flex mb-2">
                <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                  Transaction/Cheque No:
                </span>
                <span>
                  {student?.chequeNumber
                    ? student.chequeNumber
                    : student?.transactionNumber || "N/A"}
                </span>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <div className="plegs-3 text-center" style={{ height: "100%" }}>
              <p className="mb-4">Authorized Signature</p>
              <div className="mt-4 pt-3" style={{ borderTop: "1px solid #dee2e6" }}>
                <p className="mb-0 fw-bold">{schoolData.school?.schoolName || "School Administrator"}</p>
                <p className="mb-0 small text-muted">Receipt Collector</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="footer-class"
          style={{
            position: "absolute",
            bottom: "10mm",
            left: 0,
            right: 0,
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
          dangerouslySetInnerHTML={{ __html: generateFooter(schoolData.school) }}
        />
      </div>
    </div>
  );
};

export default FeesReceipt;
