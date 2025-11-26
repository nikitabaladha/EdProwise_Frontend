import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userRole = userDetails?.role || "Guest";
  const email = userDetails?.email;
  const [isCollapsed, setIsCollapsed] = useState(false);



  useEffect(() => {
    const htmlTag = document.documentElement;
    const menuSize = htmlTag.getAttribute("data-menu-size");
    setIsCollapsed(menuSize === "sm-hover");

    const updateMenuState = () => {
      const current = htmlTag.getAttribute("data-menu-size");
      setIsCollapsed(current === "sm-hover" && !htmlTag.querySelector(".main-nav:hover"));
    };

    const updateMenuSize = () => {
      if (window.innerWidth >= 992) {
        htmlTag.setAttribute("data-menu-size", "sm-hover-active");
      } else {
        htmlTag.setAttribute("data-menu-size", "hidden");
      }
      updateMenuState();
    };

    updateMenuSize();
    window.addEventListener('resize', updateMenuSize);
    const observer = new MutationObserver(updateMenuState);
    observer.observe(htmlTag, { attributes: true });

    const mainNav = document.querySelector('.main-nav');
    const handleHover = () => updateMenuState();
    mainNav?.addEventListener('mouseenter', handleHover);
    mainNav?.addEventListener('mouseleave', handleHover);

    return () => {
      window.removeEventListener('resize', updateMenuSize);
      observer.disconnect();
      mainNav?.removeEventListener('mouseenter', handleHover);
      mainNav?.removeEventListener('mouseleave', handleHover);
    };
  }, []);

  const handleIconClick = () => {
    const htmlElement = document.documentElement;
    const current = htmlElement.getAttribute("data-menu-size");

    if (current === "sm-hover") {
      htmlElement.setAttribute("data-menu-size", "sm-hover-active");
    } else if (current === "sm-hover-active") {
      htmlElement.setAttribute("data-menu-size", "sm-hover");
    }
  };

  const menuConfig = {
    Admin: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/admin-dashboard",
      },
      ...(email === "edprowise@gmail.com"
        ? [
          {
            id: "admin",
            label: "Admins",
            icon: "solar:users-group-rounded-bold-duotone",
            link: "/admin-dashboard/admins",
          },
        ]
        : []),
      {
        id: "school",
        label: "Schools",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/admin-dashboard/schools",
      },
      {
        id: "seller",
        label: "Sellers",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/admin-dashboard/sellers",
      },
      {
        id: "subscriptions",
        label: "Subscriptions",
        icon: "solar:wallet-money-bold",
        link: "/admin-dashboard/subscriptions",
      },
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/admin-dashboard/procurement-services/dashboard",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Quotes",
            link: "/admin-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Track Order & Order History",
            link: "/admin-dashboard/procurement-services/track-order-history",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Define Goods & Services",
            link: "/admin-dashboard/procurement-services/good-services",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Bank Details",
            link: "/admin-dashboard/procurement-services/bank-details",
            icon: "solar:users-group-rounded-bold-duotone",
          },
        ],
      },
      {
        id: "requestDemo",
        label: "Request For Demo",
        icon: "solar:wallet-money-bold",
        link: "/admin-dashboard/request-for-demo",
      },
      {
        id: "contact",
        label: "Enquiry",
        icon: "solar:wallet-money-bold",
        link: "/admin-dashboard/enquiry",
      },
      {
        id: "emailSettings",
        label: "Email Settings",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "SMTP Settings",
            link: "/admin-dashboard/email/smtp-setting",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Email Templates",
            link: "/admin-dashboard/email/templates",
            icon: "solar:book-bookmark-bold-duotone",
          },
        ],
      },
    ],

    School: [
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/school-dashboard/procurement-services/dashboard",
            icon: "solar:widget-3-bold-duotone"
          },
          {
            label: "Quotes",
            link: "/school-dashboard/procurement-services/track-quote",
            icon: "solar:file-text-bold-duotone"
          },
          {
            label: "Track Order & Order History",
            link: "/school-dashboard/procurement-services/track-order-history",
            icon: "solar:delivery-bold-duotone",
          },
          {
            label: "Pay To EdProwise",
            link: "/school-dashboard/procurement-services/pay-to-edprowise",
            icon: "solar:card-bold-duotone",
          },
        ],
      },
      {
        id: "feesmodule",
        label: "Fees module",
        icon: "solar:wallet-money-bold",
        children: [
          {
            id: "form",
            label: "Form",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Registration Form",
                link: "/school-dashboard/fees-module/form/registration",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Admission Form",
                link: "/school-dashboard/fees-module/form/admission-list",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "TC Form",
                link: "/school-dashboard/fees-module/form/trasfer-certificate-list",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Concession Form",
                link: "/school-dashboard/fees-module/form/concession-table",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
          {
            id: "feesReceipts",
            label: "Fees Receipts",
            icon: "solar:bill-list-bold-duotone",
            children: [
              {
                label: "School Fees",
                link: "/school-dashboard/fees-module/fees-receipts/school-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Board Registration Fees",
                link: "/school-dashboard/fees-module/fees-receipts/board-registration-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Board Exam fees",
                link: "/school-dashboard/fees-module/fees-receipts/board-exam-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
          {
            id: "adminSetting",
            label: "Admin Setting",
            icon: "solar:users-group-rounded-bold-duotone",
            children: [
              {
                label: "Prefix Settings",
                icon: "solar:settings-bold-duotone",
                children: [
                  {
                    label: "Registration Prefix",
                    link: "/school-dashboard/fees-module/admin-setting/prefix-setting/registartion-prefix",
                    icon: "solar:settings-bold-duotone"
                  },
                  {
                    label: "Admission Prefix",
                    link: "/school-dashboard/fees-module/admin-setting/prefix-setting/admission-prefix",
                    icon: "solar:settings-bold-duotone"
                  }
                ]
              },
              {
                label: "Grade",
                icon: "solar:book-bold-duotone",
                children: [
                  {
                    label: "Shift",
                    link: "/school-dashboard/fees-module/admin-setting/shifts",
                    icon: "solar:alarm-bold-duotone"
                  },
                  {
                    label: "Class & Section",
                    link: "/school-dashboard/fees-module/admin-setting/class-section",
                    icon: "solar:teacher-bold-duotone"
                  }
                ]
              },
              {
                label: "Fees Structure",
                icon: "solar:document-bold-duotone",
                children: [
                  {
                    label: "Fees Types",
                    link: "/school-dashboard/fees-module/admin-setting/fees-type-list",
                    icon: "solar:users-group-rounded-bold-duotone"
                  },
                  {
                    label: "School Fees",
                    link: "/school-dashboard/fees-module/admin-setting/fees-structure",
                    icon: "solar:users-group-rounded-bold-duotone"
                  },
                  {
                    label: "One Time Fees",
                    link: "/school-dashboard/fees-module/admin-setting/one-time-fees",
                    icon: "solar:users-group-rounded-bold-duotone"
                  },
                  {
                    label: "Fine",
                    link: "/school-dashboard/fees-module/admin-setting/fine",
                    icon: "solar:document-bold-duotone"
                  }
                ]
              },
             
            ]
          }
          
          
        ],
      },
    ],
    Seller: [
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/seller-dashboard/procurement-services/dashboard",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Quote Enquiry",
            link: "/seller-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Track Order & Order History",
            link: "/seller-dashboard/procurement-services/track-order-history",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Pay To EdProwise",
            link: "/seller-dashboard/procurement-services/pay-to-edprowise",
            icon: "solar:users-group-rounded-bold-duotone",
          },
        ],
      },
    ],
    Guest: [
      { id: "login", label: "Login", icon: "solar:login-bold", link: "/login" },
    ],
  };


  
  const currentMenu = menuConfig[userRole] || menuConfig.Guest;

  const isPathActive = (link) => location.pathname.startsWith(link);

  const hasActiveChild = (children) => {
    return children.some(child => {
      if (child.link && isPathActive(child.link)) {
        return true;
      }
      if (child.children) {
        return hasActiveChild(child.children);
      }
      return false;
    });
  };

  const renderMenuItems = (items, level = 0) =>
    items.map((item) => {
      const isActive = item.link ? isPathActive(item.link) : false;
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = hasChildren && hasActiveChild(item.children);
      const collapseId = `sidebar-${item.id || item.label.replace(/\s+/g, "-")}`;

      if (hasChildren) {
        return (
          <li className="nav-item" key={item.id || item.label}>
            <a
              className={`nav-link ${isActive || isExpanded ? 'active' : ''} ${level > 0 ? 'ps-4' : ''}`}
              href={`#${collapseId}`}
              data-bs-toggle="collapse"
              role="button"
              aria-expanded={isExpanded}
              aria-controls={collapseId}
              style={{
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                paddingLeft: isCollapsed ? '0' : level > 0 ? '1rem' : '',
                paddingRight: isCollapsed ? '0' : ''
              }}
            >
              <span className="nav-icon">
                <Icon icon={item.icon} />
              </span>
              {!isCollapsed && (
                <>
                  <span className="nav-text">{item.label}</span>
                  <span className="nav-arrow ms-auto">
                    <Icon
                      icon={isExpanded ? "bi:chevron-down" : "bi:chevron-right"}
                      width="12"
                    />
                  </span>
                </>
              )}
            </a>
            <div className={`collapse ${isExpanded ? "show" : ""}`} id={collapseId}>
              <ul className={`nav flex-column ${level > 0 ? 'ms-3' : ''}`}>
                {renderMenuItems(item.children, level + 1)}
              </ul>
            </div>
          </li>
        );
      } else {
        return (
          <li className="nav-item" key={item.id || item.label}>
            <Link
              className={`nav-link ${level > 0 ? 'ps-4' : ''} ${isActive ? "active" : ""}`}
              to={item.link}
              style={{
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                paddingLeft: isCollapsed ? '0' : level > 0 ? '1rem' : '',
                paddingRight: isCollapsed ? '0' : ''
              }}
            >
              <span className="nav-icon">
                <Icon icon={item.icon} />
              </span>
              {!isCollapsed && (
                <>
                  <span className="nav-text">{item.label}</span>
                  <span style={{ width: '16px' }}></span>
                </>
              )}
            </Link>
          </li>
        );
      }
    });

  return (
    <div className="main-nav nav-radius">
      <div className="logo-box">
        <Link to="/" className="logo-dark">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseFavicon.png`}
            className="logo-sm"
          />
          {!isCollapsed && (
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
              className="logo-lg"
              style={{ width: '80%' }}
            />
          )}
        </Link>
      </div>

      <button 
        type="button" 
        className="button-sm-hover" 
        aria-label="Show Full Sidebar"
        onClick={handleIconClick}
      >
        <Icon
          icon="solar:double-alt-arrow-right-bold-duotone"
          className="button-sm-hover-icon"
        />
      </button>

      <div className="scrollbar" data-simplebar>
        <ul className="navbar-nav" id="navbar-nav">
          {renderMenuItems(currentMenu)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;