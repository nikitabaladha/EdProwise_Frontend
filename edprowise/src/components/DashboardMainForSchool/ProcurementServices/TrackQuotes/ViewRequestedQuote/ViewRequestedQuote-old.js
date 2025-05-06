// import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import "react-toastify/dist/ReactToastify.css";

// import getAPI from "../../../../../api/getAPI";

// import ViewAllQuoteTable from "../ViewAllQuoteTable/ViewAllQuoteTable";

// import { format } from "date-fns";
// import { Modal } from "react-bootstrap";

// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   return format(new Date(dateString), "dd/MM/yyyy");
// };

// const ViewRequestedQuote = () => {
//   const location = useLocation();

//   const enquiryNumber =
//     location.state?.searchEnquiryNumber || location.state?.enquiryNumber;

//   const navigate = useNavigate();

//   const [quotes, setQuotes] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");

//   const [isQuoteTableVisible, setIsQuoteTableVisible] = useState(false);
//   const [submittedQuotes, setSubmittedQuotes] = useState([]);

//   useEffect(() => {
//     if (!enquiryNumber) return;

//     fetchRequestedQuoteData();
//   }, [enquiryNumber]);

//   const fetchRequestedQuoteData = async () => {
//     try {
//       const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

//       const response = await getAPI(
//         `/get-quote/${encodedEnquiryNumber}`,
//         {},
//         true
//       );

//       if (!response.hasError && response.data.data.products) {
//         setQuotes(response.data.data.products);
//         console.log(
//           "Quote from view Requested quote",
//           response.data.data.products
//         );
//         // [
//         //   {
//         //     id: "68185cf00d6376afa158090b",
//         //     schoolId: "SID383005",
//         //     categoryId: "680e175a7aefeb4cb38d32e2",
//         //     categoryName: "School Desk & Bench (Play School & KG)",
//         //     subCategoryId: "680e175a7aefeb4cb38d32ea",
//         //     subCategoryName: "Kids School Desk & Bench - Steel",
//         //     description: "No description provided",
//         //     productImages: [
//         //       "/Images/ProductImage/ABC-School_1746427120146.png",
//         //       "/Images/ProductImage/AC Image_1746427120148.jpg",
//         //       "/Images/ProductImage/AC_1746427120149.jpeg",
//         //       "/Images/ProductImage/test-profile-image - Copy_1746427120149.jpg",
//         //     ],
//         //     unit: "PCS - PIECES",
//         //     quantity: 10,
//         //     enquiryNumber: "ENQ/2025-26/0003",
//         //     quoteRequestId: "68185cf00d6376afa158090d",
//         //     deliveryAddress:
//         //       "B-503 Saaga Residency\r\nNear Zydus Corporate Park, Near Nirma University",
//         //     deliveryLandMark: "Near Landmark",
//         //     deliveryPincode: "382421",
//         //     expectedDeliveryDate: "2025-05-05T00:00:00.000Z",
//         //     buyerStatus: "Quote Requested",
//         //     supplierStatus: "Quote Requested",
//         //     edprowiseStatus: "Quote Requested",
//         //     createdAt: "2025-05-05T06:38:40.379Z",
//         //     updatedAt: "2025-05-05T06:38:40.379Z",
//         //   },
//         // ];
//       } else {
//         console.error("Invalid response format or error in response");
//       }
//     } catch (err) {
//       console.error("Error fetching quote:", err);
//     }
//   };

//   useEffect(() => {
//     if (!quotes.length) return;
//     quotes.forEach((quote) => {
//       if (quote.enquiryNumber) {
//         fetchAllQuoteData(quote.enquiryNumber);
//       }
//     });
//   }, [quotes]);

//   const fetchAllQuoteData = async (enquiryNumber) => {
//     try {
//       const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);

//       const response = await getAPI(
//         `/submit-quote-by-status/${encodedEnquiryNumber}`,
//         {},
//         true
//       );

//       if (
//         !response.hasError &&
//         response.data &&
//         response.data.data.length > 0
//       ) {
//         setSubmittedQuotes((prev) => ({
//           ...prev,
//           [enquiryNumber]: response.data.data,
//         }));
//       } else {
//         console.error("Invalid response format or error in response");
//       }
//     } catch (err) {
//       console.error("Error fetching submitted-quote:", err);
//     }
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setShowModal(true);
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2">
//                   <h4 className="card-title text-center custom-heading-font">
//                     Requested Quote Details
//                   </h4>
//                 </div>
//               </div>

//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
//                   <thead className="bg-light-subtle">
//                     <tr>
//                       <th style={{ width: 20 }}>
//                         <div className="form-check ms-1">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             id="customCheck1"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="customCheck1"
//                           />
//                         </div>
//                       </th>
//                       <th>Enquiry No.</th>
//                       <th>Product Required Image & Name</th>
//                       <th>Product Required (Category)</th>
//                       <th>Quantity</th>
//                       <th>Unit</th>
//                       <th>Product Description</th>
//                       <th>Quote Requested Date</th>
//                       <th>Delivery Expected Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {quotes.length > 0 ? (
//                       quotes.map((quote) => (
//                         // const firstAvailableImage =
//                         //     quote?.productImages?.find((img) => img);
//                         //   const imageUrl = firstAvailableImage
//                         //     ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${firstAvailableImage}`
//                         //     : null;

//                         <tr key={quote.id}>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id={`customCheck${quote.id}`}
//                               />
//                               <label
//                                 className="form-check-label"
//                                 htmlFor={`customCheck${quote.id}`}
//                               >
//                                 &nbsp;
//                               </label>
//                             </div>
//                           </td>
//                           <td>{quote.enquiryNumber}</td>
//                           <td>
//                             <div className="d-flex align-items-center gap-2">
//                               {/* see here by default i want to show first available image and when user clcick on that i want to
//                               open the model with slider and in that slider whatever amount of image i want to show and give previous and next button also  */}
//                               {quote.productImages && (
//                                 <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
//                                   <img
//                                     className="avatar-md"
//                                     alt={quote.subCategoryName}
//                                     src={imageUrl}
//                                     onClick={() => handleImageClick(imageUrl)}
//                                   />
//                                 </div>
//                               )}
//                               <div>
//                                 <Link className="text-dark fw-medium">
//                                   {quote.subCategoryName}
//                                 </Link>
//                               </div>
//                             </div>
//                           </td>
//                           <td>{quote.categoryName}</td>
//                           <td>{quote.quantity}</td>
//                           <td>{quote.unit}</td>
//                           <td>{quote.description}</td>
//                           <td>{formatDate(quote.createdAt)}</td>
//                           <td>{formatDate(quote.expectedDeliveryDate)}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr></tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="d-flex justify-content-between mt-2">
//                 {Object.values(submittedQuotes).some(
//                   (quotes) => quotes.length > 0
//                 ) && (
//                   <button
//                     type="button"
//                     className="btn btn-primary custom-submit-button"
//                     onClick={() => setIsQuoteTableVisible(!isQuoteTableVisible)}
//                   >
//                     {isQuoteTableVisible ? "Hide Quote" : "View Quote"}
//                   </button>
//                 )}
//                 <button
//                   type="button"
//                   className="btn btn-primary custom-submit-button"
//                   onClick={() => window.history.back()}
//                 >
//                   Go Back
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isQuoteTableVisible && quotes.length > 0 ? (
//         <ViewAllQuoteTable />
//       ) : (
//         <div className="row"></div>
//       )}

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Body className="text-center">
//           <img
//             src={selectedImage}
//             alt="Preview"
//             style={{ maxWidth: "100%", maxHeight: "80vh" }}
//           />
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ViewRequestedQuote;

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../../../api/getAPI";
import ViewAllQuoteTable from "../ViewAllQuoteTable/ViewAllQuoteTable";
import { format } from "date-fns";
import { Modal } from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return format(new Date(dateString), "dd/MM/yyyy");
};

const ViewRequestedQuote = () => {
  const location = useLocation();
  const enquiryNumber =
    location.state?.searchEnquiryNumber || location.state?.enquiryNumber;
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuoteImages, setSelectedQuoteImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isQuoteTableVisible, setIsQuoteTableVisible] = useState(false);
  const [submittedQuotes, setSubmittedQuotes] = useState([]);

  useEffect(() => {
    if (!enquiryNumber) return;
    fetchRequestedQuoteData();
  }, [enquiryNumber]);

  const fetchRequestedQuoteData = async () => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
      const response = await getAPI(
        `/get-quote/${encodedEnquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data.data.products) {
        setQuotes(response.data.data.products);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  useEffect(() => {
    if (!quotes.length) return;
    quotes.forEach((quote) => {
      if (quote.enquiryNumber) {
        fetchAllQuoteData(quote.enquiryNumber);
      }
    });
  }, [quotes]);

  const fetchAllQuoteData = async (enquiryNumber) => {
    try {
      const encodedEnquiryNumber = encodeURIComponent(enquiryNumber);
      const response = await getAPI(
        `/submit-quote-by-status/${encodedEnquiryNumber}`,
        {},
        true
      );

      if (
        !response.hasError &&
        response.data &&
        response.data.data.length > 0
      ) {
        setSubmittedQuotes((prev) => ({
          ...prev,
          [enquiryNumber]: response.data.data,
        }));
      }
    } catch (err) {
      console.error("Error fetching submitted-quote:", err);
    }
  };

  const handleImageClick = (quoteImages) => {
    setSelectedQuoteImages(quoteImages);
    setCurrentImageIndex(0);
    setShowModal(true);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedQuoteImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedQuoteImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Requested Quote Details
                  </h4>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th style={{ width: 20 }}>
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheck1"
                          />
                        </div>
                      </th>
                      <th>Enquiry No.</th>
                      <th>Product Required Image & Name</th>
                      <th>Product Required (Category)</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Product Description</th>
                      <th>Quote Requested Date</th>
                      <th>Delivery Expected Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.length > 0 ? (
                      quotes.map((quote) => {
                        const firstAvailableImage = quote?.productImages?.find(
                          (img) => img
                        );
                        const imageUrl = firstAvailableImage
                          ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${firstAvailableImage}`
                          : null;

                        return (
                          <tr key={quote.id}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`customCheck${quote.id}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`customCheck${quote.id}`}
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>{quote.enquiryNumber}</td>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {imageUrl && (
                                  <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                    <img
                                      className="avatar-md"
                                      alt={quote.subCategoryName}
                                      src={imageUrl}
                                      onClick={() =>
                                        handleImageClick(quote.productImages)
                                      }
                                    />
                                  </div>
                                )}
                                <div>
                                  <Link className="text-dark fw-medium">
                                    {quote.subCategoryName}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>{quote.categoryName}</td>
                            <td>{quote.quantity}</td>
                            <td>{quote.unit}</td>
                            <td>{quote.description}</td>
                            <td>{formatDate(quote.createdAt)}</td>
                            <td>{formatDate(quote.expectedDeliveryDate)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between mt-2">
                {Object.values(submittedQuotes).some(
                  (quotes) => quotes.length > 0
                ) && (
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => setIsQuoteTableVisible(!isQuoteTableVisible)}
                  >
                    {isQuoteTableVisible ? "Hide Quote" : "View Quote"}
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isQuoteTableVisible && quotes.length > 0 && <ViewAllQuoteTable />}

      {/* <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="sm"
      >
        <Modal.Body className="text-center p-0" style={{ minHeight: "300px" }}>
          {selectedQuoteImages.length > 0 && (
            <>
              <div
                className="position-relative d-flex justify-content-center align-items-center"
                style={{ height: "300px", overflow: "hidden" }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${selectedQuoteImages[currentImageIndex]}`}
                  alt={`Product ${currentImageIndex + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  className="img-fluid"
                />
                {selectedQuoteImages.length > 1 && (
                  // i want this both icons stick to model and with fix position because right now what happens if image changes at that time
                  // according to image it chnages its posion which is not correct
                  <>
                    <button
                      className="position-absolute top-50 start-0 translate-middle-y btn btn-primary rounded-circle p-2"
                      onClick={handlePrevImage}
                      style={{ left: "10px" }}
                    >
                      <FaArrowAltCircleLeft />
                    </button>
                    <button
                      className="position-absolute top-50 end-0 translate-middle-y btn btn-primary rounded-circle p-2"
                      onClick={handleNextImage}
                      style={{ right: "10px" }}
                    >
                      <FaArrowAltCircleRight />
                    </button>
                  </>
                )}
              </div>
              {selectedQuoteImages.length > 1 && (
                <div className="mt-2">
                  {currentImageIndex + 1} / {selectedQuoteImages.length}
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal> */}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body
          className="text-center p-0 position-relative"
          style={{ minHeight: "250px" }}
        >
          {selectedQuoteImages.length > 0 && (
            <>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "300px", overflow: "hidden" }}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${selectedQuoteImages[currentImageIndex]}`}
                  alt={`Product ${currentImageIndex + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  className="img-fluid"
                />
              </div>

              {selectedQuoteImages.length > 1 && (
                <div className="mt-2">
                  {currentImageIndex + 1} / {selectedQuoteImages.length}
                </div>
              )}
            </>
          )}
        </Modal.Body>

        {selectedQuoteImages.length > 1 && (
          <>
            <button
              className="position-absolute top-50 start-0 translate-middle-y btn btn-primary rounded-circle p-2"
              onClick={handlePrevImage}
              style={{ left: "10px" }}
            >
              <FaArrowLeft />
            </button>
            <button
              className="position-absolute top-50 end-0 translate-middle-y btn btn-primary rounded-circle p-2"
              onClick={handleNextImage}
              style={{ right: "10px" }}
            >
              <FaArrowRight />
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ViewRequestedQuote;
