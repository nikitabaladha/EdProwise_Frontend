import React from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const ViewEmployeeJoiningApprovalDetails = () => {
  const navigate = useNavigate();
        return (
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card m-2">
                  <div className="card-body custom-heading-padding">
                    <div className="container">
                      <div className="card-header mb-2 d-flex flex-wrap align-items-center">
                        <h4 className="card-title flex-grow-1 text-center">
                          View Employee Joining Details
                        </h4>
                        <button
                          type="button"
                          className="btn btn-primary custom-submit-button"
                          onClick={() => navigate(-1)}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                    <form>
                      <div className="row mb-3">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="age" className="form-label">
                              Employee ID <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="section"
                              name="section"
                              value="EMP-001"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">
                              Employee Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="studentName"
                              name="studentName"
                              value="Deepak Singh"
                              className="form-control"
                              required
                              placeholder="Enter Student Name"
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="className" className="form-label">
                              Role <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="className"
                              name="className"
                              value="Physics Teacher"
                              className="form-control"
                              required
                              placeholder="Enter Class"
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="className" className="form-label">
                              Department <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="className"
                              name="className"
                              value="Science"
                              className="form-control"
                              required
                              placeholder="Enter Class"
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">
                              Joining Date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="studentName"
                              name="studentName"
                              value="10-06-2025"
                              className="form-control"
                              required
                              placeholder="Enter Student Name"
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="className" className="form-label">
                              Reporting Manager{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="className"
                              name="className"
                              value="HOD-Science"
                              className="form-control"
                              required
                              placeholder="Enter Class"
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="section" className="form-label">
                              Grade Responsibility{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="section"
                              name="section"
                              value="Class 9 to 12"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="section" className="form-label">
                              Job Type <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="section"
                              name="section"
                              value="Full-time"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label
                              htmlFor="currentAddress"
                              className="form-label"
                            >
                              Probation Period{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              id="section"
                              name="section"
                              value="6 Months"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="card-header mb-2">
                        <h4 className="card-title text-center custom-heading-font">
                          Documents
                        </h4>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">
                              Offer Letter{" "}
                            </label>
                            <input
                              type="file"
                              id="studentName"
                              name="studentName"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">
                              Resume/CV{" "}
                            </label>
                            <input
                              type="file"
                              id="studentName"
                              name="studentName"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="studentName" className="form-label">
                              ID Proof{" "}
                            </label>
                            <input
                              type="file"
                              id="studentName"
                              name="studentName"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-end">
                        {/* <Link className="btn btn-soft-primary btn-sm">
                          <FaCheck className="align-middle fs-18" />
                        </Link>
                        <Link className="btn btn-soft-danger btn-sm">
                          <RxCross1 className="align-middle fs-18" />
                        </Link> */}
                        <button
                          type="button"
                          className="btn btn-primary custom-submit-button me-2"
                        >
                          <FaCheck className="align-middle fs-18" />
                          {/* Approve */}
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger custom-submit-button"
                        >
                          <RxCross1 className="align-middle fs-18" />
                          {/* Reject */}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
};

export default ViewEmployeeJoiningApprovalDetails;
