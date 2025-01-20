import React, { useState } from "react";
import putAPI from "../../../api/putAPI";
import { toast } from "react-toastify";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const { state } = useLocation();
  const school = state?.school;
  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userId = userDetails?.userId;

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const payload = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      const response = await putAPI(
        "/change-school-admin-password",
        payload,
        true
      );

      if (!response.hasError) {
        toast.success("Password changed successfully.");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/school-dashboard");
      } else {
        toast.error("Failed to update Password.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
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
                      Change Your Password
                    </h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <div className="rounded bg-light d-flex align-items-center justify-content-center">
                          <img
                            src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`}
                            alt={`${school.schoolName} Profile`}
                            className="avatar-md"
                            style={{
                              objectFit: "cover",
                              width: "100px",
                              height: "100px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="schoolName" className="form-label">
                        School Name
                      </label>
                      <p className="form-control">{school.schoolName}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="userId" className="form-label">
                        User ID
                      </label>
                      <p className="form-control">{userId}</p>
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="currentPassword" className="form-label">
                          Current Password
                        </label>
                        <span className="text-danger">*</span>
                        <input
                          className="form-control"
                          required
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          id="currentPassword"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                          New Password
                        </label>
                        <span className="text-danger">*</span>
                        <input
                          className="form-control"
                          required
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          id="newPassword"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                          Re-type New Password
                        </label>
                        <span className="text-danger">*</span>
                        <input
                          className="form-control"
                          required
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          id="confirmPassword"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Submit New Password
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

export default ChangePassword;
