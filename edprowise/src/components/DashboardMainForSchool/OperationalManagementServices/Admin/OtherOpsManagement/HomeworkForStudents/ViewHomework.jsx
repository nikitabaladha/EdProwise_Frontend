// import React, { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";

// const ViewHomework = () => {
//   const navigate = useNavigate();

//   const [rows, setRows] = useState([{},{},{},{}]);


//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-1">
//                   <h4 className=" payroll-title text-center mb-0 flex-grow-1">
//                     View Homework
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
//                       <input type="text" className="form-control" required />
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
//                       <input type="text" className="form-control" required />
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
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewHomework;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const ViewHomework = () => {
 const navigate = useNavigate();
 const location = useLocation();

 const homeworkData = location.state?.record;
 console.log(homeworkData, "homework");

 const [rows, setRows] = useState([]);
 const [className, setClassName] = useState("");
 const [sectionName, setSectionName] = useState("");
 const [homeworkDate, setHomeworkDate] = useState(null);
 const [previewDocument, setPreviewDocument] = useState(null);

 useEffect(() => {
   if (!homeworkData) {
     toast.error("No homework data found");
     return;
   }

   // ✅ Always update state when homeworkData changes
   setRows(homeworkData.homeworkRows || []);
   setClassName(homeworkData.className || "");
   setSectionName(homeworkData.sectionName || "");
   setHomeworkDate(
     homeworkData.homeworkDate ? new Date(homeworkData.homeworkDate) : null
   );
 }, [homeworkData]);

  const handleDocumentPreview = (fileUrl) => {
    if (fileUrl) {
      let formattedPath = fileUrl.replace(/\\/g, "/");

      // ✅ Remove leading slash to avoid double slashes in final URL
      if (formattedPath.startsWith("/")) {
        formattedPath = formattedPath.substring(1);
      }

      // ✅ Always prepend API URL
      formattedPath = `${process.env.REACT_APP_API_URL_FOR_IMAGE}/${formattedPath}`;

      console.log("Previewing file:", formattedPath);
      setPreviewDocument(formattedPath);
    } else {
      toast.error("No file available for preview");
    }
  };


  const getFileName = (fileUrl) => {
    if (fileUrl) {
      const cleanPath = fileUrl.replace(/\\/g, "/");
      const fullName = cleanPath.split("/").pop() || "Document";
      return fullName.length > 25 ? fullName.slice(0, 25) + "..." : fullName;
    }
    return "No file";
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
                    View Homework
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

              <div className="row mt-3">
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">
                      Class <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={className}
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
                      className="form-control"
                      value={sectionName}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label className="form-label">
                      Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        homeworkDate
                          ? homeworkDate.toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : ""
                      }
                      readOnly
                    />
                  </div>
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
                        File
                      </th>
                      <th className="text-center border border-dark p-2">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length > 0 ? (
                      rows.map((row, index) => (
                        <tr key={index} className="payroll-table-body">
                          <td className="text-center align-content-center border border-dark p-2">
                            {row.subjectName || "-"}
                          </td>
                          <td className="text-center  border border-dark p-2">
                            {row.shortDescription || "-"}
                          </td>
                          <td className="text-center border border-dark p-2">
                            <button
                              type="button"
                              className="btn btn-light btn-sm"
                              onClick={() => handleDocumentPreview(row.fileUrl)}
                              disabled={!row.fileUrl}
                              title={
                                row.fileUrl ? "View Uploaded File" : "No File"
                              }
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                            <div className="mt-1">
                              <small>{getFileName(row.fileUrl)}</small>
                              {/* <small>{row.fileUrl}</small> */}
                            </div>
                          </td>
                          <td className="text-center border border-dark p-2">
                            {row.remarks || "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No homework found for this date.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {previewDocument && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">File Preview</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setPreviewDocument(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {previewDocument.toLowerCase().endsWith(".pdf") ? (
                  <iframe
                    src={`${previewDocument}#toolbar=0`}
                    style={{ width: "100%", height: "500px", border: "none" }}
                    title="File Preview"
                  ></iframe>
                ) : (
                  <img
                    src={previewDocument}
                    alt="File Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "500px",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                    onError={() => {
                      toast.error("Failed to load file");
                      setPreviewDocument(null);
                    }}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setPreviewDocument(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewHomework;
