import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import "./Test.css";

const Invoice = () => {
  const [products] = useState([
    {
      id: 1,
      slNo: 1,
      description: "School Bench",
      hsnSaac: "654321",
      listingRate: "100000",
      edProwiseMargin: "12",
      qty: "100",
      finalRateBeforeDiscount: "1125",
      discountPercentage: "15",
      finalRate: "956",
      taxableValue: "95625",
      cgstRate: "6",
      cgstAmount: "5976",
      sgstRate: "625",
      sgstAmount: "5976",
      igstRate: "12",
      igstAmount: "11953",
      amountBeforeGSTAndDiscount: "112500",
      discountAmount: "16875",
      gstAmount: "11953",
      totalAmount: "124382",
      productImages: "images/product1.jpg",
    },
    // Add more products as needed
  ]);
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div>
      <div
        ref={pdfRef}
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
          lineHeight: "1.5",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Tax Invoice
        </div>
        {/* <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <strong>Supplier</strong>
              </div>
              <div className="col-md-12">Name:</div>
              <div className="col-md-12">Address</div>
              <div className="row">
                <div className="col-md-6">City:</div>
                <div className="col-md-6">State:</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">GSTIN:</div>
              <div className="col-md-12">PAN:</div>
              <div className="col-md-12">Contact No:</div>
              <div className="col-md-12">Email ID:</div>
            </div>
          </div>
        </div> */}

        <div className="invoice-container">
          <div className="row supplier-section">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <strong>Supplier</strong>
                </div>
                <div className="col-md-12">Name:</div>
                <div className="col-md-12">Address:</div>
                <div className="row">
                  <div className="col-md-6">City:</div>
                  <div className="col-md-6">State:</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">GSTIN:</div>
                <div className="col-md-12">PAN:</div>
                <div className="col-md-12">Contact No:</div>
                <div className="col-md-12">Email ID:</div>
              </div>
            </div>
          </div>
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <strong>Supplier</strong>
                <br /> Name:
                <br /> Address:
                <br /> City:
                <br /> Contact No:
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <strong>GSTIN:</strong>
                <br /> PAN:
                <br /> Contact No.:
                <br /> Email ID:
              </td>
            </tr>

            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <strong>Consignee</strong>
                <br /> Name:EdProwise Tech Pvt. Ltd
                <br /> Address:
                <br /> City:
                <br /> State:
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <strong>GSTIN:</strong>
                <br /> PAN:
                <br /> Contact No.:
                <br /> Email ID:
              </td>
            </tr>
          </tbody>
        </table>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>S.L.</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Description
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Qty</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rate</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Taxable Value
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                GST Amt
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.slNo}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.description}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.qty}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.rate}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.taxableValue}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.gstAmt}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.totalAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <strong>Amount in Words:</strong> {products.amountInWords || "N/A"}
        </div>
      </div>
      <button
        onClick={downloadPDF}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default Invoice;
