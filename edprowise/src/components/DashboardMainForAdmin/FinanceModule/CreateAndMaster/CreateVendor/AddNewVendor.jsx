import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddNewVendor = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                                        Vendor Form
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
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Basic Information
                                    </h4>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="leaveFor"
                                                className="form-label"
                                            >
                                                Name of Vendor <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                required
                                                placeholder='Enter Vendor Name'
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="leaveFor"
                                                className="form-label"
                                            >
                                                Email ID <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                required
                                                placeholder='Enter Vendor Name'
                                            />
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="leaveStartDate" className="form-label">
                                                Contact Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="leaveStartDate"
                                                name="leaveStartDate"
                                                className="form-control"
                                                // value={formData.leaveStartDate}
                                                required
                                                placeholder='Enter Contact Number '
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="leaveEndDate" className="form-label">
                                                PAN Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="leaveEndDate"
                                                name="leaveEndDate"
                                                className="form-control"
                                                // value={formData.leaveEndDate}
                                                required
                                                placeholder='Enter PAN Number'
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="numberOfDayOnLeave" className="form-label">
                                                GST Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="numberOfDayOnLeave"
                                                name="numberOfDayOnLeave"
                                                className="form-control"
                                                required
                                                placeholder='Enter GST Number'
                                            />
                                        </div>
                                    </div>
                                </div>
                                 <div className="row">
                                    <div className='col-md-8'>
                                    <div className="mb-3 ">
                                        <label htmlFor="currentAddress" className="form-label">
                                            Address <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="currentAddress"
                                            name="currentAddress"
                                            rows={1}
                                            //   value={formData.currentAddress}
                                            //   onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="numberOfDayOnLeave" className="form-label">
                                                State <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="numberOfDayOnLeave"
                                                name="numberOfDayOnLeave"
                                                className="form-control"
                                                required
                                                placeholder='Enter State'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Bank Account Information
                                    </h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="nameOfAccountholder" className="form-label">
                                                Name of Accountholder <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="nameOfAccountholder"
                                                name="nameOfAccountholder"
                                                className="form-control"
                                                // value={formData.nameOfAccountholder}
                                                // onChange={handleChange}
                                                required
                                                placeholder='Enter Name of Accountholder'
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="nameOfBank" className="form-label">
                                                Name of Bank <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="nameOfBank"
                                                name="nameOfBank"
                                                className="form-control"
                                                // value={formData.nameOfBank}
                                                // onChange={handleChange}
                                                required
                                                placeholder='Enter Bank Name'
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="IFSCCode" className="form-label">
                                                IFSC Code <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="IFSCCode"
                                                name="IFSCCode"
                                                className="form-control"
                                                // value={formData.IFSCCode}
                                                // onChange={handleChange}
                                                required
                                                placeholder='Enter IFSC Code'
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="accountNumber" className="form-label">
                                                Account Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="accountNumber"
                                                name="accountNumber"
                                                className="form-control"
                                                // value={formData.accountNumber}
                                                // onChange={handleChange}
                                                required
                                                placeholder='Enter Account Number'
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="accountType" className="form-label">
                                                Account Type <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="accountType"
                                                name="accountType"
                                                className="form-control"
                                                // value={formData.accountType}
                                                // onChange={handleChange}
                                                required
                                                placeholder='Enter Account Type'
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
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddNewVendor