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
// import React, { useState } from 'react';
// import { toast } from "react-toastify";
// import getAPI from "../../../../../../api/getAPI";
// import { Link } from 'react-router-dom';
// import moment from 'moment';

// const ViewEmployeeAttendanceReports = () => {
//   const [showInfo, setShowInfo] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [filterType, setFilterType] = useState(null);

//   const [schoolId, setSchoolId] = useState(null);
//   const [employeeId, setEmployeeId] = useState('');
//   const [employeeName, setEmployeeName] = useState('');
//   const [attendanceData, setAttendanceData] = useState({});
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [filteredRecords, setFilteredRecords] = useState([]);

//   const [year, setYear] = useState(moment().format("YYYY"));
//   const [month, setMonth] = useState(moment().format("MMMM"));
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const handleFetchEmployeeData = async () => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;

//     if (!employeeId || !id) {
//       toast.error("Employee ID and School ID are required.");
//       return;
//     }
//     setSchoolId(id);
    
//     try {
//       // Fetch employee basic details
//       const resEmp = await getAPI(`/get-employee-details/${id}/${employeeId}/${academicYear}`);
//       if (!resEmp.hasError && resEmp.data?.data) {
//         setEmployeeName(resEmp.data.data.employeeName || "N/A");
//         setShowInfo(true);
//       } else {
//         setShowInfo(false);
//         toast.error("No employee data found.");
//         return;
//       }

//       // Fetch attendance data
//       const resAttendance = await getAPI(`/get-employee-attendance-details/${id}/${employeeId}`);
//       if (!resAttendance.hasError && resAttendance.data?.data?.attendance) {
//         setAttendanceData(resAttendance.data.data.attendance);
//       } else {
//         setAttendanceData({});
//         toast.error("Attendance data not found.");
//         return;
//       }

//       setShowForm(false); // Reset showForm until user filters again
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error occurred while fetching data.");
//     }
//   };

//   const handleProceed = (type) => {
//     setFilterType(type);
//     setShowForm(true);

//     if (type === 'month') {
//       const monthIndex = moment().month(month).format("MM");
//       const key = `${year}-${monthIndex}`;
//       const records = attendanceData[key] || [];
//       setFilteredRecords(records);
//     }

//     if (type === 'custom') {
//       const allRecords = Object.values(attendanceData).flat();
//       const filtered = allRecords.filter(entry => {
//         const entryDate = moment(entry.date);
//         return entryDate.isBetween(fromDate, toDate, 'day', '[]');
//       });
//       setFilteredRecords(filtered);
//     }
//   };

//   const calculateHours = (inTime, outTime) => {
//     const start = moment(inTime, "HH:mm");
//     const end = moment(outTime, "HH:mm");
//     let duration = moment.duration(end.diff(start));

//     if (duration.asMinutes() < 0) {
//       duration = moment.duration(end.add(1, 'day').diff(start));
//     }

//     const hours = Math.floor(duration.asHours());
//     const minutes = Math.floor(duration.asMinutes()) % 60;

//     return `${hours}h ${minutes}m`;
//   };

//   return (
//     <div className="container">
//       <div className="card m-2">
//         <div className="card-body custom-heading-padding">
//           <div className="card-header d-flex align-items-center justify-content-between mb-2">
//             <div className="flex-grow-1 text-center">
//               <h4 className="payroll-title mb-0">Attendance Report</h4>
//             </div>
//             <Link className="text-primary text-end ms-3">
//               Export <i className="bx bx-export ms-1"></i>
//             </Link>
//           </div>

//           {/* Employee ID Input */}
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <label className="form-label fw-bold">Employee ID <span className="text-danger">*</span></label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={employeeId}
//                 onChange={(e) => setEmployeeId(e.target.value)}
//                 placeholder='Enter Employee ID'
//               />
//             </div>

//             {
//               !showInfo && (
//                 <div className="col-md-6 d-flex align-items-end">
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={handleFetchEmployeeData}
//                     disabled={showInfo}
//                   >
//                     Proceed
//                   </button>
//                 </div>
//               )
//             }
//           </div>

//           {showInfo && (
//             <>
//               {/* Employee Info */}
//               <div className="row salary-slip-box m-0 mb-2">
//                 <div className="col-md-7">
//                   <p className='text-dark payroll-box-text my-2'>
//                     <strong>Employee ID :</strong> {employeeId}
//                   </p>
//                 </div>
//                 <div className="col-md-5">
//                   <p className='text-dark payroll-box-text my-2'>
//                     <strong>Employee Name :</strong> {employeeName}
//                   </p>
//                 </div>
//               </div>


//               <div className="row border border-dark m-0 my-2">
//                 {/* Filter by Month */}
//                 <div className="col-md-6 border border-dark">
//                   <p className='text-dark payroll-box-text my-2'><strong>By Months :</strong></p>
//                   <div className="d-flex flex-wrap fw-bold align-items-center payroll-table-body gap-3">
//                     <label className="mb-0 fw-bold payroll-box-text">Year :</label>
//                     <select className="custom-select" value={year} onChange={(e) => setYear(e.target.value)}>
//                       {[2025, 2026, 2027, 2028].map(y => <option key={y}>{y}</option>)}
//                     </select>

//                     <label className="mb-0 payroll-box-text fw-bold">Month :</label>
//                     <select className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
//                       {moment.months().map(m => <option key={m}>{m}</option>)}
//                     </select>
//                   </div>
//                   <div className="text-end my-2">
//                     <button
//                       type="button"
//                       className={`btn btn-primary custom-submit-button ${showForm ? 'd-none' : ''}`}
//                       onClick={() => handleProceed('month')}
//                     >
//                       Show Attendance
//                     </button>
//                   </div>
//                 </div>

//                 {/* Filter by Date Range */}
//                 <div className="col-md-6 border border-dark">
//                   <p className='text-dark payroll-box-text my-2'><strong>By Date :</strong></p>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">Date From <span className="text-danger">*</span></label>
//                       <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">Date To <span className="text-danger">*</span></label>
//                       <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
//                     </div>
//                   </div>
//                   <div className="text-end my-2">
//                     <button
//                       type="button"
//                       className={`btn btn-primary custom-submit-button ${showForm ? 'd-none' : ''}`}
//                       onClick={() => handleProceed('custom')}
//                     >
//                       Show Attendance
//                     </button>
//                   </div>
//                 </div>
//               </div>


//               {showForm && (
//                 <div className="table-responsive my-4">
//                   <table className="table border text-dark border-dark mb-4">
//                     <thead>
//                       <tr className='payroll-table-header'>
//                         <th className="text-center border border-dark p-2">Date</th>
//                         <th className="text-center border border-dark p-2">Day</th>
//                         <th className="text-center border border-dark p-2">In Time</th>
//                         <th className="text-center border border-dark p-2">Out Time</th>
//                         <th className="text-center border border-dark p-2">No. of Hours</th>
//                         <th className="text-center border border-dark p-2">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredRecords.length > 0 ? filteredRecords.map((record, index) => (
//                         <tr key={index} className='payroll-table-body'>
//                           <td className="text-center border border-dark p-2">{moment(record.date).format("DD-MM-YYYY")}</td>
//                           <td className="text-center border border-dark p-2">{moment(record.date).format("dddd")}</td>
//                           <td className="text-center border border-dark p-2">{record.inTime || "-"}</td>
//                           <td className="text-center border border-dark p-2">{record.outTime || "-"}</td>
//                           <td className="text-center border border-dark p-2">
//                             {record.inTime && record.outTime
//                               ? calculateHours(record.inTime, record.outTime)
//                               : "-"}
//                           </td>
//                           <td className="text-center border border-dark p-2">
//                             {record.dateStatus === "present" ? "✅ Present" :
//                               record.dateStatus === "leave" ? "🟡 Leave" :
//                                 record.dateStatus === "weekend" ? "🟠 Weekend" : "❌ Absent"}
//                           </td>
//                         </tr>
//                       )) : (
//                         <tr><td colSpan="6" className="text-center p-3">No records found</td></tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewEmployeeAttendanceReports;
// import React, { useState, useEffect } from 'react';
// import { toast } from "react-toastify";
// import getAPI from "../../../../../../api/getAPI";
// import { Link } from 'react-router-dom';
// import moment from 'moment';

// const ViewEmployeeAttendanceReports = () => {
//     const [showForm, setShowForm] = useState(true); 
//     const [filterType, setFilterType] = useState('month'); 
//     const [schoolId, setSchoolId] = useState(null);
//     const [employeeId, setEmployeeId] = useState('');
//     const [employeeName, setEmployeeName] = useState('');
//     const [attendanceData, setAttendanceData] = useState({});
//     const [filteredRecords, setFilteredRecords] = useState([]);
//     const [academicYear, setAcademicYear] = useState('2025-26');

//     const [year, setYear] = useState(moment().format("YYYY"));
//     const [month, setMonth] = useState(moment().format("MMMM"));
//     const [fromDate, setFromDate] = useState(moment().startOf('month').format("YYYY-MM-DD"));
//     const [toDate, setToDate] = useState(moment().endOf('month').format("YYYY-MM-DD"));

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//         const id = userDetails?.schoolId;
//         setSchoolId(id);
//     }, []);

//     const handleFetchEmployeeData = async () => {
//         if (!employeeId || !schoolId) {
//             toast.error("Employee ID and School ID are required.");
//             return;
//         }
        
//         try {
//             // Fetch employee basic details
//             const resEmp = await getAPI(`/get-employee-details/${schoolId}/${employeeId}/${academicYear}`);
            
//             if (!resEmp.hasError && resEmp.data?.data?.employeeInfo) {
//                 setEmployeeName(resEmp.data.data.employeeInfo.employeeName || "N/A");
                
//                 // Fetch and show current month's data by default
//                 await handleProceed('month');
//             } else {
//                 toast.error("No employee data found.");
//                 return;
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Error occurred while fetching data.");
//         }
//     };

//     const handleProceed = async (type) => {
        

//         setFilterType(type);
//         setShowForm(true);

//         try {
//             let url = `/employee-attendance-report/${schoolId}/${employeeId}`;
//             let params = {};

//             if (type === 'month') {
//                 const monthKey = `${year}-${moment().month(month).format("MM")}`;
//                 params = { month: monthKey };
//             } else if (type === 'custom') {
//                 if (!fromDate || !toDate) {
//                     toast.error("Please select both from and to dates");
//                     return;
//                 }
//                 params = { from: fromDate, to: toDate };
//             }

//             const res = await getAPI(url, { params });
            
//             if (!res.hasError && res.data?.data) {
//                 setFilteredRecords(Array.isArray(res.data.data) ? res.data.data : []);
//             } else {
//                 toast.error(res.message || "No attendance records found");
//                 setFilteredRecords([]);
//             }
//         } catch (error) {
//             toast.error("Error loading attendance data");
//             setFilteredRecords([]);
//         }
//     };

//     // Automatically fetch data when month/year changes
//     useEffect(() => {
//         if (employeeName && filterType === 'month') {
//             handleProceed('month');
//         }
//     }, [month, year]);

//     // Automatically fetch data when date range changes
//     useEffect(() => {
//         if (employeeName && filterType === 'custom' && fromDate && toDate) {
//             handleProceed('custom');
//         }
//     }, [fromDate, toDate]);

//     const calculateHours = (inTime, outTime) => {
//         if (!inTime || !outTime) return "-";
        
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
//                             Export <i className="bx bx-export ms-1"></i>
//                         </Link>
//                     </div>

//                     {/* Employee ID Input */}
//                     <div className="row mb-3">
//                         <div className="col-md-6">
//                             <label className="form-label fw-bold">Employee ID <span className="text-danger">*</span></label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 value={employeeId}
//                                 onChange={(e) => setEmployeeId(e.target.value)}
//                                 placeholder='Enter Employee ID'
//                             />
//                         </div>
//                         <div className="col-md-6 d-flex align-items-end">
//                             <button
//                                 type="button"
//                                 className="btn btn-primary"
//                                 onClick={handleFetchEmployeeData}
//                                 disabled={!employeeId}
//                             >
//                                 Proceed
//                             </button>
//                         </div>
//                     </div>

//                     {employeeName && (
//                         <>
//                             {/* Employee Info */}
//                             <div className="row salary-slip-box m-0 mb-2">
//                                 <div className="col-md-7">
//                                     <p className='text-dark payroll-box-text my-2'>
//                                         <strong>Employee ID :</strong> {employeeId}
//                                     </p>
//                                 </div>
//                                 <div className="col-md-5">
//                                     <p className='text-dark payroll-box-text my-2'>
//                                         <strong>Employee Name :</strong> {employeeName}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="row border border-dark m-0 my-2">
//                                 {/* Filter by Month */}
//                                 <div className="col-md-6 border border-dark">
//                                     <p className='text-dark payroll-box-text my-2'><strong>By Months :</strong></p>
//                                     <div className="d-flex flex-wrap fw-bold align-items-center payroll-table-body gap-3">
//                                         <label className="mb-0 fw-bold payroll-box-text">Year :</label>
//                                         <select className="custom-select" value={year} onChange={(e) => setYear(e.target.value)}>
//                                             {[2025, 2026, 2027, 2028].map(y => (
//                                                 <option key={y} value={y}>{y}</option>
//                                             ))}
//                                         </select>

//                                         <label className="mb-0 payroll-box-text fw-bold">Month :</label>
//                                         <select className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
//                                             {moment.months().map(m => (
//                                                 <option key={m} value={m}>{m}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>

//                                 {/* Filter by Date Range */}
//                                 <div className="col-md-6 border border-dark">
//                                     <p className='text-dark payroll-box-text my-2'><strong>By Date :</strong></p>
//                                     <div className="row">
//                                         <div className="col-md-6">
//                                             <label className="form-label fw-bold">Date From <span className="text-danger">*</span></label>
//                                             <input 
//                                                 type="date" 
//                                                 className="form-control" 
//                                                 value={fromDate} 
//                                                 onChange={(e) => {
//                                                     setFromDate(e.target.value);
//                                                     setFilterType('custom');
//                                                 }}
//                                                 max={toDate || moment().format("YYYY-MM-DD")}
//                                             />
//                                         </div>
//                                         <div className="col-md-6">
//                                             <label className="form-label fw-bold">Date To <span className="text-danger">*</span></label>
//                                             <input 
//                                                 type="date" 
//                                                 className="form-control" 
//                                                 value={toDate} 
//                                                 onChange={(e) => {
//                                                     setToDate(e.target.value);
//                                                     setFilterType('custom');
//                                                 }}
//                                                 min={fromDate}
//                                                 max={moment().format("YYYY-MM-DD")}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {showForm && (
//                                 <div className="table-responsive my-4">
//                                     <table className="table border text-dark border-dark mb-4">
//                                         <thead>
//                                             <tr className='payroll-table-header'>
//                                                 <th className="text-center border border-dark p-2">Date</th>
//                                                 <th className="text-center border border-dark p-2">Day</th>
//                                                 <th className="text-center border border-dark p-2">In Time</th>
//                                                 <th className="text-center border border-dark p-2">Out Time</th>
//                                                 <th className="text-center border border-dark p-2">No. of Hours</th>
//                                                 <th className="text-center border border-dark p-2">Status</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {filteredRecords.length > 0 ? (
//                                                 filteredRecords.map((record, index) => (
//                                                     <tr key={index} className='payroll-table-body'>
//                                                         <td className="text-center border border-dark p-2">
//                                                             {record.date ? moment(record.date).format("DD-MM-YYYY") : "-"}
//                                                         </td>
//                                                         <td className="text-center border border-dark p-2">
//                                                             {record.date ? moment(record.date).format("dddd") : "-"}
//                                                         </td>
//                                                         <td className="text-center border border-dark p-2">{record.inTime || "-"}</td>
//                                                         <td className="text-center border border-dark p-2">{record.outTime || "-"}</td>
//                                                         <td className="text-center border border-dark p-2">
//                                                             {calculateHours(record.inTime, record.outTime)}
//                                                         </td>
//                                                         <td className="text-center border border-dark p-2">
//                                                             {record.dateStatus === "present" ? "✅ Present" :
//                                                              record.dateStatus === "leave" ? "🟡 Leave" :
//                                                              record.dateStatus === "weekend" ? "🟠 Weekend" : 
//                                                              record.dateStatus === "holiday" ? "🟠 Holiday" : "❌ Absent"}
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             ) : (
//                                                 <tr>
//                                                     <td colSpan="6" className="text-center p-3">
//                                                         No attendance records found for the selected period
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewEmployeeAttendanceReports;


import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import { Link } from 'react-router-dom';
import moment from 'moment';

const ViewEmployeeAttendanceReports = () => {
    const [showForm, setShowForm] = useState(true);
    const [filterType, setFilterType] = useState('month');
    const [schoolId, setSchoolId] = useState(null);
    const [employeeId, setEmployeeId] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [academicYear, setAcademicYear] = useState('');
    const [year, setYear] = useState(moment().format("YYYY"));
    const [month, setMonth] = useState(moment().format("MMMM"));
    const [fromDate, setFromDate] = useState(moment().startOf('month').format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState(moment().endOf('month').format("YYYY-MM-DD"));

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const id = userDetails?.schoolId;
        setSchoolId(id);

        const academicYear = localStorage.getItem("selectedAcademicYear");
        setAcademicYear(academicYear);

    }, []);

    const handleFetchEmployeeData = async () => {
        if (!employeeId || !schoolId) {
            toast.error("Employee ID and School ID are required.");
            return;
        }
        try {
            const resEmp = await getAPI(`/get-employee-details/${schoolId}/${employeeId}/${academicYear}`);
            
            if (!resEmp.hasError && resEmp.data?.data?.employeeInfo) {
                setEmployeeName(resEmp.data.data.employeeInfo.employeeName || "N/A");
                await handleProceed('month');
            } else {
                toast.error("No employee data found.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while fetching data.");
        }
    };

    const handleProceed = async (type) => {
        setFilterType(type);
        setShowForm(true);

        let url = `/employee-attendance-report/${schoolId}/${employeeId}`;
        if (type === 'month') {
            const key = `${year}-${moment().month(month).format("MM")}`;
            url += `?month=${key}`;
        } else {
            if (!fromDate || !toDate) {
                toast.error("Please select both from and to dates");
                return;
            }
            if (moment(toDate).isBefore(fromDate)) {
                toast.error("To Date cannot be before From Date");
                return;
            }
            url += `?from=${fromDate}&to=${toDate}`;
        }

        try {
            const res = await getAPI(url);
            if (!res.hasError && res.data?.data) {
                setFilteredRecords(Array.isArray(res.data.data) ? res.data.data : []);
            } else {
                toast.error(res.message || "No attendance records found");
                setFilteredRecords([]);
            }
        } catch {
            toast.error("Error loading attendance");
            setFilteredRecords([]);
        }
    };

    const calculateHours = (inTime, outTime) => {
        if (!inTime || !outTime) return "-";
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

    const isDateRangeInvalid = !fromDate || !toDate || moment(toDate).isBefore(fromDate);

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

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label fw-bold">Employee ID <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                placeholder='Enter Employee ID'
                            />
                        </div>
                        <div className="col-md-6 d-flex align-items-end">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleFetchEmployeeData}
                                disabled={!employeeId}
                            >
                                Proceed
                            </button>
                        </div>
                    </div>

                    {employeeName && (
                        <>
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

                            <div className="row border border-dark m-0 my-2">
                                <div className="col-md-6 border border-dark">
                                    <p className='text-dark payroll-box-text my-2'><strong>By Months :</strong></p>
                                    <div className="d-flex flex-wrap fw-bold align-items-center payroll-table-body gap-3">
                                        <label className="mb-0 fw-bold payroll-box-text">Year :</label>
                                        <select className="custom-select" value={year} onChange={(e) => setYear(e.target.value)}>
                                            {[2025, 2026, 2027, 2028].map(y => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                        <label className="mb-0 payroll-box-text fw-bold">Month :</label>
                                        <select className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
                                            {moment.months().map(m => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="text-end my-2">
                                        <button
                                            type="button"
                                            className={`btn btn-primary custom-submit-button ${showForm && filterType === 'month' ? 'd-none' : ''}`}
                                            onClick={() => handleProceed('month')}
                                        >
                                            Show Attendance
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-6 border border-dark">
                                    <p className='text-dark payroll-box-text my-2'><strong>By Date :</strong></p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Date From <span className="text-danger">*</span></label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                value={fromDate} 
                                                onChange={(e) => setFromDate(e.target.value)}
                                                max={moment().format("YYYY-MM-DD")}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Date To <span className="text-danger">*</span></label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                value={toDate} 
                                                onChange={(e) => setToDate(e.target.value)}
                                                max={moment().format("YYYY-MM-DD")}
                                            />
                                            <small className="text-muted">
                                                To Date should be on/after From Date.
                                            </small>
                                        </div>
                                    </div>
                                    <div className="text-end my-2">
                                        <button
                                            type="button"
                                            className={`btn btn-primary custom-submit-button ${showForm && filterType === 'custom' ? 'd-none' : ''}`}
                                            onClick={() => handleProceed('custom')}
                                            disabled={isDateRangeInvalid}
                                            title={
                                                isDateRangeInvalid
                                                    ? "Select valid From/To dates (To Date ≥ From Date)"
                                                    : "Show attendance for selected date range"
                                            }
                                        >
                                            Show Attendance
                                        </button>
                                    </div>
                                </div>
                            </div>

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
                                            {filteredRecords.length > 0 ? (
                                                filteredRecords.map((record, index) => (
                                                    <tr key={index} className='payroll-table-body'>
                                                        <td className="text-center border border-dark p-2">
                                                            {record.date ? moment(record.date).format("DD-MM-YYYY") : "-"}
                                                        </td>
                                                        <td className="text-center border border-dark p-2">
                                                            {record.date ? moment(record.date).format("dddd") : "-"}
                                                        </td>
                                                        <td className="text-center border border-dark p-2">{record.inTime || "-"}</td>
                                                        <td className="text-center border border-dark p-2">{record.outTime || "-"}</td>
                                                        <td className="text-center border border-dark p-2">
                                                            {calculateHours(record.inTime, record.outTime)}
                                                        </td>
                                                        <td className="text-center border border-dark p-2">
                                                            {record.dateStatus === "present" ? "✅ Present" :
                                                             record.dateStatus === "leave" ? "🟡 Leave" :
                                                             record.dateStatus === "weekend" ? "🟠 Weekend" : 
                                                             record.dateStatus === "holiday" ? "🟠 Holiday" : "❌ Absent"}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center p-3">
                                                        No attendance records found for the selected period
                                                    </td>
                                                </tr>
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