// import React, { useState, useEffect } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useLocation, useNavigate } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";
// import postAPI from "../../../../../../api/postAPI";
// import getAPI from "../../../../../../api/getAPI";

// import { toast } from "react-toastify";
// const AddTimePeriod = () => {
//   const navigate = useNavigate();
//   // const [rows, setRows] = useState(Array(5).fill({}));
//   const [rows, setRows] = useState([
//   {
//     subjectId: "",
//     day: "",
//     fromTime: "",
//     toTime: "",
//     staffId: "",
//     remarks: "",
//   },
// ]);
//   const location = useLocation();
//   const { schoolId, academicYear } = location.state || {};
//   const [classes, setClasses] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [className, setClassName] = useState("");
//   const [sectionName, setSectionName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [subjectRows, setSubjectRows] = useState([]);
// const [isShow, setIsShow] = useState(false);
// const [staffList, setStaffList] = useState([]);

// const daysList = [
//   { value: "Monday", label: "Monday" },
//   { value: "Tuesday", label: "Tuesday" },
//   { value: "Wednesday", label: "Wednesday" },
//   { value: "Thursday", label: "Thursday" },
//   { value: "Friday", label: "Friday" },
//   { value: "Saturday", label: "Saturday" },
// ];

//   const addRow = () => {
//     setRows([
//       ...rows,
//       {
//         subjectId: "",
//         day: "",
//         fromTime: "",
//         toTime: "",
//         staffId: "",
//         remarks: "",
//       },
//     ]);
//   };

//   const removeRow = (index) => {
//     const updatedRows = rows.filter((_, i) => i !== index);
//     setRows(updatedRows);
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

//     const fetchSubjects = async () => {
//       try {
//         const res = await getAPI(
//           `/get-class-subjects?schoolId=${schoolId}&academicYear=${academicYear}&className=${className}&sectionName=${sectionName}`
//         );

//         if (!res.data.hasError) {
//           const subjectsData = res.data.data[0]?.subjects || [];
//           setSubjectRows(
//             subjectsData.map((s) => ({
//               id: s._id,
//               subjectName: s.subjectName,
//               isNew: false,
//             }))
//           );
//         } else {
//           toast.error(res.data.message || "Failed to fetch subjects");
//         }
//       } catch (err) {
//         console.error("Error fetching subjects:", err);
//         toast.error("Error fetching subjects");
//       }
//     };

// const fetchstaff = async () => {
//   try {
//     const res = await getAPI(`/get-employees/${schoolId}`, true);
//     console.log("staff response", res);

//     if (res.data.success) {
//       const staffOptions = res.data.employees.map((emp) => ({
//         value: emp.employeeId,
//         label: `${emp.employeeName} (${emp.employeeId})`,
//       }));
//       setStaffList(staffOptions);
//     } else {
//       toast.error(res.data.message || "Failed to fetch staff");
//     }
//   } catch (err) {
//     console.error("Error fetching staff:", err);
//     toast.error("Error fetching staff");
//   }
// };
// const handleRowChange = (index, field, value) => {
//   const updatedRows = [...rows];
//   updatedRows[index][field] = value;
//   setRows(updatedRows);
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!selectedClass || !selectedSection) {
//     toast.error("Please select class and section");
//     return;
//   }

//   const payload = {
//     schoolId,
//     academicYear,
//     className: selectedClass.value,
//     sectionName: selectedSection.value,
//     timePeriodDetails: rows,
//   };

//   try {
//     const res = await postAPI("/add-time-period", payload, true);

//     if (!res.data.hasError) {
//       toast.success(res.data.message || "Time Period added successfully");
//       navigate(-1);
//     } else {
//       toast.error(res.data.message || "Failed to save time period");
//     }
//   } catch (error) {
//     console.error("Error saving time period:", error);
//     toast.error("Error saving time period");
//   }
// };



//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-1">
//                   <h4 className=" payroll-title text-center mb-0 flex-grow-1">
//                     Add Time Period
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
//               <form >
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
//                   <div className="table-responsive pb-4">
//                     <table className="table text-dark border border-dark mb-1">
//                       <thead>
//                         <tr className="payroll-table-header">
//                           <th
//                             className="text-center  align-content-center border border-dark text-nowrap p-2"
//                             style={{ width: "250px" }}
//                           >
//                             Name of Subject
//                           </th>
//                           <th
//                             className="text-center  align-content-center border border-dark text-nowrap p-2"
//                             style={{ width: "250px" }}
//                           >
//                             Days
//                           </th>
//                           <th
//                             className="text-center align-content-center border border-dark text-nowrap  p-2"
//                             // style={{ width: "150px" }}
//                           >
//                             From Time
//                           </th>

//                           <th
//                             className="text-center align-content-center border border-dark text-nowrap  p-2"
//                             // style={{ width: "150px" }}
//                           >
//                             To Time
//                           </th>
//                           <th
//                             className="text-center align-content-center border border-dark  text-nowrap p-2"
//                             style={{ width: "250px" }}
//                           >
//                             List of Staff
//                           </th>
//                           <th
//                             className="text-center align-content-center border border-dark text-nowrap  p-2"
//                             // style={{ width: "150px" }}
//                           >
//                             Any Remarks
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {rows.map((row, index) => (
//                           <tr key={index} className="payroll-table-body">
//                             <td className="text-start align-content-center border border-dark p-2">
//                               <CreatableSelect
//                                 isClearable
//                                 name="subject"
//                                 options={subjectRows.map((s) => ({
//                                   value: s.id,
//                                   label: s.subjectName,
//                                 }))}
//                                 placeholder="Select Subject"
//                                 className="email-select payroll-table-body rounded payroll-input-border"
//                               />
//                             </td>
//                             <td className="text-start align-content-center border border-dark p-2">
//                               <CreatableSelect
//                                 isClearable
//                                 name="day"
//                                 options={daysList}
//                                 placeholder="Select Day"
//                                 className="email-select payroll-table-body rounded payroll-input-border"
//                               />
//                             </td>
//                             <td className="text-end align-content-center border border-dark p-2">
//                               <input
//                                 type="time"
//                                 name={`fromTime-${index}`}
//                                 className="form-control payroll-table-body payroll-input-border text-end"
//                                 required
//                               />
//                             </td>

//                             <td className="text-center align-content-center border border-dark p-2">
//                               <input
//                                 type="time"
//                                 name={`toTime-${index}`}
//                                 className="form-control payroll-table-body payroll-input-border text-end"
//                                 required
//                               />
//                             </td>
//                             <td className="text-start align-content-center border border-dark p-2">
//                               <CreatableSelect
//                                 isClearable
//                                 name={`staff-${index}`}
//                                 options={staffList}
//                                 placeholder="Select Staff"
//                                 className="email-select payroll-table-body rounded payroll-input-border"
//                               />
//                             </td>
//                             <td className="text-start align-content-center border border-dark p-2">
//                               <input
//                                 type="text"
//                                 name={`remark-${index}`}
//                                 className="form-control payroll-table-body fianance-input-border text-end"
//                                 required
//                               />
//                             </td>
//                             {rows.length > 1 && (
//                               <td className="text-center align-content-center border border-dark p-2">
//                                 {rows.length > 1 && (
//                                   <button
//                                     type="button"
//                                     className="btn btn-danger btn-sm"
//                                     onClick={() => removeRow(index)}
//                                   >
//                                     <RxCross1 />
//                                   </button>
//                                 )}
//                               </td>
//                             )}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="text-end">
//                     <button
//                       type="button"
//                       className="btn btn-danger me-2"
//                       onClick={addRow}
//                     >
//                       Add Row
//                     </button>
//                     <button
//                       type="submit"
//                       className="btn btn-primary custom-submit-button"
//                     >
//                       Save & Published
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddTimePeriod;

import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import postAPI from "../../../../../../api/postAPI";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";

const AddTimePeriod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId, academicYear } = location.state || {};

  const emptyRow = {
    subjectId: "",
    day: "",
    fromTime: "",
    toTime: "",
    staffId: "",
    remarks: "",
  };

  const [rows, setRows] = useState(() =>
    Array.from({ length: 5 }, () => ({ ...emptyRow }))
  );

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [subjectRows, setSubjectRows] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [staffList, setStaffList] = useState([]);

  const daysList = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const addRow = () => {
    setRows([
      ...rows,
      {
        subjectId: "",
        day: "",
        fromTime: "",
        toTime: "",
        staffId: "",
        remarks: "",
      },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length <= 1) return;
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  // Handle changes in form fields
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Handle subject selection
  const handleSubjectChange = (index, selectedOption) => {
    const updatedRows = [...rows];
    updatedRows[index].subjectId = selectedOption ? selectedOption.value : "";
    setRows(updatedRows);
  };

  // Handle day selection
  const handleDayChange = (index, selectedOption) => {
    const updatedRows = [...rows];
    updatedRows[index].day = selectedOption ? selectedOption.value : "";
    setRows(updatedRows);
  };

  // Handle staff selection
  const handleStaffChange = (index, selectedOption) => {
    const updatedRows = [...rows];
    updatedRows[index].staffId = selectedOption ? selectedOption.value : "";
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
      fetchstaff();
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

  const fetchstaff = async () => {
    try {
      const res = await getAPI(`/get-employees/${schoolId}`, true);
      console.log("staff response", res);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSection) {
      toast.error("Please select class and section");
      return;
    }

    // Validate all rows have required fields
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (
        !row.subjectId ||
        !row.day ||
        !row.fromTime ||
        !row.toTime ||
        !row.staffId
      ) {
        toast.error(`Please fill all required fields in row ${i + 1}`);
        return;
      }
    }

    const payload = {
      schoolId,
      academicYear,
      className: selectedClass.value,
      sectionName: selectedSection.value,
      timePeriodDetails: rows,
    };

    try {
      const res = await postAPI("/add-time-period", payload, true);

      if (!res.data.hasError) {
        toast.success(res.data.message || "Time Period added successfully");
        navigate(-1);
      } else {
        toast.error(res.data.message || "Failed to save time period");
      }
    } catch (error) {
      console.error("Error saving time period:", error);
      toast.error("Error saving time period");
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
                    Add Time Period
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
                        className="email-select form-select-sm text-nowrap"
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
                    <div className="table-responsive pb-4">
                      <table className="table text-dark border border-dark mb-1">
                        <thead>
                          <tr className="payroll-table-header">
                            <th className="text-center align-content-center border border-dark text-nowrap p-2">
                              Name of Subject
                            </th>
                            <th className="text-center align-content-center border border-dark text-nowrap p-2">
                              Days
                            </th>
                            <th className="text-center align-content-center border border-dark text-nowrap p-2">
                              From Time
                            </th>
                            <th className="text-center align-content-center border border-dark text-nowrap p-2">
                              To Time
                            </th>
                            <th className="text-center align-content-center border border-dark text-nowrap p-2">
                              List of Staff
                            </th>
                            <th className="text-center align-content-center border border-dark text-nowrap p-2">
                              Any Remarks
                            </th>
                            <th className="text-center align-content-center border border-dark text-nowrap p-2">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, index) => (
                            <tr key={index} className="payroll-table-body">
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
                              <td className="text-start align-content-center border border-dark p-2">
                                <CreatableSelect
                                  isClearable
                                  name={`day-${index}`}
                                  options={daysList}
                                  placeholder="Select Day"
                                  className="email-select payroll-table-body rounded payroll-input-border"
                                  value={
                                    daysList.find(
                                      (opt) => opt.value === row.day
                                    ) || null
                                  }
                                  onChange={(option) =>
                                    handleDayChange(index, option)
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
                              <td className="text-start align-content-center border border-dark p-2">
                                <CreatableSelect
                                  isClearable
                                  name={`staff-${index}`}
                                  options={staffList}
                                  placeholder="Select Staff"
                                  className="email-select payroll-table-body rounded payroll-input-border"
                                  value={
                                    staffList.find(
                                      (opt) => opt.value === row.staffId
                                    ) || null
                                  }
                                  onChange={(option) =>
                                    handleStaffChange(index, option)
                                  }
                                />
                              </td>
                              <td className="text-start align-content-center border border-dark p-2">
                                <input
                                  type="text"
                                  name={`remark-${index}`}
                                  className="form-control payroll-table-body fianance-input-border text-end"
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
};

export default AddTimePeriod;
