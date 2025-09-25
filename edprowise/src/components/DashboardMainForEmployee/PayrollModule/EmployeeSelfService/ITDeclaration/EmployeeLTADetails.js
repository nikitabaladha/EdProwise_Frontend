// import React, { useState, useEffect } from "react";

// import { useNavigate, useLocation, Link } from "react-router-dom";

// import { toast } from "react-toastify";

// import axios from "axios";

// import getAPI from "../../../../../api/getAPI";

// import ConfirmationDialog from "../../../../ConfirmationDialog";

// const EmployeeLTADetails = () => {

//   const navigate = useNavigate();

//   const { state } = useLocation();

//   const academicYear = state?.academicYear;

//   const [schoolId, setSchoolId] = useState(null);

//   const [employeeId, setEmployeeId] = useState(null);

//   const [employeeLtaDetails, setEmployeeLtaDetails] = useState([]);

//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);

//   const [recordsPerPage] = useState(10);

//   useEffect(() => {

//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));

//     if (!userDetails?.schoolId || !userDetails?.userId) {

//       toast.error("Authentication details missing");

//       navigate("/login");

//       return;

//     }

//     setSchoolId(userDetails.schoolId);

//     setEmployeeId(userDetails.userId); // ✅ use userId as employeeId

//     fetchLtaDetails(userDetails.schoolId, userDetails.userId, academicYear);

//   }, []);

//   const fetchLtaDetails = async (schoolId, employeeId, academicYear) => {

//     try {

//       const response = await getAPI(

//         `/get-lta-details/${schoolId}/${employeeId}?academicYear=${academicYear}`

//       );

//       const data = Array.isArray(response.data.data) ? response.data.data : [];

//       const validData = data.filter((record) => record._id && typeof record._id === "string");

//       const sortedData = validData.sort((a, b) =>

//         a.createdAt

//           ? new Date(b.createdAt) - new Date(a.createdAt)

//           : new Date(b.billDate) - new Date(a.billDate)

//       );

//       setEmployeeLtaDetails(sortedData);

//     } catch (err) {

//       console.error("Error fetching LTA details:", err);

//       toast.error(err.response?.data?.message || "Failed to fetch LTA details");

//       setEmployeeLtaDetails([]);

//     }

//   };

//   const openDeleteDialog = (lta) => {
// console.log("employeeId", employeeId);
//     if (!lta._id) {

//       toast.error("Cannot delete: Invalid record ID");

//       return;

//     }

//     setSelectedEmployee(lta);

//     setIsDeleteDialogOpen(true);


//   };

//   const handleDeleteCancel = () => {

//     setIsDeleteDialogOpen(false);

//     setSelectedEmployee(null);

//   };

//   // ✅ API call for delete

//   const handleDeleteConfirmed = async (detailId) => {

//     try {

//       const response = await axios.delete(

//         `/delete-lta/${detailId}?employeeId=${employeeId}`

//       );

//       if (response.data.success) {

//         toast.success(response.data.message);

//         // Remove deleted record from UI

//         setEmployeeLtaDetails((prev) =>

//           prev.filter((lta) => lta._id !== detailId)

//         );

//       } else {

//         toast.error(response.data.message || "Failed to delete LTA detail");

//       }

//     } catch (error) {

//       console.error("Error deleting LTA detail:", error);

//       toast.error(error.response?.data?.message || "Failed to delete LTA detail");

//     } finally {

//       setIsDeleteDialogOpen(false);

//       setSelectedEmployee(null);

//     }

//   };

//   const navigateToAddLta = (event) => {

//     event.preventDefault();

//     navigate(

//       "/employee-dashboard/payroll-module/employee/income-tax/it-declaration/lta-details/add-lta",

//       { state: { schoolId, employeeId, academicYear } }

//     );

//   };

//   const navigateToView = (event, lta) => {

//     event.preventDefault();

//     navigate(

//       "/employee-dashboard/payroll-module/employee/income-tax/it-declaration/lta-details/view-lta",

//       { state: { lta, academicYear } }

//     );

//   };

//   // Pagination logic

//   const indexOfLastRecord = currentPage * recordsPerPage;

//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

//   const currentRecords = employeeLtaDetails.slice(

//     indexOfFirstRecord,

//     indexOfLastRecord

//   );

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

//     return new Date(isoDate).toLocaleDateString("en-GB");

//   };

//   const navigateToBack = (event) => {

//     event.preventDefault();

//     navigate("/employee-dashboard/payroll-module/employee/income-tax/it-declaration");

//   };
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

//                     onClick={navigateToBack}

//                     className="me-2 btn btn-sm btn-primary"
//                   >

//                     Back
//                   </Link>
//                   <Link

//                     onClick={navigateToAddLta}

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
//                       <th>Employee ID</th>
//                       <th>Bill No</th>
//                       <th>Bill Date</th>
//                       <th>Item Purchased</th>
//                       <th>Vendor Name</th>
//                       <th>GST No.</th>
//                       <th>Gross Amt.</th>
//                       <th>GST Charge</th>
//                       <th>Total Amount</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>

//                     {currentRecords.length === 0 ? (
//                       <tr>
//                         <td colSpan="11" className="text-center">

//                           No LTA records found
//                         </td>
//                       </tr>

//                     ) : (

//                       currentRecords.map((lta) => (
//                         <tr key={lta._id}>
//                           <td>{lta.employeeId}</td>
//                           <td>{lta.billNumber}</td>
//                           <td>{formatDate(lta.billDate)}</td>
//                           <td>{lta.itemPurchased}</td>
//                           <td>{lta.vendorName}</td>
//                           <td>{lta.gstNumber}</td>
//                           <td>{lta.grossAmount.toLocaleString("en-IN")}</td>
//                           <td>{lta.gstCharge.toLocaleString("en-IN")}</td>
//                           <td>{lta.totalAmount.toLocaleString("en-IN")}</td>
//                           <td>{lta.billstatus}</td>
//                           <td>
//                             <div className="d-flex gap-2 justify-content-center">
//                               <Link

//                                 className="btn btn-light btn-sm"

//                                 onClick={(event) => navigateToView(event, lta)}
//                               >
//                                 <iconify-icon

//                                   icon="solar:eye-broken"

//                                   className="align-middle fs-18"

//                                 />
//                               </Link>

//                               {lta.billstatus === "Approved" ? (

//                                 ""

//                               ) : (
//                                 <button

//                                   className="btn btn-soft-danger btn-sm"

//                                   onClick={() => openDeleteDialog(lta)}
//                                 >
//                                   <iconify-icon

//                                     icon="solar:trash-bin-minimalistic-2-broken"

//                                     className="align-middle fs-18"

//                                   />
//                                 </button>

//                               )}
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
//                     <li

//                       className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
//                     >
//                       <button className="page-link" onClick={handlePreviousPage}>

//                         Previous
//                       </button>
//                     </li>

//                     {pagesToShow.map((page) => (
//                       <li

//                         key={page}

//                         className={`page-item ${currentPage === page ? "active" : ""

//                           }`}
//                       >
//                         <button

//                           className="page-link"

//                           onClick={() => handlePageClick(page)}
//                         >

//                           {page}
//                         </button>
//                       </li>

//                     ))}

//                     <li

//                       className={`page-item ${currentPage === totalPages ? "disabled" : ""

//                         }`}
//                     >
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

//           employeeId={employeeId}

//           onDeleted={handleDeleteConfirmed}

//         />

//       )}
//     </div>

//   );

// };

// export default EmployeeLTADetails;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import ConfirmationDialog from "../../../../ConfirmationDialog";
 
const EmployeeLTADetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const academicYear = state?.academicYear;
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeLtaDetails, setEmployeeLtaDetails] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails?.schoolId || !userDetails?.userId) {
      toast.error("Authentication details missing");
      navigate("/login");
      return;
    }
    // const academicYear = localStorage.getItem("selectedAcademicYear");
    setSchoolId(userDetails.schoolId);
    setEmployeeId(userDetails.userId);
    // setAcademicYear(academicYear);
    fetchLtaDetails(userDetails.schoolId, userDetails.userId, academicYear);
  }, []);

  const fetchLtaDetails = async (schoolId, employeeId, academicYear) => {
    try {
      const response = await getAPI(
        `/get-lta-details/${schoolId}/${employeeId}?academicYear=${academicYear}`
      );
      console.log("LTA Details get", response.data.data);
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      const validData = data.filter(
        (record) => record._id && typeof record._id === "string"
      );
      if (data.length !== validData.length) {
        console.warn("Some records have invalid or missing _id:", data);
      }
      // Sort by createdAt if available, fallback to billDate
      const sortedData = validData.sort((a, b) =>
        a.createdAt
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(b.billDate) - new Date(a.billDate)
      );
      setEmployeeLtaDetails(sortedData);
      // setEmployeeLtaDetails(validData);
    } catch (err) {
      console.error("Error fetching LTA details:", err);
      toast.error(err.response.data.message || "Failed to fetch LTA details");
      setEmployeeLtaDetails([]);
    }
  };

  const openDeleteDialog = (lta) => {
    if (!lta._id) {
      toast.error("Cannot delete: Invalid record ID");
      return;
    }
    console.log("EmployeeId", employeeId);
    setSelectedEmployee(lta);
    setDeleteType("LTA");
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
    navigate(
      "/employee-dashboard/payroll-module/employee/income-tax/it-declaration/lta-details/add-lta",
      {
        state: { schoolId, employeeId, academicYear },
      }
    );
  };

  const navigateToView = (event, lta) => {
    event.preventDefault();
    navigate(
      "/employee-dashboard/payroll-module/employee/income-tax/it-declaration/lta-details/view-lta",
      {
        state: { lta, academicYear },
      }
    );
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = employeeLtaDetails.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
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
    return new Date(isoDate).toLocaleDateString("en-GB");
  };

  const navigateToBack = (event) => {
    event.preventDefault();
    navigate(
      "/employee-dashboard/payroll-module/employee/income-tax/it-declaration"
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
                  <h4 className="card-title flex-grow-1 text-center">
                    LTA Employee List
                  </h4>
                  <Link
                    onClick={navigateToBack}
                    className="me-2 btn btn-sm btn-primary"
                  >
                    Back
                  </Link>
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
                          <label
                            className="form-check-label"
                            htmlFor="customCheck1"
                          />
                        </div>
                      </th>
                      <th className="text-nowrap">Employee ID</th>
                      <th className="text-nowrap">Bill No</th>
                      <th className="text-nowrap">Bill Date</th>
                      <th className="text-nowrap">Item Purchased</th>
                      <th className="text-nowrap">Vendor Name</th>
                      <th className="text-nowrap">GST No.</th>
                      <th className="text-nowrap">Gross Amt.</th>
                      <th className="text-nowrap">GST Charge</th>
                      <th className="text-nowrap">Total Amount</th>
                      <th className="text-nowrap">Status</th>
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.length === 0 ? (
                      <tr>
                        <td colSpan="11" className="text-center">
                          No LTA records found
                        </td>
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
                          <td>{lta.grossAmount.toLocaleString("en-IN")}</td>
                          <td>{lta.gstCharge.toLocaleString("en-IN")}</td>
                          <td>{lta.totalAmount.toLocaleString("en-IN")}</td>
                          <td>{lta.billstatus}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <Link
                                className="btn btn-light btn-sm"
                                onClick={(event) => navigateToView(event, lta)}
                                // disabled={!lta._id}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              {lta.billstatus === "Approved" ? (
                                ""
                              ) : (
                                <>
                                  <button
                                    className="btn btn-soft-danger btn-sm"
                                    onClick={() => openDeleteDialog(lta)}
                                    disabled={lta.billstatus === "Approved"}
                                  >
                                    <iconify-icon
                                      icon="solar:trash-bin-minimalistic-2-broken"
                                      className="align-middle fs-18"
                                    />
                                  </button>
                                </>
                              )}
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
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={handlePreviousPage}
                      >
                        Previous
                      </button>
                    </li>
                    {pagesToShow.map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
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
          deleteType="LTA"
          id={{ detailId: selectedEmployee._id, employeeId: employeeId }}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default EmployeeLTADetails;
 
 
 