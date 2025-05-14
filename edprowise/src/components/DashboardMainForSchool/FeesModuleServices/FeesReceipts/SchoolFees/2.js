

import  { useEffect } from "react";

import { FaPrint, FaDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";

const FeesReceipt = () => {
   const receiptDetails = location.state;

  
  useEffect(() => {
    console.log("Section Name:", sectionName);
    console.log("Fee Type Name:", feeTypeName);
  }, []);

  const printReceipt = () => {
    window.print();
  };

  const downloadReceiptAsPDF = () => {
    const element = document.getElementById("receipt-content");
    const options = {
      filename: `fees_receipt_${student.receiptNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="container my-4" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-primary">
          <strong>Fees Receipt</strong>
        </h4>
        <div>
          <button 
            onClick={printReceipt} 
            className="btn btn-outline-primary me-2"
            style={{ borderRadius: '20px' }}
          >
            <FaPrint className="me-1" /> Print
          </button>
          <button 
            onClick={downloadReceiptAsPDF} 
            className="btn btn-primary"
            style={{ borderRadius: '20px' }}
          >
            <FaDownload className="me-1" /> Download PDF
          </button>
        </div>
      </div>

      <div 
        id="receipt-content" 
        className="border border-2 border-primary rounded-3 p-4 shadow-sm"
        style={{ backgroundColor: '#f8f9fa' }}
      >
   
        <div className="text-center mb-4">
          <h2 className="text-primary mb-1">ABC International School</h2>
          <p className="mb-1">123 Education Street, Knowledge City</p>
          <p>Phone: (123) 456-7890 | Email: info@abcschool.edu</p>
          <div className="d-flex justify-content-center">
            <div style={{ 
              borderTop: '2px solid #0d6efd', 
              width: '100px', 
              margin: '0 10px' 
            }}></div>
          </div>
        </div>


        <h3 className="text-center text-uppercase mb-4" style={{ color: '#0d6efd' }}>
          <strong>Official Fees Receipt</strong>
        </h3>

   
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Receipt No:</span>
              <span>{receiptDetails.receiptNumber}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Student Name:</span>
              <span>{receiptDetails.studentName}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Admission No:</span>
              <span>{receiptDetails.studentAdmissionNumber}</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Date:</span>
              <span>{receiptDetails.date}</span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Academic Year:</span>
              <span>
                {receiptDetails.academicYear}
              </span>
            </div>
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '120px' }}>Class/Section:</span>
              <span>{receiptDetails.className}/{receiptDetails.section}</span>
            </div>
          </div>
        </div>

   
        <div className="table-responsive mb-4">
              {receiptDetails.installments.map((installment, instIndex) => (
          <div key={instIndex} className="mb-4">
            <h6 className="mb-3">
              <strong>Installment {installment.number}</strong>
            </h6>
            <table className="table mb-4" style={{ border: "1px solid black", color: "black" }}>
              <thead>
                <tr>
                  <th className="text-center p-2" style={{ border: "1px solid black" }}>
                    Type of Fees
                  </th>
                  <th className="text-center p-2" style={{ border: "1px solid black" }}>
                    Fees Amt
                  </th>
                  <th className="text-center p-2" style={{ border: "1px solid black" }}>
                    Concession
                  </th>
                  <th className="text-center p-2" style={{ border: "1px solid black" }}>
                    Fine
                  </th>
                  <th className="text-center p-2" style={{ border: "1px solid black" }}>
                    Fees Payable
                  </th>
                  <th className="text-center p-2" style={{ border: "1px solid black" }}>
                    Fees Paid
                  </th>
                  <th className="text-center p-2" style={{ border: "1px solid black" }}>
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {installment.feeItems.map((item, itemIndex) => (
                  <tr key={itemIndex}>
                    <td className="text-center p-2" style={{ border: "1px solid black" }}>
                      {item.type}
                    </td>
                    <td className="text-center p-2" style={{ border: "1px solid black" }}>
                      {item.amount}
                    </td>
                    <td className="text-center p-2" style={{ border: "1px solid black" }}>
                      {item.concession}
                    </td>
                    <td className="text-center p-2" style={{ border: "1px solid black" }}>
                      {item.fineAmount}
                    </td>
                    <td className="text-center p-2" style={{ border: "1px solid black" }}>
                      {item.payable}
                    </td>
                    <td className="text-center p-2" style={{ border: "1px solid black" }}>
                      {item.paid}
                    </td>
                    <td className="text-center p-2" style={{ border: "1px solid black" }}>
                      {item.balance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        </div>

     
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="d-flex mb-2">
              <span className="fw-bold me-2" style={{ minWidth: '150px' }}>Payment Mode:</span>
              <span className="text-capitalize">{receiptDetails.paymentMode}</span>
            </div>
            {student.paymentMode.toLowerCase() === 'cheque' && (
              <>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: '150px' }}>Cheque No:</span>
                  <span>{student.chequeNumber}</span>
                </div>
                <div className="d-flex mb-2">
                  <span className="fw-bold me-2" style={{ minWidth: '150px' }}>Bank Name:</span>
                  <span>{student.bankName}</span>
                </div>
              </>
            )}
            {student.paymentMode.toLowerCase() === 'online' && (
              <div className="d-flex mb-2">
                <span className="fw-bold me-2" style={{ minWidth: '150px' }}>Transaction ID:</span>
                <span>{student.transactionNumber}</span>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <div className="border p-3 text-center" style={{ height: '100%' }}>
              <p className="mb-4">Authorized Signature</p>
              <div className="mt-4 pt-3" style={{ borderTop: '1px solid #dee2e6' }}>
                <p className="mb-0 fw-bold">{student.name || "School Administrator"}</p>
                <p className="mb-0 small text-muted">Receipt Collector</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 pt-3" style={{ borderTop: '2px solid #0d6efd' }}>
          <p className="small text-muted mb-1">
            This is a computer generated receipt and does not require a physical signature.
          </p>
          <p className="small text-muted">
            For any queries, please contact accounts@abcschool.edu or call +1234567890
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeesReceipt;
