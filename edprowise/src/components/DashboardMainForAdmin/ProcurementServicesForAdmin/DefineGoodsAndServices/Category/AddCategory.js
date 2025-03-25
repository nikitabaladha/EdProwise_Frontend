import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import postAPI from "../../../../../api/postAPI";
import getAPI from "../../../../../api/getAPI";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    mainCategoryId: "",
    categoryName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [mainCategories, setMainCategories] = useState([]);
  const fetchMainCategoryData = async () => {
    try {
      const response = await getAPI(`/main-category`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setMainCategories(response.data.data);
        console.log("Main Category data", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School List:", err);
    }
  };

  useEffect(() => {
    fetchMainCategoryData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await postAPI("/category", data, {}, true);

      if (!response.hasError) {
        toast.success("Category added successfully");

        navigate(-1);
      } else {
        toast.error(response.message || "Failed to add Category");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
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
                    Add New Category
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="mainCategoryId" className="form-label">
                        Main Category List
                      </label>
                      <select
                        id="mainCategoryId"
                        name="mainCategoryId"
                        className="form-control"
                        value={formData.mainCategoryId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Main</option>

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

                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Category Name
                      </label>
                      <input
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        className="form-control"
                        value={formData.categoryName}
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
