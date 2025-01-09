import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [rotatedMenu, setRotatedMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (menuId) => {
    setOpenMenu((prev) => (prev === menuId ? null : menuId));
    setRotatedMenu((prev) => (prev === menuId ? null : menuId));
  };

  const sidebarRef = useRef(null);

  // Handle clicks outside of the sidebar
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

  const currentRoute = location.pathname;
  console.log(currentRoute);

  const menuConfig = {
    Admin: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/admin-dashboard",
        // className: currentRoute === "/admin-dashboard" ? "active" : "",
      },
      {
        id: "school",
        label: "Schools",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/admin-dashboard/schools",
        // className: currentRoute === "/admin-dashboard/schools" ? "active" : "",
      },
      {
        id: "subscriptions",
        label: "Subscriptions",
        icon: "solar:wallet-money-bold",
        link: "/admin-dashboard/subscriptions",
        // className:
        // currentRoute === "/admin-dashboard/subscriptions" ? "active" : "",
      },
      // {
      //   id: "feesManagement",
      //   label: "Fees Management",
      //   icon: "game-icons:money-stack",
      //   link: "/admin-dashboard/feesManagement",
      //   // className:
      //   // currentRoute === "/admin-dashboard/feesManagement" ? "active" : "",
      // },
      // {
      //   id: "payrollManagement",
      //   label: "Payroll Management",
      //   icon: "solar:hand-money-bold",
      //   link: "/admin-dashboard/payrollManagement",
      //   // className:
      //   // currentRoute === "/admin-dashboard/payrollManagement" ? "active" : "",
      // },
      // {
      //   id: "finance",
      //   label: "Finance Management",
      //   icon: "solar:graph-up-bold",
      //   // link: "/admin-dashboard/finance",
      //   // className: currentRoute === "/admin-dashboard/finance" ? "active" : "",
      // },
      // {
      //   id: "schoolManagement",
      //   label: "School Management",
      //   icon: "solar:buildings-2-bold-duotone",
      //   link: "/admin-dashboard/schoolManagement",
      //   // className:
      //   // currentRoute === "/admin-dashboard/schoolManagement" ? "active" : "",
      // },
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        // className:
        //   currentRoute === "/school-dashboard/procurement-services/track-quote"
        //     ? "active"
        //     : "",

        children: [
          {
            label: "Quotes",
            link: "/admin-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          // {
          //   label: "View Quotes",
          //   link: "/admin-dashboard/procurement-services/view-all-quote",
          //   icon: "solar:users-group-rounded-bold-duotone",
          // },
          {
            label: "Track Order & Order History",
            link: "/admin-dashboard/procurement-services/track-order-history",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Define Goods & Services",
            link: "/admin-dashboard/procurement-services/define-goods-services",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Bank Details",
            link: "/admin-dashboard/procurement-services/bank-details",
            icon: "solar:users-group-rounded-bold-duotone",
          },
        ],
      },
    ],
    School: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/school-dashboard",
        // className: currentRoute === "/school-dashboard" ? "active" : "",
      },
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        // className:
        //   currentRoute === "/school-dashboard/procurement-services/track-quote"
        //     ? "active"
        //     : "",

        children: [
          {
            label: "Quotes",
            link: "/school-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          // {
          //   label: "View Quotes",
          //   link: "/school-dashboard/procurement-services/view-all-quote",
          //   icon: "solar:users-group-rounded-bold-duotone",
          // },
          {
            label: "Track Order & Order History",
            link: "/school-dashboard/procurement-services/track-order-history",
            icon: "solar:users-group-rounded-bold-duotone",
          },
        ],
      },
    ],
    Seller: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/seller-dashboard",
        // className: currentRoute === "/school-dashboard" ? "active" : "",
      },
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        // className:
        //   currentRoute === "/school-dashboard/procurement-services/track-quote"
        //     ? "active"
        //     : "",

        children: [
          {
            label: "Quote Enquiry ",
            link: "/seller-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Submitted Quote ",
            link: "/seller-dashboard/procurement-services/submitted-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "View Prepared Quote",
            link: "/seller-dashboard/procurement-services/prepared-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Track Order & Order History",
            link: "/seller-dashboard/procurement-services/track-order-history",
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

  return (
    <>
      {" "}
      <div
        ref={sidebarRef}
        className={`main-nav ${sidebarVisible ? "sidebar-enable" : ""}`}
      >
        {/* Sidebar Logo */}
        <div className="logo-box">
          <Link to="" className="logo-dark">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              className="logo-sm"
              alt="logo sm"
            />
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              className="logo-lg"
              alt="logo dark"
            />
          </Link>
          <Link to="" className="logo-light">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              className="logo-sm"
              alt="logo sm"
            />
            <span>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
                className="logo-lg"
                alt="logo light"
                style={{ height: "40px", marginRight: "20px" }}
              />
              <span className="logo-font">EdProwise</span>
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
            {menuItems.map((item) => {
              const isActive = item.children
                ? item.children.some((child) => currentRoute === child.link)
                : currentRoute === item.link;

              return (
                <li
                  className={`nav-item ${isActive ? "active" : ""}`}
                  key={item.id}
                >
                  {item.children ? (
                    <>
                      <div
                        className={`nav-link collapsed ${
                          isActive ? "active" : ""
                        }`}
                        onClick={() => toggleMenu(item.id)}
                      >
                        <span className="nav-icon">
                          <Icon icon={item.icon} />
                        </span>
                        <span className="nav-text"> {item.label} </span>

                        <IoIosArrowForward
                          style={{
                            transition: "transform 0.3s ease",
                            transform:
                              openMenu === item.id
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
                          }}
                        />
                        {/* i want to rotate this icon 90 degree to show that this parent link is open */}
                      </div>
                      {openMenu === item.id && (
                        <div className="collapse show">
                          <ul className="nav sub-navbar-nav">
                            {item.children.map((subItem, subIndex) => (
                              <li className="sub-nav-item" key={subIndex}>
                                <Link
                                  className={`sub-nav-link ${
                                    currentRoute === subItem.link
                                      ? "active"
                                      : ""
                                  }`}
                                  to={subItem.link}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
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
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
