// import React, {useState, useEffect} from 'react'
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import getAPI from "../../../../../../api/getAPI";
// import ConfirmationDialog from "../../../../../ConfirmationDialog";
// import CreatableSelect from "react-select/creatable";

// const QuestionPaperSetList = () => {
//     const navigate = useNavigate();
//     const [schoolId, setSchoolId] = useState("");
//     const [academicYear, setAcademicYear] = useState(
//       localStorage.getItem("selectedAcademicYear") || ""
//     );
//     const [loading, setLoading] = useState(false);
//     const [records, setRecords] = useState([]);
//     const [classes, setClasses] = useState([]);
//     const [selectedClass, setSelectedClass] = useState(null);
  
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//     const [selectedRecord, setSelectedRecord] = useState(null);
//     const [result, setResult] = useState("");

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//         const id = userDetails?.schoolId;
//         if (!id) {
//           toast.error("School ID not found. Please log in again.");
//           return;
//         }
//         setSchoolId(id);
//       }, []);
    
//       useEffect(() => {
//         if (schoolId && academicYear) {
//           fetchClasses();
//         }
//       }, [schoolId, academicYear]);

//     const fetchClasses = async () => {
//       try {
//         setLoading(true);
//         const res = await getAPI(
//           `/get-class-and-section-by-year/${schoolId}/${academicYear}`
//         );
//         if (!res.data.hasError) {
//           const classOptions = res.data.data.map((classItem) => ({
//             value: classItem.className,
//             label: classItem.className,
//             // sections: classItem.sections,
//           }));
//           setClasses(classOptions);
//         } else {
//           toast.error("Failed to fetch classes");
//         }
//       } catch (error) {
//         toast.error("Error fetching classes");
//         console.error("Error fetching classes:", error);
//       } finally {
//         setLoading(false);
//       }
//     };


//     const navigateToAdd = (event) => {
//       event.preventDefault();
//       navigate(
//         `/school-dashboard/operational-service/entrance-management/question-set-list/add-question-set`,
//         { state: { schoolId, academicYear } }
//       );
//     };

//     const navigateToView = (event) => {
//       event.preventDefault();
//       navigate(
//         `/school-dashboard/operational-service/entrance-management/question-set-list/view-question-set`
//       );
//     };

//     const navigateToUpdate = (event) => {
//       event.preventDefault();
//       navigate(
//         `/school-dashboard/operational-service/entrance-management/question-set-list/update-question-set`
//       );
//     };

//   return (
//     <div className="container-fluid">
//       <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
//         <Link
//           onClick={(event) => navigateToAdd(event)}
//           className="btn btn-sm btn-primary"
//         >
//           Add Set
//         </Link>
//       </div>
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Question Set Records
//                   </h4>
//                   <select
//                     className="form-select form-select-sm me-2 w-auto"
//                     value={academicYear}
//                     onChange={(e) => {
//                       setAcademicYear(e.target.value);
//                     }}
//                   >
//                     <option disabled>Select Academic Year</option>
//                     <option value="2025-2026">2025-2026 </option>
//                     <option value="2026-2027">2026-2027 </option>
//                   </select>
//                   <CreatableSelect
//                     isClearable
//                     name="class"
//                     options={classes}
//                     placeholder="Select Class"
//                     className="email-select me-2 form-select-sm text-nowrap"
//                     value={selectedClass}
//                     onChange={(option) => {
//                       setSelectedClass(option);
//                     }}
//                     isLoading={loading}
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
//                       <th className="text-nowrap">Academic Year</th>
//                       <th className="text-nowrap">Class</th>
//                       {/* <th className="text-nowrap">Section</th> */}
//                       <th className="text-nowrap">Subject</th>
//                       <th className="text-nowrap">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="">
//                         <div className="form-check ms-1">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             // id={`check-${index}`}
//                           />
//                         </div>
//                       </td>
//                       <td>2025-2026</td>
//                       <td>1</td>
//                       {/* <td>A</td> */}
//                       <td>Math</td>
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
//                           <Link className="btn btn-soft-danger btn-sm">
//                             <iconify-icon
//                               icon="solar:trash-bin-minimalistic-2-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>
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

// export default QuestionPaperSetList

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import CreatableSelect from "react-select/creatable";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
const QuestionPaperSetList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
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

  // Fetch classes for dropdown
  useEffect(() => {
    if (schoolId && academicYear) fetchClasses();
  }, [schoolId, academicYear]);

  // Fetch question sets whenever schoolId, academicYear, or selectedClass changes
  useEffect(() => {
    if (schoolId && academicYear) fetchQuestionSets();
  }, [schoolId, academicYear, selectedClass]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-class-and-section-by-year/${schoolId}/${academicYear}`
      );

      if (!res.data.hasError) {
        const classOptions = res.data.data.map((classItem) => ({
          value: classItem._id,
          label: classItem.className,
        }));
        setClasses(classOptions);
      } else {
        toast.error("Failed to fetch classes");
      }
    } catch (error) {
      toast.error("Error fetching classes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionSets = async () => {
    try {
      setLoading(true);
      let query = `?schoolId=${schoolId}&academicYear=${academicYear}`;
      if (selectedClass) query += `&classId=${selectedClass.value}`;

      const res = await getAPI(`/get-question-all-set${query}`, true);
      console.log("get question set",res);
      
      if (!res.data.hasError) {
        setRecords(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch question sets");
        setRecords([]);
      }
    } catch (error) {
      toast.error("Error fetching question sets");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
     fetchQuestionSets();
     handleDeleteCancel();
   };
  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/entrance-management/question-set-list/add-question-set`,
      { state: { schoolId, academicYear } }
    );
  };

  const navigateToView = (event, record) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/entrance-management/question-set-list/view-question-set`,
      { state: { record } }
    );
  };

  const navigateToUpdate = (event, record) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/entrance-management/question-set-list/update-question-set`,
      { state: { record } }
    );
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link onClick={navigateToAdd} className="btn btn-sm btn-primary">
          Add Set
        </Link>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Question Set Records
                  </h4>

                  <select
                    className="form-select form-select-sm me-2 w-auto"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                  >
                    <option disabled>Select Academic Year</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2026-2027">2026-2027</option>
                  </select>

                  <CreatableSelect
                    isClearable
                    name="class"
                    options={classes}
                    placeholder="Select Class"
                    className="email-select me-2 form-select-sm text-nowrap"
                    value={selectedClass}
                    onChange={(option) => setSelectedClass(option)}
                    isLoading={loading}
                  />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </th>
                      <th>Academic Year</th>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {records.length === 0 && (
                      <tr>
                        <td colSpan={5}>No records found.</td>
                      </tr>
                    )}
                    {records.map((record) => (
                      <tr key={record._id}>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                          </div>
                        </td>
                        <td>{record.academicYear}</td>
                        <td>{record.className}</td>
                        <td>{record.subjectName}</td>
                        <td className="text-center">
                          <div className="d-flex gap-2 justify-content-center">
                            <Link
                              className="btn btn-light btn-sm"
                              onClick={(e) => navigateToView(e, record)}
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                            <Link
                              className="btn btn-soft-primary btn-sm"
                              onClick={(e) => navigateToUpdate(e, record)}
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                            <Link
                              className="btn btn-soft-danger btn-sm"
                              onClick={() => openDeleteDialog(record)}
                            >
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
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
          deleteType="questionSet"
          id={selectedRecord._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default QuestionPaperSetList;
