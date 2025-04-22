import React, { useState, useEffect } from 'react';
import CityData from "../../../../../CityData.json";
import { useNavigate, useLocation } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';
import { toast } from 'react-toastify';
import putAPI from '../../../../../../api/putAPI';
import { validateFullForm } from '../FormValidation/FormValidation';

const UpdateAdmissionForm = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState('');
  const [existingStudents, setExistingStudents] = useState([]);
  const [showFullForm, setShowFullForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [sections, setSections] = useState([]);
  const location = useLocation();
  const student = location.state?.student;

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
    masterDefineClass: '',
    masterDefineShift: '',
    section: '',
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
    relationType: null,
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
    agreementChecked: false,
    name: '',
    paymentMode: '',
    chequeNumber: '',
    bankName: '',
    admissionFeesReceivedBy: ''
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (student) {
      setFormData({
        registrationNumber: student.registrationNumber,
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
        age: student.age?.toString() || '',
        nationality: student.nationality,
        gender: student.gender,
        bloodGroup: student.bloodGroup,
        masterDefineClass: student?.masterDefineClass?._id || student?.masterDefineClass || '',
        masterDefineShift: student?.masterDefineShift?._id || student?.masterDefineShift || '',
        section: student?.section?._id || student?.section || '',
        currentAddress: student.currentAddress,
        cityStateCountry: student.cityStateCountry,
        pincode: student.pincode,
        parentContactNumber: student.parentContactNumber || '',
        motherLanguage: student.motherLanguage || '',
        previousSchoolName: student.previousSchoolName || '',
        addressOfPreviousSchool: student.addressOfPreviousSchool || '',
        previousSchoolBoard: student.previousSchoolBoard || '',
        previousSchoolResult: student.previousSchoolResult || null,
        tcCertificate: student.tcCertificate || null,
        proofOfResidence: student.proofOfResidence || null,
        aadharPassportNumber: student.aadharPassportNumber || '',
        aadharPassportFile: student.aadharPassportFile || null,
        studentCategory: student.studentCategory || '',
        castCertificate: student.castCertificate || null,
        siblingInfoChecked: student.siblingInfoChecked || false,
        relationType: student.relationType || null,
        siblingName: student.siblingName || '',
        idCardFile: student.idCardFile || null,
        parentalStatus: student.parentalStatus || '',
        fatherName: student.fatherName || '',
        fatherContactNo: student.fatherContactNo || '',
        fatherQualification: student.fatherQualification || '',
        fatherProfession: student.fatherProfession || '',
        motherName: student.motherName || '',
        motherContactNo: student.motherContactNo || '',
        motherQualification: student.motherQualification || '',
        motherProfession: student.motherProfession || '',
        agreementChecked: student.agreementChecked || false,
        name: student.name || '',
        paymentMode: student.paymentMode || '',
        chequeNumber: student?.chequeNumber || '',
        bankName: student?.bankName || '',
        admissionNumber: student.AdmissionNumber || '',
        receiptNumber: student.receiptNumber || '',
        transactionNumber: student.transactionNumber || '',
        dateOfAdmission: student.dateOfAdmission ? student.dateOfAdmission.split('T')[0] : '',
        admissionFeesReceivedBy: student.admissionFeesReceivedBy || ''
      });
      setShowFullForm(true);
      setShowAdditionalData(true);
    }
  }, [student]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!schoolId) return;
        const response = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
        setClasses(response?.data?.data || []);
      } catch (error) {
        toast.error("Error fetching class and section data.");
      }
    };

    fetchData();
  }, [schoolId]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchShifts = async () => {
      try {
        const response = await getAPI(`/master-define-shift/${schoolId}`);
        if (!response.hasError) {
          const shiftArray = Array.isArray(response.data?.data) ? response.data.data : [];
          setShifts(shiftArray);
        } else {
          toast.error(response.message || "Failed to fetch shifts.");
        }
      } catch (err) {
        toast.error("Error fetching shift data.");
        console.error("Shift Fetch Error:", err);
      }
    };

    fetchShifts();
  }, [schoolId]);

  const handleClassChange = (e) => {
    const classId = e.target.value;
    const selectedClass = classes.find(c => c._id === classId);

    let filteredSections = selectedClass?.sections || [];
    if (formData.masterDefineShift) {
      filteredSections = filteredSections.filter(
        section => section.shiftId === formData.masterDefineShift
      );
    }

    setSections(filteredSections);

    setFormData({
      ...formData,
      masterDefineClass: classId,
      section: ''
    });
  };

  const handleShiftChange = (e) => {
    const shiftId = e.target.value;
    let filteredSections = [];

    if (formData.masterDefineClass) {
      const selectedClass = classes.find(c => c._id === formData.masterDefineClass);
      filteredSections = selectedClass?.sections.filter(
        section => section.shiftId === shiftId
      ) || [];
    }

    setSections(filteredSections);
    setFormData({
      ...formData,
      masterDefineShift: shiftId,
      section: ''
    });
  };

  useEffect(() => {
    if (student && classes.length > 0 && shifts.length > 0) {
      const selectedClass = classes.find(c => c._id === formData.masterDefineClass);
      if (selectedClass) {
        const filteredSections = selectedClass.sections.filter(
          section => section.shiftId === formData.masterDefineShift
        );
        setSections(filteredSections);
      }
    }
  }, [student, classes, shifts]);


  useEffect(() => {
    if (formData.masterDefineClass && formData.masterDefineShift && classes.length > 0) {
      const selectedClass = classes.find(c => c._id === formData.masterDefineClass);
      if (selectedClass) {
        const filteredSections = selectedClass.sections.filter(
          section => section.shiftId === formData.masterDefineShift
        );
        setSections(filteredSections);


        if (formData.section && !filteredSections.some(s => s._id === formData.section)) {
          setFormData(prev => ({ ...prev, section: '' }));
        }
      }
    }
  }, [formData.masterDefineClass, formData.masterDefineShift, classes]);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
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

  useEffect(() => {
    if (formData.dateOfBirth) {
      try {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        if (birthDate > today) {
          toast.error("Date of birth cannot be in the future");
          setFormData(prev => ({ ...prev, dateOfBirth: '', age: '' }));
          return;
        }
        const maxAgeDate = new Date();
        maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 120);
        if (birthDate < maxAgeDate) {
          toast.error("Please enter a valid date of birth");
          setFormData(prev => ({ ...prev, dateOfBirth: '', age: '' }));
          return;
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        setFormData(prev => ({
          ...prev,
          age: age > 0 ? age.toString() : '0'
        }));

      } catch (error) {
        console.error("Error calculating age:", error);
        toast.error("Invalid date format");
        setFormData(prev => ({ ...prev, dateOfBirth: '', age: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, age: '' }));
    }
  }, [formData.dateOfBirth]);

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (!formData.registrationNumber) {
      toast.error("Please select a registration number");
      return;
    }

    const student = existingStudents.find(
      s => s.registrationNumber === formData.registrationNumber
    );

    if (student) {
      setSelectedStudent(student);
      setFormData(prev => ({
        ...prev,
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
        nationality: student.nationality,
        gender: student.gender,
        masterDefineClass: student?.masterDefineClass?._id || student?.masterDefineClass || '',
        masterDefineShift: student?.masterDefineShift?._id || student?.masterDefineShift || '',
        section: student?.section?._id || student?.section || '',
        currentAddress: student.currentAddress,
        cityStateCountry: student.cityStateCountry,
        pincode: student.pincode,
        parentContactNumber: student.fatherContactNo || student.motherContactNo || '',
        previousSchoolName: student.previousSchoolName || '',
        addressOfPreviousSchool: student.addressOfpreviousSchool || '',
        previousSchoolBoard: student.previousSchoolBoard || '',
        previousSchoolResult: student?.previousSchoolResult || null,
        tcCertificate: student?.tcCertificate || null,
        aadharPassportNumber: student.aadharPassportNumber,
        castCertificate: student?.castCertificate || null,
        aadharPassportFile: student.aadharPassportFile || null,
        studentCategory: student.studentCategory,
        siblingInfoChecked: false,
        relationType: null,
        fatherName: student.fatherName,
        fatherContactNo: student.fatherContactNo,
        motherName: student.motherName,
        motherContactNo: student.motherContactNo,
        name: student.name,
        paymentMode: student.paymentMode,
      }));
    }

    setShowFullForm(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isNursery = isNurseryClass(formData.masterDefineClass);
    const error = validateFullForm(formData, isNursery);

    if (error) {
      toast.error(error);
      setIsSubmitting(false);
      return;
    }

    const submissionData = {
      ...formData,
      ...(formData.siblingInfoChecked && {
        relationType: null,
        siblingName: '',
        idCardFile: null
      })
    };

    const formDataObj = new FormData();


    Object.entries(submissionData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formDataObj.append(key, value, value.name);
        } else if (typeof value === 'string' && (key.endsWith('File') || key.endsWith('Certificate') || key.endsWith('Result'))) {

          formDataObj.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            formDataObj.append(`${key}[]`, item);
          });
        } else {
          formDataObj.append(key, value);
        }
      }
    });

    formDataObj.append('schoolId', schoolId);

    try {
      const response = await putAPI(`/update-admission-form/${student._id}`, formDataObj, {
        'Content-Type': 'multipart/form-data',
      });

      console.log("API response:", response);

      if (response?.hasError) {
        toast.error(response.message || 'Something went wrong');
      } else {
        toast.success(student ? 'Admission Form Updated successfully' : 'Admission Form Submitted successfully');
        const studentData = response.data?.student || response.student;
        console.log("Student data to send in navigate state:", studentData);
        navigate(`/school-dashboard/fees-module/form/admission-form/admission-details`, {
          state: {
            student: response.data?.admission || response.data?.student,
          },
        });
      }
    } catch (error) {
      const backendMessage = error?.response?.data?.message;
      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error('An error occurred during registration');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  const isNurseryClass = (classId) => {
    const selectedClass = classes.find(c => c._id === classId);
    return selectedClass?.className === "Nursery";
  };

  const isNursery = isNurseryClass(formData.masterDefineClass);

  const getFileNameFromPath = (path) => {
    if (!path) return '';
    return path.split('/').pop();
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
                        Date Of Birth<span className="text-danger">*</span>
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
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
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
                        <option value="International">International</option>
                        <option value="SAARC Countries">SAARC Countries</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
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
                        <option value="Female">Female</option>
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
                        disabled={!formData.masterDefineShift || !formData.masterDefineClass}
                      >
                        <option value="">Select Section</option>
                        {sections.map((section) => (
                          <option key={section._id} value={section._id}>
                            {section.name}
                          </option>
                        ))}
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
                      />
                    </div>
                  </div>
                </div>

                {!isNursery && (
                  <>
                    <div className="row">
                      <div className="col-md-6">
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
                            required={!student?.previousSchoolResult}
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
                            required={!student?.tcCertificate}
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
                )}

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
                        required={!student?.proofOfResidence}
                      />
                      {typeof formData.proofOfResidence === 'string' && (
                        <div className="text-muted small mt-1">
                          Existing file: {getFileNameFromPath(formData.proofOfResidence)}
                        </div>
                      )}
                      {formData.proofOfResidence instanceof File && (
                        <div className="text-muted small mt-1">
                          New file selected: {formData.proofOfResidence.name}
                        </div>
                      )}
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
                        required={!student?.aadharPassportFile}
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
                        <option value="OBC">OBC</option>
                        <option value="ST">ST</option>
                        <option value="SC">SC</option>
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
                          required={!student?.castCertificate}
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
                    <div className="mb-3">
                      <label htmlFor="relationType" className="form-label">
                        Relation Type<span className="text-danger">*</span>
                      </label>
                      <select
                        id="relationType"
                        name="relationType"
                        className="form-control"
                        value={formData.relationType || ''}
                        onChange={handleChange}
                        // required={!formData.siblingInfoChecked}
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
                        Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="siblingName"
                        name="siblingName"
                        className="form-control"
                        value={formData.siblingName}
                        onChange={handleChange}
                        // required={!formData.siblingInfoChecked}
                        disabled={formData.siblingInfoChecked}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="idCardFile" className="form-label">
                        ID Card<span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="idCardFile"
                        name="idCardFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        // required={!formData.siblingInfoChecked}
                        disabled={formData.siblingInfoChecked}
                      />
                      {typeof formData.idCardFile === 'string' && (
                        <div className="text-muted small mt-1">
                          Existing file: {getFileNameFromPath(formData.idCardFile)}
                        </div>
                      )}
                      {formData.idCardFile instanceof File && (
                        <div className="text-muted small mt-1">
                          New file selected: {formData.idCardFile.name}
                        </div>
                      )}
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
                          Father Name<span className="text-danger">*</span>
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
                          Father Contact Number<span className="text-danger">*</span>
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
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="fatherProfession" className="form-label">
                          Father Profession<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="fatherProfession"
                          name="fatherProfession"
                          className="form-control"
                          value={formData.fatherProfession}
                          onChange={handleChange}
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
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="motherContactNo" className="form-label">
                          Mother Contact Number<span className="text-danger">*</span>
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
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="motherProfession" className="form-label">
                          Mother Profession<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="motherProfession"
                          name="motherProfession"
                          className="form-control"
                          value={formData.motherProfession}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {!showAdditionalData ? (
                  null
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
                          required
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
                            Name<span className="text-danger">*</span>
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
                            Payment Option<span className="text-danger">*</span>
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
                            id="applicationDate"
                            name="applicationDate"
                            className="form-control"
                            value={student?.applicationDate ? student.applicationDate.substring(0, 10) : ''}
                            onChange={handleChange}
                            disabled
                          />

                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="admissionFeesReceivedBy" className="form-label">
                            Paymnet Mode
                          </label>
                          <input
                            type="text"
                            id="admissionFeesReceivedBy"
                            name="admissionFeesReceivedBy"
                            className="form-control"
                            value={formData.paymentMode}
                            onChange={handleChange}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="transactionNumber" className="form-label">
                            Transaction No./ Cheque No.
                          </label>
                          <input
                            type="text"
                            id="transactionNumber"
                            name="transactionNumber"
                            className="form-control"
                            value={formData.transactionNumber}
                            onChange={handleChange}
                            disabled
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
                            value={formData.receiptNumber}
                            onChange={handleChange}
                            disabled
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
                            value={formData.admissionNumber}
                            onChange={handleChange}
                            disabled
                          />
                        </div>
                      </div>

                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="text" style={{ marginLeft: "2px" }}>
                      </div>
                    </div>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Update'}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdmissionForm;