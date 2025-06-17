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


// ===================================PayRoll===========================
import EmployeeRegistrationList from "./components/DashboardMainForAdmin/PayrollModule/Employer/EmployeeRegistration/EmployeeRegistrationList.js";
import AddEmployeeRegistration from "./components/DashboardMainForAdmin/PayrollModule/Employer/EmployeeRegistration/AddEmployeeRegistration.js";
import UpdateEmployeeRegistrationForm from "./components/DashboardMainForAdmin/PayrollModule/Employer/EmployeeRegistration/UpdateEmployeeRegistrationForm.js";
import ViewEmployeeRegisterDetails from "./components/DashboardMainForAdmin/PayrollModule/Employer/EmployeeRegistration/ViewEmployeeRegisterDetails.js";
import UpdateEmployeeDetails from "./components/DashboardMainForAdmin/PayrollModule/Employer/UpdateDetails/UpdateEmployeeDetails.js";
import CTCUpdate from "./components/DashboardMainForAdmin/PayrollModule/Employer/CTCUpdate/CTCUpdate.js";
import DefineCtcComponentsList from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/CTCDefineComponents/DefineCtcComponentsList.js";
import DefineCtcCOmponents from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/CTCDefineComponents/DefineCtcCOmponents.js";
import EmployeeDetails from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/EmployeeDetails/EmployeeDetails.js";
import AddProcessPayroll from "./components/DashboardMainForAdmin/PayrollModule/Employer/ProcessPayroll/AddProcessPayroll.js";
import AddSalaryIncrement from "./components/DashboardMainForAdmin/PayrollModule/Employer/SalaryIncrement/AddSalaryIncrement.js";
import SalarySlip from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/Salary Slip/SalarySlip.js";
import Form16 from "./components/DashboardMainForAdmin/PayrollModule/Employer/Form16/Form16.js";
import ItDeclaration from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/ITDeclaration/ItDeclaration.js";
import RentDetails from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/ITDeclaration/RentDetails.js";
import Form16Self from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/Form16/Form16.js";
import LoanStatement from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LoanStatement/LoanStatement.js";
import MyAttendanceReport from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/MyAttendanceReport/MyAttendanceReport.js";
import ApplyForLeave from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/ApplyForLeave/ApplyForLeave.js";
import IncomeTaxComputationSheet from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/IncomeTaxComputationSheet/IncomeTaxComputationSheet.js";
import GenerateAppointmentCTCLetter from "./components/DashboardMainForAdmin/PayrollModule/Employer/Generate AppointmentCTC Letter/GenerateAppointmentCTCLetter.js";
import CheckSupportingSubmittedForTaxList from "./components/DashboardMainForAdmin/PayrollModule/Employer/CheckSupportingSubmittedForTax/CheckSupportingSubmittedForTaxList.js";
import ViewCheckSupportingSubmittedForTaxList from "./components/DashboardMainForAdmin/PayrollModule/Employer/CheckSupportingSubmittedForTax/ViewCheckSupportingSubmittedForTaxList.js";
import VerifyRentDetails from "./components/DashboardMainForAdmin/PayrollModule/Employer/CheckSupportingSubmittedForTax/VerifyRentDetails.js";
import PayLoan from "./components/DashboardMainForAdmin/PayrollModule/Employer/LoanToEmployees/PayLoan.js";
import EmployeeLoanStatement from "./components/DashboardMainForAdmin/PayrollModule/Employer/LoanToEmployees/EmployeeLoanStatement.js";
import ViewEmployeeLoanStatement from "./components/DashboardMainForAdmin/PayrollModule/Employer/LoanToEmployees/ViewEmployeeLoanStatement.js";
import OvertimeAllowanceEmployeesTable from "./components/DashboardMainForAdmin/PayrollModule/Employer/OvertimeAllowance/OvertimeAllowanceEmployeesTable.js";
import ViewOvertimeAllowanceEmployeesDetail from "./components/DashboardMainForAdmin/PayrollModule/Employer/OvertimeAllowance/ViewOvertimeAllowanceEmployeesDetail.js";
import PerformanceTrackingTable from "./components/DashboardMainForAdmin/PayrollModule/Employer/PerformanceTracking/PerformanceTrackingTable.js";
import BulkEmployeeIncrement from "./components/DashboardMainForAdmin/PayrollModule/Employer/SalaryIncrement/BulkEmployeeIncrement/BulkEmployeeIncrement.js";
import SingleEmployeeIncrement from "./components/DashboardMainForAdmin/PayrollModule/Employer/SalaryIncrement/SingleEmployeeIncrement/SingleEmployeeIncrement.js";
import AnnualLeaveUpdate from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/AnnualLeaveUpdate/AnnualLeaveUpdate.js";
import OvertimeAllowanceRate from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/OvertimeAllowanceRate/OvertimeAllowanceRate.js";
import LoanSummary from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LoanStatement/LoanSummary.js";
import PreviousEmploymentIncome from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/PreviousEmploymentIncome/PreviousEmploymentIncome.js";
import EmployeeResignationForm from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/EmployeeExit/EmployeeResignation/EmployeeResignationForm.js";
import ResignationReport from "./components/DashboardMainForAdmin/PayrollModule/Employer/ResignationReport/ResignationReport.js";
import EmployeeExitInterview from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/EmployeeExit/EmployeeExitInterview/EmployeeExitInterview.js";
import EmployerResignationApproval from "./components/DashboardMainForAdmin/PayrollModule/Employer/EmployerResignationApproval/EmployerResignationApproval.js";
import ViewEmployeeResignationDetail from "./components/DashboardMainForAdmin/PayrollModule/Employer/ResignationReport/ViewEmployeeResignationDetails.js";
import ViewEmployeeExitInterview from "./components/DashboardMainForAdmin/PayrollModule/Employer/ResignationReport/ViewEmployeeExitInterview.js";
import RequestForLoan from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/RequestForLoan/RequestForLoan.js";
import PayLoanEmployeeTable from "./components/DashboardMainForAdmin/PayrollModule/Employer/LoanToEmployees/PayLoanEmployeeTable.js";
import ViewEmployeeLoanSummary from "./components/DashboardMainForAdmin/PayrollModule/Employer/LoanToEmployees/ViewEmployeeLoanSummary.js";
import FreezeITDeclaration from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/FreezeITDeclaration/FreezeITDeclaration.js";
import DefineJobDesignation from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/JobDesignation/DefineJobDesignation.js";
import DefineGrade from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/Grade/DefineGrade.js";
import ViewEmployeePerformanceAppraisal from "./components/DashboardMainForAdmin/PayrollModule/Employer/PerformanceTracking/ViewEmployeePerformanceAppraisal.js";
import DefineCategory from "./components/DashboardMainForAdmin/PayrollModule/AdminSettings/DefineCategory/DefineCategory.js";
import LetterAndDocuments from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LetterAndDocuments/LetterAndDocuments.js";
import PromotionNomination from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/PromotionNomination/PromotionNomination.js";
import AddAwardsAndAchievement from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/AwardsAndAchievement/AddAwardsAndAchievement.js";
import AwardsAndAchievement from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/AwardsAndAchievement/AwardsAndAchievement.js";
import ViewAwardAndAchievement from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/AwardsAndAchievement/ViewAwardAndAchievement.js";
import AddLetterAndDocuments from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LetterAndDocuments/AddLetterAndDocuments.js";
import ViewLetterAndDocuments from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LetterAndDocuments/ViewLetterAndDocuments.js";
import UpdateLetterAndDocuments from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/LetterAndDocuments/UpdateLetterAndDocuments.js";
import UpdateAwardsAndAchievement from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/AwardsAndAchievement/UpdateAwardsAndAchievement.js";

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

///////////////////////////////// Payroll Module ///////////////////////////////////////
import DefineEmployeeCategory from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/DefineCategory/DefineEmployeeCategory.js";

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
import RelievingAndExperienceLetter from "./components/DashboardMainForAdmin/PayrollModule/Employer/RelievingAndExperienceLetter/RelievingAndExperienceLetter.js";
import EmployeeRelievingAndExperienceLetter from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/EmployeeRelievingAndExperienceLetter/EmployeeRelievingAndExperienceLetter.js";
import EmployerAwadsAndAchievement from "./components/DashboardMainForAdmin/PayrollModule/Employer/AwardsAndAchievement/EmployerAwardsAndAchievement.js";
import AwardsAndAchievementCertificate from "./components/DashboardMainForAdmin/PayrollModule/Employer/AwardsAndAchievement/AwardsAndAchievementCertificate.js";
import PromotionNominationTable from "./components/DashboardMainForAdmin/PayrollModule/Employer/PromotionNomination/PromotionNominationTable.js";
import ViewPromotionNominationDetail from "./components/DashboardMainForAdmin/PayrollModule/Employer/PromotionNomination/ViewPromotionNominationDetail.js";
import ViewPromotionNomination from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/PromotionNomination/ViewPromotionNomination.js";
import UpdatePromotionNomination from "./components/DashboardMainForAdmin/PayrollModule/EmployeeSelfService/PromotionNomination/UpdatePromotionNomination.js";
import Blogs from "./components/DashboardMainForAdmin/Blogs/Blogs.js";
import AddNewBlog from "./components/DashboardMainForAdmin/Blogs/AddNewBlog/AddNewBlog.js";
import UpdateBlog from "./components/DashboardMainForAdmin/Blogs/UpdateBlog/UpdateBlog.js";
import BlogsInfoTable from "./components/DashboardMainForAdmin/Blogs/BlogsInfoTable.js";
import PaymentEntry from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Payment/PaymentEntry.js";
import Receipts from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Receipts/Receipts.js";
import Contra from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Contra/Contra.js";
import Journal from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Journal/Journal.jsx";
import LedgerBook from "./components/DashboardMainForAdmin/FinanceModule/Display/LedgerBook/LedgerBook.js";
import PaymentLedger from "./components/DashboardMainForAdmin/FinanceModule/Display/PaymentLedger/PaymentLedger.js";
import ReceiptsLedger from "./components/DashboardMainForAdmin/FinanceModule/Display/ReceiptsLedger/ReceiptsLedger.js";
import ContraLedger from "./components/DashboardMainForAdmin/FinanceModule/Display/ContraLedger/ContraLedger.js";
import JournalLedger from "./components/DashboardMainForAdmin/FinanceModule/Display/JournalLedger/JournalLedger.js";
import TrailBalance from "./components/DashboardMainForAdmin/FinanceModule/Display/TrailBalance/TrailBalance.js";
import CashBookReport from "./components/DashboardMainForAdmin/FinanceModule/Reports/CashBook/CashBookReport.jsx";
import BankBookReport from "./components/DashboardMainForAdmin/FinanceModule/Reports/BankBook/BankBookReport.jsx";
import IncomeLedgerReport from "./components/DashboardMainForAdmin/FinanceModule/Reports/IncomeLedger/IncomeLedgerReport.jsx";
import ExpensesLedgerReport from "./components/DashboardMainForAdmin/FinanceModule/Reports/ExpensesLedger/ExpensesLedgerReport.jsx";
import JournalLedgerReport from "./components/DashboardMainForAdmin/FinanceModule/Reports/JournalLedger/JournalLedgerReport.jsx";
import TDSReport from "./components/DashboardMainForAdmin/FinanceModule/Reports/TDSReport/TDSReport.jsx";
import AnalysisofPandL from "./components/DashboardMainForAdmin/FinanceModule/MIS Reporting/AnalysisofP&L/AnalysisofPandL.jsx";
import RatioAnalysis from "./components/DashboardMainForAdmin/FinanceModule/MIS Reporting/RatioAnalysis/RatioAnalysis.jsx";
import VerificationofPaymentEntry from "./components/DashboardMainForAdmin/FinanceModule/Audit&Documentation/VerificationofPaymentEntry/VerificationofPaymentEntry.jsx";
import VerificationofReceiptEntry from "./components/DashboardMainForAdmin/FinanceModule/Audit&Documentation/VerificationofReceiptEntry/VerificationofReceiptEntry.jsx";
import VerificationofContraEntry from "./components/DashboardMainForAdmin/FinanceModule/Audit&Documentation/VerificationofContraEntry/VerificationofContraEntry.jsx";
import VerificationofJournalEntry from "./components/DashboardMainForAdmin/FinanceModule/Audit&Documentation/VerificationofJournalEntry/VerificationofJournalEntry.jsx";
import AuditorRemarks from "./components/DashboardMainForAdmin/FinanceModule/Audit&Documentation/AuditorRemarks/AuditorRemarks.jsx";
import UploadDocumentforAuditor from "./components/DashboardMainForAdmin/FinanceModule/Audit&Documentation/UploadDocumentforAuditor/UploadDocumentforAuditor.jsx";
import BalanceSheet from "./components/DashboardMainForAdmin/FinanceModule/FinancialStatement/BalanceSheet/BalanceSheet.jsx";
import IncomeAndExpenditureAccount from "./components/DashboardMainForAdmin/FinanceModule/FinancialStatement/Income&ExpenditureAccount/IncomeAndExpenditureAccount.jsx";
import ScheduleToIncome from "./components/DashboardMainForAdmin/FinanceModule/FinancialStatement/ScheduletoIncome/ScheduleToIncome.jsx";
import ScheduleToExpenditure from "./components/DashboardMainForAdmin/FinanceModule/FinancialStatement/ScheduletoExpenditure/ScheduleToExpenditure.jsx";
import ScheduleToAssets from "./components/DashboardMainForAdmin/FinanceModule/FinancialStatement/ScheduletoAssets/ScheduleToAssets.jsx";
import ScheduleToLiabilities from "./components/DashboardMainForAdmin/FinanceModule/FinancialStatement/ScheduletoLiabilities/ScheduleToLiabilities.jsx";
import FixedAssetsSchedule from "./components/DashboardMainForAdmin/FinanceModule/FinancialStatement/FixedAssetsSchedule/FixedAssetsSchedule.jsx";
import DocumentForAuditor from "./components/DashboardMainForAdmin/FinanceModule/AuditPack/DocumentForAuditor/DocumentForAuditor.jsx";
import DepreciationMaster from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/DepreciationMaster/DepreciationMaster.jsx";
import CreateVendor from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateVendor/CreateVendor.jsx";
import VendorMaster from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/VendorMaster/VendorMaster.jsx";
import TDSRateChart from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/TDSRateChart/TDSRateChart.jsx";
import LedgerMaster from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/LedgerMaster/LedgerMaster.jsx";
import CreateAndAlterLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/CreateAndAlterLedger.jsx";
import AddNewVendor from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateVendor/AddNewVendor.jsx";
import CreateLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/CreateLedger.jsx";
import CreateGroupLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/CreateGroupLedger.jsx";
import CreateBAndSLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/CreateBAndSLedger.jsx";
import CreateBlogCategory from "./components/DashboardMainForAdmin/Blogs/BlogSetting/CreateBlogCategory/CreateBlogCategory.jsx";
import CreateBlogTags from "./components/DashboardMainForAdmin/Blogs/BlogSetting/CreateBlogTags/CreateBlogTags.jsx";
import BlogsStatus from "./components/DashboardMainForAdmin/Blogs/BlogSetting/BlogStatus/BlogsStatus.jsx";
import UpdateLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/Update/UpdateLedger.jsx";
import UpdateGroupLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/Update/UpdateGroupLedger.jsx";
import UpdateBAndSLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/Update/UpdateBAndSLedger.jsx";
import DeleteLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/Delete/DeleteLedger.jsx";
import DeleteGroupLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/Delete/DeleteGroupLedger.jsx";
import DeleteBAndSLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/Delete/DeleteBAndSLedger.jsx";
import CreateHeadOfLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/CreateHeadOfLedger.jsx";
import UpdateHeadOfLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/Update/UpdateHeadOfLedger.jsx";
import DeleteHeadOfLedger from "./components/DashboardMainForAdmin/FinanceModule/CreateAndMaster/CreateAndAlterLedger/Delete/DeleteHeadOfLedger.jsx";
import ContraTable from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Contra/ContraTable.js";
import ViewContra from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Contra/ViewContra.js";
import UpdateContra from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Contra/UpdateContra.js";
import PaymentEntryTable from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Payment/PaymentEntryTable.jsx";
import ViewPaymentEntry from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Payment/ViewPaymentEntry.jsx";
import UpdatePaymentEntry from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Payment/UpdatePaymentEntry.jsx";
import ReceiptsTable from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Receipts/ReceiptsTable.jsx";
import ViewReceipts from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Receipts/ViewReceipts.jsx";
import UpdateReceipts from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Receipts/UpdateReceipts.jsx";
import JournalTable from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Journal/JournalTable.jsx";
import ViewJournal from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Journal/ViewJournal.jsx";
import UpdateJournal from "./components/DashboardMainForAdmin/FinanceModule/AccountingEntry/Journal/UpdateJournal.jsx";
import TermsAndConditionForSeller from "./components/PrivacyPage/TermsAndConditionForSeller.jsx";
import ViewBlog from "./components/DashboardMainForAdmin/Blogs/ViewBlog/ViewBlog.js";
import EducatorZoneBlog from "./components/CommunitySection/SubSection/EducatorZoneBlog/EducatorZoneBlog.jsx";
import StudentZoneBlog from "./components/CommunitySection/SubSection/StudentZoneBlog/StudentZoneBlog.jsx";
import CategoryAndTagRelatedBlog from "./components/CommunitySection/SubSection/CategoryAndTagRelatedBlog.jsx";
import EducatorCategoryAndTagRelatedBlog from "./components/CommunitySection/SubSection/EducatorZoneBlog/EducatorCategoryAndTagRelatedBlog.jsx";
import DefineEmployeeJobDesignation from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/JobDesignation/DefineEmployeeJobDesignation.js";
import DefinePayrollGrade from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/Grade/DefinePayrollGrade.js";
import EmployeeIdSettings from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/EmployeeIdSettingPrefix/EmployeeIdSettings.js";
import EmployeeIdPrefixTable from "./components/DashboardMainForSchool/PayrollModule/AdminSettings/EmployeeIdSettingPrefix/EmployeeIdPrefixTable.jsx";
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
          <Route path="hire-teacher" element={<RecruitmentSection />} />
          <Route path="get-goods-for-school" element={<ProcurementSection />} />
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
        <Route path="terms-condition-for-seller" element={<TermsAndConditionForSeller/>}/>
        <Route
          path="services/digital-services/school-fees-management"
          element={<ServiceFess />}
        />
        <Route
          path="services/digital-services/school-payroll"
          element={<PayrollService />}
        />
        <Route
          path="services/digital-services/school-financial-management"
          element={<FinanceBook />}
        />
        <Route
          path="services/digital-services/school-operation-management"
          element={<SchoolOperation />}
        />
        <Route
          path="services/digital-services/school-mobile-application"
          element={<SchoolApplication />}
        />
        <Route
          path="services/digital-services/school-website-design"
          element={<SchoolWebsiteDesign />}
        />

        <Route
          path="community-connect/student-zone/proposed-exam-reforms-by-cbse"
          element={<StudentZoneFullBlog />}
        />

        <Route
          path="community-connect/student-zone/how-to-be-successful-in-the-cbse-board-exam"
          element={<StudentZoneFullBlog2 />}
        />

        <Route
          path="community-connect/educator-zone/how-to-be-successful-teacher"
          element={<EducatorZoneBlog1 />}
        />

        <Route
          path="community-connect/educator-zone/teaching-strategies-and-pedagogy"
          element={<EducatorZoneBlog2 />}
        />

        <Route
          path="community-connect/educator-zone/teacher-well-being-and-work-life-balance"
          element={<EducatorZoneBlog3 />}
        />

        <Route
          path="community-connect/student-zone/:slug"
          element={<StudentZoneBlog />}
        />

        <Route
          path="community-connect/educator-zone/:slug"
          element={<EducatorZoneBlog />}
        />

        <Route
          path="community-connect/student-zone/category-tag-related-blogs"
          element={<CategoryAndTagRelatedBlog />}
        />

         <Route
          path="community-connect/educator-zone/category-tag-related-blogs"
          element={<EducatorCategoryAndTagRelatedBlog />}
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

        {/* *****************************Payroll Module ***************************************** */}

        {/* ===========================Admin Settings=================== */}
        <Route
          path="payroll-module/admin-setting/freeze-it-declaration"
          element={<FreezeITDeclaration />}
        />

        <Route
          path="payroll-module/admin-setting/ctc-components"
          element={<DefineCtcComponentsList />}
        />

        <Route
          path="payroll-module/admin-setting/ctc-components/define-ctc-components"
          element={<DefineCtcCOmponents />}
        />

        <Route
          path="payroll-module/admin-setting/define-grade"
          element={<DefineGrade />}
        />

        <Route
          path="payroll-module/admin-setting/define-category"
          element={<DefineCategory />}
        />

        <Route
          path="payroll-module/admin-setting/annual-leave-update"
          element={<AnnualLeaveUpdate />}
        />

        <Route
          path="payroll-module/admin-setting/overtime-allowance-rate"
          element={<OvertimeAllowanceRate />}
        />

        <Route
          path="payroll-module/admin-setting/define-job-designation"
          element={<DefineJobDesignation />}
        />



        {/* ************Employee Self Services */}
        <Route
          path="payroll-module/employee-services/update-details"
          element={<EmployeeDetails />}
        />

        <Route
          path="payroll-module/employee-services/salary-slip"
          element={<SalarySlip />}
        />

        <Route
          path="payroll-module/employee-services/income-tax/it-declaration"
          element={<ItDeclaration />}
        />

        <Route
          path="payroll-module/employee-services/income-tax/it-declaration/rent-details"
          element={<RentDetails />}
        />

        <Route
          path="payroll-module/employee-services/income-tax/income-tax-computation-sheet"
          element={<IncomeTaxComputationSheet />}
        />

        <Route
          path="payroll-module/employee-services/income-tax/form16"
          element={<Form16Self />}
        />

        <Route
          path="payroll-module/employee-services/income-tax/previous-employment-income"
          element={<PreviousEmploymentIncome />}
        />

        <Route
          path="payroll-module/employee-services/request-for-loan"
          element={<RequestForLoan />}
        />

        <Route
          path="payroll-module/employee-services/loan-summary"
          element={<LoanSummary />}
        />

        <Route
          path="payroll-module/employee-services/loan-summary/my-loan-statement"
          element={<LoanStatement />}
        />

        <Route
          path="payroll-module/employee-services/my-attendance-report"
          element={<MyAttendanceReport />}
        />

        <Route
          path="payroll-module/employee-services/apply-for-leave"
          element={<ApplyForLeave />}
        />

        <Route
          path="payroll-module/employee-services/exit/employee-resignation-form"
          element={<EmployeeResignationForm />}
        />

        <Route
          path="payroll-module/employee-services/exit/exit-interview"
          element={<EmployeeExitInterview />}
        />

        <Route
          path="payroll-module/employee-services/letter-documents"
          element={<LetterAndDocuments />}
        />

        <Route
          path="payroll-module/employee-services/letter-documents/add-letter-documents"
          element={<AddLetterAndDocuments />}
        />

        <Route
          path="payroll-module/employee-services/letter-documents/view-letter-documents"
          element={<ViewLetterAndDocuments />}
        />

        <Route
          path="payroll-module/employee-services/letter-documents/update-letter-documents"
          element={<UpdateLetterAndDocuments />}
        />

        <Route
          path="payroll-module/employee-services/award-achievement"
          element={<AwardsAndAchievement />}
        />

        <Route
          path="payroll-module/employee-services/award-achievement/add-award-achievement"
          element={<AddAwardsAndAchievement />}
        />

        <Route
          path="payroll-module/employee-services/award-achievement/view-award-achievement"
          element={<ViewAwardAndAchievement />}
        />

        <Route
          path="payroll-module/employee-services/award-achievement/update-award-achievement"
          element={<UpdateAwardsAndAchievement />}
        />

        <Route
          path="payroll-module/employee-services/promotion-nomination"
          element={<PromotionNomination />}
        />

        <Route
          path="payroll-module/employee-services/promotion-nomination/view-promotion-nomination"
          element={<ViewPromotionNomination />}
        />

        <Route
          path="payroll-module/employee-services/promotion-nomination/update-promotion-nomination"
          element={<UpdatePromotionNomination />}
        />

        <Route
          path="payroll-module/employee-services/exit/relieving-and-experience-letter"
          element={<EmployeeRelievingAndExperienceLetter />}
        />

        {/* ************Employer************  */}

        <Route
          path="payroll-module/employer/registration"
          element={<EmployeeRegistrationList />}
        />

        <Route
          path="payroll-module/employer/registration/registration-form"
          element={<AddEmployeeRegistration />}
        />

        <Route
          path="payroll-module/employer/registration/update-registration-form"
          element={<UpdateEmployeeRegistrationForm />}
        />

        <Route
          path="payroll-module/employer/registration/view-registration-form"
          element={<ViewEmployeeRegisterDetails />}
        />

        <Route
          path="payroll-module/employer/update-employee-details"
          element={<UpdateEmployeeDetails />}
        />

        <Route
          path="payroll-module/employer/ctc-Update"
          element={<CTCUpdate />}
        />

        <Route
          path="payroll-module/employer/payroll-process"
          element={<AddProcessPayroll />}
        />

        <Route
          path="payroll-module/employer/salary-increment/bulk-employee-increment"
          element={<BulkEmployeeIncrement />}
        />

        <Route
          path="payroll-module/employer/salary-increment/single-employee-increment"
          element={<SingleEmployeeIncrement />}
        />

        <Route
          path="payroll-module/employer/form-16-list"
          element={<Form16 />}
        />

        <Route
          path="payroll-module/employer/generate-appointment-ctc-letter"
          element={<GenerateAppointmentCTCLetter />}
        />

        <Route
          path="payroll-module/employer/supporting-tax-submitted"
          element={<CheckSupportingSubmittedForTaxList />}
        />

        <Route
          path="payroll-module/employer/supporting-tax-submitted/view-supporting-submitted-for-Tax"
          element={<ViewCheckSupportingSubmittedForTaxList />}
        />

        <Route
          path="payroll-module/employer/supporting-tax-submitted/view-supporting-submitted-for-Tax/view-rent-details"
          element={<VerifyRentDetails />}
        />

        <Route
          path="payroll-module/employer/loan-to-employees/pay-loan"
          element={<PayLoanEmployeeTable />}
        />

        <Route
          path="payroll-module/employer/loan-to-employees/pay-loan/pay-loan-detail"
          element={<PayLoan />}
        />

        <Route
          path="payroll-module/employer/loan-to-employees/loan-statement"
          element={<EmployeeLoanStatement />}
        />

        <Route
          path="payroll-module/employer/loan-to-employees/loan-statement/view-loan-summary"
          element={<ViewEmployeeLoanSummary />}
        />

        <Route
          path="payroll-module/employer/loan-to-employees/loan-statement/view-loan-summary/view-loan-Statement"
          element={<ViewEmployeeLoanStatement />}
        />

        <Route
          path="payroll-module/employer/overtime-allowance"
          element={<OvertimeAllowanceEmployeesTable />}
        />

        <Route
          path="payroll-module/employer/overtime-allowance/view-overtime-allowance-detail"
          element={<ViewOvertimeAllowanceEmployeesDetail />}
        />

        <Route
          path="payroll-module/employer/performance-tracking"
          element={<PerformanceTrackingTable />}
        />

        <Route
          path="payroll-module/employer/performance-tracking/employee-performance-appraisal"
          element={<ViewEmployeePerformanceAppraisal />}
        />

        <Route
          path="payroll-module/employer/resign/resignation"
          element={<ResignationReport />}
        />

        <Route
          path="payroll-module/employer/resign/resignation/resignation-approval-form"
          element={<EmployerResignationApproval />}
        />

        <Route
          path="payroll-module/employer/resign/resignation/view-employee-resignation-detail"
          element={<ViewEmployeeResignationDetail />}
        />

        <Route
          path="payroll-module/employer/resign/resignation/view-employee-exit-interview"
          element={<ViewEmployeeExitInterview />}
        />

        <Route
          path="payroll-module/employer/resign/resignation/relieving-and-experience-letter"
          element={<RelievingAndExperienceLetter />}
        />

        <Route
          path="payroll-module/employer/awards-and-achievement"
          element={<EmployerAwadsAndAchievement />}
        />

        <Route
          path="payroll-module/employer/awards-and-achievement/awards-and-achievement-certificate"
          element={<AwardsAndAchievementCertificate />}
        />

        <Route
          path="payroll-module/employer/promotion-nomination"
          element={<PromotionNominationTable />}
        />

        <Route
          path="payroll-module/employer/promotion-nomination/view-promotion-nomination-detail"
          element={<ViewPromotionNominationDetail />}
        />

        {/* *****************************Finance Module********************* */}

        <Route
          path="finance-module/account-entry/payment-entry"
          element={<PaymentEntryTable />}
        />

        <Route
          path="finance-module/account-entry/payment-entry/payment-entry-form"
          element={<PaymentEntry />}
        />

        <Route
          path="finance-module/account-entry/payment-entry/view-payment-entry"
          element={<ViewPaymentEntry />}
        />

        <Route
          path="finance-module/account-entry/payment-entry/update-payment-entry"
          element={<UpdatePaymentEntry />}
        />

        <Route
          path="finance-module/account-entry/receipts"
          element={<ReceiptsTable />}
        />

        <Route
          path="finance-module/account-entry/receipts/receipts-entry"
          element={<Receipts />}
        />

        <Route
          path="finance-module/account-entry/receipts/view-receipts-entry"
          element={<ViewReceipts />}
        />

        <Route
          path="finance-module/account-entry/receipts/update-receipts-entry"
          element={<UpdateReceipts />}
        />

        <Route
          path="finance-module/account-entry/contra"
          element={<ContraTable />}
        />

        <Route
          path="finance-module/account-entry/contra/contra-form"
          element={<Contra />}
        />

        <Route
          path="finance-module/account-entry/contra/view-contra-form"
          element={<ViewContra />}
        />

        <Route
          path="finance-module/account-entry/contra/update-contra-form"
          element={<UpdateContra />}
        />

        <Route
          path="finance-module/account-entry/journal"
          element={<JournalTable />}
        />

        <Route
          path="finance-module/account-entry/journal/journal-entry"
          element={<Journal />}
        />

        <Route
          path="finance-module/account-entry/journal/view-journal-entry"
          element={<ViewJournal />}
        />

        <Route
         path="finance-module/account-entry/journal/update-journal-entry"
          element={<UpdateJournal />}
        />

        <Route
          path="finance-module/display/ledger-book"
          element={<LedgerBook />}
        />

        <Route
          path="finance-module/display/payment-ledger"
          element={<PaymentLedger />}
        />

        <Route
          path="finance-module/display/receipts-ledger"
          element={<ReceiptsLedger />}
        />

        <Route
          path="finance-module/display/contra-ledger"
          element={<ContraLedger />}
        />

        <Route
          path="finance-module/display/journal-ledger"
          element={<JournalLedger />}
        />

        <Route
          path="finance-module/display/trail-balance"
          element={<TrailBalance />}
        />

        <Route
          path="finance-module/reports/cash-book"
          element={<CashBookReport />}
        />

        <Route
          path="finance-module/reports/bank-book"
          element={<BankBookReport />}
        />

        <Route
          path="finance-module/reports/income-ledger"
          element={<IncomeLedgerReport />}
        />

        <Route
          path="finance-module/reports/expenses-ledger"
          element={<ExpensesLedgerReport />}
        />

        <Route
          path="finance-module/reports/journal-ledger"
          element={<JournalLedgerReport />}
        />

        <Route
          path="finance-module/reports/tds-report"
          element={<TDSReport />}
        />

        <Route
          path="finance-module/msi-reports/analysis-of-p-and-l"
          element={<AnalysisofPandL />}
        />

        <Route
          path="finance-module/msi-reports/ratio-analysis"
          element={<RatioAnalysis />}
        />

        <Route
          path="finance-module/audit-and-documentation/verification-of-payment-entry"
          element={<VerificationofPaymentEntry />}
        />
        <Route
          path="finance-module/audit-and-documentation/verification-of-receipt-entry"
          element={<VerificationofReceiptEntry />}
        />
        <Route
          path="finance-module/audit-and-documentation/verification-of-contra-entry"
          element={<VerificationofContraEntry />}
        />
        <Route
          path="finance-module/audit-and-documentation/verification-of-journal-entry"
          element={<VerificationofJournalEntry />}
        />
        <Route
          path="finance-module/audit-and-documentation/auditor-remarks"
          element={<AuditorRemarks />}
        />
        <Route
          path="finance-module/audit-and-documentation/upload-document-for-auditor"
          element={<UploadDocumentforAuditor />}
        />

        <Route
          path="finance-module/financial-statement/balance-sheet"
          element={<BalanceSheet />}
        />

        <Route
          path="finance-module/financial-statement/income-and-expenditure-account"
          element={<IncomeAndExpenditureAccount />}
        />

        <Route
          path="finance-module/financial-statement/schedule-to-income"
          element={<ScheduleToIncome />}
        />

        <Route
          path="finance-module/financial-statement/schedule-to-expenditure"
          element={<ScheduleToExpenditure />}
        />

        <Route
          path="finance-module/financial-statement/schedule-to-liabilities"
          element={<ScheduleToLiabilities />}
        />

        <Route
          path="finance-module/financial-statement/schedule-to-assets"
          element={<ScheduleToAssets />}
        />

        <Route
          path="finance-module/financial-statement/fixed-assets-schedule"
          element={<FixedAssetsSchedule />}
        />

        <Route
          path="finance-module/audit-pack/document-for-auditor"
          element={<DocumentForAuditor />}
        />

        <Route
          path="finance-module/master/depreciation-master"
          element={<DepreciationMaster />}
        />
        <Route
          path="finance-module/master/vendor-master"
          element={<VendorMaster />}
        />
        <Route
          path="finance-module/master/vendor"
          element={<CreateVendor />}
        />
        <Route
          path="finance-module/master/vendor/add-vendor-form"
          element={<AddNewVendor />}
        />
        <Route
          path="finance-module/master/tds-rate-chart"
          element={<TDSRateChart />}
        />
        <Route
          path="finance-module/master/ledger-master"
          element={<LedgerMaster />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger"
          element={<CreateAndAlterLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/create-head-of-ledger"
          element={<CreateHeadOfLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/create-ledger"
          element={<CreateLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/create-group-ledger"
          element={<CreateGroupLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/create-bs-ledger"
          element={<CreateBAndSLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/update-head-of-ledger"
          element={<UpdateHeadOfLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/update-ledger"
          element={<UpdateLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/update-group-ledger"
          element={<UpdateGroupLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/update-bs-ledger"
          element={<UpdateBAndSLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/delete-head-of-ledger"
          element={<DeleteHeadOfLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/delete-ledger"
          element={<DeleteLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/delete-group-ledger"
          element={<DeleteGroupLedger />}
        />
        <Route
          path="finance-module/master/create-and-alter-ledger/delete-bs-ledger"
          element={<DeleteBAndSLedger />}
        />

        {/* **************************************Blog************************************ */}
        <Route path="blog" element={<BlogsInfoTable />} />
        <Route path="blog/add-new-blog" element={<AddNewBlog />} />
        <Route path="blog/update-blog" element={<UpdateBlog />} />
        <Route path="blog/view-blog/:slug" element={<ViewBlog/>}/>

        <Route path="blog/blog-setting/category" element={<CreateBlogCategory />} />
        <Route path="blog/blog-setting/tags" element={<CreateBlogTags />} />
        <Route path="blog/blog-setting/blogs-status" element={<BlogsStatus />} />


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

        {/* ===========================Admin Settings=================== */}
        <Route
          path="payroll-module/admin-setting/freeze-it-declaration"
          element={<FreezeITDeclaration />}
        />

        <Route
          path="payroll-module/admin-setting/ctc-components"
          element={<DefineCtcComponentsList />}
        />

        <Route
          path="payroll-module/admin-setting/ctc-components/define-ctc-components"
          element={<DefineCtcCOmponents />}
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
          path="payroll-module/admin-setting/annual-leave-update"
          element={<AnnualLeaveUpdate />}
        />

        <Route
          path="payroll-module/admin-setting/overtime-allowance-rate"
          element={<OvertimeAllowanceRate />}
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
          path="payroll-module/admin-setting/define-job-designation"
          element={<DefineEmployeeJobDesignation />}
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

      <Route path="*" element={<Page404ForDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
