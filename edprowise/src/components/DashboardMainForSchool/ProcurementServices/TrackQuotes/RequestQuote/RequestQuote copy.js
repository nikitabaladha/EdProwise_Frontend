import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AddressModal from "./AddressModal";
import Select from "react-select";

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
      // !formData.description ||
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

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success("Product removed from cart!");
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
                    Request For Quote
                  </h4>
                </div>
              </div>
              <form onSubmit={handleAddToCart}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Product Required – Select category{" "}
                        <span className="text-danger">*</span>
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
                        Product Required – Select sub category{" "}
                        <span className="text-danger">*</span>
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
                        placeholder="Example : I want high quality product"
                        onChange={handleChange}
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
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="unit" className="form-label">
                        Unit <span className="text-danger">*</span>
                      </label>
                      {/* why select is not showing any list  */}
                      <Select
                        id="unit"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        required
                        isSearchable
                        classNamePrefix="react-select"
                        className="custom-react-select"
                      >
                        <option value="">Select Unit</option>
                        <option value="Piece">Piece</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Kg">Kg</option>
                        <option value="Project">Project</option>
                        <option value="Sq. feet">Sq. feet</option>
                        <option value="BAG - BAGS">BAG - BAGS</option>
                        <option value="BAL - BALE">BAL - BALE</option>
                        <option value="BDL - BUNDLES">BDL - BUNDLES</option>
                        <option value="BKL - BUCKLES">BKL - BUCKLES</option>
                        <option value="BOU - BILLION OF UNITS">
                          BOU - BILLION OF UNITS
                        </option>
                        <option value="BOX - BOX">BOX - BOX</option>
                        <option value="BTL - BOTTLES">BTL - BOTTLES</option>
                        <option value="BUN - BUNCHES">BUN - BUNCHES</option>
                        <option value="CAN - CANS">CAN - CANS</option>
                        <option value="CBM - CUBIC METERS">
                          CBM - CUBIC METERS
                        </option>
                        <option value="CCM - CUBIC CENTIMETERS">
                          CCM - CUBIC CENTIMETERS
                        </option>
                        <option value="CMS - CENTIMETERS">
                          CMS - CENTIMETERS
                        </option>
                        <option value="CTN - CARTONS">CTN - CARTONS</option>
                        <option value="DOZ - DOZENS">DOZ - DOZENS</option>
                        <option value="DRM - DRUMS">DRM - DRUMS</option>
                        <option value="GGK - GREAT GROSS">
                          GGK - GREAT GROSS
                        </option>
                        <option value="GMS - GRAMMES">GMS - GRAMMES</option>
                        <option value="GRS - GROSS">GRS - GROSS</option>
                        <option value="GYD - GROSS YARDS">
                          GYD - GROSS YARDS
                        </option>
                        <option value="KGS - KILOGRAMS">KGS - KILOGRAMS</option>
                        <option value="KLR - KILOLITRE">KLR - KILOLITRE</option>
                        <option value="KME - KILOMETRE">KME - KILOMETRE</option>
                        <option value="LTR - LITRES">LTR - LITRES</option>
                        <option value="MLT - MILILITRE">MLT - MILILITRE</option>
                        <option value="MTR - METERS">MTR - METERS</option>
                        <option value="MTS - METRIC TON">
                          MTS - METRIC TON
                        </option>
                        <option value="NOS - NUMBERS">NOS - NUMBERS</option>
                        <option value="OTH - OTHERS">OTH - OTHERS</option>
                        <option value="PAC - PACKS">PAC - PACKS</option>
                        <option value="PCS - PIECES">PCS - PIECES</option>
                        <option value="PRS - PAIRS">PRS - PAIRS</option>
                        <option value="QTL - QUINTAL">QTL - QUINTAL</option>
                        <option value="ROL - ROLLS">ROL - ROLLS</option>
                        <option value="SET - SETS">SET - SETS</option>
                        <option value="SQF - SQUARE FEET">
                          SQF - SQUARE FEET
                        </option>
                        <option value="SQM - SQUARE METERS">
                          SQM - SQUARE METERS
                        </option>
                        <option value="SQY - SQUARE YARDS">
                          SQY - SQUARE YARDS
                        </option>
                        <option value="TBS - TABLETS">TBS - TABLETS</option>
                        <option value="TGM - TEN GROSS">TGM - TEN GROSS</option>
                        <option value="THD - THOUSANDS">THD - THOUSANDS</option>
                        <option value="TON - TONNES">TON - TONNES</option>
                        <option value="TUB - TUBES">TUB - TUBES</option>
                        <option value="UGS - US GALLONS">
                          UGS - US GALLONS
                        </option>
                        <option value="UNT - UNITS">UNT - UNITS</option>
                        <option value="YDS - YARDS">YDS - YARDS</option>
                      </Select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="quantity" className="form-label">
                        Quantity <span className="text-danger">*</span>
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
                        placeholder="Example : 10"
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={index}>
                          <td>{item.categoryName} </td>
                          <td>{item.subCategoryName}</td>
                          <td>{item.description || "Not Provided"}</td>

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
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary custom-submit-button"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              Remove
                            </button>
                          </td>
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
