// import React, { useState, useEffect } from "react";
// import getAPI from "../../api/getAPI";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import putAPI from "../../api/putAPI";
// import { toast } from "react-toastify";

// const ExamQuestionPage = () => {
//   // Example questions with options
//   const { testLink } = useParams();
//   const location = useLocation();
// const navigate = useNavigate();
//   // schoolId, academicYear, classId, registrationNumber passed via state
//   const { schoolId, academicYear, classId, registrationNumber } =
//     location.state || {};

//   const [testDetail, setTestDetail] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
// const [submitting, setSubmitting] = useState(false);
//   useEffect(() => {
//     const fetchTestDetails = async () => {
//       try {
//         const res = await getAPI(
//           `/get-assign-test-details-for-test?schoolId=${schoolId}&academicYear=${academicYear}&classId=${classId}&registrationNumber=${registrationNumber}&testLink=${testLink}`
//         );

//         if (!res.hasError) {
//           setTestDetail(res.data.data);
//           // setTimeLeft(parseInt(res.data.data.testDuration) * 60); // convert minutes to seconds
//            if (res.data.data.testDuration) {
//              const [hours, minutes] = res.data.data.testDuration
//                .split(":")
//                .map(Number);
//              const totalSeconds = hours * 3600 + minutes * 60;
//              setTimeLeft(totalSeconds);
//            }
//         }
//       } catch (error) {
//         console.error("Error fetching test details", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTestDetails();
//   }, [schoolId, academicYear, classId, registrationNumber, testLink]);

//   // Timer
//   // useEffect(() => {
//   //   if (timeLeft <= 0 ) return;
//   //   const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//   //   return () => clearInterval(timer);
//   // }, [timeLeft]);

//   useEffect(() => {
//     if (timeLeft <= 0 && testDetail) {
//       handleSubmitTest(true); // Auto-submit when time ends
//       return;
//     }
//     const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);


//    const formatTime = (seconds) => {
//      const h = Math.floor(seconds / 3600)
//        .toString()
//        .padStart(2, "0");
//      const m = Math.floor((seconds % 3600) / 60)
//        .toString()
//        .padStart(2, "0");
//      const s = (seconds % 60).toString().padStart(2, "0");
//      return `${h}:${m}:${s}`;
//    };

//   const handleOptionChange = (qid, selectedOption) => {
//     setAnswers((prev) => ({ ...prev, [qid]: selectedOption }));
//   };

//   if (loading) return <div>Loading test...</div>;
//   if (!testDetail) return <div>No test found.</div>;

//   const questions = testDetail.ansDetails;

//   const handleSaveAndNext = async () => {
//     const currentQuestion = questions[currentQuestionIndex];
//     const selectedAnswer = answers[currentQuestion.questionId] || null;

//     try { 
//      const res = await putAPI("/save-answer", {
//         schoolId,
//         academicYear,
//         classId,
//         registrationNumber,
//         testLink,
//         answers: { [currentQuestion.questionId]: selectedAnswer },
//         // questionId: currentQuestion.questionId,
//         // studentAnswer: selectedAnswer,
//       });
//       if (!res.hasError) toast.success("Answer saved");
//       else toast.error("Failed to save answer");

//     } catch (error) {
//       toast.error("Failed to save answer");
//     }

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//     }
//   };

//    const handleSubmitTest = async (auto = false) => {
//      setSubmitting(true);
//      try {
//        const res = await putAPI("/submit-test", {
//          schoolId,
//          academicYear,
//          classId,
//          registrationNumber,
//          testLink,
//          answers,
//        });

//        if (!res.hasError) {
//          toast.success(
//            auto
//              ? "Time's up! Test submitted automatically."
//              : "Test submitted successfully!"
//          );
//          navigate("/exam-result", { state: { result: res.data } });
//        } else {
//          toast.error("Failed to submit test.");
//        }
//      } catch (error) {
//        toast.error("Error submitting test.");
//      } finally {
//        setSubmitting(false);
//      }
//    };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               {/* Timer */}
//               <div className="d-flex justify-content-end mt-3">
//                 <div className="text-center">
//                   <h5>⏱ Time Left</h5>
//                   <h3 className="text-danger">{formatTime(timeLeft)}</h3>
//                 </div>
//               </div>

//               {/* Question */}
//               <div className="card shadow p-md-4 p-2">
//                 <h3>
//                   {/* Question {questions[currentQuestionIndex].id} of{" "}
//                   {questions.length} */}
//                   Question {currentQuestionIndex + 1} of {questions.length}
//                 </h3>
//                 <p className="mt-3">
//                   {questions[currentQuestionIndex].questionText}
//                 </p>

//                 {/* Options */}
//                 <div className="mt-3">
//                   {questions[currentQuestionIndex].options.map((opt, idx) => (
//                     <div key={idx} className="form-check">
//                       <input
//                         type="radio"
//                         className="form-check-input"
                        
//                         name={`question-${questions[currentQuestionIndex].questionId}`}
//                         value={opt.optionLabel}
//                         checked={
//                           answers[
//                             questions[currentQuestionIndex].questionId
//                           ] === opt.optionLabel
//                         }
//                         onChange={() =>
//                           handleOptionChange(
//                             questions[currentQuestionIndex].questionId,
//                             opt.optionLabel
//                           )
//                         }
//                       />
//                       <label
//                         className="form-check-label"
//                         // htmlFor={`q${questions[currentQuestionIndex].id}-opt${idx}`}
//                       >
//                         {opt.optionText}
//                       </label>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Navigation */}

//                 <div className="d-flex justify-content-center mt-4">
//                   {/* <button
//                     className="btn btn-secondary me-2"
//                     disabled={currentQuestionIndex === 0}
//                     onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
//                   >
//                     Back
//                   </button>
//                   <button
//                     className="btn btn-primary"
//                     disabled={currentQuestionIndex === questions.length - 1}
//                     // onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
//                     onClick={handleSaveAndNext}
//                   >
//                     Save & Next
//                   </button> */}
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleSubmitTest(false)}
//                     disabled={submitting}
//                   >
//                     Submit Test
//                   </button>
//                 </div>

//                 {/* Pagination Numbers */}
//                 <div className="d-flex justify-content-center mt-3 flex-wrap">
//                   {questions.map((q, index) => (
//                     <button
//                       key={q.questionId}
//                       className={`btn m-1 ${
//                         currentQuestionIndex === index
//                           ? "btn-primary"
//                           : "btn-outline-primary"
//                       }`}
//                       onClick={() => setCurrentQuestionIndex(index)}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExamQuestionPage;

import React, { useState, useEffect } from "react";
import getAPI from "../../api/getAPI";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import putAPI from "../../api/putAPI";
import { toast } from "react-toastify";
import ExamResultModal from "./ExamResultModal";
const ExamQuestionPage = () => {
  // Example questions with options
  const { testLink } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // schoolId, academicYear, classId, registrationNumber passed via state
  const { schoolId, academicYear, classId, registrationNumber } =
    location.state || {};

  const [testDetail, setTestDetail] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const res = await getAPI(
          `/get-assign-test-details-for-test?schoolId=${schoolId}&academicYear=${academicYear}&classId=${classId}&registrationNumber=${registrationNumber}&testLink=${testLink}`
        );
console.log("get in exam Question",res);

        if (!res.hasError) {
          setTestDetail(res.data.data);
          // setTimeLeft(parseInt(res.data.data.testDuration) * 60); // convert minutes to seconds
          if (res.data.data.testDuration) {
            const [hours, minutes] = res.data.data.testDuration
              .split(":")
              .map(Number);
            const totalSeconds = hours * 3600 + minutes * 60;
            setTimeLeft(totalSeconds);
          }
        }
      } catch (error) {
        console.error("Error fetching test details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [schoolId, academicYear, classId, registrationNumber, testLink]);

  // Timer
  // useEffect(() => {
  //   if (timeLeft <= 0 ) return;
  //   const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
  //   return () => clearInterval(timer);
  // }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0 && testDetail) {
      handleSubmitTest(true); // Auto-submit when time ends
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleOptionChange = (qid, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [qid]: selectedOption }));
  };

  if (loading) return <div>Loading test...</div>;
  if (!testDetail) return <div>No test found.</div>;

  const questions = testDetail.ansDetails;

  // const handleSaveAndNext = async () => {
  //   const currentQuestion = questions[currentQuestionIndex];
  //   const selectedAnswer = answers[currentQuestion.questionId] || null;

  //   try {
  //     const res = await putAPI("/save-answer", {
  //       schoolId,
  //       academicYear,
  //       classId,
  //       registrationNumber,
  //       testLink,
  //       answers: { [currentQuestion.questionId]: selectedAnswer },
  //       // questionId: currentQuestion.questionId,
  //       // studentAnswer: selectedAnswer,
  //     });
  //     if (!res.hasError) toast.success("Answer saved");
  //     else toast.error("Failed to save answer");
  //   } catch (error) {
  //     toast.error("Failed to save answer");
  //   }

  //   if (currentQuestionIndex < questions.length - 1) {
  //     setCurrentQuestionIndex((prev) => prev + 1);
  //   }
  // };

  const handleSubmitTest = async (auto = false) => {
    setSubmitting(true);
    try {
      const res = await putAPI("/submit-test", {
        schoolId,
        academicYear,
        classId,
        registrationNumber,
        testLink,
        answers,
      });

      if (!res.hasError) {
          setResultData(res.data.data); // store result data
          setShowResultModal(true); // show modal
          if (auto) toast.info("Time's up! Test submitted automatically.");
          else toast.success("Test submitted successfully!");
      } else {
        toast.error("Failed to submit test.");
      }
    } catch (error) {
      toast.error("Error submitting test.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // <div className="container">
    //   <div className="row">
    //     <div className="col-xl-12">
    //       <div className="card m-2">
    //         <div className="card-body custom-heading-padding">
    //           {/* Timer */}
    //           <div className="d-flex justify-content-end mt-3">
    //             <div className="text-center">
    //               <h5>⏱ Time Left</h5>
    //               <h3 className="text-danger">{formatTime(timeLeft)}</h3>
    //             </div>
    //           </div>

    //           {/* Question */}
    //           <div className="card shadow p-md-4 p-2">
    //             <h3>
    //               {/* Question {questions[currentQuestionIndex].id} of{" "}
    //               {questions.length} */}
    //               Question {currentQuestionIndex + 1} of {questions.length}
    //             </h3>
    //             <p className="mt-3">
    //               {questions[currentQuestionIndex].questionText}
    //             </p>

    //             {/* Options */}
    //             <div className="mt-3">
    //               {questions[currentQuestionIndex].options.map((opt, idx) => (
    //                 <div key={idx} className="form-check">
    //                   <input
    //                     type="radio"
    //                     className="form-check-input"
    //                     name={`question-${questions[currentQuestionIndex].questionId}`}
    //                     value={opt.optionLabel}
    //                     checked={
    //                       answers[
    //                         questions[currentQuestionIndex].questionId
    //                       ] === opt.optionLabel
    //                     }
    //                     onChange={() =>
    //                       handleOptionChange(
    //                         questions[currentQuestionIndex].questionId,
    //                         opt.optionLabel
    //                       )
    //                     }
    //                   />
    //                   <label
    //                     className="form-check-label"
    //                     // htmlFor={`q${questions[currentQuestionIndex].id}-opt${idx}`}
    //                   >
    //                     {opt.optionText}
    //                   </label>
    //                 </div>
    //               ))}
    //             </div>

    //             {/* Navigation */}

    //             <div className="d-flex justify-content-center mt-4">
    //               {/* <button
    //                 className="btn btn-secondary me-2"
    //                 disabled={currentQuestionIndex === 0}
    //                 onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
    //               >
    //                 Back
    //               </button>
    //               <button
    //                 className="btn btn-primary"
    //                 disabled={currentQuestionIndex === questions.length - 1}
    //                 // onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
    //                 onClick={handleSaveAndNext}
    //               >
    //                 Save & Next
    //               </button> */}
    //               <button
    //                 className="btn btn-danger"
    //                 onClick={() => handleSubmitTest(false)}
    //                 disabled={submitting}
    //               >
    //                 Submit Test
    //               </button>
    //             </div>

    //             {/* Pagination Numbers */}
    //             <div className="d-flex justify-content-center mt-3 flex-wrap">
    //               {questions.map((q, index) => (
    //                 <button
    //                   key={q.questionId}
    //                   className={`btn m-1 ${
    //                     currentQuestionIndex === index
    //                       ? "btn-primary"
    //                       : "btn-outline-primary"
    //                   }`}
    //                   onClick={() => setCurrentQuestionIndex(index)}
    //                 >
    //                   {index + 1}
    //                 </button>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // ...inside return()
    <>
      {/* <div className="container"> */}
      <div
        className="text-center bg-light p-2 rounded shadow"
        style={{
          position: "sticky",
          top: "40px",
          zIndex: 1000,
          width: "fit-content",
          // marginLeft: "auto",
          marginRight: "7%",
          justifySelf: "end",
        }}
      >
        <h5>⏱ Time Left</h5>
        <h3 className="text-danger">{formatTime(timeLeft)}</h3>
      </div>
      {/* </div> */}
      <div className="container">
        <div className="row">
          <div className="col-xl-12 position-relative">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                {/* Sticky Timer */}

                {/* All Questions */}
                {questions.map((question, index) => (
                  <div
                    key={question.questionId}
                    className="card shadow p-md-4 p-2 mb-3 mt-3"
                  >
                    <h5>
                      Question {index + 1} of {questions.length}
                    </h5>
                    <p className="mt-2">{question.questionText}</p>

                    {question.options.map((opt, idx) => (
                      <div key={idx} className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name={`question-${question.questionId}`}
                          value={opt.optionLabel}
                          checked={
                            answers[question.questionId] === opt.optionLabel
                          }
                          onChange={() =>
                            handleOptionChange(
                              question.questionId,
                              opt.optionLabel
                            )
                          }
                        />
                        <label className="form-check-label">
                          {opt.optionText}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Submit Button */}
                <div className="d-flex justify-content-center mt-4 mb-4">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleSubmitTest(false)}
                    disabled={submitting}
                  >
                    Submit Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ExamResultModal
          show={showResultModal}
          onClose={() => {
            setShowResultModal(false);
            //  navigate(ProcessingInstruction.env.REACT_APP_FRONTEND_URL);
            navigate(-1);
          }}
          resultData={resultData}
        />
      </div>
    </>
  );
};
export default ExamQuestionPage;
