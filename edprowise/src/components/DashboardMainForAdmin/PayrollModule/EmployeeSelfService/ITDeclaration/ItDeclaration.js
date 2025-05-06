import React, { useState } from 'react'

const ItDeclaration = () => {
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
                                    </div>

                                    <div className="text-end">
                                        <button
                                            type="button"
                                            className="btn btn-primary custom-submit-button"
                                            onClick={handleProceed}
                                        >
                                            Proceed
                                        </button>
                                    </div>

                                    {showForm && (
                                        <>
                                            <div className="row mb-2">
                                                <div className="col-6">
                                                    <p style={{ color: 'black' }}>
                                                        Employee Name : Umesh jadhav
                                                    </p>

                                                    <p style={{ color: 'black' }}>
                                                        Tax Regime :
                                                    </p>
                                                </div>

                                                <div className="col-6">
                                                    <p style={{ color: 'black' }}>
                                                        Financial Year: 2025-26
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="table-responsive mb-4">
                                                <table className="table mb-4" style={{ border: "1px solid black", color: "black", placeContent: "center" }}>
                                                    <thead>
                                                        <tr >
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Investment
                                                            </th>
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Limit
                                                            </th>
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Declared
                                                            </th>
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Proof Submitted
                                                            </th>
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Maximum Deduction
                                                            </th>
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Upload Document
                                                            </th>
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Admin Remarks
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr style={{ fontWeight: "bold" }} >
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                                Section 80C
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                                #####
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                                #####
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                                1,70,000.00
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                                1,50,000.00
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                                <input
                                                                    type="file"
                                                                    className="form-control"
                                                                    accept="image/*,application/pdf"
                                                                    // onChange={handleChange}
                                                                    required
                                                                />
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>

                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Life Insurance Premium including Bima Nivesh( only Self , Spouse and children)
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                40,000.00
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                40,000.00
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="text-center p-2" style={{ border: "1px solid black" }}>
                                                                Provident Fund
                                                            </td>
                                                            <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                            <td className="text-center p-2" style={{ border: "1px solid black" }}>
                                                                50,000.00
                                                            </td>
                                                            <td className="text-center p-2" style={{ border: "1px solid black" }}>
                                                                50,000.00
                                                            </td>
                                                            <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                            <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                            <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                Other Section
                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                45,000.00
                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                45,000.00
                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                        </tr>

                                                        <tr >
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                HRA Exemption
                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                10,000.00
                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                10,000.00
                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                10,000.00
                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-link p-0"
                                                                    // onClick={handleNavigateToRentDetails}
                                                                    style={{
                                                                        color: "black",
                                                                        textDecoration: "underline",
                                                                        fontWeight: "bold",
                                                                        fontSize:"1rem"
                                                                    }}
                                                                >
                                                                    Enter Rent Details
                                                                </button>
                                                            </td>
                                                            <td className="text-center fw-bold p-2" style={{ border: "1px solid black" }}>

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

        </>
    )
}

export default ItDeclaration