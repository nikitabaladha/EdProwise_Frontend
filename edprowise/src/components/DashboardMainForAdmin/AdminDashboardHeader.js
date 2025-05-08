import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";

import { ThemeContext } from "../ThemeProvider";

import getAPI from "../../api/getAPI";
import { useNavigate } from "react-router-dom";
import { useLogout } from '../../useLogout';

const AdminDashboardHeader = () => {
  const navigate = useNavigate();
    const logout = useLogout();

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("userDetails");
  //   window.location.href = "/login";
  // };

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    const [isMobile, setIsMobile] = useState(false);
  
  
    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768); 
      };
  
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
  
      return () => window.removeEventListener("resize", checkScreenSize);
    }, [])
  
    const toggleSidebar = () => {
      const htmlElement = document.documentElement;
      const bodyElement = document.body;
    
      htmlElement.classList.toggle("sidebar-enable");
    
      if (htmlElement.classList.contains("sidebar-enable")) {
        bodyElement.style.overflow = "hidden";
    
        if (!document.querySelector(".offcanvas-backdrop")) {
          const backdrop = document.createElement("div");
          backdrop.className = "offcanvas-backdrop fade show";
          bodyElement.appendChild(backdrop);
        }
      } else {
        bodyElement.style.overflow = "";
    
     
        const backdrop = document.querySelector(".offcanvas-backdrop");
        if (backdrop) backdrop.remove();
      }
    };
    
    const handleDocumentClick = (event) => {
      const htmlElement = document.documentElement;
      const mainNav = document.querySelector(".main-nav");
    
      if (
        htmlElement.classList.contains("sidebar-enable") &&
        mainNav &&
        !mainNav.contains(event.target) &&
        !event.target.closest(".button-toggle-menu")
      ) {
        htmlElement.classList.remove("sidebar-enable");
        document.body.style.overflow = "";
  
        const backdrop = document.querySelector(".offcanvas-backdrop");
        if (backdrop) backdrop.remove();
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
            const result = response.data.data[0];

            if (result.type === "quoteRequest") {
              navigate(
                `/admin-dashboard/procurement-services/view-requested-quote`,
                {
                  state: { searchEnquiryNumber: result.text },
                }
              );
            }
            if (result.type === "orderFromBuyer") {
              navigate(
                `/admin-dashboard/procurement-services/view-order-history`,
                {
                  state: { searchOrderNumber: result.text },
                }
              );
            } else if (result.type === "school") {
              navigate(`/admin-dashboard/schools/view-school`, {
                state: {
                  schoolId: result.schoolId || result.text,
                  searchQuery: searchQuery,
                },
              });
            } else if (result.type === "seller") {
              navigate(`/admin-dashboard/sellers/view-seller`, {
                state: {
                  sellerId: result.sellerId || result.text,
                  searchQuery: searchQuery,
                },
              });
            }
          } else {
            setSearchResults([
              {
                type: "noResults",
                text: "No matching records found",
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
      navigate(`/admin-dashboard/procurement-services/view-requested-quote`, {
        state: { searchEnquiryNumber: result.text },
      });
    }
    if (result.type === "orderFromBuyer") {
      navigate(`/admin-dashboard/procurement-services/view-order-history`, {
        state: { searchOrderNumber: result.text },
      });
    } else if (result.type === "school") {
      navigate(`/admin-dashboard/schools/view-school`, {
        state: {
          schoolId: result.schoolId || result.text,
          searchQuery: searchQuery,
        },
      });
    } else if (result.type === "seller") {
      navigate(`/admin-dashboard/sellers/view-seller`, {
        state: {
          sellerId: result.sellerId || result.text,
          searchQuery: searchQuery,
        },
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
                  style={{
                    display: isMobile ? "block" : "none"
                  }}
                >
                  <iconify-icon
                    icon="solar:hamburger-menu-broken"
                    className="fs-24 align-middle"
                  />
                </button>
              </div>
              {/* Menu Toggle Button */}
              <div className="topbar-item">
                <h4 className="fw-bold topbar-button pe-none text-uppercase mb-0 ">
                  Welcome! {userDetails?.firstName} {userDetails?.lastName}
                </h4>
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              {/* Theme Color (Light/Dark) */}
              <div className="topbar-item">
                <button
                  type="button"
                  className="topbar-button"
                  id="light-dark-mode"
                  onClick={toggleTheme}
                >
                  <iconify-icon
                    icon="solar:moon-bold-duotone"
                    className="fs-24 align-middle "
                  />
                </button>
              </div>
              {/* Notification */}
              <div className="dropdown topbar-item">
                <button
                  type="button"
                  className="topbar-button position-relative"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <iconify-icon
                    icon="solar:bell-bing-bold-duotone"
                    className="fs-24 align-middle "
                  />
                  <span className="position-absolute topbar-badge fs-10 translate-middle badge bg-danger rounded-pill">
                    3<span className="visually-hidden">unread messages</span>
                  </span>
                </button>
                <div
                  className="dropdown-menu py-0 dropdown-lg dropdown-menu-end"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 fs-16 fw-semibold">
                          {" "}
                          Notifications
                        </h6>
                      </div>
                      <div className="col-auto">
                        <Link
                          to=""
                          className="text-dark text-decoration-underline"
                        >
                          <small>Clear All</small>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div data-simplebar="" style={{ maxHeight: 280 }}>
                    {/* Item */}
                    <Link
                      to=""
                      className="dropdown-item py-3 border-bottom text-wrap"
                    >
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <img
                            src="assets/images/users/avatar-1.jpg"
                            className="img-fluid me-2 avatar-sm rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0">
                            <span className="fw-medium">
                              Josephine Thompson{" "}
                            </span>
                            commented on admin panel{" "}
                            <span>
                              " Wow 😍! this admin looks good and awesome
                              design"
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* Item */}
                    <Link to="" className="dropdown-item py-3 border-bottom">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="avatar-sm me-2">
                            <span className="avatar-title bg-soft-info text-info fs-20 rounded-circle">
                              D
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold">Donoghue Susan</p>
                          <p className="mb-0 text-wrap">
                            Hi, How are you? What about our next meeting
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* Item */}
                    <Link to="" className="dropdown-item py-3 border-bottom">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <img
                            src="assets/images/users/avatar-3.jpg"
                            className="img-fluid me-2 avatar-sm rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold">Jacob Gines</p>
                          <p className="mb-0 text-wrap">
                            Answered to your comment on the cash flow forecast's
                            graph 🔔.
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* Item */}
                    <Link to="" className="dropdown-item py-3 border-bottom">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="avatar-sm me-2">
                            <span className="avatar-title bg-soft-warning text-warning fs-20 rounded-circle">
                              <iconify-icon icon="iconamoon:comment-dots-duotone" />
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold text-wrap">
                            You have received <b>20</b> new messages in the
                            conversation
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* Item */}
                    <Link to="" className="dropdown-item py-3 border-bottom">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <img
                            src="assets/images/users/avatar-5.jpg"
                            className="img-fluid me-2 avatar-sm rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-semibold">Shawn Bunch</p>
                          <p className="mb-0 text-wrap">Commented on Admin</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="text-center py-3">
                    <Link to="to" className="btn btn-primary btn-sm">
                      View All Notification{" "}
                      <i className="bx bx-right-arrow-alt ms-1" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* User */}
              <div className="dropdown topbar-item">
                <Link
                  type="button"
                  className="topbar-button"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${adminProfile?.edprowiseProfile}`}
                      className="rounded-circle"
                      alt="logo light"
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link
                    className="dropdown-item"
                    onClick={(event) =>
                      navigateToViewAdminProfile(event, adminProfile?._id)
                    }
                  >
                    <CgProfile className="bx bx-user-circle text-muted fs-18 align-middle me-1" />
                    <span className="align-middle">
                      {userDetails?.firstName} {userDetails?.lastName}
                    </span>
                  </Link>

                  <Link
                    className="dropdown-item"
                    onClick={(event) =>
                      navigateToChangeAdminPassword(event, adminProfile)
                    }
                  >
                    <IoKeyOutline className="bx bx-message-dots text-muted fs-18 align-middle me-1" />
                    <span className="align-middle">Change Password</span>
                  </Link>

                  <div className="dropdown-divider my-1" />
                  <Link className="dropdown-item text-danger">
                    <BiLogOut className="bx bx-log-out fs-18 align-middle me-1" />
                    <span className="align-middle" onClick={logout}>
                      Logout
                    </span>
                  </Link>
                </div>
              </div>
              <form
                className="app-search d-none d-md-block ms-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="position-relative">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    autoComplete="off"
                    defaultValue=""
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
                      {searchResults.map((result) => (
                        <div
                          key={`${result.type}-${result.id}`}
                          className="search-result-item"
                          onClick={() => handleResultClick(result)}
                        >
                          {/* School*/}
                          {result.type === "school" && (
                            <>
                              <iconify-icon
                                icon="solar:school-outline"
                                className="me-2"
                              />
                              {result.exactMatchForSchoolEmail ? (
                                <>Email: {result.text}</>
                              ) : result.exactMatchForSchoolMobileNumber ? (
                                <>Mobile Number: {result.text}</>
                              ) : result.exactMatchForSchoolId ? (
                                <>School ID: {result.text}</>
                              ) : result.exactMatchForSchoolName ? (
                                <>School Name: {result.text}</>
                              ) : (
                                <>{result.text}</>
                              )}
                            </>
                          )}
                          {/* Seller */}
                          {result.type === "seller" && (
                            <>
                              <iconify-icon
                                icon="solar:school-outline"
                                className="me-2"
                              />
                              {result.exactMatchForSellerEmail ? (
                                <>Email: {result.text}</>
                              ) : result.exactMatchForSellerMobileNumber ? (
                                <>Mobile Number: {result.text}</>
                              ) : result.exactMatchForCompanyName ? (
                                <>Comapny Name: {result.text}</>
                              ) : result.exactMatchForSellerRandomId ? (
                                <>Random Id: {result.text}</>
                              ) : (
                                <>{result.text}</>
                              )}
                            </>
                          )}

                          {result.type === "noResults" && (
                            <span className="text-muted">{result.text}</span>
                          )}
                          {result.type === "error" && (
                            <span className="text-danger">{result.text}</span>
                          )}
                        </div>
                      ))}
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
