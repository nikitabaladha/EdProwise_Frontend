import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SchoolRegisterBusStaff = () => {
  const navigate = useNavigate();

  const navigateToAddBusStaff = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/transport/setting/bus-staff-details/register-new-staff`
    );
  };

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/transport/setting/bus-staff-details/view-staff-details`
    );
  };

  const navigateToUpdate = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/transport/setting/bus-staff-details/update-staff-details`
    );
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
                    School Bus Staff Details
                  </h4>
                  <Link
                    onClick={(event) => navigateToAddBusStaff(event)}
                    className="btn btn-sm btn-primary"
                  >
                    Register New Staff
                  </Link>
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
                      <th className="text-nowrap">Driver Name</th>
                      <th className="text-nowrap">Gender</th>
                      <th className="text-nowrap">Driving Licenses</th>
                      <th className="text-nowrap">Contact Number</th>
                      <th className="text-nowrap">Date of Join</th>
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
                      <td>Arun Kumar</td>
                      <td>Male</td>
                      <td>1254789630</td>
                      <td>014785369</td>
                      <td>20-08-2025</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-light btn-sm"
                            onClick={(event) => navigateToView(event)}
                          >
                            <iconify-icon
                              icon="solar:eye-broken"
                              className="align-middle fs-18"
                            />
                          </button>
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
                          {/* <button className="btn btn-sm btn-outline-info me-1">
                                                    <FaDownload />
                                                  </button> */}
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

export default SchoolRegisterBusStaff;
