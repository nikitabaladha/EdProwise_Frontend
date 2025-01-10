// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import CityData from "../../../../CityData.json";
// import { Link } from "react-router-dom";

// const categories = {
//   "School Desk & Bench (Senior School)": [
//     "School Desk & Bench - Wooden",
//     "School Desk & Bench - Steel",
//     "School Desk & Bench - Wooden & Steel Combine",
//     "Others",
//   ],
//   "School Desk & Bench (Play School & KG)": [
//     "Kids School Desk & Bench - Wooden",
//     "Kids School Desk & Bench - Steel",
//     "Kids School Desk & Bench - Wooden & Steel Combine",
//     "Others",
//   ],
//   "Office Furniture": [
//     "Plastic Chair",
//     "Waiting Chair - 2 Seater",
//     "Waiting Chair - 3 Seater",
//     "Office Table",
//     "Office Chair",
//     "Sofa Set - 1 Seater",
//     "Sofa Set - 2 Seater",
//     "Sofa Set - 3 Seater",
//     "Others",
//   ],
// };

// const RequestQuoteTable = () => {
//   const [products, setProducts] = useState([
//     {
//       category: "",
//       subCategory: "",
//       productDescription: "",
//       productImage: null,
//       unit: "",
//       qty: "",
//     },
//   ]);

//   const navigate = useNavigate();

//   const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
//     cities.map((city) => `${city}, ${state}, India`)
//   );

//   const handleChange = (index, e) => {
//     const { name, value, files } = e.target;
//     const updatedProducts = [...products];
//     if (name === "productImage") {
//       updatedProducts[index][name] = files[0];
//     } else {
//       updatedProducts[index][name] = value;
//     }
//     setProducts(updatedProducts);
//   };

//   const handleAddProduct = () => {
//     setProducts([
//       ...products,
//       {
//         category: "",
//         subCategory: "",
//         productDescription: "",
//         productImage: null,
//         unit: "",
//         qty: "",
//       },
//     ]);
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedProducts = products.filter((_, i) => i !== index);
//     setProducts(updatedProducts);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting form data:", products);

//     // toast.success("Quote request submitted successfully!");
//     // setProducts([
//     //   {
//     //     category: "",
//     //     subCategory: "",
//     //     productDescription: "",
//     //     productImage: null,
//     //     deliveryAddress: "",
//     //     pinCode: "",
//     //     deliveryLocation: "",
//     //     unit: "",
//     //     qty: "",
//     //     deliveryExpectedDate: "",
//     //   },
//     // ]);
//     navigate(-1);
//   };

//   return (
//     <div className="row p-2">
//       <div className="col-md-12">
//         <div className="card">
//           <div className="card-header d-flex justify-content-between align-items-center gap-1">
//             <button
//               type="button"
//               className="btn btn-primary custom-submit-button"
//               onClick={handleAddProduct}
//             >
//               Add Product
//             </button>
//             <h4 className="card-title flex-grow-1 m-0 text-center">
//               Request New Quote
//             </h4>
//             <div className="text-end">
//               <Link className="btn btn-sm btn-outline-light">Export</Link>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="table-responsive">
//               <table className="table align-middle mb-0 table-hover table-centered table-nowrap">
//                 <thead className="bg-light-subtle">
//                   <tr>
//                     <th>Product Required – Select category</th>
//                     <th>Product Required – Select sub category</th>
//                     <th>Product Description (Any Comments)</th>
//                     <th>Product Images (If any)</th>
//                     <th>Unit</th>
//                     <th>Quantity</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {products.map((product, index) => (
//                     <tr key={index}>
//                       <td>
//                         <select
//                           name="category"
//                           className="form-control"
//                           value={product.category}
//                           onChange={(e) => handleChange(index, e)}
//                         >
//                           <option value="">Select Category</option>
//                           {Object.keys(categories).map((category) => (
//                             <option key={category} value={category}>
//                               {category}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td>
//                         <select
//                           name="subCategory"
//                           className="form-control"
//                           value={product.subCategory}
//                           onChange={(e) => handleChange(index, e)}
//                         >
//                           <option value="">Select Sub Category</option>
//                           {categories[product.category] &&
//                             categories[product.category].map((subCategory) => (
//                               <option key={subCategory} value={subCategory}>
//                                 {subCategory}
//                               </option>
//                             ))}
//                         </select>
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           name="productDescription"
//                           className="form-control"
//                           value={product.productDescription}
//                           onChange={(e) => handleChange(index, e)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="file"
//                           name="productImage"
//                           className="form-control"
//                           onChange={(e) => handleChange(index, e)}
//                           accept="image/*"
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           name="unit"
//                           className="form-control"
//                           value={product.unit}
//                           onChange={(e) => handleChange(index, e)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           name="qty"
//                           className="form-control"
//                           value={product.qty}
//                           onChange={(e) => handleChange(index, e)}
//                         />
//                       </td>
//                       <td>
//                         <button
//                           type="button"
//                           className="btn btn-danger"
//                           onClick={() => handleRemoveProduct(index)}
//                         >
//                           Remove
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="text-end m-2">
//               <button type="submit" className="btn btn-success me-2">
//                 {/* i want that as soon as i click on submit button of this table it must display the filled data in below table do it for me */}
//                 Add to Cart
//               </button>
//               <button type="button" className="btn btn-secondary">
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//         <div className="table-responsive">
//           <table className="table align-middle mb-0 table-hover table-centered table-nowrap">
//             <thead className="bg-light-subtle">
//               <tr>
//                 <th style={{ width: 20 }}>
//                   <div className="form-check ms-1">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       id="customCheck1"
//                     />
//                     <label
//                       className="form-check-label"
//                       htmlFor="customCheck1"
//                     />
//                   </div>
//                 </th>
//                 <th>Product Required – Select category</th>
//                 <th>Product Required – Select sub category</th>
//                 <th>Product Description (Any Comments)</th>
//                 <th>Product Images (If any)</th>
//                 <th>Unit</th>
//                 <th>Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product.id}>
//                   <td>
//                     <div className="form-check ms-1">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         id={`customCheck${product.id}`}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor={`customCheck${product.id}`}
//                       >
//                         &nbsp;
//                       </label>
//                     </div>
//                   </td>
//                   <td>{product.category}</td>
//                   <td>{product.subCategory}</td>
//                   <td>{product.productDescription}</td>
//                   <td>{product.productDescription}</td>
//                   <td>{product.unit}</td>
//                   <td>{product.qty}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestQuoteTable;

// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import CityData from "../../../../CityData.json";
// import { Link } from "react-router-dom";

// const categories = {
//   "School Desk & Bench (Senior School)": [
//     "School Desk & Bench - Wooden",
//     "School Desk & Bench - Steel",
//     "School Desk & Bench - Wooden & Steel Combine",
//     "Others",
//   ],
//   "School Desk & Bench (Play School & KG)": [
//     "Kids School Desk & Bench - Wooden",
//     "Kids School Desk & Bench - Steel",
//     "Kids School Desk & Bench - Wooden & Steel Combine",
//     "Others",
//   ],
//   "Office Furniture": [
//     "Plastic Chair",
//     "Waiting Chair - 2 Seater",
//     "Waiting Chair - 3 Seater",
//     "Office Table",
//     "Office Chair",
//     "Sofa Set - 1 Seater",
//     "Sofa Set - 2 Seater",
//     "Sofa Set - 3 Seater",
//     "Others",
//   ],
// };

// const RequestQuoteTable = () => {
//   const [products, setProducts] = useState([
//     {
//       category: "",
//       subCategory: "",
//       productDescription: "",
//       productImage: null,
//       unit: "",
//       qty: "",
//     },
//   ]);

//   const [formData, setFormData] = useState({
//     category: "",
//     subCategory: "",
//     productDescription: "",
//     productImage: null,
//     deliveryAddress: "",
//     pinCode: "",
//     deliveryLocation: "",
//     unit: "",
//     qty: "",
//     deliveryExpectedDate: "",
//   });

//   const [cartProducts, setCartProducts] = useState([]);

//   const navigate = useNavigate();

//   const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
//     cities.map((city) => `${city}, ${state}, India`)
//   );

//   const handleChange = (index, e) => {
//     const { name, value, files } = e.target;
//     const updatedProducts = [...products];
//     if (name === "productImage") {
//       updatedProducts[index][name] = files[0];
//     } else {
//       updatedProducts[index][name] = value;
//     }
//     setProducts(updatedProducts);
//   };

//   const handleAddProduct = () => {
//     setProducts([
//       ...products,
//       {
//         category: "",
//         subCategory: "",
//         productDescription: "",
//         productImage: null,
//         unit: "",
//         qty: "",
//       },
//     ]);
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedProducts = products.filter((_, i) => i !== index);
//     setProducts(updatedProducts);
//   };

//   const handleSubmitToCart = (e) => {
//     e.preventDefault();
//     console.log("Submitting form data:", products);

//     // Update the cart products with the submitted products
//     setCartProducts(products);

//     // Show a success message
//     toast.success("Products added to cart!");
//   };

//   const handleSubmit = (e) => {
//     // now call will go to backend post api to store all products
//   }
//   }

//   return (
//     <>
//       <div className="container">
//         <div className="row p-2">
//           <div className="col-md-12">
//             <div className="card">
//               <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                 <button
//                   type="button"
//                   className="btn btn-primary custom-submit-button"
//                   onClick={handleAddProduct}
//                 >
//                   Add Product
//                 </button>
//                 <h4 className="card-title flex-grow-1 m-0 text-center">
//                   Request New Quote
//                 </h4>
//                 <div className="text-end">
//                   <Link className="btn btn-sm btn-outline-light">Export</Link>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmitToCart}>
//                 <div className="table-responsive">
//                   <table className="table align-middle mb-0 table-hover table-centered table-nowrap">
//                     <thead className="bg-light-subtle">
//                       <tr>
//                         <th>Product Required – Select category</th>
//                         <th>Product Required – Select sub category</th>
//                         <th>Product Description (Any Comments)</th>
//                         <th>Product Images (If any)</th>
//                         <th>Unit</th>
//                         <th>Quantity</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {products.map((product, index) => (
//                         <tr key={index}>
//                           <td>
//                             <select
//                               name="category"
//                               className="form-control"
//                               value={product.category}
//                               onChange={(e) => handleChange(index, e)}
//                             >
//                               <option value="">Select Category</option>
//                               {Object.keys(categories).map((category) => (
//                                 <option key={category} value={category}>
//                                   {category}
//                                 </option>
//                               ))}
//                             </select>
//                           </td>
//                           <td>
//                             <select
//                               name="subCategory"
//                               className="form-control"
//                               value={product.subCategory}
//                               onChange={(e) => handleChange(index, e)}
//                             >
//                               <option value="">Select Sub Category</option>
//                               {categories[product.category] &&
//                                 categories[product.category].map(
//                                   (subCategory) => (
//                                     <option
//                                       key={subCategory}
//                                       value={subCategory}
//                                     >
//                                       {subCategory}
//                                     </option>
//                                   )
//                                 )}
//                             </select>
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="productDescription"
//                               className="form-control"
//                               value={product.productDescription}
//                               onChange={(e) => handleChange(index, e)}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="file"
//                               name="productImage"
//                               className="form-control"
//                               onChange={(e) => handleChange(index, e)}
//                               accept="image/*"
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="unit"
//                               className="form-control"
//                               value={product.unit}
//                               onChange={(e) => handleChange(index, e)}
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               name="qty"
//                               className="form-control"
//                               value={product.qty}
//                               onChange={(e) => handleChange(index, e)}
//                             />
//                           </td>
//                           <td>
//                             <button
//                               type="button"
//                               className="btn btn-danger"
//                               onClick={() => handleRemoveProduct(index)}
//                             >
//                               Remove
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="text-end m-2">
//                   <button type="submit" className="btn btn-success me-2">
//                     Add to Cart
//                   </button>
//                   <button type="button" className="btn btn-secondary">
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card m-2">
//               <div className="card-body custom-heading-padding">
//                 <div className="container">
//                   <div className="card-header mb-2">
//                     <h4 className="card-title text-center custom-heading-font">
//                       Requested Quote Details
//                     </h4>
//                   </div>
//                 </div>
//                 <div className="table-responsive">
//                   <table className="table align-middle mb-0 table-hover table-centered table-nowrap">
//                     <thead className="bg-light-subtle">
//                       <tr>
//                         <th style={{ width: 20 }}>
//                           <div className="form-check ms-1">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               id="customCheck1"
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor="customCheck1"
//                             />
//                           </div>
//                         </th>
//                         <th>Product Required – Select category</th>
//                         <th>Product Required – Select sub category</th>
//                         <th>Product Description (Any Comments)</th>
//                         <th>Product Images (If any)</th>
//                         <th>Unit</th>
//                         <th>Quantity</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {cartProducts.map((product) => (
//                         <tr key={product.id}>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id={`customCheck${product.id}`}
//                               />
//                               <label
//                                 className="form-check-label"
//                                 htmlFor={`customCheck${product.id}`}
//                               >
//                                 &nbsp;
//                               </label>
//                             </div>
//                           </td>
//                           <td>{product.category}</td>
//                           <td>{product.subCategory}</td>
//                           <td>{product.productDescription}</td>
//                           <td>{product.productDescription}</td>
//                           <td>{product.unit}</td>
//                           <td>{product.qty}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="d-flex justify-content-between mt-2">
//                   <button
//                     type="button"
//                     className="btn btn-primary custom-submit-button"
//                   >
//                     Submit
//                     {/* as soon as i click on submit button i want to open form below  */}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card m-2">
//               <div className="card-body custom-heading-padding">
//                 <div className="container">
//                   <div className="card-header mb-2">
//                     <h4 className="card-title text-center custom-heading-font">
//                       Request New Quote
//                     </h4>
//                   </div>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-md-12">
//                       {" "}
//                       <div className="mb-3">
//                         <label htmlFor="deliveryAddress" className="form-label">
//                           Address for Delivery
//                         </label>
//                         <textarea
//                           className="form-control"
//                           id="deliveryAddress"
//                           name="deliveryAddress"
//                           rows={3}
//                           value={formData.deliveryAddress}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label
//                           htmlFor="deliveryLocation"
//                           className="form-label"
//                         >
//                           City-State-Country
//                         </label>
//                         <select
//                           id="deliveryLocation"
//                           name="deliveryLocation"
//                           className="form-control"
//                           value={formData.deliveryLocation}
//                           onChange={handleChange}
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
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="pinCode" className="form-label">
//                           Pin Code
//                         </label>
//                         <input
//                           type="text"
//                           id="pinCode"
//                           name="pinCode"
//                           className="form-control"
//                           value={formData.pinCode}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="text-end">
//                     <button
//                       type="submit"
//                       className="btn btn-primary custom-submit-button"
//                     >
//                       Request Quote
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RequestQuoteTable;

// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import CityData from "../../../../CityData.json";
// import { Link } from "react-router-dom";

// const categories = {
//   "School Desk & Bench (Senior School)": [
//     "School Desk & Bench - Wooden",
//     "School Desk & Bench - Steel",
//     "School Desk & Bench - Wooden & Steel Combine",
//     "Others",
//   ],
//   "School Desk & Bench (Play School & KG)": [
//     "Kids School Desk & Bench - Wooden",
//     "Kids School Desk & Bench - Steel",
//     "Kids School Desk & Bench - Wooden & Steel Combine",
//     "Others",
//   ],
//   "Office Furniture": [
//     "Plastic Chair",
//     "Waiting Chair - 2 Seater",
//     "Waiting Chair - 3 Seater",
//     "Office Table",
//     "Office Chair",
//     "Sofa Set - 1 Seater",
//     "Sofa Set - 2 Seater",
//     "Sofa Set - 3 Seater",
//     "Others",
//   ],
// };

// const RequestQuoteTable = () => {
//   const [products, setProducts] = useState([
//     {
//       category: "",
//       subCategory: "",
//       productDescription: "",
//       productImage: null,
//       unit: "",
//       qty: "",
//     },
//   ]);

//   const [formData, setFormData] = useState({
//     category: "",
//     subCategory: "",
//     productDescription: "",
//     productImage: null,
//     deliveryAddress: "",
//     pinCode: "",
//     deliveryLocation: "",
//     unit: "",
//     qty: "",
//     deliveryExpectedDate: "",
//   });

//   const [cartProducts, setCartProducts] = useState([]);

//   const [showForm, setShowForm] = useState(false);

//   const navigate = useNavigate();

//   const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
//     cities.map((city) => `${city}, ${state}, India`)
//   );

//   // const handleChange = (index, e) => {
//   //   const { name, value, files } = e.target;
//   //   const updatedProducts = [...products];
//   //   if (name === "productImage") {
//   //     updatedProducts[index][name] = files[0];
//   //   } else {
//   //     updatedProducts[index][name] = value;
//   //   }
//   //   setProducts(updatedProducts);
//   // };

//   const handleChange = (index, e) => {
//     const { name, value, files } = e.target;
//     const updatedProducts = [...products];
//     if (name === "productImage") {
//       updatedProducts[index][name] = files[0];
//     } else {
//       updatedProducts[index][name] = value;
//     }
//     setProducts(updatedProducts);
//   };

//   const handleAddProduct = () => {
//     setProducts([
//       ...products,
//       {
//         category: "",
//         subCategory: "",
//         productDescription: "",
//         productImage: null,
//         unit: "",
//         qty: "",
//       },
//     ]);
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedProducts = products.filter((_, i) => i !== index);
//     setProducts(updatedProducts);
//   };

//   const handleSubmitToCart = (e) => {
//     e.preventDefault();
//     console.log("Submitting form data:", products);

//     setCartProducts(products);

//     toast.success("Products added to cart!");
//   };

//   const handleSubmit = (e) => {
//     setShowForm(true);
//   };

//   return (
//     <div className="container">
//       <div className="row p-2">
//         <div className="col-md-12">
//           <div className="card">
//             <div className="card-header d-flex justify-content-between align-items-center gap-1">
//               <button
//                 type="button"
//                 className="btn btn-primary custom-submit-button"
//                 onClick={handleAddProduct}
//               >
//                 Add Product
//               </button>
//               <h4 className="card-title flex-grow-1 m-0 text-center">
//                 Request New Quote
//               </h4>
//               <div className="text-end">
//                 <Link className="btn btn-sm btn-outline-light">Export</Link>
//               </div>
//             </div>
//             <form onSubmit={handleSubmitToCart}>
//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-hover table-centered table-nowrap">
//                   <thead className="bg-light-subtle">
//                     <tr>
//                       <th>Product Required – Select category</th>
//                       <th>Product Required – Select sub category</th>
//                       <th>Product Description (Any Comments)</th>
//                       <th>Product Images (If any)</th>
//                       <th>Unit</th>
//                       <th>Quantity</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {products.map((product, index) => (
//                       <tr key={index}>
//                         <td>
//                           <select
//                             name="category"
//                             className="form-control"
//                             value={product.category}
//                             onChange={(e) => handleChange(index, e)}
//                           >
//                             <option value="">Select Category</option>
//                             {Object.keys(categories).map((category) => (
//                               <option key={category} value={category}>
//                                 {category}
//                               </option>
//                             ))}
//                           </select>
//                         </td>
//                         <td>
//                           <select
//                             name="subCategory"
//                             className="form-control"
//                             value={product.subCategory}
//                             onChange={(e) => handleChange(index, e)}
//                           >
//                             <option value="">Select Sub Category</option>
//                             {categories[product.category] &&
//                               categories[product.category].map(
//                                 (subCategory) => (
//                                   <option key={subCategory} value={subCategory}>
//                                     {subCategory}
//                                   </option>
//                                 )
//                               )}
//                           </select>
//                         </td>
//                         <td>
//                           <input
//                             type="text"
//                             name="productDescription"
//                             className="form-control"
//                             value={product.productDescription}
//                             onChange={(e) => handleChange(index, e)}
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="file"
//                             name="productImage"
//                             className="form-control"
//                             onChange={(e) => handleChange(index, e)}
//                             accept="image/*"
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="text" // Ensure this is set to "text"
//                             name="unit"
//                             className="form-control"
//                             value={product.unit} // Ensure this is correctly bound to the state
//                             onChange={(e) => handleChange(index, e)} // Ensure this is correctly wired
//                             style={{ width: "100px" }}
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="text"
//                             name="qty"
//                             className="form-control"
//                             value={product.qty}
//                             onChange={(e) => handleChange(index, e)}
//                           />
//                         </td>
//                         <td>
//                           <button
//                             type="button"
//                             className="btn btn-danger"
//                             onClick={() => handleRemoveProduct(index)}
//                           >
//                             Remove
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="text-end m-2">
//                 <button type="submit" className="btn btn-success me-2">
//                   Add to Cart
//                 </button>
//                 <button type="button" className="btn btn-secondary">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2">
//                   <h4 className="card-title text-center custom-heading-font">
//                     Your Product Cart
//                   </h4>
//                 </div>
//               </div>
//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-hover table-centered table-nowrap">
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
//                       <th>Product Required – Select category</th>
//                       <th>Product Required – Select sub category</th>
//                       <th>Product Description (Any Comments)</th>
//                       <th>Product Images (If any)</th>
//                       <th>Unit</th>
//                       <th>Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cartProducts.map((product) => (
//                       <tr key={product.id}>
//                         <td>
//                           <div className="form-check ms-1">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               id={`customCheck${product.id}`}
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor={`customCheck${product.id}`}
//                             >
//                               &nbsp;
//                             </label>
//                           </div>
//                         </td>
//                         <td>{product.category}</td>
//                         <td>{product.subCategory}</td>
//                         <td>{product.productDescription}</td>
//                         <td>{product.productDescription}</td>
//                         <td>{product.unit}</td>
//                         <td>{product.qty}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="d-flex justify-content-between mt-2">
//                 <button
//                   type="button"
//                   className="btn btn-primary custom-submit-button"
//                   onClick={handleSubmit}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* i am not able to write anything in below part why */}
//       {showForm && (
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card m-2">
//               <div className="card-body custom-heading-padding">
//                 <div className="container">
//                   <div className="card-header mb-2">
//                     <h4 className="card-title text-center custom-heading-font">
//                       Fill Address Detail
//                     </h4>
//                   </div>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-md-12">
//                       {" "}
//                       <div className="mb-3">
//                         <label htmlFor="deliveryAddress" className="form-label">
//                           Address for Delivery
//                         </label>
//                         <textarea
//                           className="form-control"
//                           id="deliveryAddress"
//                           name="deliveryAddress"
//                           rows={3}
//                           value={formData.deliveryAddress}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label
//                           htmlFor="deliveryLocation"
//                           className="form-label"
//                         >
//                           City-State-Country
//                         </label>
//                         <select
//                           id="deliveryLocation"
//                           name="deliveryLocation"
//                           className="form-control"
//                           value={formData.deliveryLocation}
//                           onChange={handleChange}
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
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="pinCode" className="form-label">
//                           Pin Code
//                         </label>
//                         <input
//                           type="text"
//                           id="pinCode"
//                           name="pinCode"
//                           className="form-control"
//                           value={formData.pinCode}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="text-end">
//                     <button
//                       type="submit"
//                       className="btn btn-primary custom-submit-button"
//                     >
//                       Request Quote
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestQuoteTable;

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CityData from "../../../../CityData.json";
import { Link } from "react-router-dom";

const categories = {
  "School Desk & Bench (Senior School)": [
    "School Desk & Bench - Wooden",
    "School Desk & Bench - Steel",
    "School Desk & Bench - Wooden & Steel Combine",
    "Others",
  ],
  "School Desk & Bench (Play School & KG)": [
    "Kids School Desk & Bench - Wooden",
    "Kids School Desk & Bench - Steel",
    "Kids School Desk & Bench - Wooden & Steel Combine",
    "Others",
  ],
  "Office Furniture": [
    "Plastic Chair",
    "Waiting Chair - 2 Seater",
    "Waiting Chair - 3 Seater",
    "Office Table",
    "Office Chair",
    "Sofa Set - 1 Seater",
    "Sofa Set - 2 Seater",
    "Sofa Set - 3 Seater",
    "Others",
  ],
};

const RequestQuoteTable = () => {
  const [products, setProducts] = useState([
    {
      category: "",
      subCategory: "",
      productDescription: "",
      productImage: null,
      unit: "",
      qty: "",
    },
  ]);

  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    productDescription: "",
    productImage: null,
    deliveryAddress: "",
    pinCode: "",
    deliveryLocation: "",
    unit: "",
    qty: "",
    deliveryExpectedDate: "",
  });

  const [cartProducts, setCartProducts] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedProducts = [...products];
    if (name === "productImage") {
      updatedProducts[index][name] = files[0];
    } else {
      updatedProducts[index][name] = value;
    }
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        category: "",
        subCategory: "",
        productDescription: "",
        productImage: null,
        unit: "",
        qty: "",
      },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmitToCart = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", products);

    setCartProducts(products);

    toast.success("Products added to cart!");
  };

  const handleSubmit = (e) => {
    setShowForm(true);
  };

  return (
    <div className="container">
      <div className="row p-2">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center gap-1">
              <button
                type="button"
                className="btn btn-primary custom-submit-button"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
              <h4 className="card-title flex-grow-1 m-0 text-center">
                Request New Quote
              </h4>
              <div className="text-end">
                <Link className="btn btn-sm btn-outline-light">Export</Link>
              </div>
            </div>
            <form onSubmit={handleSubmitToCart}>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered table-nowrap">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Product Required – Select category</th>
                      <th>Product Required – Select sub category</th>
                      <th>Product Description (Any Comments)</th>
                      <th>Product Images (If any)</th>
                      <th>Unit</th>
                      <th>Quantity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <select
                            name="category"
                            className="form-control"
                            value={product.category}
                            onChange={(e) => handleChange(index, e)}
                          >
                            <option value="">Select Category</option>
                            {Object.keys(categories).map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            name="subCategory"
                            className="form-control"
                            value={product.subCategory}
                            onChange={(e) => handleChange(index, e)}
                          >
                            <option value="">Select Sub Category</option>
                            {categories[product.category] &&
                              categories[product.category].map(
                                (subCategory) => (
                                  <option key={subCategory} value={subCategory}>
                                    {subCategory}
                                  </option>
                                )
                              )}
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            name="productDescription"
                            className="form-control"
                            value={product.productDescription}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            name="productImage"
                            className="form-control"
                            onChange={(e) => handleChange(index, e)}
                            accept="image/*"
                          />
                        </td>
                        <td>
                          <input
                            type="text" // Ensure this is set to "text"
                            name="unit"
                            className="form-control"
                            value={product.unit} // Ensure this is correctly bound to the state
                            onChange={(e) => handleChange(index, e)} // Ensure this is correctly wired
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="qty"
                            className="form-control"
                            value={product.qty}
                            onChange={(e) => handleChange(index, e)}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveProduct(index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-end m-2">
                <button type="submit" className="btn btn-success me-2">
                  Add to Cart
                </button>
                <button type="button" className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Your Product Cart
                  </h4>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered table-nowrap">
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
                      <th>Product Required – Select category</th>
                      <th>Product Required – Select sub category</th>
                      <th>Product Description (Any Comments)</th>
                      <th>Product Images (If any)</th>
                      <th>Unit</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`customCheck${product.id}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`customCheck${product.id}`}
                            >
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td>{product.subCategory}</td>
                        <td>{product.productDescription}</td>
                        <td>{product.productDescription}</td>
                        <td>{product.unit}</td>
                        <td>{product.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* i am not able to write anything in below part why */}
      {showForm && (
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Fill Address Detail
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="deliveryAddress" className="form-label">
                          Address for Delivery
                        </label>
                        <textarea
                          className="form-control"
                          id="deliveryAddress"
                          name="deliveryAddress"
                          rows={3}
                          value={formData.deliveryAddress}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="deliveryLocation"
                          className="form-label"
                        >
                          City-State-Country
                        </label>
                        <select
                          id="deliveryLocation"
                          name="deliveryLocation"
                          className="form-control"
                          value={formData.deliveryLocation}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select City-State-Country</option>
                          {cityOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="pinCode" className="form-label">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          id="pinCode"
                          name="pinCode"
                          className="form-control"
                          value={formData.pinCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Request Quote
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestQuoteTable;
