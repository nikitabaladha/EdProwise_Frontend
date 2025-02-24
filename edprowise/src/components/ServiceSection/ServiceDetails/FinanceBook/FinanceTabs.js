import React,{useState} from "react";
import FinanceKeyFeacher from "./FinanceKeyFeacher";
import FinanceReport from "./FinanceReport";
import BookSyncFAQSection from "../../../FAQSection/BookSyncFAQSection";
import WhatWeSolvePayroll from "../PayrollService/WhatWeSolvePayroll";
import WhatWeSolveFinance from "./WhatWeSolveFinance";

const FinanceTabs=()=>{
    
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
        id="whatwesayTab"
          className={`nav-tab ${
            activeTab === "whatwesaySection" ? "active" : ""
          }`}
          onClick={() => showTab("whatwesaySection")}
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
          <FinanceKeyFeacher/>
        </div>
        <div
          className={`show-tab ${
            activeTab === "businessSection" ? "active" : ""
          }`}
          id="businessSection"
        >
        <FinanceReport/>
        </div>
        <div
          className={`show-tab ${
            activeTab === "procurementSection" ? "active" : ""
          }`}
          id="procurementSection"
        >
         <BookSyncFAQSection/>
        </div>
        <div
          className={`show-tab ${
            activeTab === "whatwesaySection" ? "active" : ""
          }`}
          id="whatwesaySection"
        >
          <WhatWeSolveFinance/>
        </div>
      </div>
    </section>
           
        </>
    )
}

export default FinanceTabs;