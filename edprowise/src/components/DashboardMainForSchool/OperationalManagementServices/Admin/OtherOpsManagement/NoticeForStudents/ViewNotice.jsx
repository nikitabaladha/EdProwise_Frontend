// import React, { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";

// const ViewNotice = () => {
//   const navigate = useNavigate();

//   const [rows, setRows] = useState([{}, {}, {}]);

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
//                     View Notice
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
//                 {/* <div className="row mt-3">
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
//                 </div> */}

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
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, index) => (
//                         <tr key={index} className="payroll-table-body">
//                           <td className="text-start align-content-center border border-dark p-2"></td>
//                           <td className="text-start align-content-center border border-dark p-2"></td>
//                           <td className="text-end align-content-center border border-dark p-2"></td>

//                           <td className="text-center align-content-center border border-dark p-2"></td>
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

// export default ViewNotice;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ViewNotice = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const noticeData = location.state?.record;
  console.log(noticeData, "noticeData");

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [noticeDate, setNoticeDate] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);

  useEffect(() => {
    if (!noticeData) {
      toast.error("No notice data found");
      return;
    }

    setTitle(noticeData.subject || "");
    setShortDescription(noticeData.shortDescription || "");
    setNoticeDate(
      noticeData.noticeDate ? new Date(noticeData.noticeDate) : null
    );
  }, [noticeData]);

  const handleDocumentPreview = (fileUrl) => {
    if (fileUrl) {
      let formattedPath = fileUrl.replace(/\\/g, "/");
      if (formattedPath.startsWith("/")) {
        formattedPath = formattedPath.substring(1);
      }
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
                    View Notice
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
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">
                      Notice Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">
                      Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        noticeDate
                          ? noticeDate.toLocaleDateString("en-GB", {
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

              <div className="mb-3">
                <label className="form-label">
                  Short Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={shortDescription}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Attached File</label>
                <div className="d-flex align-items-center gap-3">
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => handleDocumentPreview(noticeData.fileUrl)}
                    disabled={!noticeData.fileUrl}
                    title={
                      noticeData.fileUrl ? "View Uploaded File" : "No File"
                    }
                  >
                    <iconify-icon
                      icon="solar:eye-broken"
                      className="align-middle fs-18"
                    />
                  </button>
                  <small>{getFileName(noticeData.fileUrl)}</small>
                </div>
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
                {/\.(pdf|png|jpg|jpeg|gif)$/i.test(previewDocument) ? (
                  previewDocument.toLowerCase().endsWith(".pdf") ? (
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
                  )
                ) : (
                  <div className="text-center">
                    <p>Preview not supported for this file type.</p>
                    <a
                      href={previewDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Download File
                    </a>
                  </div>
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

export default ViewNotice;
