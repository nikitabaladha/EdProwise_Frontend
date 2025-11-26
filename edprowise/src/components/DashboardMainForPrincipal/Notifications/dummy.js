import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoNewspaperOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
// import { TiPin } from "react-icons/ti";
import { FaRegCalendarDays } from "react-icons/fa6";

const ViewAllNotifications = () => {
  const navigate = useNavigate();

  // Define styles for each tag
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
      title: "Quote Notification",
      info: "Quote Received from supplier.",
      tag: "Procurement",
    },
    {
      icon: <GiMoneyStack className="fs-36 text-info" />,
      title: "Teachers Training Session",
      info: "A Teachers Training Session will be conducted on 5th September 2025 at 10:00 AM in the School Auditorium.",
      tag: "MIS",
    },
    {
      icon: <GrGroup className="fs-36 text-success" />,
      title: "Approval Required",
      info: "Approval needed for procurement request.",
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
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Notifications
                  </h4>
                </div>
              </div>

              <div className="row">
                {cardData.map((card, index) => {
                  // Find styling for this card’s tag
                  const style = basicData[card.tag] || basicData["Default"];

                  return (
                    <div key={index} className="col-lg-4 col-md-6">
                      <div className={`card border ${style.border}`}>
                        <div className="card-body overflow-hidden position-relative">
                          {/* Tag badge */}
                          <span
                            className="badge text-dark me-2 p-1 mb-2"
                            style={{
                              cursor: "pointer",
                              background: style.tagbg,
                            }}
                          >
                            {card.tag || "Unknown"}
                          </span>

                          {/* Title */}
                          <div>
                            <h5>{card.title}</h5>
                          </div>

                          {/* Info */}
                          <div>{card.info}</div>

                          {/* Footer with actions */}
                          <div className="d-flex flex-wrap justify-content-between align-items-center mt-2">
                            <div className="d-flex gap-2">
                              <Link className="btn btn-light btn-sm">
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link className="btn btn-soft-primary btn-sm">
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

export default ViewAllNotifications;
