// import React, { useState, useEffect } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useLocation, useNavigate } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";
// import postAPI from "../../../../../../api/postAPI";
// import getAPI from "../../../../../../api/getAPI";
// import { toast } from "react-toastify";

// const AddNotice = () => {
//   const navigate = useNavigate();
//     const location = useLocation();
//     const { schoolId, academicYear } = location.state || {};
//     const [loading, setLoading] = useState(false);

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
//                     Add Notice
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
//                           Date
//                         </th>
//                         <th
//                           className="text-center  align-content-center border border-dark text-nowrap p-2"
//                           // style={{ width: "280px" }}
//                         >
//                           Notice Subject
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

// export default AddNotice;

import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import postAPI from "../../../../../../api/postAPI";
import { toast } from "react-toastify";

const AddNotice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId, academicYear } = location.state || {};
console.log(schoolId,"schoolID");
console.log(academicYear,"academicYear");


  const [rows, setRows] = useState([
    { noticeDate: "", title: "", shortDescription: "", file: null },
  ]);
  const [loading, setLoading] = useState(false);

  // Add / Remove rows
  const addRow = () => {
    setRows([
      ...rows,
      { noticeDate: "", title: "", shortDescription: "", file: null },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) setRows(rows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let row of rows) {
      if (!row.noticeDate || !row.title || !row.shortDescription || !row.file) {
        toast.error("Please fill all fields for all rows");
        return;
      }
    }

    try {
      setLoading(true);

      for (let row of rows) {
        const formData = new FormData();
        formData.append("schoolId", schoolId);
        formData.append("academicYear", academicYear);
        formData.append("noticeDate", row.noticeDate);
        formData.append("subject", row.title); 
        formData.append("shortDescription", row.shortDescription);
        formData.append("file", row.file);

        await postAPI("/add-notice", formData, {
          "Content-Type": "multipart/form-data",
        }, true);
      }

      toast.success("Notices added successfully");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("Error adding notices");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0 flex-grow-1">Add Notice</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="table-responsive pb-4">
                  <table className="table text-dark border border-dark mb-1">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center border border-dark p-2">
                          Notice Date
                        </th>
                        <th className="text-center border border-dark p-2">
                          Title
                        </th>
                        <th className="text-center border border-dark p-2">
                          Short Description
                        </th>
                        <th className="text-center border border-dark p-2">
                          Upload
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
                              type="date"
                              className="form-control"
                              value={row.noticeDate}
                              onChange={(e) =>
                                handleRowChange(
                                  index,
                                  "noticeDate",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </td>
                          <td className="border border-dark p-2">
                            <input
                              type="text"
                              className="form-control"
                              value={row.title}
                              onChange={(e) =>
                                handleRowChange(index, "title", e.target.value)
                              }
                              required
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
                              required
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
                              required
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
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save & Publish"}
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

export default AddNotice;
