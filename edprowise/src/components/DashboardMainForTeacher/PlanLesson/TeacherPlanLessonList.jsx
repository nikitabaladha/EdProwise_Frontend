import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";

const TeacherPlanLessonList = () => {
  const navigate = useNavigate();

  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/teacher-dashboard/lesson-plan/add-lesson-plan`
    );
  };

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(
      `/teacher-dashboard/lesson-plan/view-lesson-plan`
    );
  };

  const navigateToUpdate = (event) => {
    event.preventDefault();
    navigate(
      `/teacher-dashboard/lesson-plan/update-lesson-plan`
    );
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link
          onClick={(event) => navigateToAdd(event)}
          className="btn btn-sm btn-primary"
        >
          Add Lesson Plan
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Lesson Plan
                  </h4>
                  <select className="form-select form-select-sm me-2 w-auto">
                    <option >Select Class</option>
                    <option value="1"> 1</option>
                    <option value="2"> 2</option>
                  </select>

                  <select className="form-select form-select-sm me-2 w-auto">
                    <option >Select Section</option>
                    <option value="A"> A</option>
                    <option value="B"> B</option>
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
                      <th className="text-nowrap">Lesson Name</th>
                      <th className="text-nowrap">Progress</th>
                      <th className="text-nowrap">Completed Perc.</th>
                      <th className="text-nowrap">Status</th>
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </td>
                      <td>Sentance Types</td>
                      <td>on Track</td>
                      <td>25%</td>
                      <td>Pending</td>
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
                          <Link
                            className="btn btn-soft-primary btn-sm"
                            onClick={(event) => navigateToUpdate(event)}
                          >
                            <iconify-icon
                              icon="solar:pen-2-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                          <Link
                            className="btn btn-soft-danger btn-sm"
                            // onClick={() => openDeleteDialog()}
                          >
                            <iconify-icon
                              icon="solar:trash-bin-minimalistic-2-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                          <button className="btn btn-primary btn-sm">
                            <FiDownload className="align-middle fs-18" />
                          </button>{" "}
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

export default TeacherPlanLessonList;