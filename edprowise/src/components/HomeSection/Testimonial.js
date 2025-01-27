import React, { useEffect, useRef, useState } from "react";

const TestimonialSection = () => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = [
    {
      img: "assets/website-images/testimonial/thumb1.webp",
      name: "Leslie Alexander",
      role: "Students of UX/UI",
      rating: 5,
      feedback:
        "I can't express enough gratitude for the awesome experience I had during my education journey. As a beginner, they supported me as much as possible.",
    },
    {
      img: "assets/website-images/testimonial/thumb2.webp",
      name: "Eleanor Pena",
      role: "Students of Graphic Designer",
      rating: 4,
      feedback:
        "I can't express enough gratitude for the awesome experience I had during my education journey. As a beginner, they supported me as much as possible.",
    },
    {
      img: "assets/website-images/testimonial/thumb3.webp",
      name: "Annette Black",
      role: "Students of PHP",
      rating: 5,
      feedback:
        "I can't express enough gratitude for the awesome experience I had during my education journey. As a beginner, they supported me as much as possible.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      const translateValue = -(width * currentSlide);
      carouselRef.current.style.transform = `translateX(${translateValue}px)`;
      carouselRef.current.style.transition = "transform 0.3s ease-in-out";
    }
  }, [currentSlide]);

  return (
    <section
      className="wpo-testimonial-section section-padding"
      style={{ background: "white" }}
    >
      <div className="container">
        <div className="wpo-section-title-s2">
          <small>Testimonials</small>
          <h2 className="font-family-web">What Our Students Say About Us</h2>
        </div>
        <div className="wpo-testimonial-wrap">
          <div className="row-web align-items-center">
            <div
              className="wpo-testimonial-items wpo-testimonial-active"
              ref={carouselRef}
              style={{
                display: "flex",
                // width: `${testimonials.length * 100}%`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div className="wpo-testimonial-item" key={index}>
                  <div className="wpo-testimonial-text">
                    <div className="wpo-testimonial-text-btm">
                      <div className="wpo-testimonial-text-btm-img">
                        <img src={testimonial.img} alt={testimonial.name} />
                      </div>
                      <div className="wpo-testimonial-text-btm-info">
                        <h3 className="font-family-web">{testimonial.name}</h3>
                        <span>{testimonial.role}</span>
                      </div>
                    </div>
                    <ul>
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <li key={i}>
                            <i
                              className={`fi flaticon-star ${
                                i < testimonial.rating ? "" : "off"
                              }`}
                            ></i>
                          </li>
                        ))}
                      <li>({testimonial.rating}.0)</li>
                    </ul>
                    <i className="quote fi flaticon-right-quote-sign"></i>
                    <p>{testimonial.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="shape-1">
        <img src="assets/website-images/testimonial/shape-1.webp" alt="" />
      </div>
      <div className="shape-2">
        <img src="assets/website-images/testimonial/shape-2.webp" alt="" />
      </div>
    </section>
  );
};

export default TestimonialSection;
