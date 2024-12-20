import React from "react";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AppRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
