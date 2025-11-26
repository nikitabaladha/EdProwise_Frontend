// import React, {useState, useEffect} from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";
// import TextareaAutosize from "react-textarea-autosize";
// import RequiredPassingMarksModal from "./RequiredPassingMarksModal";
// import postAPI from "../../../../../../api/postAPI";
// import getAPI from "../../../../../../api/getAPI";
// import { toast } from "react-toastify";

// const AddQuestionSet = () => {

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { schoolId, academicYear } = location.state || {};

//   const [classes, setClasses] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [subjectRows, setSubjectRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [examDuration, setExamDuration] = useState("");

//   const [questions, setQuestions] = useState([
//     { text: "", options: ["", "", "", ""], correctAnswer: "", marks: "" },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleOpenModal = () => {
//     if (!selectedClass || !selectedSubject || !examDuration) {
//       toast.error("Please select class, subject and duration.");
//       return;
//     }

//     const allQuestionsValid = questions.every(
//       (q) =>
//         q.text.trim() &&
//         q.options.every((opt) => opt.trim()) &&
//         q.correctAnswer &&
//         q.marks
//     );

//     if (!allQuestionsValid) {
//       toast.error(
//         "Please fill all questions, options, correct answers and marks."
//       );
//       return;
//     }

//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => setIsModalOpen(false);

//   // Fetch Classes
//   useEffect(() => {
//     if (schoolId && academicYear) fetchClasses();
//   }, [schoolId, academicYear]);

//   // Fetch Subjects when class selected
//   useEffect(() => {
//     if (selectedClass) fetchSubjects();
//   }, [selectedClass]);

//    useEffect(() => {
//      if (selectedClass && selectedSubject) fetchCheckQuestionSet();
//    }, [selectedClass, selectedSubject]);

//   const fetchClasses = async () => {
//     try {
//       setLoading(true);
//       const res = await getAPI(
//         `/get-class-and-section-by-year/${schoolId}/${academicYear}`
//       );
//       if (!res.data.hasError) {
//         setClasses(
//           res.data.data.map((c) => ({
//             value: c._id, // store _id so we can send in API
//             label: c.className,
//           }))
//         );
//       } else toast.error(res.data.message || "Failed to fetch classes");
//     } catch (err) {
//       toast.error("Error fetching classes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSubjects = async () => {
//     try {
//       const res = await getAPI(
//         `/get-class-subjects-by-classname?schoolId=${schoolId}&academicYear=${academicYear}&className=${selectedClass.label}`
//       );
//       if (!res.data.hasError) {
//         setSubjectRows(
//           res.data.data[0]?.subjects.map((s) => ({
//             value: s._id,
//             label: s.subjectName,
//           })) || []
//         );
//       }
//     } catch (err) {
//       toast.error("Error fetching subjects");
//     }
//   };
// const fetchCheckQuestionSet = async () => {
//   try {
//     const res = await getAPI(
//       `/get-question-set-by-class-subjectid?schoolId=${schoolId}&academicYear=${academicYear}&classId=${selectedClass.value}&subjectId=${selectedSubject.value}`
//     );

//     if (!res.data.hasError && res.data.data) {
//       toast.info(
//         `class ${selectedClass.label} for subject ${selectedSubject.label} question set already created.`
//       );
//     }
//   } catch (err) {
//     toast.error("Error checking question set");
//   }
// };

//   // Question Handlers
//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       { text: "", options: ["", "", "", ""], correctAnswer: "", marks: "" },
//     ]);
//   };

//   const removeQuestion = (index) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const handleQuestionChange = (index, value) => {
//     const updated = [...questions];
//     updated[index].text = value;
//     setQuestions(updated);
//   };

//   const handleOptionChange = (qIndex, optIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].options[optIndex] = value;
//     setQuestions(updated);
//   };

//   const handleCorrectAnswerChange = (qIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].correctAnswer = value;
//     setQuestions(updated);
//   };

//   const handleMarksChange = (qIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].marks = value;
//     setQuestions(updated);
//   };

//   // Submit API call
//   const handleSubmit = async (passingMarks) => {
//     try {
//       const payload = {
//         schoolId,
//         academicYear,
//         classId: selectedClass.value,
//         subjectId: selectedSubject.value,
//         duration: examDuration,
//         questions: questions.map((q) => ({
//           questionText: q.text,
//           options: [
//             { optionLabel: "A", optionText: q.options[0] },
//             { optionLabel: "B", optionText: q.options[1] },
//             { optionLabel: "C", optionText: q.options[2] },
//             { optionLabel: "D", optionText: q.options[3] },
//           ],
//           correctAnswer: q.correctAnswer,
//           marks: Number(q.marks),
//         })),
//         passingMarks: Number(passingMarks),
//       };

//       const res = await postAPI(
//         "/create-or-update-question-set",
//         payload,
//         {},
//         true
//       );

//       if (!res.data.hasError) {
//         toast.success(res.data.message);
//         navigate(-1);
//       } else {
//         toast.error(res.data.message || "Failed to create question set");
//       }
//     } catch (err) {
//       toast.error("Error submitting question set");
//     }
//   };

//   const totalMarks = questions.reduce(
//     (sum, q) => sum + (Number(q.marks) || 0),
//     0
//   );

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2 d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Prepare Questions
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
//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="className" className="form-label">
//                         Class
//                         <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         options={classes}
//                         placeholder="Select Class"
//                         value={selectedClass}
//                         onChange={(option) => {
//                           setSelectedClass(option);
//                         }}
//                         className="email-select form-select-sm"
//                         isLoading={loading}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="className" className="form-label">
//                         Subject
//                         <span className="text-danger">*</span>
//                       </label>

//                       <CreatableSelect
//                         isClearable
//                         options={subjectRows}
//                         value={selectedSubject}
//                         placeholder="Select Subject"
//                         className="email-select form-select-sm"
//                         isDisabled={!selectedClass}
//                         onChange={(option) => {
//                           setSelectedSubject(option);
//                         }}
//                         isLoading={loading}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="examDuration" className="form-label">
//                         Duration
//                         <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="time"
//                         className="form-control"
//                         value={examDuration}
//                         onChange={(e) => setExamDuration(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {questions.map((question, index) => (
//                   <div key={index} className="row mb-3">
//                     <div
//                       className="d-flex justify-content-between"
//                       style={{ padding: "0" }}
//                     >
//                       <div
//                         className="card-header mt-0"
//                         style={{ padding: "0.50rem", borderBottom: "none" }}
//                       >
//                         <h4 className="card-title text-center">
//                           Question {index + 1}
//                         </h4>
//                       </div>
//                       {index !== 0 && (
//                         <div className="card-header p-0">
//                           <Link
//                             className="btn btn-soft-danger me-md-2 btn-sm"
//                             onClick={() => removeQuestion(index)}
//                           >
//                             <iconify-icon
//                               icon="solar:trash-bin-minimalistic-2-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>
//                         </div>
//                       )}
//                     </div>
//                     <div className="row">
//                       <div className="col-md-10">
//                         <div className="mb-3 d-md-flex align-items-center gap-2">
//                           <label className="form-label d-flex">
//                             Question <span className="text-danger me-1">*</span>{" "}
//                             :
//                           </label>

//                           <TextareaAutosize
//                             className="form-control"
//                             required
//                             value={question.text}
//                             onChange={(e) =>
//                               handleQuestionChange(index, e.target.value)
//                             }
//                             placeholder="Enter Question"
//                             minRows={2}
//                             maxRows={12}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     {/* <div className="row ">
//                       <div className="col-md-10">
//                         <div className="container">
//                           <div className="row mb-md-3 mb-2 d-flex align-items-center">
//                             <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">
//                               A :
//                             </div>
//                             <div className="col-md-5 col-9 mb-md-0 mb-2">
                              
//                               <TextareaAutosize
//                                 className="form-control"
//                                 placeholder="Enter Option"
//                                 minRows={1}
//                                 maxRows={12}
//                               />
//                             </div>
//                             <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">
//                               B :
//                             </div>
//                             <div className="col-md-5 col-9 mb-md-0 mb-2">
//                               <TextareaAutosize
//                                 className="form-control"
//                                 placeholder="Enter Option"
//                                 minRows={1}
//                                 maxRows={12}
//                               />
//                             </div>
//                           </div>

//                           <div className="row mb-md-3 mb-2 d-flex align-items-center">
//                             <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">
//                               C :
//                             </div>
//                             <div className="col-md-5 col-9 mb-md-0 mb-2">
//                               <TextareaAutosize
//                                 className="form-control"
//                                 placeholder="Enter Option"
//                                 minRows={1}
//                                 maxRows={12}
//                               />
//                             </div>
//                             <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">
//                               D :
//                             </div>
//                             <div className="col-md-5 col-9 mb-md-0 mb-2">
//                               <TextareaAutosize
//                                 className="form-control"
//                                 placeholder="Enter Option"
//                                 minRows={1}
//                                 maxRows={12}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div> */}
//                     <div className="row">
//   <div className="col-md-10">
//     <div className="container">
//       {/* First Row (A & B) */}
//       <div className="row mb-md-3 mb-2 d-flex align-items-center">
//         <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">A :</div>
//         <div className="col-md-5 col-9 mb-md-0 mb-2">
//           <TextareaAutosize
//             className="form-control"
//             placeholder="Enter Option A"
//             minRows={1}
//             maxRows={12}
//             value={question.options[0]}
//             onChange={(e) => handleOptionChange(index, 0, e.target.value)}
//           />
//         </div>

//         <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">B :</div>
//         <div className="col-md-5 col-9 mb-md-0 mb-2">
//           <TextareaAutosize
//             className="form-control"
//             placeholder="Enter Option B"
//             minRows={1}
//             maxRows={12}
//             value={question.options[1]}
//             onChange={(e) => handleOptionChange(index, 1, e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Second Row (C & D) */}
//       <div className="row mb-md-3 mb-2 d-flex align-items-center">
//         <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">C :</div>
//         <div className="col-md-5 col-9 mb-md-0 mb-2">
//           <TextareaAutosize
//             className="form-control"
//             placeholder="Enter Option C"
//             minRows={1}
//             maxRows={12}
//             value={question.options[2]}
//             onChange={(e) => handleOptionChange(index, 2, e.target.value)}
//           />
//         </div>

//         <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">D :</div>
//         <div className="col-md-5 col-9 mb-md-0 mb-2">
//           <TextareaAutosize
//             className="form-control"
//             placeholder="Enter Option D"
//             minRows={1}
//             maxRows={12}
//             value={question.options[3]}
//             onChange={(e) => handleOptionChange(index, 3, e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//                     <div className="row ">
//                       <div className="col-md-4">
//                         <div className="mb-3 d-md-flex align-items-center gap-2">
//                           <label className="form-label text-nowrap d-flex ">
//                             Correct Answer{" "}
//                             <span className="text-danger  me-1">*</span> :
//                           </label>
//                           <select
//                             className="form-control"
//                             required
//                             value={question.correctAnswer}
//                             onChange={(e) =>
//                               handleCorrectAnswerChange(index, e.target.value)
//                             }
//                           >
//                             <option value="">Select Correct Option</option>
//                             <option value="A">A</option>
//                             <option value="B">B</option>
//                             <option value="C">C</option>
//                             <option value="D">D</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-md-4">
//                         <div className="mb-3 d-md-flex align-items-center gap-2">
//                           <label className="form-label text-nowrap d-flex ">
//                             Assign Marks{" "}
//                             <span className="text-danger  me-1">*</span> :
//                           </label>
//                           <input
//                             type="text"
//                             value={question.marks}
//                             onChange={(e) =>
//                               handleMarksChange(index, e.target.value)
//                             }
//                             className={`form-control`}
//                             required
//                             placeholder="Enter Assign Marks"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="text-end  card-header">
//                   <button
//                     type="button"
//                     className="btn btn-primary me-2 custom-submit-button"
//                     onClick={addQuestion}
//                   >
//                     Add Question
//                   </button>

//                   <button
//                     type="button"
//                     className="btn btn-primary custom-submit-button"
//                     onClick={handleOpenModal}
//                   >
//                     Submit 
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <RequiredPassingMarksModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         totalMarks={totalMarks}
//         onSubmit={(passingMarks) => {
//           handleCloseModal();
//           handleSubmit(passingMarks);
//         }}
//       />
//     </div>
//   );
// };

// export default AddQuestionSet;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import RequiredPassingMarksModal from "./RequiredPassingMarksModal";
import getAPI from "../../../../../../api/getAPI";
import putAPI from "../../../../../../api/putAPI";
import { toast } from "react-toastify";

const UpdateQuestionSet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { record } = location.state || {};
  const [schoolId, setSchoolId] = useState("");
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [loading, setLoading] = useState(false);
  const [examDuration, setExamDuration] = useState("");
  const [passingMarks, setPassingMarks] = useState("");
  const [questions, setQuestions] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [questionSetId, setQuestionSetId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch schoolId from localStorage
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  // Fetch question set details
  useEffect(() => {
    if (record && schoolId) fetchQuestionSets();
  }, [record, schoolId]);

  const fetchQuestionSets = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-question-set-by-class-subjectid?schoolId=${schoolId}&academicYear=${record.academicYear}&classId=${record.classId}&subjectId=${record.subjectId}`
      );
console.log("queston update  set", res);

      if (!res.data.hasError && res.data.data) {
        const qs = res.data.data;
        setQuestionSetId(qs._id);
        setAcademicYear(qs.academicYear);
        setExamDuration(qs.duration);
        setPassingMarks(qs.passingMarks);
        setQuestions(
          qs.questions.map((q) => ({
            text: q.questionText,
            options: q.options.map((o) => o.optionText),
            correctAnswer: q.correctAnswer,
            marks: q.marks,
          }))
        );
        setTotalMarks(qs.totalMarks);
      } else {
        toast.error(res.data.message || "No question set found");
      }
    } catch (err) {
      toast.error("Error fetching question set");
    } finally {
      setLoading(false);
    }
  };

  // Question Handlers
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctAnswer: "", marks: "" },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  const handleMarksChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].marks = value;
    setQuestions(updated);
  };

  // Validate before opening modal
  const handleOpenModal = () => {
    if (!examDuration) {
      toast.error("Please enter exam duration.");
      return;
    }

    const allQuestionsValid = questions.every(
      (q) =>
        q.text.trim() &&
        q.options.every((opt) => opt.trim()) &&
        q.correctAnswer &&
        q.marks
    );

    if (!allQuestionsValid) {
      toast.error(
        "Please fill all questions, options, correct answers and marks."
      );
      return;
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // Submit PUT API
  const handleSubmit = async (passingMarksValue) => {
    try {
      const payload = {
        academicYear,
        classId: record.classId,
        subjectId: record.subjectId,
        duration: examDuration,
        totalMarks: questions.reduce((sum, q) => sum + Number(q.marks || 0), 0),
        passingMarks: Number(passingMarksValue),
        questions: questions.map((q) => ({
          questionText: q.text,
          options: [
            { optionLabel: "A", optionText: q.options[0] },
            { optionLabel: "B", optionText: q.options[1] },
            { optionLabel: "C", optionText: q.options[2] },
            { optionLabel: "D", optionText: q.options[3] },
          ],
          correctAnswer: q.correctAnswer,
          marks: Number(q.marks),
        })),
      };

      const res = await putAPI(
        `/update-question-set/${questionSetId}`,
        payload
      );

      if (!res.data.hasError) {
        toast.success("Question set updated successfully!");
        navigate(-1);
      } else {
        toast.error(res.data.message || "Failed to update question set");
      }
    } catch (err) {
      toast.error("Error updating question set");
    }
  };

  const totalMarksCalculated = questions.reduce(
    (sum, q) => sum + (Number(q.marks) || 0),
    0
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Update Questions
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
              {loading ? (
                <p>Loading...</p>
              ) : (
                <form>
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <label className="form-label">
                        Academic Year <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={academicYear}
                        readOnly
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">
                        Class <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={record.className}
                        readOnly
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">
                        Subject <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={record.subjectName}
                        readOnly
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">
                        Exam Duration (minutes)
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        value={record.duration}
                        onChange={(e) => setExamDuration(e.target.value)}
                        placeholder="Enter duration"
                      />
                    </div>
                  </div>

                  {questions.map((question, index) => (
                    <div key={index} className="row mb-3">
                      <div
                        className="d-flex justify-content-between"
                        style={{ padding: "0" }}
                      >
                        <div
                          className="card-header mt-0"
                          style={{ padding: "0.50rem", borderBottom: "none" }}
                        >
                          <h4 className="card-title text-center">
                            Question {index + 1}
                          </h4>
                        </div>
                        <div className="card-header p-0">
                          <Link
                            className="btn btn-soft-danger me-md-2 btn-sm"
                            onClick={() => removeQuestion(index)}
                          >
                            <iconify-icon
                              icon="solar:trash-bin-minimalistic-2-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                        </div>
                        {/* <button
                          type="button"
                          className="btn btn-soft-danger btn-sm"
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button> */}
                      </div>
                      {/* <TextareaAutosize
                        className="form-control mb-2"
                        value={question.text}
                        onChange={(e) =>
                          handleQuestionChange(index, e.target.value)
                        }
                        placeholder="Enter Question"
                        minRows={2}
                      /> */}
                      <div className="row">
                        <div className="col-md-10">
                          <div className="mb-3 d-md-flex align-items-center gap-2">
                            <label className="form-label d-flex">
                              Question{" "}
                              <span className="text-danger me-1">*</span> :
                            </label>

                            <TextareaAutosize
                              className="form-control"
                              required
                              value={question.text}
                              onChange={(e) =>
                                handleQuestionChange(index, e.target.value)
                              }
                              placeholder="Enter Question"
                              minRows={2}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {["A", "B", "C", "D"].map((label, i) => (
                          <div className="col-md-6 mb-2 d-flex" key={label}>
                            <label className="fw-bold me-2">{label}:</label>
                            {/* <div className="col-md-5 col-9 mb-md-0 mb-2"> */}
                              <TextareaAutosize
                                className="form-control"
                                value={question.options[i]}
                                onChange={(e) =>
                                  handleOptionChange(index, i, e.target.value)
                                }
                                placeholder={`Enter Option ${label}`}
                                minRows={1}
                              />
                            {/* </div> */}
                          </div>
                        ))}
                      </div>
                      <div className="row">
                        <div className="col-md-6 d-flex">
                          <label>Correct Answer</label>
                          <select
                            className="form-control"
                            value={question.correctAnswer}
                            onChange={(e) =>
                              handleCorrectAnswerChange(index, e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>
                        </div>
                        <div className="col-md-6 d-flex">
                          <label>Marks</label>
                          <input
                            type="number"
                            className="form-control"
                            value={question.marks}
                            onChange={(e) =>
                              handleMarksChange(index, e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}

                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-primary me-2"
                      onClick={addQuestion}
                    >
                      Add Question
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleOpenModal}
                    >
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <RequiredPassingMarksModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        totalMarks={totalMarksCalculated}
        onSubmit={(value) => {
          handleCloseModal();
          handleSubmit(value);
        }}
      />
    </div>
  );
};

export default UpdateQuestionSet;


