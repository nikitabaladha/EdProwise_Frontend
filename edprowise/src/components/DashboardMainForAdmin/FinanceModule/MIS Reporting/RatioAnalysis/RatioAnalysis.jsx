import React from 'react'

const RatioAnalysis = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">Ratio Analysis</h4>
                                </div>
                            </div>

                            <form onSubmit="">

                                <div className="table-responsive pb-4">
                                    <table className="table text-dark border border-dark mb-1">
                                        <thead>
                                            <tr className='payroll-table-header' >
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Ratio
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Apr-24
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    May-24
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Jun-24
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" >
                                                    Jul-24
                                                </th>

                                            </tr>

                                        </thead>
                                        <tbody>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap fw-bold p-2">
                                                    Operational Efficiency Ratios :
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Fees Per Students
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Operating Expenses Per Students
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Salary Per Teaching Staff
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Salary Per Non Teaching Staff
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
Staff Turnover Ratio
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                 Capital Expenditure Ratio
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                   Facility Maintenance Ratio
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Technology Expenses Ratio
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    Fees Concession % to total fees
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>

                                            </tr>
                                            
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap fw-bold p-2">
                                                    Enrollment & Student Ratios :
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>
                                                
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                   Enrollment Growth Rate
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>    
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                   Stdudent Left %
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>    
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                   Avg. Student Per Section
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>    
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                   SC, ST & OBC Students %
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>    
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                   Students Present Attendance %
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>    
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                   Students Absent Attendance %
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>    
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                   Teacher Rating
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>    
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                </td>    
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="text-start align-content-center border border-dark text-nowrap ps-3 p-2">
                                                   
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
                                                    
                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">

                                                </td>
                                                <td className="text-end align-content-center border border-dark text-nowrap p-2">
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

export default RatioAnalysis