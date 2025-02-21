import React,{useState} from 'react'
import SchoolWebsiteKeyFeatures from './SchoolWebsiteKeyFeatures';
import { Link, useNavigate } from "react-router-dom";

const SchoolWebsiteTabs = () => {
    const [activeTab, setActiveTab] = useState("digitalSection");
    const navigate = useNavigate();
    
    const handleItemClick = (send) => {
      if (send) {
        // console.log(send);
        navigate(send);
      } else {
        navigate()
      }
    };
      const showTab = (tabName) => {
        setActiveTab(tabName);
      };
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
        
        {/* <button
          id="procurementTab"
          className={`nav-tab ${
            activeTab === "procurementSection" ? "active" : ""
          }`}
          onClick={() => showTab("procurementSection")}
        >
          FAQ
        </button> */}
        <button
        id="recruitmentTab"
          className={`nav-tab ${
            activeTab === "recruitmentSection" ? "active" : ""
          }`}
          onClick={() => showTab("recruitmentSection")}
        >
         Download Brochure
        </button>
        <button
         id="whatwesayTab"
         className="nav-tab"
         onClick={() => handleItemClick("/request-demo")}
          >
         Request For Demo
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
       
        {/* <div
          className={`show-tab ${
            activeTab === "procurementSection" ? "active" : ""
          }`}
          id="procurementSection"
        >
         
        </div> */}
        <div
          className={`show-tab ${
            activeTab === "recruitmentSection" ? "active" : ""
          }`}
          id="recruitmentSection"
        >
          {/* <SchoolFessFaq/> */}
          
        </div>  
        <div
          className={`show-tab ${
            activeTab === "whatwesaySection" ? "active" : ""
          }`}
          id="whatwesaySection"
        >
          {/* <SchoolFessFaq/> */}
          
        </div>   
      </div>
    </section>
    </>
  )
}
export default SchoolWebsiteTabs;