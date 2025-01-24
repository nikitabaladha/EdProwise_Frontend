import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SchoolDashboardHeader from "./SchoolDashboardHeader";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const SchoolDashboardMain = () => {
  return (
    <>
      <div className="wrapper">
        <SchoolDashboardHeader />
        <Sidebar />

        <div className="page-content custom-font-size">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default SchoolDashboardMain;
