import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import putAPI from "../../../../../api/putAPI";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSubCategory = () => {
  const location = useLocation();
  const subCategory = location?.state?.subCategory;
  const navigate = useNavigate();

  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [formData, setFormData] = useState({
    subCategoryName: "",
    categoryId: "",
    mainCategoryId: "",
  });

  // Fetch main categories on mount
  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const response = await getAPI("/main-category", true);
        if (!response.hasError) {
          setMainCategories(response.data.data);
        } else {
          toast.error(`Failed to fetch Main Categories: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching main categories.");
      }
    };
    fetchMainCategories();
  }, []);

  // Fetch categories when main category is selected
  const handleMainCategoryChange = async (e) => {
    const selectedMainCategoryId = e.target.value;
    setMainCategoryId(selectedMainCategoryId);
    setCategoryId("");
    setCategories([]);

    if (selectedMainCategoryId) {
      try {
        const response = await getAPI(
          `/category/${selectedMainCategoryId}`,
          {},
          true
        );
        if (!response.hasError && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          toast.error("Failed to load categories.");
        }
      } catch (err) {
        toast.error("Error fetching categories.");
      }
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  // Populate form with existing data
  useEffect(() => {
    if (subCategory) {
      setFormData({
        subCategoryName: subCategory.subCategoryName || "",
      });
      setMainCategoryId(subCategory.mainCategoryId || "");
      setCategoryId(subCategory.categoryId || "");

      // Fetch categories for the selected main category
      const fetchCategoriesForMainCategory = async () => {
        try {
          const response = await getAPI(
            `/category/${subCategory.mainCategoryId}`,
            {},
            true
          );
          if (!response.hasError && Array.isArray(response.data.data)) {
            setCategories(response.data.data);
          } else {
            toast.error("Failed to load categories.");
          }
        } catch (err) {
          toast.error("Error fetching categories.");
        }
      };

      fetchCategoriesForMainCategory();
    }
  }, [subCategory]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await putAPI(
        `/sub-category/${subCategory.id}`,
        {
          subCategoryName: formData.subCategoryName,
          categoryId,
          mainCategoryId,
        },
        {},
        true
      );

      if (!response.data.hasError) {
        toast.success("Sub Category updated successfully!");
        navigate(-1);
      } else {
        toast.error(response.data.message || "Failed to update SubCategory.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center">
                    Update Sub Category
                  </h4>
                </div>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="row">
                  {/* Main Category */}
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Main Category</label>
                      <select
                        className="form-control"
                        value={mainCategoryId}
                        onChange={handleMainCategoryChange}
                        required
                      >
                        <option value="">Select Main Category</option>
                        {mainCategories.map((mainCategory) => (
                          <option
                            key={mainCategory._id}
                            value={mainCategory._id}
                          >
                            {mainCategory.mainCategoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-control"
                        value={categoryId}
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

                  {/* Sub Category */}
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Sub Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="subCategoryName"
                        value={formData.subCategoryName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Update
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

export default UpdateSubCategory;
