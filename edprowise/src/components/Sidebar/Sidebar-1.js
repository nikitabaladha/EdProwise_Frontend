import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import { Icon } from "@iconify/react";
import { GiMoneyStack } from "react-icons/gi";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [rotatedMenu, setRotatedMenu] = useState(null);

  const toggleMenu = (menuId) => {
    setOpenMenu((prev) => (prev === menuId ? null : menuId));
    setRotatedMenu((prev) => (prev === menuId ? null : menuId));
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "solar:widget-5-bold-duotone",
      link: "/dashboard",
    },
    {
      id: "client",
      label: "Schools",
      icon: "solar:users-group-rounded-bold-duotone",
      link: "/dashboard/schools",
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      icon: "solar:wallet-money-bold",
      link: "/dashboard/subscriptions",
    },

    {
      id: "feesManagement",
      label: "Fees Management",
      icon: "game-icons:money-stack",
      link: "/dashboard/feesManagement",
    },
    {
      id: "payrollManagement",
      label: "Payroll Management",
      icon: "solar:hand-money-bold",
      link: "/dashboard/payrollManagement",
    },
    {
      id: "finance",
      label: "Finance Management",
      icon: "solar:graph-up-bold",
      link: "/dashboard/finance",
    },
    {
      id: "schoolManagement",
      label: "School Management",
      icon: "solar:buildings-2-bold-duotone",
      link: "/dashboard/schoolManagement",
    },
  ];

  return (
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
                  <a className="sub-nav-link" href="inventory-warehouse.html">
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
                  <a className="sub-nav-link" href="extended-sweetalert.html">
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
                  <a className="sub-nav-link" href="extended-scrollbar.html">
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
                  <a className="sub-nav-link" href="charts-apex-bubble.html">
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
                  <a className="sub-nav-link" href="charts-apex-column.html">
                    Column
                  </a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="charts-apex-heatmap.html">
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
                  <a className="sub-nav-link" href="charts-apex-timeline.html">
                    Timeline
                  </a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="charts-apex-boxplot.html">
                    Boxplot
                  </a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="charts-apex-treemap.html">
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
                  <a className="sub-nav-link" href="charts-apex-radialbar.html">
                    RadialBar
                  </a>
                </li>
                <li className="sub-nav-item">
                  <a className="sub-nav-link" href="charts-apex-scatter.html">
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
                  <a className="sub-nav-link" href="forms-checkbox-radio.html">
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
                  <a className="sub-nav-link" href="forms-range-slider.html">
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
                        <a className="sub-nav-link" href="javascript:void(0);">
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
  );
};

export default Sidebar;
