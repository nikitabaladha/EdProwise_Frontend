import React from 'react'
import { Link } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

const ViewStudentLeaveDetails = () => {
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
                    View Leave Details
                  </h4>
                </div>
              </div>
              <form>
                <div className="row ">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="leaveReason" className="form-label">
                        Student Name <span className="text-danger">*</span>
                      </label> 
                      <input
                        type="text"
                        name="leaveReason"
                        className="form-control"
                        // value={formData.leaveReason}
                        // onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="leaveReason" className="form-label">
                        Roll No <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="leaveReason"
                        className="form-control"
                        // value={formData.leaveReason}
                        // onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="leaveReason" className="form-label">
                        Class <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="leaveReason"
                        className="form-control"
                        // value={formData.leaveReason}
                        // onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="leaveReason" className="form-label">
                        Section <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="leaveReason"
                        className="form-control"
                        // value={formData.leaveReason}
                        // onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="leaveType" className="form-label">
                        Select Leave <span className="text-danger">*</span>
                      </label>
                      <select
                        name="leaveType"
                        className="form-control"
                        // value={formData.leaveType}
                        // onChange={handleInputChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Sick Leave">Sick Leave</option>
                        {/* {leaveTypes.map((type) => (
                          <option
                            key={type._id}
                            value={type.annualLeaveTypeName}
                          >
                            {type.annualLeaveTypeName}
                          </option>
                        ))} */}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="leaveReason" className="form-label">
                        Reason for Leave <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="leaveReason"
                        className="form-control"
                        // value={formData.leaveReason}
                        // onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="leaveReason" className="form-label">
                        Upload File
                      </label>
                      <input
                        type="file"
                        name="leaveReason"
                        className="form-control"
                        // value={formData.leaveReason}
                        // onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="fromDate" className="form-label">
                        Date From <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        name="fromDate"
                        className="form-control"
                        // value={formData.fromDate}
                        // onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="toDate" className="form-label">
                        Date To <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        name="toDate"
                        className="form-control"
                        // value={formData.toDate}
                        // onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="numberOfDays" className="form-label">
                        Number of Leave Days{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="numberOfDays"
                        className="form-control"
                        // value={formData.numberOfDays}
                        
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  

                  <Link className="btn btn-soft-primary me-2 btn-sm">
                                              <FaCheck className="align-middle fs-18" />
                                            </Link>
                  
                                            <Link className="btn btn-soft-danger btn-sm">
                                              <RxCross2 className="align-middle fs-18" />
                                            </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStudentLeaveDetails