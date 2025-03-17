import React, { useEffect, useRef } from "react";

const VisionMissionSection = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".cart-vm");
    const totalItems = items.length;
    let currentIndex = 0;
    const intervalTime = 4000; 
    let autoplayInterval;

    
    const updateCarousel = () => {
      carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Move to the next slide
    const moveToNextSlide = () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    };

    // Start autoplay
    const startAutoplay = () => {
      autoplayInterval = setInterval(moveToNextSlide, intervalTime);
    };

    // Stop autoplay
    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    };

    // Handle screen resizing
    const handleResize = () => {
      if (window.innerWidth > 991) {
        stopAutoplay();
        currentIndex = 0; // Reset index on desktop
        carouselContainer.style.transform = "translateX(0)"; // Reset position
      } else {
        if (!autoplayInterval) {
          startAutoplay();
        }
      }
    };

    // Initialize autoplay below 991px
    if (window.innerWidth <= 991) {
      startAutoplay();
      updateCarousel();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoplay();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const data = [
    {
      id: 1,
      className: "missionn",
      icon: (
        <img
          className="cart-vm-iconn"
          src="assets/website-images/mission-icon.webp"
          alt="Mission Icon"
        />
      ),
      title: "Mission",
      description:
       "To empower educational institutions with innovative solutions that enhance learning environments, streamline operations, and foster continuous growth and development."
    },
    {
      id: 2,
      className: "visionn",
      icon: <div className="cart-vm-icon">👁️</div>,
      title: "Vision",
      description:
      "Transforming education to drive societal progress & economic growth in India by delivering innovative, impactful solutions that empower institutions & inspire future leaders.",
    },
    {
      id: 3,
      className: "valuee",
      icon: <div className="cart-vm-icon">💎</div>,
      title: "Value",
      description:
        "At Edprowise, our values center around innovation, integrity, customer-centricity, collaboration, and continuous learning, empowering growth and success",
    },
  ];

  return (
    <section
      className="wpo-courses-section-s2 section-padding pt-0 pb-3"
      style={{ background: "white" }}
    >
      <div className="container">
        <div className="row-web">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              <h2 className="font-family-web">Vision & Mission</h2>
            </div>
          </div>
        </div>
        <div className="mission-vision-section-wrapper">
          <div className="mission-vision-section" ref={carouselRef}>
            {data.map((item) => (
              <div key={item.id} className="cart-vm">
                <div className={`cart-vm-circle ${item.className}`}>
                  {item.icon}
                </div>
                <div className="cart-vm-text">
                  <h2 className="font-family-web">{item.title}</h2>
                  <p className="font-family-web text-black">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
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

export default VisionMissionSection;
