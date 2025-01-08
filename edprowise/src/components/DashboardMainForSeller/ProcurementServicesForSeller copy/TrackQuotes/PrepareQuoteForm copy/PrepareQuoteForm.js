// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PrepareQuoteForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     slNo: "",
//     description: "",
//     hsnSaac: "",
//     listingRate: "",
//     edProwiseMargin: "",
//     qty: "",
//     finalRateBeforeDiscount: "",
//     discountPercentage: "",
//     finalRate: "",
//     taxableValue: "",
//     cgstRate: "",
//     cgstAmount: "",
//     sgstRate: "",
//     sgstAmount: "",
//     igstRate: "",
//     igstAmount: "",
//     amountBeforeGST: "",
//     discountAmount: "",
//     gstAmount: "",
//     totalAmount: "",
//     productImages: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Prepare Quote Data:", formData);
//     toast.success("Quote prepared successfully!");
//     onClose();
//   };

//   return (
//     <div className="container mt-4">
//       <h4 className="text-center mb-4">Prepare Quote</h4>
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           {/* Add inputs for each field */}
//           {[
//             { label: "S.L. No.", name: "slNo", type: "text" },
//             { label: "Description", name: "description", type: "text" },
//             { label: "HSN/SAAC", name: "hsnSaac", type: "text" },
//             { label: "Listing Rate", name: "listingRate", type: "number" },
//             {
//               label: "EdProwise Margin%",
//               name: "edProwiseMargin",
//               type: "number",
//             },
//             { label: "Qty", name: "qty", type: "number" },
//             {
//               label: "Final Rate Before Discount",
//               name: "finalRateBeforeDiscount",
//               type: "number",
//             },
//             { label: "Discount %", name: "discountPercentage", type: "number" },
//             { label: "Final Rate", name: "finalRate", type: "number" },
//             { label: "Taxable Value", name: "taxableValue", type: "number" },
//             { label: "CGST Rate", name: "cgstRate", type: "number" },
//             { label: "CGST Amount", name: "cgstAmount", type: "number" },
//             { label: "SGST Rate", name: "sgstRate", type: "number" },
//             { label: "SGST Amount", name: "sgstAmount", type: "number" },
//             { label: "IGST Rate", name: "igstRate", type: "number" },
//             { label: "IGST Amount", name: "igstAmount", type: "number" },
//             {
//               label: "Amount Before GST & Discount",
//               name: "amountBeforeGST",
//               type: "number",
//             },
//             {
//               label: "Discount Amount",
//               name: "discountAmount",
//               type: "number",
//             },
//             { label: "GST Amount", name: "gstAmount", type: "number" },
//             { label: "Total Amount", name: "totalAmount", type: "number" },
//           ].map(({ label, name, type }) => (
//             <div className="col-md-6 mb-3" key={name}>
//               <label htmlFor={name} className="form-label">
//                 {label}
//               </label>
//               <input
//                 type={type}
//                 id={name}
//                 name={name}
//                 className="form-control"
//                 value={formData[name]}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           ))}
//           <div className="col-md-6 mb-3">
//             <label htmlFor="productImages" className="form-label">
//               Upload Sample Images of Products
//             </label>
//             <input
//               type="file"
//               id="productImages"
//               name="productImages"
//               className="form-control"
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>
//         <div className="text-end">
//           <button type="submit" className="btn btn-success me-2">
//             Submit
//           </button>
//           <button type="button" className="btn btn-secondary" onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const SubmitQuote = () => {
//   const [showPrepareQuote, setShowPrepareQuote] = useState(false);

//   const handlePrepareQuoteClick = () => {
//     setShowPrepareQuote(true);
//   };

//   const handleClosePrepareQuote = () => {
//     setShowPrepareQuote(false);
//   };

//   return (
//     <div className="container">
//       {!showPrepareQuote ? (
//         <div>
//           {/* Existing Submit Quote Form */}
//           <h4>Submit Quote</h4>
//           <button className="btn btn-primary" onClick={handlePrepareQuoteClick}>
//             Prepare Quote
//           </button>
//         </div>
//       ) : (
//         <PrepareQuoteForm onClose={handleClosePrepareQuote} />
//       )}
//     </div>
//   );
// };

// export default SubmitQuote;

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrepareQuoteForm = ({ onClose }) => {
  const [products, setProducts] = useState([
    {
      slNo: "",
      description: "",
      hsnSaac: "",
      listingRate: "",
      edProwiseMargin: "",
      qty: "",
      finalRateBeforeDiscount: "",
      discountPercentage: "",
      finalRate: "",
      taxableValue: "",
      cgstRate: "",
      cgstAmount: "",
      sgstRate: "",
      sgstAmount: "",
      igstRate: "",
      igstAmount: "",
      amountBeforeGST: "",
      discountAmount: "",
      gstAmount: "",
      totalAmount: "",
      productImages: null,
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [name]: files ? files[0] : value,
    };
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        slNo: "",
        description: "",
        hsnSaac: "",
        listingRate: "",
        edProwiseMargin: "",
        qty: "",
        finalRateBeforeDiscount: "",
        discountPercentage: "",
        finalRate: "",
        taxableValue: "",
        cgstRate: "",
        cgstAmount: "",
        sgstRate: "",
        sgstAmount: "",
        igstRate: "",
        igstAmount: "",
        amountBeforeGST: "",
        discountAmount: "",
        gstAmount: "",
        totalAmount: "",
        productImages: null,
      },
    ]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prepare Quote Data:", products);
    toast.success("Quote prepared successfully!");
    onClose();
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Prepare Quote</h4>
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Field Name</th>
              {products.map((_, index) => (
                <th key={index}>
                  Product {index + 1}{" "}
                  <button
                    type="button"
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleRemoveProduct(index)}
                  >
                    Remove
                  </button>
                </th>
              ))}
              <th>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleAddProduct}
                >
                  Add Product
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "S.L. No.", name: "slNo" },
              { label: "Description", name: "description" },
              { label: "HSN/SAAC", name: "hsnSaac" },
              { label: "Listing Rate", name: "listingRate" },
              { label: "EdProwise Margin%", name: "edProwiseMargin" },
              { label: "Qty", name: "qty" },
              {
                label: "Final Rate Before Discount",
                name: "finalRateBeforeDiscount",
              },
              { label: "Discount %", name: "discountPercentage" },
              { label: "Final Rate", name: "finalRate" },
              { label: "Taxable Value", name: "taxableValue" },
              { label: "CGST Rate", name: "cgstRate" },
              { label: "CGST Amount", name: "cgstAmount" },
              { label: "SGST Rate", name: "sgstRate" },
              { label: "SGST Amount", name: "sgstAmount" },
              { label: "IGST Rate", name: "igstRate" },
              { label: "IGST Amount", name: "igstAmount" },
              {
                label: "Amount Before GST & Discount",
                name: "amountBeforeGST",
              },
              { label: "Discount Amount", name: "discountAmount" },
              { label: "GST Amount", name: "gstAmount" },
              { label: "Total Amount", name: "totalAmount" },
              {
                label: "Upload Sample Images",
                name: "productImages",
                type: "file",
              },
            ].map(({ label, name, type }) => (
              <tr key={name}>
                <td>{label}</td>
                {products.map((product, index) => (
                  <td key={index}>
                    <input
                      type={type || "text"}
                      name={name}
                      className="form-control"
                      value={
                        name === "productImages" ? undefined : product[name]
                      }
                      onChange={(e) => handleChange(index, e)}
                      required={name !== "productImages"}
                      {...(name === "productImages" && { accept: "image/*" })}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-end">
          <button type="submit" className="btn btn-success me-2">
            Submit
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const SubmitQuote = () => {
  const [showPrepareQuote, setShowPrepareQuote] = useState(false);

  const handlePrepareQuoteClick = () => {
    setShowPrepareQuote(true);
  };

  const handleClosePrepareQuote = () => {
    setShowPrepareQuote(false);
  };

  return (
    <div className="container">
      {!showPrepareQuote ? (
        <div>
          <h4>Submit Quote</h4>
          <button className="btn btn-primary" onClick={handlePrepareQuoteClick}>
            Prepare Quote
          </button>
        </div>
      ) : (
        <PrepareQuoteForm onClose={handleClosePrepareQuote} />
      )}
    </div>
  );
};

export default SubmitQuote;
