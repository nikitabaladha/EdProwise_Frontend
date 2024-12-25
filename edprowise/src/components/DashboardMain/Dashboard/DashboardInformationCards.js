import React from "react";
import { TbRadioactiveFilled } from "react-icons/tb";
import { PiStudentDuotone } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { BiSolidSchool } from "react-icons/bi";
const DashboardInformationCards = () => {
  return (
    <>
      <div className="col-xxl-12">
        <div className="row">
          <div className="col-md-3">
            <div className="card overflow-hidden">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="avatar-md bg-soft-primary rounded">
                      <div className="avatar-md bg-soft-primary rounded">
                        <BiSolidSchool className="avatar-title fs-32 text-primary" />
                      </div>
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-6 text-end">
                    <p className="text-muted mb-0 text-truncate">
                      Total Schools
                    </p>
                    <h4 className="text-dark mt-1 mb-0">100</h4>
                  </div>{" "}
                  {/* end col */}
                </div>{" "}
                {/* end row*/}
              </div>{" "}
              {/* end card body */}
              <div className="card-footer py-2 bg-light bg-opacity-50">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-success">
                      {" "}
                      <i className="bx bxs-up-arrow fs-12" /> 2.3%
                    </span>
                    <span className="text-muted ms-1 fs-12">Last Week</span>
                  </div>
                  <a href="#!" className="text-reset fw-semibold fs-12">
                    View More
                  </a>
                </div>
              </div>{" "}
              {/* end card body */}
            </div>{" "}
            {/* end card */}
          </div>{" "}
          <div className="col-md-3">
            <div className="card overflow-hidden">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="avatar-md bg-soft-primary rounded">
                      <TbRadioactiveFilled className="avatar-title fs-32 text-primary" />
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-6 text-end">
                    <p className="text-muted mb-0 text-truncate">
                      Active Schools
                    </p>
                    <h4 className="text-dark mt-1 mb-0">₹40,000,0</h4>
                  </div>{" "}
                  {/* end col */}
                </div>{" "}
                {/* end row*/}
              </div>{" "}
              {/* end card body */}
              <div className="card-footer py-2 bg-light bg-opacity-50">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-danger">
                      {" "}
                      <i className="bx bxs-down-arrow fs-12" /> 10.6%
                    </span>
                    <span className="text-muted ms-1 fs-12">Last Month</span>
                  </div>
                  <a href="#!" className="text-reset fw-semibold fs-12">
                    View More
                  </a>
                </div>
              </div>{" "}
              {/* end card body */}
            </div>{" "}
            {/* end card */}
          </div>{" "}
          <div className="col-md-3">
            <div className="card overflow-hidden">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="avatar-md bg-soft-primary rounded">
                      <PiStudentDuotone className="bx bx-award avatar-title fs-24 text-primary" />
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-6 text-end">
                    <p className="text-muted mb-0 text-truncate">
                      Total Students
                    </p>
                    <h4 className="text-dark mt-1 mb-0">9, 526</h4>
                  </div>{" "}
                  {/* end col */}
                </div>{" "}
                {/* end row*/}
              </div>{" "}
              {/* end card body */}
              <div className="card-footer py-2 bg-light bg-opacity-50">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-success">
                      {" "}
                      <i className="bx bxs-up-arrow fs-12" /> 8.1%
                    </span>
                    <span className="text-muted ms-1 fs-12">Last Month</span>
                  </div>
                  <a href="#!" className="text-reset fw-semibold fs-12">
                    View More
                  </a>
                </div>
              </div>{" "}
              {/* end card body */}
            </div>{" "}
            {/* end card */}
          </div>{" "}
          <div className="col-md-3">
            <div className="card overflow-hidden">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="avatar-md bg-soft-primary rounded">
                      <GiMoneyStack className="bx bxs-backpack avatar-title fs-24 text-primary" />
                    </div>
                  </div>{" "}
                  {/* end col */}
                  <div className="col-6 text-end">
                    <p className="text-muted mb-0 text-truncate">Revenue</p>
                    <h4 className="text-dark mt-1 mb-0">₹20,00,000</h4>
                  </div>{" "}
                  {/* end col */}
                </div>{" "}
                {/* end row*/}
              </div>{" "}
              {/* end card body */}
              <div className="card-footer py-2 bg-light bg-opacity-50">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="text-danger">
                      {" "}
                      <i className="bx bxs-down-arrow fs-12" /> 0.3%
                    </span>
                    <span className="text-muted ms-1 fs-12">Last Month</span>
                  </div>
                  <a href="#!" className="text-reset fw-semibold fs-12">
                    View More
                  </a>
                </div>
              </div>{" "}
              {/* end card body */}
            </div>{" "}
            {/* end card */}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default DashboardInformationCards;