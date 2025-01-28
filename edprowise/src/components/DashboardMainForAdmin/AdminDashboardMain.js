// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import AdminDashboardHeader from "./AdminDashboardHeader";

// import Sidebar from "../Sidebar/Sidebar";
// import Footer from "../Footer/Footer";

// const AdminDashboardMain = () => {
//   useEffect(() => {
//     const script = document.createElement("script");

//     script.src = "%PUBLIC_URL%/assets/js/app.js";
//     script.src = "%PUBLIC_URL%/assets/js/config.js";
//     script.src = "%PUBLIC_URL%/assets/js/apexchart-mixed.js";
//     script.src = "%PUBLIC_URL%/assets/js/vendor.js";

//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       // Cleanup the script when the component unmounts
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <>
//       <div className="wrapper">
//         <AdminDashboardHeader />
//         <Sidebar />

//         <div className="page-content custom-font-size">
//           <Outlet />
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default AdminDashboardMain;

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardHeader from "./AdminDashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

const AdminDashboardMain = () => {
  // useEffect(() => {
  //   const scriptSources = [
  //     `${process.env.PUBLIC_URL}/assets/js/jquery.min.js`,
  //     `${process.env.PUBLIC_URL}/assets/js/vendor.js`,
  //     `${process.env.PUBLIC_URL}/assets/js/app.js`,
  //     `${process.env.PUBLIC_URL}/assets/js/config.js`,
  //   ];

  //   // Function to load scripts dynamically
  //   const loadScript = (src) => {
  //     return new Promise((resolve, reject) => {
  //       const script = document.createElement("script");
  //       script.src = src;
  //       script.async = true;

  //       script.onload = () => {
  //         console.log(`${src} loaded successfully`);
  //         resolve();
  //       };

  //       script.onerror = () => {
  //         console.error(`Error loading script: ${src}`);
  //         reject(new Error(`Failed to load script: ${src}`));
  //       };

  //       document.body.appendChild(script);
  //     });
  //   };

  //   // Load scripts sequentially
  //   const loadScripts = async () => {
  //     for (const src of scriptSources) {
  //       await loadScript(src);
  //     }
  //   };

  //   loadScripts().catch((error) => console.error(error));

  //   // Cleanup the scripts when the component unmounts
  //   return () => {
  //     scriptSources.forEach((src) => {
  //       const script = document.querySelector(`script[src="${src}"]`);
  //       if (script) {
  //         document.body.removeChild(script);
  //       }
  //     });
  //   };
  // }, []);

  // Return the JSX to be rendered
  return (
    <div className="wrapper">
      <AdminDashboardHeader />
      <Sidebar />
      <div className="page-content custom-font-size">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardMain;
