import React from 'react'

const ViewEmployeeLoanStatement = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Loan Statement
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit="">

                                <div className="table-responsive mb-4">
                                    <table className="table mb-4" style={{ border: "1px solid black", color: "black", placeContent: "center" }}>
                                        <thead>
                                            <tr >
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Particulars
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Opening Balance
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Loan Added
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Loan Recovered
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Closing Balance
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Apr-24
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    10,000
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    1000
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    9000
                                                </td>

                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    May-24
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    9000
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    1000
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    8000
                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Jun-24
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    8000
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    1000
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    7000
                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Jul-24
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    7000
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    1000
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    6000
                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Aug-24
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    6000
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    1000
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    5000
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEmployeeLoanStatement