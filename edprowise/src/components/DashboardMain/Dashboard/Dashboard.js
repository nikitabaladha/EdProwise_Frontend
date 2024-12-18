import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardCards from "./DashboardCards";

const Dashboard = () => {
  return (
    <>
      <div className="wrapper">
        {/* ========== Topbar Start ========== */}
        <header className="topbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="d-flex align-items-center">
                {/* Menu Toggle Button */}
                <div className="topbar-item">
                  <button type="button" className="button-toggle-menu me-2">
                    <iconify-icon
                      icon="solar:hamburger-menu-broken"
                      className="fs-24 align-middle"
                    />
                  </button>
                </div>
                {/* Menu Toggle Button */}
                <div className="topbar-item">
                  <h4 className="fw-bold topbar-button pe-none text-uppercase mb-0">
                    Welcome!
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
                          <a
                            href="javascript: void(0);"
                            className="text-dark text-decoration-underline"
                          >
                            <small>Clear All</small>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div data-simplebar="" style={{ maxHeight: 280 }}>
                      {/* Item */}
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item py-3 border-bottom text-wrap"
                      >
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              src="assets/images/users/avatar-1.jpg"
                              className="img-fluid me-2 avatar-sm rounded-circle"
                              alt="avatar-1"
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
                      </a>
                      {/* Item */}
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item py-3 border-bottom"
                      >
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
                      </a>
                      {/* Item */}
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item py-3 border-bottom"
                      >
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              src="assets/images/users/avatar-3.jpg"
                              className="img-fluid me-2 avatar-sm rounded-circle"
                              alt="avatar-3"
                            />
                          </div>
                          <div className="flex-grow-1">
                            <p className="mb-0 fw-semibold">Jacob Gines</p>
                            <p className="mb-0 text-wrap">
                              Answered to your comment on the cash flow
                              forecast's graph 🔔.
                            </p>
                          </div>
                        </div>
                      </a>
                      {/* Item */}
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item py-3 border-bottom"
                      >
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
                      </a>
                      {/* Item */}
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item py-3 border-bottom"
                      >
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img
                              src="assets/images/users/avatar-5.jpg"
                              className="img-fluid me-2 avatar-sm rounded-circle"
                              alt="avatar-5"
                            />
                          </div>
                          <div className="flex-grow-1">
                            <p className="mb-0 fw-semibold">Shawn Bunch</p>
                            <p className="mb-0 text-wrap">Commented on Admin</p>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="text-center py-3">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-primary btn-sm"
                      >
                        View All Notification{" "}
                        <i className="bx bx-right-arrow-alt ms-1" />
                      </a>
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
                    data-bs-target="#theme-settings-offcanvas"
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
                  <a
                    type="button"
                    className="topbar-button"
                    id="page-header-user-dropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="d-flex align-items-center">
                      <img
                        className="rounded-circle"
                        width={32}
                        src="assets/images/users/avatar-1.jpg"
                        alt="avatar-3"
                      />
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    {/* item*/}
                    <h6 className="dropdown-header">Welcome Gaston!</h6>
                    <a className="dropdown-item" href="pages-profile.html">
                      <i className="bx bx-user-circle text-muted fs-18 align-middle me-1" />
                      <span className="align-middle">Profile</span>
                    </a>
                    <a className="dropdown-item" href="apps-chat.html">
                      <i className="bx bx-message-dots text-muted fs-18 align-middle me-1" />
                      <span className="align-middle">Messages</span>
                    </a>
                    <a className="dropdown-item" href="pages-pricing.html">
                      <i className="bx bx-wallet text-muted fs-18 align-middle me-1" />
                      <span className="align-middle">Pricing</span>
                    </a>
                    <a className="dropdown-item" href="pages-faqs.html">
                      <i className="bx bx-help-circle text-muted fs-18 align-middle me-1" />
                      <span className="align-middle">Help</span>
                    </a>
                    <a className="dropdown-item" href="auth-lock-screen.html">
                      <i className="bx bx-lock text-muted fs-18 align-middle me-1" />
                      <span className="align-middle">Lock screen</span>
                    </a>
                    <div className="dropdown-divider my-1" />
                    <a
                      className="dropdown-item text-danger"
                      href="auth-signin.html"
                    >
                      <i className="bx bx-log-out fs-18 align-middle me-1" />
                      <span className="align-middle">Logout</span>
                    </a>
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

        {/* Activity Timeline */}
        <div>
          <div
            className="offcanvas offcanvas-end border-0"
            tabIndex={-1}
            id="theme-activity-offcanvas"
            style={{ maxWidth: 450, width: "100%" }}
          >
            <div className="d-flex align-items-center bg-primary p-3 offcanvas-header">
              <h5 className="text-white m-0 fw-semibold">Activity Stream</h5>
              <button
                type="button"
                className="btn-close btn-close-white ms-auto"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body p-0">
              <div data-simplebar="" className="h-100 p-4">
                <div className="position-relative ms-2">
                  <span className="position-absolute start-0  top-0 border border-dashed h-100" />
                  <div className="position-relative ps-4">
                    <div className="mb-4">
                      <span className="position-absolute start-0 avatar-sm translate-middle-x bg-danger d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-20">
                        <iconify-icon icon="iconamoon:folder-check-duotone" />
                      </span>
                      <div className="ms-2">
                        <h5 className="mb-1 text-dark fw-semibold fs-15 lh-base">
                          Report-Fix / Update{" "}
                        </h5>
                        <p className="d-flex align-items-center">
                          Add 3 files to{" "}
                          <span className=" d-flex align-items-center text-primary ms-1">
                            <iconify-icon icon="iconamoon:file-light" /> Tasks
                          </span>
                        </p>
                        <div className="bg-light bg-opacity-50 rounded-2 p-2">
                          <div className="row">
                            <div className="col-lg-6 border-end border-light">
                              <div className="d-flex align-items-center gap-2">
                                <i className="bx bxl-figma fs-20 text-red" />
                                <a href="#!" className="text-dark fw-medium">
                                  Concept.fig
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="d-flex align-items-center gap-2">
                                <i className="bx bxl-file-doc fs-20 text-success" />
                                <a href="#!" className="text-dark fw-medium">
                                  larkon.docs
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h6 className="mt-2 text-muted">Monday , 4:24 PM</h6>
                      </div>
                    </div>
                  </div>
                  <div className="position-relative ps-4">
                    <div className="mb-4">
                      <span className="position-absolute start-0 avatar-sm translate-middle-x bg-success d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-20">
                        <iconify-icon icon="iconamoon:check-circle-1-duotone" />
                      </span>
                      <div className="ms-2">
                        <h5 className="mb-1 text-dark fw-semibold fs-15 lh-base">
                          Project Status
                        </h5>
                        <p className="d-flex align-items-center mb-0">
                          Marked
                          <span className=" d-flex align-items-center text-primary mx-1">
                            <iconify-icon icon="iconamoon:file-light" /> Design{" "}
                          </span>{" "}
                          as{" "}
                          <span className="badge bg-success-subtle text-success px-2 py-1 ms-1">
                            {" "}
                            Completed
                          </span>
                        </p>
                        <div className="d-flex align-items-center gap-3 mt-1 bg-light bg-opacity-50 p-2 rounded-2">
                          <a href="#!" className="fw-medium text-dark">
                            UI/UX Figma Design
                          </a>
                          <div className="ms-auto">
                            <a
                              href="#!"
                              className="fw-medium text-primary fs-18"
                              data-bs-toggle="tooltip"
                              data-bs-title="Download"
                              data-bs-placement="bottom"
                            >
                              <iconify-icon icon="iconamoon:cloud-download-duotone" />
                            </a>
                          </div>
                        </div>
                        <h6 className="mt-3 text-muted">Monday , 3:00 PM</h6>
                      </div>
                    </div>
                  </div>
                  <div className="position-relative ps-4">
                    <div className="mb-4">
                      <span className="position-absolute start-0 avatar-sm translate-middle-x bg-primary d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-16">
                        UI
                      </span>
                      <div className="ms-2">
                        <h5 className="mb-1 text-dark fw-semibold fs-15">
                          Larkon Application UI v2.0.0{" "}
                          <span className="badge bg-primary-subtle text-primary px-2 py-1 ms-1">
                            {" "}
                            Latest
                          </span>
                        </h5>
                        <p>
                          Get access to over 20+ pages including a dashboard
                          layout, charts, kanban board, calendar, and pre-order
                          E-commerce &amp; Marketing pages.
                        </p>
                        <div className="mt-2">
                          <a href="#!" className="btn btn-light btn-sm">
                            Download Zip
                          </a>
                        </div>
                        <h6 className="mt-3 text-muted">Monday , 2:10 PM</h6>
                      </div>
                    </div>
                  </div>
                  <div className="position-relative ps-4">
                    <div className="mb-4">
                      <span className="position-absolute start-0 translate-middle-x bg-success bg-gradient d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-20">
                        <img
                          src="assets/images/users/avatar-7.jpg"
                          alt="avatar-5"
                          className="avatar-sm rounded-circle"
                        />
                      </span>
                      <div className="ms-2">
                        <h5 className="mb-0 text-dark fw-semibold fs-15 lh-base">
                          Alex Smith Attached Photos
                        </h5>
                        <div className="row g-2 mt-2">
                          <div className="col-lg-4">
                            <a href="#!">
                              <img
                                src="assets/images/small/img-6.jpg"
                                alt=""
                                className="img-fluid rounded"
                              />
                            </a>
                          </div>
                          <div className="col-lg-4">
                            <a href="#!">
                              <img
                                src="assets/images/small/img-3.jpg"
                                alt=""
                                className="img-fluid rounded"
                              />
                            </a>
                          </div>
                          <div className="col-lg-4">
                            <a href="#!">
                              <img
                                src="assets/images/small/img-4.jpg"
                                alt=""
                                className="img-fluid rounded"
                              />
                            </a>
                          </div>
                        </div>
                        <h6 className="mt-3 text-muted">Monday 1:00 PM</h6>
                      </div>
                    </div>
                  </div>
                  <div className="position-relative ps-4">
                    <div className="mb-4">
                      <span className="position-absolute start-0 translate-middle-x bg-success bg-gradient d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-20">
                        <img
                          src="assets/images/users/avatar-6.jpg"
                          alt="avatar-5"
                          className="avatar-sm rounded-circle"
                        />
                      </span>
                      <div className="ms-2">
                        <h5 className="mb-0 text-dark fw-semibold fs-15 lh-base">
                          Rebecca J. added a new team member
                        </h5>
                        <p className="d-flex align-items-center gap-1">
                          <iconify-icon
                            icon="iconamoon:check-circle-1-duotone"
                            className="text-success"
                          />{" "}
                          Added a new member to Front Dashboard
                        </p>
                        <h6 className="mt-3 text-muted">Monday 10:00 AM</h6>
                      </div>
                    </div>
                  </div>
                  <div className="position-relative ps-4">
                    <div className="mb-4">
                      <span className="position-absolute start-0 avatar-sm translate-middle-x bg-warning d-inline-flex align-items-center justify-content-center rounded-circle text-light fs-20">
                        <iconify-icon icon="iconamoon:certificate-badge-duotone" />
                      </span>
                      <div className="ms-2">
                        <h5 className="mb-0 text-dark fw-semibold fs-15 lh-base">
                          Achievements
                        </h5>
                        <p className="d-flex align-items-center gap-1 mt-1">
                          Earned a{" "}
                          <iconify-icon
                            icon="iconamoon:certificate-badge-duotone"
                            className="text-danger fs-20"
                          />
                          " Best Product Award"
                        </p>
                        <h6 className="mt-3 text-muted">Monday 9:30 AM</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#!" className="btn btn-outline-dark w-100">
                  View All
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========== Topbar End ========== */}
        {/* ========== App Menu Start ========== */}
        <div className="main-nav">
          {/* Sidebar Logo */}
          <div className="logo-box">
            <a href="index.html" className="logo-dark">
              <img
                src="assets/images/logo-sm.png"
                className="logo-sm"
                alt="logo sm"
              />
              <img
                src="assets/images/logo-dark.png"
                className="logo-lg"
                alt="logo dark"
              />
            </a>
            <a href="index.html" className="logo-light">
              <img
                src="assets/images/logo-sm.png"
                className="logo-sm"
                alt="logo sm"
              />
              <img
                src="assets/images/logo-light.png"
                className="logo-lg"
                alt="logo light"
              />
            </a>
          </div>
          {/* Menu Toggle Button (sm-hover) */}
          <button
            type="button"
            className="button-sm-hover"
            aria-label="Show Full Sidebar"
          >
            <iconify-icon
              icon="solar:double-alt-arrow-right-bold-duotone"
              className="button-sm-hover-icon"
            />
          </button>
          <div className="scrollbar" data-simplebar="">
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title">General</li>
              <li className="nav-item">
                <a className="nav-link" href="index.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:widget-5-bold-duotone" />
                  </span>
                  <span className="nav-text"> Dashboard </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarProducts"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarProducts"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:t-shirt-bold-duotone" />
                  </span>
                  <span className="nav-text"> Products </span>
                </a>
                <div className="collapse" id="sidebarProducts">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="product-list.html">
                        List
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="product-grid.html">
                        Grid
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="product-details.html">
                        Details
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="product-edit.html">
                        Edit
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="product-add.html">
                        Create
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarCategory"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarCategory"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:clipboard-list-bold-duotone" />
                  </span>
                  <span className="nav-text"> Category </span>
                </a>
                <div className="collapse" id="sidebarCategory">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="category-list.html">
                        List
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="category-edit.html">
                        Edit
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="category-add.html">
                        Create
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarInventory"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarInventory"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:box-bold-duotone" />
                  </span>
                  <span className="nav-text"> Inventory </span>
                </a>
                <div className="collapse" id="sidebarInventory">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="inventory-warehouse.html"
                      >
                        Warehouse
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="inventory-received-orders.html"
                      >
                        Received Orders
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarOrders"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarOrders"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:bag-smile-bold-duotone" />
                  </span>
                  <span className="nav-text"> Orders </span>
                </a>
                <div className="collapse" id="sidebarOrders">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="orders-list.html">
                        List
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="order-detail.html">
                        Details
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="order-cart.html">
                        Cart
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="order-checkout.html">
                        Check Out
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarPurchases"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarPurchases"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:card-send-bold-duotone" />
                  </span>
                  <span className="nav-text"> Purchases </span>
                </a>
                <div className="collapse" id="sidebarPurchases">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="purchase-list.html">
                        List
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="purchase-order.html">
                        Order
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="purchase-returns.html">
                        Return
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarAttributes"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarAttributes"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:confetti-minimalistic-bold-duotone" />
                  </span>
                  <span className="nav-text"> Attributes </span>
                </a>
                <div className="collapse" id="sidebarAttributes">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="attributes-list.html">
                        List
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="attributes-edit.html">
                        Edit
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="attributes-add.html">
                        Create
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarInvoice"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarInvoice"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:bill-list-bold-duotone" />
                  </span>
                  <span className="nav-text"> Invoices </span>
                </a>
                <div className="collapse" id="sidebarInvoice">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="invoice-list.html">
                        List
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="invoice-details.html">
                        Details
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="invoice-add.html">
                        Create
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="settings.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:settings-bold-duotone" />
                  </span>
                  <span className="nav-text"> Settings </span>
                </a>
              </li>
              <li className="menu-title mt-2">Users</li>
              <li className="nav-item">
                <a className="nav-link" href="pages-profile.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:chat-square-like-bold-duotone" />
                  </span>
                  <span className="nav-text"> Profile </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarRoles"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarRoles"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:user-speak-rounded-bold-duotone" />
                  </span>
                  <span className="nav-text"> Roles </span>
                </a>
                <div className="collapse" id="sidebarRoles">
                  <ul className="nav sub-navbar-nav">
                    <ul className="nav sub-navbar-nav">
                      <li className="sub-nav-item">
                        <a className="sub-nav-link" href="role-list.html">
                          List
                        </a>
                      </li>
                      <li className="sub-nav-item">
                        <a className="sub-nav-link" href="role-edit.html">
                          Edit
                        </a>
                      </li>
                      <li className="sub-nav-item">
                        <a className="sub-nav-link" href="role-add.html">
                          Create
                        </a>
                      </li>
                    </ul>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages-permissions.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:checklist-minimalistic-bold-duotone" />
                  </span>
                  <span className="nav-text"> Permissions </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarCustomers"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarCustomers"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:users-group-two-rounded-bold-duotone" />
                  </span>
                  <span className="nav-text"> Customers </span>
                </a>
                <div className="collapse" id="sidebarCustomers">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="customer-list.html">
                        List
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="customer-detail.html">
                        Details
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarSellers"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarSellers"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:shop-bold-duotone" />
                  </span>
                  <span className="nav-text"> Sellers </span>
                </a>
                <div className="collapse" id="sidebarSellers">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="seller-list.html">
                        List
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="seller-details.html">
                        Details
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="seller-edit.html">
                        Edit
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="seller-add.html">
                        Create
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu-title mt-2">Other</li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarCoupons"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarCoupons"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:leaf-bold-duotone" />
                  </span>
                  <span className="nav-text"> Coupons </span>
                </a>
                <div className="collapse" id="sidebarCoupons">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="coupons-list.html">
                        List
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="coupons-add.html">
                        Add
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages-review.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:chat-square-like-bold-duotone" />
                  </span>
                  <span className="nav-text"> Reviews </span>
                </a>
              </li>
              <li className="menu-title mt-2">Other Apps</li>
              <li className="nav-item">
                <a className="nav-link" href="apps-chat.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:chat-round-bold-duotone" />
                  </span>
                  <span className="nav-text"> Chat </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="apps-email.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:mailbox-bold-duotone" />
                  </span>
                  <span className="nav-text"> Email </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="apps-calendar.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:calendar-bold-duotone" />
                  </span>
                  <span className="nav-text"> Calendar </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="apps-todo.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:checklist-bold-duotone" />
                  </span>
                  <span className="nav-text"> Todo </span>
                </a>
              </li>
              <li className="menu-title mt-2">Support</li>
              <li className="nav-item">
                <a className="nav-link" href="help-center.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:help-bold-duotone" />
                  </span>
                  <span className="nav-text"> Help Center </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="pages-faqs.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:question-circle-bold-duotone" />
                  </span>
                  <span className="nav-text"> FAQs </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="privacy-policy.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:document-text-bold-duotone" />
                  </span>
                  <span className="nav-text"> Privacy Policy </span>
                </a>
              </li>
              <li className="menu-title mt-2">Custom</li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarPages"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarPages"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:gift-bold-duotone" />
                  </span>
                  <span className="nav-text"> Pages </span>
                </a>
                <div className="collapse" id="sidebarPages">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="pages-starter.html">
                        Welcome
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="pages-comingsoon.html">
                        Coming Soon
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="pages-timeline.html">
                        Timeline
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="pages-pricing.html">
                        Pricing
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="pages-maintenance.html">
                        Maintenance
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="pages-404.html">
                        404 Error
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="pages-404-alt.html">
                        404 Error (alt)
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarAuthentication"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarAuthentication"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:lock-keyhole-bold-duotone" />
                  </span>
                  <span className="nav-text"> Authentication </span>
                </a>
                <div className="collapse" id="sidebarAuthentication">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="auth-signin.html">
                        Sign In
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="auth-signup.html">
                        Sign Up
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="auth-password.html">
                        Reset Password
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="auth-lock-screen.html">
                        Lock Screen
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="widgets.html">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:atom-bold-duotone" />
                  </span>
                  <span className="nav-text">Widgets</span>
                  <span className="badge bg-info badge-pill text-end">9+</span>
                </a>
              </li>
              <li className="menu-title mt-2">Components</li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarBaseUI"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarBaseUI"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:bookmark-square-bold-duotone" />
                  </span>
                  <span className="nav-text"> Base UI </span>
                </a>
                <div className="collapse" id="sidebarBaseUI">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-accordion.html">
                        Accordion
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-alerts.html">
                        Alerts
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-avatar.html">
                        Avatar
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-badge.html">
                        Badge
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-breadcrumb.html">
                        Breadcrumb
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-buttons.html">
                        Buttons
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-card.html">
                        Card
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-carousel.html">
                        Carousel
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-collapse.html">
                        Collapse
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-dropdown.html">
                        Dropdown
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-list-group.html">
                        List Group
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-modal.html">
                        Modal
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-tabs.html">
                        Tabs
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-offcanvas.html">
                        Offcanvas
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-pagination.html">
                        Pagination
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-placeholders.html">
                        Placeholders
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-popovers.html">
                        Popovers
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-progress.html">
                        Progress
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-scrollspy.html">
                        Scrollspy
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-spinners.html">
                        Spinners
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-toasts.html">
                        Toasts
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="ui-tooltips.html">
                        Tooltips
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarExtendedUI"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarExtendedUI"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:case-round-bold-duotone" />
                  </span>
                  <span className="nav-text"> Advanced UI </span>
                </a>
                <div className="collapse" id="sidebarExtendedUI">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="extended-ratings.html">
                        Ratings
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="extended-sweetalert.html"
                      >
                        Sweet Alert
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="extended-swiper-silder.html"
                      >
                        Swiper Slider
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="extended-scrollbar.html"
                      >
                        Scrollbar
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="extended-toastify.html">
                        Toastify
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarCharts"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarCharts"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:pie-chart-2-bold-duotone" />
                  </span>
                  <span className="nav-text"> Charts </span>
                </a>
                <div className="collapse" id="sidebarCharts">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="charts-apex-area.html">
                        Area
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="charts-apex-bar.html">
                        Bar
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="charts-apex-bubble.html"
                      >
                        Bubble
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="charts-apex-candlestick.html"
                      >
                        Candlestick
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="charts-apex-column.html"
                      >
                        Column
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="charts-apex-heatmap.html"
                      >
                        Heatmap
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="charts-apex-line.html">
                        Line
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="charts-apex-mixed.html">
                        Mixed
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="charts-apex-timeline.html"
                      >
                        Timeline
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="charts-apex-boxplot.html"
                      >
                        Boxplot
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="charts-apex-treemap.html"
                      >
                        Treemap
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="charts-apex-pie.html">
                        Pie
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="charts-apex-radar.html">
                        Radar
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="charts-apex-radialbar.html"
                      >
                        RadialBar
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="charts-apex-scatter.html"
                      >
                        Scatter
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="charts-apex-polar-area.html"
                      >
                        Polar Area
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarForms"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarForms"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:book-bookmark-bold-duotone" />
                  </span>
                  <span className="nav-text"> Forms </span>
                </a>
                <div className="collapse" id="sidebarForms">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="forms-basic.html">
                        Basic Elements
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="forms-checkbox-radio.html"
                      >
                        Checkbox &amp; Radio
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="forms-choices.html">
                        Choice Select
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="forms-clipboard.html">
                        Clipboard
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="forms-flatepicker.html">
                        Flatepicker
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="forms-validation.html">
                        Validation
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="forms-wizard.html">
                        Wizard
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="forms-fileuploads.html">
                        File Upload
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="forms-editors.html">
                        Editors
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="forms-input-mask.html">
                        Input Mask
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link"
                        href="forms-range-slider.html"
                      >
                        Slider
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarTables"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarTables"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:tuning-2-bold-duotone" />
                  </span>
                  <span className="nav-text"> Tables </span>
                </a>
                <div className="collapse" id="sidebarTables">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="tables-basic.html">
                        Basic Tables
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="tables-gridjs.html">
                        Grid Js
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarIcons"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarIcons"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:ufo-2-bold-duotone" />
                  </span>
                  <span className="nav-text"> Icons </span>
                </a>
                <div className="collapse" id="sidebarIcons">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="icons-boxicons.html">
                        Boxicons
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="icons-solar.html">
                        Solar Icons
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarMaps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarMaps"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:streets-map-point-bold-duotone" />
                  </span>
                  <span className="nav-text"> Maps </span>
                </a>
                <div className="collapse" id="sidebarMaps">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="maps-google.html">
                        Google Maps
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="maps-vector.html">
                        Vector Maps
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:volleyball-bold-duotone" />
                  </span>
                  <span className="nav-text">Badge Menu</span>
                  <span className="badge bg-danger badge-pill text-end">1</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-arrow"
                  href="#sidebarMultiLevelDemo"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarMultiLevelDemo"
                >
                  <span className="nav-icon">
                    <iconify-icon icon="solar:share-circle-bold-duotone" />
                  </span>
                  <span className="nav-text"> Menu Item </span>
                </a>
                <div className="collapse" id="sidebarMultiLevelDemo">
                  <ul className="nav sub-navbar-nav">
                    <li className="sub-nav-item">
                      <a className="sub-nav-link" href="javascript:void(0);">
                        Menu Item 1
                      </a>
                    </li>
                    <li className="sub-nav-item">
                      <a
                        className="sub-nav-link  menu-arrow"
                        href="#sidebarItemDemoSubItem"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarItemDemoSubItem"
                      >
                        <span> Menu Item 2 </span>
                      </a>
                      <div className="collapse" id="sidebarItemDemoSubItem">
                        <ul className="nav sub-navbar-nav">
                          <li className="sub-nav-item">
                            <a
                              className="sub-nav-link"
                              href="javascript:void(0);"
                            >
                              Menu Sub item
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="javascript:void(0);">
                  <span className="nav-icon">
                    <iconify-icon icon="solar:user-block-rounded-bold-duotone" />
                  </span>
                  <span className="nav-text"> Disable Item </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* ========== App Menu End ========== */}
        {/* ==================================================== */}
        {/* Start right Content here */}
        {/* ==================================================== */}
        <div className="page-content">
          {/* Start Container Fluid */}

          {/* End Container Fluid */}
          {/* ========== Footer Start ========== */}
          <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 text-center">
                  © Larkon. Crafted by{" "}
                  <iconify-icon
                    icon="iconamoon:heart-duotone"
                    className="fs-18 align-middle text-danger"
                  />{" "}
                  <a
                    href="https://1.envato.market/techzaa"
                    className="fw-bold footer-text"
                    target="_blank"
                  >
                    Techzaa
                  </a>
                </div>
              </div>
            </div>
          </footer>
          {/* ========== Footer End ========== */}
        </div>
        {/* ==================================================== */}
        {/* End Page Content */}
        {/* ==================================================== */}
      </div>
    </>
  );
};

export default Dashboard;
