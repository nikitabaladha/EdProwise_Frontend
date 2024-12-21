import React from "react";

const DashboardPerformance = () => {
  return (
    <div className="col-xxl-8">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="card-title">Performance</h4>
            <div>
              <button type="button" className="btn btn-sm btn-outline-light">
                ALL
              </button>
              <button type="button" className="btn btn-sm btn-outline-light">
                1M
              </button>
              <button type="button" className="btn btn-sm btn-outline-light">
                6M
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-light active"
              >
                1Y
              </button>
            </div>
          </div>
          {/* end card-title*/}
          <div dir="ltr">
            <div id="dash-performance-chart" className="apex-charts" />
          </div>
        </div>
        {/* end card body */}
      </div>
      {/* end card */}
    </div>
  );
};

export default DashboardPerformance;
