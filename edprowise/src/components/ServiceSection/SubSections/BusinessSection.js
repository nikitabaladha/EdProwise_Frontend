import React from "react";
import { Link } from "react-router-dom";

const BusinessSection = () => {
  const courses = [
    {
      id: "1",
      icon: "fi flaticon-user-experience",
      title: "PF Consultancy",
      serviceid: "1",
    },
    {
      id: "2",
      icon: "fi flaticon-megaphone",
      title: "ESI Consultancy",
      serviceid: "2",
    },
    {
      id: "3",
      icon: "fi flaticon-code",
      title: "Digital Marketing",
      serviceid: "3",
    },
    {
      id: "4",
      icon: "fi flaticon-knowledge",
      title: "Event Management",
      serviceid: "4",
    },
    {
      id: "5",
      icon: "fi flaticon-knowledge",
      title: "Affiliation Support",
      serviceid: "5",
    },
    {
      id: "6",
      icon: "fi flaticon-code",
      title: "International Tour Management",
      serviceid: "6",
    },
    {
      id: "7",
      icon: "fi flaticon-megaphone",
      title: "Student Counselling",
      serviceid: "1",
    },
    {
      id: "8",
      icon: "fi flaticon-user-experience",
      title: "Training & Workshop for Teacher",
      serviceid: "2",
    },
  ];

  return (
    <div className="row-web wpo-courses-wrap service-row">
      {courses.map((course) => (
        <div
          key={course.id}
          className={`category-items col-lg-3 col-md-6 col-6 grid-web s${course.serviceid}`}
        >
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              <div className="courses-icon category-icons">
                <i className={course.icon}></i>
              </div>
              <h2 className="category-h2 font-weight-web-h2">
                <a>{course.title}</a>
              </h2>
            </div>
            <a className="all-info">Know More...</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessSection;
