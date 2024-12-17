import React from "react";
import { useNavigate } from "react-router-dom";

const RegistrationFormHeader = () => {
  const navigate = useNavigate();

  const navigateToAddNewRegistration = (event) => {
    event.preventDefault();
    navigate(`/dashboard/formMenu/registrationForm/create`);
  };
  return (
    <>
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              {/* LOGO */}
              <div className="navbar-brand-box horizontal-logo">
                <a href="index.php" className="logo logo-dark">
                  <span className="logo-sm">
                    <img
                      src="../img/placeholder_logo.png"
                      style={{ height: 22 }}
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="../img/placeholder_logo.png"
                      style={{ height: 17 }}
                    />
                  </span>
                </a>
                <a href="index.php" className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src="../img/placeholder_logo.png"
                      style={{ height: 22 }}
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="../img/placeholder_logo.png"
                      style={{ height: 17 }}
                    />
                  </span>
                </a>
              </div>
              <button
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
              <span
                className="ribbon-three ribbon-three-success"
                style={{ marginLeft: 80, marginTop: 19 }}
              >
                <span style={{ width: "100%" }}>
                  <b>REGISTRATION DETAILS</b>
                </span>
              </span>
            </div>
            <div className="d-flex align-items-center">
              <a href="RegistrationForm_add.php">
                <button
                  type="button"
                  className="btn rounded-pill btn-primary waves-effect waves-light"
                  onClick={(event) => navigateToAddNewRegistration(event)}
                >
                  Add New Registration
                </button>
              </a>
              <div className="ms-1 header-item d-sm-flex">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                  data-toggle="fullscreen"
                >
                  <i className="bx bx-fullscreen fs-22" />
                </button>
              </div>
              <div className="ms-1 header-item d-sm-flex">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle light-dark-mode"
                >
                  <i className="bx bx-moon fs-22" />
                </button>
              </div>
              {/* ========== App Menu ========== */}
              {/* Static content from 'hedder-top.php' should be included here */}
              <div className="header-top">
                {/* Replace this comment with static HTML content from 'hedder-top.php' */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default RegistrationFormHeader;
