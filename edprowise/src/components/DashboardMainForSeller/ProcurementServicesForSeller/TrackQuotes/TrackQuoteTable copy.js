// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { exportToExcel } from "../../../export-excel";
// import getAPI from "../../../../api/getAPI";

// const TrackQuoteTable = ({}) => {
//   const [quotes, setQuotes] = useState([]);
//   const [quoteProposal, setQuoteProposal] = useState(null);
//   const [prepareQuoteData, setPrepareQuoteData] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuoteData = async () => {
//       try {
//         const response = await getAPI(`/get-quote-list-for-seller`, {}, true);
//         if (
//           !response.hasError &&
//           response.data &&
//           Array.isArray(response.data.data)
//         ) {
//           setQuotes(response.data.data);
//         } else {
//           console.error("Invalid response format or error in response");
//         }
//       } catch (err) {
//         console.error("Error fetching quote:", err);
//       }
//     };

//     fetchQuoteData();
//   }, []);

//   const navigateToViewRequestedQuote = (event, enquiryNumber) => {
//     event.preventDefault();
//     navigate(`/seller-dashboard/procurement-services/view-requested-quote`, {
//       state: { enquiryNumber },
//     });
//   };

//   const navigateToSubmitQuote = (event, product) => {
//     event.preventDefault();
//     navigate(`/seller-dashboard/procurement-services/submit-quote`, {
//       state: { product },
//     });
//   };

//   const handleExport = () => {
//     const filteredData = quotes.map((quote) => ({}));
//     exportToExcel(filteredData, "Products", "Products Data");
//   };

//   const fetchPrepareQuoteAndProposalData = async (enquiryNumber, schoolId) => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const sellerId = userDetails?.id;

//     if (!sellerId || !enquiryNumber || !schoolId) {
//       console.error("Seller ID, Enquiry Number, or School ID is missing");
//       return;
//     }

//     try {
//       // Fetch Prepare Quote data
//       const prepareQuoteResponse = await getAPI(
//         `/prepare-quote?sellerId=${sellerId}&enquiryNumber=${enquiryNumber}`
//       );

//       // Fetch Quote Proposal data
//       const quoteProposalResponse = await getAPI(
//         `/quote-proposal?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`
//       );

//       // Fetch Profile data based on the schoolId
//       const profileResponse = await getAPI(
//         `/quote-proposal-pdf-required-data/${schoolId}`
//       );

//       if (
//         !prepareQuoteResponse.hasError &&
//         prepareQuoteResponse.data &&
//         !quoteProposalResponse.hasError &&
//         quoteProposalResponse.data &&
//         !profileResponse.hasError &&
//         profileResponse.data
//       ) {
//         const prepareQuoteData = prepareQuoteResponse.data.data;
//         const quoteProposalData = quoteProposalResponse.data.data;
//         const profileData = profileResponse.data.data;

//         navigate(`/seller-dashboard/procurement-services/quote-proposal`, {
//           state: { prepareQuoteData, quoteProposalData, profileData },
//         });
//       } else {
//         console.error(
//           "Error fetching Prepare Quote, Quote Proposal, or School Profile data"
//         );
//       }
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card">
//               <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                 <h4 className="card-title flex-grow-1">
//                   All Requested Quote List
//                 </h4>
//                 <div className="text-end">
//                   <Link
//                     onClick={handleExport}
//                     className="btn btn-sm btn-outline-light"
//                   >
//                     Export
//                   </Link>
//                 </div>
//               </div>

//               <div>
//                 {quotes.length > 0 ? (
//                   <div className="table-responsive">
//                     <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
//                       <thead className="bg-light-subtle">
//                         <tr>
//                           <th style={{ width: 20 }}>
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id="customCheck1"
//                               />
//                               <label
//                                 className="form-check-label"
//                                 htmlFor="customCheck1"
//                               />
//                             </div>
//                           </th>
//                           <th>Enquiry No.</th>
//                           <th className="text-start">
//                             Product Required Image & Name
//                           </th>
//                           <th>Product Required (Category)</th>
//                           <th>Quantity</th>
//                           <th>Unit</th>
//                           <th>Status</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {quotes.map((quote) => (
//                           <tr key={quote.id}>
//                             <td>
//                               <div className="form-check ms-1">
//                                 <input
//                                   type="checkbox"
//                                   className="form-check-input"
//                                   id={`customCheck${quote.id}`}
//                                 />
//                                 <label
//                                   className="form-check-label"
//                                   htmlFor={`customCheck${quote.id}`}
//                                 >
//                                   &nbsp;
//                                 </label>
//                               </div>
//                             </td>
//                             <td>{quote.enquiryNumber}</td>
//                             <td>
//                               <div className="d-flex align-items-center gap-2">
//                                 {quote.productImage && (
//                                   <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
//                                     <img
//                                       className="avatar-md"
//                                       alt={quote.subCategoryName}
//                                       src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${quote?.productImage}`}
//                                     />
//                                   </div>
//                                 )}
//                                 <div>
//                                   <Link className="text-dark fw-medium">
//                                     {quote.subCategoryName}
//                                   </Link>
//                                 </div>
//                               </div>
//                             </td>
//                             <td>{quote.categoryName}</td>
//                             <td>{quote.quantity}</td>
//                             <td>{quote.unit}</td>
//                             <td>{quote.supplierStatus}</td>
//                             <td>
//                               <div className="d-flex gap-2">
//                                 <Link
//                                   className="btn btn-light btn-sm"
//                                   onClick={(event) =>
//                                     navigateToViewRequestedQuote(
//                                       event,
//                                       quote?.enquiryNumber
//                                     )
//                                   }
//                                 >
//                                   <iconify-icon
//                                     icon="solar:eye-broken"
//                                     className="align-middle fs-18"
//                                   />
//                                 </Link>

//                                 <Link
//                                   className="btn btn-danger btn-sm"
//                                   title="generate pdf"
//                                   data-bs-toggle="popover"
//                                   data-bs-trigger="hover"
//                                   //right now i am navigating  to quote proposal page, passing the data and on that page i am generatinng pdf but now i want that without navigating to that page i want to pass the data and generate pdf buy this button i dont want to redirect

//                                   onClick={() =>
//                                     fetchPrepareQuoteAndProposalData(
//                                       quote.enquiryNumber,
//                                       quote.schoolId
//                                     )
//                                   }
//                                 >
//                                   Prepare Quote Proposal
//                                 </Link>

//                                 <Link
//                                   className="btn btn-danger btn-sm"
//                                   title="Submit"
//                                   data-bs-toggle="popover"
//                                   data-bs-trigger="hover"
//                                 >
//                                   Prepare Quote
//                                 </Link>

//                                 <Link
//                                   className="btn btn-success btn-sm"
//                                   title="Submit"
//                                   data-bs-toggle="popover"
//                                   data-bs-trigger="hover"
//                                   onClick={(event) =>
//                                     navigateToSubmitQuote(event, quote)
//                                   }
//                                 >
//                                   Submit Quote
//                                 </Link>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <tr></tr>
//                 )}
//               </div>
//               <div className="card-footer border-top">
//                 <nav aria-label="Page navigation example">
//                   <ul className="pagination justify-content-end mb-0">
//                     <li className="page-item">
//                       <Link className="page-link">Previous</Link>
//                     </li>
//                     <li className="page-item active">
//                       <Link className="page-link">1</Link>
//                     </li>
//                     <li className="page-item">
//                       <Link className="page-link">2</Link>
//                     </li>
//                     <li className="page-item">
//                       <Link className="page-link">3</Link>
//                     </li>
//                     <li className="page-item">
//                       <Link className="page-link">Next</Link>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TrackQuoteTable;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";
import getAPI from "../../../../api/getAPI";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import QuoteProposal from "../QuoteProposal/QuoteProposal";

const TrackQuoteTable = () => {
  const [quotes, setQuotes] = useState([]);
  const [quoteProposalData, setQuoteProposalData] = useState(null);
  const [prepareQuoteData, setPrepareQuoteData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await getAPI(`/get-quote-list-for-seller`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setQuotes(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchQuoteData();
  }, []);

  const fetchPrepareQuoteAndProposalData = async (enquiryNumber, schoolId) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const sellerId = userDetails?.id;

    if (!sellerId || !enquiryNumber || !schoolId) {
      console.error("Seller ID, Enquiry Number, or School ID is missing");
      return;
    }

    try {
      const [prepareQuoteResponse, quoteProposalResponse, profileResponse] =
        await Promise.all([
          getAPI(
            `/prepare-quote?sellerId=${sellerId}&enquiryNumber=${enquiryNumber}`
          ),
          getAPI(
            `/quote-proposal?enquiryNumber=${enquiryNumber}&sellerId=${sellerId}`
          ),
          getAPI(`/quote-proposal-pdf-required-data/${schoolId}`),
        ]);

      console.log("Prepare Quote Response:", prepareQuoteResponse);
      console.log("Quote Proposal Response:", quoteProposalResponse);
      console.log("Profile Response:", profileResponse);

      if (
        !prepareQuoteResponse.hasError &&
        prepareQuoteResponse.data &&
        !quoteProposalResponse.hasError &&
        quoteProposalResponse.data &&
        !profileResponse.hasError &&
        profileResponse.data
      ) {
        setPrepareQuoteData(prepareQuoteResponse.data.data);
        setQuoteProposalData(quoteProposalResponse.data.data);
        setProfileData(profileResponse.data.data);
      } else {
        console.error("Error fetching data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (prepareQuoteData && quoteProposalData && profileData) {
      generatePDF();
    }
  }, [prepareQuoteData, quoteProposalData, profileData]);

  const generatePDF = async () => {
    if (!prepareQuoteData || !quoteProposalData || !profileData) {
      console.error("PDF data is not available");
      return;
    }

    const element = pdfRef.current;
    if (!element) {
      console.error("Element to capture not found");
      return;
    }

    try {
      element.style.display = "block"; // Ensure the element is displayed

      // Wait for a short period to ensure rendering is complete
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Increased delay

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      // Check if the canvas is valid
      if (!canvas) {
        throw new Error("Failed to generate canvas");
      }

      const imgData = canvas.toDataURL("image/png");
      if (!imgData || imgData === "data:,") {
        throw new Error("Generated image data is empty");
      }

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("quote-proposal.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      element.style.display = "none"; // Hide the element after processing
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  All Requested Quote List
                </h4>
                <div className="text-end">
                  <Link className="btn btn-sm btn-outline-light">Export</Link>
                </div>
              </div>

              <div>
                {quotes.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                      <thead className="bg-light-subtle">
                        <tr>
                          <th>Enquiry No.</th>
                          <th>Product Required Image & Name</th>
                          <th>Product Required (Category)</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotes.map((quote) => (
                          <tr key={quote.id}>
                            <td>{quote.enquiryNumber}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {quote.productImage && (
                                  <img
                                    className="avatar-md"
                                    alt={quote.subCategoryName}
                                    src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${quote?.productImage}`}
                                  />
                                )}
                                <Link className="text-dark fw-medium">
                                  {quote.subCategoryName}
                                </Link>
                              </div>
                            </td>
                            <td>{quote.categoryName}</td>
                            <td>{quote.quantity}</td>
                            <td>{quote.unit}</td>
                            <td>{quote.supplierStatus}</td>
                            <td>
                              <Link
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  fetchPrepareQuoteAndProposalData(
                                    quote.enquiryNumber,
                                    quote.schoolId
                                  )
                                }
                              >
                                Prepare Quote Proposal
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No quotes available</p>
                )}
              </div>
              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <Link className="page-link">Previous</Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link">Next</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <div ref={pdfRef}>
            <QuoteProposal
              prepareQuoteData={prepareQuoteData}
              quoteProposalData={quoteProposalData}
              profileData={profileData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackQuoteTable;
