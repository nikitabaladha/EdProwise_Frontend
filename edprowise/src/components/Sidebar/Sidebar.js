// import React, { useState, useEffect } from "react";
// import { Icon } from "@iconify/react";
// import { Link, useLocation } from "react-router-dom";
// import getAPI from "../../api/getAPI";
// import { usePayrollSettings } from "../DashboardMainForSchool/PayrollModule/AdminSettings/ProvidentFoundSetting/SchoolPayrollSettingsContext";
// const Sidebar = () => {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//   const userRole = userDetails?.role || "Guest";
//   const email = userDetails?.email;
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [academicYear, setAcademicYear] = useState("");
//   // Get both settings and setter from context
//   const { pfEsiSettings, setPfEsiSettings } = usePayrollSettings();

//   useEffect(() => {
//     const fetchPfEsiSetting = async () => {
//       try {
//         const schoolId = userDetails?.schoolId;
//         const academicYear = localStorage.getItem("selectedAcademicYear");
//         setAcademicYear(academicYear);
//         if (userRole === "School" || userRole === "Employee") {
//           const res = await getAPI(
//             `/get-pf-esi-settings/${schoolId}?academicYear=${academicYear}`,
//             {},
//             true
//           );
//           console.log("sidebar res", res);

//           if (!res.hasError) {
//             setPfEsiSettings({
//               pfEnable: res.data.data?.pfEnabled,
//               esiEnable: res.data.data?.esiEnabled,
//             });
//           } else {
//             setPfEsiSettings({
//               pfEnable: false,
//               esiEnable: false,
//             });
//           }
//         }
//       } catch (error) {
//         console.warn("PF/ESI settings fetch failed:", error.message);
//         setPfEsiSettings({
//           pfEnable: false,
//           esiEnable: false,
//         });
//       }
//     };

//     fetchPfEsiSetting();
//   }, [userDetails?.schoolId, userRole, academicYear, setPfEsiSettings]);

//   useEffect(() => {
//     console.log("pfEnable", pfEsiSettings.pfEnable);
//     console.log("esiEnable", pfEsiSettings.esiEnable);
//   }, [pfEsiSettings]);

//   useEffect(() => {
//     if (userRole === "Admin" || userRole === "Seller") {
//       localStorage.removeItem("sidebartab");
//     }
//   }, [userRole]);

//   useEffect(() => {
//     const htmlTag = document.documentElement;
//     const menuSize = htmlTag.getAttribute("data-menu-size");
//     setIsCollapsed(menuSize === "sm-hover");

//     const updateMenuState = () => {
//       const current = htmlTag.getAttribute("data-menu-size");
//       setIsCollapsed(
//         current === "sm-hover" && !htmlTag.querySelector(".main-nav:hover")
//       );
//     };

//     const updateMenuSize = () => {
//       if (window.innerWidth >= 770) {
//         htmlTag.setAttribute("data-menu-size", "sm-hover-active");
//       } else {
//         htmlTag.setAttribute("data-menu-size", "hidden");
//       }
//       updateMenuState();
//     };

//     updateMenuSize();
//     window.addEventListener("resize", updateMenuSize);
//     const observer = new MutationObserver(updateMenuState);
//     observer.observe(htmlTag, { attributes: true });

//     const mainNav = document.querySelector(".main-nav");
//     const handleHover = () => updateMenuState();
//     mainNav?.addEventListener("mouseenter", handleHover);
//     mainNav?.addEventListener("mouseleave", handleHover);

//     return () => {
//       window.removeEventListener("resize", updateMenuSize);
//       observer.disconnect();
//       mainNav?.removeEventListener("mouseenter", handleHover);
//       mainNav?.removeEventListener("mouseleave", handleHover);
//     };
//   }, []);

//   const handleIconClick = () => {
//     const htmlElement = document.documentElement;
//     const current = htmlElement.getAttribute("data-menu-size");

//     if (current === "sm-hover") {
//       htmlElement.setAttribute("data-menu-size", "sm-hover-active");
//     } else if (current === "sm-hover-active") {
//       htmlElement.setAttribute("data-menu-size", "sm-hover");
//     }
//   };

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
//             label: "Track & Order History",
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
//             label: "Email Templates",
//             link: "/admin-dashboard/email/templates",
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
//             icon: "solar:widget-3-bold-duotone",
//           },
//           {
//             label: "Quotes",
//             link: "/school-dashboard/procurement-services/track-quote",
//             icon: "solar:file-text-bold-duotone",
//           },
//           {
//             label: "Track & Order History",
//             link: "/school-dashboard/procurement-services/track-order-history",
//             icon: "solar:delivery-bold-duotone",
//           },
//           {
//             label: "Pay To EdProwise",
//             link: "/school-dashboard/procurement-services/pay-to-edprowise",
//             icon: "solar:card-bold-duotone",
//           },
//         ],
//       },
//       {
//         id: "feesmodule",
//         label: "Fees module",
//         icon: "solar:file-text-bold",
//         children: [
//           {
//             id: "studentprofile",
//             label: "Student Profile",
//             icon: "bx-receipt",
//             link: "/school-dashboard/fees-module/student-profile",
//           },
//           {
//             id: "form",
//             label: "Form",
//             icon: "bx-receipt",
//             children: [
//               {
//                 label: "Registration Form",
//                 link: "/school-dashboard/fees-module/form/registration",
//                 icon: "bx-receipt",
//               },
//               {
//                 label: "Admission Form",
//                 link: "/school-dashboard/fees-module/form/admission",
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
//                 label: "Board Registration ",
//                 link: "/school-dashboard/fees-module/fees-receipts/board-registration-fees",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Board Exam ",
//                 link: "/school-dashboard/fees-module/fees-receipts/board-exam-fees",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Fees Refund",
//                 link: "/school-dashboard/fees-module/fees-receipts/fees-refund",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//             ],
//           },
//           {
//             label: "Reports",
//             icon: "solar:chart-bold-duotone",
//             children: [
//               {
//                 label: "Student Ledger",
//                 link: "/school-dashboard/fees-module/reports/student-ledger",
//                 icon: "solar:document-text-bold-duotone",
//               },

//               {
//                 label: "Daily Collection Report",
//                 icon: "solar:calendar-bold-duotone",
//                 children: [
//                   {
//                     label: "Datewise Collection",
//                     link: "/school-dashboard/fees-module/reports/daily-collection/datewise-collection",
//                     icon: "solar:chart-square-bold-duotone",
//                   },
//                   {
//                     label: "DC With Concession",
//                     link: "/school-dashboard/fees-module/reports/daily-collection/datewise-collection-with-concession",
//                     icon: "solar:chart-bold-duotone",
//                   },
//                   {
//                     label: "Studentwise Collection",
//                     link: "/school-dashboard/fees-module/reports/daily-collection/studentwise-collection",
//                     icon: "solar:user-bold-duotone",
//                   },
//                   {
//                     label: "SC With Concession",
//                     link: "/school-dashboard/fees-module/reports/daily-collection/studentwise-with-collection",
//                     icon: "solar:user-check-bold-duotone",
//                   },
//                 ],
//               },
//               {
//                 label: "General",
//                 icon: "solar:settings-bold-duotone",
//                 children: [
//                   {
//                     label: "School Fees",
//                     link: "/school-dashboard/fees-module/reports/general/school-fee",
//                     icon: "solar:buildings-bold-duotone",
//                   },
//                   {
//                     label: "Registration Fee",
//                     link: "/school-dashboard/fees-module/reports/general/registration-fees",
//                     icon: "solar:card-bold-duotone",
//                   },
//                   {
//                     label: "Admission Fee",
//                     link: "/school-dashboard/fees-module/reports/general/admission-fees",
//                     icon: "solar:ticket-bold-duotone",
//                   },
//                   {
//                     label: "TC Fees Report",
//                     link: "/school-dashboard/fees-module/reports/general/tc-reports",
//                     icon: "solar:document-add-bold-duotone",
//                   },
//                   {
//                     label: "Board Registration Fees",
//                     link: "/school-dashboard/fees-module/reports/general/board-registration",
//                     icon: "solar:clipboard-list-bold-duotone",
//                   },
//                   {
//                     label: "Board Exam Fees",
//                     link: "/school-dashboard/fees-module/reports/general/board-exam",
//                     icon: "solar:notebook-bold-duotone",
//                   },
//                   {
//                     label: "Late Fees & Excess",
//                     link: "/school-dashboard/fees-module/reports/general/late-fees-excess",
//                     icon: "solar:alarm-bold-duotone",
//                   },
//                   {
//                     label: "Fees Refund",
//                     icon: "solar:money-bag-bold-duotone",
//                     link: "/school-dashboard/fees-module/reports/general/fees-refund",
//                   },
//                   {
//                     label: "Fees Cancelled",
//                     icon: "solar:close-circle-bold-duotone",
//                     link: "/school-dashboard/fees-module/reports/general/fees-cancelled",
//                   },
//                   {
//                     label: "Fees Cheque Return",
//                     icon: "solar:card-recive-bold-duotone",
//                     link: "/school-dashboard/fees-module/reports/general/fees-cheque-return",
//                   },
//                   {
//                     label: "Fees Structure",
//                     icon: "solar:structure-bold-duotone",
//                     link: "/school-dashboard/fees-module/reports/general/fees-structure",
//                   },
//                 ],
//               },
//               {
//                 label: "Advanced Report",
//                 icon: "solar:layers-bold-duotone",
//                 children: [
//                   {
//                     label: "Defaulter Fees",
//                     link: "/school-dashboard/fees-module/reports/advanced/defaulter-fees",
//                     icon: "solar:shield-warning-bold-duotone",
//                   },
//                   {
//                     label: "Fees Loss-Left Students",
//                     link: "/school-dashboard/fees-module/reports/advanced/loss-left-students",
//                     icon: "solar:user-cross-bold-duotone",
//                   },
//                   {
//                     label: "Fees Loss-Late Admission ",
//                     link: "/school-dashboard/fees-module/reports/advanced/loss-late-admission",
//                     icon: "solar:clock-square-bold-duotone",
//                   },
//                   {
//                     label: "Arrear Fees Received",
//                     link: "/school-dashboard/fees-module/reports/advanced/arrear-fees",
//                     icon: "solar:money-bag-bold-duotone",
//                   },
//                   {
//                     label: "Advance Fees",
//                     link: "/school-dashboard/fees-module/reports/advanced/advance-fees",
//                     icon: "solar:wallet-money-bold-duotone",
//                   },
//                   {
//                     label: "Opening Advance",
//                     link: "/school-dashboard/fees-module/reports/advanced/opening-advance",
//                     icon: "solar:arrow-up-bold-duotone",
//                   },
//                   {
//                     label: "Closing Advance",
//                     link: "/school-dashboard/fees-module/reports/advanced/closing-advance",
//                     icon: "solar:arrow-down-bold-duotone",
//                   },
//                   {
//                     label: "Student Master",
//                     link: "/school-dashboard/fees-module/reports/advanced/student-master",
//                     icon: "solar:users-group-rounded-bold-duotone",
//                   },
//                 ],
//               },
//               {
//                 label: "Fees Concession Report",
//                 icon: "solar:file-text-bold-duotone",
//                 children: [
//                   {
//                     label: "Fees Concession",
//                     link: "/school-dashboard/fees-module/reports/concession/student-wise",
//                     icon: "solar:chart-square-bold-duotone",
//                   },
//                   {
//                     label: "Fees Con (Date Wise)",
//                     link: "/school-dashboard/fees-module/reports/concession/date-wise",
//                     icon: "solar:calendar-bold-duotone",
//                   },
//                 ],
//               },
//               {
//                 label: "Audit Documentation",
//                 icon: "solar:document-bold-duotone",
//                 children: [
//                   {
//                     label: "Fees Recon (Fees wise)",
//                     link: "/school-dashboard/fees-module/reports/audit/fees-wise",
//                     icon: "solar:bill-list-bold-duotone",
//                   },
//                   {
//                     label: "Fees Recon (Headcount)",
//                     link: "/school-dashboard/fees-module/reports/audit/headcount",
//                     icon: "solar:users-group-rounded-bold-duotone",
//                   },
//                   {
//                     label: "Fees Recon (Student wise)",
//                     link: "/school-dashboard/fees-module/reports/audit/student-wise",
//                     icon: "solar:user-bold-duotone",
//                   },
//                   {
//                     label: "Fees Recon(Fees vs Finan)",
//                     link: "/school-dashboard/fees-module/reports/audit/module-vs-finance",
//                     icon: "solar:scale-bold-duotone",
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             id: "adminSetting",
//             label: "Admin Setting",
//             icon: "bx-cog",
//             children: [
//               {
//                 label: "Prefix Settings",
//                 icon: "bx-edit",
//                 children: [
//                   {
//                     label: "Registration",
//                     link: "/school-dashboard/fees-module/admin-setting/prefix-setting/registartion-prefix",
//                     icon: "bx-hash",
//                   },
//                   {
//                     label: "Admission",
//                     link: "/school-dashboard/fees-module/admin-setting/prefix-setting/admission-prefix",
//                     icon: "bx-hash",
//                   },
//                 ],
//               },
//               {
//                 label: "Grade",
//                 icon: "bx-clipboard",
//                 children: [
//                   {
//                     label: "Shift",
//                     link: "/school-dashboard/fees-module/admin-setting/grade/shifts",
//                     icon: "bx-alarm",
//                   },
//                   {
//                     label: "Class & Section",
//                     link: "/school-dashboard/fees-module/admin-setting/grade/class-section",
//                     icon: "bx-chalkboard",
//                   },
//                 ],
//               },
//               {
//                 label: "Fees Structure",
//                 icon: "bx-collection",
//                 children: [
//                   {
//                     label: "Fees Types",
//                     link: "/school-dashboard/fees-module/admin-setting/fees-structure/fees-type-list",
//                     icon: "bx-list-ul",
//                   },
//                   {
//                     label: "School Fees",
//                     link: "/school-dashboard/fees-module/admin-setting/fees-structure/school-fees",
//                     icon: "bx-spreadsheet",
//                   },
//                   {
//                     label: "One Time Fees",
//                     link: "/school-dashboard/fees-module/admin-setting/fees-structure/one-time-fees",
//                     icon: "bx-money-withdraw",
//                   },
//                   {
//                     label: "Board Fees",
//                     icon: "bx-clipboard",
//                     children: [
//                       {
//                         label: "Registration",
//                         link: "/school-dashboard/fees-module/admin-setting/board-fees/registration-fees",
//                         icon: "bx-alarm",
//                       },
//                       {
//                         label: "Exam",
//                         link: "/school-dashboard/fees-module/admin-setting/board-fees/exam-fees",
//                         icon: "bx-chalkboard",
//                       },
//                     ],
//                   },
//                   {
//                     label: "Fine",
//                     link: "/school-dashboard/fees-module/admin-setting/fees-structure/fine",
//                     icon: "bx-money",
//                   },
//                 ],
//               },
//               {
//                 label: "Promotion",
//                 icon: "bx-trending-up",
//                 link: "/school-dashboard/fees-module/admin-setting/promotion/student-promotion",
//               },
//             ],
//           },
//         ],
//       },

//       {
//         id: "payrollModule",
//         label: "Payroll Module",
//         icon: "solar:file-text-bold",
//         children: [
//           {
//             id: "employer",
//             label: "Employer",
//             icon: "bx-receipt",
//             children: [
//               {
//                 label: "Employee Registration",
//                 link: "/school-dashboard/payroll-module/employer/employee-registration",
//                 icon: "bx-receipt",
//               },

//               {
//                 label: "Employee Update",
//                 link: "/school-dashboard/payroll-module/employer/update-employee-details",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },

//               {
//                 label: "CTC Update",
//                 link: "/school-dashboard/payroll-module/employer/employee-ctc",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "CTC Master",
//                 link: "/school-dashboard/payroll-module/employer/ctc-master",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 id: "payroll",
//                 label: "Payroll",
//                 children: [
//                   {
//                     label: "Salary Payout",
//                     link: "/school-dashboard/payroll-module/employer/process-payroll",
//                   },

//                   ...(pfEsiSettings.pfEnable
//                     ? [
//                         {
//                           label: "PF Register",
//                           link: "/school-dashboard/payroll-module/employer/payroll/pf-register",
//                         },
//                       ]
//                     : []),

//                   ...(pfEsiSettings.esiEnable
//                     ? [
//                         {
//                           label: "ESI Register",
//                           link: "/school-dashboard/payroll-module/employer/payroll/esi-register",
//                         },
//                       ]
//                     : []),
//                 ],
//               },
//               {
//                 id: "salaryIncrement",
//                 label: "Salary Increment",
//                 children: [
//                   {
//                     label: "Bulk Employee Increment",
//                     link: "/school-dashboard/payroll-module/employer/salary-increment/bulk-employee-increment",
//                   },
//                   {
//                     label: "Single Employee Increment",
//                     link: "/school-dashboard/payroll-module/employer/salary-increment/single-employee-increment",
//                   },
//                 ],
//               },
//               {
//                 id: "attendance",
//                 label: "Attendance",
//                 children: [
//                   {
//                     label: "Leave Approval",
//                     link: "/school-dashboard/payroll-module/employer/attendance/leave-approval",
//                   },
//                   {
//                     label: "Attendance Report",
//                     link: "/school-dashboard/payroll-module/employer/attendance/attendance-report",
//                   },
//                   {
//                     label: "Leave Records",
//                     link: "/school-dashboard/payroll-module/employer/attendance/leave-records",
//                   },
//                 ],
//               },
//               {
//                 id: "overtimeAllowance",
//                 label: "Overtime Allowance",
//                 children: [
//                   {
//                     label: "Overtime Allowance Approval",
//                     link: "/school-dashboard/payroll-module/employer/overtime-allowance",
//                   },
//                   {
//                     label: "Overtime Allowance Report",
//                     link: "/school-dashboard/payroll-module/employer/overtime-allowance/overtime-allowance-report",
//                   },
//                 ],
//               },
//               {
//                 id: "incomeTax",
//                 label: "Income Tax",
//                 // icon: "bx-cog",
//                 children: [
//                   {
//                     label: "Supporting Submitted for Tax",
//                     link: "/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted",
//                   },

//                   {
//                     label: "Form 16 (Upload)",
//                     // link: "/admin-dashboard/payroll-module/employee-services/income-tax/form16",
//                   },
//                 ],
//               },
//               {
//                 id: "loanToEmployees",
//                 label: "Loan To Employees",
//                 // icon: "bx-cog",
//                 children: [
//                   {
//                     label: "Pay Loan",
//                     // link: "/admin-dashboard/payroll-module/employer/loan-to-employees/pay-loan",
//                   },
//                   {
//                     label: "Loan Statement",
//                     // link: "/admin-dashboard/payroll-module/employer/loan-to-employees/loan-statement",
//                   },
//                 ],
//               },
//               {
//                 label: "Generate Appointment",
//                 // link: "/admin-dashboard/payroll-module/employer/generate-appointment-ctc-letter",
//               },
//               {
//                 label: "Performance Tracking",
//                 // link: "/admin-dashboard/payroll-module/employer/performance-tracking",
//               },
//               {
//                 label: "Awards and Achievement",
//                 // link: "/admin-dashboard/payroll-module/employer/awards-and-achievement",
//               },
//               {
//                 id: "resignation",
//                 label: "Resignation",
//                 children: [
//                   {
//                     label: "Resignation Approval",
//                     // link: "/admin-dashboard/payroll-module/employer/resign/resignation",
//                   },
//                 ],
//               },

//               {
//                 label: "Promotion Nomination",
//                 // link: "/admin-dashboard/payroll-module/employer/promotion-nomination",
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
//                 // link: "/admin-dashboard/payroll-module/admin-setting/freeze-it-declaration",
//               },
//               {
//                 id: "leaveSettings",
//                 label: "Leave Setting",
//                 // icon: "bx-cog",
//                 children: [
//                   {
//                     label: "Annual Leave Update",
//                     link: "/school-dashboard/payroll-module/admin-setting/leave-setting/annual-leave-update",
//                   },
//                   {
//                     label: "Carry Forword Setting",
//                     link: "/school-dashboard/payroll-module/admin-setting/leave-setting/carry-forword-setting",
//                   },
//                 ],
//               },

//               {
//                 label: "Overtime Allowance Rate",
//                 link: "/school-dashboard/payroll-module/admin-setting/overtime-allowance-rate",
//               },
//               {
//                 label: "CTC Components",
//                 link: "/school-dashboard/payroll-module/admin-setting/ctc-components",
//               },
//               {
//                 label: "Grade",
//                 link: "/school-dashboard/payroll-module/admin-setting/define-grade",
//               },
//               {
//                 label: "Job Designation",
//                 link: "/school-dashboard/payroll-module/admin-setting/define-job-designation",
//               },
//               {
//                 label: "Category",
//                 link: "/school-dashboard/payroll-module/admin-setting/define-category",
//               },
//               {
//                 label: "Employee Id",
//                 link: "/school-dashboard/payroll-module/admin-setting/employee-id-setting",
//               },
//               {
//                 label: "Holiday Calendar",
//                 link: "/school-dashboard/payroll-module/admin-setting/school-holiday-calendar",
//               },
//               {
//                 label: "SMTP Email Setting",
//                 link: "/school-dashboard/payroll-module/admin-setting/payroll-smtp-setting",
//               },
//               {
//                 label: "Academic Year",
//                 link: "/school-dashboard/payroll-module/admin-setting/academic-year-setting",
//               },
//               {
//                 label: "PF & ESI Setting",
//                 link: "/school-dashboard/payroll-module/admin-setting/provident-fund-setting",
//               },
//               {
//                 label: "School Details",
//                 // link: "payroll-module/admin-setting/payroll-smtp-setting"
//               },
//             ],
//           },
//         ],
//       },

//       {
//         id: "operationalService",
//         label: "Operational Services",
//         icon: "solar:wallet-money-bold",
//         children: [
//           {
//             id: "sms",
//             label: "SMS",
//             icon: "bx-receipt",
//             children: [
//               {
//                 label: "Greeting SMS",
//                 link: "/school-dashboard/operational-service/send-sms/greeting-sms",
//                 icon: "bx-receipt",
//               },
//               {
//                 label: "Attendance SMS",
//                 link: "/school-dashboard/operational-service/send-sms/attendance-sms",
//                 icon: "solar:users-group-rounded-bold-duotone",
//               },
//               {
//                 label: "Send Custom SMS",
//                 link: "/school-dashboard/payroll-module/employer/employee-ctc",
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
//             // label: "Track Order & Order History",
//             label: "Track & Order History",
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

//     Employee: [
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
//                 link: "/employee-dashboard/payroll-module/employee/update-details",
//               },
//               ...(pfEsiSettings.pfEnable
//                 ? [
//                     {
//                       label: "Provident Fund",
//                       link: "/employee-dashboard/payroll-module/employee/provident-fund",
//                     },
//                   ]
//                 : []),
//               // {
//               //   label: "Provident Fund",
//               //   link: "/employee-dashboard/payroll-module/employee-services/provident-fund",
//               // },
//               {
//                 label: "Salary Slip",
//                 // link: "/admin-dashboard/payroll-module/employee-services/salary-slip",
//               },
//               {
//                 id: "incomeTax",
//                 label: "Income Tax",
//                 // icon: "bx-cog",
//                 children: [
//                   {
//                     label: "IT Declaration",
//                     link: "/employee-dashboard/payroll-module/employee/income-tax/it-declaration",
//                   },
//                   {
//                     label: "Income Tax Computation Sheet",
//                     link: "/employee-dashboard/payroll-module/employee/income-tax/income-tax-computation-sheet",
//                   },
//                   {
//                     label: "Form 16",
//                     // link: "/admin-dashboard/payroll-module/employee-services/income-tax/form16",
//                   },
//                   {
//                     label: "Previous Employment Income",
//                     link: "/employee-dashboard/payroll-module/employee/income-tax/previous-employment-income",
//                   },
//                 ],
//               },

//               {
//                 id: "attendance",
//                 label: "Attendance",
//                 children: [
//                   {
//                     label: "Mark Attendance",
//                     link: "/employee-dashboard/payroll-module/employee/attendance/mark-attendance",
//                   },
//                   {
//                     label: "Apply for Leave",
//                     link: "/employee-dashboard/payroll-module/employee/attendance/apply-for-leave",
//                   },
//                   {
//                     label: "My Attendance Report",
//                     link: "/employee-dashboard/payroll-module/employee/attendance/my-attendance-report",
//                   },
//                 ],
//               },

//               {
//                 label: "Overtime Allowance",
//                 link: "/employee-dashboard/payroll-module/employee/overtime-allowance",
//               },

//               {
//                 label: "Request for Loan",
//                 // link: "/admin-dashboard/payroll-module/employee-services/request-for-loan",
//               },
//               {
//                 label: "My Loan Statement",
//                 // link: "/admin-dashboard/payroll-module/employee-services/loan-summary",
//               },

//               {
//                 label: "My Attendance Report",
//                 // link: "/admin-dashboard/payroll-module/employee-services/my-attendance-report",
//               },
//               {
//                 label: "Apply for Leave",
//                 // link: "/admin-dashboard/payroll-module/employee-services/apply-for-leave",
//               },
//               {
//                 id: "exit",
//                 label: "Exit",
//                 // icon: "bx-cog",
//                 children: [
//                   {
//                     label: "Employee Resignation",
//                     // link: "/admin-dashboard/payroll-module/employee-services/exit/employee-resignation-form",
//                   },
//                   {
//                     label: "Exit Interview",
//                     // link: "/admin-dashboard/payroll-module/employee-services/exit/exit-interview",
//                   },
//                   {
//                     label: "Relieving Letter",
//                     // link: "/admin-dashboard/payroll-module/employee-services/exit/relieving-and-experience-letter",
//                   },
//                 ],
//               },
//               {
//                 label: "Letter & Documents",
//                 // link: "/admin-dashboard/payroll-module/employee-services/letter-documents",
//               },
//               {
//                 label: "Awards & Achievement",
//                 // link: "/admin-dashboard/payroll-module/employee-services/award-achievement",
//               },
//               {
//                 label: "Promotion Nomination",
//                 // link: "/admin-dashboard/payroll-module/employee-services/promotion-nomination",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     Guest: [
//       { id: "login", label: "Login", icon: "solar:login-bold", link: "/login" },
//     ],
//   };

//   let currentMenu = menuConfig[userRole] || menuConfig.Guest;
//   console.log("current Menu",currentMenu);
  
//   const sidebarTab = localStorage.getItem("sidebartab");
//   console.log("sidebarTab", sidebarTab);
  
//   if (sidebarTab === "ProcurementService") {
//     currentMenu = currentMenu.filter(
//       (item) => item.id === "procurementServices"
//     );
//   } else if (sidebarTab === "FeesModule") {
//     currentMenu = currentMenu.filter((item) => item.id === "feesmodule");
//   } else if (sidebarTab === "payrollModule") {
//     currentMenu = currentMenu.filter((item) => item.id === "payrollModule");
//   } else if (sidebarTab === "OperationalService") {
//     console.log("sidebarTab === OperationalService");
    
//     currentMenu = currentMenu.filter(
//       (item) => item.id === "operationalService",
      
      
//     );
//   }

//   const getActivePaths = () => {
//     const activePaths = new Set();

//     const checkActive = (items) => {
//       items.forEach((item) => {
//         if (item.link && currentPath.startsWith(item.link)) {
//           activePaths.add(item.link);
//         }
//         if (item.children) {
//           checkActive(item.children);
//         }
//       });
//     };

//     checkActive(currentMenu);
//     return Array.from(activePaths);
//   };

//   const findDeepestActivePath = () => {
//     const activePaths = getActivePaths();
//     if (activePaths.length === 0) return null;

//     return activePaths.reduce((longest, current) =>
//       current.length > longest.length ? current : longest
//     );
//   };

//   const isPathActive = (link) => {
//     const deepestPath = findDeepestActivePath();
//     return link === deepestPath;
//   };

//   const hasActiveChild = (items) => {
//     const deepestPath = findDeepestActivePath();
//     if (!deepestPath) return false;

//     return items.some((item) => {
//       if (item.link && deepestPath.startsWith(item.link)) {
//         return true;
//       }
//       if (item.children) {
//         return hasActiveChild(item.children);
//       }
//       return false;
//     });
//   };

//   const renderMenuItems = (items, level = 0) =>
//     items.map((item) => {
//       // Only apply the sidebarTab filtering for School role
//       if (
//         (userRole === "School" &&
//           (sidebarTab === "ProcurementService" ||
//             sidebarTab === "FeesModule" ||
//             sidebarTab === "payrollModule" ||
//             sidebarTab === "OperationalService")) ||
//         level === 0
//       ) {
//         if (
//           (sidebarTab === "ProcurementService" &&
//             item.id === "procurementServices" &&
//             item.children) ||
//           (sidebarTab === "FeesModule" &&
//             item.id === "feesmodule" &&
//             item.children) ||
//           (sidebarTab === "payrollModule" &&
//             item.id === "payrollModule" &&
//             item.children) ||
//           (sidebarTab === "OperationalService" &&
//             item.id === "operationalService" &&
//             item.children)
//         ) {
//           return (
//             <React.Fragment key={item.id || item.label}>
//               {renderMenuItems(item.children, level + 1)}
//             </React.Fragment>
//           );
//         }
//         return null;
//       }

//       const isActive = item.link ? isPathActive(item.link) : false;
//       const hasChildren = item.children && item.children.length > 0;
//       const isExpanded = hasChildren && hasActiveChild(item.children);
//       const collapseId = `sidebar-${
//         item.id || item.label.replace(/\s+/g, "-")
//       }`;

//       if (hasChildren) {
//         return (
//           <li className="nav-item" key={item.id || item.label}>
//             <a
//               className="nav-link "
//               href={`#${collapseId}`}
//               data-bs-toggle="collapse"
//               role="button"
//               aria-expanded={isExpanded}
//               aria-controls={collapseId}
//               style={{
//                 justifyContent: isCollapsed ? "center" : "flex-start",
//                 paddingLeft: isCollapsed ? "0" : level > 0 ? "1rem" : "",
//                 paddingRight: isCollapsed ? "0" : "",
//               }}
//             >
//               <span className="nav-icon">
//                 <Icon icon={item.icon} />
//               </span>
//               {!isCollapsed && (
//                 <>
//                   <span className="nav-text">{item.label}</span>
//                   <span className="nav-arrow ms-auto">
//                     <Icon
//                       icon={isExpanded ? "bi:chevron-down" : "bi:chevron-right"}
//                       width="12"
//                     />
//                   </span>
//                 </>
//               )}
//             </a>
//             <div
//               className={`collapse ${isExpanded ? "show" : ""}`}
//               id={collapseId}
//             >
//               <ul className={`nav flex-column ${level > 0 ? "ms-3" : ""}`}>
//                 {renderMenuItems(item.children, level + 1)}
//               </ul>
//             </div>
//           </li>
//         );
//       } else {
//         return (
//           <li className="nav-item" key={item.id || item.label}>
//             <Link
//               className={`nav-link ${isActive ? "active" : ""}`}
//               to={item.link}
//               style={{
//                 justifyContent: isCollapsed ? "center" : "flex-start",
//                 paddingLeft: isCollapsed ? "0" : level > 0 ? "1rem" : "",
//                 paddingRight: isCollapsed ? "0" : "",
//               }}
//             >
//               <span className="nav-icon">
//                 <Icon icon={item.icon} />
//               </span>
//               {!isCollapsed && (
//                 <>
//                   <span className="nav-text">{item.label}</span>
//                   <span style={{ width: "16px" }}></span>
//                 </>
//               )}
//             </Link>
//           </li>
//         );
//       }
//     });

//   return (
//     <div className="main-nav nav-radius">
//       <div className="logo-box">
//         <Link to="/" className="logo-dark">
//           <img
//             src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseFavicon.png`}
//             className="logo-sm"
//           />
//           {!isCollapsed && (
//             <img
//               src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
//               className="logo-lg"
//               style={{ width: "80%" }}
//             />
//           )}
//         </Link>
//         <Link to="/" className="logo-light">
//           <img
//             src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseFavicon.png`}
//             className="logo-sm"
//           />
//           {!isCollapsed && (
//             <img
//               src={`${process.env.PUBLIC_URL}/assets/images/EdProwiseLogoWhite.png`}
//               className="logo-lg"
//               style={{ width: "80%" }}
//             />
//           )}
//         </Link>
//       </div>

//       <button
//         type="button"
//         className="button-sm-hover"
//         aria-label="Show Full Sidebar"
//         onClick={handleIconClick}
//       >
//         <Icon
//           icon="solar:double-alt-arrow-right-bold-duotone"
//           className="button-sm-hover-icon"
//         />
//       </button>

//       <div className="scrollbar " data-simplebar style={{ margin: "10px" }}>
//         <ul className="navbar-nav" id="navbar-nav">
//           {renderMenuItems(currentMenu)}
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
            label: "Track & Order History",
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
         
          {
            label: "Marketing",
            link: "/admin-dashboard/email/marketing",
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
            id: "studentprofile",
            label: "Student Profile",
            icon: "bx-receipt",
            link: "/school-dashboard/fees-module/student-profile",
          },
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
                label: "Board Registration ",
                link: "/school-dashboard/fees-module/fees-receipts/board-registration-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Board Exam ",
                link: "/school-dashboard/fees-module/fees-receipts/board-exam-fees",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Fees Refund",
                link: "/school-dashboard/fees-module/fees-receipts/fees-refund",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
          {
            label: "Reports",
            icon: "solar:chart-bold-duotone",
            children: [
              {
                label: "Student Ledger",
                link: "/school-dashboard/fees-module/reports/student-ledger",
                icon: "solar:document-text-bold-duotone",
              },

              {
                label: "Daily Collection Report",
                icon: "solar:calendar-bold-duotone",
                children: [
                  {
                    label: "Datewise Collection",
                    link: "/school-dashboard/fees-module/reports/daily-collection/datewise-collection",
                    icon: "solar:chart-square-bold-duotone",
                  },
                  {
                    label: "DC With Concession",
                    link: "/school-dashboard/fees-module/reports/daily-collection/datewise-collection-with-concession",
                    icon: "solar:chart-bold-duotone",
                  },
                  {
                    label: "Studentwise Collection",
                    link: "/school-dashboard/fees-module/reports/daily-collection/studentwise-collection",
                    icon: "solar:user-bold-duotone",
                  },
                  {
                    label: "SC With Concession",
                    link: "/school-dashboard/fees-module/reports/daily-collection/studentwise-with-collection",
                    icon: "solar:user-check-bold-duotone",
                  },
                ],
              },
              {
                label: "General",
                icon: "solar:settings-bold-duotone",
                children: [
                  {
                    label: "School Fees",
                    link: "/school-dashboard/fees-module/reports/general/school-fee",
                    icon: "solar:buildings-bold-duotone",
                  },
                  {
                    label: "Registration Fee",
                    link: "/school-dashboard/fees-module/reports/general/registration-fees",
                    icon: "solar:card-bold-duotone",
                  },
                  {
                    label: "Admission Fee",
                    link: "/school-dashboard/fees-module/reports/general/admission-fees",
                    icon: "solar:ticket-bold-duotone",
                  },
                  {
                    label: "TC Fees Report",
                    link: "/school-dashboard/fees-module/reports/general/tc-reports",
                    icon: "solar:document-add-bold-duotone",
                  },
                  {
                    label: "Board Registration Fees",
                    link: "/school-dashboard/fees-module/reports/general/board-registration",
                    icon: "solar:clipboard-list-bold-duotone",
                  },
                  {
                    label: "Board Exam Fees",
                    link: "/school-dashboard/fees-module/reports/general/board-exam",
                    icon: "solar:notebook-bold-duotone",
                  },
                  {
                    label: "Late Fees & Excess",
                    link: "/school-dashboard/fees-module/reports/general/late-fees-excess",
                    icon: "solar:alarm-bold-duotone",
                  },
                  {
                    label: "Fees Refund",
                    icon: "solar:money-bag-bold-duotone",
                    link: "/school-dashboard/fees-module/reports/general/fees-refund",
                  },
                  {
                    label: "Fees Cancelled",
                    icon: "solar:close-circle-bold-duotone",
                    link: "/school-dashboard/fees-module/reports/general/fees-cancelled",
                  },
                  {
                    label: "Fees Cheque Return",
                    icon: "solar:card-recive-bold-duotone",
                    link: "/school-dashboard/fees-module/reports/general/fees-cheque-return",
                  },
                  {
                    label: "Fees Structure",
                    icon: "solar:structure-bold-duotone",
                    link: "/school-dashboard/fees-module/reports/general/fees-structure",
                  },
                ],
              },
              {
                label: "Advanced Report",
                icon: "solar:layers-bold-duotone",
                children: [
                  {
                    label: "Defaulter Fees",
                    link: "/school-dashboard/fees-module/reports/advanced/defaulter-fees",
                    icon: "solar:shield-warning-bold-duotone",
                  },
                  {
                    label: "Fees Loss-Left Students",
                    link: "/school-dashboard/fees-module/reports/advanced/loss-left-students",
                    icon: "solar:user-cross-bold-duotone",
                  },
                  {
                    label: "Fees Loss-Late Admission ",
                    link: "/school-dashboard/fees-module/reports/advanced/loss-late-admission",
                    icon: "solar:clock-square-bold-duotone",
                  },
                  {
                    label: "Arrear Fees Received",
                    link: "/school-dashboard/fees-module/reports/advanced/arrear-fees",
                    icon: "solar:money-bag-bold-duotone",
                  },
                  {
                    label: "Advance Fees",
                    link: "/school-dashboard/fees-module/reports/advanced/advance-fees",
                    icon: "solar:wallet-money-bold-duotone",
                  },
                  {
                    label: "Opening&Closing Advance",
                    link: "/school-dashboard/fees-module/reports/advanced/opening-closing-advance",
                    icon: "solar:arrow-up-bold-duotone",
                  },

                  {
                    label: "Student Master",
                    link: "/school-dashboard/fees-module/reports/advanced/student-master",
                    icon: "solar:users-group-rounded-bold-duotone",
                  },
                ],
              },
              {
                label: "Fees Concession Report",
                icon: "solar:file-text-bold-duotone",
                children: [
                  {
                    label: "Fees Concession",
                    link: "/school-dashboard/fees-module/reports/concession/student-wise",
                    icon: "solar:chart-square-bold-duotone",
                  },
                  {
                    label: "Fees Con (Date Wise)",
                    link: "/school-dashboard/fees-module/reports/concession/date-wise",
                    icon: "solar:calendar-bold-duotone",
                  },
                ],
              },
              {
                label: "Audit Documentation",
                icon: "solar:document-bold-duotone",
                children: [
                  {
                    label: "Fees Recon (Fees wise)",
                    link: "/school-dashboard/fees-module/reports/audit/fees-wise",
                    icon: "solar:bill-list-bold-duotone",
                  },
                  {
                    label: "Fees Recon (Headcount)",
                    link: "/school-dashboard/fees-module/reports/audit/headcount",
                    icon: "solar:users-group-rounded-bold-duotone",
                  },
                  {
                    label: "Fees Recon (Student wise)",
                    link: "/school-dashboard/fees-module/reports/audit/student-wise",
                    icon: "solar:user-bold-duotone",
                  },
                  {
                    label: "Fees Recon(Fees vs Finan)",
                    link: "/school-dashboard/fees-module/reports/audit/module-vs-finance",
                    icon: "solar:scale-bold-duotone",
                  },
                ],
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
                    label: "Board Fees",
                    icon: "bx-clipboard",
                    children: [
                      {
                        label: "Registration",
                        link: "/school-dashboard/fees-module/admin-setting/board-fees/registration-fees",
                        icon: "bx-alarm",
                      },
                      {
                        label: "Exam",
                        link: "/school-dashboard/fees-module/admin-setting/board-fees/exam-fees",
                        icon: "bx-chalkboard",
                      },
                    ],
                  },
                  {
                    label: "Fine",
                    link: "/school-dashboard/fees-module/admin-setting/fees-structure/fine",
                    icon: "bx-money",
                  },
                ],
              },
              {
                label: "Promotion",
                icon: "bx-trending-up",
                link: "/school-dashboard/fees-module/admin-setting/promotion/student-promotion",
              },
            ],
          },
        ],
      },
      {
        id: "payrollModule",
        label: "Payroll Module",
        icon: "solar:file-text-bold",
        children: [
          {
            id: "employer",
            label: "Employer",
            icon: "bx-receipt",
            children: [
              {
                label: "Employee Registration",
                link: "/school-dashboard/payroll-module/employer/employee-registration",
                icon: "bx-receipt",
              },

              {
                label: "Employee Update",
                link: "/school-dashboard/payroll-module/employer/update-employee-details",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "CTC Update",
                link: "/school-dashboard/payroll-module/employer/employee-ctc",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "CTC Master",
                link: "/school-dashboard/payroll-module/employer/ctc-master",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                id: "payroll",
                label: "Payroll",
                children: [
                  {
                    label: "Salary Payout",
                    link: "/school-dashboard/payroll-module/employer/process-payroll",
                  },

                  // ...(pfEsiSettings.pfEnable
                  //   ? [
                  //       {
                  //         label: "PF Register",
                  //         link: "/school-dashboard/payroll-module/employer/payroll/pf-register",
                  //       },
                  //     ]
                  //   : []),

                  // ...(pfEsiSettings.esiEnable
                  //   ? [
                  //       {
                  //         label: "ESI Register",
                  //         link: "/school-dashboard/payroll-module/employer/payroll/esi-register",
                  //       },
                  //     ]
                  //   : []),
                ],
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
                    label: "Leave Approval",
                    link: "/school-dashboard/payroll-module/employer/attendance/leave-approval",
                  },
                  {
                    label: "Attendance Report",
                    link: "/school-dashboard/payroll-module/employer/attendance/attendance-report",
                  },
                  {
                    label: "Leave Records",
                    link: "/school-dashboard/payroll-module/employer/attendance/leave-records",
                  },
                ],
              },
              {
                id: "overtimeAllowance",
                label: "Overtime Allowance",
                children: [
                  {
                    label: "Overtime Allowance Approval",
                    link: "/school-dashboard/payroll-module/employer/overtime-allowance",
                  },
                  {
                    label: "Overtime Allowance Report",
                    link: "/school-dashboard/payroll-module/employer/overtime-allowance/overtime-allowance-report",
                  },
                ],
              },
              {
                id: "incomeTax",
                label: "Income Tax",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Supporting Submitted for Tax",
                    link: "/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted",
                  },

                  {
                    label: "Form 16 (Upload)",
                    // link: "/admin-dashboard/payroll-module/employee-services/income-tax/form16",
                  },
                ],
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
                label: "Generate Appointment",
                // link: "/admin-dashboard/payroll-module/employer/generate-appointment-ctc-letter",
              },
              {
                label: "Performance Tracking",
                // link: "/admin-dashboard/payroll-module/employer/performance-tracking",
              },
              {
                label: "Awards and Achievement",
                // link: "/admin-dashboard/payroll-module/employer/awards-and-achievement",
              },
              {
                id: "resignation",
                label: "Resignation",
                children: [
                  {
                    label: "Resignation Approval",
                    // link: "/admin-dashboard/payroll-module/employer/resign/resignation",
                  },
                ],
              },

              {
                label: "Promotion Nomination",
                // link: "/admin-dashboard/payroll-module/employer/promotion-nomination",
              },
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
                id: "leaveSettings",
                label: "Leave Setting",
                // icon: "bx-cog",
                children: [
                  {
                    label: "Annual Leave Update",
                    link: "/school-dashboard/payroll-module/admin-setting/leave-setting/annual-leave-update",
                  },
                  {
                    label: "Carry Forword Setting",
                    link: "/school-dashboard/payroll-module/admin-setting/leave-setting/carry-forword-setting",
                  },
                ],
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
                link: "/school-dashboard/payroll-module/admin-setting/define-grade",
              },
              {
                label: "Job Designation",
                link: "/school-dashboard/payroll-module/admin-setting/define-job-designation",
              },
              {
                label: "Category",
                link: "/school-dashboard/payroll-module/admin-setting/define-category",
              },
              {
                label: "Employee Id",
                link: "/school-dashboard/payroll-module/admin-setting/employee-id-setting",
              },
              {
                label: "Holiday Calendar",
                link: "/school-dashboard/payroll-module/admin-setting/school-holiday-calendar",
              },
              {
                label: "SMTP Email Setting",
                link: "/school-dashboard/payroll-module/admin-setting/payroll-smtp-setting",
              },
              {
                label: "Academic Year",
                link: "/school-dashboard/payroll-module/admin-setting/academic-year-setting",
              },
              {
                label: "PF & ESI Setting",
                link: "/school-dashboard/payroll-module/admin-setting/provident-fund-setting",
              },
              {
                label: "School Details",
                // link: "payroll-module/admin-setting/payroll-smtp-setting"
              },
            ],
          },
        ],
      },
      {
        id: "operationalService",
        label: "Operational Services",
        icon: "solar:wallet-money-bold",
        children: [
          {
            id: "sms",
            label: "SMS",
            icon: "bx-receipt",
            children: [
              {
                label: "Greeting SMS",
                link: "/school-dashboard/operational-service/send-sms/greeting-sms",
                icon: "bx-receipt",
              },

              {
                label: "Attendance SMS",
                link: "/school-dashboard/operational-service/sms/attandance-sms",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Send Custom SMS",
                link: "/school-dashboard/operational-service/sms/send-custome-sms",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },

          {
            id: "studentHealthRecords",
            label: "Student Health Records",
            link: "/school-dashboard/operational-service/student-health-record",
            icon: "bx-receipt",
          },
          {
            id: "libraryManagement",
            label: "Library Management",
            icon: "bx-receipt",
            children: [
              {
                label: "Book Record",
                link: "/school-dashboard/operational-service/library-management/book-record",
                icon: "bx-receipt",
              },

              {
                label: "Books Issue & Received",
                link: "/school-dashboard/operational-service/library-management/book-issue-record",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
          {
            id: "entranceManagement",
            label: "Entrance Management",
            icon: "bx-receipt",
            children: [
              {
                label: "Assign Test & Result",
                link: "/school-dashboard/operational-service/entrance-management/test-list",
                icon: "bx-receipt",
              },

              {
                label: "Set MCQ Question",
                link: "/school-dashboard/operational-service/entrance-management/question-set-list",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              // BT class and Section
              // {
              //   label: "Define Subjects",
              //   link: "/school-dashboard/operational-service/entrance-management/subject-define-list",
              //   icon: "solar:users-group-rounded-bold-duotone",
              // },

              // By Class Only 
              {
                 label: "Define Entrance Subjects",
                 link: "/school-dashboard/operational-service/entrance-management/class-subject-define-list",
                 icon: "solar:users-group-rounded-bold-duotone",
               },
            ],
          },

          {
            id: "studentAttendance",
            label: "Student Attendance",
            icon: "bx-receipt",
            children: [
              {
                label: "Digital Student Attendance",
                link: "/school-dashboard/operational-service/student-attendance/digital-student-attendance",
                icon: "bx-receipt",
              },

              {
                label: "Student Present Report",
                link: "/school-dashboard/operational-service/student-attendance/student-present-report",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Student Absence Report",
                link: "/school-dashboard/operational-service/student-attendance/student-absent-report",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Student Late Arrival Report",
                link: "/school-dashboard/operational-service/student-attendance/student-late-arrival-report",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Student Leave Report",
                link: "/school-dashboard/operational-service/student-attendance/student-leave-report",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Define Roll Number",
                link: "/school-dashboard/operational-service/student-attendance/define-roll-numbers",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },

          {
            id: "otherManagement",
            label: "Other Management",
            icon: "bx-receipt",
            children: [
              {
                label: "Time Period",
                link: "/school-dashboard/operational-service/other-management/time-period",
                icon: "bx-receipt",
              },

              {
                label: "School Holidays",
                link: "/school-dashboard/operational-service/other-management/school-holidays",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Exam Time Table",
                link: "/school-dashboard/operational-service/other-management/exam-time-table",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Notice Board",
                link: "/school-dashboard/operational-service/other-management/notice",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Homework for Students",
                link: "/school-dashboard/operational-service/other-management/homework",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Class Group Chat",
                link: "/school-dashboard/operational-service/other-management/class-chat",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Plan Lesson",
                link: "/school-dashboard/operational-service/other-management/lesson-plan",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },

          {
            id: "teacherFeedback",
            label: "Teacher Feedback",
            link: "/school-dashboard/operational-service/teachers-feedback",
            icon: "bx-receipt",
          },

          {
            id: "Messager",
            label: "Messager",
            link: "/school-dashboard/operational-service/message",
            icon: "bx-receipt",
          },

          {
            id: "setting",
            label: "Setting",
            icon: "bx-receipt",
            children: [
              {
                label: "Define Subject",
                link: "/school-dashboard/operational-service/setting/subject-define-list",
                icon: "bx-receipt",
              },
              
            ],
          },

        ],
      },

      {
        id: "VisitorManagements",
        label: "Visitor Managements",
        icon: "solar:wallet-money-bold",
        children: [
          {
            label: "Dashboard",
            link: "/school-dashboard/visitor/dashboard",
            icon: "solar:users-group-rounded-bold-duotone",
          },
          {
            id: "visitorEntry",
            label: "Visitor Entry",
            link: "/school-dashboard/visitor/Visitor-list",
            icon: "bx-receipt",
          },
          {
            id: "studentPickup",
            label: "Student Pickup",
            link: "/school-dashboard/visitor/student-pickup-list",
            icon: "bx-receipt",
          },
          {
            id: "blacklistOffender",
            label: "Blacklist offender",
            link: "/school-dashboard/visitor/blacklist-offender",
            icon: "bx-receipt",
          },
          {
            id: "report",
            label: "Report",
            icon: "bx-receipt",
            children: [
              {
                label: "Visitor Record",
                link: "/school-dashboard/visitor/report/visitor-report",
                icon: "bx-receipt",
              },

              {
                label: "Student Pickup",
                link: "/school-dashboard/visitor/report/student-pickup",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },

          {
            id: "Setting",
            label: "Setting",
            icon: "bx-receipt",
            children: [
              {
                label: "Criminal Record",
                link: "/school-dashboard/visitor/setting/criminal-record",
                icon: "bx-receipt",
              },

              {
                label: "Approver Category",
                link: "/school-dashboard/visitor/setting/approver-category",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Approver List",
                link: "/school-dashboard/visitor/setting/approver-list",
                icon: "solar:users-group-rounded-bold-duotone",
              },
            ],
          },
        ],
      },

      {
        id: "TransportManagement",
        label: "Transport Management",
        icon: "solar:wallet-money-bold",
        children: [
          // {
          //   id: "report",
          //   label: "Report",
          //   icon: "bx-receipt",
          //   children: [
          //     {
          //       label: "Visitor Record",
          //       link: "/school-dashboard/visitor/report/visitor-report",
          //       icon: "bx-receipt",
          //     },

          //     {
          //       label: "Student Pickup",
          //       link: "/school-dashboard/visitor/report/student-pickup",
          //       icon: "solar:users-group-rounded-bold-duotone",
          //     },
          //   ],
          // },

          {
            id: "Setting",
            label: "Setting",
            icon: "bx-receipt",
            children: [
              {
                label: "School Bus Details",
                link: "/school-dashboard/transport/setting/bus-details",
                icon: "bx-receipt",
              },

              {
                label: "Pickup & Drop Location",
                link: "/school-dashboard/transport/setting/location",
                icon: "solar:users-group-rounded-bold-duotone",
              },

              {
                label: "Register Bus Staff",
                link: "/school-dashboard/transport/setting/bus-staff-details",
                icon: "solar:users-group-rounded-bold-duotone",
              },
              {
                label: "Route For Students",
                link: "/school-dashboard/transport/setting/route-for-students",
                icon: "solar:users-group-rounded-bold-duotone",
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

    Principal: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/principal-dashboard",
      },

      {
        id: "approval",
        label: "Approval",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Student Admission",
            link: "/principal-dashboard/approval/student-admission",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Fees Concession",
            link: "/principal-dashboard/approval/fees-concession",
            icon: "solar:file-text-bold-duotone",
          },
          {
            label: "Staff Leave",
            link: "/principal-dashboard/approval/staff-leave",
            icon: "solar:delivery-bold-duotone",
          },
          {
            label: "Invoice",
            link: "/principal-dashboard/approval/invoice",
            icon: "solar:card-bold-duotone",
          },
          {
            label: "Employee Joining",
            link: "/principal-dashboard/approval/employee-joining",
            icon: "solar:card-bold-duotone",
          },
          {
            label: "TC",
            link: "/principal-dashboard/approval/transfer-certificate",
            icon: "solar:card-bold-duotone",
          },
          {
            label: "Staff Resignation",
            link: "/principal-dashboard/approval/staff-resignation",
            icon: "solar:card-bold-duotone",
          },
          {
            label: "Salary Payout",
            link: "/principal-dashboard/approval/salary-payout",
            icon: "solar:card-bold-duotone",
          },
        ],
      },

      {
        id: "noteNotices",
        label: "Note And Notices",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Notes",
            link: "/principal-dashboard/notes-notice/notes",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Notices",
            link: "/principal-dashboard/notes-notice/notices",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },
      {
        id: "holiday",
        label: "Holidays",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/principal-dashboard/holiday",
      },

      {
        id: "attendance",
        label: "Attendance",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Student Attendance",
            link: "/principal-dashboard/attendance/student-attendance",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Staff Attendance",
            link: "/principal-dashboard/attendance/staff-attendance",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },
      {
        id: "mis",
        label: "MIS",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/principal-dashboard/mis-report",
      },

      {
        id: "procurementServices",
        label: "Procurement Services",
        icon: "solar:wallet-money-bold",
        children: [
          // {
          //   label: "Dashboard",
          //   link: "/school-dashboard/procurement-services/dashboard",
          //   icon: "solar:widget-3-bold-duotone",
          // },
          {
            label: "Quotes",
            link: "/principal-dashboard/procurement-services/track-quote",
            icon: "solar:file-text-bold-duotone",
          },
          {
            label: "Track & Order History",
            link: "/principal-dashboard/procurement-services/track-order-history",
            icon: "solar:delivery-bold-duotone",
          },
          // {
          //   label: "Pay To EdProwise",
          //   link: "/school-dashboard/procurement-services/pay-to-edprowise",
          //   icon: "solar:card-bold-duotone",
          // },
        ],
      },

      {
        id: "scheduleVisitor",
        label: "Schedule Visitor",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/principal-dashboard/visiting-schedule",
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
                link: "/employee-dashboard/payroll-module/employee/update-details",
              },
              // ...(pfEsiSettings.pfEnable
              //   ? [
              //       {
              //         label: "Provident Fund",
              //         link: "/employee-dashboard/payroll-module/employee/provident-fund",
              //       },
              //     ]
              //   : []),
              // {
              //   label: "Provident Fund",
              //   link: "/employee-dashboard/payroll-module/employee-services/provident-fund",
              // },
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
                    link: "/employee-dashboard/payroll-module/employee/income-tax/it-declaration",
                  },
                  {
                    label: "Income Tax Computation Sheet",
                    link: "/employee-dashboard/payroll-module/employee/income-tax/income-tax-computation-sheet",
                  },
                  {
                    label: "Form 16",
                    // link: "/admin-dashboard/payroll-module/employee-services/income-tax/form16",
                  },
                  {
                    label: "Previous Employment Income",
                    link: "/employee-dashboard/payroll-module/employee/income-tax/previous-employment-income",
                  },
                ],
              },

              {
                id: "attendance",
                label: "Attendance",
                children: [
                  {
                    label: "Mark Attendance",
                    link: "/employee-dashboard/payroll-module/employee/attendance/mark-attendance",
                  },
                  {
                    label: "Apply for Leave",
                    link: "/employee-dashboard/payroll-module/employee/attendance/apply-for-leave",
                  },
                  {
                    label: "My Attendance Report",
                    link: "/employee-dashboard/payroll-module/employee/attendance/my-attendance-report",
                  },
                ],
              },

              {
                label: "Overtime Allowance",
                link: "/employee-dashboard/payroll-module/employee/overtime-allowance",
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

    Student: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/student-dashboard",
      },

      {
        id: "attendance",
        label: "Attendance & Leave",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Attendance",
            link: "/student-dashboard/attendance-leave/attendance-report",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Leave",
            link: "/student-dashboard/attendance-leave/leave-record",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },

      {
        id: "noteNotices",
        label: "Note And Notices",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Notes",
            link: "/student-dashboard/notes-notice/notes",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Notices",
            link: "/student-dashboard/notes-notice/notices",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },
      {
        id: "holiday",
        label: "Holidays",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/student-dashboard/holiday",
      },

      {
        id: "timeTable",
        label: "Timetable",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/student-dashboard/class-timetable",
      },

      {
        id: "exam",
        label: "Exam",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Exam Timetable",
            link: "/student-dashboard/exam/exam-list",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Exam Result",
            link: "/student-dashboard/exam/exam-result-list",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },

      {
        id: "homework",
        label: "Homework",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Assigned",
            link: "/student-dashboard/homework/homework-assign-list",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Submitted",
            link: "/student-dashboard/homework/homework-submit-list",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },

      {
        id: "teacherFeedback",
        label: "Teacher Feedback",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/student-dashboard/teachers-feedback",
      },

      {
        id: "classGroupChat",
        label: "Class Group Chat",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/student-dashboard/class-chat",
      },

      {
        id: "scheduleVisitor",
        label: "Schedule Visitor",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/student-dashboard/visiting-schedule",
      },
      {
        id: "childrenPickup",
        label: "Children Pickup",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/student-dashboard/child-pickup",
      },
    ],

    Teacher: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "solar:widget-5-bold-duotone",
        link: "/teacher-dashboard",
      },

      {
        id: "studentAttendance",
        label: "Student Attendance & Leave",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Mark Attendance",
            link: "/teacher-dashboard/student-attendance-leave/mark-attendance",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Attendance Report",
            link: "/teacher-dashboard/student-attendance-leave/attendance-report",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Leave",
            link: "/teacher-dashboard/student-attendance-leave/leave",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },

      {
        id: "teacherAttendance",
        label: "Attendance & Leave",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Attendance",
            link: "/teacher-dashboard/attendance-leave/attendance-report",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Leave",
            link: "/teacher-dashboard/attendance-leave/leave-record",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },

      {
        id: "noteNotices",
        label: "Note And Notices",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Notes",
            link: "/teacher-dashboard/notes-notice/notes",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Notices",
            link: "/teacher-dashboard/notes-notice/notices",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },
      {
        id: "holiday",
        label: "Holidays",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/teacher-dashboard/holiday",
      },

      {
        id: "lessonPlan",
        label: "Lesson Plan",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/teacher-dashboard/lesson-plan",
      },

      {
        id: "timeTable",
        label: "Timetable",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/teacher-dashboard/lectures-timetable",
      },

      {
        id: "exam",
        label: "Exam",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Exam Timetable",
            link: "/teacher-dashboard/exam/exam-list",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Exam Marks",
            link: "/teacher-dashboard/exam/exam-marks-list",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Exam Result",
            link: "/teacher-dashboard/exam/exam-result-list",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },

      {
        id: "homework",
        label: "Homework",
        icon: "solar:book-bookmark-bold-duotone",
        children: [
          {
            label: "Assigned",
            link: "/teacher-dashboard/homework/homework-assign-list",
            icon: "solar:widget-3-bold-duotone",
          },
          {
            label: "Submitted",
            link: "/teacher-dashboard/homework/homework-submit-list",
            icon: "solar:file-text-bold-duotone",
          },
        ],
      },
      {
        id: "resignation",
        label: "Resignation",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/teacher-dashboard/resignation",
      },

      {
        id: "documents",
        label: "Documents",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/teacher-dashboard/documents",
      },
      {
        id: "classGroupChat",
        label: "Class Group Chat",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/student-dashboard/class-chat",
      },

      {
        id: "scheduleVisitor",
        label: "Schedule Visitor",
        icon: "solar:users-group-rounded-bold-duotone",
        link: "/teacher-dashboard/visiting-schedule",
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
  }else if (sidebarTab === "payrollModule") {
    currentMenu = currentMenu.filter((item) => item.id === "payrollModule");
  }else if (sidebarTab === "OperationalService") {
    currentMenu = currentMenu.filter(
      (item) => item.id === "operationalService"
    );
  }else if (sidebarTab === "VisitorManagements") { 
    currentMenu = currentMenu.filter((item) => item.id === "VisitorManagements");
  }else if (sidebarTab === "TransportManagement") {
    currentMenu = currentMenu.filter(
      (item) => item.id === "TransportManagement"
    );
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

  // const renderMenuItems = (items, level = 0) =>
  //   items.map((item) => {
  //     const isActive = item.link ? isPathActive(item.link) : false;
  //     const hasChildren = item.children && item.children.length > 0;
  //     const isExpanded = hasChildren && hasActiveChild(item.children);
  //     const collapseId = `sidebar-${item.id || item.label.replace(/\s+/g, "-")}`;

  //     if (hasChildren) {
  //       return (
  //         <li className="nav-item" key={item.id || item.label}>
  //           <a
  //             className="nav-link "
  //             href={`#${collapseId}`}
  //             data-bs-toggle="collapse"
  //             role="button"
  //             aria-expanded={isExpanded}
  //             aria-controls={collapseId}
  //             style={{
  //               justifyContent: isCollapsed ? 'center' : 'flex-start',
  //               paddingLeft: isCollapsed ? '0' : level > 0 ? '1rem' : '',
  //               paddingRight: isCollapsed ? '0' : ''
  //             }}
  //           >
  //             <span className="nav-icon">
  //               <Icon icon={item.icon} />
  //             </span>
  //             {!isCollapsed && (
  //               <>
  //                 <span className="nav-text">{item.label}</span>
  //                 <span className="nav-arrow ms-auto">
  //                   <Icon
  //                     icon={isExpanded ? "bi:chevron-down" : "bi:chevron-right"}
  //                     width="12"
  //                   />
  //                 </span>
  //               </>
  //             )}
  //           </a>
  //           <div className={`collapse ${isExpanded ? "show" : ""}`} id={collapseId}>
  //             <ul className={`nav flex-column ${level > 0 ? 'ms-3' : ''}`}>
  //               {renderMenuItems(item.children, level + 1)}
  //             </ul>
  //           </div>
  //         </li>
  //       );
  //     } else {
  //       return (
  //         <li className="nav-item" key={item.id || item.label}>
  //           <Link
  //             className={`nav-link ${isActive ? "active" : ""}`}
  //             to={item.link}
  //             style={{
  //               justifyContent: isCollapsed ? 'center' : 'flex-start',
  //               paddingLeft: isCollapsed ? '0' : level > 0 ? '1rem' : '',
  //               paddingRight: isCollapsed ? '0' : ''
  //             }}
  //           >
  //             <span className="nav-icon">
  //               <Icon icon={item.icon} />
  //             </span>
  //             {!isCollapsed && (
  //               <>
  //                 <span className="nav-text">{item.label}</span>
  //                 <span style={{ width: '16px' }}></span>
  //               </>
  //             )}
  //           </Link>
  //         </li>
  //       );
  //     }
  //   });

  const renderMenuItems = (items, level = 0) =>
    items.map((item) => {
      // Only apply the sidebarTab filtering for School role
      if (
        userRole === "School" &&
        (sidebarTab === "ProcurementService" ||
          sidebarTab === "FeesModule" ||
          sidebarTab === "payrollModule" ||
          sidebarTab === "VisitorManagements" || 
          sidebarTab === "TransportManagement" ||
          sidebarTab === "OperationalService") &&
        level === 0
      ) {
        if (
          (sidebarTab === "ProcurementService" &&
            item.id === "procurementServices" &&
            item.children) ||
          (sidebarTab === "FeesModule" &&
            item.id === "feesmodule" &&
            item.children) ||
            (sidebarTab === "payrollModule" &&
            item.id === "payrollModule" &&
            item.children) ||
            (sidebarTab === "VisitorManagements" &&
            item.id === "VisitorManagements" &&
            item.children) ||
            (sidebarTab === "TransportManagement" &&
            item.id === "TransportManagement" &&
            item.children) ||
          (sidebarTab === "OperationalService" &&
            item.id === "operationalService" &&
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
      const collapseId = `sidebar-${
        item.id || item.label.replace(/\s+/g, "-")
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