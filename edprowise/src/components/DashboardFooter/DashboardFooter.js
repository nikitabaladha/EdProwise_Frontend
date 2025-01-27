import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const menuData = [
    { name: "Home", link: "/" },
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Services",
      link: "/services/digital-services",
    },
    { name: "Orders", link: "#" },
    {
      name: "Community Connect",
      link: "/community-connect/gallery",
    },
  ];

  const useLinks = [
    { name: "Contact Us", link: "/contact-us", subMenu: [] },
    {
      name: "Career",
      link: "/career",
    },
    {
      name: "FAQ",
      link: "/faq",
    },
    { name: "Become A Supplier", link: "/become-supplier" },
    {
      name: "Privacy & Policy",
      link: "/privacy-policy",
    },
  ];
  return (
    <footer className="wpo-site-footer">
      <div className="wpo-upper-footer">
        <div className="container">
          <div className="row">
            {/* About Widget */}
            <div className="col col-lg-3 col-md-6 col-12 col-sm-12 mt-0">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <a className="navbar-brand" href="index-2.html">
                    <img
                      src="/assets/website-images/EdProwiseLogoWhite.webp"
                      width="180px"
                      alt="EdProwise Logo"
                    />
                  </a>
                </div>
                <p>
                  Mattis inelit neque quis donec eleifnd amet. Amet sed et
                  cursus eu euismod. Egestas in morbi tristique ornare vulputate
                  vitae enim.
                </p>
                <div className="social">
                  <ul>
                    <li>
                      <a>
                        <i className="fi flaticon-facebook-app-symbol"></i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="fi flaticon-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="fi flaticon-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="fi flaticon-instagram-1"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="col col-lg-3 col-md-6 col-12 col-sm-12">
              <div className="widget link-widget">
                <div className="widget-title">
                  <h3>Quick Links</h3>
                </div>
                <ul>
                  {menuData.map((menu, index) => (
                    <li key={index}>
                      <Link to={menu.link}>{menu.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Useful Links */}
            <div className="col col-lg-3 col-md-6 col-12 col-sm-12">
              <div className="widget link-widget s2">
                <div className="widget-title">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  {useLinks.map((menu, index) => (
                    <li key={index}>
                      <Link to={menu.link}>{menu.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Contact Us */}
            <div className="col col-lg-3 col-md-6 col-12 col-sm-12">
              <div className="widget wpo-contact-widget">
                <div className="widget-title">
                  <h3>Contact Us</h3>
                </div>
                <div className="contact-ft">
                  <ul>
                    <li>
                      <i className="fi flaticon-email"></i>Edprowise@gmail.com
                    </li>
                    <li>
                      <i className="fi flaticon-phone-call"></i>(208) 555-0112{" "}
                      <br />
                      (704) 555-0127
                    </li>
                    <li>
                      <i className="fi flaticon-placeholder"></i>4517 Washington
                      Ave. <br /> Manchter, Kentucky 495
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Lower Footer */}
      <div className="wpo-lower-footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col col-lg-6 col-md-12 col-12">
              <ul>
                <li>
                  &copy; 2025 <a href="#">Edprowise</a>. All rights reserved.
                </li>
              </ul>
            </div>
            <div className="col col-lg-6 col-md-12 col-12">
              <div className="link">
                <ul>
                  <li>
                    <Link to="/privacy-policy">Privacy & Policy</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Terms</Link>
                  </li>
                  <li>
                    <Link to="/about-us">About us</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
