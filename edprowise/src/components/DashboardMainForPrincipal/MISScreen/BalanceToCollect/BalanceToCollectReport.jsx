import React from 'react'
import { FiDownload } from "react-icons/fi";
const BalanceToCollectReport = () => {
  return (
    <div className="container-fluid">
      {/* <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link
          onClick={(event) => navigateToAdd(event)}
          className="btn btn-sm btn-primary"
        >
          Add School Holiday
        </Link>
      </div> */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Balance To Collect Year 2025-26
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
                      <th className="text-nowrap">Class</th>
                      <th className="text-nowrap">Section</th>
                      <th className="text-nowrap">Total Dues</th>
                      <th className="text-nowrap">Collected Sofar</th>
                      <th className="text-nowrap">Balance to Collect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </td>
                      <td>1</td>
                      <td>A</td>
                      <td>10,000</td>
                      <td>9,000</td>
                      <td>1,000</td>
                    </tr>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </td>
                      <td>2</td>
                      <td>A</td>
                      <td>10,000</td>
                      <td>9,000</td>
                      <td>1,000</td>
                    </tr>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </td>
                      <td colSpan={2} className="text-start fw-bold">
                        Total
                      </td>

                      <td className="fw-bold">20,000</td>
                      <td className="fw-bold">18,000</td>
                      <td className="fw-bold">2,000</td>
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

export default BalanceToCollectReport