import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const DashboardMain = () => {
  return (
    <>
      <Sidebar />
    </>
  );
};

export default DashboardMain;
