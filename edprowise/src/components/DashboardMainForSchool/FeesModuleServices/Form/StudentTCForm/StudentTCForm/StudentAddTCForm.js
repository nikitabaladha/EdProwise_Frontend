import React from 'react'

const StudentAddTCForm = () => {
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
                      <input
                        type="text"
                        id="admissionNumber"
                        name="admissionNumber"
                        className="form-control"
                        // value={formData.schoolName}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        // value={formData.schoolName}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="middleName" className="form-label">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        id="middleName"
                        name="middleName"
                        className="form-control"
                        // value={formData.schoolName}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        // value={formData.schoolName}
                        // onChange={handleChange}
                        required
                      />
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
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className="form-control"
                        // value={formData.subscriptionStartDate}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        className="form-control"
                        // value={formData.schoolName}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-2">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="nationality" className="form-label">
                        Nationality
                      </label>
                      <select
                        id="nationality"
                        name="nationality"
                        className="form-control"
                        // value={formData.affiliationUpto}
                        // onChange={handleChange}
                        required
                      >
                        <option value="">Select Nationality</option>
                        <option value="india">India</option>
                        <option value="china">
                          China
                        </option>
                        <option value="Usa">
                          Usa
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="fatherName" className="form-label">
                        Father Name
                      </label>
                      <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        className="form-control"
                        // value={formData.schoolName}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="motherName" className="form-label">
                        Mother Name
                      </label>
                      <input
                        type="text"
                        id="motherName"
                        name="motherName"
                        className="form-control"
                        // value={formData.schoolName}
                        // onChange={handleChange}
                        required
                      />
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
                      <input
                        type="date"
                        id="dateOfIssue"
                        name="dateOfIssue"
                        className="form-control"
                        // value={formData.subscriptionStartDate}
                        // onChange={handleChange}
                        required
                      />
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
                      <input
                        type="date"
                        id="dateOfAdmission"
                        name="dateOfAdmission"
                        className="form-control"
                        // value={formData.subscriptionStartDate}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="studentLastClass" className="form-label">
                        Class in Which Student Studied Last
                      </label>
                      <select
                        id="studentLastClass"
                        name="studentLastClass"
                        className="form-control"
                        // value={formData.affiliationUpto}
                        // onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="General">General</option>
                        <option value="OBC">
                          OBC
                        </option>
                        <option value="ST">
                          ST
                        </option>
                        <option value="SC">
                          SC
                        </option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="percentageObtainInLastExam" className="form-label">
                          Percentage/Gradem Obtain In Last Exam
                      </label>
                      <input
                        type="text"
                        id="percentageObtainInLastExam"
                        name="percentageObtainInLastExam"
                        className="form-control"
                        // value={formData.schoolMobileNo}
                        // onChange={handleChange}
                        required
                      />
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
                      <input
                        type="text"
                        id="qualifiedPromotionInHigherClass"
                        name="qualifiedPromotionInHigherClass"
                        className="form-control"
                      // value={formData.schoolName}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="whetherFaildInAnyClass" className="form-label">
                        Whether Failed In Any Class
                      </label>
                      <input
                        type="text"
                        id="whetherFaildInAnyClass"
                        name="whetherFaildInAnyClass"
                        className="form-control"
                      // value={formData.schoolName}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="anyOutstandingDues" className="form-label">
                        Any Outstanding Dues
                      </label>
                      <input
                        type="text"
                        id="anyOutstandingDues"
                        name="anyOutstandingDues"
                        className="form-control"
                      // value={formData.schoolName}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="moralBehaviour" className="form-label">
                      Moral Behaviour
                      </label>
                      <input
                        type="text"
                        id="moralBehaviour"
                        name="moralBehaviour"
                        className="form-control"
                      // value={formData.schoolName}
                      // onChange={handleChange}
                      />
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
                      <input
                        type="date"
                        id="dateOfLastAttendanceAtSchool"
                        name="dateOfLastAttendanceAtSchool"
                        className="form-control"
                        // value={formData.subscriptionStartDate}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-7">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="reasonForLeaving" className="form-label">
                      Reason For Leaving
                      </label>
                      <input
                        type="text"
                        id="reasonForLeaving"
                        name="reasonForLeaving"
                        className="form-control"
                      // value={formData.schoolName}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="anyRemarks" className="form-label">
                     Any Other Remarks
                      </label>
                      <input
                        type="text"
                        id="anyRemarks"
                        name="anyRemarks"
                        className="form-control"
                      // value={formData.schoolName}
                      // onChange={handleChange}
                      />
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
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        required
                      // value={formData.schoolName}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="paymentMode" className="form-label">
                        Payment Option
                      </label>
                      <select
                        id="paymentMode"
                        name="paymentMode"
                        className="form-control"
                        // value={formData.affiliationUpto}
                        // onChange={handleChange}
                        required
                      >
                        <option value="">Select </option>
                        <option value="Cheque">Cheque</option>
                        <option value="UPI">
                          UPI
                        </option>
                        <option value="Credit Card">
                          Credit Card
                        </option>
                        <option value="Cash">
                          Cash
                        </option>
                      </select>
                    </div>
                    
                  </div>
                  <div className="text-start">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-primary custom-submit-button"
                      >
                        Proceed Further
                      </button>
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
                        htmlFor="dateOfApplicationReceived"
                        className="form-label"
                      >
                       Application Received On
                      </label>
                      <input
                        type="date"
                        id="dateOfApplicationReceived"
                        name="dateOfApplicationReceived"
                        className="form-control"
                        // value={formData.subscriptionStartDate}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="feesReceivedBy" className="form-label">
                         Fees Received By
                      </label>
                      <input
                        type="text"
                        id="feesReceivedBy"
                        name="feesReceivedBy"
                        className="form-control"
                        required
                      // value={formData.schoolName}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="transationOrChequetNumber" className="form-label">
                         Transaction No./Cheque No.
                      </label>
                      <input
                        type="text"
                        id="transationOrChequetNumber"
                        name="transationOrChequetNumber"
                        className="form-control"
                        // value={formData.panNo}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="receiptNumber" className="form-label">
                         Receipts No.
                      </label>
                      <input
                        type="text"
                        id="receiptNumber"
                        name="receiptNumber"
                        className="form-control"
                        // value={formData.panNo}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="certificateNumber" className="form-label">
                         Certificate No.
                      </label>
                      <input
                        type="text"
                        id="certificateNumber"
                        name="certificateNumber"
                        className="form-control"
                        // value={formData.panNo}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

               
                <div className="d-flex justify-content-end">
                <div className="mr-2">
                  {" "}
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit For Principal Approval
                  </button>
                </div>
                <div className="text" style={{ marginLeft: "2px" }}
                >
                  {" "}
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                  >
                  Cancel
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
export default StudentAddTCForm;
