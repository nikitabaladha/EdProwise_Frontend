import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../../../ConfirmationDialog';
import getAPI from '../../../../../api/getAPI';
import { toast } from 'react-toastify';

const SchoolShifts = () => {
  const navigate = useNavigate();

  const [shifts, setShifts] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [loadingYears, setLoadingYears] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [shiftsPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);


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

    const fetchShifts = async () => {
      try {
        const response = await getAPI(`/master-define-shift-year/${schoolId}/year/${selectedYear}`);
        console.log('Fetched Shifts:', response);
        if (!response.hasError) {
          const shiftArray = Array.isArray(response.data?.data) ? response.data.data : [];
          setShifts(shiftArray);
        } else {
          toast.error(response.message || 'Failed to fetch shifts.');
        }
      } catch (err) {
        toast.error('Error fetching shift data.');
        console.error('Shift Fetch Error:', err);
      }
    };

    fetchShifts();
  }, [schoolId, selectedYear]);


  const filteredShifts = shifts.filter((shift) => {
    const query = searchQuery.toLowerCase();
    return Object.values(shift).some((value) => {
      if (value instanceof Date) {
        return value
          .toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'UTC',
          })
          .toLowerCase()
          .includes(query);
      }
      return String(value).toLowerCase().includes(query);
    });
  });


  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = filteredShifts.slice(indexOfFirstShift, indexOfLastShift);
  const totalPages = Math.ceil(filteredShifts.length / shiftsPerPage);

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

  // Delete dialog handlers
  const openDeleteDialog = (shift) => {
    setSelectedShift(shift);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedShift(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setShifts((prevShifts) => prevShifts.filter((shift) => shift._id !== _id));
    setIsDeleteDialogOpen(false);
    setSelectedShift(null);
  };

  const navigateToAddNewShift = (event) => {
    event.preventDefault();
    navigate('/school-dashboard/fees-module/admin-setting/grade/shifts/add-shift');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center gap-1">
              <h4 className="card-title flex-grow-1">All Shifts</h4>
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
                onClick={navigateToAddNewShift}
                className="btn btn-sm btn-primary"
              >
                Add Shift
              </Link>
              <div className="d-flex align-items-center gap-2">
                <select
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
                </select>
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
                    <th>Shift</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th className="text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentShifts.length > 0 ? (
                    currentShifts.map((shift, index) => (
                      <tr key={shift._id || index}>
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
                        <td>{shift.masterDefineShiftName || 'N/A'}</td>
                        <td>
                          {shift.startTime
                            ? new Date(shift.startTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                                timeZone: 'UTC',
                              })
                            : 'N/A'}
                        </td>
                        <td>
                          {shift.endTime
                            ? new Date(shift.endTime).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                                timeZone: 'UTC',
                              })
                            : 'N/A'}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() =>
                                navigate(
                                  '/school-dashboard/fees-module/admin-setting/grade/shifts/update-shift',
                                  { state: { shift } }
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
                                openDeleteDialog(shift);
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
                      <td colSpan="5">No shifts found.</td>
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
          deleteType="shifts"
          id={selectedShift?._id}
          onDeleted={() => handleDeleteConfirmed(selectedShift?._id)}
        />
      )}
    </div>
  );
};

export default SchoolShifts;