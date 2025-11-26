import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";

const TeachersFeedbackList = () => {
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const location = useLocation();
   const { schoolId, academicYear, className, sectionName } = location.state || {};
    const [schoolIdTech, setSchoolIdTech] = useState("");
    const [records, setRecords] = useState([]);
    const [academicYearTeach, setAcademicYearTeach] = useState(
      localStorage.getItem("selectedAcademicYear") || ""
    );
      const [classes, setClasses] = useState("");
      const [sections, setSections] = useState("");
     
    useEffect(() => {
      if (schoolId && academicYear && className && sectionName) {
        setClasses(className);
        setSections(sectionName);
        setAcademicYearTeach(academicYear);
        setSchoolIdTech(schoolId)
      }
    }, [schoolId, academicYear, className, sectionName]);

 useEffect(() => {
   if (schoolIdTech && academicYearTeach && classes && sections) {
     fetchData();
   }
 }, [schoolIdTech, academicYearTeach, classes, sections]);

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAPI(
          `/teacher-feedback-summary?schoolId=${schoolIdTech}&academicYear=${academicYearTeach}&className=${classes}&sectionName=${sections}`,true
        );
   console.log("teacher-feedback-summary", response);
   
        if (response.data.success) {
          setRecords(response.data.data.teacherFeedbackSummary);
        } else {
          toast.error("Failed to fetch teacher feedback data");
        }
      } catch (error) {
        console.error("Error fetching teacher feedback data:", error);
        toast.error("Error fetching teacher feedback data");
      } finally {
        setLoading(false);
      }
    };

    const navigateToView = (event, teacher) => {
      event.preventDefault();
      navigate(
        `/school-dashboard/operational-service/teachers-feedback/teacher-list/feedback-fill-student`,
        {
          state: {
            schoolId: schoolIdTech,
            academicYear: academicYearTeach,
            className: classes,
            sectionName: sections,
            teacherData: teacher,
          },
        }
      );
    };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Teacher Feedback
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
                      <th className="text-nowrap">Employee ID</th>
                      <th className="text-nowrap">Name of Teacher</th>
                      <th className="text-nowrap ">Subject</th>
                      <th className="text-nowrap ">Designation</th>
                      <th className="text-nowrap ">Overall Rating</th>
                      <th className="text-nowrap ">student fill feedback </th>
                      <th className="text-nowrap ">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.length > 0 ? (
                      records.map((teacher, index) => (
                        <tr key={index}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </div>
                          </td>
                          <td>{teacher.employeeId}</td>
                          <td>{teacher.teacherName}</td>
                          <td>{teacher.subjectName}</td>
                          <td>{teacher.designation}</td>
                          <td>{teacher.averageRating.toFixed(1)}</td>
                          <td>{teacher.feedbackCount}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <Link
                                className="btn btn-light btn-sm"
                                onClick={(event) =>
                                  navigateToView(event, teacher)
                                }
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>{" "}
                              <Link
                                className="btn btn-primary btn-sm"
                                // onClick={(event) => navigateToView(event)}
                              >
                                <FiDownload className="align-middle fs-18" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          {!loading
                            ? "No teacher feedback data found"
                            : "Loading..."}
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

export default TeachersFeedbackList;
