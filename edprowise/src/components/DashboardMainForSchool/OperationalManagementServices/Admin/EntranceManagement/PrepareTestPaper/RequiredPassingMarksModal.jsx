// import React from "react";
// import { Modal, Button } from "react-bootstrap";

// const RequiredPassingMarksModal = ({
//   isOpen,
//   onClose,
//   //   onSubmit,
//   receiveData,
//   //   onChange,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <Modal show={true} onHide={onClose} centered dialogClassName="custom-modal">
//       <Modal.Body>
//         <div className="container">
//           <h4 className="text-center mb-3">Required Passing Marks</h4>
//           <div className="mb-3">
//             <label className="form-label">Total Marks</label>
//             <input
//               type="text"
//               className="form-control"
//               name="receiveDate"
//               placeholder="Total Marks"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Required Passing Marks</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Required Passing Marks"
//             />
//           </div>
//           <div className="text-end">
//             <Button variant="secondary" onClick={onClose} className="me-2">
//               Cancel
//             </Button>
//             <Button variant="primary">Submit</Button>
//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default RequiredPassingMarksModal;

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const RequiredPassingMarksModal = ({ isOpen, onClose, onSubmit, totalMarks }) => {
  const [passingMarks, setPassingMarks] = useState("");

  if (!isOpen) return null;

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Body>
        <h4 className="text-center mb-3">Required Passing Marks</h4>
        <div className="mb-3">
          <label className="form-label">Total Marks</label>
          <input
            type="text"
            className="form-control"
            value={totalMarks}
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Required Passing Marks</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Required Passing Marks"
            value={passingMarks}
            onChange={(e) => setPassingMarks(e.target.value)}
          />
        </div>
        <div className="text-end">
          <Button variant="secondary" onClick={onClose} className="me-2">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => onSubmit(passingMarks)}
            disabled={!passingMarks}
          >
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RequiredPassingMarksModal;
