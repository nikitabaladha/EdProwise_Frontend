import React, { useState } from "react";
import { toast } from "react-toastify";

const CTCUpdate = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [showForm, setShowForm] = useState(false);

  const validateEmployeeId = (id) => {
    return id.trim().length > 0;
  };

  const handleProceed = () => {
    if (validateEmployeeId(employeeId)) {
      setShowForm(true);
    } else {
      toast.error("Please enter a valid Employee ID.");
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
                  <h4 className="payroll-title text-center mb-0">
                    CTC Update
                  </h4>
                </div>
              </div>
              <form>
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
                  <div className={`col-md-2 ${showForm ? 'd-none' : ''}`} style={{ alignContent: "end", textAlign: "center" }}>
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleProceed}
                    >
                      Proceed
                    </button>
                  </div>
                </div>

                {showForm && (
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name of Employee
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={"Umesh Jadhav"}
                          className="form-control"
                          required
                        />
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
                          value={"A"}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="designation" className="form-label">
                          Designation
                        </label>
                        <input
                          type="text"
                          id="designation"
                          name="designation"
                          value={"Teacher"}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="categoryOfEmployees" className="form-label">
                          Category of Employees
                        </label>
                        <input
                          type="text"
                          id="categoryOfEmployees"
                          name="categoryOfEmployees"
                          value={"Teaching Staff"}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table align-middle mb-0 table-hover table-centered text-center">
                        <thead className="bg-light-subtle">
                          <tr className="">
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
                            <th style={{ fontSize: "1.3rem" }}>Components</th>
                            <th style={{ fontSize: "1.3rem" }}>Annual Amounts</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr >
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"

                                />
                                <label
                                  className="form-check-label"

                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>
                              <label htmlFor="basicSalary" className="form-label fw-bold" style={{ fontSize: "1rem" }}>
                                Basic Salary <span className="text-danger">*</span>
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                              <div className="col-md-8" style={{ justifySelf: "center" }}>
                                <input
                                  type="number"
                                  id="basicSalary"
                                  name="basicSalary"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"

                                />
                                <label
                                  className="form-check-label"

                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>
                              <label htmlFor="HRA" className="form-label fw-bold" style={{ fontSize: "1rem" }}>
                                HRA <span className="text-danger">*</span>
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                            <div className="col-md-8" style={{ justifySelf: "center" }}>
                             
                              <input
                                type="number"
                                id="HRA"
                                name="HRA"
                                className="form-control"
                                required
                              />
                              </div>
                            </td>
                          </tr>

                          <tr >
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"

                                />
                                <label
                                  className="form-check-label"

                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>
                              <label htmlFor="pfContribution" className="form-label fw-bold" style={{ fontSize: "1rem" }}>
                                PF Contribution <span className="text-danger">*</span>
                              </label> 
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                            <div className="col-md-8" style={{ justifySelf: "center" }}>
                             
                              <input
                                type="number"
                                id="pfContribution"
                                name="pfContribution"
                                className="form-control"
                                required
                              />
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"

                                />
                                <label
                                  className="form-check-label"

                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>
                              <label htmlFor="totalAnnualGross" className="form-label fw-bold" style={{ fontSize: "1rem" }}>
                                Total Annual Gross <span className="text-danger">*</span>
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                            <div className="col-md-8" style={{ justifySelf: "center" }}>
                             
                              <input
                                type="number"
                                id="totalAnnualGross"
                                name="totalAnnualGross"
                                className="form-control"
                                required
                              />
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"

                                />
                                <label
                                  className="form-check-label"

                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>
                              <label htmlFor="gratuity" className="form-label fw-bold" style={{ fontSize: "1rem" }}>
                                Gratuity <span className="text-danger">*</span>
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                            <div className="col-md-8" style={{ justifySelf: "center" }}>
                             
                              <input
                                type="number"
                                id="gratuity"
                                name="gratuity"
                                className="form-control"
                                required
                              />
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"

                                />
                                <label
                                  className="form-check-label"

                                >
                                  &nbsp;
                                </label>
                              </div>
                            </td>
                            <td>
                              <label htmlFor="annualCostToInstitution" className="form-label fw-bold" style={{ fontSize: "1rem" }}>
                                Annual Cost To Institution <span className="text-danger">*</span>
                              </label>
                              {/* <p>Basic Salary</p> */}
                            </td>
                            <td>
                            <div className="col-md-8" style={{ justifySelf: "center" }}>
                             
                              <input
                                type="number"
                                id="annualCostToInstitution"
                                name="annualCostToInstitution"
                                className="form-control"
                                required
                              />
                              </div>
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                    {/* Add more form fields here */}
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTCUpdate;
