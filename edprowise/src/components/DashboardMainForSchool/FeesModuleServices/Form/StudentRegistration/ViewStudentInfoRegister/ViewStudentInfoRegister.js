import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const ViewStudentInfoRegister = () => {
    const location = useLocation();
    const student = location.state?.student; // Get student data from state
    const navigate = useNavigate();
  
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
                  Student Registration Info
                </h4>
              </div>
            </div>
            <form >
              <div className="row">
                <div className="col-md-4">

                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <p className='form-control'>{student.firstName} </p>
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
                    <label htmlFor="nationality" className="form-label">
                      Nationality
                    </label>
                    <p className='form-control'>{student.nationality}</p>
                  </div>
                </div>

                <div className="col-md-2">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <p className='form-control'>{student.gender}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="masterDefineClass" className="form-label">
                      Master Define Class
                    </label>
                    <p className='form-control'>{student.masterDefineClass}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="masterDefineShift" className="form-label">
                      Master Define Shift
                    </label>
                    <p className='form-control'>{student.masterDefineShift}</p>
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
                    <label htmlFor="fatherContactNo" className="form-label">
                      Father Contact Number
                    </label>
                    <p className='form-control'>{student.fatherContactNo}</p>
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

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="motherContactNo" className="form-label">
                      Mother Contact Number
                    </label>
                    <p className='form-control'>{student.motherContactNo}</p>
                  </div>
                </div>

              </div>

              <div className="row">
                <div className="mb-3">
                  <label htmlFor="currentaddress" className="form-label">
                    current Address
                  </label>
                  <p className='form-control'>{student.currentAddress}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label
                      htmlFor="cityStateCountry"
                      className="form-label"
                    >
                      City-State-Country
                    </label>
                    <p className='form-control'>{student.cityStateCountry}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">
                      Pincode
                    </label>
                    <p className='form-control'>{student.pincode}</p>
                  </div>
                </div>

                <div className="col-md-5">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="previousSchoolName" className="form-label">
                      Previous School Name
                    </label>
                    <p className='form-control'>{student.previousSchoolName}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="previousSchoolBoard" className="form-label">
                      Previous School Board
                    </label>
                    <p className='form-control'>{student.previousSchoolBoard}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="addressOfpreviousSchool" className="form-label">
                      Address Of Previous School
                    </label>
                    <p className='form-control'>{student.addressOfpreviousSchool}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label
                      htmlFor="previousSchoolResult"
                      className="form-label"
                    >
                      Result Of Previous School
                    </label>
                    <p className='form-control'>{student.previousSchoolResult}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label
                      htmlFor="tcCertificate"
                      className="form-label"
                    >
                      TC Certificate
                    </label>
                    <p className='form-control'>{student.tcCertificate}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="studentCategory" className="form-label">
                      Category
                    </label>
                    <p className='form-control'>{student.studentCategory}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="reachus" className="form-label">
                      How did you reach us
                    </label>
                    <p className='form-control'>{student.howReachUs}</p>
                  </div>
                </div>

              </div>

              <div className="row">
                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label
                      htmlFor="aadharPassportFile"
                      className="form-label"
                    >
                      Aadhar/Passport Upload
                    </label>
                    <p className='form-control'>{student.aadharPassportFile}</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="aadharPassportNumber" className="form-label">
                      Aadhar/Passport Number
                    </label>
                    <p className='form-control'>{student.aadharPassportNumber}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="castCertificate" className="form-label">
                      Caste Certificate
                    </label>
                    <p className='form-control'>{student.castCertificate}</p>
                  </div>
                </div>
              </div>

              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                  Understanding
                </h4>
              </div>
              <div className="row">
                <div className="form-check ms-1 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customCheck1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customCheck1"
                  >
                    I Understand & agree that the registtration of my word doesnot guarantee admission to the school & the registration fee is neither transferable not refundable.
                  </label>
                </div>

                <div className="col-md-6">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <p className='form-control'>{student.name}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="paymentMode" className="form-label">
                      Payment Option
                    </label>
                    <p className='form-control'>{student.paymentMode}</p>
                  </div>
                  
                </div>
                
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
                      htmlFor="dateOfApplicatopnReceive"
                      className="form-label"
                    >
                     Application Received on
                    </label>
                    <p className='form-control'>{student.dateOfApplicatopnReceive}</p>
                  </div>
                </div>

                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Registration Fees Received By
                    </label>
                    <p className='form-control'>{student.registrationFeesReceivedBy}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="transationOrChequetNumber" className="form-label">
                       Transaction No./ Cheque No.
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
                    <label htmlFor="registrationNumber" className="form-label">
                       Registration No.
                    </label>
                    <p className='form-control'>{student.registrationNumber}</p>
    
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
              <div className="mr-2">
                {" "}
                <button
                type='button'
                  className="btn btn-primary custom-submit-button"
                  onClick={() => window.history.back()}
                // onClick={() => navigate(-1)}
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

export default ViewStudentInfoRegister;
