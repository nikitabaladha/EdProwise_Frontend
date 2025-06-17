import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";

const UpdatePaymentEntry = () => {
    const navigate = useNavigate();

    const [rows, setRows] = useState([{}]);

    const addRow = () => {
        setRows([...rows, {}]);
    };

    const removeRow = (index) => {
        if (rows.length > 1) {
            const newRows = [...rows];
            newRows.splice(index, 1);
            setRows(newRows);
        }
    };

    const lessType = [
        { value: 'TDS', label: 'TDS' },
        { value: "TCS", label: 'TCS' },
        
    ];

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">Payment Entry</h4>
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
                                            <label htmlFor="vendorCode" className="form-label">
                                                Vendor Code <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="vendorCode"
                                                name="vendorCode"
                                                className="form-control"
                                                required
                                                placeholder='Enter Vendor Code'
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="mb-6">
                                            <label htmlFor="numberOfDayOnLeave" className="form-label">
                                                Vendor Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="numberOfDayOnLeave"
                                                name="numberOfDayOnLeave"
                                                className="form-control"
                                                value={"Umesh Jadhav"}
                                                required
                                                placeholder='Enter Vendor Name'
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
                                                // value={formData.leaveEndDate}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label htmlFor="leaveEndDate" className="form-label">
                                                Invoice Date<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="leaveEndDate"
                                                name="leaveEndDate"
                                                className="form-control"
                                                // value={formData.leaveEndDate}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label htmlFor="leaveStartDate" className="form-label">
                                                Invoice Number<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="leaveStartDate"
                                                name="leaveStartDate"
                                                className="form-control"
                                                value="INV-001"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label htmlFor="leaveStartDate" className="form-label">
                                                PO Number<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="leaveStartDate"
                                                name="leaveStartDate"
                                                className="form-control"
                                                value="INV-001"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label htmlFor="leaveStartDate" className="form-label">
                                                Due date<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="leaveStartDate"
                                                name="leaveStartDate"
                                                className="form-control"
                                                value="INV-001"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="mb-6">
                                            <label htmlFor="numberOfDayOnLeave" className="form-label">
                                                GSTN <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="numberOfDayOnLeave"
                                                name="numberOfDayOnLeave"
                                                className="form-control"
                                                // value={"Umesh Jadhav"}
                                                required
                                                placeholder='Enter GSTN'
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label htmlFor="vendorCode" className="form-label">
                                                PAN Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="vendorCode"
                                                name="vendorCode"
                                                className="form-control"
                                                required
                                                value="AAAAA0000A"
                                                placeholder='Enter PAN Number'
                                            />
                                        </div>
                                    </div>


                                    <div className='col-md-6'>
                                        <div className="mb-3">
                                            <label htmlFor="currentAddress" className="form-label">
                                                Address of Vendor <span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="currentAddress"
                                                name="currentAddress"
                                                rows={1}
                                                value="Near bus stop, Nashik"
                                                //   onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="mb-6">
                                            <label htmlFor="numberOfDayOnLeave" className="form-label">
                                                State <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="numberOfDayOnLeave"
                                                name="numberOfDayOnLeave"
                                                className="form-control"
                                                value={"Maharashtra"}
                                                required
                                                placeholder='Enter State'
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive pb-4">
                                    <table className="table text-dark border border-dark mb-1">
                                        <thead>
                                            <tr className='payroll-table-header' >
                                                <th className="text-center  align-content-center border border-dark text-nowrap p-2" >
                                                    Item Details
                                                </th>
                                                <th className="text-center  align-content-center border border-dark text-nowrap p-2" style={{ width: "280px" }}>
                                                    Ledger
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{ width: "150px" }}>
                                                    Amount before GST
                                                </th>

                                                <th className="text-center align-content-center border border-dark  p-2" style={{ width: "150px" }}>
                                                    GST Amount
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{ width: "150px" }}>
                                                    Amount after GST
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {rows.map((row, index) => (
                                                <tr key={index} className='payroll-table-body'>
                                                    <td className="text-start align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            // name={`amountBeforeGst-${index}`}
                                                            className="form-control payroll-table-body payroll-input-border text-start"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="text-start align-content-center border border-dark p-2">
                                                       
                                                        <CreatableSelect
                                                            isClearable
                                                            name={`ledger-${index}`}
                                                            // options={emailOptions}
                                                            placeholder="Select"
                                                            className="email-select payroll-table-body rounded payroll-input-border"
                                                        />
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            name={`amountBeforeGst-${index}`}
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            required
                                                        />
                                                    </td>

                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            name={`gstAmount-${index}`}
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            name={`invoiceAmount-${index}`}
                                                            className="form-control payroll-table-body fianance-input-border text-end"
                                                            required
                                                        />
                                                    </td>
                                                    {rows.length > 1 &&
                                                        <td className="text-center align-content-center border border-dark p-2">
                                                            {rows.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => removeRow(index)}
                                                                >
                                                                    <RxCross1 />
                                                                </button>
                                                            )}
                                                        </td>
                                                    }
                                                </tr>
                                            ))}

                                            <tr className='payroll-table-body' >
                                                <td colSpan={2} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                    Sub Total
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body fw-bold fianance-input-border text-end"
                                                        required
                                                    />
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body fw-bold fianance-input-border text-end"
                                                        required
                                                    />
                                                </td>

                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body fw-bold fianance-input-border text-end"
                                                        required
                                                    />
                                                </td>
                                            </tr>

                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center d-flex border border p-2 text-nowrap" >
                                                    <div className='align-content-center'>
                                                        Less :
                                                    </div>
                                                    <div className='col-md-7 ms-2'>
                                                        <CreatableSelect
                                                            isClearable
                                                            name={`ledger`}
                                                            options={lessType}
                                                            placeholder="Select"
                                                            className="email-select payroll-table-body rounded payroll-input-border"
                                                        />
                                                    </div>
                                                </td>

                                                <td className="text-start align-content-center border border-dark p-2" >
                                                    {/* <div className='col-md-7 ms-2'> */}
                                                    <CreatableSelect
                                                            isClearable
                                                            name={`ledger`}
                                                            // options={lessType}
                                                            placeholder="Select Rate"
                                                            className="email-select payroll-table-body rounded payroll-input-border"
                                                        />
                                                    {/* </div> */}
                                                </td>

                                                <td className="text-end align-content-center border border-dark p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-end"
                                                        required
                                                    />
                                                </td>
                                            </tr>

                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark p-2 text-nowrap" >
                                                    Add/(Less) : Adjustment
                                                </td>
                                                <td className="text-start align-content-center border border-dark p-2 text-nowrap" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-end"
                                                        required
                                                    />
                                                </td>

                                                <td className="text-end align-content-center border border-dark p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body fianance-input-border text-end"
                                                        required
                                                    />
                                                </td>
                                            </tr>

                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold' >
                                                <td colSpan={2} className="text-start align-content-center fw-bold border border-dark p-2" >
                                                    Total
                                                </td>
                                                <td className="text-end align-content-center fw-bold border border-dark p-2" >
                                                    00
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
                                    <div className="text-end mt-2">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={addRow}
                                        >
                                            Add Row
                                        </button>
                                    </div>
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
                                                Invoice Upload <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                id="vendorCode"
                                                name="vendorCode"
                                                className="form-control"
                                                required
                                                placeholder='Enter Contact Number'
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
                                                Cheque No. /Transaction No. <span className="text-danger">*</span>
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
                                                Payment Voucher Number <span className="text-danger">*</span>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UpdatePaymentEntry