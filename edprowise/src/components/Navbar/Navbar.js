import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { RiCloseLargeFill } from "react-icons/ri";
import Topbar from "./Topbar";

const menuData = [
  { name: "Home", link: "/", subMenu: [] },
  {
    name: "About Us",
    link: "/about-us",
    subMenu: [],
  },
  {
    name: "Services",
    subMenu: [
      {
        name: "Digital Services",
        link: "/services/digital-services",
      },
      { name: "Business Services", link: "/services/business-services" },
      { name: "Recruitment Services", link: "/services/recruitment-services" },
      { name: "Procurment Services", link: "/services/procurement-services" },
    ],
  },
  { name: "Orders", link: "#", subMenu: [] },
  {
    name: "Community Connect",
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
  const location = useLocation();

  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
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

  const isActive = (path, hasSubMenu) => {
    if (hasSubMenu) {
      return (
        location.pathname === path || location.pathname.startsWith(path + "/")
      );
    }

    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !isSticky) {
        setIsSticky(true);
      } else if (window.scrollY <= 100 && isSticky) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent event bubbling
    console.log("Sign In Clicked");
    navigate(`/login`);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent event bubbling
    console.log("Sign Up Clicked");
    navigate(`/signup`);
  };

  return (
    <header id="header">
      {location.pathname === "/" && <Topbar />}
      <div className="wpo-site-header wpo-header-style-2">
        <nav
          className={`navigation navbar navbar-expand-lg navbar-light ${
            isSticky ? "sticky-header sticky-on" : ""
          }`}
        >
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
                    <img
                      src="/assets/website-images/EdProwiseLogo.webp"
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
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="sidebar-logo">
                      <div className="navbar-header">
                        <a className="navbar-brand fw-bold logo">
                          <img
                            src="/assets/website-images/EdProwiseLogoWhite.webp"
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
                        className={`menu-item ${
                          menu.subMenu.length > 0
                            ? "menu-item-has-children"
                            : ""
                        }`}
                      >
                        <Link
                          to={menu.link}
                          onMouseEnter={(e) => handleMenuClick(menu, index, e)}
                          className={`${
                            isActive(menu.link, menu.subMenu.length > 0)
                              ? "active"
                              : ""
                          }`}
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
                                  className={`${
                                    isActive(subItem.link) ? "active" : ""
                                  }`}
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

                  {/* Signup Login Button */}
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
