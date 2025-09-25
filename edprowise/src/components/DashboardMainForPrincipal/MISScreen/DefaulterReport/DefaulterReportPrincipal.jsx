import React from 'react'
import { FiDownload } from "react-icons/fi";

const DefaulterReportPrincipal = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Defaulter Report Year 2025-26
                  </h4>
                  <select className="form-select form-select-sm me-2 w-auto">
                    <option disabled selected>
                      Select Class
                    </option>
                    <option value="All">All</option>
                    <option value="1">1 </option>
                    <option value="2">2 </option>
                    <option value="3">3 </option>
                  </select>

                  <select className="form-select form-select-sm me-2 w-auto">
                    <option disabled selected>
                      Select Section
                    </option>
                    <option value="All">All</option>
                    <option value="A">A </option>
                    <option value="B">B </option>
                    <option value="C">C </option>
                  </select>

                  <select className="form-select form-select-sm me-2 w-auto">
                    <option disabled selected>
                      Select Installment
                    </option>
                    <option value="1">1st Installment</option>
                    <option value="2">2st Installment</option>
                    <option value="3">3st Installment</option>
                    <option value="4">4st Installment</option>
                  </select>
                  <FiDownload />
                </div>
              </div>
              <div className="row mt-3 justify-content-center">
                <div className="col-lg-4 col-12">
                  <div
                    className="card overflow-hidden border border-dark"
                    style={{ height: "-webkit-fill-available" }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="col-lg-12 col-md-12 col-12 "
                          style={{ justifyItems: "center" }}
                        >
                          <p className="text-muted fw-semibold mb-1">
                            Total Student
                          </p>
                          <h3 className="text-dark mt-1 mb-0">10 Student</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <div
                    className="card overflow-hidden border border-dark"
                    style={{ height: "-webkit-fill-available" }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div
                          className="col-lg-12 col-md-12 col-12 "
                          style={{ justifyItems: "center" }}
                        >
                          <p className="text-muted fw-semibold mb-1">
                            Total Pending Amount
                          </p>
                          <h3 className="text-dark mt-1 mb-0">10,000</h3>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      <th className="text-nowrap">Admission No.</th>
                      <th className="text-nowrap">Student Name</th>
                      <th className="text-nowrap">Class</th>
                      <th className="text-nowrap">Section</th>
                      <th className="text-nowrap">Pending Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </td>
                      <td>ADM-001</td>
                      <td>Ravi Kumar</td>
                      <td>1</td>
                      <td>A</td>
                      <td>10,000</td>
                    </tr>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </td>
                      <td>ADM-002</td>
                      <td>Priya Yadav</td>
                      <td>2</td>
                      <td>A</td>
                      <td>12,000</td>
                    </tr>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </td>
                      <td className="fw-bold">Total</td>
                      <td className="fw-bold">2</td>
                      <td className="fw-bold"></td>
                      <td className="fw-bold"></td>
                      <td className="fw-bold">22,000</td>
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

export default DefaulterReportPrincipal