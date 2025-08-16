// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MdOutlineAutorenew } from "react-icons/md";
// const VerifyEmployerRentDetails = () => {
//     const months = [
//         'April', 'May', 'June', 'July', 'August', 'September',
//         'October', 'November', 'December', 'January', 'February', 'March'
//     ];

//     const navigate = useNavigate();
//     const [rentData, setRentData] = useState(
//         months.reduce((acc, month) => {
//             acc[month] = {
//                 rent: '',
//                 city: '',
//                 landlordName: '',
//                 landlordPan: '',
//                 landlordAddress: '',
//                 receipt: null
//             };
//             return acc;
//         }, {})
//     );

//     const handleChange = (month, field, value) => {
//         setRentData(prev => ({
//             ...prev,
//             [month]: {
//                 ...prev[month],
//                 [field]: value
//             }
//         }));
//     };

//     const handleFileChange = (month, file) => {
//         setRentData(prev => ({
//             ...prev,
//             [month]: {
//                 ...prev[month],
//                 receipt: file
//             }
//         }));
//     };

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-xl-12">
//                     <div className="card m-2">
//                         <div className="card-body custom-heading-padding">
//                             <div className="container">
//                                 <div className="card-header mb-2 d-flex align-items-center">
//                                     <h4 className="card-title flex-grow-1 text-center">
//                                         House Rent Details</h4>
//                                     <button
//                                         type="button"
//                                         className="btn btn-primary custom-submit-button"
//                                         onClick={() => navigate(-1)}
//                                     >
//                                         Back
//                                     </button>
//                                 </div>
//                             </div>
//                             <form >
//                                 <div className="table-responsive mb-2">
//                                     <table className="table text-dark border border-dark mb-4">
//                                         <thead>
//                                             <tr className="payroll-table-header">
//                                                 <th className="text-center align-content-center border border-dark p-2">Month</th>
//                                                 <th className="text-center align-content-center border border-dark p-2">Declared Rent</th>
//                                                 <th className="text-center align-content-center border border-dark p-2" style={{ minWidth: "9rem" }}>City</th>
//                                                 {/* we give the 9rem === 135px */}
//                                                 <th className="text-center align-content-center border border-dark p-2">Name of Landlord</th>
//                                                 <th className="text-center align-content-center border border-dark p-2">PAN of Landlord</th>
//                                                 <th className="text-center align-content-center border border-dark p-2">Address of Landlord</th>
//                                                 <th className="text-center align-content-center border border-dark p-2">Upload Rent Receipt</th>
//                                                 <th className="text-center align-content-center border border-dark p-2">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {months.map((month, index) => (
//                                                 <tr key={month} className="payroll-table-body">
//                                                     <td className="text-center align-content-center border border-dark p-2">{month}</td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                     <td className="text-end border border-dark p-2" style={{ minWidth: "9rem" }}>
//                                                         <select
//                                                             className="form-control payroll-table-body payroll-input-border"
//                                                             required

//                                                         >
//                                                             <option value="">Select City</option>
//                                                             <option value="Metro">Metro</option>
//                                                             <option value="Non-Metro">Non-Metro</option>
//                                                         </select>
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="text"
//                                                             className="form-control payroll-table-body payroll-input-border text-end"
//                                                             required

//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <input
//                                                             type="file"
//                                                             className="form-control payroll-input-border"
//                                                             accept="image/*,application/pdf"

//                                                             required
//                                                         />
//                                                     </td>
//                                                     <td className="text-end align-content-center border border-dark p-2">
//                                                         <div className="d-flex justify-content-center gap-2">
//                                                             <button
//                                                                 className="btn btn-primary btn-sm"
//                                                             >
//                                                                 Accept
//                                                             </button>
//                                                             <button
//                                                                 className="btn btn-danger btn-sm"
//                                                             >
//                                                                 Reject
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default VerifyEmployerRentDetails;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import putAPI from '../../../../../api/putAPI';

const VerifyEmployerRentDetails = () => {
  const months = [
    'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December', 'January', 'February', 'March'
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const [rentDetails, setRentDetails] = useState(
    months.map(month => ({
      month,
      declaredRent: 0,
      cityType: '',
      landlordName: '',
      landlordPanNumber: '',
      landlordAddress: '',
      rentReceipt: null,
      monthStatus: 'Pending',
      adminRemarks: ''
    }))
  );
  const [overallStatus, setOverallStatus] = useState('Pending');
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('School ID not found. Please log in again.');
      navigate('/login');
      return;
    }
    setSchoolId(userDetails.schoolId);

    const { rentDetailsId, rentDetails: stateRentDetails, employeeId: stateEmployeeId, academicYear: stateAcademicYear, employeeName: stateEmployeeName } = location.state || {};
    if (!rentDetailsId && !stateRentDetails) {
      toast.error('No rent details data found');
      navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
      return;
    }

    setEmployeeId(stateEmployeeId);
    setEmployeeName(stateEmployeeName);
    setAcademicYear(stateAcademicYear || '2025-26');

    if (stateRentDetails) {
      // Use rent details from state if provided
      setRentDetails(
        months.map(month => {
          const detail = stateRentDetails.find(d => d.month === month) || {};
          return {
            month,
            declaredRent: detail.declaredRent || 0,
            cityType: detail.cityType || '',
            landlordName: detail.landlordName || '',
            landlordPanNumber: detail.landlordPanNumber || '',
            landlordAddress: detail.landlordAddress || '',
            rentReceipt: detail.rentReceipt || null,
            monthStatus: detail.monthStatus || 'Pending',
            adminRemarks: detail.adminRemarks || ''
          };
        })
      );
      setOverallStatus(stateRentDetails.status || 'Pending');
    } else {
      // Fetch rent details from API
      fetchRentDetails(userDetails.schoolId, stateEmployeeId, rentDetailsId, stateAcademicYear);
    }
  }, [navigate, location.state]);

  const fetchRentDetails = async (schoolId, employeeId, rentDetailsId, academicYear) => {
    try {
      const response = await getAPI(
        `/rent-details/${schoolId}/${employeeId}?academicYear=${academicYear}`,
        { 'Content-Type': 'application/json' },
        true
      );
      if (!response.hasError && response.data?.data) {
        const fetchedRentDetails = response.data.data.rentDetails || [];
        const hraExemption = response.data.data.hraExemption || 0;
        setRentDetails(
          months.map(month => {
            const detail = fetchedRentDetails.find(d => d.month === month) || {};
            return {
              month,
              declaredRent: detail.declaredRent || 0,
              cityType: detail.cityType || '',
              landlordName: detail.landlordName || '',
              landlordPanNumber: detail.landlordPanNumber || '',
              landlordAddress: detail.landlordAddress || '',
              rentReceipt: detail.rentReceipt || null,
              monthStatus: detail.monthStatus || 'Pending',
              adminRemarks: detail.adminRemarks || ''
            };
          })
        );
        setOverallStatus(response.data.data.status || 'Pending');
      } else {
        toast.error(response.message || 'Failed to fetch rent details');
        navigate(-1);
      }
    } catch (error) {
      toast.error('Error fetching rent details: ' + error.message);
      console.error('Fetch error:', error);
      navigate(-1);
    }
  };

  const handleRemarkChange = (month, value) => {
    setRentDetails(prev =>
      prev.map(detail =>
        detail.month === month ? { ...detail, adminRemarks: value } : detail
      )
    );
  };

  // const handleMonthStatusChange = async (month, status) => {
  //   try {
  //     setIsSubmitting(true);
  //     const updatedRentDetails = rentDetails.map(detail =>
  //       detail.month === month ? { ...detail, monthStatus: status } : detail
  //     );

  //     const response = await putAPI(
  //       `/rent-details/update-status/${schoolId}/${employeeId}`,
  //       {
  //         academicYear,
  //         rentDetails: updatedRentDetails
  //       },
  //       { 'Content-Type': 'application/json' },
  //       true
  //     );

  //     if (!response.hasError) {
  //       setRentDetails(updatedRentDetails);
  //       toast.success(`Month ${month} status updated to ${status}`);
  //     } else {
  //       toast.error(response.message || 'Failed to update month status');
  //     }
  //   } catch (error) {
  //     toast.error('Error updating month status: ' + error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleMonthStatusChange = async (month, status) => {
  try {
    setIsSubmitting(true);
    const updatedRentDetails = rentDetails.map((detail) =>
      detail.month === month ? { ...detail, monthStatus: status } : detail
    );
console.log("${schoolId}/${employeeId}", schoolId, employeeId)
    const response = await putAPI(
      // `/rent-details/update-status/${schoolId}/${employeeId}`,
      
      
       `/rent-details/update/${schoolId}/${employeeId}`,
      {
        academicYear,
        status: overallStatus,
        rentDetails: updatedRentDetails,
      },
      { 'Content-Type': 'application/json' },
      true
    );

    if (!response.hasError) {
      setRentDetails(updatedRentDetails);
      toast.success(`Month ${month} status updated to ${status}`);
    } else {
      toast.error(response.message || 'Failed to update month status');
    }
  } catch (error) {
    toast.error('Error updating month status: ' + error.message);
  } finally {
    setIsSubmitting(false);
  }
};
  // const handleOverallStatusChange = async (status) => {
  //   // Validate that all non-zero rent months are verified
  //   const unverifiedMonths = rentDetails.filter(
  //     detail => detail.declaredRent > 0 && detail.monthStatus === 'Pending'
  //   );
  //   if (unverifiedMonths.length > 0) {
  //     toast.error(`Please verify the following months before finalizing: ${unverifiedMonths.map(d => d.month).join(', ')}`);
  //     return;
  //   }

  //   try {
  //     setIsSubmitting(true);
  //     const response = await putAPI(
  //       `/rent-details/update-status/${schoolId}/${employeeId}`,
  //       {
  //         academicYear,
  //         rentDetails,
  //         status
  //       },
  //       { 'Content-Type': 'application/json' },
  //       true
  //     );

  //     if (!response.hasError) {
  //       setOverallStatus(status);
  //       toast.success(`Overall status updated to ${status}`);
  //       navigate(-1); // Navigate back after finalizing
  //     } else {
  //       toast.error(response.message || 'Failed to update overall status');
  //     }
  //   } catch (error) {
  //     toast.error('Error updating overall status: ' + error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleOverallStatusChange = async (status) => {
  // Validate that all non-zero rent months are verified
  const unverifiedMonths = rentDetails.filter(
    (detail) => detail.declaredRent > 0 && detail.monthStatus === 'Pending'
  );
  if (unverifiedMonths.length > 0) {
    toast.error(
      `Please verify the following months before finalizing: ${unverifiedMonths
        .map((d) => d.month)
        .join(', ')}`
    );
    return;
  }

  try {
    setIsSubmitting(true);
    const response = await putAPI(
      `/rent-details/update/${schoolId}/${employeeId}`,
      {
        academicYear,
        status,
        rentDetails,
      },
      { 'Content-Type': 'application/json' },
      true
    );

    if (!response.hasError) {
      setOverallStatus(status);
      setRentDetails(response.data.data.rentDetails); // Update with recalculated values
      toast.success(`Overall status updated to ${status}`);
      navigate(-1); // Navigate back after finalizing
    } else {
      toast.error(response.message || 'Failed to update overall status');
    }
  } catch (error) {
    toast.error('Error updating overall status: ' + error.message);
  } finally {
    setIsSubmitting(false);
  }
};
  const handleDocumentPreview = (documentPath) => {
    if (documentPath) {
      const formattedPath = documentPath.startsWith('http')
        ? documentPath
        : `${process.env.REACT_APP_API_URL_FOR_IMAGE}/${documentPath}`;
      setPreviewDocument(formattedPath);
    } else {
      toast.error('No document available for preview');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount || 0);
  };

  const getFileName = (documentPath) => {
    if (documentPath) {
      const fullName = documentPath.split('\\').pop().split('/').pop() || 'Document';
      return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
    }
    return 'No file';
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center justify-content-between mb-3">
                  <h4 className="card-title flex-grow-1 text-center">
                    House Rent Details
                  </h4>
                  <div className="d-flex align-items-center gap-2">
                    <select
                      id="overallStatusSelect"
                      className="form-control custom-select"
                      value={overallStatus}
                      onChange={(e) => handleOverallStatusChange(e.target.value)}
                      disabled={isSubmitting}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </button>
                  </div>
                </div>
                
              </div>
              <form>
                <div className="table-responsive">
                  <table className="table text-dark border border-dark mb-4">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-middle border border-dark p-2">Month</th>
                        <th className="text-center align-middle border border-dark p-2">Declared Rent</th>
                        <th className="text-center align-middle border border-dark p-2" style={{ minWidth: '100px' }}>City</th>
                        <th className="text-center align-middle border border-dark p-2">Landloard Name</th>
                        <th className="text-center align-middle border border-dark p-2">PAN of Landlord</th>
                        <th className="text-center align-middle border border-dark p-2">Address</th>
                        <th className="text-center align-middle border border-dark p-2">Rent Receipt</th>
                        {/* <th className="text-center align-middle border border-dark p-2">Month Status</th> */}
                        <th className="text-center align-middle border border-dark p-2">Action</th>
                        <th className="text-center align-middle border border-dark p-2">Admin Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rentDetails.map((detail, index) => (
                        <tr key={detail.month} className="payroll-table-body">
                          <td className="text-center align-middle border border-dark p-2">{detail.month}</td>
                          <td className="text-end align-middle border border-dark p-2">
                            {formatCurrency(detail.declaredRent)}
                          </td>
                          <td className="text-center align-middle border border-dark p-2">
                            {detail.cityType || '-'}
                          </td>
                          <td className="text-center align-middle border border-dark p-2">
                            {detail.landlordName || '-'}
                          </td>
                          <td className="text-center align-middle border border-dark p-2">
                            {detail.landlordPanNumber || '-'}
                          </td>
                          <td className="text-center align-middle border border-dark p-2">
                            {detail.landlordAddress || '-'}
                          </td>
                          <td className="text-center align-middle border border-dark p-2">
                            <button
                              type="button"
                              className="btn btn-light btn-sm"
                              onClick={() => handleDocumentPreview(detail.rentReceipt)}
                              disabled={!detail.rentReceipt}
                              title={detail.rentReceipt ? 'View Receipt' : 'No Receipt Uploaded'}
                            >
                              <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                            </button>
                            <div className="mt-2">
                              <small>{getFileName(detail.rentReceipt)}</small>
                            </div>
                          </td>

                          <td className="text-center align-middle border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleMonthStatusChange(detail.month, 'Approved')}
                                disabled={detail.monthStatus === 'Approved' || isSubmitting}
                                title="Accept this month's rent details"
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleMonthStatusChange(detail.month, 'Rejected')}
                                disabled={detail.monthStatus === 'Rejected' || isSubmitting}
                                title="Reject this month's rent details"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-middle border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={detail.adminRemarks || ''}
                              onChange={(e) => handleRemarkChange(detail.month, e.target.value)}
                              placeholder="Enter remarks"
                              disabled={isSubmitting}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {previewDocument && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Document Preview</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setPreviewDocument(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {previewDocument.endsWith('.pdf') ? (
                  <iframe
                    src={`${previewDocument}#toolbar=0`}
                    style={{ width: '100%', height: '500px', border: 'none' }}
                    title="Document Preview"
                  ></iframe>
                ) : (
                  <img
                    src={previewDocument}
                    alt="Document"
                    style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '10px' }}
                    onError={() => {
                      toast.error('Failed to load document');
                      setPreviewDocument(null);
                    }}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setPreviewDocument(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmployerRentDetails;