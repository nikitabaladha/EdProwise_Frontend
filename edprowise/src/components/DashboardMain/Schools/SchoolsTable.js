import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";

const SchoolsTable = () => {
  const [schools, setSchools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [schoolsPerPage] = useState(5);

  useEffect(() => {
    const fetchSchools = async () => {
      const mockData = [
        { id: "SID001", name: "Vivekananda Vidhyalaya", mobile: "123456789" },
        { id: "SID002", name: "St. Paul's High School", mobile: "987654321" },
        { id: "SID003", name: "Green Valley School", mobile: "123123123" },
        { id: "SID004", name: "Sunrise Public School", mobile: "321321321" },
        { id: "SID005", name: "Harmony Academy", mobile: "456456456" },
        { id: "SID006", name: "Knowledge Hub School", mobile: "789789789" },
        {
          id: "SID007",
          name: "Springfield International School",
          mobile: "1122334455",
        },
        { id: "SID008", name: "Maple Leaf Academy", mobile: "9988776655" },
        { id: "SID009", name: "Oakridge High School", mobile: "2233445566" },
        { id: "SID010", name: "Crescent Moon School", mobile: "6677889900" },
        { id: "SID011", name: "Blue Horizon Academy", mobile: "4455667788" },
        { id: "SID012", name: "Sunshine Academy", mobile: "123456111" },
        { id: "SID013", name: "Bright Future School", mobile: "654321222" },
        { id: "SID014", name: "Vivekananda Vidhyalaya", mobile: "123456789" },
        { id: "SID015", name: "St. Paul's High School", mobile: "987654321" },
        { id: "SID016", name: "Green Valley School", mobile: "123123123" },
        { id: "SID017", name: "Sunrise Public School", mobile: "321321321" },
        { id: "SID018", name: "Harmony Academy", mobile: "456456456" },
        { id: "SID019", name: "Knowledge Hub School", mobile: "789789789" },
        {
          id: "SID020",
          name: "Springfield International School",
          mobile: "1122334455",
        },
      ];
      setSchools(mockData);
    };

    fetchSchools();
  }, []);

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
            <div className="card-header d-flex justify-content-between align-items-center gap-1">
              <h4 className="custom-card-title card-title flex-grow-1">
                All School List
              </h4>
              <a
                href="#!"
                className="btn btn-sm btn-soft-primary"
                style={{
                  backgroundColor: "#FFF0EA",
                  color: "#ff947d",
                }}
              >
                <FaPlus className="bx bx-plus me-1" />
                Create Order
              </a>
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
                      <tr key={school.id}>
                        <td>{school.id}</td>
                        <td>{school.name}</td>
                        <td>{school.mobile}</td>
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
