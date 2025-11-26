import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
const DefineRollNumber = () => {
  
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(false);

  const academicYear = localStorage.getItem("selectedAcademicYear");

  const [mode, setMode] = useState("alphabetical"); // alphabetical | manual | result
  const [sortField, setSortField] = useState("firstName"); // firstName | lastName
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc
 
  const [isShow, setIsShow] = useState(false)
 
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
  }, [selectedClass, selectedSection, mode, sortField, sortOrder]);

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
      const url = `/get-student-records/${schoolId}/${academicYear}?class=${selectedClass.value}&section=${selectedSection.value}`;
      const res = await getAPI(url, true);
      console.log("response",res);
      
      if (!res.data.hasError) {
        let studentList = res.data.data || [];

        // Sorting
        if (mode === "alphabetical") {
          studentList.sort((a, b) => {
            const valA = (a[sortField] || "").toLowerCase();
            const valB = (b[sortField] || "").toLowerCase();
            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
          });
          studentList = studentList.map((s, i) => ({
            ...s,
            rollNo: i + 1,
          }));
        } else if (mode === "result") {
          studentList.sort((a, b) =>
            a.admissionNumber.localeCompare(b.admissionNumber)
          );
          studentList = studentList.map((s, i) => ({
            ...s,
            rollNo: i + 1,
          }));
        } else {
          studentList = studentList.map((s) => ({
            ...s,
            rollNo: s.rollNo || "",
          }));
        }

        setStudents(studentList);
      } else {
        toast.error("Failed to fetch students");
        setStudents([]);
      }
    } catch (error) {
      toast.error("Error fetching students");
      console.error("Error fetching students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRollChange = (id, newRollNo) => {
    setStudents((prev) =>
      prev.map((s) => (s._id === id ? { ...s, rollNo: newRollNo } : s))
    );
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        schoolId,
        academicYear,
        className: selectedClass?.value,
        section: selectedSection?.value,
        mode,
        sortField,
        sortOrder,
        students: students.map((s) => ({
          admissionNumber: s.admissionNumber,
          rollNo: s.rollNo,
          studentName: `${s.firstName} ${s.middleName} ${s.lastName}`,
        })),
      };

      const res = await postAPI(
        "/save-roll-numbers",
        payload,
        true
      );
      if (!res.data.hasError) {
        toast.success("Roll numbers saved successfully!");
      } else {
        toast.error(res.data.message || "Failed to save roll numbers");
      }
    } catch (error) {
      console.error("Error saving roll numbers:", error);
      toast.error("Error saving roll numbers");
    }
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
                    Define Roll Number
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
                  {selectedSection && (
                    <div className="col-md-2">
                      <div className="mb-3">
                        <label htmlFor="Section" className="form-label">
                          Mode
                          <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          value={mode}
                          onChange={(e) => setMode(e.target.value)}
                        >
                          <option value="alphabetical">Alphabetical</option>
                          <option value="manual">Manual</option>
                          <option value="result">By Result</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {mode === "alphabetical" && selectedSection && (
                    <>
                      <div className="col-md-2">
                        <div className="mb-3">
                          <label htmlFor="Section" className="form-label">
                            Sort By
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                          >
                            <option value="firstName">First Name</option>
                            <option value="lastName">Last Name</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="mb-3">
                          <label htmlFor="Section" className="form-label">
                            Arrange By
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select "
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                          >
                            <option value="asc">A → Z</option>
                            <option value="desc">Z → A</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
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
                  <div className="table-responsive mt-3">
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                      <thead className="bg-light-subtle">
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </th>
                          <th>Admission No.</th>
                          <th>Roll No.</th>
                          <th>Class</th>
                          <th>Section</th>
                          <th>Student Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.length > 0 ? (
                          students.map((student, idx) => (
                            <tr key={student._id || idx}>
                              <td>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                />
                              </td>
                              <td>{student.admissionNumber}</td>
                              <td>
                                {mode === "manual" ? (
                                  <input
                                    type="number"
                                    className="form-control form-control-sm text-center"
                                    value={student.rollNo}
                                    onChange={(e) =>
                                      handleRollChange(
                                        student._id,
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  student.rollNo
                                )}
                              </td>
                              <td>{student.class}</td>
                              <td>{student.section}</td>
                              <td>
                                {student.firstName} {student.lastName}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center text-muted">
                              {loading
                                ? "Loading students..."
                                : "No students found"}
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

export default DefineRollNumber;
