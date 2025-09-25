import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import putAPI from "../../../../../api/putAPI"; // ✅ update API

const UpdateRollNumber = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state;

  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [mode, setMode] = useState("alphabetical");
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (record) {
      setStudents(record.rollNumberDetails || []);
      setClassName(record.class || "");
      setSection(record.section || "");
      setMode(record.mode || "alphabetical");
      setSortField(record.sortField || "firstName");
      setSortOrder(record.sortOrder || "asc");
    }
  }, [record]);

  if (!record) {
    return (
      <div className="container mt-4">
        <p className="text-danger">No record found. Please go back.</p>
      </div>
    );
  }

  const handleRollChange = (admissionNumber, newRollNo) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.admissionNumber === admissionNumber ? { ...s, rollNo: newRollNo } : s
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        schoolId: record.schoolId,
        academicYear: record.academicYear,
        className,
        section,
        mode,
        sortField,
        sortOrder,
        students: students.map((s) => ({
          admissionNumber: s.admissionNumber,
          rollNo: s.rollNo,
          studentName: s.studentName,
        })),
      };

      const res = await putAPI(
        `/update-student-roll-numbers/${record._id}`, 
        payload,
        true
      );

      if (!res.data.hasError) {
        toast.success("Roll numbers updated successfully!");
        navigate(-1);
      } else {
        toast.error(res.data.message || "Failed to update roll numbers");
      }
    } catch (error) {
      console.error("Error updating roll numbers:", error);
      toast.error("Error updating roll numbers");
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
                    Update Roll Number
                  </h4>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>

              <form className="row mt-2">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Class</label>
                    <input
                      type="text"
                      className="form-control"
                      value={className}
                      
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">Section</label>
                    <input
                      type="text"
                      className="form-control"
                      value={section}
                     
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="mb-3">
                    <label className="form-label">Mode</label>
                    <select
                      className="form-select"
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <option value="alphabetical">Alphabetical</option>
                      <option value="manual">Manual</option>
                      <option value="result">By Result</option>
                    </select>
                  </div>
                </div>

                {mode === "alphabetical" && (
                  <>
                    <div className="col-md-2">
                      <div className="mb-3">
                        <label className="form-label">Sort By</label>
                        <select
                          className="form-select"
                          value={sortField}
                          onChange={(e) => setSortField(e.target.value)}
                        >
                          <option value="firstName">First Name</option>
                          <option value="lastName">Last Name</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="mb-3">
                        <label className="form-label">Arrange By</label>
                        <select
                          className="form-select"
                          value={sortOrder}
                          onChange={(e) => setSortOrder(e.target.value)}
                        >
                          <option value="asc">A → Z</option>
                          <option value="desc">Z → A</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </form>

              <div className="table-responsive mt-2">
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Admission No</th>
                      <th>Roll No</th>
                      <th>Student Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? (
                      students.map((s, i) => (
                        <tr key={i}>
                          <td>{s.admissionNumber}</td>
                          <td>
                            {mode === "manual" ? (
                              <input
                                type="number"
                                className="form-control text-center"
                                value={s.rollNo}
                                onChange={(e) =>
                                  handleRollChange(
                                    s.admissionNumber,
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              s.rollNo
                            )}
                          </td>
                          <td>{s.studentName}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-muted">
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Update Roll Numbers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRollNumber;
