import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import "./Invoice.css";

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
          <div
            className="row"
            style={{
              marginBottom: "20px",
            }}
          >
            <div className="col-md-9">
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Tax Invoice
              </div>
            </div>
            <div className="col-md-3">
              <div
                style={{
                  textAlign: "end",
                  // marginBottom: "20px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                (Original for Recepient)
              </div>
            </div>
          </div>

          <div className="row p-1 border">
            {/* Left Section */}
            <div className="col-md-8 border-end ">
              <div className="row g-0">
                <div className="col-md-12">
                  <strong>Supplier</strong>
                </div>
                <div className="col-md-12">Name:</div>
                <div className="col-md-12">Address:</div>
                <div className="col-md-6">City:</div>
                <div className="col-md-6">State:</div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-4">
              <div className="row g-0">
                <div className="col-md-12">GSTIN :</div>
                <div className="col-md-12">PAN :</div>
                <div className="col-md-12">Contact No :</div>
                <div className="col-md-12">Email ID :</div>
              </div>
            </div>
          </div>

          <div className="row p-1 border">
            {/* Left Section */}
            <div className="col-md-8 border-end">
              <div className="row g-0 pb-1">
                <div className="col-md-12">
                  <strong>Consignee</strong>
                </div>
                <div className="col-md-12">Name: EdProwise Tech Pvt. Ltd</div>
                <div className="col-md-12">Address :</div>
                <div className="col-md-6">City :</div>
                <div className="col-md-6">State :</div>
                <div className="col-md-6">Contact No. :</div>
                <div className="col-md-6">Email ID :</div>
              </div>
              <div className="row g-0">
                <div className="col-md-12">
                  <strong>Buyer:</strong>
                </div>
                <div className="col-md-12">Name : EdProwise Tech Pvt. Ltd</div>
                <div className="col-md-12">Address :</div>
                <div className="col-md-6">City :</div>
                <div className="col-md-6">State :</div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-4">
              <div className="row g-0">
                <div className="col-md-12">Invoice No. :</div>
                <div className="col-md-12">Invoice Date :</div>
                <div className="col-md-12">Payment Terms :</div>
                <div className="col-md-12">Advance Amount Received :</div>
                <div className="col-md-6">GSTIN :</div>
                <div className="col-md-6">Buyer GSTIN :</div>
                <div className="col-md-6">PAN :</div>
                <div className="col-md-6">Buyer PAN :</div>
                <div className="col-md-12">All Amount are in INR :</div>
              </div>
            </div>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
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
            </tbody>
          </table>

          <table
            style={{
              border: "1px solid #ddd",
              width: "100%",
            }}
          >
            <div className="row pt-2">
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
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #ddd",
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
                    border: "1px solid #ddd",
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
                    textAlign: "left",
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
              marginBottom: "20px",
            }}
          >
            <div style={{ height: "100px" }} className="row p-2">
              <div style={{ marginBottom: "20px" }}>
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

export default Invoice;
