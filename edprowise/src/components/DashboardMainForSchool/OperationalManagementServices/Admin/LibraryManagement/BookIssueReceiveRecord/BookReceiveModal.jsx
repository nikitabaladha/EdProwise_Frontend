import React from "react";
import { Modal, Button } from "react-bootstrap";

const BookReceiveModal = ({
  isOpen,
  onClose,
  receiveData,
  setReceiveData,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiveData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={true} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Body>
        <div className="container">
          <h4 className="text-center mb-3">Receive Book</h4>
          <div className="mb-3">
            <label className="form-label">Receive Date</label>
            <input
              type="date"
              className="form-control"
              name="receiveDate"
              value={receiveData.receiveDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Received By</label>
            <input
              type="text"
              className="form-control"
              name="receiveBy"
              value={receiveData.receiveBy}
              onChange={handleChange}
              placeholder="Enter Receiver Name"
            />
          </div>
          <div className="text-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BookReceiveModal;
