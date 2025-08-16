import React from "react";
import { Modal, Button } from "react-bootstrap";

const LeaveViewModal = ({ isOpen, onClose, leave }) => {
  if (!isOpen || !leave) return null;

  const formatDate = (date) => date?.split("-").reverse().join("-");
 
  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Leave Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Leave Type:</strong> {leave.leaveType}</p>
        <p><strong>Reason:</strong> {leave.leaveReason}</p>
        <p><strong>Apply Date:</strong> {formatDate(leave.applyDate)}</p>
        <p><strong>From Date:</strong> {formatDate(leave.fromDate)}</p>
        <p><strong>To Date:</strong> {formatDate(leave.toDate)}</p>
        <p><strong>Number of Days:</strong> {leave.numberOfDays}</p>
        <p><strong>Status:</strong> {leave.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeaveViewModal;
