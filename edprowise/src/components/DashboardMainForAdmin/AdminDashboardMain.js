import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardHeader from "./AdminDashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const AdminDashboardMain = () => {
  // Return the JSX to be rendered
  return (
    <div className="wrapper">
      <AdminDashboardHeader />
      <Sidebar />
      <div className="page-content custom-font-size">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardMain;
