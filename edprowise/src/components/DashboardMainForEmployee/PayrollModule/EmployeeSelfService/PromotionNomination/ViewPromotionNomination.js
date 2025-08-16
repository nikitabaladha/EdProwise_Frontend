import React from 'react'
import { useNavigate } from 'react-router-dom';
const ViewPromotionNomination = () => {
    const navigate = useNavigate();
  return (
<div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex  align-items-center">
                                    <h4 className="payroll-title text-center mb-0 flex-grow-1">Promotion Details</h4>
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
                                        type="button"
                                        onClick={() => navigate(-1)}
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
        </div >
  )
}

export default ViewPromotionNomination