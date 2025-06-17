import React from 'react'

const BalanceSheet = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">Balance Sheet</h4>
                                </div>
                            </div>
                            {/* <div id="receipt-content" className="salary-slip-box border-dark p-2" >
                                <h4 className="text-center custom-heading-font">
                                    <strong>FRANSALIAN EDUCATION SOCIETY</strong>
                                </h4>
                                <div className="row m-0 border border-dark" />

                                <h4 className="text-center custom-heading-font mt-2 mb-0">
                                    <strong> C1/102, JANAKPURI, NEW DELHI -110058</strong>
                                </h4>
                            </div> */}
                            <form onSubmit="">
                                <h4 className="payroll-title text-center mt-3 mb-2">
                                    BALANCE SHEET AS AT 31-03-2024
                                </h4>

                                <div className="table-responsive pb-4">
                                    <table className="table text-dark border border-dark mb-1">
                                        <thead>
                                            <tr className='payroll-table-header' >
                                                <th className="text-center w-40 align-content-center border border-dark p-2" >
                                                    LIABILITIES
                                                </th>
                                                <th className="text-center  align-content-center border border-dark p-2" >
                                                    SCH
                                                </th>
                                                <th className="text-center w-25 align-content-center border border-dark p-2" >
                                                    CURRENT YR.
                                                </th>
                                                <th className="text-center w-25 align-content-center border border-dark p-2" >
                                                    PREVIOUS YR.
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                <td className="text-start align-content-center border border-dark fw-bold p-2" >
                                                    Capital Fund
                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2" >
                                                    3,47,500
                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2" >
                                                    2,47,500
                                                </td>
                                            </tr>

                                            <tr className='payroll-table-body payroll-box-text fw-bold' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                                                    Non Current Liabilities
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Students Caution Deposits
                                                </td>
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Designated Fund
                                                </td>
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Secured & Unsecured Loan
                                                </td>
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body payroll-box-text fw-bold' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                                                    Current Liabilities
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0  border-bottom-0 fw-bold p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Students Caution Deposits
                                                </td>
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Fees Received in Advance
                                                </td>
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Sundry Creditors
                                                </td>
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Deductions & Recoveries
                                                </td>
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >

                                                </td>
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >
                                                    -
                                                </td>
                                            </tr>
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                <td className="text-start align-content-center border border-dark fw-bold p-2" >
                                                    Total
                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2" >
                                                    3,47,500
                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2" >
                                                    2,47,500
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <th className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >

                                                </th>
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-header' >
                                                <th className="text-center align-content-center border border-dark p-2" >
                                                    ASSETS
                                                </th>
                                                <th className="text-center align-content-center border border-dark p-2" >
                                                    SCH
                                                </th>
                                                <th className="text-center align-content-center border border-dark p-2" >
                                                    CURRENT YR.
                                                </th>
                                                <th className="text-center align-content-center border border-dark p-2" >
                                                    PREVIOUS YR.
                                                </th>

                                            </tr>
                                            <tr className='payroll-table-body payroll-box-text fw-bold' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                                                    Fixed Assets
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                            </tr>

                                            <tr className='payroll-table-body payroll-box-text fw-bold' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                                                    Non Current Assets
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Bank Fixed Deposits
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    12
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    7,70,89,079.00
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    9,02,82,967.00
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Specific Fund Saving Bank Account
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    13
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >
                                                    1,47,42,052.22
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >
                                                    98,45,334.22
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2 fw-bold" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                                                    9,18,31,131.22
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                                                    10,18,31,131.22
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <th className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >

                                                </th>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body payroll-box-text fw-bold' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                                                    Current Assets
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                                                    13
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                                                    2,15,34,081.84
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                                                    3,70,45,159.65
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Bank Balances
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    13
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                   2,15,34,081.84
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    3,50,27,238.00
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Fees Receivables
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    20
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    60,86,290.22
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    50,27,234.22
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Income Tax Refundable
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    19
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    10,64,290.22
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    11,80,234.22
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                   Cash in Hand
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    88,007.22
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    90,277.00
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    Loan & Advances
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                                                    18
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >
                                                    2,96,435.22
                                                </td>
                                                <td className="text-end align-content-center border border-dark border-top-0 border-bottom-1 p-2" >
                                                    1,04,030.00
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center fw-bold border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                                                    
                                                </td>
                                                <td className="text-end align-content-center fw-bold border border-dark border-top-0 border-bottom-0 p-2" >
                                                    
                                                </td>
                                                <td className="text-end align-content-center fw-bold border border-dark border-top-0 border-bottom-1 p-2" >
                                                    2,90,68,925.84
                                                </td>
                                                <td className="text-end align-content-center fw-bold border border-dark border-top-0 border-bottom-1 p-2" >
                                                    4,34,47,635.65
                                                </td>
                                            </tr>
                                                                                        <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                <td className="text-start align-content-center border border-dark fw-bold p-2" >
                                                    Total
                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2" >
                                                    12,09,00,057.06
                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2" >
                                                    14,35,75,936.87
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* <div className="text-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary custom-submit-button"
                                    >
                                        Proceed
                                    </button>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BalanceSheet