import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { format } from "date-fns";

import convertToWords from "../CommonFunction";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const InvoiceForEdProwise = () => {
  const location = useLocation();
  const { prepareQuoteData, quoteProposalData, profileData } =
    location.state || {};

  // Extract total values from profileData
  const {
    buyerName,
    schoolContactNumber,
    schoolPanNumber,
    schoolDeliveryAddress,
    schoolDeliveryLocation,
    quoteRequestedDate,
    enquiryNumber,
    quoteNumber,
    quoteProposalDate,
    paymentTerms,
    advanceRequiredAmount,
    expectedDeliveryDate,

    sellerCompanyName,
    sellerAddress,
    sellerLandmark,
    sellerCityStateCountry,
    sellerGstin,
    sellerPanNumber,
    sellerContactNumber,
    sellerEmailId,

    edprowiseCompanyName,
    edprowiseCompanyType,
    edprowiseGstin,
    edprowisePan,
    edprowiseTan,
    edprowiseCin,
    edprowiseAddress,
    edprowiseCityStateCountry,
    edprowisePincode,
    edprowiseContactNo,
    edprowiseAlternateContactNo,
    edprowiseEmailId,

    invoiceDate,
    invoiceForSchool,
    invoiceForEdprowise,
  } = profileData || {};

  // Extract total values from quoteProposalData
  const {
    totalQuantity,
    totalFinalRateBeforeDiscount,
    totalAmountBeforeGstAndDiscount,
    totalDiscountAmount,
    totalGstAmount,
    totalTaxAmountForEdprowise,
    totalAmountForEdprowise,
    totalTaxableValue,
    totalTaxableValueForEdprowise,
    totalCgstAmount,
    totalSgstAmount,
    totalIgstAmount,
    totalTaxAmount,
    totalFinalRateForEdprowise,
    totalCgstAmountForEdprowise,

    totalSgstAmountForEdprowise,
    totalIgstAmountForEdprowise,
  } = quoteProposalData || {};

  const pdfRef = useRef();

  const downloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = 300;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Invoice.pdf");
  };

  return (
    <div className="m-2" style={{ color: "black" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={downloadPDF}
          className="btn btn-danger btn-sm"
          title="Download PDF"
          data-bs-toggle="popover"
          data-bs-trigger="hover"
        >
          Download PDF
        </button>
      </div>

      <div
        ref={pdfRef}
        style={{
          width: "max-content",
          height: "max-content",
          padding: "50px",
          fontFamily: "Arial, sans-serif",
          fontSize: "15px",
          lineHeight: "1.5",
        }}
      >
        <table
          style={{
            border: "1px solid black",
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
                <td
                  style={{
                    width: "33%",
                  }}
                >
                  <div className="mt-3">
                    <img
                      src="/assets/website-images/EdProwise New Logo-1.png"
                      alt="EdProwise Logo"
                      style={{ width: "200px", height: "auto" }}
                    />
                  </div>
                </td>
                <td
                  style={{
                    width: "33%",
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
                    width: "33%",
                    textAlign: "right",
                    fontWeight: "bold",
                    fontSize: "15px",
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
                    borderTop: "1px solid black",
                    borderRight: "1px solid black",
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
                    borderTop: "1px solid black",
                    borderBottom: "none",
                    padding: "8px",
                    textAlign: "left",
                    width: "40%",
                    fontWeight: "normal",
                  }}
                >
                  GSTIN : {sellerGstin}
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
                  Name : {sellerCompanyName}
                </td>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderLeft: "1px solid black",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  PAN : {sellerPanNumber}
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
                  Address : {sellerAddress}
                </td>

                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderLeft: "1px solid black",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  Contact No.: {sellerContactNumber}
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
                  City: {sellerCityStateCountry?.split(",")[0]}
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                    width: "30%",
                  }}
                >
                  State: {sellerCityStateCountry?.split(",")[1]}
                </td>
                <td
                  style={{
                    borderRight: "none",
                    borderTop: "none",
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: " 1px solid black",
                  }}
                >
                  Email ID : {sellerEmailId}
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
                    borderTop: "1px solid black",
                    borderRight: "1px solid black",
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
                    width: "40%",
                    fontWeight: "normal",
                  }}
                >
                  Invoice No. : {invoiceForEdprowise}
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
                  Name: {edprowiseCompanyName}
                </td>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderLeft: "1px solid black",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  Invoice Date : {formatDate(invoiceDate)}
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
                  Address : {edprowiseAddress}{" "}
                </td>

                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderLeft: "1px solid black",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  Payment Terms : {paymentTerms}
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
                  City : {edprowiseCityStateCountry?.split(",")[0]}
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                    width: "30%",
                  }}
                >
                  State: {edprowiseCityStateCountry?.split(",")[1]}
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
                    width: "30%",
                    border: "none",
                  }}
                >
                  Contact No : {edprowiseContactNo}
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                    width: "30%",
                  }}
                >
                  Email ID : {edprowiseEmailId}
                </td>
                <td
                  style={{
                    borderRight: "none",
                    borderTop: "none",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  GSTIN : {edprowiseGstin}
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
                    borderRight: "1px solid black",
                    borderBottom: "none",
                    padding: "8px",
                    textAlign: "left",
                    width: "60%",
                  }}
                  colSpan="2"
                >
                  Buyer
                </th>
                <td
                  style={{
                    padding: "8px",
                    width: "20%",
                  }}
                >
                  PAN : {edprowisePan}
                </td>
                <td
                  style={{
                    border: "none",
                    padding: "8px",
                    width: "20%",
                  }}
                ></td>
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
                  Name: {edprowiseCompanyName}
                </td>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderLeft: "1px solid black",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  All Amount are in INR
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    borderRight: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                  }}
                  colSpan="2"
                >
                  Address : {edprowiseAddress}
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
                  City : {edprowiseCityStateCountry?.split(",")[0]}
                </td>
                <td
                  style={{
                    borderRight: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  State : {edprowiseCityStateCountry?.split(",")[1]}
                </td>
              </tr>
            </tbody>
          </table>
          {/* calculations */}
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
                    borderTop: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Sr.
                </th>
                <th
                  style={{
                    width: "45%",
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Sub Category Name
                </th>
                <th
                  style={{
                    width: "10%",
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    width: "10%",
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Rate
                </th>
                <th
                  style={{
                    width: "10%",
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Taxable Value
                </th>

                <th
                  style={{
                    width: "10%",
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  GST Amt
                </th>
                <th
                  style={{
                    width: "10%",
                    borderTop: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {prepareQuoteData?.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      width: "5%",
                      borderTop: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      width: "45%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.subcategoryName}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.finalRateForEdprowise}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.taxableValueForEdprowise}
                  </td>

                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.gstAmountForEdprowise}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      borderTop: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.totalAmountForEdprowise}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "8px",
                  }}
                ></td>
                <td
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Total
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  {totalQuantity}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  {totalTaxableValueForEdprowise}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  {totalTaxAmountForEdprowise}
                </td>
                <td
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "8px",
                  }}
                >
                  {totalAmountForEdprowise}
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
              <h5>
                <strong>
                  Amount In Words : {convertToWords(totalAmountForEdprowise)}
                </strong>
              </h5>
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
                  colSpan="2"
                ></th>
                <th
                  style={{
                    width: "20%",
                    border: "1px solid black",
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
                    border: "1px solid black",
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
                    border: "1px solid black",
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
                    borderTop: "1px solid black",
                    padding: "8px",
                  }}
                >
                  HSN/SAAC
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Taxable Value
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Rate
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Amt
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Rate
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Amt
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Rate
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Amt
                </th>
                <th
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Total Tax Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {prepareQuoteData?.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      width: "30%",
                      borderTop: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.hsnSacc}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.taxableValueForEdprowise}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.cgstRate}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.cgstAmountForEdprowise}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.sgstRate}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.sgstAmountForEdprowise}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.igstRate}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {item.igstAmountForEdprowise}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "8px",
                    width: "10%",
                    fontWeight: "bold",
                  }}
                >
                  Total
                </td>

                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    width: "10%",
                  }}
                >
                  {totalTaxableValueForEdprowise}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    width: "10%",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    width: "10%",
                  }}
                >
                  {totalCgstAmountForEdprowise}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    width: "10%",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    width: "10%",
                  }}
                >
                  {totalSgstAmountForEdprowise}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    width: "10%",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    width: "10%",
                  }}
                >
                  {totalIgstAmountForEdprowise}
                </td>
                <td
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "8px",
                    width: "5%",
                  }}
                >
                  {totalTaxAmountForEdprowise}
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style={{
              width: "100%",
              marginBottom: "60px",
            }}
          >
            <div style={{ height: "120px" }} className="row p-2">
              <div style={{ marginBottom: "90px" }}>
                <h5 className="text-end">
                  <strong>For EdProwise Tech Pvt. Ltd</strong>
                </h5>
              </div>
              <div>
                <h5 className="text-end">
                  <strong>Authorised Signatory</strong>
                </h5>
              </div>
            </div>
          </table>
        </table>
      </div>
    </div>
  );
};

export default InvoiceForEdProwise;
