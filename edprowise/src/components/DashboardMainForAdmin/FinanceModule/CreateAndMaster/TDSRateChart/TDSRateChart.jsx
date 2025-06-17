import React from 'react'

const TDSRateChart = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">TDS Rate Chart</h4>
                </div>
              </div>

              <form onSubmit="">
                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                          Section
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                          Nature of Transaction
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                          Threshold Limit-Single
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                          Threshold Limit-Aggregate
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                          Tax Rate (Individual)
                        </th>
                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                          Tax Rate (Others)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark  p-2" >
                          194C
                        </td>
                        <td className="text-Start align-content-center border border-dark  p-2" >
                          Payment to Contractor/Sub Contractor
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          30,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          1,00,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          1%
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          2%
                        </td>
                      </tr>

                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark  p-2" >
                          194E
                        </td>
                        <td className="text-start align-content-center border border-dark  p-2" >
                          Payment to Non Resident Sports Man/ Sports Association
                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >
                          1
                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >
                          1
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          20.80%
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          20.80%
                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark  p-2 text-nowrap" >
                          194I
                        </td>
                        <td className="text-start align-content-center border border-dark p-2 text-nowrap" >
                          Rent on Plan & Machinery
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          2,40,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          2,40,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          2%
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          2%
                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark p-2 text-nowrap" >
                          194I
                        </td>
                        <td className="text-start align-content-center border border-dark p-2 text-nowrap" >
                          Rent on Land/Building/Furniture/Fitting
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          2,40,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          2,40,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          10%
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          10%
                        </td>
                      </tr>
                      <tr className='payroll-table-body payroll-box-text fw-bold' >
                        <td className="text-start align-content-center border border-dark  p-2" >
                          194IA
                        </td>
                        <td className="text-start align-content-center border border-dark  p-2" >
                          Payment in consideration of transfer of certain immovable property other than agricultural land.
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          50,00,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          50,00,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          1%
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          1%
                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark  p-2 text-nowrap" >
                          194J
                        </td>
                        <td className="text-start align-content-center border border-dark  p-2 " >
                          Any sum paid by way of fee for professional services (Legal Service,Medical Service, Engineering Services, Architectural, Accountancy, Interior, Advertising)
                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >
                          30,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          30,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          10%
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          10%
                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark  p-2 text-nowrap" >
                          194J
                        </td>
                        <td className="text-start align-content-center border border-dark p-2 text-nowrap" >
                          Any sum paid as a fee for technical services (Technology Services)
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          30,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          30,000
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          2%
                        </td>
                        <td className="text-end align-content-center border border-dark p-2" >
                          2%
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

export default TDSRateChart