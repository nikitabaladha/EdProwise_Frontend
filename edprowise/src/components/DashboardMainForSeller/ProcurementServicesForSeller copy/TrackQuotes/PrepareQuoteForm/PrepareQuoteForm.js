import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrepareQuoteForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prepare Quote Data:", formData);
    toast.success("Quote prepared successfully!");
    onClose();
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Prepare Quote</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Add inputs for each field */}
          {[
            { label: "S.L. No.", name: "slNo", type: "text" },
            { label: "Description", name: "description", type: "text" },
            { label: "HSN/SAAC", name: "hsnSaac", type: "text" },
            { label: "Listing Rate", name: "listingRate", type: "number" },
            {
              label: "EdProwise Margin%",
              name: "edProwiseMargin",
              type: "number",
            },
            { label: "Qty", name: "qty", type: "number" },
            {
              label: "Final Rate Before Discount",
              name: "finalRateBeforeDiscount",
              type: "number",
            },
            { label: "Discount %", name: "discountPercentage", type: "number" },
            { label: "Final Rate", name: "finalRate", type: "number" },
            { label: "Taxable Value", name: "taxableValue", type: "number" },
            { label: "CGST Rate", name: "cgstRate", type: "number" },
            { label: "CGST Amount", name: "cgstAmount", type: "number" },
            { label: "SGST Rate", name: "sgstRate", type: "number" },
            { label: "SGST Amount", name: "sgstAmount", type: "number" },
            { label: "IGST Rate", name: "igstRate", type: "number" },
            { label: "IGST Amount", name: "igstAmount", type: "number" },
            {
              label: "Amount Before GST & Discount",
              name: "amountBeforeGST",
              type: "number",
            },
            {
              label: "Discount Amount",
              name: "discountAmount",
              type: "number",
            },
            { label: "GST Amount", name: "gstAmount", type: "number" },
            { label: "Total Amount", name: "totalAmount", type: "number" },
          ].map(({ label, name, type }) => (
            <div className="col-md-6 mb-3" key={name}>
              <label htmlFor={name} className="form-label">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                className="form-control"
                value={formData[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="col-md-6 mb-3">
            <label htmlFor="productImages" className="form-label">
              Upload Sample Images of Products
            </label>
            <input
              type="file"
              id="productImages"
              name="productImages"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
        </div>
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
          {/* Existing Submit Quote Form */}
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
