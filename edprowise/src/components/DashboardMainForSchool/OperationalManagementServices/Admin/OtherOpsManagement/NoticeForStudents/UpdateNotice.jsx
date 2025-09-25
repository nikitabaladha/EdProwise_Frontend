// import React, { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";

// const UpdateNotice = () => {
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
//                     Update Notice
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
//                     Update & Published
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

// export default UpdateNotice;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import putAPI from "../../../../../../api/putAPI";

const UpdateNotice = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const noticeData = location.state?.record;
  console.log(noticeData, "noticeData");

  const [schoolId, setSchoolId] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [noticeDate, setNoticeDate] = useState("");
  const [file, setFile] = useState(null);
  const [existingFileUrl, setExistingFileUrl] = useState("");

  useEffect(() => {
    if (!noticeData) {
      toast.error("No notice data found");
      navigate(-1);
      return;
    }

    setSchoolId(noticeData.schoolId || "");
    setAcademicYear(noticeData.academicYear || "");
    setTitle(noticeData.subject || "");
    setShortDescription(noticeData.shortDescription || "");
    setNoticeDate(
      noticeData.noticeDate
        ? new Date(noticeData.noticeDate).toISOString().split("T")[0]
        : ""
    );
    setExistingFileUrl(noticeData.fileUrl || "");
  }, [noticeData, navigate]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter notice title");
      return;
    }
    if (!noticeDate) {
      toast.error("Please select notice date");
      return;
    }
    if (!shortDescription.trim()) {
      toast.error("Please enter short description");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("schoolId", schoolId);
      formData.append("academicYear", academicYear);
      formData.append("subject", title);
      formData.append("noticeDate", noticeDate);
      formData.append("shortDescription", shortDescription);

      if (file) {
        formData.append("file", file);
      }

      const response = await putAPI(
        `/update-notice/${noticeData._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
        true
      );
        console.log(response,"update response");

      if (!response?.data?.hasError) {
        toast.success("Notice updated successfully");
        navigate(-1);
      } else {
        toast.error(response?.data?.message || "Failed to update notice");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating notice");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-1">
                <h4 className="payroll-title text-center mb-0 flex-grow-1">
                  Update Notice
                </h4>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>

              <form className="mt-3" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Notice Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={noticeDate}
                        onChange={(e) => setNoticeDate(e.target.value)}
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
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Upload File {existingFileUrl && "(Leave blank to keep old)"}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  />
                  {existingFileUrl && !file && (
                    <div className="mt-2">
                      <small className="text-muted">
                        Current File:{" "}
                        <a
                          href={`${process.env.REACT_APP_API_URL_FOR_IMAGE}/${existingFileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {existingFileUrl.split("/").pop()}
                        </a>
                      </small>
                    </div>
                  )}
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Update Notice
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

export default UpdateNotice;
