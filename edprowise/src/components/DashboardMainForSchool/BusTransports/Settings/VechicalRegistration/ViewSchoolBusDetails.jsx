import React from 'react'
import { useNavigate } from 'react-router-dom'

const ViewSchoolBusDetails = () => {
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
                     Bus Details
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
                        Vehicle Type <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        required
                        placeholder="Enter Vehicle Type"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Vehicle Registration No
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        placeholder="Enter Vehicle Registration Number"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        No. of Seat <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        placeholder="Enter Number of Seat"
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Standing Capacity <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
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
                        No. of Doors <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        placeholder="Enter Number of Doors"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Year of Manufacture{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        placeholder="Enter Year of Manufacture"
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Chassis Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        placeholder="Enter Chassis Number"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Compliance And Legal
                  </h4>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Registration Certificate{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Registration Validity
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
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
                        Insurance Policy Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        placeholder="Enter Insurance Policy Number"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Insurance Policy Validity{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        placeholder="Enter Standing Capacity"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Pollution Certificate{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        // placeholder="Enter Number of Doors"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Pollution Certificate Validity{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        // placeholder="Enter Year of Manufacture"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Fitness Certificate{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        // placeholder="Enter Chassis Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Fitness Certificate Validity{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        // placeholder="Enter Chassis Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Route Permit <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        // placeholder="Enter Chassis Number"
                      />
                    </div>
                  </div>
                </div>

                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Ownership And Assignment
                  </h4>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Ownership Type <span className="text-danger">*</span>
                      </label>
                      <select className={`form-control`} required>
                        <option value="">Select </option>
                        <option value="School Owned">School Owned</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Owner Name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        placeholder="Enter Vehicle owner Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        Owner Contact Number
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        placeholder="Enter Contact Number"
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="dob" className="form-label">
                        Assign Driver <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="dob"
                        name="dob"
                        // placeholder="Enter Standing Capacity"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Assign Additional staff{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
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
                        Route Allocation <span className="text-danger">*</span>
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

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Bus Shift <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="age"
                        name="age"
                        className="form-control"
                        required
                        // placeholder="Enter Chassis Number"
                      />
                    </div>
                  </div>
                </div>

                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Safety And Equipment
                  </h4>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        CCTV Installed<span className="text-danger">*</span>
                      </label>
                      <select className={`form-control`} required>
                        <option value="">Select </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        GPS Installed<span className="text-danger">*</span>
                      </label>
                      <select className={`form-control`} required>
                        <option value="">Select </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Student Attendance
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        // placeholder="Enter Vehicle owner Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Fire Extinguisher<span className="text-danger">*</span>
                      </label>
                      <select className={`form-control`} required>
                        <option value="">Select </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        First Aid Kit<span className="text-danger">*</span>
                      </label>
                      <select className={`form-control`} required>
                        <option value="">Select </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
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
};

export default ViewSchoolBusDetails;