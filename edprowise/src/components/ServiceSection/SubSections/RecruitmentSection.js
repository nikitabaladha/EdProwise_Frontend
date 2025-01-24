import React from "react";

const RecruitmentSection = () => {
  const courses = [
    {
      id: "s1",
      icon: "fi flaticon-user-experience",
      title: "ourUI/UX Design",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "#",
    },
    {
      id: "s2",
      icon: "fi flaticon-megaphone",
      title: "ourDigital Marketing",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "course.html",
    },
    {
      id: "s3",
      icon: "fi flaticon-code",
      title: "ourDevelopment",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "course.html",
    },
  ];

  return (
    <div className="row wpo-courses-wrap service-row">
      {courses.map((course) => (
        <div
          key={course.id}
          className={`category-items col-lg-3 col-md-6 col-6 grid-web ${course.id}`}
        >
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              <div className="courses-icon category-icons">
                <i className={course.icon}></i>
              </div>
              <h2 className="category-h2">
                <a href={course.link}>{course.title}</a>
              </h2>
              <p className="category-text">{course.description}</p>
            </div>
            <a className="all-info" href={course.link}>
              Read More...
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecruitmentSection;
