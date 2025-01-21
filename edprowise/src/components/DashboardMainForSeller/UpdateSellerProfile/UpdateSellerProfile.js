import React, { useState, useEffect } from "react";
import putAPI from "../../../api/putAPI";
import getAPI from "../../../api/getAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

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

        console.log("profile data from get api ", profileData);

        setFormData({
          companyName: profileData.companyName || "",
          companyType: profileData.companyType || "",
          edprowiseProfile: profileData.edprowiseProfile || null,
          dealingProducts: profileData.dealingProducts || [],
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
    dealingProducts: [],
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [allSubCategories, setAllSubCategories] = useState([]);

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

  useEffect(() => {
    const fetchAllSubCategories = async () => {
      try {
        const response = await getAPI("/sub-category", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setAllSubCategories(response.data.data);
          console.log("all sub-categories", response.data.data);
        } else {
          console.error("Error fetching categories.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchAllSubCategories();
  }, []);

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
        `/seller-profile/${profileId}`,
        data,
        { "Content-Type": "multipart/form-data" },
        true
      );
      if (!response.hasError) {
        console.log("profile storage data", response.data.data);

        setFormData({
          companyName: "",
          companyType: "",
          sellerProfile: null,
        });
        setDealingProducts([]);

        toast.success("Seller Profile updated successfully");
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

  console.log("Dealing Products:", formData.dealingProducts);

  //   [
  //     {
  //         "categoryId": {
  //             "_id": "6789a56d7cf7927203f66173",
  //             "categoryName": "School Desk & Bench (Play School & KG)",
  //             "mainCategoryId": "6789a3d9d08fa66bcc1dc5b2",
  //             "createdAt": "2025-01-17T00:33:49.284Z",
  //             "updatedAt": "2025-01-17T00:33:49.284Z",
  //             "__v": 0
  //         },
  //         "subCategoryIds": [
  //             {
  //                 "_id": "6789a7717cf7927203f66182",
  //                 "subCategoryName": "Kids School Desk & Bench - Wooden",
  //                 "categoryId": "6789a56d7cf7927203f66173",
  //                 "createdAt": "2025-01-17T00:42:25.458Z",
  //                 "updatedAt": "2025-01-17T00:42:25.458Z",
  //                 "__v": 0
  //             }
  //         ],
  //         "_id": "678ef82e0474749a63d0afd9"
  //     }
  // ]

  // console.log("All Subcategories:", allSubCategories);

  // [
  //   {
  //     subCategoryId: "6789a6727cf7927203f6617a",
  //     subCategoryName: "School Desk & Bench - Wooden",
  //     categoryId: "6789a5497cf7927203f66171",
  //     categoryName: "School Desk & Bench (Senior School)",
  //     mainCategoryId: "6789a3d9d08fa66bcc1dc5b2",
  //     mainCategoryName: "Procurement Services",
  //   },
  //   {
  //     subCategoryId: "6789a69e7cf7927203f6617d",
  //     subCategoryName: "School Desk & Bench - Steel",
  //     categoryId: "6789a5497cf7927203f66171",
  //     categoryName: "School Desk & Bench (Senior School)",
  //     mainCategoryId: "6789a3d9d08fa66bcc1dc5b2",
  //     mainCategoryName: "Procurement Services",
  //   },
  //   {
  //     subCategoryId: "6789a7717cf7927203f66182",
  //     subCategoryName: "Kids School Desk & Bench - Wooden",
  //     categoryId: "6789a56d7cf7927203f66173",
  //     categoryName: "School Desk & Bench (Play School & KG)",
  //     mainCategoryId: "6789a3d9d08fa66bcc1dc5b2",
  //     mainCategoryName: "Procurement Services",
  //   },
  //   {
  //     subCategoryId: "6789a7837cf7927203f66185",
  //     subCategoryName: "Kids School Desk & Bench - Steel",
  //     categoryId: "6789a56d7cf7927203f66173",
  //     categoryName: "School Desk & Bench (Play School & KG)",
  //     mainCategoryId: "6789a3d9d08fa66bcc1dc5b2",
  //     mainCategoryName: "Procurement Services",
  //   },
  // ];
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
                      Update Your Profile
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <h4 className="card-title text-center custom-heading-font">
                    Company Detail
                  </h4>
                  <hr />
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

                  <h4 className="card-title text-center custom-heading-font">
                    Dealing Products
                  </h4>
                  <hr />
                  <div className="row">
                    {formData?.dealingProducts &&
                      formData.dealingProducts.map((product, index) => (
                        <div key={index} className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="categoryName"
                                className="form-label"
                              >
                                Category
                              </label>
                              <h5>
                                <input
                                  type="checkbox"
                                  checked={true} // Always checked since this is existing data
                                  onChange={(e) => {
                                    const updatedProducts = [
                                      ...formData.dealingProducts,
                                    ];
                                    updatedProducts[index].isActive =
                                      e.target.checked;
                                    if (!e.target.checked) {
                                      updatedProducts[index].subCategoryIds =
                                        []; // Clear subcategories if unchecked
                                    }
                                    setFormData((prev) => ({
                                      ...prev,
                                      dealingProducts: updatedProducts,
                                    }));
                                  }}
                                  className="form-check-input"
                                />
                                {product.categoryId.categoryName}
                              </h5>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label
                                htmlFor="subCategoryName"
                                className="form-label"
                              >
                                Subcategory
                              </label>
                              <ul>
                                {allSubCategories
                                  .filter(
                                    (subCategory) =>
                                      subCategory.categoryId ===
                                      product.categoryId._id // Match category ID
                                  )
                                  .map((subCategory, subIndex) => {
                                    console.log(
                                      `Subcategory ID from function: ${subCategory._id}`
                                    );
                                    console.log(
                                      `Subcategory from function: ${subCategory}`
                                    );
                                    const isChecked =
                                      product.subCategoryIds.includes(
                                        subCategory._id
                                      );
                                    // can you tell me from which subcategory._id is coming i want to debug it
                                    return (
                                      <li key={subIndex}>
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={(e) => {
                                            const updatedProducts = [
                                              ...formData.dealingProducts,
                                            ];
                                            if (e.target.checked) {
                                              updatedProducts[
                                                index
                                              ].subCategoryIds.push(
                                                subCategory._id
                                              );
                                            } else {
                                              updatedProducts[
                                                index
                                              ].subCategoryIds =
                                                updatedProducts[
                                                  index
                                                ].subCategoryIds.filter(
                                                  (id) => id !== subCategory._id
                                                );
                                            }
                                            setFormData((prev) => ({
                                              ...prev,
                                              dealingProducts: updatedProducts,
                                            }));
                                          }}
                                          className="form-check-input"
                                        />
                                        {subCategory.subCategoryName}
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>
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
