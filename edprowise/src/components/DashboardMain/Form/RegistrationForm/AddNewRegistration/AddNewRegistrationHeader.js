import React from "react";

const AddNewRegistrationHeader = () => {
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
                    {/*?php if($u_company_logo!='') { ?*/}
                    <img
                      src="../img/<?php echo $u_company_logo; ?>"
                      style={{ height: 22 }}
                    />
                    {/*?php } else { ?*/}
                    <img src="logo.png" alt="" height={22} />
                    {/*?php } ?*/}
                  </span>
                  <span className="logo-lg">
                    {/*?php if($u_company_logo!='') { ?*/}
                    <img
                      src="../img/<?php echo $u_company_logo; ?>"
                      style={{ height: 17 }}
                    />
                    {/*?php } else { ?*/}
                    <img src="logo.png" alt="" height={22} />
                    {/*?php } ?*/}
                  </span>
                </a>
                <a href="index.php" className="logo logo-light">
                  <span className="logo-sm">
                    {/*?php if($u_company_logo!='') { ?*/}
                    <img
                      src="../img/<?php echo $u_company_logo; ?>"
                      style={{ height: 22 }}
                    />
                    {/*?php } else { ?*/}
                    <img src="logo.png" alt="" height={22} />
                    {/*?php } ?*/}
                  </span>
                  <span className="logo-lg">
                    {/*?php if($u_company_logo!='') { ?*/}
                    <img
                      src="../img/<?php echo $u_company_logo; ?>"
                      style={{ height: 17 }}
                    />
                    {/*?php } else { ?*/}
                    <img src="logo.png" alt="" height={22} />
                    {/*?php } ?*/}
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
                  <b>REGISTRATION FORM</b>
                </span>
              </span>
            </div>
            <div className="d-flex align-items-center">
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
              {/*?php include('hedder-top.php'); ?*/}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AddNewRegistrationHeader;
