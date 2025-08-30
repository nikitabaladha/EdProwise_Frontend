import React, { useState, useEffect } from "react";
import putAPI from "../../../../../api/putAPI";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UpdateYearModal = ({ isOpen, onClose, academicYear, onUpdateSuccess }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset values whenever academicYear changes
  useEffect(() => {
    if (academicYear) {
      setStartDate(
        academicYear.startDate
          ? new Date(academicYear.startDate).toISOString().split("T")[0]
          : ""
      );
      setEndDate(
        academicYear.endDate
          ? new Date(academicYear.endDate).toISOString().split("T")[0]
          : ""
      );
    }
  }, [academicYear]);

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      toast.error("Please provide both start and end dates.");
      return;
    }

    const [startYear, endYear] = academicYear.academicYear
      .split("-")
      .map(Number);

    if (new Date(startDate).getFullYear() !== startYear) {
      toast.error(`Start date must be in the year ${startYear}.`);
      return;
    }
    if (new Date(endDate).getFullYear() !== endYear) {
      toast.error(`End date must be in the year ${endYear}.`);
      return;
    }

    try {
      setLoading(true);
      const res = await putAPI(
        `/update-feesmanagment-year/${academicYear._id}`,
        { startDate, endDate }
      );

      if (!res.data.hasError) {
        toast.success(res.data.message);
        onUpdateSuccess(res.data.data);
        onClose();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to update academic year");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          Update Academic Year: {academicYear?.academicYear}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="dark" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Updating...
            </>
          ) : (
            "Update"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateYearModal;
