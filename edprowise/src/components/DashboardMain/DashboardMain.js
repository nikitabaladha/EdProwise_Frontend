import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const DashboardMain = () => {
  return (
    <>
      <div id="layout-wrapper">
        <Sidebar />
        {/* here in outlet i want to show dashboard, registration etc page dynamically so that sidebar and footer will be same the content will be change according to Page change */}
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default DashboardMain;
