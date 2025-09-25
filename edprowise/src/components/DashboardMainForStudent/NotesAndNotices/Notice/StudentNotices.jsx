import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoNewspaperOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { TiPin } from "react-icons/ti";
import { FaRegCalendarDays } from "react-icons/fa6";
const StudentNotices = () => {
  const navigate = useNavigate();

  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(`/student-dashboard/notes-notice/notices/add-notice`);
  };

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(`/student-dashboard/notes-notice/notices/view-notice`);
  };

  const navigateToUpdate = (event) => {
    event.preventDefault();
    navigate(`/student-dashboard/notes-notice/notices/update-notice`);
  };

  const cardData = [
    {
      icon: <IoNewspaperOutline className="fs-36 text-warning" />,
      title: "Independence Day Celebration",
      info: [
        "Inspect projectors, smart boards, and screens for proper functioning.",
        "Verify microphones, speakers, and sound systems are working.",
        "Record any issues and assign them to the maintenance team.",
      ],
      tag: "Student",
    },

    {
      icon: <GiMoneyStack className="fs-36 text-info" />,
      title: "Student Body Meeting Session ",
      info: "A Student Body Meeting  Session will be conducted on 5th September 2025 at 10:00 AM in the School Auditorium. All teachers are requested to attend the session punctually.",
      tag: "Student",
    },

    {
      icon: <GrGroup className="fs-36 text-success" />,
      title: "Mid-sem exam time table ",
      info: "A Teachers Training Session will be conducted on 5th September 2025 at 10:00 AM in the School Auditorium. All teachers are requested to attend the session punctually.",

      tag: "Teacher",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        {/* <Link
          onClick={(event) => navigateToAdd(event)}
          className="btn btn-sm btn-primary"
        >
          Add Notice
        </Link> */}
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container mt-2">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Notices
                  </h4>
                  <FaRegCalendarDays />
                </div>
              </div>

              <div className="row">
                {cardData.map((card, index) => (
                  <div className="col-lg-4 col-md-6">
                    <div className="card border border-dark">
                      <div className="card-body overflow-hidden position-relative">
                        {/* {card.widgetIcon} */}
                        <TiPin className="widget-icon-note" />
                        <div>
                          <h3>{card.title}</h3>
                        </div>
                        <span
                          className="badge text-dark me-2 p-1 mb-2"
                          style={{ cursor: "pointer", background: "#ffbf00" }}
                        >
                          {card.tag || "Unknown"}
                        </span>
                        <div>{card.info}</div>
                        <div className="d-flex flex-wrap justify-content-between align-items-center mt-2">
                          <div className="d-flex gap-2">
                            <Link
                              className="btn btn-light btn-sm"
                              onClick={(event) => navigateToView(event)}
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                            <Link
                              className="btn btn-soft-primary btn-sm"
                              onClick={(event) => navigateToUpdate(event)}
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                            <Link className="btn btn-soft-danger btn-sm">
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                          </div>
                          <span style={{ fontSize: "0.8rem", color: "gray" }}>
                            12-06-2025, 06:31AM
                          </span>
                        </div>
                      </div>{" "}
                    </div>{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentNotices