import React from 'react'
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const ViewSalaryPayoutApprovalDetails = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header flex-wrap mb-2">
                  <h4 className="card-title text-center">Payroll Process</h4>
                </div>
              </div>
              <form>
                <div className="container">
                  <div className="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      <label className="mb-0 fw-bold">Month:</label>
                    </div>
                  </div>
                </div>

                <div className="table-responsive mb-4">
                  <table className="table text-dark border border-secondary mb-4">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center border border-secondary p-2">
                          Employee ID
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Employee Name
                        </th>
                        <th className="text-center border border-secondary p-2">
                          role
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Designation
                        </th>

                        <th className="text-center border border-secondary p-2">
                          Working Days
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Worked Days
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Regularized Leave
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Paid Days
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Unpaid Leave
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Basic Pay
                        </th>
                        <th className="text-center border border-secondary p-2">
                          HRA
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Gross Earning
                        </th>

                        <th className="text-center border border-secondary p-2">
                          PF Deduction
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Voluntary PF Deduction
                        </th>

                        <th className="text-center border border-secondary p-2">
                          ESI Deduction
                        </th>

                        <th className="text-center border border-secondary p-2">
                          Income Tax
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Professional Tax
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Gross Deduction
                        </th>
                        <th className="text-center border border-secondary p-2">
                          Net Salary
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="payroll-table-body">
                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>

                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>

                        <td className="text-center border border-secondary p-2"></td>
                        <td className="text-center border border-secondary p-2"></td>

                        <td className="text-center border border-secondary p-2"></td>

                        <td className="text-center border border-secondary p-2">
                          0
                        </td>
                        <td className="text-center border border-secondary p-2">
                          0
                        </td>
                        <td className="text-center border border-secondary p-2">
                          0
                        </td>
                        <td className="text-center border border-secondary p-2 fw-bold it-declaration-section-bg"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-end">
                  {/* <Link className="btn btn-soft-primary btn-sm">
                                        <FaCheck className="align-middle fs-18" />
                                      </Link>
                                      <Link className="btn btn-soft-danger btn-sm">
                                        <RxCross1 className="align-middle fs-18" />
                                      </Link> */}
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button me-2"
                  >
                    <FaCheck className="align-middle fs-18" />
                    {/* Approve */}
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger custom-submit-button"
                  >
                    <RxCross1 className="align-middle fs-18" />
                    {/* Reject */}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSalaryPayoutApprovalDetails