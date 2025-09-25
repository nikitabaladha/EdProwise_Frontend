
// import React, { useState, useEffect } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import getAPI from "../../../../../../api/getAPI";
// import putAPI from "../../../../../../api/putAPI";
// const ViewStudentTestDetails = () => {
//   const navigate = useNavigate();
//    const location = useLocation();
//    const { record } = location.state || {};
//  console.log("view text details",record);
//   const [schoolId, setSchoolId] = useState("");
//     const [academicYear, setAcademicYear] = useState(
//       localStorage.getItem("selectedAcademicYear") || ""
//     );
//      const [classId, setClassId] = useState("");
//       const [registrationNumber, setRegistrationNumber] = useState("");
//   const [testDetail, setTestDetail] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [showResultModal, setShowResultModal] = useState(false);
//   const [resultData, setResultData] = useState(null);

  
//   const handleOptionChange = (qid, selectedOption) => {
//     setAnswers((prev) => ({ ...prev, [qid]: selectedOption }));
//   };

//   if (loading) return <div>Loading test...</div>;
//   if (!testDetail) return <div>No test found.</div>;
 
//   const questions = testDetail.ansDetails;

  
  
//   return (
//        <>
//       {/* </div> */}
//       <div className="container">
//         <div className="row">
//           <div className="col-xl-12 position-relative">
//             <div className="card m-2">
//               <div className="card-body custom-heading-padding">
//                 {questions.map((question, index) => (
//                   <div
//                     key={question.questionId}
//                     className="card shadow p-md-4 p-2 mb-3 mt-3"
//                   >
//                     <h5>
//                       Question {index + 1} of {questions.length}
//                     </h5>
//                     <p className="mt-2">{question.questionText}</p>

//                     {question.options.map((opt, idx) => (
//                       <div key={idx} className="form-check">
//                         <input
//                           type="radio"
//                           className="form-check-input"
//                           name={`question-${question.questionId}`}
//                           value={opt.optionLabel}
//                           checked={
//                             answers[question.questionId] === opt.optionLabel
//                           }
//                           onChange={() =>
//                             handleOptionChange(
//                               question.questionId,
//                               opt.optionLabel
//                             )
//                           }
//                         />
//                         <label className="form-check-label">
//                           {opt.optionText}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 ))}

               
             
//               </div>
//             </div>
//           </div>
//         </div>
        
//       </div>
//     </>
//   );
// };
// export default ViewStudentTestDetails;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewStudentTestDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { record } = location.state || {};
console.log("view records ",record);

  if (!record) {
    return ( 
      <div className="container text-center mt-5">
        <h5 className="text-danger">No test data found.</h5>
      </div>
    );
  }

  const {
    ansDetails,
    subjectName,
    totalMarks,
    passingMarks,
    receiveMarks,
    result,
  } = record;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Test Detail
                  </h4>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Student Name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        // value={examDuration}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Class
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        // isDisabled={!selectedSubject}
                        value={"Nursary"}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="assignTest" className="form-label">
                        Subject Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        // isDisabled={!selectedSubject}
                        value={record?.subjectName}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="examDuration" className="form-label">
                        Test Date
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={record?.assignTestDate}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="examDuration" className="form-label">
                        Result
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        // isDisabled={!selectedSubject}
                        value={record?.result}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="examDuration" className="form-label">
                        Marks Obtained
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        // isDisabled={!selectedSubject}
                        value={record?.receiveMarks}
                      />
                    </div>
                  </div>
                </div>
              </form>

              {/* Question List */}
              {ansDetails && ansDetails.length > 0 ? (
                ansDetails.map((question, index) => (
                  <div
                    key={question.questionId}
                    className="card shadow-sm mb-3 border-0"
                  >
                    <div className="card-body">
                      <h4 className="fw-bold">
                        Q{index + 1}. {question.questionText}
                      </h4>
                      <div className="mt-2">
                        {question.options.map((opt, idx) => {
                          const isCorrect =
                            opt.optionLabel === question.correctAnswer;
                          const isSelected =
                            opt.optionLabel === question.studentAnswer;

                          return (
                            <div
                              key={idx}
                              className={`p-2 rounded mb-2 ${
                                isCorrect
                                  ? "bg-success text-white"
                                  : isSelected && !isCorrect
                                  ? "bg-danger text-white"
                                  : "bg-light"
                              }`}
                            >
                              <strong>{opt.optionLabel})</strong>{" "}
                              {opt.optionText}
                            </div>
                          );
                        })}
                      </div>

                      {/* If student did not answer */}
                      {question.studentAnswer === null && (
                        <p className="text-warning fw-bold mt-2">
                          ⚠️ Not Attempted
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert-info text-center">
                  No questions found for this test.
                </div>
              )}

              {/* Back Button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentTestDetails;
