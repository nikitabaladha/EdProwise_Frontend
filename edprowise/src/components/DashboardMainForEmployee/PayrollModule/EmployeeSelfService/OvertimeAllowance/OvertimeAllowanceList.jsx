import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";
import ConfirmationDialog from "../../../../ConfirmationDialog";
 
const OvertimeAllowanceList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [academicYear, setAcademicYear] = useState("");
  const [employeeDetail, setEmployeeDetail] = useState(null);
  const [overtimeList, setOvertimeList] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Load on mount
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails?.schoolId || !userDetails?.userId) {
      toast.error("Authentication details missing");
      return;
    }

    setSchoolId(userDetails.schoolId);
    setEmployeeId(userDetails.userId);
    setAcademicYear(userDetails.academicYear)
    fetchEmployeeAndOvertime(userDetails.schoolId, userDetails.userId, userDetails.academicYear);
  }, []);

  const fetchEmployeeAndOvertime = async (schoolId,employeeId,academicYear ) => {
    
    try {
      const employeeRes = await getAPI(`/get-employee-details/${schoolId}/${employeeId}/${academicYear}`);
      console.log("fetchEmployeeData employeeRes", employeeRes);
      // const employeeRes = await getAPI(`/get-employee-details/${schoolId}/${empId}`);
      if (!employeeRes.hasError && employeeRes.data?.data?.employeeInfo) {
       console.log("setEmployeeDetails",setEmployeeDetail(employeeRes.data.data.employeeInfo));
        // setEmployeeDetails(employeeRes.data.data);
        fetchOvertimeApplications(schoolId, employeeId,academicYear);
      } else {
        toast.error(employeeRes.message || 'Failed to fetch employee details');
        return;
      }
      
    } catch (err) {
      toast.error("Error fetching employee detail");
    }
  };

  const fetchOvertimeApplications = async (schoolId, employeeId,academicYear) => {
    try {
      const res = await getAPI(`/get-overtime-applications/${schoolId}/${employeeId}/${academicYear}`);
      if (!res.hasError && res.data?.data) {
        setOvertimeList(res.data.data);
      } else {
        setOvertimeList([]);
        toast.info("No overtime applications found");
      }
    } catch (err) {
      toast.error("Error fetching overtime records");
    }
  };

  const openDeleteDialog = (entry) => {
    setSelectedEntry(entry);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedEntry(null);
  };

  const handleDeleteConfirmed = (id) => {
    setOvertimeList((prev) => prev.filter((entry) => entry._id !== id));
    setIsDeleteDialogOpen(false);
  };

  const navigateToApply = () => {
    navigate(`/employee-dashboard/payroll-module/employee-services/overtime-allowance/apply-overtime-allowance`, {
      state: { employee: employeeDetail, schoolId, academicYear, employeeId },
    });
  };

  const navigateToViewInfo = (entry) => {
    navigate(`/employee-dashboard/payroll-module/employee-services/overtime-allowance/view-overtime-allowance`, {
      state: { employee: employeeDetail, entry },
    });
  };

  const navigateToUpdateInfo = (entry) => {
    navigate(`/employee-dashboard/payroll-module/employee-services/overtime-allowance/update-overtime-allowance`, {
      state: { employee: employeeDetail, entry },
    });
  };

   const formatDate = (isoDate) => {
        if (!isoDate) return '';
        const [year, month, day] = isoDate.split('-');
        return `${day}-${month}-${year}`;
    };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header d-flex align-items-center">
                <h4 className="card-title flex-grow-1 text-center">Overtime Allowance</h4>
                <button onClick={navigateToApply} className="btn btn-sm btn-primary">
                  Apply Overtime Allowance
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-hover text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th style={{ width: 20 }}>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" id="customCheck1" />
                          <label className="form-check-label" htmlFor="customCheck1" />
                        </div>
                      </th>
                      <th>Date</th>
                      <th>From - To</th>
                      <th>Hours</th>
                      <th>Rate </th>
                      <th>Total Amount </th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overtimeList.length === 0 ? (
                      <tr>
                        <td colSpan="7">No overtime applications found</td>
                      </tr>
                    ) : (
                      overtimeList.map((entry, index) => (
                        <tr key={entry._id}>
                          <td style={{ width: 20 }}>
                            <div className="form-check ms-1">
                              <input type="checkbox" className="form-check-input" id="customCheck1" />
                              <label className="form-check-label" htmlFor="customCheck1" />
                            </div>
                          </td>
                          <td>{formatDate(entry.overtimeDate) || "-"}</td>
                          <td>{entry.fromTime} - {entry.toTime}</td>
                          <td>{entry.totalHours}</td>
                          <td>{entry.rate}</td>
                          <td>{entry.calculatedAmount}</td>
                          <td>{entry.status === 'approved'? "Approve" : entry.status === 'rejected' ?"Reject":"Pending"}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <button className="btn btn-light btn-sm" onClick={() => navigateToViewInfo(entry)}>
                                <iconify-icon icon="solar:eye-broken" className="align-middle fs-18"/>
                              </button>
                              <button className="btn btn-soft-primary btn-sm" onClick={() => navigateToUpdateInfo(entry)} disabled={entry.status==="approved"}>
                                <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18"/>
                              </button>
                              <button className="btn btn-soft-danger btn-sm" onClick={() => openDeleteDialog(entry)} disabled={entry.status==="approved"}>
                                <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18"/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
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

      {isDeleteDialogOpen && selectedEntry && (
        <ConfirmationDialog 
          onClose={handleDeleteCancel}
          id={selectedEntry._id}
          deleteType="employeeOvertime"
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default OvertimeAllowanceList;
