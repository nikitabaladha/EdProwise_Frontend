import React, { useEffect, useRef } from "react";

const EdprowiseTalk = () => {
  const handleVideoClick = (e) => {
    e.preventDefault();
    const videoUrl = e.currentTarget.getAttribute("href");
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };

  const slides = [
    {
      icon: "fi flaticon-training",
      title: "CRM Driven Process",
      // description:
      //   "We have highly expert mentors for our student’s best support.",
    },
    {
      icon: "fi flaticon-support",
      title: "Instant User Support",
      // description:
      //   "We are always here to help our students and solve problems.",
    },
    {
      icon: "fi flaticon-e-learning",
      title: "Guide, Manual & Training",
      // description:
      //   "We have highly expert mentors for our student’s best support.",
    },
    {
      icon: "fi flaticon-medal-1",
      title: "Highly Trained Team",
      // description:
      //   "We are always here to help our students and solve problems.",
    },
  ];

  const carouselRef = useRef(null);

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".grid-web");
    const totalItems = items.length;
    let currentIndex = 0;
    const intervalTime = 4000; // 4 seconds for autoplay
    let autoplayInterval;

    // Determine slide width based on screen size
    const getSlideWidthPercentage = () => {
      if (window.innerWidth <= 575) {
        return 100; // Full width for small screens
      } else if (window.innerWidth <= 991) {
        return 50; // Half width for medium screens
      }
      return 100; // Default for larger screens (no sliding)
    };

    // Update carousel position
    const updateCarousel = () => {
      const slideWidthPercentage = getSlideWidthPercentage();
      carouselContainer.style.transition = "transform 0.5s ease-in-out";
      carouselContainer.style.transform = `translateX(-${
        currentIndex * slideWidthPercentage
      }%)`;
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
    };

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth > 991) {
        stopAutoplay();
        carouselContainer.style.transition = "none";
        carouselContainer.style.transform = "translateX(0)"; // Reset to the first item
        currentIndex = 0; // Reset index
      } else {
        startAutoplay();
        updateCarousel();
      }
    };

    // Initialize autoplay for smaller screens
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

  return (
    <>
      <section className="wpo-choose-section-s2 section-padding pt-0 pb-1">
        <div className="container edprowise-choose-container">
          <div className="wpo-choose-wrap">
            <div className="row ">
              <div className="col-12">
                <div className="wpo-section-title-s2">
                  <h2 className="font-family-web">
                    Support – We Listen..We Resolve..We Deliver
                  </h2>
                </div>
              </div>
            </div>
            <div className="wpo-choose-grids clearfix" ref={carouselRef}>
              {slides.map((slide, index) => (
                <div
                  className="grid-web"
                  key={index}
                  style={{ display: "inline-flex !important" }}
                >
                  <div className="icon">
                    <i className={slide.icon}></i>
                  </div>
                  <div className="info">
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        className="wpo-choose-section-s2 section-padding pt-lg-0 pb-lg-3 "
        style={{ background: "white" }}
      >
        <div className="container edprowise-choose-container">
          <div className="row mb-2">
            <div className="col-12">
              <div className="wpo-section-title-s2 mb-2">
                <h2 className="font-family-web">Edprowise Talk</h2>
              </div>
            </div>
          </div>
          <div className="right-img mb-2">
            <img src="assets/website-images/choose2.webp" alt="Choose Us" />
            <a
              href="https://www.youtube.com/embed/r5sw-6lJmTA?autoplay=1"
              className="video-btn"
              onClick={handleVideoClick}
            >
              <i className="fi flaticon-play-1"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default EdprowiseTalk;
