import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { FaDownload, } from 'react-icons/fa';

const ViewReceipts = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">Receipt Voucher</h4>
                                    <button
                                        type="button "
                                        className="btn btn-primary mx-2 custom-submit-button"
                                        onClick={() => { navigate(-1) }}
                                    >
                                        Back
                                    </button>
                                    <button className="btn btn-sm btn-outline-info me-1">
                                        <FaDownload />
                                    </button>
                                </div>
                            </div>
                            <form onSubmit="">
                                <div className="row mt-3">
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label htmlFor="leaveEndDate" className="form-label">
                                                Receipt Date<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="leaveEndDate"
                                                name="leaveEndDate"
                                                className="form-control"
                                                // value={formData.leaveEndDate}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label htmlFor="leaveEndDate" className="form-label">
                                                Entry Date<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="leaveEndDate"
                                                name="leaveEndDate"
                                                className="form-control"
                                                // value={formData.leaveEndDate}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive pb-4">
                                    <table className="table text-dark border border-dark mb-1">
                                        <thead>
                                            <tr className='payroll-table-header' >
                                                <th className="text-center w-35 align-content-center border border-dark text-nowrap p-2" >
                                                    Item Details
                                                </th>
                                                <th className="text-center w-40 align-content-center border border-dark text-nowrap p-2" >
                                                    Ledger
                                                </th>
                                                <th className="text-center w-25 align-content-center border border-dark text-nowrap p-2" >
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark p-2" >

                                                </td>
                                                <td className="text-start align-content-center border border-dark p-2" >
                                                    Receipt
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2" >

                                                </td>

                                            </tr>

                                            <tr className='payroll-table-body' >
                                                <td colSpan={2} className="text-start fw-bold align-content-center border border-dark p-2" >
                                                    Sub Total
                                                </td>
                                                <td className="text-end align-content-center fw-bold border border-dark p-2" >

                                                </td>
                                            </tr>

                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark p-2" >
                                                    Less : TDS
                                                </td>
                                                <td className="text-start align-content-center border border-dark p-2" >

                                                </td>
                                                <td className="text-start align-content-center border border-dark p-2" >

                                                </td>
                                            </tr>

                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark p-2" >
                                                    Add/(Less): Adjustment
                                                </td>
                                                <td className="text-start align-content-center border border-dark p-2" >
                                                    Amount
                                                </td>
                                                <td className="text-start align-content-center border border-dark p-2" >

                                                </td>

                                            </tr>

                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                <td colSpan={2} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                    Total
                                                </td>
                                                <td className="text-end align-content-center fw-bold border border-dark p-2" >

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="vendorCode" className="form-label">
                                                Narration <span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="currentAddress"
                                                name="currentAddress"
                                                rows={3}
                                                // value="Near bus stop, Nashik"
                                                //   onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="vendorCode" className="form-label">
                                                Payment Mode <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="leaveFor"
                                                name="leaveFor"
                                                className="form-control"
                                                required

                                            >
                                                <option value="">Select Payment Mode</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Online">Online</option>
                                                <option value="Cheque">Online</option>
                                            </select>
                                        </div>
                                    </div>

                                   
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="vendorCode" className="form-label">
                                                Cheque No./Transaction No. <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="vendorCode"
                                                name="vendorCode"
                                                className="form-control"
                                                required
                                                placeholder='Enter Cheque/Transaction Number'
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="vendorCode" className="form-label">
                                                Receipt Voucher Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="vendorCode"
                                                name="vendorCode"
                                                className="form-control"
                                                required
                                                placeholder='Enter Payment Voucher Number'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='text-end my-3'>
                                    <strong style={{ fontSize: "20px" }}>Authorized Signature</strong>
                                </div>

                                <div className="row border border-dark" />
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Entry
                                    </h4>
                                </div>

                                <div className="table-responsive pb-4 px-lg-7">
                                    <table className="table text-dark border border-dark mb-1">
                                        <thead>
                                            <tr className='payroll-table-header' >

                                                <th className="text-center  align-content-center border border-dark text-nowrap p-2" style={{ width: "150px" }}>
                                                    Ledger
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{ width: "100px" }}>
                                                    Debit
                                                </th>

                                                <th className="text-center align-content-center border border-dark  p-2" style={{ width: "100px" }}>
                                                    Credit
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark p-2">
                                                    Payment
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">

                                                </td>
                                            </tr>

                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                <td className="text-start align-content-center fw-bold border border-dark p-2" >
                                                    Total
                                                </td>
                                                <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                    00
                                                </td>

                                                <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                    00
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                                <div className="row border border-dark" />
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                      Copy of  Bill
                                    </h4>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ViewReceipts