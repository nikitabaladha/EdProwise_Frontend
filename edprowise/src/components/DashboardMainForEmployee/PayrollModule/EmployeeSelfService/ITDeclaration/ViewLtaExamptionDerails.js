import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import postAPI from '../../../../../api/postAPI';

const ViewLtaExamptionDerails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sending, setSending] = useState(false);
//   const [employeeId, setEmployeeId] = useState(null);
  const employeeId = location.state?.employeeId;

  
  const [academicYear, setAcademicYear] = useState('2025-26');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      billFile: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'billFile' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append('schoolId', location.state?.schoolId);
      formDataToSend.append('academicYear', academicYear);

      const response = await postAPI(`/create-lta/${employeeId}`, formDataToSend, 
        { 'Content-Type': 'multipart/form-data' }, true
      );

      toast.success(response.message || 'LTA record added successfully');
      
    } catch (err) {
      toast.error(err.message || 'Failed to add LTA record');
    } finally {
      setSending(false);
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
                    LTA Form
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
              <form onSubmit={handleSubmit}>
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
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Name on Bill"
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
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Bill Number"
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
                        value={formData.billDate}
                        onChange={handleInputChange}
                        required
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
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Item Purchased"
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
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Vendor Name"
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
                        onChange={handleInputChange}
                        required
                        placeholder="Enter GST Number"
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
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Gross Amount"
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
                        onChange={handleInputChange}
                        required
                        placeholder="Enter GST Charge"
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
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Total Amount"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="billFile" className="form-label">
                        Upload Bill <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="billFile"
                        name="billFile"
                        className="form-control"
                        onChange={handleFileChange}
                        required
                        accept="image/jpeg,image/png,application/pdf"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={sending}
                  >
                    {sending ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLtaExamptionDerails;