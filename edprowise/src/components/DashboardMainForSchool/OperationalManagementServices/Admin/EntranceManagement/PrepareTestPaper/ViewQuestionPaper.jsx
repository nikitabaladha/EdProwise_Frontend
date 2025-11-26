import React, { useState,useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";

const ViewQuestionPaper = () => {
    const navigate = useNavigate();
const location = useLocation();
const { record} = location.state || {};
console.log("view record ",record);
const [loading, setLoading] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [questionSet, setQuestionsSet] = useState([]);
    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const id = userDetails?.schoolId;
        if (!id) {
          toast.error("School ID not found. Please log in again.");
          return;
        }
        setSchoolId(id);
      }, []);
    
useEffect(() => {
    if (record && schoolId) fetchQuestionSets();
  }, [record, schoolId]);

  const [questions, setQuestions] = useState([]);

 const fetchQuestionSets = async () => {
   try {
     const res = await getAPI(
       `/get-question-set-by-class-subjectid?schoolId=${schoolId}&academicYear=${record.academicYear}&classId=${record.classId}&subjectId=${record.subjectId}`
     );
     console.log("get response of get question set in View", res);

     if (!res.data.hasError && res.data.data) {
      setQuestionsSet(res.data.data)
      setQuestions(res.data.data.questions);
     }
   } catch (err) {
     toast.error("Error checking question set");
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
                    View Prepare Questions
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
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Academic Year <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Academic Year"
                        value={record.academicYear}
                        required
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
                        placeholder="Enter class"
                        value={record.className}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Subject
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={record.subjectName}
                        className="form-control"
                        placeholder="Enter Subject"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Total Questions
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Total Questions"
                        required
                        value={questions.length}
                        // value={questionSet.totalMarks}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Total Marks
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Total Marks"
                        value={questionSet.totalMarks}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Required Passing Marks
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Required Passing Marks"
                        value={questionSet.passingMarks}
                        required
                      />
                    </div>
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
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <div className="mb-3 d-md-flex align-items-center gap-2">
                          <label className="form-label d-flex">
                            Question <span className="text-danger me-1">*</span>{" "}
                            :
                          </label>
                          <TextareaAutosize
                            className="form-control"
                            required
                            value={question.questionText}
                            placeholder="Enter Question"
                            minRows={2}
                            maxRows={12}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-10">
                        <div className="container">
                          {/* First Row */}
                          <div className="row mb-md-3 mb-2 d-flex align-items-center">
                            <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">
                              A :
                            </div>
                            <div className="col-md-5 col-9 mb-md-0 mb-2">
                              <TextareaAutosize
                                className="form-control"
                                placeholder="Enter Option A"
                                minRows={1}
                                maxRows={12}
                                value={
                                  question.options.find(
                                    (o) => o.optionLabel === "A"
                                  )?.optionText || ""
                                }
                              />
                            </div>
                            <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">
                              B :
                            </div>
                            <div className="col-md-5 col-9 mb-md-0 mb-2">
                              <TextareaAutosize
                                className="form-control"
                                placeholder="Enter Option B"
                                minRows={1}
                                maxRows={12}
                                value={
                                  question.options.find(
                                    (o) => o.optionLabel === "B"
                                  )?.optionText || ""
                                }
                              />
                            </div>
                          </div>

                          {/* Second Row */}
                          <div className="row mb-md-3 mb-2 d-flex align-items-center">
                            <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">
                              C :
                            </div>
                            <div className="col-md-5 col-9 mb-md-0 mb-2">
                              <TextareaAutosize
                                className="form-control"
                                placeholder="Enter Option C"
                                minRows={1}
                                maxRows={12}
                                value={
                                  question.options.find(
                                    (o) => o.optionLabel === "C"
                                  )?.optionText || ""
                                }
                              />
                            </div>
                            <div className="col-md-1 col-3 mb-md-0 mb-2 text-end fw-bold">
                              D :
                            </div>
                            <div className="col-md-5 col-9 mb-md-0 mb-2">
                              <TextareaAutosize
                                className="form-control"
                                placeholder="Enter Option D"
                                minRows={1}
                                maxRows={12}
                                value={
                                  question.options.find(
                                    (o) => o.optionLabel === "D"
                                  )?.optionText || ""
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-4">
                        <div className="mb-3 d-md-flex align-items-center gap-2">
                          <label className="form-label text-nowrap d-flex ">
                            Correct Answer{" "}
                            <span className="text-danger  me-1">*</span> :
                          </label>
                          <input
                            type="text"
                            className={`form-control`}
                            required
                            value={question.correctAnswer}
                            placeholder="Enter Correct Answer"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3 d-md-flex align-items-center gap-2">
                          <label className="form-label text-nowrap d-flex ">
                            Assign Marks{" "}
                            <span className="text-danger  me-1">*</span> :
                          </label>
                          <input
                            type="text"
                            className={`form-control`}
                            required
                            value={question.marks}
                            placeholder="Enter Assign Marks"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestionPaper;
