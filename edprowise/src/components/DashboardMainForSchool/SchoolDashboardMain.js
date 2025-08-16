import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SchoolDashboardHeader from "./SchoolDashboardHeader";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { SchoolPayrollSettingsProvider } from "./PayrollModule/AdminSettings/ProvidentFoundSetting/SchoolPayrollSettingsContext";
const SchoolDashboardMain = () => {
  return (
    <>
    <SchoolPayrollSettingsProvider>
      <div className="wrapper">
        <SchoolDashboardHeader />
        <Sidebar />

        <div className="page-content custom-font-size">
          <Outlet />
        </div>

        <Footer />
      </div>
      </SchoolPayrollSettingsProvider>
    </>
  );
};

export default SchoolDashboardMain;
