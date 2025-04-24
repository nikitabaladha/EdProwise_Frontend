import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";

const FeesReceipt = () => {
  const location = useLocation();
  const receiptDetails = location.state;
  useEffect(() => {}, [receiptDetails]);

  if (!receiptDetails) {
    return (
      <div className="container my-4 text-dark">No receipt data found</div>
    );
  }

  const printReceipt = () => {
    window.print();
  };

  const downloadReceiptAsPDF = () => {
    const element = document.getElementById("receipt-content");

    const options = {
      filename: "fees_receipt.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="container my-4 text-dark" style={{ padding: 16 }}>
      <h6>
        <strong>Fees Receipts</strong>
      </h6>
      <div className="text-end mb-3">
        {/* Add print and download icons */}
        <button onClick={printReceipt} className="btn btn-light me-2">
          <FaPrint /> Print
        </button>
        <button onClick={downloadReceiptAsPDF} className="btn btn-light">
          <FaDownload /> Download PDF
        </button>
      </div>

      <div id="receipt-content" className="border border-dark p-3">
        <div className="text-center mb-3">
          <h6>
            <strong>[From Letter Head]</strong>
          </h6>
        </div>
        <h6 className="text-center bg-light py-1">
          <strong>FEES RECEIPTS</strong>
        </h6>
        <div className="row mb-2">
          <div className="col-4">
            <p style={{ color: "black" }}>
              <strong>Receipts No :</strong> {receiptDetails.receiptNumber}
            </p>
            <p style={{ color: "black" }}>
              <strong>Student Name :</strong> {receiptDetails.studentName}
            </p>
            <p style={{ color: "black" }}>
              <strong>Admission No :</strong>{" "}
              {receiptDetails.studentAdmissionNumber}
            </p>
          </div>
          <div className="col-4">
            <p style={{ color: "black" }}>&nbsp;</p>
            <p style={{ color: "black" }}>
              <strong>Class :</strong> {receiptDetails.className}
            </p>
            <p style={{ color: "black" }}>
              <strong>Section :</strong> {receiptDetails.section}
            </p>
          </div>
          <div className="col-4">
            <p style={{ color: "black" }}>
              <strong>Date :</strong> {receiptDetails.date}
            </p>
            <p style={{ color: "black" }}>
              <strong>Academic Year :</strong> {receiptDetails.academicYear}
            </p>
            <p style={{ color: "black" }}>
              <strong>Installment :</strong>{" "}
              {receiptDetails.installments?.length}
            </p>
          </div>
        </div>

        <div
          className="row pt-3 mb-2"
          style={{ borderTop: "2px solid black" }}
        />

        {receiptDetails.installments.map((installment, instIndex) => (
          <div key={instIndex} className="mb-4">
            <h6 className="mb-3">
              <strong>Installment {installment.number}</strong>
            </h6>
            <table
              className="table mb-4"
              style={{ border: "1px solid black", color: "black" }}
            >
              <thead>
                <tr>
                  <th
                    className="text-center p-2"
                    style={{ border: "1px solid black" }}
                  >
                    Type of Fees
                  </th>
                  <th
                    className="text-center p-2"
                    style={{ border: "1px solid black" }}
                  >
                    Fees Amt
                  </th>
                  <th
                    className="text-center p-2"
                    style={{ border: "1px solid black" }}
                  >
                    Concession
                  </th>
                  <th
                    className="text-center p-2"
                    style={{ border: "1px solid black" }}
                  >
                    Fine
                  </th>
                  <th
                    className="text-center p-2"
                    style={{ border: "1px solid black" }}
                  >
                    Fees Payable
                  </th>
                  <th
                    className="text-center p-2"
                    style={{ border: "1px solid black" }}
                  >
                    Fees Paid
                  </th>
                  <th
                    className="text-center p-2"
                    style={{ border: "1px solid black" }}
                  >
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {installment.feeItems.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td
                      className="text-center p-2"
                      style={{ border: "1px solid black" }}
                    >
                      {item.type}
                    </td>
                    <td
                      className="text-center p-2"
                      style={{ border: "1px solid black" }}
                    >
                      {item.amount}
                    </td>
                    <td
                      className="text-center p-2"
                      style={{ border: "1px solid black" }}
                    >
                      {item.concession}
                    </td>
                    <td
                      className="text-center p-2"
                      style={{ border: "1px solid black" }}
                    >
                      {item.fineAmount}
                    </td>
                    <td
                      className="text-center p-2"
                      style={{ border: "1px solid black" }}
                    >
                      {item.payable}
                    </td>
                    <td
                      className="text-center p-2"
                      style={{ border: "1px solid black" }}
                    >
                      {item.paid}
                    </td>
                    <td
                      className="text-center p-2"
                      style={{ border: "1px solid black" }}
                    >
                      {item.balance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div className="row text-dark">
          <div className="col-6">
            <p style={{ color: "black" }}>
              <strong>Payment Mode:</strong> {receiptDetails.paymentMode}
            </p>
            <p style={{ color: "black" }}>
              <strong>Date of Payment:</strong> {receiptDetails.paymentDate}
            </p>
            <p style={{ color: "black" }}>
              <strong>Transaction No./Cheque No.:</strong>{" "}
              {receiptDetails.transactionNumber}
            </p>
          </div>
          <div className="col-4 text-end">
            <p style={{ color: "black" }}>
              <strong>Signature of Collector</strong>
            </p>
            <p style={{ color: "black" }}>
              <strong>Name:</strong> {receiptDetails.collectorName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesReceipt;
