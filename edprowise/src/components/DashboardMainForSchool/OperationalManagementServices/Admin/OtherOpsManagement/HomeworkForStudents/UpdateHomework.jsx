// import React, { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";

// const UpdateHomework = () => {
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
//                     Update Homework
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
//                 </div>

//                 <div className="table-responsive pb-4">
//                   <table className="table text-dark border border-dark mb-1">
//                     <thead>
//                       <tr className="payroll-table-header">
//                         <th className="text-center  align-content-center border border-dark text-nowrap p-2">
//                           Date
//                         </th>
//                         <th
//                           className="text-center  align-content-center border border-dark text-nowrap p-2"
//                           // style={{ width: "280px" }}
//                         >
//                           Subject
//                         </th>
//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           // style={{ width: "150px" }}
//                         >
//                           Short Description
//                         </th>

//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           // style={{ width: "150px" }}
//                         >
//                           Upload
//                         </th>
//                         <th
//                           className="text-center align-content-center border border-dark  p-2"
//                           style={{ width: "250px" }}
//                         >
//                           Remarks
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
//                               name={`amountBeforeGst-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>
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
//                               type="file"
//                               name={`gstAmount-${index}`}
//                               className="form-control payroll-table-body payroll-input-border text-end"
//                               required
//                             />
//                           </td>

//                           <td className="text-end align-content-center border border-dark p-2">
//                             <input
//                               type="text"
//                               name={`invoiceAmount-${index}`}
//                               className="form-control payroll-table-body fianance-input-border text-end"
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
//                     Save & Published
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

// export default UpdateHomework;

import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import getAPI from "../../../../../../api/getAPI";
import putAPI from "../../../../../../api/putAPI";
import { toast } from "react-toastify";

const UpdateHomework = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Homework data passed from previous page
  const homeworkData = location.state?.record;
  console.log("homeworkdata", homeworkData);
  
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [rows, setRows] = useState([]);
  const [subjects, setSubjects] = useState([]);
   const[parentId, setParentID] = useState("");
  // ✅ Fetch subjects on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getAPI(
          `/get-class-subjects?schoolId=${homeworkData.schoolId}&academicYear=${homeworkData.academicYear}&className=${homeworkData.className}&sectionName=${homeworkData.sectionName}`
        );
        if (!res.data.hasError) {
          setSubjects(
            res.data.data[0]?.subjects.map((s) => ({
              value: s._id,
              label: s.subjectName,
            })) || []
          );
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast.error("Failed to load subjects");
      }
    };

    fetchSubjects();
  }, []);

  // ✅ Populate initial data
  useEffect(() => {
    if (!homeworkData) {
      toast.error("No homework data found");
      navigate(-1);
      return;
    }

    setClassName(homeworkData.className || "");
    setSectionName(homeworkData.sectionName || "");
    setParentID(homeworkData._id || "")
    setRows(
      homeworkData.homeworkRows?.map((row) => ({
        ...row,
        file: null, // New file (if user selects)
      })) || []
    );
  }, [homeworkData, navigate]);

  // ✅ Handle row updates
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
  };

  // ✅ Add new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        subjectId: "",
        shortDescription: "",
        remarks: "",
        file: null,
        fileUrl: "",
      },
    ]);
  };

  // ✅ Remove a row
  const removeRow = (index) => {
    if (rows.length > 1) {
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
    }
  };

  // ✅ Handle submit (PUT API)
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = new FormData();

  //     formData.append("className", className);
  //     formData.append("sectionName", sectionName);

  //     // Append rows data
  //     rows.forEach((row, i) => {
  //       formData.append(`rows[${i}][subjectId]`, row.subjectId);
  //       formData.append(`rows[${i}][shortDescription]`, row.shortDescription);
  //       formData.append(`rows[${i}][remarks]`, row.remarks);
  //       if (row.file) {
  //         formData.append(`rows[${i}][file]`, row.file);
  //       } else if (row.fileUrl) {
  //         formData.append(`rows[${i}][fileUrl]`, row.fileUrl);
  //       }
  //     });

  //     await putAPI(`/update-homework/${homeworkData._id}`, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     toast.success("Homework updated successfully!");
  //     navigate(-1);
  //   } catch (error) {
  //     console.error("Error updating homework:", error);
  //     toast.error("Failed to update homework");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("parentid", parentId);
      const formData = new FormData();
      formData.append("rows", JSON.stringify(rows));
      
      
      rows.forEach((row) => {
        if (row.file instanceof File) {
          formData.append("file", row.file);
        }
      });

      const res = await putAPI(`/update-homework/${parentId}`, formData,  { "Content-Type": "multipart/form-data" },
       true);
      
      if (res.data.success) {
        toast.success("Homework updated successfully");
        navigate(-1);
      } else {
        toast.error(res.message || "Failed to update homework");
      }
    } catch (error) {
      console.error("Update homework error:", error);
      toast.error("Something went wrong while updating homework");
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
                    Update Homework
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
                {/* Class & Section - Readonly */}
                <div className="row mt-3">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Class <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={className}
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Section <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={sectionName}
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Homework Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={homeworkData.homeworkDate}
                        className="form-control"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Homework Rows Table */}
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
                          File
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
                        <tr key={index} className="payroll-table-body">
                          <td className="text-center border border-dark p-2">
                            <CreatableSelect
                              value={
                                subjects.find(
                                  (s) => s.value === row.subjectId
                                ) || null
                              }
                              onChange={(selected) =>
                                handleRowChange(
                                  index,
                                  "subjectId",
                                  selected?.value || ""
                                )
                              }
                              options={subjects}
                              placeholder="Select Subject"
                              className="basic-single"
                            />
                          </td>
                          <td className="text-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control"
                              value={row.shortDescription || ""}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "shortDescription",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </td>
                          <td className="text-center border border-dark p-2">
                            {row.fileUrl && !row.file ? (
                              <div className="mb-2">
                                <small>{row.fileUrl.split("/").pop()}</small>
                              </div>
                            ) : null}
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
                          <td className="text-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control"
                              value={row.remarks || ""}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "remarks",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td className="text-center border border-dark p-2">
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
                    Update Homework
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

export default UpdateHomework;

