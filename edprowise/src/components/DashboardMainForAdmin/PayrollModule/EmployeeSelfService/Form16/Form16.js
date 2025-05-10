import React from 'react'
import { Link } from 'react-router-dom'
const Form16 = () => {
  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Form 16
                    </h4>
                  </div>
                </div>
                <form onSubmit="">

                  <div className="table-responsive mb-4">
                    <table className="table mb-4" style={{ border: "1px solid black", color: "black", placeContent: "center" }}>
                      <thead>
                        <tr >
                          <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            Employee ID
                          </th>
                          <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            Name Of Employees
                          </th>
                          <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            F.Y
                          </th>
                          <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            Documents
                          </th>
                          <th className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            EMP-0001
                          </td>
                          <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            Umesh jadhav
                          </td>
                          <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            2025-26
                          </td>
                          <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            <input
                              type="file"
                              className="form-control"
                              accept="image/*,application/pdf"
                              // onChange={handleChange}
                              required
                            />
                          </td>
                          <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            <div className="d-flex gap-2">

                              <Link
                                className="btn btn-light btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-info btn-sm"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                              >
                                <iconify-icon
                                  icon="solar:download-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                            </div>
                          </td>

                        </tr>
                        <tr >
                          <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                            EMP-0002
                          </td>
                          <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                          </td>
                          <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                          </td>
                          <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                          </td>
                          <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

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
      </div> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">Form16</h4>

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
                        <th>Name of Employees</th>
                        <th>Financial Year</th>
                        <th>Documents</th>
                        <th>Action</th>
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
                          2025-26
                        </td>
                        <td>
                        <div className="col-md-8" style={{justifySelf:"center"}}>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*,application/pdf"
                            // onChange={handleChange}
                            required
                          />
                          </div>
                        </td>
                        <td>
                            <div className="d-flex justify-content-center gap-2">

                              <Link
                                className="btn btn-light btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-info btn-sm"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                              >
                                <iconify-icon
                                  icon="solar:download-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
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
    </>
  )
}

export default Form16