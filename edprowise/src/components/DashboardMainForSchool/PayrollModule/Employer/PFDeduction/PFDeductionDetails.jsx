import React from 'react'

const PFDeductionDetails = () => {
     
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header  d-flex align-items-center gap-1">
                                    <h4 className="card-title text-center flex-grow-1">
                                        PF Deduction
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit="">
                                <div class="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
                                    <div className="d-flex flex-wrap align-items-center gap-3">
                                        <label for="monthSelect" className="mb-0 fw-bold">Month :</label>
                                        <select id="monthSelect" className="custom-select" aria-label="Select Month">
                                            <option selected>January</option>
                                            <option>February</option>
                                            <option>March</option>
                                            <option>April</option>
                                            <option>May</option>
                                            <option>June</option>
                                            <option>July</option>
                                            <option>August</option>
                                            <option>September</option>
                                            <option>October</option>
                                            <option>November</option>
                                            <option>December.</option>
                                        </select>

                                        <label for="yearSelect" className="mb-0 fw-bold">Year :</label>
                                        <select id="yearSelect" className="custom-select" aria-label="Select Year">
                                            <option selected>2025</option>
                                            <option>2026</option>
                                            <option>2027</option>
                                            <option>2028</option>
                                            <option>2029</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row m-0 mb-2 pt-2 salary-slip-box">
                                    <div className="col-md-3">
                                        <p className='text-dark payroll-box-text'>
                                        </p>
                                    </div>

                                    <div className="col-md-3">
                                        <p className='text-dark text-center payroll-box-text' >
                                            <strong >EPF </strong>
                                        </p>
                                    </div>

                                    <div className="col-md-3">
                                        <p className='text-dark text-center payroll-box-text'>
                                            <strong>EPS </strong>
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className='text-dark text-center payroll-box-text' >
                                            <strong>EDLI </strong>
                                        </p>
                                    </div>

                                    <div className="col-md-3">
                                        <p className='text-dark payroll-box-text' >
                                            <strong> Total Subscribers </strong>
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className='text-dark payroll-box-text' >
                                            <strong>  </strong>
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className='text-dark payroll-box-text' >
                                            <strong>  </strong>
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className='text-dark payroll-box-text' >
                                            <strong>  </strong>
                                        </p>
                                    </div>

                                    <div className="col-md-3">
                                        <p className='text-dark payroll-box-text' >
                                            <strong> Total Wages </strong>
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className='text-dark payroll-box-text' >
                                            <strong>  </strong>
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className='text-dark payroll-box-text' >
                                            <strong>  </strong>
                                        </p>
                                    </div>
                                    <div className="col-md-3">
                                        <p className='text-dark payroll-box-text' >
                                            <strong>  </strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="table-responsive my-4">
                                    <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                                        <thead className="bg-light-subtle">
                                            <tr className='payroll-table-header'>
                                                <th style={{ width: 20 }}>
                                                    <div className="form-check ms-1">
                                                        <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                        <label className="form-check-label" htmlFor="customCheck1" />
                                                    </div>
                                                </th>
                                                <th>PARTICULARS</th>
                                                <th>A/C.01 (Rs.)</th>
                                                <th>A/C.02 (Rs.)</th>
                                                <th>A/C.10 (Rs.)</th>
                                                <th>A/C.21 (Rs.)</th>
                                                <th>A/C.22 (Rs.)</th>
                                                <th>Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='payroll-table-body'>
                                                <td style={{ width: 20 }}>
                                                    <div className="form-check ms-1">
                                                        <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                        <label className="form-check-label" htmlFor="customCheck1" />
                                                    </div>
                                                </td>
                                                <td>Administration Charges</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            <tr className='payroll-table-body'>
                                                <td style={{ width: 20 }}>
                                                    <div className="form-check ms-1">
                                                        <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                        <label className="form-check-label" htmlFor="customCheck1" />
                                                    </div>
                                                </td>
                                                <td>Employer's Share of</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                            <tr className='payroll-table-body'>
                                                <td style={{ width: 20 }}>
                                                    <div className="form-check ms-1">
                                                        <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                        <label className="form-check-label" htmlFor="customCheck1" />
                                                    </div>
                                                </td>
                                                <td>Employee's Share of</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="table-responsive my-4">
                                    <table className="table border text-dark border-dark mb-4">
                                        <thead>
                                            <tr className='payroll-table-header'>
                                                <th className="text-center border border-dark p-2">Employee ID</th>
                                                <th className="text-center border border-dark p-2">Employee Name</th>
                                                <th className="text-center border border-dark p-2">Salary</th>
                                                <th className="text-center border border-dark p-2">Employee PF</th>
                                                <th className="text-center border border-dark p-2">Employer Pension</th>
                                                <th className="text-center border border-dark p-2">Employer Deposit </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {filteredRecords.length > 0 ? (
                  filteredRecords.map((rec, idx) => ( */}
                                            <tr className='payroll-table-body'>
                                                <td className="text-center border border-dark p-2"></td>
                                                <td className="text-center border border-dark p-2"></td>
                                                <td className="text-center border border-dark p-2"></td>
                                                <td className="text-center border border-dark p-2"></td>
                                                <td className="text-center border border-dark p-2"></td>
                                                <td className="text-center border border-dark p-2"></td>
                                            </tr>
                                            {/* ))
                ) : (
                  <tr><td colSpan="7" className="text-center border border-dark p-2">No Employee records found</td></tr>
                )} */}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <div className="text" >
                                        <button
                                            type="submit"
                                            className="btn btn-primary custom-submit-button"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PFDeductionDetails