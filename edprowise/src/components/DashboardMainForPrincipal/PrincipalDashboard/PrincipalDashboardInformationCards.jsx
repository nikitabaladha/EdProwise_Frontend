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
const PrincipalDashboardInformationCards = () => {
  // PiStudentFill
  const cardData = [
    {
      icon: <IoNewspaperOutline className="fs-36 text-warning" />,
      title: "Report",
      value1: 450,
      label1: "Total Students",
      value2: 72,
      label2: "Teachers Today",
      badgeClass: "badge-soft-danger",
      badgeIcon: "ti ti-arrow-badge-down",
      widgetIcon: <PiStudent className="widget-icon" />,
      textColor: "text-purple",
    },

    {
      icon: <GiMoneyStack className="fs-36 text-info" />,
      title: "Fees Collection",
      value1: "1.4L",
      label1: "Today",
      value2: "3.6L",
      label2: "This Month",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      widgetIcon: <PiMoneyWavyBold className="widget-icon" />,
      textColor: "text-info",
    },
    {
      icon: <GrGroup className="fs-36 text-success" />,
      title: "Student Attendance",
      value1: 440,
      label1: "Present",
      value2: 10,
      label2: "Absent",
      badgeClass: "badge-soft-danger",
      badgeIcon: "ti ti-arrow-badge-down",
      widgetIcon: <GrGroup className="widget-icon" />,
      textColor: "text-success",
    },

    {
      icon: <FaCalendarXmark className="fs-36 text-warning" />,
      title: "Staff Leave/Late",
      value1: 5,
      label1: "On Leave",
      value2: 3,
      label2: "Late Arrivals",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      widgetIcon: <FaCalendarXmark className="widget-icon" />,
      textColor: "text-orange",
    },
    {
      icon: <IoMdPersonAdd className="fs-36 text-success" />,
      title: "Total Employee",
      value1: 40,
      label1: "Male",
      value2: 30,
      label2: "Female",
      badgeClass: "badge-soft-danger",
      badgeIcon: "ti ti-arrow-badge-down",
      widgetIcon: <IoMdPersonAdd className="widget-icon" />,
      textColor: "text-info",
    },

    {
      icon: <HiBellAlert className="fs-36 text-warning" />,
      title: "Alert",
      value1: 12,
      label1: "New Admission",
      value2: 2,
      label2: "Sudden Dropout",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      widgetIcon: <HiBellAlert className="widget-icon" />,
      textColor: "text-success",
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
}

export default PrincipalDashboardInformationCards