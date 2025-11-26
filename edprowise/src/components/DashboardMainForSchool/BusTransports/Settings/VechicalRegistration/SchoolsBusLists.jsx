import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SchoolsBusLists = () => {
  const navigate = useNavigate();

  const navigateToAddBus = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/transport/setting/bus-details/add-bus-details`);
  };

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/transport/setting/bus-details/view-bus-details`);
  };

  const navigateToUpdate = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/transport/setting/bus-details/update-bus-details`);
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
                    School Bus Details
                  </h4>
                  <Link
                    onClick={(event) => navigateToAddBus(event)}
                    className="btn btn-sm btn-primary"
                  >
                    Add School Bus
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
                      <th className="text-nowrap">Bus Number</th>
                      <th className="text-nowrap">Vehicle Type</th>
                      <th className="text-nowrap">Registration Number</th>
                      <th className="text-nowrap">Chassis Number</th>
                      <th className="text-nowrap">No.of Seat</th>
                     <th className="text-nowrap">Register Date</th>
                      <th className="text-nowrap">Year of Manufacture</th>
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
                      <td>BUS-001</td>
                      <td>Small</td>
                      <td>1254789630</td>
                      <td>0022</td>
                      <td>15</td>
                      <td>20-08-2025</td>
                      <td>2022</td>
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

export default SchoolsBusLists;
