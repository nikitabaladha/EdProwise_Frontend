import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";

const UpdateRouteForStudent = () => {
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
                    Update Route For Student
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
                          className="form-control pe-5"
                          placeholder="Enter Admission No"
                        />

                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Student Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        required
                        placeholder="Enter Driver Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Class
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        // placeholder="Enter Vehicle Registration Number"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Section
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        // placeholder="Enter Vehicle Registration Number"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        className={`form-control`}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Father Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="dob"
                        name="dob"
                        placeholder="Enter Father Name"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Parent Contact Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="dob"
                        name="dob"
                        placeholder="Enter Contact Number"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        placeholder="Enter Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Bus Shift<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        // placeholder="Enter Year of Manufacture"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Pick up Location <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        placeholder="Enter Pick up Location"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Drop Location <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        required
                        placeholder="Enter Drop Location"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Update
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

export default UpdateRouteForStudent;
