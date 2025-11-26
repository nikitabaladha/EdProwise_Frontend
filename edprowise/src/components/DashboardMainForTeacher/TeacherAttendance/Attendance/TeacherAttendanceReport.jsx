import React, {useState, useRef} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import CircularProgressCollection from './CircularProgressCollection';
const TeacherAttendanceReport = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
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
                    Teacher Attendance
                  </h4>

                  <FaRegCalendarAlt className="me-2" />

                  <CreatableSelect
                    isClearable
                    options={months}
                    value={selectedMonth}
                    onChange={(newValue) => setSelectedMonth(newValue)}
                    placeholder="Select Month"
                    className="email-select form-select-sm me-2 w-auto"
                  />

                 
                </div>
              </div>

              <div className=" d-flex flex-wrap gap-2 justify-content-center my-3">
                <div
                  className="card overflow-hidden border border-dark mb-0"
                  style={{ height: "-webkit-fill-available" }}
                >
                  <div className="card-body">
                    <div className=" align-content-center">
                      <div className="d-flex align-items-center justify-content-center">
                        <CircularProgressCollection percentage={75} />
                      </div>
                      <div className="mt-2">Total Attendance</div>
                    </div>
                  </div>
                </div>

                <div
                  className="card overflow-hidden border border-dark mb-0"
                  style={{ height: "-webkit-fill-available" }}
                >
                  <div className="card-body align-content-center">
                    <div className="row">
                      <div
                        className="col-lg-12 col-md-12 col-12 "
                        style={{ justifyItems: "center" }}
                      >
                        <div className="d-flex flex-wrap">
                          <h3 className="text-muted fw-semibold mb-0 pe-2">
                            Present :
                          </h3>
                          <h3 className="text-dark mb-0"> 21 Days</h3>
                        </div>
                        <div className="d-flex flex-wrap mt-2">
                          <h3 className="text-muted fw-semibold mb-0 pe-2 ">
                            Absent :
                          </h3>
                          <h3 className="text-dark mb-0 "> 3 Days</h3>
                        </div>
                        <div className="d-flex flex-wrap mt-2">
                          <h3 className="text-muted fw-semibold mb-0 pe-2 ">
                            Halfday :
                          </h3>
                          <h3 className="text-dark mb-0 ">4 Days</h3>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <th className="text-nowrap">Employee Id</th>
                      <th className="text-nowrap">Date</th>
                      <th className="text-nowrap">Day</th>
                      <th className="text-nowrap ">In-Time</th>
                      <th className="text-nowrap">Out-Time</th>
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
                      <td className="">EMP-001</td>
                      <td>01-09-2025</td>
                      <td>Monday</td>
                      <td>11:00</td>
                      <td>05:00</td>
                      <td>
                        <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Present
                        </span>
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
};

export default TeacherAttendanceReport;