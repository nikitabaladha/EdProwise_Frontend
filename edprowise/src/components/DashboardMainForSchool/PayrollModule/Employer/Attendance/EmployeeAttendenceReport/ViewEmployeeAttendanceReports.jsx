// import React, { useState, useEffect } from 'react';
// import { toast } from "react-toastify";
// import getAPI from "../../../../../../api/getAPI";
// import { Link } from 'react-router-dom';
// import moment from 'moment';

// const ViewEmployeeAttendanceReports = () => {
//     const [showInfo, setShowInfo] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const [filterType, setFilterType] = useState(null);
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState(null);
//     const [employeeName, setEmployeeName] = useState(null);
//     const [attendanceData, setAttendanceData] = useState({});
//     const [filteredRecords, setFilteredRecords] = useState([]);

//     const [year, setYear] = useState(moment().format("YYYY"));
//     const [month, setMonth] = useState(moment().format("MMMM"));

//     const [fromDate, setFromDate] = useState("");
//     const [toDate, setToDate] = useState("");

//     useEffect(() => {
//         const fetchEmployeeDetails = async () => {
//             const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//             const id = userDetails?.schoolId;
//             setSchoolId(id);

//             try {
//                 const response = await getAPI(`/get-employee-attendance-details/${id}/${empId}`);
//                 console.log("attendance report", response);

//                 if (!response.hasError && response.data?.data?.attendance) {
//                     setAttendanceData(response.data.data.attendance);
//                 }
//             } catch (error) {
//                 toast.error("Failed to load employee attendance");
//             }
//         };
//         fetchEmployeeDetails();
//     }, []);

//     const handleProceed = (type) => {
//         setFilterType(type);
//         setShowForm(true);

//         if (type === 'month') {
//             const monthIndex = moment().month(month).format("MM");
//             const key = `${year}-${monthIndex}`;
//             const records = attendanceData[key] || [];
//             setFilteredRecords(records);
//         }

//         if (type === 'custom') {
//             const allRecords = Object.values(attendanceData).flat();
//             const filtered = allRecords.filter(entry => {
//                 const entryDate = moment(entry.date);
//                 return entryDate.isBetween(fromDate, toDate, 'day', '[]');
//             });
//             setFilteredRecords(filtered);
//         }
//     };

//     const calculateHours = (inTime, outTime) => {
//         const start = moment(inTime, "HH:mm");
//         const end = moment(outTime, "HH:mm");
//         let duration = moment.duration(end.diff(start));

//         if (duration.asMinutes() < 0) {
//             duration = moment.duration(end.add(1, 'day').diff(start));
//         }

//         const hours = Math.floor(duration.asHours());
//         const minutes = Math.floor(duration.asMinutes()) % 60;

//         return `${hours}h ${minutes}m`;
//     };



//     return (
//         <div className="container">
//             <div className="card m-2">
//                 <div className="card-body custom-heading-padding">
//                     <div className="card-header d-flex align-items-center justify-content-between mb-2">
//                         <div className="flex-grow-1 text-center">
//                             <h4 className="payroll-title mb-0">Attendance Report</h4>
//                         </div>
//                         <Link className="text-primary text-end ms-3">
//                             Export
//                             <i className="bx bx-export ms-1"></i>
//                         </Link>
//                     </div>
//                     {showInfo && (<>
//                         <div className="row salary-slip-box m-0 mb-2">
//                             <div className="col-md-7">
//                                 <p className='text-dark payroll-box-text my-2'>
//                                     <strong>Employee ID :</strong> {employeeId}
//                                 </p>
//                             </div>
//                             <div className="col-md-5">
//                                 <p className='text-dark payroll-box-text my-2'>
//                                     <strong>Employee Name :</strong> {employeeName}
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="row border border-dark m-0 my-2">
//                             <div className="col-md-6 border border-dark">
//                                 <p className='text-dark payroll-box-text my-2'><strong>By Months :</strong></p>
//                                 <div className="d-flex flex-wrap fw-bold align-items-center payroll-table-body gap-3">
//                                     <label className="mb-0 fw-bold payroll-box-text">Year :</label>
//                                     <select className="custom-select" value={year} onChange={(e) => setYear(e.target.value)}>
//                                         {[2025, 2026, 2027, 2028].map(y => <option key={y}>{y}</option>)}
//                                     </select>

//                                     <label className="mb-0 payroll-box-text fw-bold">Month :</label>
//                                     <select className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
//                                         {moment.months().map(m => <option key={m}>{m}</option>)}
//                                     </select>
//                                 </div>
//                                 <div className="text-end my-2">
//                                     <button type="button" className={`btn btn-primary custom-submit-button ${showForm ? 'd-none' : ''}`} onClick={() => handleProceed('month')}>
//                                         Show Attendance
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="col-md-6 border border-dark">
//                                 <p className='text-dark payroll-box-text my-2'><strong>By Date :</strong></p>
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <label className="form-label fw-bold">Date From <span className="text-danger">*</span></label>
//                                         <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
//                                     </div>
//                                     <div className="col-md-6">
//                                         <label className="form-label fw-bold">Date To <span className="text-danger">*</span></label>
//                                         <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div className="text-end my-2">
//                                     <button type="button" className={`btn btn-primary custom-submit-button ${showForm ? 'd-none' : ''}`} onClick={() => handleProceed('custom')}>
//                                         Show Attendance
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {showForm && (
//                             <div className="table-responsive my-4">
//                                 <table className="table border text-dark border-dark mb-4">
//                                     <thead>
//                                         <tr className='payroll-table-header'>
//                                             <th className="text-center border border-dark p-2">Date</th>
//                                             <th className="text-center border border-dark p-2">Day</th>
//                                             <th className="text-center border border-dark p-2">In Time</th>
//                                             <th className="text-center border border-dark p-2">Out Time</th>
//                                             <th className="text-center border border-dark p-2">No. of Hours</th>
//                                             <th className="text-center border border-dark p-2">Status</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredRecords.length > 0 ? filteredRecords.map((record, index) => (
//                                             <tr key={index} className='payroll-table-body'>
//                                                 <td className="text-center border border-dark p-2">{moment(record.date).format("DD-MM-YYYY")}</td>
//                                                 <td className="text-center border border-dark p-2">{moment(record.date).format("dddd")}</td>
//                                                 <td className="text-center border border-dark p-2">{record.inTime || "-"}</td>
//                                                 <td className="text-center border border-dark p-2">{record.outTime || "-"}</td>
//                                                 <td className="text-center border border-dark p-2">
//                                                     {record.inTime && record.outTime
//                                                         ? calculateHours(record.inTime, record.outTime)
//                                                         : "-"}
//                                                 </td>
//                                                 <td className="text-center border border-dark p-2">
//                                                     {record.dateStatus === "present" ? "✅ Present" :
//                                                         record.dateStatus === "leave" ? "🟡 Leave" :
//                                                             record.dateStatus === "weekend" ? "🟠 Weekend" : "❌ Absent"}
//                                                 </td>
//                                             </tr>
//                                         )) : (
//                                             <tr><td colSpan="6" className="text-center p-3">No records found</td></tr>
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewEmployeeAttendanceReports;

import React, { useState } from 'react';
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import { Link } from 'react-router-dom';
import moment from 'moment';

const ViewEmployeeAttendanceReports = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState(null);

  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [year, setYear] = useState(moment().format("YYYY"));
  const [month, setMonth] = useState(moment().format("MMMM"));
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFetchEmployeeData = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!employeeId || !id) {
      toast.error("Employee ID and School ID are required.");
      return;
    }
    setSchoolId(id);

    try {
      // Fetch employee basic details
      const resEmp = await getAPI(`/get-employee-self-details/${id}/${employeeId}`);
      if (!resEmp.hasError && resEmp.data?.data) {
        setEmployeeName(resEmp.data.data.employeeName || "N/A");
        setShowInfo(true);
      } else {
        setShowInfo(false);
        toast.error("No employee data found.");
        return;
      }

      // Fetch attendance data
      const resAttendance = await getAPI(`/get-employee-attendance-details/${id}/${employeeId}`);
      if (!resAttendance.hasError && resAttendance.data?.data?.attendance) {
        setAttendanceData(resAttendance.data.data.attendance);
      } else {
        setAttendanceData({});
        toast.error("Attendance data not found.");
        return;
      }

      setShowForm(false); // Reset showForm until user filters again
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred while fetching data.");
    }
  };

  const handleProceed = (type) => {
    setFilterType(type);
    setShowForm(true);

    if (type === 'month') {
      const monthIndex = moment().month(month).format("MM");
      const key = `${year}-${monthIndex}`;
      const records = attendanceData[key] || [];
      setFilteredRecords(records);
    }

    if (type === 'custom') {
      const allRecords = Object.values(attendanceData).flat();
      const filtered = allRecords.filter(entry => {
        const entryDate = moment(entry.date);
        return entryDate.isBetween(fromDate, toDate, 'day', '[]');
      });
      setFilteredRecords(filtered);
    }
  };

  const calculateHours = (inTime, outTime) => {
    const start = moment(inTime, "HH:mm");
    const end = moment(outTime, "HH:mm");
    let duration = moment.duration(end.diff(start));

    if (duration.asMinutes() < 0) {
      duration = moment.duration(end.add(1, 'day').diff(start));
    }

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="container">
      <div className="card m-2">
        <div className="card-body custom-heading-padding">
          <div className="card-header d-flex align-items-center justify-content-between mb-2">
            <div className="flex-grow-1 text-center">
              <h4 className="payroll-title mb-0">Attendance Report</h4>
            </div>
            <Link className="text-primary text-end ms-3">
              Export <i className="bx bx-export ms-1"></i>
            </Link>
          </div>

          {/* Employee ID Input */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Employee ID <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFetchEmployeeData}
              >
                Proceed
              </button>
            </div>
          </div>

          {showInfo && (
            <>
              {/* Employee Info */}
              <div className="row salary-slip-box m-0 mb-2">
                <div className="col-md-7">
                  <p className='text-dark payroll-box-text my-2'>
                    <strong>Employee ID :</strong> {employeeId}
                  </p>
                </div>
                <div className="col-md-5">
                  <p className='text-dark payroll-box-text my-2'>
                    <strong>Employee Name :</strong> {employeeName}
                  </p>
                </div>
              </div>

              {/* Filter Options */}
              <div className="row border border-dark m-0 my-2">
                {/* Filter by Month */}
                <div className="col-md-6 border border-dark">
                  <p className='text-dark payroll-box-text my-2'><strong>By Months :</strong></p>
                  <div className="d-flex flex-wrap fw-bold align-items-center payroll-table-body gap-3">
                    <label className="mb-0 fw-bold payroll-box-text">Year :</label>
                    <select className="custom-select" value={year} onChange={(e) => setYear(e.target.value)}>
                      {[2025, 2026, 2027, 2028].map(y => <option key={y}>{y}</option>)}
                    </select>

                    <label className="mb-0 payroll-box-text fw-bold">Month :</label>
                    <select className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
                      {moment.months().map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="text-end my-2">
                    <button
                      type="button"
                      className={`btn btn-primary custom-submit-button ${showForm ? 'd-none' : ''}`}
                      onClick={() => handleProceed('month')}
                    >
                      Show Attendance
                    </button>
                  </div>
                </div>

                {/* Filter by Date Range */}
                <div className="col-md-6 border border-dark">
                  <p className='text-dark payroll-box-text my-2'><strong>By Date :</strong></p>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Date From <span className="text-danger">*</span></label>
                      <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Date To <span className="text-danger">*</span></label>
                      <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </div>
                  </div>
                  <div className="text-end my-2">
                    <button
                      type="button"
                      className={`btn btn-primary custom-submit-button ${showForm ? 'd-none' : ''}`}
                      onClick={() => handleProceed('custom')}
                    >
                      Show Attendance
                    </button>
                  </div>
                </div>
              </div>

              {/* Attendance Table */}
              {showForm && (
                <div className="table-responsive my-4">
                  <table className="table border text-dark border-dark mb-4">
                    <thead>
                      <tr className='payroll-table-header'>
                        <th className="text-center border border-dark p-2">Date</th>
                        <th className="text-center border border-dark p-2">Day</th>
                        <th className="text-center border border-dark p-2">In Time</th>
                        <th className="text-center border border-dark p-2">Out Time</th>
                        <th className="text-center border border-dark p-2">No. of Hours</th>
                        <th className="text-center border border-dark p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.length > 0 ? filteredRecords.map((record, index) => (
                        <tr key={index} className='payroll-table-body'>
                          <td className="text-center border border-dark p-2">{moment(record.date).format("DD-MM-YYYY")}</td>
                          <td className="text-center border border-dark p-2">{moment(record.date).format("dddd")}</td>
                          <td className="text-center border border-dark p-2">{record.inTime || "-"}</td>
                          <td className="text-center border border-dark p-2">{record.outTime || "-"}</td>
                          <td className="text-center border border-dark p-2">
                            {record.inTime && record.outTime
                              ? calculateHours(record.inTime, record.outTime)
                              : "-"}
                          </td>
                          <td className="text-center border border-dark p-2">
                            {record.dateStatus === "present" ? "✅ Present" :
                              record.dateStatus === "leave" ? "🟡 Leave" :
                                record.dateStatus === "weekend" ? "🟠 Weekend" : "❌ Absent"}
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="6" className="text-center p-3">No records found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeAttendanceReports;
