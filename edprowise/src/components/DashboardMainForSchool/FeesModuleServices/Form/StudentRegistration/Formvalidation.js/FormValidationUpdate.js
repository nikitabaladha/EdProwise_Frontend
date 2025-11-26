export const validateBasicForm = (formData, toast, isNurseryClass, existingFiles = {}) => {
  if (!formData) {
    toast.error('Form data is missing');
    return false;
  }

  const requiredFields = [
    { field: 'firstName', message: 'First name is required' },
    { field: 'lastName', message: 'Last name is required' },
    { field: 'dateOfBirth', message: 'Date of birth is required' },
    { field: 'nationality', message: 'Nationality is required' },
    { field: 'gender', message: 'Gender is required' },
    { field: 'motherTongue', message: 'Mother tongue is required' },
    { field: 'masterDefineClass', message: 'Class is required' },
    { field: 'masterDefineShift', message: 'Shift is required' },
    { field: 'currentAddress', message: 'Current address is required' },
    { field: 'country', message: 'Country is required' },
    { field: 'state', message: 'State is required' },
    { field: 'city', message: 'City is required' },
    { field: 'pincode', message: 'Pincode is required' },
    { field: 'studentCategory', message: 'Student category is required' },
    { field: 'howReachUs', message: 'Please specify how you reached us' },
    { field: 'aadharPassportNumber', message: 'Aadhaar/Passport number is required' },
    { field: 'parentalStatus', message: 'Parental status is required' },
  ];

  for (const { field, message } of requiredFields) {
    if (!formData[field] && formData[field] !== false) {
      toast.error(message);
      return false;
    }
  }

  if (!formData.studentPhoto && !existingFiles.studentPhoto) {
    toast.error('Please upload the student photo');
    return false;
  }

  if (!formData.proofOfResidence && !existingFiles.proofOfResidence) {
    toast.error('Please upload proof of residence');
    return false;
  }

  const today = new Date();
  const dob = new Date(formData.dateOfBirth);
  if (dob > today) {
    toast.error('Date of birth cannot be a future date');
    return false;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (formData.fatherContactNo && !phonePattern.test(formData.fatherContactNo)) {
    toast.error("Father's contact number must be exactly 10 digits");
    return false;
  }
  if (formData.motherContactNo && !phonePattern.test(formData.motherContactNo)) {
    toast.error("Mother's contact number must be exactly 10 digits");
    return false;
  }
  if (formData.parentContactNumber && !phonePattern.test(formData.parentContactNumber)) {
    toast.error("Parent contact number must be exactly 10 digits");
    return false;
  }

  const aadhaarPattern = /^\d{12}$/;
  const passportPattern = /^[A-Za-z]{1}\d{7}$/;
  if (
    formData.aadharPassportNumber &&
    !(aadhaarPattern.test(formData.aadharPassportNumber) || passportPattern.test(formData.aadharPassportNumber))
  ) {
    toast.error('Please enter a valid Aadhaar number (12 digits) or Passport number (1 letter followed by 7 digits)');
    return false;
  }

  if (!formData.aadharPassportFile && !existingFiles.aadharPassportFile) {
    toast.error('Please upload the Aadhar/Passport file');
    return false;
  }

  if (formData.studentCategory !== 'General' && !formData.castCertificate && !existingFiles.castCertificate) {
    toast.error('Please upload the caste certificate');
    return false;
  }

  if (!formData.siblingInfoChecked) {
    if (!formData.relationType) {
      toast.error('Relation type is required when sibling information is provided');
      return false;
    }
    if (!formData.siblingName) {
      toast.error('Sibling name is required when sibling information is provided');
      return false;
    }
    if (!formData.idCardFile && !existingFiles.idCardFile) {
      toast.error('Please upload sibling ID card');
      return false;
    }
  }

  if (formData.parentalStatus === 'Single Father') {
    if (!formData.fatherName) {
      toast.error('Please enter father name');
      return false;
    }
    if (!formData.fatherContactNo) {
      toast.error('Please enter father contact number');
      return false;
    }
    if (!formData.fatherProfession) {
      toast.error('Please enter father profession');
      return false;
    }
    if (formData.motherName || formData.motherContactNo || formData.motherProfession) {
      toast.error('Mother details should not be provided for Single Father status');
      return false;
    }
  } else if (formData.parentalStatus === 'Single Mother') {
    if (!formData.motherName) {
      toast.error('Please enter mother name');
      return false;
    }
    if (!formData.motherContactNo) {
      toast.error('Please enter mother contact number');
      return false;
    }
    if (!formData.motherProfession) {
      toast.error('Please enter mother profession');
      return false;
    }
    if (formData.fatherName || formData.fatherContactNo || formData.fatherProfession) {
      toast.error('Father details should not be provided for Single Mother status');
      return false;
    }
  } else if (formData.parentalStatus === 'Parents') {
    if (!formData.fatherName) {
      toast.error('Please enter father name');
      return false;
    }
    if (!formData.fatherContactNo) {
      toast.error('Please enter father contact number');
      return false;
    }
    if (!formData.fatherProfession) {
      toast.error('Please enter father profession');
      return false;
    }
    if (!formData.motherName) {
      toast.error('Please enter mother name');
      return false;
    }
    if (!formData.motherContactNo) {
      toast.error('Please enter mother contact number');
      return false;
    }
    if (!formData.motherProfession) {
      toast.error('Please enter mother profession');
      return false;
    }
  }


    if (formData.previousSchoolResult && formData.previousSchoolResult instanceof File) {
      const validTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(formData.previousSchoolResult.type)) {
        toast.error('Previous school result must be a JPG, JPEG, or PDF file');
        return false;
      }
    }
    if (formData.tcCertificate && formData.tcCertificate instanceof File) {
      const validTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(formData.tcCertificate.type)) {
        toast.error('TC certificate must be a JPG, JPEG, or PDF file');
        return false;
      }
    }
  

  return true;
};