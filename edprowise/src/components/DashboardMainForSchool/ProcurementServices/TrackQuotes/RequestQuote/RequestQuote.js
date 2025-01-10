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

// const RequestQuote = () => {
//   const [formData, setFormData] = useState({
//     category: "",
//     subCategory: "",
//     productDescription: "",
//     productImage: null,
//     unit: "",
//     qty: "",
//     deliveryExpectedDate: "",
//   });

//   const navigate = useNavigate();

//   const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
//     cities.map((city) => `${city}, ${state}, India`)
//   );

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "productImage") {
//       setFormData((prev) => ({ ...prev, productImage: files[0] }));
//     } else if (name === "category") {
//       setFormData((prev) => ({
//         ...prev,
//         category: value,
//         subCategory: "",
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//   };

//   const subCategoryOptions = categories[formData.category] || [];

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2">
//                   <h4 className="card-title text-center custom-heading-font">
//                     Request New Quote
//                   </h4>
//                 </div>
//               </div>
//               <form onSubmit={handleAddToCart}>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor="category" className="form-label">
//                         Product Required – Select category
//                       </label>
//                       <select
//                         id="category"
//                         name="category"
//                         className="form-control"
//                         value={formData.category}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         {Object.keys(categories).map((category) => (
//                           <option key={category} value={category}>
//                             {category}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     {" "}
//                     <div className="mb-3">
//                       <label htmlFor="subCategory" className="form-label">
//                         Product Required – Select sub category
//                       </label>
//                       <select
//                         id="subCategory"
//                         name="subCategory"
//                         className="form-control"
//                         value={formData.subCategory}
//                         onChange={handleChange}
//                         required
//                         disabled={!subCategoryOptions.length}
//                       >
//                         <option value="">Select Sub Category</option>
//                         {subCategoryOptions.map((subCategory) => (
//                           <option key={subCategory} value={subCategory}>
//                             {subCategory}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6">
//                     {" "}
//                     <div className="mb-3">
//                       <label
//                         htmlFor="productDescription"
//                         className="form-label"
//                       >
//                         Product Description (Any Comments)
//                       </label>
//                       <input
//                         type="text"
//                         id="productDescription"
//                         name="productDescription"
//                         className="form-control"
//                         value={formData.productDescription}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor="productImage" className="form-label">
//                         Product Images (If any)
//                       </label>
//                       <input
//                         type="file"
//                         id="productImage"
//                         name="productImage"
//                         className="form-control"
//                         accept="image/*,application/pdf"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="unit" className="form-label">
//                         Unit
//                       </label>
//                       <select
//                         id="unit"
//                         name="unit"
//                         className="form-control"
//                         value={formData.unit}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Unit</option>
//                         <option value="Piece">Piece</option>
//                         <option value="Monthly">Monthly</option>
//                         <option value="Yearly">Yearly</option>
//                         <option value="Quarterly">Quarterly</option>
//                         <option value="Kg">Kg</option>
//                         <option value="Project">Project</option>
//                         <option value="Sq. feet">Sq. feet</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     {" "}
//                     <div className="mb-3">
//                       <label htmlFor="qty" className="form-label">
//                         Quantity
//                       </label>
//                       <input
//                         type="number"
//                         id="qty"
//                         name="qty"
//                         className="form-control"
//                         value={formData.qty}
//                         onChange={handleChange}
//                         required
//                         min="1"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label
//                         htmlFor="deliveryExpectedDate"
//                         className="form-label"
//                       >
//                         Delivery Expected Date
//                       </label>
//                       <input
//                         type="date"
//                         id="deliveryExpectedDate"
//                         name="deliveryExpectedDate"
//                         className="form-control"
//                         value={formData.deliveryExpectedDate}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-end">
//                   <button
//                     type="submit"
//                     className="btn btn-primary custom-submit-button"
//                   >
//                     Add To Cart

//                     {/* i want that as soon as user fill the form data and click on this Add To cart button i want to show below cart table which will be filled with all the data which is provided in form  */}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card">
//             <div className="card-header d-flex justify-content-between align-items-center gap-1">
//               <h4 className="card-title flex-grow-1">Cart</h4>
//               <div className="text-end">
//                 <Link className="btn btn-sm btn-outline-light">Export</Link>
//               </div>
//             </div>
//             <div>
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
//                     {products.map((quote) => (
//                       <tr key={quote.id}>
//                         <td>
//                           <div className="form-check ms-1">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               id={`customCheck${quote.id}`}
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor={`customCheck${quote.id}`}
//                             >
//                               &nbsp;
//                             </label>
//                           </div>
//                         </td>
//                         <td>{product.}</td>
//                         <td>{product.}</td>
//                         <td>{product.}</td>
//                         <td>{product.}</td>
//                         <td>{product.}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               {/* end table-responsive */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestQuote;

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

// const RequestQuote = () => {
//   const [formData, setFormData] = useState({
//     category: "",
//     subCategory: "",
//     productDescription: "",
//     productImage: null,
//     unit: "",
//     qty: "",
//     deliveryExpectedDate: "",
//   });
//   const [cart, setCart] = useState([]);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "productImage") {
//       setFormData((prev) => ({ ...prev, productImage: files[0] }));
//     } else if (name === "category") {
//       setFormData((prev) => ({
//         ...prev,
//         category: value,
//         subCategory: "",
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleAddToCart = (e) => {
//     e.preventDefault();

//     // Validate if all required fields are filled
//     if (
//       !formData.category ||
//       !formData.subCategory ||
//       !formData.productDescription ||
//       !formData.unit ||
//       !formData.qty ||
//       !formData.deliveryExpectedDate
//     ) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     // Add form data to cart
//     setCart((prevCart) => [
//       ...prevCart,
//       { ...formData, id: prevCart.length + 1 },
//     ]);

//     // Reset form fields
//     setFormData({
//       category: "",
//       subCategory: "",
//       productDescription: "",
//       productImage: null,
//       unit: "",
//       qty: "",
//       deliveryExpectedDate: "",
//     });

//     toast.success("Product added to cart!");
//   };

//   const subCategoryOptions = categories[formData.category] || [];

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2">
//                   <h4 className="card-title text-center custom-heading-font">
//                     Request New Quote
//                   </h4>
//                 </div>
//               </div>
//               <form onSubmit={handleAddToCart}>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor="category" className="form-label">
//                         Product Required – Select category
//                       </label>
//                       <select
//                         id="category"
//                         name="category"
//                         className="form-control"
//                         value={formData.category}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         {Object.keys(categories).map((category) => (
//                           <option key={category} value={category}>
//                             {category}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     {" "}
//                     <div className="mb-3">
//                       <label htmlFor="subCategory" className="form-label">
//                         Product Required – Select sub category
//                       </label>
//                       <select
//                         id="subCategory"
//                         name="subCategory"
//                         className="form-control"
//                         value={formData.subCategory}
//                         onChange={handleChange}
//                         required
//                         disabled={!subCategoryOptions.length}
//                       >
//                         <option value="">Select Sub Category</option>
//                         {subCategoryOptions.map((subCategory) => (
//                           <option key={subCategory} value={subCategory}>
//                             {subCategory}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6">
//                     {" "}
//                     <div className="mb-3">
//                       <label
//                         htmlFor="productDescription"
//                         className="form-label"
//                       >
//                         Product Description (Any Comments)
//                       </label>
//                       <input
//                         type="text"
//                         id="productDescription"
//                         name="productDescription"
//                         className="form-control"
//                         value={formData.productDescription}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor="productImage" className="form-label">
//                         Product Images (If any)
//                       </label>
//                       <input
//                         type="file"
//                         id="productImage"
//                         name="productImage"
//                         className="form-control"
//                         accept="image/*,application/pdf"
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="unit" className="form-label">
//                         Unit
//                       </label>
//                       <select
//                         id="unit"
//                         name="unit"
//                         className="form-control"
//                         value={formData.unit}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Unit</option>
//                         <option value="Piece">Piece</option>
//                         <option value="Monthly">Monthly</option>
//                         <option value="Yearly">Yearly</option>
//                         <option value="Quarterly">Quarterly</option>
//                         <option value="Kg">Kg</option>
//                         <option value="Project">Project</option>
//                         <option value="Sq. feet">Sq. feet</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     {" "}
//                     <div className="mb-3">
//                       <label htmlFor="qty" className="form-label">
//                         Quantity
//                       </label>
//                       <input
//                         type="number"
//                         id="qty"
//                         name="qty"
//                         className="form-control"
//                         value={formData.qty}
//                         onChange={handleChange}
//                         required
//                         min="1"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label
//                         htmlFor="deliveryExpectedDate"
//                         className="form-label"
//                       >
//                         Delivery Expected Date
//                       </label>
//                       <input
//                         type="date"
//                         id="deliveryExpectedDate"
//                         name="deliveryExpectedDate"
//                         className="form-control"
//                         value={formData.deliveryExpectedDate}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-end">
//                   <button
//                     type="submit"
//                     className="btn btn-primary custom-submit-button"
//                   >
//                     Add To Cart
//                     {/* i want that when i fill the complete form data and click on Add to cart then and then only show below cart table otherwise not */}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row p-2">
//         <div className="col-xl-12">
//           <div className="card">
//             <div className="card-header d-flex justify-content-between align-items-center gap-1">
//               <h4 className="card-title flex-grow-1">Cart</h4>

//               <div className="text-end">
//                 <button
//                   type="button"
//                   className="btn btn-primary custom-submit-button"
//                 >
//                   Request Quote
//                 </button>
//               </div>
//             </div>
//             <div>
//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-hover table-centered table-nowrap">
//                   <thead className="bg-light-subtle">
//                     <tr>
//                       <th>Product Required – Category</th>
//                       <th>Product Required – Sub category</th>
//                       <th>Product Description</th>
//                       <th>Product Image</th>
//                       <th>Unit</th>
//                       <th>Quantity</th>
//                       <th>Delivery Expected Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cart.map((item, index) => (
//                       <tr key={index}>
//                         <td>{item.category}</td>
//                         <td>{item.subCategory}</td>
//                         <td>{item.productDescription}</td>
//                         <div className="d-flex align-items-center">
//                           <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
//                             <img
//                               src={item.productImage}
//                               alt={item.subCategory}
//                               className="avatar-md"
//                             />
//                           </div>
//                         </div>
//                         <td>{item.unit}</td>
//                         <td>{item.qty}</td>
//                         <td>{item.deliveryExpectedDate}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestQuote;

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

const RequestQuote = () => {
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    productDescription: "",
    productImage: null,
    unit: "",
    qty: "",
    deliveryExpectedDate: "",
  });
  const [cart, setCart] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productImage") {
      setFormData((prev) => ({ ...prev, productImage: files[0] }));
    } else if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        subCategory: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    // Validate if all required fields are filled
    if (
      !formData.category ||
      !formData.subCategory ||
      !formData.productDescription ||
      !formData.unit ||
      !formData.qty ||
      !formData.deliveryExpectedDate
    ) {
      toast.error("Please fill all required fields");
      setIsFormValid(false); // Set form validity to false
      return;
    }

    // Add form data to cart
    setCart((prevCart) => [
      ...prevCart,
      { ...formData, id: prevCart.length + 1 },
    ]);

    // Reset form fields
    setFormData({
      category: "",
      subCategory: "",
      productDescription: "",
      productImage: null,
      unit: "",
      qty: "",
      deliveryExpectedDate: "",
    });

    toast.success("Product added to cart!");
    setIsFormValid(true); // Set form validity to true
  };

  const subCategoryOptions = categories[formData.category] || [];

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Request New Quote
                  </h4>
                </div>
              </div>
              <form onSubmit={handleAddToCart}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Product Required – Select category
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {Object.keys(categories).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="subCategory" className="form-label">
                        Product Required – Select sub category
                      </label>
                      <select
                        id="subCategory"
                        name="subCategory"
                        className="form-control"
                        value={formData.subCategory}
                        onChange={handleChange}
                        required
                        disabled={!subCategoryOptions.length}
                      >
                        <option value="">Select Sub Category</option>
                        {subCategoryOptions.map((subCategory) => (
                          <option key={subCategory} value={subCategory}>
                            {subCategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label
                        htmlFor="productDescription"
                        className="form-label"
                      >
                        Product Description (Any Comments)
                      </label>
                      <input
                        type="text"
                        id="productDescription"
                        name="productDescription"
                        className="form-control"
                        value={formData.productDescription}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="productImage" className="form-label">
                        Product Images (If any)
                      </label>
                      <input
                        type="file"
                        id="productImage"
                        name="productImage"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="unit" className="form-label">
                        Unit
                      </label>
                      <select
                        id="unit"
                        name="unit"
                        className="form-control"
                        value={formData.unit}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Unit</option>
                        <option value="Piece">Piece</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Kg">Kg</option>
                        <option value="Project">Project</option>
                        <option value="Sq. feet">Sq. feet</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="qty" className="form-label">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="qty"
                        name="qty"
                        className="form-control"
                        value={formData.qty}
                        onChange={handleChange}
                        required
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="deliveryExpectedDate"
                        className="form-label"
                      >
                        Delivery Expected Date
                      </label>
                      <input
                        type="date"
                        id="deliveryExpectedDate"
                        name="deliveryExpectedDate"
                        className="form-control"
                        value={formData.deliveryExpectedDate}
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
                    Add To Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Conditional rendering of the cart table */}
      {isFormValid && (
        <div className="row p-2">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">Cart</h4>
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th>Product Required – Category</th>
                        <th>Product Required – Sub category</th>
                        <th>Product Description</th>
                        <th>Product Image</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Delivery Expected Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={index}>
                          <td>{item.category}</td>
                          <td>{item.subCategory}</td>
                          <td>{item.productDescription}</td>
                          <div className="d-flex align-items-center">
                            <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                              <img
                                src={item.productImage}
                                alt={item.subCategory}
                                className="avatar-md"
                              />
                            </div>
                          </div>
                          <td>{item.unit}</td>
                          <td>{item.qty}</td>
                          <td>{item.deliveryExpectedDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestQuote;
