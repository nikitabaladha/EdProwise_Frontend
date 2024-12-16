import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import postAPI from "../../api/postAPI.js";

import "../custom-login.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setGeneralError("");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI("/signup", formData, false);

      if (!response.hasError) {
        toast.success("Signup successful!");

        setTimeout(() => {
          handleLoginRedirect();
        }, 2000);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
      } else {
        setGeneralError(response.message);
      }
    } catch (error) {
      setGeneralError(
        error?.response?.data?.message ||
          "An unexpected signup error occurred. Please try again."
      );
    }
  };

  return (
    <div className="custom-login">
      <ToastContainer />
      <div className="login-bg-img">
        {/* <img src={background1} className="login-bg-1" alt="Background 1" />
        <img src={background2} className="login-bg-2" alt="Background 2" /> */}
      </div>
      <div className="bg-login bg-primary"></div>
      <div className="custom-login-inner">
        <main className="custom-wrapper">
          <div className="custom-row">
            <div className="card">
              <div className="card-body">
                <h2 className="mb-3 f-w-600">Signup</h2>
                <div className="custom-login-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required=""
                      />
                    </div>
                    <div className="form-group mb-3 pss-field">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required=""
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required=""
                      />
                    </div>
                    <div className="form-group mb-3 pss-field">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required=""
                      />
                    </div>

                    <div className="form-group mb-3 pss-field">
                      <label className="form-label">Role</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required=""
                        className="form-control"
                      >
                        <option value="">Select Role</option>
                        <option value="company">Company</option>
                        <option value="hr">HR</option>
                        <option value="employee">Employee</option>
                      </select>
                    </div>

                    {generalError && (
                      <p className="error-message">{generalError}</p>
                    )}
                    <div className="d-grid">
                      <button
                        className="btn btn-primary login-do-btn"
                        type="submit"
                      >
                        Signup
                      </button>
                    </div>

                    <p className="mt-4 text-info">Already have an account ?</p>
                    <div className="d-grid">
                      <button
                        className="btn btn-info login-do-btn"
                        type="submit"
                        onClick={handleLoginRedirect}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Signup;
