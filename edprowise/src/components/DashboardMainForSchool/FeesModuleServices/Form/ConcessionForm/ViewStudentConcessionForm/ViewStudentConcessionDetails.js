import React from 'react'
import { useLocation } from 'react-router-dom';
const ViewStudentConcessionDetails = () => {
    const location = useLocation();
    const student = location.state?.student; // Get student data from state
   
    if (!student) {
      return <p>No student data available.</p>;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Concession Form
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit={""}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="admissionNumber" className="form-label">
                                                Admission No
                                            </label>
                                            <p className='form-control'>{student.admissionNumber}</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="firstName" className="form-label">
                                                First Name
                                            </label>
                                            <p className='form-control'>{student.firstName}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {" "}
                                        <div className="mb-3">
                                            <label htmlFor="middleName" className="form-label">
                                                Middle Name
                                            </label>
                                            <p className='form-control'>{student.middleName}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {" "}
                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">
                                                Last Name
                                            </label>
                                            <p className='form-control'>{student.lastName}</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        {" "}
                                        <div className="mb-3">
                                            <label htmlFor="class" className="form-label">
                                                Class
                                            </label>
                                            <p className='form-control'>{student.class}</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        {" "}
                                        <div className="mb-3">
                                            <label htmlFor="section" className="form-label">
                                                Section
                                            </label>
                                            <p className='form-control'>{student.section}</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        {" "}
                                        <div className="mb-3">
                                            <label htmlFor="concessionType" className="form-label">
                                                Concession Type
                                            </label>
                                            <p className='form-control'>{student.concessionType}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        {" "}
                                        <div className="mb-3">
                                            <label htmlFor="castOrIncomeCertificate" className="form-label">
                                                Caste/Income Certificate
                                            </label>
                                            <p className='form-control'>{student.castOrIncomeCertificate}</p>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        {" "}
                                        <div className="mb-3">
                                            <label htmlFor="section" className="form-label">
                                                Applicable Academic Year
                                            </label>
                                            <p className='form-control'>{student.applicableAcademicYear}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Concession Details
                                    </h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0 table-hover table-centered text-center">
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
                                                <th>Installment</th>
                                                <th>Fees Type</th>
                                                <th>Total Fees</th>
                                                <th>Concession %</th>
                                                <th>Concession Amt.</th>
                                                <th>Balance Payable</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="form-check ms-1">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="customCheck2"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="customCheck2"
                                                        >
                                                            &nbsp;
                                                        </label>
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <div className="text"
                                    >
                                        {" "}
                                        <button
                                            type="button"
                                            className="btn btn-primary custom-submit-button"
                                            onClick={() => window.history.back()}
                                        >
                                            Back
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
export default ViewStudentConcessionDetails;
