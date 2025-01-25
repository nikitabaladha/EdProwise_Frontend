import React from "react";

const coursesData = [
  {
    id: 1,
    iconClass: "fi flaticon-user-experience",
    title: "Fees Module",
    description:
      "We are providing you the best Fees Module guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 1,
  },
  {
    id: 2,
    iconClass: "fi flaticon-megaphone",
    title: "Payroll Module",
    description:
      "We are providing you the best Payroll guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 2,
  },
  {
    id: 3,
    iconClass: "fi flaticon-code",
    title: "Finance Module",
    description:
      "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 3,
  },
  {
    id: 4,
    iconClass: "fi flaticon-knowledge",
    title: "School Application",
    description:
      "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 4,
  },
  {
    id: 5,
    iconClass: "fi flaticon-user-experience",
    title: "Digital Exam Result System",
    description:
      "We are providing you the best Fees Module guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 5,
  },
  {
    id: 6,
    iconClass: "fi flaticon-megaphone",
    title: "Digital Staff Attendance",
    description:
      "We are providing you the best Payroll guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 6,
  },
  {
    id: 7,
    iconClass: "fi flaticon-code",
    title: "Library Management",
    description:
      "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 1,
  },
  {
    id: 8,
    iconClass: "fi flaticon-knowledge",
    title: "Enquiry Management",
    description:
      "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 2,
  },
  {
    id: 9,
    iconClass: "fi flaticon-megaphone",
    title: "Entrance Exam Management",
    description:
      "We are providing you the best Payroll guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 3,
  },
  {
    id: 10,
    iconClass: "fi flaticon-code",
    title: "Online Fees Payment",
    description:
      "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 4,
  },
  {
    id: 11,
    iconClass: "fi flaticon-knowledge",
    title: "Website Design",
    description:
      "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    link: "#",
    classid: 5,
  },
];

const CourseItem = ({ iconClass, title, description, link, classid }) => {
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
          <p className="category-text">{description}</p>
        </div>
        <a className="all-info" href={link}>
          Read More...
        </a>
      </div>
    </div>
  );
};

const DigitalSection = () => {
  return (
    <div className="row wpo-courses-wrap service-row">
      {coursesData.map((course) => (
        <CourseItem
          key={course.id}
          iconClass={course.iconClass}
          title={course.title}
          description={course.description}
          link={course.link}
          classid={course.classid}
        />
      ))}
    </div>
  );
};

export default DigitalSection;
