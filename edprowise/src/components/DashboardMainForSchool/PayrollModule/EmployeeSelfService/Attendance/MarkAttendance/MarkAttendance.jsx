import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import putAPI from "../../../../../../api/putAPI"; 
import { Link } from 'react-router-dom';

import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb'; 
moment.locale('en-gb');       

const localizer = momentLocalizer(moment);

const MarkAttendance = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [isLoading, setIsLoading] = useState(false);
    

  useEffect(() => {
        const fetchEmployeeDetails = async () => {
            const userDetails = JSON.parse(localStorage.getItem("userDetails"));
            const id = userDetails?.schoolId;
            const empId = userDetails?.userId;

            if (!id || !empId) {
                toast.error("Authentication details missing");
                return;
            }

            setSchoolId(id);
            setEmployeeId(empId);

            try {
                setIsLoading(true);
                const response = await getAPI(`/get-employee-self-details/${id}/${empId}`);
                
                if (!response.hasError && response.data?.data) {
                   
                  
                } else {
                    toast.error(response.message || "No employee data found");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to load employee details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, []);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setIsModalOpen(true);
  };

  const handleAddAttendance = (type) => {
    if (type === 'leave') {
      navigate(
        '/school-dashboard/payroll-module/employee-services/attendance/apply-for-leave',
        {
          state: {
            selectedDate: selectedDate.toISOString(),
          },
        }
      );
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: '✅ Present',
      start: selectedDate,
      end: moment(selectedDate).add(1, 'hour').toDate(),
      allDay: true,
    };

    setEvents((prev) => [...prev, newEvent]);
    setIsModalOpen(false);
  };

  const onNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const onView = (newView) => {
    setCurrentView(newView);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-center">Attendance Calendar</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        selectable
        onSelectSlot={handleSelectSlot}
        date={currentDate}
        view={currentView}
        onNavigate={onNavigate}
        onView={onView}
        defaultView={Views.MONTH}
        defaultDate={new Date()}
        views={{ month: true, week: true, day: true, agenda: true }}
      />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{moment(selectedDate).format('MMMM Do, YYYY')}</h3>
            <p>Mark Attendance for this day:</p>
            <button
              onClick={() => handleAddAttendance('present')}
              className="btn present"
            >
              ✅ Present
            </button>
            <button
              onClick={() => handleAddAttendance('leave')}
              className="btn leave"
            >
              🟡 Leave Request
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn cancel"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;

