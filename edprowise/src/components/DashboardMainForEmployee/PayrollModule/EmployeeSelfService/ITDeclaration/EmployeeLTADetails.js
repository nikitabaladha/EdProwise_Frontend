// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';
// import postAPI from '../../../../../api/postAPI';
// import ConfirmationDialog from '../../../../ConfirmationDialog';
 
// const EmployeeLTADetails = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);
//   const [employeeLtaDetails, setEmployeeLtaDetails] = useState([]);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [deleteType, setDeleteType] = useState("");
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

    
//     fetchLtaDetails(userDetails.schoolId,userDetails.userId);
//   }, [navigate]);

//   const fetchLtaDetails = async (schoolId, empId) => {
//       try {
//         const response = await getAPI(`/get-lta-details/${schoolId}/${empId}`);
//         console.log("LTA Details get",response);
        
//         setEmployeeLtaDetails(Array.isArray(response.data.data) ? response.data.data : []);
//       } catch (err) {
//         console.error('Error fetching LTA details:', err);
//         toast.error(err.message || 'Failed to fetch LTA details');
//         setEmployeeLtaDetails([]); 
//       }
//     };

//   const openDeleteDialog = (lta) => {
//     setSelectedEmployee(lta);
//     setDeleteType("LTA");
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedEmployee(null);
//   };

//   const handleDeleteConfirmed = async (id) => {
//       setEmployeeLtaDetails(prev => prev.filter(lta => lta._id !== id));
     
//   };

//   const navigateToAdddLta = (event) => {
//     event.preventDefault();
//     navigate('/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/lta-details/add-lta', {
//       state: { schoolId, employeeId }
//     });
//   };

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = employeeLtaDetails.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(employeeLtaDetails.length / recordsPerPage);

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
//   return new Date(isoDate).toLocaleDateString('en-GB'); // '17/06/2025'
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
//                     LTA Employee List
//                   </h4>
//                   <Link
//                     onClick={navigateToAdddLta}
//                     className="btn btn-sm btn-primary"
//                   >
//                     Add New LTA
//                   </Link>
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
//                       <th>Item Purchased</th>
//                       <th>Vendor Name</th>
//                       <th>GST No.</th>
//                       <th>Gross Amt.</th>
//                       <th>GST Charge</th>
//                       <th>Total Amount</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentRecords.length === 0 ? (
//                       <tr>
//                         <td colSpan="11" className="text-center">No LTA records found</td>
//                       </tr>
//                     ) : (
//                       currentRecords.map((lta, index) => (
//                         <tr key={lta._id}>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id={`check-${index}`}
//                               />
//                             </div>
//                           </td>
//                           <td>{lta.employeeId}</td>
//                           {/* <td>{lta.employeeName}</td> */}
//                           <td>{lta.billNumber}</td>
//                           <td>{formatDate(lta.billDate)}</td>
//                           <td>{lta.itemPurchased}</td>
//                           <td>{lta.vendorName}</td>
//                           <td>{lta.gstNumber}</td>
//                           <td>{lta.grossAmount}</td>
//                           <td>{lta.gstCharge}</td>
//                           <td>{lta.totalAmount}</td>
//                           <td>
//                             <div className="d-flex gap-2">
//                               <Link
//                                 className="btn btn-light btn-sm"
//                                 to={`/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/lta-details/view/${lta._id}`}
//                               >
//                                 <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                               </Link>
//                               <Link
//                                 className="btn btn-soft-danger btn-sm"
//                                 onClick={() => openDeleteDialog(lta)}
//                               >
//                                 <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
//                               </Link>
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
//           deleteType="LTA"
//           id={selectedEmployee._id}
//           onDeleted={handleDeleteConfirmed}
//         />
//       )}
//     </div>
//   );
// };

// export default EmployeeLTADetails;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import ConfirmationDialog from '../../../../ConfirmationDialog';

const EmployeeLTADetails = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeLtaDetails, setEmployeeLtaDetails] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [academicYear, setAcademicYear] = useState('');
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
    setAcademicYear(userDetails.academicYear );
    fetchLtaDetails(userDetails.schoolId, userDetails.userId, userDetails.academicYear);
  }, []);

  const fetchLtaDetails = async (schoolId, employeeId,academicYear) => {
    try {
      const response = await getAPI(`/get-lta-details/${schoolId}/${employeeId}?academicYear=${academicYear}`);
      console.log('LTA Details get', response.data.data);
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      const validData = data.filter(record => record._id && typeof record._id === 'string');
      if (data.length !== validData.length) {
        console.warn('Some records have invalid or missing _id:', data);
      }
      // Sort by createdAt if available, fallback to billDate
      const sortedData = validData.sort((a, b) => 
        (a.createdAt ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(b.billDate) - new Date(a.billDate))
      );
      setEmployeeLtaDetails(sortedData);
      // setEmployeeLtaDetails(validData);
    } catch (err) {
      console.error('Error fetching LTA details:', err);
      toast.error(err.message || 'Failed to fetch LTA details');
      setEmployeeLtaDetails([]);
    }
  };

  const openDeleteDialog = (lta) => {
    if (!lta._id) {
      toast.error('Cannot delete: Invalid record ID');
      return;
    }
    setSelectedEmployee(lta);
    setDeleteType('LTA');
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteConfirmed = async (detailId) => {
    
      setEmployeeLtaDetails((prev) => prev.filter((lta) => lta._id !== detailId));
      
  };

  const navigateToAddLta = (event) => {
    event.preventDefault();
    navigate('/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/lta-details/add-lta', {
      state: { schoolId, employeeId, academicYear },
    });
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = employeeLtaDetails.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(employeeLtaDetails.length / recordsPerPage);

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
                    LTA Employee List
                  </h4>
                  <Link
                    onClick={navigateToAddLta}
                    className="btn btn-sm btn-primary"
                  >
                    Add New LTA
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
                      {/* <th>Name on Bill</th> */}
                      <th>Bill No</th>
                      <th>Bill Date</th>
                      <th>Item Purchased</th>
                      <th>Vendor Name</th>
                      <th>GST No.</th>
                      <th>Gross Amt.</th>
                      <th>GST Charge</th>
                      <th>Total Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.length === 0 ? (
                      <tr>
                        <td colSpan="11" className="text-center">No LTA records found</td>
                      </tr>
                    ) : (
                      currentRecords.map((lta, index) => (
                        <tr key={lta._id || index}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`check-${index}`}
                              />
                            </div>
                          </td>
                          <td>{lta.employeeId}</td>
                          {/* <td>{lta.employeeName}</td> */}
                          <td>{lta.billNumber}</td>
                          <td>{formatDate(lta.billDate)}</td>
                          <td>{lta.itemPurchased}</td>
                          <td>{lta.vendorName}</td>
                          <td>{lta.gstNumber}</td>
                          <td>{lta.grossAmount.toLocaleString('en-IN')}</td>
                          <td>{lta.gstCharge.toLocaleString('en-IN')}</td>
                          <td>{lta.totalAmount.toLocaleString('en-IN')}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <Link
                                className="btn btn-light btn-sm"
                                to={`/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/lta-details/view/${lta._id}`}
                                disabled={!lta._id}
                              >
                                <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                              </Link>
                              <button
                                className="btn btn-soft-danger btn-sm"
                                onClick={() => openDeleteDialog(lta)}
                                disabled={!lta._id}
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
          deleteType="lta"
          id={selectedEmployee._id}
          employeeId={employeeId}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default EmployeeLTADetails;