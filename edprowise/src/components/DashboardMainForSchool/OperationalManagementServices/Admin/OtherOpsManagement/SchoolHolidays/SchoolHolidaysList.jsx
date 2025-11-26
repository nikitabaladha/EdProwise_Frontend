// import React from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FiDownload } from "react-icons/fi";
// const SchoolHolidaysList = () => {
//   const navigate = useNavigate();

//   const navigateToAdd = (event) => {
//     event.preventDefault();
//     navigate(
//       `/school-dashboard/operational-service/other-management/school-holidays/add-school-holidays`
//     );
//   };

//   const navigateToView = (event) => {
//     event.preventDefault();
//     navigate(
//       `/school-dashboard/operational-service/other-management/school-holidays/view-school-holidays`
//     );
//   };

//   const navigateToUpdate = (event) => {
//     event.preventDefault();
//     navigate(
//       `/school-dashboard/operational-service/other-management/school-holidays/update-school-holidays`
//     );
//   };

//   return (
//     <div className="container-fluid">
//       <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
//         <Link
//           onClick={(event) => navigateToAdd(event)}
//           className="btn btn-sm btn-primary"
//         >
//           Add School Holiday
//         </Link>
//       </div>
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Holidays Records
//                   </h4>
//                   <select className="form-select form-select-sm me-2 w-auto">
//                     <option disabled>Select Academic Year</option>
//                     <option value="2025-26">2025-26 </option>
//                     <option value="2026-27">2026-27 </option>
//                   </select>
//                   <button className="btn btn-primary btn-sm">
//                     <FiDownload className="align-middle fs-18" />
//                   </button>{" "}
//                 </div>
//               </div>
//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-hover table-centered text-center">
//                   <thead className="bg-light-subtle">
//                     <tr className="payroll-table-header">
//                       <th className="">
//                         <div className="form-check ms-1">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             id="customCheck1"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="customCheck1"
//                           />
//                         </div>
//                       </th>
//                       <th className="text-nowrap">Academic Year</th>
//                       <th className="text-nowrap">Name of Holiday</th>
//                       <th className="text-nowrap">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="">
//                         <div className="form-check ms-1">
//                           <input type="checkbox" className="form-check-input" />
//                         </div>
//                       </td>
//                       <td>2025-26</td>
//                       <td>Holiday Name</td>
//                       <td className="text-center">
//                         <div className="d-flex gap-2 justify-content-center">
//                           <Link
//                             className="btn btn-light btn-sm"
//                             onClick={(event) => navigateToView(event)}
//                           >
//                             <iconify-icon
//                               icon="solar:eye-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>
//                           <Link
//                             className="btn btn-soft-primary btn-sm"
//                             onClick={(event) => navigateToUpdate(event)}
//                           >
//                             <iconify-icon
//                               icon="solar:pen-2-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>
//                           <Link
//                             className="btn btn-soft-danger btn-sm"
//                             // onClick={() => openDeleteDialog()}
//                           >
//                             <iconify-icon
//                               icon="solar:trash-bin-minimalistic-2-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SchoolHolidaysList;

// import React, { useState } from "react";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "moment/locale/en-gb";
// import CalendarEventModal from "./CalendarEventModal";
// import { useNavigate } from "react-router-dom";

// const localizer = momentLocalizer(moment);

// const SchoolHolidaysList = () => {
//   const navigate = useNavigate();
//     const [events, setEvents] = useState([
//       {
//         id: 1,
//         title: "Sample Event",
//         start: new Date(),
//         end: new Date(),
//         allDay: true,
//       },
//     ]);
  
//     const [selectedSlot, setSelectedSlot] = useState(null);
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
  
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [currentView, setCurrentView] = useState(Views.MONTH);
  
//     const handleSelectSlot = ({ start, end }) => {
//       setSelectedSlot({ start, end });
//       setSelectedEvent(null);
//       setIsModalOpen(true);
//     };
  
//     const handleSelectEvent = (event) => {
//       setSelectedEvent(event);
//       setSelectedSlot(null);
//       setIsModalOpen(true);
//     };
  
//    const handleSaveEvent = (title) => {
//      if (selectedEvent) {
//        setEvents((prev) =>
//          prev.map((ev) => (ev.id === selectedEvent.id ? { ...ev, title } : ev))
//        );
//      } else if (selectedSlot) {
//        const id = events.length ? events[events.length - 1].id + 1 : 1;

//        const newEvent = {
//          id,
//          title,
//          start: selectedSlot.start,
//          end: selectedSlot.end,
//          allDay: true,
//        };

//        setEvents((prev) => [...prev, newEvent]);
//      }

//      setIsModalOpen(false);
//      setSelectedSlot(null);
//      setSelectedEvent(null);
//    };

  
//     const handleDeleteEvent = () => {
//       if (selectedEvent) {
//         setEvents((prev) => prev.filter((ev) => ev.id !== selectedEvent.id));
//       }
//       setIsModalOpen(false);
//       setSelectedEvent(null);
//     };
  

  
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     School Holidays
//                   </h4>
//                 </div>
//               </div>
//               <div className="row">
//                 <Calendar
//                   localizer={localizer}
//                   events={events}
//                   startAccessor="start"
//                   endAccessor="end"
//                   style={{ height: "80vh" }}
//                   selectable
//                   onSelectSlot={handleSelectSlot}
//                   onSelectEvent={handleSelectEvent}
//                   date={currentDate}
//                   onNavigate={(date) => setCurrentDate(date)}
//                   view={currentView}
//                   onView={(view) => setCurrentView(view)}
//                   views={{ month: true, week:false, day: false, agenda: true }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isModalOpen && (
//         <CalendarEventModal
//           slot={selectedSlot}
//           event={selectedEvent}
//           onClose={() => {
//             setIsModalOpen(false);
//             setSelectedSlot(null);
//             setSelectedEvent(null);
//           }}
//           onSave={handleSaveEvent}
//           onDelete={handleDeleteEvent}
//         />
//       )}
//     </div>
//   );
// };

// export default SchoolHolidaysList;


// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "moment/locale/en-gb";
// import CalendarEventModal from "./CalendarEventModal";
// import { useNavigate } from "react-router-dom";
// import getAPI from "../../../../../../api/getAPI";
// import postAPI from "../../../../../../api/postAPI";
// import putAPI from "../../../../../../api/putAPI";
// import deleteAPI from "../../../../../../api/deleteAPI";
// import ConfirmationDialog from "../../../../../ConfirmationDialog";
// import { toast } from "react-toastify";

// const localizer = momentLocalizer(moment);

// const SchoolHolidaysList = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState("");
    
//   const [events, setEvents] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
// const academicYear = localStorage.getItem("selectedAcademicYear");
//  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [currentView, setCurrentView] = useState(Views.MONTH);

//   useEffect(() => {
//       const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//       const id = userDetails?.schoolId;
//       if (!id) {
//         toast.error("School ID not found. Please log in again.");
//         return;
//       }
//       setSchoolId(id);
//       fetchHolidays(id);
//     }, []);
  
//   const fetchHolidays = async (schoolId) => {
//     const res = await getAPI(
//       `/get-school-holidays-operational/${schoolId}/${academicYear}`,
//       true
//     );
//     console.log("holiday res", res);

//     if (!res.hasError) {
//       const formatted = res.data.data.holidayDetails.flatMap((h, i) =>
//         h.holidayNames.map((name, j) => ({
//           id: `${i}-${j}`,
//           title: name,
//           start: new Date(h.holidayDate),
//           end: new Date(h.holidayDate),
//           allDay: true,
//         }))
//       );
//       setEvents(formatted);

//       // For Holiday Sunday 
//       //  const sundays = generateSundaysForAcademicYear(academicYear).map(
//       //    (date, idx) => ({
//       //      id: `sunday-${idx}`,
//       //      title: "Sunday (Holiday)",
//       //      start: date,
//       //      end: date,
//       //      allDay: true,
//       //    })
//       //  );
//       //  setEvents([...formatted, ...sundays]);
//       //  End
//     } else {
//       toast.error(res.message || "Failed to load holidays");
//     }
//   };

//   // const generateSundaysForAcademicYear = (academicYear) => {
//   //   const [startYear, endYear] = academicYear.split("-").map(Number);
//   //   const startDate = new Date(startYear, 3, 1); 
//   //   const endDate = new Date(endYear, 2, 31); 

//   //   let currentDate = new Date(startDate);
//   //   const sundays = [];

//   //   while (currentDate <= endDate) {
//   //     if (currentDate.getDay() === 0) {
//   //       sundays.push(new Date(currentDate));
//   //     }
//   //     currentDate.setDate(currentDate.getDate() + 1);
//   //   }
//   //   return sundays;
//   // };

//   const handleSelectSlot = ({ start }) => {
//     setSelectedSlot({ start });
//     setSelectedEvent(null);
//     setIsModalOpen(true);
//   };

//   const handleSelectEvent = (event) => {
//     setSelectedEvent(event);
//     setSelectedSlot(null);
//     setIsModalOpen(true);
//   };

//   const handleSaveEvent = async (title) => {
//     if (selectedEvent) {
//       const payload = {
//         schoolId,
//         academicYear,
//         holidayDate: selectedEvent.start,
//         oldName: selectedEvent.title,
//         newName: title,
//       };

//       const res = await putAPI("/update-school-holidays-operational", payload, true);

//       if (!res.hasError) {
//         toast.success("Holiday updated");
//         setEvents((prev) =>
//           prev.map((ev) => (ev.id === selectedEvent.id ? { ...ev, title } : ev))
//         );
//         fetchHolidays(schoolId);
//       } else {
//         toast.error(res.message || "Failed to update holiday");
//       }
//     } else if (selectedSlot) {
//       const payload = {
//         schoolId,
//         academicYear,
//         holidayDate: selectedSlot.start,
//         holidayName: title,
//       };

//       const res = await postAPI("/add-school-holidays-operational", payload,true);

//       if (!res.hasError) {
//         toast.success("Holiday added");
//         const id = events.length ? events.length + 1 : 1;
//         const newEvent = {
//           id,
//           title,
//           start: selectedSlot.start,
//           end: selectedSlot.start,
//           allDay: true,
//         };
//         setEvents((prev) => [...prev, newEvent]);
//       } else {
//         toast.error(res.message || "Failed to add holiday");
//       }
//     }

//     setIsModalOpen(false);
//     setSelectedSlot(null);
//     setSelectedEvent(null);
//   };

//   const handleDeleteEvent = () => {
//     if (selectedEvent) {
//       setIsDeleteDialogOpen(true);
//     }
//   };

//   const handleDeleteConfirmed = async () => {
//     if (!selectedEvent) return;
//     setIsDeleteDialogOpen(false);
//     setSelectedEvent(null);
//     setIsModalOpen(false);
//   };

  

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     School Holidays
//                   </h4>
//                 </div>
//               </div>
//               <div className="row">
//                 <Calendar
//                   localizer={localizer}
//                   events={events}
//                   startAccessor="start"
//                   endAccessor="end"
//                   style={{ height: "80vh" }}
//                   selectable
//                   onSelectSlot={handleSelectSlot}
//                   onSelectEvent={handleSelectEvent}
//                   date={currentDate}
//                   onNavigate={(date) => setCurrentDate(date)}
//                   view={currentView}
//                   onView={(view) => setCurrentView(view)}
//                   views={{ month: true, week: true, day: true, agenda: true }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div> 
//       </div>
//       {isModalOpen && (
//         <CalendarEventModal
//           slot={selectedSlot}
//           event={selectedEvent}
//           onClose={() => {
//             setIsModalOpen(false);
//             setSelectedSlot(null);
//             setSelectedEvent(null);
//           }}
//           onSave={handleSaveEvent}
//           onDelete={handleDeleteEvent}
//         />
//       )}

//       {isDeleteDialogOpen && selectedEvent && (
//         <ConfirmationDialog
//           onClose={() => setIsDeleteDialogOpen(false)}
//           deleteType="holiday"
//           id={selectedEvent.id} // just to pass some identifier
//           onDeleted={handleDeleteConfirmed}
//         />
//       )}
//     </div>
//   );
// };

// export default SchoolHolidaysList;

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";
import CalendarEventModal from "./CalendarEventModal";
import { useNavigate } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI";
import postAPI from "../../../../../../api/postAPI";
import putAPI from "../../../../../../api/putAPI";
import deleteAPI from "../../../../../../api/deleteAPI";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

const SchoolHolidaysList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [parentId, setParentId] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const academicYear = localStorage.getItem("selectedAcademicYear");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
    fetchHolidays(id);
  }, []);

  const fetchHolidays = async (schoolId) => {
    const res = await getAPI(
      `/get-school-holidays-operational/${schoolId}/${academicYear}`,
      true
    );

    if (!res.hasError) {
      const record = res.data.data;
      if (record?._id) setParentId(record._id);

      const formatted =
        record?.holidayDetails?.map((h) => ({
          id: h._id, // ✅ holidayId
          title: h.holidayNames,
          start: new Date(h.holidayDate),
          end: new Date(h.holidayDate),
          allDay: true,
        })) || [];

      setEvents(formatted);
      // For Holiday Sunday
      const sundays = generateSundaysForAcademicYear(academicYear).map(
        (date, idx) => ({
          id: `sunday-${idx}`,
          title: "Holiday",
          start: date,
          end: date,
          allDay: true,
        })
      );
      setEvents([...formatted, ...sundays]);
      // End
    } else {
      toast.error(res.message || "Failed to load holidays");
    }
  };

   const generateSundaysForAcademicYear = (academicYear) => {
     const [startYear, endYear] = academicYear.split("-").map(Number);
     const startDate = new Date(startYear, 3, 1);
     const endDate = new Date(endYear, 2, 31);

     let currentDate = new Date(startDate);
     const sundays = [];

     while (currentDate <= endDate) {
       if (currentDate.getDay() === 0) {
         sundays.push(new Date(currentDate));
       }
       currentDate.setDate(currentDate.getDate() + 1);
     }
     return sundays;
   };

  const handleSelectSlot = ({ start }) => {
    setSelectedSlot({ start });
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (title) => {
    if (!schoolId || !academicYear) return;

    if (selectedEvent) {
      // Update holiday
      const payload = {
        parentId,
        holidayId: selectedEvent.id,
        holidayDate: selectedEvent.start,
        holidayName: title,
      };

      const res = await putAPI(
        "/update-school-holidays-operational",
        payload,
        true
      );

      if (!res.hasError) {
        toast.success("Holiday updated");
        fetchHolidays(schoolId);
      } else {
        toast.error(res.message || "Failed to update holiday");
      }
    } else if (selectedSlot) {
      // Add holiday
      const payload = {
        schoolId,
        academicYear,
        holidayDate: selectedSlot.start,
        holidayName: title,
      };

      const res = await postAPI(
        "/add-school-holidays-operational",
        payload,
        true
      );

      if (!res.hasError) {
        toast.success("Holiday added");
        fetchHolidays(schoolId);
      } else {
        toast.error(res.message || "Failed to add holiday");
      }
    }

    setIsModalOpen(false);
    setSelectedSlot(null);
    setSelectedEvent(null);
  };

  const openDeleteDialog = (holiday) => {
    setSelectedRecord({
      parentId,
      holidayId: holiday.id,
    });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) openDeleteDialog(selectedEvent);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteDialogOpen(false);
    setSelectedRecord(null);
    setSelectedEvent(null);
    setIsModalOpen(false);
    fetchHolidays(schoolId);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    School Holidays
                  </h4>
                </div>
              </div>
              <div className="row">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "80vh" }}
                  selectable
                  onSelectSlot={handleSelectSlot}
                  onSelectEvent={handleSelectEvent}
                  date={currentDate}
                  onNavigate={(date) => setCurrentDate(date)}
                  view={currentView}
                  onView={(view) => setCurrentView(view)}
                  views={{ month: true, week: true, day: true, agenda: true }}
                />
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
          onDelete={handleDeleteEvent} // ✅ opens delete dialog
        />
      )}

      {isDeleteDialogOpen && selectedRecord && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="operationalHoliday"
          id={selectedRecord}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default SchoolHolidaysList;

