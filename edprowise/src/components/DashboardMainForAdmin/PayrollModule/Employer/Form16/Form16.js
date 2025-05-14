import React from "react";

const Form16 = () => {
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Form 16
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <p>
                  Those employee whose tax has been deducted, Their name should
                  appear here.
                </p>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
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
                        <th>Employee ID</th>
                        <th>Name of Employee</th>
                        <th>Upload Documents</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ width: 20 }}>
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
                        </td>
                        <td>Emp-0001</td>
                        <td>Kunal Shah</td>
                        <td>
                        <div className="col-md-8" style={{justifySelf:"center"}}>
                          <input
                            type="file"
                            id="documentFile"
                            name="documentFile"
                            className="form-control"
                            accept="image/*,application/pdf"
                          />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* <div className="d-flex justify-content-end mt-3"> */}
                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
                  </button>
                </div>
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
     <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card m-2">
                            <div className="card-body">
                                <div className="container">
                                    <div className="card-header mb-2">
                                        <h4 className="payroll-title mb-0 text-center">
                                            Resignation Approval
                                        </h4>
                                    </div>
                                </div>
                                <form onSubmit="">
                                    <div className="row mb-3 ">
                                        {/* <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor=" reasonOfLeaving by Employee" className="form-label">
                                                    Reason of Leaving by Employee
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="form-control"
                                                    value={"Family reason"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div> */}
                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Employee Remarks
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={""}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="noticePeriodAsPolicy" className="form-label">
                                                    Notice Period as per policy
                                                </label>
                                                <input
                                                    type="text"
                                                    id="noticePeriodAsPolicy"
                                                    name="noticePeriodAsPolicy"
                                                    className="form-control"
                                                    value={"90"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Notice Period as per policy
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={"90"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Earned Leave Balance
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={"10.5"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Applicable Notice Period (Notice period-leave balance)
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={"79.5"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    LWD as per system
                                                </label>
                                                <input
                                                    type="date"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={"18-06-2025"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Final LWD
                                                </label>
                                                <input
                                                    type="date"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={"16-06-2025"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Unserved Notice Period (In Days)
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={"33"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Action to be taken for unserved notice period (In Days) <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    id="categoryOfEmployees"
                                                    name="categoryOfEmployees"
                                                    className="form-control"
                                                    value={"Waive off"}
                                                    // onChange={handleChange}
                                                    required

                                                >
                                                    <option value="">Select</option>
                                                    <option value="Teaching Staff">Waive off</option>
                                                    <option value="Non Teaching Staff">

                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Resignation Type <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    id="categoryOfEmployees"
                                                    name="categoryOfEmployees"
                                                    className="form-control"
                                                    value={"Voluntary"}
                                                    // onChange={handleChange}
                                                    required

                                                >
                                                    <option value="">Select</option>
                                                    <option value="Teaching Staff">Voluntary</option>
                                                    <option value="Non Teaching Staff">

                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Waiving off Remark By Principal <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={"Will complete allocated assignment"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Reason for leaving by Principal <span className="text-danger">*</span>
                                                </label>
                                                <CreatableSelect
                                                    options={reasonForLeaving}
                                                    placeholder="Select Reason for Leaving"
                                                    isSearchable
                                                    classNamePrefix="react-select"
                                                    className="custom-react-select"
                                                />
                                            </div>
                                        </div> */}

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Do you want to retain the employee <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    id="categoryOfEmployees"
                                                    name="categoryOfEmployees"
                                                    className="form-control"
                                                    value={"Voluntary"}
                                                    // onChange={handleChange}
                                                    required

                                                >
                                                    <option value="">Select</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Principal Remark (if any)
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={""}
                                                    // onChange={handleChange}
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
                                            Accept Registartion
                                        </button>
                                    </div>
                                </form>

                                <form onSubmit="">
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="name" className="form-label">
                                                    Reason of Leaving by Employee
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="form-control"
                                                    value={"Family reason"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Employee Remarks
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={""}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Notice Period as per policy
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={"90"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-6">
                                                <label htmlFor="employeeID" className="form-label">
                                                    Notice Period as per policy
                                                </label>
                                                <input
                                                    type="text"
                                                    id="employeeID"
                                                    name="employeeID"
                                                    className="form-control"
                                                    value={"90"}
                                                    // onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>



                                        <div className="col-md-4">
                                            <div className="mb-6">
                                                <label htmlFor="numberOfDayOnLeave" className="form-label">
                                                    Number of Leave Days <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="numberOfDayOnLeave"
                                                    name="numberOfDayOnLeave"
                                                    className="form-control"
                                                    required
                                                    placeholder='Enter Number of Leave Days'
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
    </>
  );
};

export default Form16;
