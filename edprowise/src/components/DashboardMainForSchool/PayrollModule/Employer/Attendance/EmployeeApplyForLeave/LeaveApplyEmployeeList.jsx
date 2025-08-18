import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../../api/getAPI';
import putAPI from '../../../../../../api/putAPI';
import LeaveViewModal from './LeaveViewModal';
const LeaveApplyEmployeeList = () => {
  const [schoolId, setSchoolId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [academicYear,  setAcademicYear] = useState('');
  const [leaveRecords, setLeaveRecords] = useState([]);
 
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('School ID not found. Please log in again.');
      return;
    }
    const academicYear = localStorage.getItem("selectedAcademicYear");
    setAcademicYear(academicYear);
    
    setSchoolId(userDetails.schoolId);
    fetchLeaveRecords(userDetails.schoolId, academicYear);
  }, []);

  const fetchLeaveRecords = async (schoolId,academicYear) => {
  try {
    const response = await getAPI(`/get-all-employee-leaves?schoolId=${schoolId}&academicYear=${academicYear}`);
    if (!response.hasError && Array.isArray(response.data.data)) {
      const enriched = response.data.data.map((rec) => ({
        ...rec,
        customId: `${rec.employeeId}_${rec.fromDate}_${rec.toDate}_${rec.leaveType}`,
      }));
      setLeaveRecords(enriched);
    } else {
      toast.error('No leave records found.');
    }
  } catch (error) {
    console.error(error);
    toast.error('Error fetching leave records');
  }
};


 const handleStatusChange = async (record, status) => {
  try {
    const res = await putAPI('/update-employee-leave-status', {
      schoolId: record.schoolId,
      employeeId: record.employeeId,
      academicYear,
      fromDate: record.fromDate,
      toDate: record.toDate,
      leaveType: record.leaveType,
      newStatus: status
    }, {}, true);

    if (!res.hasError) {
      toast.success('Status updated successfully');
      fetchLeaveRecords(schoolId, academicYear);
    } else {
      toast.error(res.message);
    }
  } catch (err) {
    console.error(err);
    toast.error('Error updating leave status');
  }
};


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
            <div className="card-body">
              <div className="container ps-0">
                <div className="card-header px-0 mb-1">
                  <h4 className="text-start mb-0 payroll-title">All Employee Leave Records</h4>
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
                      <th>Emp. ID</th>
                      <th>Leave Type</th>
                      <th>Apply Date</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Days</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRecords.length > 0 ? (
                      leaveRecords.map((rec, idx) => (
                        <tr key={idx}>
                          <td style={{ width: 20 }}>
                            <div className="form-check ms-1">
                              <input type="checkbox" className="form-check-input" id="customCheck1" />
                              <label className="form-check-label" htmlFor="customCheck1" />
                            </div>
                          </td>
                          <td>{rec.employeeId}</td>
                          <td>{rec.leaveType}</td>
                          <td>{formatDate(rec.applyDate)}</td>
                          <td>{formatDate(rec.fromDate)}</td>
                          <td>{formatDate(rec.toDate)}</td>
                          <td>{rec.numberOfDays}</td>
                          <td>
                            <span className={`badge bg-${rec.status === 'approved' ? 'success' : rec.status === 'rejected' ? 'danger' : 'warning'}`}>{rec.status === "pending"? "Pending":rec.status === "approved"? "Approved" : "Reject"}</span>
                          </td>
                          <td>
                            <button
                              className="btn btn-info btn-sm me-1"
                              onClick={() => {
                                setSelectedRecord(rec);
                                setShowModal(true);
                              }}
                            >
                              View
                            </button>
                            <button
                              className="btn btn-success btn-sm me-1"
                              onClick={() => handleStatusChange(rec, 'approved')}
                              disabled={rec.status === 'approved'}
                              // disabled={rec.status === 'rejected'}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleStatusChange(rec, 'rejected')}
                              disabled={rec.status === 'rejected'}
                              // disabled={rec.status === 'approved'}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">No leave records available</td>
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
          </div>
        </div>
      </div>
    </div>
    {showModal && (
  <LeaveViewModal
    show={showModal}
    onHide={() => setShowModal(false)}
    record={selectedRecord}
    onStatusChange={handleStatusChange}
  />
)}

    </>
  );
};

export default LeaveApplyEmployeeList;
