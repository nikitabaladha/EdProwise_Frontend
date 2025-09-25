
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";

const PresentStudentAttendanceClassReportList = () => {
  const navigate = useNavigate();

  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const academicYear = localStorage.getItem("selectedAcademicYear");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const schoolId = userDetails?.schoolId;

  const fetchAttendanceRecords = async () => {
    if (!schoolId || !academicYear) {
      toast.error("School ID or Academic Year missing");
      return;
    }
    try {
      setLoading(true);
      const response = await getAPI(
        `/get-student-attendance-school?schoolId=${schoolId}&academicYear=${academicYear}&date=${attendanceDate}`
      );
      console.log("response attendance", response);

      setAttendanceRecords(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to fetch attendance records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, [attendanceDate]);

  // const navigateToView = (event, record) => {
  //   event.preventDefault();
  //   navigate(
  //     `/school-dashboard/operational-service/student-attendance/student-present-report/view-report`,
  //     { state: record }
  //   );
  // };

  const navigateToView = (event, record) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/student-attendance/student-present-report/view-report`,
      {
        state: {
          className: record.class,
          section: record.section,
          schoolId,
          academicYear,
          attendanceDate,
        },
      }
    );
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
                    Student Attendance
                  </h4>

                  <input
                    type="date"
                    className="form-control form-select-sm me-2 w-auto"
                    required
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                </div>
              </div>

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
                          <label
                            className="form-check-label"
                            htmlFor="customCheck1"
                          />
                        </div>
                      </th>
                      <th className="text-nowrap">Class</th>
                      <th className="text-nowrap">Section</th>
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5">Loading...</td>
                      </tr>
                    ) : attendanceRecords.length > 0 ? (
                      attendanceRecords.map((record, index) => (
                        <tr key={index}>
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
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No records found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentStudentAttendanceClassReportList;
