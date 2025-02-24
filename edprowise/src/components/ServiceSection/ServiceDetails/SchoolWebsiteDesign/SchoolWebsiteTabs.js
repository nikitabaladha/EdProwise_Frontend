import React,{useState} from 'react'
import SchoolWebsiteKeyFeatures from './SchoolWebsiteKeyFeatures';

const SchoolWebsiteTabs = () => {
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
         <SchoolWebsiteKeyFeatures/>
        </div>
      </div>
    </section>
    </>
  )
}
export default SchoolWebsiteTabs;