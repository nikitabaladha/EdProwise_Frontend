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
    {
      name: "Download Brochure",
      link: "#",
    },
    { name: "Become A Supplier", link: "/signup" },
   
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
                  <Link to="/" className="navbar-brand">
                    <img
                      src="/assets/website-images/EdProwiseLogoWhite.webp"
                      width="180px"
                      alt="EdProwise Logo"
                    />
                  </Link>
                </div>
                <p>
                Startup founded on the principle of empowering educational institutions, specializes in delivering various services to educational institution
                </p>
                <div className="social">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/profile.php?id=100088336484479&mibextid=ZbWKwL">
                        <i className="fi flaticon-facebook-app-symbol"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://x.com/edprowise?s=09">
                        <i className="fi flaticon-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/company/edprowise/">
                        <i className="fi flaticon-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/edprowise?igsh=MWM4ZTAwNmo1bTA3MA==">
                        <i className="fi flaticon-instagram-1"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://youtube.com/@edprowise?si=-9fYnKkzsGFcXCQE">
                        <i className="fi flaticon-youtube"></i>
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
                      <i className="fi flaticon-email"></i>info@edprowise.com
                    </li>
                    <li>
                      <i className="fi flaticon-phone-call"></i>+91-9958528306
                      
                    </li>
                    <li>
                      <i className="fi flaticon-placeholder"></i> New Delhi, Delhi, India.
                      
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
                    <Link to="/terms">Terms</Link>
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
