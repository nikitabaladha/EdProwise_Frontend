import React from "react";

const RegistrationFormTable = () => {
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div
                      id="example_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div
                            className="dataTables_length"
                            id="example_length"
                          >
                            <label>
                              Show{" "}
                              <select
                                name="example_length"
                                aria-controls="example"
                                className="form-select form-select-sm"
                              >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                              </select>{" "}
                              entries
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div
                            id="example_filter"
                            className="dataTables_filter"
                          >
                            <label>
                              Search:
                              <input
                                type="search"
                                className="form-control form-control-sm"
                                placeholder=""
                                aria-controls="example"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <table
                            id="example"
                            className="table table-bordered dt-responsive nowrap table-striped align-middle dataTable no-footer dtr-inline"
                            style={{ width: "100%" }}
                            aria-describedby="example_info"
                          >
                            <thead
                              style={{
                                borderColor: "#c00000",
                                background: "#04d3d3",
                                fontSize: 12,
                                textAlign: "center",
                              }}
                            >
                              <tr>
                                <th
                                  data-ordering="false"
                                  className="sorting sorting_asc"
                                  tabIndex={0}
                                  aria-controls="example"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "33.8px" }}
                                  aria-sort="ascending"
                                  aria-label="S.No: activate to sort column descending"
                                >
                                  S.No
                                </th>
                                <th
                                  data-ordering="false"
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "114.6px" }}
                                  aria-label="Date Of Recodes: activate to sort column ascending"
                                >
                                  Date Of Recodes
                                </th>
                                <th
                                  data-ordering="false"
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "107.6px" }}
                                  aria-label="Registration No: activate to sort column ascending"
                                >
                                  Registration No
                                </th>
                                <th
                                  data-ordering="false"
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "132.6px" }}
                                  aria-label="Student First Name: activate to sort column ascending"
                                >
                                  Student First Name
                                </th>
                                <th
                                  data-ordering="false"
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "131.6px" }}
                                  aria-label="Student Last Name: activate to sort column ascending"
                                >
                                  Student Last Name
                                </th>
                                <th
                                  data-ordering="false"
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "196.6px" }}
                                  aria-label="Transaction No./ Cheque No.: activate to sort column ascending"
                                >
                                  Transaction No./ Cheque No.
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "122.6px" }}
                                  aria-label="View More Details: activate to sort column ascending"
                                >
                                  View More Details
                                </th>
                                <th
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="example"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "29.6px" }}
                                  aria-label="Edit: activate to sort column ascending"
                                >
                                  Edit
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="odd">
                                <td
                                  valign="top"
                                  colSpan={8}
                                  className="dataTables_empty"
                                >
                                  No data available in table
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-5">
                          <div
                            className="dataTables_info"
                            id="example_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing 0 to 0 of 0 entries
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-7">
                          <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="example_paginate"
                          >
                            <ul className="pagination">
                              <li
                                className="paginate_button page-item previous disabled"
                                id="example_previous"
                              >
                                <a
                                  href="#"
                                  aria-controls="example"
                                  data-dt-idx={0}
                                  tabIndex={0}
                                  className="page-link"
                                >
                                  Previous
                                </a>
                              </li>
                              <li
                                className="paginate_button page-item next disabled"
                                id="example_next"
                              >
                                <a
                                  href="#"
                                  aria-controls="example"
                                  data-dt-idx={1}
                                  tabIndex={0}
                                  className="page-link"
                                >
                                  Next
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/* container-fluid */}
        </div>
        {/* End Page-content */}
      </div>
    </>
  );
};

export default RegistrationFormTable;
