// import Navbar from "./Navbar/Navbar";
// import DashboardFooter from "./DashboardFooter/DashboardFooter";
// import { Outlet } from "react-router-dom";
// import React, { useEffect } from "react";

// const WebsiteMain = () => {
//   useEffect(() => {
//     // Add CSS files to the document head
//     const linkTags = [
//       "assets/website-css/themify-icons.css",
//       "/assets/website-css/flaticon.css",
//       "/assets/website-css/font-awesome.min.css",
//       "/assets/website-css/animate.css",
//       "/assets/website-css/owl.carousel.css",
//       "/assets/website-css/owl.theme.css",
//       "/assets/website-css/slick.css",
//       "/assets/website-css/slick-theme.css",
//       "/assets/website-css/swiper.min.css",
//       "/assets/website-css/odometer-theme-default.css",
//       "/assets/sass/style.css",
//     ].map((href) => {
//       const link = document.createElement("link");
//       link.rel = "stylesheet";
//       link.href = process.env.PUBLIC_URL + href;
//       document.head.appendChild(link);
//       return link;
//     });

//     return () => {
//       linkTags.forEach((link) => document.head.removeChild(link));
//     };
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="page-wrapper">
//         <Outlet />
//       </div>
//       <DashboardFooter />
//     </>
//   );
// };

// export default WebsiteMain;
