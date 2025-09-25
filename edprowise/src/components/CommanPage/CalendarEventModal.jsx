import React, { useState, useEffect } from "react";
import moment from "moment";

const CalendarEventModal = ({ slot, event, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setStartTime(event.allDay ? "" : moment(event.start).format("HH:mm"));
      setEndTime(event.allDay ? "" : moment(event.end).format("HH:mm"));
      setIsAllDay(event.allDay || false);
    } else if (slot) {
      setTitle("");
      const isAllDaySlot = slot.start.getHours() === 0 && slot.end.getHours() === 0;
      setStartTime(isAllDaySlot ? "" : moment(slot.start).format("HH:mm"));
      setEndTime(isAllDaySlot ? "" : moment(slot.end).format("HH:mm"));
      setIsAllDay(isAllDaySlot);
    } else {
      setTitle("");
      setStartTime("");
      setEndTime("");
      setIsAllDay(false);
    }
  }, [event, slot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(title, isAllDay ? null : startTime, isAllDay ? null : endTime);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h4>{event ? "Update Event" : "Add Event"}</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control mb-2"
            required
          />

          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="allDayCheck"
              checked={isAllDay}
              onChange={(e) => setIsAllDay(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="allDayCheck">
              All day event
            </label>
          </div>

          {!isAllDay && (
            <div className="mb-2">
              <label className="form-label">Start Time</label>
              <input
                type="time"
                className="form-control"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <label className="form-label mt-2">End Time</label>
              <input
                type="time"
                className="form-control"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          )}

          <div className="d-flex justify-content-between mt-3">
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
