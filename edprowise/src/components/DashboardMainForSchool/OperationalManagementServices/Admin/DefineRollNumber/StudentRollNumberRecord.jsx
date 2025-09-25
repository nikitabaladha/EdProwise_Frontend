
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
const StudentRollNumberRecord = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [records, setRecords] = useState([]);
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
const [selectedRecord, setSelectedRecord] = useState(null);

  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (schoolId && academicYear) {
      fetchRecords();
    }
  }, [schoolId, academicYear]);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/student-roll-numbers/by-school?schoolId=${schoolId}&academicYear=${academicYear}`
      );
      console.log("res ",res);
      
      if (!res.data.hasError) {
        setRecords(res.data.data || []);
      } else {
        toast.error(res.data.message || "Failed to fetch roll number records");
      }
    } catch (error) {
      console.error("Error fetching roll number records:", error);
      toast.error("Error fetching roll number records");
    } finally {
      setLoading(false);
    }
  };

   const openDeleteDialog = (record) => {
     setSelectedRecord(record);
     setIsDeleteDialogOpen(true);
   };

   const handleDeleteCancel = () => {
     setIsDeleteDialogOpen(false);
     setSelectedRecord(null);
   };
const handleDeleteConfirmed = async () => {
fetchRecords();
handleDeleteCancel();
};
  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/student-attendance/define-roll-numbers/define-student-roll-number`
    
    );
  };

  const navigateToView = (event, record) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/student-attendance/define-roll-numbers/view-student-roll-number`,
      { state: record}
    );
  };

  const navigateToUpdate = (event, record) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/student-attendance/define-roll-numbers/update-student-roll-number`,
    { state: record }
    );
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link
          onClick={(event) => navigateToAdd(event)}
          className="btn btn-sm btn-primary"
        >
          Define Roll Number
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Define Roll Number
                  </h4>
                  <div className="d-flex gap-2">
                    <select
                      className="form-select form-select-sm me-2 w-auto"
                      value={academicYear}
                      onChange={(e) => {
                        setAcademicYear(e.target.value);
                        localStorage.setItem(
                          "selectedAcademicYear",
                          e.target.value
                        );
                      }}
                    >
                      <option value="">Select Academic Year</option>
                      <option value="2025-2026">2025-2026</option>
                      <option value="2026-2027">2026-2027</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </th>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Academic Year</th>
                      <th>Date of Assign</th>
                      <th>Define Mode</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="7" className="text-center text-muted">
                          Loading...
                        </td>
                      </tr>
                    ) : records.length > 0 ? (
                      records.map((record) => (
                        <tr key={record._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </div>
                          </td>
                          <td>{record.class}</td>
                          <td>{record.section}</td>
                          <td>{record.academicYear}</td>
                          <td>
                            {new Date(record.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td>
                            {record.mode == "alphabetical"
                              ? "Alphabetical"
                              : record.mode == "result"
                              ? "Result"
                              : record.mode == "manual"
                              ? "Manual"
                              : ""}
                          </td>
                          <td className="text-center">
                            <div className="d-flex gap-2 justify-content-center">
                              <Link
                                className="btn btn-light btn-sm"
                                onClick={(event) =>
                                  navigateToView(event, record)
                                }
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-primary btn-sm"
                                onClick={(event) =>
                                  navigateToUpdate(event, record)
                                }
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-danger btn-sm"
                                onClick={() => openDeleteDialog(record)}
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-muted">
                          No records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && selectedRecord && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="studentRollNumber"
          id={selectedRecord._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default StudentRollNumberRecord;

