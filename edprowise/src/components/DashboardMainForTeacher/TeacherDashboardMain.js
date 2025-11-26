import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import TeacherDashboardHeader from "./TeacherDashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const TeacherDashboardMain = () => {
  return (
    <>
      <div className="wrapper">
        <TeacherDashboardHeader />
        <Sidebar />

        <div className="page-content custom-font-size">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TeacherDashboardMain;
