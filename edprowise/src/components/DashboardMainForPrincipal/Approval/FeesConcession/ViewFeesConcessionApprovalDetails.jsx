import React from 'react'
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const ViewFeesConcessionApprovalDetails = () => {
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
                      View Fee Concession Details
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
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                          Admission Number{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="section"
                          name="section"
                          value="ADM-001"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="studentName" className="form-label">
                          Name of Student <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="studentName"
                          name="studentName"
                          value="Riya Sharm"
                          className="form-control"
                          required
                          placeholder="Enter Student Name"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="className" className="form-label">
                          Class <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="className"
                          name="className"
                          value="6"
                          className="form-control"
                          required
                          placeholder="Enter Class"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="className" className="form-label">
                          Section <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="className"
                          name="className"
                          value="A"
                          className="form-control"
                          required
                          placeholder="Enter Class"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                          Date of Birth <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="section"
                          name="section"
                          value="07-02-2013"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                          Gender <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="section"
                          name="section"
                          value="Female"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Parent Information
                    </h4>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="studentName" className="form-label">
                          Parent Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="studentName"
                          name="studentName"
                          value="Arvind Sharm"
                          className="form-control"
                          required
                          placeholder="Enter Student Name"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="className" className="form-label">
                          Contact Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="className"
                          name="className"
                          value="1234567890"
                          className="form-control"
                          required
                          placeholder="Enter Class"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="section" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="section"
                          name="section"
                          value="arvind@gmail.com"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="section" className="form-label">
                          Occupation <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="section"
                          name="section"
                          value="Shop Owner"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="currentAddress" className="form-label">
                          Current Address <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className={`form-control`}
                          id="currentAddress"
                          name="currentAddress"
                          rows={1}
                          value={"21, green park, Nashik"}
                          // required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Concession Details
                    </h4>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="studentName" className="form-label">
                          Requested Concession{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="studentName"
                          name="studentName"
                          value="25%"
                          className="form-control"
                          required
                          placeholder="Enter Student Name"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="className" className="form-label">
                          Applied Date <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          id="className"
                          name="className"
                          value="06-06-2025"
                          className="form-control"
                          required
                          placeholder="Enter Class"
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="section" className="form-label">
                          Applicable Terms{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="section"
                          name="section"
                          value="Q2 and Q3"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="section" className="form-label">
                          Reason <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="section"
                          name="section"
                          value="Father recently underwent surgery"
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
                          Doctors Certificate{" "}
                          <span className="text-danger">*</span>
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
                        <label htmlFor="className" className="form-label">
                          Latter from Parent{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          id="className"
                          name="className"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="section" className="form-label">
                          Payment Summary <span className="text-danger">*</span>
                        </label>
                        <input
                          type="file"
                          id="section"
                          name="section"
                          className="form-control"
                          required
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

export default ViewFeesConcessionApprovalDetails