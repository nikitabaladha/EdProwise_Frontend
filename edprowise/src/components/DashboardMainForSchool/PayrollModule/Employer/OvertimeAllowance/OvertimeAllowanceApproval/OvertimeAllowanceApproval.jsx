import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../../api/getAPI';
import putAPI from '../../../../../../api/putAPI';
import { useNavigate } from 'react-router-dom';

const OvertimeAllowanceApproval = () => {
    const navigate = useNavigate();
    const [schoolId, setSchoolId] = useState(null);
    const [academicYear, setAcademicYear] = useState('');
    const [applications, setApplications] = useState([]);
  
    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (!userDetails?.schoolId) {
            toast.error('School ID not found. Please log in again.');
            return;
        }
        setSchoolId(userDetails.schoolId);
        const academicYear = localStorage.getItem("selectedAcademicYear");
    setAcademicYear(academicYear);
    
        fetchOvertimeApplications(userDetails.schoolId,academicYear);
    }, []);

    const fetchOvertimeApplications = async (schoolId,academicYear) => {
        try {
            const res = await getAPI(`/all-overtime-applications?schoolId=${schoolId}&academicYear=${academicYear}`);
            if (res?.data.data) {
                setApplications(res.data.data);
            } else {
                toast.error('Failed to fetch applications.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Server error while fetching applications.');
        }
    };

    const handleStatusChange = async (application, newStatus) => {
        try {
            const res = await putAPI(`/update-status/${application._id}`, { status: newStatus }, true);
            if (res?.data?.hasError === false) {
                toast.success(`Application ${newStatus} successfully`);
                fetchOvertimeApplications(schoolId); // Refresh list
            } else {
                toast.error(res?.data?.message || 'Failed to update status');
            }
        } catch (error) {
            console.error(error);
            toast.error('Server error while updating status.');
        }
    };

    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        const [year, month, day] = isoDate.split('-');
        return `${day}-${month}-${year}`;
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex align-items-center gap-1">
                                    <h4 className="card-title text-center flex-grow-1">Overtime Allowance Employees List</h4>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                                    <thead className="bg-light-subtle">
                                        <tr className='payroll-table-header'>
                                            <th style={{ width: 20 }}>
                                                <div className="form-check ms-1">
                                                    <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                    <label className="form-check-label" htmlFor="customCheck1" />
                                                </div>
                                            </th>
                                            <th>Employee ID</th>
                                            <th>Employee Name</th>
                                            <th>Date</th>
                                            <th>From - To</th>
                                            <th>Overtime Hours</th>
                                            <th>Rate</th>
                                            <th>Total Amount</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.length > 0 ? (
                                            applications.map((rec, index) => (
                                                <tr key={rec._id} className='payroll-table-body'>
                                                    <td style={{ width: 20 }}>
                                                        <div className="form-check ms-1">
                                                            <input type="checkbox" className="form-check-input" id="customCheck1" />
                                                            <label className="form-check-label" htmlFor="customCheck1" />
                                                        </div>
                                                    </td>
                                                    <td>{rec.employeeId}</td>
                                                    <td>{rec.employeeName || "N/A"}</td>
                                                    <td>{formatDate(rec.overtimeDate)}</td>
                                                    <td>{rec.fromTime} - {rec.toTime}</td>
                                                    <td>{rec.totalHours}</td>
                                                    <td>{rec.rate}</td>
                                                    <td>{rec.calculatedAmount}</td>
                                                    <td>
                                                        <span className={`badge ${rec.status === 'approved' ? 'bg-success' : rec.status === 'rejected' ? 'bg-danger' : 'bg-warning'}`}>
                                                            {rec.status === 'approved'? "Approve" : rec.status === 'rejected' ?"Reject":"Pending"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <button className="btn btn-light btn-sm"
                                                                onClick={() => navigate("/school-dashboard/payroll-module/employer/overtime-allowance/view-overtime-allowance-details", {
                                                                    state: {
                                                                        entry: rec
                                                                    }
                                                                })}
                                                            >
                                                                <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                                                            </button>
                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => handleStatusChange(rec, 'approved')}
                                                                disabled={rec.status === 'approved'}
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleStatusChange(rec, 'rejected')}
                                                                disabled={rec.status === 'rejected'}
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="9" className="text-center">No overtime applications found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-footer border-top">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-end mb-0">
                                        <li className="page-item"><button className="page-link">Previous</button></li>
                                        <li className="page-item"><button className="page-link pagination-button">1</button></li>
                                        <li className="page-item"><button className="page-link">Next</button></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OvertimeAllowanceApproval;
