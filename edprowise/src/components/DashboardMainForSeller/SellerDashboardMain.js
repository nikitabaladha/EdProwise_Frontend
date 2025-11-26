import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import SellerDashboardHeader from "./SellerDashboardHeader";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { SchoolPayrollSettingsProvider } from "../DashboardMainForSchool/PayrollModule/AdminSettings/ProvidentFoundSetting/SchoolPayrollSettingsContext";
const SellerDashboardMain = () => {
  return (
    <>
    <SchoolPayrollSettingsProvider>
      <div className="wrapper">
        <SellerDashboardHeader />
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

export default SellerDashboardMain;
