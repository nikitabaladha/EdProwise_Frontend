import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import getAPI from "../../../../../api/getAPI";
import deleteAPI from "../../../../../api/deleteAPI";
import ConfirmationDialog from "../../../../ConfirmationDialog";

const DefineRollNumber = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState("alphabetical"); // alphabetical | manual | admission
  const [sortField, setSortField] = useState("firstName"); // firstName | lastName
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  const academicYear = localStorage.getItem("selectedAcademicYear");

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

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const url = `/get-student-records/${schoolId}/${academicYear}?class=${selectedClass.value}&section=${selectedSection.value}`;
      const res = await getAPI(url, true);

      if (!res.data.hasError) {
        let studentList = res.data.data || [];

        // apply sorting based on mode
        if (mode === "alphabetical") {
          studentList.sort((a, b) => {
            const valA = (a[sortField] || "").toLowerCase();
            const valB = (b[sortField] || "").toLowerCase();
            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
          });
          // assign roll numbers
          studentList = studentList.map((s, i) => ({ ...s, rollNo: i + 1 }));
        } else if (mode === "admission") {
          studentList.sort((a, b) =>
            a.admissionNumber.localeCompare(b.admissionNumber)
          );
          studentList = studentList.map((s, i) => ({ ...s, rollNo: i + 1 }));
        } else {
          // manual → keep original, rollNo editable
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

  const handleRollChange = (index, value) => {
    const updated = [...students];
    updated[index].rollNo = value;
    setStudents(updated);
  };

  return (
    <div className="container-fluid">
      <div className="card m-2">
        <div className="card-body custom-heading-padding">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="mb-0">Define Roll Numbers</h4>
            <div className="d-flex gap-2">
              <CreatableSelect
                isClearable
                name="class"
                options={classes}
                placeholder="Select Class"
                className="email-select form-select-sm me-2"
                value={selectedClass}
                onChange={(option) => {
                  setSelectedClass(option);
                  setSelectedSection(null);
                }}
                isLoading={loading}
              />

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

          {/* Mode Selection */}
          <div className="d-flex gap-3 mt-3">
            <select
              className="form-select w-auto"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="manual">Manual</option>
              <option value="admission">By Admission Number</option>
            </select>

            {mode === "alphabetical" && (
              <>
                <select
                  className="form-select w-auto"
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                >
                  <option value="firstName">First Name</option>
                  <option value="lastName">Last Name</option>
                </select>

                <select
                  className="form-select w-auto"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">A → Z</option>
                  <option value="desc">Z → A</option>
                </select>
              </>
            )}
          </div>

          {/* Table */}
          <div className="table-responsive mt-3">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th>Admission No.</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Roll No.</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <tr key={student._id || i}>
                    <td>{student.admissionNumber}</td>
                    <td>{student.className}</td>
                    <td>{student.sectionName}</td>
                    <td>
                      {mode === "manual" ? (
                        <input
                          type="number"
                          className="form-control text-center"
                          value={student.rollNo}
                          onChange={(e) => handleRollChange(i, e.target.value)}
                        />
                      ) : (
                        student.rollNo
                      )}
                    </td>
                    <td>
                      {student.firstName} {student.lastName}
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="5">No students found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefineRollNumber;
