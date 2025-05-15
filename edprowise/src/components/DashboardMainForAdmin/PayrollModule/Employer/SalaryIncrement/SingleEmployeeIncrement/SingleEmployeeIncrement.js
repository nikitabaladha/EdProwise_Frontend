import React, { useState } from 'react'

const SingleEmployeeIncrement = () => {
    const [showForm, setShowForm] = useState(false);

    const handleProceed = () => {
        setShowForm(true);
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card m-2">
                            <div className="card-body">
                                <div className="container">
                                    <div className="card-header mb-2">
                                        <h4 className="card-title text-center custom-heading-font">
                                            IT Declaration
                                        </h4>
                                    </div>
                                </div>
                                <form onSubmit="">
                                    {/* <div className='d-flex'> */}
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
                                            <div className="row mb-2 mt-4">
                                                <div className="col-6">
                                                    <p style={{ color: 'black' }}>
                                                        Employee Name : Umesh jadhav
                                                    </p>

                                                    <p style={{ color: 'black' }}>
                                                        Category of Employees : Teaching Staff
                                                    </p>
                                                </div>

                                                <div className="col-6">
                                                    <p style={{ color: 'black' }}>
                                                        Grade : A
                                                    </p>

                                                    <p style={{ color: 'black' }}>
                                                        Designation : Teacher
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="row mb-2 mt-4">
                                            <h6 className="card-title  custom-heading-font">
                                                Enter Increment Details :
                                            </h6>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="mb-6">
                                                        <label htmlFor="incrementPercentage" className="form-label">
                                                            Increment %
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="incrementPercentage"
                                                            name="incrementPercentage"
                                                            className="form-control"
                                                            required
                                                            placeholder='Enter Increment Percentage'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="applicableFromDate" className="form-label">
                                                            Applicable From
                                                        </label>
                                                        <input
                                                            type="date"
                                                            id="applicableFromDate"
                                                            name="applicableFromDate"
                                                            className="form-control"
                                                            // value={formData.applicableFromDate}
                                                            // onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="table-responsive mb-4">
                                                <table className="table mb-4" style={{ border: "1px solid black", color: "black", placeContent: "center" }}>
                                                    <thead>
                                                        <tr >
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.3rem" }}>
                                                                Components
                                                            </th>
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.3rem" }}>
                                                                Old Amount
                                                            </th>
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.3rem" }}>
                                                                Revised Amount
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr >
                                                            <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Basic Salary
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                10,000.00
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                        </tr>

                                                        <tr >
                                                            <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                HRA
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                5,000.00
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                        </tr>

                                                        <tr >
                                                            <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                PF Contribution
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                1,000.00
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                        </tr>

                                                        <tr >
                                                            <td className="align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                Total Annual Gross
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                16,000.00
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                        </tr>

                                                        <tr >
                                                            <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Gratuity
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                900.00
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                        </tr>

                                                        <tr >
                                                            <td className="align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                Annual Cost To Institution
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                16,900.00
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>

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
                                                    Submit For Principal Approval
                                                </button>
                                            </div>
                                        </>
                                    )}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleEmployeeIncrement