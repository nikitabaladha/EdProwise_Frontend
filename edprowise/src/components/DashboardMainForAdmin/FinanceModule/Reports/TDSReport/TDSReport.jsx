import React, { useState } from 'react'
import { FaFilter } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import CreatableSelect from "react-select/creatable";

const TDSReport = () => {
    const [showFilterPanel, setShowFilterPanel] = useState(false);
                const [activeTab, setActiveTab] = useState('Entry Date');
            
                const toggleFilterPanel = () => {
                    setShowFilterPanel(!showFilterPanel);
                };
            
                const tabs = [
                    'Entry Date',
                    'Invoice Date',
                    
                ];
            
                const pageShowOptions = [
                    { value: 10, label: '10' },
                    { value: 15, label: '15' },
                    { value: 20, label: '20' },
                    { value: 25, label: '25' },
                    { value: 30, label: '30' },
                ];
  return (
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
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">TDS Report</h4>
                                </div>
                            </div>
                            <form onSubmit="">
                                
                                <div className="table-responsive pb-4">
                                    <table className="table text-dark border border-dark mb-1">
                                        <thead>
                                            <tr className='payroll-table-header' >
                                                <th className="text-center align-content-center border border-dark  p-2" style={{width:"150px"}}>
                                                    Vendor Code
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{width:"150px"}}>
                                                  Vendor Name
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{width:"150px"}}>
                                                    PAN Number
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{width:"150px"}}>
                                                    Date of Entry
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{width:"150px"}}>
                                                    Date of Invoice
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{width:"150px"}}>
                                                   Invoice Amount
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{width:"200px"}}>
                                                   Invoice Amount on which TDS deducted
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{width:"150px"}}>
                                                   Rate
                                                </th>
                                                <th className="text-center align-content-center border border-dark  p-2" style={{width:"150px"}}>
                                                   TDS Deduction
                                                </th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='payroll-table-body' >
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                   
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                   
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                   1,20,000 
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
1,00,000
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                    5%
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                    5,000
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body' >
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                   
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                   
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >

                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark  p-2" >
                                                    
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                                {/* <div className="text-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary custom-submit-button"
                                    >
                                        Proceed
                                    </button>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
  )
}

export default TDSReport