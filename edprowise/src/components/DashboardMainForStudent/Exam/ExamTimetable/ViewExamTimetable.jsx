import React from 'react'

const ViewExamTimetable = () => {
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
                      <th className="text-nowrap">Date</th>
                      <th className="text-nowrap">Day</th>
                      <th className="text-nowrap">Subject</th>
                      <th className="text-nowrap">Start Time</th>
                      <th className="text-nowrap">End Time</th>
                      <th className="text-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold">20-05-2025</td>
                      <td>Thursday</td>
                      <td>Math-1</td>
                      <td>9:30</td>
                      <td>11:00</td>
                      <td>
                        <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Complete
                        </span>
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

export default ViewExamTimetable