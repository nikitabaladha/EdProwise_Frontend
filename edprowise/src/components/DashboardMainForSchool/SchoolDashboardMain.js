import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SchoolDashboardHeader from "./SchoolDashboardHeader";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { NotificationProviderForSchool } from "../NotificationProviderForSchool";

const SchoolDashboardMain = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const schoolId = userDetails?.schoolId;

  return (
    <>
      <NotificationProviderForSchool schoolId={schoolId}>
        <div className="wrapper">
          <SchoolDashboardHeader />
          <Sidebar />

          <div className="page-content custom-font-size">
            <Outlet />
          </div>

          <Footer />
        </div>
      </NotificationProviderForSchool>
    </>
  );
};

export default SchoolDashboardMain;
