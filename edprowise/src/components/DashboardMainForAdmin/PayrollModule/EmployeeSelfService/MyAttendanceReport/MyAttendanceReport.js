import React, { useState } from 'react'

const MyAttendanceReport = () => {
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
                                        Attendance Report
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit="">
                                {/* <div className='d-flex'> */}

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <p style={{ color: 'black' }}>
                                            Employee ID : EMP-0001
                                        </p>
                                    </div>

                                    <div className="col-6">
                                        <p style={{ color: 'black' }}>
                                            Employee Name : Umesh jadhav
                                        </p>
                                    </div>
                                </div>
                                <div class="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
                                    <div className="d-flex flex-wrap align-items-center gap-3">
                                        Attendance For :
                                        <label for="yearSelect" class="mb-0">Year :</label>
                                        <select id="yearSelect" class="custom-select" aria-label="Select Year">
                                            <option selected>2025</option>
                                            <option>2026</option>
                                            <option>2027</option>
                                            <option>2028</option>
                                            <option>2029</option>
                                        </select>

                                        <label for="monthSelect" class="mb-0">Month :</label>
                                        <select id="monthSelect" class="custom-select" aria-label="Select Month">
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
                                    </div>

                                    <div className="d-flex">
                                        <button
                                            type="button"
                                            className={`btn btn-primary custom-submit-button ${showForm ? 'd-none' : ''}`}
                                            onClick={handleProceed}
                                        >
                                            Show Attendance
                                        </button>
                                    </div>
                                </div>

                                {showForm && (
                                    <>
                                        <div className="table-responsive mb-4">
                                            <table className="table mb-4" style={{ border: "1px solid black", color: "black", placeContent: "center" }}>
                                                <thead>
                                                    <tr >
                                                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                            Date
                                                        </th>
                                                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                            In Time
                                                        </th>
                                                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                            Out Time
                                                        </th>
                                                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                            No.Of Hours
                                                        </th>
                                                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr >
                                                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                            07-05-2025
                                                        </td>
                                                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                            9:00 AM
                                                        </td>
                                                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                            3:00 PM
                                                        </td>
                                                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                            6
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAttendanceReport