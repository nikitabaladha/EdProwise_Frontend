import React from 'react'

const OvertimeAllowanceRate = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Overtime Allowance Rate
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit="">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="leaveFor"
                                            className="form-label"
                                        >
                                            Select Financial Year
                                        </label>
                                        <select
                                            id="leaveFor"
                                            name="leaveFor"
                                            className="form-control"
                                            required

                                        >
                                            <option value="">Select Leave</option>
                                            <option value="Non-Casual Leave">Non-Casual Leave</option>
                                            <option value="Casual Leave">
                                                Casual Leave
                                            </option>
                                        </select>
                                    </div>
                                </div>


                                <div className="card-body">
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
                                                    <th>Category</th>
                                                    <th>Grade</th>
                                                    <th>Rate</th>
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
                                                    <td>
                                                        <div className="col-md-12" style={{ justifySelf: "center" }}>
                                                            <select
                                                                id="category"
                                                                name="category"
                                                                className="form-control"
                                                                required
                                                            >
                                                                <option value="">Select Category</option>
                                                                <option value="Teaching Staff">Teaching Staff</option>
                                                                <option value="Non-Teaching Staff">
                                                                    Non-Teaching Staff
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="col-md-12" style={{ justifySelf: "center" }}>
                                                            <input
                                                                type="text"
                                                                id="grade"
                                                                name="grade"
                                                                value={""}
                                                                className="form-control"
                                                                required
                                                                placeholder='Enter Grade'
                                                            />
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="col-md-12" style={{ justifySelf: "center" }}>
                                                            <input
                                                                type="text"
                                                                id="rate"
                                                                name="rate"
                                                                value={""}
                                                                className="form-control"
                                                                required
                                                                placeholder='Enter Rate'
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
                                                    <td>
                                                        <div className="col-md-12" style={{ justifySelf: "center" }}>
                                                            <select
                                                                id="category"
                                                                name="category"
                                                                className="form-control"
                                                                required
                                                            >
                                                                <option value="">Select Category</option>
                                                                <option value="Teaching Staff">Teaching Staff</option>
                                                                <option value="Non-Teaching Staff">
                                                                    Non-Teaching Staff
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="col-md-12" style={{ justifySelf: "center" }}>
                                                            <input
                                                                type="text"
                                                                id="grade"
                                                                name="grade"
                                                                value={""}
                                                                className="form-control"
                                                                required
                                                                placeholder='Enter Grade'
                                                            />
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div className="col-md-12" style={{ justifySelf: "center" }}>
                                                            <input
                                                                type="text"
                                                                id="rate"
                                                                name="rate"
                                                                value={""}
                                                                className="form-control"
                                                                required
                                                                placeholder='Enter Rate'
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="text-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary custom-submit-button"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OvertimeAllowanceRate