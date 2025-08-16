// import React, { useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import AdminDashboardHeader from "./AdminDashboardHeader";
// import Sidebar from "../Sidebar/Sidebar";
// import Footer from "../Footer/Footer";
// import { SchoolPayrollSettingsProvider } from "../DashboardMainForSchool/PayrollModule/AdminSettings/ProvidentFoundSetting/SchoolPayrollSettingsContext";
// // this is my entire application wrapped inside this
// const AdminDashboardMain = () => {
//   return (
//     <>
//     <SchoolPayrollSettingsProvider>
//     <div className="wrapper">
//       <AdminDashboardHeader />
//       <Sidebar />
//       <div className="page-content custom-font-size">
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//     </SchoolPayrollSettingsProvider>
//     </>
//   );
// };

// export default AdminDashboardMain;

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboardHeader from './AdminDashboardHeader';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
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
 