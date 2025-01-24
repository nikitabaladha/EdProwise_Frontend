import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import DashboardFooter from "./DashboardFooter/DashboardFooter";
import { Outlet } from "react-router-dom";

const WebsiteMain = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll Y Position:", window.scrollY);
      if (window.scrollY > 500) {
        console.log("Button should appear");
        setShowBackToTop(true);
      } else {
        console.log("Button should disappear");
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="page-wrapper font-family-web">
          <Outlet />
        </div>
        <DashboardFooter />

        {showBackToTop && (
          <button
            className="back-to-top"
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: "1000",
              backgroundColor: "#007bff",
              color: "white",
              border: "2px solid blue",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.9,
            }}
          >
            ↑
          </button>
        )}
      </div>
    </>
  );
};

export default WebsiteMain;
