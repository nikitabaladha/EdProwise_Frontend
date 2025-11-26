import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import putAPI from "../../../../../api/putAPI";
import { toast } from "react-toastify";

const UpdateStudentAttendance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state;
console.log("Attendance Date:", record.attendanceDate);

  const [students, setStudents] = useState(
    record?.students?.map((s) => ({
      ...s,
      status: s.status || "Present",
    })) || []
  );

  const handleStatusChange = (index, newStatus) => {
    const updated = [...students];
    updated[index].status = newStatus;
    setStudents(updated);
  };

  const handleSave = async () => {
    try {
      const payload = {
        schoolId: record.schoolId,
        academicYear: record.academicYear,
        className: record.class,
        section: record.section,
        date: record.attendanceDate,
        updates: students.map((s) => ({
          admissionNumber: s.admissionNumber,
          status: s.status,
        })),
      };

      const res = await putAPI("/update-student-attendance", payload, true);

      toast.success(res.message || "Attendance updated successfully");
      navigate(-1); 
    } catch (error) {
      console.error("Error saving attendance:", error);
      toast.error("Failed to update attendance");
    }
  };

  if (!record) {
    return (
      <div className="container mt-4">
        <h5>No record found</h5>
      </div>
    );
  }
 
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
                    Update Student Attendnce
                  </h4>
                  <input
                    type="date"
                    className="form-control form-select-sm me-2 w-auto"
                    required
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="">
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customCheck1"
                          />
                        </div>
                      </th>
                      <th className="text-nowrap">Roll No</th>
                      <th className="text-nowrap">Admission No</th>
                      <th className="text-nowrap">Student Name</th>
                      <th className="text-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? (
                      students.map((student, index) => (
                        <tr key={student._id}>
                          <td className="">
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                // id={`check-${index}`}
                              />
                            </div>
                          </td>
                          <td>{student.rollNo}</td>
                          <td>{student.admissionNumber}</td>
                          <td>{student.studentName}</td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={student.status}
                              onChange={(e) =>
                                handleStatusChange(index, e.target.value)
                              }
                            >
                              <option value="Present">Present</option>
                              <option value="Absent">Absent</option>
                              <option value="Leave">Leave</option>
                              <option value="Late">Late</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No student attendance found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentAttendance;
