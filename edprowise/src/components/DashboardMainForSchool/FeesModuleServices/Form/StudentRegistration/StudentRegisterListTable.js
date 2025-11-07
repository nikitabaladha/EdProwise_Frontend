

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import getAPI from "../../../../../api/getAPI";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import RegistrationExcelSheetModal from "./ExcelSheetModal";
// import PaymentModal from "./PaymentModal";
// import * as XLSX from "xlsx";
// import { generatePDF } from "./generateStudentPDF";
// import { generatePDFOffical } from "./generateStudentPDFOfficial";

// const StudentRegisterListTable = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [studentData, setStudentData] = useState([]);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [deleteType, setDeleteType] = useState("");
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [classList, setClassList] = useState([]);
//   const [academicYears, setAcademicYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
//   const [loadingYears, setLoadingYears] = useState(false);
//   const [showImportModal, setShowImportModal] = useState(false);
//   const [shifts, setShifts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [openDropdownId, setOpenDropdownId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [studentListPerPage] = useState(10);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [selectedStudentId, setSelectedStudentId] = useState(null);

//   useEffect(() => {
//     const fetchAcademicYears = async () => {
//       try {
//         setLoadingYears(true);
//         const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//         const schoolId = userDetails?.schoolId;
//         const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
//         setAcademicYears(response.data.data || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoadingYears(false);
//       }
//     };

//     fetchAcademicYears();
//   }, []);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const id = userDetails?.schoolId;

//     if (!id) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }

//     setSchoolId(id);
//   }, []);

//   useEffect(() => {
//     if (!schoolId || !selectedYear) return;

//     const fetchStudents = async () => {
//       try {
//         const response = await getAPI(`/get-registartion-form/${schoolId}/${selectedYear}`);
//         const classRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
//         if (!classRes.hasError) {
//           setClassList(classRes.data.data);
//         }
//         const shiftResponse = await getAPI(`/master-define-shift/${schoolId}`);
//         if (!shiftResponse.hasError) {
//           const shiftArray = Array.isArray(shiftResponse.data?.data) ? shiftResponse.data.data : [];
//           setShifts(shiftArray);
//         } else {
//           toast.error(shiftResponse.message || "Failed to fetch shifts.");
//           setShifts([]);
//         }

//         if (!response.hasError) {
//           // Create a map for receipt data
//           const receiptMap = new Map();
//           response.data.receiptData?.forEach(item => {
//             // Flatten refundreceiptNumbers arrays and filter out empty arrays
//             const refundReceipts = item.refundreceiptNumbers
//               ?.flat()
//               .filter(num => num && num !== "") || [];
//             receiptMap.set(item._id, {
//               receiptNumbers: item.receiptNumbers || [],
//               refundReceiptNumbers: refundReceipts,
//               reportStatus: item.reportStatus || [[]],
//             });
//           });

//           const studentArrayWithReceipts = Array.isArray(response.data.students)
//             ? response.data.students
//                 .map(student => ({
//                   ...student,
//                   allReceiptNumbers: receiptMap.get(student._id)?.receiptNumbers || [student.receiptNumber || ""].filter(Boolean),
//                   refundReceiptNumbers: receiptMap.get(student._id)?.refundReceiptNumbers || student.refundReceiptNumbers || [],
//                   reportStatus: receiptMap.get(student._id)?.reportStatus || student.reportStatus || [[]],
//                 }))
//                 .sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate))
//             : [];

//           setStudentData(studentArrayWithReceipts);
//         } else {
//           toast.error(response.message || "Failed to fetch student list.");
//         }
//       } catch (err) {
//         toast.error("Error fetching student data.");
//         console.error("Student Fetch Error:", err);
//       }
//     };

//     fetchStudents();
//   }, [schoolId, selectedYear]);

//   const handleImportSuccess = async () => {
//     try {
//       const response = await getAPI(`/get-registartion-form/${schoolId}/${selectedYear}`);
//       if (!response.hasError) {
//         const studentArray = Array.isArray(response.data.students) ? response.data.students : [];
//         setStudentData(studentArray.sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate)));
//       } else {
//         toast.error(response.message || "Failed to fetch student list.");
//       }
//     } catch (err) {
//       toast.error("Error refreshing student data.");
//     }
//   };

//   const handleExport = () => {
//     const exportData = studentData.map((student) => ({
//       "Date of Receipts": student.paymentDate
//         ? new Date(student.paymentDate).toLocaleDateString("en-GB")
//         : "",
//       "Registration No.": student.registrationNumber || "",
//       "First Name": student.firstName || "",
//       "Middle Name": student.middleName || "",
//       "Last Name": student.lastName || "",
//       "Date of Birth": student.dateOfBirth
//         ? new Date(student.dateOfBirth).toLocaleDateString("en-GB")
//         : "",
//       Age: student.age || "",
//       Nationality: student.nationality || "",
//       Gender: student.gender || "",
//       "Blood Group": student.bloodGroup || "",
//       "Mother Tongue": student.motherTongue || "",
//       Class: getClassNameById(student.masterDefineClass),
//       Shift: getShiftName(student.masterDefineShift),
//       "Parental Status": student.parentalStatus || "",
//       "Father Name": student.fatherName || "",
//       "Father Contact No": student.fatherContactNo || "",
//       "Father Qualification": student.fatherQualification || "",
//       "Father Profession": student.fatherProfession || "",
//       "Mother Name": student.motherName || "",
//       "Mother Contact No": student.motherContactNo || "",
//       "Mother Qualification": student.motherQualification || "",
//       "Mother Profession": student.motherProfession || "",
//       "Current Address": student.currentAddress || "",
//       Country: student.country || "",
//       State: student.state || "",
//       City: student.city || "",
//       Pincode: student.pincode || "",
//       "Parent Contact Number": student.parentContactNumber || "",
//       "Previous School Name": student.previousSchoolName || "",
//       "Previous School Board": student.previousSchoolBoard || "",
//       "Address of Previous School": student.addressOfPreviousSchool || "",
//       "Aadhar/Passport Number": student.aadharPassportNumber || "",
//       "Student Category": student.studentCategory || "",
//       "Relation Type": student.relationType || "",
//       "Sibling Name": student.siblingName || "",
//       "How Reach Us": student.howReachUs || "",
//       "Registration Fee": student.registrationFee || "",
//       "Concession Type": student.concessionType || "",
//       "Concession Amount": student.concessionAmount || "",
//       "Final Amount": student.finalAmount || "",
//       "Payment Mode": student.paymentMode && student.paymentMode !== "null" ? student.paymentMode : "",
//       "Cheque Number": student.chequeNumber || "",
//       "Bank Name": student.bankName || "",
//       Status: getLatestStatus(student.reportStatus), // Use latest status
//       "Transaction Number": student.transactionNumber || "",
//       "Receipt Number": student.receiptNumber || "",
//       "Payment Date": student.paymentDate
//         ? new Date(student.paymentDate).toLocaleDateString("en-GB")
//         : "",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

//     XLSX.writeFile(workbook, `Registered_Student_List_${selectedYear}.xlsx`);
//   };

//   const openDeleteDialog = (request) => {
//     setSelectedRequest(request);
//     setIsDeleteDialogOpen(true);
//     setDeleteType("registrationform");
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//   };

//   const handleDeleteConfirmed = (_id) => {
//     setStudentData((prevRequests) =>
//       prevRequests.filter((request) => request._id !== _id)
//     );
//   };

//   const getClassNameById = (id) => {
//     const found = classList.find((cls) => cls._id === id);
//     return found ? found.className : "N/A";
//   };

//   const getShiftName = (shiftId) => {
//     const shift = shifts.find((s) => s._id === shiftId);
//     return shift ? shift.masterDefineShiftName : "N/A";
//   };

//   const navigateToRegisterStudent = (event) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/registration-form`);
//   };

//   const navigateToRegisterStudentInfo = (event, student) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/registed-student-info`, {
//       state: { student },
//     });
//   };

//   const navigateToUpdateRegisterStudentInfo = (event, student) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/update-registed-student-info`, {
//       state: { student },
//     });
//   };

//   const navigateToFeesReceipt = (event, receiptNumber, studentId, student) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/registration-form/receipts`, {
//       state: {
//         receiptNumber,
//         schoolId,
//         studentId,
//         className: getClassNameById(student.masterDefineClass),
//       },
//     });
//   };

//   const navigateToCRNReceipt = (event, crnNumber) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/crn-receipts`, {
//       state: {
//         crnNumber,
//       },
//     });
//   };

//   const handleDownloadPDF = async (student, pdfType) => {
//     setIsGenerating(true);
//     try {
//       if (pdfType === "official") {
//         await generatePDFOffical(schoolId, student, getClassNameById, getShiftName);
//       } else if (pdfType === "student") {
//         await generatePDF(schoolId, student, getClassNameById, getShiftName);
//       }
//     } catch (error) {
//       toast.error(`Failed to generate ${pdfType} PDF.`);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const toggleDropdown = (studentId) => {
//     setOpenDropdownId(openDropdownId === studentId ? null : studentId);
//   };

//   const openPaymentModal = (studentId) => {
//     const student = studentData.find((s) => s._id === studentId);
//     if (student) {
//       setSelectedStudentId(studentId);
//       setShowPaymentModal(true);
//     } else {
//       toast.error("Student not found.");
//     }
//   };

//   const handlePaymentSuccess = async () => {
//     try {
//       const response = await getAPI(`/get-registartion-form/${schoolId}/${selectedYear}`);
//       if (!response.hasError) {
//         const studentArray = Array.isArray(response.data.students) ? response.data.students : [];
//         setStudentData(studentArray.sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate)));
//       } else {
//         toast.error(response.message || "Failed to fetch student list.");
//       }
//     } catch (err) {
//       toast.error("Error refreshing student data.");
//     }
//   };

//   // Helper function to determine if the payment button should be shown
//   const shouldShowPaymentButton = (reportStatus) => {
//     if (!reportStatus || !Array.isArray(reportStatus) || reportStatus.length === 0) {
//       return true; // Show button if no reportStatus (e.g., no payment made yet)
//     }

//     // Flatten the reportStatus array (since it might be nested)
//     const flatStatus = reportStatus.flat();
//     const latestStatus = flatStatus[flatStatus.length - 1];

//     // Show the payment button if the latest status is "Cancelled", "Cheque Return", or "Refund"
//     return ["Cancelled", "Cheque Return", "Refund"].includes(latestStatus);
//   };

//   // Helper function to get the latest status for display
//   const getLatestStatus = (reportStatus) => {
//     if (!reportStatus || !Array.isArray(reportStatus) || reportStatus.length === 0) {
//       return "Pending"; // Default status if no reportStatus
//     }

//     // Flatten the reportStatus array and get the latest status
//     const flatStatus = reportStatus.flat();
//     return flatStatus[flatStatus.length - 1] || "Pending";
//   };

//   const filteredStudents = studentData.filter(student => {
//     const searchLower = searchQuery.toLowerCase();
//     return (
//       (student.paymentDate
//         ? new Date(student.paymentDate).toLocaleDateString("en-GB").replace(/\//g, "-")
//         : "").toLowerCase().includes(searchLower) ||
//       (student.registrationNumber || "").toLowerCase().includes(searchLower) ||
//       `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchLower) ||
//       (student.gender || "").toLowerCase().includes(searchLower) ||
//       getClassNameById(student.masterDefineClass).toLowerCase().includes(searchLower) ||
//       getShiftName(student.masterDefineShift).toLowerCase().includes(searchLower) ||
//       (student.parentContactNumber || "").toLowerCase().includes(searchLower) ||
//       getLatestStatus(student.reportStatus).toLowerCase().includes(searchLower) ||
//       (student.refundReceiptNumbers?.join(", ") || "").toLowerCase().includes(searchLower)
//     );
//   });

//   const indexOfLastStudent = currentPage * studentListPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentListPerPage;
//   const currentStudent = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

//   const totalPages = Math.ceil(filteredStudents.length / studentListPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   const pageRange = 1;
//   const startPage = Math.max(1, currentPage - pageRange);
//   const endPage = Math.min(totalPages, currentPage + pageRange);
//   const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="d-flex justify-content-end mb-2 gap-2 align-items-center">
//           <Link
//             onClick={(event) => navigateToRegisterStudent(event)}
//             className="btn btn-sm btn-primary"
//           >
//             Add Registration Form
//           </Link>
//           <button
//             className="btn btn-sm btn-secondary"
//             onClick={() => setShowImportModal(true)}
//           >
//             Import
//           </button>
//           <button
//             className="btn btn-sm btn-secondary"
//             onClick={handleExport}
//           >
//             Export
//           </button>
//         </div>
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="card">
//               <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                 <h4 className="card-title flex-grow-1">Registered Student List</h4>
//                 <div className="d-none d-md-block">
//                   <input
//                     type="text"
//                     className="form-control form-control-sm"
//                     placeholder="Search by any field"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     style={{ width: "200px" }}
//                   />
//                 </div>
//                 <select
//                   className="form-select form-select-sm w-auto"
//                   value={selectedYear}
//                   onChange={(e) => {
//                     setSelectedYear(e.target.value);
//                     localStorage.setItem("selectedAcademicYear", e.target.value);
//                   }}
//                   disabled={loadingYears}
//                 >
//                   <option value="" disabled>Select Year</option>
//                   {academicYears.map((year) => (
//                     <option key={year._id} value={year.academicYear}>
//                       {year.academicYear}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <div className="table-responsive">
//                   <table className="table align-middle mb-0 table-centered text-center text-nowrap">
//                     <thead className="bg-light-subtle">
//                       <tr>
//                         <th style={{ width: 20 }}>
//                           <div className="form-check ms-1">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               id="customCheck1"
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor="customCheck1"
//                             />
//                           </div>
//                         </th>
//                         <th>Date of Receipts</th>
//                         <th>Registration No.</th>
//                         <th>Student Name</th>
//                         <th>Gender</th>
//                         <th>Class</th>
//                         <th>Shift</th>
//                         <th>Contact No</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentStudent.map((student, index) => (
//                         <tr key={index}>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id={`customCheck${index + 2}`}
//                               />
//                               <label
//                                 className="form-check-label"
//                                 htmlFor={`customCheck${index + 2}`}
//                               />
//                             </div>
//                           </td>
//                           <td>
//                             {student.paymentDate
//                               ? new Date(student.paymentDate)
//                                   .toLocaleDateString("en-GB")
//                                   .replace(/\//g, "-")
//                               : ""}
//                           </td>
//                           <td>{student.registrationNumber || "N/A"}</td>
//                           <td>
//                             {student.firstName} {student.lastName}
//                           </td>
//                           <td>{student.gender}</td>
//                           <td>{getClassNameById(student.masterDefineClass)}</td>
//                           <td>{getShiftName(student.masterDefineShift)}</td>
//                           <td>{student.parentContactNumber}</td>
//                           <td>
//                             <button
//                               className={`btn btn-sm ${
//                                 getLatestStatus(student.reportStatus) === "Paid"
//                                   ? "btn-success"
//                                   : "btn-danger"
//                               }`}
//                             >
//                               {getLatestStatus(student.reportStatus)}
//                             </button>
//                           </td>
//                           <td>
//                             <div className="d-flex gap-2">
//                               <Link
//                                 className="btn btn-light btn-sm"
//                                 onClick={(event) =>
//                                   navigateToRegisterStudentInfo(event, student)
//                                 }
//                               >
//                                 <iconify-icon
//                                   icon="solar:eye-broken"
//                                   className="align-middle fs-18"
//                                 />
//                               </Link>
//                               <Link
//                                 className="btn btn-soft-primary btn-sm"
//                                 onClick={(event) =>
//                                   navigateToUpdateRegisterStudentInfo(event, student)
//                                 }
//                               >
//                                 <iconify-icon
//                                   icon="solar:pen-2-broken"
//                                   className="align-middle fs-18"
//                                 />
//                               </Link>
//                               <Link
//                                 className="btn btn-soft-danger btn-sm"
//                                 onClick={(e) => {
//                                   e.preventDefault();
//                                   openDeleteDialog(student);
//                                 }}
//                               >
//                                 <iconify-icon
//                                   icon="solar:trash-bin-minimalistic-2-broken"
//                                   className="align-middle fs-18"
//                                 />
//                               </Link>
//                               {shouldShowPaymentButton(student.reportStatus) && (
//                                 <Link
//                                   className="btn btn-soft-warning btn-sm"
//                                   onClick={() => openPaymentModal(student._id)}
//                                 >
//                                   <iconify-icon
//                                     icon="solar:wallet-money-broken"
//                                     className="align-middle fs-18"
//                                   />
//                                 </Link>
//                               )}
//                               <div className="dropdown">
//                                 <Link
//                                   className="btn btn-soft-success btn-sm"
//                                   onClick={() => toggleDropdown(student._id)}
//                                 >
//                                   <iconify-icon
//                                     icon="solar:download-minimalistic-broken"
//                                     className="align-middle fs-18"
//                                   />
//                                 </Link>
//                                 {openDropdownId === student._id && (
//                                   <div
//                                     className="dropdown-menu dropdown-menu-end show"
//                                     style={{ position: "absolute", zIndex: 1000 }}
//                                   >
//                                     {student.allReceiptNumbers?.length > 0 ? (
//                                       student.allReceiptNumbers.map((receiptNum, idx) => (
//                                         <button
//                                           key={idx}
//                                           className="dropdown-item"
//                                           onClick={(event) => {
//                                             navigateToFeesReceipt(event, receiptNum, student._id, student);
//                                             setOpenDropdownId(null);
//                                           }}
//                                         >
//                                           Download {receiptNum}
//                                         </button>
//                                       ))
//                                     ) : (
//                                       <button className="dropdown-item" disabled>
//                                         No Receipts
//                                       </button>
//                                     )}
//                                     {student.refundReceiptNumbers?.length > 0 ? (
//                                       student.refundReceiptNumbers.map((crnNumber, idx) => (
//                                         <button
//                                           key={idx}
//                                           className="dropdown-item"
//                                           onClick={(event) => {
//                                             navigateToCRNReceipt(event, crnNumber);
//                                             setOpenDropdownId(null);
//                                           }}
//                                         >
//                                           Download {crnNumber}
//                                         </button>
//                                       ))
//                                     ) : (
//                                       <button className="dropdown-item" disabled>
//                                         No CRN Receipts
//                                       </button>
//                                     )}
//                                     <button
//                                       className="dropdown-item"
//                                       onClick={() => {
//                                         handleDownloadPDF(student, "official");
//                                         setOpenDropdownId(null);
//                                       }}
//                                       disabled={isGenerating}
//                                     >
//                                       {isGenerating ? "Generating..." : "Download Form PDF-Official"}
//                                     </button>
//                                     <button
//                                       className="dropdown-item"
//                                       onClick={() => {
//                                         handleDownloadPDF(student, "student");
//                                         setOpenDropdownId(null);
//                                       }}
//                                       disabled={isGenerating}
//                                     >
//                                       {isGenerating ? "Generating..." : "Download Form PDF-Student"}
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               <div className="card-footer border-top">
//                 <nav aria-label="Page navigation example">
//                   <ul className="pagination justify-content-end mb-0">
//                     <li className="page-item">
//                       <button
//                         className="page-link"
//                         onClick={handlePreviousPage}
//                         disabled={currentPage === 1}
//                       >
//                         Previous
//                       </button>
//                     </li>
//                     {pagesToShow.map((page) => (
//                       <li
//                         key={page}
//                         className={`page-item ${currentPage === page ? "active" : ""}`}
//                       >
//                         <button
//                           className={`page-link pagination-button ${currentPage === page ? "active" : ""}`}
//                           onClick={() => handlePageClick(page)}
//                         >
//                           {page}
//                         </button>
//                       </li>
//                     ))}
//                     <li className="page-item">
//                       <button
//                         className="page-link"
//                         onClick={handleNextPage}
//                         disabled={currentPage === totalPages}
//                       >
//                         Next
//                       </button>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <RegistrationExcelSheetModal
//         show={showImportModal}
//         onClose={() => setShowImportModal(false)}
//         schoolId={schoolId}
//         academicYear={selectedYear}
//         onImportSuccess={handleImportSuccess}
//       />
//       {isDeleteDialogOpen && (
//         <ConfirmationDialog
//           onClose={handleDeleteCancel}
//           deleteType={deleteType}
//           id={selectedRequest._id}
//           onDeleted={() => handleDeleteConfirmed(selectedRequest._id)}
//         />
//       )}
//       {showPaymentModal && (
//         <PaymentModal
//           show={showPaymentModal}
//           onClose={() => setShowPaymentModal(false)}
//           studentId={selectedStudentId}
//           schoolId={schoolId}
//           classId={currentStudent.find(student => student._id === selectedStudentId)?.masterDefineClass}
//           firstName={currentStudent.find(student => student._id === selectedStudentId)?.firstName || "N/A"}
//           lastName={currentStudent.find(student => student._id === selectedStudentId)?.lastName || "N/A"}
//           className={getClassNameById(currentStudent.find(student => student._id === selectedStudentId)?.masterDefineClass)}
//           academicYear={selectedYear}
//           onPaymentSuccess={handlePaymentSuccess}
//         />
//       )}
//     </>
//   );
// };

// export default StudentRegisterListTable;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import RegistrationExcelSheetModal from "./ExcelSheetModal";
import PaymentModal from "./PaymentModal";
import * as XLSX from "xlsx";
import { generatePDF } from "./generateStudentPDF";
import { generatePDFOffical } from "./generateStudentPDFOfficial";
import { FaFilter, FaDownload } from "react-icons/fa";
import Select from "react-select";

const StudentRegisterListTable = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [classList, setClassList] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
  const [loadingYears, setLoadingYears] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [shifts, setShifts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("Date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [regNoFilter, setRegNoFilter] = useState("");
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedFilterClasses, setSelectedFilterClasses] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [classFilterOptions, setClassFilterOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const dropdownRef = useRef(null);
  const tabs = ["Date", "Academic Year", "Registration No.", "Gender", "Class", "Status"];
  const pageShowOptions = [
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 30, label: "30" },
    { value: "all", label: "All" },
  ];

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        setLoadingYears(true);
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const schoolId = userDetails?.schoolId;
        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        const uniqueYears = [...new Set(response.data.data.map(year => year.academicYear))]
          .map(year => response.data.data.find(y => y.academicYear === year));
        setAcademicYears(uniqueYears || []);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching academic years.");
      } finally {
        setLoadingYears(false);
      }
    };

    fetchAcademicYears();
  }, []);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (!schoolId || !selectedYear) return;

    const fetchStudents = async () => {
      try {
        const response = await getAPI(`/get-registartion-form/${schoolId}/${selectedYear}`);
        const classRes = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
        if (!classRes.hasError) {
          const uniqueClasses = Array.from(
            new Map(classRes.data.data.map(cls => [cls._id, cls])).values()
          );
          setClassList(uniqueClasses);
          setClassFilterOptions(
            uniqueClasses.map(cls => ({ value: cls._id, label: cls.className }))
          );
        }
        const shiftResponse = await getAPI(`/master-define-shift/${schoolId}`);
        if (!shiftResponse.hasError) {
          const shiftArray = Array.isArray(shiftResponse.data?.data) ? shiftResponse.data.data : [];
          setShifts(shiftArray);
        } else {
          toast.error(shiftResponse.message || "Failed to fetch shifts.");
          setShifts([]);
        }

        if (!response.hasError) {
          const receiptMap = new Map();
          response.data.receiptData?.forEach(item => {
            const refundReceipts = item.refundreceiptNumbers
              ?.flat()
              .filter(num => num && num !== "") || [];
            receiptMap.set(item._id, {
              receiptNumbers: item.receiptNumbers || [],
              refundReceiptNumbers: refundReceipts,
              reportStatus: item.reportStatus || [[]],
            });
          });

          const studentArrayWithReceipts = Array.isArray(response.data.students)
            ? response.data.students
                .map(student => ({
                  ...student,
                  allReceiptNumbers: receiptMap.get(student._id)?.receiptNumbers || [student.receiptNumber || ""].filter(Boolean),
                  refundReceiptNumbers: receiptMap.get(student._id)?.refundReceiptNumbers || student.refundReceiptNumbers || [],
                  reportStatus: receiptMap.get(student._id)?.reportStatus || student.reportStatus || [[]],
                }))
                .sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate))
            : [];

          setStudentData(studentArrayWithReceipts);

          const genders = [...new Set(studentArrayWithReceipts.map(s => s.gender).filter(Boolean))].map(g => ({ value: g, label: g }));
          setGenderOptions(genders);

          const statuses = [...new Set(studentArrayWithReceipts.map(s => getLatestStatus(s.reportStatus)).filter(Boolean))].map(s => ({ value: s, label: s }));
          setStatusOptions(statuses);
        } else {
          toast.error(response.message || "Failed to fetch student list.");
        }
      } catch (err) {
        toast.error("Error fetching student data.");
        console.error("Student Fetch Error:", err);
      }
    };

    fetchStudents();
  }, [schoolId, selectedYear]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowExportDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImportSuccess = async () => {
    try {
      const response = await getAPI(`/get-registartion-form/${schoolId}/${selectedYear}`);
      if (!response.hasError) {
        const studentArray = Array.isArray(response.data.students) ? response.data.students : [];
        setStudentData(studentArray.sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate)));
      } else {
        toast.error(response.message || "Failed to fetch student list.");
      }
    } catch (err) {
      toast.error("Error refreshing student data.");
    }
  };

  const handleExport = () => {
    const exportData = studentData.map((student) => ({
      "Date of Receipts": student.paymentDate
        ? new Date(student.paymentDate).toLocaleDateString("en-GB")
        : "",
      "Registration No.": student.registrationNumber || "",
      "First Name": student.firstName || "",
      "Middle Name": student.middleName || "",
      "Last Name": student.lastName || "",
      "Date of Birth": student.dateOfBirth
        ? new Date(student.dateOfBirth).toLocaleDateString("en-GB")
        : "",
      Age: student.age || "",
      Nationality: student.nationality || "",
      Gender: student.gender || "",
      "Blood Group": student.bloodGroup || "",
      "Mother Tongue": student.motherTongue || "",
      Class: getClassNameById(student.masterDefineClass),
      Shift: getShiftName(student.masterDefineShift),
      "Parental Status": student.parentalStatus || "",
      "Father Name": student.fatherName || "",
      "Father Contact No": student.fatherContactNo || "",
      "Father Qualification": student.fatherQualification || "",
      "Father Profession": student.fatherProfession || "",
      "Mother Name": student.motherName || "",
      "Mother Contact No": student.motherContactNo || "",
      "Mother Qualification": student.motherQualification || "",
      "Mother Profession": student.motherProfession || "",
      "Current Address": student.currentAddress || "",
      Country: student.country || "",
      State: student.state || "",
      City: student.city || "",
      Pincode: student.pincode || "",
      "Parent Contact Number": student.parentContactNumber || "",
      "Previous School Name": student.previousSchoolName || "",
      "Previous School Board": student.previousSchoolBoard || "",
      "Address of Previous School": student.addressOfPreviousSchool || "",
      "Aadhar/Passport Number": student.aadharPassportNumber || "",
      "Student Category": student.studentCategory || "",
      "Relation Type": student.relationType || "",
      "Sibling Name": student.siblingName || "",
      "How Reach Us": student.howReachUs || "",
      "Registration Fee": student.registrationFee || "",
      "Concession Type": student.concessionType || "",
      "Concession Amount": student.concessionAmount || "",
      "Final Amount": student.finalAmount || "",
      "Payment Mode": student.paymentMode && student.paymentMode !== "null" ? student.paymentMode : "",
      "Cheque Number": student.chequeNumber || "",
      "Bank Name": student.bankName || "",
      Status: getLatestStatus(student.reportStatus),
      "Transaction Number": student.transactionNumber || "",
      "Receipt Number": student.receiptNumber || "",
      "Payment Date": student.paymentDate
        ? new Date(student.paymentDate).toLocaleDateString("en-GB")
        : "",
      "Academic Year": selectedYear || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, `Registered_Student_List_${selectedYear}.xlsx`);
  };

  const openDeleteDialog = (request) => {
    setSelectedRequest(request);
    setIsDeleteDialogOpen(true);
    setDeleteType("registrationform");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = (_id) => {
    setStudentData((prevRequests) =>
      prevRequests.filter((request) => request._id !== _id)
    );
  };

  const getClassNameById = (id) => {
    const found = classList.find((cls) => cls._id === id);
    return found ? found.className : "N/A";
  };

  const getShiftName = (shiftId) => {
    const shift = shifts.find((s) => s._id === shiftId);
    return shift ? shift.masterDefineShiftName : "N/A";
  };

  const navigateToRegisterStudent = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/registration-form`);
  };

  const navigateToRegisterStudentInfo = (event, student) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/registed-student-info`, {
      state: { student },
    });
  };

  const navigateToUpdateRegisterStudentInfo = (event, student) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/update-registed-student-info`, {
      state: { student },
    });
  };

  const navigateToFeesReceipt = (event, receiptNumber, studentId, student) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/registration-form/receipts`, {
      state: {
        receiptNumber,
        schoolId,
        studentId,
        className: getClassNameById(student.masterDefineClass),
      },
    });
  };

  const navigateToCRNReceipt = (event, crnNumber) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/crn-receipts`, {
      state: {
        crnNumber,
      },
    });
  };

  const handleDownloadPDF = async (student, pdfType) => {
    setIsGenerating(true);
    try {
      if (pdfType === "official") {
        await generatePDFOffical(schoolId, student, getClassNameById, getShiftName);
      } else if (pdfType === "student") {
        await generatePDF(schoolId, student, getClassNameById, getShiftName);
      }
    } catch (error) {
      toast.error(`Failed to generate ${pdfType} PDF.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleDropdown = (studentId) => {
    setOpenDropdownId(openDropdownId === studentId ? null : studentId);
  };

  const openPaymentModal = (studentId) => {
    const student = studentData.find((s) => s._id === studentId);
    if (student) {
      setSelectedStudentId(studentId);
      setShowPaymentModal(true);
    } else {
      toast.error("Student not found.");
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const response = await getAPI(`/get-registartion-form/${schoolId}/${selectedYear}`);
      if (!response.hasError) {
        const studentArray = Array.isArray(response.data.students) ? response.data.students : [];
        setStudentData(studentArray.sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate)));
      } else {
        toast.error(response.message || "Failed to fetch student list.");
      }
    } catch (err) {
      toast.error("Error refreshing student data.");
    }
  };

  const shouldShowPaymentButton = (reportStatus) => {
    if (!reportStatus || !Array.isArray(reportStatus) || reportStatus.length === 0) {
      return true;
    }
    const flatStatus = reportStatus.flat();
    const latestStatus = flatStatus[flatStatus.length - 1];
    return ["Cancelled", "Cheque Return", "Refund"].includes(latestStatus);
  };

  const getLatestStatus = (reportStatus) => {
    if (!reportStatus || !Array.isArray(reportStatus) || reportStatus.length === 0) {
      return "Pending";
    }
    const flatStatus = reportStatus.flat();
    return flatStatus[flatStatus.length - 1] || "Pending";
  };

  const filteredStudents = studentData.filter(student => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (
      (student.paymentDate
        ? new Date(student.paymentDate).toLocaleDateString("en-GB").replace(/\//g, "-")
        : "").toLowerCase().includes(searchLower) ||
      (student.registrationNumber || "").toLowerCase().includes(searchLower) ||
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchLower) ||
      (student.gender || "").toLowerCase().includes(searchLower) ||
      getClassNameById(student.masterDefineClass).toLowerCase().includes(searchLower) ||
      getShiftName(student.masterDefineShift).toLowerCase().includes(searchLower) ||
      (student.parentContactNumber || "").toLowerCase().includes(searchLower) ||
      getLatestStatus(student.reportStatus).toLowerCase().includes(searchLower) ||
      (student.refundReceiptNumbers?.join(", ") || "").toLowerCase().includes(searchLower)
    );

    const matchesDate = (!startDate || (student.paymentDate && new Date(student.paymentDate) >= new Date(startDate))) &&
                        (!endDate || (student.paymentDate && new Date(student.paymentDate) <= new Date(endDate)));
    const matchesRegNo = !regNoFilter || (student.registrationNumber || "").includes(regNoFilter);
    const matchesGender = selectedGenders.length === 0 || selectedGenders.some(g => g.value === student.gender);
    const matchesClass = selectedFilterClasses.length === 0 || selectedFilterClasses.some(c => c.value === student.masterDefineClass);
    const matchesYear = selectedYear ? student.academicYear === selectedYear : true;
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.some(s => s.value === getLatestStatus(student.reportStatus));

    return matchesSearch && matchesDate && matchesRegNo && matchesGender && matchesClass && matchesYear && matchesStatus;
  });

  const itemsPerPage = rowsPerPage === "all" ? filteredStudents.length : rowsPerPage;
  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudent = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = itemsPerPage === filteredStudents.length ? 1 : Math.ceil(filteredStudents.length / itemsPerPage);

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
  const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
    setShowExportDropdown(false);
  };

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
    setShowFilterPanel(false);
  };

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setRegNoFilter("");
    setSelectedGenders([]);
    setSelectedFilterClasses([]);
    setSelectedStatuses([]);
    setSelectedYear(localStorage.getItem("selectedAcademicYear") || "");
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (selected) => {
    setRowsPerPage(selected ? selected.value : 10);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-end mb-2 gap-2 align-items-center">
          <Link
            onClick={(event) => navigateToRegisterStudent(event)}
            className="btn btn-sm btn-primary"
          >
            Add Registration Form
          </Link>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="container">
                  <div className="row p-1 border border-dark" style={{ background: "#bfbfbf" }}>
                    <div className="col-md-5 col-12">
                      <input
                        type="text"
                        className="form-control border border-dark"
                        placeholder="Search by any field"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
                      <Select
                        isClearable
                        name="rowsPerPage"
                        placeholder="Show"
                        options={pageShowOptions}
                        value={pageShowOptions.find((option) => option.value === rowsPerPage)}
                        onChange={handleRowsPerPageChange}
                        className="me-lg-2"
                      />
                      <div
                        className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
                        style={{ cursor: "pointer" }}
                        onClick={toggleFilterPanel}
                      >
                        <FaFilter />
                      </div>
                      <div className="position-relative" ref={dropdownRef}>
                        <div
                          className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
                          style={{ cursor: "pointer" }}
                          onClick={toggleExportDropdown}
                          title="Actions"
                        >
                          <FaDownload />
                        </div>
                        {showExportDropdown && (
                          <div
                            className="position-absolute bg-white border mr-2 mt-2 border-dark rounded shadow"
                            style={{
                              top: "100%",
                              right: 0,
                              zIndex: 1000,
                              minWidth: "150px",
                            }}
                          >
                            <button
                              className="btn btn-light w-100 text-left py-2 px-3"
                              onClick={() => {
                                handleExport();
                                setShowExportDropdown(false);
                              }}
                            >
                              Export
                            </button>
                            <button
                              className="btn btn-light w-100 text-left py-2 px-3"
                              onClick={() => {
                                setShowImportModal(true);
                                setShowExportDropdown(false);
                              }}
                            >
                              Import
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {showFilterPanel && (
                    <div className="row mt-1 border border-light rounded px-md-3 py-1">
                      <div className="col-12 p-2">
                        <ul className="nav nav-tabs mb-0 justify-content-center">
                          {tabs.map((tab) => (
                            <li className="nav-item" key={tab}>
                              <a
                                className={`nav-link fw-bold ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                                style={{ cursor: "pointer" }}
                              >
                                {tab}
                              </a>
                            </li>
                          ))}
                        </ul>
                        <div className="tab-content mt-2">
                          {activeTab === "Date" && (
                            <div className="row d-lg-flex justify-content-center">
                              <div className="col-md-4">
                                <label className="form-label">Start Date </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="form-label">End Date </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={endDate}
                                  onChange={(e) => setEndDate(e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                          {activeTab === "Registration No." && (
                            <div className="row d-lg-flex justify-content-center">
                              <div className="col-md-8">
                                <input
                                  type="text"
                                  className="form-control mt-2"
                                  placeholder="Enter Registration No."
                                  value={regNoFilter}
                                  onChange={(e) => setRegNoFilter(e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                          {activeTab === "Gender" && (
                            <div className="row d-lg-flex justify-content-center">
                              <div className="col-md-8">
                                <Select
                                  isMulti
                                  options={genderOptions}
                                  value={selectedGenders}
                                  onChange={setSelectedGenders}
                                  placeholder="Select Genders"
                                  className="mt-2"
                                />
                              </div>
                            </div>
                          )}
                          {activeTab === "Class" && (
                            <div className="row d-lg-flex justify-content-center">
                              <div className="col-md-8">
                                <Select
                                  isMulti
                                  options={classFilterOptions}
                                  value={selectedFilterClasses}
                                  onChange={setSelectedFilterClasses}
                                  placeholder="Select Classes"
                                  className="mt-2"
                                />
                              </div>
                            </div>
                          )}
                          {activeTab === "Academic Year" && (
                            <div className="row d-lg-flex justify-content-center">
                              <div className="col-md-8">
                                <Select
                                  options={academicYears.map(year => ({
                                    value: year.academicYear,
                                    label: year.academicYear,
                                  }))}
                                  value={
                                    selectedYear
                                      ? { value: selectedYear, label: selectedYear }
                                      : null
                                  }
                                  onChange={(selected) => {
                                    const year = selected ? selected.value : "";
                                    setSelectedYear(year);
                                    localStorage.setItem("selectedAcademicYear", year);
                                  }}
                                  placeholder="Select Academic Year"
                                  className="mt-2"
                                  isLoading={loadingYears}
                                  isClearable
                                />
                              </div>
                            </div>
                          )}
                          {activeTab === "Status" && (
                            <div className="row d-lg-flex justify-content-center">
                              <div className="col-md-8">
                                <Select
                                  isMulti
                                  options={statusOptions}
                                  value={selectedStatuses}
                                  onChange={setSelectedStatuses}
                                  placeholder="Select Statuses"
                                  className="mt-2"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-end mt-3">
                          <button className="btn btn-secondary me-2" onClick={resetFilters}>
                            Reset
                          </button>
                          <button className="btn btn-primary" onClick={() => setShowFilterPanel(false)}>
                            Apply Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <h4 className="card-title flex-grow-1 text-center mt-3 mb-3">
                  Registered Student List
                </h4>
                <div>
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 table-centered text-center text-nowrap">
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
                          <th>Date of Receipts</th>
                          <th>Registration No.</th>
                          <th>Student Name</th>
                          <th>Gender</th>
                          <th>Class</th>
                          <th>Shift</th>
                          <th>Contact No</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentStudent.map((student, index) => (
                          <tr key={index}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`customCheck${index + 2}`}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`customCheck${index + 2}`}
                                />
                              </div>
                            </td>
                            <td>
                              {student.paymentDate
                                ? new Date(student.paymentDate)
                                    .toLocaleDateString("en-GB")
                                    .replace(/\//g, "-")
                                : "-"}
                            </td>
                            <td>{student.registrationNumber || "-"}</td>
                            <td>
                              {student.firstName} {student.lastName}
                            </td>
                            <td>{student.gender}</td>
                            <td>{getClassNameById(student.masterDefineClass)}</td>
                            <td>{getShiftName(student.masterDefineShift)}</td>
                            <td>{student.parentContactNumber}</td>
                            <td>
                              <button
                                className={`btn btn-sm ${
                                  getLatestStatus(student.reportStatus) === "Paid"
                                    ? "btn-success"
                                    : "btn-danger"
                                }`}
                              >
                                {getLatestStatus(student.reportStatus)}
                              </button>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <Link
                                  className="btn btn-light btn-sm"
                                  onClick={(event) =>
                                    navigateToRegisterStudentInfo(event, student)
                                  }
                                >
                                  <iconify-icon
                                    icon="solar:eye-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                <Link
                                  className="btn btn-soft-primary btn-sm"
                                  onClick={(event) =>
                                    navigateToUpdateRegisterStudentInfo(event, student)
                                  }
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
                                    openDeleteDialog(student);
                                  }}
                                >
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                {shouldShowPaymentButton(student.reportStatus) && (
                                  <Link
                                    className="btn btn-soft-warning btn-sm"
                                    onClick={() => openPaymentModal(student._id)}
                                  >
                                    <iconify-icon
                                      icon="solar:wallet-money-broken"
                                      className="align-middle fs-18"
                                    />
                                  </Link>
                                )}
                                <div className="dropdown">
                                  <Link
                                    className="btn btn-soft-success btn-sm"
                                    onClick={() => toggleDropdown(student._id)}
                                  >
                                    <iconify-icon
                                      icon="solar:download-minimalistic-broken"
                                      className="align-middle fs-18"
                                    />
                                  </Link>
                                  {openDropdownId === student._id && (
                                    <div
                                      className="dropdown-menu dropdown-menu-end show"
                                      style={{ position: "absolute", zIndex: 1000 }}
                                    >
                                      {student.allReceiptNumbers?.length > 0 ? (
                                        student.allReceiptNumbers.map((receiptNum, idx) => (
                                          <button
                                            key={idx}
                                            className="dropdown-item"
                                            onClick={(event) => {
                                              navigateToFeesReceipt(event, receiptNum, student._id, student);
                                              setOpenDropdownId(null);
                                            }}
                                          >
                                            Download {receiptNum}
                                          </button>
                                        ))
                                      ) : (
                                        <button className="dropdown-item" disabled>
                                          No Receipts
                                        </button>
                                      )}
                                      {student.refundReceiptNumbers?.length > 0 ? (
                                        student.refundReceiptNumbers.map((crnNumber, idx) => (
                                          <button
                                            key={idx}
                                            className="dropdown-item"
                                            onClick={(event) => {
                                              navigateToCRNReceipt(event, crnNumber);
                                              setOpenDropdownId(null);
                                            }}
                                          >
                                            Download {crnNumber}
                                          </button>
                                        ))
                                      ) : (
                                        <button className="dropdown-item" disabled>
                                          No CRN Receipts
                                        </button>
                                      )}
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          handleDownloadPDF(student, "official");
                                          setOpenDropdownId(null);
                                        }}
                                        disabled={isGenerating}
                                      >
                                        {isGenerating ? "Generating..." : "Download Form PDF-Official"}
                                      </button>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          handleDownloadPDF(student, "student");
                                          setOpenDropdownId(null);
                                        }}
                                        disabled={isGenerating}
                                      >
                                        {isGenerating ? "Generating..." : "Download Form PDF-Student"}
                                      </button>
                                    </div>
                                  )}
                                </div>
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
                          className={`page-item ${currentPage === page ? "active" : ""}`}
                        >
                          <button
                            className={`page-link pagination-button ${currentPage === page ? "active" : ""}`}
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
      </div>
      <RegistrationExcelSheetModal
        show={showImportModal}
        onClose={() => setShowImportModal(false)}
        schoolId={schoolId}
        academicYear={selectedYear}
        onImportSuccess={handleImportSuccess}
      />
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedRequest._id}
          onDeleted={() => handleDeleteConfirmed(selectedRequest._id)}
        />
      )}
      {showPaymentModal && (
        <PaymentModal
          show={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          studentId={selectedStudentId}
          schoolId={schoolId}
          classId={currentStudent.find(student => student._id === selectedStudentId)?.masterDefineClass}
          firstName={currentStudent.find(student => student._id === selectedStudentId)?.firstName || "N/A"}
          lastName={currentStudent.find(student => student._id === selectedStudentId)?.lastName || "N/A"}
          className={getClassNameById(currentStudent.find(student => student._id === selectedStudentId)?.masterDefineClass)}
          parentContactNumber={currentStudent.find(student => student._id === selectedStudentId)?.parentContactNumber || ""}
          academicYear={selectedYear}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

export default StudentRegisterListTable;