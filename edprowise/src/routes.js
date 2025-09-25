import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PagenotFound404 from "./404page.js";
import UnauthorizedAccess from "./UnauthorizedPage.js";
import { ThemeProvider } from "./components/ThemeProvider";
import RemoveThemeAttribute from "./RemoveThemeAttribute";
import Test from "../src/components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/SchoolFees/test.js";

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
import SMTPHostSettings from "./components/DashboardMainForAdmin/EmailSMTPSettings/SMTPHostSettings/SMTPHostSettings.js";
import EmailTemplatesList from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplatesTable/EmailTemplatesList.js";
import SchoolRegistrationEmailTamplate from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplate/Tamplates/SchoolRegistrationEmailTamplate.js";
import SellerRegistrationEmailTamplate from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplate/Tamplates/SellerRegistrationEmailTamplate.js";
import PasswordUpdateEmailTamplate from "./components/DashboardMainForAdmin/EmailSMTPSettings/EmailTamplate/Tamplates/PasswordUpdate.js";

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
import SchoolFeesReceipts from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/SchoolFees/SchoolFeesReceipts.js";
import SchoolFeesReceiptsView from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/SchoolFees/ViewRecipt.js";
import StudentReceipts from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/SchoolFees/Recipt.js";
import FeeReceiptsSchoolFees from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/SchoolFees/FeeReceiptsForm.js";
import BoardRegistrationFee from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/BoardRegistrationFees/BoardRegistrationFees.js";
import BoardRegistrationFeeReceipts from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/BoardRegistrationFees/BoardRegistrationReceipts.js";
import BoardExamFee from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/BoardExamFees/BoardExamFee.js";
import BoardExamFeeReceipts from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/BoardExamFees/BoardExamReceipts.js";
import RegistrationOfficialDetails from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentRegistration/NewStudentRegistration/RegistrationOfficialDetails.js";
import AdmissionOfficialInformation from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentAdmissionForm/StudentAdmissionForm/AdmissionOfficialInformation.js";
import TcOfficialInformation from "./components/DashboardMainForSchool/FeesModuleServices/Form/StudentTCForm/StudentTCForm/TCOfficialInformation.js";
import ConcessionFormInformation from "./components/DashboardMainForSchool/FeesModuleServices/Form/ConcessionForm/ConcessionForm/ConcessionOfficialInformation.js";
import PrefixSetting from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/RegistartionPrefix/PrefixTable.js";
import AddPrefix from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/RegistartionPrefix/AddPrefix.js";
import AdmissionPrefix from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/AdmissionPrefix/PrefixTable.js";
import AddAdmissionPrefix from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/PrefixSetting/AdmissionPrefix/AddPrefix.js";
import Fine from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Fine/FineTable.js";
import AddFine from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Fine/Addfine.js";
import OneTimeFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/OneTimeFees/OneTimeFeesTable.js";
import AddOneTimeFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/OneTimeFees/AddoneTimeFees.js";
import UpdateOneTimeFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/OneTimeFees/UpdateOneTimeFees.js";
import ViewOneTimeFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/OneTimeFees/ViewOneTimeFees.js";

import AddBoardRegistrationFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardRegistrationFees/AddBoardRegistrationFees.js";
import UpdateBoardRegistrationFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardRegistrationFees/UpdateBoardRegistration.js";
import ViewBoardRegistrationFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardRegistrationFees/ViewBoardRegistration.js";
import BoardRegistrationFeesList from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardRegistrationFees/BoardRegistrationFeesTable.js";

import AddBoardExamFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardExamFees/AddBoardExamFees.js";
import UpdateBoardExamFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardExamFees/UpdateBoardExamFees.js";
import ViewBoardExamFees from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardExamFees/ViewBoardExamFees.js";
import BoardExamFeesList from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/BoardFees/BoardExamFees/BoardExamFeesTable.js";

import StudentPromotionTable from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Promotion/StudentPromotionTable.js";
import PromoteStudent from "./components/DashboardMainForSchool/FeesModuleServices/AdminSetting/Promotion/PromoteStudent.js";
import FeesRefund from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/FeesRefund/Feesrefund.js";
import CreateFeesRefund from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/FeesRefund/CreateFeesreFund.js";
import Refundreceipt from "./components/DashboardMainForSchool/FeesModuleServices/FeesReceipts/FeesRefund/RefundReceipt.js";

import StudentProfile from "./components/DashboardMainForSchool/FeesModuleServices/StudentProfile/StudentAdmissionListTable.js";
import StudentProfileUpdate from "./components/DashboardMainForSchool/FeesModuleServices/StudentProfile/UpdateAdmissionDetail/UpdateAdmissionForm.js";
import StudentProfileView from "./components/DashboardMainForSchool/FeesModuleServices/StudentProfile/ViewStudentAdmissionDetail/ViewStudentAdmissionDetails.js";
// ===================================================Reports==========================================================================================================//
import StudentLedger from "./components/DashboardMainForSchool/FeesModuleServices/Reports/StudentLedger/studentledger.js";

// ===================================================Genral Reports====================================================//
import GenralRegistartionFees from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/RegistartionFees/RegistartionFees.js";
import GenralAdmissionFees from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/AdmissionFees/AdmissionFees.js";
import GenralTCFees from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/TCReport/TCFees.js";
import GenralBoardRegistration from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/BoardRegistrationFees/BoardRegistrationFees.js";
import GenralBoardExam from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/BoardExamFees/BoardExamFees.js";
import GenralSchoolFees from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/SchoolFees/SchoolFees.js";
import GenralLateFees from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/LateandExcessFees/LateandExcessFee.js";
import GenralFeesReundCancelled from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/FeesRefund/FeesRefund.js";
import GenralFeesChequeReturn from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/ChequeReturn/FeesChequeReturn.js";
import GenralFeesReundReport from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/FeesRefund/FeesRefund.js";
import GenralFeesStructure from "./components/DashboardMainForSchool/FeesModuleServices/Reports/GenralReport/FeeStructure/FeeStructureReport.js";

// ===================================================Daily Collectioon====================================================//
import DailyCollectionDatsewiseCollection from "./components/DashboardMainForSchool/FeesModuleServices/Reports/DailyCollectionReport/DateWiseCollection/DateWiseCollection.js";
import DailyCollectionDatsewiseCollectionWithConcession from "./components/DashboardMainForSchool/FeesModuleServices/Reports/DailyCollectionReport/DateWiseCollectionWithConcession/DateWiseCollection.js";
import DailyCollectionStudentwiseCollection from "./components/DashboardMainForSchool/FeesModuleServices/Reports/DailyCollectionReport/StudentWiseCollection/StudentWiseCollection.js";
import DailyCollectionStudentwiseCollectionWithConcesssion from "./components/DashboardMainForSchool/FeesModuleServices/Reports/DailyCollectionReport/StudentWiseCollectionWithConcession/StudentWiseCollection.js";

// ===================================================Concession===================================================//
import ConcessionReportDatewise from "./components/DashboardMainForSchool/FeesModuleServices/Reports/FeesConcessionReport/FeesConcessionReportDatewise/FeesConcessionReportDatewise.js";
import ConcessionReportStudentwise from "./components/DashboardMainForSchool/FeesModuleServices/Reports/FeesConcessionReport/FeesConcessionReportStudentwise/FeesConcessionReportStudentWise.js";

// ===================================================Advanced Report==================================================//
import LossOfFeeDuetoLeftstudent from "./components/DashboardMainForSchool/FeesModuleServices/Reports/AdvancedReport/LossofFeeDueToleftStudent/Leftfeestudent.js";
import LossOfFeeDuetoLateAdmssion from "./components/DashboardMainForSchool/FeesModuleServices/Reports/AdvancedReport/LossofFeeDueTolateAdmission/LossoflateAdmission.js";
import DefaulterFees from "./components/DashboardMainForSchool/FeesModuleServices/Reports/AdvancedReport/DefaulterFees/DefaulterFees.js";
import ArrearFeesReceivedReport from "./components/DashboardMainForSchool/FeesModuleServices/Reports/AdvancedReport/ArrearFeesReceived/ArrearFeesReport.js";
import StudentMaster from "./components/DashboardMainForSchool/FeesModuleServices/Reports/AdvancedReport/StudentMaster/StudentMaster.js";

// ===================================================FeesRecom==================================================//

import FeesReconHaedwise from "./components/DashboardMainForSchool/FeesModuleServices/Reports/FeesRecon/HaedWise/FeesReconHaedwise.js";
// ================================================Seller Routes============================================
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
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.js";
import NewPassword from "./components/ForgotPassword/NewPassword.js";


// ================================Comman Pages================================================//
import SchoolCommanpage from "./components/CommanPage/CommanPageCardsSchool.js";
import SchoolFeesManagementYear from "./components/CommanPage/YearPage.js";
import SchoolPayrollAcademicYear from "./components/CommanPage/PayrollYearPage.js";
import StudentManagementYear from  "./components/CommanPage/StudentyearPage.js"
// ===============================Payroll Module ===========================
import EmployeeRegistrationFormList from "./components/DashboardMainForSchool/PayrollModule/Employer/EmployeeRegistration/EmployeeRegistrationFormList.jsx";
import AddEmployeeRegistrationForm from "./components/DashboardMainForSchool/PayrollModule/Employer/EmployeeRegistration/AddEmployeeRegistrationForm.jsx";
import UpdateEmployeeRegistration from "./components/DashboardMainForSchool/PayrollModule/Employer/EmployeeRegistration/UpdateEmployeeRegistration.jsx";
import ViewEmployeeRegistrationFormDetails from "./components/DashboardMainForSchool/PayrollModule/Employer/EmployeeRegistration/ViewEmployeeRegistrationFormDetails.jsx";
import EmployerUpdateEmployeeDetails from "./components/DashboardMainForSchool/PayrollModule/Employer/UpdateDetails/EmployerUpdateEmployeeDetails.js";
import FreezeITDeclaration from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/FreezeITDeclaration/FreezeITDeclaration.js";
import SchoolDefineCtcComponentsList from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/CTCDefineComponents/SchoolDefineCtcComponentsList.jsx";
import DefinePayrollGrade from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/Grade/DefinePayrollGrade.js";
import DefineEmployeeCategory from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/DefineCategory/DefineEmployeeCategory.js";
import AnnualLeaveAdminSetting from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/AnnualLeaveUpdate/AnnualLeaveAdminSetting.jsx";
import CarryForwardSetting from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/AnnualLeaveUpdate/CarryForwordSetting.jsx";
import EmployeeOvertimeAllowanceRate from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/OvertimeAllowanceRate/EmployeeOvertimeAllowanceRate.jsx";
import EmployeeIdPrefixTable from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/EmployeeIdSettingPrefix/EmployeeIdPrefixTable.jsx";
import EmployeeIdSettings from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/EmployeeIdSettingPrefix/EmployeeIdSettings.js";
import UpdateEmployeeIdSettings from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/EmployeeIdSettingPrefix/UpdateEmployeeIdSettings.jsx";
import DefineEmployeeJobDesignation from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/JobDesignation/DefineEmployeeJobDesignation.js";
import PayrollSMTPSettings from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/PayrollSMTPEmailSettings/PayrollSMTPSettings.jsx";
import SchoolHolidayCalendar from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/SchoolHolidayCalendar/SchoolHolidayCalendar.jsx";
import DefineAcademicYear from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/DefineAcadmicYear/DefineAcadmicYear.jsx";
import ProvidentFundSettings from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/ProvidentFoundSetting/ProvidentFundSettings.jsx";
import EmployeeDashboardMain from "./components/DashboardMainForEmployee/EmployeeDashboardMain.js";
import UpdatePayrollEmployeeDetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/EmployeeDetails/UpdatePayrollEmployeeDetails.jsx";
import EmployeeProvidentFund from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ProvidentFund/EmployeeProvidentFund.jsx";
import EmployeeItDeclaration from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/EmployeeItDeclaration.js";
import EmployeeRentDetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/EmployeeRentDetails.js";
import EmployeeMarkAttendance from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/EmployeeAttendance/MarkAttendance/EmployeeMarkAttendance.jsx";
import EmployeeLeaveDetailsAndApply from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/EmployeeAttendance/ApplyForLeave/EmployeeLeaveDetailsAndApply.jsx";
import EmployeeAttendanceReport from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/EmployeeAttendance/AttendanceReport/EmployeeAttendanceReport.jsx";
import OvertimeAllowanceList from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/OvertimeAllowance/OvertimeAllowanceList.jsx";
import ApplyOvertimeAllowance from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/OvertimeAllowance/ApplyOvertimeAllowance/ApplyOvertimeAllowance.jsx";
import ViewOvertimeAllowance from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/OvertimeAllowance/ViewOvertimeAllowance/ViewOvertimeAllowance.jsx";
import UpdateOvertimeAllowance from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/OvertimeAllowance/UpdateOvertimeAllowance/UpdateOvertimeAllowance.jsx";
import EmployeePreviousEmploymentIncome from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/PreviousEmploymentIncome/EmployeePreviousEmploymentIncome.jsx";
import EmployeeIncomeTaxComputationSheet from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/IncomeTaxComputationSheet/EmployeeIncomeTaxComputationSheet.jsx";
import EmployeeLTADetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/EmployeeLTADetails.js";
import AddLtaExamptionDetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/AddLtaExamptionDetails.js";
import TelephoneAllowanceDetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/TelephoneAllowanceDetails.jsx";
import AddTelephoneAllowanceDetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/AddTelephoneAllowanceDetails.jsx";
import InternetAllowanceDetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/InternetAllowanceDetails.jsx";
import AddInternetAllowanceDetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/AddInternetAllowanceDetails.jsx";
import ViewLtaExamptionDetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/ViewLtaExamptionDetails.js";
import EmployeeSupportingSubmittedForTaxList from "./components/DashboardMainForSchool/PayrollModule/Employer/CheckSupportingSubmittedForTax/EmployeeSupportingSubmittedForTaxList.jsx";
import VerifySupportingSubmittedForTaxList from "./components/DashboardMainForSchool/PayrollModule/Employer/CheckSupportingSubmittedForTax/VerifySupportingSubmittedForTaxList.jsx";
import VerifyEmployerRentDetails from "./components/DashboardMainForSchool/PayrollModule/Employer/CheckSupportingSubmittedForTax/VerifyEmployerRentDetails.jsx";
import ViewTelephoneExamptionDetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/ViewTelephoneExamptionDetails.js";
import ViewInternetExamptionDetails from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/ITDeclaration/ViewInternetExamptionDetails.js";
import CTCUpdatedEmployeeTable from "./components/DashboardMainForSchool/PayrollModule/Employer/EmployerCTCUpdate/CTCUpdatedEmployeeTable.js";
import EmployerCTCUpdate from "./components/DashboardMainForSchool/PayrollModule/Employer/EmployerCTCUpdate/EmployerCTCUpdate.js";
import ViewEmployeeCTCDetails from "./components/DashboardMainForSchool/PayrollModule/Employer/EmployerCTCUpdate/ViewEmployeeCTCDetails.js";
import UpdateEmployeeCTCDetails from "./components/DashboardMainForSchool/PayrollModule/Employer/EmployerCTCUpdate/UpdateEmployeeCTCDetails.jsx";
import PayrollCTCMaster from "./components/DashboardMainForSchool/PayrollModule/Employer/CTCMaster/PayrollCTCMaster.jsx";
import SingleEmployeeSalaryIncrement from "./components/DashboardMainForSchool/PayrollModule/Employer/SalaryIncrement/SingleEmployeeIncrement/SingleEmployeeSalaryIncrement.jsx";
import BulkEmployeeSalaryIncrement from "./components/DashboardMainForSchool/PayrollModule/Employer/SalaryIncrement/BulkEmployeeIncrement/BulkEmployeeSalaryIncrement.jsx";
import LeaveApplyEmployeeList from "./components/DashboardMainForSchool/PayrollModule/Employer/Attendance/EmployeeApplyForLeave/LeaveApplyEmployeeList.jsx";
import ViewEmployeeAttendanceReports from "./components/DashboardMainForSchool/PayrollModule/Employer/Attendance/EmployeeAttendenceReport/ViewEmployeeAttendanceReports.jsx";
import EmployeeLeaveRecords from "./components/DashboardMainForSchool/PayrollModule/Employer/Attendance/LeaveRecords/EmployeeLeaveRecords.jsx";
import OvertimeAllowanceApproval from "./components/DashboardMainForSchool/PayrollModule/Employer/OvertimeAllowance/OvertimeAllowanceApproval/OvertimeAllowanceApproval.jsx";
import ViewOvertimeAllowanceDetails from "./components/DashboardMainForSchool/PayrollModule/Employer/OvertimeAllowance/OvertimeAllowanceApproval/ViewOvertimeAllowanceDetails.jsx";
import OvertimeAllowanceReport from "./components/DashboardMainForSchool/PayrollModule/Employer/OvertimeAllowance/OvertimeAllowanceReport/OvertimeAllowanceReport.jsx";
import SchoolEmployerProcessPayroll from "./components/DashboardMainForSchool/PayrollModule/Employer/ProcessPayroll/SchoolEmployerProcessPayroll.jsx";
import PFRegister from "./components/DashboardMainForSchool/PayrollModule/Employer/PFRegister/PFRegister.jsx";
import EsiRegister from "./components/DashboardMainForSchool/PayrollModule/Employer/EsiRegister/EsiRegister.jsx";
import EmployeeLtaExemptionList from "./components/DashboardMainForSchool/PayrollModule/Employer/CheckSupportingSubmittedForTax/LtaExemptionDetails/EmployeeLtaExemptionList.jsx";
import VerifyLtaDetails from "./components/DashboardMainForSchool/PayrollModule/Employer/CheckSupportingSubmittedForTax/LtaExemptionDetails/VerifyEmployeeLtaDetails.jsx";
import EmployeeTelephoneAllowanceList from "./components/DashboardMainForSchool/PayrollModule/Employer/CheckSupportingSubmittedForTax/TelephoneAllowanceDetails/EmployeeTelephoneAllowanceList.jsx";
import VerifyTelephoneAllowanceDetails from "./components/DashboardMainForSchool/PayrollModule/Employer/CheckSupportingSubmittedForTax/TelephoneAllowanceDetails/VerifyTelephoneAllowanceDetails.jsx";
import EmployeeInternetAllowanceList from "./components/DashboardMainForSchool/PayrollModule/Employer/CheckSupportingSubmittedForTax/InternetAllowanceDetails/EmployeeInternetAllowanceList.jsx";
import VerifyInternetAllowanceDetails from "./components/DashboardMainForSchool/PayrollModule/Employer/CheckSupportingSubmittedForTax/InternetAllowanceDetails/VerifyInternetAllowanceDetails.jsx";
import MarkAttendance from "./components/DashboardMainForEmployee/PayrollModule/EmployeeSelfService/Attendance/MarkAttendance/MarkAttendance.jsx";

// Operational Services
import SchoolOperationalAcademicYear from "./components/CommanPage/OperationalYear.js";
import GreetingPeoplesList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/SendSms/GreetingSms/GreetingPeoplesList.jsx";
import CreateGreetingTemplate from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/SendSms/GreetingSms/CreateGreetingTemplate.jsx";
import GreetingTemplateList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/SendSms/GreetingSms/GreetingTemplateList.jsx";
import AbsentPeoplesList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/SendSms/AttendanceSms/AbsentPeoplesList.jsx";
import AbsentTemplateList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/SendSms/AttendanceSms/AbsentTemplateList.jsx";
import CreateAttandanceTemplate from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/SendSms/AttendanceSms/CreateAttandanceTemplate.jsx";
import SendCustomeSms from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/SendSms/CustomeSms/SendCustomeSms.jsx";
import StudentHealthRecord from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentHealthRecords/StudentHealthRecord.jsx";
import CreateStudentHealthRecords from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentHealthRecords/CreateStudentHealthRecords.jsx";
import UpdateStudentHeathRecords from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentHealthRecords/UpdateStudentHeathRecords.jsx";
import ViewStudentHealthRecord from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentHealthRecords/ViewStudentHealthRecord.jsx";
import BookRecord from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/LibraryManagement/BookRecord/BookRecord.jsx";
import AddBookRecord from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/LibraryManagement/BookRecord/AddBookRecord.jsx";
import UpdateBookRecordDetails from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/LibraryManagement/BookRecord/UpdateBookRecordDetails.jsx";
import BookIssueReceiveRecordList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/LibraryManagement/BookIssueReceiveRecord/BookIssueReceiveRecordList.jsx";
import AddBookIssueRecord from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/LibraryManagement/BookIssueReceiveRecord/AddBookIssueRecord.jsx";
import ViewBookRecordDetails from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/LibraryManagement/BookIssueReceiveRecord/ViewBookRecordDetails.jsx";
import UpdateBookIssueRecord from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/LibraryManagement/BookIssueReceiveRecord/UpdateBookIssueRecord.jsx";
import AssignTestList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/AssignTestAndResult/AssignTestList.jsx";
import AddAssignTest from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/AssignTestAndResult/AddAssignTest.jsx";
import QuestionPaperSetList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/PrepareTestPaper/QuestionPaperSetList.jsx";
import AddQuestionSet from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/PrepareTestPaper/AddQuestionSet.jsx";
import UpdateQuestionSet from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/PrepareTestPaper/UpdateQuestionSet.jsx";
import ViewQuestionPaper from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/PrepareTestPaper/ViewQuestionPaper.jsx";
import TeachersFeedbackList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/TeacherFeedback/TeachersFeedbackList.jsx";
import ViewTeacherFeedbackDetails from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/TeacherFeedback/ViewTeacherFeedbackDetails.jsx";
import StudentAttendance from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/StudentAttendance.jsx";
import DefineRollNumber from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/DefineRollNumber/DefineRollNumber.jsx";
import StudentPresentReport from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/StudentPresentReport.jsx";
import StudentLeaveReport from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/StudentLeaveReport.jsx";
import StudentLateArrival from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/StudentLateArrival.jsx";
import SchoolHolidaysList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/SchoolHolidays/SchoolHolidaysList.jsx";
import AddSchoolHolidays from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/SchoolHolidays/AddSchoolHolidays.jsx";
import ViewSchoolHolidays from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/SchoolHolidays/ViewSchoolHolidays.jsx";
import UpdateSchoolHolidays from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/SchoolHolidays/UpdateSchoolHolidays.jsx";
import TimePeriodList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/TimePeriod/TimePeriodList.jsx";
import AddTimePeriod from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/TimePeriod/AddTimePeriod.jsx";
import UpdateTimePeriod from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/TimePeriod/UpdateTimePeriod.jsx";
import ViewTimePeriod from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/TimePeriod/ViewTimePeriod.jsx";
import ExamTimeTableList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/UploadExamTimeTable/ExamTimeTableList.jsx";
import AddExamTimeTable from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/UploadExamTimeTable/AddExamTimeTable.jsx";
import UpdateExamTimeTable from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/UploadExamTimeTable/UpdateExamTimeTable.jsx";
import ViewExamTimeTable from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/UploadExamTimeTable/ViewExamTimeTable.jsx";
import HomeworkList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/HomeworkForStudents/HomeworkList.jsx";
import AddHomework from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/HomeworkForStudents/AddHomework.jsx";
import UpdateHomework from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/HomeworkForStudents/UpdateHomework.jsx";
import NoticeTableList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/NoticeForStudents/NoticeTableList.jsx";
import AddNotice from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/NoticeForStudents/AddNotice.jsx";
import ViewNotice from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/NoticeForStudents/ViewNotice.jsx";
import UpdateNotice from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/NoticeForStudents/UpdateNotice.jsx";
import PlanLessonList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/PlanLesson/PlanLessonList.jsx";
import AddLessonPlanning from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/PlanLesson/AddLessonPlanning.jsx";
import ViewLessonPlan from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/PlanLesson/ViewLessonPlan.jsx";
import UpdateLessonPlan from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/PlanLesson/UpdateLessonPlan.jsx";
import ViewHomework from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/HomeworkForStudents/ViewHomework.jsx";
import ClassGroupChat from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/OtherOpsManagement/ClassGroupChat/ClassGroupChat.jsx";

// ************************ Principal Dashboard *********************************************
import PrincipalDashboardMain from "./components/DashboardMainForPrincipal/PrincipalDashboardMain.js";
import PrincipalDashboard from "./components/DashboardMainForPrincipal/PrincipalDashboard/PrincipalDashboard.jsx";
import PrincipalApprovalList from "./components/DashboardMainForPrincipal/Approval/PrincipalApprovalList.jsx";
import StudentAdmisstionApprovalTable from "./components/DashboardMainForPrincipal/Approval/StudentAdmisstion/StudentAdmisstionApprovalTable.jsx";
import FeesConcessionApprovalTable from "./components/DashboardMainForPrincipal/Approval/FeesConcession/FeesConcessionApprovalTable.jsx";
import StaffLeaveApprovalTable from "./components/DashboardMainForPrincipal/Approval/StaffLeave/StaffLeaveApprovalTable.jsx";
import InvoiceApprovalTable from "./components/DashboardMainForPrincipal/Approval/Invoice/InvoiceApprovalTable.jsx";
import EmployeeJoiningApprovalTable from "./components/DashboardMainForPrincipal/Approval/EmployeeJoining/EmployeeJoiningApprovalTable.jsx";
import TransferCertificateApprovalTable from "./components/DashboardMainForPrincipal/Approval/TransferCertificate/TransferCertificateApprovalTable.jsx";
import StaffResignationApprovalTable from "./components/DashboardMainForPrincipal/Approval/StaffResignation/StaffResignationApprovalTable.jsx";
import SalaryPayoutApprovalTable from "./components/DashboardMainForPrincipal/Approval/SalaryPayout/SalaryPayoutApprovalTable.jsx";
import ViewStudentAdmissionApprovalDetails from "./components/DashboardMainForPrincipal/Approval/StudentAdmisstion/ViewStudentAdmissionApprovalDetails.jsx";
import ViewFeesConcessionApprovalDetails from "./components/DashboardMainForPrincipal/Approval/FeesConcession/ViewFeesConcessionApprovalDetails.jsx";
import ViewStaffLeaveApprovalDetails from "./components/DashboardMainForPrincipal/Approval/StaffLeave/ViewStaffLeaveApprovalDetails.jsx";
import ViewInvoiceApprovalDetails from "./components/DashboardMainForPrincipal/Approval/Invoice/ViewInvoiceApprovalDetails.jsx";
import ViewEmployeeJoiningApprovalDetails from "./components/DashboardMainForPrincipal/Approval/EmployeeJoining/ViewEmployeeJoiningApprovalDetails.jsx";
import ViewTransferCertificateApprovalDetails from "./components/DashboardMainForPrincipal/Approval/TransferCertificate/ViewTransferCertificateApprovalDetails.jsx";
import ViewStaffResignationApprovalDetails from "./components/DashboardMainForPrincipal/Approval/StaffResignation/ViewStaffResignationApprovalDetails.jsx";
import ViewSalaryPayoutApprovalDetails from "./components/DashboardMainForPrincipal/Approval/SalaryPayout/ViewSalaryPayoutApprovalDetails.jsx";
import PrincipalNotes from "./components/DashboardMainForPrincipal/NotesAndNotices/Notes/PrincipalNotes.jsx";
import AddPrincipalNotes from "./components/DashboardMainForPrincipal/NotesAndNotices/Notes/AddPrincipalNotes.jsx";
import ViewPrincipalNotesDetails from "./components/DashboardMainForPrincipal/NotesAndNotices/Notes/ViewPrincipalNotesDetails.jsx";
import UpdatePrincipalNotes from "./components/DashboardMainForPrincipal/NotesAndNotices/Notes/UpdatePrincipalNotes.jsx";
import PrincipalNotices from "./components/DashboardMainForPrincipal/NotesAndNotices/Notice/PrincipalNotices.jsx";
import AddPrincipalNotices from "./components/DashboardMainForPrincipal/NotesAndNotices/Notice/AddPrincipalNotices.jsx";
import ViewPrincipalNoticeDetails from "./components/DashboardMainForPrincipal/NotesAndNotices/Notice/ViewPrincipalNoticeDetails.jsx";
import UpdatePrincipalNotices from "./components/DashboardMainForPrincipal/NotesAndNotices/Notice/UpdatePrincipalNotices.jsx";
import PrincipleSchoolHolidaysList from "./components/DashboardMainForPrincipal/Holiday/PrincipleSchoolHolidaysList.jsx";
import AddSchoolHolidaysPrinciple from "./components/DashboardMainForPrincipal/Holiday/AddSchoolHolidaysPrinciple.jsx";
import ViewSchoolHolidaysPrinciple from "./components/DashboardMainForPrincipal/Holiday/ViewSchoolHolidaysPrinciple.jsx";
import UpdateSchoolHolidaysPrinciple from "./components/DashboardMainForPrincipal/Holiday/UpdateSchoolHolidaysPrinciple.jsx";
import StudentAttendancePrinciple from "./components/DashboardMainForPrincipal/Attendance/StudentAttendancePrinciple.jsx";
import StaffAttendancePrinciple from "./components/DashboardMainForPrincipal/Attendance/StaffAttendancePrinciple.jsx";
import MisScreenCards from "./components/DashboardMainForPrincipal/MISScreen/MisScreenCards.jsx";
import BalanceToCollectReport from "./components/DashboardMainForPrincipal/MISScreen/BalanceToCollect/BalanceToCollectReport.jsx";
import DefaulterReportPrincipal from "./components/DashboardMainForPrincipal/MISScreen/DefaulterReport/DefaulterReportPrincipal.jsx";
import PrincipalFeesCollectionReport from "./components/DashboardMainForPrincipal/MISScreen/FeesCollection/PrincipalFeesCollectionReport.jsx";
import ArrearFeesReceivedByPrincipal from "./components/DashboardMainForPrincipal/MISScreen/ArrearFeesReceived/ArrearFeesReceivedByPrincipal.jsx";
import ConcessionReportByPrincipal from "./components/DashboardMainForPrincipal/MISScreen/ConcessionReport/ConcessionReportByPrincipal.jsx";
import LossFromLeftStudent from "./components/DashboardMainForPrincipal/MISScreen/LossFromLeftStudent/LossFromLeftStudent.jsx";
import PrincipalTrackQuoteTable from "./components/DashboardMainForPrincipal/ProcurementServices/TrackQuotes/PrincipalTrackQuoteTable.jsx";
import PrincipalRequestQuote from "./components/DashboardMainForPrincipal/ProcurementServices/TrackQuotes/RequestQuote/PrincipalRequestQuote.jsx";
import PrincipalViewRequestedQuote from "./components/DashboardMainForPrincipal/ProcurementServices/TrackQuotes/ViewRequestedQuote/PrincipalViewRequestedQuote.jsx";
import PrincipalViewQuoteDetails from "./components/DashboardMainForPrincipal/ProcurementServices/TrackQuotes/ViewQuote/PrincipalViewQuoteDetails.jsx";
import PrincipalViewAllQuoteTable from "./components/DashboardMainForPrincipal/ProcurementServices/TrackQuotes/ViewAllQuoteTable/PrincipalViewAllQuoteTable.jsx";
import PrincipalViewCart from "./components/DashboardMainForPrincipal/ProcurementServices/TrackQuotes/Cart/PrincipalViewCart.jsx";
import PrincipalTrackOrderHistoryTable from "./components/DashboardMainForPrincipal/ProcurementServices/TrackOrderHistory/PrincipalTrackOrderHistoryTable.jsx";
import PrincipalViewOrderHistory from "./components/DashboardMainForPrincipal/ProcurementServices/TrackOrderHistory/ViewOrderHistory/PrincipalViewOrderHistory.jsx";
import ViewAllNotifications from "./components/DashboardMainForPrincipal/Notifications/ViewAllNotifications.jsx";
import ViewPrincipalProfile from "./components/DashboardMainForPrincipal/PrincipalProfile/ViewPrincipalProfile/ViewPrincipalProfile.js";
import UpdatePrincipalProfile from "./components/DashboardMainForPrincipal/PrincipalProfile/UpdatePrincipalProfile/UpdatePrincipalProfile.js";
import PrincipalChangePassword from "./components/DashboardMainForPrincipal/PrincipalProfile/ChangePassword/PrincipalChangePassword.jsx";


// ===================== Student Dashboard ===============================================
import StudentDashboardMain from "./components/DashboardMainForStudent/StudentDashboardMain.js";
import StudentDashboard from "./components/DashboardMainForStudent/StudentDashboard/StudentDashboard.jsx";
import StudentAttendanceReport from "./components/DashboardMainForStudent/Attendance/StudentAttendanceReport.jsx";
import StudentNotes from "./components/DashboardMainForStudent/NotesAndNotices/Notes/StudentNotes.jsx";
import AddStudentNotes from "./components/DashboardMainForStudent/NotesAndNotices/Notes/AddStudentNotes.jsx";
import ViewStudentNotesDetails from "./components/DashboardMainForStudent/NotesAndNotices/Notes/ViewStudentNotesDetails.jsx";
import UpdateStudentNotes from "./components/DashboardMainForStudent/NotesAndNotices/Notes/UpdateStudentNotes.jsx";
import StudentNotices from "./components/DashboardMainForStudent/NotesAndNotices/Notice/StudentNotices.jsx";
import AddStudentNotices from "./components/DashboardMainForStudent/NotesAndNotices/Notice/AddStudentNotices.jsx";
import ViewStudentNoticeDetails from "./components/DashboardMainForStudent/NotesAndNotices/Notice/ViewStudentNoticeDetails.jsx";
import UpdateStudentNotices from "./components/DashboardMainForStudent/NotesAndNotices/Notice/UpdateStudentNotices.jsx";
import StudentSchoolHolidaysList from "./components/DashboardMainForStudent/Holiday/StudentSchoolHolidaysList.jsx";
import ViewSchoolHolidaysStudent from "./components/DashboardMainForStudent/Holiday/ViewSchoolHolidaysStudent.jsx";
import ClassTimetable from "./components/DashboardMainForStudent/Timetable/ClassTimetable.jsx";
import ExamTimetableList from "./components/DashboardMainForStudent/Exam/ExamTimetable/ExamTimetableList.jsx";
import ViewExamTimetable from "./components/DashboardMainForStudent/Exam/ExamTimetable/ViewExamTimetable.jsx";
import ExamResultList from "./components/DashboardMainForStudent/Exam/ExamResult/ExamResultList.jsx";
import ViewExamResult from "./components/DashboardMainForStudent/Exam/ExamResult/ViewExamResult.jsx";
import StudentLeaveRecords from "./components/DashboardMainForStudent/Attendance/StudentLeaveRecords.jsx";
import StudentApplyForLeave from "./components/DashboardMainForStudent/Attendance/StudentApplyForLeave.jsx";
import StudentViewLeaveDetails from "./components/DashboardMainForStudent/Attendance/StudentViewLeaveDetails.jsx";
import StudentUpdateLeave from "./components/DashboardMainForStudent/Attendance/StudentUpdateLeave.jsx";
import TeachersList from "./components/DashboardMainForStudent/TeachersFeedback/TeachersList.jsx";
import FeedbackForm from "./components/DashboardMainForStudent/TeachersFeedback/FeedbackForm.jsx";
import ViewTeacherFeedbackForm from "./components/DashboardMainForStudent/TeachersFeedback/ViewTeacherFeedbackForm.jsx";
import StudentClassGroupChat from "./components/DashboardMainForStudent/ClassGroupChat/StudentClassGroupChat.jsx";
import StudentHomeworkList from "./components/DashboardMainForStudent/Homework/StudentHomeworkList.jsx";
import StudentSubmitHomework from "./components/DashboardMainForStudent/Homework/Submit/StudentSubmitHomework.jsx";
import ViewSubmitHomework from "./components/DashboardMainForStudent/Homework/ViewSubmitHomework.jsx";
import ViewCheckSubmitHomework from "./components/DashboardMainForStudent/Homework/Submit/ViewCheckSubmitHomework.jsx";

// ============================== Teacher Dashboard ========================================
import TeacherDashboardMain from "./components/DashboardMainForTeacher/TeacherDashboardMain.js";
import TeacherDashboard from "./components/DashboardMainForTeacher/TeacherDashboard/TeacherDashboard.jsx";
import ViewTeacherProfile from "./components/DashboardMainForTeacher/TeacherProfile/ViewPrincipalProfile/ViewTeacherProfile.js";
import UpdateTeacherProfile from "./components/DashboardMainForTeacher/TeacherProfile/UpdateTeacherProfile/UpdateTeacherProfile.js";
import TeacherChangePassword from "./components/DashboardMainForTeacher/TeacherProfile/ChangePassword/TeacherChangePassword.jsx";
import TeacherTimetable from "./components/DashboardMainForTeacher/TeacherTimetable/TeacherTimetable.jsx";
import TeachersSchoolHolidaysList from "./components/DashboardMainForTeacher/Holiday/TeachersSchoolHolidaysList.jsx";
import ViewSchoolHolidaysTeacher from "./components/DashboardMainForTeacher/Holiday/ViewSchoolHolidaysTeacher.jsx";
import HomeworkAssignList from "./components/DashboardMainForTeacher/Homework/HomeworkAssignList.jsx";
import TeacherSubmitHomeworkList from "./components/DashboardMainForTeacher/Homework/Submit/TeacherSubmitHomeworkList.jsx";
import AssignHomework from "./components/DashboardMainForTeacher/Homework/AssignHomework.jsx";
import ViewAssignHomework from "./components/DashboardMainForTeacher/Homework/ViewAssignHomework.jsx";
import UpdateAssignHomework from "./components/DashboardMainForTeacher/Homework/UpdateAssignHomework.jsx";
import ViewHomeworkToCheck from "./components/DashboardMainForTeacher/Homework/Submit/ViewHomeworkToCheck.jsx";
import MarkStudentAttendance from "./components/DashboardMainForTeacher/StudentAttendance/MarkAttendance/MarkStudentAttendance.jsx";
import StudentAttendanceReportTeacher from "./components/DashboardMainForTeacher/StudentAttendance/AttendanceReport/StudentAttendanceReportTeacher.jsx";
import StudentApplyLeaveList from "./components/DashboardMainForTeacher/StudentAttendance/Leave/StudentApplyLeaveList.jsx";
import ViewStudentLeaveDetails from "./components/DashboardMainForTeacher/StudentAttendance/Leave/ViewStudentLeaveDetails.jsx";
import TeacherViewStudentAttendanceReport from "./components/DashboardMainForTeacher/StudentAttendance/AttendanceReport/TeacherViewStudentAttendanceReport.jsx";
import TeacherAttendanceReport from "./components/DashboardMainForTeacher/TeacherAttendance/Attendance/TeacherAttendanceReport.jsx";
import TeacherLeaveList from "./components/DashboardMainForTeacher/TeacherAttendance/Leave/TeacherLeaveList.jsx";
import TeacherApplyForLeave from "./components/DashboardMainForTeacher/TeacherAttendance/Leave/TeacherApplyForLeave.jsx";
import TeacherViewLeaveDetails from "./components/DashboardMainForTeacher/TeacherAttendance/Leave/TeacherViewLeaveDetails.jsx";
import TeacherUpdateLeaveDetails from "./components/DashboardMainForTeacher/TeacherAttendance/Leave/TeacherUpdateLeaveDetails.jsx";
import TeacherNotes from "./components/DashboardMainForTeacher/NotesAndNotices/Notes/TeacherNotes.jsx";
import AddTeacherNotes from "./components/DashboardMainForTeacher/NotesAndNotices/Notes/AddTeacherNotes.jsx";
import ViewTeacherNotesDetails from "./components/DashboardMainForTeacher/NotesAndNotices/Notes/ViewTeacherNotesDetails.jsx";
import UpdateTeacherNotes from "./components/DashboardMainForTeacher/NotesAndNotices/Notes/UpdateTeacherNotes.jsx";
import TeacherNotices from "./components/DashboardMainForTeacher/NotesAndNotices/Notice/TeacherNotices.jsx";
import AddTeacherNotices from "./components/DashboardMainForTeacher/NotesAndNotices/Notice/AddTeacherNotices.jsx";
import ViewTeacherNoticeDetails from "./components/DashboardMainForTeacher/NotesAndNotices/Notice/ViewTeacherNoticeDetails.jsx";
import UpdateTeacherNotices from "./components/DashboardMainForTeacher/NotesAndNotices/Notice/UpdateTeacherNotices.jsx";
import TeacherExamTimetableList from "./components/DashboardMainForTeacher/ExamManagement/ExamTimetable/TeacherExamTimetableList.jsx";
import TeacherViewExamTimetable from "./components/DashboardMainForTeacher/ExamManagement/ExamTimetable/TeacherViewExamTimetable.jsx";
import TeacherExamResultList from "./components/DashboardMainForTeacher/ExamManagement/ExamResult/TeacherExamResultList.jsx";
import TeacherViewExamResult from "./components/DashboardMainForTeacher/ExamManagement/ExamResult/TeacherViewExamResult.jsx";
import TeacherFillExamMarksList from "./components/DashboardMainForTeacher/ExamManagement/FillExamMarks/TeacherFillExamMarksList.jsx";
import TeacherFillStudentExamMarks from "./components/DashboardMainForTeacher/ExamManagement/FillExamMarks/TeacherFillStudentExamMarks.jsx";
import ViewTeacherFillExamMarks from "./components/DashboardMainForTeacher/ExamManagement/FillExamMarks/ViewTeacherFillExamMarks.jsx";
import UpdateTeacherFillMarks from "./components/DashboardMainForTeacher/ExamManagement/FillExamMarks/UpdateTeacherFillMarks.jsx";
import TeacherLetterAndDocuments from "./components/DashboardMainForTeacher/LetterAndDocuments/TeacherLetterAndDocuments.jsx";
import TeacherAddLetterAndDocuments from "./components/DashboardMainForTeacher/LetterAndDocuments/TeacherAddLetterAndDocuments.jsx";
import TeacherViewLetterAndDocuments from "./components/DashboardMainForTeacher/LetterAndDocuments/TeacherViewLetterAndDocuments.jsx";
import TeacherUpdateLetterAndDocuments from "./components/DashboardMainForTeacher/LetterAndDocuments/TeacherUpdateLetterAndDocuments.jsx";
import TeacherResignationList from "./components/DashboardMainForTeacher/EmployeeResignation/TeacherResignationList.jsx";
import TeacherResignationForm from "./components/DashboardMainForTeacher/EmployeeResignation/TeacherResignationForm.jsx";
import ViewTeacherResignation from "./components/DashboardMainForTeacher/EmployeeResignation/ViewTeacherResignation.jsx";
import UpdateTeacherResignation from "./components/DashboardMainForTeacher/EmployeeResignation/UpdateTeacherResignation.jsx";
import TeacherPlanLessonList from "./components/DashboardMainForTeacher/PlanLesson/TeacherPlanLessonList.jsx";
import TeacherAddLessonPlanning from "./components/DashboardMainForTeacher/PlanLesson/TeacherAddLessonPlanning.jsx";
import TeacherViewLessonPlan from "./components/DashboardMainForTeacher/PlanLesson/TeacherViewLessonPlan.jsx";
import TeacherUpdateLessonPlan from "./components/DashboardMainForTeacher/PlanLesson/TeacherUpdateLessonPlan.jsx";

// Common Calendar page
import CalendarPage from "./components/CommanPage/CalendarPage.jsx";


// Visitor Operation
import SchoolVisitorAcademicYear from "./components/CommanPage/VisitorYear.jsx"
import VisitorDashboard from "./components/DashboardMainForSchool/VisitorManagements/VisitorDashboard/VisitorDashboard.jsx";
import VisitorEntryList from "./components/DashboardMainForSchool/VisitorManagements/VisitorEntry/VisitorEntryList.jsx";
import ViewVisitorDetails from "./components/DashboardMainForSchool/VisitorManagements/VisitorEntry/ViewVisitorDetails.jsx";
import StudentPickupList from "./components/DashboardMainForSchool/VisitorManagements/StudentPickup/StudentPickupList.jsx";
import BlacklistOffenderList from "./components/DashboardMainForSchool/VisitorManagements/BlacklistOffender/BlacklistOffenderList.jsx";
import VisitorRecordReport from "./components/DashboardMainForSchool/VisitorManagements/Report/VisitorRecord/VisitorRecordReport.jsx";
import StudentPickupReport from "./components/DashboardMainForSchool/VisitorManagements/Report/StudentPickup/StudentPickupReport.jsx";
import UnscheduleVisitorForm from "./components/DashboardMainForSchool/VisitorManagements/VisitorEntry/UnscheduleVisitorForm.jsx";
import UpdateVisitorDetails from "./components/DashboardMainForSchool/VisitorManagements/VisitorEntry/UpdateVisitorDetails.jsx";
import ParentsScheduleVisitor from "./components/DashboardMainForStudent/Visiting/ScheduleVisitor/ParentsScheduleVisitor.jsx";
import ParentsUpdateVisitingDetails from "./components/DashboardMainForStudent/Visiting/ScheduleVisitor/ParentsUpdateVisitingDetails.jsx";
import ParentsViewVisitingDetails from "./components/DashboardMainForStudent/Visiting/ScheduleVisitor/ParentsViewVisitingDetails.jsx";
import ParentsApplyForVisiting from "./components/DashboardMainForStudent/Visiting/ScheduleVisitor/ParentsApplyForVisiting.jsx";
import ParentApplyChildrenPickupList from "./components/DashboardMainForStudent/Visiting/ChildrenPickup/ParentApplyChildrenPickupList.jsx";
import ParentApplyForChildPickup from "./components/DashboardMainForStudent/Visiting/ChildrenPickup/ParentApplyForChildPickup.jsx";
import ParentUpdateChildPickupInfo from "./components/DashboardMainForStudent/Visiting/ChildrenPickup/ParentUpdateChildPickupInfo.jsx";
import ParentViewChildPickupInfo from "./components/DashboardMainForStudent/Visiting/ChildrenPickup/ParentViewChildPickupInfo.jsx";
import TeacherScheduleVisitor from "./components/DashboardMainForTeacher/ScheduleVisitor/TeacherScheduleVisitor.jsx";
import TeacherApplyForVisiting from "./components/DashboardMainForTeacher/ScheduleVisitor/TeacherApplyForVisiting.jsx";
import TeacherUpdateVisitingDetails from "./components/DashboardMainForTeacher/ScheduleVisitor/TeacherUpdateVisitingDetails.jsx";
import TeacherViewVisitingDetails from "./components/DashboardMainForTeacher/ScheduleVisitor/TeacherViewVisitingDetails.jsx";
import PrincipalScheduleVisitor from "./components/DashboardMainForPrincipal/ScheduleVisitor/PrincipalScheduleVisitor.jsx";
import PrincipalApplyForVisiting from "./components/DashboardMainForPrincipal/ScheduleVisitor/PrincipalApplyForVisiting.jsx";
import PrincipalUpdateVisitingDetails from "./components/DashboardMainForPrincipal/ScheduleVisitor/PrincipalUpdateVisitingDetails.jsx";
import PrincipalViewVisitingDetails from "./components/DashboardMainForPrincipal/ScheduleVisitor/PrincipalViewVisitingDetails.jsx";
import AddBlacklistOffender from "./components/DashboardMainForSchool/VisitorManagements/BlacklistOffender/AddBlacklistOffender.jsx";
import ViewBlacklistOffender from "./components/DashboardMainForSchool/VisitorManagements/BlacklistOffender/ViewBlacklistOffender.jsx";
import UpdateBlacklistOffender from "./components/DashboardMainForSchool/VisitorManagements/BlacklistOffender/UpdateBlacklistOffender.jsx";
import VisitorCriminalRecord from "./components/DashboardMainForSchool/VisitorManagements/Settings/CriminalRecord/VisitorCriminalRecord.jsx";
import VisitorApproverList from "./components/DashboardMainForSchool/VisitorManagements/Settings/ApproverList/VisitorApproverList.jsx";
import ApproverCategory from "./components/DashboardMainForSchool/VisitorManagements/Settings/ApproverCategory/ApproverCategory.jsx";


// Trasport
import SchoolTransportAcademicYear from "./components/CommanPage/TransportYear.jsx" 
import SchoolsBusLists from "./components/DashboardMainForSchool/BusTransports/Settings/VechicalRegistration/SchoolsBusLists.jsx";
import AddSchoolBusDetails from "./components/DashboardMainForSchool/BusTransports/Settings/VechicalRegistration/AddSchoolBusDetails.jsx";
import ViewSchoolBusDetails from "./components/DashboardMainForSchool/BusTransports/Settings/VechicalRegistration/ViewSchoolBusDetails.jsx";
import UpdateSchoolBusDetails from "./components/DashboardMainForSchool/BusTransports/Settings/VechicalRegistration/UpdateSchoolBusDetails.jsx";
import SchoolRegisterBusStaff from "./components/DashboardMainForSchool/BusTransports/Settings/RegisterBusStaff/SchoolRegisterBusStaff.jsx";
import RegisterNewBusStaff from "./components/DashboardMainForSchool/BusTransports/Settings/RegisterBusStaff/RegisterNewBusStaff.jsx";
import ViewRegisterBusStaffDetails from "./components/DashboardMainForSchool/BusTransports/Settings/RegisterBusStaff/ViewRegisterBusStaffDetails.jsx";
import UpdateRegisterBusStaffDetails from "./components/DashboardMainForSchool/BusTransports/Settings/RegisterBusStaff/UpdateRegisterBusStaffDetails.jsx";
import RouteForStudents from "./components/DashboardMainForSchool/BusTransports/Settings/RouteForStudents/RouteForStudents.jsx";
import AddRouteForStudent from "./components/DashboardMainForSchool/BusTransports/Settings/RouteForStudents/AddRouteForStudent.jsx";
import ViewRouteForStudent from "./components/DashboardMainForSchool/BusTransports/Settings/RouteForStudents/ViewRouteForStudent.jsx";
import UpdateRouteForStudent from "./components/DashboardMainForSchool/BusTransports/Settings/RouteForStudents/UpdateRouteForStudent.jsx";
import PickupDropLocationRecord from "./components/DashboardMainForSchool/BusTransports/Settings/PickupAndDropLocation/PickupDropLocationRecord.jsx";
import StudentRollNumberRecord from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/DefineRollNumber/StudentRollNumberRecord.jsx";
import ViewStudentRollNumber from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/DefineRollNumber/ViewStudentRollNumber.jsx";
import UpdateRollNumber from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/DefineRollNumber/UpdateRollNumber.jsx";
import StudentAttendanceClassList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/StudentAttendanceClassList.jsx";
import UpdateStudentAttendance from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/UpdateStudentAttendance.jsx";
import ViewStudentAttendance from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/ViewStudentAttendance.jsx";
import PresentStudentAttendanceClassReportList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/PresentStudentAttendanceClassReportList.jsx";
import LeaveStudentAttendanceClassReportList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/LeaveStudentAttendanceClassReportList.jsx";
import LateStudentAttendanceClassReportList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/LateStudentAttendanceClassReportList.jsx";
import AbsentStudentAttendanceClassReportList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/AbsentStudentAttendanceClassReportList.jsx";
import StudentAbsentReport from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/StudentAttendance/StudentAbsentReport.jsx";
import DefineSubjectsForClassSectionList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/Settings/DefineClassSubject/DefineSubjectsForClassSectionList.jsx";
import DefineSubjectForClassAndSection from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/Settings/DefineClassSubject/DefineSubjectForClassAndSection.jsx";
import ViewDefineSubjectsClassAndSection from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/Settings/DefineClassSubject/ViewDefineSubjectsClassAndSection.jsx";
import UpdateSubjectsForClassSection from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/Settings/DefineClassSubject/UpdateSubjectsForClassSection.jsx";
import TeacherFeedbackClassAndSectionList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/TeacherFeedback/TeacherFeedbackClassAndSectionList.jsx";
import TeacherFeedbacFillStudentList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/TeacherFeedback/TeacherFeedbacFillStudentList.jsx";
import DefineSubjectsForClassList from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/DefineSubjectByClass/DefineSubjectsForClassList.jsx";
import ViewDefineSubjectsClass from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/DefineSubjectByClass/ViewDefineSubjectsClass.jsx";
import UpdateSubjectsForClass from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/DefineSubjectByClass/UpdateSubjectsForClass.jsx";
import DefineSubjectForClass from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/DefineSubjectByClass/DefineSubjectForClass.jsx";
import StudentAssignTestDetails from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/AssignTestAndResult/StudentAssignTestDetails.jsx";
import StudentTestPage from "./components/StudentTestPages/StudentTestPage.jsx";
import ExamQuestionPage from "./components/StudentTestPages/ExamQuestionPage.jsx";
import MarketingEmail from "./components/DashboardMainForAdmin/EmailAndMarketing/Marketing/MarketingEmail.js";
import ViewStudentTestDetails from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/EntranceManagement/AssignTestAndResult/ViewStudentTestDetails.jsx";
import Messenger from "./components/DashboardMainForSchool/OperationalManagementServices/Admin/Messenger/Messenger.js";
 

// const PrivateRoute = ({ allowedRoles, children }) => {
//   const { isAuthenticated, role } = useAuth();

//   if (!isAuthenticated) {
//     console.log('Not authenticated, redirecting to login');
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     console.log(`Role ${role} not allowed, redirecting to unauthorized`);
//     return <Navigate to="/unauthorized" replace />;
//   }

//   console.log('Access granted');
//   return children ? children : <Outlet />;
// };

const DashboardLayout = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const PrivateRoute = ({ allowedRoles, requiredSubscription, children }) => {
  const { isAuthenticated, role, subscription } = useAuth();

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log(`Role ${role} not allowed, redirecting to unauthorized`);
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredSubscription) {
    const hasSubscription = subscription?.some(
      (sub) =>
        sub.subscriptionFor === requiredSubscription &&
        new Date(sub.subscriptionEndDate) > new Date()
    );

    if (!hasSubscription) {
      console.log(
        `Subscription ${requiredSubscription} required but not active`
      );
      return <Navigate to="/unauthorized" replace />;
    }
  }

  console.log("Access granted");
  return children ? children : <Outlet />;
};

const PublicRoute = ({ children }) => {
  // const { isAuthenticated, role } = useAuth();

  // if (isAuthenticated) {
  //   return <Navigate to={
  //     role === "Admin" ? "/admin-dashboard" :
  //       role === "School" ? "/school/go-to-dashboard" :
  //         role === "Seller" ? "/seller-dashboard" :
  //           "/"
  //   } replace />;
  // }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, role } = useAuth();
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
        path="/school/go-to-dashboard"
        element={
          <PrivateRoute allowedRoles={["School", "Employee"]}>
            <SchoolCommanpage />
          </PrivateRoute>
        }
      />
      <Route
        path="/school/fees-management-year"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <SchoolFeesManagementYear />
          </PrivateRoute>
        }
      />

      <Route
        path="/student/management-year"
        element={
          <PrivateRoute allowedRoles={["Student"]}>
            <StudentManagementYear />
          </PrivateRoute>
        }
      />

      <Route
        path="/school/payroll-academic-year"
        element={
          <PrivateRoute allowedRoles={["School", "Employee"]}>
            <SchoolPayrollAcademicYear />
          </PrivateRoute>
        }
      />

      <Route
        path="/school/operational-academic-year"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <SchoolOperationalAcademicYear />
          </PrivateRoute>
        }
      />

      <Route
        path="/school/visitor-academic-year"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <SchoolVisitorAcademicYear />
          </PrivateRoute>
        }
      />

      <Route
        path="/school/transport-academic-year"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <SchoolTransportAcademicYear />
          </PrivateRoute>
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
        path="/calendar"
        element={
          <PublicRoute>
            <CalendarPage />
          </PublicRoute>
        }
      />

      <Route
        path="/shool-dashboard/test/:testLink"
        element={
          <PublicRoute>
            <StudentTestPage />
          </PublicRoute>
        }
      />

      <Route
        path="/shool-dashboard/test/:testLink/test" 
        element={
          <PublicRoute>
            <ExamQuestionPage />
          </PublicRoute>
        }
      />


      <Route
        path="/complete-admin-profile"
        element={
          <PrivateRoute allowedRoles={["Admin"]}>
            <DashboardLayout>
              <CompleteEdprowiseProfile />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/complete-school-profile"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <CompleteSchoolProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/complete-your-school-profile"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <CompleteSchoolProfileBySchool />
          </PrivateRoute>
        }
      />

      <Route
        path="/complete-seller-profile"
        element={
          <PrivateRoute allowedRoles={["Seller"]}>
            <CompleteSellerProfile />
          </PrivateRoute>
        }
      />

      {/* ===================================================Admin Routes==================================== */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute allowedRoles={["Admin"]}>
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

        {/*=============================== Email routes================== */}
        <Route path="email/smtp-setting" element={<SMTPHostSettings />} />
        <Route path="email/templates" element={<EmailTemplatesList />} />
        <Route
          path="email/templates/school-registration-template"
          element={<SchoolRegistrationEmailTamplate />}
        />
        <Route
          path="email/templates/seller-registration-template"
          element={<SellerRegistrationEmailTamplate />}
        />
        <Route
          path="email/templates/password-update-template"
          element={<PasswordUpdateEmailTamplate />}
        />
        <Route path="email/marketing" element={<MarketingEmail />} />

      </Route>

      {/* ==========================================School Routes================================*/}
      <Route
        path="/school-dashboard"
        element={
          <PrivateRoute allowedRoles={["School"]}>
            <DashboardLayout>
              <SchoolDashboardMain />
            </DashboardLayout>
          </PrivateRoute>
        }
      >
        <Route index element={<SchoolDashboard />} />
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
        {/* <Route
          path="fees-module/form/registration"
          element={<StudentRegisterListTable />}
        /> */}
        <Route
          path="fees-module/form/registration"
          element={
            <PrivateRoute>
              <StudentRegisterListTable />
            </PrivateRoute>
          }
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
          path="fees-module/form/registration-form/receipts"
          element={<RegistrationOfficialDetails />}
        />

        <Route
          path="fees-module/form/admission"
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
          path="fees-module/form/trasfer-certificate-form-details"
          element={<TcOfficialInformation />}
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
          path="fees-module/form/concession-form-details"
          element={<ConcessionFormInformation />}
        />

        {/*---------------------- Admin Settings ------------------*/}

        {/*------------------------------------ Prefix Seetings----------------------------- */}

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

        {/*--------------------------------------- Grade-------------------------------- */}

        <Route
          path="fees-module/admin-setting/grade/class-section"
          element={<ClassAndSection />}
        />
        <Route
          path="fees-module/admin-setting/grade/class-section/create-class-section"
          element={<CreateClassAndSection />}
        />

        <Route
          path="fees-module/admin-setting/grade/class-section/update-class-section"
          element={<UpdateClassAndSection />}
        />

        <Route
          path="fees-module/admin-setting/grade/class-section/view-class-section"
          element={<ViewClassAndSection />}
        />

        <Route
          path="fees-module/admin-setting/grade/shifts"
          element={<SchoolShifts />}
        />
        <Route
          path="fees-module/admin-setting/grade/shifts/add-shift"
          element={<AddShifts />}
        />

        <Route
          path="fees-module/admin-setting/grade/shifts/update-shift"
          element={<UpdateShifts />}
        />

        {/*-------------------------------------- Fees Structure--------------------------------------- */}

        <Route
          path="fees-module/admin-setting/fees-structure/fees-type-list"
          element={<TypeOfFeesList />}
        />
        <Route
          path="fees-module/admin-setting/fees-structure/fees-type-list/add-fees-type"
          element={<AddFeesType />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/fees-type-list/update-fees-type"
          element={<UpdateFeesType />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/school-fees"
          element={<FeesStructureListTable />}
        />
        <Route
          path="fees-module/admin-setting/fees-structure/school-fees/add-school-fees"
          element={<FeesStructure />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/school-fees/update-school-fees"
          element={<UpdateFeesStructure />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/school-fees/view-school-fees"
          element={<ViewFeesStructure />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/one-time-fees"
          element={<OneTimeFees />}
        />
        <Route
          path="fees-module/admin-setting/fees-structure/one-time-fees-add"
          element={<AddOneTimeFees />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/one-time-fees-update"
          element={<UpdateOneTimeFees />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/one-time-fees-view"
          element={<ViewOneTimeFees />}
        />

        <Route
          path="fees-module/admin-setting/fees-structure/fine"
          element={<Fine />}
        />
        <Route
          path="fees-module/admin-setting/fees-structure/fine/add-fine"
          element={<AddFine />}
        />

        {/*--------------------------------------Board Fees--------------------------------------- */}

        <Route
          path="fees-module/admin-setting/board-fees/registration-fees"
          element={<BoardRegistrationFeesList />}
        />
        <Route
          path="fees-module/admin-setting/board-fees/registration-fees-add"
          element={<AddBoardRegistrationFees />}
        />

        <Route
          path="fees-module/admin-setting/board-fees/registration-fees-update"
          element={<UpdateBoardRegistrationFees />}
        />

        <Route
          path="fees-module/admin-setting/board-fees/registration-fees-view"
          element={<ViewBoardRegistrationFees />}
        />

        <Route
          path="fees-module/admin-setting/board-fees/exam-fees"
          element={<BoardExamFeesList />}
        />
        <Route
          path="fees-module/admin-setting/board-fees/exam-fees-add"
          element={<AddBoardExamFees />}
        />
        <Route
          path="fees-module/admin-setting/board-fees/exam-fees-update"
          element={<UpdateBoardExamFees />}
        />
        <Route
          path="fees-module/admin-setting/board-fees/exam-fees-view"
          element={<ViewBoardExamFees />}
        />

        {/*--------------------------------------- Promotion-------------------------------- */}
        <Route
          path="fees-module/admin-setting/promotion/student-promotion"
          element={<StudentPromotionTable />}
        />
        <Route
          path="fees-module/admin-setting/promotion/student-promotion/PromoteStudent"
          element={<PromoteStudent />}
        />

        {/* --------------------------------------------Fees Receipts------------------------------------------------------- */}

        <Route
          path="fees-module/fees-receipts/school-fees"
          element={<SchoolFeesReceipts />}
        />

        <Route
          path="fees-module/fees-receipts/fees-refund"
          element={<FeesRefund />}
        />

        <Route
          path="fees-module/fees-receipts/fees-refund/create-refund"
          element={<CreateFeesRefund />}
        />

        <Route
          path="fees-module/fees-receipts/fees-refund/refund-receipt"
          element={<Refundreceipt />}
        />

        <Route
          path="fees-module/fees-receipts/school-fees/student-receipts"
          element={<StudentReceipts />}
        />
        <Route
          path="fees-module/fees-receipts/school-fees/fees-receipts"
          element={<FeeReceiptsSchoolFees />}
        />
        <Route
          path="fees-module/fees-receipts/school-fees/fees-receipts-view"
          element={<SchoolFeesReceiptsView />}
        />

        <Route
          path="fees-module/fees-receipts/board-registration-fees"
          element={<BoardRegistrationFee />}
        />

        <Route
          path="fees-module/fees-receipts/board-registration-fees/receipts"
          element={<BoardRegistrationFeeReceipts />}
        />

        <Route
          path="fees-module/fees-receipts/board-exam-fees"
          element={<BoardExamFee />}
        />

        <Route
          path="fees-module/fees-receipts/board-exam-fees/receipts"
          element={<BoardExamFeeReceipts />}
        />

        {/* --------------------------------------------Reports------------------------------------------------------- */}

        <Route
          path="fees-module/reports/student-ledger"
          element={<StudentLedger />}
        />
        {/* --------------------------------------------Genral Reports-------------------------------------- */}
        <Route
          path="fees-module/reports/general/school-fee"
          element={<GenralSchoolFees />}
        />
        <Route
          path="fees-module/reports/general/late-fees-excess"
          element={<GenralLateFees />}
        />
        <Route
          path="fees-module/reports/general/registration-fees"
          element={<GenralRegistartionFees />}
        />
        <Route
          path="fees-module/reports/general/admission-fees"
          element={<GenralAdmissionFees />}
        />
        <Route
          path="fees-module/reports/general/tc-reports"
          element={<GenralTCFees />}
        />
        <Route
          path="fees-module/reports/general/board-registration"
          element={<GenralBoardRegistration />}
        />
        <Route
          path="fees-module/reports/general/board-exam"
          element={<GenralBoardExam />}
        />
        <Route
          path="fees-module/reports/general/fees-refund"
          element={<GenralFeesReundReport />}
        />
        <Route
          path="fees-module/reports/general/fees-cancelled"
          element={<GenralFeesReundCancelled />}
        />
        <Route
          path="fees-module/reports/general/fees-cheque-return"
          element={<GenralFeesChequeReturn />}
        />
        <Route
          path="fees-module/reports/general/fees-structure"
          element={<GenralFeesStructure />}
        />

        {/* --------------------------------------------Daily Collection-------------------------------------- */}
        <Route
          path="fees-module/reports/daily-collection/datewise-collection"
          element={<DailyCollectionDatsewiseCollection />}
        />

        <Route
          path="fees-module/reports/daily-collection/datewise-collection-with-concession"
          element={<DailyCollectionDatsewiseCollectionWithConcession />}
        />
        <Route
          path="fees-module/reports/daily-collection/studentwise-collection"
          element={<DailyCollectionStudentwiseCollection />}
        />
        <Route
          path="fees-module/reports/daily-collection/studentwise-with-collection"
          element={<DailyCollectionStudentwiseCollectionWithConcesssion />}
        />

        {/* --------------------------------------------Concession Reports-------------------------------------- */}

        <Route
          path="fees-module/reports/concession/date-wise"
          element={<ConcessionReportDatewise />}
        />

        <Route
          path="fees-module/reports/concession/student-wise"
          element={<ConcessionReportStudentwise />}
        />

        {/* --------------------------------------------Advanced Reports-------------------------------------- */}
        <Route
          path="fees-module/reports/advanced/loss-left-students"
          element={<LossOfFeeDuetoLeftstudent />}
        />
        <Route
          path="fees-module/reports/advanced/loss-late-admission"
          element={<LossOfFeeDuetoLateAdmssion />}
        />

        <Route
          path="fees-module/reports/advanced/defaulter-fees"
          element={<DefaulterFees />}
        />
        <Route
          path="fees-module/reports/advanced/arrear-fees"
          element={<ArrearFeesReceivedReport />}
        />
        <Route
          path="fees-module/reports/advanced/student-master"
          element={<StudentMaster />}
        />
        {/* --------------------------------------------FeesRecon-------------------------------------- */}

        <Route
          path="fees-module/reports/audit/headcount"
          element={<FeesReconHaedwise />}
        />

        {/* --------------------------------------------Profile------------------------------------------------------- */}

        <Route
          path="fees-module/student-profile"
          element={<StudentProfile />}
        />
        <Route
          path="fees-module/student-profile/update-admission-form"
          element={<StudentProfileUpdate />}
        />
        <Route
          path="fees-module/student-profile/view-admission-form"
          element={<StudentProfileView />}
        />

        {/* ===================== Payroll Module ======================================== */}
        {/* ------------------------ Employer ---------------------- */}
        <Route
          path="payroll-module/employer/employee-registration"
          element={
            <PrivateRoute>
              <EmployeeRegistrationFormList />
            </PrivateRoute>
          }
        />

        <Route
          path="payroll-module/employer/employee-registration/new-employee-registration"
          element={<AddEmployeeRegistrationForm />}
        />

        <Route
          path="payroll-module/employer/employee-registration/update-employee-registration"
          element={<UpdateEmployeeRegistration />}
        />

        <Route
          path="payroll-module/employer/employee-registration/view-employee-registration"
          element={<ViewEmployeeRegistrationFormDetails />}
        />

        {/* Update Details */}
        <Route
          path="payroll-module/employer/update-employee-details"
          element={<EmployerUpdateEmployeeDetails />}
        />

        {/* CTC Update */}
        <Route
          path="payroll-module/employer/employee-ctc"
          element={<CTCUpdatedEmployeeTable />}
        />

        <Route
          path="payroll-module/employer/employee-ctc/ctc-update"
          element={<EmployerCTCUpdate />}
        />

        <Route
          path="payroll-module/employer/employee-ctc/view-ctc-details"
          element={<ViewEmployeeCTCDetails />}
        />

        <Route
          path="payroll-module/employer/employee-ctc/update-ctc-details"
          element={<UpdateEmployeeCTCDetails />}
        />

        {/* CTC Master */}
        <Route
          path="payroll-module/employer/ctc-master"
          element={<PayrollCTCMaster />}
        />

        {/* Increment */}
        <Route
          path="payroll-module/employer/salary-increment/single-employee-increment"
          element={<SingleEmployeeSalaryIncrement />}
        />

        <Route
          path="payroll-module/employer/salary-increment/bulk-employee-increment"
          element={<BulkEmployeeSalaryIncrement />}
        />

        {/* leave  */}
        <Route
          path="payroll-module/employer/attendance/leave-approval"
          element={<LeaveApplyEmployeeList />}
        />

        <Route
          path="payroll-module/employer/attendance/attendance-report"
          element={<ViewEmployeeAttendanceReports />}
        />
        <Route
          path="payroll-module/employer/attendance/leave-records"
          element={<EmployeeLeaveRecords />}
        />

        {/* Overtime Allowance  */}

        <Route
          path="payroll-module/employer/overtime-allowance"
          element={<OvertimeAllowanceApproval />}
        />

        <Route
          path="payroll-module/employer/overtime-allowance/view-overtime-allowance-details"
          element={<ViewOvertimeAllowanceDetails />}
        />

        <Route
          path="payroll-module/employer/overtime-allowance/overtime-allowance-report"
          element={<OvertimeAllowanceReport />}
        />

        {/* Payroll Process */}

        <Route
          path="payroll-module/employer/process-payroll"
          element={<SchoolEmployerProcessPayroll />}
        />

        {/* <Route
          path="payroll-module/employer/pf-deduction"
          element={<PFDeductionDetails />}
        /> */}

        <Route
          path="payroll-module/employer/payroll/pf-register"
          element={<PFRegister />}
        />

        <Route
          path="payroll-module/employer/payroll/esi-register"
          element={<EsiRegister />}
        />

        {/* It Declaration */}
        <Route
          path="payroll-module/employer/income-tax/supporting-tax-submitted"
          element={<EmployeeSupportingSubmittedForTaxList />}
        />

        <Route
          path="payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax"
          element={<VerifySupportingSubmittedForTaxList />}
        />

        <Route
          path="payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/verify-rent-details"
          element={<VerifyEmployerRentDetails />}
        />

        <Route
          path="payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/lta-list"
          element={<EmployeeLtaExemptionList />}
        />

        <Route
          path="payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/lta-list/verify-lta-details"
          element={<VerifyLtaDetails />}
        />

        <Route
          path="payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/telephone-allowance-list"
          element={<EmployeeTelephoneAllowanceList />}
        />

        <Route
          path="payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/telephone-allowance-list/verify-telephone-allowance-details"
          element={<VerifyTelephoneAllowanceDetails />}
        />

        <Route
          path="payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/internet-allowance-list"
          element={<EmployeeInternetAllowanceList />}
        />

        <Route
          path="payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/internet-allowance-list/verify-internet-allowance-details"
          element={<VerifyInternetAllowanceDetails />}
        />

        {/* ------------------------ Admin Setting ---------------------- */}

        <Route
          path="payroll-module/admin-setting/freeze-it-declaration"
          element={<FreezeITDeclaration />}
        />

        <Route
          path="payroll-module/admin-setting/ctc-components"
          element={<SchoolDefineCtcComponentsList />}
        />

        <Route
          path="payroll-module/admin-setting/define-grade"
          element={<DefinePayrollGrade />}
        />

        <Route
          path="payroll-module/admin-setting/define-category"
          element={<DefineEmployeeCategory />}
        />

        <Route
          path="payroll-module/admin-setting/leave-setting/annual-leave-update"
          element={<AnnualLeaveAdminSetting />}
        />

        <Route
          path="payroll-module/admin-setting/leave-setting/carry-forword-setting"
          element={<CarryForwardSetting />}
        />

        <Route
          path="payroll-module/admin-setting/overtime-allowance-rate"
          element={<EmployeeOvertimeAllowanceRate />}
        />

        <Route
          path="payroll-module/admin-setting/employee-id-setting"
          element={<EmployeeIdPrefixTable />}
        />
        <Route
          path="payroll-module/admin-setting/employee-id-setting/add-setting"
          element={<EmployeeIdSettings />}
        />

        <Route
          path="payroll-module/admin-setting/employee-id-setting/edit-setting"
          element={<UpdateEmployeeIdSettings />}
        />

        <Route
          path="payroll-module/admin-setting/define-job-designation"
          element={<DefineEmployeeJobDesignation />}
        />
        <Route
          path="payroll-module/admin-setting/payroll-smtp-setting"
          element={<PayrollSMTPSettings />}
        />

        <Route
          path="payroll-module/admin-setting/school-holiday-calendar"
          element={<SchoolHolidayCalendar />}
        />

        <Route
          path="payroll-module/admin-setting/academic-year-setting"
          element={<DefineAcademicYear />}
        />

        <Route
          path="payroll-module/admin-setting/provident-fund-setting"
          element={<ProvidentFundSettings />}
        />

        {/* Operational Service */}
        <Route
          path="operational-service/send-sms/greeting-sms"
          element={
            <PrivateRoute>
              <GreetingPeoplesList />
            </PrivateRoute>
          }
        />
        <Route
          path="operational-service/send-sms/greeting-sms/templates"
          element={<GreetingTemplateList />}
        />

        <Route
          path="operational-service/send-sms/greeting-sms/templates/create"
          element={<CreateGreetingTemplate />}
        />

        <Route
          path="operational-service/sms/attandance-sms"
          element={<AbsentPeoplesList />}
        />

        <Route
          path="operational-service/sms/attandance-sms/templates"
          element={<AbsentTemplateList />}
        />

        <Route
          path="operational-service/sms/attandance-sms/templates/create"
          element={<CreateAttandanceTemplate />}
        />

        <Route
          path="operational-service/sms/send-custome-sms"
          element={<SendCustomeSms />}
        />

        <Route
          path="operational-service/student-health-record"
          element={<StudentHealthRecord />}
        />

        <Route
          path="operational-service/student-health-record/add"
          element={<CreateStudentHealthRecords />}
        />

        <Route
          path="operational-service/student-health-record/view"
          element={<ViewStudentHealthRecord />}
        />

        <Route
          path="operational-service/student-health-record/update"
          element={<UpdateStudentHeathRecords />}
        />

        <Route
          path="operational-service/library-management/book-record"
          element={<BookRecord />}
        />

        <Route
          path="operational-service/library-management/book-record/add-book"
          element={<AddBookRecord />}
        />

        <Route
          path="operational-service/library-management/book-record/update-book"
          element={<UpdateBookRecordDetails />}
        />
        {/* book issue receive */}
        <Route
          path="operational-service/library-management/book-issue-record"
          element={<BookIssueReceiveRecordList />}
        />

        <Route
          path="operational-service/library-management/book-issue-record/issue-book"
          element={<AddBookIssueRecord />}
        />

        <Route
          path="operational-service/library-management/book-issue-record/view-record-details"
          element={<ViewBookRecordDetails />}
        />

        <Route
          path="operational-service/library-management/book-issue-record/update-record-details"
          element={<UpdateBookIssueRecord />}
        />

        {/* Entrance Test */}
        <Route
          path="operational-service/entrance-management/test-list"
          element={<AssignTestList />}
        />

        <Route
          path="operational-service/entrance-management/test-list/assign-test"
          element={<AddAssignTest />}
        />
        <Route
          path="operational-service/entrance-management/test-list/view-assign-test"
          element={<StudentAssignTestDetails/>}
        />

        <Route
          path="operational-service/entrance-management/test-list/view-assign-test/view-test"
          element={<ViewStudentTestDetails/>}
        /> 
        {/* Subject define by class only */}
        <Route
          path="operational-service/entrance-management/class-subject-define-list"
          element={<DefineSubjectsForClassList />}
        />

        <Route
          path="operational-service/entrance-management/subject-define-list/define-class-subjects"
          element={<DefineSubjectForClass/>}
        />

        <Route
          path="operational-service/entrance-management/subject-define-list/view-define-class-subjects"
          element={<ViewDefineSubjectsClass />}
        />

        <Route
          path="operational-service/entrance-management/subject-define-list/update-define-class-subjects"
          element={<UpdateSubjectsForClass />}
        />
        {/* end of subject by class only */}
        
        {/* Question Set */}
        <Route
          path="operational-service/entrance-management/question-set-list"
          element={<QuestionPaperSetList />}
        />

        <Route
          path="operational-service/entrance-management/question-set-list/add-question-set"
          element={<AddQuestionSet />}
        />

        <Route
          path="operational-service/entrance-management/question-set-list/view-question-set"
          element={<ViewQuestionPaper />}
        />

        <Route
          path="operational-service/entrance-management/question-set-list/update-question-set"
          element={<UpdateQuestionSet />}
        />

        {/* Teacher feedBack */}
<Route
          path="operational-service/teachers-feedback"
          element={<TeacherFeedbackClassAndSectionList />}
        />

        <Route
          path="operational-service/teachers-feedback/teacher-list"
          element={<TeachersFeedbackList />}
        />
        <Route
          path="operational-service/teachers-feedback/teacher-list/feedback-fill-student"
          element={<TeacherFeedbacFillStudentList />}
        />
 
        <Route
          path="operational-service/teachers-feedback/teacher-list/feedback-fill-student/view-feedback-details"
          element={<ViewTeacherFeedbackDetails />}
        />

        {/* Student Attendance */}
        <Route
          path="operational-service/student-attendance/digital-student-attendance"
          element={<StudentAttendanceClassList />}
        />
        <Route
          path="operational-service/student-attendance/digital-student-attendance/take-attendance"
          element={<StudentAttendance />}
        />

        <Route
          path="operational-service/student-attendance/digital-student-attendance/update-attendance"
          element={<UpdateStudentAttendance />}
        />

        <Route
          path="operational-service/student-attendance/digital-student-attendance/view-attendance"
          element={<ViewStudentAttendance />}
        />

        <Route
          path="operational-service/student-attendance/student-present-report"
          element={<PresentStudentAttendanceClassReportList/>}
        />

        <Route
          path="operational-service/student-attendance/student-present-report/view-report"
          element={<StudentPresentReport />}
        />

         <Route
          path="operational-service/student-attendance/student-absent-report"
          element={<AbsentStudentAttendanceClassReportList/>}
        />

        <Route
          path="operational-service/student-attendance/student-absent-report/view-report"
          element={<StudentAbsentReport />}
        />

        <Route
          path="operational-service/student-attendance/student-leave-report"
          element={<LeaveStudentAttendanceClassReportList />}
        />
        <Route
          path="operational-service/student-attendance/student-leave-report/view-report"
          element={<StudentLeaveReport />}
        />

        <Route
          path="operational-service/student-attendance/student-late-arrival-report"
          element={<LateStudentAttendanceClassReportList />}
        />

        <Route
          path="operational-service/student-attendance/student-late-arrival-report/view-report"
          element={<StudentLateArrival />}
        />


          {/* Roll Number */}
        <Route
          path="operational-service/student-attendance/define-roll-numbers/define-student-roll-number"
          element={<DefineRollNumber />}
        />

        <Route
          path="operational-service/student-attendance/define-roll-numbers"
          element={<StudentRollNumberRecord />}
        />

        <Route
          path="operational-service/student-attendance/define-roll-numbers/view-student-roll-number"
          element={<ViewStudentRollNumber />}
        />

        <Route 
          path="operational-service/student-attendance/define-roll-numbers/update-student-roll-number"
          element={<UpdateRollNumber />}
        />

        {/* Other Ops management */} 
        {/* School Holiday */}

        <Route
          path="operational-service/other-management/school-holidays"
          element={<SchoolHolidaysList />}
        />

        <Route
          path="operational-service/other-management/school-holidays/add-school-holidays"
          element={<AddSchoolHolidays />}
        />

        <Route
          path="operational-service/other-management/school-holidays/view-school-holidays"
          element={<ViewSchoolHolidays />}
        />

        <Route
          path="operational-service/other-management/school-holidays/update-school-holidays"
          element={<UpdateSchoolHolidays />}
        />

        {/* Time Period */}
        <Route
          path="operational-service/other-management/time-period"
          element={<TimePeriodList />}
        />

        <Route
          path="operational-service/other-management/time-period/add-time-period"
          element={<AddTimePeriod />}
        />

        <Route
          path="operational-service/other-management/time-period/update-time-period"
          element={<UpdateTimePeriod />}
        />

        <Route
          path="operational-service/other-management/time-period/view-time-period"
          element={<ViewTimePeriod />}
        />

        {/* Exam time table */}
        <Route
          path="operational-service/other-management/exam-time-table"
          element={<ExamTimeTableList />}
        />

        <Route
          path="operational-service/other-management/exam-time-table/add-exam-time-table"
          element={<AddExamTimeTable />}
        />

        <Route
          path="operational-service/other-management/exam-time-table/update-exam-time-table"
          element={<UpdateExamTimeTable />}
        />

        <Route
          path="operational-service/other-management/exam-time-table/view-exam-time-table"
          element={<ViewExamTimeTable />}
        />

        {/* Homework */}
        <Route
          path="operational-service/other-management/homework"
          element={<HomeworkList />}
        />

        <Route
          path="operational-service/other-management/homework/assign-homework"
          element={<AddHomework />}
        />

        <Route
          path="operational-service/other-management/homework/view-homework"
          element={<ViewHomework />}
        />

        <Route
          path="operational-service/other-management/homework/update-homework"
          element={<UpdateHomework />}
        />

        {/* Notice List */}

        <Route
          path="operational-service/other-management/notice"
          element={<NoticeTableList />}
        />

        <Route
          path="operational-service/other-management/notice/add-notice"
          element={<AddNotice />}
        />

        <Route
          path="operational-service/other-management/notice/view-notice"
          element={<ViewNotice />}
        />

        <Route
          path="operational-service/other-management/notice/update-notice"
          element={<UpdateNotice />}
        />

        {/* Plan Lesson */}

        <Route
          path="operational-service/other-management/lesson-plan"
          element={<PlanLessonList />}
        />

        <Route
          path="operational-service/other-management/lesson-plan/add-lesson-plan"
          element={<AddLessonPlanning />}
        />

        <Route
          path="operational-service/other-management/lesson-plan/view-lesson-plan"
          element={<ViewLessonPlan />}
        />

        <Route
          path="operational-service/other-management/lesson-plan/update-lesson-plan"
          element={<UpdateLessonPlan />}
        />

        {/* Class Chat */}
        <Route
          path="operational-service/other-management/class-chat"
          element={<ClassGroupChat />}
        />
 {/* Setting */}
        {/*Define subject By class and section  Subject */}
        <Route
          path="operational-service/setting/subject-define-list"
          element={<DefineSubjectsForClassSectionList />}
        />

        <Route
          path="operational-service/setting/subject-define-list/define-subjects"
          element={<DefineSubjectForClassAndSection />}
        />

        <Route
          path="operational-service/setting/subject-define-list/view-define-subjects"
          element={<ViewDefineSubjectsClassAndSection />}
        />

        <Route
          path="operational-service/setting/subject-define-list/update-define-subjects"
          element={<UpdateSubjectsForClassSection />}
        />

        <Route
          path="operational-service/message"
          element={<Messenger />}
        />
        {/* End subject by class and section */}


        {/* ==================Visitor ============================= */}
        <Route
          path="visitor/dashboard"
          element={
            <PrivateRoute>
              <VisitorDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="visitor/Visitor-list"
          element={<VisitorEntryList />}
        />

        <Route
          path="visitor/Visitor-list/add-unschedule-visitor"
          element={<UnscheduleVisitorForm/>}
        />

        <Route
          path="visitor/Visitor-list/view-visitor-details"
          element={<ViewVisitorDetails />}
        />

        <Route
          path="visitor/Visitor-list/update-visitor-details"
          element={<UpdateVisitorDetails />}
        />

        <Route
          path="visitor/student-pickup-list"
          element={<StudentPickupList />}
        />

        {/* BlackList */}

        <Route
          path="visitor/blacklist-offender"
          element={<BlacklistOffenderList />}
        />

        <Route
          path="visitor/blacklist-offender/add-blacklist-offender"
          element={<AddBlacklistOffender />}
        />

        <Route
          path="visitor/blacklist-offender/view-blacklist-offender"
          element={<ViewBlacklistOffender />}
        />

        <Route
          path="visitor/blacklist-offender/update-blacklist-offender"
          element={<UpdateBlacklistOffender />}
        />

       
        {/* Report */}
         <Route
          path="visitor/report/visitor-report"
          element={<VisitorRecordReport />}
        />

        <Route
          path="visitor/report/student-pickup"
          element={<StudentPickupReport />}
        />

        {/* Setting */}
        <Route
          path="visitor/setting/criminal-record"
          element={<VisitorCriminalRecord />}
        />

        <Route
          path="visitor/setting/approver-list"
          element={<VisitorApproverList />}
        />

        <Route
          path="visitor/setting/approver-category"
          element={<ApproverCategory />}
        />

        {/* Transport */}
        <Route
          path="transport/setting/bus-details"
          element={
            <PrivateRoute>
              <SchoolsBusLists />
            </PrivateRoute>
          }
        />

        <Route
          path="transport/setting/bus-details/add-bus-details"
          element={<AddSchoolBusDetails />}
        />

        <Route
          path="transport/setting/bus-details/view-bus-details"
          element={<ViewSchoolBusDetails/>}
        />

        <Route
          path="transport/setting/bus-details/update-bus-details"
          element={<UpdateSchoolBusDetails />}
        />

        <Route
          path="transport/setting/bus-staff-details"
          element={<SchoolRegisterBusStaff />}
        />

        <Route
          path="transport/setting/bus-staff-details/register-new-staff"
          element={<RegisterNewBusStaff />}
        />

        <Route
          path="transport/setting/bus-staff-details/view-staff-details"
          element={<ViewRegisterBusStaffDetails />}
        />

         <Route
          path="transport/setting/bus-staff-details/update-staff-details"
          element={<UpdateRegisterBusStaffDetails />}
        />
<Route
          path="transport/setting/route-for-students"
          element={<RouteForStudents />}
        />

        <Route
          path="transport/setting/route-for-students/add-new-route"
          element={<AddRouteForStudent />}
        />

        <Route
          path="transport/setting/route-for-students/view-route-details"
          element={<ViewRouteForStudent />}
        />

         <Route
          path="transport/setting/route-for-students/update-route-details"
          element={<UpdateRouteForStudent />}
        />

         <Route
          path="transport/setting/location"
          element={<PickupDropLocationRecord />}
        />


      </Route>

      {/* =========================================Seller Routes============================================= */}

      <Route
        path="/seller-dashboard"
        element={
          <PrivateRoute allowedRoles={["Seller"]}>
            <DashboardLayout>
              <SellerDashboardMain />
            </DashboardLayout>
          </PrivateRoute>
        }
      >
        {/*Seller Dashboard Route */}

        <Route index element={<SellerDashboard />} />

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

      {/* ==================================== Employee Routes ==================================== */}
      <Route
        path="/employee-dashboard"
        element={
          <PrivateRoute allowedRoles={["Employee"]}>
            <DashboardLayout>
              <EmployeeDashboardMain />
            </DashboardLayout>
          </PrivateRoute>
        }
      >
        {/*Employee Dashboard Route Payroll */}
        <Route
          path="payroll-module/employee/update-details"
          element={<UpdatePayrollEmployeeDetails />}
        />

        <Route
          path="payroll-module/employee/provident-fund"
          element={<EmployeeProvidentFund />}
        />

        <Route
          path="payroll-module/employee/attendance/mark-attendance"
          element={<EmployeeMarkAttendance />}
        />
        <Route
          path="payroll-module/employee/attendance/apply-for-leave"
          element={<EmployeeLeaveDetailsAndApply />}
        />
        <Route
          path="payroll-module/employee/attendance/my-attendance-report"
          element={<EmployeeAttendanceReport />}
        />

        <Route
          path="payroll-module/employee/overtime-allowance"
          element={<OvertimeAllowanceList />}
        />

        <Route
          path="payroll-module/employee/overtime-allowance/apply-overtime-allowance"
          element={<ApplyOvertimeAllowance />}
        />

        <Route
          path="payroll-module/employee/overtime-allowance/view-overtime-allowance"
          element={<ViewOvertimeAllowance />}
        />

        <Route
          path="payroll-module/employee-services/overtime-allowance/update-overtime-allowance"
          element={<UpdateOvertimeAllowance />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration"
          element={<EmployeeItDeclaration />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration/rent-details"
          element={<EmployeeRentDetails />}
        />

        <Route
          path="payroll-module/employee/income-tax/previous-employment-income"
          element={<EmployeePreviousEmploymentIncome />}
        />

        <Route
          path="payroll-module/employee/income-tax/income-tax-computation-sheet"
          element={<EmployeeIncomeTaxComputationSheet />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration/lta-details"
          element={<EmployeeLTADetails />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration/lta-details/add-lta"
          element={<AddLtaExamptionDetails />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration/lta-details/view-lta"
          element={<ViewLtaExamptionDetails />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration/telephone-allowance-details"
          element={<TelephoneAllowanceDetails />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration/telephone-allowance-details/add-telephone-allowance"
          element={<AddTelephoneAllowanceDetails />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration/telephone-allowance-details/view-telephone-allowance"
          element={<ViewTelephoneExamptionDetails />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration/internet-allowance-details"
          element={<InternetAllowanceDetails />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration/internet-allowance-details/add-internet-allowance"
          element={<AddInternetAllowanceDetails />}
        />

        <Route
          path="payroll-module/employee/income-tax/it-declaration/internet-allowance-details/view-internet-allowance"
          element={<ViewInternetExamptionDetails />}
        />

        {/* <Route
          path="payroll-module/employee/attendance/mark-attendance"
          element={<EmployeeMarkAttendance />}
        /> */}
        <Route
          path="payroll-module/employee/attendance/mark-attendance"
          element={<MarkAttendance />}
        />

        {/* <Route
          path="payroll-module/employee/attendance/apply-for-leave"
          element={<EmployeeApplyForLeave />}
        /> */}

        {/* <Route
          path="payroll-module/employee/attendance/apply-for-leave"
          element={<EmployeeApplyForLeave />}
        /> */}

        <Route
          path="payroll-module/employee/attendance/apply-for-leave"
          element={<EmployeeLeaveDetailsAndApply />}
        />

        <Route
          path="payroll-module/employee-services/attendance/my-attendance-report"
          element={<EmployeeAttendanceReport />}
        />
      </Route>
      

      {/* ===================================== Principal Routes ================================= */}

      <Route
        path="/principal-dashboard"
        element={
          <PrivateRoute allowedRoles={["Principal"]}>
            <DashboardLayout>
              <PrincipalDashboardMain />
            </DashboardLayout>
          </PrivateRoute>
        }
      >
        <Route index element={<PrincipalDashboard />} />

        <Route
          path="view-principal-profile"
          element={<ViewPrincipalProfile />}
        />

        <Route
          path="update-principal-profile"
          element={<UpdatePrincipalProfile />}
        />

        <Route
          path="change-password"
          element={<PrincipalChangePassword />}
        />

        <Route
          path="approval/student-admission"
          element={<StudentAdmisstionApprovalTable />}
        />

        <Route
          path="approval/student-admission/view-student-admission-details"
          element={<ViewStudentAdmissionApprovalDetails />}
        />

        <Route
          path="approval/fees-concession"
          element={<FeesConcessionApprovalTable />}
        />
        <Route
          path="approval/fees-concession/view-fees-concession-details"
          element={<ViewFeesConcessionApprovalDetails />}
        />

        <Route
          path="approval/staff-leave"
          element={<StaffLeaveApprovalTable />}
        />

        <Route
          path="approval/staff-leave/view-staff-leave-details"
          element={<ViewStaffLeaveApprovalDetails />}
        />

        <Route path="approval/invoice" element={<InvoiceApprovalTable />} />

        <Route
          path="approval/invoice/view-staff-invoice-details"
          element={<ViewInvoiceApprovalDetails />}
        />

        <Route
          path="approval/employee-joining"
          element={<EmployeeJoiningApprovalTable />}
        />

        <Route
          path="approval/employee-joining/view-employee-joining-details"
          element={<ViewEmployeeJoiningApprovalDetails />}
        />

        <Route
          path="approval/transfer-certificate"
          element={<TransferCertificateApprovalTable />}
        />

        <Route
          path="approval/transfer-certificate/view-tc-details"
          element={<ViewTransferCertificateApprovalDetails />}
        />

        <Route
          path="approval/staff-resignation"
          element={<StaffResignationApprovalTable />}
        />

        <Route
          path="approval/staff-resignation/view-staff-resignation-details"
          element={<ViewStaffResignationApprovalDetails />}
        />

        <Route
          path="approval/salary-payout"
          element={<SalaryPayoutApprovalTable />}
        />

        <Route
          path="approval/salary-payout/view-salary-payout-details"
          element={<ViewSalaryPayoutApprovalDetails />}
        />

         {/* Note */}
        <Route path="notes-notice/notes" element={<PrincipalNotes />} />

        <Route path="notes-notice/notes/add-note" element={<AddPrincipalNotes />} />

        <Route path="notes-notice/notes/view-note" element={<ViewPrincipalNotesDetails />} />

        <Route path="notes-notice/notes/update-note" element={<UpdatePrincipalNotes />} />

       {/* Notices */}
        <Route path="notes-notice/notices" element={<PrincipalNotices />} />

        <Route path="notes-notice/notices/add-notice" element={<AddPrincipalNotices />} />

        <Route path="notes-notice/notices/view-notice" element={<ViewPrincipalNoticeDetails />} />

        <Route path="notes-notice/notices/update-notice" element={<UpdatePrincipalNotices />} />

         {/* Holiday */}
        <Route
          path="holiday"
          element={< PrincipleSchoolHolidaysList/>}
        />

        <Route
          path="holiday/add-holiday"
          element={<AddSchoolHolidaysPrinciple />}
        />
        <Route
          path="holiday/view-holiday"
          element={<ViewSchoolHolidaysPrinciple/>}
        />

        <Route
          path="holiday/update-holiday"
          element={<UpdateSchoolHolidaysPrinciple/>}
        />

        <Route
          path="attendance/student-attendance"
          element={<StudentAttendancePrinciple/>}
        />

        <Route
          path="attendance/staff-attendance"
          element={<StaffAttendancePrinciple/>}
        />

        <Route
          path="mis-report"
          element={<MisScreenCards/>}
        />

        <Route
          path="mis-report/fees-collection-report"
          element={<PrincipalFeesCollectionReport/>}
        />

        <Route
          path="mis-report/balance-to-collect-report"
          element={<BalanceToCollectReport/>}
        />

         <Route
          path="mis-report/defaulter-report"
          element={<DefaulterReportPrincipal/>}
        />

        <Route
          path="mis-report/arrear-fees-receive-report"
          element={<ArrearFeesReceivedByPrincipal/>}
        />

        <Route
          path="mis-report/concession-report"
          element={<ConcessionReportByPrincipal/>}
        />
 
        <Route
          path="mis-report/left-student-report"
          element={<LossFromLeftStudent/>}
        />

        {/* ============Procurement Services========== */}
        {/* <Route
          path="procurement-services/dashboard"
          element={<SchoolProcurementDashboard />}
        /> */}
        <Route
          path="procurement-services/track-quote"
          element={<PrincipalTrackQuoteTable />}
        />
        <Route
          path="procurement-services/track-quote/request-quote"
          element={<PrincipalRequestQuote />}
        />
        <Route
          path="procurement-services/track-quote/view-requested-quote"
          element={<PrincipalViewRequestedQuote />}
        />

        <Route path="procurement-services/track-quote/view-quote" element={<PrincipalViewQuoteDetails />} />
        <Route
          path="procurement-services/track-quote/view-quote-table"
          element={<PrincipalViewAllQuoteTable />}
        />

        <Route path="procurement-services/view-cart" element={<PrincipalViewCart />} />

        <Route
          path="procurement-services/track-order-history"
          element={<PrincipalTrackOrderHistoryTable />}
        />
        <Route
          path="procurement-services/track-order-history/view-order-history"
          element={<PrincipalViewOrderHistory />}
        />
                {/* end P */}
                {/* Notification */}
            <Route
          path="view-all-notification"
          element={<ViewAllNotifications />}
        />     

           {/* Visiting */}

        <Route
          path="visiting-schedule"
          element={<PrincipalScheduleVisitor />}
        /> 

        <Route
          path="visiting-schedule/apply-visiting"
          element={<PrincipalApplyForVisiting />}
        /> 

        <Route
          path="visiting-schedule/update-visit-details"
          element={<PrincipalUpdateVisitingDetails />}
        /> 

        <Route
          path="visiting-schedule/view-visit-details"
          element={<PrincipalViewVisitingDetails />}
        /> 

      </Route>

      {/* ===================================== Student Routes ================================= */}

      <Route
        path="/student-dashboard"
        element={
          // allowedRoles={["Student"]}
          <PrivateRoute >
            <DashboardLayout>
              <StudentDashboardMain />
            </DashboardLayout>
          </PrivateRoute>
        }
      >
        <Route index element={<StudentDashboard />} />

        <Route
          path="view-principal-profile"
          element={<ViewPrincipalProfile />}
        /> 
 
        <Route
          path="update-principal-profile"
          element={<UpdatePrincipalProfile />}
        />

        <Route
          path="change-password"
          element={<PrincipalChangePassword />}
        />

        <Route
          path="attendance-leave/attendance-report"
          element={<StudentAttendanceReport />}
        />

        <Route
          path="attendance-leave/leave-record"
          element={<StudentLeaveRecords />}
        />

        <Route
          path="attendance-leave/leave-record/apply-leave"
          element={<StudentApplyForLeave />}
        />

        <Route
          path="attendance-leave/leave-record/view-leave-details"
          element={<StudentViewLeaveDetails />}
        />

        <Route
          path="attendance-leave/leave-record/update-leave-details"
          element={<StudentUpdateLeave />}
        />
        
         {/* Note */}
        <Route path="notes-notice/notes" element={<StudentNotes />} />

        <Route path="notes-notice/notes/add-note" element={<AddStudentNotes />} />

        <Route path="notes-notice/notes/view-note" element={<ViewStudentNotesDetails />} />

        <Route path="notes-notice/notes/update-note" element={<UpdateStudentNotes />} />

       {/* Notices */}
        <Route path="notes-notice/notices" element={<StudentNotices />} />

        <Route path="notes-notice/notices/add-notice" element={<AddStudentNotices />} />

        <Route path="notes-notice/notices/view-notice" element={<ViewStudentNoticeDetails />} />

        <Route path="notes-notice/notices/update-notice" element={<UpdateStudentNotices />} />

         {/* Holiday */}
        <Route
          path="holiday"
          element={< StudentSchoolHolidaysList/>}
        />

        <Route
          path="holiday/view-holiday"
          element={<ViewSchoolHolidaysStudent/>}
        /> 

        <Route
          path="class-timetable"
          element={<ClassTimetable/>}
        />
        
        {/* Exam */}
        <Route
          path="exam/exam-list"
          element={<ExamTimetableList/>}
        />

        <Route
          path="exam/exam-list/exam-timetable"
          element={<ViewExamTimetable/>}
        />

        <Route
          path="exam/exam-result-list"
          element={<ExamResultList/>}
        />

        <Route
          path="exam/exam-result-list/view-result"
          element={<ViewExamResult/>}
        />

        {/* Feedback */}
        <Route
          path="teachers-feedback"
          element={<TeachersList/>}
        />

         <Route
          path="teachers-feedback/view-fill-feedback"
          element={<ViewTeacherFeedbackForm/>}
        />

        <Route
          path="teachers-feedback/fill-feedback"
          element={<FeedbackForm/>}
        />

         {/* Class Chat */}
        <Route
          path="class-chat"
          element={<StudentClassGroupChat />}
        />

        {/* Homework */}

        <Route
          path="homework/homework-assign-list"
          element={<StudentHomeworkList/>}
        />

        <Route
          path="homework/homework-assign-list/submit-homework"
          element={<ViewSubmitHomework/>}
        />
 
        <Route
          path="homework/homework-submit-list"
          element={<StudentSubmitHomework/>}
        />

        <Route
          path="homework/homework-submit-list/view-submit-homework"
          element={<ViewCheckSubmitHomework/>}
        />

        {/* ============Procurement Services========== */}
        {/* <Route
          path="procurement-services/dashboard"
          element={<SchoolProcurementDashboard />}
        /> */}
        <Route
          path="procurement-services/track-quote"
          element={<PrincipalTrackQuoteTable />}
        />
        <Route
          path="procurement-services/track-quote/request-quote"
          element={<PrincipalRequestQuote />}
        />
        <Route
          path="procurement-services/track-quote/view-requested-quote"
          element={<PrincipalViewRequestedQuote />}
        />

        <Route path="procurement-services/track-quote/view-quote" element={<PrincipalViewQuoteDetails />} />
        <Route
          path="procurement-services/track-quote/view-quote-table"
          element={<PrincipalViewAllQuoteTable />}
        />

        <Route path="procurement-services/view-cart" element={<PrincipalViewCart />} />

        <Route
          path="procurement-services/track-order-history"
          element={<PrincipalTrackOrderHistoryTable />}
        />
        <Route
          path="procurement-services/track-order-history/view-order-history"
          element={<PrincipalViewOrderHistory />}
        />
                {/* end P */}
                {/* Notification */}
        <Route
          path="view-all-notification"
          element={<ViewAllNotifications />}
        />     

        {/* Parents Visit */}
        <Route
          path="visiting-schedule"
          element={<ParentsScheduleVisitor />}
        /> 

        <Route
          path="visiting-schedule/apply-visiting"
          element={<ParentsApplyForVisiting />}
        /> 

        <Route
          path="visiting-schedule/update-visit-details"
          element={<ParentsUpdateVisitingDetails />}
        /> 

        <Route
          path="visiting-schedule/view-visit-details"
          element={<ParentsViewVisitingDetails />}
        /> 

        {/* Parents Child pickup */}
        <Route
          path="child-pickup"
          element={<ParentApplyChildrenPickupList />}
        /> 

        <Route
          path="child-pickup/apply-child-pickup"
          element={<ParentApplyForChildPickup />}
        /> 

        <Route
          path="child-pickup/update-child-pickup"
          element={<ParentUpdateChildPickupInfo />}
        /> 

        <Route
          path="child-pickup/view-child-pickup"
          element={<ParentViewChildPickupInfo />}
        />
      </Route>

{/* ===================================== Teachers Routes ================================= */}

      <Route
        path="/teacher-dashboard"
        element={
          // allowedRoles={["Teacher"]}
          <PrivateRoute >
            <DashboardLayout>
              <TeacherDashboardMain />
            </DashboardLayout>
          </PrivateRoute>
        }
      >
        <Route index element={<TeacherDashboard />} />

        <Route
          path="view-teacher-profile"
          element={<ViewTeacherProfile />}
        /> 
 
        <Route
          path="update-teacher-profile"
          element={<UpdateTeacherProfile />}
        />

        <Route
          path="change-password"
          element={<TeacherChangePassword />}
        />

        {/* Timetable */}
        <Route
          path="lectures-timetable"
          element={<TeacherTimetable />}
        />


         {/* Holiday */}
        <Route
          path="holiday"
          element={< TeachersSchoolHolidaysList/>}
        />

        <Route
          path="holiday/view-holiday"
          element={<ViewSchoolHolidaysTeacher/>}
        /> 

            {/* Student Attendance */}
        <Route
          path="student-attendance-leave/mark-attendance"
          element={<MarkStudentAttendance />}
        />
 
        <Route
          path="student-attendance-leave/attendance-report"
          element={<StudentAttendanceReportTeacher />}
        />

        <Route
          path="student-attendance-leave/attendance-report/view-report"
          element={<TeacherViewStudentAttendanceReport />}
        />

        <Route
          path="student-attendance-leave/leave"
          element={<StudentApplyLeaveList />}
        />

        <Route
          path="student-attendance-leave/leave/view-leave-details"
          element={<ViewStudentLeaveDetails />}
        />

        {/* Teacher Attendance leave*/}
        <Route
          path="attendance-leave/attendance-report"
          element={<TeacherAttendanceReport />}
        />

        <Route
          path="attendance-leave/leave-record"
          element={<TeacherLeaveList />}
        />

        <Route
          path="attendance-leave/leave-record/apply-leave"
          element={<TeacherApplyForLeave />}
        />

        <Route
          path="attendance-leave/leave-record/view-leave-details"
          element={<TeacherViewLeaveDetails />}
        />

        <Route
          path="attendance-leave/leave-record/update-leave-details"
          element={<TeacherUpdateLeaveDetails />}
        />



         {/* Note */}
        <Route path="notes-notice/notes" element={<TeacherNotes />} />

        <Route path="notes-notice/notes/add-note" element={<AddTeacherNotes />} />

        <Route path="notes-notice/notes/view-note" element={<ViewTeacherNotesDetails />} />

        <Route path="notes-notice/notes/update-note" element={<UpdateTeacherNotes />} />

       {/* Notices */}
        <Route path="notes-notice/notices" element={<TeacherNotices />} />

        <Route path="notes-notice/notices/add-notice" element={<AddTeacherNotices />} />

        <Route path="notes-notice/notices/view-notice" element={<ViewTeacherNoticeDetails />} />

        <Route path="notes-notice/notices/update-notice" element={<UpdateTeacherNotices />} />

        
        <Route
          path="class-timetable"
          element={<ClassTimetable/>}
        />
        
        {/* ========== Exam =========  */}
                {/* Timetable */}
        <Route
          path="exam/exam-list"
          element={<TeacherExamTimetableList/>}
        />

        <Route
          path="exam/exam-list/exam-timetable"
          element={<TeacherViewExamTimetable/>}
        />

                    {/* Result */}
        <Route
          path="exam/exam-result-list"
          element={<TeacherExamResultList/>}
        /> 

        <Route
          path="exam/exam-result-list/view-result"
          element={<TeacherViewExamResult/>}
        />

                         {/* Fill Marks  */}

        <Route
          path="exam/exam-marks-list"
          element={<TeacherFillExamMarksList/>}
        /> 

        <Route
          path="exam/exam-marks-list/fill-marks"
          element={<TeacherFillStudentExamMarks/>}
        />

        <Route
          path="exam/exam-marks-list/view-fill-marks"
          element={<ViewTeacherFillExamMarks/>}
        />

        <Route
          path="exam/exam-marks-list/update-fill-marks"
          element={<UpdateTeacherFillMarks/>}
        />
            {/* Documents */}
        <Route
          path="documents"
          element={<TeacherLetterAndDocuments/>}
        />

        <Route
          path="documents/add-documents"
          element={<TeacherAddLetterAndDocuments/>}
        />

        <Route
          path="documents/view-documents"
          element={<TeacherViewLetterAndDocuments/>}
        />

        <Route
          path="documents/update-documents"
          element={<TeacherUpdateLetterAndDocuments/>}
        />

        {/* Resignation */}
        <Route
          path="resignation"
          element={<TeacherResignationList/>}
        />

        <Route
          path="resignation/add-resignation"
          element={<TeacherResignationForm/>}
        />

        <Route
          path="resignation/view-resignation"
          element={<ViewTeacherResignation/>}
        />

        <Route
          path="resignation/update-resignation"
          element={<UpdateTeacherResignation/>}
        />
        
        {/* Lesson Plan */}
           {/* Plan Lesson */}
        <Route
          path="lesson-plan"
          element={<TeacherPlanLessonList />}
        />

        <Route
          path="lesson-plan/add-lesson-plan"
          element={<TeacherAddLessonPlanning />}
        />

        <Route
          path="lesson-plan/view-lesson-plan"
          element={<TeacherViewLessonPlan />}
        />

        <Route
          path="lesson-plan/update-lesson-plan"
          element={<TeacherUpdateLessonPlan />}
        />

        


        {/* Feedback */}
        <Route
          path="teachers-feedback"
          element={<TeachersList/>}
        />

         <Route
          path="teachers-feedback/view-fill-feedback"
          element={<ViewTeacherFeedbackForm/>}
        />

        <Route
          path="teachers-feedback/fill-feedback"
          element={<FeedbackForm/>}
        />

         {/* Class Chat */}
        <Route
          path="class-chat"
          element={<StudentClassGroupChat />}
        />

        {/* Homework */}

        <Route
          path="homework/homework-assign-list"
          element={<HomeworkAssignList/>}
        />

        <Route
          path="homework/homework-assign-list/assign-homework"
          element={<AssignHomework/>}
        />

        <Route
          path="homework/homework-assign-list/view-assign-homework"
          element={<ViewAssignHomework/>}
        />
 
        <Route
          path="homework/homework-assign-list/update-assign-homework"
          element={<UpdateAssignHomework/>}
        />
        <Route 
          path="homework/homework-submit-list"
          element={<TeacherSubmitHomeworkList/>}
        />

        <Route
          path="homework/homework-submit-list/view-submit-homework"
          element={<ViewHomeworkToCheck/>}
        />

        {/* ============Procurement Services========== */}
        {/* <Route
          path="procurement-services/dashboard"
          element={<SchoolProcurementDashboard />}
        /> */}
        <Route
          path="procurement-services/track-quote"
          element={<PrincipalTrackQuoteTable />}
        />
        <Route
          path="procurement-services/track-quote/request-quote"
          element={<PrincipalRequestQuote />}
        />
        <Route
          path="procurement-services/track-quote/view-requested-quote"
          element={<PrincipalViewRequestedQuote />}
        />

        <Route path="procurement-services/track-quote/view-quote" element={<PrincipalViewQuoteDetails />} />
        <Route
          path="procurement-services/track-quote/view-quote-table"
          element={<PrincipalViewAllQuoteTable />}
        />

        <Route path="procurement-services/view-cart" element={<PrincipalViewCart />} />

        <Route
          path="procurement-services/track-order-history"
          element={<PrincipalTrackOrderHistoryTable />}
        />
        <Route
          path="procurement-services/track-order-history/view-order-history"
          element={<PrincipalViewOrderHistory />}
        />
                {/* end P */}
                {/* Notification */}
            <Route
          path="view-all-notification"
          element={<ViewAllNotifications />}
        />     

        {/* Visiting */}

        <Route
          path="visiting-schedule"
          element={<TeacherScheduleVisitor />}
        /> 

        <Route
          path="visiting-schedule/apply-visiting"
          element={<TeacherApplyForVisiting />}
        /> 

        <Route
          path="visiting-schedule/update-visit-details"
          element={<TeacherUpdateVisitingDetails />}
        /> 

        <Route
          path="visiting-schedule/view-visit-details"
          element={<TeacherViewVisitingDetails />}
        /> 


      </Route>



{/* Website Routes */}
      <Route
        path="/"
        element={
          <>
            <RemoveThemeAttribute />
            <WebsiteMain />
          </>
        }
      >
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
      </Route>
      {/*-------------------------------------------- Root Route - Auto Redirect----------------------------------------- */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            role === "Admin" ? (
              <Navigate to="/admin-dashboard/dashboard" replace />
            ) : role === "School" ? (
              <Navigate to="/school-dashboard/dashboard" replace />
            ) : role === "Seller" ? (
              <Navigate to="/seller-dashboard/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/*----------------------------------------- Error Routes-------------------------------------------------------- */}
      <Route path="/404" element={<PagenotFound404 />} />
      <Route path="/unauthorized" element={<UnauthorizedAccess />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
