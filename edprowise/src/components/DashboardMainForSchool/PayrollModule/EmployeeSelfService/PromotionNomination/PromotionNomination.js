import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PromotionNomination = () => {

  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const handleProceed = () => {
    setShowForm(prev => !prev);
  };

  const navigateToViewInfo = (event, employee) => {
    event.preventDefault();
    navigate(`/admin-dashboard/payroll-module/employee-services/promotion-nomination/view-promotion-nomination`, {
      //   state: { employee },
    });
  };

  const navigateToUpdateInfo = (event, employee) => {
    event.preventDefault();
    navigate(`/admin-dashboard/payroll-module/employee-services/promotion-nomination/update-promotion-nomination`, {
      //   state: { employee },
    });
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex  align-items-center">
                  <h4 className="payroll-title text-center mb-0 flex-grow-1">Promotion Nomination</h4>
                  <div>
                    <select id="yearSelect" className="custom-select fw-bold" aria-label="Select Year">
                      <option selected>2025-26</option>
                      <option>2026-27</option>
                      <option>2027-28</option>
                      <option>2028-29</option>
                      <option>2029-30</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="table-responsive pb-4">
                <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
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
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Financial Year</th>
                      <th>Tenure</th>
                      <th>Apply Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='payroll-table-body'>
                      <td>
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={"customCheck"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={"customCheck"}
                          >
                            &nbsp;
                          </label>
                        </div>
                      </td>
                      <td> EMP-001</td>
                      <td>Umesh Jadhav</td>
                      <td>
                        2025-26
                      </td>

                      <td>
                        2 Year
                      </td>

                      <td>
                        26-05-2026
                      </td>

                      <td>
                        Approved
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link className="btn btn-light btn-sm"
                            onClick={(event) => navigateToViewInfo(event)}
                          >
                            <iconify-icon
                              icon="solar:eye-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                          <Link className="btn btn-soft-primary btn-sm"
                            onClick={(event) => navigateToUpdateInfo(event)}
                          >
                            <iconify-icon
                              icon="solar:pen-2-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                          <Link className="btn btn-soft-danger btn-sm">
                            <iconify-icon
                              icon="solar:trash-bin-minimalistic-2-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                          <Link className="btn btn-soft-success fw-bold btn-sm"
                            onClick={handleProceed}
                          >
                            Apply
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* onClick={handleProceed} */}
              {/* <div className="row my-3">
                <div className={`${showForm ? 'd-none' : ''}`} style={{ textAlign: "end" }}>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={handleProceed}
                  >
                    Apply for Promotion
                  </button>
                </div>
              </div> */}
              {showForm && (
                <>
                  <div className="container ps-0">
                    <div className="card-header px-0 mb-1">
                      <h4 className="text-center mb-0 payroll-title">
                        Apply for Promotion
                      </h4>
                    </div>
                  </div>
                  <form onSubmit="">
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="leaveFor"
                            className="form-label"
                          >
                            Reason for Promotion Request <span className="text-danger">*</span> <span className='fs-6'> (Please describe why you believe you are ready for this promotion)</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder='Write Reason for Promotion'
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="leaveReason" className="form-label">
                            Key Contributions to the School <span className="text-danger">*</span> <span className='fs-6'> (Mention your achievements in teaching, student mentorship, administrative tasks, or extracurricular activities)</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder='Write Key Contributions to the School'
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Professional Development & Training <span className="text-danger">*</span> <span className='fs-6'> (List trainings, workshops, certifications, or courses completed)</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            // value={formData.leaveStartDate}
                            required
                            placeholder='Write Professional Development & Training'
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Goals & Objectives <span className="text-danger">*</span> <span className='fs-6'> (What goals do you plan to achieve in the new role?)</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            // value={formData.leaveStartDate}
                            required
                            placeholder='Write Goals & Objectives'
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Challenges Faced & How You Overcame Them <span className="text-danger">*</span> <span className='fs-6'> (Describe any significant challenges in your current role and your approach to resolving them.)</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            // value={formData.leaveStartDate}
                            required
                            placeholder='Write Challenges Faced & How You Overcame Them'
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Contributions to School Culture & Community<span className="text-danger">*</span>  <span className='fs-6'> (Have you participated in extracurricular activities, committees, or school events? Please elaborate.)</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            // value={formData.leaveStartDate}
                            required
                            placeholder='Write Contributions to School Culture & Community'
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            How do you handle conflict resolution among students or colleagues?<span className="text-danger">*</span>  <span className='fs-6'> ((Describe a recent example if possible.))</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            // value={formData.leaveStartDate}
                            required
                            placeholder='Write Answer'
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            What strategies do you use to motivate and engage students or team members?<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder='Write Answer '
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            How do you stay updated with the latest developments in education or your field? <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder='Write Answer'
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            What are your long-term career goals within the school? <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder='Write your long-term career goals within the school'
                          />
                        </div>
                      </div>

                    </div>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default PromotionNomination