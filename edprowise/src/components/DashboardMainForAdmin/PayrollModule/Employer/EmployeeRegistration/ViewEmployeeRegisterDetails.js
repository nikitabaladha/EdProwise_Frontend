import React from 'react'
import { useNavigate } from 'react-router-dom';

const ViewEmployeeRegisterDetails = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };
  return (
    <div className="container">
    <div className="row">
      <div className="col-xl-12">
        <div className="card m-2">
          <div className="card-body">
            <div className="container">
              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                View  Registration Details
                </h4>
              </div>
            </div>
            <form onSubmit="">
              <div className="row mb-3">
                <div className="col-md-12">
                  <div className="mb-6">
                    <label htmlFor="name" className="form-label">
                      Name Of Teacher (As Per Aadhar)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={"Umesh Jadhav"}
                      required
                     placeholder='Name'
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">
                   Contact No
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      className="form-control"
                      value={"1234567890"}
                      required
                     placeholder='Example : 1234567890'
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
                      value={"xyz@gmail.com"}
                      required
                      placeholder='Example : xyz@gmail.com'
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="categoryOfEmployees"
                      className="form-label"
                    >
                     Category OF Employees
                    </label>

                    <input
                      type="text"
                      id="categoryOfEmployees"
                      name="categoryOfEmployees"
                      className="form-control"
                      value={"Teaching Staff"}
                      required
                      placeholder='grade'
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
                      value={"A"}
                      required
                      placeholder='grade'
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="jobDesignation" className="form-label">
                    Job Designation
                    </label>
                    <input
                      type="text"
                      id="jobDesignation"
                      name="jobDesignation"
                      className="form-control"
                      value={"Teacher"}
                      required
                      placeholder='job Designation'
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="joiningDate" className="form-label">
                   Joining Date
                    </label>
                    <input
                      type="date"
                      id="joiningDate"
                      name="joiningDate"
                      className="form-control"
                      // value={formData.joiningDate}
                      required
                      placeholder='joiningDate'
                    />
                  </div>
                </div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-primary custom-submit-button"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ViewEmployeeRegisterDetails