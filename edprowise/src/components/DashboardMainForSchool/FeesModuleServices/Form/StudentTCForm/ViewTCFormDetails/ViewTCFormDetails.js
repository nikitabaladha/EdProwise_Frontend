import React from 'react'
import { useLocation } from 'react-router-dom';
const ViewTCFormDetails = () => {
  const location = useLocation();
  const student = location.state?.student; // Get student data from state
  
  if (!student) {
    return <p>No student data available.</p>;
  }
  return (
    <div className="container">
    <div className="row">
      <div className="col-xl-12">
        <div className="card m-2">
          <div className="card-body custom-heading-padding">
            <div className="container">
              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                Transfer Certificate Form
                </h4>
              </div>
            </div>
            <form onSubmit={""}>
              <div className="row">
              <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="admissionNumber" className="form-label">
                      Admission No
                    </label>
                    <p className='form-control'>{student.admissionNumber}</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <p className='form-control'>{student.firstName}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="middleName" className="form-label">
                      Middle Name
                    </label>
                    <p className='form-control'>{student.middleName}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <p className='form-control'>{student.lastName}</p>
                  </div>
                </div>
                
          
                <div className="col-md-2">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfBirth"
                      className="form-label"
                    >
                      Date Of Birth
                    </label>
                    <p className='form-control'>{student.dateOfBirth}</p>
                  </div>
                </div>
                <div className="col-md-2">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                      age
                    </label>
                    <p className='form-control'>{student.age}</p>
                  </div>
                </div>

                <div className="col-md-2">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="nationality" className="form-label">
                      Nationality
                    </label>
                    <p className='form-control'>{student.nationality}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="fatherName" className="form-label">
                      Father Name
                    </label>
                    <p className='form-control'>{student.fatherName}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="motherName" className="form-label">
                      Mother Name
                    </label>
                    <p className='form-control'>{student.motherName}</p>
                  </div>
                </div>                 
              </div>

            

              <div className="row">
              <div className="col-md-3">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfIssue"
                      className="form-label"
                    >
                      Date Of Issue
                    </label>
                    <p className='form-control'>{student.dateOfIssue}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfAdmission"
                      className="form-label"
                    >
                      Date Of Admission In School
                    </label>
                    <p className='form-control'>{student.dateOfAdmission}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="studentLastClass" className="form-label">
                      Class in Which Student Studied Last
                    </label>
                    <p className='form-control'>{student.studentLastClass}</p>
                  </div>
                </div>
                
                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="percentageObtainInLastExam" className="form-label">
                        Percentage/Gradem Obtain In Last Exam
                    </label>
                    <p className='form-control'>{student.percentageObtainInLastExam}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="qualifiedPromotionInHigherClass" className="form-label">
                      Whether Qualified For Promotion In Higher Class
                    </label>
                    <p className='form-control'>{student.qualifiedPromotionInHigherClass}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="whetherFaildInAnyClass" className="form-label">
                      Whether Failed In Any Class
                    </label>
                    <p className='form-control'>{student.whetherFaildInAnyClass}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="anyOutstandingDues" className="form-label">
                      Any Outstanding Dues
                    </label>
                    <p className='form-control'>{student.anyOutstandingDues}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="moralBehaviour" className="form-label">
                    Moral Behaviour
                    </label>
                    <p className='form-control'>{student.moralBehaviour}</p>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfLastAttendanceAtSchool"
                      className="form-label"
                    >
                      Date Of Last Attendance At School
                    </label>
                    <p className='form-control'>{student.dateOfLastAttendanceAtSchool}</p>
                  </div>
                </div>

                <div className="col-md-7">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="reasonForLeaving" className="form-label">
                    Reason For Leaving
                    </label>
                    <p className='form-control'>{student.reasonForLeaving}</p>
                  </div>
                </div>

                <div className="col-md-12">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="anyRemarks" className="form-label">
                   Any Other Remarks
                    </label>
                    <p className='form-control'>{student.anyRemarks}</p>
                  </div>
                </div>
              </div>
          
              <div className="row">
                <div className="form-check ms-1 mb-2">
                  <label
                    className="form-check-label"
                    htmlFor="customCheck1"
                  >
                  The certificate is issued for the purpose of admission to other School.
                  </label>
                </div>

                {/* <div className="col-md-4">
                  {" "}
                  <div className="mb-4">
                    <label htmlFor="signature" className="form-label">
                      Signature
                    </label>
                    <input
                      type="file"
                      id="signature"
                      name="signature"
                      className="form-control"
                      accept="image/*,application/pdf"
                      // onChange={handleChange}
                      required
                    />
                  </div>
                </div> */}
                
                <div className="col-md-5">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <p className='form-control'>{student.name}</p>
                  </div>
                </div>

                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="paymentMode" className="form-label">
                      Payment Option
                    </label>
                    <p className='form-control'>{student.paymentMode}</p>
                  </div>
                  
                </div>
                {/* <div className="text-start">
                    {" "}
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                    >
                      Proceed Further
                    </button>
                  </div>  */}
              </div>
              
              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                  For Official Use Only
                </h4>
              </div>

              <div className="row">
              <div className="col-md-4">
                  <div className="mb-3">
                    <label
                      htmlFor="dateOfApplicationReceived"
                      className="form-label"
                    >
                     Application Received On
                    </label>
                    <p className='form-control'>{student.dateOfApplicationReceived}</p>
                  </div>
                </div>

                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="feesReceivedBy" className="form-label">
                       Fees Received By
                    </label>
                    <p className='form-control'>{student.feesReceivedBy}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="transationOrChequetNumber" className="form-label">
                       Transaction No./Cheque No.
                    </label>
                    <p className='form-control'>{student.transationOrChequetNumber}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="receiptNumber" className="form-label">
                       Receipts No.
                    </label>
                    <p className='form-control'>{student.receiptNumber}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="certificateNumber" className="form-label">
                       Certificate No.
                    </label>
                    <p className='form-control'>{student.certificateNumber}</p>
                  </div>
                </div>
              </div>

             
              <div className="d-flex justify-content-end">
              
              <div className="text-end" style={{ marginLeft: "2px" }}
              >
                {" "}
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={() => window.history.back()}
                >
                Back
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
export default ViewTCFormDetails;
