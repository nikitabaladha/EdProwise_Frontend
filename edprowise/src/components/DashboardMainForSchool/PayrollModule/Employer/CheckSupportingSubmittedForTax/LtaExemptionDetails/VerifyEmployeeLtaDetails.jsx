import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import putAPI from '../../../../../../api/putAPI';

const VerifyLtaDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ltaRecord, setLtaRecord] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
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

    if (location.state?.ltaRecord) {
      setLtaRecord(location.state.ltaRecord);
      setEmployeeId(location.state.employeeId);
      setAcademicYear(location.state.academicYear || '2025-26');
    } else {
      toast.error('No LTA record data found');
      navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/lta-list');
    }
  }, [navigate, location.state]);

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

  // In VerifyLtaDetails.js
const handleStatusChange = async (status) => {
  try {
    setIsSubmitting(true);
    const updatedRecord = {
      _id: ltaRecord._id,
      NameOnBill: ltaRecord.NameOnBill,
      billNumber: ltaRecord.billNumber,
      billDate: ltaRecord.billDate,
      itemPurchased: ltaRecord.itemPurchased,
      vendorName: ltaRecord.vendorName,
      gstNumber: ltaRecord.gstNumber,
      grossAmount: ltaRecord.grossAmount,
      gstCharge: ltaRecord.gstCharge,
      totalAmount: ltaRecord.totalAmount,
      billFile: ltaRecord.billFile,
      billstatus: status,
      adminRemarks: ltaRecord.adminRemarks || '',
    };

    const response = await putAPI(
      `/update-lta/${schoolId}/${employeeId}`,
      {
        academicYear,
        status, // Overall status same as billstatus for consistency
        ltaDetails: [updatedRecord],
      },
      { 'Content-Type': 'application/json' },
      true
    );

    if (!response.hasError) {
      setLtaRecord(updatedRecord);
      toast.success(`LTA bill status updated to ${status}`);
      navigate(
        '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/lta-list',
        { state: { employeeId, academicYear } }
      );
    } else {
      toast.error(response.message || 'Failed to update status');
    }
  } catch (error) {
    toast.error('Error updating status: ' + error.message);
  } finally {
    setIsSubmitting(false);
  }
};
  const handleRemarkChange = (e) => {
    const value = e.target.value;
    setLtaRecord((prev) => ({
      ...prev,
      adminRemarks: value,
    }));
  };

  

  if (!ltaRecord) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">Verify LTA Details</h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() =>
                      navigate(
                        '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/lta-list',
                        { state: { employeeId, academicYear } }
                      )
                    }
                  >
                    Back
                  </button>
                </div>
              </div>
              <form>
                <div className="row mt-3 mb-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="nameOnBill" className="form-label">
                        Name on Bill <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="nameOnBill"
                        name="NameOnBill"
                        className="form-control"
                        value={ltaRecord.NameOnBill || 'N/A'}
                       
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="billNumber" className="form-label">
                        Bill Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="billNumber"
                        name="billNumber"
                        className="form-control"
                        value={ltaRecord.billNumber || 'N/A'}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="billDate" className="form-label">
                        Bill Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="billDate"
                        name="billDate"
                        className="form-control"
                        value={formatDate(ltaRecord.billDate)}
                       
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="itemPurchased" className="form-label">
                        Item Purchased <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="itemPurchased"
                        name="itemPurchased"
                        className="form-control"
                        value={ltaRecord.itemPurchased || 'N/A'}
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="vendorName" className="form-label">
                        Vendor Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="vendorName"
                        name="vendorName"
                        className="form-control"
                        value={ltaRecord.vendorName || 'N/A'}
                       
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gstNumber" className="form-label">
                        GST Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="gstNumber"
                        name="gstNumber"
                        className="form-control"
                        value={ltaRecord.gstNumber || 'N/A'}
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="grossAmount" className="form-label">
                        Gross Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="grossAmount"
                        name="grossAmount"
                        className="form-control"
                        value={formatCurrency(ltaRecord.grossAmount)}
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gstCharge" className="form-label">
                        GST Charge <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="gstCharge"
                        name="gstCharge"
                        className="form-control"
                        value={formatCurrency(ltaRecord.gstCharge)}
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="totalAmount" className="form-label">
                        Total Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="totalAmount"
                        name="totalAmount"
                        className="form-control"
                        value={formatCurrency(ltaRecord.totalAmount)}
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="billFile" className="form-label">
                        Bill Document <span className="text-danger">*</span>
                      </label>
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn btn-light btn-sm me-2"
                          onClick={() => handleDocumentPreview(ltaRecord.billFile)}
                          disabled={!ltaRecord.billFile}
                        >
                          <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                        </button>
                        <small>
                          {ltaRecord.billFile
                            ? ltaRecord.billFile.split('\\').pop().split('/').pop()
                            : 'No file'}
                        </small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="adminRemarks" className="form-label">
                        Admin Remarks
                      </label>
                      <input
                        type="text"
                        id="adminRemarks"
                        name="adminRemarks"
                        className="form-control payroll-input-border"
                        value={ltaRecord.adminRemarks || ''}
                        onChange={handleRemarkChange}
                        placeholder="Enter remarks"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleStatusChange('Approved')}
                    disabled={ltaRecord.billstatus === 'Approved' || isSubmitting}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleStatusChange('Rejected')}
                    disabled={ltaRecord.billstatus === 'Rejected' || isSubmitting}
                  >
                    Reject
                  </button>
                  
                </div>
              </form>
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
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyLtaDetails;