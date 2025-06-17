import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
const JournalTable = () => {
    const navigate = useNavigate();
    const navigateToAdd = (event) => {
        event.preventDefault();
        navigate(`/admin-dashboard/finance-module/account-entry/journal/journal-entry`);
    };

    const navigateToView = (event) => {
        event.preventDefault();
        navigate(`/admin-dashboard/finance-module/account-entry/journal/view-journal-entry`);
    };

    const navigateToUpdate = (event) => {
        event.preventDefault();
        navigate(`/admin-dashboard/finance-module/account-entry/journal/update-journal-entry`);
    };

  return (
    <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card m-2">
                            <div className="card-body custom-heading-padding">
                                <div className="container">
                                    <div className="card-header mb-2 d-flex align-items-center">
                                        <h4 className="card-title flex-grow-1 text-center">
                                            Journal
                                        </h4>
                                        <Link
                                            onClick={(event) => navigateToAdd(event)}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Add New Journal
                                        </Link>
                                    </div>
                                </div>
                                <form onSubmit="">
                                    <div className="table-responsive">
                                        <table className="table align-middle mb-0 table-hover table-centered text-center">
                                            <thead className="bg-light-subtle">
                                                <tr className='payroll-table-header'>
                                                    <th style={{ width: 20 }}>
                                                        <div className="form-check ms-1">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="customCheck1"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="customCheck1"
                                                            />
                                                        </div>
                                                    </th>
                                                    <th>Entry Date</th>
                                                    <th>Journal Voucher No.</th>
                                                    <th>Status</th>
                                                    <th>Amount</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='payroll-table-body'>
                                                    <td style={{ width: 20 }}>
                                                        <div className="form-check ms-1">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="customCheck1"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="customCheck1"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>04-05-2025</td>
                                                    <td></td>
                                                    <td></td>
                                                
                                                    <td>1000</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center gap-2">
                                                            <button
                                                                className="btn btn-light btn-sm"
                                                                onClick={(event) => navigateToView(event)}
                                                            >
                                                                <iconify-icon
                                                                    icon="solar:eye-broken"
                                                                    className="align-middle fs-18"
                                                                />
                                                            </button>
                                                            <Link className="btn btn-soft-primary btn-sm"
                                                                onClick={(event) => navigateToUpdate(event)}
                                                            >
                                                                <iconify-icon
                                                                    icon="solar:pen-2-broken"
                                                                    className="align-middle fs-18"
                                                                />
                                                            </Link>
                                                            <Link className="btn btn-soft-danger btn-sm">
                                                                <iconify-icon
                                                                    icon="solar:trash-bin-minimalistic-2-broken"
                                                                    className="align-middle fs-18"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="card-footer border-top">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination justify-content-end mb-0">
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                    // onClick={handlePreviousPage}
                                                    // disabled={currentPage === 1}
                                                    >
                                                        Previous
                                                    </button>
                                                </li>
                                                <li
                                                    className={`page-item`}
                                                >
                                                    <button
                                                        className={`page-link pagination-button `}
                                                    //   onClick={() => handlePageClick(page)}
                                                    >
                                                        1
                                                    </button>
                                                </li>
    
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                    // onClick={handleNextPage}
                                                    // disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    {/* <div className="d-flex justify-content-end mt-3"> */}
                                    
                                    {/* </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default JournalTable