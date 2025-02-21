// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import CityData from "../../../../CityData.json";
// import { Modal, Button } from "react-bootstrap";
// import getAPI from "../../../../../api/getAPI";
// import postAPI from "../../../../../api/postAPI";

// const QuoteRequestModal = ({ onClose, enquiryNumber }) => {
//   const [quoteRequest, setQuoteRequest] = useState(null);

//   const fetchQuoteRequestData = async () => {
//     try {
//       const response = await getAPI(
//         `/get-quote-request/${enquiryNumber}`,
//         {},
//         true
//       );

//       if (!response.hasError && response.data && response.data.data) {
//         setQuoteRequest(response.data.data);
//         console.log("Quote Request Data", response.data.data);

//         //   {
//         //     "_id": "67a59414fcac6689f92eb3a4",
//         //     "schoolId": "6788dec3cf93c947d08b0b23",
//         //     "enquiryNumber": "ENQ17389045965624757",
//         //     "deliveryAddress": "123 Main Street",
//         //     "deliveryLocation": "Downtown",
//         //     "deliveryLandMark": "Near City Mall",
//         //     "deliveryPincode": "123456",
//         //     "expectedDeliveryDate": "2024-02-15T00:00:00.000Z",
//         //     "buyerStatus": "Order Placed",
//         //     "supplierStatus": "Order Received From Buyer",
//         //     "edprowiseStatus": "Order Received From Buyer",
//         //     "createdAt": "2025-02-07T05:03:16.819Z",
//         //     "updatedAt": "2025-02-12T09:15:00.601Z",
//         //     "__v": 0
//         // }
//       } else {
//         console.error("Invalid response format or error in response");
//       }
//     } catch (err) {
//       console.error("Error fetching Quote Request:", err);
//     }
//   };

//   useEffect(() => {
//     if (enquiryNumber) {
//       fetchQuoteRequestData();
//     }
//   }, [enquiryNumber]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setQuoteRequest((prevQuoteRequest) => ({
//       ...prevQuoteRequest,
//       [name]: value,
//     }));
//   };

//   const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
//     cities.map((city) => `${city}, ${state}, India`)
//   );

//   const handleSubmit = async (e) => {
//     // from this submit function if any new data is present from this "deliveryAddress": "123 Main Street",
//     // "deliveryLocation": "Downtown",
//     // "deliveryLandMark": "Near City Mall",
//     // "deliveryPincode": "123456",
//     // "expectedDeliveryDate": "2024-02-15"

//     // it will be passed to backend along with the products cartId
//     e.preventDefault();

//     try {
//       const response = await postAPI("/order-from-buyer", formDataToSend, true);

//       if (!response.hasError) {
//         toast.success("Order Placed successfully");
//         onClose();
//       } else {
//         toast.error(response.message || "Failed to place order");
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//           "An unexpected error occurred. Please try again."
//       );
//     }
//   };

//   return (
//     <Modal show={true} onHide={onClose} centered>
//       <Modal.Body>
//         <div className="container">
//           <div className="row">
//             <div className="col-xl-12">
//               <div className="card m-2">
//                 <div className="card-body custom-heading-padding">
//                   <div className="container">
//                     <div className="card-header mb-2">
//                       <h4 className="card-title text-center custom-heading-font">
//                         Your Current Address Details
//                       </h4>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label htmlFor="deliveryAddress" className="form-label">
//                           Delivery Address
//                         </label>
//                         <input
//                           type="text"
//                           name="deliveryAddress"
//                           value={quoteRequest?.deliveryAddress}
//                           onChange={handleInputChange}
//                           className="form-control"
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label
//                           htmlFor="deliveryLocation"
//                           className="form-label"
//                         >
//                           Delivery Location
//                         </label>
//                         <select
//                           id="deliveryLocation"
//                           name="deliveryLocation"
//                           className="form-control"
//                           value={quoteRequest?.deliveryLocation}
//                           onChange={handleInputChange}
//                           required
//                         >
//                           <option value="">Select City-State-Country</option>
//                           {cityOptions.map((option, index) => (
//                             <option key={index} value={option}>
//                               {option}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label htmlFor="landMark" className="form-label">
//                           Landmark
//                         </label>
//                         <input
//                           type="text"
//                           name="deliveryLandMark"
//                           value={quoteRequest?.deliveryLandMark}
//                           onChange={handleInputChange}
//                           className="form-control"
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label htmlFor="deliveryPincode" className="form-label">
//                           Pin Code
//                         </label>
//                         <input
//                           type="text"
//                           name="deliveryPincode"
//                           value={quoteRequest?.deliveryPincode}
//                           onChange={handleInputChange}
//                           className="form-control"
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label
//                           htmlFor="expectedDeliveryDate"
//                           className="form-label"
//                         >
//                           Expected Delivery Date
//                         </label>
//                         <input
//                           type="date"
//                           name="expectedDeliveryDate"
//                           onChange={handleInputChange}
//                           className="form-control"
//                           value={quoteRequest?.expectedDeliveryDate}

//                           // here i am getting the mm/dd/yyyy but i want the actual date 2024-02-15  and if user want he also can change the date
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="success" onClick={handleSubmit}>
//           Place Order
//         </Button>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default QuoteRequestModal;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";

const QuoteRequestModal = ({ onClose, enquiryNumber, carts }) => {
  const [quoteRequest, setQuoteRequest] = useState(null);

  const fetchQuoteRequestData = async () => {
    try {
      const response = await getAPI(
        `/get-quote-request/${enquiryNumber}`,
        {},
        true
      );

      if (!response.hasError && response.data && response.data.data) {
        setQuoteRequest(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Quote Request:", err);
    }
  };

  useEffect(() => {
    if (enquiryNumber) {
      fetchQuoteRequestData();
    }
  }, [enquiryNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuoteRequest((prevQuoteRequest) => ({
      ...prevQuoteRequest,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the products array with cartIds
    const products = Object.values(carts)
      .flat()
      .map((cartItem) => ({
        cartId: cartItem._id,
      }));

    const formDataToSend = {
      enquiryNumber,
      products,
      deliveryAddress: quoteRequest?.deliveryAddress,
      deliveryLocation: quoteRequest?.deliveryLocation,
      deliveryLandMark: quoteRequest?.deliveryLandMark,
      deliveryPincode: quoteRequest?.deliveryPincode,
      expectedDeliveryDate: quoteRequest?.expectedDeliveryDate,
    };

    try {
      const response = await postAPI("/order-from-buyer", formDataToSend, true);

      if (!response.hasError) {
        toast.success("Order Placed successfully");
        onClose();
      } else {
        toast.error(response.message || "Failed to place order");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header">
                      <h4 className="card-title text-center custom-heading-font">
                        Your Current Address Details
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="deliveryAddress" className="form-label">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          name="deliveryAddress"
                          value={quoteRequest?.deliveryAddress || ""}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label
                          htmlFor="deliveryLocation"
                          className="form-label"
                        >
                          Delivery Location
                        </label>
                        <input
                          type="text"
                          name="deliveryLocation"
                          value={quoteRequest?.deliveryLocation || ""}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label htmlFor="landMark" className="form-label">
                          Landmark
                        </label>
                        <input
                          type="text"
                          name="deliveryLandMark"
                          value={quoteRequest?.deliveryLandMark || ""}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label htmlFor="deliveryPincode" className="form-label">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          name="deliveryPincode"
                          value={quoteRequest?.deliveryPincode || ""}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb-2">
                        <label
                          htmlFor="expectedDeliveryDate"
                          className="form-label"
                        >
                          Expected Delivery Date
                        </label>
                        <input
                          type="date"
                          name="expectedDeliveryDate"
                          onChange={handleInputChange}
                          className="form-control"
                          value={
                            quoteRequest?.expectedDeliveryDate?.split("T")[0] ||
                            ""
                          }
                        />
                      </div>
                    </div>
                    <div className="text-end">
                      <Button variant="success" onClick={handleSubmit}>
                        Place Order
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={onClose}
                        className="ms-2"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QuoteRequestModal;
