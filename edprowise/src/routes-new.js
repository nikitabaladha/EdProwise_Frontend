import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import WebsiteMain from "./components/WebsiteMain";
import HomePage from "./components/HomeSection/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WebsiteMain />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
