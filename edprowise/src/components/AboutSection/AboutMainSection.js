import React, { useState,useRef } from "react";
import AboutusSection from "./SubSections/AboutusSection"
import TeamSection from "./SubSections/TeamSection";
import PressMediaSection from "./SubSections/Press&MediaSection";
import TestimonialSection from "../HomeSection/Testimonial";
import AwardSection from "./SubSections/AwardSection";
import VisionMissionSection from "../HomeSection/MissionVision";
const BlogSection = () => {
  const [activeTab, setActiveTab] = useState("AboutUsSection");

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };
     //Scolling tab
      const [clickedBtn, setClickedBtn] = useState(""); // State for clicked button
      const [isDragging, setIsDragging] = useState(false); // State to track dragging
      const [startX, setStartX] = useState(0); // Initial position of the drag
      const [scrollLeft, setScrollLeft] = useState(0); // Initial scroll position
      const containerRef = useRef(null); // Ref to access category container
    
    
      // Scroll the container left or right
      const scroll = (direction) => {
        const container = document.getElementById("category-container");
        const scrollAmount = direction === "left" ? -200 : 200;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setClickedBtn(direction); // Set the clicked button direction
      };
    
    
      // Mouse event handlers for smoother dragging
      const handleMouseDown = (e) => {
        const container = containerRef.current;
        setIsDragging(true);
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(container.scrollLeft);
      };
    
      const handleMouseMove = (e) => {
        if (!isDragging) return; // Only run if dragging
        e.preventDefault();
        const container = containerRef.current;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust the multiplier for smoother scroll
        container.scrollLeft = scrollLeft - walk;
      };
    
      const handleMouseUpOrLeave = () => {
        setIsDragging(false);
      };
    
  return (
    <section className="wpo-blog-section section-padding p-0" id="blog">
        <div className="nav-tabs-container">
          <section className="wpo-courses-section-s2 section-padding pt-0 pb-0">
            <div className="container-fluidd bg-bedcrum ">
              <div className="category-wrapper">
                <div className="category-nav">
                  <div
                    id="category-container"
                    className="category-container"
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    style={{ cursor: isDragging ? "grabbing" : "grab", transition: "all 0.3s ease" }} // Smooth interaction
                  >

                    <button id="AboutUsSection" className={`category-item-btn   ${activeTab === "AboutUsSection" ? "active" : ""}`}
                      onClick={() => showTab("AboutUsSection")}> About Us</button>

                    <button id="teamSection" className={`category-item-btn   ${activeTab === "teamSection" ? "active" : ""}`}
                      onClick={() => showTab("teamSection")}>Team</button>

                    <button id="pressMediaSection" className={`category-item-btn   ${activeTab === "pressMediaSection" ? "active" : ""}`}
                      onClick={() => showTab("pressMediaSection")}>Press & Media</button>

                    <button id="awardsSection" className={`category-item-btn  ${activeTab === "awardsSection" ? "active" : ""}`}
                      onClick={() => showTab("awardsSection")} > Awards</button>

                  </div>
                  {/* <button
                className={`scroll-btn right ${clickedBtn === "right" ? "clicked" : ""}`}
                onClick={() => scroll("right")}
              >
                &#x276F;
              </button> */}

                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="wpo-blog-items">
          <div className={`show-tab ${activeTab === "AboutUsSection" ? "active" : ""}`} id="AboutUsSection">
          <AboutusSection/>
        <VisionMissionSection />
         <TestimonialSection/>
          </div>

          <div className={`show-tab ${activeTab === "teamSection" ? "active" : ""}`} id="teamSection">
          <TeamSection/>
          </div>

          <div className={`show-tab ${activeTab === "pressMediaSection" ? "active" : ""}`} id="pressMediaSection">
          {/* <PressMediaSection/> */}
          </div>

          <div className={`show-tab ${activeTab === "awardsSection" ? "active" : ""}`} id="awardsSection">
          {/* <AwardSection/> */}
          </div>
        </div>
      </section>
  );
};

export default BlogSection;
