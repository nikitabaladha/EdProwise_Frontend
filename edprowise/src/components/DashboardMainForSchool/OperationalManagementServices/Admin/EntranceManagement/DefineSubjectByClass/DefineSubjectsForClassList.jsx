
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
const DefineSubjectsForClassList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  // Fetch Class Subjects when schoolId & academicYear are set
  useEffect(() => {
    if (schoolId && academicYear) {
      fetchClassSubjects();
    }
  }, [schoolId, academicYear]);

  const fetchClassSubjects = async () => {
    try {
      setLoading(true);
      const response = await getAPI(
        `/get-entrance-exam-subjects?schoolId=${schoolId}&academicYear=${academicYear}`
      );
      console.log("get all class subject", response);

      if (!response.hasError) {
        setRecords(response.data.data || []);
      } else {
        toast.error(response.message || "Failed to fetch subjects");
      }
    } catch (error) {
      console.error("Error fetching class subjects:", error);
      toast.error("Something went wrong");
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
    fetchClassSubjects();
    handleDeleteCancel();
  };

  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/entrance-management/subject-define-list/define-class-subjects`
    );
  };

  const navigateToView = (event, record) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/entrance-management/subject-define-list/view-define-class-subjects`,
      { state: record }
    );
  };

  const navigateToUpdate = (event, record) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/entrance-management/subject-define-list/update-define-class-subjects`,
      { state: record }
    );
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Define Subject Class
                  </h4>
                  <Link
                    onClick={(event) => navigateToAdd(event)}
                    className="btn btn-sm btn-primary"
                  >
                    Define Subjects
                  </Link>
                </div>
              </div>

              {loading ? (
                <p className="text-center mt-3">Loading...</p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                          </div>
                        </th>
                        <th className="text-nowrap">Class</th>
                        {/* <th className="text-nowrap">Section</th> */}
                        <th className="text-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.length > 0 ? (
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
                            <td>{record.className}</td>
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
                          <td colSpan="4" className="text-center">
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && selectedRecord && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="entranceClassSubject"
          id={selectedRecord._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default DefineSubjectsForClassList;

