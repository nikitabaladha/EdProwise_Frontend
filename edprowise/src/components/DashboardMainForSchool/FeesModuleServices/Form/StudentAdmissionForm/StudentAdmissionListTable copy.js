import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const studentData = [
  {
    registrationNumber: "REG001",
    firstName: "John",
    middleName: "Michael",
    lastName: "Doe",
    dateOfBirth: "2005-03-15",
    age: 18,
    nationality: "India",
    gender: "Male",
    bloodGroup: "O",
    masterDefineClass: "1st",
    streamSection: "Computer",
    masterDefineShift: "Morning",
    currentAddress: "123 Main Street, Mumbai, Maharashtra, India",
    cityStateCountry: "Mumbai, Maharashtra, India",
    pincode: "400001",
    previousSchoolName: "ABC High School",
    previousSchoolBoard: "CBSE",
    addressOfpreviousSchool: "456 Elm Street, Mumbai, Maharashtra, India",
    previousSchoolResult: "result.pdf",
    tcCertificate: "tc.pdf",
    studentCategory: "General",
    howReachUs: "Friend",
    aadharPassportFile: "aadhar.pdf",
    aadharPassportNumber: "1234 5678 9012",
    castCertificate: "caste.pdf",
    siblingInfo: {
      hasSibling: false,
      relationType: "",
      name: "",
      idCardFile: "",
    },
    familyInfo: {
      parentalStatus: "Biological Parents",
      fatherName: "Robert Doe",
      fatherContactNo: "9876543210",
      fatherQualification: "B.Tech",
      fatherProfession: "Engineer",
      motherName: "Mary Doe",
      motherContactNo: "9876543211",
      motherQualification: "M.Sc",
      motherProfession: "Teacher",
    },
    understanding: {
      agree: true,
      name: "John Doe",
      paymentMode: "UPI",
    },
    officialUse: {
      dateOfAdmission: "2023-09-01",
      admissionFeesReceivedBy: "Admin",
      transationOrChequetNumber: "123456789",
      receiptNumber: "REC001",
      admissionNumber: "ADM001",
    },
  },
  {
    registrationNumber: "REG002",
    firstName: "Jane",
    middleName: "Elizabeth",
    lastName: "Smith",
    dateOfBirth: "2006-07-22",
    age: 17,
    nationality: "India",
    gender: "Female",
    bloodGroup: "A",
    masterDefineClass: "2nd",
    streamSection: "Mechanical",
    masterDefineShift: "Afternoon",
    currentAddress: "789 Oak Street, Delhi, Delhi, India",
    cityStateCountry: "Delhi, Delhi, India",
    pincode: "110001",
    previousSchoolName: "XYZ High School",
    previousSchoolBoard: "ICSE",
    addressOfpreviousSchool: "321 Pine Street, Delhi, Delhi, India",
    previousSchoolResult: "result.pdf",
    tcCertificate: "tc.pdf",
    studentCategory: "OBC",
    howReachUs: "Advertisement",
    aadharPassportFile: "aadhar.pdf",
    aadharPassportNumber: "9876 5432 1098",
    castCertificate: "caste.pdf",
    siblingInfo: {
      hasSibling: true,
      relationType: "Brother",
      name: "Jack Smith",
      idCardFile: "id_card.pdf",
    },
    familyInfo: {
      parentalStatus: "Biological Parents",
      fatherName: "William Smith",
      fatherContactNo: "9876543212",
      fatherQualification: "MBA",
      fatherProfession: "Manager",
      motherName: "Susan Smith",
      motherContactNo: "9876543213",
      motherQualification: "B.A",
      motherProfession: "Housewife",
    },
    understanding: {
      agree: true,
      name: "Jane Smith",
      paymentMode: "Cheque",
    },
    officialUse: {
      dateOfAdmission: "2023-09-02",
      admissionFeesReceivedBy: "Admin",
      transationOrChequetNumber: "987654321",
      receiptNumber: "REC002",
      admissionNumber: "ADM002",
    },
  },
  {
    registrationNumber: "REG003",
    firstName: "Alice",
    middleName: "Marie",
    lastName: "Johnson",
    dateOfBirth: "2007-11-10",
    age: 16,
    nationality: "India",
    gender: "Female",
    bloodGroup: "AB",
    masterDefineClass: "3rd",
    streamSection: "Electric",
    masterDefineShift: "Night",
    currentAddress: "456 Maple Street, Bangalore, Karnataka, India",
    cityStateCountry: "Bangalore, Karnataka, India",
    pincode: "560001",
    previousSchoolName: "PQR High School",
    previousSchoolBoard: "State Board",
    addressOfpreviousSchool: "654 Birch Street, Bangalore, Karnataka, India",
    previousSchoolResult: "result.pdf",
    tcCertificate: "tc.pdf",
    studentCategory: "SC",
    howReachUs: "Website",
    aadharPassportFile: "aadhar.pdf",
    aadharPassportNumber: "5678 1234 9012",
    castCertificate: "caste.pdf",
    siblingInfo: {
      hasSibling: false,
      relationType: "",
      name: "",
      idCardFile: "",
    },
    familyInfo: {
      parentalStatus: "Biological Parents",
      fatherName: "Thomas Johnson",
      fatherContactNo: "9876543214",
      fatherQualification: "B.Com",
      fatherProfession: "Accountant",
      motherName: "Linda Johnson",
      motherContactNo: "9876543215",
      motherQualification: "B.Sc",
      motherProfession: "Nurse",
    },
    understanding: {
      agree: true,
      name: "Alice Johnson",
      paymentMode: "Cash",
    },
    officialUse: {
      dateOfAdmission: "2023-09-03",
      admissionFeesReceivedBy: "Admin",
      transationOrChequetNumber: "456789123",
      receiptNumber: "REC003",
      admissionNumber: "ADM003",
    },
  },
];

const StudentAdmissionListTable = () => {
  const navigate = useNavigate();
  
    const navigateToAdmission = (event) => {
      event.preventDefault();
      navigate(`/school-dashboard/fees-module/form/admission-form`);
    };
  
    const navigateToViewAdmissionInfo = (event, student) => {
      event.preventDefault();
      navigate(`/school-dashboard/fees-module/form/view-admission-details`, {
        state: { student }, // Pass student data through state
      });
    };
  
    const navigateToUpdateAdmissionForm=(event,student)=>{
      event.preventDefault();
      navigate(`/school-dashboard/fees-module/form/update-admission-form`,{
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
                      Admission List
                    </h4>
                    <Link
                      onClick={(event) => navigateToAdmission(event)}
                      className="btn btn-sm btn-primary"
                    >
                      Admission Form
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
                              <td>{student.officialUse.admissionNumber}</td>
    
                              <td>{student.firstName}</td>
    
                              <td>{student.lastName}</td>
                              <td>{student.officialUse.transationOrChequetNumber}</td>
                              <td>{student.officialUse.dateOfAdmission}</td>
                              <td>
                                <div className="d-flex gap-2">
                                  <Link className="btn btn-light btn-sm"
                                  onClick={(event) => navigateToViewAdmissionInfo(event, student)}
                                  >
                                    <iconify-icon
                                      icon="solar:eye-broken"
                                      className="align-middle fs-18"
                                    />
                                  </Link> 
                                  <Link className="btn btn-soft-primary btn-sm"
                                  onClick={(event) => navigateToUpdateAdmissionForm(event, student)}
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
export default StudentAdmissionListTable;
