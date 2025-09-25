import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const academicYear = localStorage.getItem("selectedAcademicYear");
  const [attendance, setAttendance] = useState({}); 
  const location = useLocation();
  const passedDate = location.state?.attendanceDate;

  const [attendanceDate, setAttendanceDate] = useState(
    passedDate || new Date().toISOString().split("T")[0]
  );
  

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
    if (schoolId && academicYear) {
      fetchClasses();
    }
  }, [schoolId, academicYear]);

  useEffect(() => {
    if (selectedClass) {
      fetchSections();
    }
  }, [selectedClass]);
  useEffect(() => {
      if (selectedClass && selectedSection && schoolId && academicYear) {
        fetchStudents();
      }
    }, [selectedClass, selectedSection,]);
  
    useEffect(() => {
      if (students.length > 0) {
        const initialAttendance = {};
        students.forEach((s) => {
          initialAttendance[s._id] = "Present";
        });
        setAttendance(initialAttendance);
      }
    }, [students]);

    const handleResultChange = (studentId, value) => {
      setAttendance((prev) => ({
        ...prev,
        [studentId]: value,
      }));
    };

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-class-and-section-by-year/${schoolId}/${academicYear}`
      );
      if (!res.data.hasError) {
        const classOptions = res.data.data.map((classItem) => ({
          value: classItem.className,
          label: classItem.className,
          sections: classItem.sections,
        }));
        setClasses(classOptions);
      } else {
        toast.error("Failed to fetch classes");
      }
    } catch (error) {
      toast.error("Error fetching classes");
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = () => {
    if (selectedClass) {
      const selectedClassData = classes.find(
        (c) => c.value === selectedClass.value
      );
      if (selectedClassData && selectedClassData.sections) {
        const sectionOptions = selectedClassData.sections.map((section) => ({
          value: section.name,
          label: section.name,
        }));
        setSections(sectionOptions);
      }
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/student-roll-numbers?schoolId=${schoolId}&academicYear=${academicYear}&class=${selectedClass.value}&section=${selectedSection.value}`
      );
console.log("Res student",res);

      if (!res.data.hasError) {
        const studentData = res.data.data?.rollNumberDetails || [];
        setStudents(studentData);
      } else {
        toast.error(res.data.message || "Failed to fetch records");
      }
    } catch (error) {
      console.error("Error fetching roll number records:", error);
      toast.error("Error fetching roll number records");
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async () => {
    try {
      const attendanceData = students.map((s) => ({
        admissionNumber: s.admissionNumber,
        rollNo: s.rollNo,
        studentName: s.studentName,
        status: attendance[s._id] || "Present",
      }));

      const payload = {
        schoolId,
        academicYear,
        class: selectedClass.value,
        section: selectedSection.value,
        attendanceDate,
        attendanceData,
      };

      const res = await postAPI("/mark-students-attendance", payload);

      if (!res.data.hasError) {
        toast.success("Attendance marked successfully!");
        setIsShow(false);
        setStudents([]);
      } else {
        toast.error(res.data.message || "Failed to mark attendance");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("Error submitting attendance",error.data.message);
    }
  };


  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Student Attendance for : {attendanceDate}
                  </h4>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="bookRecordNumber" className="form-label">
                        Class
                        <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        name="class"
                        options={classes}
                        placeholder="Select Class"
                        className="email-select form-select-sm "
                        value={selectedClass}
                        onChange={(option) => {
                          setSelectedClass(option);
                          setSelectedSection(null);
                          setStudents([]);
                        }}
                        isLoading={loading}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="Section" className="form-label">
                        Section
                        <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        name="section"
                        options={sections}
                        placeholder="Select Section"
                        className="email-select form-select-sm"
                        value={selectedSection}
                        onChange={setSelectedSection}
                        isDisabled={!selectedClass}
                        isLoading={loading}
                      />
                    </div>
                  </div>
                </div>
              </form>

              <div className="text-end">
                {!isShow && (
                  <button
                    type="button"
                    disabled={!selectedSection}
                    className="btn btn-primary custom-submit-button"
                    onClick={() => setIsShow(true)}
                  >
                    Submit
                  </button>
                )}
              </div>
              {isShow && (
                <>
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                      <thead className="bg-light-subtle">
                        <tr className="payroll-table-header">
                          <th className="">
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
                          <th className="text-nowrap">Roll No.</th>
                          <th className="text-nowrap ">Admission No. </th>
                          <th className="text-nowrap">Name</th>
                          {/* <th className="text-nowrap ">Class</th>
                          <th className="text-nowrap">Section</th> */}
                          <th className="text-nowrap">Status</th>
                          <th className="text-nowrap">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.length > 0 ? (
                          students.map((student, index) => (
                            <tr key={student._id}>
                              <td>
                                <div className="form-check ms-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                  />
                                </div>
                              </td>
                              <td>{student.rollNo}</td>
                              <td>{student.admissionNumber}</td>
                              <td>{student.studentName}</td>
                              {/* <td>{selectedClass?.value}</td>
                              <td>{selectedSection?.value}</td> */}
                              <td>{attendance[student._id]}</td>
                              <td>
                                <select
                                  className="form-control"
                                  value={attendance[student._id] || "Present"}
                                  onChange={(e) =>
                                    handleResultChange(
                                      student._id,
                                      e.target.value
                                    )
                                  }
                                  required
                                >
                                  <option disabled>Select</option>
                                  <option value="Present">Present</option>
                                  <option value="Absent">Absent</option>
                                  <option value="Leave">Leave</option>
                                  <option value="Late">Late</option>
                                </select>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              No students found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
