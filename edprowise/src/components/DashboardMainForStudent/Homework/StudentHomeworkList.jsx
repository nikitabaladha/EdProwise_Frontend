import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SiGoogleforms } from "react-icons/si";

const StudentHomeworkList = () => {
    const navigate = useNavigate();
        const navigateToView = (event) => {
          event.preventDefault();
          navigate(
            `/student-dashboard/homework/homework-assign-list/submit-homework`
          ); 
        }; 
     
        const navigateToFill = (event) => {
          event.preventDefault();
          navigate(`/student-dashboard/teachers-feedback/fill-feedback`);
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
                    Homework List
                  </h4>
                  <select className="form-select form-select-sm me-2 w-auto">
                    <option >Select Subject</option>
                    <option value="All">All</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science </option>
                  </select>

                  <select className="form-select form-select-sm me-2 w-auto">
                    <option>Sort By</option>
                    <option value="Overdue">Overdue </option>
                    <option value="Due Soon ">Due Soon </option>
                    <option value="Upcoming ">Upcoming </option>
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
                      <th className="text-nowrap">subject</th>
                      <th className="text-nowrap">Teacher Name</th>
                      <th className="text-nowrap">Homework Title</th>
                      <th className="text-nowrap">Given Date</th>
                      <th className="text-nowrap">Due date</th>
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
                      <td>English</td>
                      <td>Mr.Arun Verma</td>
                      <td>Essay on Environment</td>
                      <td>18-08-2025</td>
                      <td>20-08-2025</td>

                      <td>
                        <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Due Soon
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

                          {/* <Link
                            className="btn btn-soft-primary btn-sm"
                            onClick={(event) => navigateToFill(event)}
                          >
                            <SiGoogleforms className="align-middle fs-18" />
                          </Link> */}
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

export default StudentHomeworkList