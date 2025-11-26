import React from 'react'

const StudentPickupReport = () => {
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
                    Student Pickup Report
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
                      <th className="text-nowrap">Date of Pickup</th>
                      <th className="text-nowrap">Time</th>
                      <th className="text-nowrap">Pass No</th>
                      <th className="text-nowrap">Name of Visitor</th>
                      <th className="text-nowrap ">Phone No</th>
                      <th className="text-nowrap">Document ID No</th>
                      <th className="text-nowrap">Pass Valid Till</th>
                      <th className="text-nowrap ">Photo</th>
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
                      <td>01-09-2025</td>
                      <td>10:00 AM</td>
                      <td>1234567890</td>
                      <td>Ganesh Kumar</td>
                      <td>1254789630</td>
                      <td>Doc-0022</td>
                      {/* Approved/Denied/Pending */}
                      <td>30-09-2025</td>
                      <td></td>
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

export default StudentPickupReport