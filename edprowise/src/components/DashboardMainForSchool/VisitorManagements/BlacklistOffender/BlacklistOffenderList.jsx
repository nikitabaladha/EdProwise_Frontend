import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BlacklistOffenderList = () => {
  const navigate = useNavigate();

  const navigateToAddVisitor = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/visitor/blacklist-offender/add-blacklist-offender`
    );
  };

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/visitor/blacklist-offender/view-blacklist-offender`
    );
  };

  const navigateToUpdate = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/visitor/blacklist-offender/update-blacklist-offender`
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
                    Blacklist Offender
                  </h4>
                  <Link
                    onClick={(event) => navigateToAddVisitor(event)}
                    className="btn btn-sm btn-primary"
                  >
                    Add Blacklist offender
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
                      <th className="text-nowrap">Visitor No</th>
                      <th className="text-nowrap">Name of Visitor</th>
                      <th className="text-nowrap">Phone No</th>
                      <th className="text-nowrap">Document ID No</th>
                      <th className="text-nowrap">Blacklist Reason</th>
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
                      <td>VIS-002</td>
                      <td>Ganesh Kumar</td>
                      <td>1254789630</td>
                      <td>Doc-0022</td>
                      <td>Behaviour is not good</td>
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

export default BlacklistOffenderList;
