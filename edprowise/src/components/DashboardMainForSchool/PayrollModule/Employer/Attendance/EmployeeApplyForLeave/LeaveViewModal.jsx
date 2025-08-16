import { Modal, Button } from 'react-bootstrap';

const LeaveViewModal = ({ show, onHide, record, onStatusChange }) => {
  if (!record) return null;

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Leave Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Employee ID:</strong> {record.employeeId}</p>
        <p><strong>Leave Type:</strong> {record.leaveType}</p>
        <p><strong>Apply Date:</strong> {record.applyDate}</p>
        <p><strong>From Date:</strong> {record.fromDate}</p>
        <p><strong>To Date:</strong> {record.toDate}</p>
        <p><strong>Days:</strong> {record.numberOfDays}</p>
        <p><strong>Status:</strong> <span className={`badge bg-${record.status === 'approved' ? 'success' : record.status === 'rejected' ? 'danger' : 'warning'}`}>{record.status === "pending"? "Pending":record.status === "approved"? "Approved" : "Reject"}</span></p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          disabled={record.status === 'approved'}
          onClick={() => onStatusChange(record, 'approved')}
        >
          Approve
        </Button>
        <Button
          variant="danger"
          disabled={record.status === 'rejected'}
          onClick={() => onStatusChange(record, 'rejected')}
        >
          Reject
        </Button>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeaveViewModal
