import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
const ExamResultList = () => {
  const navigate = useNavigate();
  const navigateToView = (event) => {
    event.preventDefault();
    navigate(`/student-dashboard/exam/exam-result-list/view-result`);
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
                    Exam Timetable
                  </h4>
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
                      <th className="text-nowrap">Academic Year</th>
                      <th className="text-nowrap">Exam Name</th>
                      <th className="text-nowrap">From Date</th>
                      <th className="text-nowrap">To Date</th>
                      <th className="text-nowrap">Result Status</th>
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
                      <td>2025-26</td>
                      <td>Mid-sem Exam 2025-26</td>
                      <td>20-05-2025</td>
                      <td>26-05-2025</td>
                      <td>
                        <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Declared
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

export default ExamResultList;