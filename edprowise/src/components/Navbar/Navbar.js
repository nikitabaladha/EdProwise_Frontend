import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const menuData = [
  { name: "Home", link: "/", subMenu: [] },
  {
    name: "About Us",
    link: "/about-us",
    subMenu: [],
  },
  {
    name: "Services",
    link: "/services",
    subMenu: [
      {
        name: "Digital Services",
        link: "/services/digital-services",
      },
      { name: "Business Services", link: "/services/business-services" },
      { name: "Recruitment Services", link: "/services/recruitment-services" },
      { name: "Procurement Services", link: "/services/procurement-services" },
    ],
  },
  { name: "Orders", link: "#", subMenu: [] },
  {
    name: "Community Connect",
    link: "/community-connect",
    subMenu: [
      { name: "Gallery", link: "/community-connect/gallery" },
      { name: "EdProwise Talks", link: "/community-connect/edprowise-talks" },
      { name: "Student Zone", link: "/community-connect/student-zone" },
      { name: "Educator Zone", link: "/community-connect/educator-zone" },
    ],
  },
  { name: "Contact Us", link: "/contact-us", subMenu: [] },
];

const Header = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
      <div className="wpo-site-header wpo-header-style-2">
        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-3 d-lg-none dl-block">
                <div className="mobail-menu">
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
                </div>
              </div>
              <div className="col-lg-2 col-9">
                <div className="navbar-header">
                  <a className="navbar-brand fw-bold logo">
                    <img
                      src="/assets/website-images/EdProwise Logo.png"
                      alt="logo"
                    />
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
                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    {menuData.map((menu, index) => (
                      <li
                        key={index}
                        className={`nav-item ${
                          menu.subMenu.length > 0
                            ? "menu-item-has-children"
                            : ""
                        }`}
                      >
                        <Link
                          to={menu.link}
                          className="nav-link"
                          onClick={(e) => handleMenuClick(menu, index, e)}
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
                    {/* <a className="login">
                      <span className="text">Sign Up</span>
                      <span className="mobile">
                        <i className="fi flaticon-charity"></i>
                      </span>
                    </a> */}

                    <Link
                      className="login"
                      onClick={(event) => handleSignUp(event)}
                    >
                      <span className="text">Sign Up</span>
                      <span className="mobile">
                        <i className="fi flaticon-charity"></i>
                      </span>
                    </Link>

                    {/* <a className="theme-btn">
                      <span className="text">Sign In</span>
                      <span className="mobile">
                        <i className="fi flaticon-charity"></i>
                      </span>
                    </a> */}

                    <Link
                      className="theme-btn"
                      onClick={(event) => handleSignIn(event)}
                    >
                      <span className="text">Sign In</span>
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
