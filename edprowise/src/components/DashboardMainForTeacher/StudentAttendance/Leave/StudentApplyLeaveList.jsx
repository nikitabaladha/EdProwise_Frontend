import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import CreatableSelect from "react-select/creatable";

 
const StudentApplyLeaveList = () => {

       const navigate = useNavigate();

       const navigateToView = (event) => {
         event.preventDefault();
         navigate(
           `/teacher-dashboard/student-attendance-leave/leave/view-leave-details`
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
                      <th>Class</th>
                      <th>Section</th>
                      <th>Roll No</th>
                      <th>Student Name</th>
                      <th>Type of Leave</th>
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
                      <td>1</td>
                      <td>A</td>
                      <td>12</td>
                      <td>Raj Kumar</td>
                      <td>Sick Leave</td>
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

                          <Link className="btn btn-soft-primary btn-sm">
                            <FaCheck className="align-middle fs-18" />
                          </Link>

                          <Link className="btn btn-soft-danger btn-sm">
                            <RxCross2 className="align-middle fs-18" />
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
}

export default StudentApplyLeaveList