import React,{useState} from "react";
import SchoolOperationKeyFeature from "./SchoolOperationKeyFeature";
import SchoolOpsFAQSection from "../../../FAQSection/SchoolOpsFAQSection";
import WhatWeSolveSchoolOps from "./WhatWeSolveSchoolOps";

const SchoolOperationTabs=()=>{
    
  const [activeTab, setActiveTab] = useState("digitalSection");
  
  const showTab = (tabName) => {
    setActiveTab(tabName);
  };
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
          id="procurementTab"
          className={`nav-tab ${
            activeTab === "procurementSection" ? "active" : ""
          }`}
          onClick={() => showTab("procurementSection")}
        >
          FAQ
        </button>
        <button
        id="whatwesayTab"
          className={`nav-tab ${
            activeTab === "whatwesaySection" ? "active" : ""
          }`}
          onClick={() => showTab("whatwesaySection")}
        >
         What We Are Solving
        </button>
        <button
        id="recruitmentTab"
          className={`nav-tab ${
            activeTab === "recruitmentSection" ? "active" : ""
          }`}
          onClick={() => showTab("recruitmentSection")}
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
          <SchoolOperationKeyFeature/>
        </div>
        <div
          className={`show-tab ${
            activeTab === "procurementSection" ? "active" : ""
          }`}
          id="procurementSection"
        >
         <SchoolOpsFAQSection/>
        </div>
        <div
          className={`show-tab ${
            activeTab === "whatwesaySection" ? "active" : ""
          }`}
          id="whatwesaySection"
        >
          <WhatWeSolveSchoolOps/>
          
        </div> 
        <div
          className={`show-tab ${
            activeTab === "recruitmentSection" ? "active" : ""
          }`}
          id="recruitmentSection"
        >
          
          
        </div>  
          
      </div>
    </section>
           
        </>
    )
}

export default SchoolOperationTabs;