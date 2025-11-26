// import React, { useState, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { SiGoogleforms } from "react-icons/si";
// import { MdAssignmentTurnedIn } from "react-icons/md";
// import { toast } from "react-toastify";
// const TeachersList = () => {

//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const academicYear = localStorage.getItem("selectedAcademicYear");
//   const [admissionNumber, setAdmissionNumber] = useState("");

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;
//     const admNumber = userDetails?.admissionNumber;
//     if (!id) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }
//     setSchoolId(id);
//     setAdmissionNumber(admNumber);
//   }, []);

//     const navigateToView = (event) => {
//       event.preventDefault();
//       navigate(`/student-dashboard/teachers-feedback/view-fill-feedback`, {
//         state: { schoolId, academicYear, admissionNumber },
//       });
//     };

//     const navigateToFill = (event) => {
//       event.preventDefault();
//         navigate(`/student-dashboard/teachers-feedback/fill-feedback`, {
//           state: { schoolId, academicYear },
//         });
//     };
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
//                     Teacher Feedback
//                   </h4>
//                 </div>
//               </div>
//               <div className="row"></div>
//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-hover table-centered text-center">
//                   <thead className="bg-light-subtle">
//                     <tr className="payroll-table-header">
//                       <th className="">
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
//                       <th className="text-nowrap">Teacher Name</th>
//                       <th className="text-nowrap">subject</th>
//                       <th className="text-nowrap">Feedback Status</th>
//                       <th className="text-nowrap">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="">
//                         <div className="form-check ms-1">
//                           <input type="checkbox" className="form-check-input" />
//                         </div>
//                       </td>
//                       <td>Mr.Arun Verma</td>
//                       <td>English</td>
//                       <td>
//                         <span class="badge bg-success text-light  px-2 py-1 fs-13">
//                           Submit
//                         </span>
//                       </td>
//                       <td className="text-center">
//                         <div className="d-flex gap-2 justify-content-center">
//                           <Link
//                             className="btn btn-light btn-sm"
//                             onClick={(event) => navigateToView(event)}
//                           >
//                             <iconify-icon
//                               icon="solar:eye-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>

//                           <Link
//                             className="btn btn-soft-primary btn-sm"
//                             onClick={(event) => navigateToFill(event)}
//                           >
//                             <MdAssignmentTurnedIn className="align-middle fs-18" />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TeachersList

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiGoogleforms } from "react-icons/si";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import getAPI from "../../../api/getAPI";

const TeachersList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [loading, setLoading] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const academicYear = localStorage.getItem("selectedAcademicYear");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    const admNumber = userDetails?.admissionNumber;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
    setAdmissionNumber(admNumber);

    if (id && admNumber && academicYear) {
      fetchTeacherFeedbackData(id, admNumber, academicYear);
    }
  }, [academicYear]);

  const fetchTeacherFeedbackData = async (
    schoolId,
    admissionNumber,
    academicYear
  ) => {
    setLoading(true);
    try {
      const response = await getAPI(
        `/teacher-feedback-status?schoolId=${schoolId}&academicYear=${academicYear}&admissionNumber=${admissionNumber}`, true
      );
    console.log("student response", response);
    
      if (response.data.success) {
        setClassName(response.data.data.student.class);
        setSection(response.data.data.student.section)
        setTeachersData(response.data.data.teacherFeedbackStatus);

      } else {
        toast.error("Failed to fetch teacher data");
      }
    } catch (error) {
      console.error("Error fetching teacher feedback data:", error);
      toast.error("Error fetching teacher data");
    } finally {
      setLoading(false);
    }
  };

  const navigateToView = (event, teacherData) => {
    event.preventDefault();
    navigate(`/student-dashboard/teachers-feedback/view-fill-feedback`, {
      state: {
        schoolId,
        academicYear,
        admissionNumber,
        className,
        section,
        teacherData,
      },
    });
  };

  const navigateToFill = (event, teacherData) => {
    event.preventDefault();
    navigate(`/student-dashboard/teachers-feedback/fill-feedback`, {
      state: {
        schoolId,
        academicYear,
        admissionNumber,
        className,
        section,
        teacherData,
      },
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Submit":
        return (
          <span className="badge bg-success text-light px-2 py-1 fs-13">
            Submit
          </span>
        );
      case "Pending":
        return (
          <span className="badge bg-warning text-dark px-2 py-1 fs-13">
            Pending
          </span>
        );
      case "N/A":
        return (
          <span className="badge bg-secondary text-light px-2 py-1 fs-13">
            N/A
          </span>
        );
      default:
        return (
          <span className="badge bg-info text-light px-2 py-1 fs-13">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
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
                    Teacher Feedback
                  </h4>
                </div>
              </div>
              <div className="row"></div>
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
                      <th className="text-nowrap">Teacher Name</th>
                      <th className="text-nowrap">Subject</th>
                      <th className="text-nowrap">Feedback Status</th>
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachersData.length > 0 ? (
                      teachersData.map((teacher, index) => (
                        <tr key={index}>
                          <td className="">
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </div>
                          </td>
                          <td>{teacher.teacherName}</td>
                          <td>{teacher.subjectName}</td>
                          <td>{getStatusBadge(teacher.feedbackStatus)}</td>
                          <td className="text-center">
                            <div className="d-flex gap-2 justify-content-center">
                              {teacher.feedbackStatus === "Submit" && (
                                <Link
                                  className="btn btn-light btn-sm"
                                  onClick={(event) =>
                                    navigateToView(event, teacher)
                                  }
                                >
                                  <iconify-icon
                                    icon="solar:eye-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                              )}

                              {teacher.feedbackStatus === "Pending" && (
                                <Link
                                  className="btn btn-soft-primary btn-sm"
                                  onClick={(event) =>
                                    navigateToFill(event, teacher)
                                  }
                                >
                                  <MdAssignmentTurnedIn className="align-middle fs-18" />
                                </Link>
                              )}

                              {teacher.feedbackStatus === "N/A" && (
                                <span className="text-muted">
                                  No action available
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          {!loading
                            ? "No teachers found for feedback"
                            : "Loading..."}
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
    </div>
  );
};

export default TeachersList;