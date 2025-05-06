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

import StudentZoneFullBlog from "./components/CommunitySection/SubSection/StudentZoneBlog/StudentZoneFullBlog.js";
import StudentZoneFullBlog2 from "./components/CommunitySection/SubSection/StudentZoneBlog/StudentZoneFullBlog2.js";
import EducatorZoneBlog1 from "./components/CommunitySection/SubSection/EducatorZoneBlog/EducatorZoneBlog1.js";
import EducatorZoneBlog2 from "./components/CommunitySection/SubSection/EducatorZoneBlog/EducatorZoneBlog2.js";
import EducatorZoneBlog3 from "./components/CommunitySection/SubSection/EducatorZoneBlog/EducatorZoneBlog3.js";

import ForgotUserId from "./components/ForgotPasswordorUserId/ForgotUserId.js";
import NewUserId from "./components/ForgotPasswordorUserId/NewUserId.js";

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

// ======================================Admin-List================================================================
import Admins from "./components/DashboardMainForAdmin/AllAdmin/Admin";
import AddNewAdmin from "./components/DashboardMainForAdmin/AllAdmin/AddNewAdmin/AddNewAdmin";
import UpdateAdmin from "./components/DashboardMainForAdmin/AllAdmin/UpdateAdmin/UpdateAdmin";

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

// =====================================EmailSettings====================================
// import SMTPHostSettings from "./components/DashboardMainForAdmin/EmailSMTPSettings/SMTPHostSettings/SMTPHostSettings.js";
// import EmailTemplatesList from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplatesTable/EmailTemplatesList.js";
// import SchoolRegistrationEmailTamplate from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplate/Tamplates/SchoolRegistrationEmailTamplate.js";
// import SellerRegistrationEmailTamplate from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplate/Tamplates/SellerRegistrationEmailTamplate.js";
// import PasswordUpdateEmailTamplate from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplate/Tamplates/PasswordUpdate.js";

// ========================================Fees module===========================================

import ViewRequestsForDemo from "./components/DashboardMainForAdmin/ViewRequestsForDemo/ViewRequestsForDemo.js";
import { ViewRequestDemoDetails } from "./components/DashboardMainForAdmin/ViewRequestsForDemo/ViewRequestDemoDetails.js";
import ContactUsEdprowise from "./components/DashboardMainForAdmin/Enquiry/ContactUsEdprowise.js";
import ViewEnquiryDetails from "./components/DashboardMainForAdmin/Enquiry/ViewEnquiryDetails.js";

// ================================ Admin Procurement Services========================================
import AdminProcurementDashboard from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/ProcurementDashboard/ProcurementDashboard";

import TrackQuoteTableForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/TrackQuoteTable";
import ViewRequestedQuoteForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/ViewRequestedQuote/ViewRequestedQuote";
import ViewAllQuoteTableForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/ViewAllQuoteTable/ViewAllQuoteTable";
import ViewQuoteForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackQuotes/ViewQuote/ViewQuote";

import BankDetailsTable from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/BankDetails/BankDetailsTable";
import AddNewBankDetail from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/BankDetails/AddNewBankDetail/AddNewBankDetail";
import UpdateBankDetail from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/BankDetails/UpdateBankDetail/UpdateBankDetail";

import TrackOrderHistoryTableForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackOrderHistory/TrackOrderHistoryTable";
import ViewOrderHistoryForAdmin from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/TrackOrderHistory/ViewOrderHistory/ViewOrderHistory";

import SubCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/SubCategory/SubCategory.js";
import AddSubCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/SubCategory/AddSubCategory.js";
import UpdateSubCategory from "./components/DashboardMainForAdmin/ProcurementServicesForAdmin/DefineGoodsAndServices/SubCategory/UpdateSubCategory.js";

// ====================EmailSettings====================================
// add on admin umesh new routes
import SMTPHostSettings from "./components/DashboardMainForAdmin/EmailSMTPSettings/SMTPHostSettings/SMTPHostSettings.js";
import EmailTemplatesList from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplatesTable/EmailTemplatesList.js";
import MarketingEmail from "./components/DashboardMainForAdmin/EmailSMTPSettings/Marketing/MarketingEmail.js";

// ================School Routes=============School Routes============School Routes===========================

import CompleteSchoolProfile from "./components/DashboardMainForSchool/CompleteSchoolProfile/CompleteSchoolProfile";
import CompleteSchoolProfileBySchool from "./components/DashboardMainForSchool/CompleteSchoolProfile/CompleteSchoolProfileBySchool.js";
import UpdateSchoolProfile from "./components/DashboardMainForSchool/UpdateSchoolProfile/UpdateSchoolProfile";
import ViewSchoolProfile from "./components/DashboardMainForSchool/ViewSchoolProfile/ViewSchoolProfile";
import ChangePasswordForSchoolAdmin from "./components/DashboardMainForSchool/ChangePassword/ChangePassword";

import SchoolDashboardMain from "./components/DashboardMainForSchool/SchoolDashboardMain";
import SchoolDashboard from "./components/DashboardMainForSchool/SchoolDashboard/SchoolDashboard";

// ================================ School Procurement Services========================================
import SchoolProcurementDashboard from "./components/DashboardMainForSchool/ProcurementServices/ProcurementDashboard/ProcurementDashboard";

import TrackQuoteTable from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/TrackQuoteTable";
import RequestQuote from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/RequestQuote/RequestQuote";

import ViewRequestedQuote from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/ViewRequestedQuote/ViewRequestedQuote";

import ViewQuote from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/ViewQuote/ViewQuote";
import ViewAllQuoteTable from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/ViewAllQuoteTable/ViewAllQuoteTable";

import ViewCart from "./components/DashboardMainForSchool/ProcurementServices/TrackQuotes/Cart/ViewCart";

import TrackOrderHistoryTable from "./components/DashboardMainForSchool/ProcurementServices/TrackOrderHistory/TrackOrderHistoryTable";
import ViewOrderHistory from "./components/DashboardMainForSchool/ProcurementServices/TrackOrderHistory/ViewOrderHistory/ViewOrderHistory";

import PayToEdProwiseForSchool from "./components/DashboardMainForSchool/ProcurementServices/PayToEdProwise/PayToEdProwise.js";

// =====================================School Fees Module==============================================

// =====================================School Fees Module==============================================

import StudentRegisterListTable from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/StudentRegisterListTable.js";
import StudentRegistrationForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/NewStudentRegistration/StudentRegistrationForm.js";
import ViewStudentInfoRegister from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/ViewStudentInfoRegister/ViewStudentInfoRegister.js";
import UpdateStudentRegistrationForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/UpdateStudentRegistrationForm.js/UpdateStudentRegistrationForm.js";
import StudentAdmissionListTable from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/StudentAdmissionListTable.js";
import StudentAdmissionForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/StudentAdmissionForm/StudentAdmissionForm.js";
import ViewStudentAdmissionDetails from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/ViewStudentAdmissionDetail/ViewStudentAdmissionDetails.js";
import UpdateAdmissionForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/UpdateAdmissionDetail/UpdateAdmissionForm.js";
import StudentTCFormTable from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentTCForm/StudentTCFormTable.js";
import StudentAddTCForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentTCForm/StudentTCForm/StudentAddTCForm.js";
import ViewTCFormDetails from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentTCForm/ViewTCFormDetails/ViewTCFormDetails.js";
import UpdateTCForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentTCForm/UpdateTCform/UpdateTCForm.js";
import ConcessionStudentListTable from "./components/DashboardMainForSchool/FeesModuleServices/Form/ConcessionForm/ConcessionStudentListTable.js";
import AddConcessionForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/ConcessionForm/ConcessionForm/AddConcessionForm.js";
import ViewStudentConcessionDetails from "./components/DashboardMainForSchool/FeesModuleServices/Form/ConcessionForm/ViewStudentConcessionForm/ViewStudentConcessionDetails.js";
import UpdateConcessionForm from "./components/DashboardMainForSchool/FeesModuleServices/Form/ConcessionForm/UpdateConcessionForm/UpdateConcessionForm.js";

import ClassAndSection from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/ClassAndSection/ClassAndSection.js";
import FeesStructure from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/FeesStructure/FeesStructure.js";
import UpdateFeesStructure from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/FeesStructure/UpdateFeesStructure.js";
import ViewFeesStructure from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/FeesStructure/ViewFeesStructure.js";
import SchoolShifts from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Shifts/SchoolShifts.js";
import CreateClassAndSection from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/ClassAndSection/CreateClassAndSection.js";
import UpdateClassAndSection from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/ClassAndSection/UpdateClassAndSection.js";
import ViewClassAndSection from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/ClassAndSection/ViewClassAndSection.js";
import TypeOfFeesList from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/DefineTypesOfFees/TypeOfFeesList.js";
import AddFeesType from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/DefineTypesOfFees/AddFeesType.js";
import UpdateFeesType from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/DefineTypesOfFees/UpdateFeesType.js";
import AddShifts from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Shifts/AddShifts.js";
import UpdateShifts from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Shifts/UpdateShifts.js";
import FeesStructureListTable from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/FeesStructure/FeesStructureListTable.js";
import SchoolFeesReceipts from "./components/DashboardMainForSchool/FeesReceipts/SchoolFees/SchoolFeesReceipts.js";
import StudentReceipts from "./components/DashboardMainForSchool/FeesReceipts/SchoolFees/Recipt.js";
import RegistrationOfficialDetails from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/NewStudentRegistration/RegistrationOfficialDetails.js";
import AdmissionOfficialInformation from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/StudentAdmissionForm/AdmissionOfficialInformation.js";
import PrefixSetting from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/RegistartionPrefix/PrefixTable.js";
import AddPrefix from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/RegistartionPrefix/AddPrefix.js";
import AdmissionPrefix from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/AdmissionPrefix/PrefixTable.js";
import AddAdmissionPrefix from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/AdmissionPrefix/AddPrefix.js";
import Fine from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Fine/FineTable.js";
import AddFine from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Fine/Addfine.js";

// ===================================PayRoll===========================
import EmployeeRegistrationList from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/EmployeeRegistration/EmployeeRegistrationList.js";
import AddEmployeeRegistration from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/EmployeeRegistration/AddEmployeeRegistration.js";
import UpdateEmployeeRegistrationForm from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/EmployeeRegistration/UpdateEmployeeRegistrationForm.js";
import ViewEmployeeRegisterDetails from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/EmployeeRegistration/ViewEmployeeRegisterDetails.js";
import UpdateEmployeeDetails from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/UpdateDetails/UpdateEmployeeDetails.js";
import CTCUpdate from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/CTCUpdate/CTCUpdate.js";
import DefineCtcComponentsList from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/CTCDefineComponents/DefineCtcComponentsList.js";
import DefineCtcCOmponents from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/CTCDefineComponents/DefineCtcCOmponents.js";
import EmployeeDetails from "./components/DashboardMainForSchool/PayrollModule/EmployeeSelfService/EmployeeDetails/EmployeeDetails.js";
import AddProcessPayroll from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/ProcessPayroll/AddProcessPayroll.js";
import AddSalaryIncrement from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/SalaryIncrement/AddSalaryIncrement.js";
import Form16 from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/Form16/Form16.js";

// ======================Seller Routes==========================Seller Routes=====================Seller Routes=======================
import CompleteSellerProfile from "./components/DashboardMainForSeller/CompleteSellerProfile/CompleteSellerProfile";

import ViewSellerProfile from "./components/DashboardMainForSeller/ViewSellerProfile/ViewSellerProfile";
import UpdateSellerProfile from "./components/DashboardMainForSeller/UpdateSellerProfile/UpdateSellerProfile";
import ChangePasswordForSeller from "./components/DashboardMainForSeller/ChangePassword/ChangePassword";
import SellerDashboardMain from "./components/DashboardMainForSeller/SellerDashboardMain";
import SellerDashboard from "./components/DashboardMainForSeller/SellerDashboard/SellerDashboard";

import SellerProcurementDashboard from "./components/DashboardMainForSeller/ProcurementServicesForSeller/ProcurementDashboard/ProcurementDashboard";

import TrackQuoteTableForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackQuotes/TrackQuoteTable";
import ViewRequestedQuoteForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackQuotes/ViewRequestedQuote/ViewRequestedQuote";

import SubmitQuote from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackQuotes/SubmitQuote/SubmitQuote";

import TrackOrderHistoryTableForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackOrderHistory/TrackOrderHistoryTable";
import ViewOrderHistoryForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/TrackOrderHistory/ViewOrderHistory/ViewOrderHistory";

import PayToEdprowiseForSeller from "./components/DashboardMainForSeller/ProcurementServicesForSeller/PayToEdProwise/PayToEdProwise.js";

// umesh Added
import ForgotPassword from "./components/ForgotPasswordorUserId/ForgotPassword.js";
import NewPassword from "./components/ForgotPasswordorUserId/NewPassword.js";

// 404 pages

import Page404ForWebsite from "./components/Pages404/Page404ForWebsite.js";
import Page404ForDashboard from "./components/Pages404/Page404ForDashboard.js";

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
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password/new-password"
        element={
          <PublicRoute>
            <NewPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-userId"
        element={
          <PublicRoute>
            <ForgotUserId />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-userId/new-userId"
        element={
          <PublicRoute>
            <NewUserId />
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

      <Route path="/website-page-not-found" element={<Page404ForWebsite />} />
      {/* =========================Website Routes========================= */}

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

        <Route
          path="community-connect/student-zone/proposed-exam-reforms-by-CBSE"
          element={<StudentZoneFullBlog />}
        />

        <Route
          path="community-connect/student-zone/how-to-be-successful"
          element={<StudentZoneFullBlog2 />}
        />

        <Route
          path="community-connect/educator-zone/how-to-be-successful-teacher"
          element={<EducatorZoneBlog1 />}
        />

        <Route
          path="community-connect/educator-zone/teaching-strategies-pedagogy"
          element={<EducatorZoneBlog2 />}
        />

        <Route
          path="community-connect/educator-zone/teacher-well-being"
          element={<EducatorZoneBlog3 />}
        />

        <Route
          path="*"
          element={<Navigate to="/website-page-not-found" replace />}
        />
      </Route>

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
        <Route path="admins" element={<Admins />}>
          <Route path="add-new-admin" element={<AddNewAdmin />} />
          <Route path="update-admin" element={<UpdateAdmin />} />
        </Route>

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
          path="procurement-services/dashboard"
          element={<AdminProcurementDashboard />}
        />
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

        {/*=============================== Email routes================== */}

        <Route path="email/smtp-setting" element={<SMTPHostSettings />} />
        <Route path="email/templates" element={<EmailTemplatesList />} />
        <Route path="email/marketing" element={<MarketingEmail />} />

        <Route path="*" element={<Page404ForDashboard />} />
      </Route>
      {/* ==========================================Schhool Routes================================*/}
      <Route
        path="/school-dashboard"
        element={
          <PrivateRoute>
            <SchoolDashboardMain />
          </PrivateRoute>
        }
      >
        <Route index element={<SchoolProcurementDashboard />} />
        {/*School Dashboard Route */}
        <Route path="view-school-profile" element={<ViewSchoolProfile />} />
        <Route path="update-school-profile" element={<UpdateSchoolProfile />} />
        <Route
          path="change-school-admin-password"
          element={<ChangePasswordForSchoolAdmin />}
        />

        <Route index element={<SchoolDashboard />} />

        {/* ============Procurement Services========== */}
        <Route
          path="procurement-services/dashboard"
          element={<SchoolProcurementDashboard />}
        />
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

        <Route path="procurement-services/view-cart" element={<ViewCart />} />

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
        <Route
          path="procurement-services/quote-proposal"
          element={<QuoteProposalForAll />}
        />

        <Route
          path="procurement-services/invoice-for-buyer"
          element={<InvoiceForBuyerForAll />}
        />

        {/* ***********Fees Module********* */}
        <Route
          path="fees-module/form/registration"
          element={<StudentRegisterListTable />}
        />
        <Route
          path="fees-module/form/registration-form"
          element={<StudentRegistrationForm />}
        />
        <Route
          path="fees-module/form/registed-student-info"
          element={<ViewStudentInfoRegister />}
        />
        <Route
          path="fees-module/form/update-registed-student-info"
          element={<UpdateStudentRegistrationForm />}
        />
        <Route
          path="fees-module/form/registration-form/sucess"
          element={<RegistrationOfficialDetails />}
        />

        <Route
          path="fees-module/form/admission-list"
          element={<StudentAdmissionListTable />}
        />
        <Route
          path="fees-module/form/admission-form"
          element={<StudentAdmissionForm />}
        />
        <Route
          path="fees-module/form/admission-form/admission-details"
          element={<AdmissionOfficialInformation />}
        />
        <Route
          path="fees-module/form/view-admission-details"
          element={<ViewStudentAdmissionDetails />}
        />
        <Route
          path="fees-module/form/update-admission-form"
          element={<UpdateAdmissionForm />}
        />

        <Route
          path="fees-module/form/trasfer-certificate-list"
          element={<StudentTCFormTable />}
        />
        <Route
          path="fees-module/form/trasfer-certificate-form"
          element={<StudentAddTCForm />}
        />
        <Route
          path="fees-module/form/view-trasfer-certificate-details"
          element={<ViewTCFormDetails />}
        />
        <Route
          path="fees-module/form/update-trasfer-certificate-form"
          element={<UpdateTCForm />}
        />

        <Route
          path="fees-module/form/concession-table"
          element={<ConcessionStudentListTable />}
        />
        <Route
          path="fees-module/form/concession-form"
          element={<AddConcessionForm />}
        />
        <Route
          path="fees-module/form/view-concession-details"
          element={<ViewStudentConcessionDetails />}
        />
        <Route
          path="fees-module/form/update-concession-form"
          element={<UpdateConcessionForm />}
        />

        <Route
          path="fees-module/admin-setting/class-section"
          element={<ClassAndSection />}
        />
        <Route
          path="fees-module/admin-setting/class-section/create-class-section"
          element={<CreateClassAndSection />}
        />

        <Route
          path="fees-module/admin-setting/class-section/update-class-section"
          element={<UpdateClassAndSection />}
        />

        <Route
          path="fees-module/admin-setting/class-section/view-class-section"
          element={<ViewClassAndSection />}
        />

        <Route
          path="fees-module/admin-setting/fees-type-list"
          element={<TypeOfFeesList />}
        />
        <Route
          path="fees-module/admin-setting/fees-type-list/add-fees-type"
          element={<AddFeesType />}
        />

        <Route
          path="fees-module/admin-setting/fees-type-list/update-fees-type"
          element={<UpdateFeesType />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure"
          element={<FeesStructureListTable />}
        />
        <Route
          path="fees-module/admin-setting/fees-structure/add-fees-structure"
          element={<FeesStructure />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/update-fees-structure"
          element={<UpdateFeesStructure />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/view-fees-structure"
          element={<ViewFeesStructure />}
        />

        <Route
          path="fees-module/admin-setting/shifts"
          element={<SchoolShifts />}
        />
        <Route
          path="fees-module/admin-setting/shifts/add-shift"
          element={<AddShifts />}
        />

        <Route
          path="fees-module/admin-setting/shifts/update-shift"
          element={<UpdateShifts />}
        />

        <Route
          path="fees-module/admin-setting/prefix-setting/registartion-prefix"
          element={<PrefixSetting />}
        />
        <Route
          path="fees-module/admin-setting/prefix-setting/registartion-prefix/add-prefix"
          element={<AddPrefix />}
        />

        <Route
          path="fees-module/admin-setting/prefix-setting/admission-prefix"
          element={<AdmissionPrefix />}
        />
        <Route
          path="fees-module/admin-setting/prefix-setting/admission-prefix/add-prefix"
          element={<AddAdmissionPrefix />}
        />

        <Route path="fees-module/admin-setting/fine" element={<Fine />} />
        <Route
          path="fees-module/admin-setting/fine/add-fine"
          element={<AddFine />}
        />

        <Route
          path="fees-module/fees-receipts/school-fees"
          element={<SchoolFeesReceipts />}
        />

        <Route
          path="fees-module/fees-receipts/school-fees/student-receipts"
          element={<StudentReceipts />}
        />

        {/* *****************************Payroll Module ***************************************** */}
        <Route
          path="payroll-module/admin-setting/register-employee-list"
          element={<EmployeeRegistrationList />}
        />

        <Route
          path="payroll-module/admin-setting/registration-form"
          element={<AddEmployeeRegistration />}
        />

        <Route
          path="payroll-module/admin-setting/update-registration-form"
          element={<UpdateEmployeeRegistrationForm />}
        />

        <Route
          path="payroll-module/admin-setting/view-registration-form"
          element={<ViewEmployeeRegisterDetails />}
        />

        <Route
          path="payroll-module/admin-setting/lwd-details"
          element={<UpdateEmployeeDetails />}
        />

        <Route
          path="payroll-module/admin-setting/CTC-Update"
          element={<CTCUpdate />}
        />

        <Route
          path="payroll-module/admin-setting/define-ctc-components-list"
          element={<DefineCtcComponentsList />}
        />

        <Route
          path="payroll-module/admin-setting/define-ctc-components"
          element={<DefineCtcCOmponents />}
        />

        <Route
          path="payroll-module/admin-setting/payroll-process"
          element={<AddProcessPayroll />}
        />

        <Route
          path="payroll-module/admin-setting/salary-increment"
          element={<AddSalaryIncrement />}
        />

        <Route
          path="payroll-module/admin-setting/form-16-list"
          element={<Form16 />}
        />

        {/* ************Employee Self Services */}
        <Route
          path="payroll-module/employee-services/update-details"
          element={<EmployeeDetails />}
        />

        <Route path="*" element={<Page404ForDashboard />} />
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

        <Route path="*" element={<Page404ForDashboard />} />
        <Route index element={<SellerProcurementDashboard />} />

        <Route path="view-seller-profile" element={<ViewSellerProfile />} />
        <Route path="update-seller-profile" element={<UpdateSellerProfile />} />

        <Route
          path="change-seller-password"
          element={<ChangePasswordForSeller />}
        />

        {/* Procurement Services Routes */}
        <Route
          path="procurement-services/dashboard"
          element={<SellerProcurementDashboard />}
        />

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
          element={<PayToEdprowiseForSeller />}
        />

        <Route
          path="procurement-services/invoice-for-edprowise"
          element={<InvoiceForEdProwiseForAll />}
        />

        <Route
          path="procurement-services/invoice-for-buyer"
          element={<InvoiceForBuyerForAll />}
        />
        <Route
          path="procurement-services/quote-proposal"
          element={<QuoteProposalForAll />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
