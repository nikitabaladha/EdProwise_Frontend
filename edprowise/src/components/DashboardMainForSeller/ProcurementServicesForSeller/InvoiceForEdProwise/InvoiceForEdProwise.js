import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

const InvoiceForEdProwise = () => {
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

  const taxData = [
    {
      hsn: "1234",
      taxableValue: 5000,
      cgstRate: 9,
      cgstAmount: 450,
      sgstRate: 9,
      sgstAmount: 450,
      igstRate: 18,
      igstAmount: 0,
      totalTaxAmount: 900,
    },
    {
      hsn: "5678",
      taxableValue: 10000,
      cgstRate: 9,
      cgstAmount: 900,
      sgstRate: 9,
      sgstAmount: 900,
      igstRate: 18,
      igstAmount: 0,
      totalTaxAmount: 1800,
    },
    {
      hsn: "9101",
      taxableValue: 8000,
      cgstRate: 9,
      cgstAmount: 720,
      sgstRate: 9,
      sgstAmount: 720,
      igstRate: 18,
      igstAmount: 0,
      totalTaxAmount: 1440,
    },
  ];

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
    <div className="m-2">
      <div
        ref={pdfRef}
        style={{
          padding: "50px",
          fontFamily: "Arial, sans-serif",
          fontSize: "15px",
          lineHeight: "1.5",
        }}
      >
        <table
          style={{
            border: "1px solid #ddd",
            width: "100%",
          }}
        >
          <table
            style={{
              width: "100%",
              marginBottom: "20px",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr>
                {/* Tax Invoice Column */}
                <td
                  style={{
                    width: "60%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                    border: "none",
                  }}
                >
                  Tax Invoice
                </td>

                {/* (Original for Recipient) Column */}
                <td
                  style={{
                    width: "40%",
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "20px",
                    border: "none",
                  }}
                >
                  (Original for Recipient)
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
              margin: "0",
              padding: "0",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderLeft: "none",
                    borderTop: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    borderBottom: "none",
                    padding: "8px",
                    textAlign: "left",
                    width: "60%",
                  }}
                  colSpan="2"
                >
                  <strong>Supplier</strong>
                </th>
                <th
                  style={{
                    borderTop: "1px solid #ddd",
                    borderBottom: "none",
                    padding: "8px",
                    textAlign: "left",
                    width: "40%",
                    fontWeight: "normal",
                  }}
                >
                  GSTIN
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    borderTop: "none",
                    borderBottom: "none",

                    padding: "8px",
                    textAlign: "left",
                  }}
                  colSpan="2"
                >
                  Name:
                </td>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderLeft: "1px solid #ddd",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  PAN:
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "none",
                    padding: "8px",
                    textAlign: "left",
                  }}
                  colSpan="2"
                >
                  Address:
                </td>

                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderLeft: "1px solid #ddd",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  Contact No.:
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    width: "30%",
                    border: "none",
                  }}
                >
                  City:
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    borderBottom: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    padding: "8px",
                    textAlign: "left",
                    width: "30%",
                  }}
                >
                  State:
                </td>
                <td
                  style={{
                    borderRight: "none",
                    borderTop: "none",
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: " 1px solid #ddd",
                  }}
                >
                  Email ID:
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
              margin: "0",
              padding: "0",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderLeft: "none",
                    borderTop: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    borderBottom: "none",
                    padding: "8px",
                    textAlign: "left",
                    width: "60%",
                  }}
                  colSpan="2"
                >
                  <strong>Consignee</strong>
                </th>
                <th
                  style={{
                    borderBottom: "none",
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "normal",
                  }}
                >
                  Invoice No.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    borderTop: "none",
                    borderBottom: "none",

                    padding: "8px",
                    textAlign: "left",
                  }}
                  colSpan="2"
                >
                  Name: EdProwise Tech Pvt. Ltd
                </td>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderLeft: "1px solid #ddd",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  Invoice Date :
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                  }}
                  colSpan="2"
                >
                  Address:
                </td>

                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderLeft: "1px solid #ddd",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  Payment Terms :
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    width: "30%",
                    border: "none",
                  }}
                >
                  City:
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    borderBottom: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  State:
                </td>
                <td
                  style={{
                    borderRight: "none",
                    borderTop: "none",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Advance Amount Received :
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    border: "none",
                  }}
                >
                  Contact No:
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    borderBottom: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Email ID:
                </td>
                <td
                  style={{
                    padding: "8px",
                    border: "none",
                    width: "20%",
                  }}
                >
                  GSTIN :
                </td>
                <td
                  style={{
                    border: "none",
                    padding: "8px",
                    width: "20%",
                  }}
                >
                  Buyer GSTIN
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
              margin: "0",
              padding: "0",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    borderLeft: "none",
                    borderTop: "none",
                    borderRight: "1px solid #ddd",
                    borderBottom: "none",
                    padding: "8px",
                    textAlign: "left",
                    width: "60%",
                  }}
                  colSpan="2"
                >
                  Buyer:
                </th>
                <td
                  style={{
                    padding: "8px",
                    width: "20%",
                  }}
                >
                  PAN
                </td>
                <td
                  style={{
                    border: "none",
                    padding: "8px",
                    width: "20%",
                  }}
                >
                  Buyer PAN
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    borderTop: "none",
                    borderBottom: "none",

                    padding: "8px",
                    textAlign: "left",
                  }}
                  colSpan="2"
                >
                  Name: EdProwise Tech Pvt. Ltd
                </td>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderLeft: "1px solid #ddd",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  All Amount are in INR :
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                  colSpan="2"
                >
                  Address:
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    width: "30%",
                    border: "none",
                  }}
                >
                  City:
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    borderBottom: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  State:
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width: "5%",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  S.L.
                </th>
                <th
                  style={{
                    width: "50%",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    width: "10%",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    width: "10%",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Rate
                </th>
                <th
                  style={{
                    width: "10%",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Taxable Value
                </th>
                <th
                  style={{
                    width: "10%",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  GST Amt
                </th>
                <th
                  style={{
                    width: "5%",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      width: "5%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.slNo}
                  </td>
                  <td
                    style={{
                      width: "50%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.description}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.qty}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.listingRate}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.taxableValue}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.gstAmount}
                  </td>
                  <td
                    style={{
                      width: "5%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.totalAmount}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                ></td>
                <td
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Total
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {/* Calculate total taxable value */}
                  {products.reduce((sum, item) => sum + item.taxableValue, 0)}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {products.reduce((sum, item) => sum + item.gstAmount, 0)}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {products.reduce((sum, item) => sum + item.totalAmount, 0)}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {products.reduce((sum, item) => sum + item.totalAmount, 0)}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {products.reduce((sum, item) => sum + item.totalAmount, 0)}
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style={{
              borderBottom: "none",
              width: "100%",
              textAlign: "left",
            }}
          >
            <div className="row p-2">
              <p>
                <strong>Amount In Words :</strong>
              </p>
            </div>
          </table>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "none",
                    padding: "8px",
                  }}
                  colspan="2"
                ></th>
                <th
                  style={{
                    width: "20%",
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  CGST
                </th>
                <th
                  style={{
                    width: "20%",
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  SGST
                </th>
                <th
                  style={{
                    width: "20%",
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                  colSpan="2"
                >
                  IGST
                </th>
                <th
                  style={{
                    width: "5%",
                    border: "none",
                    padding: "8px",
                  }}
                ></th>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  HSN/SAAC
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Taxable Value
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Rate
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Amt
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Rate
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Amt
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Rate
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Amt
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Total Tax Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {taxData.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      width: "25%",
                    }}
                  >
                    {item.hsn}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      width: "10%",
                    }}
                  >
                    {item.taxableValue}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      width: "10%",
                    }}
                  >
                    {item.cgstRate}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      width: "10%",
                    }}
                  >
                    {item.cgstAmount}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      width: "10%",
                    }}
                  >
                    {item.sgstRate}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      width: "10%",
                    }}
                  >
                    {item.sgstAmount}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      width: "10%",
                    }}
                  >
                    {item.igstRate}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      width: "10%",
                    }}
                  >
                    {item.igstAmount}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      width: "5%",
                    }}
                  >
                    {item.totalTaxAmount}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  <strong>Total</strong>
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                ></td>

                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                ></td>
              </tr>
            </tbody>
          </table>
          <table
            style={{
              width: "100%",
              marginBottom: "60px",
            }}
          >
            <div style={{ height: "100px" }} className="row p-2">
              <div style={{ marginBottom: "80px" }}>
                <p className="text-end">
                  <strong>For EdProwise Tech Pvt. Ltd</strong>
                </p>
              </div>
              <div>
                <p className="text-end">
                  <strong>Authorised Signatory</strong>
                </p>
              </div>
            </div>
          </table>
        </table>
      </div>
      <button
        onClick={downloadPDF}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default InvoiceForEdProwise;
