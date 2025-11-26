import React from "react";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthProvider } from './AuthContext';
import CookieConsent from "./CookieConsent";
import { CookiesProvider } from "react-cookie";



import AppRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CookiesProvider>
        <AppRoutes />
        <CookieConsent />
        <ToastContainer />
      </CookiesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
