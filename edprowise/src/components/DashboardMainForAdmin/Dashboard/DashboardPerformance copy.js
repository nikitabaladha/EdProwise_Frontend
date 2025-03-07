import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", schools: 4000, clicks: 2400 },
  { name: "Feb", schools: 3000, clicks: 1398 },
  { name: "Mar", schools: 2000, clicks: 9800 },
  { name: "Apr", schools: 2780, clicks: 3908 },
  { name: "May", schools: 1890, clicks: 4800 },
  { name: "Jun", schools: 2390, clicks: 3800 },
  { name: "Jul", schools: 3490, clicks: 4300 },
  { name: "Aug", schools: 4000, clicks: 2400 },
  { name: "Sep", schools: 3000, clicks: 1398 },
  { name: "Oct", schools: 2000, clicks: 9800 },
  { name: "Nov", schools: 2780, clicks: 3908 },
  { name: "Dec", schools: 1890, clicks: 4800 },
];

const DashboardPerformance = () => {
  const [barSize, setBarSize] = useState(15);

  useEffect(() => {
    const handleResize = () => {
      setBarSize(window.innerWidth < 768 ? 10 : 15);
    };

    // Call on mount
    handleResize();

    // Attach listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="col-lg-8 border-start border-5">
        <div className="p-3">
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
          <div
            className="alert alert-info mt-3 text text-truncate mb-0"
            role="alert"
          >
            We regret to inform you that our server is currently experiencing
            technical difficulties.
          </div>
          <div
            dir="ltr"
            id="dash-performance-chart"
            className="apex-charts"
            style={{ minHeight: 328 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fontWeight: "bold" }}
                />
                <YAxis tick={{ fontSize: 12, fontWeight: "bold" }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
                <Bar
                  dataKey="schools"
                  fill="#7f3f98"
                  barSize={barSize}
                  opacity={1}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPerformance;
