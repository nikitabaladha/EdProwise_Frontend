import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { formatCost } from "../CommonFunction";
import convertToWords from "../CommonFunction.js";

import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const QuoteProposal = () => {
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
  } = profileData || {};

  // Extract total values from quoteProposalData
  const {
    totalQuantity,
    totalFinalRateBeforeDiscount,
    totalAmountBeforeGstAndDiscount,
    totalDiscountAmount,
    totalGstAmount,
    totalAmount,
    totalTaxableValue,
    totalCgstAmount,
    totalSgstAmount,
    totalIgstAmount,
    totalTaxAmount,
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
    pdf.save("QuoteProposal.pdf");
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
                    width: "20%",
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
                    width: "80%",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "20px",
                    border: "none",
                  }}
                >
                  Quote/Proposal
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
                  GSTIN : {edprowiseGstin}
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
                  {edprowiseCompanyName}
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
                  PAN : {edprowisePan}
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
                  {edprowiseAddress}
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
                  Contact No. : {edprowiseContactNo}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    width: "30%",
                    borderRight: "1px solid black",
                  }}
                  colSpan="2"
                >
                  {edprowiseCityStateCountry}, {edprowisePincode}
                </td>

                <td
                  style={{
                    borderRight: "none",
                    borderTop: "none",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Email ID : {edprowiseEmailId}
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
                  <strong>Quote to </strong>
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
                  Enquiry No. : {enquiryNumber}
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
                  Buyer Name : {buyerName}
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
                  Quote Requested Date : {formatDate(quoteRequestedDate)}
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
                  Delivery Address : {schoolDeliveryAddress}
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
                  Quote No. : {quoteNumber}
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
                  City : {schoolDeliveryLocation?.split(",")[0]}
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
                  Quote/Proposal Date : {formatDate(quoteProposalDate)}
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
                  State : {schoolDeliveryLocation?.split(",")[1]}
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
                    border: "none",
                    padding: "8px",
                    textAlign: "left",
                  }}
                  colSpan="2"
                >
                  GSTIN :
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
                  Advance Amount Required : {advanceRequiredAmount}
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
                  PAN : {schoolPanNumber}
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
                  Expected Delivery Date : {formatDate(expectedDeliveryDate)}
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
                  Contact No. : {schoolContactNumber}
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
                  All Amounts are in INR
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
                    borderTop: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Sr
                </th>
                <th
                  style={{
                    width: "30%",
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
                  Amount before GST & Disc
                </th>
                <th
                  style={{
                    width: "10%",
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Discount Amount
                </th>
                <th
                  style={{
                    width: "10%",
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  GST Amount
                </th>
                <th
                  style={{
                    width: "5%",
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
                      width: "30%",
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
                    {item.finalRateBeforeDiscount}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {formatCost(item.amountBeforeGstAndDiscount)}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {formatCost(item.discountAmount)}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {formatCost(item.gstAmount)}
                  </td>
                  <td
                    style={{
                      width: "5%",
                      borderTop: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {formatCost(item.totalAmount)}
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
                  {formatCost(totalAmountBeforeGstAndDiscount)}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  {formatCost(totalDiscountAmount)}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  {formatCost(totalTaxAmount)}
                </td>
                <td
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "8px",
                  }}
                >
                  {formatCost(totalAmount)}
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
              <h5 style={{ color: "black" }}>
                <strong>Amount In Words : {convertToWords(totalAmount)}</strong>
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
                  Amount
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
                  Amount
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
                  Amount
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
                    {formatCost(item.taxableValue)}
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
                    {formatCost(item.cgstAmount)}
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
                    {formatCost(item.sgstAmount)}
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
                    {formatCost(item.igstAmount)}
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
                  {formatCost(totalTaxableValue)}
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
                  {formatCost(totalCgstAmount)}
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
                  {formatCost(totalSgstAmount)}
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
                  {formatCost(totalIgstAmount)}
                </td>
                <td
                  style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    padding: "8px",
                    width: "5%",
                  }}
                >
                  {formatCost(totalTaxAmount)}
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
                <h5 className="text-end" style={{ color: "black" }}>
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

export default QuoteProposal;
