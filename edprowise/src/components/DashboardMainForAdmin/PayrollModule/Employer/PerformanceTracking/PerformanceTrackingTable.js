import React from 'react'

const PerformanceTrackingTable = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center gap-1">
                            <h4 className="card-title flex-grow-1">Performance Tracking</h4>

                        </div>
                        <div>
                            <div className="table-responsive">
                                <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                                    <thead className="bg-light-subtle">
                                        <tr>
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
                                            <th>Employee ID</th>
                                            <th>Employee Name </th>
                                            <th>Designation</th>
                                            <th>Overall Rating</th>
                                            <th>Teaching Style</th>
                                            <th>Teaching Explanation</th>
                                            <th>Class Activity</th>
                                            <th>Engagment with Students</th>
                                            <th>Lesson Planning</th>
                                            <th>Behaviour Skills</th>
                                            <th>Discipline</th>
                                            <th>Communication Skills</th>
                                            <th>Good Listener</th>
                                            <th>Arrival on class on time</th>
                                            <th>Guidance & Motivational</th>
                                            <th>Inspiration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
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
                                            <td>Emp-0001</td>
                                            <td>Umesh Jadhav</td>
                                            <td>
                                                
                                            </td>
                                            <td>
                                                
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>l</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* end table-responsive */}
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerformanceTrackingTable