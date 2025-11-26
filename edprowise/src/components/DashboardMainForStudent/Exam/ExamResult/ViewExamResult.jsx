import React from 'react'
import CircularProgressCollection from './CircularProgressCollection';
const ViewExamResult = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Mid-sem Exam Result - 2025-26
                  </h4>
                </div>
              </div>
              <div className=" d-flex flex-wrap gap-2 justify-content-center my-3">
                  <div
                    className="card overflow-hidden border border-dark mb-0"
                    style={{ height: "-webkit-fill-available" }}
                  >
                    <div className="card-body">
                      <div className=" align-content-center">
                        <div className="d-flex align-items-center justify-content-center">
                          <CircularProgressCollection percentage={75} />
                        </div>
                        <div className="mt-2">Overall Performance</div>
                      </div>
                    </div>
                  </div>
                
                
                  <div
                    className="card overflow-hidden border border-dark mb-0"
                    style={{ height: "-webkit-fill-available" }}
                  >
                    <div className="card-body align-content-center">
                      <div className="row">
                        <div
                          className="col-lg-12 col-md-12 col-12 "
                          style={{ justifyItems: "center" }}
                        >
                          <div className="d-flex flex-wrap">
                            <h3 className="text-muted fw-semibold mb-0 pe-2">
                              Total Marks :
                            </h3>
                            <h3 className="text-dark mb-0"> 519/600</h3>
                          </div>
                          <div className="d-flex flex-wrap mt-2">
                            <h3 className="text-muted fw-semibold mb-0 pe-2 ">
                              Percentage :
                            </h3>
                            <h3 className="text-dark mb-0 "> 75%</h3>
                          </div>
                          <div className="d-flex flex-wrap mt-2">
                            <h3 className="text-muted fw-semibold mb-0 pe-2 ">
                              Result :
                            </h3>
                            <h3 className="text-dark mb-0 ">
                              <span class="badge bg-success text-light ">
                                Pass
                              </span>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-bordered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="text-nowrap">Subject</th>
                      <th className="text-nowrap">Mark Gained</th>
                      <th className="text-nowrap">Out of</th>
                      <th className="text-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Math-1</td>
                      <td>85</td>
                      <td>100</td>
                      <td>
                        <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Pass
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Science</td>
                      <td>80</td>
                      <td>100</td>
                      <td>
                        <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Pass
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Total</td>
                      <td className="fw-bold">519</td>
                      <td className="fw-bold">600</td>
                      <td>
                        {/* <span class="badge bg-success text-light  px-2 py-1 fs-13">
                          Pass
                        </span> */}
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

export default ViewExamResult;