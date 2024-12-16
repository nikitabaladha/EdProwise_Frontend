// import React from "react";

// const Login = () => {
//   return (
//     <>
//       <div className="auth-page-wrapper pt-5">
//         {/* auth page bg */}
//         <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
//           <div className="bg-overlay" />
//           <div className="shape">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               version="1.1"
//               xmlnsXlink="http://www.w3.org/1999/xlink"
//               viewBox="0 0 1440 120"
//             >
//               <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
//             </svg>
//           </div>
//           <canvas
//             className="particles-js-canvas-el"
//             width={752}
//             height={475}
//             style={{ width: "100%", height: "100%" }}
//           />
//         </div>
//         {/* auth page content */}
//         <div className="auth-page-content">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="text-center mt-sm-5 mb-4 text-white-50">
//                   <div>
//                     <a href="#" className="d-inline-block auth-logo">
//                       <img
//                         src="logoit.png"
//                         alt=""
//                         height={20}
//                         style={{ height: 95 }}
//                       />
//                     </a>
//                   </div>
//                   <p className="mt-3 fs-15 fw-medium">
//                     Welcome To Domain Name{" "}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* end row */}
//             <div className="row justify-content-center">
//               <div className="col-md-8 col-lg-6 col-xl-5">
//                 <div className="card mt-4 card-bg-fill">
//                   <div className="card-body p-4">
//                     <div className="text-center mt-2">
//                       <h5 className="text-primary">Welcome Back !</h5>
//                       <p className="text-muted">
//                         Sign in to continue to Domain Name .
//                       </p>
//                     </div>
//                     <div className="p-2 mt-4">
//                       <form action="" method="POST">
//                         <div className="mb-3">
//                           <label htmlFor="username" className="form-label">
//                             Username
//                           </label>
//                           <input
//                             type="text"
//                             name="email"
//                             required=""
//                             className="form-control"
//                             id="username"
//                             placeholder="Enter username"
//                           />
//                         </div>
//                         <div className="mb-3">
//                           <label
//                             className="form-label"
//                             htmlFor="password-input"
//                           >
//                             Password
//                           </label>
//                           <div className="position-relative auth-pass-inputgroup mb-3">
//                             <input
//                               type="password"
//                               name="password"
//                               required=""
//                               className="form-control pe-5 password-input"
//                               placeholder="Enter password"
//                               id="password-input"
//                             />
//                             <button
//                               className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon material-shadow-none"
//                               type="button"
//                               id="password-addon"
//                             >
//                               <i className="ri-eye-fill align-middle" />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             required=""
//                             type="checkbox"
//                             defaultValue=""
//                             id="auth-remember-check"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="auth-remember-check"
//                           >
//                             Remember me
//                           </label>
//                         </div>
//                         <div className="mt-4">
//                           <button
//                             className="btn btn-success w-100"
//                             type="submit"
//                             name="login"
//                           >
//                             Sign In
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                   {/* end card body */}
//                 </div>
//                 {/* end card */}
//               </div>
//             </div>
//             {/* end row */}
//           </div>
//           {/* end container */}
//         </div>
//         {/* end auth page content */}
//         {/* footer */}
//         <footer className="footer">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="text-center">
//                   <p className="mb-0 text-muted">© Domain Name.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </footer>
//         {/* end Footer */}
//       </div>
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/your-api-endpoint/login", {
        email: email,
        password: password,
      });

      if (response.data.success) {
        // Handle successful login (e.g., redirect to OTP page)
        window.location.href = "/otp";
      } else {
        // Handle unsuccessful login
        setErrorMessage(response.data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
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
                  <a href="#" className="d-inline-block auth-logo">
                    <img
                      src="logoit.png"
                      alt=""
                      height="20"
                      style={{ height: "95px" }}
                    />
                  </a>
                </div>
                <p className="mt-3 fs-15 fw-medium">Welcome To Domain Name </p>
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
                      Sign in to continue to Domain Name.
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password-input">
                          Password
                        </label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control pe-5 password-input"
                            placeholder="Enter password"
                            id="password-input"
                          />
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon material-shadow-none"
                            type="button"
                            id="password-addon"
                          >
                            <i className="ri-eye-fill align-middle"></i>
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

                      {errorMessage && (
                        <div className="alert alert-danger mt-3">
                          {errorMessage}
                        </div>
                      )}

                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Sign In
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
                  &copy;
                  <script>document.write(new Date().getFullYear())</script>{" "}
                  Domain Name.
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

export default Login;
