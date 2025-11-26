import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../../api/getAPI';
 
const EmployeeLeaveRecords = () => {
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [academicYear, setAcademicYear] = useState('');
  const [showLeaveRecords, setShowLeaveRecords] = useState(false);
  const [showLeaveReport, setShowLeaveReport] = useState(false);
  const [reportFilters, setReportFilters] = useState({ from: '', to: '' });
  const [leaveReport, setLeaveReport] = useState([]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('Authentication details missing');
      return;
    }
    setSchoolId(userDetails.schoolId);
    const academicYear = localStorage.getItem("selectedAcademicYear");
    setAcademicYear(academicYear);
  }, []);

  const fetchEmployeeData = async (schoolId, employeeId, academicYear) => {
    try {
       
      const employeeRes = await getAPI(`/get-employee-details/${schoolId}/${employeeId}/${academicYear}`);
      console.log("fetchEmployeeData employeeRes", employeeRes);
      // const employeeRes = await getAPI(`/get-employee-details/${schoolId}/${empId}`);
      if (!employeeRes.hasError && employeeRes.data?.data?.employeeInfo) {
       console.log("setEmployeeDetails",setEmployeeDetails(employeeRes.data.data.employeeInfo));
        // setEmployeeDetails(employeeRes.data.data);
      } else {
        toast.error(employeeRes.message || 'Failed to fetch employee details');
        return;
      }

      const leaveRes = await getAPI(`/getall-payroll-annual-leave/${schoolId}?academicYear=${academicYear}`);
      console.log("leaveRes",leaveRes);
      
      const summaryRes = await getAPI(`/employee-leave-summary/${schoolId}/${employeeId}/${academicYear}`);
      console.log("summaryRes",summaryRes);
      
      let summaryData = summaryRes?.data?.data || {};
      // let carryForwardMap = summaryRes?.data?.carryForwardDays || {};
      let leaveList = leaveRes?.data?.data?.ctcComponent || [];

      console.log("summary res", summaryRes);
      const merged = leaveList.map(item => {
        const type = item.annualLeaveTypeName;
        const entitled = item.days || 0;
        const availedLeave = summaryData[type]?.availedLeave || 0;
        const pendingApproval = summaryData[type]?.pendingApproval || 0;
        const carryForward = item.isCarryForward ? (summaryData[type]?.carryForward || 0) : 0;
        const mandatoryExpiredLeaves = summaryData[type]?.mandatoryExpiredLeaves || 0;

        let maxToBeExpired = 0;
        if (item.isCarryForward) {
          maxToBeExpired = Math.max(availedLeave, mandatoryExpiredLeaves);
        }

        const balanceLeave = (entitled + carryForward) - availedLeave;

        return {
          ...item,
          availedLeave,
          pendingApproval,
          carryForward,
          maxToBeExpired,
          balanceLeave,
        };
      });

      setLeaveTypes(merged);

      const historyRes = await getAPI(`/get-employee-leave/${schoolId}/${employeeId}`);
      const leaves = historyRes?.data?.data?.leaveRecords?.[academicYear] || [];
      setLeaveHistory(leaves);
    } catch (error) {
      toast.error('Failed to fetch leave details');
    }
  };

  const handleProceed = async () => {
    console.log("employeeID",employeeId);
    
    if (!employeeId) {
      toast.error('Please enter an Employee ID');
      return;
    }
    setShowLeaveRecords(true);
    await fetchEmployeeData(schoolId, employeeId, academicYear);
  };

  const handleGenerateReport = async () => {
    if (!reportFilters.from || !reportFilters.to) {
      toast.error("Please select both From and To dates");
      return;
    }
    try {
      const res = await getAPI(
        `/approved-leaves/${schoolId}/${employeeId}?fromDate=${reportFilters.from}&toDate=${reportFilters.to}&academicYear=${academicYear}`
      );
      if (!res.hasError) {
        setLeaveReport(res.data.data);
        setShowLeaveReport(true);
      } else {
        setLeaveReport([]);
        setShowLeaveReport(false);
        toast.error(res.message || "Failed to fetch report");
      }
    } catch (err) {
      setShowLeaveReport(false);
      toast.error("Server error while generating report");
    }
  };

  const calculateTotals = () => {
    return leaveTypes.reduce((acc, leave) => ({
      carryForward: acc.carryForward + (leave.carryForward || 0),
      entitledLeave: acc.entitledLeave + (leave.days || 0),
      availedLeave: acc.availedLeave + (leave.availedLeave || 0),
      maxToBeExpired: acc.maxToBeExpired + (leave.isCarryForward ? leave.maxToBeExpired || 0 : 0),
      balanceLeave: acc.balanceLeave + ((leave.days || 0) + (leave.carryForward || 0) - (leave.availedLeave || 0)),
      pendingApproval: acc.pendingApproval + (leave.pendingApproval || 0),
    }), {
      carryForward: 0,
      entitledLeave: 0,
      availedLeave: 0,
      maxToBeExpired: 0,
      balanceLeave: 0,
      pendingApproval: 0
    });
  };

  const totals = calculateTotals();

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="payroll-title text-center">Leave Records</h4>
                  </div>
                </div>
                <form>
                  <div className="row mb-3">

                    <div className="col-md-6">
                      <label htmlFor="employeeID" className="form-label">
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeID"
                        className="form-control"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        disabled={showLeaveRecords}
                        readOnly={showLeaveRecords}
                        placeholder="Enter Employee ID"
                      />
                    </div>
                    {!showLeaveRecords && (
                      <div className="col-md-2 d-flex align-items-end">
                        <button
                          type="button"
                          className="btn btn-primary custom-submit-button"
                          onClick={handleProceed}
                        >
                          Proceed
                        </button>
                      </div>
                    )}
                  </div>
                </form>
                {showLeaveRecords && (
                  <>

                    <div className="row m-0 salary-slip-box pt-2 my-2">
                      <div className="col-md-8">
                        <p className="text-dark payroll-box-text">
                          <strong>Employee ID: </strong> {employeeId || 'N/A'}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="text-dark payroll-box-text">
                          <strong>Employee Name: </strong> {employeeDetails.employeeName || 'N/A'}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="text-dark payroll-box-text">
                          <strong>Grade: </strong> {employeeDetails.grade || 'N/A'}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="text-dark payroll-box-text">
                          <strong>Year: </strong> {academicYear}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="text-dark payroll-box-text">
                          <strong>Job Designation: </strong> {employeeDetails.jobDesignation || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="container ps-0">
                      <div className="card-header px-0 mb-1">
                        <h4 className="text-start mb-0 payroll-title">Leave Balance:</h4>
                      </div>
                    </div>
                    <div className="table-responsive pb-4">
                      <table className="table text-dark border border-dark mb-1">
                        <thead>
                          <tr className="payroll-table-header">
                            <th className="text-center align-content-center border border-dark p-2">Leave Type</th>
                            <th className="text-center align-content-center border border-dark p-2">Carry Forward</th>
                            <th className="text-center align-content-center border border-dark p-2">Entitled Leave</th>
                            <th className="text-center align-content-center border border-dark p-2">Availed Leave</th>
                            {/* <th className="text-center align-content-center border border-dark p-2">Maximum to be Expired</th> */}
                            <th className="text-center align-content-center border border-dark p-2">Balance Leave</th>
                            <th className="text-center align-content-center border border-dark p-2">Leave Pending for Approval</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaveTypes.map((leave, index) => (
                            <tr key={leave._id || index} className="payroll-table-body">
                              <td className="text-center align-content-center border border-dark p-2">
                                {leave.annualLeaveTypeName}
                              </td>
                              <td className="text-end align-content-center border border-dark p-2">
                                {leave.isCarryForward ? leave.carryForward || 0 : "-"}
                              </td>
                              <td className="text-end align-content-center border border-dark p-2">
                                {leave.days || 0}
                              </td>
                              <td className="text-end align-content-center border border-dark p-2">
                                {leave.availedLeave || 0}
                              </td>

                              {/* <td className="text-end align-content-center border border-dark p-2">
                                {leave.isCarryForward ? leave.maxToBeExpired : "-"}
                              </td> */}
                              <td className="text-end align-content-center border border-dark p-2">
                                {(leave.days || 0) + (leave.carryForward || 0) - (leave.availedLeave || 0)}
                              </td>
                              <td className="text-end align-content-center border border-dark p-2">
                                {leave.pendingApproval || 0}
                              </td>
                            </tr>
                          ))}
                          <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                            <td className="text-center align-content-center fw-bold border border-dark p-2">
                              Total Leave
                            </td>
                            <td className="text-end align-content-center fw-bold border border-dark p-2">
                              {totals.carryForward}
                            </td>
                            <td className="text-end align-content-center fw-bold border border-dark p-2">
                              {totals.entitledLeave}
                            </td>
                            <td className="text-end align-content-center fw-bold border border-dark p-2">
                              {totals.availedLeave}
                            </td>
                            {/* <td className="text-end align-content-center fw-bold border border-dark p-2">
                              {totals.maxToBeExpired}
                            </td> */}
                            <td className="text-end align-content-center fw-bold border border-dark p-2">
                              {totals.balanceLeave}
                            </td>
                            <td className="text-end align-content-center fw-bold border border-dark p-2">
                              {totals.pendingApproval}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="payroll-box-line m-0" />
                    <div className="card-body">
                      <div className="container ps-0">
                        <div className="card-header px-0 mb-1">
                          <h4 className="text-start mb-0 payroll-title">Leave Details:</h4>
                        </div>
                      </div>
                      <div className="table-responsive pb-4">
                        <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                          <thead className="bg-light-subtle">
                            <tr className="payroll-table-header">
                              <th style={{ width: 20 }}>
                                <div className="form-check ms-1">
                                  <input type="checkbox" className="form-check-input" id="customCheck1" />
                                  <label className="form-check-label" htmlFor="customCheck1" />
                                </div>
                              </th>
                              <th>Type of Leave</th>
                              <th>Apply Date</th>
                              <th>From Date</th>
                              <th>To Date</th>
                              <th>Leave Days</th>
                              <th>Status</th>

                            </tr>
                          </thead>
                          <tbody>
                            {leaveHistory.length ? (
                              leaveHistory.map((leave, index) => (
                                <tr key={index}>
                                  <td style={{ width: 20 }}>
                                    <div className="form-check ms-1">
                                      <input type="checkbox" className="form-check-input" id="customCheck1" />
                                      <label className="form-check-label" htmlFor="customCheck1" />
                                    </div>
                                  </td>
                                  <td>{leave.leaveType}</td>
                                  <td>{formatDate(leave.applyDate)}</td>
                                  <td>{formatDate(leave.fromDate)}</td>
                                  <td>{formatDate(leave.toDate)}</td>
                                  <td>{leave.numberOfDays}</td>
                                  <td>{leave.status === "approved"? "Approved" : ""}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8" className="text-center">No leave records found</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="card-footer border-top">
                        <nav aria-label="Page navigation example">
                          <ul className="pagination justify-content-end mb-0">
                            <li className="page-item">
                              <button className="page-link">Previous</button>
                            </li>
                            <li className="page-item">
                              <button className="page-link pagination-button">1</button>
                            </li>
                            <li className="page-item">
                              <button className="page-link">Next</button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                    <div className="payroll-box-line m-0" />
                    <div className="card-body">
                      <div className="container ps-0">
                        <div className="card-header px-0 mb-1">
                          <h4 className="text-center mb-0 payroll-title">Generate Leave Report</h4>
                        </div>
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleGenerateReport();
                        }}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="leaveStartDate" className="form-label">
                                Date From <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                name="from"
                                className="form-control"
                                value={reportFilters.from}
                                onChange={(e) => setReportFilters(prev => ({ ...prev, from: e.target.value }))}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label htmlFor="leaveEndDate" className="form-label">
                                Date To <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                name="to"
                                className="form-control"
                                value={reportFilters.to}
                                onChange={(e) => setReportFilters(prev => ({ ...prev, to: e.target.value }))}
                                required
                              />
                            </div>
                          </div>
                          <div className="text-end">
                            <button
                              type="button"
                              onClick={handleGenerateReport}
                              className="btn btn-primary me-2 custom-submit-button"
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                      </form>
                      {
                        showLeaveReport && (
                          <>
                            <div className="table-responsive py-4">
                              <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                                <thead className="bg-light-subtle">
                                  <tr className="payroll-table-header">
                                    <th style={{ width: 20 }}>
                                      <div className="form-check ms-1">
                                        <input type="checkbox" className="form-check-input" id="customCheck1" />
                                        <label className="form-check-label" htmlFor="customCheck1" />
                                      </div>
                                    </th>
                                    <th>Type of Leave</th>
                                    <th>Apply Date</th>
                                    <th> Date</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {leaveReport.length ? (
                                    leaveReport.map((leave, index) => (
                                      <tr key={index}>
                                        <td style={{ width: 20 }}>
                                          <div className="form-check ms-1">
                                            <input type="checkbox" className="form-check-input" />
                                            <label className="form-check-label" />
                                          </div>
                                        </td>
                                        <td>{leave.leaveType}</td>
                                        <td>{formatDate(leave.applyDate)}</td>
                                        <td>{formatDate(leave.date)}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan="6" className="text-center">No approved leaves found in selected date range</td>
                                    </tr>
                                  )}
                                </tbody>

                              </table>
                            </div>
                            <div className="card-footer border-top">
                              <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-end mb-0">
                                  <li className="page-item">
                                    <button className="page-link">Previous</button>
                                  </li>
                                  <li className="page-item">
                                    <button className="page-link pagination-button">1</button>
                                  </li>
                                  <li className="page-item">
                                    <button className="page-link">Next</button>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          </>
                        )
                      }
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeLeaveRecords;