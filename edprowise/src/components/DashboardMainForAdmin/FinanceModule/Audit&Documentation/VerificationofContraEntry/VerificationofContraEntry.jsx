import React, { useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaFilter } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import CreatableSelect from "react-select/creatable";
import ReasonDisapprove from './ReasonDisapprove';

const VerificationofContraEntry = () => {
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [activeTab, setActiveTab] = useState('Entry Date');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);

    const toggleFilterPanel = () => {
        setShowFilterPanel(!showFilterPanel);
    };

    const handleOpenModal = (entryData) => {
        setSelectedEntry(entryData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEntry(null);
    };

    const tabs = [
        'Entry Date',
        'Invoice Date',
        'Accounting Entry',
        'Ledger',
        'BS/P&S Ledger',
        'Group Ledger',
    ];

    const pageShowOptions = [
        { value: 10, label: '10' },
        { value: 15, label: '15' },
        { value: 20, label: '20' },
        { value: 25, label: '25' },
        { value: 30, label: '30' },
    ];
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card m-2">
                            <div className="card-body custom-heading-padding">
                                <div className="container">
                                    <div className='row p-1 border border-dark' style={{ background: "#bfbfbf" }}>

                                        <div className='col-md-5 col-10'>
                                            <CreatableSelect
                                                isClearable
                                                // options={emailOptions}
                                                className="email-select border border-dark"
                                            />
                                        </div>

                                        <div className='col-md-2'></div>
                                        {/* <div className='col-md-2 col-2'>
                                        
                                    </div> */}
                                        <div className="col-md-5 px-0 d-flex align-content-center justify-content-end" >
                                            <CreatableSelect
                                                isClearable
                                                placeholder="Show"
                                                options={pageShowOptions}
                                                className="email-select border border-dark  me-lg-2"
                                            />
                                            <div
                                                className=' py-1 px-2 borer border-dark fianance-filtter-icons'
                                                style={{ cursor: 'pointer' }}
                                                onClick={toggleFilterPanel}
                                            >
                                                <FaFilter />
                                            </div>
                                            <div className=' py-1 px-2 fianance-setting-icons' ><MdSettings /></div>

                                        </div>
                                    </div>

                                    {/* Filter Panel */}
                                    {showFilterPanel && (
                                        <div className="row mt-1 border border-light rounded px-md-3 py-1">
                                            <div className="col-12 p-2">
                                                <ul className="nav nav-tabs mb-0 justify-content-center">
                                                    {tabs.map((tab) => (
                                                        <li className="nav-item" key={tab}>
                                                            <button
                                                                className={`nav-link fw-bold ${activeTab === tab ? 'active' : ''}`}
                                                                onClick={() => setActiveTab(tab)}
                                                            >
                                                                {tab}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="tab-content mt-2">
                                                    {activeTab === 'Entry Date' && (
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <label>Start Date</label>
                                                                    <input type="date" className="form-control" />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>End Date</label>
                                                                    <input type="date" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === 'Invoice Date' && (
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <label>Start Date</label>
                                                                    <input type="date" className="form-control" />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>End Date</label>
                                                                    <input type="date" className="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === 'Ledger' && (
                                                        <div className="row d-lg-flex justify-content-center">
                                                            <div className='col-md-8  '>
                                                                <CreatableSelect
                                                                    isClearable
                                                                    placeholder="Select Ledger"
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === 'Group Ledger' && (
                                                        <div className="row d-lg-flex justify-content-center">
                                                            <div className='col-md-8  '>
                                                                <CreatableSelect
                                                                    isClearable
                                                                    placeholder="Select Group Ledger"
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === 'BS/P&S Ledger' && (
                                                        <div className="row d-lg-flex justify-content-center">
                                                            <div className='col-md-8  '>
                                                                <CreatableSelect
                                                                    isClearable
                                                                    placeholder="Select BS/P&S Ledger"
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === 'Accounting Entry' && (
                                                        <div className="row d-lg-flex justify-content-center">
                                                            <div className='col-md-8  '>
                                                                <CreatableSelect
                                                                    isClearable
                                                                    placeholder="Select Accounting Entry"
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="text-end mt-3">
                                                    <button className="btn btn-secondary me-2">Reset</button>
                                                    <button className="btn btn-primary">Apply Filters</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="container">
                                    <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                        <h4 className=" payroll-title text-center mb-0 flex-grow-1">Contra Entry Ledger</h4>
                                    </div>
                                </div>
                                <h4 className="text-center payroll-title mb-0 p-2">
                                    <strong>Name of School</strong>
                                </h4>
                                <form onSubmit="">
                                    <div className="table-responsive pb-4">
                                        <table className="table text-dark border border-secondary mb-1">
                                            <thead>
                                                <tr className='payroll-table-header' >
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Entry Date
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Invoice Date
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Accounting Entry
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Voucher Number
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Cheque/Transaction No.
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Head of Account
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        BS/P&L Ledger
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Group Ledger
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Ledger
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Debit
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Credit
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Narration
                                                    </th>
                                                    <th className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='payroll-table-body' >
                                                    <td rowSpan={2} className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        20-08-2025
                                                    </td>
                                                    <td rowSpan={2} className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        19-05-2025
                                                    </td>
                                                    <td rowSpan={2} className="text-start align-content-center border border-secondary text-nowrap p-2" >
                                                        Payment
                                                    </td>
                                                    <td rowSpan={2} className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        ABC12345
                                                    </td>
                                                    <td rowSpan={2} className="text-center align-content-center border border-secondary text-nowrap p-2" >
                                                        03456785
                                                    </td>
                                                    <td className="text-start align-content-center border border-secondary text-nowrap p-2" >
                                                        Expenses
                                                    </td>
                                                    <td className="text-start align-content-center border border-secondary text-nowrap p-2" >
                                                        Salary & Allowances
                                                    </td>
                                                    <td className="text-start align-content-center border border-secondary text-nowrap p-2" >
                                                        Staff Salary-Teaching Staff
                                                    </td>
                                                    <td className="text-start align-content-center border border-secondary text-nowrap p-2" >
                                                        Basic Salary
                                                    </td>
                                                    <td className="text-end align-content-center border border-secondary text-nowrap p-2" >
                                                        xx
                                                    </td>
                                                    <td className="text-end align-content-center border border-secondary text-nowrap p-2" >
                                                    </td>
                                                    <td rowSpan={2} className="text-end align-content-center border border-secondary text-nowrap p-2" >
                                                        Paid for salary for Aug-24
                                                    </td>
                                                    <td rowSpan={2} className="text-end align-content-center border border-secondary text-nowrap p-2" >
                                                        <>
                                                            <button
                                                                type='button'
                                                                className="btn btn-sm btn-outline-secondary me-1 "
                                                            >
                                                                <iconify-icon
                                                                    icon="solar:eye-broken"
                                                                    className="align-middle fs-18"
                                                                />
                                                            </button>

                                                            <button className="btn btn-sm btn-outline-success me-1 "
                                                                type='button'>
                                                                < FaCheck />
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() => handleOpenModal({
                                                                    entryDate: '20-08-2025',
                                                                    invoiceDate: '19-05-2025',
                                                                    accountingEntry: 'Payment',
                                                                    voucherNumber: 'ABC12345',
                                                                    // Add any other relevant data you want to pass to the modal
                                                                })}
                                                            >
                                                                <ImCross />
                                                            </button>
                                                        </>
                                                    </td>
                                                </tr>
                                                <tr className='payroll-table-body' >
                                                    <td className="text-start align-content-center border border-secondary text-nowrap p-2" >
                                                        Assets
                                                    </td>
                                                    <td className="text-start align-content-center border border-secondary text-nowrap p-2" >
                                                        Cash Account
                                                    </td>
                                                    <td className="text-start align-content-center border border-secondary text-nowrap p-2" >
                                                        Cash Account
                                                    </td>
                                                    <td className="text-start align-content-center border border-secondary text-nowrap p-2" >
                                                        Cash Account
                                                    </td>
                                                    <td className="text-end align-content-center border border-secondary text-nowrap p-2" >
                                                    </td>
                                                    <td className="text-end align-content-center border border-secondary text-nowrap p-2" >
                                                        xx
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {isModalOpen && (
                <ReasonDisapprove
                    onClose={handleCloseModal}
                    // onSubmit={handleSubmitReason}
                    entryData={selectedEntry}
                />
            )}
        </>
    )
}

export default VerificationofContraEntry