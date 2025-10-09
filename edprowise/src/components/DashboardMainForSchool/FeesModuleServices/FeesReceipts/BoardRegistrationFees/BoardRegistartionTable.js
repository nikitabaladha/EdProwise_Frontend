
// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import getAPI from "../../../../../api/getAPI";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import * as XLSX from "xlsx";

// const BoardRegistrationFeePaymentTable = () => {
//     const navigate = useNavigate();
//     const [schoolId, setSchoolId] = useState(null);
//     const [studentData, setStudentData] = useState([]);
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//     const [deleteType, setDeleteType] = useState("");
//     const [selectedStudent, setSelectedStudent] = useState(null);
//     const [classList, setClassList] = useState([]);
//     const [academicYears, setAcademicYears] = useState([]);
//     const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
//     const [loadingYears, setLoadingYears] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [openDropdownId, setOpenDropdownId] = useState(null);

//     useEffect(() => {
//         const fetchAcademicYears = async () => {
//             try {
//                 setLoadingYears(true);
//                 const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//                 const schoolId = userDetails?.schoolId;
//                 const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
//                 setAcademicYears(response.data.data || []);
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoadingYears(false);
//             }
//         };

//         fetchAcademicYears();
//     }, []);

//     const openDeleteDialog = (student) => {
//         setSelectedStudent(student);
//         setIsDeleteDialogOpen(true);
//         setDeleteType("boardregistrationfeepayment");
//     };

//     const handleDeleteCancel = () => {
//         setIsDeleteDialogOpen(false);
//     };

//     const handleDeleteConfirmed = (_id) => {
//         setStudentData((prevStudents) =>
//             prevStudents.filter((student) => student._id !== _id)
//         );
//     };

//     useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//         const id = userDetails?.schoolId;

//         if (!id) {
//             toast.error("School ID not found. Please log in again.");
//             return;
//         }

//         setSchoolId(id);
//     }, []);

//     useEffect(() => {
//         if (!schoolId || !selectedYear) return;

//         const fetchPayments = async () => {
//             try {
//                 const response = await getAPI(`/get-board-registration-fee-payments/${schoolId}/${selectedYear}`);
//                 const classRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
//                 if (!classRes.hasError) {
//                     setClassList(classRes.data.data);
//                 }
//                 if (!response.hasError) {
//                     const studentArray = Array.isArray(response.data.data) ? response.data.data : [];
//                     setStudentData(studentArray.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)));
//                 }
//             } catch (err) {
//                 console.error("Student Fetch Error:", err);
//             }
//         };

//         fetchPayments();
//     }, [schoolId, selectedYear]);

//     const getClassNameById = (id) => {
//         const found = classList.find((cls) => cls._id === id);
//         return found ? found.className : "N/A";
//     };

//     const getSectionNameById = (sectionId) => {
//         if (!sectionId) {
//             return "N/A";
//         }
//         const found = classList.find((cls) => cls.sections?.some((sec) => sec._id === sectionId));
//         const section = found?.sections?.find((sec) => sec._id === sectionId);
//         return section ? section.name : "N/A";
//     };

//     const getDisplayStatus = (reportStatus) => {
//         if (!reportStatus || !Array.isArray(reportStatus) || reportStatus.length === 0) {
//             return "N/A";
//         }
//         // Return the last status in the array
//         return reportStatus[reportStatus.length - 1];
//     };

//     const navigateToBoardRegistration = (event) => {
//         event.preventDefault();
//         navigate(`/school-dashboard/fees-module/fees-receipts/board-registration/fees`);
//     };

//     const handleExport = () => {
//         const exportData = studentData.map((student) => ({
//             "Payment Date": student.paymentDate
//                 ? new Date(student.paymentDate).toLocaleDateString("en-GB")
//                 : "",
//             "Receipt Number": student.receiptNumberBrf || "",
//             "Admission Number": student.admissionNumber || "",
//             "Student Name": `${student.firstName} ${student.lastName}` || "",
//             "Class Name": student.className || getClassNameById(student.classId),
//             "Section Name": student.sectionName || getSectionNameById(student.sectionId),
//             "Amount": student.finalAmount.toFixed(2) || "",
//             "Payment Mode": student.paymentMode || "",
//             "Report Status": getDisplayStatus(student.reportStatus),
//             "CRN Numbers": student.refundReceiptNumbers?.join(", ") || "",
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(exportData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "BoardRegistrationFees");

//         XLSX.writeFile(workbook, `Board_Registration_Fee_Payments_${selectedYear}.xlsx`);
//     };

//     const navigateToFeesReceipt = (event, student, receiptNumber) => {
//         event.preventDefault();
//         navigate(`/school-dashboard/fees-module/fees-receipts/board-registration/fees/receipts`, {
//             state: {
//                receiptNumberBrf: receiptNumber,
//                 schoolId:schoolId,
//                 className: student.className || getClassNameById(student.classId),
//                 sectionName: student.sectionName || getSectionNameById(student.sectionId),
//                 classId: student.classId || "",
//                 sectionId: student.sectionId || ""
//             },
//         });
//     };

//     const navigateToCRNReceipt = (event, crnNumber) => {
//         event.preventDefault();
//         navigate(`/school-dashboard/fees-module/form/crn-receipts`, {
//             state: {
//                 crnNumber,
//             },
//         });
//     };

//     const toggleDropdown = (studentId) => {
//         setOpenDropdownId(openDropdownId === studentId ? null : studentId);
//     };

//     const filteredStudents = studentData.filter(student => {
//         const searchLower = searchQuery.toLowerCase();
//         return (
//             (student.paymentDate
//                 ? new Date(student.paymentDate).toLocaleDateString('en-GB').replace(/\//g, '-')
//                 : '').toLowerCase().includes(searchLower) ||
//             student.admissionNumber.toLowerCase().includes(searchLower) ||
//             (`${student.firstName} ${student.lastName}`).toLowerCase().includes(searchLower) ||
//             (student.className || getClassNameById(student.classId)).toLowerCase().includes(searchLower) ||
//             (student.sectionName || getSectionNameById(student.sectionId)).toLowerCase().includes(searchLower) ||
//             student.finalAmount.toString().toLowerCase().includes(searchLower) ||
//             student.paymentMode.toLowerCase().includes(searchLower) ||
//             (student.refundReceiptNumbers?.join(", ") || '').toLowerCase().includes(searchLower) ||
//             (student.reportStatus?.join(", ") || '').toLowerCase().includes(searchLower)
//         );
//     });

//     const [currentPage, setCurrentPage] = useState(1);
//     const [studentsPerPage] = useState(10);

//     const indexOfLastStudent = currentPage * studentsPerPage;
//     const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//     const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

//     const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//     const handleNextPage = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handlePageClick = (page) => {
//         setCurrentPage(page);
//     };

//     const pageRange = 1;
//     const startPage = Math.max(1, currentPage - pageRange);
//     const endPage = Math.min(totalPages, currentPage + pageRange);
//     const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="d-flex justify-content-end mb-2 gap-2">
//                     <Link
//                         onClick={(event) => navigateToBoardRegistration(event)}
//                         className="btn btn-sm btn-primary"
//                     >
//                         Add Board Registration Fees
//                     </Link>
//                     <button
//                         className="btn btn-sm btn-secondary"
//                         onClick={handleExport}
//                     >
//                         Export
//                     </button>
//                 </div>
//                 <div className="row">
//                     <div className="col-xl-12">
//                         <div className="card">
//                             <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                                 <h4 className="card-title flex-grow-1">
//                                     Board Registration Fee Payment List
//                                 </h4>
//                                 <div className="d-none d-md-block">
//                                     <input
//                                         type="text"
//                                         className="form-control form-control-sm"
//                                         placeholder="Search by any field"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                         style={{ width: '200px' }}
//                                     />
//                                 </div>
//                                 <select
//                                     className="form-select form-select-sm w-auto"
//                                     value={selectedYear}
//                                     onChange={(e) => {
//                                         setSelectedYear(e.target.value);
//                                         localStorage.setItem("selectedAcademicYear", e.target.value);
//                                     }}
//                                     disabled={loadingYears}
//                                 >
//                                     <option value="" disabled>Select Year</option>
//                                     {academicYears.map((year) => (
//                                         <option key={year._id} value={year.academicYear}>
//                                             {year.academicYear}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div>
//                                 <div className="table-responsive">
//                                     <table className="table align-middle mb-0 table-centered text-center">
//                                         <thead className="bg-light-subtle">
//                                             <tr>
//                                                 <th style={{ width: 20 }}>
//                                                     <div className="form-check ms-1">
//                                                         <input
//                                                             type="checkbox"
//                                                             className="form-check-input"
//                                                             id="customCheck1"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="customCheck1"
//                                                         />
//                                                     </div>
//                                                 </th>
//                                                 <th>Payment Date</th>
//                                                 <th>Admission No.</th>
//                                                 <th>Student Name</th>
//                                                 <th>Class</th>
//                                                 <th>Section</th>
//                                                 <th>Amount</th>
//                                                 <th>Payment Mode</th>
//                                                 <th>Status</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {currentStudents.map((student, index) => {
//                                                 const latestStatus = getDisplayStatus(student.reportStatus);
//                                                 return (
//                                                     <tr key={index}>
//                                                         <td>
//                                                             <div className="form-check ms-1">
//                                                                 <input
//                                                                     type="checkbox"
//                                                                     className="form-check-input"
//                                                                     id={`customCheck${index + 2}`}
//                                                                 />
//                                                                 <label
//                                                                     className="form-check-label"
//                                                                     htmlFor={`customCheck${index + 2}`}
//                                                                 />
//                                                             </div>
//                                                         </td>
//                                                         <td>
//                                                             {student.paymentDate
//                                                                 ? new Date(student.paymentDate).toLocaleDateString('en-GB').replace(/\//g, '-')
//                                                                 : ''}
//                                                         </td>
//                                                         <td>{student.admissionNumber}</td>
//                                                         <td>{`${student.firstName} ${student.lastName}`}</td>
//                                                         <td>{student.className || getClassNameById(student.classId)}</td>
//                                                         <td>{student.sectionName || getSectionNameById(student.sectionId)}</td>
//                                                         <td>{student.finalAmount.toFixed(2)}</td>
//                                                         <td>{student.paymentMode}</td>
//                                                         <td>
//                                                             <span
//                                                                 className={`badge ${latestStatus === 'Paid'
//                                                                     ? 'bg-success text-white'
//                                                                     : latestStatus === 'Cancelled' || latestStatus === 'Cheque Return' || latestStatus === 'Refund'
//                                                                     ? 'bg-danger text-white'
//                                                                     : 'bg-warning text-dark'
//                                                                 }`}
//                                                             >
//                                                                 {latestStatus}
//                                                             </span>
//                                                         </td>
//                                                         <td>
//                                                             <div className="d-flex gap-2">
//                                                                 <Link
//                                                                     className="btn btn-soft-danger btn-sm"
//                                                                     onClick={(e) => {
//                                                                         e.preventDefault();
//                                                                         openDeleteDialog(student);
//                                                                     }}
//                                                                 >
//                                                                     <iconify-icon
//                                                                         icon="solar:trash-bin-minimalistic-2-broken"
//                                                                         className="align-middle fs-18"
//                                                                     />
//                                                                 </Link>
//                                                                 <div className="dropdown">
//                                                                     <Link
//                                                                         className="btn btn-soft-success btn-sm"
//                                                                         onClick={() => toggleDropdown(student._id)}
//                                                                     >
//                                                                         <iconify-icon
//                                                                             icon="solar:download-minimalistic-broken"
//                                                                             className="align-middle fs-18"
//                                                                         />
//                                                                     </Link>
//                                                                     {openDropdownId === student._id && (
//                                                                         <div className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', zIndex: 1000 }}>
//                                                                             <button
//                                                                                 className="dropdown-item"
//                                                                                 onClick={(event) => {
//                                                                                     navigateToFeesReceipt(event, student,student.receiptNumberBrf);
//                                                                                     setOpenDropdownId(null);
//                                                                                 }}
//                                                                             >
//                                                                                 Download {student.receiptNumberBrf}
//                                                                             </button>
//                                                                             {student.refundReceiptNumbers?.length > 0 ? (
//                                                                                 student.refundReceiptNumbers.map((crnNumber, idx) => (
//                                                                                     <button
//                                                                                         key={idx}
//                                                                                         className="dropdown-item"
//                                                                                         onClick={(event) => {
//                                                                                             navigateToCRNReceipt(event, crnNumber);
//                                                                                             setOpenDropdownId(null);
//                                                                                         }}
//                                                                                     >
//                                                                                         Download {crnNumber}
//                                                                                     </button>
//                                                                                 ))
//                                                                             ) : (
//                                                                                 <button className="dropdown-item" disabled>
//                                                                                     No CRN Receipts
//                                                                                 </button>
//                                                                             )}
//                                                                         </div>
//                                                                     )}
//                                                                 </div>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 );
//                                             })}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                             <div className="card-footer border-top">
//                                 <nav aria-label="Page navigation example">
//                                     <ul className="pagination justify-content-end mb-0">
//                                         <li className="page-item">
//                                             <button
//                                                 className="page-link"
//                                                 onClick={handlePreviousPage}
//                                                 disabled={currentPage === 1}
//                                             >
//                                                 Previous
//                                             </button>
//                                         </li>
//                                         {pagesToShow.map((page) => (
//                                             <li
//                                                 key={page}
//                                                 className={`page-item ${currentPage === page ? "active" : ""}`}
//                                             >
//                                                 <button
//                                                     className={`page-link pagination-button ${currentPage === page ? "active" : ""}`}
//                                                     onClick={() => handlePageClick(page)}
//                                                 >
//                                                     {page}
//                                                 </button>
//                                             </li>
//                                         ))}
//                                         <li className="page-item">
//                                             <button
//                                                 className="page-link"
//                                                 onClick={handleNextPage}
//                                                 disabled={currentPage === totalPages}
//                                             >
//                                                 Next
//                                             </button>
//                                         </li>
//                                     </ul>
//                                 </nav>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {isDeleteDialogOpen && (
//                 <ConfirmationDialog
//                     onClose={handleDeleteCancel}
//                     deleteType={deleteType}
//                     id={selectedStudent._id}
//                     onDeleted={() => handleDeleteConfirmed(selectedStudent._id)}
//                 />
//             )}
//         </>
//     );
// };

// export default BoardRegistrationFeePaymentTable;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import * as XLSX from "xlsx";
import { FaFilter, FaDownload } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

const BoardRegistrationFeePaymentTable = () => {
    const navigate = useNavigate();
    const [schoolId, setSchoolId] = useState(null);
    const [studentData, setStudentData] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteType, setDeleteType] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [classList, setClassList] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
    const [loadingYears, setLoadingYears] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [showExportDropdown, setShowExportDropdown] = useState(false);
    const [activeTab, setActiveTab] = useState("Admission No.");
    const [admissionNoFilter, setAdmissionNoFilter] = useState("");
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const dropdownRef = useRef(null);
    const tabs = ["Date","Admission No.", "Academic Year", "Class & Section", "Status", ];
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

        const fetchPayments = async () => {
            try {
                const response = await getAPI(`/get-board-registration-fee-payments/${schoolId}/${selectedYear}`);
                const classRes = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
                if (!classRes.hasError) {
                    setClassList(classRes.data.data);
                }
                if (!response.hasError) {
                    const studentArray = Array.isArray(response.data.data) ? response.data.data : [];
                    setStudentData(studentArray.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)));
                    const statuses = [...new Set(studentArray.map(s => getDisplayStatus(s.reportStatus)).filter(Boolean))];
                    setStatusOptions(statuses.map(status => ({ value: status, label: status })));
                } else {
                    toast.error(response.message || "Failed to fetch payment list.");
                }
            } catch (err) {
                toast.error("Error fetching payment data.");
                console.error("Payment Fetch Error:", err);
            }
        };

        fetchPayments();
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

    const getClassNameById = (id) => {
        const found = classList.find((cls) => cls._id === id);
        return found ? found.className : "N/A";
    };

    const getSectionNameById = (sectionId) => {
        if (!sectionId) {
            return "N/A";
        }
        const found = classList.find((cls) => cls.sections?.some((sec) => sec._id === sectionId));
        const section = found?.sections?.find((sec) => sec._id === sectionId);
        return section ? section.name : "N/A";
    };

    const getDisplayStatus = (reportStatus) => {
        if (!reportStatus || !Array.isArray(reportStatus) || reportStatus.length === 0) {
            return "Pending";
        }
        return reportStatus[reportStatus.length - 1];
    };

    const navigateToBoardRegistration = (event) => {
        event.preventDefault();
        navigate(`/school-dashboard/fees-module/fees-receipts/board-registration/fees`);
    };

    const handleExport = () => {
        const exportData = studentData.map((student) => ({
            "Payment Date": student.paymentDate
                ? new Date(student.paymentDate).toLocaleDateString("en-GB")
                : "",
            "Receipt Number": student.receiptNumberBrf || "",
            "Admission Number": student.admissionNumber || "",
            "Student Name": `${student.firstName} ${student.lastName}` || "",
            "Class Name": student.className || getClassNameById(student.classId),
            "Section Name": student.sectionName || getSectionNameById(student.sectionId),
            "Amount": student.finalAmount.toFixed(2) || "",
            "Payment Mode": student.paymentMode || "",
            "Report Status": getDisplayStatus(student.reportStatus),
            "CRN Numbers": student.refundReceiptNumbers?.join(", ") || "",
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "BoardRegistrationFees");

        XLSX.writeFile(workbook, `Board_Registration_Fee_Payments_${selectedYear}.xlsx`);
    };

    const navigateToFeesReceipt = (event, student, receiptNumber) => {
        event.preventDefault();
        navigate(`/school-dashboard/fees-module/fees-receipts/board-registration/fees/receipts`, {
            state: {
                receiptNumberBrf: receiptNumber,
                schoolId: schoolId,
                className: student.className || getClassNameById(student.classId),
                sectionName: student.sectionName || getSectionNameById(student.sectionId),
                classId: student.classId || "",
                sectionId: student.sectionId || ""
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

    const openDeleteDialog = (student) => {
        setSelectedStudent(student);
        setIsDeleteDialogOpen(true);
        setDeleteType("boardregistrationfeepayment");
    };

    const handleDeleteCancel = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleDeleteConfirmed = (_id) => {
        setStudentData((prevStudents) =>
            prevStudents.filter((student) => student._id !== _id)
        );
    };

    const toggleDropdown = (studentId) => {
        setOpenDropdownId(openDropdownId === studentId ? null : studentId);
    };

    const classOptions = classList.map(cls => ({
        value: cls._id,
        label: cls.className,
    }));

    const sectionOptions = selectedClasses.length > 0
        ? classList
            .filter(cls => selectedClasses.some(selected => selected.value === cls._id))
            .flatMap(cls => cls.sections.map(sec => ({
                value: sec._id,
                label: `${sec.name}`,
            })))
        : [];

    const handleSelectChange = (selected, action) => {
        if (action.name === "class") {
            setSelectedClasses(selected || []);
            setSelectedSections([]); 
        } else if (action.name === "section") {
            setSelectedSections(selected || []);
        } else if (action.name === "status") {
            setSelectedStatuses(selected || []);
        }
    };

    const filteredStudents = studentData.filter(student => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = (
            (student.paymentDate
                ? new Date(student.paymentDate).toLocaleDateString('en-GB').replace(/\//g, '-')
                : '').toLowerCase().includes(searchLower) ||
            (student.admissionNumber || '').toLowerCase().includes(searchLower) ||
            (`${student.firstName} ${student.lastName}`).toLowerCase().includes(searchLower) ||
            (student.className || getClassNameById(student.classId)).toLowerCase().includes(searchLower) ||
            (student.sectionName || getSectionNameById(student.sectionId)).toLowerCase().includes(searchLower) ||
            student.finalAmount.toString().toLowerCase().includes(searchLower) ||
            (student.paymentMode || '').toLowerCase().includes(searchLower) ||
            (student.refundReceiptNumbers?.join(", ") || '').toLowerCase().includes(searchLower) ||
            (getDisplayStatus(student.reportStatus) || '').toLowerCase().includes(searchLower)
        );

        const matchesAdmissionNo = !admissionNoFilter || (student.admissionNumber || "").toLowerCase().includes(admissionNoFilter.toLowerCase());
        const matchesYear = selectedYear ? student.academicYear === selectedYear : true;
        const matchesClass = selectedClasses.length === 0 || selectedClasses.some(c => c.value === student.classId);
        const matchesSection = selectedSections.length === 0 || selectedSections.some(s => s.value === student.sectionId);
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.some(st => st.value === getDisplayStatus(student.reportStatus));
        const matchesDate = !startDate || !endDate || (
            student.paymentDate &&
            new Date(student.paymentDate) >= new Date(startDate) &&
            new Date(student.paymentDate) <= new Date(endDate)
        );

        return matchesSearch && matchesAdmissionNo && matchesYear && matchesClass && matchesSection && matchesStatus && matchesDate;
    });

    const itemsPerPage = rowsPerPage === "all" ? filteredStudents.length : rowsPerPage;
    const indexOfLastStudent = currentPage * itemsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

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

    const toggleFilterPanel = () => {
        setShowFilterPanel(!showFilterPanel);
        setShowExportDropdown(false);
    };

    const toggleExportDropdown = () => {
        setShowExportDropdown(!showExportDropdown);
        setShowFilterPanel(false);
    };

    const resetFilters = () => {
        setAdmissionNoFilter("");
        setSelectedYear(localStorage.getItem("selectedAcademicYear") || "");
        setSelectedClasses([]);
        setSelectedSections([]);
        setSelectedStatuses([]);
        setStartDate("");
        setEndDate("");
        setCurrentPage(1);
    };

    const pageRange = 1;
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);
    const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <>
            <div className="container-fluid">
                <div className="d-flex justify-content-end mb-2 gap-2 align-items-center">
                    <Link
                        onClick={(event) => navigateToBoardRegistration(event)}
                        className="btn btn-sm btn-primary"
                    >
                        Add Board Registration Fees
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
                                                    {activeTab === "Class & Section" && (
                                                        <div className="row d-flex justify-content-center">
                                                            <div className="col-md-4">
                                                                <CreatableSelect
                                                                    isMulti
                                                                    name="class"
                                                                    options={classOptions}
                                                                    value={selectedClasses}
                                                                    onChange={(selected, action) => handleSelectChange(selected, action)}
                                                                    placeholder="Select Classes"
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <CreatableSelect
                                                                    isMulti
                                                                    name="section"
                                                                    options={sectionOptions}
                                                                    value={selectedSections}
                                                                    onChange={(selected, action) => handleSelectChange(selected, action)}
                                                                    placeholder="Select Sections"
                                                                    className="mt-2"
                                                                    isDisabled={selectedClasses.length === 0}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {activeTab === "Status" && (
                                                        <div className="row d-lg-flex justify-content-center">
                                                            <div className="col-md-8">
                                                                <CreatableSelect
                                                                    isMulti
                                                                    name="status"
                                                                    options={statusOptions}
                                                                    value={selectedStatuses}
                                                                    onChange={(selected, action) => handleSelectChange(selected, action)}
                                                                    placeholder="Select Statuses"
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {activeTab === "Date" && (
                                                        <div className="row d-lg-flex justify-content-center">
                                                            <div className="col-md-4">
                                                                <input
                                                                    type="date"
                                                                    className="form-control mt-2"
                                                                    placeholder="Start Date"
                                                                    value={startDate}
                                                                    onChange={(e) => setStartDate(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <input
                                                                    type="date"
                                                                    className="form-control mt-2"
                                                                    placeholder="End Date"
                                                                    value={endDate}
                                                                    onChange={(e) => setEndDate(e.target.value)}
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
                                    Board Registration Fee Payment List
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
                                                <th>Payment Date</th>
                                                <th>Admission No.</th>
                                                <th>Student Name</th>
                                                <th>Class</th>
                                                <th>Section</th>
                                                <th>Amount</th>
                                                <th>Payment Mode</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentStudents.map((student, index) => {
                                                const latestStatus = getDisplayStatus(student.reportStatus);
                                                return (
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
                                                                ? new Date(student.paymentDate).toLocaleDateString('en-GB').replace(/\//g, '-')
                                                                : '-'}
                                                        </td>
                                                        <td>{student.admissionNumber || '-'}</td>
                                                        <td>{`${student.firstName} ${student.lastName}`}</td>
                                                        <td>{student.className || getClassNameById(student.classId)}</td>
                                                        <td>{student.sectionName || getSectionNameById(student.sectionId)}</td>
                                                        <td>{student.finalAmount.toFixed(2)}</td>
                                                        <td>{student.paymentMode || '-'}</td>
                                                        <td>
                                                            <span
                                                                className={`badge ${latestStatus === 'Paid'
                                                                    ? 'bg-success text-white'
                                                                    : latestStatus === 'Cancelled' || latestStatus === 'Cheque Return' || latestStatus === 'Refund'
                                                                    ? 'bg-danger text-white'
                                                                    : 'bg-warning text-dark'
                                                                }`}
                                                            >
                                                                {latestStatus}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex gap-2">
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
                                                                        <div className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', zIndex: 1000 }}>
                                                                            <button
                                                                                className="dropdown-item"
                                                                                onClick={(event) => {
                                                                                    navigateToFeesReceipt(event, student, student.receiptNumberBrf);
                                                                                    setOpenDropdownId(null);
                                                                                }}
                                                                            >
                                                                                Download {student.receiptNumberBrf}
                                                                            </button>
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
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
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
            {isDeleteDialogOpen && (
                <ConfirmationDialog
                    onClose={handleDeleteCancel}
                    deleteType={deleteType}
                    id={selectedStudent._id}
                    onDeleted={() => handleDeleteConfirmed(selectedStudent._id)}
                />
            )}
        </>
    );
};

export default BoardRegistrationFeePaymentTable;