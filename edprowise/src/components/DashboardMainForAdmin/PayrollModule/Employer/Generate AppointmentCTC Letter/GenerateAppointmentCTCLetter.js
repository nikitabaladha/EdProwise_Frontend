import React, { useState } from 'react'

const GenerateAppointmentCTCLetter = () => {
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
                                        Appointment/CTC Letter
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
                                    {/* </div> */}


                                </div>
                                {showForm && (
                                    <>
                                        <div id="receipt-content" className="border border-dark p-3">

                                            <div className="text-center mb-3">
                                                <h3>
                                                    <strong>APPOINTMENT/CTC LETTER</strong>
                                                </h3>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-6">
                                                    <p style={{ color: 'black' }}>
                                                        Name of Employee : Umesh jadhav
                                                    </p>

                                                    <p style={{ color: 'black' }}>
                                                        Address of Employee: Nashik
                                                    </p>
                                                    <p style={{ color: 'black' }}>
                                                        Grade: A
                                                    </p>
                                                    <p style={{ color: 'black' }}>
                                                        Designation: Teacher
                                                    </p>
                                                    <p style={{ color: 'black' }}>
                                                        Category of Employees: Teaching Staff
                                                    </p>
                                                </div>

                                                <div className="col-6">
                                                    <p style={{ color: 'black' }}>
                                                        Date: 08-05-2025
                                                    </p>
                                                    <p style={{ color: 'black' }}>
                                                        Date of Joining: 08-05-2025
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row pt-3 mb-2" style={{ borderTop: "1px solid black" }} />
                                            <div className="row mb-2">
                                                <div className="col-12">
                                                    <p style={{ color: 'black' }}>
                                                        Welcome to the opportunity to make a valuable difference!
                                                    </p>

                                                    <p style={{ color: 'black' }}>
                                                        We are proud to invite you to join our institution and are pleased to offer you .
                                                    </p>
                                                    <p style={{ color: 'black' }}>
                                                        We look forward to your dedication and commitment as we work together and wish you many fruitful years here. We expect you to be a critical pillar.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="row pt-3 mb-2" style={{ borderTop: "2px solid black" }} />
                                            <div className="row mb-2">
                                                <div className="col-12">
                                                    <h4 style={{ color: 'black' }}>
                                                        Below is the CTC Components:
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="table-responsive mb-4">
                                                <table className="table mb-4" style={{ border: "1px solid black", color: "black", placeContent: "center" }}>
                                                    <thead>
                                                        <tr >
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Components
                                                            </th>
                                                            <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Annual Amount
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
                                                        </tr>
                                                        <tr >
                                                            <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                HRA
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                5,000.00
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                PF Contribution
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                1,000.00
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                Total Annual Gross
                                                            </td>
                                                            <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                16,000.00
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Gratuity
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                900.00
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                Bonus
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                1,000.00
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                                Annual Cost to Institution
                                                            </td>
                                                            <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                                17,900.00
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="row pt-3 mb-2" style={{ borderTop: "2px solid black" }} />
                                            <div className="row mb-2">
                                                <div className="col-12">
                                                    <h4 style={{ color: 'black' }}>
                                                        Explanation/Others:
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="row pt-3 mb-2" style={{ borderTop: "1px solid black" }} />
                                            <div className="row mb-2">
                                                <div className="col-12">
                                                    <p style={{ color: 'black' }}>
                                                        Gratuity: Employees are entitled to payment of Gratuity of 15 days of Basic Pay, for every year of completed service once they complete 5 years in the company, as per the Payment of Gratuity Act 1972. In the event the employee ceases to be in employment before completion of five years, this benefit will be forfeited.
                                                    </p>
                                                    <div className="row pt-3 mb-2" style={{ borderTop: "1px solid black" }} />

                                                    <p style={{ color: 'black' }}>
                                                        Provident Fund: You will be governed by the provisions of The Employees Provident Fund & Misc. Provisions Act, 1952.
                                                    </p>
                                                    <div className="row pt-3 mb-2" style={{ borderTop: "1px solid black" }} />

                                                    <p style={{ color: 'black' }}>
                                                        It is mandatory that all information provided/declared by you as part of your offer/appointment with the Company, must be true and accurate. In the event of any suppression of facts or falsification of information, your services are liable to be terminated, without any notice.
                                                    </p>
                                                    <div className="row pt-3 mb-2" style={{ borderTop: "1px solid black" }} />

                                                    <p style={{ color: 'black' }}>
                                                        You will be called upon to attend your duties as and when required in shifts, on holidays or Sundays in accordance with the exigencies. In view of your position, it may be required to undertake such work and also undertake tours and travels, as and when necessary. You will be compensated for the same as per the Company rules.
                                                    </p>
                                                    <div className="row pt-3 mb-2" style={{ borderTop: "1px solid black" }} />

                                                    <p style={{ color: 'black' }}>
                                                        You will be responsible for maintaining the secrecy and confidentiality and shall not divulge/disclose to anyone the information obtained by you during the course of your employment. The same is applicable with respect to all the software or technical developments made by you or you had associated with during your service.
                                                    </p>
                                                    <div className="row pt-3 mb-2" style={{ borderTop: "1px solid black" }} />

                                                    <p style={{ color: 'black' }}>
                                                        Your services are liable to be transferred to any other department, branch office or any other establishment anywhere in India or abroad at the sole discretion of the Management. In such events, you will be governed by the terms and conditions, as applicable at the place of transfer.
                                                    </p>
                                                    <div className="row pt-3 mb-2" style={{ borderTop: "1px solid black" }} />

                                                    <p style={{ color: 'black' }}>
                                                        You will be eligible for Leave as per prevailing rules and entitlements in line with the Company’s Leave Policy, made available to all employees on the institution Intranet portal. You will be able to access the portal on your joining. The rules and entitlements of Leave are subject to periodic review and all employees will be governed by any changes that may be brought in, at any later date.
                                                    </p>
                                                    <div className="row pt-3 mb-2" style={{ borderTop: "1px solid black" }} />
                                                    
                                                    <div className="row mt-4 text-dark">
                                                        <div className="col-6 text-start">
                                                            <p style={{ color: 'black' }}>
                                                                <strong>Signature Of Principal</strong>
                                                            </p>
                                                        </div>
                                                        <div className="col-6 text-end">
                                                            <p style={{ color: 'black' }}>
                                                                <strong>Received & Accepted</strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

export default GenerateAppointmentCTCLetter