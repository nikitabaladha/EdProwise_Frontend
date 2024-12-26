import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import DashboardMain from "./components/DashboardMain/DashboardMain";
import Dashboard from "./components/DashboardMain/Dashboard/Dashboard";
import RegistrationForm from "./components/DashboardMain/Form/RegistrationForm/RegistrationForm";
import AddNewRegistration from "./components/DashboardMain/Form/RegistrationForm/AddNewRegistration/AddNewRegistration";

import Schools from "./components/DashboardMain/Schools/Schools";
import AddNewSchool from "./components/DashboardMain/Schools/AddNewSchool/AddNewSchool";
import ViewSchool from "./components/DashboardMain/Schools/ViewSchool/ViewSchool";
import UpdateSchool from "./components/DashboardMain/Schools/UpdateSchool/UpdateSchool";

import Subscriptions from "./components/DashboardMain/Subscription/Subscription"
import AddNewSubscription from "./components/DashboardMain/Subscription/AddNewSubscription/AddNewSubscriptionl";
import ViewSubscriptions from "./components/DashboardMain/Subscription/ViewSubscription/ViewSubscription";
import UpdateSubscription from "./components/DashboardMain/Subscription/UpdateSubscription/UpdateSubscription";

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
        {/* Main Dashboard Route */}
        <Route index element={<Dashboard />} />

        {/* Registration Form and its children Route */}
        <Route path="formMenu/registrationForm" element={<RegistrationForm />}>
          <Route path="create" element={<AddNewRegistration />} />
        </Route>

        {/* School Table page and it's Add, View, Update Routes */}
        <Route path="schools" element={<Schools />}>
          <Route path="add-new-school" element={<AddNewSchool />} />
          <Route path="view-school" element={<ViewSchool />} />
          <Route path="update-school" element={<UpdateSchool />} />
        </Route>

        <Route path="subscriptions" element={<Subscriptions />}>
          <Route path="add-new-subscriptions" element={<AddNewSubscription />} />
          <Route path="view-subscriptions" element={<ViewSubscriptions />} />
          <Route path="update-subscriptions" element={<UpdateSubscription />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
