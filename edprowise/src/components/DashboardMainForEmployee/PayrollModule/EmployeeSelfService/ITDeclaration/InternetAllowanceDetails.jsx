// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';
// import ConfirmationDialog from '../../../../ConfirmationDialog';

// const InternetAllowanceDetails = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);
//   const [employeeInternetDetails, setEmployeeInternetDetails] = useState([]);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [academicYear, setAcademicYear] = useState('');
//   const [deleteType, setDeleteType] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage] = useState(10);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId || !userDetails?.userId) {
//       toast.error('Authentication details missing');
//       navigate('/login');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);
//     setEmployeeId(userDetails.userId);
//     setAcademicYear(userDetails.acadmicYear);
//     fetchInternetDetails(userDetails.schoolId, userDetails.userId);
//   }, [navigate, academicYear]);

//   const fetchInternetDetails = async (schoolId, empId) => {
//     try {
//       const response = await getAPI(`/get-internet-allowance/${schoolId}/${empId}?academicYear=${academicYear}`);
//       console.log('Internet Allowance Details get', response);
//       setEmployeeInternetDetails(Array.isArray(response.data.data) ? response.data.data : []);
//     } catch (err) {
//       console.error('Error fetching internet allowance details:', err);
//       toast.error(err.message || 'Failed to fetch internet allowance details');
//       setEmployeeInternetDetails([]);
//     }
//   }; 
 
//   const openDeleteDialog = (internet) => {
//     setSelectedEmployee(internet);
//     setDeleteType('internetAllowance');
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedEmployee(null);
//   };

//   const handleDeleteConfirmed = async (id) => {
//         setEmployeeInternetDetails((prev) => prev.filter((internet) => internet._id !== id));
    
//   };

//   const navigateToAddInternet = (event) => {
//     event.preventDefault();
//     navigate('/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/internet-allowance-details/add-internet-allowance', {
//       state: { schoolId, employeeId }
//     });
//   };

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = employeeInternetDetails.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(employeeInternetDetails.length / recordsPerPage);

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

//   const formatDate = (isoDate) => {
//   return new Date(isoDate).toLocaleDateString('en-GB'); 
// };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Internet Allowance List
//                   </h4>
//                   {/* <div className="d-flex align-items-center gap-2">
//                     <select
//                       className="form-select"
//                       value={academicYear}
//                       onChange={(e) => setAcademicYear(e.target.value)}
//                     >
//                       <option value="2025-26">2025-26</option>
//                       <option value="2026-27">2026-27</option>
//                       <option value="2027-28">2027-28</option>
//                       <option value="2028-29">2028-29</option>
//                       <option value="2029-30">2029-30</option>
//                     </select>
//                   </div> */}
//                   <Link
//                       onClick={navigateToAddInternet}
//                       className="btn ms-1 btn-sm btn-primary"
//                     >
//                       Add New Internet Allowance
//                     </Link>
//                 </div>
//               </div>
//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-hover table-centered text-center">
//                   <thead className="bg-light-subtle">
//                     <tr className="payroll-table-header">
//                       <th style={{ width: 20 }}>
//                         <div className="form-check ms-1">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             id="customCheck1"
//                           />
//                           <label className="form-check-label" htmlFor="customCheck1" />
//                         </div>
//                       </th>
//                       <th>Employee ID</th>
//                       {/* <th>Employee Name</th> */}
//                       <th>Bill No</th>
//                       <th>Bill Date</th>
//                       <th>Supplier Name</th>
//                       <th>GST Number</th>
//                       <th>Gross Amt.</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentRecords.length === 0 ? (
//                       <tr>
//                         <td colSpan="13" className="text-center">No Internet Allowance records found</td>
//                       </tr>
//                     ) : (
//                       currentRecords.map((internet, index) => (
//                         <tr key={internet._id}>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id={`check-${index}`}
//                               />
//                             </div>
//                           </td>
//                           <td>{internet.employeeId}</td>
//                           {/* <td>{internet.employeeName}</td> */}
//                           <td>{internet.billNumber}</td>
//                           <td>{formatDate(internet.billDate)}</td>
//                           <td>{internet.supplierName}</td>
//                           <td>{internet.gstNumber}</td>
//                           <td>{internet.grossAmount.toLocaleString('en-IN')}</td>
//                           <td>{internet.status}</td>
//                           <td>
//                             <div className="d-flex gap-2 justify-content-center">
//                               <Link
//                                 className="btn btn-light btn-sm"
//                                 to={`/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/internet-allowance-details/view/${internet._id}`}
//                               >
//                                 <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                               </Link>
//                               <button
//                                 className="btn btn-soft-danger btn-sm"
//                                 onClick={() => openDeleteDialog(internet)}
//                               >
//                                 <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="card-footer border-top">
//                 <nav aria-label="Page navigation example">
//                   <ul className="pagination justify-content-end mb-0">
//                     <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                       <button className="page-link" onClick={handlePreviousPage}>
//                         Previous
//                       </button>
//                     </li>
//                     {pagesToShow.map((page) => (
//                       <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
//                         <button className="page-link" onClick={() => handlePageClick(page)}>
//                           {page}
//                         </button>
//                       </li>
//                     ))}
//                     <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                       <button className="page-link" onClick={handleNextPage}>
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
//       {isDeleteDialogOpen && selectedEmployee && (
//         <ConfirmationDialog
//           onClose={handleDeleteCancel}
//           deleteType="internetAllowance"
//           id={selectedEmployee._id}
//           onDeleted={handleDeleteConfirmed}
//         />
//       )}
//     </div>
//   );
// };

// export default InternetAllowanceDetails;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import ConfirmationDialog from '../../../../ConfirmationDialog';

const InternetAllowanceDetails = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeInternetDetails, setEmployeeInternetDetails] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [deleteType, setDeleteType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId || !userDetails?.userId) {
      toast.error('Authentication details missing');
      navigate('/login');
      return;
    }
    setSchoolId(userDetails.schoolId);
    setEmployeeId(userDetails.userId);
    setAcademicYear(userDetails.academicYear || '2025-26'); 
    fetchInternetDetails(userDetails.schoolId, userDetails.userId);
  }, [navigate, academicYear]);

  const fetchInternetDetails = async (schoolId, employeeId) => {
    try {
      const response = await getAPI(`/get-internet-allowance/${schoolId}/${employeeId}?academicYear=${academicYear}`);
      console.log('Internet Allowance Details get', response.data.data);
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      const validData = data.filter(record => record._id && typeof record._id === 'string');

      if (data.length !== validData.length) {
        console.warn('Some records have invalid or missing _id:', data);
      }
      // Sort by createdAt if available, fallback to billDate
      const sortedData = validData.sort((a, b) => 
        (a.createdAt ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(b.billDate) - new Date(a.billDate))
      );
      setEmployeeInternetDetails(sortedData);
    } catch (err) {
      console.error('Error fetching internet allowance details:', err);
      toast.error(err.message || 'Failed to fetch internet allowance details');
      setEmployeeInternetDetails([]);
    }
  };

  const openDeleteDialog = (internet) => {
    if (!internet._id) {
      toast.error('Cannot delete: Invalid record ID');
      return;
    }
    setSelectedEmployee(internet);
    setDeleteType('internetAllowance');
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteConfirmed = async (detailId) => {
    if (!detailId) {
      toast.error('Cannot delete: Invalid detail ID');
      setIsDeleteDialogOpen(false);
      setSelectedEmployee(null);
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/delete-internet-allowance/${employeeId}/${detailId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setEmployeeInternetDetails((prev) => prev.filter((internet) => internet._id !== detailId));
      toast.success(response.data.message || 'Internet allowance detail deleted successfully');
      fetchInternetDetails(schoolId, employeeId); // Refresh list
    } catch (err) {
      console.error('Error deleting internet allowance detail:', err);
      toast.error(err.response?.data?.message || 'Failed to delete internet allowance detail');
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedEmployee(null);
    }
  };

  const navigateToAddInternet = (event) => {
    event.preventDefault();
    navigate('/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/internet-allowance-details/add-internet-allowance', {
      state: { schoolId, employeeId, academicYear },
    });
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = employeeInternetDetails.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(employeeInternetDetails.length / recordsPerPage);

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

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-GB');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Internet Allowance List
                  </h4>
                  <Link
                    onClick={navigateToAddInternet}
                    className="btn ms-1 btn-sm btn-primary"
                  >
                    Add New Internet Allowance
                  </Link>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
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
                      <th>Employee ID</th>
                      <th>Bill No</th>
                      <th>Bill Date</th>
                      <th>Supplier Name</th>
                      <th>GST Number</th>
                      <th>Gross Amt.</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center">No Internet Allowance records found</td>
                      </tr>
                    ) : (
                      currentRecords.map((internet, index) => (
                        <tr key={internet._id || index}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`check-${index}`}
                              />
                            </div>
                          </td>
                          <td>{internet.employeeId}</td>
                          <td>{internet.billNumber}</td>
                          <td>{formatDate(internet.billDate)}</td>
                          <td>{internet.supplierName}</td>
                          <td>{internet.gstNumber}</td>
                          <td>{internet.grossAmount.toLocaleString('en-IN')}</td>
                          <td>{internet.status}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <Link
                                className="btn btn-light btn-sm"
                                to={`/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/internet-allowance-details/view/${internet._id}`}
                                disabled={!internet._id}
                              >
                                <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                              </Link>
                              <button
                                className="btn btn-soft-danger btn-sm"
                                onClick={() => openDeleteDialog(internet)}
                                disabled={!internet._id}
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
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={handlePreviousPage}>
                        Previous
                      </button>
                    </li>
                    {pagesToShow.map((page) => (
                      <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageClick(page)}>
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={handleNextPage}>
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
      {isDeleteDialogOpen && selectedEmployee && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="internetAllowance"
          id={selectedEmployee._id}
          employeeId={employeeId}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default InternetAllowanceDetails;