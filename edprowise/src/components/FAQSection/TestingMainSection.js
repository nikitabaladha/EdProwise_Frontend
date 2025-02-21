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

  return (
    <section className="wpo-blog-section section-padding p-0" id="blog">
      <div className="">  
    <section className="wpo-courses-section-s2 section-padding pt-0 pb-1">
      <div className="container-fluidd bg-body-tertiary pyy-3">
        <div id="testimonialCarousel" className="carousel" data-bs-ride="carousel">
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
