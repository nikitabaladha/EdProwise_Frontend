import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import DashboardMain from "./components/DashboardMain/DashboardMain";

const AppRoutes = ({ isAuthenticated, handleLogin }) => {
  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
