import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";
import CalendarEventModal from "./CalendarEventModal";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: "Sample Event",
      start: new Date(),
      end: new Date(),
      allDay: true,
    },
  ]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // When user clicks on a slot (date or time)
  const handleSelectSlot = ({ start, end, slots, action }) => {
    setSelectedSlot({ start, end });
    setIsModalOpen(true);
  };

  // Save event from modal
  const handleSaveEvent = (title) => {
    if (!title || !selectedSlot) return;

    const newEvent = {
      title,
      start: selectedSlot.start,
      end: selectedSlot.end,
      allDay:
        moment(selectedSlot.start).isSame(selectedSlot.end, "day") &&
        selectedSlot.start.getHours() === 0 &&
        selectedSlot.end.getHours() === 0,
    };

    setEvents((prev) => [...prev, newEvent]);
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  return (
    <div className="container pt-2">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        defaultView={Views.MONTH}
        views={{ month: true, week: true, day: true, agenda: true }}
        selectable
        onSelectSlot={handleSelectSlot}
      />

      {isModalOpen && (
        <CalendarEventModal
          slot={selectedSlot}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;
