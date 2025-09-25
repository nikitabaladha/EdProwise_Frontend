import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";

const TeacherFeedbackClassAndSectionList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails?.schoolId) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(userDetails.schoolId);
  }, []);

  useEffect(() => {
    if (schoolId && academicYear) fetchClassesAndSections();
  }, [schoolId, academicYear]);

  const fetchClassesAndSections = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-class-and-section-by-year/${schoolId}/${academicYear}`
      );
      if (!res.data.hasError) {
        setClasses(res.data.data); 
      } else {
        toast.error("Failed to fetch classes and sections");
      }
    } catch (err) {
      toast.error("Error fetching class & section data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (className, sectionName) => {
    navigate(
      `/school-dashboard/operational-service/teachers-feedback/teacher-list`,
      {
        state: { schoolId, academicYear, className, sectionName },
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

                  <select className="form-select form-select-sm me-2 w-auto">
                    <option value="" disabled>
                      Select Year
                    </option>
                    <option value="2025-2026">2025-2026 </option>
                    <option value="2026-2027">2026-2027 </option>
                  </select>

                  <select className="form-select form-select-sm w-auto">
                    <option value="" disabled>
                      Download In
                    </option>
                    <option value="PDF">PDF </option>
                    <option value="Excle">Excle </option>
                  </select>
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
                      <th className="text-nowrap">Class</th>
                      <th className="text-nowrap">Section</th>
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>
            
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="3">Loading...</td>
                      </tr>
                    ) : classes.length === 0 ? (
                      <tr>
                        <td colSpan="3">No data found</td>
                      </tr>
                    ) : (
                      classes.map((classItem) =>
                        classItem.sections.map((section) => (
                          <tr key={`${classItem.className}-${section.name}`}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                />
                              </div>
                            </td>
                            <td>{classItem.className}</td>
                            <td>{section.name}</td>
                            <td>
                              <button
                                className="btn btn-light btn-sm"
                                onClick={() =>
                                  handleView(classItem.className, section.name)
                                }
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                              {/* <Link
                                className="btn btn-light btn-sm"
                                onClick={(event) => navigateToView(event)}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>{" "} */}
                            </td>
                          </tr>
                        ))
                      )
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

export default TeacherFeedbackClassAndSectionList;
