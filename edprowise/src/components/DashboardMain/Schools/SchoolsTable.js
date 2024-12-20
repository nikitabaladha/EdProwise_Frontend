import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const SchoolsTable = ({ schools }) => {
  const navigate = useNavigate();

  const navigateToAddNewSchool = (event) => {
    event.preventDefault();
    navigate(`/dashboard/schools/add-new-school`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(5);

  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = schools.slice(indexOfFirstSchool, indexOfLastSchool);

  const totalPages = Math.ceil(schools.length / schoolsPerPage);

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
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center gap-1 p-3">
              <h4 className="custom-card-title card-title flex-grow-1">
                All School List
              </h4>
              <Link
                onClick={(event) => navigateToAddNewSchool(event)}
                className="btn btn-sm btn-soft-primary custom-submit-button"
              >
                <FaPlus className="bx bx-plus me-1" />
                Add New School
              </Link>
            </div>
            <div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle custom-table-header">
                    <tr>
                      <th>School Id</th>
                      <th>School Name</th>
                      <th>Mobile No</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="custom-table-body">
                    {currentSchools.map((school) => (
                      <tr key={school._id}>
                        <td>{school.schoolId}</td>
                        <td>{school.schoolName}</td>
                        <td>{school.schoolMobileNo}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <a href="#!" className="btn btn-light btn-sm">
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </a>
                            <a
                              href="#!"
                              className="btn btn-soft-primary btn-sm"
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                className="align-middle fs-18"
                              />
                            </a>
                            <a href="#!" className="btn btn-soft-danger btn-sm">
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </a>
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
                      style={{ color: "#424e5a" }}
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
                        className="page-link"
                        onClick={() => handlePageClick(page)}
                        style={{
                          backgroundColor:
                            currentPage === page ? "#ff947d" : "",
                          color: currentPage === page ? "#fff" : "#424e5a",
                        }}
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
                      style={{ color: "#424e5a" }}
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
  );
};

export default SchoolsTable;
