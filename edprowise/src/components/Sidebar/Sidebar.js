import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import brandLogo from "./logo.png";
const Sidebar = () => {
  // State to track the expanded/collapsed status of each menu
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // Function to toggle the state of a parent menu
  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId], // Toggle the state of the clicked menu
    }));
  };

  // on page load the dashboard will be shown
  const menuData = [
    {
      id: "dashboard",
      title: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "/dashboard",
    },
    {
      id: "formMenu",
      title: "Form",
      icon: "mdi mdi-compare-vertical",
      subMenus: [
        {
          // why i am not able to navigate to registration form page
          title: "Registration Form",
          link: "/dashboard/formMenu/registrationForm",
        },
        { title: "Admission Form", link: "/admissionForm" },
        { title: "TC Form", link: "/tcForm" },
        { title: "Concession Form", link: "/concessionForm" },
      ],
    },
    {
      id: "feesMenu",
      title: "Fees Receipts",
      icon: "mdi mdi-compare-vertical",
      subMenus: [
        { title: "School Fees", link: "/schoolFees" },
        { title: "Board Registration Fees", link: "boardRegistrationFees" },
        { title: "Board Exam Fees", link: "boardExamFees" },
      ],
    },

    {
      id: "reportMenus",
      title: "Reports",
      icon: "mdi mdi-compare-vertical",
      subMenus: [
        { title: "Daily Collection", link: "/dailyCollection" },
        { title: "Defaulter Fees", link: "/defaulterFees" },
        {
          title: "Loss of fees due to left Students",
          link: "/lossOfFeesDueToLeftStudents",
        },
        {
          title: "Loss of fees due to Late Admission",
          link: "/lossOfFeesDueToLateAdmission",
        },
        {
          title: "Arrear Fees Received Report",
          link: "/arrearFeesReceivedReport",
        },
        { title: "Advance Fees Report", link: "/advanceFeesReport" },
        { title: "Fees Concession Report", link: "/feesConcessionReport" },
        { title: "Registration Fee Report", link: "/registrationFeeReport" },
        { title: "Admission Fee Report", link: "/admissionFeeReport" },
        {
          title: "Board Registration Fees Report",
          link: "/boardRegistrationFeesReport",
        },
        { title: "Board Exam Fees Report", link: "/boardExamFeesReport" },
        { title: "Fees Structure", link: "/feesStructure" },
        { title: " Student Master", link: "/studentMaster" },
      ],
    },

    {
      id: "auditDocumentation",
      title: "Audit Documentation",
      icon: "mdi mdi-compare-vertical",
      subMenus: [
        {
          title: "Fees Reconciliation (Headcount)",
          link: "/feesReconciliationHeadcount",
        },
        {
          title: " Fees Reconciliation (Fees wise)",
          link: "/feesReconciliationFeesWise",
        },
        {
          title: "Fees Reconciliation (Fees Module vs Finance Module)",
          link: "/feeReconciliationFeesModuleFinanceModule",
        },
      ],
    },

    {
      id: "adminSetting",
      title: "Admin Setting",
      icon: "mdi mdi-compare-vertical",
      subMenus: [
        { title: "Fees Structure", link: "/feesStructure" },
        { title: "Class", link: "/class" },
        {
          title: " Shift",
          link: "/shift",
        },
        {
          title: "Section",
          link: "/section",
        },
      ],
    },

    {
      id: "support",
      title: "Support",
      icon: "mdi mdi-compare-vertical",
      subMenus: [
        { title: "Profile", link: "/profile" },
        { title: "User Manual", link: "/userManual" },
        {
          title: "Raise Ticket",
          link: "/raiseTicket",
        },
        {
          title: "FAQ",
          link: "/faq",
        },
      ],
    },
    {
      id: "logOut",
      title: "Logout",
      icon: "mdi mdi-logout",
      link: "/logout",
    },
  ];

  return (
    <div
      className="app-menu navbar-menu"
      style={{
        backgroundColor: " #7c50f5",
        borderRadius: 25,
        marginLeft: 10,
      }}
    >
      <div className="navbar-brand-box">
        {/* Dark Logo*/}
        <a href="index.php" className="logo logo-dark">
          <span className="logo-sm">
            <img src={brandLogo} style={{ height: 22 }} alt="" />
          </span>
          <span className="logo-lg">
            <img src={brandLogo} style={{ height: 17 }} alt="" />
          </span>
        </a>
        {/* Light Logo*/}
        <a href="index.php" className="logo logo-light">
          <span className="logo-sm">
            <img src={brandLogo} style={{ height: 22 }} alt="" />
          </span>
          <span className="logo-lg">
            <img src={brandLogo} style={{ height: 17 }} alt="" />
          </span>
        </a>
        <button
          type="button"
          className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
        >
          <i className="ri-record-circle-line" />
        </button>
      </div>

      <div
        id="scrollbar"
        data-simplebar="init"
        className="h-100 simplebar-scrollable-y"
      >
        <div className="simplebar-wrapper" style={{ margin: 0 }}>
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer" />
          </div>
          <div className="simplebar-mask">
            <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
              <div
                className="simplebar-content-wrapper"
                tabIndex={0}
                role="region"
                aria-label="scrollable content"
                style={{ height: "100%", overflow: "hidden scroll" }}
              >
                <div className="simplebar-content" style={{ padding: 0 }}>
                  <div className="container-fluid">
                    <ul className="navbar-nav" id="navbar-nav">
                      <li className="menu-title">
                        <span data-key="t-menu" style={{ color: "white" }}>
                          Menu
                        </span>
                      </li>

                      {menuData.map((menu) => (
                        <li key={menu.id} className="nav-item">
                          {menu.subMenus ? (
                            <>
                              {/* Parent Menu */}
                              <div
                                className="nav-link menu-link"
                                onClick={() => toggleMenu(menu.id)}
                                style={{
                                  cursor: "pointer",
                                  background: "none",
                                }}
                                aria-expanded={expandedMenus[menu.id] || false}
                              >
                                <i
                                  className={menu.icon}
                                  style={{ color: "white" }}
                                />{" "}
                                <span
                                  data-key="t-authentication"
                                  style={{
                                    fontFamily:
                                      "var(--vz-headings-font-family)",
                                    color: "white",
                                    alignItems: "center",
                                  }}
                                >
                                  <b>{menu.title}</b>
                                  <span
                                    className={`dash-arrow ${
                                      activeSubMenu === menu.id ? "active" : ""
                                    }`}
                                    style={{
                                      transform: expandedMenus[menu.id]
                                        ? "rotate(90deg)"
                                        : "rotate(0deg)",
                                      transition: "transform 0.3s ease",
                                    }}
                                  >
                                    <IoIosArrowForward />
                                  </span>
                                </span>
                              </div>
                              {/* Submenu */}
                              <div
                                className={`collapse menu-dropdown ${
                                  expandedMenus[menu.id] ? "show" : ""
                                }`}
                              >
                                <ul className="nav nav-sm flex-column">
                                  {menu.subMenus.map((subMenu, index) => (
                                    <li key={index} className="nav-item">
                                      <Link
                                        to={subMenu.link}
                                        className="nav-link"
                                        style={{
                                          fontFamily:
                                            "var(--vz-headings-font-family)",
                                          color: "white",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        {subMenu.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          ) : (
                            // Single Link Menu
                            <Link className="nav-link menu-link" to={menu.link}>
                              <i
                                className={menu.icon}
                                style={{ color: "white" }}
                              />{" "}
                              <span
                                data-key="t-dashboards"
                                style={{
                                  fontFamily: "var(--vz-headings-font-family)",
                                  color: "white",
                                }}
                              >
                                <b>{menu.title}</b>
                              </span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Sidebar */}
                </div>
              </div>
            </div>
          </div>
          <div
            className="simplebar-placeholder"
            style={{ width: 249, height: 422 }}
          />
        </div>
        <div
          className="simplebar-track simplebar-horizontal"
          style={{ visibility: "hidden" }}
        >
          <div
            className="simplebar-scrollbar"
            style={{ width: 0, display: "none" }}
          />
        </div>
        <div
          className="simplebar-track simplebar-vertical"
          style={{ visibility: "visible" }}
        >
          <div
            className="simplebar-scrollbar"
            style={{
              height: 351,
              display: "block",
              transform: "translate3d(0px, 33px, 0px)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
