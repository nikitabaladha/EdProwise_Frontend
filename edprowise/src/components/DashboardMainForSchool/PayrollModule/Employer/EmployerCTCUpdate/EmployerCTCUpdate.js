import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from 'react-router-dom';
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI"
const EmployerCTCUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [schoolId, setSchoolId] = useState(location.state?.schoolId || null);
  const [academicYear, setAcademicYear] = useState(location.state?.academicYear || null);
  const [employeeId, setEmployeeId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [ctcComponents, setCtcComponents] = useState([]);
  const [componentAmounts, setComponentAmounts] = useState({});
  const [annualCostToInstitution, setAnnualCostToInstitution] = useState(0);


  useEffect(() => {
          const userDetails = JSON.parse(localStorage.getItem("userDetails"));
          const id = userDetails?.schoolId;
          if (!id) {
              toast.error("School ID not found. Please log in again.");
              return;
          }
          setSchoolId(id);
      }, []);
  const handleProceed = async () => {
    if (!employeeId.trim()) {
      toast.warning("Please enter a valid Employee ID.");
      return;
    }

    try {
      const response = await getAPI(`/get-employee-self-details/${schoolId}/${employeeId}`);
      if (!response.hasError && response.data?.data) {
        setEmployeeDetails(response.data.data);
        setShowForm(true);
        const ctcRes = await getAPI(`/getall-payroll-ctc-component/${schoolId}`);
        if (!ctcRes.hasError && Array.isArray(ctcRes.data?.ctcComponent)) {
          setCtcComponents(ctcRes.data.ctcComponent);
        } else {
          toast.error("CTC component data not found.");
        }
      } else {
        setShowForm(false);
        toast.error("No employee data found.");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error occurred.");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!employeeDetails || !schoolId || ctcComponents.length === 0) {
    toast.error("Incomplete form data. Please fill all required fields.");
    return;
  }

  const formattedComponents = ctcComponents.map((component) => ({
    ctcComponentId: component._id,
    ctcComponentName: component.ctcComponentName,
    annualAmount: componentAmounts[component._id] || 0,
  }));

  try {
    const payload = {
      schoolId,
      employeeId: employeeDetails.employeeId,
      academicYear: academicYear,
      components: formattedComponents,
      totalAnnualCost: annualCostToInstitution,
    };
    console.log(payload);
    

    const res = await postAPI("/create-update-employee-ctc", payload,{},true);
    console.log(res);
    
    if (!res.hasError) {
      toast.success("CTC updated successfully.");
      navigate(-1);
    } else {
      toast.error(res.message || "Something went wrong.");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Submission failed.");
  }
};


  const handleComponentAmountChange = (componentId, value) => {
    const updatedAmounts = {
      ...componentAmounts,
      [componentId]: Number(value) || 0
    };
    setComponentAmounts(updatedAmounts);

    const total = Object.values(updatedAmounts).reduce((acc, val) => acc + val, 0);
    setAnnualCostToInstitution(total);
  };

  
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    CTC Define
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
              <form >
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
                        disabled={showForm}
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
                  <>
                    <div className="row m-0 mb-2 pt-2 salary-slip-box">
                      <div className="col-md-8">
                        <p className='text-dark payroll-box-text'>
                          <strong>Employee Name : </strong> {employeeDetails.employeeName}
                        </p>

                      </div>

                      <div className="col-md-4">
                        <p className='text-dark payroll-box-text' >
                          <strong>Employee ID : </strong>{employeeDetails.employeeId}
                        </p>
                      </div>

                      <div className="col-md-4">

                        <p className='text-dark payroll-box-text'>
                          <strong>Designation : </strong> {employeeDetails.jobDesignation}
                        </p>
                      </div>

                      <div className="col-md-4">
                        <p className='text-dark' >
                          <strong>Category of Employees : </strong> {employeeDetails.categoryOfEmployees}
                        </p>
                      </div>

                      <div className="col-md-4">
                        <p className='text-dark payroll-box-text' >
                          <strong> Grade : </strong> {employeeDetails.grade}
                        </p>
                      </div>
                    </div>
                     
                    <div className="row mt-3">
                      <div className="table-responsive px-lg-6 px-md-5">
                        <table className="table align-middle mb-0 table-hover table-centered text-center">
                          <thead className="bg-light-subtle">
                            <tr className="payroll-table-header">
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
                              <th>Components</th>
                              <th>Annual Amounts</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ctcComponents.map((component, index) => (
                              <tr key={component._id} className="payroll-table-body">
                                <td>
                                  <div className="form-check ms-1">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id={`ctcCheck-${index}`}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <label htmlFor={`ctcComponent-${index}`} className="form-label fw-bold">
                                    {component.ctcComponentName} <span className="text-danger">*</span>
                                  </label>
                                </td>
                                <td>
                                  <div className="col-md-8" style={{ justifySelf: "center" }}>
                                    <input
                                      type="number"
                                      id={`ctcComponent-${index}`}
                                      name={`ctcComponent-${index}`}
                                      className="form-control payroll-table-body payroll-input-border"
                                      required
                                      onChange={(e) => handleComponentAmountChange(component._id, e.target.value)}
                                    />
                                  </div>
                                </td>
                              </tr>
                            ))}
                            <tr className='payroll-table-body'>
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
                                <label htmlFor="annualCostToInstitution" className="form-label payroll-table-body fw-bold" >
                                  Annual Cost To Institution <span className="text-danger">*</span>
                                </label>
                                {/* <p>Basic Salary</p> */}
                              </td>
                              <td>
                                <div className="col-md-8" style={{ justifySelf: "center" }}>

                                  <input
                                    type="number"
                                    className="form-control payroll-table-body payroll-input-border fw-bold"
                                    value={annualCostToInstitution}
                                    readOnly
                                  />
                                </div>
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                      {/* Add more form fields here */}

                    </div>
                    <div className="card-footer border-top">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end mb-0">
                          <li className="page-item">
                            <button
                              className="page-link"
                            // onClick={handlePreviousPage}
                            // disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                          </li>
                          <li
                            className={`page-item`}
                          >
                            <button
                              className={`page-link pagination-button `}
                            //   onClick={() => handlePageClick(page)}
                            >
                              1
                            </button>
                          </li>

                          <li className="page-item">
                            <button
                              className="page-link"
                            // onClick={handleNextPage}
                            // disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                        onClick={handleSubmit}
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
  );
};

export default EmployerCTCUpdate;
