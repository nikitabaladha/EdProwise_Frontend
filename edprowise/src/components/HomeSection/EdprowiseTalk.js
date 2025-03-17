import React, { useEffect, useRef, useState } from "react";

const EdprowiseTalk = () => {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  const slides = [
    {
      icon: "fi flaticon-training",
      title: "CRM Driven Process",
      // description: "We have highly expert mentors for our student’s best support.",
    },
    {
      icon: "fi flaticon-support",
      title: "Instant User Support",
      // description: "We are always here to help our students and solve problems.",
    },
    {
      icon: "fi flaticon-e-learning",
      title: "Guide, Manual & Training",
      // description: "We have highly expert mentors for our student’s best support.",
    },
    {
      icon: "fi flaticon-medal-1",
      title: "Highly Trained Team",
      // description: "We are always here to help our students and solve problems.",
    },
  ];

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".grid-web");
    const totalItems = items.length;

    let currentIndex = 1; // Start at the first real item
    const intervalTime = 4000; // Time between slides in milliseconds
    let autoplayInterval;

    // Clone first and last items for infinite loop effect
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 2].cloneNode(true);

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
    <>
      <section className="wpo-choose-section-s2 section-padding pt-0 pb-1">
        <div className="container edprowise-choose-container">
          <div className="wpo-choose-wrap">
            <div className="row">
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
        className="wpo-choose-section-s2 section-padding pt-lg-0 pb-lg-3"
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
            <iframe
              width="100%"
              height="325"
              src="https://www.youtube.com/embed/KzMNx8h7RbY?si=7eEmdFNCVHPkdYBp"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default EdprowiseTalk;