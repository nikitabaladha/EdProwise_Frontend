import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import CreatableSelect from "react-select/creatable";
const AbsentPeoplesList = () => {

    const navigate = useNavigate();
      const [sClass, setClass] = useState("");
      const [section, setSection] = useState("");
    const [schoolId, setSchoolId] = useState("");
      const [academicYear, setAcademicYear] = useState(
        localStorage.getItem("selectedAcademicYear") || ""
      );
      const [loading, setLoading] = useState(false);
      const [records, setRecords] = useState([]);
      const [classes, setClasses] = useState([]);
        const [sections, setSections] = useState([]);
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

      const navigateToTemplates = (event) => {
        event.preventDefault();
        navigate(
          `/school-dashboard/operational-service/sms/attandance-sms/templates`,
          { state: { schoolId, academicYear } }
        );
      };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link
          onClick={(event) => navigateToTemplates(event)}
          className="btn btn-sm btn-primary"
        >
          Templates
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Absent Student List
                  </h4>
                  {/* <select
                    className="form-select form-select-sm me-2 w-auto"
                    value={sClass}
                    onChange={(e) => {
                      setClass(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select Class
                    </option>
                    <option value="All">All </option>
                    <option value="1">1 </option>
                    <option value="2">2 </option>
                  </select>

                  <select
                    className="form-select form-select-sm w-auto"
                    value={section}
                    onChange={(e) => {
                      setSection(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select Section
                    </option>
                    <option value="All">All </option>
                    <option value="A">A </option>
                    <option value="B">B </option>
                  </select> */}
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
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th style={{ width: 20 }}>
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
                      <th className="text-nowrap">Student ID </th>
                      <th className="text-nowrap">Name</th>
                      <th className="text-nowrap">Class</th>
                      <th className="text-nowrap">Section</th>
                      <th className="text-nowrap">Date of Absence</th>
                      <th className="text-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            // id={`check-${index}`}
                          />
                        </div>
                      </td>
                      <td>SID-001</td>
                      <td>Kunal Shah</td>
                      <td>1</td>
                      <td>A</td>
                      <td>15/08/2025</td>
                      <td>Send SMS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* {role === "Student" ? (
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th style={{ width: 20 }}>
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
                        <th className="text-nowrap">Adm.No </th>
                        <th className="text-nowrap">Name</th>
                        <th className="text-nowrap">Class</th>
                        <th className="text-nowrap">Section</th>
                        <th className="text-nowrap">Date of Birth</th>
                        <th className="text-nowrap">Age</th>
                        <th className="text-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              // id={`check-${index}`}
                            />
                          </div>
                        </td>
                        <td>Emp-001</td>
                        <td>Kunal Shah</td>
                        <td>1</td>
                        <td>A</td>
                        <td>15/10/1999</td>
                        <td>20</td>
                        <td>Send SMS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th style={{ width: 20 }}>
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
                        <th className="text-nowrap">Employee Id </th>
                        <th className="text-nowrap">Name</th>
                        <th className="text-nowrap">Designation</th>
                        <th className="text-nowrap">Date of Birth</th>
                        <th className="text-nowrap">Age</th>
                        <th className="text-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              // id={`check-${index}`}
                            />
                          </div>
                        </td>
                        <td>Emp-001</td>
                        <td>Kunal Shah</td>
                        <td>Teacher</td>
                        <td>15/10/1999</td>
                        <td>20</td>
                        <td>Send SMS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbsentPeoplesList