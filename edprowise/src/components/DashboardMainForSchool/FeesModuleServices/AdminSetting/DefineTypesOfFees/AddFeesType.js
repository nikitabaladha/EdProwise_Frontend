import React, { useState } from "react";

const AddFeesType = () => {
  const [fees, setFees] = useState(["", "", "", "", ""]); 

  const handleAddFeeType = () => {
    setFees([...fees, ""]); 
  };

  const handleFeeChange = (index, value) => {
    const updatedFees = [...fees];
    updatedFees[index] = value;
    setFees(updatedFees);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Add Types Of Fees
                  </h4>
                </div>
              </div>
              <form>
                <div className="row">
                  {fees.map((fee, index) => (
                    <div className="col-md-12" key={index}>
                      <div className="mb-3">
                        <label className="form-label">
                          Fees Name {index + 1}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={fee}
                          onChange={(e) => handleFeeChange(index, e.target.value)}
                          
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mb-3">
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={handleAddFeeType}
                  >
                    Add More Fees Type
                  </button>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
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
