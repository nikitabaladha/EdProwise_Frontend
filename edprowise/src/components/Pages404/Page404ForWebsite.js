import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Page404ForWebsite = () => {
  return (
    <>
      <div className="d-flex flex-column h-100 p-3">
        <div className="d-flex flex-column flex-grow-1">
          <div className="row h-100">
            <div className="col-xxl-7">
              <div className="row align-items-center justify-content-center h-100">
                <div className="col-lg-10">
                  <div className="auth-logo mb-3 text-center">
                    <Link to="/" className="logo-dark">
                      <img
                        src="/assets/website-images/EdProwise New Logo-1.png"
                        height={50}
                        alt="logo dark"
                      />
                    </Link>
                    <Link to="/" className="logo-light">
                      <img
                        src="/assets/website-images/EdProwise New Logo-1.png"
                        height={50}
                        alt="logo light"
                      />
                    </Link>
                  </div>
                  <div className="mx-auto text-center">
                    <img
                      src="assets/images/404-error.png"
                      alt=""
                      className="img-fluid my-3"
                    />
                  </div>
                  <h2 className="fw-bold text-center lh-base">
                    Ooops! The Page You're Looking For Was Not Found
                  </h2>
                  <p className="text-muted text-center mt-1 mb-4">
                    Sorry, we couldn't find the page you were looking for. We
                    suggest that you return to main sections
                  </p>
                  <div className="text-center">
                    <Link to="/" className="btn btn-primary">
                      Back To Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-5 d-none d-xxl-flex">
              <div className="card h-100 mb-0">
                <div className="home-hero-outer-pic">
                  <div className="student-pic home-hero-student-pic home-page-section-img hero-section-img-small">
                    {/* <div
                      className="wpo-about-img"
                      style={{ textAlign: "center" }}
                    >
                      <img
                        src="/assets/images/EdProwiseFavicon.png"
                        alt=""
                        style={{ width: "29%" }}
                      />
                      <div className="back-shapee">
                        <img
                          src="/assets/website-images/event/HomePage.png"
                          alt=""
                          style={{ width: "80%" }}
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>{" "}
              {/* end card */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404ForWebsite;
