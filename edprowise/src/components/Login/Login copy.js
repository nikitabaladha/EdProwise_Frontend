import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postAPI from "../../api/postAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postAPI("api/admin-login", formData, false);

      if (!response.hasError) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.token)
        );
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.userDetails)
        );
        toast.success("Login successful!");

        setTimeout(() => {
          return navigate("/dashboard");
        }, 2000);
      } else {
        setGeneralError(response.data.message);
      }
    } catch (error) {
      setGeneralError(
        error?.response?.data?.message ||
          "An unexpected login error occurred. Please try again."
      );
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
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
                    <Link to="" className="d-inline-block auth-logo">
                      <img
                        src="logoit.png"
                        alt=""
                        height="20"
                        style={{ height: "95px" }}
                      />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">Welcome To EdProwise</p>
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
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="password-input"
                          >
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
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Sign In
                          </button>
                        </div>

                        <p className="mt-4">Don't have an account ?</p>
                        <div className="d-grid">
                          <button
                            className="btn btn-info login-do-btn"
                            type="submit"
                            onClick={handleSignupRedirect}
                          >
                            Signup
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

        {/* footer */}
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
      {/* ------------------new------------------- */}
      <div className="form-body form-left">
        <div className="iofrm-layout">
          <div className="img-holder text-start">
            <div className="bg" />
            <div className="info-holder">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/graphic15.svg`}
                alt=""
              />
            </div>
          </div>
          <div
            className="form-holder"
            style={{
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="form-content justify-content-end">
              <div className="form-items">
                <div className="website-logo-inside logo-normal">
                  <a href="index.html">
                    <div className="logo">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/logo-yellow.svg`}
                        alt="Logo"
                        className="logo-size"
                      />
                    </div>
                  </a>
                </div>
                <h3 className="font-md">
                  Get more things done with Loggin platform.
                </h3>
                <p>
                  Access to the most powerfull tool in the entire design and web
                  industry.
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail Address"
                    required=""
                  />
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
                    type="button"
                    id="password-addon"
                    onClick={togglePasswordVisibility}
                  >
                    <FaEye className="{showPassword ? 'ri-eye-off-fill' : 'ri-eye-fill'} align-middle}" />
                  </button>

                  {generalError && (
                    <div className="alert alert-danger mt-3">
                      {generalError}
                    </div>
                  )}
                  <div className="form-button d-flex">
                    <button
                      id="submit"
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#ffc801",
                        borderColor: "#ffc801",
                      }}
                    >
                      Login
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

export default Login;
