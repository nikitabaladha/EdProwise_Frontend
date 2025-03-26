import React, { useContext, useEffect, useState } from "react";

import { ThemeContext } from "../ThemeProvider";

import getAPI from "../../api/getAPI";
import { useNavigate } from "react-router-dom";

const AdminDashboardHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    window.location.href = "/login";
  };

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const toggleSidebar = () => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    htmlElement.classList.toggle("sidebar-enable");

    if (bodyElement.style.overflow === "hidden") {
      bodyElement.style.overflow = "";
    } else {
      bodyElement.style.overflow = "hidden";
    }
  };

  const handleDocumentClick = (event) => {
    const htmlElement = document.documentElement;
    const mainNav = document.querySelector(".main-nav");

    if (
      htmlElement.classList.contains("sidebar-enable") &&
      mainNav &&
      !mainNav.contains(event.target)
    ) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [adminProfile, setAdminProfile] = useState(null);

  const fetchEdprowiseProfileData = async () => {
    try {
      const response = await getAPI(`/edprowise-profile`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setAdminProfile(response.data.data);

        console.log("Admin data from heder", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Admin data:", err);
    }
  };

  useEffect(() => {
    fetchEdprowiseProfileData();
  }, []);

  const navigateToViewAdminProfile = (event, _id) => {
    event.preventDefault();
    navigate("/admin-dashboard/view-admin-profile", {
      state: { _id },
    });
  };

  const navigateToChangeAdminPassword = (event, adminProfile) => {
    event.preventDefault();
    navigate("/admin-dashboard/change-edprowise-admin-password", {
      state: { adminProfile },
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (event) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();

      if (!searchQuery.trim()) {
        setShowResults(false);
        return;
      }

      try {
        const response = await getAPI(
          `/global-search?query=${encodeURIComponent(searchQuery)}`,
          {},
          true
        );

        if (response.data?.success) {
          if (response.data.data.length > 0) {
            navigate(`/admin-dashboard/procurement-services/track-quote`, {
              state: { searchEnquiryNumber: searchQuery },
            });
          } else {
            setSearchResults([
              {
                type: "noResults",
                text: "No matching enquiries found",
              },
            ]);
            setShowResults(true);
          }
        }
      } catch (err) {
        console.error("Search error:", err);
        setSearchResults([
          {
            type: "error",
            text: "Search failed. Please try again.",
          },
        ]);
        setShowResults(true);
      }
    }
  };

  const handleResultClick = (result) => {
    if (result.type === "quoteRequest") {
      navigate(`/admin-dashboard/procurement-services/track-quote`, {
        state: { searchEnquiryNumber: result.text },
      });
    }
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <>
      <header className="topbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="d-flex align-items-center">
              <div className="topbar-item">
                <button
                  type="button"
                  className="button-toggle-menu me-2"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSidebar();
                  }}
                >
                  <iconify-icon
                    icon="solar:hamburger-menu-broken"
                    className="fs-24 align-middle"
                  />
                </button>
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              <form
                className="app-search d-none d-md-block ms-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="position-relative">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search by enquiry number..."
                    autoComplete="off"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                  <iconify-icon
                    icon="solar:magnifer-linear"
                    className="search-widget-icon"
                    onClick={handleSearch}
                    style={{ cursor: "pointer" }}
                  />
                  {showResults && (
                    <div className="search-results-dropdown">
                      {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                          <div
                            key={`${result.type}-${result.id}`}
                            className="search-result-item"
                            onClick={() => handleResultClick(result)}
                          >
                            {result.text}
                          </div>
                        ))
                      ) : (
                        <div className="search-result-item no-results">
                          No results found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminDashboardHeader;
