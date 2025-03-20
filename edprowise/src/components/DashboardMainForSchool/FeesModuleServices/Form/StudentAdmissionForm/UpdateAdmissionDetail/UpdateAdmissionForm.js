import React ,{useState}from 'react'
import { useLocation,useNavigate} from 'react-router-dom';
import CityData from "../../../../../CityData.json";

const UpdateAdmissionForm = () => {
  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student; // Get student data from state
  
  const [formData, setFormData] = useState(student || {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    nationality: "",
    gender: "",
    bloodGroup: "",
    masterDefineClass: "",
    streamSection: "",
    masterDefineShift: "",
    currentAddress: "",
    cityStateCountry: "",
    pincode: "",
    previousSchoolName: "",
    previousSchoolBoard: "",
    addressOfpreviousSchool: "",
    previousSchoolResult: "",
    tcCertificate: "",
    studentCategory: "",
    howReachUs: "",
    aadharPassportFile: "",
    aadharPassportNumber: "",
    castCertificate: "",
    siblingInfo: {
      hasSibling: false,
      relationType: "",
      name: "",
      idCardFile: "",
    },
    familyInfo: {
      parentalStatus: "",
      fatherName: "",
      fatherContactNo: "",
      fatherQualification: "",
      fatherProfession: "",
      motherName: "",
      motherContactNo: "",
      motherQualification: "",
      motherProfession: "",
    },
    understanding: {
      agree: false,
      name: "",
      paymentMode: "",
    },
    officialUse: {
      dateOfAdmission: "",
      admissionFeesReceivedBy: "",
      transationOrChequetNumber: "",
      receiptNumber: "",
      admissionNumber: "",
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle nested object changes (e.g., siblingInfo, familyInfo)
  const handleNestedChange = (parentKey, key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [parentKey]: {
        ...prevData[parentKey],
        [key]: value,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Student Data:", formData);

    // Add logic to submit the updated data to an API
    // Example:
    // fetch('/api/updateStudent', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   navigate('/students'); // Redirect after successful update
    // })
    // .catch(error => console.error('Error:', error));

    // For now, just log the data and redirect
    navigate('/students');
  };

  if (!student) {
    return <p>No student data available.</p>;
  }


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
                    Student Admission Form
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
                      <input
                        type="text"
                        id="registrationNumber"
                        name="registrationNumber"
                        className="form-control"
                        value={formData.registrationNumber}
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
                        value={formData.firstName}
                        onChange={handleChange}
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
                        value={formData.middleName}
                        onChange={handleChange}
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
                        value={formData.age}
                        onChange={handleChange}
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
                        value={formData.nationality}
                        onChange={handleChange}
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

                  <div className="col-md-2">
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
                        <option value="Other">
                          Other
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
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
                        <option value="">Select Gender</option>
                        <option value="O">O</option>
                        <option value="A">
                          A
                        </option>
                        <option value="AB">
                          AB
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="masterDefineClass" className="form-label">
                        Master Define Class
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
                        <option value="1st">1st</option>
                        <option value="2nd">
                          2nd
                        </option>
                        <option value="3rd">
                          3rd
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="masterDefineClass" className="form-label">
                        Master Define Class
                      </label>
                      <select
                        id="masterDefineClass"
                        name="masterDefineClass"
                        className="form-control"
                        value={formData.masterDefineClass}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Stream/Section</option>
                        <option value="Meachanical">Mechanical</option>
                        <option value="Computer">
                          Computer
                        </option>
                        <option value="Electric">
                        Electric
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="masterDefineShift" className="form-label">
                        Master Define Shift
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
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">
                          Afternoon
                        </option>
                        <option value="Night">
                          Night
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="currentaddress" className="form-label">
                      current Address
                    </label>
                    <textarea
                      className="form-control"
                      id="currentaddress"
                      name="currentAddress"
                      rows={3}
                      value={formData.currentaddress}
                      onChange={handleChange}
                      required
                    />
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
                  <div className="col-md-4">
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

                  <div className="col-md-4">
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
                </div>

                <div className="row">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="addressOfpreviousSchool" className="form-label">
                        Address Of Previous School
                      </label>
                      <input
                        type="text"
                        id="addressOfpreviousSchool"
                        name="addressOfpreviousSchool"
                        className="form-control"
                      value={formData.addressOfpreviousSchool}
                      onChange={handleChange}
                      />
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
                      <input
                        type="file"
                        id="previousSchoolResult"
                        name="previousSchoolResult"
                        className="form-control"
                        accept="image/*,application/pdf"
                        // onChange={handleChange}
                        required
                      />
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
                      <input
                        type="file"
                        id="tcCertificate"
                        name="tcCertificate"
                        className="form-control"
                        accept="image/*,application/pdf"
                        // onChange={handleChange}
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
                      <label htmlFor="reachus" className="form-label">
                        How did you reach us
                      </label>
                      <select
                        id="howReachUs"
                        name="howReachUs"
                        className="form-control"
                        // value={formData.affiliationUpto}
                        // onChange={handleChange}
                        required
                      >
                        <option value="">Select </option>
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
                      <input
                        type="file"
                        id="aadharPassportFile"
                        name="aadharPassportFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        // onChange={handleChange}
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
                        // value={formData.panNo}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
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
                        // onChange={handleChange}
                        required
                      />
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
                      <select
                        id="relationType"
                        name="relationType"
                        className="form-control"
                        // value={formData.affiliationUpto}
                        // onChange={handleChange}
                        required
                      >
                        <option value="">Select </option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">
                          Sister
                        </option>
                        <option value="Cousin">
                          Cousin
                        </option>
                        
                      </select>
                    </div>
                  </div>
                  

                  <div className="col-md-4">
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
                      <label htmlFor="idCardFile" className="form-label">
                        ID Card
                      </label>
                      <input
                        type="file"
                        id="idCardFile"
                        name="idCardFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        // onChange={handleChange}
                        required
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
                      <label htmlFor="relationType" className="form-label">
                        Parental Status
                      </label>
                      <select
                        id="relationType"
                        name="relationType"
                        className="form-control"
                        // value={formData.affiliationUpto}
                        // onChange={handleChange}
                        required
                      >
                        <option value="">Select </option>
                        <option value="Biological Parents">Biological Parents</option>
                        <option value="Adoptive Parents">
                        Adoptive Parents
                        </option>
                        <option value="Foster Parents">
                        Foster Parents
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
                      <label htmlFor="fatherContactNo" className="form-label">
                        Father Contact Number
                      </label>
                      <input
                        type="tel"
                        id="fatherContactNo"
                        name="fatherContactNo"
                        className="form-control"
                        // value={formData.schoolMobileNo}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="fatherQualification" className="form-label">
                        Father Higher Qualification
                      </label>
                      <input
                        type="text"
                        id="fatherQualification"
                        name="fatherQualification"
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
                      <label htmlFor="fatherProfession" className="form-label">
                        Father Profession
                      </label>
                      <input
                        type="text"
                        id="fatherProfession"
                        name="fatherProfession"
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
                      <label htmlFor="matherName" className="form-label">
                        Mother Name
                      </label>
                      <input
                        type="text"
                        id="matherName"
                        name="matherName"
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
                      <label htmlFor="motherContactNo" className="form-label">
                        Mother Contact Number
                      </label>
                      <input
                        type="tel"
                        id="motherContactNo"
                        name="motherContactNo"
                        className="form-control"
                        // value={formData.schoolMobileNo}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="motherQualification" className="form-label">
                      Mother Higher Qualification
                      </label>
                      <input
                        type="text"
                        id="motherQualification"
                        name="motherQualification"
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
                      <label htmlFor="motherProfession" className="form-label">
                        Mother Profession
                      </label>
                      <input
                        type="text"
                        id="motherProfession"
                        name="motherProfession"
                        className="form-control"
                        // value={formData.schoolName}
                        // onChange={handleChange}
                        required
                      />
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

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Admission Fees Received By
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
                    <div className="mb-3">
                      <label htmlFor="transationOrChequetNumber" className="form-label">
                         Transaction No./ Cheque No.
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
                      <label htmlFor="admissionNumber" className="form-label">
                         Admission No.
                      </label>
                      <input
                        type="text"
                        id="admissionNumber"
                        name="admissionNumber"
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
                    Save
                  </button>
                </div>
                <div className="text" style={{ marginLeft: "2px" }}
                >
                  {" "}
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Discard Registration
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
export default UpdateAdmissionForm;
