import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiMessageDots } from "react-icons/bi";
import { IoWalletOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { PiLockKeyBold } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";

const SchoolDashboardHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    window.location.href = "/login";
  };

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  console.log("userDetails", userDetails);

  const toggleSidebar = () => {
    const htmlElement = document.documentElement; // Selects the <html> tag
    const bodyElement = document.body; // Selects the <body> tag

    // Toggle the 'sidebar-enable' class on the <html> tag
    htmlElement.classList.toggle("sidebar-enable");

    // Toggle the 'overflow: hidden' style on the <body> element
    if (bodyElement.style.overflow === "hidden") {
      bodyElement.style.overflow = ""; // Remove the style
    } else {
      bodyElement.style.overflow = "hidden"; // Add the style
    }
  };

  const handleDocumentClick = (event) => {
    const htmlElement = document.documentElement; // Select the <html> tag
    const mainNav = document.querySelector(".main-nav"); // Select the main-nav element

    // Check if sidebar is enabled and click is outside the main-nav
    if (
      htmlElement.classList.contains("sidebar-enable") &&
      mainNav &&
      !mainNav.contains(event.target)
    ) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    // Attach event listener for clicking outside the main-nav
    document.addEventListener("click", handleDocumentClick);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <>
      <header className="topbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="d-flex align-items-center">
              <div className="topbar-item">
                <button
                  type="button"
                  className="button-toggle-menu me-2"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSidebar();
                  }}
                >
                  <iconify-icon
                    icon="solar:hamburger-menu-broken"
                    className="fs-24 align-middle"
                  />
                </button>
              </div>
              {/* Menu Toggle Button */}
              <div className="topbar-item">
                <h4 className="fw-bold topbar-button pe-none text-uppercase mb-0">
                  Welcome! {userDetails?.firstName} {userDetails?.lastName}
                </h4>
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              {/* Theme Color (Light/Dark) */}
              <div className="topbar-item">
                <button
                  type="button"
                  className="topbar-button"
                  id="light-dark-mode"
                  onClick={toggleTheme}
                >
                  <iconify-icon
                    icon="solar:moon-bold-duotone"
                    className="fs-24 align-middle"
                  />
                </button>
              </div>
              {/* Notification */}
              <div className="dropdown topbar-item">
                <button
                  type="button"
                  className="topbar-button position-relative"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <iconify-icon
                    icon="solar:bell-bing-bold-duotone"
                    className="fs-24 align-middle"
                  />
                  <span className="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill">
                    3<span className="visually-hidden">unread messages</span>
                  </span>
                </button>
                <div
                  className="dropdown-menu py-0 dropdown-lg dropdown-menu-end"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 fs-16 fw-semibold">
                          {" "}
                          Notifications
                        </h6>
                      </div>
                      <div className="col-auto">
                        <Link
                          to=""
                          className="text-dark text-decoration-underline"
                        >
                          <small>Clear All</small>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div data-simplebar="" style={{ maxHeight: 280 }}>
                    {/* Item */}
                    <Link
                      to=""
                      className="dropdown-item py-3 border-bottom text-wrap"
                    >
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <img
                            src="assets/images/users/avatar-1.jpg"
                            className="img-fluid me-2 avatar-sm rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0">
                            <span className="fw-medium">
                              Josephine Thompson{" "}
                            </span>
                            commented on admin panel{" "}
                            <span>
                              " Wow 😍! this admin looks good and awesome
                              design"
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* Item */}
                    <Link to="" className="dropdown-item py-3 border-bottom">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="avatar-sm me-2">
                            <span className="avatar-title bg-soft-info text-info fs-20 rounded-circle">
                              D
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold">Donoghue Susan</p>
                          <p className="mb-0 text-wrap">
                            Hi, How are you? What about our next meeting
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* Item */}
                    <Link to="" className="dropdown-item py-3 border-bottom">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <img
                            src="assets/images/users/avatar-3.jpg"
                            className="img-fluid me-2 avatar-sm rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold">Jacob Gines</p>
                          <p className="mb-0 text-wrap">
                            Answered to your comment on the cash flow forecast's
                            graph 🔔.
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* Item */}
                    <Link to="" className="dropdown-item py-3 border-bottom">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="avatar-sm me-2">
                            <span className="avatar-title bg-soft-warning text-warning fs-20 rounded-circle">
                              <iconify-icon icon="iconamoon:comment-dots-duotone" />
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold text-wrap">
                            You have received <b>20</b> new messages in the
                            conversation
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* Item */}
                    <Link to="" className="dropdown-item py-3 border-bottom">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <img
                            src="assets/images/users/avatar-5.jpg"
                            className="img-fluid me-2 avatar-sm rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold">Shawn Bunch</p>
                          <p className="mb-0 text-wrap">Commented on Admin</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="text-center py-3">
                    <Link to="to" className="btn btn-primary btn-sm">
                      View All Notification{" "}
                      <i className="bx bx-right-arrow-alt ms-1" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* Theme Setting */}
              <div className="topbar-item d-none d-md-flex">
                <button
                  type="button"
                  className="topbar-button"
                  id="theme-settings-btn"
                  data-bs-toggle="offcanvas"
                  data-bs-target=""
                  aria-controls="theme-settings-offcanvas"
                >
                  <iconify-icon
                    icon="solar:settings-bold-duotone"
                    className="fs-24 align-middle"
                  />
                </button>
              </div>
              {/* Activity */}
              <div className="topbar-item d-none d-md-flex">
                <button
                  type="button"
                  className="topbar-button"
                  id="theme-settings-btn"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#theme-activity-offcanvas"
                  aria-controls="theme-settings-offcanvas"
                >
                  <iconify-icon
                    icon="solar:clock-circle-bold-duotone"
                    className="fs-24 align-middle"
                  />
                </button>
              </div>
              {/* User */}
              <div className="dropdown topbar-item">
                <Link
                  type="button"
                  className="topbar-button"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                      className="rounded-circle"
                      alt="logo light"
                      width={32}
                    />
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                  {/* item*/}
                  <h6 className="dropdown-header">
                    Welcome {userDetails?.firstName} {userDetails?.lastName}
                  </h6>
                  <Link className="dropdown-item" href="pages-profile.html">
                    <CgProfile className="bx bx-user-circle text-muted fs-18 align-middle me-1" />
                    <span className="align-middle">Profile</span>
                  </Link>
                  <Link className="dropdown-item" href="apps-chat.html">
                    <BiMessageDots className="bx bx-message-dots text-muted fs-18 align-middle me-1" />
                    <span className="align-middle">Messages</span>
                  </Link>
                  <Link className="dropdown-item" href="pages-pricing.html">
                    <IoWalletOutline className="bx bx-wallet text-muted fs-18 align-middle me-1" />
                    <span className="align-middle">Pricing</span>
                  </Link>
                  <Link className="dropdown-item" href="pages-faqs.html">
                    <IoMdHelpCircleOutline className="bx bx-help-circle text-muted fs-18 align-middle me-1" />
                    <span className="align-middle">Help</span>
                  </Link>
                  <Link className="dropdown-item" href="auth-lock-screen.html">
                    <PiLockKeyBold className="bx bx-lock text-muted fs-18 align-middle me-1" />
                    <span className="align-middle">Lock screen</span>
                  </Link>
                  <div className="dropdown-divider my-1" />
                  <Link
                    className="dropdown-item text-danger"
                    href="auth-signin.html"
                  >
                    <BiLogOut className="bx bx-log-out fs-18 align-middle me-1" />
                    <span className="align-middle" onClick={handleLogout}>
                      Logout
                    </span>
                  </Link>
                </div>
              </div>
              {/* App Search*/}
              <form className="app-search d-none d-md-block ms-2">
                <div className="position-relative">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    autoComplete="off"
                    defaultValue=""
                  />
                  <iconify-icon
                    icon="solar:magnifer-linear"
                    className="search-widget-icon"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default SchoolDashboardHeader;
