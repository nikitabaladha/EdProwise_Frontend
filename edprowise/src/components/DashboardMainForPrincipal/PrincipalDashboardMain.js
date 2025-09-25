import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import PrincipalDashboardHeader from "./PrincipalDashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const PrincipalDashboardMain = () => {
  return (
    <>
        <div className="wrapper">
          <PrincipalDashboardHeader />
          <Sidebar />

          <div className="page-content custom-font-size">
            <Outlet />
          </div>

          <Footer />
        </div>
    </>
  );
};

export default PrincipalDashboardMain;
