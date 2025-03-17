import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { IoIosArrowForward } from "react-icons/io";
import getAPI from "../../api/getAPI";

const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
  const [school, setSchool] = useState(null);
  const fetchSchoolData = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    if (!schoolId) {
      console.error("School ID not found in localStorage");
      return;
    }

    try {
      const response = await getAPI(`/school-profile/${schoolId}`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setSchool(response.data.data);
        console.log("school data from heder", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School:", err);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();

  const toggleMenu = (menuId, parentId = null) => {
    setOpenMenus((prev) => {
      const newOpenMenus = { ...prev };

      if (parentId) {
        Object.keys(newOpenMenus).forEach((key) => {
          if (key !== parentId) {
            delete newOpenMenus[key];
          }
        });
      } else {
        Object.keys(newOpenMenus).forEach((key) => {
          delete newOpenMenus[key];
        });
      }

      if (newOpenMenus[menuId]) {
        delete newOpenMenus[menuId];
      } else {
        newOpenMenus[menuId] = true;
      }

      return newOpenMenus;
    });
  };
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarVisible
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarVisible, toggleSidebar]);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userRole = userDetails?.role || "Guest";

  const currentRoute = location.pathname;

  const menuConfig = {
    Admin: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/admin-dashboard",
      },
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
    ],

    School: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/school-dashboard",
      },
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Quotes",
            link: "/school-dashboard/procurement-services/track-quote",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Track Order & Order History",
            link: "/school-dashboard/procurement-services/track-order-history",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            label: "Pay To EdProwise",
            link: "/school-dashboard/procurement-services/pay-to-edprowise",
            icon: "solar:users-group-rounded-bold-duotone",
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
                label: "Shift",
                link: "/school-dashboard/fees-module/admin-setting/shifts",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Class & Section",
                link: "/school-dashboard/fees-module/admin-setting/class-section",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Fees Types",
                link: "/school-dashboard/fees-module/admin-setting/fees-type-list",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Fees Structure",
                link: "/school-dashboard/fees-module/admin-setting/fees-structure",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
        ],
      },
    ],
    Seller: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/seller-dashboard",
      },
      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
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

  const menuItems = menuConfig[userRole] || menuConfig["Guest"];

  const renderMenuItem = (item, parentId = null) => {
    const isActive = item.children
      ? item.children.some((child) => currentRoute === child.link)
      : currentRoute === item.link;

    return (
      <li className={`nav-item ${isActive ? "active" : ""}`} key={item.id}>
        {item.children ? (
          <>
            <div
              className={`nav-link collapsed ${isActive ? "active" : ""}`}
              onClick={() => toggleMenu(item.id, parentId)}
            >
              <span className="nav-icon">
                <Icon icon={item.icon} />
              </span>
              <span className="nav-text"> {item.label} </span>
              <IoIosArrowForward
                style={{
                  transition: "transform 0.3s ease",
                  transform: openMenus[item.id]
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              />
            </div>
            {openMenus[item.id] && (
              <div className="collapse show">
                <ul className="nav sub-navbar-nav">
                  {item.children.map((subItem) =>
                    renderMenuItem(subItem, item.id)
                  )}
                </ul>
              </div>
            )}
          </>
        ) : (
          <Link
            className={`nav-link ${isActive ? "active" : ""}`}
            to={item.link}
          >
            <span className="nav-icon">
              <Icon icon={item.icon} />
            </span>
            <span className="nav-text"> {item.label} </span>
          </Link>
        )}
      </li>
    );
  };

  return (
    <div
      ref={sidebarRef}
      className={`main-nav ${sidebarVisible ? "sidebar-enable" : ""}`}
    >
      {/* Sidebar Logo */}
      <div className="logo-box">
        <Link to="" className="logo-dark">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
            className="logo-sm"
            alt={`${school?.schoolName} Profile`}
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
            className="logo-lg"
            alt={`${school?.schoolName} Profile`}
          />
        </Link>
        <Link to="" className="logo-light">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
            className="logo-sm"
            alt={`${school?.schoolName} Profile`}
          />
          <span>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
              className="logo-lg"
              alt={`${school?.schoolName} Profile`}
              style={{ height: "80px !important", width: "160px !important" }}
            />
          </span>
        </Link>
      </div>

      <button
        type="button"
        className="button-sm-hover"
        aria-label="Show Full Sidebar"
      >
        <iconify-icon
          icon="solar:double-alt-arrow-right-bold-duotone"
          className="button-sm-hover-icon"
        />
      </button>

      <div className="scrollbar" data-simplebar="">
        <ul className="navbar-nav" id="navbar-nav">
          {menuItems.map((item) => renderMenuItem(item))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

// My code================================
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Icon } from "@iconify/react";
// import { IoIosArrowForward } from "react-icons/io";
// import getAPI from "../../api/getAPI";

// const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
//   const [school, setSchool] = useState(null);
//   const fetchSchoolData = async () => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const schoolId = userDetails?.schoolId;

//     if (!schoolId) {
//       console.error("School ID not found in localStorage");
//       return;
//     }

//     try {
//       const response = await getAPI(`/school-profile/${schoolId}`, {}, true);

//       if (!response.hasError && response.data && response.data.data) {
//         setSchool(response.data.data);

//         console.log("school data from heder", response.data.data);
//       } else {
//         console.error("Invalid response format or error in response");
//       }
//     } catch (err) {
//       console.error("Error fetching School:", err);
//     }
//   };

//   useEffect(() => {
//     fetchSchoolData();
//   }, []);

//   const [openMenu, setOpenMenu] = useState(null);
//   const location = useLocation();

//   const toggleMenu = (menuId) => {
//     const newOpenMenu = openMenu === menuId ? null : menuId;
//     setOpenMenu(newOpenMenu);
//     localStorage.setItem("openMenu", newOpenMenu);
//   };

//   const sidebarRef = useRef(null);

//   // Handle clicks outside of the sidebar
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target) &&
//         sidebarVisible
//       ) {
//         toggleSidebar();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarVisible, toggleSidebar]);

//   // Retrieve the open menu from localStorage on mount
//   useEffect(() => {
//     const storedOpenMenu = localStorage.getItem("openMenu");
//     if (storedOpenMenu) {
//       setOpenMenu(storedOpenMenu);
//     }
//   }, []);

//   const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//   const userRole = userDetails?.role || "Guest";

//   const currentRoute = location.pathname;

//   const menuConfig = {
//     Admin: [
//       {
//         id: "dashboard",
//         label: "Dashboard",
//         icon: "solar:widget-5-bold-duotone",
//         link: "/admin-dashboard",
//       },
//       {
//         id: "school",
//         label: "Schools",
//         icon: "solar:users-group-rounded-bold-duotone",
//         link: "/admin-dashboard/schools",
//       },
//       {
//         id: "seller",
//         label: "Sellers",
//         icon: "solar:users-group-rounded-bold-duotone",
//         link: "/admin-dashboard/sellers",
//       },
//       {
//         id: "subscriptions",
//         label: "Subscriptions",
//         icon: "solar:wallet-money-bold",
//         link: "/admin-dashboard/subscriptions",
//       },

//       {
//         id: "procurementServices",
//         label: "Procurement Services",
//         icon: "solar:wallet-money-bold",
//         children: [
//           {
//             label: "Quotes",
//             link: "/admin-dashboard/procurement-services/track-quote",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//           {
//             label: "Track Order & Order History",
//             link: "/admin-dashboard/procurement-services/track-order-history",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//           {
//             label: "Define Goods & Services",
//             link: "/admin-dashboard/procurement-services/define-goods-services",
//             icon: "solar:users-group-rounded-bold-duotone",
//             children: [
//               {
//                 label: "Main Category",
//                 link: "/school-dashboard/fees-module/form/registration",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Category",
//                 link: "/school-dashboard/fees-module/form/admission-list",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Sub Category",
//                 link: "/school-dashboard/fees-module/form/trasfer-certificate-list",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//             ],
//           },
//           {
//             label: "Bank Details",
//             link: "/admin-dashboard/procurement-services/bank-details",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//         ],
//       },
//       {
//         id: "requestDemo",
//         label: "Request For Demo",
//         icon: "solar:wallet-money-bold",
//         link: "/admin-dashboard/request-for-demo",
//       },
//       {
//         id: "contact",
//         label: "Enquiry",
//         icon: "solar:wallet-money-bold",
//         link: "/admin-dashboard/enquiry",
//       },
//     ],
//     School: [
//       {
//         id: "dashboard",
//         label: "Dashboard",
//         icon: "solar:widget-5-bold-duotone",
//         link: "/school-dashboard",
//       },
//       {
//         id: "procurementServices",
//         label: "Procurement Services",
//         icon: "solar:wallet-money-bold",
//         children: [
//           {
//             label: "Quotes",
//             link: "/school-dashboard/procurement-services/track-quote",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//           {
//             label: "Track Order & Order History",
//             link: "/school-dashboard/procurement-services/track-order-history",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//           {
//             label: "Pay To EdProwise",
//             link: "/school-dashboard/procurement-services/pay-to-edprowise",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//         ],
//       },
//       {
//         id: "feesmodule",
//         label: "Fees module",
//         icon: "solar:wallet-money-bold",
//         children: [
//           {
//             id: "form",
//             label: "Form",
//             icon: "solar:book-bookmark-bold-duotone",
//             children: [
//               {
//                 label: "Registration Form",
//                 link: "/school-dashboard/fees-module/form/registration",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Admission Form",
//                 link: "/school-dashboard/fees-module/form/admission-list",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "TC Form",
//                 link: "/school-dashboard/fees-module/form/trasfer-certificate-list",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Concession Form",
//                 link: "/school-dashboard/fees-module/form/concession-table",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//             ],
//           },
//           {
//             id: "feesReceipts",
//             label: "Fees Receipts",
//             icon: "solar:bill-list-bold-duotone",
//             children: [
//               {
//                 label: "School Fees",
//                 link: "/school-dashboard/fees-module/fees-receipts/school-fees",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Board Registration Fees",
//                 link: "/school-dashboard/fees-module/fees-receipts/board-registration-fees",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Board Exam fees",
//                 link: "/school-dashboard/fees-module/fees-receipts/board-exam-fees",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//             ],
//           },
//           {
//             id: "adminSetting",
//             label: "Admin Setting",
//             icon: "solar:users-group-rounded-bold-duotone",
//             children: [
//               {
//                 label: "Shift",
//                 link: "/school-dashboard/fees-module/admin-setting/shifts",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Class & Section",
//                 link: "/school-dashboard/fees-module/admin-setting/class-section",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Fees Types",
//                 link: "/school-dashboard/fees-module/admin-setting/fees-type-list",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Fees Structure",
//                 link: "/school-dashboard/fees-module/admin-setting/fees-structure",
//                 // icon: "solar:users-group-rounded-bold-duotone",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     Seller: [
//       {
//         id: "dashboard",
//         label: "Dashboard",
//         icon: "solar:widget-5-bold-duotone",
//         link: "/seller-dashboard",
//       },
//       {
//         id: "procurementServices",
//         label: "Procurement Services",
//         icon: "solar:wallet-money-bold",
//         children: [
//           {
//             label: "Quote Enquiry",
//             link: "/seller-dashboard/procurement-services/track-quote",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//           // {
//           //   label: "Submitted Quote",
//           //   link: "/seller-dashboard/procurement-services/submitted-quote",
//           //   icon: "solar:users-group-rounded-bold-duotone",
//           // },
//           // {
//           //   label: "View Prepared Quote",
//           //   link: "/seller-dashboard/procurement-services/prepared-quote",
//           //   icon: "solar:users-group-rounded-bold-duotone",
//           // },
//           {
//             label: "Track Order & Order History",
//             link: "/seller-dashboard/procurement-services/track-order-history",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//           {
//             label: "Pay To EdProwise",
//             link: "/seller-dashboard/procurement-services/pay-to-edprowise",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//           // {
//           //   label: "Invoice For EdProwise",
//           //   link: "/seller-dashboard/procurement-services/invoice-for-edprowise",
//           //   icon: "solar:users-group-rounded-bold-duotone",
//           // },
//           // {
//           //   label: "Invoice For Buyer",
//           //   link: "/seller-dashboard/procurement-services/invoice-for-buyer",
//           //   icon: "solar:users-group-rounded-bold-duotone",
//           // },
//           // {
//           //   label: "Quote/Proposal",
//           //   link: "/seller-dashboard/procurement-services/quote-proposal",
//           //   icon: "solar:users-group-rounded-bold-duotone",
//           // },
//         ],
//       },
//     ],
//     Guest: [
//       { id: "login", label: "Login", icon: "solar:login-bold", link: "/login" },
//     ],
//   };

//   const menuItems = menuConfig[userRole] || menuConfig["Guest"];

//   return (
//     <div
//       ref={sidebarRef}
//       className={`main-nav ${sidebarVisible ? "sidebar-enable" : ""}`}
//     >
//       {/* Sidebar Logo */}
//       <div className="logo-box">
//         <Link to="" className="logo-dark">
//           <img
//             // src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school?.profileImage}`}
//             src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
//             className="logo-sm"
//             alt={`${school?.schoolName} Profile`}
//           />
//           <img
//             // src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school?.profileImage}`}
//             src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
//             className="logo-lg"
//             alt={`${school?.schoolName} Profile`}
//           />
//         </Link>
//         <Link to="" className="logo-light">
//           <img
//             // src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school?.profileImage}`}
//             src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
//             className="logo-sm"
//             alt={`${school?.schoolName} Profile`}
//           />
//           <span>
//             <img
//               // src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school?.profileImage}`}
//               src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
//               className="logo-lg"
//               alt={`${school?.schoolName} Profile`}
//               style={{ height: "80px", width: "160px" }}
//             />
//           </span>
//         </Link>
//       </div>

//       <button
//         type="button"
//         className="button-sm-hover"
//         aria-label="Show Full Sidebar"
//       >
//         <iconify-icon
//           icon="solar:double-alt-arrow-right-bold-duotone"
//           className="button-sm-hover-icon"
//         />
//       </button>

//       <div className="scrollbar" data-simplebar="">
//         <ul className="navbar-nav" id="navbar-nav">
//           {menuItems.map((item) => {
//             const isActive = item.children
//               ? item.children.some((child) => currentRoute === child.link)
//               : currentRoute === item.link;

//             return (
//               <li
//                 className={`nav-item ${isActive ? "active" : ""}`}
//                 key={item.id}
//               >
//                 {item.children ? (
//                   <>
//                     <div
//                       className={`nav-link collapsed ${
//                         isActive ? "active" : ""
//                       }`}
//                       onClick={() => toggleMenu(item.id)}
//                     >
//                       <span className="nav-icon">
//                         <Icon icon={item.icon} />
//                       </span>
//                       <span className="nav-text"> {item.label} </span>

//                       <IoIosArrowForward
//                         style={{
//                           transition: "transform 0.3s ease",
//                           transform:
//                             openMenu === item.id
//                               ? "rotate(90deg)"
//                               : "rotate(0deg)",
//                         }}
//                       />
//                     </div>
//                     {openMenu === item.id && (
//                       <div className="collapse show">
//                         <ul className="nav sub-navbar-nav">
//                           {item.children.map((subItem, subIndex) => (
//                             <li className="sub-nav-item" key={subIndex}>
//                               <Link
//                                 className={`sub-nav-link ${
//                                   currentRoute === subItem.link ? "active" : ""
//                                 }`}
//                                 to={subItem.link}
//                               >
//                                 {subItem.label}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <Link
//                     className={`nav-link ${isActive ? "active" : ""}`}
//                     to={item.link}
//                   >
//                     <span className="nav-icon">
//                       <Icon icon={item.icon} />
//                     </span>
//                     <span className="nav-text"> {item.label} </span>
//                   </Link>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
