import react, { useEffect, useRef, useState } from "react";

const HomeMainSection = () => {
  const slideTrackRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const words = [
    "Knowledge",
    "Education",
    "Experience",
    "Improved",
    "Free Class",
  ];
  const intervalTime = 3000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  // const intervalTime = 4000; // 4 seconds
  const [autoplay, setAutoplay] = useState(window.innerWidth <= 570);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % words.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [words.length, intervalTime]);

  useEffect(() => {
    let autoplayInterval;

    const startAutoplay = () => {
      if (autoplay) {
        autoplayInterval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % featuresData.length);
        }, intervalTime);
      }
    };

    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    // Start autoplay when below 570px
    if (autoplay) {
      startAutoplay();
    }

    // Clean up on unmount
    return () => stopAutoplay();
  }, [autoplay, intervalTime]);

  // Update autoplay on screen resize
  useEffect(() => {
    const handleResize = () => {
      setAutoplay(window.innerWidth <= 570);
      if (window.innerWidth > 570) {
        setCurrentIndex(0); // Reset carousel to first item on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHover = (index) => {
    if (!autoplay) {
      setCurrentIndex(index);
    }
  };

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(1);
  };

  // Array of unique names for the slides
  const slideNames = [
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
    "Digital Marketing",
  ];

  const featuresData = [
    {
      id: 1,
      icon: "fi flaticon-training-1",
      title: "10+ Happy Clients",
      description:
        "We take pride in our ability to deliver tailored courses and comprehensive training programs that effectively meet the unique and evolving needs of each client, ensuring satisfaction, measurable outcomes, and sustainable, long-term growth opportunities.",
      hiddenDescription:
        "We take pride in our ability to deliver tailored courses and comprehensive training programs that effectively meet the unique and evolving needs of each client, ensuring satisfaction, measurable outcomes, and sustainable, long-term growth opportunities.",
      link: "#",
    },
    {
      id: 2,
      icon: "fi flaticon-team",
      title: "100% Client Retention",
      description:
        "Our dedication to building long-term relationships, delivering exceptional services, and providing unmatched value has resulted in a perfect client retention rate, demonstrating trust, reliability, and client satisfaction.",
      hiddenDescription:
        "Our dedication to building long-term relationships, delivering exceptional services, and providing unmatched value has resulted in a perfect client retention rate, demonstrating trust, reliability, and client satisfaction.",
      link: "#",
    },
    {
      id: 3,
      icon: "fi flaticon-video-lesson",
      title: "20K+ Users",
      description:
        "Join our community of over 20,000 users who trust our platform to learn, grow, and achieve their goals with high-quality courses, valuable resources, expert guidance, personalized assistance, and continuous support.",
      hiddenDescription:
        "Join our community of over 20,000 users who trust our platform to learn, grow, and achieve their goals with high-quality courses, valuable resources, expert guidance, personalized assistance, and continuous support.",
      link: "#",
    },
    {
      id: 4,
      icon: "fi flaticon-training",
      title: "100+ Dashboards & Reports",
      description:
        "Unlock powerful insights with our 100+ dashboards and reports designed to provide actionable data for informed, strategic decision-making and improved overall performance outcomes and efficiency.",
      hiddenDescription:
        "Unlock powerful insights with our 100+ dashboards and reports designed to provide actionable data for informed, strategic decision-making and improved overall performance outcomes and efficiency.",
      link: "#",
    },
  ];

  return (
    <>
      <section className="slider-section pb-0">
        <div className="sliderr">
          <div className="slide-track" ref={slideTrackRef}>
            {slideNames.map((name, index) => (
              <div key={index} className="slidee">
                <div className="fw-bold p-2-web">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="static-hero-s2">
        <div className="hero-container">
          <div className="hero-inner p-0">
            <div className="container-fluid">
              <div className="hero-content">
                {/* Slide Title */}
                <div data-swiper-parallax="300" className="slide-title">
                  <h2 className="font-family-web">
                    Build Your First Step Of
                    <span>
                      <small
                        id="changing"
                        className="fade-in hf-size fw-bold"
                        key={counter}
                      >
                        {words[counter]}
                      </small>
                    </span>
                    with Eduko.
                  </h2>
                </div>

                {/* Slide Text */}
                <div data-swiper-parallax="400" className="slide-text">
                  <p className="font-family-web">
                    We are providing you the best tutor to enhance your
                    knowledge and skill. Let’s get started and get a relaxing
                    learning.
                  </p>
                </div>

                {/* Search Box */}
                <div
                  className="searchbox-wrap slide-text"
                  data-swiper-parallax="400"
                >
                  <input type="text" placeholder="Search Our Services..." />
                  <button>
                    <span className="font-family-web">Search</span>
                  </button>
                </div>

                {/* Call-to-Action Button */}
                <div data-swiper-parallax="500" className="slide-btns">
                  <a href="about.html" className="theme-btn">
                    Get Started
                  </a>
                </div>
              </div>

              {/* Student Picture with Shapes */}
              <div className="student-pic">
                <img src="assets/website-images/slider/2.webp" alt="Student" />
                <div className="wp-shape-1">
                  <img
                    src="assets/website-images/slider/shape-1.svg"
                    alt="Shape 1"
                  />
                </div>
                <div className="wp-shape-2">
                  <img
                    src="assets/website-images/slider/shape-2.svg"
                    alt="Shape 2"
                  />
                </div>
                <div className="wp-shape-3">
                  <img
                    src="assets/website-images/slider/shape-3.svg"
                    alt="Shape 3"
                  />
                </div>
                <div className="wp-shape-4">
                  <img
                    src="assets/website-images/slider/shape-4.svg"
                    alt="Shape 4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wpo-features-area section-padding pt-0">
        <div className="container-fluid">
          <div
            className="features-wrap"
            ref={carouselRef}
            style={{
              transform: `translateX(-${currentIndex * 106}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            <div className="row-web features-wrapp">
              {featuresData.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`col col-lg-3 col-md-6 col-12 carousel-itemm ${
                    index === currentIndex ? "active" : "item"
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`feature-item-wrap ${
                      activeIndex === index ? "active" : ""
                    }`}
                  >
                    <div className="feature-item">
                      <div className="icon">
                        <i className={feature.icon}></i>
                      </div>
                      <div className="feature-text">
                        <h2 className="font-weight-web-h2">
                          <a href={feature.link}>{feature.title}</a>
                        </h2>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                    <div className="feature-item-hidden">
                      <div className="icon">
                        <i className={feature.icon}></i>
                      </div>
                      <div className="feature-text">
                        <h2 className="font-weight-web-h2">
                          <a href={feature.link}>{feature.title}</a>
                        </h2>
                        <p>{feature.hiddenDescription}</p>
                        <a className="more font-family-web" href={feature.link}>
                          Read More...
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeMainSection;
