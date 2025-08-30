import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../../../ConfirmationDialog';
import getAPI from '../../../../../api/getAPI';
import { toast } from 'react-toastify';
import UpdateYearModal from './UpdateYearModal';

const AcademicYears = () => {
  const navigate = useNavigate();

  const [academicYears, setAcademicYears] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [selectedYear, setSelectedYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [loadingYears, setLoadingYears] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [yearsPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedYearForDelete, setSelectedYearForDelete] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedYearForUpdate, setSelectedYearForUpdate] = useState(null);

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
    if (!schoolId) return;

    const fetchAcademicYears = async () => {
      try {
        setLoadingYears(true);
        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        if (!response.hasError) {
          setAcademicYears(Array.isArray(response.data.data) ? response.data.data : []);
        } else {
          toast.error(response.message || 'Failed to fetch academic years.');
          setAcademicYears([]);
        }
      } catch (err) {
        console.error('Error fetching academic years:', err);
        toast.error('Error fetching academic years.');
        setAcademicYears([]);
      } finally {
        setLoadingYears(false);
      }
    };

    fetchAcademicYears();
  }, [schoolId]);

  const filteredYears = Array.isArray(academicYears) ? academicYears.filter((year) => {
    const query = searchQuery.toLowerCase();
    return (
      year.academicYear.toLowerCase().includes(query) ||
      year.schoolId.toLowerCase().includes(query) ||
      new Date(year.startDate).toLocaleDateString('en-GB').toLowerCase().includes(query) ||
      new Date(year.endDate).toLocaleDateString('en-GB').toLowerCase().includes(query)
    );
  }) : [];

  const indexOfLastYear = currentPage * yearsPerPage;
  const indexOfFirstYear = indexOfLastYear - yearsPerPage;
  const currentYears = filteredYears.slice(indexOfFirstYear, indexOfLastYear);
  const totalPages = Math.ceil(filteredYears.length / yearsPerPage);

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

  const openDeleteDialog = (year) => {
    setSelectedYearForDelete(year);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedYearForDelete(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setAcademicYears((prevYears) => prevYears.filter((year) => year._id !== _id));
    setIsDeleteDialogOpen(false);
    setSelectedYearForDelete(null);
  };

  const openUpdateModal = (year) => {
    setSelectedYearForUpdate(year);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedYearForUpdate(null);
  };

  const handleUpdateSuccess = (updatedYear) => {
    setAcademicYears((prevYears) =>
      prevYears.map((year) => (year._id === updatedYear._id ? updatedYear : year))
    );
    setIsUpdateModalOpen(false);
    setSelectedYearForUpdate(null);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center gap-1">
              <h4 className="card-title flex-grow-1">All Academic Years</h4>
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
              <div className="d-flex align-items-center gap-2">
                {/* <select
                  className="form-select form-select-sm w-auto"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    localStorage.setItem('selectedAcademicYear', e.target.value);
                  }}
                  disabled={loadingYears}
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  {academicYears.map((year) => (
                    <option key={year._id} value={year.academicYear}>
                      {year.academicYear}
                    </option>
                  ))}
                </select> */}
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0 table-centered text-center">
                <thead className="bg-light-subtle">
                  <tr>
                    <th style={{ width: 20 }}>
                      <div className="form-check ms-1">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customCheck1"
                        />
                        <label className="form-check-label" htmlFor="customCheck1" />
                      </div>
                    </th>
                    <th>Academic Year</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th className="text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentYears.length > 0 ? (
                    currentYears.map((year, index) => (
                      <tr key={year._id || index}>
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
                        <td>{year.academicYear || ''}</td>
                        <td>
                          {year.startDate
                            ? new Date(year.startDate).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })
                            : ''}
                        </td>
                        <td>
                          {year.endDate
                            ? new Date(year.endDate).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })
                            : ''}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() => openUpdateModal(year)}
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                            <button
                              className="btn btn-soft-danger btn-sm"
                              onClick={() => openDeleteDialog(year)}
                            >
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No academic years found.</td>
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
                        className={`page-link pagination-button ${
                          currentPage === page ? 'active' : ''
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
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="academicYears"
          id={selectedYearForDelete?._id}
          onDeleted={() => handleDeleteConfirmed(selectedYearForDelete?._id)}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateYearModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          academicYear={selectedYearForUpdate}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default AcademicYears;