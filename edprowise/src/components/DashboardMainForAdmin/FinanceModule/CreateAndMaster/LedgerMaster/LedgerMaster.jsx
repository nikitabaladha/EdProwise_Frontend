import React from 'react'

const LedgerMaster = () => {
  return (
    <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1"> Chart of Accounts </h4>
                                </div>
                            </div>

                            <form onSubmit="">
                                <div className="table-responsive pb-4">
                                    <table className="table text-dark border border-dark mb-1">
                                        <thead>
                                              
                                            <tr className='payroll-table-header' >
                                                <th className="text-center w-25 align-content-center border border-dark-subtle text-nowrap p-2" >
                                                    Head of Account
                                                </th>
                                                <th className="text-center w-25 align-content-center border border-dark-subtle text-nowrap p-2" >
                                                  BS & P&L Ledger
                                                </th>
                                                <th className="text-center w-25 align-content-center border border-dark-subtle text-nowrap p-2" >
                                                   Group Ledger
                                                </th>
                                                <th className="text-center w-25 align-content-center border border-dark-subtle text-nowrap p-2" >
                                                  Ledger
                                                </th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  Expenditure
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  Repairs & Maintenance 
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                   Computer , Software & Website Expenses
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                    Website (Domain, Designing Charges)
                                                </td>
                                                
                                            </tr>

                                           <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                   
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                    
                                                </td>
                                                
                                                
                                            </tr>
                                             <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                   
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                    
                                                </td>
                                                
                                                
                                            </tr>
                                             <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                   
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                    
                                                </td>
                                                
                                            </tr>
                                             <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                   
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                    
                                                </td>
                                                
                                                
                                            </tr>
                                             <tr className='payroll-table-body' >
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle  p-2" >
                                                  
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                   
                                                </td>
                                                <td className="text-start align-content-center border border-dark-subtle p-2" >
                                                    
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
  )
}

export default LedgerMaster