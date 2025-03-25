import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const studentData = [
    {
        admissionNumber: "2023001",
        firstName: "Rahul",
        middleName: "Suresh",
        lastName: "Sharma",
        class: "10",
        section: "A",
        concessionType: "EWS",
        totalFees: 12000,
        concessionAmt: 2400, // 20% concession
        finalAmt: 9600, // Total Fees - Concession Amt
        castOrIncomeCertificate: "Income.pdf",
        applicableAcademicYear: "2023-2024",
      },
      {
        admissionNumber: "2023002",
        firstName: "Priya",
        middleName: "Ramesh",
        lastName: "Singh",
        class: "9",
        section: "B",
        concessionType: "OBC",
        totalFees: 10000,
        concessionAmt: 1500, // 15% concession
        finalAmt: 8500, // Total Fees - Concession Amt
        castOrIncomeCertificate: "cast.pdf",
        applicableAcademicYear: "2023-2024",
      },
  ];
  
 const ConcessionStudentListTable = () => {
    const navigate = useNavigate();
    
    const navigateToConcessionForm = (event) => {
      event.preventDefault();
      navigate(`/school-dashboard/fees-module/form/concession-form`);
    };
  
    const navigateToViewConcessionInfo = (event, student) => {
      event.preventDefault();
      navigate(`/school-dashboard/fees-module/form/view-concession-details`, {
        state: { student }, // Pass student data through state
      });
    };
  
    const navigateToUpdateConcessionForm=(event,student)=>{
      event.preventDefault();
      navigate(`/school-dashboard/fees-module/form/update-concession-form`,{
        state: { student },});
    }
    
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
    <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center gap-1">
                    <h4 className="card-title flex-grow-1">
                      Concession List
                    </h4>
                    <Link
                      onClick={(event) => navigateToConcessionForm(event)}
                      className="btn btn-sm btn-primary"
                    >
                      Concession Form
                    </Link>
    
                    <div className="text-end">
                      <Link className="btn btn-sm btn-outline-light">Export</Link>
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
                            <th>Admission No.</th>
                            <th>Student Name</th>
                            <th>Class</th>
                            <th>Concession Type</th>
                            <th>Total Fees</th>
                            <th>Concession Amt.</th>    
                            <th>Final Amt.</th>                   
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {studentData.map((student, index) => (
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
                              <td>{student.admissionNumber}</td>
                              <td>{student.firstName}{student.middleName}{student.lastName}</td>
                              <td>{student.class}</td>
                              <td>{student.concessionType}</td>
                              <td>{student.totalFees}</td>
                              <td>{student.concessionAmt}</td>
                              <td>{student.finalAmt}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Link className="btn btn-light btn-sm"
                                  onClick={(event) => navigateToViewConcessionInfo(event, student)}
                                  >
                                    <iconify-icon
                                      icon="solar:eye-broken"
                                      className="align-middle fs-18"
                                    />
                                  </Link> 
                                  <Link className="btn btn-soft-primary btn-sm"
                                  onClick={(event) => navigateToUpdateConcessionForm(event, student)}
                                  >
                                    <iconify-icon
                                      icon="solar:pen-2-broken"
                                      className="align-middle fs-18"
                                    />
                                  </Link>
                                  <Link className="btn btn-soft-danger btn-sm">
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
  )
}
export default ConcessionStudentListTable;
