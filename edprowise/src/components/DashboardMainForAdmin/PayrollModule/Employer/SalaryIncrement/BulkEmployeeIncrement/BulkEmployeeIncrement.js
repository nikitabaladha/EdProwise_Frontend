import React from 'react'

const BulkEmployeeIncrement = () => {
  return (
    <div className="container">
    <div className="row">
      <div className="col-xl-12">
        <div className="card m-2">
          <div className="card-body">
            <div className="container">
              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                Bulk Employee Increment
                </h4>
              </div>
            </div>
            <form onSubmit="">
              <div className="table-responsive mb-4">
                <table className="table mb-4" style={{ border: "1px solid black", color: "black" }}>
                  <thead>
                    <tr>
                      <th colSpan={5} className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>

                      </th>
                      <th colSpan={2} className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                        
                      </th>
                      <th colSpan={3} className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                        Salary Components (Old)
                      </th>
                      <th colSpan={3} className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                        Salary Components (Revised)
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
                       Increment %
                      </th>
                      <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                        Applicable From
                      </th>
                      <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                        Basic Salary
                      </th>
                      <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                       HRA
                      </th>
                      <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                       Gross Earning
                      </th>
                      <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                        Basic Salary
                      </th>
                      <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                        HRA
                      </th>
                      <th className="text-center align-content-center p-2" style={{ border: "1px solid black",fontSize: "1.1rem" }}>
                      Gross Earning
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


              <div className="d-flex justify-content-end mt-3">
                <div className="mr-2">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit For Principal Approval
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

export default BulkEmployeeIncrement