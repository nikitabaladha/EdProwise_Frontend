import React from 'react'
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const ViewStaffLeaveApprovalDetails = () => {
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
                        View Leave Details
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
                            Employee Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            value="Kavita Rao"
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
                            value="English Teacher"
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
                            value="Humanities"
                            className="form-control"
                            required
                            placeholder="Enter Class"
                          />
                        </div>
                      </div>
                      {/* </div> */}

                      {/* <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Leave Details
                      </h4>
                    </div> */}
                      {/* <div className="row mb-3"> */}
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="studentName" className="form-label">
                            Leave From <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            value="08-06-2025"
                            className="form-control"
                            required
                            placeholder="Enter Student Name"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="className" className="form-label">
                            Leave To <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="className"
                            name="className"
                            value="1006-2025"
                            className="form-control"
                            required
                            placeholder="Enter Class"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="section" className="form-label">
                            Total Days <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="section"
                            name="section"
                            value="3"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="section" className="form-label">
                            Leave Type <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="section"
                            name="section"
                            value="Casual Leave"
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
                            Reason for Leave{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="section"
                            name="section"
                            value="Attending a family function"
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
                            Travel Booking{" "}
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
}

export default ViewStaffLeaveApprovalDetails