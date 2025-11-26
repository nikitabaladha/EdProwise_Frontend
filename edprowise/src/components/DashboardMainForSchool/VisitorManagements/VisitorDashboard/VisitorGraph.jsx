import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const VisitorGraph = () => {
  const data = [
    { name: "1-9-2025", uv: 4000, pv: 2400, amt: 2400 },
    { name: "2-9-2025", uv: 3000, pv: 1398, amt: 2210 },
    { name: "3-9-2025", uv: 2000, pv: 9800, amt: 2290 },
    { name: "4-9-2025", uv: 2780, pv: 3908, amt: 2000 },
    { name: "5-9-2025", uv: 1890, pv: 4800, amt: 2181 },
    { name: "6-9-2025", uv: 2390, pv: 3800, amt: 2500 },
    { name: "7-9-2025", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className="row mt-3" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data}> 
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorGraph;
