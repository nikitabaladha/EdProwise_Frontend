// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import getAPI from "../../../../../api/getAPI";
// import postAPI from "../../../../../api/postAPI";
// import putAPI from "../../../../../api/putAPI";

// const EmployeeOvertimeAllowanceRate = () => {
//     const [overtimeComponents, setOvertimeComponents] = useState([]);
//     const [schoolId, setSchoolId] = useState(null);
//     const [academicYear, setAcademicYear] = useState("2025-26");
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [deleteType, setDeleteType] = useState("");

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//         const id = userDetails?.schoolId;
//         if (!id) {
//             toast.error("School ID not found. Please log in again.");
//             return;
//         }
//         setSchoolId(id);
//         fetchData(id, academicYear);
//     }, [academicYear]);

//     const fetchData = async (schoolId, year) => {
//         try {
//             const res = await getAPI(`/getall-payroll-overtime-component/${schoolId}?academicYear=${year}`, {}, true);
//             console.log("get Response", res);


//         } catch (error) {
//             toast.error("Failed to fetch Overtime Components.");
//             console.error("Fetch error:", error);
//         }
//     };


//     const handleAddRow = () => {
//         const newEntry = {
//             id: Date.now(),
//             name: '',
//             isEditing: true,
//             isNew: true
//         };
//         setOvertimeComponents(prev => [...prev, newEntry]);
//     };

//     const handleEdit = (id) => {
//         setOvertimeComponents((prev) =>
//             prev.map((comp) =>
//                 comp.id === id ? { ...comp, isEditing: true } : { ...comp, isEditing: false }
//             )
//         );
//     };

//     const handleSave = async (id, name, isNew) => {
//         if (!name.trim()) {
//             toast.error("Component name is required.");
//             return;
//         }

//         const payload = {
//             ctcComponentName: name,
//             academicYear,
//             schoolId,
//         };

//         try {
//             if (isNew) {
//                 console.log(payload);

//                 const res = await postAPI("/create-payroll-overtime-component", payload, {}, true);
//                 console.log("response", res);
//                 if (!res.hasError) {
//                     toast.success("Overtime Component created successfully.");
//                     fetchData(schoolId, academicYear);
//                 } else {
//                     toast.error(res.message);
//                 }
//             } else {
//                 const res = await putAPI(`/update-payroll-overtime-component/${id}`, payload, {}, true);
//                 console.log("response", res);

//                 if (!res.hasError) {
//                     toast.success("Overtime Component updated successfully.");
//                     fetchData(schoolId, academicYear);
//                 } else {
//                     toast.error(res.message);
//                 }
//             }
//         } catch (err) {
//             toast.error("Something went wrong.");
//         }
//     };


//     const openDeleteDialog = (comp) => {
//         setSelectedCategory(comp);
//         setDeleteType("ctcComponents");
//         setIsDeleteDialogOpen(true);
//     };

//     const handleDeleteCancel = () => {
//         setIsDeleteDialogOpen(false);
//         setSelectedCategory(null);
//     };
//     const handleDeleteConfirmed = (id) => {
//         setOvertimeComponents(prevCat =>
//             prevCat.filter(overComponent => overComponent.id !== id)
//         );
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2 d-flex align-items-center">
//                                     <h4 className="card-title flex-grow-1 text-center">
//                                         Overtime Allowance Rate
//                                     </h4>
//                                     <div>
//                                         <select
//                                             id="yearSelect"
//                                             className="custom-select border border-dark"
//                                             aria-label="Select Year"
//                                             value={academicYear}
//                                             onChange={(e) => setAcademicYear(e.target.value)}
//                                         >
//                                             <option>2025-26</option>
//                                             <option>2026-27</option>
//                                             <option>2027-28</option>
//                                             <option>2028-29</option>
//                                             <option>2029-30</option>
//                                         </select>
//                                     </div>
//                                     <button
//                                         type="button"
//                                         className="btn btn-primary ms-2"
//                                         onClick={handleAddRow}
//                                     >
//                                         Add Row
//                                     </button>
//                                 </div>
//                             </div>
//                             <form onSubmit="">
//                                 <div className="table-responsive px-lg-6 px-md-5">
//                                     <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
//                                         <thead className="bg-light-subtle">
//                                             <tr className='payroll-table-header'>
//                                                 <th style={{ width: 20 }}>
//                                                     <div className="form-check ms-1">
//                                                         <input
//                                                             type="checkbox"
//                                                             className="form-check-input"
//                                                             id="customCheck1"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="customCheck1"
//                                                         />
//                                                     </div>
//                                                 </th>
//                                                 <th >Category</th>
//                                                 <th >Grade</th>
//                                                 <th >Rate per Day</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr className='payroll-table-body'>
//                                                 <td>
//                                                     <div className="form-check ms-1">
//                                                         <input
//                                                             type="checkbox"
//                                                             className="form-check-input"
//                                                             id={"customCheck"}
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor={"customCheck"}
//                                                         >
//                                                             &nbsp;
//                                                         </label>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <div className="col-md-8" style={{ justifySelf: "center" }}>
//                                                         <select
//                                                             id="category"
//                                                             name="category"
//                                                             className="form-control payroll-table-body payroll-input-border"
//                                                             required
//                                                         >
//                                                             <option value="">Select Category</option>
//                                                             <option value="Teaching Staff">Teaching Staff</option>
//                                                             <option value="Non-Teaching Staff">
//                                                                 Non-Teaching Staff
//                                                             </option>
//                                                         </select>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <div className="col-md-8" style={{ justifySelf: "center" }}>
//                                                         <input
//                                                             type="text"
//                                                             id="grade"
//                                                             name="grade"
//                                                             className="form-control payroll-table-body payroll-input-border"
//                                                             required
//                                                             placeholder='Enter Grade'
//                                                         />
//                                                     </div>
//                                                 </td>

//                                                 <td>
//                                                     <div className="col-md-8" style={{ justifySelf: "center" }}>
//                                                         <input
//                                                             type="text"
//                                                             id="rate"
//                                                             name="rate"
//                                                             className="form-control payroll-table-body payroll-input-border"
//                                                             required
//                                                             placeholder='Enter Rate'
//                                                         />
//                                                     </div>
//                                                 </td>
//                                             </tr>

//                                             <tr className='payroll-table-body'>
//                                                 <td>
//                                                     <div className="form-check ms-1">
//                                                         <input
//                                                             type="checkbox"
//                                                             className="form-check-input"
//                                                             id={"customCheck"}
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor={"customCheck"}
//                                                         >
//                                                             &nbsp;
//                                                         </label>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <div className="col-md-8" style={{ justifySelf: "center" }}>
//                                                         <select
//                                                             id="category"
//                                                             name="category"
//                                                             className="form-control payroll-table-body payroll-input-border"
//                                                             required
//                                                         >
//                                                             <option value="">Select Category</option>
//                                                             <option value="Teaching Staff">Teaching Staff</option>
//                                                             <option value="Non-Teaching Staff">
//                                                                 Non-Teaching Staff
//                                                             </option>
//                                                         </select>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <div className="col-md-8" style={{ justifySelf: "center" }}>
//                                                         <input
//                                                             type="text"
//                                                             id="grade"
//                                                             name="grade"
//                                                             className="form-control payroll-table-body payroll-input-border"
//                                                             required
//                                                             placeholder='Enter Grade'
//                                                         />
//                                                     </div>
//                                                 </td>

//                                                 <td>
//                                                     <div className="col-md-8" style={{ justifySelf: "center" }}>
//                                                         <input
//                                                             type="text"
//                                                             id="rate"
//                                                             name="rate"
//                                                             className="form-control payroll-table-body payroll-input-border"
//                                                             required
//                                                             placeholder='Enter Rate'
//                                                         />
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 <div className="text-end">
//                                     <button
//                                         type="submit"
//                                         className="btn btn-primary custom-submit-button"
//                                     >
//                                         Submit
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default EmployeeOvertimeAllowanceRate;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import putAPI from "../../../../../api/putAPI";

const EmployeeOvertimeAllowanceRate = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState("");
  const [dropdowns, setDropdowns] = useState({ grades: [], categories: [], designations: [] });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
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
      navigate(-1);
      return;
    }
    setSchoolId(id);
    setAcademicYear(academicYear);
    fetchAcademicYears(id);
    fetchData(id, academicYear);
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [grades, categories, designations] = await Promise.all([
          getAPI(`/getall-employee-grade/${schoolId}?academicYear=${academicYear}`, {}, true),
          getAPI(`/getall-employee-category/${schoolId}?academicYear=${academicYear}`, {}, true),
          getAPI(`/getall-employee-job-designation/${schoolId}?academicYear=${academicYear}`, {}, true),
        ]);

        if (!grades.data?.grade || grades.data.grade.length === 0) {
          toast.error(`Grades not found for ${academicYear}`);
        }

        if (!categories.data?.categories || categories.data.categories.length === 0) {
          toast.error(`Categories not found ${academicYear}`);
        }

        if (!designations.data?.designation || designations.data.designation.length === 0) {
          toast.error(`Designations not found ${academicYear}`);
        }

        setDropdowns({
          grades: grades.data?.grade || [],
          categories: categories.data?.categories || [],
          designations: designations.data?.designation || [],
        });

      } catch (err) {
        toast.error("Error fetching dropdown data");
      }
    };

    if (schoolId) {
      fetchData(schoolId, academicYear)
      fetchSettings();
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
    try {
      const res = await getAPI(`/getall-payroll-overtime-component/${schoolId}?academicYear=${year}`, {}, true);
      if (!res.hasError && res.data?.overtimeComponents) {
        const formatted = res.data.overtimeComponents.map((entry) => ({
          id: entry._id,
          category: entry.category,
          grade: entry.grade,
          rate: entry.rate,
          isEditing: false,
          isNew: false,
        }));
        setEntries(formatted);
      } else {
        toast.error(res.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to fetch overtime components.");
    }
  };

  const handleAddRow = () => {
    const newEntry = {
      id: Date.now(),
      category: "",
      grade: "",
      rate: "",
      isEditing: true,
      isNew: true,
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const handleEdit = (id) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, isEditing: true } : { ...entry, isEditing: false }
      )
    );
  };

  const handleSave = async (id, entryData, isNew) => {
    const { category, grade, rate } = entryData;
    if (!category || !grade || !rate) {
      toast.error("All fields are required.");
      return;
    }

    const payload = {
      category,
      grade,
      rate,
      academicYear,
      schoolId,
    };

    try {
      const apiCall = isNew
        ? postAPI("/create-payroll-overtime-component", payload, {}, true)
        : putAPI(`/update-payroll-overtime-component/${id}`, payload, {}, true);

      const res = await apiCall;

      if (!res.hasError) {
        toast.success(`Component ${isNew ? "created" : "updated"} successfully`);
        fetchData(schoolId, academicYear);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  const openDeleteDialog = (entry) => {
    setSelectedEntry(entry);
    setDeleteType("overtimeComponents");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedEntry(null);
  };

  const handleDeleteConfirmed = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    setIsDeleteDialogOpen(false);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = entries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(entries.length / itemsPerPage);

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
                  <div className="card-header border-0 mb-2 d-flex align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Overtime Allowance Rate
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
                    <button className="btn btn-primary ms-2" onClick={handleAddRow}>
                      Add Row
                    </button>
                  </div>
                </div>

                <div className="table-responsive px-lg-7 px-md-5">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th style={{ width: 20 }}></th>
                        <th>Category</th>
                        <th>Grade</th>
                        <th>Rate per Hour</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((entry) => (
                        <tr key={entry.id} className="payroll-table-body text-center">
                          <td>
                            <input type="checkbox" className="form-check-input" />
                          </td>
                          <td>
                            {entry.isEditing ? (
                              <select
                                className="form-select text-start"
                                value={entry.category}
                                onChange={(e) =>
                                  setEntries((prev) =>
                                    prev.map((item) =>
                                      item.id === entry.id
                                        ? { ...item, category: e.target.value }
                                        : item
                                    )
                                  )
                                }
                              >
                                <option value="">Select Category</option>
                                {dropdowns.categories.map((item) => (
                                  <option key={item._id} value={item.categoryName}>
                                    {item.categoryName}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              entry.category
                            )}
                          </td>
                          <td>
                            {entry.isEditing ? (
                              <select
                                className="form-select text-start"
                                value={entry.grade}
                                onChange={(e) =>
                                  setEntries((prev) =>
                                    prev.map((item) =>
                                      item.id === entry.id
                                        ? { ...item, grade: e.target.value }
                                        : item
                                    )
                                  )
                                }
                              >
                                <option value="">Select Grade</option>
                                {dropdowns.grades.map((item) => (
                                  <option key={item._id} value={item.gradeName}>
                                    {item.gradeName}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              entry.grade
                            )}
                          </td>
                          <td>
                            {entry.isEditing ? (
                              <input
                                type="number"
                                className="form-control payroll-input-border"
                                value={entry.rate}
                                placeholder="Enter Rate"
                                onChange={(e) =>
                                  setEntries((prev) =>
                                    prev.map((item) =>
                                      item.id === entry.id
                                        ? { ...item, rate: e.target.value }
                                        : item
                                    )
                                  )
                                }
                              />
                            ) : (
                              entry.rate
                            )}
                          </td>
                          <td>
                            {entry.isEditing ? (
                              <>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleSave(entry.id, entry, entry.isNew)}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-danger ms-2 btn-sm"
                                  onClick={() => fetchData(schoolId, academicYear)}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-soft-primary btn-sm" onClick={() => handleEdit(entry.id)}>
                                  <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
                                </button>
                                <button className="btn btn-soft-danger btn-sm" onClick={() => openDeleteDialog(entry)}>
                                  <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
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

      {isDeleteDialogOpen && selectedEntry && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedEntry.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default EmployeeOvertimeAllowanceRate;
