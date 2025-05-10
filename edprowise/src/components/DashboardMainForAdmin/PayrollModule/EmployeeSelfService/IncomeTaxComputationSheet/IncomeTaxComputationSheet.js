import React from 'react'

const IncomeTaxComputationSheet = () => {
  return (
    <div className="container my-4 text-dark" style={{ padding: 16 }}>
      {/* <div class="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
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
                    <button className="btn btn-light btn-sm"
                    >
                        <iconify-icon
                            icon="solar:eye-broken"
                            className="align-middle fs-18"
                        />
                    </button>
                    </div>
                    <div className="d-flex">
                    <button className="btn btn-light me-2">
                        <FaPrint /> Print
                    </button>
    
                    <button className="btn btn-light">
                        <FaDownload /> Download PDF
                    </button>
                    </div>
                </div> */}

      <div id="receipt-content" className="border border-dark p-3">
        <div className="text-center mb-3">
          <h6>
            <strong>[From Letter Head]</strong>
          </h6>
        </div>
        <h6 className="text-center bg-light py-1">
          <strong>TAX COMPUTATION</strong>
        </h6>
        <div className="row mb-2">
          <div className="col-6">
            <p style={{ color: 'black' }}>
              <strong>Name :</strong> Umesh Jadhav
            </p>
            <p style={{ color: 'black' }}>
              <strong>Employee No:</strong> 1
            </p>
            <p style={{ color: 'black' }}>
              <strong>PF No :</strong> 123456
            </p>
          </div>

          <div className="col-6">
            <p style={{ color: 'black' }}>
              <strong>Grade :</strong> A
            </p>
            <p style={{ color: 'black' }}>
              <strong>Job Designation :</strong> Teacher
            </p>
            <p style={{ color: 'black' }}>
              <strong>Security Deposit :</strong> 500
            </p>
          </div>
        </div>

        <div className="row pt-3 mb-2" style={{ borderTop: "2px solid black" }} />
        <div className="table-responsive mb-4">
          <table className="table mb-4" style={{ border: "1px solid black", color: "black" }}>
            <thead>
              <tr>
                <th className="text-center p-2" style={{ border: "1px solid black" }}>

                </th>
                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                  Actual Salary
                </th>
                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                  projection
                </th>
                <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                  Total
                </th>

              </tr>
            </thead>
            <tbody>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                  No.Of Months
                </td>
                <td className="align-content-center text-center p-2" style={{ border: "1px solid black" }}>
                  3
                </td>
                <td className="align-content-center text-center p-2" style={{ border: "1px solid black" }}>
                  9
                </td>
                <td className="align-content-center text-center p-2" style={{ border: "1px solid black" }}>

                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                  Basic Salary
                </td>
                <td className="align-content-center text-center p-2" style={{ border: "1px solid black" }}>
                  1,00,000.00
                </td>
                <td className="align-content-center text-center p-2" style={{ border: "1px solid black" }}>
                  9,00,000.00
                </td>
                <td className="align-content-center text-center p-2" style={{ border: "1px solid black" }}>
                  10,00,000.00
                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                  HRA
                </td>
                <td className="align-content-center text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="align-content-center text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="align-content-center text-center p-2" style={{ border: "1px solid black" }}>

                </td>
              </tr>
              <tr >
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
              </tr>
              <tr >
                <td className="align-content-center fw-bold p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>
                  Income From Salary
                </td>
                <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>

                </td>
                <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>

                </td>
                <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>
                  10,00,000.00
                </td>
              </tr>
              <tr >
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                  Less: HRA Exemption
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                  10,000.00
                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black"}}>
                  Less: Standard Deduction
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black", }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                  75,000.00
                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                  Less: Section 80C
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                  1,50,000.00
                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black", }}>
                  Less: Section 80D
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                  20,000.00
                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                  Less: Other Section
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black",  }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                  45,000.00
                </td>
              </tr>
              <tr >
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black",  }}>
                  Net Taxable Income
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black", }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black", }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black", }}>
                  7,00,000.00
                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                  Total Tax Incl Education Cess
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                  Rebate 87A (New Regime: If Net Taxable Income is upto 7 Lakhs,Old Regime: If Net Taxable Income is upto 5 Lakhs)
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                  Net Tax Payable
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black"}}>
                  Tax already deducted
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black",}}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black", }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
              </tr>
              <tr >
                <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                  Tax yet to be deducted
                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black", }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
                <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default IncomeTaxComputationSheet