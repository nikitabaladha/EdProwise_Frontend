import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardHeader from "./AdminDashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { NotificationProviderForEdprowise } from "../NotificationProviderForEdprowise";

// this is my entire application wrapped inside this
const AdminDashboardMain = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const edprowiseId = userDetails?.id;

  return (
    <>
      <NotificationProviderForEdprowise edprowiseId={edprowiseId}>
        <div className="wrapper">
          <AdminDashboardHeader />
          <Sidebar />
          <div className="page-content custom-font-size">
            <Outlet />
          </div>
          <Footer />
        </div>
      </NotificationProviderForEdprowise>
    </>
  );
};

export default AdminDashboardMain;
