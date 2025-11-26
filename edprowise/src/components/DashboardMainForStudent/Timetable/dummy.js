import React from "react";
import { useNavigate, Link } from "react-router-dom";

const ClassTimetable = () => {
  // Define timetable data
  const timetable = [
    {
      time: "09:00 - 09:45",
      Monday: "Math",
      Tuesday: "Science",
      Wednesday: "English",
      Thursday: "History",
      Friday: "Math",
      Saturday: "Computer",
    },
    {
      time: "09:45 - 10:30",
      Monday: "English",
      Tuesday: "Math",
      Wednesday: "Science",
      Thursday: "Geography",
      Friday: "Computer",
      Saturday: "Sports",
    },
    {
      time: "10:30 - 11:15",
      Monday: "Science",
      Tuesday: "History",
      Wednesday: "Math",
      Thursday: "English",
      Friday: "Geography",
      Saturday: "Library",
    },
    {
      time: "11:15 - 11:30",
      break: true, // special row
      label: "Morning Break",
    },
    {
      time: "11:30 - 12:15",
      Monday: "Geography",
      Tuesday: "English",
      Wednesday: "Computer",
      Thursday: "Science",
      Friday: "Math",
      Saturday: "Drawing",
    },
    {
      time: "12:15 - 01:00",
      Monday: "Computer",
      Tuesday: "Sports",
      Wednesday: "Library",
      Thursday: "Math",
      Friday: "Science",
      Saturday: "Music",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Class Timetable
                  </h4>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-bordered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="text-nowrap">Time</th>
                      <th className="text-nowrap">Monday</th>
                      <th className="text-nowrap">Tuesday</th>
                      <th className="text-nowrap">Wednesday</th>
                      <th className="text-nowrap">Thursday</th>
                      <th className="text-nowrap">Friday</th>
                      <th className="text-nowrap">Saturday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetable.map((row, index) =>
                      row.break ? (
                        <tr key={index} className="table-warning">
                          <td className="fw-bold">{row.time}</td>
                          <td colSpan={6} className="fw-bold text-danger">
                            {row.label}
                          </td>
                        </tr>
                      ) : (
                        <tr key={index}>
                          <td className="fw-bold">{row.time}</td>
                          <td>{row.Monday}</td>
                          <td>{row.Tuesday}</td>
                          <td>{row.Wednesday}</td>
                          <td>{row.Thursday}</td>
                          <td>{row.Friday}</td>
                          <td>{row.Saturday}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <p className="text-muted mt-3 text-center">
                📌 This is a sample timetable. Subjects & breaks can be
                customized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassTimetable;
