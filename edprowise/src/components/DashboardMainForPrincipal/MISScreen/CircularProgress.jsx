// import React from "react";

// const CircularProgress = ({
//   percentage,
//   size = 70,
//   strokeWidth = 10,
//   color = "#e8b400",
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;

//   return (
//     <svg width={size} height={size}>
//       {/* Background circle */}
//       <circle
//         stroke="#e6e6e6"
//         fill="transparent"
//         strokeWidth={strokeWidth}
//         r={radius}
//         cx={size / 2}
//         cy={size / 2}
//       />
      
//       <circle
//         stroke={color}
//         fill="transparent"
//         strokeWidth={strokeWidth}
//         r={radius}
//         cx={size / 2}
//         cy={size / 2}
//         strokeDasharray={circumference}
//         strokeDashoffset={offset}
//         strokeLinecap="round"
//         style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} //  rotate to start at top
//       />

//       <text
//         x="50%"
//         y="50%"
//         dominantBaseline="middle"
//         textAnchor="middle"
//         fontSize="20"
//         fill="#333"
//         className="fw-bold"
//       >
//         {percentage}%
//       </text>
//     </svg>
//   );
// };

// export default CircularProgress;


import React from "react";

const CircularProgress = ({
  percentage,
  color = "#e8b400",
  strokeWidth = 10,
}) => {
  const size = 100; 
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{ width: "100%", height: "auto", maxWidth: "80px" }} 
    >
      {/* Background */}
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      {/* Progress */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />

      {/* Text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="20"
        fill="#333"
        className="fw-bold"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularProgress;
