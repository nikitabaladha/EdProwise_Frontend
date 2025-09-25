import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoNewspaperOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { TiPin } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { FaRegCalendarDays } from "react-icons/fa6";
const ViewTeacherAllNotifications = () => {
  const navigate = useNavigate();
  const basicData = {
    Approval: {
      border: "border-success",
      tagbg: "#28a745",
    },
    MIS: {
      border: "border-info",
      tagbg: "#17a2b8",
    },
    Procurement: {
      border: "border-warning",
      tagbg: "#ffc107",
    },
    Default: {
      border: "border-secondary",
      tagbg: "#6c757d",
    },
  };

  const cardData = [
    {
      icon: <IoNewspaperOutline className="fs-36 text-warning" />,
      title: "",
      info: "Quote Received from supplier for Enquiry #ENQ-001, ",
      tag: "Procurement",
    },

    {
      icon: <GiMoneyStack className="fs-36 text-info" />,
      title: "Teachers Training Session ",
      info: "A Teachers meet will be conducted at 10:00 AM in the School Auditorium.",
      tag: "MIS",
    },

    {
      icon: <GrGroup className="fs-36 text-success" />,
      title: "Teachers Training Session",
      info: "A Teachers meet will be conducted at 10:00 AM in the School Auditorium. A Teachers meet will be conducted at 10:00 AM in the School Auditorium",
      tag: "Approval",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container mt-2">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Notifications
                  </h4>
                </div>
              </div>

              {/* 
border-primary border
border-secondary
border-success 
*/}
              <div className="row mt-2">
                {cardData.map((card, index) => {
                  const style = basicData[card.tag] || basicData["Default"];

                  return (
                    <div key={index} className="col-lg-12 ">
                      <div className={`card border ${style.border}`}>
                        <div className="card-body overflow-hidden position-relative p-2">
                          <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                            <span
                              className="badge text-dark me-2 p-1 "
                              style={{
                                cursor: "pointer",
                                background: style.tagbg,
                              }}
                            >
                              {card.tag || "Unknown"}
                            </span>
                            <div className="d-flex gap-2">
                              <Link className="btn btn-soft-danger btn-sm">
                                <RxCross2 className="align-middle fs-18" />
                              </Link>
                            </div>
                          </div>

                          <div className="">
                            {card.info}
                            <span
                              className="d-block"
                              style={{
                                fontSize: "0.8rem",
                                color: "gray",
                                //  justifySelf:"end"
                                float: "inline-end",
                                position: "relative",
                                bottom: "-11px",
                              }}
                            >
                              10 Min
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeacherAllNotifications;
