import React, { useState } from 'react'

const PayLoan = () => {

    const [showForm, setShowForm] = useState(false);
    const handleProceed = () => {
        setShowForm(true);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Pay Loan to Employees
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit="">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="mb-6">
                                            <label htmlFor="employeeID" className="form-label">
                                                Employee ID
                                            </label>
                                            <input
                                                type="text"
                                                id="employeeID"
                                                name="employeeID"
                                                className="form-control"
                                                required
                                                placeholder='Enter Employee ID'
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-md-2 ${showForm ? 'd-none' : ''}`} style={{ alignContent: "end", textAlign: "center" }}>
                                        {/* <div className=""> */}
                                        <button
                                            type="button"
                                            className="btn btn-primary custom-submit-button"
                                            onClick={handleProceed}
                                        >
                                            Proceed
                                        </button>
                                    </div>
                                </div>
                                {showForm && (
                                    <>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="" className="form-label">
                                                        Employee Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id=""
                                                        name=""
                                                        value={"Umesh Jadhav"}
                                                        className="form-control"
                                                        required
                                                        placeholder='Enter Employee Name'
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="grade" className="form-label">
                                                        Grade
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="grade"
                                                        name="grade"
                                                        value={"A"}
                                                        className="form-control"
                                                        required
                                                        placeholder='Enter Grade'
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="jobDesignation" className="form-label">
                                                        Job Designation
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="jobDesignation"
                                                        name="jobDesignation"
                                                        value={"Teacher"}
                                                        className="form-control"
                                                        required
                                                        placeholder='Enter Job Designation'
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="loanAmount" className="form-label">
                                                        Loan Amount
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="loanAmount"
                                                        name="loanAmount"
                                                        value={"15,000"}
                                                        className="form-control"
                                                        required
                                                        placeholder='Enter Loan Amount'
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="rateOfInterest" className="form-label">
                                                        Rate Of Interest
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="rateOfInterest"
                                                        name="rateOfInterest"
                                                        value={"8%"}
                                                        className="form-control"
                                                        required
                                                        placeholder='Enter Rate Of Interest'
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="startDate" className="form-label">
                                                        Start Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="startDate"
                                                        name="startDate"
                                                        className="form-control"
                                                        // value={formData.startDate}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="endDate" className="form-label">
                                                        End Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="endDate"
                                                        name="endDate"
                                                        className="form-control"
                                                        // value={formData.endDate}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-6">
                                                    <label htmlFor="periodOfLoan" className="form-label">
                                                        Period Of Loan (Months)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="periodOfLoan"
                                                        name="periodOfLoan"
                                                        value={"6"}
                                                        className="form-control"
                                                        required
                                                        placeholder='Enter Period Of Loan'
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="table-responsive">
                                            <h4 className='mb-2 mt-2'>Recovery Plan :
                                            </h4>
                                            <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
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
                                                        <td className='fw-bold'>Installment 1</td>
                                                        <td>
                                                        <div className="col-md-8">
                                                                <input
                                                                    type="text"
                                                                    value={"5000"}
                                                                    className="form-control text-center"
                                                                    required
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
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
                                                        <td className='fw-bold'>Installment 2</td>
                                                        <td>
                                                            <div className="col-md-8">
                                                                <input
                                                                    type="text"
                                                                    value={"5000"}
                                                                    className="form-control text-center"
                                                                    required
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
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
                                                        <td className='fw-bold'>Installment 3</td>
                                                        <td>
                                                        <div className="col-md-8">
                                                                <input
                                                                    type="text"
                                                                    value={"5000"}
                                                                    className="form-control text-center"
                                                                    required
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="text-end mt-2">
                                            <button
                                                type="submit"
                                                className="btn btn-primary custom-submit-button"
                                            >
                                                Proceed For Payment
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                        {/* <div className="card-body">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Leave Details
                                    </h4>
                                </div>
                            </div>
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
                                            <th>Type of Leave</th>
                                            <th>Leave Days</th>
                                            <th>Utilized</th>
                                            <th>Balance</th>
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
                                            <td>Festival</td>
                                            <td>Monday</td>
                                            <td>
                                                Yes
                                            </td>
                                            <td>
                                                5
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayLoan