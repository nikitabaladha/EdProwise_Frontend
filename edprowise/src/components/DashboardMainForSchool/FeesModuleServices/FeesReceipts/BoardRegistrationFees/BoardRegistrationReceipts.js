// import React, { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import { FaPrint, FaDownload, FaTimes } from "react-icons/fa";
// import { toast } from "react-toastify";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { fetchSchoolData, generateHeader, generateFooter } from "../../PdfUtlis";
// import CancelReceiptModal from "../../CancelReceiptModal";

// const BoardregistrationFeesReceipt = () => {
//   const location = useLocation();
//   const { student, students = [], feeTypeName, className, sectionName, classId, sectionId } = location.state || {};
//   const academicYear = localStorage.getItem('selectedAcademicYear');
//   const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
//   const [studentstatus, setStudent] = useState(student);
//   const [isCancelledOrReturned, setIsCancelledOrReturned] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedAction, setSelectedAction] = useState('');
//   const [isDownloadingAll, setIsDownloadingAll] = useState(false);
//   const [schoolData, setSchoolData] = useState({ school: null, logoSrc: '' });
//   const receiptRef = useRef(null);
//   const [schoolId, setSchoolId] = useState(null);

  
//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;
//     setSchoolId(id);

//         console.log("Initial classId from location.state:", classId); 
//     console.log("Location State:", location.state); 
//     console.log("ClassId:", classId, "SectionId:", sectionId, "SchoolId:", id);

//     const loadSchoolData = async () => {
//       try {
//         const data = await fetchSchoolData(id);
//         setSchoolData(data);
//       } catch (error) {
//         toast.error("Failed to fetch school data. Please try again.");
//         console.error("Error in loadSchoolData:", error);
//       }
//     };

//     if (id) {
//       loadSchoolData();
//     } else {
//       toast.error("School ID not found in localStorage. Please log in again.");
//     }

//     console.log("Location State:", location.state);
//     console.log("ClassId:", classId, "SectionId:", sectionId, "SchoolId:", id);
//   }, [classId, sectionId]);
//   useEffect(() => {
//     const currentStudent = students.length > 0 ? students[currentStudentIndex] : student;
//     if (currentStudent) {
//       const isCancelled = ['Cancelled', 'Cheque Return'].includes(currentStudent?.status) ||
//         currentStudent?.reportStatus?.some(status =>
//           ['Refund', 'Cancelled', 'Cheque Return'].includes(status)
//         );
//       setIsCancelledOrReturned(isCancelled);
//       setStudent(currentStudent);
//     }
//   }, [currentStudentIndex, students, student]);

//   const printReceipt = () => {
//     window.print();
//   };

//   const downloadReceiptAsPDF = async (singleStudent = currentStudent) => {
//     const element = receiptRef.current;
//     if (!element) {
//       toast.error("Receipt content not found. Please try again.");
//       return;
//     }

//     const wrapper = document.createElement("div");
//     wrapper.style.cssText = `
//       width: 210mm;
//       min-height: 350mm;
//       padding: 10mm 15mm 22mm 15mm;
//       background: white;
//       font-family: 'Arial', sans-serif;
//       position: absolute;
//       left: -9999px;
//       box-sizing: border-box;
//       font-size: 18px;
//       line-height: 1.4;
//     `;

//     const contentWithoutHeaderFooter = element.cloneNode(true);
//     const headerElement = contentWithoutHeaderFooter.querySelector(".header-class");
//     const footerElement = contentWithoutHeaderFooter.querySelector(".footer-class");
//     if (headerElement) headerElement.remove();
//     if (footerElement) footerElement.remove();

//     wrapper.innerHTML = `
//       ${generateHeader(schoolData.school, schoolData.logoSrc)}
//       ${contentWithoutHeaderFooter.outerHTML}
//       ${generateFooter(schoolData.school)}
//     `;

//     const footer = wrapper.querySelector(".footer-class");
//     if (footer) {
//       footer.style.position = "absolute";
//       footer.style.bottom = "5mm";
//       footer.style.textAlign = "center";
//       footer.style.width = "100%";
//     }

//     document.body.appendChild(wrapper);

//     const images = wrapper.querySelectorAll("img");
//     await Promise.all(
//       Array.from(images).map((img) =>
//         new Promise((resolve) => {
//           img.crossOrigin = "anonymous";
//           if (img.complete) resolve();
//           else {
//             img.onload = resolve;
//             img.onerror = () => {
//               console.error("Image failed to load:", img.src);
//               resolve();
//             };
//           }
//         })
//       )
//     );

//     const canvas = await html2canvas(wrapper, {
//       scale: 2,
//       useCORS: true,
//       logging: false,
//       backgroundColor: "#ffffff",
//       windowWidth: 794,
//       windowHeight: 1323,
//     });

//     const pdf = new jsPDF({
//       unit: "mm",
//       format: [210, 350],
//       orientation: "portrait",
//     });

//     const imgWidth = 210;
//     const pageHeight = 350;
//     const canvasHeight = Math.min((canvas.height * imgWidth) / canvas.width, pageHeight);

//     pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, imgWidth, canvasHeight);
//     pdf.save(`fees_receipt_${singleStudent.receiptNumberBrf || "unknown"}.pdf`);

//     document.body.removeChild(wrapper);
//   };

//   const downloadAllReceipts = async () => {
//     if (students.length <= 1) return;

//     setIsDownloadingAll(true);
//     for (let index = 0; index < students.length; index++) {
//       setCurrentStudentIndex(index);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       await downloadReceiptAsPDF(students[index]);
//     }
//     setIsDownloadingAll(false);
//   };

//   const handleModalClose = async (updatedStudent) => {
//     setShowModal(false);
//     setSelectedAction('');
//     if (updatedStudent) {
//       setStudent(prev => ({ ...prev, ...updatedStudent }));
//       setIsCancelledOrReturned(['Cancelled', 'Cheque Return'].includes(updatedStudent.status) ||
//         updatedStudent?.reportStatus?.some(status =>
//           ['Refund', 'Cancelled', 'Cheque Return'].includes(status)
//         ));
//     }
//   };

//   const handleActionSelect = (action) => {
//     if (isCancelledOrReturned) {
//       toast.info(`Receipt is already ${studentstatus?.status?.toLowerCase() || 'cancelled/returned'}.`);
//       return;
//     }
//     setSelectedAction(action);
//     setShowModal(true);
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

//   const currentStudent = students.length > 0 ? students[currentStudentIndex] : student;
//   const paymentMode = currentStudent?.paymentMode?.toLowerCase() || "cash";

//   if (!student && students.length === 0) {
//     return (
//       <div className="container my-4 text-center">
//         <div className="alert alert-warning">
//           No receipt data available. Please go back and try again.
//         </div>
//       </div>
//     );
//   }

//   if (!currentStudent) {
//     return (
//       <div className="container my-4 text-center">
//         <div className="alert alert-danger">
//           No student data available. Please contact support.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-4" style={{ maxWidth: "800px" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="text-primary">
//           <strong>Fees Receipt</strong>
//         </h4>
//         <div>
//           <div className="dropdown me-2 d-inline-block">
//             <button
//               className="btn btn-outline-danger dropdown-toggle"
//               type="button"
//               id="actionDropdown"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//               style={{ borderRadius: "20px" }}
//               disabled={paymentMode === 'null' || isCancelledOrReturned}
//             >
//               Action
//             </button>
//             <ul className="dropdown-menu" aria-labelledby="actionDropdown">
//               <li>
//                 <button
//                   className="dropdown-item"
//                   onClick={() => handleActionSelect('Cancelled/Cheque Return')}
//                 >
//                   Cancelled/Cheque Return
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="dropdown-item"
//                   onClick={() => handleActionSelect('Refund')}
//                 >
//                   Refund
//                 </button>
//               </li>
//             </ul>
//           </div>
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
//         style={{ backgroundColor: "#ffffff", position: "relative", minHeight: "350mm" }}
//       >
//         {['Cancelled', 'Cheque Return'].includes(currentStudent?.status) && (
//           <div
//             style={{
//               position: "absolute",
//               top: "40%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               opacity: 0.2,
//               pointerEvents: "none",
//               zIndex: 99,
//               width: "80%",
//               maxWidth: "500px",
//             }}
//           >
//             <img
//               src={currentStudent.status === 'Cheque Return' ? "/assets/images/StatusReturned.png" : "/assets/images/StatusCancelled.png"}
//               alt={currentStudent.status === 'Cheque Return' ? "Returned Watermark" : "Cancelled Watermark"}
//               style={{
//                 width: "100%",
//                 height: "auto",
//               }}
//             />
//           </div>
//         )}
//         <div className="header-class" dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />

//         <h3 className="text-center text-uppercase mb-3" style={{ color: "#0d6efd" }}>
//           <strong>Fee Receipt</strong>
//         </h3>

//         <div className="row mb-3 text-black">
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Receipt No:
//               </span>
//               <span>{currentStudent.receiptNumberBrf || "N/A"}</span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Student Name:
//               </span>
//               <span>
//                 {(currentStudent.firstName && currentStudent.lastName)
//                   ? `${currentStudent.firstName} ${currentStudent.lastName}`
//                   : currentStudent.studentName || 'Unknown'}
//               </span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Admission No:
//               </span>
//               <span>{currentStudent.AdmissionNumber || currentStudent.admissionNumber || "N/A"}</span>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Date:
//               </span>
//               <span>
//                 {currentStudent.paymentDate
//                   ? new Date(currentStudent.paymentDate).toLocaleDateString("en-GB")
//                   : "N/A"}
//               </span>
//             </div>
//             <div className="d-flex mb-2">
//               <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
//                 Academic Year:
//               </span>
//               <span>{academicYear || "N/A"}</span>
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
//                   {(currentStudent?.admissionFees != null ? currentStudent.admissionFees.toFixed(2) : currentStudent.finalAmount.toFixed(2)) || "0"}
//                 </td>
//                 <td className="text-center fw-bold">{currentStudent.finalAmount.toFixed(2) || "0"}</td>
//               </tr>
//               <tr className="table-active">
//                 <td colSpan="2" className="text-end fw-bold">
//                   Total Paid:
//                 </td>
//                 <td className="text-center fw-bold">{currentStudent.finalAmount.toFixed(2) || "0"}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         <div className="row mb-3 text-black" style={{ marginBottom: "100px" }}>
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
//             {['Cancelled', 'Cheque Return'].includes(currentStudent?.status) && (
//               <>
//                 <div className="d-flex mb-2">
//                   <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
//                     Cancel Reason:
//                   </span>
//                   <span>{currentStudent?.cancelReason || "N/A"}</span>
//                 </div>
//               </>
//             )}
//           </div>
//           <div className="col-md-6">
//             <div className="p-3 text-center" style={{ height: "100%", paddingBottom: "40px" }}>
//               <p className="mb-4">Authorized Signature</p>
//               <div className="mt-4 pt-3" style={{ borderTop: "1px solid #dee2e6" }}>
//                 <p className="mb-0 fw-bold">{schoolData.school?.schoolName || "School Administrator"}</p>
//                 <p className="mb-0 small text-muted">Receipt Collector</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           className="footer-class"
//           style={{
//             position: "absolute",
//             bottom: "5mm",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             width: "100%",
//             boxSizing: "border-box",
//           }}
//           dangerouslySetInnerHTML={{ __html: generateFooter(schoolData.school) }}
//         />
//       </div>
//       <CancelReceiptModal
//         show={showModal}
//         onClose={handleModalClose}
//         student={currentStudent}
//         feeTypeName={feeTypeName}
//         classId={classId}
//         schoolId={schoolId}
//         setIsCancelled={setIsCancelledOrReturned}
//         action={selectedAction}
//         sectionId={sectionId}
//       />
//     </div>
//   );
// };

// export default BoardregistrationFeesReceipt;

import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { fetchSchoolData, generateHeader, generateFooter } from "../../PdfUtlis";
import CancelReceiptModal from "../../CancelReceiptModal";
import getAPI from "../../../../../api/getAPI";

const BoardRegistrationFeesReceipt = () => {
  const location = useLocation();
  const { receiptNumberBrf, schoolId, className, sectionName, classId, sectionId } = location.state || {};
  const academicYear = localStorage.getItem('selectedAcademicYear');
  const [students, setStudents] = useState([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [isCancelledOrReturned, setIsCancelledOrReturned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [schoolData, setSchoolData] = useState({ school: null, logoSrc: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const receiptRef = useRef(null);
  const feeTypeName = "Board Registration Fee";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      console.log("Starting fetchData with:", { schoolId, receiptNumberBrf,classId,sectionId });

      if (!schoolId) {
        setError("Missing schoolId.");
        toast.error("Missing schoolId.");
        setIsLoading(false);
        return;
      }

      try {
       const url = `/get-board-registration-payment-data/${schoolId}/${encodeURIComponent(receiptNumberBrf)}`;
        const response = await getAPI(url);
        if (response && !response.hasError) {
          const data = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
          setStudents(data);
          setIsCancelledOrReturned(
            data[0]?.status === 'Cancelled' || 
            data[0]?.status === 'Cheque Return' ||
            data[0]?.reportStatus?.some(status => 
              ['Refund', 'Cancelled', 'Cheque Return'].includes(status)
            )
          );
        } else {
          setError(response?.message || "Failed to fetch data.");
          toast.error(response?.message || "Failed to fetch data.");
        }
      } catch (error) {
        setError("Failed to fetch board registration payment data: " + error.message);
        toast.error("Failed to fetch board registration payment data: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [schoolId, receiptNumberBrf]);

  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        const data = await fetchSchoolData(schoolId);
        setSchoolData(data);
      } catch (error) {
        toast.error("Failed to fetch school data: " + error.message);
        console.error("School Data Error:", error);
      }
    };

    if (schoolId) {
      loadSchoolData();
    }
  }, [schoolId]);

  useEffect(() => {
    const currentStudent = students[currentStudentIndex];
    if (currentStudent) {
      const isCancelled = ['Cancelled', 'Cheque Return'].includes(currentStudent.status) ||
        currentStudent.reportStatus?.some(status =>
          ['Refund', 'Cancelled', 'Cheque Return'].includes(status)
        );
      setIsCancelledOrReturned(isCancelled);
    }
  }, [currentStudentIndex, students]);

  const printReceipt = () => {
    window.print();
  };

  const downloadReceiptAsPDF = async (singleStudent = students[currentStudentIndex]) => {
    const element = receiptRef.current;
    if (!element) {
      toast.error("Receipt content not found. Please try again.");
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.style.cssText = `
      width: 210mm;
      min-height: 350mm;
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
    pdf.save(`board_fees_receipt_${singleStudent.receiptNumberBrf || "unknown"}.pdf`);

    document.body.removeChild(wrapper);
  };

  const downloadAllReceipts = async () => {
    if (students.length <= 1) return;

    setIsDownloadingAll(true);
    for (let index = 0; index < students.length; index++) {
      setCurrentStudentIndex(index);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await downloadReceiptAsPDF(students[index]);
    }
    setIsDownloadingAll(false);
  };

  const handleModalClose = async (updatedStudent) => {
    setShowModal(false);
    setSelectedAction('');
    if (updatedStudent) {
      setStudents(prev => {
        const updatedStudents = [...prev];
        updatedStudents[currentStudentIndex] = { ...prev[currentStudentIndex], ...updatedStudent };
        return updatedStudents;
      });
      setIsCancelledOrReturned(
        ['Cancelled', 'Cheque Return'].includes(updatedStudent.status) ||
        updatedStudent.reportStatus?.some(status =>
          ['Refund', 'Cancelled', 'Cheque Return'].includes(status)
        )
      );
    }
  };

  const handleActionSelect = (action) => {
    if (isCancelledOrReturned) {
      toast.info(`Receipt is already ${students[currentStudentIndex]?.status?.toLowerCase() || 'cancelled/returned'}.`);
      return;
    }
    setSelectedAction(action);
    setShowModal(true);
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

  const currentStudent = students[currentStudentIndex];
  const paymentMode = currentStudent?.paymentMode?.toLowerCase() || "cash";

  if (isLoading) {
    return (
      <div className="container my-4 text-center">
        <h4>Loading receipt data...</h4>
      </div>
    );
  }

  if (error || !currentStudent) {
    return (
      <div className="container my-4 text-center">
        <h4 className="text-danger">Failed to load receipt data: {error || "No data available."}</h4>
      </div>
    );
  }

  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <strong>Board Registration Fees Receipt</strong>
        </h4>
        <div>
          <div className="dropdown me-2 d-inline-block">
            <button
              className="btn btn-outline-danger dropdown-toggle"
              type="button"
              id="actionDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ borderRadius: "20px" }}
              disabled={paymentMode === 'null' || isCancelledOrReturned}
            >
              Action
            </button>
            <ul className="dropdown-menu" aria-labelledby="actionDropdown">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleActionSelect('Cancelled/Cheque Return')}
                >
                  Cancelled/Cheque Return
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleActionSelect('Refund')}
                >
                  Refund
                </button>
              </li>
            </ul>
          </div>
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
        style={{ backgroundColor: "#ffffff", position: "relative", minHeight: "350mm" }}
      >
        {['Cancelled', 'Cheque Return'].includes(currentStudent?.status) && (
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0.2,
              pointerEvents: "none",
              zIndex: 99,
              width: "80%",
              maxWidth: "500px",
            }}
          >
            <img
              src={currentStudent.status === 'Cheque Return' ? "/assets/images/StatusReturned.png" : "/assets/images/StatusCancelled.png"}
              alt={currentStudent.status === 'Cheque Return' ? "Returned Watermark" : "Cancelled Watermark"}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        )}
        <div className="header-class" dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />

        <h3 className="text-center text-uppercase mb-3" style={{ color: "#0d6efd" }}>
          <strong>Board Registration Fees Receipt</strong>
        </h3>

        <div className="row mb-3 text-black">
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Receipt No:
              </span>
              <span>{currentStudent.receiptNumberBrf || "N/A"}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Student Name:
              </span>
              <span>
                {(currentStudent.firstName && currentStudent.lastName)
                  ? `${currentStudent.firstName} ${currentStudent.lastName}`
                  : "Unknown"}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Admission No:
              </span>
              <span>{currentStudent.admissionNumber || "N/A"}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Date:
              </span>
              <span>
                {currentStudent.paymentDate
                  ? new Date(currentStudent.paymentDate).toLocaleDateString("en-GB")
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
                <th className="text-center">Final Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{feeTypeName}</td>
                <td className="text-center fw-bold">{currentStudent.finalAmount.toFixed(2) || "0"}</td>
              </tr>
              <tr className="table-active">
                <td className="text-end fw-bold">
                  Total Paid:
                </td>
                <td className="text-center fw-bold">{currentStudent.finalAmount.toFixed(2) || "0"}</td>
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
                <span>{currentStudent.transactionId || "N/A"}</span>
              </div>
            )}
            {['Cancelled', 'Cheque Return'].includes(currentStudent?.status) && (
              <>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                    Cancel Reason:
                  </span>
                  <span>{currentStudent?.cancelReason || "N/A"}</span>
                </div>
              </>
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
      <CancelReceiptModal
        show={showModal}
        onClose={handleModalClose}
        student={currentStudent}
        feeTypeName={feeTypeName}
        classId={classId}
        schoolId={schoolId}
        setIsCancelled={setIsCancelledOrReturned}
        action={selectedAction}
        sectionId={sectionId}
      />
    </div>
  );
};

export default BoardRegistrationFeesReceipt;