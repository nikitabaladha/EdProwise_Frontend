import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import putAPI from "../../../../../api/putAPI";

const DefineEmployeeJobDesignation = () => {
  const [designation, setDesignation] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState("2025-26");
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
      const res = await getAPI(`/getall-employee-job-designation/${schoolId}?academicYear=${year}`, {}, true);
      console.log("get Response", res);

      if (!res.hasError && res.data?.designation) {
        const formatted = res.data.designation.map((cat) => ({
          id: cat._id,
          name: cat.designationName,
          isEditing: false,
          isNew: false,
        }));
        setDesignation(formatted);
        // setCurrentPage(1);
      } else {
        toast.error(res.message || "Something went wrong while fetching.");
      }
    } catch (error) {
      toast.error("Failed to fetch Designation.");
      console.error("Fetch error:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = designation.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(designation.length / itemsPerPage);

  // Pagination logic

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handlePageClick = (page) => setCurrentPage(page);



  const handleAddRow = () => {
    const newEntry = {
      id: Date.now(),
      name: '',
      isEditing: true,
      isNew: true
    };
    setDesignation(prev => [...prev, newEntry]);
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
      toast.error("Job Designation name is required.");
      return;
    }

    const payload = {
      designationName: name,
      academicYear,
      schoolId,
    };

    try {
      if (isNew) {
        console.log(payload);

        const res = await postAPI("/create-employee-job-designation", payload, {}, true);
        console.log("response", res);
        if (!res.hasError) {
          toast.success("Job designation created successfully.");
          fetchData(schoolId, academicYear);
        } else {
          toast.error(res.message);
        }
      } else {
        const res = await putAPI(`/update-employee-job-designation/${id}`, payload, {}, true);
        console.log("response", res);

        if (!res.hasError) {
          toast.success("Designation updated successfully.");
          fetchData(schoolId, academicYear);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };


  const openDeleteDialog = (comp) => {
    setSelectedCategory(comp);
    setDeleteType("employeeJobDesignation");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };
  const handleDeleteConfirmed = (id) => {
    setDesignation(prevCat =>
      prevCat.filter(desig => desig.id !== id)
    );
  };

  
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
                      Job Designation
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
                        <th>Designation</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((comp) => (
                        <tr key={comp.id} className='payroll-table-body text-center'>
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
                                        item.id === comp.id ? { ...item, name: e.target.value } : item
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
                                onClick={() => handleSave(comp.id, comp.name, comp.isNew)}
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

                                <button className="btn btn-soft-danger btn-sm" onClick={() => openDeleteDialog(comp)}>
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

export default DefineEmployeeJobDesignation;
