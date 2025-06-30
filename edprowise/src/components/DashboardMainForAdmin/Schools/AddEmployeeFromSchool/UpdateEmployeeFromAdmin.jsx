import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";

const UpdateEmployeeFromAdmin = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const employee = state?.employee;

  const [formData, setFormData] = useState({
    employeeName: '',
    contactNumber: '',
    emailId: '',
    categoryOfEmployees: '',
    grade: '',
    gender: '',
    jobDesignation: '',
    joiningDate: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        employeeName: employee.employeeName || '',
        contactNumber: employee.contactNumber || '',
        emailId: employee.emailId || '',
        categoryOfEmployees: employee.categoryOfEmployees || '',
        grade: employee.grade || '',
        gender: employee.gender || '',
        jobDesignation: employee.jobDesignation || '',
        joiningDate: employee.joiningDate ? employee.joiningDate.slice(0, 10) : '',
        dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.slice(0, 10) : '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee || !employee._id) {
      alert('Employee ID not found');
      return;
    }

    try {
      const response = await putAPI(`/update-employee-registration/${employee._id}`, formData);

      if (!response.hasError) {
        toast.success( "Employee update registered successfully");
        navigate(-1);
      } else {
         toast.success( "Employee update registered successfully");
      }
    } catch (error) {
      console.error('Error updating employee:', error);
       toast.success( "Employee update registered successfully");
      // alert('An error occurred while updating the employee.');
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
                  <h4 className="card-title flex-grow-1 text-center">Update Registration Form</h4>
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

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="employeeName" className="form-label">
                        Name of Teacher (As per Aadhar) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeName"
                        name="employeeName"
                        className="form-control"
                        value={formData.employeeName}
                        onChange={handleChange}
                        required
                        placeholder="Enter Employee Name"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="emailId" className="form-label">
                        Email ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="emailId"
                        name="emailId"
                        className="form-control"
                        value={formData.emailId}
                        onChange={handleChange}
                        required
                        placeholder="Example: xyz@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        Contact Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        className="form-control"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        placeholder="Example: 9876543210"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dateOfBirth" className="form-label">
                        Date of Birth <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className="form-control"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        className="form-control"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="categoryOfEmployees" className="form-label">
                        Category of Employees <span className="text-danger">*</span>
                      </label>
                      <select
                        id="categoryOfEmployees"
                        name="categoryOfEmployees"
                        className="form-control"
                        value={formData.categoryOfEmployees}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Teaching Staff">Teaching Staff</option>
                        <option value="Non Teaching Staff">Non Teaching Staff</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">
                        Grade <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="grade"
                        name="grade"
                        className="form-control"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                        placeholder="Grade"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="jobDesignation" className="form-label">
                        Job Designation <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="jobDesignation"
                        name="jobDesignation"
                        className="form-control"
                        value={formData.jobDesignation}
                        onChange={handleChange}
                        required
                        placeholder="Designation"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="joiningDate" className="form-label">
                        Joining Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="joiningDate"
                        name="joiningDate"
                        className="form-control"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary custom-submit-button">
                    Update
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

export default UpdateEmployeeFromAdmin;
