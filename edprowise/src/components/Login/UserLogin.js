import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postAPI from "../../api/postAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    userId: "",
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
      const response = await postAPI("/user-login", formData, false);

      if (!response.hasError) {
        const { token, userDetails } = response.data;
        localStorage.setItem("accessToken", JSON.stringify(token));
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        toast.success("Login successful!");

        setTimeout(() => {
          if (userDetails.role === "School") {
            return navigate("/school-dashboard");
          } else if (userDetails.role === "Auditor") {
            return navigate("/auditor-dashboard");
          } else if (userDetails.role === "User") {
            return navigate("/user-dashboard");
          } else {
            toast.error("No dashboard available for your role!");
          }
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
                      <div className="login-logo-font">EdProwise</div>
                    </div>
                  </Link>
                </div>
                <h3 className="font-md">Whatever You Need, We Provide</h3>
                <p>We Listen...We Resolve...We Deliver</p>
                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control"
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="User  ID"
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

export default UserLogin;
