import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../../api/getAPI';
import moment from 'moment';

const OvertimeAllowanceReport = () => {
  const [schoolId, setSchoolId] = useState('');
  const [academicYear] = useState('2025-26');
  const [year, setYear] = useState(moment().year());
  const [month, setMonth] = useState(moment().format('MM'));
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (userDetails?.schoolId) {
      setSchoolId(userDetails.schoolId);
      fetchByMonth(userDetails.schoolId, year, month);
    }
  }, []);

  const fetchByMonth = async (schoolId, year, month) => {
    try {
      const res = await getAPI(`/approve-overtime?schoolId=${schoolId}&academicYear=${academicYear}&year=${year}&month=${month}`);
      if (res?.data?.hasError === false) {
        setFilteredRecords(res.data.data);
      } else {
        toast.error("Failed to fetch report");
      }
    } catch (error) {
      toast.error("Server error while fetching report");
    }
  };

  const handleProceed = async () => {
    if (!fromDate || !toDate) {
      toast.error("Please select both dates");
      return;
    }

    try {
      const res = await getAPI(`/approve-overtime?schoolId=${schoolId}&academicYear=${academicYear}&fromDate=${fromDate}&toDate=${toDate}`);
      if (res?.data?.hasError === false) {
        setFilteredRecords(res.data.data);
      } else {
        toast.error("Failed to fetch report");
      }
    } catch (error) {
      toast.error("Server error while fetching report");
    }
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    const [year, month, day] = iso.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container-fluid">
      <div className="card m-2">
        <div className="card-body custom-heading-padding">
          <div className="card-header d-flex align-items-center justify-content-between mb-2">
            <div className="flex-grow-1 text-center">
              <h4 className="payroll-title mb-0">Overtime Allowance Report</h4>
            </div>
            <button className="btn btn-outline-primary">Export</button>
          </div>

          <div className="row border border-dark m-0 my-2">
            <div className="col-md-6 border border-dark">
              <p className='text-dark payroll-box-text my-2'><strong>By Month :</strong></p>
              <div className="d-flex flex-wrap fw-bold align-items-center gap-3">
                <label className="fw-bold">Year :</label>
                <select className="custom-select" value={year} onChange={(e) => {
                  setYear(e.target.value);
                  fetchByMonth(schoolId, e.target.value, month);
                }}>
                  {[2025, 2026, 2027].map(y => <option key={y}>{y}</option>)}
                </select>

                <label className="fw-bold">Month :</label>
                <select className="custom-select" value={month} onChange={(e) => {
                  setMonth(e.target.value);
                  fetchByMonth(schoolId, year, e.target.value);
                }}>
                  {moment.months().map((m, idx) => (
                    <option key={m} value={String(idx + 1).padStart(2, '0')}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-6 border border-dark">
              <p className='text-dark payroll-box-text my-2'><strong>By Date :</strong></p>
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Date From</label>
                  <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Date To</label>
                  <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
              </div>
              <div className="text-end my-2">
                <button className="btn btn-primary" onClick={handleProceed}>Show Report</button>
              </div>
            </div>
          </div>

          <div className="table-responsive my-4">
            <table className="table border text-dark border-dark mb-4">
              <thead>
                <tr className='payroll-table-header'>
                  <th className="text-center border border-dark p-2">Date</th>
                  <th className="text-center border border-dark p-2">Employee ID</th>
                  <th className="text-center border border-dark p-2">Employee Name</th>
                  <th className="text-center border border-dark p-2">From - To</th>
                  <th className="text-center border border-dark p-2">Overtime Hours</th>
                  <th className="text-center border border-dark p-2">Rate</th>
                  <th className="text-center border border-dark p-2">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((rec, idx) => (
                    <tr key={idx} className='payroll-table-body'>
                      <td className="text-center border border-dark p-2">{formatDate(rec.overtimeDate)}</td>
                      <td className="text-center border border-dark p-2">{rec.employeeId}</td>
                      <td className="text-center border border-dark p-2">{rec.employeeName || "N/A"}</td>
                      <td className="text-center border border-dark p-2">{rec.fromTime} - {rec.toTime}</td>
                      <td className="text-center border border-dark p-2">{rec.totalHours}</td>
                      <td className="text-center border border-dark p-2">{rec.rate}</td>
                      <td className="text-center border border-dark p-2">{rec.calculatedAmount}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="7" className="text-center border border-dark p-2">No records found</td></tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OvertimeAllowanceReport;
