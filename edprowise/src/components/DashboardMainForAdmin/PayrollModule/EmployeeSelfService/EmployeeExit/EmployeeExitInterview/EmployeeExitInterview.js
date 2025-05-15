import React from 'react'

const EmployeeExitInterview = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="payroll-title text-center mb-0">
                                        Exit Interview
                                    </h4>
                                </div>
                            </div>
                            <div className="row m-0 mb-2 pt-2 salary-slip-box">
                                <div className="col-md-8">
                                    <p className='text-dark payroll-box-text'>
                                        <strong>Employee Name : </strong>Umesh jadhav
                                    </p>

                                    <p className='text-dark payroll-box-text'>
                                        <strong>Resignation Date  : </strong>Umesh jadhav
                                    </p>
                                </div>

                                <div className="col-md-4">
                                    <p className='text-dark payroll-box-text' >
                                        <strong>Employee ID : </strong>Emp-001
                                    </p>
                                    <p className='text-dark payroll-box-text' >
                                        <strong>LWD : </strong>Emp-001
                                    </p>
                                </div>
                            </div>
                            <form onSubmit="">
                                <div className="table-responsive mb-2">
                                    <table className="table border border-dark text-dark mb-2">
                                        <thead>
                                            <tr className="payroll-table-header">
                                                <th className="text-center align-content-center w-50 border border-dark p-2">
                                                    Questions
                                                </th>

                                                <th className="text-center align-content-center w-50 border border-dark p-2" >
                                                    Answer
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='payroll-table-body' >
                                                <td className="align-content-center p-2 border border-dark" >
                                                    How long were you thinking about leaving the school
                                                </td>
                                                <td className="align-content-center text-end p-2 border border-dark" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-start "
                                                        required

                                                    />
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="align-content-center p-2 border border-dark" >
                                                    What did you like most about working with the School?
                                                </td>
                                                <td className="align-content-center text-end p-2 border border-dark" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-start "
                                                        required
                                                    />
                                                </td>
                                            </tr>

                                            <tr className='payroll-table-body' >
                                                <td className="align-content-center p-2 border border-dark" >
                                                    What would you recommend us to do better and how?
                                                </td>
                                                <td className="text-end align-content-center p-2 border border-dark" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-start "
                                                        required

                                                    />
                                                </td>
                                            </tr>


                                            <tr className='payroll-table-body' >
                                                <td className="align-content-center p-2 border border-dark" >
                                                    Would you recommend our school to a friend as a good place to work?
                                                </td>
                                                <td className="text-end align-content-center p-2 border border-dark" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-start "
                                                        required

                                                    />
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="align-content-center p-2 border border-dark" >
                                                    How would you rate your relationship with your Principal?
                                                </td>
                                                <td className="text-end align-content-center p-2 border border-dark" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-start "
                                                        required

                                                    />
                                                </td>
                                            </tr>

                                            <tr className='payroll-table-body' >
                                                <td className="align-content-center p-2 border border-dark" >
                                                    Is the level/designation offered
                                                </td>
                                                <td className="text-end align-content-center p-2 border border-dark" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-start "
                                                        required

                                                    />
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="align-content-center p-2 border border-dark" >
                                                    Is the compensation offered
                                                </td>
                                                <td className="text-end align-content-center p-2 border border-dark" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-start "
                                                        required

                                                    />
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="align-content-center p-2 border border-dark" >
                                                    What is the compensation increase being offered
                                                </td>
                                                <td className="text-end align-content-center p-2 border border-dark" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-start "
                                                        required

                                                    />
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="align-content-center p-2 border border-dark" >
                                                    Could anything be done to improve your experience with the school
                                                </td>
                                                <td className="text-end align-content-center p-2 border border-dark" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-start "
                                                        required

                                                    />
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="align-content-center p-2 border border-dark" >
                                                    Submission Date
                                                </td>
                                                <td className="text-start align-content-center p-2 border border-dark" >
                                                    <input
                                                        type="date"
                                                        className="form-control payroll-table-body payroll-input-border text-start "
                                                        required

                                                    />
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
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

export default EmployeeExitInterview