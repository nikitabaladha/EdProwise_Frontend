import React from "react";
import { useNavigate, Link } from "react-router-dom";

const TeacherTimetable = () => {
  const timetable = [
    {
      time: "09:00 - 09:45",
      Monday: { subject: "Math", class: "10-A" },
      Tuesday: { subject: "Math", class: "9-B" },
      Wednesday: { subject: "", class: "" },
      Thursday: { subject: "", class: "" },
      Friday: { subject: "Math", class: "9-B" },
      Saturday: { subject: "", class: "" },
    },
    {
      time: "09:45 - 10:30",
      Monday: { subject: "", class: "" },
      Tuesday: { subject: "", class: "" },
      Wednesday: { subject: "Math", class: "10-A" },
      Thursday: { subject: "Math", class: "9-C" },
      Friday: { subject: "", class: "" },
      Saturday: { subject: "Sports", class: "9-B" },
    },
    {
      time: "10:30 - 11:15",
      Monday: { subject: "Math", class: "9-A" },
      Tuesday: { subject: "Math", class: "10-C" },
      Wednesday: { subject: "Math", class: "9-A" },
      Thursday: { subject: "", class: "" },
      Friday: { subject: "", class: "" },
      Saturday: { subject: "Math", class: "9-B" },
    },
    {
      time: "11:15 - 11:30",
      break: true,
      label: "Morning Break",
    },
    {
      time: "11:30 - 12:15",
      Monday: { subject: "", class: "" },
      Tuesday: { subject: "Math", class: "8-A" },
      Wednesday: { subject: "", class: "" },
      Thursday: { subject: "Math", class: "10-B" },
      Friday: { subject: "Math", class: "10-C" },
      Saturday: { subject: "", class: "" },
    },
    {
      time: "12:15 - 01:00",
      Monday: { subject: "Math", class: "9-A" },
      Tuesday: { subject: "", class: "" },
      Wednesday: { subject: "Math", class: "9-C" },
      Thursday: { subject: "Math", class: "10-C" },
      Friday: { subject: "Math", class: "8-B" },
      Saturday: { subject: "", class: "" },
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header d-flex flex-wrap align-items-center justify-content-between">
                    <h4 className="card-title text-center flex-grow-1 mb-0">
                      Teacher Timetable - Mr. Arun Varma
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
                          <tr key={index} className="break-row">
                            <td className="fw-bold">{row.time}</td>
                            <td
                              colSpan={6}
                              className="fw-bold text-danger bg-light"
                            >
                              {row.label}
                            </td>
                          </tr>
                        ) : (
                          <tr key={index}>
                            <td className="fw-bold">{row.time}</td>
                            <td>
                              <div className="fw-semibold">
                                {row.Monday.subject}
                              </div>
                              <span className="text-muted fs-15">
                              {row.Monday.class}
                              </span>
                            </td>
                            <td>
                              <div className="fw-semibold">
                                {row.Tuesday.subject}
                              </div>
                              <span className="text-muted fs-15">
                                 {row.Tuesday.class}
                              </span>
                            </td>
                            <td>
                              <div className="fw-semibold">
                                {row.Wednesday.subject}
                              </div>
                              { 
                                <span className="text-muted fs-15">
                                   {row.Wednesday.class}
                                </span>
                              }
                            </td>
                            <td>
                              <div className="fw-semibold">
                                {row.Thursday.subject}
                              </div>
                              <span className="text-muted fs-15">
                                {row.Thursday.class}
                              </span>
                            </td>
                            <td>
                              <div className="fw-semibold">
                                {row.Friday.subject}
                              </div>
                              <span className="text-muted fs-15">
                                {row.Friday.class}
                              </span>
                            </td>
                            <td>
                              <div className="fw-semibold">
                                {row.Saturday.subject}
                              </div>
                              <span className="text-muted fs-15">
                               {row.Saturday.class}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherTimetable;
