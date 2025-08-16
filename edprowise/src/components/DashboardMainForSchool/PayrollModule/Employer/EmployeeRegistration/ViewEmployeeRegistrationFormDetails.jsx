import React,{ useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const ViewEmployeeRegistrationFormDetails = () => {
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
      securityDepositAmount: '',
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
            securityDepositAmount: employee.securityDepositAmount || '',
            joiningDate: employee.joiningDate ? employee.joiningDate.slice(0, 10) : '',
            dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.slice(0, 10) : '',
          });
        }
      }, [employee]);

  if (!employee) {
    return <div className="container mt-4">No employee data provided.</div>;
  }
  const handleBack = () => {
    navigate(-1);
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
                    Registration Details
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
              <form onSubmit="">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="name" className="form-label">
                        Name of Teacher (As per Aadhar)
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.employeeName || ''}
                        
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="emailId"
                        className="form-label"
                      >
                        Email ID
                      </label>
                      <input
                        type="email"
                        id="emailId"
                        name="emailId"
                        className="form-control"
                        value={formData.emailId || ''}
                        
                      />
                    </div>
                  </div>


                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        className="form-control"
                        value={formData.contactNumber || ''}
                        
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dateOfBirth" className="form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className="form-control"
                        value={formData.dateOfBirth }
                        
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">
                        Gender
                      </label>
                      <input
                        type="text"
                        id="gender"
                        name="gender"
                        className="form-control"
                        value={formData.gender || ''}
                        
                      />
                    </div>
                  </div>



                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="categoryOfEmployees"
                        className="form-label"
                      >
                        Category of Employees
                      </label>

                      <input
                        type="text"
                        id="categoryOfEmployees"
                        name="categoryOfEmployees"
                        className="form-control"
                        value={formData.categoryOfEmployees || ''}
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">
                        Grade
                      </label>
                      <input
                        type="text"
                        id="grade"
                        name="grade"
                        className="form-control"
                        value={formData.grade || ''}
                        
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="jobDesignation" className="form-label">
                        Job Designation
                      </label>
                      <input
                        type="text"
                        id="jobDesignation"
                        name="jobDesignation"
                        className="form-control"
                        value={formData.jobDesignation || ''}
                        
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className='mb-3'>
                    <label htmlFor="securityDepositAmount" className="form-label">Security Deposit <span className="text-danger">*</span></label>
                    <input type="number" name="securityDepositAmount" className="form-control" value={formData.securityDepositAmount}  min="0" />
                  </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="joiningDate" className="form-label">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        id="joiningDate"
                        name="joiningDate"
                        className="form-control"
                        value={formData.joiningDate}
                        
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="text-end">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn-primary custom-submit-button"
                  >
                    Back
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewEmployeeRegistrationFormDetails