import React, { useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import useStudentRegistration from "../UpdateStudentRegistrationForm.js/UseStudentRegistrationUpdate";
import { generatePDF } from "./generateStudentPDF";

const StudentRegistrationFormview = () => {
  const {
    student,
    formData,
    handleChange,
    handleSubmit,
    classes,
    shifts,
    cityOptions,
    countryOptions,
    stateOptions,
    isNursery,
    getFileNameFromPath,
    existingFiles,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    schoolId
  } = useStudentRegistration();

  const formRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const renderFileViewButton = (file, filePath, altText) => {
    if (!file && !filePath) return <div className="text-secondary small mt-1">No file</div>;

    const fileUrl = file
      ? typeof file === "string"
        ? file
        : URL.createObjectURL(file)
      : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${filePath}`;

    return (
      <div className="mt-1">
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-primary"
        >
          View {altText}
        </a>
      </div>
    );
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      await generatePDF(formData, student, classes, shifts,existingFiles,schoolId);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex justify-content-between align-items-center">
                  <h4 className="card-title text-center custom-heading-font">
                    Student Registration Form
                  </h4>
                  <button
                    className="btn btn-primary download-pdf-btn"
                    onClick={handleDownloadPDF}
                    disabled={isGenerating}
                    style={{ marginLeft: "auto" }}
                  >
                    {isGenerating ? "Generating PDF..." : "Download PDF"}
                  </button>
                </div>
              </div>
              <div ref={formRef}>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4 d-flex flex-column align-items-center">
                      <div
                        className="d-flex justify-content-center align-items-center mb-2"
                        style={{ width: "150px", height: "180px", overflow: "hidden" }}
                      >
                        {formData.studentPhoto ? (
                          <img
                            src={
                              typeof formData.studentPhoto === "string"
                                ? formData.studentPhoto
                                : URL.createObjectURL(formData.studentPhoto)
                            }
                            alt="Passport"
                            className="w-100 h-100 object-fit-cover"
                            crossOrigin="anonymous"
                          />
                        ) : existingFiles.studentPhoto ? (
                          <img
                            src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${existingFiles.studentPhoto}`}
                            alt="Passport"
                            className="w-100 h-100 object-fit-cover"
                            crossOrigin="anonymous"
                          />
                        ) : (
                          <div className="text-secondary">Photo</div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                              First Name <span className="text-danger"></span>
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              className="form-control"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="middleName" className="form-label">
                              Middle Name
                            </label>
                            <input
                              type="text"
                              id="middleName"
                              name="middleName"
                              className="form-control"
                              value={formData.middleName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                              Last Name <span className="text-danger"></span>
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              className="form-control"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="dateOfBirth" className="form-label">
                              Date Of Birth <span className="text-danger"></span>
                            </label>
                            <input
                              type="date"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              className="form-control"
                              value={formData.dateOfBirth ? formData.dateOfBirth.substring(0, 10) : ""}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="age" className="form-label">
                              Age <span className="text-danger"></span>
                            </label>
                            <input
                              type="number"
                              id="age"
                              name="age"
                              className="form-control"
                              value={formData.age}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="nationality" className="form-label">
                              Nationality <span className="text-danger"></span>
                            </label>
                            <select
                              id="nationality"
                              name="nationality"
                              className="form-control"
                              value={formData.nationality}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select Nationality</option>
                              <option value="India">India</option>
                              <option value="International">International</option>
                              <option value="SAARC Countries">SAARC Countries</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                          Gender <span className="text-danger"></span>
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          className="form-control"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="bloodGroup" className="form-label">
                          Blood Group
                        </label>
                        <select
                          id="bloodGroup"
                          name="bloodGroup"
                          className="form-control"
                          value={formData.bloodGroup}
                          onChange={handleChange}
                        >
                          <option value="">Select Blood Group</option>
                          <option value="AB-">AB-</option>
                          <option value="AB+">AB+</option>
                          <option value="O-">O-</option>
                          <option value="O+">O+</option>
                          <option value="B-">B-</option>
                          <option value="B+">B+</option>
                          <option value="A-">A-</option>
                          <option value="A+">A+</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="parentContactNumber" className="form-label">
                          Parent Contact Number
                        </label>
                        <input
                          type="tel"
                          id="parentContactNumber"
                          name="parentContactNumber"
                          className="form-control"
                          value={formData.parentContactNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="motherTongue" className="form-label">
                          Mother Tongue <span className="text-danger"></span>
                        </label>
                        <input
                          type="text"
                          id="motherTongue"
                          name="motherTongue"
                          className="form-control"
                          value={formData.motherTongue}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="masterDefineClass" className="form-label">
                          Class <span className="text-danger"></span>
                        </label>
                        <select
                          id="masterDefineClass"
                          name="masterDefineClass"
                          className="form-control"
                          value={formData.masterDefineClass}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Master Define Class</option>
                          {classes.map((classItem) => (
                            <option key={classItem._id} value={classItem._id}>
                              {classItem.className}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="masterDefineShift" className="form-label">
                          Shift <span className="text-danger"></span>
                        </label>
                        <select
                          id="masterDefineShift"
                          name="masterDefineShift"
                          className="form-control"
                          value={formData.masterDefineShift}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Master Define Shift</option>
                          {shifts.map((shift) => (
                            <option key={shift._id} value={shift._id}>
                              {shift.masterDefineShiftName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="currentAddress" className="form-label">
                        Current Address <span className="text-danger"></span>
                      </label>
                      <textarea
                        className="form-control"
                        id="currentAddress"
                        name="currentAddress"
                        rows={3}
                        value={formData.currentAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="country" className="form-label">
                          Country <span className="text-danger"></span>
                        </label>
                        <CreatableSelect
                          id="country"
                          name="country"
                          options={countryOptions}
                          value={formData.country ? { value: formData.country, label: formData.country } : null}
                          onChange={handleCountryChange}
                          isClearable
                          isSearchable
                          placeholder="Select or type a country"
                          formatCreateLabel={(inputValue) => `Use "${inputValue}"`}
                          noOptionsMessage={() => "Type to add a new country"}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="state" className="form-label">
                          State <span className="text-danger"></span>
                        </label>
                        <CreatableSelect
                          id="state"
                          name="state"
                          options={stateOptions}
                          value={formData.state ? { value: formData.state, label: formData.state } : null}
                          onChange={handleStateChange}
                          isClearable
                          isSearchable
                          placeholder="Select or type a state"
                          formatCreateLabel={(inputValue) => `Use "${inputValue}"`}
                          noOptionsMessage={() => (formData.country ? "Type to add a new state" : "Select a country first")}
                          isValidNewOption={(inputValue) => inputValue.length > 0}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="city" className="form-label">
                          City <span className="text-danger"></span>
                        </label>
                        <CreatableSelect
                          id="city"
                          name="city"
                          options={cityOptions}
                          value={formData.city ? { value: formData.city, label: formData.city } : null}
                          onChange={handleCityChange}
                          isClearable
                          isSearchable
                          placeholder="Select or type a city"
                          formatCreateLabel={(inputValue) => `Use "${inputValue}"`}
                          noOptionsMessage={() => (formData.state ? "Type to add a new city" : "Select a state first")}
                          isValidNewOption={(inputValue) => inputValue.length > 0}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="pincode" className="form-label">
                          Pincode <span className="text-danger"></span>
                        </label>
                        <input
                          type="number"
                          id="pincode"
                          name="pincode"
                          className="form-control"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {!isNursery && (
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="previousSchoolName" className="form-label">
                            Previous School Name
                          </label>
                          <input
                            type="text"
                            id="previousSchoolName"
                            name="previousSchoolName"
                            className="form-control"
                            value={formData.previousSchoolName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="addressOfPreviousSchool" className="form-label">
                            Address Of Previous School
                          </label>
                          <input
                            type="text"
                            id="addressOfPreviousSchool"
                            name="addressOfPreviousSchool"
                            className="form-control"
                            value={formData.addressOfPreviousSchool}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="previousSchoolBoard" className="form-label">
                            Previous School Board
                          </label>
                          <input
                            type="text"
                            id="previousSchoolBoard"
                            name="previousSchoolBoard"
                            className="form-control"
                            value={formData.previousSchoolBoard}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3" id="previousSchoolResult">
                          <label htmlFor="previousSchoolResult" className="form-label">
                            Result Of Previous School
                          </label>
                          {renderFileViewButton(formData.previousSchoolResult, existingFiles.previousSchoolResult, "Previous School Result")}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3" id="tcCertificate">
                          <label htmlFor="tcCertificate" className="form-label">
                            TC Certificate
                          </label>
                          {renderFileViewButton(formData.tcCertificate, existingFiles.tcCertificate, "TC Certificate")}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="studentCategory" className="form-label">
                          Category <span className="text-danger"></span>
                        </label>
                        <select
                          id="studentCategory"
                          name="studentCategory"
                          className="form-control"
                          value={formData.studentCategory}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="General">General</option>
                          <option value="OBC">OBC</option>
                          <option value="ST">ST</option>
                          <option value="SC">SC</option>
                        </select>
                      </div>
                    </div>
                    {formData.studentCategory !== "General" && (
                      <div className="col-md-4">
                        <div className="mb-3" id="castCertificate">
                          <label htmlFor="castCertificate" className="form-label">
                            Caste Certificate <span className="text-danger"></span>
                          </label>
                          {renderFileViewButton(formData.castCertificate, existingFiles.castCertificate, "Caste Certificate")}
                        </div>
                      </div>
                    )}
                    <div className="col-md-4">
                      <div className="mb-3" id="aadharPassportFile">
                        <label htmlFor="aadharPassportFile" className="form-label">
                          Aadhar/Passport Upload <span className="text-danger"></span>
                        </label>
                        {renderFileViewButton(formData.aadharPassportFile, existingFiles.aadharPassportFile, "Aadhar/Passport")}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="aadharPassportNumber" className="form-label">
                          Aadhar/Passport Number <span className="text-danger"></span>
                        </label>
                        <input
                          type="text"
                          id="aadharPassportNumber"
                          name="aadharPassportNumber"
                          className="form-control"
                          value={formData.aadharPassportNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3" id="proofOfResidence">
                        <label htmlFor="proofOfResidence" className="form-label">
                          Proof Of Residence <span className="text-danger"></span>
                        </label>
                        {renderFileViewButton(formData.proofOfResidence, existingFiles.proofOfResidence, "Proof Of Residence")}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="howReachUs" className="form-label">
                          How did you reach us <span className="text-danger"></span>
                        </label>
                        <select
                          id="howReachUs"
                          name="howReachUs"
                          className="form-control"
                          value={formData.howReachUs}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Advertisement">Advertisement</option>
                          <option value="Student">Student</option>
                          <option value="Online Search">Online Search</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div id="sibling-section">
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
                          id="siblingInfoChecked"
                          name="siblingInfoChecked"
                          checked={formData.siblingInfoChecked}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="siblingInfoChecked">
                          In case of no sibling, click here.
                        </label>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="relationType" className="form-label">
                            Relation Type {!formData.siblingInfoChecked && <span className="text-danger"></span>}
                          </label>
                          <select
                            id="relationType"
                            name="relationType"
                            className="form-control"
                            value={formData.relationType || ""}
                            onChange={handleChange}
                            required={!formData.siblingInfoChecked}
                            disabled={formData.siblingInfoChecked}
                          >
                            <option value="">Select Relation</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="siblingName" className="form-label">
                            Sibling Name {!formData.siblingInfoChecked && <span className="text-danger"></span>}
                          </label>
                          <input
                            type="text"
                            id="siblingName"
                            name="siblingName"
                            className="form-control"
                            value={formData.siblingName}
                            onChange={handleChange}
                            required={!formData.siblingInfoChecked}
                            disabled={formData.siblingInfoChecked}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3" id="idCardFile">
                          <label htmlFor="idCardFile" className="form-label">
                            ID Card {!formData.siblingInfoChecked && <span className="text-danger"></span>}
                          </label>
                          {renderFileViewButton(formData.idCardFile, existingFiles.idCardFile, "ID Card")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="family-section">
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Family Information
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="parentalStatus" className="form-label">
                            Parental Status <span className="text-danger"></span>
                          </label>
                          <select
                            id="parentalStatus"
                            name="parentalStatus"
                            className="form-control"
                            value={formData.parentalStatus}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Single Father">Single Father</option>
                            <option value="Single Mother">Single Mother</option>
                            <option value="Parents">Parents</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {formData.parentalStatus !== "Single Mother" && (
                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherName" className="form-label">
                              Father Name <span className="text-danger"></span>
                            </label>
                            <input
                              type="text"
                              id="fatherName"
                              name="fatherName"
                              className="form-control"
                              value={formData.fatherName}
                              onChange={handleChange}
                              required
                              disabled={formData.parentalStatus === "Single Mother"}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherContactNo" className="form-label">
                              Father Contact Number <span className="text-danger"></span>
                            </label>
                            <input
                              type="tel"
                              id="fatherContactNo"
                              name="fatherContactNo"
                              className="form-control"
                              value={formData.fatherContactNo}
                              onChange={handleChange}
                              required
                              disabled={formData.parentalStatus === "Single Mother"}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherQualification" className="form-label">
                              Father Higher Qualification
                            </label>
                            <input
                              type="text"
                              id="fatherQualification"
                              name="fatherQualification"
                              className="form-control"
                              value={formData.fatherQualification}
                              onChange={handleChange}
                              disabled={formData.parentalStatus === "Single Mother"}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="fatherProfession" className="form-label">
                              Father Profession <span className="text-danger"></span>
                            </label>
                            <input
                              type="text"
                              id="fatherProfession"
                              name="fatherProfession"
                              className="form-control"
                              value={formData.fatherProfession}
                              onChange={handleChange}
                              required
                              disabled={formData.parentalStatus === "Single Mother"}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.parentalStatus !== "Single Father" && (
                      <div className="row">
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherName" className="form-label">
                              Mother Name <span className="text-danger"></span>
                            </label>
                            <input
                              type="text"
                              id="motherName"
                              name="motherName"
                              className="form-control"
                              value={formData.motherName}
                              onChange={handleChange}
                              required
                              disabled={formData.parentalStatus === "Single Father"}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherContactNo" className="form-label">
                              Mother Contact Number <span className="text-danger"></span>
                            </label>
                            <input
                              type="tel"
                              id="motherContactNo"
                              name="motherContactNo"
                              className="form-control"
                              value={formData.motherContactNo}
                              onChange={handleChange}
                              required
                              disabled={formData.parentalStatus === "Single Father"}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherQualification" className="form-label">
                              Mother Higher Qualification
                            </label>
                            <input
                              type="text"
                              id="motherQualification"
                              name="motherQualification"
                              className="form-control"
                              value={formData.motherQualification}
                              onChange={handleChange}
                              disabled={formData.parentalStatus === "Single Father"}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="motherProfession" className="form-label">
                              Mother Profession <span className="text-danger"></span>
                            </label>
                            <input
                              type="text"
                              id="motherProfession"
                              name="motherProfession"
                              className="form-control"
                              value={formData.motherProfession}
                              onChange={handleChange}
                              required
                              disabled={formData.parentalStatus === "Single Father"}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div id="understanding-section">
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
                          id="agreementChecked"
                          name="agreementChecked"
                          checked={formData.agreementChecked}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="agreementChecked">
                          I Understand & agree that the registration of my ward does not guarantee admission to the school & the registration fee is neither transferable nor refundable.
                        </label>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="registrationFee" className="form-label">
                            Registration Fees <span className="text-danger"></span>
                          </label>
                          <input
                            type="number"
                            id="registrationFee"
                            name="registrationFee"
                            className="form-control"
                            value={formData.registrationFee}
                            disabled
                            required
                          />
                        </div>
                      </div>
                        <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="concessionType" className="form-label">
                          Concession Type
                        </label>
                        <select
                          id="concessionType"
                          name="concessionType"
                          className="form-control"
                          value={formData.concessionType}
                          disabled
                        >
                          <option value="">Select</option>
                          <option value="EWS">EWS</option>
                          <option value="SC">SC</option>
                          <option value="ST">ST</option>
                          <option value="OBC">OBC</option>
                          <option value="Staff Children">Staff Children</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="concessionAmount" className="form-label">
                            Concession
                          </label>
                          <input
                            type="number"
                            id="concessionAmount"
                            name="concessionAmount"
                            className="form-control"
                            value={formData.concessionAmount}
                            onChange={handleChange}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label htmlFor="finalAmount" className="form-label">
                            Final Amount <span className="text-danger"></span>
                          </label>
                          <input
                            type="number"
                            id="finalAmount"
                            name="finalAmount"
                            className="form-control"
                            value={formData.finalAmount}
                            disabled
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name of person filling the form <span className="text-danger"></span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="paymentMode" className="form-label">
                            Payment Option <span className="text-danger"></span>
                          </label>
                          <select
                            id="paymentMode"
                            name="paymentMode"
                            className="form-control"
                            value={formData.paymentMode}
                            onChange={handleChange}
                            required
                            disabled
                          >
                            <option value="">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Online">Online</option>
                          </select>
                        </div>
                      </div>
                      {formData.paymentMode === "Cheque" && (
                        <>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="chequeNumber" className="form-label">
                                Cheque Number <span className="text-danger"></span>
                              </label>
                              <input
                                type="text"
                                id="chequeNumber"
                                name="chequeNumber"
                                className="form-control"
                                value={formData.chequeNumber}
                                onChange={handleChange}
                                required
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="bankName" className="form-label">
                                Bank Name <span className="text-danger"></span>
                              </label>
                              <input
                                type="text"
                                id="bankName"
                                name="bankName"
                                className="form-control"
                                value={formData.bankName}
                                onChange={handleChange}
                                required
                                disabled
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div id="official-use-section">
                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        For Official Use Only
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="dateOfApplicationReceive" className="form-label">
                            Application Received on
                          </label>
                          <input
                            type="date"
                            id="dateOfApplicationReceive"
                            name="dateOfApplicationReceive"
                            className="form-control"
                            value={student?.createdAt ? student.createdAt.substring(0, 10) : ""}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="receiptNumber" className="form-label">
                            Receipt No.
                          </label>
                          <input
                            type="text"
                            id="receiptNumber"
                            name="receiptNumber"
                            className="form-control"
                            value={student?.receiptNumber || ""}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="registrationNumber" className="form-label">
                            Registration No.
                          </label>
                          <input
                            type="text"
                            id="registrationNumber"
                            name="registrationNumber"
                            className="form-control"
                            value={student?.registrationNumber || ""}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="paymentMode" className="form-label">
                            Payment Mode
                          </label>
                          <input
                            type="text"
                            id="paymentMode"
                            name="paymentMode"
                            className="form-control"
                            value={formData.paymentMode}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="paymentDate" className="form-label">
                            Payment Date
                          </label>
                          <input
                            type="text"
                            id="paymentDate"
                            name="paymentDate"
                            className="form-control"
                            value={student?.paymentDate ? new Date(student.paymentDate).toLocaleDateString("en-GB") : ""}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="transactionOrChequeNumber" className="form-label">
                            Transaction No./Cheque No.
                          </label>
                          <input
                            type="text"
                            id="transactionOrChequeNumber"
                            name="transactionOrChequeNumber"
                            className="form-control"
                            value={student?.chequeNumber ? student.chequeNumber : student?.transactionNumber || ""}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationFormview;
