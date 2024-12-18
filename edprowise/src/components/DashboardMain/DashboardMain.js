import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const DashboardMain = () => {
  return (
    <>
      <div id="layout-wrapper">
        {/* <Sidebar /> */}

        <Outlet />

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default DashboardMain;
