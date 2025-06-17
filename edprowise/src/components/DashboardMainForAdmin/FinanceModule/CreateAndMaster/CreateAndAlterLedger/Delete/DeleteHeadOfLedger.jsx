import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa';


const DeleteHeadOfLedger = () => {
     const navigate = useNavigate();
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">
                                     Head of Ledger
                                    </h4>
                                    <button
                                        type="button"
                                        className="btn btn-primary custom-submit-button"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                            <form className="app-search d-block me-2">
                                <div className="row px-lg-7">
                                    <div className="col-md-12 align-content-center">
                                        <div className="my-3 d-flex col-lg-8 col-md-10 col-12" style={{ justifySelf: "center" }}>
                                            <div className="position-relative  flex-grow-1">
                                                <input
                                                    type="search"
                                                    className="form-control border border-dark"
                                                    placeholder="Search Ledger..."
                                                    autoComplete="off"
                                                // value={searchTerm}
                                                // onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </form>
                            <div className="table-responsive py-2 px-lg-7 px-md-5">
                                <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                                    <thead className="bg-light-subtle">
                                        <tr className="payroll-table-header">
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
                                            <th>Title</th>

                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='payroll-table-body'>
                                            <td>
                                                <div className="form-check ms-1">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id={"customCheck"}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={"customCheck"}
                                                    >
                                                        &nbsp;
                                                    </label>
                                                </div>
                                            </td>
                                            <td> Income </td>

                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer border-top px-lg-7 px-md-5">
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
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DeleteHeadOfLedger