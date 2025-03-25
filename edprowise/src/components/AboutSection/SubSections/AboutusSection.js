import react from "react";
import { RiEmotionHappyLine } from "react-icons/ri";
import { FaHandsHelping } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
const AboutusSection = () => {
  return (
    <>
      <section
        className="wpo-about-section-s2 pb-1 pt-2"
        style={{ background: "#FCF9EF" }}
      >
        <div className="container container-big">
          <div className="wpo-about-wrap" style={{padding:"0 1.5rem"}}>
            <div className="row-web align-items-center">
              <div className="col-lg-4 col-md-12 col-12" style={{ order: 2 }}>
                {/* <div className="wpo-about-img" style={{ textAlign: "center" }}>
                  <img
                    src="/assets/images/EdProwiseFavicon.png"
                    alt=""
                    style={{ width: "25%" }}
                  />
                  <div className="back-shape">
                    <img
                      src="/assets/website-images/event/HomePage.png"
                      alt=""
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>  */}
                <div className="right-img mb-0 ">
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
              <div className="col-lg-8 col-md-12 col-12">
                <div className="wpo-about-text">
                  <div className="wpo-section-title mt-0">
                    {/* <small>About Edprowise</small> */}
                    <h2>Whatever School Need, We Provide</h2>
                  </div>
                  <h3>Empowering Schools with End-to-End Educational Services</h3>
                  <p className="about-para-text">
                    EdProwise is a visionary startup company committed to transforming the educational landscape by becoming a trusted Marketplace for Schools. We provide comprehensive, end-to-end solutions tailored specifically for educational institutions, helping them run efficiently, economically, and digitally.
                  </p >

                  <h3>A Complete Marketplace for Schools </h3>
                  <p className="about-para-text">At EdProwise, we recognize that schools need more than just products—they need solutions. Our platform offers everything schools require to function efficiently, including procurement, digital tools, academic support, financial services, and administrative management. We are committed to making school management smarter, simpler, and more cost-effective. </p>


                </div>
              </div>
            </div>
            <div className="wpo-about-text">
              <h3>Digital Services - Advance ERP</h3>
              <p className="about-para-text">
                Our robust suite of digital services is designed to bring schools into the modern era of education management. We provide custom school applications for principals, teachers, students, and parents, along with professionally designed websites that enhance a school’s digital presence.
              </p>
              <p className="about-para-text">Our Fees Management System helps schools track collections, send daily notifications, and streamline approval workflows. With our Payroll Management Software, schools can automate salary disbursement, manage staff attendance, handle leave records, and ensure compliance with ease. Our Financial Management tools provide insights through detailed reports like monthly profit & loss, key performance indicators (KPIs), and real-time dashboards for effective decision-making.</p>
              <p className="about-para-text">
                Additional digital solutions include online payment systems, digital exam result generation, library and admission management, attendance tracking, SMS and WhatsApp communication services, MIS reporting, and more—all aimed at simplifying operations and enhancing productivity.
              </p>

              <h3>Academic & Admin</h3>
              <p className="about-para-text">
                In addition, we provide academic and administrative services that support the daily functions of schools, including a recruitment portal for hiring staff, payroll and financial management software, PF & ESI consultancy, and entrance management solutions.Every solution is designed to reduce administrative burdens and improve institutional performance.
              </p>

              <h3>Procurement Management – High Quality, Low Cost, On Time delivery</h3>
              <p className="about-para-text">One of our core strengths lies in managing procurement of goods and services for schools. We ensure:
              </p>
              <ul style={{justifySelf:"center"}}>
                <li className="text-black fw-bold">High Quality:<span > Only trusted suppliers and vetted products.</span></li>
                <li className="text-black fw-bold">Low Cost: <span>Leveraging bulk discounts through aggregated purchasing power.</span></li>
                <li className="text-black fw-bold">On-Time Delivery: <span> Efficient logistics and supply chain systems.</span></li>
                <li className="text-black fw-bold">No Negotiation Hassles: <span>Transparent, fixed pricing for peace of mind.</span></li>
                <li className="text-black fw-bold">Digital Order System: <span>Schools can place, track, and manage orders seamlessly via our platform or app.</span></li>
                <li className="text-black fw-bold">Bulk Discount Advantage: <span>Enjoy corporate-level discounts as we consolidate demand across multiple institutions.</span></li>
              </ul>

              <h3>Our Expertise</h3>
              <p className="about-para-text">
                Our team brings together years of experience in education management, procurement, technology, and logistics, allowing us to deliver high-quality solutions with precision and professionalism. Our goal is to simplify school operations, reduce costs, improve service quality, and enable educators to focus on what matters most — teaching and nurturing students.
              </p>

              <h3>Relationship Management</h3>
              <p className="about-para-text">
                At EdProwise, we don’t just offer services—we build long-term partnerships. Our dedicated relationship managers work closely with each school to understand their needs, provide tailored solutions, and ensure a smooth, responsive service experience. Your success is our priority.
              </p>

            </div>
          </div>
        </div>
      </section>
      <section className="wpo-about-section section-padding p-2">
        <div className="container container-big">
          <div className="wpo-about-wrap">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="wpo-about-img-wrap">
                  {/* <div className="wpo-about-img-left">
                    <div className="wpo-about-img">
                      <img
                        src="assets/website-images/about/img-1.webp"
                        alt=""
                      />
                    </div>
                  </div> */}
                  <div className="wpo-about-img-right">
                    {/* <div className="wpo-about-img-inner">
                      <img
                        src="assets/website-images/about/img-2.webp"
                        alt=""
                      />
                    </div> */}
                    <div className="exprience-wrap ">
                      <div className="exprience">
                        <div className="icon">
                          <i className="fi flaticon-award"></i>
                        </div>
                        <div className="content">
                          <h3>1+</h3>
                          <p>Years Of Experience</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="wpo-about-text">
                  {/* <div className="wpo-section-title">

                    <h2>
                      A New Different Way To Improve Your
                      <span>
                        Skills.
                        <i className="shape">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 206 53"
                            fill="none"
                          >
                            <path d="M152.182 2.58319C107.878 0.889793 54.8748 6.13932 21.2281 18.6943C14.2699 21.4407 7.93951 24.7738 5.70192 28.7128C4.27488 31.2398 5.03121 33.954 7.69121 36.2925C14.8835 42.3911 31.9822 45.4011 46.8006 47.3115C78.3067 51.0179 113.672 51.7406 145.489 48.3204C167.194 46.0009 200.667 39.5923 199.399 28.5709C198.543 20.0621 180.437 14.5729 162.979 11.6178C138.219 7.469 111.131 6.00576 84.5743 5.86862C71.32 5.85789 58.0913 6.85723 45.6675 8.78436C33.512 10.7186 21.2709 13.4317 12.6602 17.5817C11.2246 18.2877 8.62449 17.4553 9.9973 16.6813C20.7486 11.2493 38.0215 7.73493 53.9558 5.76368C77.1194 2.90994 101.75 3.75426 125.339 5.14356C158.167 7.2615 207.554 13.5139 204.928 30.7413C203.629 36.0898 194.762 40.5057 184.681 43.5503C156.563 51.768 119.114 53.6844 85.6331 52.5265C65.1694 51.7477 44.4831 50.1855 25.9972 46.2442C11.4129 43.1186 -1.0337 37.8297 0.0679738 30.5063C2.14003 19.9035 31.4913 12.0006 52.6201 7.98775C71.2971 4.45904 91.3384 2.2302 111.674 1.24636C125.228 0.595237 138.962 0.539188 152.536 1.15931C153.475 1.20224 154.154 1.55523 154.051 1.94876C153.951 2.33872 153.115 2.62135 152.182 2.58319Z" />
                          </svg>
                        </i>
                      </span>
                    </h2>
                  </div>
                  <p className="text-black">
                  We offer a wide range of services including technology integration, administrative solutions, educational consultation, and professional development, providing holistic support tailored to enhance every aspect of educational operations.                 </p>
                  <p className="text-black">
                  We brings deep expertise and understanding of the unique needs and challenges faced by educational institutions. 
                  </p> */}
                  <div className="wpo-about-features-wrap">
                    <div className="wpo-about-features-item">
                      <div className="wpo-about-features-icon">
                        <div className="icon">
                          <RiEmotionHappyLine />
                          {/* <i className="fi flaticon-training-1"></i> */}
                        </div>
                      </div>
                      <div className="wpo-about-features-text">
                        <h5>5+ Happy Clients</h5>
                      </div>
                    </div>
                    <div className="wpo-about-features-item">
                      <div className="wpo-about-features-icon">
                        <div className="icon">
                          <FaHandsHelping />
                          {/* <i className="fi flaticon-video-lesson"></i> */}
                        </div>
                      </div>
                      <div className="wpo-about-features-text">
                        <h5>99% Client Retansion</h5>
                      </div>
                    </div>
                    <div className="wpo-about-features-item">
                      <div className="wpo-about-features-icon">
                        <div className="icon">
                          <FaUsers />
                          {/* <i className="fi flaticon-team"></i> */}
                        </div>
                      </div>
                      <div className="wpo-about-features-text">
                        <h5>5k Users</h5>
                      </div>
                    </div>
                    <div className="wpo-about-features-item">
                      <div className="wpo-about-features-icon">
                        <div className="icon">
                          <TbReportSearch />
                          {/* <i className="fi flaticon-training"></i> */}
                        </div>
                      </div>
                      <div className="wpo-about-features-text">
                        <h5>100+ Reports</h5>
                      </div>
                    </div>
                  </div>
                  {/* <a  className="theme-btn-ss">
                    Learn More About Us
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutusSection;
