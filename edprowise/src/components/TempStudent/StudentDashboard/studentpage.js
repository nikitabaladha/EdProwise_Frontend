// StudentDashboardLayout.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardInformationCards from "../StudentDashboard/StudentDashboard";
import SchoolHeader from "../StudentDashboard/Header"
const StudentDashboardLayout = () => {
  const location = useLocation();
  

  const isMainDashboard = location.pathname === "/student-dashboard";
  
  return (
    <div>
      <SchoolHeader />
      {isMainDashboard && <DashboardInformationCards />}
      <Outlet /> 
    </div>
  );
};

export default StudentDashboardLayout;