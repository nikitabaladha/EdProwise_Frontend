import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../../api/getAPI';
import postAPI from '../../../../../../api/postAPI';
import putAPI from '../../../../../../api/putAPI';
import LeaveViewModal from './LeaveViewModal';
import LeaveEditModal from './LeaveEditModal';
import ConfirmationDialog from "../../../../../ConfirmationDialog";
   
const EmployeeLeaveDetailsAndApply = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [academicYear, setAcademicYear] = useState();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [showLeaveReport, setShowLeaveReport] = useState(false)
  const [reportFilters, setReportFilters] = useState({ from: '', to: '' });
  const [leaveReport, setLeaveReport] = useState([]);

  const [formData, setFormData] = useState({
    leaveType: '',
    leaveReason: '',
    fromDate: '',
    toDate: '',
    numberOfDays: 0,
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId || !userDetails?.userId) {
      toast.error('Authentication details missing');
      return;
    }
    setSchoolId(userDetails.schoolId);
    setEmployeeId(userDetails.userId);
    const academicYear = localStorage.getItem("selectedAcademicYear");
    setAcademicYear(academicYear);
    fetchEmployeeData(userDetails.schoolId, userDetails.userId, academicYear);
  }, []);

  const fetchEmployeeData = async (schoolId, empId, academicYear) => {
    try {
      const employeeRes = await getAPI(`/get-employee-details/${schoolId}/${empId}/${academicYear}`);
      console.log("employeeRes", employeeRes);

      if (!employeeRes.hasError && employeeRes.data?.data.employeeInfo) {
        console.log("Set", setEmployeeDetails(employeeRes.data.data.employeeInfo));

        // setEmployeeDetails(employeeRes.data.data.employeeInfo);
      }

      const leaveRes = await getAPI(`/getall-payroll-annual-leave/${schoolId}?academicYear=${academicYear}`);
      const summaryRes = await getAPI(`/employee-leave-summary/${schoolId}/${empId}/${academicYear}`);

      let summaryData = summaryRes?.data?.data || {};
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

      const historyRes = await getAPI(`/get-employee-leave/${schoolId}/${empId}`);
      const leaves = historyRes?.data?.data?.leaveRecords?.[academicYear] || [];
      setLeaveHistory(leaves);

    } catch (error) {
      toast.error("Failed to fetch leave details");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'fromDate' || name === 'toDate') {
      const from = name === 'fromDate' ? new Date(value) : new Date(formData.fromDate);
      const to = name === 'toDate' ? new Date(value) : new Date(formData.toDate);

      if (from && to && !isNaN(from) && !isNaN(to)) {
        const timeDiff = to - from;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        setFormData((prev) => ({ ...prev, numberOfDays: days > 0 ? days : 0 }));
      }
    }
  };

  const openView = (leave) => {
    setSelectedLeave(leave);
    setIsViewModalOpen(true);
  };

  const openEdit = (leave, index) => {
    setSelectedLeave({ ...leave, index });
    setIsEditModalOpen(true);
  };

  const handleSaveLeave = async (updatedLeave) => {
    const payload = {
      schoolId,
      employeeId,
      academicYear,
      index: updatedLeave.index,
      updatedLeave,
    };
    const res = await putAPI('/update-employee-leave', payload, {}, true);
    console.log("update res", res);

    if (!res.hasError) {
      toast.success("Leave updated successfully");
      fetchEmployeeData(schoolId, employeeId);
      setIsEditModalOpen(false);
    } else {
      toast.error(res.message || "Failed to update");
    }
  };


  const handleLeaveSubmit = async (e) => {
    e.preventDefault();

    const leaveEntry = {
      ...formData,
      applyDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    const payload = {
      schoolId,
      employeeId,
      academicYear,
      leaveEntry,
    };

    try {
      const res = await postAPI('/create-employee-leave', payload, {}, true);
      if (!res.hasError) {
        toast.success('Leave applied successfully');
        fetchEmployeeData(schoolId, employeeId);
        setFormData({ leaveType: '', leaveReason: '', fromDate: '', toDate: '', numberOfDays: 0 });
      } else {
        toast.error(res.message || 'Failed to apply leave');
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}-${month}-${year}`;
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

      console.log("Approve leaves", res);

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

  const openDeleteDialog = (leave) => {
    setSelectedLeave(leave);
    setDeleteType("employeeLeave");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedLeave(null);
  };

  const handleDeleteConfirmed = (id) => {
    fetchEmployeeData(schoolId, employeeId);
    setIsDeleteDialogOpen(false);
    setSelectedLeave(null);
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body pb-0">
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
                        {/* <th className="text-center align-content-center border border-dark p-2">maximum to be expired</th> */}
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
                        <th>Action</th>
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
                            <td>{leave.status === "pending" ? "Pending" : leave.status === "approved" ? "Approved" : "Reject"}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <Link className="btn btn-light btn-sm" onClick={() => openView(leave)}>
                                  <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                                </Link>
                                {
                                  leave.status === "pending" ? <><Link className="btn btn-soft-primary btn-sm" onClick={() => openEdit(leave, index)}>
                                    <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
                                  </Link></> : ""
                                }
                                {/* <Link className="btn btn-soft-primary btn-sm" onClick={() => openEdit(leave, index)}>
                                  <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
                                </Link> */}

                                {
                                  leave.status === "pending" ? <><Link className="btn btn-soft-danger btn-sm"
                                    // onClick={ openDeleteDialog(leave)}
                                  >
                                    <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                                  </Link></> : ""
                                }

                                {/* <Link className="btn btn-soft-danger btn-sm"
                                  onClick={() => openDeleteDialog(leave)}
                                >
                                  <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                                </Link> */}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No leave records found</td>
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
                    <h4 className="text-center mb-0 payroll-title">Apply for Leave</h4>
                  </div>
                </div>
                <form onSubmit={handleLeaveSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="leaveType" className="form-label">
                          Select Leave <span className="text-danger">*</span>
                        </label>
                        <select
                          name="leaveType"
                          className="form-control"
                          value={formData.leaveType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select</option>
                          {leaveTypes.map((type) => (
                            <option key={type._id} value={type.annualLeaveTypeName}>
                              {type.annualLeaveTypeName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-6">
                        <label htmlFor="leaveReason" className="form-label">
                          Reason for Leave <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="leaveReason"
                          className="form-control"
                          value={formData.leaveReason}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="fromDate" className="form-label">
                          Date From <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          name="fromDate"
                          className="form-control"
                          value={formData.fromDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="toDate" className="form-label">
                          Date To <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          name="toDate"
                          className="form-control"
                          value={formData.toDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-6">
                        <label htmlFor="numberOfDays" className="form-label">
                          Number of Leave Days <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="numberOfDays"
                          className="form-control"
                          value={formData.numberOfDays}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary custom-submit-button">
                      Submit
                    </button>
                  </div>
                </form>
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
                              <th>Leave Date</th>
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
            </div>
          </div>
        </div>
      </div>
      {isViewModalOpen && (
        <LeaveViewModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          leave={selectedLeave}
        />
      )}

      {isEditModalOpen && (
        <LeaveEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          leave={selectedLeave}
          onSave={handleSaveLeave}
          academicYear={academicYear}
        />
      )}

      {isDeleteDialogOpen && selectedLeave && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedLeave._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};
export default EmployeeLeaveDetailsAndApply;


