import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const DashboardMain = () => {
  return (
    <>
      <div className="wrapper">
        <DashboardHeader />
        <Sidebar />

        <div className="page-content">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default DashboardMain;
