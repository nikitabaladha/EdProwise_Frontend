import React, { useState, useEffect } from "react";

import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AddressModal from "./AddressModal";

const RequestQuote = () => {
  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryId: "",
    description: "",
    productImage: null,
    unit: "",
    quantity: "",
  });
  const [cart, setCart] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productImage") {
      setFormData((prev) => ({ ...prev, productImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    console.log(formData);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (
      !formData.categoryId ||
      !formData.subCategoryId ||
      !formData.description ||
      !formData.unit ||
      !formData.quantity
    ) {
      toast.error("Please fill all required fields");
      setIsFormValid(false);
      return;
    }

    const selectedCategory = categories.find(
      (cat) => cat.id === formData.categoryId
    );

    const selectedSubCategory = subCategories.find(
      (subCat) => subCat.id === formData.subCategoryId
    );

    setCart((prevCart) => [
      ...prevCart,
      {
        ...formData,
        id: prevCart.length + 1,
        categoryName: selectedCategory ? selectedCategory.categoryName : "",
        subCategoryName: selectedSubCategory
          ? selectedSubCategory.subCategoryName
          : "",
      },
    ]);

    setFormData({
      categoryId: "",
      subCategoryId: "",
      description: "",
      productImage: null,
      unit: "",
      quantity: "",
    });
    document.getElementById("productImage").value = "";

    toast.success("Product added to cart!");
    setIsFormValid(true);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAPI("/category", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("Error fetching categories.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      categoryId: selectedCategoryId,
      subCategoryId: "",
    }));

    if (selectedCategoryId) {
      try {
        const response = await getAPI(
          `/sub-category/${selectedCategoryId}`,
          {},
          true
        );
        if (!response.hasError && Array.isArray(response.data.data)) {
          setSubCategories(response.data.data);
        } else {
          console.error("Error fetching subcategories.");
          setSubCategories([]);
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
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
                        name="categoryId"
                        className="form-control"
                        value={formData.categoryId}
                        onChange={handleCategoryChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="subCategory" className="form-label">
                        Product Required – Select sub category
                      </label>

                      <select
                        id="subCategory"
                        name="subCategoryId"
                        className="form-control"
                        value={formData.subCategoryId}
                        onChange={handleChange}
                        required
                        disabled={subCategories.length === 0}
                      >
                        <option value="">Select Sub Category</option>
                        {subCategories.map((subCategory) => (
                          <option key={subCategory.id} value={subCategory.id}>
                            {subCategory.subCategoryName}
                          </option>
                        ))}
                      </select>
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
                        Product Description (Any Comments)
                      </label>
                      <input
                        type="text"
                        id="productDescription"
                        name="description"
                        className="form-control"
                        value={formData.description}
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
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="quantity" className="form-label">
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="form-control"
                        value={formData.quantity}
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
                    Add To Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
                    onClick={handleOpenModal}
                  >
                    Request Quote
                  </button>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th>Product Required – Category</th>
                        <th>Product Required – Sub category</th>
                        <th>Product Description</th>
                        <th>Product Image</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={index}>
                          <td>{item.categoryName} </td>
                          <td>{item.subCategoryName}</td>
                          <td>{item.description}</td>

                          <td>
                            <div className="d-flex align-items-center">
                              <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                                {item.productImage && (
                                  <img
                                    src={URL.createObjectURL(item.productImage)}
                                    alt={item.description}
                                    className="avatar-md"
                                  />
                                )}
                              </div>
                            </div>
                          </td>
                          <td>{item.unit}</td>
                          <td>{item.quantity}</td>
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
      {isModalOpen && (
        <AddressModal
          onClose={handleCloseModal}
          cart={cart}
          formData={formData}
        />
      )}
    </div>
  );
};

export default RequestQuote;
