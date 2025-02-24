import React,{useState} from "react";
import SchoolFessKey from "./SchoolFeesKey";
import ServiceFeesReport from "./ServiceFeesReport";
import PixelFeesFAQSection from "../../../FAQSection/PixelFeesFAQSection";
import WhatWeSolveFeepage from "./WhatWeSolveFeepage";

const ServiceTabs=()=>{
    
  const [activeTab, setActiveTab] = useState("digitalSection");

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleDownload=(tabName)=>{
    if (tabName === "brochureSection") {
      const link = document.createElement("a");
      link.href = "/assets/website-images/EdProwise Brochure.pdf"; 
      link.download = "EdProwise-Brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
    return(
        <>

        <section className="wpo-courses-section-s2 section-padding p-0">
      <div className="nav-tabs-container">
        
        <button
          id="digitalTab"
          className={`nav-tab ${
            activeTab === "digitalSection" ? "active" : ""
          }`}
          onClick={() => showTab("digitalSection")}
        >
          Key Features
        </button>
        <button
          id="businessTab"
          className={`nav-tab ${
            activeTab === "businessSection" ? "active" : ""
          }`}
          onClick={() => showTab("businessSection")}
        >
         Report
        </button>
        <button
          id="procurementTab"
          className={`nav-tab ${
            activeTab === "procurementSection" ? "active" : ""
          }`}
          onClick={() => showTab("procurementSection")}
        >
          FAQ
        </button>
        <button
        id="recruitmentTab"
          className={`nav-tab ${
            activeTab === "recruitmentSection" ? "active" : ""
          }`}
          onClick={() => showTab("recruitmentSection")}
        >
         What We Are Solving
        </button>
        <button
        id="brochureTab"
        className="download-brocher-tab"
        onClick={() => handleDownload("brochureSection")}
        >
         Download Brochure
        </button>
      </div>
      <div className="container section-padding">
        <div
          className={`show-tab ${
            activeTab === "digitalSection" ? "active" : ""
          }`}
          id="digitalSection"
        >
          <SchoolFessKey/>
        </div>
        <div
          className={`show-tab ${
            activeTab === "businessSection" ? "active" : ""
          }`}
          id="businessSection"
        >
        
            <ServiceFeesReport/>
          {/* <SchoolFessReport/> */}
        </div>
        <div
          className={`show-tab ${
            activeTab === "procurementSection" ? "active" : ""
          }`}
          id="procurementSection"
        >
         <PixelFeesFAQSection/>
        </div>
        <div
          className={`show-tab ${
            activeTab === "recruitmentSection" ? "active" : ""
          }`}
          id="recruitmentSection"
        >
         <WhatWeSolveFeepage/>
        </div>   
      </div>
    </section>
           
        </>
    )
}

export default ServiceTabs;