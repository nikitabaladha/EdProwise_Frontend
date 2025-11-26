
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
  const { formData, className, sectionName, feeTypes, receiptNumber, formId } = location.state || {};
  const [student, setStudent] = useState(formData);
  const [schoolData, setSchoolData] = useState({ school: null, logoSrc: '' });
  const [isCancelledOrReturned, setIsCancelledOrReturned] = useState(['Cancelled', 'Cheque Return'].includes(student?.status));
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
      const response = await getAPI(`/get-concession-status/${formData._id || formId}`, true);
      console.log("API Response:", response);

      if (!response.hasError && response.data && response.data.student) {
        setStudent(prev => ({ ...prev, ...response.data.student }));
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
      font-size: 16px;
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
      footer.style.width = "100%";
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
    pdf.save(`concession_form_${receiptNumber || "unknown"}.pdf`);

    document.body.removeChild(wrapper);
  };

  const handleCancelClick = () => {
    if (isCancelledOrReturned) {
      toast.info(`Receipt is already ${student.status.toLowerCase()}.`);
      return;
    }
    setShowModal(true);
  };

  if (!formData) {
    return (
      <div className="container my-4" style={{ maxWidth: '800px' }}>
        <h4 className="text-primary"><strong>Concession Form</strong></h4>
        <p>No concession data found. Please submit a concession form first.</p>
      </div>
    );
  }

  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <strong>Concession Form</strong>
        </h4>
        <div>
          <button
            onClick={handleCancelClick}
            className="btn btn-outline-danger me-2"
            style={{ borderRadius: "20px" }}
            disabled={isCancelledOrReturned}
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
        {['Cancelled', 'Cheque Return'].includes(student?.status) && (
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
              src={student.status === 'Cheque Return' ? "/assets/images/StatusReturned.png" : "/assets/images/StatusCancelled.png"}
              alt={student.status === 'Cheque Return' ? "Returned Watermark" : "Cancelled Watermark"}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        )}

        <div className="header-class" dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />

        <h3 className="text-center text-uppercase mb-3" style={{ color: "#0d6efd", zIndex: 1, position: "relative" }}>
          <strong>Concession Form</strong>
        </h3>

        <div className="row mb-3 text-black" style={{ zIndex: 1, position: "relative" }}>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>Receipt No:</span>
              <span>{receiptNumber || "N/A"}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>Student Name:</span>
              <span>{formData.firstName} {formData.middleName} {formData.lastName}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>Admission No:</span>
              <span>{formData.AdmissionNumber || "N/A"}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>Date:</span>
              <span>{new Date().toLocaleDateString('en-GB')}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>Academic Year:</span>
              <span>{formData.academicYear || "N/A"}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>Class/Section:</span>
              <span>{className}/{sectionName || "N/A"}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: "120px" }}>Concession Type:</span>
              <span>{formData.concessionType || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="table-responsive mb-3" style={{ zIndex: 1, position: "relative" }}>
          <table className="table table-bordered text-nowrap" style={{ fontSize: "12px" }}>
            <thead className="table-primary">
              <tr>
                <th className="text-center">Installment</th>
                <th className="text-center">Fees Type</th>
                <th className="text-center">Total Fees (₹)</th>
                <th className="text-center">Concession %</th>
                <th className="text-center">Concession Amt. (₹)</th>
                <th className="text-center">Balance Payable (₹)</th>
              </tr>
            </thead>
            <tbody>
              {formData.concessionDetails?.map((detail, index) => (
                <tr key={index}>
                  <td className="text-center">{detail.installmentName || "N/A"}</td>
                  <td className="text-center">
                    {detail.feesTypeName ||
                      (feeTypes?.find(ft => ft._id === detail.feesType)?.feesTypeName || detail.feesType || "N/A")}
                  </td>
                  <td className="text-center">{detail.totalFees || "0"}</td>
                  <td className="text-center">{detail.concessionPercentage || "0"}</td>
                  <td className="text-center text-danger">{detail.concessionAmount || "0"}</td>
                  <td className="text-center fw-bold">{detail.balancePayable || "0"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row mb-3 text-black">
          <div className="col-md-6">
                 {['Cancelled', 'Cheque Return'].includes(student?.status) && (
              <>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                    Cancel Reason:
                  </span>
                  <span>{student?.cancelReason || ""}</span>
                </div>
              </>
            )}
          </div>
          <div className="col-md-6">
            <div className="p-3 text-center" style={{ height: "100%" }}>
              <p className="mb-4">Authorized Signature</p>
              <div className="mt-4 pt-3" style={{ borderTop: "1px solid #dee2e6" }}>
                <p className="mb-0 fw-bold">{schoolData.school?.schoolName || "School Administrator"}</p>
                <p className="mb-0 small text-muted">Principal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-class text-center mt-4 pt-3" style={{ borderTop: '2px solid #0d6efd' }}>
          <p className="small text-muted mb-1">
            This is a computer generated document and does not require a physical signature.
          </p>
          <p className="small text-muted">
            For any queries, please contact {schoolData.school?.schoolEmail || "N/A"} or call {schoolData.school?.schoolMobileNo || "N/A"}
          </p>
        </div>
      </div>
      <CancelReceiptModal
        show={showModal}
        onClose={handleModalClose}
        student={formData}
        setIsCancelled={setIsCancelledOrReturned}
        fetchStudentStatus={fetchStudentStatus}
        Id={formId}
      />
    </div>
  );
};

export default FeesReceipt;