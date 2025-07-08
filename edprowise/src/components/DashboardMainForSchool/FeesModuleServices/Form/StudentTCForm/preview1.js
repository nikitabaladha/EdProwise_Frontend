// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';

// const excelSerialToDate = (serial) => {
//   if (typeof serial !== 'number' || isNaN(serial) || serial < 1) {
//     return null; 
//   }
//   const excelEpoch = new Date(1900, 0, 1); 
//   const daysSinceEpoch = serial - 1; 
//   const date = new Date(excelEpoch.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
//   if (serial <= 60) {
//     date.setDate(date.getDate() - 1); 
//   }
//   return date;
// };

// const PreviewModal = ({ show, onClose, previewData, validatedData, students, classes, feeTypesByClass }) => {
//   const headers = [
//     'Row',
//     'AdmissionNumber',
//     'firstName',
//     'middleName',
//     'lastName',
//     'dateOfBirth',
//     'nationality',
//     'fatherName',
//     'motherName',
//     'dateOfIssue',
//     'dateOfAdmission',
//     'className',
//     'percentageObtainInLastExam',
//     'qualifiedPromotionInHigherClass',
//     'whetherFaildInAnyClass',
//     'anyOutstandingDues',
//     'moralBehaviour',
//     'dateOfLastAttendanceAtSchool',
//     'reasonForLeaving',
//     'anyRemarks',
//     'selectedFeeType',
//     'TCfees',
//     'concessionAmount',
//     'finalAmount',
//     'name',
//     'paymentMode',
//     'chequeNumber',
//     'bankName',
//     'agreementChecked',
//     'Valid'
//   ];

//   const getDisplayValue = (row, header) => {
//     if (['dateOfBirth', 'dateOfIssue', 'dateOfAdmission', 'dateOfLastAttendanceAtSchool'].includes(header)) {
//       if (typeof row[header] === 'number') {
//         const parsedDate = excelSerialToDate(row[header]);
//         return parsedDate && !isNaN(parsedDate.getTime())
//           ? parsedDate.toISOString().split('T')[0]
//           : 'Invalid Date';
//       }
//     }
//     return row[header] !== undefined && row[header] !== '' ? row[header] : '-';
//   };

//   const isRowValid = (row) => {
//     const admissionNumber = row.AdmissionNumber?.toString().trim();
//     const className = row.className?.toString().trim();
//     const feeTypeName = row.selectedFeeType?.toString().trim();
//     let dateOfBirth = row.dateOfBirth;
//     let dateOfIssue = row.dateOfIssue;
//     let dateOfAdmission = row.dateOfAdmission;
//     let dateOfLastAttendanceAtSchool = row.dateOfLastAttendanceAtSchool;

//     // Convert date fields if they are serial numbers
//     if (typeof dateOfBirth === 'number') {
//       const parsedDate = excelSerialToDate(dateOfBirth);
//       dateOfBirth = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }
//     if (typeof dateOfIssue === 'number') {
//       const parsedDate = excelSerialToDate(dateOfIssue);
//       dateOfIssue = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }
//     if (typeof dateOfAdmission === 'number') {
//       const parsedDate = excelSerialToDate(dateOfAdmission);
//       dateOfAdmission = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }
//     if (typeof dateOfLastAttendanceAtSchool === 'number') {
//       const parsedDate = excelSerialToDate(dateOfLastAttendanceAtSchool);
//       dateOfLastAttendanceAtSchool = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }

//     const classObj = classes.find(c => c.className.toLowerCase() === className?.toLowerCase());
//     const feeType = classObj && feeTypesByClass[classObj._id]?.find(ft => ft.name.toLowerCase() === feeTypeName?.toLowerCase());

//     if (!classObj || !feeType || !dateOfBirth || !dateOfIssue || !dateOfAdmission || !dateOfLastAttendanceAtSchool) {
//       return false;
//     }

//     const isValid = validatedData.some((vd) => {
//       const matches = (
//         vd.AdmissionNumber === admissionNumber &&
//         vd.masterDefineClass === classObj._id &&
//         vd.dateOfBirth === dateOfBirth &&
//         vd.dateOfIssue === dateOfIssue &&
//         vd.dateOfAdmission === dateOfAdmission &&
//         vd.dateOfLastAttendanceAtSchool === dateOfLastAttendanceAtSchool &&
//         Number(vd.TCfees) === Number(row.TCfees) &&
//         Number(vd.concessionAmount) === Number(row.concessionAmount) &&
//         Number(vd.finalAmount) === Number(row.finalAmount) &&
//         vd.firstName === (row.firstName?.toString().trim() || students.find(s => s.AdmissionNumber === admissionNumber)?.firstName) &&
//         vd.lastName === (row.lastName?.toString().trim() || students.find(s => s.AdmissionNumber === admissionNumber)?.lastName) &&
//         vd.fatherName === (row.fatherName?.toString().trim() || students.find(s => s.AdmissionNumber === admissionNumber)?.fatherName) &&
//         vd.motherName === (row.motherName?.toString().trim() || students.find(s => s.AdmissionNumber === admissionNumber)?.motherName) &&
//         vd.nationality === (row.nationality?.toString().trim() || students.find(s => s.AdmissionNumber === admissionNumber)?.nationality || '') &&
//         vd.paymentMode === row.paymentMode?.toString().trim() &&
//         vd.name === row.name?.toString().trim() &&
//         vd.agreementChecked.toString() === row.agreementChecked?.toString().trim()
//       );
//       return matches;
//     });

//     console.log(`Row ${admissionNumber} isValid: ${isValid}`);
//     return isValid;
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
//           }
//           .custom-modal .modal-body {
//             max-height: 60vh;
//             overflow-y: auto;
//             padding: 1rem;
//           }
//           .custom-modal .table-responsive {
//             max-height: 50vh;
//             overflow-y: auto;
//             overflow-x: auto;
//           }
//           .custom-modal .table {
//             margin-bottom: 0;
//             white-space: nowrap;
//           }
//           .custom-modal .table thead th {
//             position: sticky;
//             top: 0;
//             background: #fff;
//             z-index: 1;
//             padding: 6px;
//             font-size: 0.85rem;
//             text-align: center;
//             vertical-align: middle;
//           }
//           .custom-modal .table tbody td {
//             padding: 6px;
//             font-size: 0.85rem;
//             text-align: center;
//             vertical-align: middle;
//           }
//           @media (max-width: 576px) {
//             .custom-modal .modal-dialog {
//               max-width: 98vw;
//             }
//             .custom-modal .modal-body {
//               max-height: 70vh;
//             }
//             .custom-modal .table-responsive {
//               max-height: 60vh;
//             }
//             .custom-modal .table thead th,
//             .custom-modal .table tbody td {
//               font-size: 0.75rem;
//               padding: 4px;
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
//           <Modal.Title>Excel Data Preview</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {previewData.length === 0 ? (
//             <p>No data to display. Please check the file and try again.</p>
//           ) : (
//             <div className="table-responsive">
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     {headers.map((header, index) => (
//                       <th key={index}>{header}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {previewData.map((row, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       {headers.slice(1, -1).map((header, colIndex) => (
//                         <td key={colIndex}>
//                           {getDisplayValue(row, header)}
//                         </td>
//                       ))}
//                       <td style={{ color: isRowValid(row) ? 'green' : 'red' }}>
//                         {isRowValid(row) ? 'Yes' : 'No'}
//                       </td>
//                     </tr>
//                   ))}
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

// export default PreviewModal;

// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';

// const excelSerialToDate = (serial) => {
//   if (typeof serial !== 'number' || isNaN(serial) || serial < 1) {
//     return null;
//   }
//   const excelEpoch = new Date(1900, 0, 1);
//   const daysSinceEpoch = serial - 1;
//   const date = new Date(excelEpoch.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
//   if (serial <= 60) {
//     date.setDate(date.getDate() - 1);
//   }
//   return date;
// };

// const PreviewModal = ({ show, onClose, previewData, validatedData, students, classes, feeTypesByClass }) => {
//   const headers = [
//     'Row',
//     'AdmissionNumber',
//     'firstName',
//     'middleName',
//     'lastName',
//     'dateOfBirth',
//     'nationality',
//     'fatherName',
//     'motherName',
//     'dateOfIssue',
//     'dateOfAdmission',
//     'className',
//     'percentageObtainInLastExam',
//     'qualifiedPromotionInHigherClass',
//     'whetherFaildInAnyClass',
//     'anyOutstandingDues',
//     'moralBehaviour',
//     'dateOfLastAttendanceAtSchool',
//     'reasonForLeaving',
//     'anyRemarks',
//     'selectedFeeType',
//     'TCfees',
//     'concessionAmount',
//     'finalAmount',
//     'name',
//     'paymentMode',
//     'chequeNumber',
//     'bankName',
//     'Valid'
//   ];

//   const getDisplayValue = (row, header) => {
//     if (['dateOfBirth', 'dateOfIssue', 'dateOfAdmission', 'dateOfLastAttendanceAtSchool'].includes(header)) {
//       if (typeof row[header] === 'number') {
//         const parsedDate = excelSerialToDate(row[header]);
//         return parsedDate && !isNaN(parsedDate.getTime())
//           ? parsedDate.toISOString().split('T')[0]
//           : 'Invalid Date';
//       }
//     }
//     return row[header] !== undefined && row[header] !== '' ? row[header] : '-';
//   };

//   const isRowValid = (row, index) => {
//     const admissionNumber = row.AdmissionNumber?.toString().trim();
//     const className = row.className?.toString().trim();
//     const feeTypeName = row.selectedFeeType?.toString().trim();
//     let dateOfBirth = row.dateOfBirth;
//     let dateOfIssue = row.dateOfIssue;
//     let dateOfAdmission = row.dateOfAdmission;
//     let dateOfLastAttendanceAtSchool = row.dateOfLastAttendanceAtSchool;


//     if (typeof dateOfBirth === 'number') {
//       const parsedDate = excelSerialToDate(dateOfBirth);
//       dateOfBirth = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }
//     if (typeof dateOfIssue === 'number') {
//       const parsedDate = excelSerialToDate(dateOfIssue);
//       dateOfIssue = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }
//     if (typeof dateOfAdmission === 'number') {
//       const parsedDate = excelSerialToDate(dateOfAdmission);
//       dateOfAdmission = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }
//     if (typeof dateOfLastAttendanceAtSchool === 'number') {
//       const parsedDate = excelSerialToDate(dateOfLastAttendanceAtSchool);
//       dateOfLastAttendanceAtSchool = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }

//     const classObj = classes.find(c => c.className.toLowerCase() === className?.toLowerCase());
//     const feeType = classObj && feeTypesByClass[classObj._id]?.find(ft => ft.name.toLowerCase() === feeTypeName?.toLowerCase());

//     // Basic checks for required fields and valid references
//     if (!classObj || !feeType || !dateOfBirth || !dateOfIssue || !dateOfAdmission || !dateOfLastAttendanceAtSchool) {
//       return false;
//     }

//     const student = students.find(s => s.AdmissionNumber.trim() === admissionNumber);

//     const isValid = validatedData.some((vd) => {
//       const matches = (
//         vd.AdmissionNumber === admissionNumber &&
//         vd.masterDefineClass === classObj._id &&
//         vd.dateOfBirth === dateOfBirth &&
//         vd.dateOfIssue === dateOfIssue &&
//         vd.dateOfAdmission === dateOfAdmission &&
//         vd.dateOfLastAttendanceAtSchool === dateOfLastAttendanceAtSchool &&
//         Number(vd.TCfees) === Number(row.TCfees || 0) &&
//         Number(vd.concessionAmount) === Number(row.concessionAmount || 0) &&
//         Number(vd.finalAmount) === Number(row.finalAmount || 0) &&
//         vd.firstName === (row.firstName?.toString().trim() || student?.firstName || '') &&
//         vd.lastName === (row.lastName?.toString().trim() || student?.lastName || '') &&
//         vd.fatherName === (row.fatherName?.toString().trim() || student?.fatherName || '') &&
//         vd.motherName === (row.motherName?.toString().trim() || student?.motherName || '') &&
//         vd.nationality === (row.nationality?.toString().trim() || student?.nationality || '') &&
//         vd.paymentMode === (row.paymentMode?.toString().trim() || '') &&
//         vd.name === (row.name?.toString().trim() || '') &&
//         vd.agreementChecked === true // Hard-coded to true in processExcelData
//       );
//       if (!matches) {
//         console.log(`Row ${index + 1} (${admissionNumber}) failed validation:`, {
//           admissionNumber: { vd: vd.AdmissionNumber, row: admissionNumber },
//           masterDefineClass: { vd: vd.masterDefineClass, row: classObj?._id },
//           dateOfBirth: { vd: vd.dateOfBirth, row: dateOfBirth },
//           dateOfIssue: { vd: vd.dateOfIssue, row: dateOfIssue },
//           dateOfAdmission: { vd: vd.dateOfAdmission, row: dateOfAdmission },
//           dateOfLastAttendance: { vd: vd.dateOfLastAttendanceAtSchool, row: dateOfLastAttendanceAtSchool },
//           TCfees: { vd: Number(vd.TCfees), row: Number(row.TCfees || 0) },
//           concessionAmount: { vd: Number(vd.concessionAmount), row: Number(row.concessionAmount || 0) },
//           finalAmount: { vd: Number(vd.finalAmount), row: Number(row.finalAmount || 0) },
//           firstName: { vd: vd.firstName, row: row.firstName?.toString().trim() || student?.firstName || '' },
//           lastName: { vd: vd.lastName, row: row.lastName?.toString().trim() || student?.lastName || '' },
//           fatherName: { vd: vd.fatherName, row: row.fatherName?.toString().trim() || student?.fatherName || '' },
//           motherName: { vd: vd.motherName, row: row.motherName?.toString().trim() || student?.motherName || '' },
//           nationality: { vd: vd.nationality, row: row.nationality?.toString().trim() || student?.nationality || '' },
//           paymentMode: { vd: vd.paymentMode, row: row.paymentMode?.toString().trim() || '' },
//           name: { vd: vd.name, row: row.name?.toString().trim() || '' },
//           agreementChecked: { vd: vd.agreementChecked, row: 'true (hard-coded)' }
//         });
//       }
//       return matches;
//     });

//     console.log(`Row ${index + 1} (${admissionNumber}) isValid: ${isValid}`);
//     return isValid;
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
//           }
//           .custom-modal .modal-body {
//             max-height: 60vh;
//             overflow-y: auto;
//             padding: 1rem;
//           }
//           .custom-modal .table-responsive {
//             max-height: 50vh;
//             overflow-y: auto;
//             overflow-x: auto;
//           }
//           .custom-modal .table {
//             margin-bottom: 0;
//             white-space: nowrap;
//           }
//           .custom-modal .table thead th {
//             position: sticky;
//             top: 0;
//             background: #fff;
//             z-index: 1;
//             padding: 6px;
//             font-size: 0.85rem;
//             text-align: center;
//             vertical-align: middle;
//           }
//           .custom-modal .table tbody td {
//             padding: 6px;
//             font-size: 0.85rem;
//             text-align: center;
//             vertical-align: middle;
//           }
//           @media (max-width: 576px) {
//             .custom-modal .modal-dialog {
//               max-width: 98vw;
//             }
//             .custom-modal .modal-body {
//               max-height: 70vh;
//             }
//             .custom-modal .table-responsive {
//               max-height: 60vh;
//             }
//             .custom-modal .table thead th,
//             .custom-modal .table tbody td {
//               font-size: 0.75rem;
//               padding: 4px;
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
//           <Modal.Title>Excel Data Preview</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {previewData.length === 0 ? (
//             <p>No data to display. Please check the file and try again.</p>
//           ) : (
//             <div className="table-responsive">
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     {headers.map((header, index) => (
//                       <th key={index}>{header}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {previewData.map((row, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       {headers.slice(1, -1).map((header, colIndex) => (
//                         <td key={colIndex}>
//                           {getDisplayValue(row, header)}
//                         </td>
//                       ))}
//                       <td style={{ color: isRowValid(row, index) ? 'green' : 'red' }}>
//                         {isRowValid(row, index) ? 'Yes' : 'No'}
//                       </td>
//                     </tr>
//                   ))}
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

// export default PreviewModal;

// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';

// const excelSerialToDate = (serial) => {
//   if (typeof serial !== 'number' || isNaN(serial) || serial < 1) {
//     return null;
//   }
//   const excelEpoch = new Date(1900, 0, 1);
//   const daysSinceEpoch = serial - 1;
//   const date = new Date(excelEpoch.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
//   if (serial <= 60) {
//     date.setDate(date.getDate() - 1);
//   }
//   return date;
// };

// const PreviewModal = ({ show, onClose, previewData, validatedData, students, classes, feeTypesByClass }) => {
//   const headers = [
//     'Row',
//     'AdmissionNumber',
//     'firstName',
//     'middleName',
//     'lastName',
//     'dateOfBirth',
//     'nationality',
//     'fatherName',
//     'motherName',
//     'dateOfIssue',
//     'dateOfAdmission',
//     'className',
//     'percentageObtainInLastExam',
//     'qualifiedPromotionInHigherClass',
//     'whetherFaildInAnyClass',
//     'anyOutstandingDues',
//     'moralBehaviour',
//     'dateOfLastAttendanceAtSchool',
//     'reasonForLeaving',
//     'anyRemarks',
//     'selectedFeeType',
//     'TCfees',
//     'concessionAmount',
//     'finalAmount',
//     'name',
//     'paymentMode',
//     'chequeNumber',
//     'bankName',
//     'Valid',
//     'Remark',
//   ];

//   const getDisplayValue = (row, header) => {
//     if (['dateOfBirth', 'dateOfIssue', 'dateOfAdmission', 'dateOfLastAttendanceAtSchool'].includes(header)) {
//       if (typeof row[header] === 'number') {
//         const parsedDate = excelSerialToDate(row[header]);
//         return parsedDate && !isNaN(parsedDate.getTime())
//           ? parsedDate.toISOString().split('T')[0]
//           : 'Invalid Date';
//       }
//     }
//     return row[header] !== undefined && row[header] !== '' ? row[header] : '-';
//   };

//   const isRowValid = (row, index) => {
//     const errors = [];
//     const admissionNumber = row.AdmissionNumber?.toString().trim() || '';
//     const firstName = row.firstName?.toString().trim() || '';
//     const lastName = row.lastName?.toString().trim() || '';
//     const nationality = row.nationality?.toString().trim() || '';
//     const fatherName = row.fatherName?.toString().trim() || '';
//     const motherName = row.motherName?.toString().trim() || '';
//     const className = row.className?.toString().trim() || '';
//     const selectedFeeType = row.selectedFeeType?.toString().trim() || '';
//     const TCfees = Number(row.TCfees) || 0;
//     const concessionAmount = Number(row.concessionAmount) || 0;
//     const finalAmount = Number(row.finalAmount) || 0;
//     const name = row.name?.toString().trim() || '';
//     const paymentMode = row.paymentMode?.toString().trim() || '';
//     const chequeNumber = row.chequeNumber?.toString().trim() || '';
//     const bankName = row.bankName?.toString().trim() || '';
//     const percentageObtainInLastExam = Number(row.percentageObtainInLastExam) || 0;
//     const qualifiedPromotionInHigherClass = row.qualifiedPromotionInHigherClass?.toString().trim() || '';
//     const whetherFaildInAnyClass = row.whetherFaildInAnyClass?.toString().trim() || '';
//     const anyOutstandingDues = row.anyOutstandingDues?.toString().trim() || '';
//     const moralBehaviour = row.moralBehaviour?.toString().trim() || '';
//     const reasonForLeaving = row.reasonForLeaving?.toString().trim() || '';

//     let dateOfBirth = row.dateOfBirth;
//     let dateOfIssue = row.dateOfIssue;
//     let dateOfAdmission = row.dateOfAdmission;
//     let dateOfLastAttendanceAtSchool = row.dateOfLastAttendanceAtSchool;

//     // Convert Excel serial dates to ISO format
//     if (typeof dateOfBirth === 'number') {
//       const parsedDate = excelSerialToDate(dateOfBirth);
//       dateOfBirth = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }
//     if (typeof dateOfIssue === 'number') {
//       const parsedDate = excelSerialToDate(dateOfIssue);
//       dateOfIssue = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }
//     if (typeof dateOfAdmission === 'number') {
//       const parsedDate = excelSerialToDate(dateOfAdmission);
//       dateOfAdmission = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }
//     if (typeof dateOfLastAttendanceAtSchool === 'number') {
//       const parsedDate = excelSerialToDate(dateOfLastAttendanceAtSchool);
//       dateOfLastAttendanceAtSchool = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate.toISOString().split('T')[0] : null;
//     }

//     // Validate required fields
//     const requiredFields = [
//       { key: 'AdmissionNumber', value: admissionNumber, label: 'Admission Number' },
//       { key: 'firstName', value: firstName, label: 'First Name' },
//       { key: 'lastName', value: lastName, label: 'Last Name' },
//       { key: 'nationality', value: nationality, label: 'Nationality' },
//       { key: 'fatherName', value: fatherName, label: 'Father Name' },
//       { key: 'motherName', value: motherName, label: 'Mother Name' },
//       { key: 'className', value: className, label: 'Class Name' },
//       { key: 'selectedFeeType', value: selectedFeeType, label: 'Fee Type' },
//       { key: 'TCfees', value: TCfees, label: 'TC Fees' },
//       { key: 'finalAmount', value: finalAmount, label: 'Final Amount' },
//       { key: 'name', value: name, label: 'Name of Person Filling the Form' },
//       { key: 'paymentMode', value: paymentMode, label: 'Payment Mode' },
//       { key: 'dateOfBirth', value: dateOfBirth, label: 'Date of Birth' },
//       { key: 'dateOfIssue', value: dateOfIssue, label: 'Date of Issue' },
//       { key: 'dateOfAdmission', value: dateOfAdmission, label: 'Date of Admission' },
//       { key: 'dateOfLastAttendanceAtSchool', value: dateOfLastAttendanceAtSchool, label: 'Date of Last Attendance' },
//       { key: 'reasonForLeaving', value: reasonForLeaving, label: 'Reason for Leaving' },
//     ];

//     requiredFields.forEach((field) => {
//       if (!field.value) {
//         errors.push(`${field.label} is required`);
//       }
//     });

//     // Validate class
//     const classObj = classes.find(c => c.className.toLowerCase() === className?.toLowerCase());
//     if (!classObj) {
//       errors.push(`Invalid class "${className}"`);
//     }

//     // Validate fee type
//     const feeType = classObj && feeTypesByClass[classObj._id]?.find(ft => ft.name.toLowerCase() === selectedFeeType?.toLowerCase());
//     if (!feeType) {
//       errors.push(`Invalid fee type "${selectedFeeType}"`);
//     }

//     // Validate student
//     const student = students.find(s => s.AdmissionNumber?.trim() === admissionNumber);
//     if (!student) {
//       errors.push(`Invalid Admission Number "${admissionNumber}"`);
//     }

//     // Validate numeric fields
//     if (TCfees <= 0 || (feeType && TCfees !== feeType.amount)) {
//       errors.push(`TC Fees must match the fee type amount (${feeType ? feeType.amount : 'unknown'})`);
//     }
//     if (concessionAmount < 0 || concessionAmount > TCfees) {
//       errors.push(`Concession Amount must be between 0 and TC Fees (${TCfees})`);
//     }
//     if (finalAmount !== TCfees - concessionAmount) {
//       errors.push(`Final Amount must be TC Fees (${TCfees}) minus Concession (${concessionAmount})`);
//     }

//     // Validate payment mode
//     if (!['Cash', 'Cheque', 'Online'].includes(paymentMode)) {
//       errors.push(`Invalid Payment Mode "${paymentMode}". Must be one of: Cash, Cheque, Online`);
//     }

//     // Validate cheque fields if payment mode is Cheque
//     if (paymentMode === 'Cheque') {
//       if (!chequeNumber) errors.push('Cheque Number is required for Cheque payment mode');
//       if (!bankName) errors.push('Bank Name is required for Cheque payment mode');
//     }

//     // Validate nationality
//     if (!['India', 'International', 'SAARC Countries'].includes(nationality)) {
//       errors.push(`Invalid Nationality "${nationality}". Must be one of: India, International, SAARC Countries`);
//     }

//     // Validate percentage
//     if (percentageObtainInLastExam < 0 || percentageObtainInLastExam > 100) {
//       errors.push('Percentage Obtained in Last Exam must be between 0 and 100');
//     }

//     // Validate boolean-like fields
//     if (!['Yes', 'No'].includes(qualifiedPromotionInHigherClass)) {
//       errors.push(`Invalid Qualified for Promotion "${qualifiedPromotionInHigherClass}". Must be Yes or No`);
//     }
//     if (!['Yes', 'No'].includes(whetherFaildInAnyClass)) {
//       errors.push(`Invalid Whether Failed in Any Class "${whetherFaildInAnyClass}". Must be Yes or No`);
//     }
//     if (!['Yes', 'No'].includes(anyOutstandingDues)) {
//       errors.push(`Invalid Any Outstanding Dues "${anyOutstandingDues}". Must be Yes or No`);
//     }

//     // Validate moral behaviour
//     if (!['Good', 'Satisfactory', 'Needs Improvement'].includes(moralBehaviour)) {
//       errors.push(`Invalid Moral Behaviour "${moralBehaviour}". Must be one of: Good, Satisfactory, Needs Improvement`);
//     }

//     // Validate dates
//     const today = new Date();
//     const dateFields = [
//       { key: 'dateOfBirth', value: dateOfBirth, label: 'Date of Birth' },
//       { key: 'dateOfIssue', value: dateOfIssue, label: 'Date of Issue' },
//       { key: 'dateOfAdmission', value: dateOfAdmission, label: 'Date of Admission' },
//       { key: 'dateOfLastAttendanceAtSchool', value: dateOfLastAttendanceAtSchool, label: 'Date of Last Attendance' },
//     ];

//     dateFields.forEach((field) => {
//       if (!field.value || isNaN(new Date(field.value).getTime())) {
//         errors.push(`Invalid ${field.label} format. Use YYYY-MM-DD`);
//       } else {
//         const date = new Date(field.value);
//         if (date > today) {
//           errors.push(`${field.label} cannot be in the future`);
//         }
//       }
//     });

//     // Validate date relationships
//     if (dateOfBirth && dateOfAdmission && !isNaN(new Date(dateOfBirth).getTime()) && !isNaN(new Date(dateOfAdmission).getTime())) {
//       if (new Date(dateOfBirth) >= new Date(dateOfAdmission)) {
//         errors.push('Date of Birth must be before Date of Admission');
//       }
//     }
//     if (dateOfAdmission && dateOfLastAttendanceAtSchool && !isNaN(new Date(dateOfAdmission).getTime()) && !isNaN(new Date(dateOfLastAttendanceAtSchool).getTime())) {
//       if (new Date(dateOfAdmission) > new Date(dateOfLastAttendanceAtSchool)) {
//         errors.push('Date of Admission must be on or before Date of Last Attendance');
//       }
//     }
//     if (dateOfIssue && dateOfLastAttendanceAtSchool && !isNaN(new Date(dateOfIssue).getTime()) && !isNaN(new Date(dateOfLastAttendanceAtSchool).getTime())) {
//       if (new Date(dateOfIssue) < new Date(dateOfLastAttendanceAtSchool)) {
//         errors.push('Date of Issue must be on or after Date of Last Attendance');
//       }
//     }

//     // Validate against validatedData
//     const match = validatedData.find((vd) => {
//       const matches = (
//         vd.AdmissionNumber === admissionNumber &&
//         vd.masterDefineClass === classObj?._id &&
//         vd.dateOfBirth === dateOfBirth &&
//         vd.dateOfIssue === dateOfIssue &&
//         vd.dateOfAdmission === dateOfAdmission &&
//         vd.dateOfLastAttendanceAtSchool === dateOfLastAttendanceAtSchool &&
//         Number(vd.TCfees) === TCfees &&
//         Number(vd.concessionAmount) === concessionAmount &&
//         Number(vd.finalAmount) === finalAmount &&
//         vd.firstName === (firstName || student?.firstName || '') &&
//         vd.lastName === (lastName || student?.lastName || '') &&
//         vd.fatherName === (fatherName || student?.fatherName || '') &&
//         vd.motherName === (motherName || student?.motherName || '') &&
//         vd.nationality === (nationality || student?.nationality || '') &&
//         vd.paymentMode === paymentMode &&
//         vd.name === name &&
//         vd.agreementChecked === true
//       );
//       return matches;
//     });

//     if (!match) {
//       errors.push('Row data does not match validated data');
//     }

//     return {
//       valid: errors.length === 0,
//       errors,
//     };
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
//           <Modal.Title>Excel Data Preview</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {previewData.length === 0 ? (
//             <p>No data to display. Please check the file and try again.</p>
//           ) : (
//             <div className="table-responsive">
//               <Table striped bordered hover>
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
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         {headers.slice(1, -2).map((header, colIndex) => (
//                           <td key={colIndex}>{getDisplayValue(row, header)}</td>
//                         ))}
//                         <td className={valid ? 'valid-cell' : 'invalid-cell'}>
//                           {valid ? 'Yes' : 'No'}
//                         </td>
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

// export default PreviewModal;

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const PreviewModal = ({ show, onClose, previewData, validatedData, students, classes, feeTypesByClass }) => {
  const headers = [
    'Row',
    'AdmissionNumber',
    'firstName',
    'lastName',
    'selectedFeeType',
    'TCfees',
    'concessionAmount',
    'finalAmount',
    'name',
    'paymentMode',
    'chequeNumber',
    'bankName',
    'Valid',
    'Remark',
  ];

  const getDisplayValue = (row, header) => {
    return row[header] !== undefined && row[header] !== '' ? row[header] : '-';
  };

  const isRowValid = (row, index) => {
    const errors = [];
    const admissionNumber = row.AdmissionNumber?.toString().trim() || '';
    const firstName = row.firstName?.toString().trim() || '';
    const lastName = row.lastName?.toString().trim() || '';
    const selectedFeeType = row.selectedFeeType?.toString().trim() || '';
    const TCfees = Number(row.TCfees) || 0;
    const concessionAmount = Number(row.concessionAmount) || 0;
    const finalAmount = Number(row.finalAmount) || 0;
    const name = row.name?.toString().trim() || '';
    const paymentMode = row.paymentMode?.toString().trim() || '';
    const chequeNumber = row.chequeNumber?.toString().trim() || '';
    const bankName = row.bankName?.toString().trim() || '';

    // Validate required fields
    const requiredFields = [
      { key: 'AdmissionNumber', value: admissionNumber, label: 'Admission Number' },
      { key: 'firstName', value: firstName, label: 'First Name' },
      { key: 'lastName', value: lastName, label: 'Last Name' },
      { key: 'selectedFeeType', value: selectedFeeType, label: 'Fee Type' },
      { key: 'TCfees', value: TCfees, label: 'TC Fees' },
      { key: 'finalAmount', value: finalAmount, label: 'Final Amount' },
      { key: 'name', value: name, label: 'Name of Person Filling the Form' },
      { key: 'paymentMode', value: paymentMode, label: 'Payment Mode' },
    ];

    requiredFields.forEach((field) => {
      if (!field.value) {
        errors.push(`${field.label} is required`);
      }
    });

    // Validate student and derive class
    const student = students.find(s => s.AdmissionNumber?.trim() === admissionNumber);
    if (!student) {
      errors.push(`Invalid Admission Number "${admissionNumber}"`);
    }

    const classObj = student ? classes.find(c => c._id === student.masterDefineClass) : null;
    if (!classObj) {
      errors.push(`No class found for student with Admission Number "${admissionNumber}"`);
    }

    // Validate fee type
    const feeType = classObj && feeTypesByClass[classObj._id]?.find(ft => ft.name.toLowerCase() === selectedFeeType?.toLowerCase());
    if (!feeType) {
      errors.push(`Invalid fee type "${selectedFeeType}"`);
    }

    // Validate numeric fields
    if (TCfees <= 0 || (feeType && TCfees !== feeType.amount)) {
      errors.push(`TC Fees must match the fee type amount (${feeType ? feeType.amount : 'unknown'})`);
    }
    if (concessionAmount < 0 || concessionAmount > TCfees) {
      errors.push(`Concession Amount must be between 0 and TC Fees (${TCfees})`);
    }
    if (finalAmount !== TCfees - concessionAmount) {
      errors.push(`Final Amount must be TC Fees (${TCfees}) minus Concession (${concessionAmount})`);
    }

    // Validate payment mode
    if (!['Cash', 'Cheque', 'Online'].includes(paymentMode)) {
      errors.push(`Invalid Payment Mode "${paymentMode}". Must be one of: Cash, Cheque, Online`);
    }

    // Validate cheque fields if payment mode is Cheque
    if (paymentMode === 'Cheque') {
      if (!chequeNumber) errors.push('Cheque Number is required for Cheque payment mode');
      if (!bankName) errors.push('Bank Name is required for Cheque payment mode');
    }

    // Validate against validatedData
    const match = validatedData.find((vd) => {
      const matches = (
        vd.AdmissionNumber === admissionNumber &&
        vd.masterDefineClass === classObj?._id &&
        Number(vd.TCfees) === TCfees &&
        Number(vd.concessionAmount) === concessionAmount &&
        Number(vd.finalAmount) === finalAmount &&
        vd.firstName === (firstName || student?.firstName || '') &&
        vd.lastName === (lastName || student?.lastName || '') &&
        vd.paymentMode === paymentMode &&
        vd.name === name &&
        (paymentMode === 'Cheque' ? (vd.chequeNumber === chequeNumber && vd.bankName === bankName) : (vd.chequeNumber === '' && vd.bankName === ''))
      );
      return matches;
    });

    if (!match) {
      errors.push('Row data does not match validated data');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  return (
    <>
      <style>
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
          <Modal.Title>Preview Excel Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
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
                      <td className={valid ? 'valid-cell' : 'invalid-cell'}>
                        {valid ? 'Yes' : 'No'}
                      </td>
                      <td className="remark-cell" title={errors.join('; ')}>
                        {errors.length > 0 ? errors.join('; ') : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
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

export default PreviewModal;