import React, { useState } from 'react'
import { toast } from "react-toastify";

const UpdateEmployeeDetails = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");
  const [reasonForLeaving, setReasonForLeaving] = useState("");
  const [pfCode, setPfCode] = useState("");
  const [esiCode, setEsiCode] = useState("");
  
  const validateEmployeeId = (id) => {
    return id.trim().length > 0;
  };

  const handleReasonChange = (e) => {
    const reason = e.target.value;
    setReasonForLeaving(reason);
  
    // Auto fill PF and ESI based on reason
    const codeMap = {
      "Left Service": { pf: "C", esi: "2" },
      "Retirement": { pf: "R", esi: "3" },
      "Out of Coverage": { pf: "NA", esi: "4" },
      "Death": { pf: "D", esi: "5" },
      "Retrenchment": { pf: "C", esi: "10" },
      "Permanent Disable": { pf: "P", esi: "2" },
    };
  
    if (codeMap[reason]) {
      setPfCode(codeMap[reason].pf);
      setEsiCode(codeMap[reason].esi);
    } else {
      setPfCode("");
      setEsiCode("");
    }
  };
  
  const handleProceed = () => {
    if (validateEmployeeId(employeeId)) {
      setShowForm(true);
    } else {
      toast.error("Please enter a EmployeeID.");
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Employee Details
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="employeeID" className="form-label">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        id="employeeID"
                        name="employeeID"
                        className="form-control"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                        placeholder="Enter Employee ID"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={handleProceed}
                  >
                    Proceed
                  </button>
                </div>
                {showForm && (
                  <>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <div className="mb-6">
                          <label htmlFor="name" className="form-label">
                            Name Of Teacher
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            // value={formData.name}
                            // onChange={handleChange}
                            required
                            placeholder='Name'
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="contactNumber" className="form-label">
                            Contact No
                          </label>
                          <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            className="form-control"
                            // value={formData.contactNumber}
                            // onChange={handleChange}
                            required
                            placeholder='Example : 1234567890'
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="emailId"
                            className="form-label"
                          >
                            Email ID
                          </label>
                          <input
                            type="email"
                            id="emailId"
                            name="emailId"
                            className="form-control"
                            // value={formData.emailId}
                            // onChange={handleChange}
                            required
                            placeholder='Example : xyz@gmail.com'
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="categoryOfEmployees"
                            className="form-label"
                          >
                            Category Of Employees
                          </label>
                          <select
                            id="categoryOfEmployees"
                            name="categoryOfEmployees"
                            className="form-control"
                            // value={formData.categoryOfEmployee}
                            // onChange={handleChange}
                            required

                          >
                            <option value="">Select Employee Category</option>
                            <option value="Teaching Staff">Teaching Staff</option>
                            <option value="Non Teaching Staff">
                              Non Teaching Staff
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="grade" className="form-label">
                            Grade
                          </label>
                          <input
                            type="text"
                            id="grade"
                            name="grade"
                            className="form-control"
                            // value={formData.grade}
                            // onChange={handleChange}
                            required
                            placeholder='Grade'
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="jobDesignation" className="form-label">
                            Job Designation
                          </label>
                          <input
                            type="text"
                            id="jobDesignation"
                            name="jobDesignation"
                            className="form-control"
                            // value={formData.jobDesignation}
                            // onChange={handleChange}
                            required
                            placeholder='Job Designation'
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="joiningDate" className="form-label">
                            Joining Date
                          </label>
                          <input
                            type="date"
                            id="joiningDate"
                            name="joiningDate"
                            className="form-control"
                            // value={formData.joiningDate}
                            // onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="lastWorkingDate" className="form-label">
                            Last Working Date
                          </label>
                          <input
                            type="date"
                            id="lastWorkingDate"
                            name="lastWorkingDate"
                            className="form-control"
                            required
                            placeholder='joiningDate'
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="reasonForLeaving"
                            className="form-label"
                          >
                            Reason For Leaving
                          </label>
                          <select
                            id="reasonForLeaving"
                            name="reasonForLeaving"
                            className="form-control"
                            required

                          >
                            <option value="">Select Reason For Leaving</option>
                            <option value="Left Service">Left Service</option>
                            <option value="Retirement">Retirement</option>
                            <option value="Out of Coverage">Out of Coverage</option>
                            <option value="Death">Death</option>
                            <option value="Retrenchment">Retrenchment</option>
                            <option value="Permanent Disable">Permanent Disable</option>
                          </select>
                        </div>
                      </div> */}

                    </div>
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Status of Employee<span className="text-danger">*</span>
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="status"
                            className="form-label"
                          >
                            Status
                          </label>
                          <select
                            id="status"
                            name="status"
                            className="form-control"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required

                          >
                            <option value="">Select Status</option>
                            <option value="Left">Left</option>
                            <option value="On Payroll">On Payroll</option>
                          </select>
                        </div>
                      </div>

                      {status === "Left" && (
                       <>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="lastWorkingDate" className="form-label">
                            Last Working Date
                          </label>
                          <input
                            type="date"
                            id="lastWorkingDate"
                            name="lastWorkingDate"
                            className="form-control"
                            // value={formData.lastWorkingDate}
                            // onChange={handleChange}
                            required
                            placeholder='joiningDate'
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="reasonForLeaving"
                            className="form-label"
                          >
                            Reason For Leaving
                          </label>
                          <select
                            id="reasonForLeaving"
                            name="reasonForLeaving"
                            className="form-control"
                            value={reasonForLeaving}
                            onChange={handleReasonChange}
                            required

                          >
                            <option value="">Select Reason For Leaving</option>
                            <option value="Left Service">Left Service</option>
                            <option value="Retirement">Retirement</option>
                            <option value="Out of Coverage">Out of Coverage</option>
                            <option value="Death">Death</option>
                            <option value="Retrenchment">Retrenchment</option>
                            <option value="Permanent Disable">Permanent Disable</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="pfCode" className="form-label">
                            PF Code
                          </label>
                          <input
                            type="text"
                            id="pfCode"
                            name="pfCode"
                            className="form-control"
                            value={pfCode}
                            // onChange={handleChange}
                            required
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="eslCode" className="form-label">
                          ESI Code
                          </label>
                          <input
                            type="text"
                            id="eslCode"
                            name="eslCode"
                            className="form-control"
                            value={esiCode}
                            required
                            readOnly
                          />
                        </div>
                      </div>
                      </>
                     )}
                    </div>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                      >
                        Submit
                      </button>
                    </div>

                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateEmployeeDetails