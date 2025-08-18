import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";

const UpdateEmployeeCTCDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState(null);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [ctcComponents, setCtcComponents] = useState([]);
  const [componentAmounts, setComponentAmounts] = useState({});
  const [annualCostToInstitution, setAnnualCostToInstitution] = useState(0);

  useEffect(() => {
    const emp = location.state?.employee;
    const scId = location.state?.schoolId;
    const year = location.state?.academicYear;

    if (emp && scId && year) {
      setEmployeeId(emp.employeeId);
      setEmployeeDetails(emp);
      setSchoolId(scId);
      setAcademicYear(year);
      setShowForm(true);

      const fetchCTCSetup = async () => {
        try {
          const ctcComponentRes = await getAPI(`/getall-payroll-ctc-component/${scId}?academicYear=${year}`);
          if (!ctcComponentRes.hasError && Array.isArray(ctcComponentRes.data?.ctcComponent)) {
            let components = ctcComponentRes.data.ctcComponent;

        // Sort: Basic Salary first, HRA second, then all others
        components = components.sort((a, b) => {
          const priority = { "Basic Salary": 1, "HRA": 2 };
          const aPriority = priority[a.ctcComponentName] || 99;
          const bPriority = priority[b.ctcComponentName] || 99;
          if (aPriority !== bPriority) return aPriority - bPriority;
          return a.ctcComponentName.localeCompare(b.ctcComponentName);
        });
            setCtcComponents(components);
          }
        } catch (err) {
          toast.error("Failed to load CTC components.");
        }
      };

      const fetchExistingCTC = async () => {
        try {
          const existingCTCRes = await getAPI(`/getAll-employee-ctc/${scId}/${year}`);
          if (!existingCTCRes.hasError && Array.isArray(existingCTCRes.data?.data)) {
            const match = existingCTCRes.data.data.find(ctc => ctc.employeeId === emp.employeeId);
            if (match) {
              const amountMap = {};
              match.components.forEach(comp => {
                amountMap[comp.ctcComponentId] = comp.annualAmount;
              });
              setComponentAmounts(amountMap);
              setAnnualCostToInstitution(match.totalAnnualCost || 0);
            }
          }
        } catch (err) {
          toast.error("Failed to load existing CTC data.");
        }
      };

      fetchCTCSetup();
      fetchExistingCTC();
    }
  }, [location.state]);

  const handleComponentAmountChange = (componentId, value) => {
    const updatedAmounts = {
      ...componentAmounts,
      [componentId]: Number(value) || 0,
    };
    setComponentAmounts(updatedAmounts);
    const total = Object.values(updatedAmounts).reduce((acc, val) => acc + val, 0);
    setAnnualCostToInstitution(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedComponents = ctcComponents.map((component) => ({
      ctcComponentId: component._id,
      ctcComponentName: component.ctcComponentName,
      annualAmount: componentAmounts[component._id] || 0,
    }));

    const payload = {
      schoolId,
      employeeId: employeeDetails.employeeId,
      academicYear,
      components: formattedComponents,
      totalAnnualCost: annualCostToInstitution,
    };

    console.log("CTC Submission Payload:", payload);

    try {
      const res = await postAPI("/create-update-employee-ctc", payload, {}, true);
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
console.log("Employee Details",employeeDetails);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="card-header mb-2 d-flex align-items-center">
                <h4 className="card-title flex-grow-1 text-center">Update CTC</h4>
                <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
              </div>
              <form onSubmit={handleSubmit}>
                {employeeDetails && (
                  <>
                    
                    <div className="row m-0 mb-2 pt-2 salary-slip-box">
                      <div className="col-md-8">
                        <p className='text-dark payroll-box-text'>
                          <strong>Employee Name : </strong> {employeeDetails.employeeInfo?.employeeName}
                        </p>

                      </div>

                      <div className="col-md-4">
                        <p className='text-dark payroll-box-text' >
                          <strong>Employee ID : </strong>{employeeDetails.employeeId}
                        </p>
                      </div>

                      <div className="col-md-4">

                        <p className='text-dark payroll-box-text'>
                          <strong>Designation : </strong> {employeeDetails.employeeInfo?.jobDesignation}
                        </p>
                      </div>

                      <div className="col-md-4">
                        <p className='text-dark' >
                          <strong>Category of Employees : </strong> {employeeDetails.employeeInfo?.categoryOfEmployees}
                        </p>
                      </div>

                      <div className="col-md-4">
                        <p className='text-dark payroll-box-text' >
                          <strong> Grade : </strong> {employeeDetails.employeeInfo?.grade}
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
                              <tr key={component._id}>
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
                                {/* <td>{component.ctcComponentName}</td> */}
                                <td>
                                  
                                  <div className="col-md-8" style={{ justifySelf: "center" }}>
                                   
                                    <input
                                      type="number"
                                      className="form-control payroll-table-body payroll-input-border"
                                      required
                                      value={componentAmounts[component._id] || ""}
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
                                <input
                                  type="number"
                                  className="form-control"
                                  value={annualCostToInstitution}
                                  readOnly
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="text-end mt-3">
                      <button type="submit" className="btn btn-primary">Submit</button>
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

export default UpdateEmployeeCTCDetails;
