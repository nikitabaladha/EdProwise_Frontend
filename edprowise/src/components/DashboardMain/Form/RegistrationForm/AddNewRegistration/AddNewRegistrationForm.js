import React from "react";

const AddNewRegistrationForm = () => {
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div
              className="card-body p-4"
              style={{ paddingTop: "0px !important" }}
            >
              <div className="tab-content">
                <div
                  className="tab-pane active"
                  id="personalDetails"
                  role="tabpanel"
                >
                  <form action="" method="POST" encType="multipart/form-data">
                    <div className="row">
                      <div
                        className="col-lg-12"
                        style={{
                          textAlign: "center",
                          borderTop: "2px solid",
                          borderBottom: "2px solid",
                          marginBottom: 25,
                        }}
                      >
                        <h4
                          style={{
                            marginTop: 7,
                            background: "#824ef4",
                            color: "white",
                            padding: 6,
                            borderRadius: 20,
                            fontStyle: "italic",
                          }}
                        >
                          <b>APPLICANT'S INFORMATION</b>
                        </h4>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label
                            htmlFor="firstnameInput"
                            className="form-label"
                          >
                            First Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required=""
                            name="fname"
                            placeholder="First Name"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label
                            htmlFor="MiddleNameInput"
                            className="form-label"
                          >
                            Middle Name{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="mname"
                            placeholder="Middle Name"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label htmlFor="LastNameInput" className="form-label">
                            Last Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required=""
                            name="lname"
                            placeholder="Last Name"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-3">
                        <div className="mb-3">
                          <label htmlFor="DOBInput" className="form-label">
                            {" "}
                            Date of Birth{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            required=""
                            name="dob"
                            placeholder="DD/MM/YYYY"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-3">
                        <div className="mb-3">
                          <label
                            htmlFor="NationalityInput"
                            className="form-label"
                          >
                            Nationality <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select"
                            required=""
                            name="nationality"
                            id="nationality"
                            onchange="updateCasteOptions()"
                            aria-label="Default select example"
                            style={{ borderRadius: 20 }}
                          >
                            <option value="">--Select--</option>
                            <option value="India">India</option>
                            <option value="International">International</option>
                            <option value="SAARC">SAARC Countries</option>
                          </select>
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label htmlFor="GenderInput" className="form-label">
                            Gender <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select"
                            required=""
                            name="gender"
                            aria-label="Default select example"
                            style={{ borderRadius: 20 }}
                          >
                            <option value="">--Select--</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label
                            htmlFor="MasterDefineClassApplyingForInput"
                            className="form-label"
                          >
                            Master Define Class{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select"
                            required=""
                            aria-label="Default select example"
                            name="class"
                            style={{ borderRadius: 20 }}
                          >
                            <option value="">--Select--</option>
                            {/*?php
                                                  $sql = "SELECT * FROM `class` WHERE client_id='$client_id' ORDER BY sno ASC";
                                                  $result = mysqli_query($con, $sql);
                                                      while($rw = mysqli_fetch_assoc($result)) 
                                                      {
                                              ?*/}
                            <option>{/*?php echo $rw['name'];?*/}</option>
                            {/*?php } ?*/}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label
                            htmlFor="MasterDefineShiftInput"
                            className="form-label"
                          >
                            Master Define Shift{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="shift"
                            required=""
                            style={{ borderRadius: 20 }}
                          >
                            <option value="">--Select--</option>
                            {/*?php
                                                  $sql = "SELECT * FROM `shift` WHERE client_id='$client_id' ORDER BY sno ASC";
                                                  $result = mysqli_query($con, $sql);
                                                      while($rw = mysqli_fetch_assoc($result)) 
                                                      {
                                              ?*/}
                            <option>{/*?php echo $rw['name'];?*/}</option>
                            {/*?php } ?*/}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label
                            htmlFor="FatherNameInput"
                            className="form-label"
                          >
                            Father Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required=""
                            name="fathername"
                            placeholder="Father Name"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label
                            htmlFor="phonenumberInput"
                            className="form-label"
                          >
                            Father Contact No.{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            required=""
                            name="f_mobile"
                            id="phonenumberInput"
                            placeholder="Father Contact No."
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label
                            htmlFor="MotherNameInput"
                            className="form-label"
                          >
                            Mother Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required=""
                            name="mothername"
                            placeholder="Mother Name"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label
                            htmlFor="phonenumberInput"
                            className="form-label"
                          >
                            Mother Contact No.{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            required=""
                            name="m_mobile"
                            id="phonenumberInput"
                            placeholder="Mother Contact No."
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <label htmlFor="AddressInput" className="form-label">
                            Current Address{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type=""
                            className="form-control"
                            required=""
                            name="address"
                            placeholder="Current Address"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label htmlFor="StateInput" className="form-label">
                            {" "}
                            City-State-Country{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            list="programmingLanguages"
                            placeholder="Search Here...."
                            className="form-control"
                            name="city"
                            required=""
                          />
                          <datalist id="programmingLanguages">
                            {/*?php
                                                  $sql = "SELECT * FROM `a_l_city` ORDER BY name ASC";
                                                  $result = mysqli_query($con, $sql);
                                                      while($rw = mysqli_fetch_assoc($result)) 
                                                      {
                                              ?*/}
                            <option>{/*?php echo $rw['name'];?*/}</option>
                            {/*?php } ?*/}
                          </datalist>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label htmlFor="PincodeInput" className="form-label">
                            Pincode<span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type=""
                            className="form-control"
                            required=""
                            name="pincode"
                            placeholder="Pincode:"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            htmlFor="PreviousSchoolInput"
                            className="form-label"
                          >
                            Previous School{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="p_school"
                            placeholder="Previous School"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            htmlFor="PreviousSchoolBoardInput"
                            className="form-label"
                          >
                            Previous School Board
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="p_school_board"
                            placeholder="Previous School Board"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            htmlFor="AddressofPreviousSchoolInput"
                            className="form-label"
                          >
                            Address of Previous School
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="p_school_address"
                            placeholder="Address of Previous School"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      {/*end col*/}
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label
                            htmlFor="ResultofPreviousSchool(Upload)Input"
                            className="form-label"
                          >
                            Result of Previous School (Upload):
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="p_school_result"
                            accept=".doc, .docx, .pdf,image/jpeg, image/png, image/jpg"
                            placeholder=""
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label
                            htmlFor="TCCertifcate(Upload)Input"
                            className="form-label"
                          >
                            TC Certifcate (Upload)
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="p_school_tc"
                            accept=".doc, .docx, .pdf,image/jpeg, image/png, image/jpg"
                            placeholder="TC Certifcate (Upload)"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label
                            htmlFor="JoiningdatInput"
                            className="form-label"
                          >
                            SC/ST/OBC/General{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select"
                            required=""
                            name="caste"
                            id="caste"
                            onchange="toggleCasteCertificate()"
                            aria-label="Default select example"
                            style={{ borderRadius: 20 }}
                          >
                            <option value="">--Select--</option>
                            <option value="General">General</option>
                            <option value="OBC">OBC</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label
                            htmlFor="HowdidyoureachusInput"
                            className="form-label"
                          >
                            How did you reach us{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select"
                            required=""
                            name="reach_us"
                            aria-label="Default select example"
                            style={{ borderRadius: 20 }}
                          >
                            <option value="">--Select--</option>
                            <option>Teacher/Staff</option>
                            <option>Advertisement</option>
                            <option>Student</option>
                            <option>Online Search</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label
                            htmlFor="Aadhar/PassportNoInput"
                            className="form-label"
                          >
                            Aadhar/Passport Upload{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            required=""
                            name="aadhar_passport_file"
                            accept=".doc, .docx, .pdf"
                            placeholder="Aadhar/Passport No."
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label
                            htmlFor="Aadhar/PassportNoInput"
                            className="form-label"
                          >
                            Aadhar/Passport No.{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            required=""
                            name="aadhar_passport_no"
                            placeholder="Aadhar/Passport No."
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div
                        className="col-lg-4"
                        id="casteCertificateField"
                        style={{ display: "none" }}
                      >
                        <div className="mb-3">
                          <label
                            htmlFor="Aadhar/PassportNoInput"
                            className="form-label"
                          >
                            Upload Caste Certificate{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="file"
                            name="caste_certificate"
                            id="casteCertificateInput"
                            className="form-control"
                            accept=".doc, .docx, .pdf,image/jpeg, image/png, image/jpg"
                            placeholder="Aadhar/Passport No."
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div
                        className="col-lg-12"
                        style={{
                          textAlign: "center",
                          borderTop: "2px solid",
                          borderBottom: "2px solid",
                          marginBottom: 25,
                          marginTop: 25,
                        }}
                      >
                        <h4 style={{ marginTop: 7 }}>UNDERSTANDING</h4>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <input type="checkbox" required="" />
                          <label htmlFor="" className="form-label">
                            {" "}
                            <i>
                              {" "}
                              &nbsp; I understand &amp; agree that the
                              registration of my ward does not guarantee
                              admission to the school &amp; the registration fee
                              is neither transferable nor refundable
                              <span style={{ color: "red" }}>*</span>{" "}
                            </i>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label
                            htmlFor="SignatureInput"
                            className="form-label"
                          >
                            Signature <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="file"
                            required=""
                            name="signature"
                            className="form-control"
                            accept=".doc, .docx, .pdf,image/jpeg, image/png, image/jpg"
                            placeholder="Signature"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="TextInput" className="form-label">
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            required=""
                            placeholder="Name"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <label
                            htmlFor="Payment OptionInput"
                            className="form-label"
                          >
                            Payment Option{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select"
                            name="payment_option"
                            required=""
                            aria-label="Default select example"
                            style={{ borderRadius: 20 }}
                          >
                            <option value="">--Select--</option>
                            <option>Cash</option>
                            <option>Cheque</option>
                            <option>Online</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="">
                          <button
                            type="submit"
                            name="add"
                            className="btn btn-primary"
                          >
                            PROCEED FURTHER
                          </button>
                        </div>
                      </div>
                      <div
                        className="col-lg-12"
                        style={{
                          textAlign: "center",
                          borderTop: "2px solid",
                          borderBottom: "2px solid",
                          marginBottom: 25,
                          marginTop: 25,
                        }}
                      >
                        <h5 style={{ marginTop: 7 }}>FOR OFFICIAL USE ONLY</h5>
                      </div>
                      <div className="col-lg-3">
                        <div className="mb-3">
                          <label htmlFor="TextInput" className="form-label">
                            Application Received on
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Date"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="mb-3">
                          <label htmlFor="TextInput" className="form-label">
                            Registration fees received by{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Registration fees"
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="TextInput" className="form-label">
                            Transaction No./ Cheque No.{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type=""
                            className="form-control"
                            placeholder=""
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label htmlFor="TextInput" className="form-label">
                            Receipts No. <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Receipts No."
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="mb-3">
                          <label
                            htmlFor="RegistrationNo.Input"
                            className="form-label"
                          >
                            Registration No.
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type=""
                            className="form-control"
                            placeholder="Registration No."
                            defaultValue=""
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="hstack gap-2 justify-content-end">
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-soft-success"
                          >
                            Discard Registration
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* container-fluid */}
        </div>
        {/* End Page-content */}
      </div>
    </>
  );
};

export default AddNewRegistrationForm;
