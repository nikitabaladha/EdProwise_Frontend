import React, { useState } from 'react'
import CityData from "../../../../../CityData.json";
import { useNavigate } from 'react-router-dom';
const StudentAdmissionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    registrationNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    age: '',
    nationality: '',
    gender: '',
    bloodGroup: '',
    classApplyingFor: '',
    shift: '',
    currentAddress: '',
    cityStateCountry: '',
    pincode: '',
    parentContactNumber: '',
    motherLanguage: '',
    previousSchoolName: '',
    addressOfPreviousSchool: '',
    previousSchoolBoard: '',
    previousSchoolResult: null,
    tcCertificate: null,
    proofOfResidence: null,
    aadharPassportNumber: '',
    aadharPassportFile: null,
    studentCategory: '',
    castCertificate: null,
    siblingInfoChecked: false,
    relationType: '',
    siblingName: '',
    idCardFile: null,
    parentalStatus: '',
    fatherName: '',
    fatherContactNo: '',
    fatherQualification: '',
    fatherProfession: '',
    motherName: '',
    motherContactNo: '',
    motherQualification: '',
    motherProfession: '',
    name: '',
    paymentMode: '',
  });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      // Handle nationality change
      if (name === 'nationality') {
        setFormData(prev => ({
          ...prev,
          nationality: value,
          studentCategory: (value === 'SAARC Countries' || value === 'International')
            ? 'General'
            : prev.studentCategory
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  const isNursery = formData.classApplyingFor === "Nursery";

  const navigateToAdmissionOfficialForm = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/admission-form/admission-details`);
  };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Student Admission Form
                  </h4>
                </div>
              </div>
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
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
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
                        Age
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
                        Nationality
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
                        Gender
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

                  <div className="col-md-4">
                    {" "}
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

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="classApplyingFor" className="form-label">
                        Class Applying For
                      </label>
                      <select
                        id="classApplyingFor"
                        name="classApplyingFor"
                        className="form-control"
                        value={formData.classApplyingFor}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Class</option>   
                        <option value="Nursery">Nursery</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="shift" className="form-label">
                        Shift
                      </label>
                      <select
                        id="shift"
                        name="shift"
                        className="form-control"
                        value={formData.shift}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Shift</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">
                          Afternoon
                        </option>
                        <option value="Evening">
                          Evening
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="currentAddress" className="form-label">
                      Current Address
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
                        City-State-Country
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
                        Pincode
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
                        Parent Contact No.
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
                        Mother Language
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
                !isNursery &&(
                  <>
                    <div className="row">
                  <div className="col-md-6">
                    {" "}
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
                    {" "}
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
                    {" "}
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
                    <div className="mb-3">
                      <label
                        htmlFor="previousSchoolResult"
                        className="form-label"
                      >
                        Result Of Previous School
                      </label>
                      <input
                        type="file"
                        id="previousSchoolResult"
                        name="previousSchoolResult"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="tcCertificate"
                        className="form-label"
                      >
                        TC Certificate
                      </label>
                      <input
                        type="file"
                        id="tcCertificate"
                        name="tcCertificate"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        required
                      />
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
                        Proof Of Residence
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
                        Aadhar/Passport Number
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
                        Aadhar/Passport Upload
                      </label>
                      <input
                        type="file"
                        id="aadharPassportFile"
                        name="aadharPassportFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="studentCategory" className="form-label">
                        Category
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
                          Caste Certificate
                        </label>
                        <input
                          type="file"
                          id="castCertificate"
                          name="castCertificate"
                          className="form-control"
                          accept="image/*,application/pdf"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  )}
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
                      name="siblingInfoChecked"
                      checked={formData.siblingInfoChecked}
                      onChange={handleChange}

                    />
                    <label
                      className="form-check-label"
                      htmlFor="customCheck1"
                    >
                      Incase of no sibling Click here.
                    </label>
                  </div>

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="relationType" className="form-label">
                        Relation Type
                      </label>
                      <select
                        id="relationType"
                        name="relationType"
                        className="form-control"
                        value={formData.relationType}
                        onChange={handleChange}
                        required={!formData.siblingInfoChecked} 
                        disabled={formData.siblingInfoChecked}

                      >
                        <option value="">Select </option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                      </select>
                    </div>
                  </div>


                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="siblingName" className="form-label">
                        Name
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
                        ID Card
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
                    Family Information
                  </h4>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="parentalStatus" className="form-label">
                        Parental Status
                      </label>
                      <select
                        id="parentalStatus"
                        name="parentalStatus"
                        className="form-control"
                        value={formData.parentalStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select </option>
                        <option value="Single Father">Single Father</option>
                        <option value="Single Mother">Single Mother</option>
                        <option value="Parents">Parents</option>
                      </select>
                    </div>
                  </div>
                </div>

                {formData.parentalStatus !== 'Single Mother' && (
                  <div className='row'>
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="fatherName" className="form-label">
                          Father Name
                        </label>
                        <input
                          type="text"
                          id="fatherName"
                          name="fatherName"
                          className="form-control"
                          value={formData.fatherName}
                          onChange={handleChange}
                          required={formData.parentalStatus !== 'Single Mother'}
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="fatherContactNo" className="form-label">
                          Father Contact Number
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
                          required={formData.parentalStatus !== 'Single Mother'}
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="fatherProfession" className="form-label">
                          Father Profession
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
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="motherName" className="form-label">
                          Mother Name
                        </label>
                        <input
                          type="text"
                          id="motherName"
                          name="motherName"
                          className="form-control"
                          value={formData.motherName}
                          onChange={handleChange}
                          required={formData.parentalStatus !== 'Single Father'}
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="motherContactNo" className="form-label">
                          Mother Contact Number
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
                          required={formData.parentalStatus !== 'Single Father'}
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="motherProfession" className="form-label">
                          Mother Profession
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


                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Understanding
                  </h4>
                </div>
                <div className="row">
                  {/* <div className="form-check ms-1 mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customCheck1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customCheck1"
                    >
                      I Understand & agree that the registration of my word does not guarantee admission to the school & the registration fee is neither transferable not refundable.
                    </label>
                  </div> */}

                  <div className="col-md-6">
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
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="paymentMode" className="form-label">
                        Payment Option
                      </label>
                      <select
                        id="paymentMode"
                        name="paymentMode"
                        className="form-control"
                        value={formData.paymentMode}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select </option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>

                  </div>
                  <div className="text-end">
                    {" "}
                    <button
                      type="submit"
                      onClick={(event) => navigateToAdmissionOfficialForm(event)}
                      className="btn btn-primary custom-submit-button"
                    >
                      Proceed Further
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
export default StudentAdmissionForm;
