import React from 'react'
import { Link } from 'react-router-dom'
const ApplyForLeave = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Apply For Leave
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit="">
                                <div className="row mb-3">
                                <div className="col-md-6">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="leaveFor"
                                                className="form-label"
                                            >
                                                Select Leave
                                            </label>
                                            <select
                                                id="leaveFor"
                                                name="leaveFor"
                                                className="form-control"
                                                required

                                            >
                                                <option value="">Select Leave</option>
                                                <option value="Non-Casual Leave">Non-Casual Leave</option>
                                                <option value="Casual Leave">
                                                Casual Leave
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-6">
                                            <label htmlFor="leaveReason" className="form-label">
                                                Reason For Leave
                                            </label>
                                            <input
                                                type="text"
                                                id="leaveReason"
                                                name="leaveReason"
                                                className="form-control"
                                                required
                                                placeholder='Write Leave Reason'
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="leaveStartDate" className="form-label">
                                                Date From
                                            </label>
                                            <input
                                                type="date"
                                                id="leaveStartDate"
                                                name="leaveStartDate"
                                                className="form-control"
                                                // value={formData.leaveStartDate}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="leaveEndDate" className="form-label">
                                                Date To
                                            </label>
                                            <input
                                                type="date"
                                                id="leaveEndDate"
                                                name="leaveEndDate"
                                                className="form-control"
                                                // value={formData.leaveEndDate}
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
                        <div className="card-body">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                    Leave Details    
                                    </h4>
                                </div>
                            </div>
                            {/* <form onSubmit="">
                                <div className="row mb-3">
                                <div className="col-md-6">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="leaveFor"
                                                className="form-label"
                                            >
                                                Select Leave
                                            </label>
                                            <select
                                                id="leaveFor"
                                                name="leaveFor"
                                                className="form-control"
                                                required

                                            >
                                                <option value="">Select Leave</option>
                                                <option value="Non-Casual Leave">Non-Casual Leave</option>
                                                <option value="Casual Leave">
                                                Casual Leave
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-6">
                                            <label htmlFor="leaveReason" className="form-label">
                                                Reason For Leave
                                            </label>
                                            <input
                                                type="text"
                                                id="leaveReason"
                                                name="leaveReason"
                                                className="form-control"
                                                required
                                                placeholder='Write Leave Reason'
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="leaveStartDate" className="form-label">
                                                Date From
                                            </label>
                                            <input
                                                type="date"
                                                id="leaveStartDate"
                                                name="leaveStartDate"
                                                className="form-control"
                                                // value={formData.leaveStartDate}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="leaveEndDate" className="form-label">
                                                Date To
                                            </label>
                                            <input
                                                type="date"
                                                id="leaveEndDate"
                                                name="leaveEndDate"
                                                className="form-control"
                                                // value={formData.leaveEndDate}
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
                            </form> */}
                            <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th style={{ width: 20 }}>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            />
                          </div>
                        </th>
                        <th>Type of Leave</th>
                        <th>Leave Days</th>
                        <th>Utilized</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={"customCheck"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={"customCheck"}
                            >
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>Festival</td>
                        <td>Monday</td>
                        <td>
                          Yes
                        </td>
                        <td>
                        5
                        </td>

                      </tr>
                    </tbody>
                  </table>
                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyForLeave