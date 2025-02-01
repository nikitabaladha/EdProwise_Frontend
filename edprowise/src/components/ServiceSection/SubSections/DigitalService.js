import React from "react";

const coursesData = [
  {
    id: 1,
    iconClass: "fi flaticon-user-experience",
    title: "School Fees Management Software - Pixel Fees",
    classid: 1,
  },
  {
    id: 2,
    iconClass: "fi flaticon-megaphone",
    title: "Payroll Management Software – Ease Payroll",
    classid: 2,
  },
  {
    id: 3,
    iconClass: "fi flaticon-code",
    title: "Financial Management Software – Book Sync",
    classid: 3,
  },
  {
    id: 4,
    iconClass: "fi flaticon-knowledge",
    title: "School Operational Management Software",
    classid: 4,
  },
  {
    id: 5,
    iconClass: "fi flaticon-user-experience",
    title: "School Mobile Application",
    classid: 5,
  },
  {
    id: 6,
    iconClass: "fi flaticon-megaphone",
    title: "School Website Design",
    classid: 6,
  },
  {
    id: 7,
    iconClass: "fi flaticon-code",
    title: "Digital Exam Result System",
    classid: 1,
  },
  {
    id: 8,
    iconClass: "fi flaticon-knowledge",
    title: "Digital Student Attendance",
    classid: 2,
  },
  {
    id: 9,
    iconClass: "fi flaticon-megaphone",
    title: "Digital Staff Attendance",
    classid: 3,
  },
  {
    id: 10,
    iconClass: "fi flaticon-code",
    title: "Library Management Software",
    classid: 4,
  },
  {
    id: 11,
    iconClass: "fi flaticon-knowledge",
    title: "Entrance Management Software",
    classid: 5,
  },
  {
    id: 12,
    iconClass: "fi flaticon-knowledge",
    title: "Entrance Management Software",
    classid: 6,
  },
  {
    id: 13,
    iconClass: "fi flaticon-knowledge",
    title: "Online Payment Gateway",
    classid: 1,
  },
  {
    id: 14,
    iconClass: "fi flaticon-knowledge",
    title: "SMS & Whats App Integration Services",
    classid: 2,
  },
];

const CourseItem = ({ iconClass, title, classid }) => {
  return (
    <div
      className={` category-items col-lg-3 col-md-6 col-6 grid-web s${classid}`}
    >
      <div className="wpo-courses-item category-itemm">
        <div className="wpo-courses-text">
          <div className="courses-icon category-icons">
            <i className={iconClass}></i>
          </div>
          <h2 className="category-h2 font-weight-web-h2">
            <a>{title}</a>
          </h2>
        </div>
        <a className="all-info ">Know More...</a>
      </div>
    </div>
  );
};

const DigitalSection = () => {
  return (
    <div className="row-web wpo-courses-wrap service-row">
      {coursesData.map((course) => (
        <CourseItem
          key={course.id}
          iconClass={course.iconClass}
          title={course.title}
          classid={course.classid}
        />
      ))}
    </div>
  );
};

export default DigitalSection;
