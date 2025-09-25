import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewStudentAttendance = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const record = location.state;

  if (!record) {
    return (
      <div className="container mt-4">
        <h5>No record found</h5>
      </div>
    );
  }

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
                    Student Attendnce Report
                  </h4>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
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
                      <th className="text-nowrap">Roll No</th>
                      <th className="text-nowrap">Admission No</th>
                      <th className="text-nowrap">Student Name</th>
                      <th className="text-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.students && record.students.length > 0 ? (
                      record.students.map((student) => {
                        const status = student.status 

                        return (
                          <tr key={student._id}>
                            <td className="">
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  // id={`check-${index}`}
                                />
                              </div>
                            </td>
                            <td>{student.rollNo}</td>
                            <td>{student.admissionNumber}</td>
                            <td>{student.studentName}</td>
                            <td>
                              <span
                                className={`badge ${
                                  status === "Present"
                                    ? "bg-success"
                                    : status === "Absent"
                                    ? "bg-danger"
                                    : status === "Leave"
                                    ? "bg-warning text-dark"
                                    : status === "Late"
                                    ? "bg-info text-dark"
                                    : "bg-secondary"
                                }`}
                              >
                                {/* {student.status} */}
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4">No student attendance found</td>
                      </tr>
                    )}
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

export default ViewStudentAttendance;
