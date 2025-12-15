import React, { useState } from "react";
import { PiBrainBold } from "react-icons/pi";
import { RiBookletFill } from "react-icons/ri";
import { GiRobotGolem } from "react-icons/gi";
import { MdDashboardCustomize } from "react-icons/md";
import { PiCpuFill } from "react-icons/pi";
import { RiBarChartFill } from "react-icons/ri";
import { LuAlarmClock } from "react-icons/lu";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { HiMiniBookOpen } from "react-icons/hi2";
import { CiChat1 } from "react-icons/ci";
import { MdOutlineFactCheck } from "react-icons/md";
const WhyChooseUs = () => {
  const [activeTab, setActiveTab] = useState("Schools");

  const chooseDataSchools = [
    {
      id: 1,
      iconClass: <PiBrainBold />,
      title: "AI Powered Learning",
      description:
        "Personalized Learning Through AI",
      classNameS: "s1",
    },
    {
      id: 2,
      iconClass: <RiBookletFill />,
      title: "Curriculum & Lesson Planning",
      description:
        "Structured & NEP-Aligned Curriculum",
      classNameS: "s2",
    },
    {
      id: 3,
      iconClass: <GiRobotGolem />,
      title: "STEM, AI & Robotics Labs",
      description:
        "Learn by Doing – Innovation Labs for Students",
      classNameS: "s3",
    },
    {
      id: 4,
      iconClass: <MdDashboardCustomize />,
      title: "SchoolERPAI",
      description:
        "All-in-One ERP Platform to manage Academics, Finance, HR, and Operations — all from a single, centralized dashboard",
      classNameS: "s4",
    },
  ];

  const chooseDataTeachers = [
    {
      id: 1,
      iconClass: <PiCpuFill />,
      title: "AI & Automation for Teachers",
      description:
        "Reduce admin load with automation — focus more on teaching, less on paperwork",
      classNameS: "s1",
    },
    {
      id: 2,
      iconClass: <RiBarChartFill />,
      title: "Performance & Analytics",
      description:
        "Real-time classroom and student insights to help teachers plan better and drive academic success",
      classNameS: "s2",
    },
    {
      id: 3,
      iconClass: <LuAlarmClock />,
      title: "Time & Attendance",
      description:
        "Mark attendance management and class scheduling for better time control",
      classNameS: "s3",
    },
    {
      id: 4,
      iconClass: <GiTeacher />,
      title: "Smart Teaching Tools",
      description:
        "Teach smarter with interactive boards, AI lesson planners, and digital content designed for effective classroom delivery",
      classNameS: "s4",
    },
  ];

  const chooseDataStudents = [
    {
      id: 1,
      iconClass: <PiStudentFill />,
      title: "Smart Learning Tools",
      description:
        "Learn anywhere, anytime — powered by AI, visuals, and interactive technology that make learning engaging and effective",
      classNameS: "s1",
    },
    {
      id: 2,
      iconClass: <HiMiniBookOpen />,
      title: "Curriculum & Study Resources",
      description:
        "Access digital study material, e-books, and daily lessons — all aligned with CBSE, ICSE, State Boards, and NEP 2020",
      classNameS: "s2",
    },
    {
      id: 3,
      iconClass: <CiChat1 />,
      title: "AI-Based Learning Assistant",
      description:
        "Get real-time learning recommendations, study tips, and progress feedback powered by AI",
      classNameS: "s3",
    },
    {
      id: 4,
      iconClass: <MdOutlineFactCheck />,
      title: "Exam & Result Management",
      description:
        "Get detailed feedback and AI-powered insights after every test — instantly and transparently",
      classNameS: "s4",
    },
  ];

  return (
    <>
      <section
        className="wpo-courses-section-s2 section-padding section-background-box-shadow pt-2 pb-1"

      >
        <div className="container">
          <div className="row-web">
            <div className="col-12">
              <div className="wpo-section-title-s2">
                <h2 className="font-family-web">Maximizing Value for School's, Teacher's, Student's</h2>
              </div>
            </div>
          </div>
          <div className="tabs">
            <button
              id="SchoolsTab"
              className={` theme-choose-btn ${activeTab === "Schools" ? "active" : ""
                }`}
              onClick={() => setActiveTab("Schools")}
            >
              Schools
            </button>
            <button
              id="TeachersTab"
              className={` theme-choose-btn ${activeTab === "Teachers" ? "active" : ""
                }`}
              onClick={() => setActiveTab("Teachers")}
            >
              Teachers
            </button>
            <button
              id="StudentsTab"
              className={` theme-choose-btn ${activeTab === "Students" ? "active" : ""
                }`}
              onClick={() => setActiveTab("Students")}
            >
              Students
            </button>
          </div>
          <div
            className={`show-tab ${activeTab === "Schools" ? "active" : ""}`}
            id="SchoolsSection"
          >
            <div className="row-web wpo-courses-wrap">
              {chooseDataSchools.map((item) => (
                <div
                  key={item.id}
                  className={`category-items col-lg-3 col-md-6 col-6 grid-web ${item.classNameS}`}
                >
                  <div className="wpo-courses-item category-itemm">
                    <div className="wpo-courses-text">
                      <div className="courses-icon category-icons">
                        {item.iconClass}
                        {/* <i className={item.iconClass}></i> */}
                      </div>
                      <h2 className="category-h2 font-weight-web-h2">
                        <a>{item.title}</a>
                      </h2>
                      <p className="category-text font-family-web ">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`show-tab ${activeTab === "Teachers" ? "active" : ""}`}
            id="TeachersSection"
          >
            <div className="row-web wpo-courses-wrap">
              {chooseDataTeachers.map((item) => (
                <div
                  key={item.id}
                  className={`category-items col-lg-3 col-md-6 col-6 grid-web ${item.classNameS}`}
                >
                  <div className="wpo-courses-item category-itemm">
                    <div className="wpo-courses-text">
                      <div className="courses-icon category-icons">
                        {item.iconClass}
                        {/* <i className={item.iconClass}></i> */}
                      </div>
                      <h2 className="category-h2 font-weight-web-h2">
                        <a>{item.title}</a>
                      </h2>
                      <p className="category-text font-family-web">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`show-tab ${activeTab === "Students" ? "active" : ""}`}
            id="StudentsSection"
          >
            <div className="row-web wpo-courses-wrap">
              {chooseDataStudents.map((item) => (
                <div
                  key={item.id}
                  className={`category-items col-lg-3 col-md-6 col-6 grid-web ${item.classNameS}`}
                >
                  <div className="wpo-courses-item category-itemm">
                    <div className="wpo-courses-text">
                      <div className="courses-icon category-icons">
                        {item.iconClass}
                        {/* <i className={item.iconClass}></i> */}
                      </div>
                      <h2 className="category-h2 font-weight-web-h2">
                        <a>{item.title}</a>
                      </h2>
                      <p className="category-text font-family-web">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
      <section className="wpo-courses-section-s2 section-padding section-background-box-shadow pt-2 pb-3">
        <div className="container">
          <div className="row-web">
            <div className="col-12">
              <div className="wpo-section-title-s2">
                {/* <small>Our Courses</small> */}
                <h2 className="font-family-web">Served Best Institute</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="slider">
          <div className="slide-track">
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/carmel-school.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/francis-de-sales-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/christ-raja-school.jpg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/Mount-collage-logo.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/thomas-convent-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/trinity-convent-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/carmel-school.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/francis-de-sales-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/christ-raja-school.jpg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/Mount-collage-logo.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/thomas-convent-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/trinity-convent-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/carmel-school.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                className="serve-school-img"
                src="/assets/website-images/francis-de-sales-school.jpeg"
                height="100"
                width="250"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
