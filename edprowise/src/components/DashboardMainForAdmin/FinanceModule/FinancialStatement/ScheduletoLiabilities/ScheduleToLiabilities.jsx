import React from 'react'

const ScheduleToLiabilities = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">Schedule to Liabilities</h4>
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
                  SCHEDULE FOR CAPITAL FUND AS AT 31-03-2024
                </h4>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center w-30 align-content-center border border-dark p-2" >
                          PARTICULARS
                        </th>
                        <th className="text-center  align-content-center border border-dark p-2" >
                          SCH
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          OPENING BALANCE
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          DEBIT
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          CREDIT
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          CLOSING BALANCE
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Capital Fund :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          11
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

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
                          Opening Balance
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          ###
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          2,47,500
                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Net Surplus
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

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
                          Net Deficit
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          1,00,000
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          1,00,000
                        </td>
                      </tr>
                      <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                        <td className="text-center align-content-center border border-dark fw-bold p-2" >
                          Total
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          ###
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          1,00,000
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          3,47,500
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="payroll-title text-center mt-3 mb-2">
                 SCHEDULE FOR NON CURRENT LIABILITIES AS AT 31-03-2024
                </h4>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center w-30 align-content-center border border-dark p-2" >
                          PARTICULARS
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          SCH
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          OPENING BALANCE
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          DEBIT
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          CREDIT
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          CLOSING BALANCE
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Depreciation Reserve Fund :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          12
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

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
                         Depreciation Reserve Fund
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                        
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
                          
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                         
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center w-30 align-content-center border border-dark p-2" >
                          PARTICULARS
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          SCH
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          OPENING BALANCE
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          DEBIT
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          CREDIT
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          CLOSING BALANCE
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Students Caution Deposits :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          13
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

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
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          
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
                          
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center w-30 align-content-center border border-dark p-2" >
                          PARTICULARS
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          SCH
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          OPENING BALANCE
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          DEBIT
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          CREDIT
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          CLOSING BALANCE
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Designated Fund :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          14
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

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
                          Development Fund
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          
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
                          Activity Fund
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

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
                          Art & Craft Fund
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

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
                        
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center w-30 align-content-center border border-dark p-2" >
                          PARTICULARS
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          SCH
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          OPENING BALANCE
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          DEBIT
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          CREDIT
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          CLOSING BALANCE
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Secured & Unsecure Loan :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          15
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

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
                          Loan from CICS (Unsecured)
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          
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
                        Loan from HDFC A/c No. (Secured)
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

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
                          
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                         
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="payroll-title text-center mt-3 mb-2">
                  SCHEDULE FOR CURRENT LIABILITIES AS AT 31-03-2024
                </h4>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center w-30 align-content-center border border-dark p-2" >
                          PARTICULARS
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          SCH
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          OPENING BALANCE
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          DEBIT
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          CREDIT
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          CLOSING BALANCE
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Students Caution Deposits :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          16
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

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
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          
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
                          
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center w-30 align-content-center border border-dark p-2" >
                          PARTICULARS
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          SCH
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          OPENING BALANCE
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          DEBIT
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          CREDIT
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          CLOSING BALANCE
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Fees Received in Advance :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          17
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

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
                          Fees Received in Advance
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          
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
                          
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                         
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center w-30 align-content-center border border-dark p-2" >
                          PARTICULARS
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          SCH
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          OPENING BALANCE
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          DEBIT
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          CREDIT
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          CLOSING BALANCE
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Sundry Creditors :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          15
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

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
                          EdProwise Pvt. Ltd
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          
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
                        
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center w-30 align-content-center border border-dark p-2" >
                          PARTICULARS
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          SCH
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          OPENING BALANCE
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          DEBIT
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          CREDIT
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark p-2" >
                          CLOSING BALANCE
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          Deductions & Recoveries :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          15
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

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
                         Provident Fund
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >
                          
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
                          ESI Fund
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

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
                          Tax Deducted at Source
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

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
                          Professional Tax
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 p-2" >

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
                         
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                         
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                         
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
    </div >
  )
}

export default ScheduleToLiabilities