import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CityData from "../../../../CityData.json";

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
    productRequired: "",
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

  const navigate = useNavigate();

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Submitting form data:`, formData);

    toast.success("Quote request submitted successfully!");
    setFormData({
      productRequired: "",
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
    navigate(-1);
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
              <form onSubmit={handleSubmit}>
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
                    {" "}
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
                      <label htmlFor="deliveryLocation" className="form-label">
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
    </div>
  );
};

export default RequestQuote;
