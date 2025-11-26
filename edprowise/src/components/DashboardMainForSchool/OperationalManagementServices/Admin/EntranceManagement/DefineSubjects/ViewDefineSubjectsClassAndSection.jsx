import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewDefineSubjectsClassAndSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const record = location.state;

  if (!record) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning mt-3 text-center">
          No record found. Please go back.
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    View Define Subjects
                  </h4>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="table-responsive mt-3">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th>
                        <input type="checkbox" className="form-check-input" />
                      </th>
                      <th className="text-nowrap">Academic Year</th>
                      <th className="text-nowrap">Class</th>
                      <th className="text-nowrap">Section</th>
                      <th className="text-nowrap">Subject Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.subjects && record.subjects.length > 0 ? (
                      record.subjects.map((subject, index) => (
                        <tr key={subject._id}>
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </td>
                          <td>{record.academicYear}</td>
                          <td>{record.class}</td>
                          <td>{record.section}</td>
                          <td>{subject.subjectName}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No subjects found for this class/section
                        </td>
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

export default ViewDefineSubjectsClassAndSection;
