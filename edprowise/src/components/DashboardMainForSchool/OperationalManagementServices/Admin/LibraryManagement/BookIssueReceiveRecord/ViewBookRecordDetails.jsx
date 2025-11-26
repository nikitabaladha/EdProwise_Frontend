import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ViewBookRecordDetails = () => {
    const location = useLocation();
        const navigate = useNavigate();
        const issue = location.state;
    
        if (!issue) {
          return <p className="text-center mt-4">No record data provided</p>;
        }

        const formatDate = (dateString) =>
          new Date(dateString).toLocaleDateString("en-GB");

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    View Issue Book Details
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
                      <div className="position-relative">
                        <label htmlFor="admissionNumber" className="form-label">
                          Admission Number
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="admissionNumber"
                          name="admissionNumber"
                          value={issue.admissionNumber}
                          className="form-control pe-5"
                          placeholder="Enter Admission No"
                        />
                      </div>
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
                        value={issue.studentName}
                        className="form-control"
                        required
                        placeholder="Enter Student Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Book Record Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="className"
                        name="className"
                        value={issue.recordNumber}
                        className="form-control"
                        required
                        placeholder="Enter Book Record Number"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        Book Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        value={issue.bookName}
                        placeholder="Enter Book Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Issued Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="dob"
                        name="dob"
                        value={formatDate(issue.issueDate)}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Issued by <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        value={issue.issueBy}
                        placeholder="Enter Issued by Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Received Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="dob"
                        value={formatDate(issue.receivedDate) || "-"}
                        name="dob"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Received by <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        value={issue.receivedBy || "-"}
                        className="form-control"
                        required
                        placeholder="Enter Received by Name"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBookRecordDetails