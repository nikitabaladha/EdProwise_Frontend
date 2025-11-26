import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewStudentRollNumber = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state;
console.log("record view",record);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (record?.rollNumberDetails) {
      setStudents(record.rollNumberDetails);
    }
  }, [record]);

  if (!record) {
    return (
      <div className="container mt-4">
        <p className="text-danger">No record found. Please go back.</p>
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
                    View Roll Number
                  </h4>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>

              <form>
                <div className="row mt-2">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="bookRecordNumber" className="form-label">
                        Class
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={record.class}
                        className="form-control"
                        required
                        placeholder="Enter Student Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="Section" className="form-label">
                        Section
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={record.section}
                        className="form-control"
                        required
                        placeholder="Enter Student Name"
                      />
                    </div>
                  </div>
                  
                    <div className="col-md-2">
                      <div className="mb-3">
                        <label htmlFor="Section" className="form-label">
                          Mode
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="studentName"
                          name="studentName"
                          value={record.mode}
                          className="form-control"
                          required
                          placeholder="Enter Student Name"
                        />
                      </div>
                    </div>
                

                  {record.mode === "alphabetical"  && (
                    <>
                      <div className="col-md-2">
                        <div className="mb-3">
                          <label htmlFor="Section" className="form-label">
                            Sort By
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            value={record.sortField}
                            className="form-control"
                            required
                            placeholder="Enter Student Name"
                          />
                          
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="mb-3">
                          <label htmlFor="Section" className="form-label">
                            Arrange By
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            value={record.sortOrder}
                            className="form-control"
                            required
                            placeholder="Enter Student Name"
                          />
                          
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </form>

              <div className="table-responsive mt-2">
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Admission No</th>
                      <th>Roll No</th>
                      <th>Student Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? (
                      students.map((s, i) => (
                        <tr key={i}>
                          <td>{s.admissionNumber}</td>
                          <td>{s.rollNo}</td>
                          <td>
                            {s.studentName}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-muted">
                          No students found
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

export default ViewStudentRollNumber;
