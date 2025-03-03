import React, { useState } from "react";
import PayrollKeyFeacher from "./PayrollKeyFeacher";
import PayrollReport from "./PayrollReport";
import EasePayrollFAQSection from "../../../FAQSection/EasePayrollFAQSection";
import WhatWeSolvePayroll from "./WhatWeSolvePayroll";

const PayrollTabs = () => {
  const [activeTab, setActiveTab] = useState("digitalSection");

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleDownload=(tabName)=>{
    if (tabName === "recruitmentSection") {
      const link = document.createElement("a");
      link.href = "/assets/website-images/EdProwise Brochure.pdf"; 
      link.download = "EdProwise-Brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <section className="wpo-courses-section-s2 section-padding p-0">
      <div className="nav-tabs-container">
        <button
          id="digitalTab"
          className={`nav-tab ${activeTab === "digitalSection" ? "active" : ""}`}
          onClick={() => showTab("digitalSection")}
        >
          Key Features
        </button>

        <button
          id="businessTab"
          className={`nav-tab ${activeTab === "businessSection" ? "active" : ""}`}
          onClick={() => showTab("businessSection")}
        >
          Report
        </button>

        <button
          id="procurementTab"
          className={`nav-tab ${activeTab === "procurementSection" ? "active" : ""}`}
          onClick={() => showTab("procurementSection")}
        >
          FAQ
        </button>

        <button
          id="whatwesayTab"
          className={`nav-tab ${activeTab === "whatwesaySection" ? "active" : ""}`}
          onClick={() => showTab("whatwesaySection")}
        >
          What We Are Solving
        </button>

        <button
          id="recruitmentTab"
          className="download-brocher-tab"
          onClick={() => handleDownload("recruitmentSection")}
        >
          Download Brochure
        </button>
      </div>

      <div className="container section-padding">
        {activeTab === "digitalSection" && <PayrollKeyFeacher />}
        {activeTab === "businessSection" && <PayrollReport />}
        {activeTab === "procurementSection" && <EasePayrollFAQSection />}
        {activeTab === "whatwesaySection" && <WhatWeSolvePayroll />}
      </div>
    </section>
  );
};

export default PayrollTabs;
