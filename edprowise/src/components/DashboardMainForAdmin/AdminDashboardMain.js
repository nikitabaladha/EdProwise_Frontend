import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardHeader from "./AdminDashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Page404ForWebsite from "../Pages404/Page404ForDashboard";
import { ThemeProvider } from '../ThemeProvider';
import { SchoolPayrollSettingsProvider } from "../DashboardMainForSchool/PayrollModule/AdminSettings/ProvidentFoundSetting/SchoolPayrollSettingsContext";

const AdminDashboardMain = () => {
  return (
    <>
    <ThemeProvider>
      <SchoolPayrollSettingsProvider>
      <div className="wrapper">
        <AdminDashboardHeader />
        <Sidebar />
        <div className="page-content custom-font-size">
          <Outlet />
        </div>
        <Footer />
      </div>
      </SchoolPayrollSettingsProvider>
    </ThemeProvider>
    </>
  );
};
 
export default AdminDashboardMain;
 