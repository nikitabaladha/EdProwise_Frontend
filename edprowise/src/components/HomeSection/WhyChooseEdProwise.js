import React, { useEffect, useRef } from "react";

const WhyChooseEdProwise = () => {
  const carouselRef = useRef(null);

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
    let currentIndex = 0;
    const intervalTime = 4000; // Time between slides in milliseconds
    let autoplayInterval;

    // Update carousel position
    function updateCarousel() {
      carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Move to the next slide
    function moveToNextSlide() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }

    // Start autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(moveToNextSlide, intervalTime);
    }

    // Stop autoplay
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth > 570) {
        stopAutoplay();
        carouselContainer.style.transform = "translateX(0)"; // Reset the carousel to the first item on larger screens
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
    <section className="wpo-courses-section-s2 section-padding">
      <div className="container">
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
