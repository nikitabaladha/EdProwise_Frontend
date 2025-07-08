// // import React from 'react';
// // import { Modal, Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
// // import { toast } from 'react-toastify';

// // const excelSerialToDate = (serial) => {
// //   if (typeof serial !== 'number' || isNaN(serial) || serial < 1) {
// //     return null;
// //   }
// //   const excelEpoch = new Date(1900, 0, 1);
// //   const date = new Date(excelEpoch.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
// //   if (serial <= 60) {
// //     date.setDate(date.getDate() - 1);
// //   }
// //   return date;
// // };

// // const AdmissionPreviewModal = ({ show, onClose, previewData, validatedData, classes, shifts, feeTypesByClass }) => {
// //   const headers = [
// //     'Row', 'registrationNumber', 'AdmissionNumber', 'firstName', 'middleName', 'lastName', 'dateOfBirth', 'age', 'nationality',
// //     'gender', 'bloodGroup', 'className', 'Shift', 'section', 'currentAddress', 'country', 'state', 'city',
// //     'pincode', 'parentContactNumber', 'motherTongue', 'previousSchoolName', 'addressOfPreviousSchool',
// //     'previousSchoolBoard', 'aadharPassportNumber', 'studentCategory', 'siblingInfoChecked',
// //     'relationType', 'siblingName', 'parentalStatus', 'fatherName', 'fatherContactNo',
// //     'fatherQualification', 'fatherProfession', 'motherName', 'motherContactNo', 'motherQualification',
// //     'motherProfession', 'agreementChecked', 'selectedFeeType', 'admissionFees', 'concessionAmount',
// //     'finalAmount', 'name', 'paymentMode', 'chequeNumber', 'bankName', 'Valid'
// //   ];

// //   const normalizeValue = (value) =>
// //     value === undefined || value === null ? '' : value.toString().trim().toLowerCase();

// //   const isRowValid = (row, index) => {
// //     const registrationNumber = normalizeValue(row.registrationNumber);
// //     const admissionNumber = normalizeValue(row.AdmissionNumber);
// //     const firstName = normalizeValue(row.firstName);
// //     const middleName = normalizeValue(row.middleName);
// //     const lastName = normalizeValue(row.lastName);
// //     const className = normalizeValue(row.className);
// //     const shiftName = normalizeValue(row.Shift);
// //     const sectionName = normalizeValue(row.section);
// //     const feeTypeName = normalizeValue(row.selectedFeeType);
// //     const admissionFees = Number(row.admissionFees) || 0;
// //     const concessionAmount = Number(row.concessionAmount) || 0;
// //     const finalAmount = Number(row.finalAmount) || 0;
// //     let dateOfBirth = normalizeValue(row.dateOfBirth);

// //     if (typeof row.dateOfBirth === 'number') {
// //       const parsedDate = excelSerialToDate(row.dateOfBirth);
// //       dateOfBirth = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : '';
// //     }

// //     const classObj = classes.find(c => normalizeValue(c.className) === className);
// //     const shiftObj = shifts.find(s => normalizeValue(s.masterDefineShiftName) === shiftName);
// //     const sectionObj = classObj?.sections.find(s => normalizeValue(s.name) === sectionName && s.shiftId === shiftObj?._id);
// //     const feeType = classObj && sectionObj && feeTypesByClass[`${classObj._id}_${sectionObj._id}`]?.find(
// //       ft => normalizeValue(ft.name) === feeTypeName
// //     );

// //     const errors = [];
// //     if (!classObj) errors.push(`Invalid class "${className}"`);
// //     if (!shiftObj) errors.push(`Invalid shift "${shiftName}"`);
// //     if (!sectionObj) errors.push(`Invalid section "${sectionName}"`);
// //     if (!feeType) errors.push(`Invalid fee type "${feeTypeName}"`);
// //     if (!dateOfBirth) errors.push('Invalid date of birth');
// //     if (errors.length > 0) {
// //       console.log(`Row ${index + 1} validation errors:`, errors);
// //       return { valid: false, errors };
// //     }

// //     const isNursery = className === 'nursery';
// //     const siblingInfoChecked = normalizeValue(row.siblingInfoChecked) === 'true';
// //     const parentalStatus = normalizeValue(row.parentalStatus);
// //     const studentCategory = normalizeValue(row.studentCategory);
// //     const paymentMode = normalizeValue(row.paymentMode);

// //     const match = validatedData.find((vd) => {
// //       const vdClassObj = classes.find(c => c._id === vd.masterDefineClass);
// //       const vdShiftObj = shifts.find(s => s._id === vd.masterDefineShift);
// //       const vdSectionObj = vdClassObj?.sections.find(s => s._id === vd.section);
// //       const vdFeeType = feeTypesByClass[`${vdClassObj?._id}_${vdSectionObj?._id}`]?.find(
// //         ft => ft.id === vd.selectedFeeType
// //       );

// //       const isMatch = (
// //         normalizeValue(vd.registrationNumber) === registrationNumber &&
// //         normalizeValue(vd.AdmissionNumber) === admissionNumber &&
// //         normalizeValue(vd.firstName) === firstName &&
// //         normalizeValue(vd.middleName) === middleName &&
// //         normalizeValue(vd.lastName) === lastName &&
// //         normalizeValue(vd.dateOfBirth) === dateOfBirth &&
// //         normalizeValue(vd.age) === normalizeValue(row.age) &&
// //         normalizeValue(vd.nationality) === normalizeValue(row.nationality) &&
// //         normalizeValue(vd.gender) === normalizeValue(row.gender) &&
// //         normalizeValue(vd.bloodGroup) === normalizeValue(row.bloodGroup) &&
// //         normalizeValue(vd.currentAddress) === normalizeValue(row.currentAddress) &&
// //         normalizeValue(vd.country) === normalizeValue(row.country) &&
// //         normalizeValue(vd.state) === normalizeValue(row.state) &&
// //         normalizeValue(vd.city) === normalizeValue(row.city) &&
// //         normalizeValue(vd.pincode) === normalizeValue(row.pincode) &&
// //         normalizeValue(vd.parentContactNumber) === normalizeValue(row.parentContactNumber) &&
// //         normalizeValue(vd.motherTongue) === normalizeValue(row.motherTongue) &&
// //         normalizeValue(vd.aadharPassportNumber) === normalizeValue(row.aadharPassportNumber) &&
// //         normalizeValue(vd.studentCategory) === studentCategory &&
// //         normalizeValue(vd.siblingInfoChecked) === normalizeValue(row.siblingInfoChecked) &&
// //         (siblingInfoChecked || (
// //           normalizeValue(vd.relationType) === normalizeValue(row.relationType) &&
// //           normalizeValue(vd.siblingName) === normalizeValue(row.siblingName)
// //         )) &&
// //         normalizeValue(vd.parentalStatus) === parentalStatus &&
// //         (parentalStatus === 'single mother' || (
// //           normalizeValue(vd.fatherName) === normalizeValue(row.fatherName) &&
// //           normalizeValue(vd.fatherContactNo) === normalizeValue(row.fatherContactNo) &&
// //           normalizeValue(vd.fatherQualification) === normalizeValue(row.fatherQualification) &&
// //           normalizeValue(vd.fatherProfession) === normalizeValue(row.fatherProfession)
// //         )) &&
// //         (parentalStatus === 'single father' || (
// //           normalizeValue(vd.motherName) === normalizeValue(row.motherName) &&
// //           normalizeValue(vd.motherContactNo) === normalizeValue(row.motherContactNo) &&
// //           normalizeValue(vd.motherQualification) === normalizeValue(row.motherQualification) &&
// //           normalizeValue(vd.motherProfession) === normalizeValue(row.motherProfession)
// //         )) &&
// //         (studentCategory === 'general' || normalizeValue(vd.castCertificate) === normalizeValue(row.castCertificate)) &&
// //         normalizeValue(vd.agreementChecked) === normalizeValue(row.agreementChecked) &&
// //         normalizeValue(vd.name) === normalizeValue(row.name) &&
// //         normalizeValue(vd.paymentMode) === paymentMode &&
// //         (paymentMode !== 'cheque' || (
// //           normalizeValue(vd.chequeNumber) === normalizeValue(row.chequeNumber) &&
// //           normalizeValue(vd.bankName) === normalizeValue(row.bankName)
// //         )) &&
// //         vd.masterDefineClass === classObj._id &&
// //         vd.masterDefineShift === shiftObj._id &&
// //         vd.section === sectionObj._id &&
// //         vd.selectedFeeType === feeType.id &&
// //         Number(vd.admissionFees || 0) === admissionFees &&
// //         Number(vd.concessionAmount || 0) === concessionAmount &&
// //         Number(vd.finalAmount || 0) === finalAmount &&
// //         (isNursery || (
// //           normalizeValue(vd.previousSchoolName) === normalizeValue(row.previousSchoolName) &&
// //           normalizeValue(vd.addressOfPreviousSchool) === normalizeValue(row.addressOfPreviousSchool) &&
// //           normalizeValue(vd.previousSchoolBoard) === normalizeValue(row.previousSchoolBoard)
// //         ))
// //       );

// //       if (!isMatch) {
// //         console.log(`Row ${index + 1} validation failed:`, {
// //           registrationNumber: { preview: registrationNumber, validated: normalizeValue(vd.registrationNumber) },
// //           admissionNumber: { preview: admissionNumber, validated: normalizeValue(vd.AdmissionNumber) },
// //           firstName: { preview: firstName, validated: normalizeValue(vd.firstName) },
// //           middleName: { preview: middleName, validated: normalizeValue(vd.middleName) },
// //           lastName: { preview: lastName, validated: normalizeValue(vd.lastName) },
// //           dateOfBirth: { preview: dateOfBirth, validated: normalizeValue(vd.dateOfBirth) },
// //           age: { preview: normalizeValue(row.age), validated: normalizeValue(vd.age) },
// //           nationality: { preview: normalizeValue(row.nationality), validated: normalizeValue(vd.nationality) },
// //           gender: { preview: normalizeValue(row.gender), validated: normalizeValue(vd.gender) },
// //           bloodGroup: { preview: normalizeValue(row.bloodGroup), validated: normalizeValue(vd.bloodGroup) },
// //           className: { preview: className, validated: vdClassObj?.className },
// //           Shift: { preview: shiftName, validated: vdShiftObj?.masterDefineShiftName },
// //           section: { preview: sectionName, validated: vdSectionObj?.name },
// //           selectedFeeType: { preview: feeTypeName, validated: vdFeeType?.name },
// //           admissionFees: { preview: admissionFees, validated: Number(vd.admissionFees || 0) },
// //           concessionAmount: { preview: concessionAmount, validated: Number(vd.concessionAmount || 0) },
// //           finalAmount: { preview: finalAmount, validated: Number(vd.finalAmount || 0) },
// //           siblingInfoChecked: { preview: normalizeValue(row.siblingInfoChecked), validated: normalizeValue(vd.siblingInfoChecked) },
// //           parentalStatus: { preview: parentalStatus, validated: normalizeValue(vd.parentalStatus) },
// //           paymentMode: { preview: paymentMode, validated: normalizeValue(vd.paymentMode) },
// //         });
// //       }

// //       return isMatch;
// //     });

// //     return {
// //       valid: !!match,
// //       errors: match ? [] : ['Row data does not fully match validated data']
// //     };
// //   };

// //   const getDisplayValue = (row, header) => {
// //     if (header === 'dateOfBirth') {
// //       if (typeof row[header] === 'number') {
// //         const parsedDate = excelSerialToDate(row[header]);
// //         return parsedDate && !isNaN(parsedDate.getTime())
// //           ? parsedDate.toISOString().split('T')[0]
// //           : 'Invalid Date';
// //       }
// //       return normalizeValue(row[header]) || '-';
// //     }
// //     if (header === 'className') {
// //       const classObj = classes.find(c => normalizeValue(c.className) === normalizeValue(row[header]));
// //       return classObj ? classObj.className : normalizeValue(row[header]) || '-';
// //     }
// //     if (header === 'Shift') {
// //       const shiftObj = shifts.find(s => normalizeValue(s.masterDefineShiftName) === normalizeValue(row[header]));
// //       return shiftObj ? shiftObj.masterDefineShiftName : normalizeValue(row[header]) || '-';
// //     }
// //     if (header === 'section') {
// //       const classObj = classes.find(c => normalizeValue(c.className) === normalizeValue(row.className));
// //       const shiftObj = shifts.find(s => normalizeValue(s.masterDefineShiftName) === normalizeValue(row.Shift));
// //       const sectionObj = classObj?.sections.find(s => normalizeValue(s.name) === normalizeValue(row[header]) && s.shiftId === shiftObj?._id);
// //       return sectionObj ? sectionObj.name : normalizeValue(row[header]) || '-';
// //     }
// //     if (header === 'siblingInfoChecked' || header === 'agreementChecked') {
// //       return normalizeValue(row[header]) === 'true' ? 'true' : 'false';
// //     }
// //     return normalizeValue(row[header]) || '-';
// //   };

// //   return (
// //     <>
// //       <style jsx>{`
// //         .custom-modal {
// //           .modal-dialog {
// //             max-width: 95vw;
// //             margin: auto;
// //           }
// //           .modal-content {
// //             border-radius: 10px;
// //             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// //           }
// //           .modal-header {
// //             background-color: #f8f9fa;
// //             border-bottom: 1px solid #dee2e6;
// //           }
// //           .modal-body {
// //             max-height: 70vh;
// //             overflow-y: auto;
// //             padding: 1.5rem;
// //           }
// //           .table-responsive {
// //             max-height: 60vh;
// //             overflow-y: auto;
// //             overflow-x: auto;
// //           }
// //           .table {
// //             margin-bottom: 0;
// //             border-collapse: separate;
// //             border-spacing: 0;
// //             thead th {
// //               position: sticky;
// //               top: 0;
// //               background: #e9ecef;
// //               z-index: 1;
// //               padding: 8px;
// //               font-size: 0.9rem;
// //               font-weight: 600;
// //               text-align: center;
// //               vertical-align: middle;
// //               border-right: 1px solid #dee2e6;
// //               min-width: 100px;
// //             }
// //             tbody tr:nth-child(odd) {
// //               background-color: #f8f9fa;
// //             }
// //             tbody tr:hover {
// //               background-color: #e2e6ea;
// //             }
// //             tbody td {
// //               padding: 8px;
// //               font-size: 0.85rem;
// //               text-align: left;
// //               vertical-align: middle;
// //               border-right: 1px solid #dee2e6;
// //             }
// //           rouges
// //             .modal-dialog {
// //               max-width: 98vw;
// //             }
// //             .modal-body {
// //               max-height: 80vh;
// //               padding: 1rem;
// //             }
// //             .table-responsive {
// //               max-height: 70vh;
// //             }
// //             thead th,
// //             td {
// //               font-size: 0.8rem;
// //               padding: 6px;
// //               min-width: 80px;
// //             }
// //           }
// //         }
// //       `}</style>
// //       <Modal
// //         show={show}
// //         onHide={onClose}
// //         size="xl"
// //         centered
// //         className="custom-modal"
// //       >
// //         <Modal.Header closeButton>
// //           <Modal.Title>Admission Excel Data Preview</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           {previewData.length === 0 ? (
// //             <p className="text-muted">No data to display. Please check the file and try again.</p>
// //           ) : (
// //             <div className="table-responsive">
// //               <Table bordered hover>
// //                 <thead>
// //                   <tr>
// //                     {headers.map((header, index) => (
// //                       <th key={index}>{header}</th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {previewData.map((row, index) => {
// //                     const { valid, errors } = isRowValid(row, index);
// //                     return (
// //                       <tr key={index}>
// //                         <td>{index + 1}</td>
// //                         {headers.slice(1, -1).map((header, colIndex) => (
// //                           <td key={colIndex}>{getDisplayValue(row, header)}</td>
// //                         ))}
// //                         <OverlayTrigger
// //                           placement="top"
// //                           overlay={<Tooltip>{valid ? 'Row is valid for import' : errors.join(', ')}</Tooltip>}
// //                         >
// //                           <td style={{ color: valid ? 'green' : 'red', fontWeight: 'bold' }}>
// //                             {valid ? 'Yes' : 'No'}
// //                           </td>
// //                         </OverlayTrigger>
// //                       </tr>
// //                     );
// //                   })}
// //                 </tbody>
// //               </Table>
// //             </div>
// //           )}
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={onClose}>
// //             Close
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </>
// //   );
// // };

// // export default AdmissionPreviewModal;


import { Modal, Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

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

const AdmissionPreviewModal = ({ show, onClose, previewData, validatedData, classes, shifts, feeTypesByClass }) => {
  const headers = [
    'Row', 'registrationNumber', 'AdmissionNumber', 'firstName', 'middleName', 'lastName', 'dateOfBirth', 'age', 'nationality',
    'gender', 'bloodGroup', 'className', 'Shift', 'section', 'currentAddress', 'country', 'state', 'city',
    'pincode', 'parentContactNumber', 'motherTongue', 'previousSchoolName', 'addressOfPreviousSchool',
    'previousSchoolBoard', 'aadharPassportNumber', 'studentCategory', 'siblingInfoChecked',
    'relationType', 'siblingName', 'parentalStatus', 'fatherName', 'fatherContactNo',
    'fatherQualification', 'fatherProfession', 'motherName', 'motherContactNo', 'motherQualification',
    'motherProfession', 'selectedFeeType', 'admissionFees', 'concessionAmount',
    'finalAmount', 'name', 'paymentMode', 'chequeNumber', 'bankName', 'Valid', 'Remark'
  ];

  const normalizeValue = (value) =>
    value === undefined || value === null ? '' : value.toString().trim().toLowerCase();

  const capitalizeFirstLetter = (str) => {
    if (!str) return '-';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const isRowValid = (row, index) => {
    const registrationNumber = normalizeValue(row.registrationNumber);
    const admissionNumber = normalizeValue(row.AdmissionNumber);
    const firstName = normalizeValue(row.firstName);
    const middleName = normalizeValue(row.middleName);
    const lastName = normalizeValue(row.lastName);
    const className = normalizeValue(row.className);
    const shiftName = normalizeValue(row.Shift);
    const sectionName = normalizeValue(row.section);
    const feeTypeName = normalizeValue(row.selectedFeeType);
    const admissionFees = Number(row.admissionFees) || 0;
    const concessionAmount = Number(row.concessionAmount) || 0;
    const finalAmount = Number(row.finalAmount) || 0;
    let dateOfBirth = normalizeValue(row.dateOfBirth);

    if (typeof row.dateOfBirth === 'number') {
      const parsedDate = excelSerialToDate(row.dateOfBirth);
      dateOfBirth = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : '';
    }

    const classObj = classes.find(c => normalizeValue(c.className) === className);
    const shiftObj = shifts.find(s => normalizeValue(s.masterDefineShiftName) === shiftName);
    const sectionObj = classObj?.sections.find(s => normalizeValue(s.name) === sectionName && s.shiftId === shiftObj?._id);
    const feeType = classObj && sectionObj && feeTypesByClass[`${classObj._id}_${sectionObj._id}`]?.find(
      ft => normalizeValue(ft.name) === feeTypeName
    );

    const errors = [];
    if (!classObj) errors.push(`Invalid class "${className}"`);
    if (!shiftObj) errors.push(`Invalid shift "${shiftName}"`);
    if (!sectionObj) errors.push(`Invalid section "${sectionName}"`);
    if (!feeType) errors.push(`Invalid fee type "${feeTypeName}"`);
    if (!dateOfBirth) errors.push('Invalid date of birth');
    if (errors.length > 0) {
      console.log(`Row ${index + 1} validation errors:`, errors);
      return { valid: false, errors };
    }

    const siblingInfoChecked = normalizeValue(row.siblingInfoChecked) === 'true';
    const parentalStatus = normalizeValue(row.parentalStatus);
    const studentCategory = normalizeValue(row.studentCategory);
    const paymentMode = normalizeValue(row.paymentMode);

    const match = validatedData.find((vd) => {
      const vdClassObj = classes.find(c => c._id === vd.masterDefineClass);
      const vdShiftObj = shifts.find(s => s._id === vd.masterDefineShift);
      const vdSectionObj = vdClassObj?.sections.find(s => s._id === vd.section);
      const vdFeeType = feeTypesByClass[`${vdClassObj?._id}_${vdSectionObj?._id}`]?.find(
        ft => ft.id === vd.selectedFeeType
      );

      const isMatch = (
        normalizeValue(vd.registrationNumber) === registrationNumber &&
        normalizeValue(vd.AdmissionNumber) === admissionNumber &&
        normalizeValue(vd.firstName) === firstName &&
        normalizeValue(vd.middleName) === middleName &&
        normalizeValue(vd.lastName) === lastName &&
        normalizeValue(vd.dateOfBirth) === dateOfBirth &&
        normalizeValue(vd.age) === normalizeValue(row.age) &&
        normalizeValue(vd.nationality) === normalizeValue(row.nationality) &&
        normalizeValue(vd.gender) === normalizeValue(row.gender) &&
        normalizeValue(vd.bloodGroup) === normalizeValue(row.bloodGroup) &&
        normalizeValue(vd.currentAddress) === normalizeValue(row.currentAddress) &&
        normalizeValue(vd.country) === normalizeValue(row.country) &&
        normalizeValue(vd.state) === normalizeValue(row.state) &&
        normalizeValue(vd.city) === normalizeValue(row.city) &&
        normalizeValue(vd.pincode) === normalizeValue(row.pincode) &&
        normalizeValue(vd.parentContactNumber) === normalizeValue(row.parentContactNumber) &&
        normalizeValue(vd.motherTongue) === normalizeValue(row.motherTongue) &&
        normalizeValue(vd.aadharPassportNumber) === normalizeValue(row.aadharPassportNumber) &&
        normalizeValue(vd.studentCategory) === studentCategory &&
        normalizeValue(vd.siblingInfoChecked) === normalizeValue(row.siblingInfoChecked) &&
        (siblingInfoChecked || (
          normalizeValue(vd.relationType) === normalizeValue(row.relationType) &&
          normalizeValue(vd.siblingName) === normalizeValue(row.siblingName)
        )) &&
        normalizeValue(vd.parentalStatus) === parentalStatus &&
        (parentalStatus === 'single mother' || (
          normalizeValue(vd.fatherName) === normalizeValue(row.fatherName) &&
          normalizeValue(vd.fatherContactNo) === normalizeValue(row.fatherContactNo) &&
          normalizeValue(vd.fatherQualification) === normalizeValue(row.fatherQualification) &&
          normalizeValue(vd.fatherProfession) === normalizeValue(row.fatherProfession)
        )) &&
        (parentalStatus === 'single father' || (
          normalizeValue(vd.motherName) === normalizeValue(row.motherName) &&
          normalizeValue(vd.motherContactNo) === normalizeValue(row.motherContactNo) &&
          normalizeValue(vd.motherQualification) === normalizeValue(row.motherQualification) &&
          normalizeValue(vd.motherProfession) === normalizeValue(row.motherProfession)
        )) &&
        vd.agreementChecked === true && 
        normalizeValue(vd.name) === normalizeValue(row.name) &&
        normalizeValue(vd.paymentMode) === paymentMode &&
        (paymentMode !== 'cheque' || (
          normalizeValue(vd.chequeNumber) === normalizeValue(row.chequeNumber) &&
          normalizeValue(vd.bankName) === normalizeValue(row.bankName)
        )) &&
        vd.masterDefineClass === classObj._id &&
        vd.masterDefineShift === shiftObj._id &&
        vd.section === sectionObj._id &&
        vd.selectedFeeType === feeType.id &&
        Number(vd.admissionFees || 0) === admissionFees &&
        Number(vd.concessionAmount || 0) === concessionAmount &&
        Number(vd.finalAmount || 0) === finalAmount
      );

      if (!isMatch) {
        console.log(`Row ${index + 1} validation failed:`, {
          registrationNumber: { preview: registrationNumber, validated: normalizeValue(vd.registrationNumber) },
          admissionNumber: { preview: admissionNumber, validated: normalizeValue(vd.AdmissionNumber) },
          firstName: { preview: firstName, validated: normalizeValue(vd.firstName) },
          middleName: { preview: middleName, validated: normalizeValue(vd.middleName) },
          lastName: { preview: lastName, validated: normalizeValue(vd.lastName) },
          dateOfBirth: { preview: dateOfBirth, validated: normalizeValue(vd.dateOfBirth) },
          age: { preview: normalizeValue(row.age), validated: normalizeValue(vd.age) },
          nationality: { preview: normalizeValue(row.nationality), validated: normalizeValue(vd.nationality) },
          gender: { preview: normalizeValue(row.gender), validated: normalizeValue(vd.gender) },
          bloodGroup: { preview: normalizeValue(row.bloodGroup), validated: normalizeValue(vd.bloodGroup) },
          className: { preview: className, validated: vdClassObj?.className },
          Shift: { preview: shiftName, validated: vdShiftObj?.masterDefineShiftName },
          section: { preview: sectionName, validated: vdSectionObj?.name },
          selectedFeeType: { preview: feeTypeName, validated: vdFeeType?.name },
          admissionFees: { preview: admissionFees, validated: Number(vd.admissionFees || 0) },
          concessionAmount: { preview: concessionAmount, validated: Number(vd.concessionAmount || 0) },
          finalAmount: { preview: finalAmount, validated: Number(vd.finalAmount || 0) },
          siblingInfoChecked: { preview: normalizeValue(row.siblingInfoChecked), validated: normalizeValue(vd.siblingInfoChecked) },
          parentalStatus: { preview: parentalStatus, validated: normalizeValue(vd.parentalStatus) },
          paymentMode: { preview: paymentMode, validated: normalizeValue(vd.paymentMode) },
          agreementChecked: { preview: normalizeValue(row.agreementChecked), validated: vd.agreementChecked },
        });
      }

      return isMatch;
    });

    return {
      valid: !!match,
      errors: match ? [] : ['Row data does not fully match validated data']
    };
  };

  const getDisplayValue = (row, header) => {
    if (header === 'dateOfBirth') {
      if (typeof row[header] === 'number') {
        const parsedDate = excelSerialToDate(row[header]);
        return parsedDate && !isNaN(parsedDate.getTime())
          ? parsedDate.toISOString().split('T')[0]
          : 'Invalid Date';
      }
      return row[header] ? row[header].toString().trim() : '-';
    }
    if (header === 'className') {
      const classObj = classes.find(c => normalizeValue(c.className) === normalizeValue(row[header]));
      return classObj ? classObj.className : row[header] ? capitalizeFirstLetter(row[header].toString().trim()) : '-';
    }
    if (header === 'Shift') {
      const shiftObj = shifts.find(s => normalizeValue(s.masterDefineShiftName) === normalizeValue(row[header]));
      return shiftObj ? shiftObj.masterDefineShiftName : row[header] ? capitalizeFirstLetter(row[header].toString().trim()) : '-';
    }
    if (header === 'section') {
      const classObj = classes.find(c => normalizeValue(c.className) === normalizeValue(row.className));
      const shiftObj = shifts.find(s => normalizeValue(s.masterDefineShiftName) === normalizeValue(row.Shift));
      const sectionObj = classObj?.sections.find(s => normalizeValue(s.name) === normalizeValue(row[header]) && s.shiftId === shiftObj?._id);
      return sectionObj ? sectionObj.name : row[header] ? capitalizeFirstLetter(row[header].toString().trim()) : '-';
    }
    if (header === 'siblingInfoChecked' || header === 'agreementChecked') {
      return normalizeValue(row[header]) === 'true' ? 'true' : 'false';
    }
    if (['firstName', 'middleName', 'lastName', 'nationality', 'gender', 'bloodGroup', 'currentAddress', 'country', 'state', 'city',
         'motherTongue', 'previousSchoolName', 'addressOfPreviousSchool', 'previousSchoolBoard', 'studentCategory',
         'relationType', 'siblingName', 'parentalStatus', 'fatherName', 'fatherQualification', 'fatherProfession',
         'motherName', 'motherQualification', 'motherProfession', 'selectedFeeType', 'name'].includes(header)) {
      return row[header] ? capitalizeFirstLetter(row[header].toString().trim()) : '-';
    }
    return row[header] ? row[header].toString().trim() : '-';
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
        className="custom-modal"
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
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {headers.slice(1, -2).map((header, colIndex) => (
                          <td key={colIndex}>{getDisplayValue(row, header)}</td>
                        ))}
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>{valid ? 'Row is valid for import' : errors.join(', ')}</Tooltip>}
                        >
                          <td style={{ color: valid ? 'green' : 'red', fontWeight: 'bold' }}>
                            {valid ? 'Yes' : 'No'}
                          </td>
                        </OverlayTrigger>
                        <td>{valid ? '' : errors.join(', ')}</td>
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

export default AdmissionPreviewModal;


