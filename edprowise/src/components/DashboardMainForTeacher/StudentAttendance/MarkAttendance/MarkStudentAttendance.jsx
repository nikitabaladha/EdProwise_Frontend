import React, {useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
const MarkStudentAttendance = () => {
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
                    Mark Student Attendance
                  </h4>
                  <FaRegCalendarAlt className="me-2" />
                  <select className="form-select form-select-sm me-2 w-auto">
                    <option>Select Class</option>
                    <option value="1">1 </option>
                    <option value="2">2 </option>
                  </select>

                  <select className="form-select form-select-sm me-2 w-auto">
                    <option>Select Section</option>
                    <option value="A">A </option>
                    <option value="B">B </option>
                  </select>

                  <select className="form-select form-select-sm w-auto">
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Active">Active </option>
                    <option value="Inactive">Inactive </option>
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
                      <th className="text-nowrap">Roll No</th>
                      <th className="text-nowrap">Name</th>
                      <th className="text-nowrap ">Class</th>
                      <th className="text-nowrap">Section</th>
                      <th className="text-nowrap">Status</th>
                      <th className="text-nowrap">Action</th>
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
                      <td>1</td>
                      <td>Kunal Shah</td>
                      <td>1</td>
                      <td>A</td>
                      <td>{result}</td>
                      <td>
                        <div style={{display:"inline-block"}}>
                          <select
                            className="form-control"
                            value={result}
                            onChange={handleResultChange}
                            required
                          >
                            <option disabled>Select </option>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Leave">Leave</option>
                            <option value="Late">Late</option>
                            <option value="Left the School">
                              Left the School
                            </option>
                          </select>
                        </div>
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
  );
}

export default MarkStudentAttendance