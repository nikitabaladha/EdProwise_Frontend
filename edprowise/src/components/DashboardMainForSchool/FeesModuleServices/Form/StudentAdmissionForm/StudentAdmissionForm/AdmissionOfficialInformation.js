import React from 'react'

const AdmissionOfficialInformation = () => {
  return (

    <>
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Student Admission Details
                  </h4>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
  <table className="table table-bordered table-centered" style={{ width: 'auto', border: "1px solid black" }}>
    
    <tbody>
      <tr>
        <td style={{ border: "1px solid black" }}>Application Received Date</td>
        <td style={{ border: "1px solid black" }}>19/02/2025</td>
      </tr>
      <tr>
        <td style={{ border: "1px solid black" }}>Admission Fees Received By</td>
        <td style={{ border: "1px solid black" }}>Jone</td>
      </tr>
      <tr>
        <td style={{ border: "1px solid black" }}>Transaction No./Cheque No.</td>
        <td style={{ border: "1px solid black" }}>TRA-12345</td>
      </tr>
      <tr>
        <td style={{ border: "1px solid black" }}>Receipt No.</td>
        <td style={{ border: "1px solid black" }}>REC-12345</td>
      </tr>
      <tr>
        <td style={{ border: "1px solid black" }}>Date Of Receipt</td>
        <td style={{ border: "1px solid black" }}>19/02/2025</td>
      </tr>
      <tr>
        <td style={{ border: "1px solid black" }}>Admission No.</td>
        <td style={{ border: "1px solid black" }}>ADM-SFS-000001</td>
      </tr>
    </tbody>
  </table>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default AdmissionOfficialInformation;