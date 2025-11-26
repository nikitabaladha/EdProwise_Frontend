// import React from 'react'

// const EmployeeLtaExemptionList = () => {
//   return (
//         <div className="container">
//           <div className="row">
//             <div className="col-xl-12">
//               <div className="card m-2">
//                 <div className="card-body custom-heading-padding">
//                   <div className="container">
//                     <div className="card-header d-flex align-items-center">
//                       <h4 className="card-title flex-grow-1 text-center">
//                         LTA Employee List
//                       </h4>
 
//                     </div>
//                   </div>
//                   <div className="table-responsive">
//                     <table className="table align-middle mb-0 table-hover table-centered text-center">
//                       <thead className="bg-light-subtle">
//                         <tr className="payroll-table-header">
//                           <th style={{ width: 20 }}>
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id="customCheck1"
//                               />
//                               <label className="form-check-label" htmlFor="customCheck1" />
//                             </div>
//                           </th>
//                           <th>Employee ID</th>
//                           {/* <th>Name on Bill</th> */}
//                           <th>Bill No</th>
//                           <th>Bill Date</th>
//                           <th>Item Purchased</th>
//                           <th>Vendor Name</th>
//                           <th>GST No.</th>
//                           <th>Gross Amt.</th>
//                           <th>GST Charge</th>
//                           <th>Total Amount</th>
//                           <th>Status</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {/* {currentRecords.length === 0 ? (
//                           <tr>
//                             <td colSpan="11" className="text-center">No LTA records found</td>
//                           </tr>
//                         ) : (
//                           currentRecords.map((lta, index) => (
//                             <tr key={lta._id || index}>
//                               <td>
//                                 <div className="form-check ms-1">
//                                   <input
//                                     type="checkbox"
//                                     className="form-check-input"
//                                     id={`check-${index}`}
//                                   />
//                                 </div>
//                               </td>
//                               <td>{lta.employeeId}</td>
//                               <td>{lta.billNumber}</td>
//                               <td>{formatDate(lta.billDate)}</td>
//                               <td>{lta.itemPurchased}</td>
//                               <td>{lta.vendorName}</td>
//                               <td>{lta.gstNumber}</td>
//                               <td>{lta.grossAmount.toLocaleString('en-IN')}</td>
//                               <td>{lta.gstCharge.toLocaleString('en-IN')}</td>
//                               <td>{lta.totalAmount.toLocaleString('en-IN')}</td>
//                               <td>
//                                 <div className="d-flex gap-2 justify-content-center">
//                                   <Link
//                                     className="btn btn-light btn-sm"
//                                    >
//                                     <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
//                                   </Link>

//                                 </div>
//                               </td>
//                             </tr>
//                           ))
//                         )} */}
//                       </tbody>
//                     </table>
//                   </div>
//                   {/* <div className="card-footer border-top">
//                     <nav aria-label="Page navigation example">
//                       <ul className="pagination justify-content-end mb-0">
//                         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                           <button className="page-link" onClick={handlePreviousPage}>
//                             Previous
//                           </button>
//                         </li>
//                         {pagesToShow.map((page) => (
//                           <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
//                             <button className="page-link" onClick={() => handlePageClick(page)}>
//                               {page}
//                             </button>
//                           </li>
//                         ))}
//                         <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                           <button className="page-link" onClick={handleNextPage}>
//                             Next
//                           </button>
//                         </li>
//                       </ul>
//                     </nav>
//                   </div> */}
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//   )
// }

// export default EmployeeLtaExemptionList;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import putAPI from '../../../../../../api/putAPI';
import getAPI from '../../../../../../api/getAPI';
const EmployeeLtaExemptionList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employeeId, setEmployeeId] = useState(null);
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [schoolId, setSchoolId] = useState(null);
const [employeeLtaDetails, setEmployeeLtaDetails] = useState([]);
  
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('School ID not found. Please log in again.');
      navigate('/login');
      return;
    }
    setSchoolId(userDetails.schoolId);
    if (location.state.employeeId) {
      setEmployeeId(location.state.employeeId);
      setAcademicYear(location.state.academicYear || '2025-26');
      fetchLtaDetails(userDetails.schoolId, location.state.employeeId);
    } else {
      toast.error('No LTA data found');
      navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
    }
  }, [navigate, location.state]);

  
  const fetchLtaDetails = async (schoolId,employeeId) => {
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount || 0);
  };

  const handleNavigateToLtaDetails = (ltaRecord) => {
    navigate(
      '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/lta-list/verify-lta-details',
      {
        state: {
          ltaRecord,
          employeeId,
          academicYear,
        },
      }
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">LTA Employee List</h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() =>
                      navigate(
                        '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax'
                      )
                    }
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th style={{ width: 20 }}>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" id="customCheck1" />
                          <label className="form-check-label" htmlFor="customCheck1" />
                        </div>
                      </th>
                      <th>Employee ID</th>
                      <th>Bill No</th>
                      <th>Bill Date</th>
                      <th>Item Purchased</th>
                      <th>Vendor Name</th>
                      <th>GST No.</th>
                      <th>Gross Amt.</th>
                      <th>GST Charge</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeLtaDetails.length === 0 ? (
                      <tr>
                        <td colSpan="12" className="text-center">
                          No LTA records found
                        </td>
                      </tr>
                    ) : (
                      employeeLtaDetails.map((lta, index) => (
                        <tr key={lta._id || index}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`check-${index}`}
                              />
                              <label className="form-check-label" htmlFor={`check-${index}`} />
                            </div>
                          </td>
                          <td>{employeeId}</td>
                          <td>{lta.billNumber || 'N/A'}</td>
                          <td>{formatDate(lta.billDate)}</td>
                          <td>{lta.itemPurchased || 'N/A'}</td>
                          <td>{lta.vendorName || 'N/A'}</td>
                          <td>{lta.gstNumber || 'N/A'}</td>
                          <td>{formatCurrency(lta.grossAmount)}</td>
                          <td>{formatCurrency(lta.gstCharge)}</td>
                          <td>{formatCurrency(lta.totalAmount)}</td>
                          <td>{lta.billstatus}</td>
                          <td> 
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-light btn-sm"
                                onClick={() => handleNavigateToLtaDetails(lta)}
                              >
                                <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeLtaExemptionList;