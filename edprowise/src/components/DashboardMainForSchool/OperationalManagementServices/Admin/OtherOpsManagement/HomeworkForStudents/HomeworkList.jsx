// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import getAPI from "../../../../../../api/getAPI";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../../ConfirmationDialog";
// import { FiDownload } from "react-icons/fi";
// import CreatableSelect from "react-select/creatable";

// const HomeworkList = () => {
// const navigate = useNavigate();
// const [loading, setLoading] = useState(false);
// const [schoolId, setSchoolId] = useState("");
// const [records, setRecords] = useState([]);
// const [academicYear, setAcademicYear] = useState(
//   localStorage.getItem("selectedAcademicYear") || ""
// );
// const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
// const [selectedRecord, setSelectedRecord] = useState(null);
// const [classes, setClasses] = useState([]);
// const [sections, setSections] = useState([]);
// const [selectedClass, setSelectedClass] = useState(null);
// const [selectedSection, setSelectedSection] = useState(null);

// useEffect(() => {
//   const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//   const id = userDetails?.schoolId;
//   if (!id) {
//     toast.error("School ID not found. Please log in again.");
//     return;
//   }
//   setSchoolId(id);
// }, []);

// useEffect(() => {
//   if (!schoolId || !academicYear) return;
//   fetchData();
  
// }, [schoolId, academicYear]);


// useEffect(() => {
//   if (schoolId && academicYear) {
//     fetchData();
//   }
// }, [schoolId, academicYear, homeworkDate]);

// const fetchData = async () => {
//   setLoading(true);
 
// };


//   const navigateToAdd = (event) => {
//     event.preventDefault();
//     navigate(
//       `/school-dashboard/operational-service/other-management/homework/assign-homework`,
//       { state: { schoolId, academicYear } }
//     );
//   };

//   const navigateToView = (event) => {
//     event.preventDefault();
//     navigate(
//       `/school-dashboard/operational-service/other-management/homework/view-homework`
//     );
//   };

//   const navigateToUpdate = (event) => {
//     event.preventDefault();
//     navigate(
//       `/school-dashboard/operational-service/other-management/homework/update-homework`
//     );
//   };

//   return (
//     <div className="container-fluid">
//       <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
//         <Link
//           onClick={(event) => navigateToAdd(event)}
//           className="btn btn-sm btn-primary"
//         >
//           Add Homework
//         </Link>
//       </div>
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Homework for Students
//                   </h4>
//                   <input
//                     type="date"
//                     className="form-control form-select-sm me-2 w-auto"
//                     required
//                     // value={attendanceDate}
//                     // onChange={(e) => setAttendanceDate(e.target.value)}
//                   />
                  
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
//                       <td>20-08-2025</td>
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

// export default HomeworkList;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
import { FiDownload } from "react-icons/fi";

const HomeworkList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [records, setRecords] = useState([]);
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );

  const [homeworkDate, setHomeworkDate] = useState(
    new Date().toISOString().split("T")[0]
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

  useEffect(() => {
    if (schoolId && academicYear && homeworkDate) {
      fetchData();
    }
  }, [schoolId, academicYear, homeworkDate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-homework?schoolId=${schoolId}&academicYear=${academicYear}&homeworkDate=${homeworkDate}`
      );
console.log("get homework",res);

      if (!res.hasError) {
        setRecords(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch homework.");
        setRecords([]);
      }
    } catch (error) {
      console.error("Error fetching homework:", error);
      toast.error("Server error while fetching homework.");
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/other-management/homework/assign-homework`,
      { state: { schoolId, academicYear } }
    );
  };

  const navigateToView = (record) => {
    navigate(
      `/school-dashboard/operational-service/other-management/homework/view-homework`,
      { state: { record } }
    );
  };

  const navigateToUpdate = (record) => {
    navigate(
      `/school-dashboard/operational-service/other-management/homework/update-homework`,
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
        <Link onClick={navigateToAdd} className="btn btn-sm btn-primary">
          Add Homework
        </Link>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Homework for Students
                  </h4>
                  <input
                    type="date"
                    className="form-control form-select-sm me-2 w-auto"
                    required
                    value={homeworkDate}
                    onChange={(e) => setHomeworkDate(e.target.value)}
                  />
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
                      <th>Class</th>
                      <th>Section</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5">Loading...</td>
                      </tr>
                    ) : records.length === 0 ? (
                      <tr>
                        <td colSpan="5">No homework found for this date.</td>
                      </tr>
                    ) : (
                      // records.map((doc) =>
                      records.map((row) => (
                        <tr key={row._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </div>
                          </td>
                          <td>
                            {new Date(row.homeworkDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td>{row.className}</td>
                          <td>{row.sectionName}</td>
                          <td className="text-center">
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-light btn-sm"
                                onClick={() => navigateToView(row)}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={() => navigateToUpdate(row)}
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                              <button
                                className="btn btn-soft-danger btn-sm"
                                onClick={() => openDeleteDialog(row)}
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                              {row.fileUrl && (
                                <a
                                  href={row.fileUrl}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-primary btn-sm"
                                >
                                  <FiDownload className="align-middle fs-18" />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                      // )
                    )}
                  </tbody>
                </table>
              </div>

              {/* <ConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={() => {
                  // TODO: call delete API here
                }}
                message="Are you sure you want to delete this homework?"
              /> */}
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && selectedRecord && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="assignHomework"
          id={selectedRecord._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default HomeworkList;
