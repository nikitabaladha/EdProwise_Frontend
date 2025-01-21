import React, { useState, useEffect } from "react";
import putAPI from "../../../api/putAPI";
import getAPI from "../../../api/getAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CityData from "../../CityData.json";
import { useLocation } from "react-router-dom";

const UpdateSellerProfile = () => {
  const location = useLocation();
  const profileId = location.state?._id;

  const navigate = useNavigate();

  const fetchSellerProfileData = async () => {
    try {
      const response = await getAPI(`/seller-profile`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        const profileData = response.data.data;
        setFormData({
          companyName: profileData.companyName || "",
          companyType: profileData.companyType || "",
          edprowiseProfile: profileData.edprowiseProfile || null,
          gstin: profileData.gstin || "",
          pan: profileData.pan || "",
          tan: profileData.tan || "",
          cin: profileData.cin || "",
          address: profileData.address || "",
          cityStateCountry: profileData.cityStateCountry || "",
          landmark: profileData.landmark || "",
          pincode: profileData.pincode || "",
          contactNo: profileData.contactNo || "",
          alternateContactNo: profileData.alternateContactNo || "",
          emailId: profileData.emailId || "",
          accountNo: profileData.accountNo || "",
          ifsc: profileData.ifsc || "",
          accountHolderName: profileData.accountHolderName || "",
          bankName: profileData.bankName || "",
          branchName: profileData.branchName || "",
          noOfEmployees: profileData.noOfEmployees || "",
          ceoName: profileData.ceoName || "",
          turnover: profileData.turnover || "",
        });

        console.log("seller data from heder", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Seller data:", err);
    }
  };

  useEffect(() => {
    fetchSellerProfileData();
  }, []);

  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    sellerProfile: null,
    gstin: "",
    pan: "",
    tan: "",
    cin: "",
    address: "",
    cityStateCountry: "",
    landmark: "",
    pincode: "",
    contactNo: "",
    alternateContactNo: "",
    emailId: "",
    accountNo: "",
    ifsc: "",
    accountHolderName: "",
    bankName: "",
    branchName: "",
    noOfEmployees: "",
    ceoName: "",
    turnover: "",
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [dealingProducts, setDealingProducts] = useState([
    { categoryId: "", subCategoryIds: [] },
  ]);

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

  const handleCategoryChange = async (categoryId) => {
    if (subCategories[categoryId]) return;

    try {
      const response = await getAPI(`/sub-category/${categoryId}`, {}, true);
      if (!response.hasError && Array.isArray(response.data.data)) {
        setSubCategories((prev) => ({
          ...prev,
          [categoryId]: response.data.data,
        }));
      } else {
        console.error("Error fetching subcategories.");
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  const addDealingProduct = () => {
    setDealingProducts((prev) => [
      ...prev,
      { categoryId: "", subCategoryIds: [] },
    ]);
  };

  const handleDealingProductChange = (index, field, value) => {
    const updatedProducts = [...dealingProducts];
    if (field === "categoryId") {
      updatedProducts[index] = { categoryId: value, subCategoryIds: [] };
      handleCategoryChange(value);
    } else if (field === "subCategoryIds") {
      updatedProducts[index].subCategoryIds = value;
    }
    setDealingProducts(updatedProducts);
  };

  const removeDealingProduct = (index) => {
    const updatedProducts = [...dealingProducts];
    updatedProducts.splice(index, 1);
    setDealingProducts(updatedProducts);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    dealingProducts.forEach((product, index) => {
      data.append(`dealingProducts[${index}][categoryId]`, product.categoryId);
      product.subCategoryIds.forEach((subCategoryId, subIndex) => {
        data.append(
          `dealingProducts[${index}][subCategoryIds][${subIndex}]`,
          subCategoryId
        );
      });
    });

    try {
      const response = await putAPI(
        "/seller-profile",
        data,
        { "Content-Type": "multipart/form-data" },
        true
      );
      if (!response.hasError) {
        console.log("profile storage data", response.data.data);
        const userId = response.data.data.sellerId;

        setFormData({
          companyName: "",
          companyType: "",
          sellerProfile: null,
          gstin: "",
          pan: "",
          tan: "",
          cin: "",
          address: "",
          cityStateCountry: "",
          landmark: "",
          pincode: "",
          contactNo: "",
          alternateContactNo: "",
          emailId: "",
          accountNo: "",
          ifsc: "",
          accountHolderName: "",
          bankName: "",
          branchName: "",
          noOfEmployees: "",
          ceoName: "",
          turnover: "",
        });
        setDealingProducts([]);
        const updatedUserResponse = await getAPI(`/get-seller-by-id/${userId}`);
        if (!updatedUserResponse.hasError) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify(updatedUserResponse.data.data)
          );
        }
        toast.success("Seller Profile added successfully");
        navigate("/seller-dashboard");
      } else {
        toast.error(response.message || "Failed to add seller profile");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title custom-heading-font">
                      Add Your Profile
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <h4 className="card-title text-center custom-heading-font">
                    Company Detail
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          className="form-control"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="companyType" className="form-label">
                          Company Type
                        </label>
                        <select
                          id="companyType"
                          name="companyType"
                          className="form-control"
                          value={formData.companyType}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Company Type</option>
                          <option value="Public Limited">Public Limited</option>
                          <option value="Private Limited">
                            Private Limited
                          </option>
                          <option value="Partnership">Partnership</option>
                          <option value="Sole Proprietor">
                            Sole Proprietor
                          </option>
                          <option value="HUF">HUF</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="gstin" className="form-label">
                          GSTIN
                        </label>
                        <input
                          type="text"
                          id="gstin"
                          name="gstin"
                          className="form-control"
                          value={formData.gstin}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="pan" className="form-label">
                          PAN Number
                        </label>
                        <input
                          type="text"
                          id="pan"
                          name="pan"
                          className="form-control"
                          value={formData.pan}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="tan" className="form-label">
                          TAN Number
                        </label>
                        <input
                          type="text"
                          id="tan"
                          name="tan"
                          className="form-control"
                          value={formData.tan}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="cin" className="form-label">
                          CIN Number
                        </label>
                        <input
                          type="text"
                          id="cin"
                          name="cin"
                          className="form-control"
                          value={formData.cin}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="card-title text-center custom-heading-font">
                    Address Details
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="cityStateCountry"
                          className="form-label"
                        >
                          City State Country Location
                        </label>
                        <select
                          id="cityStateCountry"
                          name="cityStateCountry"
                          className="form-control"
                          value={formData.cityStateCountry}
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
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="landmark" className="form-label">
                          Land Mark
                        </label>
                        <input
                          type="text"
                          id="landmark"
                          name="landmark"
                          className="form-control"
                          value={formData.landmark}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="pincode" className="form-label">
                          Pin Code
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          className="form-control"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="card-title text-center custom-heading-font">
                    Contact Details
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="contactNo" className="form-label">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          id="contactNo"
                          name="contactNo"
                          className="form-control"
                          value={formData.contactNo}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="alternateContactNo"
                          className="form-label"
                        >
                          Alternate Contact Number
                        </label>
                        <input
                          type="tel"
                          id="alternateContactNo"
                          name="alternateContactNo"
                          className="form-control"
                          value={formData.alternateContactNo}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="emailId" className="form-label">
                          Email ID
                        </label>
                        <input
                          type="email"
                          id="emailId"
                          name="emailId"
                          className="form-control"
                          value={formData.emailId}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="sellerProfile" className="form-label">
                          Profile Image
                        </label>
                        <input
                          type="file"
                          id="sellerProfile"
                          name="sellerProfile"
                          className="form-control"
                          accept="image/*"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font">
                    Bank Details
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="accountNo" className="form-label">
                          Bank Account Number
                        </label>
                        <input
                          type="text"
                          id="accountNo"
                          name="accountNo"
                          className="form-control"
                          value={formData.accountNo}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="ifsc" className="form-label">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          id="ifsc"
                          name="ifsc"
                          className="form-control"
                          value={formData.ifsc}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="bankName" className="form-label">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          id="bankName"
                          name="bankName"
                          className="form-control"
                          value={formData.bankName}
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
                          htmlFor="accountHolderName"
                          className="form-label"
                        >
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          id="accountHolderName"
                          name="accountHolderName"
                          className="form-control"
                          value={formData.accountHolderName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="branchName" className="form-label">
                          Branch Name
                        </label>
                        <input
                          type="text"
                          id="branchName"
                          name="branchName"
                          className="form-control"
                          value={formData.branchName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="card-title text-center custom-heading-font">
                    Additional Details
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="noOfEmployees" className="form-label">
                          Number Of Employees
                        </label>
                        <select
                          id="noOfEmployees"
                          name="noOfEmployees"
                          className="form-control"
                          value={formData.noOfEmployees}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Number Of Employees</option>
                          <option value="1 to 10 Employees">
                            1 to 10 Employees
                          </option>
                          <option value="11 to 25 Employees">
                            11 to 25 Employees
                          </option>
                          <option value="25 to 50 Employees">
                            25 to 50 Employees
                          </option>
                          <option value="50 to 100 Employees">
                            50 to 100 Employees
                          </option>
                          <option value="50 to 100 Employees">
                            50 to 100 Employees
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="ceoName" className="form-label">
                          CEO Name
                        </label>
                        <input
                          type="text"
                          id="ceoName"
                          name="ceoName"
                          className="form-control"
                          value={formData.ceoName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="turnover" className="form-label">
                          Company Turnover
                        </label>
                        <input
                          type="number"
                          id="turnover"
                          name="turnover"
                          className="form-control"
                          value={formData.turnover}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="card-title text-center custom-heading-font">
                    Dealing Products
                  </h4>
                  <hr></hr>
                  <div className="row">
                    {dealingProducts.map((product, index) => (
                      <div key={index} className="mb-3">
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="category" className="form-label">
                              Category
                            </label>
                            <select
                              className="form-control"
                              value={product.categoryId}
                              onChange={(e) =>
                                handleDealingProductChange(
                                  index,
                                  "categoryId",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Category</option>
                              {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.categoryName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label
                              htmlFor="subCategories"
                              className="form-label"
                            >
                              Subcategories
                            </label>
                            <div>
                              {(subCategories[product.categoryId] || []).map(
                                (subCategory) => (
                                  <div
                                    key={subCategory.id}
                                    className="form-check ms-1"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`subCategory-${subCategory.id}`}
                                      value={subCategory.id}
                                      checked={product.subCategoryIds.includes(
                                        subCategory.id
                                      )}
                                      onChange={(e) => {
                                        const selectedSubCategories = e.target
                                          .checked
                                          ? [
                                              ...product.subCategoryIds,
                                              subCategory.id,
                                            ]
                                          : product.subCategoryIds.filter(
                                              (id) => id !== subCategory.id
                                            );
                                        handleDealingProductChange(
                                          index,
                                          "subCategoryIds",
                                          selectedSubCategories
                                        );
                                      }}
                                      className="form-check-input"
                                    />
                                    <label
                                      htmlFor={`subCategory-${subCategory.id}`}
                                      className="form-label"
                                    >
                                      {subCategory.subCategoryName}
                                    </label>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger mt-2"
                          onClick={() => removeDealingProduct(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="btn btn-secondary mb-3"
                    onClick={addDealingProduct}
                  >
                    Add Another Product
                  </button>

                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Submit Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSellerProfile;
