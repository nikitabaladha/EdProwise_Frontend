// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import getAPI from "../../../../../api/getAPI";
// import postAPI from "../../../../../api/postAPI";
// import putAPI from "../../../../../api/putAPI";

// const SchoolDefineCtcComponentsList = () => {
//   const [ctcComponents, setCtcComponents] = useState([]);
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
//     try {
//       const res = await getAPI(`/getall-payroll-ctc-component/${schoolId}?academicYear=${year}`, {}, true);
//       console.log("get Response", res);

//       let formatted = [];

//       if (!res.hasError && res.data?.ctcComponent) {
//         formatted = res.data.ctcComponent.map((cat) => ({
//           id: cat._id,
//           name: cat.ctcComponentName,
//           isEditing: false,
//           isNew: false,
//           isStatic: cat.ctcComponentName === "Basic Salary" 
//         }));
//       }

//       const hasBasic = formatted.some(c => c.name === "Basic Salary");
//       if (!hasBasic) {
//         formatted.unshift({
//           id: "basic-salary-static",
//           name: "Basic Salary",
//           isEditing: false,
//           isNew: false,
//           isStatic: true
//         });
//       }

//       setCtcComponents(formatted);
//     } catch (error) {
//       toast.error("Failed to fetch CTC Components.");
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
//     setCtcComponents(prev => [...prev, newEntry]);
//   };

//   const handleEdit = (id) => {
//     setCtcComponents((prev) =>
//       prev.map((comp) =>
//         comp.id === id ? { ...comp, isEditing: true } : { ...comp, isEditing: false }
//       )
//     );
//   };

//   const handleSave = async (id, name, isNew) => {
//     if (!name.trim()) {
//       toast.error("Component name is required.");
//       return;
//     }

//     const payload = {
//       ctcComponentName: name,
//       academicYear,
//       schoolId,
//     };

//     try {
//       if (isNew) {
//         console.log(payload);

//         const res = await postAPI("/create-payroll-ctc-component", payload, {}, true);
//         console.log("response", res);
//         if (!res.hasError) {
//           toast.success("Ctc Component created successfully.");
//           fetchData(schoolId, academicYear);
//         } else {
//           toast.error(res.message);
//         }
//       } else {
//         const res = await putAPI(`/update-payroll-ctc-component/${id}`, payload, {}, true);
//         console.log("response", res);

//         if (!res.hasError) {
//           toast.success("Ctc Component updated successfully.");
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
//     setDeleteType("ctcComponents");
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedCategory(null);
//   };
//   const handleDeleteConfirmed = (id) => {
//     setCtcComponents(prevCat =>
//       prevCat.filter(ctcComponent => ctcComponent.id !== id)
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
//                       Define CTC Components
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
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <>
//                       {ctcComponents.map((comp) => (
//                         <tr key={comp.id} className='payroll-table-body text-center'>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input type="checkbox" className="form-check-input" disabled={comp.isStatic} />
//                             </div>
//                           </td>
//                           <td>
//                             {comp.isEditing && !comp.isStatic ? (
//                               <div className="col-md-7">
//                                 <input
//                                   type="text"
//                                   className="form-control payroll-table-body payroll-input-border text-start"
//                                   value={comp.name}
//                                   onChange={(e) =>
//                                     setCtcComponents((prev) =>
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
//                             {comp.isStatic ? (
//                               <span className="text-muted">Fixed</span>
//                             ) : comp.isEditing ? (
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
//                                   <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
//                                 </button>
//                                 <button
//                                   className="btn btn-soft-danger btn-sm"
//                                   onClick={() => openDeleteDialog(comp)}
//                                 >
//                                   <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
//                                 </button>
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                       </>
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
//   )
// }

// export default SchoolDefineCtcComponentsList;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import putAPI from "../../../../../api/putAPI";
import deleteAPI from "../../../../../api/deleteAPI";

const SchoolDefineCtcComponentsList = () => {
  const [ctcComponents, setCtcComponents] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [academicYearList, setAcademicYearList] = useState([]);

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
      toast.error('Failed to fetch academic years.');
    }
  };
  const fetchData = async (schoolId, year) => {
    try {
      const res = await getAPI(
        `/getall-payroll-ctc-component/${schoolId}?academicYear=${year}`,
        {},
        true
      );
      console.log("get Response", res);

      let formatted = [];

      if (!res.hasError && res.data?.ctcComponent) {
        formatted = res.data.ctcComponent.map((cat) => ({
          id: cat._id,
          name: cat.ctcComponentName,
          isEditing: false,
          isNew: false,
          isStatic: ["Basic Salary", "HRA"].includes(cat.ctcComponentName),
          isActive: ["LTA", "Internet Allowance", "Telephone Allowance"].includes(cat.ctcComponentName)
            ? cat.isActive ?? true
            : null,
          isToggleVisible: false,
        }));
      }

      // Ensure Basic Salary and HRA exist in the database
      const requiredComponents = [
        { name: "Basic Salary", isStatic: true },
        { name: "HRA", isStatic: true },
      ];

      for (const comp of requiredComponents) {
        if (!formatted.some((c) => c.name === comp.name)) {
          try {
            const payload = {
              ctcComponentName: comp.name,
              academicYear: year,
              schoolId,
              isActive: true, // Always active for Basic Salary and HRA
            };
            const res = await postAPI("/create-payroll-ctc-component", payload, {}, true);
            console.log("ctc post res", res);

            if (!res.hasError) {
              formatted.unshift({
                id: res.data.component._id,
                name: comp.name,
                isEditing: false,
                isNew: false,
                isStatic: true,
                isActive: true,
                isToggleVisible: false,
              });
            } else {
              toast.error(`Failed to create ${comp.name}: ${res.message}`);
            }
          } catch (err) {
            toast.error(`Failed to create ${comp.name}.`);
            console.error(`Error creating ${comp.name}:`, err);
          }
        }
      }

      formatted.sort((a, b) => {
        if (a.name === "Basic Salary") return -1;
        if (b.name === "Basic Salary") return 1;
        if (a.name === "HRA") return -1;
        if (b.name === "HRA") return 1;
        return 0;
      });

      // Add default inactive togglable components if not in the database
      const defaultTogglable = [
        { name: "LTA", id: "lta-default" },
        { name: "Internet Allowance", id: "internet-allowance-default" },
        { name: "Telephone Allowance", id: "telephone-allowance-default" },
      ];

      defaultTogglable.forEach((comp) => {
        if (!formatted.some((c) => c.name === comp.name)) {
          formatted.push({
            id: comp.id,
            name: comp.name,
            isEditing: false,
            isNew: false,
            isStatic: false,
            isActive: false, // Initially inactive
            isToggleVisible: false,
          });
        }
      });

      // Sort to ensure Basic Salary and HRA are at the top
      // formatted.sort((a, b) => {
      //   if (a.isStatic && !b.isStatic) return -1;
      //   if (!a.isStatic && b.isStatic) return 1;
      //   return 0;
      // });

      setCtcComponents(formatted);
    } catch (error) {
      toast.error("Failed to fetch CTC Components.");
      console.error("Fetch error:", error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ctcComponents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ctcComponents.length / itemsPerPage);

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handlePageClick = (page) => setCurrentPage(page);

  const handleAddRow = () => {
    const newEntry = {
      id: Date.now(),
      name: "",
      isEditing: true,
      isNew: true,
      isStatic: false,
      isActive: null,
      isToggleVisible: false,
    };
    setCtcComponents((prev) => [...prev, newEntry]);
  };

  const handleEdit = (id) => {
    setCtcComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? { ...comp, isEditing: true, isToggleVisible: false }
          : { ...comp, isEditing: false, isToggleVisible: false }
      )
    );
  };

  const handleToggleVisibility = (id) => {
    setCtcComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? { ...comp, isToggleVisible: !comp.isToggleVisible }
          : { ...comp, isToggleVisible: false }
      )
    );
  };

  const handleToggle = async (id, name, isActive) => {
    try {
      if (!isActive) {
        // Delete from database if set to inactive
        if (!id.includes("-default")) {
          const res = await deleteAPI(`/delete-payroll-ctc-component/${id}`, {}, true);
          if (!res.hasError) {
            toast.success(`${name} deactivated successfully.`);
            setCtcComponents((prev) =>
              prev.map((comp) =>
                comp.id === id
                  ? {
                    ...comp,
                    id: `${name.toLowerCase().replace(" ", "-")}-default`,
                    isActive: false,
                    isToggleVisible: false,
                  }
                  : comp
              )
            );
          } else {
            toast.error(res.message);
          }
        } else {
          // Already inactive, no database action needed
          setCtcComponents((prev) =>
            prev.map((comp) =>
              comp.id === id ? { ...comp, isToggleVisible: false } : comp
            )
          );
        }
      } else {
        // Add to database if set to active
        const payload = {
          ctcComponentName: name,
          academicYear,
          schoolId,
          isActive: true,
        };
        const res = await postAPI("/create-payroll-ctc-component", payload, {}, true);
        if (!res.hasError) {
          toast.success(`${name} activated successfully.`);
          setCtcComponents((prev) =>
            prev.map((comp) =>
              comp.id === id
                ? { ...comp, id: res.data.component._id, isActive: true, isToggleVisible: false }
                : comp
            )
          );
        } else {
          toast.error(res.message);
        }
      }
    } catch (err) {
      toast.error(`Failed to ${isActive ? "activate" : "deactivate"} ${name}.`);
      console.error("Toggle error:", err);
    }
  };

  const handleSave = async (id, name, isNew) => {
    if (!name.trim()) {
      toast.error("Component name is required.");
      return;
    }

    const payload = {
      ctcComponentName: name,
      academicYear,
      schoolId,
      isActive: true, // New components are always active
    };

    try {
      if (isNew) {
        const res = await postAPI("/create-payroll-ctc-component", payload, {}, true);
        if (!res.hasError) {
          toast.success("CTC Component created successfully.");
          fetchData(schoolId, academicYear); // Refresh data
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await putAPI(`/update-payroll-ctc-component/${id}`, payload, {}, true);
        if (!res.hasError) {
          toast.success("CTC Component updated successfully.");
          fetchData(schoolId, academicYear); // Refresh data
        } else {
          toast.error(res.message);
        }
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error("Save error:", err);
    }
  };

  const openDeleteDialog = (comp) => {
    setSelectedCategory(comp);
    setDeleteType("ctcComponents");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteConfirmed = async (id) => {
    setCtcComponents((prev) => prev.filter((comp) => comp.id !== id));

  };

  const isToggleApplicable = (name) =>
    ["LTA", "Internet Allowance", "Telephone Allowance"].includes(name);

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
                      Define CTC Components
                    </h4>
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
                        <th>CTC Components</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((comp) => (
                        <tr key={comp.id} className="payroll-table-body text-center">
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                disabled={comp.isStatic}
                              />
                            </div>
                          </td>
                          <td>
                            {comp.isEditing && !comp.isStatic ? (
                              <div className="col-md-7">
                                <input
                                  type="text"
                                  className="form-control payroll-table-body payroll-input-border text-start"
                                  value={comp.name}
                                  onChange={(e) =>
                                    setCtcComponents((prev) =>
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
                            {isToggleApplicable(comp.name) ? (comp.isActive ? "Active" : "Inactive") : ""}

                          </td>
                          <td>
                            {comp.isStatic ? (
                              <span className="text-muted">Fixed</span>
                            ) : comp.isEditing ? (
                              <div className="d-flex justify-content-center gap-2">
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleSave(comp.id, comp.name, comp.isNew)}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => handleEdit(comp.id)}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : isToggleApplicable(comp.name) ? (
                              <>
                                {comp.isToggleVisible ? (
                                  <div className="form-check form-switch d-flex justify-content-center align-items-center gap-1">
                                    <div
                                      className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                                      style={{ maxWidth: "fit-content" }}
                                    >
                                      <button
                                        className={`btn ${comp.isActive ? "btn-primary" : "btn-dark"} rounded-pill`}
                                        type="button"
                                        style={{
                                          backgroundColor: comp.isActive ? "white" : "black",
                                          borderColor: comp.isActive ? "black" : "",
                                          color: comp.isActive ? "black" : "white",
                                          maxWidth: "fit-content",
                                          transition: "all 0.4s ease-in-out",
                                          boxShadow: "none",
                                        }}
                                        onClick={() => handleToggle(comp.id, comp.name, true)}
                                      >
                                        Active
                                      </button>
                                      <button
                                        type="button"
                                        className={`btn ${!comp.isActive ? "btn-primary" : "btn-dark"} rounded-pill`}
                                        style={{
                                          backgroundColor: !comp.isActive ? "white" : "black",
                                          borderColor: !comp.isActive ? "black" : "",
                                          color: !comp.isActive ? "black" : "white",
                                          transition: "all 0.4s ease-in-out",
                                          boxShadow: "none",
                                          maxWidth: "fit-content",
                                        }}
                                        onClick={() => handleToggle(comp.id, comp.name, false)}
                                      >
                                        Inactive
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    className="btn btn-soft-primary btn-sm"
                                    onClick={() => handleToggleVisibility(comp.id)}
                                  >
                                    <iconify-icon
                                      icon="solar:pen-2-broken"
                                      className="align-middle fs-18"
                                    />
                                  </button>
                                )}
                              </>
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
                      ))}
                    </tbody>
                  </table>
                </div>

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

export default SchoolDefineCtcComponentsList;