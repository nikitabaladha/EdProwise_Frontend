import React from 'react'

const UpdateTeacherFillMarks = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Mid-sem Exam Timetable - 2025-26
                  </h4>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-bordered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="text-nowrap">Roll No</th>
                      <th className="text-nowrap">Student Name</th>
                      <th className="text-nowrap">Subject</th>
                      <th className="text-nowrap" style={{ width: "150px" }}>
                        Fill Marks
                      </th>
                      <th className="text-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Arun Sing</td>
                      <td>Math-1</td>
                      <td>
                        <input
                          type="text"
                          className="form-control text-end"
                          required
                        />
                      </td>
                      <td>
                        <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Fill
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-end mb-2">
              <button
                type="submit"
                className="btn btn-primary me-2 custom-submit-button"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTeacherFillMarks