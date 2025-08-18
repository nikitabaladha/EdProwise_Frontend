import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import postAPI from "../../../../../../api/postAPI";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';
moment.locale('en-gb');
  
const localizer = momentLocalizer(moment);
  
const EmployeeMarkAttendance = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [markingPresent, setMarkingPresent] = useState(false);
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");

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
      
      const response = await getAPI(`/get-employee-attendance-details/${id}/${empId}`);
      let eventArray = [];

      if (!response.hasError && response.data?.data?.attendance) {
        const attendanceData = response.data.data.attendance;

        for (const monthYear in attendanceData) {
          attendanceData[monthYear].forEach(entry => {
            let title = "📅";

            if (entry.dateStatus === "present") title = "✅ Present";
            else if (entry.dateStatus === "leave") title = "✅ Leave Approved";
            else if (entry.dateStatus === "applied-leave") title = "🟡 Applying Leave";
            else if (entry.dateStatus === "weekend") title = "🟠 Weekend";
            else if (entry.dateStatus === "holiday") title = "🟠 Holiday";
            else if (entry.dateStatus === "rejected-leave") title = "❌ Leave Rejected";

            eventArray.push({
              id: `${monthYear}-${entry.date}`,
              title,
              start: new Date(entry.date),
              end: moment(entry.date).add(1, "hour").toDate(),
              allDay: true
            });
          });
        }
      }

      const holidayRes = await getAPI(`/school-holidays/${id}`);
      if (!holidayRes.hasError && Array.isArray(holidayRes.data)) {
        const holidayEvents = holidayRes.data.map(holiday => ({
          id: `holiday-${holiday._id}`,
          title: `🟠 ${holiday.holidayName}`,
          start: new Date(holiday.date),
          end: moment(holiday.date).add(1, "hour").toDate(),
          allDay: true
        }));

        eventArray = [...eventArray, ...holidayEvents];
      }

      setEvents(eventArray);
    } catch (error) {
      toast.error("Failed to load employee attendance or holidays");
    }
  };

  fetchEmployeeDetails();
}, []);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setIsModalOpen(true);
    setMarkingPresent(false);
    setInTime("");
    setOutTime("");
  };

  const handleAddAttendance = async () => {
    const isSunday = moment(selectedDate).day() === 0;

    if (isSunday) {
      toast.error("Sunday is auto-marked as Weekend");
      setIsModalOpen(false);
      return;
    }

    if (!inTime || !outTime) {
      toast.error("Please enter both In Time and Out Time");
      return;
    }

    if (!inTime || !outTime) {
      toast.error("Please enter both In Time and Out Time");
      return;
    }

    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

    try {
      const payload = {
        schoolId,
        employeeId,
        date: formattedDate,
        dateStatus: "present",
        inTime,
        outTime,
      };

      const res = await postAPI("/mark-attendance", payload);
      if (!res.hasError) {
        setEvents((prev) => [
          ...prev,
          {
            id: Date.now(),
            title: "✅ Present",
            start: selectedDate,
            end: moment(selectedDate).add(1, "hour").toDate(),
            allDay: true
          }
        ]);
        toast.success("Attendance marked successfully");
      } else {
        toast.error(res.message || "Error marking attendance");
      }
    } catch (err) {
      toast.error("Server error while marking attendance");
    }

    setIsModalOpen(false);
  };

  const handleLeaveClick = () => {
    navigate('/employee-dashboard/payroll-module/employee/attendance/apply-for-leave', {
      state: { selectedDate: selectedDate.toISOString() }
    });
  };

  const onNavigate = (newDate) => setCurrentDate(newDate);
  const onView = (newView) => setCurrentView(newView);

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
        views={{ month: true, week: true, day: true, agenda: true }}
      />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{moment(selectedDate).format('MMMM Do, YYYY')}</h3>
            <p>Mark Attendance for this day:</p>

            {!markingPresent ? (
              <>
                <button onClick={() => setMarkingPresent(true)} className="btn present">✅ Present</button>
                <button onClick={handleLeaveClick} className="btn leave">🟡 Leave Request</button>
                <button onClick={() => setIsModalOpen(false)} className="btn cancel">❌ Cancel</button>
              </>
            ) : (
              <>
                <label className='mb-2'>
                  In Time:
                  <input
                    type="time"
                    value={inTime}
                    className='ms-1'
                    onChange={(e) => setInTime(e.target.value)}
                  />
                </label>
                <label className='mb-2'>
                  Out Time:
                  <input
                    type="time"
                    value={outTime}
                    className='ms-1'
                    onChange={(e) => setOutTime(e.target.value)}
                  />
                </label>
                <div className='d-flex justify-content-center'>
                  <button onClick={handleAddAttendance} className="btn save me-1">Submit</button>
                  <button onClick={() => setIsModalOpen(false)} className="btn cancel ms-1"> Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeMarkAttendance;

