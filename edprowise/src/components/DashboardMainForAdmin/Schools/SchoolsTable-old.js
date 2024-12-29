import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import ConfirmationDialog from "../../ConfirmationDialog";
const SchoolsTable = ({
  schools,
  setSchools,
  selectedSchool,
  setSelectedSchool,
}) => {
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");

  const openDeleteDialog = (school) => {
    setSelectedSchool(school);
    setIsDeleteDialogOpen(true);
    setDeleteType("school");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedSchool(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setSchools((prevSchools) =>
      prevSchools.filter((school) => school._id !== _id)
    );
  };

  const navigateToAddNewSchool = (event) => {
    event.preventDefault();
    navigate(`/admin-dashboard/schools/add-new-school`);
  };

  const navigateToViewSchool = (event, school) => {
    event.preventDefault();
    navigate(`/admin-dashboard/schools/view-school`, { state: { school } });
  };

  const navigateToUpdateSchool = (event, school) => {
    event.preventDefault();
    navigate(`/admin-dashboard/schools/update-school`, { state: { school } });
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
    <>
      {" "}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All School List</h4>
                <Link
                  onClick={(event) => navigateToAddNewSchool(event)}
                  className="btn btn-sm btn-primary"
                >
                  Add School
                </Link>
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-outline-light"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    This Month <MdKeyboardArrowDown />
                  </button>

                  <div className="dropdown-menu dropdown-menu-end">
                    {/* item*/}
                    <Link to="" className="dropdown-item">
                      Download
                    </Link>
                    {/* item*/}
                    <Link to="" className="dropdown-item">
                      Export
                    </Link>
                    {/* item*/}
                    <Link to="" className="dropdown-item">
                      Import
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered">
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
                        <th>School Id</th>
                        <th>School Name</th>
                        <th>School Mobile No</th>
                        <th>School Email</th>
                        <th>School PAN</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSchools.map((school) => (
                        <tr key={school._id}>
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
                          <td>{school.schoolId}</td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="rounded bg-light d-flex align-items-center justify-content-center">
                                <img
                                  src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`}
                                  alt={`${school.schoolName} Profile`}
                                  className="avatar-md"
                                  style={{
                                    objectFit: "cover",
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "10px",
                                  }}
                                />
                              </div>
                              <div>{school.schoolName}</div>
                            </div>
                          </td>

                          <td>{school.schoolMobileNo}</td>
                          <td>{school.schoolEmail}</td>
                          <td>{school.panNo}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(event) =>
                                  navigateToViewSchool(event, school)
                                }
                                className="btn btn-light btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                onClick={(event) =>
                                  navigateToUpdateSchool(event, school)
                                }
                                className="btn btn-soft-primary btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-danger btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  openDeleteDialog(school);
                                }}
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
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedSchool._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default SchoolsTable;
