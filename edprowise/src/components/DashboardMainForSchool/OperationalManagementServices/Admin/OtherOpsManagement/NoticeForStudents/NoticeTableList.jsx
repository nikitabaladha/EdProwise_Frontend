// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import getAPI from "../../../../../../api/getAPI";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../../ConfirmationDialog";
// import { FiDownload } from "react-icons/fi";

// const NoticeTableList = () => {
//     const navigate = useNavigate();
//       const [loading, setLoading] = useState(false);
//       const [schoolId, setSchoolId] = useState("");
//       const [records, setRecords] = useState([]);
//       const [academicYear, setAcademicYear] = useState(
//         localStorage.getItem("selectedAcademicYear") || ""
//       );
    
//       const [noticeDate, setNoticesDate] = useState(
//         new Date().toISOString().split("T")[0]
//       );
    
//       const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//       const [selectedRecord, setSelectedRecord] = useState(null);
    
//       useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//         const id = userDetails?.schoolId;
//         if (!id) {
//           toast.error("School ID not found. Please log in again.");
//           return;
//         }
//         setSchoolId(id);
//       }, []);
    
//         const navigateToAdd = (event) => {
//           event.preventDefault();
//           navigate(
//             `/school-dashboard/operational-service/other-management/notice/add-notice`,
//             { state: { schoolId, academicYear } }
//           );
//         };
    
    
//         const navigateToView = (event) => {
//           event.preventDefault();
//           navigate(
//             `/school-dashboard/operational-service/other-management/notice/view-notice`
//           );
//         };
    
//         const navigateToUpdate = (event) => {
//           event.preventDefault();
//           navigate(
//             `/school-dashboard/operational-service/other-management/notice/update-notice`
//           );
//         };
    
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">Notice</h4>
//                   <Link
//                     onClick={(event) => navigateToAdd(event)}
//                     className="btn btn-sm btn-primary"
//                   >
//                     Add Notice
//                   </Link>
//                 </div>
//               </div>

//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-hover table-centered text-center">
//                   <thead className="bg-light-subtle">
//                     <tr className="payroll-table-header">
//                       <th className="">
//                         <div className="form-check ms-1">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             id="customCheck1"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="customCheck1"
//                           />
//                         </div>
//                       </th>
//                       <th className="text-nowrap">Date</th>
//                       <th className="text-nowrap">Subject</th>
//                       <th className="text-nowrap">Short Desription</th>
//                       <th className="text-nowrap">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="">
//                         <div className="form-check ms-1">
//                           <input type="checkbox" className="form-check-input" />
//                         </div>
//                       </td>
//                       <td>20-08-2025</td>
//                       <td>Exam Update</td>
//                       <td>Exam time was change</td>
//                       <td className="text-center">
//                         <div className="d-flex gap-2 justify-content-center">
//                           <Link
//                             className="btn btn-light btn-sm"
//                             onClick={(event) => navigateToView(event)}
//                           >
//                             <iconify-icon
//                               icon="solar:eye-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>
//                           <Link
//                             className="btn btn-soft-primary btn-sm"
//                             onClick={(event) => navigateToUpdate(event)}
//                           >
//                             <iconify-icon
//                               icon="solar:pen-2-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>
//                           <Link
//                             className="btn btn-soft-danger btn-sm"
//                             // onClick={() => openDeleteDialog()}
//                           >
//                             <iconify-icon
//                               icon="solar:trash-bin-minimalistic-2-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>
//                           <button className="btn btn-primary btn-sm">
//                             <FiDownload className="align-middle fs-18" />
//                           </button>{" "}
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NoticeTableList

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI";
import deleteAPI from "../../../../../../api/deleteAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
import { FiDownload } from "react-icons/fi";

const NoticeTableList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [records, setRecords] = useState([]);
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Fetch schoolId from localStorage
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  // Fetch notices whenever schoolId or academicYear changes
  useEffect(() => {
    if (schoolId && academicYear) fetchNotices();
  }, [schoolId, academicYear]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await getAPI(
        `/get-notices?schoolId=${schoolId}&academicYear=${academicYear}`
      );
      console.log(response,"get notices ");
      
      setRecords(response.data.notices || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch notices");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to Add
  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/other-management/notice/add-notice`,
      { state: { schoolId, academicYear } }
    );
  };

  // Navigate to View
  const navigateToView = (record) => {
    navigate(
      `/school-dashboard/operational-service/other-management/notice/view-notice`,
      { state: {  record } }
    );
  };

  // Navigate to Update
  const navigateToUpdate = (record) => {
    navigate(
      `/school-dashboard/operational-service/other-management/notice/update-notice`,
      { state: { record } }
    );
  };

  

  const openDeleteDialog = (record) => {
    setSelectedRecord(record);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedRecord(null);
  };
  const handleDeleteConfirmed = async () => {
    fetchNotices();
    handleDeleteCancel();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">Notice</h4>
                  <Link
                    onClick={(event) => navigateToAdd(event)}
                    className="btn btn-sm btn-primary"
                  >
                    Add Notice
                  </Link>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th>
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck1"
                          />
                        </div>
                      </th>
                      <th>Date</th>
                      <th>Title</th>
                      <th>Short Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : records.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No notices found
                        </td>
                      </tr>
                    ) : (
                      records.map((record) => (
                        <tr key={record._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </div>
                          </td>
                          <td>
                            {new Date(record.noticeDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td>{record.subject}</td>
                          <td>{record.shortDescription}</td>
                          <td className="text-center">
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-light btn-sm"
                                onClick={() => navigateToView(record)}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => navigateToUpdate(record)}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                              <button
                                className="btn btn-soft-danger btn-sm"
                                onClick={() => openDeleteDialog(record)}
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                              <a
                                href={record.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm"
                              >
                                <FiDownload className="align-middle fs-18" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {isDeleteDialogOpen && selectedRecord && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="studentNotices"
          id={selectedRecord._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default NoticeTableList;
