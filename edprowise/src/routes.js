import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./components/Login/AdminLogin";
import UserLogin from "./components/Login/UserLogin";

import Signup from "./components/Signup/Signup";

// ==================================Admin Routes =================================

import AdminDashboardMain from "./components/DashboardMainForAdmin/AdminDashboardMain";
import Dashboard from "./components/DashboardMainForAdmin/Dashboard/Dashboard";

import Schools from "./components/DashboardMainForAdmin/Schools/Schools";
import AddNewSchool from "./components/DashboardMainForAdmin/Schools/AddNewSchool/AddNewSchool";
import ViewSchool from "./components/DashboardMainForAdmin/Schools/ViewSchool/ViewSchool";
import UpdateSchool from "./components/DashboardMainForAdmin/Schools/UpdateSchool/UpdateSchool";

import Subscriptions from "./components/DashboardMainForAdmin/Subscription/Subscription";
import AddNewSubscription from "./components/DashboardMainForAdmin/Subscription/AddNewSubscription/AddNewSubscription";
import ViewSubscriptions from "./components/DashboardMainForAdmin/Subscription/ViewSubscription/ViewSubscription";
import UpdateSubscription from "./components/DashboardMainForAdmin/Subscription/UpdateSubscription/UpdateSubscription";

import TrackQuoteTableForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/TrackQuoteTable";
import ViewRequestedQuoteForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/ViewRequestedQuote/ViewRequestedQuote";

import ViewAllQuoteTableForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/ViewAllQuoteTable/ViewAllQuoteTable";
import ViewQuoteForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/ViewQuote/ViewQuote";

import BankDetailsTable from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/BankDetails/BankDetailsTable";
import AddNewBankDetail from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/BankDetails/AddNewBankDetail/AddNewBankDetail";
import UpdateBankDetail from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/BankDetails/UpdateBankDetail/UpdateBankDetail";

import TrackOrderHistoryTableForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackOrderHistory/TrackOrderHistoryTable";
import ViewOrderHistoryForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackOrderHistory/ViewOrderHistory/ViewOrderHistory";

import GoodsAndServicesTable from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/GoodsAndServicesTable";
import AddGoodsAndServices from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/AddGoodsAndServices/AddGoodsAndServices";
import UpdateGoodAndService from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/UpdateGoodAndService/UpdateGoodAndService";

// =============================================School Routes==============================================
import SchoolDashboardMain from "./components/DashboardMainForSchool/SchoolDashboardMain";
import SchoolDashboard from "./components/DashboardMainForSchool/SchoolDashboard/SchoolDashboard";

import TrackQuoteTable from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/TrackQuoteTable";
import RequestQuote from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/RequestQuote/RequestQuote";

import ViewRequestedQuote from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/ViewRequestedQuote/ViewRequestedQuote";

import ViewQuote from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/ViewQuote/ViewQuote";
import ViewAllQuoteTable from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/ViewAllQuoteTable/ViewAllQuoteTable";

import TrackOrderHistoryTable from "./components/DashboardMainForSchool/ProcurementServices/TrackOrderHistory/TrackOrderHistoryTable";
import ViewOrderHistory from "./components/DashboardMainForSchool/ProcurementServices/TrackOrderHistory/ViewOrderHistory/ViewOrderHistory";

import PayToEdProwiseForSchool from "./components/DashboardMainForSchool/ProcurementServices/PayToEdProwise/PayToEdProwise";

// ================================================Seller Routes============================================
import SellerDashboardMain from "./components/DashboardMainForSeller/SellerDashboardMain";
import SellerDashboard from "./components/DashboardMainForSeller/SellerDashboard/SellerDashboard";

import TrackQuoteTableForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackQuotes/TrackQuoteTable";
import ViewRequestedQuoteForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackQuotes/ViewRequestedQuote/ViewRequestedQuote";

import SubmitQuote from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackQuotes/SubmitQuote/SubmitQuote";

import TrackOrderHistoryTableForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackOrderHistory/TrackOrderHistoryTable";
import ViewOrderHistoryForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackOrderHistory/ViewOrderHistory/ViewOrderHistory";
import PayToEdProwiseForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/PayToEdProwise/PayToEdProwise";

import SubmittedQuoteTableForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/SubmittedQuote/SubmittedQuote";

import PreparedQuote from "./components/DashboardMainForSeller/ProcurementServicesForSeller/PreparedQuotes/PreparedQuote";

import Test from "./components/DashboardMainForSeller/ProcurementServicesForSeller/Test/Test";
// import PayToEdProwise from "./components/DashboardMainForSchool/ProcurementServices/PayToEdProwise/PayToEdProwise";

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
            <UserLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/login/admin"
        element={
          <PublicRoute>
            <AdminLogin />
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

      {/* ===================================================Admin Routes==================================== */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute>
            <AdminDashboardMain />
          </PrivateRoute>
        }
      >
        {/* Main Dashboard Route */}
        <Route index element={<Dashboard />} />
        {/* School Table page and it's Add, View, Update Routes */}
        <Route path="schools" element={<Schools />}>
          <Route path="add-new-school" element={<AddNewSchool />} />
          <Route path="view-school" element={<ViewSchool />} />
          <Route path="update-school" element={<UpdateSchool />} />
        </Route>
        {/* Subscriptions Table page and it's Add, View, Update Routes */}
        <Route path="subscriptions" element={<Subscriptions />}>
          <Route
            path="add-new-subscriptions"
            element={<AddNewSubscription />}
          />
          <Route path="view-subscriptions" element={<ViewSubscriptions />} />
          <Route path="update-subscriptions" element={<UpdateSubscription />} />
        </Route>
        {/* Procurement Services Routes */}
        <Route
          path="procurement-services/track-quote"
          element={<TrackQuoteTableForAdmin />}
        />
        <Route
          path="procurement-services/view-requested-quote"
          element={<ViewRequestedQuoteForAdmin />}
        />
        <Route
          path="procurement-services/view-quote-table"
          element={<ViewAllQuoteTableForAdmin />}
        />
        <Route
          path="procurement-services/view-quote"
          element={<ViewQuoteForAdmin />}
        />
        <Route
          path="procurement-services/track-order-history"
          element={<TrackOrderHistoryTableForAdmin />}
        />
        <Route
          path="procurement-services/view-order-history"
          element={<ViewOrderHistoryForAdmin />}
        />
        <Route
          path="procurement-services/define-goods-services"
          element={<GoodsAndServicesTable />}
        />
        <Route
          path="procurement-services/add-good-services"
          element={<AddGoodsAndServices />}
        />
        <Route
          path="procurement-services/update-good-service"
          element={<UpdateGoodAndService />}
        />

        <Route
          path="procurement-services/bank-details"
          element={<BankDetailsTable />}
        />
        <Route
          path="procurement-services/add-bank-detail"
          element={<AddNewBankDetail />}
        />
        <Route
          path="procurement-services/update-bank-detail"
          element={<UpdateBankDetail />}
        />
      </Route>

      {/*==============================================School Routes============================================== */}

      <Route
        path="/school-dashboard"
        element={
          <PrivateRoute>
            <SchoolDashboardMain />
          </PrivateRoute>
        }
      >
        {/*School Dashboard Route */}
        <Route index element={<SchoolDashboard />} />

        <Route
          path="procurement-services/track-quote"
          element={<TrackQuoteTable />}
        />
        <Route
          path="procurement-services/request-quote"
          element={<RequestQuote />}
        />
        <Route
          path="procurement-services/view-requested-quote"
          element={<ViewRequestedQuote />}
        />

        <Route path="procurement-services/view-quote" element={<ViewQuote />} />
        <Route
          path="procurement-services/view-quote-table"
          element={<ViewAllQuoteTable />}
        />

        <Route
          path="procurement-services/track-order-history"
          element={<TrackOrderHistoryTable />}
        />
        <Route
          path="procurement-services/view-order-history"
          element={<ViewOrderHistory />}
        />
        <Route
          path="procurement-services/Pay-to-edprowise"
          element={<PayToEdProwiseForSchool />}
        />
      </Route>

      {/* =========================================Seller Routes============================================= */}

      <Route
        path="/seller-dashboard"
        element={
          <PrivateRoute>
            <SellerDashboardMain />
          </PrivateRoute>
        }
      >
        {/*Seller Dashboard Route */}
        <Route index element={<SellerDashboard />} />

        {/* Procurement Services Routes */}
        <Route
          path="procurement-services/track-quote"
          element={<TrackQuoteTableForSeller />}
        />
        <Route
          path="procurement-services/view-requested-quote"
          element={<ViewRequestedQuoteForSeller />}
        />

        <Route
          path="procurement-services/submit-quote"
          element={<SubmitQuote />}
        />

        <Route
          path="procurement-services/track-order-history"
          element={<TrackOrderHistoryTableForSeller />}
        />
        <Route
          path="procurement-services/view-order-history"
          element={<ViewOrderHistoryForSeller />}
        />
        <Route
          path="procurement-services/Pay-to-edprowise"
          element={<PayToEdProwiseForSeller />}
        />

        <Route
          path="procurement-services/submitted-quote"
          element={<SubmittedQuoteTableForSeller />}
        />
        {/* <Route
          path="procurement-services/view-submitted-quote"
          element={<ViewSubmittedQuote />}
        /> */}

        <Route
          path="procurement-services/prepared-quote"
          element={<PreparedQuote />}
        />
        <Route path="procurement-services/test" element={<Test />} />
      </Route>

      <Route path="/" element={<Navigate to="/school-dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
