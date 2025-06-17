import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";

const UpdateJournal = () => {
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
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">Journal Entry</h4>
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
                                    <div className="col-md-6">
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
                                            {rows.map((row, index) => (
                                                <tr key={index} className='payroll-table-body' >
                                                    <td className="text-start align-content-center border border-dark p-2" >

                                                        <CreatableSelect
                                                            isClearable
                                                            name={`ledger-${index}`}
                                                            // options={emailOptions}
                                                            placeholder="Select"
                                                            className="email-select payroll-table-body rounded payroll-input-border"
                                                        />
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2" >
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2" >
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2" >
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
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


                                            </tr>

                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center d-flex border border p-2 text-nowrap" >
                                                    <div className='align-content-center'>
                                                        Less :
                                                    </div>
                                                    <div className='col-md-7 ms-2'>
                                                        <CreatableSelect
                                                            isClearable
                                                            name={`lessType`}
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
                                                        name={`rate`}
                                                        // options={emailOptions}
                                                        placeholder="Select Rate"
                                                        className="email-select payroll-table-body rounded payroll-input-border"
                                                    />
                                                    {/* </div> */}
                                                </td>

                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-end"
                                                        required
                                                    />
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
                                                    
                                                </td>

                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-end"
                                                        required
                                                    />
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2" >
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-end"
                                                        required
                                                    />
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

export default UpdateJournal