import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    text: "EdProWise has completely transformed the way we manage our curriculum and student engagement. The intuitive platform and expert guidance have made a significant impact on our school's success.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6NOoyAVaX8I76Q4Lre8gmxK5YbJIo_c_kcQ&s",
    name: "Principal",
    position: "Carmel convent school, Chandigarh",
  },
  {
    text: "EdProWise has revolutionized our administrative processes. From managing student data to optimizing lesson plans, everything is now efficient. It has truly been a game-changer for our school.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREUWe7HmcsRfT2iV5uq4L0lzrsteFWTdQbdw&s",
    name: "Principal",
    position: "St francis de sales school, Janakpuri",
  },
  {
    text: "EdProWise has elevated education quality at our institution, empowering teachers and students with the tools to succeed and fostering continuous improvement.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Y3xfkKX6PUMgfToucwy_YRgln8AKEWzctQ&s",
    name: "Principal",
    position: "Christ Raja Convent School, Jind",
  },
  {
    text: "EdProWise has helped us transition smoothly into a more digital and data-driven education system. It has provided us with the structure and support needed to modernize our school operations.",
    image: "",
    name: "Principal",
    position: "Mount Carmel School, Hoshiarpur",
  },
  {
    text: "Managing a school comes with countless challenges, but EdProWise has simplified everything. From scheduling to resource allocation, our administrative workload has been significantly reduced.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmPtbFn_Ai1BkZRCDHtfH_hNIY9wLL9qKCdg&s",
    name: "Principal",
    position: "St. Thomas Convent School, Bhopal",
  },
  {
    text: "With EdProWise, we now have access to real-time analytics and insights that help us make informed decisions. It has significantly improved our ability to track student progress and teacher performance.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeKq8qxdnDCddHIxt3FP4OvvfL8HCAifnRGbP4_jEF_fKz2kUn1EgU1P8cZuRFE1_l&usqp=CAU",
    name: "Principal",
    position: "Trinity Convent School, Vidisha",
  },
];


const TestimonialSection = () => {
  const carouselRef = useRef(null);
  const innerRef = useRef(null);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateItemsToShow = () => {
    const width = window.innerWidth;
    if (width < 576) setItemsToShow(1); // Single item for small screens
    else if (width < 768) setItemsToShow(2); // Two items for medium screens
    else if (width < 1200) setItemsToShow(2);
    else setItemsToShow(3); // Default to three items for large screens
  };

  const handleNext = () => {
    const innerCarousel = innerRef.current;
    const items = innerCarousel.querySelectorAll(".carousel-itemm");
    if (items.length === 0) return;

    const cardWidth = items[0].offsetWidth;
    const carouselWidth = innerCarousel.scrollWidth;

    if (scrollPosition < carouselWidth - cardWidth * itemsToShow) {
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

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const items = innerRef.current?.querySelectorAll(".carousel-itemm");
      if (items?.length > 0) {
        handleNext();
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [scrollPosition, itemsToShow]);
  return (
    <section className="wpo-courses-section-s2 section-padding pt-0 pb-1">
      <div className="container-fluidd bg-body-tertiary pyy-3">
        <div className="row">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              {/* <h3>Testimonials</h3> */}
              <h2>What Our Client Says About Us</h2>
            </div>
          </div>
        </div>

        <div
          id="testimonialCarousel"
          className="carousel"
          data-bs-ride="carousel"
          ref={carouselRef}
        >
          <div className="carousel-innerr d-flex" ref={innerRef}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`carousel-itemm ${index === 0 ? "active" : ""}`}
                style={{ flex: `0 0 ${100 / itemsToShow}%` }}
              >
                <div className="card shadow-sm rounded-3">
                  <div className="quotes text-body-tertiary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="47"
                      height="47"
                      fill="currentColor"
                      className="bi bi-quote"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z" />
                    </svg>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-black">{testimonial.text}</p>
                    <div className="d-flex align-items-center pt-2">
                      <img
                        src={testimonial.image}
                        alt={`Testimonial by ${testimonial.name}`}
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px" }}
                      />
                      <div>
                        <h5 className="card-title fw-bold">
                          {testimonial.name}
                        </h5>
                        <span className="text-secondary">
                          {testimonial.position}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
  );
};

export default TestimonialSection;
