// import React from "react";
// import { useLocation } from "react-router-dom";
// import { FaPrint, FaDownload } from "react-icons/fa";
// import html2pdf from "html2pdf.js";

// const FeesReceipt = () => {
//   const location = useLocation();
//   const { student, feeTypeName, className } = location.state || {};

//   const printReceipt = () => {
//     window.print();
//   };

//   const downloadReceiptAsPDF = () => {
//     const element = document.getElementById("receipt-content");
//     const options = {
//       filename: `fees_receipt_${student.receiptNumber}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//     };
//     html2pdf().from(element).set(options).save();
//   };

//   return (
//     <div className="container my-4" style={{ maxWidth: '800px' }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="text-primary">
//           <strong>Registration Fees Receipt</strong>
//         </h4>
//         <div>
//           <button 
//             onClick={printReceipt} 
//             className="btn btn-outline-primary me-2"
//             style={{ borderRadius: '20px' }}
//           >
//             <FaPrint className="me-1" /> Print
//           </button>
//           <button 
//             onClick={downloadReceiptAsPDF} 
//             className="btn btn-primary"
//             style={{ borderRadius: '20px' }}
//           >
//             <FaDownload className="me-1" /> Download PDF
//           </button>
//         </div>
//       </div>

//       <div 
//         id="receipt-content" 
//         className="p-4 shadow-sm"
//         style={{ backgroundColor: '#ffffff' }}
//       >
//         {/* Header */}
//         <div className="text-center mb-3">
//           <h2 className="text-primary mb-1">ABC International School</h2>
//           <p className="mb-1">123 Education Street, Knowledge City</p>
//           <p>Phone: (123) 456-7890 | Email: info@abcschool.edu</p>
//           <div className="d-flex justify-content-center">
//             <div style={{ 
//               borderTop: '2px solid #0d6efd', 
//               width: '100%', 
//               margin: '0 10px' 
//             }}></div>
//           </div>
//         </div>

//         <h3 className="text-center text-uppercase mb-3" style={{ color: '#0d6efd' }}>
//           <strong>Registration Fees Receipt</strong>
//         </h3>

//         {/* Receipt Details */}
//         <div className="row mb-3 text-black">
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Receipt No:</span>
//               <span>{student.receiptNumber}</span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Student Name:</span>
//               <span>{student.firstName} {student.lastName}</span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Registration No:</span>
//               <span>{student.registrationNumber}</span>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Date:</span>
//               <span>{new Date(student.registrationDate).toLocaleDateString('en-GB')}</span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Academic Year:</span>
//               <span>
//                 {(() => {
//                   const year = new Date(student.registrationDate).getFullYear();
//                   return `${year}-${year + 1}`;
//                 })()}
//               </span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Class:</span>
//               <span>{className}</span>
//             </div>
//           </div>
//         </div>

//         {/* Fee Table */}
//         <div className="table-responsive mb-3">
//           <table className="table table-bordered">
//             <thead className="table-primary">
//               <tr>
//                 <th className="text-center">Fee Type</th>
//                 <th className="text-center">Amount (₹)</th>
//                 <th className="text-center">Concession (₹)</th>
//                 <th className="text-center">Final Amount (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="text-center">{feeTypeName}</td>
//                 <td className="text-center">{student.registrationFee}</td>
//                 <td className="text-center text-danger">{student.concessionAmount}</td>
//                 <td className="text-center fw-bold">{student.finalAmount}</td>
//               </tr>
//               <tr className="table-active">
//                 <td colSpan="3" className="text-end fw-bold">Total Paid:</td>
//                 <td className="text-center fw-bold">{student.finalAmount}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Payment Details and Signature */}
//         <div className="row mb-3 text-black">
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '150px' }}>Payment Mode:</span>
//               <span className="text-capitalize">{student.paymentMode}</span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '150px' }}>Date of Payment:</span>
//               <span>{new Date(student.paymentDate).toLocaleDateString('en-GB')}</span>
//             </div>
//             {student.paymentMode!== 'Cash' && (
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: '150px' }}>Transaction/Cheque No:</span>
//               <span>{student?.chequeNumber ? student.chequeNumber : student?.transactionNumber || ''}</span>
//             </div>
//             )}
//           </div>
//           <div className="col-md-6">
//             <div className="p-3 text-center" style={{ height: '100%' }}>
//               <p className="mb-4">Authorized Signature</p>
//               <div className="mt-4 pt-3" style={{ borderTop: '1px solid #dee2e6' }}>
//                 <p className="mb-0 fw-bold">{student.name || "School Administrator"}</p>
//                 <p className="mb-0 small text-muted">Receipt Collector</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-4 pt-3" style={{ borderTop: '2px solid #0d6efd' }}>
//           <p className="small text-muted mb-1">
//             This is a computer-generated receipt and does not require a physical signature.
//           </p>
//           <p className="small text-muted">
//             For any queries, please contact accounts@abcschool.edu or call +1234567890
//           </p>
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
  const { student, feeTypeName, className } = location.state || {};
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
      // footer.style.width = "100%";
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
    pdf.save(`fees_receipt_${student?.receiptNumber || "unknown"}.pdf`);

    document.body.removeChild(wrapper);
  };

  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <strong>Registration Fees Receipt</strong>
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
        {/* Header */}
        <div className="header-class" dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />

        <h3 className="text-center text-uppercase mb-3" style={{ color: "#0d6efd" }}>
          <strong>Registration Fees Receipt</strong>
        </h3>

        {/* Receipt Details */}
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
                Registration No:
              </span>
              <span>{student?.registrationNumber || "N/A"}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Date:
              </span>
              <span>
                {student?.registrationDate
                  ? new Date(student.registrationDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Academic Year:
              </span>
              <span>
                {student?.registrationDate
                  ? (() => {
                      const year = new Date(student.registrationDate).getFullYear();
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

        {/* Fee Table */}
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
                <td className="text-center">{student?.registrationFee || "0"}</td>
                <td className="text-center text-danger">{student?.concessionAmount || "0"}</td>
                <td className="text-center fw-bold">{student?.finalAmount || "0"}</td>
              </tr>
              <tr className="table-active">
                <td colSpan="3" className="text-end fw-bold">
                  Total Paid:
                </td>
                <td className="text-center fw-bold">{student?.finalAmount || "0"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Details and Signature */}
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
            {student?.paymentMode !== "Cash" && (
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
            <div className="p-3 text-center" style={{ height: "100%" }}>
              <p className="mb-4">Authorized Signature</p>
              <div className="mt-4 pt-3" style={{ borderTop: "1px solid #dee2e6" }}>
                <p className="mb-0 fw-bold">
                  {schoolData.school?.schoolName || "School Administrator"}
                </p>
                <p className="mb-0 small text-muted">Receipt Collector</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
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