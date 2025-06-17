import React, { useState } from 'react'
import { FaPrint, FaDownload } from "react-icons/fa";

const AwardsAndAchievementCertificate = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [showForm, setShowForm] = useState(false);
    const handleProceed = () => {
        setShowForm(true);
    };
    return (
        <div className="container  text-dark" >
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <form onSubmit="">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="mb-6">
                                            <label htmlFor="employeeID" className="form-label">
                                                Employee ID <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="employeeID"
                                                name="employeeID"
                                                className="form-control"
                                                value={employeeId}
                                                onChange={(e) => setEmployeeId(e.target.value)}
                                                required
                                                placeholder="Enter Employee ID"
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-md-2 ${showForm ? 'd-none' : ''}`} style={{ alignContent: "end", textAlign: "center" }}>
                                        <button
                                            type="button"
                                            className="btn btn-primary custom-submit-button"
                                            onClick={handleProceed}
                                        >
                                            Proceed
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="row mt-2 payroll-box-line" />
                            {showForm && (
                                <>
                                    <div className="custom-bg d-flex flex-wrap align-items-center justify-content-end gap-3 p-3">
                                        <div className="d-flex">
                                            <button className="btn btn-light me-2">
                                                <FaPrint /> Print
                                            </button>

                                            <button className="btn btn-light">
                                                <FaDownload /> Download PDF
                                            </button>
                                        </div>
                                    </div>

                                    <div id="receipt-content" className="salary-slip-box border-dark p-3" >
                                        <div className="text-center mb-3">
                                            <h6>
                                                <strong>[From Letter Head]</strong>
                                            </h6>
                                        </div>

                                        <div className="row border border-dark" />

                                        <h4 className="text-center payroll-title mb-0 p-2">
                                            <strong>BEST TEACHER OF THE MONTH</strong>
                                        </h4>

                                        <div className="row pt-3 payroll-box-line mb-0" />

                                        <h4 className="text-center custom-heading-font mb-0 p-2">
                                            <strong>THIS CERTIFICATE OF APPRECIAITON IS AWARDED TO</strong>
                                        </h4>
                                        <h4 className="text-center custom-heading-font mb-2 p-2">
                                            <strong>[TEACHER’S FULL NAME] </strong>
                                        </h4>


                                        <div className="row text-dark">
                                            <div className="col-12 text-start">
                                                <p className="text-dark">
                                                    In recognition of your outstanding dedication, exceptional teaching performance, and positive contribution to student growth and school values during the month of [Month, Year]. Your commitment to educational excellence sets a benchmark for all.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row text-dark">
                                            <div className="col-12 d-flex justify-content-between">
                                                <p className="text-dark">
                                                    <strong>Awarded by :</strong> School
                                                </p>

                                                <p className="text-dark">
                                                    <strong>Date : </strong>20-05-2025
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AwardsAndAchievementCertificate