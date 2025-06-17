import React from 'react'

const ScheduleToIncome = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">Schedule to Income</h4>
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
                  SCHEDULES TO INCOME FOR THE YEAR ENDED 31-03-2024
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
                          School Income :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          1
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Tuition Fee
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Annual Fee
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Bus Fees
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          CBSE Examination Fee
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Admission Fees
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Registration Fee
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Late Fees and Excess Fees
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Transport  Fees Arrear Received
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                        <td className="text-center align-content-center border border-dark fw-bold p-2" >
                          Total
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          0
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          0
                        </td>
                      </tr>
                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Interest & Other Income :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          2
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Saving Bank Interest
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Fixed Deposit Interest
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          CBSE Exam Centre Receipt
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Tournament Entry Fees & Activity Sponsorship
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          NIOS Receipts
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Interest on Income Tax Refund
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Interest on Income Tax Refund
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                      </tr>

                      <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                        <td className="text-center align-content-center border border-dark fw-bold p-2" >
                          Total
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          0
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          0
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

export default ScheduleToIncome