import React from 'react'
import { useNavigate } from 'react-router-dom'


const CreateHeadOfLedger = () => {
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
                                        Head of Ledger Form
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
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="leaveFor"
                                                className="form-label"
                                            >
                                                Name of Head of Ledger <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                required
                                                placeholder='Enter Name of Head of Ledger'
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

export default CreateHeadOfLedger