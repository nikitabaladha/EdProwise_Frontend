import React from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateRegisterBusStaffDetails = () => {
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
                    Update Bus Staff Details
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
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Name of Driver <span className="text-danger">*</span>
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
                        Profile Photo
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
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

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Contact Number <span className="text-danger">*</span>
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
                        Residential Address{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        placeholder="Enter Residential Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Proof for Residential Address
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
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
                        Permanent Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        placeholder="Enter Permanent Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Aadhar Card Number
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Aadhar Card (Upload)
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        // placeholder="Enter Vehicle Registration Number"
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        Driving Licenses <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        placeholder="Enter Driving Licenses"
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Driving Licenses (Upload)
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="dob"
                        name="dob"
                        placeholder="Enter Standing Capacity"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        License Validity Date
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        // placeholder="Enter Number of Doors"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Police Verification Certificate
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        // placeholder="Enter Year of Manufacture"
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

export default UpdateRegisterBusStaffDetails;