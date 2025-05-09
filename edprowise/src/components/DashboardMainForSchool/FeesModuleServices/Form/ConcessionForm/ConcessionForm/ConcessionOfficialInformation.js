import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaPrint, FaDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";

const FeesReceipt = () => {
  const location = useLocation();
  const { formData, className, sectionName, feeTypes, receiptNumber } = location.state || {};


  if (!formData) {
    return (
      <div className="container my-4 text-dark" style={{ padding: 16 }}>
        <h6><strong>Concession Form</strong></h6>
        <p>No concession data found. Please submit a concession form first.</p>
      </div>
    );
  }

  const printReceipt = () => {
    window.print();
  };

  const downloadReceiptAsPDF = () => {
    const element = document.getElementById("receipt-content");
    const options = {
      filename: "concession_form.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="container my-4 text-dark" style={{ padding: 16 }}>
      <h6><strong>Concession Form</strong></h6>
      <div className="text-end mb-3">
        <button onClick={printReceipt} className="btn btn-light me-2">
          <FaPrint /> Print
        </button>
        <button onClick={downloadReceiptAsPDF} className="btn btn-light">
          <FaDownload /> Download PDF
        </button>
      </div>

      <div id="receipt-content" className="border border-dark p-3">
        <div className="text-center mb-3">
          <h6><strong>[From Letter Head]</strong></h6>
        </div>
        <h6 className="text-center bg-light py-1">
          <strong>Concession Form</strong>
        </h6>
        <div className="row mb-2">
          <div className="col-4">
            <p style={{ color: 'black' }}>
              <strong>Student Name :</strong> {formData.firstName} {formData.middleName} {formData.lastName}
            </p>
            <p style={{ color: 'black' }}>
              <strong>Admission No :</strong> {formData.AdmissionNumber}
            </p>
            <p style={{ color: 'black' }}>
              <strong>Receipt No :</strong> {receiptNumber}
            </p>
          </div>
          <div className="col-4">
          <p style={{ color: 'black' }}>&nbsp;</p>
            <p style={{ color: 'black' }}>
              <strong>Class :</strong> {className}
            </p>
            <p style={{ color: 'black' }}>
              <strong>Section :</strong> {sectionName}
            </p>
          </div>
          <div className="col-4">
            <p style={{ color: 'black' }}>
              <strong>Date :</strong> {new Date().toLocaleDateString('en-GB')}
            </p>
            <p style={{ color: 'black' }}>
              <strong>Academic Year :</strong> {formData.applicableAcademicYear}
            </p>
            <p style={{ color: 'black' }}>
              <strong>Concession Type :</strong> {formData.concessionType}
            </p>
          </div>
        </div>

        <div className="row pt-3 mb-2" style={{ borderTop: "2px solid black" }} />

        <div className="mb-4">
          <table className="table mb-4" style={{ border: "1px solid black", color: "black" }}>
            <thead>
              <tr>
                <th className="text-center p-2" style={{ border: "1px solid black" }}>
                  Installment
                </th>
                <th className="text-center p-2" style={{ border: "1px solid black" }}>
                  Fees Type
                </th>
                <th className="text-center p-2" style={{ border: "1px solid black" }}>
                  Total Fees
                </th>
                <th className="text-center p-2" style={{ border: "1px solid black" }}>
                  Concession %
                </th>
                <th className="text-center p-2" style={{ border: "1px solid black" }}>
                  Concession Amt.
                </th>
                <th className="text-center p-2" style={{ border: "1px solid black" }}>
                  Balance Payable
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.concessionDetails.map((detail, index) => (
                <tr key={index}>
                  <td className="text-center p-2" style={{ border: "1px solid black" }}>
                    {detail.installmentName}
                  </td>
                  <td className="text-center p-2" style={{ border: "1px solid black" }}>
                    {detail.feesTypeName ||
                      (feeTypes.find(ft => ft._id === detail.feesType)?.feesTypeName || detail.feesType)}
                  </td>
                  <td className="text-center p-2" style={{ border: "1px solid black" }}>
                    {detail.totalFees}
                  </td>
                  <td className="text-center p-2" style={{ border: "1px solid black" }}>
                    {detail.concessionPercentage}
                  </td>
                  <td className="text-center p-2" style={{ border: "1px solid black" }}>
                    {detail.concessionAmount}
                  </td>
                  <td className="text-center p-2" style={{ border: "1px solid black" }}>
                    {detail.balancePayable}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row justify-content-end text-dark mt-6">
          <div className="col-auto">
            <p style={{ color: 'black' }}>
              <strong>Signature of Principal</strong>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeesReceipt;