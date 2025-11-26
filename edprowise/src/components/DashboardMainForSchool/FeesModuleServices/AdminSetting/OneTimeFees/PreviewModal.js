import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const PreviewModal = ({ show, onClose, previewData, validatedData, classes, feesTypes }) => {
  return (
    <>
      <style>
        {`
          .custom-modal .modal-dialog {
            max-width: 90vw;
            margin: auto;
          }
          .custom-modal .modal-content {
            border-radius: 8px;
          }
          .custom-modal .modal-body {
            max-height: 60vh;
            overflow-y: auto;
            padding: 1rem;
          }
          .custom-modal .table-responsive {
            max-height: 50vh;
            overflow-y: auto;
            overflow-x: auto;
          }
          .custom-modal .table {
            margin-bottom: 0;
          }
          .custom-modal .table thead th {
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 1;
          }
          @media (max-width: 576px) {
            .custom-modal .modal-dialog {
              max-width: 95vw;
            }
            .custom-modal .modal-body {
              max-height: 70vh;
            }
            .custom-modal .table-responsive {
              max-height: 60vh;
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
          <Modal.Title>Excel Data Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewData.length === 0 ? (
            <p>No data to display. Please check the file and try again.</p>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Row</th>
                    <th>Class</th>
                    <th>Sections</th>
                    <th>Fees Type Name</th>
                    <th>Amount</th>
                    <th>Valid</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => {
                    const isValid = validatedData.some((vd) => {
                      // Find the class object for the row's Class
                      const classObj = classes.find(
                        (c) => c.className.toLowerCase() === String(row.Class).trim().toLowerCase()
                      );
                      if (!classObj) return false;

                      // Check sections
                      const sections = row.Sections
                        ? String(row.Sections).trim().split(',').map(s => s.trim())
                        : [];
                      const validSections = sections.every((s) =>
                        classObj.sections.some((sec) => sec.name.toLowerCase() === s.toLowerCase())
                      );
                      if (!validSections) return false;

                      // Check fees type
                      const feesType = feesTypes.find(
                        (f) => f.feesTypeName.toLowerCase() === String(row.FeesTypeName).trim().toLowerCase()
                      );
                      if (!feesType) return false;

                      // Check amount
                      const amount = Number(row.Amount);
                      if (!amount || amount <= 0) return false;

                      // Check if validatedData contains an entry matching all criteria
                      return vd.oneTimeFees.some(
                        (otf) =>
                          otf.amount === amount &&
                          otf.feesTypeId === feesType._id &&
                          vd.classId === classObj._id &&
                          sections.every((s) =>
                            vd.sectionIds.includes(
                              classObj.sections.find((sec) => sec.name.toLowerCase() === s.toLowerCase())?._id
                            )
                          )
                      );
                    });

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.Class || '-'}</td>
                        <td>{row.Sections || '-'}</td>
                        <td>{row.FeesTypeName || '-'}</td>
                        <td>{row.Amount || '-'}</td>
                        <td style={{ color: isValid ? 'green' : 'red' }}>
                          {isValid ? 'Yes' : 'No'}
                        </td>
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

export default PreviewModal;