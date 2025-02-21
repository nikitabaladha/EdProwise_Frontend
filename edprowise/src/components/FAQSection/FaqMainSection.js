import React, { useState, useRef } from "react";
import EdProwiseFAQSection from "./GeneralFaqSection";
import PixelFeesFAQSection from "./PixelFeesFAQSection";
import EasePayrollFAQSection from "./EasePayrollFAQSection";
import BookSyncFAQSection from "./BookSyncFAQSection";
import SchoolOpsFAQSection from "./SchoolOpsFAQSection";
import SchoolAppFAQSection from "./SchoolAppFAQSection";
import EdProwiseServicesFAQSection from "./EdProwiseServicesFAQSection";
import GoodsFAQSection from "./GoodsFAQSection";
import RecruitmentFAQSection from "./RecruitmentFAQSection";
import ContactFAQSection from "./ContactFAQSection";

const FaqMainSection = () => {
 const innerRef = useRef(null);
   const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState("GeneralFaqSection");
 
   const showTab = (tabName) => {
     setActiveTab(tabName);
   };
 
   const handleNext = () => {
     const innerCarousel = innerRef.current;
     const items = innerCarousel.querySelectorAll(".carousel-itemm");
     if (items.length === 0) return;
 
     const cardWidth = items[0].offsetWidth;
     const carouselWidth = innerCarousel.scrollWidth;
 
     if (scrollPosition < carouselWidth - cardWidth) {
       setScrollPosition((prev) => {
         const newScroll = prev + cardWidth;
         innerCarousel.scrollTo({ left: newScroll, behavior: "smooth" });
         return newScroll;
       });
     } else {
       setScrollPosition(0); // Reset to the beginning for infinite loop
       innerCarousel.scrollTo({ left: 0, behavior: "smooth" });
     }
   };
 
   const handlePrev = () => {
     const innerCarousel = innerRef.current;
     const items = innerCarousel.querySelectorAll(".carousel-itemm");
     const cardWidth = items[0].offsetWidth;
 
     if (scrollPosition > 0) {
       setScrollPosition((prev) => {
         const newScroll = prev - cardWidth;
         innerCarousel.scrollTo({ left: newScroll, behavior: "smooth" });
         return newScroll;
       });
     }
   };

   const [isActive, setIsActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Photography"); // Default active category
  const [clickedBtn, setClickedBtn] = useState(""); // State for clicked button
  const [selectedAdditionalButton, setSelectedAdditionalButton] = useState(""); // State for selected additional button
  const [isDragging, setIsDragging] = useState(false); // State to track dragging
  const [startX, setStartX] = useState(0); // Initial position of the drag
  const [scrollLeft, setScrollLeft] = useState(0); // Initial scroll position
  const containerRef = useRef(null); // Ref to access category container
 
  // Main categories
  const mainCategories = [
    "Photoshop",
    "Best of Behance",
    "Graphic Design",
    "Photography",
    "Illustration",
    "Best",
    "Photo",
    "3D Art",
    "Graphic-Design",
    "graphy",
    "Illstration",
    "3D-Art",
  ];
 
  // Additional buttons for the More section
  const additionalButtons = Array.from({ length: 24 }, (_, i) => `Button ${i + 1}`);
 
  // Scroll the container left or right
  const scroll = (direction) => {
    const container = document.getElementById("category-container");
    const scrollAmount = direction === "left" ? -200 : 200;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setClickedBtn(direction); // Set the clicked button direction
  };
 
  // Toggle button functionality
  const toggleActive = () => {
    setIsActive(!isActive);
  };
 
  // Handle click on additional button
  const handleAdditionalButtonClick = (button) => {
    setSelectedAdditionalButton(button); // Set the selected additional button
    setIsActive(false); // Hide the more-buttons-container
    setActiveCategory(button); // Set the active category based on selected button
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
      <div className="">  
    <section className="wpo-courses-section-s2 section-padding pt-0 pb-0">
      <div className="container-fluidd bg-bedcrum pyy-3">
        {/* <div id="testimonialCarousel" className="carousel" data-bs-ride="carousel">
          <div className="carousel-innerr" ref={innerRef}>

            <button  id="GeneralTab" className={`carousel-itemm p-lg-2 faq-btnn nav-tab ${activeTab === "GeneralFaqSection" ? "active" : ""}`}
               onClick={() => showTab("GeneralFaqSection")}>General Questions</button>

            <button  id="FeesManagementTab" className={`carousel-itemm p-lg-2 faq-btnn nav-tab  ${activeTab === "FeesManagementSection" ? "active" : ""}`}
               onClick={() => showTab("FeesManagementSection")}>School Fees Management Software - Pixel Fees</button>

<button  id="PayrollManagementTab" className={`carousel-itemm p-lg-2 faq-btnn nav-tab  ${activeTab === "PayrollManagementSection" ? "active" : ""}`}
               onClick={() => showTab("PayrollManagementSection")}>Payroll Management Software – Ease Payroll</button>
   

            <button  id="FinancialTab" className={`carousel-itemm p-lg-2 faq-btnn nav-tab  ${activeTab === "FinancialSection" ? "active" : ""}`}
                 onClick={() => showTab("FinancialSection")} >Financial Management Software – Book Sync</button>

            <button id="OperationalTab" className={`carousel-itemm p-lg-2 faq-btnn nav-tab  ${activeTab === "OperationalSection" ? "active" : ""}`}
                  onClick={() => showTab("OperationalSection")} >Operational Management Software – SchoolOps</button>

            <button id="ElevateTab" className={`carousel-itemm p-lg-2 faq-btnn nav-tab  ${activeTab === "ElevateSection" ? "active" : ""}`}
          onClick={() => showTab("ElevateSection")} >Elevate Your Online Presence through School App</button>

            <button  id="AcademicTab" className={`carousel-itemm p-lg-2 faq-btnn nav-tab  ${activeTab === "AcademicSection" ? "active" : ""}`}
          onClick={() => showTab("AcademicSection")} >Academic & Admin Services</button>

            <button id="GoodsTab" className={`carousel-itemm p-lg-2 faq-btnn nav-tab  ${activeTab === "GoodsSection" ? "active" : ""}`}
          onClick={() => showTab("GoodsSection")} >Get Goods for Your School</button>

            <button  id="RecruitmentTab" className={`carousel-itemm p-lg-2 faq-btnn nav-tab ${activeTab === "RecruitmentSection" ? "active" : ""}`}
          onClick={() => showTab("RecruitmentSection")} >Recruitment Services</button>

            <button  id="ContactTab" className={`carousel-itemm p-lg-2 faq-btnn nav-tab  ${activeTab === "ContactSection" ? "active" : ""}`}
              onClick={() => showTab("ContactSection")}>Contact & Support</button>

          </div>
          <button
            className="carousel-control-prevvv"
            type="button"
            onClick={handlePrev}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-nexttt"
            type="button"
            onClick={handleNext}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}
         <div className="category-wrapper">
      <div className="category-nav">
        <button
          className={`scroll-btn left ${clickedBtn === "left" ? "clicked" : ""}`}
          onClick={() => scroll("left")}
        >
          &#x276E;
        </button>
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
            
             <button  id="GeneralTab" className={`category-item   ${activeTab === "GeneralFaqSection" ? "active" : ""}`}
               onClick={() => showTab("GeneralFaqSection")}>General Questions</button>

            <button  id="FeesManagementTab" className={`category-item   ${activeTab === "FeesManagementSection" ? "active" : ""}`}
               onClick={() => showTab("FeesManagementSection")}>School Fees Management Software - Pixel Fees</button>

<button  id="PayrollManagementTab" className={`category-item   ${activeTab === "PayrollManagementSection" ? "active" : ""}`}
               onClick={() => showTab("PayrollManagementSection")}>Payroll Management Software – Ease Payroll</button>
   

            <button  id="FinancialTab" className={`category-item  ${activeTab === "FinancialSection" ? "active" : ""}`}
                 onClick={() => showTab("FinancialSection")} >Financial Management Software – Book Sync</button>

            <button id="OperationalTab" className={`category-item  ${activeTab === "OperationalSection" ? "active" : ""}`}
                  onClick={() => showTab("OperationalSection")} >Operational Management Software – SchoolOps</button>

            <button id="ElevateTab" className={`category-item    ${activeTab === "ElevateSection" ? "active" : ""}`}
          onClick={() => showTab("ElevateSection")} >Elevate Your Online Presence through School App</button>

            <button  id="AcademicTab" className={`category-item   ${activeTab === "AcademicSection" ? "active" : ""}`}
          onClick={() => showTab("AcademicSection")} >Academic & Admin Services</button>

            <button id="GoodsTab" className={`category-item    ${activeTab === "GoodsSection" ? "active" : ""}`}
          onClick={() => showTab("GoodsSection")} >Get Goods for Your School</button>

            <button  id="RecruitmentTab" className={`category-item    ${activeTab === "RecruitmentSection" ? "active" : ""}`}
          onClick={() => showTab("RecruitmentSection")} >Recruitment Services</button>

            <button  id="ContactTab" className={`category-item    ${activeTab === "ContactSection" ? "active" : ""}`}
              onClick={() => showTab("ContactSection")}>Contact & Support</button>

        
        </div>
        <button
          className={`scroll-btn right ${clickedBtn === "right" ? "clicked" : ""}`}
          onClick={() => scroll("right")}
        >
          &#x276F;
        </button>
        
      </div>
    </div>
      </div>
    </section>
</div>
      <div className="wpo-blog-items">
        <div className={`show-tab ${activeTab === "GeneralFaqSection" ? "active" : ""}`} id="GeneralFaqSection">
          <EdProwiseFAQSection/>
        </div>

        <div className={`show-tab ${activeTab === "FeesManagementSection" ? "active" : ""}`} id="FeesManagementSection">
           <PixelFeesFAQSection/>
        </div>

        <div className={`show-tab ${activeTab === "PayrollManagementSection" ? "active" : ""}`} id="PayrollManagementSection">
           <EasePayrollFAQSection/>
        </div>

        <div className={`show-tab ${activeTab === "FinancialSection" ? "active" : ""}`} id="FinancialSection">
        <BookSyncFAQSection/>
        </div>
        <div className={`show-tab ${activeTab === "OperationalSection" ? "active" : ""}`} id="OperationalSection">
        <SchoolOpsFAQSection/>
        </div>
        <div className={`show-tab ${activeTab === "ElevateSection" ? "active" : ""}`} id="ElevateSection">
        <SchoolAppFAQSection/>
        </div>
        <div className={`show-tab ${activeTab === "AcademicSection" ? "active" : ""}`} id="AcademicSection">
        <EdProwiseServicesFAQSection/>
        </div>
        <div className={`show-tab ${activeTab === "GoodsSection" ? "active" : ""}`} id="GoodsSection">
        <GoodsFAQSection/>
        </div>
        <div className={`show-tab ${activeTab === "RecruitmentSection" ? "active" : ""}`} id="RecruitmentSection">
        <RecruitmentFAQSection/>
        </div>
        <div className={`show-tab ${activeTab === "ContactSection" ? "active" : ""}`} id="ContactSection">
        <ContactFAQSection/>
        </div>
        
      </div>
    </section>
  );
};

export default FaqMainSection;
