// import React,{useState} from 'react'
// import ExamRulesModal from './ExamRulesModal';
// import { useNavigate } from 'react-router-dom';
// const StudentTestPage = () => {
//     const navigate = useNavigate();
//      const [showModal, setShowModal] = useState(false);
//      const [isChecked, setIsChecked] = useState(false);

//      const handleStartExamClick = () => {
//        setShowModal(true);
//      };

//      const handleConfirmStartExam = () => {
//        if (isChecked) {
//          setShowModal(false);
//          navigate("/shool-dashboard/test/test"); 
//        }
//      };
//   return (
//     <div
//       className="container d-flex justify-content-center align-items-center"
//       style={{ minHeight: "100vh" }}
//     >
//       <div className="row w-100">
//         <div className="col-xl-6 col-lg-8 col-md-10 mx-auto">
//           <div className="card shadow-lg rounded-3">
//             <div className="card-body text-center">
//               {/* Student Profile Section */}
//               <div className="d-flex flex-column align-items-center ">
//                 {/* Profile Picture */}
//                 <img
//                   src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
//                   alt="Student Profile"
//                   className="rounded-circle mb-3"
//                   style={{
//                     width: "120px",
//                     height: "120px",
//                     objectFit: "cover",
//                     border: "4px solid #ff6d2e",
//                   }}
//                 />

//                 {/* Student Details */}
//                 <p className="mb-1 fw-bold text-dark ">John Jack Doe</p>
//                 <p className="mb-1 text-muted">Class: 1</p>
//                 <p className="mb-1 text-muted">Registraton Number: 15</p>
//                 <p className="mb-0 text-muted">Academic Year: 2025-2026</p>
//               </div>
//               <button
//                 type="button"
//                 className="btn btn-primary custom-submit-button mt-2"
//                 onClick={handleStartExamClick}
//               >
//                 Start Exam
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ExamRulesModal
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//         isChecked={isChecked}
//         setIsChecked={setIsChecked}
//         handleConfirm={handleConfirmStartExam}
//       />
//     </div>
//   );
// }

// export default StudentTestPage

import React, { useState, useEffect } from "react";
import ExamRulesModal from "./ExamRulesModal";
import { useNavigate, useParams } from "react-router-dom";
import getAPI from "../../api/getAPI";
import { toast } from "react-toastify";

const StudentTestPage = () => {
  const navigate = useNavigate();
  const { testLink } = useParams();
console.log("Test LInk",testLink);

  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [schoolId, setSchoolId] = useState("");
  const [academicYear, setAcademicYear]= useState("")
  const [classId, setClassId] =useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const [examResult, setExamResult] = useState("");
  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        setLoading(true);
        const response = await getAPI(`/assign-test/by-link/${testLink}`);
        console.log("get api of test Link",response);
        
        if (!response.hasError) {
          setStudentData(response.data.data);
          setSchoolId(response.data.data.schoolId);
          setAcademicYear(response.data.data.academicYear);
          setClassId(response.data.data.classId);
          setRegistrationNumber(response.data.data.registrationNumber);
          if (response.data.alreadyAttempted) {
            setAlreadyAttempted(true);
            setExamResult(response.data.data.result);
          }
        } else {
          toast.error(response.message || "Invalid test link");
        }
      } catch (error) {
        console.error("Error fetching test details:", error);
        toast.error("Invalid or expired test link");
      } finally {
        setLoading(false);
      }
    };

    if (testLink) fetchTestDetails();
  }, [testLink]);

  const handleStartExamClick = () => {
    setShowModal(true);
  };

  const handleConfirmStartExam = () => {
    if (isChecked) {
      setShowModal(false);
      navigate(`/shool-dashboard/test/${testLink}/test`, {
        state: { schoolId, academicYear, classId, registrationNumber },
      });
    } else {
      toast.warn("Please agree to the rules before starting the exam");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <p>Loading test details...</p>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <p className="text-danger fw-bold">
          Invalid test link. Please check again.
        </p>
      </div>
    );
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row w-100">
        <div className="col-xl-6 col-lg-8 col-md-10 mx-auto">
          <div className="card shadow-lg rounded-3">
            <div className="card-body text-center">
              {/* Student Profile Section */}
              <div className="d-flex flex-column align-items-center ">
                {/* Profile Picture */}
                <img
                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${studentData.studentProfile}`}
                  alt={`${studentData.firstName} Profile`}
                  className="rounded-circle mb-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    border: "4px solid #ff6d2e",
                  }}
                />

                {/* Student Details */}
                <p className="mb-1 fw-bold text-dark ">
                  {`${studentData.firstName || ""} 
                    ${studentData.middleName || ""} 
                    ${studentData.lastName || ""}`}
                </p>
                <p className="mb-1 text-muted">
                  Class: {studentData.className}
                </p>
                <p className="mb-1 text-muted">
                  Registration Number: {studentData.registrationNumber}
                </p>
                <p className="mb-0 text-muted">
                  Academic Year: {studentData.academicYear}
                </p>
              </div>
              {/* <button
                type="button"
                className="btn btn-primary custom-submit-button mt-2"
                onClick={handleStartExamClick}
              >
                Start Exam
              </button> */}
              {alreadyAttempted ? (
                <p className="text-danger fw-bold mt-3">
                  You have already given this test. <br />
                  Result: <span className="text-success">{examResult}</span>
                </p>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary custom-submit-button mt-2"
                  onClick={handleStartExamClick}
                >
                  Start Exam
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ExamRulesModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        handleConfirm={handleConfirmStartExam}
      />
    </div>
  );
};

export default StudentTestPage;
