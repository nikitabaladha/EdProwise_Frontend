import Navbar from "./Navbar/Navbar";
import DashboardFooter from "./DashboardFooter/DashboardFooter";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";

// import "../website-css/themify-icons.css";
// import "../website-css/flaticon.css";
// import "../website-css/font-awesome.min.css";
// import "../website-css/animate.css";
// import "../website-css/owl.carousel.css";
// import "../website-css/owl.theme.css";
// import "../website-css/slick.css";
// import "../website-css/slick-theme.css";
// import "../website-css/swiper.min.css";
// import "../website-css/odometer-theme-default.css";
// import "../website-css/style.css";

const WebsiteMain = () => {
  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <DashboardFooter />
    </>
  );
};

export default WebsiteMain;
