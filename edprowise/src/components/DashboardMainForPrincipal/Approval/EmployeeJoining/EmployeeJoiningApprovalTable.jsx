import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
const EmployeeJoiningApprovalTable = () => {
  const navigate = useNavigate();

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(
      `/principal-dashboard/approval/employee-joining/view-employee-joining-details`
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              {/* Page Header */}
              <div className="container mt-2">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Employee Joining
                  </h4>
                  <select className="form-select form-select-sm me-2 w-auto">
                    <option value="" disabled>
                      Sort By
                    </option>

                    <option value="Newest First">Newest First </option>
                    <option value="Oldest First">Oldest First </option>
                    <option value="Only Pending">Only Pending </option>
                    <option value="Name A-Z">Name A-Z </option>
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
                      <th className="text-nowrap">Employee ID</th>
                      <th className="text-nowrap">Employee Name</th>
                      <th className="text-nowrap">Role</th>
                      <th className="text-nowrap">Department</th>
                      <th className="text-nowrap">Joining Date</th>
                      <th className="text-nowrap">Job Type</th>
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
                      <td>EMP-001</td>
                      <td>Deepak Singh</td>
                      <td>Physics Teacher</td>
                      <td>Science</td>
                      <td>10-07-2025</td>
                      <td>Full-time</td>
                      <td>
                        {/* Approve */}
                        <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Approve
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="d-flex gap-2 justify-content-center">
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
                            <RxCross1 className="align-middle fs-18" />
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

export default EmployeeJoiningApprovalTable;
