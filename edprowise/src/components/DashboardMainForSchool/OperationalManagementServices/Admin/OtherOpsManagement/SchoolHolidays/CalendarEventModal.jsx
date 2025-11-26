import React, { useState, useEffect } from "react";

const CalendarEventModal = ({ slot, event, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
    } else {
      setTitle("");
    }
  }, [event, slot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // always full-day
    onSave(title, null, null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h4>{event ? "Update Holiday" : "Add Holiday"}</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Holiday Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control mb-3"
            required
          />

          <div className="d-flex justify-content-end gap-2 mt-3">
            {event && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {event ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>
        {`
        .modal-overlay {
          position: fixed;
          top:0; left:0;
          width:100%; height:100%;
          background: rgba(0,0,0,0.4);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:1000;
        }
        .modal-box {
          background:#fff;
          padding:20px;
          border-radius:8px;
          width:350px;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
        }
      `}
      </style>
    </div>
  );
};

export default CalendarEventModal;
