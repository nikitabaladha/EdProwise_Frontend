import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              {new Date().getFullYear()} © EdProwise.
            </div>
            <div className="col-sm-6"></div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
