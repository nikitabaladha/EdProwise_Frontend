import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              {new Date().getFullYear()} © EdProwise.
              <iconify-icon
                icon="iconamoon:heart-duotone"
                className="fs-18 align-middle text-danger"
              />{" "}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
