import React from 'react'
import { useNavigate } from 'react-router-dom';

const OvertimeAllowanceEmployeesTable = () => {
    const navigate = useNavigate();

    const handleNavigateToViewOvertimeDetails = () => {
        navigate("/admin-dashboard/payroll-module/employer/overtime-allowance/view-overtime-allowance-detail");
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center gap-1">
                            <h4 className="card-title flex-grow-1">Overtime Allowance Employees List</h4>

                        </div>
                        <div>
                            <div className="table-responsive">
                                <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                                    <thead className="bg-light-subtle">
                                        <tr>
                                            <th style={{ width: 20 }}>
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
                                            <th>Employee ID</th>
                                            <th>Employee Name </th>
                                            <th>No.of Hours Worked</th>
                                            <th>Working Hours</th>
                                            <th>Overtime Hours</th>
                                            <th>Total Amount</th>
                                            <th>View Details/ Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="form-check ms-1">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id={"customCheck"}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={"customCheck"}
                                                    >
                                                        &nbsp;
                                                    </label>
                                                </div>
                                            </td>
                                            <td>Emp-0001</td>
                                            <td>Umesh Jadhav</td>
                                            <td>
                                                10
                                            </td>
                                            <td>
                                                8
                                            </td>
                                            <td>2</td>
                                            <td>500</td>
                                            <td>
                                                <div className="d-flex justify-content-center gap-2">

                                                    <button
                                                        className="btn btn-light btn-sm"
                                                        onClick={handleNavigateToViewOvertimeDetails}
                                                    >
                                                        <iconify-icon
                                                            icon="solar:eye-broken"
                                                            className="align-middle fs-18"
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* end table-responsive */}
                        </div>
                        <div className="card-footer border-top">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-end mb-0">
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                        // onClick={handlePreviousPage}
                                        // disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    <li
                                        className={`page-item`}
                                    >
                                        <button
                                            className={`page-link pagination-button `}
                                        //   onClick={() => handlePageClick(page)}
                                        >
                                            1
                                        </button>
                                    </li>

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                        // onClick={handleNextPage}
                                        // disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OvertimeAllowanceEmployeesTable