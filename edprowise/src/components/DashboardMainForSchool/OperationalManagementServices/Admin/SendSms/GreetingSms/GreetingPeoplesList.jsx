import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const GreetingPeoplesList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
    
  const [role, setRole] = useState("Student");
  
 useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  const navigateToTemplates = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/send-sms/greeting-sms/templates`,
      { state: { schoolId, academicYear, role } }
    );
  };
  
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link
          onClick={(event) => navigateToTemplates(event)}
          className="btn btn-sm btn-primary"
        >
          Templates
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Greeting Peoples List
                  </h4>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option value="Student">Student </option>
                    <option value="Employee">Employee </option>
                  </select>
                </div>
              </div>

              {role === "Student" ? (
                <div className="table-responsive">
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
                        <th className="text-nowrap">Adm.No </th>
                        <th className="text-nowrap">Name</th>
                        <th className="text-nowrap">Class</th>
                        <th className="text-nowrap">Section</th>
                        <th className="text-nowrap">Date of Birth</th>
                        <th className="text-nowrap">Age</th>
                        <th className="text-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              // id={`check-${index}`}
                            />
                          </div>
                        </td>
                        <td>Emp-001</td>
                        <td>Kunal Shah</td>
                        <td>1</td>
                        <td>A</td>
                        <td>15/10/1999</td>
                        <td>20</td>
                        <td>Send SMS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="table-responsive">
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
                        <th className="text-nowrap">Employee Id </th>
                        <th className="text-nowrap">Name</th>
                        <th className="text-nowrap">Designation</th>
                        <th className="text-nowrap">Date of Birth</th>
                        <th className="text-nowrap">Age</th>
                        <th className="text-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              // id={`check-${index}`}
                            />
                          </div>
                        </td>
                        <td>Emp-001</td>
                        <td>Kunal Shah</td>
                        <td>Teacher</td>
                        <td>15/10/1999</td>
                        <td>20</td>
                        <td>Send SMS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingPeoplesList;

