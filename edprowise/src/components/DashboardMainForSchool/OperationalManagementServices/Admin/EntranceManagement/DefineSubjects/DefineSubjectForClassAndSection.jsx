// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import CreatableSelect from "react-select/creatable";
// import getAPI from "../../../../../../api/getAPI";
// import postAPI from "../../../../../../api/postAPI";
// const DefineSubjectForClass = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState("");
//   const [classes, setClasses] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const academicYear = localStorage.getItem("selectedAcademicYear");
//   const [isShow, setIsShow] = useState(false);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;
//     if (!id) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }
//     setSchoolId(id);
//   }, []);

//   useEffect(() => {
//     if (schoolId && academicYear) {
//       fetchClasses();
//     }
//   }, [schoolId, academicYear]);

//   useEffect(() => {
//     if (selectedClass) {
//       fetchSections();
//     }
//   }, [selectedClass]);

//   const fetchClasses = async () => {
//     try {
//       setLoading(true);
//       const res = await getAPI(
//         `/get-class-and-section-by-year/${schoolId}/${academicYear}`
//       );
//       if (!res.data.hasError) {
//         const classOptions = res.data.data.map((classItem) => ({
//           value: classItem.className,
//           label: classItem.className,
//           sections: classItem.sections,
//         }));
//         setClasses(classOptions);
//       } else {
//         toast.error("Failed to fetch classes");
//       }
//     } catch (error) {
//       toast.error("Error fetching classes");
//       console.error("Error fetching classes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSections = () => {
//     if (selectedClass) {
//       const selectedClassData = classes.find(
//         (c) => c.value === selectedClass.value
//       );
//       if (selectedClassData && selectedClassData.sections) {
//         const sectionOptions = selectedClassData.sections.map((section) => ({
//           value: section.name,
//           label: section.name,
//         }));
//         setSections(sectionOptions);
//       }
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Define Subjects
//                   </h4>
//                 </div>
//               </div>
//               <form>
//                 <div className="row">
//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="bookRecordNumber" className="form-label">
//                         Class
//                         <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         name="class"
//                         options={classes}
//                         placeholder="Select Class"
//                         className="email-select form-select-sm "
//                         value={selectedClass}
//                         onChange={(option) => {
//                           setSelectedClass(option);
//                           setSelectedSection(null);
//                         }}
//                         isLoading={loading}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="Section" className="form-label">
//                         Section
//                         <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         name="section"
//                         options={sections}
//                         placeholder="Select Section"
//                         className="email-select form-select-sm"
//                         value={selectedSection}
//                         onChange={setSelectedSection}
//                         isDisabled={!selectedClass}
//                         isLoading={loading}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </form>
//               <div className="text-end">
//                 {!isShow && (
//                   <button
//                     type="button"
//                     disabled={!selectedSection}
//                     className="btn btn-primary custom-submit-button"
//                     onClick={() => setIsShow(true)}
//                   >
//                     Submit
//                   </button>
//                 )}
//               </div>

//               {isShow && (
//                 <>
//                   <div className="table-responsive mt-3 ">
//                     <table className="table align-middle w-auto mb-0 table-hover table-centered text-center"
//                     style={{justifySelf:'center'}}>
//                       <thead className="bg-light-subtle">
//                         <tr>
//                           <th>
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                             />
//                           </th>
//                           <th className="text-nowrap">Academic Year</th>
//                           <th className="text-nowrap">Define Subjects</th>
//                           <th className="text-nowrap">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>
//                             <input
//                               type="checkbox"
//                               className="form-check-input "
//                             />
//                           </td>
//                           <td>2025-2026</td>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control w-auto"
//                             />
//                           </td>
//                           <td>
//                             <Link
//                               className="btn btn-soft-danger btn-sm"
//                               // onClick={() => openDeleteDialog(record)}
//                             >
//                               <iconify-icon
//                                 icon="solar:trash-bin-minimalistic-2-broken"
//                                 className="align-middle fs-18"
//                               />
//                             </Link>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                   <div className="text-end">
//                     <button
//                       type="button"
//                       className="btn btn-secondary me-2 custom-submit-button"
//                       // onClick={handleSubmit}
//                     >
//                       Add More Subject
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-primary custom-submit-button"
//                       // onClick={handleSubmit}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </>
//               )}

//               {/* </>
//                   )} */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DefineSubjectForClass;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import getAPI from "../../../../../../api/getAPI";
import postAPI from "../../../../../../api/postAPI";
import putAPI from "../../../../../../api/putAPI";
import deleteAPI from "../../../../../../api/deleteAPI";

const DefineSubjectForClassAndSection = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subjectRows, setSubjectRows] = useState([]);
  const [isShow, setIsShow] = useState(false);

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
    if (selectedClass) {
      fetchSections();
    }
  }, [selectedClass]);

  useEffect(() => {
    if (isShow && subjectRows.length === 0) {
      setSubjectRows([
        { id: Date.now() + 1, subjectName: "" },
        { id: Date.now() + 2, subjectName: "" },
        { id: Date.now() + 3, subjectName: "" },
        { id: Date.now() + 4, subjectName: "" },
      ]);
    }
  }, [isShow]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-class-and-section-by-year/${schoolId}/${academicYear}`,
        true
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

  const handleSubjectChange = (id, value) => {
    setSubjectRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, subjectName: value } : row))
    );
  };

  const handleAddRow = () => {
    setSubjectRows((prev) => [...prev, { id: Date.now(), subjectName: "" }]);
  };

  const handleDeleteRow = (id) => {
    setSubjectRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSubmit = async () => {
    const filledSubjects = subjectRows
      .map((row) => row.subjectName.trim())
      .filter((name) => name !== "");

    if (filledSubjects.length === 0) {
      toast.error("Please enter at least one subject");
      return;
    }

    try {
      const res = await postAPI(
        "/add-class-subjects",
        {
          schoolId,
          academicYear,
          className: selectedClass?.value,
          sectionName: selectedSection?.value,
          subjects: filledSubjects,
        },
        true
      );

      if (!res.data.hasError) {
        toast.success("Subjects saved successfully");
        setSubjectRows([]);
        setIsShow(false);
        navigate(-1);
      } else {
        toast.error(res.data.message || "Failed to save subjects");
      }
    } catch (error) {
      toast.error("Error saving subjects");
      console.error("Error saving subjects:", error);
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
                    Define Subjects
                  </h4>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* CLASS + SECTION SELECTION */}
              <form>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Class <span className="text-danger">*</span>
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
                        }}
                        isLoading={loading}
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
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
              </form>

              {/* SHOW SUBJECT FORM */}
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
                    <table
                      className="table align-middle w-auto table-hover table-centered text-center"
                      style={{ justifySelf: "center" }}
                    >
                      <thead className="bg-light-subtle">
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </th>
                          <th>Academic Year</th>
                          <th>Subject Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjectRows.map((row, index) => (
                          <tr key={row.id}>
                            <td>
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </td>
                            <td>{academicYear}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control w-auto"
                                value={row.subjectName}
                                onChange={(e) =>
                                  handleSubjectChange(row.id, e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-soft-danger btn-sm"
                                onClick={() => handleDeleteRow(row.id)}
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="text-end mt-3">
                    <button
                      type="button"
                      className="btn btn-secondary me-2 custom-submit-button"
                      onClick={handleAddRow}
                    >
                      Add More Subject
                    </button>
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

export default DefineSubjectForClassAndSection;
