// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Link } from "react-router-dom";
// // import getAPI from "../../../../api/getAPI";

// // const TrackQuoteTable = ({}) => {
// //   const [quotes, setQuotes] = useState([]);
// //   // const location = useLocation();

// //   useEffect(() => {
// //     const fetchSchoolData = async () => {
// //       try {
// //         const response = await getAPI(`/get-quote`, {}, true);
// //         if (
// //           !response.hasError &&
// //           response.data &&
// //           Array.isArray(response.data.data)
// //         ) {
// //           setQuotes(response.data.data);
// //           console.log("quote data", response.data.data);

// //           //   [
// //           //     {
// //           //         "id": "679a07b447c9dbaf7828e2f5",
// //           //         "schoolId": "6788dec3cf93c947d08b0b23",
// //           //         "enquiryNumber": "ENQ17381477641296802",
// //           //         "deliveryAddress": "PQR Street",
// //           //         "deliveryLocation": "Faridabad, Haryana, India",
// //           //         "deliveryLandMark": "Railway Station Road",
// //           //         "deliveryPincode": "123456",
// //           //         "expectedDeliveryDate": "2025-01-29T00:00:00.000Z",
// //           //         "buyerStatus": "Quote Requested",
// //           //         "supplierStatus": "Quote Requested From EdProwise",
// //           //         "edprowiseStatus": "Quote Requested From Buyer",
// //           //         "createdAt": "2025-01-29T10:49:24.239Z",
// //           //         "updatedAt": "2025-01-29T10:49:24.239Z",
// //           //         "products": [
// //           //             {
// //           //                 "_id": "679a07b447c9dbaf7828e2f1",
// //           //                 "schoolId": "6788dec3cf93c947d08b0b23",
// //           //                 "categoryId": "6789a5497cf7927203f66171",
// //           //                 "subCategoryId": "6789a69e7cf7927203f6617d",
// //           //                 "description": "I want strong bench",
// //           //                 "productImage": "/Images/ProductImage/school-bench_1738147764094.jpg",
// //           //                 "unit": "Piece",
// //           //                 "quantity": 10,
// //           //                 "enquiryNumber": "ENQ17381477641296802",
// //           //                 "createdAt": "2025-01-29T10:49:24.146Z",
// //           //                 "updatedAt": "2025-01-29T10:49:24.146Z",
// //           //                 "__v": 0
// //           //             },
// //           //             {
// //           //                 "_id": "679a07b447c9dbaf7828e2f3",
// //           //                 "schoolId": "6788dec3cf93c947d08b0b23",
// //           //                 "categoryId": "678f505c6e1ed92982459e88",
// //           //                 "subCategoryId": "678f51f66e1ed92982459eb4",
// //           //                 "description": "I want strong table",
// //           //                 "productImage": "/Images/ProductImage/office-table_1738147764096.jpg",
// //           //                 "unit": "Piece",
// //           //                 "quantity": 2,
// //           //                 "enquiryNumber": "ENQ17381477641296802",
// //           //                 "createdAt": "2025-01-29T10:49:24.194Z",
// //           //                 "updatedAt": "2025-01-29T10:49:24.194Z",
// //           //                 "__v": 0
// //           //             }
// //           //         ]
// //           //     },
// //           //     {
// //           //         "id": "679a08cde89a8882e9b3fd86",
// //           //         "schoolId": "6788dec3cf93c947d08b0b23",
// //           //         "enquiryNumber": "ENQ17381480456191726",
// //           //         "deliveryAddress": "PQR Street",
// //           //         "deliveryLocation": "Faridabad, Haryana, India",
// //           //         "deliveryLandMark": "Railway Station Road",
// //           //         "deliveryPincode": "123456",
// //           //         "expectedDeliveryDate": "2025-01-29T00:00:00.000Z",
// //           //         "buyerStatus": "Quote Requested",
// //           //         "supplierStatus": "Quote Requested From EdProwise",
// //           //         "edprowiseStatus": "Quote Requested From Buyer",
// //           //         "createdAt": "2025-01-29T10:54:05.672Z",
// //           //         "updatedAt": "2025-01-29T10:54:05.672Z",
// //           //         "products": [
// //           //             {
// //           //                 "_id": "679a08cde89a8882e9b3fd84",
// //           //                 "schoolId": "6788dec3cf93c947d08b0b23",
// //           //                 "categoryId": "678f506d6e1ed92982459e8a",
// //           //                 "subCategoryId": "678f528d6e1ed92982459ec9",
// //           //                 "description": "I want to make robust",
// //           //                 "unit": "Project",
// //           //                 "quantity": 1,
// //           //                 "enquiryNumber": "ENQ17381480456191726",
// //           //                 "createdAt": "2025-01-29T10:54:05.630Z",
// //           //                 "updatedAt": "2025-01-29T10:54:05.630Z",
// //           //                 "__v": 0
// //           //             }
// //           //         ]
// //           //     },
// //           //     {
// //           //         "id": "679a0a5c80c9108ad9d094d3",
// //           //         "schoolId": "6788dec3cf93c947d08b0b23",
// //           //         "enquiryNumber": "ENQ17381484446202945",
// //           //         "deliveryAddress": "PQR Street",
// //           //         "deliveryLocation": "Faridabad, Haryana, India",
// //           //         "deliveryLandMark": "Railway Station Road",
// //           //         "deliveryPincode": "123456",
// //           //         "expectedDeliveryDate": "2025-01-29T00:00:00.000Z",
// //           //         "buyerStatus": "Quote Requested",
// //           //         "supplierStatus": "Quote Requested From EdProwise",
// //           //         "edprowiseStatus": "Quote Requested From Buyer",
// //           //         "createdAt": "2025-01-29T11:00:44.746Z",
// //           //         "updatedAt": "2025-01-29T11:00:44.746Z",
// //           //         "products": [
// //           //             {
// //           //                 "_id": "679a0a5c80c9108ad9d094cf",
// //           //                 "schoolId": "6788dec3cf93c947d08b0b23",
// //           //                 "categoryId": "678f505c6e1ed92982459e88",
// //           //                 "subCategoryId": "678f52486e1ed92982459ec3",
// //           //                 "description": "xyz",
// //           //                 "productImage": "/Images/ProductImage/school-bench_1738148444598.jpg",
// //           //                 "unit": "Piece",
// //           //                 "quantity": 10,
// //           //                 "enquiryNumber": "ENQ17381484446202945",
// //           //                 "createdAt": "2025-01-29T11:00:44.641Z",
// //           //                 "updatedAt": "2025-01-29T11:00:44.641Z",
// //           //                 "__v": 0
// //           //             },
// //           //             {
// //           //                 "_id": "679a0a5c80c9108ad9d094d1",
// //           //                 "schoolId": "6788dec3cf93c947d08b0b23",
// //           //                 "categoryId": "678f506d6e1ed92982459e8a",
// //           //                 "subCategoryId": "678f528d6e1ed92982459ec9",
// //           //                 "description": "xyz",
// //           //                 "unit": "Project",
// //           //                 "quantity": 1,
// //           //                 "enquiryNumber": "ENQ17381484446202945",
// //           //                 "createdAt": "2025-01-29T11:00:44.698Z",
// //           //                 "updatedAt": "2025-01-29T11:00:44.698Z",
// //           //                 "__v": 0
// //           //             }
// //           //         ]
// //           //     }
// //           // ]
// //         } else {
// //           console.error("Invalid response format or error in response");
// //         }
// //       } catch (err) {
// //         console.error("Error fetching quote:", err);
// //       }
// //     };

// //     fetchSchoolData(); // Call the function to fetch data
// //   }, []);

// //   return (
// //     <>
// //       <div className="container-fluid">
// //         <div className="row">
// //           <div className="col-xl-12">
// //             <div className="card">
// //               <div className="card-header d-flex justify-content-between align-items-center gap-1">
// //                 <h4 className="card-title flex-grow-1">
// //                   All Request Quote List
// //                 </h4>
// //                 <Link
// //                   // onClick={(event) => navigateToRequestQuote(event)}
// //                   className="btn btn-sm btn-primary"
// //                 >
// //                   Request Quote
// //                 </Link>
// //                 <div className="text-end">
// //                   <Link className="btn btn-sm btn-outline-light">Export</Link>
// //                 </div>
// //               </div>
// //               <div>
// //                 {quotes.length > 0 ? (
// //                   <div className="table-responsive">
// //                     <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
// //                       <thead className="bg-light-subtle">
// //                         <tr>
// //                           <th style={{ width: 20 }}>
// //                             <div className="form-check ms-1">
// //                               <input
// //                                 type="checkbox"
// //                                 className="form-check-input"
// //                                 id="customCheck1"
// //                               />
// //                               <label
// //                                 className="form-check-label"
// //                                 htmlFor="customCheck1"
// //                               />
// //                             </div>
// //                           </th>
// //                           <th>Enquiry No.</th>
// //                           <th className="text-start">
// //                             Product Required Image & Name
// //                           </th>
// //                           <th>Product Required (Category)</th>
// //                           <th>Quantity</th>
// //                           <th>Unit</th>
// //                           <th>Status</th>
// //                           <th>Action</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {quotes.map((quote) => (
// //                           <tr key={quote.id}>
// //                             <td>
// //                               <div className="form-check ms-1">
// //                                 <input
// //                                   type="checkbox"
// //                                   className="form-check-input"
// //                                   id={`customCheck${quote.id}`}
// //                                 />
// //                                 <label
// //                                   className="form-check-label"
// //                                   htmlFor={`customCheck${quote.id}`}
// //                                 >
// //                                   &nbsp;
// //                                 </label>
// //                               </div>
// //                             </td>
// //                             <td>{quote.enquiryNo}</td>

// //                             {quote.products.map((product) => (
// //                               <li key={product._id}>
// //                                 <td>
// //                                   <div className="d-flex align-items-center gap-2">
// //                                     <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
// //                                       <img
// //                                         src={product.productImage}
// //                                         alt={product.subCategoryId}
// //                                         className="avatar-md"
// //                                       />
// //                                     </div>
// //                                     <div>
// //                                       <Link className="text-dark fw-medium fs-15">
// //                                         {product.subCategoryId}
// //                                       </Link>
// //                                     </div>
// //                                   </div>
// //                                 </td>
// //                                 <td>{product.categoryId}</td>
// //                                 <td>{product.quantity}</td>
// //                                 <td>{product.unit}</td>
// //                               </li>
// //                             ))}

// //                             <td>{quote.buyerStatus}</td>

// //                             <td>
// //                               <div className="d-flex gap-2">
// //                                 <Link
// //                                   className="btn btn-light btn-sm"
// //                                   // onClick={(event) =>
// //                                   // navigateToViewRequestedQuote(event, product)
// //                                   // }
// //                                 >
// //                                   <iconify-icon
// //                                     icon="solar:eye-broken"
// //                                     className="align-middle fs-18"
// //                                   />
// //                                 </Link>
// //                                 <button
// //                                   type="button"
// //                                   className="btn btn-primary custom-submit-button"
// //                                   // onClick={(event) =>
// //                                   // navigateToViewQuoteTable(event, quotes)
// //                                   // }
// //                                 >
// //                                   View Quote
// //                                 </button>
// //                               </div>
// //                             </td>
// //                           </tr>
// //                         ))}
// //                       </tbody>
// //                     </table>
// //                   </div>
// //                 ) : (
// //                   <p>No quote requests available.</p>
// //                 )}
// //                 {/* end table-responsive */}
// //               </div>
// //               <div className="card-footer border-top">
// //                 <nav aria-label="Page navigation example">
// //                   <ul className="pagination justify-content-end mb-0">
// //                     <li className="page-item">
// //                       <Link className="page-link">Previous</Link>
// //                     </li>
// //                     <li className="page-item active">
// //                       <Link className="page-link">1</Link>
// //                     </li>
// //                     <li className="page-item">
// //                       <Link className="page-link">2</Link>
// //                     </li>
// //                     <li className="page-item">
// //                       <Link className="page-link">3</Link>
// //                     </li>
// //                     <li className="page-item">
// //                       <Link className="page-link">Next</Link>
// //                     </li>
// //                   </ul>
// //                 </nav>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default TrackQuoteTable;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import getAPI from "../../../../api/getAPI";

// const TrackQuoteTable = ({}) => {
//   const [quotes, setQuotes] = useState([]);

//   useEffect(() => {
//     const fetchSchoolData = async () => {
//       try {
//         const response = await getAPI(`/get-quote`, {}, true);
//         if (
//           !response.hasError &&
//           response.data &&
//           Array.isArray(response.data.data)
//         ) {
//           setQuotes(response.data.data);
//           console.log("quote data", response.data.data);
//         } else {
//           console.error("Invalid response format or error in response");
//         }
//       } catch (err) {
//         console.error("Error fetching quote:", err);
//       }
//     };

//     fetchSchoolData(); // Call the function to fetch data
//   }, []);

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card">
//               <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                 <h4 className="card-title flex-grow-1">
//                   All Request Quote List
//                 </h4>
//                 <Link
//                   // onClick={(event) => navigateToRequestQuote(event)}
//                   className="btn btn-sm btn-primary"
//                 >
//                   Request Quote
//                 </Link>
//                 <div className="text-end">
//                   <Link className="btn btn-sm btn-outline-light">Export</Link>
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

//                             {quote.products.slice(0, 1).map((product) => (
//                               <li key={product._id}>
//                                 <td>
//                                   <div className="d-flex align-items-center gap-2">
//                                     <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
//                                       <img
//                                         src={product.productImage}
//                                         alt={product.subCategoryId}
//                                         className="avatar-md"
//                                       />
//                                     </div>
//                                     <div>
//                                       <Link className="text-dark fw-medium fs-15">
//                                         {product.subCategoryId}
//                                       </Link>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td>{product.categoryId}</td>
//                                 <td>{product.quantity}</td>
//                                 <td>{product.unit}</td>
//                               </li>
//                             ))}

//                             <td>{quote.buyerStatus}</td>

//                             <td>
//                               <div className="d-flex gap-2">
//                                 <Link
//                                   className="btn btn-light btn-sm"
//                                   // onClick={(event) =>
//                                   // navigateToViewRequestedQuote(event, product)
//                                   // }
//                                 >
//                                   <iconify-icon
//                                     icon="solar:eye-broken"
//                                     className="align-middle fs-18"
//                                   />
//                                 </Link>
//                                 <button
//                                   type="button"
//                                   className="btn btn-primary custom-submit-button"
//                                   // onClick={(event) =>
//                                   // navigateToViewQuoteTable(event, quotes)
//                                   // }
//                                 >
//                                   View Quote
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p>No quote requests available.</p>
//                 )}
//                 {/* end table-responsive */}
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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import getAPI from "../../../../api/getAPI";

// const TrackQuoteTable = ({}) => {
//   const [quotes, setQuotes] = useState([]);
//   // const location = useLocation();

//   useEffect(() => {
//     const fetchSchoolData = async () => {
//       try {
//         const response = await getAPI(`/get-quote`, {}, true);
//         if (
//           !response.hasError &&
//           response.data &&
//           Array.isArray(response.data.data)
//         ) {
//           setQuotes(response.data.data);
//           console.log("quote data", response.data.data);

//           //   [
//           //     {
//           //         "id": "679a07b447c9dbaf7828e2f5",
//           //         "schoolId": "6788dec3cf93c947d08b0b23",
//           //         "enquiryNumber": "ENQ17381477641296802",
//           //         "deliveryAddress": "PQR Street",
//           //         "deliveryLocation": "Faridabad, Haryana, India",
//           //         "deliveryLandMark": "Railway Station Road",
//           //         "deliveryPincode": "123456",
//           //         "expectedDeliveryDate": "2025-01-29T00:00:00.000Z",
//           //         "buyerStatus": "Quote Requested",
//           //         "supplierStatus": "Quote Requested From EdProwise",
//           //         "edprowiseStatus": "Quote Requested From Buyer",
//           //         "createdAt": "2025-01-29T10:49:24.239Z",
//           //         "updatedAt": "2025-01-29T10:49:24.239Z",
//           //         "products": [
//           //             {
//           //                 "_id": "679a07b447c9dbaf7828e2f1",
//           //                 "schoolId": "6788dec3cf93c947d08b0b23",
//           //                 "categoryId": "6789a5497cf7927203f66171",
//           //                 "subCategoryId": "6789a69e7cf7927203f6617d",
//           //                 "description": "I want strong bench",
//           //                 "productImage": "/Images/ProductImage/school-bench_1738147764094.jpg",
//           //                 "unit": "Piece",
//           //                 "quantity": 10,
//           //                 "enquiryNumber": "ENQ17381477641296802",
//           //                 "createdAt": "2025-01-29T10:49:24.146Z",
//           //                 "updatedAt": "2025-01-29T10:49:24.146Z",
//           //                 "__v": 0
//           //             },
//           //             {
//           //                 "_id": "679a07b447c9dbaf7828e2f3",
//           //                 "schoolId": "6788dec3cf93c947d08b0b23",
//           //                 "categoryId": "678f505c6e1ed92982459e88",
//           //                 "subCategoryId": "678f51f66e1ed92982459eb4",
//           //                 "description": "I want strong table",
//           //                 "productImage": "/Images/ProductImage/office-table_1738147764096.jpg",
//           //                 "unit": "Piece",
//           //                 "quantity": 2,
//           //                 "enquiryNumber": "ENQ17381477641296802",
//           //                 "createdAt": "2025-01-29T10:49:24.194Z",
//           //                 "updatedAt": "2025-01-29T10:49:24.194Z",
//           //                 "__v": 0
//           //             }
//           //         ]
//           //     },
//           //     {
//           //         "id": "679a08cde89a8882e9b3fd86",
//           //         "schoolId": "6788dec3cf93c947d08b0b23",
//           //         "enquiryNumber": "ENQ17381480456191726",
//           //         "deliveryAddress": "PQR Street",
//           //         "deliveryLocation": "Faridabad, Haryana, India",
//           //         "deliveryLandMark": "Railway Station Road",
//           //         "deliveryPincode": "123456",
//           //         "expectedDeliveryDate": "2025-01-29T00:00:00.000Z",
//           //         "buyerStatus": "Quote Requested",
//           //         "supplierStatus": "Quote Requested From EdProwise",
//           //         "edprowiseStatus": "Quote Requested From Buyer",
//           //         "createdAt": "2025-01-29T10:54:05.672Z",
//           //         "updatedAt": "2025-01-29T10:54:05.672Z",
//           //         "products": [
//           //             {
//           //                 "_id": "679a08cde89a8882e9b3fd84",
//           //                 "schoolId": "6788dec3cf93c947d08b0b23",
//           //                 "categoryId": "678f506d6e1ed92982459e8a",
//           //                 "subCategoryId": "678f528d6e1ed92982459ec9",
//           //                 "description": "I want to make robust",
//           //                 "unit": "Project",
//           //                 "quantity": 1,
//           //                 "enquiryNumber": "ENQ17381480456191726",
//           //                 "createdAt": "2025-01-29T10:54:05.630Z",
//           //                 "updatedAt": "2025-01-29T10:54:05.630Z",
//           //                 "__v": 0
//           //             }
//           //         ]
//           //     },
//           //     {
//           //         "id": "679a0a5c80c9108ad9d094d3",
//           //         "schoolId": "6788dec3cf93c947d08b0b23",
//           //         "enquiryNumber": "ENQ17381484446202945",
//           //         "deliveryAddress": "PQR Street",
//           //         "deliveryLocation": "Faridabad, Haryana, India",
//           //         "deliveryLandMark": "Railway Station Road",
//           //         "deliveryPincode": "123456",
//           //         "expectedDeliveryDate": "2025-01-29T00:00:00.000Z",
//           //         "buyerStatus": "Quote Requested",
//           //         "supplierStatus": "Quote Requested From EdProwise",
//           //         "edprowiseStatus": "Quote Requested From Buyer",
//           //         "createdAt": "2025-01-29T11:00:44.746Z",
//           //         "updatedAt": "2025-01-29T11:00:44.746Z",
//           //         "products": [
//           //             {
//           //                 "_id": "679a0a5c80c9108ad9d094cf",
//           //                 "schoolId": "6788dec3cf93c947d08b0b23",
//           //                 "categoryId": "678f505c6e1ed92982459e88",
//           //                 "subCategoryId": "678f52486e1ed92982459ec3",
//           //                 "description": "xyz",
//           //                 "productImage": "/Images/ProductImage/school-bench_1738148444598.jpg",
//           //                 "unit": "Piece",
//           //                 "quantity": 10,
//           //                 "enquiryNumber": "ENQ17381484446202945",
//           //                 "createdAt": "2025-01-29T11:00:44.641Z",
//           //                 "updatedAt": "2025-01-29T11:00:44.641Z",
//           //                 "__v": 0
//           //             },
//           //             {
//           //                 "_id": "679a0a5c80c9108ad9d094d1",
//           //                 "schoolId": "6788dec3cf93c947d08b0b23",
//           //                 "categoryId": "678f506d6e1ed92982459e8a",
//           //                 "subCategoryId": "678f528d6e1ed92982459ec9",
//           //                 "description": "xyz",
//           //                 "unit": "Project",
//           //                 "quantity": 1,
//           //                 "enquiryNumber": "ENQ17381484446202945",
//           //                 "createdAt": "2025-01-29T11:00:44.698Z",
//           //                 "updatedAt": "2025-01-29T11:00:44.698Z",
//           //                 "__v": 0
//           //             }
//           //         ]
//           //     }
//           // ]
//         } else {
//           console.error("Invalid response format or error in response");
//         }
//       } catch (err) {
//         console.error("Error fetching quote:", err);
//       }
//     };

//     fetchSchoolData(); // Call the function to fetch data
//   }, []);

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card">
//               <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                 <h4 className="card-title flex-grow-1">
//                   All Request Quote List
//                 </h4>
//                 <Link
//                   // onClick={(event) => navigateToRequestQuote(event)}
//                   className="btn btn-sm btn-primary"
//                 >
//                   Request Quote
//                 </Link>
//                 <div className="text-end">
//                   <Link className="btn btn-sm btn-outline-light">Export</Link>
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
//                             <td>{quote.enquiryNo}</td>

//                             {quote.products.map((product) => (
//                               <li key={product._id}>
//                                 <td>
//                                   <div className="d-flex align-items-center gap-2">
//                                     <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
//                                       <img
//                                         src={product.productImage}
//                                         alt={product.subCategoryId}
//                                         className="avatar-md"
//                                       />
//                                     </div>
//                                     <div>
//                                       <Link className="text-dark fw-medium fs-15">
//                                         {product.subCategoryId}
//                                       </Link>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td>{product.categoryId}</td>
//                                 <td>{product.quantity}</td>
//                                 <td>{product.unit}</td>
//                               </li>
//                             ))}

//                             <td>{quote.buyerStatus}</td>

//                             <td>
//                               <div className="d-flex gap-2">
//                                 <Link
//                                   className="btn btn-light btn-sm"
//                                   // onClick={(event) =>
//                                   // navigateToViewRequestedQuote(event, product)
//                                   // }
//                                 >
//                                   <iconify-icon
//                                     icon="solar:eye-broken"
//                                     className="align-middle fs-18"
//                                   />
//                                 </Link>
//                                 <button
//                                   type="button"
//                                   className="btn btn-primary custom-submit-button"
//                                   // onClick={(event) =>
//                                   // navigateToViewQuoteTable(event, quotes)
//                                   // }
//                                 >
//                                   View Quote
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <p>No quote requests available.</p>
//                 )}
//                 {/* end table-responsive */}
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getAPI from "../../../../api/getAPI";

const TrackQuoteTable = ({}) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await getAPI(`/get-quote`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setQuotes(response.data.data);
          console.log("quote data", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchSchoolData(); // Call the function to fetch data
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  All Request Quote List
                </h4>
                <Link
                  // onClick={(event) => navigateToRequestQuote(event)}
                  className="btn btn-sm btn-primary"
                >
                  Request Quote
                </Link>
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
                          <th className="text-start">
                            Product Required Image & Name
                          </th>
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
                                <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                  <img
                                    src={quote.productImage}
                                    alt={quote.subCategoryId}
                                    className="avatar-md"
                                  />
                                </div>
                                <div>
                                  <Link className="text-dark fw-medium fs-15">
                                    {quote.subCategoryId}
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>{quote.categoryId}</td>
                            <td>{quote.quantity}</td>
                            <td>{quote.unit}</td>

                            <td>{quote.buyerStatus}</td>

                            <td>
                              <div className="d-flex gap-2">
                                <Link
                                  className="btn btn-light btn-sm"
                                  // onClick={(event) =>
                                  // navigateToViewRequestedQuote(event, product)
                                  // }
                                >
                                  <iconify-icon
                                    icon="solar:eye-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                <button
                                  type="button"
                                  className="btn btn-primary custom-submit-button"
                                  // onClick={(event) =>
                                  // navigateToViewQuoteTable(event, quotes)
                                  // }
                                >
                                  View Quote
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No quote requests available.</p>
                )}
                {/* end table-responsive */}
              </div>
              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <Link className="page-link">Previous</Link>
                    </li>
                    <li className="page-item active">
                      <Link className="page-link">1</Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link">2</Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link">3</Link>
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
      </div>
    </>
  );
};

export default TrackQuoteTable;
