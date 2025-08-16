// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const DefineCtcComponents = () => {

//   const [rows, setRows] = useState([
//     { id: 1, CTCComponentsName: "" },
//     { id: 2, CTCComponentsName: "" },
//     { id: 3, CTCComponentsName: "" },
//   ]); 

//   // Handle input change
//   const handleInputChange = (index, value) => {
//     const updatedRows = [...rows];
//     updatedRows[index].CTCComponentsName = value;
//     setRows(updatedRows);
//   };

//   // Add  a new row
//   const addRow = () => {
//     setRows([...rows, { id: rows.length + 1, CTCComponentsName: "" }]);
//   };


//   const deleteRow = (index) => {
//     if (rows.length > 3) {
//       setRows(rows.filter((_, i) => i !== index));
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2 d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Define CTC Components 11
//                   </h4>
//                   <div>
//                     <select id="yearSelect" className="custom-select payroll-table-body" aria-label="Select Year">
//                       <option selected>2025-26</option>
//                       <option>2026-27</option>
//                       <option>2027-28</option>
//                       <option>2028-29</option>
//                       <option>2029-30</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <form>
//                 <div className="table-responsive px-lg-6 px-md-5">
//                   <table className="table align-middle mb-0 table-hover table-centered text-center">
//                     <thead className="bg-light-subtle">
//                       <tr className='payroll-table-header'>
//                         <th style={{ width: 20 }}>
//                           <div className="form-check ms-1">
//                             <input type="checkbox" className="form-check-input" id="customCheck1" />
//                             <label className="form-check-label" htmlFor="customCheck1"></label>
//                           </div>
//                         </th>
//                         <th>Define CTC Components</th>
//                         <th className="text-start">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, index) => (
//                         <tr key={row.id} className='payroll-table-body'>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input type="checkbox" className="form-check-input" id={`customCheck${row.id}`} />
//                               <label className="form-check-label" htmlFor={`customCheck${row.id}`}></label>
//                             </div>
//                           </td>
//                           <td>
//                             <input
//                               type="text"
//                               id={`CTCComponentsName${row.id}`}
//                               name="CTCComponentsName"
//                               className="form-control payroll-table-body payroll-input-border"
//                               value={row.CTCComponentsName}
//                               onChange={(e) => handleInputChange(index, e.target.value)}
//                               required
//                               placeholder="Enter CTC Component Name"
//                             />
//                           </td>
//                           <td>
//                             <div className="d-flex gap-2">
//                               {rows.length > 3 && (
//                                 <Link
//                                   onClick={(e) => {
//                                     e.preventDefault();
//                                     deleteRow(index);
//                                   }}
//                                   className="btn btn-soft-danger btn-sm"
//                                 >
//                                   <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
//                                 </Link>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="mt-3 text-center">
//                   <button type="button" className="btn btn-primary" onClick={addRow}>
//                     Add Row
//                   </button>
//                 </div>

//                 <div className="mt-3 text-end">
//                   <button type="submit" className="btn btn-primary">
//                     submit
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

// export default DefineCtcComponents;

// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import getAPI from "../../../../../api/getAPI";
// import postAPI from "../../../../../api/postAPI";
// import putAPI from "../../../../../api/putAPI";
// import deleteAPI from "../../../../../api/deleteAPI";

// const SchoolDefineCtcComponentsList = () => {
//   const [ctcComponents, setCtcComponents] = useState([]);
//   const [schoolId, setSchoolId] = useState(null);
//   const [academicYear, setAcademicYear] = useState("");
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [deleteType, setDeleteType] = useState("");
//   const [academicYearList, setAcademicYearList] = useState([]);
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

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

//   useEffect(() => {
//     if (schoolId && academicYear) {
//       fetchData(schoolId, academicYear);
//       setCurrentPage(1); // Reset to first page when academic year changes
//     }
//   }, [academicYear, schoolId]);

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
//       const res = await getAPI(
//         `/getall-payroll-ctc-component/${schoolId}?academicYear=${year}`,
//         {},
//         true
//       );
//       console.log("get Response", res);

//       let formatted = [];

//       if (!res.hasError && res.data?.ctcComponent) {
//         formatted = res.data.ctcComponent.map((cat) => ({
//           id: cat._id,
//           name: cat.ctcComponentName,
//           isEditing: false,
//           isNew: false,
//           isStatic: ["Basic Salary", "HRA"].includes(cat.ctcComponentName),
//           isActive: ["LTA", "Internet Allowance", "Telephone Allowance"].includes(cat.ctcComponentName)
//             ? cat.isActive ?? true
//             : null,
//           isToggleVisible: false,
//         }));
//       }

//       // Ensure Basic Salary and HRA exist in the database and are first
//       const requiredComponents = [
//         { name: "Basic Salary", isStatic: true },
//         { name: "HRA", isStatic: true },
//       ];

//       for (const comp of requiredComponents) {
//         if (!formatted.some((c) => c.name === comp.name)) {
//           try {
//             const payload = {
//               ctcComponentName: comp.name,
//               academicYear: year,
//               schoolId,
//               isActive: true,
//             };
//             const res = await postAPI("/create-payroll-ctc-component", payload, {}, true);

//             if (!res.hasError) {
//               formatted.unshift({
//                 id: res.data.component._id,
//                 name: comp.name,
//                 isEditing: false,
//                 isNew: false,
//                 isStatic: true,
//                 isActive: true,
//                 isToggleVisible: false,
//               });
//             } else {
//               toast.error(`Failed to create ${comp.name}: ${res.message}`);
//             }
//           } catch (err) {
//             toast.error(`Failed to create ${comp.name}.`);
//             console.error(`Error creating ${comp.name}:`, err);
//           }
//         }
//       }

//       // Sort to ensure Basic Salary and HRA are always first
//       formatted.sort((a, b) => {
//         if (a.name === "Basic Salary") return -1;
//         if (b.name === "Basic Salary") return 1;
//         if (a.name === "HRA") return -1;
//         if (b.name === "HRA") return 1;
//         return 0;
//       });

//       // Add default inactive togglable components if not in the database
//       const defaultTogglable = [
//         { name: "LTA", id: "lta-default" },
//         { name: "Internet Allowance", id: "internet-allowance-default" },
//         { name: "Telephone Allowance", id: "telephone-allowance-default" },
//       ];

//       defaultTogglable.forEach((comp) => {
//         if (!formatted.some((c) => c.name === comp.name)) {
//           formatted.push({
//             id: comp.id,
//             name: comp.name,
//             isEditing: false,
//             isNew: false,
//             isStatic: false,
//             isActive: false,
//             isToggleVisible: false,
//           });
//         }
//       });

//       setCtcComponents(formatted);
//     } catch (error) {
//       toast.error("Failed to fetch CTC Components.");
//       console.error("Fetch error:", error);
//     }
//   };

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = ctcComponents.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(ctcComponents.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleAddRow = () => {
//     const newEntry = {
//       id: Date.now(),
//       name: "",
//       isEditing: true,
//       isNew: true,
//       isStatic: false,
//       isActive: null,
//       isToggleVisible: false,
//     };
//     setCtcComponents((prev) => [...prev, newEntry]);
//     // Scroll to the bottom of the list (newly added item)
//     setTimeout(() => {
//       window.scrollTo({
//         top: document.body.scrollHeight,
//         behavior: "smooth"
//       });
//     }, 100);
//   };

//   // ... (keep all other existing functions unchanged)

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
//                       Define CTC Components
//                     </h4>
//                     <div>
//                       <select
//                         className="form-select form-select-sm w-auto"
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
//                         <th style={{ width: 20 }}>
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
//                         <th>CTC Components</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentItems.length > 0 ? (
//                         currentItems.map((comp) => (
//                           <tr key={comp.id} className="payroll-table-body text-center">
//                             <td>
//                               <div className="form-check ms-1">
//                                 <input
//                                   type="checkbox"
//                                   className="form-check-input"
//                                   disabled={comp.isStatic}
//                                 />
//                               </div>
//                             </td>
//                             <td>
//                               {comp.isEditing && !comp.isStatic ? (
//                                 <div className="col-md-7">
//                                   <input
//                                     type="text"
//                                     className="form-control payroll-table-body payroll-input-border text-start"
//                                     value={comp.name}
//                                     onChange={(e) =>
//                                       setCtcComponents((prev) =>
//                                         prev.map((item) =>
//                                           item.id === comp.id
//                                             ? { ...item, name: e.target.value }
//                                             : item
//                                         )
//                                       )
//                                     }
//                                   />
//                                 </div>
//                               ) : (
//                                 comp.name
//                               )}
//                             </td>
//                             <td>
//                               {isToggleApplicable(comp.name) ? (comp.isActive ? "Active" : "Inactive") : ""}
//                             </td>
//                             <td>
//                               {comp.isStatic ? (
//                                 <span className="text-muted">Fixed</span>
//                               ) : comp.isEditing ? (
//                                 <div className="d-flex justify-content-center gap-2">
//                                   <button
//                                     className="btn btn-success btn-sm"
//                                     onClick={() => handleSave(comp.id, comp.name, comp.isNew)}
//                                   >
//                                     Save
//                                   </button>
//                                   <button
//                                     className="btn btn-secondary btn-sm"
//                                     onClick={() => handleEdit(comp.id)}
//                                   >
//                                     Cancel
//                                   </button>
//                                 </div>
//                               ) : isToggleApplicable(comp.name) ? (
//                                 <>
//                                   {comp.isToggleVisible ? (
//                                     <div className="form-check form-switch d-flex justify-content-center align-items-center gap-1">
//                                       <div
//                                         className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
//                                         style={{ maxWidth: "fit-content" }}
//                                       >
//                                         <button
//                                           className={`btn ${comp.isActive ? "btn-primary" : "btn-dark"} rounded-pill`}
//                                           type="button"
//                                           style={{
//                                             backgroundColor: comp.isActive ? "white" : "black",
//                                             borderColor: comp.isActive ? "black" : "",
//                                             color: comp.isActive ? "black" : "white",
//                                             maxWidth: "fit-content",
//                                             transition: "all 0.4s ease-in-out",
//                                             boxShadow: "none",
//                                           }}
//                                           onClick={() => handleToggle(comp.id, comp.name, true)}
//                                         >
//                                           Active
//                                         </button>
//                                         <button
//                                           type="button"
//                                           className={`btn ${!comp.isActive ? "btn-primary" : "btn-dark"} rounded-pill`}
//                                           style={{
//                                             backgroundColor: !comp.isActive ? "white" : "black",
//                                             borderColor: !comp.isActive ? "black" : "",
//                                             color: !comp.isActive ? "black" : "white",
//                                             transition: "all 0.4s ease-in-out",
//                                             boxShadow: "none",
//                                             maxWidth: "fit-content",
//                                           }}
//                                           onClick={() => handleToggle(comp.id, comp.name, false)}
//                                         >
//                                           Inactive
//                                         </button>
//                                       </div>
//                                     </div>
//                                   ) : (
//                                     <button
//                                       className="btn btn-soft-primary btn-sm"
//                                       onClick={() => handleToggleVisibility(comp.id)}
//                                     >
//                                       <iconify-icon
//                                         icon="solar:pen-2-broken"
//                                         className="align-middle fs-18"
//                                       />
//                                     </button>
//                                   )}
//                                 </>
//                               ) : (
//                                 <div className="d-flex justify-content-center gap-2">
//                                   <button
//                                     className="btn btn-soft-primary btn-sm"
//                                     onClick={() => handleEdit(comp.id)}
//                                   >
//                                     <iconify-icon
//                                       icon="solar:pen-2-broken"
//                                       className="align-middle fs-18"
//                                     />
//                                   </button>
//                                   <button
//                                     className="btn btn-soft-danger btn-sm"
//                                     onClick={() => openDeleteDialog(comp)}
//                                   >
//                                     <iconify-icon
//                                       icon="solar:trash-bin-minimalistic-2-broken"
//                                       className="align-middle fs-18"
//                                     />
//                                   </button>
//                                 </div>
//                               )}
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="4" className="text-center py-4">
//                             No CTC components found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* <div className="card-footer border-top">
//                   <nav aria-label="Page navigation example">
//                     <ul className="pagination justify-content-end mb-0">
//                       <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                         <button 
//                           className="page-link" 
//                           onClick={() => paginate(currentPage - 1)}
//                           disabled={currentPage === 1}
//                         >
//                           Previous
//                         </button>
//                       </li>
//                       {Array.from({ length: totalPages }, (_, i) => (
//                         <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
//                           <button 
//                             className="page-link" 
//                             onClick={() => paginate(i + 1)}
//                           >
//                             {i + 1}
//                           </button>
//                         </li>
//                       ))}
//                       <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//                         <button 
//                           className="page-link" 
//                           onClick={() => paginate(currentPage + 1)}
//                           disabled={currentPage === totalPages}
//                         >
//                           Next
//                         </button>
//                       </li>
//                     </ul>
//                   </nav>
//                 </div> */}
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

// export default SchoolDefineCtcComponentsList;