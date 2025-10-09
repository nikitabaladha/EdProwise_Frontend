// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import getAPI from "../../../../../api/getAPI";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import ExcelSheetModal from "./ExcelSheetModal";
// import PaymentModal from "./PaymentModal";
// import { generateTCPDF } from './generateStudentPDF';
// import { generateTCPDFOfficial } from './generateStudentPDFOfficial';
// import * as XLSX from "xlsx";

// const StudentTCFormTable = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [studentData, setStudentData] = useState([]);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [classList, setClassList] = useState([]);
//   const [deleteType, setDeleteType] = useState("");
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [academicYears, setAcademicYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
//   const [loadingYears, setLoadingYears] = useState(false);
//   const [showImportModal, setShowImportModal] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [openDropdownId, setOpenDropdownId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [studentListPerPage] = useState(10);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [selectedTCFormId, setSelectedTCFormId] = useState(null);

//   useEffect(() => {
//     const fetchAcademicYears = async () => {
//       try {
//         setLoadingYears(true);
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         const schoolId = userDetails?.schoolId;
//         const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
//         setAcademicYears(response.data.data || []);
//       } catch (err) {
//         toast.error("Error fetching academic years.");
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

//     const fetchTCForms = async () => {
//       try {
//         const response = await getAPI(`/get-TC-form/${schoolId}/${selectedYear}`);
//         const classRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
//         if (!classRes.hasError) {
//           setClassList(classRes.data.data);
//         }

//         if (!response.hasError) {
//           // Create a map for receipt data
//           const receiptMap = new Map();
//           response.data.receiptData?.forEach(item => {
//             // Flatten refundReceiptNumbers arrays and filter out empty arrays
//             const refundReceipts = item.refundReceiptNumbers
//               ?.flat()
//               .filter(num => num && num !== "") || [];
//             receiptMap.set(item._id, {
//               receiptNumbers: item.receiptNumbers || [],
//               refundReceiptNumbers: refundReceipts,
//               reportStatus: item.reportStatus || [[]],
//             });
//           });

//           const tcFormArrayWithReceipts = Array.isArray(response.data.forms)
//             ? response.data.forms
//                 .map(form => ({
//                   ...form,
//                   allReceiptNumbers: receiptMap.get(form._id)?.receiptNumbers || [form.receiptNumber || ""].filter(Boolean),
//                   refundReceiptNumbers: receiptMap.get(form._id)?.refundReceiptNumbers || form.refundReceiptNumbers || [],
//                   reportStatus: receiptMap.get(form._id)?.reportStatus || form.reportStatus || [[]],
//                 }))
//                 .sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate))
//             : [];

//           setStudentData(tcFormArrayWithReceipts);
//         } else {
//           toast.error(response.message || "Failed to fetch TC form list.");
//         }
//       } catch (err) {
//         toast.error("Error fetching TC form data.");
//         console.error("TC Form Fetch Error:", err);
//       }
//     };

//     fetchTCForms();
//   }, [schoolId, selectedYear]);

//   const handleImportSuccess = async () => {
//     try {
//       const response = await getAPI(`/get-TC-form/${schoolId}/${selectedYear}`);
//       if (!response.hasError) {
//         const tcFormArray = Array.isArray(response.data.forms) ? response.data.forms : [];
//         setStudentData(tcFormArray.sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate)));
//       } else {
//         toast.error(response.message || "Failed to fetch TC form list.");
//       }
//     } catch (err) {
//       toast.error("Error refreshing TC form data.");
//     }
//   };

//   const handleExport = () => {
//     const exportData = studentData.map((student) => ({
//       "Date of Receipts": student.paymentDate
//         ? new Date(student.paymentDate).toLocaleDateString("en-GB")
//         : "",
//       "Certificate Number": student.certificateNumber || "",
//       "Admission Number": student.AdmissionNumber || "",
//       "First Name": student.firstName || "",
//       "Middle Name": student.middleName || "",
//       "Last Name": student.lastName || "",
//       "Date of Birth": student.dateOfBirth
//         ? new Date(student.dateOfBirth).toLocaleDateString("en-GB")
//         : "",
//       Age: student.age || "",
//       Nationality: student.nationality || "",
//       "Father Name": student.fatherName || "",
//       "Mother Name": student.motherName || "",
//       "Date of Issue": student.dateOfIssue
//         ? new Date(student.dateOfIssue).toLocaleDateString("en-GB")
//         : "",
//       "Date of Admission": student.dateOfAdmission
//         ? new Date(student.dateOfAdmission).toLocaleDateString("en-GB")
//         : "",
//       Class: getClassNameById(student.masterDefineClass),
//       "Percentage Obtained in Last Exam": student.percentageObtainInLastExam || "",
//       "Qualified for Promotion": student.qualifiedPromotionInHigherClass || "",
//       "Failed in Any Class": student.whetherFaildInAnyClass || "",
//       "Outstanding Dues": student.anyOutstandingDues || "",
//       "Moral Behaviour": student.moralBehaviour || "",
//       "Date of Last Attendance": student.dateOfLastAttendanceAtSchool
//         ? new Date(student.dateOfLastAttendanceAtSchool).toLocaleDateString("en-GB")
//         : "",
//       "Reason for Leaving": student.reasonForLeaving || "",
//       Remarks: student.anyRemarks || "",
//       "Agreement Checked": student.agreementChecked ? "Yes" : "No",
//       "TC Fees": student.TCfees || "",
//       "Concession Type": student.concessionType || "",
//       "Concession Amount": student.concessionAmount || "",
//       "Final Amount": student.finalAmount || "",
//       "Payment Mode": student.paymentMode && student.paymentMode !== "null" ? student.paymentMode : "",
//       "Cheque Number": student.chequeNumber || "",
//       "Bank Name": student.bankName || "",
//       Status: getLatestStatus(student.reportStatus),
//       "Transaction Number": student.transactionNumber || "",
//       "Receipt Number": student.receiptNumber || "",
//       "Payment Date": student.paymentDate
//         ? new Date(student.paymentDate).toLocaleDateString("en-GB")
//         : "",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "TCForms");

//     XLSX.writeFile(workbook, `TC_Student_List_${selectedYear}.xlsx`);
//   };

//   const openDeleteDialog = (request) => {
//     setSelectedRequest(request);
//     setIsDeleteDialogOpen(true);
//     setDeleteType("TCform");
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

//   const navigateToTCForm = (event) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/trasfer-certificate-form`);
//   };

//   const navigateToViewTCInfo = (event, student) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/view-trasfer-certificate-details`, {
//       state: { student },
//     });
//   };

//   const navigateToUpdateTCForm = (event, student) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/update-trasfer-certificate-form`, {
//       state: { student },
//     });
//   };

//   const navigateToFeesReceipt = (event, receiptNumber, tcFormId, student) => {
//     event.preventDefault();
//     const className = getClassNameById(student.masterDefineClass);
//     navigate(`/school-dashboard/fees-module/form/trasfer-certificate-form-details`, {
//       state: {
//         receiptNumber,
//         schoolId,
//         tcFormId,
//         className: className || "N/A",
//         classId: student.masterDefineClass,
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
//       if (pdfType === 'official') {
//         await generateTCPDFOfficial(schoolId, student, getClassNameById);
//       } else if (pdfType === 'student') {
//         await generateTCPDF(schoolId, student, getClassNameById);
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

//   const openPaymentModal = (tcFormId) => {
//     const student = studentData.find((s) => s._id === tcFormId);
//     if (student) {
//       setSelectedTCFormId(tcFormId);
//       setShowPaymentModal(true);
//     } else {
//       toast.error("TC form not found.");
//     }
//   };

//   const handlePaymentSuccess = async () => {
//     try {
//       const response = await getAPI(`/get-TC-form/${schoolId}/${selectedYear}`);
//       if (!response.hasError) {
//         const tcFormArray = Array.isArray(response.data.forms) ? response.data.forms : [];
//         setStudentData(tcFormArray.sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate)));
//       } else {
//         toast.error(response.message || "Failed to fetch TC form list.");
//       }
//     } catch (err) {
//       toast.error("Error refreshing TC form data.");
//     }
//   };


//   const shouldShowPaymentButton = (reportStatus) => {
//     if (!reportStatus || !Array.isArray(reportStatus) || reportStatus.length === 0) {
//       return true; 
//     }


//     const flatStatus = reportStatus.flat();
//     const latestStatus = flatStatus[flatStatus.length - 1];


//     return ["Cancelled", "Cheque Return", "Refund"].includes(latestStatus);
//   };


//   const getLatestStatus = (reportStatus) => {
//     if (!reportStatus || !Array.isArray(reportStatus) || reportStatus.length === 0) {
//       return "Pending"; 
//     }

//     // Flatten the reportStatus array and get the latest status
//     const flatStatus = reportStatus.flat();
//     return flatStatus[flatStatus.length - 1] || "Pending";
//   };

//   const filteredStudents = studentData.filter((student) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       (student.paymentDate
//         ? new Date(student.paymentDate).toLocaleDateString("en-GB").replace(/\//g, "-")
//         : "").toLowerCase().includes(query) ||
//       (student.certificateNumber || "").toLowerCase().includes(query) ||
//       (student.AdmissionNumber || "").toLowerCase().includes(query) ||
//       `${student.firstName} ${student.lastName}`.toLowerCase().includes(query) ||
//       getClassNameById(student.masterDefineClass).toLowerCase().includes(query) ||
//       (student.dateOfIssue
//         ? new Date(student.dateOfIssue).toLocaleDateString("en-GB").replace(/\//g, "-")
//         : "").toLowerCase().includes(query) ||
//       getLatestStatus(student.reportStatus).toLowerCase().includes(query) ||
//       (student.refundReceiptNumbers?.join(", ") || "").toLowerCase().includes(query)
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
//             onClick={(event) => navigateToTCForm(event)}
//             className="btn btn-sm btn-primary"
//           >
//             Add TC Form
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
//                 <h4 className="card-title flex-grow-1">Transfer Certificate List</h4>
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
//                         <th>TC Certificate No.</th>
//                         <th>Admission No.</th>
//                         <th>Student Name</th>
//                         <th>Class</th>
//                         <th>Date of Issue</th>
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
//                           <td>{student.certificateNumber || "N/A"}</td>
//                           <td>{student.AdmissionNumber || "N/A"}</td>
//                           <td>{student.firstName} {student.lastName}</td>
//                           <td>{getClassNameById(student.masterDefineClass)}</td>
//                           <td>
//                             {student.dateOfIssue
//                               ? new Date(student.dateOfIssue)
//                                   .toLocaleDateString("en-GB")
//                                   .replace(/\//g, "-")
//                               : ""}
//                           </td>
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
//                                   navigateToViewTCInfo(event, student)
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
//                                   navigateToUpdateTCForm(event, student)
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
//       <ExcelSheetModal
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
//           tcFormId={selectedTCFormId}
//           schoolId={schoolId}
//           classId={currentStudent.find(student => student._id === selectedTCFormId)?.masterDefineClass}
//           firstName={currentStudent.find(student => student._id === selectedTCFormId)?.firstName || "N/A"}
//           lastName={currentStudent.find(student => student._id === selectedTCFormId)?.lastName || "N/A"}
//           className={getClassNameById(currentStudent.find(student => student._id === selectedTCFormId)?.masterDefineClass)}
//           academicYear={selectedYear}
//           onPaymentSuccess={handlePaymentSuccess}
//         />
//       )}
//     </>
//   );
// };

// export default StudentTCFormTable;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import ExcelSheetModal from "./ExcelSheetModal";
import PaymentModal from "./PaymentModal";
import { generateTCPDF } from './generateStudentPDF';
import { generateTCPDFOfficial } from './generateStudentPDFOfficial';
import * as XLSX from "xlsx";
import { FaFilter, FaDownload } from "react-icons/fa";
import Select from "react-select";

const StudentTCFormTable = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [classList, setClassList] = useState([]);
  const [deleteType, setDeleteType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
  const [loadingYears, setLoadingYears] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTCFormId, setSelectedTCFormId] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("Date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [certificateNoFilter, setCertificateNoFilter] = useState("");
  const [admissionNoFilter, setAdmissionNoFilter] = useState("");
  const [selectedFilterClasses, setSelectedFilterClasses] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [classFilterOptions, setClassFilterOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const dropdownRef = useRef(null);
  const tabs = ["Date", "Academic Year", "TC Certificate No.", "Admission No.", "Class", "Status"];
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
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const schoolId = userDetails?.schoolId;
        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        const uniqueYears = [...new Set(response.data.data.map(year => year.academicYear))]
          .map(year => response.data.data.find(y => y.academicYear === year));
        setAcademicYears(uniqueYears || []);
      } catch (err) {
        toast.error("Error fetching academic years.");
        console.error(err);
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

    const fetchTCForms = async () => {
      try {
        const response = await getAPI(`/get-TC-form/${schoolId}/${selectedYear}`);
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

        if (!response.hasError) {
          const receiptMap = new Map();
          response.data.receiptData?.forEach(item => {
            const refundReceipts = item.refundReceiptNumbers
              ?.flat()
              .filter(num => num && num !== "") || [];
            receiptMap.set(item._id, {
              receiptNumbers: item.receiptNumbers || [],
              refundReceiptNumbers: refundReceipts,
              reportStatus: item.reportStatus || [[]],
            });
          });

          const tcFormArrayWithReceipts = Array.isArray(response.data.forms)
            ? response.data.forms
                .map(form => ({
                  ...form,
                  allReceiptNumbers: receiptMap.get(form._id)?.receiptNumbers || [form.receiptNumber || ""].filter(Boolean),
                  refundReceiptNumbers: receiptMap.get(form._id)?.refundReceiptNumbers || form.refundReceiptNumbers || [],
                  reportStatus: receiptMap.get(form._id)?.reportStatus || form.reportStatus || [[]],
                }))
                .sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate))
            : [];

          setStudentData(tcFormArrayWithReceipts);
          const statuses = [...new Set(tcFormArrayWithReceipts.map(s => getLatestStatus(s.reportStatus)).filter(Boolean))].map(s => ({ value: s, label: s }));
          setStatusOptions(statuses);
        } else {
          toast.error(response.message || "Failed to fetch TC form list.");
        }
      } catch (err) {
        toast.error("Error fetching TC form data.");
        console.error("TC Form Fetch Error:", err);
      }
    };

    fetchTCForms();
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
      const response = await getAPI(`/get-TC-form/${schoolId}/${selectedYear}`);
      if (!response.hasError) {
        const tcFormArray = Array.isArray(response.data.forms) ? response.data.forms : [];
        setStudentData(tcFormArray.sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate)));
      } else {
        toast.error(response.message || "Failed to fetch TC form list.");
      }
    } catch (err) {
      toast.error("Error refreshing TC form data.");
    }
  };

  const handleExport = () => {
    const exportData = studentData.map((student) => ({
      "Date of Receipts": student.paymentDate
        ? new Date(student.paymentDate).toLocaleDateString("en-GB")
        : "",
      "Certificate Number": student.certificateNumber || "",
      "Admission Number": student.AdmissionNumber || "",
      "First Name": student.firstName || "",
      "Middle Name": student.middleName || "",
      "Last Name": student.lastName || "",
      "Date of Birth": student.dateOfBirth
        ? new Date(student.dateOfBirth).toLocaleDateString("en-GB")
        : "",
      Age: student.age || "",
      Nationality: student.nationality || "",
      "Father Name": student.fatherName || "",
      "Mother Name": student.motherName || "",
      "Date of Issue": student.dateOfIssue
        ? new Date(student.dateOfIssue).toLocaleDateString("en-GB")
        : "",
      "Date of Admission": student.dateOfAdmission
        ? new Date(student.dateOfAdmission).toLocaleDateString("en-GB")
        : "",
      Class: getClassNameById(student.masterDefineClass),
      "Percentage Obtained in Last Exam": student.percentageObtainInLastExam || "",
      "Qualified for Promotion": student.qualifiedPromotionInHigherClass || "",
      "Failed in Any Class": student.whetherFaildInAnyClass || "",
      "Outstanding Dues": student.anyOutstandingDues || "",
      "Moral Behaviour": student.moralBehaviour || "",
      "Date of Last Attendance": student.dateOfLastAttendanceAtSchool
        ? new Date(student.dateOfLastAttendanceAtSchool).toLocaleDateString("en-GB")
        : "",
      "Reason for Leaving": student.reasonForLeaving || "",
      Remarks: student.anyRemarks || "",
      "Agreement Checked": student.agreementChecked ? "Yes" : "No",
      "TC Fees": student.TCfees || "",
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "TCForms");

    XLSX.writeFile(workbook, `TC_Student_List_${selectedYear}.xlsx`);
  };

  const openDeleteDialog = (request) => {
    setSelectedRequest(request);
    setIsDeleteDialogOpen(true);
    setDeleteType("TCform");
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

  const navigateToTCForm = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/trasfer-certificate-form`);
  };

  const navigateToViewTCInfo = (event, student) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/view-trasfer-certificate-details`, {
      state: { student },
    });
  };

  const navigateToUpdateTCForm = (event, student) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/update-trasfer-certificate-form`, {
      state: { student },
    });
  };

  const navigateToFeesReceipt = (event, receiptNumber, tcFormId, student) => {
    event.preventDefault();
    const className = getClassNameById(student.masterDefineClass);
    navigate(`/school-dashboard/fees-module/form/trasfer-certificate-form-details`, {
      state: {
        receiptNumber,
        schoolId,
        tcFormId,
        className: className || "N/A",
        classId: student.masterDefineClass,
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
      if (pdfType === 'official') {
        await generateTCPDFOfficial(schoolId, student, getClassNameById);
      } else if (pdfType === 'student') {
        await generateTCPDF(schoolId, student, getClassNameById);
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

  const openPaymentModal = (tcFormId) => {
    const student = studentData.find((s) => s._id === tcFormId);
    if (student) {
      setSelectedTCFormId(tcFormId);
      setShowPaymentModal(true);
    } else {
      toast.error("TC form not found.");
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const response = await getAPI(`/get-TC-form/${schoolId}/${selectedYear}`);
      if (!response.hasError) {
        const tcFormArray = Array.isArray(response.data.forms) ? response.data.forms : [];
        setStudentData(tcFormArray.sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate)));
      } else {
        toast.error(response.message || "Failed to fetch TC form list.");
      }
    } catch (err) {
      toast.error("Error refreshing TC form data.");
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

  const filteredStudents = studentData.filter((student) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      (student.paymentDate
        ? new Date(student.paymentDate).toLocaleDateString("en-GB").replace(/\//g, "-")
        : "").toLowerCase().includes(query) ||
      (student.certificateNumber || "").toLowerCase().includes(query) ||
      (student.AdmissionNumber || "").toLowerCase().includes(query) ||
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(query) ||
      getClassNameById(student.masterDefineClass).toLowerCase().includes(query) ||
      (student.dateOfIssue
        ? new Date(student.dateOfIssue).toLocaleDateString("en-GB").replace(/\//g, "-")
        : "").toLowerCase().includes(query) ||
      getLatestStatus(student.reportStatus).toLowerCase().includes(query) ||
      (student.refundReceiptNumbers?.join(", ") || "").toLowerCase().includes(query)
    );

    const matchesDate = (!startDate || (student.paymentDate && new Date(student.paymentDate) >= new Date(startDate))) &&
                        (!endDate || (student.paymentDate && new Date(student.paymentDate) <= new Date(endDate)));
    const matchesCertificateNo = !certificateNoFilter || (student.certificateNumber || "").toLowerCase().includes(certificateNoFilter.toLowerCase());
    const matchesAdmissionNo = !admissionNoFilter || (student.AdmissionNumber || "").toLowerCase().includes(admissionNoFilter.toLowerCase());
    const matchesClass = selectedFilterClasses.length === 0 || selectedFilterClasses.some(c => c.value === student.masterDefineClass);
    const matchesYear = selectedYear ? student.academicYear === selectedYear : true;
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.some(s => s.value === getLatestStatus(student.reportStatus));

    return matchesSearch && matchesDate && matchesCertificateNo && matchesAdmissionNo && matchesClass && matchesYear && matchesStatus;
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

  const handleRowsPerPageChange = (selected) => {
    setRowsPerPage(selected ? selected.value : 10);
    setCurrentPage(1);
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
    setCertificateNoFilter("");
    setAdmissionNoFilter("");
    setSelectedFilterClasses([]);
    setSelectedStatuses([]);
    setSelectedYear(localStorage.getItem("selectedAcademicYear") || "");
    setCurrentPage(1);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-end mb-2 gap-2 align-items-center">
          <Link
            onClick={(event) => navigateToTCForm(event)}
            className="btn btn-sm btn-primary"
          >
            Add TC Form
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
                          {activeTab === "TC Certificate No." && (
                            <div className="row d-lg-flex justify-content-center">
                              <div className="col-md-8">
                                <input
                                  type="text"
                                  className="form-control mt-2"
                                  placeholder="Enter TC Certificate No."
                                  value={certificateNoFilter}
                                  onChange={(e) => setCertificateNoFilter(e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                          {activeTab === "Admission No." && (
                            <div className="row d-lg-flex justify-content-center">
                              <div className="col-md-8">
                                <input
                                  type="text"
                                  className="form-control mt-2"
                                  placeholder="Enter Admission No."
                                  value={admissionNoFilter}
                                  onChange={(e) => setAdmissionNoFilter(e.target.value)}
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
                  Transfer Certificate List
                </h4>
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
                        <th>TC Certificate No.</th>
                        <th>Admission No.</th>
                        <th>Student Name</th>
                        <th>Class</th>
                        <th>Date of Issue</th>
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
                              : ""}
                          </td>
                          <td>{student.certificateNumber || "N/A"}</td>
                          <td>{student.AdmissionNumber || "N/A"}</td>
                          <td>{student.firstName} {student.lastName}</td>
                          <td>{getClassNameById(student.masterDefineClass)}</td>
                          <td>
                            {student.dateOfIssue
                              ? new Date(student.dateOfIssue)
                                  .toLocaleDateString("en-GB")
                                  .replace(/\//g, "-")
                              : ""}
                          </td>
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
                                  navigateToViewTCInfo(event, student)
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
                                  navigateToUpdateTCForm(event, student)
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
      <ExcelSheetModal
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
          tcFormId={selectedTCFormId}
          schoolId={schoolId}
          classId={currentStudent.find(student => student._id === selectedTCFormId)?.masterDefineClass}
          firstName={currentStudent.find(student => student._id === selectedTCFormId)?.firstName || "N/A"}
          lastName={currentStudent.find(student => student._id === selectedTCFormId)?.lastName || "N/A"}
          className={getClassNameById(currentStudent.find(student => student._id === selectedTCFormId)?.masterDefineClass)}
          academicYear={selectedYear}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

export default StudentTCFormTable;