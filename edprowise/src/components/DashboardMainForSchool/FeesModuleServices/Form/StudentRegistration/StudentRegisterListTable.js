import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const studentArray = [
    {
      registrationNo: "REG12345",
      firstName: "John",
      lastName: "Doe",
      transactionNo: "TXN987654",
      dateOfRecord: "2025-02-11"
    },
    {
      registrationNo: "REG12346",
      firstName: "Jane",
      lastName: "Smith",
      transactionNo: "TXN987655",
      dateOfRecord: "2025-02-10"
    },
    {
      registrationNo: "REG12347",
      firstName: "Michael",
      lastName: "Brown",
      transactionNo: "TXN987656",
      dateOfRecord: "2025-02-09"
    },
    {
      registrationNo: "REG12348",
      firstName: "Emily",
      lastName: "Clark",
      transactionNo: "TXN987657",
      dateOfRecord: "2025-02-08"
    },
    {
      registrationNo: "REG12349",
      firstName: "David",
      lastName: "Johnson",
      transactionNo: "TXN987658",
      dateOfRecord: "2025-02-07"
    }
  ];

const StudentRegisterListTable = () => {
  const navigate = useNavigate();
 
  const navigateToRegisterStudent = (event) => {
    navigate(`/school-dashboard/fees-module/registration-form`);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [studentListPerPage] = useState(5);

  const indexOfLastStudent = currentPage * studentListPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentListPerPage;
  const currentStudent = studentArray.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(studentArray.length / studentListPerPage);

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
      {" "}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">Registered Student List</h4>
                <Link
                //   onClick={() => navigateToRegisterStudent()}
                // onClick={navigateToRegisterStudent} 
                onClick={(event) => navigateToRegisterStudent(event)}
                  className="btn btn-sm btn-primary"
                >
                Registration Form
                </Link>

                <div className="text-end">
                  <Link
                    
                    className="btn btn-sm btn-outline-light"
                  >
                    Export
                  </Link>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr>
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
                        <th>Registration No.</th>
                        <th >Student First Name</th>
                        <th>Student Last Name</th>
                        <th>Transaction No</th>
                        <th>Date Of Recordes</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentArray.map((student,index) => (
                        <tr key={index}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customCheck2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customCheck2"
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{student.registrationNo}</td>

                          <td>
                            {student.firstName}
                          </td>

                          <td>{student.lastName}</td>
                          <td>{student.transactionNo}</td>
                          <td>{student.dateOfRecord}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                className="btn btn-light btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                            
                                className="btn btn-soft-primary btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-danger btn-sm"
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
              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {pagesToShow.map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className={`page-link pagination-button ${
                            currentPage === page ? "active" : ""
                          }`}
                          onClick={() => handlePageClick(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
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
      
    </>
  );
};

export default StudentRegisterListTable;
