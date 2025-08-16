// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import getAPI from "../../../../../api/getAPI";
// import postAPI from "../../../../../api/postAPI";
// import putAPI from "../../../../../api/putAPI";

// const DefinePayrollGrade = () => {
//   const [designation, setDesignation] = useState([]);
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

//   useEffect(() => {
//     if (schoolId && academicYear) {
//       fetchData(schoolId, academicYear);
//       // setCurrentPage(1);
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
//       const res = await getAPI(`/getall-employee-grade/${schoolId}?academicYear=${year}`, {}, true);
//       console.log("get Response", res);

//       if (!res.hasError && res.data?.grade) {
//         const formatted = res.data.grade.map((cat) => ({
//           id: cat._id,
//           name: cat.gradeName,
//           isEditing: false,
//           isNew: false,
//         }));
//         setDesignation(formatted);
//       } else {
//         toast.error(res.message || "Something went wrong while fetching.");
//       }
//     } catch (error) {
//       toast.error("Failed to fetch categories.");
//       console.error("Fetch error:", error);
//     }
//   };


//   const handleAddRow = () => {
//     const newEntry = {
//       id: Date.now(),
//       name: '',
//       isEditing: true,
//       isNew: true
//     };
//     setDesignation(prev => [...prev, newEntry]);
//   };

//   const handleEdit = (id) => {
//     setDesignation((prev) =>
//       prev.map((comp) =>
//         comp.id === id ? { ...comp, isEditing: true } : { ...comp, isEditing: false }
//       )
//     );
//   };

//   const handleSave = async (id, name, isNew) => {
//     if (!name.trim()) {
//       toast.error("Category name is required.");
//       return;
//     }

//     const payload = {
//       gradeName: name,
//       academicYear,
//       schoolId,
//     };

//     try {
//       if (isNew) {
//         console.log(payload);

//         const res = await postAPI("/create-employee-grade", payload, {}, true);
//         console.log("response", res);
//         if (!res.hasError) {
//           toast.success("Category created successfully.");
//           fetchData(schoolId, academicYear);
//         } else {
//           toast.error(res.message);
//         }
//       } else {
//         const res = await putAPI(`/update-employee-grade/${id}`, payload, {}, true);
//         console.log("response", res);

//         if (!res.hasError) {
//           toast.success("Category updated successfully.");
//           fetchData(schoolId, academicYear);
//         } else {
//           toast.error(res.message);
//         }
//       }
//     } catch (err) {
//       toast.error("Something went wrong.");
//     }
//   };


//   const openDeleteDialog = (comp) => {
//     setSelectedCategory(comp);
//     setDeleteType("employeeGrade");
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedCategory(null);
//   };
//   const handleDeleteConfirmed = (id) => {
//     setDesignation(prevCat =>
//       prevCat.filter(grade => grade.id !== id)
//     );
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
//                       Grade
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
//                         <th>Grade</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {designation.map((comp) => (
//                         <tr key={comp.id} className='payroll-table-body text-center'>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input type="checkbox" className="form-check-input" />
//                             </div>
//                           </td>
//                           <td>
//                             {comp.isEditing ? (
//                               <div className="col-md-7" style={{ justifySelf: "center" }}>
//                                 <input
//                                   type="text"
//                                   className="form-control payroll-table-body payroll-input-border text-start"
//                                   value={comp.name}
//                                   onChange={(e) =>
//                                     setDesignation((prev) =>
//                                       prev.map((item) =>
//                                         item.id === comp.id ? { ...item, name: e.target.value } : item
//                                       )
//                                     )
//                                   }
//                                 />
//                               </div>
//                             ) : (
//                               comp.name
//                             )}
//                           </td>
//                           <td>
//                             {comp.isEditing ? (
//                               <button
//                                 className="btn btn-success btn-sm"
//                                 onClick={() => handleSave(comp.id, comp.name, comp.isNew)}
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

//                                 <button className="btn btn-soft-danger btn-sm" onClick={() => openDeleteDialog(comp)}>
//                                   <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
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

// export default DefinePayrollGrade;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import putAPI from "../../../../../api/putAPI";
import deleteAPI from "../../../../../api/deleteAPI";

const DefinePayrollGrade = () => {
  const [designation, setDesignation] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [academicYearList, setAcademicYearList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination state
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
    fetchData(id, academicYear);
  }, []);

  useEffect(() => {
    if (schoolId && academicYear) {
      fetchData(schoolId, academicYear);
      setCurrentPage(1);
    }
  }, [academicYear, schoolId]);

  const fetchAcademicYears = async (schoolId) => {
    try {
      const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
      setAcademicYearList(response.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch academic years.");
    }
  };

  const fetchData = async (schoolId, year) => {
    setIsLoading(true);
    try {
      const res = await getAPI(
        `/getall-employee-grade/${schoolId}?academicYear=${year}`,
        {},
        true
      );
      if (!res.hasError && res.data?.grade) {
        const formatted = res.data.grade.map((cat) => ({
          id: cat._id,
          name: cat.gradeName,
          isEditing: false,
          isNew: false,
        }));
        setDesignation(formatted);
      } else {
        toast.error(res.message || "Something went wrong while fetching.");
        setDesignation([]);
      }
    } catch (error) {
      toast.error("Failed to fetch categories.");
      setDesignation([]);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleAddRow = () => {
    const newEntry = {
      id: Date.now(),
      name: "",
      isEditing: true,
      isNew: true,
    };
    setDesignation((prev) => [...prev, newEntry]);
    // Scroll to bottom after adding new row
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }, 100);
  };

  const handleEdit = (id) => {
    setDesignation((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, isEditing: true } : { ...comp, isEditing: false }
      )
    );
  };

  const handleSave = async (id, name, isNew) => {
    if (!name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    const payload = { gradeName: name, academicYear, schoolId };

    try {
      if (isNew) {
        const res = await postAPI("/create-employee-grade", payload, {}, true);
        if (!res.hasError) {
          toast.success("Category created successfully.");
          fetchData(schoolId, academicYear);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await putAPI(`/update-employee-grade/${id}`, payload, {}, true);
        if (!res.hasError) {
          toast.success("Category updated successfully.");
          fetchData(schoolId, academicYear);
        } else {
          toast.error(res.message);
        }
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const openDeleteDialog = (comp) => {
    setSelectedCategory(comp);
    setDeleteType("employeeGrade");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteConfirmed = async (id) => {
     setDesignation((prev) => prev.filter((grade) => grade.id !== id));
   
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = designation.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(designation.length / itemsPerPage);

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
                    <h4 className="card-title flex-grow-1 text-center">Grade</h4>
                    <div>
                      <select
                        className="form-select form-select-sm w-auto"
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
                  <>
                    <div className="table-responsive px-lg-7 px-md-5">
                      <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                        <thead className="bg-light-subtle">
                          <tr className="payroll-table-header">
                            <th style={{ width: 20 }}>
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
                            <th>Grade</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.length > 0 ? (
                            currentItems.map((comp) => (
                              <tr key={comp.id} className="payroll-table-body text-center">
                                <td>
                                  <div className="form-check ms-1">
                                    <input type="checkbox" className="form-check-input" />
                                  </div>
                                </td>
                                <td>
                                  {comp.isEditing ? (
                                    <div className="col-md-7" style={{ justifySelf: "center" }}>
                                      <input
                                        type="text"
                                        className="form-control payroll-table-body payroll-input-border text-start"
                                        value={comp.name}
                                        onChange={(e) =>
                                          setDesignation((prev) =>
                                            prev.map((item) =>
                                              item.id === comp.id
                                                ? { ...item, name: e.target.value }
                                                : item
                                            )
                                          )
                                        }
                                      />
                                    </div>
                                  ) : (
                                    comp.name
                                  )}
                                </td>
                                <td>
                                  {comp.isEditing ? (
                                    <button
                                      className="btn btn-success btn-sm"
                                      onClick={() =>
                                        handleSave(comp.id, comp.name, comp.isNew)
                                      }
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
                              <td colSpan="3" className="text-center py-4">
                                No grades found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
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
                  </>
                )}
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

export default DefinePayrollGrade;