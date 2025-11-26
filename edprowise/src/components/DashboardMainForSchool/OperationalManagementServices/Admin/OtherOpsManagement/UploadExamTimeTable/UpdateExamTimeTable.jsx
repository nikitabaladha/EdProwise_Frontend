// import React, { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";

// const UpdateExamTimeTable = () => {
//   const navigate = useNavigate();

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
//               <form onSubmit="">
//                 <div className="row mt-3">
//                   <div className="col-md-3">
//                     <div className="mb-3">
//                       <label htmlFor="vendorCode" className="form-label">
//                         Class <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         name={`ledger`}
//                         placeholder="Select Class"
//                         className="email-select "
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <div className="mb-6">
//                       <label
//                         htmlFor="numberOfDayOnLeave"
//                         className="form-label"
//                       >
//                         Section <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         name={`ledger`}
//                         placeholder="Select Section"
//                         className="email-select "
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-3">
//                     <div className="mb-6">
//                       <label
//                         htmlFor="numberOfDayOnLeave"
//                         className="form-label"
//                       >
//                         Name of Exam <span className="text-danger">*</span>
//                       </label>
//                       <CreatableSelect
//                         isClearable
//                         name={`ledger`}
//                         placeholder="Select Exam Name"
//                         className="email-select "
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="table-responsive px-lg-5 pb-4">
//                   <table className="table text-dark border border-dark mb-1">
//                     <thead>
//                       <tr className="payroll-table-header">
//                         <th className="text-center  align-content-center border border-dark text-nowrap p-2">
//                           Date
//                         </th>
//                         <th className="text-center  align-content-center border border-dark text-nowrap p-2">
//                           Subject
//                         </th>
//                         <th
//                           className="text-center  align-content-center border border-dark text-nowrap p-2"
//                           // style={{ width: "280px" }}
//                         >
//                           From
//                         </th>
//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           // style={{ width: "150px" }}
//                         >
//                           To
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, index) => (
//                         <tr key={index} className="payroll-table-body">
//                           <td className="text-start align-content-center border border-dark p-2">
//                             <input
//                               type="date"
//                               // name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-start"
//                               required
//                             />
//                           </td>
//                           <td className="text-start align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               // name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-start"
//                               required
//                             />
//                           </td>
//                           <td className="text-start align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>
//                           <td className="text-start align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>
//                           {rows.length > 1 && (
//                             <td className="text-center align-content-center border border-dark p-2">
//                               {rows.length > 1 && (
//                                 <button
//                                   type="button"
//                                   className="btn btn-danger btn-sm"
//                                   onClick={() => removeRow(index)}
//                                 >
//                                   <RxCross1 />
//                                 </button>
//                               )}
//                             </td>
//                           )}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="text-end">
//                   <button
//                     type="button"
//                     className="btn btn-danger me-2"
//                     onClick={addRow}
//                   >
//                     Add Row
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn btn-primary custom-submit-button"
//                   >
//                     Update
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateExamTimeTable;

import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import getAPI from "../../../../../../api/getAPI";
import putAPI from "../../../../../../api/putAPI";
import { toast } from "react-toastify";

const UpdateExamTimeTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state; 

  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [rows, setRows] = useState([
    { examDate: "", subjectId: "", fromTime: "", toTime: "" },
  ]);

  useEffect(() => {
    if (
      existingData?.schoolId &&
      existingData?.academicYear &&
      existingData?.className &&
      existingData?.sectionName &&
      existingData?.examName
    ) {
      fetchSubjects();
      fetchExamTimetable();
    }
  }, [existingData]);

  const fetchSubjects = async () => {
    try {
      const res = await getAPI(
        `/get-class-subjects?schoolId=${existingData.schoolId}&academicYear=${existingData.academicYear}&className=${existingData.className}&sectionName=${existingData.sectionName}`
      );

      if (!res.data.hasError) {
        const subjectsData = res.data.data[0]?.subjects || [];
        setSubjects(
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

  const fetchExamTimetable = async () => {
    setLoading(true);
    try {
      const res = await getAPI(
        `/get-exam-timetables?schoolId=${existingData.schoolId}&academicYear=${existingData.academicYear}&className=${existingData.className}&sectionName=${existingData.sectionName}&examName=${existingData.examName}`
      );
      console.log("get update time table", res);

      if (!res.data.hasError) {
        const timetable = res.data.data?.find(
          (item) => item._id === existingData._id
        );
        console.log("timetable", timetable);

        if (timetable) {
          setRows(
            timetable.examDetails.map((r) => ({
              examDate: r.examDate || "",
              subjectId: r.subjectId || "",
              fromTime: r.fromTime || "",
              toTime: r.toTime || "",
            }))
          );
        }
      } else {
        toast.error(res.data.message || "Failed to fetch exam timetable");
      }
    } catch (err) {
      console.error("Error fetching exam timetable:", err);
      toast.error("Error fetching exam timetable");
    } finally {
      setLoading(false);
    }
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { examDate: "", subjectId: "", fromTime: "", toTime: "" }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const payload = {
       schoolId: existingData.schoolId,
       academicYear: existingData.academicYear,
       className: existingData.className,
       sectionName: existingData.sectionName,
       examName: existingData.examName,
       examDetails: rows.map((r) => ({
         examDate: r.examDate,
         subjectId: r.subjectId,
         fromTime: r.fromTime,
         toTime: r.toTime,
       })),
     };

     const res = await putAPI(
       `/update-exam-timetable/${existingData._id}`,
       payload
     );

     if (res.data && !res.data.hasError) {
       toast.success("Exam Timetable updated successfully");
       navigate(-1);
     } else {
       toast.error(res.data.message || "Failed to update exam timetable");
     }
   } catch (err) {
     console.error("Error updating exam timetable:", err);
     toast.error("Something went wrong while updating");
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
                    Update Exam Time Table
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

              {loading ? (
                <p className="text-center my-3">Loading...</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">Class</label>
                        <input
                          type="text"
                          className="form-control"
                          value={existingData.className || ""}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="mb-3">
                        <label className="form-label">Section</label>
                        <input
                          type="text"
                          className="form-control"
                          value={existingData.sectionName || ""}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name of Exam</label>
                        <input
                          type="text"
                          className="form-control"
                          value={existingData.examName || ""}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive px-lg-5 pb-4 mt-3">
                    <table className="table text-dark border border-dark mb-1">
                      <thead>
                        <tr className="payroll-table-header">
                          <th className="text-center border border-dark p-2">
                            Date
                          </th>
                          <th className="text-center border border-dark p-2">
                            Subject
                          </th>
                          <th className="text-center border border-dark p-2">
                            From
                          </th>
                          <th className="text-center border border-dark p-2">
                            To
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
                              {/* <input
                                type="date"
                                value={
                                  row.examDate
                                    // ? new Date(row.examDate)
                                    //     .toISOString()
                                    //     .split("T")[0]
                                    // : ""
                                }
                                onChange={(e) =>
                                  handleRowChange(index, "date", e.target.value)
                                }
                                className="form-control payroll-input-border"
                                required
                              /> */}
                              <input
                                type="date"
                                value={
                                  row.examDate
                                    ? new Date(row.examDate)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "examDate",
                                    e.target.value
                                  )
                                }
                                className="form-control payroll-input-border"
                                required
                              />
                            </td>
                            <td className="border border-dark p-2">
                              <CreatableSelect
                                isClearable
                                value={
                                  subjects.find(
                                    (s) => s.value === row.subjectId
                                  ) || null
                                }
                                onChange={(val) =>
                                  handleRowChange(
                                    index,
                                    "subjectId",
                                    val ? val.value : ""
                                  )
                                }
                                options={subjects}
                                className="payroll-input-border"
                                placeholder="Select Subject"
                              />
                            </td>
                            <td className="border border-dark p-2">
                              <input
                                type="time"
                                value={row.fromTime}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "fromTime",
                                    e.target.value
                                  )
                                }
                                className="form-control payroll-input-border"
                                required
                              />
                            </td>
                            <td className="border border-dark p-2">
                              <input
                                type="time"
                                value={row.toTime}
                                onChange={(e) =>
                                  handleRowChange(
                                    index,
                                    "toTime",
                                    e.target.value
                                  )
                                }
                                className="form-control payroll-input-border"
                                required
                              />
                            </td>
                            <td className="border border-dark text-center p-2">
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
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateExamTimeTable;
