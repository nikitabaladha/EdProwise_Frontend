// WebsiteRoutes.js
import React from "react";
import { Route } from "react-router-dom";
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

import RemoveThemeAttribute from './RemoveThemeAttribute';

export const WebsiteRoutes = (
  <Route path="/" element={<>
    <RemoveThemeAttribute />
    <WebsiteMain />
  </>}>
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
);