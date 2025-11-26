// import React,{useState, useEffect} from "react";
// import { FaArrowAltCircleRight } from "react-icons/fa";
// import CreatableSelect from "react-select/creatable";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import postAPI from "../../../api/postAPI";
// import getAPI from "../../../api/getAPI";
// const ViewTeacherFeedbackForm = () => {
//   const navigate = useNavigate();
// const location = useLocation();
//     const {
//       schoolId,
//       academicYear,
//       admissionNumber,
//       className,
//       section,
//       teacherData,
//     } = location.state || {};

//       console.log("TEachers data ",teacherData);
 
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2 d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     View Teacher Feedback Form
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
//               <form onSubmit={handleSubmit}>
//                 {questions.map((question, index) => (
//                   <div key={index} className="row mb-3">
//                     <div
//                       className="card-header mt-0"
//                       style={{ padding: "0.50rem", borderBottom: "none" }}
//                     >
//                       <h5 className="card-title">Question {index + 1}</h5>
//                     </div>
//                     <div className="col-md-12">
//                       <p>
//                         <strong>{question.text}</strong>
//                         <span className="text-danger"> *</span>
//                       </p>
//                       <div className="d-flex flex-wrap gap-4">
//                         {question.options.map((option, optIndex) => (
//                           <label
//                             key={optIndex}
//                             className="d-flex align-items-center gap-2 fw-bold"
//                           >
//                             <input
//                               type="radio"
//                               name={`question-${index}`}
//                               value={option}
//                               checked={answers[index] === option}
//                               onChange={() => handleOptionChange(index, option)}
//                               required
//                             />
//                             {option}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="text-end">
//                   <button
//                     type="submit"
//                     className="  btn btn-primary mt-3"
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

// export default ViewTeacherFeedbackForm;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import getAPI from "../../../api/getAPI";
import { toast } from "react-toastify";
import getAPI from "../../../api/getAPI";

const ratingLabels = {
    5: "Excellent",
    4: "Good",
    3: "Average",
    2: "Poor",
    1: "Very Poor",
  };

const ViewTeacherFeedbackForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    schoolId,
    academicYear,
    admissionNumber,
    className,
    section,
    teacherData,
  } = location.state || {};

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (
      !admissionNumber ||
      !academicYear ||
      !className ||
      !section ||
      !teacherData?.staffId ||
      !teacherData?.subjectId
    ) {
      toast.error("Missing data to fetch feedback.");
      return;
    }
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await getAPI(
        `/teacher-feedback-details?admissionNumber=${admissionNumber}&academicYear=${academicYear}&className=${className}&sectionName=${section}&staffId=${teacherData.staffId}&subjectId=${teacherData.subjectId}`,
        true
      );

      if (response.data.success) {
        setFeedback(response.data.data);
      } else {
        toast.error(
          response.data.message || "Failed to fetch feedback details"
        );
      }
    } catch (error) {
      console.error("Error fetching teacher feedback:", error);
      toast.error("Error fetching feedback details");
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
                    View Teacher Feedback Form
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
              <form>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Name of Teacher <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="teacherName"
                        name="teacherName"
                        className="form-control"
                        required
                        value={teacherData.teacherName}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Subject <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control"
                        required
                        value={teacherData.subject}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Designation <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        className="form-control"
                        required
                        placeholder="Enter Designation"
                        value={formData.designation}
                        
                      />
                    </div>
                  </div> */}

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        Overall Rating <span className="text-danger">*</span>
                      </label>
                      <div className="star-rating" style={{ display: "flex" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            style={{
                              fontSize: "2rem",
                              color:
                                star <= feedback?.overallRating
                                  ? "#ffc107"
                                  : "#e4e5e9",
                              marginRight: "0.5rem",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="teachingStyle" className="form-label">
                        Teaching Style <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={ratingLabels[feedback?.teachingStyle] || "N/A"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="teachingExplanation"
                        className="form-label"
                      >
                        Teaching Explanation{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={
                          ratingLabels[feedback?.teachingExplanation] || "N/A"
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="classActivity" className="form-label">
                        Class Activity
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={ratingLabels[feedback?.classActivity] || "N/A"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="engagementWithStudents"
                        className="form-label"
                      >
                        Engagment with Students{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={
                          ratingLabels[feedback?.engagementWithStudents] || "N/A"
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="lessonPlanning" className="form-label">
                        Lesson Planning <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={ratingLabels[feedback?.lessonPlanning] || "N/A"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="behaviourSkills" className="form-label">
                        Behaviour Skills <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={ratingLabels[feedback?.behaviourSkills] || "N/A"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="discipline" className="form-label">
                        Discipline <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={ratingLabels[feedback?.discipline] || "N/A"}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="communicationSkills"
                        className="form-label"
                      >
                        Communication Skills{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={
                          ratingLabels[feedback?.communicationSkills] || "N/A"
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="surgery" className="form-label">
                        Good Listener <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={ratingLabels[feedback?.goodListener] || "N/A"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="arrivalOnTime" className="form-label">
                        Arrival on class on time{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={ratingLabels[feedback?.arrivalOnTime] || "N/A"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="guidanceAndMotivational"
                        className="form-label"
                      >
                        Guidance & Motivational{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={
                          ratingLabels[feedback?.guidanceAndMotivational] ||
                          "N/A"
                        }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="inspiration" className="form-label">
                        Inspiration<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={ratingLabels[feedback?.inspiration] || "N/A"}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="mb-3">
                      <label htmlFor="surgery" className="form-label">
                        Any other Remarks
                      </label>
                      <input
                        type="text"
                        id="remarks"
                        name="remarks"
                        value={feedback?.remarks}
                        className="form-control"
                        placeholder="Enter Any Remarks"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeacherFeedbackForm;
