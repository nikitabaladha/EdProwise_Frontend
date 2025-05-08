// import React, { useState } from "react";
// import postAPI from "../../../../../api/postAPI";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const AddFeesType = () => {
//   const [fees, setFees] = useState([""]);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleAddFeeType = () => {
//     setFees([...fees, ""]);
//   };

//   const handleRemoveFeeType = (index) => {
//     setFees(fees.filter((_, i) => i !== index));
//   };

//   const handleFeeChange = (index, value) => {
//     const updatedFees = [...fees];
//     updatedFees[index] = value;
//     setFees(updatedFees);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     const trimmedFees = fees.map((f) => f.trim());

//     const hasEmpty = trimmedFees.some((f) => f === "");
//     if (hasEmpty) {
//       toast.error("Fees Type fields are required.");
//       return;
//     }

//     const userDetails = JSON.parse(localStorage.getItem("userDetails"));
//     const schoolId = userDetails?.schoolId;

//     if (!schoolId) {
//       toast.error("School ID not found. Please log in again.");
//       return;
//     }

//     try {
//       for (const fee of trimmedFees) {
//         await postAPI("/create-fess-type", { feesTypeName: fee, schoolId }, true);
//       }
//       toast.success("Fees Types created successfully!");
//       navigate(-1);
//     } catch (error) {
//       const errMsg =
//         error.response?.data?.message ||
//         "An error occurred while creating fees types.";
//       toast.error(errMsg);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body">
//               <div className="card-header mb-2">
//                 <h4 className="card-title text-center custom-heading-font">
//                   Add Types Of Fees
//                 </h4>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 {fees.map((fee, index) => (
//                   <div className="row align-items-end mb-3" key={index}>
//                     <div className="col-12 col-md-8 mb-2 mb-md-0">
//                       <label className="form-label">Fees Name {index + 1}</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={fee}
//                         onChange={(e) => handleFeeChange(index, e.target.value)}
//                       />
//                     </div>
//                     <div className="col-12 col-md-4 d-flex flex-row gap-2">
//                       {index === fees.length - 1 && (
//                         <button
//                           type="button"
//                           className="btn btn-success"
//                           onClick={handleAddFeeType}
//                         >
//                           Add
//                         </button>
//                       )}
//                       {index !== 0 && (
//                         <button
//                           type="button"
//                           className="btn btn-danger"
//                           onClick={() => handleRemoveFeeType(index)}
//                         >
//                           Remove
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}

//                 <div className="text-end">
//                   <button type="submit" className="btn btn-primary">
//                     Create Fees Type List
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddFeesType;


import React, { useState } from "react";
import postAPI from "../../../../../api/postAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddFeesType = () => {
  const [fees, setFees] = useState([{ name: "", group: "School Fees" }]);
  const navigate = useNavigate();

  const handleAddFeeType = () => {
    setFees([...fees, { name: "", group: "School Fees" }]);
  };

  const handleRemoveFeeType = (index) => {
    setFees(fees.filter((_, i) => i !== index));
  };

  const handleFeeChange = (index, value) => {
    const updatedFees = [...fees];
    updatedFees[index].name = value;
    setFees(updatedFees);
  };

  const handleGroupChange = (index, value) => {
    const updatedFees = [...fees];
    updatedFees[index].group = value;
    setFees(updatedFees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmpty = fees.some((f) => f.name.trim() === "");
    if (hasEmpty) {
      toast.error("Fees Name fields are required.");
      return;
    }

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    if (!schoolId) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    try {
      for (const fee of fees) {
        await postAPI(
          "/create-fess-type",
          {
            feesTypeName: fee.name.trim(),
            groupOfFees: fee.group,
            schoolId,
          },
          true
        );
      }
      toast.success("Fees Types created successfully!");
      navigate(-1);
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        "An error occurred while creating fees types.";
      toast.error(errMsg);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                  Add Types Of Fees
                </h4>
              </div>
              <form onSubmit={handleSubmit}>
                {fees.map((fee, index) => (
                  <div className="row align-items-center mb-3" key={index}>
                     <div className="col-12 col-md-4 mb-2">
                      <label className="form-label">Group of Fees</label>
                      <select
                        className="form-select"
                        value={fee.group}
                        onChange={(e) =>
                          handleGroupChange(index, e.target.value)
                        }
                      >
                        <option value="School Fees">School Fees</option>
                        <option value="One Time Fees">One Time Fees</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4 mb-2">
                      <label className="form-label">
                        Fees Name {index + 1}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={fee.name}
                        onChange={(e) =>
                          handleFeeChange(index, e.target.value)
                        }
                      />
                    </div>
                   
                    <div className="col-12 col-md-4 d-flex flex-row gap-2">
                      {index === fees.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleAddFeeType}
                        >
                          Add
                        </button>
                      )}
                      {index !== 0 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveFeeType(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Create Fees Type List
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFeesType;

