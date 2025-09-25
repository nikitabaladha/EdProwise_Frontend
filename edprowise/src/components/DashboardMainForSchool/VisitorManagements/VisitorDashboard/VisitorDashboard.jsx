import React from 'react'
import VisitorGraph from './VisitorGraph'
const VisitorDashboard = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header d-flex flex-wrap align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Today Visitor List
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
                        <th className="text-nowrap">Today Visitor</th>
                        <th className="text-nowrap">Inside School</th>
                        <th className="text-nowrap">Left School</th>
                        <th className="text-nowrap">Visitor Name</th>
                        <th className="text-nowrap ">Approved by</th>
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
                        <td>1</td>
                        <td>10:00</td>
                        <td>12:00</td>
                        <td>Arun Kumar</td>
                        <td>Mr.Ajay Sing</td>
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

      <div className="container-fluid">
        <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header d-flex flex-wrap align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      {/* Today Visitor List */}
                    </h4>
                  </div>
                </div>
               

                <VisitorGraph />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitorDashboard