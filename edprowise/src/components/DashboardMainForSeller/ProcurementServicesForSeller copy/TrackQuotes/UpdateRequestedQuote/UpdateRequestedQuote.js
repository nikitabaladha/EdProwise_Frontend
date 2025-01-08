import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRequestedQuote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    imageUrl: "",
    subCategory: "",
    productDescription: "",
    unit: "",
    qty: "",
    deliveryExpectedDate: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        imageUrl: product.imageUrl || "",
        subCategory: product.subCategory || "",
        productDescription: product.productDescription || "",
        unit: product.unit || "",
        qty: product.qty || "",
        deliveryExpectedDate: product.deliveryExpectedDate || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Updating form data:`, formData);

    toast.success("Quote updated successfully!");

    setFormData({
      imageUrl: "",
      subCategory: "",
      productDescription: "",
      unit: "",
      qty: "",
      deliveryExpectedDate: "",
    });

    navigate(-1);
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
                    Update Requested Quote
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="productImages" className="form-label">
                        Product Images
                      </label>

                      {/* File Input for Upload */}
                      <input
                        type="file"
                        id="productImages"
                        name="productImages"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData((prev) => ({
                            ...prev,
                            productImages: file,
                          }));
                        }}
                      />
                      <div>{formData.imageUrl}</div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="subCategory" className="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="subCategory"
                        name="subCategory"
                        className="form-control"
                        value={formData.subCategory}
                        onChange={handleChange}
                        required
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
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="productDescription"
                        className="form-label"
                      >
                        Product Description
                      </label>
                      <textarea
                        id="productDescription"
                        name="productDescription"
                        className="form-control"
                        value={formData.productDescription}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
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
                        <option value="" disabled>
                          Select Unit
                        </option>
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
                  <div className="col-md-3">
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
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Update Quote
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

export default UpdateRequestedQuote;
