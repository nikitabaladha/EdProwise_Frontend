import React from 'react'
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
const ViewTransferCertificateApprovalDetails = () => {
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
                      View Transfer Certificate Details
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
                        <label htmlFor="className" className="form-label">
                          Admission Number{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="className"
                          name="className"
                          value="ADM-001"
                          className="form-control"
                          required
                          placeholder="Enter Class"
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
                          value="5"
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

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                          Reason for Transfer{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="section"
                          name="section"
                          value="father transfer"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
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

export default ViewTransferCertificateApprovalDetails