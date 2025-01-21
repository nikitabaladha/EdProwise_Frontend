// import React, { useState, useEffect } from "react";
// import putAPI from "../../../api/putAPI";
// import getAPI from "../../../api/getAPI";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import CityData from "../../CityData.json";
// import { useLocation } from "react-router-dom";

// const UpdateSellerProfile = () => {
//   const location = useLocation();
//   const profileId = location.state?._id;

//   const navigate = useNavigate();

//   const fetchSellerProfileData = async () => {
//     try {
//       const response = await getAPI(`/seller-profile`, {}, true);

//       if (!response.hasError && response.data && response.data.data) {
//         const profileData = response.data.data;

//         console.log("profile data from get api ", profileData);

//         // below is the data i am getting from backed storage

//         //   {
//         //     "_id": "678c2af473a00c9c5e9fe74b",
//         //     "sellerId": "67765fb468d9c62aed09f0fc",
//         //     "companyName": "Example XYZ",
//         //     "companyType": "Private Limited",
//         //     "sellerProfile": "/Images/SellerProfile/user_4_jpg_1737372783466.jpg",
//         //     "dealingProducts": [
//         //         {
//         //             "categoryId": {
//         //                 "_id": "6789a56d7cf7927203f66173",
//         //                 "categoryName": "School Desk & Bench (Play School & KG)",
//         //                 "mainCategoryId": "6789a3d9d08fa66bcc1dc5b2",
//         //                 "createdAt": "2025-01-17T00:33:49.284Z",
//         //                 "updatedAt": "2025-01-17T00:33:49.284Z",
//         //                 "__v": 0
//         //             },
//         //             "subCategoryIds": [
//         //                 {
//         //                     "_id": "6789a7717cf7927203f66182",
//         //                     "subCategoryName": "Kids School Desk & Bench - Wooden",
//         //                     "categoryId": "6789a56d7cf7927203f66173",
//         //                     "createdAt": "2025-01-17T00:42:25.458Z",
//         //                     "updatedAt": "2025-01-17T00:42:25.458Z",
//         //                     "__v": 0
//         //                 }
//         //             ],
//         //             "_id": "678e87f5659a679441698405"
//         //         },
//         //         {
//         //             "categoryId": {
//         //                 "_id": "6789a5497cf7927203f66171",
//         //                 "categoryName": "School Desk & Bench (Senior School)",
//         //                 "mainCategoryId": "6789a3d9d08fa66bcc1dc5b2",
//         //                 "createdAt": "2025-01-17T00:33:13.218Z",
//         //                 "updatedAt": "2025-01-17T00:33:13.218Z",
//         //                 "__v": 0
//         //             },
//         //             "subCategoryIds": [
//         //                 {
//         //                     "_id": "6789a69e7cf7927203f6617d",
//         //                     "subCategoryName": "School Desk & Bench - Steel",
//         //                     "categoryId": "6789a5497cf7927203f66171",
//         //                     "createdAt": "2025-01-17T00:38:54.655Z",
//         //                     "updatedAt": "2025-01-17T00:38:54.655Z",
//         //                     "__v": 0
//         //                 }
//         //             ],
//         //             "_id": "678e87f5659a679441698406"
//         //         }
//         //     ],
//         //     "createdAt": "2025-01-18T22:28:04.846Z",
//         //     "updatedAt": "2025-01-20T17:29:25.879Z",
//         //     "__v": 4
//         // }
//         setFormData({
//           companyName: profileData.companyName || "",
//           companyType: profileData.companyType || "",
//           edprowiseProfile: profileData.edprowiseProfile || null,
//           dealingProducts: profileData.dealingProducts || [],
//         });

//         console.log("seller data from heder", response.data.data);
//       } else {
//         console.error("Invalid response format or error in response");
//       }
//     } catch (err) {
//       console.error("Error fetching Seller data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchSellerProfileData();
//   }, []);

//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyType: "",
//     sellerProfile: null,
//     dealingProducts: [],
//   });
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState({});
//   const [dealingProducts, setDealingProducts] = useState([
//     { categoryId: "", subCategoryIds: [] },
//   ]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getAPI("/category", {}, true);
//         if (!response.hasError && Array.isArray(response.data.data)) {
//           setCategories(response.data.data);
//         } else {
//           console.error("Error fetching categories.");
//         }
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleCategoryChange = async (categoryId) => {
//     if (subCategories[categoryId]) return;

//     try {
//       const response = await getAPI(`/sub-category/${categoryId}`, {}, true);
//       if (!response.hasError && Array.isArray(response.data.data)) {
//         setSubCategories((prev) => ({
//           ...prev,
//           [categoryId]: response.data.data,
//         }));
//       } else {
//         console.error("Error fetching subcategories.");
//       }
//     } catch (err) {
//       console.error("Error fetching subcategories:", err);
//     }
//   };

//   const addDealingProduct = () => {
//     setDealingProducts((prev) => [
//       ...prev,
//       { categoryId: "", subCategoryIds: [] },
//     ]);
//   };

//   const handleDealingProductChange = (index, field, value) => {
//     const updatedProducts = [...dealingProducts];
//     if (field === "categoryId") {
//       updatedProducts[index] = { categoryId: value, subCategoryIds: [] };
//       handleCategoryChange(value);
//     } else if (field === "subCategoryIds") {
//       updatedProducts[index].subCategoryIds = value;
//     }
//     setDealingProducts(updatedProducts);
//   };

//   const removeDealingProduct = (index) => {
//     const updatedProducts = [...dealingProducts];
//     updatedProducts.splice(index, 1);
//     setDealingProducts(updatedProducts);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
//     } else {
//       setFormData((prevState) => ({ ...prevState, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();

//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     dealingProducts.forEach((product, index) => {
//       data.append(`dealingProducts[${index}][categoryId]`, product.categoryId);
//       product.subCategoryIds.forEach((subCategoryId, subIndex) => {
//         data.append(
//           `dealingProducts[${index}][subCategoryIds][${subIndex}]`,
//           subCategoryId
//         );
//       });
//     });

//     try {
//       const response = await putAPI(
//         "/seller-profile",
//         data,
//         { "Content-Type": "multipart/form-data" },
//         true
//       );
//       if (!response.hasError) {
//         console.log("profile storage data", response.data.data);
//         const userId = response.data.data.sellerId;

//         setFormData({
//           companyName: "",
//           companyType: "",
//           sellerProfile: null,
//         });
//         setDealingProducts([]);
//         const updatedUserResponse = await getAPI(`/get-seller-by-id/${userId}`);
//         if (!updatedUserResponse.hasError) {
//           localStorage.setItem(
//             "userDetails",
//             JSON.stringify(updatedUserResponse.data.data)
//           );
//         }
//         toast.success("Seller Profile added successfully");
//         navigate("/seller-dashboard");
//       } else {
//         toast.error(response.message || "Failed to add seller profile");
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message || "An unexpected error occurred."
//       );
//     }
//   };

//   const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
//     cities.map((city) => `${city}, ${state}, India`)
//   );

//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card m-2">
//               <div className="card-body custom-heading-padding">
//                 <div className="container">
//                   <div className="card-header mb-2">
//                     <h4 className="card-title custom-heading-font">
//                       Add Your Profile
//                     </h4>
//                   </div>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <h4 className="card-title text-center custom-heading-font">
//                     Company Detail
//                   </h4>
//                   <hr></hr>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="companyName" className="form-label">
//                           Company Name
//                         </label>
//                         <input
//                           type="text"
//                           id="companyName"
//                           name="companyName"
//                           className="form-control"
//                           value={formData.companyName}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor="companyType" className="form-label">
//                           Company Type
//                         </label>
//                         <select
//                           id="companyType"
//                           name="companyType"
//                           className="form-control"
//                           value={formData.companyType}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Select Company Type</option>
//                           <option value="Public Limited">Public Limited</option>
//                           <option value="Private Limited">
//                             Private Limited
//                           </option>
//                           <option value="Partnership">Partnership</option>
//                           <option value="Sole Proprietor">
//                             Sole Proprietor
//                           </option>
//                           <option value="HUF">HUF</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   <h4 className="card-title text-center custom-heading-font">
//                     Dealing Products
//                   </h4>
//                   <hr></hr>
//                   <div className="row">
//                     {/* see right now what ever the data stored for deling products will be shown here  */}
//                     {formData?.dealingProducts &&
//                       formData.dealingProducts.map((product, index) => (
//                         <div key={index} className="row">
//                           <div className="col-md-6">
//                             <div className="mb-3">
//                               <label
//                                 htmlFor="categoryName"
//                                 className="form-label"
//                               >
//                                 Category
//                               </label>
//                               <h5>
//                                 {/* here is the checkbox which is by default checked but i want that if user want to uncheck it at that time is is considered as user wants to remove this Category as well as subcategory of it from the stored data  */}
//                                 <input
//                                   type="checkbox"
//                                   checked
//                                   onChange={(e) => {}}
//                                   className="form-check-input"
//                                 />
//                                 {product.categoryId.categoryName}
//                               </h5>
//                             </div>
//                           </div>
//                           <div className="col-md-6">
//                             <div className="mb-3">
//                               <label
//                                 htmlFor="subCategoryName"
//                                 className="form-label"
//                               >
//                                 Subcategory
//                               </label>
//                               <ul>
//                                 {/* here is the checkbox which is by default checked but i want that if user want to uncheck it at that time is is considered as user wants to remove this subcategory from the category part  */}
//                                 {product.subCategoryIds.map(
//                                   (subCategory, subIndex) => (
//                                     <li key={subIndex}>
//                                       <input
//                                         type="checkbox"
//                                         checked
//                                         onChange={(e) => {}}
//                                         className="form-check-input"
//                                       />
//                                       {subCategory.subCategoryName}
//                                     </li>
//                                   )
//                                 )}
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                   </div>

//                   {/* here is the dealing product list will be shown so if user want to add more product category and subcategory in database he can store  */}
//                   <div className="row">
//                     {dealingProducts.map((product, index) => (
//                       <div key={index} className="mb-3">
//                         <div className="row">
//                           <div className="col-md-6">
//                             <label htmlFor="category" className="form-label">
//                               Category
//                             </label>
//                             <select
//                               className="form-control"
//                               value={product.categoryId}
//                               onChange={(e) =>
//                                 handleDealingProductChange(
//                                   index,
//                                   "categoryId",
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="">Select Category</option>
//                               {categories.map((category) => (
//                                 <option key={category.id} value={category.id}>
//                                   {category.categoryName}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                           <div className="col-md-6">
//                             <label
//                               htmlFor="subCategories"
//                               className="form-label"
//                             >
//                               Subcategories
//                             </label>
//                             <div>
//                               {(subCategories[product.categoryId] || []).map(
//                                 (subCategory) => (
//                                   <div
//                                     key={subCategory.id}
//                                     className="form-check ms-1"
//                                   >
//                                     <input
//                                       type="checkbox"
//                                       id={`subCategory-${subCategory.id}`}
//                                       value={subCategory.id}
//                                       checked={product.subCategoryIds.includes(
//                                         subCategory.id
//                                       )}
//                                       onChange={(e) => {
//                                         const selectedSubCategories = e.target
//                                           .checked
//                                           ? [
//                                               ...product.subCategoryIds,
//                                               subCategory.id,
//                                             ]
//                                           : product.subCategoryIds.filter(
//                                               (id) => id !== subCategory.id
//                                             );
//                                         handleDealingProductChange(
//                                           index,
//                                           "subCategoryIds",
//                                           selectedSubCategories
//                                         );
//                                       }}
//                                       className="form-check-input"
//                                     />
//                                     <label
//                                       htmlFor={`subCategory-${subCategory.id}`}
//                                       className="form-label"
//                                     >
//                                       {subCategory.subCategoryName}
//                                     </label>
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           className="btn btn-danger mt-2"
//                           onClick={() => removeDealingProduct(index)}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     type="button"
//                     className="btn btn-secondary mb-3"
//                     onClick={addDealingProduct}
//                   >
//                     Add Another Product
//                   </button>

//                   <div className="text-end">
//                     <button
//                       type="submit"
//                       className="btn btn-primary custom-submit-button"
//                     >
//                       Submit Profile
//                       {/* now at time of submit all things will be stored along with the dealing product but for dealing products the check box can be changable in alredy existing data so if user want he can remove and add new data   */}
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

// export default UpdateSellerProfile;

// =================================================================
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
          //   [
          //     {
          //         "subCategoryId": "6789a6727cf7927203f6617a",
          //         "subCategoryName": "School Desk & Bench - Wooden",
          //         "categoryId": "6789a5497cf7927203f66171",
          //         "categoryName": "School Desk & Bench (Senior School)",
          //         "mainCategoryId": "6789a3d9d08fa66bcc1dc5b2",
          //         "mainCategoryName": "Procurement Services"
          //     },
          //     {
          //         "subCategoryId": "6789a69e7cf7927203f6617d",
          //         "subCategoryName": "School Desk & Bench - Steel",
          //         "categoryId": "6789a5497cf7927203f66171",
          //         "categoryName": "School Desk & Bench (Senior School)",
          //         "mainCategoryId": "6789a3d9d08fa66bcc1dc5b2",
          //         "mainCategoryName": "Procurement Services"
          //     },
          //     {
          //         "subCategoryId": "6789a7717cf7927203f66182",
          //         "subCategoryName": "Kids School Desk & Bench - Wooden",
          //         "categoryId": "6789a56d7cf7927203f66173",
          //         "categoryName": "School Desk & Bench (Play School & KG)",
          //         "mainCategoryId": "6789a3d9d08fa66bcc1dc5b2",
          //         "mainCategoryName": "Procurement Services"
          //     },
          //     {
          //         "subCategoryId": "6789a7837cf7927203f66185",
          //         "subCategoryName": "Kids School Desk & Bench - Steel",
          //         "categoryId": "6789a56d7cf7927203f66173",
          //         "categoryName": "School Desk & Bench (Play School & KG)",
          //         "mainCategoryId": "6789a3d9d08fa66bcc1dc5b2",
          //         "mainCategoryName": "Procurement Services"
          //     }
          // ]
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
                    {/* {formData?.dealingProducts &&
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
                                  checked={
                                    product.isActive !== undefined
                                      ? product.isActive
                                      : true
                                  }
                                  onChange={(e) => {
                                    const updatedProducts = [
                                      ...formData.dealingProducts,
                                    ];
                                    updatedProducts[index].isActive =
                                      e.target.checked;

                                    if (e.target.checked) {
                                      updatedProducts[index].subCategoryIds =
                                        updatedProducts[
                                          index
                                        ].subCategoryIds.map((subCategory) => ({
                                          ...subCategory,
                                          isChecked: true,
                                        }));
                                    } else {
                                      updatedProducts[index].subCategoryIds =
                                        updatedProducts[
                                          index
                                        ].subCategoryIds.map((subCategory) => ({
                                          ...subCategory,
                                          isChecked: false,
                                        }));
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
                                {product.subCategoryIds.map(
                                  (subCategory, subIndex) => (
                                    <li key={subIndex}>
                                      <input
                                        type="checkbox"
                                        checked={
                                          subCategory.isChecked !== undefined
                                            ? subCategory.isChecked
                                            : true
                                        }
                                        onChange={(e) => {
                                          const updatedProducts = [
                                            ...formData.dealingProducts,
                                          ];
                                          const subCategoryIds =
                                            updatedProducts[index]
                                              .subCategoryIds;

                                          subCategoryIds[subIndex].isChecked =
                                            e.target.checked;

                                          updatedProducts[index].isActive =
                                            subCategoryIds.some(
                                              (sub) => sub.isChecked
                                            );

                                          setFormData((prev) => ({
                                            ...prev,
                                            dealingProducts: updatedProducts,
                                          }));
                                        }}
                                        className="form-check-input"
                                      />
                                      {subCategory.subCategoryName}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))} */}

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
                                  checked={
                                    product.isActive !== undefined
                                      ? product.isActive
                                      : true
                                  }
                                  onChange={(e) => {
                                    const updatedProducts = [
                                      ...formData.dealingProducts,
                                    ];
                                    updatedProducts[index].isActive =
                                      e.target.checked;

                                    if (e.target.checked) {
                                      updatedProducts[index].subCategoryIds =
                                        updatedProducts[
                                          index
                                        ].subCategoryIds.map((subCategory) => ({
                                          ...subCategory,
                                          isChecked: true,
                                        }));
                                    } else {
                                      updatedProducts[index].subCategoryIds =
                                        updatedProducts[
                                          index
                                        ].subCategoryIds.map((subCategory) => ({
                                          ...subCategory,
                                          isChecked: false,
                                        }));
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
                                {product.subCategoryIds.map(
                                  (subCategory, subIndex) => (
                                    <li key={subIndex}>
                                      <input
                                        type="checkbox"
                                        checked={
                                          subCategory.isChecked !== undefined
                                            ? subCategory.isChecked
                                            : true
                                        }
                                        onChange={(e) => {
                                          const updatedProducts = [
                                            ...formData.dealingProducts,
                                          ];
                                          const subCategoryIds =
                                            updatedProducts[index]
                                              .subCategoryIds;

                                          subCategoryIds[subIndex].isChecked =
                                            e.target.checked;

                                          updatedProducts[index].isActive =
                                            subCategoryIds.some(
                                              (sub) => sub.isChecked
                                            );

                                          setFormData((prev) => ({
                                            ...prev,
                                            dealingProducts: updatedProducts,
                                          }));
                                        }}
                                        className="form-check-input"
                                      />
                                      {subCategory.subCategoryName}
                                    </li>
                                  )
                                )}

                                {/* Render remaining subcategories */}
                                {allSubCategories
                                  .filter(
                                    (sub) =>
                                      sub.categoryId === product.categoryId &&
                                      !product.subCategoryIds.some(
                                        (storedSub) =>
                                          storedSub.subCategoryId ===
                                          sub.subCategoryId
                                      )
                                  )
                                  .map((remainingSub, subIndex) => (
                                    <li
                                      key={
                                        subIndex + product.subCategoryIds.length
                                      }
                                    >
                                      <input
                                        type="checkbox"
                                        checked={false} // Default to unchecked
                                        onChange={(e) => {
                                          const updatedProducts = [
                                            ...formData.dealingProducts,
                                          ];
                                          const subCategoryIds =
                                            updatedProducts[index]
                                              .subCategoryIds;

                                          if (e.target.checked) {
                                            subCategoryIds.push({
                                              ...remainingSub,
                                              isChecked: true,
                                            });
                                          } else {
                                            const idx =
                                              subCategoryIds.findIndex(
                                                (sub) =>
                                                  sub.subCategoryId ===
                                                  remainingSub.subCategoryId
                                              );
                                            if (idx > -1) {
                                              subCategoryIds.splice(idx, 1);
                                            }
                                          }

                                          updatedProducts[index].isActive =
                                            subCategoryIds.some(
                                              (sub) => sub.isChecked
                                            );

                                          setFormData((prev) => ({
                                            ...prev,
                                            dealingProducts: updatedProducts,
                                          }));
                                        }}
                                        className="form-check-input"
                                      />
                                      {remainingSub.subCategoryName}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {/* see here in list only that subcategory will come which ever is stored in profile data of that perticular user and and which are by default checked={true} but i also want to show remaing sucategory of that perticular category which are fetched in fetchAllSubcategory function but make sure they will  be checked ={false} because there are stored in subcategory model not in seller profile so you need to filter like which ever subcategory is remined will come from fetch allsubcategory response data but according to category id you need to filter out  */}

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
