// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import getAPI from "../../../../../api/getAPI";
// import postAPI from "../../../../../api/postAPI";
// import putAPI from "../../../../../api/putAPI";
// import deleteAPI from "../../../../../api/deleteAPI";

// const AnnualLeaveAdminSetting = () => {
//   const [annualLeaveType, setAnnualLeaveType] = useState([]);
//   const [schoolId, setSchoolId] = useState(null);
//   const [academicYear, setAcademicYear] = useState("2025-26");
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [deleteType, setDeleteType] = useState("");

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;
//     if (!id) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }
//     setSchoolId(id);
//     fetchData(id, academicYear);
//   }, [academicYear]);

//   const fetchData = async (schoolId, year) => {
//   try {
//     const res = await getAPI(`/getall-payroll-annual-leave/${schoolId}?academicYear=${year}`, {}, true);
//     console.log("get Response", res);

//     if (!res.hasError && Array.isArray(res.data?.data?.ctcComponent)) {
//       const formatted = res.data.data.ctcComponent.map((cat) => ({
//         id: cat._id,
//         name: cat.annualLeaveTypeName,
//         days: cat.days || 0,
//         isEditing: false,
//         isNew: false,
//       }));
//       setAnnualLeaveType(formatted);
//     } else {
//       toast.error(res.message || "No leave type found.");
//       setAnnualLeaveType([]);
//     }
//   } catch (error) {
//     toast.error("Failed to fetch leave type.");
//     console.error("Fetch error:", error);
//     setAnnualLeaveType([]);
//   }
// };


//   const handleAddRow = () => {
//     const newEntry = {
//       id: Date.now(), 
//       name: "",
//       days: "",
//       isEditing: true,
//       isNew: true,
//     };
//     setAnnualLeaveType((prev) => [...prev, newEntry]);
//   };

//   const handleEdit = (id) => {
//     setAnnualLeaveType((prev) =>
//       prev.map((comp) =>
//         comp.id === id ? { ...comp, isEditing: true } : { ...comp, isEditing: false }
//       )
//     );
//   };

//   const handleSave = async (id, name, days, isNew) => {
//     if (!name.trim()) {
//       toast.error("Leave type is required.");
//       return;
//     }
//     const parsedDays = Number(days);
//     if (isNaN(parsedDays) || parsedDays < 0) {
//       toast.error("Days must be a non-negative number.");
//       return;
//     }

//     const payload = {
//       annualLeaveTypeName: name,
//       days: parsedDays,
//       academicYear,
//       schoolId,
//     };

//     try {
//       if (isNew) {
//         console.log("Create payload", payload);
//         const res = await postAPI("/create-payroll-annual-leave", payload, {}, true);
//         console.log("Create response", res);
//         if (!res.hasError) {
//           toast.success("Leave type created successfully.");
//           fetchData(schoolId, academicYear);
//         } else {
//           toast.error(res.message || "Failed to create leave category.");
//         }
//       } else {
//         console.log("Update payload", payload);
//         const res = await putAPI(`/update-payroll-annual-leave/${id}`, payload, {}, true);
//         console.log("Update response", res);
//         if (!res.hasError) {
//           toast.success("Leave type updated successfully.");
//           fetchData(schoolId, academicYear);
//         } else {
//           toast.error(res.message || "Failed to update leave type.");
//         }
//       }
//     } catch (err) {
//       toast.error("Something went wrong while saving.");
//       console.error("Save error:", err);
//     }
//   };

//   const openDeleteDialog = (comp) => {
//     setSelectedCategory(comp);
//     setDeleteType("ctcComponents");
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedCategory(null);
//     setDeleteType("");
//   };

//   const handleDeleteConfirmed = async (id) => {

//   };

//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card m-2">
//               <div className="card-body custom-heading-padding">
//                 <div className="container">
//                   <div className="card-header border border-0 mb-2 d-flex align-items-center">
//                     <h4 className="card-title flex-grow-1 text-center">
//                       Annual Leave Update
//                     </h4>
//                     <div>
//                       <select
//                         id="yearSelect"
//                         className="custom-select border border-dark"
//                         aria-label="Select Year"
//                         value={academicYear}
//                         onChange={(e) => setAcademicYear(e.target.value)}
//                       >
//                         <option>2025-26</option>
//                         <option>2026-27</option>
//                         <option>2027-28</option>
//                         <option>2028-29</option>
//                         <option>2029-30</option>
//                       </select>
//                     </div>
//                     <button
//                       type="button"
//                       className="btn btn-primary ms-2"
//                       onClick={handleAddRow}
//                     >
//                       Add Row
//                     </button>
//                   </div>
//                 </div>

//                 <div className="table-responsive px-lg-7 px-md-5">
//                   <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
//                     <thead className="bg-light-subtle">
//                       <tr className="payroll-table-header">
//                         <th style={{ width: "50px" }}>
//                           <div className="form-check ms-1">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               id="customCheck1"
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor="customCheck1"
//                             />
//                           </div>
//                         </th>
//                         <th >Type of Leave</th>
//                         <th >Days</th>
//                         <th >Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {annualLeaveType.map((comp) => (
//                         <tr key={comp.id} className="payroll-table-body text-center">
//                           <td>
//                             <div className="form-check ms-1">
//                               <input type="checkbox" className="form-check-input" />
//                             </div>
//                           </td>
//                           <td>
//                             {comp.isEditing ? (
//                               <input
//                                 type="text"
//                                 className="form-control payroll-table-body payroll-input-border text-start"
//                                 value={comp.name}
//                                 onChange={(e) =>
//                                   setAnnualLeaveType((prev) =>
//                                     prev.map((item) =>
//                                       item.id === comp.id ? { ...item, name: e.target.value } : item
//                                     )
//                                   )
//                                 }
//                                 placeholder="Enter leave type"
//                               />
//                             ) : (
//                               comp.name
//                             )}
//                           </td>
//                           <td>
//                             {comp.isEditing ? (
//                               <input
//                                 type="number"
//                                 className="form-control payroll-table-body payroll-input-border text-end"
//                                 value={comp.days}
//                                 onChange={(e) =>
//                                   setAnnualLeaveType((prev) =>
//                                     prev.map((item) =>
//                                       item.id === comp.id ? { ...item, days: e.target.value } : item
//                                     )
//                                   )
//                                 }
//                                 placeholder="Enter days"
//                                 min="0"
//                                 step="1"
//                               />
//                             ) : (
//                               comp.days
//                             )}
//                           </td>
//                           <td>
//                             {comp.isEditing ? (
//                               <button
//                                 className="btn btn-success btn-sm"
//                                 onClick={() => handleSave(comp.id, comp.name, comp.days, comp.isNew)}
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <div className="d-flex justify-content-center gap-2">
//                                 <button
//                                   className="btn btn-soft-primary btn-sm"
//                                   onClick={() => handleEdit(comp.id)}
//                                 >
//                                   <iconify-icon
//                                     icon="solar:pen-2-broken"
//                                     className="align-middle fs-18"
//                                   />
//                                 </button>
//                                 <button
//                                   className="btn btn-soft-danger btn-sm"
//                                   onClick={() => openDeleteDialog(comp)}
//                                 >
//                                   <iconify-icon
//                                     icon="solar:trash-bin-minimalistic-2-broken"
//                                     className="align-middle fs-18"
//                                   />
//                                 </button>
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="card-footer border-top">
//                   <nav aria-label="Page navigation example">
//                     <ul className="pagination justify-content-end mb-0">
//                       <li className="page-item">
//                         <button className="page-link">Previous</button>
//                       </li>
//                       <li className="page-item">
//                         <button className="page-link pagination-button">1</button>
//                       </li>
//                       <li className="page-item">
//                         <button className="page-link">Next</button>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isDeleteDialogOpen && selectedCategory && (
//         <ConfirmationDialog
//           onClose={handleDeleteCancel}
//           deleteType={deleteType}
//           id={selectedCategory.id}
//           onDeleted={handleDeleteConfirmed}
//         />
//       )}
//     </>
//   );
// };

// export default AnnualLeaveAdminSetting;

// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import getAPI from "../../../../../api/getAPI";
// import postAPI from "../../../../../api/postAPI";
// import putAPI from "../../../../../api/putAPI";
// import deleteAPI from "../../../../../api/deleteAPI";

// const AnnualLeaveAdminSetting = () => {
//   const [annualLeaveType, setAnnualLeaveType] = useState([]);
//   const [schoolId, setSchoolId] = useState(null);
//   const [academicYear, setAcademicYear] = useState("");
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [deleteType, setDeleteType] = useState("");
//   const [academicYearList, setAcademicYearList] = useState([]);
//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;
//     const academicYear = localStorage.getItem("selectedAcademicYear");
//     if (!id) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }
//     setSchoolId(id);
//     setAcademicYear(academicYear);
//     fetchAcademicYears(id);
//     fetchData(id, academicYear);
//   }, []);

//   const fetchAcademicYears = async (schoolId) => {
//     try {
//       const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
//       setAcademicYearList(response.data.data || []);
//     } catch (err) {
//       toast.error('Failed to fetch academic years.');
//     }
//   };

//   const fetchData = async (schoolId, year) => {
//     try {
//       const res = await getAPI(`/getall-payroll-annual-leave/${schoolId}?academicYear=${year}`, {}, true);
//       console.log("get Response", res);

//       if (!res.hasError && Array.isArray(res.data?.data?.ctcComponent)) {
//         const formatted = res.data.data.ctcComponent.map((cat) => ({
//           id: cat._id,
//           name: cat.annualLeaveTypeName,
//           days: cat.days || 0,
//           isCarryForward: cat.isCarryForward || false,
//           isEditing: false,
//           isNew: false,
//         }));
//         setAnnualLeaveType(formatted);
//       } else {
//         toast.error(res.message || "No leave type found.");
//         setAnnualLeaveType([]);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch leave type.");
//       console.error("Fetch error:", error);
//       setAnnualLeaveType([]);
//     }
//   };


//   const handleAddRow = () => {
//     const newEntry = {
//       id: Date.now(),
//       name: "",
//       days: "",
//       isCarryForward: false,
//       isEditing: true,
//       isNew: true,
//     };
//     setAnnualLeaveType((prev) => [...prev, newEntry]);
//   };

//   const handleEdit = (id) => {
//     setAnnualLeaveType((prev) =>
//       prev.map((comp) =>
//         comp.id === id ? { ...comp, isEditing: true } : { ...comp, isEditing: false }
//       )
//     );
//   };

//   const handleToggle = (id, newStatus) => {
//     setAnnualLeaveType((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, isCarryForward: newStatus } : item
//       )
//     );
//   };


//   const handleSave = async (id, name, days, isCarryForward, isNew) => {
//     if (!name.trim()) {
//       toast.error("Leave type is required.");
//       return;
//     }
//     const parsedDays = Number(days);
//     if (isNaN(parsedDays) || parsedDays < 0) {
//       toast.error("Days must be a non-negative number.");
//       return;
//     }

//     const payload = {
//       annualLeaveTypeName: name,
//       days: parsedDays,
//       isCarryForward: isCarryForward || false,
//       academicYear,
//       schoolId,
//     };

//     try {
//       if (isNew) {
//         console.log("Create payload", payload);
//         const res = await postAPI("/create-payroll-annual-leave", payload, {}, true);
//         console.log("Create response", res);
//         if (!res.hasError) {
//           toast.success("Leave type created successfully.");
//           fetchData(schoolId, academicYear);
//         } else {
//           toast.error(res.message || "Failed to create leave category.");
//         }
//       } else {
//         console.log("Update payload", payload);
//         const res = await putAPI(`/update-payroll-annual-leave/${id}`, payload, {}, true);
//         console.log("Update response", res);
//         if (!res.hasError) {
//           toast.success("Leave type updated successfully.");
//           fetchData(schoolId, academicYear);
//         } else {
//           toast.error(res.message || "Failed to update leave type.");
//         }
//       }
//     } catch (err) {
//       toast.error("Something went wrong while saving.");
//       console.error("Save error:", err);
//     }
//   };

//   const openDeleteDialog = (comp) => {
//     setSelectedCategory(comp);
//     setDeleteType("ctcComponents");
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedCategory(null);
//     setDeleteType("");
//   };

//   const handleDeleteConfirmed = async (id) => {

//   };

//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card m-2">
//               <div className="card-body custom-heading-padding">
//                 <div className="container">
//                   <div className="card-header border border-0 mb-2 d-flex align-items-center">
//                     <h4 className="card-title flex-grow-1 text-center">
//                       Annual Leave Update
//                     </h4>
//                     <div>
//                       <select
//                         id="yearSelect"
//                         className="custom-select border border-dark"
//                         aria-label="Select Year"
//                         value={academicYear}
//                         onChange={(e) => setAcademicYear(e.target.value)}
//                       >
//                         <option value="">Select Year</option>
//                         {academicYearList.map((yearObj, index) => (
//                           <option key={index} value={yearObj.academicYear}>
//                             {yearObj.academicYear}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <button
//                       type="button"
//                       className="btn btn-primary ms-2"
//                       onClick={handleAddRow}
//                     >
//                       Add Row
//                     </button>
//                   </div>
//                 </div>

//                 <div className="table-responsive px-lg-7 px-md-5">
//                   <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
//                     <thead className="bg-light-subtle">
//                       <tr className="payroll-table-header">
//                         <th style={{ width: "50px" }}>
//                           <div className="form-check ms-1">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               id="customCheck1"
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor="customCheck1"
//                             />
//                           </div>
//                         </th>
//                         <th >Type of Leave</th>
//                         <th >Days</th>
//                         <th >Carry Forward</th>
//                         <th >Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {annualLeaveType.map((comp) => (
//                         <tr key={comp.id} className="payroll-table-body text-center">
//                           <td>
//                             <div className="form-check ms-1">
//                               <input type="checkbox" className="form-check-input" />
//                             </div>
//                           </td>
//                           <td>
//                             {comp.isEditing ? (
//                               <input
//                                 type="text"
//                                 className="form-control payroll-table-body payroll-input-border text-start"
//                                 value={comp.name}
//                                 onChange={(e) =>
//                                   setAnnualLeaveType((prev) =>
//                                     prev.map((item) =>
//                                       item.id === comp.id ? { ...item, name: e.target.value } : item
//                                     )
//                                   )
//                                 }
//                                 placeholder="Enter leave type"
//                               />
//                             ) : (
//                               comp.name
//                             )}
//                           </td>
//                           <td>
//                             {comp.isEditing ? (
//                               <input
//                                 type="number"
//                                 className="form-control payroll-table-body payroll-input-border text-end"
//                                 value={comp.days}
//                                 onChange={(e) =>
//                                   setAnnualLeaveType((prev) =>
//                                     prev.map((item) =>
//                                       item.id === comp.id ? { ...item, days: e.target.value } : item
//                                     )
//                                   )
//                                 }
//                                 placeholder="Enter days"
//                                 min="0"
//                                 step="1"
//                               />
//                             ) : (
//                               comp.days
//                             )}
//                           </td>
//                           <td>
//                             {comp.isEditing ? (
//                               <div className="form-check form-switch d-flex justify-content-center align-items-center gap-1">
//                                 <div
//                                   className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                   style={{ maxWidth: "fit-content" }}
//                                 >
//                                   <button
//                                     className={`btn ${comp.isCarryForward ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                     type="button"
//                                     style={{
//                                       backgroundColor: comp.isCarryForward ? 'white' : 'black',
//                                       borderColor: comp.isCarryForward ? 'black' : '',
//                                       color: comp.isCarryForward ? 'black' : 'white',
//                                       maxWidth: "fit-content",
//                                       transition: 'all 0.4s ease-in-out',
//                                       boxShadow: "none"
//                                     }}
//                                     onClick={() => handleToggle(comp.id, true)}
//                                   >
//                                     Active
//                                   </button>
//                                   <button
//                                     type="button"
//                                     className={`btn ${!comp.isCarryForward ? 'btn-primary' : 'btn-dark'} rounded-pill`}
//                                     style={{
//                                       backgroundColor: !comp.isCarryForward ? 'white' : 'black',
//                                       borderColor: !comp.isCarryForward ? 'black' : '',
//                                       color: !comp.isCarryForward ? 'black' : 'white',
//                                       transition: 'all 0.4s ease-in-out',
//                                       boxShadow: "none",
//                                       maxWidth: "fit-content"
//                                     }}
//                                     onClick={() => handleToggle(comp.id, false)}
//                                   >
//                                     Inactive
//                                   </button>
//                                 </div>
//                               </div>

//                             ) : (
//                               <span className={`badge ${comp.isCarryForward ? 'bg-success' : 'bg-secondary'}`}>
//                                 {comp.isCarryForward ? 'Active' : 'Inactive'}
//                               </span>
//                             )}
//                           </td>
//                           <td>
//                             {comp.isEditing ? (
//                               <button
//                                 className="btn btn-success btn-sm"
//                                 onClick={() => handleSave(comp.id, comp.name, comp.days, comp.isCarryForward, comp.isNew)}
//                               >
//                                 Save
//                               </button>
//                             ) : (
//                               <div className="d-flex justify-content-center gap-2">
//                                 <button
//                                   className="btn btn-soft-primary btn-sm"
//                                   onClick={() => handleEdit(comp.id)}
//                                 >
//                                   <iconify-icon
//                                     icon="solar:pen-2-broken"
//                                     className="align-middle fs-18"
//                                   />
//                                 </button>
//                                 <button
//                                   className="btn btn-soft-danger btn-sm"
//                                   onClick={() => openDeleteDialog(comp)}
//                                 >
//                                   <iconify-icon
//                                     icon="solar:trash-bin-minimalistic-2-broken"
//                                     className="align-middle fs-18"
//                                   />
//                                 </button>
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="card-footer border-top">
//                   <nav aria-label="Page navigation example">
//                     <ul className="pagination justify-content-end mb-0">
//                       <li className="page-item">
//                         <button className="page-link">Previous</button>
//                       </li>
//                       <li className="page-item">
//                         <button className="page-link pagination-button">1</button>
//                       </li>
//                       <li className="page-item">
//                         <button className="page-link">Next</button>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isDeleteDialogOpen && selectedCategory && (
//         <ConfirmationDialog
//           onClose={handleDeleteCancel}
//           deleteType={deleteType}
//           id={selectedCategory.id}
//           onDeleted={handleDeleteConfirmed}
//         />
//       )}
//     </>
//   );
// };

// export default AnnualLeaveAdminSetting;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import putAPI from "../../../../../api/putAPI";
import deleteAPI from "../../../../../api/deleteAPI";

const AnnualLeaveAdminSetting = () => {
  const [annualLeaveType, setAnnualLeaveType] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [academicYearList, setAcademicYearList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
   
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    const academicYear = localStorage.getItem("selectedAcademicYear");
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
    setAcademicYear(academicYear);
    fetchAcademicYears(id);
  }, []);

  useEffect(() => {
    if (schoolId && academicYear) {
      fetchData(schoolId, academicYear);
      setCurrentPage(1);
    }
  }, [schoolId, academicYear]);

  const fetchAcademicYears = async (schoolId) => {
    try {
      const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
      setAcademicYearList(response.data.data || []);
    } catch (err) {
      toast.error('Failed to fetch academic years.');
    }
  };

  const fetchData = async (schoolId, year) => {
    setIsLoading(true);
    try {
      const res = await getAPI(`/getall-payroll-annual-leave/${schoolId}?academicYear=${year}`, {}, true);
      console.log("get Response", res);

      if (!res.hasError && Array.isArray(res.data?.data?.ctcComponent)) {
        const formatted = res.data.data.ctcComponent.map((cat) => ({
          id: cat._id,
          name: cat.annualLeaveTypeName,
          days: cat.days || 0,
          isCarryForward: cat.isCarryForward || false,
          isEditing: false,
          isNew: false,
        }));
        setAnnualLeaveType(formatted);
      } else {
        toast.error(res.message || "No leave type found.");
        setAnnualLeaveType([]);
      }
    } catch (error) {
      toast.error("Failed to fetch leave type.");
      console.error("Fetch error:", error);
      setAnnualLeaveType([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRow = () => {
    const newEntry = {
      id: Date.now(),
      name: "",
      days: "",
      isCarryForward: false,
      isEditing: true,
      isNew: true,
    };
    setAnnualLeaveType((prev) => [...prev, newEntry]);
  };

  const handleEdit = (id) => {
    setAnnualLeaveType((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, isEditing: true } : { ...comp, isEditing: false }
      )
    );
  };

  const handleToggle = (id, newStatus) => {
    setAnnualLeaveType((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCarryForward: newStatus } : item
      )
    );
  };

  const handleSave = async (id, name, days, isCarryForward, isNew) => {
    if (!name.trim()) {
      toast.error("Leave type is required.");
      return;
    }
    const parsedDays = Number(days);
    if (isNaN(parsedDays) || parsedDays < 0) {
      toast.error("Days must be a non-negative number.");
      return;
    }

    const payload = {
      annualLeaveTypeName: name,
      days: parsedDays,
      isCarryForward: isCarryForward || false,
      academicYear,
      schoolId,
    };

    try {
      if (isNew) {
        const res = await postAPI("/create-payroll-annual-leave", payload, {}, true);
        if (!res.hasError) {
          toast.success("Leave type created successfully.");
          fetchData(schoolId, academicYear);
        } else {
          toast.error(res.message || "Failed to create leave category.");
        }
      } else {
        const res = await putAPI(`/update-payroll-annual-leave/${id}`, payload, {}, true);
        if (!res.hasError) {
          toast.success("Leave type updated successfully.");
          fetchData(schoolId, academicYear);
        } else {
          toast.error(res.message || "Failed to update leave type.");
        }
      }
    } catch (err) {
      toast.error("Something went wrong while saving.");
      console.error("Save error:", err);
    }
  };

  const openDeleteDialog = (comp) => {
    setSelectedCategory(comp);
    setDeleteType("annualLeaveType");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
    setDeleteType("");
  };

  const handleDeleteConfirmed = (id) => {
    setAnnualLeaveType(prevCat =>
      prevCat.filter(categorie => categorie.id !== id)
    );
  };
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = annualLeaveType.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(annualLeaveType.length / itemsPerPage);

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header border border-0 mb-2 d-flex align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Annual Leave Update
                    </h4>
                    <div>
                      <select
                        id="yearSelect"
                        className="form-select form-select-sm w-auto"
                        aria-label="Select Year"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                      >
                        <option value="">Select Year</option>
                        {academicYearList.map((yearObj, index) => (
                          <option key={index} value={yearObj.academicYear}>
                            {yearObj.academicYear}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary ms-2"
                      onClick={handleAddRow}
                      disabled={!academicYear}
                    >
                      Add Row
                    </button>
                  </div>
                </div>

                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive px-lg-7 px-md-5">
                    <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                      <thead className="bg-light-subtle">
                        <tr className="payroll-table-header">
                          <th style={{ width: "50px" }}>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customCheck1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customCheck1"
                              />
                            </div>
                          </th>
                          <th>Type of Leave</th>
                          <th>Days</th>
                          <th>Carry Forward</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {annualLeaveType.length > 0 ? (
                          currentItems.map((comp) => (
                            <tr key={comp.id} className="payroll-table-body text-center">
                              <td>
                                <div className="form-check ms-1">
                                  <input type="checkbox" className="form-check-input" />
                                </div>
                              </td>
                              <td>
                                {comp.isEditing ? (
                                  <input
                                    type="text"
                                    className="form-control payroll-table-body payroll-input-border text-start"
                                    value={comp.name}
                                    onChange={(e) =>
                                      setAnnualLeaveType((prev) =>
                                        prev.map((item) =>
                                          item.id === comp.id ? { ...item, name: e.target.value } : item
                                        )
                                      )
                                    }
                                    placeholder="Enter leave type"
                                  />
                                ) : (
                                  comp.name
                                )}
                              </td>
                              <td>
                                {comp.isEditing ? (
                                  <input
                                    type="number"
                                    className="form-control payroll-table-body payroll-input-border text-end"
                                    value={comp.days}
                                    onChange={(e) =>
                                      setAnnualLeaveType((prev) =>
                                        prev.map((item) =>
                                          item.id === comp.id ? { ...item, days: e.target.value } : item
                                        )
                                      )
                                    }
                                    placeholder="Enter days"
                                    min="0"
                                    step="1"
                                  />
                                ) : (
                                  comp.days
                                )}
                              </td>
                              <td>
                                {comp.isEditing ? (
                                  <div className="form-check form-switch d-flex justify-content-center align-items-center gap-1">
                                    <div
                                      className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                                      style={{ maxWidth: "fit-content" }}
                                    >
                                      <button
                                        className={`btn ${comp.isCarryForward ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                                        type="button"
                                        style={{
                                          backgroundColor: comp.isCarryForward ? 'white' : 'black',
                                          borderColor: comp.isCarryForward ? 'black' : '',
                                          color: comp.isCarryForward ? 'black' : 'white',
                                          maxWidth: "fit-content",
                                          transition: 'all 0.4s ease-in-out',
                                          boxShadow: "none"
                                        }}
                                        onClick={() => handleToggle(comp.id, true)}
                                      >
                                        Active
                                      </button>
                                      <button
                                        type="button"
                                        className={`btn ${!comp.isCarryForward ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                                        style={{
                                          backgroundColor: !comp.isCarryForward ? 'white' : 'black',
                                          borderColor: !comp.isCarryForward ? 'black' : '',
                                          color: !comp.isCarryForward ? 'black' : 'white',
                                          transition: 'all 0.4s ease-in-out',
                                          boxShadow: "none",
                                          maxWidth: "fit-content"
                                        }}
                                        onClick={() => handleToggle(comp.id, false)}
                                      >
                                        Inactive
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <span className={`badge ${comp.isCarryForward ? 'bg-success' : 'bg-secondary'}`}>
                                    {comp.isCarryForward ? 'Active' : 'Inactive'}
                                  </span>
                                )}
                              </td>
                              <td>
                                {comp.isEditing ? (
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => handleSave(comp.id, comp.name, comp.days, comp.isCarryForward, comp.isNew)}
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <div className="d-flex justify-content-center gap-2">
                                    <button
                                      className="btn btn-soft-primary btn-sm"
                                      onClick={() => handleEdit(comp.id)}
                                    >
                                      <iconify-icon
                                        icon="solar:pen-2-broken"
                                        className="align-middle fs-18"
                                      />
                                    </button>
                                    <button
                                      className="btn btn-soft-danger btn-sm"
                                      onClick={() => openDeleteDialog(comp)}
                                    >
                                      <iconify-icon
                                        icon="solar:trash-bin-minimalistic-2-broken"
                                        className="align-middle fs-18"
                                      />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center py-4">
                              {academicYear ? "No leave types found for selected academic year" : "Please select an academic year"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                 <div className="card-footer border-top">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end mb-0">
                      <li className="page-item">
                        <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                      </li>
                      {Array.from({ length: Math.min(3, totalPages) }, (_, i) => currentPage - 1 + i)
                        .filter(p => p >= 1 && p <= totalPages)
                        .map(page => (
                          <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                            <button className={`page-link pagination-button ${currentPage === page ? "active" : ""
                              }`} onClick={() => handlePageClick(page)}>{page}</button>
                          </li>
                        ))}
                      <li className="page-item">
                        <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && selectedCategory && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedCategory.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default AnnualLeaveAdminSetting;