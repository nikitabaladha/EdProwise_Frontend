import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa';

const BlogsStatus = () => {
    const [isYes2, setIsYes2] = useState(true);
    
        const handleToggleYes2 = () => {
            setIsYes2(!isYes2);
        };
  return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                    <h4 className=" payroll-title text-center mb-0 flex-grow-1">Blogs Status</h4>
                                </div>
                            </div>
                            <form
                                className="app-search d-block me-2"
                            // onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="row px-lg-7 ">
                                    <div className="col-md-12 align-content-center">
                                        <div className="my-3 d-flex">
                                            <div className="position-relative flex-grow-1">
                                                <input
                                                    type="search"
                                                    className="form-control border border-dark"
                                                    placeholder="Search Blog Category..."
                                                    autoComplete="off"
                                                    defaultValue=""
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary ms-2"
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </form>
                            <div>
                                <div className="table-responsive px-lg-7">
                                    <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center ">
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
                                                <th>Blog Title</th>
                                                <th>Author Name</th>
                                                <th>Status</th>
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
                                                <td></td>
                                                <td></td>
                                                <td className='text-center'>
                                                     <div
                                                            className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                                                            style={{
                                                                maxWidth: "fit-content",
                                                                justifySelf: "center"
                                                            }}
                                                        >
                                                            <button
                                                                className={`btn ${isYes2 ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                                                                type='button'
                                                                style={{
                                                                    backgroundColor: isYes2 ? 'white' : 'black',
                                                                    borderColor: isYes2 ? 'black' : '',
                                                                    color: isYes2 ? 'black' : 'white',
                                                                    maxWidth: "fit-content",
                                                                    transition: 'all 0.4s ease-in-out',
                                                                    boxShadow: "none"
                                                                }}
                                                                onClick={handleToggleYes2}
                                                            >
                                                                Active
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className={`btn ${!isYes2 ? 'btn-primary' : 'btn-dark'}  rounded-pill`}
                                                                style={{
                                                                    backgroundColor: !isYes2 ? 'white' : 'black',
                                                                    borderColor: !isYes2 ? 'black' : ' ',
                                                                    color: !isYes2 ? 'black' : 'white',
                                                                    transition: 'all 0.4s ease-in-out',
                                                                    boxShadow: "none",
                                                                    maxWidth: "fit-content"
                                                                }}
                                                                onClick={handleToggleYes2}
                                                            >
                                                                Inactive
                                                            </button>
                                                        </div>
                                                </td>
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
        </div >
  )
}

export default BlogsStatus