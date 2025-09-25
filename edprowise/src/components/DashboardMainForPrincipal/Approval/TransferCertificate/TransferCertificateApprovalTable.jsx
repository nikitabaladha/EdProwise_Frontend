import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
const TransferCertificateApprovalTable = () => {
  const navigate = useNavigate();

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(
      `/principal-dashboard/approval/transfer-certificate/view-tc-details`
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container mt-2">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Transfer Certificate
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
                      <th className="text-nowrap">Admission ID</th>
                      <th className="text-nowrap">Student Name</th>
                      <th className="text-nowrap">Class</th>
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
                      <td>ADM-001</td>
                      <td>Tej Singh</td>
                      <td>5</td>
                      <td>A</td>
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
}

export default TransferCertificateApprovalTable