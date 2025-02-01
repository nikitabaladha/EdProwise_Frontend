import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DigitalSection from "./SubSections/DigitalService";
import BusinessSection from "./SubSections/BusinessSection";
import RecruitmentSection from "./SubSections/RecruitmentSection";
import ProcurementSection from "./SubSections/ProcurementSection";

const ServiceMainSection = () => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/services/digital-services":
        setActiveTab("digitalSection");
        break;
      case "/services/business-services":
        setActiveTab("businessSection");
        break;
      case "/services/recruitment-services":
        setActiveTab("recruitmentSection");
        break;
      case "/services/procurement-services":
        setActiveTab("procurementSection");
        break;
      default:
        setActiveTab("");
        break;
    }
  }, [location.pathname]);

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section className="wpo-courses-section-s2 section-padding p-0">
      <div className="nav-tabs-container">
        <button
          id="digitalTab"
          className={`nav-tab ${
            activeTab === "digitalSection" ? "active" : ""
          }`}
          onClick={() => showTab("digitalSection")}
        >
          Digital Services
        </button>
        <button
          id="businessTab"
          className={`nav-tab ${
            activeTab === "businessSection" ? "active" : ""
          }`}
          onClick={() => showTab("businessSection")}
        >
          Academic & Admin
        </button>
        <button
          id="procurementTab"
          className={`nav-tab ${
            activeTab === "procurementSection" ? "active" : ""
          }`}
          onClick={() => showTab("procurementSection")}
        >
          Get Goods for your School
        </button>
        <button
          id="recruitmentTab"
          className={`nav-tab ${
            activeTab === "recruitmentSection" ? "active" : ""
          }`}
          onClick={() => showTab("recruitmentSection")}
        >
          Hire School Teacher
        </button>
      </div>
      <div className="container section-padding">
        <div
          className={`show-tab ${
            activeTab === "digitalSection" ? "active" : ""
          }`}
          id="digitalSection"
        >
          <DigitalSection />
        </div>
        <div
          className={`show-tab ${
            activeTab === "businessSection" ? "active" : ""
          }`}
          id="businessSection"
        >
          <BusinessSection />
        </div>
        <div
          className={`show-tab ${
            activeTab === "recruitmentSection" ? "active" : ""
          }`}
          id="recruitmentSection"
        >
          <RecruitmentSection />
        </div>
        <div
          className={`show-tab ${
            activeTab === "procurementSection" ? "active" : ""
          }`}
          id="procurementSection"
        >
          <ProcurementSection />
        </div>
      </div>
    </section>
  );
};

export default ServiceMainSection;
