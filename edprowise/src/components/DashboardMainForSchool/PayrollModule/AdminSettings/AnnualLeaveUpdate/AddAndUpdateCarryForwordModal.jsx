import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import postAPI from '../../../../../api/postAPI';
import getAPI from '../../../../../api/getAPI';
import deleteAPI from '../../../../../api/deleteAPI';
import ConfirmationDialog from '../../../../ConfirmationDialog';
const AddAndUpdateCarryForwordModal = ({
  isOpen,
  onClose,
  schoolId, 
  academicYear,
  leaveType,
}) => {
  const [mode, setMode] = useState('fixed'); 
  const [value, setValue] = useState('');
  const [maxDays, setMaxDays] = useState(0);
  const [existingSetting, setExistingSetting] = useState(null);

  useEffect(() => {
    if (leaveType?.days) {
      setMaxDays(leaveType.days);
    }
    fetchExistingSetting();
  }, [leaveType]);

  const fetchExistingSetting = async () => {
    try {
      const res = await getAPI(`/get-carryforward-conditions/${schoolId}/${leaveType._id}?academicYear=${academicYear}`);
      console.log("get res", res);
      
      if (!res.hasError && res.data.data) {
        setExistingSetting(res.data.data);
        if (res.data.data.carryForwardPercentage !== null) {
          setMode("percentage");
          setValue(res.data.data.carryForwardPercentage);
        } else {
          setMode("fixed");
          setValue(res.data.data.mandatoryExpiredLeaves);
        }
      }
    } catch (err) {
      console.error("Error fetching existing setting:", err);
    }
  };

  const handleSave = async () => {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      toast.error("Please enter a valid number");
      return;
    }

    if (mode === 'percentage') {
      if (parsed > 100) {
        toast.error("Percentage cannot be more than 100%");
        return;
      }
    } else {
      if (parsed > maxDays) {
        toast.error(`Mandatory expired leaves cannot exceed ${maxDays}`);
        return;
      }
    }

    try {
      const res = await postAPI(
        '/add-carryforward-conditions',
        {
          schoolId,
          academicYear,
          leaveTypeId: leaveType._id,
          ...(mode === 'percentage'
            ? { carryForwardPercentage: parsed }
            : { mandatoryExpiredLeaves: parsed }),
        },
        {},
        true
      );

      if (!res.hasError) {
        toast.success("Carry forward setting saved successfully");
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Error saving setting");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteAPI(
        `/carry-forward-setting/${schoolId}/${leaveType._id}?academicYear=${academicYear}`,
        {},
        true
      );
      if (!res.hasError) {
        toast.success("Setting deleted successfully");
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Failed to delete setting");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          Carry Forward Setting for {leaveType.annualLeaveTypeName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Choose Type</Form.Label>
          <div className="d-flex gap-3 mb-3">
            <Form.Check
              inline
              label="Fixed Days"
              type="radio"
              id="fixed"
              checked={mode === "fixed"}
              onChange={() => {
                setMode("fixed");
                setValue(existingSetting?.mandatoryExpiredLeaves || '');
              }}
            />
            <Form.Check
              inline
              label="Percentage"
              type="radio"
              id="percentage"
              checked={mode === "percentage"}
              onChange={() => {
                setMode("percentage");
                setValue(existingSetting?.carryForwardPercentage || '');
              }}
            />
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            {mode === "percentage" ? "Enter Percentage (%)" : `Enter Fixed Days (Max ${maxDays})`}
          </Form.Label>
          <Form.Control
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-end mt-4 gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddAndUpdateCarryForwordModal;
