import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const LeaveEditModal = ({
  isOpen,
  onClose,
  leave,
  onSave,
  academicYear,
}) => {
  const [updatedLeave, setUpdatedLeave] = useState({ ...leave });

  useEffect(() => {
    if (leave) setUpdatedLeave({ ...leave });
  }, [leave]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedLeave((prev) => ({ ...prev, [name]: value }));

    if (name === "fromDate" || name === "toDate") {
      const from = new Date(name === "fromDate" ? value : updatedLeave.fromDate);
      const to = new Date(name === "toDate" ? value : updatedLeave.toDate);
      const days = (to - from) / (1000 * 60 * 60 * 24) + 1;
      setUpdatedLeave((prev) => ({ ...prev, numberOfDays: days > 0 ? days : 0 }));
    }
  };

  const handleSubmit = () => {
    onSave(updatedLeave);
  };

  if (!isOpen || !updatedLeave) return null;

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Leave</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-2">
          <label>Leave Type</label>
          <input
            type="text"
            name="leaveType"
            value={updatedLeave.leaveType}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label>Reason</label>
          <input
            type="text"
            name="leaveReason"
            value={updatedLeave.leaveReason}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label>From Date</label>
          <input
            type="date"
            name="fromDate"
            value={updatedLeave.fromDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label>To Date</label>
          <input
            type="date"
            name="toDate"
            value={updatedLeave.toDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label>No. of Days</label>
          <input
            type="text"
            value={updatedLeave.numberOfDays}
            className="form-control"
            readOnly
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LeaveEditModal;
