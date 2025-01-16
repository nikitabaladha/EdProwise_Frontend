import React, { useState } from "react";
import { Link } from "react-router-dom";

import { exportToExcel } from "../../export-excel";

const DashboardRecentSchools = ({ schools }) => {
  const handleExport = () => {
    const filteredData = schools.map((school) => ({
      Id: school._id,
      SchoolId: school.schoolId,
      SchoolName: school.schoolName,
      MobileNo: school.schoolMobileNo,
      Email: school.schoolEmail,
      Address: school.schoolAddress,
      Location: school.schoolLocation,
      ProfileImage: school.profileImage,
      AffiliationCertificate: school.affiliationCertificate,
      AffiliationUpto: school.affiliationUpto,
      PANNumber: school.panNo,
      PanFile: school.panFile,
    }));

    exportToExcel(filteredData, "Schools", "Schools Data");
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
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center gap-1">
              <h4 className="card-title flex-grow-1">Recent Schools</h4>
              <div className="text-end">
                <Link onClick={handleExport} className="btn btn-sm btn-primary">
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
                      <th>School Id</th>
                      <th className="text-start">School Name</th>
                      <th>School Mobile No</th>
                      <th>School Email</th>
                      <th>School PAN</th>
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
    </>
  );
};

export default DashboardRecentSchools;
