import React from 'react'

const AnnualLeaveUpdate = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Annual Leave Update
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit="">
                                <div className="row mb-3">
                                    {/* <div className="col-md-6">
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
                                    </div> */}
                                    <div className="col-md-6">
                                        <div className="mb-6">
                                            <label htmlFor="financialYear" className="form-label">
                                                Enter Financial Year
                                            </label>
                                            <input
                                                type="text"
                                                id="financialYear"
                                                name="financialYear"
                                                className="form-control"
                                                required
                                                placeholder='Enter Financial Year'
                                            />
                                        </div>
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
                                            <th>Type of Leave</th>
                                            <th>Days</th>
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
                                            <td>Casual Leave</td>
                                            <td>
                                                <div className="col-md-8" style={{justifySelf:"center"}}>
                                                <input
                                                type="text"
                                                id="days"
                                                name="days"
                                                value={""}
                                                className="form-control"
                                                required
                                                placeholder='Enter Days'
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
                                            <td>Sick Leave</td>
                                            <td>
                                              <div className="col-md-8" style={{justifySelf:"center"}}>   
                                                <input
                                                type="text"
                                                id="days"
                                                name="days"
                                                value={""}
                                                className="form-control"
                                                required
                                                placeholder='Enter Days'
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
                                            <td>Paid Leave</td>
                                            <td>
                                                <div className="col-md-8" style={{justifySelf:"center"}}>
                                                <input
                                                type="text"
                                                id="days"
                                                name="days"
                                                value={""}
                                                className="form-control"
                                                required
                                                placeholder='Enter Days'
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

export default AnnualLeaveUpdate