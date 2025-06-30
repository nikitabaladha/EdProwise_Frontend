// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Icon } from "@iconify/react";
// import { IoIosArrowForward } from "react-icons/io";
// import getAPI from "../../api/getAPI";

// const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
//   const [openMenus, setOpenMenus] = useState({});
//   const location = useLocation();

//   const toggleMenu = (menuId, parentId = null) => {
//     setOpenMenus((prev) => {
//       const newOpenMenus = { ...prev };

//       if (parentId) {
//         Object.keys(newOpenMenus).forEach((key) => {
//           if (key !== parentId) {
//             delete newOpenMenus[key];
//           }
//         });
//       } else {
//         Object.keys(newOpenMenus).forEach((key) => {
//           delete newOpenMenus[key];
//         });
//       }

//       if (newOpenMenus[menuId]) {
//         delete newOpenMenus[menuId];
//       } else {
//         newOpenMenus[menuId] = true;
//       }

//       return newOpenMenus;
//     });
//   };
//   const sidebarRef = useRef(null);

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

//   const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//   const userRole = userDetails?.role || "Guest";
//   const email = userDetails.email;

//   const currentRoute = location.pathname;

//   const menuConfig = {
//     Admin: [
//       {
//         id: "dashboard",
//         label: "Dashboard",
//         icon: "solar:widget-5-bold-duotone",
//         link: "/admin-dashboard",
//       },
//       ...(email === "edprowise@gmail.com"
//         ? [
//             {
//               id: "admin",
//               label: "Admins",
//               icon: "solar:users-group-rounded-bold-duotone",
//               link: "/admin-dashboard/admins",
//             },
//           ]
//         : []),
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
//             label: "Dashboard",
//             link: "/admin-dashboard/procurement-services/dashboard",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
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
//             link: "/admin-dashboard/procurement-services/good-services",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//           {
//             label: "Bank Details",
//             link: "/admin-dashboard/procurement-services/bank-details",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//         ],
//       },
//       {
//         id: "payrollModule",
//         label: "Payroll Module",
//         icon: "solar:wallet-money-bold",
//         children: [
//           {
//             id: "employeeSelfService",
//             label: "Employee Self Service",
//             icon: "solar:book-bookmark-bold-duotone",
//             children: [
//               {
//                 label: "Update Details",
//                 link: "/admin-dashboard/payroll-module/employee-services/update-details",
//               },
//               {
//                 label: "Salary Slip",
//                 link: "/admin-dashboard/payroll-module/employee-services/salary-slip",
//               },
//               {
//                 label: "Income Tax",
//                 // link: "/admin-dashboard/payroll-module/employer/salary-increment",
//               },
//               {
//                 label: "IT Declaration",
//                 link: "/admin-dashboard/payroll-module/employee-services/income-tax/it-declaration",
//               },
//               {
//                 label: "Income Tax Computation Sheet",
//                 link: "/admin-dashboard/payroll-module/employee-services/income-tax/income-tax-computation-sheet",
//               },
//               {
//                 label: "Form 16",
//                 link: "/admin-dashboard/payroll-module/employee-services/income-tax/form16",
//               },
//               {
//                 label: "Previous Employment Income",
//                 link: "/admin-dashboard/payroll-module/employee-services/income-tax/previous-employment-income",
//               },
//               {
//                 label: "My Loan Statement",
//                 link: "/admin-dashboard/payroll-module/employee-services/loan-summary",
//               },
//               {
//                 label: "My Attendance Report",
//                 link: "/admin-dashboard/payroll-module/employee-services/my-attendance-report",
//               },
//               {
//                 label: "Apply for Leave",
//                 link: "/admin-dashboard/payroll-module/employee-services/apply-for-leave",
//               },
//             ],
//           },
//           {
//             id: "employer",
//             label: "Employer",
//             icon: "solar:book-bookmark-bold-duotone",
//             children: [
//               {
//                 label: "Employee Registration",
//                 link: "/admin-dashboard/payroll-module/employer/registration",
//               },
//               {
//                 // LWD Details
//                 label: "Employee Update",
//                 link: "/admin-dashboard/payroll-module/employer/update-employee-details",
//               },
//               {
//                 label: "CTC Update",
//                 link: "/admin-dashboard/payroll-module/employer/CTC-update",
//               },
//               {
//                 label: "Process Payroll",
//                 link: "/admin-dashboard/payroll-module/employer/payroll-process",
//               },
//               {
//                 label: "Salary Increment",
//                 // link: "/admin-dashboard/payroll-module/employer/salary-increment",
//               },
//               {
//                 label: "Bulk Employee Increment",
//                 link: "/admin-dashboard/payroll-module/employer/salary-increment/bulk-employee-increment",
//               },
//               {
//                 label: "Single Employee Increment",
//                 link: "/admin-dashboard/payroll-module/employer/salary-increment/single-employee-increment",
//               },
//               {
//                 label: "Generate Appointment/CTC Letter",
//                 link: "/admin-dashboard/payroll-module/employer/generate-appointment-ctc-letter",
//               },
//               {
//                 label: "Form 16 (Upload)",
//                 link: "/admin-dashboard/payroll-module/employer/form-16-list",
//               },
//               {
//                 label: "Check Supporting Submitted for Tax",
//                 link: "/admin-dashboard/payroll-module/employer/check-supporting-submitted-for-Tax",
//               },
//               {
//                 label: "Loan to Employees",
//                 // link: "/admin-dashboard/payroll-module/admin-setting/form-16-list",
//               },
//               {
//                 label: "Pay Loan",
//                 link: "/admin-dashboard/payroll-module/employer/loan-to-employees/pay-loan",
//               },
//               {
//                 label: "Loan Statement",
//                 link: "/admin-dashboard/payroll-module/employer/loan-to-employees/loan-statement",
//               },
//               {
//                 label: "Overtime Allowance",
//                 link: "/admin-dashboard/payroll-module/employer/overtime-allowance",
//               },
//               {
//                 label: "Performance Tracking",
//                 link: "/admin-dashboard/payroll-module/employer/performance-tracking",
//               },
//             ],
//           },
//           {
//             id: "adminSetting",
//             label: "Admin Setting",
//             icon: "solar:book-bookmark-bold-duotone",
//             children: [
//               {
//                 label: "Freeze IT Declaration",
//                 // link: "/admin-dashboard/payroll-module/employee-services/update-details",
//               },
//               {
//                 label: "Annual Leave Update",
//                 link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
//               },
//               {
//                 label: "Overtime Allowance Rate",
//                 link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
//               },
//               {
//                 label: "CTC Components",
//                 link: "/admin-dashboard/payroll-module/admin-setting/define-ctc-components-list",
//               },
//               {
//                 label: "Grade",

//               },
//               {
//                 label: "Job Designation",
//                 // link: ""
//               },
//               {
//                 label: "School Details",
//                 // link: ""
//               }
//             ],
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
//       {
//         id: "emailSettings",
//         label: "Email Settings",
//         icon: "solar:wallet-money-bold",
//         children: [
//           {
//             label: "SMTP Settings",
//             link: "/admin-dashboard/email/smtp-setting",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//           {
//             label: "Marketing",
//             link: "/admin-dashboard/email/marketing",
//             icon: "solar:book-bookmark-bold-duotone",
//           },
//         ],
//       },
//     ],

//     School: [

//       {
//         id: "procurementServices",
//         label: "Procurement Services",
//         icon: "solar:wallet-money-bold",
//         children: [
//           {
//             label: "Dashboard",
//             link: "/school-dashboard/procurement-services/dashboard",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
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
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Admission Form",
//                 link: "/school-dashboard/fees-module/form/admission-list",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "TC Form",
//                 link: "/school-dashboard/fees-module/form/trasfer-certificate-list",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Concession Form",
//                 link: "/school-dashboard/fees-module/form/concession-table",
//                 icon: "solar:users-group-rounded-bold-duotone",
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
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Board Registration Fees",
//                 link: "/school-dashboard/fees-module/fees-receipts/board-registration-fees",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Board Exam fees",
//                 link: "/school-dashboard/fees-module/fees-receipts/board-exam-fees",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//             ],
//           },
//           {
//             id: "adminSetting",
//             label: "Admin Setting",
//             icon: "solar:users-group-rounded-bold-duotone",
//             children: [
//               {
//                 label: "Registartion Prefix",
//                 link: "/school-dashboard/fees-module/admin-setting/prefix-setting/registartion-prefix",
//                 icon: "solar:settings-bold-duotone",
//               },
//               {
//                 label: "Admission Prefix",
//                 link: "/school-dashboard/fees-module/admin-setting/prefix-setting/admission-prefix",
//                 icon: "solar:settings-bold-duotone",
//               },
//               {
//                 label: "Fine",
//                 link: "/school-dashboard/fees-module/admin-setting/fine",
//                 icon: "solar:document-bold-duotone",
//               },
//               {
//                 label: "Shift",
//                 link: "/school-dashboard/fees-module/admin-setting/shifts",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Class & Section",
//                 link: "/school-dashboard/fees-module/admin-setting/class-section",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Fees Types",
//                 link: "/school-dashboard/fees-module/admin-setting/fees-type-list",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Fees Structure",
//                 link: "/school-dashboard/fees-module/admin-setting/fees-structure",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//             ],
//           },
//         ],
//       },

//     ],
//     Seller: [

//       {
//         id: "procurementServices",
//         label: "Procurement Services",
//         icon: "solar:wallet-money-bold",
//         children: [
//           {
//             label: "Dashboard",
//             link: "/seller-dashboard/procurement-services/dashboard",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },
//           {
//             label: "Quote Enquiry",
//             link: "/seller-dashboard/procurement-services/track-quote",
//             icon: "solar:users-group-rounded-bold-duotone",
//           },

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
//         ],
//       },
//     ],
//     Guest: [
//       { id: "login", label: "Login", icon: "solar:login-bold", link: "/login" },
//     ],
//   };

//   const menuItems = menuConfig[userRole] || menuConfig["Guest"];


//   const isCurrentRoute = (route) =>
//     currentRoute === route || currentRoute.startsWith(route + "/");

//   const renderMenuItem = (item, parentId = null) => {

//     let findChilderRoute = null;

//     item?.children?.forEach((child) => {
//       if (isCurrentRoute(child.link)) findChilderRoute = child;
//       if (!findChilderRoute) {
//         item?.children?.forEach((subChild) => {
//           subChild.children?.forEach((childOfChild) => {
//             if (isCurrentRoute(childOfChild.link)) {
//               findChilderRoute = childOfChild;
//               if (!findChilderRoute.id) findChilderRoute.id = subChild.id;
//               if (!findChilderRoute.parentId)
//                 findChilderRoute.parentId = item.id;
//             }
//           });
//         });
//       }
//     });

//     const checkItemIsCurrentRoute = isCurrentRoute(item.link);
//     const isActive = findChilderRoute || checkItemIsCurrentRoute;

//     if (!Object.keys(openMenus).length && isActive) {
//       toggleMenu(
//         findChilderRoute?.id || item?.id,
//         findChilderRoute?.parentId || parentId
//       );
//     }

//     return (
//       <li className={`nav-item ${isActive ? "active" : ""}`} key={item.id}>
//         {item.children ? (
//           <>
//             <div
//               className={`nav-link collapsed ${isActive ? "active" : ""}`}
//               onClick={() => toggleMenu(item.id, parentId)}
//             >
//               <span className="nav-icon">
//                 <Icon icon={item.icon} />
//               </span>
//               <span className="nav-text"> {item.label} </span>
//               <IoIosArrowForward
//                 style={{
//                   transition: "transform 0.3s ease",
//                   transform: openMenus[item.id]
//                     ? "rotate(90deg)"
//                     : "rotate(0deg)",
//                 }}
//               />
//             </div>
//             {openMenus[item.id] && (
//               <div
//                 className="collapse show"
//                 style={{ paddingLeft: parentId ? 30 : 20 }}
//               >
//                 <ul
//                   className="nav sub-navbar-nav"
//                   style={{
//                     listStyleType: "none",
//                     paddingLeft: 0,
//                     marginTop: 5,
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "4px",
//                   }}
//                 >
//                   {item.children.map((subItem) =>
//                     renderMenuItem(subItem, item.id)
//                   )}
//                 </ul>
//               </div>
//             )}
//           </>
//         ) : (
//           <Link
//             className={`nav-link ${isActive ? "active" : ""}`}
//             to={item.link}
//           >
//             <span className="nav-icon">
//               <Icon icon={item.icon} />
//             </span>
//             <span className="nav-text"> {item.label} </span>
//           </Link>
//         )}
//       </li>
//     );
//   };

//   return (
//     <div
//       ref={sidebarRef}
//       className={`main-nav ${sidebarVisible ? "sidebar-enable" : ""}`}
//     >

//       <div className="logo-box">
//         <Link to="/" className="logo-dark">
//           <img
//             src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
//             className="logo-sm"
//           />
//           <img
//             src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
//             className="logo-lg"
//           />
//         </Link>
//         <Link to="/" className="logo-light">
//           <img
//             src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
//             className="logo-sm"
//           />
//           <span>
//             <img
//               src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.webp`}
//               className="logo-lg"
//               style={{ height: "80px !important", width: "160px !important" }}
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
//           {menuItems.map((item) => renderMenuItem(item))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userRole = userDetails?.role || "Guest";
  const email = userDetails?.email;
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    if (userRole === "Admin" || userRole === "Seller") {
      localStorage.removeItem("sidebartab");
    }
  }, [userRole]);

  useEffect(() => {
    const htmlTag = document.documentElement;
    const menuSize = htmlTag.getAttribute("data-menu-size");
    setIsCollapsed(menuSize === "sm-hover");

    const updateMenuState = () => {
      const current = htmlTag.getAttribute("data-menu-size");
      setIsCollapsed(
        current === "sm-hover" && !htmlTag.querySelector(".main-nav:hover")
      );
    };

    const updateMenuSize = () => {
      if (window.innerWidth >= 770) {
        htmlTag.setAttribute("data-menu-size", "sm-hover-active");
      } else {
        htmlTag.setAttribute("data-menu-size", "hidden");
      }
      updateMenuState();
    };

    updateMenuSize();
    window.addEventListener("resize", updateMenuSize);
    const observer = new MutationObserver(updateMenuState);
    observer.observe(htmlTag, { attributes: true });

    const mainNav = document.querySelector(".main-nav");
    const handleHover = () => updateMenuState();
    mainNav?.addEventListener("mouseenter", handleHover);
    mainNav?.addEventListener("mouseleave", handleHover);

    return () => {
      window.removeEventListener("resize", updateMenuSize);
      observer.disconnect();
      mainNav?.removeEventListener("mouseenter", handleHover);
      mainNav?.removeEventListener("mouseleave", handleHover);
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
      {
        id: "userAndSubscriptionTab",
        label: " User & Subscription Tab",
        icon: "solar:wallet-money-bold",
        children: [
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
        ]
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
        id: "payrollModule",
        label: "Payroll Module",
        icon: "solar:wallet-money-bold",
        children: [
          {
            id: "employeeSelfService",
            label: "Employee Self Service",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Update Details",
                link: "/admin-dashboard/payroll-module/employee-services/update-details",
              },
              {
                label: "Salary Slip",
                link: "/admin-dashboard/payroll-module/employee-services/salary-slip",
              },
              {
                id: "incomeTax",
                label: "Income Tax",
                // icon: "bx-cog",
                children: [
                  {
                    label: "IT Declaration",
                    link: "/admin-dashboard/payroll-module/employee-services/income-tax/it-declaration",
                  },
                  {
                    label: "Income Tax Computation Sheet",
                    link: "/admin-dashboard/payroll-module/employee-services/income-tax/income-tax-computation-sheet",
                  },
                  {
                    label: "Form 16",
                    link: "/admin-dashboard/payroll-module/employee-services/income-tax/form16",
                  },
                  {
                    label: "Previous Employment Income",
                    link: "/admin-dashboard/payroll-module/employee-services/income-tax/previous-employment-income",
                  },
                ],
              },
              {
                label: "Request for Loan",
                link: "/admin-dashboard/payroll-module/employee-services/request-for-loan",
              },
              {
                label: "My Loan Statement",
                link: "/admin-dashboard/payroll-module/employee-services/loan-summary",
              },

              {
                label: "My Attendance Report",
                link: "/admin-dashboard/payroll-module/employee-services/my-attendance-report",
              },
              {
                label: "Apply for Leave",
                link: "/admin-dashboard/payroll-module/employee-services/apply-for-leave",
              },
              {
                id: "exit",
                label: "Exit",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Employee Resignation",
                    link: "/admin-dashboard/payroll-module/employee-services/exit/employee-resignation-form",
                  },
                  {
                    label: "Exit Interview",
                    link: "/admin-dashboard/payroll-module/employee-services/exit/exit-interview",
                  },
                  {
                    label: "Relieving Letter",
                    link: "/admin-dashboard/payroll-module/employee-services/exit/relieving-and-experience-letter",
                  },
                ],
              },
              {
                label: "Letter & Documents",
                link: "/admin-dashboard/payroll-module/employee-services/letter-documents",
              },
              {
                label: "Awards & Achievement",
                link: "/admin-dashboard/payroll-module/employee-services/award-achievement",
              },
              {
                label: "Promotion Nomination",
                link: "/admin-dashboard/payroll-module/employee-services/promotion-nomination",
              },
            ],
          },
          {
            id: "employer",
            label: "Employer",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Employee Registration",
                link: "/admin-dashboard/payroll-module/employer/registration",
              },
              {
                // LWD Details
                label: "Employee Update",
                link: "/admin-dashboard/payroll-module/employer/update-employee-details",
              },
              {
                label: "CTC Update",
                link: "/admin-dashboard/payroll-module/employer/ctc-update",
              },
              {
                label: "Process Payroll",
                link: "/admin-dashboard/payroll-module/employer/payroll-process",
              },

              {
                id: "salaryIncrement",
                label: "Salary Increment",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Bulk Employee Increment",
                    link: "/admin-dashboard/payroll-module/employer/salary-increment/bulk-employee-increment",
                    // icon: "bx-hash",
                  },
                  {
                    label: "Single Employee Increment",
                    link: "/admin-dashboard/payroll-module/employer/salary-increment/single-employee-increment",
                    // icon: "bx-hash",
                  },
                ],
              },

              {
                label: "Generate Appointment",
                link: "/admin-dashboard/payroll-module/employer/generate-appointment-ctc-letter",
              },
              {
                label: "Form 16 (Upload)",
                link: "/admin-dashboard/payroll-module/employer/form-16-list",
              },
              {
                label: "Supporting Submitted for Tax",
                link: "/admin-dashboard/payroll-module/employer/supporting-tax-submitted",
              },
              {
                id: "loanToEmployees",
                label: "Loan To Employees",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Pay Loan",
                    link: "/admin-dashboard/payroll-module/employer/loan-to-employees/pay-loan",
                  },
                  {
                    label: "Loan Statement",
                    link: "/admin-dashboard/payroll-module/employer/loan-to-employees/loan-statement",
                  },
                ],
              },

              {
                label: "Overtime Allowance",
                link: "/admin-dashboard/payroll-module/employer/overtime-allowance",
              },
              {
                label: "Performance Tracking",
                link: "/admin-dashboard/payroll-module/employer/performance-tracking",
              },
              {
                label: "Awards and Achievement",
                link: "/admin-dashboard/payroll-module/employer/awards-and-achievement",
              }, {
                id: "resignation",
                label: "Resignation",
                children: [
                  {
                    label: "Resignation Approval",
                    link: "/admin-dashboard/payroll-module/employer/resign/resignation",
                  },
                ],
              },

              {
                label: "Promotion Nomination",
                link: "/admin-dashboard/payroll-module/employer/promotion-nomination",
              },
              // {
              //   label: "Relieving Letter",
              //   link: "/admin-dashboard/payroll-module/employer/relieving-and-experience-letter",
              // },
            ],
          },
          {
            id: "adminSetting",
            label: "Admin Setting",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Freeze IT Declaration",
                link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
              },
              {
                label: "Annual Leave Update",
                link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "Overtime Allowance Rate",
                link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "CTC Components",
                link: "/admin-dashboard/payroll-module/admin-setting/ctc-components",
              },
              {
                label: "Grade",
                link: "/admin-dashboard/payroll-module/admin-setting/define-grade"
              },
              {
                label: "Job Designation",
                link: "/admin-dashboard/payroll-module/admin-setting/define-job-designation"
              },
              {
                label: "Category",
                link: "/admin-dashboard/payroll-module/admin-setting/define-category"
              },
              {
                label: "School Details",
                // link: ""
              },
            ],
          },
          {
            id: "advanceReport",
            label: "Advance Report",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "PF Register",
                // link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
              },
              {
                label: "ESI Register",
                // link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "Gratuity Report",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "Leave Encashment Report",
                // link: "/admin-dashboard/payroll-module/admin-setting/ctc-components",
              },
              {
                label: "Income Tax Computation",
                // link: "/admin-dashboard/payroll-module/admin-setting/define-grade"
              },
            ],
          },
          {
            id: "auditDocumentation",
            label: "Audit Documentation",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Personwise Salary Register",
                // link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
              },
              {
                label: "Salary Reconciliation",
                // link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "PF Reconciliation",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "Income Tax Computation",
                // link: "/admin-dashboard/payroll-module/admin-setting/define-grade"
              },
            ],
          },
          {
            id: "support",
            label: "Support",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "User Manual",
                // link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
              },
              {
                label: "Raise Ticket",
                // link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "FAQ",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
            ],
          },
        ],
      },
      {
        id: "financeModule",
        label: "Finance Module",
        icon: "solar:wallet-money-bold",
        children: [
          {
            id: "accountingEntry",
            label: "Accounting Entry",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Payment",
                link: "/admin-dashboard/finance-module/account-entry/payment-entry",
              },
              {
                label: "Receipts",
                link: "/admin-dashboard/finance-module/account-entry/receipts",
              },
              {
                label: "Contra",
                link: "/admin-dashboard/finance-module/account-entry/contra",
              },
              {
                label: "Journal",
                link: "/admin-dashboard/finance-module/account-entry/journal",
              },
            ],
          },
          {
            id: "display",
            label: "Display",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Ledger Book",
                link: "/admin-dashboard/finance-module/display/ledger-book",
              },
              {

                label: "Payment Ledger",
                link: "/admin-dashboard/finance-module/display/payment-ledger",
              },
              {
                label: "Receipts Ledger",
                link: "/admin-dashboard/finance-module/display/receipts-ledger",
              },
              {
                label: "Contra Ledger",
                link: "/admin-dashboard/finance-module/display/contra-ledger",
              },
              {
                label: "Journal Ledger",
                link: "/admin-dashboard/finance-module/display/journal-ledger",
              },
              {
                label: "Trail Balance",
                link: "/admin-dashboard/finance-module/display/trail-balance",
              },
            ],
          },
          {
            id: "reports",
            label: "Reports",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Cash Book",
                link: "/admin-dashboard/finance-module/reports/cash-book",
              },
              {
                label: "Bank Book",
                link: "/admin-dashboard/finance-module/reports/bank-book",
              },
              {
                label: "Income Ledger",
                link: "/admin-dashboard/finance-module/reports/income-ledger",
              },
              {
                label: "Expenses Ledger",
                link: "/admin-dashboard/finance-module/reports/expenses-ledger",
              },
              {
                label: "Journal Ledger",
                link: "/admin-dashboard/finance-module/reports/journal-ledger"
              },
              {
                label: "TDS Report",
                link: "/admin-dashboard/finance-module/reports/tds-report"
              },
            ],
          },
          {
            id: "misReporting",
            label: "MIS Reporting",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Analysis of P&L",
                link: "/admin-dashboard/finance-module/msi-reports/analysis-of-p-and-l",
              },
              {
                label: "Graph",
                // link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "Ratio Analysis",
                link: "/admin-dashboard/finance-module/msi-reports/ratio-analysis",
              },
              {
                label: "Budgeting",
                // link: "/admin-dashboard/payroll-module/admin-setting/ctc-components",
              },
            ],
          },
          {
            id: "auditAndDocumentation",
            label: "Audit & Documentation",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Verification of Payment Entry",
                link: "/admin-dashboard/finance-module/audit-and-documentation/verification-of-payment-entry",
              },
              {
                label: "Verification of Receipt Entry",
                link: "/admin-dashboard/finance-module/audit-and-documentation/verification-of-receipt-entry",
              },
              {
                label: "Verification of Contra Entry",
                link: "/admin-dashboard/finance-module/audit-and-documentation/verification-of-contra-entry",
              },
              {
                label: "Verification of Journal Entry",
                link: "/admin-dashboard/finance-module/audit-and-documentation/verification-of-journal-entry"
              },
              {
                label: "Entry Disapprove by Auditor",
                link: "/admin-dashboard/finance-module/audit-and-documentation/auditor-remarks"
              },
              {
                label: "Upload Document for Auditor",
                link: "/admin-dashboard/finance-module/audit-and-documentation/upload-document-for-auditor"
              },
            ],
          },
          {
            id: "financialStatement",
            label: "Financial Statement",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Balance Sheet",
                link: "/admin-dashboard/finance-module/financial-statement/balance-sheet",
              },
              {
                label: "Income & Expenditure Account",
                link: "/admin-dashboard/finance-module/financial-statement/income-and-expenditure-account",
              },
              {
                label: "Schedule to Income",
                link: "/admin-dashboard/finance-module/financial-statement/schedule-to-income",
              },
              {
                label: "Schedule to Expenditure",
                link: "/admin-dashboard/finance-module/financial-statement/schedule-to-expenditure",
              },
              {
                label: "Schedule to Liabilities",
                link: "/admin-dashboard/finance-module/financial-statement/schedule-to-liabilities",
              },
              {
                label: "Schedule to Assets",
                link: "/admin-dashboard/finance-module/financial-statement/schedule-to-assets",
              },
              {
                label: "Fixed Assets Schedule",
                link: "/admin-dashboard/finance-module/financial-statement/fixed-assets-schedule",
              },
            ],
          },
          {
            id: "auditPack",
            label: "Audit Pack",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Document for Auditor",
                link: "/admin-dashboard/finance-module/audit-pack/document-for-auditor",
              },
              {
                label: "Fees Wise Reconciliation",
                // link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "HC Wise Fees Reconciliation",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "Person wise Salary",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "Salary Reconciliation",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "PF Reconciliation",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "ESI Reconciliation",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
            ],
          },
          {
            id: "master",
            label: "Setting",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Create/Alter Ledger",
                link: "/admin-dashboard/finance-module/master/create-and-alter-ledger",
              },
              {
                label: "Create Vendor",
                link: "/admin-dashboard/finance-module/master/vendor",
              },
              {
                label: "Ledger Master",
                link: "/admin-dashboard/finance-module/master/ledger-master",
              },
              {
                label: "Depreciation Master ",
                link: "/admin-dashboard/finance-module/master/depreciation-master",
              },
              // {
              //   label: "Vendor Master",
              //   link: "/admin-dashboard/finance-module/master/vendor-master",
              // },
              {
                label: "TDS Rate Chart",
                link: "/admin-dashboard/finance-module/master/tds-rate-chart",
              },
            ],
          },
          {
            id: "control",
            label: "Control",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Backup",
                // link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
              },
              {
                label: "Restore",
                // link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "Security Control (Admin, Auditor & Employee)",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "Export (Option to export in Excel/PDF)",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
            ],
          },
        ],
      },
      {
        id: "demoAndEnquiryTab",
        label: "Demo & Enquiry Tab",
        icon: "solar:wallet-money-bold",
        children: [
          {
            id: "requestDemo",
            label: "Request For Demo",
            icon: "solar:wallet-money-bold",
            link: "/admin-dashboard/request-for-demo",
          },
          {
            id: "enquiry",
            label: "Enquiry",
            icon: "solar:wallet-money-bold",
            link: "/admin-dashboard/enquiry",
          },
        ]
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
            label: "Marketing",
            link: "/admin-dashboard/email/marketing",
            icon: "solar:book-bookmark-bold-duotone",
          },
        ],
      },
      {
        id: "blog",
        label: "Blogs",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Blog Post",
            link: "/admin-dashboard/blog",
            icon: "solar:users-group-rounded-bold-duotone",
          },

          {
            id: "blogSettings",
            label: "Blog Settings",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Category",
                link: "/admin-dashboard/blog/blog-setting/category",
              },
              {
                label: "Tags",
                link: "/admin-dashboard/blog/blog-setting/tags",
              },
              {
                label: "Blogs Status",
                link: "/admin-dashboard/blog/blog-setting/blogs-status",
              },

            ],
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
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Quotes",
            link: "/school-dashboard/procurement-services/track-quote",
            icon: "solar:file-text-bold-duotone",
          },
          {
            label: "Track & Order History",
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
        icon: "solar:file-text-bold",
        children: [
          {
            id: "form",
            label: "Form",
            icon: "bx-receipt",
            children: [
              {
                label: "Registration Form",
                link: "/school-dashboard/fees-module/form/registration",
                icon: "bx-receipt",
              },
              {
                label: "Admission Form",
                link: "/school-dashboard/fees-module/form/admission",
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
            icon: "bx-cog",
            children: [
              {
                label: "Prefix Settings",
                icon: "bx-edit",
                children: [
                  {
                    label: "Registration",
                    link: "/school-dashboard/fees-module/admin-setting/prefix-setting/registartion-prefix",
                    icon: "bx-hash",
                  },
                  {
                    label: "Admission",
                    link: "/school-dashboard/fees-module/admin-setting/prefix-setting/admission-prefix",
                    icon: "bx-hash",
                  },
                ],
              },
              {
                label: "Grade",
                icon: "bx-clipboard",
                children: [
                  {
                    label: "Shift",
                    link: "/school-dashboard/fees-module/admin-setting/grade/shifts",
                    icon: "bx-alarm",
                  },
                  {
                    label: "Class & Section",
                    link: "/school-dashboard/fees-module/admin-setting/grade/class-section",
                    icon: "bx-chalkboard",
                  },
                ],
              },
              {
                label: "Fees Structure",
                icon: "bx-collection",
                children: [
                  {
                    label: "Fees Types",
                    link: "/school-dashboard/fees-module/admin-setting/fees-structure/fees-type-list",
                    icon: "bx-list-ul",
                  },
                  {
                    label: "School Fees",
                    link: "/school-dashboard/fees-module/admin-setting/fees-structure/school-fees",
                    icon: "bx-spreadsheet",
                  },
                  {
                    label: "One Time Fees",
                    link: "/school-dashboard/fees-module/admin-setting/fees-structure/one-time-fees",
                    icon: "bx-money-withdraw",
                  },
                  {
                    label: "Fine",
                    link: "/school-dashboard/fees-module/admin-setting/fees-structure/fine",
                    icon: "bx-money",
                  },
                ],
              },
            ],
          },
        ],
      },
        {
        id: "payrollModule",
        label: "Payroll Module",
        icon: "solar:wallet-money-bold",
        children: [
          {
            id: "employeeSelfService",
            label: "Employee Self Service",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Update Details",
                link: "/school-dashboard/payroll-module/employee-services/update-details",
              },
              {
                label: "Salary Slip",
                // link: "/admin-dashboard/payroll-module/employee-services/salary-slip",
              },
              {
                id: "incomeTax",
                label: "Income Tax",
                // icon: "bx-cog",
                children: [
                  {
                    label: "IT Declaration",
                    // link: "/admin-dashboard/payroll-module/employee-services/income-tax/it-declaration",
                  },
                  {
                    label: "Income Tax Computation Sheet",
                    // link: "/admin-dashboard/payroll-module/employee-services/income-tax/income-tax-computation-sheet",
                  },
                  {
                    label: "Form 16",
                    // link: "/admin-dashboard/payroll-module/employee-services/income-tax/form16",
                  },
                  {
                    label: "Previous Employment Income",
                    // link: "/admin-dashboard/payroll-module/employee-services/income-tax/previous-employment-income",
                  },
                ],
              },
              {
                label: "Request for Loan",
                // link: "/admin-dashboard/payroll-module/employee-services/request-for-loan",
              },
              {
                label: "My Loan Statement",
                // link: "/admin-dashboard/payroll-module/employee-services/loan-summary",
              },

              
              {
                id: "attendance",
                label: "Attendance",
                children: [
                  {
                    label: "Mark Attendance",
                    link: "/school-dashboard/payroll-module/employee-services/attendance/mark-attendance",
                  },
                  {
                    label: "Apply for Leave",
                    link: "/school-dashboard/payroll-module/employee-services/attendance/apply-for-leave",
                  },
                  {
                    label: "My Attendance Report",
                    // link: "/admin-dashboard/payroll-module/employee-services/my-attendance-report",
                  },
                ],
              },

              
              {
                id: "exit",
                label: "Exit",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Employee Resignation",
                    // link: "/admin-dashboard/payroll-module/employee-services/exit/employee-resignation-form",
                  },
                  {
                    label: "Exit Interview",
                    // link: "/admin-dashboard/payroll-module/employee-services/exit/exit-interview",
                  },
                  {
                    label: "Relieving Letter",
                    // link: "/admin-dashboard/payroll-module/employee-services/exit/relieving-and-experience-letter",
                  },
                ],
              },
              {
                label: "Letter & Documents",
                // link: "/admin-dashboard/payroll-module/employee-services/letter-documents",
              },
              {
                label: "Awards & Achievement",
                // link: "/admin-dashboard/payroll-module/employee-services/award-achievement",
              },
              {
                label: "Promotion Nomination",
                // link: "/admin-dashboard/payroll-module/employee-services/promotion-nomination",
              },
            ],
          },
          {
            id: "employer",
            label: "Employer",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Employee Registration",
                link: "/school-dashboard/payroll-module/employer/employee-registration",
              },
              {
                // LWD Details
                label: "Employee Update",
                link: "/school-dashboard/payroll-module/employer/update-employee-details",
              },
              {
                label: "CTC Update",
                link: "/school-dashboard/payroll-module/employer/employee-ctc",
              },
              {
                label: "CTC Master",
                link: "/school-dashboard/payroll-module/employer/ctc-master",
              },
              {
                label: "Process Payroll",
                // link: "/admin-dashboard/payroll-module/employer/payroll-process",
              },

              {
                id: "salaryIncrement",
                label: "Salary Increment",
                children: [
                  {
                    label: "Bulk Employee Increment",
                    link: "/school-dashboard/payroll-module/employer/salary-increment/bulk-employee-increment",
                    
                  },
                  {
                    label: "Single Employee Increment",
                    link: "/school-dashboard/payroll-module/employer/salary-increment/single-employee-increment",
                  },
                ],
              },
              {
                id: "attendance",
                label: "Attendance",
                children: [
                  {
                    label: "Leave Records",
                    link: "/school-dashboard/payroll-module/employer/attendance/leave-records",
                  },
                  {
                    label: "Attendance Report",
                    link: "/school-dashboard/payroll-module/employer/attendance/attendance-report",
                  },
                  
                ],
              },

              {
                label: "Generate Appointment",
                // link: "/admin-dashboard/payroll-module/employer/generate-appointment-ctc-letter",
              },
              {
                label: "Form 16 (Upload)",
                // link: "/admin-dashboard/payroll-module/employer/form-16-list",
              },
              {
                label: "Supporting Submitted for Tax",
                // link: "/admin-dashboard/payroll-module/employer/supporting-tax-submitted",
              },
              {
                id: "loanToEmployees",
                label: "Loan To Employees",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Pay Loan",
                    // link: "/admin-dashboard/payroll-module/employer/loan-to-employees/pay-loan",
                  },
                  {
                    label: "Loan Statement",
                    // link: "/admin-dashboard/payroll-module/employer/loan-to-employees/loan-statement",
                  },
                ],
              },

              {
                label: "Overtime Allowance",
                // link: "/admin-dashboard/payroll-module/employer/overtime-allowance",
              },
              {
                label: "Performance Tracking",
                link: "/admin-dashboard/payroll-module/employer/performance-tracking",
              },
              {
                label: "Awards and Achievement",
                link: "/admin-dashboard/payroll-module/employer/awards-and-achievement",
              },
              {
                id: "resignation",
                label: "Resignation",
                children: [
                  {
                    label: "Resignation Approval",
                    link: "/admin-dashboard/payroll-module/employer/resign/resignation",
                  },
                ],
              },

              {
                label: "Promotion Nomination",
                link: "/admin-dashboard/payroll-module/employer/promotion-nomination",
              },
              // {
              //   label: "Relieving Letter",
              //   link: "/admin-dashboard/payroll-module/employer/relieving-and-experience-letter",
              // },
            ],
          },
          {
            id: "adminSetting",
            label: "Admin Setting",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Freeze IT Declaration",
                // link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
              },
              {
                label: "Annual Leave Update",
                link: "/school-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "Overtime Allowance Rate",
                link: "/school-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "CTC Components",
                link: "/school-dashboard/payroll-module/admin-setting/ctc-components",
              },
              {
                label: "Grade",
                link: "/school-dashboard/payroll-module/admin-setting/define-grade"
              },
              {
                label: "Job Designation",
                link: "/school-dashboard/payroll-module/admin-setting/define-job-designation"
              },
              {
                label: "Category",
                link: "/school-dashboard/payroll-module/admin-setting/define-category"
              },
              {
                label: "Employee Id",
                link: "/school-dashboard/payroll-module/admin-setting/employee-id-setting",
              },
              {
                label: "SMTP Email Setting",
                link: "/school-dashboard/payroll-module/admin-setting/payroll-smtp-setting",
              },
              {
                label: "School Details",
                // link: "payroll-module/admin-setting/payroll-smtp-setting"
              },
            ],
          },
          {
            id: "advanceReport",
            label: "Advance Report",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "PF Register",
                // link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
              },
              {
                label: "ESI Register",
                // link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "Gratuity Report",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "Leave Encashment Report",
                // link: "/admin-dashboard/payroll-module/admin-setting/ctc-components",
              },
              {
                label: "Income Tax Computation",
                // link: "/admin-dashboard/payroll-module/admin-setting/define-grade"
              },
            ],
          },
          {
            id: "auditDocumentation",
            label: "Audit Documentation",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Personwise Salary Register",
                // link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
              },
              {
                label: "Salary Reconciliation",
                // link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "PF Reconciliation",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
              {
                label: "Income Tax Computation",
                // link: "/admin-dashboard/payroll-module/admin-setting/define-grade"
              },
            ],
          },
          {
            id: "support",
            label: "Support",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "User Manual",
                // link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
              },
              {
                label: "Raise Ticket",
                // link: "/admin-dashboard/payroll-module/admin-setting/annual-leave-update",
              },
              {
                label: "FAQ",
                // link: "/admin-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
              },
            ],
          },
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
            // label: "Track Order & Order History",
            label: "Track & Order History",
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

    Employee: [     
        {
        id: "payrollModule",
        label: "Payroll Module",
        icon: "solar:wallet-money-bold",
        children: [
          {
            id: "employeeSelfService",
            label: "Employee Self Service",
            icon: "solar:book-bookmark-bold-duotone",
            children: [
              {
                label: "Update Details",
                link: "/employee-dashboard/payroll-module/employee-services/update-details",
              },
              
              {
                label: "Salary Slip",
                // link: "/admin-dashboard/payroll-module/employee-services/salary-slip",
              },
              {
                id: "incomeTax",
                label: "Income Tax",
                // icon: "bx-cog",
                children: [
                  {
                    label: "IT Declaration",
                    // link: "/admin-dashboard/payroll-module/employee-services/income-tax/it-declaration",
                  },
                  {
                    label: "Income Tax Computation Sheet",
                    // link: "/admin-dashboard/payroll-module/employee-services/income-tax/income-tax-computation-sheet",
                  },
                  {
                    label: "Form 16",
                    // link: "/admin-dashboard/payroll-module/employee-services/income-tax/form16",
                  },
                  {
                    label: "Previous Employment Income",
                    // link: "/admin-dashboard/payroll-module/employee-services/income-tax/previous-employment-income",
                  },
                ],
              },

               {
                id: "attendance",
                label: "Attendance",
                children: [
                  {
                    label: "Mark Attendance",
                    link: "/employee-dashboard/payroll-module/employee-services/attendance/mark-attendance",
                  },
                  {
                    label: "Apply for Leave",
                    link: "/employee-dashboard/payroll-module/employee-services/attendance/apply-for-leave",
                  },
                  {
                    label: "My Attendance Report",
                    link: "/employee-dashboard/payroll-module/employee-services/attendance/my-attendance-report",
                  },
                ],
              },

              {
                label: "Request for Loan",
                // link: "/admin-dashboard/payroll-module/employee-services/request-for-loan",
              },
              {
                label: "My Loan Statement",
                // link: "/admin-dashboard/payroll-module/employee-services/loan-summary",
              },

              {
                label: "My Attendance Report",
                // link: "/admin-dashboard/payroll-module/employee-services/my-attendance-report",
              },
              {
                label: "Apply for Leave",
                // link: "/admin-dashboard/payroll-module/employee-services/apply-for-leave",
              },
              {
                id: "exit",
                label: "Exit",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Employee Resignation",
                    // link: "/admin-dashboard/payroll-module/employee-services/exit/employee-resignation-form",
                  },
                  {
                    label: "Exit Interview",
                    // link: "/admin-dashboard/payroll-module/employee-services/exit/exit-interview",
                  },
                  {
                    label: "Relieving Letter",
                    // link: "/admin-dashboard/payroll-module/employee-services/exit/relieving-and-experience-letter",
                  },
                ],
              },
              {
                label: "Letter & Documents",
                // link: "/admin-dashboard/payroll-module/employee-services/letter-documents",
              },
              {
                label: "Awards & Achievement",
                // link: "/admin-dashboard/payroll-module/employee-services/award-achievement",
              },
              {
                label: "Promotion Nomination",
                // link: "/admin-dashboard/payroll-module/employee-services/promotion-nomination",
              },
            ],
          },
          
        ],
      },
    ],
    Guest: [
      { id: "login", label: "Login", icon: "solar:login-bold", link: "/login" },
    ],
  };

  let currentMenu = menuConfig[userRole] || menuConfig.Guest;

  const sidebarTab = localStorage.getItem("sidebartab");
  if (sidebarTab === "ProcurementService") {
    currentMenu = currentMenu.filter(
      (item) => item.id === "procurementServices"
    );
  } else if (sidebarTab === "FeesModule") {
    currentMenu = currentMenu.filter((item) => item.id === "feesmodule");
  }

  const getActivePaths = () => {
    const activePaths = new Set();

    const checkActive = (items) => {
      items.forEach((item) => {
        if (item.link && currentPath.startsWith(item.link)) {
          activePaths.add(item.link);
        }
        if (item.children) {
          checkActive(item.children);
        }
      });
    };

    checkActive(currentMenu);
    return Array.from(activePaths);
  };

  const findDeepestActivePath = () => {
    const activePaths = getActivePaths();
    if (activePaths.length === 0) return null;

    return activePaths.reduce((longest, current) =>
      current.length > longest.length ? current : longest
    );
  };

  const isPathActive = (link) => {
    const deepestPath = findDeepestActivePath();
    return link === deepestPath;
  };

  const hasActiveChild = (items) => {
    const deepestPath = findDeepestActivePath();
    if (!deepestPath) return false;

    return items.some((item) => {
      if (item.link && deepestPath.startsWith(item.link)) {
        return true;
      }
      if (item.children) {
        return hasActiveChild(item.children);
      }
      return false;
    });
  };

  const renderMenuItems = (items, level = 0) =>
    items.map((item) => {
      // Only apply the sidebarTab filtering for School role
      if (
        userRole === "School" &&
        (sidebarTab === "ProcurementService" || sidebarTab === "FeesModule") &&
        level === 0
      ) {
        if (
          (sidebarTab === "ProcurementService" &&
            item.id === "procurementServices" &&
            item.children) ||
          (sidebarTab === "FeesModule" &&
            item.id === "feesmodule" &&
            item.children)
        ) {
          return (
            <React.Fragment key={item.id || item.label}>
              {renderMenuItems(item.children, level + 1)}
            </React.Fragment>
          );
        }
        return null;
      }

      const isActive = item.link ? isPathActive(item.link) : false;
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = hasChildren && hasActiveChild(item.children);
      const collapseId = `sidebar-${item.id || item.label.replace(/\s+/g, "-")
        }`;

      if (hasChildren) {
        return (
          <li className="nav-item" key={item.id || item.label}>
            <a
              className="nav-link "
              href={`#${collapseId}`}
              data-bs-toggle="collapse"
              role="button"
              aria-expanded={isExpanded}
              aria-controls={collapseId}
              style={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                paddingLeft: isCollapsed ? "0" : level > 0 ? "1rem" : "",
                paddingRight: isCollapsed ? "0" : "",
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
            <div
              className={`collapse ${isExpanded ? "show" : ""}`}
              id={collapseId}
            >
              <ul className={`nav flex-column ${level > 0 ? "ms-3" : ""}`}>
                {renderMenuItems(item.children, level + 1)}
              </ul>
            </div>
          </li>
        );
      } else {
        return (
          <li className="nav-item" key={item.id || item.label}>
            <Link
              className={`nav-link ${isActive ? "active" : ""}`}
              to={item.link}
              style={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                paddingLeft: isCollapsed ? "0" : level > 0 ? "1rem" : "",
                paddingRight: isCollapsed ? "0" : "",
              }}
            >
              <span className="nav-icon">
                <Icon icon={item.icon} />
              </span>
              {!isCollapsed && (
                <>
                  <span className="nav-text">{item.label}</span>
                  <span style={{ width: "16px" }}></span>
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
              style={{ width: "80%" }}
            />
          )}
        </Link>
        <Link to="/" className="logo-light">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseFavicon.png`}
            className="logo-sm"
          />
          {!isCollapsed && (
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
              className="logo-lg"
              style={{ width: "80%" }}
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

      <div className="scrollbar " data-simplebar style={{ margin: "10px" }}>
        <ul className="navbar-nav" id="navbar-nav">
          {renderMenuItems(currentMenu)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;