// import React, { useState, useEffect } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useLocation, useNavigate,Link } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";
// import postAPI from "../../../../../../api/postAPI";
// import getAPI from "../../../../../../api/getAPI";
// import { toast } from "react-toastify";

// const AddLessonPlanning = () => {
//   const navigate = useNavigate();
//     const location = useLocation();
//     const { schoolId, academicYear } = location.state || {};
// const [classes, setClasses] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [subjectRows, setSubjectRows] = useState([]);
//   const [isShow, setIsShow] = useState(false);
//   const [staffList, setStaffList] = useState([]);

//   const [rows, setRows] = useState([{}]);

//   const addRow = () => {
//     setRows([...rows, {}]);
//   };

//   const removeRow = (index) => {
//     if (rows.length > 1) {
//       const newRows = [...rows];
//       newRows.splice(index, 1);
//       setRows(newRows);
//     }
//   };

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

//   useEffect(() => {
//     if (selectedClass && selectedSection && schoolId && academicYear) {
//       fetchSubjects();
//       fetchstaff();
//     }
//   }, [selectedClass, selectedSection]);

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

//   const fetchSubjects = async () => {
//     try {
//       const res = await getAPI(
//         `/get-class-subjects?schoolId=${schoolId}&academicYear=${academicYear}&className=${selectedClass.value}&sectionName=${selectedSection.value}`
//       );

//       if (!res.data.hasError) {
//         const subjectsData = res.data.data[0]?.subjects || [];
//         setSubjectRows(
//           subjectsData.map((s) => ({
//             value: s._id,
//             label: s.subjectName,
//           }))
//         );
//       } else {
//         toast.error(res.data.message || "Failed to fetch subjects");
//       }
//     } catch (err) {
//       console.error("Error fetching subjects:", err);
//       toast.error("Error fetching subjects");
//     }
//   };

//   const fetchstaff = async () => {
//     try {
//       const res = await getAPI(`/get-employees/${schoolId}`, true);
//       console.log("staff response", res);

//       if (res.data.success) {
//         const staffOptions = res.data.employees.map((emp) => ({
//           value: emp.employeeId,
//           label: `${emp.employeeName} (${emp.employeeId})`,
//         }));
//         setStaffList(staffOptions);
//       } else {
//         toast.error(res.data.message || "Failed to fetch staff");
//       }
//     } catch (err) {
//       console.error("Error fetching staff:", err);
//       toast.error("Error fetching staff");
//     }
//   };


//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                   <h4 className=" payroll-title text-center mb-0 flex-grow-1">
//                     Add Lesson Plan
//                   </h4>
//                   <button
//                     type="button "
//                     className="btn btn-primary ms-2 custom-submit-button"
//                     onClick={() => {
//                       navigate(-1);
//                     }}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <form onSubmit="">
//                 <div className="row">
//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="bookRecordNumber" className="form-label">
//                         Class <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         name="class"
//                         options={classes}
//                         placeholder="Select Class"
//                         className="email-select form-select-sm text-nowrap"
//                         value={selectedClass}
//                         onChange={(option) => {
//                           setSelectedClass(option);
//                           setSelectedSection(null);
//                           setSections([]);
//                         }}
//                         isLoading={loading}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="Section" className="form-label">
//                         Section <span className="text-danger">*</span>
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

//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="Section" className="form-label">
//                         Staff <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         name={`staff`}
//                         options={staffList}
//                         placeholder="Select Staff"
//                         className="email-select form-select-sm text-nowrap"
//                         isDisabled={!selectedSection}
//                         isLoading={loading}
//                         // value={
//                         //   staffList.find(
//                         //     (opt) => opt.value === row.staffId
//                         //   ) || null
//                         // }
//                         // onChange={(option) =>
//                         //   handleStaffChange(index, option)
//                         // }
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="Section" className="form-label">
//                         Subject <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         name={`subject`}
//                         options={subjectRows}
//                         placeholder="Select Subject"
//                         className="email-select form-select-sm text-nowrap"
//                         isDisabled={!selectedSection}
//                         isLoading={loading}
//                         // value={
//                         //   subjectRows.find(
//                         //     (opt) => opt.value === row.subjectId
//                         //   ) || null
//                         // }
//                         // onChange={(option) =>
//                         //   handleSubjectChange(index, option)
//                         // }
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-end">
//                   {!isShow && (
//                     <button
//                       type="button"
//                       // disabled={!subjects}
//                       className="btn btn-primary custom-submit-button"
//                       onClick={() => setIsShow(true)}
//                     >
//                       Continue
//                     </button>
//                   )}
//                 </div>
//                 {isShow && (
//                   <>
//                     <div className="table-responsive pb-4 mt-3">
//                       <table className="table text-dark border border-dark mb-1">
//                         <thead>
//                           <tr className="payroll-table-header">
//                             <th className="text-center  align-content-center border border-dark text-nowrap p-2">
//                               Name of Chapter
//                             </th>
//                             <th
//                               className="text-center  align-content-center border border-dark text-nowrap p-2"
//                               // style={{ width: "280px" }}
//                             >
//                               Sub Category
//                             </th>
//                             <th
//                               className="text-center align-content-center border border-dark  p-2"
//                               // style={{ width: "150px" }}
//                             >
//                               Due Date for Completion
//                             </th>

//                             <th className="text-center align-content-center border border-dark  p-2">
//                               Date of Completion
//                             </th>
//                             <th className="text-center align-content-center border border-dark p-2"
//                             style={{width:"150px"}}>
//                               Progress
//                             </th>
//                             <th className="text-center align-content-center border border-dark p-2"
//                             style={{width:"150px"}}>
//                               Status
//                             </th>
//                             <th className="text-center align-content-center border border-dark  p-2">
//                               Action
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {rows.map((row, index) => (
//                             <tr key={index} className="payroll-table-body">
                             
//                               <td className="text-start align-content-center border border-dark p-2">
//                                 <input
//                                   type="text"
//                                   className="form-control payroll-table-body payroll-input-border text-start"
//                                   required
//                                 />
//                               </td>

//                               <td className="text-center align-content-center border border-dark p-2">
//                                 <input
//                                   type="text"
//                                   className="form-control payroll-table-body payroll-input-border text-start"
//                                   required
//                                 />
//                               </td>

//                               <td className="text-start align-content-center border border-dark p-2">
//                                 <input
//                                   type="date"
//                                   className="form-control payroll-table-body payroll-input-border text-start"
//                                   required
//                                 />
//                               </td>

//                               <td className="text-start align-content-center border border-dark p-2">
//                                 <input
//                                   type="date"
//                                   className="form-control payroll-table-body payroll-input-border text-start"
//                                   required
//                                 />
//                               </td>

//                               <td className="text-center align-content-center border border-dark p-2">
//                                 <select
//                                   id="gender"
//                                   name="gender"
//                                   className="form-control text-nowrap"
//                                   required
//                                 >
//                                   <option value="">Select Progress</option>
//                                   <option value="On Track">On Track</option>
//                                   <option value="Behind">Behind</option>
//                                   <option value="Quicker">Quicker</option>
//                                 </select>
//                               </td>

//                               <td className="text-center align-content-center border border-dark p-2">
//                                 <select
//                                   id="gender"
//                                   name="gender"
//                                   className="form-control text-nowrap"
//                                   required
//                                 >
//                                   <option value="">Select status</option>
//                                   <option value="Pending">Pending</option>
//                                   <option value="Completed">Completed</option>
//                                 </select>
//                               </td>
//                               <td>
//                                 <div className="d-flex gap-2 justify-content-center">                               
//                                   <Link
//                                     className="btn btn-soft-danger btn-sm"
//                                     onClick={() => removeRow(index)}
//                                   >
//                                     <iconify-icon
//                                       icon="solar:trash-bin-minimalistic-2-broken"
//                                       className="align-middle fs-18"
//                                     />
//                                   </Link>                          
//                                 </div>
//                               </td>                         
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                     <div className="text-end" style={{ overflow: "auto" }}>
//                       <button
//                         type="button"
//                         className="btn btn-danger me-2"
//                         onClick={addRow}
//                       >
//                         Add Row
//                       </button>
//                       <button
//                         type="submit"
//                         className="btn btn-primary custom-submit-button"
//                       >
//                         Save & Published
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddLessonPlanning;


import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate, Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import postAPI from "../../../../../../api/postAPI";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";

const AddLessonPlanning = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId, academicYear } = location.state || {};

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [subjectRows, setSubjectRows] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [staffList, setStaffList] = useState([]);

  const [rows, setRows] = useState([
    {
      chapterName: "",
      subCategory: "",
      dueDate: "",
      completionDate: "",
      progress: "",
      status: "Pending",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        chapterName: "",
        subCategory: "",
        dueDate: "",
        completionDate: "",
        progress: "",
        status: "Pending",
      },
    ]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !schoolId ||
      !academicYear ||
      !selectedClass ||
      !selectedSection ||
      !selectedStaff ||
      !selectedSubject
    ) {
      toast.error("Please select class, section, staff and subject");
      return;
    }

    try {
      const payload = {
        schoolId,
        academicYear,
        className: selectedClass.value,
        sectionName: selectedSection.value,
        staffId: selectedStaff.value,
        subjectId: selectedSubject.value,
        chapters: rows,
      };

      const res = await postAPI("/add-lesson-plan", payload,{}, true);
      console.log("post lesson plan res",res);
      
      if (!res.data.hasError) {
        toast.success(res.data.message || "Lesson plan saved successfully");
        navigate(-1); 
      } else {
        toast.error(res.data.message || "Failed to save lesson plan");
      }
    } catch (error) {
      console.error("Error saving lesson plan:", error);
      toast.error("Error saving lesson plan");
    }
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
      fetchStaff();
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
          subjectsData.map((s) => ({ value: s._id, label: s.subjectName }))
        );
      } else {
        toast.error(res.data.message || "Failed to fetch subjects");
      }
    } catch (err) {
      console.error("Error fetching subjects:", err);
      toast.error("Error fetching subjects");
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await getAPI(`/get-employees/${schoolId}`, true);
      if (res.data.success) {
        const staffOptions = res.data.employees.map((emp) => ({
          value: emp.employeeId,
          label: `${emp.employeeName} (${emp.employeeId})`,
        }));
        setStaffList(staffOptions);
      } else {
        toast.error(res.data.message || "Failed to fetch staff");
      }
    } catch (err) {
      console.error("Error fetching staff:", err);
      toast.error("Error fetching staff");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className="payroll-title text-center mb-0 flex-grow-1">
                    Add Lesson Plan
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
                {/* Class / Section / Staff / Subject Selectors */}
                <div className="row">
                  <div className="col-md-3">
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

                  <div className="col-md-3">
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

                  <div className="col-md-3">
                    <label className="form-label">
                      Staff <span className="text-danger">*</span>
                    </label>
                    <CreatableSelect
                      isClearable
                      options={staffList}
                      placeholder="Select Staff"
                      value={selectedStaff}
                      onChange={setSelectedStaff}
                      isDisabled={!selectedSection}
                      isLoading={loading}
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      Subject <span className="text-danger">*</span>
                    </label>
                    <CreatableSelect
                      isClearable
                      options={subjectRows}
                      placeholder="Select Subject"
                      value={selectedSubject}
                      onChange={setSelectedSubject}
                      isDisabled={!selectedSection}
                      isLoading={loading}
                    />
                  </div>
                </div>

                {/* Show Chapters Table after Continue */}
                <div className="text-end">
                  {!isShow && (
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={() => setIsShow(true)}
                    >
                      Continue
                    </button>
                  )}
                </div>

                {isShow && (
                  <>
                    <div className="table-responsive pb-4 mt-3">
                      <table className="table text-dark border border-dark mb-1">
                        <thead>
                          <tr className="payroll-table-header">
                            <th className="text-center border border-dark p-2">
                              Name of Chapter
                            </th>
                            <th className="text-center border border-dark p-2">
                              Sub Category
                            </th>
                            <th className="text-center border border-dark p-2">
                              Due Date
                            </th>
                            <th className="text-center border border-dark p-2">
                              Completion Date
                            </th>
                            <th className="text-center border border-dark p-2">
                              Progress
                            </th>
                            <th className="text-center border border-dark p-2">
                              Status
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
                                <input
                                  type="text"
                                  value={row.chapterName}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "chapterName",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                  required
                                />
                              </td>
                              <td className="border border-dark p-2">
                                <input
                                  type="text"
                                  value={row.subCategory}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "subCategory",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              </td>
                              <td className="border border-dark p-2">
                                <input
                                  type="date"
                                  value={row.dueDate}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "dueDate",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                  required
                                />
                              </td>
                              <td className="border border-dark p-2">
                                <input
                                  type="date"
                                  value={row.completionDate}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "completionDate",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                />
                              </td>
                              <td className="border border-dark p-2">
                                <select
                                  value={row.progress}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "progress",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                  required
                                >
                                  <option value="">Select</option>
                                  <option value="On Track">On Track</option>
                                  <option value="Behind">Behind</option>
                                  <option value="Quicker">Quicker</option>
                                </select>
                              </td>
                              <td className="border border-dark p-2">
                                <select
                                  value={row.status}
                                  onChange={(e) =>
                                    handleRowChange(
                                      index,
                                      "status",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                  required
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </td>
                              <td className="border border-dark p-2 text-center">
                                <button
                                  type="button"
                                  className="btn btn-soft-danger btn-sm"
                                  onClick={() => removeRow(index)}
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

export default AddLessonPlanning;
