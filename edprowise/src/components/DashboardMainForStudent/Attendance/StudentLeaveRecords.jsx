import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";

const StudentLeaveRecords = () => {
    const navigate = useNavigate();
    
      const navigateToAdd = (event) => {
        event.preventDefault();
        navigate(`/student-dashboard/attendance-leave/leave-record/apply-leave`);
      };
    
      const navigateToView = (event) => {
        event.preventDefault();
        navigate(
          `/student-dashboard/attendance-leave/leave-record/view-leave-details`
        );
      };
    
      const navigateToUpdate = (event) => {
        event.preventDefault();
        navigate(
          `/student-dashboard/attendance-leave/leave-record/update-leave-details`
        );
      };
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
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link
          onClick={(event) => navigateToAdd(event)}
          className="btn btn-sm btn-primary"
        >
          Apply Leave
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Student Leave
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

                  <select className="form-select form-select-sm w-auto">
                    <option>Select </option>
                    <option value="All">All</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="Leave">Leave</option>
                  </select>
                </div>
              </div>
              <div className="table-responsive pb-4">
                <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
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
                      <th>Type of Leave</th>
                      <th>Apply Date</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Leave Days</th>
                      <th>Status</th>
                      <th>Action</th>
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
                      <td>Sick Leave</td>
                      <td>20-08-2025</td>
                      <td>21-08-2025</td>
                      <td>23-08-2025</td>
                      <td>3</td>
                      <td>
                        <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Approve
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            className="btn btn-light btn-sm"
                            onClick={(event) => navigateToView(event)}
                          >
                            <iconify-icon
                              icon="solar:eye-broken"
                              className="align-middle fs-18"
                            />
                          </Link>

                          <Link
                            className="btn btn-soft-primary btn-sm"
                            onClick={(event) => navigateToUpdate(event)}
                          >
                            <iconify-icon
                              icon="solar:pen-2-broken"
                              className="align-middle fs-18"
                            />
                          </Link>

                          <Link className="btn btn-soft-danger btn-sm">
                            <iconify-icon
                              icon="solar:trash-bin-minimalistic-2-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
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
};

export default StudentLeaveRecords;
