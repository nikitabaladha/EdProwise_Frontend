import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import postAPI from "../../../../../../api/postAPI";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";

const AddExamTimeTable = () => {
  
const navigate = useNavigate();
const location = useLocation();
const { schoolId, academicYear } = location.state || {};

const [classes, setClasses] = useState([]);
const [sections, setSections] = useState([]);
const [loading, setLoading] = useState(false);
const [selectedClass, setSelectedClass] = useState(null);
const [selectedSection, setSelectedSection] = useState(null);
const [subjectRows, setSubjectRows] = useState([]);
const [isShow, setIsShow] = useState(false);
const [examName, setExamName] = useState("");

const emptyRow = {
  examDate: "",
  subjectId: "",
  fromTime: "",
  toTime: "",
};

const [rows, setRows] = useState(() =>
  Array.from({ length: 5 }, () => ({ ...emptyRow }))
);

const addRow = () => {
  setRows([...rows, { ...emptyRow }]);
};

const removeRow = (index) => {
  if (rows.length > 1) {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  }
};

const handleRowChange = (index, field, value) => {
  const updatedRows = [...rows];
  updatedRows[index][field] = value;
  setRows(updatedRows);
};

const handleSubjectChange = (index, selectedOption) => {
  const updatedRows = [...rows];
  updatedRows[index].subjectId = selectedOption ? selectedOption.value : "";
  setRows(updatedRows);
};

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
    fetchSubjects();
  }
}, [selectedClass, selectedSection]);

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

const fetchSubjects = async () => {
  try {
    const res = await getAPI(
      `/get-class-subjects?schoolId=${schoolId}&academicYear=${academicYear}&className=${selectedClass.value}&sectionName=${selectedSection.value}`
    );

    if (!res.data.hasError) {
      const subjectsData = res.data.data[0]?.subjects || [];
      setSubjectRows(
        subjectsData.map((s) => ({
          value: s._id,
          label: s.subjectName,
        }))
      );
    } else {
      toast.error(res.data.message || "Failed to fetch subjects");
    }
  } catch (err) {
    console.error("Error fetching subjects:", err);
    toast.error("Error fetching subjects");
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedClass || !selectedSection) {
    toast.error("Please select class and section");
    return;
  }

  if (!examName.trim()) {
    toast.error("Please enter exam name");
    return;
  }

  const incompleteRow = rows.find(
    (row) => !row.examDate || !row.subjectId || !row.fromTime || !row.toTime
  );
  if (incompleteRow) {
    toast.error("Please fill all fields in each row before submitting");
    return;
  }

  const payload = {
    schoolId,
    academicYear,
    className: selectedClass.value,
    sectionName: selectedSection.value,
    examName,
    examDetails: rows,
  };

  try {
    const res = await postAPI("/add-exam-timetable", payload);
    if (!res.data.hasError) {
      toast.success("Exam timetable created successfully");
      navigate(-1);
    } else {
      toast.error(res.data.message || "Failed to create timetable");
    }
  } catch (error) {
    console.error("Error creating timetable:", error);
    toast.error("Error creating timetable");
  }
};
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                    Add Exam Time Period
                  </h4>
                  <button
                    type="button "
                    className="btn btn-primary ms-2 custom-submit-button"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="bookRecordNumber" className="form-label">
                        Class <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        name="class"
                        options={classes}
                        placeholder="Select Class"
                        className="email-select form-select-sm text-nowrap "
                        value={selectedClass}
                        onChange={(option) => {
                          setSelectedClass(option);
                          setSelectedSection(null);
                          setSections([]);
                        }}
                        isLoading={loading}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="Section" className="form-label">
                        Section <span className="text-danger">*</span>
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

                <div className="text-end">
                  {!isShow && (
                    <button
                      type="button"
                      disabled={!selectedSection}
                      className="btn btn-primary custom-submit-button"
                      onClick={() => setIsShow(true)}
                    >
                      Continue
                    </button>
                  )}
                </div>
                {isShow && (
                  <>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="mb-3">
                          <label
                            htmlFor="bookRecordNumber"
                            className="form-label"
                          >
                            Exam Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="examName"
                            className="form-control payroll-table-body payroll-input-border text-start"
                            value={examName}
                            onChange={(e) => setExamName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive px-lg-5 pb-4">
                      <table className="table text-dark border border-dark mb-1">
                        <thead>
                          <tr className="payroll-table-header">
                            <th className="text-center  align-content-center border border-dark text-nowrap p-2">
                              Date
                            </th>
                            <th className="text-center  align-content-center border border-dark text-nowrap p-2">
                              Subject
                            </th>
                            <th
                              className="text-center  align-content-center border border-dark text-nowrap p-2"
                              // style={{ width: "280px" }}
                            >
                              From
                            </th>
                            <th
                              className="text-center align-content-center border border-dark  p-2"
                              // style={{ width: "150px" }}
                            >
                              To
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, index) => (
                            <tr key={index} className="payroll-table-body">
                              <td className="text-start align-content-center border border-dark p-2">
                                <input
                                  type="date"
                                  name={`examDate-${index}`}
                                  className="form-control payroll-table-body payroll-input-border text-start"
                                  value={row.examDate}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "examDate",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </td>
                              <td className="text-start align-content-center border border-dark p-2">
                                <CreatableSelect
                                  isClearable
                                  name={`subject-${index}`}
                                  options={subjectRows}
                                  placeholder="Select Subject"
                                  className="email-select payroll-table-body rounded payroll-input-border"
                                  value={
                                    subjectRows.find(
                                      (opt) => opt.value === row.subjectId
                                    ) || null
                                  }
                                  onChange={(option) =>
                                    handleSubjectChange(index, option)
                                  }
                                />
                              </td>
                              <td className="text-end align-content-center border border-dark p-2">
                                <input
                                  type="time"
                                  name={`fromTime-${index}`}
                                  className="form-control payroll-table-body payroll-input-border text-end"
                                  value={row.fromTime}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "fromTime",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </td>
                              <td className="text-center align-content-center border border-dark p-2">
                                <input
                                  type="time"
                                  name={`toTime-${index}`}
                                  className="form-control payroll-table-body payroll-input-border text-end"
                                  value={row.toTime}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "toTime",
                                      e.target.value
                                    )
                                  }
                                  required
                                />
                              </td>

                              <td className="text-center align-content-center border border-dark p-2">
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => removeRow(index)}
                                  disabled={rows.length <= 1}
                                >
                                  <RxCross1 />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="text-end">
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={addRow}
                      >
                        Add Row
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                      >
                        Save & Published
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExamTimeTable