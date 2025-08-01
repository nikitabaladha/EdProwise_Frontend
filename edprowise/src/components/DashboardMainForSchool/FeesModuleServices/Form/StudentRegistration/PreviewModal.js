
// import React from 'react';
// import { Modal, Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
// import { toast } from 'react-toastify';

// const RegistrationPreviewModal = ({
//   show,
//   onClose,
//   previewData,
//   validatedData,
//   classes,
//   shifts,
//   feeTypesByClass,
// }) => {
//   const headers = [
//     'Row',
//     'firstName',
//     'middleName',
//     'lastName',
//     'dateOfBirth',
//     'age',
//     'nationality',
//     'gender',
//     'bloodGroup',
//     'motherTongue',
//     'parentContactNumber',
//     'className',
//     'shift',
//     'fatherName',
//     'fatherContactNo',
//     'fatherQualification',
//     'fatherProfession',
//     'motherName',
//     'motherContactNo',
//     'motherQualification',
//     'motherProfession',
//     'currentAddress',
//     'country',
//     'state',
//     'city',
//     'pincode',
//     'previousSchoolName',
//     'addressOfPreviousSchool',
//     'previousSchoolBoard',
//     'studentCategory',
//     'siblingInfoChecked',
//     'relationType',
//     'siblingName',
//     'parentalStatus',
//     'howReachUs',
//     'aadharPassportNumber',
//     'selectedFeeType',
//     'registrationFee',
//     'concessionAmount',
//     'finalAmount',
//     'name',
//     'paymentMode',
//     'chequeNumber',
//     'bankName',
//     'registrationNumber',
//     'paymentDate',
//     'Valid',
//     'Remark',
//   ];

//   const isRowValid = (row, index) => {
//     const firstName = row.firstName?.toString().trim() || '';
//     const middleName = row.middleName?.toString().trim() || '';
//     const lastName = row.lastName?.toString().trim() || '';
//     const dateOfBirth = row.dateOfBirth?.toString().trim() || '';
//     const age = row.age?.toString().trim() || '';
//     const nationality = row.nationality?.toString().trim() || '';
//     const gender = row.gender?.toString().trim() || '';
//     const bloodGroup = row.bloodGroup?.toString().trim() || '';
//     const motherTongue = row.motherTongue?.toString().trim() || '';
//     const parentContactNumber = row.parentContactNumber?.toString().trim() || '';
//     const className = row.className?.toString().trim() || '';
//     const shiftName = row.shift?.toString().trim() || '';
//     const fatherName = row.fatherName?.toString().trim() || '';
//     const fatherContactNo = row.fatherContactNo?.toString().trim() || '';
//     const fatherProfession = row.fatherProfession?.toString().trim() || '';
//     const motherName = row.motherName?.toString().trim() || '';
//     const motherContactNo = row.motherContactNo?.toString().trim() || '';
//     const motherProfession = row.motherProfession?.toString().trim() || '';
//     const currentAddress = row.currentAddress?.toString().trim() || '';
//     const country = row.country?.toString().trim() || '';
//     const state = row.state?.toString().trim() || '';
//     const city = row.city?.toString().trim() || '';
//     const pincode = row.pincode?.toString().trim() || '';
//     const studentCategory = row.studentCategory?.toString().trim() || '';
//     const siblingInfoChecked = row.siblingInfoChecked?.toString().trim().toLowerCase() === 'true';
//     const relationType = row.relationType?.toString().trim() || '';
//     const siblingName = row.siblingName?.toString().trim() || '';
//     const parentalStatus = row.parentalStatus?.toString().trim() || '';
//     const howReachUs = row.howReachUs?.toString().trim() || '';
//     const aadharPassportNumber = row.aadharPassportNumber?.toString().trim() || '';
//     const selectedFeeType = row.selectedFeeType?.toString().trim() || '';
//     const registrationFee = Number(row.registrationFee) || 0;
//     const concessionAmount = Number(row.concessionAmount) || 0;
//     const finalAmount = Number(row.finalAmount) || 0;
//     const name = row.name?.toString().trim() || '';
//     const paymentMode = row.paymentMode?.toString().trim() || '';
//     const chequeNumber = row.chequeNumber?.toString().trim() || '';
//     const bankName = row.bankName?.toString().trim() || '';

//     const errors = [];

//     const requiredFields = [
//       { key: 'firstName', value: firstName, label: 'First Name' },
//       { key: 'lastName', value: lastName, label: 'Last Name' },
//       { key: 'dateOfBirth', value: dateOfBirth, label: 'Date of Birth' },
//       { key: 'age', value: age, label: 'Age' },
//       { key: 'nationality', value: nationality, label: 'Nationality' },
//       { key: 'gender', value: gender, label: 'Gender' },
//       { key: 'motherTongue', value: motherTongue, label: 'Mother Tongue' },
//       { key: 'className', value: className, label: 'Class Name' },
//       { key: 'shift', value: shiftName, label: 'Shift' },
//       { key: 'currentAddress', value: currentAddress, label: 'Current Address' },
//       { key: 'country', value: country, label: 'Country' },
//       { key: 'state', value: state, label: 'State' },
//       { key: 'city', value: city, label: 'City' },
//       { key: 'pincode', value: pincode, label: 'Pincode' },
//       { key: 'studentCategory', value: studentCategory, label: 'Student Category' },
//       { key: 'parentalStatus', value: parentalStatus, label: 'Parental Status' },
//       { key: 'howReachUs', value: howReachUs, label: 'How Reach Us' },
//       { key: 'aadharPassportNumber', value: aadharPassportNumber, label: 'Aadhaar/Passport Number' },
//       // { key: 'selectedFeeType', value: selectedFeeType, label: 'Fee Type' },
//       { key: 'name', value: name, label: 'Name of Person Filling the Form' },
//     ];

//     if (!siblingInfoChecked) {
//       requiredFields.push(
//         { key: 'relationType', value: relationType, label: 'Relation Type' },
//         { key: 'siblingName', value: siblingName, label: 'Sibling Name' }
//       );
//     }

//     requiredFields.forEach((field) => {
//       if (!field.value) {
//         errors.push(`${field.label} is required`);
//       }
//     });

//     const classObj = classes.find((c) => c.className.toLowerCase() === className.toLowerCase());
//     if (!classObj) {
//       errors.push(`Invalid class "${className}"`);
//     }

//     const shiftObj = shifts.find((s) => s.masterDefineShiftName.toLowerCase() === shiftName.toLowerCase());
//     if (!shiftObj) {
//       errors.push(`Invalid shift "${shiftName}"`);
//     }

    

//     if (paymentMode) {
//       const feeType = classObj && feeTypesByClass[classObj._id]?.find(
//       (ft) => ft.name.toLowerCase() === selectedFeeType.toLowerCase()
//     );
//     if (!feeType) {
//       errors.push(`Invalid fee type "${selectedFeeType}"`);
//     }
//       if (registrationFee <= 0 || (feeType && registrationFee !== feeType.amount)) {
//         errors.push(`Registration Fee must match the fee type amount (${feeType ? feeType.amount : 'unknown'})`);
//       }
//       if (concessionAmount < 0 || concessionAmount > registrationFee) {
//         errors.push(`Concession Amount must be between 0 and Registration Fee (${registrationFee})`);
//       }
//       if (finalAmount !== registrationFee - concessionAmount) {
//         errors.push(`Final Amount must be Registration Fee (${registrationFee}) minus Concession (${concessionAmount})`);
//       }

//       if (!['Cash', 'Cheque', 'Online'].includes(paymentMode)) {
//         errors.push(`Invalid Payment Mode "${paymentMode}". Must be one of: Cash, Cheque, Online`);
//       }

//       if (paymentMode === 'Cheque') {
//         if (!chequeNumber) errors.push('Cheque Number is required for Cheque payment mode');
//         if (!bankName) errors.push('Bank Name is required for Cheque payment mode');
//       }
//     }

//     if (!['India', 'International', 'SAARC Countries'].includes(nationality)) {
//       errors.push(`Invalid Nationality "${nationality}". Must be one of: India, International, SAARC Countries`);
//     }

//     if (!['Male', 'Female'].includes(gender)) {
//       errors.push(`Invalid Gender "${gender}". Must be one of: Male, Female`);
//     }

//     if (
//       !['General', 'OBC', 'ST', 'SC'].includes(studentCategory) ||
//       (['SAARC Countries', 'International'].includes(nationality) && studentCategory !== 'General')
//     ) {
//       errors.push(`Invalid Student Category "${studentCategory}". Must be one of: General, OBC, ST, SC (General for SAARC/International)`);
//     }

//     if (!['Single Father', 'Single Mother', 'Parents'].includes(parentalStatus)) {
//       errors.push(`Invalid Parental Status "${parentalStatus}". Must be one of: Single Father, Single Mother, Parents`);
//     }

//     if (parentalStatus === 'Single Father') {
//       if (motherName || motherContactNo || motherProfession) {
//         errors.push('Mother details should not be provided for Single Father status');
//       }
//       if (!fatherName) errors.push('Father Name is required');
//       if (!fatherContactNo) errors.push('Father Contact Number is required');
//       if (!fatherProfession) errors.push('Father Profession is required');
//     } else if (parentalStatus === 'Single Mother') {
//       if (fatherName || fatherContactNo || fatherProfession) {
//         errors.push('Father details should not be provided for Single Mother status');
//       }
//       if (!motherName) errors.push('Mother Name is required');
//       if (!motherContactNo) errors.push('Mother Contact Number is required');
//       if (!motherProfession) errors.push('Mother Profession is required');
//     } else if (parentalStatus === 'Parents') {
//       if (!fatherName) errors.push('Father Name is required');
//       if (!fatherContactNo) errors.push('Father Contact Number is required');
//       if (!fatherProfession) errors.push('Father Profession is required');
//       if (!motherName) errors.push('Mother Name is required');
//       if (!motherContactNo) errors.push('Mother Contact Number is required');
//       if (!motherProfession) errors.push('Mother Profession is required');
//     }

//     if (!['Teacher', 'Advertisement', 'Student', 'Online Search', 'Others'].includes(howReachUs)) {
//       errors.push(`Invalid How Reach Us "${howReachUs}". Must be one of: Teacher, Advertisement, Student, Online Search, Others`);
//     }

//     if (
//       bloodGroup &&
//       !['AB-', 'AB+', 'O-', 'O+', 'B-', 'B+', 'A-', 'A+'].includes(bloodGroup)
//     ) {
//       errors.push(`Invalid Blood Group "${bloodGroup}". Must be one of: AB-, AB+, O-, O+, B-, B+, A-, A+`);
//     }

//     if (!siblingInfoChecked) {
//       if (!relationType || !['Brother', 'Sister'].includes(relationType)) {
//         errors.push(`Invalid Relation Type "${relationType}". Must be one of: Brother, Sister`);
//       }
//       if (!siblingName) {
//         errors.push('Sibling Name is required when sibling information is provided');
//       }
//     }

//     const today = new Date();
//     const dateFields = [
//       { key: 'dateOfBirth', value: dateOfBirth, label: 'Date of Birth' },
//       { key: 'paymentDate', value: row.paymentDate?.toString().trim() || '', label: 'Payment Date', optional: true },
//     ];

//     dateFields.forEach((field) => {
//       if (!field.optional && (!field.value || isNaN(new Date(field.value).getTime()))) {
//         errors.push(`Invalid ${field.label} format. Use YYYY-MM-DD`);
//       }
//       if (field.value && !isNaN(new Date(field.value).getTime())) {
//         const date = new Date(field.value);
//         if (date > today) {
//           errors.push(`${field.label} cannot be in the future`);
//         }
//       }
//     });

//     if (dateOfBirth && !isNaN(new Date(dateOfBirth).getTime())) {
//       const birthDate = new Date(dateOfBirth);
//       let calculatedAge = today.getFullYear() - birthDate.getFullYear();
//       const monthDiff = today.getMonth() - birthDate.getMonth();
//       if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//         calculatedAge--;
//       }
//       if (calculatedAge <= 0 || calculatedAge > 120) {
//         errors.push('Invalid age derived from Date of Birth');
//       } else if (Number(age) !== calculatedAge) {
//         errors.push(`Age (${age}) does not match calculated age (${calculatedAge}) from Date of Birth`);
//       }
//     }

//     const phonePattern = /^[0-9]{10}$/;
//     if (parentContactNumber && !phonePattern.test(parentContactNumber)) {
//       errors.push('Parent Contact Number must be exactly 10 digits');
//     }
//     if (fatherContactNo && !phonePattern.test(fatherContactNo)) {
//       errors.push('Father Contact Number must be exactly 10 digits');
//     }
//     if (motherContactNo && !phonePattern.test(motherContactNo)) {
//       errors.push('Mother Contact Number must be exactly 10 digits');
//     }

//     const aadhaarPattern = /^\d{12}$/;
//     const passportPattern = /^[A-Za-z]{1}\d{7}$/;
//     if (
//       aadharPassportNumber &&
//       !(aadhaarPattern.test(aadharPassportNumber) || passportPattern.test(aadharPassportNumber))
//     ) {
//       errors.push('Invalid Aadhaar (12 digits) or Passport (1 letter + 7 digits) number');
//     }

//     const match = validatedData.find((vd) => {
//       const isMatch =
//         (vd.firstName || '').toString().trim() === firstName &&
//         (vd.lastName || '').toString().trim() === lastName &&
//         vd.masterDefineClass === classObj?._id &&
//         vd.masterDefineShift === shiftObj?._id &&
//         Number(vd.registrationFee || 0) === registrationFee &&
//         Number(vd.finalAmount || 0) === finalAmount;
//       return isMatch;
//     });

//     if (!match) {
//       errors.push('Row data does not match validated data');
//     }

//     return {
//       valid: errors.length === 0,
//       errors,
//     };
//   };

//   const getDisplayValue = (row, header) => {
//     if (header === 'className') {
//       const classObj = classes.find((c) => c._id === row.masterDefineClass);
//       return classObj ? classObj.className : row.className || '-';
//     }
//     if (header === 'shift') {
//       const shiftObj = shifts.find((s) => s._id === row.masterDefineShift);
//       return shiftObj ? shiftObj.masterDefineShiftName : row.shift || '-';
//     }
//     if (header === 'siblingInfoChecked') {
//       return row[header]?.toString().toLowerCase() === 'true' ? 'Yes' : 'No';
//     }
//     if ((header === 'relationType' || header === 'siblingName') && !row[header]) {
//       return row.siblingInfoChecked?.toString().toLowerCase() === 'true' ? '-' : '-';
//     }
//     return row[header] !== undefined && row[header] !== '' && row[header] !== 'null' ? row[header] : '-';
//   };

//   return (
//     <>
//       <style>
//         {`
//           .custom-modal .modal-dialog {
//             max-width: 95vw;
//             margin: auto;
//           }
//           .custom-modal .modal-content {
//             border-radius: 8px;
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           }
//           .custom-modal .modal-header {
//             background-color: #f8f9fa;
//             border-bottom: 1px solid #dee2e6;
//           }
//           .custom-modal .modal-body {
//             max-height: 70vh;
//             overflow-y: auto;
//             padding: 1.5rem;
//           }
//           .custom-modal .table-responsive {
//             max-height: 60vh;
//             overflow-y: auto;
//             overflow-x: auto;
//             border: 1px solid #dee2e6;
//             border-radius: 4px;
//           }
//           .custom-modal .table {
//             margin-bottom: 0;
//             white-space: nowrap;
//             font-size: 0.9rem;
//           }
//           .custom-modal .table thead th {
//             position: sticky;
//             top: 0;
//             background: #e9ecef;
//             z-index: 1;
//             padding: 8px;
//             font-weight: 600;
//             text-align: center;
//             vertical-align: middle;
//             border-bottom: 2px solid #dee2e6;
//             min-width: 100px;
//           }
//           .custom-modal .table tbody td {
//             padding: 8px;
//             text-align: center;
//             vertical-align: middle;
//             border-top: 1px solid #dee2e6;
//           }
//           .custom-modal .table tbody tr:hover {
//             background-color: #f1f3f5;
//           }
//           .valid-cell {
//             color: #28a745 !important; /* Bootstrap success green */
//             font-weight: 600;
//           }
//           .invalid-cell {
//             color: #dc3545 !important; /* Bootstrap danger red */
//             font-weight: 600;
//           }
//           .remark-cell {
//             max-width: 200px;
//             white-space: nowrap;
//             overflow: hidden;
//             text-overflow: ellipsis;
//           }
//           .remark-cell:hover {
//             overflow: visible;
//             white-space: normal;
//             background: #fff;
//             z-index: 10;
//             position: relative;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//           }
//           @media (max-width: 576px) {
//             .custom-modal .modal-dialog {
//               max-width: 98vw;
//             }
//             .custom-modal .modal-body {
//               max-height: 80vh;
//               padding: 1rem;
//             }
//             .custom-modal .table-responsive {
//               max-height: 70vh;
//             }
//             .custom-modal .table thead th,
//             .custom-modal .table tbody td {
//               font-size: 0.8rem;
//               padding: 6px;
//               min-width: 80px;
//             }
//             .remark-cell {
//               max-width: 100px;
//             }
//           }
//         `}
//       </style>
//       <Modal
//         show={show}
//         onHide={onClose}
//         size="xl"
//         centered
//         dialogClassName="custom-modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Admission Excel Data Preview</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {previewData.length === 0 ? (
//             <p className="text-muted">No data to display. Please check the file and try again.</p>
//           ) : (
//             <div className="table-responsive">
//               <Table bordered hover>
//                 <thead>
//                   <tr>
//                     {headers.map((header, index) => (
//                       <th key={index}>{header}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {previewData.map((row, index) => {
//                     const { valid, errors } = isRowValid(row, index);
//                     return (
//                       <tr key={index} className={valid ? 'valid-row' : 'invalid-row'}>
//                         <td>{index + 1}</td>
//                         {headers.slice(1, -2).map((header, colIndex) => (
//                           <td key={colIndex}>{getDisplayValue(row, header)}</td>
//                         ))}
//                         <OverlayTrigger
//                           placement="top"
//                           overlay={
//                             <Tooltip id={`tooltip-${index}`}>
//                               {valid ? 'Row is valid for import' : errors.join('; ')}
//                             </Tooltip>
//                           }
//                         >
//                           <td className={valid ? 'valid-cell' : 'invalid-cell'}>
//                             {valid ? 'Yes' : 'No'}
//                           </td>
//                         </OverlayTrigger>
//                         <td className="remark-cell">{valid ? '-' : errors.join('; ')}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default RegistrationPreviewModal;


import React from 'react';
import { Modal, Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';

const RegistrationPreviewModal = ({
  show,
  onClose,
  previewData,
  validatedData,
  classes,
  shifts,
  feeTypesByClass,
}) => {
  const headers = [
    'Row',
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
    'paymentDate',
    'Valid',
    'Remark',
  ];

  const isRowValid = (row, index) => {
    const firstName = row.firstName?.toString().trim() || '';
    const lastName = row.lastName?.toString().trim() || '';
    const dateOfBirth = row.dateOfBirth?.toString().trim() || '';
    const age = row.age?.toString().trim() || '';
    const nationality = row.nationality?.toString().trim() || '';
    const gender = row.gender?.toString().trim() || '';
    const bloodGroup = row.bloodGroup?.toString().trim() || '';
    const motherTongue = row.motherTongue?.toString().trim() || '';
    const parentContactNumber = row.parentContactNumber?.toString().trim() || '';
    const className = row.className?.toString().trim() || '';
    const shiftName = row.shift?.toString().trim() || '';
    const fatherName = row.fatherName?.toString().trim() || '';
    const fatherContactNo = row.fatherContactNo?.toString().trim() || '';
    const fatherProfession = row.fatherProfession?.toString().trim() || '';
    const motherName = row.motherName?.toString().trim() || '';
    const motherContactNo = row.motherContactNo?.toString().trim() || '';
    const motherProfession = row.motherProfession?.toString().trim() || '';
    const currentAddress = row.currentAddress?.toString().trim() || '';
    const country = row.country?.toString().trim() || '';
    const state = row.state?.toString().trim() || '';
    const city = row.city?.toString().trim() || '';
    const pincode = row.pincode?.toString().trim() || '';
    const studentCategory = row.studentCategory?.toString().trim() || '';
    const siblingInfoChecked = row.siblingInfoChecked?.toString().trim().toLowerCase() === 'true';
    const relationType = row.relationType?.toString().trim() || '';
    const siblingName = row.siblingName?.toString().trim() || '';
    const parentalStatus = row.parentalStatus?.toString().trim() || '';
    const howReachUs = row.howReachUs?.toString().trim() || '';
    const aadharPassportNumber = row.aadharPassportNumber?.toString().trim() || '';
    const selectedFeeType = row.selectedFeeType?.toString().trim() || '';
    const registrationFee = Number(row.registrationFee) || 0;
    const concessionAmount = Number(row.concessionAmount) || 0;
    const concessionType = row.concessionType?.toString().trim() || '';
    const finalAmount = Number(row.finalAmount) || 0;
    const name = row.name?.toString().trim() || '';
    const paymentMode = row.paymentMode?.toString().trim() || '';
    const chequeNumber = row.chequeNumber?.toString().trim() || '';
    const bankName = row.bankName?.toString().trim() || '';

    const errors = [];

    const requiredFields = [
      { key: 'firstName', value: firstName, label: 'First Name' },
      { key: 'lastName', value: lastName, label: 'Last Name' },
      { key: 'dateOfBirth', value: dateOfBirth, label: 'Date of Birth' },
      { key: 'age', value: age, label: 'Age' },
      { key: 'nationality', value: nationality, label: 'Nationality' },
      { key: 'gender', value: gender, label: 'Gender' },
      { key: 'motherTongue', value: motherTongue, label: 'Mother Tongue' },
      { key: 'className', value: className, label: 'Class Name' },
      { key: 'shift', value: shiftName, label: 'Shift' },
      { key: 'currentAddress', value: currentAddress, label: 'Current Address' },
      { key: 'country', value: country, label: 'Country' },
      { key: 'state', value: state, label: 'State' },
      { key: 'city', value: city, label: 'City' },
      { key: 'pincode', value: pincode, label: 'Pincode' },
      { key: 'studentCategory', value: studentCategory, label: 'Student Category' },
      { key: 'parentalStatus', value: parentalStatus, label: 'Parental Status' },
      { key: 'howReachUs', value: howReachUs, label: 'How Reach Us' },
      { key: 'aadharPassportNumber', value: aadharPassportNumber, label: 'Aadhaar/Passport Number' },
      { key: 'name', value: name, label: 'Name of Person Filling the Form' },
    ];

    if (!siblingInfoChecked) {
      requiredFields.push(
        { key: 'relationType', value: relationType, label: 'Relation Type' },
        { key: 'siblingName', value: siblingName, label: 'Sibling Name' }
      );
    }

    requiredFields.forEach((field) => {
      if (!field.value) {
        errors.push(`${field.label} is required`);
      }
    });

    const classObj = classes.find((c) => c.className.toLowerCase() === className.toLowerCase());
    if (!classObj) {
      errors.push(`Invalid class "${className}"`);
    }

    const shiftObj = shifts.find((s) => s.masterDefineShiftName.toLowerCase() === shiftName.toLowerCase());
    if (!shiftObj) {
      errors.push(`Invalid shift "${shiftName}"`);
    }

    // Validate concessionType
    const validConcessionTypes = ['EWS', 'SC', 'ST', 'OBC', 'Staff Children', 'Other'];
    if (concessionAmount > 0) {
      if (!concessionType || !validConcessionTypes.includes(concessionType)) {
        errors.push(
          `Concession Type is required when Concession Amount is greater than 0 and must be one of: ${validConcessionTypes.join(', ')}`
        );
      }
    }

    if (paymentMode && paymentMode !== 'null') {
      const feeType = classObj && feeTypesByClass[classObj._id]?.find(
        (ft) => ft.name.toLowerCase() === selectedFeeType.toLowerCase()
      );
      /* Commented out to match RegistrationExcelSheetModal
      if (!feeType) {
        errors.push(`Invalid fee type "${selectedFeeType}"`);
      }
      if (registrationFee <= 0 || (feeType && registrationFee !== feeType.amount)) {
        errors.push(`Registration Fee must match the fee type amount (${feeType ? feeType.amount : 'unknown'})`);
      }
      */
      if (concessionAmount < 0 || concessionAmount > registrationFee) {
        errors.push(`Concession Amount must be between 0 and Registration Fee (${registrationFee})`);
      }
      if (finalAmount !== registrationFee - concessionAmount) {
        errors.push(`Final Amount must be Registration Fee (${registrationFee}) minus Concession (${concessionAmount})`);
      }

      if (!['Cash', 'Cheque', 'Online'].includes(paymentMode)) {
        errors.push(`Invalid Payment Mode "${paymentMode}". Must be one of: Cash, Cheque, Online`);
      }

      if (paymentMode === 'Cheque') {
        if (!chequeNumber) errors.push('Cheque Number is required for Cheque payment mode');
        if (!bankName) errors.push('Bank Name is required for Cheque payment mode');
      }
    }

    if (!['India', 'International', 'SAARC Countries'].includes(nationality)) {
      errors.push(`Invalid Nationality "${nationality}". Must be one of: India, International, SAARC Countries`);
    }

    if (!['Male', 'Female'].includes(gender)) {
      errors.push(`Invalid Gender "${gender}". Must be one of: Male, Female`);
    }

    if (
      !['General', 'OBC', 'ST', 'SC'].includes(studentCategory) ||
      (['SAARC Countries', 'International'].includes(nationality) && studentCategory !== 'General')
    ) {
      errors.push(`Invalid Student Category "${studentCategory}". Must be one of: General, OBC, ST, SC (General for SAARC/International)`);
    }

    if (!['Single Father', 'Single Mother', 'Parents'].includes(parentalStatus)) {
      errors.push(`Invalid Parental Status "${parentalStatus}". Must be one of: Single Father, Single Mother, Parents`);
    }

    if (parentalStatus === 'Single Father') {
      if (motherName || motherContactNo || motherProfession) {
        errors.push('Mother details should not be provided for Single Father status');
      }
      if (!fatherName) errors.push('Father Name is required');
      if (!fatherContactNo) errors.push('Father Contact Number is required');
      if (!fatherProfession) errors.push('Father Profession is required');
    } else if (parentalStatus === 'Single Mother') {
      if (fatherName || fatherContactNo || fatherProfession) {
        errors.push('Father details should not be provided for Single Mother status');
      }
      if (!motherName) errors.push('Mother Name is required');
      if (!motherContactNo) errors.push('Mother Contact Number is required');
      if (!motherProfession) errors.push('Mother Profession is required');
    } else if (parentalStatus === 'Parents') {
      if (!fatherName) errors.push('Father Name is required');
      if (!fatherContactNo) errors.push('Father Contact Number is required');
      if (!fatherProfession) errors.push('Father Profession is required');
      if (!motherName) errors.push('Mother Name is required');
      if (!motherContactNo) errors.push('Mother Contact Number is required');
      if (!motherProfession) errors.push('Mother Profession is required');
    }

    if (!['Teacher', 'Advertisement', 'Student', 'Online Search', 'Others'].includes(howReachUs)) {
      errors.push(`Invalid How Reach Us "${howReachUs}". Must be one of: Teacher, Advertisement, Student, Online Search, Others`);
    }

    if (
      bloodGroup &&
      !['AB-', 'AB+', 'O-', 'O+', 'B-', 'B+', 'A-', 'A+'].includes(bloodGroup)
    ) {
      errors.push(`Invalid Blood Group "${bloodGroup}". Must be one of: AB-, AB+, O-, O+, B-, B+, A-, A+`);
    }

    if (!siblingInfoChecked) {
      if (!relationType || !['Brother', 'Sister'].includes(relationType)) {
        errors.push(`Invalid Relation Type "${relationType}". Must be one of: Brother, Sister`);
      }
      if (!siblingName) {
        errors.push('Sibling Name is required when sibling information is provided');
      }
    }

    const today = new Date();
    if (!dateOfBirth || isNaN(new Date(dateOfBirth).getTime())) {
      errors.push('Invalid Date of Birth format. Use YYYY-MM-DD');
    } else {
      const birthDate = new Date(dateOfBirth);
      if (birthDate > today) {
        errors.push('Date of Birth cannot be in the future');
      }
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      if (calculatedAge <= 0 || calculatedAge > 120) {
        errors.push('Invalid age derived from Date of Birth');
      } else if (Number(age) !== calculatedAge) {
        errors.push(`Age (${age}) does not match calculated age (${calculatedAge}) from Date of Birth`);
      }
    }

    const phonePattern = /^[0-9]{10}$/;
    if (parentContactNumber && !phonePattern.test(parentContactNumber)) {
      errors.push('Parent Contact Number must be exactly 10 digits');
    }
    if (fatherContactNo && !phonePattern.test(fatherContactNo)) {
      errors.push('Father Contact Number must be exactly 10 digits');
    }
    if (motherContactNo && !phonePattern.test(motherContactNo)) {
      errors.push('Mother Contact Number must be exactly 10 digits');
    }

    const aadhaarPattern = /^\d{12}$/;
    const passportPattern = /^[A-Za-z]{1}\d{7}$/;
    if (
      aadharPassportNumber &&
      !(aadhaarPattern.test(aadharPassportNumber) || passportPattern.test(aadharPassportNumber))
    ) {
      errors.push('Invalid Aadhaar (12 digits) or Passport (1 letter + 7 digits) number');
    }

    const match = validatedData.find((vd) => {
      const isMatch =
        (vd.firstName || '').toString().trim() === firstName &&
        (vd.lastName || '').toString().trim() === lastName &&
        vd.masterDefineClass === classObj?._id &&
        vd.masterDefineShift === shiftObj?._id &&
        Number(vd.registrationFee || 0) === registrationFee &&
        Number(vd.finalAmount || 0) === finalAmount;
      return isMatch;
    });

    if (!match) {
      errors.push('Row data does not match validated data');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  const getDisplayValue = (row, header) => {
    if (header === 'className') {
      const classObj = classes.find((c) => c._id === row.masterDefineClass);
      return classObj ? classObj.className : row.className || '-';
    }
    if (header === 'shift') {
      const shiftObj = shifts.find((s) => s._id === row.masterDefineShift);
      return shiftObj ? shiftObj.masterDefineShiftName : row.shift || '-';
    }
    if (header === 'siblingInfoChecked') {
      return row[header]?.toString().toLowerCase() === 'true' ? 'Yes' : 'No';
    }
    if ((header === 'relationType' || header === 'siblingName') && !row[header]) {
      return row.siblingInfoChecked?.toString().toLowerCase() === 'true' ? '-' : '-';
    }
    if (header === 'concessionType' && !row[header]) {
      return Number(row.concessionAmount || 0) === 0 ? '-' : row[header] || '-';
    }
    return row[header] !== undefined && row[header] !== '' && row[header] !== 'null' ? row[header] : '-';
  };

  return (
    <>
      <style jsx>
        {`
          .custom-modal .modal-dialog {
            max-width: 95vw;
            margin: auto;
          }
          .custom-modal .modal-content {
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .custom-modal .modal-header {
            background-color: #f8f9fa;
            border-bottom: 1px solid #dee2e6;
          }
          .custom-modal .modal-body {
            max-height: 70vh;
            overflow-y: auto;
            padding: 1.5rem;
          }
          .custom-modal .table-responsive {
            max-height: 60vh;
            overflow-y: auto;
            overflow-x: auto;
            border: 1px solid #dee2e6;
            border-radius: 4px;
          }
          .custom-modal .table {
            margin-bottom: 0;
            white-space: nowrap;
            font-size: 0.9rem;
          }
          .custom-modal .table thead th {
            position: sticky;
            top: 0;
            background: #e9ecef;
            z-index: 1;
            padding: 8px;
            font-weight: 600;
            text-align: center;
            vertical-align: middle;
            border-bottom: 2px solid #dee2e6;
            min-width: 100px;
          }
          .custom-modal .table tbody td {
            padding: 8px;
            text-align: center;
            vertical-align: middle;
            border-top: 1px solid #dee2e6;
          }
          .custom-modal .table tbody tr:hover {
            background-color: #f1f3f5;
          }
          .valid-cell {
            color: #28a745 !important; /* Bootstrap success green */
            font-weight: 600;
          }
          .invalid-cell {
            color: #dc3545 !important; /* Bootstrap danger red */
            font-weight: 600;
          }
          .remark-cell {
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .remark-cell:hover {
            overflow: visible;
            white-space: normal;
            background: #fff;
            z-index: 10;
            position: relative;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          @media (max-width: 576px) {
            .custom-modal .modal-dialog {
              max-width: 98vw;
            }
            .custom-modal .modal-body {
              max-height: 80vh;
              padding: 1rem;
            }
            .custom-modal .table-responsive {
              max-height: 70vh;
            }
            .custom-modal .table thead th,
            .custom-modal .table tbody td {
              font-size: 0.8rem;
              padding: 6px;
              min-width: 80px;
            }
            .remark-cell {
              max-width: 100px;
            }
          }
        `}
      </style>
    <Modal
      show={show}
      onHide={onClose}
      size="xl"
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Admission Excel Data Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {previewData.length === 0 ? (
          <p className="text-muted">No data to display. Please check the file and try again.</p>
        ) : (
          <div className="table-responsive">
            <Table bordered hover>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, index) => {
                  const { valid, errors } = isRowValid(row, index);
                  return (
                    <tr key={index} className={valid ? 'valid-row' : 'invalid-row'}>
                      <td>{index + 1}</td>
                      {headers.slice(1, -2).map((header, colIndex) => (
                        <td key={colIndex}>{getDisplayValue(row, header)}</td>
                      ))}
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-${index}`}>
                            {valid ? 'Row is valid for import' : errors.join('; ')}
                          </Tooltip>
                        }
                      >
                        <td className={valid ? 'valid-cell' : 'invalid-cell'}>
                          {valid ? 'Yes' : 'No'}
                        </td>
                      </OverlayTrigger>
                      <td className="remark-cell">{valid ? '-' : errors.join('; ')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default RegistrationPreviewModal;