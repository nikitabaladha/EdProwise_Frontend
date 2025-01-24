import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GallerySection from "./SubSection/GallerySection";
import EdprowiseTalkSection from "./SubSection/EdprowiseTalkSection";
import StudentZoneSection from "./SubSection/StudentZoneSection";
import EducatorZoneSection from "./SubSection/EducatorZoneSection";

const CommunityMainSection = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/community-connect/gallery":
        setActiveTab("gallerySection");
        break;
      case "/community-connect/edprowise-talks":
        setActiveTab("edprowiseSection");
        break;
      case "/community-connect/student-zone":
        setActiveTab("studentSection");
        break;
      case "/community-connect/educator-zone":
        setActiveTab("educatorSection");
        break;
      default:
        setActiveTab(""); // Default tab
    }
  }, [location.pathname]);

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section className="wpo-blog-section section-padding p-0" id="blog">
      <div className="nav-tabs-container">
        <button
          id="galleryTab"
          className={`nav-tab ${
            activeTab === "gallerySection" ? "active" : ""
          }`}
          onClick={() => showTab("gallerySection")}
        >
          Gallery
        </button>
        <button
          id="edprowiseTab"
          className={`nav-tab ${
            activeTab === "edprowiseSection" ? "active" : ""
          }`}
          onClick={() => showTab("edprowiseSection")}
        >
          EdProwise Talks
        </button>
        <button
          id="studentTab"
          className={`nav-tab ${
            activeTab === "studentSection" ? "active" : ""
          }`}
          onClick={() => showTab("studentSection")}
        >
          Student Zone
        </button>
        <button
          id="educatorTab"
          className={`nav-tab ${
            activeTab === "educatorSection" ? "active" : ""
          }`}
          onClick={() => showTab("educatorSection")}
        >
          Educator Zone
        </button>
      </div>

      <div className="wpo-blog-items">
        <div className="container">
          <div
            className={`show-tab ${
              activeTab === "gallerySection" ? "active" : ""
            }`}
            id="gallerySection"
          >
            <GallerySection />
          </div>
          <div
            className={`show-tab ${
              activeTab === "edprowiseSection" ? "active" : ""
            }`}
            id="edprowiseSection"
          >
            <EdprowiseTalkSection />
          </div>
          <div
            className={`show-tab ${
              activeTab === "studentSection" ? "active" : ""
            }`}
            id="studentSection"
          >
            <StudentZoneSection />
          </div>
          <div
            className={`show-tab ${
              activeTab === "educatorSection" ? "active" : ""
            }`}
            id="educatorSection"
          >
            <EducatorZoneSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityMainSection;
