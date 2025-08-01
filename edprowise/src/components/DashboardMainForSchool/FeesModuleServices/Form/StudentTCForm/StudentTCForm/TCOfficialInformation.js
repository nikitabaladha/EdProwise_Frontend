import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { fetchSchoolData, generateHeader, generateFooter } from "../../../PdfUtlis";
import getAPI from "../../../../../../api/getAPI";
import CancelReceiptModal from "../CancelReceiptModal";

const FeesReceipt = () => {
  const location = useLocation();
  const { data, feeTypeName, className } = location.state || {};
  const student = data?.form || {};
  const [students, setStudent] = useState(student);
  const [schoolData, setSchoolData] = useState({ school: null, logoSrc: '' });
  const [isCancelledOrReturned, setIsCancelledOrReturned] = useState(['Cancelled', 'Cheque Return'].includes(students?.status));
  const [showModal, setShowModal] = useState(false);

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

  const fetchStudentStatus = async () => {
    try {
      const response = await getAPI(`/get-tc-status/${student._id}`, true);
      console.log("API Response:", response);

      if (!response.hasError && response.data && response.data.student) {
        setStudent(prev => ({ ...prev, ...response.data.student }));
        console.log("Updated student data:", response.data.student);
        setIsCancelledOrReturned(['Cancelled', 'Cheque Return'].includes(response.data.student.status));
        toast.success(`Student status fetched: ${response.data.student.status}`);
      } else {
        toast.error(response.message || "Failed to fetch student status.");
      }
    } catch (error) {
      toast.error("Error fetching student status. Please try again.");
    }
  };

  const handleModalClose = async (updatedStudent) => {
    setShowModal(false);
    if (updatedStudent) {
      setTimeout(async () => {
        await fetchStudentStatus();
      }, 500);
    }
  };

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

  const handleCancelClick = () => {
    if (isCancelledOrReturned) {
      toast.info(`Receipt is already ${student.status.toLowerCase()}.`);
      return;
    }
    setShowModal(true);
  };



  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <strong>TC Fees Receipt</strong>
        </h4>
        <div>
          <button
            onClick={handleCancelClick}
            className="btn btn-outline-danger me-2"
            style={{ borderRadius: "20px" }}
            disabled={isCancelledOrReturned }
          >
            <FaTimes className="me-1" /> Cancel/Return
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

      <div
        id="receipt-content"
        className="p-4 shadow-sm"
        style={{ backgroundColor: "#ffffff", position: "relative", minHeight: "297mm" }}
      >
        {['Cancelled', 'Cheque Return'].includes(students?.status) && (
          <div
            style={{
              position: "absolute",
              top: "50%",
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
              src={students.status === 'Cheque Return' ? "/assets/images/StatusReturned.png" : "/assets/images/StatusCancelled.png"}
              alt={students.status === 'Cheque Return' ? "Returned Watermark" : "Cancelled Watermark"}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        )}

        <div className="header-class" dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />

        <h3 className="text-center text-uppercase mb-3" style={{ color: "#0d6efd", zIndex: 1, position: "relative" }}>
          <strong>TC Fees Receipt</strong>
        </h3>

        {/* <div className="row mb-4 text-black" style={{ zIndex: 1, position: "relative" }}>
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
                {student?.applicationDate
                  ? new Date(student.applicationDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Academic Year:
              </span>
              <span>
                {student?.academicYear || ""}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>
                Class:
              </span>
              <span>{className || "N/A"}</span>
            </div>
          </div>
        </div> */}
         <table className="table table-borderless text-black" style={{ zIndex: 1, position: "relative" }}>
          <tbody>
            <tr className="text-nowrap">
              <td className="fw-bold" style={{ minWidth: "120px" }}>Receipt No:</td>
              <td>{student?.receiptNumber || ""}</td>
              <td className="fw-bold" style={{ minWidth: "120px" }}>Date:</td>
              <td>
                {student?.paymentDate
                  ? new Date(student.paymentDate).toLocaleDateString("en-GB")
                  : ""}
              </td>
            </tr>
            <tr className="text-nowrap">
              <td className="fw-bold">Student Name:</td>
              <td>
                {student?.firstName && student?.lastName
                  ? `${student.firstName} ${student.lastName}`
                  : ""}
              </td>
              <td className="fw-bold">Academic Year:</td>
              <td>{student?.academicYear || ""}</td>
            </tr>
            <tr className="text-nowrap">
              <td className="fw-bold">Admission No:</td>
              <td>{student?.AdmissionNumber || "N/A"}</td>
              <td className="fw-bold">Class:</td>
              <td>{className || ""}</td>
            </tr>
          </tbody>
        </table>

        <div className="table-responsive mb-4" style={{ zIndex: 1, position: "relative" }}>
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
                <td className="text-center">{student?.concessionAmount || "0"}</td>
                <td className="text-center fw-bold">{student?.finalAmount || "0"}</td>
              </tr>
              <tr className="table-active">
                <td colSpan="3" className="text-end fw-bold">Total Paid:</td>
                <td className="text-center fw-bold">{student?.finalAmount || "0"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row mb-4 text-black" style={{ zIndex: 1, position: "relative" }}>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                Payment Mode:
              </span>
              <span className="text-capitalize">{student?.paymentMode || "N/A"}</span>
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
              {['Cancelled', 'Cheque Return'].includes(students?.status) && (
              <>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                    Cancel Reason:
                  </span>
                  <span>{students?.cancelReason || ""}</span>
                </div>
              </>
            )}
          </div>
          <div className="col-md-6">
            <div className="p-3 text-center" style={{ height: "100%" }}>
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
            zIndex: 1,
          }}
          dangerouslySetInnerHTML={{ __html: generateFooter(schoolData.school) }}
        />
      </div>
      <CancelReceiptModal
        show={showModal}
        onClose={handleModalClose}
        student={student}
        setIsCancelled={setIsCancelledOrReturned}
        fetchStudentStatus={fetchStudentStatus}
      />
    </div>
  );
};

export default FeesReceipt;