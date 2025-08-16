import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from "../../../../ConfirmationDialog";
 
moment.locale('en-gb');
const localizer = momentLocalizer(moment);

const SchoolHolidayCalendar = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [holidayName, setHolidayName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [existingHoliday, setExistingHoliday] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteHolidayEvent, setDeleteHolidayEvent] = useState(null);

  const getSundaysInMonth = (date) => {
    const sundays = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const current = new Date(year, month, 1);

    while (current.getMonth() === month) {
      if (current.getDay() === 0) {
        sundays.push({
          id: `weekend-${current.toISOString()}`,
          title: "Weekend",
          start: new Date(current),
          end: new Date(current),
          allDay: true,
          isWeekend: true,
        });
      }
      current.setDate(current.getDate() + 1);
    }

    return sundays;
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      navigate(-1);
      return;
    }
    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (schoolId) {
      fetchHolidays();
    }
  }, [schoolId, currentDate]);

  const fetchHolidays = async () => {
    try {
      const res = await getAPI(`/school-holidays/${schoolId}`);
      const formatted = res.data.map(holiday => ({
        id: holiday._id,
        title: holiday.holidayName,
        start: new Date(holiday.date),
        end: new Date(holiday.date),
        allDay: true,
      }));
      const sundays = getSundaysInMonth(currentDate);
      setEvents([...formatted, ...sundays]);
    } catch (err) {
      toast.error("Failed to load holidays");
    }
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setHolidayName("");
    setExistingHoliday(null);

    const existing = events.find(event =>
      !event.isWeekend && moment(event.start).isSame(start, 'day')
    );

    if (existing) {
      setHolidayName(existing.title);
      setExistingHoliday(existing);
    }

    setIsModalOpen(true);
  };

  const handleAddHoliday = async () => {
    if (!holidayName) {
      toast.error("Holiday name is required");
      return;
    }

    try {
      await postAPI('/post-school-holidays', {
        schoolId,
        holidayName,
        date: selectedDate,
      }, {}, true);
      toast.success("Holiday added successfully");
      setIsModalOpen(false);
      fetchHolidays();
    } catch (err) {
      toast.error("Failed to add holiday");
    }
  };

  const handleUpdateHoliday = async () => {
    if (!holidayName || !existingHoliday) return;

    try {
      await postAPI('/update-school-holidays', {
        holidayId: existingHoliday.id,
        holidayName,
      }, {}, true);
      toast.success("Holiday updated successfully");
      setIsModalOpen(false);
      fetchHolidays();
    } catch (err) {
      toast.error("Failed to update holiday");
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeleteHolidayEvent(null);
  };

  const handleDeleteConfirmed = async (id) => {
    setEvents((prev) => prev.filter((entry) => entry.id !== id));
    setIsDeleteDialogOpen(false);
  };

  const onView = (newView) => {
    setCurrentView(newView);
  };

  const onNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-center">School Holiday Calendar</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => {
          if (!event.isWeekend) {
            setSelectedDate(event.start);
            setHolidayName(event.title);
            setExistingHoliday(event);
            setIsModalOpen(true);
          }
        }}
        date={currentDate}
        view={currentView}
        onNavigate={onNavigate}
        onView={onView}
        defaultView={Views.MONTH}
        views={{ month: true, week: true, day: true, agenda: true }}
        eventPropGetter={(event) => {
          if (event.isWeekend) {
            return { style: { backgroundColor: '#ff0000', color: '#000' } };
          }
          return {};
        }}
      />

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{existingHoliday ? "Edit Holiday" : "Add Holiday"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Date:</strong> {selectedDate && moment(selectedDate).format('LL')}</p>
          <Form.Group>
            <Form.Label>Holiday Name</Form.Label>
            <Form.Control
              type="text"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
              placeholder="Enter holiday name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {existingHoliday && (
            <Button
              variant="danger"
              onClick={() => {
                setIsModalOpen(false);
                setDeleteHolidayEvent(existingHoliday);
                setIsDeleteDialogOpen(true);
              }}
            >
              Delete
            </Button>
          )}
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={existingHoliday ? handleUpdateHoliday : handleAddHoliday}
          >
            {existingHoliday ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {isDeleteDialogOpen && deleteHolidayEvent && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="schoolHoliday"
          id={deleteHolidayEvent.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default SchoolHolidayCalendar;
