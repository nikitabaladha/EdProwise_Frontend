import React from 'react'

const AddProcessPayroll = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Payroll Process
                  </h4>
                </div>
              </div>
              <form onSubmit="">
                <div class="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <label for="yearSelect" class="mb-0">Year :</label>
                    <select id="yearSelect" class="custom-select" aria-label="Select Year">
                      <option selected>2025</option>
                      <option>2026</option>
                      <option>2027</option>
                      <option>2028</option>
                      <option>2029</option>
                    </select>

                    <label for="monthSelect" class="mb-0">Month :</label>
                    <select id="monthSelect" class="custom-select" aria-label="Select Month">
                      <option selected>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December.</option>
                    </select>
                  </div>
                </div>
                <div className="table-responsive mb-4">
                  <table className="table mb-4" style={{ border: "1px solid black", color: "black" }}>
                    <thead>
                      <tr>
                        <th colSpan={5} className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>

                        </th>
                        <th colSpan={4} className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Days
                        </th>
                        <th colSpan={12} className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Salary Components
                        </th>
                      </tr>
                      <tr>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Employee ID
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Employee Name
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.1rem" }}>
                          Grade
                        </th>

                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.1rem" }}>
                          Designation
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.1rem" }}>
                          Category
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.1rem" }}>
                          Total Days In A Month
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Paid Days
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Regularization Leave
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Paid Leave Deduction
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Basic Salary
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          HRA
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Variable Pay
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Overtime Allowance
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Bonus
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Gross Earning
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black" ,fontSize: "1.1rem"}}>
                          PF Deduction
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Income Tax
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Professional Tax
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                          Paid Leave Deduction
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.1rem" }}>
                          Gross Deduction
                        </th>
                        <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.1rem" }}>
                          Net Salary
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr >
                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                          Emp-001
                        </td>
                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                          Umesh Jadhav
                        </td>
                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                          A
                        </td>
                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                          Teacher 
                        </td>
                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                        Teaching Staff
                        </td>
                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                          31
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
                          0
                        </td>
                        <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                          0
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className="d-flex justify-content-end mt-3">
                  <div className="mr-2">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Submit For Principal Approval
                    </button>
                  </div>
                  <div className="text" style={{ marginLeft: "1rem" }}>
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"

                    >
                      Proceed For Payment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProcessPayroll