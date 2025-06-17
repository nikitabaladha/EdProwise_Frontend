import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaDownload, } from 'react-icons/fa';

const ViewContra = () => {
    const navigate = useNavigate();
    const [selectedEntry, setSelectedEntry] = useState("Cash Deposited"); // State to track the selected entry type


    const handleEntryChange = (e) => {
        setSelectedEntry(e.target.value);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">Contra Entry</h4>
                                    <button
                                        type="button "
                                        className="btn btn-primary ms-2 custom-submit-button"
                                        onClick={() => { navigate(-1) }}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                            <form onSubmit="">
                                <div className="row mt-3">
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label htmlFor="leaveEndDate" className="form-label">
                                                Date of Cash Deposited/Withdrawl<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="leaveEndDate"
                                                name="leaveEndDate"
                                                className="form-control"
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
                                                type="date"
                                                id="leaveEndDate"
                                                name="leaveEndDate"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label htmlFor="selectEntry" className="form-label">
                                                Select Entry<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                name="selectEntry"
                                                className="form-control"
                                                required
                                                value={selectedEntry}
                                                onChange={handleEntryChange}
                                            >
                                                <option value="">Select</option>
                                                <option value="Cash Deposited">Cash Deposited</option>
                                                <option value="Cash Withdrawn">Cash Withdrawn</option>
                                                <option value="Bank Transfer">Bank Transfer</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Conditional rendering based on selectedEntry */}
                                {selectedEntry === "Cash Deposited" && (
                                    <>
                                        <div className="table-responsive pb-4">
                                            <table className="table text-dark border border-dark mb-1">
                                                <thead>
                                                    <tr className='payroll-table-header' >
                                                        <th className="text-center w-30 align-content-center border border-dark text-nowrap p-2" >
                                                            Cash Deposited
                                                        </th>
                                                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                                                            Bank Name
                                                        </th>
                                                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                                                            Account Number
                                                        </th>
                                                        <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                            Debit
                                                        </th>
                                                        <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                            Credit
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>


                                                    <tr className='payroll-table-body' >
                                                        <td className="text-start align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >
                                                            00
                                                        </td>

                                                    </tr>

                                                    <tr className='payroll-table-body' >
                                                        <td className="text-start align-content-center border border-dark p-2" >
                                                            Cash Account
                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >
                                                            
                                                        </td>

                                                    </tr>

                                                    <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                        <td colSpan={3} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                            Total
                                                        </td>
                                                        <td className="text-end align-content-center fw-bold border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                            00
                                                        </td>
                                                    </tr>
                                                    <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                        <td colSpan={4} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                            Difference
                                                        </td>

                                                        <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                            00
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
                                                        required
                                                    />
                                                </div>
                                            </div>


                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="vendorCode" className="form-label">
                                                        Contra Voucher Number <span className="text-danger">*</span>
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
                                        <div className="text-end">
                                            <button
                                                type="submit"
                                                className="btn btn-primary custom-submit-button"
                                            >
                                                Save & Published
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary mx-2 custom-submit-button"
                                            >
                                                Draft
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-danger custom-submit-button"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                )}

                                {selectedEntry === "Cash Withdrawn" && (
                                    <>
                                        <div className="table-responsive pb-4">
                                            <table className="table text-dark border border-dark mb-1">
                                                <thead>
                                                    <tr className='payroll-table-header' >
                                                        <th className="text-center w-30 align-content-center border border-dark text-nowrap p-2" >
                                                            Cash Withdrawn
                                                        </th>
                                                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                                                            Bank Name
                                                        </th>
                                                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                                                            Account Number
                                                        </th>
                                                        <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                            Debit
                                                        </th>
                                                        <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                            Credit
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr className='payroll-table-body' >
                                                        <td className="text-start align-content-center border border-dark p-2" >
                                                            Cash Account
                                                        </td>
                                                        <td className="text-start align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-start align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>

                                                    </tr>
                                                    <tr className='payroll-table-body' >
                                                        <td className="text-start align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-start align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-start align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >
                                                            00
                                                        </td>

                                                    </tr>


                                                    <tr className='payroll-table-body' >
                                                        <td colSpan={3} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                            Sub Total
                                                        </td>

                                                        <td className="text-end align-content-center border border-dark p-2" >
                                                            
                                                        </td>

                                                        <td className="text-end align-content-center border border-dark p-2" >
                                                           
                                                        </td>
                                                    </tr>

                                                    <tr className='payroll-table-body' >
                                                        <td className="text-start align-content-center d-flex border border p-2 text-nowrap" >
                                                            <div className='align-content-center'>
                                                                Less :
                                                            </div>
                                                            <div className='col-md-7 ms-2'>

                                                            </div>
                                                        </td>

                                                        <td className="text-start align-content-center border border-dark p-2" >
                                                           
                                                        </td>

                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                    </tr>

                                                    <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                        <td colSpan={3} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                            Total
                                                        </td>
                                                        <td className="text-end align-content-center fw-bold border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                            00
                                                        </td>
                                                    </tr>
                                                    <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                        <td colSpan={4} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                            Difference
                                                        </td>

                                                        <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                            00
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
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="vendorCode" className="form-label">
                                                        Cheque Upload <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="vendorCode"
                                                        name="vendorCode"
                                                        className="form-control"
                                                        required
                                                        placeholder='Enter Cheque Upload'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="vendorCode" className="form-label">
                                                        Cheque Number <span className="text-danger">*</span>
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
                                                        Contra Voucher Number <span className="text-danger">*</span>
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
                                        <div className="text-end">
                                            <button
                                                type="submit"
                                                className="btn btn-primary custom-submit-button"
                                            >
                                                Save & Published
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary mx-2 custom-submit-button"
                                            >
                                                Draft
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-danger custom-submit-button"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                )}

                                {selectedEntry === "Bank Transfer" && (
                                    <>
                                        <div className="table-responsive pb-4">
                                            <table className="table text-dark border border-dark mb-1">
                                                <thead>
                                                    <tr className='payroll-table-header' >
                                                        <th className="text-center w-30 align-content-center border border-dark text-nowrap p-2" >
                                                            Bank Transfer
                                                        </th>
                                                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                                                            Bank Name
                                                        </th>
                                                        <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                                                            Account Number
                                                        </th>
                                                        <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                            Debit
                                                        </th>
                                                        <th className="text-center align-content-center border border-dark text-nowrap p-2"  >
                                                            Credit
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr className='payroll-table-body' >
                                                        <td className="text-start align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-start align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center border border-dark p-2" >

                                                        </td>

                                                    </tr>

                                                    <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                        <td colSpan={3} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                            Total
                                                        </td>
                                                        <td className="text-end align-content-center fw-bold border border-dark p-2" >

                                                        </td>
                                                        <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                            00
                                                        </td>
                                                    </tr>
                                                    <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                        <td colSpan={4} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                            Difference
                                                        </td>

                                                        <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                            00
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
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="vendorCode" className="form-label">
                                                        Cheque Upload <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="vendorCode"
                                                        name="vendorCode"
                                                        className="form-control"
                                                        required
                                                        placeholder='Enter Cheque Upload'
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="vendorCode" className="form-label">
                                                        Cheque Number <span className="text-danger">*</span>
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
                                                        Contra Voucher Number <span className="text-danger">*</span>
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
                                        <div className="text-end">
                                            <button
                                                type="submit"
                                                className="btn btn-primary custom-submit-button"
                                            >
                                                Save & Published
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary mx-2 custom-submit-button"
                                            >
                                                Draft
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-danger custom-submit-button"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewContra