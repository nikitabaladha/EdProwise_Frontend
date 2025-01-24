import React from "react";

const BusinessSection = () => {
  const courses = [
    {
      id: "1",
      icon: "fi flaticon-user-experience",
      title: "PF & ESI Consultancy",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "#",
    },
    {
      id: "2",
      icon: "fi flaticon-megaphone",
      title: "Student Stationery",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "#",
    },
    {
      id: "3",
      icon: "fi flaticon-code",
      title: "Online Marketing",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "#",
    },
    {
      id: "4",
      icon: "fi flaticon-knowledge",
      title: "Consultancy",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      link: "#",
    },
  ];

  return (
    <div className="row wpo-courses-wrap service-row">
      {courses.map((course) => (
        <div
          key={course.id}
          className={`category-items col-lg-3 col-md-6 col-6 grid-web s${course.id}`}
        >
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              <div className="courses-icon category-icons">
                <i className={course.icon}></i>
              </div>
              <h2 className="category-h2">
                <a>{course.title}</a>
              </h2>
              <p className="category-text">{course.description}</p>
            </div>
            <a className="all-info">Read More...</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessSection;
