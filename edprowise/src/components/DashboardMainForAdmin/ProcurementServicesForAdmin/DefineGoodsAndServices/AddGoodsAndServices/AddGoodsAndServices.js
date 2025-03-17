import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import postAPI from "../../../../../api/postAPI";
import getAPI from "../../../../../api/getAPI";

const AddCategory = () => {
  const [mainCategoryId, setMainCategoryId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

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
        toast.error("An error occurred while fetching branches.");
      }
    };

    fetchMainCategories();
  }, []);

  const handleMainCategoryChange = async (e) => {
    const mainCategoryId = e.target.value;
    setMainCategoryId(mainCategoryId);
    setCategories([]);

    if (mainCategoryId) {
      try {
        const response = await getAPI(`/category/${mainCategoryId}`, {}, true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subCategoryData = {
      subCategoryName,
      categoryId,
      mainCategoryId,
    };

    try {
      const response = await postAPI(
        "/sub-category",
        subCategoryData,
        {},
        true
      );

      if (!response.hasError) {
        toast.success("Sub Categories Created Successfully");

        navigate(-1);
      } else {
        toast.error(`Failed to create Subcategories: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating the subcategories.");
    }
  };

  // i want handle below html like:-

  // 1) if there is no main category data at that time i want to show input type text field for all three like mainCategoryName , categoryName and subCategoryName

  // 2) if there is main category data at that time i want to show list of main category and according to it show list of category and input type text field for subcategory name

  // 3) if there is main category data but not category data for that particular mainCategory at that time i want to show input type text field for categoryName and subCategoryName

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Add New Sub Category
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Main Category Field */}
                  <div className="col-md-4">
                    <div className="mb-6">
                      <label htmlFor="mainCategoryId" className="form-label">
                        {mainCategories.length > 0
                          ? "Main Category List"
                          : "Main Category Name"}
                      </label>
                      {mainCategories.length > 0 ? (
                        <select
                          required
                          className="form-control"
                          id="mainCategoryId"
                          name="mainCategoryId"
                          value={mainCategoryId}
                          onChange={handleMainCategoryChange}
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
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Main Category Name"
                          value={mainCategoryId}
                          onChange={(e) => setMainCategoryId(e.target.value)}
                        />
                      )}
                    </div>
                  </div>

                  {/* Category Field */}
                  <div className="col-md-4">
                    <div className="mb-6">
                      <label htmlFor="categoryId" className="form-label">
                        {mainCategoryId && categories.length > 0
                          ? "Category List"
                          : "Category Name"}
                      </label>
                      {mainCategoryId && categories.length > 0 ? (
                        <select
                          className="form-control"
                          required
                          id="categoryId"
                          name="categoryId"
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Category Name"
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                        />
                      )}
                    </div>
                  </div>

                  {/* Sub Category Name Field */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="subCategoryName" className="form-label">
                        Sub Category Name
                      </label>
                      <input
                        onChange={(e) => setSubCategoryName(e.target.value)}
                        required
                        className="form-control"
                        placeholder="Sub Category Name"
                        name="subCategoryName"
                        type="text"
                        id="subCategoryName"
                        value={subCategoryName}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
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

export default AddCategory;
