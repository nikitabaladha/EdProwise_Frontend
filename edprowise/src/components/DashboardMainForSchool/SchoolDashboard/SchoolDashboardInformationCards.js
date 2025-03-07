import React from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { PiShoppingCartBold } from "react-icons/pi";
import { AiFillProduct } from "react-icons/ai";
import { AiOutlineProduct } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { PiMoneyWavyBold } from "react-icons/pi";
import { FaSchool } from "react-icons/fa6";
import { LuSchool } from "react-icons/lu";
import { PiStudentFill } from "react-icons/pi";
import { PiStudent } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { GiShop } from "react-icons/gi";
import { AiOutlineShop } from "react-icons/ai";

const DashboardInformationCards = ({ totalCounts }) => {
  const cardData = [
    {
      icon: <PiStudentFill className="fs-36 text-warning" />,
      value: totalCounts.totalStudents || 0,
      label: "Total Students",
      badgeClass: "badge-soft-danger",
      badgeIcon: "ti ti-arrow-badge-down",
      badgeText: "5.69%",
      widgetIcon: <PiStudent className="widget-icon" />,
      textColor: "text-purple",
    },

    {
      icon: <IoNewspaperOutline className="fs-36 text-info" />,
      value: totalCounts.totalQuoteRequest || 0,
      label: "Total Quotes",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      // badgeText: "8.72%",
      widgetIcon: <IoNewspaperOutline className="widget-icon" />,
      textColor: "text-info",
    },
    {
      icon: <PiShoppingCartBold className="fs-36 text-success" />,
      value: totalCounts.totalOrder || 0,
      label: "Total Orders",
      badgeClass: "badge-soft-danger",
      badgeIcon: "ti ti-arrow-badge-down",
      // badgeText: "3.28%",
      widgetIcon: <PiShoppingCartBold className="widget-icon" />,
      textColor: "text-success",
    },

    {
      icon: <GiMoneyStack className="fs-36 text-warning" />,
      value: totalCounts.totalRevenue || 0,
      label: "Total Revenue",
      badgeClass: "badge-soft-success",
      badgeIcon: "ti ti-arrow-badge-up",
      badgeText: "10.58%",
      widgetIcon: <PiMoneyWavyBold className="widget-icon" />,
      textColor: "text-orange",
    },
  ];
  return (
    <div className="row">
      {cardData.map((card, index) => (
        <div className="col-md-3">
          <div className="card">
            <div className="card-body overflow-hidden position-relative">
              {card.icon}

              <h3 className="mb-0 fw-bold mt-3 mb-1">{card.value}</h3>
              <p className="text-muted">{card.label}</p>

              {card.widgetIcon}
            </div>{" "}
            {/* end card-body */}
          </div>{" "}
          {/* end card */}
        </div>
      ))}
    </div>
  );
};

export default DashboardInformationCards;
