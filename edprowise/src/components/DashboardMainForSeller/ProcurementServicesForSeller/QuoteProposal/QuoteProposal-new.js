// import React, { useRef } from "react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
// import { useState } from "react";
// import { useLocation } from "react-router-dom";

// // here i want to pass prepare quote data which i want to show
// const QuoteProposal = () => {
//   const location = useLocation();
//   const { prepareQuoteData, quoteProposalData } = location.state || {};

//   console.log("prepare quote data from download page", prepareQuoteData);

//   //   [
//   //     {
//   // "_id": "67b2f7d5cb85516af732c666",
//   // "sellerId": "679b110503ef86eb7f75ffd1",
//   // "enquiryNumber": "ENQ1739776119385409",
//   // "prepareQuoteImage": "/Images/PrepareQuoteImage/school-bench_1739782101159.jpg",
//   // "subcategoryName": "Bench",
//   // "hsnSacc": "ABCD",
//   // "listingRate": 1000,
//   // "edprowiseMargin": 12,
//   // "quantity": 100,
//   // "finalRateBeforeDiscount": 1120,
//   // "discount": 10,
//   // "finalRate": 1008,
//   // "taxableValue": 100800,
//   // "cgstRate": 6,
//   // "cgstAmount": 6048,
//   // "sgstRate": 6,
//   // "sgstAmount": 6048,
//   // "igstRate": 12,
//   // "igstAmount": 12096,
//   // "amountBeforeGstAndDiscount": 112000,
//   // "discountAmount": 11200,
//   // "gstAmount": 24192,
//   // "totalAmount": 124992,
//   // "createdAt": "2025-02-17T08:48:21.176Z",
//   // "updatedAt": "2025-02-17T09:04:30.542Z",
//   // "__v": 0
//   //     }
//   // ]
//   console.log("quote proposal data from download page", quoteProposalData);

//   //   {
//   //     "_id": "67b2f7d5cb85516af732c668",
//   //     "sellerId": "679b110503ef86eb7f75ffd1",
//   //     "enquiryNumber": "ENQ1739776119385409",
//   //     "totalQuantity": 100,
//   //     "totalFinalRateBeforeDiscount": 1120,
//   //     "totalAmountBeforeGstAndDiscount": 112000,
//   //     "totalDiscountAmount": 11200,
//   //     "totalGstAmount": 24192,
//   //     "totalAmount": 124992,
//   //     "totalTaxableValue": 100800,
//   //     "totalCgstAmount": 6048,
//   //     "totalSgstAmount": 6048,
//   //     "totalIgstAmount": 12096,
//   //     "totalTaxAmount": 24192,
//   //     "createdAt": "2025-02-17T08:48:21.268Z",
//   //     "updatedAt": "2025-02-17T09:04:30.993Z",
//   //     "__v": 0
//   // }

//   // here i want to pass data and show data
//   const [products] = useState([
//     {
//       _id: "67b2f7d5cb85516af732c666",
//       sellerId: "679b110503ef86eb7f75ffd1",
//       enquiryNumber: "ENQ1739776119385409",
//       prepareQuoteImage:
//         "/Images/PrepareQuoteImage/school-bench_1739782101159.jpg",
//       subcategoryName: "Bench",
//       hsnSacc: "ABCD",
//       listingRate: 1000,
//       edprowiseMargin: 12,
//       quantity: 100,
//       finalRateBeforeDiscount: 1120,
//       discount: 10,
//       finalRate: 1008,
//       taxableValue: 100800,
//       cgstRate: 6,
//       cgstAmount: 6048,
//       sgstRate: 6,
//       sgstAmount: 6048,
//       igstRate: 12,
//       igstAmount: 12096,
//       amountBeforeGstAndDiscount: 112000,
//       discountAmount: 11200,
//       gstAmount: 24192,
//       totalAmount: 124992,
//       createdAt: "2025-02-17T08:48:21.176Z",
//       updatedAt: "2025-02-17T09:04:30.542Z",
//     },
//     {
//       _id: "67b2f7d5cb85516af732c666",
//       sellerId: "679b110503ef86eb7f75ffd1",
//       enquiryNumber: "ENQ1739776119385409",
//       prepareQuoteImage:
//         "/Images/PrepareQuoteImage/school-bench_1739782101159.jpg",
//       subcategoryName: "Bench",
//       hsnSacc: "ABCD",
//       listingRate: 1000,
//       edprowiseMargin: 12,
//       quantity: 100,
//       finalRateBeforeDiscount: 1120,
//       discount: 10,
//       finalRate: 1008,
//       taxableValue: 100800,
//       cgstRate: 6,
//       cgstAmount: 6048,
//       sgstRate: 6,
//       sgstAmount: 6048,
//       igstRate: 12,
//       igstAmount: 12096,
//       amountBeforeGstAndDiscount: 112000,
//       discountAmount: 11200,
//       gstAmount: 24192,
//       totalAmount: 124992,
//       createdAt: "2025-02-17T08:48:21.176Z",
//       updatedAt: "2025-02-17T09:04:30.542Z",
//     },
//   ]);

//   const QuoteProposalData = {
//     _id: "67b2f7d5cb85516af732c668",
//     sellerId: "679b110503ef86eb7f75ffd1",
//     enquiryNumber: "ENQ1739776119385409",
//     totalQuantity: 100,
//     totalFinalRateBeforeDiscount: 1120,
//     totalAmountBeforeGstAndDiscount: 112000,
//     totalDiscountAmount: 11200,
//     totalGstAmount: 24192,
//     totalAmount: 124992,
//     totalTaxableValue: 100800,
//     totalCgstAmount: 6048,
//     totalSgstAmount: 6048,
//     totalIgstAmount: 12096,
//     totalTaxAmount: 24192,
//     createdAt: "2025-02-17T08:48:21.268Z",
//     updatedAt: "2025-02-17T09:04:30.993Z",
//     __v: 0,
//   };

//   const pdfRef = useRef();

//   const downloadPDF = async () => {
//     const element = pdfRef.current;
//     const canvas = await html2canvas(element, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   return (
//     <div className="m-2">
//       <div
//         ref={pdfRef}
//         style={{
//           padding: "50px",
//           fontFamily: "Arial, sans-serif",
//           fontSize: "15px",
//           lineHeight: "1.5",
//         }}
//       >
//         <table
//           style={{
//             border: "1px solid #ddd",
//             width: "100%",
//           }}
//         >
//           <table
//             style={{
//               width: "100%",
//               marginBottom: "20px",
//               borderCollapse: "collapse",
//             }}
//           >
//             <tbody>
//               <tr>
//                 <td
//                   style={{
//                     width: "100%",
//                     textAlign: "center",
//                     fontWeight: "bold",
//                     fontSize: "20px",
//                     border: "none",
//                   }}
//                 >
//                   Quote/Proposal
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               textAlign: "center",
//             }}
//           >
//             <thead>
//               <tr>
//                 <th
//                   style={{
//                     width: "5%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   S.L.
//                 </th>
//                 <th
//                   style={{
//                     width: "30%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Sub Category Name
//                 </th>
//                 <th
//                   style={{
//                     width: "10%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Qty
//                 </th>
//                 <th
//                   style={{
//                     width: "10%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Rate
//                 </th>
//                 <th
//                   style={{
//                     width: "10%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Amt before GST & Disc
//                 </th>
//                 <th
//                   style={{
//                     width: "10%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Discount Amount
//                 </th>
//                 <th
//                   style={{
//                     width: "10%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   GST Amt
//                 </th>
//                 <th
//                   style={{
//                     width: "5%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Total Amount
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((item, index) => (
//                 <tr key={index}>
//                   <td
//                     style={{
//                       width: "5%",
//                       border: "1px solid #ddd",
//                       padding: "8px",
//                     }}
//                   >
//                     {item.slNo}
//                   </td>
//                   <td
//                     style={{
//                       width: "30%",
//                       border: "1px solid #ddd",
//                       padding: "8px",
//                     }}
//                   >
//                     {item.subcategoryName}
//                   </td>
//                   <td
//                     style={{
//                       width: "10%",
//                       border: "1px solid #ddd",
//                       padding: "8px",
//                     }}
//                   >
//                     {item.quantity}
//                   </td>
//                   <td
//                     style={{
//                       width: "10%",
//                       border: "1px solid #ddd",
//                       padding: "8px",
//                     }}
//                   >
//                     {item.finalRateBeforeDiscount}
//                   </td>
//                   <td
//                     style={{
//                       width: "10%",
//                       border: "1px solid #ddd",
//                       padding: "8px",
//                     }}
//                   >
//                     {item.amountBeforeGstAndDiscount}
//                   </td>

//                   <td
//                     style={{
//                       width: "10%",
//                       border: "1px solid #ddd",
//                       padding: "8px",
//                     }}
//                   >
//                     {item.discountAmount}
//                   </td>

//                   <td
//                     style={{
//                       width: "10%",
//                       border: "1px solid #ddd",
//                       padding: "8px",
//                     }}
//                   >
//                     {item.gstAmount}
//                   </td>
//                   <td
//                     style={{
//                       width: "5%",
//                       border: "1px solid #ddd",
//                       padding: "8px",
//                     }}
//                   >
//                     {item.totalAmount}
//                   </td>
//                 </tr>
//               ))}
//               <tr>
//                 <td
//                   style={{
//                     textAlign: "right",
//                     fontWeight: "bold",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     textAlign: "center",
//                     fontWeight: "bold",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Total
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   {totalQuantity}
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   {totalFinalRateBeforeDiscount}
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   {totalAmountBeforeGstAndDiscount}
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   {totalDiscountAmount}
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   {totalGstAmount}
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   {totalAmount}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <table
//             style={{
//               borderBottom: "none",
//               width: "100%",
//               textAlign: "left",
//             }}
//           >
//             <div className="row p-2">
//               <p>
//                 <strong>Amount In Words :</strong>
//               </p>
//             </div>
//           </table>
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               marginBottom: "20px",
//               textAlign: "center",
//             }}
//           >
//             <thead>
//               <tr>
//                 <th
//                   style={{
//                     border: "none",
//                     padding: "8px",
//                   }}
//                   colspan="2"
//                 ></th>
//                 <th
//                   style={{
//                     width: "20%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "center",
//                   }}
//                   colSpan="2"
//                 >
//                   CGST
//                 </th>
//                 <th
//                   style={{
//                     width: "20%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "center",
//                   }}
//                   colSpan="2"
//                 >
//                   SGST
//                 </th>
//                 <th
//                   style={{
//                     width: "20%",
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "center",
//                   }}
//                   colSpan="2"
//                 >
//                   IGST
//                 </th>
//                 <th
//                   style={{
//                     width: "5%",
//                     border: "none",
//                     padding: "8px",
//                   }}
//                 ></th>
//               </tr>
//               <tr>
//                 <th
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   HSN/SAAC
//                 </th>
//                 <th
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Taxable Value
//                 </th>
//                 <th
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Rate
//                 </th>
//                 <th
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Amt
//                 </th>
//                 <th
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Rate
//                 </th>
//                 <th
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Amt
//                 </th>
//                 <th
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Rate
//                 </th>
//                 <th
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Amt
//                 </th>
//                 <th
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   Total Tax Amount
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     width: "10%",
//                   }}
//                 >
//                   {totalTaxableValue}
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     width: "10%",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     width: "10%",
//                   }}
//                 >
//                   {totalCgstAmount}
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     width: "10%",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     width: "10%",
//                   }}
//                 >
//                   {totalSgstAmount}
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     width: "10%",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     width: "10%",
//                   }}
//                 >
//                   {totalIgstAmount}
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     width: "5%",
//                   }}
//                 >
//                   {totalTaxAmount}
//                 </td>
//               </tr>

//               <tr>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                   }}
//                 >
//                   <strong>Total</strong>
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "left",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "left",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "left",
//                   }}
//                 ></td>

//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "left",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "left",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "left",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "left",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid #ddd",
//                     padding: "8px",
//                     textAlign: "left",
//                   }}
//                 ></td>
//               </tr>
//             </tbody>
//           </table>
//           <table
//             style={{
//               width: "100%",
//               marginBottom: "60px",
//             }}
//           >
//             <div style={{ height: "100px" }} className="row p-2">
//               <div style={{ marginBottom: "80px" }}>
//                 <p className="text-end">
//                   <strong>For EdProwise Tech Pvt. Ltd</strong>
//                 </p>
//               </div>
//               <div>
//                 <p className="text-end">
//                   <strong>Authorised Signatory</strong>
//                 </p>
//               </div>
//             </div>
//           </table>
//         </table>
//       </div>
//       <button
//         onClick={downloadPDF}
//         style={{
//           marginTop: "20px",
//           padding: "10px 20px",
//           cursor: "pointer",
//         }}
//       >
//         Download PDF
//       </button>
//     </div>
//   );
// };

// export default QuoteProposal;

import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { format } from "date-fns";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const QuoteProposal = ({
  prepareQuoteData,
  quoteProposalData,
  profileData,
}) => {
  const {
    buyerName,
    schoolContactNumber,
    schoolPanNumber,
    deliveryAddress,
    deliveryLocation,
    quoteRequestedDate,
    enquiryNumber,
    quoteNumber,
    quoteProposalDate,
    paymentTerms,
    advanceRequiredAmount,
    expectedDeliveryDate,
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

  return (
    <div className="m-2">
      <div
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
                <td
                  style={{
                    width: "100%",
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
                  EdProwise Tech Pvt. Ltd
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
                  Chawri Bazaar, New Delhi
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
                    borderRight: "1px solid #ddd",
                  }}
                  colSpan="2"
                >
                  Delhi, 110006, India
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
                  <strong>Quote to</strong>
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
                  Enquiry No.: {enquiryNumber}
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
                  Buyer Name: {buyerName}
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
                  Quote Requested Date:{formatDate(quoteRequestedDate)}
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
                  Delivery Address: {deliveryAddress}
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
                  Quote No.: {quoteNumber}
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
                  City: {deliveryLocation?.split(",")[0]}
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
                  Quote/Proposal Date: {formatDate(quoteProposalDate)}
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
                  State: {deliveryLocation?.split(",")[1]}
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
                  GSTIN Buyer GSTIN :
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
                  PAN (Buyer PAN) : {schoolPanNumber}
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
                  {/* 2025-02-17T21:48:07.602Z */}
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
                    borderLeft: "1px solid #ddd",
                    borderTop: "none",
                    borderBottom: "none",
                  }}
                >
                  All Amount are in INR
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
                    width: "30%",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Sub Category Name
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
                  Amt before GST & Disc
                </th>
                <th
                  style={{
                    width: "10%",
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  Discount Amount
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
              {prepareQuoteData?.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      width: "5%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      width: "30%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.subcategoryName}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.finalRateBeforeDiscount}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.amountBeforeGstAndDiscount}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.discountAmount}
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
                  {totalQuantity}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {totalFinalRateBeforeDiscount}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {totalAmountBeforeGstAndDiscount}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {totalDiscountAmount}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {totalGstAmount}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {totalAmount}
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
                  colSpan="2"
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
              {prepareQuoteData?.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      width: "30%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.hsnSacc}
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
                    {item.cgstRate}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.cgstAmount}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.sgstRate}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.sgstAmount}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.igstRate}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      border: "1px solid #ddd",
                      padding: "8px",
                    }}
                  >
                    {item.igstAmount}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    width: "10%",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    width: "10%",
                  }}
                >
                  {totalTaxableValue}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    width: "10%",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    width: "10%",
                  }}
                >
                  {totalCgstAmount}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    width: "10%",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    width: "10%",
                  }}
                >
                  {totalSgstAmount}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    width: "10%",
                  }}
                ></td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    width: "10%",
                  }}
                >
                  {totalIgstAmount}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    width: "5%",
                  }}
                >
                  {totalTaxAmount}
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
    </div>
  );
};

export default QuoteProposal;
