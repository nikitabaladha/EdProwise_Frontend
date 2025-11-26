// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom'

// const EmployeeSupportingSubmittedForTaxList = () => {
//     const navigate = useNavigate();
//      const [schoolId, setSchoolId] = useState(null);
//      const [academicYear] = useState('2025-26');

//       useEffect(() => {
//         const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//         if (!userDetails?.schoolId) {
//           toast.error('School ID not found. Please log in again.');
//           return;
//         }
//         setSchoolId(userDetails.schoolId);
//         fetchSupportingTax(userDetails.schoolId);
//       }, [academicYear]);


//     const handleNavigateToVerify = () => {
//         navigate("/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax");
//     };
//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-xl-12">
//                         <div className="card">
//                             <div className="card-body custom-heading-padding">
//                                 <div className="container">
//                                     <div className="card-header mb-2 d-flex align-items-center">
//                                         <h4 className="card-title flex-grow-1 text-center">
//                                             Supporting Submitted for Tax List
//                                         </h4>
//                                         <div>
//                                             <select id="yearSelect" className="custom-select" aria-label="Select Year">
//                                                 <option selected>2025-26</option>
//                                                 <option>2026-27</option>
//                                                 <option>2027-28</option>
//                                                 <option>2028-29</option>
//                                                 <option>2029-30</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div className="table-responsive">
//                                         <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
//                                             <thead className="bg-light-subtle">
//                                                 <tr className='payroll-table-header'>
//                                                     <th style={{ width: 20 }}>
//                                                         <div className="form-check ms-1">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="form-check-input"
//                                                                 id="customCheck1"
//                                                             />
//                                                             <label
//                                                                 className="form-check-label"
//                                                                 htmlFor="customCheck1"
//                                                             />
//                                                         </div>
//                                                     </th>
//                                                     <th>Employee ID</th>
//                                                     <th>Name of Employee</th>
//                                                     <th>Designation</th>
//                                                     <th>Grade</th>
//                                                     <th>Financial Year</th>
//                                                     <th>Action</th>
//                                                     <th>Status</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 <tr className='payroll-table-body'>
//                                                     <td>
//                                                         <div className="form-check ms-1">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="form-check-input"
//                                                                 id={"customCheck"}
//                                                             />
//                                                             <label
//                                                                 className="form-check-label"
//                                                                 htmlFor={"customCheck"}
//                                                             >
//                                                                 &nbsp;
//                                                             </label>
//                                                         </div>
//                                                     </td>
//                                                     <td>Emp-0001</td>
//                                                     <td>Umesh Jadhav</td>
//                                                     <td>Teacher</td>
//                                                     <td>A</td>
//                                                     <td>2025-26</td>
//                                                     <td>
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-light btn-sm"
//                                                                 onClick={handleNavigateToVerify}
//                                                             >
//                                                                 <iconify-icon
//                                                                     icon="solar:eye-broken"
//                                                                     className="align-middle fs-18"
//                                                                 />
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                     <td>
//                                                         <div className="col-md-8" style={{ justifySelf: "center" }}>
//                                                             <select
//                                                                 id="status"
//                                                                 name="status"
//                                                                 className="form-control payroll-table-body payroll-input-border"
//                                                                 required
//                                                             >
//                                                                 <option value="">Select Status</option>
//                                                                 <option value="Verification Pending">
//                                                                     Verification Pending
//                                                                 </option>
//                                                                 <option value="Verification Done">
//                                                                     Verification Done
//                                                                 </option>
//                                                             </select>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                     {/* end table-responsive */}
//                                 </div>
//                                 <div className="card-footer border-top">
//                                     <nav aria-label="Page navigation example">
//                                         <ul className="pagination justify-content-end mb-0">
//                                             <li className="page-item">
//                                                 <button
//                                                     className="page-link"
//                                                 // onClick={handlePreviousPage}
//                                                 // disabled={currentPage === 1}
//                                                 >
//                                                     Previous
//                                                 </button>
//                                             </li>
//                                             <li
//                                                 className={`page-item`}
//                                             >
//                                                 <button
//                                                     className={`page-link pagination-button `}
//                                                 //   onClick={() => handlePageClick(page)}
//                                                 >
//                                                     1
//                                                 </button>
//                                             </li>

//                                             <li className="page-item">
//                                                 <button
//                                                     className="page-link"
//                                                 // onClick={handleNextPage}
//                                                 // disabled={currentPage === totalPages}
//                                                 >
//                                                     Next
//                                                 </button>
//                                             </li>
//                                         </ul>
//                                     </nav>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default EmployeeSupportingSubmittedForTaxList;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import getAPI from '../../../../../api/getAPI';

// const EmployeeSupportingSubmittedForTaxList = () => {
//   const navigate = useNavigate();
//   const [schoolId, setSchoolId] = useState(null);
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [declarations, setDeclarations] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit] = useState(10); 
//   const [totalRecords, setTotalRecords] = useState(0);

//   useEffect(() => {
//     const userDetails = JSON.parse(localStorage.getItem('userDetails'));
//     if (!userDetails?.schoolId) {
//       toast.error('School ID not found. Please log in again.');
//       navigate('/login');
//       return;
//     }
//     setSchoolId(userDetails.schoolId);
//     fetchSupportingTax(userDetails.schoolId, academicYear);
//   }, [academicYear, navigate]);

//   const fetchSupportingTax = async (schoolId, academicYear) => {
//     try {
//       const response = await getAPI(
//         `/it-declarations/${schoolId}/${academicYear}`,
//         { 'Content-Type': 'application/json' },
//         true 
//       );
//       if (response.hasError) {
//         toast.error(response.message || 'Failed to fetch IT declarations');
//         return;
//       }
//       setDeclarations(response.data.data || []);
//       setTotalRecords(response.totalRecords || 0);
//       setCurrentPage(1); 
//       console.log('Fetched IT declarations:', response.data.data);
//     } catch (error) {
//       toast.error('Error fetching IT declarations: ' + error.message);
//       console.error('Fetch error:', error);
//     }
//   };

//   const handleNavigateToVerify = (declaration) => {
//     navigate(
//       '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax',
//       { state: { declaration } }
//     );
//   };

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(totalRecords / limit)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleYearChange = (e) => {
//     setAcademicYear(e.target.value);
//     setCurrentPage(1); 
//   };

//   // Client-side pagination
//   const paginatedDeclarations = declarations.slice(
//     (currentPage - 1) * limit,
//     currentPage * limit
//   );

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2 d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Supporting Submitted for Tax List
//                   </h4>
//                   <div>
//                     <select
//                       id="yearSelect"
//                       className="custom-select"
//                       value={academicYear}
//                       onChange={handleYearChange}
//                       aria-label="Select Year"
//                     >
//                       <option value="2025-26">2025-26</option>
//                       <option value="2026-27">2026-27</option>
//                       <option value="2027-28">2027-28</option>
//                       <option value="2028-29">2028-29</option>
//                       <option value="2029-30">2029-30</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="table-responsive">
//                   <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
//                     <thead className="bg-light-subtle">
//                       <tr className="payroll-table-header">
//                         <th style={{ width: 20 }}>
//                           <div className="form-check ms-1">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               id="customCheck1"
//                             />
//                             <label className="form-check-label" htmlFor="customCheck1" />
//                           </div>
//                         </th>
//                         <th>Employee ID</th>
//                         <th>Name of Employee</th>
//                         <th>Designation</th>
//                         <th>Grade</th>
//                         <th>Financial Year</th>
//                         <th>Action</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {paginatedDeclarations.map((decl, index) => (
//                         <tr className="payroll-table-body" key={decl.employeeId}>
//                           <td>
//                             <div className="form-check ms-1">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 id={`customCheck${index}`}
//                               />
//                               <label
//                                 className="form-check-label"
//                                 htmlFor={`customCheck${index}`}
//                               >
//                                  
//                               </label>
//                             </div>
//                           </td>
//                           <td>{decl.employeeId}</td>
//                           <td>{decl.employeeName}</td>
//                           <td>{decl.designation}</td>
//                           <td>{decl.grade}</td>
//                           <td>{decl.academicYear}</td>
//                           <td>
//                             <div className="d-flex justify-content-center gap-2">
//                               <button
//                                 className="btn btn-light btn-sm"
//                                 onClick={() => handleNavigateToVerify(decl)}
//                                 // onClick={() => handleNavigateToVerify(decl.employeeId)}
//                               >
//                                 <iconify-icon
//                                   icon="solar:eye-broken"
//                                   className="align-middle fs-18"
//                                 />
//                               </button>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="col-md-8" style={{ justifySelf: 'center' }}>
//                               <select
//                                 id={`status-${decl.employeeId}`}
//                                 name="status"
//                                 className="form-control payroll-table-body payroll-input-border"
//                                 value={decl.status}
//                                 onChange={(e) => {

//                                 //   console.log(`Update status for ${decl.employeeId}: ${e.target.value}`);
//                                 }}
//                               >
//                                 <option value="Verification Pending">Verification Pending</option>
//                                 <option value="Verification Done">Verification Done</option>
//                               </select>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
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
//                     {[...Array(Math.ceil(totalRecords / limit))].map((_, i) => (
//                       <li
//                         className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
//                         key={i}
//                       >
//                         <button
//                           className="page-link pagination-button"
//                           onClick={() => handlePageClick(i + 1)}
//                         >
//                           {i + 1}
//                         </button>
//                       </li>
//                     ))}
//                     <li className="page-item">
//                       <button
//                         className="page-link"
//                         onClick={handleNextPage}
//                         disabled={currentPage === Math.ceil(totalRecords / limit)}
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
//     </div>
//   );
// };

// export default EmployeeSupportingSubmittedForTaxList;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import putAPI from '../../../../../api/putAPI';

const EmployeeSupportingSubmittedForTaxList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState('');
  const [declarations, setDeclarations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [academicYearList, setAcademicYearList] = useState([]);
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('School ID not found. Please log in again.');
      navigate('/login');
      return;
    }
    const academicYear = localStorage.getItem("selectedAcademicYear");
    setAcademicYear(academicYear);
    fetchAcademicYears(userDetails.schoolId);
    if (!academicYear) {
      toast.error('School ID not found academic year. Please log in again.');

    }
    setSchoolId(userDetails.schoolId);
    fetchSupportingTax(userDetails.schoolId, academicYear);
  }, []);

  const fetchAcademicYears = async (schoolId) => {
    try {
      const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
      setAcademicYearList(response.data.data || []);
    } catch (err) {
      toast.error('Failed to fetch academic years.');
    }
  };


  useEffect(() => {
    if (schoolId && academicYear) {
      fetchSupportingTax(schoolId, academicYear)

    }
  }, [schoolId, academicYear]);

  const fetchSupportingTax = async (schoolId, academicYear) => {
    try {
      const response = await getAPI(
        `/it-declarations/${schoolId}/${academicYear}`,
        { 'Content-Type': 'application/json' },
        true
      );

      console.log("get response", response);

      if (response.hasError) {
        toast.error(response.message || 'Failed to fetch IT declarations');
        return;
      }
      setDeclarations(response.data.data || []);
      setTotalRecords(response.totalRecords || 0);
      setCurrentPage(1);
      console.log('Fetched IT declarations:', response.data.data);
    } catch (error) {
      toast.error('Error fetching IT declarations: ' + error.message);
      console.error('Fetch error:', error);
    }
  };

  const handleStatusChange = async (employeeId, status) => {
    try {
      const response = await putAPI(
        `/it-declaration/update/${schoolId}/${employeeId}`,
        { academicYear, status },
        { 'Content-Type': 'application/json' },
        true
      );
      if (!response.hasError) {
        setDeclarations(prev =>
          prev.map(decl =>
            decl.employeeId === employeeId ? { ...decl, status } : decl
          )
        );
        toast.success(`Status updated to ${status}`);
      } else {
        toast.error(response.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status: ' + error.message);
    }
  };

  const handleNavigateToVerify = (declaration) => {
    navigate(
      '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax',
      { state: { declaration, academicYear } }
    );
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalRecords / limit)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleYearChange = (e) => {
    setAcademicYear(e.target.value);
    setCurrentPage(1);
  };

  // Client-side pagination
  const paginatedDeclarations = declarations.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Supporting Submitted for Tax List
                  </h4>
                  <div>
                    <select
                      id="yearSelect"
                      className="form-select form-select-sm w-auto"
                      aria-label="Select Year"
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                    >
                      <option value="">Select Year</option>
                      {academicYearList.map((yearObj, index) => (
                        <option key={index} value={yearObj.academicYear}>
                          {yearObj.academicYear}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
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
                        <th>Name of Employee</th>
                        <th>Designation</th>
                        <th>Grade</th>
                        <th>Financial Year</th>
                        <th>Action</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedDeclarations.map((decl, index) => (
                        <tr className="payroll-table-body" key={decl.employeeId}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`customCheck${index}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${index}`}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{decl.employeeId}</td>
                          <td>{decl.employeeName}</td>
                          <td>{decl.designation}</td>
                          <td>{decl.grade}</td>
                          <td>{decl.academicYear}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                className="btn btn-light btn-sm"
                                onClick={() => handleNavigateToVerify(decl)}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="col-md-8" style={{ justifySelf: 'center' }}>
                              <select
                                id={`status-${decl.employeeId}`}
                                name="status"
                                className="form-control payroll-table-body payroll-input-border"
                                value={decl.status || 'Verification Pending'}
                                onChange={(e) => handleStatusChange(decl.employeeId, e.target.value)}
                              >
                                <option value="Verification Pending">Verification Pending</option>
                                <option value="Verification Done">Verification Done</option>
                              </select>
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
                      <button
                        className="page-link"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(Math.ceil(totalRecords / limit))].map((_, i) => (
                      <li
                        className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                        key={i}
                      >
                        <button
                          className="page-link pagination-button"
                          onClick={() => handlePageClick(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(totalRecords / limit)}
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
    </div>
  );
};

export default EmployeeSupportingSubmittedForTaxList;