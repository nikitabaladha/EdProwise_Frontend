// import { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import { FaPrint, FaDownload } from "react-icons/fa";
// import html2pdf from "html2pdf.js";

// const FeesReceipt = () => {
//   const location = useLocation();
//   const { student, students = [], feeTypeName, className, sectionName } = location.state || {};
//   const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
//   const [isDownloadingAll, setIsDownloadingAll] = useState(false);
//   const receiptRef = useRef(null);
//    const academicYear = localStorage.getItem('selectedAcademicYear');

//   useEffect(() => {
//     console.log("Section Name:", sectionName);
//     console.log("student:", student);
//     console.log("academicYear",academicYear)
//   }, [sectionName, feeTypeName,academicYear]);

//   if (!student && students.length === 0) {
//     return (
//       <div className="container my-4 text-center">
//         <div className="alert alert-warning">
//           No receipt data available. Please go back and try again.
//         </div>
//       </div>
//     );
//   }

//   const currentStudent = students.length > 0 ? students[currentStudentIndex] : student;

//   if (!currentStudent) {
//     return (
//       <div className="container my-4 text-center">
//         <div className="alert alert-danger">
//           No student data available. Please contact support.
//         </div>
//       </div>
//     );
//   }

//   const printReceipt = () => {
//     window.print();
//   };

//   const downloadReceiptAsPDF = (singleStudent = currentStudent) => {
//     const element = receiptRef.current;
//     const options = {
//       filename: `fees_receipt_${singleStudent.receiptNumber}.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//     };
//     html2pdf().from(element).set(options).save();
//   };

//   const downloadAllReceipts = async () => {
//     if (students.length <= 1) return;

//     setIsDownloadingAll(true);
//     for (let index = 0; index < students.length; index++) {
//       setCurrentStudentIndex(index);
//       await new Promise((resolve) => setTimeout(resolve, 500)); 
//       downloadReceiptAsPDF(students[index]);
//     }
//     setIsDownloadingAll(false);
//   };

//   const handleNextStudent = () => {
//     if (currentStudentIndex < students.length - 1) {
//       setCurrentStudentIndex(currentStudentIndex + 1);
//     }
//   };

//   const handlePreviousStudent = () => {
//     if (currentStudentIndex > 0) {
//       setCurrentStudentIndex(currentStudentIndex - 1);
//     }
//   };


//   const paymentMode = currentStudent.paymentMode?.toLowerCase() || "cash";

//   return (
//     <div className="container my-4" style={{ maxWidth: "800px" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="text-primary">
//           <strong>Fees Receipt</strong>
//         </h4>
//         <div>
//           {students.length > 1 && (
//             <>
//               <button
//                 className="btn btn-outline-primary me-2"
//                 onClick={handlePreviousStudent}
//                 disabled={currentStudentIndex === 0 || isDownloadingAll}
//                 style={{ borderRadius: "20px" }}
//                 aria-label="Previous Student"
//               >
//                 Previous
//               </button>
//               <button
//                 className="btn btn-outline-primary me-2"
//                 onClick={handleNextStudent}
//                 disabled={currentStudentIndex === students.length - 1 || isDownloadingAll}
//                 style={{ borderRadius: "20px" }}
//                 aria-label="Next Student"
//               >
//                 Next
//               </button>
//               <button
//                 className="btn btn-primary me-2"
//                 onClick={downloadAllReceipts}
//                 disabled={isDownloadingAll}
//                 style={{ borderRadius: "20px" }}
//                 aria-label="Download All Receipts"
//               >
//                 <FaDownload className="me-1" />{" "}
//                 {isDownloadingAll ? "Downloading..." : "Download All"}
//               </button>
//             </>
//           )}
//           <button
//             onClick={printReceipt}
//             className="btn btn-outline-primary me-2"
//             style={{ borderRadius: "20px" }}
//             disabled={isDownloadingAll}
//             aria-label="Print Receipt"
//           >
//             <FaPrint className="me-1" /> Print
//           </button>
//           <button
//             onClick={() => downloadReceiptAsPDF()}
//             className="btn btn-primary"
//             style={{ borderRadius: "20px" }}
//             disabled={isDownloadingAll}
//             aria-label="Download PDF"
//           >
//             <FaDownload className="me-1" /> Download PDF
//           </button>
//         </div>
//       </div>

//       <div
//         id="receipt-content"
//         ref={receiptRef}
//         className="p-4 shadow-sm"
//         style={{ backgroundColor: "#ffffff" }}
//       >
//         <div className="text-center mb-3">
//           <h2 className="text-primary mb-1">ABC International School</h2>
//           <p className="mb-1">123 Education Street, Knowledge City</p>
//           <p>Phone: (123) 456-7890 | Email: info@abcschool.edu</p>
//           <div className="d-flex justify-content-center">
//             <div
//               style={{
//                 borderTop: "2px solid #0d6efd",
//                 width: "100%",
//                 margin: "0 10px",
//               }}
//             ></div>
//           </div>
//         </div>

//         <h3
//           className="text-center text-uppercase mb-3"
//           style={{ color: "#0d6efd" }}
//         >
//           <strong>Fee Receipt</strong>
//         </h3>

//         <div className="row mb-3 text-black">
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Receipt No:
//               </span>
//               <span>{currentStudent.receiptNumberBef || "N/A"}</span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Student Name:
//               </span>
//               <span>
//                 {currentStudent.firstName} {currentStudent.lastName}
//               </span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Admission No:
//               </span>
//               <span>{currentStudent.AdmissionNumber || "N/A"}</span>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Date:
//               </span>
//               <span>
//                 {currentStudent.applicationDate
//                   ? new Date(currentStudent.applicationDate).toLocaleDateString(
//                       "en-GB"
//                     )
//                   : "N/A"}
//               </span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Academic Year:
//               </span>
//               <span>
//                 {academicYear}
//               </span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Class/Section:
//               </span>
//               <span>
//                 {className && sectionName ? `${className}/${sectionName}` : "N/A"}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="table-responsive mb-3">
//           <table className="table table-bordered">
//             <thead className="table-primary">
//               <tr>
//                 <th className="text-center">Fee Type</th>
//                 <th className="text-center">Amount (₹)</th>
//                 <th className="text-center">Final Amount (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="text-center">{feeTypeName || "N/A"}</td>
//                 <td className="text-center">
//                   {currentStudent.admissionFees || 0}
//                 </td>
//                 <td className="text-center fw-bold">
//                   {currentStudent.finalAmount || 0}
//                 </td>
//               </tr>
//               <tr className="table-active">
//                 <td colSpan="2" className="text-end fw-bold">
//                   Total Paid:
//                 </td>
//                 <td className="text-center fw-bold">
//                   {currentStudent.finalAmount || 0}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="row mb-3 text-black">
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
//                 Payment Mode:
//               </span>
//               <span className="text-capitalize">{paymentMode}</span>
//             </div>
//             {paymentMode === "cheque" && (
//               <>
//                 <div className="d-flex mb-2">
//                   <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
//                     Cheque No:
//                   </span>
//                   <span>{currentStudent.chequeNumber || "N/A"}</span>
//                 </div>
//                 <div className="d-flex mb-2">
//                   <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
//                     Bank Name:
//                   </span>
//                   <span>{currentStudent.bankName || "N/A"}</span>
//                 </div>
//               </>
//             )}
//             {paymentMode === "online" && (
//               <div className="d-flex mb-2">
//                 <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
//                   Transaction ID:
//                 </span>
//                 <span>{currentStudent.transactionNumber || "N/A"}</span>
//               </div>
//             )}
//           </div>
//           <div className="col-md-6">
//             <div className="p-3 text-center" style={{ height: "100%" }}>
//               <p className="mb-4">Authorized Signature</p>
//               <div className="mt-4 pt-3" style={{ borderTop: "1px solid #dee2e6" }}>
//                 <p className="mb-0 fw-bold">
//                   {currentStudent.name || "School Administrator"}
//                 </p>
//                 <p className="mb-0 small text-muted">Receipt Collector</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           className="text-center mt-4 pt-3"
//           style={{ borderTop: "2px solid #0d6efd" }}
//         >
//           <p className="small text-muted mb-1">
//             This is a computer-generated receipt and does not require a physical
//             signature.
//           </p>
//           <p className="small text-muted">
//             For any queries, please contact accounts@abcschool.edu or call
//             +1234567890
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeesReceipt;

import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { fetchSchoolData, generateHeader, generateFooter } from "../../PdfUtlis";

const FeesReceipt = () => {
  const location = useLocation();
  const { student, students = [], feeTypeName, className, sectionName } = location.state || {};
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [schoolData, setSchoolData] = useState({ school: null, logoSrc: '' });
  const receiptRef = useRef(null);
  const academicYear = localStorage.getItem('selectedAcademicYear');

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

    console.log("Section Name:", sectionName);
    console.log("student:", student);
    console.log("academicYear", academicYear);
  }, [sectionName, feeTypeName, academicYear]);

  if (!student && students.length === 0) {
    return (
      <div className="container my-4 text-center">
        <div className="alert alert-warning">
          No receipt data available. Please go back and try again.
        </div>
      </div>
    );
  }

  const currentStudent = students.length > 0 ? students[currentStudentIndex] : student;

  if (!currentStudent) {
    return (
      <div className="container my-4 text-center">
        <div className="alert alert-danger">
          No student data available. Please contact support.
        </div>
      </div>
    );
  }

  const printReceipt = () => {
    window.print();
  };

  const downloadReceiptAsPDF = async (singleStudent = currentStudent) => {
    const element = receiptRef.current;
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
      footer.style.bottom = "5mm";
      footer.style.textAlign = "center";
      footer.style.width = "100%";
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
            img.onerror = () => {
              console.error("Image failed to load:", img.src);
              resolve();
            };
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
      windowHeight: 1323,
    });

    const pdf = new jsPDF({
      unit: "mm",
      format: [210, 350],
      orientation: "portrait",
    });

    const imgWidth = 210;
    const pageHeight = 350;
    const canvasHeight = Math.min((canvas.height * imgWidth) / canvas.width, pageHeight);

    pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, imgWidth, canvasHeight);
    pdf.save(`fees_receipt_${singleStudent.receiptNumber || "unknown"}.pdf`);

    document.body.removeChild(wrapper);
  };

  const downloadAllReceipts = async () => {
    if (students.length <= 1) return;

    setIsDownloadingAll(true);
    for (let index = 0; index < students.length; index++) {
      setCurrentStudentIndex(index);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await downloadReceiptAsPDF(students[index]);
    }
    setIsDownloadingAll(false);
  };

  const handleNextStudent = () => {
    if (currentStudentIndex < students.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1);
    }
  };

  const handlePreviousStudent = () => {
    if (currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1);
    }
  };

  const paymentMode = currentStudent.paymentMode?.toLowerCase() || "cash";

  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <strong>Fees Receipt</strong>
        </h4>
        <div>
          {students.length > 1 && (
            <>
              <button
                className="btn btn-outline-primary me-2"
                onClick={handlePreviousStudent}
                disabled={currentStudentIndex === 0 || isDownloadingAll}
                style={{ borderRadius: "20px" }}
                aria-label="Previous Student"
              >
                Previous
              </button>
              <button
                className="btn btn-outline-primary me-2"
                onClick={handleNextStudent}
                disabled={currentStudentIndex === students.length - 1 || isDownloadingAll}
                style={{ borderRadius: "20px" }}
                aria-label="Next Student"
              >
                Next
              </button>
              <button
                className="btn btn-primary me-2"
                onClick={downloadAllReceipts}
                disabled={isDownloadingAll}
                style={{ borderRadius: "20px" }}
                aria-label="Download All Receipts"
              >
                <FaDownload className="me-1" />{" "}
                {isDownloadingAll ? "Downloading..." : "Download All"}
              </button>
            </>
          )}
          <button
            onClick={printReceipt}
            className="btn btn-outline-primary me-2"
            style={{ borderRadius: "20px" }}
            disabled={isDownloadingAll}
            aria-label="Print Receipt"
          >
            <FaPrint className="me-1" /> Print
          </button>
          <button
            onClick={() => downloadReceiptAsPDF()}
            className="btn btn-primary"
            style={{ borderRadius: "20px" }}
            disabled={isDownloadingAll}
            aria-label="Download PDF"
          >
            <FaDownload className="me-1" /> Download PDF
          </button>
        </div>
      </div>

      <div
        id="receipt-content"
        ref={receiptRef}
        className="p-4 shadow-sm"
        style={{ backgroundColor: "#ffffff", position: "relative", minHeight: "297mm" }}
      >
        <div className="header-class" dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />

        <h3 className="text-center text-uppercase mb-3" style={{ color: "#0d6efd" }}>
          <strong>Fee Receipt</strong>
        </h3>

        <div className="row mb-3 text-black">
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Receipt No:
              </span>
              <span>{currentStudent.receiptNumberBef|| "N/A"}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Student Name:
              </span>
              <span>
                {currentStudent.firstName} {currentStudent.lastName}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Admission No:
              </span>
              <span>{currentStudent.AdmissionNumber || "N/A"}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Date:
              </span>
              <span>
                {currentStudent.applicationDate
                  ? new Date(currentStudent.applicationDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Academic Year:
              </span>
              <span>{academicYear || "N/A"}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Class/Section:
              </span>
              <span>
                {className && sectionName ? `${className}/${sectionName}` : "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="table-responsive mb-3">
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th className="text-center">Fee Type</th>
                <th className="text-center">Amount (₹)</th>
                <th className="text-center">Final Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{feeTypeName || "N/A"}</td>
                <td className="text-center">{currentStudent.admissionFees || 0}</td>
                <td className="text-center fw-bold">{currentStudent.finalAmount || 0}</td>
              </tr>
              <tr className="table-active">
                <td colSpan="2" className="text-end fw-bold">
                  Total Paid:
                </td>
                <td className="text-center fw-bold">{currentStudent.finalAmount || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row mb-3 text-black" style={{ marginBottom: "100px" }}>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                Payment Mode:
              </span>
              <span className="text-capitalize">{paymentMode}</span>
            </div>
            {paymentMode === "cheque" && (
              <>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                    Cheque No:
                  </span>
                  <span>{currentStudent.chequeNumber || "N/A"}</span>
                </div>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                    Bank Name:
                  </span>
                  <span>{currentStudent.bankName || "N/A"}</span>
                </div>
              </>
            )}
            {paymentMode === "online" && (
              <div className="d-flex mb-2">
                <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                  Transaction ID:
                </span>
                <span>{currentStudent.transactionNumber || "N/A"}</span>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <div className="p-3 text-center" style={{ height: "100%", paddingBottom: "40px" }}>
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
            bottom: "5mm",
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