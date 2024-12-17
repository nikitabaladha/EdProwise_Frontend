import React from "react";

const RegistrationForm = () => {
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
                    <br />
                    <b>Warning</b>: Undefined variable $u_company_logo in{" "}
                    <b>
                      C:\xampp\htdocs\schoolmanagement\feesfinal\RegistrationForm_Detail.php
                    </b>{" "}
                    on line <b>14</b>
                    <br />
                    <img src="logo.png" alt="" height={22} />
                  </span>
                  <span className="logo-lg">
                    <br />
                    <b>Warning</b>: Undefined variable $u_company_logo in{" "}
                    <b>
                      C:\xampp\htdocs\schoolmanagement\feesfinal\RegistrationForm_Detail.php
                    </b>{" "}
                    on line <b>21</b>
                    <br />
                    <img src="logo.png" alt="" height={22} />
                  </span>
                </a>
                <a href="index.php" className="logo logo-light">
                  <span className="logo-sm">
                    <br />
                    <b>Warning</b>: Undefined variable $u_company_logo in{" "}
                    <b>
                      C:\xampp\htdocs\schoolmanagement\feesfinal\RegistrationForm_Detail.php
                    </b>{" "}
                    on line <b>31</b>
                    <br />
                    <img src="logo.png" alt="" height={22} />
                  </span>
                  <span className="logo-lg">
                    <br />
                    <b>Warning</b>: Undefined variable $u_company_logo in{" "}
                    <b>
                      C:\xampp\htdocs\schoolmanagement\feesfinal\RegistrationForm_Detail.php
                    </b>{" "}
                    on line <b>38</b>
                    <br />
                    <img src="logo.png" alt="" height={22} />
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
              <div className="ms-1 header-item  d-sm-flex">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle light-dark-mode"
                >
                  <i className="bx bx-moon fs-22" />
                </button>
              </div>
              {/* ========== App Menu ========== */}
              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn material-shadow-none"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle header-profile-user"
                      src="../img/13-08-2024-18-17-25author-img4.jpg"
                      alt="Header Avatar"
                    />
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                        Little Flower Convent School
                      </span>
                    </span>
                  </span>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  {/* item*/}
                  <h6 className="dropdown-header">
                    Welcome Little Flower Convent School!
                  </h6>
                  <a className="dropdown-item" href="profile.php">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />{" "}
                    <span className="align-middle">Edit Profile</span>
                  </a>
                  <a className="dropdown-item" href="logout.php">
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />{" "}
                    <span className="align-middle" data-key="t-logout">
                      Logout
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default RegistrationForm;
