import React from 'react'

const IncomeAndExpenditureAccount = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">Income & Expenditure Account</h4>
                </div>
              </div>
              <div id="receipt-content" className="salary-slip-box border-dark p-2" >
                <h4 className="text-center custom-heading-font">
                  <strong>FRANSALIAN EDUCATION SOCIETY</strong>
                </h4>
                <div className="row m-0 border border-dark" />

                <h4 className="text-center custom-heading-font mt-2 mb-0">
                  <strong> C1/102, JANAKPURI, NEW DELHI -110058</strong>
                </h4>
              </div>
              <form onSubmit="">
                <h4 className="payroll-title text-center mt-3 mb-2">
                  INCOME & EXPENDITURE ACCOUNT FOR THE YEAR ENDED 31-03-2024
                </h4>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center w-40 align-content-center border border-dark p-2" >
                          PARTICULARS
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
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

                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Income :
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
                          School Income
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          1
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          20,42,23,390.00
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Interest & Other Income
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          2
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          20,71,436.00
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
-
                        </td>
                      </tr>
                      
                      <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                        <td className="text-center align-content-center border border-dark fw-bold p-2" >
                          Total Income
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          20,62,94,826.00
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          -
                        </td>
                      </tr>
                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Expenditure :
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
                          Salary & Allowances
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          3
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                         16,77,85,961.00
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                         School Fee Concessions & Educational Assistance
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          4
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          1,70,51,655.00
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
-
                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Examination, Teaching Aids & Consumables
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          5
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          44,59,563.38
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                         Repairs & Maintenance 
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          6
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          1,66,46,851.40
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
-
                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Administration Expenses
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          7
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          39,86,970.93
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Sports, Games, Activities  & Functions
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          8
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          23,58,388.00
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
-
                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          School Transportion Expenses
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          9
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          1,16,99,966.10
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                         Depreciation
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          10
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          95,10,634.00
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
-
                        </td>
                      </tr>
                     <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                        <td className="text-center align-content-center border border-dark fw-bold p-2" >
                          Total Expenditure
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          23,34,9,989.81
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                      </tr>
                      <tr className='payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Net Surplus
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          2,72,05,163.81
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          
                        </td>
                      </tr>
                      <tr className='payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                        Net Deficit
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          
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

export default IncomeAndExpenditureAccount