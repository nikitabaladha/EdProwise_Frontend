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
      title: "Experienced Mentor",
      description:
        "We have highly expert mentors for our student’s best support.",
    },

    {
      icon: "fi flaticon-support",
      title: "Dedicated Support",
      description:
        "We are always here to help our students and solve problems.",
    },
    {
      icon: "fi flaticon-e-learning",
      title: "Digital Learning",
      description:
        "We have highly expert mentors for our student’s best support.",
    },
    {
      icon: "fi flaticon-medal-1",
      title: "Global Certificate",
      description:
        "We are always here to help our students and solve problems.",
    },
  ];

  const carouselRef = useRef(null);
  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".grid-web");
    const totalItems = items.length;
    let currentIndex = 0;
    const intervalTime = 4000;
    let autoplayInterval;

    // Update carousel position
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
    };

    // Handle window resize
    const handleResize = () => {
      console.log("Handling resize");
      if (window.innerWidth > 570) {
        stopAutoplay();
        carouselContainer.style.transform = "translateX(0)"; // Reset to the first item
        currentIndex = 0; // Reset index
      } else {
        startAutoplay();
      }
    };

    // Initialize autoplay based on screen width
    if (window.innerWidth <= 570) {
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
    <section className="wpo-choose-section-s2 section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              {/* <small>Our Courses</small> */}
              <h2 className="font-family-web">Edprowise Talk</h2>
            </div>
          </div>
        </div>
        <div className="right-img">
          <img src="assets/website-images/choose2.jpg" alt="Choose Us" />
          <a
            href="https://www.youtube.com/embed/r5sw-6lJmTA?autoplay=1"
            className="video-btn"
            data-type="iframe"
            onClick={handleVideoClick}
          >
            <i className="fi flaticon-play-1"></i>
          </a>
        </div>
        <div className="wpo-choose-wrap ">
          <div className="wpo-choose-grids clearfix" ref={carouselRef}>
            {slides.map((slide, index) => (
              <div className="grid-web" key={index}>
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
  );
};

export default EdprowiseTalk;
