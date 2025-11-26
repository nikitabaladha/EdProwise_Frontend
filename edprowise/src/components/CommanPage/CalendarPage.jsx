import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";
import CalendarEventModal from "./CalendarEventModal";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const navigate = useNavigate();
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Sample Event",
      start: new Date(),
      end: new Date(),
      allDay: true,
    },
  ]);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  // Edit/Delete existing event
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (title, startTime, endTime) => {
    if (selectedEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === selectedEvent.id
            ? {
                ...ev,
                title,
                start: startTime
                  ? new Date(
                      moment(ev.start).format("YYYY-MM-DD") + "T" + startTime
                    )
                  : ev.start,
                end: endTime
                  ? new Date(
                      moment(ev.end).format("YYYY-MM-DD") + "T" + endTime
                    )
                  : ev.end,
              }
            : ev
        )
      );
    } else if (selectedSlot) {
      const id = events.length ? events[events.length - 1].id + 1 : 1;

      let start = selectedSlot.start;
      let end = selectedSlot.end;

      if (startTime && endTime) {
        const dateOnly = moment(start).format("YYYY-MM-DD");
        start = new Date(`${dateOnly}T${startTime}`);
        end = new Date(`${dateOnly}T${endTime}`);
      }

      const newEvent = {
        id,
        title,
        start,
        end,
        allDay: !startTime && !endTime,
      };

      setEvents((prev) => [...prev, newEvent]);
    }

    setIsModalOpen(false);
    setSelectedSlot(null);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents((prev) => prev.filter((ev) => ev.id !== selectedEvent.id));
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body custom-heading-padding calendar-card pb-0">
                <div className="d-flex justify-content-end my-1 ">
                 
                    <button
                      type="button"
                      className="btn border border-dark text-end custom-submit-button"
                      onClick={() => navigate(-1)}
                    >
                      Back 
                    </button> 
                 
                </div>
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: "93vh" }}
                    selectable 
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    date={currentDate}
                    onNavigate={(date) => setCurrentDate(date)}
                    view={currentView}
                    onView={(view) => setCurrentView(view)}
                    views={{ month: true, week: true, day: true, agenda: true }}
                  />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CalendarEventModal
          slot={selectedSlot}
          event={selectedEvent}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSlot(null);
            setSelectedEvent(null);
          }}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </>
  );
};

export default CalendarPage;
