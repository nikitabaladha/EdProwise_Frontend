import { useState, useEffect } from 'react';
import { read, utils, writeFile } from 'xlsx';
import { toast } from 'react-toastify';
import postAPI from '../../../../../api/postAPI';
import getAPI from '../../../../../api/getAPI';
import ImportModal from './ImportModal';
import ConfirmModal from '../../../../ConfirmModalImportExcel';
import PreviewModal from './PreviewModal';

const excelSerialToDate = (serial) => {
  if (typeof serial !== 'number' || isNaN(serial) || serial < 1) {
    return null;
  }
  const excelEpoch = new Date(1900, 0, 1);
  const date = new Date(excelEpoch.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
  if (serial <= 60) {
    date.setDate(date.getDate() - 1);
  }
  return date;
};

const RegistrationExcelSheetModal = ({ show, onClose, schoolId, academicYear, onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [showMainModal, setShowMainModal] = useState(show);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [validatedData, setValidatedData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [feeTypesByClass, setFeeTypesByClass] = useState({});

  useEffect(() => {
    setShowMainModal(show);
  }, [show]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchData = async () => {
      try {
        const classRes = await getAPI(`/get-class-and-section-year/${schoolId}/year/${academicYear}`, {}, true);
        setClasses(classRes?.data?.data || []);

        const shiftRes = await getAPI(`/master-define-shift-year/${schoolId}/year/${academicYear}`);
        if (!shiftRes.hasError) {
          setShifts(Array.isArray(shiftRes.data?.data) ? shiftRes.data.data : []);
        } else {
          toast.error(shiftRes.message || 'Failed to fetch shifts.');
        }
      } catch (error) {
        toast.error('Error fetching data.');
        console.error(error);
      }
    };

    fetchData();
  }, [schoolId, academicYear]);

  const fetchFeeTypes = async (classId) => {
    try {
      const response = await getAPI(`/get-one-time-feesbyIds/${schoolId}/${classId}/${academicYear}`, {}, true);
      if (response?.data?.data) {
        const feeTypes = response.data.data.flatMap(feeItem =>
          feeItem.oneTimeFees.map(fee => ({
            id: fee.feesTypeId._id,
            name: fee.feesTypeId.feesTypeName,
            amount: fee.amount,
          }))
        );
        return feeTypes;
      }
      return [];
    } catch (error) {
      console.error('Fee type fetch error:', error);
      return [];
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImportClick = () => {
    if (!file) {
      toast.error('Please select a file to import.');
      return;
    }
    if (!academicYear) {
      toast.error('Please select an academic year before importing.');
      return;
    }
    if (classes.length === 0) {
      toast.error('No classes available. Please configure classes in the system.');
      return;
    }
    if (shifts.length === 0) {
      toast.error('No shifts available. Please configure shifts in the system.');
      return;
    }
    setShowMainModal(false);
    setShowConfirmModal(true);
  };

  const processExcelData = async () => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = read(data, { type: 'array', dateNF: 'yyyy-mm-dd', raw: false });
          const sheetName = workbook.SheetNames.find((name) => name.toLowerCase() === 'data');
          if (!sheetName) {
            toast.error('No "Data" sheet found in the Excel file.');
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const sheet = workbook.Sheets[sheetName];
          const jsonData = utils.sheet_to_json(sheet, { defval: '' }).filter((row) => {
            return row.firstName?.toString().trim() && row.lastName?.toString().trim();
          });

          if (jsonData.length === 0) {
            toast.error('No valid data rows found in the Excel file.');
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const tempValidatedData = [];
          let hasError = false;

          const feeTypesCache = {};
          for (const cls of classes) {
            feeTypesCache[cls._id] = await fetchFeeTypes(cls._id);
          }
          setFeeTypesByClass(feeTypesCache);

          for (let index = 0; index < jsonData.length; index++) {
            const row = jsonData[index];
            const payload = {};

            payload.academicYear = academicYear;
            payload.firstName = row.firstName?.toString().trim() || '';
            payload.middleName = row.middleName?.toString().trim() || '';
            payload.lastName = row.lastName?.toString().trim() || '';
            let dateOfBirth = row.dateOfBirth;
            if (typeof dateOfBirth === 'number') {
              const parsedDate = excelSerialToDate(dateOfBirth);
              if (parsedDate && !isNaN(parsedDate.getTime())) {
                dateOfBirth = parsedDate.toISOString().split('T')[0];
              } else {
                toast.error(`Row ${index + 1}: Invalid Date of Birth serial "${dateOfBirth}".`);
                hasError = true;
                continue;
              }
            }
            payload.dateOfBirth = dateOfBirth?.toString().trim() || '';
            payload.age = row.age?.toString().trim() || '';
            payload.nationality = row.nationality?.toString().trim() || '';
            payload.gender = row.gender?.toString().trim() || '';
            payload.bloodGroup = row.bloodGroup?.toString().trim() || '';
            payload.motherTongue = row.motherTongue?.toString().trim() || '';
            payload.parentContactNumber = row.parentContactNumber?.toString().trim() || '';
            payload.fatherName = row.fatherName?.toString().trim() || '';
            payload.fatherContactNo = row.fatherContactNo?.toString().trim() || '';
            payload.fatherQualification = row.fatherQualification?.toString().trim() || '';
            payload.fatherProfession = row.fatherProfession?.toString().trim() || '';
            payload.motherName = row.motherName?.toString().trim() || '';
            payload.motherContactNo = row.motherContactNo?.toString().trim() || '';
            payload.motherQualification = row.motherQualification?.toString().trim() || '';
            payload.motherProfession = row.motherProfession?.toString().trim() || '';
            payload.currentAddress = row.currentAddress?.toString().trim() || '';
            payload.country = row.country?.toString().trim() || '';
            payload.state = row.state?.toString().trim() || '';
            payload.city = row.city?.toString().trim() || '';
            payload.pincode = row.pincode?.toString().trim() || '';
            payload.previousSchoolName = row.previousSchoolName?.toString().trim() || '';
            payload.addressOfPreviousSchool = row.addressOfPreviousSchool?.toString().trim() || '';
            payload.previousSchoolBoard = row.previousSchoolBoard?.toString().trim() || '';
            payload.studentCategory = row.studentCategory?.toString().trim() || '';
            payload.siblingInfoChecked = row.siblingInfoChecked?.toString().trim().toLowerCase() === 'true';
            payload.relationType = row.relationType?.toString().trim() || null;
            payload.siblingName = row.siblingName?.toString().trim() || '';
            payload.parentalStatus = row.parentalStatus?.toString().trim() || '';
            payload.howReachUs = row.howReachUs?.toString().trim() || '';
            payload.aadharPassportNumber = row.aadharPassportNumber?.toString().trim() || '';
            payload.selectedFeeType = row.selectedFeeType?.toString().trim() || '';
            payload.concessionType = row.concessionType?.toString().trim() || '';
            payload.registrationFee = Number(row.registrationFee)?.toString() || '0';
            payload.concessionAmount = Number(row.concessionAmount)?.toString() || '0';
            payload.finalAmount = Number(row.finalAmount)?.toString() || '0';
            payload.name = row.name?.toString().trim() || '';
            payload.paymentMode = row.paymentMode?.toString().trim() || 'null';
            payload.chequeNumber = row.chequeNumber?.toString().trim() || '';
            payload.bankName = row.bankName?.toString().trim() || '';
            payload.paymentDate = row.paymentDate?.toString().trim() || '';

            const className = row.className?.toString().trim() || '';
            const classObj = classes.find(
              (c) => c.className.toLowerCase() === className.toLowerCase()
            );
            if (!classObj) {
              toast.error(`Row ${index + 1}: Invalid Class "${className}".`);
              hasError = true;
              continue;
            }
            payload.masterDefineClass = classObj._id;

            const shiftName = row.shift?.toString().trim() || '';
            const shiftObj = shifts.find(
              (s) => s.masterDefineShiftName.toLowerCase() === shiftName.toLowerCase()
            );
            if (!shiftObj) {
              toast.error(`Row ${index + 1}: Invalid Shift "${shiftName}".`);
              hasError = true;
              continue;
            }
            payload.masterDefineShift = shiftObj._id;

            const feeTypeName = row.selectedFeeType?.toString().trim() || '';
            const feeTypes = feeTypesCache[classObj._id] || [];
            const feeType = feeTypes.find(
              (ft) => ft.name.toLowerCase() === feeTypeName.toLowerCase()
            );
            // if (!feeType) {
            //   toast.error(
            //     `Row ${index + 1}: Invalid Fee Type "${feeTypeName}" for class "${className}".`
            //   );
            //   hasError = true;
            //   continue;
            // }

            const registrationFee = Number(row.registrationFee) || 0;
            // if (registrationFee <= 0 || registrationFee !== feeType.amount) {
            //   toast.error(
            //     `Row ${index + 1}: Registration Fee must match the fee type amount (${feeType.amount}).`
            //   );
            //   hasError = true;
            //   continue;
            // }
            payload.registrationFee = registrationFee.toString();

            const concessionAmount = Number(row.concessionAmount) || 0;
            if (concessionAmount < 0 || concessionAmount > registrationFee) {
              toast.error(
                `Row ${index + 1}: Concession Amount must be between 0 and Registration Fee (${registrationFee}).`
              );
              hasError = true;
              continue;
            }
            payload.concessionAmount = concessionAmount.toString();

        
            const validConcessionTypes = ['EWS', 'SC', 'ST', 'OBC', 'Staff Children', 'Other'];
            if (concessionAmount > 0) {
              if (!payload.concessionType || !validConcessionTypes.includes(payload.concessionType)) {
                toast.error(
                  `Row ${index + 1}: Concession Type is required when Concession Amount is greater than 0 and must be one of: ${validConcessionTypes.join(', ')}.`
                );
                hasError = true;
                continue;
              }
            } else {
              payload.concessionType = ''; 
            }

            const finalAmount = Number(row.finalAmount) || 0;
            if (finalAmount !== registrationFee - concessionAmount) {
              toast.error(
                `Row ${index + 1}: Final Amount must be Registration Fee (${registrationFee}) minus Concession (${concessionAmount}).`
              );
              hasError = true;
              continue;
            }
            payload.finalAmount = finalAmount.toString();

            

            const requiredFields = [
              { key: 'firstName', value: payload.firstName, label: 'First Name' },
              { key: 'lastName', value: payload.lastName, label: 'Last Name' },
              { key: 'dateOfBirth', value: payload.dateOfBirth, label: 'Date of Birth' },
              { key: 'age', value: payload.age, label: 'Age' },
              { key: 'nationality', value: payload.nationality, label: 'Nationality' },
              { key: 'gender', value: payload.gender, label: 'Gender' },
              { key: 'motherTongue', value: payload.motherTongue, label: 'Mother Tongue' },
              { key: 'masterDefineClass', value: payload.masterDefineClass, label: 'Class' },
              { key: 'masterDefineShift', value: payload.masterDefineShift, label: 'Shift' },
              { key: 'currentAddress', value: payload.currentAddress, label: 'Current Address' },
              { key: 'country', value: payload.country, label: 'Country' },
              { key: 'state', value: payload.state, label: 'State' },
              { key: 'city', value: payload.city, label: 'City' },
              { key: 'pincode', value: payload.pincode, label: 'Pincode' },
              { key: 'studentCategory', value: payload.studentCategory, label: 'Student Category' },
              { key: 'howReachUs', value: payload.howReachUs, label: 'How Reach Us' },
              { key: 'aadharPassportNumber', value: payload.aadharPassportNumber, label: 'Aadhaar/Passport Number' },
              { key: 'parentalStatus', value: payload.parentalStatus, label: 'Parental Status' },
              { key: 'name', value: payload.name, label: 'Name of Person Filling the Form' },
            ];

            for (const field of requiredFields) {
              if (!field.value) {
                toast.error(`Row ${index + 1}: ${field.label} is required.`);
                hasError = true;
                continue;
              }
            }

            if (payload.parentalStatus === 'Single Father') {
              if (!payload.fatherName) {
                toast.error(`Row ${index + 1}: Father Name is required.`);
                hasError = true;
                continue;
              }
              if (!payload.fatherContactNo) {
                toast.error(`Row ${index + 1}: Father Contact Number is required.`);
                hasError = true;
                continue;
              }
              if (!payload.fatherProfession) {
                toast.error(`Row ${index + 1}: Father Profession is required.`);
                hasError = true;
                continue;
              }
              if (payload.motherName || payload.motherContactNo || payload.motherProfession) {
                toast.error(
                  `Row ${index + 1}: Mother details should not be provided for Single Father status.`
                );
                hasError = true;
                continue;
              }
            } else if (payload.parentalStatus === 'Single Mother') {
              if (!payload.motherName) {
                toast.error(`Row ${index + 1}: Mother Name is required.`);
                hasError = true;
                continue;
              }
              if (!payload.motherContactNo) {
                toast.error(`Row ${index + 1}: Mother Contact Number is required.`);
                hasError = true;
                continue;
              }
              if (!payload.motherProfession) {
                toast.error(`Row ${index + 1}: Mother Profession is required.`);
                hasError = true;
                continue;
              }
              if (payload.fatherName || payload.fatherContactNo || payload.fatherProfession) {
                toast.error(
                  `Row ${index + 1}: Father details should not be provided for Single Mother status.`
                );
                hasError = true;
                continue;
              }
            } else if (payload.parentalStatus === 'Parents') {
              if (!payload.fatherName) {
                toast.error(`Row ${index + 1}: Father Name is required.`);
                hasError = true;
                continue;
              }
              if (!payload.fatherContactNo) {
                toast.error(`Row ${index + 1}: Father Contact Number is required.`);
                hasError = true;
                continue;
              }
              if (!payload.fatherProfession) {
                toast.error(`Row ${index + 1}: Father Profession is required.`);
                hasError = true;
                continue;
              }
              if (!payload.motherName) {
                toast.error(`Row ${index + 1}: Mother Name is required.`);
                hasError = true;
                continue;
              }
              if (!payload.motherContactNo) {
                toast.error(`Row ${index + 1}: Mother Contact Number is required.`);
                hasError = true;
                continue;
              }
              if (!payload.motherProfession) {
                toast.error(`Row ${index + 1}: Mother Profession is required.`);
                hasError = true;
                continue;
              }
            } else {
              toast.error(
                `Row ${index + 1}: Invalid Parental Status "${payload.parentalStatus}". Must be one of: Single Father, Single Mother, Parents.`
              );
              hasError = true;
              continue;
            }

            if (!payload.siblingInfoChecked) {
              if (!payload.relationType || !['Brother', 'Sister'].includes(payload.relationType)) {
                toast.error(
                  `Row ${index + 1}: Relation Type must be one of: Brother, Sister when sibling information is provided.`
                );
                hasError = true;
                continue;
              }
              if (!payload.siblingName) {
                toast.error(
                  `Row ${index + 1}: Sibling Name is required when sibling information is provided.`
                );
                hasError = true;
                continue;
              }
            } else {
              payload.relationType = null;
              payload.siblingName = '';
            }

            if (!['India', 'International', 'SAARC Countries'].includes(payload.nationality)) {
              toast.error(
                `Row ${index + 1}: Invalid Nationality "${payload.nationality}". Must be one of: India, International, SAARC Countries.`
              );
              hasError = true;
              continue;
            }

            if (!['Male', 'Female'].includes(payload.gender)) {
              toast.error(
                `Row ${index + 1}: Invalid Gender "${payload.gender}". Must be one of: Male, Female.`
              );
              hasError = true;
              continue;
            }

            if (
              !['General', 'OBC', 'ST', 'SC'].includes(payload.studentCategory) ||
              (['SAARC Countries', 'International'].includes(payload.nationality) &&
                payload.studentCategory !== 'General')
            ) {
              toast.error(
                `Row ${index + 1}: Invalid Student Category "${payload.studentCategory}". Must be one of: General, OBC, ST, SC (General for SAARC/International).`
              );
              hasError = true;
              continue;
            }

            if (
              !['Teacher', 'Advertisement', 'Student', 'Online Search', 'Others'].includes(
                payload.howReachUs
              )
            ) {
              toast.error(
                `Row ${index + 1}: Invalid How Reach Us "${payload.howReachUs}". Must be one of: Teacher, Advertisement, Student, Online Search, Others.`
              );
              hasError = true;
              continue;
            }

            if (!['Cash', 'Cheque', 'Online', 'null'].includes(payload.paymentMode)) {
              toast.error(
                `Row ${index + 1}: Invalid Payment Mode "${payload.paymentMode}". Must be one of: Cash, Cheque, Online.`
              );
              hasError = true;
              continue;
            }

            if (payload.paymentMode === 'Cheque') {
              if (!payload.chequeNumber || !payload.bankName) {
                toast.error(
                  `Row ${index + 1}: Cheque Number and Bank Name are required for Cheque payment mode.`
                );
                hasError = true;
                continue;
              }
            } else {
              payload.chequeNumber = '';
              payload.bankName = '';
            }

            if (payload.bloodGroup && !['AB-', 'AB+', 'O-', 'O+', 'B-', 'B+', 'A-', 'A+'].includes(payload.bloodGroup)) {
              toast.error(
                `Row ${index + 1}: Invalid Blood Group "${payload.bloodGroup}". Must be one of: AB-, AB+, O-, O+, B-, B+, A-, A+.`
              );
              hasError = true;
              continue;
            }

            const today = new Date();
            if (!payload.dateOfBirth || isNaN(new Date(payload.dateOfBirth).getTime())) {
              toast.error(`Row ${index + 1}: Invalid Date of Birth format. Use YYYY-MM-DD.`);
              hasError = true;
              continue;
            }
            const birthDate = new Date(payload.dateOfBirth);
            if (birthDate > today) {
              toast.error(`Row ${index + 1}: Date of Birth cannot be in the future.`);
              hasError = true;
              continue;
            }

            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            if (age <= 0 || age > 120) {
              toast.error(`Row ${index + 1}: Invalid age derived from Date of Birth.`);
              hasError = true;
              continue;
            }
            if (Number(payload.age) !== age) {
              toast.error(
                `Row ${index + 1}: Age (${payload.age}) does not match calculated age (${age}) from Date of Birth.`
              );
              hasError = true;
              continue;
            }

            const phonePattern = /^[0-9]{10}$/;
            if (
              payload.parentContactNumber &&
              !phonePattern.test(payload.parentContactNumber)
            ) {
              toast.error(
                `Row ${index + 1}: Parent Contact Number must be exactly 10 digits.`
              );
              hasError = true;
              continue;
            }
            if (payload.fatherContactNo && !phonePattern.test(payload.fatherContactNo)) {
              toast.error(
                `Row ${index + 1}: Father Contact Number must be exactly 10 digits.`
              );
              hasError = true;
              continue;
            }
            if (payload.motherContactNo && !phonePattern.test(payload.motherContactNo)) {
              toast.error(
                `Row ${index + 1}: Mother Contact Number must be exactly 10 digits.`
              );
              hasError = true;
              continue;
            }

            const aadhaarPattern = /^\d{12}$/;
            const passportPattern = /^[A-Za-z]{1}\d{7}$/;
            if (
              payload.aadharPassportNumber &&
              !(
                aadhaarPattern.test(payload.aadharPassportNumber) ||
                passportPattern.test(payload.aadharPassportNumber)
              )
            ) {
              toast.error(
                `Row ${index + 1}: Invalid Aadhaar (12 digits) or Passport (1 letter + 7 digits) number.`
              );
              hasError = true;
              continue;
            }

            payload.agreementChecked = true;

            if (!hasError) {
              tempValidatedData.push(payload);
            }
          }

          if (hasError) {
            toast.error('Some rows contain errors. Review the preview and correct the file.');
          }

          resolve({ jsonData, validatedData: tempValidatedData });
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        toast.error('Error processing Excel file: ' + error.message);
        console.error('Process Error:', error);
        reject(error);
      }
    });
  };

  const handleViewExcelSheet = async () => {
    if (!file) {
      toast.error('Please select a file to view.');
      return;
    }

    try {
      const { jsonData, validatedData } = await processExcelData();
      setPreviewData(jsonData);
      setValidatedData(validatedData);
      setShowFullPreviewModal(true);
    } catch (error) {
      // Error handled in processExcelData
    }
  };

  const handleConfirmImport = async () => {
    if (previewData.length === 0) {
      try {
        const { jsonData, validatedData } = await processExcelData();
        setPreviewData(jsonData);
        setValidatedData(validatedData);
      } catch (error) {
        setShowConfirmModal(false);
        setShowMainModal(true);
        return;
      }
    }

    if (validatedData.length === 0) {
      toast.error('No valid data to import. Please review and correct the file.');
      setShowConfirmModal(false);
      setShowMainModal(true);
      return;
    }

    setShowConfirmModal(false);

    for (const [index, data] of validatedData.entries()) {
      try {
        const payload = new FormData();
        for (const key in data) {
          if (data.hasOwnProperty(key) && key !== 'selectedFeeType') {
            if (key === 'relationType' || key === 'siblingName') {
              if (!data.siblingInfoChecked && data[key] && data[key] !== 'null') {
                payload.append(key, data[key]);
              }
              continue;
            }
            if (key === 'paymentMode' && data[key] === 'null') {
              payload.append(key, data[key]);
              continue;
            }
            if (data[key] !== null && data[key] !== '') {
              payload.append(key, data[key]);
            }
          }
        }

        const response = await postAPI('/create-registartion-form', payload, {
          'Content-Type': 'multipart/form-data',
        });

        if (!response.hasError) {
          toast.success(
            `Registration form for ${data.firstName} ${data.lastName} imported successfully (Row ${index + 1}).`
          );
        } else {
          toast.error(
            `Row ${index + 1}: ${response.message || 'Failed to import registration form.'}`
          );
        }
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message ||
          `Error importing registration form for row ${index + 1}.`;
        toast.error(errorMessage);
      }
    }

    onImportSuccess();
    setFile(null);
    setPreviewData([]);
    setValidatedData([]);
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setShowMainModal(true);
  };

  const handleDownloadDemo = () => {
    const guidelines = [
      ['📌 Import Guidelines:'],
      [
        'Required Fields: firstName, lastName, dateOfBirth, age, nationality, gender, motherTongue, className, shift, currentAddress, country, state, city, pincode, studentCategory, parentalStatus, howReachUs, aadharPassportNumber, registrationFee, finalAmount, name, paymentMode.',
      ],
      [
        'Conditional Fields: chequeNumber and bankName are required if paymentMode is Cheque. fatherName, fatherContactNo, fatherProfession are required unless parentalStatus is Single Mother. motherName, motherContactNo, motherProfession are required unless parentalStatus is Single Father. relationType, siblingName are required unless siblingInfoChecked is true. concessionType is required if concessionAmount is greater than 0 and must be one of: EWS, SC, ST, OBC, Staff Children, Other.',
      ],
      [
        'Optional Fields: middleName, parentContactNumber, bloodGroup, fatherQualification, motherQualification, previousSchoolName, addressOfPreviousSchool, previousSchoolBoard, concessionAmount, concessionType (if concessionAmount is 0).',
      ],
      [
        'Formats: Dates must be YYYY-MM-DD. paymentMode must be Cash/Cheque/Online/null. nationality must be India/International/SAARC Countries. gender must be Male/Female. studentCategory must be General/OBC/ST/SC. parentalStatus must be Single Father/Single Mother/Parents. howReachUs must be Teacher/Advertisement/Student/Online Search/Others. bloodGroup must be AB-/AB+/O-/O+/B-/B+/A-/A+. relationType must be Brother/Sister when siblingInfoChecked is false, or empty/null when siblingInfoChecked is true. concessionType must be EWS/SC/ST/OBC/Staff Children/Other when concessionAmount > 0.',
      ],
      ['registrationFee must match the selectedFeeType amount. finalAmount = registrationFee - concessionAmount.'],
      ['selectedFeeType is required for validation and must match an existing feeType in the OneTimeFees collection.'],
      ['Do not change column headers; they must remain exactly as provided.'],
      ['If the payment mode is "Cash" or "Online", leave the Cheque Number and Bank Name fields blank.'],
      ['Use the "Data" sheet to enter your data.'],
      ['The agreementChecked field is automatically set to true during import and should not be included in the Excel sheet.'],
      ['If siblingInfoChecked is true, leave relationType and siblingName blank to exclude them from the database.'],
      [`Available Classes: ${classes.map((c) => c.className).join(', ')}.`],
      [`Available Shifts: ${shifts.map((s) => s.masterDefineShiftName).join(', ')}.`],
    ];

    const wsData = [
      [
        'firstName',
        'middleName',
        'lastName',
        'dateOfBirth',
        'age',
        'nationality',
        'gender',
        'bloodGroup',
        'motherTongue',
        'parentContactNumber',
        'className',
        'shift',
        'fatherName',
        'fatherContactNo',
        'fatherQualification',
        'fatherProfession',
        'motherName',
        'motherContactNo',
        'motherQualification',
        'motherProfession',
        'currentAddress',
        'country',
        'state',
        'city',
        'pincode',
        'previousSchoolName',
        'addressOfPreviousSchool',
        'previousSchoolBoard',
        'studentCategory',
        'siblingInfoChecked',
        'relationType',
        'siblingName',
        'parentalStatus',
        'howReachUs',
        'aadharPassportNumber',
        'selectedFeeType',
        'registrationFee',
        'concessionAmount',
        'concessionType',
        'finalAmount',
        'name',
        'paymentMode',
        'chequeNumber',
        'bankName',
        'paymentDate'
      ],
      [
        'John',
        '',
        'Doe',
        '2010-05-15',
        '15',
        'India',
        'Male',
        'A+',
        'English',
        '1234567890',
        classes[0]?.className || 'Grade 10',
        shifts[0]?.masterDefineShiftName || 'Morning',
        'James Doe',
        '1234567890',
        'MBA',
        'Engineer',
        'Jane Doe',
        '0987654321',
        'PhD',
        'Doctor',
        '123 Main St',
        'India',
        'Delhi',
        'New Delhi',
        '110001',
        'Previous School',
        '456 Old St',
        'CBSE',
        'General',
        'true',
        '',
        '',
        'Parents',
        'Online Search',
        '123456789012',
        'Registration Fee',
        '1500',
        '100',
        'EWS',
        '1400',
        'Admin User',
        'Cheque',
        '123456',
        'State Bank',
         '2025-05-15',
      ],
      [
        'Jane',
        'Ann',
        'Smith',
        '2012-03-10',
        '13',
        'India',
        'Female',
        '',
        'Hindi',
        '',
        classes[0]?.className || 'Grade 8',
        shifts[0]?.masterDefineShiftName || 'Morning',
        'John Smith',
        '9876543210',
        '',
        'Teacher',
        'Mary Smith',
        '8765432109',
        '',
        'Homemaker',
        '456 High St',
        'India',
        'Maharashtra',
        'Mumbai',
        '400001',
        '',
        '',
        '',
        'OBC',
        'false',
        'Brother',
        'Jack Smith',
        'Parents',
        'Teacher',
        '987654321098',
        'Registration Fee',
        '1500',
        '0',
        '',
        '1500',
        'Admin User',
        'Cash',
        '',
        '',
        '2025-06-15',

      ],
    ];

    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet(wsData);
    utils.book_append_sheet(wb, ws, 'Data');

    const wsGuidelines = utils.aoa_to_sheet(guidelines);
    utils.book_append_sheet(wb, wsGuidelines, 'Guidelines');

    writeFile(wb, 'registration_form.xlsx');
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateY(-50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .confirmation-dialog {
            animation: slideIn 0.3s ease-out;
          }
          .confirmation-dialog .bg-warning {
            animation: fadeIn 0.5s ease-in;
          }
        `}
      </style>
      <ImportModal
        show={showMainModal}
        onClose={onClose}
        handleFileChange={handleFileChange}
        handleImportClick={handleImportClick}
        handleDownloadDemo={handleDownloadDemo}
      />
      <ConfirmModal
        show={showConfirmModal}
        onCancel={handleCancelConfirm}
        onConfirm={handleConfirmImport}
        onViewExcelSheet={handleViewExcelSheet}
      />
      <PreviewModal
        show={showFullPreviewModal}
        onClose={() => setShowFullPreviewModal(false)}
        previewData={previewData}
        validatedData={validatedData}
        classes={classes}
        shifts={shifts}
        feeTypesByClass={feeTypesByClass}
      />
    </>
  );
};

export default RegistrationExcelSheetModal;