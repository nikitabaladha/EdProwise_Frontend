import React from 'react'

const ScheduleToExpenditure = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">Schedule to Expenditure</h4>
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
                  SCHEDULES TO EXPENDITURE FOR THE YEAR ENDED 31-03-2024
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
                          Salary & Allowances  :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          3
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Staff Salary, Allowance & Bonus - Teaching Staff
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
                          Staff Salary, Allowance & Bonus -  Non Teaching Staff
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
                          Provision for Gratuity
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
                          Provision for Earned Leave
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
                          Security Guards & Contractual Staff
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
                          Staff Gratuity Paid
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
                          PF Management Contribution
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
                          Leave Encashment & Ex-Gratia Payment
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
                          ESI Contribution
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
                          Staff Welfare and Hospitality
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
                          PF Administration Charges & EDLI Contribution
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
                          Group D Uniform
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
                          Substitutes & Retainership
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
                          Staff Recruitment, Training & CBSE Capacity Programme
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
                          Scholarships, Fee Concessions & Educational Assistance :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          4
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          School Fee Concessions
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
                          Scholarship & Educational Assistance
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
                          Educational Assistance to Nagpur Fransalian Corporation
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
                          Examination, Teaching Aids & Consumables   :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          5
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Computer Aided Learning & Smart Class
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
                          Student Data & Fee Management Portal
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
                          CBSE  Exam Expenses
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
                          School Magazine & Students Newsletter
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
                          Printing, Stationery & Consumables
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
                          CBSE Exam Centre Expenses
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
                          Education Department, Affiliation Expenses, Board Fee
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
                          Teaching Aids
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
                          Examination Expenses
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
                          Laboratory  Expenses
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
                          News Paper, Periodicals & Cable TV
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
                          Work Sheets, Holiday Homework
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
                          School Diary, ID Card etc.
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
                          Students Consumables
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
                          Repairs & Maintenance  :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          6
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Repairs & Maintenance-Classrooms
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
                          Repairs & Maintenance-Furniture & Fixture
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
                          Computer & Software Maintenance
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
                          Repairs & Maintenance-Covid -19 Expenses & Sanitizers
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
                          Repairs & Maintenance- Electrical Fittings
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
                          Generator Expenses
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
                          Repair & Maintenance Equipment
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
                          Repairs & Maintenance-General
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
                          Garden & Playground  Expenses
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
                          Administration Expenses :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          7
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Rent ,Rates & Taxes
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
                          Electricity & Water
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
                          Audit Fees
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
                          Legal & Professional Charges
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
                         Telephone, Postage, Internet & Bank Charges
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
                          Travelling & Local Conveyance
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
                          Charity, Donations & Gifts
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
                          Sports, Games, Functions & Activities :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          8
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          Functions  & Seminars
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
                          Students Welfare & Medical Aid
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
                          Annual Day, Sports Day, & Parents Day Celeberation
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
                          Sports ,Games & Activities
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
                          Photography Expenses
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
                          School Transportation Expenses :
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >
                          9
                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                        <td className="text-end align-content-center border border-dark border-top-0 border-bottom-0 fw-bold p-2" >

                        </td>
                      </tr>
                      <tr className='payroll-table-body' >
                        <td className="text-start align-content-center border border-dark border-top-0 border-bottom-0 ps-3 p-2" >
                          School Bus Expenses
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
                          School Bus Expenses
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
                         School Bus Expenses
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

              </form>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ScheduleToExpenditure