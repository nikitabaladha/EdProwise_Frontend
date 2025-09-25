import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import CreatableSelect from "react-select/creatable";

const SendCustomeSms = () => {
  const [role, setRole] = useState("");
   const [schoolId, setSchoolId] = useState("");
        const [academicYear, setAcademicYear] = useState(
          localStorage.getItem("selectedAcademicYear") || ""
        );
     
const [classes, setClasses] = useState([]);
const [sections, setSections] = useState([]);
const [loading, setLoading] = useState(false);
const [selectedClass, setSelectedClass] = useState(null);
const [selectedSection, setSelectedSection] = useState(null);
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
        if (selectedClass && schoolId && academicYear) {
          fetchSections();
        } else {
          setSections([]);
          setSelectedSection(null);
        }
      }, [selectedClass, schoolId, academicYear]);
    
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
               const sectionOptions = selectedClassData.sections.map(
                 (section) => ({
                   value: section.name,
                   label: section.name,
                 })
               );
               setSections(sectionOptions);
             }
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
                    Send SMS
                  </h4>
                </div>
              </div>

              <form className="mt-3">
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">
                        Send SMS to <span className="text-danger">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="All">All</option>
                        <option value="Student">Student</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>
                  </div>

                  {role === "Student" && (
                    <>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Class <span className="text-danger">*</span>
                          </label>
                          <CreatableSelect
                            isClearable
                            options={classes}
                            placeholder="Select Class"
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

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Section <span className="text-danger">*</span>
                          </label>
                          <CreatableSelect
                            isClearable
                            options={sections}
                            placeholder="Select Section"
                            value={selectedSection}
                            onChange={setSelectedSection}
                            isDisabled={!selectedClass}
                            isLoading={loading}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-7">
                    <div className="mb-3">
                      <ReactQuill
                        theme="snow"
                        className="bg-white"
                        style={{ height: "200px" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="table-responsive">
                      <table className="table align-middle mb-0 table-hover table-centered text-center">
                        <thead className="bg-light-subtle">
                          <tr>
                            <th className="text-nowrap">Tag</th>
                            <th className="text-nowrap">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-start">{"{schoolName}"}</td>
                            <td>School Name</td>
                          </tr>
                          <tr>
                            <td className="text-start">{"{employeeName}"}</td>
                            <td>Name of the Employee</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </form>

              <div className="d-flex justify-content-end mt-3">
                <button
                  type="submit"
                  className="btn btn-primary custom-submit-button"
                >
                  Send SMS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendCustomeSms;
