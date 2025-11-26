import React, {useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";

const StaffAttendancePrinciple = () => {
    const navigate = useNavigate();
            const [result, setResult] = useState("Present");
        
            const handleResultChange = (e) => {
              setResult(e.target.value);
            };
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
                    Staff Attendance
                  </h4>
                  <FaRegCalendarAlt className="me-2" />

                  <select className="form-select form-select-sm w-auto me-2">
                    <option value="" disabled>
                      Select Department
                    </option>
                    <option value="Active">Science </option>
                    <option value="Inactive">Math </option>
                    <option value="Inactive">Physics </option>
                  </select>

                  <select className="form-select form-select-sm me-2 w-auto">
                    <option>Select </option>
                    <option value="All">All</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="Leave">Leave</option>
                  </select>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="">
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
                      <th className="text-nowrap ">Employee ID </th>
                      <th className="text-nowrap ">Employee Name</th>
                      <th className="text-nowrap">Department</th>
                      <th className="text-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            // id={`check-${index}`}
                          />
                        </div>
                      </td>
                      <td>EMP-001</td>
                      <td>Shama Rao</td>
                      <td>Math</td>
                      <td>Absent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffAttendancePrinciple