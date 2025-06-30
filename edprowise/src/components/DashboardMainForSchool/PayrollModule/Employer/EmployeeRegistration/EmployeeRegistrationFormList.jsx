import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";
import ConfirmationDialog from "../../../../ConfirmationDialog";

const studentData = [

];

const EmployeeRegistrationFormList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleteType, setDeleteType] = useState("");

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
    setEmployeeList(prevCat =>
      prevCat.filter(grade => grade._id !== _id)
    );
  };


 
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);

    const fetchEmployees = async () => {
      try {
        const response = await getAPI(`/get-employee-registration/${id}`);
        if (!response.hasError && response.data?.data) {
          setEmployeeList(response.data.data);
        } else {
          toast.error("No employee data found.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching employees.");
      }
    };

    fetchEmployees();
  }, []);

  const navigateToRegisterEmployee = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/payroll-module/employer/employee-registration/new-employee-registration`, {
      state: { schoolId }
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
  const [currentPage, setCurrentPage] = useState(1);
  const [studentListPerPage] = useState(5);

  const indexOfLastStudent = currentPage * studentListPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentListPerPage;
  const currentStudent = studentData.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(studentData.length / studentListPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageRange = 1;

  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header d-flex align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Registered Empolyee List
                    </h4>
                    <Link
                      onClick={(event) => navigateToRegisterEmployee(event)}
                      className="btn btn-sm btn-primary"
                    >
                      Add New Employee
                    </Link>

                    <div className="text-end">
                      <Link className="text-primary text-end ms-3">
                        Export
                        <i className="bx bx-export ms-1"></i>
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
                          <th>Employee ID.</th>
                          <th>Employee Name</th>
                          <th>Contact No</th>
                          <th>Email ID</th>
                          <th>Job Designation</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeList.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">No employees found</td>
                          </tr>
                        ) : (
                          employeeList.map((employee, index) => (
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
                                    <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                                  </Link>
                                  <Link className="btn btn-soft-primary btn-sm"
                                    onClick={(event) => navigateToUpdateRegisterInfo(event, employee)}
                                  >
                                    <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
                                  </Link>
                                  <Link className="btn btn-soft-danger btn-sm" onClick={() => openDeleteDialog(employee)}>
                                    <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
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
                <div className="card-footer border-top">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end mb-0">
                      <li className="page-item">
                        <button
                          className="page-link"
                        // onClick={handlePreviousPage}
                        // disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      <li
                        className={`page-item`}
                      >
                        <button
                          className={`page-link pagination-button `}
                        //   onClick={() => handlePageClick(page)}
                        >
                          1
                        </button>
                      </li>

                      <li className="page-item">
                        <button
                          className="page-link"
                        // onClick={handleNextPage}
                        // disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
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
  )
}

export default EmployeeRegistrationFormList