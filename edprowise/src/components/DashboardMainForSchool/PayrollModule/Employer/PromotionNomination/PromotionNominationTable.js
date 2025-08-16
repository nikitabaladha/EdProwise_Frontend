import React from 'react'
import { useNavigate } from 'react-router-dom';

const PromotionNominationTable = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/admin-dashboard/payroll-module/employer/promotion-nomination/view-promotion-nomination-detail");
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex  align-items-center">
                                    <h4 className="payroll-title text-center mb-0 flex-grow-1">Promotion Nomination</h4>
                                    <div>
                                        <select id="yearSelect" className="custom-select fw-bold" aria-label="Select Year">
                                            <option selected>2025-26</option>
                                            <option>2026-27</option>
                                            <option>2027-28</option>
                                            <option>2028-29</option>
                                            <option>2029-30</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive pb-4">
                                <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                                    <thead className="bg-light-subtle">
                                        <tr className="payroll-table-header">
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
                                            <th>Employee Name</th>
                                            <th>Financial Year</th>
                                            <th>Tenure</th>
                                            <th>Apply Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='payroll-table-body'>
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
                                            <td> EMP-001</td>
                                            <td>Umesh Jadhav</td>
                                            <td>
                                                2025-26
                                            </td>
                                            <td>
                                                2 Year
                                            </td>
                                            <td>
                                                26-05-2025
                                            </td>

                                            <td>
                                                <select
                                                    id="action"
                                                    name="action"
                                                    className="form-control"
                                                    required
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Approve">Approve</option>
                                                    <option value="Reject">Reject</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-light btn-sm"
                                                    onClick={handleNavigate}
                                                >
                                                    <iconify-icon
                                                        icon="solar:eye-broken"
                                                        className="align-middle fs-18"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PromotionNominationTable