import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import WebsiteMain from "./components/WebsiteMain";
import HomePage from "./components/HomeSection/HomePage";
import AboutPage from "./components/AboutSection/AboutPage";
import ContactUsPage from "./components/ContactUsSection/ContactUsPage";

import ServiceMainPage from "./components/ServiceSection/ServiceMainPage";
import DigitalService from "./components/ServiceSection/SubSections/DigitalService";
import BusinessSection from "./components/ServiceSection/SubSections/BusinessSection";
import RecruitmentSection from "./components/ServiceSection/SubSections/RecruitmentSection";
import ProcurementSection from "./components/ServiceSection/SubSections/ProcurementSection";

import CommunityMainPage from "./components/CommunitySection/CommunityMainPage";
import GallerySection from "./components/CommunitySection/SubSection/GallerySection";
import EdprowiseTalkSection from "./components/CommunitySection/SubSection/EdprowiseTalkSection.js";
import StudentZoneSection from "./components/CommunitySection/SubSection/StudentZoneSection";
import EducatorZoneSection from "./components/CommunitySection/SubSection/EducatorZoneSection.js";

import SupplierPage from "./components/BecomeSupplier/SupplierPage.js";
import FaqPage from "./components/FAQSection/FAQPage.js";
import PrivacyPage from "./components/PrivacyPage/PrivacyPage.js";
import CareerPage from "./components/CareerPage/CareerPage.js";
import CareerForm from "./components/CareerPage/CareerForm.js";

import AdminLogin from "./components/Login/AdminLogin";
import UserLogin from "./components/Login/UserLogin";

import Signup from "./components/Signup/Signup";
import AdminSignup from "./components/Signup/AdminSignup";

// ==================================Admin Routes =================================
import ChangePasswordForAdmin from "./components/DashboardMainForAdmin/ChangePassword/ChangePassword";

import CompleteEdprowiseProfile from "./components/DashboardMainForAdmin/CompleteEdprowiseProfile/CompleteEdprowiseProfile";
import ViewAdminProfile from "./components/DashboardMainForAdmin/ViewAdminProfile/ViewAdminProfile";
import UpdateAdminProfile from "./components/DashboardMainForAdmin/UpdateAdminProfile/UpdateAdminProfile";

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

import CompleteSchoolProfile from "./components/DashboardMainForSchool/CompleteSchoolProfile/CompleteSchoolProfile";
import UpdateSchoolProfile from "./components/DashboardMainForSchool/UpdateSchoolProfile/UpdateSchoolProfile";
import ViewSchoolProfile from "./components/DashboardMainForSchool/ViewSchoolProfile/ViewSchoolProfile";
import ChangePasswordForSchoolAdmin from "./components/DashboardMainForSchool/ChangePassword/ChangePassword";

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
import CompleteSellerProfile from "./components/DashboardMainForSeller/CompleteSellerProfile/CompleteSellerProfile";
import TermsPage from "./components/PrivacyPage/TermsPage.js";
import RequestDemoForm from "./components/HomeSection/RequestDemoForm.js";
import ServiceFess from "./components/ServiceSection/ServiceDetails/FessPixal/ServiceFees.js";
import PayrollService from "./components/ServiceSection/ServiceDetails/PayrollService/PayrollService.js";
import TestingforPop from "./components/ServiceSection/SubSections/TestingforPop.js";
import FinanceBook from "./components/ServiceSection/ServiceDetails/FinanceBook/FinanceBook.js";
import SchoolOperation from "./components/ServiceSection/ServiceDetails/SchoolOperations/SchoolOperation.js";
import SchoolApplication from "./components/ServiceSection/ServiceDetails/SchoolApplication/SchoolApplication.js";
import SchoolWebsiteDesign from "./components/ServiceSection/ServiceDetails/SchoolWebsiteDesign/SchoolWebsiteDesign.js";
import StudentRegisterListTable from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/StudentRegisterListTable.js";
import StudentRegistrationForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/StudentRegistrationForm.js";

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
      <Route
        path="/signup/admin"
        element={
          <PublicRoute>
            <AdminSignup />
          </PublicRoute>
        }
      />

      <Route
        path="/complete-admin-profile"
        element={
          <PrivateRoute>
            <CompleteEdprowiseProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/complete-school-profile"
        element={
          <PrivateRoute>
            <CompleteSchoolProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/complete-seller-profile"
        element={
          <PrivateRoute>
            <CompleteSellerProfile />
          </PrivateRoute>
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

        <Route path="view-admin-profile" element={<ViewAdminProfile />} />

        <Route path="update-admin-profile" element={<UpdateAdminProfile />} />

        <Route
          path="change-edprowise-admin-password"
          element={<ChangePasswordForAdmin />}
        />

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
        <Route path="view-school-profile" element={<ViewSchoolProfile />} />
        <Route path="update-school-profile" element={<UpdateSchoolProfile />} />
        <Route
          path="change-school-admin-password"
          element={<ChangePasswordForSchoolAdmin />}
        />

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

        {/* ***********Fees Module********* */}
        <Route
          path="fees-module/form/registration"
          element={<StudentRegisterListTable />}
        />
        <Route
          path="fees-module/form/registration/registration-form"
          element={<StudentRegistrationForm />}
        />
      </Route>

      {/* =========================================Seller Routes============================================= */}

      <Route path="/" element={<WebsiteMain />}>
        <Route index element={<HomePage />} />

        <Route path="about-us" element={<AboutPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />

        <Route path="services" element={<ServiceMainPage />}>
          <Route path="digital-services" element={<DigitalService />} />
          <Route path="business-services" element={<BusinessSection />} />
          <Route path="recruitment-services" element={<RecruitmentSection />} />
          <Route path="procurement-services" element={<ProcurementSection />} />
        </Route>

        <Route path="community-connect" element={<CommunityMainPage />}>
          <Route path="gallery" element={<GallerySection />} />
          <Route path="edprowise-talks" element={<EdprowiseTalkSection />} />
          <Route path="student-zone" element={<StudentZoneSection />} />
          <Route path="educator-zone" element={<EducatorZoneSection />} />
        </Route>

        <Route path="become-supplier" element={<SupplierPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="privacy-policy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="career" element={<CareerPage />} />
        <Route path="career/:jobName" element={<CareerForm />} />
        <Route path="request-demo" element={<RequestDemoForm />} />
        <Route
          path="services/digital-services/fees"
          element={<ServiceFess />}
        />
        <Route
          path="services/digital-services/payroll"
          element={<PayrollService />}
        />
        <Route
          path="services/digital-services/booksync"
          element={<FinanceBook />}
        />
        <Route
          path="services/digital-services/schooloperation"
          element={<SchoolOperation />}
        />
        <Route
          path="services/digital-services/schoolApplication"
          element={<SchoolApplication />}
        />
        <Route
          path="services/digital-services/school-Website-Design"
          element={<SchoolWebsiteDesign />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
