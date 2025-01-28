import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import postAPI from "../../api/postAPI.js";

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
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI("/admin-signup", formData, false);

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
        setGeneralError(response.message || "Signup failed.");
      }
    } catch (error) {
      setGeneralError(
        error?.response?.data?.message ||
          "An unexpected signup error occurred. Please try again."
      );
    }
  };

  return (
    <div className="auth-page-wrapper pt-5">
      {/* auth page bg */}
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay"></div>
        <div className="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1440 120"
          >
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
          </svg>
        </div>
      </div>

      {/* auth page content */}
      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link className="d-inline-block auth-logo">
                    <img
                      src="logoit.png"
                      alt=""
                      height="20"
                      style={{ height: "95px" }}
                    />
                  </Link>
                </div>
                <p className="mt-3 fs-15 fw-medium">Welcome To EdProwise </p>
              </div>
            </div>
          </div>
          {/* end row */}

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4 card-bg-fill">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back!</h5>
                    <p className="text-muted">
                      Sign in to continue to EdProwise.
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <form onSubmit={handleSignup}>
                      <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="form-control"
                          id="firstName"
                          placeholder="Enter first name"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="form-control"
                          id="lastName"
                          placeholder="Enter last name"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-control"
                          id="email"
                          placeholder="Enter email address"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password-input">
                          Password
                        </label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-control pe-5 password-input"
                            placeholder="Enter password"
                            id="password-input"
                          />
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon material-shadow-none"
                            type="button"
                            id="password-addon"
                            onClick={togglePasswordVisibility}
                          >
                            <i
                              className={`ri-eye${
                                showPassword ? "-off" : ""
                              }-fill align-middle`}
                            ></i>
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required=""
                          className="form-control"
                        >
                          <option value="">Select Role</option>
                          <option value="SuperAdmin">Super Admin</option>
                          <option value="Admin">Admin</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Student">Student</option>
                          <option value="Audit">Audit</option>
                        </select>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          required
                          type="checkbox"
                          id="auth-remember-check"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="auth-remember-check"
                        >
                          Remember me
                        </label>
                      </div>

                      {generalError && (
                        <div className="alert alert-danger mt-3">
                          {generalError}
                        </div>
                      )}

                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Sign Up
                        </button>
                      </div>

                      <p className="mt-4">Already have an account ?</p>
                      <div className="d-grid">
                        <button
                          className="btn btn-info login-do-btn"
                          type="button"
                          onClick={handleLoginRedirect}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end auth page content */}

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <p className="mb-0 text-muted">
                  &copy; {new Date().getFullYear()} EdProwise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* end Footer */}
    </div>
  );
};

export default Signup;
