import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaDownload, } from 'react-icons/fa';

const ViewJournal = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">Journal Voucher</h4>
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
                                    <div className="col-md-4">
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
                                                <th className="text-center w-30 align-content-center border border-dark text-nowrap p-2" >
                                                    Ledger
                                                </th>
                                                <th className="text-center w-30 align-content-center border border-dark text-nowrap p-2" >
                                                    Description
                                                </th>
                                                <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                                                    Dr.
                                                </th>
                                                <th className="text-center w-20 align-content-center border border-dark text-nowrap p-2" >
                                                    Cr.
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           
                                                <tr  className='payroll-table-body' >
                                                    <td className="text-start align-content-center border border-dark p-2" >

                                                        
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
                                                <td colSpan={2} className="text-start align-content-center fw-bold border border-dark p-2" >
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
                                                        Less : TDS
                                                    </div>
                                                    
                                                </td>

                                                <td className="text-start align-content-center border border-dark p-2" >
                                                    {/* <div className='col-md-7 ms-2'> */}
                                                    
                                                    {/* </div> */}
                                                </td>

                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    
                                                </td>

                                            </tr>

                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark p-2 text-nowrap" >
                                                    Add/(Less) : Adjustment
                                                </td>
                                                <td className="text-start align-content-center border border-dark p-2 text-nowrap" >
                                                    
                                                </td>

                                                <td className="text-end align-content-center border border-dark p-2" >
                                                   
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    
                                                </td>

                                            </tr>

                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                <td colSpan={2} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                    Total
                                                </td>
                                                <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                    
                                                </td>
                                                <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                    
                                                </td>

                                            </tr>
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                <td colSpan={3} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                    Difference
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
                                                Journal Voucher Number <span className="text-danger">*</span>
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
                                                <th className="text-center align-content-center border border-dark  p-2" style={{ width: "150px" }}>
                                                    Debit
                                                </th>

                                                <th className="text-center align-content-center border border-dark  p-2" style={{ width: "150px" }}>
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
                                        Copy of Bill
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

export default ViewJournal