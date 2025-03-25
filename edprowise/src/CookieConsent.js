// src/CookieConsent.js
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(["userConsent", "pageData", "theme"]);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show popup only if "userConsent" cookie is NOT set
    if (!cookies.userConsent) {
      setShowPopup(true);
    }
  }, [cookies]);

  useEffect(() => {
    // Update pageData on each route change
    if (cookies.userConsent) {
      setCookie(
        "pageData",
        JSON.stringify({ CurrentVisitedPage: location.pathname }),
        {
          path: "/",
          maxAge: 36000,
          secure: true,
          sameSite: "Strict",
        }
      );
    }
  }, [location, cookies.userConsent, setCookie]);

  useEffect(() => {
    // Save the user's theme preference in cookies and track theme changes
    const handleThemeChange = () => {
      if (cookies.userConsent) {
        const currentTheme =
          document.documentElement.getAttribute("data-bs-theme") || "light";
        setCookie("theme", currentTheme, {
          path: "/",
          maxAge: 36000,
          secure: true,
          sameSite: "Strict",
        });
      }
    };

    handleThemeChange(); // Initial sync

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });

    return () => observer.disconnect();
  }, [cookies.userConsent, setCookie]);

  useEffect(() => {
    // Save the user's theme preference in cookies
    if (cookies.userConsent) {
      const savedTheme =
        document.documentElement.getAttribute("data-bs-theme") || "light";
      setCookie("theme", savedTheme, {
        path: "/",
        maxAge: 36000,
        secure: true,
        sameSite: "Strict",
      });
    }
  }, [cookies.userConsent, setCookie]);

  // Accept all cookies and hide popup
  const acceptCookies = () => {
    setCookie("userConsent", true, {
      path: "/",
      maxAge: 36000, // Cookie expires in 10 hours
      secure: true, // Only sent over HTTPS
      sameSite: "Strict", // Prevents CSRF attacks
    });

    setCookie(
      "pageData",
      JSON.stringify({ CurrentVisitedPage: location.pathname }),
      {
        path: "/",
        maxAge: 36000,
        secure: true,
        sameSite: "Lax",
      }
    );

    const currentTheme =
      document.documentElement.getAttribute("data-bs-theme") || "light";
    setCookie("theme", currentTheme, {
      path: "/",
      maxAge: 36000,
      secure: true,
      sameSite: "Strict",
    });

    setShowPopup(false);
  };

  // If user already accepted, do not show the popup
  if (!showPopup) return null;

  return (
    <div style={popupStyle}>
      <p>
        We use cookies to enhance your experience. By continuing, you agree to
        our use of cookies.
      </p>
      <button onClick={acceptCookies} style={buttonStyle}>
        Accept All Cookies
      </button>
    </div>
  );
};

// Simple inline styles (customize as needed)
const popupStyle = {
  position: "fixed",
  top: "10%",
  right: "10px",
  background: "#333",
  color: "#fff",
  padding: "15px",
  borderRadius: "10px",
  zIndex: 1000,
  // maxWidth: "300px",
};

const buttonStyle = {
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "8px 16px",
  marginLeft: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default CookieConsent;
