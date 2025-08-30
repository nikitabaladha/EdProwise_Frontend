// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import ConfirmationDialog from '../../../../ConfirmationDialog';
// import getAPI from '../../../../../api/getAPI';
// import { toast } from 'react-toastify';
// import ExcelSheetModal from './ExcelSheetModal';
// import { exportToExcel } from '../../../../export-excel';

// const ClassAndSection = () => {
//   const navigate = useNavigate();
//   const [requests, setRequests] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [requestPerPage] = useState(5);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [deleteType, setDeleteType] = useState('');
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [schoolId, setSchoolId] = useState('');
//   const [shifts, setShifts] = useState([]);
//   const [showImportModal, setShowImportModal] = useState(false);
//   const [academicYears, setAcademicYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
//   const [loadingYears, setLoadingYears] = useState(false);

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

//     const fetchData = async () => {
//       try {
//         const classResponse = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
//         setRequests(classResponse?.data?.data || []);

//         const shiftResponse = await getAPI(`/master-define-shift-year/${schoolId}/year/${selectedYear}`);
//         if (!shiftResponse.hasError) {
//           const shiftArray = Array.isArray(shiftResponse.data?.data) ? shiftResponse.data.data : [];
//           setShifts(shiftArray);
//         } else {
//           toast.error(shiftResponse.message || 'Failed to fetch shifts.');
//           setShifts([]);
//         }
//       } catch (error) {
//         toast.error('Error fetching data.');
//         console.error('Fetch Error:', error);
//       }
//     };

//     fetchData();
//   }, [schoolId, selectedYear]);

//   const handleOpenImportModal = async () => {
//     if (!schoolId || !selectedYear) {
//       toast.error("Please select a school and academic year.");
//       return;
//     }

//     try {
//       const shiftResponse = await getAPI(`/master-define-shift-year/${schoolId}/year/${selectedYear}`);
//       if (!shiftResponse.hasError) {
//         const shiftArray = Array.isArray(shiftResponse.data?.data) ? shiftResponse.data.data : [];
//         setShifts(shiftArray);
//       } else {
//         toast.error(shiftResponse.message || 'Failed to fetch shifts.');
//         setShifts([]);
//       }
//     } catch (error) {
//       toast.error('Error fetching shifts.');
//       console.error('Fetch Error:', error);
//     }
//     setShowImportModal(true);
//   };

//   const handleImportSuccess = async () => {
//     try {
//       const response = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
//       setRequests(response?.data?.data || []);
//     } catch (error) {
//       toast.error('Error refreshing class and section data.');
//     }
//   };

//   const handleExport = () => {
//     const exportData = requests.flatMap((classandsection) =>
//       classandsection.sections.map((section) => ({
//         Class: classandsection.className,
//         Section: section.name,
//         Shift: getShiftName(section.shiftId),
//       }))
//     );

//     if (!exportData.length) {
//       toast.error('No data to export');
//       return;
//     }

//     exportToExcel(exportData, 'ClassAndSectionData', 'ClassAndSection');
//     toast.success('Data exported successfully!');
//   };

//   const indexOfLastRequest = currentPage * requestPerPage;
//   const indexOfFirstRequest = indexOfLastRequest - requestPerPage;
//   const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);
//   const totalPages = Math.ceil(requests.length / requestPerPage);

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
//   const pagesToShow = Array.from(
//     { length: endPage - startPage + 1 },
//     (_, index) => startPage + index
//   );

//   const openDeleteDialog = (request) => {
//     setSelectedRequest(request);
//     setIsDeleteDialogOpen(true);
//     setDeleteType('classandsection');
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//   };

//   const handleDeleteConfirmed = (_id) => {
//     setRequests((prevRequests) => prevRequests.filter((request) => request._id !== _id));
//   };

//   const navigateToAddNewClass = (event) => {
//     event.preventDefault();
//     navigate(`/school-dashboard/fees-module/admin-setting/grade/class-section/create-class-section`);
//   };

//   const getShiftName = (shiftId) => {
//     const shift = shifts.find((s) => s._id === shiftId);
//     return shift ? shift.masterDefineShiftName : 'N/A';
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="d-flex justify-content-end mb-2 gap-2">
//               <button
//                 className="btn btn-sm btn-primary"
//                 onClick={handleOpenImportModal} 
//               >
//                 Import
//               </button>
//               <button
//                 className="btn btn-sm btn-secondary"
//                 onClick={handleExport}
//               >
//                 Export
//               </button>
//             </div>

//             <div className="card">
//               <div className="card-header d-flex justify-content-between align-items-center gap-1">
//                 <h4 className="card-title flex-grow-1">All Class & Section</h4>
//                 <Link
//                   onClick={(event) => navigateToAddNewClass(event)}
//                   className="btn btn-sm btn-primary"
//                 >
//                   Create Class & Section
//                 </Link>
//                 <div className="text-end">
//                   <select
//                     className="form-select"
//                     value={selectedYear}
//                     onChange={(e) => {
//                       setSelectedYear(e.target.value);
//                       localStorage.setItem("selectedAcademicYear", e.target.value);
//                     }}
//                     disabled={loadingYears}
//                   >
//                     <option value="" disabled>Select Year</option>
//                     {academicYears.map((year) => (
//                       <option key={year._id} value={year.academicYear}>
//                         {year.academicYear}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-centered text-center">
//                   <thead className="bg-light-subtle">
//                     <tr>
//                       <th style={{ width: 20 }}>
//                         <div className="form-check ms-1">
//                           <input type="checkbox" className="form-check-input" id="customCheck1" />
//                           <label className="form-check-label" htmlFor="customCheck1" />
//                         </div>
//                       </th>
//                       <th>Class</th>
//                       <th>Section</th>
//                       <th>Shift</th>
//                       <th className="text-start">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentRequests.map((classandsection, index) => (
//                       <tr key={index}>
//                         <td>
//                           <div className="form-check ms-1">
//                             <input type="checkbox" className="form-check-input" />
//                           </div>
//                         </td>
//                         <td>{classandsection.className}</td>
//                         <td>{classandsection.sections.map((section) => section.name).join(', ')}</td>
//                         <td>
//                           {classandsection.sections
//                             .map((section) => getShiftName(section.shiftId))
//                             .filter((name, idx, arr) => arr.indexOf(name) === idx)
//                             .join(', ')}
//                         </td>
//                         <td>
//                           <div className="d-flex gap-2">
//                             <button
//                               onClick={() =>
//                                 navigate(
//                                   '/school-dashboard/fees-module/admin-setting/grade/class-section/view-class-section',
//                                   {
//                                     state: { classandsection },
//                                   }
//                                 )
//                               }
//                               className="btn btn-light btn-sm"
//                             >
//                               <iconify-icon
//                                 icon="solar:eye-broken"
//                                 className="align-middle fs-18"
//                               />
//                             </button>
//                             <button
//                               className="btn btn-soft-primary btn-sm"
//                               onClick={() =>
//                                 navigate(
//                                   '/school-dashboard/fees-module/admin-setting/grade/class-section/update-class-section',
//                                   {
//                                     state: { classandsection },
//                                   }
//                                 )
//                               }
//                             >
//                               <iconify-icon
//                                 icon="solar:pen-2-broken"
//                                 className="align-middle fs-18"
//                               />
//                             </button>
//                             <Link
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 openDeleteDialog(classandsection);
//                               }}
//                               className="btn btn-soft-danger btn-sm"
//                             >
//                               <iconify-icon
//                                 icon="solar:trash-bin-minimalistic-2-broken"
//                                 className="align-middle fs-18"
//                               />
//                             </Link>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
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
//                         className={`page-item ${currentPage === page ? 'active' : ''}`}
//                       >
//                         <button
//                           className={`page-link pagination-button ${currentPage === page ? 'active' : ''}`}
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
//         shifts={shifts}
//         schoolId={schoolId}
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
//     </>
//   );
// };

// export default ClassAndSection;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../../../ConfirmationDialog';
import getAPI from '../../../../../api/getAPI';
import { toast } from 'react-toastify';
import ExcelSheetModal from './ExcelSheetModal';
import { exportToExcel } from '../../../../export-excel';

const ClassAndSection = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [schoolId, setSchoolId] = useState('');
  const [shifts, setShifts] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
  const [loadingYears, setLoadingYears] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        setLoadingYears(true);
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const schoolId = userDetails?.schoolId;
        if (!schoolId) {
          toast.error('School ID not found. Please log in again.');
          return;
        }
        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        setAcademicYears(response.data.data || []);
      } catch (err) {
        console.error('Error fetching academic years:', err);
        toast.error('Error fetching academic years.');
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

    const fetchData = async () => {
      try {
        const classResponse = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
        setRequests(classResponse?.data?.data || []);

        const shiftResponse = await getAPI(`/master-define-shift-year/${schoolId}/year/${selectedYear}`);
        if (!shiftResponse.hasError) {
          const shiftArray = Array.isArray(shiftResponse.data?.data) ? shiftResponse.data.data : [];
          setShifts(shiftArray);
        } else {
          toast.error(shiftResponse.message || 'Failed to fetch shifts.');
          setShifts([]);
        }
      } catch (error) {
        toast.error('Error fetching data.');
        console.error('Fetch Error:', error);
      }
    };

    fetchData();
  }, [schoolId, selectedYear]);

  const handleOpenImportModal = async () => {
    if (!schoolId || !selectedYear) {
      toast.error("Please select a school and academic year.");
      return;
    }

    try {
      const shiftResponse = await getAPI(`/master-define-shift-year/${schoolId}/year/${selectedYear}`);
      if (!shiftResponse.hasError) {
        const shiftArray = Array.isArray(shiftResponse.data?.data) ? shiftResponse.data.data : [];
        setShifts(shiftArray);
      } else {
        toast.error(shiftResponse.message || 'Failed to fetch shifts.');
        setShifts([]);
      }
    } catch (error) {
      toast.error('Error fetching shifts.');
      console.error('Fetch Error:', error);
    }
    setShowImportModal(true);
  };

  const handleImportSuccess = async () => {
    try {
      const response = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
      setRequests(response?.data?.data || []);
    } catch (error) {
      toast.error('Error refreshing class and section data.');
    }
  };

  // Moved getShiftName before handleExport to avoid TDZ error
  const getShiftName = (shiftId) => {
    const shift = shifts.find((s) => s._id === shiftId);
    return shift ? shift.masterDefineShiftName : 'N/A';
  };

  const handleExport = () => {
    const exportData = requests.flatMap((classandsection) =>
      classandsection.sections.map((section) => ({
        Class: classandsection.className,
        Section: section.name,
        Shift: getShiftName(section.shiftId),
      }))
    );

    if (!exportData.length) {
      toast.error('No data to export');
      return;
    }

    exportToExcel(exportData, 'ClassAndSectionData', 'ClassAndSection');
    toast.success('Data exported successfully!');
  };

  // Filter requests based on search query
  const filteredRequests = requests.filter((classandsection) => {
    const query = searchQuery.toLowerCase();
    const classNameMatch = classandsection.className?.toLowerCase().includes(query);
    const sectionMatch = classandsection.sections.some((section) =>
      section.name?.toLowerCase().includes(query)
    );
    const shiftMatch = classandsection.sections.some((section) =>
      getShiftName(section.shiftId)?.toLowerCase().includes(query)
    );
    return classNameMatch || sectionMatch || shiftMatch;
  });

  // Pagination logic
  const indexOfLastRequest = currentPage * requestPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestPerPage);

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

  const openDeleteDialog = (request) => {
    setSelectedRequest(request);
    setIsDeleteDialogOpen(true);
    setDeleteType('classandsection');
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request._id !== _id));
    setIsDeleteDialogOpen(false);
    setSelectedRequest(null);
  };

  const navigateToAddNewClass = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/admin-setting/grade/class-section/create-class-section`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="d-flex justify-content-end mb-2 gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={handleOpenImportModal}
            >
              Import
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={handleExport}
            >
              Export
            </button>
          </div>

          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center gap-1">
              <h4 className="card-title flex-grow-1">All Class & Section</h4>
              <div className="d-none d-md-block">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by any field"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '200px' }}
                />
              </div>
              <Link
                onClick={navigateToAddNewClass}
                className="btn btn-sm btn-primary"
              >
                Create Class & Section
              </Link>
              <div className="d-flex align-items-center gap-2">
                <select
                  className="form-select form-select-sm w-auto"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    localStorage.setItem("selectedAcademicYear", e.target.value);
                  }}
                  disabled={loadingYears}
                >
                  <option value="" disabled>Select Year</option>
                  {academicYears.map((year) => (
                    <option key={year._id} value={year.academicYear}>
                      {year.academicYear}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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
                    <th>Class</th>
                    <th>Section</th>
                    <th>Shift</th>
                    <th className="text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.length > 0 ? (
                    currentRequests.map((classandsection, index) => (
                      <tr key={classandsection._id || index}>
                        <td>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`customCheck-${index}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`customCheck-${index}`}
                            >
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>{classandsection.className || 'N/A'}</td>
                        <td>{classandsection.sections?.map((section) => section.name).join(', ') || 'N/A'}</td>
                        <td>
                          {classandsection.sections
                            ?.map((section) => getShiftName(section.shiftId))
                            .filter((name, idx, arr) => arr.indexOf(name) === idx)
                            .join(', ') || 'N/A'}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  '/school-dashboard/fees-module/admin-setting/grade/class-section/view-class-section',
                                  {
                                    state: { classandsection },
                                  }
                                )
                              }
                              className="btn btn-light btn-sm"
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                            <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() =>
                                navigate(
                                  '/school-dashboard/fees-module/admin-setting/grade/class-section/update-class-section',
                                  {
                                    state: { classandsection },
                                  }
                                )
                              }
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                            <Link
                              onClick={(e) => {
                                e.preventDefault();
                                openDeleteDialog(classandsection);
                              }}
                              className="btn btn-soft-danger btn-sm"
                            >
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No classes or sections found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                      className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                      <button
                        className={`page-link pagination-button ${currentPage === page ? 'active' : ''}`}
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

      <ExcelSheetModal
        show={showImportModal}
        onClose={() => setShowImportModal(false)}
        shifts={shifts}
        schoolId={schoolId}
        onImportSuccess={handleImportSuccess}
      />

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedRequest?._id}
          onDeleted={() => handleDeleteConfirmed(selectedRequest?._id)}
        />
      )}
    </div>
  );
};

export default ClassAndSection;