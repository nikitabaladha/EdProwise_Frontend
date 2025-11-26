import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
const ViewLtaExemptionDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const ltaDetails = state?.lta;
  const [billFileUrl, setBillFileUrl] = useState(null);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: '',
    billNumber: '',
    billDate: '',
    itemPurchased: '',
    vendorName: '',
    gstNumber: '',
    grossAmount: '',
    gstCharge: '',
    totalAmount: '',
    billFile: null
  });

  useEffect(() => {
    if (ltaDetails) {
      setFormData({
        employeeName: ltaDetails.employeeName || '',
        billNumber: ltaDetails.billNumber || '',
        billDate: ltaDetails.billDate || '',
        itemPurchased: ltaDetails.itemPurchased || '',
        vendorName: ltaDetails.vendorName || '',
        gstNumber: ltaDetails.gstNumber || '',
        grossAmount: ltaDetails.grossAmount || '',
        gstCharge: ltaDetails.gstCharge || '',
        totalAmount: ltaDetails.totalAmount || '',
        billFile: ltaDetails.billFile || null,
      });
    }
  }, [ltaDetails]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };


  const handleDocumentPreview = (documentPath) => {
    if (documentPath) {
      // Check if it's already a full URL (from API response)
      const formattedPath = documentPath.startsWith('http')
        ? documentPath
        : `${process.env.REACT_APP_API_URL_FOR_IMAGE}/${documentPath}`;
      setPreviewDocument(formattedPath); // Use previewDocument state instead of billFileUrl
    } else {
      toast.error('No document available for preview');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    LTA Details
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="employeeName" className="form-label">
                        Name on Bill <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeName"
                        name="employeeName"
                        className="form-control"
                        value={formData.employeeName}
                        placeholder="Enter Name on Bill"
                        readOnly
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
                        value={formData.billNumber}
                        placeholder="Enter Bill Number"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="billDate" className="form-label">
                        Bill Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="billDate"
                        name="billDate"
                        className="form-control"
                        value={formatDate(formData.billDate)}
                        readOnly
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
                        value={formData.itemPurchased}
                        placeholder="Enter Item Purchased"
                        readOnly
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
                        value={formData.vendorName}
                        placeholder="Enter Vendor Name"
                        readOnly
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
                        value={formData.gstNumber}
                        placeholder="Enter GST Number"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="grossAmount" className="form-label">
                        Gross Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="grossAmount"
                        name="grossAmount"
                        className="form-control"
                        value={formData.grossAmount}
                        placeholder="Enter Gross Amount"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gstCharge" className="form-label">
                        GST Charge <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="gstCharge"
                        name="gstCharge"
                        className="form-control"
                        value={formData.gstCharge}
                        placeholder="Enter GST Charge"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="totalAmount" className="form-label">
                        Total Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="totalAmount"
                        name="totalAmount"
                        className="form-control"
                        value={formData.totalAmount}
                        placeholder="Enter Total Amount"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Uploaded Bill</label>
                      <button
                        type='button'
                        className="btn btn-light btn-sm"
                        onClick={() => handleDocumentPreview(formData.billFile)}
                        disabled={!formData.billFile}
                      >
                        <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                        {formData.billFile ? ' View Document' : ' No Document'}
                      </button>

                      {/* ) : (
                        <p className="text-muted">No bill uploaded</p>
                      )} */}
                    </div>
                  </div>
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
                        {previewDocument.toLowerCase().endsWith('.pdf') ? (
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

export default ViewLtaExemptionDetails;