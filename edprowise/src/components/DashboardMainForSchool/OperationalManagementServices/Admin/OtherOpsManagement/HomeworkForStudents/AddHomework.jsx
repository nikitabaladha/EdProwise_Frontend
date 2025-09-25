

import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import postAPI from "../../../../../../api/postAPI";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";

const AddHomework = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId, academicYear } = location.state || {};

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjectRows, setSubjectRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [homeworkDate, setHomeworkDate] = useState("");
  const [isShow, setIsShow] = useState(false);

  const [rows, setRows] = useState([
    { subjectId: "", shortDescription: "", file: null, remarks: "" },
  ]);

  // -------------------- ADD & REMOVE ROW --------------------
  const addRow = () => {
    setRows([...rows, { subjectId: "", shortDescription: "", file: null, remarks: "" }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) setRows(rows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  // -------------------- FETCH DATA --------------------
  useEffect(() => {
    if (schoolId && academicYear) fetchClasses();
  }, [schoolId, academicYear]);

  useEffect(() => {
    if (selectedClass) fetchSections();
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedSection) fetchSubjects();
  }, [selectedClass, selectedSection]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await getAPI(`/get-class-and-section-by-year/${schoolId}/${academicYear}`);
      if (!res.data.hasError) {
        setClasses(
          res.data.data.map((c) => ({
            value: c.className,
            label: c.className,
            sections: c.sections,
          }))
        );
      } else toast.error(res.data.message || "Failed to fetch classes");
    } catch (err) {
      toast.error("Error fetching classes");
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = () => {
    const classData = classes.find((c) => c.value === selectedClass.value);
    setSections(
      classData?.sections.map((s) => ({ value: s.name, label: s.name })) || []
    );
  };

  const fetchSubjects = async () => {
    try {
      const res = await getAPI(
        `/get-class-subjects?schoolId=${schoolId}&academicYear=${academicYear}&className=${selectedClass.value}&sectionName=${selectedSection.value}`
      );
      if (!res.data.hasError) {
        setSubjectRows(
          res.data.data[0]?.subjects.map((s) => ({
            value: s._id,
            label: s.subjectName,
          })) || []
        );
      }
    } catch (err) {
      toast.error("Error fetching subjects");
    }
  };

  // -------------------- HANDLE SUBMIT --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSection) {
      toast.error("Please select class and section");
      return;
    }
    if (!homeworkDate) {
      toast.error("Please select homework date");
      return;
    }
    for (let row of rows) {
      if (!row.subjectId || !row.shortDescription) {
        toast.error("Please fill all required fields");
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("schoolId", schoolId);
      formData.append("academicYear", academicYear);
      formData.append("className", selectedClass.value);
      formData.append("sectionName", selectedSection.value);
      formData.append("homeworkDate", homeworkDate);

      const rowsPayload = rows.map((row) => {
        if (row.file) formData.append("files", row.file);
        return {
          subjectId: row.subjectId,
          shortDescription: row.shortDescription,
          remarks: row.remarks,
          originalFileName: row.file ? row.file.name : null,
        };
      });

      formData.append("rows", JSON.stringify(rowsPayload));

      const res = await postAPI(
        "/add-homework",
        formData,
        { "Content-Type": "multipart/form-data" },
        true
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(-1);
      } else toast.error(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error("Error saving homework");
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
                  <h4 className="payroll-title text-center mb-0 flex-grow-1">
                    Add Homework
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary ms-2 custom-submit-button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* CLASS & SECTION */}
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label">Class *</label>
                    <CreatableSelect
                      isClearable
                      name="class"
                      options={classes}
                      placeholder="Select Class"
                      className="email-select form-select-sm text-nowrap"
                      value={selectedClass}
                      onChange={(option) => {
                        setSelectedClass(option);
                        setSelectedSection(null);
                        setSections([]);
                        setIsShow(false);
                      }}
                      isLoading={loading}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Section *</label>
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

                {/* CONTINUE BUTTON */}
                <div className="text-end">
                  {!isShow && (
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      disabled={!selectedSection}
                      onClick={() => setIsShow(true)}
                    >
                      Continue
                    </button>
                  )}
                </div>

                {/* HOMEWORK FORM */}
                {isShow && (
                  <>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label className="form-label">
                          Homework Date <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          value={homeworkDate}
                          onChange={(e) => setHomeworkDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="table-responsive pb-4">
                      <table className="table text-dark border border-dark mb-1">
                        <thead>
                          <tr className="payroll-table-header">
                            <th className="text-center border border-dark p-2">
                              Subject
                            </th>
                            <th className="text-center border border-dark p-2">
                              Short Description
                            </th>
                            <th className="text-center border border-dark p-2">
                              Upload
                            </th>
                            <th className="text-center border border-dark p-2">
                              Remarks
                            </th>
                            <th className="text-center border border-dark p-2">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, index) => (
                            <tr key={index}>
                              <td className="border border-dark p-2">
                                <CreatableSelect
                                  options={subjectRows}
                                  value={
                                    subjectRows.find(
                                      (s) => s.value === row.subjectId
                                    ) || null
                                  }
                                  className="text-nowrap"
                                  onChange={(opt) =>
                                    handleRowChange(
                                      index,
                                      "subjectId",
                                      opt ? opt.value : ""
                                    )
                                  }
                                />
                              </td>
                              <td className="border border-dark p-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={row.shortDescription}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "shortDescription",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="border border-dark p-2">
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "file",
                                      e.target.files[0]
                                    )
                                  }
                                />
                              </td>
                              <td className="border border-dark p-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={row.remarks}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "remarks",
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                              <td className="text-center">
                                {rows.length > 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeRow(index)}
                                  >
                                    <RxCross1 />
                                  </button>
                                )}
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
                      <button type="submit" className="btn btn-primary">
                        Save & Publish
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
};

export default AddHomework;
