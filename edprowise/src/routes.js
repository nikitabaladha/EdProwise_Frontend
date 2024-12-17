// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login/Login";
// import Signup from "./components/Signup/Signup";
// import DashboardMain from "./components/DashboardMain/DashboardMain";
// import Dashboard from "./components/DashboardMain/Dashboard/Dashboard";
// import RegistrationForm from "./components/DashboardMain/Form/RegistrationForm/RegistrationForm";

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem("accessToken");
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// const PublicRoute = ({ children }) => {
//   const isAuthenticated = !localStorage.getItem("accessToken");
//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={
//           <PublicRoute>
//             <Login />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/signup"
//         element={
//           <PublicRoute>
//             <Signup />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <DashboardMain />
//           </PrivateRoute>
//         }
//       >
//         <Route index element={<Dashboard />} />
//         <Route
//           path="formMenu/registrationForm"
//           element={<RegistrationForm />}
//         />
//       </Route>
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

// =================================================================================================
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/Login/Login";
// import Signup from "./components/Signup/Signup";
// import DashboardMain from "./components/DashboardMain/DashboardMain";
// import Dashboard from "./components/DashboardMain/Dashboard/Dashboard";
// import RegistrationForm from "./components/DashboardMain/Form/RegistrationForm/RegistrationForm";
// import AddNewRegistration from "./components/DashboardMain/Form/RegistrationForm/AddNewRegistration/AddNewRegistration";

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem("accessToken");
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// const PublicRoute = ({ children }) => {
//   const isAuthenticated = !localStorage.getItem("accessToken");
//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={
//           <PublicRoute>
//             <Login />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/signup"
//         element={
//           <PublicRoute>
//             <Signup />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             <DashboardMain />
//           </PrivateRoute>
//         }
//       >
//         <Route index element={<Dashboard />} />
//         <Route
//           path="formMenu/registrationForm"
//           element={<RegistrationForm />}
//         />

//         {/* <Route
//           path="formMenu/registrationForm"
//           element={<RegistrationForm />}
//         ></Route> */}

//         <Route path="employee" element={< formMenu/registrationForm/>}>
//           <Route path="create" element={<AddNewRegistration/>} />
//         </Route>
//       </Route>
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import DashboardMain from "./components/DashboardMain/DashboardMain";
import Dashboard from "./components/DashboardMain/Dashboard/Dashboard";
import RegistrationForm from "./components/DashboardMain/Form/RegistrationForm/RegistrationForm";
import AddNewRegistration from "./components/DashboardMain/Form/RegistrationForm/AddNewRegistration/AddNewRegistration";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = !localStorage.getItem("accessToken");
  return isAuthenticated ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardMain />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route
          path="formMenu/registrationForm"
          element={<RegistrationForm />}
        />

        <Route path="formMenu/registrationForm" element={<RegistrationForm />}>
          <Route path="create" element={<AddNewRegistration />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
