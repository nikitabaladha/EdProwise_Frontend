import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    text: "Some quick example quick example text to build on the card title and make up the bulk of the card's content.",
    image: "https://codingyaar.com/wp-content/uploads/square-headshot-1.png",
    name: "Jane Doe",
    position: "CEO, Example Company",
  },
  {
    text: "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    image: "https://codingyaar.com/wp-content/uploads/square-headshot-2.png",
    name: "June Doe",
    position: "CEO, Example Company",
  },
  {
    text: "Some quick example quick example text to build on the card title and make up the bulk of the card's content.",
    image:
      "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
    name: "John Doe",
    position: "CEO, Example Company",
  },
  {
    text: "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    image: "https://codingyaar.com/wp-content/uploads/square-headshot-2.png",
    name: "June Doe",
    position: "CEO, Example Company",
  },
  {
    text: "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    image: "https://codingyaar.com/wp-content/uploads/square-headshot-2.png",
    name: "June Doe",
    position: "CEO, Example Company",
  },
  {
    text: "Some quick example quick example text to build on the card title and make up the bulk of the card's content.",
    image:
      "https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg",
    name: "John Doe",
    position: "CEO, Example Company",
  },
  {
    text: "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    image: "https://codingyaar.com/wp-content/uploads/square-headshot-2.png",
    name: "June Doe",
    position: "CEO, Example Company",
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
    <section className="wpo-courses-section-s2 section-padding">
      <div className="container-fluidd bg-body-tertiary pyy-3">
        <div className="row">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              <h2>Testimonials</h2>
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
                    <p className="card-text">{testimonial.text}</p>
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
