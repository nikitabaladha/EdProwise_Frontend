// import React, { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import getAPI from "../../../../../../api/getAPI";
// import ConfirmationDialog from "../../../../../ConfirmationDialog";
// import CreatableSelect from "react-select/creatable";

// const StudentAssignTestDetails = () => {
//     const navigate = useNavigate();
//       const location = useLocation();
//       const { record } = location.state || {};
//       console.log("student record",record);
      
//     const [classes, setClasses] = useState([]);
    
//       const [sections, setSections] = useState([]);
//       const [subjectRows, setSubjectRows] = useState([]);
//       const [loading, setLoading] = useState(false);
//       const [selectedClass, setSelectedClass] = useState(null);
//       const [selectedSubject, setSelectedSubject] = useState(null);
//       const [students, setStudents] = useState([]); 
//       const [examDuration, setExamDuration] = useState("");
//       const [questionSetId, setQuestionSetId] = useState(null);
//     const [questionSetObjId, setQuestionSetObjId] = useState(null);
//     const [records, setRecords] = useState([]);
      
//     useEffect(() => {
//         if (record ) {
//          setRecords(record);
//         }
//       }, [record]);

//   return (
//         <div className="container-fluid">
//           <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
          
//           </div>
//           <div className="row">
//             <div className="col-xl-12">
//               <div className="card m-2">
//                 <div className="card-body custom-heading-padding">
//                   <div className="container">
//                     <div className="card-header d-flex flex-wrap align-items-center">
//                       <h4 className="card-title flex-grow-1 text-center">
//                         Assign Test Records
//                       </h4>
//                       {/* <select
//                         className="form-select form-select-sm me-2 w-auto"
//                         value={academicYear}
//                         onChange={(e) => {
//                           setAcademicYear(e.target.value);
//                         }}
//                       >
//                         <option disabled>Select Academic Year</option>
//                         <option value="2025-2026">2025-2026 </option>
//                         <option value="2026-2027">2026-2027 </option>
//                       </select> */}
//                       {/* <CreatableSelect
//                         isClearable
//                         name="class"
//                         options={classes}
//                         placeholder="Select Class"
//                         className="email-select me-2 form-select-sm text-nowrap"
//                         value={selectedClass}
//                         onChange={(option) => {
//                           setSelectedClass(option);
//                         }}
//                         isLoading={loading}
//                       />
//                       <select
//                         className="form-select form-select-sm me-2 w-auto"
//                         value={result}
//                         onChange={(e) => {
//                           setResult(e.target.value);
//                         }}
//                       >
//                         <option disabled>Select Result</option>
//                         <option value="Pass">Pass </option>
//                         <option value="Fail">Fail </option>
//                         <option value="Awaited">Await </option>
//                       </select> */}
//                     </div>
//                   </div>
//                   <div className="table-responsive">
//                     <table className="table align-middle mb-0 table-hover table-centered text-center">
//                       <thead className="bg-light-subtle">
//                         <tr className="payroll-table-header">
//                           <th className="">
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id="customCheck1"
//                               />
//                               <label
//                                 className="form-check-label"
//                                 htmlFor="customCheck1"
//                               />
//                             </div>
//                           </th>
//                           <th className="text-nowrap ">Registrtion No. </th>
//                           <th className="text-nowrap ">Date of Registration</th>
//                           <th className="text-nowrap">Academic Year</th>
//                           <th className="text-nowrap">Name of Student</th>
//                           <th className="text-nowrap">Class</th>
//                           <th className="text-nowrap">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {records.length > 0 ? (
//                           records.map((record, index) => (
//                             <tr key={record._id}>
//                               <td>
//                                 <div className="form-check ms-1">
//                                   <input
//                                     type="checkbox"
//                                     className="form-check-input"
//                                     id={`check-${index}`}
//                                   />
//                                 </div>
//                               </td>
//                               <td>{record.registrationNumber}</td>
//                               <td>
//                                 {new Date(
//                                   record.registrationDate
//                                 ).toLocaleDateString("en-GB", {
//                                   day: "2-digit",
//                                   month: "2-digit",
//                                   year: "numeric",
//                                 })}
//                               </td>
//                               <td>{record.academicYear}</td>
//                               <td>{record.studentName || "N/A"}</td>
//                               <td>{record.className}</td>
//                               <td>
//                                 {/* <select
//                                   className="form-control"
//                                   value={record.result}
//                                   onChange={(e) =>
//                                     handleResultChange(e, record._id)
//                                   }
//                                 >
//                                   <option disabled>Select</option>
//                                   <option value="Awaited">Awaited</option>
//                                   <option value="Pass">Pass</option>
//                                   <option value="Fail">Fail</option>
//                                 </select> */}
//     <div className="d-flex gap-2 justify-content-center">
//                                 <Link
//                                   className="btn btn-light btn-sm"
//                                 //   onClick={(e) => navigateToView(e, record)}
//                                 >
//                                   <iconify-icon
//                                     icon="solar:eye-broken"
//                                     className="align-middle fs-18"
//                                   />
//                                 </Link>
                                
                                
//                               </div>
//                               </td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="9" className="text-center">
//                               No records found
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//   )
// } 

// export default StudentAssignTestDetails


import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";

const StudentAssignTestDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { record } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [assignTests, setAssignTests] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);

  const fetchAssignTests = async () => {
    if (!record) return;
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-student-assign-tests-details?schoolId=${record.schoolId}&academicYear=${record.academicYear}&registrationNumber=${record.registrationNumber}&classId=${record.classId}`
      );
console.log("student get the student detaills",res);

      if (!res.data.hasError) {
        setStudentInfo(res.data.student);
        setAssignTests(res.data.data); // array of assign tests with enriched subject names
      } else {
        toast.error(res.data.message || "Failed to fetch assign test records");
      }
    } catch (error) {
      console.error("Error fetching assign tests:", error);
      toast.error("Error fetching assign test records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  
const navigateToView = (event, record) => {
  event.preventDefault();
  navigate(
    `/school-dashboard/operational-service/entrance-management/test-list/view-assign-test/view-test`,
    { state: { record } }
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
                    Assign Test Records
                  </h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* Student Details */}
              {/* {studentInfo && (
                <div className="mb-3">
                  <h6>
                    <strong>Student:</strong> {studentInfo.studentName} |{" "}
                    <strong>Reg No:</strong> {studentInfo.registrationNumber} |{" "}
                    <strong>Class:</strong> {studentInfo.className}
                    {studentInfo.sectionName
                      ? ` - ${studentInfo.sectionName}`
                      : ""}
                  </h6>
                </div>
              )} */}

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th>Test Date</th>
                      <th>Subject</th>
                      <th>Passing Marks</th>
                      <th>Marks</th>
                      <th>Result</th>
                      {/* <th>Test Link</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignTests.length > 0 ? (
                      assignTests.map((record) =>
                        record.testDetails.map((td, idx) => (
                          <tr key={`${record._id}-${idx}`}>
                            <td>
                              {new Date(td.assignTestDate).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td>{td.subjectName}</td>
                            <td>{td.passingMarks ?? 0}</td>
                            <td>{td.receiveMarks ?? 0}</td>
                            <td>{td.result}</td>
                            <td>
                              <Link
                                className="btn btn-light btn-sm"
                                onClick={(e) => navigateToView(e, td)}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                            </td>
                          </tr>
                        ))
                      )
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          {loading ? "Loading..." : "No records found"}
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

export default StudentAssignTestDetails;
