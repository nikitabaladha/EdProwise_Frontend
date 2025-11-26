import React from 'react'
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const ViewInvoiceApprovalDetails = () => {
  const navigate = useNavigate();
      return (
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card m-2">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header mb-2 d-flex flex-wrap align-items-center">
                      <h4 className="card-title flex-grow-1 text-center">
                        View Invoice Details
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
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="studentName" className="form-label">
                            Vendor Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            value="Seller AD"
                            className="form-control"
                            required
                            placeholder="Enter Student Name"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="className" className="form-label">
                            GSTIN <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="className"
                            name="className"
                            value="22ABCD1234PZ5"
                            className="form-control"
                            required
                            placeholder="Enter Class"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="className" className="form-label">
                            Seller ID <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="className"
                            name="className"
                            value="011-3545885"
                            className="form-control"
                            required
                            placeholder="Enter Class"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="age" className="form-label">
                            Invoice ID <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="section"
                            name="section"
                            value="INV#2025/042"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="age" className="form-label">
                            Purpose <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="section"
                            name="section"
                            value="Library Book"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="age" className="form-label">
                            Invoice Date<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="section"
                            name="section"
                            value="04-07-2025"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="age" className="form-label">
                            Total Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="section"
                            name="section"
                            value="32,500"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="age" className="form-label">
                            Due Date <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="section"
                            name="section"
                            value="10-07-2025"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="age" className="form-label">
                            Payment Mode <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="section"
                            name="section"
                            value="Bank Transfer"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card-header mb-2">
                      <h4 className="card-title text-center custom-heading-font">
                        Documents
                      </h4>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="studentName" className="form-label">
                            Invoice File <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            id="studentName"
                            name="studentName"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="className" className="form-label">
                            PO Reference <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            id="className"
                            name="className"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="section" className="form-label">
                            Dalivery Receipt{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            id="section"
                            name="section"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-end">
                      {/* <Link className="btn btn-soft-primary btn-sm">
                        <FaCheck className="align-middle fs-18" />
                      </Link>
                      <Link className="btn btn-soft-danger btn-sm">
                        <RxCross1 className="align-middle fs-18" />
                      </Link> */}
                      <button
                        type="button"
                        className="btn btn-primary custom-submit-button me-2"
                      >
                        <FaCheck className="align-middle fs-18" />
                        {/* Approve */}
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger custom-submit-button"
                      >
                        <RxCross1 className="align-middle fs-18" />
                        {/* Reject */}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ViewInvoiceApprovalDetails