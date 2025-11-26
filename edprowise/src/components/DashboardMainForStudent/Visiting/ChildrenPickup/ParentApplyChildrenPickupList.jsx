import React from "react";
import { useNavigate, Link } from "react-router-dom";

const ParentApplyChildrenPickupList = () => {
  const navigate = useNavigate();

  const navigateToApply = (event) => {
    event.preventDefault();
    navigate(`/student-dashboard/child-pickup/apply-child-pickup`);
  }; 

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(`/student-dashboard/child-pickup/view-child-pickup`);
  };

  const navigateToUpdate = (event) => {
    event.preventDefault();
    navigate(`/student-dashboard/child-pickup/update-child-pickup`);
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
                    Student Pickup
                  </h4>
                  <Link
                    onClick={(event) => navigateToApply(event)}
                    className="btn btn-sm btn-primary"
                  >
                    Apply Child Pickup
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
                      <th className="text-nowrap">Pass No</th>
                      <th className="text-nowrap">Name of Visitor</th>
                      {/* <th className="text-nowrap">Name of Student</th> */}
                      <th className="text-nowrap ">Phone No</th>
                      <th className="text-nowrap">Document ID No</th>
                      <th className="text-nowrap">Pass Valid Till</th>
                      <th className="text-nowrap ">Photo</th>
                      <th className="text-nowrap ">Action</th>
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
                      <td>1234567890</td>
                      <td>Ganesh Kumar</td>
                      <td>1254789630</td>
                      <td>Doc-0022</td>
                      {/* Approved/Denied/Pending */}
                      <td>30-09-2025</td>
                      <td></td>
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

              {/* <VisitorGraph /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentApplyChildrenPickupList;
