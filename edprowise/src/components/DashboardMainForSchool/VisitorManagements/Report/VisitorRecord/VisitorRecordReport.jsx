import React from 'react'

const VisitorRecordReport = () => {
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
                    Visitors Record Report
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
                      <th className="text-nowrap">Visitor No</th>
                      <th className="text-nowrap">Name of Visitor</th>
                      <th className="text-nowrap">Phone No</th>
                      <th className="text-nowrap">Host Name</th>
                      <th className="text-nowrap ">Approval</th>
                      <th className="text-nowrap">Status</th>
                      <th className="text-nowrap">In Time</th>
                      <th className="text-nowrap ">Out Time</th>
                      <th className="text-nowrap ">Card No</th>
                      <th className="text-nowrap">Track</th>
                      <th className="text-nowrap">Blacklist</th>
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
                      <td>VIS-001</td>
                      <td>Ganesh Kumar</td>
                      <td>1234567890</td>
                      <td>Arun Kumar</td>
                      {/* Approved/Denied/Pending */}
                      <td>
                        <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Approved
                        </span>
                      </td>
                      <td>Inside School</td>
                      <td>10:00 AM</td>
                      <td>03:00 PM</td>
                      <td>147852</td>
                      <td>track</td>
                      <td>No</td>
                   
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
}

export default VisitorRecordReport