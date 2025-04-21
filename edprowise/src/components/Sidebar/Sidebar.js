import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { IoIosArrowForward } from "react-icons/io";
import getAPI from "../../api/getAPI";

const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();

  const toggleMenu = (menuId, parentId = null) => {
    setOpenMenus((prev) => {
      const newOpenMenus = { ...prev };

      if (parentId) {
        Object.keys(newOpenMenus).forEach((key) => {
          if (key !== parentId) {
            delete newOpenMenus[key];
          }
        });
      } else {
        Object.keys(newOpenMenus).forEach((key) => {
          delete newOpenMenus[key];
        });
      }

      if (newOpenMenus[menuId]) {
        delete newOpenMenus[menuId];
      } else {
        newOpenMenus[menuId] = true;
      }

      return newOpenMenus;
    });
  };
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarVisible
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarVisible, toggleSidebar]);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userRole = userDetails?.role || "Guest";
  const email = userDetails.email;

  const currentRoute = location.pathname;

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
            label: "Marketing",
            link:"/admin-dashboard/email/marketing",
            icon: "solar:book-bookmark-bold-duotone",
          },
        ],
      },
    ],

    School: [
      // {
      //   id: "dashboard",
      //   label: "Dashboard",
      //   icon: "solar:widget-5-bold-duotone",
      //   link: "/school-dashboard",
      // },
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/school-dashboard/procurement-services/dashboard",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Quotes",
            link: "/school-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Track Order & Order History",
            link: "/school-dashboard/procurement-services/track-order-history",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Pay To EdProwise",
            link: "/school-dashboard/procurement-services/pay-to-edprowise",
            icon: "solar:users-group-rounded-bold-duotone",
          },
        ],
      },

      // When i click on Fees Module it opens
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
                label: "Shift",
                link: "/school-dashboard/fees-module/admin-setting/shifts",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Class & Section",
                link: "/school-dashboard/fees-module/admin-setting/class-section",
                icon: "solar:users-group-rounded-bold-duotone",
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
            ],
          },
        ],
      },

      {
        id: "payrollModule",
        label: "Payroll Module",
        icon: "solar:wallet-money-bold",
        children: [
          {
            id: "adminSetting",
            label: "Admin Setting",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Employee Registration",
                link: "/school-dashboard/payroll-module/admin-setting/register-employee-list",
                // icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "LWD Details",
                link: "/school-dashboard/payroll-module/admin-setting/lwd-details",
                // icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Define CTC Components",
                link: "/school-dashboard/payroll-module/admin-setting/define-ctc-components-list",
                // icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "CTC Update",
                link: "/school-dashboard/payroll-module/admin-setting/CTC-update",
                // icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Payroll Process",
                link: "/school-dashboard/payroll-module/admin-setting/payroll-process",
                // icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Salary Increment",
                link: "/school-dashboard/payroll-module/admin-setting/salary-increment",
                // icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Form 16",
                link: "/school-dashboard/payroll-module/admin-setting/form-16-list",
                // icon: "solar:users-group-rounded-bold-duotone",
              },              
            ],
          },
          {
            id: "employeeSelfService",
            label: "Employee Self Service",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Update Details",
                link: "/school-dashboard/payroll-module/employee-services/update-details",
              },     
            ],
          },
          
        ],
      },
    ],
    Seller: [
      // {
      //   id: "dashboard",
      //   label: "Dashboard",
      //   icon: "solar:widget-5-bold-duotone",
      //   link: "/seller-dashboard",
      // },
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

  const menuItems = menuConfig[userRole] || menuConfig["Guest"];

  // if (!Object.keys(openMenus).length) {
  //   if (currentRoute.indexOf("procurement-services"))
  //     toggleMenu("procurementServices");
  //   if (currentRoute.indexOf("fees-module")) {
  //     if (currentRoute.indexOf("form")) toggleMenu("form", "feesmodule");
  //     else toggleMenu("feesmodule");
  //   }
  // }

  const renderMenuItem = (item, parentId = null) => {
    // const isActive = item.children
    //   ? item.children.some((child) => currentRoute === child.link)
    //   : currentRoute === item.link;

    let findChilderRoute = null;
    item?.children?.forEach((child) => {
      if (currentRoute === child.link) findChilderRoute = child;
      if (!findChilderRoute) {
        item?.children?.forEach((subChild) => {
          subChild.children?.forEach((childOfChild) => {
            if (currentRoute === childOfChild.link) {
              findChilderRoute = childOfChild;
              if (!findChilderRoute.id) findChilderRoute.id = subChild.id;
              if (!findChilderRoute.parentId)
                findChilderRoute.parentId = item.id;
            }
          });
        });
      }
    });
    const checkItemIsCurrentRoute = currentRoute === item.link;
    const isActive = findChilderRoute || checkItemIsCurrentRoute;
    if (!Object.keys(openMenus).length && isActive) {
      toggleMenu(
        findChilderRoute?.id || item?.id,
        findChilderRoute?.parentId || parentId
      );
    }

    return (
      <li className={`nav-item ${isActive ? "active" : ""}`} key={item.id}>
        {item.children ? (
          <>
            <div
              className={`nav-link collapsed ${isActive ? "active" : ""}`}
              onClick={() => toggleMenu(item.id, parentId)}
            >
              <span className="nav-icon">
                <Icon icon={item.icon} />
              </span>
              <span className="nav-text"> {item.label} </span>
              <IoIosArrowForward
                style={{
                  transition: "transform 0.3s ease",
                  transform: openMenus[item.id]
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              />
            </div>
            {openMenus[item.id] && (
              <div className="collapse show">
                <ul className="nav sub-navbar-nav">
                  {item.children.map((subItem) =>
                    renderMenuItem(subItem, item.id)
                  )}
                </ul>
              </div>
            )}
          </>
        ) : (
          <Link
            className={`nav-link ${isActive ? "active" : ""}`}
            to={item.link}
          >
            <span className="nav-icon">
              <Icon icon={item.icon} />
            </span>
            <span className="nav-text"> {item.label} </span>
          </Link>
        )}
      </li>
    );
  };

  return (
    <div
      ref={sidebarRef}
      className={`main-nav ${sidebarVisible ? "sidebar-enable" : ""}`}
    >
      {/* Sidebar Logo */}
      <div className="logo-box">
        <Link to="/" className="logo-dark">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
            className="logo-sm"
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
            className="logo-lg"
          />
        </Link>
        <Link to="/" className="logo-light">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
            className="logo-sm"
          />
          <span>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
              className="logo-lg"
              style={{ height: "80px !important", width: "160px !important" }}
            />
          </span>
        </Link>
      </div>

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
          {menuItems.map((item) => renderMenuItem(item))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
