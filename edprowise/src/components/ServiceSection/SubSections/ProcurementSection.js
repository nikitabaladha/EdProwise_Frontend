import React from "react";

const ProcurementSection = () => {
  const courses = [
    {
      id: "1",
      icon: "fi flaticon-user-experience",
      title: "School Desk & Bench (Senior School)",
      classid: "1",
    },
    {
      id: "2",
      icon: "fi flaticon-megaphone",
      title: "School Desk & Bench (Senior School)",
      classid: "2",
    },
    {
      id: "3",
      icon: "fi flaticon-code",
      title: "Office Furniture",
      classid: "3",
    },
    {
      id: "4",
      icon: "fi flaticon-knowledge",
      title: "Building Construction",
      classid: "4",
    },
    {
      id: "5",
      icon: "fi flaticon-user-experience",
      title: "Building Architecture Services",
      classid: "5",
    },
    {
      id: "6",
      icon: "fi flaticon-user-experience",
      title: "Classroom Board",
      classid: "1",
    },
    {
      id: "7",
      icon: "fi flaticon-megaphone",
      title: "Playways Equipment",
      classid: "2",
    },
    {
      id: "8",
      icon: "fi flaticon-code",
      title: "Fire Extinguisher",
      classid: "3",
    },
    {
      id: "9",
      icon: "fi flaticon-knowledge",
      title: "Computer & Its Accessories",
      classid: "4",
    },
    {
      id: "10",
      icon: "fi flaticon-user-experience",
      title: "Smart Class Equipments",
      classid: "5",
    },
    {
      id: "11",
      icon: "fi flaticon-user-experience",
      title: "Air Cooling System",
      classid: "1",
    },
    {
      id: "12",
      icon: "fi flaticon-megaphone",
      title: "Infrastructure Setup",
      classid: "2",
    },
    {
      id: "13",
      icon: "fi flaticon-code",
      title: "Science Lab Equipments",
      classid: "3",
    },
    {
      id: "14",
      icon: "fi flaticon-knowledge",
      title: "Library Books",
      classid: "4",
    },
    {
      id: 15,
      icon: "fi flaticon-user-experience",
      title: "Exam Writing Paper",
      classid: 5,
    },
    {
      id: 16,
      icon: "fi flaticon-code",
      title: "School Magazine & Prospectus",
      classid: 1,
    },
  ];

  return (
    <div className="row-web wpo-courses-wrap service-row">
      {courses.map((course) => (
        <div
          key={course.id}
          className={`category-items col-lg-3 col-md-6 col-6 grid-web s${course.classid}`}
        >
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              <div className="courses-icon category-icons">
                <i className={course.icon}></i>
              </div>
              <h2 className="category-h2 font-weight-web-h2">
                <a>{course.title}</a>
              </h2>
              {/* <p className="category-text">{course.description}</p> */}
            </div>
            <a className="all-info">Know More...</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcurementSection;
