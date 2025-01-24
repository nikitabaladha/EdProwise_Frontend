import React from "react";

const Topbar = () => {
  return (
    <div className="topbar-web">
      <h2 className="hidden">some</h2>
      <div className="container-fluid">
        <div className="row">
          {/* Left Section */}
          <div className="col col-lg-8 col-md-12 col-12">
            <div className="contact-intro">
              <ul>
                <li>
                  <i className="fi flaticon-phone-call"></i> (307) 555-0133
                </li>
                <li>
                  <i className="fi flaticon-email"></i> demo.Edprowise@gmail.com
                </li>
                <li className="contact-location">
                  <i className="fi flaticon-maps-and-flags"></i> 244 Royal Ln.
                  Mesa, New Jersey 463
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="col col-lg-4 col-md-12 col-12">
            <div className="contact-info">
              <ul>
                <li>
                  <a href="#">
                    <i className="fi flaticon-facebook-app-symbol"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fi flaticon-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fi flaticon-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fi flaticon-instagram-1"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fi flaticon-pinterest"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fi flaticon-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
