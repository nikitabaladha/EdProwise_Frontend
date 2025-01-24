import React from "react";
import { TbRadioactiveFilled } from "react-icons/tb";
import { PiStudentDuotone } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { BiSolidSchool } from "react-icons/bi";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

const cardData = [
  {
    id: 1,
    icon: <BiSolidSchool className="avatar-title fs-32 text-primary" />,
    title: "Total Schools",
    value: "100",
    trend: "up",
    percentage: "2.3%",
    period: "Last Week",
  },
  {
    id: 2,
    icon: <TbRadioactiveFilled className="avatar-title fs-32 text-primary" />,
    title: "Active Schools",
    value: "80",
    trend: "down",
    percentage: "10.6%",
    period: "Last Month",
  },
  {
    id: 3,
    icon: <PiStudentDuotone className="avatar-title fs-32 text-primary" />,
    title: "Total Students",
    value: "10000",
    trend: "up",
    percentage: "8.1%",
    period: "Last Month",
  },
  {
    id: 4,
    icon: <GiMoneyStack className="avatar-title fs-32 text-primary" />,
    title: "Revenue",
    value: "4000000",
    trend: "down",
    percentage: "0.3%",
    period: "Last Month",
  },
];

const DashboardInformationCards = () => {
  return (
    <div className="col-xxl-12">
      <div className="row">
        {cardData.map((card) => (
          <div className="col-md-3" key={card.id}>
            <div className="card overflow-hidden">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="avatar-md bg-soft-primary rounded">
                      {card.icon}
                    </div>
                  </div>
                  <div className="col-6 text-end">
                    <p className="text-muted mb-0 text-truncate custom-font-size-for-card">
                      {card.title}
                    </p>
                    <h4 className="text-dark mt-1 mb-0">{card.value}</h4>
                  </div>
                </div>
              </div>
              <div className="card-footer py-2 bg-light bg-opacity-50">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span
                      className={`text-${
                        card.trend === "up" ? "success" : "danger"
                      }`}
                    >
                      {card.trend === "up" ? (
                        <TiArrowSortedUp className="bx bxs-up-arrow fs-12" />
                      ) : (
                        <TiArrowSortedDown className="bx bxs-down-arrow fs-12" />
                      )}{" "}
                      {card.percentage}
                    </span>
                    <span className="text-muted ms-1 fs-12">{card.period}</span>
                  </div>
                  <a href="#!" className="text-reset fw-semibold fs-12">
                    View More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardInformationCards;
