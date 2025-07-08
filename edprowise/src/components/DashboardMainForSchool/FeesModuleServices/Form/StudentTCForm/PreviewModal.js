import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const PreviewModal = ({ show, onClose, previewData, validatedData, students, classes, feeTypesByClass }) => {
  const headers = [
    'Row',
    'AdmissionNumber',
    'firstName',
    'lastName',
    'className',
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
    const className = row.className?.toString().trim() || '';
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
      { key: 'className', value: className, label: 'Class Name' },
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

    // Validate student
    const student = students.find(s => s.AdmissionNumber?.trim() === admissionNumber);
    if (!student) {
      errors.push(`Invalid Admission Number "${admissionNumber}"`);
    }

    // Validate class
    const classObj = classes.find(c => c.className.toLowerCase() === className?.toLowerCase());
    if (!classObj) {
      errors.push(`Invalid class "${className}"`);
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

    // Validate against validatedData with debugging
    const match = validatedData.find((vd) => {
      const mismatches = [];
      const studentFirstName = student?.firstName?.trim() || '';
      const studentLastName = student?.lastName?.trim() || '';
      const expectedFirstName = firstName || studentFirstName;
      const expectedLastName = lastName || studentLastName;

      if (vd.AdmissionNumber !== admissionNumber) mismatches.push(`AdmissionNumber: ${vd.AdmissionNumber} !== ${admissionNumber}`);
      if (vd.masterDefineClass !== classObj?._id) mismatches.push(`masterDefineClass: ${vd.masterDefineClass} !== ${classObj?._id}`);
      if (Number(vd.TCfees) !== TCfees) mismatches.push(`TCfees: ${Number(vd.TCfees)} !== ${TCfees}`);
      if (Number(vd.concessionAmount) !== concessionAmount) mismatches.push(`concessionAmount: ${Number(vd.concessionAmount)} !== ${concessionAmount}`);
      if (Number(vd.finalAmount) !== finalAmount) mismatches.push(`finalAmount: ${Number(vd.finalAmount)} !== ${finalAmount}`);
      if (vd.firstName !== expectedFirstName) mismatches.push(`firstName: ${vd.firstName} !== ${expectedFirstName}`);
      if (vd.lastName !== expectedLastName) mismatches.push(`lastName: ${vd.lastName} !== ${expectedLastName}`);
      if (vd.paymentMode !== paymentMode) mismatches.push(`paymentMode: ${vd.paymentMode} !== ${paymentMode}`);
      if (vd.name !== name) mismatches.push(`name: ${vd.name} !== ${name}`);
      if (vd.agreementChecked !== true) mismatches.push(`agreementChecked: ${vd.agreementChecked} !== true`);
      if (paymentMode === 'Cheque') {
        if (vd.chequeNumber !== chequeNumber) mismatches.push(`chequeNumber: ${vd.chequeNumber} !== ${chequeNumber}`);
        if (vd.bankName !== bankName) mismatches.push(`bankName: ${vd.bankName} !== ${bankName}`);
      } else {
        if (vd.chequeNumber !== '') mismatches.push(`chequeNumber: ${vd.chequeNumber} !== ''`);
        if (vd.bankName !== '') mismatches.push(`bankName: ${vd.bankName} !== ''`);
      }

      const matches = mismatches.length === 0;
      if (!matches) {
        console.log(`Row ${index + 1} mismatches:`, mismatches);
      }

      return matches;
    });

    if (!match && errors.length === 0) {
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