import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import getAPI from "../../../../../api/getAPI";
import { fetchSchoolData, generateHeader, generateFooter } from "../../PdfUtlis";

const RefundReceipt = () => {
  const location = useLocation();
  const { crnNumber } = location.state || {};
  const [schoolData, setSchoolData] = useState({ school: null, logoSrc: "" });
  const [refundData, setRefundData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;


    const loadSchoolAndRefundData = async () => {
      try {
        setLoading(true);


        const schoolInfo = await fetchSchoolData(schoolId);
        setSchoolData(schoolInfo);

        if (crnNumber && schoolId) {
          const response = await getAPI(`/get-all-crn-no/${schoolId}/${crnNumber}`);
          console.log("API Response:", response);


          const refundPayload = response.data?.data;

          if (!response.hasError && refundPayload?.refunds?.length > 0) {
            console.log("Setting refundData:", refundPayload);
            setRefundData(refundPayload);
          } else {
            console.log("No refund data condition triggered:", response);
            toast.error(response.message || `No refund data found for CRN: ${crnNumber}`);
            setRefundData(null);
          }
        } else {
          toast.error("Missing required parameters: schoolId or CRN number.");
          setRefundData(null);
        }
      } catch (error) {
        toast.error("Error fetching data. Please try again.");
        console.error("Error in loadSchoolAndRefundData:", error);
        setRefundData(null);
      } finally {
        setLoading(false);
      }
    };

    if (schoolId && crnNumber) {
      loadSchoolAndRefundData();
    } else {
      setLoading(false);
      toast.error("Invalid school ID or CRN number.");
    }
  }, [crnNumber]);

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
      Array.from(images).map(
        (img) =>
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
    pdf.save(`refund_receipt_${refundData?.refunds[0]?.receiptNumber || "unknown"}.pdf`);

    document.body.removeChild(wrapper);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!refundData || !refundData.refunds || refundData.refunds.length === 0) {
    return <div>No refund data found for CRN: {crnNumber}</div>;
  }

  const refund = refundData.refunds[0];
  const className = refundData.classDetails?.className || "";
  const sectionName =
    refundData.classDetails?.sections?.length > 0
      ? refundData.classDetails.sections[0].name
      : "";


  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <strong>Refund Receipt</strong>
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
        {["Cancelled", "Cheque Return"].includes(refund.status) && (
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
              src={
                refund.status === "Cheque Return"
                  ? "/assets/images/StatusReturned.png"
                  : "/assets/images/StatusCancelled.png"
              }
              alt={refund.status === "Cheque Return" ? "Returned Watermark" : "Cancelled Watermark"}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        )}

        <div
          className="header-class"
          dangerouslySetInnerHTML={{ __html: generateHeader(schoolData.school, schoolData.logoSrc) }}
        />

        <h3 className="text-center text-uppercase mb-3" style={{ color: "#0d6efd" }}>
          <strong>CRN Receipt</strong>
        </h3>

        <table className="table table-borderless text-black" style={{ zIndex: 1, position: "relative" }}>
          <tbody>
            <tr className="text-nowrap">
              <td className="fw-bold" style={{ minWidth: "120px" }}>
                Receipt No:
              </td>
              <td>{refund?.receiptNumber || "N/A"}</td>
              <td className="fw-bold" style={{ minWidth: "120px" }}>
                Date:
              </td>
              <td>
                {refund?.refundDate
                  ? new Date(refund.refundDate).toLocaleDateString("en-GB")
                  : refund?.cancelledDate
                    ? new Date(refund.cancelledDate).toLocaleDateString("en-GB")
                    : "N/A"}
              </td>
            </tr>
            <tr className="text-nowrap">
              <td className="fw-bold">Student Name:</td>
              <td>
                {refund?.firstName && refund?.lastName
                  ? `${refund.firstName} ${refund.lastName}`
                  : "N/A"}
              </td>
              <td className="fw-bold">Academic Year:</td>
              <td>{refund?.academicYear || "N/A"}</td>
            </tr>
            <tr className="text-nowrap">
              <td className="fw-bold">
                {refund.refundType === "Registration Fees" ? "Registration No:" : "Admission No:"}
              </td>
              <td>
                {refund.refundType === "Registration Fees"
                  ? refund?.registrationNumber || "N/A"
                  : refund?.admissionNumber || "N/A"}
              </td>
              <td className="fw-bold">Class/Section:</td>
              <td>{className && sectionName ? `${className}/${sectionName}` : className || "N/A"}</td>
            </tr>
          </tbody>
        </table>

        {/* <div className="table-responsive mb-4" style={{ zIndex: 1, position: "relative" }}>
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th className="text-center">Type</th>
                <th className="text-center">Paid Amount (₹)</th>
                <th className="text-center">
                  {refund.status === "Refund" ? "Refund Amount (₹)" : "Total Refund (₹)"}
                </th>
                <th className="text-center">Balance Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{refund.refundType || "N/A"}</td>
                <td className="text-center">{refund.paidAmount?.toFixed(2) || "0.00"}</td>
                <td className="text-center">
                  {refund.status === "Refund" ? refund.refundAmount?.toFixed(2) : refund.totalRefundAmount?.toFixed(2) || "0.00"}
                </td>
                <td className="text-center">{refund.balance?.toFixed(2) || "0.00"}</td>
              </tr>
              <tr className="table-active">
                <td colSpan="3" className="text-end fw-bold">
                  Total
                </td>
                <td className="text-center fw-bold">
                  {refund.status === "Refund" ? refundData.totalRefundAmount?.toFixed(2) : refund.cancelledAmount?.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}

        <div className="table-responsive mb-4" style={{ zIndex: 1, position: "relative" }}>
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th className="text-center">Type</th>
                <th className="text-center">Paid Amount (₹)</th>
                <th className="text-center">
                  {refund.status === "Refund" ? "Refund Amount (₹)" : "Total Refund (₹)"}
                </th>
                <th className="text-center">Balance Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {refund.refundType === "School Fees" ? (
                <tr>
                  <td className="text-center">School Fees</td>
                  <td className="text-center">
                    {refundData.feeTypeRefunds
                      ? refundData.feeTypeRefunds
                        .reduce((sum, feeType) => sum + (feeType.paidAmount || 0), 0)
                        .toFixed(2)
                      : refund.paidAmount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="text-center">
                    {refund.status === "Refund"
                      ? refundData.feeTypeRefunds
                        ? refundData.feeTypeRefunds
                          .reduce((sum, feeType) => sum + (feeType.refundAmount || 0), 0)
                          .toFixed(2)
                        : refund.refundAmount?.toFixed(2) || "0.00"
                      : refundData.feeTypeRefunds
                        ? refundData.feeTypeRefunds
                          .reduce((sum, feeType) => sum + (feeType.cancelledAmount || 0), 0)
                          .toFixed(2)
                        : refund.totalRefundAmount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="text-center">
                    {refundData.feeTypeRefunds
                      ? refundData.feeTypeRefunds
                        .reduce((sum, feeType) => sum + (feeType.balance || 0), 0)
                        .toFixed(2)
                      : refund.balance?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td className="text-center">{refund.refundType || "N/A"}</td>
                  <td className="text-center">{refund.paidAmount?.toFixed(2) || "0.00"}</td>
                  <td className="text-center">
                    {refund.status === "Refund"
                      ? refund.refundAmount?.toFixed(2) || "0.00"
                      : refund.totalRefundAmount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="text-center">{refund.balance?.toFixed(2) || "0.00"}</td>
                </tr>
              )}
              <tr className="table-active">
                <td colSpan="3" className="text-end fw-bold">
                  Total
                </td>
                <td className="text-center fw-bold">
                  {refund.status === "Refund"
                    ? refundData.totalRefundAmount?.toFixed(2) || "0.00"
                    : refund.refundType === "School Fees"
                      ? refundData.feeTypeRefunds
                        ? refundData.feeTypeRefunds
                          .reduce((sum, feeType) => sum + (feeType.cancelledAmount || 0), 0)
                          .toFixed(2)
                        : refund.cancelledAmount?.toFixed(2) || "0.00"
                      : refund.cancelledAmount?.toFixed(2) || "0.00"}
                </td>
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
              <span className="text-capitalize">{refund?.paymentMode || "N/A"}</span>
            </div>
            {refund?.paymentMode?.toLowerCase() === "cheque" && (
              <>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                    Cheque No:
                  </span>
                  <span>{refund?.chequeNumber || "N/A"}</span>
                </div>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                    Bank Name:
                  </span>
                  <span>{refund?.bankName || "N/A"}</span>
                </div>
              </>
            )}
            {refund?.paymentMode?.toLowerCase() === "online" && (
              <div className="d-flex mb-2">
                <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                  Transaction ID:
                </span>
                <span>{refund?.transactionNumber || "N/A"}</span>
              </div>
            )}
            {["Cancelled", "Cheque Return"].includes(refund?.status) && (
              <>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                    {refund.status === "Cheque Return" ? "Cheque Return Reason:" : "Cancel Reason:"}
                  </span>
                  <span>
                    {refund.status === "Cheque Return"
                      ? refund?.chequeSpecificReason || "N/A"
                      : refund?.cancelReason || "N/A"}
                  </span>
                </div>
                {refund?.additionalComment && (
                  <div className="d-flex mb-2">
                    <span className="fw-bold me-2" style={{ minWidth: "150px" }}>
                      Additional Comment:
                    </span>
                    <span>{refund?.additionalComment || "N/A"}</span>
                  </div>
                )}
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
          }}
          dangerouslySetInnerHTML={{ __html: generateFooter(schoolData.school) }}
        />
      </div>
    </div>
  );
};

export default RefundReceipt;