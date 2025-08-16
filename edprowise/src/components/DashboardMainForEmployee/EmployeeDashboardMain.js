import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import SchoolDashboardHeader from "./EmployeeDashboardHeader";
import EmployeeDashboardHeader from "./EmployeeDashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { SchoolPayrollSettingsProvider } from "../DashboardMainForSchool/PayrollModule/AdminSettings/ProvidentFoundSetting/SchoolPayrollSettingsContext";
const EmployeeDashboardMain = () => {
  return (
    <>
    <SchoolPayrollSettingsProvider>
      <div className="wrapper">
        <EmployeeDashboardHeader />
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

export default EmployeeDashboardMain;
