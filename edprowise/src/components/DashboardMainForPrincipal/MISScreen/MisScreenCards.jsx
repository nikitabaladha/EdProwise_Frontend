import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "./CircularProgress";

const MisScreenCards = () => {
  const navigate = useNavigate();
    const cardMISInfo = [
      {
        title: "Fees Collection",
        value: "3,50,000",
        percentage: "72",
        session: "Session 2025",
        upDown: 12,
        status: "up",
        textColor: "text-success",
        link: "/principal-dashboard/mis-report/fees-collection-report",
      },

      {
        title: "Balance to Collect",
        value: "1,25,000",
        percentage: "30",
        session: "Total Pending",
        upDown: 6,
        status: "up",
        textColor: "text-success",
        link: "/principal-dashboard/mis-report/balance-to-collect-report",
      },

      {
        title: "Defaulter Report",
        value: "50 Students",
        percentage: "10",
        session: "Pending Dues",
        upDown: 16,
        status: "down",
        textColor: "text-danger",
        link: "/principal-dashboard/mis-report/defaulter-report",
      },

      {
        title: "Concession Report",
        value: "45,000",
        percentage: "20",
        session: "Total Concession Given",
        upDown: 5,
        status: "up",
        textColor: "text-success",
        link: "/principal-dashboard/mis-report/concession-report",
      },

      {
        title: "Loss From Left Student",
        value: "50,000",
        percentage: "10",
        session: "Lost Revenue",
        upDown: 5,
        status: "down",
        textColor: "text-danger",
        link: "/principal-dashboard/mis-report/left-student-report",
      },

      {
        title: "Arrear Fees Received",
        value: "32,000",
        percentage: "72",
        session: "Recovered Arrears",
        upDown: 9,
        status: "up",
        textColor: "text-success",
        link: "/principal-dashboard/mis-report/arrear-fees-receive-report",
      },
    ];

    
  return (
    <div className="container-fluid">
      <div className="row">
        {cardMISInfo.map((mis, index) => (
          <div
            key={index}
            className="col-lg-4 col-md-6"
            onClick={() => {
              navigate(`${mis.link}`);
            }}
          >
            <div className="card overflow-hidden">
              <div className="card-body">
                <div className="row">
                  <div className="col-8 ">
                    <p className="text-muted fw-semibold mb-0 text-truncate">
                      {mis.title}
                    </p> 
                    <h3 className="text-dark mt-1 mb-0">{mis.value}</h3>
                  </div>
                  <div className="col-4 text-end">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      // style={{ width: "70px" }}
                    >
                      <CircularProgress percentage={mis.percentage} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer py-2 bg-light bg-opacity-50">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="align-items-center">
                    <span className={mis.textColor}>
                      <i className={`bx bxs-${mis.status}-arrow fs-12`}></i>
                      {mis.upDown}%
                    </span>
                    <span className="text-muted ms-1 fs-12">{mis.session}</span>
                  </div>
                  <Link className="text-reset fw-semibold fs-12">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MisScreenCards