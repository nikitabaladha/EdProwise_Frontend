import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import EmployeeDashboardHeader from "./EmployeeDashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const EmployeeDashboardMain = () => {
  return (
    <>
      <div className="wrapper">
        <EmployeeDashboardHeader />
        <Sidebar />

        <div className="page-content custom-font-size">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default EmployeeDashboardMain;
