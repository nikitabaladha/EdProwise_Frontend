// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const StudentPresentReport = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const record = location.state;

//   if (!record) {
//     return (
//       <div className="container mt-4">
//         <h5>No record found</h5>
//       </div>
//     );
//   }

//   const presentStudents =
//     record.students?.filter((student) => student.status === "Present") || [];

//   return (
//     <div className="container-fluid">
//       <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Student Present Attendance Report 
//                   </h4>
//                   <button
//                     className="btn btn-primary btn-sm"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-hover table-centered text-center">
//                   <thead className="bg-light-subtle">
//                     <tr className="payroll-table-header">
//                       <th>
//                         <div className="form-check ms-1">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             id="customCheck1"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="customCheck1"
//                           />
//                         </div>
//                       </th>
//                       <th className="text-nowrap">Roll No</th>
//                       <th className="text-nowrap">Admission No</th>
//                       <th className="text-nowrap">Student Name</th>
//                       <th className="text-nowrap">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {presentStudents.length > 0 ? (
//                       presentStudents.map((student) => (
//                         <tr key={student._id}>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                               />
//                             </div>
//                           </td>
//                           <td>{student.rollNo}</td>
//                           <td>{student.admissionNumber}</td>
//                           <td>{student.studentName}</td>
//                           <td>
//                             <span className="badge bg-success">
//                               {student.status}
//                             </span>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="5">No Present students found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div> 
//   );
// };

// export default StudentPresentReport;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";

const StudentPresentReport = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = location.state || {};

  const {
    className,
    section,
    schoolId,
    academicYear,
    attendanceDate: initialDate,
  } = params;

  const [attendanceDate, setAttendanceDate] = useState(
    initialDate || new Date().toISOString().split("T")[0]
  );
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudentAttendance = async () => {
    if (!className || !section || !schoolId || !academicYear) return;

    try {
      setLoading(true);
      const response = await getAPI(
        `/get-student-attendance-class-section?schoolId=${schoolId}&academicYear=${academicYear}&date=${attendanceDate}&class=${className}&section=${section}`
      );
      console.log("Student Attendance Response:", response);

      setStudents(response.data?.data?.students || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to fetch student attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentAttendance();
  }, [attendanceDate]);

  const presentStudents =
    students?.filter((student) => student.status === "Present") || [];

  if (!params.className) {
    return (
      <div className="container mt-4">
        <h5>No record found</h5>
        <button className="btn btn-primary mt-2" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center w-100">
                  <h4 className="card-title flex-grow-1 text-center">
                    Student Present Attendance Report
                  </h4>
                  <input
                    type="date"
                    className="form-control form-select-sm me-2 w-auto border border-dark"
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
              <form>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Class
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="className"
                        name="className"
                        className="form-control pe-5"
                        value={className}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="Section" className="form-label">
                        Section
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control pe-5"
                        value={section}
                      />
                    </div>
                  </div>
                </div>
              </form>
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
                      <th className="text-nowrap">Roll No</th>
                      <th className="text-nowrap">Admission No</th>
                      <th className="text-nowrap">Student Name</th>
                      <th className="text-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5">Loading...</td>
                      </tr>
                    ) : presentStudents.length > 0 ? (
                      presentStudents.map((student) => (
                        <tr key={student._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </div>
                          </td>
                          <td>{student.rollNo}</td>
                          <td>{student.admissionNumber}</td>
                          <td>{student.studentName}</td>
                          <td>
                            <span className="badge bg-success">
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No Present students found</td>
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

export default StudentPresentReport;
