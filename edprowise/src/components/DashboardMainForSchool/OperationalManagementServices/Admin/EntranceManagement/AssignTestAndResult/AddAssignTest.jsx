// import React,{useState, useEffect} from "react";
// import { FaArrowAltCircleRight } from "react-icons/fa";
// import CreatableSelect from "react-select/creatable";
// import { useLocation, useNavigate } from "react-router-dom";

// const AddAssignTest = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { schoolId, academicYear } = location.state || {};

//   const [formData, setFormData] = useState({

//   });

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2 d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Assign Test
//                   </h4>
//                   <button
//                     type="button"
//                     className="btn btn-primary custom-submit-button"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <form>
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <div className="position-relative">
//                         <label htmlFor="admissionNumber" className="form-label">
//                           Registration Number
//                           <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           id="admissionNumber"
//                           name="admissionNumber"
//                           className="form-control pe-5"
//                           placeholder="Enter Admission No"
//                         />
//                         <FaArrowAltCircleRight
//                           size={20}
//                           className="position-absolute custom-arraow-icon"
//                           style={{
//                             top: "71%",
//                             right: "10px",
//                             transform: "translateY(-50%)",
//                             color: "#000000",
//                             cursor: "pointer",
//                           }}
//                           title="Fetch Vendor Info"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="studentName" className="form-label">
//                         Name of Student <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="studentName"
//                         name="studentName"
//                         className="form-control"
//                         required
//                         placeholder="Enter Student Name"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="className" className="form-label">
//                         Class <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="className"
//                         name="className"
//                         className="form-control"
//                         required
//                         placeholder="Enter Class"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="section" className="form-label">
//                         Date of Registration{" "}
//                         <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         id="section"
//                         name="section"
//                         className="form-control"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="age" className="form-label">
//                         Assign Test <span className="text-danger">*</span>
//                       </label>
//                       <select className="form-control" required>
//                         <option value="Yes" defaultValue="Yes">
//                           Yes
//                         </option>
//                         <option value="No">No</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-end">
//                   <button
//                     type="submit"
//                     className="btn btn-primary custom-submit-button"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddAssignTest;

import React, { useState , useEffect} from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI";
import postAPI from "../../../../../../api/postAPI";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";

const AddAssignTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId, academicYear } = location.state || {};
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjectRows, setSubjectRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]); 
  const [examDuration, setExamDuration] = useState("");
  const [questionSetId, setQuestionSetId] = useState(null);
const [questionSetObjId, setQuestionSetObjId] = useState(null);

  const [formData, setFormData] = useState({});

  useEffect(() => {
      if (schoolId && academicYear){
        fetchClasses();    
      } 
    }, [schoolId, academicYear]);
  
    // Fetch Subjects when class selected
    useEffect(() => {
      if (selectedClass) {
        fetchSubjectsForClass();
       
    }
    }, [selectedClass]);
    
    useEffect(() => {
      if (selectedClass && selectedSubject){
        handleFetchStudent();
        fetchQuestionSets();
      } 
    }, [selectedClass, selectedSubject]);
  
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await getAPI(
          `/get-class-and-section-by-year/${schoolId}/${academicYear}`
        );
        if (!res.data.hasError) {
          setClasses(
            res.data.data.map((c) => ({
              value: c._id, 
              label: c.className,
            }))
          );
        } else toast.error(res.data.message || "Failed to fetch classes");
      } catch (err) {
        toast.error("Error fetching classes");
      } finally {
        setLoading(false);
      }
    };
  
   const fetchSubjectsForClass = async () => {
     setLoading(true);
     console.log("clssname", selectedClass.label);
     
     try {
       const res = await getAPI(
         `/get-question-set-subjects?schoolId=${schoolId}&academicYear=${academicYear}&classId=${selectedClass?.value}&className=${selectedClass?.label}`
       );
console.log("subject response", res);

       if (!res.data.hasError) {
         const mappedSubjects = res.data.data.map((sub) => ({
           value: sub.subjectId || null, 
           label: sub.subjectName,
         }));

         setSubjectRows(mappedSubjects);
       } else {
         toast.error(res.data.message || "Failed to fetch subjects");
       }
     } catch (error) {
       toast.error("Error fetching subjects");
     } finally {
       setLoading(false);
     }
   };
     

  //  const handleFetchStudent = async () => {
  //    if (!selectedClass?.value) {
  //      toast.error("Please select a class");
  //      return;
  //    }

  //    try {
  //      setLoading(true);
  //      const res = await getAPI(
  //        `/get-all-student-registraton-info-classid?schoolId=${schoolId}&academicYear=${academicYear}&classId=${selectedClass.value}`
  //      );

  //      console.log("get-student-res", res);

  //      if (!res.data.hasError) {
  //        setStudents(res.data.data); 
  //      } else {
  //        toast.error(res.data.message || "Failed to fetch students");
  //        setStudents([]);
  //      }
  //    } catch (error) {
  //      console.error("Error fetching student:", error);
  //      toast.error("Failed to fetch student details");
  //    } finally {
  //      setLoading(false);
  //    }
  //  };
const handleFetchStudent = async () => {
  if (!selectedClass?.value || !selectedSubject?.value) {
    toast.error("Please select class and subject");
    return;
  }

  try {
    setLoading(true);
    const res = await getAPI(
      `/get-students-with-assign-status?schoolId=${schoolId}&academicYear=${academicYear}&classId=${selectedClass.value}&subjectId=${selectedSubject.value}`
    );

    console.log("students-with-status", res);

    if (!res.data.hasError) {
      setStudents(res.data.data);
    } else {
      toast.error(res.data.message || "Failed to fetch students");
      setStudents([]);
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    toast.error("Failed to fetch student details");
  } finally {
    setLoading(false);
  }
};

  const fetchQuestionSets = async () => {
     
    try {
      setLoading(true);
      const selectsubjectvalue = 
        selectedSubject.value === "ALL" ? null : selectedSubject.value;
      const res = await getAPI(
        `/get-question-set-by-class-subjectid?schoolId=${schoolId}&academicYear=${academicYear}&classId=${selectedClass?.value}&subjectId=${selectsubjectvalue}`
      );
console.log("queston update  set", res);

      if (!res.data.hasError && res.data.data) {
        const qs = res.data.data;
        setQuestionSetId(qs.questionSetId);
        setQuestionSetObjId(qs._id);
        setExamDuration(qs.duration);
        
      } else {
        toast.error(res.data.message || "No question set found");
      }
    } catch (err) {
      toast.error("Error fetching question set");
    } finally {
      setLoading(false);
    }
  };

  //  Submit handler
  
const handleSubmit = async (e) => {
  e.preventDefault();

  const selectedStudents = students.filter((s) => s.isSelected);
  if (selectedStudents.length === 0) {
    toast.error("Please select at least one student");
    return;
  }

  try {
    setLoading(true);
    const payload = {
      schoolId,
      academicYear,
      classId: selectedClass.value,
      selectedStudents: selectedStudents.map((s) => ({
        registrationNumber: s.registrationNumber,
        registrationDate: s.registrationDate || new Date(),
      })),
      subjectId: selectedSubject.value,
      questionSetObjId,
      questionSetId,
      assignTest: formData.assignTest || "Yes",
    };

    const res = await postAPI("/post-assign-test", payload, {}, true);

    console.log("assign-test-res", res);

    if (res.data?.hasError) {
      toast.error(res.data.message || "Error assigning test");
    } else {
      toast.success("Test Assigned Successfully!");
      navigate(-1);
    }
  } catch (error) {
    console.error("Error submitting assign test:", error);
    toast.error("Failed to assign test");
  } finally {
    setLoading(false);
  }
};
const [selectedStudents, setSelectedStudents] = useState([]);
const [selectAll, setSelectAll] = useState(false);

const handleSelectAll = (e) => {
  const checked = e.target.checked;
  setSelectAll(checked);

  if (checked) {
    const unassignedStudents = students.filter((s) => !s.isAlreadyAssigned);
    setSelectedStudents(unassignedStudents);
  } else {
    setSelectedStudents([]);
  }
};

const handleSelectStudent = (student, checked) => {
  if (checked) {
    setSelectedStudents((prev) => [...prev, student]);
  } else {
    setSelectedStudents((prev) => prev.filter((s) => s._id !== student._id));
  }
};
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Assign Test
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
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Class
                        <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        options={classes}
                        placeholder="Select Class"
                        value={selectedClass}
                        onChange={(option) => {
                          setSelectedClass(option);
                        }}
                        className="email-select form-select-sm"
                        isLoading={loading}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Subject
                        <span className="text-danger">*</span>
                      </label>

                      <CreatableSelect
                        isClearable
                        options={subjectRows}
                        value={selectedSubject}
                        placeholder="Select Subject"
                        className="email-select form-select-sm"
                        isDisabled={!selectedClass}
                        onChange={(option) => setSelectedSubject(option)}
                        isLoading={loading}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="assignTest" className="form-label">
                        Assign Test <span className="text-danger">*</span>
                      </label>
                      <select
                        id="assignTest"
                        name="assignTest"
                        className="form-control"
                        value={formData.assignTest}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            assignTest: e.target.value,
                          })
                        }
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="examDuration" className="form-label">
                        Duration
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        isDisabled={!selectedSubject}
                        value={examDuration}
                      />
                    </div>
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
                              id="selectAll"
                              onChange={(e) => {
                                const checked = e.target.checked;
                                // Optionally handle select all logic here
                                setStudents((prev) =>
                                  prev.map((s) => ({
                                    ...s,
                                    isSelected: checked,
                                  }))
                                );
                              }}
                              // checked={selectAll}
                              // onChange={handleSelectAll}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="selectAll"
                            />
                          </div>
                        </th>
                        <th className="text-nowrap">Registration No.</th>
                        <th className="text-nowrap">Name of Student</th>
                        <th className="text-nowrap">Assign Test</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                      {students.length > 0 ? (
                        students.map((student, index) => (
                          <tr key={student._id}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={student.isSelected || false}
                                  onChange={(e) =>
                                    setStudents((prev) =>
                                      prev.map((s, i) =>
                                        i === index
                                          ? {
                                              ...s,
                                              isSelected: e.target.checked,
                                            }
                                          : s
                                      )
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td>{student.registrationNumber}</td>
                            <td>{student.studentName}</td>
                            <td>{student.assignTest || "Yes"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">
                            No students found for this class
                          </td>
                        </tr>
                      )}
                    </tbody> */}
                    <tbody>
                      {students.length > 0 ? (
                        students.map((student, index) => (
                          <tr
                            key={student._id}
                            className={
                              student.isAlreadyAssigned
                                ? "table-light text-muted"
                                : ""
                            }
                          >
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={student.isSelected || false}
                                  disabled={student.isAlreadyAssigned} // Disable checkbox
                                  // disabled={student.isAlreadyAssigned}
                                  onChange={(e) =>
                                    setStudents((prev) =>
                                      prev.map((s, i) =>
                                        i === index
                                          ? {
                                              ...s,
                                              isSelected: e.target.checked,
                                            }
                                          : s
                                      )
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td>{student.registrationNumber}</td>
                            <td>{student.studentName}</td>
                            <td>
                              {student.isAlreadyAssigned
                                ? "Already Assigned"
                                : "Available"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">
                            No students found for this class
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssignTest;
