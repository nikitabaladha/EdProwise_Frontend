import React, { useEffect, useRef, useState } from "react";
import { GiThreeFriends } from "react-icons/gi";
import { FaStore } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { PiMedalBold } from "react-icons/pi";
import { GiDiamondTrophy } from "react-icons/gi";
import { GiTeamIdea } from "react-icons/gi";
const WhyChooseEdProwise = () => {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  const chooseData = [
    {
      id: 1,
      className: "s1",
      iconClass: <GiThreeFriends />,
      title: "Connect Ecosystem",
      description:
        "The Central Dashboard offers real-time access to vital information, including student performance, attendance, and fee status. This enhances communication and collaboration among principals, teachers, management, and parents, supporting student success.",
    },
    {
      id: 2,
      className: "s2",
      iconClass: <FaStore />,
      title: "Marketplace For School",
      description:
        "Marketplace for wide range of services including technology integration, administrative solutions, educational consultation, and professional development, providing holistic support tailored to enhanceevery aspect of educational operations",
    },
    {
      id: 3,
      className: "s3",
      iconClass:<FaShieldAlt />,
      title: "Zero Leakage Of Fees",
      description:
        "Through meticulous reconciliation of school fees, we guarantee zero leakage. Our detailed analysis identifies the gap between fees due and fees collected, enabling us to swiftly address any discrepancie",
    },
    {
      id: 4,
      className: "s4",
      iconClass: <GiDiamondTrophy />,
      title: "Expertise In Educational Solutions",
      description:
        "With a dedicated focus on the education sector, we brings deep expertise and understanding of the unique needs and challenges faced by educational institutions.",
    },
    {
      id: 5,
      className: "s5",
      iconClass: <PiMedalBold />,
      title: "Commitment To Excellence",
      description:
        "Our commitment to excellence is reflected in our mission to empower educational institutions with transformative solutions that enable them to achieve their goals effectively and sustainably",
    },
    {
      id: 6,
      className: "s6",
      iconClass: <GiTeamIdea /> ,
      title: "Innovative Approach",
      description:
        "We leverage innovative technologies and strategic insights to deliver solutions that drive efficiency, improve learning outcomes, and foster continuous improvement within educational setting.",
    },
  ];

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".carousel-item-choose");
    const totalItems = items.length;

    let currentIndex = 1; // Start at the first real item
    const intervalTime = 4000; // Time between slides in milliseconds
    let autoplayInterval;

    // Clone first and last items for infinite loop effect
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);

    // Add clones to the DOM for mobile view
    if (isMobile) {
      carouselContainer.appendChild(firstClone);
      carouselContainer.insertBefore(lastClone, items[0]);
    }

    // Update carousel position
    function updateCarousel() {
      const itemWidth = items[0].offsetWidth;
      carouselContainer.style.transition = "transform 0.5s ease-in-out";
      carouselContainer.style.transform = `translateX(-${
        currentIndex * itemWidth
      }px)`;
    }
    
    // Move to the next slide
    function moveToNextSlide() {
      const itemWidth = items[0].offsetWidth;
      currentIndex++;
      updateCarousel();

      if (currentIndex === totalItems + 1) {
        // Reset to the first real item
        setTimeout(() => {
          carouselContainer.style.transition = "none";
          currentIndex = 1;
          carouselContainer.style.transform = `translateX(-${
            currentIndex * itemWidth
          }px)`;
        }, 500); // Match transition duration
      }
    }

    // Move to the previous slide
    function moveToPrevSlide() {
      const itemWidth = items[0].offsetWidth;
      currentIndex--;
      updateCarousel();

      if (currentIndex === 0) {
        // Reset to the last real item
        setTimeout(() => {
          carouselContainer.style.transition = "none";
          currentIndex = totalItems;
          carouselContainer.style.transform = `translateX(-${
            currentIndex * itemWidth
          }px)`;
        }, 500); // Match transition duration
      }
    }

    // Start autoplay only for mobile
    function startAutoplay() {
      if (isMobile) {
        autoplayInterval = setInterval(moveToNextSlide, intervalTime);
      }
    }

    // Stop autoplay
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    // Initialize autoplay if mobile
    if (isMobile) {
      startAutoplay();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoplay();
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <section className="wpo-courses-section-s2 section-padding pt-0 pb-1">
      <div className="container edprowise-choose-container">
        <div className="row-web">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              <h2 className="font-family-web">Why Choose EdProwise?</h2>
            </div>
          </div>
        </div>
        <div
          className="row-web wpo-courses-wrap choose-wrapp"
          ref={carouselRef}
        >
          {chooseData.map((item) => (
            <div
              key={item.id}
              className={`col-lg-4 col-md-6 col-12 grid-web  ${item.className} carousel-item-choose`}
            >
              <div className="wpo-courses-item">
                <div className="wpo-courses-text">
                  <div className="courses-icon">
                  {item.iconClass}
                    {/* <i className={item.iconClass}></i> */}
                  </div>
                  <h2 className="font-weight-web-h2">
                    <a href="#">{item.title}</a>
                  </h2>
                  <p className="font-family-web  ">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="shape-1">
        <img src="assets/website-images/shape/1.svg" alt="Shape 1" />
      </div>
      <div className="shape-2">
        <img src="assets/website-images/shape/2.svg" alt="Shape 2" />
      </div>
      <div className="shape-3">
        <img src="assets/website-images/shape/3.svg" alt="Shape 3" />
      </div>
      <div className="shape-4">
        <img src="assets/website-images/shape/4.svg" alt="Shape 4" />
      </div>
    </section>
  );
};

export default WhyChooseEdProwise;
