import React, {useState} from 'react'
import SchoolApplicationKeyFeature from './SchoolApplicationKeyFeature';
import SchoolAppFAQSection from '../../../FAQSection/SchoolAppFAQSection';

const SchoolApplicationTabs = () => {
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
      id="recruitmentTab"
      className="download-brocher-tab"
      onClick={() => handleDownload("recruitmentSection")}
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
        <SchoolApplicationKeyFeature/>
      </div>
      
      <div
        className={`show-tab ${
          activeTab === "procurementSection" ? "active" : ""
        }`}
        id="procurementSection"
      >
       <SchoolAppFAQSection/>
      </div>
      <div
        className={`show-tab ${
          activeTab === "recruitmentSection" ? "active" : ""
        }`}
        id="recruitmentSection"
      >
        {/* <SchoolFessFaq/> */}
        
      </div>  
       
    </div>
  </section>
  )
}

export default SchoolApplicationTabs;
