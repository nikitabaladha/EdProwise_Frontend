import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardHeader from "./AdminDashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { SearchProvider } from "./SearchContext"; // Import the SearchProvider

// this is my entire application wrapped inside this 
const AdminDashboardMain = () => {
  
  return (
    <SearchProvider>
      <div className="wrapper">
        <AdminDashboardHeader />
        <Sidebar />
        <div className="page-content custom-font-size">
          <Outlet />
        </div>
        <Footer />
      </div>
    </SearchProvider>
  );
};

export default AdminDashboardMain;