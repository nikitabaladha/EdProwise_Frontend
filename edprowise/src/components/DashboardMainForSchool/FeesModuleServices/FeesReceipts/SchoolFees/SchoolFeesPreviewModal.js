import { Modal, Button, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

const excelSerialToDate = (serial) => {
  if (typeof serial !== 'number' || isNaN(serial) || serial < 1) {
    return null;
  }
  const excelEpoch = new Date(1900, 0, 1);
  const daysSinceEpoch = serial - 1;
  const date = new Date(excelEpoch.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
  if (serial <= 60) {
    date.setDate(date.getDate() - 1);
  }
  return date;
};

const SchoolFeesPreviewModal = ({
  show,
  onClose,
  previewData,
  validatedData,
  classes,
  feeTypes,
  sectionsByClass,
}) => {
  const headers = [
    'Row',
    'AdmissionNumber',
    'name',
    'className',
    'section',
    'paymentMode',
    'chequeNumber',
    'bankName',
    'academicYear',
    'installmentName',
    'feeTypeName',
    'paidAmount',
    'excessAmount',
    'fineAmount',
    'paymentDate',
    'Valid',
  ];

  const isRowValid = (row) => {
    const admissionNumber = row.AdmissionNumber?.toString().trim() || '';
    const className = row.className?.toString().trim() || '';
    const sectionName = row.section?.toString().trim() || '';
    const feeTypeName = row.feeTypeName?.toString().trim() || '';
    const academicYear = row.academicYear?.toString().trim() || '';
    const installmentName = row.installmentName?.toString().trim() || '';
    const paymentMode = row.paymentMode?.toString().trim() || '';
    const chequeNumber = row.chequeNumber?.toString().trim() || '';
    const bankName = row.bankName?.toString().trim() || '';
    let paymentDate = row.paymentDate?.toString().trim() || '';

    if (typeof row.paymentDate === 'number') {
      const parsedDate = excelSerialToDate(row.paymentDate);
      if (parsedDate && !isNaN(parsedDate.getTime())) {
        paymentDate = parsedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      } else {
        return false;
      }
    } else if (paymentDate.includes('-') && paymentDate.split('-')[0].length === 2) {
      const [day, month, year] = paymentDate.split('-');
      paymentDate = `${year}-${month}-${day}`;
    }

    return validatedData.some((vd) => {
      const classObj = classes.find(
        (c) => c.className.toLowerCase() === className?.toLowerCase()
      );
      const sectionObj = sectionsByClass[classObj?._id]?.find(
        (s) => s.name.toLowerCase() === sectionName?.toLowerCase()
      );
      const feeType = feeTypes.find(
        (ft) =>
          ft.feesTypeName.toLowerCase() === feeTypeName?.toLowerCase() &&
          ft.academicYear === academicYear
      );

      const vdPaymentDate = vd.paymentDate instanceof Date
        ? vd.paymentDate.toISOString().split('T')[0]
        : vd.paymentDate;

      return (
        vd.AdmissionNumber?.trim() === admissionNumber &&
        vd.masterDefineClass === classObj?._id &&
        vd.section === sectionObj?._id &&
        (vd.feesTypeId === feeType?._id || (!feeTypeName && !vd.feesTypeId)) &&
        vd.academicYear === academicYear &&
        vd.installmentName.toLowerCase() === installmentName?.toLowerCase() &&
        vd.paymentMode === paymentMode &&
        vd.chequeNumber === chequeNumber &&
        vd.bankName === bankName &&
        Number(vd.paidAmount) === Number(row.paidAmount || 0) &&
        Number(vd.excessAmount) === Number(row.excessAmount || 0) &&
        Number(vd.fineAmount) === Number(row.fineAmount || 0) &&
        vdPaymentDate === paymentDate
      );
    });
  };

  const getDisplayValue = (row, header) => {
    if (header === 'className') {
      const classObj = classes.find((c) => c._id === row.masterDefineClass);
      return classObj ? classObj.className : row.className || '-';
    }
    if (header === 'section') {
      const classObj = classes.find((c) => c._id === row.masterDefineClass);
      const sectionObj = sectionsByClass[classObj?._id]?.find((s) => s._id === row.section);
      return sectionObj ? sectionObj.name : row.section || '-';
    }
    if (header === 'feeTypeName') {
      const feeType = feeTypes.find(
        (ft) => ft._id === row.feesTypeId && ft.academicYear === row.academicYear
      );
      return feeType ? feeType.feesTypeName : row.feeTypeName || '-';
    }
    if (header === 'paymentDate') {
      if (typeof row.paymentDate === 'number') {
        const parsedDate = excelSerialToDate(row.paymentDate);
        return parsedDate && !isNaN(parsedDate.getTime())
          ? parsedDate.toISOString().split('T')[0]
          : 'Invalid Date';
      }
      let displayDate = row.paymentDate || '-';
      if (displayDate.includes('-') && displayDate.split('-')[0].length === 2) {
        const [day, month, year] = displayDate.split('-');
        displayDate = `${year}-${month}-${day}`;
      }
      return displayDate;
    }
    return row[header] !== undefined && row[header] !== '' ? row[header] : '-';
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
            border-radius: 10px;
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
          }
          .custom-modal .table {
            margin-bottom: 0;
            border-collapse: separate;
            border-spacing: 0;
          }
          .custom-modal .table thead th {
            position: sticky;
            top: 0;
            background: #e9ecef;
            z-index: 1;
            padding: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            text-align: center;
            vertical-align: middle;
            border-right: 1px solid #dee2e6;
            min-width: 100px;
          }
          .custom-modal .table tbody tr:nth-child(odd) {
            background-color: #f8f9fa;
          }
          .custom-modal .table tbody tr:hover {
            background-color: #e2e6ea;
          }
          .custom-modal .table tbody td {
            padding: 8px;
            font-size: 0.85rem;
            text-align: center;
            vertical-align: middle;
            border-right: 1px solid #dee2e6;
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
          <Modal.Title>School Fees Excel Data Preview</Modal.Title>
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
                    const valid = isRowValid(row);
                    return (
                      <tr key={index} className={valid ? 'valid-row' : 'invalid-row'}>
                        <td>{index + 1}</td>
                        {headers.slice(1, -1).map((header, colIndex) => (
                          <td key={colIndex}>{getDisplayValue(row, header)}</td>
                        ))}
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              {valid ? 'Row is valid for import' : 'Row contains errors; check validation messages'}
                            </Tooltip>
                          }
                        >
                          <td style={{ color: valid ? 'green' : 'red', fontWeight: 'bold' }}>
                            {valid ? 'Yes' : 'No'}
                          </td>
                        </OverlayTrigger>
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

export default SchoolFeesPreviewModal;