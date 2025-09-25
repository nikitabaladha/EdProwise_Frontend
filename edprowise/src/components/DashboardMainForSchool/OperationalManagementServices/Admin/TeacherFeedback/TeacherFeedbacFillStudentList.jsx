import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";

const TeacherFeedbacFillStudentList = () => {
//      const navigate = useNavigate();
//      const [loading, setLoading] = useState(false);
//      const location = useLocation();
//      const { schoolId, academicYear, className, sectionName, teacherData } =
//        location.state || {};
//        console.log("schoolId", schoolId);
//        console.log("academicyear",academicYear);
//        console.log("className",className);
//        console.log("sectionName",sectionName);
//        console.log("teacherData",teacherData);
//        const [staffId, setStaffId] = useState("");
//        const [subjectId, setSubjectId] = useState("");
//      const [schoolIdTech, setSchoolIdTech] = useState("");
//      const [records, setRecords] = useState([]);
//      const [academicYearTeach, setAcademicYearTeach] = useState(
//        localStorage.getItem("selectedAcademicYear") || ""
//      );
//      const [classes, setClasses] = useState("");
//      const [sections, setSections] = useState("");
// const [students, setStudents] = useState([]);
// const [summary, setSummary] = useState({});
 
//      useEffect(() => {
//        if (
//          schoolId &&
//          academicYear &&
//          className &&
//          sectionName &&
//          teacherData
//        ) {
//          setClasses(className);
//          setSections(sectionName);
//          setAcademicYearTeach(academicYear);
//          setSchoolIdTech(schoolId);
//          setStaffId(teacherData.staffId);
//          setSubjectId(teacherData.subjectId);
//        }
//      }, [schoolId, academicYear, className, sectionName, teacherData]);

//      useEffect(() => {
//        if (schoolIdTech && academicYearTeach && classes && sections && staffId && subjectId) {
//          fetchData();
//        }
//      }, [schoolIdTech, academicYearTeach, classes, sections,staffId, subjectId]);

//      const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await getAPI(
//           `/teacher-feedback-students?schoolId=${schoolIdTech}&academicYear=${academicYearTeach}&className=${classes}&sectionName=${sections}&staffId=${staffId}&subjectId=${subjectId}`,
//          true
//         );
//        console.log("student details",response);
       
//         if (response.data.success) {
//           setStudents(response.data.data.students);
//           setSummary({
//             totalStudents: response.data.data.totalStudents,
//             averageRating: response.data.data.averageRating,
//           });
//         } else {
//           toast.error("Failed to fetch student feedback data");
//         }
//       } catch (error) {
//         console.error("Error fetching student feedback data:", error);
//         toast.error("Error fetching student feedback data");
//       } finally {
//         setLoading(false);
//       }
//      }
 const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
 const location = useLocation();
 const { schoolId, academicYear, className, sectionName, teacherData } =
   location.state || {};
console.log("schoolId", schoolId);
        console.log("academicyear",academicYear);
        console.log("className",className);
        console.log("sectionName",sectionName);
        console.log("teacherData",teacherData);
        
 const [students, setStudents] = useState([]);
 const [summary, setSummary] = useState({});
 
 const [fetchParams, setFetchParams] = useState({
   schoolId: "",
   academicYear: "",
   className: "",
   sectionName: "",
   staffId: "",
   subjectId: "",
 });

 useEffect(() => {
   if (schoolId && academicYear && className && sectionName && teacherData) {
     setFetchParams({
       schoolId: schoolId,
       academicYear: academicYear,
       className: className,
       sectionName: sectionName,
       staffId: teacherData.staffId,
       subjectId: teacherData.subjectId,
     });
   }
 }, [schoolId, academicYear, className, sectionName, teacherData]);

 useEffect(() => {
   // Check if all required parameters are available
   const {
     schoolId,
     academicYear,
     className,
     sectionName,
     staffId,
     subjectId,
   } = fetchParams;

   if (
     schoolId &&
     academicYear &&
     className &&
     sectionName &&
     staffId &&
     subjectId
   ) {
     fetchData(fetchParams);
   }
 }, [fetchParams]);

 const fetchData = async (params) => {
   setLoading(true);
   console.log("schoolId", params.schoolId);
   console.log("academicyear", params.academicYear);
   console.log("className", params.className);
   console.log("sectionName", params.sectionName);
   console.log("teacherData", params.teacherData);
        
   try {
     const response = await getAPI(
       `/teacher-feedback-students?schoolId=${params.schoolId}&academicYear=${params.academicYear}&className=${params.className}&sectionName=${params.sectionName}&staffId=${params.staffId}&subjectId=${params.subjectId}`,
       true
     );

     console.log("student details", response);

     if (response.data.success) {
       setStudents(response.data.data.students);
       setSummary({
         totalStudents: response.data.data.totalStudents,
         averageRating: response.data.data.averageRating,
       });
     } else {
       toast.error("Failed to fetch student feedback data");
     }
   } catch (error) {
     console.error("Error fetching student feedback data:", error);
     toast.error("Error fetching student feedback data");
   } finally {
     setLoading(false);
   }
 };

 const navigateBack = () => {
   navigate(-1);
 };

 const navigateToView = (event, student) => {
   event.preventDefault();
   navigate(
     `/school-dashboard/operational-service/teachers-feedback/teacher-list/feedback-fill-student/view-feedback-details`,
     {
       state: {
         schoolId: fetchParams.schoolId,
         academicYear: fetchParams.academicYear,
         className: fetchParams.className,
         sectionName: fetchParams.sectionName,
         teacherData: teacherData,
         studentData: student,
       },
     }
   );
 };

    

     if (loading) {
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
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
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Teacher Feedback Fill Student
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
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
                      <th className="text-nowrap">Name of Student</th>
                      <th className="text-nowrap">Feedback Date</th>
                      <th className="text-nowrap ">Overall Rating</th>
                      <th className="text-nowrap ">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? (
                      students.map((student, index) => (
                        <tr key={index}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </div>
                          </td>
                          <td className="text-center">{student.rollNumber}</td>
                          <td>{student.studentName}</td>
                          <td>
                            {new Date(
                              student.feedbackDate
                            ).toLocaleDateString()}
                          </td>

                          <td>{student.overallRating}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-light btn-sm"
                                onClick={(event) =>
                                  navigateToView(event, student)
                                }
                                title="View Feedback Details"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No students have submitted feedback for this teacher
                          yet
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
}
 
export default TeacherFeedbacFillStudentList

