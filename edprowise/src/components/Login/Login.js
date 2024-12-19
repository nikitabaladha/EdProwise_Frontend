import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postAPI from "../../api/postAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
      const response = await postAPI("/login", formData, false);

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
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
                  <Link to="" className="custom-link">
                    <div>
                      {/* <img
                        src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                        alt="Logo"
                        className="logo-size"
                      /> */}
                      {/* <image
                        src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                      /> */}
                      {/* <img
                        src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                        className="logo-lg"
                        alt="logo light"
                        style={{ height: "40px", marginRight: "20px" }}
                      /> */}
                      {/* <img
                      src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                      className="logo light"
                      alt="logo light"
                      style={{ height: "40px", marginRight: "20px" }}
                    /> */}
                      <div className="login-logo-font">EdProwise</div>
                    </div>
                  </Link>
                </div>
                <h3 className="font-md">
                  {/* Get more things done with EdProwise platform. */}
                  Whatever You Need, We Provide
                </h3>
                <p>We Listen...We Resolve...We Deliver</p>
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

                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                    }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="form-control pe-5"
                      placeholder="Enter password"
                    />
                    {showPassword ? (
                      <FaEye
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <FaEyeSlash
                        onClick={togglePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>

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
