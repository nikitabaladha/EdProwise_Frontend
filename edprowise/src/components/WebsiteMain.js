// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar/Navbar";
// import DashboardFooter from "./DashboardFooter/DashboardFooter";
// import { Outlet } from "react-router-dom";

// const WebsiteMain = () => {
//   useEffect(() => {
//     const scriptSources = [
//       `${process.env.PUBLIC_URL}/assets/website-js/script.js`,
//       `${process.env.PUBLIC_URL}/assets/js/jquery.min.js`,
//       `${process.env.PUBLIC_URL}/assets/website-js/bootstrap.bundle.min.js`,
//     ];

//     const scripts = scriptSources.map((src) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.async = true;

//       script.onload = () => {
//         console.log(`${src} loaded successfully`);
//       };
//       script.onerror = () => {
//         console.error(`Error loading script: ${src}`);
//       };

//       document.body.appendChild(script);
//       return script;
//     });

//     return () => {
//       scripts.forEach((script) => {
//         if (document.body.contains(script)) {
//           document.body.removeChild(script);
//         }
//       });
//     };
//   }, []);

//   const [showBackToTop, setShowBackToTop] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 500) {
//         setShowBackToTop(true);
//       } else {
//         setShowBackToTop(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <>
//       <div className="font-family-web">
//         <Navbar />
//         <div className="page-wrapper">
//           <Outlet />
//         </div>
//         <DashboardFooter />
//       </div>

//       {showBackToTop && (
//         <button
//           className="back-to-top"
//           onClick={scrollToTop}
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             right: "20px",
//             zIndex: "1000",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "2px solid blue",
//             borderRadius: "50%",
//             width: "50px",
//             height: "50px",
//             cursor: "pointer",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             opacity: 0.9,
//           }}
//         >
//           ↑
//         </button>
//       )}
//     </>
//   );
// };

// export default WebsiteMain;
// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar/Navbar";
// import DashboardFooter from "./DashboardFooter/DashboardFooter";
// import { Outlet } from "react-router-dom";

// const WebsiteMain = () => {
//   useEffect(() => {
//     const scriptElements = [];

//     const loadScripts = () => {
//       return new Promise((resolve, reject) => {
//         const jQueryScript = document.createElement("script");
//         jQueryScript.src = `${process.env.PUBLIC_URL}/assets/js/jquery.min.js`;
//         jQueryScript.async = true;
//         jQueryScript.onload = () => {
//           scriptElements.push(jQueryScript);
//           resolve();
//         };
//         jQueryScript.onerror = () => reject(new Error("Failed to load jQuery"));
//         document.body.appendChild(jQueryScript);
//       });
//     };

//     const loadCustomScripts = () => {
//       const scriptSources = [
//         `${process.env.PUBLIC_URL}/assets/website-js/script.js`,
//         `${process.env.PUBLIC_URL}/assets/website-js/bootstrap.bundle.min.js`,
//       ];

//       return Promise.all(
//         scriptSources.map((src) => {
//           return new Promise((resolve, reject) => {
//             const script = document.createElement("script");
//             script.src = src;
//             script.async = true;
//             script.onload = () => {
//               scriptElements.push(script);
//               resolve();
//             };
//             script.onerror = () =>
//               reject(new Error(`Failed to load script: ${src}`));
//             document.body.appendChild(script);
//           });
//         })
//       );
//     };

//     // Load jQuery and then load other scripts
//     loadScripts()
//       .then(loadCustomScripts)
//       .catch((error) => console.error(error));

//     return () => {
//       // Cleanup scripts on component unmount
//       scriptElements.forEach((script) => {
//         document.body.removeChild(script);
//       });
//     };
//   }, []);

//   const [showBackToTop, setShowBackToTop] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 500) {
//         setShowBackToTop(true);
//       } else {
//         setShowBackToTop(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <>
//       <div className="font-family-web">
//         <Navbar />
//         <div className="page-wrapper">
//           <Outlet />
//         </div>
//         <DashboardFooter />
//       </div>

//       {showBackToTop && (
//         <button
//           className="back-to-top"
//           onClick={scrollToTop}
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             right: "20px",
//             zIndex: "1000",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "2px solid blue",
//             borderRadius: "50%",
//             width: "50px",
//             height: "50px",
//             cursor: "pointer",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             opacity: 0.9,
//           }}
//         >
//           ↑
//         </button>
//       )}
//     </>
//   );
// };

// export default WebsiteMain;

/* global $ */

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import DashboardFooter from "./DashboardFooter/DashboardFooter";
import { Outlet } from "react-router-dom";

const WebsiteMain = () => {
  useEffect(() => {
    const scriptElements = [];

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => {
          scriptElements.push(script);
          resolve();
        };
        script.onerror = () =>
          reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript(
          `${process.env.PUBLIC_URL}/assets/website-js/jquery.min.js`
        );

        await loadScript(
          `${process.env.PUBLIC_URL}/assets/website-js/jquery.nice-select.min.js`
        );
        await loadScript(
          `${process.env.PUBLIC_URL}/assets/website-js/bootstrap.bundle.min.js`
        );
        await loadScript(
          `${process.env.PUBLIC_URL}/assets/website-js/script.js`
        );
        console.log("Scripts loaded successfully.");
        $(document).ready(() => {
          $(".select").niceSelect();
        });
      } catch (error) {
        console.error(error);
        console.error("Error loading scripts:", error);
      }
    };

    loadScripts();

    return () => {
      // Cleanup scripts on component unmount
      scriptElements.forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, []);

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="font-family-web">
        <Navbar />
        <div className="page-wrapper">
          <Outlet />
        </div>
        <DashboardFooter />
      </div>

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
    </>
  );
};

export default WebsiteMain;
