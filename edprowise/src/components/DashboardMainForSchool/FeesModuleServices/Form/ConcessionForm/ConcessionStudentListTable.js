// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import getAPI from "../../../../../api/getAPI";
// import { toast } from "react-toastify";
// import ConfirmationDialog from "../../../../ConfirmationDialog";
// import ExcelSheetModal from "./ExcelSheetModal";
// import { generatePDF } from "./generateStudentPDF";
// import * as XLSX from "xlsx";

// const ConcessionStudentListTable = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [studentData, setStudentData] = useState([]);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [deleteType, setDeleteType] = useState("");
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [classes, setClasses] = useState([]);
//   const [academicYears, setAcademicYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
//   const [loadingYears, setLoadingYears] = useState(false);
//   const [showImportModal, setShowImportModal] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");


//   useEffect(() => {
//     const fetchAcademicYears = async () => {
//       try {
//         setLoadingYears(true);
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
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

//   const openDeleteDialog = (request) => {
//     setSelectedRequest(request);
//     setIsDeleteDialogOpen(true);
//     setDeleteType("concessionform");
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//   };

//   const handleDeleteConfirmed = (_id) => {
//     setStudentData((prevRequests) =>
//       prevRequests.filter((request) => request._id !== _id)
//     );
//   };

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
//         const response = await getAPI(`/get-concession-form/${schoolId}/${selectedYear}`);
//         console.log("API response:", response);

//         if (!response.hasError) {
//           const studentArray = Array.isArray(response.data.forms) ? response.data.forms : [];
//           setStudentData(studentArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!schoolId) return;
//         const response = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
//         console.log("Class and Section API Response:", response?.data?.data);
//         setClasses(response?.data?.data || []);
//       } catch (error) {
//         toast.error('Error fetching class and section data.');
//       }
//     };

//     fetchData();
//   }, [schoolId]);

//   const getClassName = (classId) => {
//     const cls = classes.find((item) => item._id === classId);
//     return cls?.className || "N/A";
//   };

//   const getSectionName = (classId, sectionId) => {
//     const cls = classes.find((item) => item._id === classId);
//     if (!cls) return "N/A";

//     const section = (cls.sections || []).find((sec) => sec._id === sectionId);
//     return section?.name || "N/A";
//   };

//   const [feeTypes, setFeeTypes] = useState([]);

//   useEffect(() => {
//     const fetchFeeTypes = async () => {
//       try {
//         if (!schoolId) return;
//         const response = await getAPI(`/getall-fess-type/${schoolId}`);
//         if (!response.hasError) {
//           setFeeTypes(response.data.data || []);
//         } else {
//           toast.error("Failed to fetch fee types.");
//         }
//       } catch (error) {
//         toast.error('Error fetching fee types.');
//         console.error("Fee Types Fetch Error:", error);
//       }
//     };

//     fetchFeeTypes();
//   }, [schoolId]);

//   const navigateToConcessionForm = (event) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/concession-form`);
//   };

//   const navigateToViewConcessionInfo = (event, student) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/view-concession-details`, {
//       state: { student },
//     });
//   };

//   const navigateToUpdateConcessionForm = (event, student) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/form/update-concession-form`, {
//       state: { student },
//     });
//   };

//   // const navigateToDownloadConcessionReceipt = (event, student) => {
//   //   event.preventDefault();
//   //   navigate(`/school-dashboard/fees-module/form/concession-form-details`, {
//   //     state: {
//   //       formData: student,
//   //       className: getClassName(student.masterDefineClass),
//   //       sectionName: getSectionName(student.masterDefineClass, student.section),
//   //       feeTypes,
//   //       receiptNumber: student.receiptNumber,
//   //     },
//   //   });
//   // };

//   const handleImportSuccess = () => {
//     if (schoolId && selectedYear) {
//       getAPI(`/get-concession-form/${schoolId}/${selectedYear}`).then((response) => {
//         if (!response.hasError) {
//           const studentArray = Array.isArray(response.data.forms) ? response.data.forms : [];
//           setStudentData(studentArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
//         }
//       });
//     }
//     setShowImportModal(false);
//   };

// const handleExport = () => {
//   const exportData = studentData.map((student) => {
//     const studentBase = {
//       AdmissionNumber: student.AdmissionNumber,
//       firstName: student.firstName,
//       lastName: student.lastName,
//       masterDefineClass: getClassName(student.masterDefineClass),
//       section: getSectionName(student.masterDefineClass, student.section),
//       concessionType: student.concessionType,
//       middleName: student.middleName,
//       concessionNumber: student.receiptNumber,
//       status: student.status,
//     };

//     const concessionFields = student.concessionDetails.reduce((acc, detail, index) => {
//       const feeType = feeTypes.find((ft) => ft._id === detail.feesType);
//       const feeTypeName = feeType ? feeType.feesTypeName : "N/A";

//       return {
//         ...acc,
//         [`concession_${index}_installmentName`]: detail.installmentName,
//         [`concession_${index}_feesType`]: feeTypeName, 
//         [`concession_${index}_totalFees`]: detail.totalFees,
//         [`concession_${index}_concessionPercentage`]: detail.concessionPercentage,
//         [`concession_${index}_concessionAmount`]: detail.concessionAmount,
//         [`concession_${index}_balancePayable`]: detail.balancePayable,
//       };
//     }, {});

//     return { ...studentBase, ...concessionFields };
//   });

//   const worksheet = XLSX.utils.json_to_sheet(exportData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Concessions");

//   XLSX.writeFile(workbook, `Concession_Student_List_${selectedYear}.xlsx`);
// };

// const filteredStudents = studentData.filter((student) => {
//   const query = searchQuery.toLowerCase();
//   return (
//     (student.certificateNumber?.toLowerCase() || '').includes(query) ||
//     (student.AdmissionNumber?.toLowerCase() || '').includes(query) ||
//     (student.firstName?.toLowerCase() || '').includes(query) ||
//     (student.lastName?.toLowerCase() || '').includes(query) ||
//     (getClassName(student.masterDefineClass)?.toLowerCase() || '').includes(query) ||
//     (student.status?.toLowerCase() || '').includes(query) ||
//     (student.dateOfIssue ? new Date(student.dateOfIssue).toLocaleDateString().toLowerCase() : '').includes(query)
//   );
// });



//   const [currentPage, setCurrentPage] = useState(1);
//    const [studentListPerPage] = useState(10);
 
//    const indexOfLastStudent = currentPage * studentListPerPage;
//    const indexOfFirstStudent = indexOfLastStudent - studentListPerPage;
//    const currentStudent = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
 
//    const totalPages = Math.ceil(filteredStudents.length / studentListPerPage);
 
//    const handleNextPage = () => {
//      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//    };
 
//    const handlePreviousPage = () => {
//      if (currentPage > 1) setCurrentPage(currentPage - 1);
//    };
 
//    const handlePageClick = (page) => {
//      setCurrentPage(page);
//    };
 
//    const pageRange = 1;
//    const startPage = Math.max(1, currentPage - pageRange);
//    const endPage = Math.min(totalPages, currentPage + pageRange);
//    const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
//   const handleDownloadPDF = async (student) => {
//     setIsGenerating(true);
//     try {
//       await generatePDF(schoolId, student, getClassName, getSectionName, feeTypes);
//       console.log(schoolId)
//     } catch (error) {
//       toast.error("Failed to generate PDF.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="d-flex justify-content-end mb-2 gap-2">
//           <Link onClick={(event) => navigateToConcessionForm(event)} className="btn btn-sm btn-primary">
//             Add Concession Form
//           </Link>
//           <button className="btn btn-sm btn-secondary" onClick={() => setShowImportModal(true)}>
//             Import
//           </button>
//            <button
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
//                 <h4 className="card-title flex-grow-1">Concession List</h4>
//                  <div className="d-none d-md-block">
//                   <input
//                     type="text"
//                     className="form-control form-control-sm"
//                     placeholder="Search by any field "
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     style={{ width: '200px' }}
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
//                   <table className="table align-middle mb-0  table-centered text-center">
//                     <thead className="bg-light-subtle">
//                       <tr>
//                         <th style={{ width: 20 }}>
//                           <div className="form-check ms-1">
//                             <input type="checkbox" className="form-check-input" id="customCheck1" />
//                             <label className="form-check-label" htmlFor="customCheck1" />
//                           </div>
//                         </th>
//                         <th>Admission No.</th>
//                         <th>Student Name</th>
//                         <th>Class</th>
//                         <th>Section</th>
//                         <th>Concession Type</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentStudent.map((student, index) => (
//                         <tr key={index}>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input type="checkbox" className="form-check-input" id="customCheck2" />
//                               <label className="form-check-label" htmlFor="customCheck2"> </label>
//                             </div>
//                           </td>
//                           <td>{student.AdmissionNumber}</td>
//                           <td>{student.firstName} {student.lastName}</td>
//                           <td>{getClassName(student.masterDefineClass)}</td>
//                           <td>{getSectionName(student.masterDefineClass, student.section)}</td>
//                           <td>{student.concessionType}</td>
//                           <td>
//                             <button
//                               className={`btn btn-sm ${student.status === 'Approved'
//                                 ? 'btn-success'
//                                 : student.status === 'Pending'
//                                   ? 'btn-warning'
//                                   : 'btn-danger'
//                                 }`}
//                             >
//                               {student.status}
//                             </button>

//                           </td>
//                           <td>
//                             <div className="d-flex gap-2">
//                               <Link
//                                 className="btn btn-light btn-sm"
//                                 onClick={(event) => navigateToViewConcessionInfo(event, student)}
//                               >
//                                 <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                               </Link>
//                               <Link
//                                 className="btn btn-soft-primary btn-sm"
//                                 onClick={(event) => navigateToUpdateConcessionForm(event, student)}
//                               >
//                                 <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
//                               </Link>
//                               <Link
//                                 className="btn btn-soft-danger btn-sm"
//                                 onClick={(e) => { e.preventDefault(); openDeleteDialog(student); }}
//                               >
//                                 <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
//                               </Link>
//                               <button
//                                 className="btn btn-soft-success btn-sm"
//                                 onClick={() => handleDownloadPDF(student)}
//                                 disabled={isGenerating}
//                               >
//                                 <iconify-icon icon="solar:download-minimalistic-broken" className="align-middle fs-18" />
//                               </button>

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
//                       <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>
//                         Previous
//                       </button>
//                     </li>
//                     {pagesToShow.map((page) => (
//                       <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
//                         <button
//                           className={`page-link pagination-button ${currentPage === page ? "active" : ""}`}
//                           onClick={() => handlePageClick(page)}
//                         >
//                           {page}
//                         </button>
//                       </li>
//                     ))}
//                     <li className="page-item">
//                       <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
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
//       {isDeleteDialogOpen && (
//         <ConfirmationDialog
//           onClose={handleDeleteCancel}
//           deleteType={deleteType}
//           id={selectedRequest._id}
//           onDeleted={() => handleDeleteConfirmed(selectedRequest._id)}
//         />
//       )}
//       <ExcelSheetModal
//         show={showImportModal}
//         onClose={() => setShowImportModal(false)}
//         schoolId={schoolId}
//         academicYear={selectedYear}
//         onImportSuccess={handleImportSuccess}
//         classes={classes}
//       />
//     </>
//   );
// };

// export default ConcessionStudentListTable;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import ExcelSheetModal from "./ExcelSheetModal";
import { generatePDF } from "./generateStudentPDF";
import * as XLSX from "xlsx";
import { FaFilter, FaDownload } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

const ConcessionStudentListTable = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [classes, setClasses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
  const [loadingYears, setLoadingYears] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
  const [feeTypes, setFeeTypes] = useState([]);
  const dropdownRef = useRef(null);
  const tabs = ["Admission No.", "Academic Year", "Class & Section", "Status"];
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

    const fetchStudents = async () => {
      try {
        const response = await getAPI(`/get-concession-form/${schoolId}/${selectedYear}`);
        if (!response.hasError) {
          const studentArray = Array.isArray(response.data.forms) ? response.data.forms : [];
          const sortedStudents = studentArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setStudentData(sortedStudents);

          // Extract unique statuses for filter
          const statuses = [...new Set(sortedStudents.map(s => s.status).filter(Boolean))];
          setStatusOptions(statuses.map(status => ({ value: status, label: status })));
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
    const fetchData = async () => {
      try {
        if (!schoolId || !selectedYear) return;
        const response = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
        const uniqueClasses = Array.from(
          new Map(response?.data?.data.map(cls => [cls._id, cls])).values()
        );
        setClasses(uniqueClasses || []);
      } catch (error) {
        toast.error('Error fetching class and section data.');
      }
    };

    fetchData();
  }, [schoolId, selectedYear]);

  useEffect(() => {
    const fetchFeeTypes = async () => {
      try {
        if (!schoolId) return;
        const response = await getAPI(`/getall-fess-type/${schoolId}`);
        if (!response.hasError) {
          setFeeTypes(response.data.data || []);
        } else {
          toast.error("Failed to fetch fee types.");
        }
      } catch (error) {
        toast.error('Error fetching fee types.');
        console.error("Fee Types Fetch Error:", error);
      }
    };

    fetchFeeTypes();
  }, [schoolId]);

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

  const openDeleteDialog = (request) => {
    setSelectedRequest(request);
    setIsDeleteDialogOpen(true);
    setDeleteType("concessionform");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = (_id) => {
    setStudentData((prevRequests) =>
      prevRequests.filter((request) => request._id !== _id)
    );
  };

  const getClassName = (classId) => {
    const cls = classes.find((item) => item._id === classId);
    return cls?.className || "N/A";
  };

  const getSectionName = (classId, sectionId) => {
    const cls = classes.find((item) => item._id === classId);
    if (!cls) return "N/A";
    const section = (cls.sections || []).find((sec) => sec._id === sectionId);
    return section?.name || "N/A";
  };

  const classOptions = classes.map(cls => ({
    value: cls._id,
    label: cls.className,
  }));

  const sectionOptions = selectedClasses.length > 0
    ? classes
        .filter(cls => selectedClasses.some(selected => selected.value === cls._id))
        .flatMap(cls => cls.sections.map(sec => ({
          value: sec._id,
          label: ` ${sec.name}`,
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

  const navigateToConcessionForm = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/concession-form`);
  };

  const navigateToViewConcessionInfo = (event, student) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/view-concession-details`, {
      state: { student },
    });
  };

  const navigateToUpdateConcessionForm = (event, student) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/form/update-concession-form`, {
      state: { student },
    });
  };

  const handleImportSuccess = () => {
    if (schoolId && selectedYear) {
      getAPI(`/get-concession-form/${schoolId}/${selectedYear}`).then((response) => {
        if (!response.hasError) {
          const studentArray = Array.isArray(response.data.forms) ? response.data.forms : [];
          setStudentData(studentArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        }
      });
    }
    setShowImportModal(false);
  };

  const handleExport = () => {
    const exportData = studentData.map((student) => {
      const studentBase = {
        AdmissionNumber: student.AdmissionNumber,
        firstName: student.firstName,
        lastName: student.lastName,
        masterDefineClass: getClassName(student.masterDefineClass),
        section: getSectionName(student.masterDefineClass, student.section),
        concessionType: student.concessionType,
        middleName: student.middleName,
        concessionNumber: student.receiptNumber,
        status: student.status,
        academicYear: selectedYear || "",
      };

      const concessionFields = student.concessionDetails.reduce((acc, detail, index) => {
        const feeType = feeTypes.find((ft) => ft._id === detail.feesType);
        const feeTypeName = feeType ? feeType.feesTypeName : "N/A";

        return {
          ...acc,
          [`concession_${index}_installmentName`]: detail.installmentName,
          [`concession_${index}_feesType`]: feeTypeName,
          [`concession_${index}_totalFees`]: detail.totalFees,
          [`concession_${index}_concessionPercentage`]: detail.concessionPercentage,
          [`concession_${index}_concessionAmount`]: detail.concessionAmount,
          [`concession_${index}_balancePayable`]: detail.balancePayable,
        };
      }, {});

      return { ...studentBase, ...concessionFields };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Concessions");

    XLSX.writeFile(workbook, `Concession_Student_List_${selectedYear}.xlsx`);
  };

  const handleDownloadPDF = async (student) => {
    setIsGenerating(true);
    try {
      await generatePDF(schoolId, student, getClassName, getSectionName, feeTypes);
    } catch (error) {
      toast.error("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredStudents = studentData.filter((student) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      (student.AdmissionNumber?.toLowerCase() || '').includes(query) ||
      (student.firstName?.toLowerCase() || '').includes(query) ||
      (student.lastName?.toLowerCase() || '').includes(query) ||
      (getClassName(student.masterDefineClass)?.toLowerCase() || '').includes(query) ||
      (getSectionName(student.masterDefineClass, student.section)?.toLowerCase() || '').includes(query) ||
      (student.concessionType?.toLowerCase() || '').includes(query) ||
      (student.status?.toLowerCase() || '').includes(query)
    );

    const matchesAdmissionNo = !admissionNoFilter || (student.AdmissionNumber || "").toLowerCase().includes(admissionNoFilter.toLowerCase());
    const matchesYear = selectedYear ? student.academicYear === selectedYear : true;
    const matchesClass = selectedClasses.length === 0 || selectedClasses.some(c => c.value === student.masterDefineClass);
    const matchesSection = selectedSections.length === 0 || selectedSections.some(s => s.value === student.section);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.some(st => st.value === student.status);

    return matchesSearch && matchesAdmissionNo && matchesYear && matchesClass && matchesSection && matchesStatus;
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
            onClick={(event) => navigateToConcessionForm(event)}
            className="btn btn-sm btn-primary"
          >
            Add Concession Form
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
                  Concession List
                </h4>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th style={{ width: 20 }}>
                          <div className="form-check ms-1">
                            <input type="checkbox" className="form-check-input" id="customCheck1" />
                            <label className="form-check-label" htmlFor="customCheck1" />
                          </div>
                        </th>
                        <th>Admission No.</th>
                        <th>Student Name</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Concession Type</th>
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
                          <td>{student.AdmissionNumber || "N/A"}</td>
                          <td>{student.firstName} {student.lastName}</td>
                          <td>{getClassName(student.masterDefineClass)}</td>
                          <td>{getSectionName(student.masterDefineClass, student.section)}</td>
                          <td>{student.concessionType || "N/A"}</td>
                          <td>
                            <button
                              className={`btn btn-sm ${
                                student.status === 'Approved'
                                  ? 'btn-success'
                                  : student.status === 'Pending'
                                    ? 'btn-warning'
                                    : 'btn-danger'
                              }`}
                            >
                              {student.status || "Pending"}
                            </button>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                className="btn btn-light btn-sm"
                                onClick={(event) => navigateToViewConcessionInfo(event, student)}
                              >
                                <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                              </Link>
                              <Link
                                className="btn btn-soft-primary btn-sm"
                                onClick={(event) => navigateToUpdateConcessionForm(event, student)}
                              >
                                <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
                              </Link>
                              <Link
                                className="btn btn-soft-danger btn-sm"
                                onClick={(e) => { e.preventDefault(); openDeleteDialog(student); }}
                              >
                                <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                              </Link>
                              <button
                                className="btn btn-soft-success btn-sm"
                                onClick={() => handleDownloadPDF(student)}
                                disabled={isGenerating}
                              >
                                <iconify-icon icon="solar:download-minimalistic-broken" className="align-middle fs-18" />
                              </button>
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
                      <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                      </button>
                    </li>
                    {pagesToShow.map((page) => (
                      <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                        <button
                          className={`page-link pagination-button ${currentPage === page ? "active" : ""}`}
                          onClick={() => handlePageClick(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
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
          id={selectedRequest._id}
          onDeleted={() => handleDeleteConfirmed(selectedRequest._id)}
        />
      )}
      <ExcelSheetModal
        show={showImportModal}
        onClose={() => setShowImportModal(false)}
        schoolId={schoolId}
        academicYear={selectedYear}
        onImportSuccess={handleImportSuccess}
        classes={classes}
      />
    </>
  );
};

export default ConcessionStudentListTable;