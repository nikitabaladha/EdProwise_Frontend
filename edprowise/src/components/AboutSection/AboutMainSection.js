import React, { useState } from "react";
import AboutusSection from "./SubSections/AboutusSection"
import TeamSection from "./SubSections/TeamSection";
import PressMediaSection from "./SubSections/Press&MediaSection";
import CompanyJourney from "./CompanyJourney";
import AwardAchievement from "./AwardAchievement";
const BlogSection = () => {
  const [activeTab, setActiveTab] = useState("gallerySection");

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section className="wpo-blog-section section-padding p-0" id="blog">
      <div className="nav-tabs-container">
        <button
          id="galleryTab"
          className={`nav-tab ${activeTab === "gallerySection" ? "active" : ""}`}
          onClick={() => showTab("gallerySection")}
        >
          About Us
        </button>
        <button
          id="edprowiseTab"
          className={`nav-tab ${activeTab === "edprowiseSection" ? "active" : ""}`}
          onClick={() => showTab("edprowiseSection")}
        >
          Team
        </button>
        <button
          id="studentTab"
          className={`nav-tab ${activeTab === "studentSection" ? "active" : ""}`}
          onClick={() => showTab("studentSection")}
        >
          Press&Media
        </button>
        {/* <button id="educatorTab" className="nav-tab" onClick={() => showTab("educatorSection")}>
          Vision & Mission
        </button> */}
      </div>
      <div className="wpo-blog-items">
        <div className={`show-tab ${activeTab === "gallerySection" ? "active" : ""}`} id="gallerySection">
          <AboutusSection/>
        </div>
        <div className={`show-tab ${activeTab === "edprowiseSection" ? "active" : ""}`} id="edprowiseTab">
          <TeamSection/>
        </div>
        <div className={`show-tab ${activeTab === "studentSection" ? "active" : ""}`} id="studentTab">
        <PressMediaSection/>
        </div>
        <CompanyJourney/>
        <AwardAchievement/>
      </div>
    </section>
  );
};

export default BlogSection;
