import React from "react";

const DashboardConversions = () => {
  return (
    <>
      <div className="col-lg-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Conversions</h5>
            <div id="conversions" className="apex-charts mb-2 mt-n2" />
            <div className="row text-center">
              <div className="col-6">
                <p className="text-muted mb-2">This Week</p>
                <h3 className="text-dark mb-3">23.5k</h3>
              </div>{" "}
              {/* end col */}
              <div className="col-6">
                <p className="text-muted mb-2">Last Week</p>
                <h3 className="text-dark mb-3">41.05k</h3>
              </div>{" "}
              {/* end col */}
            </div>{" "}
            {/* end row */}
            <div className="text-center">
              <button type="button" className="btn btn-light shadow-none w-100">
                View Details
              </button>
            </div>{" "}
            {/* end row */}
          </div>
        </div>
      </div>{" "}
      <div className="col-xl-4 d-none">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h4 className="card-title">Recent Transactions</h4>
            <div>
              <a href="#!" className="btn btn-sm btn-primary">
                <i className="bx bx-plus me-1" />
                Add
              </a>
            </div>
          </div>{" "}
          {/* end card-header*/}
          <div className="card-body p-0">
            <div className="px-3" data-simplebar="" style={{ maxHeight: 398 }}>
              <table className="table table-hover mb-0 table-centered">
                <tbody>
                  <tr>
                    <td>24 April, 2024</td>
                    <td>$120.55</td>
                    <td>
                      <span className="badge bg-success">Cr</span>
                    </td>
                    <td>Commisions </td>
                  </tr>
                  <tr>
                    <td>24 April, 2024</td>
                    <td>$9.68</td>
                    <td>
                      <span className="badge bg-success">Cr</span>
                    </td>
                    <td>Affiliates </td>
                  </tr>
                  <tr>
                    <td>20 April, 2024</td>
                    <td>$105.22</td>
                    <td>
                      <span className="badge bg-danger">Dr</span>
                    </td>
                    <td>Grocery </td>
                  </tr>
                  <tr>
                    <td>18 April, 2024</td>
                    <td>$80.59</td>
                    <td>
                      <span className="badge bg-success">Cr</span>
                    </td>
                    <td>Refunds </td>
                  </tr>
                  <tr>
                    <td>18 April, 2024</td>
                    <td>$750.95</td>
                    <td>
                      <span className="badge bg-danger">Dr</span>
                    </td>
                    <td>Bill Payments </td>
                  </tr>
                  <tr>
                    <td>17 April, 2024</td>
                    <td>$455.62</td>
                    <td>
                      <span className="badge bg-danger">Dr</span>
                    </td>
                    <td>Electricity </td>
                  </tr>
                  <tr>
                    <td>17 April, 2024</td>
                    <td>$102.77</td>
                    <td>
                      <span className="badge bg-success">Cr</span>
                    </td>
                    <td>Interest </td>
                  </tr>
                  <tr>
                    <td>16 April, 2024</td>
                    <td>$79.49</td>
                    <td>
                      <span className="badge bg-success">Cr</span>
                    </td>
                    <td>Refunds </td>
                  </tr>
                  <tr>
                    <td>05 April, 2024</td>
                    <td>$980.00</td>
                    <td>
                      <span className="badge bg-danger">Dr</span>
                    </td>
                    <td>Shopping</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>{" "}
          {/* end card body */}
        </div>{" "}
        {/* end card*/}
      </div>{" "}
      {/* end col*/}
    </>
  );
};

export default DashboardConversions;
