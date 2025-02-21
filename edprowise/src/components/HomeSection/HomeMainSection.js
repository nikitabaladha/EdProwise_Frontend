import react, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RiEmotionHappyLine } from "react-icons/ri";
import { FaHandsHelping } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
const HomeMainSection = () => {
  const slideTrackRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const words = [
    "Transforming",
    "Unlocking",
    "Redifining",
    "Nurturing",
  ];
  const intervalTime = 3000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  // const intervalTime = 4000; // 4 seconds
  const [autoplay, setAutoplay] = useState(window.innerWidth <= 570);
  const [activeIndex, setActiveIndex] = useState(1);
  const [translateValue, setTranslateValue] = useState(100); // Default to 100%

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setTranslateValue(100);
      } else if (window.innerWidth <= 991) {
        setTranslateValue(50);
      } else {
        setTranslateValue(100);
      }
    };

    handleResize(); // Call once to set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      setAutoplay(window.innerWidth <= 991);
      if (window.innerWidth > 991) {
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
    "Fees Management",
    "Payroll Management",
    "Digital Exam Result",
    "Student & Staff Attendance",
    "Library Management",
    "Admission Management",
    "Website Design",
    "PF & ESI Consultancy",
    "Event Management",
    "Affiliation Support",
    "Student Counselling",
    "Procurement Service",
    "Hiring Solutions",
    "Assessment of Candidate",
  ];

  const featuresData = [
    {
      id: 1,
      icon: <RiEmotionHappyLine />,
      title: "5+ Happy Clients ",
    },
    {
      id: 2,
      icon: <FaHandsHelping />,
      title: "99% Full Loyalty",
    },
    {
      id: 3,
      icon: <FaUsers />,
      title: "5K+ Users",
    },
    {
      id: 4,
      icon: <TbReportSearch />,
      title: "100+ Reports",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const searchBoxRef = useRef(null); // To handle click outside

  const serviceData = [
    { title: "School Fees Management Software - Pixel Fees" },
    { title: "Web Development" },
    { title: "App Development" },
    { title: "SEO Optimization" },
    { title: "Content Writing" },
    { title: "Graphic Design" },
    { title: "Social Media Management" },
    { title: "Data Analytics" },
    { title: "Cyber Security" },
    { title: "Cloud Computing" },
  ];

  // Filter services based on search query
  const filteredServices = searchQuery
    ? serviceData.filter((service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : serviceData.slice(0, 7); // Show first 7 by default

  // Handle click outside to close the search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
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
                    Empowering Schools,
                    <span>
                      <small
                        id="changing"
                        className="fade-in hf-size fw-bold"
                        key={counter}
                      >
                        {words[counter]}
                      </small>
                    </span>
                    Excellence
                  </h2>
                </div>
                <div data-swiper-parallax="400" class="slide-text">
                  <p className="text-black">Inspiring growth, fostering innovation, shaping the future, and cultivating success in education.</p>
                </div>

                {/* Slide Text */}
                <div data-swiper-parallax="400" className="slide-text">
                  <p className="font-family-web">

                  </p>
                </div>

                <div className="serach-expand slide-text" ref={searchBoxRef}>
                  <div
                    className="searchbox-wrap slide-text"
                    data-swiper-parallax="400"
                  >
                    <input
                      className="home-search-input"
                      type="text"
                      placeholder="Search Our Services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onClick={() => setIsExpanded(true)}
                    />
                    <button>
                      <span className="font-family-web">Search</span>
                    </button>
                  </div>
                  {/* Service suggestions dropdown list-unstyled */}
                  {isExpanded && (
                    <ul className="service-suggestions slide-text pb-2  "> 
                      {filteredServices.length > 0 ? (
                        filteredServices.map((service, index) => (
                         <li className="d-flex justify-content-between mb-1 align-item-center pl-2 ">
                           <div
                            key={index}
                            className="service-item pl-1"
                            onClick={() => {
                              setSearchQuery(service.title);
                              setIsExpanded(false);
                            }}
                          >
                            {service.title}
                          </div>
                          <span className=""><IoIosSend /></span>
                         </li>
                        ))
                      ) : (
                        <div className="no-results">No services found</div>
                      )}
                    </ul>
                  )}
                </div>

                {/* Search Box */}
                {/* <div className="serach-expand">
                 <div
                  className="searchbox-wrap slide-text"
                  data-swiper-parallax="400"
                >
                  <input type="text" placeholder="Search Our Services..." />
                  <button>
                    <span className="font-family-web">Search</span>
                  </button>
                </div> 
              </div> */}




                {/* Call-to-Action Button */}
                <div data-swiper-parallax="500" className="slide-btns">
                  <Link to="/request-demo" className="theme-btn">
                    Request For Demo
                  </Link>
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
          <div className="features-wrap">
            <div
              className="row-web features-wrapp back-color"
              ref={carouselRef}
              style={{
                transform: `translateX(-${currentIndex * translateValue}%)`,
                transition: "transform 0.5s ease-in-out",
                // background:"#A9FFFD",
                borderRadius: "10px",
              }}
            >
              {featuresData.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`col col-lg-3 col-md-6 col-12 carousel-itemm ${index === currentIndex ? "active" : "item"
                    }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`feature-item-wrap ${window.innerWidth <= 992
                        ? index === currentIndex
                          ? "active"
                          : ""
                        : activeIndex === index
                          ? "active"
                          : ""
                      }`}
                  >
                    <div className="feature-item d-flex feature-itemm-small">
                      <div className="icon">
                        {/* <FontAwesomeIcon icon="fa-solid fa-face-smile" />        */}
                        {/* <RiEmotionHappyLine /> */}
                        {feature.icon}

                        <i className={feature.icon}></i>
                      </div>
                      <div className="feature-text align-content-center m-2">
                        <h2 className="font-weight-web-h2 mb-0">
                          <a className="feature-title-color" >{feature.title}</a>
                        </h2>
                        {/* <p>{feature.description}</p> */}
                      </div>
                    </div>
                    <div className="feature-item-hidden d-flex feature-itemm-small">
                      <div className="icon">
                        {feature.icon}

                        {/* <i className={feature.icon}></i> */}
                      </div>
                      <div className="feature-text align-content-center m-2">
                        <h2 className="font-weight-web-h2 mb-0">
                          <a href={feature.link}>{feature.title}</a>
                        </h2>
                        {/* <p>{feature.hiddenDescription}</p> */}

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
