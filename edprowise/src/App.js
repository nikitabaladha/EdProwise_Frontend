import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/app.min.css";
import "./assets/css/custom.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/css/custom.min.css";
import "./assets/css/icons.min.css";

import AppRoutes from "./routes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there is a token in localStorage
    const token = JSON.parse(localStorage.getItem("accessToken"));
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <AppRoutes isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
    </BrowserRouter>
  );
};

export default App;
