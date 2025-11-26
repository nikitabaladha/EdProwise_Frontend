import React from "react";
import { useNavigate, Link } from "react-router-dom";

// Updated CircularProgress component with responsive design
const CircularProgress = ({
  percentage,
  size = "5rem", // Using relative units
  strokeWidth = 10,
  color = "#e8b400",
}) => {
  // Convert size to a number for calculations
  const sizeNum = parseFloat(size);
  console.log("size", sizeNum);
    
  const sizeUnit = size.replace(sizeNum, '');
  console.log("sizeUnit", sizeUnit);
  
  const radius = (sizeNum - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress-container" style={{ width: size, height: size }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${sizeNum} ${sizeNum}`}>
        {/* Background circle */}
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={sizeNum / 2}
          cy={sizeNum / 2}
        />
        
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={sizeNum / 2}
          cy={sizeNum / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={sizeNum * 0.3} // Responsive font size
          fill="#333"
          className="fw-bold"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

const MisScreenCards = () => {
  const navigate = useNavigate();
  const cardMISInfo = [
    // ... (your existing cardMISInfo array)
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {cardMISInfo.map((mis, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-3" onClick={() => { navigate(`${mis.link}`); }}>
            <div className="card overflow-hidden h-100">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-8">
                    <p className="text-muted fw-semibold mb-0 text-truncate">
                      {mis.title}
                    </p>
                    <h3 className="text-dark mt-1 mb-0">{mis.value}</h3>
                  </div>
                  <div className="col-4">
                    <div className="d-flex align-items-center justify-content-end">
                      <CircularProgress 
                        percentage={mis.percentage} 
                        size="4.5rem" 
                        strokeWidth={8}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer py-2 bg-light bg-opacity-50">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="align-items-center">
                    <span className={mis.textColor}>
                      <i className={`bx bxs-${mis.status}-arrow fs-12`}></i>
                      {mis.upDown}%
                    </span>
                    <span className="text-muted ms-1 fs-12">{mis.session}</span>
                  </div>
                  <Link className="text-reset fw-semibold fs-12">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MisScreenCards;