import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Topbar from "./Topbar";

import { RiCloseLargeFill } from "react-icons/ri";
const menuData = [
  { name: "HOME", link: "/", subMenu: [] },
  {
    name: "ABOUT US",
    link: "/about-us",
    subMenu: [],
  },
  {
    name: "SERVICES",
    subMenu: [
      {
        name: "DIGITAL SERVICES",
        link: "/services/digital-services",
      },
      { name: "BUSINESS SERVICES", link: "/services/business-services" },
      { name: "RECRUITMENT SERVICES", link: "/services/recruitment-services" },
      { name: "PROCUREMENT SERVICES", link: "/services/procurement-services" },
    ],
  },
  { name: "ORDERS", link: "#", subMenu: [] },
  {
    name: "COMMUNITY CONNECT",
    subMenu: [
      { name: "GALLERY", link: "/community-connect/gallery" },
      { name: "EDPROWISE TALKS", link: "/community-connect/edprowise-talks" },
      { name: "STUDENT ZONE", link: "/community-connect/student-zone" },
      { name: "EDUCATOR ZONE", link: "/community-connect/educator-zone" },
    ],
  },
  { name: "CONTACT US", link: "/contact-us", subMenu: [] },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
    console.log("Mobile menu toggled:", !isMobileMenuOpen);
  };

  const [openSubMenu, setOpenSubMenu] = useState(null);
  const location = useLocation();

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const handleMenuClick = (menu, index, e) => {
    if (menu.subMenu.length === 0) {
      toggleMobileMenu();
    } else {
      e.preventDefault();
      toggleSubMenu(index);
    }
  };

  const handleSubMenuClick = (subItem, e) => {
    toggleMobileMenu();
  };

  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    navigate(`/login`);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate(`/signup`);
  };

  return (
    <header id="header">
      {location.pathname === "/" && <Topbar />}
      <div className="wpo-site-header wpo-header-style-2">
        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-3 d-lg-none dl-block">
                <div className="mobail-menu">
                  {isMobileMenuOpen ? (
                    <>
                      <button
                        type="button"
                        className="menu-close"
                        onClick={toggleMobileMenu}
                      >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar first-angle"></span>
                        <span className="icon-bar middle-angle"></span>
                        <span className="icon-bar last-angle"></span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="navbar-toggler open-btn"
                      onClick={toggleMobileMenu}
                    >
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar first-angle"></span>
                      <span className="icon-bar middle-angle"></span>
                      <span className="icon-bar last-angle"></span>
                    </button>
                  )}
                </div>
              </div>
              <div className="col-lg-2 col-9">
                <div className="navbar-header">
                  <a className="navbar-brand fw-bold logo">
                    <img src="/assets/images/EdProwiseLogo.png" alt="logo" />
                  </a>
                </div>
              </div>
              <div className="col-lg-8 col-md-1 col-0">
                <div
                  id="navbar"
                  className={`collapse navbar-collapse navigation-holder ${
                    isMobileMenuOpen ? "show" : ""
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="sidebar-logo">
                      <div className="navbar-header">
                        <a className="navbar-brand fw-bold logo">
                          <img
                            src="/assets/website-images/EdProwise Logo.png"
                            alt="logo"
                          />
                        </a>
                      </div>
                    </div>
                    <button className="menu-close" onClick={toggleMobileMenu}>
                      <RiCloseLargeFill className="close-icon" />
                    </button>
                  </div>
                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    {menuData.map((menu, index) => (
                      <li
                        key={index}
                        className={`menu-item-has-children ${
                          menu.subMenu.length > 0
                            ? "menu-item-has-children"
                            : ""
                        }`}
                      >
                        <Link
                          to={menu.link}
                          className="nav-link"
                          onMouseEnter={(e) => handleMenuClick(menu, index, e)}
                        >
                          {menu.name}
                        </Link>
                        {menu.subMenu.length > 0 && openSubMenu === index && (
                          <ul className="sub-menu">
                            {menu.subMenu.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subItem.link}
                                  onClick={(e) =>
                                    handleSubMenuClick(subItem, e)
                                  }
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-md-3 col-0">
                <div className="header-right">
                  <div className="close-form">
                    <Link
                      className="login"
                      onClick={(event) => handleSignUp(event)}
                    >
                      <span className="text font-family-web login-weight">
                        Sign Up
                      </span>
                      <span className="mobile">
                        <i className="fi flaticon-charity"></i>
                      </span>
                    </Link>

                    <Link
                      className="theme-btn"
                      onClick={(event) => handleSignIn(event)}
                    >
                      <span className="text font-family-web login-weight">
                        Sign In
                      </span>
                      <span className="mobile">
                        <i className="fi flaticon-charity"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
