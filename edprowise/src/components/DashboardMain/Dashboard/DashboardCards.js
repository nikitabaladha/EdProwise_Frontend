import React from "react";

const DashboardCards = () => {
  return (
    <>
      <div className="main-content">
        {" "}
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="h-100">
                  <div className="row mb-3 pb-1">
                    <div className="col-12">
                      <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                          <h4 className="fs-16 mb-1">
                            Hello We Hope You Doing Good ?, User Name !
                          </h4>
                        </div>
                      </div>
                      {/* end card header */}
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                  <div className="row">
                    <div className="col-xl-4 col-md-6">
                      {/* card */}
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                {" "}
                                Total Registration From
                              </p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                {" "}
                                <span
                                  className="counter-value"
                                  data-target={20}
                                >
                                  20
                                </span>{" "}
                              </h4>
                              <a
                                href="registerfromdetails.php"
                                className="text-decoration-underline"
                              >
                                Total Registration From
                              </a>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-success-subtle rounded fs-3">
                                <i
                                  className="mdi mdi-arrow-bottom-left-bold-box"
                                  style={{ color: "#d7b233" }}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* end card body */}
                      </div>
                      {/* end card */}
                    </div>
                    {/* end col */}
                    <div className="col-xl-4 col-md-6">
                      {/* card */}
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                {" "}
                                Today Collection
                              </p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                {" "}
                                <span
                                  className="counter-value"
                                  data-target={200000}
                                >
                                  200,000
                                </span>{" "}
                              </h4>
                              <a
                                href="DailyCollectionReport.php"
                                className="text-decoration-underline"
                              >
                                View Collection
                              </a>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-success-subtle rounded fs-3">
                                <i
                                  className="mdi mdi-arrow-bottom-left-bold-box"
                                  style={{ color: "#d7b233" }}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* end card body */}
                      </div>
                      {/* end card */}
                    </div>
                    {/* end col */}
                    <div className="col-xl-4 col-md-6">
                      {/* card */}
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                {" "}
                                Total Admission
                              </p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                {" "}
                                <span
                                  className="counter-value"
                                  data-target={20}
                                >
                                  20
                                </span>{" "}
                              </h4>
                              <a
                                href="addmissionfromdetails.php"
                                className="text-decoration-underline"
                              >
                                View Total Admission
                              </a>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-success-subtle rounded fs-3">
                                <i
                                  className="mdi mdi-account-music"
                                  style={{ color: "#d7b233" }}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* end card body */}
                      </div>
                      {/* end card */}
                    </div>
                    {/* end col */}
                    <div className="col-xl-4 col-md-6">
                      {/* card */}
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                {" "}
                                Student Master
                              </p>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                {" "}
                                <span
                                  className="counter-value"
                                  data-target={20}
                                >
                                  20
                                </span>{" "}
                              </h4>
                              <a
                                href="StudentsMaster.php"
                                className="text-decoration-underline"
                              >
                                View Student Master
                              </a>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-success-subtle rounded fs-3">
                                <i
                                  className="mdi mdi-account-music"
                                  style={{ color: "#d7b233" }}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* end card body */}
                      </div>
                      {/* end card */}
                    </div>
                    {/* end col */}
                  </div>{" "}
                  {/* end row*/}
                </div>{" "}
                {/* end .h-100*/}
              </div>{" "}
              {/* end col */}
            </div>
          </div>
          {/* container-fluid */}
        </div>
      </div>
    </>
  );
};

export default DashboardCards;
