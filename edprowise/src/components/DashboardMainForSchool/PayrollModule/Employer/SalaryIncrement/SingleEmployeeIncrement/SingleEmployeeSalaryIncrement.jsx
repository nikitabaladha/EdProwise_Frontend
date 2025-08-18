import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from 'react-router-dom';
import getAPI from "../../../../../../api/getAPI";
import postAPI from "../../../../../../api/postAPI";
  
const SingleEmployeeSalaryIncrement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [schoolId, setSchoolId] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [ctcComponents, setCtcComponents] = useState([]);
  const [componentAmounts, setComponentAmounts] = useState({});
  const [annualCostToInstitution, setAnnualCostToInstitution] = useState(0);
  const [incrementPercentage, setIncrementPercentage] = useState("");
  const [applicableDate, setApplicableDate] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    const academicYear = localStorage.getItem("selectedAcademicYear");
    setAcademicYear(academicYear);
    setSchoolId(id);
  }, []);

  const handleProceed = async () => {
    if (!employeeId.trim()) {
      toast.warning("Please enter a valid Employee ID.");
      return;
    }
    try {
      const response = await getAPI(`/get-employee-ctc-details/${schoolId}/${employeeId}/${academicYear}`);
      if (!response.hasError && response.data?.data) {
        setEmployeeDetails(response.data.data);
        setShowForm(true);

        const ctcRes = await getAPI(`/getall-payroll-ctc-component/${schoolId}?academicYear=${academicYear}`);
        if (!ctcRes.hasError && Array.isArray(ctcRes.data?.ctcComponent)) {
          setCtcComponents(ctcRes.data.ctcComponent);
          const initialAmounts = {};
          response.data.data.components.forEach((comp) => {
            initialAmounts[comp.ctcComponentId] = parseFloat(comp.annualAmount.toFixed(2));
          });
          setComponentAmounts(initialAmounts);
          setAnnualCostToInstitution(parseFloat(response.data.data.totalAnnualCost.toFixed(2)));
        } else {
          toast.error("CTC component data not found.");
        }
      } else {
        setShowForm(false);
        toast.error("No employee CTC data found.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred.");
    }
  };

  const handleIncrementChange = (e) => {
    const percentage = Number(e.target.value) || 0;
    setIncrementPercentage(percentage);

    const updatedAmounts = {};
    ctcComponents.forEach((component) => {
      const oldComponent = employeeDetails.components.find(
        (c) => c.ctcComponentId === component._id
      );
      const oldAmount = oldComponent ? oldComponent.annualAmount : 0;
      const newAmount = oldAmount * (1 + percentage / 100);
      updatedAmounts[component._id] = parseFloat(newAmount.toFixed(2));
    });
    setComponentAmounts(updatedAmounts);

    const total = Object.values(updatedAmounts).reduce((acc, val) => acc + val, 0);
    setAnnualCostToInstitution(parseFloat(total.toFixed(2)));
  };

  const handleComponentAmountChange = (componentId, value) => {
    const newAmount = Number(value) || 0;
    const updatedAmounts = {
      ...componentAmounts,
      [componentId]: parseFloat(newAmount.toFixed(2)),
    };
    setComponentAmounts(updatedAmounts);

    const total = Object.values(updatedAmounts).reduce((acc, val) => acc + val, 0);
    setAnnualCostToInstitution(parseFloat(total.toFixed(2)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeDetails || !schoolId || ctcComponents.length === 0 || !applicableDate) {
      toast.error("Incomplete form data. Please fill all required fields, including applicable date.");
      return;
    }

    const formattedComponents = ctcComponents.map((component) => ({
      ctcComponentId: component._id,
      ctcComponentName: component.ctcComponentName,
      annualAmount: componentAmounts[component._id] || 0,
      applicableDate: new Date(applicableDate),
    }));

    try {
      const payload = {
        schoolId,
        employeeId: employeeDetails.employeeId,
        academicYear,
        components: formattedComponents,
        totalAnnualCost: annualCostToInstitution,
        applicableDate: new Date(applicableDate),
      };

      const res = await postAPI("/increment-employee-ctc", payload, {}, true);

      if (!res.hasError) {
        toast.success("Increment submitted successfully for approval.");
        navigate(-1);
      } else {
        toast.error(res.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Submission failed.");
    }
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
                    Single Employee Increment
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-3">
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
                  <div className={`mt-4 col-md-2 ${showForm ? 'd-none' : ''}`} >
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
                          <strong>Employee Name: </strong> {employeeDetails.employeeInfo?.employeeName}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className='text-dark payroll-box-text'>
                          <strong>Employee ID: </strong>{employeeDetails.employeeId}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className='text-dark payroll-box-text'>
                          <strong>Designation: </strong> {employeeDetails.employeeInfo?.jobDesignation}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className='text-dark payroll-box-text'>
                          <strong>Category of Employees: </strong> {employeeDetails.employeeInfo?.categoryOfEmployees}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className='text-dark payroll-box-text'>
                          <strong>Grade: </strong> {employeeDetails.employeeInfo?.grade}
                        </p>
                      </div>
                    </div>
                    <div className="row mb-2 mt-4">
                      <h6 className="card-title custom-heading-font">
                        Enter Increment Details:
                      </h6>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="incrementPercentage" className="form-label">
                            Increment %
                          </label>
                          <input
                            type="number"
                            id="incrementPercentage"
                            name="incrementPercentage"
                            className="form-control"
                            value={incrementPercentage}
                            onChange={handleIncrementChange}
                            placeholder="Enter Increment Percentage"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="applicableFromDate" className="form-label">
                            Applicable From
                          </label>
                          <input
                            type="date"
                            id="applicableFromDate"
                            name="applicableFromDate"
                            className="form-control"
                            value={applicableDate}
                            onChange={(e) => setApplicableDate(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive px-lg-5 mb-4">
                      <table className="table text-dark border border-dark mb-4">
                        <thead>
                          <tr className="payroll-table-header">
                            <th className="text-center w-50 align-content-center p-2 border border-dark">
                              Components
                            </th>
                            <th className="text-center w-25 align-content-center p-2 border border-dark">
                              Old Amount
                            </th>
                            <th className="text-center w-25 align-content-center p-2 border border-dark">
                              Revised Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {ctcComponents.map((component, index) => {
                            const oldComponent = employeeDetails.components.find(
                              (c) => c.ctcComponentId === component._id
                            );
                            return (
                              <tr key={component._id} className="payroll-table-body">
                                <td className="align-content-center p-2 border border-dark">
                                  {component.ctcComponentName || ""}
                                </td>
                                <td className="text-end align-content-center p-2 border border-dark">
                                  {oldComponent ? oldComponent.annualAmount.toFixed(2) : "-"}
                                </td>
                                <td className="text-end align-content-center p-2 border border-dark">
                                  <input
                                    type="number"
                                    id={`ctcComponent-${index}`}
                                    name={`ctcComponent-${index}`}
                                    className="form-control payroll-table-body payroll-input-border text-end"
                                    value={componentAmounts[component._id] || ""}
                                    onChange={(e) => handleComponentAmountChange(component._id, e.target.value)}
                                    required
                                    step="0.01"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                          <tr className="payroll-table-body it-declaration-section-bg">
                            <td className="align-content-center fw-bold p-2 border border-dark">
                              Annual Cost To Institution
                            </td>
                            <td className="text-end align-content-center fw-bold p-2 border border-dark">
                              {employeeDetails.totalAnnualCost ? employeeDetails.totalAnnualCost.toFixed(2) : "-"}
                            </td>
                            <td className="text-end align-content-center fw-bold p-2 border border-dark">
                              <input
                                type="number"
                                id="annualCostToInstitution"
                                name="annualCostToInstitution"
                                className="form-control payroll-table-body text-end payroll-input-border"
                                value={annualCostToInstitution}
                                readOnly
                                step="0.01"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                      >
                        Submit for Principal Approval
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

export default SingleEmployeeSalaryIncrement;