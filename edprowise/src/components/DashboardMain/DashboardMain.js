import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const DashboardMain = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [fullName, setFullName] = useState("");

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      const userFullName = `${userDetails.firstName} ${userDetails.lastName}`;
      setFullName(userFullName);
      toast.success(`Welcome, ${userFullName}`);
    }
  }, []);

  return (
    <>
      <ToastContainer />

      <Sidebar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />

      <section className="dash-container">
        <div className="dash-content">
          {/* The Outlet component will render the matched child route */}
          <Outlet />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DashboardMain;
