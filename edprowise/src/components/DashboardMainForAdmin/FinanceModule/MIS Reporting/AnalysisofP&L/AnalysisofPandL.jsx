import React from 'react'

const AnalysisofPandL = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">Analysis of P&L</h4>
                                </div>
                            </div>
                            {/* <div id="receipt-content" className=" p-2" >
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
                                    INCOME & EXPENDITURE ACCOUNT
                                </h4>
                                <div className="table-responsive pb-4">
                                    <table className="table text-dark border border-dark mb-1">
                                        <thead>
                                            <tr className='payroll-table-header' >
                                                <th rowSpan={3} className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    PARTICULARS
                                                </th>
                                                <th rowSpan={3} className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    SCH
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Act/Bud
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Act/Bud
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Act/Bud
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Act/Bud
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Act/Bud
                                                </th>
                                                <th rowSpan={2} className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Var.
                                                </th>
                                                <th rowSpan={2} className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Var.
                                                </th>
                                                <th rowSpan={2} className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Var.
                                                </th>
                                                <th rowSpan={2} className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Var.
                                                </th>
                                                <th rowSpan={2} className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Var.
                                                </th>
                                            </tr>
                                            <tr className='payroll-table-header' >

                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Scenario 1
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Scenario 2
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Scenario 3
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Scenario 4
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Scenario 5
                                                </th>
                                            </tr>
                                            <tr className='payroll-table-header' >

                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    A
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    B
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    C
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    D
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    E
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >

                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >

                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >

                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >

                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap fw-bold p-2">
                                                    Income
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    ff
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    School Income
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    1
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    00
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    00
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Interest Income & Other Receipts
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    2
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    20,71,436
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    17,97,989.95
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Donation Received
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    1,500
                                                </td>
                                            </tr>

                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="text-center align-content-center border border-dark text-nowrap ps-3 fw-bold p-2">
                                                    Total
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    ###
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    #####
                                                </td>
                                            </tr>

                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap fw-bold p-2">
                                                    Expenditure :
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Salary & Allowances
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    3
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    ###
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    #####
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Scholarships, Fee Concessions & Educational Assistance
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    4
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    ####
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    #####
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Examination, Teaching Aids & Consumables
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    5
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    44,59,563.38
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    47,45,716.43
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Repairs & Maintenance
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    6
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    ###
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    34,18,369.50
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Administration Expenses
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    7
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    39,86,970.93
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    30,65,565.24
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Sports, Games, Activities  & Functions
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    8
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    23,58,338.38
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    47,45,716.43
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    School Transportion Expenses
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    9
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    ###
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    3,54,417.00
                                                </td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Depreciation
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    10
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    95,10,634.00
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    52,95,089.00
                                                </td>
                                            </tr>
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="text-center align-content-center border border-dark text-nowrap ps-3 fw-bold p-2">
                                                    Total Expenditure
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    ###
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    #####
                                                </td>
                                            </tr>
                                              <tr className='payroll-table-body fw-bold'>
                                                <td className="text-start align-content-center border border-dark  ps-3 fw-bold p-2">
                                                    Excess of Income over Expenditure/ (Excess of Expenditure over Income)
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                               ###
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    -
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td rowSpan={2} className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    30,56,420.98
                                                </td>
                                            </tr>
                                             <tr className='payroll-table-body fw-bold'>
                                                <td className="text-start align-content-center border border-dark  ps-3 fw-bold p-2">
                                                 Margin %
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                               -13%
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    0%
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    0%
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    0%
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    0%
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
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

export default AnalysisofPandL