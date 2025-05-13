// import { Outlet } from "react-router-dom";
// import SellerDashboardHeader from "./SellerDashboardHeader";
// import Sidebar from "../Sidebar/Sidebar";
// import Footer from "../Footer/Footer";

// const SellerDashboardMain = () => {
//   return (
//     <>
//       <div className="wrapper">
//         <SellerDashboardHeader />
//         <Sidebar />

//         <div className="page-content custom-font-size">
//           <Outlet />
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default SellerDashboardMain;

// EdProwise_Frontend\edprowise\src\components\DashboardMainForSeller\SellerDashboardMain.js
import { Outlet } from "react-router-dom";
import SellerDashboardHeader from "./SellerDashboardHeader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { NotificationProvider } from "../NotificationProvider";

const SellerDashboardMain = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const sellerId = userDetails?.id;

  return (
    <>
      <NotificationProvider sellerId={sellerId}>
        <div className="wrapper">
          <SellerDashboardHeader />
          <Sidebar />

          <div className="page-content custom-font-size">
            <Outlet />
          </div>

          <Footer />
        </div>
      </NotificationProvider>
    </>
  );
};

export default SellerDashboardMain;
