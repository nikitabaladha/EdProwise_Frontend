

import React from 'react';

const Form = ({
  handleSubmit,
  handleSave,
  formData,
  handleChange,
  cityOptions,
  classes,
  handleClassChange,
  sections,
  shifts,
  isNursery,
  isSubmitting,
  getFileNameFromPath,
  showAdditionalData,
  handleShiftChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="registrationNumber" className="form-label">
              Registration No
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              className="form-control"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
              disabled
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name<span className="text-danger">*</span>
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
              Last Name<span className="text-danger">*</span>
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

        <div className="col-md-3">
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
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-3">
          {" "}
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age<span className="text-danger">*</span>
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

        <div className="col-md-3">
          {" "}
          <div className="mb-3">
            <label htmlFor="nationality" className="form-label">
              Nationality<span className="text-danger">*</span>
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
              <option value="International">
                International
              </option>
              <option value="SAARC Countries">
                SAARC Countries
              </option>
            </select>
          </div>
        </div>

        <div className="col-md-3">
          {" "}
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender<span className="text-danger">*</span>
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
              <option value="Female">
                Female
              </option>
            </select>
          </div>
        </div>

        <div className="col-md-3">
          {" "}
          <div className="mb-3">
            <label htmlFor="bloodGroup" className="form-label">
              Blood Group<span className="text-danger">*</span>
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              className="form-control"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="AB-">AB-</option>
              <option value="AB+">AB+</option>
              <option value="O-"> O-</option>
              <option value="O-"> O+</option>
              <option value="B-"> B-</option>
              <option value="B+"> B+</option>
              <option value="A-"> A-</option>
              <option value="A+"> A+</option>
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="masterDefineClass" className="form-label">
              Class<span className="text-danger">*</span>
            </label>
            <select
              id="masterDefineClass"
              name="masterDefineClass"
              className="form-control"
              value={formData.masterDefineClass}
              onChange={handleClassChange}
              required
            >
              <option value="">Select Class</option>
              {classes.map((classItem) => (
                <option key={classItem._id} value={classItem._id}>
                  {classItem.className}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="masterDefineShift" className="form-label">
              Shift<span className="text-danger">*</span>
            </label>
            <select
              id="masterDefineShift"
              name="masterDefineShift"
              className="form-control"
              value={formData.masterDefineShift}
              onChange={handleShiftChange}
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

        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="section" className="form-label">
              Section<span className="text-danger">*</span>
            </label>
            <select
              id="section"
              name="section"
              className="form-control"
              value={formData.section}
              onChange={handleChange}
              required
              disabled={!formData.masterDefineShift}
            >
              <option value="">Select Section</option>
              {sections.length > 0 ? (
                sections.map((section) => (
                  <option key={section._id} value={section._id}>
                    {section.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No sections available for selected class and shift
                </option>
              )}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3">
          <label htmlFor="currentAddress" className="form-label">
            Current Address<span className="text-danger">*</span>
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
            <label
              htmlFor="cityStateCountry"
              className="form-label"
            >
              City-State-Country<span className="text-danger">*</span>
            </label>

            <select
              id="cityStateCountry"
              name="cityStateCountry"
              className="form-control"
              value={formData.cityStateCountry}
              onChange={handleChange}
              required
            >
              <option value="">Select City-State-Country</option>
              {cityOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-3">
          {" "}
          <div className="mb-3">
            <label htmlFor="pincode" className="form-label">
              Pincode<span className="text-danger">*</span>
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

        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="parentContactNumber" className="form-label">
              Parent Contact No.<span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              id="parentContactNumber"
              name="parentContactNumber"
              className="form-control"
              value={formData.parentContactNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-3">
          <div className="mb-3">
            <label htmlFor="motherLanguage" className="form-label">
              Mother Language<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="motherLanguage"
              name="motherLanguage"
              className="form-control"
              value={formData.motherLanguage}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      {
        !isNursery && (
          <>
            <div className="row">
              <div className="col-md-6">
                {" "}
                <div className="mb-3">
                  <label htmlFor="previousSchoolName" className="form-label">
                    Previous School Name<span className="text-danger">*</span>
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
                {" "}
                <div className="mb-3">
                  <label htmlFor="addressOfPreviousSchool" className="form-label">
                    Address Of Previous School<span className="text-danger">*</span>
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
                {" "}
                <div className="mb-3">
                  <label htmlFor="previousSchoolBoard" className="form-label">
                    Previous School Board<span className="text-danger">*</span>
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
                <div className="mb-3">
                  <label
                    htmlFor="previousSchoolResult"
                    className="form-label"
                  >
                    Result Of Previous School<span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    id="previousSchoolResult"
                    name="previousSchoolResult"
                    className="form-control"
                    accept="image/*,application/pdf"
                    onChange={handleChange}

                  />
                  {typeof formData.previousSchoolResult === 'string' && (
                    <div className="text-muted small mt-1">
                      Existing file: {getFileNameFromPath(formData.previousSchoolResult)}
                    </div>
                  )}
                  {formData.previousSchoolResult instanceof File && (
                    <div className="text-muted small mt-1">
                      New file selected: {formData.previousSchoolResult.name}
                    </div>
                  )}

                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label
                    htmlFor="tcCertificate"
                    className="form-label"
                  >
                    TC Certificate<span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    id="tcCertificate"
                    name="tcCertificate"
                    className="form-control"
                    accept="image/*,application/pdf"
                    onChange={handleChange}

                  />
                  {typeof formData.tcCertificate === 'string' && (
                    <div className="text-muted small mt-1">
                      Existing file: {getFileNameFromPath(formData.tcCertificate)}
                    </div>
                  )}
                  {formData.tcCertificate instanceof File && (
                    <div className="text-muted small mt-1">
                      New file selected: {formData.tcCertificate.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )
      }

      <div className="row">
        <div className="col-md-4">
          <div className="mb-3">
            <label
              htmlFor="proofOfResidence"
              className="form-label"
            >
              Proof Of Residence<span className="text-danger">*</span>
            </label>
            <input
              type="file"
              id="proofOfResidence"
              name="proofOfResidence"
              className="form-control"
              accept="image/*,application/pdf"
              onChange={handleChange}
              required
            />
          </div>
        </div>


        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="aadharPassportNumber" className="form-label">
              Aadhar/Passport Number<span className="text-danger">*</span>
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
          {" "}
          <div className="mb-3">
            <label
              htmlFor="aadharPassportFile"
              className="form-label"
            >
              Aadhar/Passport Upload<span className="text-danger">*</span>
            </label>
            <input
              type="file"
              id="aadharPassportFile"
              name="aadharPassportFile"
              className="form-control"
              accept="image/*,application/pdf"
              onChange={handleChange}
            />
            {typeof formData.aadharPassportFile === 'string' && (
              <div className="text-muted small mt-1">
                Existing file: {getFileNameFromPath(formData.aadharPassportFile)}
              </div>
            )}
            {formData.aadharPassportFile instanceof File && (
              <div className="text-muted small mt-1">
                New file selected: {formData.aadharPassportFile.name}
              </div>
            )}
          </div>
        </div>

        <div className="col-md-3">
          {" "}
          <div className="mb-3">
            <label htmlFor="studentCategory" className="form-label">
              Category<span className="text-danger">*</span>
            </label>
            <select
              id="studentCategory"
              name="studentCategory"
              className="form-control"
              value={formData.studentCategory}
              onChange={handleChange}
              disabled={formData.nationality === 'SAARC Countries' || formData.nationality === 'International'}
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

        {formData.studentCategory !== "General" && (
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="castCertificate" className="form-label">
                Caste Certificate<span className="text-danger">*</span>
              </label>
              <input
                type="file"
                id="castCertificate"
                name="castCertificate"
                className="form-control"
                accept="image/*,application/pdf"
                onChange={handleChange}

              />
              {typeof formData.castCertificate === 'string' && (
                <div className="text-muted small mt-1">
                  Existing file: {getFileNameFromPath(formData.castCertificate)}
                </div>
              )}
              {formData.castCertificate instanceof File && (
                <div className="text-muted small mt-1">
                  New file selected: {formData.castCertificate.name}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="card-header mb-2">
        <h4 className="card-title text-center custom-heading-font">
          Sibling Information Study In Same School<span className="text-danger">*</span>
        </h4>
      </div>
      <div className="row">
        <div className="form-check ms-1 mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheck1"
            name="siblingInfoChecked"
            checked={formData.siblingInfoChecked}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="customCheck1">
            Incase of no sibling Click here.
          </label>
        </div>

        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="relationType" className="form-label">
              Relation Type{!formData.siblingInfoChecked && <span className="text-danger">*</span>}
            </label>
            <select
              id="relationType"
              name="relationType"
              className="form-control"
              value={formData.relationType || ''}
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
          {" "}
          <div className="mb-3">
            <label htmlFor="siblingName" className="form-label">
              Name <span className="text-danger">*</span>
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
          {" "}
          <div className="mb-3">
            <label htmlFor="idCardFile" className="form-label">
              ID Card <span className="text-danger">*</span>
            </label>
            <input
              type="file"
              id="idCardFile"
              name="idCardFile"
              className="form-control"
              accept="image/*,application/pdf"
              onChange={handleChange}
              required={!formData.siblingInfoChecked}
              disabled={formData.siblingInfoChecked}
            />
          </div>
        </div>
      </div>

      <div className="card-header mb-2">
        <h4 className="card-title text-center custom-heading-font">
          Family Information <span className="text-danger">*</span>
        </h4>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="parentalStatus" className="form-label">
              Parental Status <span className="text-danger">*</span>
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

      {formData.parentalStatus !== 'Single Mother' && (
        <div className='row'>
          {/* Father Name */}
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="fatherName" className="form-label">
                Father Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                className="form-control"
                value={formData.fatherName}
                onChange={handleChange}
                required={formData.parentalStatus !== 'Single Mother'}
                disabled={formData.parentalStatus === 'Single Mother'}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="fatherContactNo" className="form-label">
                Father Contact Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                id="fatherContactNo"
                name="fatherContactNo"
                className="form-control"
                value={formData.fatherContactNo}
                onChange={handleChange}
                required={formData.parentalStatus !== 'Single Mother'}
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
              // required={formData.parentalStatus !== 'Single Mother'}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="fatherProfession" className="form-label">
                Father Profession <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="fatherProfession"
                name="fatherProfession"
                className="form-control"
                value={formData.fatherProfession}
                onChange={handleChange}
                required={formData.parentalStatus !== 'Single Mother'}
              />
            </div>
          </div>
        </div>
      )}

      {formData.parentalStatus !== 'Single Father' && (
        <div className='row'>
          {/* Mother Name */}
          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="motherName" className="form-label">
                Mother Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                className="form-control"
                value={formData.motherName}
                onChange={handleChange}
                required={formData.parentalStatus !== 'Single Father'}
                disabled={formData.parentalStatus === 'Single Father'}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="motherContactNo" className="form-label">
                Mother Contact Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                id="motherContactNo"
                name="motherContactNo"
                className="form-control"
                value={formData.motherContactNo}
                onChange={handleChange}
                required={formData.parentalStatus !== 'Single Father'}
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
              // required={formData.parentalStatus !== 'Single Father'}
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="mb-3">
              <label htmlFor="motherProfession" className="form-label">
                Mother Profession <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="motherProfession"
                name="motherProfession"
                className="form-control"
                value={formData.motherProfession}
                onChange={handleChange}
                required={formData.parentalStatus !== 'Single Father'}
              />
            </div>
          </div>
        </div>
      )}


      {!showAdditionalData ? (
        <>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary custom-submit-button"
              onClick={handleSave}
            >
              Save & Continue
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="card-header mb-2">
              <h4 className="card-title text-center custom-heading-font">
                Understanding
              </h4>
            </div>
            <div className="form-check ms-1 mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreementCheck"
                name="agreementChecked"
                checked={formData.agreementChecked}
                onChange={handleChange}

              />
              <label
                className="form-check-label"
                htmlFor="agreementCheck"
              >
                I Understand & agree that the registration of my ward does not guarantee admission to the school & the registration fee is neither transferable nor refundable.
              </label>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label htmlFor="paymentMode" className="form-label">
                  Payment Option <span className="text-danger">*</span>
                </label>
                <select
                  id="paymentMode"
                  name="paymentMode"
                  className="form-control"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Online">Online</option>
                </select>
              </div>
            </div>
          </div>

          {formData.paymentMode === 'Cheque' && (
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="chequeNumber" className="form-label">
                    Cheque Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="chequeNumber"
                    name="chequeNumber"
                    className="form-control"
                    value={formData.chequeNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="bankName" className="form-label">
                    Bank Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    className="form-control"
                    value={formData.bankName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary custom-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Form;
