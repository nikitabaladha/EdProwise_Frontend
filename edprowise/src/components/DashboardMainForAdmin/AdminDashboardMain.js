// import React, { useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import AdminDashboardHeader from "./AdminDashboardHeader";
// import Sidebar from "../Sidebar/Sidebar";
// import Footer from "../Footer/Footer";

// // this is my entire application wrapped inside this
// const AdminDashboardMain = () => {
//   return (
//     <div className="wrapper">
//       <AdminDashboardHeader />
//       <Sidebar />
//       <div className="page-content custom-font-size">
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AdminDashboardMain;

// src/components/AdminDashboardMain.js
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboardHeader from './AdminDashboardHeader';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { ThemeProvider } from '../ThemeProvider'; 

const AdminDashboardMain = () => {
  return (
    <ThemeProvider>
      <div className="wrapper">
        <AdminDashboardHeader />
        <Sidebar />
        <div className="page-content custom-font-size">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboardMain;