import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const studentData = [
  {
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
    dateOfBirth: "2005-05-15",
    nationality: "India",
    gender: "Male",
    masterDefineClass: "1st",
    masterDefineShift: "Morning",
    fatherName: "John Doe Sr.",
    fatherContactNo: "1234567890",
    motherName: "Jane Doe",
    motherContactNo: "0987654321",
    currentAddress: "123 Main St, City, Country",
    cityStateCountry: "City, State, Country",
    pincode: "123456",
    previousSchoolName: "ABC School",
    previousSchoolBoard: "CBSE",
    addressOfpreviousSchool: "456 School St, City, Country",
    previousSchoolResult: "Result.pdf",
    tcCertificate: "TC.pdf",
    studentCategory: "General",
    howReachUs: "Friend",
    aadharPassportFile: "Aadhar.pdf",
    aadharPassportNumber: "1234 5678 9012",
    castCertificate: "Caste.pdf",
    agreement: true,
    name: "John Doe",
    paymentMode: "UPI",
    dateOfApplicatopnReceive: "2023-10-01",
    registrationFeesReceivedBy: "Admin",
    transationOrChequetNumber: "123456789",
    receiptNumber: "987654321",
    registrationNumber: "REG123456"
  },
  {
    firstName: "Emily",
    middleName: "Rose",
    lastName: "Williams",
    dateOfBirth: "2006-07-20",
    nationality: "India",
    gender: "Female",
    masterDefineClass: "2nd",
    masterDefineShift: "Afternoon",
    fatherName: "Michael Williams",
    fatherContactNo: "2345678901",
    motherName: "Sophia Williams",
    motherContactNo: "8765432109",
    currentAddress: "789 Park Ave, City, Country",
    cityStateCountry: "City, State, Country",
    pincode: "654321",
    previousSchoolName: "XYZ School",
    previousSchoolBoard: "ICSE",
    addressOfpreviousSchool: "123 School Rd, City, Country",
    previousSchoolResult: "Result_Emily.pdf",
    tcCertificate: "TC_Emily.pdf",
    studentCategory: "OBC",
    howReachUs: "Online",
    aadharPassportFile: "Aadhar_Emily.pdf",
    aadharPassportNumber: "5678 9012 3456",
    castCertificate: "Caste_Emily.pdf",
    agreement: true,
    name: "Emily Williams",
    paymentMode: "Bank Transfer",
    dateOfApplicatopnReceive: "2023-11-15",
    registrationFeesReceivedBy: "Admin",
    transationOrChequetNumber: "234567890",
    receiptNumber: "876543210",
    registrationNumber: "REG234567"
  },
  {
    firstName: "Rahul",
    middleName: "Kumar",
    lastName: "Sharma",
    dateOfBirth: "2007-02-10",
    nationality: "India",
    gender: "Male",
    masterDefineClass: "3rd",
    masterDefineShift: "Morning",
    fatherName: "Amit Sharma",
    fatherContactNo: "3456789012",
    motherName: "Priya Sharma",
    motherContactNo: "7654321098",
    currentAddress: "456 Elm St, City, Country",
    cityStateCountry: "City, State, Country",
    pincode: "789012",
    previousSchoolName: "PQR School",
    previousSchoolBoard: "State Board",
    addressOfpreviousSchool: "789 School Ln, City, Country",
    previousSchoolResult: "Result_Rahul.pdf",
    tcCertificate: "TC_Rahul.pdf",
    studentCategory: "SC",
    howReachUs: "Advertisement",
    aadharPassportFile: "Aadhar_Rahul.pdf",
    aadharPassportNumber: "9012 3456 7890",
    castCertificate: "Caste_Rahul.pdf",
    agreement: true,
    name: "Rahul Sharma",
    paymentMode: "Cash",
    dateOfApplicatopnReceive: "2023-12-05",
    registrationFeesReceivedBy: "Admin",
    transationOrChequetNumber: "345678901",
    receiptNumber: "765432109",
    registrationNumber: "REG345678"
  }
];


const StudentRegisterListTable = () => {
  const navigate = useNavigate();

  const navigateToRegisterStudent = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/registration-form`);
  };

  const navigateToRegisterStudentInfo = (event, student) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/registed-student-info`, {
      state: { student }, // Pass student data through state
    });
  };

  const navigateToUpdateRegisterStudentInfo=(event)=>{
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/update-registed-student-info`)
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
    <>
      {" "}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  Registered Student List
                </h4>
                <Link
                  //   onClick={() => navigateToRegisterStudent()}
                  // onClick={navigateToRegisterStudent}
                  onClick={(event) => navigateToRegisterStudent(event)}
                  className="btn btn-sm btn-primary"
                >
                  Registration Form
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
                        <th>Registration No.</th>
                        <th>Student First Name</th>
                        <th>Student Last Name</th>
                        <th>Transaction No</th>
                        <th>Date Of Recordes</th>
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
                          <td>{student.registrationNumber}</td>

                          <td>{student.firstName}</td>

                          <td>{student.lastName}</td>
                          <td>{student.transationOrChequetNumber}</td>
                          <td>{student.dateOfApplicatopnReceive}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link className="btn btn-light btn-sm"
                              onClick={(event) => navigateToRegisterStudentInfo(event, student)}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link> 
                              <Link className="btn btn-soft-primary btn-sm"
                              onClick={(event) => navigateToUpdateRegisterStudentInfo(event)}
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
    </>
  );
};

export default StudentRegisterListTable;
