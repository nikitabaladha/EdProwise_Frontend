import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import getAPI from '../../../../../api/getAPI';
import { toast } from 'react-toastify';
import ConfirmationDialog from '../../../../ConfirmationDialog';
import UpdateAcademicHistoryModal from './UpdateAcademicHistoryModal';

const StudentPromotionListTable = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [classList, setClassList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [loadingYears, setLoadingYears] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        setLoadingYears(true);
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const schoolId = userDetails?.schoolId;
        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        setAcademicYears(response.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingYears(false);
      }
    };

    fetchAcademicYears();
  }, []);

  const openDeleteDialog = (request) => {
    if (!request.academicHistory || !request.academicHistory._id) {
      toast.error('Academic history ID is missing.');
      return;
    }
    setSelectedRequest(request.academicHistory);
    setIsDeleteDialogOpen(true);
    setDeleteType('promotion');
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = (_id) => {
    setStudentData((prevRequests) =>
      prevRequests.filter((request) => request.academicHistory?._id !== _id)
    );
  };

  const openUpdateModal = (student) => {
    if (!student.academicHistory || !student.academicHistory._id) {
      toast.error('Academic history ID is missing.');
      return;
    }
    setSelectedStudent(student);
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = async () => {
    try {
      const response = await getAPI(`/get-admission-form-by-year-classnsection/${schoolId}/${selectedYear}`);
      if (!response.hasError) {
        const studentArray = Array.isArray(response.data.data) ? response.data.data : [];
        setStudentData(studentArray);
      } else {
        toast.error(response.message || 'Failed to refresh student list.');
      }
    } catch (err) {
      toast.error('Error refreshing student data.');
    }
    setShowUpdateModal(false);
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error('School ID not found. Please log in again.');
      return;
    }

    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (!schoolId || !selectedYear) return;

    const fetchStudents = async () => {
      try {
        const response = await getAPI(`/get-admission-form-by-year-classnsection/${schoolId}/${selectedYear}`);
        const classRes = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
        const shiftResponse = await getAPI(`/master-define-shift-year/${schoolId}/year/${selectedYear}`);

        if (!classRes.hasError) {
          setClassList(classRes.data.data);
        } else {
          toast.error(classRes.message || 'Failed to fetch class list.');
        }

        if (!shiftResponse.hasError) {
          setShiftList(shiftResponse.data.data || []);
        } else {
          toast.error(shiftResponse.message || 'Failed to fetch shift list.');
        }

        if (!response.hasError) {
          const studentArray = Array.isArray(response.data.data) ? response.data.data : [];
          console.log('Student Data:', studentArray);
          setStudentData(studentArray);
        } else {
          toast.error(response.message || 'Failed to fetch student list.');
        }
      } catch (err) {
        toast.error('Error fetching student data.');
        console.error('Student Fetch Error:', err);
      }
    };

    fetchStudents();
  }, [schoolId, selectedYear]);

  const getClassNameById = (id) => {
    const found = classList.find((cls) => cls._id === id);
    return found ? found.className : 'N/A';
  };

  const getSectionNameById = (sectionId) => {
    if (!sectionId) {
      return 'N/A';
    }
    const found = classList.find((cls) => cls.sections?.some((sec) => sec._id === sectionId));
    const section = found?.sections?.find((sec) => sec._id === sectionId);
    return section ? section.name : 'N/A';
  };

  const getShiftNameById = (shiftId) => {
    if (!shiftId) {
      return 'N/A';
    }
    const found = shiftList.find((shift) => shift._id === shiftId);
    return found ? found.masterDefineShiftName : 'N/A';
  };

  const navigateToAdmission = (event) => {
    event.preventDefault();
    navigate('/school-dashboard/fees-module/admin-setting/promotion/student-promotion/PromoteStudent');
  };

const filteredStudents = studentData.filter((student) => {
  const query = searchQuery.toLowerCase();
  return (
    (student.AdmissionNumber?.toLowerCase() || '').includes(query) ||
    (student.firstName?.toLowerCase() || '').includes(query) ||
    (student.lastName?.toLowerCase() || '').includes(query) ||
    (student.gender?.toLowerCase() || '').includes(query) ||
    (getClassNameById(student.academicHistory?.masterDefineClass)?.toLowerCase() || '').includes(query) ||
    (getSectionNameById(student.academicHistory?.section)?.toLowerCase() || '').includes(query) ||
    (getShiftNameById(student.academicHistory?.masterDefineShift)?.toLowerCase() || '').includes(query)
  );
});



  const [currentPage, setCurrentPage] = useState(1);
   const [studentListPerPage] = useState(10);
 
   const indexOfLastStudent = currentPage * studentListPerPage;
   const indexOfFirstStudent = indexOfLastStudent - studentListPerPage;
   const currentStudent = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
 
   const totalPages = Math.ceil(filteredStudents.length / studentListPerPage);
 
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

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-end mb-2 gap-2">
          <Link onClick={(event) => navigateToAdmission(event)} className="btn btn-sm btn-primary">
            Add Promotion
          </Link>
          <button className="btn btn-sm btn-secondary">Import</button>
          <Link className="btn btn-sm btn-secondary">Export</Link>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">Student Promotion</h4>
                  <div className="d-none d-md-block">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search by any field "
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '200px' }}
                  />
                </div>
                <select
                  className="form-select form-select-sm w-auto"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    localStorage.setItem('selectedAcademicYear', e.target.value);
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
              <div>
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
                        <th>Gender</th>
                        <th>Class</th>
                        <th>Section</th>
                        <th>Shift</th>
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
                              <label className="form-check-label" htmlFor={`customCheck${index + 2}`} />
                            </div>
                          </td>
                          <td>{student.AdmissionNumber || 'N/A'}</td>
                          <td>{student.firstName} {student.lastName}</td>
                          <td>{student.gender}</td>
                          <td>{getClassNameById(student.academicHistory?.masterDefineClass)}</td>
                          <td>{getSectionNameById(student.academicHistory?.section)}</td>
                          <td>{getShiftNameById(student.academicHistory?.masterDefineShift)}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                className="btn btn-soft-primary btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  openUpdateModal(student);
                                }}
                              >
                                <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
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
                      <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button
                          className={`page-link pagination-button ${currentPage === page ? 'active' : ''}`}
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
      {showUpdateModal && selectedStudent && (
        <UpdateAcademicHistoryModal
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          schoolId={schoolId}
          academicHistoryId={selectedStudent.academicHistory._id}
          studentData={selectedStudent}
          onUpdateSuccess={handleUpdateSuccess}
          selectedYear={selectedYear}
        />
      )}
    </>
  );
};

export default StudentPromotionListTable;