import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import { Link } from 'react-router-dom';
import moment from 'moment';

const EmployeeAttendanceReport = () => {
    const [showForm, setShowForm] = useState(false);
    const [filterType, setFilterType] = useState(null);
    const [schoolId, setSchoolId] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [employeeName, setEmployeeName] = useState(null);
    const [attendanceData, setAttendanceData] = useState({});
    const [filteredRecords, setFilteredRecords] = useState([]);
 
    const [year, setYear] = useState(moment().format("YYYY"));
    const [month, setMonth] = useState(moment().format("MMMM"));

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    const empId = userDetails?.userId;
    const empName = userDetails?.employeeName;

    if (!id || !empId) return toast.error("Authentication details missing");

    setSchoolId(id);
    setEmployeeId(empId);
    setEmployeeName(empName);
  }, []);

  const handleProceed = async (type) => {
    setFilterType(type);
    setShowForm(true);

    let url = `/employee-attendance-report/${schoolId}/${employeeId}`;
    if (type === 'month') {
      const key = `${year}-${moment().month(month).format("MM")}`;
      url += `?month=${key}`;
    } else {
      url += `?from=${fromDate}&to=${toDate}`;
    }
    try {
      const res = await getAPI(url);
      
      if (!res.hasError) setFilteredRecords(res.data.data);
      else toast.error(res.message);
    } catch {
      toast.error("Error loading attendance");
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
                            Export
                            <i className="bx bx-export ms-1"></i>
                        </Link>
                    </div>

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
                                    {[2025, 2026, 2027, 2028].map(y => <option key={y}>{y}</option>)}
                                </select>

                                <label className="mb-0 payroll-box-text fw-bold">Month :</label>
                                <select className="custom-select" value={month} onChange={(e) => setMonth(e.target.value)}>
                                    {moment.months().map(m => <option key={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className="text-end my-2">
                                <button type="button" className={`btn btn-primary custom-submit-button ${showForm ? 'd-none' : ''}`} onClick={() => handleProceed('month')}>
                                    Show Attendance
                                </button>
                            </div>
                        </div>

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
                                <button type="button" className={`btn btn-primary custom-submit-button ${showForm ? 'd-none' : ''}`} onClick={() => handleProceed('custom')}>
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
                                                        record.dateStatus === "weekend" ? "🟠 Weekend" :
                                                         record.dateStatus === "holiday" ? "🟠 Holiday":"❌ Absent"}
                                         </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="6" className="text-center p-3">No records found</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeAttendanceReport;
