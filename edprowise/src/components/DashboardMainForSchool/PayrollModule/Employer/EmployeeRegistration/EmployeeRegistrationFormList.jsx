
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";
import ConfirmationDialog from "../../../../ConfirmationDialog";

const EmployeeRegistrationFormList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]); 
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openDeleteDialog = (comp) => {
    setSelectedEmployee(comp);
    setDeleteType("employee");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedEmployee(null);
  };
  
  const handleDeleteConfirmed = (_id) => {
    setEmployeeList(prev => prev.filter(emp => emp._id !== _id));
    setFilteredList(prev => prev.filter(emp => emp._id !== _id));
  };

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

    const fetchEmployees = async () => {
      try {
        const response = await getAPI(`/get-employee-registration/${id}?academicYear=${academicYear}`);
        if (!response.hasError && response.data?.data) {
          setEmployeeList(response.data.data);
          setFilteredList(response.data.data); 
        } else {
          toast.error("No employee data found.");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong while fetching employees.");
      }
    };

    fetchEmployees();
  }, []);

  // Search handler
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredList(employeeList);
    } else {
      setFilteredList(
        employeeList.filter(emp =>
          emp.employeeId?.toLowerCase().includes(value) ||
          emp.employeeName?.toLowerCase().includes(value) ||
          emp.contactNumber?.toString().includes(value) ||
          emp.emailId?.toLowerCase().includes(value) ||
          emp.jobDesignation?.toLowerCase().includes(value)
        )
      );
    }
    setCurrentPage(1); 
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };
  
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const navigateToRegisterEmployee = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/payroll-module/employer/employee-registration/new-employee-registration`, {
      state: { schoolId, academicYear }
    });
  };

  const navigateToRegisterInfo = (event, employee) => {
    event.preventDefault();
    navigate("/school-dashboard/payroll-module/employer/employee-registration/view-employee-registration", {
      state: { employee }
    });
  };

  const navigateToUpdateRegisterInfo = (event, employee) => {
    event.preventDefault();
    navigate("/school-dashboard/payroll-module/employer/employee-registration/update-employee-registration", {
      state: { employee }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h4 className="card-title text-center flex-grow-1">Registered Employee List</h4>

                    {/* Search box */}
                    <input
                      type="text"
                      className="form-control form-control-sm me-2"
                      style={{ maxWidth: "200px" }}
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />

                    <Link
                      onClick={navigateToRegisterEmployee}
                      className="btn btn-sm btn-primary ms-2"
                    >
                      Add New Employee
                    </Link>

                    <div className="text-end">
                      <Link className="text-primary text-end ms-3">
                        Export <i className="bx bx-export ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                      <thead className="bg-light-subtle">
                        <tr className='payroll-table-header'>
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
                          <th>Employee ID</th>
                          <th>Employee Name</th>
                          <th>Contact No</th>
                          <th>Email ID</th>
                          <th>Job Designation</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.length === 0 ? (
                          <tr>
                            <td colSpan="6">No employees found</td>
                          </tr>
                        ) : (
                          currentItems.map((employee, index) => (
                            <tr key={employee._id}>
                              <td>
                                 <div className="form-check ms-1">
                                   <input
                                     type="checkbox"
                                     className="form-check-input"
                                     id={`check-${index}`}
                                   />
                                 </div>
                               </td>
                              <td>{employee.employeeId || `EMP-${index + 1}`}</td>
                              <td>{employee.employeeName || '-'}</td>
                              <td>{employee.contactNumber || '-'}</td>
                              <td>{employee.emailId || '-'}</td>
                              <td>{employee.jobDesignation || '-'}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Link className="btn btn-light btn-sm"
                                    onClick={(event) => navigateToRegisterInfo(event, employee)}
                                  >
                                    <iconify-icon icon="solar:eye-broken" className="align-middle fs-18"/>
                                  </Link>
                                  <Link className="btn btn-soft-primary btn-sm"
                                    onClick={(event) => navigateToUpdateRegisterInfo(event, employee)}
                                  >
                                    <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18"/>
                                  </Link>
                                  <Link className="btn btn-soft-danger btn-sm" onClick={() => openDeleteDialog(employee)}>
                                    <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18"/>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pagination */}
                {/* {totalPages > 1 && ( */}
                  <div className="card-footer border-top">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-end mb-0">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                            <button className="page-link pagination-button" onClick={() => handlePageClick(page)}>{page}</button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={handleNextPage}>Next</button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && selectedEmployee && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedEmployee._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
}

export default EmployeeRegistrationFormList;
