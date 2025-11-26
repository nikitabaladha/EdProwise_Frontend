import React from "react";
import { Modal, Button } from "react-bootstrap";

const ExamRulesModal = ({
  show,
  handleClose,
  isChecked,
  setIsChecked,
  handleConfirm,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Exam Rules & Regulations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li> Do not use unfair means during the exam.</li>
          <li> You must complete the exam within the given time.</li>
          <li> Switching tabs or leaving the screen may auto-submit.</li>
          <li> Any malpractice will lead to disqualification.</li>
        </ul>
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="rulesCheck"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="rulesCheck">
            I understand the rules and regulations
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" disabled={!isChecked} onClick={handleConfirm}>
          Start Exam
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExamRulesModal;
