import React from 'react'
import { FaPrint, FaDownload } from "react-icons/fa";

const RelievingAndExperienceLetter = () => {
    return (
        <div className="container  text-dark" >
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
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
                                <div className="row text-dark">
                                    <div className="col-12 text-start">
                                        <p className="text-dark mt-2">
                                            <strong>Date of Relieving :</strong> 26-05-2025
                                        </p>
                                    </div>
                                </div>
                                <h4 className="text-center custom-heading-font mb-0 p-2">
                                    <strong>Relieving and Experience Letter</strong>
                                </h4>

                                <div className="row text-dark">
                                    <div className="col-12 text-start">
                                        <p className="text-dark">
                                            This is to certify that Mr. XXX was an employee of School Name from XX June 2021 to XX April 2024. At the time of leaving the school he was holding the designation of XXXX, with our  Department.
                                        </p>

                                        <p className="text-dark">
                                            We wish him all the very best in all his future endeavors.
                                        </p>
                                    </div>
                                </div>

                                <div className="row text-dark">
                                    <div className="col-12 text-start">
                                        <p className="text-dark">
                                            <strong>For School Name</strong>
                                        </p>

                                        <p className="text-dark">
                                            <strong>Principal Name</strong>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelievingAndExperienceLetter