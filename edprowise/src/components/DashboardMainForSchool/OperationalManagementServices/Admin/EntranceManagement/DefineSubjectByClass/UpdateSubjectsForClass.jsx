
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import putAPI from "../../../../../../api/putAPI";
import getAPI from "../../../../../../api/getAPI";
import deleteAPI from "../../../../../../api/deleteAPI";
import ConfirmationDialog from "../../../../../ConfirmationDialog";

const UpdateSubjectsForClass = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const record = location.state;
console.log("get Record",record);

  const [schoolId, setSchoolId] = useState("");
  const [className, setClassName] = useState("");
  const [subjectRows, setSubjectRows] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const academicYear =
    record?.academicYear || localStorage.getItem("selectedAcademicYear");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails?.schoolId) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(userDetails.schoolId);
    setClassName(record?.className);
    
  }, [record]);

  const fetchSubjects = async () => {
    try {
      const res = await getAPI(
        `/get-entrance-exam-subjects?schoolId=${schoolId}&academicYear=${academicYear}&className=${className}`
      );

      if (!res.data.hasError) {
        const subjectsData = res.data.data[0]?.subjects || [];
        setSubjectRows(
          subjectsData.map((s) => ({
            id: s._id,
            subjectName: s.subjectName,
            isNew: false,
          }))
        );
      } else {
        toast.error(res.data.message || "Failed to fetch subjects");
      }
    } catch (err) {
      console.error("Error fetching subjects:", err);
      toast.error("Error fetching subjects");
    }
  };

  useEffect(() => {
    if (schoolId && academicYear && className) fetchSubjects();
  }, [schoolId, academicYear, className]);

  const handleSubjectChange = (id, value) => {
    setSubjectRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, subjectName: value } : row))
    );
  };

  const handleAddRow = () => {
    setSubjectRows((prev) => [
      ...prev,
      { id: Date.now(), subjectName: "", isNew: true },
    ]);
  };

  const handleDeleteRow = (id) => {
    setSubjectRows((prev) => prev.filter((row) => row.id !== id));
  };

  const openDeleteDialog = (subject) => {
    setSelectedSubject({ parentId: record._id, subjectId: subject.id });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedSubject(null);
  };

  const handleDeleteConfirmed = async (deletedSubjectId) => {
    setSubjectRows((prev) => prev.filter((row) => row.id !== deletedSubjectId));
    await fetchSubjects();
  };

  const handleSubmit = async () => {
    try {
      for (const subject of subjectRows) {
        if (subject.subjectName.trim() === "") continue;
         console.log("update subject id", subject._id);
         console.log("update record id", record._id);
        const url = subject.isNew
          ? `/put-entrance-exam-subjects/${record._id}`
          : `/put-entrance-exam-subjects/${record._id}/${subject.id}`;

        const res = await putAPI(
          url,
          { subjectName: subject.subjectName },
          true
        );

        if (res.data.hasError) {
          toast.error(res.data.message || "Error saving subject");
        }
      }

      toast.success("Subjects updated successfully");
      // await fetchSubjects();
      navigate(-1);
    } catch (error) {
      console.error("Error updating subjects:", error);
      toast.error("Error updating subjects");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Update Define Subjects
                  </h4>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* Class & Section info */}
              <form>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">Class</label>
                      <input
                        type="text"
                        className="form-control"
                        value={record?.className || ""}
                        disabled
                      />
                    </div>
                  </div>
             
                </div>
              </form>

              {/* Subjects Table */}
              <div className="table-responsive mt-3">
                <table
                  className="table table-hover w-auto table-centered text-center"
                  style={{ justifySelf: "center" }}
                >
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>
                        <input type="checkbox" className="form-check-input" />
                      </th>
                      <th>Academic Year</th>
                      <th>Subject Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectRows.map((row, index) => (
                      <tr key={row.id}>
                        <td>
                          <input type="checkbox" className="form-check-input" />
                        </td>
                        <td>{academicYear}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control w-auto"
                            value={row.subjectName}
                            onChange={(e) =>
                              handleSubjectChange(row.id, e.target.value)
                            }
                          />
                        </td>
                        <td>
                          {row.isNew ? (
                            <button
                              type="button"
                              className="btn btn-soft-danger btn-sm"
                              onClick={() => handleDeleteRow(row.id)}
                            >
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-soft-danger btn-sm"
                              onClick={() => openDeleteDialog(row)}
                            >
                              Delete Subject
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-end mt-3">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={handleAddRow}
                >
                  Add More Subject
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>

              {/* Confirmation Dialog */}
              {isDeleteDialogOpen && selectedSubject && (
                <ConfirmationDialog
                  onClose={handleDeleteCancel}
                  deleteType="entranceClassDefineSubject"
                  id={selectedSubject}
                  onDeleted={handleDeleteConfirmed}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubjectsForClass;
