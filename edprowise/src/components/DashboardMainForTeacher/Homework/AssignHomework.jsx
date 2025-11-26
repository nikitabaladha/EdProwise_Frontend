import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CreatableSelect from "react-select/creatable";
const AssignHomework = () => {
    const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Assign Homework
                  </h4>
                  <button
                    type="button "
                    className="btn btn-primary ms-2 custom-submit-button"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit="">
                <div className="row mt-3"></div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="vendorCode" className="form-label">
                        Class <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        name={`ledger`}
                        placeholder="Select Class"
                        className="email-select "
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-6">
                      <label
                        htmlFor="numberOfDayOnLeave"
                        className="form-label"
                      >
                        Section <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        name={`ledger`}
                        placeholder="Select Section"
                        className="email-select "
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-6">
                      <label
                        htmlFor="numberOfDayOnLeave"
                        className="form-label"
                      >
                        Subject <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" required />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-6">
                      <label
                        htmlFor="numberOfDayOnLeave"
                        className="form-label"
                      >
                        Due Date <span className="text-danger">*</span>
                      </label>
                      <input type="date" className="form-control" required />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-6">
                      <label
                        htmlFor="numberOfDayOnLeave"
                        className="form-label"
                      >
                        Title <span className="text-danger">*</span>
                      </label>
                      <input type="text" className="form-control" required />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-6">
                      <label
                        htmlFor="numberOfDayOnLeave"
                        className="form-label "
                      >
                        Homework File
                      </label>
                      <div className="d-flex ">
                        <input
                          type="file"
                          className="form-control me-2"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="vendorCode" className="form-label">
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        type="text"
                        rows={4}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
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

export default AssignHomework