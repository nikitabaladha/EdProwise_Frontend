import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Icon } from "@iconify/react";
import { GiMoneyStack } from "react-icons/gi";
import "./Sidebar.css";

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

  const currentRoute = location.pathname;
  console.log(currentRoute);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "solar:widget-5-bold-duotone",
      link: "/dashboard",
      className: currentRoute === "/dashboard" ? "active" : "",
    },
    {
      id: "school",
      label: "Schools",
      icon: "solar:users-group-rounded-bold-duotone",
      link: "/dashboard/schools",
      className: currentRoute === "/dashboard/schools" ? "active" : "",
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      icon: "solar:wallet-money-bold",
      link: "/dashboard/subscriptions",
      className: currentRoute === "/dashboard/subscriptions" ? "active" : "",
    },

    {
      id: "feesManagement",
      label: "Fees Management",
      icon: "game-icons:money-stack",
      link: "/dashboard/feesManagement",
      className: currentRoute === "/dashboard/feesManagement" ? "active" : "",
    },
    {
      id: "payrollManagement",
      label: "Payroll Management",
      icon: "solar:hand-money-bold",
      link: "/dashboard/payrollManagement",
      className:
        currentRoute === "/dashboard/payrollManagement" ? "active" : "",
    },
    {
      id: "finance",
      label: "Finance Management",
      icon: "solar:graph-up-bold",
      link: "/dashboard/finance",
      className: currentRoute === "/dashboard/finance" ? "active" : "",
    },
    {
      id: "schoolManagement",
      label: "School Management",
      icon: "solar:buildings-2-bold-duotone",
      link: "/dashboard/schoolManagement",
      className: currentRoute === "/dashboard/schoolManagement" ? "active" : "",
    },
  ];

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
            {menuItems.map((item) => (
              <li className={`nav-item ${item.className}`} key={item.id}>
                {item.children ? (
                  <>
                    <div
                      className={`nav-link menu-arrow collapsed ${item.className}`}
                      onClick={() => toggleMenu(item.id)}
                    >
                      <span className="nav-icon">
                        <Icon icon={item.icon} />
                      </span>
                      <span className="nav-text"> {item.label} </span>
                    </div>
                    {openMenu === item.id && (
                      <div className="collapse show">
                        <ul className="nav sub-navbar-nav">
                          {item.children.map((subItem, subIndex) => (
                            <li className="sub-nav-item" key={subIndex}>
                              <Link className="sub-nav-link" to={subItem.link}>
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link className={`nav-link ${item.className}`} to={item.link}>
                    <span className="nav-icon">
                      <Icon icon={item.icon} />
                    </span>
                    <span className="nav-text"> {item.label} </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
