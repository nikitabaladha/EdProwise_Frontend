import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from "../../../../ConfirmationDialog";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import ExcelSheetModal from './ExcelSheetModal';

const TypeOfFeesList = () => {
  const navigate = useNavigate();
  const [feesTypes, setFeesTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestPerPage] = useState(7);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [deleteType, setDeleteType] = useState("feesType");
  const [showImportModal, setShowImportModal] = useState(false);
  const [schoolId, setSchoolId] = useState('');
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

    const fetchFeesTypes = async () => {
      try {
        const data = await getAPI(`/getall-fess-type-year/${schoolId}/year/${selectedYear}`);
        if (!data.hasError && Array.isArray(data.data.data)) {
          setFeesTypes(data.data.data);
        } else {
          toast.error(data.message || "Error fetching fees types.");
        }
      } catch (error) {
        toast.error("Error fetching fees types.");
        console.error("Fetch Error:", error);
      }
    };

    fetchFeesTypes();
  }, [schoolId, selectedYear]);

  const handleImportSuccess = async () => {
    try {
      const data = await getAPI(`/getall-fess-type-year/${schoolId}/year/${selectedYear}`);
      if (!data.hasError && Array.isArray(data.data.data)) {
        setFeesTypes(data.data.data);
      } else {
        toast.error(data.message || "Error refreshing fees types.");
      }
    } catch (error) {
      toast.error("Error refreshing fees types.");
    }
  };

  // Filter fees types based on search query
  const filteredFeesTypes = feesTypes.filter((feetype) => {
    const query = searchQuery.toLowerCase();
    return (
      feetype.feesTypeName?.toLowerCase().includes(query) ||
      feetype.groupOfFees?.toLowerCase().includes(query)
    );
  });

  // Pagination logic
  const indexOfLast = currentPage * requestPerPage;
  const indexOfFirst = indexOfLast - requestPerPage;
  const currentFees = filteredFeesTypes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredFeesTypes.length / requestPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const openDeleteDialog = (request) => {
    setSelectedRequest(request);
    setIsDeleteDialogOpen(true);
    setDeleteType("feesType");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setFeesTypes((prevFeesTypes) =>
      prevFeesTypes.filter((feetype) => feetype._id !== _id)
    );
    setIsDeleteDialogOpen(false);
    setSelectedRequest(null);
  };

  const navigateToAddNewTypeOfFees = () => {
    navigate("/school-dashboard/fees-module/admin-setting/fees-structure/fees-type-list/add-fees-type");
  };

  const pageRange = 1;
  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);
  const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="d-flex justify-content-end mb-2 gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setShowImportModal(true)}
            >
              Import
            </button>
          </div>
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center gap-1">
              <h4 className="card-title flex-grow-1">List Of Fees</h4>
              <div className="d-none d-md-block">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by fees type or group"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '200px' }}
                />
              </div>
              <button onClick={navigateToAddNewTypeOfFees} className="btn btn-sm btn-primary">
                Add Type Of Fees
              </button>
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
                    <th>#</th>
                    <th>Type of Fees</th>
                    <th>Group of Fees</th>
                    <th className="text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFees.length === 0 ? (
                    <tr>
                      <td colSpan="4">No fees types found.</td>
                    </tr>
                  ) : (
                    currentFees.map((feetype, index) => (
                      <tr key={feetype._id || index}>
                        <td>{indexOfFirst + index + 1}</td>
                        <td>{feetype.feesTypeName || 'N/A'}</td>
                        <td>{feetype.groupOfFees || 'N/A'}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() =>
                                navigate("/school-dashboard/fees-module/admin-setting/fees-structure/fees-type-list/update-fees-type", {
                                  state: { feetype },
                                })
                              }
                            >
                              <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
                            </button>
                            <button
                              onClick={() => openDeleteDialog(feetype)}
                              className="btn btn-soft-danger btn-sm"
                            >
                              <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="card-footer border-top">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item">
                    <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>
                      Previous
                    </button>
                  </li>
                  {pagesToShow.map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                      <button className="page-link" onClick={() => handlePageClick(page)}>
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

      <ExcelSheetModal
        show={showImportModal}
        onClose={() => setShowImportModal(false)}
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

export default TypeOfFeesList;