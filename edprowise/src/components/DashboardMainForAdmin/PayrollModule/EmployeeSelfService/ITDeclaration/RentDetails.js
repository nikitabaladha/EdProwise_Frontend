import React from 'react'

const RentDetails = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Rent Details
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit="">
                                {/* <div className="row mb-2">
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
                                </div> */}

                                <div className="table-responsive mb-4">
                                    <table className="table mb-4" style={{ border: "1px solid black", color: "black", placeContent: "center" }}>
                                        <thead>
                                            <tr >
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Month
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Declared Rent
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    City
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Name Of Landlord
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    PAN Of Landlord
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Address Of Landlord
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Upload Rent Receipt
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Actual HRA Received (A)
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Actual Rent Paid - 10% Of Basic Salary (B)
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    50% / 40% Of Basic Salary (C )
                                                </th>
                                                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    Min of A,B,C
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    January
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    10,000.00
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    13,000.00
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    February
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    March
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                April
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    May
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    June
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    July
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                August
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                September
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                October
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                November
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                December
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>
                                                    Total
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                    0
                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                </td>
                                                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

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

export default RentDetails