import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateGoodAndService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const good = location.state?.good;

  const [formData, setFormData] = useState({
    mainCategory: "",
    category: "",
    subCategory: "",
  });

  useEffect(() => {
    if (good) {
      setFormData({
        mainCategory: good.mainCategory || "",
        category: good.category || "",
        subCategory: good.subCategory || "",
      });
    }
  }, [good]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Updating form data:`, formData);

    toast.success("Goods And Services Updated Successfully!");

    setFormData({
      mainCategory: "",
      category: "",
      subCategory: "",
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
                    Update Good And Service
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="mainCategory" className="form-label">
                        Main Category
                      </label>
                      <input
                        type="text"
                        id="mainCategory"
                        name="mainCategory"
                        className="form-control"
                        value={formData.mainCategory}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="subCategory" className="form-label">
                        Sub Category
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

export default UpdateGoodAndService;
