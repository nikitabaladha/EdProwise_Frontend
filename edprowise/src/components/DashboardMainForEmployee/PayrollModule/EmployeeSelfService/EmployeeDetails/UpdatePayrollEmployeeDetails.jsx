import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import putAPI from '../../../../../api/putAPI';
import { Link } from 'react-router-dom';

const UpdatePayrollEmployeeDetails = () => {
  const [experiences, setExperiences] = useState([{ id: 1 }]);
  const [nominees, setNominees] = useState([{ id: 1 }]);
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [academicYear, setAcademicYear] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    schoolId: '',
    employeeId: '',
    password: '',
    emailId: '',
    dateOfBirth: '',
    joiningDate: '',
    employeeName: '',
    contactNumber: '',
    gender: '',
    categoryOfEmployees: '',
    grade: '',
    jobDesignation: '',
    fatherName: '',
    spouseName: '',
    currentAddress: '',
    emergencyContactNumber: '',
    nationality: 'Indian',
    religion: '',
    maritalStatus: '',
    higherQualification: '',
    physicalHandicap: 'No',
    aadharPassportNumber: '',
    aadharPassportFile: null,
    panNumber: '',
    panFile: null,
    uanNumber: '',
    esicNumber: '',
    accountHolderName: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    accountType: '',
    class12Certificate: null,
    degreeCertificate: null,
    resume: null,
    experienceLetter: null,
    relievingLetter: null,
    nominationDetails: [{
      nomineeName: '',
      nomineeRelation: '',
      nomineeAadharNumber: '',
      nomineeAadharCardOrPassportFile: null,
      nomineeShearPercentage: '',
    }],
    experienceDetails: [{
      previousSchoolName: '',
      previousSchoolAddress: '',
      previousSchoolJoiningDate: '',
      previousSchoolLastDate: '',
      previousJobDesignation: '',
      numberOfExperience: '',
    }],
    securityDepositAmount: '',
    taxRegime: '',
    status: 'On Payroll',
  });

  const validateAadhar = (value) => /^\d{12}$/.test(value);
  const validatePAN = (value) => /^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value);
  const validatePhone = (value) => /^\d{10}$/.test(value);
  const validateNomineeShares = (nominationDetails) => {
    const total = nominationDetails.reduce((sum, nominee) => sum + Number(nominee.nomineeShearPercentage || 0), 0);
    return total === 100;
  };
  const validateDates = (experienceDetails) => {
    return experienceDetails.every((exp) => {
      if (exp.previousSchoolJoiningDate && exp.previousSchoolLastDate) {
        return new Date(exp.previousSchoolJoiningDate) < new Date(exp.previousSchoolLastDate);
      }
      return true;
    });
  };
  const validateFile = (file) => !file || (file.size <= 2 * 1024 * 1024 && ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type));

  // Validate nominee and experience details
  const validateNominee = (nominee) => {
    const errors = {};
    if (!nominee.nomineeName) errors.nomineeName = 'Nominee name is required';
    if (!nominee.nomineeRelation) errors.nomineeRelation = 'Nominee relation is required';
    if (!nominee.nomineeShearPercentage || isNaN(nominee.nomineeShearPercentage) || nominee.nomineeShearPercentage <= 0)
      errors.nomineeShearPercentage = 'Valid share percentage is required';
    if (nominee.nomineeAadharNumber && !validateAadhar(nominee.nomineeAadharNumber))
      errors.nomineeAadharNumber = 'Aadhar must be 12 digits';
    return errors;
  };

  const validateExperience = (exp) => {
    const errors = {};
    if (!exp.previousSchoolName) errors.previousSchoolName = 'School name is required';
    if (!exp.previousSchoolAddress) errors.previousSchoolAddress = 'School address is required';
    if (!exp.previousSchoolJoiningDate) errors.previousSchoolJoiningDate = 'Joining date is required';
    if (!exp.previousSchoolLastDate) errors.previousSchoolLastDate = 'Last date is required';
    if (!exp.previousJobDesignation) errors.previousJobDesignation = 'Job designation is required';
    if (!exp.numberOfExperience) errors.numberOfExperience = 'Years of experience is required';
    return errors;
  };

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      const id = userDetails?.schoolId;
      const empId = userDetails?.userId;
      const academicYear = localStorage.getItem("selectedAcademicYear");
      if (!id || !empId) {
        toast.error('Authentication details missing');
        return;
      }

      setSchoolId(id);
      setEmployeeId(empId);
      setAcademicYear(academicYear);
      try {
        setIsLoading(true);
        const response = await getAPI(`/get-employee-self-details/${id}/${empId}?academicYear=${academicYear}`);
        console.log('API Response:', response);

        if (!response.hasError && response.data?.data) {
          const { data } = response.data;
          const academicYearData = data.currentAcademicYearData || {};

          const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
          };

          const mergedData = {
            ...data,
            ...academicYearData,
            dateOfBirth: formatDate(data.dateOfBirth),
            joiningDate: formatDate(data.joiningDate),
            nominationDetails: data.nominationDetails?.map((nominee) => ({
              ...nominee,
              nomineeShearPercentage: String(nominee.nomineeShearPercentage),
            })) || [{ nomineeName: '', nomineeRelation: '', nomineeAadharNumber: '', nomineeAadharCardOrPassportFile: null, nomineeShearPercentage: '' }],
            experienceDetails: data.experienceDetails?.map((exp) => ({
              ...exp,
              previousSchoolJoiningDate: formatDate(exp.previousSchoolJoiningDate),
              previousSchoolLastDate: formatDate(exp.previousSchoolLastDate),
            })) || [{ previousSchoolName: '', previousSchoolAddress: '', previousSchoolJoiningDate: '', previousSchoolLastDate: '', previousJobDesignation: '', numberOfExperience: '' }],
          };

          console.log('Merged Data:', mergedData);

          setFormData((prev) => ({
            ...prev,
            ...mergedData,
          }));

          setNominees(mergedData.nominationDetails.length > 0
            ? mergedData.nominationDetails.map((_, i) => ({ id: i + 1 }))
            : [{ id: 1 }]);

          setExperiences(mergedData.experienceDetails.length > 0
            ? mergedData.experienceDetails.map((_, i) => ({ id: i + 1 }))
            : [{ id: 1 }]);

          if (response.data.isCloned) {
            toast.info(`Data for ${academicYear} initialized from previous academic year`);
          }
        } else {
          toast.error(response.data.message || "Failed to load employee details");
        }
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error(error.response.data.message || "Failed to load employee details");
      } finally {
        setIsLoading(false);
      }
    }; 
    fetchEmployeeDetails();
  }, []);

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === 'aadharPassportNumber' || (section === 'nominationDetails' && name === 'nomineeAadharNumber')) {
      if (!validateAadhar(value)) newErrors[name] = 'Must be 12 digits';
      else delete newErrors[name];
    } else if (name === 'panNumber') {
      if (!validatePAN(value)) newErrors[name] = 'Invalid PAN format';
      else delete newErrors[name];
    } else if (name === 'contactNumber' || name === 'emergencyContactNumber') {
      if (!validatePhone(value)) newErrors[name] = 'Must be 10 digits';
      else delete newErrors[name];
    } else if (section === 'nominationDetails' && name === 'nomineeShearPercentage') {
      const updatedNominees = formData.nominationDetails.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      );
      if (!validateNomineeShares(updatedNominees)) newErrors.nomineeShearPercentage = 'Nominee shares must sum to 100%';
      else delete newErrors.nomineeShearPercentage;
    }

    setErrors(newErrors);
 
    if (section === 'nominationDetails') {
      setFormData((prev) => {
        const updatedNominees = [...prev.nominationDetails];
        updatedNominees[index] = {
          ...updatedNominees[index],
          [name]: value,
        };
        return {
          ...prev,
          nominationDetails: updatedNominees,
        };
      });
    } else if (section === 'experienceDetails') {
      setFormData((prev) => {
        const updatedExperiences = [...prev.experienceDetails];
        updatedExperiences[index] = {
          ...updatedExperiences[index],
          [name]: value,
        };

        // for previous
      if (name === 'previousSchoolJoiningDate' || name === 'previousSchoolLastDate') {
          const startDate = new Date(updatedExperiences[index].previousSchoolJoiningDate);
          const endDate = new Date(updatedExperiences[index].previousSchoolLastDate);
          if (!isNaN(startDate) && !isNaN(endDate)) {
            if (startDate < endDate) {
              const diffMs = endDate - startDate;
              const diffDays = diffMs / (1000 * 60 * 60 * 24);
              const totalYears = (diffDays / 365.25).toFixed(1);
              updatedExperiences[index].numberOfExperience = totalYears;
              delete newErrors[`experienceDetails[${index}][previousSchoolLastDate]`]; // Remove error if valid
            } else {
              updatedExperiences[index].numberOfExperience = ''; // Clear if dates are invalid
              if (updatedExperiences[index].previousSchoolJoiningDate && updatedExperiences[index].previousSchoolLastDate) {
                newErrors[`experienceDetails[${index}][previousSchoolLastDate]`] = 'End date must be after start date';
              } else {
                delete newErrors[`experienceDetails[${index}][previousSchoolLastDate]`];
              }
            }
          } else {
            updatedExperiences[index].numberOfExperience = '';
            delete newErrors[`experienceDetails[${index}][previousSchoolLastDate]`];
          }
        }
        return {
          ...prev,
          experienceDetails: updatedExperiences,
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e, section, index) => {
    const { name, files } = e.target;
    let newErrors = { ...errors };

     delete newErrors[name];
  if (section === 'nominationDetails') {
    delete newErrors[`nominationDetails[${index}][${name}]`];
  }

    if (files[0] && !validateFile(files[0])) {
      newErrors[name] = 'File must be JPEG, PNG, or PDF and less than 2MB';
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);

    if (section === 'nominationDetails') {
      setFormData((prev) => {
        const updatedNominees = [...prev.nominationDetails];
        updatedNominees[index] = {
          ...updatedNominees[index],
          [name]: files[0],
        };
        return {
          ...prev,
          nominationDetails: updatedNominees,
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };
 
  const addExperience = () => {
    const newExperience = { id: experiences.length + 1 };
    setExperiences([...experiences, newExperience]);
    setFormData((prev) => ({
      ...prev,
      experienceDetails: [...prev.experienceDetails, {
        previousSchoolName: '',
        previousSchoolAddress: '',
        previousSchoolJoiningDate: '',
        previousSchoolLastDate: '',
        previousJobDesignation: '',
        numberOfExperience: '',
      }],
    }));
  };

  const removeExperience = (id) => {
    if (id !== 1) {
      setExperiences(experiences.filter((exp) => exp.id !== id));
      setFormData((prev) => ({
        ...prev,
        experienceDetails: prev.experienceDetails.filter((_, index) => experiences[index].id !== id),
      }));
    }
  };

  const addNominee = () => {
    const newNominee = { id: nominees.length + 1 };
    setNominees([...nominees, newNominee]);
    setFormData((prev) => ({
      ...prev,
      nominationDetails: [...prev.nominationDetails, {
        nomineeName: '',
        nomineeRelation: '',
        nomineeAadharNumber: '',
        nomineeAadharCardOrPassportFile: null,
        nomineeShearPercentage: '',
      }],
    }));
  };

  const removeNominee = (id) => {
    if (id !== 1) {
      setNominees(nominees.filter((nom) => nom.id !== id));
      setFormData((prev) => ({
        ...prev,
        nominationDetails: prev.nominationDetails.filter((_, index) => nominees[index].id !== id),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Define fileFields
    const fileFields = [
      'aadharPassportFile', 'panFile', 'class12Certificate',
      'degreeCertificate', 'resume', 'experienceLetter', 'relievingLetter',
    ];

    // Validate all required fields
    let newErrors = { ...errors };

    // Validate main form fields
    if (!formData.employeeName) newErrors.employeeName = 'Employee name is required';
    if (!formData.emailId) newErrors.emailId = 'Email is required';
    if (!formData.contactNumber || !validatePhone(formData.contactNumber)) newErrors.contactNumber = 'Must be a valid 10-digit number';
    if (!formData.emergencyContactNumber || !validatePhone(formData.emergencyContactNumber)) newErrors.emergencyContactNumber = 'Must be a valid 10-digit number';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.fatherName) newErrors.fatherName = 'Father name is required';
    if (!formData.currentAddress) newErrors.currentAddress = 'Current address is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.religion) newErrors.religion = 'Religion is required';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
    if (!formData.higherQualification) newErrors.higherQualification = 'Higher qualification is required';
    if (!formData.physicalHandicap) newErrors.physicalHandicap = 'Physical handicap status is required';
    if (!formData.aadharPassportNumber || !validateAadhar(formData.aadharPassportNumber)) newErrors.aadharPassportNumber = 'Must be a valid 12-digit Aadhar number';
    if (!formData.panNumber || !validatePAN(formData.panNumber)) newErrors.panNumber = 'Must be a valid PAN number';
    if (!formData.accountHolderName) newErrors.accountHolderName = 'Account holder name is required';
    if (!formData.bankName) newErrors.bankName = 'Bank name is required';
    if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!formData.accountType) newErrors.accountType = 'Account type is required';
    if (!formData.securityDepositAmount || isNaN(formData.securityDepositAmount) || formData.securityDepositAmount <= 0) newErrors.securityDepositAmount = 'Valid security deposit amount is required';
    if (!formData.taxRegime) newErrors.taxRegime = 'Tax regime is required';
    if (!formData.categoryOfEmployees) newErrors.categoryOfEmployees = 'Category of employees is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.jobDesignation) newErrors.jobDesignation = 'Job designation is required';

    // Validate nomination details
    const validNominees = formData.nominationDetails.filter((nominee) => {
      const nomineeErrors = validateNominee(nominee);
      Object.keys(nomineeErrors).forEach((key) => {
        newErrors[`nominationDetails[${formData.nominationDetails.indexOf(nominee)}][${key}]`] = nomineeErrors[key];
      });
      return Object.keys(nomineeErrors).length === 0;
    });

    // Validate experience details
    const validExperiences = formData.experienceDetails.filter((exp) => {
      const expErrors = validateExperience(exp);
      Object.keys(expErrors).forEach((key) => {
        newErrors[`experienceDetails[${formData.experienceDetails.indexOf(exp)}][${key}]`] = expErrors[key];
      });
      return Object.keys(expErrors).length === 0;
    }); 

    // Validate nominee shares
    if (validNominees.length > 0 && !validateNomineeShares(validNominees)) {
      newErrors.nomineeShearPercentage = 'Nominee shares must sum to 100%';
    }

    // Validate experience dates
    if (validExperiences.length > 0 && !validateDates(validExperiences)) {
      newErrors.experienceDates = 'End date must be after start date for all experiences';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsLoading(false);
      toast.error('Please fix all validation errors before submitting');
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append basic fields (skip file fields and arrays)
      Object.keys(formData).forEach((key) => {
        if (
          !['nominationDetails', 'experienceDetails'].includes(key) &&
          !fileFields.includes(key) &&
          formData[key] !== null &&
          formData[key] !== undefined
        ) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append valid nomination details
      validNominees.forEach((nominee, index) => {
        Object.keys(nominee).forEach((key) => {
          if (key !== 'nomineeAadharCardOrPassportFile') {
            formDataToSend.append(`nominationDetails[${index}][${key}]`, nominee[key] || '');
          }
        });
        if (nominee.nomineeAadharCardOrPassportFile instanceof File) {
          formDataToSend.append(
            `nominationDetails[${index}][nomineeAadharCardOrPassportFile]`,
            nominee.nomineeAadharCardOrPassportFile
          );
        }
      });

      // Append valid experience details
      validExperiences.forEach((exp, index) => {
        Object.keys(exp).forEach((key) => {
          formDataToSend.append(`experienceDetails[${index}][${key}]`, exp[key] || '');
        });
      });

      // Append main files (only if new File)
      fileFields.forEach((field) => {
        if (formData[field] instanceof File) {
          formDataToSend.append(field, formData[field]);
        }
      });

      // Debug: Log FormData entries
      for (let pair of formDataToSend.entries()) {
        console.log(`FormData Entry: ${pair[0]}: ${pair[1]}`);
      }

      // Submit to backend
      const response = await putAPI(
        `/update-employee-details/${schoolId}/${employeeId}?academicYear=${academicYear}`,
        formDataToSend,
        { 'Content-Type': 'multipart/form-data' },
        true
      );
      console.log('put api response:', response);

      if (!response.hasError) {
        toast.success('Employee details updated successfully');
      } else {
        toast.error(response.message || 'Failed to update employee details');
        if (response.errors) {
          setErrors(response.errors);
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to update employee details');
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Render form (same as provided, no changes needed unless additional validation UI is desired)
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="payroll-title text-center mb-0">
                    Employee Details
                  </h4>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Form fields (same as provided) */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="employeeId" className="form-label">
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        className="form-control"
                        value={employeeId || ''}
                        readOnly
                        placeholder="Employee ID"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="employeeName" className="form-label">
                        Name of Employee <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeName"
                        name="employeeName"
                        className={`form-control ${errors.employeeName ? 'is-invalid' : ''}`}
                        value={formData.employeeName}
                        onChange={handleChange}
                        required
                        placeholder="Enter Employee Name"
                      />
                      {errors.employeeName && <div className="invalid-feedback">{errors.employeeName}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="joiningDate" className="form-label">
                        Joining Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="joiningDate"
                        name="joiningDate"
                        className="form-control"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="categoryOfEmployees" className="form-label">
                        Category of Employees <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="categoryOfEmployees"
                        name="categoryOfEmployees"
                        className={`form-control ${errors.categoryOfEmployees ? 'is-invalid' : ''}`}
                        value={formData.categoryOfEmployees}
                        onChange={handleChange}
                        required
                        placeholder="Enter Category"
                      />
                      {errors.categoryOfEmployees && <div className="invalid-feedback">{errors.categoryOfEmployees}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">
                        Grade <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="grade"
                        name="grade"
                        className={`form-control ${errors.grade ? 'is-invalid' : ''}`}
                        value={formData.grade}
                        onChange={handleChange}
                        required
                        placeholder="Enter Grade"
                      />
                      {errors.grade && <div className="invalid-feedback">{errors.grade}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="jobDesignation" className="form-label">
                        Job Designation <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="jobDesignation"
                        name="jobDesignation"
                        className={`form-control ${errors.jobDesignation ? 'is-invalid' : ''}`}
                        value={formData.jobDesignation}
                        onChange={handleChange}
                        required
                        placeholder="Enter Job Designation"
                      />
                      {errors.jobDesignation && <div className="invalid-feedback">{errors.jobDesignation}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dateOfBirth" className="form-label">
                        Date of Birth <span className="text-danger">*</span>
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
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="fatherName" className="form-label">
                        Father Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        className={`form-control ${errors.fatherName ? 'is-invalid' : ''}`}
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                        placeholder="Enter Father Name"
                      />
                      {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="spouseName" className="form-label">
                        Spouse Name
                      </label>
                      <input
                        type="text"
                        id="spouseName"
                        name="spouseName"
                        className="form-control"
                        value={formData.spouseName}
                        onChange={handleChange}
                        placeholder="Enter Spouse Name"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="currentAddress" className="form-label">
                        Current Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className={`form-control ${errors.currentAddress ? 'is-invalid' : ''}`}
                        id="currentAddress"
                        name="currentAddress"
                        rows={3}
                        value={formData.currentAddress}
                        onChange={handleChange}
                        required
                      />
                      {errors.currentAddress && <div className="invalid-feedback">{errors.currentAddress}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        Contact Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter 10-digit number"
                      />
                      {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="emergencyContactNumber" className="form-label">
                        Emergency Contact Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        id="emergencyContactNumber"
                        name="emergencyContactNumber"
                        className={`form-control ${errors.emergencyContactNumber ? 'is-invalid' : ''}`}
                        value={formData.emergencyContactNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter 10-digit number"
                      />
                      {errors.emergencyContactNumber && <div className="invalid-feedback">{errors.emergencyContactNumber}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="emailId" className="form-label">
                        Email ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="emailId"
                        name="emailId"
                        className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                        value={formData.emailId}
                        onChange={handleChange}
                        required
                        placeholder="example@gmail.com"
                      />
                      {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="nationality" className="form-label">
                        Nationality <span className="text-danger">*</span>
                      </label>
                      <select
                        id="nationality"
                        name="nationality"
                        className={`form-control ${errors.nationality ? 'is-invalid' : ''}`}
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Nationality</option>
                        <option value="Indian">Indian</option>
                        <option value="Nepalese">Nepalese</option>
                        <option value="Bhutanese">Bhutanese</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="religion" className="form-label">
                        Religion <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="religion"
                        name="religion"
                        className={`form-control ${errors.religion ? 'is-invalid' : ''}`}
                        value={formData.religion}
                        onChange={handleChange}
                        required
                        placeholder="Enter Religion"
                      />
                      {errors.religion && <div className="invalid-feedback">{errors.religion}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                      </select>
                      {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="maritalStatus" className="form-label">
                        Marital Status <span className="text-danger">*</span>
                      </label>
                      <select
                        id="maritalStatus"
                        name="maritalStatus"
                        className={`form-control ${errors.maritalStatus ? 'is-invalid' : ''}`}
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="Married">Married</option>
                        <option value="Un-Married">Un-Married</option>
                        <option value="Widower">Widower</option>
                        <option value="Divorcee">Divorcee</option>
                      </select>
                      {errors.maritalStatus && <div className="invalid-feedback">{errors.maritalStatus}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="higherQualification" className="form-label">
                        Higher Qualification <span className="text-danger">*</span>
                      </label>
                      <select
                        id="higherQualification"
                        name="higherQualification"
                        className={`form-control ${errors.higherQualification ? 'is-invalid' : ''}`}
                        value={formData.higherQualification}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Qualification</option>
                        <option value="Below Class 12">Below Class 12</option>
                        <option value="Upto Class 12">Upto Class 12</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Post Graduate">Post Graduate</option>
                      </select>
                      {errors.higherQualification && <div className="invalid-feedback">{errors.higherQualification}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="physicalHandicap" className="form-label">
                        Physical Handicap <span className="text-danger">*</span>
                      </label>
                      <select
                        id="physicalHandicap"
                        name="physicalHandicap"
                        className={`form-control ${errors.physicalHandicap ? 'is-invalid' : ''}`}
                        value={formData.physicalHandicap}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {errors.physicalHandicap && <div className="invalid-feedback">{errors.physicalHandicap}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="aadharPassportNumber" className="form-label">
                        Aadhar Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="aadharPassportNumber"
                        name="aadharPassportNumber"
                        className={`form-control ${errors.aadharPassportNumber ? 'is-invalid' : ''}`}
                        value={formData.aadharPassportNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter 12-digit Aadhar Number"
                      />
                      {errors.aadharPassportNumber && <div className="invalid-feedback">{errors.aadharPassportNumber}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="aadharPassportFile" className="form-label">
                        Aadhar Upload
                      </label>
                      {formData.aadharPassportFile && typeof formData.aadharPassportFile === 'string' && (
                        <small className='ms-2'>Current: {formData.aadharPassportFile.split('/').pop()}</small>
                      )}
                      <input
                        type="file"
                        id="aadharPassportFile"
                        name="aadharPassportFile"
                        className={`form-control ${errors.aadharPassportFile ? 'is-invalid' : ''}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e)}
                      />
                      {errors.aadharPassportFile && <div className="invalid-feedback">{errors.aadharPassportFile}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="panNumber" className="form-label">
                        PAN Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="panNumber"
                        name="panNumber"
                        className={`form-control ${errors.panNumber ? 'is-invalid' : ''}`}
                        value={formData.panNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter PAN Number"
                      />
                      {errors.panNumber && <div className="invalid-feedback">{errors.panNumber}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="panFile" className="form-label">
                        PAN Upload
                      </label>
                      {formData.panFile && typeof formData.panFile === 'string' && (
                        <small className='ms-2'>Current: {formData.panFile.split('/').pop()}</small>
                      )}
                      <input
                        type="file"
                        id="panFile"
                        name="panFile"
                        className={`form-control ${errors.panFile ? 'is-invalid' : ''}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e)}
                      />
                      {errors.panFile && <div className="invalid-feedback">{errors.panFile}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="uanNumber" className="form-label">
                        UAN Number
                      </label>
                      <input
                        type="text"
                        id="uanNumber"
                        name="uanNumber"
                        className="form-control"
                        value={formData.uanNumber}
                        onChange={handleChange}
                        placeholder="Enter UAN Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="esicNumber" className="form-label">
                        ESIC Number
                      </label>
                      <input
                        type="text"
                        id="esicNumber"
                        name="esicNumber"
                        className="form-control"
                        value={formData.esicNumber}
                        onChange={handleChange}
                        placeholder="Enter ESIC Number"
                      />
                    </div>
                  </div>
                </div>

                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Bank Account Information
                  </h4>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="accountHolderName" className="form-label">
                        Account Holder Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="accountHolderName"
                        name="accountHolderName"
                        className={`form-control ${errors.accountHolderName ? 'is-invalid' : ''}`}
                        value={formData.accountHolderName}
                        onChange={handleChange}
                        required
                        placeholder="Enter Account Holder Name"
                      />
                      {errors.accountHolderName && <div className="invalid-feedback">{errors.accountHolderName}</div>}
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
                        className={`form-control ${errors.bankName ? 'is-invalid' : ''}`}
                        value={formData.bankName}
                        onChange={handleChange}
                        required
                        placeholder="Enter Bank Name"
                      />
                      {errors.bankName && <div className="invalid-feedback">{errors.bankName}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="ifscCode" className="form-label">
                        IFSC Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="ifscCode"
                        name="ifscCode"
                        className={`form-control ${errors.ifscCode ? 'is-invalid' : ''}`}
                        value={formData.ifscCode}
                        onChange={handleChange}
                        required
                        placeholder="Enter IFSC Code"
                      />
                      {errors.ifscCode && <div className="invalid-feedback">{errors.ifscCode}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="accountNumber" className="form-label">
                        Account Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        className={`form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
                        value={formData.accountNumber}
                        onChange={handleChange}
                        required
                        placeholder="Enter Account Number"
                      />
                      {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="accountType" className="form-label">
                        Account Type <span className="text-danger">*</span>
                      </label>
                      <select
                        id="accountType"
                        name="accountType"
                        className={`form-control ${errors.accountType ? 'is-invalid' : ''}`}
                        value={formData.accountType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Account Type</option>
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                        <option value="Salary">Salary</option>
                      </select>
                      {errors.accountType && <div className="invalid-feedback">{errors.accountType}</div>}
                    </div>
                  </div>
                </div>

                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Document Upload
                  </h4>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="class12Certificate" className="form-label">
                        Class 12 Certificate
                      </label>
                      {formData.class12Certificate && typeof formData.class12Certificate === 'string' && (
                        <small className='ms-2'>Current: {formData.class12Certificate.split('/').pop()}</small>
                      )}
                      <input
                        type="file"
                        id="class12Certificate"
                        name="class12Certificate"
                        className={`form-control ${errors.class12Certificate ? 'is-invalid' : ''}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e)}
                      />
                      {errors.class12Certificate && <div className="invalid-feedback">{errors.class12Certificate}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="degreeCertificate" className="form-label">
                        Degree Certificate
                      </label>
                      {formData.degreeCertificate && typeof formData.degreeCertificate === 'string' && (
                        <small className='ms-2'>Current: {formData.degreeCertificate.split('/').pop()}</small>
                      )}
                      <input
                        type="file"
                        id="degreeCertificate"
                        name="degreeCertificate"
                        className={`form-control ${errors.degreeCertificate ? 'is-invalid' : ''}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e)}
                      />
                      {errors.degreeCertificate && <div className="invalid-feedback">{errors.degreeCertificate}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="resume" className="form-label">
                        Resume
                      </label>
                      {formData.resume && typeof formData.resume === 'string' && (
                        <small className='ms-2'>Current: {formData.resume.split('/').pop()}</small>
                      )}
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        className={`form-control ${errors.resume ? 'is-invalid' : ''}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e)}
                      />
                      {errors.resume && <div className="invalid-feedback">{errors.resume}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="experienceLetter" className="form-label">
                        Experience Letter
                      </label>
                      {formData.experienceLetter && typeof formData.experienceLetter === 'string' && (
                        <small className='ms-2'>Current: {formData.experienceLetter.split('/').pop()}</small>
                      )}
                      <input
                        type="file"
                        id="experienceLetter"
                        name="experienceLetter"
                        className={`form-control ${errors.experienceLetter ? 'is-invalid' : ''}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e)}
                      />
                      {errors.experienceLetter && <div className="invalid-feedback">{errors.experienceLetter}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="relievingLetter" className="form-label">
                        Relieving Letter
                      </label>
                      {formData.relievingLetter && typeof formData.relievingLetter === 'string' && (
                        <small className='ms-2'>Current: {formData.relievingLetter.split('/').pop()}</small>
                      )}
                      <input
                        type="file"
                        id="relievingLetter"
                        name="relievingLetter"
                        className={`form-control ${errors.relievingLetter ? 'is-invalid' : ''}`}
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e)}
                      />
                      {errors.relievingLetter && <div className="invalid-feedback">{errors.relievingLetter}</div>}
                    </div>
                  </div>
                </div>

                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Nomination For Gratuity & Others
                  </h4>
                </div>
                {nominees.map((nominee, index) => (
                  <div key={nominee.id} className="row">
                    <div className="d-flex justify-content-between" style={{ padding: '0' }}>
                      <div className="card-header mt-0" style={{ padding: '0.50rem', borderBottom: 'none' }}>
                        <h4 className="card-title text-center">
                          Nominee {index + 1}
                        </h4>
                      </div>
                      {nominee.id !== 1 && (
                        <div className="card-header p-0">
                          <Link className="btn btn-soft-danger btn-sm" onClick={() => removeNominee(nominee.id)}>
                            <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor={`nomineeName-${nominee.id}`} className="form-label">
                          Nominee Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id={`nomineeName-${nominee.id}`}
                          name="nomineeName"
                          className={`form-control ${errors[`nominationDetails[${index}][nomineeName]`] ? 'is-invalid' : ''}`}
                          value={formData.nominationDetails[index]?.nomineeName || ''}
                          onChange={(e) => handleChange(e, 'nominationDetails', index)}
                          required
                          placeholder="Enter Nominee Name"
                        />
                        {errors[`nominationDetails[${index}][nomineeName]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeName]`]}</div>}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor={`nomineeRelation-${nominee.id}`} className="form-label">
                          Relation <span className="text-danger">*</span>
                        </label>
                        <select
                          id={`nomineeRelation-${nominee.id}`}
                          name="nomineeRelation"
                          className={`form-control ${errors[`nominationDetails[${index}][nomineeRelation]`] ? 'is-invalid' : ''}`}
                          value={formData.nominationDetails[index]?.nomineeRelation || ''}
                          onChange={(e) => handleChange(e, 'nominationDetails', index)}
                          required
                        >
                          <option value="">Select Relation</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Child">Child</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Sibling">Sibling</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors[`nominationDetails[${index}][nomineeRelation]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeRelation]`]}</div>}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor={`nomineeAadharNumber-${nominee.id}`} className="form-label">
                          Aadhar Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id={`nomineeAadharNumber-${nominee.id}`}
                          name="nomineeAadharNumber"
                          className={`form-control ${errors[`nominationDetails[${index}][nomineeAadharNumber]`] ? 'is-invalid' : ''}`}
                          value={formData.nominationDetails[index]?.nomineeAadharNumber || ''}
                          onChange={(e) => handleChange(e, 'nominationDetails', index)}
                          placeholder="Enter Nominee Aadhar Number"
                        />
                        {errors[`nominationDetails[${index}][nomineeAadharNumber]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeAadharNumber]`]}</div>}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor={`nomineeAadharCardOrPassportFile-${nominee.id}`} className="form-label">
                          Aadhar Card/Passport Upload <span className="text-danger">*</span>
                        </label>
                        {formData.nominationDetails[index]?.nomineeAadharCardOrPassportFile && typeof formData.nominationDetails[index].nomineeAadharCardOrPassportFile === 'string' && (
                          <small className='ms-2'>Current: {formData.nominationDetails[index].nomineeAadharCardOrPassportFile.split('/').pop()}</small>
                        )}
                        <input
                          type="file"
                          id={`nomineeAadharCardOrPassportFile-${nominee.id}`}
                          name="nomineeAadharCardOrPassportFile"
                          className={`form-control ${errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`] ? 'is-invalid' : ''}`}
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileChange(e, 'nominationDetails', index)}
                        />
                        {errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeAadharCardOrPassportFile]`]}</div>}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor={`nomineeShearPercentage-${nominee.id}`} className="form-label">
                          Share Percentage (%) <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          id={`nomineeShearPercentage-${nominee.id}`}
                          name="nomineeShearPercentage"
                          className={`form-control ${errors.nomineeShearPercentage || errors[`nominationDetails[${index}][nomineeShearPercentage]`] ? 'is-invalid' : ''}`}
                          value={formData.nominationDetails[index]?.nomineeShearPercentage || ''}
                          onChange={(e) => handleChange(e, 'nominationDetails', index)}
                          required
                          placeholder="Enter Nominee Share Percentage"
                          min="0"
                          max="100"
                        />
                        {errors.nomineeShearPercentage && <div className="invalid-feedback">{errors.nomineeShearPercentage}</div>}
                        {errors[`nominationDetails[${index}][nomineeShearPercentage]`] && <div className="invalid-feedback">{errors[`nominationDetails[${index}][nomineeShearPercentage]`]}</div>}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-end card-header">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={addNominee}
                  >
                    Add Nominee
                  </button>
                </div>

                <div className="card-header mt-1">
                  <h4 className="card-title text-center custom-heading-font">
                    Previous Employment
                  </h4>
                </div>
              {experiences.map((exp, index) => (
                  <div key={exp.id} className="row">
                    <div className="d-flex justify-content-between" style={{ padding: '0' }}>
                      <div className="card-header mt-0" style={{ padding: '0.50rem', borderBottom: 'none' }}>
                        <h4 className="card-title text-center">
                          Experience {index + 1}
                        </h4>
                      </div>
                      {exp.id !== 1 && (
                        <div className="card-header p-0">
                          <Link className="btn btn-soft-danger btn-sm" onClick={() => removeExperience(exp.id)}>
                            <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor={`previousSchoolName-${exp.id}`} className="form-label">
                          Name of School/Others <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id={`previousSchoolName-${exp.id}`}
                          name="previousSchoolName"
                          className={`form-control ${errors[`experienceDetails[${index}][previousSchoolName]`] ? 'is-invalid' : ''}`}
                          value={formData.experienceDetails[index]?.previousSchoolName || ''}
                          onChange={(e) => handleChange(e, 'experienceDetails', index)}
                          // required
                          placeholder="Enter Previous School Name"
                        />
                        {errors[`experienceDetails[${index}][previousSchoolName]`] && (
                          <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolName]`]}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor={`previousSchoolAddress-${exp.id}`} className="form-label">
                          Address <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id={`previousSchoolAddress-${exp.id}`}
                          name="previousSchoolAddress"
                          className={`form-control ${errors[`experienceDetails[${index}][previousSchoolAddress]`] ? 'is-invalid' : ''}`}
                          value={formData.experienceDetails[index]?.previousSchoolAddress || ''}
                          onChange={(e) => handleChange(e, 'experienceDetails', index)}
                          // required
                          placeholder="Enter Previous School Address"
                        />
                        {errors[`experienceDetails[${index}][previousSchoolAddress]`] && (
                          <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolAddress]`]}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor={`previousSchoolJoiningDate-${exp.id}`} className="form-label">
                          From <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          id={`previousSchoolJoiningDate-${exp.id}`}
                          name="previousSchoolJoiningDate"
                          className={`form-control ${errors[`experienceDetails[${index}][previousSchoolJoiningDate]`] ? 'is-invalid' : ''}`}
                          value={formData.experienceDetails[index]?.previousSchoolJoiningDate || ''}
                          onChange={(e) => handleChange(e, 'experienceDetails', index)}
                          // required
                        />
                        {errors[`experienceDetails[${index}][previousSchoolJoiningDate]`] && (
                          <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolJoiningDate]`]}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor={`previousSchoolLastDate-${exp.id}`} className="form-label">
                          To <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          id={`previousSchoolLastDate-${exp.id}`}
                          name="previousSchoolLastDate"
                          className={`form-control ${errors[`experienceDetails[${index}][previousSchoolLastDate]`] ? 'is-invalid' : ''}`}
                          value={formData.experienceDetails[index]?.previousSchoolLastDate || ''}
                          onChange={(e) => handleChange(e, 'experienceDetails', index)}
                          // required
                        />
                        {errors[`experienceDetails[${index}][previousSchoolLastDate]`] && (
                          <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousSchoolLastDate]`]}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor={`previousJobDesignation-${exp.id}`} className="form-label">
                          Job Designation <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id={`previousJobDesignation-${exp.id}`}
                          name="previousJobDesignation"
                          className={`form-control ${errors[`experienceDetails[${index}][previousJobDesignation]`] ? 'is-invalid' : ''}`}
                          value={formData.experienceDetails[index]?.previousJobDesignation || ''}
                          onChange={(e) => handleChange(e, 'experienceDetails', index)}
                          // required
                          placeholder="Enter Previous Job Designation"
                        />
                        {errors[`experienceDetails[${index}][previousJobDesignation]`] && (
                          <div className="invalid-feedback">{errors[`experienceDetails[${index}][previousJobDesignation]`]}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor={`numberOfExperience-${exp.id}`} className="form-label">
                          Years of Experience <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id={`numberOfExperience-${exp.id}`}
                          name="numberOfExperience"
                          className={`form-control ${errors[`experienceDetails[${index}][numberOfExperience]`] ? 'is-invalid' : ''}`}
                          value={formData.experienceDetails[index]?.numberOfExperience || ''}
                          readOnly // Prevents manual edits; remove if you want to allow overrides
                          // required
                          placeholder="Auto-calculated from dates"
                        />
                        {errors[`experienceDetails[${index}][numberOfExperience]`] && (
                          <div className="invalid-feedback">{errors[`experienceDetails[${index}][numberOfExperience]`]}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-end card-header">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={addExperience}
                  >
                    Add Employment
                  </button>
                </div>

                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Others
                  </h4>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="securityDepositAmount" className="form-label">
                        Security Deposit Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="securityDepositAmount"
                        name="securityDepositAmount"
                        className={`form-control ${errors.securityDepositAmount ? 'is-invalid' : ''}`}
                        value={formData.securityDepositAmount}
                        onChange={handleChange}
                        required
                        placeholder="Enter Amount"
                        min="0"
                      />
                      {errors.securityDepositAmount && <div className="invalid-feedback">{errors.securityDepositAmount}</div>}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="taxRegime" className="form-label">
                        Tax Regime <span className="text-danger">*</span>
                      </label>
                      <select
                        id="taxRegime"
                        name="taxRegime"
                        className={`form-control ${errors.taxRegime ? 'is-invalid' : ''}`}
                        value={formData.taxRegime}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Tax Regime</option>
                        <option value="old">Old</option>
                        <option value="new">New</option>
                      </select>
                      {errors.taxRegime && <div className="invalid-feedback">{errors.taxRegime}</div>}
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={isLoading }
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Updating...
                      </>
                    ) : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePayrollEmployeeDetails;