
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import StudentDashboardHeader from './StudentDashboardHeader';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import { ThemeProvider } from '../ThemeProvider';

const StudentDashboardMain = () => {
  return (
    <>
      <ThemeProvider>
        <div className="wrapper">
          <StudentDashboardHeader />
          <Sidebar /> 
          <div className="page-content custom-font-size">
            <Outlet />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};
 
export default StudentDashboardMain;
 