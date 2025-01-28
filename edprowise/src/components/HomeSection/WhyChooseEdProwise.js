import React, { useEffect, useRef, useState } from "react";

const WhyChooseEdProwise = () => {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  const chooseData = [
    {
      id: 1,
      className: "s1",
      iconClass: "fi flaticon-user-experience",
      title: "UI/UX Design",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: 2,
      className: "s2",
      iconClass: "fi flaticon-megaphone",
      title: "Digital Marketing",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: 3,
      className: "s3",
      iconClass: "fi flaticon-code",
      title: "Development",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: 4,
      className: "s4",
      iconClass: "fi flaticon-knowledge",
      title: "Self Improvement",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: 5,
      className: "s1",
      iconClass: "fi flaticon-user-experience",
      title: "UI/UX Design",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: 6,
      className: "s1",
      iconClass: "fi flaticon-user-experience",
      title: "UI/UX Design",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
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
    <section className="wpo-courses-section-s2 section-padding">
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
                    <i className={item.iconClass}></i>
                  </div>
                  <h2 className="font-weight-web-h2">
                    <a href="#">{item.title}</a>
                  </h2>
                  <p className="font-family-web">{item.description}</p>
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
