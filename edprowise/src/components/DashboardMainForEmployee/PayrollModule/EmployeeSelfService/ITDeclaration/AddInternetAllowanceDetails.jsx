// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import postAPI from '../../../../../api/postAPI';

// const AddInternetAllowanceDetails = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [sending, setSending] = useState(false);
//   const { employeeId, schoolId } = location.state || {};
//   const [academicYear, setAcademicYear] = useState('2025-26');
//   const [formData, setFormData] = useState({
//     employeeName: '',
//     billNumber: '',
//     billDate: '',
//     supplierName: '',
//     gstNumber: '',
//     grossAmount: '',
//     status: 'Pending',
//     billFile: null
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

//     if (!formData.employeeName.trim()) {
//       newErrors.employeeName = 'Employee Name is required';
//     }
//     if (!formData.billNumber.trim()) {
//       newErrors.billNumber = 'Bill Number is required';
//     }
//     if (!formData.billDate) {
//       newErrors.billDate = 'Bill Date is required';
//     } else {
//       const today = new Date();
//       const selectedDate = new Date(formData.billDate);
//       if (selectedDate > today) {
//         newErrors.billDate = 'Bill Date cannot be in the future';
//       }
//     }
//     if (!formData.supplierName.trim()) {
//       newErrors.supplierName = 'Supplier Name is required';
//     }
//     if (!formData.gstNumber.trim()) {
//       newErrors.gstNumber = 'GST Number is required';
//     } else if (!gstRegex.test(formData.gstNumber)) {
//       newErrors.gstNumber = 'Invalid GST Number format';
//     }
//     if (!formData.grossAmount) {
//       newErrors.grossAmount = 'Gross Amount is required';
//     } else if (parseFloat(formData.grossAmount) <= 0) {
//       newErrors.grossAmount = 'Gross Amount must be a positive number';
//     }
//     if (!formData.billFile) {
//       newErrors.billFile = 'Bill File is required';
//     } else {
//       const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
//       if (!validTypes.includes(formData.billFile.type)) {
//         newErrors.billFile = 'Only JPEG, PNG, or PDF files are allowed';
//       } else if (formData.billFile.size > 2 * 1024 * 1024) {
//         newErrors.billFile = 'File size must be less than 2MB';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({
//       ...prev,
//       billFile: file || null,
//     }));
//     setErrors((prev) => ({ ...prev, billFile: '' }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!employeeId || !schoolId) {
//       toast.error('Missing employee or school information');
//       return;
//     }

//     if (!validateForm()) {
//       toast.error('Please correct the errors in the form');
//       return;
//     }

//     setSending(true);
//     try {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (key === 'billFile' && formData[key]) {
//           formDataToSend.append(key, formData[key]);
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
//       formDataToSend.append('schoolId', schoolId);
//       formDataToSend.append('academicYear', academicYear);

//       const response = await postAPI(
//         `/create-internet-allowance/${employeeId}`,
//         formDataToSend,
//         { 'Content-Type': 'multipart/form-data' },
//         true
//       );

//       toast.success(response.message || 'Internet Allowance record added successfully');
//     } catch (err) {
//       toast.error(err.message || 'Failed to add Internet Allowance record');
//     } finally {
//       setSending(false);
//     }
//   };

//   const getFileName = () => {
//     if (formData.billFile instanceof File) {
//       return formData.billFile.name.length > 25
//         ? formData.billFile.name.slice(0, 25) + '...'
//         : formData.billFile.name;
//     }
//     return 'No file selected';
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
//                     Internet Allowance Form
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
//                       {errors.employeeName && (
//                         <small className="text-danger">{errors.employeeName}</small>
//                       )}
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
//                       {errors.billNumber && (
//                         <small className="text-danger">{errors.billNumber}</small>
//                       )}
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
//                         max={new Date().toISOString().split('T')[0]}
//                       />
//                       {errors.billDate && (
//                         <small className="text-danger">{errors.billDate}</small>
//                       )}
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="supplierName" className="form-label">
//                         Supplier Name <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="supplierName"
//                         name="supplierName"
//                         className="form-control"
//                         value={formData.supplierName}
//                         onChange={handleInputChange}
//                         required
//                         placeholder="Enter Supplier Name"
//                       />
//                       {errors.supplierName && (
//                         <small className="text-danger">{errors.supplierName}</small>
//                       )}
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
//                         placeholder="Enter GST Number (e.g., 22AAAAA0000A1Z5)"
//                       />
//                       {errors.gstNumber && (
//                         <small className="text-danger">{errors.gstNumber}</small>
//                       )}
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
//                         min="0"
//                         step="0.01"
//                       />
//                       {errors.grossAmount && (
//                         <small className="text-danger">{errors.grossAmount}</small>
//                       )}
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
//                       {formData.billFile && (
//                         <small className="text-muted mt-1 d-block">
//                           Selected: {getFileName()}
//                         </small>
//                       )}
//                       {errors.billFile && (
//                         <small className="text-danger">{errors.billFile}</small>
//                       )}
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="mb-3">
//                       <label htmlFor="academicYear" className="form-label">
//                         Academic Year <span className="text-danger">*</span>
//                       </label>
//                       <select
//                         id="academicYear"
//                         name="academicYear"
//                         className="form-control"
//                         value={academicYear}
//                         onChange={(e) => setAcademicYear(e.target.value)}
//                         required
//                       >
//                         <option value="2025-26">2025-26</option>
//                         <option value="2026-27">2026-27</option>
//                         <option value="2027-28">2027-28</option>
//                         <option value="2028-29">2028-29</option>
//                         <option value="2029-30">2029-30</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-end">
//                   <button
//                     type="submit"
//                     className="btn btn-primary custom-submit-button"
//                     disabled={sending }
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

// export default AddInternetAllowanceDetails;

import React, { useState , useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import postAPI from '../../../../../api/postAPI';
import getAPI from '../../../../../api/getAPI';
const AddInternetAllowanceDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sending, setSending] = useState(false);
  const { employeeId, schoolId, academicYear: initialAcademicYear } = location.state || {};
  const [academicYear, setAcademicYear] = useState(initialAcademicYear || '2025-26');
  const [categoryLimit, setCategoryLimit] = useState(0)
  const [formData, setFormData] = useState({
    employeeName: '',
    billNumber: '',
    billDate: '',
    supplierName: '',
    gstNumber: '',
    grossAmount: '',
    status: 'Pending',
    billFile: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
          feachEmployeeCtc();   
      }, [navigate]);

    const feachEmployeeCtc = async () => {
  try {
    const response = await getAPI(`/get-employee-ctc-details/${schoolId}/${employeeId}/${academicYear}`);
    console.log("ctc get lta", response);

    if (!response.hasError && response.data?.data) {
      const components = response.data.data.components;
      const ltaComponent = components.find(c => c.ctcComponentName === 'Internet Allowance');

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
    if (!formData.supplierName.trim()) {
      newErrors.supplierName = 'Supplier Name is required';
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
        `/create-internet-allowance/${employeeId}`,
        formDataToSend,
        { 'Content-Type': 'multipart/form-data' },
        true
      );

      toast.success(response.message || 'Internet Allowance record added successfully');
      setFormData({
        employeeName: '',
        billNumber: '',
        billDate: '',
        supplierName: '',
        gstNumber: '',
        grossAmount: '',
        status: 'Pending',
        billFile: null,
      });
      setErrors({});
      navigate('/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/internet-allowance-details');
    } catch (err) {
      toast.error(err.message || 'Failed to add Internet Allowance record');
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
                    Internet Allowance Form
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
                      <label htmlFor="supplierName" className="form-label">
                        Supplier Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="supplierName"
                        name="supplierName"
                        className="form-control"
                        value={formData.supplierName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Supplier Name"
                      />
                      {errors.supplierName && (
                        <small className="text-danger">{errors.supplierName}</small>
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
export default AddInternetAllowanceDetails;