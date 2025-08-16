// // AddLtaExamptionDetails.jsx
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import postAPI from '../../../../../api/postAPI';

// const AddLtaExamptionDetails = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [sending, setSending] = useState(false);
//   const employeeId = location.state?.employeeId;

  
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [formData, setFormData] = useState({
//     employeeName: '',
//     billNumber: '',
//     billDate: '',
//     itemPurchased: '',
//     vendorName: '',
//     gstNumber: '',
//     grossAmount: '',
//     gstCharge: '',
//     totalAmount: '',
//     status:"Pending",
//     billFile: null
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       billFile: e.target.files[0]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSending(true);

//     try {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach(key => {
//         if (key === 'billFile' && formData[key]) {
//           formDataToSend.append(key, formData[key]);
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
//       formDataToSend.append('schoolId', location.state?.schoolId);
//       formDataToSend.append('academicYear', academicYear);

//       const response = await postAPI(`/create-lta/${employeeId}`, formDataToSend, 
//         { 'Content-Type': 'multipart/form-data' }, true
//       );

//       toast.success(response.message || 'LTA record added successfully');
      
//     } catch (err) {
//       toast.error(err.message || 'Failed to add LTA record');
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header mb-2 d-flex align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     LTA Form
//                   </h4>
//                   <button
//                     type="button"
//                     className="btn btn-primary custom-submit-button"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="employeeName" className="form-label">
//                         Name on Bill <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="employeeName"
//                         name="employeeName"
//                         className="form-control"
//                         value={formData.employeeName}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Enter Name on Bill"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="billNumber" className="form-label">
//                         Bill Number <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="billNumber"
//                         name="billNumber"
//                         className="form-control"
//                         value={formData.billNumber}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Enter Bill Number"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="billDate" className="form-label">
//                         Bill Date <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         id="billDate"
//                         name="billDate"
//                         className="form-control"
//                         value={formData.billDate}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="itemPurchased" className="form-label">
//                         Item Purchased <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="itemPurchased"
//                         name="itemPurchased"
//                         className="form-control"
//                         value={formData.itemPurchased}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Enter Item Purchased"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="vendorName" className="form-label">
//                         Vendor Name <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="vendorName"
//                         name="vendorName"
//                         className="form-control"
//                         value={formData.vendorName}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Enter Vendor Name"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="gstNumber" className="form-label">
//                         GST Number <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="gstNumber"
//                         name="gstNumber"
//                         className="form-control"
//                         value={formData.gstNumber}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Enter GST Number"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="grossAmount" className="form-label">
//                         Gross Amount <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         id="grossAmount"
//                         name="grossAmount"
//                         className="form-control"
//                         value={formData.grossAmount}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Enter Gross Amount"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="gstCharge" className="form-label">
//                         GST Charge <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         id="gstCharge"
//                         name="gstCharge"
//                         className="form-control"
//                         value={formData.gstCharge}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Enter GST Charge"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="totalAmount" className="form-label">
//                         Total Amount <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         id="totalAmount"
//                         name="totalAmount"
//                         className="form-control"
//                         value={formData.totalAmount}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Enter Total Amount"
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="billFile" className="form-label">
//                         Upload Bill <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="file"
//                         id="billFile"
//                         name="billFile"
//                         className="form-control"
//                         onChange={handleFileChange}
//                         required
//                         accept="image/jpeg,image/png,application/pdf"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-end">
//                   <button
//                     type="submit"
//                     className="btn btn-primary custom-submit-button"
//                     disabled={sending}
//                   >
//                     {sending ? 'Submitting...' : 'Submit'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddLtaExamptionDetails;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import postAPI from '../../../../../api/postAPI';
import getAPI from '../../../../../api/getAPI';
const AddLtaExamptionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sending, setSending] = useState(false);
  
  const { employeeId, schoolId, academicYear } = location.state || {};
  // const [academicYear, setAcademicYear] = useState(initialAcademicYear || '2025-26');
  const [employeeCtc, setEmployeeCtcDetails] = useState(null);
  const [categoryLimit, setCategoryLimit] = useState(0)
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
    status: 'Pending',
    billFile: null,
  });

  useEffect(() => {
          feachEmployeeCtc();   
      }, [navigate]);

    const feachEmployeeCtc = async () => {
  try {
    const response = await getAPI(`/get-employee-ctc-details/${schoolId}/${employeeId}/${academicYear}`);
    
    if (!response.hasError && response.data?.data) {
      const components = response.data.data.components;
      const ltaComponent = components.find(c => c.ctcComponentName === 'LTA');

      if (ltaComponent) {
        setCategoryLimit(ltaComponent.annualAmount);
      } else {
        setCategoryLimit(0);
      }
    } else {
      toast.error("No employee CTC data found.");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Error occurred.");
  }
};


  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    if (!formData.employeeName.trim()) {
      newErrors.employeeName = 'Name on Bill is required';
    }
    if (!formData.billNumber.trim()) {
      newErrors.billNumber = 'Bill Number is required';
    }
    if (!formData.billDate) {
      newErrors.billDate = 'Bill Date is required';
    } else {
      const today = new Date();
      const selectedDate = new Date(formData.billDate);
      if (selectedDate > today) {
        newErrors.billDate = 'Bill Date cannot be in the future';
      }
    }
    if (!formData.itemPurchased.trim()) {
      newErrors.itemPurchased = 'Item Purchased is required';
    }
    if (!formData.vendorName.trim()) {
      newErrors.vendorName = 'Vendor Name is required';
    }
    if (!formData.gstNumber.trim()) {
      newErrors.gstNumber = 'GST Number is required';
    } else if (!gstRegex.test(formData.gstNumber)) {
      newErrors.gstNumber = 'Invalid GST Number format';
    }
    if (!formData.grossAmount) {
      newErrors.grossAmount = 'Gross Amount is required';
    } else if (parseFloat(formData.grossAmount) <= 0) {
      newErrors.grossAmount = 'Gross Amount must be a positive number';
    }
    if (!formData.gstCharge) {
      newErrors.gstCharge = 'GST Charge is required';
    } else if (parseFloat(formData.gstCharge) < 0) {
      newErrors.gstCharge = 'GST Charge cannot be negative';
    }
    if (!formData.totalAmount) {
      newErrors.totalAmount = 'Total Amount is required';
    } else if (parseFloat(formData.totalAmount) <= 0) {
      newErrors.totalAmount = 'Total Amount must be a positive number';
    } else if (parseFloat(formData.totalAmount) !== parseFloat(formData.grossAmount) + parseFloat(formData.gstCharge)) {
      newErrors.totalAmount = 'Total Amount must equal Gross Amount + GST Charge';
    }
    if (!formData.billFile) {
      newErrors.billFile = 'Bill File is required';
    } else {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(formData.billFile.type)) {
        newErrors.billFile = 'Only JPEG, PNG, or PDF files are allowed';
      } else if (formData.billFile.size > 2 * 1024 * 1024) {
        newErrors.billFile = 'File size must be less than 2MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      billFile: file || null,
    }));
    setErrors((prev) => ({ ...prev, billFile: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId || !schoolId || !academicYear) {
      toast.error('Missing employee, school, or academic year information');
      return;
    }

    if (!validateForm()) {
      toast.error('Please correct the errors in the form');
      return;
    }
        console.log("categoryLimit",categoryLimit);
        
    setSending(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'billFile' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append('schoolId', schoolId);
      formDataToSend.append('academicYear', academicYear);
      formDataToSend.append('categoryLimit', categoryLimit);
      const response = await postAPI(
        `/create-lta/${employeeId}`,
        formDataToSend,
        { 'Content-Type': 'multipart/form-data' },
        true
      );

      toast.success(response.message || 'LTA record added successfully');
      setFormData({
        employeeName: '',
        billNumber: '',
        billDate: '',
        itemPurchased: '',
        vendorName: '',
        gstNumber: '',
        grossAmount: '',
        gstCharge: '',
        totalAmount: '',
        status: 'Pending',
        billFile: null,
      });
      setErrors({});
      navigate('/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/lta-details');
    } catch (err) {
      toast.error(err.message || 'Failed to add LTA record');
    } finally {
      setSending(false);
    }
  };

  const getFileName = () => {
    if (formData.billFile instanceof File) {
      return formData.billFile.name.length > 25
        ? formData.billFile.name.slice(0, 25) + '...'
        : formData.billFile.name;
    }
    return 'No file selected';
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
                      {errors.employeeName && (
                        <small className="text-danger">{errors.employeeName}</small>
                      )}
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
                      {errors.billNumber && (
                        <small className="text-danger">{errors.billNumber}</small>
                      )}
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
                        max={new Date().toISOString().split('T')[0]}
                      />
                      {errors.billDate && (
                        <small className="text-danger">{errors.billDate}</small>
                      )}
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
                      {errors.itemPurchased && (
                        <small className="text-danger">{errors.itemPurchased}</small>
                      )}
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
                      {errors.vendorName && (
                        <small className="text-danger">{errors.vendorName}</small>
                      )}
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
                        placeholder="Enter GST Number (e.g., 22AAAAA0000A1Z5)"
                      />
                      {errors.gstNumber && (
                        <small className="text-danger">{errors.gstNumber}</small>
                      )}
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
                        min="0"
                        step="0.01"
                      />
                      {errors.grossAmount && (
                        <small className="text-danger">{errors.grossAmount}</small>
                      )}
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
                        min="0"
                        step="0.01"
                      />
                      {errors.gstCharge && (
                        <small className="text-danger">{errors.gstCharge}</small>
                      )}
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
                        min="0"
                        step="0.01"
                      />
                      {errors.totalAmount && (
                        <small className="text-danger">{errors.totalAmount}</small>
                      )}
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
                      {formData.billFile && (
                        <small className="text-muted mt-1 d-block">
                          Selected: {getFileName()}
                        </small>
                      )}
                      {errors.billFile && (
                        <small className="text-danger">{errors.billFile}</small>
                      )}
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

export default AddLtaExamptionDetails;