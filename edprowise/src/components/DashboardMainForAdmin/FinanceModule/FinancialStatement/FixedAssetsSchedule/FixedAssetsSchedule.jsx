import React from 'react'

const FixedAssetsSchedule = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">Fixed Assets Schedule</h4>
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
                  SCHEDULE OF FIXED ASSETS FOR THE YEAR ENDED 31-03-2024
                </h4>

                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className='payroll-table-header' >
                        <th colSpan={8} className="text-start align-content-center border border-dark p-2" >
                          SCHEDULE 10
                        </th>
                      </tr>

                      <tr className='payroll-table-header' >
                        <th rowSpan={2} className="text-center w-25 align-content-center border border-dark p-2" >
                          Particulars
                        </th>
                        <th rowSpan={2} className="text-center align-content-center border border-dark p-2" style={{width:"100px"}}>
                          Rate
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          WDV
                        </th>
                        <th colSpan={2} className="text-center align-content-center border border-dark p-2" >
                          Addition
                        </th>
                        <th rowSpan={2} className="text-center align-content-center border border-dark p-2" >
                          Total Addition
                        </th>
                        <th rowSpan={2} className="text-center align-content-center border border-dark p-2" >
                          Depreciation
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          WDV
                        </th>
                      </tr>
                      <tr className='payroll-table-header' >

                        <th className="text-center align-content-center border border-dark p-2" >
                          Opening Balance
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          1ST Half
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          2ST Half
                        </th>
                        <th className="text-center align-content-center border border-dark p-2" >
                          Closing Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark   p-2" >
                          Auditorium - Fixture & Equipment
                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >
                          25%
                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >
                          29,46,928
                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >
                          7,36,732
                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >
                          22,10,196
                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark   p-2" >
                          Furniture & Fixture
                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >
                          25%
                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >
                          45,08,146
                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark  p-2" >

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
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2" >
                          0
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default FixedAssetsSchedule