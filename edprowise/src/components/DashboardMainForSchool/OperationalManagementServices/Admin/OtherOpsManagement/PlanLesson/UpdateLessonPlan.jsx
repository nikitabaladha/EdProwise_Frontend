// import React, { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useNavigate, Link, useLocation} from "react-router-dom";
// import CreatableSelect from "react-select/creatable";

// const UpdateLessonPlan = () => {
//      const navigate = useNavigate();
//      const location = useLocation();

//      const record = location.state?.record;
//      console.log(record, "get record");

//      const [rows, setRows] = useState([{}]);

//      const addRow = () => {
//        setRows([...rows, {}]);
//      };

//      const removeRow = (index) => {
//        if (rows.length > 1) {
//          const newRows = [...rows];
//          newRows.splice(index, 1);
//          setRows(newRows);
//        }
//      };
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-1">
//                   <h4 className=" payroll-title text-center mb-0 flex-grow-1">
//                     Update Lesson Plan
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
//                 <div className="table-responsive pb-4">
//                   <table className="table text-dark border border-dark mb-1">
//                     <thead>
//                       <tr className="payroll-table-header">
                        
//                         <th className="text-center  align-content-center border border-dark text-nowrap p-2">
//                           Name of Chapter
//                         </th>
//                         <th
//                           className="text-center  align-content-center border border-dark text-nowrap p-2"
//                           // style={{ width: "280px" }}
//                         >
//                           Sub Category
//                         </th>
//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           // style={{ width: "150px" }}
//                         >
//                           Due Date for Completion
//                         </th>

//                         <th className="text-center align-content-center border border-dark  p-2">
//                           Date of Completion
//                         </th>
//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           style={{ width: "150px" }}
//                         >
//                           Progress
//                         </th>
//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           style={{ width: "150px" }}
//                         >
//                           Status
//                         </th>
//                         <th className="text-center align-content-center border border-dark  p-2">
//                           Action
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, index) => (
//                         <tr key={index} className="payroll-table-body">
                          
//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>

//                           <td className="text-center align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               name={`gstAmount-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>

//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="date"
//                               name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>

//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="date"
//                               name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>

//                           <td className="text-end align-content-center border border-dark p-2">
//                             <select
//                               id="gender"
//                               name="gender"
//                               className="form-control  payroll-table-body payroll-input-border"
//                               required
//                             >
//                               <option value="">Select Progress</option>
//                               <option value="On Track">On Track</option>
//                               <option value="Behind">Behind</option>
//                               <option value="Quicker">Quicker</option>
//                             </select>
//                           </td>

//                           <td className="text-end align-content-center border border-dark p-2">
//                             <select
//                               id="gender"
//                               name="gender"
//                               className="form-control  payroll-table-body payroll-input-border"
//                               required
//                             >
//                               <option value="">Select status</option>
//                               <option value="Pending">Pending</option>
//                               <option value="Completed">Completed</option>
//                             </select>
//                           </td>
//                           <td>
//                             <div className="d-flex gap-2 justify-content-center">                            
//                               <Link
//                                 className="btn btn-soft-danger btn-sm"
//                                 onClick={() => removeRow(index)}
//                               >
//                                 <iconify-icon
//                                   icon="solar:trash-bin-minimalistic-2-broken"
//                                   className="align-middle fs-18"
//                                 />
//                               </Link>                            
//                             </div>
//                           </td> 
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </form>
//               <div className="text-end" style={{ overflow: "auto" }}>
//                 <button
//                   type="button"
//                   className="btn btn-danger me-2"
//                   onClick={addRow}
//                 >
//                   Add Row
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-primary custom-submit-button"
//                 >
//                   Save & Published
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpdateLessonPlan

import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useLocation, Link } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI";
import putAPI from "../../../../../../api/putAPI";
import { toast } from "react-toastify";

const UpdateLessonPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const record = location.state?.record;
  console.log("Record received:", record);
  const [schoolId, setSchoolId] = useState("");
        const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [parentId, setParentId] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!record) return;
    setSchoolId(record.schoolId);
    setAcademicYear(record.academicYear);
    setClassName(record.className);
    setSectionName(record.sectionName);
    setSubjectId(record.subjectId);
    setParentId(record._id)
  }, [record]);

  // useEffect(() => {
  //   if (!schoolId && !academicYear && !className && !sectionName && !subjectId) return;
  //   fetchLessonPlan();
  // }, [schoolId, academicYear, className, sectionName, subjectId]);
useEffect(() => {
  if (!schoolId || !academicYear || !className || !sectionName || !subjectId) {
    return; 
  }
  fetchLessonPlan();
}, [schoolId, academicYear, className, sectionName, subjectId]);

 const fetchLessonPlan = async () => {
   try {
     const response = await getAPI(
       `/get-lesson-plan-by-subject?schoolId=${schoolId}&academicYear=${academicYear}&className=${className}&sectionName=${sectionName}&subjectId=${subjectId}`
     );
     console.log("get subject response", response);

     if (!response.hasError) {
       const currentPlan = response.data.data.find((p) => p._id === record._id);
       if (currentPlan) {
         setRows(currentPlan.chapters);
       }
     }
   } catch (err) {
     console.error("Error fetching lesson plan by subject:", err);
     toast.error("Failed to fetch lesson plan.");
   } finally {
     setLoading(false);
   }
 };
  const addRow = () =>
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

  const removeRow = (index) => {
    if (rows.length > 1) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        chapters: rows,
      };
      const response = await putAPI(`/update-lesson-plans/${parentId}`, payload, {}, true);
      if (!response.hasError) {
        toast.success("Lesson plan updated successfully!");
        navigate(-1);
      } else {
        toast.error(response.message || "Update failed.");
      }
    } catch (err) {
      console.error("Error updating lesson plan:", err);
      toast.error("Server error while updating lesson plan.");
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-1">
                  <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                    Update Lesson Plan
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
                <div className="table-responsive pb-4">
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
                                handleInputChange(
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
                                handleInputChange(
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
                              value={
                                row.dueDate ? row.dueDate.split("T")[0] : ""
                              }
                              onChange={(e) =>
                                handleInputChange(
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
                              value={
                                row.completionDate
                                  ? row.completionDate.split("T")[0]
                                  : ""
                              }
                              onChange={(e) =>
                                handleInputChange(
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
                                handleInputChange(
                                  index,
                                  "progress",
                                  e.target.value
                                )
                              }
                              className="form-control"
                              required
                            >
                              <option value="">Select Progress</option>
                              <option value="On Track">On Track</option>
                              <option value="Behind">Behind</option>
                              <option value="Quicker">Quicker</option>
                            </select>
                          </td>
                          <td className="border border-dark p-2">
                            <select
                              value={row.status}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "status",
                                  e.target.value
                                )
                              }
                              className="form-control"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="border border-dark p-2 text-center">
                            <Link
                              className="btn btn-soft-danger btn-sm"
                              onClick={() => removeRow(index)}
                            >
                              <RxCross1 />
                            </Link>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLessonPlan;
