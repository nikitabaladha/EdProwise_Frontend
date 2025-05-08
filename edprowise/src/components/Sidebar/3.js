import React from 'react';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userRole = userDetails?.role || "Guest";
  const email = userDetails?.email;

  useEffect(() => {
    const htmlTag = document.documentElement;

    const updateMenuSize = () => {
      if (window.innerWidth >= 992) {
        htmlTag.setAttribute("data-menu-size", "sm-hover-active");
        if (htmlTag.getAttribute("data-menu-size") === "hidden") {
          htmlTag.removeAttribute("data-menu-size");
          htmlTag.setAttribute("data-menu-size", "sm-hover-active");
        }
      } else {
        htmlTag.setAttribute("data-menu-size", "hidden");
      }
    };

    updateMenuSize();
    window.addEventListener('resize', updateMenuSize);

    return () => {
      window.removeEventListener('resize', updateMenuSize);
    };
  }, []);

  const handleIconClick = () => {
    const htmlElement = document.documentElement;
    const current = htmlElement.getAttribute("data-menu-size");

    if (current === "sm-hover") {
      htmlElement.setAttribute("data-menu-size", "sm-hover-active");
    } else if (current === "sm-hover-active") {
      htmlElement.setAttribute("data-menu-size", "sm-hover");
    }
  };


  const menuConfig = {
    Admin: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/admin-dashboard",
      },
      ...(email === "edprowise@gmail.com"
        ? [
          {
            id: "admin",
            label: "Admins",
            icon: "solar:users-group-rounded-bold-duotone",
            link: "/admin-dashboard/admins",
          },
        ]
        : []),
      {
        id: "school",
        label: "Schools",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/admin-dashboard/schools",
      },
      {
        id: "seller",
        label: "Sellers",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/admin-dashboard/sellers",
      },
      {
        id: "subscriptions",
        label: "Subscriptions",
        icon: "solar:wallet-money-bold",
        link: "/admin-dashboard/subscriptions",
      },
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/admin-dashboard/procurement-services/dashboard",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Quotes",
            link: "/admin-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Track Order & Order History",
            link: "/admin-dashboard/procurement-services/track-order-history",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Define Goods & Services",
            link: "/admin-dashboard/procurement-services/good-services",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Bank Details",
            link: "/admin-dashboard/procurement-services/bank-details",
            icon: "solar:users-group-rounded-bold-duotone",
          },
        ],
      },
      {
        id: "requestDemo",
        label: "Request For Demo",
        icon: "solar:wallet-money-bold",
        link: "/admin-dashboard/request-for-demo",
      },
      {
        id: "contact",
        label: "Enquiry",
        icon: "solar:wallet-money-bold",
        link: "/admin-dashboard/enquiry",
      },
      {
        id: "emailSettings",
        label: "Email Settings",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "SMTP Settings",
            link: "/admin-dashboard/email/smtp-setting",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Email Templates",
            link: "/admin-dashboard/email/templates",
            icon: "solar:book-bookmark-bold-duotone",
          },
        ],
      },
    ],

    School: [
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/school-dashboard/procurement-services/dashboard",
            icon: "solar:widget-3-bold-duotone"
          },
          {
            label: "Quotes",
            link: "/school-dashboard/procurement-services/track-quote",
            icon: "solar:file-text-bold-duotone"
          },
          {
            label: "Track Order & Order History",
            link: "/school-dashboard/procurement-services/track-order-history",
            icon: "solar:delivery-bold-duotone",
          },
          {
            label: "Pay To EdProwise",
            link: "/school-dashboard/procurement-services/pay-to-edprowise",
            icon: "solar:card-bold-duotone",
          },
        ],
      },
      {
        id: "feesmodule",
        label: "Fees module",
        icon: "solar:wallet-money-bold",
        children: [
          {
            id: "form",
            label: "Form",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Registration Form",
                link: "/school-dashboard/fees-module/form/registration",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Admission Form",
                link: "/school-dashboard/fees-module/form/admission-list",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "TC Form",
                link: "/school-dashboard/fees-module/form/trasfer-certificate-list",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Concession Form",
                link: "/school-dashboard/fees-module/form/concession-table",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
          {
            id: "feesReceipts",
            label: "Fees Receipts",
            icon: "solar:bill-list-bold-duotone",
            children: [
              {
                label: "School Fees",
                link: "/school-dashboard/fees-module/fees-receipts/school-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Board Registration Fees",
                link: "/school-dashboard/fees-module/fees-receipts/board-registration-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Board Exam fees",
                link: "/school-dashboard/fees-module/fees-receipts/board-exam-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
          {
            id: "adminSetting",
            label: "Admin Setting",
            icon: "solar:users-group-rounded-bold-duotone",
            children: [
              {
                label: "Registartion Prefix",
                link: "/school-dashboard/fees-module/admin-setting/prefix-setting/registartion-prefix",
                icon: "solar:settings-bold-duotone"
              },
              {
                label: "Admission Prefix",
                link: "/school-dashboard/fees-module/admin-setting/prefix-setting/admission-prefix",
                icon: "solar:settings-bold-duotone"
              },
              {
                label: "Fine",
                link: "/school-dashboard/fees-module/admin-setting/fine",
                icon: "solar:document-bold-duotone"
              },
              {
                label: "Shift",
                link: "/school-dashboard/fees-module/admin-setting/shifts",
                icon: "solar:alarm-bold-duotone",
              },
              {
                label: "Class & Section",
                link: "/school-dashboard/fees-module/admin-setting/class-section",
                icon: "solar:teacher-bold-duotone",
              },
              {
                label: "Fees Types",
                link: "/school-dashboard/fees-module/admin-setting/fees-type-list",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Fees Structure",
                link: "/school-dashboard/fees-module/admin-setting/fees-structure",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "One Time Fees",
                link: "/school-dashboard/fees-module/admin-setting/one-time-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
        ],
      },
    ],
    Seller: [
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/seller-dashboard/procurement-services/dashboard",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Quote Enquiry",
            link: "/seller-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Track Order & Order History",
            link: "/seller-dashboard/procurement-services/track-order-history",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Pay To EdProwise",
            link: "/seller-dashboard/procurement-services/pay-to-edprowise",
            icon: "solar:users-group-rounded-bold-duotone",
          },
        ],
      },
    ],
    Guest: [
      { id: "login", label: "Login", icon: "solar:login-bold", link: "/login" },
    ],
  };


  const currentMenu = menuConfig[userRole] || menuConfig.Guest;

  const isPathActive = (link) => currentPath === link;
  const isPathInSubtree = (item) => {
    if (item.link && currentPath.startsWith(item.link)) return true;
    if (item.children) return item.children.some(isPathInSubtree);
    return false;
  };

  const renderMenuItems = (items) =>
    items.map((item) => {
      const isActive = isPathActive(item.link);
      const isExpanded = isPathInSubtree(item);

      if (item.children) {
        const collapseId = `sidebar-${item.id || item.label.replace(/\s+/g, "")}-${Math.random().toString(36).substr(2, 5)}`;
        return (
          <li className="nav-item" key={item.id || item.label}>
            <a
              className={`nav-link menu-arrow ${isExpanded ? "active" : ""}`}
              href={`#${collapseId}`}
              data-bs-toggle="collapse"
              role="button"
              aria-expanded={isExpanded}
              aria-controls={collapseId}
            >
              <span className="nav-icon">
                <Icon icon={item.icon} />
              </span>
              <span className="nav-text">{item.label}</span>
            </a>
            <div className={`collapse ${isExpanded ? "show" : ""}`} id={collapseId}>
              <ul className="nav sub-navbar-nav">{renderMenuItems(item.children)}</ul>
            </div>
          </li>
        );
      } else {
        return (
          <li className="nav-item" key={item.id || item.label}>
            <Link className={`nav-link ${isActive ? "active" : ""}`} to={item.link}>
              <span className="nav-icon">
                <Icon icon={item.icon} />
              </span>
              <span className="nav-text">{item.label}</span>
            </Link>
          </li>
        );
      }
    });

  return (
    <div className="main-nav">
      <div className="logo-box">
        <Link to="/" className="logo-dark">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseFavicon.png`}
            className="logo-sm"

          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
            className="logo-lg"
            style={{ width: '80%' }}
          />
        </Link>
        <Link to="/" className="logo-light">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseFavicon.png`}
            className="logo-sm"
          />
          <span>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
              className="logo-lg"
            />
          </span>
        </Link>
      </div>

      <button type="button" className="button-sm-hover" aria-label="Show Full Sidebar"
        onClick={handleIconClick}
      >
        <Icon
          icon="solar:double-alt-arrow-right-bold-duotone"
          className="button-sm-hover-icon"
        />
      </button>

      <div className="scrollbar" data-simplebar>
        <ul className="navbar-nav" id="navbar-nav">
          {renderMenuItems(currentMenu)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;