import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ViewStudentAdmissionDetails = () => {
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
                  Student Admission Details
                </h4>
              </div>
            </div>
            <form onSubmit={""}>
              <div className="row">
              <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="registrationNumber" className="form-label">
                      Registration No
                    </label>
                   <p className='form-control'>{student.registrationNumber}</p>
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
                
                

                <div className="col-md-3">
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
                    <label htmlFor="bloodGroup" className="form-label">
                    Blood Group
                    </label>
                    <p className='form-control'>{student.bloodGroup}</p>
                  </div>
                </div>

                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="masterDefineClass" className="form-label">
                      Master Define Class
                    </label>
                    <p className='form-control'>{student.masterDefineClass}</p>
                  </div>
                </div>

                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="masterDefineClass" className="form-label">
                      Master Define Class
                    </label>
                    <p className='form-control'>{student.streamSection}</p>
                  </div>
                </div>

                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="masterDefineShift" className="form-label">
                      Master Define Shift
                    </label>
                    <p className='form-control'>{student.masterDefineShift}</p>
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
                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">
                      Pincode
                    </label>
                    <p className='form-control'>{student.pincode}</p>
                  </div>
                </div>

                <div className="col-md-4">
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
                  Sibling Information Study In Same School
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
                  Incase of no sobling Click here.
                  </label>
                </div>

                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="relationType" className="form-label">
                      Relation Type
                    </label>
                    <p className='form-control'>{student.siblingInfo.relationType}</p>
                  </div>
                </div>
                

                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <p className='form-control'>{student.siblingInfo.name}</p>
                  </div>
                </div>

                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="idCardFile" className="form-label">
                      ID Card
                    </label>
                    <p className='form-control'>{student.siblingInfo.idCardFile}</p>
                  </div>
                </div> 
              </div>
              
              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                 Family Information
                </h4>
              </div>
              <div className="row">
              <div className="col-md-12">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="relationType" className="form-label">
                      Parental Status
                    </label>
                    <p className='form-control'>{student.familyInfo.parentalStatus}</p>
                  </div>
                </div>   

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="fatherName" className="form-label">
                      Father Name
                    </label>
                    <p className='form-control'>{student.familyInfo.fatherName}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="fatherContactNo" className="form-label">
                      Father Contact Number
                    </label>
                    <p className='form-control'>{student.familyInfo.fatherContactNo}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="fatherQualification" className="form-label">
                      Father Higher Qualification
                    </label>
                    <p className='form-control'>{student.familyInfo.fatherQualification}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="fatherProfession" className="form-label">
                      Father Profession
                    </label>
                    <p className='form-control'>{student.familyInfo.fatherProfession}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="matherName" className="form-label">
                      Mother Name
                    </label>
                    <p className='form-control'>{student.familyInfo.motherName}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="motherContactNo" className="form-label">
                      Mother Contact Number
                    </label>
                    <p className='form-control'>{student.familyInfo.motherContactNo}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="motherQualification" className="form-label">
                    Mother Higher Qualification
                    </label>
                    <p className='form-control'>{student.familyInfo.motherQualification}</p>
                  </div>
                </div>

                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="motherProfession" className="form-label">
                      Mother Profession
                    </label>
                    <p className='form-control'>{student.familyInfo.motherProfession}</p>
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
                    <p className='form-control'>{student.understanding.name}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="paymentMode" className="form-label">
                      Payment Option
                    </label>
                    <p className='form-control'>{student.understanding.paymentMode}</p>
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
                  </div> */}
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
                      htmlFor="dateOfAdmission"
                      className="form-label"
                    >
                     Admission Date
                    </label>
                    <p className='form-control'>{student.officialUse.dateOfAdmission}</p>
                  </div>
                </div>

                <div className="col-md-4">
                  {" "}
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Admission Fees Received By
                    </label>
                    <p className='form-control'>{student.officialUse.admissionFeesReceivedBy}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="transationOrChequetNumber" className="form-label">
                       Transaction No./ Cheque No.
                    </label>
                    <p className='form-control'>{student.officialUse.transationOrChequetNumber}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="receiptNumber" className="form-label">
                       Receipts No.
                    </label>
                    <p className='form-control'>{student.officialUse.receiptNumber}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="admissionNumber" className="form-label">
                       Admission No.
                    </label>
                    <p className='form-control'>{student.officialUse.admissionNumber}</p>
                  </div>
                </div>
              </div>

             
              <div className="d-flex justify-content-end">
              <div className="text-end" 
              >
                {" "}
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
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
export default ViewStudentAdmissionDetails;
