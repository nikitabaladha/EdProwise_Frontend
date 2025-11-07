import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { fetchSchoolData, generateHeader, generateFooter } from "../../../PdfUtlis";
import CancelReceiptModal from "../../../CancelReceiptModal";
import getAPI from "../../../../../../api/getAPI";

const RegistartionFeesReceipt = () => {
  const location = useLocation();
  const { receiptNumber, schoolId, studentId,className } = location.state || {};
  const [student, setStudent] = useState(null);
  const [schoolData, setSchoolData] = useState({ school: null, logoSrc: '' });
  const [isCancelledOrReturned, setIsCancelledOrReturned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const feeTypeName = "Registration Fee";
  const classId = student?.masterDefineClass || '';



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      console.log("Starting fetchData with:", { studentId, receiptNumber });

      if (!studentId || !receiptNumber) {
        setError("Missing studentId or receiptNumber.");
        toast.error("Missing studentId or receiptNumber.");
        setIsLoading(false);
        return;
      }

      try {
        const apiReceiptNumber = receiptNumber;
        const url = `/get-registration-data/${studentId}/${encodeURIComponent(apiReceiptNumber)}`;
        const response = await getAPI(url);
        if (response && !response.hasError) {
          setStudent(response.data.data);
          setIsCancelledOrReturned(
            ['Cancelled', 'Cheque Return'].includes(response.data.data?.status) ||
            response.data.data?.reportStatus?.some(status =>
              ['Refund', 'Cancelled', 'Cheque Return'].includes(status)
            )
          );
        } else {
          setError(response?.message || "Failed to fetch data.");
          toast.error(response?.message || "Failed to fetch data.");
        }
      } catch (error) {
        setError("Failed to fetch student data: " + error.message);
        toast.error("Failed to fetch student data: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [studentId, receiptNumber]);


 

  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        const data = await fetchSchoolData(schoolId);
        console.log("School Data:", data);
        setSchoolData(data);
      } catch (error) {
        console.error("School Data Error:", error);
        toast.error("Failed to fetch school data: " + error.message);
      }
    };

    if (schoolId) {
      loadSchoolData();
    } else {
      console.log("No schoolId provided for fetching school data.");
    }
  }, [schoolId]);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAction('');
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
    pdf.save(`fees_receipt_${student?.receiptNumber || "unknown"}.pdf`);

    document.body.removeChild(wrapper);
  };

  const handleActionSelect = (action) => {
    if (isCancelledOrReturned) {
      toast.info(`Receipt is already ${student?.status?.toLowerCase()}.`);
      return;
    }
    setSelectedAction(action);
    setShowModal(true);
  };


  if (isLoading) {
    return (
      <div className="container my-4 text-center">
        <h4>Loading receipt data...</h4>
      </div>
    );
  }


  if (error || !student) {
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
          <strong>Registration Fees Receipt</strong>
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
              disabled={student.paymentMode === 'null' || isCancelledOrReturned}
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
        style={{
          backgroundColor: "#ffffff",
          position: "relative",
          minHeight: "297mm",
        }}
      >
        <div className="header-class" dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }} />

        <h3 className="text-center text-uppercase mb-3" style={{ color: "#0d6efd", zIndex: 1, position: "relative" }}>
          <strong>Registration Fees Receipt</strong>
        </h3>

        <table className="table table-borderless text-black" style={{ zIndex: 1, position: "relative" }}>
          <tbody>
            <tr className="text-nowrap">
              <td className="fw-bold" style={{ minWidth: "120px" }}>Receipt No:</td>
              <td>{student.receiptNumber || ""}</td>
              <td className="fw-bold" style={{ minWidth: "120px" }}>Date:</td>
              <td>
                {student.paymentDate
                  ? new Date(student.paymentDate).toLocaleDateString("en-GB")
                  : ""}
              </td>
            </tr>
            <tr className="text-nowrap">
              <td className="fw-bold">Student Name:</td>
              <td>
                {student.firstName && student.lastName
                  ? `${student.firstName} ${student.lastName}`
                  : student.name || ""}
              </td>
              <td className="fw-bold">Academic Year:</td>
              <td>{student.academicYear || ""}</td>
            </tr>
            <tr className="text-nowrap">
              <td className="fw-bold">Registration No:</td>
              <td>{student.registrationNumber || ""}</td>
              <td className="fw-bold">Class:</td>
              <td>{className}</td>
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
                <td className="text-center">{feeTypeName}</td>
                <td className="text-center">{student.registrationFee?.toFixed(2) || "0.00"}</td>
                <td className="text-center">{student.concessionAmount?.toFixed(2) || "0.00"}</td>
                <td className="text-center fw-bold">{student.finalAmount?.toFixed(2) || "0.00"}</td>
              </tr>
              <tr className="table-active">
                <td colSpan="3" className="text-end fw-bold">
                  Total Paid:
                </td>
                <td className="text-center fw-bold">{student.finalAmount?.toFixed(2) || "0.00"}</td>
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
              <span className="text-capitalize">{student.paymentMode === 'null' ? '' : student.paymentMode || ""}</span>
            </div>
            {student.paymentMode !== "Cash" && (
              <div className="d-flex mb-2">
                <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                  Transaction/Cheque No:
                </span>
                <span>
                  {student.chequeNumber
                    ? student.chequeNumber
                    : student.transactionNumber || ""}
                </span>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <div className="p-3 text-center" style={{ height: "100%" }}>
              <p className="mb-4">Authorized Signature</p>
              <div className="mt-4 pt-3" style={{ borderTop: "1px solid #dee2e6" }}>
                <p className="mb-0 fw-bold">
                  {schoolData.school?.schoolName || "School SB"}
                </p>
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
        feeTypeName={feeTypeName}
        classId={classId}
        schoolId={schoolId}
        setIsCancelled={setIsCancelledOrReturned}
        action={selectedAction}
        transactionNumber={student.transactionNumber}
         easebuzzId={student.easebuzzId}
        hash={student.hash} 
      />
    </div>
  );
};

export default RegistartionFeesReceipt;