import React from "react";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThemeProvider } from "./components/ThemeProvider";
import CookieConsent from "./CookieConsent";
// import "bootstrap/dist/css/bootstrap.min.css";
import ChatBot from "./components/CompanyChatBot/ChatBot";

import AppRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CookieConsent />
        <AppRoutes />
        <ChatBot/>
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
