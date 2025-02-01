import React from "react";
import { Link } from "react-router-dom";

const coursesData = [
  {
    id: 1,
    icon: "fi flaticon-user-experience",
    title: "Digital",
    description:
      "Offers comprehensive digital services including ERP software, custom websites, mobile apps, and digital solutions for enhanced business efficiency.",
    link: "/services/digital-services",
  },
  {
    id: 2,
    icon: "fi flaticon-megaphone",
    title: "Academic & Admin",
    description:
      "Offers PF and ESI management, international tours, student counseling, skill-based courses, and personalized solutions.",
    link: "/services/business-services",
  },
  {
    id: 3,
    icon: "fi flaticon-code",
    title: "Procurement ",
    description:
      "EdProwise procurement services include bulk discounts, vendor management, quality assurance, timely delivery, easy ordering, customized solutions, and transparent pricing.",
    link: "/services/procurement-services",
  },
  {
    id: 4,
    icon: "fi flaticon-knowledge",
    title: "Recruitment",
    description:
      "EdProwise offers recruitment services, including digital portals, candidate screening, job matching, interview scheduling, onboarding support, and efficient talent acquisition.",
    link: "/services/recruitment-services",
  },
];

const Category = () => {
  return (
    <section className="wpo-courses-section-s2 section-padding pt-0 pb-1">
      <div className="container">
        <div className="row-web">
          <div className="col-12">
            <div className="wpo-section-title-s2">
              {/* <small>Our Courses</small> */}
              <h2 className="font-family-web">Explore By Category</h2>
            </div>
          </div>
        </div>
        <div className="row-web wpo-courses-wrap">
          {coursesData.map((course) => (
            <div
              key={course.id}
              className={`category-items col-lg-3 col-md-6 col-6 grid-web s${course.id}`}
            >
              <div className="wpo-courses-item category-itemm">
                <Link to={course.link}>
                  <div className="wpo-courses-text">
                    <div className="courses-icon category-icons">
                      <i className={course.icon}></i>
                    </div>
                    <h2 className="category-h2 font-weight-web-h2">
                      <a>{course.title}</a>
                    </h2>
                    <p className="category-text font-family-web ">
                      {course.description}
                    </p>
                  </div>
                </Link>
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

export default Category;
