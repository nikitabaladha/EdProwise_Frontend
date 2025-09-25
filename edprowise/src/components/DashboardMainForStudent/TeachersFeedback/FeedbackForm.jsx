
import React,{useState, useEffect} from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import postAPI from "../../../api/postAPI";

const FeedbackForm = () => {
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

      console.log("TEachers data ",teacherData);
      
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

 const [formData, setFormData] = useState({
   teacherName: teacherData?.teacherName || "",
   subject: teacherData?.subjectName || "",
   subjectId: teacherData?.subjectId || "",
   staffId: teacherData?.staffId || "",
   overallRating: 0,
   teachingStyle: "",
   teachingExplanation: "",
   classActivity: "",
   engagementWithStudents: "",
   lessonPlanning: "",
   behaviourSkills: "",
   discipline: "",
   communicationSkills: "",
   goodListener: "",
   arrivalOnTime: "",
   guidanceAndMotivational: "",
   inspiration: "",
   remarks: "",
 });
useEffect(() => {
  if (teacherData) {
    setFormData((prev) => ({
      ...prev,
      teacherName: teacherData.teacherName,
      subject: teacherData.subjectName,
      subjectId: teacherData.subjectId,
      staffId: teacherData.staffId,
    }));
  }
}, [teacherData]);

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData((prev) => ({
     ...prev,
     [name]: value,
   }));
 };

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!schoolId || !academicYear || !admissionNumber) {
     toast.error("Missing student information.");
     return;
   }

   const payload = {
     ...formData,
     overallRating: rating,
     schoolId,
     academicYear,
     admissionNumber,
     className: className,
     sectionName: section,

     status: "Submit",
   };

   try {
     const res = await postAPI("/teacher-feedback", payload,{}, true);
     console.log("response post",res);
     
     toast.success("Feedback submitted successfully!");
     navigate(-1);
   } catch (error) {
     console.error(error);
     toast.error("Failed to submit feedback");
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
                    Teacher Feedback Form
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
                        value={formData.teacherName}
                        onChange={handleChange}
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
                        value={formData.subject}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                            className="star"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            style={{
                              cursor: "pointer",
                              fontSize: "2rem",
                              color:
                                star <= (hover || rating)
                                  ? "#ffc107"
                                  : "#e4e5e9",
                              marginRight: "0.5rem",
                              transition: "color 0.2s",
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
                      <select
                        name="teachingStyle"
                        className="form-control"
                        value={formData.teachingStyle}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
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
                      <select
                        id="teachingExplanation"
                        name="teachingExplanation"
                        className="form-control"
                        required
                        value={formData.teachingExplanation}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="classActivity" className="form-label">
                        Class Activity
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        id="classActivity"
                        name="classActivity"
                        value={formData.classActivity}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
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
                      <select
                        id="engagementWithStudents"
                        name="engagementWithStudents"
                        value={formData.engagementWithStudents}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="lessonPlanning" className="form-label">
                        Lesson Planning <span className="text-danger">*</span>
                      </label>
                      <select
                        id="lessonPlanning"
                        name="lessonPlanning"
                        value={formData.lessonPlanning}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>{" "}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="behaviourSkills" className="form-label">
                        Behaviour Skills <span className="text-danger">*</span>
                      </label>
                      <select
                        id="behaviourSkills"
                        name="behaviourSkills"
                        value={formData.behaviourSkills}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>{" "}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="discipline" className="form-label">
                        Discipline <span className="text-danger">*</span>
                      </label>
                      <select
                        id="discipline"
                        name="discipline"
                        value={formData.discipline}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
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
                      <select
                        id="communicationSkills"
                        name="communicationSkills"
                        value={formData.communicationSkills}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="surgery" className="form-label">
                        Good Listener <span className="text-danger">*</span>
                      </label>
                      <select
                        id="goodListener"
                        name="goodListener"
                        value={formData.goodListener}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="arrivalOnTime" className="form-label">
                        Arrival on class on time{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        id="arrivalOnTime"
                        name="arrivalOnTime"
                        value={formData.arrivalOnTime}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
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
                      <select
                        id="guidanceAndMotivational"
                        name="guidanceAndMotivational"
                        value={formData.guidanceAndMotivational}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="inspiration" className="form-label">
                        Inspiration<span className="text-danger">*</span>
                      </label>
                      <select
                        id="inspiration"
                        name="inspiration"
                        value={formData.inspiration}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">Excellent</option>
                        <option value="4">Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Very Poor</option>
                      </select>
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
                        value={formData.remarks}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter Any Remarks"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
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

export default FeedbackForm;