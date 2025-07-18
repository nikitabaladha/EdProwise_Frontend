import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../../../../ConfirmationDialog';
import getAPI from '../../../../../api/getAPI';
import { toast } from 'react-toastify';

const RefundFees = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [classData, setClassData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [requestPerPage] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [schoolId, setSchoolId] = useState('');
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
  const [loadingYears, setLoadingYears] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeeType, setSelectedFeeType] = useState('');

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
        const refundResponse = await getAPI(`/get-refund-requests/${schoolId}/year/${selectedYear}`, {}, true);
        setRequests(refundResponse?.data?.data || []);

        const classSectionResponse = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
        const classSectionData = classSectionResponse?.data?.data || [];
        setClassData(classSectionData);
      } catch (error) {
        toast.error('Error fetching data.');
        console.error('Fetch Error:', error);
      }
    };

    fetchData();
  }, [schoolId, selectedYear]);

  const getClassName = (classId) => {
    const classItem = classData.find((item) => item._id.toString() === classId.toString());
    return classItem ? classItem.className : 'N/A';
  };

  const getSectionName = (sectionId) => {
    if (!sectionId) return 'N/A';
    const classItem = classData.find((item) =>
      item.sections.some((section) => section._id.toString() === sectionId.toString())
    );
    const sectionItem = classItem?.sections.find((section) => section._id.toString() === sectionId.toString());
    return sectionItem ? sectionItem.name : 'N/A';
  };

  const filteredRequests = requests.filter((request) => {
    const fullName = `${request.firstName} ${request.lastName}`.toLowerCase();
    const admissionNumber = (request.admissionNumber || request.registrationNumber || '').toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
      admissionNumber.includes(searchQuery.toLowerCase());
    const matchesFeeType = selectedFeeType ? request.refundType === selectedFeeType : true;
    return matchesSearch && matchesFeeType;
  });

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
    setDeleteType('refund');
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteConfirmed = (_id) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request._id !== _id));
  };

  const navigateToAddNewRefund = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/fees-receipts/fees-refund/create-refund`);
  };

  const navigateToRefundReceipt = (event, refund) => {
    event.preventDefault();
    navigate('/school-dashboard/fees-module/fees-receipts/fees-refund/refund-receipt', {
      state: {
        refund: {
          ...refund,
          receiptNumber: refund.receiptNumber,
          refundDate: refund.refundDate,
          transactionNumber: refund.transactionNumber || null,
        },
        className: getClassName(refund.classId),
        sectionName: getSectionName(refund.sectionId),
        refundTypeName: refund.refundType,
      },
    });
  };

  const feeTypes = [...new Set(requests.map((request) => request.refundType))];

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="d-flex justify-content-end mb-2 gap-2">
              <Link
                onClick={(event) => navigateToAddNewRefund(event)}
                className="btn btn-sm btn-primary"
              >
                Create Refund
              </Link>
              <div className="text-end">
                <select
                  className="form-select"
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
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">Fees Refund</h4>
                <div className="d-flex justify-content-end mb-2 gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or admission number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select
                    className="form-select"
                    value={selectedFeeType}
                    onChange={(e) => setSelectedFeeType(e.target.value)}
                  >
                    <option value="">All Fee Types</option>
                    {feeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
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
                      <th>REG/ADM Number</th>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Refund Type</th>
                      <th>Refund Amount</th>
                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRequests.map((refund, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check ms-1">
                            <input type="checkbox" className="form-check-input" />
                          </div>
                        </td>
                        <td>{refund.admissionNumber || refund.registrationNumber || 'N/A'}</td>
                        <td>{`${refund.firstName} ${refund.lastName}`}</td>
                        <td>{getClassName(refund.classId)}</td>
                        <td>{refund.refundType}</td>
                        <td>{refund.refundAmount}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link
                              onClick={(e) => {
                                e.preventDefault();
                                openDeleteDialog(refund);
                              }}
                              className="btn btn-soft-danger btn-sm"
                            >
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                            <Link
                              className="btn btn-soft-success btn-sm"
                              onClick={(event) => navigateToRefundReceipt(event, refund)}
                            >
                              <iconify-icon
                                icon="solar:download-minimalistic-broken"
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
      </div>

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedRequest._id}
          onDeleted={() => handleDeleteConfirmed(selectedRequest._id)}
        />
      )}
    </>
  );
};

export default RefundFees;