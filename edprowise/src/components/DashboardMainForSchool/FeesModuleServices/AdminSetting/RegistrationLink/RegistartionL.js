import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import putAPI from '../../../../../api/putAPI';

const AcademicYears = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingYears, setLoadingYears] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [yearsPerPage] = useState(5);


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


  const toggleRegistrationStatus = async (yearId, currentStatus) => {
    if (updating) return;
    setUpdating(true);

    try {
      const newStatus = !currentStatus;


      const updatedYears = academicYears.map((year) => ({
        ...year,
        registrationLink: year._id === yearId ? newStatus : false,
      }));
      setAcademicYears(updatedYears);


      if (newStatus) {
        const activeYears = academicYears.filter(
          (year) => year.registrationLink && year._id !== yearId
        );

        for (const activeYear of activeYears) {
          await putAPI(`/update-feesmanagment-year-link/${activeYear._id}`, {
            registrationLink: false,
          });
        }
      }


      const res = await putAPI(`/update-feesmanagment-year-link/${yearId}`, {
        registrationLink: newStatus,
      });

      if (!res.data.hasError) {
        toast.success(
          `Registration link ${newStatus ? 'activated' : 'deactivated'} successfully.`
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Failed to update registration link status.');
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };


  const filteredYears = Array.isArray(academicYears)
    ? academicYears.filter((year) => {
      const query = searchQuery.toLowerCase();
      return (
        year.academicYear.toLowerCase().includes(query) ||
        year.schoolId.toLowerCase().includes(query) ||
        new Date(year.startDate).toLocaleDateString('en-GB').toLowerCase().includes(query) ||
        new Date(year.endDate).toLocaleDateString('en-GB').toLowerCase().includes(query)
      );
    })
    : [];

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
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0 table-centered text-center">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Academic Year</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Registration Link</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingYears ? (
                    <tr>
                      <td colSpan="4">Loading academic years...</td>
                    </tr>
                  ) : currentYears.length > 0 ? (
                    currentYears.map((year) => (
                      <tr key={year._id}>
                        <td>{year.academicYear}</td>
                        <td>
                          {year.startDate
                            ? new Date(year.startDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })
                            : ''}
                        </td>
                        <td>
                          {year.endDate
                            ? new Date(year.endDate).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })
                            : ''}
                        </td>
                        <td>
                          <div className="form-check form-switch d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              disabled={updating}
                              checked={year.registrationLink || false}
                              onChange={() =>
                                toggleRegistrationStatus(year._id, year.registrationLink)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No academic years found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            { }
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
                        className={`page-link pagination-button ${currentPage === page ? 'active' : ''
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
  );
};

export default AcademicYears;
