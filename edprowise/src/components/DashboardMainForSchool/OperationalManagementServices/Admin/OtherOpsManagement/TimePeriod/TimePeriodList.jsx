// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import getAPI from "../../../../../../api/getAPI";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../../ConfirmationDialog";
// import { FiDownload } from "react-icons/fi";
// const TimePeriodList = () => {
//   const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [schoolId, setSchoolId] = useState("");
//     const [records, setRecords] = useState([]);
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//     const [selectedRecord, setSelectedRecord] = useState(null);
//     const [academicYear, setAcademicYear] = useState(
//       localStorage.getItem("selectedAcademicYear") || ""
//     );
//     useEffect(() => {
//       const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//       const id = userDetails?.schoolId;
//       if (!id) {
//         toast.error("School ID not found. Please log in again.");
//         return;
//       }
//       setSchoolId(id);
//     }, []);

// const navigateToAdd = (event) => {
//   event.preventDefault();
//   navigate(
//     `/school-dashboard/operational-service/other-management/time-period/add-time-period`,
//     {
//       state: {
//         schoolId,
//         academicYear,
//       },
//     }
//   );
// };

//   const navigateToView = (event) => {
//     event.preventDefault();
//     navigate(
//       `/school-dashboard/operational-service/other-management/time-period/view-time-period`
//     );
//   };

//   const navigateToUpdate = (event) => {
//     event.preventDefault();
//     navigate(
//       `/school-dashboard/operational-service/other-management/time-period/update-time-period`
//     );
//   };

//   return (
//     <div className="container-fluid">
//       <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
//         <Link
//           onClick={(event) => navigateToAdd(event)}
//           className="btn btn-sm btn-primary"
//         >
//           Add Time Period
//         </Link>
//       </div>
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Time Period
//                   </h4>
//                   <select className="form-select form-select-sm me-2 w-auto">
//                     <option disabled>Select Academic Year</option>
//                     <option value="2025-26">2025-26 </option>
//                     <option value="2026-27">2026-27 </option>
//                   </select>
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
//                       <th className="text-nowrap">Class</th>
//                       <th className="text-nowrap">Section</th>
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
//                       <td>1</td>
//                       <td>A</td>
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
// };

// export default TimePeriodList;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";
import { FiDownload } from "react-icons/fi";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
const TimePeriodList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [records, setRecords] = useState([]);
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  // 🔹 Fetch timetable
  useEffect(() => {
    if (!schoolId || !academicYear) return;
    fetchData();
  }, [schoolId, academicYear]);

   const fetchData = async () => {
     setLoading(true);
     try {
       const res = await getAPI(`/get-time-period/${schoolId}/${academicYear}`);
       console.log("response fo time period", res);

       if (!res.data.hasError) {
         setRecords(res.data.data || []);
       } else {
         toast.error(res.data.message || "Failed to fetch records");
       }
     } catch (err) {
       console.error("error", err);
       toast.error(
         err.response.data.message ||
           "Something went wrong while fetching time periods"
       );
     } finally {
       setLoading(false);
     }
   };

  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/other-management/time-period/add-time-period`,
      { state: { schoolId, academicYear } }
    );
  };

  const navigateToView = (record) => {
    navigate(
      `/school-dashboard/operational-service/other-management/time-period/view-time-period`,
      { state: { record } }
    );
  };

  const navigateToUpdate = (record) => {
    navigate(
      `/school-dashboard/operational-service/other-management/time-period/update-time-period`,
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
     fetchData();
     handleDeleteCancel();
   };


  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link
          onClick={(event) => navigateToAdd(event)}
          className="btn btn-sm btn-primary"
        >
          Add Time Period
        </Link>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header d-flex flex-wrap align-items-center">
                <h4 className="card-title flex-grow-1 text-center">
                  Time Period
                </h4>
                <select
                  className="form-select form-select-sm me-2 w-auto"
                  value={academicYear}
                  onChange={(e) => {
                    setAcademicYear(e.target.value);
                    
                  }}
                >
                  <option disabled>Select Academic Year</option>
                  <option value="2025-2026">2025-26 </option>
                  <option value="2026-2027">2026-27 </option>
                </select>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </th>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4">Loading...</td>
                      </tr>
                    ) : records.length === 0 ? (
                      <tr>
                        <td colSpan="4">No records found</td>
                      </tr>
                    ) : (
                      records.map((rec) => (
                        <tr key={rec._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </div>
                          </td>
                          <td>{rec.className}</td>
                          <td>{rec.sectionName}</td>
                          <td className="text-center">
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-light btn-sm"
                                onClick={() => navigateToView(rec)}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => navigateToUpdate(rec)}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                              <button
                                className="btn btn-soft-danger btn-sm"
                                onClick={() => openDeleteDialog(rec)}
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                              <button className="btn btn-primary btn-sm">
                                <FiDownload className="align-middle fs-18" />
                              </button>
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
      {isDeleteDialogOpen && selectedRecord && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="timeTable"
          id={selectedRecord._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default TimePeriodList;
