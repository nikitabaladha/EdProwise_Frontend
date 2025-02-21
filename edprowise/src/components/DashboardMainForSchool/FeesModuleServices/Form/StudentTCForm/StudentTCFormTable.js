import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const studentData = [
  {
    admissionNumber: "ADM001",
    registrationNumber: "TC-2023-001",
    firstName: "Rahul",
    middleName: "Sanjay",
    lastName: "Sharma",
    dateOfBirth: "2005-03-15",
    age: 18,
    nationality: "india",
    fatherName: "Sanjay Sharma",
    motherName: "Geeta Sharma",
    dateOfIssue: "2023-06-01",
    dateOfAdmission: "2019-04-05",
    studentLastClass: "XI",
    percentageObtainInLastExam: "82%",
    qualifiedPromotionInHigherClass: "Yes",
    whetherFaildInAnyClass: "No",
    anyOutstandingDues: "No",
    moralBehaviour: "Good",
    dateOfLastAttendanceAtSchool: "2023-05-30",
    reasonForLeaving: "Transfer to another city",
    anyRemarks: "N/A",
    name: "Principal Smt. Sharma",
    paymentMode: "Cheque",
    dateOfApplicationReceived: "2023-05-25",
    feesReceivedBy: "Mr. Verma",
    transationOrChequetNumber: "CHQ123456",
    receiptNumber: "RC-2023-001",
    certificateNumber: "TC-2023-001",
    Status:"Completed",
  },
  {
    admissionNumber: "ADM002",
    registrationNumber: "TC-2023-002",
    firstName: "Priya",
    middleName: "Amit",
    lastName: "Verma",
    dateOfBirth: "2006-07-22",
    age: 17,
    nationality: "india",
    fatherName: "Amit Verma",
    motherName: "Sunita Verma",
    dateOfIssue: "2023-06-05",
    dateOfAdmission: "2020-06-10",
    studentLastClass: "X",
    percentageObtainInLastExam: "91%",
    qualifiedPromotionInHigherClass: "Yes",
    whetherFaildInAnyClass: "Yes (Class VIII)",
    anyOutstandingDues: "Library dues pending",
    moralBehaviour: "Excellent",
    dateOfLastAttendanceAtSchool: "2023-06-01",
    reasonForLeaving: "Moving abroad",
    anyRemarks: "Clearance pending from library",
    name: "Principal Mr. Singh",
    paymentMode: "UPI",
    dateOfApplicationReceived: "2023-05-30",
    feesReceivedBy: "Mrs. Gupta",
    transationOrChequetNumber: "UPI123456789",
    receiptNumber: "RC-2023-002",
    certificateNumber: "TC-2023-002",
    Status:"Completed",
  },
  {
    admissionNumber: "ADM003",
    registrationNumber: "TC-2023-003",
    firstName: "Aarav",
    middleName: "Raj",
    lastName: "Patel",
    dateOfBirth: "2007-11-10",
    age: 16,
    nationality: "india",
    fatherName: "Rajesh Patel",
    motherName: "Anjali Patel",
    dateOfIssue: "2023-06-10",
    dateOfAdmission: "2021-04-15",
    studentLastClass: "IX",
    percentageObtainInLastExam: "78%",
    qualifiedPromotionInHigherClass: "Yes",
    whetherFaildInAnyClass: "No",
    anyOutstandingDues: "No",
    moralBehaviour: "Average",
    dateOfLastAttendanceAtSchool: "2023-06-05",
    reasonForLeaving: "Family reasons",
    anyRemarks: "Early withdrawal",
    name: "Principal Mr. Joshi",
    paymentMode: "Cash",
    dateOfApplicationReceived: "2023-06-01",
    feesReceivedBy: "Mr. Desai",
    transationOrChequetNumber: "CASH001",
    receiptNumber: "RC-2023-003",
    certificateNumber: "TC-2023-003",
    Status:"Completed",
  }
];

 const StudentTCFormTable = () => {
   const navigate = useNavigate();
    
      const navigateToTCForm = (event) => {
        event.preventDefault();
        navigate(`/school-dashboard/fees-module/form/trasfer-certificate-form`);
      };
    
      const navigateToViewTCInfo = (event, student) => {
        event.preventDefault();
        navigate(`/school-dashboard/fees-module/form/view-trasfer-certificate-details`, {
          state: { student }, // Pass student data through state
        });
      };
    
      const navigateToUpdateTCForm=(event,student)=>{
        event.preventDefault();
        navigate(`/school-dashboard/fees-module/form/update-trasfer-certificate-form`,{
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
                      Transfer certificate List
                    </h4>
                    <Link
                      onClick={(event) => navigateToTCForm(event)}
                      className="btn btn-sm btn-primary"
                    >
                      TC Form
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
                            <th>TC certificate No.</th>
                            <th>Admission No.</th>
                            <th>Student Name</th>
                            <th>Transaction No</th>
                            <th>Status</th>
                            {/* <th>Date Of Recordes</th> */}
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
    
                              <td>{student.registrationNumber}</td>
    
                              <td>{student.firstName}</td>
                              <td>{student.transationOrChequetNumber}</td>
                              <td>{student.Status}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Link className="btn btn-light btn-sm"
                                  onClick={(event) => navigateToViewTCInfo(event, student)}
                                  >
                                    <iconify-icon
                                      icon="solar:eye-broken"
                                      className="align-middle fs-18"
                                    />
                                  </Link> 
                                  <Link className="btn btn-soft-primary btn-sm"
                                  onClick={(event) => navigateToUpdateTCForm(event, student)}
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
export default StudentTCFormTable;
