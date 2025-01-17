// import React, { useState, useEffect } from "react";
// import postAPI from "../../../api/postAPI";
// import getAPI from "../../../api/getAPI";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";

// const CompleteSellerProfile = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyType: "",
//     sellerProfile: null,
//   });
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState({});
//   const [dealingProducts, setDealingProducts] = useState([]);
//   const navigate = useNavigate();

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
//       const response = await postAPI(
//         "/seller-profile",
//         data,
//         { "Content-Type": "multipart/form-data" },
//         true
//       );
//       if (!response.hasError) {
//         console.log("profile storage data", response.data.data);
//         const userId = response.data.data.sellerId;

//         setFormData({ companyName: "", companyType: "", sellerProfile: null });
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

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="companyName">Company Name</label>
//           <input
//             type="text"
//             id="companyName"
//             name="companyName"
//             className="form-control"
//             value={formData.companyName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="companyType">Company Type</label>
//           <select
//             id="companyType"
//             name="companyType"
//             className="form-control"
//             value={formData.companyType}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Company Type</option>
//             <option value="Public Limited">Public Limited</option>
//             <option value="Private Limited">Private Limited</option>
//             <option value="Partnership">Partnership</option>
//             <option value="Sole Proprietor">Sole Proprietor</option>
//             <option value="HUF">HUF</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="sellerProfile">Profile Photo</label>
//           <input
//             type="file"
//             id="sellerProfile"
//             name="sellerProfile"
//             className="form-control"
//             accept="image/*"
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <h5>Dealing Products</h5>
//         {dealingProducts.map((product, index) => (
//           <div key={index} className="mb-3">
//             <div className="row">
//               <div className="col-md-6">
//                 <label>Category</label>
//                 <select
//                   className="form-control"
//                   value={product.categoryId}
//                   onChange={(e) =>
//                     handleDealingProductChange(
//                       index,
//                       "categoryId",
//                       e.target.value
//                     )
//                   }
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.categoryName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-6">
//                 <label>Subcategories</label>
//                 <div>
//                   {(subCategories[product.categoryId] || []).map(
//                     (subCategory) => (
//                       <div key={subCategory.id}>
//                         <input
//                           type="checkbox"
//                           id={`subCategory-${subCategory.id}`}
//                           value={subCategory.id}
//                           checked={product.subCategoryIds.includes(
//                             subCategory.id
//                           )}
//                           onChange={(e) => {
//                             const selectedSubCategories = e.target.checked
//                               ? [...product.subCategoryIds, subCategory.id]
//                               : product.subCategoryIds.filter(
//                                   (id) => id !== subCategory.id
//                                 );
//                             handleDealingProductChange(
//                               index,
//                               "subCategoryIds",
//                               selectedSubCategories
//                             );
//                           }}
//                         />
//                         <label htmlFor={`subCategory-${subCategory.id}`}>
//                           {subCategory.subCategoryName}
//                         </label>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             </div>
//             <button
//               type="button"
//               className="btn btn-danger mt-2"
//               onClick={() => removeDealingProduct(index)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           className="btn btn-secondary mb-3"
//           onClick={addDealingProduct}
//         >
//           Add Another Product
//         </button>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CompleteSellerProfile;

import React, { useState, useEffect } from "react";
import postAPI from "../../../api/postAPI";
import getAPI from "../../../api/getAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CompleteSellerProfile = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    sellerProfile: null,
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [dealingProducts, setDealingProducts] = useState([
    { categoryId: "", subCategoryIds: [] },
  ]);
  const navigate = useNavigate();

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
      const response = await postAPI(
        "/seller-profile",
        data,
        { "Content-Type": "multipart/form-data" },
        true
      );
      if (!response.hasError) {
        console.log("profile storage data", response.data.data);
        const userId = response.data.data.sellerId;

        setFormData({ companyName: "", companyType: "", sellerProfile: null });
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

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="companyName">Company Name</label>
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
        <div className="mb-3">
          <label htmlFor="companyType">Company Type</label>
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
            <option value="Private Limited">Private Limited</option>
            <option value="Partnership">Partnership</option>
            <option value="Sole Proprietor">Sole Proprietor</option>
            <option value="HUF">HUF</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="sellerProfile">Profile Photo</label>
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
        <h5>Dealing Products</h5>
        {dealingProducts.map((product, index) => (
          <div key={index} className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <label>Category</label>
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
                <label>Subcategories</label>
                <div>
                  {(subCategories[product.categoryId] || []).map(
                    (subCategory) => (
                      <div key={subCategory.id}>
                        <input
                          type="checkbox"
                          id={`subCategory-${subCategory.id}`}
                          value={subCategory.id}
                          checked={product.subCategoryIds.includes(
                            subCategory.id
                          )}
                          onChange={(e) => {
                            const selectedSubCategories = e.target.checked
                              ? [...product.subCategoryIds, subCategory.id]
                              : product.subCategoryIds.filter(
                                  (id) => id !== subCategory.id
                                );
                            handleDealingProductChange(
                              index,
                              "subCategoryIds",
                              selectedSubCategories
                            );
                          }}
                        />
                        <label htmlFor={`subCategory-${subCategory.id}`}>
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
        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addDealingProduct}
        >
          Add Another Product
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompleteSellerProfile;
