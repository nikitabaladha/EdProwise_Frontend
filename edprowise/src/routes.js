import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import QuoteProposalForAll from "./components/ProcurementPDF/QuoteProposal.js";
import InvoiceForBuyerForAll from "./components/ProcurementPDF/InvoiceForBuyer.js";
import InvoiceForEdProwiseForAll from "./components/ProcurementPDF/InvoiceForEdProwise.js";

// ================================Website Routes================================================

import WebsiteMain from "./components/WebsiteMain";
import HomePage from "./components/HomeSection/HomePage";
import AboutPage from "./components/AboutSection/AboutPage";
import ContactUsPage from "./components/ContactUsSection/ContactUsPage";
import OrderDetailsWebSitePage from "./components/OrderDetailsWebsite/OrderDetailsWebSitePage.js";

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

import ServiceFess from "./components/ServiceSection/ServiceDetails/FessPixal/ServiceFees.js";
import PayrollService from "./components/ServiceSection/ServiceDetails/PayrollService/PayrollService.js";
import FinanceBook from "./components/ServiceSection/ServiceDetails/FinanceBook/FinanceBook.js";
import SchoolOperation from "./components/ServiceSection/ServiceDetails/SchoolOperations/SchoolOperation.js";
import SchoolApplication from "./components/ServiceSection/ServiceDetails/SchoolApplication/SchoolApplication.js";
import SchoolWebsiteDesign from "./components/ServiceSection/ServiceDetails/SchoolWebsiteDesign/SchoolWebsiteDesign.js";

import TermsPage from "./components/PrivacyPage/TermsPage.js";
import RequestDemoForm from "./components/HomeSection/RequestDemoForm.js";

// =================================Signup Login Routes================================================

import AdminLogin from "./components/Login/AdminLogin";
import UserLogin from "./components/Login/UserLogin";

import Signup from "./components/Signup/Signup";
import AdminSignup from "./components/Signup/AdminSignup";

// ==============Admin Routes ====================Admin Routes ========================Admin Routes=========

import ChangePasswordForAdmin from "./components/DashboardMainForAdmin/ChangePassword/ChangePassword";
import CompleteEdprowiseProfile from "./components/DashboardMainForAdmin/CompleteEdprowiseProfile/CompleteEdprowiseProfile";
import ViewAdminProfile from "./components/DashboardMainForAdmin/ViewAdminProfile/ViewAdminProfile";
import UpdateAdminProfile from "./components/DashboardMainForAdmin/UpdateAdminProfile/UpdateAdminProfile";
import AdminDashboardMain from "./components/DashboardMainForAdmin/AdminDashboardMain";
import Dashboard from "./components/DashboardMainForAdmin/Dashboard/Dashboard";

// ======================================School================================================================
import Schools from "./components/DashboardMainForAdmin/Schools/Schools";
import AddNewSchool from "./components/DashboardMainForAdmin/Schools/AddNewSchool/AddNewSchool";
import ViewSchool from "./components/DashboardMainForAdmin/Schools/ViewSchool/ViewSchool";
import UpdateSchool from "./components/DashboardMainForAdmin/Schools/UpdateSchool/UpdateSchool";

// ======================================Seller================================================================

import Sellers from "./components/DashboardMainForAdmin/Sellers/Sellers";
import AddNewSeller from "./components/DashboardMainForAdmin/Sellers/AddNewSeller/AddNewSeller.js";
import ViewSeller from "./components/DashboardMainForAdmin/Sellers/ViewSeller/ViewSeller.js";
import UpdateSeller from "./components/DashboardMainForAdmin/Sellers/UpdateSeller/UpdateSeller.js";

// ====================================== Subscriptions======================================

import Subscriptions from "./components/DashboardMainForAdmin/Subscription/Subscription";
import AddNewSubscription from "./components/DashboardMainForAdmin/Subscription/AddNewSubscription/AddNewSubscription";
import ViewSubscriptions from "./components/DashboardMainForAdmin/Subscription/ViewSubscription/ViewSubscription";
import UpdateSubscription from "./components/DashboardMainForAdmin/Subscription/UpdateSubscription/UpdateSubscription";

// ========================================Fees module===========================================

import ViewRequestsForDemo from "./components/DashboardMainForAdmin/ViewRequestsForDemo/ViewRequestsForDemo.js";
import { ViewRequestDemoDetails } from "./components/DashboardMainForAdmin/ViewRequestsForDemo/ViewRequestDemoDetails.js";
import ContactUsEdprowise from "./components/DashboardMainForAdmin/Enquiry/ContactUsEdprowise.js";
import ViewEnquiryDetails from "./components/DashboardMainForAdmin/Enquiry/ViewEnquiryDetails.js";

// ================================ Admin Procurement Services========================================

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

import MainCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/MainCategory/MainCategory.js";
import AddMainCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/MainCategory/AddMainCategory.js";

import Category from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/Category/Category.js";
import AddCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/Category/AddCategory.js";

// import SubCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/SubCategory/SubCategory.js";

import SubCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/SubCategory/SubCategory.js";
import AddSubCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/SubCategory/AddSubCategory.js";
import UpdateSubCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/SubCategory/UpdateSubCategory.js";
// ================School Routes=============School Routes============School Routes===========================

import CompleteSchoolProfile from "./components/DashboardMainForSchool/CompleteSchoolProfile/CompleteSchoolProfile";
import CompleteSchoolProfileBySchool from "./components/DashboardMainForSchool/CompleteSchoolProfile/CompleteSchoolProfileBySchool.js";
// ================================================Seller Routes============================================
import CompleteSellerProfile from "./components/DashboardMainForSeller/CompleteSellerProfile/CompleteSellerProfile";

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
        path="/complete-your-school-profile"
        element={
          <PrivateRoute>
            <CompleteSchoolProfileBySchool />
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
        <Route index element={<Dashboard />} />
        {/* Main Dashboard Route */}
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
        {/* Seller Table page and it's Add, View, Update Routes */}
        <Route path="sellers" element={<Sellers />}>
          <Route path="add-new-seller" element={<AddNewSeller />} />
          <Route path="view-seller" element={<ViewSeller />} />
          <Route path="update-seller" element={<UpdateSeller />} />
        </Route>
        {/* =====================Fees module=========================================== */}
        <Route path="request-for-demo" element={<ViewRequestsForDemo />} />
        <Route
          path="request-for-demo/view-demo-request-details"
          element={<ViewRequestDemoDetails />}
        />
        <Route path="enquiry" element={<ContactUsEdprowise />} />
        <Route
          path="enquiry/enquity-details"
          element={<ViewEnquiryDetails />}
        />
        {/*======================= Procurement Services Routes================== */}
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
        {/* <Route
          path="procurement-services/define-goods-services/main-category"
          element={<MainCategory />}
        >
          <Route path="add-main-category" element={<AddMainCategory />} />
        </Route> */}
        {/* <Route
          path="procurement-services/define-goods-services/category"
          element={<Category />}
        >
          <Route path="add-category" element={<AddCategory />} />
        </Route> */}
        <Route
          path="procurement-services/good-services"
          element={<SubCategory />}
        >
          <Route path="add-goods-services" element={<AddSubCategory />} />
          <Route path="update-goods-services" element={<UpdateSubCategory />} />
        </Route>
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
        <Route
          path="procurement-services/quote-proposal"
          element={<QuoteProposalForAll />}
        />
        <Route
          path="procurement-services/invoice-for-edprowise"
          element={<InvoiceForEdProwiseForAll />}
        />
        <Route
          path="procurement-services/invoice-for-buyer"
          element={<InvoiceForBuyerForAll />}
        />
      </Route>

      {/* Website Routes */}

      <Route path="/" element={<WebsiteMain />}>
        <Route index element={<HomePage />} />

        <Route path="about-us" element={<AboutPage />} />
        <Route path="contact-us" element={<ContactUsPage />} />
        <Route path="order" element={<OrderDetailsWebSitePage />} />

        <Route path="services" element={<ServiceMainPage />}>
          <Route path="digital-services" element={<DigitalService />} />
          <Route path="academic-admin-services" element={<BusinessSection />} />
          <Route path="recruitment-services" element={<RecruitmentSection />} />
          <Route path="get-goods-services" element={<ProcurementSection />} />
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
