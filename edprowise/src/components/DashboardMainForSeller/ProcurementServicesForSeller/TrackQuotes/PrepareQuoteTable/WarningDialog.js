// import React from "react";

// const WarningDialog = ({ onClose }) => {
//   return (
//     <div
//       id="overlay"
//       className="swal2-container swal2-center swal2-backdrop-show"
//       style={{ overflowY: "auto" }}
//     >
//       <div
//         aria-labelledby="swal2-title"
//         aria-describedby="swal2-html-container"
//         className="swal2-popup swal2-modal swal2-icon-warning swal2-show"
//         tabIndex={-1}
//         role="dialog"
//         aria-live="assertive"
//         aria-modal="true"
//         style={{ display: "grid" }}
//       >
//         <button
//           type="button"
//           className="swal2-close"
//           aria-label="Close this dialog"
//           onClick={onClose}
//           style={{ display: "block" }}
//         >
//           ×
//         </button>
//         <ul className="swal2-progress-steps" style={{ display: "none" }} />
//         <div
//           className="swal2-icon swal2-warning swal2-icon-show"
//           style={{ display: "flex" }}
//         >
//           <div className="swal2-icon-content">!</div>
//         </div>
//         <img className="swal2-image" style={{ display: "none" }} />
//         <h2
//           className="swal2-title"
//           id="swal2-title"
//           style={{ display: "block" }}
//         >
//           If you want you can edit the prepared quote data within 4 hrs after
//           that you will not be able to edit it!
//         </h2>
//         <input className="swal2-input" style={{ display: "none" }} />
//         <input type="file" className="swal2-file" style={{ display: "none" }} />
//         <div className="swal2-range" style={{ display: "none" }}>
//           <input type="range" />
//           <output />
//         </div>
//         <select className="swal2-select" style={{ display: "none" }} />
//         <div className="swal2-radio" style={{ display: "none" }} />
//         <label
//           htmlFor="swal2-checkbox"
//           className="swal2-checkbox"
//           style={{ display: "none" }}
//         >
//           <input type="checkbox" />
//           <span className="swal2-label" />
//         </label>
//         <textarea
//           className="swal2-textarea"
//           style={{ display: "none" }}
//           defaultValue={""}
//         />
//         <div
//           className="swal2-validation-message"
//           id="swal2-validation-message"
//           style={{ display: "none" }}
//         />

//         <div className="swal2-footer" style={{ display: "none" }} />
//         <div className="swal2-timer-progress-bar-container">
//           <div
//             className="swal2-timer-progress-bar"
//             style={{ display: "none" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WarningDialog;

import React from "react";

const WarningDialog = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2 style={{ marginBottom: "16px" }}>
          If you want, you can edit the prepared quote data within 4 hrs. After
          that, you will not be able to edit it!
        </h2>
        <button
          onClick={onClose}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WarningDialog;
