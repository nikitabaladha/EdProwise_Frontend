import React, {useState, useEffect} from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { PiShoppingCartBold } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { PiMoneyWavyBold } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";
import { PiStudent } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";
import { FaCalendarXmark } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
const StudentDashboardInformationCards = () => {
  // PiStudentFill
  const cardData = [
    {
      icon: <IoNewspaperOutline className="fs-36 text-warning" />,
      title: "Homework",
      value1: 3,
      label1: "Pending",
      value2: 2,
      label2: "Due Today",
      badgeClass: "badge-soft-danger",
      badgeIcon: "ti ti-arrow-badge-down",
      widgetIcon: <PiStudent className="widget-icon" />,
      textColor: "text-purple",
    },

    {
      icon: <GiMoneyStack className="fs-36 text-info" />,
      title: "Upcoming Exam",
      value1: "Math",
      label1: "July-12",
      value2: "Science",
      label2: "july-15",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      widgetIcon: <PiMoneyWavyBold className="widget-icon" />,
      textColor: "text-info",
    },
    {
      icon: <GrGroup className="fs-36 text-success" />,
      title: "Notices",
      value1: 4,
      label1: "New Notice",
      value2: "Science Fair",
      label2: "Today",
      badgeClass: "badge-soft-danger",
      badgeIcon: "ti ti-arrow-badge-down",
      widgetIcon: <GrGroup className="widget-icon" />,
      textColor: "text-success",
    },

    {
      icon: <FaCalendarXmark className="fs-36 text-warning" />,
      title: "Fees",
      value1: "6,000",
      label1: "Dues",
      value2: "Aug-25",
      label2: "Due Date",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      widgetIcon: <FaCalendarXmark className="widget-icon" />,
      textColor: "text-orange",
    },
    
  ];
  return (
    <div className="row">
      {cardData.map((card, index) => (
        <div className="col-md-4">
          <div className="card">
            <div className="card-body overflow-hidden position-relative">
              <div>
                <span className="text-start me-2">{card.icon}</span>{" "}
                <span className="fw-bold ">{card.title}</span>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="mb-0 fw-bold mt-3 mb-1">{card.value1}</h3>
                  <p className="text-muted">{card.label1}</p>
                </div>
                <div>
                  <h3 className="mb-0 fw-bold mt-3 mb-1">{card.value2}</h3>
                  <p className="text-muted">{card.label2}</p>
                </div>
              </div>
              {card.widgetIcon}
            </div>{" "}
          </div>{" "}
        </div>
      ))}
    </div>
  );
};

export default StudentDashboardInformationCards;